---
lang: en-US
title: "How to Sync New and Changed Files Using ‘rsync’ Command"
description: "Article(s) > How to Sync New and Changed Files Using ‘rsync’ Command"
icon: iconfont icon-shell
category:
  - Linux
  - Shell
  - Article(s)
tag: 
  - blog
  - tecmint.com
  - linux
  - sh
  - shell
  - rsync
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Sync New and Changed Files Using ‘rsync’ Command"
    - property: og:description
      content: "How to Sync New and Changed Files Using ‘rsync’ Command"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/sync-new-changed-modified-files-rsync-linux.html
prev: /programming/sh/articles/README.md
date: 2024-08-08
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2016/08/Sync-New-Changed-Files-Rsync.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Sync New and Changed Files Using ‘rsync’ Command"
  desc="In this article, we shall examine how rsync can help us only sync new or changed files or directory content while making backups and beyond in Linux."
  url="https://tecmint.com/sync-new-changed-modified-files-rsync-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2016/08/Sync-New-Changed-Files-Rsync.png"/>

As a system administrator or Linux power user, you may have probably come across or even on several occasions, used the versatile Linux [**rsync command**](/tecmint.com/rsync-local-remote-file-synchronization-commands.md), which enables users to expeditiously [**copy or synchronize files locally and remotely**](/tecmint.com/scp-commands-examples.md). It is as well a great tool popularly used for backup operations and [**mirroring**](/tecmint.com/clone-linux-server.md).

Some of its eminent features and advantages include; it is exceptionally versatile in that, it can copy locally, to/from a remote shell or remote rsync, it is also remarkably flexible, allowing users to specify any number of files to copy.

Furthermore, it permits copying of links, devices, file or directory owner, groups, and permissions. It also supports usage without root privileges coupled with many more.

One imperative differential of **rsync** in comparison to other [**file-coying commands**](/tecmint.com/cp-command-examples.md) in Linux is its use of the remote-update protocol, to transfer only the difference between files or directory content.

Therefore, in this article, we shall examine how **rsync** can help us only sync new or changed files or directory content while making backups and beyond in Linux.

To start with, you need to remember that the conventional and simplest form of using rsync is as follows:

```sh
rsync options source destination 
```

That said, let us dive into some examples to uncover how the concept above actually works.

---

## Syncing Files Locally Using Rsync

Using the command below, being able to copy files from my <FontIcon icon="fas fa-folder-open"/>`Documents` directory to <FontIcon icon="fas fa-folder-open"/>`/tmp/documents` directory locally:

```sh
rsync -av Documents/* /tmp/documents
```

In the command above, the option:

- `-a` - means archive mode.
- `-v` - means verbose, showing details of ongoing operations.

![Sync Files Locally](https://tecmint.com/wp-content/uploads/2016/08/Sync-Files-Locally.png)

By default, `rsync` only copies new or changed files from a source to destination, when I add a new file into my <FontIcon icon="fas fa-folder-open"/>`Documents` directory, this is what happens after running the same command a second time:

```sh
rsync -av Documents/* /tmp/documents
```

![Sync New Updated Files](https://tecmint.com/wp-content/uploads/2016/08/Sync-New-Updated-Files.png)

As you can observe and notice from the output of the command, only the new file is copied to the destination directory.

::: info

You might also like: [How to Sync Two Apache Web Servers/Websites Using Rsync](/tecmint.com/sync-two-apache-websites-using-rsync.md)

:::

The `--update` or `-u` option allows `rsync` to skip files that are still new in the destination directory, and one important option, `--dry-run` or `-n` enables us to execute a test operation without making any changes. It shows us what files are to be copied.

```sh
rsync -aunv Documents/* /tmp/documents
```

![Dry Run Rsync Before Syncing Files](https://tecmint.com/wp-content/uploads/2016/08/Dry-Run-Rsync-Before-Syncing-Files.png)

After executing a test run, we can then do away with the `-n` and perform a real operation:

```sh
rsync -auv Documents/* /tmp/documents
```

![Sync Updated Files](https://tecmint.com/wp-content/uploads/2016/08/Sync-Updated-Files.png)

---

## Syncing Files From Local to Remote Linux

In the example below, I am copying files from my local machine to a remote server with the IP address - **10.42.1.5**. So as to only sync new files on the local machine, that do not exist on the remote machine, we can include the `--ignore-existing` option:

```sh
rsync -av --ignore-existing Documents/* aaronkilik@10.42.1.5:~/all/
```

![Sync Files Local to Remote Linux](https://tecmint.com/wp-content/uploads/2016/08/Sync-Files-Local-to-Remote-Linux.png)

Subsequently, to sync only updated or modified files on the remote machine that have changed on the local machine, we can perform a dry run before copying files as below:

```sh
rsync -av --dry-run --update Documents/* aaronkilik@10.42.1.5:~/all/
rsync -av --update Documents/* aaronkilik@10.42.1.5:~/all/
```

![Check Sync Only Updated Files](https://tecmint.com/wp-content/uploads/2016/08/Check-Sync-Only-Updated-Files.png)

To update existing files and prevent the creation of new files in the destination, we utilize the `--existing` option.

You can run through the `man rsync` page to discover additionally useful options for advanced usage, as I had mentioned earlier, `rsync` is a very powerful and versatile Linux tool, and many System Administrator and Linux power users know just how advantageous it is.

Most importantly, you can as well share your view on the examples we have covered here or even better still, offer us valuable tips on using this vital command line tool through the comment section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Sync New and Changed Files Using ‘rsync’ Command",
  "desc": "In this article, we shall examine how rsync can help us only sync new or changed files or directory content while making backups and beyond in Linux.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/sync-new-changed-modified-files-rsync-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```

