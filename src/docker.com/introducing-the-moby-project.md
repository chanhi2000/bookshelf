---
lang: en-US
title: "Introducing Moby Project: a new open source project to advance the software containerization movement"
description: "Article(s) > Introducing Moby Project: a new open source project to advance the software containerization movement"
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
      content: "Article(s) > Introducing Moby Project: a new open source project to advance the software containerization movement"
    - property: og:description
      content: "Introducing Moby Project: a new open source project to advance the software containerization movement"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/introducing-the-moby-project.html
prev: /devops/docker/articles/README.md
date: 2017-04-18
isOriginal: false
author:
  - name: Solomon Hykes
    url : https://docker.com/author/solomon/
cover: https://docker.com/app/uploads/1-2.png
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
  name="Introducing Moby Project: a new open source project to advance the software containerization movement"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/introducing-the-moby-project"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/1-2.png"/>

![Moby Project](https://docker.com/app/uploads/1-2.png)

Since Docker democratized software containers four years ago, a whole ecosystem grew around containerization and in this compressed time period it has gone through two distinct phases of growth. In each of these two phases, the model for producing container systems evolved to adapt to the size and needs of the user community as well as the project and the growing contributor ecosystem.

The Moby Project is a new open-source project to advance the software containerization movement and help the ecosystem take containers mainstream. It provides a library of components, a framework for assembling them into custom container-based systems and a place for all container enthusiasts to experiment and exchange ideas.

Let’s review how we got where we are today. In 2013-2014 pioneers started to use containers and collaborate in a monolithic open source codebase, Docker and few other projects, to help tools mature.

![Docker Open Source](https://docker.com/app/uploads/2-2.png)

Then in 2015-2016, containers were massively adopted in production for cloud-native applications. In this phase, the user community grew to support tens of thousands of deployments that were backed by hundreds of ecosystem projects and thousands of contributors. It is during this phase, that Docker evolved its production model to an open component based approach. In this way, it allowed us to increase both the surface area of innovation and collaboration.

What sprung up were new independent Docker component projects that helped spur growth in the partner ecosystem and the user community. During that period, we extracted and rapidly innovated on components out of the Docker codebase so that systems makers could reuse them independently as they were building their own container systems: [runc (<FontIcon icon="iconfont icon-github"/>`opencontainers/runc`)](https://github.com/opencontainers/runc), [HyperKit (<FontIcon icon="iconfont icon-github"/>`docker/hyperkit`)](https://github.com/docker/hyperkit), [VPNKit (<FontIcon icon="iconfont icon-github"/>`docker/vpnkit`)](https://github.com/docker/vpnkit), [SwarmKit (<FontIcon icon="iconfont icon-github"/>`docker/swarmkit`)](https://github.com/docker/swarmkit), [InfraKit(<FontIcon icon="iconfont icon-github"/>`docker/infrakit`)](https://github.com/docker/infrakit), [<FontIcon icon="iconfont icon-github"/>`containerd/containerd`](https://github.com/containerd/containerd), etc..

![Docker Open Components](https://docker.com/app/uploads/3-2.png)

Being at the forefront of the container wave, one trend we see emerging in 2017 is containers going mainstream, spreading to every category of computing, server, data center, cloud, desktop, Internet of Things and mobile.  Every industry and vertical market, finance, healthcare, government, travel, manufacturing. And every use case, modern web applications, traditional server applications, machine learning, industrial control systems, robotics. What many new entrants in the container ecosystem have in common is that they build specialized systems, targeted at a particular infrastructure, industry or use case.

As a company Docker uses open source as our innovation lab, in collaboration with a whole ecosystem. Docker’s success is tied to the success of the container ecosystem: if the ecosystem succeeds, we succeed. Hence we have been planning for the next phase of the container ecosystem growth: what production model will help us scale the container ecosystem to fulfill the promise of making containers mainstream?

Last year, our customers started to ask for Docker on many platforms beyond Linux: Mac and Windows desktop, Windows Server, cloud platforms like Amazon Web Services (AWS), Microsoft Azure or Google Cloud Platform, and we created a dozen Docker editions specialized for these platforms. In order to be able to build and ship these specialized editions is a relatively short time, with small teams, in a scalable way, without having to reinvent the wheel; it was clear we needed a new approach.  We needed our teams to collaborate not only on components, but also on assemblies of components, borrowing [<FontIcon icon="fa-brands fa-wikipedia-w"/>an idea from the car industry](https://en.wikipedia.org/wiki/List_of_Volkswagen_Group_platforms) where assemblies of components are reused to build completely different cars.

![Docker production model](https://docker.com/app/uploads/4-2.png)

We think the best way to scale the container ecosystem to the next level to get containers mainstream is to collaborate on assemblies at the ecosystem level.

![Moby Project](https://docker.com/app/uploads/5-2.png)

In order to enable this new level of collaboration, today we are announcing the Moby Project, a new open-source project to advance the software containerization movement. It provides a “Lego set” of dozens of components, a framework for assembling them into custom container-based systems, and a place for all container enthusiasts to experiment and exchange ideas. Think of Moby as the “Lego Club” of container systems.

Moby is comprised of:

1. A **library** of containerized backend components (e.g., a low-level builder, logging facility, volume management, networking, image management, containerd, SwarmKit, …)
2. A **framework** for assembling the components into a standalone container platform, and tooling to build, test and deploy artifacts for these assemblies.
3. A reference assembly, called **Moby Origin**, which is the open base for the Docker container platform, as well as examples of container systems using various components from the Moby library or from other projects.

Moby is designed for system builders, who want to build their own container based systems, not for application developers, who can use Docker or other container platforms. Participants in the Moby project can choose from the library of components derived from Docker or they can elect to “bring your own components” (BYOC) packaged as containers with the option to mix and match among all of the components to create a customized container system.

Docker uses the Moby Project as an open R&D lab, to experiment, develop new components, and collaborate with the ecosystem on the future of container technology. All our open source collaboration will move to the Moby project. Docker is, and will remain, a open source product that lets you build, ship and run containers. It is staying exactly the same from a user’s perspective. Users can continue to download Docker from the docker.com website. See [<FontIcon icon="iconfont icon-moby"/>more information about the respective roles of Docker and Moby on the Moby website](https://mobyproject.org/#moby-and-docker).

Please join us in helping take software containers mainstream, and grow our ecosystem and our user community to the next level by collaborating on components and assemblies.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing Moby Project: a new open source project to advance the software containerization movement",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/introducing-the-moby-project.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
