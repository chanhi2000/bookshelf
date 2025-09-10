---
lang: en-US
title: "What's in a Container Platform?"
description: "Article(s) > What's in a Container Platform?"
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
      content: "Article(s) > What's in a Container Platform?"
    - property: og:description
      content: "What's in a Container Platform?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/whats-in-a-container-platform.html
prev: /devops/docker/articles/README.md
date: 2019-05-10
isOriginal: false
author:
  - name: Jim Armstrong
    url : https://docker.com/author/jim/
cover: https://docker.com/app/uploads/2019/05/23bb41dd-9682-48e2-b4f4-e11507e17819-2.jpg
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
  name="What's in a Container Platform?"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/whats-in-a-container-platform"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/05/23bb41dd-9682-48e2-b4f4-e11507e17819-2.jpg"/>

Fresh off the heels of DockerCon and the announcement of [**Docker Enterprise 3.0**](/docker.com/announcing-docker-enterprise-3-0.md), an end-to-end and dev-to-cloud container platform, I wanted to share some thoughts on what we mean when we say “complete container platform”.

![](https://docker.com/app/uploads/2019/05/23bb41dd-9682-48e2-b4f4-e11507e17819-1.jpg)

---

## Choice and Flexibility

A complete solution has to meet the needs of different kinds of applications and users – not just cloud native projects but legacy and brownfield applications on both Linux and Windows, too. At a high level, one of the goals of modernization – the leading reason organizations are adopting container platforms – is to rid ourselves of technical debt. Organizations want the freedom to create their apps based on the “right” stack and running in the “right” place, even though what’s “right” may vary from app to app. So the container platform running those applications should be flexible and open to support those needs, rather than rigidly tying application teams to a single OS or virtualization and cloud model.

---

## High-Velocity Innovation

To deliver high velocity innovation your developers are a key constituent for the container platform. That means the container platform should extend to their environment, so that developers are building and testing on the same APIs that will be used in production environments.

![](https://docker.com/app/uploads/2019/05/82cb1a71-eb49-4406-95b5-5c90de62d064.jpg)

Your platform of choice should have tools that integrate into your developers’ preferred workflow, rather than forcing a new or different tool or completely new workflow on them that only works for one deployment pattern. Developers are hired for their creative ability to solve problems with code so adopting a platform that requires your teams to abandon their intuition and prior knowledge in favor of tools that only work with one prescriptive methodology not only slows down innovation, it also increases the risk of developers going outside the IT-approved processes to get the job done.

![](https://docker.com/app/uploads/2019/05/c9e80559-b4df-479d-95fb-af81907ba105.jpg)

Operations teams also want to run a platform that enables applications to be deployed faster. That means making complex tasks simpler from day one with the assurance that the platform will work as expected, while still allowing them to grow their skills over time. The number true Kubernetes experts is relatively small, so if your platform of choice requires admins and operators to know Kubernetes on day one, in addition to learning the ins and outs of the container platform itself, you’re easily looking at 12 months or more of training, services, and proof of concept trials and errors before your container platform is ready for its first “real” workload.

In addition, Kubernetes is a trusted orchestrator and the Docker Engine, built on the CNCF-graduated containerd project, is a trusted and widely used container runtime. Your container platform should be built on these fundamental components because this will give you the most flexibility in the future. Docker Enterprise and all the major public clouds use [<VPIcon icon="fa-brands fa-docker"/>Kubernetes and the Docker engine](https://docker.com/products/kubernetes) (in some cases containerd) because they are open and mature. If your container platform vendor says they’ve built their own projects which are “mostly compatible” with one or both of these then you might want to take note.

Operations teams are also interested in stability. Container platforms will get frequent updates but that does not mean you should be required to rip and replace your container platform every two years, and along with it all the skills, scripts, and other tooling your operations teams built up around the platform over time. When we added Kubernetes in Docker Enterprise 2.0 it was a major upgrade, but we made that upgrade as simple as possible, including continuing to provide and develop Docker Swarm. If you are evaluating container platforms, look at their history. It’s a relatively new market. If you see three major platform architecture redesigns which all forced a major operations shift, you might be in for a bumpy ride in the future.

---

## Intrinsic Security

Last, but absolutely not least, security has to be built-in at all layers of the platform. With the push for more frequent and faster software releases, security has to be part of both the developer’s experience and the operator’s experience. But security cannot be so restrictive or obtrusive that nobody wants to use the platform. You should have guardrails that help developers get started quickly from known good foundations, shifting left in your security process instead of finding out later that something is broken. And your platform should give you visibility into every application you ship: Windows or Linux, Edge or data centers. Security must be a fundamental building block of your container platform and that includes security for your running applications, too.

![](https://docker.com/app/uploads/2019/05/6faf1639-3ca7-4d80-9904-8d104895e65a.jpg)

---

## In Summary

We were proud that Docker was named a Leader in [<VPIcon icon="fa-brands fa-docker"/>The Forrester New Wave™ for Enterprise Container Platform Software Suites in Q4 2018](https://goto.docker.com/the-forrester-wave-enterprise-container-platform-software-suites-2018.html). We believe that our 3.0 platform adds even greater capabilities in a non-disruptive fashion and is the only end-to-end platform for building, sharing and running container-based applications, from the developer’s desktop to the cloud and managing the entire application lifecycle at every stage without dependencies based on a particular OS version, virtualization platform, or public cloud stack.

![](https://docker.com/app/uploads/2019/05/3d7538e8-95ea-4118-a55a-edd0c4dd7998.jpg)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What's in a Container Platform?",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/whats-in-a-container-platform.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
