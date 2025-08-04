---
lang: en-US
title: "IPv4 Fragmentation"
description: "Article(s) > (8/8) How IPv4 Works – A Handbook for Developers" 
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
      content: "Article(s) > (8/8) How IPv4 Works – A Handbook for Developers"
    - property: og:description
      content: "IPv4 Fragmentation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/ipv4-fragmentation.html
next: /freecodecamp.org/how-ipv4-works-a-handbook-for-developers/README.md#summary–ipv4
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
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-ipv4-fragmentation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

In the previous section, you learned about most of the IPv4 header structure, with the exception of 32 bits dedicated to fragmentation. This topic deserves special attention, as it reveals important aspects of how IP packets travel across different networks.

![Fragmentation fields within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591136348/bb1035af-c967-4bb8-992c-c10e31b64cd1.png)

---

## Why Fragmentation Is Needed

To understand what fragmentation is and why it's needed, consider the following network scenario:

![Two networks with different MTUs<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770107962/b3bc6c7a-2adb-4868-893c-ec9e51303567.png)

In this diagram, you have two different networks where Machine A resides in one network and Machine B resides in another. A router forwards packets between these two networks.

These two networks have different Maximum Transmission Units (MTUs). MTU refers to the maximum size of a frame that can be transmitted in a network. For example:

- Machine B is connected to an Ethernet network with an MTU of `1500` bytes
- Machine A is connected to a different network with an MTU of `2000` bytes

Different MTUs stem from the different protocols and hardware that different networks have. Ethernet has an MTU of `1500` bytes. This maximum size was chosen because RAM was expensive back in the late 1970s when Ethernet was planned, and a receiver would need more RAM if a frame could be bigger. Other networks were devised at different times where RAM prices might have been lower, or just have other considerations that affect the MTU.

Now, consider this scenario: Machine A wants to send a packet to Machine B. This packet is `1800` bytes long. From A's perspective, there's no problem since its network supports packets of this size. Machine A transmits the packet.

When the router receives this packet, it faces a problem: it cannot simply forward the packet to B's network because the packet is too big for the network's MTU. The router must **fragment** the packet – splitting it into smaller chunks of up to `1500` bytes, which will then be reassembled by Machine B.

---

## How Fragmentation Works in IP

Let's examine the scenario further. The router needs to take an IP packet of `1800` bytes and split it into two fragments, each consisting of up to `1500` bytes. If Machine A sends another packet of `1800` bytes to Machine B, the router will have to split that one too – resulting in four different fragments that will be reassembled into two separate packets.

![Two IP packets, each consisting of two fragments<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770316245/b137efa8-ae1c-42cb-918a-f6d0ee7b2c3a.png)

When Machine B receives these fragments, it must ensure that it reassembles fragment #1 together with fragment #2 of packet A, and fragment #1 with fragment #2 of packet B – and not, for instance, fragment #1 of packet A with fragment #2 of packet B. It must also reassemble the fragments in the correct order – so structure a packet that consists of #1#2 and not #2#1. ![Possible issues in reassembling packets from two fragments<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770377464/12aad8f1-0251-4289-bc9a-75084dbc1f7a.png)

---

## Identification Field

First, focus on making sure Machine B reassembles fragments of the same packet (for example, fragment #1 and fragment #2 of packet A in the example above, rather than fragment #1 of packet A and fragment #2 of packet B). This is achieved using the identification field of IPv4. Fragments belonging to the same packet will have the same identification value. For example, both fragments of packet A might have identification set to `100`, and both fragments of packet B might have identification of `200`.

![The identification fields ensures fragments of the same original packet are reassembled together<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745770785114/6f04e59b-adfc-44a9-bf6e-1118ab748160.png)

It's important to note that sharing identification values isn't sufficient for fragments to belong to the same packet. Fragments of the same packet must also share:

- The same source IP address
- The same destination IP address
- The same protocol value (indicating whether the payload is TCP, UDP, and so on)

---

## Fragment Offset

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

---

## More Fragments and Don't Fragment Flags

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

---

## IPv4 Fragmentation – Summary

You've now learned about the final part of the IPv4 Header: fragmentation. Fragmentation is necessary to allow packets to travel across networks with different MTUs. The IPv4 header includes several fields specifically designed to support fragmentation:

- Identification (16 bits): Identifies which fragments belong together
- Flags (3 bits): Including the "More Fragments" and "Don't Fragment" flags
- Fragment Offset (13 bits): Indicates where in the original packet this fragment belongs

With this knowledge, you now understand every bit and byte of the IPv4 header and how IP packets can traverse networks with different characteristics.
