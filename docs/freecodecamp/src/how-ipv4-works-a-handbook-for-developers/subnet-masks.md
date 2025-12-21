---
lang: en-US
title: "Subnet Masks"
description: "Article(s) > (3/8) How IPv4 Works - A Handbook for Developers" 
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
      content: "Article(s) > (3/8) How IPv4 Works - A Handbook for Developers"
    - property: og:description
      content: "Subnet Masks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-ipv4-works-a-handbook-for-developers/subnet-masks.html
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
  "title": "How IPv4 Works - A Handbook for Developers",
  "desc": "OraThe Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. Google’s IPv6 Statistics show...",
  "link": "/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How IPv4 Works - A Handbook for Developers"
  desc="OraThe Internet Protocol version 4 (IPv4) is one of the core protocols of standards-based internetworking methods in the Internet and other packet-switched networks. IPv4 is still the most widely deployed Internet protocol. Google’s IPv6 Statistics show..."
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-subnet-masks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

Another way to express the network prefix is by using a [<VPIcon icon="fas fa-globe"/>subnet mask](https://ipxo.com/blog/what-is-subnet-mask/), like so:

```plaintext
255.255.0.0
```

When converted to binary, `255` in decimal equals eight `1`s in binary - so all bits are on. So if you translate this mask into binary, you get:

```plaintext
11111111 11111111 00000000 00000000
```

In other words, `16` bits are on, which means a network prefix of `16` bits. Both conventions (CIDR notation and subnet masks) are used very frequently.

![16-bit subnet mask address<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744090679551/5466e739-1e1b-4e34-a044-0d680ca9ad6e.png)

With CIDR, an address can reside in different networks given different network prefixes, or subnet masks. If you consider the same example address with a different prefix, say that of `8` bits - both additional addresses would belong to the same network, as they all share the first `8` bits - `200`.

How would you present a network prefix of `8` bits as a subnet mask? You need the first `8` bits to be on, so that means `255` in decimal, and the remaining bits are off, resulting in this subnet mask:

```plaintext
255.0.0.0
```

![8-bit subnet mask address<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744141258583/c4f606ff-410b-4b1f-92c5-505b5309cfa8.png)

What happens if you use a network prefix of `24` bits? First, how would you express that as a subnet mask? You need `24` bits to be on, so that is 3 times 8 bits to be on, resulting in:

```plaintext
255.255.255.0
```

![24-bit subnet mask address<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744297152994/0dae747f-2a10-4ad6-9e29-b21df15e6169.png)

Now, neither of the additional addresses reside within the same network as the example address, as they don't share its network ID of `200.8.3`.

![CIDR<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744297174124/16ad2016-c358-474b-964c-4bde75359670.png)

Note that network prefixes do not have to represent full bytes. For example, you can use a network prefix of `12` bits, or `11` bits, or `22` bits. When the prefix length isn't a multiple of `8`, the subnet mask will have a value other than `0` or `255` in one of its positions.

This addresses the issue regarding the startup company. If a startup has `300` employees, they'd need to get a `23`-bits network ID, leaving `9` bits for hosts within their networks. This means 2^9, or `512` addresses, which should be sufficient.
