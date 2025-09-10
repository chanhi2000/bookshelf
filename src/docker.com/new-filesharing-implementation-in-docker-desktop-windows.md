---
lang: en-US
title: "New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker"
description: "Article(s) > New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Windows
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - win
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker"
    - property: og:description
      content: "New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/new-filesharing-implementation-in-docker-desktop-windows.html
prev: /devops/docker/articles/README.md
date: 2019-12-12
isOriginal: false
author:
  - name: David Scott
    url : https://docker.com/author/dscott/
cover: https://docker.com/app/uploads/2019/12/helloquence-5fNmWej4tAA-unsplash-1110x741.jpg
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
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker"
  desc="The latest Edge release of Docker Desktop for Windows 2.1.7.0 has a completely new filesharing implementation using Filesystem in Userspace (FUSE) instead of Samba."
  url="https://docker.com/blog/new-filesharing-implementation-in-docker-desktop-windows"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2019/12/helloquence-5fNmWej4tAA-unsplash-1110x741.jpg"/>

A common developer workflow when using frameworks like Symfony or React is to edit the source code using a Windows IDE while running the app itself in a Docker container. The source is shared between the host and the container with a command like the following:

```sh
docker run -v C:\Users\me:/code -p 8080:8080 my-symfony-app
```

This allows the developer to edit the source code, save the changes and immediately see the results in their browser. This is where file sharing performance becomes critical.

The latest [<VPIcon icon="fa-brands fa-docker"/>Edge release of Docker Desktop for Windows 2.1.7.0](https://docs.docker.com/docker-for-windows/edge-release-notes/#docker-desktop-community-2170) has **a completely new filesharing implementation** using [<VPIcon icon="fa-brands fa-wikipedia-w"/>Filesystem in Userspace (FUSE)](https://en.wikipedia.org/wiki/Filesystem_in_Userspace) instead of Samba which:

- uses caching to (for example) reduce page load time in Symfony by up to 60%;
- supports Linux inotify events, triggering automatic recompilation / reload when the source code is changed;
- is independent of how you authenticate to Windows: smartcard, Azure AD are all fine;
- always works irrespective of whether your VPN is connected or disconnected;
- reduces the amount of code running as Administrator.

::: info Your feedback needed!

This improvement is available today in the [<VPIcon icon="fa-brands fa-docker"/>Edge 2.1.7.0 release](https://docs.docker.com/docker-for-windows/edge-release-notes/#docker-desktop-community-2170) and will roll-out to the stable channel later once we’ve had enough positive feedback. Please download it, give it a try and let us know how it goes.  If you discover any problems, please report them on [GitHub (<VPIcon icon="iconfont icon-github"/>`docker/for-win`)](https://github.com/docker/for-win) and make sure you fill descriptions and reproduction steps so that we can quickly investigate.

[<VPIcon icon="fas fa-download"/>DOWNLOAD](https://download.docker.com/win/edge/41561/Docker%20Desktop%20Installer.exe)

:::

---

## Big performance improvements

Performance is vital when application source code is being shared between the host and a container. For example when a developer uses the [<VPIcon icon="fas fa-globe"/>Symfony PHP framework](https://symfony.com/), edits the source code and then reloads the page in the browser, the web-server in the container must re-read many PHP files stored on the host. This must be fast.

The following graph shows the time taken to load a page of a [simple symfony demo (<VPIcon icon="iconfont icon-github"/>`djs55/symfony-demo`)](https://github.com/djs55/symfony-demo) in three configurations:

1. **Previous version**: this is the implementation in earlier versions of Docker Desktop
2. **Docker Desktop Edge 2.1.7.0**: this is the new (faster!) implementation
3. **In-container**: the files are not shared from the host at all, instead they are stored in the container to show the upper limit on possible future performance.

![imageLikeEmbed](https://docker.com/app/uploads/2019/12/imageLikeEmbed.png?fit=1110%2C686&ssl=1)

The two bars on the left hand side show the latency (in seconds) using an older version of Docker Desktop. Note that the second fetch is only slightly better than the first, suggesting that the effect of caching is small.

The two bars on the right hand side show the latency when the files are not shared at all, but are stored entirely inside the VM. This is the upper limit on performance if the volume sharing system were perfect and had zero overheads.

The two bars in the middle show the latency when the files are shared with the new system in Docker Desktop Edge 2.1.7.0. The initial (uncached) fetch is already better than with the previous Desktop version, but the second (cached) fetch is **60% faster!**

---

## Additional enhancements

As well as big performance improvements, the new implementation has the following additional benefits:

- The new version **can’t conflict with organisation-wide security policies** as we don’t need to use Administrator privileges to share the drive and create a firewall exception for port 445.
- The new version **doesn’t require the user to enter their domain credentials**. Not only is this fundamentally more secure, but it avoids the user having to re-enter their credentials every time they change their password. Many organisations require regular password changes, which means the user needed to refresh the credentials frequently.
- The new version supports users who **authenticate via a smartcard**, or AzureAD or any other method. Previously we could only support users who login with a username and password.
- The new version is **immune to a class of problems caused by enterprise VPN clients and endpoint security software** clashing with the Hyper-V network adapter.

Stay tuned for a follow up post that deep dives into the new Docker Desktop filesharing implementation using FUSE.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "New Filesharing Implementation in Docker Desktop Windows Improves Developer Inner Loop UXDocker",
  "desc": "The latest Edge release of Docker Desktop for Windows 2.1.7.0 has a completely new filesharing implementation using Filesystem in Userspace (FUSE) instead of Samba.",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/new-filesharing-implementation-in-docker-desktop-windows.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
