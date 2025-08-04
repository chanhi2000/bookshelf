---
lang: en-US
title: "Special IPv4 Addresses"
description: "Article(s) > (6/8) How IPv4 Works – A Handbook for Developers" 
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
      content: "Article(s) > (6/8) How IPv4 Works – A Handbook for Developers"
    - property: og:description
      content: "Special IPv4 Addresses"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-ipv4-works-a-handbook-for-developers/special-ipv4-addresses.html
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
  url="https://freecodecamp.org/news/how-ipv4-works-a-handbook-for-developers#heading-special-ipv4-addresses"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746028336196/79d97781-a9b8-4be3-86a1-47322e9640ff.png"/>

Now that you're comfortable with IP addresses and subnet masks, let's explore some IP addresses that have special meanings.

---

## The "This Host" Address: 0.0.0.0

The address `0.0.0.0` means "this host" and is used in two scenarios:

First, when a machine boots up and doesn't yet have an IP address. IP addresses are logical addresses that need to be assigned to a machine. Prior to this assignment, a device has no IP address at all. If the device needs to communicate at this stage, it may use this special address, `0.0.0.0`.

Second, when writing network applications that need to listen for incoming connections on all network interfaces. For example, if a machine has two interfaces – one with the IP address `1.1.1.1`, and another with the address `2.2.2.2` – listening on the address `0.0.0.0` means accepting connections regardless of which network interface receives them.

---

## "This Network" Addresses

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

---

## Broadcast Addresses

The address `255.255.255.255`, where all bits are set to `1`, is the address of all hosts in the local network – the broadcast address. This is similar to the [**broadcast address in Ethernet**](https://freecodecamp.org/news/the-complete-guide-to-the-ethernet-protocol/#heading-unicast-and-multicast-bits) (`FF:FF:FF:FF:FF:FF`). In both cases, all bits are set to `1`.
<!-- TODO: /freecodecamp.org/the-complete-guide-to-the-ethernet-protocol/README.md -->

Using a proper network identifier where the host identifier is all set to 1s can be used to send a broadcast packet to remote networks. For example, consider a network `12.34.0.0/16` and another network with the network ID of `12.35.0.0/16`. If a machine at `12.34.55.55` wants to send a packet to all devices in the other network, it could use the destination address: `12.35.255.255`.

Even though this is allowed according to the IP specification (RFC), in practice this feature is often disabled as it can create security vulnerabilities.

---

## Loopback Addresses: 127.0.0.0/8

All addresses in the network `127.0.0.0/8` (that is, all addresses that start with `127`) are loopback addresses. Packets sent to any of these addresses are not put onto the physical network but are processed locally within the operating system. This is extremely useful for development and debugging.

For example, when developing a simple chat program, you need two clients that exchange data. One approach would be to use two different physical computers, but this is tedious – you'd need to write a message on one computer, check the other computer to see if it was received, then write a message on the second computer, and go back to the first to validate receipt.

A much simpler approach is to use a loopback address. Both clients can run on the same machine and connect with one another. You can run two different client programs on the same physical computer and exchange messages between them without needing an additional machine.

For instance, you might use the address `127.0.0.1`, with one client listening on port `1337` and the other on port `1338`. When client A sends a packet to client B, this packet never leaves your network card but remains within the operating system. Client B receives the packet from the loopback interface as if it had been received from the physical network.

After debugging is complete, your client code doesn't need to change – the only difference is that they will communicate using real IP addresses instead of the loopback address.

![Loopback operation<br/>(Source: <FontIcon icon="fa-brands fa-youtube"/>`BriefVid`)](https://cdn.hashnode.com/res/hashnode/image/upload/v1744736895494/fd1e4a8d-a834-4bf4-b4b9-1e83cf851161.png)

---

## Summary of Special IPv4 Addresses

To summarize the special IPv4 addresses you've learned about:

| Special Address | Meaning | Usage |
| --- | --- | --- |
| `0.0.0.0` | "This host" | Used during boot or to listen on all interfaces |
| Addresses starting with `0` | "This network" | Sending to hosts on the local network |
| `255.255.255.255` | Broadcast | Sending to all hosts on the local network |
| Network ID with all 1s in host part | Directed broadcast | Sending to all hosts on a specific network |
| `127.0.0.0/8` | Loopback | Testing and debugging without using the physical network |

In the next section, you'll learn about the structure of the IPv4 header.
