---
lang: en-US
title: "How IPv4 Works – A Handbook for Developers"
description: "Article(s) > How IPv4 Works – A Handbook for Developers"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - computer
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How IPv4 Works – A Handbook for Developers"
    - property: og:description
      content: "How IPv4 Works – A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/
prev: /academics/coen/articles/README.md
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
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How IPv4 Works – A Handbook for Developers"
  desc="The Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. Google’s IPv6 Statistics show..."
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

The Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. [<FontIcon icon="fa-brands fa-google"/>Google’s IPv6 Statistics](https://google.com/intl/en/ipv6/statistics.html) show 44.29% of traffic to Google services on April 24, 2025 is over IPv6, implying 55.71% goes over IPv4. This handbook will take you through every aspect of IPv4, from understanding IP addresses to examining packet headers and fragmentation. You'll learn:

- How IP addresses work and their different formats
- Network addressing schemes from fixed-length to CIDR
- Special IPv4 addresses and their uses
- The structure and purpose of every field in the IPv4 header
- How IPv4 handles packet fragmentation across different networks

Whether you're a network engineer, software developer, or IT professional, understanding IPv4 is crucial for working with modern computer networks.

5. [Classful Addressing](#heading-classful-addressing)
6. [CIDR: Classless Interdomain Routing](#heading-cidr-classless-interdomain-routing)
7. [Subnet Masks](#heading-subnet-masks)
8. [Interim Summary – IPv4 Addresses](#heading-interim-summary-ipv4-addresses)
9. [Test Yourself](#heading-test-yourself)
10. [Special IPv4 Addresses](#heading-special-ipv4-addresses)
11. [IPv4 Header](#heading-ipv4-header)
12. [IPv4 Fragmentation](#heading-ipv4-fragmentation)

::: note Quick notes before we start

1. You can find more content about computer networks on my YouTube channel: [<FontIcon icon="fa-brands fa-youtube"/>Computer Networks Playlist](https://youtube.com/playlist?list=PL9lx0DXCC4BMS7dB7vsrKI5wzFyVIk2Kg)
2. I am working on a book about Computer Networks! Are you interested in reading the initial versions and providing feedback? Send me an email: [<FontIcon icon="fas fa-envelope"/>`gitting.things@gmail.com`](mailto:gitting.things@gmail.com)

:::

---

## Background

IP stands for "Internet Protocol", so IPv4 is Internet Protocol version 4. It was described in RFC 791 by IETF, published in September 1981, and first deployed for production in 1982 on SATNET (the Atlantic Packet Satellite Network), which was an early satellite network that formed an initial segment of the Internet.

IPv4 is connectionless and operates in a best-effort delivery model. This means it doesn't guarantee delivery, correct ordering of packets, or the validity of the data. It's designed to be fast and flexible.

---

## Understanding IP Addresses

IP addresses are hierarchical, logical addresses that power most internet connections today. Each consists of `4` bytes, or `32` bits. They're usually written in dotted decimal notation, for example:

[![An example IPv4 address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744039300370/348d757a-c6b0-4930-8e3a-ee753c45f3fa.png)](https://youtu.be/zlDkqP3lMmU)

Test yourself – Does the following address represent a valid IP address?

[![Is this a valid IPv4 address?<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744039900249/587d8b94-1ac3-478c-87d9-4b0fd97023b2.png)](https://youtu.be/zlDkqP3lMmU)

No. Since the dots separate different bytes, each value must be between `0` and `255`. Since the number `392` is bigger than `255`, it cannot be represented in a single byte.

[![This is not a valid IPv4 address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744040039746/71392606-7ac8-441d-ac36-2cf05bb8d67f.png)](https://youtu.be/zlDkqP3lMmU)

---

## Network ID and Host ID

IP addresses have two parts: a **network identifier** (or network ID) that belongs to all hosts in the network and a **host identifier** (or host ID) that identifies the specific host in this network.

The network identifier will be the same for all hosts in the network, and is also called a "prefix". For example, consider a network identifier of `201.22.3`. Given that this is the network prefix, the following addresses:

```plaintext
201.22.3.15
201.22.3.91
```

Are part of the same network, as they share the same prefix. The first address belongs to host number `15` in this network, and the second belongs to host number `91`.

This address has a different prefix, or a different network identifier, and thus belongs to a different network:

```plaintext
201.22.14.50
```

In the examples above, there's a network identifier consisting of 3 bytes, or 24 bits, and a host identifier consisting of 1 byte, or 8 bits.

[![Network Identifier vs Host Identifier<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744040184260/2511a5f3-3a98-40e4-aabe-7853e3febacf.png)](https://youtu.be/zlDkqP3lMmU)

---

## How to Determine Network vs. Host Portions

A question arises: how do you know which bits are part of the network ID, and which are part of the host ID? Several approaches have evolved over time to address this challenge.

### Fixed-Length Approach

Let's consider this solution: For every IP address, the first, most-significant byte would represent the network ID, and the remaining three, least-significant bytes would represent the host ID. This way it's really easy to read IP addresses. For example for this address:

```plaintext
20.12.1.92
```

You know that it describes network `20`, and the host `12.1.92` inside that network. Any IP address that doesn't start with `20`, such as `22.1.2.3`, would reside in a different network, and any IP address that starts with `20`, like `20.1.2.3`, would be within the same network.

![Fixed-Length approach for IP addressing<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744040959545/38c8766b-5ad2-4fb1-98b1-612c70fbe8ad.png)

### What are the disadvantages here? 🤔

With only one byte (8 bits) to represent the network ID, you only have 2^8, or `256`, different networks. Of course, there are far more networks than that in the real world. Even in the early days of the internet, universities and large companies each needed their own network identifiers.

In general, using a fixed length for the network ID and a fixed length for the host ID is not flexible enough. If you decide that the two most-significant bytes will represent the network ID and the two least-significant bytes will represent the host ID, you can represent up to 2^16, or `65,536` networks, which is also not enough. Furthermore, some networks, such as those of large companies, might require more than `65,536` host IDs.

---

```component VPCard
{
  "title": "Classful Addressing",
  "desc": "(1/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/classful-addressing.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "CIDR: Classless Interdomain Routing",
  "desc": "(2/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/cidr-classless-interdomain-routing.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Subnet Masks",
  "desc": "(3/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/subnet-masks.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Interim Summary – IPv4 Addresses",
  "desc": "(4/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/interim-summary-ipv4-addresses.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Test Yourself",
  "desc": "(5/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/test-yourself.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Special IPv4 Addresses",
  "desc": "(6/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/special-ipv4-addresses.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "IPv4 Header",
  "desc": "(7/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/ipv4-header.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "IPv4 Fragmentation",
  "desc": "(8/8) How IPv4 Works – A Handbook for Developers",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/ipv4-fragmentation.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## Summary – IPv4

In this comprehensive guide to IPv4, you've learned about the fundamental building blocks of Internet communications. Let's recap the key concepts we covered:

### Addressing and Network Structure

- IPv4 addresses are 32-bit numbers typically written in dotted decimal notation
- Networks can be identified using various methods:
  - Fixed-length approach (historically)
  - Classful addressing (A, B, C, D, E classes)
  - CIDR (modern approach allowing flexible network sizes)
- Special addresses serve specific purposes:
  - `0.0.0.0` for "this host"
  - `127.0.0.0/8` for loopback
  - `255.255.255.255` for broadcast

### IPv4 Header Structure

- The header contains crucial fields for packet routing and processing:
  - Version and IHL for header interpretation
  - Type of Service for traffic prioritization
  - Total Length for packet size
  - Various fields for fragmentation control
  - TTL to prevent infinite routing loops
  - Protocol to identify the encapsulated protocol
  - Checksum for error detection
  - Source and destination addresses

### Fragmentation

- Allows IPv4 packets to traverse networks with different MTUs
- Uses three key fields:
  - Identification to group fragments
  - Flags to control fragmentation
  - Fragment Offset to reassemble packets

---

## Final Words

While IPv4 has limitations, particularly its address space constraints, its elegant design and robust features have allowed it to remain the backbone of the Internet for over four decades. Understanding IPv4 provides essential context for working with modern networks and helps in transitioning to newer protocols like IPv6. ---

::: info About the Author

[Omer Rosenbaum](https://linkedin.com/in/omer-rosenbaum-034a08b9/) is [<FontIcon icon="fas fa-globe"/>Swimm](https://swimm.io/)’s Chief Technology Officer. He's the author of the Brief [YouTube Channel (<FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://youtube.com/@BriefVid). He's also a cyber training expert and founder of Checkpoint Security Academy. He's the author of [**Gitting Things Done**](/freecodecamp.org/gitting-things-done-book/README.md) (in English) and [<FontIcon icon="fas fa-globe"/>Computer Networks (in Hebrew)](https://data.cyber.org.il/networks/networks.pdf). You can find him on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`Omer_Ros`)](https://x.com/Omer_Ros).

**Additional References**

<SiteInfo
  name="Computer Networks"
  desc="Share your videos with friends, family, and the world"
  url="http://youtube.com/playlist?list=PL9lx0DXCC4BMS7dB7vsrKI5wzFyVIk2Kg/"
  logo="https://youtube.com/s/desktop/79b1043f/img/logos/favicon_144x144.png"
  preview="https://i.ytimg.com/vi/79jlgESHzKQ/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCk0A-hFTTiEtL1yBKdEMVQTpG7-g&days_since_epoch=20215"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How IPv4 Works – A Handbook for Developers",
  "desc": "The Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. Google’s IPv6 Statistics show...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
