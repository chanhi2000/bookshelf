---
lang: en-US
title: "What Firewalls Really Do and Why Every Network (Still) Needs Them"
description: "Article(s) > What Firewalls Really Do and Why Every Network (Still) Needs Them"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Firewalls Really Do and Why Every Network (Still) Needs Them"
    - property: og:description
      content: "What Firewalls Really Do and Why Every Network (Still) Needs Them"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-firewalls-really-do-and-why-every-network-still-needs-them.html
prev: /devops/security/articles/README.md
date: 2025-12-20
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1766165681001/895e7957-b66d-47be-ace8-5da5dbb343ed.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Firewalls Really Do and Why Every Network (Still) Needs Them"
  desc="Firewalls are one of the oldest tools in network security.  Many people think they are outdated or replaced by newer tools like endpoint security or cloud security platforms, but that’s not the case. Firewalls still play a critical role in protecting..."
  url="https://freecodecamp.org/news/what-firewalls-really-do-and-why-every-network-still-needs-them"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1766165681001/895e7957-b66d-47be-ace8-5da5dbb343ed.png"/>

Firewalls are one of the oldest tools in network security.

Many people think they are outdated or replaced by newer tools like endpoint security or cloud security platforms, but that’s not the case. Firewalls still play a critical role in protecting networks, systems, and data.

A firewall acts like a security guard at the entrance of a building. It decides what can come in, what can go out, and what should be blocked.

Even though attacks have become more advanced, this basic control point is still essential.

In this article, I’ll explain what firewalls really do, how they work, and why every network still needs them today. We’ll also look at how firewalls have evolved to stay useful in modern cloud and hybrid environments.

---

## What a Firewall Is in Simple Terms

![Firewall rules](https://cdn.hashnode.com/res/hashnode/image/upload/v1766072013072/fecfb631-cb72-4bc4-927a-1866bdce2bff.jpeg)

A [<VPIcon icon="fas fa-globe"/>firewall](https://checkpoint.com/cyber-hub/network-security/what-is-firewall/) is a system that controls network traffic based on rules. These rules define which connections are allowed and which are denied. The firewall sits between trusted systems and untrusted networks, most often between an internal network and the internet.

When data tries to move across the network, the firewall checks it. If the data follows the rules, it’s allowed through. If it breaks the rules, it’s blocked or logged for review.

Firewalls can be hardware devices, software programs, or cloud-based services. No matter the form, the goal is the same: they reduce risk by limiting exposure.

---

## What Firewalls Actually Do

At the most basic level, a firewall filters traffic. It looks at details like IP addresses, ports, and protocols. For example, it can allow web traffic on port 443 but block unused or risky ports.

![How firewall helps](https://cdn.hashnode.com/res/hashnode/image/upload/v1766072062052/cfdc2af2-bc89-43e9-b69a-dda8f94b1f9d.png)

Modern firewalls go much further. They can inspect traffic at a deeper level. This is called deep packet inspection. Instead of just checking where traffic comes from, the firewall looks at what the traffic contains.

Firewalls can also track connections over time. This is known as stateful inspection. The firewall understands whether traffic is part of a valid conversation or an unexpected request. This helps stop many common attacks.

Another important job of a firewall is logging. Firewalls record what they allow and what they block. These logs are vital for audits, investigations, and compliance needs.

---

## How Firewalls Reduce Attack Surface

Attack surface means the number of ways an attacker can try to get into a system. Firewalls reduce this by closing unnecessary paths.

Most systems don’t need to expose all services to the internet. A firewall ensures that only required services are reachable. Everything else stays hidden.

Even if an application has a weakness, a firewall can reduce the chance that attackers ever reach it. This doesn’t replace secure coding, but it adds a strong layer of defense.

This layered approach is known as [<VPIcon icon="fas fa-globe"/>defence in depth](https://geeksforgeeks.org/ethical-hacking/defence-in-depth/). Firewalls are a core layer in that strategy.

---

## Firewalls and Internal Network Protection

Many people think firewalls are only for the network edge. That is no longer true. Internal firewalls are now just as important.

Inside a network, different systems have different risk levels. A database should not be freely accessible from every workstation. Firewalls help enforce this separation.

![network segmentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1766072134125/a631c42a-8201-41e8-9f46-2bbcc6b113f6.png)

This practice is often called network segmentation. By placing firewalls between network segments, organizations limit how far an attacker can move if they gain access to one system.

Internal firewalls are especially important in large environments, data centers, and cloud platforms.

---

## Setting Up a Firewall

To make this practical, let’s look at a real, working example using [<VPIcon icon="fa-brands fa-ubuntu"/>UFW](https://help.ubuntu.com/community/UFW), an open source firewall available on most Linux systems. These are actual commands you would run on a server.

We will assume a simple use case: the server should allow secure web traffic on port 443 and allow SSH access for administration. All other incoming traffic should be blocked.

First, make sure you have UFW installed:

```sh
sudo apt update
sudo apt install ufw
```

Before enabling the firewall, define the default behaviour. Blocking all incoming traffic by default is a safe baseline. Outgoing traffic is allowed so the server can still reach external services.

```sh
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

Next, allow SSH access. This is important so you don’t lock yourself out of the server.

```sh
sudo ufw allow ssh
```

If you prefer to be explicit about the port, you can allow port 22 directly.

```sh
sudo ufw allow 22/tcp
```

Now allow HTTPS traffic so users can reach the web application.

```sh
sudo ufw allow 443/tcp
```

At this point, only SSH and HTTPS are allowed. Everything else is blocked automatically.

You can review the rules before enabling the firewall.

```sh
sudo ufw status verbose
```

When you are satisfied with the rules, enable the firewall like this:

```sh
sudo ufw enable
```

Once enabled, UFW immediately starts enforcing the rules.

To confirm everything is working, check the status again.

```sh
sudo ufw status numbered
```

Logging is disabled by default. Enabling it gives visibility into blocked and allowed connections, which is useful for security monitoring and audits.

```sh
sudo ufw logging on
```

UFW also supports simple protection against brute force attacks. For example, you can rate limit SSH connections.

```sh
sudo ufw limit ssh
```

This rule allows normal usage but blocks IP addresses that make too many connection attempts in a short time.

If you need to restrict access to a service by IP address, UFW supports that as well. For example, allowing SSH only from a trusted office IP:

```sh
sudo ufw allow from 203.0.113.10 to any port 22 proto tcp
```

You can remove or change rules as your requirements evolve. For example, to delete a rule using its number, do this:

```sh
sudo ufw delete 3
```

This setup shows what a firewall actually looks like in practice. You define defaults, allow only what is required, enable logging, and enforce the rules.

Even though enterprise firewalls and cloud firewalls use more advanced interfaces, the underlying logic is the same. Clear rules control traffic flow, reduce attack surface, and provide visibility. Open source tools like UFW make these concepts easy to understand and apply in real systems.

---

## Firewalls in Cloud and Hybrid Networks

Cloud computing changed how networks are built, but it did not remove the need for firewalls. In fact, it increased their importance.

In cloud environments, firewalls are often provided as managed services. They may be called security groups, network security rules, or cloud firewalls. The name changes, but the role is the same.

Hybrid networks combine on-premise systems with cloud systems. Firewalls control traffic between these environments. They help enforce consistent security rules across locations.

Without firewalls, cloud resources would be exposed directly to the internet. That would be risky and costly.

---

## Firewalls and Compliance Requirements

Many industries have strict security rules. Banks, healthcare providers, and large enterprises must follow regulations. Firewalls help meet these requirements.

Regulations often require control over network access. They also require logging and monitoring. Firewalls provide both.

Auditors frequently ask for firewall configurations and logs. A well-managed firewall setup makes audits easier and reduces compliance risk.

Even small companies benefit from these controls. Security standards are not only for large enterprises anymore.

---

## Common Misunderstandings About Firewalls

One common myth is that firewalls stop all attacks, but this isn’t true. Firewalls aren’t magic shields. They are one part of a broader security strategy.

Another misunderstanding is that firewalls slow networks down. Modern firewalls are built for high performance. When configured correctly, the impact is minimal.

Some believe that [<VPIcon icon="fa-brands fa-wikipedia-w"/>endpoint security](https://en.wikipedia.org/wiki/Endpoint_security) replaces firewalls. Endpoint tools protect individual devices. Firewalls protect the network paths between them. Both are needed.

Understanding these limits helps teams use firewalls effectively instead of relying on them blindly.

---

## Why Firewalls Still Matter Today

Cyber attacks are more frequent and more automated than ever. Exposed systems are scanned constantly. Firewalls provide the first line of resistance.

New technologies don’t remove the need for boundaries. Even [<VPIcon icon="fas fa-globe"/>zero-trust models](https://cisa.gov/zero-trust-maturity-model) rely on strict access controls, often enforced by firewall-like systems.

Every network, no matter the size, benefits from clear rules about who can talk to whom. Firewalls enforce those rules reliably and visibly.

Without firewalls, organisations would rely only on application security and user behaviour. That’s not enough in today’s threat landscape.

---

## Firewalls as a Foundation, Not a Finish Line

It’s important to see firewalls as a foundation. They create a secure base on which other controls can work better.

Security monitoring, incident response, and threat detection all depend on controlled traffic flows. Firewalls make these systems more effective.

When something goes wrong, firewall logs often provide the first clues. They show what happened at the network level.

This makes firewalls valuable not just for prevention, but also for understanding and recovery.

---

## Conclusion

Firewalls are not outdated tools from the past. They are still essential for protecting modern networks. They control access, reduce attack surface, support compliance, and enable strong security design.

While technology keeps changing, the need to control network traffic does not go away. Firewalls have adapted to cloud, hybrid, and complex environments.

Every network still needs a firewall. Not as the only defense, but as a critical part of a layered security approach. When used correctly, firewalls continue to do what they have always done best: keep the right doors open and keep the wrong ones closed.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Firewalls Really Do and Why Every Network (Still) Needs Them",
  "desc": "Firewalls are one of the oldest tools in network security.  Many people think they are outdated or replaced by newer tools like endpoint security or cloud security platforms, but that’s not the case. Firewalls still play a critical role in protecting...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-firewalls-really-do-and-why-every-network-still-needs-them.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
