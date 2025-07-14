---
lang: en-US
title: "Containerd: a daemon to control runCDocker"
description: "Article(s) > Containerd: a daemon to control runCDocker"
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
      content: "Article(s) > Containerd: a daemon to control runCDocker"
    - property: og:description
      content: "Containerd: a daemon to control runCDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/containerd-daemon-to-control-runc.html
prev: /devops/docker/articles/README.md
date: 2015-12-18
isOriginal: false
author:
  - name: Michael Crosby
    url : https://docker.com/author/michael/
cover: https://docker.com/app/uploads/2015/12/containerd-300x196.png
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
  name="Containerd: a daemon to control runCDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/containerd-daemon-to-control-runc"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2015/12/containerd-300x196.png"/>

> As we build out Docker’s infrastructure plumbing, we are committed to releasing these plumbing components as open source to help the community.

Today we’re releasing a new daemon to control runC called:containerd.It’sbuilt for performance and density, and will eventually be built into Docker Engine.

![containerd](https://docker.com/app/uploads/2015/12/containerd-300x196.png)

Containerd is built on top of the [Open Container Initiative’s runC (<FontIcon icon="iconfont icon-github"/>`opencontainers/runc`)](https://github.com/opencontainers/runc) and specification. Containerd is a daemon providing a GRPC API to manage containers on the local system. Containerd leverages runC to provide advanced functionality like checkpoint and restore, seccomp, and user namespace support which will open the door for these features into Docker.

![](https://docker.com/app/uploads/2015/12/Screen-Shot-2015-12-17-at-12.17.36-PM.png)

Containerd is built for ops and optimized for performance. Benchmarking on my laptop, starting 1000 containers concurrently I get a rate of 126-140 containers per second utilizing my entire machine. And it is light on resource usage for monitoring containers after they have been started whether you have 1 or 2000 containers running on a single host.

We have also taken the time to correct some of the long standing issues, like zombie reaping and runtime telemetry. This lets you monitor different statistics from not only the containers but also the runtime.

We are releasing containerd in alpha, and will continue to update it as we work on making it feature complete with everything you would expect from Docker, and more. Containerd is the plumbing component that will manage containers in a future version of Docker Engine. To learn more about containerd, check out the [docs directory (<FontIcon icon="iconfont icon-github"/>`docker/containerd`)](https://github.com/docker/containerd/tree/master/docs) in the [repository (<FontIcon icon="iconfont icon-github"/>`docker/containerd`)](https://github.com/docker/containerd).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Containerd: a daemon to control runCDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/containerd-daemon-to-control-runc.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
