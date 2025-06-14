---
lang: ko-KR
title: "Kubernetes Chaos Engineering: Lessons Learned — Part 1"
description: "Article(s) > Kubernetes Chaos Engineering: Lessons Learned — Part 1"
icon: iconfont icon-k8s
category:
  - DevOps
  - VM
  - Kubernetes
  - Article(s)
tag:
  - blog
  - learnk8s.io
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Kubernetes Chaos Engineering: Lessons Learned — Part 1"
    - property: og:description
      content: "Kubernetes Chaos Engineering: Lessons Learned — Part 1"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/learnk8s.io/kubernetes-chaos-engineering-lessons-learned.html
prev: /devops/k8s/articles/README.md
date: 2019-04-15
isOriginal: false
author: 
  - name: Daniele Polencic
    url: https://linkedin.com/in/danielepolencic
cover: https://static.learnk8s.io/24f18c579e9cd93a6504110cd0e9ad65.png
---

# {{ $frontmatter.title }} 관련

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
  name="Kubernetes Chaos Engineering: Lessons Learned — Part 1"
  desc="When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?"
  url="https://learnk8s.com/learnk8s.ioblogkubernetes-chaos-engineering-lessons-learned"
  logo="https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg"
  preview="https://static.learnk8s.io/24f18c579e9cd93a6504110cd0e9ad65.png"/>

When you deploy an application in Kubernetes, your code ends up running on one or more worker nodes.

A node may be a physical machine or VM such as AWS EC2 or Google Compute Engine and having several of them means you can run and scale your application across instances efficiently.

If you have a cluster made of three nodes and decide to scale your application to have four replicas, Kubernetes will spread the replicas across the nodes evenly like so:

![](https://learnk8s.io/a/15261f4c090b83cef6a3f3c447e7d898.svg)

The architecture described above works particularly well in case of failures.

If the first node were to be unavailable, the other two could still serve the application.

Meanwhile, Kubernetes has enough time to reschedule the fourth replica to another node.

![](https://learnk8s.io/a/95fa67fa9ea88d3d6ce85ac95952ee33.svg)

Even better, if all of the nodes were to become isolated, they could still serve traffic. Let's scale down the application to two replicas:

![](https://learnk8s.io/a/5adaae4b4e1f1027d82c0ff164bd1633.svg)

Now imagine that the three pods belong to a service of `type: NodePort`.

A NodePort service exposes a port in the range between 30000-32767 in each node in the cluster.

That means that every node can respond to incoming requests, even if the node itself doesn't host the app.

So how does the third node know that it doesn't run the pod and has to route the traffic to one of the other nodes?

![](https://learnk8s.io/a/05881ce7e8c56dc886227c50a56cb307.svg)

Kubernetes has a binary called `kube-proxy` that runs on each node, and that is in charge of routing the traffic from a service to a specific pod.

You can think of `kube-proxy` like a receptionist.

The proxy intercepts all the traffic directed to the service and routes it to the right pod.

**But how does `kube-proxy` know where all the pods are?**

**And how does `kube-proxy` know about the services?**

It doesn't.

The master node knows *everything* and is in charge of creating the list with all the routing rules.

`kube-proxy` is in charge of checking and enforcing the rules on the list.

In the simple scenario above, the list looks like this:

- A Service points to Application instance 1 and 2
- Application instance 1 is available on Node 1
- Application instance 2 is available on Node 2

It doesn't matter which node the traffic is coming from; `kube-proxy` knows where the traffic should be forwarded to by looking at the list.

![](https://learnk8s.io/a/9b046391dbc619b6617161a248d6124b.svg)

---

## But what happens when `kube-proxy` crashes?

**And what if the list of rules is lost?**

**What happens when there's no rule to forward the traffic to?**

[<FontIcon icon="fas fa-globe"/>Manabu Sakai had the same questions](https://blog.manabusakai.com/2018/02/fault-tolerance-of-kubernetes/). So he decided to find out.

Let's assume you have a 2 node cluster on GCP:

```sh
kubectl get nodes
# 
# NAME        STATUS  ROLES   AGE VERSION
# node1       Ready   <none>  17h v1.8.8-gke.0
# node2       Ready   <none>  18h v1.8.8-gke.0
```

And you deployed Manabu's application with:

```sh
kubectl create -f https://raw.githubusercontent.com/manabusakai/k8s-hello-world/master/kubernetes/deployment.yml
kubectl create -f https://raw.githubusercontent.com/manabusakai/k8s-hello-world/master/kubernetes/service.yml
```

The application is simple. It displays the hostname of the current pod in a web page:

![App display "Hello World"](https://learnk8s.io/a/07f12509e17ec374e92ae4808a43c37a.svg)

You should scale the deployments to ten replicas with:

```sh
kubectl scale --replicas 10 deployment/k8s-hello-world
```

The ten replicas are distributed evenly across the two nodes:

```sh
kubectl get pods
# 
# NAME                              READY STATUS  NODE
# k8s-hello-world-55f48f8c94-7shq5  1/1   Running node1
# k8s-hello-world-55f48f8c94-9w5tj  1/1   Running node1
# k8s-hello-world-55f48f8c94-cdc64  1/1   Running node2
# k8s-hello-world-55f48f8c94-lkdvj  1/1   Running node2
# k8s-hello-world-55f48f8c94-npkn6  1/1   Running node1
# k8s-hello-world-55f48f8c94-ppsqk  1/1   Running node2
# k8s-hello-world-55f48f8c94-sc9pf  1/1   Running node1
# k8s-hello-world-55f48f8c94-tjg4n  1/1   Running node2
# k8s-hello-world-55f48f8c94-vrkr9  1/1   Running node1
# k8s-hello-world-55f48f8c94-xzvlc  1/1   Running node2
```

![Distributing traffic](https://learnk8s.io/a/87836a9f146ea0596787c4db8cbc0e3b.svg)

A Service was created to load balance the requests across the ten replicas:

```sh
kubectl get services
# 
# NAME              TYPE      CLUSTER-IP      EXTERNAL-IP PORT(S)         AGE
# k8s-hello-world   NodePort  100.69.211.31   <none>      8080:30000/TCP  3h
# kubernetes        ClusterIP 100.64.0.1      <none>      443/TCP         18h
```

The service is exposed to the outside world using `NodePort` on port 30000. In other words, each node has port 30000 opened to the public internet and can accept incoming traffic.

![`NodePort`](https://learnk8s.io/a/ef529c736e7538daac10f7f358cbf307.svg)

**But how is the traffic routed from port 30000 to my pod?**

`kube-proxy` is in charge of setting up the rules to route the incoming traffic from port 30000 to one of the ten pods.

You should try to request the node on port 30000:

```sh
curl <node ip>:30000
```

::: note

Please note that you can retrieve the node's IP with `kubectl get nodes -o wide`

:::

The application replies with *Hello World!* and the hostname of the container is running on.

In the previous command, you should be greeted by `Hello world! via <hostname>`.

If you keep requesting the same URL, you may notice how sometimes you get the same response and sometimes it changes.

`kube-proxy` is acting as a load balancer and is looking at the routing list and distributing the traffic across the ten pods.

What's more interesting is that it doesn't matter which node you request.

The response could come from any pod, even one that is not hosted on the same node you requested.

To complete your setup, you should have an external load balancer routing the traffic to your nodes on port 30000. 

![Load balancer](https://learnk8s.io/a/785878ae3443b851659c00d2a1108894.svg)

The load balancer will route the incoming traffic from the internet to one of the two nodes.

If you're confused by how many load balancer-like things we have, let's quickly recap:

1. Traffic coming from the internet is routed to the primary load balancer
2. The load balancer forwards the traffic to one of the two nodes on port 30000
3. The rules set up by `kube-proxy` route the traffic from the node to a pod
4. the traffic reaches the pod

Phew! That was long!

---

## It's time to break things

Now that you know how things are plugged in together let's get back to the original question.

*What if you tamper with the routing rules?*

*Will the cluster still work?*

*Do the pods still serve requests?*

Let's go ahead and delete the routing rules.

In a separate shell, you should monitor the application for time and dropped requests.

You could write a loop that every second prints the time and request the application:

```sh
while sleep 1;
  do date +%X; curl -sS http://<your load balancer ip>/ | grep ^Hello;
done
# 
# 10:14:41 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
# 10:14:43 Hello world! via k8s-hello-world-55f48f8c94-tjg4n
# ^C
```

In this case, you have the time in the first column and the response from the pod in the other.

::: note

The first call was made to the *k8s-hello-world-55f48f8c94-vrkr9* pod at 10:14 and 41 seconds.

The second call was made to the *k8s-hello-world-55f48f8c94-tjg4n* pod at 10:14 and 43 seconds.

:::

Let's delete the routing rules from the node.

`kube-proxy` can operate in three modes: **userspace**, **iptables** and **ipvs**. The default since Kubernetes 1.2 is **iptables**.

::: note

Please note that if you're using a cluster with 1.11 or more recent, you might be using **ipvs**.

:::

In **iptables** mode, `kube-proxy` writes the list of routing rules to the node using iptables rules.

So you could log in into one of the node servers and delete the iptables rules with `iptables -F`.

::: note

Please note that `iptables -F` may interfere with your SSH connection.

:::

If everything went according to plan you should experience something similar to this:

```sh
while sleep 1;
  do date +%X; curl -sS http://<your load balancer ip>/ | grep ^Hello;
done
# 
# 10:14:41 Hello world! via k8s-hello-world-55f48f8c94-xzvlc
# 10:14:43 Hello world! via k8s-hello-world-55f48f8c94-tjg4n

# this is when `iptables -F` was issued
# 10:15:10 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
# 10:15:11 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
# ^C
```

As you noticed, it took about 27 seconds from when you dropped the iptables rules and the next response, from 10:14:43 to 10:15:10. *What happened in this 27 seconds?*

*Why is everything back to normal after 27 seconds?*

Perhaps it's just a coincidence. Let's flush the rules again:

```sh
while sleep 1;
  do date +%X; curl -sS http://<your load balancer ip>/ | grep ^Hello;
done
#
# 11:29:55 Hello world! via k8s-hello-world-55f48f8c94-xzvlc
# 11:29:56 Hello world! via k8s-hello-world-55f48f8c94-tjg4n

# this is when `iptables -F` was issued
# 11:30:25 Hello world! via k8s-hello-world-55f48f8c94-npkn6
# 11:30:27 Hello world! via k8s-hello-world-55f48f8c94-vrkr9
# ^C
```

There was a gap of 29 seconds, from 11:29:56 to 11:30:25, but the cluster is back to normal.

*Why does it take about 30 seconds to reply?*

*Is the node receiving traffic despite no routing table?*

Maybe you could investigate what happens to the node in this 30 seconds.

In another terminal, you should write a loop to make requests to the application every second. But this time, you should request the node and not the load balancer:

```sh
while sleep 1;
  do printf %"s\n" $(curl -sS http://<ip of the node>:30000);
done
```

And let's drop the iptables rules. The log from the previous command is:

```sh
while sleep 1;
  do printf %"s\n" $(curl -sS http://<ip of the node>:30000);
done
# 
# Hello world! via k8s-hello-world-55f48f8c94-xzvlc
# Hello world! via k8s-hello-world-55f48f8c94-tjg4n

# this is when `iptables -F` was issued
# curl: (28) Connection timed out after 10003 milliseconds
# curl: (28) Connection timed out after 10004 milliseconds
# Hello world! via k8s-hello-world-55f48f8c94-npkn6
# Hello world! via k8s-hello-world-55f48f8c94-vrkr9
# ^C
```

It shouldn't come as a surprise that connections to the node are timing out after you drop the iptables rules. What's more interesting is that `curl` waits for ten seconds before giving up.

*What if in the previous example the load balancer is waiting for the connection to be made?*

That would explain the 30 seconds delay. But it doesn't tell why the node is ready to accept a connection when you wait long enough.

*So why is the traffic recovering after 30 seconds?*

*Who is putting the iptables rules back?*

Before you drop the iptables rules, you can inspect them with:

```sh
iptables -L
```

Soon after you drop the rules, you should keep executing `iptables -F` and notice that the rules are back in a few seconds!

*Is this you, `kube-proxy`?*

Yes, it is.

Digging in the [<FontIcon icon="iconfont icon-k8s"/>official documentation for `kube-proxy`](https://kubernetes.io/docs/reference/generated/kube-proxy/) reveals two interesting flags:

- `--iptables-sync-period` - The maximum interval of how often iptables rules are refreshed (e.g. '5s', '1m', '2h22m'). Must be greater than 0. (default 30s)
- `--iptables-min-sync-period` - The minimum interval of how often the iptables rules can be refreshed as endpoints and services change (e.g. '5s', '1m', '2h22m'). (default 10s)

`kube-proxy` refreshes the iptables rules every 10 to 30 seconds.

If we drop the iptables rules, it will take up to 30 seconds for `kube-proxy` to realise and restore them back.

That explains why it took 30 seconds to get your node back!

It also explains how routing tables are propagated from the master node to the worker node.

`kube-proxy` is in charge of syncing them on a regular basis.

In other words, every time a pod is added or deleted, the master node recomputes the routing list.

On a regular interval, `kube-proxy` syncs the rules into the current node.

Let's recap how Kubernetes and `kube-proxy` can recover from someone tampering with the iptables rules on the node:

1. The iptables rules are deleted from the node
2. A request is forwarded to the load balancer and routed to the node
3. The node doesn't accept incoming requests, so the load balancer waits
4. After 30 seconds `kube-proxy` restores the iptables
5. The node can serve traffic again. The iptables rules forward the request from the load balancer to the pod
6. The pod replies to the load balancer with a 30 seconds delay

Waiting for 30 seconds may be unacceptable for your application. You may be interested in tweaking the default refresh interval for `kube-proxy`.

*So where are the settings and how can you change them?*

It turns out that there's an agent on the node — *the kubelet* — that is in charge of starting `kube-proxy` as a static pod on each node.

The documentation for static pods suggests that the kubelet scans a specific folder and creates all the resources contained in that folder.

If you inspect the kubelet process in the node, you should be able to see the kubelet running with `--pod-manifest-path=/etc/kubernetes/manifests`.

Running a simple `ls` reveals the truth:

```sh
ls -l /etc/kubernetes/manifests
# 
# total 4 -rw-r--r-- 1 root root 1398 Feb 24 08:08 kube-proxy.manifest
```

And a quick `cat` of `kube-proxy.manifest` reveals the content:

```yaml :collapsed-lines title="kube-proxy.manifest"
apiVersion: v1
kind: Pod
metadata:
  name: kube-proxy
spec:
  hostNetwork: true
  containers:
  - name: kube-proxy
    image: gcr.io/google_containers/kube-proxy:v1.8.7-gke.1
    command:
    - /bin/sh
    - -c
    ->
    echo -998 > /proc/$$$/oom_score_adj &&
    exec kube-proxy
    --master=https://35.190.207.197
    --kubeconfig=/var/lib/kube-proxy/kubeconfig
    --cluster-cidr=10.4.0.0/14
    --resource-container=""
    --v=2
    --feature-gates=ExperimentalCriticalPodAnnotation=true
    --iptables-sync-period=30s
    1>>/var/log/kube-proxy.log 2>&1
```

::: note

Please note that the content was truncated and is not shown in full.

:::

**Mystery unravelled!**

You can see how `--iptables-sync-period=30s` is used to refresh the iptables rules every 30 seconds.

You could go ahead and modify that command to customise the min and max time to update the iptables rules for that node.

---

## Lessons learned

Dropping iptables rules is similar to make a node unavailable. The traffic is still routed to the node, but the node is not able to forward it further.

Kubernetes can recover from a similar failure by monitoring the state of the routing rules and updating them when necessary.

Many thanks to [Manabu Sakai (<FontIcon icon="fa-brands fa-linkedin"/>`manabusakai`)](https://twitter.com/manabusakai)'s blog post that was a huge inspiration and to [Valentin Ouvrard (<FontIcon icon="fa-brands fa-linkedin"/>`Valentin_NC`)](https://twitter.com/Valentin_NC) for investigating the issue with the iptables propagation.

---

## That's all folks!

If you enjoyed this article, you might find the following articles interesting:

```component VPCard
{
  "title": "3 simple tricks for smaller Docker images",
  "desc": "When it comes to building Docker containers, you should always strive for smaller images. Images that share layers and are smaller in size are quicker to transfer and deploy. But how do you keep the size under control when every RUN statement creates a new layer, and you need intermediate artefacts before the image is ready?",
  "link": "/learnk8s.com/smaller-docker-images.md",
  "logo": "https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg",
  "background": "rgba(102,152,204,0.2)"
}
```

- [Scaling Microservices with Message Queues, Spring Boot and Kubernetes.](https://learnk8s.io/blog/scaling-spring-boot-microservices) Learn how to use the Horizontal Pod Autoscaler to resize your fleet of applications dynamically.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Kubernetes Chaos Engineering: Lessons Learned — Part 1",
  "desc": "When you deploy an app in Kubernetes, your code ends up running on one or more worker nodes. But what happens when a node breaks and the network proxy crashes?",
  "link": "https://chanhi2000.github.io/bookshelf/learnk8s.com/learnk8s.ioblogkubernetes-chaos-engineering-lessons-learned.html",
  "logo": "https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg",
  "background": "rgba(102,152,204,0.2)"
}
```