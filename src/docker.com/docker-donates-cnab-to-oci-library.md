---
lang: en-US
title: "Docker Donates the cnab-to-oci Library to cnab.io"
description: "Article(s) > Docker Donates the cnab-to-oci Library to cnab.io"
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
      content: "Article(s) > Docker Donates the cnab-to-oci Library to cnab.io"
    - property: og:description
      content: "Docker Donates the cnab-to-oci Library to cnab.io"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-donates-cnab-to-oci-library.html
prev: /devops/docker/articles/README.md
date: 2020-02-12
isOriginal: false
author:
  - name: Silvin Lubecki
    url: https://docker.com/contributors/silvin-lubecki/
cover: https://docker.com/app/uploads/2020/02/imageLikeEmbed.png
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
  name="Docker Donates the cnab-to-oci Library to cnab.io"
  desc="Docker helped with the development of all those components, but also worked with Microsoft on the cnab-to-oci library for sharing a CNAB bundle. This library is now used at least by 3 tools: Docker App, Porter and duffle, but also internally in Docker Hub. It successfully demonstrated how to push, pull and share description of a CNAB bundle on a registry. This work will be used as a base for the future CNAB Registries specification."
  url="https://docker.com/blog/docker-donates-cnab-to-oci-library"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/02/imageLikeEmbed.png"/>

![oci library](https://docker.com/app/uploads/2020/02/oci-library-1110x392.png)

Docker is proud and happy to announce the donation of our [<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`](https://github.com/cnabio/cnab-to-oci) library to the [<VPIcon icon="fas fa-globe"/>CNAB project](https://cnab.io) 🎉. This project was created last year after Microsoft and Docker moved the CNAB specification to the Linux Foundation’s [<VPIcon icon="fas fa-globe"/>Joint Development Foundation](https://jointdevelopment.org/). At that time, the CNAB specification repository was moved from the [deislab](http://github.com/deislabs) GitHub organization to the new [<VPIcon icon="iconfont icon-github"/>`cnabio`](http://github.com/cnabio) organization. The reference implementations – [<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-go`](https://github.com/cnabio/cnab-go) which is the Golang library implementation of the specification and [<VPIcon icon="iconfont icon-github"/>`cnabio/duffle`](https://github.com/cnabio/duffle) which is the CLI reference implementation – were also moved.

---

## What is `cnab-to-oci` for?

Docker helped with the development of the CNAB specification and its reference implementations, and led the work on the [<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`](https://github.com/cnabio/cnab-to-oci) library for sharing a CNAB bundle using an existing container registry. This library is now used by 3 CNAB tools, [Docker App (<VPIcon icon="iconfont icon-github"/>`docker/app`)](https://github.com/docker/app), [<VPIcon icon="fas fa-globe"/>Porter](https://porter.sh/) and [<VPIcon icon="fas fa-globe"/>duffle](https://duffle.sh/), as well as [<VPIcon icon="fa-brands fa-docker"/>Docker Hub](https://hub.docker.com/). It successfully demonstrated how to push, pull and share a CNAB bundle using a registry. This work will be used as a foundation for the [future CNAB Registries specification (<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-spec`)](https://github.com/cnabio/cnab-spec/blob/master/200-CNAB-registries.md).

::: info

The transfer is already in effect, so starting now please refer to [github.com/cnabio/cnab-to-oci (<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`)](http://github.com/cnabio/cnab-to-oci) in your Golang imports.

<SiteInfo
  name="cnabio/cnab-to-oci"
  desc="Tool to convert CNAB bundle.json to OCI index."
  url="https://github.com/cnabio/cnab-to-oci/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ca1c62261cc9d4a1278ac10579acf603e56fc92350921236ab5421f703d4c301/cnabio/cnab-to-oci"/>

:::

---

## How does `cnab-to-oci` store a CNAB bundle into a registry?

As you may know, the [OCI image specification (<VPIcon icon="iconfont icon-github"/>`opencontainers/image-spec`)](https://github.com/opencontainers/image-spec) introduces two main objects: the [OCI Manifest (<VPIcon icon="iconfont icon-github"/>`opencontainers/image-spec`)](https://github.com/opencontainers/image-spec/blob/master/manifest.md) and the [OCI Image Index (<VPIcon icon="iconfont icon-github"/>`opencontainers/image-spec`)](https://github.com/opencontainers/image-spec/blob/master/image-index.md). The first one is well known and represents the classic Docker image. The other one was, at first, used to store multi-architecture images (see [<VPIcon icon="fa-brands fa-docker"/>`nginx`](https://hub.docker.com/_/nginx) as an example).

But what you may not know is that the specification doesn’t restrict the use of OCI Indexes to multi-arch images. You can store almost anything you want, as long as you meet the specification, and it is quite open.

[<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`](https://github.com/cnabio/cnab-to-oci) uses this openness to push the *bundle.json*, but also the invocation image and the component images (or service images for a Docker App). It pushes everything in the same repository, so one has the guarantee that when someone pulls her/his bundle, all the components can be pulled as well.

---

## Demo Time

While [<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`](https://github.com/cnabio/cnab-to-oci) is implemented as a library that can be used by other tools, the repository contains a handy CLI tool that can perform push and pull of any CNAB bundle.json.

With the following command we push a bundle example to the Docker Hub repository. It pushes all the manifests found in the bundle, then creates an OCI Index and pushes it at the end. The digest we get as a result is pointing to the OCI Index of the bundle.

```sh :collapsed-lines
make bin/cnab-to-oci
#
# …
./bin/cnab-to-oci push examples/helloworld-cnab/bundle.json -t hubusername/repo:demo –log-level=debug –auto-update-bundle
#
# DEBU[0000] Fixing up bundle docker.io/hubusername/repo:demo
# DEBU[0000] Updating entry in relocation map for “cnab/helloworld:0.1.1”
# Starting to copy image cnab/helloworld:0.1.1…
# Completed image cnab/helloworld:0.1.1 copy
# DEBU[0004] Bundle fixed
# DEBU[0004] Pushing CNAB Bundle docker.io/hubusername/repo:demo
# DEBU[0004] Pushing CNAB Bundle Config
# DEBU[0004] Trying to push CNAB Bundle Config
# DEBU[0004] CNAB Bundle Config Descriptor
# DEBU[0004] {
#   “mediaType”: “application/vnd.cnab.config.v1+json”,
#   “digest”: “sha256:e91b9dfcbbb3b88bac94726f276b89de46e4460b55f6e6d6f876e666b150ec5b”,
#   “size”: 498
# }
# DEBU[0005] Trying to push CNAB Bundle Config Manifest
# DEBU[0005] CNAB Bundle Config Manifest Descriptor
# DEBU[0005] {
#   “mediaType”: “application/vnd.oci.image.manifest.v1+json”,
#   “digest”: “sha256:6ec4fd695cace0e3d4305838fdf9fcd646798d3fea42b3abb28c117f903a6a5f”,
#   “size”: 188
# }
# DEBU[0006] Failed to push CNAB Bundle Config Manifest, trying with a fallback method
# DEBU[0006] Trying to push CNAB Bundle Config
# DEBU[0006] CNAB Bundle Config Descriptor
# DEBU[0006] {
#   “mediaType”: “application/vnd.oci.image.config.v1+json”,
#   “digest”: “sha256:e91b9dfcbbb3b88bac94726f276b89de46e4460b55f6e6d6f876e666b150ec5b”,
#   “size”: 498
# }
# DEBU[0006] Trying to push CNAB Bundle Config Manifest
# DEBU[0006] CNAB Bundle Config Manifest Descriptor
# DEBU[0006] {
#   “mediaType”: “application/vnd.oci.image.manifest.v1+json”,
#   “digest”: “sha256:b9616da7500f8c7c9a5e8d915714cd02d11bcc71ff5b4fd190bb77b1355c8549”,
#   “size”: 193
# }
# DEBU[0006] CNAB Bundle Config pushed
# DEBU[0006] Pushing CNAB Index
# DEBU[0006] Trying to push OCI Index
# DEBU[0006] {“schemaVersion”:2,”manifests”:[{“mediaType”:”application/vnd.oci.image.manifest.v1+json”,”digest”:”sha256:b9616da7500f8c7c9a5e8d915714cd02d11bcc71ff5b4fd190bb77b1355c8549″,”size”:193,”annotations”:{“io.cnab.manifest.type”:”config”}},{“mediaType”:”application/vnd.docker.distribution.manifest.v2+json”,”digest”:”sha256:a59a4e74d9cc89e4e75dfb2cc7ea5c108e4236ba6231b53081a9e2506d1197b6″,”size”:942,”annotations”:{“io.cnab.manifest.type”:”invocation”}}],”annotations”:{“io.cnab.keywords”:”[\”helloworld\”,\”cnab\”,\”tutorial\”]”,”io.cnab.runtime_version”:”v1.0.0″,”org.opencontainers.artifactType”:”application/vnd.cnab.manifest.v1″,”org.opencontainers.image.authors”:”[{\”name\”:\”Jane Doe\”,\”email\”:\”jane.doe@example.com\”,\”url\”:\”https://example.com\”}]”,”org.opencontainers.image.description”:”A short description of your bundle”,”org.opencontainers.image.title”:”helloworld”,”org.opencontainers.image.version”:”0.1.1″}}
# DEBU[0006] OCI Index Descriptor
# DEBU[0006] {
#   “mediaType”: “application/vnd.oci.image.index.v1+json”,
#   “digest”: “sha256:fcee8577f3acc8ddc6e0280e6d1eb15be70bdff460fe7353abf917a872487af2”,
#   “size”: 926
# }
# DEBU[0007] CNAB Index pushed
# DEBU[0007] CNAB Bundle pushed
# Pushed successfully, with digest “sha256:fcee8577f3acc8ddc6e0280e6d1eb15be70bdff460fe7353abf917a872487af2”
```

Let’s check that our bundle has been pushed on Docker [Hub (<VPIcon icon="fa-brands fa-docker"/>`docker/hubusername`)](https://hub.docker.com/repository/docker/hubusername/repo/general):

![HubScreenshot](https://docker.com/app/uploads/2020/02/HubScreenshot.png?fit=1110%2C535&ssl=1)

We can now pull our bundle back from the registry. It will only fetch the bundle.json file, but as you may notice this now has a digested reference for the image manifest of every component, inside the same registry repository. The Docker Engine will pull any images required by the bundle at runtime. So pulling a bundle is a lightweight process.

```sh :collapsed-lines
./bin/cnab-to-oci pull hubusername/repo:demo –log-level=debug
#
# DEBU[0000] Pulling CNAB Bundle docker.io/hubusername/repo:demo
# DEBU[0000] Getting OCI Index Descriptor
# DEBU[0001] {
#   “mediaType”: “application/vnd.oci.image.index.v1+json”,
#   “digest”: “sha256:fcee8577f3acc8ddc6e0280e6d1eb15be70bdff460fe7353abf917a872487af2”,
#   “size”: 926
# }
# DEBU[0001] Fetching OCI Index sha256:fcee8577f3acc8ddc6e0280e6d1eb15be70bdff460fe7353abf917a872487af2
# DEBU[0001] {
#   “schemaVersion”: 2,
#   “manifests”: [
#     {
#       “mediaType”: “application/vnd.oci.image.manifest.v1+json”,
#       “digest”: “sha256:b9616da7500f8c7c9a5e8d915714cd02d11bcc71ff5b4fd190bb77b1355c8549”,
#       “size”: 193,
#       “annotations”: {
#         “io.cnab.manifest.type”: “config”
#       }
#     },
#     {
#       “mediaType”: “application/vnd.docker.distribution.manifest.v2+json”,
#       “digest”: “sha256:a59a4e74d9cc89e4e75dfb2cc7ea5c108e4236ba6231b53081a9e2506d1197b6”,
#       “size”: 942,
#       “annotations”: {
#         “io.cnab.manifest.type”: “invocation”
#       }
#     }
#   ],
#   “annotations”: {
#     “io.cnab.keywords”: “[\”helloworld\”,\”cnab\”,\”tutorial\”]”,
#     “io.cnab.runtime_version”: “v1.0.0”,
#     “org.opencontainers.artifactType”: “application/vnd.cnab.manifest.v1”,
#     “org.opencontainers.image.authors”: “[{\”name\”:\”Jane Doe\”,\”email\”:\”jane.doe@example.com\”,\”url\”:\”https://example.com\”}]”,
#     “org.opencontainers.image.description”: “A short description of your bundle”,
#     “org.opencontainers.image.title”: “helloworld”,
#     “org.opencontainers.image.version”: “0.1.1”
#   }
# }
# DEBU[0001] Getting Bundle Config Manifest Descriptor
# DEBU[0001] {
#   “mediaType”: “application/vnd.oci.image.manifest.v1+json”,
#   “digest”: “sha256:b9616da7500f8c7c9a5e8d915714cd02d11bcc71ff5b4fd190bb77b1355c8549”,
#   “size”: 193,
#   “annotations”: {
#     “io.cnab.manifest.type”: “config”
#   }
# }
# DEBU[0001] Getting Bundle Config Manifest sha256:b9616da7500f8c7c9a5e8d915714cd02d11bcc71ff5b4fd190bb77b1355c8549
# DEBU[0001] {
#   “schemaVersion”: 2,
#   “config”: {
#     “mediaType”: “application/vnd.oci.image.config.v1+json”,
#     “digest”: “sha256:e91b9dfcbbb3b88bac94726f276b89de46e4460b55f6e6d6f876e666b150ec5b”,
#     “size”: 498
#   },
#   “layers”: null
# }
# DEBU[0001] Fetching Bundle sha256:e91b9dfcbbb3b88bac94726f276b89de46e4460b55f6e6d6f876e666b150ec5b
# DEBU[0002] {
#   “schemaVersion”: “v1.0.0”,
#   “name”: “helloworld”,
#   “version”: “0.1.1”,
#   “description”: “A short description of your bundle”,
#   “keywords”: [
#     “helloworld”,
#     “cnab”,
#     “tutorial”
#   ],
#   “maintainers”: [
#     {
#       “name”: “Jane Doe”,
#       “email”: “jane.doe@example.com”,
#       “url”: “https://example.com”
#     }
#   ],
#   “invocationImages”: [
#     {
#       “imageType”: “docker”,
#       “image”: “cnab/helloworld:0.1.1”,
#       “contentDigest”: “sha256:a59a4e74d9cc89e4e75dfb2cc7ea5c108e4236ba6231b53081a9e2506d1197b6”,
#       “size”: 942,
#       “mediaType”: “application/vnd.docker.distribution.manifest.v2+json”
#     }
#   ]
# }
```

[<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`](https://github.com/cnabio/cnab-to-oci) has been integrated with Docker App in the [last beta release v0.9.0-beta1 (<VPIcon icon="iconfont icon-github"/>`docker-archive-public/docker.app`)](https://github.com/docker-archive-public/docker.app/releases/tag/v0.9.0-beta1), to let you push and pull your entire application with the same UX as pushing a regular Docker container image. As Docker App is a standard CNAB runtime, it can also run this generic CNAB example:

```sh
docker app pull hubusername/repo:demo
#
# Successfully pulled “helloworld” (0.1.1) from docker.io/hubusername/repo:demo

docker app run hubusername/repo:demo
#
# Port parameter was set to 
# Install action
# Action install complete for upbeat_nobel
# App “upbeat_nobel” running on context “default”
```

::: info Want to Know More?

If you’re interested in getting more details about CNAB, a few blog posts are available:

```component VPCard
{
  "title": "Building Multi-Arch Images for Arm and x86 with Docker Desktop",
  "desc": "Docker is making it easier than ever to develop containers on, and for Arm servers and devices. Using the standard tooling and processes you are already familiar with you can start to build, push, pull, and run images of different architectures.  No changes to Dockerfiles or source code is needed to start building for Arm.",
  "link": "/docker.com/multi-arch-images.md",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```

:::

::: note

Please note that we will give a talk about this topic at KubeCon Europe 2020: [“Sharing is Caring! Push your Cloud Application to an OCI Registry – Silvin Lubecki & Djordje Lukic”](https://kccnceu20.sched.com/event/Zemr)

:::

And of course, you can also find more information directly on the [cnab-to-oci GitHub repository (<VPIcon icon="iconfont icon-github"/>`cnabio/cnab-to-oci`)](https://github.com/cnabio/cnab-to-oci).

<SiteInfo
  name="cnabio/cnab-to-oci"
  desc="Tool to convert CNAB bundle.json to OCI index."
  url="https://github.com/cnabio/cnab-to-oci/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ca1c62261cc9d4a1278ac10579acf603e56fc92350921236ab5421f703d4c301/cnabio/cnab-to-oci"/>

Contributions are welcome!!! 🤗

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Donates the cnab-to-oci Library to cnab.io",
  "desc": "Docker helped with the development of all those components, but also worked with Microsoft on the cnab-to-oci library for sharing a CNAB bundle. This library is now used at least by 3 tools: Docker App, Porter and duffle, but also internally in Docker Hub. It successfully demonstrated how to push, pull and share description of a CNAB bundle on a registry. This work will be used as a base for the future CNAB Registries specification.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-donates-cnab-to-oci-library.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
