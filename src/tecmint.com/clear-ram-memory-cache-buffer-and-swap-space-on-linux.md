---
lang: en-US
title: "How to Clear RAM Cache, Buffers, and Swap in Linux Without Reboot"
description: "Article(s) > How to Clear RAM Cache, Buffers, and Swap in Linux Without Reboot"
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
      content: "Article(s) > How to Clear RAM Cache, Buffers, and Swap in Linux Without Reboot"
    - property: og:description
      content: "How to Clear RAM Cache, Buffers, and Swap in Linux Without Reboot"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux.html
prev: /programming/sh/articles/README.md
date: 2025-07-25
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2015/05/Clear-RAM-Cache-in-Linux.jpg
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
  name="How to Clear RAM Cache, Buffers, and Swap in Linux Without Reboot"
  desc="Is your Linux system slow? Learn how to safely clear RAM cache, buffer, and swap space to instantly free up memory. Simple steps, no reboot required."
  url="https://tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2015/05/Clear-RAM-Cache-in-Linux.jpg"/>

## Like any other operating system, GNU/Linux has implemented memory management efficiently and even more than that. However, if any process is eating away your memory and you want to clear it, Linux provides a way to flush or clear the RAM cache.

**You might also like:**

- [Find Top 15 Processes by Memory Usage in Linux](https://tecmint.com/find-processes-by-memory-usage-top-batch-mode/ "Find Linux Processes by Memory Usage")
- [Find Top Running Processes by Highest Memory and CPU Usage in Linux](https://tecmint.com/find-linux-processes-memory-ram-cpu-usage/ "Find Top Running Processes by CPU Usage in Linux")
- [How to Limit Time and Memory Usage of Processes in Linux](https://tecmint.com/limit-time-and-memory-usage-of-linux-process/ "Limit Memory Usage of Processes")

In this article, we will explore how to clear RAM memory cache, buffer, and swap space on a Linux system to enhance overall performance.

---

## Understanding RAM Memory Cache, Buffer, and Swap Space

Let’s explore RAM memory cache, buffer, and swap space on a Linux system.

### RAM Memory Cache

The **RAM memory cache** is a mechanism used by the kernel to keep regularly accessed data. While this boosts system responsiveness, an overloaded cache can lead to the retention of obsolete data, affecting performance.

### Buffer

Like **cache**, the buffer holds data temporarily but differs in its purpose. Buffers store data being transferred between components like the CPU and hard disk, facilitating smooth communication. However, an excess of buffered data can hinder system speed.

### Swap Space

**Swap space** is an allocated area on the hard disk that acts as virtual memory when physical RAM is exhausted. While it prevents system crashes due to low memory, it can slow down the system if overused.

---

## Clearing Cache, Buffer, and Swap Space in Linux

In certain situations, you may need to clear the **cache**, **buffer**, or **swap space** as explained below.

Before you begin, you may want to check the current memory usage using:

```sh
free -h
# Or
vmstat -s
```

This helps you verify if clearing memory actually has any visible effect.

### How to Clear RAM Memory Cache in Linux?

Every Linux system has three options to clear the cache without interrupting any processes or services.

#### 1. Clearing PageCache

To clear the **PageCache** only, you can use the following command, which will specifically clear the PageCache, helping to free up memory resources.

```sh
sudo sync; echo 1 > /proc/sys/vm/drop_caches
```

::: note

On some systems, the [**`echo` command**](/tecmint.com/echo-command-in-linux.md) may not work due to permission restrictions. In that case, use:

```sh
echo 1 | sudo tee /proc/sys/vm/drop_caches
```

:::

#### 2. Clearing Dentries and Inodes

To clear the **dentries** and **inodes** only, you can use the following command, which will sync the filesystem and clear both dentries and inodes, improving system performance by releasing cached directory and inode information.

```sh
sudo sync; echo 2 > /proc/sys/vm/drop_caches
```

#### 3. Clearing PageCache, Dentries, and Inodes

To clear the **pagecache**, **dentries**, and **inodes**, you can use the following command, which will sync the filesystem and clear the pagecache, dentries, and inodes, helping to free up memory and improve system performance.

```sh
sudo sync; echo 3 > /proc/sys/vm/drop_caches 
```

Again, if the above does not work due to permissions, use:

```sh
echo 3 | sudo tee /proc/sys/vm/drop_caches
```

After clearing, you can re-check memory usage using:

```sh
free -h
```

Here’s an explanation of each part of the above command:

- The `sudo` is used to execute the command as a superuser.
- The `sync` will flush the file system buffer.
- The `“;”` semicolon is used to separate multiple commands on a single line.
- The `echo 3 > /proc/sys/vm/drop_caches` command is used to drop the page cache, a temporary storage area for recently accessed files.

::: note

The `drop_caches` file controls which type of cached data should be cleared, and the values are as follows:

- `1` – Clears only the page cache.
- `2` – Clears dentries and inodes.
- `3` – Clears page cache, dentries, and inodes.

:::

As mentioned in the kernel documentation, writing to **drop_caches** will clean the cache without killing any application/service, [**command `echo`**](/tecmint.com/echo-command-in-linux.md) is doing the job of writing to the file.

If you have to clear the disk cache, the first command is safest in enterprise and production as `“...echo 1 > ….”` will clear the **PageCache** only.

It is not recommended to use the third option above `“...echo 3 >”` in production until you know what you are doing, as it will clear **pagecache**, **dentries,** and **inodes**.

### How to Clear Swap Space in Linux?

To clear swap space, you can use the **swapoff** command with the `-a` option, which will disable all swap partitions.

```sh
sudo swapoff -a
```

Then, turn it back by running the following command, which will activate all swap partitions.

```sh
sudo swapon -a
```

---

## Is It Advisable to Free Buffer, Cache, and Swap in Linux?

In general, it is not a good idea to manually free up **Buffer** and **Cache** in Linux which might be used by the Linux kernel, which is designed to manage these resources efficiently, and manually clearing them can disrupt system performance.

However, there may be rare situations where you need to clear the **Buffer** and **Cache**, such as if you are experiencing severe memory pressure and cannot free up memory by other means. In these cases, you should proceed with caution and be aware of the potential performance impact.

Similarly, clearing swap space in Linux is generally not a routine or advisable practice under normal circumstances.

---

## Automating Memory Optimization

To automate the process and regularly clear memory, you can [**set up a cron job**](/tecmint.com/create-and-manage-cron-jobs-on-linux.md) to run the commands at specified intervals.

Open the crontab configuration.

```sh
crontab -e
#
# 0 0 * * * sudo sync; echo 3 > /proc/sys/vm/drop_caches
# 0 0 * * * sudo echo 1 > /proc/sys/vm/drop_caches
# 0 0 * * * sudo sync; echo 2 > /proc/sys/vm/drop_caches
# 0 0 * * * sudo swapoff -a && sudo swapon -a
```

Add the following lines to clear cache, buffer, and swap space daily at midnight:

::: note

`sudo` may not work inside **crontab** unless the root user’s crontab is used or passwordless sudo is configured for those commands. Consider placing your commands inside a script and scheduling that instead.

:::

For additional information on scheduling a job with cron, you may want to refer to our article titled ‘[**11 Cron Scheduling Jobs**](/tecmint.com/11-cron-scheduling-task-examples-in-linux.md)‘.

---

## Is It Advisable to Clear RAM Cache on a Linux Production Server?

No, it is not. Consider a scenario where you have scheduled a script to clear the RAM cache every day at 2 am. Each day at 2 am, the script is executed, flushing your RAM cache. However, one day, unexpectedly high numbers of users are online on your website, placing a significant demand on your server resources.

Simultaneously, the scheduled script runs and clears everything in the cache. Now, all users are retrieving data from the disk, potentially leading to a server crash and database corruption. Therefore, it’s essential to clear the RAM cache only when necessary, being mindful of your actions. Otherwise, you risk becoming a Cargo Cult System Administrator.

---

## Conclusion

Efficient memory management is crucial for a smoothly running Linux system. Regularly clearing the RAM memory cache, buffer, and swap space can significantly enhance system performance. By understanding these mechanisms and [**employing the provided commands**](/tecmint.com/essential-linux-commands.md), you can keep your Linux system running at its best.

That’s all for now. If you enjoyed the article, please remember to share your valuable feedback in the comments. Let us know your thoughts on what you believe is a good approach for clearing the RAM cache and buffer in production and enterprise environments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Clear RAM Cache, Buffers, and Swap in Linux Without Reboot",
  "desc": "Is your Linux system slow? Learn how to safely clear RAM cache, buffer, and swap space to instantly free up memory. Simple steps, no reboot required.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/clear-ram-memory-cache-buffer-and-swap-space-on-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
