---
lang: en-US
title: "Difference Between su and sudo and Configuring sudo in Linux"
description: "Article(s) > Difference Between su and sudo and Configuring sudo in Linux"
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
      content: "Article(s) > Difference Between su and sudo and Configuring sudo in Linux"
    - property: og:description
      content: "Difference Between su and sudo and Configuring sudo in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux.html
prev: /programming/sh/articles/README.md
date: 2025-09-22
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2014/03/Understanding-su-vs-sudo-in-Linux.webp
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
  name="Difference Between su and sudo and Configuring sudo in Linux"
  desc="Learn the difference between su and sudo in Linux and how to configure sudo for secure user permissions and system access."
  url="https://tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2014/03/Understanding-su-vs-sudo-in-Linux.webp"/>

**Linux** is generally more secure than many other operating systems. A key part of this security comes from [**user management and permissions**](/tecmint.com/linux-user-account-management.md), which control who can do what on the system. By default, normal users cannot perform system-level operations.

When a regular user needs to make changes that affect the entire system, they must use either the `su` or `sudo` command to gain temporary administrative privileges.

---

## Understanding su and sudo?

The following explanation is based on [**Ubuntu-based distributions**](/tecmint.com/ubuntu-based-linux-distributions.md), but it applies to [**most popular Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md).

- `su` (**substitute user**) – This command lets you switch to another user account, usually the root account. To use it, you need the root password, which means sharing this password with others if they also need access, which is considered risky.
- `sudo` (**superuser do**) – This command allows a user to execute specific system commands with administrative privileges without sharing the root password. Instead, users enter their own password, which provides safer delegation of responsibilities.

::: tip Example

```sh
# Using su to switch to root
su -
# Password: [root password here]

# Using sudo to update packages
sudo apt update
#
# [sudo] password for user: [your password here]
```

As you can see, `sudo` provides a safer and more flexible way to perform administrative tasks compared to `su`.

:::

---

## What is sudo?

`sudo` is a special program (**setuid binary**) that allows authorized users to run commands as the root user or another user. It provides a safe way to perform administrative tasks without sharing the root password.

When you use `sudo`, you must enter your own password, not the root password, which ensures accountability for every command you run is tied to your account.

In the following example, the Apache web server restarts with root privileges, do notice that the user never types the root password; their own password is used instead.

```sh
sudo systemctl restart apache2
```

---

## Who Can Use sudo?

The list of users who can run `sudo` is controlled in the `/etc/sudoers` file, which can be edited by the `visudo` command to avoid syntax errors that can break your system:

```sh
sudo visudo
```

A default entry looks like this, which means the root user can run any command on any host as any user.

```sh
root ALL=(ALL:ALL) ALL
```

![`visudo` Configuration](https://tecmint.com/wp-content/uploads/2014/03/Visudo-File.png)

---

## Granting sudo Access to Other Users

Giving unrestricted `sudo` access to multiple users can be risky. If every user can run any command as root, a simple mistake or a compromised account could break the system or expose sensitive data.

::: critical Dangerous example (don’t do this)

```sh
adam ALL=(ALL:ALL) ALL
tom  ALL=(ALL:ALL) ALL
```

Here, `adam` and `tom` can run any command as root on any machine, which effectively gives them full administrative power similar to root user.

:::

Instead, grant only the specific privileges each user needs, as explained below.

---

## Understanding sudo Syntax

A properly configured `sudo` is very flexible, and the number of commands a user can run may be precisely configured.

The syntax of a configured `sudo` line is:

```sh
User_name Machine_name=(Effective_user) command
```

This syntax can be divided into four parts:

- `User_name` → Name of the `sudo` user.
- `Machine_name` → Hostname where the `sudo` command is valid, which is useful when you have multiple hosts.
- `Effective_user` → The user as whom the command will run (for example, root or another account).
- `command` → The command or commands that this user is allowed to execute.

This structure allows administrators to give precise control over what each user can do, instead of giving full root access.

---

## Example sudo Configurations

Here are some common situations and how you can configure `sudo` for each:

### 1. Granting Full Database Access to a Specific User

You have a user `mark` who is a **Database Administrator,** and you want him to have full access to the **Database Server** `beta.database_server.com`, but no access on other hosts, your sudo line should be:

```sh
mark beta.database_server.com=(ALL) ALL
```

### 2. Running Commands as a Specific Non-root User

You have a user `tom` who should execute system commands as a specific user (not **root**) on the same **Database Server**?

```sh
tom beta.database_server.com=(tom) ALL
```

### 3. Restricting a User to a Single Command

You have a sudo user `cat` who should only run the command `dog`.

```sh
cat beta.database_server.com=(cat) dog
```

### 4. Allowing a User to Run Multiple Commands

A user needs to execute several commands, but the list is short (fewer than 10 commands).

```sh
cat beta.database_server.com=(cat) /usr/bin/command1 /usr/sbin/command2 /usr/sbin/command3
```

For longer lists of commands, it is better to use aliases.

```sh
User_Alias ADMINS=tom,jerry,adam
User_Alias WEBMASTERS=henry,mark
WEBMASTERS WEBSERVERS=(www) APACHE
Cmnd_Alias PROC=/bin/kill,/bin/killall,/usr/bin/top
```

You can also assign commands to an entire group by prefixing the group name with `%`:

```sh
%apacheadmin WEBSERVERS=(www) APACHE
```

### 5. Allowing sudo Without a Password

A user needs to run specific commands without entering a password.

```sh
adam ALL=(ALL) NOPASSWD: PROCS
```

Here, user `adam` can execute all commands aliased under `PROCS` without entering a password.

---

## Summary

`sudo` provides a robust and safe environment with flexibility compared to `su`. Moreover, `sudo` configuration is easy. Some Linux distributions have `sudo` enabled by default, while most of the distros today require you to enable it as a security measure.

To add a user `(bob)` to `sudo`, just run the following command as root:

```sh
adduser bob sudo
```

That’s all for now. I’ll be back with another interesting article. Till then, stay tuned and connected to Tecmint. Don’t forget to provide us with your valuable feedback in the comment section.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Difference Between su and sudo and Configuring sudo in Linux",
  "desc": "Learn the difference between su and sudo in Linux and how to configure sudo for secure user permissions and system access.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/su-vs-sudo-and-how-to-configure-sudo-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
