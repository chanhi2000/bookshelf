---
lang: en-US
title: "Initial Server Setup with Ubuntu"
description: "Article(s) > Initial Server Setup with Ubuntu"
icon: fa-brands fa-ubuntu
category:
  - DevOps
  - Linux
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - devops
  - linux
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Initial Server Setup with Ubuntu"
    - property: og:description
      content: "Initial Server Setup with Ubuntu"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-ubuntu.html
prev: /devops/linux-debian/articles/README.md
date: 2022-04-26
isOriginal: false
author: 
  - name: Jamon Camisso
    url: https://digitalocean.com/community/users/jamonation
  - name: Anish Singh Walia
    url: https://digitalocean.com/community/users/asinghwalia
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
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
  name="Initial Server Setup with Ubuntu"
  desc="When you first create a new Ubuntu server, you should perform some important configuration steps as part of the basic setup. These steps will increase the se… "
  url="https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

## Introduction

When you first create a new Ubuntu server, you should perform some important configuration steps as part of the initial setup. These steps will increase the security and usability of your server and will give you a solid foundation for subsequent actions.

Deploy your applications from GitHub using [<VPIcon icon="fa-brands fa-digital-ocean"/>DigitalOcean App Platform](https://digitalocean.com/products/app-platform). Let DigitalOcean focus on scaling your app.

---

## Step 1. Logging in as root

To log into your server, you will need to know your **server’s public IP address**. You will also need the password or the private key for the **root** user’s account if you installed an SSH key for authentication. If you have not already logged into your server, you may want to follow our guide on [<VPIcon icon="fa-brands fa-digital-ocean"/>how to Connect to Droplets with SSH](https://docs.digitalocean.com/products/droplets/how-to/connect-with-ssh/), which covers this process in detail.

If you are not connected to your server currently, log in as the **root** user using the following command. Substitute the highlighted `your_server_ip` portion of the command with your server’s public IP address:

```sh
ssh root@your_server_ip
```

Accept the warning about host authenticity if it appears. If your server uses password authentication, provide your **root** password to log in. If you use an SSH key that is passphrase protected, you may need to enter the passphrase the first time you use the key each session. If this is your first time logging into the server with a password, you may also need to change the **root** password. Follow the instructions to change the password if you receive a prompt.

### About root

The **root** user is the administrative user in a Linux environment with elevated privileges. Because of the heightened privileges of the **root** account, you are *discouraged* from using it regularly. The **root** account can make very destructive changes, even by accident.

The next step is setting up a new user account with reduced privileges for day-to-day use. Later, we’ll show you how to temporarily gain increased privileges for the times when you need them.

---

## Step 2. Creating a New User

Once you log in as **root**, you’ll be able to add the new user account. In the future, we’ll log in with this new account instead of **root**.

This example creates a new user called **sammy**, but you should replace that with a username that you like:

```sh
adduser sammy
```

You will be asked a few questions, starting with the account password.

Enter a strong password and, optionally, fill in any additional information you would like. This information is not required, and you can press <kbd>ENTER</kbd> in any field you wish to skip.

---

## Step 3. Granting Administrative Privileges

Now you have a new user account with regular account privileges. However, you will sometimes need to perform administrative tasks as the **root** user.

To avoid logging out of your regular user and logging back in as the **root** account, you can set up what is known as *superuser* or **root** privileges for your user’s regular account. These privileges will allow your normal user to run commands with administrative privileges by putting the word `sudo` before the command.

To add these privileges to your new user, you will need to add the user to the **sudo** system group. By default on Ubuntu, users who are members of the **sudo** group are allowed to use the `sudo` command.

As **root**, run this command to add your new user to the **sudo** group (substitute the highlighted `sammy` username with your new user):

```sh
usermod -aG sudo sammy
```

You can now type `sudo` before commands to run them with superuser privileges when logged in as your regular user.

---

## Step 4. Setting Up a Firewall

Ubuntu servers can use the UFW firewall to ensure only connections to certain services are allowed. You can set up a basic firewall using this application.

::: note

If your servers are running on DigitalOcean, you can optionally use [<VPIcon icon="fa-brands fa-digital-ocean"/>DigitalOcean Cloud Firewalls](https://docs.digitalocean.com/products/networking/firewalls/) instead of the UFW firewall. We recommend using only one firewall at a time to avoid conflicting rules that may be difficult to debug.

:::

Applications can register their profiles with UFW upon installation. These profiles allow UFW to manage these applications by name. OpenSSH, the service that allows you to connect to your server, has a profile registered with UFW.

You can examine the list of installed UFW profiles by typing:

```sh
ufw app list
# 
# Available applications:
#  OpenSSH
```

You will need to make sure that the firewall allows SSH connections so that you can log into your server next time. Allow these connections by typing:

```sh
ufw allow OpenSSH
```

Now enable the firewall by typing:

```sh
ufw enable
```

Type <kbd>y</kbd> and press <kbd>ENTER</kbd> to proceed. You can see that SSH connections are still allowed by typing:

```sh
ufw status
# 
# Status: active
# 
# To                         Action      From
# --                       ------    ----
# OpenSSH                    ALLOW       Anywhere
# OpenSSH (v6)               ALLOW       Anywhere (v6)
```

**The firewall is currently blocking all connections except for SSH**. If you install and configure additional services, you will need to adjust the firewall settings to allow the new traffic into your server. You can learn some common UFW operations in our [UFW Essentials guide](/community/tutorials/ufw-essentials-common-firewall-rules-and-commands).

---

## Step 5. Enabling External Access for Your Regular User

Now that you have a regular user for daily use, you will need to make sure that you can SSH into the account directly.

::: note

Until verifying that you can log in and use `sudo` with your new user, we recommend staying logged in as **root**. If you have problems connecting, you can troubleshoot and make any necessary changes as **root**. If you use a DigitalOcean Droplet and experience problems with your **root** SSH connection, you can [<VPIcon icon="fa-brands fa-digital-ocean"/>regain access to Droplets using the Recovery Console](https://docs.digitalocean.com/products/droplets/resources/recovery-console/).

:::

Configuring SSH access for your new user depends on whether your server’s **root** account uses a password or SSH keys for authentication.

### If the root Account Uses Password Authentication

If you logged in to your **root** account *using a password* then password authentication is *enabled* for SSH. You can SSH to your new user account by opening up a new terminal session and using SSH with your new username:

```sh
ssh sammy@your_server_ip
```

After entering your regular user’s password, you will be logged in. Remember, if you need to run a command with administrative privileges, type `sudo` before it like this:

```sh
sudo command_to_run
```

You will receive a prompt for your regular user’s password when using `sudo` for the first time each session (and periodically afterward).

To enhance your server’s security, **we strongly recommend setting up SSH keys instead of using password authentication**. Follow our guide on setting up SSH keys on Ubuntu to learn how to configure key-based authentication.

### If the root Account Uses SSH Key Authentication

If you logged in to your **root** account *using SSH keys*, then password authentication is *disabled* for SSH. To log in as your regular user with an SSH key, you must add a copy of your local public key to your new user’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file.

Since your public key is already in the **root** account’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file on the server, you can copy that file and directory structure to your new user account using your current session.

The simplest way to copy the files with the correct ownership and permissions is with the `rsync` command. This command will copy the **root** user’s <VPIcon icon="fas fa-folder-open"/>`.ssh` directory, preserve the permissions, and modify the file owners, all in a single command. Make sure to change the highlighted portions of the command below to match your regular user’s name:

::: note

The `rsync` command treats sources and destinations that end with a trailing slash differently than those without a trailing slash. When using `rsync` below, ensure that the source directory (<VPIcon icon="fas fa-folder-open"/>`~/.ssh`) **does not** include a trailing slash (check to make sure you are not using <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`).

If you accidentally add a trailing slash to the command, `rsync` will copy the *contents* of the **root** account’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory to the `sudo` user’s home directory instead of copying the entire <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory structure. The files will be in the wrong location and SSH will not be able to find and use them.

:::

```sh
rsync --archive --chown=sammy:sammy ~/.ssh /home/sammy
```

Now, open up a new terminal session on your local machine, and use SSH with your new username:

```sh
ssh sammy@your_server_ip
```

You should be connected to your server with the new user account without using a password. Remember, if you need to run a command with administrative privileges, type `sudo` before the command like this:

```sh
sudo command_to_run
```

You will be prompted for your regular user’s password when using `sudo` for the first time each session (and periodically afterward).

---

## Where To Go From Here?

At this point, you have a solid foundation for your server. You can install any of the software you need on your server now.

If you’d like to get more familiar with Linux commands, you can check our [**Linux Command Line Primer**](/digitalocean.com/a-linux-command-line-primer.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Initial Server Setup with Ubuntu",
  "desc": "When you first create a new Ubuntu server, you should perform some important configuration steps as part of the basic setup. These steps will increase the se… ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-ubuntu.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
