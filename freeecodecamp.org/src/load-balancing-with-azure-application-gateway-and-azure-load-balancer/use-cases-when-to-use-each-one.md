---
lang: en-US
title: "🧭 Use Cases: When to Use Each One"
description: "Article(s) > (9/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (9/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "🧭 Use Cases: When to Use Each One"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/use-cases-when-to-use-each-one.html
next: /freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/README.md#conclusion
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-use-cases-when-to-use-each-one"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

There’s no one-size-fits-all when it comes to hosting apps in the cloud. The right setup depends on what you’re building, how much traffic you expect, and how complex your app is.

Let’s walk through 4 different use-case scenarios, starting from the most basic setup all the way to a fully auto-scaled and smartly routed architecture.

---

## 1️⃣ Single VM Instance - For Small Projects or Internal Tools

::: important Use this when:

You're just getting started. You’ve built a small app - maybe a portfolio, a blog, or a side project - and you want to make it live, OR You’re a startup that just launched.

:::

::: info How it works:

You spin up one Azure VM, install your app on it, and open the port it listens on (for example, port 80 for a web server). You can then attach a public IP to the VM and bind it to a custom domain like `myawesomeapp.com`.

:::

:::  tip Real-life examples:

- A developer hosting a portfolio website or blog
- A startup testing a new product with only a few users
- An internal company tool for a small team

:::

::: tabs

@tab:active Pros

- Super simple setup
- Low cost
- Full control of your environment

@tab Cons

- If the VM goes down, your app goes down
- No auto-scaling - performance may drop with traffic spikes (the only way to adapt to increased CPU/memory usage due to traffic inflow is via manually scaling the VM vertically)
- You manually maintain and monitor everything

:::

---

## 2️⃣ Manual Horizontal Scaling - For Apps With Medium, Predictable Traffic

::: important Use this when:

Your app is growing - maybe you have a few thousand users now, and performance matters. You want more than one server so your app doesn’t crash during busy hours.

:::

::: info How it works:

You manually create 2 or 3 Azure VMs with the same app setup. You then add a Load Balancer in front to split traffic evenly across them.

:::

::: tip Real-life examples:

- A business with a customer portal
- A school website that handles regular logins, lecture video streaming, and so on during class hours
- An app that gets traffic mostly during the day (predictable load)

:::

::: tabs

@tab:active Pros

- Better performance and availability
- Load is shared across multiple VMs
- You can scale manually when needed

@tab Cons

- You must manually add or remove VMs - which takes effort
- Still need to monitor performance manually
- No built-in automation or auto-healing

:::

---

## 3️⃣ Auto-Scaling with VM Scale Sets + Azure Load Balancer - For Apps With Spiky or Unpredictable Traffic

::: important Use this when:

You’re building something more serious - traffic comes in waves (for example, a fitness/coach booking app), and you don’t want to sit around scaling VMs all day. You want Azure to automatically scale your infrastructure for you.

:::

::: info How it works:

You set up a Virtual Machine Scale Set (VMSS) that can automatically create more VMs when needed (like during high traffic), and remove them when things are calm — saving money. A Load Balancer distributes traffic across all those VMs.

:::

::: tip Real-life examples:

- A media platform where people upload videos or photos
- A shopping site that gets surges during promotions, for example Black Fridays
- A booking platform with peak traffic in evenings/weekends

:::

::: tabs

@tab:active Pros

- Automatic scaling - saves time and money
- High availability: VMs can be replaced if one fails
- Easy to grow as your user base grows

@tab Cons:

- Works best if your app is monolithic (one big service)
- No support for routing traffic to specific services - just spreads traffic across VMs
- Load Balancer can’t look at URL paths or subdomains

:::

---

## 4️⃣ VM Scale Set + Azure Application Gateway - For Microservices or Complex Web Apps

::: important Use this when:

You have a modern, multi-service app - maybe built with microservices. Each service (like payments, authentication, search, and so on) lives on a different port or even in a container.

You want to route traffic smartly - like `/login` goes to the auth service, `/pay` to payments, and `/search` to the search service - all on the same domain.

:::

::: info How it works:

You still use a VM Scale Set for auto-scaling, but instead of a basic Load Balancer, you add an Application Gateway. It can inspect each request and send it to the right service based on things like:

- URL path (for example, `/payments`, `/orders`)
- Subdomain (for example, `payments.mydomain.com`, `auth.mydomain.com`)

:::

::: tip Real-life examples:

- A full-blown SaaS product with multiple services
- An e-commerce site with checkout, account, orders, and admin dashboards
- A business migrating from a monolith to a microservices setup

:::

::: tabs

@tab:active Pros

- Smart routing based on path or subdomain
- Everything runs under one public IP and one domain
- Secure HTTPS handling + optional Web Application Firewall (WAF)
- Auto-scaling and high availability

@tab Cons:

- More complex setup
- Slightly higher cost due to Application Gateway
- Needs planning around port numbers and backend pools

:::

---

## 🧠 Quick Summary Table

| Setup | Best For | Scaling | Routing Logic | Cost | Ease |
| --- | --- | --- | --- | --- | --- |
| ☁️ Single VM | Small sites, personal apps | ❌ (Manual) | ❌ One app only | 💲 (Lowest) | ⭐⭐⭐⭐ |
| 🧱 Manual Horizontal Scaling + Load Balancer | Mid-size apps, predictable traffic | ✅ (Manual) | ❌ One app only | 💲💲💲 (due to multiple VMs running at once without down-scaling — even with no traffic) | ⭐⭐ (due to manual scaling) |
| 🔁 VMSS + Load Balancer | Busy apps, spiky traffic | ✅ (Auto) | ❌ One app only | 💲💲 | ⭐⭐⭐ |
| 🍴 VMSS + App Gateway | Microservices, modern apps | ✅ (Auto) | ✅ Smart routing (involving multiple microservices) | 💲💲💲💲(Highest) | ⭐⭐ |
