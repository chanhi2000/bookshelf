---
lang: en-US
title: "Classful Addressing"
description: "Article(s) > (1/8) How IPv4 Works - A Handbook for Developers" 
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
      content: "Article(s) > (1/8) How IPv4 Works - A Handbook for Developers"
    - property: og:description
      content: "Classful Addressing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/classful-addressing.html
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
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-classful-addressing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

The solution lies in providing some flexibility. Consider another approach called "classful addressing". In this approach, the number of bits dedicated for the network ID changes from one address to another, and you can tell the network ID by looking at the first, most-significant byte of the address.

- Any address starting with a number between `1` and `127` belongs to "Class A", meaning that its network ID consists of 1 byte, leaving 3 bytes for the host ID.
- Any address starting with a number between `128` and `191` belongs to "Class B", which means that its network ID is 2 bytes long, and its host ID is also 2 bytes long.
- Any address starting with a number between `192` and `223` belongs to "Class C", so it has 3 bytes of a network ID, and 1 byte of host ID.

You can see the full representation of this approach in the table below:

| Class | First Byte Range | Network ID Size | Host ID Size |
| --- | --- | --- | --- |
| A | `1` - `127` | 1 byte | 3 bytes |
| B | `128` - `191` | 2 bytes | 2 bytes |
| C | `192` - `223` | 3 bytes | 1 byte |
| D | `224` - `239` | (multicast) |  |
| E | `240` - `255` | (reserved) | |

![Classful addressing approach<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744088968355/e7f128c0-3173-4bb5-8872-3f820de6b354.png)

For example, what class does this address belong to?

```plaintext
(1) 130.12.204.5
```

Since it starts with `130`, which is between `128` and `191`, it belongs to "Class B". This means that its network ID is `130.12`, and its host ID is `204.5`. Let's mark it as "address number 1".

Do this address and the following address (2) belong to the same network?

```plaintext
(2) 130.90.2.40
```

No, since they have different network identifiers, they are not within the same network.

What class does the following address belong to?

```plaintext
(3) 200.1.1.9
```

It belongs to class C, as the value of its first byte, `200`, is between `192` and `223`. This means that its network identifier is `200.1.1`, and any address starting with this prefix will reside within the same network. This specific address describes host `9` within this network.

To complete the picture, addresses starting with a value between `224` and `239` belong to "Class D" - that is, multicast addresses - addresses that belong to multiple devices. Addresses starting with a value between `240` and `255` were reserved for future use. Addresses starting with `0` are special addresses.

---

## IP Address Assignment

In the early internet, IPv4 addresses were assigned to organizations by the Internet Assigned Numbers Authority (IANA). As the internet grew, this responsibility was distributed to five Regional Internet Registries (RIRs) that handle address allocation for different geographic regions. Large organizations would receive blocks of addresses based on their needs, with address classes determining the size of these blocks.

---

## What are the disadvantages here? 🤔

While classful addressing allows for more flexibility compared to the fixed-length approach, even this approach isn't flexible enough.

Consider this scenario: A small startup company with just two founders needs a network identifier. Which class would they need?

Getting a class A or class B would be excessive, so they might get a class C - allowing `256` addresses. This is more than currently needed, but allows some expansion. What happens if the startup grows to more than `256` employees (and devices)?

At this point, they would need to get a class B address, giving no less than `65,536` addresses, when all they need is a bit over `256` addresses. This means wasting more than `60,000` addresses.

This became a real problem in the early 1990s as the internet was growing faster. The need for more IP addresses became apparent, and there was an impending exhaustion of the IPv4 address space. Cases where `60,000` addresses were wasted could no longer be tolerated.
