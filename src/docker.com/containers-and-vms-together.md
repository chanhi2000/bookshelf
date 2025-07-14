---
lang: en-US
title: "Containers and VMs TogetherDocker"
description: "Article(s) > Containers and VMs TogetherDocker"
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
      content: "Article(s) > Containers and VMs TogetherDocker"
    - property: og:description
      content: "Containers and VMs TogetherDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/containers-and-vms-together.html
prev: /devops/docker/articles/README.md
date: 2016-04-09
isOriginal: false
author:
  - name: Mike Coleman
    url : https://docker.com/author/mike_coleman/
cover: https://docker.com/app/uploads/2022/12/containers-and-vms-together-1.png
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
  name="Containers and VMs TogetherDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/containers-and-vms-together"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2022/12/containers-and-vms-together-1.png"/>

A couple weeks back I talked about how Docker containers were not virtual machines (VMs). I received a lot of positive feedback on the article (thanks!), but I also heard a common question: Can VMs and Docker containers coexist?

The answer is a resounding “yes.”

At the most basic level VMs are a great place for Docker hosts to run. And by VMs I mean VMs in all their forms. Whether it’s a vSphere VM or a Hyper-V VM or an AWS EC2 instance, all of them will serve equally well as a Docker host. Depending on what you need to do, a VM might be the best place to land those containers. But the great thing about Docker is that, it doesn’t matter where you run containers – and it’s totally up to you.

Another question I hear relates to whether or not Docker container-based services can interact with VM-based services. Again, the answer is absolutely yes. Running your application in a set of Docker containers doesn’t preclude it from talking to theservices running in a VM.

For instance, your application may need to interact with a database that resides in a virtual machine. Providedthat the right networking is in place, your app can interact with that database seamlessly.

Another area where there can be synergy between VMs and Docker containers is in the area of capacity optimization. VMs gained early popularity because the enabled higher levels of server utilization. That’s still true today. A vSphere host, for instance, can host VMs that may house Docker hosts, but may also host any number of traditional monolithic VMs. By mixing and matching Docker hosts with “traditional” VMs, sysadmins can be assured they are getting the maximum utilization out of their physical hardware.

![containers and vms together 1](https://docker.com/app/uploads/2022/12/containers-and-vms-together-1.png)

Docker embraces running Docker hosts on a wide variety of virtualization and cloud platforms. [<FontIcon icon="fa-brands fa-docker"/>Docker Cloud](https://cloud.docker.com/)and [<FontIcon icon="fa-brands fa-docker"/>Docker Datacenter](https://docker.com/products/docker-datacenter)can easily manage Docker hosts regardless of where they run. And with Docker Machine you can provision new Docker hosts onto a [<FontIcon icon="fa-brands fa-docker"/>wide variety of platforms](https://docs.docker.com/machine/drivers/)including VMware vSphere, Microsoft Hyper-V, Azure, and AWS.

One of the most powerful things about Docker is the flexibility it affords IT organizations. The decision of where to run your applications can be based 100% on what’s right for your business. You’re not locked in to any single infrastructure, you can pick and choose and mix and match in whatever manner makes sense for you organization. Docker hosts on vSphere? Great. Azure? Sure. Physical servers? Absolutely. With Docker containers you get a this great combination of agility, portability, and control.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Containers and VMs TogetherDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/containers-and-vms-together.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
