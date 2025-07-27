---
lang: en-US
title: "Announcing LinuxKit: A Toolkit for building Secure, Lean and Portable Linux Subsystems"
description: "Article(s) > Announcing LinuxKit: A Toolkit for building Secure, Lean and Portable Linux Subsystems"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Linux
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - linux
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Announcing LinuxKit: A Toolkit for building Secure, Lean and Portable Linux Subsystems"
    - property: og:description
      content: "Announcing LinuxKit: A Toolkit for building Secure, Lean and Portable Linux Subsystems"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/introducing-linuxkit-container-os-toolkit.html
prev: /devops/docker/articles/README.md
date: 2017-04-18
isOriginal: false
author:
  - name: Justin Cormack
    url : https://docker.com/author/justin-cormack/
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

[[toc]]

---

<SiteInfo
  name="Announcing LinuxKit: A Toolkit for building Secure, Lean and Portable Linux Subsystems"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/introducing-linuxkit-container-os-toolkit"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

![LinuxKit](https://docker.com/app/uploads/linux-kit@2x.png)

Last year, one of the most common requests we heard from our users was to bring a Docker-native experience to their platforms. These platforms were many and varied: from cloud platforms such as AWS, Azure, Google Cloud, to server platforms such as Windows Server, desktop platforms that their developers used such as OSX and Windows 10, to mainframes and IoT platforms –  the list went on.

We started working on support for these platforms, and we initially shipped Docker for Mac and Docker for Windows, followed by Docker for AWS and Docker for Azure. Most recently, we announced the beta of Docker for GCP. The customizations we applied to make Docker native for each platform have furthered the adoption of the Docker suite of products.

One of the issues we encountered was that for many of these platforms, the users wanted Linuxcontainer support but the platform itself did not ship with Linux included. Mac OS and Windows are two obvious examples, but cloud platforms do not ship with a standard Linux either. So it made sense for us to bundle Linux into the Docker platform to run in these places.

What we needed to bundle was a secure, lean and portable Linux subsystem that can provide Linux container functionality as a component of a container platform. As it turned out, this is what many other people working with containers wanted as well; secure, lean and portable Linux subsystem for the container movement, So, we partnered with several companies and the Linux Foundation to build this component. These companies include HPE, Intel, ARM, IBM and Microsoft – all of whom are interested in bringing Linux container functionality to new and varied platforms, from IoT to mainframes.

LinuxKit includes the tooling to allow building custom Linux subsystems that only include exactly the components the runtime platform requires. All system services are containers that can be replaced, and everything that is not required can be removed. All components can be substituted with ones that match specific needs. It is a kit, very much in the Docker philosophy of batteries included but swappable.  Today, onstage at Dockercon 2017 we opensourced LinuxKit at [<FontIcon icon="iconfont icon-github"/>`linuxkit/linuxkit`](https://github.com/linuxkit/linuxkit).

To achieve our goals of a secure, lean and portable OS,we built it from containers, for containers.  Security is a top-level objective and aligns with NIST stating, in their draft Application Container Security Guide: “Use container-specific OSes instead of general-purpose ones to reduce attack surfaces. When using a container-specific OS, attack surfaces are typically much smaller than they would be with a general-purpose OS, so there are fewer opportunities to attack and compromise a container-specific OS.”

The leanness directly helps with security by removing parts not needed if the OS is designed around the single use case of running containers. Because LinuxKit is container-native, it has a very minimal size – 35MB with a very minimal boot time.  All system services are containers, which means that everything can be removed or replaced.

System services are sandboxed in containers, with only the privileges they need. The configuration is designed for the container use case. The whole system is built to be used as immutable infrastructure, so it can be built and tested in your CI pipeline, deployed, and new versions are redeployed when you wish to upgrade.

The kernel comes from our collaboration with the Linux kernel community, participating in the process and work with groups such as the [<FontIcon icon="fas fa-globe"/>Kernel Self Protection Project (KSPP)](https://kernsec.org/wiki/index.php/Kernel_Self_Protection_Project), while shipping recent kernels with only the minimal patches needed to fix issues with the platforms LinuxKit supports. The kernel security process is too big for a single company to try to develop on their own therefore a broad industry collaboration is necessary.

In addition LinuxKit provides a space to incubate security projects that show promise for improving Linux security. We are working with external open source projects such as [<FontIcon icon="fas fa-globe"/>Wireguard](https://wireguard.io/), [<FontIcon icon="fas fa-globe"/>Landlock](https://lwn.net/Articles/698226/), [<FontIcon icon="fas fa-globe"/>Mirage](https://mirage.io/), [oKernel (<FontIcon icon="iconfont icon-github"/>`docker/linuxkit`)](https://github.com/docker/linuxkit/tree/master/projects/okernel), Clear Containers and more to provide a testbed and focus for innovation in the container space, and a route to production.

LinuxKit is portable, as it was built for the many platforms Docker runs on now, and with a view to making it run on far more.. Whether they are large or small machines, bare metal or virtualized, mainframes or the kind of devices that are used in Internet of Things scenarios as containers reach into every area of computing.

For the launch we invited John Gossman from Microsoft onto the stage. We have a long history of collaboration with Microsoft, on Docker for Windows Server, Docker for Windows and Docker for Azure. Part of that collaboration has been work on the Linux subsystem in Docker for Windows and Docker for Azure, and working on Hyper-V integration with LinuxKit on those platforms. The next step in that collaboration announced today is that all Windows Server and Windows 10 customers will get access to Linux containers and we will be working together on how to integrate linuxKit with Hyper-V isolation.

Today we open up LinuxKit to partners and open source enthusiasts to build new things with Linux and to expand the container platform. We look forward to seeing what you make from it and contribute back to the community.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Announcing LinuxKit: A Toolkit for building Secure, Lean and Portable Linux Subsystems",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/introducing-linuxkit-container-os-toolkit.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
