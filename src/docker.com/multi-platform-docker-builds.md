---
lang: en-US
title: "Multi-Platform Docker Builds"
description: "Article(s) > Multi-Platform Docker Builds"
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
      content: "Article(s) > Multi-Platform Docker Builds"
    - property: og:description
      content: "Multi-Platform Docker Builds"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/multi-platform-docker-builds.html
prev: /devops/docker/articles/README.md
date: 2020-03-31
isOriginal: false
author:
  - name: Adrian Mouat
    url: https://docker.com/contributors/adrian-mouat/
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
  name="Multi-Platform Docker Builds"
  desc="Docker images have become a standard tool for testing and deploying new and third-party software."
  url="https://docker.com/blog/multi-platform-docker-builds"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

::: note

This is a guest post from Docker Captain [Adrian Mouat (<VPIcon icon="fa-brands fa-x-twitter" />`adrianmouat`)](https://twitter.com/adrianmouat) who is Chief Scientist at Container Solutions, a cloud-native consultancy and Kubernetes Certified Service Provider. Adrian is the author of “Using Docker,” published by O’Reilly Media. He is currently developing Trow, a container image registry designed to securely manage the flow of images in a Kubernetes cluster. Adrian is a regular conference speaker and trainer and he has spoken at several events including KubeCon EU, DockerCon, CraftConf, TuringFest and GOTO Amsterdam.

:::

Docker images have become a standard tool for testing and deploying new and third-party software. I’m the main developer of the open source [<VPIcon icon="fas fa-globe"/>Trow registry](https://trow.io/) and Docker images are the primary way people install the tool. If I didn’t provide images, others would end up rolling their own which would duplicate work and create maintenance issues.

By default, the Docker images we create run on the `linux/amd64` platform. This works for the majority of development machines and cloud providers but leaves users of other platforms out in the cold. This is a substantial audience – think of home-labs built from Raspberry Pis, companies producing IoT devices, organisations running on IBM mainframes and clouds utilising low-power arm64 chips. Users of these platforms are typically building their own images or finding another solution.

So how can you build images for these other platforms? The most obvious way is simply to build the image on the target platform itself. This can work in a lot of cases, but if you’re targetting s390x, I hope you have access to an IBM mainframe (try [<VPIcon icon="fas fa-globe"/>Phil Estes](https://estesp.dev/), as I’ve heard he has several in his garage). More common platforms like Raspberry Pis and IoT devices are typically limited in power and are slow or incapable of building images.

So what can we do instead? There’s two more options:

1. emulate the target platform or
2. cross-compile. Interestingly, I’ve found that a blend of the two options can work best.

---

## Emulation

Let’s start by looking at the first option, emulation. There’s a fantastic project called [<VPIcon icon="iconfont icon-qemu"/>QEMU](https://qemu.org/) that can emulate a whole bunch of platforms. With the recent [buildx (<VPIcon icon="iconfont icon-github"/>`docker/buildx`)](https://github.com/docker/buildx) work, it’s easier than ever to use QEMU with Docker.

The QEMU integration relies on a Linux kernel feature with the slightly cryptic name of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>binfmt_misc handler](https://en.wikipedia.org/wiki/Binfmt_misc). When Linux encounters an executable file format it doesn’t recognise (i.e. one for a different architecture), it will check with the handler if there any “user space applications” configured to deal with the format (i.e. an emulator or VM). If there are, it will pass the executable to the application.

For this to work, we need to register the platforms we’re interested in with the kernel. If you’re using Docker Desktop this will already have been done for you for the most common platforms. If you’re using Linux, you can register handlers in the same way as Docker Desktop by running the latest `docker/binfmt` image e.g:

```sh
docker run --privileged --rm docker/binfmt:a7996909642ee92942dcd6cff44b9b95f08dad64
```

You may need to restart Docker after doing this. If you’d like a little more control over which platforms you want to register or want to use a more esoteric platform (e.g. PowerPC) take a look at the [qus project (<VPIcon icon="iconfont icon-github"/>`dbhi/qus`)](https://github.com/dbhi/qus).

There’s a couple of different ways to use buildx, but the easiest is probably to enable experimental features on the Docker CLI if you haven’t already – just edit <VPIcon icon="fas fa-folder-open"/>`~/.docker/`<VPIcon icon="iconfont icon-json"/>`config.json` to include the following:

```json{3}
{
  ...
  "experimental": "enabled"
}
```

You should now be able to run `docker buildx ls` and you should get output similar to the following:

```sh
docker buildx ls
#
# NAME/NODE     DRIVER/ENDPOINT             STATUS   PLATFORMS
# default       docker                               
# default       default                     running  linux/amd64, linux/arm64, linux/riscv64, linux/ppc64le,
```

Let’s try building an image for another platform. Start with this <VPIcon icon="fa-brands fa-docker"/>`Dockerfile`:

```dockerfile title="Dockerfile"
FROM debian:buster
 
CMD uname -m
```

If we build it normally and run it:

```sh
docker buildx build -t local-build .
#
# …
docker run --rm local-build
#
# x86_64
```

But if we explicitly name a platform to build for:

```sh
docker buildx build --platform linux/arm/v7 -t arm-build .
#
# …
docker run --rm arm-build
#
# armv7l
```

Success! We’ve managed to build and run an armv7 image on an x86_64 laptop with little work. This technique is effective, but for more complex builds you may find it runs too slowly or you hit bugs in QEMU. In those cases, it’s worth looking into whether or not you can cross-compile your image.

---

## Cross-Compilation

Several compilers are capable of emitting binary for foreign platforms, most notably including Go and Rust. With the Trow registry project, we found cross-compilation to be the quickest and most reliable method to create images for other platforms. For example, here is the [Dockerfile for the Trow armv7 image (<VPIcon icon="iconfont icon-github"/>`ContainerSolutions/trow`)](https://github.com/ContainerSolutions/trow/blob/master/docker/Dockerfile.armv7). The most relevant line is:

```dockerfile title="Dockerfile"
RUN cargo build --target armv7-unknown-linux-gnueabihf -Z unstable-options --out-dir 
```

Which explicitly tells Rust what platform we want our binary to run on. We can then use a multistage build to copy this binary into a base image for the target architecture (we could also use scratch if we statically compiled) and we’re done. However, in the case of the Trow registry, there are a few more things I want to set in the final image, so the final stage actually begins with:

```dockerfile title="Dockerfile"
FROM --platform=linux/arm/v7 debian:stable-slim</code></div></div></td></tr></tbody>
```

Because of this, I’m actually using a blend of both emulation and cross-compilation – cross-compilation to create the binary and emulation to run and configure our final image.

---

## Manifest Lists

In the above advice about emulation, you might have noticed we used the `--platform` argument to set the build platform, but we left the image specified in the FROM line as `debian:buster`. It might seem this doesn’t make sense – surely the platform depends on the base image and how it was built, not what the user decides at a later stage?

What is happening here is Docker is using something called manifest lists. These are lists for a given image that contain pointers to images for different architectures. Because the official debian image has a manifest list defined, when I pull the image on my laptop, I automagically get the amd64 image and when I pull it on my Raspberry Pi, I get the armv7 image.

To keep our users happy, we can create manifest lists for our own images. If we go back to our earlier example, first we need to rebuild and push the images to a repository:

```sh
docker buildx build --platform linux/arm/v7 -t amouat/arch-test:armv7 .
#
# …
docker push amouat/arch-test:armv7
#
# …
docker buildx build -t amouat/arch-test:amd64 .
#
# …
docker push amouat/arch-test:amd64
```

Next, we create a manifest list that points to these two separate images and push that:

```sh
docker manifest create amouat/arch-test:blog amouat/arch-test:amd64 amouat/arch-test:armv7
#
# Created manifest list docker.io/amouat/arch-test:blog
docker manifest push amouat/arch-test:blog
#
# sha256:039dd768fc0758fbe82e3296d40b45f71fd69768f21bb9e0da02d0fb28c67648
```

Now Docker will pull and run the appropriate image for the current platform:

```sh
docker run amouat/arch-test:blog
#
# Unable to find image 'amouat/arch-test:blog' locally
# blog: Pulling from amouat/arch-test
# Digest: sha256:039dd768fc0758fbe82e3296d40b45f71fd69768f21bb9e0da02d0fb28c67648
# Status: Downloaded newer image for amouat/arch-test:blog
# x86_64
```

Somebody with a Raspberry Pi to hand can try running the image and confirm that it does indeed work on that platform as well!

To recap; not all users of Docker images run amd64. With buildx and QEMU, it’s possible to support these users with a small amount of extra work.

Happy Birthday, Docker!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Multi-Platform Docker Builds",
  "desc": "Docker images have become a standard tool for testing and deploying new and third-party software.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/multi-platform-docker-builds.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
