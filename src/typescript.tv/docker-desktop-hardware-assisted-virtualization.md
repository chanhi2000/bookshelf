---
lang: en-US
title: "Docker Desktop: Hardware assisted virtualization"
description: "Article(s) > Docker Desktop: Hardware assisted virtualization"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Windows
  - Article(s)
tag:
  - blog
  - typescript.tv
  - devops
  - docker
  - windows
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker Desktop: Hardware assisted virtualization"
    - property: og:description
      content: "Docker Desktop: Hardware assisted virtualization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/docker-desktop-hardware-assisted-virtualization.html
prev: /devops/docker/articles/README.md
date: 2021-01-13
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
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
  name="Docker Desktop: Hardware assisted virtualization"
  desc="Docker containers make it easier to set up applications by providing pre-configured images in a virtual environment. To use virtualization extensions on your CPU, like Intel's VT-x or AMD's SVM, you need to enable them in your BIOS or UEFI settings."
  url="https://typescript.tv/hands-on/docker-desktop-hardware-assisted-virtualization"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Docker containers make it easier to set up applications by providing pre-configured images in a virtual environment. To use virtualization extensions on your CPU, like Intel's VT-x or AMD's SVM, you need to enable them in your BIOS or UEFI settings.

There are TypeScript projects, such as [@nestjsx/crud (<VPIcon icon="iconfont icon-github"/>`nestjsx/crud`)](https://github.com/nestjsx/crud), which use Docker container images. Docker containers simplify application setups (like databases, caches, etc.) by providing pre-configured images in a virtual environment. Virtualization takes a lot of computing power and can be accelerated by hardware-assisted virtualization.

---

## Enable Hardware assisted virtualization

Intel and AMD have added virtualization extensions to their CPU line-up. According to the CPU used, the virtualization features are named differently: **Intel calls it VT-x** (Virtualization Technology) and **AMD names it SVM** (Secure Virtual Machine).

To make use of the virtualization extensions of your CPU, you have to enable these in the BIOS or UEFI of your motherboard and in the settings of your operating system. Docker Desktop will report the following error, if you don't enable the virtualization features:

> **An error occurred** Hardware assisted virtualization and data execution protection must be enabled in the BIOS.

![Docker Desktop: Hardware assisted virtualization must be enabled](https://typescript.tv/images/docker-desktop-hardware-assisted-virtualization/docker-desktop-hardware-assisted-virtualization-must-be-enabled.png)

### Enable AMD Secure Virtual Machine (SVM)

When you have an AMD processor with Zen 2 architecture (i.e. AMD Ryzen 7 3700X), then you can enable SVM on an AMD X570 chipset motherboard (i.e. MSI MEG X570 Unify) the following way:

1. Turn off your computer
2. Turn on your computer and when the startup screen appears, press the "<kbd>Del</kbd>" (Delete) key
3. Press <kbd>F7</kbd> to switch into the "**Advanced Mode**" of "MSI Click Bios 5"
4. Select the "**OC**" (Overclocking) settings
5. Select "**CPU Features**"
6. Switch "**SVM Mode**" to "Enabled"
7. Exit the BIOS and save your settings

![MSI BIOS: AMD SVM Mode](https://typescript.tv/images/docker-desktop-hardware-assisted-virtualization/msi-bios-cpu-features-amd-svm-mode.png)

### Enable Microsoft Hyper-V

After enabling hardware-assisted virtualization, you need to activate **Hyper-V** when using Microsoft Windows (i.e. Microsoft Windows 10 Professional). The Microsoft Hyper-V feature can be activated in the "Control panel" by selecting "Turn Windows features on or off":

![Turn on Hyper-V in Windows 10 Pro](https://typescript.tv/images/docker-desktop-hardware-assisted-virtualization/turn-windows-features-on-or-off-hyper-v.png)

---

## Run Linux

Once Hyper-V is enabled, you can easily run Linux distributions on Windows using the [<VPIcon icon="iconfont icon-wsl"/>Windows Subsystem for Linux](https://docs.microsoft.com/windows/wsl/) (WSL 2):

<VidStack src="youtube/bRW5r7TK6KM" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker Desktop: Hardware assisted virtualization",
  "desc": "Docker containers make it easier to set up applications by providing pre-configured images in a virtual environment. To use virtualization extensions on your CPU, like Intel's VT-x or AMD's SVM, you need to enable them in your BIOS or UEFI settings.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/docker-desktop-hardware-assisted-virtualization.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
