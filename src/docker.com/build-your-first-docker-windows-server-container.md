---
lang: en-US
title: "Build and Run Your First Docker Windows Server Container"
description: "Article(s) > Build and Run Your First Docker Windows Server Container"
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
      content: "Article(s) > Build and Run Your First Docker Windows Server Container"
    - property: og:description
      content: "Build and Run Your First Docker Windows Server Container"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/build-your-first-docker-windows-server-container.html
prev: /devops/docker/articles/README.md
date: 2016-09-27
isOriginal: false
author:
  - name: Michael Friis
    url : https://docker.com/author/friism/
cover: https://docker.com/app/uploads/docker-for-windows-switch.gif
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
  name="Build and Run Your First Docker Windows Server Container"
  desc="Learn how to build and run a Docker container image on your Windows Server. Setup and run Docker Windows Containers on Windows 10 or using a Windows VM."
  url="https://docker.com/blog/build-your-first-docker-windows-server-container"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/docker-for-windows-switch.gif"/>

Today, Microsoft announced the general availability of Windows Server 2016, and with it, Docker engine running containers natively on Windows. This blog post describes how to get setup to run Docker Windows Containers on Windows 10 or using a Windows Server 2016 VM. Check out the companion [**blog posts on the technical improvements**](/docker.com/dockerforws2016.md) that have made Docker containers on Windows possible and the [**post announcing the Docker Inc. and Microsoft partnership**](/docker.com/docker-microsoft-partnership.md).

Before getting started, It’s important to understand that Windows Containers run Windows executables compiled for the Windows Server kernel and userland (either windowsservercore or nanoserver). To build and run Windows containers, a Windows system with container support is required.

---

## Windows 10 with Anniversary Update

For developers, Windows 10 is a great place to run Docker Windows containers and containerization support was added to the the Windows 10 kernel with the [<FontIcon icon="fa-brands fa-windows"/>Anniversary Update](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update/) (note that container images can only be based on Windows Server Core and Nanoserver, not Windows 10). All that’s missing is the Windows-native Docker Engine and some image base layers.

The simplest way to get a Windows Docker Engine is by installing the [<FontIcon icon="fa-brands fa-docker"/>Docker for Windows](https://docs.docker.com/docker-for-windows/) public beta ([<FontIcon icon="fa-brands fa-docker"/>direct download link](https://download.docker.com/win/beta/InstallDocker.msi)). Docker for Windows used to only setup a Linux-based Docker development environment (slightly confusing, we know), but the public beta version now sets up both Linux and Windows Docker development environments, and we’re working on improving Windows container support and Linux/Windows container interoperability.

With the public beta installed, the Docker for Windows tray icon has an option to switch between Linux and Windows container development. For details on this new feature, check out [<FontIcon icon="fas fa-globe"/>Stefan Scherers blog post](https://stefanscherer.github.io/run-linux-and-windows-containers-on-windows-10/).

Switch to Windows containers and skip the next section.

![switching to windows containers](https://docker.com/app/uploads/docker-for-windows-switch.gif)

---

## Windows Server 2016

Windows Server 2016 is the where Docker Windows containers should be deployed for production. For developers planning to do lots of Docker Windows container development, it may also be worth setting up a Windows Server 2016 dev system (in a VM, for example), at least until Windows 10 and Docker for Windows support for Windows containers matures.

For Microsoft Ignite 2016 conference attendees, USB flash drives with Windows Server 2016 preloaded are available at the expo. Not at ignite? [<FontIcon icon="fa-brands fa-microsoft"/>Download a free evaluation version](https://microsoft.com/en-us/evalcenter/evaluate-windows-server-2016) and install it on bare metal or in a VM running on Hyper-V, VirtualBox or similar. Running a VM with Windows Server 2016 is also a great way to do Docker Windows container development on macOS and older Windows versions.

Once Windows Server 2016 is running, log in, run *Windows Update to ensure you have all the latest updates* and install the Windows-native Docker Engine directly (that is, not using “Docker for Windows”). Run the following in an Administrative PowerShell prompt:

```powershell
Install-PackageProvider -Name NuGet -MinimumVersion 2.8.5.201 -Force
Install-Module -Name DockerMsftProvider -Force
Install-Package -Name docker -ProviderName DockerMsftProvider -Force
Restart-Computer -Force
```

Docker Engine is now running as a Windows service, listening on the default Docker named pipe. For development VMs running (for example) in a Hyper-V VM on Windows 10, it might be advantageous to make the Docker Engine running in the Windows Server 2016 VM available to the Windows 10 host:

```powershell
# Open firewall port 2375
netsh advfirewall firewall add rule name="docker engine" dir=in action=allow protocol=TCP localport=2375

# Configure Docker daemon to listen on both pipe and TCP (replaces docker --register-service invocation above)
Stop-Service docker
dockerd --unregister-service
dockerd -H npipe:// -H 0.0.0.0:2375 --register-service
Start-Service docker
```

The Windows Server 2016 Docker engine can now be used from the VM host by setting `DOCKER_HOST`:

```powershell
$env:DOCKER_HOST = "<ip-address-of-vm>:2375"
```

See the [<FontIcon icon="fa-brands fa-microsoft"/>Microsoft documentation for more comprehensive instructions](https://msdn.microsoft.com/en-us/virtualization/windowscontainers/containers_welcome).

---

## Running Windows containers

First, make sure the Docker installation is working:

```sh
docker version
# 
# Client:
# Version:      1.12.1
# API version:  1.24
# Go version:   go1.6.3
# Git commit:   23cf638
# Built:        Thu Aug 18 17:32:24 2016
# OS/Arch:      windows/amd64
# Experimental: true
# 
# Server:
# Version:      1.12.2-cs2-ws-beta
# API version:  1.25
# Go version:   go1.7.1
# Git commit:   62d9ff9
# Built:        Fri Sep 23 20:50:29 2016
# OS/Arch:      windows/amd64
```

Next, pull a base image that’s compatible with the evaluation build, re-tag it and to a test-run:

```sh
docker pull microsoft/windowsservercore
docker run microsoft/windowsservercore hostname
69c7de26ea48
```

---

## Building and pushing Windows container images

Pushing images to Docker Cloud requires a [<FontIcon icon="fa-brands fa-docker"/>free Docker ID](https://cloud.docker.com/). Storing images on Docker Cloud is a great way to save build artifacts for later user, to share base images with co-workers or to create build-pipelines that move apps from development to production with Docker.

Docker images are typically built with [<FontIcon icon="fa-brands fa-docker"/>docker build](https://docs.docker.com/engine/reference/commandline/build/) from a [<FontIcon icon="fa-brands fa-docker"/>Dockerfile](https://docs.docker.com/engine/reference/builder/) recipe, but for this example, we’re going to just create an image on the fly in PowerShell.

```powershell
"FROM microsoft/windowsservercore `n CMD echo Hello World!" | docker build -t <docker-id>/windows-test-image -
```

Test the image:

```sh
docker run <docker-id>/windows-test-image
#
# Hello World!
```

Login with `docker login` and then push the image:

```sh
docker push <docker-id>/windows-test-image
```

Images stored on Docker Cloud available in the [<FontIcon icon="fa-brands fa-docker"/>web interface](https://cloud.docker.com/app/friism/repository/list) and public images can be pulled by other Docker users.

---

## Using docker-compose on Windows

Docker Compose is a great way develop complex multi-container consisting of databases, queues and web frontends. Compose support for Windows is still a little patchy and only works on Windows Server 2016 at the time of writing (i.e. not on Windows 10).

To develop with Docker Compose on a Windows Server 2016 system, install compose too (this is not required on Windows 10 with Docker for Windows installed):

```powershell
Invoke-WebRequest https://dl.bintray.com/docker-compose/master/docker-compose-Windows-x86_64.exe -UseBasicParsing -OutFile $env:ProgramFiles\docker\docker-compose.exe
```

To try out Compose on Windows, clone a variant of the ASP.NET Core MVC MusicStore app, backed by a SQL Server Express 2016 database. A correctly tagged <FontIcon icon="fa-brands fa-docker"/>`microsoft/windowsservercore` image is required before starting.

```powershell
git clone https://github.com/friism/Musicstore
...
cd Musicstore
docker-compose -f .\docker-compose.windows.yml build
...
docker-compose -f .\docker-compose.windows.yml up
...
```

To access the running app from the host running the containers (for example when running on Windows 10 or if opening browser on Windows Server 2016 system running Docker engine) use the container IP and port 5000. `localhost` will not work:

```sh
docker inspect -f "{{ .NetworkSettings.Networks.nat.IPAddress }}" musicstore_web_1
172.21.124.54
```

If using Windows Server 2016 and accessing from outside the VM or host, simply use the VM or host IP and port 5000. ---

## Summary

This post described how to get setup to build and run native Docker Windows containers on both Windows 10 and using the recently published Windows Server 2016 evaluation release. To see more example Windows Dockerfiles, check out the Golang, MongoDB and [Python (<FontIcon icon="iconfont icon-github"/>`docker-library/python`)](https://github.com/docker-library/python/blob/855b85c8309e925814dfa97d61310080dcd08db6/3.6/windows/windowsservercore/Dockerfile) Docker Library images.  
Please share any Windows Dockerfiles or Docker Compose examples your build with [<FontIcon icon="fa-brands fa-x-twitter"/>`@docker`](https://twitter.com/docker) on Twitter using the tag #windows. And don’t hesitate to reach on the Docker Forums if you have questions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Build and Run Your First Docker Windows Server Container",
  "desc": "Learn how to build and run a Docker container image on your Windows Server. Setup and run Docker Windows Containers on Windows 10 or using a Windows VM.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/build-your-first-docker-windows-server-container.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
