---
lang: en-US
title: "Introducing runC: a lightweight universal container runtimeDocker"
description: "Article(s) > Introducing runC: a lightweight universal container runtimeDocker"
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
      content: "Article(s) > Introducing runC: a lightweight universal container runtimeDocker"
    - property: og:description
      content: "Introducing runC: a lightweight universal container runtimeDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/runc.html
prev: /devops/docker/articles/README.md
date: 2015-06-23
isOriginal: false
author:
  - name: Solomon Hykes
    url : https://docker.com/author/solomon/
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
  name="Introducing runC: a lightweight universal container runtimeDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/runc"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

---

## Spinning Out Docker’s Plumbing: Part 1: Introducing runC

### On Infrastructure Plumbing

To build a platform like Docker you need a lot of infrastructure plumbing; in fact over the past two years even though our code base has grown to tens of thousands of lines of code; roughly 50% of it is plumbing! Infrastructure plumbing is made of small software tools which perform basic fundamental tasks in the most reliable and simple way possible. It is invisible and under-appreciated especially given that plumbing is what holds the world’s Internet infrastructure together.

To build Docker we have re-used large quantities of plumbing: Linux, Go, lxc, aufs, lvm, iptables, virtualbox, vxlan, mesos, etcd, consul, systemd… the list goes on. Docker wouldn’t be possible without the thousands of people who contributed to create this plumbing.When plumbing was not available or not sufficient, with the help of the Docker community, we built some of our own too. And as the volume and scope of contributions grew, so did the quality and quantity of the underlying plumbing. Of the tens of thousands of lines of code that constitute the Docker platform, roughly 50% is plumbing! Docker has plumbing for interacting with both Linux and Windows native capabilities; it has plumbing for networking; service discovery; master election; security; and more.

#### Infrastructure Plumbing Manifesto

How we create and reuse infrastructure plumbing is fundamental to the Docker project. Our approach boils down to 3 fundamental principles which we call “the Infrastructure Plumbing Manifesto”:

Whenever possible, re-use existing plumbing and contribute improvements back.

When you need to create new plumbing, make it easy to re-use and contribute improvements back. This grows the common pool of available components, and everyone benefits.

Follow the unix principles: several simple components are better than a single, complicated one.

Define standard interfaces which can be used to combine many simple components into a more sophisticated system.

There has been lots of demand for separating this plumbing from the Docker platform, so that it can be re-used by other infrastructure plumbers in accordance with infrastructure plumbing best practices. Today we are excited to announce that we are doing just that!

### Spinning Out ALL Docker Infrastructure Plumbing

Starting today we will begin spinning out ALL INFRASTRUCTURE PLUMBING from the Docker platform, This is a big deal, and the most important architectural change for the Docker project since its introduction.This has many benefits for Docker:

- If you are deploying Docker in production: this makes Docker more ops-friendly. Because its underlying plumbing will be more cleanly separated, the platform becomes more modular; which in turn makes it *easier to scale*, *easier to troubleshoot, easier to secure* and *easier to customize.*
- If you want to integrate Docker with your favorite tool: because all plumbing exposes standard interfaces, each component becomes a potential integration point.

Starting today at [<FontIcon icon="fa-brands fa-docker"/>DockerCon, we have started to announce the first plumbing components to be spun out.](https://dockercon.com) But there is still plenty of work to do. WE ARE CALLING TO ALL DOCKER CONTRIBUTORS, AND ALL INFRASTRUCTURE PLUMBERS EVERYWHERE, TO JOIN THE EFFORT AND HELP US CONTRIBUTE BACK DOCKER’S PLUMBING.

Today we are introducing our most famous piece of plumbing: our OS container runtime.

### Introducing runC: The universal container runtime

Docker is a platform to build, ship and run distributed applications - meaning that it runs applications in a distributed fashion across many machines, often with a variety of hardware and OS configurations. For this to be possible, it needs a sandboxing environment capable of abstracting the specifics of the underlying host (for portability), without requiring a complete rewrite of the application (for ubiquity), and without introducing excessive performance overhead (for scale).

Over the last 5 years Linux has gradually gained a collection of features which make this kind of abstraction possible. Windows, with its upcoming version 10, is adding similar features as well. Those individual features have esoteric names like “control groups”, “namespaces”, “seccomp”, “capabilities”, “apparmor” and so on. But collectively, they are known as “OS containers” or sometimes “lightweight virtualization”.

Docker makes heavy use of these features and has become famous for it. Because “containers” are actually an array of complicated, sometimes arcane system features, we have integrated them into a unified low-level component which we simply call **runC**. And today we are spinning out runC as a standalone tool, to be used as plumbing by infrastructure plumbers everywhere.

runC is a lightweight, portable container runtime. It includes all of the plumbing code used by Docker to interact with system features related to containers. It is designed with the following principles in mind:

- Designed for security.
- Usable at large scale, in production, today.
- No dependency on the rest of the Docker platform: just the container runtime and nothing else.

Popular runC features include:

- Full support for Linux namespaces, including user namespaces
- Native support for all security features available in Linux: Selinux, Apparmor, seccomp, control groups, capability drop, pivot_root, uid/gid dropping etc. If Linux can do it, runC can do it.
- Native support for live migration, with the help of the CRIU team at Parallels
- Native support of Windows 10 containers is being contributed directly by Microsoft engineers
- Planned native support for Arm, Power, Sparc with direct participation and support from Arm, Intel, Qualcomm, IBM, and the entire hardware manufacturers ecosystem.
- Planned native support for bleeding edge hardware features - DPDK, sr-iov, tpm, secure enclave, etc.
- Portable performance profiles, contributed by Google engineers based on their experience deploying containers in production.
- A formally specified configuration format, governed by the Open Container Project under the auspices of the Linux Foundation. In other words: it’s a real standard.

The goal of runC is to make standard containers available everywhere

In fact, we have decided to donate the code of runC itself to the OCP foundation. Because OCP is designed to work just like the Linux Foundation, we expect that the maintainers - a blend of employees from various container-focused companies and hobbyists - will be largely left alone, and will continue to write the most awesome software possible.

runC is available today and is already under active development. Because it is based on the battle-tested plumbing used by Docker, you can use it in production today, either as part of a Docker deployment or in your own custom platform. We look forward to your contributions!

::: info 

runC is available today at [<FontIcon icon="iconfont icon-github"/>`opencontainers/runc`](https://github.com/opencontainers/runc)

<SiteInfo
  name="opencontainers/runc"
  desc="CLI tool for spawning and running containers according to the OCI specification"
  url="https://github.com/opencontainers/runc/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/78d88e23c2dade5f4ff8ab2c382957fbf232e46ee50c64a393f4a20d9abcc685/opencontainers/runc"/>

:::

::: info Learn More about the Docker News from DockerCon 2015

<SiteInfo
  name="Docker Online Meetup #21: DockerCon Recap, Mon, Jun 29, 2015, 10:00 AM   | Meetup"
  desc="Docker HQ is buzzing with excitement. By now you may have seen numerous blog posts, tweets, and general noise surrounding DockerCon. In case you are not able to join us in "
  url="https://meetup.com/docker-online-meetup/events/222855066//"
  logo="https://secure.meetupstatic.com/next/images/general/m_swarm_196x196.png"
  preview="https://secure.meetupstatic.com/photos/event/c/b/8/d/600_505012109.jpeg"/>

Join our next Docker online meetup recapping all of the news from DockerCon including demos of the latest features of Docker 1.7. The meetup is on Monday, June 29 at 10:00 PDT / 19:00 CEST - [<FontIcon icon="fas fa-globe"/>click here](http://meetup.com/Docker-Online-Meetup/events/222855066/) to register!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing runC: a lightweight universal container runtimeDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/runc.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
