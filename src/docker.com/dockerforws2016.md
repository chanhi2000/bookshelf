---
lang: en-US
title: "Introducing Docker for Windows Server 2016"
description: "Article(s) > Introducing Docker for Windows Server 2016"
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
      content: "Article(s) > Introducing Docker for Windows Server 2016"
    - property: og:description
      content: "Introducing Docker for Windows Server 2016"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/dockerforws2016.html
prev: /devops/docker/articles/README.md
date: 2016-09-26
isOriginal: false
author:
  - name: Michael Friis
    url : https://docker.com/author/friism/
cover: https://docker.com/app/uploads/2022/12/dockerforws2016-1.png
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
  name="Introducing Docker for Windows Server 2016"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/dockerforws2016"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2022/12/dockerforws2016-1.png"/>

Today, Microsoft is announcing general availability of Windows Server 2016 at the Ignite conference in Atlanta. For Windows developers and IT-pros, the most exciting new Windows feature is containers, and containers on Windows Server 2016 are powered by Docker.

This blog post details the technical innovations that went into making Docker containers run natively on Windows and attempts to explain the significance of the achievement. See the companion blog posts on [**how to build your first Windows container**](/docker.com/build-your-first-docker-windows-server-container.md) and the post detailing [**Docker Inc. and Microsoft’s commercial partnership to support Docker on Windows**](/docker.com/docker-microsoft-partnership.md).

The first version of Docker was released in 2013, and in the 3 years since launch, Docker has completely transformed how Linux developers and ops build, ship and run apps. With Docker Engine and containers now available natively on Windows, developers and IT-pros can begin the same transformation for Windows-based apps and infrastructure and start reaping the same benefits: better security, more agility, and improved portability and freedom to move on-prem apps to the cloud.

For developers and IT-pros that build and maintain heterogenous deployments with both Linux and Windows infrastructure, Docker on Windows holds even greater significance: The Docker platform now represents a single set of tools, APIs and image formats for managing both Linux and Windows apps. As Linux and Windows apps and servers are dockerized, developers and IT-pros can bridge the operating system divide with shared Docker terminology and interfaces for managing and evolving complex microservices deployments both on-prem and in the cloud.

![dockerforws2016 1](https://docker.com/app/uploads/2022/12/dockerforws2016-1.png)

---

## Running Containers on Windows Server

Docker running containers on Windows is the result of a [**two-year collaboration**](/docker.com/docker-microsoft-partner-distributed-applications.md) between Microsoft that involved the Windows kernel growing containerization primitives, Docker and Microsoft collaborating on [**porting the Docker Engine and CLI to Windows**](/docker.com/tp-docker-engine-windows-server-2016.md) to take advantage of those new primitives and [**Docker adding multi-arch image support to Docker Hub**](/docker.com/docker-windows-server-tp5.md).

The result is that the awesome power of `docker run` to quickly start a fresh and fully isolated container is now available natively on Windows:

```sh
docker run -ti microsoft/windowsservercore powershell
```

The kernel containerization features are available in all versions of Windows Server 2016, and are also on Windows 10 systems with the Anniversary Update, and the Windows-native Docker daemon runs on both Windows Server 2016 and Windows 10 (although only containers based on Windows Server build and run on Windows 10).

`docker run` on Windows comes with the same semantics as on Linux: Full process isolation and sandboxed filesystem (and Windows Registry!) with support for layering changes. Each container sees a clean Windows system and cannot interfere with other processes (containerized or not) on the system.

For example, two dockerized apps using different Internet Information Services (IIS) versions and different .NET frameworks can co-exist merrily on the same system. They can even write to their respective filesystems and registries without affecting each other.

With containerization, Windows IT-pros get most of the isolation and release-artifact-stability benefits of VMs, without the resource overhead and lost agility inherent in hardware virtualization.

Similar to how containers on Linux can run with different security profiles, containers on Windows run in one of two isolation modes:

1. Windows Server Containers use the same shared-kernel process-isolation paradigm known from Linux. Since containers run as normal (but isolated) processes, startup is fast and resource overhead is minimal.
2. With Hyper-V isolation, container processes run inside a very minimal hypervisor created during container start. This yields potentially better isolation at the cost of slower startup and some resource overhead.

Isolation can be set with a simple switch passed to `docker run`:

```sh
docker run --isolation=hyperv microsoft/nanoserver
```

As long as the underlying host supports the requested isolation mode, any Windows container image can be run as either a hyper-v or server container and a container host can run both side by side. Container processes are oblivious to the isolation mode they run in, and the Docker control API is the same for both modes.

This makes isolation mode not generally a developer concern and developers should use the default or what’s convenient on their system. Isolation mode does give IT-pros options when choosing how to deploy containerized apps in production.

Also note that, while Hyper-V is the runtime technology powering hyper-v isolation, hyper-v isolated containers are not Hyper-V VMs and cannot be managed with classic Hyper-V tools.

For readers interested in details of how containers are implemented on Windows, [<FontIcon icon="fa-brands fa-youtube"/>John Starks’ black belt session at DockerCon ‘16](https://youtu.be/85nCF5S8Qok) is a great introduction.

![dockerforws2016 2](https://docker.com/app/uploads/2022/12/dockerforws2016-2.png)

---

## Building Windows Container Images

Thanks to layering improvements to the Windows Registry and filesystem, `docker build` and Dockerfiles are fully supported for creating Windows Docker images. Below is an example Windows Dockerfile that [Stefan Scherer has proposed (<FontIcon icon="fa-brands fa-node"/>`nodejs/docker-node`)](https://github.com/nodejs/docker-node/pull/222) for the Node.js official Docker library image. It can be built on Windows with `docker build`:

```dockerfile title="Dockerfile"
FROM microsoft/windowsservercore
ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 4.5.0
ENV NODE_SHA256 16aab15b29e79746d1bae708f6a5dbed8ef3c87426a9408f7261163d0cda0f56
RUN powershell -Command \
    $ErrorActionPreference = 'Stop' ; \
    (New-Object System.Net.WebClient).DownloadFile('https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-win-x64.zip', 'node.zip') ; \
    if ((Get-FileHash node.zip -Algorithm sha256).Hash -ne $env:NODE_SHA256) {exit 1} ; \
    Expand-Archive node.zip -DestinationPath C:\ ; \
    Rename-Item 'C:\node-v%NODE_VERSION%-win-x64' 'C:\nodejs' ; \
    New-Item '%APPDATA%\npm' ; \
    $env:PATH = 'C:\nodejs;%APPDATA%\npm;' + $env:PATH ; \
    [Environment]::SetEnvironmentVariable('PATH', $env:PATH, [EnvironmentVariableTarget]::Machine) ; \
    Remove-Item -Path node.zip
CMD [ "node.exe" ]
```

Note how PowerShell is used to install and setup zip files and exes: Windows containers run Windows executables compiled for Windows APIs. To build and run a Windows container, a Windows system is required. While the Docker tools, control APIs and image formats are the same on Windows and Linux, a Docker Windows container won’t run on a Linux system and vice-versa.

Also note that the starting layer is <FontIcon icon="fa-brands fa-docker"/>`microsoft/windowsservercore`. Starting `FROM scratch` is not an option when creating Windows container images. Instead, images are based on either <FontIcon icon="fa-brands fa-docker"/>`microsoft/windowsservercore` or <FontIcon icon="fa-brands fa-docker"/>`microsoft/nanoserver`.

The Windows Server Core image comes with a mostly complete userland with the processes and DLLs found on a standard Windows Server Core install. With the exception of GUI apps and apps requiring Windows Remote Desktop, most apps that run on Windows Server can be dockerized to run in an image based on <FontIcon icon="fa-brands fa-docker"/>`microsoft/windowsservercore` with minimal effort. Examples include Microsoft SQL Server, [Apache (<FontIcon icon="iconfont icon-github"/>`Microsoft/Virtualization-Documentation`)](https://github.com/Microsoft/Virtualization-Documentation/tree/master/windows-container-samples/windowsservercore/apache-http), [Internet Information Services (<FontIcon icon="iconfont icon-github"/>`Microsoft/Virtualization-Documentation`)](https://github.com/Microsoft/Virtualization-Documentation/tree/master/windows-container-samples/windowsservercore/iis) (IIS) and the [full .NET framework (<FontIcon icon="iconfont icon-github"/>`Microsoft/Virtualization-Documentation`)](https://github.com/Microsoft/Virtualization-Documentation/tree/master/windows-container-samples/windowsservercore/dotnet35).

This flexibility comes at the cost of some bulk: The <FontIcon icon="fa-brands fa-docker"/>`microsoft/windowsservercore` image takes up 10GB. Thanks to Docker’s [<FontIcon icon="fa-brands fa-docker"/>highly efficient image layering](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/), this is not a big problem in practice. Any given Docker host only needs to pull the base layer once, and any images pulled or built on that system simply reuse the base layer.

The other base layer option is Nano Server, a new and very minimal Windows version with a pared-down Windows API. Lots of software already runs on Nano Server, including IIS, the new [.NET Core framework (<FontIcon icon="fa-brands fa-docker"/>`microsoft/dotnet`)](https://hub.docker.com/r/microsoft/dotnet/), [Node.js (<FontIcon icon="iconfont icon-github"/>`StefanScherer/dockerfiles-windows`)](https://github.com/StefanScherer/dockerfiles-windows/blob/master/node/6.5/nano/Dockerfile) and [Go (<FontIcon icon="iconfont icon-github"/>`Microsoft/Virtualization-Documentation`)](https://github.com/Microsoft/Virtualization-Documentation/tree/master/windows-container-samples/nanoserver/golang). And the Nano Server base image is an order of magnitude smaller than Windows Server Core, meaning it has less dependencies and surface area to keep updated. Nano Server is an exciting development, not only as a base for minimal containers that build and boot quickly, but also as a [**Minimalist Operating System**](/docker.com/the-new-minimalist-operating-systems.md) that makes for a great container host OS running just the Docker daemon and containers, and nothing else.

With the choice of Windows Server Core and Nano Server, developers and IT-pros can opt to lift-and-shift existing Windows-based apps into Server Core containers or adopt Nano Server for greenfield development or incrementally as part of breaking monolithic apps into microservices components.

Docker is working with Microsoft and the community to build container images based on both Windows Server Core and Nano Server. [Golang (<FontIcon icon="fa-brands fa-docker"/>`golang`)](https://hub.docker.com/_/golang/), [Python (<FontIcon icon="fa-brands fa-docker"/>`python`)](https://hub.docker.com/_/python/) and [Mongo (<FontIcon icon="fa-brands fa-docker"/>`mongo`)](https://hub.docker.com/_/mongo/) are available as official Docker images (more are on their way), and Microsoft also maintains a set of very popular [sample images (<FontIcon icon="fa-brands fa-docker"/>`microsoft`)](https://hub.docker.com/r/microsoft/).

---

## Summary

Today’s announcement of Docker Engine building, running and managing containers on Windows is the fruit of years of labor by teams at both Microsoft and Docker and by the Docker community. We’re incredibly proud of the work we’ve done with Microsoft to bring the benefits of containerization to Windows developers and IT-pros, and we’re excited about the prospect of getting Windows and Linux technologists building, shipping and running apps together with a common set of tools and APIs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing Docker for Windows Server 2016",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/dockerforws2016.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
