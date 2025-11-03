---
lang: en-US
title: "How to List Running Services in Linux (systemctl Examples)"
description: "Article(s) > How to List Running Services in Linux (systemctl Examples)"
icon: fa-brands fa-fedora
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
      content: "Article(s) > How to List Running Services in Linux (systemctl Examples)"
    - property: og:description
      content: "How to List Running Services in Linux (systemctl Examples)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/list-all-running-services-under-systemd-in-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-09-02
isOriginal: false
author:
  - name: Aaron Kili
    url : https://tecmint.com/author/aaronkili/
cover: https://tecmint.com/wp-content/uploads/2019/08/List-Systemd-Running-Services-in-Linux.png
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
  name="How to List Running Services in Linux (systemctl Examples)"
  desc="Systemd is a service manager for Linux; a drop-in replacement for the init process, and the systemctl command is the primary tool to manage systemd."
  url="https://tecmint.com/list-all-running-services-under-systemd-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2019/08/List-Systemd-Running-Services-in-Linux.png"/>

Linux systems provide a variety of system services (such as [**process management**](/tecmint.com/linux-process-management.md), **login**, [**`syslog`**](/tecmint.com/install-rsyslog-centralized-logging-in-centos-ubuntu.md), [**`cron`**](/tecmint.com/11-cron-scheduling-task-examples-in-linux.md), etc.) and network services (such as [**remote login**](/tecmint.com/best-remote-linux-desktop-sharing-software.md), e-mail, printers, web hosting, data storage, [**file transfer**](/tecmint.com/scp-commands-examples.md), domain name resolution (using DNS), dynamic IP address assignment (using **DHCP**), and much more).

Technically, a service is a process or group of processes (commonly known as **daemons**) running continuously in the background, waiting for requests to come in (especially from clients).

Linux supports different ways to manage (start, stop, restart, enable auto-start at system boot, etc.) services, typically through a process or service manager. Most, if not all, [**modern Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md) now use the same process manager: **systemd**.

::: info

You might also like: [**Why ‘init’ Needed to be Replaced with ‘systemd’ in Linux**](/tecmint.com/systemd-replaces-init-in-linux.md)

:::

In this guide, you’ll learn:

- The difference between enabled vs running services.
- How to list running services in Linux using systemctl.
- How to check ports and firewall openings.
- How to automate monitoring and restart failed services.
- How to harden services for better security.

---

## Quick systemctl Command Cheat Sheet

Here’s a quick reference for managing services in Linux:

| Task | Command |
| --- | --- |
| List all services | `systemctl list-units --type=service` |
| List active services (running + exited) | `systemctl list-units --type=service --state=active` |
| List running services only | `systemctl list-units --type=service --state=running` |
| List enabled services (start on boot) | `systemctl list-unit-files --type=service --state=enabled` |
| Check a specific service | `systemctl status sshd` |

---

## What is Systemd?

**Systemd** is a system and service manager for Linux; a drop-in replacement for the **init** process, which is compatible with **SysV** and **LSB** init scripts, and the [**`systemctl` command**](/tecmint.com/manage-services-using-systemd-and-systemctl-in-linux.md) is the primary tool to manage `systemd`.

---

## Enabled vs Running Services in Linux

Enabled services are those set to start automatically at boot, while running services are currently active in memory. Sometimes a service may be enabled but not running yet (for example, a scheduled or on-demand service).

To list enabled services:

```sh
systemctl list-unit-files --type=service --state=enabled
```

To compare with running ones:

```sh
systemctl list-units --type=service --state=running
```

This distinction helps with troubleshooting services that are supposed to start but don’t, or those that run unexpectedly.

![List Enabled and Running Services](https://tecmint.com/wp-content/uploads/2025/03/List-Enabled-and-Running-Services-in-Linux.png)

---

## Why List Running Services in Linux?

Knowing which services are running on your Linux system is important for:

- Monitoring resource utilization
- Troubleshooting performance issues
- Ensuring critical services are active
- Optimizing system performance and security

**Systemd** simplifies service management with powerful **systemctl** commands (which is also known as [**essential commands**](/tecmint.com/essential-linux-commands.md)), making it easy to list, monitor, and manage active services.

In this guide, we will demonstrate the process of listing all running services under **Systemd** in Linux, providing a comprehensive walkthrough for users of all experience levels.

---

## Listing Running Services Under SystemD in Linux

When you run the **systemctl command** without any arguments, it will display a list of all loaded systemd units (read the systemd documentation for more information about systemd units), including services, showing their status (whether active or not).

```sh
systemctl 
```

![List Systemctl Units in Linux](https://tecmint.com/wp-content/uploads/2019/08/List-Systemctl-Units.png)

### List All Loaded Services in Linux

To list all loaded services on your system whether active, running, exited, or failed, use the **list-units** subcommand and `--type` switch with a value of service.

```sh
systemctl list-units --type=service
# OR
systemctl --type=service
```

![List All Services Under Systemd](https://tecmint.com/wp-content/uploads/2019/08/List-All-Services-Under-Systemd.png)

### List Only Active Services in Linux

And to list all loaded but active services, both running and those that have exited, you can add the `--state` option with a value of **active**, as follows.

```sh
systemctl list-units --type=service --state=active
# OR
systemctl --type=service --state=active
```

![List All Active Running Services in Systemd](https://tecmint.com/wp-content/uploads/2019/08/List-All-Active-Running-Services-in-Systemd.png)

List All Active Running Services in Systemd

### List Running Services in Linux Using systemctl

But to get a quick glance at all running services (i.e., all loaded and actively running services), run the following command.

```sh
systemctl list-units --type=service --state=running 
# OR
systemctl --type=service --state=running
```

![List Running Services in Systemd](https://tecmint.com/wp-content/uploads/2019/08/List-Running-Services-in-Systemd.png)

Let’s explore the key terms related to **Systemd** units and their status:

- **Unit** – A unit could be a service, a socket, a device, or various other entities.
- **Load** – It indicates whether the unit is loaded or not. A unit can be loaded but not necessarily active.
- **Active** – It shows whether the unit is actively running or whether it has encountered issues and is in a failed or inactive state.
- **SUB** – It provides additional details about the specific state of the unit. For services, it might indicate whether the service is running (running), stopped (exited), or encountering issues (failed).
- **Description** – It helps users identify and understand the purpose of the unit without delving into the detailed configuration files.

---

## Creating an Alias for systemctl Commands

If you frequently use the previous command, you can create an [**`alias` command**](/tecmint.com/create-alias-in-linux.md) in your **~/.bashrc** file as shown to easily invoke it.

```sh
vim ~/.bashrc
```

Then add the following line under the list of aliases as shown in the screenshot.

```sh
alias running_services='systemctl list-units  --type=service  --state=running'
```

![Create a Alias for Long Command](https://tecmint.com/wp-content/uploads/2019/08/create-alias-for-a-long-command.png)

Save the changes in the file and close it. From now onwards, use the “`running_services`” command to view a list of all loaded, actively running services on your server.

```sh
running_services	# use the Tab completion 
```

![View All Running Services](https://tecmint.com/wp-content/uploads/2019/08/run-alias-to-view-running-services.png)

View All Running Services

---

## Find Which Port a Service is Using

Besides, an important aspect of services is the port they use. To determine the port a daemon process is listening on, you can use the [**`netstat`**](/tecmint.com/20-netstat-commands-for-linux-network-management.md) or [**`ss` command**](/tecmint.com/ss-command-examples-in-linux.md) as shown.

Where the flag `-l` means print all listening sockets, `-t` displays all TCP connections, `-u` shows all UDP connections, `-n` means print numeric port numbers (instead of application names) and `-p` means show the application name.

```sh
netstat -ltup | grep zabbix_agentd
# OR
ss -ltup | grep zabbix_agentd
```

The fifth column shows the socket: Local Address:Port. In this case, the process `zabbix_agentd` is listening on port **10050**.

![Determine Process Port](https://tecmint.com/wp-content/uploads/2019/08/determine-port-a-process-is-listening-on.png)

---

## Listing Open Firewall Services and Ports

Also, if your server has a firewall service running, which controls how to block or allow traffic to or from selected services or ports, you can [**list services or ports**](/tecmint.com/find-open-ports-in-linux.md) that have been opened in the firewall, using the [**`firewall-cmd`**](/tecmint.com/install-configure-firewalld-in-centos-ubuntu.md)** or [**`ufw` command**](/tecmint.com/setup-ufw-firewall-on-ubuntu-and-debian.md) (depending on the Linux distributions you are using) as shown.

::: code-tabs#sh

@tab:active FirewallD

```sh
firewall-cmd --list-services  # [FirewallD]
firewall-cmd --list-ports
```

@tab UFW Firewall

```sh
sudo ufw status   # [UFW Firewall]
```

:::

![List Open Services and Ports on Firewall](https://tecmint.com/wp-content/uploads/2019/08/list-open-services-and-ports-in-firewalld.png)

---

## Automating Service Monitoring in Linux

Manually checking running services can be tedious, especially on production servers. Automating this process ensures you are always aware of service status changes without needing to check manually.

### Check Running Services Every 5 Minutes with a Cron Job

A [**cron job**](/tecmint.com/create-and-manage-cron-jobs-on-linux.md) is a scheduled task in Linux that runs at a specific interval. You can use it to log running services periodically and review them later in case of failures or unexpected shutdowns.

```sh
crontab -e
```

Add this line to log running services every 5 minutes.

```sh
*/5 * * * * systemctl list-units --type=service --state=running > /tmp/running_services.log
```

The output will be saved in <VPIcon icon="fas fa-folder-open"/>`/tmp/`<VPIcon icon="fas fa-file-lines"/>`running_services.log` file, and you can check the latest recorded services using:

```sh
cat /tmp/running_services.log
# OR
tail -f /tmp/running_services.log
```

### Restart a Service if It Fails

By default, if a service crashes or stops unexpectedly, it does not restart automatically unless explicitly configured. To ensure a service [**restarts whenever it fails**](/tecmint.com/automatically-restart-service-linux.md), you can modify its systemd service unit file.

For example, use the following command to edit the service configuration (replace `apache2` with the actual service name you want to restart automatically):

```sh
systemctl edit apache2
```

Once inside the editor, add the following lines.

```sh
[Service]
Restart=always
RestartSec=5s
```

Now, reload systemd to apply the changes.

```sh
systemctl daemon-reload
```

Then, restart the service to ensure it picks up the new settings

```sh
systemctl restart apache2
```

To confirm that systemd is set to restart the service automatically.

```sh
systemctl show apache2 --property=Restart
```

---

## Hardening Services with systemd Security Options

To enhance the security of critical services, you can add systemd restrictions to their unit files.

```sh
[Service]
NoNewPrivileges=true
ProtectSystem=full
PrivateTmp=true
```

These limit service capabilities, file system access, and isolation. Tools like `systemd-analyze` security can help evaluate service risk and suggest improvements.

---

## Conclusion

That’s all for now! In this guide, we demonstrated how to view running services under **systemd** in Linux. We also covered how to check the port service is listening on and how to view services or ports opened in the system firewall.

Do you have any additions to make or questions? If yes, reach us using the comment form below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to List Running Services in Linux (systemctl Examples)",
  "desc": "Systemd is a service manager for Linux; a drop-in replacement for the init process, and the systemctl command is the primary tool to manage systemd.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/list-all-running-services-under-systemd-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
