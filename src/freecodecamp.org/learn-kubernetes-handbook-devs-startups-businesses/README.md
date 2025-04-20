---
lang: en-US
title: "Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses"
description: "Article(s) > Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses"
icon: iconfont icon-k8s
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
      content: "Article(s) > Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses"
    - property: og:description
      content: "Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/
prev: /devops/k8s/articles/README.md
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
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses"
  desc="You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s..."
  url="https://freecodecamp.org/news/learn-kubernetes-handbook-devs-startups-businesses"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png"/>

You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It sounds important, but also... kinda mysterious.

So what is Kubernetes, really? Why is it everywhere? And should you care?

In this handbook, we’ll unpack Kubernetes in a way that actually makes sense. No buzzwords. No overwhelming tech-speak. Just straight talk. You’ll learn what Kubernetes is, how it came about, and why it became such a big deal – especially for teams building and running huge apps with millions of users.

We’ll rewind a bit to see how things were done before Kubernetes showed up (spoiler: it wasn’t pretty), and walk through the real problems it was designed to solve.

By the end, you’ll not only understand the purpose of Kubernetes, but you’ll also know how to deploy a simple app on a Kubernetes cluster – even if you’re just getting started.

Yep, by the time we’re done, you’ll go from *“I keep hearing about Kubernetes”* to *“Hey, I kinda get it now!”* 😄

---

## 📚 Table of Contents

1. [What is Kubernetes?](#heading-what-is-kubernetes)
2. [How Applications Were Deployed Before Kubernetes](#heading-how-applications-were-deployed-before-kubernetes)
3. [The Problem Kubernetes Solves 🧠](#heading-the-problem-kubernetes-solves)
4. [How Kubernetes Works – Components of a Kubernetes Environment 🧑‍🔧](#heading-how-kubernetes-works-components-of-a-kubernetes-environment)
5. [Kubernetes Workloads 🛠️ – Pods, Deployments, Services, & More](#heading-kubernetes-workloads-pods-deployments-services-amp-more)
6. [How to Create a Kubernetes Cluster in a Demo Environment with play-with-k8s](#heading-how-to=create-a-kubernetes-cluster-in-a-demo-environment-with-play-with-k8s)
7. [How to Deploy an Application on Your Kubernetes Cluster](#heading-how-to-deploy-your-application-on-a-kubernetes-cluster)
8. [✅ Advantages of Using Kubernetes in Business](#heading-advantages-of-using-kubernetes-in-business)
9. [😬 Disadvantages of Using Kubernetes](#heading-disadvantages-of-using-kubernetes)
10. [Use Cases: When (and When Not) to Use Kubernetes](#heading-use-cases-when-and-when-not-to-use-kubernetes)

---

## What is Kubernetes?

Imagine you're building a huge software platform, like a banking app. This app needs many features, like user onboarding, depositing money, withdrawals, payments, and so on. These features are so big and complex that it’s easier to split them into separate applications. These individual applications are called microservices.

**So what are Microservices**? Think of them like little building blocks that work together to create a bigger platform. So, you might have:

- One microservice for user onboarding
- Another for processing deposits
- Another for handling payments
- And many, many more!

To the user, it still looks like they’re using one smooth, unified banking app. But behind the scenes, it’s like a bunch of little apps working together to make everything run.

### But here’s where things get tricky...

When you have dozens (or even hundreds) of these microservices, managing them becomes a nightmare. You might need to:

- **Deploy** each one separately
- **Monitor** them individually (to ensure they don’t crash/become slow due to too much load)
- **Scale** them (make them bigger to handle more users) as traffic surges, one by one

So, if your banking app suddenly gets millions of users, you'd have to manually tweak and update each microservice to keep it running smoothly. 😖 It’s a lot of work, and if something goes wrong, you’re in deep trouble.

### This is where Kubernetes comes to the rescue! 🚀

Kubernetes is like a super-efficient manager for all these microservices. It’s a platform that helps you:

- **Automate** the deployment (getting the apps up and running)
- **Scale** the microservices (making them bigger or smaller as needed based on the inflow of traffic – your customers)
- **Monitor** them (keeping an eye on their health)
- **Ensure reliability** (so if one microservice breaks/fails, k8s replaces it immediately)

In simple terms, Kubernetes takes all your little microservices and organizes them, ensuring they run smoothly together, no matter how much traffic your app gets. It handles everything behind the scenes, like a conductor leading an orchestra, so your microservices work together without chaos.

---

## How Applications Were Deployed Before Kubernetes

Before Kubernetes came into the picture, software teams had quite the juggling act when it came to deploying applications – especially when they were made up of lots of microservices.

One popular method was using a **distributed system** setup. Here’s what that looked like:

Imagine each microservice (like your user onboarding, payments, deposits, and so on) being installed on separate servers (physical computers or virtual machines). Each of these servers had to be carefully prepared:

- The microservice itself needed to be installed.
- The software dependencies it needed (like programming languages, libraries, tools) also had to be installed.
- Everything had to be configured manually ON EACH server.

And all of these servers had to talk to each other – sometimes over the public internet, or via private networks like VPNs.

Sounds like a lot of work, right? 😮 It was! Managing updates, fixing bugs, scaling up during traffic spikes, and keeping things from crashing could turn into a full-time headache for developers and system admins. 😖

### Then Came Containers 🚢

A more modern solution that eased the pain (a little) was using containers.

**So, what are containers?**

Think of a container like a lunchbox for your microservice. Instead of installing the microservice and its supporting tools directly on a server, you pack everything it needs – code, settings, software libraries – into this single, neat container. Wherever the container goes, the microservice runs exactly the same way. No surprises!

Tools like [<FontIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/) made this super easy. Once your microservice was packed into a container, you could deploy it on:

- A single server
- Multiple servers
- Or cloud platforms like AWS Elastic Beanstalk, Azure App Service, or Google Cloud Run.

---

## The Problem Kubernetes Solves**

At first, when containers arrived on the scene, it felt like developers had struck gold.

You could package a microservice into a neat little container and run it anywhere – no more installing the same software on every server again and again. Tools like Docker and Docker Compose made this smooth for small projects.

But the real world? That’s where it got messy.

### The Growing Headache of Managing Containers 💡

When you have just a few microservices, you can manually deploy and manage their containers without much stress. But when your app grows – and you suddenly have dozens or even hundreds of microservices – managing them becomes an uphill battle:

- You had to deploy each container manually.
- You had to restart them if one crashed.
- You had to scale them one by one when more users started flooding in.

Docker and Docker Compose were great for a small playground or startups, but not for an enterprise application with high traffic inflow.

### Cloud-Managed Services Helped... But Only Up To a Point 🧑‍💻

Cloud services like AWS Elastic Beanstalk, Azure App Service, and Google Code Engine offered a shortcut. They let you deploy containers without worrying about setting up servers.

You could:

- Deploy each container on its own managed cloud instance.
- Scale them automatically based on traffic.

BUT there were still some big headaches:

#### 📦 Grouping microservices was awkward and expensive

Sure, you could organize containers by environment (like “testing” or “production”) or even by team (like “Finance” or “HR”). But each new microservice usually needed its own cloud instance – for example, a separate Azure App Service or Elastic Beanstalk environment FOR EVERY SINGLE CONTAINER.

Imagine this:

- Each App Service instance costs ~$50 per month.
- You’ve got 10 microservices.
- That’s $500/month... even if they’re barely used. 💸 Yikes!

### Kubernetes: Smarter, Leaner, and More Flexible 💪

With Kubernetes, you don’t need to spin up a separate server for each microservice. You can start with just one or two servers (VMs) – and Kubernetes will automatically decide which container goes where based on available space and resources.

No stress, no waste! 💡

### 🧑‍🍳 Kubernetes Lets You Customize Everything

#### 1. You can assign resources to each microservice container

👉 Example: If you have a "Payment" microservice that’s lightweight, you might give it 0.5 vCPUs and 512MB of memory. If you have a "Data Analytics" microservice that’s resource-hungry, you could give it 2 vCPUs and 4GB of memory.

#### 2. You can set a minimum number of instances for each microservice.

👉 Example: If you want at least 2 copies of your "Login" service always running (so your app doesn’t break if one fails), Kubernetes makes sure you always have 2 live copies at all times.

#### 3. You can group your containers however you like:

👉 By teams (Finance, HR, DevOps) or by environments (Testing, Staging, Production). Kubernetes makes this grouping super clean and logical.

#### 4. You can automatically scale individual containers.

👉 When more users flood your app, Kubernetes can create extra copies (called “replicas”) of only the containers that are under pressure. No more wasting resources on containers that don’t need it.

#### 5. You can even scale your servers!

👉 Kubernetes can automatically increase the number of servers (VMs) in your environment – called a **Cluster** – when traffic grows. So you could start with 2 VMs at $30 each ($60/month) and let Kubernetes add more servers only when necessary, rather than locking yourself into high fixed costs like $500/month for cloud-managed services.

Also, Kubernetes works **the same way everywhere**. Whether you deploy your containers on AWS, Google Cloud, Azure, or even your own laptop – Kubernetes doesn’t care. Your setup stays the same.

Compare that to managed services like Elastic Beanstalk or Azure App Service – which tie you to their platform, making it super hard to switch later.

✅ **In short:** Kubernetes saves you money, time, and a whole lot of headaches. It lets you run, scale, and organize your microservices without being chained to a single cloud provider — and without drowning in manual work.

---

## How Kubernetes Works — Components of a Kubernetes Environment** 

So by now you’ve seen the problem: running dozens (or hundreds!) of microservices manually is like juggling too many balls – you’re bound to drop some.

That’s why Kubernetes was created. But... how does it actually do all this magic? Let’s first break it down with the technical definition (simple but sharp – perfect for interviews) and then the layperson’s analogy (so it sticks in your head!).

### 1️⃣ Cluster 🏰

A Kubernetes Cluster is the entire setup of machines (physical or cloud-based) where Kubernetes runs. It’s made of one or more Master Nodes and Worker Nodes, working together to deploy and manage containerized applications.

Think of a Kubernetes Cluster as your entire playground. This is the environment where all your microservices live, grow, and play together.

A cluster is made up of two types of computers (called nodes):

- Master Node (nowadays often called the Control Plane)
- Worker Nodes

### 2️⃣ Master Node (Control Plane) 👑

The Master Node is like the brain of Kubernetes. It manages and coordinates the whole cluster – deciding which applications run where, monitoring health, and scaling things up or down as needed.

It’s like the boss of the entire cluster. It doesn’t run your applications directly. Instead, it:

- Watches over the worker nodes
- Decides which microservice (container) goes where
- Makes sure everything runs smoothly and fairly

Think of it like a factory manager who tells machines what to do, when to start, when to stop, and where to send the next package.

Inside the Master Node are a few clever mini-components that handle the real work.

### 3️⃣ API Server 💌

The API Server is the front door to Kubernetes. It handles communication between users and the system, taking commands and feeding them into the cluster.

This is where you (or your team) give Kubernetes instructions. Whether you're deploying a new app or scaling an existing one, you "talk" to the API Server first. It's like submitting a request at the front desk – the API server passes it on to the right people (or machines).

### 4️⃣ Scheduler 📅

The Scheduler assigns Pods (applications) to Worker Nodes based on available resources and needs.

Imagine you’ve asked Kubernetes to launch a new microservice. The Scheduler checks:

- Which worker node has enough space?
- Which node has enough memory and CPU?
- Where would this service run best?

It makes the decision and assigns the microservice to the perfect spot. Smart, huh?

### 5️⃣ Controller Manager 🎛️

The Controller Manager runs controllers that watch over the cluster and ensures that the system’s actual state matches the desired state.

This component watches over the system like a hawk. Let’s say you told Kubernetes:  
*"Hey, I want 3 copies of my payment microservice running at all times."*

If one of them crashes, the Controller Manager sees that and spins up a new one to replace it automatically. It makes sure the reality always matches the plan.

### 6️⃣ etcd 📚

etcd is Kubernetes' memory – a distributed key-value store where cluster data is saved: config files, state, and metadata.

Imagine a notebook where all rules, records, and plans are written down. Without etcd, Kubernetes would forget everything.

### 7️⃣ Worker Nodes 💪

Worker Nodes are the servers that run the actual application containers, doing the heavy lifting in the cluster.

These are the machines where your microservices actually live and run. The Master Node gives orders, but the Worker Nodes do the heavy lifting – they run your containers!

Each worker node has a few helpers to manage its microservices:

- The Kubelet
- The Kube Proxy

### 8️⃣ Kubelet 📢

The Kubelet is the agent which lives on each Worker Node that makes sure containers are healthy and running as expected.

It listens to the Master Node’s instructions. If the Master Node says:*"Hey, run this container!",* the Kubelet makes it happen and keeps it running. If something goes wrong, the Kubelet reports back to the Master Node

### 9️⃣ Kube Proxy 🚦

Kube Proxy handles network traffic, ensuring that Pods can talk to each other and to the outside world.

Imagine your banking app’s login service needs to talk to the payments service. The Kube Proxy handles the routing so the request reaches the right place. It also handles load balancing, so no single microservice gets overwhelmed.

So, to summarize:

- The Master Node is the boss – it plans, watches, and assigns tasks.
- The Worker Nodes do the actual work – running your microservices.
- Components like etcd, Kubelet, Scheduler, Controller Manager, and Kube Proxy all work together like parts of a well-oiled machine.

Kubernetes is designed to handle your microservices automatically – keeping them alive, scaling them up, moving them around, and restarting them if they crash – so you don’t have to babysit them yourself.

---

## Kubernetes Workloads 🛠️ — Pods, Deployments, Services, & More

Kubernetes workloads are the objects you use to manage and run your applications. Think of them as blueprints 📐 that tell Kubernetes **what** to run and **how** to run it – whether it’s a single app container, a group of containers, a database, or a batch job. Here are some of the workloads in Kubernetes:

### 1️⃣ Pods

A **Pod** is the smallest and simplest unit in the Kubernetes object model. It represents a single instance of a running process in your cluster and can contain one or more containers that share storage and network resources. ​

Think of a Pod as a wrapper around one or more containers that need to work together. They share the same network IP and storage, allowing them to communicate easily and share data. Pods are ephemeral (live for a short time, they can be replaced very easily). If a Pod dies, Kubernetes can create a new one to replace it almost instantly.​

Say you have an application which is split into 2 distributed monoliths – a frontend and a backend. The frontend will run in a container in Pod A, while the backend app will run in a container in another Pod B.

### 2️⃣ Deployments

A **Deployment** provides declarative updates for Pods and ReplicaSets. You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate.

Deployments manage the lifecycle of your application Pods. They ensure that the specified number of Pods are running and can handle updates, rollbacks, and scaling. If a Pod fails, the Deployment automatically replaces it to maintain the desired state.​

Imagine you're managing a store. A Deployment is like the store manager – you tell it how many workers (Pods) you want, and it makes sure they’re always present. If one doesn't show up for work, the manager finds a replacement automatically. You can also tell it to hire more workers or fire some when needed.

### 3️⃣ Services

A **Service** in Kubernetes defines a way to access/communicate with Pods. Services enable communication between different Pods (for example, your frontend Pod A can communicate with your backend Pod B via a service) and can expose your application to external traffic (for example the public internet). ​

Services act as a stable endpoint to access a set of Pods. Even if the underlying Pods change, the Service's IP and DNS name remain constant, ensuring communication between the Pods within the cluster or with the internet.

A Service is like the front door to your app. No matter which worker (Pod) is behind it, people always use the same entrance to access it. It hides the messy stuff happening behind the scenes and gives users a simple way to connect to your app.

### 4️⃣ ReplicaSets

A **ReplicaSet** ensures that a specified number of identical Pods are running at any given time. It is often used to guarantee the availability of a specified number of Pods (horizontal scaling). ​

ReplicaSets maintain a stable set of running Pods. If a Pod crashes or is deleted, the ReplicaSet automatically creates a new one to replace it, ensuring your application remains available.​

Think of a ReplicaSet like a robot that counts how many copies of your app are running. If one goes missing, it automatically makes a new one. It keeps the number steady, just like you told it to.

### 5️⃣ DaemonSets

A **DaemonSet** ensures that all (or some) Nodes run an instance (a copy) of a specific Pod. As nodes are added to the cluster, Pods are added to them. As nodes are removed from the cluster, those Pods are also removed. ​

DaemonSets are used to deploy a Pod on every node in the cluster. This is useful for running background tasks like log collection or monitoring agents on all nodes (for example to get the CPU, memory, and disk usage of each node).​

A DaemonSet is like saying, “I want this helper app to run on **every single computer** we have.” As mentioned earlier, it’s great for things like log collectors or security checkers – small helpers that every machine should have.

### 6️⃣ StatefulSets

A **StatefulSet** is the workload API object used to manage stateful applications (applications that store data, for example in their filesystem – databases). It manages the deployment and scaling of a set of Pods and provides guarantees about the ordering and uniqueness of these Pods.

StatefulSets are designed for applications that require persistent storage and stable network identities, like databases.

Let’s say you’re running a database or anything that needs to save info. A StatefulSet is like giving each app a name tag and a personal drawer to store their stuff. Even if you restart them, they come back with the same name and same drawer.

### 7️⃣ Jobs

A **Job** creates one or more Pods and ensures that a specified number of them successfully terminate. As Pods successfully complete, the Job tracks the successful completions. When a specified number of successful completions is reached, the Job is complete. ​

A Job is like a one-time task. Imagine sending out a batch of emails or processing a report. You want the task to run, finish, and then stop. That’s exactly what a Job does.

### 8️⃣ CronJobs

A **CronJob** creates Jobs on a time-based schedule. It runs a Job periodically on a given schedule, written in Cron format.

A CronJob is like setting a reminder or alarm. It tells your app (in this case the Job) to do something every night at 2 AM, every Monday morning, or once a month – whatever schedule you give it.

---

## 🛠️ How to Create a Kubernetes Cluster in a Demo Environment with `play-with-k8s`

As we've discussed earlier, a Kubernetes cluster is a set of machines (called nodes) that run containerized applications.

Setting up a Kubernetes cluster locally or in the cloud can be complex and expensive. To simplify the learning process, Docker provides a free, browser-based platform called [<FontIcon icon="fas fa-globe"/>Play with Kubernetes](https://labs.play-with-k8s.com/). This environment allows you to create and interact with a Kubernetes cluster without installing anything on your local machine. It's an excellent tool for beginners to get hands-on experience with Kubernetes.​

### 🔐 Sign in to Play with Kubernetes

1. **Visit the platform** at [<FontIcon icon="fas fa-globe"/>https://labs.play-with-k8s.com/](https://labs.play-with-k8s.com/).​
2. **Authenticate:**
    - Click on the "Login" button.
    - You can sign in using your Docker Hub or GitHub account.
    - If you don't have an account, you can create one for free on [<FontIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) or [<FontIcon icon="iconfont icon-github"/>GitHub](https://github.com/).​

![Sign in to Play with k8s](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083007442/a038ee6c-b471-4880-ba17-2e8927678780.png)

### 🚀 Create Your Kubernetes Cluster

Once signed in, follow these steps to set up your cluster:

#### Step 1: Start a New Session:

Click on the **"Start"** button to initiate a new session.​ This will create a new session giving you about 4 hours of play time, after which the cluster and it’s resources will be automatically terminated.

![Play with k8s timed session](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083204331/8410e18b-4ed4-4374-8d4f-44f0fefa1623.png)

#### Step 2: Add Instances:

Then click on **"+ Add New Instance"** to create a new node (Virtual Machine).

![Create new master node (VM)](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083280594/740d963a-c70f-43c6-8354-e6ea0c3d7f41.png)

This will open a terminal window where you can run commands.​

![Terminal of newly created node](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083304493/ffd34d73-e5cd-41d0-908a-2240924e7ad0.png)

#### Step 3: Initialize the Master Node:

In the terminal, run the following command to initialize the master node:​

```sh
kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr <SPECIFIED_IP_ADDRESS>
```

You can find the command in the terminal. In my case, the IP address is `10.5.0.0/16`. Replace the `<SPECIFIED_IP_ADDRESS>` placeholder with the IP address specified in your terminal.

![Initialize the master node and the control plane](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083865451/fdf18710-c987-4221-bc02-369cd709a849.png)

This process will set up the control plane of your Kubernetes cluster.​

#### Step 4: Add Worker Nodes:

If you want to add worker nodes, in the master node terminal, you'll find a `kubeadm join...` command after running the `kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr <SPECIFIED_IP_ADDRESS>` command.

![Command to add worker node to control plane](https://cdn.hashnode.com/res/hashnode/image/upload/v1746084559142/6e539ef6-0219-40da-95e7-42abc9f1af8c.png)

Click on **"+ Add New Instance"** to create another node just as you did earlier.

Run this command in the new node's terminal to join it to the cluster:

![Add worker node to control plane](https://cdn.hashnode.com/res/hashnode/image/upload/v1746084666411/78f07ba1-7f1f-402e-9ed8-c4d6054bdcab.png)

#### Step 5: Configure the Cluster’s networking:

Navigate to the master node, and run the command below to configure the cluster’s networking.

```sh
kubectl apply -f https://raw.githubusercontent.com/cloudnativelabs/kube-router/master/daemonset/kubeadm-kuberouter.yaml
```

![Configure networking in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746085296963/ba35966c-5dd1-4e17-b4b5-85639cb3a80d.png)

#### Step 6: Verify the Cluster:

In the master node terminal (the first node with the highlighted user profile), run:​

```sh
kubectl get nodes
```

You should see a list of nodes in your cluster, including the master and any worker nodes you've added.​

![Nodes in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746085583418/45e55418-4b0f-461f-98d8-3b0c8f19b839.png)

Congratulations! You just created your very own Kubernetes cluster with 2 VMs: the master node (where the control plane resides), and the worker nodes (where the Kubernetes workloads, for example Pods, will be deployed).

---

## 🚀 How to Deploy an Application on Your Kubernetes Cluster

Now that we've set up our Kubernetes cluster using Play with Kubernetes, it's time to deploy the application and make it accessible over the internet.

### 🧠 Understanding Imperative vs. Declarative Approaches in Kubernetes

Before we proceed, it's essential to grasp the two primary methods for managing resources in Kubernetes: **Imperative** and **Declarative**.

### 🖋️ Imperative Approach

In the imperative approach, you directly issue commands to the Kubernetes API to create or modify resources. Each command specifies the desired action, and Kubernetes executes it immediately.​

Imagine telling someone, "Turn on the light." You're giving a direct command, and the action happens right away. Similarly, with imperative commands, you instruct Kubernetes step-by-step on what to do.

::: tip Example:

To create a pod running an NGINX container, run the below command in the terminal of the master node:​

```sh
kubectl run nginx-pod --image=nginx
```

Now wait a few seconds and run the command below to check the status of the pod:

```sh
kubectl get pods
```

You should get a response similar to this

![Get pods running in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746087463204/52ef26e5-96df-4d91-8a2d-7527a38786d2.png)

:::

Now let’s expose our Pod to the internet by creating a **Service.** Run the command below to expose the Pod:

```sh
kubectl expose pod nginx-pod --type=NodePort --port=80
```

To get the IP address of the Cluster so we can access our Pod, run the command below:

```sh
kubectl get svc
```

The command displays the IP address from which we can access our service. You should get an output similar to this:

![Get service IP address](https://cdn.hashnode.com/res/hashnode/image/upload/v1746088678881/a4f3bdbc-c7eb-4696-ba6e-587637be5792.png)

Now, copy the IP address for the `nginx-pod` service and run the command below to make a request to your Pod:

```sh
curl <YOUR-SERVICE-IP-ADDRESS>
```

Replace the `<YOUR-SERVICE-IP-ADDRESS>` placeholder with the IP address of your `nginx-pod` service. In my case, it’s `10.98.108.173`.

You should get a response from your `nginx-pod` Pod:

![Make a request to the Nginx Pod running in the Cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746088937046/8b86cd63-21f0-45d3-9ab5-59bd630fb37c.png)

We couldn’t access the Pod from the internet, that is our browser, because our Cluster isn’t connected to a cloud service like AWS or Google Cloud which can provide us with an external load balancer.

Now let’s try doing the same thing but using the Declarative method.

### 🚀 Declarative Approach

So far, we used the imperative approach, where we typed commands like `kubectl run` or `kubectl expose` directly into the terminal to make Kubernetes do something immediately.

But Kubernetes has another (and often better) way to do things: the declarative approach.

#### 🧾 What Is the Declarative Approach?

Instead of giving Kubernetes instructions step-by-step like a chef in a kitchen, you give it a full recipe – a file that describes exactly what you want (for example, what app to run, how many copies of it, how to expose it, and so on).

This recipe is written in a file called a **manifest**.

#### 📘 What’s a Manifest?

A manifest is a file (usually written in YAML format) that describes a Kubernetes object – like a Pod, a Deployment, or a Service.

It’s like writing down what you want, handing it over to Kubernetes, and saying: “Hey, please make sure this exists exactly how I described it.”

We’ll use two manifests:

1. One to deploy our application
2. Another to expose it to the internet

Let’s walk through it!

#### 📁 Step 1: Clone the GitHub Repo

We already have a GitHub repo that contains the two manifest files we need. Let’s clone it into our Kubernetes environment.

Run this in the terminal (on your master node):

```sh
git clone https://github.com/onukwilip/simple-kubernetes-app
```

Now, let’s go into the folder:

```sh
cd simple-kubernetes-app
```

You should see two files:

- <FontIcon icon="iconfont icon-yaml"/>`deployment.yaml`
- <FontIcon icon="iconfont icon-yaml"/>`service.yaml`

#### 📦 Step 2: Understanding the Deployment Manifest (<FontIcon icon="iconfont icon-yaml"/>`deployment.yaml`)

This manifest will tell Kubernetes to deploy our app and ensure it’s always running.

Here’s what’s inside:

```yaml :collapsed-lines title="deployment.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
```

Now, let’s break this down:

- `apiVersion: apps/v1`: This tells Kubernetes which version of the API we’re using to define this object.
- `kind: Deployment`: This means we’re creating a Deployment (a controller that manages Pods).
- `metadata.name`: We’re giving our Deployment a name: `nginx-deployment`.
- `spec.replicas: 3`: We’re telling Kubernetes: “Please run 3 copies (replicas) of this app.”
- `selector.matchLabels`: Kubernetes will use this label to find which Pods this Deployment is managing.
- `template.metadata.labels` & `spec.containers`: This section describes the Pods that the Deployment should create – each Pod will run a container using the official `nginx` image.

✅ In plain terms: We're asking Kubernetes to create and maintain 3 copies of an app that runs NGINX, and automatically restart them if any fails.

#### 🌐 Step 3: Understanding the Service Manifest (<FontIcon icon="iconfont icon-yaml"/>`service.yaml`)

This file tells Kubernetes to expose our NGINX app to the outside world using a Service.

Here’s the file – let’s break this down, too:

```yaml title="service.yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

- `apiVersion: v1`: We’re using version 1 of the Kubernetes API.
- `kind: Service`: We’re creating a Service object.
- `metadata.name: nginx-service`: Giving it a name.
- `spec.type: NodePort`: We’re exposing it through a port on the node (so we can access it via the node's IP address).
- `selector.app: nginx`: This tells Kubernetes to connect this Service to Pods with the label `app: nginx`.
- `ports.port` and `targetPort`: The Service will listen on port 80 and forward traffic to port 80 on the Pod.

✅ In plain terms: This file says, “Expose our NGINX app through the cluster’s network so we can access it from the outside world.”

#### 🧹 Step 4: Clean Up Previous Resources

If you’re still running the Pod and Service we created using the imperative approach, let’s delete them to avoid conflicts:

```sh
kubectl delete pod nginx-pod
kubectl delete service nginx-pod
```

#### 📥 Step 5: Apply the Manifests

Now let’s deploy the NGINX app and expose it – this time using the **declarative** way.

From inside the <FontIcon icon="fas fa-folder-open"/>`simple-kubernetes-app` folder, run:

```sh
kubectl apply -f deployment.yaml
```

Then:

```sh
kubectl apply -f service.yaml
```

This will create the Deployment and the Service described in the files. 🎉

#### 🔍 Step 6: Check That It’s Running

Let’s see if the Pods were created:

```sh
kubectl get pods
```

You should see 3 Pods running!

And let’s check the service:

```sh
kubectl get svc
```

Look for the `nginx-service`. You’ll see something like:

![Access service NodePort](https://cdn.hashnode.com/res/hashnode/image/upload/v1746092825896/617084f1-3a71-4cfd-a287-9f7a9ac08810.png)

Note the **NodePort** (for example, `30001`) as we’ll use it to access the app.

#### 🌍 Step 7: Access the App

You can now send a request to your app like this:

```sh
curl http://<YOUR-NODE-IP>:<NODE-PORT>
```

::: note 

Replace `<YOUR-NODE-IP>` with the IP of your master node (you’ll usually find this in Play With Kubernetes at the top of your terminal), and `<NODE-PORT>` with the NodePort shown in the `kubectl get svc` command.

:::

![Get master node IP address](https://cdn.hashnode.com/res/hashnode/image/upload/v1746092570586/b33cabc0-ea1e-4a70-ab55-9f3a0761bec0.png)

You should see the HTML content of the NGINX welcome page printed out.

![Now terminate the cluster environment by clicking the **CLOSE SESSION** button](https://cdn.hashnode.com/res/hashnode/image/upload/v1746093081895/79139f75-5e6b-4991-be74-38ecbbf2ef66.png)

### 🆚 Why Declarative Is Better (In Most Cases)

- 🔁 **Reusable**: You can use the same files again and again.
- 📦 **Version-controlled**: You can push these files to GitHub and track changes over time.
- 🛠️ **Fixes mistakes easily**: Want to change 3 replicas to 5? Just update the file and re-apply!
- 🧠 **Easier to maintain**: Especially when you have many resources to manage.

---

## 💼 Advantages of Using Kubernetes in Business

Kubernetes isn’t just a developer tool—it’s a business enabler as well. It helps companies deliver products faster, more reliably, and with reduced operational overhead.

Let’s break down how Kubernetes translates to real-world business benefits:

### 1️⃣ Better Use of Cloud Resources = Cost Savings

Before Kubernetes, deploying many microservices for a single application often meant creating separate cloud resources (like one Azure App Service per microservice), which could rack up huge costs quickly. Imagine $50/month per service × 10 services = $500/month 😬.

::: info With Kubernetes:

You can run multiple microservices on fewer virtual machines (VMs) while Kubernetes automatically decides the most efficient way to use the available servers. That means you pay for fewer servers and get more out of them 💸.

:::

### 2️⃣ High Availability and Uptime = Happy Customers

Kubernetes watches your apps like a hawk 👀. If one of them crashes or fails, Kubernetes restarts or replaces it *immediately* – automatically.

::: info For your business:

This means less downtime, fewer support tickets, and happier customers who don’t even notice when things go wrong in the background.

:::

### 3️⃣ Easy Scaling During High Demand

Manually scaling apps during high traffic (like Black Friday) can be a nightmare 😰. And if you don't act fast, customers experience slowness or crashes.

::: info With Kubernetes:

You can configure each microservice to automatically scale — meaning it adds more instances of that service *only when needed* (too many users on your site trying to purchase different products) and scales back down when traffic drops. This ensures your app is always responsive and you only pay for what you use.

:::

### 4️⃣ Faster Deployment = Faster Time to Market

Kubernetes supports automation and repeatability. Teams can deploy new features or microservices faster without worrying about infrastructure setup every time.

::: info For business:

This means faster product updates, quicker response to market demands, and competitive advantage 🚀.

:::

### 5️⃣ Consistent Environments = Fewer Bugs

Each microservice in Kubernetes is containerized, meaning it runs with all its dependencies in a self-contained package. You can run the exact same app setup in:

- Development
- Testing
- Production

This reduces bugs caused by "it works on my machine" issues 🤦‍♂️ and helps teams build with confidence.

### 6️⃣ Vendor Independence (Bye-bye to Vendor lock-in)

When you use cloud-managed services (like AWS Elastic Beanstalk or Azure App Service), it’s often hard to move to another provider because everything is tailored to that specific platform.

::: info With Kubernetes

It works the same way on AWS, Azure, GCP, or even your own data center. This means you can switch cloud providers easily and avoid being locked into one vendor – aka cloud freedom! ☁️🕊️

:::

### 7️⃣ Organizational Clarity

Kubernetes lets you organize your apps clearly. You can group workloads by:

- Team (for example, Finance, HR)
- Environment (for example, testing, staging, production)

This structure helps large teams collaborate better, stay organized, and manage resources efficiently.

---

## 😬 Disadvantages of Using Kubernetes

Like everything in tech, Kubernetes isn’t all rainbows and rockets 🚀. Just like any other tool, it has its pros and its cons. And it's super important for startup founders, product managers, or even CEOs to know when Kubernetes is the right fit – and when it’s just overkill.

Let’s break down the main disadvantages in a simple, honest way:

### 👨‍🔧 1. You’ll Likely Need a DevOps Engineer or Team

Kubernetes is powerful, yes. But that power comes with great responsibility 😅.

In simple terms:

- You don't just "click a button" and your app is magically running.
- Kubernetes needs someone who understands how to set it up, keep it running, and fix issues when they pop up. This person (or team) is usually called a DevOps Engineer, SIte Relability Engineer or Cloud Engineer.

Here’s what they’ll typically handle:

- Creating the cluster (the environment where your apps will run)
- Defining how your app containers should behave (how many should run, how much memory they need, when they should restart, and so on)
- Monitoring the apps and making sure they’re healthy
- Ensuring security rules are followed
- Handling automated scaling, deployment rollouts, backups, and so on.

::: note In short

You’ll need someone skilled to manage this tool. If you’re a solo founder or a small team with no DevOps experience, Kubernetes might be too much upfront.

:::

### 💰 2. Kubernetes Can Be Expensive (If Used Prematurely)

Kubernetes saves money at scale – but can cost more if you adopt it too early or for the wrong use case.

Here's why:

- Kubernetes is meant for managing multiple applications or microservices. If your business only has one small app, you’re using a rocket to deliver a pizza 🍕 – it’s just not necessary.
- Kubernetes is also best when you have high or unpredictable traffic. It can automatically scale up your services when traffic spikes...but if your traffic is steady and small, you won’t benefit much from that power.

Let’s say:

- You have one app with moderate traffic.
- You deploy it on Kubernetes (which requires at least 1–2 VMs + setup).
- You hire a DevOps engineer to manage it.
- You pay for cloud compute + storage + monitoring.

You could end up spending $300–$800/month or more... for something that could’ve been hosted on a simple service like [Render](https://render.com), [Heroku](https://heroku.com), or a basic VM for a fraction of the cost.

So when **should** you consider Kubernetes?

- When your platform is made up of multiple services (For example, separate services for user auth, payments, analytics, notifications, and so on)
- When you’re expecting traffic spikes (for example, launching in new countries, going viral, seasonal demand like black Friday)
- When you want flexibility in managing your infrastructure across cloud providers (AWS, GCP, Azure) or even on-premises

---

## 🧭 Use Cases: When (and When Not) to Use Kubernetes

Kubernetes is an incredibly powerful tool – but it’s not always the right solution from day one.

Let’s break down when it makes sense to use Kubernetes and when it might be overkill 👇

### ✅ When You Should Use Kubernetes

Kubernetes becomes essential in these scenarios:

#### 1. Your Application Is Made of Many Microservices

If your app is broken down into multiple microservices – like user authentication, payments, orders, notifications, and more – it’s a good sign that Kubernetes might eventually help.

Kubernetes can:

- Help manage each microservice independently
- Automatically scale each one based on demand
- Restart failed services automatically
- Make it easier to roll out updates to specific parts of the application

#### 2. You’re Getting *Steady and High* Traffic

It’s not just about complexity – it’s about demand.

If your app receives a consistent, high volume of users (like hundreds or thousands every day), and you start seeing signs that your servers are getting overloaded, Kubernetes shines here. It can:

- Automatically increase resources when traffic surges
- Balance the load across multiple servers
- Prevent downtime due to traffic spikes

#### 3. You Want Portability and Cloud Independence

If your business doesn’t want to be locked into just one cloud provider (for example, only AWS), Kubernetes gives you flexibility. You can move your application between AWS, GCP, Azure – or even to your own data center – with fewer changes.

#### 4. Your DevOps Team Is Growing

When you have multiple developers or teams working on different parts of the app, Kubernetes helps:

- Organize and isolate workloads per team
- Improve collaboration and consistency
- Provide easy access control and monitoring

### ❌ When You Should Not Use Kubernetes

Let’s be honest: Kubernetes is not for everyone, especially not at the beginning.

#### 1. You Just Launched Your App

In the early days of your product, when you’ve just launched and traffic is still low, Kubernetes is *overkill*. You don’t need its complexity (yet).

👉 Instead, deploy your app or each microservice on a simple virtual machine (VM). It’s cheaper and faster to get started.

#### 2. You Don’t Need Auto-scaling (Yet)

If traffic to your app is still small and manageable, a single server (or a few of them) can easily handle the load. In that case, it’s better to:

- Deploy your microservices manually or with Docker Compose
- Monitor and scale manually when needed
- Keep things simple until the need for automation becomes obvious

#### 3. You Don’t Have a DevOps Team

Kubernetes is powerful – but it needs expertise to set up and maintain. If you don’t have a DevOps engineer or someone who understands Kubernetes, it may cause more problems than it solves.

Hiring a DevOps team can be expensive, and setting up Kubernetes incorrectly can lead to outages, security risks, or wasted resources 💸

### 📈 When to Move to Kubernetes

So, what’s the best path forward?

Here’s a simple roadmap:

1. **Start small**: Deploy your app (or microservices) on one or a few VMs
2. **Watch traffic**: As user demand grows, increase VM size or replicate the app manually
3. **Track pain points**: If scaling becomes too manual, or if services crash under load...
4. **Then adopt Kubernetes** 🧠

It’s not about how complex your app is – it’s about when the traffic and growth demand an upgrade in how you manage things.

### 🎯 TL;DR for Founders and DevOps Teams

- Don’t jump to Kubernetes just because it’s trendy
- Use it only when traffic grows steadily and auto-scaling becomes necessary
- Kubernetes is most valuable when you want to scale reliably and efficiently
- Before that point, stick to simple deployments – it’ll save you time, money, and stress

---

## 🎉 Conclusion

Wow! What a journey we’ve been on 😄

We started by answering the big question — **What is Kubernetes?** We discovered that it’s not some mythical beast, but a powerful orchestration tool that helps us manage, deploy, scale, and maintain containerized applications in a smarter way.

Then, we took a step back in time to see how applications were deployed before Kubernetes — the headaches of manually installing software on servers, spinning up separate cloud instances for every microservice, and racking up huge cloud bills just to stay afloat. We also saw how containers simplified things, but even they had their own limitations when managed at scale.

That’s where Kubernetes came to the rescue

We explored:

- **The problems Kubernetes solves** – like auto-scaling, efficient resource management, cost savings, and seamless container grouping.
- **Kubernetes architecture and components** – breaking down complex terms like the cluster, master node, worker nodes, Pods, Services, Kubelet, and more, into simple, easy-to-digest ideas.
- **Kubernetes workloads** like Deployments, Pods, Services, DaemonSets, and StatefulSets, and what they do behind the scenes to keep our apps running reliably.

From theory to practice, we even got our hands dirty:

- We created a free Kubernetes cluster using Play with Kubernetes 🧪
- Deployed a real application using both imperative (direct command) and declarative (manifest file) approaches
- Understood why the declarative method makes our infrastructure easier to manage, especially when our systems grow.

Then we took a business lens 🔍 and looked at:

- The advantages of Kubernetes – from auto-scaling during traffic surges, to cost efficiency, and cloud-agnostic deployment.
- And also the disadvantages – like needing experienced DevOps engineers and not being ideal for every stage of a product's lifecycle.

Finally, we wrapped up with real-life use cases, highlighting when Kubernetes is a must-have, and when it’s better to wait – especially for early-stage startups still trying to find their audience.

So, whether you're a DevOps newbie, a startup founder, or just someone curious about how modern tech keeps your favorite apps online – you now have a strong foundational understanding of Kubernetes 🙌

Kubernetes is powerful, but it doesn't have to be overwhelming. With a solid grasp of the basics (which you now have 💪), you're well on your way to managing scalable applications like a pro.

Start simple. Grow smart. And when the time is right – Kubernetes will be your best friend.

---

## Study Further 📚

If you would like to learn more about Kubernetes, you can check out the courses below:

<SiteInfo
  name="Docker & Kubernetes: The Practical Guide [2025 Edition]"
  desc="Learn Docker, Docker Compose, Multi-Container Projects, Deployment and all about Kubernetes from the ground up!"
  url="https://udemy.com/course/docker-kubernetes-the-practical-guide/"
  logo="https://udemy.com/staticx/udemy/images/v8/favicon-16x16.png"
  preview="https://img-c.udemycdn.com/course/480x270/3490000_d298_2.jpg"/>

<SiteInfo
  name="Certified Kubernetes Application Developer (CKAD)"
  desc="LearnKartS에서 제공합니다. Master Kubernetes with CKAD Certification now. Here, you will learn key skills, technology, and concepts of Kubernetes, ... 무료로 등록하십시오."
  url="https://coursera.org/specializations/certified-kubernetes-application-developer-ckad-course/"
  logo="https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/favicon-v2-32x32.png"
  preview="https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~SPECIALIZATION!~certified-kubernetes-application-developer-ckad-course/XDP~SPECIALIZATION!~certified-kubernetes-application-developer-ckad-course.jpeg"/>

::: info About the Author 👨‍💻

Hi, I’m Prince! I’m a DevOps engineer and Cloud architect passionate about building, deploying, and managing scalable applications and sharing knowledge with the tech community

<SiteInfo
  name="GitHub Actions - The Complete Guide"
  desc="Learn how to build automated CI / CD workflows with GitHub's DevOps service."
  url="https://udemy.com/course/github-actions-the-complete-guide/"
  logo="https://udemy.com/staticx/udemy/images/v8/favicon-16x16.png"
  preview="https://img-c.udemycdn.com/course/480x270/4900166_73e5.jpg"/>

If you enjoyed this article, you can learn more about me by exploring more of my blogs and projects on my [LinkedIn profile (<FontIcon icon="fa-brands fa-linkedin"/>`prince-onukwili-a82143233`)](https://linkedin.com/in/prince-onukwili-a82143233/). You can find my [LinkedIn articles here (<FontIcon icon="fa-brands fa-linkedin"/>`prince-onukwili-a82143233`)](https://linkedin.com/in/prince-onukwili-a82143233/details/publications/). You can also [<FontIcon icon="fas fa-globe"/>visit my website](https://prince-onuk.vercel.app/achievements#articles) to read more of my articles as well. Let’s connect and grow together! 😊

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses",
  "desc": "You’ve probably heard the word Kubernetes floating around, or it’s cooler nickname k8s (pronounced “kates“). Maybe in a job post, a tech podcast, or from that one DevOps friend who always brings it up like it’s the secret sauce to everything 😅. It s...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
