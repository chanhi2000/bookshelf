---
lang: en-US
title: "How to Backup and Restore Installed Packages in Ubuntu"
description: "Article(s) > How to Backup and Restore Installed Packages in Ubuntu"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debain
  - Ubuntu
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Backup and Restore Installed Packages in Ubuntu"
    - property: og:description
      content: "How to Backup and Restore Installed Packages in Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/backup-restore-ubuntu-packages-dpkg.html
prev: /devops/linux-ubuntu/articles/README.md
date: 2025-09-19
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/02/backup-restore-ubuntu-packages-dpkg.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Backup and Restore Installed Packages in Ubuntu"
  desc="If you’ve ever reinstalled Ubuntu, you know the pain of setting everything up again, such as finding apps, adding PPAs, and reinstalling software one by one."
  url="https://tecmint.com/backup-restore-ubuntu-packages-dpkg"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/02/backup-restore-ubuntu-packages-dpkg.webp"/>

If you’ve ever reinstalled **Ubuntu**, you know the pain of setting everything up again, such as finding apps, adding PPAs, and reinstalling software one by one.

Back in the day, tools like **Aptik** helped automate this, but since **Aptik** is no longer maintained, you don’t need to rely on it, Ubuntu already comes with the [**`dpkg` package manager**](/tecmint.com/dpkg-command-examples.md), which can handle the job on its own.

In this tutorial, I’ll show you how to back up your installed packages and restore them later using `dpkg` commands.

---

## Step 1: Back Up Installed Packages

The very first thing we need to do is generate a list of all the packages currently installed on your Ubuntu system.

```sh
dpkg --get-selections > packages.list
```

When the command finishes, you’ll have a file called <VPIcon icon="fas fa-file-lines"/>`packages.list` in your current directory.

```sh
cat packages.list
#
# 7zip                       install
# accountservice             install
# acl                        install
# acpi                       install
# acpid                      install
# adduser                    install
# adwaita-icon-theme         install
# adwaita-icon-theme-full    deinstall
# alsa-base                  install
# alsa-topology-conf         install 
# alsa-ucm-conf              install 
# alsa-utils                 install 
# amd64-m1crocode            install 
# anycron                    install 
# anydesk                    install 
# apg                        install 
# app-install-data           install 
# apparmor                   install 
# appstream                  install 
```

::: tip Pro Tip

You can copy this file to a USB stick, external drive, or cloud storage for safekeeping.*

![Backup Ubuntu Installed Packages](https://tecmint.com/wp-content/uploads/2014/02/Backup-Ubuntu-Installed-Packages.png)

:::

---

## Step 2: Back Up Your Software Repositories (Optional)

The package list you created above is useful, but it only tells **Ubuntu** which apps you had installed; it doesn’t remember where some of them came from.

Many popular apps, such as **Google Chrome**, **VirtualBox**, **Spotify**, or **VS Code,** are installed via **PPAs** (**Personal Package Archives**) or third-party repositories.

If you don’t back up these sources, **Ubuntu** won’t know where to find those apps when you restore your package list.

```sh
sudo cp -r /etc/apt/sources.list* ~/sources-backup/
sudo cp -r /etc/apt/trusted.gpg* ~/sources-backup/
```

::: info Here’s what these commands do:

- `/etc/apt/sources.list` → The main file containing Ubuntu’s default repositories.
- `/etc/apt/sources.list.d/` → Additional PPAs and third-party sources you’ve added.
- `/etc/apt/trusted.gpg*` → Security keys that verify packages from those repositories.
- `cp -r … ~/sources-backup/` → Copies everything into a new folder called sources-backup inside your home directory.

:::

---

## Step 3: Restore Installed Packages

Once you’ve reinstalled **Ubuntu** (or set up a fresh system), it’s time to restore all your previously installed apps using the backup you created in **Step 1**.

Copy your `packages.list` file back to your home directory on the new system and run.

```sh
sudo dpkg --set-selections < packages.list
sudo apt update
sudo apt dselect-upgrade
```

What’s happening here:

- `dpkg --set-selections < packages.list` → Reads your backup list and tells **Ubuntu** which packages should be installed.
- `sudo apt update` → Updates Ubuntu’s package index so it knows what versions are available from the repositories.
- `sudo apt dselect-upgrade` → Installs everything from your list by going through each package and fetching it from the repositories.

Depending on how many apps you have installed, this process might take a few minutes.

---

## Step 4: Restore Your Repositories (If Needed)

If you followed **Step 2** and backed up your PPAs and repository keys, the final step is to restore them so **Ubuntu** can find all your third-party apps and ensure that programs like Google Chrome, VirtualBox, Spotify, or VS Code will reinstall correctly.

Copy the backup folder back to the system’s sources directory:

```sh
sudo cp -r ~/sources-backup/* /etc/apt/
```

Update Ubuntu’s package index to recognize these repositories:

```sh
sudo apt update
```

If you ever want to double-check which PPAs and third-party sources are currently active, run:

```sh
ls /etc/apt/sources.list.d/
```

---

## Conclusion

Backing up and restoring your installed packages in **Ubuntu** doesn’t have to be a headache. While tools like **Aptik** were once popular, they are no longer maintained, and with `dpkg`, **Ubuntu** already provides a reliable, built-in solution.

By following these steps, you can quickly recreate your software environment after a reinstall or on a new system, saving time and avoiding the frustration of reinstalling apps one by one. Remember to also back up your repositories if you rely on third-party PPAs, so nothing gets left behind.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Backup and Restore Installed Packages in Ubuntu",
  "desc": "If you’ve ever reinstalled Ubuntu, you know the pain of setting everything up again, such as finding apps, adding PPAs, and reinstalling software one by one.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/backup-restore-ubuntu-packages-dpkg.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
