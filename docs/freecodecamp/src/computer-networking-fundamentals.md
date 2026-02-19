---
lang: en-US
title: "Computer Networking Fundamentals"
description: "Article(s) > Computer Networking Fundamentals"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Youtube
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - coen
  - computerengineering
  - computer-engineering
  - youtube
  - crashcourse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Computer Networking Fundamentals"
    - property: og:description
      content: "Computer Networking Fundamentals"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/computer-networking-fundamentals.html
prev: /academics/coen/articles/README.md
date: 2026-02-19
isOriginal: false
author:
  - name: Kshitij Sharma
    url: https://udemy.com/user/kshitij-sharma-196/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771430669203/458df2d4-6920-4f6f-a30a-aecfa4635309.jpeg
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
  name="Computer Networking Fundamentals"
  desc="How does the Internet really work? For many technical jobs it is important to understand computer networking. We just posted a massive 12-hour course that will give you a deep dive into computer networking. Here are the sections covered in this compr..."
  url="https://freecodecamp.org/news/computer-networking-fundamentals"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1771430669203/458df2d4-6920-4f6f-a30a-aecfa4635309.jpeg"/>

How does the Internet really work?

For many technical jobs it is important to understand computer networking. We just posted a massive 12-hour course that will give you a deep dive into computer networking.

Here are the sections covered in this comprehensive course:

**Course Overview & Methodology**

- Fundamental Concepts and Networking Stack
- Orientation: Curriculum and Prerequisite (DSA)
- Introduction to the Instructor: Shrathir Sharma
- Course Access (YouTube/Udemy) and Target Audience
- Teaching Methodology: Raw Pen & Paper Style
- Core Modules: IPv4, Error Control, and Flow Control
- Core Modules: Transport, Media Access, and Routing
- Bonus Module: Cybersecurity

**Networking Basics**

- Defining a Computer Network
- Why Networks Interact: Resource Sharing
- 5 Components of Data Communication
- 4 Metrics for Network Effectiveness
- Transmission Modes: Simplex, Half-Duplex, Full-Duplex
- Types of Connections: Point-to-Point vs. Multi-Point

**Topology & Architecture**

- Introduction to Topology Layouts
- Mesh Topology and Link Calculations
- Advantages and Disadvantages of Topologies
- Star, Bus, and Ring Topology Details
- The OSI Model Framework
- Layered Architecture and Peer-to-Peer Protocols

**Binary & IP Addressing Foundations**

- Review of Lecture Zero
- Binary Number Representation & Conversion
- Binary Weights and Octet Conversions
- Introduction to IPv4 Logical Addressing
- Network ID vs. Host ID and IANA Authority

**Classful vs. Classless Addressing**

- Telephone Network Analogy for IP Classes
- Class A, B, and C Breakdown
- Classful Wastage and the Need for Classless (CIDR)
- Implementation: Fixing Bits for Classes A-E
- IP Address Space Distribution
- Hexadecimal and Decimal IP Representations

**IPv4 Addressing Deep Dive**

- Class A Details: Reserved Addresses & 127.0.0.1 Loopback
- Calculating Valid Hosts and Reserved All-Zeros/All-Ones
- Loopback Testing & Troubleshooting Connectivity
- Class B Details: Network Ranges & Host Capacity
- Class C Details: Network/Host Ratios
- Class D (Multicasting) and Class E (Experimental)
- IP Conversion Practice: Hexadecimal to Decimal
- Common Pitfalls: "Addresses" vs. "Valid Hosts"

**Subnetting & VLSM**

- Introduction to Subnetting: Why We Divide Networks
- Disadvantages of Subnetting: Wastage and Cost
- How to Subnet: Borrowing Bits from Host ID
- Subnet Identification: Calculating Subnet IDs and DBAs
- Working with Weights: Identifying Specific Subnets
- Subnet Masks vs. Network Masks
- Designing a Subnet Mask for Specific Requirements
- Variable Length Subnet Masking (VLSM) Strategy
- Determining Subnet IDs using Bitwise AND Operations
- Routing Tables: Matching Destination IPs to Interfaces
- CIDR: Classless Inter-Domain Routing & Slash Notation
- Rules for Valid CIDR Blocks
- Supernetting: Merging Multiple Blocks

**Error Control & Detection**

- Introduction to Error Control: Noise vs. Security
- Single Bit Error vs. Burst Errors
- Redundant Bits and Block Coding Logic
- Hamming Distance: Calculating Difference Between Strings
- Minimum Hamming Distance for Detection and Correction
- Simple Parity: Even vs. Odd Parity Methods
- 2D Parity: Detecting and Correcting Single Bit Errors
- Limitations of 2D Parity for Multi-Bit Errors
- Cyclic Redundancy Check (CRC): Divisor & Remainder Logic
- Checksum: One's Complement Summation Method

**Flow Control & Layered Architecture**

- Network Delays: Transmission vs. Propagation
- Queuing and Processing Delays
- Data Encapsulation: Headers and Trailers
- The Need for Flow Control: Avoiding Receiver Overwhelm
- Stop and Wait Protocol: Core Mechanism
- Using Timers and Sequence Numbers
- Calculating Efficiency and Round Trip Time (RTT)
- Throughput: Effective Bandwidth Relationship
- Sliding Window Concept: Improving Efficiency
- Go-Back-N (GBN) Protocol: Sender/Receiver Windows
- Selective Repeat (SR) Protocol: Out-of-Order Handling
- Cumulative vs. Independent Acknowledgments

**Network Layer: IP Header & Routing**

- IPv4 Header Format Overview
- Type of Services (TOS): Priority and DTRC Bits
- Time to Live (TTL): Preventing Infinite Loops
- Protocol Field and Header Checksum
- IP Options: Strict vs. Loose Source Routing
- TCP Header Structure: Ports, Sequence, and Ack
- Wrap Around Time and Segment Lifetime
- Advertisement Window (Flow Control)
- TCP Control Flags: URG, ACK, PSH, RST, SYN, FIN
- SYN Flooding Attack (DDoS)
- Congestion Control Policy: Slow Start & Avoidance
- TCP Timers: Time-Wait, Keep-Alive, Persistent
- UDP Header and Best-Effort Delivery
- Comparison: TCP vs. UDP

**Media Access & Application Support**

- Multiple Access: Random vs. Controlled Access
- Pure Aloha vs. Slotted Aloha Throughput
- CSMA (Carrier Sense): Persistent Methods
- Polling, Reservation, and Token Passing
- Routing: Flooding vs. Dynamic Routing
- Distance Vector (Bellman-Ford) vs. Link State (Dijkstra)
- Circuit Switching vs. Packet Switching
- Email Protocols: SMTP, POP3, IMAP4
- Domain Name System (DNS) Hierarchy & Queries
- FTP (File Transfer) and HTTP (Web Services)
- Support Protocols: ARP and ICMP Error Reporting
- Final Summary: OSI Model Layers 1-7

Watch the full course on [<VPIcon icon="fa-brands fa-youtube"/>the freeCodeCamp.org YouTube channel](https://youtu.be/fQbBPa0ADvs) (12-hour watch).

<VidStack src="youtube/fQbBPa0ADvs" />

::: info Resources

```component VPCard
{
  "title": "CN.pdf",
  "desc": "",
  "link": "https://drive.google.com/file/u/0/d/1H4HyyNb07e4u3wdV-vfUWJTn2ulullac/view?usp=sharing&pli=1&usp=embed_facebook/",
  "logo": "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
  "background": "rgba(0,74,119,0.2)"
}
```

```component VPCard
{
  "title": "Computer-Networks-Course-Overview.pdf",
  "desc": "",
  "link": "https://drive.google.com/file/d/1d8cynMNNB0H5DoyBwAj1WTQrIe4X2PLX/view?usp=drive_link&usp=embed_facebook/",
  "logo": "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
  "background": "rgba(0,74,119,0.2)"
}
```

```component VPCard
{
  "title": "DPP CN.pdf",
  "desc": "",
  "link": "https://drive.google.com/file/d/1q3s7Yk_bVdxMosDVf-hkGYOLqgSeza4H/view?usp=sharing&usp=embed_facebook/",
  "logo": "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
  "background": "rgba(0,74,119,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Computer Networking Fundamentals",
  "desc": "How does the Internet really work? For many technical jobs it is important to understand computer networking. We just posted a massive 12-hour course that will give you a deep dive into computer networking. Here are the sections covered in this compr...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/computer-networking-fundamentals.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
