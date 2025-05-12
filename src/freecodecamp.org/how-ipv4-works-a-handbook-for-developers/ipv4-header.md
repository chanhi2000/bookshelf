---
lang: en-US
title: "IPv4 Header"
description: "Article(s) > (7/8) How IPv4 Works – A Handbook for Developers" 
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
      content: "Article(s) > (7/8) How IPv4 Works – A Handbook for Developers"
    - property: og:description
      content: "IPv4 Header"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/ipv4-header.html
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
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-ipv4-header"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

Now that you understand IP addresses, subnets, and special addresses, it's time to examine the IPv4 header structure in detail.

---

## The Header Structure

![IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745583720695/21521520-3029-4a0a-b4e7-fa484ca350ab.png)

The diagram above shows the header of IPv4 as defined in RFC 791. Let's examine each field:

### Version (4 bits)

![Version field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745589954987/cb357d49-73ab-43e6-93b5-c2b7c7e3eb4a.png)

The header starts with the Version field, which consists of four bits. For an IPv4 packet, the version is `4`, so this field will always carry the value of `4` (or `0100` in binary).

❓ Why does the header start with the Version field? 🤔

::: note

when I start a sentence with the ❓mark – it’s a question addressed at you, and I encourage you to try and answer it before reading on

:::

The reason is that the remaining fields may differ according to the version. If a network device reads an IP packet and the version field carries the value of `4`, it will expect the remainder of the packet to follow the IPv4 structure. If it carries another value, such as `6`, the remaining fields are different, as in IPv6. #### Internet Header Length (IHL) (4 bits)

![IHL field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745590070221/ca452338-299c-422c-aef4-8fe8569dd218.png)

This field indicates the length of the header itself.

❓ Why do we need to specify the length? 🤔

Unlike [Ethernet](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/), where the header size is fixed, the IPv4 header length can vary because of optional fields. For an IP packet without special options, the header consists of `20` bytes, which is the most common case.

The IHL field doesn't specify the length in bytes directly but in units of 4-byte words. So to specify a length of `20` bytes, the value would be `5` (5 × 4 = 20). This encoding allows the field to use only 4 bits while specifying header lengths up to `60` bytes (when IHL = `15`).

A common IPv4 packet therefore begins with the byte `0x45` in hexadecimal, meaning it's version `4` of the IP protocol, and the header is `20` bytes long.

### Type of Service (TOS) (8 bits)

![TOS field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745590323255/e8a30561-bfbf-4bcd-a07c-3dbce88fc6c4.png)

The idea behind this field is that not all packets are equally important. You may want to give priority to some packets over others.

For example, packets carrying real-time data (like voice or video conferencing) are more time-sensitive than packets carrying, say, email or file downloads. If a router is currently experiencing high load, it should ideally prioritize time-sensitive packets.

The Type of Service field allows senders to indicate the priority of their packets. However, on the public internet, this field is often ignored by routers because any sender can set any priority value. In most cases, this field carries the value of `0`.

### Total Length (16 bits)

![Total Length field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745590421285/07a4b428-3a97-4ea8-9006-5fd8bb215d95.png)

This field specifies the total length of the IP packet, including both the header and the payload (data).

❓ Why is this needed to specify the length? 🤔

Unfortunately, the IP layer doesn’t necessarily know if some of the bytes in the packet are actually a padding of the second layer. I described this in detail in [a previous post](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-the-problem-with-the-type-length-field), where I showed that in Ethernet protocol, in some cases, [the receiving Ethernet entity cannot tell which bytes belong to the payload and which bytes are simply padding](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-the-problem-with-the-type-length-field). The IP layer needs to know precisely which bytes belong to the actual packet, hence the Total Length field.

❓ What is the maximum size of an IPv4 packet? 🤔

Since this field is `16` bits long, an IPv4 packet may contain a maximum of 2^16-1 bytes, or `65,535` bytes, including the header. The minimum size is `20` bytes, consisting of just the header without options or payload.

### Fragmentation Fields (32 bits)

![Fragmentation fields within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591136348/bb1035af-c967-4bb8-992c-c10e31b64cd1.png)

The next four bytes are dedicated to fragmentation control. I’ll cover these fields in a separate section, as they involve a complex topic deserving special attention.

### Time to Live (8 bits)

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

### Protocol (8 bits)

![Protocol field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591243041/ab9be6ea-5f11-4bb1-b93f-f0d9deef0c6f.png)

This field describes the payload of the IPv4 packet. For example:

- A value of `6` means the payload is TCP
- A value of `17` means the payload is UDP

This helps the receiving system know which protocol handler should process the packet's contents. It's similar to [**the Type field in Ethernet**](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-type-length-field-ethernet-ii-type-2-bytes), which specifies the protocol of the layer encapsulated within the Ethernet frame.
<!-- TODO: /freecodecamp.org/the-complete-guide-to-the-ethernet-protocol/README.md -->

### Header Checksum (16 bits)

![Header checksum field within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591295127/9953fb34-2b2f-4c9f-bf39-7a18ceaf2b1a.png)

This is a 16-bit checksum used to verify the validity of the header only (that is, excluding the payload). The sender computes this value based on the fields of the header, and the receiver also computes it to validate that the header was received correctly.

❓The checksum must be recalculated by each router. Why is that? 🤔

Because the TTL field changes at each hop. For example, if a packet starts with TTL = `7`, each router will:

1. Verify the current checksum based on TTL = `7`
2. Decrement TTL to `6`
3. Calculate a new checksum based on TTL = `6`
4. Forward the packet with the new checksum

If the checksum verification fails, the device drops the packet. This prevents packets with corrupted headers (which might have incorrect destination addresses, for instance) from being forwarded.

### Source and Destination Addresses (32 bits each)

![Source and Destination IP Addresses fields within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591643443/b2409ba4-d2e3-468a-af2a-a71fc4ce4c30.png)

These fields contain the source and destination IPv4 addresses, respectively. Each is 4 bytes (32 bits) long, as you learned in the previous sections on IPv4 addressing.

### Options (Variable Length)

![Options within IPv4 Header<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1745591747762/66a3d602-4379-453a-b221-b4f694c3363c.png)

Most IPv4 packets don't include options, but when present, they can provide additional functionality:

- **Record Route**: Each router that handles the packet adds its own address to this option, creating a trace of the packet's path
- **Source Routing**: Allows the sender to specify the route the packet should take:
  - Strict Source Routing: The entire route must be followed exactly
  - Loose Source Routing: Certain routers must be traversed, but the exact path between them is flexible

### Padding

In some cases, the header ends with padding bytes (usually `0`s).

❓Why does the IPv4 header have padding?🤔

As explained before, the IHL field specifies the header length in 4-byte units, so the total header length must be a multiple of 4 bytes. If options make the header length not divisible by 4, padding bytes (usually `0`) are added to reach the next multiple of 4. For example, if you have 3 bytes of options, you would need 1 byte of padding to make the total header length a multiple of 4 bytes.

---

## IPv4 Header – Interim Summary

You've now learned about the structure of the IPv4 header, with the exception of the fragmentation fields which I’ll cover in the next section.

The IPv4 header efficiently packs all the necessary routing and control information into a compact structure, typically 20 bytes long (without options). This design allows for fast processing by routers while providing the flexibility needed for internet communication. It is amazing how prominent IPv4 is, even so many years after its publication.

In the next section, you'll learn about IPv4 fragmentation.
