---
lang: en-US
title: "10 Must-Know sFTP Commands for Linux File Transfers"
description: "Article(s) > 10 Must-Know sFTP Commands for Linux File Transfers"
icon: fa-brands fa-fedora
category:
  - Shell
  - SFTP
  - Article(s)
tag:
  - blog
  - tecmint.com
  - Shell
  - SFTP
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 10 Must-Know sFTP Commands for Linux File Transfers"
    - property: og:description
      content: "10 Must-Know sFTP Commands for Linux File Transfers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/sftp-command-examples.html
prev: /programming/sh/articles/README.md
date: 2025-07-29
isOriginal: false
author:
  - name: Ravi Saive
    url : https://tecmint.com/author/admin/
cover: https://tecmint.com/wp-content/uploads/2021/09/secure-file-transfer-sftp-linux.webp
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
  name="10 Must-Know sFTP Commands for Linux File Transfers"
  desc="In this article, you’ll learn 10 sFTP command examples to securely transfer files between your local machine and remote Linux servers using the terminal."
  url="https://tecmint.com/sftp-command-examples"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2021/09/secure-file-transfer-sftp-linux.webp"/>

**File Transfer Protocol** (**FTP**) was once a widely used method for transferring files or data remotely. However, it transmits information in an unencrypted format, making it an insecure way to communicate.

As we all know, **FTP** is not secure because all transmissions occur in clear text, which means that anyone sniffing network packets can easily read the data.

Because of this, **FTP** should only be used in limited cases or on networks you fully trust. Over time, protocols like [**SCP (Secure Copy)**](/tecmint.com/scp-commands-examples.md) and [**SSH (Secure Shell)**](/tecmint.com/install-openssh-server-in-linux.md) have addressed these security concerns by introducing encrypted layers for securely [**transferring data between remote systems**](/tecmint.com/rsync-local-remote-file-synchronization-commands.md).

::: info

You might also like: [**Best Command-Line FTP Clients for Linux**](/tecmint.com/command-line-ftp-clients-for-linux.md)

:::

---

## What Is sFTP?

**sFTP (Secure File Transfer Protocol)** is a part of the **SSH** protocol suite that runs over the SSH protocol on the standard port `22` by default to establish a secure connection. SFTP has been integrated into many GUI tools such as **FileZilla**, **WinSCP**, and **FireFTP**.

You can access **sFTP** from the Linux terminal using the `sftp` command, which often pre-installed on [**most Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md).

```sh
which sftp
```

If that returns a path like <VPIcon icon="fas fa-folder-open"/>`/usr/bin/sftp`, you’re good to go.

::: warning Security Warning

Please don’t expose the **SSH** (**Secure Shell**) port to the public internet, as this poses a security risk. Instead, allow access only from specific IP addresses that will be used to transfer or manage files on the remote system.

:::

::: info Related Articles

- [**How to Secure and Harden OpenSSH Server**](/tecmint.com/secure-openssh-server.md)
- [**How to Change SSH Port in Linux**](/tecmint.com/change-ssh-port-in-linux.md)
- [**How to Sync Files Using Rsync with Non-standard SSH Port**](/tecmint.com/sync-files-using-rsync-with-non-standard-ssh-port.md)
- [**5 Best Practices to Secure and Protect SSH Server**](/tecmint.com/5-best-practices-to-secure-and-protect-ssh-server.md)
- [**10 Wget Command Examples in Linux**](/tecmint.com/10-wget-command-examples-in-linux.md)

:::

This article walks you through real-world **sFTP** command examples, from logging in and navigating directories to uploading and downloading files. We’ll also cover batch transfers, scripting, and automation tips using sFTP.

---

## 1. How to Connect to SFTP

By default, the same SSH protocol is used to authenticate and establish an SFTP connection. To start an SFTP session, enter the username and the remote hostname or IP address at the command prompt.

Once authentication is successful, you will see a shell with the `sftp>` prompt.

```sh
sftp ravi@192.168.122.217
```

If SSH is running on a custom port (say `2222`), use:

```sh
sftp -oPort=2222 ravi@192.168.122.217
# 
# ravi@192.168.122.217's password:
# Connected  to 192.168.122.217.
# sftp>
```

Once, you are in the **sftp prompt**, check the available commands by typing ‘`?`‘ or ‘`help`‘ at the command prompt.

```sh
sftp> ?
```

![sFTP Help and Usage](https://tecmint.com/wp-content/uploads/2021/09/sFTP-Helpand-Usage.png)

---

## 2. Check Present Working Directory

When you’re connected to a remote server via **sFTP**, it’s important to know where you are – both locally (on your own machine) and remotely (on the server). sFTP provides two simple commands for this purpose: `lpwd` and `pwd`.

The command `lpwd` (**local print working directory**) is used to display your current local directory on your own machine from which you’re working. On the other hand, the command `pwd` (**print working directory**) shows your current directory on the remote server.

Here’s how they look in an active sFTP session:

```sh
sftp> lpwd           # Local working directory: /
sftp> pwd            # Remote working directory: /tecmint/
```

- `lpwd` helps you verify where files will be downloaded to.
- `pwd` helps you confirm where files will be uploaded from.

Understanding these commands is especially useful when you’re navigating multiple directories during file transfers.

---

## 3. Listing Files with sFTP

Once you’re connected to a remote server using **sFTP**, you’ll often need to browse through directories to check the available files on remote system and on your local machine.

To list files on the remote server, simply use the [**`ls` command**](/tecmint.com/ls-command-in-linux.md), which will show the contents of the current directory on the remote host.

```sh
sftp> ls
```

If you want to see detailed file information like size and permissions, you can also use the `-l` option:

```sh
sftp> ls -l
```

Now, if you want to list files on your local system (the machine you’re running sFTP from), you’ll use the `lls` command, which behaves like the regular `ls` command but shows the contents of your local directory.

```sh
sftp> lls
```

You can also pass options to `lls` to list files in long format:

```sh
sftp> lls -l
```

Using `ls` and `lls` together helps you manage files efficiently between local and remote systems within the sFTP interface.

---

## 4. Upload File Using sFTP

Once you’ve connected to the remote server using the sftp command, you can use the `put` command to upload a file. For example, let’s say you have a file called `local.profile` on your local machine, and you want to transfer it to the remote server.

```sh
put local.profile
```

When you run this command, sFTP will upload the file from your current local directory to the current directory on the remote server.

You should see output similar to:

```plaintext
Uploading local.profile to /home/username/local.profile
```

If you want to upload multiple files at once, you can use wildcard characters with the mput command. For instance, to upload all `.txt` files from the current local directory:

```sh
mput *.txt
```

::: tip

Before uploading, it’s always good to check and set your local and remote working directories using the `lcd` and `cd` commands, respectively.

For example:

```sh
lcd /home/user/documents
cd /var/www/html
put index.html
```

:::

---

## 5. Download Files Using sFTP

To download a single file from the remote system to your current local directory, use the `get` command followed by the filename.

```sh
sftp> get SettlementReport_1-10th.xls
```

If you want to download multiple files at once, you can use the `mget` command, which is especially useful when you’re dealing with a bunch of reports, logs, or data files:

```sh
sftp> mget *.xls
```

The mget command uses wildcard patterns like `*.xls` to grab all files with the `.xls` extension from the remote directory and copy them into your local working directory.

---

## 6. Renaming Files While Downloading Using sFTP

By default, the `get` command downloads the file using its original name. However, if you wish to save the file under a different name locally, you can specify a second argument with the desired name.

```sh
sftp> get SettlementReport_1-10th.xls Report_Jan.xls
```

In this case, the remote file <VPIcon icon="fas fa-file-csv"/>`SettlementReport_1-10th.xls` will be downloaded and saved locally as <VPIcon icon="fas fa-file-csv"/>`Report_Jan.xls`.

---

## 7. Switching Directories in sFTP

To change the remote directory (the directory on the server you’re connected to), use the [**`cd` command**](/tecmint.com/cd-command-in-linux.md) followed by the desired path.

```sh
sftp> cd test
```

You can verify your current location on the remote system by running:

```sh
sftp> pwd
```

Similarly, to switch to a different local directory (your current machine’s file system), use the `lcd` command:

```sh
sftp> lcd Documents
```

To confirm the local directory change, you can run:

```sh
sftp> lpwd
```

---

## 8. Creating Directories Using sFTP

To create a new directory on the remote server, you can use the [**`mkdir` command**](/tecmint.com/mkdir-command-examples.md) from within the sFTP prompt:

```sh
mkdir test
```

This command creates a directory named `test` in the current working directory on the remote server. You can then upload files into this directory using `put`, or change into it using `cd`.

On the other hand, if you want to create a directory on your local machine while inside the sFTP session, use the `lmkdir` command:

```sh
lmkdir Documents
```

This creates a directory called `Documents` in your current local working directory. You might use this before downloading multiple files into a dedicated folder using the `mget` command.

---

## 9. Remove Directories Using sFTP

To delete a file, use the [**`rm` command**](/tecmint.com/remove-directory-linux.md) inside the sFTP prompt. For example, if you want to remove a file named <VPIcon icon="fas fa-file-csv"/>`Report.xls` from the current remote directory, run:

```sh
rm Report.xls
```

To remove a directory, use the `rmdir` command.

```sh
rmdir sub1
```

::: note Important Note

sFTP can only delete empty directories. If the directory contains files or subdirectories, you’ll need to delete those contents first using `rm`, or remove them recursively using other tools like **SSH** or [**`rsync`**](/tecmint.com/rsync-local-remote-file-synchronization-commands.md).

:::

So before removing any directory, make sure it’s empty. Otherwise, the `rmdir` command will fail with an error like:

```plaintext
rmdir failed: Directory not empty
```

---

## Use sFTP with SSH Keys (No Password Prompt)

If you want to avoid typing your password every time you connect via sFTP, you can set up SSH key-based authentication using SSH key pair on your local machine.

```sh
ssh-keygen -t rsa -b 4096
```

You can simply press `Enter` to accept the default file location `(~/.ssh/id_rsa)` and optionally set a passphrase, which will generate two files: a private key `(id_rsa)` and a public key `(id_rsa.pub)`.

Next, copy your public key to the remote server using:

```sh
ssh-copy-id user@remote_host
```

Once that’s done, you can connect to the server using sFTP without entering a password:

```sh
sftp user@remote_host
```

---

## 10. Exit sFTP Shell

To exit the sFTP shell and end your session with the remote server, you simply need to type:

```sh
bye
# Or
exit
```

But there’s also another helpful trick you should know.

If you’re inside an sFTP session and need to temporarily drop into your local Linux shell without disconnecting from the remote sFTP session, you can use the `!` command, which lets you run [**local Linux commands**](/tecmint.com/essential-linux-commands.md) directly from within the sFTP environment.

```sh
sftp> !
```

Now you can run any regular Linux command.

```sh
ls -l
```

Once you’re done with the local shell and want to return to the sFTP prompt, just type:

```sh
exit
```

After running `exit`, you’ll return to the sFTP session as shown:

```sh
exit
# Shell exited with status 1
# sftp>
```

Finally, when you’re ready to fully leave the sFTP session, run:

```sh
sftp> bye
```

---

## Conclusion

The **SFTP** is a very useful tool for administrating servers and transferring files to and from (**Local** and **Remote**). We hope these examples will help you to understand the usage of **SFTP** to some extent.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "10 Must-Know sFTP Commands for Linux File Transfers",
  "desc": "In this article, you’ll learn 10 sFTP command examples to securely transfer files between your local machine and remote Linux servers using the terminal.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/sftp-command-examples.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
