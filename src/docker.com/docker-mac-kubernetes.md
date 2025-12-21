---
lang: en-US
title: "Docker for Mac with Kubernetes"
description: "Article(s) > Docker for Mac with Kubernetes"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Kubernetes
  - macOS
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - k8s
  - kubernetes
  - macos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker for Mac with Kubernetes "
    - property: og:description
      content: "Docker for Mac with Kubernetes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-mac-kubernetes.html
prev: /devops/docker/articles/README.md
date: 2018-01-10
isOriginal: false
author:
  - name: Jim Armstrong
    url : https://docker.com/author/jim/
cover: https://docker.com/app/uploads/a31525d1-cfbb-45f2-bdb0-2e77c10e5627.jpg
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
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name=" for Mac with Kubernetes"
  desc="Get an introduction to running Docker for Mac with Kubernetes. Use your personal Mac to run a single node cluster and use both kubectl and docker commands."
  url="https://docker.com/blog/docker-mac-kubernetes"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/a31525d1-cfbb-45f2-bdb0-2e77c10e5627.jpg"/>

![Docker for Mac](https://docker.com/app/uploads/a31525d1-cfbb-45f2-bdb0-2e77c10e5627-1-1024x512.jpg)

You heard about it at DockerCon Europe and now it is here: we are proud to announce that Docker for Mac with beta Kubernetes support is now publicly available as part of the [<VPIcon icon="fa-brands fa-docker"/>Edge release channel](https://docs.docker.com/docker-for-mac/install/). We hope you are as excited as we are!

With this release you can now run a single node Kubernetes cluster right on your Mac and use both kubectl commands and docker commands to control your containers.

First, a few things to keep in mind:

::: info Docker for Mac required  

Kubernetes features are only accessible on macOS for now; Docker for Windows and Docker Enterprise Edition betas will follow at a [<VPIcon icon="fa-brands fa-docker"/>later date](https://beta.docker.com/). If you need to install a new copy of Docker for Mac you can download it from the [<VPIcon icon="fa-brands fa-docker"/>Docker Store](https://store.docker.com/editions/community/docker-ce-desktop-mac).

:::

::: info Edge channel required

Kubernetes support is still considered experimental with this release, so to enable the download and use of Kubernetes components you must be on the [<VPIcon icon="fa-brands fa-docker"/>Edge channel](https://docs.docker.com/docker-for-mac/install/). The Docker for Mac version should be 17.12.0-ce-mac45 or later after updating.

:::

::: info Already using other Kubernetes tools?  

If you are already running a version of kubectl pointed at another environment, for example minikube, you will want to follow the [<VPIcon icon="fa-brands fa-docker"/>activation instructions](https://docs.docker.com/docker-for-mac/#kubernetes) to change contexts to docker-for-desktop.

:::

![[<VPIcon icon="fa-brands fa-docker"/>Docker for Mac](https://store.docker.com/editions/community/docker-ce-desktop-mac)](https://docker.com/app/uploads/0e3a13ae-8fbb-491e-80b9-3c3ce709d64a.jpg)

---

## What You Can Do

Docker for Mac and Windows are the most popular way to configure a Docker dev environment and are used everyday by hundreds of thousands of developers to build, test and debug containerized apps. Developers building both docker-compose and Swarm-based apps, and apps destined for deployment on Kubernetes can now get a simple-to-use development system that takes optimal advantage of their laptop or workstation. All container tasks - build, run and push - will run on the same Docker instance with a shared set of images, volumes and containers. Docker for Mac is simple to install, so you can have Docker containers running on your Mac in just a few minutes. And Docker for Mac auto-updates so you continue getting the latest Docker product revisions.

With experimental Kubernetes support in Docker CE for Mac, Docker can provide users an end-to-end suite of container-management software and services that span from developer workstations running Docker for Mac or Windows, through test and CI/CD, through to production systems on-premises or in the cloud running Docker Enterprise Edition (EE).

The beauty of building with Docker for Mac or Windows is that you can deploy the exact same set of Docker container images on your desktop as you do with Docker Enterprise Edition (EE) on your production systems. Docker for Mac or Windows is a single node system for building, testing and preparing to ship applications; Docker EE provides the security, control, and scale needed to manage your production applications. You eliminate the “it worked on my machine” problem because you have the same Docker containers running on the same Docker engines, and the same Docker Swarm and Kubernetes orchestrators (coming soon to EE).

![Docker for Mac](https://docker.com/app/uploads/98b20ba3-e306-4ad7-8993-951627d6116e-1024x700.jpg)

---

## Things To Try

If you are new to Kubernetes and looking for some introductory exercises to try, here are a few resources:

- The [<VPIcon icon="fa-brands fa-docker"/>Docker for Mac Kubernetes](https://docs.docker.com/docker-for-mac/kubernetes/) page has instructions for getting an example app up and running
- Follow along with Docker Developer Advocate [Elton Stoneman (<VPIcon icon="fa-brands fa-x-twitter"/>`EltonStoneman`)](https://twitter.com/EltonStoneman) during his short [<VPIcon icon="fa-brands fa-youtube"/>video](https://youtu.be/jWupQjdjLN0), demonstrating activating Kubernetes and deploying an application using both Docker compose and a Kubernetes manifest.

<VidStack src="youtube/jWupQjdjLN0" />

---

## Send Us Your Feedback

Send us your feedback, ideas for improvement, bugs, complaints and more so we can make Docker Desktop better. You can use the Docker community forums for general discussions and you can also directly file technical issues on [Github](https://github.com/docker/for-mac/issues).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": " for Mac with Kubernetes",
  "desc": "Get an introduction to running Docker for Mac with Kubernetes. Use your personal Mac to run a single node cluster and use both kubectl and docker commands.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-mac-kubernetes.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
