---
lang: en-US
title: "🔍 Azure Load Balancer vs Azure Application Gateway"
description: "Article(s) > (8/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (8/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "🔍 Azure Load Balancer vs Azure Application Gateway"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-load-balancer-vs-azure-application-gateway.html
date: 2025-05-15
isOriginal: false
author:
  - name: Prince Onukwili
    url: https://freecodecamp.org/news/author/onukwilip/
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-azure-load-balancer-vs-azure-application-gateway"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

By now, you've seen how both tools help route traffic in Azure - but they solve different problems.

Let’s break down how they compare, and when you should use one over the other 👇🏾

---

## 🛣️ 1. Routing Logic

### Azure Load Balancer

It simply distributes incoming traffic evenly across a pool of VMs. It doesn’t care *what* the request is - it just balances the load.

Imagine a delivery guy who doesn't ask questions - he just drops each package at the next available house.

That’s what Azure Load Balancer does: it sends traffic to one of your servers without looking inside the request.

### Azure Application Gateway

This is the smart one. It looks at *what’s inside* each request (like the URL path or domain) and makes intelligent decisions.

Just like a smarter delivery guy who looks at the address and decides where to go: "Oh! This one is for the payment office, not the main office."

That’s what Application Gateway does: it reads the request (like the URL or domain name) and sends it to the right place according to the routing rules.

---

## 🌐 2. Protocols Handled

### Load Balancer

Works at the transport layer (Layer 4 in the OSI model). It deals with TCP/UDP traffic - raw network traffic, like HTTP, video streaming, games, and so on.

### Application Gateway

Works at the application layer (Layer 7). It handles web traffic only - like websites and apps (HTTP/HTTPS) - and it can actually read what's being asked, like:

- “Go to /login”
- “Go to <VPIcon icon="fas fa-globe"/>`payment.mydomain.com`”.

TL;DR: Load Balancer just pushes packets. App Gateway actually *reads* your web requests.

---

## 🔁 3. Use Case Scenarios

| Situation | Best Choice |
| --- | --- |
| You have one big app and just want to spread users across servers | ✅ Load Balancer |
| You have multiple services (like login, payment, and so on) and need to send users to the right one | ✅ Application Gateway |
| You want to use subdomains (like [login.mysite.com](http://login.mysite.com)) | ✅ Application Gateway |
| You want to secure your website with HTTPS and Web Application Firewall (WAF) | ✅ Application Gateway |
| You want the simplest setup and lowest cost | ✅ Load Balancer |

---

## 🔐 4. SSL Termination & Security Features

**Load Balancer** doesn’t handle security stuff. You’ll need to secure each server yourself (for example, set up HTTPS on each one).

**Application Gateway** can secure everything in one place - you upload your SSL certificate once and it takes care of HTTPS for all services.

It can also protect you from hackers and bad traffic with something called **WAF (Web Application Firewall)**, which protects your app from threats like SQL injection, XSS, and so on (you need to set this up manually).

---

## 💰 5. Pricing and Complexity

**Load Balancer** is cheaper and easier to set up. Great when you don’t need anything fancy.

**Application Gateway** costs more, but gives you more control and less headache when working with complex apps and microservices.

Trying to use Load Balancer for multiple services? You’ll need to create one Load Balancer per service, which becomes costly and impractical.

---

## 🧠 Summary Table

| Feature | Load Balancer | Application Gateway |
| --- | --- | --- |
| Can it understand the request? | ❌ No | ✅ Yes |
| Can it route based on URL or subdomain? | ❌ No | ✅ Yes |
| Can it handle secure HTTPS traffic? | ❌ No | ✅ Yes |
| Is it good for simple apps? | ✅ Yes | ✅ Yes |
| Is it good for complex apps with many services? | ❌ No | ✅ Yes |
| Cost | 💲 Lower | 💰 Higher |
