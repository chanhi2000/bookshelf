---
lang: en-US
title: "Docker 1.11: The first runtime built on containerd and based on OCI technologyDocker"
description: "Article(s) > Docker 1.11: The first runtime built on containerd and based on OCI technologyDocker"
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
      content: "Article(s) > Docker 1.11: The first runtime built on containerd and based on OCI technologyDocker"
    - property: og:description
      content: "Docker 1.11: The first runtime built on containerd and based on OCI technologyDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-engine-1-11-runc.html
prev: /devops/docker/articles/README.md
date: 2016-04-13
isOriginal: false
author:
  - name: Arnaud Porterie
    url : https://docker.com/author/arnaud/
cover: https://docker.com/app/uploads/2022/12/docker-engine-1-11-runc-1.png
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
  name="Docker 1.11: The first runtime built on containerd and based on OCI technologyDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-engine-1-11-runc"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2022/12/docker-engine-1-11-runc-1.png"/>

We are excited to introduce Docker Engine 1.11, our first release built on [<FontIcon icon="fas fa-globe"/>runC ™](http://runc.io/) an containerd ™. With this release, Docker isthefirst to ship a runtime based onOCI technology,demonstrating the progress the team hasmade since donating our industry-standard container format and runtime under the Linux Foundation in June of 2015. Over the last year, Docker has helped advance the work of the OCI to make it more readily available to more users. It started in December 2015, when we introduced containerd ™, a daemon to control runC. This was part of our effort to break out Docker into small reusable components. With this release, Docker Engine is now built on containerd, so everyone who is using Docker is now using OCI. We’re proud of the progress we’ve made on the OCI with the 40+ members to continue the work to standardize container technology.

Besides this mind-blowing piece of technological trivia that I’m sure will impress your friends at parties, what difference does it make to you?Well, short answer is: nothing… yet! Nevertheless, let me convince you that this is still something you should be excited about.

This is among the biggest technical refactoringsthe Engine has gone through, and our priority for 1.11 was to get the integration right, without changing the command-line interface or API. However, this lays the technical groundworkfor significant user-facing improvements.

![docker engine 1 11 runc 1](https://docker.com/app/uploads/2022/12/docker-engine-1-11-runc-1.png)

---

## Stability and performance

With the containerd integration comes an impressive cleanup of the Docker codebase and a number of historical bugs being fixed. In general, splitting Docker up into focused independent tools mean more focused maintainers, and ultimately better quality software.

Performance-wise, we were extremely careful in making sure 1.11 would not be any slower despite the extra inter-processes communications. We’re pleased to say that it is faster at creating containers concurrently than its predecessor, and although we made a deliberate choice of favoring correctness first, you can expect more performance improvements in the future.

---

## Creatingan ecosystem for container execution backends

runC is the firstimplementation of the [Open Containers Runtime specification (<FontIcon icon="iconfont icon-github"/>`opencontainers/runtime-spec`)](https://github.com/opencontainers/runtime-spec)and the default executor bundled with Docker Engine. Thanks to the open specification, future versions of Engine will allow you to specify different executors, thus enabling the ecosystem of alternative execution backends without any changes to Docker itself. By separating out this piece, an ecosystem partner can build their own compliant executor to the specification, and make it available to the user community at any time - without being dependent on the Engine release schedule or wait to be reviewed and merged into the codebase.

What does this mean for you? This gives you choice: the runtime is now pluggable. Following the Docker principle of batteries included but swappable, Docker Engine will ship with runC available as the default with the ability to choose from a variety of container executors that are for specific platforms or have different security and performance features. By separating out the thing that runs containers from the Engine, this opens up new possibilities. As an example, 1.11 is a huge step toward allowing Engine restarts/upgrades without restarting the containers, improving the availability of containers. This is probably one of the most requested features by Docker users. In fact, with this new architecture, you will even be able to restart containerd and your containers will keep running.

---

## But wait, there’s more!

In addition to this huge architectural change, as usual we have also added a bunch of features in Engine, Compose, Swarm, Machine, and Registry.

### Engine1.11

- DNS round robin load balancing: It’s now possible to load balance between containers with Docker’s networking. If you give multiple containers the same alias, Docker’s service discovery will return the addresses of all of the containers for round-robin DNS.
- VLAN support (experimental): VLAN support has been added for Docker networks in the experimental channel, so you can integrate better with existing networking infrastructure.
- IPv6 service discovery: Engine’s DNS-based service discovery system can now return AAAA records.
- Yubikey hardware image signing: A few months ago we added the ability to sign images with hardware Yubikeys in the experimental channel of Docker. This is now available in the stable release. Read more about how it works in this blog post.
- Labels on networks and volumes: You can now attach arbitrary key/value data to networks and volumes, in the same way you could with containers and images.
- Better handling of low disk space with device mapper storage: The `dm.min_free_space` option has been added to make device mapper fail more gracefully when running out of disk space.
- Consistent status field in `docker inspect`: This is a little thing, but really handy if you use the Docker API. `docker inspect` now has a `Status` field, a single consistent value to define a container’s state (`running`, `stopped`, `restarting`, etc). [Read more in the pull request. (<FontIcon icon="iconfont icon-github"/>`docker/docker`)](https://github.com/docker/docker/pull/20355)

::: info See the release notes for full details.

<SiteInfo
  name="Release v1.11.0 · moby/moby"
  desc="Check out the blog post to read about the containerd integration and other highlights in this release. Changelog Items starting with DEPRECATE are important deprecation notices. For more informatio..."
  url="https://github.com/moby/moby/releases/tag/v1.11.0/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0a7e22de93bd3e0b706409e496b665a582fe2a172e03bf0ca56f3348f392119a/moby/moby/releases/tag/v1.11.0"/>

:::

### Compose1.7

- `--build` option for `docker-compose up`: This is a shorthand for the common pattern of running `docker-compose build` and then `docker-compose up`. Compose doesn’t build on every run by default in case your build is slow, but if you’ve got a quick build, running this every time will ensure your environment is always up to date.
- `docker-compose exec` command: Mirroring the `docker exec` command.

::: info See the release notes for full details.

<SiteInfo
  name="Release 1.7.0 · docker/compose"
  desc="Note that Compose 1.7.0 requires Docker Engine 1.10.0 or later for version 2 of the Compose File format, and Docker Engine 1.9.1 or later for version 1.
If you're a Mac or Windows user, the Docker ..."
  url="https://github.com/docker/compose/releases/tag/1.7.0/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/210eb3f1a7501266298b8c4d5a657cef97c83f2761c102980a448e091362c7a7/docker/compose/releases/tag/1.7.0"/>

:::

### Swarm 1.2

- Container rescheduling no longer experimental: In the previous version of Swarm, we added support for rescheduling containers when a node dies. This is now consideredstable so you can safely use it in production.
- Better errors when containers can’t be scheduled: For example, when a constraint fails, the constraints will be printed out so you can easily see what went wrong.

::: info See the release notes for full details.

<SiteInfo
  name="Release v1.2.0 · docker-archive/classicswarm"
  desc="1.2.0 (2016-04-13) Scheduler Move rescheduling out of experimental Differentiate constraint errors from affinity errors Printing unsatisfiable constraints for container scheduling failure Enable r..."
  url="https://github.com/docker-archive/classicswarm/releases/tag/v1.2.0/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/48894ae8d849788ef0119458ca6c5518e524bd271a80baaf67dd495dbfdfdddd/docker-archive/classicswarm/releases/tag/v1.2.0"/>

:::

### Machine 0.7

In this version of Machine, the MicrosoftAzure driver now uses the new Azure APIs and is easier to authenticate. [<FontIcon icon="iconfont icon-microsoftauzre"/>See Azure’s blog post for more details.](https://azure.microsoft.com/en-us/blog/docker-machine-azure-driver/)There are also a bunch of other improvements in this release -[take a look at the full release notes for details (<FontIcon icon="iconfont icon-github"/>`docker/machine`)](https://github.com/docker/machine/releases/tag/v0.7.0).

### Registry 2.4

- Garbage collection:A tool has been added so system administrators can clean up the data from images that have been deleted by users. For more details, [<FontIcon icon="fa-brands fa-docker"/>see the garbage collector docs](https://docs.docker.com/registry/garbage-collection/).
- Faster and more stable S3 driver: The S3 storage driver is now implemented on top of the official Amazon S3 SDK, which has major performance and stability goodness.

::: info See the release notes for full details.

<SiteInfo
  name="Release Docker Registry v2.4.0 · distribution/distribution"
  desc="What's new? New S3 storage driver The default s3 storage driver is now implemented on top of the official Amazon S3 SDK, boasting major performance and stability goodness. The previous storage is ..."
  url="https://github.com/distribution/distribution/releases/tag/v2.4.0/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/59a6accc47f40cd68fbbd2755bafa700f5545f18a933ac2d1425d4fe778a4b2c/distribution/distribution/releases/tag/v2.4.0"/>

:::

---

## Download and try out Docker 1.11

The easiest way to try out all of this stuffin development is to [<FontIcon icon="fa-brands fa-docker"/>download Docker Toolbox](https://docker.com/products/docker-toolbox). For other platforms, check out the [<FontIcon icon="fa-brands fa-docker"/>installation instructions](https://docs.docker.com/engine/installation/).

All of this stuff is also available in Docker for Mac and Windows, the new way to use Docker in development, currently in private beta. [<FontIcon icon="fa-brands fa-docker"/>Sign up to get a chance to try it out early.](https://beta.docker.com/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker 1.11: The first runtime built on containerd and based on OCI technologyDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-engine-1-11-runc.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
