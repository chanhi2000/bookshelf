---
lang: en-US
title: "Test Yourself"
description: "Article(s) > (5/8) How IPv4 Works - A Handbook for Developers" 
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
      content: "Article(s) > (5/8) How IPv4 Works - A Handbook for Developers"
    - property: og:description
      content: "Test Yourself"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-ipv4-works-a-handbook-for-developers/test-yourself.html
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
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-test-yourself"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

Now practice the concepts you've learned and make sure you feel comfortable with them.

Take a moment to try answering the following questions before checking the answers.

---

## Converting Between Prefix Notation and Subnet Masks

How would you represent a network prefix of `16` bits, written like this `/16`, as a subnet mask?

You need `16` bits that are on. When `8` bits are on you get `255` in decimal, so you'd use:

```plaintext
255.255.0.0
```

![16-bit subnet mask address<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465135834/ff449f60-e660-4fea-b427-994a87be2c89.png)

Given this network prefix, do these addresses belong to the same network?

![Do these addresses fit in the network defined before?<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465178617/ef7ddeca-86b2-4bb2-8e1d-471ef4f64a45.png)

Yes, they do, as they share the same most-significant `16` bits, or two bytes

![These addresses fit in the same network<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465209149/25744a22-16b3-484d-9821-12920dd59be4.png)

Does this address belong to the same network as that of the previous addresses?

![Additional address<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465232371/92bcb42c-5067-43e6-8cec-1eae9347d16a.png)

Yes, it does. Again, it shares the same two most-significant bytes.

![This address also fits in the network defined before<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465259087/a4b9c525-3b4d-4501-bcf8-db62ebf47247.png)

What about this one? Does it belong to the same network as the previous addresses?

![Additional address. Does this address fit in the network defined before?<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465285214/f57fd6c2-7665-4565-943e-959b981fedc8.png)

No, as the first two bytes are not `42.31` - this is a different network. So this address describes host `1.2`, within the network `42.32`.

![No, this address does not belong to the same network as the other ones<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465302503/0fdd959f-2d10-4a56-826d-e71604ca5267.png)

---

## Working Backwards with Subnet Masks

Let's try the other way around. You have this subnet mask:

```plaintext
255.255.255.0
```

How would you express it using a network prefix?

You have three occurrences of `255`, which means three times `8` bits that are on, so overall you have `24` bits that are on. So you can also write `/24`. This means `3` bytes.

![24-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465331643/b1f3ab4c-8e7e-449d-8879-fee3bf90ce1c.png)

Given this subnet mask, do addresses (1) and (3) above belong to the same network?

![Do these addresses have the same network ID given a 24-bit subnet mask?<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465436680/ca71584d-53dc-4116-a109-d32c11e997ef.png)

They do, as they both have the same most-significant three bytes - network `42.31.93`.

![24-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465461745/c01f5958-f675-45c5-bc41-de857483e25d.png)

What about addresses (1) and (2)?

![Do these addresses have the same network ID given a 24-bit subnet mask?<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465532664/a0ef8f73-27d5-4488-98a9-1dbeaf457797.png)

Given this network prefix, they don't belong to the same network. The first address belongs to network `42.31.93`, and the second address belongs to network `42.31.1`.

![24-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465498737/6d4cb056-126a-422f-94bc-4392a996869c.png)

---

## Non-Byte-Aligned Prefixes

Network prefixes do not have to align to `8` bits, or full bytes. Let's say you have a network prefix of `14` bits. How would you convert that to a subnet mask?

Well, the first byte is clear: you have `8` bits on, so the first byte is `255`. What about the next one?

In binary, you'd want to have six additional 1s, and then 2 0s - so in binary you'd write:

```plaintext
11111100
```

Converting to decimal, this binary number represents `252`. So your subnet mask is:

```plaintext
255.252.0.0
```

Another way to make this conversion: You know that eight 1s in binary represent `255` in decimal. You also know that `11` in binary is `3`, so you can simply subtract `3` from `255` and get `252`.

![14-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465576989/bb1a90c1-1563-4970-b0f5-e0f502e82563.png)

Next, try the other way around. You have the following subnet mask:

```plaintext
255.255.224.0
```

How many bits represent the network prefix?

The first two bytes are clear: you have `16` bits. Converting the third byte to binary: `224` in decimal is `11100000` in binary. This means you have an additional three 1s, so you can write the subnet mask above as a prefix of `/19` bits - `16` bits for the two `255` bytes, and `3` additional bits for the `224` byte.

![19-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465642118/2587e3bc-0c88-48a9-b876-b96fd3a493d1.png)

---

## Determining Network Membership

Let's consider the following addresses:

![Two IP addresses<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465744667/86337750-0f67-4ed7-b8c2-7d6fcf330a71.png)

Are they part of the same network? 🤔

It depends on the subnet mask.

If the network prefix is `/8`, then they are part of the same network, as they share the same network ID.

![8-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465761356/67c590e1-daf5-4276-96ff-a39ee914d2d3.png)

On the other hand, if the network prefix is `/16`, then they have different network IDs, and thus don't belong to the same network. But what happens with prefixes in between? Will they reside in the same network for a prefix of `/9`? `/14`?

The way to approach this question is to convert the second byte of these addresses to binary. For the first address, this byte is `24`, which in binary is:

```plaintext
00011000
```

For the second address, the second byte is `23`, which in binary is:

```plaintext
00010111
```

![12-bit subnet mask<br/>(Source: <VPIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744465797029/fcbc4bd8-e273-4032-afb3-f10e2028738b.png)

You can see that the most significant `4` bits within the second byte are identical. If you add the first `8` bits of the address, you see that the most significant `12` bits of these addresses are the same.

So, if you have a network prefix of `/11`, do these addresses belong to the same network?

Yes, they do - their most significant `11` bits are identical.

What about `/13`?

No, with this network prefix, they don't share the same network identifier, as their `13`th bit is different.

This practice should help you feel comfortable with subnet masks and network prefixes. In the next section, you'll learn about special IP addresses and then examine the header of IP packets.
