---
lang: en-US
title: "Docker for Windows Server and Image2Docker"
description: "Article(s) > Docker for Windows Server and Image2Docker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Windows
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - win
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker for Windows Server and Image2Docker"
    - property: og:description
      content: "Docker for Windows Server and Image2Docker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-windows-server-image2docker.html
prev: /devops/docker/articles/README.md
date: 2017-01-18
isOriginal: false
author:
  - name: Elton Stoneman
    url : https://docker.com/author/eltonstoneman/
cover: https://docker.com/app/uploads/i2d2-1.png
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

[[toc]]

---

<SiteInfo
  name="Docker for Windows Server and Image2Docker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-windows-server-image2docker"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/i2d2-1.png"/>

In December we had a live webinar focused on Windows Server Docker containers. We covered a lot of ground and we had some great feedback – thanks to all the folks who joined us. This is a brief recap of the session, which also gives answers to the questions we didn’t get round to.

---


## Webinar Recording

You can view the webinar on YouTube:

<VidStack src="youtube/TWZ1Q0zVQRg" />

The recording clocks in at just under an hour. Here’s what we covered:

- [<FontIcon icon="fa-brands fa-youtube"/>00:00](https://youtu.be/TWZ1Q0zVQRg) Introduction
- [<FontIcon icon="fa-brands fa-youtube"/>02:00](https://youtu.be/TWZ1Q0zVQRg?t=118) Docker on Windows Server 2016
- [<FontIcon icon="fa-brands fa-youtube"/>05:30](https://youtu.be/TWZ1Q0zVQRg?t=329) Windows Server 2016 technical details
- [<FontIcon icon="fa-brands fa-youtube"/>10:30](https://youtu.be/TWZ1Q0zVQRg?t=629) Hyper-V and Windows Server Containers
- [<FontIcon icon="fa-brands fa-youtube"/>13:00](https://youtu.be/TWZ1Q0zVQRg?t=792) Docker for Windows Demo – ASP.NET Core app with SQL Server
- [<FontIcon icon="fa-brands fa-youtube"/>25:30](https://youtu.be/TWZ1Q0zVQRg?t=1528) Additional Partnerships between Docker, Inc. and Microsoft
- [<FontIcon icon="fa-brands fa-youtube"/>27:30](https://youtu.be/TWZ1Q0zVQRg?t=1657) Introduction to Image2Docker
- [<FontIcon icon="fa-brands fa-youtube"/>30:00](https://youtu.be/TWZ1Q0zVQRg?t=1800) Demo – Extracting ASP.NET Apps from a VM using Image2Docker
- [<FontIcon icon="fa-brands fa-youtube"/>52:00](https://youtu.be/TWZ1Q0zVQRg?t=3150) Next steps and resources for learning Docker on Windows

---

## Q&A

::: details Can these \[Windows\] containers be hosted on a Linux host?

No. Docker containers use the underlying operating system kernel to run processes, so you can’t mix and match kernels. You can only run Windows Docker images on Windows, and Linux Docker images on Linux.

However, with an upcoming release to the Windows network stack, you will be able to run a hybrid Docker Swarm – a single cluster containing a mixture of Linux and Windows hosts. Then you can run distributed apps with Linux containers and Windows containers communicating in the same Docker Swarm, using Docker’s networking layer.

:::

::: details Is this only for ASP.NET Core apps?

No. You can package pretty much any Windows application into a Docker image, provided it can be installed and run without a UI.

The first demo in the Webinar showed an ASP.NET Core app running in Docker. The advantage with .NET Core is that it’s cross-platform so the same app can run in Linux or Windows containers, and on Windows you can use the lightweight Nano Server option.

In the second demo we showed ASP.NET WebForms and ASP.NET MVC apps running in Docker. Full .NET Framework apps need to use the WIndows Server Core base image, but that gives you access to the whole feature set of Windows Server 2016. If you have existing ASP.NET applications running in VMs, you can use the Image2Docker tool to port them across to Docker images. Image2Docker works on any Windows Server VM, from Server 2003 to Server 2016.

![image2docker](https://docker.com/app/uploads/i2d2-1.png)

:::

::: details How does licensing work?

For production, licensing is at the host level, i.e. each machine or VM which is running Docker. Your Windows licence on the host allows you to run any number of Windows Docker containers on that host. With Windows Server 2016 you get the commercially supported version of Docker included in the licence costs, with support from Microsoft and Docker, Inc.

For development, Docker for Windows runs on Windows 10 and is free, open-source software. Docker for Windows can also run a Linux VM on your machine, so you can use both Linux and Windows containers in development. Like the server version, your Windows 10 licence allows you to run any number of Windows Docker containers.

Windows admins will want a unified platform for managing images and containers. That’s [<FontIcon icon="fa-brands fa-docker"/>Docker Datacenter](https://docker.com/products/docker-datacenter) which is separately licensed, and will be available for Windows soon.

:::

::: details What about Windows updates for the containers?

Docker containers have a different life cycle from full VMs or bare-metal servers. You wouldn’t deploy an app update or a Windows update inside a running container – instead you update the image that packages your app, then just kill the container and start a new container from the updated image.

Microsoft are supporting that workflow with the two Windows base images on Docker Hub – for [Windows Server Core (<FontIcon icon="fa-brands fa-docker"/>`microsoft/windowsservercore`)](https://hub.docker.com/r/microsoft/windowsservercore/) and [Nano Server (<FontIcon icon="fa-brands fa-docker"/>`microsoft/nanoserver`)](https://hub.docker.com/r/microsoft/nanoserver/). They are following a monthly release cycle, and each release adds an incremental update with new patches and security updates.

:::

For your own applications, you would aim to have the same deployment schedule – after a new release of the Windows base image, you would rebuild your application images and deploy new containers. All this can be automated, so it’s much faster and more reliable than manual patching. [<FontIcon icon="fa-brands fa-docker"/>Docker Captain](https://docker.com/community/docker-captains) Stefan Scherer has a great blog post on [<FontIcon icon="fas fa-globe"/>keeping your Windows containers up to date](https://stefanscherer.github.io/keep-your-windows-containers-up-to-date/).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker for Windows Server and Image2Docker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-windows-server-image2docker.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
