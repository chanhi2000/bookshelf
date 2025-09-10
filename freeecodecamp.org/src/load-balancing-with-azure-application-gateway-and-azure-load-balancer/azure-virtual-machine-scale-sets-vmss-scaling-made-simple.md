---
lang: en-US
title: "🔁 Azure Virtual Machine Scale Sets (VMSS) - Scaling Made Simple"
description: "Article(s) > (5/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (5/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "🔁 Azure Virtual Machine Scale Sets (VMSS) - Scaling Made Simple"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-virtual-machine-scale-sets-vmss-scaling-made-simple.html
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-azure-virtual-machine-scale-sets-vmss-scaling-made-simple"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

Okay - so we’ve talked about **horizontal scaling**: adding multiple VMs to handle growing traffic. Sounds great, right?

But here’s the thing: manually spinning up and configuring 5, 10, or 100 VMs... every time your app gets busy? Yeah, that’s not fun 🙃

---

## Enter: Virtual Machine Scale Sets (VMSS)

VMSS is Azure’s way of automating horizontal scaling. Instead of creating each VM one by one, you define a template, and Azure takes care of the rest:

- How many VMs to start with
- How to configure them (OS, apps, settings) ⚙️
- When to add or remove VMs based on traffic 📈📉

---

## A Simple Analogy 🧃

Think of VMSS like a juice dispenser at a party:

- At first, it pours into 2 cups (VMs)
- If 10 guests show up? It starts filling 5 cups
- Party slows down? Back to 2 cups again

You never have to refill manually - the dispenser adjusts on its own. 🎉

---

## How It Works (Without the Jargon 😌)

1. **You set the rules:** “If CPU usage goes above 70%, add 2 more VMs.”
2. **Azure watches traffic and adjusts the number of VMs** automatically.
3. **All VMs are identical** - like clones, all running the same app setup.
4. **It works with Azure Load Balancer** to spread traffic across all these VMs smoothly.

---

## Real-Life Example: Food Delivery App 🍕📱

You’ve built an app where users order food. During lunch and dinner, traffic explodes.

::: tip With VMSS:

- You start with 3 VMs in the morning
- At 12PM, Azure sees high CPU usage, so it spins up 5 more VMs
- At 3PM, traffic drops, so Azure removes the extra VMs

:::

You only pay for what you use. And users get a smooth experience - no delays, no crashes 👌🏾

![Auto-scaling illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1746982520998/7fe3c997-fc8f-418a-861b-e999905ca43c.png)
