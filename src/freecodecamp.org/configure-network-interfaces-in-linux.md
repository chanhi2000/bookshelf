---
lang: en-US
title: "How to Configure Network Interfaces in Linux"
description: "Article(s) > How to Configure Network Interfaces in Linux"
icon: fa-brands fa-linux
category:
  - DevOps
  - Linux
  - Debian
  - Fedora
  - Shell
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - debian
  - fedora
  - sh
  - shell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Configure Network Interfaces in Linux"
    - property: og:description
      content: "How to Configure Network Interfaces in Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/configure-network-interfaces-in-linux.html
prev: /devops/linux-debian/articles/README.md
date: 2025-06-17
isOriginal: false
author:
  - name: Eti Ijeoma
    url : https://freecodecamp.org/news/author/Omah/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750110739161/ebf2347c-ac63-4fab-ad2f-5d9229e77eaa.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debain > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Fedora > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Configure Network Interfaces in Linux"
  desc="Networking is an essential part of any Linux system. Proper networking allows communication between devices and the internet. Understanding the network interface is vital when setting up servers, solving connectivity issues, and managing device traff..."
  url="https://freecodecamp.org/news/configure-network-interfaces-in-linux"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750110739161/ebf2347c-ac63-4fab-ad2f-5d9229e77eaa.png"/>

Networking is an essential part of any Linux system. Proper networking allows communication between devices and the internet. Understanding the network interface is vital when setting up servers, solving connectivity issues, and managing device traffic flow.

A common problem faced in networking is losing connectivity after modifying the network settings, which leads to an inability to access the system. This usually happens due to a misconfigured IP address, incorrect settings, and a poor understanding of network interface configurations.

In this article, we’ll guide you through understanding these network interface configurations, setting up and managing network interfaces on Linux, checking available interfaces, configuring static and dynamic IP addresses, and best practices to consider when setting up network interfaces. At the end of this article, you’ll have a solid foundation in network interfaces.

---

## What are Network Interfaces?

A network interface is a connection point within the Linux system that allows communication with other devices within the network**.** It is how the Linux kernel links the software side of the network with the hardware side. Linux systems provide many network interfaces that help to facilitate communication between the system and other external networks.

Linux network interfaces are essential for troubleshooting, configuration, management, and optimization of networking tasks. Understanding what they are and how they work allows you to optimize your server networking and security.

---

## Types of Network Interfaces in Linux

Network interfaces can be classified into two main categories: physical and virtual network interfaces.

### Physical Network Interfaces

Physical network adapters are the hardware components of the network interface that connect the system to a physical network. These physical networks include Wi-Fi and Ethernet. These adapters, commonly called Network Interface Cards (NIC), can be identified by their device names, such as wlan0 and eth0. They include the following:

1. **Ethernet Interface (eth0, eth1, and so on)**<br/>Ethernet interface is used for wired connections via an Ethernet card and helps configure high-speed networking. It can be used in data centres and servers.
2. **Wi-Fi interface (wlan0, wlan1, and so on)**<br/>This represents a wireless network adapter, and it enables wireless connectivity via Wi-Fi networks to the servers.

### Virtual Network Interfaces

Virtual network interfaces are software-based interfaces managed by the Linux operating system. They integrate network virtualization technologies like Docker or KVM. There are several virtual network interfaces, and the most common ones include:

- **Loopback interface**: This is a special interface that allows a system to communicate internally. It is permanently assigned the IP address 127.0.0.1, referred to as the `localhost`.
- **Bridge Interface**: They are used to connect multiple network interfaces. It is useful for virtualization environments (for example, Linux KVM, Docker networking).
- **Tunnel Interface**: This is used for VPNs and networking tunnels. It helps to facilitate the passage of encrypted network traffic.

---

## Why Network Interfaces Matter

Network interfaces form an essential component of a Linux system. It enables communication between devices and the internet, and properly configuring these interfaces provides the following benefits:

**Seamless connectivity**: Network interfaces allow devices to communicate over local networks and the internet, enabling proper data exchange between servers and networks.

**Proper network management**: Administrators can configure network interfaces by creating, managing, and assigning static or dynamic IPs and optimizing traffic flow.

**Improved security**: Administrators can configure network interfaces with firewalls and VPNs to secure data and prevent unauthorized access.

**It provides support for virtualization and containerization**: Virtual network interfaces provide proper communication between virtual machines, Docker containers, and other physical servers. This makes them essential for creating and managing DevOps environments.

---

## How to List Network Interfaces in Linux

You can check the available network interfaces within the Linux environment using the following commands.

### 1. Using the `ip` command

To list all network interfaces and their status, you can use the `ip link show` command. It displays details about the network interfaces, like the name, status, and MAC address.

### 2. Using the `ifconfig` command

To list all network interfaces, use this command: `ifconfig -a`. The command also displays details about the network interfaces and their current state.

### 3. Using [<FontIcon icon="fas fa-globe"/>`nmcli`](https://networkmanager.dev/docs/api/latest/nmcli.html) for NetworkManager-controlled systems

To check the status of all network interfaces managed by NetworkManager, run:

```sh
nmcli device status
```

### 4. Using the <FontIcon icon="fas fa-folder-open"/>`/sys/class/net/` directory

To list all network interfaces, run `ls /sys/class/net/` This command is useful for scripting and automation because it provides a reliable way to check available interfaces programmatically.

---

## How to Configure Network Interfaces in Linux

Network interface configuration is essential for managing Linux servers and workstations. Understanding this configuration will help ensure smooth connectivity within your systems. This section will give you the correct information on configuring network interfaces.

### Assign a Static IP Address

A static IP address ensures the device maintains the same IP after each reboot. This is particularly useful for servers and devices that need consistent addressing. To assign a static IP address, the NetworkManager Command Line Interface (**nmcli**) provides a command-line utility to configure the network interface as shown below.

```sh
nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24   # set a static IPv4 address and subnet mask

nmcli connection modify eth0 ipv4.gateway 192.168.1.1          # define the default gateway

nmcli connection modify eth0 ipv4.dns "8.8.8.8 8.8.4.4"        # configure primary and secondary DNS servers

nmcli connection modify eth0 ipv4.method manual                # switch the interface from DHCP to manual mode

nmcli connection up eth0                                       # bring the interface down and up to apply changes
```

These commands set a fixed IP, gateway, and DNS on eth0, switch the interface to manual mode, and restart it so the new settings take effect. The settings persist across reboots because they are stored by `NetworkManager`

### Assign a Temporary IP Address

The `ip` command lets you configure interfaces dynamically (not persistent across reboots):

```sh
ip addr add 192.168.1.100/24 dev eth0     # assign 192.168.1.100/24 to interface eth0 (temporary)

ip route add default via 192.168.1.1      # set the default gateway to 192.168.1.1
```

These two commands give eth0 the IP `192.168.1.100/24` and point all outbound traffic to the gateway `192.168.1.1`. The settings last only until the next reboot or interface reset.

### Assign an IP Address with ifconfig (deprecated)

Older systems still ship with `ifconfig` and `route`. These commands are also temporary.

```sh
ifconfig eth0 192.168.1.100 netmask 255.255.255.0 up  # assign 192.168.1.100/24 to eth0 and bring it up

route add default gw 192.168.1.1 eth0                # set the default gateway to 192.168.1.1 via eth0
```

::: note

Prefer `ip` or `nmcli` on modern systems.

:::

### Enable DHCP with nmcli

A DHCP-assigned address lets the network hand out an IP address automatically.

```sh
nmcli connection modify eth0 ipv4.method auto   # switch eth0 to use DHCP for automatic addressing

nmcli connection up eth0                        # restart the connection so the new DHCP setting takes effect
```

To renew or request a lease directly:

```sh
dhclient eth0   # manually request or renew an IP address via DHCP on interface eth0
```

These commands set eth0 to use DHCP, restart the link so the change takes effect, and (optionally) trigger an instant lease renewal.

### Assign Multiple IP Addresses to One Interface

A network interface can have multiple addresses assigned to it, making it applicable to host multiple services on a single interface.

#### Using IP command (Temporary Assignment)

```sh
ip addr add 192.168.1.101/24 dev eth0   # add an extra IPv4 address to eth0 (temporary)

ip addr add 2001:db8::1/64 dev eth0     # add an IPv6 address to eth0 (temporary)
```

These two commands attach an extra IPv4 and an IPv6 address to eth0 until the interface resets or the system reboots

#### Persistent Configuration (Netplan)

Edit the <FontIcon icon="fas fa-folder-open"/>`/etc/netplan/`<FontIcon icon="iconfont icon-yaml"/>`01-netcfg.yaml` file:

```yaml title="/etc/netplan/01-netcfg.yaml"
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses:
        - 192.168.1.100/24
        - 192.168.1.101/24
        - 2001:db8::1/64
```

After editing the file, run `sudo netplan apply` to make the additional addresses stick across reboots.

---

## How to Set Up a Network Bridge in Linux

A network bridge allows multiple interfaces to act as a single network segment, which is useful in virtualization (KVM, Docker).

### Using `brctl` (bridge-utils package)

```sh
brctl addbr br0                       # create a new bridge interface named br0

brctl addif br0 eth0                  # add physical interface eth0 to the bridge

ip addr add 192.168.1.100/24 dev br0  # assign an IP address to the bridge, not to eth0

ip link set br0 up                    # bring the bridge interface online
```

These commands create bridge br0, attach eth0 to it, give the bridge its own IP, and bring it online.

### Using nmcli (for NetworkManager-managed systems)

```sh
nmcli connection add type bridge ifname br0                       # create a new bridge named br0

nmcli connection modify br0 bridge.stp no                         # turn off Spanning Tree Protocol

nmcli connection add type bridge-slave ifname eth0 master br0     # attach physical interface eth0 to br0

nmcli connection up br0                                           # bring the bridge online so settings take effect
```

This sequence builds the same bridge through NetworkManager, disables [<FontIcon icon="fa-brands fa-wikipedia-w"/>STP](https://en.wikipedia.org/wiki/Spanning_Tree_Protocol) for faster convergence, links eth0 as a slave, and activates the bridge so guests can reach the network.

---

## Best Practices for Configuring Network Interfaces in Linux

### Make Your Configurations Persistent

One of the mistakes network engineers make in Linux networking is making changes that do not persist after rebooting. While specific commands can modify the network settings temporarily, they do not save these changes permanently.

To ensure that these network settings survive server reboots, modify system configuration files such as <FontIcon icon="fas fa-folder-open"/>`/etc/network/`<FontIcon icon="fas fa-file-lines"/>`interfaces`. Once you ensure that all changes are persistent, there will be no unexpected disruptions when a system restarts.

### Assign Static IPs for Servers

Static IP addresses are the best for servers and critical infrastructure. Unlike DHCP addresses, which can change over time, static IP addresses are more stable and reliable. For services like web hosting and database management, static IPs play a key role, as IP addresses do not need to change.

### Secure Your Network Interfaces

Network interfaces are the entry points into a system, so if they are misconfigured, they could pose a considerable security risk. To reduce attacks, administrators should turn off all unused network interfaces by modifying the configuration file to prevent automatic activation. Additionally, you should use firewall tools to control the traffic that tries to reach the system.

### Monitor Your Network Interfaces

As a system administrator, monitoring network interfaces helps prevent downtime and ensure proper network reliability. You can check the status of your network interfaces by running commands like `link show` or `if-config -a`. You can also monitor them in real time using tools like Netstat. Monitoring your systems ensures that network issues are detected early enough, reducing downtime and improving network stability.

### Constantly Update Network Packages

You must constantly update network management tools and drivers because it helps to implement security patches and other performance improvements, as outdated network packages can cause security vulnerabilities. There are specific network-related packages such as `network-manager`, `bridge-utils` and `iproute2`.

---

## Conclusion

Setting up network interfaces in Linux is a fundamental skill every system administrator should have. Whether configuring static IP addresses or enabling DHCP, understanding these concepts will ensure that your systems are stable and have proper connectivity. Implementing best practices like monitoring traffic and securing the network interface gives you the best results. As you continue working with Linux, you can experiment with different configurations to deepen your understanding of network interfaces.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Configure Network Interfaces in Linux",
  "desc": "Networking is an essential part of any Linux system. Proper networking allows communication between devices and the internet. Understanding the network interface is vital when setting up servers, solving connectivity issues, and managing device traff...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/configure-network-interfaces-in-linux.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
