---
lang: en-US
title: "📈 The Need for Scaling - Vertical vs Horizontal"
description: "Article(s) > (4/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
category:
  - DevOps
  - Microsoft
  - Azure
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - microsoft
  - azure
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (4/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "📈 The Need for Scaling - Vertical vs Horizontal"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/load-balancing-with-azure-application-gateway-and-azure-load-balancer/the-need-for-scaling-vertical-vs-horizontal.html
date: 2025-05-15
isOriginal: false
author:
  - name: Prince Onukwili
    url : https://freecodecamp.org/news/author/onukwilip/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One",
  "desc": "You’ve probably heard someone mention load balancing when talking about cloud apps. Maybe even names like Azure Load Balancer, Azure Application Gateway, or something about Virtual Machines and Scale Sets. 😵‍💫 It all sounds important...but also a l...",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
  desc="You’ve probably heard someone mention load balancing when talking about cloud apps. Maybe even names like Azure Load Balancer, Azure Application Gateway, or something about Virtual Machines and Scale Sets. 😵‍💫 It all sounds important...but also a l..."
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-the-need-for-scaling-vertical-vs-horizontal"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

Imagine your app is growing. At first, it’s just a few users. Then a few hundred. Then thousands are logging in, placing orders, chatting, uploading photos - all at once 😮

Suddenly, your server (VM) is under pressure. It’s like trying to pour a flood through a straw.

---

## So, What Do You Do When One Server Isn’t Enough?

This is where scaling comes in - the art of upgrading your app’s infrastructure to keep up with traffic.

There are two main ways to scale:

### 🧱 Option 1: Vertical Scaling (aka Scaling Up)

You take your existing VM and give it more power:

- Add more CPUs 🧠
- Increase RAM 🧵
- Add faster disks ⚡

Think of it like upgrading from a regular car to a sports car. It’s the same vehicle, just faster and stronger.

::: tabs

@tab:active Pros

- Simple to do
- No major changes to your app setup

@tab Cons

- There’s a limit to how much you can upgrade
- Still a single point of failure: if the VM crashes, everything goes down 😬

:::

### 🧩 Option 2: Horizontal Scaling (aka Scaling Out)

Instead of boosting one server, you add more servers - multiple VMs running copies of your app.

Now:

- Users can be distributed across all these VMs
- If one goes down, others keep serving traffic
- You can *dynamically* add or remove VMs based on traffic

It’s like opening more checkout counters in a busy supermarket 🛒

::: tabs

@tab:active Pros

- The load is evenly distributed. For example, if one server previously handled 100% of the traffic, adding two more servers would result in the traffic being split into approximately 33% to 34% for each server.
- Improves both performance and reliability
- You can scale based on real-time demand, that is traffic inflow

@tab Cons

- Needs something to split traffic between VMs - Load Balancers
- More expensive. You end up paying the original amount for 1 VM (for example $30) for the number of VMs you provide - if you provide 3 VMs at $30 each, you end up paying $90 at the end of the month

:::

---

## Quick Real-World Example

Let’s say you’ve launched an e-commerce site for sneakers 👟 Traffic spikes during a big sale? Your vertical scaling (bigger VM) might choke.

But with horizontal scaling:

- You spin up 5 VMs across different regions
- Traffic is shared between them
- If one VM slows down, others handle the load

### So, remember 👇🏾

| Scaling Type | Description | Pros | Cons |
| --- | --- | --- | --- |
| 🧱 Vertical Scaling | Make 1 VM more powerful (adding more CPU power, SSD, RAM, bandwidth, and so on) | Easy setup, fewer changes | Hardware limits, 1 point of failure - If that 1 server/VM goes down, so does your app |
| 🧩 Horizontal Scaling | Add more VMs to handle traffic | Flexible, reliable | Needs traffic distribution logic (Load Balancer). Usually more expensive (the price of 1 VM times the number of VMs) |
