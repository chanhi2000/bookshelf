---
lang: en-US
title: "Faster builds in Docker Compose 1.25.1 thanks to BuildKit SupportDocker"
description: "Article(s) > Faster builds in Docker Compose 1.25.1 thanks to BuildKit SupportDocker"
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
      content: "Article(s) > Faster builds in Docker Compose 1.25.1 thanks to BuildKit SupportDocker"
    - property: og:description
      content: "Faster builds in Docker Compose 1.25.1 thanks to BuildKit SupportDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/faster-builds-in-compose-thanks-to-buildkit-support.html
prev: /devops/docker/articles/README.md
date: 2020-01-23
isOriginal: false
author: 
cover: https://docker.com/app/uploads/2020/01/alvaro-bernal-RgIKRYhmG2k-unsplash-1110x740.jpg
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
  name="Faster builds in Docker Compose 1.25.1 thanks to BuildKit SupportDocker"
  desc="One of the most requested features for the docker-compose tool is definitely support for building using Buildkit which is an alternative builder with great capabilities, like caching, concurrency and ability to use custom front-ends just to mention a few... Ahhh with a nice blue output! And the good news is that Docker Compose 1.25.1 - that was just released early January – includes BuildKit support!"
  url="https://docker.com/blog/faster-builds-in-compose-thanks-to-buildkit-support"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/01/alvaro-bernal-RgIKRYhmG2k-unsplash-1110x740.jpg"/>

![](https://docker.com/app/uploads/2020/01/alvaro-bernal-RgIKRYhmG2k-unsplash-1110x740.jpg)

One of the most requested features for the [docker-compose (<VPIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose) tool is definitely support for building using [<VPIcon icon="fa-brands fa-docker"/>Buildkit](http://docs.docker.com/develop/develop-images/build_enhancements.) which is an alternative builder with great capabilities, like caching, concurrency and ability to use custom BuildKit front-ends just to mention a few… Ahhh with a nice blue output! And the good news is that [<VPIcon icon="fa-brands fa-docker"/>Docker Compose 1.25.1](http://docs.docker.com/develop/develop-images/build_enhancements.https://github.com/docker/compose/releases/tag/1.25.1) – that was just released early January – includes BuildKit support!

BuildKit support for Docker Compose is actually achieved by redirecting the *docker-compose* build to the Docker CLI with a limited feature set.

---

## Enabling Buildkit build

To enable this, we have to align some stars.

First, it requires that the Docker CLI binary present in your PATH:

```sh
which docker
# 
# /usr/local/bin/docker
```

Second, *docker-compose* has to be run with the environment variable `COMPOSE_DOCKER_CLI_BUILD` set to 1 like in:

```sh
COMPOSE_DOCKER_CLI_BUILD=1 docker-compose build
```

This instruction tells *docker-compose* to use the Docker CLI when executing a build. You should see the same build output, but starting with the experimental warning.

As *docker-compose* passes its environment variables to the Docker CLI, we can also tell the CLI to use BuildKit instead of the default builder. To accomplish that, we can execute this:

```sh
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
```

A short video is worth a thousand words:

<VidStack src="https://docker.com/app/uploads/2020/01/ComposeBuildKit.mov" />

::: note

Please note that BuildKit support in docker-compose was initially released with Docker Compose 1.25.0. This feature is marked as experimental for now.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Faster builds in Docker Compose 1.25.1 thanks to BuildKit SupportDocker",
  "desc": "One of the most requested features for the docker-compose tool is definitely support for building using Buildkit which is an alternative builder with great capabilities, like caching, concurrency and ability to use custom front-ends just to mention a few... Ahhh with a nice blue output! And the good news is that Docker Compose 1.25.1 - that was just released early January – includes BuildKit support!",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/faster-builds-in-compose-thanks-to-buildkit-support.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
