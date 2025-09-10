---
lang: en-US
title: "Parrot OS: Security-Focused Linux Distro for Security and Privacy"
description: "Article(s) > Parrot OS: Security-Focused Linux Distro for Security and Privacy"
icon: iconfont icon-parrotsecurity
category: 
  - Shell
  - Linux
  - Debian
  - Parrot OS
  - Article(s)
tag: 
  - blog
  - tecmint.com
  - sh
  - shell
  - linux
  - debian
  - parrot
  - parrot-os
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Parrot OS: Security-Focused Linux Distro for Security and Privacy"
    - property: og:description
      content: "Parrot OS: Security-Focused Linux Distro for Security and Privacy"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/parrot-os-security-linux.html
prev: /devops/linux-debian/articles/README.md
date: 2024-10-25
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2016/07/Parrot-Security-OS-Installation.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debain > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Parrot OS: Security-Focused Linux Distro for Security and Privacy"
  desc="ParrotOS is a free and open-source Debian-based Linux distribution, which is designed for security experts, developers, and people who care about privacy."
  url="https://tecmint.com/parrot-os-security-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2016/07/Parrot-Security-OS-Installation.png"/>

**Parrot Security** (**ParrotOS**, **Parrot**) is a free and open-source [**Debian-based Linux distribution**](/tecmint.com/debian-based-linux-distributions.md), which is designed for security experts, developers, and people who care about privacy.

It comes with a complete [**set of tools for IT security**](/tecmint.com/security-features-tools-linux-admins.md), digital forensics, and everything that you need to develop your own programs or [**protect your privacy online**](/tecmint.com/best-vpn-services/).

**Parrot OS** is available in three main editions: **Security**, **Home**, and **HTB** (**Hack The Box**). You can also use it as a Virtual Machine (with [**Virtual Box**](/tecmint.com/install-virtualbox-on-redhat-centos-fedora.md), **Parallels**, and [**VMware**](/tecmint.com/install-vmware-workstation-in-linux.md)), on a **Raspberry Pi**, or with **Docker**.

The default desktop environment is **MATE**, but you can install [**other desktop environments**](/tecmint.com/top-best-linux-lightweight-desktop-environments.md) if you prefer.

---

## Choosing the Right Edition: Security, Home, or HTB

It comes in various editions, including **Security**, **Home**, and **HTB (Hack The Box)** editions, and each edition caters to different needs:

- **Security Edition**: Includes advanced tools for penetration testing and security assessments.
- **Home Edition**: Designed for everyday use with a focus on privacy and productivity.
- **HTB Edition**: Tailored for Hack The Box enthusiasts with additional hacking tools and resources.

---

## System Requirements

freestar.config.enabled_slots.push({ placementName: "tecmint_incontent", slotId: "tecmint_incontent" });

Before you begin the **ParrotOS** installation, ensure that your system meets the following minimum requirements:

- Processor: 64-bit processor
- **RAM**: At least 2 GB (4 GB recommended).
- **Storage**: Minimum of 20 GB of free disk space (40 GB or more recommended).
- **Graphics**: A graphics card capable of 1024×768 resolution.
- **USB Drive**: For installation media.

This guide will help you install **ParrotOS Home Edition** (the latest version - **Parrot OS 6.2**) on your computer step-by-step through the default official installer: **Calamares**.

---

## Downloading Parrot OS

Go to the [<VPIcon icon="iconfont icon-parrotsecurity"/>Parrot OS download page](https://parrotsec.org/download/), choose the edition you want to download (**Security**, **Home,** or **HTB**), and click on the download link to download the ISO file.

![Download Parrot OS](https://tecmint.com/wp-content/uploads/2016/07/Download-Parrot-OS.webp)

Once the ISO file is downloaded, you can verify the integrity of the downloaded ISO file using the **checksums** provided on the download page.

```sh
sha256sum Parrot-home-6.2_amd64.iso
```

---

## Creating Parrot OS Bootable Media

After downloading the ISO image, insert your USB stick into your computer and create a bootable image using the [**USB creation tool**](/tecmint.com/linux-bootable-usb-creators.md) or use a tool like the [**`dd` command**](/tecmint.com/dd-command-examples.md) as shown.

```sh
sudo dd if=Parrot-home-6.2_amd64.iso of=/dev/sdX bs=4M status=progress && sync
```

Replace <VPIcon icon="fas fa-folder-open"/>`/dev/sdX` with the path of your USB drive (like <VPIcon icon="fas fa-folder-open"/>`/dev/sdb`). If you’re unsure, you can use the [**`lsblk` command**](/tecmint.com/commands-to-collect-system-and-hardware-information-in-linux.md) to list all drives and partitions connected to your Linux computer.

---

## Installing Parrot OS

Since you’ve made a bootable USB drive, you need to start your computer from it. To do this, restart your computer and press <kbd>F2</kbd>, <kbd>F12</kbd>, or the <kbd>Del</kbd> key (depending on your computer). Then choose the **USB Drive** as the device to start from.

After booting from the USB drive, start the installation by selecting the “**Try/Install**” option.

![Parrot Install Option](https://tecmint.com/wp-content/uploads/2024/08/Parrot-Install-Option.png)

Once the OS loads, you’ll see a live preview of **Parrot OS**. You can explore and test everything in this preview. When you’re ready to install, just click the ‘**Install Parrot**‘ button.

![ParrotOS Live Preview](https://tecmint.com/wp-content/uploads/2024/08/ParrotOS-Live-Preview.webp)

Next, select your preferred system language and click **Next** to continue.

![Parrot OS Language](https://tecmint.com/wp-content/uploads/2024/08/Parrot-OS-Language.webp)

Then select your **Region** and **Zone**.

![ParrotOS Region and Zone](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Region.webp)

Now, you can choose your keyboard layout based on your preferences.

![ParrotOS Keyboard](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Keyboard.webp)

Choose the disk where you want to install **Parrot OS**. You can either use the **entire disk** or create a **custom manual partition** scheme.

![ParrotOS Disk](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Disk.webp)

Here, I’m choosing the ‘**Erase disk**’ option with swap, which will automatically set up the partitions for me.

![ParrotOS Erase Disk](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Erase-Disk.webp)

Next, create a user account, which will be used for logging into Parrot OS.

![ParrotOS User](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-User.webp)

Finally, a summary of the choices made during the procedure.

![ParrotOS Install Summary](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Install-Summary.webp)

Next, review your partition setup and apply the changes, the installer will format the disk and create the necessary partitions by clicking **Install now** button.

![ParrotOS Disk Changes](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Disk-Changes.webp)

The installer will now copy files and install the base system, it will take some time, depending on your hardware and internet speed.

![ParrotOS Installation](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Installation.webp)

Once the installation is complete, the installer will prompt you to reboot your computer.

![ParrotOS Installation Finished](https://tecmint.com/wp-content/uploads/2016/07/ParrotOS-Installation.Finished.webp)

Your computer should now boot into **Parrot OS**. Log in with the user account you created during installation.

![Parrot OS Login](https://tecmint.com/wp-content/uploads/2024/10/Parrot-OS-Login.webp)

![Parrot OS Desktop](https://tecmint.com/wp-content/uploads/2024/10/Parrot-OS-Desktop.webp)

---

## Conclusion

Congratulations! You have successfully installed Parrot OS on your computer, which is a powerful operating system used for ethical hacking, security testing, or general computing tasks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Parrot OS: Security-Focused Linux Distro for Security and Privacy",
  "desc": "ParrotOS is a free and open-source Debian-based Linux distribution, which is designed for security experts, developers, and people who care about privacy.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/parrot-os-security-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
