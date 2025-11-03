---
lang: en-US
title: "How to Extend Root Partition in Linux"
description: "Article(s) > How to Extend Root Partition in Linux"
icon: iconfont icon-shell
category:
  - Shell;
  - Article(s)
tag:
  - blog
  - tecmint.com
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Extend Root Partition in Linux"
    - property: og:description
      content: "How to Extend Root Partition in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/increase-root-partition-linux.html
prev: /programming/sh/articles/README.md
date: 2025-09-11
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2025/09/extend-root-partition-linux.webp
---

# {{ $frontmatter.title }} 관련

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
  name="How to Extend Root Partition in Linux"
  desc="In this article, we explain how to safely extend your Linux root partition (/) using GParted or LVM, with step-by-step instructions for beginners."
  url="https://tecmint.com/increase-root-partition-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2025/09/extend-root-partition-linux.webp"/>

As a Linux user, you may eventually run into a situation where your [**root partition (`/`) runs out of space**](/tecmint.com/fix-full-root-partition-linux.md), which can cause errors, prevent software installation, or even stop your system from functioning properly.

Expanding the root partition may sound tricky, especially for beginners, but with a bit of guidance and patience, it’s absolutely doable, as explained in this article.

---

## Understanding the Root Partition

The root partition `(/)` is where your Linux operating system resides and contains all the system files, installed applications, configuration settings, and sometimes user data if `/home` isn’t on a separate partition.

The root partition can fill up for several reasons:

- Installing lots of applications.
- Big log files are taking up space.
- Temporary files that aren’t cleaned automatically.
- Databases or development tools storing data on `/`.

When the root partition runs low on space, **Linux** can start acting unpredictably. Expanding it helps prevent these problems and keeps your system running smoothly.

---

## How to Check Current Disk Usage

The first step is to see your current partition layout and how much space you have using the following [**`df` command**](/tecmint.com/how-to-check-disk-space-in-linux.md).

```sh
df -h
# 
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sda1        20G   18G  2G  90% /
# tmpfs           2.0G  1.2M 2.0G 1% /dev/shm
```

The above command shows disk usage in a human-readable format, here you can see that `/` is almost full (**90%** used).:

Next, check your partition layout with the following [**`fdisk` command**](/tecmint.com/fdisk-commands-to-manage-linux-disk-partitions.md):

```sh
fdisk -l
#
# NAME   MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
# sda      8:0    0  50G  0 disk 
# ├─sda1   8:1    0  20G  0 part /
# ├─sda2   8:2    0  10G  0 part /home
# └─sda3   8:3    0  20G  0 part
```

The above command will list all the disk partitions on the system.

```sh
```

Notice how `/` is only **20GB** while `/home` is **10GB**. We may want to take advantage of unused space on the disk or shrink other partitions.

---

## Important: Backup Your Root Partition

Before making any changes to your partitions, always back up your important data, because mistakes do happen during partitioning, which can lead to data loss, so it’s better to be safe than sorry.

To take your root partition backup, we will use the [**`rsync` command**](/tecmint.com/rsync-local-remote-file-synchronization-commands.md) as shown, or you can use any [**other backup tool**](/tecmint.com/linux-system-backup-tools.md) you prefer..

```sh
rsync -av --progress / /path/to/backup/
```

There are several ways to increase the root partition’s space, and the approach you choose depends on your setup.

---

## Method 1: Extending Root Partition Using GParted

If you’re on a desktop or have a Live CD/USB, **GParted** is the easiest tool to use.

- **Boot from a Live USB/CD** – You cannot resize a mounted root partition, so start by booting into a live Linux environment.
- **Launch GParted** – Open GParted from the menu and see a list of all your partitions.
- **Resize the Root Partition** – Identify the `/` (root) partition, check if there’s unallocated space next to it, right-click the partition and select **Resize**/**Move**.
- **Apply Changes** – Click the checkmark button to apply the changes, be patient; this may take a few minutes.

After rebooting, run `df -h` to confirm that the root partition has increased in size.

---

## Method 2: Using LVM (Logical Volume Manager)

If your root partition is on **LVM** (many [**modern Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md) like CentOS, RHEL, and  Ubuntu support LVM), expanding is safer and doesn’t require booting from a Live CD.

First, check if the root is on LVM.

```sh
lsblk
# 
# NAME                 MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
# sda                    8:0    0  50G  0 disk 
# └─sda2                 8:2    0  50G  0 part
#   ├─vg_root-lv_root   253:0  0  20G  0 lvm  /
#   └─vg_root-lv_home   253:1  0  30G  0 lvm  /home
```

You might see something similar, here, `/` is an LVM logical volume (`lv_root`) inside volume group `vg_root`.

If there is free space in the volume group, you can extend the logical volume.

```sh
sudo lvextend -L +10G /dev/vg_root/lv_root
```

- `+10G` means add 10GB to the root.
- Replace `/dev/vg_root/lv_root` with your path.

Next, resize the filesystem.

```sh
sudo resize2fs /dev/vg_root/lv_root  #for ext3
sudo xfs_growfs /                    #for xfs
```

After resizing, run the following command to confirm that the root partition has increased in size.

```sh
df -h
```

---

## Method 3: Shrinking Another Partition

If LVM is not used and there’s no unallocated space, you can shrink another partition like `/home` to create space:

- **Backup /home** – Make sure all your important files are saved somewhere safe.
- **Boot from a Live USB** – Start your computer from a Linux USB so the partitions aren’t in use.
- **Shrink /home using GParted** – Use GParted to reduce the size of the /home partition and free up space.
- **Move the root partition** – Carefully shift your root partition into the free space. This step is advanced and risky.
- **Resize the filesystem** – Expand the root filesystem so it can use the new space.

::: tip

This is tricky for beginners. If possible, use **LVM** or work with partitions that already have unallocated space.

:::

---

## Conclusion

Running out of space on your root partition can be stressful, but expanding it is completely manageable once you understand your system and follow the right steps.

For beginners, using **GParted** via a **Live USB** is the safest way to extend the root partition, while **LVM** users have the flexibility to do it safely without rebooting.

Always remember to back up your important data before making any changes, and double-check your partitions before resizing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Extend Root Partition in Linux",
  "desc": "In this article, we explain how to safely extend your Linux root partition (/) using GParted or LVM, with step-by-step instructions for beginners.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/increase-root-partition-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
