---
lang: en-US
title: "Multi-layered Access Control"
description: "Article(s) > (2/8) How to Build Scalable Access Control for Your Web App [Full Handbook]" 
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/8) How to Build Scalable Access Control for Your Web App [Full Handbook]"
    - property: og:description
      content: "Multi-layered Access Control"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-scalable-access-control-for-your-web-app/multi-layered-access-control.html
date: 2025-02-05
isOriginal: false
author:
  - name: Samhitha Rama Prasad
    url : https://freecodecamp.org/news/author/samhitharamaprasad/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build Scalable Access Control for Your Web App [Full Handbook]",
  "desc": "Access control is crucial for preventing unauthorized access and ensuring that only the right people can access sensitive data in your application. As your app grows in complexity, so does the challenge of enforcing permissions in a clean and efficie...",
  "link": "/freecodecamp.org/how-to-build-scalable-access-control-for-your-web-app/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Scalable Access Control for Your Web App [Full Handbook]"
  desc="Access control is crucial for preventing unauthorized access and ensuring that only the right people can access sensitive data in your application. As your app grows in complexity, so does the challenge of enforcing permissions in a clean and efficie..."
  url="https://freecodecamp.org/news/how-to-build-scalable-access-control-for-your-web-app#heading-multi-layered-access-control"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738695897990/7a5962ce-9c4a-4e7c-bdeb-520dccc5d240.png"/>

To ensure comprehensive protection, access control should be enforced at multiple layers, depending on your application architecture.

To understand this, here’s a little something for my fellow Potter-heads:

---

## Hogwarts in Harmony: A Unified Defense

At the very edge of Hogwarts, you’ve got your Perimeter—the outer defenses that keep dark forces at bay. Think of these as the high, *enchanted stone walls* that surround the castle—acting like a firewall, with winged boar statues perched on the parapets, keeping watch. Only those with proper clearance are allowed through the gates, ensuring that no unwanted guests, like dark wizards, can enter.

When students arrive at Hogwarts, they come by *boats or Thestral-pulled carriages*, which are the only trusted means of transport. This is like **Endpoint Detection and Response (EDR)**, ensuring that only the right devices (or carriages) are allowed entry.

If a student tries to use a non-compliant device (like a *cursed broomstick or Apparition*), they won’t be allowed inside. **Mobile Device Management (MDM)** acts like the magical inspection process—only devices that meet Hogwarts' standards can pass through the gate and connect to the school’s systems.

At Hogwarts, *owls* are the trusted messengers that carry messages between the school and the outside world. These owls, like API keys and JWTs, carry the seal of approval and only deliver messages to the right recipients. Dark creatures like *Dementors* are forbidden from delivering messages, ensuring that only the right communications make it through.

The *Acceptance Letter from Hogwarts* is like an **OAuth token**. It proves you belong to the magical world and grants you access to the school without needing to show your face or reveal your blood status.

Inside the castle, access to different areas is controlled by who you are and your role at Hogwarts. For example, **Role-Based Access Control (RBAC)** ensures that only *Gryffindors* can access their common room, while *Slytherins* have their own. *Prefects* get additional privileges, like access to the Prefect's bathroom or other special rooms. These roles define where you can go and what you can do within the castle.

But things get more nuanced with **Attribute-Based Access Control (ABAC)**. For instance, only students enrolled in *Care of Magical Creatures* have access to the Forbidden Forest, but they’re only allowed in during daylight hours, when it's safer. The forest is too dangerous at night, and only those with the right attributes (like a specific timetable) can enter at the right time.

Within Hogwarts is the *Philosopher’s Stone*, hidden away in a vault guarded by powerful enchantments. This is your Data Layer – the most precious resources, secured by powerful protections. Just like database permissions, the vault is protected by Fluffy, the three-headed dog, a series of enchantments, and traps. Similarly, row-level and column-level security ensure that only Harry Potter can retrieve the Stone because he is the only one worthy (you can only access what’s meant for you).

To summarize,

1. **Network Layer (Infrastructure-level):** Firewalls and virtual private networks (VPNs) to control incoming and outgoing network traffic.
2. **Endpoint Layer (Device-level):** Endpoint Detection and Response (EDR) and Mobile Device Management (MDM) to ensure only compliant device can access your application.
3. **API Layer (Service-level):** API keys, JSON Web Tokens (JWTs), and API gateways to authenticate and authorize the caller and enforce policies such as rate limiting, IP whitelisting, and so on.
4. **Application Layer:** Where the core business logic for authorization typically resides (which this guide is all about).
5. **Data Layer (Database-level):** Database permissions, row/column-level security.
