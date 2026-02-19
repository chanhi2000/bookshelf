---
lang: en-US
title: "Docker Desktop for Windows Home is here!"
description: "Article(s) > Docker Desktop for Windows Home is here!"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Windows
  - WSL
  - VSCode
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - windows
  - wsl
  - vscode
  - visualstudiocode
  - productivity
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker Desktop for Windows Home is here!"
    - property: og:description
      content: "Docker Desktop for Windows Home is here!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-desktop-for-windows-home-is-here.html
prev: /devops/docker/articles/README.md
date: 2020-03-06
isOriginal: false
author:
  - name: Ben De St Paer-Gotch
    url: https://docker.com/contributors/ben-de-st-paer-gotch/
cover: https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png
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
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Visual Studio Code > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/vscode/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Docker Desktop for Windows Home is here!"
  desc="Last year we announced that Docker had released a preview of Docker Desktop with WSL 2 integration. We are now pleased to announce that we have completed the work to enable experimental support for Windows Home WSL 2 integration. This means that Windows Insider users on 19040 or higher can now install and use Docker Desktop!"
  url="https://docker.com/blog/docker-desktop-for-windows-home-is-here"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

Last year we announced that Docker had released a preview of Docker Desktop with WSL 2 integration. We are now pleased to announce that we have completed the work to enable **experimental support for Windows Home WSL 2 integration**. This means that Windows Insider users on 19040 or higher can now install and use Docker Desktop!

Feedback on this first version of Docker Desktop for Windows Home is welcomed! To get started, you will need to be on Windows Insider Preview build 19040 or higher and install the [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop Edge 2.2.2.0.](https://download.docker.com/win/edge/Docker%20Desktop%20Installer.exe)

---

## What’s in Docker Desktop for Windows Home?

Docker Desktop for WSL 2 Windows Home is a full version of Docker Desktop for Linux container development. It comes with the same feature set as our existing [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop WSL 2 backend](https://docker.com/blog/new-docker-desktop-wsl2-backend/). This gives you:

- Latest version of Docker on your Windows machine
- Install Kubernetes in one click on Windows Home
- Integrated UI to view/manage your running containers
- Start Docker Desktop in <5 seconds
- Use Linux Workspaces
- Dynamic resource/memory allocation 
- Networking stack, support for http proxy settings, and trusted CA synchronization 

---

## How do I get started developing with Docker Desktop?

For the best experience of developing with Docker and WSL 2, we suggest having your code inside a Linux distribution. This improves the file system performance and thanks to products like VSCode mean you can still do all of your work inside the Windows UI and in an IDE you know and love.

Firstly make sure you are on the [<VPIcon icon="fa-brands fa-docker"/>Windows insider](https://insider.windows.com/en-gb/getting-started/) program, are on 19040 and have installed [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop Edge](https://download.docker.com/win/edge/Docker%20Desktop%20Installer.exe).

Next install a WSL distribution of Linux (for this example I will assume something like Ubuntu from the [<VPIcon icon="fa-brands fa-microsoft"/>Microsoft store](https://microsoft.com/p/ubuntu/9nblggh4msv6)).

::: note

You may want to check your distro is set to V2, to check in powershell run

```powershell
wsl -l -v
```

If you see your distro is a version one you will need to run 

```sh
wsl ‐‐set-version DistroName 2  
```

:::

Once you have a V2 WSL distro, Docker Desktop will automatically set this up with Docker.

The next step is to start working with your code inside this Ubuntu distro and ideally with your IDE still in Windows. In [<VPIcon icon="iconfont icon-vscode"/>VSCode](https://code.visualstudio.com/download) this is pretty straightforward.

You will want to open up VSCode and install the [Remote WSL extension (<VPIcon icon="iconfont icon-vscode"/>`ms-vscode-remote.remote-wsl`)](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl), this will allow you to work with a remote server in the Linux distro and your IDE client still on Windows.

Now we need to get started working in VSCode remotely, the easiest way to do this is to open up your terminal and type:

```sh
wsl  
code .
```

This will open a new VSCode connected remotely to your default distro which you can check in the bottom corner of the screen.

(or you can just look for Ubuntu in your start menu, open it and then run  `code .` )

![<VPIcon icon="fa-brands fa-docker"/>windows home](https://docker.com/app/uploads/2020/03/windows-home.png "- windows home")

Once in VSCode there I use the terminal in VSCode to pull my code and start working natively in Linux with Docker from my Windows Home Machine!

::: tip Other tips and tricks:

If you want to get the best out of the file system performance avoid mounting from the windows file system (even from a WSL distro. eg: `avoid docker run -v /mnt/c/users:/users`)

If you are worried about the size of the docker-desktop-data VHDX or need to change it you can do this through the WSL tooling built into Windows:  

If you are worried about CPU/Memory usage you put limits on memory/cpu/swap size on the WSL2 utility VM

<SiteInfo
  name="Release Notes for WSL"
  desc="Read release notes for the Windows Subsystem for Linux. These release notes include fixed issues and are updated weekly."
  url="https://learn.microsoft.com/en-us/windows/wsl/release-notes/"
  logo="/assets/image/learn.microsoft.com/favicon.ico"
  preview="https://learn.microsoft.com/en-us/media/open-graph-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Desktop for Windows Home is here!",
  "desc": "Last year we announced that Docker had released a preview of Docker Desktop with WSL 2 integration. We are now pleased to announce that we have completed the work to enable experimental support for Windows Home WSL 2 integration. This means that Windows Insider users on 19040 or higher can now install and use Docker Desktop!",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-desktop-for-windows-home-is-here.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
