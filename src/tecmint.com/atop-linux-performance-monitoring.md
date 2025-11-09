---
lang: en-US
title: "How to Install ‘atop’ to Monitor Real-Time System Performance"
description: "Article(s) > How to Install ‘atop’ to Monitor Real-Time System Performance"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Fedora
  - Debian
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - fedora
  - debian
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install ‘atop’ to Monitor Real-Time System Performance"
    - property: og:description
      content: "How to Install ‘atop’ to Monitor Real-Time System Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/atop-linux-performance-monitoring.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-06-30
isOriginal: false
author:
  - name: Marin Todorov
    url : https://tecmint.com/author/marintodorov89/
cover: https://tecmint.com/wp-content/uploads/2025/06/atop-System-and-process-monitor-for-Linux.webp
---

# {{ $frontmatter.title }} 관련

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

[[toc]]

---

<SiteInfo
  name="How to Install ‘atop’ to Monitor Real-Time System Performance"
  desc="In this article, we will cover what Atop offers, how to install it on Linux, and how to use it to monitor and analyze your system’s performance history."
  url="https://tecmint.com/atop-linux-performance-monitoring"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/06/atop-System-and-process-monitor-for-Linux.webp"/>

`atop` is a full-screen [**performance monitoring tool**](/tecmint.com/command-line-tools-to-monitor-linux-performance.md) that provides detailed reports about all system processes, including those that have already terminated. It does this by continuously logging system activity at regular intervals, storing that information for later use.

These logs can be used for various purposes such as system analysis, performance tuning, identifying bottlenecks, debugging issues, or tracing the cause of an unexpected overload.

Unlike traditional tools like [**`top`**](/tecmint.com/12-top-command-examples-in-linux.md) or [**`htop`**](/tecmint.com/htop-linux-process-monitoring.md), which only show live system data, `atop` gives you the ability to look back in time and inspect exactly what was happening during any logged interval, which makes it especially valuable for system administrators for keeping servers running smoothly.

In this article, we will cover what `atop` offers, how to install it on [**popular Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md), and how to use it effectively to monitor and analyze your system’s performance history.

---

## What is Atop?

`atop` is a full-screen system and process monitor for Linux, which is designed to report system-wide and per-process activity, including:

- See all running and completed processes.
- Monitor CPU, memory, disk, and network usage per process.
- Log all activity in binary files for later analysis.
- Detect zombie and orphan processes.
- Display thread-level resource usage.
- Monitor per-user and per-program activity.
- Show pressure stalls (PSI) for CPU/memory/disk in modern kernels.
- Support for cgroup v2, perfect for containerized environments.
- Optional integration with Netatop for per-process network stats.

freestar.config.enabled_slots.push({ placementName: "tecmint_incontent", slotId: "tecmint_incontent" });

And what makes `atop` stand out: it can log all this activity to disk at regular intervals (default is every 10 minutes). You can then replay any part of the system history and dig into what happened.

This is a huge win when you need to debug random crashes, track down resource abuse, or monitor usage over time, especially for headless servers or production systems.

---

## Installing Atop Monitoring Tool on Linux

`atop` is available in most Linux distribution repositories, you can either install it using your system’s package manager or compile it from source for the latest version.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

First you will need to [**enable epel repository**](/tecmint.com/install-epel-repo-rhel-rocky-almalinux.md) under [**RHEL-based distributins**](/tecmint.com/redhat-based-linux-distributions.md), in order to install atop monitoring tool.

```sh
sudo dnf install epel-release
```

After you’ve enabled epel repository, you can simply use the yum package manager to install the `atop` package as shown below.

```sh
sudo dnf install atop
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

Under [**Debian-based distributins**](/tecmint.com/debian-based-linux-distributions.md), `atop` can be installed from the default repositories using the [**`apt` command**](/tecmint.com/apt-command-in-linux.md).

```sh
sudo apt-get install atop
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

**On Arch Linux / Manjaro**

If you’re using a [**rolling-release distro**](/tecmint.com/best-rolling-release-linux-distributions.md) like **Arch** or its derivatives, installing `atop` is just one command away:

```sh
sudo pacman -S atop
```

:::

### Installing atop from Source (Optional)

If you want the latest version (for example, if the repo version is outdated or you want bleeding-edge features), you can build `atop` from source.

```sh
wget https://www.atoptool.nl/download/atop-2.12.0.tar.gz
tar -xzf atop-2.12.0.tar.gz
cd atop-2.12.0
make
sudo make install
```

::: note

You may need development tools installed like **build-essential** (Debian) or **gcc**, **make**, etc., depending on your distro.

:::

Once `atop` is installed, we need to enable its background logging service, so it can start collecting performance data automatically on boot.

```sh
sudo systemctl enable --now atop
sudo systemctl enable --now atop-rotate.timer
```

---

## Getting Started with atop in Linux

Once you’ve installed `atop` and enabled its logging service, launch it in your terminal:

```sh
atop
```

You’ll then see a dynamic, colorized interface similar to top, refreshing by default every 10 seconds.

![`atop` Monitoring System](https://tecmint.com/wp-content/uploads/2015/04/Atop-Monitoring-system.png)

### Customizing the Log Interval (Default: 600 Seconds)

By default, `atop` logs system activity every **600** seconds (i.e., 10 minutes), which might be sufficient for general monitoring, it’s often too infrequent for effective troubleshooting, especially when you’re chasing down short-lived spikes in resource usage or debugging performance bottlenecks.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo sed -i 's/600/60/' /etc/default/atop
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo sed -i 's/600/60/' /etc/atop/atop.daily
```

:::

After making this change, `atop` will start collecting logs every minute, giving you a much clearer picture of system behavior over time, which is particularly useful when diagnosing intermittent issues, analyzing trends, or monitoring servers under heavy load.

### View Scheduling Information (<kbd>s</kbd> key)

To get insight into how the kernel is scheduling processes, press the <kbd>s</kbd> key, which will display how much CPU time each is consuming and how long they’ve been in a “**running**” state.

```sh
atop -s
```

### Analyze Memory Usage (<kbd>m</kbd> key)

By pressing the <kbd>m</kbd> key, you get a comprehensive view of memory usage for all running processes. The `VSIZE` column shows the total virtual memory allocated, while `RSIZE` indicates the portion of memory that is currently resident in RAM.

Additionally, `VGROW` and `RGROW` display how much virtual and resident memory a process has gained or lost during the current interval. The `MEM` column shows the overall percentage of memory used by each process.

```sh
atop -m
```

### Monitor Disk Utilization (<kbd>d</kbd> key)

Disk I/O is a common bottleneck in many systems, and `atop` makes it easy to monitor with the <kbd>d</kbd> key, which shows disk activity at the system level, including Logical Volume Management (LVM) stats and per-disk performance.

The `RDDSK` and `WRDSK` columns show the amount of data being read and written (in KB/s), while `DSK` and `LVM` columns help identify which volumes or disks are most active.

```sh
atop -d
```

### View Detailed Process Info (<kbd>v</kbd> key)

The <kbd>v</kbd> key enables a detailed breakdown of each process, showing values such as `UID`, `PID`, `GID`, and CPU usage percentages, which is particularly handy when you need to track down specific users or services by their numeric identifiers or check which group owns certain resource-intensive processes.

```sh
atop -v
```

### Show Process Commands (<kbd>c</kbd> key)

When you need to see exactly what command was run for each process, press the <kbd>c</kbd> key, which replaces the process name with the full command line, helping you pinpoint which script, binary, or flag was used, which is helpful for distinguishing between multiple instances of the same application or for debugging user-submitted jobs.

```sh
atop -c
```

### Group Processes by Program (<kbd>p</kbd> key)

To get a high-level summary of program-level activity, use the <kbd>p</kbd> key, which aggregates data per executable program, showing how many times each was spawned and how much resource usage was accumulated. The left-most column shows the spawn count, while the right-most column lists the actual program names.

```sh
atop -p
```

### Group Processes by User (<kbd>u</kbd> key)

When you’re interested in user-level resource usage, hit the <kbd>u</kbd> key, which shows how many processes each user currently runs or has run during the monitoring interval, as well as their cumulative CPU and memory usage.

```sh
atop -u
```

### Monitor Network Usage (<kbd>n</kbd> key)

To enable per-process network traffic stats, you’ll need to install and activate the **Netatop** kernel module, which enhances atop’s ability to display sent and received traffic per process.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt-get install zlib1g-dev
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install kernel-devel zlib-devel
```

:::

Download and build:

```sh
wget http://www.atoptool.nl/download/netatop-0.3.tar.gz
tar -xvf netatop-0.3.tar.gz
cd netatop-0.3
make
sudo make install
```

To load the module and start the daemon automatically after boot:

```sh
sudo systemctl start netatop
sudo systemctl enable netatop
```

Once installed, pressing <kbd>n</kbd> inside atop will show you bytes sent/received, packet counts, and network-related errors for each process.

```sh
atop -n
```

### Accessing Historical Logs

Atop stores binary log files at:

```sh
/var/log/atop/atop_YYYYMMDD
```

For example, a file like `atop_20250630` contains logs for June 30, 2025, which are binary files and are not human-readable – only `atop` can parse them.

To view a specific time window from today’s log, say starting at 5:05 AM:

```sh
atop -r -b 05:05 -l 1
```

::: info Here:

- `-r` tells Atop to read from a log file.
- `-b` specifies the beginning time.
- `-l 1` limits output to just one interval snapshot.

:::

Use the <kbd>spacebar</kbd> to move forward through intervals and <kbd>T</kbd> to go back. <kbd>Z</kbd> jumps to the latest entry.

### Get Help Inside Atop

While in the `atop` interface, press <kbd>?</kbd> to view a full list of commands and shortcuts, which is useful when you want to discover less obvious options or tailor the display to your preferences.

---

## Conclusion

I hope you find my article useful and helps you narrow down or prevent issues with your Linux system. In case you have any questions or would like to receive clarification for the usage of `atop`, please post a comment in the comment section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install ‘atop’ to Monitor Real-Time System Performance",
  "desc": "In this article, we will cover what Atop offers, how to install it on Linux, and how to use it to monitor and analyze your system’s performance history.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/atop-linux-performance-monitoring.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
