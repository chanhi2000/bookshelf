---
lang: en-US
title: "Kubernetes Workloads 🛠️ – Pods, Deployments, Services, & More"
description: Article(s) > (3/8) Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses 
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
      content: Article(s) > (3/8) Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses
    - property: og:description
      content: "Kubernetes Workloads 🛠️ – Pods, Deployments, Services, & More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/kubernetes-workloads-pods-deployments-services-amp-more.html
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
  "title": "Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses",
  "desc": "You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s...",
  "link": "/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses"
  desc="You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s..."
  url="https://freecodecamp.org/news/learn-kubernetes-handbook-devs-startups-businesses#heading-kubernetes-workloads-pods-deployments-services-amp-more"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png"/>

Kubernetes workloads are the objects you use to manage and run your applications. Think of them as blueprints 📐 that tell Kubernetes **what** to run and **how** to run it – whether it’s a single app container, a group of containers, a database, or a batch job. Here are some of the workloads in Kubernetes:

---

## 1️⃣ Pods

A **Pod** is the smallest and simplest unit in the Kubernetes object model. It represents a single instance of a running process in your cluster and can contain one or more containers that share storage and network resources. ​

Think of a Pod as a wrapper around one or more containers that need to work together. They share the same network IP and storage, allowing them to communicate easily and share data. Pods are ephemeral (live for a short time, they can be replaced very easily). If a Pod dies, Kubernetes can create a new one to replace it almost instantly.​

Say you have an application which is split into 2 distributed monoliths – a frontend and a backend. The frontend will run in a container in Pod A, while the backend app will run in a container in another Pod B.

---

## 2️⃣ Deployments

A **Deployment** provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

Deployments manage the lifecycle of your application Pods. They ensure that the specified number of Pods are running and can handle updates, rollbacks, and scaling. If a Pod fails, the Deployment automatically replaces it to maintain the desired state.​

Imagine you're managing a store. A Deployment is like the store manager – you tell it how many workers (Pods) you want, and it makes sure they’re always present. If one doesn't show up for work, the manager finds a replacement automatically. You can also tell it to hire more workers or fire some when needed.

---

## 3️⃣ Services

A **Service** in Kubernetes defines a way to access/communicate with Pods. Services enable communication between different Pods (for example, your frontend Pod A can communicate with your backend Pod B via a service) and can expose your application to external traffic (for example the public internet). ​

Services act as a stable endpoint to access a set of Pods. Even if the underlying Pods change, the Service's IP and DNS name remain constant, ensuring communication between the Pods within the cluster or with the internet.

A Service is like the front door to your app. No matter which worker (Pod) is behind it, people always use the same entrance to access it. It hides the messy stuff happening behind the scenes and gives users a simple way to connect to your app.

---

## 4️⃣ ReplicaSets

A **ReplicaSet** ensures that a specified number of identical Pods are running at any given time. It is often used to guarantee the availability of a specified number of Pods (horizontal scaling). ​

ReplicaSets maintain a stable set of running Pods. If a Pod crashes or is deleted, the ReplicaSet automatically creates a new one to replace it, ensuring your application remains available.​

Think of a ReplicaSet like a robot that counts how many copies of your app are running. If one goes missing, it automatically makes a new one. It keeps the number steady, just like you told it to.

---

## 5️⃣ DaemonSets

A **DaemonSet** ensures that all (or some) Nodes run an instance (a copy) of a specific Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are also removed. ​

DaemonSets are used to deploy a Pod on every node in the cluster. This is useful for running background tasks like log collection or monitoring agents on all nodes (for example to get the CPU, memory, and disk usage of each node).​

A DaemonSet is like saying, “I want this helper app to run on **every single computer** we have.” As mentioned earlier, it’s great for things like log collectors or security checkers – small helpers that every machine should have.

---

## 6️⃣ StatefulSets

A **StatefulSet** is the workload API object used to manage stateful applications (applications that store data, for example in their filesystem – databases). It manages the deployment and scaling of a set of Pods and provides guarantees about the ordering and uniqueness of these Pods.

StatefulSets are designed for applications that require persistent storage and stable network identities, like databases.

Let’s say you’re running a database or anything that needs to save info. A StatefulSet is like giving each app a name tag and a personal drawer to store their stuff. Even if you restart them, they come back with the same name and same drawer.

---

## 7️⃣ Jobs

A **Job** creates one or more Pods and ensures that a specified number of them successfully terminate. As Pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the Job is complete. ​

A Job is like a one-time task. Imagine sending out a batch of emails or processing a report. You want the task to run, finish, and then stop. That’s exactly what a Job does.

---

## 8️⃣ CronJobs

A **CronJob** creates Jobs on a time-based schedule. It runs a Job periodically on a given schedule, written in Cron format.

A CronJob is like setting a reminder or alarm. It tells your app (in this case the Job) to do something every night at 2 AM, every Monday morning, or once a month – whatever schedule you give it.
