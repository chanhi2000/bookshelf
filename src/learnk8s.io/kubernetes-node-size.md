---
lang: en-US
title: "Architecting Kubernetes clusters — choosing a worker node size"
description: "Article(s) > Architecting Kubernetes clusters — choosing a worker node size"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - learnk8s.io
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Architecting Kubernetes clusters — choosing a worker node size"
    - property: og:description
      content: "Architecting Kubernetes clusters — choosing a worker node size"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/learnk8s.io/kubernetes-node-size.html
prev: /devops/k8s/articles/README.md
date: 2023-08-15
isOriginal: false
author:
  - name: Daniele Polencic
    url : https://linkedin.com/in/danielepolencic
cover: https://static.learnk8s.io/a102852d1e938e7c95a134501111ed92.png
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
  name="Architecting Kubernetes clusters — choosing a worker node size"
  desc="What type of worker nodes should I use for my Kubernetes cluster? And how many of them?. This article looks at the pros and cons."
  url="https://learnk8s.io/kubernetes-node-size"
  logo="https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg"
  preview="https://static.learnk8s.io/a102852d1e938e7c95a134501111ed92.png"/>

::: important TL;DR

Should you have a Kubernetes cluster with fewer larger nodes or many smaller nodes? This article discusses the pros and cons.

:::

**When you create a Kubernetes cluster, one of the first questions you may have is: "What type of worker nodes should I use, and how many of them?"**

*If you're building an on-premises cluster, should you order some last-generation power servers or use the dozen or so old machines that are lying around in your data centre?*

Or if you're using a managed Kubernetes service like Google Kubernetes Engine (GKE), should you use eight `n1-standard-1` or two `n1-standard-4` instances to achieve your desired computing capacity?

---

## Cluster capacity

In general, a Kubernetes cluster can be seen as abstracting a set of individual nodes as a big "super node".

This super node's total compute capacity (CPU and memory) is the sum of all the constituent nodes' capacities.

There are multiple ways to achieve this.

For example, imagine you need a cluster with a total capacity of 8 CPU cores and 32 GB of RAM.

Here are just two of the possible ways to design your cluster:

![Small vs. large nodes in a Kubernetes cluster](https://learnk8s.io/a/c642b260295b87df85d97a6e8c20be48.svg)

Both options result in a cluster with the same capacity — but the left option uses four smaller nodes, whereas the right one uses two larger nodes.

*Which is better?*

Let's start by reviewing how resources are allocated in a worker node.

---

## Reserved resource in Kubernetes worker nodes

Each worker node in a Kubernetes cluster is a compute unit that runs the kubelet — the Kubernetes agent.

The kubelet is a binary that connects to the control plane and keeps the node's current state in sync with the state of the cluster.

For example, when the Kubernetes scheduler assigns a pod to a particular node, it doesn't send a message to the kubelet.

Instead, [<VPIcon icon="iconfont icon-k8s"/>it writes a Binding object and stores it in etcd.](https://kubernetes.io/docs/concepts/scheduling-eviction/scheduling-framework/#scheduling-cycle-binding-cycle)

The kubelet checks the state of the cluster on a regular schedule, and as soon as it notices a new pod assigned to its node, it proceeds to download the pod specification and create it.

The kubelet is often deployed as a SystemD service and runs as part of the operating system.

Kubelet, SystemD, and operating system need resources such as CPU and memory to function correctly.

**Consequently, not all resources from your worker nodes are available for running pods.**

CPU and memory resources are usually reparted as follows:

1. Operating system.
2. Kubelet.
3. Pods.
4. Eviction threshold.

![Resource allocations a in a Kubernetes node](https://learnk8s.io/a/d627f4247a50662c83a2a40703a8b693.svg)

You might wonder what resources are assigned to each of those.

While those tend to be configurable, most of the time, the CPU is reserved with the following allocations:

- 6% of the first core.
- 1% of the following core (up to 2 cores).
- 0.5% of the following two cores (up to 4).
- 0.25% of any cores above four cores.

For the memory, it could look like this:

- 255 MiB of memory for machines with less than 1 GB.
- 25% of the first 4GB of memory.
- 20% of the following 4GB of memory (up to 8GB).
- 10% of the following 8GB of memory (up to 16GB).
- 6% of the next 112GB of memory (up to 128GB).
- 2% of any memory above 128GB.

Finally, the eviction threshold is usually 100MB.

*What's the eviction threshold?*

[<VPIcon icon="iconfont icon-k8s"/>It's a threshold for memory usage](https://kubernetes.io/docs/concepts/scheduling-eviction/node-pressure-eviction/) — if the node crosses that threshold, the kubelet starts evicting pods because there isn't enough memory in the current node.

*Let's have a look at an example.*

For an 8GB and 2 vCPU instance, the available resources are reparted as follows:

1. 70m vCPU and 1.8GB for the kubelet and operating system (those are usually bundled together).
2. 100MB for the eviction threshold.
3. The remaining 6.1GB memory and 1930 millicores can be used by pods.

Only 75% of the total memory is used to run workloads.

![Resource allocations a in a Kubernetes node with 2 vCPU and 8GB of memory](https://learnk8s.io/a/3de0f4647a4b0d71b196d4e394aa5451.svg)

*But it doesn't end there.*

Your node may need to run pods on every node (e.g. DaemonSets) to function correctly, and those consume memory and CPU too.

Examples include Kube-proxy, a log agent such as Fluentd or Fluent Bit, NodeLocal DNSCache or a CSI driver.

**This is a fixed cost you must pay regardless of the node size.**

![Resource allocations a in a Kubernetes node with DaemonSets](https://learnk8s.io/a/e77f8c687be1e38bd35470e177e4290a.svg)

With this in mind, let's examine the pros and cons of the two opposing directions of "few large nodes" and "many small nodes".

::: note

Note that "nodes" in this article always refers to worker nodes. The choice of number and size of control plane nodes is an entirely different topic.

:::

---

## Resource allocations and efficiency in worker nodes

Resources reserved by the kubelet decrease with larger instances.

Let's have a look at two extreme scenarios.

You want to deploy seven replicas for an application with requests of 0.3 vCPU and 2GB of memory.

1. In the first scenario, you provision a single worker node to deploy all replicas.
2. In the second scenario, you deploy a replica per node.

::: note

For the sake of simplicity, we will assume that no DaemonSets are running on those nodes.

:::

The total resources needed by seven replicas are 2.1 vCPU and 14GB of memory (i.e. `7 x 300m = 2.1 vCPU` and `7 x 2GB = 14GB`).

*Can a 4 vCPU and 16GB instance run the workloads?*

Let's do the math for the CPU reserved:

```plaintext
6% of the first core        = 60m +
1% of the second core       = 10m +
0.5% of the remaining cores = 10m
---------------------------------
total                       = 80m
```

The available CPU for running pods is 3.9 vCPU (i.e. `4000m - 80m`) — more than enough.

Let's check the memory reserved for the kubelet:

```plaintext
25% of the first 4GB of memory = 1GB
20% of the following 4GB of memory  = 0.8GB
10% of the following 8GB of memory  = 0.8GB
--------------------------------------
total                          = 2.8GB
```

The total memory available to pods is `16GB - (2.8GB + 0.1GB)` — where 0.1GB takes into account the 100MB of eviction threshold.

Finally, pods can consume up to 13.1GB of memory.

![Resource allocations a in a Kubernetes node with 2 vCPU and 16GB of memory](https://learnk8s.io/a/c72727b60ee6387d73c40004f9003561.svg)

**Unfortunately, this is not enough (i.e. 7 replicas require 14GB of memory, but you have only 13.1GB), and you should provision a compute unit with more memory to deploy the workloads.**

If you use a cloud provider, the next available increment for the compute unit is 4 vCPU and 32GB of memory.

![A node with 2 vCPU and 16GB of memory is insufficient to run seven replicas](https://learnk8s.io/a/c1be9a8de0824f6e5abcba5371bb9b4e.svg)

*Excellent!*

Let's look at the other scenario where we try to find the smallest instance that could fit a single replica with requests equal to 0.3 vCPU and 2GB of memory.

**Let's try with an instance type with 1 vCPU and 4GB of memory.**

The total reserved CPU is 6% or 60m, and the available CPU to pods is 940m.

Since the app only requires 300m of CPU, this is enough.

The reserved memory for the kubelet is 25% or 1GB plus an additional 0.1GB of eviction threshold.

The total available memory for pods is 2.9GB; since the app only requires 2GB, this value is sufficient.

*Great!*

![Resource allocations a in a Kubernetes node with 2 vCPU and 16GB of memory](https://learnk8s.io/a/f97ca286843a3ff5ee0fbc9a55630829.svg)

*Let's compare the two setups.*

The total resources for the first cluster are just a single node — 4vCPU and 32 GB.

The second cluster has seven instances with 1 vCPU and 4GB of memory (for a total of 7 vCPU and 28 GB of memory).

In the first example, 2.9GB of memory and 80m of CPU are reserved for Kubernetes.

In the second, 7.7GB (1.1GB x 7 instances) of memory and 360m of CPU (60m x 7 instances) are reserved.

**You can already notice how resources are utilized more efficiently when provisioning larger nodes.**

![Comparing resource allocations between a cluster with a single node and another with multiple nodes](https://learnk8s.io/a/23885fd9cefd09159d3bab9618a55aae.svg)

*But there's more to it.*

The larger instance still has space to run more replicas *— but how many?*

- The reserved memory is 3.66GB (3.56GB kubelet + 0.1GB eviction threshold), and the total available memory to pods is 28.44GB.
- The reserved CPU is still 80m, and pods can use 3920m.

At this point, you can find the max number of replicas for memory and CPU with the following division:

```plaintext
Total CPU   3920 /
Pod CPU      300
------------------
Max Pod       13.1
```

You can repeat the calculation for the memory:

```plaintext
Total memory  28.44 /
Pod memory     2
---------------------
Max Pod       14.22
```

The above numbers suggest you run out of CPU before memory and can host up to 13 pods in the 4 vCPU and 32GB worker node.

![Calculating the pod capacity for a 2 vCPU and 32GB worker node](https://learnk8s.io/a/8166b554c895b638a68d2ef76475f943.svg)

*What about the second scenario?*

*Is there any room to scale?*

Not really.

**While the instances still have more CPU, they only have 0.9GB of memory available after you deploy the first pod.**

![Calculating the pod capacity for a 1 vCPU and 4GB worker node](https://learnk8s.io/a/2e379971f411f7ca2908ebed0798c020.svg)

In conclusion, not only does the larger node utilise resources better, but it can also minimise the fragmentation of resources and increase efficiency.

*Does this mean that you should always provision larger instances?*

*Let's look at another extreme scenario: what happens when a node is lost unexpectedly?*

---

## Resiliency and replication

A small number of nodes may limit your applications' effective degree of replication.

For example, if you have a high-availability application consisting of 5 replicas but only two nodes, then the effective degree of replication is reduced to 2. This is because the five replicas can be distributed only across two nodes, and if one of them fails, it may take down multiple replicas at once.

![The replication factor for a cluster with two nodes and five replicas is two](https://learnk8s.io/a/4db4fb1e1af84fcbcec51b23f9b9e77f.svg)

On the other hand, if you have at least five nodes, each replica can run on a separate node, and a failure of a single node takes down at most one replica.

**Thus, you might require a certain minimum number of nodes in your cluster if you have high-availability requirements.**

![The replication factor for a cluster with five nodes and five replicas is five](https://learnk8s.io/a/4b0ddbe420f754323537c3bde7f938e2.svg)

You should also take into account the size of the node.

When a larger node is lost, several replicas are eventually rescheduled to other nodes.

If the node is smaller and hosts only a few workloads, the scheduler reassigns only a handful of pods.

While you are unlikely to hit any limits in the scheduler, redeploying many replicas might trigger the Cluster Autoscaler.

And depending on your setup, this could lead to further slowdowns.

*Let's explore why.*

---

## Scaling increments and lead time

You can scale applications deployed on Kubernetes [**using a combination of a horizontal scaler (i.e. increasing the number of replicas) and cluster autoscaler (i.e. increasing the nodes count)**](/learnk8s.io/kubernetes-autoscaling-strategies.md).

*Assuming you have a cluster at total capacity, how does the node size impact your autoscaling?*

First, you should know that [the Cluster Autoscaler doesn't look at the memory or CPU available (<VPIcon icon="iconfont icon-github"/>`kubernetes/autoscaler`)](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#should-i-use-a-cpu-usage-based-node-autoscaler-with-kubernetes) when it triggers the autoscaling.

In other words, a cluster being utilised in total does not trigger the Cluster Autoscaler.

Instead, the Cluster Autoscaler creates more nodes when a pod is unschedulable due to a lack of resources.

At that point, the autoscaler calls the cloud provider API to provision more nodes for that cluster.

::: tabs

@tab:active 1/

![The Cluster Autoscaler provisions new nodes when pods are pending due to lack of resources.](https://learnk8s.io/a/a26ee4d5052d327089d62b6da143f914.svg)

@tab 2/2

![When the node is provisioned, pods can be deployed.](https://learnk8s.io/a/6a29222a3225ebb38f4e758210ca85b5.svg)

:::

**Unfortunately, provisioning nodes is usually slow.**

It might take several minutes to provision a new virtual machine.

*Does the provisioning time change for larger or smaller nodes?*

No, it's usually constant regardless of the instance size.

**Also, the cluster autoscaler isn't limited to adding a single node at a time; it could add several at once**.

*Let's have a look at an example.*

There are two clusters:

1. The first has a single node with 4 vCPU and 32GB.
2. The second has thirteen nodes with 1 vCPU and 4GB.

An application with 0.3 vCPU and 2GB of memory is deployed in the cluster and scaled to 13 replicas.

Both setups are running at total capacity — they don't have any extra space for pods left.

![Two clusters with: one pod per node and all pods into a single node](https://learnk8s.io/a/f9fd8d7bfbc21dbf4e2f34d68489d1f7.svg)

*What happens when the deployment scales to 15 replicas (i.e. two more)?*

In both clusters, the Cluster Autoscaler detects that the extra pods are un-schedulable due to a lack of resources and provisions:

- An extra node of 4 vCPU and 32GB for the first cluster.
- Two 1 vCPU and 4GB for the second cluster.

Since there isn't any time difference between provisioning large or small instances, the nodes will be available simultaneously in both scenarios.

![Pending pods triggering the autoscaler regardless of their size](https://learnk8s.io/a/ab3adead1eea7f1615bff64488318317.svg)

*However, can you spot another difference?*

The first cluster has space for 11 more pods since the total capacity is 13. Instead, the second cluster is still maxed out.

You could argue that smaller increments are more efficient and cheaper because you add only what you need.

![Autoscaling increments in large and small nodes](https://learnk8s.io/a/4b5b12047d321e34a6c2455677fd99a0.svg)

But let's observe what happens when you scale the deployment again — this time to 17 replicas (i.e. two more).

- The first cluster creates two extra pods in the existing node.
- The second cluster is running at capacity. The pods are Pending, and the Cluster Autoscaler is triggered. Finally, two more worker nodes are provisioned.

![Trade-offs for autoscaling increments in Kubernetes nodes](https://learnk8s.io/a/be78be3cd35dc7387e2352c4630c5ae9.svg)

**In the first cluster, the scaling is almost instantaneous.**

In the second, you must wait for the nodes to be provisioned before the pods can serve requests.

In other words, scaling is quicker in the former case and takes more time in the latter.

**In general, since provisioning time is in the range of minutes, you should think carefully about triggering the Cluster Autoscaler sparingly not to incur longer pod lead time.**

In other words, you can have quicker scaling with larger nodes if you are okay with (potentially) having resources not fully utilised.

*But it doesn't end there.*

Pulling container images also affects how quickly you can scale your workloads — and that is related to the number of nodes in the cluster.

---

## Pulling containers images

When a pod is created in Kubernetes, its definition is stored in etcd.

It's the kubelet's job to detect that the pod is assigned to its node and create it.

The kubelet will:

- Download the definition from the control plane.
- [**Invoke the Container Runtime Interface (CRI) to create the Pod sandbox. The CRI invokes the Container Network Interface (CNI) to attach the Pod to the network**](/learnk8s.io/kubernetes-network-packets#how-linux-network-namespaces-work-in-a-pod.md).
- Invoke the Container Storage Interface (CSI) to mount any container volume.

At the end of those steps, the Pod is alive, and the kubelet can move on to checking liveness and readiness probes and update the control plane with the state of the new Pod.

![The Kubelet and the CRI, CSI and CNI interfaces](https://learnk8s.io/a/b321498cc64bfd4bc424abd7a8a8f461.svg)

**It's essential to notice that when the CRI creates the container in the pod, it must first download the container image.**

That's unless the container image is already cached on the current node.

Let's have a look at how this affects scaling with two clusters:

1. The first has a single node with 4 vCPU and 32GB.
2. The second has thirteen nodes with 1 vCPU and 4GB.

Let's deploy 13 replicas of an app with 0.3 vCPU and 2GB of memory.

The app uses a container image [<VPIcon icon="fa-brands fa-docker"/>based on OpenJDK](https://hub.docker.com/_/openjdk) and weighs 1GB (the base image alone is 775MB).

What happens to the two clusters?

- In the first cluster, the Container Runtime downloads the image once and runs 13 replicas.
- In the second cluster, each Container Runtime downloads and runs the image.

In the first scenario, only 1GB is downloaded.

![The container runtime download the container image once and runs 13 replicas](https://learnk8s.io/a/352ea906f7800c90ed71deea01eac4f1.svg)

However, you download 13GB of container images in the second scenario.

Since downloading takes time, the second cluster is slower at creating replicas than the first.

It also uses more bandwidth and makes more requests (i.e. at least one request for each image layer, 13 times), making it more prone to network glitches.

![Each of the 13 container runtimes download one image](https://learnk8s.io/a/d4dfe6e68938734993dd6b5bd2498e7b.svg)

It's essential to notice that this issue compounds with the Cluster Autoscaler.

If you have smaller nodes:

- The Cluster Autoscaler provisions several nodes at once.
- Once ready, each starts to download the container image.
- Finally, the pod is created.

When you provision larger nodes, the image is likely cached on the node, and the pod can start immediately.

::: tabs

@tab:active 1/4

![Imagine having a cluster with 8 nodes, one replica per node.](https://learnk8s.io/a/c77ad0aa9e0afa24e57788948ee1b12c.svg)

@tab 2/4

![The cluster is full; scaling to 16 replicas triggers the cluster autoscaler.](https://learnk8s.io/a/d3b49aee1e2a56dfe0509c3874c308a8.svg)

@tab 3/4

![As soon as the nodes are provisioned, the Container Runtime downloads the container image.](https://learnk8s.io/a/6b09aa74b75b631b7be55c492d80c084.svg)

@tab 4/4

![Finally, the pods are created in the nodes.](https://learnk8s.io/a/4f053af905c5ceb1f89c9a70dcabebd9.svg)

:::

*So, should you always provision larger nodes?*

Not necessarily.

You could mitigate nodes downloading the same container image with [a container registry proxy (<VPIcon icon="iconfont icon-github"/>`rpardini/docker-registry-proxy`)](https://github.com/rpardini/docker-registry-proxy).

In this case, the image is still downloaded but from a local registry in the current network.

Or you could warm up the cache for the nodes with tools such as [<VPIcon icon="iconfont icon-github"/>`XenitAB/spegel`](https://github.com/XenitAB/spegel).

With Spegel, nodes are peers who can advertise and share container image layers.

In this other case, container images are downloaded from other worker nodes, and pods can start almost immediately.

But container bandwidth isn't the only bandwidth you must keep under control.

---

## Kubelet and scaling the Kubernetes API

The `kubelet` is designed to pull information from the control plane.

So on a regular interval, the `kubelet` issues a request to the Kubernetes API to check the status of the cluster.

*But doesn't the control plane send instructions to the `kubelet`?*

The pull model is easier to scale because:

- The control plane doesn't have to push messages to each worker node.
- Nodes can independently query the API server at their own pace.
- The control plane doesn't have to keep connections with the kubelets open.

> Please note that there are notable exceptions. Commands such as `kubectl logs` and `kubectl exec` require the control plane to connect to the kubelet (i.e. push model).

But the Kubelet doesn't just query for info.

It also reports information back to the master.

For example, [<VPIcon icon="iconfont icon-k8s"/>the `kubelet` reports the node's status to the cluster every ten seconds.](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/#:~:text=%2D%2Dnode%2Dstatus%2Dupdate%2Dfrequency)

Also, the `kubelet` informs the control plane when a readiness probe fails (and the pod endpoint should be removed from the service).

And the `kubelet` keeps the control plane up to date with container metrics.

In other words, several requests in both directions (i.e. from and to the control plane) are made by the `kubelet` to the control plane to keep the node functioning correctly.

In Kubernetes 1.26 and earlier, [<VPIcon icon="iconfont icon-k8s"/>the `kubelet` could issue up to 5 requests per second for this (this has been relaxed with Kubernetes >1.27).](https://kubernetes.io/blog/2023/05/15/speed-up-pod-startup/#raised-default-api-query-per-second-limits-for-kubelet)

*So, assuming your kubelet is running at full capacity (i.e. 5rps), what happens when you run several smaller nodes versus a single large node?*

Let's have a look at our two clusters:

1. The first has a single node with 4 vCPU and 32GB.
2. The second has thirteen nodes with 1 vCPU and 4GB.

The first generates 5 requests per second.

![A single kubelet issueing 5 requests per second](https://learnk8s.io/a/cb5baa1a4b290bff10e3f693fb5fce97.svg)

The second 65 requests per second (i.e. `13 x 5`).

![13 kubelets issueing 5 requests per second each](https://learnk8s.io/a/106f96256da416271d46d757e912c983.svg)

You should scale your API server to cope with more frequent requests when you run clusters with many smaller nodes.

And in turn, that usually means running a control plane on a larger instance or running multiple control planes.

---

## Node and cluster limits

*Is there a limit on the number of nodes a Kubernetes cluster can have?*

[<VPIcon icon="iconfont icon-k8s"/>Kubernetes is designed to support up to 5000 nodes.](https://kubernetes.io/docs/setup/best-practices/cluster-large/)

However, this is not a hard constraint, as the team at Google demonstrated by allowing you to [<VPIcon icon="iconfont icon-gcp"/>run GKE clusters with 15,000 nodes.](https://cloud.google.com/blog/products/containers-kubernetes/google-kubernetes-engine-clusters-can-have-up-to-15000-nodes)

For most use cases, 5000 nodes is already a large number and might not be a factor that could steer your decision towards larger or smaller nodes.

Instead, the max number of pods that you can run in a node could drive you to rethink your cluster architecture.

*So, how many Pods can you run in a Kubernetes node?*

Most cloud providers let you run between 110 and 250 pods per node.

If you provision a cluster yourself, [<VPIcon icon="iconfont icon-k8s"/>the default from is 110.](https://kubernetes.io/docs/reference/config-api/kubelet-config.v1beta1/#:~:text=Default%3A%20%22promiscuous%2Dbridge%22-,maxPods,-int32)

In most cases, this number is not a limitation of the kubelet but the cloud provider's proneness to the risk of double booking IP addresses.

To understand what that means, let's take a step back and look at how the cluster network is constructed.

In most cases, each worker node is assigned a subnet with 256 addresses (e.g. `10.0.1.0/24`).

![Each worker node has a subnet assigned](https://learnk8s.io/a/cc3274f66d411c87546f1eb88a42511d.svg)

Of those, [**two are restricted**](/freecodecamp.org/subnet-cheat-sheet-24-subnet-mask-30-26-27-29-and-other-ip-address-cidr-network-references.md) and you can use 254 for running your Pods.

Consider the scenario where you have 254 pods in the same node.

You create one more pod but exhausted the available IP addresses, and it stays pending.

To fix the issue, you decide to decrease the number of replicas to 253. *Is the pending pod created in the cluster?*

Probably not.

When you delete the pod, its state changes to "Terminating".

The kubelet sends the SIGTERM to the Pod (as well as calling the `preStop` lifecycle hook, if present) and waits for the containers to shut down gracefully.

If the containers don't terminate within 30 seconds, the kubelet sends a SIGKILL signal to the container and forces the process to terminate.

During this period, the Pod still hasn't released the IP address, and traffic can still reach it.

When the pod is finally deleted, the IP address is released.

::: tabs

@tab:active 1/4

![When a Pod is deleted, the kubelet is notified of the change.](https://learnk8s.io/a/01b4a22bf8aa92a7998540f6ac1516e0.svg)

@tab 2/4

![If the Pod has a preStop hook, it is invoked first. Then, the kubelet sends the SIGTERM signal to the container.](https://learnk8s.io/a/ba13194ea5b9ef63597e8fb059355887.svg)

@tab 3/4

![By default, the process has 30 seconds to exit, including the preStop hook. If the process isn't exited by then, the kubelet sends the SIGKILL signal and forces killing the process.](https://learnk8s.io/a/eaba36dda660dd289189979c3b6ce3c4.svg)

@tab 4/4

![The kubelet notifies the control plane that the Pod was deleted successfully. The IP address is finally released.](https://learnk8s.io/a/c05c50cd03dba4465b38b95a016b3712.svg)

:::

At this point, the pending pod can be created, and it is assigned the same IP address as the last.

*Is this a good idea?*

Well, there isn't any other IP available — so you don't have a choice.

::: tabs

@tab:active 1/3

![Imagine your node is using all available IP addresses.](https://learnk8s.io/a/e038d5441bbab5e27bff91fa567517e0.svg)

@tab 2/3

![When a pod is deleted, the IP address is not released immediately. You have to wait for the graceful shutdown.](https://learnk8s.io/a/f0bdd2ddeb962d9e3303965eef0006d3.svg)

@tab 3/3

![As soon as the pod is deleted, the IP address can be reused.](https://learnk8s.io/a/362ab748b014147011e2a723ae8fa71b.svg)

:::

*What are the consequences?*

Remember when we mentioned that the pod should gracefully shut down and handle all pending requests?

Well, if the pod is terminated abruptly (i.e. no graceful shutdown) and the IP address is immediately assigned to a different pod, all existing apps and kubernetes components might still not be aware of the change.

As a result, some of the existing traffic could be erroneously sent to the new Pod because it has the same IP address as the old one.

::: tabs

@tab:active 1/2

![The ingress controller routes traffic to an IP address.](https://learnk8s.io/a/7b2d466a8559f46f477801ae2ca257fd.svg)

@tab 2/2

![If the IP address is recycled and used by a new Pod without waiting for the graceful shutdown, the ingress controller might still route traffic to that IP address.](https://learnk8s.io/a/a785b7150b052e5f5f6906c17c7312b8.svg)

:::

To avoid this issue, you can have lesser IP addresses assigned (e.g. 110) and use the remaining ones as buffers.

That way, you can be reasonably sure that the same IP address isn't immediately reused.

---

## Storage

Compute units have restrictions on the number of disks that can be attached.

For example, a Standard_D2_v5 with 2 vCPU and 8GB of memory can have up to 4 data disks attached on Azure.

If you wish to deploy a StatefulSet to a worker node that uses the Standard_D2_v5 instance type, you won't be able to create more than four replicas.

That's because each replica in a StatefulSet has a disk attached.

As soon as you create the fifth, the Pod will stay pending because the Persistent Volume Claim can't be bound to a Persistent Volume.

*And why not?*

Because each Persistent Volume is an attached disk, you can have only 4 for that instance.

*So, what are your options?*

You can provision a larger instance.

Or you could be reusing the same disk with a different `subPath` field.

Let's have a look at an example.

The following persistent volume requires a disk with 16GB of space:

```yaml title="pvc.yaml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared
spec:
  storageClassName: default
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 16Gi
```

If you submit this resource to the cluster, you'll observe that a Persistent Volume is created and bound to it.

```sh
kubectl get pv,pvc
```

There is a one-to-one relationship between Persistent Volume and Persistent Volume Claims, so you won't be able to have more Persistent Volume Claims to use the same disk.

If you want to use the claim in your pods, you can do so with:

```yaml :collapsed-lines title="deployment-1.yaml" 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app1
spec:
  selector:
    matchLabels:
      name: app1
  template:
    metadata:
      labels:
        name: app1
    spec:
      volumes:
        - name: pv-storage
          persistentVolumeClaim:
            claimName: shared
      containers:
        - name: main
          image: busybox
          volumeMounts:
            - mountPath: '/data'
              name: pv-storage
```

You could have another deployment using the same Persistent Volume Claim:

```yaml :collapsed-lines title="deployment-1.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app2
spec:
  selector:
    matchLabels:
      name: app2
  template:
    metadata:
      labels:
        name: app2
    spec:
      volumes:
        - name: pv-storage
          persistentVolumeClaim:
            claimName: shared
      containers:
        - name: main
          image: busybox
          volumeMounts:
            - mountPath: '/data'
              name: pv-storage
```

However, with this configuration, both pods will write their data in the same folder.

You could have them working on subdirectories with `subPath` to work around the issue.

```yaml :collapsed-lines title="deployment-1.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app2
spec:
  selector:
    matchLabels:
      name: app2
  template:
    metadata:
      labels:
        name: app2
    spec:
      volumes:
        - name: pv-storage
          persistentVolumeClaim:
            claimName: shared
      containers:
        - name: main
          image: busybox
          volumeMounts:
            - mountPath: '/data'
              name: pv-storage
              subPath: app2
```

The deployments will write their data on the following paths:

- `/data/app1` for the first deployment and
- `/data/app2` for the second.

This workaround is not a perfect solution and has a few limitations:

- All deployments have to remember to use the `subPath`.
- If you need to write to the volume, you should opt for a Read-Write-Many volume that can be accessed from multiple nodes. Those are usually expensive to provision.

Also, the same workaround won't work with a StatefulSet since this will create a brand new Persistent Volume Claim (and persistent Volume) for each replica.

---

## Summary and conclusions

*So, should you use a few large nodes or many small nodes in your cluster?*

It depends.

*What's small or large, anyway?*

It comes down to the workloads that you deploy in your cluster.

For example, if your application requires 10 GB of memory, running an instance with 16GB of memory equals to "running a smaller node".

The same instance with an app that requires only 64MB of memory could be considered "large" since you can fit several of them.

*And what about a mix of workloads with different resource requirements?*

In Kubernetes, there is no rule that all your nodes must have the same size.

Nothing stops you from using a mix of different node sizes in your cluster.

This might allow you to trade off the pros and cons of both approaches.

While you might find the answer through trial and error, we've also built a tool to help you with the process.

[<VPIcon icon="fas fa-globe"/>The Kubernetes instance calculator](https://learnk8s.io/kubernetes-instance-calculator/) lets you explore the best instance type for a given workload.

Make sure you give it a try.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Architecting Kubernetes clusters — choosing a worker node size",
  "desc": "What type of worker nodes should I use for my Kubernetes cluster? And how many of them?. This article looks at the pros and cons.",
  "link": "https://chanhi2000.github.io/bookshelf/learnk8s.io/kubernetes-node-size.html",
  "logo": "https://static.learnk8s.io/f7e5160d4744cf05c46161170b5c11c9.svg",
  "background": "rgba(102,152,204,0.2)"
}
```
