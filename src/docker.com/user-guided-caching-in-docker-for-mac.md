---
lang: en-US
title: "User-guided caching in  for Mac"
description: "Article(s) > User-guided caching in  for Mac"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Apple
  - macOS
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - apple
  - macos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > User-guided caching in  for Mac"
    - property: og:description
      content: "User-guided caching in  for Mac"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/user-guided-caching-in-docker-for-mac.html
prev: /devops/docker/articles/README.md
date: 2017-05-06
isOriginal: false
author:
  - name: Jeremy Yallop
    url : https://docker.com/author/jeremy/
cover: https://docker.com/app/uploads/1e51d4bd-c100-42a4-b5b0-ece3f7cedd35-1.jpg
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

```component VPCard
{
  "title": "macOS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/macos/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="User-guided caching in  for Mac"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/user-guided-caching-in-docker-for-mac"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/1e51d4bd-c100-42a4-b5b0-ece3f7cedd35-1.jpg"/>

::: note

This post was written by Jeremy Yallop and [David Sheets (<VPIcon icon="iconfont icon-github"/>`dsheets`)](https://github.com/dsheets/).

:::

Recent Docker releases (17.04 CE Edge onwards) bring significant performance improvements to bind-mounted directories on macOS. (Docker users on the stable channel will see the improvements in the forthcoming 17.06 release.) Commands for bind-mounting directories have new options to selectively enable caching.

Containers that perform large numbers of read operations in mounted directories are the main beneficiaries. Here’s an illustration of the improvements in a few tools and applications in common use among Docker for Mac users: go list is 2.5× faster; symfony is 2.7× faster, and rake is 3.5× faster, as illustrated by the following graphs:

::: tabs

@tab:active <code>go list</code>

2.5× speedup

![`go list ./...` in the `moby/moby` repository](https://docker.com/app/uploads/1e51d4bd-c100-42a4-b5b0-ece3f7cedd35-1.jpg)

@tab <code>symfony</code>

2.7× speedup

![`curl` of the main page of the [Symfony demo app (<VPIcon icon="iconfont icon-github"/>`maxpou/docker-symfony`)](https://github.com/maxpou/docker-symfony)](https://docker.com/app/uploads/936797c1-24cf-4060-9277-f52525044ecc.jpg)

@tab <code>rake</code>

3.5× speedup

![`rake -T` in [@hirowatari’s benchmark (<VPIcon icon="iconfont icon-github"/>`hirowatari/docker-for-mac-rails-bug`)](https://github.com/hirowatari/docker-for-mac-rails-bug)](https://docker.com/app/uploads/cbfd4e1e-ba50-4971-bc6f-9e4960fa1fae.jpg)

:::

For more details about how and when to enable caching, and what’s going on under the hood, read on.

---

## Basics of bind-mounting

A defining characteristic of containers is isolation: by default, many parts of the execution environment of a container are isolated both from other containers and from the host system. In the filesystem, isolation shows up as layering: the filesystem of a running container consists of a series of [<VPIcon icon="fa-brands fa-docker"/>incremental layers](https://docs.docker.com/engine/userguide/storagedriver/imagesandcontainers/#images-and-layers), topped by a container-specific read/write layer that keeps changes made within the container concealed from the outside world.

Isolation as a default encourages careful thinking about the best way to bypass isolation in order to share data with a container. For data-in-motion, Docker offers a [<VPIcon icon="fa-brands fa-docker"/>variety of ways](httuser-guided-caching-in-docker-for-mac.html.vueps://docs.docker.com/engine/userguide/networking/#default-networks) to connect containers via the network. For data-at-rest, [<VPIcon icon="fa-brands fa-docker"/>Docker Volumes](https://docs.docker.com/engine/tutorials/dockervolumes/) offer a flexible mechanism to share data between containers, and with the host.

The simplest and most common way to use volumes is to bind-mount a host directory when starting a container — that is, to make the directory available at a specified point in the container’s filesystem. For example, the following command runs the `alpine` image, exposing the host directory <VPIcon icon="fas fa-folder-open"/>`/Users/yallop/project` within the container as <VPIcon icon="fas fa-folder-open"/>`/project`:

```sh
docker run -v /Users/yallop/project:/project:cached alpine command
```

In this example, modifications to files under <VPIcon icon="fas fa-folder-open"/>`/project` in the container appear as modifications to the corresponding files under <VPIcon icon="fas fa-folder-open"/>`/Users/yallop/project` on the host. Similarly, modifications to files under <VPIcon icon="fas fa-folder-open"/>`/Users/yallop/project` on the host appear as modifications to files under /project in the container.

There are many use cases for bind mounting. For example, you might

- develop software using an editor on your host, running development tools in a container
- run a periodic job in a container, storing the output in a host directory
- cache large data assets on the host for processing in a container

### Bind mounts on Linux

Newcomers to Docker are sometimes surprised to discover that the performance overhead of containers is often [<VPIcon icon="fas fa-file-pdf"/>close to negligible](http://domino.research.ibm.com/library/cyberdig.nsf/papers/0929052195DD819C85257D2300681E7B/$File/rc25482.pdf) and in many cases, is significantly lower than other forms of virtualization.

<PDF url="http://domino.research.ibm.com/library/cyberdig.nsf/papers/0929052195DD819C85257D2300681E7B/$File/rc25482.pdf"/>

On Linux, bind-mounting a directory, like many Docker features, simply selectively exposes host resources directly to a container. Consequently, access to bind mounts carries little-to-no overhead compared to filesystem access in a regular process.

### Bind mounts on Docker for Mac

The Linux kernel makes container-style isolation efficient, but running containers on Docker editions for non-Linux operating systems such as [<VPIcon icon="fa-brands fa-docker"/>macOS](https://store.docker.com/editions/community/docker-ce-desktop-mac) involves several additional moving parts that carry additional overhead.

Docker containers run on top of a Linux kernel, and so the Docker for Mac container runtime system runs a minimal Linux instance using the [HyperKit (<VPIcon icon="iconfont icon-github"/>`docker/hyperkit`)](https://github.com/docker/hyperkit) framework. Containers running on top of the Linux system cannot directly access macOS filesystem or networking resources, and so Docker for Mac includes libraries that expose those resources in a way that the Docker engine can consume.

Access to filesystem resources is provided by a separate non-privileged macOS process ([<VPIcon icon="fa-brands fa-docker"/>osxfs](https://docs.docker.com/docker-for-mac/osxfs/)) that communicates with a daemon (“transfused”) running on the virtualized Linux. A Linux system call such as `open` or `read` that accesses bind-mounted files in a container must be.

- turned into a FUSE message in the Linux VFS
- proxied over a virtio socket by transfused
- forwarded onto a UNIX domain socket by HyperKit
- deserialized, dispatched and executed as a macOS system call by osxfs

The entire process then takes place in reverse to return the result of the macOS system call to the container.

Each step in the process is fairly efficient, making the total round trip time around 100 microseconds. However, some software, written under the usually-correct assumption that system calls are instantaneous, can perform [tens of thousands of system calls (<VPIcon icon="iconfont icon-github"/>`nodejs/node`)](https://github.com/nodejs/node/pull/10253) for each user-facing operation. Even a comparatively low overhead can become [irksome (<VPIcon icon="iconfont icon-github"/>`docker/for-mac`)](https://github.com/docker/for-mac/issues/77) when scaled up by four orders of magnitude. Consequently, although syscall latency has been reduced several times since the initial release of Docker for Mac, and although a few opportunities for further reducing latency remain, optimizing latency alone will not completely address bind mount performance for all applications.

### File sharing design constraints under Docker for Mac

The design described above arises from a number of constraints, which in turn arise from the high-level design goals of Docker for Mac: it should closely match the Linux execution environment, require minimal configuration, and involve as little privileged system access as possible.

Three constraints in particular underlie the design of Docker for Mac file sharing.

The first constraint is consistency: a running container should always have the same view of a bind-mounted directory as the host system. On Linux consistency comes for free, since bind-mounting directly exposes a directory to a container. On macOS maintaining consistency is not free: changes must be synchronously propagated between container and host.

The second constraint is event propagation: several common workflows rely on containers receiving [<VPIcon icon="fa-brands fa-wikipedia-w"/>inotify](https://en.wikipedia.org/wiki/Inotify) events when files change on the host, or on the host receiving events when the container makes changes. Again, event propagation is automatic and free on Linux, but Docker for Mac must perform additional work to ensure that events are propagated promptly and reliably.

The third constraint concerns the interface: bind mounting on Docker for Mac should support both the concise [<VPIcon icon="fa-brands fa-docker"/>`-v` syntax](https://docs.docker.com/engine/reference/run/#volume-shared-filesystems) and the [<VPIcon icon="fa-brands fa-docker"/>more elaborate interfaces](https://docs.docker.com/engine/reference/commandline/service_create/#differences-between---mount-and---volume) for bind mounting on Linux.

These constraints rule out a number of alternative solutions. Using `rsync` to copy files into a container provides fast access, but does not support consistency. Mounting directories into containers using NFS works well for some use cases, but does not support event propagation. Reverse-mounting container directories onto the host might provide good performance for some workloads, but would require a very different interface.

---

## User-guided caching

The design constraints above describe useful defaults. In particular, a system that was not consistent by default would behave in ways that were unpredictable and surprising, especially for casual users, for users used to the Linux implementation, and for software invoking docker on the host.

However, not all applications need the guarantees which arise for free from the Linux implementation. In particular, although the Linux implementation guarantees that the container and host have consistent views at all times, temporary inconsistency between container and host is sometimes acceptable. Allowing temporary inconsistency makes it possible to cache filesystem state, avoiding unnecessary communication between the container and macOS, and increasing performance.

Different applications require different levels of consistency. Full consistency is sometimes essential, and remains the default. However, to support cases where temporary inconsistency is an acceptable price to pay for improved performance, Docker 17.04 CE Edge includes new flags for the `-v` option:

- *consistent:* Full consistency. The container runtime and the host maintain an identical view of the mount at all times. This is the default, as described above.
- *cached**:* The host’s view of the mount is authoritative. There may be delays before updates made on the host are visible within a container.

For example, to enable cached mode for the bind-mounted directory above, you might write

```sh
docker run -v /Users/yallop/project:/project:cached alpine command
```

And caching is enabled on a per-mount basis, so you can mount each directory in a different mode:

```sh
docker run -v /Users/yallop/project:/project:cached \
-v /host/another-path:/mount/another-point:consistent \
alpine command
```

The [osxfs documentation](https://docs.docker.com/docker-for-mac/osxfs/) has more details about the guarantees provided by *consistent* and *cached*.  On Linux, where full consistency comes for free, *cached* behaves identically to *consistent.*

---

## Feedback

We have seen significant improvements in the performance of several common applications when directories are mounted in the new cached mode.

For the moment, read-heavy workloads will benefit most from caching. Improvements in the performance of write-heavy workloads, including a [popular dd-based benchmark (<VPIcon icon="iconfont icon-github"/>`docker/for-mac`)](https://github.com/docker/for-mac/issues/77#issuecomment-255143208), are under development.

Test cases involving real world applications are a big help in guiding Docker for Mac development. So, if you have field reports or other comments about file sharing performance, we’d love to hear from you.

You can get in touch via [the issue tracker (<VPIcon icon="iconfont icon-github"/>`docker/for-mac`)](https://github.com/docker/for-mac/issues). The [<VPIcon icon="fa-brands fa-docker"/>osxfs documentation](https://docs.docker.com/docker-for-mac/osxfs/#what-you-can-do) outlines the details to provide when reporting a performance issue.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "User-guided caching in  for Mac",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/user-guided-caching-in-docker-for-mac.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
