---
lang: en-US
title: "Introducing the Docker Desktop WSL 2 BackendDocker"
description: "Article(s) > Introducing the Docker Desktop WSL 2 BackendDocker"
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
      content: "Article(s) > Introducing the Docker Desktop WSL 2 BackendDocker"
    - property: og:description
      content: "Introducing the Docker Desktop WSL 2 BackendDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/new-docker-desktop-wsl2-backend#what-s-changed-since-the-tech-preview.html
prev: /devops/docker/articles/README.md
date: 2019-10-25
isOriginal: false
author: 
cover: https://docker.com/app/uploads/engineering/2019/10/wsl2_docker_settings-1110x679.jpg
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
  name="Introducing the Docker Desktop WSL 2 BackendDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/new-docker-desktop-wsl2-backend#what-s-changed-since-the-tech-preview"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/engineering/2019/10/wsl2_docker_settings-1110x679.jpg"/>

## What’s Changed Since the Tech Preview

Earlier this year, we released a technical preview of our vision for the future of Docker development on Windows using WSL 2. We received lots of feedback from Windows Insiders via different channels, and collated common failure cases. We also used it ourselves a lot, and took the time to evaluate its architecture.

Based on this analysis, we worked hard to redesign Docker Desktop’s WSL2 integration in a more robust and easier to maintain way, while ensuring we get feature parity with what we have today with our Hyper-V backend.

---

## What is new?

Before digging into the details of the new backend architecture, let us see what new features we have:

1. Kubernetes support: you can now enable Kubernetes when using the WSL 2 backend
2. Updated daemon: our WSL 2 backend now runs our latest stable Docker Daemon
3. VPN-friendly networking: our WSL 2 backend leverages our efforts in this area, using vpnkit to ensure a VPN-friendly networking stack
4. And more: the WSL 2 backend is now at feature parity with our Hyper-V backend. HTTP proxy settings, trusted CA synchronization, version pack support, support for our new container UI…

This new backend can be enabled in Docker Desktop settings:

![](https://docker.com/app/uploads/engineering/2019/10/wsl2_docker_settings-1110x679.jpg)

Once WSL 2 is generally available, we will remove this checkbox, and automatically switch on the WSL 2 backend on compatible machines.

---

## Introducing our new architecture

Based on our users feedback, and on the requirements we identified internally, there are 3 major aspects that we wanted to change in the WSL integration architecture:

- Run in an isolated environment: we want to run in a separate network/pid/mount namespace, to avoid as much as possible side effects from other applications running on WSL2
- Leverage our current codebase to avoid re-implementing all the features we already implemented in our own Hyper-V VM
- Have a complete integration with the existing UI our users are familiar with.

### Architecture of the Hyper-V backend

![architecture hyper v backend](https://docker.com/app/uploads/engineering/2019/10/architecture_hyper_v_backend-1110x851.png)

To understand this new architecture, we need to step back a little and look at how the Hyper-V backend is designed, and how the Windows frontend communicates with it.

The most important thing is the Linux VM we run on Hyper-V. This Linux VM is entirely built using LinuxKit which makes it very easy for us to have precise control over everything that runs in it. We wrote a number of LinuxKit components, used both in our Hyper-V and Mac VMs: services controlling the lifecycle of Docker and Kubernetes, services to collect diagnostics in case of failure, services aggregating logs, etc. Those services are packaged in an iso file in the Docker Desktop installation directory (docker-desktop.iso).

On top of this base distro, at runtime we mount a second iso, that we call a version-pack iso. This file contains binaries and deployment / upgrade scripts specific to a version of the Docker Engine and Kubernetes. In Enterprise edition, this second iso is part of the version packs we publish, while in Community, a single version pack is supported (the docker.iso file, also present in the docker desktop installation folder).

Before starting the VM, we also attach a VHD to store container images and configs, as well as the Kubernetes data store.

To make those services reachable from the Windows side, we built a proxy that exposes Unix sockets as Windows named pipes, using Hyper-V Sockets under the hood.

### How it translates to the new WSL 2 backend

The new WSL backend design is very close to that, with the difference that we don’t run the LinuxKit distro in a VM but… in a container.

![archtecture wsl2](https://docker.com/app/uploads/engineering/2019/10/archtecture_wsl2-1110x900.png)

This will create 2 WSL distros for you:

- Docker-desktop, which I’ll call the bootstrapping distro
- Docker-desktop-data, which I’ll call the data store distro

From a high level perspective, the bootstrapping distro essentially replaces Hyper-V, while the data store distro replaces the VHD that we previously attached to the VM.

The bootstrapping distro creates a Linux namespace with its own root filesystem based on the same 2 iso files we mentioned earlier (not entirely true, but close enough), and use the data-store distro as the backing store for container images etc. instead of a VHD (WSL 2 does not allow us to attach additional VHD at the moment, so we leverage cross-distro mounts for that). The first iso file is slightly modified from the original one: we have stripped out the Linux Kernel, and the system services provided out of the box by WSL 2. The second one (the version pack iso), is strictly identical to the one we use with Hyper-V (and on Mac as well). The bootstrapping distro also manages things like mounting the Windows 9p shares in a place that can be accessed by the Linuxkit container (to avoid using Samba for sharing Windows files with containers), and controls the lifecycle of the Linuxkit container (ensuring clean shutdown etc.).

This way, Docker runs in a contained environment that is very similar to Hyper-V and MacOS VMs. So close that we actually share the same code base for our Linuxkit components, we very quickly achieved feature parity with Hyper-V backend using the same version pack isos, and the same Windows side code base.

The big difference that this makes is that it starts 15 times quicker than our Hyper-V VM, and thanks to WSL 2 dynamic resource allocations, it can access all the resources of the machine, and consume as little as it really needs. It will make it able to run in environments with lower memory where it was previously difficult to allocate 2GB of the Hyper-V VM upfront.

In a longer term, it also opens the door to supporting Windows versions where Hyper-V is not available but WSL 2 is (Windows Home edition in particular).

---

## Linux Workspaces support

With the tech preview architecture, Linux Workspaces were very easy to implement: the daemon ran in your own distro, so it had direct access to your filesystem. Exposing the daemon worked out of the box as well as bind mounts.

With the new architecture, things are a little bit trickier: we run in a separate distro, and inside an isolated namespace, so how can we achieve the same level of performance?

WSL 2 runs all distros in the same utility VM, sharing the same Kernel. Recently, Microsoft introduced cross-distros bindings, which enables access to the VHD of a given distro from another. Using this we are actually able to expose the daemon to the user distro, and we can access the user distro files from within our contained environment with native Linux performance.

To make bind-mounts a seamless experience, we introduced a docker api proxy similar to the one we use for enabling bind mounts of Windows files that translates paths relative to the user distro into a path to the same file accessible from the LinuxKit container.

---

## Initial limitations

We are still working on polishing the Linux Workspace experience. Initially, you will have to deal with those following limitations:

1. You can only mounts files backed by your distro VHD (that means you can’t bind mounts things within /tmp, /mnt, /var/run, /proc, /sys etc.). For most people, this should not be a problem, but mounting things like /var/run/docker.sock in a container won’t work initially. We are working with Microsoft on solving this issue, a future Windows Update will bring full bind mount support.
2. We don’t provide client binaries yet. You need to install the docker cli and plugins using apt, yum or any other package manager on your distro. We will automate this in a later update.

---

## Why did we do that?

When we released the tech preview, what we wanted was to put in the hands of real users, something that represents the vision we have about the future of Linux container development on Windows. We worked very quickly, aside from our main Docker Desktop project to build something we could experiment with, and collected a lot of user feedback (thank you Windows Insiders by the way, this helped a lot!).

We also challenged the tech preview architecture in term of long term concerns such as maintenance costs, problems diagnostics, stability, update handling, code sharing with other backends etc.

We then went back to the whiteboard, designed a few potential alternative architectures, and found that with minimal effort, we would be able to run our LinuxKit VM, with very small modifications, in a container within WSL 2. This approach makes it really easy to implement the same exact mechanisms as we have today for things like problems diagnostics, handling updates, ensuring version pack support, and feature parity with our other backends.

We went to a prototyping phase that proved successful and went on to integrate it directly in our Docker Desktop codebase.

---

## Top issues driving this decision

### Users want Kubernetes support

In a larger extent, we want feature parity with the Hyper-V backend. This includes Kubernetes support, of course but also many hidden features like:

- Version pack support in Enterprise
- Trusted CA synchronization
- VPN-friendly networking
- HTTP proxies support

Our new architecture solve all this.

### Docker-compose cannot talk to the WSL 2 engine

The version of docker-compose we shipped with the tech preview was not aware of docker contexts. While we are working on fixing docker-compose, the new architecture makes it easier for client tools not supporting docker context yet to work with (including older versions of docker-compose).

### Sometimes containers networking don’t work

We identified several reasons for that, and they are all related to a flaw in our original design: the tech preview runs within your own distro. In this distro you might be running other applications that might deal with network interfaces, iptables, etc. It can create conflicts that are completely outside of our control.

Even worse, all WSL2 distros run in the same network namespace… we have had reports from some users who had issues because they tried to run docker in 2 distros at once. Naturally the 2 Docker daemons killed each other by creating conflicting iptables rules.

Our new architecture is not subject to this issue any more.

### Diagnostics are a nightmare

Running within a distro that we don’t control causes huge challenges in terms of problem diagnostics. Especially when adding support for Kubernetes.

There are too many ways the user can break everything, and it is very difficult to create a diagnostics system collecting only non-sensitive data on a system we don’t control. Running within an isolated container solves this issue for us, and we can leverage the same diagnostics services we already use in the Hyper-V and Mac backends.

### Supporting more than one “hosting distro” is challenging

Not all our users want to run on Ubuntu, we recognize that and want to give them the choice. However automating installation of the integration package in a really “universal” way is very challenging. By running in our own WSL distro, within a container, we don’t have this issue anymore, and keep the same filesystem performance thanks to cross-distro bind mounts.

### Maintenance cost of the integration package is very high

The architecture of the Hyper-V and Mac backends makes it easy for us to share a lot of code. Mac and Windows VMs are almost identical, and we want to keep this great productivity value on WSL 2 as well. The cost of implementing all the features in a new way with the integration package was too high.

Our new approach allows us to share the large majority of our Linux code base between Mac, Hyper-V and WSL 2 backends.

### Handling upgrades is very hard

We have extensive experience at handling upgrades with Docker Desktop. It is hard, and we don’t want to duplicate this work.

The new architecture shares the same exact logic as what we have in place for Hyper-V and Mac backends.

---

## The future of Docker Desktop

Once Microsoft makes WSL 2 generally available, we plan to enable the WSL 2 engine on all supported Windows versions by default. We will still support the Hyper-V backend until Microsoft stops supporting Windows versions without WSL 2 though, but only as a fallback mechanism.

By moving to this “WSL 2 first” approach, we also want to take advantage of its unique characteristics to unlock new features in the future. As an example, WSL 2 is supported on Windows 10 Home. We want to take advantage of that to reach new users in the future (nothing to announce yet, but it is definitely in our backlog).

This new backend paves the way for exciting new features to come, and we are eager to hear your feedback.

We will be releasing the new WSL 2 architecture as part of the next Docker Desktop Edge release. For Windows users already with WSL 2 [<VPIcon icon="fa-brands fa-docker"/>Download Edge today](https://download.docker.com/win/edge/Docker%20Desktop%20Installer.exe) to get access to the latest Docker architecture in the next couple of weeks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing the Docker Desktop WSL 2 BackendDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/new-docker-desktop-wsl2-backend#what-s-changed-since-the-tech-preview.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
