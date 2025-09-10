---
lang: en-US
title: "How to Synchronize Time with Chrony NTP in Linux"
description: "Article(s) > How to Synchronize Time with Chrony NTP in Linux"
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
  - chrony
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Synchronize Time with Chrony NTP in Linux"
    - property: og:description
      content: "How to Synchronize Time with Chrony NTP in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/synchronize-time-with-ntp-in-linux.html
prev: /programming/sh/articles/README.md
date: 2022-11-15
isOriginal: false
author:
  - name: Matei Cezar
    url : https://tecmint.com/author/cezarmatei/
cover: https://tecmint.com/wp-content/uploads/2018/04/Synchronize-Time-with-NTP-in-Linux.png
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
  name="How to Synchronize Time with Chrony NTP in Linux"
  desc="The Network Time Protocol (NTP) is a protocol used to synchronize Linux system clocks automatically over a network using the chrony NTP client."
  url="https://tecmint.com/synchronize-time-with-ntp-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2018/04/Synchronize-Time-with-NTP-in-Linux.png"/>

The **Network Time Protocol (NTP)** is a protocol used to synchronize computer system clocks automatically over a network. The machine can have the system clock use **Coordinated Universal Time (UTC)** rather than local time.

Maintaining accurate time on Linux systems, especially servers is an important task for many reasons. For example, in a networked environment, accurate timekeeping is required for accurate timestamps in packets and system logs for root-cause analysis, determining when problems occurred, and finding correlations.

`Chrony` is now the default **NTP** implementation package on the latest versions of [**RHEL-based distributions**](/tecmint.com/redhat-based-linux-distributions.md) such as **CentOS Stream**, **Fedora**, **Rocky Linux** & **AlmaLinux,** and [**Debian-based distributions**](/tecmint.com/debian-based-linux-distributions.md) such as **Ubuntu** & **Linux Mint**, among others, and comes pre-installed by default.

The `Chrony` package consists of `chronyd`, a daemon that runs in userspace, and `chronyc` a command-line program for monitoring and controlling `chronyd`.

`Chrony` is a versatile **NTP** implementation and performs well in a wide range of conditions (check out the [<VPIcon icon="fas fa-globe"/>comparison of the chrony suite to other NTP implementations](https://chrony.tuxfamily.org/comparison.html)). It can be used to synchronize the system clock with NTP servers (act as a client), with a reference clock (e.g a **GPS** receiver), or with a manual time input. It can also be employed as an **NTPv4** (**RFC 5905**) server or peer to provide a time service to other computers in the network.

In this article, you will learn how to synchronize server time with **NTP** in Linux using `chrony`.

---

## Installing Chrony in Linux Server

In most Linux systems, the `chrony` command is not installed by default. To install it, execute the below command.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centso"/>

On RHEL/CentOS/Fedora and Rocky Linux/AlmaLinux

```sh
sudo yum install chrony
```

@tab <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install chrony
```

:::

![Install Chrony in Linux](https://tecmint.com/wp-content/uploads/2018/04/Install-Chrony-in-Linux.png)

The default location for the `chrony` daemon is <VPIcon icon="fas fa-folder-open"/>`/usr/sbin/`<VPIcon icon="fas fa-file-lines"/>`chronyd` and the command line program will be installed to <VPIcon icon="fas fa-folder-open"/>`/usr/bin/chronyc`.

Once the installation is complete, start the `chrony` service and enable it to automatically start at system boot, then check if it is up and running.

```sh
systemctl enable --now chronyd
systemctl status chronyd
```

![Check Chrony Status](https://tecmint.com/wp-content/uploads/2018/04/start-and-enable-chronyd-service-and-check-its-status.png)

To cross-check if `chrony` is now up and running fine and to see the number of servers and peers that are connected to it, run the following `chronyc` command.

```sh
chronyc activity
```

![Check Chrony Activity](https://tecmint.com/wp-content/uploads/2018/04/run-chronyc-activity-check.png)

### Checking Chrony Synchronization in Linux

To display information (list of servers available, status, and offsets from the local clock and the source) about the current time sources that `chronyd` is accessing, run the following command with the `-v` flag shows the description for each column.

```sh
chronyc sources
#
# OR
#
chronyc sources -v
```

![Check Chronyd Time Sources](https://tecmint.com/wp-content/uploads/2018/04/view-chronyd-time-sources.png)

Concerning the previous command, to display other useful information for each of the sources currently being examined by `chronyd` (such as the drift rate and offset estimation process), use the `sourcestats` command.

```sh
chronyc sourcestats
#
# OR
#
chronyc sourcestats -v
```

![Check Chronyd Source Stats](https://tecmint.com/wp-content/uploads/2018/04/view-chronyd-source-stats.png)

To check `chrony` tracking, run the following command.

```sh
chronyc tracking
```

In the output of this command, the reference ID specifies the name (or IP address) if available, of the server to which the computer is currently synchronized, out of all the available servers.

![Display Chrony Tracking](https://tecmint.com/wp-content/uploads/2018/04/display-chrony-tracking.png)

### Configuring Chrony Time Sources in Linux

The main `chrony` configuration file is located at <VPIcon icon="fas fa-folder-open"/>`/etc/chrony.conf` (**CentOS/RHEL/Fedora**) or <VPIcon icon="fas fa-folder-open"/>`/etc/chrony/chrony.conf` (**Ubuntu/Debian**).

When installing a Linux OS in the cloud, your system should have some default servers or a pool of servers added during the installation process. To add or change the default servers, open the configuration file for editing:

```sh
vi /etc/chrony.conf
#
# OR
#
vi /etc/chrony/chrony.conf
```

You can either add several servers using the server directive as shown.

```sh title="/etc/chrony.conf or /etc/chrony/chrony.conf"
server 0.europe.pool.ntp.org iburst
server 1.europe.pool.ntp.org iburst
server 2.europe.pool.ntp.org ibusrt
server 3.europe.pool.ntp.org ibusrt
```

![Add NTP Servers](https://tecmint.com/wp-content/uploads/2018/04/add-ntp-servers.png)

or in most cases, it’s best to use [<VPIcon icon="fas fa-globe"/>ntppool.org](https://ntppool.org/en/) to find an NTP server. This allows the system to try to find the closest available servers for you. To add a pool, use the pool directive:

```sh title="/etc/chrony.conf or /etc/chrony/chrony.conf"
pool 0.pool.ntp.org burst
```

![Add a Pool of NTP Servers](https://tecmint.com/wp-content/uploads/2018/04/add-a-pool-of-ntp-servers.png)

There are many other options you can configure in the file. After making changes, restart the chrony service.

```sh
sudo systemctl restart chrony
#
# OR
#
systemctl restart chronyd
```

To show information about the current time sources that `chronyd` is querying, run the following command once more.

```sh
chronyc sources
```

![View Chronyd Time Sources](https://tecmint.com/wp-content/uploads/2018/04/view-chronyd-time-sources-again.png)

To check the `chrony` tracking status, run the following command.

```sh
chronyc tracking
```

![Check Chrony Synchronizing Status](https://tecmint.com/wp-content/uploads/2018/04/display-chrony-tracking-once-more.png)

To display the current time on your system, check whether the system clock is synchronized and whether NTP is indeed active, run the [**timedatectl command**](/tecmint.com/set-time-timezone-and-synchronize-time-using-timedatectl-command.md):

```sh
timedatectl
```

![Check Current Server Time](https://tecmint.com/wp-content/uploads/2018/04/check-current-time-on-system.png)

That brings us to the end of this guide. If you have any questions, reach us via the comment section below. For more information, check out: using the [<VPIcon icon="fa-brands fa-redhat"/>chrony suite to configure NTP](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/using-chrony_configuring-basic-system-settings) from the RHEL documentation or using [<VPIcon icon="fa-brands fa-ubuntu"/>chrony to configure NTP](https://ubuntu.com/blog/ubuntu-bionic-using-chrony-to-configure-ntp) from the Ubuntu official blog.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Synchronize Time with Chrony NTP in Linux",
  "desc": "The Network Time Protocol (NTP) is a protocol used to synchronize Linux system clocks automatically over a network using the chrony NTP client.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/synchronize-time-with-ntp-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
