---
lang: en-US
title: "Interim Summary – IPv4 Addresses"
description: "Article(s) > (4/8) How IPv4 Works – A Handbook for Developers" 
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/8) How IPv4 Works – A Handbook for Developers"
    - property: og:description
      content: "Interim Summary – IPv4 Addresses"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/interim-summary-ipv4-addresses.html
date: 2025-05-01
isOriginal: false
author:
  - name: Omer Rosenbaum
    url : https://freecodecamp.org/news/author/omerros/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How IPv4 Works – A Handbook for Developers",
  "desc": "OraThe Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. Google’s IPv6 Statistics show...",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How IPv4 Works – A Handbook for Developers"
  desc="OraThe Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. Google’s IPv6 Statistics show..."
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-interim-summary-ipv4-addresses"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

In this section, you've learned about IPv4 addresses. IP addresses are hierarchical, logical addresses that consist of `4` bytes. IP addresses have two parts: a network identifier that belongs to all hosts in the network, and a host identifier which identifies the specific host in the network.

You've explored various options for determining the network identifier and the host identifier:

1. Fixed-length approach – too rigid and limited
2. Classful addressing approach – better but still wasteful
3. CIDR (Classless Interdomain Routing) – flexible and efficient

CIDR provides much more flexibility and helps overcome the significant problem of IPv4 address shortage. However, CIDR is only one part of addressing the shortage of IPv4 addresses, with other solutions including NAT (Network Address Translation) and eventually, IPv6. The next section will explore special IPv4 addresses and then examine the header of IPv4 packets.