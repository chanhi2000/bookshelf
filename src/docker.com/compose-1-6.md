---
lang: en-US
title: "Compose 1.6: New Compose file for defining networks and volumesDocker"
description: "Article(s) > Compose 1.6: New Compose file for defining networks and volumesDocker"
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
      content: "Article(s) > Compose 1.6: New Compose file for defining networks and volumesDocker"
    - property: og:description
      content: "Compose 1.6: New Compose file for defining networks and volumesDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/compose-1-6.html
prev: /devops/docker/articles/README.md
date: 2016-02-04
isOriginal: false
author:
  - name: Aanand Prasad
    url : https://docker.com/author/aanand/
cover: https://docker.com/app/uploads/2015/11/logo-title-final-compose-2b-581x1024.png
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
  name="Compose 1.6: New Compose file for defining networks and volumesDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/compose-1-6"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2015/11/logo-title-final-compose-2b-581x1024.png"/>

[![logo title final compose 2b](https://docker.com/app/uploads/2015/11/logo-title-final-compose-2b.png)](https://docker.com/products/docker-compose)

In the previous version of Docker Engine we added a completely new system for managing networks and volumes, and we’re pleased to announce full support for these features in Docker Compose.

Compose files used to describe just one thing: the services that make up your distributed application. We’ve now added networks and volumes to the mix, allowing you to describe much more complex applications. You can set up your app on your development machine with multiple network tiers and complex storage configurations, replicating how you might set it up in production. You can then take that same configuration from development, and use it to run your app on CI, on staging, and right through into production.

We’ve implemented this by making networks and volumes top-level objects in Compose files. Everything that used to be in a Compose file is now under a new `services` key.

To get an idea of the power that this new format gives you, take a look at this example application with multiple network tiers and volumes stored in Flocker:

```yaml
version: "2"

services:
  web:
    image: myapp
    networks:
      - front
      - back
  redis:
    image: redis
    volumes:
      - redis-data:/var/lib/redis
    networks:
      - back

volumes:
  redis-data:
    driver: flocker

networks:
  front:
    driver: overlay
  back:
    driver: overlay
```

Hopefully this sparks your imagination as to what is now possible! [Check out this GitHub repository for a full example that you can try out (<FontIcon icon="iconfont icon-github"/>`docker/example-voting-app`)](https://github.com/docker/example-voting-app).

It’s really easy to convert your existing applications to the new format. It’s mostly a case of adding the lines `version: "2"` and `services:` to the top of your file, but there are a few caveats, so [<FontIcon icon="fa-brands fa-docker"/>check out these instructions if you run into issues](https://docs.docker.com/compose/compose-file/#upgrading). If you’re not quite ready to make the jump yet, that’s fine - Compose 1.6 still works just fine with the old format.

As well as the new Compose file, there are also a couple of other new things in this release:

- **Set up development environments much faster:** At the same time as specifying a build directory such as `build: ./code`, you can also specify an image such as `image: myusername/webapp`. This means that you can use either `docker-compose build` to build the image, or make it faster by using `docker-compose pull` to pull it from a registry. You can thus use pre-built images to get a development environment running faster, instead of waiting for images to build locally.
- **`docker-compose events`:** A new command that streams the Engine events for your application, which can be used as a building block for tools which react to events such as containers starting and stopping.
- **Build arguments:** You can now pass arguments to builds from your Compose file.

[Check out the release notes for a full list of what’s new. (<FontIcon icon="iconfont icon-github"/>`docker/compose`)](https://github.com/docker/compose/releases/tag/1.6.0) To install or upgrade Compose, [<FontIcon icon="fa-brands fa-docker"/>the easiest way is to download Docker Toolbox](https://docker.com/products/docker-toolbox).

To read more about running Compose in production, [<FontIcon icon="fa-brands fa-docker"/>there is a guide available in the documentation](https://docs.docker.com/compose/production/).

::: info Watch this video on the new version of Docker Compose files

<VidStack src="youtube/EReEOMS7gsk" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Compose 1.6: New Compose file for defining networks and volumesDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/compose-1-6.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
