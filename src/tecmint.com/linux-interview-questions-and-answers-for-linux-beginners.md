---
lang: en-US
title: "10 Linux Interview Questions with Examples – Part 3"
description: "Article(s) > 10 Linux Interview Questions with Examples – Part 3"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Fedora
  - Debian
  - Data Science
  - MySQL
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - linux
  - fedora
  - debian
  - data-science
  - mysql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 10 Linux Interview Questions with Examples – Part 3"
    - property: og:description
      content: "10 Linux Interview Questions with Examples – Part 3"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/linux-interview-questions-and-answers-for-linux-beginners.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-07-01
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2013/12/linux-interview-questions-part-3.webp
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

```component VPCard
{
  "title": "MySQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mysql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="10 Linux Interview Questions with Examples – Part 3"
  desc="In this Interview Series article, we present 10 practical Linux questions and answers to help beginners build confidence through hands-on examples."
  url="https://tecmint.com/linux-interview-questions-and-answers-for-linux-beginners"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2013/12/linux-interview-questions-part-3.webp"/>

Welcome back to our **Linux Interview Questions** series on **Tecmint**! We’re truly grateful for the encouraging feedback on the [**first part**](/tecmint.com/basic-linux-interview-questions-and-answers.md) and [**second part**](/tecmint.com/linux-interview-questions-and-answers.md) of this series. Your support motivates us to keep delivering high-quality, beginner-friendly content for Linux learners and professionals preparing for technical interviews.

In this third installment, we continue to build on your foundational knowledge with 10 more essential Linux questions, which are designed to enhance your understanding through practical examples and clear explanations.

---

## 1. How do you add a new user (e.g., tux) to your Linux system?

You can add a new user using either the [`useradd`](/tecmint.com/add-users-in-linux.md) or **adduser** command, both are used for user creation but behave slightly differently depending on the Linux distribution.

### Using useradd (Low-level Command)

`useradd` is a standard command found in almost [**all Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md), which adds a user but doesn’t automatically set up a home directory or prompt you for a password unless additional options are used.

```sh
sudo useradd tux
sudo passwd tux
```

To create the home directory and default configuration files, include the -m option:

```sh
sudo useradd -m tux
```

### Using `adduser` (Debian-based Distros)

`adduser` is a more user-friendly, high-level command mostly used on [**Debian-based distributions**](/tecmint.com/debian-based-linux-distributions.md) such as **Ubuntu** and **Mint**, which is actually a Perl script that wraps around `useradd` and provides a guided setup.

```sh
sudo adduser tux
```

This command creates the user `tux`, sets up their home directory, copies default config files, and prompts you to set a password and user info (like full name).

---

## 2. How many primary partitions are possible on one drive?

A maximum of 4 primary partitions can be created on a single physical hard drive using the traditional **MBR** (**Master Boot Record**) partitioning scheme.

::: info Explanation

- The **MBR (Master Boot Record)** partitioning system allows:
  - Up to **4 primary partitions**, or
  - **3 primary partitions** and **1 extended partition**
  - The extended partition can contain **multiple logical partitions**, allowing more flexibility
- If you need more than 4 partitions:
  - Create **3 primary partitions**
  - Create **1 extended partition**
  - Inside the extended partition, create as many **logical partitions** as needed (limit depends on OS and configuration)

:::

---

## Q3: What is the default port for Apache/HTTP?

The default port for Apache (**HTTP**) is port `80`, which is the standard port assigned for unsecured web traffic as per the **Internet Assigned Numbers Authority** (**IANA**). When a web server like Apache is configured to serve websites over HTTP, it listens on port 80 unless otherwise specified.

For secure HTTP (**HTTPS**), the default port is `443`, but for regular HTTP, it’s always 80. ---

## Q4: What does GNU stand for?

**GNU** stands for “**GNU’s Not Unix**“, which is a recursive acronym, meaning the first letter `(G)` stands for the full acronym itself. This naming style is a playful tradition in the open-source community.

The **GNU Project** was launched by **Richard Stallman** in 1983 with the goal of creating a completely free and open-source Unix-like operating system.

While it shares design principles with Unix, GNU was developed from scratch and contains no Unix code, which allows it to be freely used, modified, and distributed under the terms of the GNU General Public License (GPL).

The combination of the GNU tools with the Linux kernel is what most people commonly refer to as “**Linux**“, though the more technically accurate name is “**GNU/Linux**”

---

## 5. `mysql` command shows socket error – what’s the first thing to check?

If running the `mysql` command results in a socket error like:

```plaintext title="output"
Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'
```

The first thing to check is whether the MySQL service is running.

```sh
sudo systemctl status mysql
```

If the service is not running, start it:

```sh
sudo systemctl start mysql
```

If the MySQL service is running but you still encounter the socket error, the next step is to check for a socket file location mismatch. Sometimes, the MySQL client tries to connect to a socket file in the wrong directory.

To resolve this, first verify the socket path configured in the MySQL server settings by checking the <VPIcon icon="fas fa-file-lines"/>`my.cnf` file, typically located at <VPIcon icon="fas fa-folder-open"/>`/etc/mysql/`<VPIcon icon="fas fa-file-lines"/>`my.cnf` or <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`my.cnf`.

```sh
mysql --socket=/path/to/mysql.sock  
```

Another common cause is permission issues on the socket directory. Make sure the user running the MySQL command has access to the directory where the socket file is located, usually <VPIcon icon="fas fa-folder-open"/>`/var/run/mysqld/`. Without the proper permissions, the client cannot access the socket file even if it exists.

Finally, for more detailed troubleshooting, you should check the MySQL error log.

```sh
sudo less /var/log/mysql/error.log  
```

---

## 6. How to Mount a Windows NTFS Partition on Linux?

To mount a Windows NTFS partition on a Linux system, you need to use the `ntfs-3g` driver, which provides full read and write support for NTFS file systems.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install ntfs-3g
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install ntfs-3g
```

:::

Once installed, identify the NTFS partition you want to mount using:

```sh
lsblk
# or
fdisk -l /dev/sdb1
```

Then, create a mount point and mount the partition with the command:

```sh
sudo mkdir /mnt/ntfs
sudo mount -t ntfs-3g /dev/sdb1 /mnt/ntfs
```

After mounting, you can access the contents of the NTFS partition through the specified directory. To make the mount persistent across reboots, you can add an entry in the <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-file-lines"/>`fstab` file using the appropriate device path, mount point, file system type (`ntfs-3g`), and desired mount options.

---

## 7. From the following, which is not an RPM-based OS?

- RedHat Linux
- CentOS
- Rocky Linux
- Debian
- Fedora

**Debian** is not an RPM-based operating system, which uses the **DEB** (**Debian** package) format and its package management tools include [**`dpkg`**](/tecmint.com/dpkg-command-examples.md), [**`apt`**](/tecmint.com/apt-command-in-linux.md), and [**`apt-get`**](https://tecmint.com/apt-get-command.md).

In contrast, **RedHat Linux**, **CentOS**, **Rocky Linux**, and **Fedora** are RPM-based distributions, meaning they use the **RPM** (**Red Hat Package Manager**) format and tools like [**`rpm`**](/tecmint.com/20-practical-examples-of-rpm-commands-in-linux.md) and [**`yum`**](/tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement.md) or [**`dnf`**](/tecmint.com/dnf-commands-for-fedora-rpm-package-management.md) for package management.

So, while all the others are part of the **Red Hat** family and share similar packaging systems, **Debian** belongs to a completely different lineage with its own ecosystem.

---

## 8. Which command can be used to rename a file in Linux?

In Linux, the [**`mv` (move) command**](/tecmint.com/mv-command-linux-examples.md) is used to rename a file. While its primary function is to move files and directories from one location to another, it also serves as the standard way to rename a file within the same directory.

When you provide a new filename as the destination, `mv` simply changes the file’s name without altering its content. For example, to rename a file named `oldname.txt` to `newname.txt`, you would use the command:

```sh
mv oldname.txt newname.txt
```

This works because the file is being “moved” from its old name to a new one in the same location, which is a quick and efficient method to rename both files and directories in Linux.

---

## 9. Which command is used to create and display a file in Linux?

In Linux, the [**`cat` command**](/tecmint.com/cat-command-linux.md) is commonly used to both create and display the contents of a file. The name “`cat`” stands for “**concatenate**“, but it’s widely used for simple tasks like viewing file contents or creating small text files directly from the terminal.

To create a file using `cat`, you can use the syntax `cat > filename`, then type the content you want to add, and press <kbd>Ctrl</kbd>+<kbd>D</kbd> to save and exit.

To display the contents of a file, simply use `cat filename`, while cat is not a full-fledged text editor like [**`vi`**](/tecmint.com/vi-editor-usage.md) or [**`nano`**](/tecmint.com/learn-nano-text-editor-in-linux.md), it is a quick and efficient way to make or view files, especially when working in scripts or basic command-line operations.

---

## 10. Which layer handles application-level communication in the OSI model?

In the **OSI** (**Open Systems Interconnection**) model, **Layer 7** is the **Application Layer**, which is responsible for managing communication between software applications and lower layers of the network.

This layer acts as the interface between the end-user and the network, providing services such as file transfers, email, web browsing, remote login, and network management. It supports application-level protocols like HTTP, FTP, SMTP, DNS, and many others.

While it does not represent the applications themselves, it enables these applications to communicate effectively over the network. **Layer 7** ensures that the data is properly formatted and delivered to the correct application, making it critical for user-facing services and interactions in network communication.

---

## Conclusion

That wraps up Part 3 of our **Linux Interview Questions** series. We’ll continue to build on this with more focused topics like scripting, services, system monitoring, and networking.

As always, stay connected with **Tecmint**, and don’t forget to leave your thoughts or questions in the comments section below. Happy learning and see you in the next part!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "10 Linux Interview Questions with Examples – Part 3",
  "desc": "In this Interview Series article, we present 10 practical Linux questions and answers to help beginners build confidence through hands-on examples.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/linux-interview-questions-and-answers-for-linux-beginners.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
