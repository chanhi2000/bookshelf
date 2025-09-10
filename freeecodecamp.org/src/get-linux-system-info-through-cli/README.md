---
lang: en-US
title: "How to Get Information About Your Linux System Through the Command Line"
description: "Article(s) > How to Get Information About Your Linux System Through the Command Line"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Debian
  - Fedora
  - Shell
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - debian
  - fedora
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Get Information About Your Linux System Through the Command Line"
    - property: og:description
      content: "How to Get Information About Your Linux System Through the Command Line"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/get-linux-system-info-through-cli.html
prev: /devops/linux-debian/articles/README.md
date: 2025-06-11
isOriginal: false
author:
  - name: Zaira Hira
    url : https://freecodecamp.org/news/author/zaira/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1749636399891/4b457f71-2d18-463a-b98a-e19ff5a6b769.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debain > Article(s)",
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

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Get Information About Your Linux System Through the Command Line"
  desc="Whether you’ve just gained access to a new Linux system, ethically hacked into one as part of a security test, or you’re just curious to know more about your current machine, this article will guide you through the process. You’ll learn how you can g..."
  url="https://freecodecamp.org/news/get-linux-system-info-through-cli"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1749636399891/4b457f71-2d18-463a-b98a-e19ff5a6b769.png"/>

Whether you’ve just gained access to a new Linux system, ethically hacked into one as part of a security test, or you’re just curious to know more about your current machine, this article will guide you through the process.

You’ll learn how you can get information related to your OS (operating system), kernel, CPU, memory, processes, disks, networks, and installed software. You’ll explore the commands and their outputs in detail.

---

## Table of Contents

- [Why It's Important to Understand Your Linux System](#heading-why-its-important-to-understand-your-linux-system)
- [How to Get Your OS & Kernel Information in Linux](#heading-how-to-get-your-os-amp-kernel-information-in-linux)
- [How to Get Your CPU Information in Linux](#heading-how-to-get-your-cpu-information-in-linux)
- [How to Get Your Memory Information in Linux](#heading-how-to-get-your-memory-information-in-linux)
- [How to Get Your Disk & Filesystem Information in Linux](#heading-how-to-get-your-disk-amp-filesystem-information-in-linux)
- [How to Get Your Hardware Information in Linux](#heading-how-to-get-your-hardware-information-in-linux)
- [How to Get Your Network Interfaces & Status Information in Linux](#heading-how-to-get-your-network-interfaces-amp-status-information-in-linux)
- [How to Get Your Software & Services Information in Linux](#heading-how-to-get-your-software-amp-services-information-in-linux)
- [How to Get Your Logs & Dmesg In formation in Linux](#heading-how-to-get-your-logs-amp-dmesg-in-formation-in-linux)
- [How to Get Your Security/User Audit Information in Linux](#heading-how-to-get-your-securityuser-audit-information-in-linux)
- [Visually Appealing Commands](#heading-visually-appealing-commands)

---

## Why It's Important to Understand Your Linux System

### System Administration

System administrators need to have an understanding of the system so they are able to:

- Manage users, groups, and permissions effectively.
- Configure services like web servers, databases, and so on.
- Automate repetitive tasks with scripts and cron jobs.

### Troubleshooting

When the system is in a problematic state, a solid understanding of the system specification and configuration helps you to:

- Identify and resolve system errors quickly.
- Analyze system logs and monitor performance.
- Diagnose network and hardware issues.

### Security Auditing

If you are in a security related role, knowing your system in depth helps you to:

- Monitor logs for unauthorized access.
- Configure firewalls and security policies.
- Detect and remove malicious processes or software.

### Performance Optimization

If you know how to gather information related to system resources, you can measure them and create a projection for the future use. You can also:

- Tune system parameters for better efficiency.
- Monitor resource usage (CPU, memory, disk, I/O).
- Eliminate bottlenecks and optimize workloads.

### Proactive Maintenance

It is a good practice to be able to prevent issues before they occur. Once you know your system well, you can:

- Schedule regular updates and backups.
- Ensure system reliability and uptime.

Understanding your Linux system gives you greater control, enhances system stability, and improves your overall effectiveness as a system administrator or power user.

In the next section, we’ll discuss some essential commands for gathering system information.

---

## How to Get Your OS & Kernel Information in Linux

### `uname -a` Command

`uname -a` provides full kernel information:

```sh
uname -a
#
# Linux ip-172-31-90-178 6.8.0-1024-aws #26-Ubuntu SMP Tue Feb 18 17:22:37 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux
```

Here is what each part means in the above command:

- `Linux`: The kernel name.
- `ip-172-31-90-178`: The network hostname of the system.
- `6.8.0-1024-aws`: The kernel version and AWS-specific build.
- `#26-Ubuntu`: The kernel build number.
- `SMP`: Symmetric Multi-Processing, indicating that the kernel is compiled for multiple processors.
- `Tue Feb 18 17:22:37 UTC 2025`: The date and time when the kernel was compiled.
- `x86_64 x86_64 x86_64`: The machine hardware name (architecture), processor type, and platform type, all indicating 64-bit x86 architecture.
- `GNU/Linux`: The operating system name.

Based on this output, I’m running on an AWS EC2 instance with a 64-bit Ubuntu Linux distribution using a kernel that was specifically built for AWS infrastructure.

### `uname -r` and `uname -s` Commands

The `uname -r` and `uname -s` commands specify the kernel version and OS type information:

```sh
uname -r
# 
# 6.11.0-25-generic

uname -s
# 
# Linux
```

### `cat /etc/os-release` Command

The `cat /etc/os-release` command provides distribution information:

```sh
cat /etc/os-release
# 
# PRETTY_NAME="Ubuntu 24.04.2 LTS"
# NAME="Ubuntu"
# VERSION_ID="24.04"
# VERSION="24.04.2 LTS (Noble Numbat)"
# VERSION_CODENAME=noble
# ID=ubuntu
# ID_LIKE=debian
# HOME_URL="https://www.ubuntu.com/"
# SUPPORT_URL="https://help.ubuntu.com/"
# BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
# PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
# UBUNTU_CODENAME=noble
# LOGO=ubuntu-logo
```

Here is what each part means in the above command:

- `PRETTY_NAME="Ubuntu 24.04.2 LTS"`: The user-friendly name of the distribution including version and LTS (Long Term Support) designation.
- `NAME="Ubuntu"`: The name of the Linux distribution.
- `VERSION_ID="24.04"`: The version number of the Ubuntu release (Year/Month format).
- `VERSION="24.04.2 LTS (Noble Numbat)"`: The complete version information including:
  - `24.04`: Major version (released April 2024)
  - `.2`: Point release number
  - `LTS`: Long Term Support
  - `Noble Numbat`: The release codename
- `VERSION_CODENAME=noble`: The codename for this Ubuntu release ("Noble").
- `ID=ubuntu`: The machine-readable name of the operating system.
- `ID_LIKE=debian`: Indicates that Ubuntu is based on Debian Linux.
- `HOME_URL`, `SUPPORT_URL`, `BUG_REPORT_URL`, `PRIVACY_POLICY_URL` : Various official URLs for Ubuntu resources.
- `UBUNTU_CODENAME=noble`: Reiterates the codename of this Ubuntu release.
- `LOGO=ubuntu-logo`: Specifies the logo identifier for the distribution.

This output shows that I’m running Ubuntu 24.04.2 LTS (codenamed "Noble Numbat"), which is a Long Term Support release of Ubuntu. Being an LTS version means it will receive security updates and support for an extended period (typically 5 years for Ubuntu LTS releases).

### `hostnamectl` Command

`hostnamectl` shows the hostname, OS, and kernel info:

```sh
hostnamectl
# 
#  Static hostname: ip-172-31-90-178
#        Icon name: computer-vm
#          Chassis: vm 🖴
#       Machine ID: ec272830b6dca2da0d11e41b292cfc99
#          Boot ID: dd12f48ff01b44a796991d99ce1bcfde
#   Virtualization: xen
# Operating System: Ubuntu 24.04.2 LTS              
#           Kernel: Linux 6.8.0-1024-aws
#     Architecture: x86-64
#  Hardware Vendor: Xen
#   Hardware Model: HVM domU
# Firmware Version: 4.11.amazon
#    Firmware Date: Thu 2006-08-24
#     Firmware Age: 18y 9month 1w 2d
```

In the above command, here is what each part means:

- `Static hostname: "ip-172-31-90-178"`: This is the permanent hostname of the system, stored in `/etc/hostname`.
- `Icon name: "computer-vm"`: A symbolic icon identifier for the system, used by some desktop environments.
- `Chassis: "vm"`: Indicates this is running in a virtual machine environment.
- `Machine ID: "ec272830b6dca2da0d11e41b292cfc99"`: A unique identifier for this system, stored in `/etc/machine-id`.
- `Boot ID: "dd12f48ff01b44a796991d99ce1bcfde"`: A unique identifier that changes with each system boot.
- `Virtualization: "xen"`: Shows that this system is running on Xen virtualization (common for AWS instances).
- `Operating System: "Ubuntu 24.04.2 LTS"`: The current OS distribution and version.
- `Kernel: "Linux 6.8.0-1024-aws"`: The current Linux kernel version, specifically an AWS-optimized kernel.
- `Architecture: "x86-64"`: The CPU architecture of the system.
- `Hardware Vendor: "Xen" Hardware Model: "HVM domU"`: Indicates this is a Xen HVM (Hardware Virtual Machine) domain user instance.
- Firmware Details:
  - `Version: 4.11.amazon`: This is the version of the firmware/BIOS specifically customized for AWS environments.
  - `Date: Thu 2006-08-24`: This is the release date of the firmware. The date might seem old (2006) but this is normal for AWS instances.
  - `Age: 18y 9month 1w` : This shows how old the firmware is relative to the current date calculated from the firmware date (2006) to now (2025). While the firmware seems old, it is still maintained and secure.

This overall output shows that I’m running Ubuntu 24.04.2 LTS on an AWS EC2 instance using Xen virtualization. The system is using an AWS-optimized kernel and is configured as a HVM (Hardware Virtual Machine) instance.

---

## How to Get Your CPU Information in Linux

### `lscpu` Command

`lscpu` shows CPU architecture, cores, threads, and virtualization information:

```sh :collapsed-lines
lscpu
# 
# Architecture:             x86_64
#   CPU op-mode(s):         32-bit, 64-bit
#   Address sizes:          46 bits physical, 48 bits virtual
#   Byte Order:             Little Endian
# CPU(s):                   1
#   On-line CPU(s) list:    0
# Vendor ID:                GenuineIntel
#   Model name:             Intel(R) Xeon(R) CPU E5-2686 v4 @ 2
#                           .30GHz
#     CPU family:           6
#     Model:                79
#     Thread(s) per core:   1
#     Core(s) per socket:   1
#     Socket(s):            1
#     Stepping:             1
#     BogoMIPS:             4599.99
#     Flags:                fpu vme de pse tsc msr pae mce cx8 
#                           apic sep mtrr pge mca cmov pat pse3
#                           6 clflush mmx fxsr sse sse2 ht sysc
#                           all nx rdtscp lm constant_tsc rep_g
#                           ood nopl xtopology cpuid tsc_known_
#                           freq pni pclmulqdq ssse3 fma cx16 p
#                           cid sse4_1 sse4_2 x2apic movbe popc
#                           nt tsc_deadline_timer aes xsave avx
#                            f16c rdrand hypervisor lahf_lm abm
#                            pti fsgsbase bmi1 avx2 smep bmi2 e
#                           rms invpcid xsaveopt
# Virtualization features:  
#   Hypervisor vendor:      Xen
#   Virtualization type:    full
# Caches (sum of all):      
#   L1d:                    32 KiB (1 instance)
#   L1i:                    32 KiB (1 instance)
#   L2:                     256 KiB (1 instance)
#   L3:                     45 MiB (1 instance)
# NUMA:                     
#   NUMA node(s):           1
#   NUMA node0 CPU(s):      0
# Vulnerabilities:          
#   Gather data sampling:   Not affected
#   Itlb multihit:          KVM: Mitigation: VMX unsupported
#   L1tf:                   Mitigation; PTE Inversion
#   Mds:                    Vulnerable: Clear CPU buffers attem
#                           pted, no microcode; SMT Host state 
#                           unknown
#   Meltdown:               Mitigation; PTI
#   Mmio stale data:        Vulnerable: Clear CPU buffers attem
#                           pted, no microcode; SMT Host state 
#                           unknown
#   Reg file data sampling: Not affected
#   Retbleed:               Not affected
#   Spec rstack overflow:   Not affected
#   Spec store bypass:      Vulnerable
#   Spectre v1:             Mitigation; usercopy/swapgs barrier
#                           s and __user pointer sanitization
#   Spectre v2:             Mitigation; Retpolines; STIBP disab
#                           led; RSB filling; PBRSB-eIBRS Not a
#                           ffected; BHI Retpoline
#   Srbds:                  Not affected
#   Tsx async abort:        Not affected
```

Here is a brief explanation of the output above:

#### 1. Basic CPU Info

- Architecture: `x86_64` (64-bit)
- CPU Model: Intel Xeon E5-2686 v4 (2.3 GHz)
- Cores/Threads: 1 core, 1 thread (no Hyper-Threading)
- Physical CPU (Socket): 1

#### 2. Performance & Features

- Cache Sizes:
  - L1: 32 KiB (data) + 32 KiB (instructions)
  - L2: 256 KiB
  - L3: 45 MiB (large, typical for Xeon)
  - Flags: Supports AVX, AES, SSE4.1/4.2 (useful for encryption/vector ops).

#### 3. Virtualization

- Hypervisor: Running on Xen (full virtualization).
- Virtualization Support: Yes (Intel VT-x).

#### 4. Security (Vulnerabilities)

- Meltdown/Spectre: Mostly mitigated (PTI, Retpolines).
- MDS/MMIO: Vulnerable (no microcode fixes).
- Spec Store Bypass: Vulnerable (no mitigation).

#### 5. NUMA (Memory)

- Single NUMA node (no multi-processor complexity).

The output shows that my machine is a single-core Intel Xeon (in a virtualized/cloud environment) with large L3 cache but has some unpatched CPU vulnerabilities.

### `cat /proc/cpuinfo` Command

`cat /proc/cpuinfo` provides more in-depth details about the CPU:

```sh :collapsed-lines
cat /proc/cpuinfo 
# 
# processor    : 0
# vendor_id    : GenuineIntel
# cpu family    : 6
# model        : 79
# model name    : Intel(R) Xeon(R) CPU E5-2686 v4 @ 2.30GHz
# stepping    : 1
# microcode    : 0xd000404
# cpu MHz        : 2299.998
# cache size    : 46080 KB
# physical id    : 0
# siblings    : 1
# core id        : 0
# cpu cores    : 1
# apicid        : 0
# initial apicid    : 0
# fpu        : yes
# fpu_exception    : yes
# cpuid level    : 13
# wp        : yes
# flags        : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ht syscall nx rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm pti fsgsbase bmi1 avx2 smep bmi2 erms invpcid xsaveopt
# bugs        : cpu_meltdown spectre_v1 spectre_v2 spec_store_bypass l1tf mds swapgs itlb_multihit mmio_stale_data bhi
# bogomips    : 4599.99
# clflush size    : 64
# cache_alignment    : 64
# address sizes    : 46 bits physical, 48 bits virtual
# power management:
```

### `nproc` Command

`nproc` shows the core count:

```sh
nproc
# 
# 1
```

The above command output shows there is one available processor.

---

## How to Get Your Memory Information in Linux

### `free -h` Command

You can use the `free -h` command to know the total/used/free RAM:

```sh
free -h
#
#                total        used        free      shared  buff/cache   available
# Mem:           957Mi       406Mi       218Mi       920Ki       522Mi       551Mi
# Swap:             0B          0B          0B
```

Here is a breakdown of the output shared above:

- `total`: The total amount of physical memory (RAM) or swap space available on the system.
- `used`: The amount of memory currently being used by applications and the system. Calculated as: `total - free - buffers - cache`.
- `free`: The amount of memory that is completely unused.
- `shared`: Memory that may be simultaneously accessed by multiple programs.
- `buff/cache`: Combines two types of memory:
  - Buffers: Memory used for block device I/O buffering.
  - Cache: Memory used for file system page cache - This memory can be reclaimed when needed by applications.
  - `available`: It includes the 'free' memory plus memory that can be reclaimed from `buff/cache`. This is the most important column for determining if you have enough memory.

### `vmstat` Command

`vmstat` stands for Virtual Memory Statistics, a tool to monitor system performance. It provides information about memory usage, CPU activity, Processes, Disk I/O and Swap usage.

You can also use `vmstat` to extract live information. Here is how you can do that:

```sh
vmstat 1 5
# 
# procs -----------memory---------- ---swap-- -----io---- -system-- -------cpu-------
#  r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st gu
#  1  0      0 238264  46120 489056    0    0     3     8   23    0  0  0 82  0 18  0
#  0  0      0 238264  46120 489060    0    0     0     0  240  120  0  1 98  0  1  0
#  0  0      0 238264  46120 489060    0    0     0     0  239  124  0  0 98  0  2  0
#  0  0      0 238264  46120 489060    0    0     0     0  199  101  0  0 95  0  5  0
#  0  0      0 238264  46120 489060    0    0     0     0   36   25  0  0 78  0 22  0
```

Here is what the above command is doing:

1. Captures 5 snapshots of system performance.
2. Each snapshot is taken 1 second apart, giving near real-time insights.
3. Displays key metrics about:
    - Memory usage (free, buffered, cached).
    - CPU activity (user, system, idle, waiting).
    - Processes (running, blocked).
    - Disk I/O (blocks read/written).
    - Swap usage (if swapping is happening).

Note that, you can replace the interval and number of snapshots accordingly.

Here’s a detailed breakdown of the output above:

- `Procs`:
  - `r`: Number of processes waiting for run time.
  - `b`: Number of processes in uninterruptible sleep
- `Memory` (in KB):
  - `swpd`: Amount of virtual memory used
  - `free`: Amount of idle memory
  - `buff`: Memory used as buffers
  - `cache`: Memory used as cache
- `Swap`:
  - `si`: Memory swapped in from disk (KB/s)
  - `so`: Memory swapped out to disk (KB/s)
- `IO`:
  - `bi`: Blocks received from a block device (blocks/s)
  - `bo`: Blocks sent to a block device (blocks/s)
- `System`:
  - `in`: Number of interrupts per second
  - `cs`: Number of context switches per second
- `CPU` (percentages):
    1. `us`: Time spent running user code
    2. `sy`: Time spent running system code
    3. `id`: Time spent idle
    4. `wa`: Time spent waiting for IO
    5. `st`: Time stolen from a virtual machine
    6. `gu`: Time running guest code (virtual CPU)

From the output, you can see that my system:

- Has very low CPU usage (high idle percentage)
- Has no swap being used (`swpd = 0`)
- Has about `99MB` free memory
- Shows minimal IO activity
- Is running in a virtualized environment 

::: note 

notice the `st` (stolen) time column has non-zero value

:::

The first line shows averages since the last reboot, while subsequent lines show the real-time statistics for each second.

### `cat /proc/meminfo` Command

`cat /proc/meminfo` shows detailed memory stats:

```sh :collapsed-lines
cat /proc/meminfo
# 
# MemTotal:         980384 kB
# MemFree:          245100 kB
# MemAvailable:     585896 kB
# Buffers:           46184 kB
# Cached:           393672 kB
# SwapCached:            0 kB
# Active:           141404 kB
# Inactive:         356376 kB
# Active(anon):      47672 kB
# Inactive(anon):    29300 kB
# Active(file):      93732 kB
# Inactive(file):   327076 kB
# Unevictable:       36528 kB
# Mlocked:           27152 kB
# SwapTotal:             0 kB
# SwapFree:              0 kB
# Zswap:                 0 kB
# Zswapped:              0 kB
# Dirty:                 0 kB
# Writeback:             0 kB
# AnonPages:         94488 kB
# Mapped:            97936 kB
# Shmem:               920 kB
# KReclaimable:      95396 kB
# Slab:             148672 kB
# SReclaimable:      95396 kB
# SUnreclaim:        53276 kB
# KernelStack:        2444 kB
# PageTables:         3224 kB
# SecPageTables:         0 kB
# NFS_Unstable:          0 kB
# Bounce:                0 kB
# WritebackTmp:          0 kB
# CommitLimit:      490192 kB
# Committed_AS:     508912 kB
# VmallocTotal:   34359738367 kB
# VmallocUsed:        9988 kB
# VmallocChunk:          0 kB
# Percpu:            14848 kB
# HardwareCorrupted:     0 kB
# AnonHugePages:         0 kB
# ShmemHugePages:        0 kB
# ShmemPmdMapped:        0 kB
# FileHugePages:         0 kB
# FilePmdMapped:         0 kB
# Unaccepted:            0 kB
# HugePages_Total:       0
# HugePages_Free:        0
# HugePages_Rsvd:        0
# HugePages_Surp:        0
# Hugepagesize:       2048 kB
# Hugetlb:               0 kB
# DirectMap4k:       71680 kB
# DirectMap2M:      976896 kB
```

Here is a detailed breakdown of the output shared above:

- Total Memory and Available Memory:
  - `MemTotal`: Total physical RAM available.
  - `MemFree`: Completely unused memory.
  - `MemAvailable`: Memory available for new applications.
- Memory Caches and Buffers:
  - `Buffers`: Memory used for block device I/O buffering.
  - `Cached`: Memory used for file system cache.
  - `SwapCached`: Memory pages stored in both RAM and swap.
- Active vs Inactive Memory:
  - `Active`: Recently used memory.
  - `Inactive`: Less recently used memory.
  - `Active(anon)`: Recently used anonymous memory.
  - `Active(file)`: Recently used file-backed memory.
- Swap Information:
  - `SwapTotal`: Swap space configured.
  - `SwapFree`: Swap space available.
  - `Zswap`: Compressed swap in RAM.
- Other Important Metrics:
  - `Dirty`: Memory waiting to be written to disk.
  - `Mapped`: Files mapped into memory.
  - `Slab`: Kernel data structures cache.
  - `CommitLimit`: Total memory available for allocation.
  - `Committed_AS`: Total memory currently allocated.

A healthy memory usage is indicated by a good amount of available memory, active caching mechanisms in place and no memory pressure (no swap usage needed).

---

## How to Get Your Disk & Filesystem Information in Linux

### `tree -d -L 1` Command

`tree -d -L 1` shows the file system details from the folder it is executed in. To find the complete file system details, run it from the root `/` folder:

```sh
tree -d -L 1
# 
# .
# ├── bin -> usr/bin
# ├── bin.usr-is-merged
# ├── boot
# ├── dev
# ├── etc
# ├── home
# ├── lib -> usr/lib
# ├── lib.usr-is-merged
# ├── lib64 -> usr/lib64
# ├── lost+found
# ├── media
# ├── mnt
# ├── opt
# ├── proc
# ├── root
# ├── run
# ├── sbin -> usr/sbin
# ├── sbin.usr-is-merged
# ├── snap
# ├── srv
# ├── sys
# ├── tmp
# ├── usr
# └── var
# 
# 25 directories
```

The command output of `tree -d -L 1` shows a directory tree structure with the following options:

::: tabs

@tab:active `-d`

Shows only directories (ignores files)

@tab `-L 1`

Limits the depth of the tree to one level (only shows the immediate subdirectories)

@tab `df -h`

mounted filesystems and usage:

```sh
df -h
# 
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/root        29G  2.6G   26G   9% /
# tmpfs           479M     0  479M   0% /dev/shm
# tmpfs           192M  908K  191M   1% /run
# tmpfs           5.0M     0  5.0M   0% /run/lock
# /dev/xvda16     881M  144M  676M  18% /boot
# /dev/xvda15     105M  6.1M   99M   6% /boot/efi
# tmpfs            96M   12K   96M   1% /run/user/1000
```

The above output from the `df -h` command shows the following disk space usage information:

- `Filesystem`: The name of the mounted filesystem/device.
- `Size`: Total size of the filesystem.
- `Used`: Amount of space used.
- `Avail`: Amount of space available.
- `Use%`: Percentage of space used.
- `Mounted on`: The mount point where the filesystem is attached

:::

### `lsblk` Command

`lsblk` stands for ‘list block devices’ and shows information about all available block devices like hard drives, SSDs, and so on.

```sh
lsblk
# 
# NAME     MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
# loop0      7:0    0 26.3M  1 loop /snap/amazon-ssm-agent/9881
# loop1      7:1    0 73.9M  1 loop /snap/core22/1748
# loop2      7:2    0 44.4M  1 loop /snap/snapd/23545
# loop3      7:3    0 50.9M  1 loop /snap/snapd/24505
# loop4      7:4    0 73.9M  1 loop /snap/core22/1963
# loop5      7:5    0 27.2M  1 loop /snap/amazon-ssm-agent/11320
# xvda     202:0    0   30G  0 disk 
# ├─xvda1  202:1    0   29G  0 part /
# ├─xvda14 202:14   0    4M  0 part 
# ├─xvda15 202:15   0  106M  0 part /boot/efi
# └─xvda16 259:0    0  913M  0 part /boot
```

The output above shows the following details:

- `NAME`: Device name.
- `MAJ:MIN`: Major and minor device numbers.
- `RM`: Removable flag (1 for removable, 0 for fixed).
- `SIZE`: Device size.
- `RO`: Read-only flag (1 for read-only, 0 for read-write).
- `TYPE`: Device type (disk, part for partition, loop for loop device).
- `MOUNTPOINTS`: Where the device is mounted.

### `fdisk -l` Command

`fdisk -l` shows all disk devices and their partitions on your system:

```sh
fdisk -l
# 
# Disk /dev/xvda: 30 GiB, 32212254720 bytes, 62914560 sectors
# Units: sectors of 1 * 512 = 512 bytes
# Sector size (logical/physical): 512 bytes / 512 bytes
# I/O size (minimum/optimal): 512 bytes / 512 bytes
# Disklabel type: gpt
# Disk identifier: E3478E01-32E3-4FC2-8E79-1BCCDE89C2D7
# 
# Device        Start      End  Sectors  Size Type
# /dev/xvda1  2099200 62914526 60815327   29G Linux filesystem
# /dev/xvda14    2048    10239     8192    4M BIOS boot
# /dev/xvda15   10240   227327   217088  106M EFI System
# /dev/xvda16  227328  2097152  1869825  913M Linux extended boot
```

The above output shows the partition information for the the main system disk (`/dev/xvda`) which is 30 GiB in size and has four partitions:

- `/dev/xvda1`: `29G` Linux filesystem (main system partition).
- `/dev/xvda14`: `4M` BIOS boot partition.
- `/dev/xvda15`: `106M` EFI System partition (for UEFI boot).
- `/dev/xvda16`: `913M` Linux extended boot partition.

### `mount` Command

`mount` shows all currently mounted filesystems in the format: `device/source "on" mount_point "type" filesystem_type (mount_options)`, displaying where and how each filesystem is attached to your system's directory tree.

Here is an example line from the output of `mount`:

```sh
mount
# 
# /dev/xvda1 on / type ext4 (rw,relatime,discard,errors=remount-ro,commit=30)
```

Some common mount options you’ll see are:

- `rw`: Read-write access.
- `ro`: Read-only access.
- `nosuid`: Disable SUID/SGID bits.
- `nodev`: Prevent device file interpretation.
- `noexec`: Prevent execution of binaries.
- `relatime`: Update access times relatively.

### `du -sh *` Command

`du -sh *` provides a summary of the disk usage for each file and directory in the current directory (good for finding disk hogs):

```sh
du -sh *
# 
# 4.0K    file1.txt
# 8.0K    file2.txt
# 12K     directory1
# 20K     directory2
```

---

## How to Get Your Hardware Information in Linux

### `lshw` Command

The `lshw` command provides detailed information about the computer's hardware configuration. It can report:

- Memory configuration.
- Firmware version.
- Mainboard configuration.
- CPU version and speed.
- Cache configuration.
- Bus speed and more.

It's particularly useful for system administrators and users who need to gather detailed hardware information. The command can output information in various formats including HTML, XML, JSON, or plain text.

Here is a portion of the output from `lshw`:

```sh :collapsed-lines
lshw
# 
# *-pci
#           description: Host bridge
#           product: 440FX - 82441FX PMC [Natoma]
#           vendor: Intel Corporation
#           physical id: 100
#           bus info: pci@0000:00:00.0
#           version: 02
#           width: 32 bits
#           clock: 33MHz
#         *-isa
#              description: ISA bridge
#              product: 82371SB PIIX3 ISA [Natoma/Triton II]
#              vendor: Intel Corporation
#              physical id: 1
#              bus info: pci@0000:00:01.0
#              version: 00
#              width: 32 bits
#              clock: 33MHz
#              capabilities: isa bus_master
#              configuration: latency=0
```

### `lspci` Command

`lspci` displays information about all PCI (Peripheral Component Interconnect) buses and devices connected to your system.

```sh
lspci
#
#00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma] (rev 02)
#00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]
#00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]
#00:01.3 Bridge: Intel Corporation 82371AB/EB/MB PIIX4 ACPI (rev 01)
#00:02.0 VGA compatible controller: Cirrus Logic GD 5446
#00:03.0 Unassigned class [ff80]: XenSource, Inc. Xen Platform Device (rev 01)
```

From the output, we can see that:

- Each line starts with a `bus:device.function` address (like "`00:00.0`")
- Following the address is the device class and the specific hardware details:
  - A Host bridge (`Intel 440FX`), which manages communications between the CPU and other components.
  - An ISA bridge (`Intel PIIX3`), for legacy device support.
  - An IDE interface for storage devices.
  - An ACPI bridge for power management.
  - A VGA graphics controller (Cirrus Logic).
  - A Xen Platform Device (this suggests you're running in a Xen virtualized environment).

The command is particularly useful for:

- Troubleshooting hardware issues
- Verifying hardware detection
- Finding hardware details for driver installation
- Checking system configuration

---

## How to Get Your Network Interfaces & Status Information in Linux

### `ip a` Command

`ip a` displays information about all network interfaces on your system:

```sh
ip a
# 
# 1: lo: <LOOPBACK,UP,LOWER_UP>
# - This is the loopback interface (localhost)
# - MTU (Maximum Transmission Unit) is 65536 bytes
# - IP address: 127.0.0.1/8 (IPv4)
# - IPv6 address: ::1/128
# 
# 2. Network Interface (enX0):
# enX0: <BROADCAST,MULTICAST,UP,LOWER_UP>
# - This is your main network interface
# - MTU is 9001 bytes
# - MAC address (link/ether): 12:16:a6:d3:b3:61
# - IPv4 address: 172.31.90.178/20
# - IPv6 address: fe80::1016:a6ff:fed3:b361/64 (Link-local)
```

Here are the key elements in the output:

- Interface state (UP/DOWN).
- MAC address (link/ether).
- IPv4 and IPv6 addresses.
- Network scope (host, global, link).
- Address validity lifetime (valid_lft).
- Broadcast address (brd).

### `ip r` Command

`ip r` shows the system’s routing table:

```sh
ip r
# 
# default via 172.31.80.1 dev enX0 proto dhcp src 172.31.90.178 metric 100 
# 172.31.0.2 via 172.31.80.1 dev enX0 proto dhcp src 172.31.90.178 metric 100 
# 172.31.80.0/20 dev enX0 proto kernel scope link src 172.31.90.178 metric 100 
# 172.31.80.1 dev enX0 proto dhcp scope link src 172.31.90.178 metric 100
```

The above `ip r` output shows my system's routing table with the following routes:

- Default Route (Gateway):
  - Default via `172.31.80.1`: All traffic not matching other rules goes through this gateway.
  - Using interface `enX0`.
  - Configured via DHCP.
  - Source IP: `172.31.90.178`.
- Local Network:
  - `172.31.80.0/20`: Local subnet (covers IPs from `172.31.80.0` to `172.31.95.255`)
  - Directly connected to `enX0` interface
  - Kernel-managed route (proto kernel)
  - For packets originating from `172.31.90.178`
- DHCP Route:
  - Direct route to DHCP server (`172.31.80.1`)
  - Via interface `enX0`

All routes have a metric of 100, which determines route priority (lower values are preferred).

`netstat -tuln` shows active listening ports:

```sh
netstat -tuln
# 
# Active Internet connections (only servers)
# Proto Recv-Q Send-Q Local Address           Foreign Address         State      
# tcp        0      0 127.0.0.54:53           0.0.0.0:*               LISTEN     
# tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN     
# tcp        0      0 127.0.0.53:53           0.0.0.0:*               LISTEN     
# tcp6       0      0 :::80                   :::*                    LISTEN     
# tcp6       0      0 :::22                   :::*                    LISTEN     
# udp        0      0 127.0.0.54:53           0.0.0.0:*                          
# udp        0      0 127.0.0.53:53           0.0.0.0:*                          
# udp        0      0 172.31.90.178:68        0.0.0.0:*                          
# udp        0      0 127.0.0.1:323           0.0.0.0:*                          
# udp6       0      0 ::1:323                 :::*
```

---

## How to Get Your Software & Services Information in Linux

### Installed packages

You can check installed packages with `dpkg -l`, `apt list --installed` (Debian/Ubuntu). Here is a snippet from the output:

```sh
apt list --installed
# 
# vim-common/noble-updates,noble-security,now 2:9.1.0016-1ubuntu7.8 all [installed,automatic]
# vim-runtime/noble-updates,noble-security,now 2:9.1.0016-1ubuntu7.8 all [installed,automatic]
# vim-tiny/noble-updates,noble-security,now 2:9.1.0016-1ubuntu7.8 amd64 [installed,automatic]
# vim/noble-updates,noble-security,now 2:9.1.0016-1ubuntu7.8 amd64 [installed,automatic]
```

### Service status

`systemctl list-units --type=service` lists the services. You can also use `systemctl status <service>` and replace `<service>` with the one you want.

Here’s the output for `cron.service`:

```sh
systemctl status cron.service
# 
# ● cron.service - Regular background program processing daemon
#      Loaded: loaded (/usr/lib/systemd/system/cron.service; enabled; preset: enabled)
#      Active: active (running) since Wed 2025-05-14 19:46:58 UTC; 2 weeks 5 days ago
#        Docs: man:cron(8)
#    Main PID: 625 (cron)
#       Tasks: 1 (limit: 1129)
#      Memory: 1.7M (peak: 4.7M)
#         CPU: 20.890s
#      CGroup: /system.slice/cron.service
#              └─625 /usr/sbin/cron -f -P
# 
# Jun 03 09:25:01 ip-172-31-90-178 CRON[121748]: pam_unix(cron:session): session closed for user root
# Jun 03 09:35:01 ip-172-31-90-178 CRON[121817]: pam_unix(cron:session): session opened for user root(uid=0) by root(uid=0)
# Jun 03 09:35:01 ip-172-31-90-178 CRON[121818]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
# Jun 03 09:35:01 ip-172-31-90-178 CRON[121817]: pam_unix(cron:session): session closed for user root
# Jun 03 09:45:01 ip-172-31-90-178 CRON[122050]: pam_unix(cron:session): session opened for user root(uid=0) by root(uid=0)
# Jun 03 09:45:01 ip-172-31-90-178 CRON[122051]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
# Jun 03 09:45:01 ip-172-31-90-178 CRON[122050]: pam_unix(cron:session): session closed for user root
# Jun 03 09:55:01 ip-172-31-90-178 CRON[122318]: pam_unix(cron:session): session opened for user root(uid=0) by root(uid=0)
# Jun 03 09:55:01 ip-172-31-90-178 CRON[122319]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
# Jun 03 09:55:01 ip-172-31-90-178 CRON[122318]: pam_unix(cron:session): session closed for user root
# lines 5-21/21 (END)
```

### Processes

`ps aux` shows all processes with their respective status:

```sh
ps aux
# 
# USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
# root           1  0.0  1.4  22556 13952 ?        Ss   May14   0:35 /usr/lib/systemd/systemd --system --deserialize=63
# root           2  0.0  0.0      0     0 ?        S    May14   0:00 [kthreadd]
# root           3  0.0  0.0      0     0 ?        S    May14   0:00 [pool_workqueue_release]
# root           4  0.0  0.0      0     0 ?        I<   May14   0:00 [kworker/R-rcu_g]
# root           5  0.0  0.0      0     0 ?        I<   May14   0:00 [kworker/R-rcu_p]
# root           6  0.0  0.0      0     0 ?        I<   May14   0:00 [kworker/R-slub_]
# .
# .
# .
```

Here's an explanation of each column in the `ps aux` output:

- `USER`: The owner of the process
- `PID`: Process ID number
- `%CPU`: CPU usage percentage
- `%MEM`: Memory usage percentage
- `VSZ`: Virtual Memory Size in kilobytes (total program size)
- `RSS`: Resident Set Size in kilobytes (actual memory used)
- `TTY`: Terminal associated with the process ('?' means no terminal)
- `STAT`: Process state code:
  - `S`: Sleeping
  - `R`: Running
  - `I`: Idle
  - `Z`: Zombie
  - `T`: Stopped
  - `s`: Session leader
  - `<`: High priority
  - `N`: Low priority
- `START`: Time when the process started
- `TIME`: Cumulative CPU time used
- `COMMAND`: The command with all its arguments

### `top` and `htop` Commands

`top` or `htop` can be used for live usage overview, and for showing a dynamic view of system performance and running processes. Here's what it displays:

- System Overview:
  - System uptime and number of logged-in users.
  - Load average values for the last 1, 5, and 15 minutes.
  - Total number of processes and their states (running, sleeping, stopped, zombie)
- Resource Usage:
  - CPU usage breakdown (user, system, idle, etc.).
  - Memory usage (total, free, used, cached).
  - Swap space usage
  - Process List:Shows a sorted list of running processes (by default sorted by CPU usage)For each process, displays:
      - Process ID (PID).
      - User who owns the process.
      - CPU and memory usage.
      - Process priority and nice value.
      - Memory usage details (virtual, resident, shared).
      - Process status.
      - Running time.
      - Command name.

```sh
top
# 
# 10:04:25 up 19 days, 14:17,  1 user,  load average: 0.00, 0.00, 0.00
# Tasks: 104 total,   1 running, 103 sleeping,   0 stopped,   0 zombie
# %Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 88.0 id,  0.0 wa,  0.0 hi,  0.0 si, 12.0 st 
# MiB Mem :    957.4 total,    247.3 free,    366.1 used,    533.7 buff/cache     
# MiB Swap:      0.0 total,      0.0 free,      0.0 used.    591.3 avail Mem 
#
#        PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                              
#          1 root      20   0   22556  13952   9728 S   0.0   1.4   0:35.08 systemd                                              
#          2 root      20   0       0      0      0 S   0.0   0.0   0:00.16 kthreadd                                             
#          3 root      20   0       0      0      0 S   0.0   0.0   0:00.00 pool_workqueue_release                               
#          4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-rcu_g                                      
#          5 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-rcu_p                                      
#          6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-slub_                                      
#          7 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-netns                                      
#         10 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri                          
#         12 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/R-mm_pe                                      
#         13 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_rude_kthread                               
#         14 root      20   0       0      0      0 I   0.0   0.0   0:00.00 rcu_tasks_trace_kthread
```

The top command updates this information regularly (by default every 3 seconds) and is commonly used for:

- Monitoring system performance
- Identifying resource-intensive processes
- Troubleshooting system slowdowns
- Getting a quick overview of system health<br/>You can also interact with top while it's running using various keyboard commands (like 'k' to kill a process, '1' to see cpu cores, etc.).

---

## How to Get Your Logs & Dmesg In formation in Linux

Based on the system configuration, a number of logs are generated. These can be audit logs, system logs, cron logs, and so on. They all carry useful information. Here are some commands that you can use to view logs:

- `dmesg | less`: Kernel ring buffer (hardware issues, boot messages)
- `journalctl -xe`: Recent critical logs (systemd systems)
- `/var/log/syslog` or `/var/log/messages`: General system logs

---

## How to Get Your Security/User Audit Information in Linux

`whoami` shows the current user’s username.

```sh
whoami
# 
# ubuntu
```

`id` shows detailed information about a user's identity on the system.

```sh
id
# 
# uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),24(cdrom),27(sudo),30(dip),105(lxd)
```

Let's break down the output:

- User ID (uid): `uid=1000(ubuntu)` means the user ID is 1000, with username "ubuntu"
- Primary Group ID (gid): `gid=1000(ubuntu)` means the primary group ID is 1000, named "ubuntu"
- Supplementary Groups (groups): The user belong to the following groups:
  - `ubuntu (1000)`: Your primary group.
  - `adm (4)`: For system monitoring tasks.
  - `cdrom (24)`: For accessing CD-ROM devices.
  - `sudo (27)`: Allows you to execute commands with superuser privileges.
  - `dip (30)`: For managing dial-up connections.
  - `lxd (105)`: For managing LXD containers.

The `id` command is useful for checking user and group IDs, verifying group memberships, troubleshooting permissions issues and confirming sudo access.

`who` displays information about users currently logged into the system:

```sh
who
# 
# ubuntu   pts/0        2025-06-03 08:45 (39.43.159.5)
```

The output breakdown is shown below:

- Username: "`ubuntu`"
- Terminal: "`pts/0`" (pseudo-terminal)
- Login time: "`2025-06-03 08:45"`
- Remote host: "`(39.43.159.5)`" - the IP address from where the connection was made
- `w`- shows who is logged in and what they are doing:

```sh
w
#
#  10:21:46 up 19 days, 14:35,  1 user,  load average: 0.00, 0.00, 0.00
# USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU  WHAT
# ubuntu   pts/0    39.43.159.5      08:45   44:56   0.00s  0.02s sshd: ubuntu [priv]
```

Here is the result breakdown:

First line:

- `10:21:46`: Current system time
- `up 19 days, 14:35`: System uptime (how long the system has been running)
- `1 user`: Number of users currently logged in
- `load average: 0.24, 0.05, 0.02`: System load averages for the past 1, 5, and 15 minutes
  - Numbers below 1.0 indicate low system load
  - Higher numbers indicate more system load/stress

Second line shows the column headers for the user information below:

- `USER`: Username.
- `TTY`: Terminal device being used.
- `FROM`: Remote host from where the user is connected.
- `LOGIN@`: Time when the user logged in.
- `IDLE`: Time since the user's last activity.
- `JCPU`: CPU time used by all processes attached to the tty.
- `PCPU`: CPU time used by the current process.
- `WHAT`: Current process/command being run.

`last` shows a history of user logins and system reboots:

```sh
last
# 
# ubuntu   pts/1        39.43.159.5      Tue Jun  3 10:15 - 10:17  (00:02)
# ubuntu   pts/0        39.43.159.5      Tue Jun  3 08:45   still logged in
# ubuntu   pts/0        39.43.159.5      Tue Jun  3 05:23 - 08:29  (03:06)
# ubuntu   pts/0        39.43.159.5      Sun Jun  1 06:32 - 12:24  (05:52)
# ubuntu   pts/0        39.43.159.5      Thu May 22 05:39 - 05:58  (00:18)
# ubuntu   pts/0        139.135.32.93    Wed May 21 14:45 - 14:47  (00:01)
# ubuntu   pts/0        139.135.32.93    Wed May 21 11:58 - 13:49  (01:51)
# ubuntu   pts/0        39.43.159.5      Wed May 21 05:05 - 05:12  (00:06)
# ubuntu   pts/0        39.43.159.5      Tue May 20 18:41 - 21:45  (03:04)
# ubuntu   pts/0        39.43.159.5      Thu May 15 06:12 - 06:12  (00:00)
# ubuntu   pts/0        39.43.159.5      Thu May 15 06:05 - 06:12  (00:07)
# ubuntu   pts/0        18.206.107.27    Wed May 14 20:06 - 20:08  (00:01)
# ubuntu   pts/0        182.185.185.39   Wed May 14 19:48 - 19:50  (00:01)
# reboot   system boot  6.8.0-1024-aws   Wed May 14 19:46   still running
# 
# wtmp begins Wed May 14 19:46:47 2025
```

Each line shows:

- Username (in this case, all logins are from 'ubuntu' user).
- Terminal device (`pts/0` indicates a pseudo-terminal, typically used for SSH connections).
- Remote host IP address (where the connection came from).
- Login time and date.
- Logout time or status.
- Session duration in parentheses.

`sudo -l` shows what the current user can do with sudo.

```sh
sudo -l
# 
# Matching Defaults entries for ubuntu on ip-172-31-90-178:
#     env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin,
#     use_pty
# 
# User ubuntu may run the following commands on ip-172-31-90-178:
#     (ALL : ALL) ALL
#     (ALL) NOPASSWD: ALL
```

This output indicates that the 'ubuntu' user has:

- Full sudo access (can execute any command)
- No password requirement for sudo commands
- Complete administrative privileges on the system

---

## Visually Appealing Commands

In this section you’ll learn about two commands that display the information we have seen before in a presentable and aesthetic form.

`neofetch` - displays system info along with the distribution logo:

![Terminal output of the neofetch command displaying Ubuntu system information, including OS, kernel, uptime, CPU, GPU, memory, and a colorful ASCII logo](https://cdn.hashnode.com/res/hashnode/image/upload/v1748945743174/9cef1af7-fce8-4657-ad26-7d75b5755dd1.png)

`btop` displays dynamic stats with different modes:

![A realtime snapshot of the btop system monitor showing real-time CPU, memory, disk, and network usage in a terminal. Colorful graphs display performance metrics for processes, temperatures, and uptime](https://cdn.hashnode.com/res/hashnode/image/upload/v1748945510465/8c8c200c-bb1a-4123-8db7-c30bb6a1c9bf.gif)

---

## Conclusion

Thank you for reading the article until the end. If you found it helpful, consider sharing it with others.

**Stay Connected and Continue Your Learning Journey!**

I read every message, come say hi 👋

1. **Connect with me on**:
    - [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`zaira-hira`)](https://linkedin.com/in/zaira-hira/): I share content related to Linux, Cyber security and DevOps. Leave a recommendation on LinkedIn and endorse me on relevant skills.
    - [<VPIcon icon="fa-brands fa-discord"/>Discord](https://discord.gg/9zfbjEDs) community: Hang around with other devs or share your accomplishments.
    - [X (<VPIcon icon="fa-brands fa-x-twitter"/>`hira_zaira`)](https://twitter.com/hira_zaira): I share pre-launch updates and some behind the scenes.
2. **Get access to exclusive content**: For one-on-one help and exclusive content go [<VPIcon icon="fas fa-globe"/>here](https://buymeacoffee.com/zairah/extras).

My [articles (<VPIcon icon="fa-brands fa-free-code-camp"/>`zaira`)](https://freecodecamp.org/news/author/zaira/) are part of my mission to increase accessibility to quality content for everyone. Each piece takes a lot of time and effort to write. This article will be free, forever. If you've enjoyed my work and want to keep me motivated, consider [<VPIcon icon="fas fa-globe"/>buying me a coffee](https://buymeacoffee.com/zairah).

Thank you once again and happy learning!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Information About Your Linux System Through the Command Line",
  "desc": "Whether you’ve just gained access to a new Linux system, ethically hacked into one as part of a security test, or you’re just curious to know more about your current machine, this article will guide you through the process. You’ll learn how you can g...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/get-linux-system-info-through-cli.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
