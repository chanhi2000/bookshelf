---
lang: en-US
title: " Linux Containers on Windows (With Examples)"
description: "Article(s) >  Linux Containers on Windows (With Examples)"
icon: fa-brands fa-windows
category:
  - DevOps
  - Windows
  - Docker
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - win
  - windows
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) >  Linux Containers on Windows (With Examples)"
    - property: og:description
      content: " Linux Containers on Windows (With Examples)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/preview-linux-containers-on-windows.html
prev: /devops/win/articles/README.md
date: 2017-09-14
isOriginal: false
author:
  - name: Rolf Neugebauer
    url : https://docker.com/author/rolfn/
cover: https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name=" Linux Containers on Windows (With Examples)"
  desc="Learn how to run Linux containers on Windows Servers using Hyper-V technology to create secure, lean and portable Linux subsystems."
  url="https://docker.com/blog/preview-linux-containers-on-windows"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

Microsoft is getting ready for the next big update for Windows Server (check out [<VPIcon icon="fa-brands fa-microsoft"/>today’s complimentary Microsoft blog post](https://blogs.technet.microsoft.com/windowsserver/2017/09/13/sneak-peek-3-windows-server-version-1709-for-developers/)) and some of the new features are very exciting for Docker users. One of the most important enhancements is that Docker can now run Linux containers on Windows (LCOW), using Hyper-V technology.

Running Docker Linux containers on Windows requires a minimal Linux kernel and userland to host the container processes. This is exactly what [**the LinuxKit toolkit**](/docker.com/introducing-linuxkit-container-os-toolkit.md) was designed for: creating secure, lean and portable Linux subsystems that can provide Linux container functionality as a component of a container platform.

We’ve been busy prototyping LinuxKit support for Docker Linux containers on Windows and have a working preview for you to try. This is still a work in progress, and requires either the recently announced [<VPIcon icon="fa-brands fa-windows"/>“Windows Server Insider”](https://blogs.windows.com/windowsexperience/2017/07/13/announcing-windows-server-insider-preview-build-16237) or Windows 10 Insider builds.

::: note UPDATE

LCOW support is available in Windows 10 Fall Creators Update and in Windows Server 1709. The simplest way to try it out on Windows 10 is to install the edge variant of Docker for Windows ([**details**](/docker.com/docker-for-windows-17-11.md)). On Windows Server 1709, install EE preview.

:::

---

## Running Docker Linux Containers on Windows with LinuxKit

::: note UPDATE

[The LinuxKit LCOW repo has a README with updated details for users interested in LinuxKit (<VPIcon icon="iconfont icon-github"/>`linuxkit/lcow`)](https://github.com/linuxkit/lcow).

<SiteInfo
  name="linuxkit/lcow"
  desc="Linux containers on Windows built with LinuxKit."
  url="https://github.com/linuxkit/lcow/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a212ca10d34f59f5ac0c67ee2cfcaf69dca26061ebec808dc9a78388a1dc8391/linuxkit/lcow"/>

:::

The instructions below have been tested on Windows 10 and Windows Server Insider builds 16278 and 16281. Be sure to install [<VPIcon icon="fa-brands fa-docker"/>Docker for Windows](https://docs.docker.com/docker-for-windows/install/) (Windows 10) or [<VPIcon icon="fa-brands fa-docker"/>Docker Enterprise Edition](https://docs.docker.com/engine/installation/windows/docker-ee/) (Windows Server Insider) before starting.

---

## Setup Docker and LinuxKit

A preview build of LinuxKit is available by simply running the following commands in PowerShell (with Administrator rights):

```powershell
$progressPreference = 'silentlyContinue'
mkdir "$Env:ProgramFiles\Linux Containers”

Invoke-WebRequest -UseBasicParsing -OutFile linuxkit.zip https://github.com/friism/linuxkit/releases/download/preview-1/linuxkit.zip

Expand-Archive linuxkit.zip -DestinationPath "$Env:ProgramFiles\Linux Containers."
rm linuxkit.zip
```

Now get a master branch build of the Docker daemon that contains preview support for Linux containers on Windows:

```powershell
Invoke-WebRequest -UseBasicParsing -OutFile dockerd.exe https://master.dockerproject.org/windows/x86_64/dockerd.exe
```

Start a new Docker daemon listening on a separate pipe and using a separate storage location from the default install:

```powershell
$env:LCOW_SUPPORTED=1
$env:LCOW_API_PLATFORM_IF_OMITTED="linux"
.\dockerd.exe -D --experimental -H "npipe:////./pipe//docker_lcow" --data-root c:\lcow
```

---

## Try it

Run a Linux container:

```sh
docker -H "npipe:////./pipe//docker_lcow" run -ti busybox sh
```

Docker just launched a minimal VM running a LinuxKit instance hosting the Linux container!

Since this is an early preview there are some limitations, but basic Docker operations like pull and run work.

---

## Looking ahead

Both Windows Server Insider builds and Docker support for Linux containers on Windows are in early preview mode. When GA, Docker Linux containers on Windows will improve the Docker Linux container experience for both Windows developers and server administrators. Developers will be able to more easily build and test mixed Windows/Linux Docker applications by running containers for both platforms side-by-side on the same system.

And IT-admins that prefer Windows will soon be able to easily run (mostly) Linux-only software like HAProxy and Redis on Windows systems by way of Docker Linux containers on Windows. For example, Docker Linux containers on Windows will make setting up Docker Enterprise Edition and Universal Control Plane (which relies on some Linux-only components) on Windows Server much simpler.

We hope this LinuxKit-based walkthrough will set you up to start experimenting. Feedback is always welcome! For general help and getting started with Insider builds use the [<VPIcon icon="fa-brands fa-microsoft"/>Windows Feedback Hub](https://microsoft.com/en-us/store/p/feedback-hub/9nblggh4r32n) (Windows 10), or the [<VPIcon icon="fa-brands fa-microsoft"/>Windows Server Insiders Tech Community](https://techcommunity.microsoft.com/t5/Windows-Server-Insiders/bd-p/WindowsServerInsiders). For issues with LinuxKit and Docker support for Linux containers on Windows use the [Docker for Windows issue tracker on GitHub (<VPIcon icon="iconfont icon-github"/>`docker/for-win`)](https://github.com/docker/for-win). And let us know on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`docker`)](https://twitter.com/docker) if you build something cool!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": " Linux Containers on Windows (With Examples)",
  "desc": "Learn how to run Linux containers on Windows Servers using Hyper-V technology to create secure, lean and portable Linux subsystems.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/preview-linux-containers-on-windows.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
