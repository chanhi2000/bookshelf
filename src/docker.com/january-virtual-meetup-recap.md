---
lang: en-US
title: "January Virtual Meetup Recap: Improve Image Builds Using the Features in BuildKitDocker"
description: "Article(s) > January Virtual Meetup Recap: Improve Image Builds Using the Features in BuildKitDocker"
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
      content: "Article(s) > January Virtual Meetup Recap: Improve Image Builds Using the Features in BuildKitDocker"
    - property: og:description
      content: "January Virtual Meetup Recap: Improve Image Builds Using the Features in BuildKitDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/january-virtual-meetup-recap.html
prev: /devops/docker/articles/README.md
date: 2020-01-29
isOriginal: false
author: 
cover: https://docker.com/app/uploads/2022/06/january-virtual-meetup-1.png
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
  name="January Virtual Meetup Recap: Improve Image Builds Using the Features in BuildKitDocker"
  desc="In this virtual meetup, Docker Captain Nicholas Dille shares how to improve image builds using the features in BuildKit."
  url="https://docker.com/blog/january-virtual-meetup-recap"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2022/06/january-virtual-meetup-1.png"/>

::: note

This is a guest post by [<VPIcon icon="fa-brands fa-docker"/>Docker Captain Nicholas Dille](https://docker.com/captains/nicholas-dille), a blogger, speaker and author with 15 years of experience in virtualization and automation. He works as a DevOps Engineer at Haufe Group, a digital media company located in Freiburg, Germany. He is also a Microsoft Most Valuable Professional.  

:::

In this [<VPIcon icon="fa-brands fa-docker"/>virtual meetup](https://events.docker.com/events/details/docker-docker-virtual-meetups-presents-how-to-improve-your-docker-image-builds/#/), I share how to improve image builds using the features in [<VPIcon icon="fa-brands fa-docker"/>BuildKit](http://docs.docker.com/develop/develop-images/build_enhancements.). [<VPIcon icon="fa-brands fa-docker"/>BuildKit](http://docs.docker.com/develop/develop-images/build_enhancements.) is an alternative builder with great features like caching, concurrency and the ability to separate your image build into multiple stages – which is useful for separating the build environment from the runtime environment.

The default builder in Docker is the legacy builder. This is recommended for use when you need support for Windows. However, in nearly every other case, using BuildKit is recommended because of the fast build time, ability to use custom BuildKit front-ends, building stages in parallel and other features.  

Catch the full replay below and view the [<VPIcon icon="fas fa-globe"/>slides](https://dille.name/slides/2020-01-22/Docker-HowToImproveYourDockerImageBuilds.html) to learn:  

- Build cache in BuildKit – instead of relying on a locally present image, buildkit will pull the appropriate layers of the previous image from a registry.
- How BuildKit helps prevent disclosure of credentials by allowing files to be mounted into the build process. They are kept in memory and are not written to the image layers.
- How BuildKit supports access to remote systems through SSH by mounting the SSH agent socket into the build without adding the SSH private key to the image.
- How to use the CLI plugin [<VPIcon icon="iconfont icon-github"/>`docker/buildx`](https://github.com/docker/buildx/) to cross-build images for different platforms.
- How using the new “docker context,” the CLI is able to manage connection to multiple instances of the Docker engine. Note that it supported SSH remoting to Docker Engine.
- And finally, a tip that extends beyond image builds: When troubleshooting a running container, a debugging container can be started sharing the network and PID namespace. This allows debugging without changing the misbehaving container.

![](https://docker.com/app/uploads/2022/06/january-virtual-meetup-1.png)

**I also covered a few tools that I use in my workflow, namely**:

- [<VPIcon icon="iconfont icon-github"/>`aelsabbahy/goss`](https://github.com/aelsabbahy/goss), which allows images to be tested to match a configuration expressed in YAML. It comes with a nice wrapper called `dgoss` to use it with Docker easily. And it even provides a health endpoint to integrate into your image
- [<VPIcon icon="iconfont icon-github"/>`aquasecurity/trivy`](https://github.com/aquasecurity/trivy), an OS tool from AquaSecurity that scans images for known vulnerabilities in the OS as well as well-known package managers.

And finally, answered some of your questions:  

::: details Why not use BuildKit by default?

If your workflow involves building images often, then we recommend that you do set BuildKit as the default builder. Here is how to enable [<VPIcon icon="fa-brands fa-docker"/>BuildKit by default](https://docs.docker.com/engine/reference/commandline/#daemon-configuration-file) in the docker daemon config.

:::

::: details Does docker-compose work with BuildKit?

Support for BuildKit was added in docker-compose 1.25.0 which can be enabled by setting `DOCKER_BUILDKIT=1` and `COMPOSE_DOCKER_CLI_BUILD=1`.

:::

::: details What are the benefits of using BuildKit?

In addition to the features presented, [<VPIcon icon="fa-brands fa-google"/>BuildKit also improves build performance](https://docs.google.com/presentation/d/1fy_xBVY15fNEOs0DbuY79wKmp_POBBHAeZaGCUNQi-M/edit#slide=id.g3c469c33e2_0_4) in many cases.

:::

::: details When would I use BuildKit Secrets? (A special thank you to Captain Brandon Mitchell for answering this question)

BuildKit secrets are a good way to use a secret at build time, without saving the secret in the image. Think of it as pulling a private git repo without saving your ssh key to the image. For runtime, it’s often different compose files to support compose vs swarm mode, each mounting the secret a different way, i.e. a volume vs. swarm secret.  

:::

::: details How do I enable BuildKit for Jenkins Docker build plugin?

The only reference to BuildKit I was able to find refers to [<VPIcon icon="fa-brands fa-jenkins"/>adding support in the Docker Pipeline plugin](https://issues.jenkins-ci.org/browse/JENKINS-57780).  

:::

::: details Does BuildKit share the build cache with the legacy builder?

No, the caches are separate.  

:::

::: details What are your thoughts on having the testing step as a stage in a multi-stage build?

The test step can be a separate stage in the build. If the test step requires a special tool to be installed, it can be a second final stage. If your multi-stage build increases in complexity, take a look at CI/CD tools.  

:::

::: details How does pulling the previous image save time over just doing the build?

The download can be significantly faster than redoing all the work.  

:::

::: details Is the created image still “identical” or is there any real difference in the final image artifact?

The legacy builder, as well as BuildKit, produces identical (or rather equivalent) images.  

:::

::: details Will Docker inspect show that the image was built using BuildKit?

No.  

:::

::: details Do you know any combination of debugging with docker images/containers (I use the following technologies: python and Django and Pycharm)?

No. Anyone have any advice here?

:::

::: details Is Docker BuildKit supported with maven Dockerfile plugin?

If the question is referring to Spotify’s Dockerfile Maven plugin (which is unmaintained), the answer is no. Other plugins may be able to use BuildKit when providing the environment variable DOCKER_BUILDKIT=1. Instead of changing the way the client works, you could configure the daemon to use BuildKit by default (see first question above).

:::

::: details What do you think about CRI-O?

I think that containerd has gained more visibility and has been adopted by many cloud providers as the runtime in Kubernetes offerings. But I have no experience myself with CRI-O.

:::

To be notified of upcoming meetups, join the [<VPIcon icon="fa-brands fa-docker"/>Docker Virtual Meetup Group](https://events.docker.com/docker-virtual-meetups/) using your Docker ID or on [<VPIcon icon="fas fa-globe"/>Meetup.com](https://meetup.com/Docker-Online-Meetup/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "January Virtual Meetup Recap: Improve Image Builds Using the Features in BuildKitDocker",
  "desc": "In this virtual meetup, Docker Captain Nicholas Dille shares how to improve image builds using the features in BuildKit.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/january-virtual-meetup-recap.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
