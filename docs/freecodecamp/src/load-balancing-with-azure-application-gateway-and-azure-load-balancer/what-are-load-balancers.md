---
lang: en-US
title: "🧊 What Are Load Balancers?"
description: "Article(s) > (1/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (1/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "🧊 What Are Load Balancers?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/load-balancing-with-azure-application-gateway-and-azure-load-balancer/what-are-load-balancers.html
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-what-are-load-balancers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

Imagine you're running a small restaurant with just one chef in the kitchen. Everything goes smoothly when you have a few customers - each order is prepared one after the other, and everyone leaves satisfied.

But what happens when 50 people walk in all at once?

🍽️ One chef can’t handle that many orders at the same time.  
⏳ People start waiting longer.  
😤 Some customers leave.  
💥 The chef gets overwhelmed - and eventually burns out.

This is what can happen to a server (the computer running your app) when too many users try to access it at the same time.

---

## So, What Does a Load Balancer Do?

A **load balancer** is like a smart restaurant manager. But instead of food orders, it handles user requests - the things people do when they open your app, click buttons, or load data.

Let’s say you now have three chefs (servers) instead of one. The load balancer’s job is to:

- 👀 Watch for incoming orders (user requests)
- 🧠 Decide which chef (server) is available or least busy
- 🍽️ Send that request to the right one
- 🔁 Repeat this over and over, making sure things stay fast and smooth

So in simple terms, a load balancer takes all the incoming traffic to your app and distributes it across multiple servers so no single server gets overloaded - cool, right? 🙂

---

## Why Were Load Balancers Introduced?

Back in the early days, many applications were hosted on just one machine - called a Single Server Deployment.

That was okay when you had a small number of users. But once things started to grow - more users, more actions, more data - single servers became a bottleneck:

- They could only handle a limited number of requests.
- If they went down, your entire app would stop working.
- Scaling (adding more power) was expensive and manual.

::: tip Enter <strong>load balancers</strong>

designed to solve this by making it possible to:

- Spread traffic across multiple servers (so no one server crashes under pressure),
- Replace or restart servers without downtime,
- Add or remove servers as needed, depending on how busy your app is (this is called **scaling**).

:::

---

## A Simple Use-Case Scenario

Let’s say you're building an online store — your own mini Amazon. At first, you host your app on one Azure Virtual Machine. Things are great. But one day, you run a huge promo and suddenly…thousands of people flood in to browse, shop, and check out.

Your single VM starts lagging.

Orders fail. People complain. Your dream app? Crashing fast. 💥

So what do you do?

You spin up two more VMs to help out - but now you’ve got another problem: *How do you divide the traffic between the three?*

This is where the load balancer steps in. It:

- Looks at every incoming user request
- Figures out which VM is available and least busy
- Sends the request there
- Keeps rotating requests in real-time

::: info And the result?

✅ No single VM gets overwhelmed  

✅ Your app stays fast and responsive  

✅ Users are happy (and buying stuff again!)

![Load balancer illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1746980088916/41be330b-8d5b-4709-b07d-3f1a19d641e7.png)

:::
