---
lang: en-US
title: "Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One"
description: "Article(s) > Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One"
icon: iconfont icon-microsoftazure
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
      content: "Article(s) > Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One"
    - property: og:description
      content: "Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/
prev: /devops/azure/articles/README.md
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
  "title": "Azure > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/azure/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One"
  desc="You’ve probably heard someone mention load balancing when talking about cloud apps. Maybe even names like Azure Load Balancer, Azure Application Gateway, or something about Virtual Machines and Scale Sets. 😵‍💫 It all sounds important...but also a l..."
  url="https://freecodecamp.org/news/load-balancing-with-azure-application-gateway-and-azure-load-balancer"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747235455030/cb82bfb4-8d7b-47e5-ab31-126906f60b40.png"/>

You’ve probably heard someone mention load balancing when talking about cloud apps. Maybe even names like Azure Load Balancer, Azure Application Gateway, or something about Virtual Machines and Scale Sets. 😵‍💫

It all sounds important...but also a little confusing. Like, why are there so many moving parts? And what do they actually do?

In this guide, we’re going to break it all down – step by step – using real examples and simple language.

You’ll learn:

- What load balancers are (and why apps even need them)
- How apps were deployed before load balancers existed (hint: everything lived on one lonely server)
- How Azure Virtual Machines work – and how they let you scale up your apps
- What Virtual Machine Scale Sets are, and how they help handle sudden traffic spikes
- The differences between Azure Load Balancer and Azure Application Gateway, and when to use each

By the end, you won’t just understand what these tools do – you’ll know *when* and *why* to use them in real-world scenarios.

Whether you’re a curious beginner, a hands-on builder, or someone just trying to wrap their head around Azure’s ecosystem, this guide is for you.

Ready to untangle the cloud spaghetti? Let’s go! 🍝🚀

```component VPCard
{
  "title": "🧊 What Are Load Balancers?",
  "desc": "(1/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/what-are-load-balancers.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "🖥️ How Applications Were Deployed Before Load Balancers",
  "desc": "(2/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/how-applications-were-deployed-before-load-balancers.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "⚙️ Azure Virtual Machines (VMs) – The Building Blocks",
  "desc": "(3/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-virtual-machines-vms-the-building-blocks.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "📈 The Need for Scaling – Vertical vs Horizontal",
  "desc": "(4/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/the-need-for-scaling-vertical-vs-horizontal.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "🔁 Azure Virtual Machine Scale Sets (VMSS) – Scaling Made Simple",
  "desc": "(5/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-virtual-machine-scale-sets-vmss-scaling-made-simple.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "📦 Azure Load Balancer – Spreading the Traffic",
  "desc": "(6/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-load-balancer-spreading-the-traffic.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "🍴 Azure Application Gateway – Smart Routing for Modern Apps",
  "desc": "(7/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-application-gateway-smart-routing-for-modern-apps.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "🔍 Azure Load Balancer vs Azure Application Gateway",
  "desc": "(8/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/azure-load-balancer-vs-azure-application-gateway.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "🧭 Use Cases: When to Use Each One",
  "desc": "(9/9) Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "link": "/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer/use-cases-when-to-use-each-one.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

---

## ✅ Conclusion

By now, you’ve gone from simply hearing the words “load balancer” or “scale set” to understanding exactly how they work, when to use them, and what problems they solve. Whether you’re just launching a small app or scaling up a high-traffic service, Azure gives you flexible, powerful tools to grow with confidence.

We started from the very beginning – a single virtual machine. It’s simple and great for small apps, but it quickly becomes a bottleneck as traffic grows.

That’s where scaling comes in. We explored:

- 🧱 **Vertical scaling** – Upgrading the same VM (quick fix, but limited)
- 🧩 **Horizontal scaling** – Adding more VMs to handle traffic better

Then we introduced Azure Virtual Machine Scale Sets (VMSS) – which bring auto-scaling to life. No more manual intervention – Azure can scale your servers up and down based on demand.

But where things really get smart is with load balancers:

- 📦 **Azure Load Balancer** helps spread traffic across your VMs — great for single-service apps
- 🍴 **Azure Application Gateway** takes it further by routing requests based on URL paths or subdomains — perfect for multi-service or microservice apps

### 🎯 TL;DR – What Should You Use?

- **Single VM**: For side projects, portfolios, or internal tools
- **Manual scaling + Load Balancer**: For medium apps with predictable load
- **VMSS + Load Balancer**: For monolithic apps with auto-scaling needs
- **VMSS + Application Gateway**: Also includes auto-scaling but for microservices or smart routing needs

### 💡 Final Thoughts

Cloud apps grow – fast. And with growth comes complexity. But with the right Azure setup, you can stay one step ahead of your traffic, serve users better, and keep costs under control.

Remember: you don’t need to start big. Start small, understand your app's traffic patterns, and scale only when you need to. Tools like Azure VM Scale Sets, Load Balancer, and Application Gateway give you the control and power to build scalable, modern applications without over-engineering.

Thanks for sticking with me through this deep dive. I hope this made things clearer, simpler, and maybe even a little fun 😊

---

## Study Further 📚

If you would like to learn more about Azure Virtual Machines, Scale Sets, Load Balancer, and Application Gateway, you can check out the courses below:

- [Microsoft Azure Fundamentals AZ-900 Exam Prep Specialization](https://coursera.org/specializations/microsoft-azure-fundamentals-az900-exam-prep) — Microsoft, Coursera
- [Azure Virtual Machine Tutorial | Creating A Virtual Machine In Azure | Azure Training | Simplilearn](https://youtu.be/QOv_-xBXkpo?si=kSijmQdev5cQbRKl) — YouTube
- [Virtual machine scale sets](https://youtu.be/wN4lRWHUHA0?si=kWBGXhXZTnVgzuEj) — YouTube
- [Azure Load Balancer | Azure Load Balancer Tutorial | All About Load Balancer | Edureka](https://youtu.be/VqBGjddK5VY?si=diLGQfuW5i0lxbse) — YouTube
- [Azure Application Gateway Deep dive | Step by step explained](https://youtu.be/V9EP4jAg4QM?si=t7EqQjw1eNHqOtjK) — YouTube

::: info About the Author 👨‍💻

Hi, I’m Prince! I’m a DevOps engineer and Cloud architect passionate about building, deploying, and managing scalable applications and sharing knowledge with the tech community.

If you enjoyed this article, you can learn more about me by exploring more of my blogs and projects on my [LinkedIn profile (<FontIcon icon="fa-brands fa-linkedin"/>`prince-onukwili-a82143233`).](https://linkedin.com/in/prince-onukwili-a82143233/) You can find my [<FontIcon icon="fa-brands fa-linkedin"/>LinkedIn articles here](https://linkedin.com/in/prince-onukwili-a82143233/details/publications/). You can also [<FontIcon icon="fas fa-globe"/>visit my website](https://prince-onuk.vercel.app/achievements#articles) to read more of my articles as well. Let’s connect and grow together! 😊

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Load Balancing with Azure Application Gateway and Azure Load Balancer – When to Use Each One",
  "desc": "You’ve probably heard someone mention load balancing when talking about cloud apps. Maybe even names like Azure Load Balancer, Azure Application Gateway, or something about Virtual Machines and Scale Sets. 😵‍💫 It all sounds important...but also a l...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/load-balancing-with-azure-application-gateway-and-azure-load-balancer.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
