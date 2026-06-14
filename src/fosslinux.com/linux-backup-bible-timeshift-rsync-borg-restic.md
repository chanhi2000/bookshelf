---
lang: en-US
title: "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)"
description: "Article(s) > Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)"
icon: fa-brands fa-debian
category:
  - DevOps
  - Linux
  - Debian
  - Fedora
  - Arch Linux
  - Article(s)
tag:
  - blog
  - fosslinux.com
  - devops
  - linux
  - debian
  - fedora
  - arch
  - archlinux
  - arch-linux
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)"
    - property: og:description
      content: "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fosslinux.com/linux-backup-bible-timeshift-rsync-borg-restic.html
prev: /devops/linux-debian/articles/README.md
date: 2026-06-23
isOriginal: false
author:
  - name: Arjun K.
    url: https://fosslinux.com/author/arjun-k
cover: https://fosslinux.com/wp-content/uploads/2026/06/linux-backup-bible-timeshift-rsync-borg-restic.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
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
  "title": "Arch Linux > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-arch/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)"
  desc="I tested Timeshift, rsync, Borg, and Restic on Ubuntu, Fedora, and Arch. Here are the real commands, the 3-2-1 strategy, and the mistakes I learned from."
  url="https://fosslinux.com/158182/linux-backup-bible-timeshift-rsync-borg-restic.htm"
  logo="https://fosslinux.com/favicon.ico"
  preview="https://fosslinux.com/wp-content/uploads/2026/06/linux-backup-bible-timeshift-rsync-borg-restic.png"/>

::: note Arjun’s Systems Brief

I have spent the better part of a decade building backup strategies for production servers and personal workstations alike. If there is one thing I have learned the hard way, it is this: the backup you never tested is not a backup at all. This guide covers the four tools I trust most on Linux, walks through real commands I have run on live systems, and gives you a repeatable strategy you can set up in an afternoon.

:::

Every ransomware headline, every failed SSD, every botched kernel update is a reminder that data loss does not ask permission. The Arch Linux AUR malware crisis proved that even package repositories you trust can become attack vectors. Backups are not optional. They are the last line of defense between you and a complete rebuild.

I wrote this guide because FOSSLinux had zero backup coverage in its article library, and because the tools have matured significantly since the last wave of “how to back up Linux” content appeared online. Timeshift is now maintained directly by the Linux Mint team. Borg just hit version 1.4.4. Restic released 0.19.0 in June 2026. The landscape is different, and the advice should be too.

---

## How the 3-2-1 Backup Rule Works on Linux (2026)

The 3-2-1 rule is simple: keep **3** copies of your data, on **2** different types of media, with **1** copy stored offsite. On a Linux workstation, this translates to:

- **Copy 1:** Your live data on the primary drive.
- **Copy 2:** A local snapshot or rsync mirror on a separate disk or partition.
- **Copy 3:** An encrypted offsite backup using Borg or Restic over SSH or to a cloud backend.

The beauty of this approach is that no single failure scenario can take out all three copies. A ransomware attack encrypts your live data? Your local snapshot is on a different partition. Your house floods and takes out the NAS? Your offsite copy is on a remote server or in S3. I have personally recovered production databases from offsite Borg repos after a RAID controller failure wiped both mirrors. The 3-2-1 rule is not theoretical for me. It has saved my career twice.

---

## Timeshift: System Snapshots for Every Linux Desktop (2026)

Timeshift is the tool I recommend to anyone who just wants their system to work again after a bad update. It does one thing well: it takes incremental snapshots of your system files (not your personal documents) and lets you roll back to any previous state. Think of it as System Restore on Windows, but actually reliable.

Timeshift is now part of the Xapp project maintained by the Linux Mint team. The original repository by Tony George was archived in October 2022, and development continued under `github.com/linuxmint/timeshift`. The latest release (April 2026) is version 25.12.4, which ships on Ubuntu 26.04 and Arch Linux. Fedora carries an older build at 22.11.2, so check your version before following along.

### Installation Across Distros

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="fa-brands fa-debian"/>

```sh
sudo apt install timeshift
#
# [sudo] password for fosslinux: 
# Reading package lists... Done
# Building dependency tree... Done
# Reading state information... Done
# timeshift is already the newest version (25.12.4-1).
# 0 upgraded, 0 newly installed, 0 to remove and 6 not upgraded.
timeshift --version
#
# Timeshift 25.12.4
```

@tab <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-redhat"/>

```sh
sudo dnf install timeshift
#
# ...
# Package "timeshift-22.11.2-8.fc44.x86_64" is already installed.
sudo timeshift --version
#
# Timeshift v22.11.2 by Tony George (teejeetech@gmail.com)
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S timeshift
#
# ...
timeshift --version
#
# Timeshift 25.12.4
```

:::

### Creating and Managing Snapshots

Timeshift supports two modes: **RSYNC** mode (works on any filesystem) and **BTRFS** mode (uses native Btrfs snapshots for near-instant operations). If your root partition is Btrfs with the standard `@` and `@home` subvolume layout, use Btrfs mode. Otherwise, Rsync mode is the safe default.

::: info Also Read

- [How to use the Linux shutdown command](https://fosslinux.com/138925/how-to-use-the-linux-shutdown-command.htm)
- [How to safely create or resize partitions in Linux using GParted](https://fosslinux.com/4456/how-to-safely-create-or-resize-partitions-in-linux-using-gparted.htm)
- [How to find a File in Linux](https://fosslinux.com/42684/how-to-find-a-file-in-linux.htm)

:::

Creating a manual snapshot:

```sh
sudo timeshift --create --comments "Before kernel update"
#
# [sudo] password for fosslinux: 
# Mounted '/dev/sda2' at '/mnt/timeshift/2026-06-22_22-00-00'
# Saving config...
# Snapshot saved successfully (2.3s)
sudo timeshift --list
#
# /dev/sda2    2026-06-22 22:00:00  @Backup  "Before kernel update"
#
# List all existing snapshots:
sudo timeshift --list
#
# Snapshot    Date                Type    Description
# ----------  ------------------  ------  -------------------------
# 1           2026-06-22 22:00    O       Before kernel update
```

::: tip Pro Tip

Schedule Timeshift to take daily snapshots automatically. In the GUI, go to Schedule and enable Daily with a retention of 5 snapshots. For headless servers, the `--check` flag creates a snapshot only when one is due, making it perfect for a cron job: `0 3 * * * timeshift --check`

:::

### Restoring from Timeshift

If your system boots, you can restore from the running system (it will reboot to complete). If GRUB is broken, boot from a Live USB, install Timeshift, and restore from there.

```sh
sudo timeshift --restore --snapshot '2026-06-22_22-00-00'
#
# [sudo] password for fosslinux: 
#
# Snapshots listed:
#
# 1   2026-06-22 22:00:00  O  Before kernel update
#
# Select snapshot to restore (1..1): 1
# Target device: /dev/sda2
# Perform restore? (y/n): y
# ...restoring files
# Restored successfully. Reboot to complete.
```

---

## `rsync`: The Foundation of Linux Incremental Backups (2026)

rsync is not a backup tool in the same way Timeshift is. It is a synchronization engine, and that makes it the most versatile building block for custom backup strategies. I use rsync for everything from mirroring my home directory to an external drive to syncing code repositories across machines.

The killer feature is delta transfer: rsync only copies the parts of files that have changed. Run the same rsync command twice, and the second run finishes in milliseconds if nothing changed.

```sh
rsync --version
#
# rsync  version 3.4.4  protocol version 32
# Copyright (C) 1996-2026 by Andrew Tridgell, Wayne Davison, and others.
```

### Basic Incremental Backup with rsync

Here is the pattern I use for local incremental backups:

```sh
rsync -avz --stats /tmp/rsync_src/ /tmp/rsync_dst/
#
# sending incremental file list
# config.conf
# testfile.txt
#
# Number of files: 3 (reg: 2, dir: 1)
# Number of created files: 2 (reg: 2)
# Number of deleted files: 0
# Number of regular files transferred: 2
# Total file size: 51 bytes
# Total transferred file size: 51 bytes
# Literal data: 51 bytes
# Matched data: 0 bytes
# File list size: 0
# File list generation time: 0.001 seconds
# File list transfer time: 0.000 seconds
# Total bytes sent: 252
# Total bytes received: 54
#
# sent 252 bytes  received 54 bytes  612.00 bytes/sec
# total size is 51  speedup is 0.17
```

After modifying one file, the second sync transfers only the changed file:

```sh
rsync -avz --stats --delete /tmp/rsync_src/ /tmp/rsync_dst/
#
# sending incremental file list
# testfile.txt
#
# Number of files: 3 (reg: 2, dir: 1)
# Number of created files: 0
# Number of deleted files: 0
# Number of regular files transferred: 1
# Total file size: 53 bytes
# Total transferred file size: 41 bytes
# Literal data: 41 bytes
# Matched data: 0 bytes
# File list size: 0
# Total bytes sent: 201
# Total bytes received: 42
#
# sent 201 bytes  received 42 bytes  486.00 bytes/sec
# total size is 53  speedup is 0.22
```

The `--delete` flag removes files from the destination that no longer exist in the source. This keeps your mirror faithful. Leave it off if you want to keep deleted files as a crude “trash” on the backup side.

### Remote Backup over SSH

The real power of rsync shows up when you add SSH:

```sh
rsync -avz -e ssh /home/fosslinux/Documents/ fosslinux@backup-server:/mnt/backup/home/Documents/
```

This sends an encrypted, compressed, incremental copy of your Documents folder to a remote server every time you run it. Wrap it in a cron job or systemd timer and you have an offsite backup pipeline for free.

::: info Also Read

- [How to manage systemd units at start-up](https://fosslinux.com/48609/manage-systemd-units-start-up.htm)
- [How to generate random strings with Bash UUID](https://fosslinux.com/132203/how-to-generate-random-strings-with-bash-uuid.htm)
- [10 Linux commands for file and directory operations](https://fosslinux.com/136873/linux-commands-for-file-and-directory-operations.htm)

:::

::: important Insight

rsync does not encrypt data at rest. The SSH transport encrypts data in transit, but once the files land on the remote server, they are plain text. If the remote server is not fully under your control, pair rsync with Borg or Restic for client-side encryption.

:::

---

## BorgBackup: Deduplication and Encrypted Backups (2026)

BorgBackup (Borg) is the tool I use for anything that needs to be both space-efficient and encrypted. It combines content-defined chunking deduplication with authenticated encryption (AES-256-OCB or chacha20-poly1305), which means identical data across multiple backups is stored only once, and nobody can read your backups without your passphrase.

Version 1.4.4 is the current stable release across all three distros I tested. Borg 2 is in beta testing and has breaking changes between beta releases, so I do not recommend it for production backups yet.

```sh
borg --version
#
# borg 1.4.4
```

### Setting Up an Encrypted Borg Repository

Creating a repository with repokey encryption (key stored in the repo directory):

```sh
export BORG_PASSPHRASE="your-secure-passphrase"
borg init --encryption=repokey /mnt/backup/borg-repo
#
# IMPORTANT: you will need both KEY AND PASSPHRASE to access this repo!
#
# Key storage location depends on the mode:
# - repokey modes: key is stored in the repository directory.
# - keyfile modes: key is stored in the home directory of this user.
#
# For any mode, you should:
# 1. Export the borg key and store the result at a safe place:
#    borg key export           REPOSITORY encrypted-key-backup
#    borg key export --paper   REPOSITORY encrypted-key-backup.txt
#    borg key export --qr-html REPOSITORY encrypted-key-backup.html
# 2. Write down the borg key passphrase and store it at safe place.
```

### Creating and Managing Archives

```sh
borg create --stats /mnt/backup/borg-repo::manual-2026-06-22 /home/fosslinux/
#
# ------------------------------------------------------------------------------
# Repository: /mnt/backup/borg-repo
# Archive name: manual-2026-06-22
# Archive fingerprint: bc03a212f9770f54a00f7cbb91944c0b1dfc3ef2c07a52e6c5dac91858ca7919
# Time (start): Mon, 2026-06-22 22:53:06
# Time (end):   Mon, 2026-06-22 22:53:06
# Duration: 0.00 seconds
# Number of files: 1
# Utilization of max. archive size: 0%
# ------------------------------------------------------------------------------
#                        Original size      Compressed size    Deduplicated size
# This archive:                   39 B                 82 B                 82 B
# All archives:                   39 B                 82 B                875 B
# 
#                        Unique chunks         Total chunks
# Chunk index:                       3                    3
# ------------------------------------------------------------------------------
#
# List all archives in a repository:
borg list /mnt/backup/borg-repo
#
# manual-2026-06-22               Mon, 2026-06-22 22:53:06 [bc03a212...]
#
# Show repository-level statistics:
borg info /mnt/backup/borg-repo
#
# Repository ID: 801693e26980b63c63dc4dfb3b85ccfd8955d7e3c918fd4e4c7e1db55ee0f165
# Location: /mnt/backup/borg-repo
# Encrypted: Yes (repokey)
# Cache: /home/fosslinux/.cache/borg/801693e2...
# ------------------------------------------------------------------------------
#                        Original size      Compressed size    Deduplicated size
# All archives:                   39 B                 82 B                875 B
# 
#                        Unique chunks         Total chunks
# Chunk index:                       3                    3
```

### Pruning Old Backups

Borg does not automatically delete old archives. You must tell it how many to keep:

```sh
borg prune --keep-daily=7 --keep-weekly=4 --keep-monthly=6 --list /mnt/backup/borg-repo
#
# Keeping archive (rule: daily #1):  manual-2026-06-22  Mon, 2026-06-22 22:53:06 [bc03a212...]
#
# This keeps the last 7 daily, 4 weekly, and 6 monthly backups. Anything older gets deleted. Run this after every backup cycle.
```

::: important Why It Matters

Deduplication is not a luxury. A 500 GB home directory that changes by 2% per day would require 500 GB per day with plain rsync mirrors. With Borg deduplication, that same 2% change stores only about 10 GB per day. Over a month, you save nearly 1.5 TB of disk space.

:::

---

## Restic: The Modern Cross-Platform Backup Solution (2026)

Restic is what I reach for when I need backup flexibility. It supports local directories, SFTP, S3, B2, Azure Blob Storage, Google Cloud Storage, and any rclone backend. Written in Go, it compiles to a single binary with zero dependencies. The 0.19.0 release (June 9, 2026) is the most current version, available on Fedora and Arch. Ubuntu ships 0.18.1. fosslinux@archlinux:~$ restic version
restic 0.19.0 compiled with go1.26.4-X:nodwarf5 on linux/amd64

### Creating and Using a Restic Repository

```sh
echo "your-secure-passphrase" | restic init --repo /mnt/backup/restic-repo
created restic repository d22551e6ae at /mnt/backup/restic-repo
#
# Please note that knowledge of your password is required to access
# the repository. Losing your password means that your data is
# irrecoverably lost.
#
# Running a backup:
echo "your-secure-passphrase" | restic -r /mnt/backup/restic-repo backup /home/fosslinux/
#
# no parent snapshot found, will read all files
#
# Files:           1 new,     0 changed,     0 unmodified
# Dirs:            2 new,     0 changed,     0 unmodified
# Added to the repository: 1.135 KiB (1007 B stored)
#
# processed 1 files, 39 B in 0:00
# snapshot ca8c5d8c saved
#
# List snapshots:
```

::: info Also Read

- [How to create Cron Jobs on Linux](https://fosslinux.com/41729/how-to-create-cron-jobs-on-linux.htm)
- [Linux Remote Desktop: RDP, VNC, Wayland (2026)](https://fosslinux.com/158237/linux-remote-desktop-rdp-vnc-wayland.htm)
- [How to Use Systemctl to List All Services in Linux](https://fosslinux.com/142012/how-to-use-systemctl-to-list-all-services-in-linux.htm)

:::

```sh
echo "your-secure-passphrase" | restic -r /mnt/backup/restic-repo snapshots
#
# ID        Time                 Host        Tags        Paths            Size
# ----------------------------------------------------------------------------
# ca8c5d8c  2026-06-22 22:53:09  archlinux               /home/fosslinux  39 B
# ----------------------------------------------------------------------------
# Timestamps shown in EDT timezone
# 1 snapshots
#
# Prune old snapshots with forget:
echo "your-secure-passphrase" | restic -r /mnt/backup/restic-repo forget --keep-daily 7 --keep-weekly 4 --prune
#
# Applying Policy: keep 7 daily, 4 weekly snapshots
# keep 1 snapshots:
# ID        Time                 Host        Tags        Reasons          Paths            Size
# ---------------------------------------------------------------------------------------------
# ca8c5d8c  2026-06-22 22:53:09  archlinux               daily snapshot   /home/fosslinux  39 B
#                                                        weekly snapshot
# ---------------------------------------------------------------------------------------------
# Timestamps shown in EDT timezone
# 1 snapshots
```

### Restic vs Borg: When to Use Which

Both tools do deduplication, encryption, and pruning. The practical differences:

- **Restic** wins on backend support. Native S3, B2, Azure, and GCS integration means no extra tooling for cloud backups.
- **Borg** wins on compression options. Borg supports lz4, zstd, zlib, and lzma with fine-grained control. Restic has compression but fewer algorithm choices.
- **Restic** is a single Go binary. Borg requires Python and Cython at build time.
- **Borg 1.4.4** is mature and battle-tested. Restic 0.19.0 is equally stable but younger as a project.

My rule of thumb: use Borg for local and SSH backups where compression matters. Use Restic for cloud backends where native S3/B2 support eliminates friction.

::: note Worth Knowing

Restic 0.19.0 now supports the `--prune` flag directly in the `forget` command, combining snapshot cleanup and space reclamation in a single operation. Older versions required running `restic prune` separately.

:::

---

## Automating Backups with systemd Timers (2026)

Cron is the traditional way to schedule backups, but systemd timers offer better logging, dependency management, and missed-run handling. Here is how to set up a daily automated backup with rsync:

Create the timer unit at <VPIcon icon="fas fa-folder-open"/>`/etc/systemd/system/`<VPIcon icon="fas fa-file-lines"/>`daily-backup.timer`:

```toml title="/etc/systemd/system/daily-backup.timer"
[Unit]
Description=Daily Backup Timer

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

Create the service unit at <VPIcon icon="fas fa-folder-open"/>`/etc/systemd/system/`<VPIcon icon="fas fa-file-lines"/>`daily-backup.service`:

```toml title="/etc/systemd/system/daily-backup.service"
[Unit]
Description=Daily Backup Service

[Service]
Type=oneshot
ExecStart=/usr/bin/rsync -avz --delete /home/fosslinux/ /mnt/backup/home/
```

Enable and start the timer:

```sh
sudo systemctl enable --now daily-backup.timer
systemctl list-timers --all | grep backup
#
# NEXT                                 LEFT     LAST                              PASSED  UNIT                 ACTIVATES
# Tue 2026-06-23 00:00:00 EDT       1h 6min  Mon 2026-06-22 00:00:02 EDT      22h ago  daily-backup.timer   daily-backup.service
```

The `Persistent=true` directive ensures that if your machine was off at the scheduled time, the backup runs as soon as the system boots. This is something cron does not do reliably without extra configuration.

---

## Testing Your Backups: The Most Important Step (2026)

I have seen production teams lose data because their backups were corrupted and nobody discovered it until the restore was needed. A backup you have never restored is a backup you do not have.

For Timeshift, boot from a Live USB and restore a snapshot to verify it works. For Borg, run `borg check /path/to/repo` monthly to verify repository integrity. For Restic, run `restic -r /path/to/repo check` to verify all data packs are intact.

::: info Also Read

- [10+ Best Python IDEs for Linux](https://fosslinux.com/27003/best-python-ides-for-linux.htm)
- [10 ways to generate a random password on Linux](https://fosslinux.com/45609/ways-generate-random-password-linux.htm)
- [Linux Data Discovery: How to Locate Files by Specific Extensions](https://fosslinux.com/111966/how-to-find-files-with-specific-extensions-in-linux.htm)

:::

My quarterly backup drill process: I pick one random snapshot from each backup tool, restore it to a temporary directory, and verify that the files are complete and readable. This takes about 15 minutes and has caught two corrupted Borg repos before they became a problem.

---

## Building Your Complete Backup Strategy (2026)

Here is the strategy I recommend for different scenarios:

**Desktop workstation:** Use Timeshift for system snapshots (daily, keep 7) and Borg for your home directory (daily to a local drive, weekly to a remote server via SSH). This gives you fast system recovery with Timeshift and encrypted, deduplicated personal data with Borg.

**Home server:** Use rsync for real-time file synchronization to a local mirror and Restic for nightly encrypted backups to cloud storage (S3 or B2). The rsync mirror gives you fast local access; the Restic cloud backup gives you geographic redundancy.

**Production environment:** Use rsync for hot standby replication, Borg for encrypted offsite backups, and a documented restore procedure that someone on your team has actually tested. I keep a laminated cheat sheet near each server rack with the exact restore commands.

No matter which combination you choose, the principle is the same: automate everything, encrypt offsite copies, and test your restores quarterly. The tools are mature, free, and proven. The only thing standing between you and a solid backup strategy is actually setting it up.

Start with Timeshift today. It takes five minutes to install and configure. Then add Borg or Restic for your personal files. Within an hour, you will have a backup strategy that covers the most common failure scenarios. That is an hour well spent.

---

## Frequently Asked Questions

::: details Can I use Timeshift to back up my personal files?

Timeshift is designed for system files and settings only. It excludes your home directory by default. For personal file backups, use Borg or Restic alongside Timeshift.

:::

::: info Also Read

- [How to Create a Linux Service with systemd (2026 Guide)](https://fosslinux.com/111815/a-guide-to-creating-linux-services-with-systemd.htm)
- [Swap Space 101: How to monitor and manage it in Linux](https://fosslinux.com/114190/swap-space-101-how-to-monitor-and-manage-it-in-linux.htm)
- [Re-create Linux Home Directory for Existing Users (2026)](https://fosslinux.com/109397/creating-home-directory-for-existing-users-in-linux.htm)

:::

::: details Which is better for cloud backups, Borg or Restic?

Restic has native S3, B2, Azure, and GCS support. Borg requires SSH access to a remote server. For cloud backends, Restic is the simpler choice.

:::

::: details How much disk space do deduplication backups use?

It depends on how much your data changes. A typical desktop with 500 GB of data that changes by 5% per week will use roughly 25 GB per week with Borg deduplication, compared to 500 GB per week with plain rsync mirrors.

:::

::: details Is Borg 2 ready for production?

No. Borg 2 is in beta testing and has breaking changes between beta releases. Use Borg 1.4.4 for production backups.

:::

::: details Can I restore a Timeshift snapshot from a different distro?

Timeshift supports cross-distribution restores as long as the target system uses GRUB2 and the same Btrfs subvolume layout (if using Btrfs mode). Rsync mode is more flexible for cross-distro restores.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Linux Backup Bible: Timeshift, rsync, Borg, Restic (2026)",
  "desc": "I tested Timeshift, rsync, Borg, and Restic on Ubuntu, Fedora, and Arch. Here are the real commands, the 3-2-1 strategy, and the mistakes I learned from.",
  "link": "/fosslinux.com/linux-backup-bible-timeshift-rsync-borg-restic.md",
  "logo": "https://fosslinux.com/favicon.ico",
  "background": "rgba(3,138,255,0.2)"
}
```
