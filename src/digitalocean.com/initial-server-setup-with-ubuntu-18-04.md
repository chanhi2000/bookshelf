---
lang: en-US
title: "Initial Server Setup with Ubuntu 18.04"
description: "Article(s) > Initial Server Setup with Ubuntu 18.04"
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
      content: "Article(s) > Initial Server Setup with Ubuntu 18.04"
    - property: og:description
      content: "Initial Server Setup with Ubuntu 18.04"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-ubuntu-18-04.html
prev: /devops/linux-debian/articles/README.md
date: 2018-04-28
isOriginal: false
author:
  - name: Justin Ellingwood
    url: https://digitalocean.com//community/users/jellingwood
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
  name="Initial Server Setup with Ubuntu 18.04"
  desc="This guide will walk you through a few procedures that you should take early on in order to create a solid foundation for your new Ubuntu 18.04 server, befor… "
  url="https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

After creating a new Ubuntu 18.04 server, you should take some configuration steps as part of an initial server setup in order to increase security and facilitate management later.

This guide will walk you through a few procedures that you should complete early on in order to create a solid foundation for your new server, before moving on to installing and configuring any software or services.

---

## Step 1 — Logging in as Root

Newly installed servers typically have only a `root` account set up, and that is the account you’ll use to log into your server for the first time.

The `root` user is an administrative user that has very broad privileges. Because of the heightened privileges of the `root` account, you are *discouraged* from using it on a regular basis. This is because part of the power inherent to the `root` account is the ability to make very destructive changes, even by accident. For that reason, the recommended practice is to set up a regular system user and give this user `sudo` permissions, so that it may run administrative commands with certain limitations. In the next step, you’ll set up such a user.

To get started, you’ll need to log into your server. Make sure you know your **server’s public IP address**. To authenticate, you’ll need either the account’s password or the SSH private key for the `root` user’s account, in case you have set up an SSH key for authentication within the server. If you have not already logged into your server, you may want to follow our guide on [**how to connect to your Droplet with SSH**](/digitalocean.com/how-to-connect-to-your-droplet-with-ssh.md), which covers this process in detail.

If you are not already connected to your server, go ahead and log in as the `root` user with the following command. Be sure to replace the highlighted portion of the command with your server’s public IP address:

```sh
ssh root@your_server_ip
```

Accept the warning about host authenticity if it appears. If you are using password authentication, provide your `root` password to log in. Alternatively, if you are using an SSH key that is passphrase protected, you may be prompted to enter the passphrase the first time you use the key each session. Additionally, if this is your first time logging into the server with a password, you may also be prompted to change the `root` password.

In the next step, you’ll set up a new system user account with reduced privileges, and configure this user to run administrative commands via `sudo`.

---

## Step 2 — Creating a New User

Once you are logged in as `root`, you can create a new user that will be your regular system user from now on.

The following example creates a new user called **sammy**, but you should replace it with a username of your choice:

```sh
adduser sammy
```

You will be asked a few questions, starting with the account password.

Enter a strong password and, optionally, fill in any of the additional information if you would like. This is not required and you can just hit `ENTER` in any field you wish to skip.

In the next step, you’ll set up `sudo` privileges for this user. This will allow the user to execute administrative tasks as the `root` user through the `sudo` program.

---

## Step 3 — Granting Administrative Privileges

You have now a new user account with regular privileges. Sometimes, however, you’ll need to perform administrative tasks, like managing servers, editing configuration files, or restarting a server.

To avoid having to log out of your regular user and log back in as the `root` account, you can set up what are known as “superuser” or `root` privileges for your regular account. This will allow your regular user to run commands with administrative privileges by prefixing each command with the word `sudo`.

To add these privileges to you new user, you need to add the new user to the **sudo** group. By default on Ubuntu 18.04, users who belong to the **sudo** group are allowed to use the `sudo` command.

The following command will modify the default user settings, including the `sudo` group in the list of groups a user already belongs to. Pay attention to the `-a` argument, which stands for **append**. Without this option, the current groups a user is linked to would be replaced by `sudo`, which would cause unexpected consequences. The `-G` argument tells `usermod` to change a user’s group settings.

As `root`, run this command to add your new user to the **sudo** group (replace the highlighted word with your new user):

```sh
usermod -aG sudo sammy
```

Your system user is now set up. In the next step, you’ll configure a basic firewall for your server.

---

## Step 4 — Setting Up a Basic Firewall

UFW (Uncomplicated Firewall) is a firewall configuration tool that comes with Ubuntu servers. You can use the UFW firewall to make sure only connections to certain services are allowed on your server.

**Note:** If your servers are running on DigitalOcean, you can optionally use [DigitalOcean Cloud Firewalls](/digitalocean.com/an-introduction-to-digitalocean-cloud-firewalls) instead of the UFW firewall. We recommend using only one firewall at a time to avoid conflicting rules that may be difficult to debug.

Applications can register their profiles with UFW upon installation. These profiles allow UFW to manage per-application settings by name. OpenSSH, the service allowing you to connect to your server now, has a profile registered within UFW.

Run the following command to get a list of all current available profiles:

```sh
ufw app list
```
```
OutputAvailable applications:
  OpenSS
```

You need to make sure that the firewall allows SSH connections so that you can log back in next time. You can allow these connections by typing:

```sh
ufw allow OpenSSH
```

Afterwards, you can enable the firewall with:

```sh
ufw enable
```

Type “`y`” and press `ENTER` to proceed. You can see that SSH connections are still allowed by typing:

```sh
ufw status
```
```
OutputStatus: active

To                         Action      From
--                       ------    ----
OpenSSH                    ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6
```

As **the firewall is currently blocking all connections except for SSH**, if you install and configure additional services, you will need to adjust the firewall settings to allow acceptable traffic in. You can learn some common UFW operations in [this guide](/digitalocean.com/ufw-essentials-common-firewall-rules-and-commands).

---

## Step 5 — Enabling External Access for Your Regular User

Now that you have a regular user for daily use, you need to make sure you can SSH into the account directly.

::: note

Until verifying that you can log in and use `sudo` as your new user, we recommend staying logged in as `root`. This way, if you have problems, you can troubleshoot and make any necessary changes as `root`. If you are using a DigitalOcean Droplet and experience problems with your `root` SSH connection, you can [**log into the Droplet using the DigitalOcean Console**](/digitalocean.com/how-to-use-the-digitalocean-console-to-access-your-droplet.md).

:::

The process for configuring SSH access for your new user depends on whether your server’s `root` account uses a password or SSH keys for authentication.

### If the Root Account Uses Password Authentication

If you logged in to your `root` account *using a password*, it means that password authentication is enabled for SSH. You can SSH to your new user account by opening up a new terminal session and using SSH with your new username:

```sh
ssh sammy@your_server_ip
```

After entering your regular user’s password, you will be logged in. Remember, if you need to run a command with administrative privileges, type `sudo` before it like this:

```sh
sudo command_to_run
```

You will be prompted for your regular user password when using `sudo` for the first time each session (and periodically afterwards).

To enhance your server’s security, **we strongly recommend setting up SSH keys instead of using password authentication**. Follow our guide on [**setting up SSH keys on Ubuntu 18.04**](/digitalocean.com/how-to-set-up-ssh-keys-on-ubuntu-1804.md) to learn how to configure key-based authentication.

### If the Root Account Uses SSH Key Authentication

If you logged in to your `root` account *using SSH keys*, it’s likely that password authentication is *disabled* for SSH. You will need to add a copy of your local public key to the new user’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file to log in successfully.

Since your public key is already in the `root` account’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`<VPIcon icon="fas fa-key"/>`authorized_keys` file on the server, you can copy that file and directory structure to your new user account in your existing session.

The simplest way to copy the files with the correct ownership and permissions is with the `rsync` command. This will copy the `root` user’s <VPIcon icon="fas fa-folder-open"/>`.ssh` directory, preserve the permissions, and modify the file owners, all in a single command. Make sure to change the highlighted portions of the following command to match your regular user’s name:

::: note

The `rsync` command treats sources and destinations that end with a trailing slash differently than those without a trailing slash. When using `rsync` below, be sure that the source directory (`~/.ssh`) **does not** include a trailing slash (check to make sure you are not using <VPIcon icon="fas fa-folder-open"/>`~/.ssh/`).

:::

If you accidentally add a trailing slash to the command, `rsync` will copy the *contents* of the `root` account’s <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory to the `sudo` user’s home directory instead of copying the entire `~/.ssh` directory structure. The files will be in the wrong location and SSH will not be able to find and use them.

```sh
rsync --archive --chown=sammy:sammy ~/.ssh /home/sammy
```

Now, open up a new terminal session and try to log in with your new username:

```sh
ssh sammy@your_server_ip
```

You should be able to log into the new user account without being prompted for the remote user’s SSH password for authentication. If your SSH key was set up with a keyphrase, you may be asked to unlock the SSH key by providing that password when you use the key for the first time in a terminal session.

Remember, if you need to run a command with administrative privileges, type `sudo` before it like this:

```sh
sudo command_to_run
```

You will be prompted for your regular user password when using `sudo` for the first time each session (and periodically afterwards).

---

## Where To Go From Here?

At this point, you have a solid foundation for your server. You can install any of the software you need on your server now.

If you’d like to get more familiar with Linux commands, you can check our [**Linux Command Line Primer**](/digitalocean.com/a-linux-command-line-primer.md). To extend your setup, you may want to check our [<VPIcon icon="fa-brands fa-digital-ocean"/>Ubuntu 18.04 tag page](https://digitalocean.com/community/tags/ubuntu-18-04) for more guides based on that distribution.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Initial Server Setup with Ubuntu 18.04",
  "desc": "This guide will walk you through a few procedures that you should take early on in order to create a solid foundation for your new Ubuntu 18.04 server, befor… ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-ubuntu-18-04.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
