---
lang: en-US
title: "Image2Docker: A New Tool for Prototyping Windows VM Conversions"
description: "Article(s) > Image2Docker: A New Tool for Prototyping Windows VM Conversions"
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
      content: "Article(s) > Image2Docker: A New Tool for Prototyping Windows VM Conversions"
    - property: og:description
      content: "Image2Docker: A New Tool for Prototyping Windows VM Conversions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/image2docker-prototyping-windows-vm-conversions.html
prev: /devops/docker/articles/README.md
date: 2016-09-29
isOriginal: false
author:
  - name: Mano Marks
    url : https://docker.com/author/mano/
cover: https://docker.com/app/uploads/2022/12/image2docker-prototyping-windows-vm-conversions-1.png
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
  name="Image2Docker: A New Tool for Prototyping Windows VM Conversions"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/image2docker-prototyping-windows-vm-conversions"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2022/12/image2docker-prototyping-windows-vm-conversions-1.png"/>

Docker is a great tool for building, shipping, and running your applications. Many companies are already moving their legacy applications to Docker containers and now with the introduction of the Microsoft Windows Server 2016, Docker Engine can now run containers  natively on Windows.To make it even easier, there’s a new prototyping tool for Windows VMs that shows you how to replicate a VM Image to a container.

Docker Captain [Trevor Sullivan (<FontIcon icon="fa-brands fa-x-twitter"/>`pcgeek86`)](https://x.com/pcgeek86) recently released the Image2Docker tool, an open source project we’re hosting on [GitHub (<FontIcon icon="iconfont icon-github"/>`docker/communitytools-image2docker-win`)](https://github.com/docker/communitytools-image2docker-win). Still in it’s early stages, Image2Docker is a Powershell module that you can point at a virtual hard disk image, scan for common Windows components and suggest a Dockerfile. And to make it even easier, we’re hosting it in the [<FontIcon icon="iconfont icon-powershell"/>Powershell Gallery](https://powershellgallery.com/packages/Image2Docker/) to make it easy to install and use.

In Powershell, just type:

```powershell
Install-Module -Name Image2Docker
```

And you’ll have access to `Get-WindowsArtifacts` and `ConvertTo-Dockerfile`. You can even select which discovery artifacts to search for.

![image2docker prototyping windows vm conversions 1](https://docker.com/app/uploads/2022/12/image2docker-prototyping-windows-vm-conversions-1.png)

Currently Image2Docker supports VHD, VHDK, and WIM images. If you have a VMDK, Microsoft provides a great [<FontIcon icon="fa-brands fa-microsoft"/>conversion tool](https://microsoft.com/en-us/download/details.aspx?id=42497) to convert VMDK images to VHD images.

And as an open source project, lead by a Docker Captain, it’s easy to contribute. We welcome contributions to add more discovery objects and functionality.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Image2Docker: A New Tool for Prototyping Windows VM Conversions",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/image2docker-prototyping-windows-vm-conversions.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
