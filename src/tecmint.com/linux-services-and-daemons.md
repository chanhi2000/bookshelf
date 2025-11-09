---
lang: en-US
title: "How Linux Services and Daemons Work (and How to Control Them)"
description: "Article(s) > How Linux Services and Daemons Work (and How to Control Them)"
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
      content: "Article(s) > How Linux Services and Daemons Work (and How to Control Them)"
    - property: og:description
      content: "How Linux Services and Daemons Work (and How to Control Them)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/linux-services-and-daemons.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-14
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/03/linux-services-and-daemons-guide.webp
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
  name="How Linux Services and Daemons Work (and How to Control Them)"
  desc="Learn what Linux services and daemons are, how they work, and how to manage them using systemctl in this simple guide for beginners."
  url="https://tecmint.com/linux-services-and-daemons"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/03/linux-services-and-daemons-guide.webp"/>

When starting out with [**Linux**](/tecmint.com/what-is-linux.md), you may encounter the terms “**services**” and “**daemons**” quite frequently, which refer to background processes that play a key role in keeping the system running smoothly, often without requiring any direct user input.

Understanding how these components work can help you better manage your system and troubleshoot common issues more efficiently. In this beginner-friendly overview, we’ll explain what **services** and **daemons** are, how they function within **Linux**, and what tools are available to help you control them effectively.

---

## What Are Services and Daemons in Linux?

Let’s break down what they are, how they differ, and why they matter.

### What is a Daemon?

A **daemon** (pronounced **DEE-muhn**) is a background process that starts automatically or runs silently in the background without any user interaction. Its job is to wait for specific system events or handle routine tasks quietly and consistently.

Think of a daemon like an always-on personal assistant that never needs supervision.

Here are some common examples:

- `sshd`: Handles [**remote SSH logins**](/tecmint.com/ssh-security-best-practices.md) over the network.
- `httpd`: Runs your web server, delivering websites and APIs.
- `crond`: [**Manages scheduled tasks**](/tecmint.com/create-and-manage-cron-jobs-on-linux.md) (like automated backups or maintenance scripts).

By convention, most daemons in Linux end with the letter `d`, which simply stands for “**daemon**”.

### What is a Service?

Now, while a daemon refers specifically to a background process, the term “**service**” is a bit broader in Linux.

A service is a managed background process that might run continuously like a **daemon**, or it might be triggered on demand. Services provide functionality like networking, printing, logging, firewalls, and more.

Services can:

- Start automatically at boot.
- It can be started or stopped manually by the user.
- Run persistently or only when needed.

So here’s the key takeaway:

> All daemons are services, but not all services are daemons.

::: tip For example:

- A daemon like `sshd` runs all the time, listening for connections.
- But a service like a **Bluetooth** scanner might only run when a Bluetooth device is detected, which is an event-driven, not always active.

:::

Some services are transient; they start, perform a task, and stop:

- Like `systemd-resolved`, which handles DNS queries on the fly.
- Or `atd`, which runs one-time scheduled jobs and then exits.

This flexibility is part of what makes Linux such a powerful system; you only run what you need, when you need it.

---

## How Linux Manages Services: systemd and More

When it comes to managing services on [**modern Linux systems**](/tecmint.com/top-most-popular-linux-distributions.md), `systemd` is the dominant player, which acts as the **init** system, which is the first process to start when the system boots up – always assigned **PID 1**.

Once it’s running, `systemd` takes over the job of starting and managing every other service and daemon on the system. Most [**popular Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md) like **Ubuntu**, **Fedora**, **Debian**, **CentOS**, and **Arch Linux** have adopted `systemd` as their default init system due to its speed, efficiency, and wide feature set.

You interact with `systemd` primarily through the [**`systemctl` command**](/tecmint.com/manage-services-using-systemd-and-systemctl-in-linux.md), which gives you full control over services such as starting, stopping, enabling, disabling, checking statuses, and more.

While `systemd` is the current standard; it’s worth noting there are other init systems you might come across, especially on older or specialized distributions.

- **SysVinit** is the traditional init system used in older Linux versions, with a simpler approach that involved running scripts in `/etc/init.d`.
- **Upstart**, once used by **Ubuntu**, aimed to improve upon **SysVinit** with event-driven capabilities but has largely been replaced.
- Another one still in use is **OpenRC**, a lightweight and simple init system used in distributions like **Alpine Linux** and **Gentoo**.

That said, this guide will focus entirely on `systemd`, since that’s what you’re most likely to encounter in real-world Linux environments today.

### Managing Services with systemctl

The `systemctl` command is your go-to tool for interacting with services on a systemd-based Linux system. Here are the most common tasks you’ll need to know.

To check the status of a service, use the following command, which will give you a snapshot of the service’s current state – whether it’s active, inactive, failed, or running.

```sh
sudo systemctl status sshd
```

To start a service manually, the syntax is simple:

```sh
sudo systemctl start sshd
```

To stop a service, just run:

```sh
sudo systemctl stop sshd
```

To restart a service, just run:

```sh
sudo systemctl restart sshd
```

To enable a service so it starts at boot, use:

```sh
sudo systemctl enable sshd
```

On the flip side, to disable a service from auto-starting, run:

```sh
sudo systemctl disable sshd
```

To see a list of all currently active services, you can run:

```sh
systemctl list-units --type=service
```

If you want a broader list, including services that are installed but not running, use:

```sh
systemctl list-unit-files --type=service
```

---

## Bonus: Using `ps`, `top`, and `htop` to View Daemons

While tools like `systemctl` are great for managing services, sometimes it’s helpful to look directly at what’s happening at the process level, which can be especially useful when you want to confirm that a daemon is running, check its resource usage, or troubleshoot performance issues.

To start, the [**`ps` command**](https://tecmint.com/ps-command-examples-for-linux-process-monitoring.md) gives you a snapshot of all running processes.

```sh
ps aux
```

This displays a detailed list of every active process, including the user it’s running under, how much CPU and memory it’s using, and the command that started it.

![List Linux Active Processes](https://tecmint.com/wp-content/uploads/2014/03/List-Linux-Active-process.png)

If you’re looking for a specific daemon, you can combine `ps` with `grep` to filter the results.

```sh
ps aux | grep sshd
#
# ravi       17554  0.0  0.0   9144  2176 pts/0    S+   10:56   0:00 grep --color=auto sshd
```

This command helps you quickly find whether the SSH daemon is running and what its current state is.

For a real-time view of what’s happening on your system, you can use [**`top`**](/tecmint.com/12-top-command-examples-in-linux.md), which is included in almost every Linux distribution by default.

```sh
top
```

![Show List of Running Processes](https://tecmint.com/wp-content/uploads/2014/03/Show-List-of-Running-Processes.png)

If you want something more user-friendly and colorful, try [**`htop`**](/tecmint.com/htop-linux-process-monitoring.md), which is a more advanced alternative to `top`. Unlike `top`, `htop` lets you scroll, filter, and sort processes easily using arrow keys and function keys.

You may need to install it first:

```sh
sudo apt install htop       # For Debian/Ubuntu
sudo yum install htop       # For CentOS/RHEL
sudo dnf install htop       # For Fedora
```

Once installed, run `htop` and you’ll have a much more interactive way of inspecting what’s running under the hood.

![`htop` - Interactive Process Viewer](https://tecmint.com/wp-content/uploads/2014/03/htop-interactive-process-viewer.png)

---

## Final Thoughts

**Services** and **daemons** are at the heart of any functioning Linux system, as they handle critical background tasks like managing SSH connections, scheduling jobs, serving web content, syncing system time, and enforcing firewall rules.

These components work silently behind the scenes to keep the system running efficiently and reliably. Understanding how they operate and how to manage them effectively is a key part of becoming proficient in Linux system administration.

Once you understand how to manage **services** and **daemons** effectively, you’ll feel much more confident navigating and controlling your Linux system.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Linux Services and Daemons Work (and How to Control Them)",
  "desc": "Learn what Linux services and daemons are, how they work, and how to manage them using systemctl in this simple guide for beginners.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/linux-services-and-daemons.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
