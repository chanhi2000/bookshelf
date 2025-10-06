---
lang: en-US
title: "How DNS Works: A Guide to Understanding the Internet's Address Book"
description: "Article(s) > How DNS Works: A Guide to Understanding the Internet's Address Book"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - computer
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How DNS Works: A Guide to Understanding the Internet's Address Book"
    - property: og:description
      content: "How DNS Works: A Guide to Understanding the Internet's Address Book"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-dns-works-the-internets-address-book.html
prev: /academics/coen/articles/README.md
date: 2025-05-15
isOriginal: false
author:
  - name: Dhruv Prajapati
    url : https://freecodecamp.org/news/author/dhruv-007/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747235471002/8fbe4d7e-f1cb-4faf-a6a5-8dcaf38d58f3.png
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
  name="How DNS Works: A Guide to Understanding the Internet's Address Book"
  desc="The Domain Name System (DNS) translates domain names (like example.com) into IP addresses (like 192.0.2.1) so we can easily access websites. In this guide, you’ll learn how DNS resolution starts, its step-by-step process, how caching works, and the r..."
  url="https://freecodecamp.org/news/how-dns-works-the-internets-address-book"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235471002/8fbe4d7e-f1cb-4faf-a6a5-8dcaf38d58f3.png"/>

The Domain Name System (DNS) translates domain names (like `example.com`) into IP addresses (like `192.0.2.1`) so we can easily access websites. In this guide, you’ll learn how DNS resolution starts, its step-by-step process, how caching works, and the role of root, TLD, and authoritative name servers.

---

## The DNS Resolution Process

When you type a domain name like `example.com` into your browser, it loads the website almost instantly. So how does it do this?

Well, DNS resolution makes it happen, acting like the internet’s GPS to turn that name into an IP address (such as `192.0.2.1`) that computers use to find servers.

DNS resolution works by sending a query through a chain of DNS servers, each one helping to pinpoint the exact address. This process starts with a crucial step: your device needs to know which DNS server to contact first, either one set automatically or one chosen for speed and reliability.

---

## Finding the First DNS Server: Defaults, DHCP, and Manual Settings

For DNS to function, a device must know the IP address of at least one DNS server. This is achieved through **preconfigured settings**, **automatic configuration via DHCP**, and **manual configuration**.

Devices like routers, smartphones, and computers often ship with hardcoded DNS server IPs. Common examples include Google Public DNS (`8.8.8.8`, `8.8.4.4`) and Cloudflare DNS (`1.1.1.1`). These serve as default starting points for DNS queries.

Also, when a device connects to a network (for example, home Wi-Fi), a Dynamic Host Configuration Protocol (DHCP) server - typically on the router - assigns an IP address and DNS server addresses. These are often provided by the Internet Service Provider (ISP), such as Comcast’s `75.75.75.75`, but can be overridden with alternatives like OpenDNS (`208.67.222.222`) or Quad9 (`9.9.9.9`).

Advanced users can manually specify DNS servers. Public DNS providers use memorable IP addresses for simplicity, such as Google’s `8.8.8.8` (repeating digits), Cloudflare’s `1.1.1.1` (short sequence), or Quad9’s `9.9.9.9` (repeating digits).

This design ensures seamless operation for most users, with DHCP and default configurations, while allowing power users to choose faster or privacy-focused DNS services.

---

## How DNS Resolution Powers Your Application’s Network Requests

When an application, like a web browser or a backend service, wants to make a network call - such as an HTTP request to load a webpage, a gRPC call for microservice communication, or an API fetch to retrieve data - it triggers a series of checks and queries to translate a domain name into an IP address. This process is designed for efficiency, leveraging caches and a distributed network of servers to handle the internet’s massive scale.

### 1. Valid IP Check

The process begins by checking if the destination address is already a valid IP address, like `192.168.1.1`. The system uses a regex check to confirm this. If it’s a valid IP, no DNS resolution is needed, and the network call proceeds directly.

::: note

In rare cases, DNS resolution is skipped entirely if an IP address is used directly. For example, a user might manually type an IP, like 192.0.2.1, into a browser instead of a domain name, though this is unlikely since IP addresses are hard to remember compared to names like example.com.

:::

Similarly, some applications make network calls using IP addresses directly, bypassing the need for DNS. While possible, these scenarios are uncommon due to the convenience of human-readable domain names.

### 2. Application Cache Lookup

If the destination address is a domain name, such as `example.com`, the application checks its own DNS cache, if it has one.

Modern browsers like Chrome and Firefox maintain built-in caches to speed up browsing. If the domain-to-IP mapping is found here, the process stops, and the IP is used for the network call.

### 3. Operating System Cache Check

If the application cache lacks the mapping or the application doesn’t have a caching mechanism at all, the request moves to the operating system’s DNS client, also known as the Local Resolver.

This varies by OS:

- Windows uses [<VPIcon icon="fa-brands fa-windows"/>dnscache](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/dn593685\(v=ws.11\))
- macOS uses [<VPIcon icon="iconfont icon-macos"/>mDNSResponder](https://manp.gs/mac/8/mDNSResponder)
- Linux uses the [<VPIcon icon="fa-brands fa-linux"/>Name Switch Service](https://man7.org/linux/man-pages/man5/nsswitch.conf.5.html)

The DNS client checks two places: the OS-level DNS cache, which stores recent domain-to-IP mappings, and the hosts file, a local file that manually maps domains to IPs (for example, `127.0.0.1 localhost`). If the mapping is found in either place, the process stops here.

### 4. Forwarding to Configured DNS Server

If the mapping remains unresolved, the DNS client sends the query to a configured DNS server, such as the ISP’s server or a public one like Google DNS (`8.8.8.8`) or Cloudflare DNS (`1.1.1.1`). This server is a complex system with its own caches and a Recursive Resolver Service, like [<VPIcon icon="fas fa-globe"/>BIND](https://isc.org/bind/) or [<VPIcon icon="fas fa-globe"/>Unbound](https://nlnetlabs.nl/projects/unbound/about/#:~:text=Unbound%20is%20a%20validating%2C%20recursive%2C%20caching%20DNS%20resolver.,DNS-over-HTTPS%20which%20allows%20clients%20to%20encrypt%20their%20communication.), which takes over the query.

#### Caching techniques

Caching, especially in recursive resolvers, stores query results to minimize redundant lookups and speed up responses for users:

- **Recursive resolver cache**: Stores query results from root, TLD, and authoritative name servers in recursive resolvers to speed up responses.
- **Negative cache**: Stores responses for non-existent domains or records to avoid repeated queries.
- **Forwarded query cache**: Stores responses from queries forwarded to other resolvers or DNS servers to enhance performance.

These caching mechanisms minimize external lookups ([<VPIcon icon="fas fa-globe"/>RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)).

### 5. Recursive Resolution Across Servers

The recursive resolver, a core component of a DNS server, is responsible for performing recursive resolution to translate domain names like `example.com` into IP addresses.

As DNS records are distributed across multiple servers, the resolver parses the domain and executes a series of queries:

1. It contacts a root name server, which directs it to the top-level domain (TLD) server (for example, for .com).
2. The TLD server points to the authoritative name server for the specific domain.
3. The authoritative server provides the final IP address.

This distributed approach ensures scalability and reliability ([<VPIcon icon="fas fa-globe"/>RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)).

---

## Understanding the Role of the Recursive Resolver

The recursive resolver is the engine behind DNS resolution, working to convert a domain name like example.com into an IP address. Its journey begins by querying a root name server, the first step in navigating the DNS hierarchy to find the correct address.

### Recursive Resolver and Root Name Server Interaction

To understand this interaction, let’s first explore what root name servers are and their role in DNS.

#### Exploring Root Name Servers

Root name servers form the foundation of the DNS hierarchy, responding to queries for top-level domain (TLD) records to initiate resolution. They direct recursive resolvers to TLD servers, enabling the lookup of domain IP addresses.

- There are **13 root server clusters**, named a.root-servers.net to m.root-servers.net, operated by 12 organizations (VeriSign manages two). These clusters distribute global DNS query loads. As of May 10, 2025, 1,936 anycast instances ensure high availability and scalability, handling billions of daily queries (Root Server Technical Operations Association).
- Each cluster uses **anycast routing**, sharing a single IP address across multiple global servers. Queries are routed to the nearest or least-loaded instance, reducing latency, enhancing reliability, and providing redundancy if a server fails.
- The **root hints file**, provided by ICANN ([<VPIcon icon="fas fa-globe"/>IANA](https://iana.org/domains/root/files)), lists root server IP addresses and is preloaded in resolvers. It enables initial DNS queries without needing to resolve root server domains, preventing circular dependencies and ensuring system stability.

The DNS began with just two root name servers in 1983. As the internet grew, more servers were added to meet demand. By 2002, the number reached 13, and anycast routing was proposed, allowing multiple servers to operate as a single cluster under one IP address.

Since then, the DNS has scaled by expanding these 13 clusters to handle global requirements ([<VPIcon icon="fas fa-globe"/>RFC 882](https://datatracker.ietf.org/doc/html/rfc882), [<VPIcon icon="fas fa-globe"/>Netnod](https://netnod.se/)). For a detailed history, see the [<VPIcon icon="fas fa-globe"/>DNS Institute’s archive](https://dnsinstitute.com/dns-history/dns-root-hints-history/) and [<VPIcon icon="fas fa-globe"/>History of ROOT-SERVERS](https://icannwiki.org/History_of_ROOT-SERVERS)..

#### How Recursive Resolvers Query Root Name Servers

The recursive resolver initiates resolution by querying a root name server for TLD records, relying on several mechanisms to ensure accuracy and efficiency.

- It uses the **root hints file**, ICANN’s list of root server IP addresses hardcoded in resolvers (for example, BIND), to avoid circular dependencies.

- **Priming queries** fetch updated root server IPs on resolver startup or cache expiry, ensuring reliability (RFC 8109).
- The **root zone file**, ICANN’s database of TLDs and their name servers, is used by root servers to respond with TLD details ([<VPIcon icon="fas fa-globe"/>IANA](https://iana.org/domains/root/files)).

When querying, the resolver selects a root server and requests TLD records (for example, for `.com`). The response includes **NS** records (for example, `a.gtld-servers.net` for `.com`) and **glue records**, which are IP address records (**A** or **AAAA**) providing the TLD name servers’ IPs directly.

Glue records are critical when the requested name servers’ domains are within the queried domain (for example, `ns1.example.com` for `example.com`), preventing circular dependency by supplying the IP without resolving the domain.

For TLD queries, glue records are always included, speeding up resolution by avoiding additional lookups for TLD name server domains like `a.gtld-servers.net`, especially for busy TLDs like `.com` ([<VPIcon icon="fas fa-globe"/>RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)).

### Recursive Resolver and TLD Server Interaction

Once the recursive resolver receives the root server’s response, including glue records, it queries a TLD name server (for example, `a.gtld-servers.net` for `.com`). TLD name servers maintain **zone files** listing domains under their TLD (for example, `example.com`) and their name servers.

The TLD server responds with a referral, providing the authoritative name server records (for example, `ns1.example.com` for `example.com`). If the authoritative server’s domain is within the requested domain (for example, `ns1.example.com`), glue records are included to provide the IP directly, preventing circular dependency.

The resolver caches the response based on its TTL to speed up future queries. If the TLD server is unreachable, the resolver tries another TLD server from the root’s response ([RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)).

### Recursive Resolver and Authoritative Name Server Interaction

- The recursive resolver then queries the authoritative name server (for example, `ns1.example.com`), which maintains zone files with DNS records like **A**, **CNAME**, or **MX** for its domain (for example, `example.com`).
- The server returns the requested record, such as an A record (for example, `192.0.2.1`), AAAA, CNAME, or MX, depending on the query.
- Glue records from the TLD response provide the server’s IP if within the domain, avoiding circular dependency.
- The resolver caches the response based on TTL for efficiency. In rare cases, the server may delegate to another authoritative server (for example, for subdomains), requiring further queries. If unreachable, the resolver tries another authoritative server ([<VPIcon icon="fas fa-globe"/>RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)).

Traditionally, zone files for Root, TLD, and Authoritative name servers were text files listing domains and their DNS records, guiding queries across the DNS hierarchy.

Modern DNS infrastructure has replaced these with efficient databases or in-memory databases, using optimized data structures like hash tables or tries for faster lookups and scalability. This shift supports the growing number of TLDs and high query volumes across all server types.

Similarly, the anycast routing proposal, introduced to enhance speed and reliability by distributing server instances globally, was designed for all name servers - Root, TLD, and Authoritative.

While root name servers universally adopt anycast, ensuring low latency and redundancy, not all TLD and authoritative name servers strictly follow it.

Some TLDs and smaller authoritative servers rely on unicast or limited anycast due to cost or operational constraints, leading to varied performance across the DNS hierarchy.

The following diagram illustrates the complete Domain Name Resolution process, summarizing the steps outlined above.

![DNS Resolution System Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1746995157651/f0f9913b-a23a-4654-bea5-c9d8a8e4f7ca.png)

The following image shows the `dig +trace google.com` output, demonstrating the resolution process from root to authoritative name servers:

![DNS Resolution Process in Action using dig tool](https://cdn.hashnode.com/res/hashnode/image/upload/v1747000331356/8735cac3-5a22-48c2-9691-62ed6d8fb885.png)

---

## Domain Registrars and DNS Setup for New Domains

### What Are Domain Registrars?

Domain registrars were originally established to manage the registration of domain names, allowing individuals and organizations to secure unique names (for example, `example.com`) for websites and online services. They act as intermediaries between domain owners and domain registries, which maintain the authoritative databases for top-level domains (TLDs) like `.com` or `.org`.

Registrars handle tasks such as registering domains, renewing them, and updating DNS settings, ensuring seamless integration with the global DNS system. Many registrars also offer additional services like web hosting and SSL certificates to support website operations.

GoDaddy and Hostinger are among many registrars, known for their user-friendly platforms and comprehensive service offerings.

### What Happens in the DNS System When You Buy a New Domain?

When you purchase a new domain (like `example.com`) through a registrar like GoDaddy or Hostinger, the following steps occur in the DNS system:

- **Step 1: Registration with the registry** - The registrar sends your domain details to the registry for the TLD (for example, VeriSign for `.com`). The registry adds the domain to its database, recording the registrar as the managing entity and the authoritative name servers (for example, `ns1.example.com`) you specify.
- **Step 2: Name server configuration** - You configure the domain’s name servers at the registrar’s control panel (for example, GoDaddy’s Domain Portfolio or Hostinger’s hPanel). These name servers, often provided by the registrar or hosting provider (for example, `ns1.hostinger.com`), point to the DNS zone file that contains DNS records for your domain.
- **Step 3: DNS zone setup** - The DNS zone file, managed where the name servers point, is updated with DNS records like:
  - **A record**: Maps the domain (for example, `example.com`) to the hosting server’s IP address (for example, `192.0.2.1`).
  - **CNAME record**: Aliases subdomains (for example, `www.example.com`) to another domain.
  - **MX record**: Directs email to mail servers.

If using the registrar’s hosting, these records may be set automatically. Otherwise, you manually configure them to point to your hosting provider’s IP.

- **Step 4: DNS propagation** - After updating name servers or DNS records, changes propagate across the global DNS network, which can take 24-48 hours due to caching and server updates. During this period, your website may not be immediately accessible.
- **Step 5: TLD registry update** - The registry updates its records to include the domain’s name servers, which are queried by recursive resolvers during DNS lookups. For domains with name servers in the same domain (for example, `ns1.example.com` for `example.com`), glue records (IP addresses of the name servers) are registered with the registry to prevent circular dependencies.

---

## Conclusion

The Domain Name System (DNS) translates domain names into IP addresses, making the internet user-friendly. It resolves queries efficiently through a hierarchical system and caching, evolving from a few root servers in 1983 to a scalable, anycast-driven network today.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How DNS Works: A Guide to Understanding the Internet's Address Book",
  "desc": "The Domain Name System (DNS) translates domain names (like example.com) into IP addresses (like 192.0.2.1) so we can easily access websites. In this guide, you’ll learn how DNS resolution starts, its step-by-step process, how caching works, and the r...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-dns-works-the-internets-address-book.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
