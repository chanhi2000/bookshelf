---
lang: en-US
title: "⚙️ Azure Virtual Machines (VMs) - The Building Blocks"
description: "Article(s) > (3/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
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
      content: "Article(s) > (3/9) Load Balancing with Azure Application Gateway and Azure Load Balancer - When to Use Each One"
    - property: og:description
      content: "⚙️ Azure Virtual Machines (VMs) - The Building Blocks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-virtual-machines-vms-the-building-blocks.html
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
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer#heading-azure-virtual-machines-vms-the-building-blocks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

![Virtual Machine illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1746980948928/eb6a7fb2-7432-42ed-8cbd-bff6c8250d4e.jpeg)

When it comes to running apps in the cloud, **Virtual Machines (VMs)** are the basic building blocks - kind of like renting an apartment in a giant digital skyscraper.

You don’t need to buy the whole building (aka physical servers), you just rent the space you need, when you need it.

---

## What Exactly Is a Virtual Machine?

A Virtual Machine is a software-based computer that runs inside a real, physical computer (a server) - hosted in a data center, like those run by Microsoft Azure.

It looks and behaves like a normal computer:

- It has an operating system (Windows, Linux)
- You can install apps
- It has memory (RAM), storage (disks), and CPU

But the best part? You don’t need to worry about the hardware. Azure takes care of that behind the scenes - all you do is say:

> “Hey Azure, give me a Linux VM with 4GB RAM and 2 CPUs.”

And boom 💥 — it spins up in minutes.

---

## Why Use a VM?

Let’s say you’ve built a web app - it’s just a simple blog. You want to deploy it and make it accessible to the world.

Here's what you can do with a VM:

- Set it up with your favorite OS (for example, Ubuntu)
- Install web servers like Nginx or Apache
- Deploy your app
- Bind it to your domain name
- Let the world visit your blog at `myawesomeblog.com`

It’s your own personal environment - no sharing, full control.
