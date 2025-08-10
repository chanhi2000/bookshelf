---
lang: en-US
title: How to Terminate Go Programs Elegantly – A Guide to Graceful Shutdowns
description: Article(s) > How to Terminate Go Programs Elegantly – A Guide to Graceful Shutdowns
icon: fa-brands fa-golang
category: 
  - Go
  - DevOps
  - Kubernetes
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - go
  - golang
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: Article(s) > How to Terminate Go Programs Elegantly – A Guide to Graceful Shutdowns
    - property: og:description
      content: How to Terminate Go Programs Elegantly – A Guide to Graceful Shutdowns
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/graceful-shutdowns-k8s-go.html
prev: /programming/go/articles/README.md
date: 2024-08-14
isOriginal: false
author:
  - name: Alex Pliutau
    url : https://freecodecamp.org/news/author/pltvs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723496940277/5fe7a894-9c67-40fd-95c4-64ef32444a4d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Terminate Go Programs Elegantly – A Guide to Graceful Shutdowns"
  desc="Have you ever pulled the power cord out of your computer in frustration? While this might seem like a quick solution to certain problems, it can lead to data loss and system instability. In the world of software, a similar concept exists: the hard sh..."
  url="https://freecodecamp.org/news/graceful-shutdowns-k8s-go/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1723496940277/5fe7a894-9c67-40fd-95c4-64ef32444a4d.png"/>

Have you ever pulled the power cord out of your computer in frustration? While this might seem like a quick solution to certain problems, it can lead to data loss and system instability.

In the world of software, a similar concept exists: the hard shutdown. This abrupt termination can cause problems just like its physical counterpart. Thankfully, there's a better way: the graceful shutdown.

For applications deployed in orchestrated environments (like Kubernetes), graceful handling of termination signals is crucial.

By integrating graceful shutdown, you provide advance notification to the service. This enables it to complete ongoing requests, potentially save state information to disk, and ultimately avoid data corruption during shutdown.

In this guide, we'll dive into the world of graceful shutdowns, specifically focusing on their implementation in Go applications running on Kubernetes.

---

## Signals in Unix Systems

One of the key tools for achieving graceful shutdowns in Unix-based systems is the concept of signals. These are, in basic terms, a simple way to communicate one specific thing to a process, from another process.

By understanding how signals work, you can leverage them to implement controlled termination procedures within your applications, ensuring a smooth and data-safe shutdown process.

There are many signals, and you can find them [<FontIcon icon="fa-brands fa-wikipedia-w"/>here](https://en.wikipedia.org/wiki/Signal_(IPC)). But our concern in this article is only shutdown signals:

- **SIGTERM**: sent to a process to request its termination. Most commonly used, and we’ll be focusing on it later.
- **SIGKILL**: “quit immediately”, can not be interfered with.
- **SIGINT**: interrupt signal (such as Ctrl+C)
- **SIGQUIT**: quit signal (such as Ctrl+D)

These signals can be sent from the user (Ctrl+C / Ctrl+D), from another program/process, or from the system itself (kernel / OS). For example, a **SIGSEGV** aka segmentation fault is sent by the OS.

---

## Our Guinea Pig Service

To explore the world of graceful shutdowns in a practical setting, let's create a simple service we can experiment with. This "guinea pig" service will have a single endpoint that simulates some real-world work (we’ll add a slight delay) by calling Redis's [<FontIcon icon="iconfont icon-redis"/>INCR](https://redis.io/docs/latest/commands/incr/) command. We'll also provide a basic Kubernetes configuration to test how the platform handles termination signals.

The ultimate goal: ensure our service gracefully handles shutdowns without losing any requests/data. By comparing the number of requests sent in parallel with the final counter value in Redis, we'll be able to verify if our graceful shutdown implementation is successful.

We won’t go into details of setting up the Kubernetes cluster and Redis, but you can find the [full setup in this Github repository (<FontIcon icon="iconfont icon-github"/>`plutov/packagemain`)](https://github.com/plutov/packagemain/tree/master/graceful-shutdown).

The verification process is the following:

1. Deploy Redis and Go application to Kubernetes.
2. Use [<FontIcon icon="iconfont icon-github"/>`tsenart/vegeta`](https://github.com/tsenart/vegeta) to send 1000 requests (25/s over 40 seconds).
3. While vegeta is running, initialize a Kubernetes [<FontIcon icon="iconfont icon-k8s"/>Rolling Update](https://kubernetes.io/docs/tutorials/kubernetes-basics/update/update-intro/) by updating the image tag.
4. Connect to Redis to verify the “counter“, it should be 1000.

Let’s start with our base Go HTTP Server.

```go title="hard-shutdown/main.go"
package main

import (
  "net/http"
  "os"
  "time"

  "github.com/go-redis/redis"
)

func main() {
  redisdb := redis.NewClient(&redis.Options{
    Addr: os.Getenv("REDIS_ADDR"),
  })

  server := http.Server{
    Addr: ":8080",
  }

  http.HandleFunc("/incr", func(w http.ResponseWriter, r *http.Request) {
    go processRequest(redisdb)
    w.WriteHeader(http.StatusOK)
  })

  server.ListenAndServe()
}

func processRequest(redisdb *redis.Client) {
  // simulate some business logic here
  time.Sleep(time.Second * 5)
  redisdb.Incr("counter")
}
```

When we run our verification procedure using this code, we’ll see that some requests fail and the **counter is less than 1000** (the number may vary each run).

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F96fe0766-1aee-4865-a233-1827d4eb92cc_1172x222.png)

Which clearly means that we lost some data during the rolling update. 😢

---

## How to Handle Signals in Go

Go provides a [<FontIcon icon="fa-brands fa-golang"/>signal](https://pkg.go.dev/os/signal) package that allows you to handle Unix Signals. It’s important to note that by default, the SIGINT and SIGTERM signals cause the Go program to exit. And in order for our Go application not to exit so abruptly, we need to handle incoming signals.

There are two options to do so.

The first is using channel:

```go
c := make(chan os.Signal, 1)
signal.Notify(c, syscall.SIGTERM)
```

The second is using context (the preferred approach nowadays):

```go
ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM)
defer stop()
```

`NotifyContext` returns a copy of the parent context that is marked done (its Done channel is closed) when one of the listed signals arrives, when the returned `stop()` function is called, or when the parent context's Done channel is closed – whichever happens first.

There are few problems with our current implementation of HTTP Server:

1. We have a slow `processRequest` goroutine, and since we don’t handle the termination signal, the program exits automatically. This means that all running goroutines are terminated as well.
2. The program doesn’t close any connections.

Let’s rewrite it.

```go :collapsed-lines title="graceful-shutdown/main.go"
package main

// imports

var wg sync.WaitGroup

func main() {
  ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM)
  defer stop()

  // redisdb, server

  http.HandleFunc("/incr", func(w http.ResponseWriter, r *http.Request) {
    wg.Add(1)
    go processRequest(redisdb)
    w.WriteHeader(http.StatusOK)
  })

  // make it a goroutine
  go server.ListenAndServe()

  // listen for the interrupt signal
  <-ctx.Done()

  // stop the server
  if err := server.Shutdown(context.Background()); err != nil {
    log.Fatalf("could not shutdown: %v\n", err)
  }

  // wait for all goroutines to finish
  wg.Wait()

  // close redis connection
  redisdb.Close()

  os.Exit(0)
}

func processRequest(redisdb *redis.Client) {
  defer wg.Done()

  // simulate some business logic here
  time.Sleep(time.Second * 5)
  redisdb.Incr("counter")
}
```

Here’s the summary of updates:

- Added `signal.NotifyContext` to listen for the SIGTERM termination signal.
- Introduced a `sync.WaitGroup` to track in-flight requests (processRequest goroutines).
- Wrapped the server in a goroutine and used `server.Shutdown` with context to gracefully stop accepting new connections.
- Used `wg.Wait()` to ensure all in-flight requests (processRequest goroutines) finish before proceeding.
- Resource Cleanup: Added `redisdb.Close()` to properly close the Redis connection before exiting.
- Clean Exit: Used `os.Exit(0`* to indicate a successful termination.

Now, if we repeat our verification process, we will see that all 1000 requests are processed correctly. 🎉

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0852d7a6-be64-44fb-bb00-c48489365585_1172x222.png)

### Web Frameworks / HTTP Library

Frameworks like Echo, Gin, Fiber and others will spawn a goroutine for each incoming request. This gives it a context and then calls your function / handler depending on the routing you decided. In our case, it would be the anonymous function given to HandleFunc for the “/incr” path.

When you intercept a **SIGTERM** signal and ask your framework to gracefully shutdown, two important things happen (to oversimplify):

- Your framework stops accepting incoming requests
- It waits for any existing incoming requests to finish (implicitly waiting for the goroutines to end).

::: note

Kubernetes also stops directing incoming traffic from the loadbalancer to your pod once it has labelled it as Terminating.

:::

### Optional: Shutdown Timeout

Terminating a process can be complex, especially if there are many steps involved like closing connections. To ensure things run smoothly, you can set a timeout. This timeout acts as a safety net, gracefully exiting the process if it takes longer than expected.

```go
shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

go func() {
  if err := server.Shutdown(shutdownCtx); err != nil {
    log.Fatalf("could not shutdown: %v\n", err)
  }
}()

select {
case <-shutdownCtx.Done():
  if shutdownCtx.Err() == context.DeadlineExceeded {
    log.Fatalln("timeout exceeded, forcing shutdown")
  }

  os.Exit(0)
}
```

---

## Kubernetes Termination Lifecycle

![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5a391d61-99c1-4e3b-a4f3-35877570b74f_4251x940.jpeg)

Since we used Kubernetes to deploy our service, let’s dive deeper into how it terminates the pods. Once Kubernetes decides to terminate the pod, the following events will take place:

1. Pod is set to the “Terminating” State and removed from the endpoints list of all Services.
2. `preStop` Hook is executed if defined.
3. **SIGTERM** signal is sent to the pod. But hey, now our application knows what to do!
4. Kubernetes waits for a grace period (`terminationGracePeriodSeconds`), which is 30s by default.
5. **SIGKILL** signal is sent to pod, and the pod is removed.

As you can see, if you have a long-running termination process, it may be necessary to increase the `terminationGracePeriodSeconds` setting**.** This allows your application enough time to shut down gracefully.

---

## Conclusion

Graceful shutdowns safeguard data integrity, maintain a seamless user experience, and optimize resource management. With its rich standard library and emphasis on concurrency, Go empowers developers to effortlessly integrate graceful shutdown practices – a necessity for applications deployed in containerized or orchestrated environments like Kubernetes.

You can find the Go code and Kubernetes manifests in [this Github repository (<FontIcon icon="iconfont icon-github"/>`plutov/packagemain`)](https://github.com/plutov/packagemain/tree/master/graceful-shutdown).

::: info Resources

```component VPCard
{
  "title": "signal package - os/signal - Go Packages",
  "desc": "",
  "link": "https://pkg.go.dev/os/signal/",
  "logo": "https://pkg.go.dev/static/shared/icon/favicon.ico",
  "background": "rgba(54,123,153,0.2)"
}
```

<SiteInfo
  name="Pod Lifecycle"
  desc="This page describes the lifecycle of a Pod. Pods follow a defined lifecycle, starting in the Pending phase, moving through Running if at least one of its primary containers starts OK, and then through either the Succeeded or Failed phases depending on whether any container in the Pod terminated in failure.
Like individual application containers, Pods are considered to be relatively ephemeral (rather than durable) entities. Pods are created, assigned a unique ID (UID), and scheduled to run on nodes where they remain until termination (according to restart policy) or deletion."
  url="https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle//"
  logo="https://kubernetes.io/icons/icon-128x128.png"
  preview="https://kubernetes.io/images/kubernetes-open-graph.png"/>

- [**Explore more articles from packagemain.tech**](/packagemain.tech/graceful-shutdowns-k8s-go.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard 
{
  "title": "How to Terminate Go Programs Elegantly – A Guide to Graceful Shutdowns",
  "desc": "Have you ever pulled the power cord out of your computer in frustration? While this might seem like a quick solution to certain problems, it can lead to data loss and system instability. In the world of software, a similar concept exists: the hard sh...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/graceful-shutdowns-k8s-go.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
