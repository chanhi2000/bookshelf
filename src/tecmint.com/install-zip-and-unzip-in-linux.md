---
lang: en-US
title: "How to Install Zip and Unzip in Linux"
description: "Article(s) > How to Install Zip and Unzip in Linux"
icon: fa-brands fa-fedora
category:
  - Shell
  - DevOps
  - Linux
  - Fedora
  - Debian
  - Arch Linux
  - OpenSUSE
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
  - devops
  - linux
  - fedora
  - debian
  - arch
  - archlinux
  - arch-linux
  - opensuse
  - open-suse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install Zip and Unzip in Linux"
    - property: og:description
      content: "How to Install Zip and Unzip in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/install-zip-and-unzip-in-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-09-02
isOriginal: false
author:
  - name: James Kiarie
    url : https://tecmint.com/author/james2030kiarie/
cover: https://tecmint.com/wp-content/uploads/2020/05/Install-Zip-in-Linux.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Arch Linux > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/arch-linux/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "OpenSUSE > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/opensuse/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Install Zip and Unzip in Linux"
  desc="In this guide, we focus on how you can install the zip and unzip utilities on various Linux distributions, and walk you through the commands to get started."
  url="https://tecmint.com/install-zip-and-unzip-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2020/05/Install-Zip-in-Linux.png"/>

**Zip** is a command-line utility tool used for [**compressing files and folders**](/tecmint.com/18-tar-command-examples-in-linux.md). Compression of files & folders enables faster and more efficient transfer, storage, and emailing of files and folders. On the other hand, [**`unzip`**](/tecmint.com/unzip-extract-zip-files-to-specific-directory-in-linux.md) is a utility tool that helps you decompress files and folders.

::: info Benefits of zipping files:

- **Save Disk Space** – Compressed/zipped files take up less disk space, leaving you with more space to work with.
- **Faster File Transfers** – Zipped files are easy to transfer, including uploading, downloading, and attaching them to an email.
- **Cross-Platform Support** – You can easily decompress zipped files on Linux, Windows, and even Mac.

:::

In this guide, we focus on how you can install the **zip** and **unzip** ([**archive utilities**](/tecmint.com/command-line-archive-tools-for-linux.md)) on various Linux distributions, and walk you through the commands to get started.

---

## How to Install Zip/Unzip in Debian/Ubuntu/Mint

For [**Debian-based distributions**](/tecmint.com/debian-based-linux-distributions.md), install the **zip** utility by running the command.

```sh
sudo apt install zip
```

After installation, you can confirm the version of the **zip** installed using the command.

```sh
zip -v
```

For the **unzip** utility, execute a similar command as shown.

```sh
sudo apt install unzip
```

Again, just like **zip**, you can confirm the version of the **unzip** utility installed by running.

```sh
unzip -v
```

---

## How to Install Zip/Unzip in RedHat/CentOS/Fedora

Just like on **Debian** distributions, installing **zip** and **unzip** utilities on [**RHEL-based distros**](/tecmint.com/redhat-based-linux-distributions.md) is quite simple.

To install zip, simply execute:

```sh
sudo dnf install zip
```

For the unzip utility, install it by running:

```sh
sudo dnf install unzip
```

---

## How to Install Zip/Unzip in Arch/Manjaro Linux

For Arch-based distros, run:

```sh
sudo pacman -S zip
```

For the unzip utility,

```sh
sudo pacman -S unzip
```

---

## How to Install Zip/Unzip in OpenSUSE

On **OpenSUSE**, run the command below to install **zip**.

```sh
sudo zypper install zip
```

And to install **unzip**, execute.

```sh
sudo zypper install unzip
```

---

## Basic Zip and Unzip Usage

Once installed, you can immediately start compressing and extracting files.

Create a zip archive:

```sh
zip archive.zip file1 file2 file3
```

Extract a zip archive:

```sh
unzip archive.zip
```

List the contents of a zip file without extracting:

```sh
unzip -l archive.zip
```

For more information, read our article that shows [**how to create and extract a zip files**](/tecmint.com/unzip-extract-zip-files-to-specific-directory-in-linux.md) in Linux.

---

## Common Errors and Fixes

Here are some common issues you may run into when using zip/unzip on Linux:

- Error: `zip: command not found` or `unzip: command not found`, which means the utilities are not installed. You need to install them by following the installation steps for your Linux distro above.
- Error: `permission denied` when compressing/extracting, which means you may be trying to zip or unzip files in a directory you don’t have access to. Use sudo or switch to a directory you own.
- Error: `End-of-central-directory signature not found`, which usually happens when the zip file is corrupted or incomplete. Try downloading the file again or ask the sender to re-compress it.

---

## Conclusion

For newer versions of Linux distros such as **Ubuntu** and **RHEL**, the **zip** and **unzip** utilities already come pre-installed, and you are good to go.

We covered how to install **zip** and **unzip** command-line tools on various Linux distributions, how to check if they are installed, and some basic commands to use them. With these utilities, compressing and extracting files becomes simple, fast, and cross-platform.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install Zip and Unzip in Linux",
  "desc": "In this guide, we focus on how you can install the zip and unzip utilities on various Linux distributions, and walk you through the commands to get started.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/install-zip-and-unzip-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
