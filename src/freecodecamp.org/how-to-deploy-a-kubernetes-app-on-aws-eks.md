---
lang: en-US
title: "How to Deploy a Kubernetes App on AWS EKS"
description: "Article(s) > How to Deploy a Kubernetes App on AWS EKS"
icon: fa-brands fa-aws
category:
  - DevOps
  - AWS
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
  - k8s
  - kubernetes
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy a Kubernetes App on AWS EKS"
    - property: og:description
      content: "How to Deploy a Kubernetes App on AWS EKS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-kubernetes-app-on-aws-eks.html
prev: /devops/aws/articles/README.md
date: 2025-08-22
isOriginal: false
author:
  - name: Ijeoma Igboagu
    url : https://freecodecamp.org/news/author/Ijay/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755863277691/28937c4d-5862-464d-84a1-dfab01a577bb.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Deploy a Kubernetes App on AWS EKS"
  desc="AWS makes it much easier to deploy containerized applications, and running Kubernetes in the cloud is a powerful way to scale and manage these applications. Among the many managed Kubernetes services AWS offers, Amazon EKS (Elastic Kubernetes Service..."
  url="https://freecodecamp.org/news/how-to-deploy-a-kubernetes-app-on-aws-eks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755863277691/28937c4d-5862-464d-84a1-dfab01a577bb.png"/>

AWS makes it much easier to deploy containerized applications, and running Kubernetes in the cloud is a powerful way to scale and manage these applications.

Among the many managed Kubernetes services AWS offers, Amazon EKS (Elastic Kubernetes Service) stands out for its seamless integration with the AWS ecosystem, strong reliability, and excellent support.

If you’re ready to move beyond local setups and want to deploy a real-world Kubernetes app on AWS EKS, this guide will walk you through the entire process. Whether you’re working on a microservice, a full-stack app, or just experimenting with Kubernetes in an environment that mimics production, you’ll find this walkthrough useful.

In this article, I’ll guide you through the process of creating your EKS cluster, deploying your application, and making it accessible over the internet, step by step.

::: note Prerequisites

To get started, make sure you have the following installed on your local machine:

- Have a basic understanding of cloud services.
- Have a basic understanding of the Linux command line.
- Have an [<FontIcon icon="fa-brands fa-aws"/>AWS account](https://aws.amazon.com/free/).
- Install eksctl, a simple CLI tool to create and manage EKS clusters.
- Install kubectl, the standard Kubernetes command-line tool.
- Install Docker to build and package your app into a container.

:::

Before setting up a Kubernetes cluster for our application, it’s essential to understand a few basic concepts.

---

## What is a Kubernetes Cluster?

A Kubernetes (also called K8S) cluster consists of machines (called nodes) that run containerized applications. It works alongside container engines like [<FontIcon icon="fas fa-globe"/>CRI-O](https://cri-o.io/#what-is-cri-o) or [<FontIcon icon="iconfont icon-containerd"/>containerd](https://containerd.io/) to help you deploy and manage your apps more efficiently.

Kubernetes nodes come in two main types:

- **Master nodes (control plane):** These handle the brainwork, such as scheduling, scaling, and managing the cluster’s overall state.
- **Worker nodes (data plane):** They run the actual applications inside the containers.

If you're new to Kubernetes or want to brush up, check out the free course [<FontIcon icon="fa-brands fa-linux"/>Introduction to Kubernetes (LFS158)](https://training.linuxfoundation.org/training/introduction-to-kubernetes/?lid=axmt8lvbjbl8) from the Linux Foundation.

---

## What is Amazon Elastic Kubernetes Service?

Amazon Elastic Kubernetes Service (EKS) is a managed service that enables easy Kubernetes deployment on AWS, eliminating the need to set up and maintain your own Kubernetes control plane node.

AWS EKS takes care of the heavy lifting by managing the control plane, handling upgrades, and installing core components, such as the container runtime and essential Kubernetes processes. It also offers built-in tools for scaling, high availability, and backup.

With EKS, you or your team can focus on building and running applications, while AWS handles the underlying infrastructure.

---

## Why Use Amazon EKS for Kubernetes?

Here are some key benefits of using AWS EKS:

- EKS handles upgrades, patching, and high availability for you, giving you a fully managed control plane with minimal manual effort.
- You can easily scale your applications, and the infrastructure grows as your needs evolve.
- It has built-in support for IAM roles, private networking, and encryption.
- AWS EKS runs on highly available infrastructure across multiple AWS Availability Zones, making your application available globally.
- With Amazon EKS, you get the power of Kubernetes without managing the underlying setup. So you can stay focused on building and running your apps.

---

## How to Create a Kubernetes Cluster Using AWS

Now let’s walk through the process of getting a Kubernetes cluster up and running.

![lets get started](https://cdn.hashnode.com/res/hashnode/image/upload/v1754818871609/8b0f622a-af82-4a29-bb22-fbdb1a6279bb.png)

### Step 1: How to Install the Tools Needed to Create a Cluster

The easiest and most developer-friendly way to spin up an Elastic Kubernetes Service that you can use at the production level is by using **eksctl**. It takes care of the manual setup and automatically provisions the necessary AWS resources.

Before we begin, we need to install two essential tools:

- **eksctl**: This is used to create and manage your EKS cluster.
- **kubectl**: This allows you to interact with your cluster, deploy apps, and manage Kubernetes resources.

These tools will make it easy to set up your Kubernetes cluster and work with it directly from your terminal.

#### How to Install `eksctl`

Open your browser and go to the official [<FontIcon icon="fas fa-globe"/>`eksctl`](https://eksctl.io/) documentation. Scroll down to the **Installation** section.

Scroll to the **Unix** instructions if you're using Ubuntu or a similar system. Then copy the installation command and paste it into your terminal.

![Installing `eksctl` tool](https://cdn.hashnode.com/res/hashnode/image/upload/v1754819104540/48310ddc-89fb-49b9-990b-ca425ac81e55.gif)

Once it’s done, run `eksctl version` to confirm that the installation was successful.

![checking the version](https://cdn.hashnode.com/res/hashnode/image/upload/v1754819269922/69d18189-f3ea-421b-9666-e37c43d7c077.gif)

#### How to Install `kubectl`

The next step is to install [<FontIcon icon="iconfont icon-k8s"/>`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/). You can find the installation instructions in the official Kubernetes documentation, which provides steps based on your operating system.

![Installing `kubectl`](https://cdn.hashnode.com/res/hashnode/image/upload/v1754819717619/028418cb-424a-4514-a7a7-dfd17c2c03ce.gif)

### Step 2: How to Create the Elastic Kubernetes Service (EKS) Cluster

Now that you've installed the tools needed to create and interact with a Kubernetes cluster on AWS, it's time to launch the cluster.

To get started, open your terminal and run the following command:

```sh
# Create an EKS cluster named "k8s-example" in eu-west-2 (London)
eksctl create cluster --name k8s-example --region eu-west-2
```

![Creating a terminal in your cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1754820013644/a763f4f1-4b5f-47c2-9c09-3148cb77f579.gif)

One great thing about using AWS EKS is that once your Kubernetes cluster is created, it automatically updates your <FontIcon icon="fas fa-folder-open"/>`~/.kube/`<FontIcon icon="fas fa-file-lines"/>`config` file. This means you can start interacting with your cluster right away, using `kubectl` - no extra setup needed.

![Cluster ready on AWS](https://cdn.hashnode.com/res/hashnode/image/upload/v1754825286662/7b7f68a9-72c1-4306-bc09-a0d5c528b900.png)

After running the command (as shown in the GIF above), your Kubernetes cluster is successfully created.

![Kubernetes cluster created](https://cdn.hashnode.com/res/hashnode/image/upload/v1754825194425/a6c611d4-837f-4106-955f-99bdcbb9cf5d.gif)

Head over to the AWS console, and you’ll see your new cluster listed with a status of **Active**.

With your cluster up and running, it’s time to test the connection. You can do this by running a few `kubectl` commands in your terminal to list the nodes, pods and namespaces in your cluster.

**To test the connection:**

```sh
kubectl get nodes
```

This command lists all the nodes in your cluster.

```sh
kubectl get pods
```

This command lists all the pods currently running.

```sh
kubectl get namespaces
```

This command lists all the namespaces currently running.

![testing the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1754825006032/4d2e72ff-8eb9-48be-bd90-efffbb840241.png)

If each command returns a list of resources, congratulations! Your connection to the Kubernetes cluster is successful.

### Step 3: How to Create Kubernetes Manifests

Let’s define the application using a YAML file. In this file, you’ll create two key resources: a **Deployment** and a **Service**.

- The **Deployment** ensures your application runs reliably by specifying how many replicas to run, which container image to use, and how to manage updates.
- The **Service** makes your application accessible — both within the Kubernetes cluster and, if needed, from the internet, even if the underlying pods change or restart.

Together, these resources orchestrate your application so it can run consistently in different environments and be accessed by others.

```yaml :collapsed-lines title="deployment-example.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: amazon-deployment
  namespace: default
  labels:
    app: amazon-app
spec:
  replicas: 5
  selector:
    matchLabels:
      app: amazon-app
      tier: frontend
      version: 1.0.0
  template:
    metadata:
      labels:
        app: amazon-app
        tier: frontend
        version: 1.0.0
    spec:
      containers:
        - name: amazon-container
          image: ooghenekaro/amazon:2
          ports:
            - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: amazon-service
  labels:
    app: amazon-app
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3000
  selector:
    app: amazon-app
```

The service uses a **LoadBalancer type,** which tells AWS to provision an **Elastic Load Balancer** (ELB) and route traffic to the pods.

### Step 4: How to Deploy the App to EKS

Now that your YAML file is defined and the Kubernetes cluster on AWS EKS is ready, it’s time to deploy your application.

To do this, run the following command in your terminal to apply the configuration defined in your manifest file:

```sh
kubectl apply -f deployment-example.yaml
```

This command tells Kubernetes to create the necessary pods and services based on what’s specified in the manifest file.

Next, you can check the status of your pods and services:

```sh
kubectl get pods
kubectl get svc or service
kubectl get all
```

![checking to see if our application is deployed properly](https://cdn.hashnode.com/res/hashnode/image/upload/v1754824866347/8b48e580-d25f-4965-9c29-3609778365f0.png)

### Step 5: How to Access Your Application

To view your application in the browser, run the following command to list your services:

```yaml
kubectl get svc
```

Look for the **EXTERNAL-IP** of your service.

![Display of the External IP on the browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1754824764125/b78b8feb-e5da-4d3c-b467-6ccb88d00373.png)

Copy the IP address and paste it into your browser. Your app should now be live!

![live site](https://cdn.hashnode.com/res/hashnode/image/upload/v1754824488894/821522c0-186f-48fd-8c64-ed29a2ba4447.png)

---

## Conclusion

Deploying a Kubernetes app on AWS EKS may seem complex at first, but with tools like eksctl and kubectl, the process is surprisingly approachable.

Whether you're a developer experimenting with Kubernetes or a team looking to scale production workloads, EKS provides a strong, scalable foundation that supports your applications as they grow.

::: info Resources

```component VPCard
{
  "title": "Play with Kubernetes",
  "desc": "A simple, interactive and fun playground to learn Kubernetes",
  "link": "https://labs.play-with-k8s.com",
  "logo": "",
  "background": "rgba(0,123,255,0.2)"
}
```

<SiteInfo
  name="Docker 101 Tutorial | Docker"
  desc="Learn how to build and share your first containerized application with this self-paced Docker tutorial."
  url="https://docker.com/101-tutorial//"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

<SiteInfo
  name="How to Create a CI/CD Pipeline Using AWS Elastic Beanstalk"
  desc="Technical Architecture     Continuous Integration and Deployment (CI/CD) is an essential..."
  url="https://dev.to/ijay/how-to-create-a-cicd-using-aws-elastic-beanstalk-15nh/"
  logo="https://media2.dev.to/dynamic/image/width=128,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png"
  preview="https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F0n8hjh1wy4er2tbzlsvq.jpg"/>

:::

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy a Kubernetes App on AWS EKS",
  "desc": "AWS makes it much easier to deploy containerized applications, and running Kubernetes in the cloud is a powerful way to scale and manage these applications. Among the many managed Kubernetes services AWS offers, Amazon EKS (Elastic Kubernetes Service...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-deploy-a-kubernetes-app-on-aws-eks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
