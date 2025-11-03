---
lang: en-US
title: "How to Check DNS Server IP Address in Linux"
description: "Article(s) > How to Check DNS Server IP Address in Linux"
icon: fa-brands fa-fedora
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
      content: "Article(s) > How to Check DNS Server IP Address in Linux"
    - property: og:description
      content: "How to Check DNS Server IP Address in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/find-my-dns-server-ip-address-in-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-09-05
isOriginal: false
author:
  - name: Martins D. Okoi
    url : https://tecmint.com/author/dillivine/
cover: https://tecmint.com/wp-content/uploads/2023/07/find-dns-server-ip-on-linux.webp
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
  name="How to Check DNS Server IP Address in Linux"
  desc="In this article, learn how to find your DNS server IP address on a Linux system using resolv.conf, systemd-resolve, and nmcli commands."
  url="https://tecmint.com/find-my-dns-server-ip-address-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2023/07/find-dns-server-ip-on-linux.webp"/>

**DNS** (**Domain Name System**) is a fundamental facilitator of several networking technologies such as mail servers, Internet browsing, and streaming services e.g., **Netflix** and **Spotify**, among others.

It works on a special computer called a [**DNS server**](/tecmint.com/setup-recursive-caching-dns-server-and-configure-dns-zones.md) – which keeps a database record of several public IP addresses along with their corresponding hostnames for it to resolve or translate hostnames to IP addresses upon user request.

::: info

You might also like: [**4 Ways to Find Server Public IP Address in Linux Terminal**](/tecmint.com/find-linux-server-public-ip-address.md)

:::

This happens so that we would not need to bother ourselves with remembering the IP addresses of the different websites we visit.

While there are several things we can discuss on DNS servers, such as redirection and malware attack prevention, our focus today is on how to find out your very own dns server IP address.

---

## How to Find Your DNS Server IP Address in Linux

There are several ways to check for it, depending on the Operating System that you’re running, but Linux, BSD, and Unix-like systems all share the same method, so let’s begin with them.

### 1. Using the /etc/resolv.conf File

The <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-gears"/>`resolv.conf` file is like a little address book for your computer, which tells your system which DNS servers to use whenever it needs to translate a website name (like `google.com`) into an IP address.

To view this file, you can use the [**`cat` command**](/tecmint.com/cat-command-linux.md), which prints the entire content to your terminal.

```sh
cat /etc/resolv.conf
```

Or, if you want to scroll through it more comfortably, use [**`less` command**](/tecmint.com/linux-more-command-and-less-command-examples.md).

```sh
less /etc/resolv.conf
```

Inside this file, you’ll usually see lines that look like this:

```plaintext title="/etc/resolv.conf"
nameserver 109.78.164.20
```

::: info Here’s what it means:

- `nameserver` – This keyword indicates that the line defines a DNS server.
- `109.78.164.20` – This is the IP address of the DNS server your computer will query when looking up website names.

:::

So, whenever your computer wants to open a website, it asks this DNS server: “**Hey, what’s the IP for example.com?**” The server then responds with the correct IP address so your system can connect.

Think of <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-gears"/>`resolv.conf` as the first stop your computer makes when trying to figure out where a website lives. By checking this file, you can see exactly which DNS server your system is using.

### 2. For Systems Using systemd

Many [**modern Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md), like **Ubuntu**, **Fedora**, and **Debian**, use `systemd` to [**manage system services**](/tecmint.com/manage-services-using-systemd-and-systemctl-in-linux.md), and one of the things systemd handles is network configuration, including **DNS**.

If your system uses `systemd`, the traditional <VPIcon icon="fas fa-folder-open"/>`/etc/`<VPIcon icon="fas fa-gears"/>`resolv.conf` file may not always show the full or correct DNS information because systemd manages DNS dynamically. In this case, you can use the `resolvectl` command with [**`grep`**](/tecmint.com/12-practical-examples-of-linux-grep-command.md) to check your DNS servers reliably.

```sh
resolvectl status | grep "DNS"
```

::: info What this does:

- `resolvectl status` shows detailed information about your network connections, including the DNS servers being used.
- `grep "DNS Servers"` filters the output so you only see the lines that list the DNS IP addresses.

:::

::: tip Example output**:

```plaintext
DNS Servers: 192.168.0.1 8.8.8.8
```

Here, the first address (`192.168.0.1`) is usually your local router or gateway, while the second (`8.8.8.8`) might be a public DNS server like **Google DNS**.

:::

### 3. If You’re Using NetworkManager

If your Linux system uses **NetworkManager**, which most modern desktop distributions do, you can easily find your DNS server IP using the [**`nmcli` command**](/tecmint.com/nmcli-connect-wi-fi-from-linux-terminal.md), which shows detailed information about all your network connections.

```sh
nmcli dev show | grep 'IP4.DNS'
```

::: tip Example output:

```plaintext
IP4.DNS[1]: 192.168.0.1
```

:::

::: info Here’s what it means:

- `IP4.DNS[1]` indicates that this is the first IPv4 DNS server your system is using. If you have a secondary DNS server, it may appear as IP4.DNS\[2\].
- `192.168.0.1` is the DNS server IP address, which is the address your computer contacts to resolve domain names into IP addresses.

The format `192.168.0.1` is called **dot-decimal notation**, which is the standard way IP addresses are written, with four numbers separated by dots. Each number ranges from 0 to 255, representing 8 bits of the address.

:::

---

## How to Find a Website’s DNS Server IP Address

To find out a website’s DNS Server IP address, you can use the following [**`dig` command**](/tecmint.com/10-linux-dig-domain-information-groper-commands-to-query-dns.md), which is used to query DNS information.

```plaintext
tecmint.com
```

### Sample Output

```plaintext title="output"
; <<>> DiG 9.8.2rc1-RedHat-9.8.2-0.68.rc1.el6_10.1 <<>> tecmint.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 30412
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;tecmint.com.			IN	A

;; ANSWER SECTION:
tecmint.com.		21	IN	A	204.45.67.203
tecmint.com.		21	IN	A	204.45.68.203

;; Query time: 0 msec
;; SERVER: 209.74.194.20#53(209.74.194.20)
;; WHEN: Mon Jun 24 07:25:42 2019
;; MSG SIZE  rcvd: 61
```

The output will provide you with a list of IP addresses for authoritative nameservers for your website (i.e., the DNS servers responsible for your domain).

```plaintext
tecmint.com.		21	IN	A	204.45.67.203
tecmint.com.		21	IN	A	204.45.68.203
```

Please note that the actual IP addresses you receive may vary depending on your website hosting provider or domain registrar. If your website is using third-party DNS services like Cloudflare or Google Cloud DNS, the IP addresses will be specific to those services.

Easy right? Perhaps we’ll talk about primary and secondary DNS Server addresses next time. Till then, feel free to share and drop your comments/suggestions in the discussion section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Check DNS Server IP Address in Linux",
  "desc": "In this article, learn how to find your DNS server IP address on a Linux system using resolv.conf, systemd-resolve, and nmcli commands.",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/find-my-dns-server-ip-address-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
