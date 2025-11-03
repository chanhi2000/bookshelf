---
lang: en-US
title: "How to Set Up Local Repositories with apt-mirror in Ubuntu"
description: "Article(s) > How to Set Up Local Repositories with apt-mirror in Ubuntu"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up Local Repositories with apt-mirror in Ubuntu"
    - property: og:description
      content: "How to Set Up Local Repositories with apt-mirror in Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/setup-local-repositories-in-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2025-07-22
isOriginal: false
author:
  - name: Matei Cezar
    url : https://tecmint.com/author/cezarmatei/
cover: https://tecmint.com/wp-content/uploads/2014/05/setup-local-ubuntu-repository-apt-mirror.webp
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

[[toc]]

---

<SiteInfo
  name="How to Set Up Local Repositories with apt-mirror in Ubuntu"
  desc="In this article, you’ll learn how to set up a local Ubuntu repository using apt-mirror to save bandwidth and speed up package installs."
  url="https://tecmint.com/setup-local-repositories-in-ubuntu"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/05/setup-local-ubuntu-repository-apt-mirror.webp"/>

If you’re managing multiple **Ubuntu** machines in a network, downloading updates and packages for each system individually is a pain, as it eats up your bandwidth and takes more time than it should.

Wouldn’t it be nice if you could download all the required packages just once and let all your systems install them locally from your own repository? that’s exactly what `apt-mirror` helps you do.

In this article, I’ll walk you through step-by-step on how to set up a local **Ubuntu** repository using `apt-mirror`.

---

## What is apt-mirror?

`apt-mirror` is a small tool that downloads an entire **APT** repository (or a subset of it) from the **Ubuntu** mirrors and saves it locally on your server. You can then serve this local repository over **HTTP**, and point your client machines to it.

Basically, `apt-mirror` helps you:

- Create a local mirror of Ubuntu packages.
- Reduce internet usage (great for limited bandwidth setups).
- Speed up package installations and updates.
- Work in offline or isolated environments.

---

## What You’ll Need (In Detail)

Before we roll up our sleeves and start mirroring **Ubuntu** repositories, let’s make sure you’ve got everything in place.

Here’s a breakdown of the essentials and why each one matters.

- You’ll need a dedicated **Ubuntu** machine, preferably running a recent **LTS** (**Long-Term Support**) version such as **Ubuntu 24.04**, **Ubuntu 22.04**, or **Ubuntu 20.04**.
- You’ll need between **150GB** to **250GB** of [**free disk space**](/tecmint.com/bleachbit-disk-space-cleaner-for-linux.md), depending on how much of the Ubuntu repository you plan to mirror.
- You should be comfortable using the command line: editing files, [**running commands**](/tecmint.com/essential-linux-commands.md) with `sudo`, installing packages, and setting up basic services like **Apache** or **Nginx**.
- You’ll need a stable and reasonably fast internet connection for the first sync, as it can download tens or even hundreds of gigabytes, which is especially important if you’re mirroring an entire Ubuntu release with multiple components.

---

## Step 1: Install apt-mirror for Local APT Repository in Ubuntu

To begin setting up a local repository, the first step is to install the `apt-mirror` package, which is specifically designed to help you create a complete or partial mirror of Ubuntu’s official APT repositories.

Start by updating your system’s package index to ensure you get the latest version of available software.

```sh
sudo apt update
```

Once the update is complete, install the `apt-mirror` tool using the command:

```sh
sudo apt install apt-mirror
```

After installation, `apt-mirror` is ready to be configured for your specific mirroring needs.

---

## Step 2: Creating Necessary Folders for Local Ubuntu Repository

When you use `apt-mirror`, it needs a place on your system to download and store all the repositories such as data packages, metadata, and structure.

By default, it saves everything under the directory <VPIcon icon="fas fa-folder-open"/>`/var/spool/apt-mirror`, which becomes the local replica of the Ubuntu repository you’re mirroring.

Although you can change this location by modifying the configuration file (we’ll get to that in a later step), it’s important to first make sure the directory exists and is ready to be used.

```sh
sudo mkdir -p /var/spool/apt-mirror
```

In addition to this, we also create another directory at <VPIcon icon="fas fa-folder-open"/>`/var/www/html/ubuntu`, which will be the public-facing folder from which client machines on your network can access the mirrored repository via a web server like **Apache** or **Nginx**.

```sh
sudo mkdir -p /var/www/html/ubuntu
```

Later in the process, we’ll synchronize the contents from the mirror directory into this web-accessible path. That way, your internal machines don’t need to reach out to the internet—they’ll pull updates directly from your local mirror through HTTP.

---

## Step 3: Configure apt-mirror

Once you’ve installed `apt-mirror`, you need to tell it what to download, where to store it, and how to behave during the sync. All of that is controlled through the main configuration file located at:

```sh
/etc/apt/mirror.list
```

Open the file in your favorite editor.

```sh
sudo nano /etc/apt/mirror.list
```

Now let’s look at a sample configuration to mirror **Ubuntu 24.04 (Noble Numbat)** for amd64 (64-bit) systems:

```sh :collapsed-lines title="/etc/apt/mirror.list"
############# apt-mirror config #############

# Directory to store the mirrored files
set base_path    /var/spool/apt-mirror

# Internal structure directories
set mirror_path  $base_path/mirror
set skel_path    $base_path/skel
set var_path     $base_path/var
set cleanscript  $var_path/clean.sh

# Architecture you want to mirror
set defaultarch  amd64

# Number of download threads (10–20 is good for most)
set nthreads     10

# Tilde files control (leave as is)
set _tilde 0

############# Repositories to Mirror ###########

# Base Ubuntu 24.04 repositories
deb http://archive.ubuntu.com/ubuntu noble main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu noble-updates main restricted universe multiverse
deb http://archive.ubuntu.com/ubuntu noble-backports main restricted universe multiverse

# Security updates
deb http://security.ubuntu.com/ubuntu noble-security main restricted universe multiverse

############# Clean Instructions ##############

clean http://archive.ubuntu.com/ubuntu
clean http://security.ubuntu.com/ubuntu

##############################################
```

---

## Step 4: Start Mirroring APT Packages

Once you’ve properly configured your <VPIcon icon="fas fa-file-lines"/>`mirror.list` file with the repositories and components you want to mirror. It’s time to run the `apt-mirror` command to download the Ubuntu packages to your local server.

```sh
sudo apt-mirror
```

The above command connects to the official Ubuntu mirror servers, fetches the metadata and package files you specified earlier, and saves them to your local disk under <VPIcon icon="fas fa-folder-open"/>`/var/spool/apt-mirror`.

Depending on how many components you included (like `main`, `universe`, etc.) and how many architectures (like amd64 or i386), this process can take several hours and might consume over 100 GB of disk space. So make sure your server has enough free storage before you begin.

I highly recommend running the above command inside a [**`screen`**](/tecmint.com/screen-command-examples-to-manage-linux-terminals.md) or [**`tmux`**](/tecmint.com/tmux-to-access-multiple-linux-terminals-inside-a-single-console.md) session, because large downloads take time, and if your SSH session gets disconnected or your terminal closes, the download will stop. Using screen or tmux ensures the process continues running in the background, even if you lose connection.

---

## Step 5: Serve the Mirror via Apache or Nginx

Once your system has finished downloading all the Ubuntu packages using `apt-mirror`, the next step is to make those packages accessible to other machines on your network.

To do this, you’ll need to serve the mirrored files over **HTTP**, which is where a web server like **Apache** or **Nginx** comes into play.

In this guide, we’ll use **Apache** for simplicity, so start by installing **Apache** using the command:

```sh
sudo apt install apache2
```

Once it’s installed, you’ll need to make your local mirror directory accessible to Apache’s default web root, which is typically located at <VPIcon icon="fas fa-folder-open"/>`/var/www/html`.

To do that, you can create symbolic links from the mirrored directories to the web root. For example, use the following commands to link the Ubuntu archive and security mirrors:

```sh
sudo ln -s /var/spool/apt-mirror/mirror/archive.ubuntu.com/ubuntu /var/www/html/ubuntu
sudo ln -s /var/spool/apt-mirror/mirror/security.ubuntu.com/ubuntu /var/www/html/ubuntu-security
```

After linking, it’s time to test if the mirror is working, open a web browser and go to `http://your-server-ip/ubuntu/dists/noble/`. Replace `your-server-ip` with the actual IP address of your mirror server. If everything is set up correctly, you should see the directory listing or release files for the **noble** distribution.

---

## Step 6: Configure Clients to Use the Local Mirror

Once your local APT mirror is set up and served over HTTP, the next step is to configure your client machines to use it instead of reaching out to the internet for packages, which means you’ll need to edit the <VPIcon icon="fas fa-file-lines"/>`sources.list` file on each client, which tells the system where to fetch updates and software from.

Start by making a backup of the existing <VPIcon icon="fas fa-file-lines"/>`sources.list` file, just in case you need to revert to the original settings later.

```sh
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

After that, open the file in your preferred text editor.

```sh
sudo nano /etc/apt/sources.list
```

Now comes the important part — replace the default Ubuntu mirror URLs with the IP address (or hostname) of your local mirror server. For example, if your local server IP is `192.168.1.100`, your sources list should look like this:

```sh title="/etc/apt/sources.list"
deb http://192.168.1.100/ubuntu noble main restricted universe multiverse
deb http://192.168.1.100/ubuntu noble-updates main restricted universe multiverse
deb http://192.168.1.100/ubuntu-security noble-security main restricted universe multiverse
```

These lines tell the client machine to fetch the base system packages, updates, and security patches directly from the local mirror instead of going out to `archive.ubuntu.com` or `security.ubuntu.com`.

Once you’ve made these changes, save and run:

```sh
sudo apt update
```

This will refresh the package index using your local repository. If everything is configured correctly and your local mirror is accessible, the client should now pull updates and install packages directly from your server, resulting in faster installations and less internet usage.

---

## Step 7: Automate Mirror Sync

Once you’ve completed the initial synchronization of your local Ubuntu mirror using `apt-mirror`, the next important step is to keep it updated regularly.

Ubuntu repositories are updated frequently with new packages, security patches, and bug fixes. If your local mirror becomes outdated, your client systems won’t benefit from these updates, defeating the purpose of having a mirror in the first place.

To handle this automatically, we use a simple but powerful Linux feature called `cron`, which allows you to schedule tasks (called [**`cron` jobs**](/tecmint.com/create-and-manage-cron-jobs-on-linux.md)) to run at specific times or intervals.

To do this, open the root user’s crontab file by running:

```sh
sudo crontab -e
```

Now, add the following line to the bottom of the file:

```sh
0 2 * * * /usr/bin/apt-mirror > /var/log/apt-mirror.log
```

This line tells the system to run the `apt-mirror` command every day at 2:00 AM. The `> /var/log/apt-mirror.log` part sends the output of the command to a log file, so you can check it later if you need to troubleshoot.

---

## Conclusion

Setting up a local Ubuntu APT repository with `apt-mirror` is a great solution for anyone managing multiple machines on a network. It not only saves time and bandwidth but also ensures faster package installations and easier maintenance, especially in environments with limited or no internet access.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up Local Repositories with apt-mirror in Ubuntu",
  "desc": "In this article, you’ll learn how to set up a local Ubuntu repository using apt-mirror to save bandwidth and speed up package installs.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/setup-local-repositories-in-ubuntu.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
