---
lang: en-US
title: "Computer Networking Tutorial - How Network Applications Talk Over the Internet"
description: "Article(s) > Computer Networking Tutorial - How Network Applications Talk Over the Internet"
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
      content: "Article(s) > Computer Networking Tutorial - How Network Applications Talk Over the Internet"
    - property: og:description
      content: "Computer Networking Tutorial - How Network Applications Talk Over the Internet"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/computer-networking-how-applications-talk-over-the-internet.html
prev: /academics/coen/articles/README.md
date: 2022-01-19
isOriginal: false
author:
  - name: Sahil Gupta
    url : https://freecodecamp.org
cover: https://freecodecamp.org/news/content/images/2022/01/network-applications-article-image.jpeg
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
  name="Computer Networking Tutorial - How Network Applications Talk Over the Internet"
  desc="By Sahil Gupta Network applications are computer applications that participate in a computer network. These applications talk to each other by plugging into the network.  For example, when you visit google.com, your browser acts as a network applicat..."
  url="https://freecodecamp.org/news/computer-networking-how-applications-talk-over-the-internet"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/01/network-applications-article-image.jpeg"/>

Network applications are computer applications that participate in a computer network. These applications talk to each other by plugging into the network.

For example, when you visit google.com, your browser acts as a network application that leverages the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Internet](https://en.wikipedia.org/wiki/Internet) to talk to the network application running on Google's computer.

Usually, the mechanics of this communication are abstracted away from an application developer.

On the surface, this communication might look like an [<VPIcon icon="fa-brands fa-wikipedia-w"/>Inter-Process Communication](https://en.wikipedia.org/wiki/Inter-process_communication) between [<VPIcon icon="fa-brands fa-wikipedia-w"/>two applications running on the same computer](https://en.wikipedia.org/wiki/Unix_domain_socket). But, network communication has a different set of challenges.

For example, communication can take an eternity in computer time. It takes 0.1337 secs (2 *3.14* 6400 / 30000) for light to travel around earth. Assuming a modest CPU that runs at 1GHz, it can perform 10^9 ops in 1 sec.

Suppose it takes a few ops for processes (running on the same machine) to communicate, roughly 10^-7 - 10^-8 secs. That translates to ~1 million times slower communication times with a computer sitting on the other side of Earth!

This article will look at how network applications talk to each other, specifically over the Internet. For a high-level overview of the Internet, see [<VPIcon icon="fas fa-globe"/>this article](https://blog.devgenius.io/how-does-the-internet-work-256891cdbb77).

---

## Introduction to Computer Networks

An additional complexity involved in network communication is the diversity of end systems out there (mobile phones, laptops, windows, mac). This complexity is managed by [<VPIcon icon="fa-brands fa-wikipedia-w"/>abstracting](https://en.wikipedia.org/wiki/Abstraction_(computer_science)) the differences and introducing a uniform set of rules called [<VPIcon icon="fa-brands fa-wikipedia-w"/>Protocols](https://en.wikipedia.org/wiki/Communication_protocol).

Protocols are the building blocks of communication between network applications. Some of the popular protocols include HTTP, TCP, IP, SMTP. Like how a human language (such as English) enables diverse people to communicate meaningfully, Protocols fill a similar gap in network communication.

Network communication is challenging due to the scale and uncertainty inherent in the network.

For example, links can be clogged, which results in the dropping of packets. One strategy to solve a complicated problem is to divide the problem into subproblems, solve the subproblems, and combine them to solve the original problem.

[<VPIcon icon="fa-brands fa-wikipedia-w"/>The Protocol Stack](https://en.wikipedia.org/wiki/Protocol_stack) uses this idea to solve network communication.

![Protocol Stack](https://freecodecamp.org/news/content/images/2022/01/1-1.png)

Imagine you are building a website to sell pizza. When the user interacts with your website, the frontend needs to communicate with your backend server. Wouldn't it be nice if you could focus on building your online pizza store without having to worry about how that data is passed from the frontend to the backend server over the Internet?

The protocol stack takes care of the network communication for us. An application (frontend) uses the Application Layer to communicate with another application (backend).

The application layer uses the "services" provided by the Transport Layer to transmit information across the network. Transport Layer also uses services provided by the Network Layer to fulfill its service agreement.

In this way, the higher layer uses the services provided by the lower layers to communicate with other applications over the network. The Physical Layer constitutes the wires which carry the electrical signal.

In essence, the protocol stack contains various layers, where each layer focuses on solving part of the bigger problem.

Protocols describe the solution to the sub-problems, which gives us the name protocol stack. Generally, protocols define the rules of communication between two entities such as,

- Types of messages, for example, request and response messages
- Syntax of various message types such as fields in the messages
- The semantics of fields, that is the meaning of information in fields
- Rules for determining when and how messages are sent and responded to

Let's dive deeper into the protocol stack, starting from the top.

---

## The Application Layer

Business applications use the Application Layer to communicate over a network. For example, placing an order on your online pizza store is done using the Application Layer. [HTTP](https://en.wikipedia.org/wiki/POST_(HTTP)) is one option to post the information on your backend server.

Application Layer Protocols define how applications running on different end systems pass messages to each other. In addition to the rules of communication (protocol), the applications also need a way to find each other, that is, to address each other. The address of an application is defined by:

1. [<VPIcon icon="fa-brands fa-wikipedia-w"/>IP Address](https://en.wikipedia.org/wiki/IP_address): numerical label assigned to an end system
2. [<VPIcon icon="fa-brands fa-wikipedia-w"/>Port Number](https://en.wikipedia.org/wiki/Port_(computer_networking)): an identifier that specifies the receiving process in the destination host. Port numbers are essential to account for multiple network applications running on a host. For example, [<VPIcon icon="fas fa-globe"/>two tabs in a web browser act as two different processes](https://superuser.com/questions/1055281/do-web-browsers-use-different-outgoing-ports-for-different-tabs).

The address of an application defines its identity on the network, and the protocol defines the rules for communication. Together, these form the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Socket](https://en.wikipedia.org/wiki/Network_socket) address (protocol type, IP address, port number).

A **socket** is an [<VPIcon icon="fa-brands fa-wikipedia-w"/>interface](https://en.wikipedia.org/wiki/Interface_(computing)) between the application layer and the transport layer. It acts as an entry point into the network, that is an application sends messages into and receives network messages through its Socket.

In summary, applications talk to each other using Application Layer protocols. The Application Layer relies on the services provided by the Transport Layer to pass data between end systems. Pair of IP address and port number identifies an application. The information flows from an application into the network through its Socket.

Let's look at an example of two applications communicating over the Internet using HTTP.

HTTP is a popular application layer protocol. The communication is between my web browser and an application server ([<VPIcon icon="fas fa-globe"/>ilovecookies.com](http://ilovecookies.com/)). When I enter this address in my web browser, it sends an HTTP request message to the application server.

![HTTP request message sent by my web browser to ilovecookies.com server](https://freecodecamp.org/news/content/images/2022/01/2-2.png)

A few things to notice about this request message:

- The type of request is GET
- The host it sends the message to is ilovecookies.com (human-readable version of IP addresses called [<VPIcon icon="fa-brands fa-wikipedia-w"/>hostnames](https://en.wikipedia.org/wiki/Hostname))
- The source machine accepts specific response formats, languages, and so on.

This structure is part of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#HTTP/1.1_request_messages) that defines communication rules between two applications. When the host application receives this message, it responds with a response message.

![HTTP response message received by my web browser from ilovecookies.com server that contains the HTML for generating the webpage](https://freecodecamp.org/news/content/images/2022/01/3-3.png)

We can observe that the response message contains protocol-specific data such as status code (200), content type, and so on and the HTML data (truncated to fit). The request-response pair constitutes the network communication between two applications that successfully lays out the webpage (ilovecookies.com) on my screen.

---

## The Transport Layer

Next, let's go one level down the protocol stack and understand how the transport layer helps network communication.

The transport layer provides [<VPIcon icon="fas fa-globe"/>logical](https://pcmag.com/encyclopedia/term/logical-vs-physical) communication between applications running on different hosts: from an applications' perspective, it's as if the two hosts are directly connected. Note that the communication provided by the transport layer is logical and not physical: there's no direct link or wire between the end hosts.

The transport layer converts the application messages into smaller chunks, encapsulates each piece in a transport message containing headers, and passes the chunk to the network layer.

The reason behind breaking down information into pieces is efficient network utilization. The Internet is so vast that several parallel paths transmit data between two end hosts.

For example, there are two possible paths to travel between New York and Stamford. The Internet is a slightly extreme version of this idea.

![Two alternative routes between New York and Stamford](https://freecodecamp.org/news/content/images/2022/01/4-1.png)

The relative ordering of packets is a natural question around chunking and efficient network utilization: the chunks need to be put back in the same order at the receiving host. The transport layer in the receiving host is responsible for the stitching of pieces back in the proper order.

The transport layer also needs some additional data relevant to its functions. For example, relative sequence numbers are added to the chunks to stitch back the application message.

Another example of transport layer-specific information is the port number. On the receiving host, the destination port number is helpful to route the message to the correct application.

The Internet makes available two transport layer protocols:

- User Datagram Protocol (UDP)
- Transmission Control Protocol (TCP)

The two protocols vary slightly in the transport services they provide to the application layer.

| **TCP** | **UDP** |
| :--- | :--- |
| Reliable data transfer | Unreliable data transfer |
| Lost or corrupted information is recovered by retransmission | No mechanisms to recover lost or corrupted data |
| Higher latency at the cost of reliable communication | Lower latency at the cost of unreliable communication |

The service requirements of an application govern what protocol you choose. For example, a payment system will need reliable communication (TCP), whereas a video streaming service might be okay with losing some information for faster streaming (UDP).

In summary, the transport layer splits the application messages into chunks and encapsulates them in messages containing transport layer-specific information. The pieces are put back in the correct order on the receiving system to recreate the message and passed to the appropriate application using the port number.

Let's continue the HTTP example communication between my web browser and application server.

![TCP packet encapsulating HTTP request message and headers](https://freecodecamp.org/news/content/images/2022/01/5-2.png)

You can observe the decoded bytes in the bottom right representing the HTTP GET request my browser makes for the application server. We see the HTTP request as a TCP payload field in this packet.

In addition, the packet is first in relative ordering with a sequence number of 1. It also contains the port number (65012) associated with the tab on my web browser and the destination port number ([<VPIcon icon="fa-brands fa-wikipedia-w"/>80](https://en.wikipedia.org/wiki/Port_(computer_networking)#Common_port_numbers)) on the application server.

![First (sequence number 1) and second (sequence number 1449 that starts at end of packet 1) TCP packets corresponding to HTTP response message received from ilovecookies.com server](https://freecodecamp.org/news/content/images/2024/08/sequence-1-and-1449.jpg)

The first two packets from the HTTP response (57 TCP packets) are displayed here. In the bottom right of both images, we can see the HTTP-specific information and some HTML corresponding to the webpage ilovecookies.com.

You can also see the transport layer-specific information such as the port numbers and the sequence numbers. Notice that the source and destination port numbers are flipped compared to the request message packets.

---

## The Network Layer

In contrast to the transport layer, the network layer provides logical communication between two end hosts. Note the subtle difference between the transport and network layer services.

![Left: logical communication provided by the transport layer, Right: logical communication provided by the network layer](https://freecodecamp.org/news/content/images/2024/08/network-layer-hosts.jpg)

The network layer takes a transport packet from the transport layer and encapsulates it in a network packet. The encapsulation is helpful to add information specific to the functioning of network layer protocol.

The network layer provides a [<VPIcon icon="fa-brands fa-wikipedia-w"/>best-effort service](https://en.wikipedia.org/wiki/Best-effort_delivery) (timing, relative ordering, eventual delivery are not guaranteed) to move data between two hosts. The best-effort service is the motivation behind TCP. As the network layer protocols are inherently unreliable, TCP contains additional logic to ensure reliable data transfer.

The network layer is responsible for moving packets from a sending host to a receiving host. In addition to the end hosts, the network layer protocols also run on **Routers**, part of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>network core](https://en.wikipedia.org/wiki/Backbone_network). Routers are packet switching devices that are responsible for forwarding packets.

![Left: packet switching device, Right: a small network consisting of 3 end hosts and 1 router connecting them together](https://freecodecamp.org/news/content/images/2024/08/packet-switching-and-small-network.jpg)

Suppose end host 1 wants to send a packet to end host 2. End host 1 passes the packet to the router. The router looks at the information in the network packet and figures out that it needs to forward the packet on link 2, to which end host 2 is connected.

Every router has a forwarding table stored in RAM ([<VPIcon icon="fa-brands fa-wikipedia-w"/>built dynamically](https://en.wikipedia.org/wiki/Routing_protocol)) to resolve the correct forwarding link for the packet. For example, the routing table for the above setup will look like this:

| Address | Link |
| :--- | :--- |
| 192.168.1.1 | Link 1 |
| 168.134.1.1 | Link 2 |
| 172.158.1.2 | Link 3 |

Routers use the information (destination host address) from the network packet to index ([<VPIcon icon="fa-brands fa-wikipedia-w"/>bitwise XOR](https://en.wikipedia.org/wiki/Exclusive_or#Truth_table)) into this table. You can see the routing table on your computer by running the following commands:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
netstat -nrf inet
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
netstat -nr
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
Get-NetRoute -AddressFamily IPv4
```

:::

Notice a particular entry in your routing table, default or 0.0.0.0, called the [<VPIcon icon="fa-brands fa-wikipedia-w"/>default gateway](https://en.wikipedia.org/wiki/Default_gateway). A packet is routed to the default gateway if none of the entries match the destination address.

The Internet contains tons of such devices which forward packets to enable logical communication between two end hosts.

As everyone shares the routers and wires carrying the data on the Internet, routers contain queues that hold incoming packets as outgoing packets are processed (/forwarded) by the router. Unreliability is introduced in the network layer protocols if the queues are full, which can get packed as the traffic increases.

The Internet network protocol is called Internet Protocol (IP). The major components of the Internet network layer are,

1. [<VPIcon icon="fa-brands fa-wikipedia-w"/>IP](https://en.wikipedia.org/wiki/Internet_Protocol): defines addressing conventions (IPv4, IPv6), packet format, packet handling convention
2. [<VPIcon icon="fa-brands fa-wikipedia-w"/>Routing protocols](https://en.wikipedia.org/wiki/Routing_protocol): determine the path a packet takes from source to host
3. [<VPIcon icon="fa-brands fa-wikipedia-w"/>ICMP](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol): facility to report errors in packets and respond to requests for certain network layer information

In summary, the network layer provides logical communication between two end hosts. Network layer protocols run on end hosts and network core devices such as routers. Routers forward network packets, which help form the logical communication between two end hosts.

Let's continue with our example of communication with ilovecookies.com.

We have seen that my web browser creates an HTTP request message (application layer protocol) and passes it down to the transport layer, which uses TCP protocol for end-to-end communication between my web browser application and a server application (ilovecookies.com).

![An IP packet encapsulates a TCP packet](https://freecodecamp.org/news/content/images/2022/01/12.png)

We can see that the network packet encapsulates the TCP packet, which encapsulates the application packet. The green highlighted text represents the contents of the network packet, yellow the transport packet, and the remaining text starting at GET is the application packet.

The network packet fields are relevant to its functioning. For example, the source address is my machines' IP address, and the destination address is the ilovecookies.com [<VPIcon icon="fas fa-globe"/>server address](https://mxtoolbox.com/SuperTool.aspx?action=a%3ailovecookies.com&run=toolpage).

The encapsulation and the layer-specific information contained in the packets also relate to the idea of logical communication between hosts and applications running on them.

For instance, the network packet includes the IP addresses of the end machines, whereas the transport packet only contains the port numbers. The transport layer relies on the network layer to move data between the end machines. Once the data reaches the receiving device, the transport layer takes over and routes the packet to the correct application using the port numbers contained in the transport packet.

---

## The Link Layer

Compared to the layers we have seen so far, the link layer has a narrower scope: it provides services to move packets over the individual links in the end-to-end path.

For example, links are the red dotted lines (see above illustrations). The link-layer enables the node-to-node movement of network layer packets over a single link in the path.

A link-layer protocol defines:

- format of packets exchanged between nodes at ends of the link
- actions taken on packets by those nodes

[<VPIcon icon="fa-brands fa-wikipedia-w"/>A network adapter](https://en.wikipedia.org/wiki/Adapter_(computing)#Network_adapter) implements the link layer protocols. Network adapter constitutes the physical hardware that enables a computer to connect to a network and exchange information.

Try running this command to see the list of network adapters in your computer:

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
networksetup -listallhardwareports
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
lshw -class network -short
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
Get-NetAdapter -Name *
```

:::

In the output, you will notice that each device has a link-layer address known as the MAC address. The adapters' [<VPIcon icon="fa-brands fa-wikipedia-w"/>ROM](https://en.wikipedia.org/wiki/Read-only_memory) contains MAC addresses assigned at the time of manufacture that are considered permanent. Each node (hosts and routers) has a link-layer address along the path.

Earlier we talked about IP address, which are also an identifier for the devices. The situation is similar to having multiple identifiers: home address and social security number. There are several reasons why nodes have MAC addresses and network-layer addresses.

- The protocols in different layers are supposed to be substitutable. For example, [<VPIcon icon="fa-brands fa-wikipedia-w"/>IPX](https://en.wikipedia.org/wiki/IPX/SPX) doesn't use a network layer address.
- IP addresses are stored in RAM and [<VPIcon icon="fa-brands fa-wikipedia-w"/>reconfigured every time the adapter is moved or powered up](https://en.wikipedia.org/wiki/IPX/SPX), that is, temporary.
- Suppose the protocol omits MAC addresses. The adapter would need to pass each packet it receives up the protocol stack. The network layer would check for an IP address match. But, this can be inefficient if done too many times: [<VPIcon icon="fa-brands fa-wikipedia-w"/>Interrupts](https://en.wikipedia.org/wiki/Interrupt) help pass packets which can be [<VPIcon icon="fa-brands fa-wikipedia-w"/>expensive](https://en.wikipedia.org/wiki/Interrupt#Performance).

In summary, for the layers to be largely independent building blocks in network architecture, many layers need to have their addressing scheme.

As a quick recap, we have come across three types of address until now:

- Hostnames for the application layer (ilovecookies.com). These are converted into corresponding IP addresses using [<VPIcon icon="fa-brands fa-wikipedia-w"/>DNS](https://en.wikipedia.org/wiki/Domain_Name_System).
- The IP address for the network layer
- MAC address for the link layer

Like the Domain Name System, which helps resolve IP addresses from hostnames, Address Resolution Protocol ([<VPIcon icon="fa-brands fa-wikipedia-w"/>ARP](https://en.wikipedia.org/wiki/Address_Resolution_Protocol)) is useful for determining (destination) MAC addresses from an IP address.

ARP builds a table in RAM which contains a mapping of IP address to MAC address. The protocol includes specifications (such as [<VPIcon icon="fa-brands fa-wikipedia-w"/>a particular packet](https://en.wikipedia.org/wiki/Address_Resolution_Protocol#Packet_structure)) for creating this table automatically.

The network layer passes the packet and MAC address (from the ARP table) of the destination node to the link layer. The link-layer encapsulates the packet in a link-layer packet and moves it along the link to the destination node.

![A network containing two hosts and one router](https://freecodecamp.org/news/content/images/2022/01/13-1.png)

Suppose in the above setup the host 222.222.222.220 wants to send a packet to the other host 222.222.222.222. The network layer uses ARP to resolve the corresponding MAC address as 49-BD-D2-C7-56-A2 and passes the packet and MAC address to the link layer. The link layer moves the packet over the link between the two hosts.

Next, consider a more complex scenario where a host wants to send a packet to another host on a different network. For example, a packet from my computer to ilovecookies.com travels from my [<VPIcon icon="fa-brands fa-wikipedia-w"/>home network](https://en.wikipedia.org/wiki/Home_network#Infrastructure_devices) to another network.

![A router connecting two subnets. The router contains two adapters for linking and two IP addresses, identifying it on each subnet](https://freecodecamp.org/news/content/images/2022/01/14-1.png)

There are two things to notice about this picture. First, the router has two IP addresses. As the router participates in two different networks, it requires two IP addresses to identify it in the respective network. For more details, see [<VPIcon icon="fas fa-globe"/>this](https://askleo.com/your-routers-two-ip-addresses/).

Second, the two separate networks are known as [<VPIcon icon="fa-brands fa-wikipedia-w"/>subnets](https://en.wikipedia.org/wiki/Subnetwork). A subnet is a logical grouping of network devices that makes network device management more accessible.

Suppose in this setup the host 222.222.222.222 wants to send a packet to the host 111.111.111.111, which involves making a cross-network trip. It will not locate the destination host (111.111.111.111) in its subnet, and it forwards the packet to the default gateway (router).

The network layer uses the ARP table to resolve the MAC address as 88-B2-2F-54-1A-0F. The router uses its routing table to deliver the packet to the link connecting to the other subnet. Once again, the ARP table helps resolve the MAC address of the destination host, and the packet moves along the link.

In summary, the adapter part of your computer hardware implements the link layer protocols. The link-layer protocol defines an addressing scheme called MAC addresses, and the ARP is used to map IP addresses to MAC addresses. The link-layer encapsulates network layer packets and moves them over a link.

One of the popular link layer protocols is [Ethernet](https://en.wikipedia.org/wiki/Ethernet). Let's continue our example (ilovecookies.com) to examine the Ethernet protocol in action.

![An Ethernet packet encapsulating an IP packet](https://freecodecamp.org/news/content/images/2022/01/15-1.png)

We can observe the Ethernet packet contains destination and source MAC addresses (omitted), and it encapsulates the IP packet.

---

## Recap

Let's summarize what we saw in this article using the picture below.

![End to end network communication between host A and host B](https://freecodecamp.org/news/content/images/2022/01/16.png)

Computer applications running on two different systems (called hosts) communicate using protocols.

Protocols are rules which govern the communication between two hosts. The protocol stack solves multiple sub-problems to solve the problem of network communication. Each layer focuses on solving a sub-problem using the services offered by the lower layers in the abstraction hierarchy.

The application layer protocols work at the highest level of abstraction. An application communicates by sending messages that adhere to the rules of an application protocol (for example HTTP).

DNS is used to map hostname (www.ilovecookies.com) to an IP address. These messages are pushed through the socket interface to be transmitted over the network using the transport layer.

The transport layer exposes a logical communication between two applications running on different hosts. It breaks down application messages into smaller pieces and encapsulates them in packets containing extra information ([<VPIcon icon="fa-brands fa-wikipedia-w"/>headers](https://en.wikipedia.org/wiki/Header_(computing))).

The application message is created from these packets and pushed through the socket interface using the port number on the packet. These packets are sent over the network by relying on the network layer.

Next, the network layer takes over, providing logical communication between two hosts. It also encapsulates the transport packet in a network packet.

The Internet contains packet switching devices that forward network packets, using routing tables stored in RAM and built dynamically using routing protocols. The network layer relies on the link layer to move packets.

Link-layer is responsible for moving packets over individual links. Hardware devices, called adapters, implement link-layer protocols and have a permanent address associated with them, called MAC address. MAC address serves as the identifier for this layer. The Address Resolution Protocol (ARP) maps IP addresses to MAC addresses.

Finally, the link layer passes packets to the physical layer, which constitutes the wires over which the information travels.

Thank you for reading! I hope you learned something new about computer networks today.

::: info Sources

```component VPCard
{
  "title": "Create new possibilities with Pearson. Start learning today.",
  "desc": "Search",
  "link": "https://pearson.com/en-us/search/view-all/search.html/",
  "logo": "https://pearson.com/content/dam/global/shared/brand/evolution/favicons/favicon-dark.svg",
  "background": "rgba(13,0,77,0.2)"
}
```

<SiteInfo
  name="Wireshark • undefined"
  desc="Wireshark: The world's most popular network protocol analyzer"
  url="https://wireshark.org"
  logo="https://wireshark.org/favicon.ico"
  preview="https://wireshark.org/assets/img/wireshark-logo-big.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Computer Networking Tutorial - How Network Applications Talk Over the Internet",
  "desc": "By Sahil Gupta Network applications are computer applications that participate in a computer network. These applications talk to each other by plugging into the network.  For example, when you visit google.com, your browser acts as a network applicat...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/computer-networking-how-applications-talk-over-the-internet.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
