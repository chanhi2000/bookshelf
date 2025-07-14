---
lang: en-US
title: "How to Create a Kubernetes Cluster in a Demo Environment with play-with-k8s"
description: Article(s) > (4/8) Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses 
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
      content: Article(s) > (4/8) Learn Kubernetes – Full Handbook for Developers, Startups, and Businesses
    - property: og:description
      content: "How to Create a Kubernetes Cluster in a Demo Environment with play-with-k8s"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-handbook-devs-startups-businesses/how-to-create-a-kubernetes-cluster-in-a-demo-environment-with-play-with-k8s.html
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
  url="https://freecodecamp.org/news/learn-kubernetes-handbook-devs-startups-businesses#heading-how-to-create-a-kubernetes-cluster-in-a-demo-environment-with-play-with-k8s"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746205417767/d9d6b0d3-f2a5-44eb-83b5-d1a614bead9f.png"/>

As we've discussed earlier, a Kubernetes cluster is a set of machines (called nodes) that run containerized applications.

Setting up a Kubernetes cluster locally or in the cloud can be complex and expensive. To simplify the learning process, Docker provides a free, browser-based platform called [<FontIcon icon="fas fa-globe"/>Play with Kubernetes](https://labs.play-with-k8s.com/). This environment allows you to create and interact with a Kubernetes cluster without installing anything on your local machine. It's an excellent tool for beginners to get hands-on experience with Kubernetes.

---

## 🔐 Sign in to Play with Kubernetes

1. **Visit the platform** at [<FontIcon icon="fas fa-globe"/>https://labs.play-with-k8s.com/](https://labs.play-with-k8s.com/).
2. **Authenticate:**
    - Click on the "Login" button.
    - You can sign in using your Docker Hub or GitHub account.
    - If you don't have an account, you can create one for free on [<FontIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) or [<FontIcon icon="iconfont icon-github"/>GitHub](https://github.com/).

![Sign in to Play with k8s](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083007442/a038ee6c-b471-4880-ba17-2e8927678780.png)

---

## 🚀 Create Your Kubernetes Cluster

Once signed in, follow these steps to set up your cluster:

### Step 1: Start a New Session:

Click on the **"Start"** button to initiate a new session. This will create a new session giving you about 4 hours of play time, after which the cluster and it’s resources will be automatically terminated.

![Play with k8s timed session](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083204331/8410e18b-4ed4-4374-8d4f-44f0fefa1623.png)

### Step 2: Add Instances:

Then click on **"+ Add New Instance"** to create a new node (Virtual Machine).

![Create new master node (VM)](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083280594/740d963a-c70f-43c6-8354-e6ea0c3d7f41.png)

This will open a terminal window where you can run commands.

![Terminal of newly created node](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083304493/ffd34d73-e5cd-41d0-908a-2240924e7ad0.png)

### Step 3: Initialize the Master Node:

In the terminal, run the following command to initialize the master node:

```sh
kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr <SPECIFIED_IP_ADDRESS>
```

You can find the command in the terminal. In my case, the IP address is `10.5.0.0/16`. Replace the `<SPECIFIED_IP_ADDRESS>` placeholder with the IP address specified in your terminal.

![Initialize the master node and the control plane](https://cdn.hashnode.com/res/hashnode/image/upload/v1746083865451/fdf18710-c987-4221-bc02-369cd709a849.png)

This process will set up the control plane of your Kubernetes cluster.

### Step 4: Add Worker Nodes:

If you want to add worker nodes, in the master node terminal, you'll find a `kubeadm join...` command after running the `kubeadm init --apiserver-advertise-address $(hostname -i) --pod-network-cidr <SPECIFIED_IP_ADDRESS>` command.

![Command to add worker node to control plane](https://cdn.hashnode.com/res/hashnode/image/upload/v1746084559142/6e539ef6-0219-40da-95e7-42abc9f1af8c.png)

Click on **"+ Add New Instance"** to create another node just as you did earlier.

Run this command in the new node's terminal to join it to the cluster:

![Add worker node to control plane](https://cdn.hashnode.com/res/hashnode/image/upload/v1746084666411/78f07ba1-7f1f-402e-9ed8-c4d6054bdcab.png)

### Step 5: Configure the Cluster’s networking:

Navigate to the master node, and run the command below to configure the cluster’s networking.

```sh
kubectl apply -f https://raw.githubusercontent.com/cloudnativelabs/kube-router/master/daemonset/kubeadm-kuberouter.yaml
```

![Configure networking in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746085296963/ba35966c-5dd1-4e17-b4b5-85639cb3a80d.png)

### Step 6: Verify the Cluster:

In the master node terminal (the first node with the highlighted user profile), run:

```sh
kubectl get nodes
```

You should see a list of nodes in your cluster, including the master and any worker nodes you've added.

![Nodes in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1746085583418/45e55418-4b0f-461f-98d8-3b0c8f19b839.png)

Congratulations! You just created your very own Kubernetes cluster with 2 VMs: the master node (where the control plane resides), and the worker nodes (where the Kubernetes workloads, for example Pods, will be deployed).