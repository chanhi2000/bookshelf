---
lang: en-US
title: "whowatch - Monitor Linux Users and Processes in Real Time"
description: "Article(s) > whowatch - Monitor Linux Users and Processes in Real Time"
icon: iconfont icon-shell
category: 
  - Shell
  - DevOps
  - Linux
  - Fedora
  - Debian
  - Article(s)
tag: 
  - blog
  - tecmint.com
  - sh
  - shell
  - devops
  - linux
  - fedora
  - redhat
  - centos
  - debian
  - ubuntu
  - mint
  - linuxmint
  - linux-mint
  - raspberry-pi
  - kali
  - kalilinux
  - kali-linux
head:
  - - meta:
    - property: og:title
      content: "Article(s) > whowatch - Monitor Linux Users and Processes in Real Time"
    - property: og:description
      content: "whowatch - Monitor Linux Users and Processes in Real Time"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/whowatch-monitor-linux-users-and-processes-in-real-time.html
prev: /programming/sh/articles/README.md
date: 2023-07-14
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2018/07/whowatch-Monitor-User-Processes-in-Linux.png
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

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="whowatch - Monitor Linux Users and Processes in Real Time"
  desc="whowatch is a simple, easy-to-use interactive who-like command line program for monitoring processes and users on a Linux system in real time."
  url="https://tecmint.com/whowatch-monitor-linux-users-and-processes-in-real-time"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2018/07/whowatch-Monitor-User-Processes-in-Linux.png"/>

`whowatch` is a simple, easy-to-use interactive who-like command line program for monitoring processes and users on a Linux system. It shows who is logged on to your system and what they are doing, in a similar fashion as the **w command** in real-time.

It shows total number of users on the system and number of users per connection type (local, telnet, ssh and others). whowatch also shows system uptime and displays information such as user’s login name, tty, host, processes as well as the type of the connection.

In addition, you can select a particular user and view their processes tree. In the process tree mode, you can send the **SIGINT** and **SIGKILL** signals to selected process in a fun way.

In this brief article, we will explain how to install and use whowatch on Linux systems to monitor users and processes in real time in a machine.

---

## How to Install `whowatch` in Linux

The program `whowatch` can be easily installed from the default repositories using package manager on your Linux distribution as shown.


::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install whowatch
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install whowatch # On Fedora 22+
#
# OR
#
sudo yum install whowatch #On CentOs/RHEL
```

:::

Once installed, you can simply type the `whowatch` in the command line, you will see the following screen.

```sh
whowatch
```

![Monitor Logged in Users](https://tecmint.com/wp-content/uploads/2018/07/Monitor-Logged-in-Users.png)

You can view a particular user’s details, simply highlight the user (use the <kbd><FontIcon icon="fas fa-arrow-up"/></kbd> and <kbd><FontIcon icon="fas fa-arrow-down"/></kbd> arrows to navigate). Then press <kbd>d</kbd> key to list the user information as shown in this screenshot.

![Check User Information in Linux](https://tecmint.com/wp-content/uploads/2018/07/Monitor-User-Information.png)

To view a users process tree, press <kbd>Enter</kbd> after highlighting that particular user.

![Monitor User Process](https://tecmint.com/wp-content/uploads/2018/07/Monitor-User-Process.png)

To view all Linux user processes tree, press <kbd>t</kbd>.

![Monitor Linux User Processes](https://tecmint.com/wp-content/uploads/2018/07/Monitor-Linux-User-Processes.png)

You can also view Linux system information by pressing <kbd>s</kbd> key.

![Check Linux System Information](https://tecmint.com/wp-content/uploads/2018/07/Check-Linux-System-Information.png)

For more information, see the `whowatch` man page as shown.

```sh
man whowatch
```

::: info

You will also find these related articles useful:

1. [**How to Monitor Linux Commands Executed by System Users in Real-time**](/tecmint.com/monitor-linux-commands-executed-by-system-users-in-real-time.md)
2. [**How to Monitor User Activity with `psacct` or `acct` Tools**](/tecmint.com/how-to-monitor-user-activity-with-psacct-or-acct-tools.md)

:::

That’s all! `whowatch` is a simple, easy-to-use interactive command line utility for monitoring processes and users on a Linux system. In this brief guide, we have explained how to install and use whowatch. Use the feedback form below to ask any questions or share your thoughts about this utility.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "whowatch - Monitor Linux Users and Processes in Real Time",
  "desc": "whowatch is a simple, easy-to-use interactive who-like command line program for monitoring processes and users on a Linux system in real time.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/whowatch-monitor-linux-users-and-processes-in-real-time.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
