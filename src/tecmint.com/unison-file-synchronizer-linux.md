---
lang: en-US
title: "How to Install Unison File Synchronizer for Two-Way File Sync on Linux"
description: "Article(s) > How to Install Unison File Synchronizer for Two-Way File Sync on Linux"
icon: iconfont icon-shell
category:
  - Shell
  - unison
  - cron
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
  - unison
  - cron
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
      content: "Article(s) > How to Install Unison File Synchronizer for Two-Way File Sync on Linux"
    - property: og:description
      content: "How to Install Unison File Synchronizer for Two-Way File Sync on Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/unison-file-synchronizer-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-09-23
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/03/Install-Unison-File-Synchronizer-on-Linux.webp
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
  name="How to Install Unison File Synchronizer for Two-Way File Sync on Linux"
  desc="Unison is a cross-platform file synchronization tool that is useful in synchronizing data between two or more locations, be it computers or storage devices."
  url="https://tecmint.com/unison-file-synchronizer-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/03/Install-Unison-File-Synchronizer-on-Linux.webp"/>

Keeping files in sync across multiple machines is a common task for Linux users. You might use both a laptop and a desktop, manage a home server and a VPS, or just need an extra copy of your important files.

For simple backups, tools like [**`rsync`**](/tecmint.com/rsync-local-remote-file-synchronization-commands.md) and [**`scp`**](/tecmint.com/scp-commands-examples.md) work well, but if you make changes on both systems, one-way sync isn’t enough and you risk overwriting files or losing updates.

This is where **Unison File Synchronizer** is useful, which is a two-way synchronization tool that compares directories on both sides, detects changes, and updates them so that both locations always stay consistent.

This guide will walk you through the basics of using **Unison File Synchronizer** on Linux.

::: info By the end, you’ll know how to:

- Install Unison on [**popular Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md).
- Sync files between two local folders.
- Synchronize directories across remote systems using SSH.
- Create profiles to make recurring sync tasks easier.
- Fix common issues like version mismatches and file conflicts.

Let’s get started…

---

## Installing Unison on Linux

You can install **Unison** either from your Linux distribution’s package repository or by downloading the stable release. For most users, installing from the repository is the easiest method.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install unison
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install unison
```

<!--
@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/unison
```
-->

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add unison
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S unison
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>
```sh
sudo zypper install unison
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install unison
```

:::

If you want the GUI version, you can install it with the following command, but the GUI version `(unison-gtk)` is only available on [**Debian-based distributions**](/tecmint.com/debian-based-linux-distributions.md).

```sh
sudo apt install unison-gtk
```

After installation, verify the version with:

```sh
unison -version
```

::: note Important Note

**Unison** is strict about version compatibility. If you plan to sync between two systems (say, a laptop and a VPS), both must have the exact same version of **Unison**. Otherwise, it will refuse to connect.

:::

---

## Basic Local Synchronization

Before using **Unison** over a network, it’s a good idea to start with syncing two folders on the same machine, which will help you understand how **Unison** works without worrying about remote connections or **SSH**.

Let’s say you have two folders:

- `~/Documents/work` → your main working folder
- `~/Backup/work_sync` → your backup folder

To synchronize these folders, run:

```sh
unison ~/Documents/work ~/Backup/work_sync
```

::: info Here is the breakdown of the command:

- **Comparison**: Unison scans both directories and compares file names, sizes, and timestamps.
- **Reporting Differences**: It lists all the differences between the two folders.
- **User Confirmation**: If there are changes, **Unison** will ask you what to do: copy files from left to right, right to left, or skip them.
- **Synchronization**: Once confirmed, **Unison** updates both directories so they match.

:::

::: tip

Files that exist only in one folder are automatically copied to the other. If files exist in both folders but have been changed differently, Unison will prompt you to resolve the conflict.

:::

This two-way approach is what makes **Unison** safer than simply using [**`cp`**](/tecmint.com/cp-command-examples.md) or [**`rsync`**](/tecmint.com/sync-new-changed-modified-files-rsync-linux.md) in one direction. You can edit files on either side without worrying about losing updates.

---

## Synchronizing Across Remote Systems (Using SSH)

Now let’s move to syncing files between two different machines over **SSH**, which means the connection is encrypted and secure.

You want to sync your local <VPIcon icon="fas fa-folder-open"/>`~/Projects` folder with a remote server:

```sh
unison ~/Projects ssh://username@server-ip//home/username/Projects
```

Here is the breakdown of the command:

- `~/Projects` → the local directory you want to sync.
- `ssh://username@server-ip//home/username/Projects` → the full path on the remote machine, accessed via SSH.
- Note the double slashes `(//)` after the hostname: they indicate a full path rather than a relative one.

::: tip Pro Tip

et up [**SSH key-based authentication**](/tecmint.com/ssh-passwordless-login-using-ssh-keygen-in-5-easy-steps.md) so you won’t have to enter your password every time, which is essential if you want to automate sync tasks later.

---

## Using Profiles for Automation

Typing long **Unison** commands every time can get tedious. Luckily, **Unison** allows you to create profiles, which are saved sets of instructions for recurring sync tasks. Profiles are stored in <VPIcon icon="fas fa-folder-open"/>`~/.unison/` with the `.prf` extension.

Creating a new profile file.

```sh
nano ~/.unison/work.prf
```

Add the following content:

```sh
root = /home/youruser/Documents/work
root = ssh://username@server-ip//home/username/Documents/work

auto = true
batch = true
prefer = newer
```

::: info Here is the breakdown of the each option:

- `root` → defines the folders to synchronize (local and remote).
- `auto = true` → automatically performs synchronization without asking for confirmation.
- `batch = true` → runs in non-interactive mode (useful for scripts or cron jobs).
- `prefer = newer` → in case of conflicts, keeps the file with the most recent modification time.

:::

Now you can simply run the following command and **Unison** will use your profile automatically, no need to type long commands each time.

```sh
unison work
```

---

## Running Continuous Sync (Live Mode)

Sometimes you want your directories to stay in sync automatically as changes happen using a **watch mode** that monitors directories continuously.

```sh
unison work -repeat watch
```

With this command:

- Unison keeps scanning your directories for changes.
- Any file added or modified on either side is synced automatically.
- This is particularly useful for development projects where files are constantly updated.

::: note

Watch mode can consume more system resources if directories are very large, so use it wisely.*

:::

---

## Scheduling Syncs with Cron

If you prefer periodic sync instead of continuous monitoring, you can schedule **Unison** to run automatically [**using `cron` jobs**](/tecmint.com/create-and-manage-cron-jobs-on-linux.md).

First, edit your crontab:

```sh
crontab -e
```

Add the following line to sync your profile every hour:

```sh
0 * * * * unison work -batch
```

::: info Here is the breakdown of the command:

- `0 * * * *` → runs at the top of every hour.
- `unison work -batch` → executes your work profile in non-interactive mode.

:::

---

## Common Unison Options You Should Know

Here’s a quick reference for useful **Unison** options:

| Option | Description |
| --- | --- |
| `-auto` | Automatically resolve simple updates. |
| `-batch` | Run without user prompts (useful for cron). |
| `-ui text` | Force terminal text mode interface. |
| `-repeat watch` | Continuously monitor folders for changes. |
| `-prefer newer` | Keep the most recently modified file in case of conflict. |

Example combining options:

```sh
unison work -auto -batch -prefer newer
```

This runs your sync automatically, resolves conflicts by keeping newer files, and doesn’t prompt you.

::: important  Why Choose Unison Over Other Tools

| Tool | Sync Type | Two-Way | GUI Available | Use Case |
| --- | --- | --- | --- | --- |
| `rsync` | One-way | ❌ | ❌ | Backup, server mirroring |
| Unison | Two-way | ✅ | ✅ (GTK) | Active projects across machines |

:::

---

## Final Thoughts

[Unison](https://github.com/bcpierce00/unison "Unison File Synchronizer") is a lightweight but powerful tool for anyone who needs to maintain consistency between multiple Linux machines. Unlike one-way tools such as `rsync`, it lets you safely sync files both ways, preventing accidental overwrites and file loss.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install Unison File Synchronizer for Two-Way File Sync on Linux",
  "desc": "Unison is a cross-platform file synchronization tool that is useful in synchronizing data between two or more locations, be it computers or storage devices.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/unison-file-synchronizer-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
