---
lang: en-US
title: "How to Reduce RAM & CPU Usage on Linux"
description: "Article(s) > How to Reduce RAM & CPU Usage on Linux"
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
  - redhat
  - centos
  - debian
  - ubuntu
  - raspberry-pi
  - kali
  - kalilinux
  - kali-linux
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Reduce RAM & CPU Usage on Linux"
    - property: og:description
      content: "How to Reduce RAM & CPU Usage on Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/reduce-ram-cpu-usage-on-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-02-27
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2013/08/Reduce-RAM-CPU-Usage-on-Linux.png
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
  name="How to Reduce RAM & CPU Usage on Linux"
  desc="In this guide, we’ll explore practical methods to reduce RAM and CPU usage on Linux, ensuring your system runs smoothly and efficiently."
  url="https://tecmint.com/reduce-ram-cpu-usage-on-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2013/08/Reduce-RAM-CPU-Usage-on-Linux.png"/>

[**Linux**](/tecmint.com/what-is-linux.md) is a powerful and efficient operating system, but high RAM and CPU usage can degrade performance, slow down applications, and even cause system crashes when you’re running a server, workstation, or embedded system, and optimizing resource usage is essential for smooth operation.

In this guide, we’ll explore practical methods to reduce RAM and CPU usage on Linux. We’ll cover [**monitoring tools**](/tecmint.com/command-line-tools-to-monitor-linux-performance.md), process management, kernel tweaks, and system optimization techniques to keep your system running efficiently.

---

## 1. Identify Resource Hungry Processes

The first step in reducing RAM and CPU usage is identifying which processes are consuming the most resources by utilizing several command-line tools:

### a. Using top Command

The [**top command**](/tecmint.com/12-top-command-examples-in-linux.md) provides a real-time view of system processes, including CPU and memory usage.

```sh
top
```

- Press <kbd>P</kbd> to sort processes by CPU usage.
- Press <kbd>M</kbd> to sort processes by memory usage.
- Look for processes consuming excessive resources and note their Process ID (**PID**).

![Real-Time System Process Monitoring](https://tecmint.com/wp-content/uploads/2013/08/Real-Time-System-Process-Monitoring.png)

Real-Time System Process Monitoring

### b. Using htop Command

[**htop**](/tecmint.com/htop-linux-process-monitoring.md) is an interactive process viewer that provides a more user-friendly interface than `top`.

To install `htop` on Linux, use the following appropriate command for your specific Linux distribution.

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>,<FontIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install htop
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install htop
```

@tab <FontIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/htop
```

@tab <FontIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add htop
```

@tab <FontIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S htop
```

@tab <FontIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install htop
```

@tab <FontIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install htop
```

:::

Run `htop` to view and manage processes easily.

```sh
htop
```

- Press <kbd>F6</kbd> to sort processes by CPU or memory usage.
- Press <kbd>F9</kbd> to kill a selected process.

![htop - Interactive Process Viewer](https://tecmint.com/wp-content/uploads/2013/08/htop-interactive-process-viewer.png)

### c. Using ps Command

The [**ps command**](/tecmint.com/ps-command-examples-for-linux-process-monitoring.md) can be used to list processes and their resource usage.

```sh
ps aux --sort=-%mem | head  # Top memory-consuming processes
ps aux --sort=-%cpu | head  # Top CPU-consuming processes
```

![Check Memory Consuming Processes](https://tecmint.com/wp-content/uploads/2013/08/Check-Memory-Consuming-Processes.png)

---

## 2. Kill Unnecessary Processes

Once you’ve identified resource-hogging processes, you can terminate them to free up resources using the [**kill command**](/tecmint.com/how-to-kill-a-process-in-linux.md) followed by the **PID**.

```sh
kill PID
```

If the process doesn’t terminate, use the `-9` flag to force-kill it.

```sh
kill -9 PID
```

Alternatively, use the [**pkill command**](/tecmint.com/find-and-kill-running-processes-pid-in-linux.md) to kill processes by name.

```sh
pkill <PROCESS_NAME>
```

---

## 3. Optimize Startup Applications

Many applications and services start automatically at boot, consuming valuable system resources.

To manage startup applications:

### a. Using systemctl Command

List all enabled services using the [**systemctl command**](/tecmint.com/manage-services-using-systemd-and-systemctl-in-linux.md).

```sh
systemctl list-unit-files --type=service | grep enabled
```

Disable unnecessary services.

```sh
sudo systemctl disable service_name
```

![List Enabled Services](https://tecmint.com/wp-content/uploads/2013/08/List-Enabled-Services.png)

### b. Using GUI Tools

If you’re using a desktop environment like **GNOME** or **KDE**, use the built-in startup applications manager to [**disable unnecessary programs**](/tecmint.com/disable-unwanted-services-linux.md).

---

## 4. Reduce Swappiness (Optimize Swap Usage)

Swappiness controls how often the system uses swap space instead of **RAM**. A high swappiness value can lead to excessive swapping, slowing down your system.

To check the current swappiness value:

```sh
cat /proc/sys/vm/swappiness
```

The default value is usually `60`, but to reduce swappiness you need to edit the <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`sysctl.conf` file.

```sh
sudo nano /etc/sysctl.conf
```

Add or modify the following line.

```sh title="/etc/sysctl.conf"
vm.swappiness=10
```

Save the file and apply the changes.

```sh
sudo sysctl -p
```

---

## 5. Use Lightweight Desktop Alternatives

Heavy desktop environments and applications can strain system resources, so consider switching to lightweight alternatives:

### a. Desktop Environments

Replace **GNOME** or **KDE** with lighter options like **XFCE**, **LXDE**, or **MATE**.

### b. Applications

Use lightweight applications such as:

- **Text Editor**: Replace **LibreOffice** with **AbiWord** or **Mousepad**.
- **Web Browser**: Use **Firefox** with fewer extensions or switch to lightweight browsers like **Midori**.
- **File Manager**: Replace **Nautilus** with **Thunar** or **PCManFM**.

---

## 6. Clear Cache and Buffers

Linux uses RAM to cache files and improve performance. However, you can manually clear the cache if needed:

```sh
sudo sync; sudo sysctl -w vm.drop_caches=3
```

This command clears pagecache, dentries, and inodes. Use it cautiously, as it may temporarily slow down file access.

---

## 7. Optimize Kernel Parameters

To tune or optimize kernel parameters, you need to edit <FontIcon icon="fas fa-folder-open"/>`/etc/`<FontIcon icon="fas fa-file-lines"/>`sysctl.conf` file and add the following or adjust parameters to improve system performance.

```sh title="/etc/sysctl.conf"
vm.dirty_background_ratio=5
vm.dirty_ratio=10
vm.min_free_kbytes=65536
kernel.sched_autogroup_enabled=0
```

These settings control how often dirty data is written to disk, reducing RAM usage.

---

## 8. Reduce Memory Usage with ZRAM

Zram and Zswap are compressed memory technologies that can reduce RAM usage.

```sh
sudo apt install zram-config 
sudo systemctl start zram-config
```

Once installed, you need to edit the GRUB configuration file (<FontIcon icon="fas fa-folder-open"/>`/etc/default/`<FontIcon icon="fas fa-file-lines"/>`grub`) and add:

```sh title="/etc/default/grub"
GRUB_CMDLINE_LINUX_DEFAULT="zswap.enabled=1"
```

Update GRUB and reboot:

```sh
sudo update-grub
sudo reboot
```

---

## 9. Limit CPU Usage of Processes

If a process is hogging the CPU, limit its usage using cpulimit.

```sh
sudo apt install cpulimit  # Debian/Ubuntu  
sudo yum install cpulimit  # RHEL/CentOS  
```

Limit a process (e.g., **firefox**) to 30% CPU usage.

```sh
sudo cpulimit -e firefox -l 30
```

To permanently limit a process, use systemd.

```sh
sudo systemctl set-property <SERVICE_NAME> CPUQuota=30%
```

---

## 10. Regularly Update Your System

Keeping your system updated ensures you have the latest performance improvements and bug fixes.

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-debian"/>,<FontIcon icon="fa-brands fa-ubuntu"/>

```sh
sudo apt update && sudo apt upgrade
```

@tab <FontIcon icon="fa-brands fa-fedora"/>,<FontIcon icon="fa-brands fa-centos"/>,<FontIcon icon="fa-brands fa-redhat"/>,<FontIcon icon="iconfont icon-rockylinux"/>

```sh
sudo yum update
```

:::

---

## Troubleshooting Tips

- If a process doesn’t terminate with `kill`, use `kill -9 PID` to force-kill it.
- If `zram` or `zswap` doesn’t work, ensure your kernel supports these features.
- If system performance doesn’t improve, consider upgrading your hardware (e.g., adding more RAM or switching to an SSD).

---

## Conclusion

Optimizing RAM and CPU usage on Linux is a blend of monitoring, tweaking, and occasionally upgrading hardware. By identifying resource-hogging processes, adjusting system settings, and opting for lightweight alternatives, you can breathe new life into your system.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Reduce RAM & CPU Usage on Linux",
  "desc": "In this guide, we’ll explore practical methods to reduce RAM and CPU usage on Linux, ensuring your system runs smoothly and efficiently.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/reduce-ram-cpu-usage-on-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
