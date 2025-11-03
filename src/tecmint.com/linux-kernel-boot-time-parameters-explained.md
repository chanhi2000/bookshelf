---
lang: en-US
title: "How to Control Kernel Boot-Time Parameters in Linux"
description: "Article(s) > How to Control Kernel Boot-Time Parameters in Linux"
icon: fa-brands fa-fedora
category:
  - DevOps
  - Linux
  - Fedora
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - fedora
  - redhat
  - centos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Control Kernel Boot-Time Parameters in Linux"
    - property: og:description
      content: "How to Control Kernel Boot-Time Parameters in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/linux-kernel-boot-time-parameters-explained.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-09-30
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/03/linux-kernel-boot-parameters.webp
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

[[toc]]

---

<SiteInfo
  name="How to Control Kernel Boot-Time Parameters in Linux"
  desc="In this article, you will learn everything about Linux kernel boot parameters, how to use them, troubleshoot startup issues, and optimize system performance."
  url="https://tecmint.com/linux-kernel-boot-time-parameters-explained"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/03/linux-kernel-boot-parameters.webp"/>

Linux booting is a complex process compared to other operating systems. The **Linux Kernel** accepts many parameters during boot, passed through the command line, which provide essential information to the kernel at system startup.

Think of these parameters as special instructions you give to the kernel before it even starts running the operating system.

::: info With them, you can tell the kernel:

- which disk contains your root filesystem?
- how much memory to use?
- whether to load certain hardware features.
- or even how to handle errors during startup.

:::

Without them, the kernel would not know how to properly initialize the system.

---

## Where Do Boot Parameters Come From?

Boot parameters are usually supplied by the bootloader, which is the small program that runs immediately after you [**power on your computer**](/tecmint.com/linux-boot-process.md), and its job is to load the kernel into memory.

- In most [**modern Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md), that bootloader is **GRUB (GRand Unified Bootloader)**.
- Some [**lightweight distributions**](/tecmint.com/lightweight-linux-distributions.md) may use **Syslinux** or **LILO**.

When the bootloader hands over control to the kernel, it also passes along these boot-time parameters.

![Boot Parameters Explained](https://tecmint.com/wp-content/uploads/2014/03/Boot-Parameters-Explained.webp)

Boot Parameters Explained

::: tip Example (from GRUB)

```sh
linux /vmlinuz-6.x root=/dev/sda1 ro quiet splash
```

**Here’s what’s happening:**

- `root=/dev/sda1` → Tells the kernel where the root filesystem lives.
- `ro` → Mounts the root filesystem as read-only at first.
- `quiet` → Hides most boot messages for a cleaner boot.
- `splash` → Displays a splash screen instead of text.

:::

So before Linux even starts initializing services, the kernel already knows what to do.

---

## How Boot Parameters Are Organized

Boot parameters aren’t just random switches; they are organized into categories based on the parts of the system they control.

Let’s explore them.

### 1. System Basics

These tell the kernel how to start and where to look for the root filesystem.

- `root=/dev/...` → Device containing the root filesystem.
- `ro` → Mount root filesystem read-only first (safest).
- `rw` → Mount the root filesystem read-write immediately.
- `init=/path/to/init` → Use a custom init program (e.g., for rescue or testing).

### 2. Console & Debugging

These parameters control the messages shown during system startup, which are especially useful for troubleshooting when something goes wrong.

- `quiet` → Suppress most boot messages.
- `debug` → Enable verbose debugging output.
- `console=ttyS0,115200` → Direct messages to a serial console (for remote debugging).
- `loglevel=3` → Control message verbosity (`0` = emergencies, `7` = full detail).

### 3. Hardware Control

Sometimes, hardware features like ACPI or APIC can cause issues, so you can tweak or disable them as needed:

- `noapic` → Disables APIC, useful for fixing certain issues on older hardware.
- `acpi=off` → Turns off ACPI, disabling advanced power management.
- `pci=noacpi` → Prevents ACPI from handling PCI interrupts.

### 4. Memory & CPU Management

Control how much memory and how many CPUs the kernel uses.

- `mem=512M` → Limit available memory to 512 MB.
- `maxcpus=2` → Use only 2 CPU cores.
- `nosmp` → Disable multiprocessor support entirely.

### 5. Recovery & Troubleshooting

Options for handling crashes, debugging, or temporarily bypassing security enforcement:

- `initcall_debug` → Trace initialization calls (debugging boot issues).
- `panic=10` → Reboot automatically 10 seconds after a kernel panic.
- `selinux=0` → Disable SELinux enforcement.

---

## How to Temporarily Add Boot Parameters

Sometimes you need to change how Linux boots, like disabling certain features (e.g., **ACPI**), without changing your system permanently. This is where temporary boot parameters come in.

Restart your computer and right after the **BIOS/UEFI** screen, access the GRUB menu. If it doesn’t appear automatically, hold <kbd>Shift</kbd> (for **BIOS** systems) or press <kbd>Esc</kbd> (for **UEFI** systems).

Highlight the kernel you want to boot and press `e` to edit the boot commands, and look for the line starting with `linux` or `linuxefi`. This line tells the system which kernel to load and which options to use.

At the end of that line, add your parameter(s). For example, to temporarily disable ACPI, you can add `acpi=off`:

```sh
linux /vmlinuz-6.x root=/dev/sda1 ro quiet splash acpi=off
```

Press <kbd>Ctrl</kbd>+<kbd>X</kbd> or <kbd>F10</kbd> to boot with these changes.

This will boot the system with your specified parameter for this session only. When you restart, the system will revert to its normal settings.

---

## How to Make Boot Parameters Permanent

If the temporarily set parameter works and you want it to be applied every time you boot, open the GRUB configuration file for editing.

```sh
sudo nano /etc/default/grub
```

Look for the line that says:

```sh
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

Add your parameter(s) inside the quotes. For example, to disable ACPI permanently:

```sh
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash acpi=off"
```

Save the file and exit the editor.

Then update GRUB so it applies your changes:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>

```sh
sudo update-grub
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

:::

Reboot your system to apply the parameter automatically every time you boot.

---

## Top 10 Boot Parameters Every Linux Admin Should Know

These are the most commonly used Linux kernel boot parameters that every system administrator should be familiar with. They help control system startup, manage hardware, optimize performance, and troubleshoot boot issues quickly.

Keep this cheat sheet handy as a reference whenever you need to tweak or debug Linux boot behavior.

| **Parameter** | **Category** | **Purpose / Description** |
| --- | --- | --- |
| `root=/dev/sda1` | System Basics | Specifies the device containing the root filesystem. |
| `ro` | System Basics | Mounts the root filesystem as read-only at boot for safety. |
| `rw` | System Basics | Mounts the root filesystem read-write immediately. |
| `quiet` | Console / Debugging | Suppresses most boot messages for a cleaner boot. |
| `debug` | Console / Debugging | Enables verbose kernel messages to help troubleshoot boot issues. |
| `acpi=off` | Hardware Control | Disables ACPI (Advanced Configuration and Power Interface), useful for troubleshooting hardware issues. |
| `noapic` | Hardware Control | Disables the Advanced Programmable Interrupt Controller; helps with some older hardware issues. |
| `mem=512M` | Memory & CPU | Limits the available memory to 512 MB for testing or troubleshooting purposes. |
| `maxcpus=2` | Memory & CPU | Limits the system to using only 2 CPU cores. |
| `init=/path/to/init` | Recovery / Custom Init | Allows booting with a custom init program, useful for rescue mode or debugging. |

---

## Final Thoughts

Boot-time parameters are like secret keys to the Linux kernel; they allow you to control exactly how the system starts, how hardware is initialized, and how problems are handled.

Whether you are debugging a stubborn boot issue, tuning performance, or experimenting with kernel features, these parameters give you low-level power over your Linux machine.

So the next time your Linux box refuses to boot, or you just want to squeeze a bit more performance out of your system, remember, the answer may lie in a few extra words on the kernel command line.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Control Kernel Boot-Time Parameters in Linux",
  "desc": "In this article, you will learn everything about Linux kernel boot parameters, how to use them, troubleshoot startup issues, and optimize system performance.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/linux-kernel-boot-time-parameters-explained.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
