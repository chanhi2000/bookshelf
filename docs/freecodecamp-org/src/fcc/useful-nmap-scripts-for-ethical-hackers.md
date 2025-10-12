---
lang: en-US
title: "Useful Nmap Scripts for Ethical Hackers"
description: "Article(s) > Useful Nmap Scripts for Ethical Hackers"
icon: iconfont icon-nmap
category:
  - DevOps
  - Security
  - Linux
  - Shell
  - nmap
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - linux
  - shell
  - nmap
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Useful Nmap Scripts for Ethical Hackers"
    - property: og:description
      content: "Useful Nmap Scripts for Ethical Hackers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/useful-nmap-scripts-for-ethical-hackers.html
prev: /tool/nmap/articles/README.md
date: 2024-11-08
isOriginal: false
author: Manish Shivanandhan
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1731077044881/75a0f1c6-0aae-4ed6-bcfd-777b2ae2b1b6.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "nmap > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/nmap/articles/README.md",
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
  name="Useful Nmap Scripts for Ethical Hackers"
  desc="Nmap is short for Network Mapper. It’s an open-source Linux command-line tool for scanning IP addresses and ports in a network and detecting installed applications. Nmap allows network admins to identify devices running on their network, discover ope..."
  url="https://freecodecamp.org/news/useful-nmap-scripts-for-ethical-hackers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1731077044881/75a0f1c6-0aae-4ed6-bcfd-777b2ae2b1b6.jpeg"/>

Nmap is short for Network Mapper. It’s an open-source Linux command-line tool for scanning IP addresses and ports in a network and detecting installed applications.

Nmap allows network admins to identify devices running on their network, discover open ports and services, and detect vulnerabilities.

Here is the basic syntax to use nmap:

```sh
nmap <ip/url>
```

Let’s do a quick scan and see what we can find. We can use the URL [<VPIcon icon="fas fa-globe"/>scanme.nmap.org](http://scanme.nmap.org) to try out a scan. Nmap allows us to use this server to practice scans.

![Nmap sample scan](https://miro.medium.com/v2/resize:fit:1050/1*daqo4BGtxBZdWF2TLCxQHw.png)

As you can see, we have found some open ports and services. These act as entry points for further analysis or exploitation.

Nmap is usually the first tool that ethical hackers learn. [Here is a full tutorial if you want to learn more about Nmap.](https://stealthsecurity.sh/p/nmap-tutorial)

---

## Nmap Scripting Engine

A key feature is the Nmap Scripting Engine (NSE). It lets users run scripts to do detailed network scans and gather specific information.

Scripts help you perform a list of actions automatically instead of performing them step by step.

These scripts cover a range of functionalities, from service detection to vulnerability scanning. In this article, we’ll look at a few useful Nmap scripts.

I’ll walk you through each script, explain what it does, and show you how to use it. By the end, you’ll have a solid understanding of how to use these scripts as an ethical hacker.

::: note

This tutorial is to help you understand network security. Hacking or even scanning another server without permission is illegal.

:::

---

## HTTP-Enum

Imagine you’re tasked with checking a website’s security and want to see if there are any hidden pages or directories. You suspect there might be admin panels, login pages, or test files that aren’t linked on the main site.

Finding these hidden areas could reveal critical security weaknesses, such as unprotected admin pages or old files that might still hold sensitive information.

The `http-enum` script is used to scan a web server and find common directories and files that might be hidden from the main site navigation.

Think of it like opening doors in a building to see what’s behind each one. It searches for paths like login pages, admin panels, config files, and other directories that aren’t typically linked on the main website.

For example, a login page or an admin section may exist at specific paths but aren’t visible to regular users. This information is useful because knowing these locations can help you identify security weak points.

Here is the command to run the http-enum script:

```sh
nmap - script http-enum -p 80 <target-ip>
```

![http-enum sample response](https://cdn.hashnode.com/res/hashnode/image/upload/v1730379312717/5e6300c2-0030-4400-b998-e395c0b69a4f.png)

As you can see, the above sample result shows /login.php, /docs and other exposed URL paths. These can be entry points to find restricted information in a web server.

---

## SMB-OS-Discovery

Suppose you’re exploring a company’s network to understand what kind of systems they have in place, specifically in a Windows environment.

Knowing the exact operating system and version of each server helps you assess vulnerabilities. For example, an older version of Windows might have unpatched flaws that need attention.

The `smb-os-discovery` script targets servers that use the SMB protocol, mainly found in Windows environments, to gather information about the server’s operating system. It can reveal details like the Windows version, the server name, and its domain.

This script helps you understand what type of system you’re dealing with, which is key for checking security flaws specific to that OS.

Here is the syntax to run the smb-os-discovery script.

```sh
nmap - script smb-os-discovery -p 445 <target-ip>
```

![smb-os-discovery sample result](https://cdn.hashnode.com/res/hashnode/image/upload/v1730444262829/c8f76aee-d0a6-4203-b572-17df1272211c.png)

As you can see in the above sample result, the script connects to the SMB service on the target and retrieves OS information. This can help you quickly identify the Windows version and other details about the server.

---

## HTTP-Headers

Imagine you’re evaluating a website’s configuration and security settings. You want to know what kind of server it’s running, what methods are allowed, and if it’s enforcing HTTPS connections.

These details give you insights into whether the server’s configuration aligns with best practices, helping you spot any missing security settings.

The `http-headers` script checks the headers sent by a web server when a user connects to it it. Headers tell you the server type (like Apache or NGINX), security settings (like HTTPS requirements), allowed methods, and caching rules.

These details are like the server’s blueprint for communication, often revealing if the server has certain protections enabled.

Here is the syntax to run the http-headers script:

```sh
nmap - script http-headers -p 80 <target-ip>
```

![http-headers sample response](https://cdn.hashnode.com/res/hashnode/image/upload/v1730380306638/703870e4-de5b-4858-b1b2-20634a8598a9.png)

You can see that the sample response shows headers like like `X-Powered-By`, `Set-Cookie`, and so on. These headers can help to find security issues such as cross-site scripting (XSS) and clickjacking.

---

## SSH-Brute

Let’s say you’re testing a server’s defenses against unauthorized access through SSH. You know that weak passwords are a common risk, so you need a way to check if any accounts have easily guessable credentials.

This test will help you identify weak SSH logins that need stronger passwords to protect the server.

The `ssh-brute` script tries to log into an SSH server by guessing usernames and passwords. SSH, or Secure Shell, is often used for remote logins.

If the usernames and passwords are easy to guess, this script might find a way in. It’s a useful test to see if login credentials are strong enough to prevent unauthorized access.

Here is the syntax to run the ssh-brute script:

```sh
nmap - script ssh-brute -p 22 <target-ip>
```

![ssh-brute sample response](https://cdn.hashnode.com/res/hashnode/image/upload/v1730811335746/c6f6ad27-37d7-467d-8f5c-cd71a37aff0f.jpeg)

As you can see, this script tries different username-password combinations on the SSH server. If successful, it will display the correct credentials.

---

## DNS-Brute

Imagine you’re mapping out a company’s network and want to see if they have any subdomains that aren’t publicly listed. Each subdomain might serve a different purpose, such as hosting email servers or internal testing sites.

Discovering these subdomains helps you check if any of them are exposing sensitive services.

The `dns-brute` script helps you find subdomains associated with a given domain by trying out common names, like “www,” “mail,” or “ftp.” Subdomains can host separate services and applications, each with its own set of vulnerabilities.

Here is the syntax to run the dns-brute script:

```sh
nmap - script dns-brute <target-domain>
```

![dns-brute script](https://cdn.hashnode.com/res/hashnode/image/upload/v1730379500675/c8c646c3-1d76-440a-8092-6ce26f9aa127.png)

As you can see, the script attempts to resolve a list of common subdomains, and finds one internal hostname. Using this script can reveal subdomains that aren’t listed in public records, helping you to gain a fuller picture of an organization’s network layout.

---

## Conclusion

These Nmap scripts provide a powerful way to audit, troubleshoot, and secure networks. By understanding what each script does and how to use it, you’ll be able to uncover hidden issues and safeguard your infrastructure.

::: info

To learn how to build a career in Cybersecurity, check out** [The Hacker’s Handbook.](https://book.stealthsecurity.sh/) To practice hacking real systems and get help from other hackers, join [The Hacker’s Hub.](https://skool.com/hackershub)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Useful Nmap Scripts for Ethical Hackers",
  "desc": "Nmap is short for Network Mapper. It’s an open-source Linux command-line tool for scanning IP addresses and ports in a network and detecting installed applications. Nmap allows network admins to identify devices running on their network, discover ope...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/useful-nmap-scripts-for-ethical-hackers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
