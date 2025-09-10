---
lang: en-US
title: "How Kubernetes Works - Components of a Kubernetes Environment 🧑‍🔧"
description: Article(s) > (2/8) Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses 
category:
  - DevOps
  - VM
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: Article(s) > (2/8) Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses
    - property: og:description
      content: "How Kubernetes Works - Components of a Kubernetes Environment 🧑‍🔧"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/how-kubernetes-works-components-of-a-kubernetes-environmen.html
date: 2025-05-03
isOriginal: false
author:
  - name: Prince Onukwili
    url : https://freecodecamp.org/news/author/onukwilip/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses",
  "desc": "You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s...",
  "link": "/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Kubernetes - Full Handbook for Developers, Startups, and Businesses"
  desc="You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s..."
  url="https://freecodecamp.org/news/learn-kubernetes-handbook-devs-startups-businesses#heading-how-kubernetes-works-components-of-a-kubernetes-environmen"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png"/>

So by now you’ve seen the problem: running dozens (or hundreds!) of microservices manually is like juggling too many balls - you’re bound to drop some.

That’s why Kubernetes was created. But... how does it actually do all this magic? Let’s first break it down with the technical definition (simple but sharp - perfect for interviews) and then the layperson’s analogy (so it sticks in your head!).

---

## 1️⃣ Cluster 🏰

A Kubernetes Cluster is the entire setup of machines (physical or cloud-based) where Kubernetes runs. It’s made of one or more Master Nodes and Worker Nodes, working together to deploy and manage containerized applications.

Think of a Kubernetes Cluster as your entire playground. This is the environment where all your microservices live, grow, and play together.

A cluster is made up of two types of computers (called nodes):

- Master Node (nowadays often called the Control Plane)
- Worker Nodes

---

## 2️⃣ Master Node (Control Plane) 👑

The Master Node is like the brain of Kubernetes. It manages and coordinates the whole cluster - deciding which applications run where, monitoring health, and scaling things up or down as needed.

It’s like the boss of the entire cluster. It doesn’t run your applications directly. Instead, it:

- Watches over the worker nodes
- Decides which microservice (container) goes where
- Makes sure everything runs smoothly and fairly

Think of it like a factory manager who tells machines what to do, when to start, when to stop, and where to send the next package.

Inside the Master Node are a few clever mini-components that handle the real work.

---

## 3️⃣ API Server 💌

The API Server is the front door to Kubernetes. It handles communication between users and the system, taking commands and feeding them into the cluster.

This is where you (or your team) give Kubernetes instructions. Whether you're deploying a new app or scaling an existing one, you "talk" to the API Server first. It's like submitting a request at the front desk - the API server passes it on to the right people (or machines).

---

## 4️⃣ Scheduler 📅

The Scheduler assigns Pods (applications) to Worker Nodes based on available resources and needs.

Imagine you’ve asked Kubernetes to launch a new microservice. The Scheduler checks:

- Which worker node has enough space?
- Which node has enough memory and CPU?
- Where would this service run best?

It makes the decision and assigns the microservice to the perfect spot. Smart, huh?

---

## 5️⃣ Controller Manager 🎛️

The Controller Manager runs controllers that watch over the cluster and ensures that the system’s actual state matches the desired state.

This component watches over the system like a hawk. Let’s say you told Kubernetes:  
*"Hey, I want 3 copies of my payment microservice running at all times."*

If one of them crashes, the Controller Manager sees that and spins up a new one to replace it automatically. It makes sure the reality always matches the plan.

---

## 6️⃣ etcd 📚

etcd is Kubernetes' memory - a distributed key-value store where cluster data is saved: config files, state, and metadata.

Imagine a notebook where all rules, records, and plans are written down. Without etcd, Kubernetes would forget everything.

---

## 7️⃣ Worker Nodes 💪

Worker Nodes are the servers that run the actual application containers, doing the heavy lifting in the cluster.

These are the machines where your microservices actually live and run. The Master Node gives orders, but the Worker Nodes do the heavy lifting - they run your containers!

Each worker node has a few helpers to manage its microservices:

- The Kubelet
- The Kube Proxy

---

## 8️⃣ Kubelet 📢

The Kubelet is the agent which lives on each Worker Node that makes sure containers are healthy and running as expected.

It listens to the Master Node’s instructions. If the Master Node says:*"Hey, run this container!",* the Kubelet makes it happen and keeps it running. If something goes wrong, the Kubelet reports back to the Master Node

---

## 9️⃣ Kube Proxy 🚦

Kube Proxy handles network traffic, ensuring that Pods can talk to each other and to the outside world.

Imagine your banking app’s login service needs to talk to the payments service. The Kube Proxy handles the routing so the request reaches the right place. It also handles load balancing, so no single microservice gets overwhelmed.

So, to summarize:

- The Master Node is the boss - it plans, watches, and assigns tasks.
- The Worker Nodes do the actual work - running your microservices.
- Components like etcd, Kubelet, Scheduler, Controller Manager, and Kube Proxy all work together like parts of a well-oiled machine.

Kubernetes is designed to handle your microservices automatically - keeping them alive, scaling them up, moving them around, and restarting them if they crash - so you don’t have to babysit them yourself.
