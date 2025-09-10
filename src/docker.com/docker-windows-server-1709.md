---
lang: en-US
title: "Exciting new things for Docker with Windows Server 1709"
description: "Article(s) > Exciting new things for Docker with Windows Server 1709"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Windows
  - Powershell
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - windows
  - powershell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Exciting new things for Docker with Windows Server 1709"
    - property: og:description
      content: "Exciting new things for Docker with Windows Server 1709"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-windows-server-1709.html
prev: /devops/docker/articles/README.md
date: 2017-09-26
isOriginal: false
author:
  - name: Michael Friis
    url : https://docker.com/author/friism/
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
  "title": "Powershell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/pwsh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Exciting new things for Docker with Windows Server 1709"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-windows-server-1709"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

What a difference a year makes… last September, Microsoft and Docker launched Docker Enterprise Edition (EE), a Containers-as-a-Service platform for IT that manages and secures diverse applications across disparate infrastructures, for Windows Server 2016. Since then we’ve continued to work together and Windows Server 1709 contains several enhancements for Docker customers.

---

## Docker Enterprise Edition Preview

To experiment with the new Docker and Windows features, a preview build of Docker is required. Here’s how to install it on Windows Server 1709 (this will also work on Insider builds):

```powershell
Install-Module DockerProvider
    Install-Package Docker -ProviderName DockerProvider -RequiredVersion preview
```

To run Docker Windows containers in production on any Windows Server version, please stick to Docker EE 17.06. ### Docker Linux Containers on Windows

A key focus of Windows Server version 1709 is support for Linux containers on Windows. We’ve already blogged about how we’re supporting Linux containers on Windows with the LinuxKit project.

To try Linux Containers on Windows Server 1709, install the preview Docker package and enable the feature. The preview Docker EE package includes a full LinuxKit system (all 13MB of it) for use when running Docker Linux containers.

```pwsh
[Environment]::SetEnvironmentVariable("LCOW_SUPPORTED", "1", "Machine")
    Restart-Service Docker
```

To disable, just remove the environment variable:

```pwsh
[Environment]::SetEnvironmentVariable("LCOW_SUPPORTED", $null, "Machine")
    Restart-Service Docker
```

Docker Linux containers on Windows is in preview, with ongoing joint development by Microsoft and Docker. Linux Containers is also available on Windows 10 version 1709 (“Creators Update 2”).

---

## Docker ingress mode service publishing on Windows

Parity with Linux service publishing options has been highly requested by Windows customers. Adding support for <VPIcon icon="fa-brands fa-docker"/>[<VPIcon icon="fa-brands fa-docker"/>service publishing using ingress mode](https://docs.docker.com/engine/swarm/services/#publish-ports) in Windows Server 1709 enables use of Docker’s [<VPIcon icon="fa-brands fa-docker"/>routing mesh](https://docs.docker.com/engine/swarm/ingress/), allowing external endpoints to access a service via any node in the swarm regardless of which nodes are running tasks for the service.

These networking improvements also unlock [<VPIcon icon="fa-brands fa-docker"/>VIP-based service discovery when using overlay networks](https://docs.docker.com/engine/swarm/networking/#configure-service-discovery) so that Windows users are not limited to DNS Round Robin.

Check out the corresponding post on the Microsoft Virtualization blog for [<VPIcon icon="fa-brands fa-windows"/>details on the improvements](https://blogs.technet.microsoft.com/virtualization/2017/09/26/dockers-ingress-routing-mesh-available-with-windows-server-version-1709/).

---

## Named pipes in Windows containers

A common and powerful Docker pattern is to run Docker containers that use the Docker API of the host that the container is running on, for example to start more Docker containers or to visualize the containers, networks and volumes on the Docker host. This pattern lets you ship, in a container, software that manages or visualizes what’s going on with Docker. This is great for building software like [<VPIcon icon="fa-brands fa-docker"/>Docker Universal Control Plane](https://docker.com/enterprise-edition).

Running Docker on Linux, the Docker API is usually hosted on Unix domain socket, and since these are in the filesystem namespace, sockets can be bind-mounted easily into containers. On Windows, the Docker API is available on a named pipe. Previously, named pipes where not bind-mountable into Docker Windows containers, but starting with Windows 10 and Windows Server 1709, named pipes can now bind-mounted.

Jenkins CI is a neat way to demonstrate this. With Docker and Windows Server 1709, you can now:

1. Run Jenkins in a Docker Windows containers (no more hand-installing and maintaining Java, Git and Jenkins on CI machines)
2. Have that Jenkins container build Docker images and run Docker CI/CD jobs *on the same host*

I’ve built a [Jenkins sample image (<VPIcon icon="iconfont icon-github"/>`jenkinsci/docker`)](https://github.com/jenkinsci/docker/pull/582) (Windows Server 1709 required) that uses the new named-pipe mounting feature. To run it, simple start a container, grab the initial password and visit port 8080. You don’t have to setup any Jenkins plugins or extra users:

```sh
docker run -d -p 8080:8080 -v \.\pipe\docker_engine:\.\pipe\docker_engine friism/jenkins
#
# 3c90fdf4ff3f5b371de451862e02f2b7e16be4311903649b3fc8ec9e566774ed
docker exec 3c cmd /c type c:.jenkins\secrets\initialAdminPassword
#
# <PASSWORD>
```

Now create a simple freestyle project and use the “Windows Batch Command” build step. We’ll build my fork of the Jenkins Docker project itself:

```sh
git clone --depth 1 --single-branch --branch add-windows-dockerfile https://github.com/friism/docker-3 %BUILD_NUMBER%
cd %BUILD_NUMBER%
docker build -f Dockerfile-windows -t jenkins-%BUILD_NUMBER% .
cd ..
rd /s /q %BUILD_NUMBER%
```

Hit “Build Now” and see Jenkins (running in a container) start to build a CI job to build a container image on the very host it’s running on!

---

## Smaller Windows base images

When Docker and Microsoft launched Windows containers last year, some people noticed that Windows container base images are not as small as typical Linux ones. Microsoft has worked very hard to winnow down the base images, and with 1709, the Nanoserver download is now about 70MB (200MB expanded on the filesystem).

One of the things that’s gone from the Nanoserver Docker image is PowerShell. This can present some challenges when authoring Dockerfiles, but <VPIcon icon="fa-brands fa-docekr"/>[multi-stage builds](https://docs.docker.com/engine/userguide/eng-image/multistage-build/) make it fairly easy to do all the build and component assembly in a Windows Server Core image, and then move just the results into a nanoserver image. Here’s an example showing how to build a minimal Docker image containing just the Docker CLI:

```dockerfile title="Dockerfile"
FROM microsoft/windowsservercore as builder
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]
RUN Invoke-WebRequest -Uri https://download.docker.com/win/static/test/x86_64/docker-17.09.0-ce-rc1.zip -OutFile 'docker.zip'
RUN Expand-Archive -Path docker.zip -DestinationPath .

FROM microsoft/nanoserver
COPY --from=builder ["docker\\docker.exe", "C:\\Program Files\\docker\\docker.exe"]
RUN setx PATH "%PATH%;C:\Program Files\docker"
ENTRYPOINT ["docker"]
```

You now get the best of both worlds: Easy-to-use, full-featured build environment and ultra-small and minimal runtime images that deploy and start quickly, and have minimal exploit surface area. Another good example of this pattern in action are the .NET Core base images maintained by the Microsoft .NET team.

---

## Summary

It’s hard to believe that Docker Windows containers GA’d on Windows Server 2016 and Windows 10 just one year ago. In those 12 months, we’ve seen lots of adoption by the Docker community and lots of uptake with customers and partners. The latest release only adds more functionality to smooth the user experience and brings Windows overlay networking up to par with Linux, with smaller container images and with support for bind-mounting named pipes into containers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Exciting new things for Docker with Windows Server 1709",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-windows-server-1709.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
