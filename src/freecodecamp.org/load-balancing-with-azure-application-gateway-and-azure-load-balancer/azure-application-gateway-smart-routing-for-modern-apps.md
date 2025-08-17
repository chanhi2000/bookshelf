---
lang: en-US
title: "🍴 Azure Application Gateway - Smart Routing for Modern Apps"
description: "Article(s) > (7/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (7/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "🍴 Azure Application Gateway - Smart Routing for Modern Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-application-gateway-smart-routing-for-modern-apps.html
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-azure-application-gateway-smart-routing-for-modern-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

So far, we’ve seen how Azure Load Balancer helps you split traffic across multiple VMs running a single service - like a monolithic app or a web frontend.

Let’s say you have a web application deployed on a VM. It listens on port 80, and you’ve scaled it into 3 instances. The Azure Load Balancer takes requests from the internet and spreads them across all 3 instances of the same service. Easy, right?

You can even link the Load Balancer’s public IP address to your domain - like `mydomain.com` - so users can visit your site normally.

---

## 🧠 But What If You Have *Multiple* Services?

Now imagine you’ve gone beyond just one app. You’re building something more modern, like a set of microservices.

You now have:

- A payment service listening on port 5000
- An authentication service on port 6000
- A purchase service on port 7000

All deployed across the same VMs (or Virtual Machine Scale Set), just on different ports.

Here’s the problem: an Azure Load Balancer is designed to route traffic to *one* backend pool - basically one service - on one port. If you tie it to `mydomain.com`, it can only send traffic to one of your microservices. 😬

So… what do you do?

You might think: “Let me just create a separate Load Balancer for each service!” 🤕

But that means:

- You’ll have to pay for multiple load balancers
- You’ll end up managing 3-5 public IP addresses
- You might even need to buy multiple domains like `mypayment.com`, `myauth.com`, and so on to route users properly

Yikes. That’s impractical, messy, *and* expensive 😖💸

---

## 🎉 Enter Azure Application Gateway

**Azure Application Gateway** solves this problem beautifully. It’s designed to route traffic intelligently - not just to one service, but to multiple services using just one gateway.

It works like this:

1. You create one public-facing frontend IP (like `52.160.100.5`)
2. You link that IP address to your main domain, for example `mydomain.com`
3. Then, you define multiple backend pools - one for each service:
    - Payment service (port 5000)
    - Auth service (port 6000)
    - Purchase service (port 7000)
4. Next, you set up routing rules that decide how to forward each request.

---

## ✨ Two Ways to Route with Application Gateway

You can configure **smart routing** based on:

### URL paths

- `mydomain.com/payment` → Payment service
- `mydomain.com/auth` → Auth service

### Subdomains (host headers)

- `payment.mydomain.com` → Payment service
- `auth.mydomain.com` → Auth service

This way, all your services share one public IP and one domain - super clean, super efficient 🙌🏾

---

## 🤓 Real-Life Scenario (Let’s Break It Down)

Let’s say you’re building a startup platform that has three key microservices:

- **Payment service** that handles transactions
- **Authentication service** that handles login and user identity
- **Purchase service** that manages product ordering

Each service is containerized and deployed on the same VM (or across several VMs using a VM Scale Set). But - and this is key - they all listen on **different ports** inside the VMs:

- Payment → port 3000
- Auth → port 6000
- Purchase → port 7000

Now, without a smart routing solution, you’d be stuck trying to expose just one of these services using a standard Azure Load Balancer. But you need all three to be accessible from the internet - and you don’t want to pay for or manage 3 different Load Balancers 😅

So, what do you do?

---

## 🧠 Using Azure Application Gateway to Route Traffic Intelligently

Here's how you can fix this using **one** Application Gateway:

### 1. Deploy your microservices inside each VM:

- Each service runs on a specific port
- All VMs in your scale set are identical (they contain all three services)

### 2. Create backend pools in Application Gateway:

- A backend pool for the payment service (pointing to port 3000 on all VMs)
- One for the auth service (port 6000)
- Another for the purchase service (port 7000)

### 3. Create routing rules:

- Option A (Path-based routing):
  - Requests to `mydomain.com/payment` → go to the payment backend pool
  - Requests to `mydomain.com/auth` → go to the auth backend pool
  - Requests to `mydomain.com/purchase` → go to the purchase backend pool
- Option B (Subdomain-based routing):
  - `payment.mydomain.com` → payment service
  - `auth.mydomain.com` → auth service
  - `purchase.mydomain.com` → purchase service

You just tell the Application Gateway: “Hey, if a request comes in for this URL or subdomain, send it to this port on these VMs.” And it does just that - consistently and intelligently 🔁

---

## 📦 So, What’s Really Happening?

Imagine a user visits `mydomain.com/auth`. Here’s what goes on behind the scenes:

1. The DNS translates `mydomain.com` to your Application Gateway’s public IP
2. The Gateway receives the request
3. It checks your routing rules
4. It sees that `/auth` should go to the backend pool for port 6000
5. It forwards the request to one of the VMs running the auth service
6. The response goes back to the user - fast and seamless ✨

This happens in milliseconds, for every request. And because the Application Gateway is aware of multiple ports and services, it can handle routing logic that a regular Load Balancer just can’t do.

![Application Gateway Illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1747056436345/7ea97231-d2ee-4f63-aff1-50595e7c06e0.png)
