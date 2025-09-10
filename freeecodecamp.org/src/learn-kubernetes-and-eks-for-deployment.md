---
lang: en-US
title: "Learn Kubernetes and EKS for Deployment"
description: "Article(s) > Learn Kubernetes and EKS for Deployment"
icon: iconfont icon-k8s
category:
  - DevOps
  - VM
  - Kubernetes
  - AWS
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - kubernetes
  - k8s
  - aws
  - amazon-web-services
  - eks
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Kubernetes and EKS for Deployment"
    - property: og:description
      content: "Learn Kubernetes and EKS for Deployment"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-and-eks-for-deployment.html
prev: /devops/k8s/articles/README.md
date: 2025-02-21
isOriginal: false
author:
  - name: Beau Carnes
    url : https://freecodecamp.org/news/author/beaucarnes/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1740063597212/95295b26-4334-4875-ba73-c71218c47b67.png
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

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Kubernetes and EKS for Deployment"
  desc="Kubernetes has become the de facto standard for container orchestration, allowing developers to efficiently deploy, manage, and scale applications. But deploying Kubernetes clusters in the cloud can be complex. That’s where Amazon Elastic Kubernetes ..."
  url="https://freecodecamp.org/news/learn-kubernetes-and-eks-for-deployment"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1740063597212/95295b26-4334-4875-ba73-c71218c47b67.png"/>

Kubernetes has become the de facto standard for container orchestration, allowing developers to efficiently deploy, manage, and scale applications. But deploying Kubernetes clusters in the cloud can be complex. That’s where Amazon Elastic Kubernetes Service (EKS) comes in, simplifying Kubernetes management on AWS. Additionally, Infrastructure as Code (IaC) tools like Pulumi help automate and streamline cloud deployments.

We just published a course on the [<VPIcon icon="fa-brands fa-free-code-camp"/>freeCodeCamp.org](http://freeCodeCamp.org) YouTube channel that will teach you all about Kubernetes, EKS, and Pulumi. I create this course! This covers the fundamentals of Kubernetes, walks through a simple Kubernetes project, and explains key concepts like Pods, Deployments, Services, and ConfigMaps. Then, you'll dive into Kubernetes in real-world applications and learn how to deploy Kubernetes workloads on AWS using EKS. Finally, you'll explore Pulumi, an Infrastructure as Code tool, and see how it can be used to automate Kubernetes deployments. Pulumi provided a grant to make this course possible.

---

## What You’ll Learn

### Kubernetes Basics

Kubernetes is an open-source platform designed to automate deploying, scaling, and operating application containers. It abstracts infrastructure details and provides a declarative way to manage applications. The course starts with an introduction to Kubernetes, covering key concepts such as:

- **Pods** - The smallest deployable unit in Kubernetes, which can contain one or more containers.
- **Deployments** - A higher-level object that manages the deployment and scaling of pods.
- **Services** - Used to expose applications to the network, ensuring that users and other services can reach them.
- **ConfigMaps and Secrets** - Tools for managing environment variables and sensitive data separately from application code.

### Amazon Elastic Kubernetes Service (EKS)

EKS is a managed Kubernetes service provided by AWS. It eliminates much of the complexity involved in setting up and maintaining Kubernetes clusters. The course covers:

- How EKS simplifies Kubernetes cluster management.
- Setting up and deploying applications on EKS.
- Scaling and managing workloads in a production environment.

### Infrastructure as Code with Pulumi

Pulumi is a modern Infrastructure as Code (IaC) tool that allows you to define cloud resources using programming languages like TypeScript, Python, and Go. Unlike traditional IaC tools such as Terraform and CloudFormation, Pulumi enables developers to use familiar programming paradigms to manage infrastructure. This course covers:

- Why Pulumi is a powerful alternative to traditional IaC solutions.
- How to create a simple Pulumi project.
- Deploying a real-world application (Zephyr App) to EKS using Pulumi.
- Using Pulumi Copilot and Pulumi Insights to improve cloud deployments.

---

## Why Take This Course?

Whether you're new to Kubernetes or looking to streamline your AWS deployments with Infrastructure as Code, this course provides a hands-on, practical guide to modern cloud deployment strategies. By the end, you'll have a solid understanding of Kubernetes fundamentals, how to deploy workloads on AWS with EKS, and how to automate infrastructure management with Pulumi.

Check out the full course on the [<VPIcon icon="fa-brands fa-youtube"/>freeCodeCamp.org YouTube channel](https://youtu.be/hK8wf18SasY) and take your Kubernetes skills to the next level!

<VidStack src="youtube/hK8wf18SasY" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Kubernetes and EKS for Deployment",
  "desc": "Kubernetes has become the de facto standard for container orchestration, allowing developers to efficiently deploy, manage, and scale applications. But deploying Kubernetes clusters in the cloud can be complex. That’s where Amazon Elastic Kubernetes ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-kubernetes-and-eks-for-deployment.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
