---
lang: en-US
title: "Docker Desktop release 2.2 is here!"
description: "Article(s) > Docker Desktop release 2.2 is here!"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker Desktop release 2.2 is here!"
    - property: og:description
      content: "Docker Desktop release 2.2 is here!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-desktop-release-2-2-is-here.html
prev: /devops/docker/articles/README.md
date: 2020-01-22
isOriginal: false
author: 
cover: https://docker.com/app/uploads/2020/01/Blog-desktop-release-featureimg.png
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
  name="Docker Desktop release 2.2 is here!"
  desc="We are excited to announce that we released a new Docker Desktop version today! Thanks to the user feedback on the new features initially released in the Edge channel, we are now ready to publish them into Stable."
  url="https://docker.com/blog/docker-desktop-release-2-2-is-here"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/01/Blog-desktop-release-featureimg.png"/>

![](https://docker.com/app/uploads/2020/01/Blog-desktop-release-featureimg.png?fit=1110%2C492&ssl=1)

We are excited to announce that we **released a new Docker Desktop version today**! Thanks to the user feedback on the new features initially released in the Edge channel, we are now ready to publish them into Stable.

Before getting to each feature into detail, let’s see [<VPIcon icon="fa-brands fa-docker"/>what’s new in Docker Desktop 2.2](https://docs.docker.com/docker-for-windows/release-notes/):

- **WSL 2 as a technical preview**, allowing access to the full system resources, improved boot time, access to Linux workspaces and improved file system performance
- **A new file sharing implementation** for Windows, improving the developer inner loop user experience
- **A New Integrated Desktop Dashboard,** to see at once glance your local running containers and Compose applications, and easily manage them.

---

## WSL 2 – New architecture

Back in July we released on Edge the **technical preview of Docker Desktop for WSL 2**, where we included an experimental integration of Docker running on an existing user Linux distribution. We learnt from our experience and re-architected our solution [**(covered in Simon’s blog)**](/docker.com/new-docker-desktop-wsl2-backend.md) .

![](https://docker.com/app/uploads/2020/01/blogstable2.2-img-1.png?fit=1110%2C679&ssl=1)

This new architecture for WSL 2 allows users to:

- Use Kubernetes on the WSL 2 backend
- Work with just WSL 2/turn off the traditional HyperV VM while working with WSL 2
- Continue to work as they did in the traditional Docker Desktop with a friendly networking stack, support for http proxy settings, and trusted CA synchronization 
- Start Docker Desktop in <5 seconds
- Use Linux Workspaces

To make use of the WSL 2 features you will need to be on a Windows preview version that supports WSL 2.

::: info Read More on WSL 2

```component VPCard
{
  "title": "Introducing the Docker Desktop WSL 2 BackendDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "/docker.com/new-docker-desktop-wsl2-backend#what-s-changed-since-the-tech-preview.md",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```

:::

### File system improvements on Windows

For existing Windows users not on Windows Insider builds we have been working on improving the user experience we have today for the inner loop. Traditionally with Docker Desktop on Windows, we have relied upon the Samba protocol to manage the interaction between the Linux file system working with Docker and the Windows file system. We have now **replaced this with gRPC FUSE**, which:

- uses caching to (for example) reduce page load time in Symfony by up to 60%;
- supports Linux inotify events, triggering automatic recompilation / reload when the source code is changed;
- is independent of how you authenticate to Windows: smartcard, Azure AD are all fine;
- always works irrespective of whether your VPN is connected or disconnected;
- reduces the amount of code running as Administrator.

::: info Read More on new File Sharing

```component VPCard
{
  "title": "New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker",
  "desc": "The latest Edge release of Docker Desktop for Windows 2.1.7.0 has a completely new filesharing implementation using Filesystem in Userspace (FUSE) instead of Samba.",
  "link": "/docker.com/new-filesharing-implementation-in-docker-desktop-windows.md",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```

:::

### New Integrated Desktop Dashboard

Last but not least, Docker Desktop now includes an **interactive Dashboard UI for managing your local running containers and Compose applications**. We have been listening to developers and working hard to incorporate a single user interface across Mac and Windows so that we could look at how we can make it easier to work with Docker locally. Historically Docker offered similar capability with Kitematic, which we plan to archive in 2020 and replace with the new Desktop Dashboard.

![](https://docker.com/app/uploads/2020/01/blogstable2.2-img-2.png)

::: info Read More on Desktop Dashboard

<SiteInfo
  name="Docker Desktop"
  desc="Explore Docker Desktop, what it has to offer, and its key features. Take the next step by downloading or find additional resources"
  url="https://docs.docker.com/desktop/"
  logo="https://docs.docker.com/assets/images/favicon.svg"
  preview="https://docs.docker.com/images/thumbnail.webp"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Desktop release 2.2 is here!",
  "desc": "We are excited to announce that we released a new Docker Desktop version today! Thanks to the user feedback on the new features initially released in the Edge channel, we are now ready to publish them into Stable.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-desktop-release-2-2-is-here.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
