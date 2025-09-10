---
lang: en-US
title: "Containers as a Service (CaaS) for Application Development"
description: "Article(s) > Containers as a Service (CaaS) for Application Development"
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
      content: "Article(s) > Containers as a Service (CaaS) for Application Development"
    - property: og:description
      content: "Containers as a Service (CaaS) for Application Development"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/containers-as-a-service-caas.html
prev: /devops/docker/articles/README.md
date: 2016-02-02
isOriginal: false
author:
  - name: Betty Junod
    url : https://docker.com/author/betty/
cover: https://docker.com/app/uploads/caas_diagram.png
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
  name="Containers as a Service (CaaS) for Application Development"
  desc="Learn what Containers as a Service (CaaS) is and how Docker containers can be used to deliver a consistent experience for developers and IT ops."
  url="https://docker.com/blog/containers-as-a-service-caas"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/caas_diagram.png"/>

Developers don’t adopt locked down platforms.

That one simple statement summarizes decades of tension between IT operations and development teams. Along the spectrum of control versus agility are the desires and needs of IT operations teams responsible for keeping environments up and running and compliant to regulations and the needs of developers who are responsible for building software to attract, engage and maintain customers. Most times you had to choose between control or freedom and could not have both.

In our three year history, we have been fortunate to work with a very vocal and active user community as they progress along their Docker journey. The journey started with the developer. The developer begins with Docker because it is easy to use and makes them faster. Then by the very nature of the Docker technology, they were able to easily share their software and dependencies with others while eliminating the age old “worked on my machine” issue. No more conflicts between applications or different environments. Indirectly Docker started to bring developers and IT ops closer together.

With Docker, developers can own what goes on inside the container and how the containers behave together as an application. Meanwhile, IT ops teams can focus on the stuff it takes to run the application as designed, to secure, manage and scale.

---

## Containers as a Service (CaaS)

To deliver the consistent experience for developers and IT ops, teams began using Docker for Containers as a Service (CaaS).

Containers as a Service is a model where IT organizations and developers can work together to build, ship and run their applications anywhere. CaaS enablesan IT secured and managed application environment consisting of content and infrastructure, from which developers are able build and deploy applications in a self service manner.

The diagram below shows a typical CaaS workflow.

![caas diagram](https://docker.com/app/uploads/caas_diagram.png)

Developers to the left pulling and pushing application content from a library of trusted base images. Operations teams on the right are monitoring and managing deployed applications and infrastructure. The two teams collaborating through a toolset that allows for a separation of concerns while unifying the two teams through the application lifecycle. The general workflow can be modified have greater centralized control or decentralize the registry and management to each individual application team - whatever is right for your business.

CaaS doesn’t force a workflow on you - but instead gives you a framework to better manage your application delivery. That means the CaaS requirements need to be flexible enough to cover the environment and the one you’ll have tomorrow:

- Provide tooling for both dev and IT ops
- Provide tooling across the entire app lifecycle
- Any operating system
- Any language stack and tooling
- Any infrastructure
- Open APIs and extensibility
- Broad ecosystem support

---

## The road to CaaS is paved with Docker

With application teams in search of platforms to better control or empower their process, they have tried many solutions. On that list of evaluated technologies were packaged platforms, add ons to their clouds or custom built environments. In the end, the Docker users on the journey to production fundamentally did not want to sacrifice agility or portability in favor of added control.

The Docker platform empowers you to build a CaaS that fits your business requirements. Whether that means locking down access, enforcing the use of trusted content or the ability to move workloads from cloud to cloud. The Docker CaaS approach focuses on the applications, not having a pre-baked package or a vertically locked stack. The applications and teams working on them are the focal point of CaaS…so it must be an “everything-agnostic” layer that unifies the environment and process.

This is first in a series of posts about CaaS. In this series, we will cover the use cases, requirements, technology and real world examples of CaaS in action. In the meantime check out these additional resources below.

- [<VPIcon icon="fa-brands fa-docker"/>Register for the upcoming webinar](https://goto.docker.com/Webinar-TheDockerCaaSPlatformOverview_LP.html) on Docker CaaS in actionwith Mike Coleman onFebruary 16th
- Download the white paper: [<VPIcon icon="fa-brands fa-docker"/>Modern Application Architecture for the Enterprise](https://docker.com/app/uploads/2022/03/WP_Modern-App-Architecture-for-Enterprise-Jan-2016.pdf)
- [<VPIcon icon="fa-brands fa-docker"/>Get a free 30 day trial](https://hub.docker.com/enterprise/trial/)
- Learn more about [<VPIcon icon="fa-brands fa-docker"/>our Server and Cloud based solutions](https://docker.com/products/overview#/docker_solutions)
- Attend a Docker webinar

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Containers as a Service (CaaS) for Application Development",
  "desc": "Learn what Containers as a Service (CaaS) is and how Docker containers can be used to deliver a consistent experience for developers and IT ops.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/containers-as-a-service-caas.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
