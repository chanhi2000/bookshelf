---
lang: en-US
title: "Deep Dive Into the New Docker Desktop filesharing Implementation Using FUSEDocker"
description: "Article(s) > Deep Dive Into the New Docker Desktop filesharing Implementation Using FUSEDocker"
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
      content: "Article(s) > Deep Dive Into the New Docker Desktop filesharing Implementation Using FUSEDocker"
    - property: og:description
      content: "Deep Dive Into the New Docker Desktop filesharing Implementation Using FUSEDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/deep-dive-into-new-docker-desktop-filesharing-implementation.html
prev: /devops/docker/articles/README.md
date: 2019-12-17
isOriginal: false
author:
  - name: David Scott
    url : https://docker.com/author/dscott/
cover: https://docker.com/app/uploads/2020/01/shane-aldendorff-mQHEgroKw2k-unsplash-scaled.jpg
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
  name="Deep Dive Into the New Docker Desktop filesharing Implementation Using FUSEDocker"
  desc="The latest Edge release of Docker Desktop for Windows 2.1.7.0 has a completely new filesharing system using FUSE instead of Samba. Part 1 in the series presented the performance improvements and explains how to give feedback. Part 2 gives more insight about the new architecture."
  url="https://docker.com/blog/deep-dive-into-new-docker-desktop-filesharing-implementation"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2020/01/shane-aldendorff-mQHEgroKw2k-unsplash-scaled.jpg"/>

![Photo by [<VPIcon icon="fas fa-globe"/>Shane Aldendorff](https://unsplash.com/@pluyar) on [<VPIcon icon="fas fa-globe"/>Unsplash](https://unsplash.com/s/photos/gear)](https://docker.com/app/uploads/2020/01/shane-aldendorff-mQHEgroKw2k-unsplash-scaled.jpg?fit=1110%2C740&ssl=1)

The latest [<VPIcon icon="fa-brands fa-docker"/>Edge release of Docker Desktop for Windows 2.1.7.0](https://docs.docker.com/docker-for-windows/edge-release-notes/#docker-desktop-community-2170) has a completely new filesharing system using FUSE instead of Samba. The [<VPIcon icon="fa-brands fa-docker"/>initial blog post](https://docker.com/blog/new-filesharing-implementation-in-docker-desktop-windows/) we released presents the performance improvements of this new implementation and explains how to give feedback. Please try it out and let us know what you think. Now, we are going to go into details to give you more insight about the new architecture.

---

## New Architecture

Instead of Samba running over a Hyper-V virtual network, the new system uses a Filesystem in Userspace (FUSE) server running over gRPC over Hypervisor sockets.

The following diagram shows the path taken by a single request from a container, for example to read a PHP file:

![new windows filesharing dd 01](https://docker.com/app/uploads/2019/12/new_windows_filesharing_dd_01.png?fit=1110%2C599&ssl=1)

In step (1) the web-server in the container calls “read” which is a Linux system call handled by the kernel’s Virtual File System (VFS) layer. The VFS is modular and supports many different filesystem implementations. In our case we use Filesystem in Userspace (FUSE) which sends the request to a helper process running inside the VM labelled “FUSE client.” This process runs within the same namespace as the Docker engine. The FUSE client can handle some requests locally, but when it needs to access the host filesystem it connects to the host via “Hypervisor sockets.”

### Hypervisor Sockets

Hypervisor sockets are a shared-memory communication mechanism which enables VMs to communicate with each other and with the host. Hypervisor sockets have a number of advantages over using regular virtual networking, including:

1. since the traffic does not flow over a virtual ethernet/IP network, it is not affected by firewall policies
2. since the traffic is not routed like IP, it cannot be mis-routed by VPN clients
3. since the traffic uses shared memory, it can never leave the machine so we don’t have to worry about third parties intercepting it

Docker Desktop already uses these sockets to forward the Docker API, to forward container ports, and now we use them for filesharing on Windows too!

Returning to the diagram, the FUSE client creates sockets using the AF_VSOCK address family, see step (3). The kernel contains a number of low-level transports, one per hypervisor. Since the underlying hypervisor is Hyper-V, we use the VMBus transport. In step (4) filesystem requests are written into the shared memory and read by the VMBus implementation in the Windows kernel. A FUSE server userspace process running in Windows reads the filesystem request over an AF_HYPERV socket in step (5).

### FUSE Server

The request to open/close/read/write etc is received by the FUSE server, which is running as a regular Windows process. Finally in step (6) the FUSE server uses the Windows APIs to perform the read or write and then returns the result to the caller.  

The FUSE server runs as the user who is running the Docker app, so it only has access to the user’s files and folders. There is no possibility of the VM gaining access to any other files, as could happen in the previous design if a local admin account is used to mount the drive in the VM.

### Event Injection

When files are modified in Linux, the kernel generates inotify events. Interested applications can watch for these events and take action. For example, a React app run with

```sh
npm start
```

will watch for inotify events and automatically recompile when code changes and trigger the browser to refresh automatically, as shown in [<VPIcon icon="fa-brands fa-youtube"/>this video](https://youtu.be/UIJaRp8ESDU). In previous versions of Docker Desktop on Windows we weren’t able to generate inotify events so these styles of development simply wouldn’t work.

<VidStack src="youtube/UIJaRp8ESDU" />

Injecting inotify events is quite tricky. Normally a Linux VFS implementation like FUSE wouldn’t generate the events itself; instead the common code in the higher layer generates events as a side-effect of performing actions. For example when the VFS “unlink” is called and returns successfully then the “unlink” event will be generated. So when the user calls “unlink” under Windows, how does Linux find out about it?

Docker Desktop watches for events on the host when the user runs `docker run -v`. When an “unlink” event is received on the host, a request to “please inject unlink” is forwarded over gRPC to the Linux VM. The following diagram shows the sequence of operations:

![new windows filesharing dd 02](https://docker.com/app/uploads/2019/12/new_windows_filesharing_dd_02.png?fit=1110%2C954&ssl=1)

A thread with a well-known pid inside the FUSE client in Linux “replays” the request by calling “unlink,” even though the directory has actually already been removed. The FUSE client intercepts requests from this well-known pid and pretends that the unlink hasn’t happened yet. For example, when FUSE_GETATTR is called, the FUSE client will say, “yes the directory is still here” (instead of ENOENT). When the FUSE_UNLINK is called, the FUSE client will say, “yes that worked” (instead of ENOENT). As a result of the successful FUSE_UNLINK the Linux kernel generates the inotify event.

---

## Caching

As you can see from the architecture diagram above, each I/O request has to make several user/kernel transitions and VM/host transitions to complete. This means the latency of a filesystem operation is much higher than the case when all the files are local in the VM. We have mitigated this with aggressive use of kernel caching, so many requests can be avoided altogether. We:

1. use the file attribute cache which minimises FUSE_GETATTR requests
2. set `FOPEN_CACHE_DIR` which caches directory contents in the kernel page cache
3. set `FOPEN_KEEP_CACHE` which caches file contents
4. we set `CAP_MAX_PAGES` to increase the maximum request size
5. We use a modern 4.19 series kernel with the [latest FUSE patches backported (<VPIcon icon="iconfont icon-github"/>`djs55/linux`)](https://github.com/djs55/linux/tree/v4.19.76-linuxkit-fuse)

Since we have enabled so many caches we have to carefully handle cache invalidation. When a user runs `docker run -v` and we are monitoring the filesystem events for inotify event injection, we also use these events to invalidate cache entries. When the `docker run -v` exits and the watches are disabled we invalidate all the cache entries.

---

## Future Evolution

We have lots of ideas to improve the performance further by even more aggressive use of caching. For example, in the Symfony benchmark above, the majority of the remaining FUSE calls in the cached case are calls to open and close file handles; even though the file contents is itself cached (and hasn’t changed). We may be able to make these open and close calls lazy and only call them when needed.

The new filesystem implementation is not relevant on WSL 2 (currently available on early Windows Insider builds), since that already has a native filesharing mode which uses 9P. Of course we will keep benchmarking, optimising and incorporating user feedback to always use the best available filesharing implementation across all OS versions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Deep Dive Into the New Docker Desktop filesharing Implementation Using FUSEDocker",
  "desc": "The latest Edge release of Docker Desktop for Windows 2.1.7.0 has a completely new filesharing system using FUSE instead of Samba. Part 1 in the series presented the performance improvements and explains how to give feedback. Part 2 gives more insight about the new architecture.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/deep-dive-into-new-docker-desktop-filesharing-implementation.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
