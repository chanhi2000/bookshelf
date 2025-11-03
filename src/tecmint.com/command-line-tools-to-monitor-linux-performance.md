---
lang: en-US
title: "24 Best Command Line Tools to Monitor Linux Performance"
description: "Article(s) > 24 Best Command Line Tools to Monitor Linux Performance"
icon: iconfont icon-shell
category:
  - Shell
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 24 Best Command Line Tools to Monitor Linux Performance"
    - property: og:description
      content: "24 Best Command Line Tools to Monitor Linux Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/command-line-tools-to-monitor-linux-performance.html
prev: /programming/shy/articles/README.md
date: 2025-09-08
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2023/08/command-line-monitoring-tools-linux.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/shy/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="24 Best Command Line Tools to Monitor Linux Performance"
  desc="We have compiled a list of the top 24 command-line monitoring tools to track CPU usage, memory usage, disk usage, network traffic, and other important metrics."
  url="https://tecmint.com/command-line-tools-to-monitor-linux-performance"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2023/08/command-line-monitoring-tools-linux.webp"/>

Being a System or Network administrator tasked with monitoring and [**debugging Linux system performance**](/tecmint.com/linux-networking-commands.md) problems on a daily basis is an immensely challenging responsibility.

It demands unwavering dedication, a profound understanding of Linux systems, and a constant commitment to ensuring optimal performance and reliability.

After dedicating a decade to working as a Linux Administrator in the IT industry, I have come to truly appreciate the arduous task of monitoring and ensuring the continuous operation of systems.

In light of this, we have curated a comprehensive list of the top frequently used command-line monitoring tools. These invaluable tools can prove indispensable for every Linux/Unix System Administrator, empowering them to efficiently monitor, diagnose, and maintain the health and performance of their systems.

::: info You might also like

- [19 Best Linux Bandwidth Monitoring Tools for Network Analysis](https://tecmint.com/linux-network-bandwidth-monitoring-tools/ "Best Linux Bandwidth Monitoring Tools")
- [15 Useful Performance and Network Monitoring Tools for Linux](https://tecmint.com/linux-performance-monitoring-tools/ "Network Monitoring Tools for Linux")
- [6 Key Performance Metrics to Monitor in Linux Servers](https://tecmint.com/monitor-linux-cpu-utilization/ "Key Metrics to Monitor in Linux Servers")
- [Useful Tools to Monitor and Debug Disk I/O Performance in Linux](https://tecmint.com/monitor-linux-disk-io-performance/ "Monitor and Debug Disk I/O Performance in Linux")

:::

These monitoring tools are available under all flavors of **Linux** and can be useful to monitor and find the actual causes of performance problems. This list of commands shown here is very enough for you to pick the one that is suitable for your monitoring scenario.

---

## 1. Top – Linux Process Monitoring

`top` command is a performance monitoring program that is used frequently by many system administrators to monitor Linux performance, and it is available under many **Linux/Unix-like** operating systems.

The [**`top` command**](/tecmint.com/find-processes-by-memory-usage-top-batch-mode.md) is used to display all the running and active real-time processes in an ordered list and updates it regularly. It displays **CPU usage**, **Memory usage**, **Swap Memory**, **Cache Size**, **Buffer Size**, **Process PID**, **User**, **Command**s, and much more.

It also shows high [**memory and cpu utilization of running processes**](/tecmint.com/find-linux-processes-memory-ram-cpu-usage.md). The top command is very useful for system administrators to monitor and take corrective action when required. Let’s see the top command in action.

```sh
top
```

![Check Linux Running Processes](https://tecmint.com/wp-content/uploads/2014/04/Check-Linux-Running-Processes.png)

::: info

For more usage, read: [**16 Top Command Examples in Linux [Monitor Linux Processes]**](/tecmint.com/12-top-command-examples-in-linux.md)

:::

---

## 2. VmStat – Virtual Memory Statistics

Linux **VmStat** command is used to display statistics of **virtual memory**, **kernel threads**, **disks**, **system processes**, **I/O blocks**, **interrupts**, **CPU activity,** and much more.

### Install VmStat on Linux

By default vmstat command is not available under Linux systems; you need to install a package called [**`sysstat`**](/tecmint.com/sysstat-commands-to-monitor-linux.md) (a powerful monitoring tool) that includes a vmstat program.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install sysstat
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install sysstat   # for Older
sudo dnf install sysstat
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/sysstat
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add sysstat
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S sysstat
```

<!-- @tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install sysstat
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install sysstat
``` -->

:::

The common usage of the vmstat command format is.

```sh
vmstat
# 
# procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
#  r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
#  1  0  43008 275212   1152 561208    4   16   100   105   65  113  0  1 96  3  0
```

![Vmstat System Monitoring Tool](https://tecmint.com/wp-content/uploads/2014/04/Vmstat-System-Monitoring-Tool.png)

::: info

For more usage, read: [**16 Top Command Examples in Linux [Monitor Linux Processes]**](/tecmint.com/12-top-command-examples-in-linux.md)

:::

---

## 3. Lsof – List Open Files

The **lsof command** is used in many **Linux/Unix-like** systems to display a list of all the open files and processes. The open files included are **disk files**, **network sockets**, **pipes**, **devices,** and **processes**.

One of the main reasons for using this command is when a disk cannot be unmounted and displays the error that files are being used or opened. With this command, you can easily identify which files are in use.

The most common format for the **lsof** command is.

```sh :collapsed-lines
lsof
# 
# COMMAND     PID   TID TASKCMD             USER   FD      TYPE             DEVICE SIZE/OFF       NODE NAME
# systemd       1                           root  cwd       DIR                8,2      224        128 /
# systemd       1                           root  rtd       DIR                8,2      224        128 /
# systemd       1                           root  txt       REG                8,2  1567768  134930842 /usr/lib/systemd/systemd
# systemd       1                           root  mem       REG                8,2  2714928  134261052 /usr/lib64/libm-2.28.so
# systemd       1                           root  mem       REG                8,2   628592  134910905 /usr/lib64/libudev.so.1.6.11
# systemd       1                           root  mem       REG                8,2   969832  134261204 /usr/lib64/libsepol.so.1
# systemd       1                           root  mem       REG                8,2  1805368  134275205 /usr/lib64/libunistring.so.2.1.0
# systemd       1                           root  mem       REG                8,2   355456  134275293 /usr/lib64/libpcap.so.1.9.0
# systemd       1                           root  mem       REG                8,2   145984  134261219 /usr/lib64/libgpg-error.so.0.24.2
# systemd       1                           root  mem       REG                8,2    71528  134270542 /usr/lib64/libjson-c.so.4.0.0
# systemd       1                           root  mem       REG                8,2   371736  134910992 /usr/lib64/libdevmapper.so.1.02
# systemd       1                           root  mem       REG                8,2    26704  134275177 /usr/lib64/libattr.so.1.1.2448
# systemd       1                           root  mem       REG                8,2  3058736  134919279 /usr/lib64/libcrypto.so.1.1.1c
...
```

![List Open Files in Linux](https://tecmint.com/wp-content/uploads/2014/04/List-Open-Files-in-Linux.png)

::: info

For more usage, read: [**How to Use `lsof` Command to Check Open Files in Linux**](/tecmint.com/10-lsof-command-examples-in-linux.md)

:::

---

## 4. Tcpdump – Network Packet Analyzer

The `tcpdump` command is one of the most widely used command-line [**network packet analyzer**](/tecmint.com/wireshark-network-traffic-analyzer-for-linux.md) or **packet sniffer** programs that is used to capture or filter **TCP/IP** packets that are received or transferred on a specific interface over a network.

It also provides an option to save captured packages in a file for later analysis. tcpdump is available in almost all major Linux distributions.

```sh :collapsed-lines
tcpdump -i enp0s3
# 
# tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
# listening on enp0s3, link-type EN10MB (Ethernet), capture size 262144 bytes
# 10:19:34.635893 IP tecmint.ssh > 192.168.0.124.45611: Flags [P.], seq 2840044824:2840045032, ack 4007244093
# 10:19:34.636289 IP 192.168.0.124.45611 > tecmint.ssh: Flags [.], ack 208, win 11768, options 
# 10:19:34.873060 IP _gateway.57682 > tecmint.netbios-ns: NBT UDP PACKET(137): QUERY; REQUEST; UNICAST
# 10:19:34.873104 IP tecmint > _gateway: ICMP tecmint udp port netbios-ns unreachable, length 86
# 10:19:34.895453 IP _gateway.48953 > tecmint.netbios-ns: NBT UDP PACKET(137): QUERY; REQUEST; UNICAST
# 10:19:34.895501 IP tecmint > _gateway: ICMP tecmint udp port netbios-ns unreachable, length 86
# 10:19:34.992693 IP 142.250.4.189.https > 192.168.0.124.38874: UDP, length 45
# 10:19:35.010127 IP 192.168.0.124.38874 > 142.250.4.189.https: UDP, length 33
# 10:19:35.135578 IP _gateway.39383 > 192.168.0.124.netbios-ns: NBT UDP PACKET(137): QUERY; REQUEST; UNICAST
# 10:19:35.135586 IP 192.168.0.124 > _gateway: ICMP 192.168.0.124 udp port netbios-ns unreachable, length 86
# 10:19:35.155827 IP _gateway.57429 > 192.168.0.124.netbios-ns: NBT UDP PACKET(137): QUERY; REQUEST; UNICAST
# 10:19:35.155835 IP 192.168.0.124 > _gateway: ICMP 192.168.0.124 udp port netbios-ns unreachable, length 86
# ...
```

![Tcpdump - Network Packet Analyzer](https://tecmint.com/wp-content/uploads/2014/04/Tcpdump-Network-packet-analyzer.png)

::: info

For more usage, read: [**12 Tcpdump Commands to Analyzer Network Packets**](/tecmint.com/12-tcpdump-commands-a-network-sniffer-tool.md)

:::

#### 5. Netstat – Network Statistics

The **netstat** is a command-line tool for monitoring **incoming** and **outgoing network** packet statistics as well as interface statistics. It is a very useful tool for every system administrator to monitor network performance and [**troubleshoot network-related problems**](/tecmint.com/linux-network-configuration-and-troubleshooting-commands.md).

```sh
netstat -a | more
#
# Active Internet connections (servers and established)
# Proto Recv-Q Send-Q Local Address           Foreign Address         State
# tcp        0      0 0.0.0.0:sunrpc          0.0.0.0:*               LISTEN
# tcp        0      0 tecmint:domain          0.0.0.0:*               LISTEN
# tcp        0      0 0.0.0.0:ssh             0.0.0.0:*               LISTEN
# tcp        0      0 localhost:postgres      0.0.0.0:*               LISTEN
# tcp        0      0 tecmint:ssh             192.168.0.124:45611     ESTABLISHED
# tcp6       0      0 [::]:sunrpc             [::]:*                  LISTEN
# tcp6       0      0 [::]:ssh                [::]:*                  LISTEN
# tcp6       0      0 localhost:postgres      [::]:*                  LISTEN
# udp        0      0 0.0.0.0:mdns            0.0.0.0:*
# udp        0      0 localhost:323           0.0.0.0:*
# udp        0      0 tecmint:domain          0.0.0.0:*
# udp        0      0 0.0.0.0:bootps          0.0.0.0:*
# udp        0      0 tecmint:bootpc          _gateway:bootps         ESTABLISHED
# ...
```

![Netstat - Monitor Linux Network Connections](https://tecmint.com/wp-content/uploads/2014/04/netstat-Monitor-Linux-Network-Connections.png)

::: info

For more usage, read: [**20 Netstat Commands for Linux Network Management**](/tecmint.com/20-netstat-commands-for-linux-network-management.md)

:::

While in the present day, netstat has been deprecated in favor of the [**`ss` command**](/tecmint.com/ss-command-examples-in-linux.md), you may still discover netstat in your networking toolkit.

---

## 6. Htop – Linux Process Monitoring

**htop** is a much advanced interactive and real-time Linux process monitoring tool, which is similar to the Linux [**`top` command**](/tecmint.com/save-top-command-output-to-a-file.md),** but it has some rich features like a **user-friendly interface to manage processes**, **shortcut keys**, **vertical and horizontal views of the processes,** and much more.

```sh
htop
```

![Htop - Linux System Process Viewer](https://tecmint.com/wp-content/uploads/2014/04/Htop-Linux-System-Process-Viewer.png)

**htop** is a third-party tool, which doesn’t come with Linux systems; you need to install it using your system package manager tool.

::: info

For more information on htop installation, read our article – [**Install Htop (Linux Process Monitoring) in Linux**](/tecmint.com/install-htop-linux-process-monitoring-for-rhel-centos-fedora.md).

:::

---

## 7. Iotop – Monitor Linux Disk I/O

**iotop** is also similar to the **top command** and **htop program**, but it has an accounting function to monitor and display real-time **Disk I/O** and **processes**.

iotop tool is very useful for finding the exact processes and [**highly used disk read/writes**](/tecmint.com/duf-linux-disk-monitoring-utility.md) of the processes.

### Install Iotop on Linux

By default, the **iotop** command is not available under Linux, and you need to install it as shown.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install iotop
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install iotop  # For older
sudo dnf install iotop
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/iotop
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add iotop
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S iotop
```

<!-- @tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install iotop
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install iotop
``` -->

:::

The common usage of the iotop command format is.

```sh
iotop
```

![`iotop` - Monitor Linux Disk IO Usage](https://tecmint.com/wp-content/uploads/2014/04/iotop-Monitor-Linux-Disk-IO-Usage.png)

::: info

For more usage, read: [**Iotop – Monitor Linux Disk I/O Activity and Usage Per-Process Basis**](/tecmint.com/iotop-monitor-linux-disk-io-activity-per-process.md)

:::

---

## 8. Iostat – Input/Output Statistics

**iostat** is a simple tool that will collect and show system **input** and **output** storage device statistics. This tool is often used to trace storage device performance issues, including **devices**, **local disks**, and **remote disks** such as **NFS**.

### Install Iostat on Linux

To get the **iostat** command, you need to install a package called **sysstat** as shown.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install sysstat
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum install sysstat # For older
sudo dnf install sysstat
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/sysstat
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add sysstat
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S sysstat
```

<!-- @tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install sysstat
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install sysstat
``` -->

:::

The common usage of the iostat command format is.

```sh
iostat
# 
# Linux 4.18.0-193.el8.x86_64 (tecmint)   04/05/2021      _x86_64_        (1 CPU)
#
# avg-cpu:  %user   %nice %system %iowait  %steal   %idle
#            0.21    0.03    0.59    2.50    0.00   96.67
#
# Device             tps    kB_read/s    kB_wrtn/s    kB_read    kB_wrtn
# sda               3.95        83.35        89.63    1782431    1916653
```

![iostat - Monitor Disk IO Statistics](https://tecmint.com/wp-content/uploads/2014/04/iostat-Monitor-Disk-IO-Statistics.png)

::: info

For more usage, read: [**Linux Performance Monitoring with Iostat Commands**](/tecmint.com/linux-performance-monitoring-with-vmstat-and-iostat-commands.md)

:::

---

## 9. IPTraf – Real-Time IP LAN Monitoring

**IPTraf** is an open-source console-based real-time network (**IP LAN**) monitoring utility for **Linux**. It collects a variety of information, such as [**IP traffic monitor**](/tecmint.com/tcpflow-analyze-debug-network-traffic-in-linux.md) that passes over the network, including TCP flag information, ICMP details, TCP/UDP traffic breakdowns, TCP connection packets, and byte counts.

It also gathers information on general and detailed interface statistics of TCP, UDP, IP, ICMP, non-IP, IP checksum errors, interface activity, etc.

![IPTraf IP Network Monitor](https://tecmint.com/wp-content/uploads/2014/04/IPTraf-IP-Network-Monitor.png)

IPTraf IP Network Monitor

::: info

For more usage, read: [**IPTraf-ng – A Console-Based Network Monitoring Tool**](/tecmint.com/iptraf-ng-linux-network-monitoring.md)

:::

---

## 10. Psacct or Acct – Monitor User Activity

`psacct` or `acct` tools are very useful for [**monitoring each user’s activity**](/tecmint.com/whowatch-monitor-linux-users-and-processes-in-real-time.md) on the system. Both daemons run in the background and keep a close watch on the overall activity of each user on the system, and also on what resources are being consumed by them.

These tools are very useful for system administrators to track each user’s activity, like what they are doing, what commands they issued, how many resources are used by them, how long they are active on the system, etc.

![`psacct` - Monitor Linux User Activities](https://tecmint.com/wp-content/uploads/2014/04/psacct-Monitor-Linux-User-Activities.png)

`psacct` – Monitor Linux User Activities

::: info

For more usage, read: [**How to Monitor Linux Users Activity with `psacct` or `acct` Tools**](/tecmint.com/monitor-linux-user-activity-psacct-acct.md)

:::

---

## 11. Monit – Linux Process and Services Monitoring

**Monit** is a free, open-source, and web-based process supervision utility that automatically monitors and manages system processes, programs, files, directories, permissions, checksums, and filesystems.

It monitors services like Apache, MySQL, Mail, FTP, ProFTP, Nginx, SSH, and so on. The system status can be viewed from the command line or using its own web interface.

![Monit Monitor Linux System](https://tecmint.com/wp-content/uploads/2014/04/Monit-Monitor-Linux-System.png)

::: info

For installation and configuration, read our article – [**How to Install and Setup Monit (Linux Process and Services Monitoring) Program**](/tecmint.com/how-to-install-and-setup-monit-linux-process-and-services-monitoring-program.md).

:::

---

## 12. NetHogs – Monitor Per Process Network Bandwidth

**NetHogs** is an open-source nice small program (similar to the Linux **top command**) that keeps a tab on each process’ network activity on your system. It also keeps track of [**real-time network traffic bandwidth**](/tecmint.com/bandwhich-monitor-linux-network-bandwidth-utilization.md) used by each program or application.

```sh
nethogs
```

![Nethogs Monitor Network Traffic in Linux](https://tecmint.com/wp-content/uploads/2014/04/Nethogs-Monitor-Network-Traffic-in-Linux.png)

::: info

For installation and usage, read our article: [**Monitor Linux Network Bandwidth Using NetHogs**](/tecmint.com/nethogs-monitor-per-process-network-bandwidth-usage-in-real-time.md)

:::

---

## 13. iftop – Network Bandwidth Monitoring

`iftop` is another terminal-based free open source system monitoring utility that displays a frequently updated list of network bandwidth utilization (source and destination hosts) that passes through the network interface on your system.

`iftop` is analogous to ‘**top**‘ in the context of network usage, much like how ‘**top**‘ provides insights into CPU usage.

`iftop` belongs to the esteemed ‘top’ family of network monitoring tools. Specifically designed to observe a user-selected network interface, it renders real-time data on the current bandwidth utilization between two specified hosts.

```sh
iftop
```

![iftop - Network Bandwidth Monitoring](https://tecmint.com/wp-content/uploads/2014/04/iftop-Network-Bandwidth-Monitoring.png)

::: info

For installation and usage, read our article: [**`iftop` – Monitor Network Bandwidth Utilization**](/tecmint.com/install-iftop-bandwidth-monitoring-tool-in-rhel-centos-fedora.md)

:::

---

## 14. Monitorix – System and Network Monitoring

**Monitorix** is a free, lightweight utility that is designed to run and monitor system and network resources as many as possible in **Linux/Unix** servers.

It has a built-in **HTTP** web server that regularly collects system and network information and displays it in graphs. It monitors [**system load average and usage**](/tecmint.com/understand-linux-load-averages-and-monitor-performance.md), **memory allocation**, **disk driver health**, **system services**, [**network ports**](/tecmint.com/find-listening-ports-linux.md), **mail statistics** (**Sendmail**, **Postfix**, **Dovecot**, etc), **MySQL statistics,** and many more.

It is designed to monitor overall system performance and help in detecting failures, bottlenecks, abnormal activities, etc.

![Monitorix Monitoring](https://tecmint.com/wp-content/uploads/2013/04/Monitorix-Monitoring-592x450.png)

::: info

For installation and usage, read our article: [**Monitorix a System and Network Monitoring Tool for Linux**](/tecmint.com/monitorix-a-lightweight-system-and-network-monitoring-tool-for-linux.md)

:::

#### 15. Arpwatch – Ethernet Activity Monitor

**Arpwatch** is a kind of program that is designed to monitor the Address Resolution of (**MAC** and **IP** address changes) of **Ethernet** network traffic on a Linux network.

It continuously keeps watch on Ethernet traffic and produces a log of **IP** and **MAC** address pair changes along with a timestamp on a network. It also has a feature to send email alerts to administrators when a pairing is added or changes. It is very useful in detecting **ARP** spoofing on a network.

![Arpwatch - Monitor ARP Traffic](https://tecmint.com/wp-content/uploads/2014/04/Arpwatch-Monitor-ARP-Traffic.png)


::: info

For installation and usage, read our article: [**Arpwatch to Monitor Ethernet Activity**](https://tecmint.com/monitor-ethernet-activity-in-linux.md)

:::

---

## 16. Suricata – Network Security Monitoring

**Suricata** is a high-performance open-source **Network Security** and **Intrusion Detection** and **Prevention Monitoring System** for **Linux**, **FreeBSD,** and **Windows**.

It was designed and owned by a non-profit foundation, **OISF** (**Open Information Security Foundation**).

::: info

For installation and usage, read our article: [**Suricata – A Network Intrusion Detection and Prevention System**](/tecmint.com/suricata-a-network-intrusion-detection-prevention-system.md)

:::

---

## 17. VnStat PHP – Monitoring Network Bandwidth

**VnStat PHP** is a web-based frontend application for the most popular networking tool called “**vnstat**“. **VnStat PHP** monitors network traffic usage ina  nicely graphical mode.

It displays the total **IN** and **OUT** network traffic usage in **hourly**, **daily**, **monthly,** and **full summary** reports.

::: info

For installation and usage, read our article: [**Monitoring Network Bandwidth Usage**](/tecmint.com/vnstat-php-frontend-for-monitoring-network-bandwidth.md)

:::

---

## 18. Nagios – Network/Server Monitoring

Nagios is a leading open-source, powerful monitoring system that enables network/system administrators to identify and resolve server-related problems before they affect major business processes.

With the Nagios system, administrators are able to monitor remote Linux, Windows, Switches, Routers, and Printers on a single window. It shows critical warnings and indicates if something went wrong in your network/server, which indirectly helps you to begin remediation processes before they occur.

::: info

For installation, configuration, and usage, read our article – [**Install Nagios Monitoring System to Monitor Remote Linux/Windows Hosts**](/tecmint.com/install-nagios-in-linux.md)

:::

---

## 19. Nmon: Monitor Linux Performance

**Nmon** (stands for Nigel’s Performance Monitor) tool, which is used to monitor all Linux resources such as CPU, Memory, Disk Usage, Network, Top processes, NFS, Kernel, and much more. This tool comes in two modes: Online Mode and Capture Mode.

The Online Mode is used for real-time monitoring, and the Capture Mode is used to store the output in CSV format for later processing.

![Nmon - Linux Performance Monitoring tool](https://tecmint.com/wp-content/uploads/2014/04/Nmon-Linux-Performance-Monitoring-tool.png)

::: info

For installation and usage, read our article: [**Install Nmon (Performance Monitoring) Tool in Linux**](/tecmint.com/nmon-analyze-and-monitor-linux-system-performance.md)

:::

---

## 20. Collectl: All-in-One Performance Monitoring Tool

**Collectl** is yet another powerful and feature-rich command-line-based utility that can be used to gather information about Linux system resources such as CPU usage, memory, network, inodes, processes, nfs, TCP, sockets, and much more.

![Collectl Monitoring](https://tecmint.com/wp-content/uploads/2013/12/Collectl-620x410.jpg)

::: info

For installation and usage, read our article: [**Install Collectl (All-in-One Performance Monitoring) Tool in Linux**](/tecmint.com/linux-performance-monitoring-with-collectl-tool.md)

:::

---

## 21. `s-tui` – Terminal-Based CPU Stress and Monitoring Tool

The `s-tui` command is a simple yet powerful terminal-based program that allows administrators to monitor CPU performance metrics in real time by displaying CPU frequency, utilization, temperature, and power consumption in easy-to-read graphs, all updated continuously. It also comes with a built-in stress testing mode (using [**stress-ng**](/tecmint.com/linux-cpu-load-stress-test-with-stress-ng-tool.md)) to help administrators simulate workloads and observe how the system behaves under pressure.

`s-tui` tool is very handy for quickly identifying thermal throttling issues, abnormal CPU activity, or power-related bottlenecks. System administrators and power users often use it to monitor system stability and performance when running resource-intensive tasks.

```sh
s-tui
```

![`s-tui` - Terminal-based CPU Stress and Monitoring Utility](https://tecmint.com/wp-content/uploads/2023/08/s-tui-Terminal-Based-CPU-Stress-and-Monitoring-Tool.png)

To install `s-tui` on Linux, use the following appropriate command for your specific Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install s-tui
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install s-tui
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/s-tui
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add s-tui
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S s-tui
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install s-tui
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install s-tui
```

:::

---

## 22. `atop` – Advanced System & Process Monitoring

`atop` command is an advanced performance monitoring tool that goes beyond the traditional `top` command and it is widely used by system administrators to gain deeper insights into system performance and bottlenecks.

Unlike `top`, which mainly focuses on CPU and memory usage, `atop` provides a much broader view by monitoring CPU, memory, disk, and network usage for every process. It updates its display at regular intervals and highlights resources that are fully saturated, making it easy to spot the root cause of performance issues.

```sh
atop
```

To install `atop` on Linux, use the following appropriate command for your specific Linux distribution.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install atop
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install atop
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/atop
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add atop
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S atop
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install atop
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install atop
```

:::

![`atop` - System and Process Monitor for Linux](https://tecmint.com/wp-content/uploads/2023/08/atop-System-and-process-monitor-for-Linux.png)

---

## 23. `btop` – Modern Resource Monitoring

`btop` command is a next-generation process and resource monitoring tool, often seen as an advanced alternative to the traditional `top` and `htop` utilities.

The btop command displays all active real-time processes along with key system resource usage like CPU load, memory utilization, swap space, disk I/O, and network activity. Unlike older tools, it provides smooth scrolling, colorful graphs, and intuitive navigation, making it easier to interpret system performance at a glance.

```sh
btop
```

![Btop – Modern Resource Monitoring](https://tecmint.com/wp-content/uploads/2023/08/Btop-Modern-Resource-Monitoring.png)

To install `btop` on Linux, use the following appropriate command for your specific Linux distribution.


::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install btop
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install btop
```

<!-- @tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/btop
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add btop
``` -->

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S btop
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install btop
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install btop
```

:::

---

## 24. Netdata – Real-Time System and Application Monitoring

[<VPIcon icon="iconfont icon-github"/>`netdata/netdata`](https://github.com/netdata/netdata) is a modern performance monitoring tool that provides real-time insights into Linux systems, applications, and network activity. It is lightweight, easy to set up, and available across many Linux/Unix-like operating systems.

Unlike traditional command-line tools that show raw numbers, **Netdata** offers a highly interactive web-based dashboard that updates metrics in real time by dispalying CPU usage, memory consumption, disk activity, network bandwidth, application performance, and much more, all in colorful and detailed charts.

![Netdata - Real-Time Infrastructure Monitoring Platform](https://tecmint.com/wp-content/uploads/2023/08/Netdata-real-time-infrastructure-monitoring-platform.webp)

To start Netdata, simply install it and access the web dashboard from your browser.

```sh
bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Once installed, open your server’s IP address in a browser and you’ll be greeted with a live monitoring dashboard, packed with real-time data and visualizations.

We would like to know what kind of **monitoring programs** you use to **monitor the performance of your Linux servers**. If we’ve missed any important tool that you would like us to include in this list, please inform us via comments, and please don’t forget to share it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "24 Best Command Line Tools to Monitor Linux Performance",
  "desc": "We have compiled a list of the top 24 command-line monitoring tools to track CPU usage, memory usage, disk usage, network traffic, and other important metrics.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/command-line-tools-to-monitor-linux-performance.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
