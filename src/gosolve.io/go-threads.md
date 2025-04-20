---
lang: en-US
title: "Go Threads"
description: "Article(s) > Go Threads"
icon: fa-brands fa-golang
category:
  - Go
  - Article(s)
tag:
  - blog
  - gosolve.io
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Go Threads"
    - property: og:description
      content: "Go Threads"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/gosolve.io/go-threads.html
prev: /programming/go/articles/README.md
date: 2023-09-30
isOriginal: false
author:
  - name: Yanick
    url : https://gosolve.io/author/jgadek/
cover: https://gosolve.io/wp-content/uploads/2023/10/max-harlynking-zaItO-b0afs-unsplash-683x1024.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Go Threads"
  desc="In the current tech landscape, where users demand instant, seamless experiences, and applications process vast troves of data, efficiency is paramount. Concurrency and parallelism stand as twin pillars addressing this need. While concurrency involves managing multiple tasks, giving an illusion of simultaneity, parallelism is about executing multiple tasks, literally at the same time."
  url="https://gosolve.io/go-threads"
  logo="https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png"
  preview="https://gosolve.io/wp-content/uploads/2023/10/max-harlynking-zaItO-b0afs-unsplash-683x1024.jpg"/>

A language’s capability to handle both effectively translates into faster applications, reduced lag, and optimized resource usage. Golang’s raison d’être encompasses these ideals, offering tools and features that simplify concurrent and parallel programming.

---

## Main goroutine

### Definition and comparison with traditional operating system threads

In the world of Go, a goroutine is a fundamental building block that allows developers to write concurrent code. But what exactly is a goroutine? In essence, a goroutine is a lightweight thread managed by the Go runtime. When we say “lightweight,” it refers to the fact that goroutines consume much less memory and resources compared to traditional threads managed by the operating system.

Traditional threads, often referred to as operating system threads or simply OS threads, are managed by the underlying operating system. Each of these threads consumes a significant amount of memory, often in the magnitude of megabytes. Goroutines, on the other hand, start with a much smaller stack, usually just a few kilobytes, which can grow and shrink as needed.

### How Goroutines enable lightweight concurrent programming

When a Go program starts, it has one goroutine: the main goroutine. To spawn a new goroutine, Go uses the go keyword followed by a function call. This is incredibly straightforward, enabling developers to kick off concurrent tasks with minimal effort.

Since goroutines are cheap to create (both in terms of memory and CPU overhead), it’s feasible to have thousands or even millions of them running concurrently in a Go application without exhausting system resources. This is in stark contrast to traditional threading models where creating a similar number of threads would be impractical and resource-draining.

---

## OS Thread

### What are threads and how do they function in programming

At the core of any computer program’s execution is the concept of a thread. A thread is a sequence of instructions that can be scheduled for execution. In a single-threaded program, one set of instructions is executed at a time. However, with multi-threading, multiple threads can run concurrently, optimizing execution and improving the speed of CPU-bound tasks.

### Multi-threading and its challenges

While multi-threading can enhance performance, it doesn’t come without its challenges. Managing multiple threads, especially in traditional programming environments, often leads to issues like race conditions, where threads attempt to access shared data simultaneously, resulting in unpredictable outcomes. There’s also the challenge of deadlocks, where threads wait indefinitely for resources held by other threads.

The overhead of context switching, where the operating system saves the state of one thread while moving to execute another, can diminish the potential performance gains from multi-threading. Each context switch involves a non-trivial amount of overhead, which becomes a performance bottleneck when frequent switches occur.

---

## Channels

### Definition and purpose

In Go, channels are the conduits that enable communication between goroutines. They provide a mechanism for safely passing data between goroutines, ensuring that at any given time, only one goroutine has access to the data. Think of channels as pipes: data goes in at one end and is received from the other end.

### How channels facilitate communication between Goroutines

By default, sending and receiving operations on a channel block. This means that the sender will wait until there’s a receiver and vice versa. This characteristic of channels allows goroutines to synchronize without explicit locks or condition variables, reducing the complexity of concurrent code.

There are two types of channels in Go: unbuffered and buffered. Unbuffered channels ensure direct hand-off between sender and receiver, whereas buffered channels provide a fixed-size buffer that can hold multiple items, allowing senders and receivers to operate at different paces.

---

## How the Go Runtime Schedules Goroutines on OS Threads

One of the most remarkable features of Go, or Golang, is its concurrency model, powered by goroutines and the Go runtime’s scheduling mechanism. Understanding this scheduling mechanism is pivotal for grasping why Go’s concurrency is so efficient and performant.

### M:N Scheduling Model

At the heart of Go’s concurrency is the M:N scheduling model. This model stands in contrast to traditional 1:1 thread scheduling seen in many languages. In the M:N model, M represents the number of goroutines, while N represents the number of OS threads on which these goroutines are scheduled.

The power of this model comes from its flexibility. Go can map many goroutines (potentially in the millions) onto a much smaller number of OS threads. This allows applications to achieve a high level of concurrency without the overhead of maintaining an equally high number of OS threads, which would be both resource-intensive and inefficient.

### Goroutine States

Every goroutine goes through several states during its lifetime:

1. **Waiting:** The goroutine is waiting for some event to occur, such as I/O operations to complete or for a signal from another goroutine via a channel.
2. **Runnable:** The goroutine is ready to run but is currently not executing. It’s in the queue waiting for its turn to be scheduled on an OS thread.
3. **Executing:** The goroutine is actively running on an OS thread.

The Go runtime’s scheduler manages transitions between these states, ensuring goroutines get their fair share of execution time.

### Efficiently Utilizing CPU Cores

The relationship between the processor (P), OS threads (M), and goroutines (G) is crucial for Go’s efficient utilization of CPU cores.

- **P (Processor):** Represents a logical processor, which can be thought of as a local cache of runnable goroutines. It provides the context in which Go code runs.
- **M (OS Thread):** Represents the actual OS thread. At any given time, a P is attached to an M, and goroutines are scheduled on this M for execution.
- **G (Goroutine):** The unit of concurrency in Go. Multiple Gs can be scheduled onto a single M via its associated P.

### Advantages of this model

The Go runtime keeps track of how many logical processors (Ps) are available and ensures that each is attached to an OS thread (M) and has goroutines (G) to execute. This abstraction allows Go to maximize the use of available CPU cores and efficiently schedule goroutines for execution.  
Advantages of this Model:

1. **Minimized Thread Context Switches:** Because many goroutines are mapped to fewer OS threads, there are fewer context switches at the OS level. This minimization significantly boosts performance, as context switches can be expensive operations.
2. **Efficient Use of CPU Resources:** With the ability to manage goroutines at the user-space level, the Go runtime can make more informed decisions about scheduling, reducing unnecessary overhead and making optimal use of CPU cores.
3. **Scalability Benefits:** As the number of concurrent tasks grows, Go’s M:N model scales gracefully. It can handle a growing number of goroutines without a proportional increase in the required OS threads or CPU resources.

---

## Conclusion

Golang, with its unique approach to concurrency and parallelism, stands as a testament to the evolution of programming languages, attuned to the demands of modern software development. Throughout this exploration, we’ve delved into the intricacies of goroutines, OS threads, channels, and the mechanisms that give Go its renowned efficiency.

The M:N scheduling model, combined with Go’s lightweight and efficient goroutines, demonstrates a reimagining of concurrent programming, breaking free from the limitations and overheads of traditional threading models. Channels further solidify Go’s commitment to concurrency, offering a means for goroutines to communicate seamlessly and safely, while the Go runtime operates silently in the background to ensure that CPU resources are utilized optimally.

But beyond these technicalities lies the essence of Go’s appeal: a holistic approach to solving real-world challenges in computing. It offers scalable solutions without compromising on performance, reliability, or simplicity. For developers venturing into the world of concurrent programming or those already well-versed in it, Go represents a beacon of efficiency, scalability, and innovation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Go Threads",
  "desc": "In the current tech landscape, where users demand instant, seamless experiences, and applications process vast troves of data, efficiency is paramount. Concurrency and parallelism stand as twin pillars addressing this need. While concurrency involves managing multiple tasks, giving an illusion of simultaneity, parallelism is about executing multiple tasks, literally at the same time.",
  "link": "https://chanhi2000.github.io/bookshelf/gosolve.io/go-threads.html",
  "logo": "https://gosolve.io/wp-content/uploads/2022/03/cropped-ikona1-192x192.png",
  "background": "rgba(56,119,242,0.2)"
}
```
