---
lang: en-US
title: "📦 Azure Load Balancer - Spreading the Traffic"
description: "Article(s) > (6/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (6/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "📦 Azure Load Balancer - Spreading the Traffic"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-load-balancer-spreading-the-traffic.html
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-azure-load-balancer-spreading-the-traffic"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

By now, you know that your app can live on multiple Virtual Machines (VMs), and that you can scale them easily using Virtual Machine Scale Sets (VMSS).

But here's the big question: when users start accessing your app - hundreds, even thousands at once - how do you make sure that all that traffic is fairly and efficiently distributed across those VMs?

You don’t want one VM to be overwhelmed while others are just chilling. You need a middleman - something smart enough to balance the load.

That’s where **Azure Load Balancer** steps in. It’s Azure’s way of saying, “Don’t worry, I got this” when traffic starts rolling in.

---

## 🏢 So, What Is Azure Load Balancer?

Azure Load Balancer is a **traffic director**. It takes incoming traffic from the internet (or even internal sources within your network) and intelligently spreads it across multiple backend machines - usually VMs.

It's like having a well-trained receptionist who routes every customer to the next available agent, so no one waits too long and no one gets overwhelmed 😃.

And the best part? This entire process happens in the background - fast, silent, and seamless. Users visiting your app have no idea a traffic manager is working behind the scenes. They just see a fast, responsive experience.

---

## 🌐 The Frontend IP - Your App’s Public Face

Every Azure Load Balancer is tied to a **Frontend IP**, which is basically the public IP address of your application - the one users connect to when they open `www.yourapp.com`.

This IP acts as the entry point. All user traffic comes through it first. But the Load Balancer doesn’t actually run your app. Instead, it accepts the traffic and forwards it to one of the VMs in the backend pool (we’ll get to that shortly).

You can configure this Frontend IP to be either public (accessible over the internet) or private (used for internal traffic within your cloud network - say, between microservices or internal tools).

![Frontend IP address illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1747055268951/5afbb738-d00d-4f49-9709-2fa1fe7cffdd.png)

---

## 🗂️ Backend Pool - Where the Magic Happens

Behind every Azure Load Balancer is a **backend pool** - a group of VMs (or VM Scale Set instances) where your actual app is running. These are the real workers, doing all the heavy lifting.

When traffic hits the Frontend IP, the Load Balancer takes that request and hands it off to one of the VMs in the backend pool.

But it doesn’t just randomly pick one. It checks a few things first - like whether the VM is healthy, whether it's already busy, and what rules you’ve set.

Each VM in the pool typically runs the same app or service. This means any of them can handle any incoming request, which is what makes load balancing possible in the first place.

![Backend pool illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1747055337014/e831056d-7c0c-49d9-b05a-6d3dbe3edc76.png)

---

## 🩺 Health Probes - Keeping Tabs on the VMs

Now, how does the Load Balancer know which VM is healthy or not? This is where **health probes** come in. Think of them as regular check-ups.

You configure the Load Balancer to periodically "ping" each VM - maybe by hitting a specific URL (like `/health`) or a certain port (like 80 for HTTP). If a VM doesn’t respond correctly, Azure marks it as unhealthy and temporarily removes it from the rotation.

This ensures users never get routed to a broken or unresponsive instance of your app. And once the VM becomes healthy again, it's automatically added back to the pool.

---

## ⚖️ Load Balancing Rules - Who Gets What?

Next, we have **Load Balancing Rules**. These are the instructions that tell Azure Load Balancer exactly how to behave.

You can define rules like:

- “Forward all HTTP (port 80) traffic to backend pool VMs on port 80”
- “Forward HTTPS (port 443) traffic to VMs on port 443”
- “Only route traffic to healthy VMs”

These rules make Azure Load Balancer highly customizable. You get to decide how traffic flows, which protocols to support, and how to handle backend ports. It's like customizing the rules of a relay race - who gets the baton and when.

---

## 👟 Real-World Example: Sneaker Sale Rush

Imagine you're running an online sneaker store at `www.sneakerblast.com`. You’re launching a flash sale, and thousands of users are hitting your website all at once.

Thanks to your Azure Load Balancer, here’s what happens:

1. All those users land on your Frontend IP, the public face of your site.
2. The Load Balancer accepts the traffic and checks the health probes of all VMs in the backend pool.
3. Based on its rules, it forwards each user to a healthy, available VM.
4. One VM might serve a user in Lagos, another in Nairobi, another in Accra - all seamlessly.

If one VM crashes or lags? The Load Balancer detects it instantly and stops routing traffic to it until it’s back online.

That’s smooth traffic management without any manual effort.
