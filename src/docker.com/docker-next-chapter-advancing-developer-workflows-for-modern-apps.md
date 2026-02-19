---
lang: en-US
title: "Docker’s Next Chapter: Advancing Developer Workflows for Modern Apps"
description: "Article(s) > Docker’s Next Chapter: Advancing Developer Workflows for Modern Apps"
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
      content: "Article(s) > Docker’s Next Chapter: Advancing Developer Workflows for Modern Apps"
    - property: og:description
      content: "Docker’s Next Chapter: Advancing Developer Workflows for Modern Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-next-chapter-advancing-developer-workflows-for-modern-apps.html
prev: /devops/docker/articles/README.md
date: 2019-11-14
isOriginal: false
author:
  - name: Scott Johnston
    url: https://docker.com/contributors/scott-johnston/
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
  name="Docker’s Next Chapter: Advancing Developer Workflows for Modern Apps"
  desc="Learn about Docker’s new focus, to build on our foundations to advance developer workflows for modern apps."
  url="https://docker.com/blog/docker-next-chapter-advancing-developer-workflows-for-modern-apps"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

Today we start the next chapter in the Docker story, one that’s focused on developers. That we have the opportunity to write this next chapter is thanks to you, our community, for without you we wouldn’t be here. And while our focus on developers builds on recent history, it’s a focus also grounded in Docker’s beginning.

---

## In The Beginning

When Solomon Hykes, Docker’s founder, unveiled the Docker project in 2013, he succinctly stated the problem Docker aimed to solve as, “for a developer, shipping code to the server is hard.” To address, Docker abstracted out OS kernels’ complex container primitives, provided a developer-friendly, CLI-based workflow and defined an immutable, portable image format. The result transformed how developers work, making it much easier to build, ship and run their apps on any server. So while container primitives had existed for decades, Docker democratized them and made them as easy to use as

```sh
docker run hello-world
```

The rest is history. Over the last six years, Docker containerization catalyzed the growth of microservices-based applications, enabled development teams to ship apps many times faster and accelerated the migration of apps from the data center to the cloud. Far from a Docker-only effort, a vibrant community ecosystem of open source and commercial technologies arose which streamlined adoption. Not the least of these is Kubernetes, orchestration technology originating from Google, which enabled highly reliable container deployments at new levels of scale. Also during this time, Docker containers expanded from their Linux x86 beginnings to run on other OSes and architectures, including Microsoft Windows and Arm. To guide the community’s efforts, new governance organizations appeared including CNCF, OCI, and CNAB. As this market grew, our developer community rapidly embraced [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/products/docker-desktop) and [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/), growing to millions of active users who shared millions of containerized apps and pulled billions of app images.

All this and more in only six years – and the best is yet to come.

---

## The Road Ahead

Going forward, Docker’s focus is to build on these foundations to advance developer workflows for modern apps. Along with real benefits, the last six years also resulted in additional complexities, an explosion of choices and new potential threats of lock-in. In light of these challenges, Docker and our community ecosystem have the opportunity to extend the open standards, functionality, automation tooling and cloud services of [<VPIcon icon="fa-brands fa-docker"/>Docker Desktop](https://docker.com/products/docker-desktop) and [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/) to better help developers build, share and run modern apps.

### Build

Six years ago, most apps could be encapsulated using one or two containers; today, a cloud-native microservices-based app may be a composition of many containers as well as serverless functions and hosted cloud services. To address this growing complexity and help developers simplify defining, building and packaging these apps, Docker will continue to expand the functionality of our open source frameworks and developer productivity tools like Docker Compose, Docker Apps and Docker App Templates.

### Share

In 2013, friction-free, language-independent shareable application content was extremely limited. Now, thanks to the modularization of functionality enabled by Docker, the meteoric rise of the Docker container as the *de facto* industry standard and community distribution venues like [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/), developers can now augment the code they write themselves with shared open source and commercial containers. However, more publishers daily pushing more apps – over 5 million on Docker Hub alone – and the emergence of new packaging formats run the risk of overwhelming and slowing developers. Docker Desktop and Docker Hub can help them quickly find new technologies relevant to their applications.

### Run

Early on, container infrastructure was not widely available to developers. In order to run Docker containerized apps on servers, developers had to ask their IT teams to install Docker Engines and, for scale, orchestrators like Kubernetes or Docker Swarm. And this container infrastructure had to be monitored, patched and managed.

Fast-forward to today, where cloud service provider partners like AWS and Azure offer Docker-compatible on-demand container infrastructure services for both individual containers as well as multi-container apps. These give developers speed and agility, but at the potential risk of lock-in. Thus, to make it even easier for developers to benefit from the speed of these services but without giving up app portability and infrastructure choice, Docker Hub will seamlessly integrate developers’ “build” and “share” workflows with the cloud “run” services of their choosing.

---

## Stay Tuned

In Docker’s early days we shared a vision of making things easier for developers. The growth in the open source and commercial community around Docker and Kubernetes these last six years suggests that we’re onto something. But we’re just getting started, and there’s plenty more to be done. With this future ahead of us, it’s a privilege to lead the outstanding Docker team for this next chapter of the Docker story. And it’s one we look forward to writing together with you, our developer community.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker’s Next Chapter: Advancing Developer Workflows for Modern Apps",
  "desc": "Learn about Docker’s new focus, to build on our foundations to advance developer workflows for modern apps.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-next-chapter-advancing-developer-workflows-for-modern-apps.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
