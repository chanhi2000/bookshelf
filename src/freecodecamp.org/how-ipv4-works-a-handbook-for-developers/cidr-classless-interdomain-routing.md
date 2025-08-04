---
lang: en-US
title: "CIDR: Classless Interdomain Routing"
description: "Article(s) > (2/8) How IPv4 Works – A Handbook for Developers" 
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
      content: "Article(s) > (2/8) How IPv4 Works – A Handbook for Developers"
    - property: og:description
      content: "CIDR: Classless Interdomain Routing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/cidr-classless-interdomain-routing.html
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
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-cidr-classless-interdomain-routing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

One of the measures to handle this shortage of addresses was to abandon classful addressing in 1993 and switch to another approach called CIDR – Classless Interdomain Routing. This approach is still used today.

CIDR allows for flexibility when choosing the network ID and the host ID. It lets network administrators create subnets of precisely the right size, rather than being limited to Classes A, B, or C.

Let's start with a simple example. In CIDR notation, we add a suffix indicating how many bits are used for the network portion:

```plaintext
(4) 200.8.3.1/16
```

This slash notation specifies how many bits describe the network ID. In example (4) above, the first `16` bits (or `2` bytes) are used for the network ID. So, in this case, `200.8` is the network identifier, and `3.1` is the host identifier. The fact that `200.8` is the network ID means that all addresses from `200.8.0.0` through `200.8.255.255` are in this network.

![16-bit subnet mask address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744090490906/0a18b364-7ca2-4ed0-8f27-2103bcbdd579.png)

Consider these additional addresses:

```plaintext
(5) 200.2.13.5
(6) 200.8.21.6
```

Given this address prefix of `16` bits, or `2` bytes, which of these addresses belong to the same network as example (4) (`200.8.3.1/16`)?

The first address (5) (`200.2.13.5`) does not belong to this network, as its first `16` bits – `200.2`, are different from the first `16` bits of the example address.

The second address (6) (`200.8.21.6`) does belong to the same network as that of the example address.

![16-bit subnet mask address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744090582529/d314c9ca-73a3-4e48-92b8-b0a6c24ac7d3.png)

---

## Real-world Example

In practice, an ISP might receive a large block like `104.16.0.0/12` from the RIR. This gives them control of all addresses from `104.16.0.0` to `104.31.255.255`. The ISP can then allocate smaller subnets to customers, such as giving a small business a `/24` subnet with `256` addresses, or a larger company a `/20` subnet with `4,096` addresses.
