---
lang: en-US
title: "6 Best Tools to Find and Remove Duplicate Files in Linux"
description: "Article(s) > 6 Best Tools to Find and Remove Duplicate Files in Linux"
icon: iconfont icon-shell
category:
  - Shell
  - rdfine
  - fdupes
  - jdupes
  - rmlint
  - DevOps
  - Linux
  - Debian
  - Fedora
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
  - rdfine
  - fdupes
  - jdupes
  - rmlint
  - devops
  - linux
  - debian
  - ubuntu
  - linuxmint
  - linux-mint
  - fedora
  - redhat
  - centos
  - rockylinux
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 6 Best Tools to Find and Remove Duplicate Files in Linux"
    - property: og:description
      content: "6 Best Tools to Find and Remove Duplicate Files in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/find-and-delete-duplicate-files-in-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-10-01
isOriginal: false
author:
  - name: Marin Todorov
    url : https://tecmint.com/author/marintodorov89/
cover: https://tecmint.com/wp-content/uploads/2018/10/Find-and-Delete-Duplicate-Files-in-Linux.png
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
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="6 Best Tools to Find and Remove Duplicate Files in Linux"
  desc="Learn how to find and delete duplicate files in Linux using rdfind, fdupes, and rmlint command line tools, as well as using GUI tools DupeGuru and Czkawka."
  url="https://tecmint.com/find-and-delete-duplicate-files-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2018/10/Find-and-Delete-Duplicate-Files-in-Linux.png"/>

Organizing your home directory or even system can be particularly hard if you have the habit of downloading all kinds of stuff from the internet using your [**download managers**](/tecmint.com/download-managers-for-linux.md).

Often you may find you have downloaded the same mp3, pdf, and epub (and all kinds of [**other file extensions**](/tecmint.com/find-file-types-in-linux.md)) and [**copied it to different directories**](/tecmint.com/cp-command-examples.md). This may cause your directories to become cluttered with all kinds of useless duplicated stuff.

In this tutorial, you are going to learn how to find and delete duplicate files in Linux using **rdfind**, **fdupes,** and **rmlint** command-line tools, as well as using GUI tools called **DupeGuru** and [**FSlint**](/tecmint.com/fslint-find-and-remove-duplicate-unwanted-files-in-linux.md).

A note of caution – always be careful what you delete on your system as this may lead to unwanted data loss. If you are using a new tool, first try it in a [**test directory where deleting files**](/tecmint.com/remove-directory-linux.md) will not be a problem.

---

## 1. Rdfind – Find Duplicate Files in Linux

[<VPIcon icon="iconfont icon-github"/>`pauldreik/rdfind`](https://github.com/pauldreik/rdfind) comes from redundant data find, which is a free command-line tool used to find duplicate files across or within multiple directories. It recursively scans directories and identifies files that have identical content, allowing you to take appropriate actions such as deleting or moving the duplicates.

**Rdfind** uses an algorithm to classify the files and detects which of the duplicates is the original file and considers the rest as duplicates.

The rules of ranking are:

- If **A** was found while scanning an input argument earlier than **B**, **A** is higher ranked.
- If **A** was found at a depth lower than **B**, **A** is higher ranked.
- If **A** was found earlier than **B**, **A** is higher ranked.

The last rule is used particularly when two files are found in the same directory.

### Install Rdfind on Linux

To install **rdfind** in Linux, use the following command as per your Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install rdfind
```

@tab <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install rdfind
```

@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/rdfind 
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add rdfind
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S rdfind
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install rdfind
```

:::

To run **rdfind** on a directory simply type **rdfind** and the target directory.

```sh
rdfind /home/user
```

![Find Duplicate Files in Linux](https://tecmint.com/wp-content/uploads/2018/10/Find-Duplicate-Files-in-Linux.png)

As you can see **rdfind** will save the results in a file called **results.txt** located in the same directory from where you ran the program. The file contains all the duplicate files that rdfind has found. You can review the file and remove the duplicate files manually if you want to.

Another thing you can do is to use the `-dryrun` an option that will provide a list of duplicates without taking any actions:

```sh
rdfind -dryrun true /home/user
```

When you find the duplicates, you can choose to replace them with hard links.

```sh
rdfind -makehardlinks true /home/user
```

And if you wish to delete the duplicates you can run.

```sh
rdfind -deleteduplicates true /home/user
```

To check other useful options of **rdfind** you can use the **rdfind** manual.

```sh
man rdfind 
```

---

## 2. Fdupes – Scan for Duplicate Files in Linux

[**Fdupes**](/tecmint.com/fdupes-find-and-delete-duplicate-files-in-linux.md) is another command-line program that allows you to identify duplicate files on your system. It searches directories recursively, comparing file sizes and content to identify duplicates.

It uses the following methods to determine duplicate files:

- Comparing partial md5sum signatures
- Comparing full md5sum signatures
- byte-by-byte comparison verification

Just like **rdfind,** it has similar options:

- Search recursively
- Exclude empty files
- Shows the size of duplicate files
- Delete duplicates immediately
- Exclude files with a different owner

### Install Fdupes in Linux

To install **fdupes** in Linux, use the following command as per your Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install fdupes
```

@tab <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install fdupes
```

@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/fdupes 
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add fdupes
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S fdupes
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install fdupes
```

:::

**Fdupes** syntax is similar to `rdfind`. Simply type the command followed by the directory you wish to scan.

```sh
fdupes <dir>
```

To search files recursively, you will have to specify the `-r` an option like this.

```sh
fdupes -r <dir>
```

You can also specify multiple directories and specify a **dir** to be searched recursively.

```sh
fdupes <dir1> -r <dir2>
```

To have fdupes calculate the size of the duplicate files use the `-S` option.

```sh
fdupes -S <dir>
```

To gather summarized information about the found files use the `-m` option.

```sh
fdupes -m <dir>
```

![Scan Duplicate Files in Linux](https://tecmint.com/wp-content/uploads/2018/10/Scan-Duplicate-Files-in-Linux.png)

Finally, if you want to delete all duplicates use the `-d` an option like this.

```sh
fdupes -d <dir>
```

**Fdupes** will ask which of the found files to delete. You will need to enter the file number:

![Delete Duplicate Files in Linux](https://tecmint.com/wp-content/uploads/2018/10/Delete-Duplicate-Files-in-Linux.png)

A solution that is definitely not recommended is to use the `-N` option which will result in preserving the first file only.

```sh
fdupes -dN <dir>
```

To get a list of available options to use with `fdupes` review the help page by running.

```sh
fdupes -help
```

---

## 3. Jdupes – Improved Fork of Fdupes

[<VPIcon icon="iconfont icon-codeberg"/>`jdupes`](https://codeberg.org/jbruchon/jdupes "jdupes - duplicate file finder") is a more modern fork of the classic `fdupes`, but it is much faster, actively maintained, and adds many features that `fdupes` doesn’t have.

Like `fdupes`, it finds duplicate files by comparing file contents, but it’s optimized for large datasets and heavy use cases.

::: important Key improvements over `fdupes`

- Much faster scanning on large directories (thanks to better algorithms and parallelization).
- Can replace duplicates with hard links to save space.
- Option to create symbolic links instead of deleting.
- More detailed output and advanced scripting options.
- Safer deletion options with interactive prompts.

:::

### Install Jdupes on Linux

To install `jdupes` in Linux, use the following command as per your Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install jdupes
```

@tab <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install jdupes
```

<!--
@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/fdupes 
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add fdupes
```
-->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S jdupes
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install jdupes
```

:::

::: tip Usage examples:

```sh
jdupes <dir>             # scan a directory  
jdupes -r <dir>          # recursive scan  
jdupes -d <dir>          # delete duplicates interactively  
jdupes -L <dir>          # replace duplicates with hardlinks  
jdupes -s <dir>          # replace with symlinks  
```

Check more options with:

```sh
jdupes --help
```

---

## 4. Rmlint – Remove Duplicate Files

[<VPIcon icon="iconfont icon-github"/>`sahib/rmlint`](https://github.com/sahib/rmlint) is a command-line tool that is used for finding and removing duplicate and lint-like files in Linux systems. It helps identify files with identical content, as well as various forms of redundancy or lint, such as empty files, broken symbolic links, and orphaned files.

### Install Rmlint on Linux

To install **Rmlint** in Linux, use the following command as per your Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install rmlint
```

@tab <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install rmlint
```

@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/rmlint 
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add rmlint
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S rmlint
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install rmlint
```

:::

![Rmlint - Remove Duplicate Files](https://tecmint.com/wp-content/uploads/2018/11/Rmlint-Remove-Duplicate-Files.png)

---

## 5. dupeGuru – Find Duplicate Files in a Linux

[<VPIcon icon="fas fa-globe"/>dupeGuru](https://dupeguru.voltaicideas.net/) is an open-source and cross-platform tool that can be used to find duplicate files in a Linux system. The tool can either scan filenames or content in one or more folders. It also allows you to find the filename that is similar to the files you are searching for.

**dupeGuru** comes in different versions for Windows, Mac, and Linux platforms. Its quick fuzzy matching algorithm feature helps you to find duplicate files within a minute. It is customizable, you can pull the exact duplicate files you want to, and Wipeout unwanted files from the system.

### Install dupeGuru on Linux

To install **dupeGuru** in Linux, use the following command as per your Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install dupeguru
```

@tab <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install dupeguru
```

@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/dupeguru 
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add dupeguru
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S dupeguru
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install dupeguru
```

:::

![DupeGuru - Find Duplicate Files in Linux](https://tecmint.com/wp-content/uploads/2018/11/DupeGuru-Find-Duplicate-Files-in-Linux.png)

---

## 6. Czkawka – Modern Duplicate & File Cleanup Tool for Linux

[<VPIcon icon="iconfont icon-github"/>`qarmin/czkawka`](https://github.com/qarmin/czkawka) (pronounced “**ch-kav-ka**” – means “**hiccup**” in Polish) is a free, open-source utility built in Rust, that helps you find and remove unnecessary files from your system. It’s designed to be a fast, safe, and lightweight alternative to older tools like **FSlint**.

With **Czkawka**, you can detect duplicate files, empty folders, temporary files, broken symbolic links, and even large unused files. It provides both a command-line interface and a graphical interface for ease of use.

::: warning

snap version of this app is no longer maintained, you can use other package formats like **flatpak** or prebuilt binaries from [official github project (<VPIcon icon="iconfont icon-github"/>`qarmin/czkawka`)](https://github.com/qarmin/czkawka/releases).

:::

**Czkawka** isn’t included in most Linux repositories, but you can install it easily using [**Flatpak**](/tecmint.com/install-flatpak-on-linux.md) or [**Snap**](/tecmint.com/install-snap-in-linux.md):

::: code-tabs#sh

@tab:active Install vi Flatpack (recommended)

```sh
flatpak install flathub com.github.qarmin.czkawka
```

@tab Install via Snap

```sh
sudo snap install czkawka
```

:::

Once installed, you can launch it from your application menu (for the GUI) or run it from the terminal using `czkawka_cli`.

```sh
czkawka_cli
```

![Czkawka – Modern Duplicate & File Cleanup Tool](https://tecmint.com/wp-content/uploads/2023/06/Czkawka-Modern-Duplicate-File-Cleanup-Tool.webp)

---

## Conclusion

These are very useful tools to find duplicated files on your Linux system, but you should be very careful when deleting such files.

If you are unsure if you need a file or not, it would be better to create a backup of that file and remember its directory prior to deleting it. If you have any questions or comments, please submit them in the comment section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "6 Best Tools to Find and Remove Duplicate Files in Linux",
  "desc": "Learn how to find and delete duplicate files in Linux using rdfind, fdupes, and rmlint command line tools, as well as using GUI tools DupeGuru and Czkawka.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/find-and-delete-duplicate-files-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
