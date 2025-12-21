---
lang: en-US
title: "🖥️ How Applications Were Deployed Before Load Balancers"
description: "Article(s) > (2/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (2/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "🖥️ How Applications Were Deployed Before Load Balancers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/load-balancing-with-azure-application-gateway-and-azure-load-balancer/how-applications-were-deployed-before-load-balancers.html
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-how-applications-were-deployed-before-load-balancers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

Before cloud tools like load balancers came along, the typical way to run an application was pretty simple: You’d deploy the entire app on a single server, like running a small business from one tiny shop.

---

## First Things First: What’s a Server?

Think of a server as a special computer that’s always connected to the internet. Its job is to “serve” your app to people when they visit your website, open your app, or use your service.

In cloud platforms like Azure, we usually call these Virtual Machines (VMs) - basically, software-powered servers you can spin up with a few clicks.

---

## Monoliths vs Microservices

Now, applications come in different “shapes.” The two most common are:

- **Monoliths**: Everything is bundled together into one big app. All the code - from user login to shopping cart to checkout - lives in a single unit.
- **Microservices**: The app is broken into smaller, independent apps (services). Each service does one job - like login, payments, orders - and runs separately.

### How Were These Apps Deployed?

Whether it was a monolith or a bunch of microservices, they were all usually deployed on a single server (VM).

For monoliths, you just ran the entire app directly on the server. For microservices: you'd run each service in a separate space on that same server, using **containers**.

### Wait — What’s a Container?

A container is like a mini-computer *inside* a computer. It has everything an app needs to run - code, tools, settings - and it keeps each app isolated from the others.

Why use containers?

- You can run multiple services on the same server without their underlying software (software needed for each app to run) interfering with each other.
- It’s faster and more efficient than installing everything directly on the server.
- They make moving apps between environments (for example, test → production) super smooth (no more “But, it works on my machine…”).

Popular tools like Docker make working with containers easy.

### Connecting It All Together: Domains, Subdomains, and Reverse Proxies

When your app lives on a server, you want people to be able to reach it. That’s where **domain names** come in.

- Your server has a public IP address - a set of numbers like `102.80.1.23`, that gives it a unique identifier on the public internet
- But instead of asking users to type numbers, you link that IP to a domain name, like `mycoolapp.com`

If your app has microservices, you might even assign **subdomains** like:

- `api.mycoolapp.com` for the backend
- `dashboard.mycoolapp.com` for the user interface
- `payments.mycoolapp.com` for payments

To manage all this, you’d use a **reverse proxy** (like Nginx or Apache). It listens on the main domain and subdomains, and forwards traffic to the right app or service.

::: tip Example

- Someone visits `dashboard.mycoolapp.com`
- The reverse proxy checks the domain and forwards the request to the correct container running the dashboard service

:::

And to help with all of this setup - from deploying containers to configuring reverse proxies - there are developer-friendly tools like [<VPIcon icon="fas fa-globe"/>Coolify](https://coolify.io). Coolify is an open-source platform that makes it super easy for developers and DevOps teams to:

- Deploy apps in containers
- Set up domains and subdomains
- Configure reverse proxies - all from a clean dashboard, no complex terminal commands needed

![Coolify dashboard example](https://cdn.hashnode.com/res/hashnode/image/upload/v1746979943646/a6525a09-f44a-4e00-a945-7bded3483b0d.jpeg)

All this was set up on ONE SERVER/VM. But here’s the catch: when that one server got overloaded or went down…💥 everything stopped.

That’s why we needed a better way. And that's where **scaling** and **load balancing** came in - to keep apps running smoothly, no matter the traffic.
