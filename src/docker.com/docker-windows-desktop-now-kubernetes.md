---
lang: en-US
title: "Docker for Windows Desktop with Kubernetes"
description: "Article(s) > Docker for Windows Desktop with Kubernetes"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Kubernetes
  - Windows
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - k8s
  - kubernetes
  - win
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker for Windows Desktop with Kubernetes"
    - property: og:description
      content: "Docker for Windows Desktop with Kubernetes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-windows-desktop-now-kubernetes.html
prev: /devops/docker/articles/README.md
date: 2018-01-31
isOriginal: false
author:
  - name: Jim Armstrong
    url : https://docker.com/author/jim/
cover: https://docker.com/app/uploads/bb5074d7-5f20-43e8-b0cf-9c427205eeab.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
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

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Docker for Windows Desktop with Kubernetes"
  desc="Learn how to run Docker for Windows Desktop with Kubernetes. Use your personal device to run a single node cluster with kubectl and docker commands."
  url="https://docker.com/blog/docker-windows-desktop-now-kubernetes"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/bb5074d7-5f20-43e8-b0cf-9c427205eeab.jpg"/>

Today we are excited to announce the beta for Docker for Windows Desktop with integrated Kubernetes is now available in the edge channel! This release includes Kubernetes 1.8, just like the [<VPIcon icon="fa-brands fa-docker"/>Docker for Mac](https://docker.com/docker-mac) and [<VPIcon icon="fa-brands fa-docker"/>Docker Enterprise Edition](https://beta.docker.com/) and will allow you to develop Linux containers.

The easiest way to get Kubernetes on your desktop is here.

Simply check the box and go

![Windows containers Kubernetes](https://docker.com/app/uploads/bb5074d7-5f20-43e8-b0cf-9c427205eeab.jpg)

---

## What You Can Do with Kubernetes on your desktop?

Docker for Mac and Docker for Windows are the most popular way to configure a Docker dev environment, and are each used everyday by millions of developers to build, test, and debug containerized apps. The beauty of building with Docker for Mac or Windows is that you can deploy the exact same set of Docker container images on your desktop as you do on your production systems with Docker EE.

Docker for Mac and Docker for Windows are used for building, testing and preparing to ship applications, whereas Docker EE provides the ability to secure and manage your applications in production at scale. You eliminate the “it worked on my machine” problem because you run the same Docker containers on the same Docker engines in development, testing, and production environments, along with the same Docker Swarm and Kubernetes orchestrators.

![Docker and Kubernetes](https://docker.com/app/uploads/29f072ad-663a-4d8a-9eaa-d34f1eb6cb8d.jpg)

With beta support for Kubernetes, Docker provides users end-to-end container-management software and services spanning from developer workstations running Docker for Mac or Docker for Windows, through test and CI/CD using Docker CE or Docker Enterprise Edition (EE), our container platform, through to production systems on-premises or in the cloud running Docker EE.

---

## How to Get Started

A few things to keep in mind:

### Edge channel required  

Kubernetes support is still considered a beta with this release, so to enable the download and use of Kubernetes components you must be on the [<VPIcon icon="fa-brands fa-docker"/>Edge channel](https://docs.docker.com/docker-for-windows/install/). The Docker for Windows version should be 18.02 or later.

### Already using other Kubernetes tools?  

If you are already running a version of kubectl pointed at another environment, for example minikube, you will want to follow the [<VPIcon icon="fa-brands fa-docker"/>activation instructions](https://docs.docker.com/docker-for-windows/#kubernetes) to change contexts to docker-for-desktop.

<SiteInfo
  name="Windows"
  desc="Get started with Docker for Windows. This guide covers system requirements, where to download, and instructions on how to install and update."
  url="https://docs.docker.com/desktop/setup/install/windows-install//"
  logo="https://docs.docker.com/assets/images/favicon.svg"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

<SiteInfo
  name="Sign in"
  desc="Explore the Learning center and understand the benefits of signing in to Docker Desktop"
  url="https://docs.docker.com/desktop/setup/sign-in//"
  logo="https://docs.docker.com/assets/images/favicon.svg"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

---

## Things To Try

If you are new to Kubernetes and looking for some introductory exercises to try, here are a few resources:

- The [<VPIcon icon="fa-brands fa-docker"/>Docker for Windows Desktop with Kubernetes](https://docs.docker.com/docker-for-windows/kubernetes/) page has instructions for getting an example app up and running
- Follow along with Docker Developer Advocate [Elton Stoneman (<VPIcon icon="fa-brands fa-x-twitter"/>`EltonStoneman`)](https://twitter.com/EltonStoneman) during his short [<VPIcon icon="fa-brands fa-youtube"/>video](https://youtu.be/jWupQjdjLN0), demonstrating activating Kubernetes and deploying an application using both Docker compose and a Kubernetes manifest. (Note: the video shows Docker for Mac but the application works exactly the same in this beta of Docker for Windows…the power of Docker containers in action!)

<VidStack src="youtube/jWupQjdjLN0" />

---

## Send Us Your Feedback

Send us your feedback, ideas for improvement, bugs, complaints and more so we can make Docker better on the Desktop. You can use the Docker [community forums](https://forums.docker.com/c/docker-desktop-for-windows/48) for general discussions and you can also directly file technical issues on [Github](https://github.com/docker/for-win/issues).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker for Windows Desktop with Kubernetes",
  "desc": "Learn how to run Docker for Windows Desktop with Kubernetes. Use your personal device to run a single node cluster with kubectl and docker commands.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-windows-desktop-now-kubernetes.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
