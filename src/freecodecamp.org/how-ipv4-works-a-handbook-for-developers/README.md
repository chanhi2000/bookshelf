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

### What we’ll cover:

3. [Network ID and Host ID](#heading-network-id-and-host-id)
4. [How to Determine Network vs. Host Portions](#heading-how-to-determine-network-vs-host-portions)
5. [Classful Addressing](#heading-classful-addressing)
6. [CIDR: Classless Interdomain Routing](#heading-cidr-classless-interdomain-routing)
7. [Subnet Masks](#heading-subnet-masks)
8. [Interim Summary – IPv4 Addresses](#heading-interim-summary-ipv4-addresses)
9. [Test Yourself](#heading-test-yourself)
10. [Special IPv4 Addresses](#heading-special-ipv4-addresses)
11. [IPv4 Header](#heading-ipv4-header)
12. [IPv4 Fragmentation](#heading-ipv4-fragmentation)
13. [Summary – IPv4](#heading-summary-ipv4)
    - [Addressing and Network Structure](#heading-addressing-and-network-structure)
    - [IPv4 Header Structure](#heading-ipv4-header-structure)
    - [Fragmentation](#heading-fragmentation)
    - [Final Words](#heading-final-words)

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

## Classful Addressing

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

![Classful addressing approach<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744088968355/e7f128c0-3173-4bb5-8872-3f820de6b354.png)

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

To complete the picture, addresses starting with a value between `224` and `239` belong to "Class D" – that is, multicast addresses – addresses that belong to multiple devices. Addresses starting with a value between `240` and `255` were reserved for future use. Addresses starting with `0` are special addresses.

### IP Address Assignment

In the early internet, IPv4 addresses were assigned to organizations by the Internet Assigned Numbers Authority (IANA). As the internet grew, this responsibility was distributed to five Regional Internet Registries (RIRs) that handle address allocation for different geographic regions. Large organizations would receive blocks of addresses based on their needs, with address classes determining the size of these blocks.

### What are the disadvantages here? 🤔

While classful addressing allows for more flexibility compared to the fixed-length approach, even this approach isn't flexible enough.

Consider this scenario: A small startup company with just two founders needs a network identifier. Which class would they need?

Getting a class A or class B would be excessive, so they might get a class C – allowing `256` addresses. This is more than currently needed, but allows some expansion. What happens if the startup grows to more than `256` employees (and devices)?

At this point, they would need to get a class B address, giving no less than `65,536` addresses, when all they need is a bit over `256` addresses. This means wasting more than `60,000` addresses.

This became a real problem in the early 1990s as the internet was growing faster. The need for more IP addresses became apparent, and there was an impending exhaustion of the IPv4 address space. Cases where `60,000` addresses were wasted could no longer be tolerated.

---

## CIDR: Classless Interdomain Routing

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

### Real-world Example

In practice, an ISP might receive a large block like `104.16.0.0/12` from the RIR. This gives them control of all addresses from `104.16.0.0` to `104.31.255.255`. The ISP can then allocate smaller subnets to customers, such as giving a small business a `/24` subnet with `256` addresses, or a larger company a `/20` subnet with `4,096` addresses.

---

## Subnet Masks

Another way to express the network prefix is by using a [<FontIcon icon="fas fa-globe"/>subnet mask](https://ipxo.com/blog/what-is-subnet-mask/), like so:

```plaintext
255.255.0.0
```

When converted to binary, `255` in decimal equals eight `1`s in binary – so all bits are on. So if you translate this mask into binary, you get:

```plaintext
11111111 11111111 00000000 00000000
```

In other words, `16` bits are on, which means a network prefix of `16` bits. Both conventions (CIDR notation and subnet masks) are used very frequently.

![16-bit subnet mask address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744090679551/5466e739-1e1b-4e34-a044-0d680ca9ad6e.png)

With CIDR, an address can reside in different networks given different network prefixes, or subnet masks. If you consider the same example address with a different prefix, say that of `8` bits – both additional addresses would belong to the same network, as they all share the first `8` bits – `200`.

How would you present a network prefix of `8` bits as a subnet mask? You need the first `8` bits to be on, so that means `255` in decimal, and the remaining bits are off, resulting in this subnet mask:

```plaintext
255.0.0.0
```

![8-bit subnet mask address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744141258583/c4f606ff-410b-4b1f-92c5-505b5309cfa8.png)

What happens if you use a network prefix of `24` bits? First, how would you express that as a subnet mask? You need `24` bits to be on, so that is 3 times 8 bits to be on, resulting in:

```plaintext
255.255.255.0
```

![24-bit subnet mask address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744297152994/0dae747f-2a10-4ad6-9e29-b21df15e6169.png)

Now, neither of the additional addresses reside within the same network as the example address, as they don't share its network ID of `200.8.3`.

![CIDR<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744297174124/16ad2016-c358-474b-964c-4bde75359670.png)

Note that network prefixes do not have to represent full bytes. For example, you can use a network prefix of `12` bits, or `11` bits, or `22` bits. When the prefix length isn't a multiple of `8`, the subnet mask will have a value other than `0` or `255` in one of its positions.

This addresses the issue regarding the startup company. If a startup has `300` employees, they'd need to get a `23`-bits network ID, leaving `9` bits for hosts within their networks. This means 2^9, or `512` addresses, which should be sufficient.

---

## Interim Summary – IPv4 Addresses

In this section, you've learned about IPv4 addresses. IP addresses are hierarchical, logical addresses that consist of `4` bytes. IP addresses have two parts: a network identifier that belongs to all hosts in the network, and a host identifier which identifies the specific host in the network.

You've explored various options for determining the network identifier and the host identifier:

1. Fixed-length approach – too rigid and limited
2. Classful addressing approach – better but still wasteful
3. CIDR (Classless Interdomain Routing) – flexible and efficient

CIDR provides much more flexibility and helps overcome the significant problem of IPv4 address shortage. However, CIDR is only one part of addressing the shortage of IPv4 addresses, with other solutions including NAT (Network Address Translation) and eventually, IPv6. The next section will explore special IPv4 addresses and then examine the header of IPv4 packets.

---

## Test Yourself

Now practice the concepts you've learned and make sure you feel comfortable with them.

Take a moment to try answering the following questions before checking the answers.

### Converting Between Prefix Notation and Subnet Masks

How would you represent a network prefix of `16` bits, written like this `/16`, as a subnet mask?

You need `16` bits that are on. When `8` bits are on you get `255` in decimal, so you'd use:

```plaintext
255.255.0.0
```

![16-bit subnet mask address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465135834/ff449f60-e660-4fea-b427-994a87be2c89.png)

Given this network prefix, do these addresses belong to the same network?

![Do these addresses fit in the network defined before?<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465178617/ef7ddeca-86b2-4bb2-8e1d-471ef4f64a45.png)

Yes, they do, as they share the same most-significant `16` bits, or two bytes

![These addresses fit in the same network<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465209149/25744a22-16b3-484d-9821-12920dd59be4.png)

Does this address belong to the same network as that of the previous addresses?

![Additional address<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465232371/92bcb42c-5067-43e6-8cec-1eae9347d16a.png)

Yes, it does. Again, it shares the same two most-significant bytes.

![This address also fits in the network defined before<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465259087/a4b9c525-3b4d-4501-bcf8-db62ebf47247.png)

What about this one? Does it belong to the same network as the previous addresses?

![Additional address. Does this address fit in the network defined before?<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465285214/f57fd6c2-7665-4565-943e-959b981fedc8.png)

No, as the first two bytes are not `42.31` – this is a different network. So this address describes host `1.2`, within the network `42.32`.

![No, this address does not belong to the same network as the other ones<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465302503/0fdd959f-2d10-4a56-826d-e71604ca5267.png)

### Working Backwards with Subnet Masks

Let's try the other way around. You have this subnet mask:

```plaintext
255.255.255.0
```

How would you express it using a network prefix?

You have three occurrences of `255`, which means three times `8` bits that are on, so overall you have `24` bits that are on. So you can also write `/24`. This means `3` bytes.

![24-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465331643/b1f3ab4c-8e7e-449d-8879-fee3bf90ce1c.png)

Given this subnet mask, do addresses (1) and (3) above belong to the same network?

![Do these addresses have the same network ID given a 24-bit subnet mask?<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465436680/ca71584d-53dc-4116-a109-d32c11e997ef.png)

They do, as they both have the same most-significant three bytes – network `42.31.93`.

![24-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465461745/c01f5958-f675-45c5-bc41-de857483e25d.png)

What about addresses (1) and (2)?

![Do these addresses have the same network ID given a 24-bit subnet mask?<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465532664/a0ef8f73-27d5-4488-98a9-1dbeaf457797.png)

Given this network prefix, they don't belong to the same network. The first address belongs to network `42.31.93`, and the second address belongs to network `42.31.1`.

![24-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465498737/6d4cb056-126a-422f-94bc-4392a996869c.png)

### Non-Byte-Aligned Prefixes

Network prefixes do not have to align to `8` bits, or full bytes. Let's say you have a network prefix of `14` bits. How would you convert that to a subnet mask?

Well, the first byte is clear: you have `8` bits on, so the first byte is `255`. What about the next one?

In binary, you'd want to have six additional 1s, and then 2 0s – so in binary you'd write:

```plaintext
11111100
```

Converting to decimal, this binary number represents `252`. So your subnet mask is:

```plaintext
255.252.0.0
```

Another way to make this conversion: You know that eight 1s in binary represent `255` in decimal. You also know that `11` in binary is `3`, so you can simply subtract `3` from `255` and get `252`.

![14-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465576989/bb1a90c1-1563-4970-b0f5-e0f502e82563.png)

Next, try the other way around. You have the following subnet mask:

```plaintext
255.255.224.0
```

How many bits represent the network prefix?

The first two bytes are clear: you have `16` bits. Converting the third byte to binary: `224` in decimal is `11100000` in binary. This means you have an additional three 1s, so you can write the subnet mask above as a prefix of `/19` bits – `16` bits for the two `255` bytes, and `3` additional bits for the `224` byte.

![19-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465642118/2587e3bc-0c88-48a9-b876-b96fd3a493d1.png)

### Determining Network Membership

Let's consider the following addresses:

![Two IP addresses<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465744667/86337750-0f67-4ed7-b8c2-7d6fcf330a71.png)

Are they part of the same network? 🤔

It depends on the subnet mask.

If the network prefix is `/8`, then they are part of the same network, as they share the same network ID.

![8-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465761356/67c590e1-daf5-4276-96ff-a39ee914d2d3.png)

On the other hand, if the network prefix is `/16`, then they have different network IDs, and thus don't belong to the same network. But what happens with prefixes in between? Will they reside in the same network for a prefix of `/9`? `/14`?

The way to approach this question is to convert the second byte of these addresses to binary. For the first address, this byte is `24`, which in binary is:

```plaintext
00011000
```

For the second address, the second byte is `23`, which in binary is:

```plaintext
00010111
```

![12-bit subnet mask<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465797029/fcbc4bd8-e273-4032-afb3-f10e2028738b.png)

You can see that the most significant `4` bits within the second byte are identical. If you add the first `8` bits of the address, you see that the most significant `12` bits of these addresses are the same.

So, if you have a network prefix of `/11`, do these addresses belong to the same network?

Yes, they do – their most significant `11` bits are identical.

What about `/13`?

No, with this network prefix, they don't share the same network identifier, as their `13`th bit is different.

This practice should help you feel comfortable with subnet masks and network prefixes. In the next section, you'll learn about special IP addresses and then examine the header of IP packets.

---

## Special IPv4 Addresses

Now that you're comfortable with IP addresses and subnet masks, let's explore some IP addresses that have special meanings.

### The "This Host" Address: 0.0.0.0

The address `0.0.0.0` means "this host" and is used in two scenarios:

First, when a machine boots up and doesn't yet have an IP address. IP addresses are logical addresses that need to be assigned to a machine. Prior to this assignment, a device has no IP address at all. If the device needs to communicate at this stage, it may use this special address, `0.0.0.0`.

Second, when writing network applications that need to listen for incoming connections on all network interfaces. For example, if a machine has two interfaces – one with the IP address `1.1.1.1`, and another with the address `2.2.2.2` – listening on the address `0.0.0.0` means accepting connections regardless of which network interface receives them.

### "This Network" Addresses

Another class of special addresses are those starting with zeros, where the zeros mean "this network."

For example, if you have a machine with the address:

```plaintext
12.34.55.55
```

And a network prefix of `16` bits, this machine can send a packet to another device on the network using its full address, for example `12.34.66.66`, or alternatively use the special zeros notation and send the packet to:

```plaintext
0.0.66.66
```

This means "send a packet to the host `66.66` on this network." Of course, the recipient must also know the relevant network prefix to correctly interpret this address.

### Broadcast Addresses

The address `255.255.255.255`, where all bits are set to `1`, is the address of all hosts in the local network – the broadcast address. This is similar to the [broadcast address in Ethernet](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-unicast-and-multicast-bits) (`FF:FF:FF:FF:FF:FF`). In both cases, all bits are set to `1`.

Using a proper network identifier where the host identifier is all set to 1s can be used to send a broadcast packet to remote networks. For example, consider a network `12.34.0.0/16` and another network with the network ID of `12.35.0.0/16`. If a machine at `12.34.55.55` wants to send a packet to all devices in the other network, it could use the destination address: `12.35.255.255`.

Even though this is allowed according to the IP specification (RFC), in practice this feature is often disabled as it can create security vulnerabilities.

### Loopback Addresses: 127.0.0.0/8

All addresses in the network `127.0.0.0/8` (that is, all addresses that start with `127`) are loopback addresses. Packets sent to any of these addresses are not put onto the physical network but are processed locally within the operating system. This is extremely useful for development and debugging.

For example, when developing a simple chat program, you need two clients that exchange data. One approach would be to use two different physical computers, but this is tedious – you'd need to write a message on one computer, check the other computer to see if it was received, then write a message on the second computer, and go back to the first to validate receipt.

A much simpler approach is to use a loopback address. Both clients can run on the same machine and connect with one another. You can run two different client programs on the same physical computer and exchange messages between them without needing an additional machine.

For instance, you might use the address `127.0.0.1`, with one client listening on port `1337` and the other on port `1338`. When client A sends a packet to client B, this packet never leaves your network card but remains within the operating system. Client B receives the packet from the loopback interface as if it had been received from the physical network.

After debugging is complete, your client code doesn't need to change – the only difference is that they will communicate using real IP addresses instead of the loopback address.

![Loopback operation<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744736895494/fd1e4a8d-a834-4bf4-b4b9-1e83cf851161.png)

### Summary of Special IPv4 Addresses

To summarize the special IPv4 addresses you've learned about:

| Special Address | Meaning | Usage |
| --- | --- | --- |
| `0.0.0.0` | "This host" | Used during boot or to listen on all interfaces |
| Addresses starting with `0` | "This network" | Sending to hosts on the local network |
| `255.255.255.255` | Broadcast | Sending to all hosts on the local network |
| Network ID with all 1s in host part | Directed broadcast | Sending to all hosts on a specific network |
| `127.0.0.0/8` | Loopback | Testing and debugging without using the physical network |

In the next section, you'll learn about the structure of the IPv4 header.

---

## IPv4 Header

Now that you understand IP addresses, subnets, and special addresses, it's time to examine the IPv4 header structure in detail.

### The Header Structure

![IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745583720695/21521520-3029-4a0a-b4e7-fa484ca350ab.png)

The diagram above shows the header of IPv4 as defined in RFC 791. Let's examine each field:

#### Version (4 bits)

![Version field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745589954987/cb357d49-73ab-43e6-93b5-c2b7c7e3eb4a.png)

The header starts with the Version field, which consists of four bits. For an IPv4 packet, the version is `4`, so this field will always carry the value of `4` (or `0100` in binary).

❓ Why does the header start with the Version field? 🤔

(Note – when I start a sentence with the ❓mark – it’s a question addressed at you, and I encourage you to try and answer it before reading on).

The reason is that the remaining fields may differ according to the version. If a network device reads an IP packet and the version field carries the value of `4`, it will expect the remainder of the packet to follow the IPv4 structure. If it carries another value, such as `6`, the remaining fields are different, as in IPv6. #### Internet Header Length (IHL) (4 bits)

![IHL field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745590070221/ca452338-299c-422c-aef4-8fe8569dd218.png)

This field indicates the length of the header itself.

❓ Why do we need to specify the length? 🤔

Unlike [Ethernet](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/), where the header size is fixed, the IPv4 header length can vary because of optional fields. For an IP packet without special options, the header consists of `20` bytes, which is the most common case.

The IHL field doesn't specify the length in bytes directly but in units of 4-byte words. So to specify a length of `20` bytes, the value would be `5` (5 × 4 = 20). This encoding allows the field to use only 4 bits while specifying header lengths up to `60` bytes (when IHL = `15`).

A common IPv4 packet therefore begins with the byte `0x45` in hexadecimal, meaning it's version `4` of the IP protocol, and the header is `20` bytes long.

#### Type of Service (TOS) (8 bits)

![TOS field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745590323255/e8a30561-bfbf-4bcd-a07c-3dbce88fc6c4.png)

The idea behind this field is that not all packets are equally important. You may want to give priority to some packets over others.

For example, packets carrying real-time data (like voice or video conferencing) are more time-sensitive than packets carrying, say, email or file downloads. If a router is currently experiencing high load, it should ideally prioritize time-sensitive packets.

The Type of Service field allows senders to indicate the priority of their packets. However, on the public internet, this field is often ignored by routers because any sender can set any priority value. In most cases, this field carries the value of `0`.

#### Total Length (16 bits)

![Total Length field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745590421285/07a4b428-3a97-4ea8-9006-5fd8bb215d95.png)

This field specifies the total length of the IP packet, including both the header and the payload (data).

❓ Why is this needed to specify the length? 🤔

Unfortunately, the IP layer doesn’t necessarily know if some of the bytes in the packet are actually a padding of the second layer. I described this in detail in [a previous post](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-the-problem-with-the-type-length-field), where I showed that in Ethernet protocol, in some cases, [the receiving Ethernet entity cannot tell which bytes belong to the payload and which bytes are simply padding](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-the-problem-with-the-type-length-field). The IP layer needs to know precisely which bytes belong to the actual packet, hence the Total Length field.

❓What is the maximum size of an IPv4 packet? 🤔

Since this field is `16` bits long, an IPv4 packet may contain a maximum of 2^16-1 bytes, or `65,535` bytes, including the header. The minimum size is `20` bytes, consisting of just the header without options or payload.

#### Fragmentation Fields (32 bits)

![Fragmentation fields within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591136348/bb1035af-c967-4bb8-992c-c10e31b64cd1.png)

The next four bytes are dedicated to fragmentation control. I’ll cover these fields in a separate section, as they involve a complex topic deserving special attention.

#### Time to Live (8 bits)

![TTL field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591194176/3f3f98f6-b079-43d3-9ee3-b052b7f4f6d7.png)

Despite its name, this field doesn't actually measure time but rather the maximum number of routing hops a packet can traverse before being discarded.

To understand its purpose, consider this scenario: If Machine A sends a packet to Machine B through a series of routers, but there's a routing loop where Router 2 sends to Router 3, which sends to Router 4, which sends back to Router 2, the packet could circulate indefinitely, consuming bandwidth and never reaching its destination.

![A routing issue causing an infinite loop<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745775904428/72ba07f9-461d-483f-be16-773218d8f863.png)

The TTL field prevents this by setting a limit on how many hops a packet can take:

1. The sender sets an initial TTL value (often `64` or `128`)
2. Each router that handles the packet decrements the TTL by `1`
3. If a router receives a packet with TTL = `1`, it decrements it to `0` and discards the packet
4. The router then sends an ICMP "Time Exceeded" message back to the original sender
    

This doesn't solve the underlying problem of routing loops, but it prevents packets from circulating forever.

In IPv6, this field is renamed "Hop Limit," which more accurately describes its function.

#### Protocol (8 bits)

![Protocol field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591243041/ab9be6ea-5f11-4bb1-b93f-f0d9deef0c6f.png)

This field describes the payload of the IPv4 packet. For example:

- A value of `6` means the payload is TCP
- A value of `17` means the payload is UDP
    

This helps the receiving system know which protocol handler should process the packet's contents. It's similar to [the Type field in Ethernet](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-type-length-field-ethernet-ii-type-2-bytes), which specifies the protocol of the layer encapsulated within the Ethernet frame.

#### Header Checksum (16 bits)

![Header checksum field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591295127/9953fb34-2b2f-4c9f-bf39-7a18ceaf2b1a.png)

This is a 16-bit checksum used to verify the validity of the header only (that is, excluding the payload). The sender computes this value based on the fields of the header, and the receiver also computes it to validate that the header was received correctly.

❓The checksum must be recalculated by each router. Why is that? 🤔

Because the TTL field changes at each hop. For example, if a packet starts with TTL = `7`, each router will:

1. Verify the current checksum based on TTL = `7`
2. Decrement TTL to `6`
3. Calculate a new checksum based on TTL = `6`
4. Forward the packet with the new checksum

If the checksum verification fails, the device drops the packet. This prevents packets with corrupted headers (which might have incorrect destination addresses, for instance) from being forwarded.

#### Source and Destination Addresses (32 bits each)

![Source and Destination IP Addresses fields within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591643443/b2409ba4-d2e3-468a-af2a-a71fc4ce4c30.png)

These fields contain the source and destination IPv4 addresses, respectively. Each is 4 bytes (32 bits) long, as you learned in the previous sections on IPv4 addressing.

#### Options (Variable Length)

![Options within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591747762/66a3d602-4379-453a-b221-b4f694c3363c.png)

Most IPv4 packets don't include options, but when present, they can provide additional functionality:

- **Record Route**: Each router that handles the packet adds its own address to this option, creating a trace of the packet's path
- **Source Routing**: Allows the sender to specify the route the packet should take:
    - Strict Source Routing: The entire route must be followed exactly
    - Loose Source Routing: Certain routers must be traversed, but the exact path between them is flexible
        

#### Padding

In some cases, the header ends with padding bytes (usually `0`s).

❓Why does the IPv4 header have padding?🤔

As explained before, the IHL field specifies the header length in 4-byte units, so the total header length must be a multiple of 4 bytes. If options make the header length not divisible by 4, padding bytes (usually `0`) are added to reach the next multiple of 4. For example, if you have 3 bytes of options, you would need 1 byte of padding to make the total header length a multiple of 4 bytes.

### IPv4 Header – Interim Summary

You've now learned about the structure of the IPv4 header, with the exception of the fragmentation fields which I’ll cover in the next section.

The IPv4 header efficiently packs all the necessary routing and control information into a compact structure, typically 20 bytes long (without options). This design allows for fast processing by routers while providing the flexibility needed for internet communication. It is amazing how prominent IPv4 is, even so many years after its publication.

In the next section, you'll learn about IPv4 fragmentation.

---

## IPv4 Fragmentation

In the previous section, you learned about most of the IPv4 header structure, with the exception of 32 bits dedicated to fragmentation. This topic deserves special attention, as it reveals important aspects of how IP packets travel across different networks.

![Fragmentation fields within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591136348/bb1035af-c967-4bb8-992c-c10e31b64cd1.png)

### Why Fragmentation Is Needed

To understand what fragmentation is and why it's needed, consider the following network scenario:

![Two networks with different MTUs<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770107962/b3bc6c7a-2adb-4868-893c-ec9e51303567.png)

In this diagram, you have two different networks where Machine A resides in one network and Machine B resides in another. A router forwards packets between these two networks.

These two networks have different Maximum Transmission Units (MTUs). MTU refers to the maximum size of a frame that can be transmitted in a network. For example:

- Machine B is connected to an Ethernet network with an MTU of `1500` bytes
- Machine A is connected to a different network with an MTU of `2000` bytes
    

Different MTUs stem from the different protocols and hardware that different networks have. Ethernet has an MTU of `1500` bytes. This maximum size was chosen because RAM was expensive back in the late 1970s when Ethernet was planned, and a receiver would need more RAM if a frame could be bigger. Other networks were devised at different times where RAM prices might have been lower, or just have other considerations that affect the MTU.

Now, consider this scenario: Machine A wants to send a packet to Machine B. This packet is `1800` bytes long. From A's perspective, there's no problem since its network supports packets of this size. Machine A transmits the packet.

When the router receives this packet, it faces a problem: it cannot simply forward the packet to B's network because the packet is too big for the network's MTU. The router must **fragment** the packet – splitting it into smaller chunks of up to `1500` bytes, which will then be reassembled by Machine B.

### How Fragmentation Works in IP

Let's examine the scenario further. The router needs to take an IP packet of `1800` bytes and split it into two fragments, each consisting of up to `1500` bytes. If Machine A sends another packet of `1800` bytes to Machine B, the router will have to split that one too – resulting in four different fragments that will be reassembled into two separate packets.

![Two IP packets, each consisting of two fragments<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770316245/b137efa8-ae1c-42cb-918a-f6d0ee7b2c3a.png)

When Machine B receives these fragments, it must ensure that it reassembles fragment #1 together with fragment #2 of packet A, and fragment #1 with fragment #2 of packet B – and not, for instance, fragment #1 of packet A with fragment #2 of packet B. It must also reassemble the fragments in the correct order – so structure a packet that consists of #1#2 and not #2#1. ![Possible issues in reassembling packets from two fragments<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770377464/12aad8f1-0251-4289-bc9a-75084dbc1f7a.png)

### Identification Field

First, focus on making sure Machine B reassembles fragments of the same packet (for example, fragment #1 and fragment #2 of packet A in the example above, rather than fragment #1 of packet A and fragment #2 of packet B). This is achieved using the identification field of IPv4. Fragments belonging to the same packet will have the same identification value. For example, both fragments of packet A might have identification set to `100`, and both fragments of packet B might have identification of `200`.

![The identification fields ensures fragments of the same original packet are reassembled together<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770785114/6f04e59b-adfc-44a9-bf6e-1118ab748160.png)

It's important to note that sharing identification values isn't sufficient for fragments to belong to the same packet. Fragments of the same packet must also share:

- The same source IP address
- The same destination IP address
- The same protocol value (indicating whether the payload is TCP, UDP, and so on)

### Fragment Offset

Since IP is a connectionless protocol, there's no guarantee that fragments will arrive at Machine B in the correct order. Fragment #2 of packet A may arrive before fragment #1. To handle this issue, each fragment carries an Offset field, which denotes the offset from the beginning of the original packet.

The Offset field consists of 13 bits, which means it can carry values from `0` to `8191` (2^13-1). This poses a potential problem, as the maximum size of an IP packet can be `65,535` bytes (since the Total Length field of the IP header consists of 16 bits).

To address this limitation, the value encoded in the Offset field is actually multiplied by `8` (2^3). This means the minimum size of a fragment is `8` bytes, with the exception of the last fragment.

❓Why do IP packets carry an offset in bytes divided by 8, instead of just a sequential fragment number?🤔

While using sequence numbers might seem simpler, it would create problems when packets need to be fragmented multiple times.

For example, if Computer A sends a packet to the first router, which fragments it into pieces of `1480` bytes and `320` bytes, and then these fragments are sent to another router that needs to fragment them again into even smaller pieces, how would you number them?

With byte offsets, the solution is straightforward – if the first fragment has an offset of `0` and the next one has an offset of `1480`, then if we need to split them into maximum `800`-byte fragments, we'd have:

- First fragment: `800` bytes with offset `0`
- Second fragment: `680` bytes with offset `800`
- Third fragment: `320` bytes with offset `1480`

### More Fragments and Don't Fragment Flags

When Machine B receives a fragment, it needs to know whether this is an entire packet by itself or if it should expect additional fragments. For this purpose, each IP fragment carries a More Fragments (`MF`) bit that is set to `1` for every fragment that is not the last fragment of the packet. For the last fragment, it's set to `0`.

In case the packet consists of a single fragment – the `MF` bit will be set to `0`, and the offset field will also hold the value `0` (that is, 13 bits of `0`s).

Another bit related to fragmentation is the Don't Fragment (`DF`) bit. When this flag is turned on, intermediate devices should not fragment the original packet, even if it exceeds the MTU. Instead, they should drop it and typically send an ICMP "Fragmentation Needed" message back to the source.

In our example, if Machine A sets the Don't Fragment bit to `1`, the router would drop the packet, and notify Machine A about it.

Note that right after the identification field and before the `DF` flag, there is a reserved bit set to `0`. This bit was reserved in case it is needed in the future, for a reason unknown to the original authors of IPv4. ### Fragmentation Example

Consider again our example above – with Machine A residing in a network where the MTU is `2000`, and Machine B residing in a network where the MTU is `1500`. Machine A sends a packet which is `1800` bytes long.

❓Can you fill the values in these tables?

**First Fragment:**

| Total Length |  |
| --- | --- |
| Identification |  |
| Don’t Fragment |  |
| More Fragments |  |
| Offset | |

**Second Fragment:**

| Total Length |  |
| --- | --- |
| Identification |  |
| Don’t Fragment |  |
| More Fragments |  |
| Offset | |

For our example above, the values of the relevant fragmentation fields in IP would be as follows:

**First Fragment:**

- Total Length: `1500` (including `20` bytes of IP header, so `1480` bytes of payload)
- Identification: `1337` (arbitrary value)
- Don't Fragment bit: `0` (off, to allow further fragmentation if needed)
- More Fragments bit: `1` (on, as this is not the last fragment)
- Offset: `0` (it's the first fragment)

**Second Fragment:**

- Total Length: `340` (including `20` bytes of IP header, so `320` bytes of payload – together with the first fragment, we get to `1800` bytes of payload)
- Identification: `1337` (same as first fragment, indicating they belong together)
- Don't Fragment bit: `0` (off, to allow further fragmentation if needed)
- More Fragments bit: `0` (off, as this is the last fragment)
- Offset: `185` (1480/8 = 185, or `0xB9` in hexadecimal)

### IPv4 Fragmentation – Summary

You've now learned about the final part of the IPv4 Header: fragmentation. Fragmentation is necessary to allow packets to travel across networks with different MTUs. The IPv4 header includes several fields specifically designed to support fragmentation:

- Identification (16 bits): Identifies which fragments belong together
- Flags (3 bits): Including the "More Fragments" and "Don't Fragment" flags
- Fragment Offset (13 bits): Indicates where in the original packet this fragment belongs

With this knowledge, you now understand every bit and byte of the IPv4 header and how IP packets can traverse networks with different characteristics.

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
