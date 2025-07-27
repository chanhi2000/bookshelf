---
lang: en-US
title: " Official Images are now Multi-platform"
description: "Article(s) >  Official Images are now Multi-platform"
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
      content: "Article(s) >  Official Images are now Multi-platform"
    - property: og:description
      content: " Official Images are now Multi-platform"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-official-images-now-multi-platform.html
prev: /devops/docker/articles/README.md
date: 2017-09-20
isOriginal: false
author:
  - name: Michael Friis
    url : https://docker.com/author/friism/
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
  name=" Official Images are now Multi-platform"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-official-images-now-multi-platform"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

This past week, Docker rolled out a big update to our Official Images to make them multi-platform aware. Now, when you run `docker run hello-world`, Docker CE and EE will pull and run the correct hello-world image whether that’s for x86-64 Linux, Windows, ARM, IBM Z mainframes or any other system where Docker runs. With Docker rapidly adding support for additional operating systems (like Windows) and CPU architectures (like IBM Z) this is an important UX improvement.

Docker Official Images are a curated set of container images that include:

- Base operating system images like [<FontIcon icon="fa-brands fa-docker"/>Ubuntu](https://store.docker.com/images/ubuntu), <FontIcon icon="fa-brands fa-docker"/>[BusyBox](https://store.docker.com/images/busybox) and [<FontIcon icon="fa-brands fa-docker"/>Debian](https://store.docker.com/images/debian)
- Ready-to-use build and runtime images for popular programming languages like [<FontIcon icon="fa-brands fa-docker"/>Go](https://store.docker.com/images/golang), [<FontIcon icon="fa-brands fa-docker"/>Python](https://store.docker.com/images/python) and [<FontIcon icon="fa-brands fa-docker"/>Java](https://store.docker.com/images/openjdk)
- Easy-to-use images for data stores such as [<FontIcon icon="fa-brands fa-docker"/>PostgreSQL](https://store.docker.com/images/postgres), [<FontIcon icon="fa-brands fa-docker"/>Neo4j](https://store.docker.com/images/neo4j) and [<FontIcon icon="fa-brands fa-docker"/>Redis](https://store.docker.com/images/redis)
- Pre-packaged software images to run [<FontIcon icon="fa-brands fa-docker"/>WordPress](https://store.docker.com/images/wordpress), [<FontIcon icon="fa-brands fa-docker"/>Ghost](https://store.docker.com/images/ghost) and [<FontIcon icon="fa-brands fa-docker"/>Redmine](https://store.docker.com/images/redmine) and many other popular open source projects

The official images have always been available for x86-64 Linux. Images for non x86 Linux architectures have also been available, but to be fetched either from a different namespace (`docker pull s390x/golang` on IBM Z mainframe) or using a different tag (`docker pull golang:nanoserver` on Windows). This was not the seamless and portable experience that we wanted for users of Docker’s new multi-arch and and multi-os orchestration features.

Luckily the Docker registry and distribution protocol have supported multi-platform images since Docker 1.10, using a technology called [manifest lists (<FontIcon icon="iconfont icon-github"/>`docker/distribution`)](https://github.com/docker/distribution/blob/master/docs/spec/manifest-v2-2.md#manifest-list). A manifest list can take the place of a single-architecture image manifest in a registry (for example for `golang`) and contains a list of (“platform”, “manifest-reference”) tuples. If a registry responds to a `docker pull` command with a registry list instead of an image manifest, Docker examines the manifest list and then pull the correct list entry for the platform that it happens to be running on.

The distribution protocol is backwards compatible, and manifest lists are only served to clients that indicate support in the `Accept` header. For clients that don’t support manifest lists, registries will fall back to the x86-64 Linux image manifest. Manifest lists are fully supported by Docker Content Trust to ensure that multi-platform image content is cryptographically signed and verified.

Manifest lists have been rolled out for Linux images for most CPU architectures, and Windows support is also getting there. If your favorite CPU architecture or OS isn’t covered yet, you can always continue to use a CPU or OS-specific tag or image when pulling. Fetching images by digest is also unaffected by this update.

If you’re interested in building multi-arch images, check out [Phil Estes’ (<FontIcon icon="fa-brands fa-x-twitter"/>`estesp`)](https://twitter.com/estesp) [manifest-list tool (<FontIcon icon="iconfont icon-github"/>`estesp/manifest-tool`)](https://github.com/estesp/manifest-tool) and keep track of the [PR to add a manifest command to the Docker CLI (<FontIcon icon="iconfont icon-github"/>`docker/cli`)](https://github.com/docker/cli/pull/138).

Manifest lists and multi-arch Docker images have been in the works for a long time. We’re excited that these features are now making it simpler to pull and use Docker Official Repo images seamlessly on the many platforms where Docker is available.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": " Official Images are now Multi-platform",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-official-images-now-multi-platform.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
