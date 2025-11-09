---
lang: en-US
title: "10 Little-Known Linux Commands You Probably Missed – Part 5"
description: "Article(s) > 10 Little-Known Linux Commands You Probably Missed – Part 5"
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
      content: "Article(s) > 10 Little-Known Linux Commands You Probably Missed – Part 5"
    - property: og:description
      content: "10 Little-Known Linux Commands You Probably Missed – Part 5"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/10-lesser-known-useful-linux-commands-part-v.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-02
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2013/12/lesser-known-linux-commands.webp
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
  name="10 Little-Known Linux Commands You Probably Missed – Part 5"
  desc="In this article, we cover 10 lesser-known Linux commands like startx, pdftk, lsof, and find to help boost your productivity in the terminal."
  url="https://tecmint.com/10-lesser-known-useful-linux-commands-part-v"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2013/12/lesser-known-linux-commands.webp"/>

After four highly appreciated and successful articles in our series on [**Lesser-Known Linux Commands**](/tecmint.com/51-useful-lesser-known-commands-for-linux-users.md), we’re excited to bring you the final part – but of course, it’s definitely not the least!

::: info

If you’ve missed any of the previous parts, here’s a quick recap:

- [**11 Lesser Known Useful Linux Commands – Part 1**](/tecmint.com/lesser-known-linux-commands.md)
- [**10 Lesser Known Linux Commands – Part 2**](/tecmint.com/10-lesser-known-linux-commands-part-2.md)
- [**10 Advanced Linux Commands You’ve Probably Never Used – Part 3**](/tecmint.com/lesser-known-commands-linux.md)
- [**10 Must-Know Linux Commands You Probably Missed – Part 4**](/tecmint.com/secret-linux-commands.md)

:::

Now, let’s move on to **Part 5**, where we explore 10 more practical Linux commands that don’t always get the spotlight but can quickly level up your terminal game.

---

## 42. `lsb_release` – Check Your Distro Info

The `lsb_release` command displays Linux distribution-specific information such as version, ID, release, and codename.

```sh
lsb_release -a
```

If `lsb_release` is not installed, you can use **apt** to install **lsb-core** on **Debian**, or **yum** to install **redhat-lsb** on **Red Hat**.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install lsb-core
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install redhat-lsb
```

:::

::: note

The `-a` option displays all available distribution information, including **version**, **ID**, **description**, **release**, and **codename**.

:::

---

## 43. `nc -zv localhost 80` – Check If a Port Is Open

The `nc` command (short for **netcat**), which is used to check if a particular port on your computer is open and accepting connections. It’s a very handy tool for troubleshooting network or server issues.

Checking port `80` (used by web servers):

```sh
nc -zv localhost 80
```

If port `80` is open and a service is running (like **Apache** or **Nginx**), you’ll see something like:

```plaintext title="output"
Connection to localhost 80 port [tcp/http] succeeded!
```

Checking port `8080` (another common web port):

```sh
nc -zv localhost 8080
```

If there’s no service running on that port, you’ll see:

```plaintext title="output"
nc: connect to localhost port 8080 (tcp) failed: Connection refused
```

---

## 44. curl ipinfo.io – Find Your Public IP & Location Info

This command is a quick and easy way to check your system’s public IP address and some basic location info based on that IP.

```sh
curl ipinfo.io
```

When you run it, it sends a request to the website <VPIcon icon="fas fa-file-lines"/>`ipinfo.io`, which replies with a bunch of useful details about your connection, such as:

- Your public IP address
- The hostname (if available)
- The country, region, and sometimes the city
- The geolocation (latitude and longitude)
- The ISP or organization you’re connected to

::: tip Example Output

```json
{
  "ip": "123.45.67.89",
  "hostname": "your-host.example.com",
  "city": "Mumbai",
  "region": "Maharashtra",
  "country": "IN",
  "loc": "19.0760,72.8777",
  "org": "AS12345 Your Internet Provider"
}
```

:::

This is really useful if you’re troubleshooting network issues, setting up a remote server, or just curious about your IP and location.

---

## 45. Find Files Owned by a Specific User in a Directory

The [**`find` command**](/tecmint.com/35-practical-examples-of-linux-find-command.md) helps you find all the files in the current directory (and its subdirectories) that are owned by a specific user – in this case, the `root` user.

```sh
find . -user root
```

This will list every file in the current folder and below that is owned by the user `root`.

```sh
./.recently-used.xbel
./.mysql_history
./.aptitude/
./.aptitude/config
./.aptitude/cache
./.bluefish/
./.bluefish/session-2.0
./.bluefish/autosave
./.bash_history
```

If you want to find all files owned by another user, just replace `root` with the desired username. For example, files owned by user `ravi`:

```sh
find . -user ravi
```

::: tip Example Output

```plaintext title="output"
./.cache/chromium/Cache/f_002b66
./.cache/chromium/Cache/f_001719
./.cache/chromium/Cache/f_001262
./.cache/chromium/Cache/f_000544
...
```

:::

---

## 46. sudo apt build-dep – Automatically Install Build Dependencies

The `sudo apt build-dep` command automatically installs all the required development packages (called dependencies) that are needed to compile a specific software from source.

Let’s take the example below:

```sh
sudo apt build-dep ffmpeg
```

This command will look at what’s needed to build the `ffmpeg` package from source, then download and install all those libraries and tools for you. It saves you from having to figure out and install each required package manually – which can be confusing and time-consuming.

So instead of getting stuck with error messages like “**missing dependency**” during compilation, this command sets up everything for you in advance.

---

## 47. `lsof -iTCP:80 -sTCP:LISTEN` – Check What’s Running on a Port

This command helps you find out which process or service is using a specific TCP port, like port 80 (used by web servers).

```sh
lsof -iTCP:80 -sTCP:LISTEN
```

Let’s break down the command explanation:

- `lsof` = “**List Open Files**” (in Linux, [**everything is treated like a file**](/tecmint.com/everything-is-file-and-types-of-files-linux.md) – even network connections).
- `-iTCP:80` = Filters the output to show only TCP connections on port 80.
- `-sTCP:LISTEN` = Shows only services that are actively listening for connections on that port.

::: tip Example Output

```plaintext title="output"
COMMAND  PID   USER     FD   TYPE  DEVICE SIZE/OFF NODE NAME
apache2  1566  root     5u   IPv6  5805   0t0      TCP *:www (LISTEN)
apache2  1664  www-data 5u   IPv6  5805   0t0      TCP *:www (LISTEN)
...
```

This means the **Apache2** web server is running and listening for connections on port `80`.

---

## 48. `find -size +100M` – Find Large Files Easily

Sometimes your disk gets full, and you wonder what’s eating up all that space? That’s where the `find` command comes in super handy and helps you search for big files (above a certain size) starting from your current directory and checking every folder inside it – that’s what we call “**recursively**”.

```sh
find . -size +100M
```

Here’s what it does:

- `.` – means start looking from the current directory.
- `-size +100M` – means look for files larger than 100 megabytes.

If you want, you can find even bigger files, such as 1000 MB (that’s 1 GB):

```sh
find . -size +1000M
```

This will only find really large files that are over 1 GB in size.

---

## 49. `pdftk` – Merge Multiple PDF Files into One

The `pdftk` (**PDF Toolkit**) command is a handy tool that lets you combine multiple PDF files into a single file, which is super useful when you have several documents, such as reports, scanned pages, or ebooks, and want to keep them all together in one neat file.

You’ll need to have `pdftk` installed on your system.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install pdftk
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install pdftk
```

:::

To merge multiple PDF files (say `1.pdf`, `2.pdf`, …, `10.pdf`) into one:

```sh
pdftk 1.pdf 2.pdf 3.pdf 4.pdf 5.pdf cat output merged.pdf
```

---

## 50. `ps -LF -u` – Check User Processes and Threads

The following command shows all the running processes and threads for a specific user in a detailed format.

```sh
ps -LF -u ravi
```

::: info Let’s break it down:

- [**`ps`**](/tecmint.com/ps-command-examples-for-linux-process-monitoring.md) is the standard command to list running processes on your system.
- `-L` shows threads (not just processes), which is helpful because one process can have multiple threads.
- `-F` gives you a full-format listing, meaning you’ll see more columns with detailed information.
- `-u user_name` limits the results to processes run by a specific user (replace `user_name` with the actual username).

:::

This will display all processes and threads run by the user `ravi`, including **Process IDs**, **Thread IDs**, **CPU usage**, **Start time,** and the **actual command or program being run**.

---

## 51. Startx — :1 – Run Multiple Graphical Sessions

Ever found yourself needing to log in and out of your graphical desktop just to switch users or run a separate session? That’s where the `startx` command comes in handy.

The `startx -- :1` command lets you start a brand-new X session (a separate graphical desktop environment) without closing your current one, which means you can have multiple GUI sessions running at the same time – useful for testing, multitasking, or switching between users without logging out.

Once you’ve started a second X session using:

```sh
startx -- :1
```

You can switch between the sessions using keyboard shortcuts:

- Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F7</kbd> to go to your original X session.
- Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F8</kbd> to switch to the new session you just started.

Most Linux systems reserve <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F1</kbd> to <kbd>F6</kbd> for non-graphical console terminals, and <kbd>F7</kbd> to <kbd>F12</kbd> for graphical X sessions. So technically, you can run multiple GUI environments and switch between them using these shortcuts.

---

## Conclusion

That’s a wrap for this final part of our **Lesser Known Linux Commands** series! We hope you’ve picked up some cool and useful tricks to power up your command-line experience.

If we missed any neat hidden gems, feel free to share them with us – your feedback helps us grow and serve better!

We’ll be back soon with more Linux tips, tricks, and one-liner scripts. Until then, stay healthy, stay curious, and stay connected to Tecmint!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "10 Little-Known Linux Commands You Probably Missed – Part 5",
  "desc": "In this article, we cover 10 lesser-known Linux commands like startx, pdftk, lsof, and find to help boost your productivity in the terminal.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/10-lesser-known-useful-linux-commands-part-v.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
