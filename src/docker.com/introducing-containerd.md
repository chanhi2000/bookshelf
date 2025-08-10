---
lang: en-US
title: "containerd - a core container runtime project for the industry"
description: "Article(s) > containerd - a core container runtime project for the industry"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Containerd
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - containerd
head:
  - - meta:
    - property: og:title
      content: "Article(s) > containerd - a core container runtime project for the industry"
    - property: og:description
      content: "containerd - a core container runtime project for the industry"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/introducing-containerd.html
prev: /devops/docker/articles/README.md
date: 2016-12-14
isOriginal: false
author:
  - name: Solomon Hykes
    url : https://docker.com/author/solomon/
cover: https://docker.com/app/uploads/chart-c.png
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
  "title": "Containerd > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/containerd/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="containerd - a core container runtime project for the industry"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/introducing-containerd"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/chart-c.png"/>

Today Docker is spinning out its core container runtime functionality into a standalone component, incorporating it into a separate project called [<FontIcon icon="iconfont icon-containerd"/>containerd](https://containerd.io), and will be donating it to a neutral foundation early next year. This is the latest chapter in a multi-year effort to break up the Docker platform into a more modular architecture of loosely coupled components.

Over the past 3 years, as Docker adoption skyrocketed, it grew into a complete platform to build, ship and run distributed applications, covering many functional areas from infrastructure to orchestration, the core container runtime being just a piece of it. For millions of developers and IT pros, a complete platform is exactly what they need. But many platform builders and operators are looking for “boring infrastructure”: a basic component that provides the robust primitives for running containers on their system, bundled in a stable interface, and nothing else. containerd is component that they can customize, extend and swap out as needed, without unnecessary abstraction getting in their way and built to provide exactly that.

[![chart-c](https://docker.com/app/uploads/chart-c.png)]

What Docker does best is provide developers and operators with great tools which make them more productive. Those tools come from integrating many different components into a cohesive whole. Most of those components are invented by others – but along the way we find ourselves developing some of those components from scratch. Over time we [<FontIcon icon="fa-brands fa-youtube"/>spin out these components as independent projects which anyone can reuse and contribute back to.](https://youtu.be/p_2NDz0K0uc&t=4m45s) containerd is the latest of those components.

![Docker Open source components](https://docker.com/app/uploads/Picture1-4.png)

containerd is already deployed on millions of machines since April 2016 when it was included in Docker 1.11. Today we are announcing a roadmap to extend containerd, with input from the largest cloud providers, Alibaba Cloud, AWS, Google, IBM, Microsoft, and other active members of the container ecosystem. We will add more Docker Engine functionality to containerd so that containerd 1.0 will provide all the core primitives you need to manage containers with parity on Linux and Windows hosts:

- Container execution and supervision
- Image distribution
- Network Interfaces Management
- Local storage
- Native plumbing level API
- Full OCI support, including the extended OCI image specification

![containerd](https://docker.com/app/uploads/chart-a.png)

When containerd 1.0 implements that scope, in Q2 2017, Docker and other leading container systems, from AWS ECS to Microsoft ACS, Kubernetes, Mesos or Cloud Foundry will be able to use it as their core container runtime. containerd will use the [OCI standard](https://opencontainers.org/) and be fully OCI compliant.

![chart f 1](https://docker.com/app/uploads/chart-f-1.png)

Over the past 3 years, the adoption of containers with Docker has triggered an unprecedented wave of innovation in our industry. We think containerd will unlock a whole new phase of innovation and growth across the entire container ecosystem, which in turn will benefit every Docker developer and customer.

You can find up-to-date [roadmap (<FontIcon icon="iconfont icon-github"/>`docker/containerd`)](https://github.com/docker/containerd/blob/master/ROADMAP.md), [architecture (<FontIcon icon="iconfont icon-github"/>`docker/containerd`)](https://github.com/docker/containerd/blob/master/design/architecture.md) and [API definitions (<FontIcon icon="iconfont icon-github"/>`docker/containerd`)](https://github.com/docker/containerd/tree/master/api/) in the [Github repository (<FontIcon icon="iconfont icon-github"/>`docker/containerd`)](https://github.com/docker/containerd/), and more details about the project in our engineering team’s blog post. We plan to have a [<FontIcon icon="fa-brands fa-google"/>containerd summit at the end of February](https://docs.google.com/forms/d/e/1FAIpQLSeYK9_DaFJvF8PtyykUzm3awV3e1xHwuonxbKvak9UYS8VnqQ/viewform?c=0&w=1) to bring in more contributors, stay tuned for more details about that in the next few weeks.

Thank you to [Arnaud Porterie (<FontIcon icon="iconfont icon-github"/>`icecrime`)](https://github.com/icecrime), [Michael Crosby (<FontIcon icon="iconfont icon-github"/>`crosbymichael`)](https://github.com/crosbymichael), [Mickaël Laventure](https://github.com/mlaventure), [Stephen Day (<FontIcon icon="iconfont icon-github"/>`stevvooe`)](https://github.com/stevvooe), [Patrick Chanezon (<FontIcon icon="iconfont icon-github"/>`chanezon`)](https://github.com/chanezon) and Mike Goelzer from the Docker team, and all the maintainers and contributors of the Docker project for making this project a reality.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "containerd - a core container runtime project for the industry",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/introducing-containerd.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
