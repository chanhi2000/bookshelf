---
lang: en-US
title: "Allocatable memory and CPU in Kubernetes Nodes"
description: "Article(s) > Allocatable memory and CPU in Kubernetes Nodes"
icon: iconfont icon-k8s
category:
  - DevOps
  - Kubernetes
  - AWS
  - Microsoft Azure
  - Google Cloud
  - Article(s)
tag:
  - blog
  - learnkube.com
  - devops
  - kubernetes
  - k8s
  - aws
  - amazon-web-services
  - azure
  - microsoftazure
  - microsoft-azure
  - gcp
  - google-cloud-platform
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Allocatable memory and CPU in Kubernetes Nodes"
    - property: og:description
      content: "Allocatable memory and CPU in Kubernetes Nodes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/learnkube.com/allocatable-resources.html
prev: /devops/k8s/articles/README.md
date: 2024-05-27
isOriginal: false
author:
  - name: Daniele Polencic
    url : https://linkedin.com/in/danielepolencic
cover: https://static.learnkube.com/2f459b0416493403e14ea04caf12bd45.png
---
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

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Microsoft Azure > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/azure/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Allocatable memory and CPU in Kubernetes Nodes"
  desc="Pods deployed in your Kubernetes cluster consume resources such as memory, CPU and storage. However, not all resources in a Node can be used to run Pods."
  url="https://learnkube.com/allocatable-resources"
  logo="https://static.learnkube.com/f7e5160d4744cf05c46161170b5c11c9.svg"
  preview="https://static.learnkube.com/2f459b0416493403e14ea04caf12bd45.png"/>

::: important TL;DR

Not all CPU and memory in your Kubernetes nodes can be used to run Pods.

:::

---

## How resources are allocated in cluster nodes

Pods deployed in your Kubernetes cluster consume memory, CPU and storage resources.

**However, not all resources in a Node can be used to run Pods.**

The operating system and the kubelet require memory and CPU, too, and you should cater for those extra resources.

If you look closely at a single Node, you can divide the available resources into:

1. Resources needed to run the operating system and system daemons such as SSH, systemd, etc.
2. Resources necessary to run Kubernetes agents such as the Kubelet, the container runtime, [node problem detector (<VPIcon icon="iconfont icon-github"/>`kubernetes/node-problem-detector`)](https://github.com/kubernetes/node-problem-detector), etc.
3. Resources available to Pods.
4. Resources reserved to the [<VPIcon icon="iconfont icon-k8s"/>eviction threshold](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#eviction-thresholds).

![The amount of compute resources that are available to Pods](https://learnkube.com/a/35bda739ecd82613ebe2bc144122a051.svg)

As you can guess, [<VPIcon icon="iconfont icon-k8s"/>all of those quotas are customisable.](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#eviction-thresholds)

However, please note that reserving 100MB of memory for the operating system doesn't mean that the OS is limited to using only that amount.

It could use more (or less) resources—you're just allocating and estimating memory and CPU usage to the best of your ability.

*But how do you decide how to assign resources?*

Unfortunately, there isn't a *fixed* answer, as it depends on your cluster.

However, there's consensus in the major managed Kubernetes services [<VPIcon icon="fa-brands fa-google"/>Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine), <VPIcon icon="iconfont icon-microsoftazure"/>[Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/intro-kubernetes), and [<VPIcon icon="fa-brands fa-aws"/>Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/), and it's worth discussing how they partition the available resources.

---

## Google Kubernetes Engine (GKE)

Google Kubernetes Engine (GKE) has [<VPIcon icon="fa-brands fa-google"/>a well-defined list of rules to assign memory and CPU to a Node](https://cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#memory_and_cpu_reservations).

For memory resources, GKE reserves the following:

- 255 MiB of memory for machines with less than 1 GiB of memory
- 25% of the first 4GiB of memory
- 20% of the next 4GiB of memory (up to 8GiB)
- 10% of the next 8GiB of memory (up to 16GiB)
- 6% of the next 112GiB of memory (up to 128GiB)
- 2% of any memory above 128GiB

For CPU resources, GKE reserves the following:

- 6% of the first core
- 1% of the following core (up to 2 cores)
- 0.5% of the following 2 cores (up to 4 cores)
- 0.25% of any cores above 4 cores

*Let's look at an example.*

A virtual machine of type `n1-standard-2` has 2 vCPU and 7.5GiB of memory.

According to the above rules, the CPU reserved is:

$$
\text{Allocatable\:CPU}=0.06\times{1}\:(\text{first\:core})+0.01\times{1}\:(\text{second\:core})
$$

**That totals 70 millicores or 3.5% — a modest amount.**

The allocatable memory is more interesting:

$$
\text{Allocatable\:CPU}=0.25\times{4}\:(\text{first}\:4\text{GB})+0.2\times{3.5}\:(\text{remaining}\:3.5\text{GB})
$$

**The total is 1.7GB of memory reserved for the kubelet.**

At this point, you might think that the remaining memory $7.5\text{GB}-1.7\text{GB}=5.8\text{GB}$ is something you can use for your Pods.

*Not really.*

**The kubelet reserves an extra 100MB for the eviction threshold.**

In other words, you started with a virtual machine with $7.5\text{GiB}$ of memory, but you can only use $5.7\text{GB}$ for your Pods.

**That's close to ~75% of the overall capacity.**

![Allocatable CPU and memory in Google Kubernetes Engine (GKE)](https://learnkube.com/a/d31a4f9aaebabe0ac73b5bb090c92bcb.svg)

You can be more efficient if you decide to use larger instances.

The instance type `n1-standard-96` has 96 vCPU and 360GiB of memory.

If you do the maths, that amounts to:

- 405 millicores are reserved for Kubelet and operating system
- $14.26\text{GB}$ of memory are reserved for Operating System, kubernetes agent and eviction threshold.

**In this extreme case, only 4% of memory is not allocatable.**

---

## Elastic Kubernetes Service (EKS)

Let's explore Elastic Kubernetes Service (EKS) allocations.

::: note

Unfortunately, Elastic Kubernetes Service (EKS) doesn't offer documentation for allocatable resources. You can [rely on their code implementation (<VPIcon icon="iconfont icon-github"/>`awslabs/amazon-eks-ami`)](https://github.com/awslabs/amazon-eks-ami/blob/d87c6c49638216907cbd6630b6cadfd4825aed20/templates/al2/runtime/bootstrap.sh#L517) to extract the values.

:::

EKS reserves the following memory for each Node:

$$
\text{Reserved\:memory}=255\text{MiB}+11\text{MiB}\times\text{MAX_POD_PER_INSTANCE}
$$
```

```

*What's $MAX_POD_PER_INSTANCE$?*

**In Amazon Web Service, each instance type has a different upper limit on how many Pods it can run.**

For example, an `m5.large` instance can only run 29 Pods, but an `m5.4xlarge` can run up to 234. The reason is that each EC2 instance can only have a limited number of IP addresses assigned to it (in AWS lingo, those are called Elastic Network Interfaces (ENIs)).

The Container Network Interface (CNI) uses and assigns those IP addresses to Pods.

However, this limit doesn't apply if you use [<VPIcon icon="fa-brands fa-aws"/>EC2 prefix delegation via the AWS-CNI](https://docs.aws.amazon.com/eks/latest/userguide/cni-increase-ip-addresses.html) or any other CNI that supports it (e.g. [<VPIcon icon="fas fa-globe"/>Cilium](https://isovalent.com/blog/post/cilium-release-112/)).

So, figuring out the limit for your EC2 instances isn't exactly obvious.

For this, [<VPIcon icon="fa-brands fa-aws"/>AWS offers a script you can execute to estimate the maximum number of pods per instance.](https://docs.aws.amazon.com/eks/latest/userguide/choosing-instance-type.html)

Let's have a look at an example.

If you run the script against an `m5.large` instance, you will see this:

```sh
./max-pods-calculator.sh --instance-type m5.large --cni-version 1.9.0-eksbuild.1
# 
# 29
```

You can only run 29 pods.

Let's enable prefix delegation and see what's the estimated number of pods for the same instance:

```sh
./max-pods-calculator.sh --instance-type m5.large --cni-version 1.9.0-eksbuild.1 --cni-prefix-delegation-enabled
# 
# 110
```

Remember that bigger instances can host up to 250 pods with prefix delegation.

The Kubernetes project has a page dedicated to considerations for running large clusters, and it suggests 110 pods per node as the recommended standard.

However, all major Kubernetes managed services set this limit to 250 pods.

With that in mind, let's look at the two memory reservations for the `m5.large` instance.

$$
\begin{align*}
\text{Reserved\:memory}\:(29\:\text{pods})=255\text{Mi}+11\text{MiB}\times{29}=574\text{MiB}\\
\text{Reserved\:memory}\:(110\:\text{pods})=255\text{Mi}+11\text{MiB}\times{110}=1.5\text{GiB}
\end{align*}
$$

For CPU resources, [EKS follows the GKE implementation (<VPIcon icon="iconfont icon-github"/>`awslabs/amazon-eks-ami`)](https://github.com/awslabs/amazon-eks-ami/blob/d87c6c49638216907cbd6630b6cadfd4825aed20/templates/al2/runtime/bootstrap.sh#L285) and reserves:

- 6% of the first core
- 1% of the following core (up to 2 cores)
- 0.5% of the following 2 cores (up to 4 cores)
- 0.25% of any cores above 4 cores

*Let's look at an example.*

An `m5.large` instance has 2 vCPU and 8GiB of memory:

1. from the calculation above, you know that 574MiB (or 1.5GiB for 110 pods) of memory is reserved for the kubelet.
2. An extra 100MB of memory is reserved for the eviction threshold.
3. The reserved allocation for the CPU is the same 70 millicores (same as the `n1-standard-2` since they are both 2 vCPU and the quota is calculated similarly).

![Allocatable CPU and memory in Elastic Kubernetes Service (EKS)](https://learnkube.com/a/d2f7ef5fb0ff243c733497905f91646c.svg)

It's interesting to note that the memory allocatable to Pods is 90% when prefix delegation is disabled and drops to 80.5% when enabled.

---

## Azure Kubernetes Service

Azure offers [<VPIcon icon="iconfont icon-microsoftazure"/>a detailed explanation of their resource allocations](https://docs.microsoft.com/en-us/azure/aks/concepts-clusters-workloads#resource-reservations).

The memory reserved for AKS with Kubernetes 1.29 and above is:

1. 20MB for each pod supported on the node plus a fixed 50MB. Or
2. 25% of the total system memory resources.

AKS will select the lower value between the two.

Let's have a look at an example.
  
For an 8GB memory instance with a maximum of 110 pods, the two values are:

$$
\begin{align*}
1.\:20\text{MB}\times{110}=2.2\text{GB}\\
2.\:8\text{GB}\times{0.25}=2\text{GB}
\end{align*}
$$

Since option 2 is lower, AKS will select the one that has the reserved memory.

The CPU reserved for the Kubelet follows the following table:

| CPU CORES | CPU Reserved (in millicores) |
| --- | --- |
| 1 | 60 |
| 2 | 100 |
| 4 | 140 |
| 8 | 180 |
| 16 | 260 |
| 32 | 420 |
| 64 | 740 |

The values are slightly higher than their counterparts but still modest.

Overall, the CPU and memory reserved for AKS are remarkably similar to Google Kubernetes Engine (GKE).

AKS will reserve a further 100MB for the eviction threshold — just like GKE and EKS.

![Allocatable CPU and memory in Azure Kubernetes Service (AKS)](https://learnkube.com/a/df04181e100dfe86154599d79cbd2a88.svg)

---

## Summary

You might be tempted to conclude that larger instances are the way to go as you maximise the allocable memory and CPU.

**Unfortunately, cost is only one factor when designing your cluster.**

If you're running large nodes, you should also consider:

1. The **overhead on the Kubernetes agents that run on the node** — such as the container runtime (e.g. Docker), the kubelet, and cAdvisor.
2. **Your high-availability (HA) strategy.** Pods can be deployed to a selected number of Nodes
3. **Blast radius.** If you have only a few nodes, then the impact of a failing node is bigger than if you have many nodes.
4. **Autoscaling is less cost-effective** as the next increment is a (very) large Node.

*Smaller nodes aren't a silver bullet either.*

You should architect your cluster for the type of workloads you run rather than following the most common option.

To explore the pros and cons of different instance types, check out this blog post

```component VPCard
{
  "title": "Architecting Kubernetes clusters — choosing a worker node size",
  "desc": "What type of worker nodes should I use for my Kubernetes cluster? And how many of them?. This article looks at the pros and cons.",
  "link": "learnkube.com/kubernetes-node-size.md",
  "logo": "https://static.learnkube.com/f7e5160d4744cf05c46161170b5c11c9.svg",
  "background": "rgba(102,152,204,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Allocatable memory and CPU in Kubernetes Nodes",
  "desc": "Pods deployed in your Kubernetes cluster consume resources such as memory, CPU and storage. However, not all resources in a Node can be used to run Pods.",
  "link": "https://chanhi2000.github.io/bookshelf/learnkube.com/allocatable-resources.html",
  "logo": "https://static.learnkube.com/f7e5160d4744cf05c46161170b5c11c9.svg",
  "background": "rgba(102,152,204,0.2)"
}
```
