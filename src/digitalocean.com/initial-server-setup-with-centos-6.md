---
lang: en-US
title: "Initial Server Setup with CentOS 6"
description: "Article(s) > Initial Server Setup with CentOS 6"
icon: fa-brands fa-centos
category: 
  - Linux
  - Fedora
  - CentOS
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - linux
  - fedora
  - centos
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Initial Server Setup with CentOS 6"
    - property: og:description
      content: "Initial Server Setup with CentOS 6"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-centos-6.html
prev: /devops/linux-fedora/articles/README.md
date: 2012-05-22
isOriginal: false
author: Etel Sverdlov
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Fedroa >  > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Initial Server Setup with CentOS 6"
  desc="This tutorial covers how to login with root, how to change the root password, how to create a new user, how to give the new user root privileges, how to chan… "
  url="https://digitalocean.com/initial-server-setup-with-centos-6"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

::: critical Status: Deprecated

This article covers a version of CentOS that is no longer supported. If you are currently operating a server running CentOS 6, we highly recommend upgrading or migrating to a supported version of CentOS.

**Reason:**

[<FontIcon icon="fa-brands fa-centos"/>CentOS 6 reached end of life (EOL) on November 30th, 2020](https://wiki.centos.org/About/Product) and no longer receives security patches or updates. For this reason, this guide is no longer maintained.

**See Instead:**

This guide might still be useful as a reference, but may not work on other CentOS releases. If available, we strongly recommend using a guide written for the version of CentOS you are using.

:::

---

## The Basics

When you first begin to access your fresh new virtual private server, there are a few early steps you should take to make it more secure. Some of the first tasks can include setting up a new user, providing them with the proper privileges, and configuring SSH.

---

## Step One—Root Login

Once you know your IP address and root password, login as the main user, root.

It is not encouraged to use root on a regular basis, and this tutorial will help you set up an alternative user to login with permanently.

```sh
ssh root@123.45.67.890
# 
# The authenticity of host '69.55.55.20 (69.55.55.20)' can't be established.
# ECDSA key fingerprint is 79:95:46:1a:ab:37:11:8e:86:54:36:38:bb:3c:fa:c0.
# Are you sure you want to continue connecting (yes/no)? 
```

Go ahead and type yes, and then enter your root password.

---

## Step Two—Change Your Password

Currently your root password is the default one that was sent to you when you registered your droplet. The first thing to do is change it to one of your choice.

```sh
passwd
```

CentOS is very cautious about the passwords it allows. After you type your password, you may see a BAD PASSWORD notice. You can either set a more complex password or ignore the message—CentOS will not actually stop you from creating a short or simple password, although it will advise against it.

---

## Step Three— Create a New User

After you have logged in and changed your password, you will not need to login again to your VPS as root. In this step we will make a new user, with a new password, and give them all of the root capabilities.

First, create your user; you can choose any name for your user. Here I’ve suggested Demo

```sh
/usr/sbin/adduser demo
```

Second, create a new user password:

```sh
passwd demo
```

---

## Step Four— Root Privileges

As of yet, only root has all of the administrative capabilities. We are going to give the new user the root privileges.

When you perform any root tasks with the new user, you will need to use the phrase `sudo` before the command. This is a helpful command for 2 reasons:

1. it prevents the user from making any system-destroying mistakes 
2. it stores all the commands run with sudo to the file <FontIcon icon="fas fa-folder-open"/>`/var/log/secure` which can be reviewed later if needed.

Let’s go ahead and edit the sudo configuration. This can be done through the default editor, which in CentOS is called `vi`

Find the section called user privilege specification.

It will look like this:

```sh
/usr/sbin/visudo
# 
# # User privilege specification
# root    ALL=(ALL)       ALL
```

Under the details of root's privileges, add the following line, granting all the permissions to your new user.

To began typing in vi, press “a”.

```plaintext
demo    ALL=(ALL)       ALL
```

Press <kbd>esc</kbd>, <kbd>:</kbd>, <kbd>w</kbd>, <kbd>q</kbd>, then <kbd>Enter</kbd> to save and exit the file.

---

## Step Five— Configure SSH (OPTIONAL)

Now it’s time to make the server more secure. These steps are optional. They will make the server more secure by making login more difficult.

Open the configuration file

```sh
sudo vi /etc/ssh/sshd\_config
```

Find the following sections and change the information where applicable:

```plaintext title="/etc/ssh/sshd\_config"
Port 25000
Protocol 2
PermitRootLogin no
UseDNS no
```

We’ll take these one by one.

Port: Although port 22 is the default, you can change this to any number between 1025 and 65535. In this example, I am using port 25000. Make sure you make a note of the new port number. You will need it to login in the future, and this change will make it more difficult for unauthorized people to log in.

PermitRootLogin: change this from yes to no to stop future root login. You will now only login as the new user.

Add this line to the bottom of the document, replacing demo with your username:

```plaintext
AllowUsers demo
```

Save and Exit

---

## Step Six— Reload and Done!

Reload SSH, and it will implement the new ports and settings.

```sh
service sshd reload
```

**To test the new settings (don’t logout of root yet), open a new terminal window and login into your virtual server as your new user.**

Don’t forget to include the new port number.

Your prompt should now say:

```sh
ssh -p 25000 demo@123.45.67.890
#
# \[demo@yourname ~\]$
```

---

## See More

As you start securing your droplet with SSH, you can continue to improve its security by installing programs, such as [Fail2Ban](/digitalocean.com/how-to-protect-ssh-with-fail2ban-on-centos-6.md) or [Deny Hosts](/digitalocean.com/how-to-install-denyhosts-on-centos-6.md), to prevent against brute force attacks on the server.

You can also find the tutorial to install the LAMP stack on the server [here](/digitalocean.com/how-to-install-linux-apache-mysql-php-lamp-stack-on-centos-6.md) or the LEMP stack on the server [here](/digitalocean.com/how-to-install-linux-nginx-mysql-php-lemp-stack-on-centos-6.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Initial Server Setup with CentOS 6",
  "desc": "This tutorial covers how to login with root, how to change the root password, how to create a new user, how to give the new user root privileges, how to chan… ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/initial-server-setup-with-centos-6.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
