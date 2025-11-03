---
lang: en-US
title: "How to Install and Use dig and nslookup Commands in Linux"
description: "Article(s) > How to Install and Use dig and nslookup Commands in Linux"
icon: iconfont icon-shell
category:
  - Shell
  - Article(s)
tag:
  - blog
  - tecmint.com
  - devops
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Install and Use dig and nslookup Commands in Linux"
    - property: og:description
      content: "How to Install and Use dig and nslookup Commands in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tecmint.com/install-dig-and-nslookup-in-linux.html
prev: /programming/sh/articles/README.md
date: 2025-07-28
isOriginal: false
author:
  - name: James Kiarie
    url : https://tecmint.com/author/james2030kiarie/
cover: https://tecmint.com/wp-content/uploads/2019/11/Install-dig-and-nslookup-in-Linux.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Install and Use dig and nslookup Commands in Linux"
  desc="In this article, you will learn how to install the dig and nslookup commands, which are used for network troubleshooting and gathering information about domains"
  url="https://tecmint.com/install-dig-and-nslookup-in-linux"
  logo="https://tecmint.com/wp-content/uploads/2020/07/favicon.ico"
  preview="https://tecmint.com/wp-content/uploads/2019/11/Install-dig-and-nslookup-in-Linux.png"/>

If you’re working with networks, managing domains, or troubleshooting connectivity issues, two essential tools you’ll come across are [**`dig`**](/tecmint.com/dig-command-examples.md) and [**`nslookup`**](/tecmint.com/8-linux-nslookup-commands-to-troubleshoot-dns-domain-name-server.md), both [**network utilities**](/tecmint.com/linux-networking-commands.md) help you query domain name records, inspect DNS responses, and even verify mail servers or IP addresses associated with a domain.

In this guide, you’ll learn how to install `dig` and `nslookup` on [**major Linux distributions**](/tecmint.com/top-most-popular-linux-distributions.md), how to use both tools effectively, and explore real-world examples for DNS lookups, reverse lookups, mail server checks, and more.

---

## What Are dig and nslookup?

`dig`, short for **Domain Information Gopher**, is a [**DNS lookup utility**](/tecmint.com/linux-host-command-examples-for-querying-dns-lookups.md) used to query DNS name servers. It’s loved by system administrators because it provides detailed output and supports advanced DNS queries like SOA, MX, and TXT records.

`nslookup` is another command-line utility for querying DNS to obtain domain name or IP address mapping, which has a simpler output than `dig`, which is useful for quick lookups.

---

## Installing dig and nslookup on Linux

Newer Linux systems typically include both `dig` and `nslookup` utilities by default, but older distributions may not. These tools are usually bundled in packages like `bind-utils` or `dnsutils`, which can be installed manually if they’re missing.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>,<VPIcon icon="iconfont icon-linuxmint"/>

```sh
sudo apt install dnsutils
```

@tab:active <VPIcon icon="fa-brands fa-fedora"/>,<VPIcon icon="fa-brands fa-centos"/>,<VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="iconfont icon-rockylinux"/>

```sh
sudo dnf install bind-utils
```

@tab <VPIcon icon="iconfont icon-gentoo"/>

```sh
sudo emerge -a sys-apps/dnsutils
```

@tab <VPIcon icon="iconfont icon-alpine"/>

```sh
sudo apk add bind-tools
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
sudo pacman -S dnsutils
```

@tab <VPIcon icon="fa-brands fa-opensuse"/>

```sh
sudo zypper install bind-utils
```

@tab <VPIcon icon="fa-brands fa-freebsd"/>

```sh
sudo pkg install dnsutils
```

:::

![Install Bind-Utils in CentOS](https://tecmint.com/wp-content/uploads/2019/11/Install-Bind-Utils-in-CentOS.png)

---

## How to Use dig Command (with Examples)

To perform a standard DNS query for a domain, use the `dig` command followed by the domain name:

```sh
dig fossmint.com
```

This command returns detailed DNS information, including the status of the query, the IP addresses associated with the domain, the DNS server that responded, query time, and more.

![Query Domain DNS](https://tecmint.com/wp-content/uploads/2019/11/DNS-query-for-a-domain.png)

If you just want the IP addresses without the extra details, append the `+short` option:

```sh
dig fossmint.com +short
```

This provides a cleaner output, displaying only the resolved IP addresses.

```sh
139.162.233.94
```

To get the IPv6 address (also called an `AAAA` record) of a domain, run the following:

```sh
dig AAAA fossmint.com +short
```

To check the mail servers (`MX` records) configured for a domain:

```sh
dig fossmint.com MX +short
```

To see which name servers (`NS` records) are authoritative for a domain:

```sh
dig fossmint.com NS +short
```

To fetch the Start of Authority (`SOA`) record, which gives details like the primary DNS server and zone settings:

```sh
dig fossmint.com SOA +short
```

To view `TXT` records, which are often used for SPF, DKIM, domain verification, and other text-based DNS data:

```sh
dig fossmint.com TXT +short
```

To perform a reverse DNS lookup (find the domain name linked to an IP address), use the `-x` flag:

```sh
dig -x 104.27.179.254 +short
```

Finally, to trace the entire DNS resolution path, starting from the root name servers all the way to the authoritative server:

```sh
dig fossmint.com +trace
```

---

## How to Use nslookup Command (with Examples)

To retrieve information about a domain name using the **nslookup** utility, use the following command.

```sh
nslookup fossmint.com
#
# Server:        127.0.0.53
# Address:       127.0.0.53#53
# 
# Non-authoritative answer:
# Name:      fossmint.com
# Address:   139.162.233.94
```

![Query Domain DNS Server](https://tecmint.com/wp-content/uploads/2019/11/queries-your-default-DNS-server.png)

To query a domain using a specific DNS server, such as Cloudflare (1.1.1.1), use:

```sh
nslookup fossmint.com 1.1.1.1
```

If you want to perform a reverse `DNS` lookup, simply enter an IP address instead of a domain name:

```sh
nslookup 104.27.179.254
```

To retrieve the mail server (`MX`) records for a domain, use the `-query=mx` option:

```sh
nslookup -query=mx fossmint.com
```

Lastly, to view `TXT` records, which are often used for SPF, DKIM, and domain verification, run:

```sh
nslookup -query=txt fossmint.com
```

---

## Conclusion

In this article, you learned how to install the **dig** and **nslookup** command utilities in different Linux distributions and also the basic usage of the commands.

We do hope that you can now comfortably install the utilities when confronted with a system without them.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Install and Use dig and nslookup Commands in Linux",
  "desc": "In this article, you will learn how to install the dig and nslookup commands, which are used for network troubleshooting and gathering information about domains",
  "link": "https://chanhi2000.github.io/bookshelf/tecmint.com/install-dig-and-nslookup-in-linux.html",
  "logo": "https://tecmint.com/wp-content/uploads/2020/07/favicon.ico",
  "background": "rgba(5,86,243,0.2)"
}
```
