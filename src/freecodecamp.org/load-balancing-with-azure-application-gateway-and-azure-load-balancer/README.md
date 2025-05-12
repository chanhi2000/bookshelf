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

---

1. [🧊 What Are Load Balancers?](#heading-what-are-load-balancers)
2. [🖥️ How Applications Were Deployed Before Load Balancers](#heading-how-applications-were-deployed-before-load-balancers)
3. [⚙️ Azure Virtual Machines (VMs) – The Building Blocks](#heading-azure-virtual-machines-vms-the-building-blocks)
4. [📈 The Need for Scaling – Vertical vs Horizontal](#heading-the-need-for-scaling-vertical-vs-horizontal)
5. [🔁 Azure Virtual Machine Scale Sets (VMSS) – Scaling Made Simple](#heading-azure-virtual-machine-scale-sets-vmss-scaling-made-simple)
6. [📦 Azure Load Balancer – Spreading the Traffic](#heading-azure-load-balancer-spreading-the-traffic)
7. [🍴 Azure Application Gateway – Smart Routing for Modern Apps](#heading-azure-application-gateway-smart-routing-for-modern-apps)
8. [🔍 Azure Load Balancer vs Azure Application Gateway](#heading-azure-load-balancer-vs-azure-application-gateway)
9. [🧭](#heading-use-cases-when-to-use-what) [Use Cases: When to Use Each One](#heading-use-cases-when-to-use-each-one)


---

## 🧊 What Are Load Balancers?

Imagine you're running a small restaurant with just one chef in the kitchen. Everything goes smoothly when you have a few customers – each order is prepared one after the other, and everyone leaves satisfied.

But what happens when 50 people walk in all at once?

🍽️ One chef can’t handle that many orders at the same time.  
⏳ People start waiting longer.  
😤 Some customers leave.  
💥 The chef gets overwhelmed – and eventually burns out.

This is what can happen to a server (the computer running your app) when too many users try to access it at the same time.

### So, What Does a Load Balancer Do?

A **load balancer** is like a smart restaurant manager. But instead of food orders, it handles user requests – the things people do when they open your app, click buttons, or load data.

Let’s say you now have three chefs (servers) instead of one. The load balancer’s job is to:

- 👀 Watch for incoming orders (user requests)
- 🧠 Decide which chef (server) is available or least busy
- 🍽️ Send that request to the right one
- 🔁 Repeat this over and over, making sure things stay fast and smooth

So in simple terms, a load balancer takes all the incoming traffic to your app and distributes it across multiple servers so no single server gets overloaded – cool, right? 🙂

### Why Were Load Balancers Introduced?

Back in the early days, many applications were hosted on just one machine – called a Single Server Deployment.

That was okay when you had a small number of users. But once things started to grow – more users, more actions, more data – single servers became a bottleneck:

- They could only handle a limited number of requests.
- If they went down, your entire app would stop working.
- Scaling (adding more power) was expensive and manual.

::: tip Enter <strong>load balancers</stroong>

designed to solve this by making it possible to:

- Spread traffic across multiple servers (so no one server crashes under pressure),
- Replace or restart servers without downtime,
- Add or remove servers as needed, depending on how busy your app is (this is called **scaling**).

:::

### A Simple Use-Case Scenario

Let’s say you're building an online store — your own mini Amazon. At first, you host your app on one Azure Virtual Machine. Things are great. But one day, you run a huge promo and suddenly…thousands of people flood in to browse, shop, and check out.

Your single VM starts lagging.

Orders fail. People complain. Your dream app? Crashing fast. 💥

So what do you do?

You spin up two more VMs to help out – but now you’ve got another problem: *How do you divide the traffic between the three?*

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

---

## 🖥️ How Applications Were Deployed Before Load Balancers

Before cloud tools like load balancers came along, the typical way to run an application was pretty simple: You’d deploy the entire app on a single server, like running a small business from one tiny shop.

### First Things First: What’s a Server?

Think of a server as a special computer that’s always connected to the internet. Its job is to “serve” your app to people when they visit your website, open your app, or use your service.

In cloud platforms like Azure, we usually call these Virtual Machines (VMs) – basically, software-powered servers you can spin up with a few clicks.

### Monoliths vs Microservices

Now, applications come in different “shapes.” The two most common are:

- **Monoliths**: Everything is bundled together into one big app. All the code – from user login to shopping cart to checkout – lives in a single unit.
- **Microservices**: The app is broken into smaller, independent apps (services). Each service does one job – like login, payments, orders – and runs separately.

#### How Were These Apps Deployed?

Whether it was a monolith or a bunch of microservices, they were all usually deployed on a single server (VM).

For monoliths, you just ran the entire app directly on the server. For microservices: you'd run each service in a separate space on that same server, using **containers**.

#### Wait — What’s a Container?

A container is like a mini-computer *inside* a computer. It has everything an app needs to run – code, tools, settings – and it keeps each app isolated from the others.

Why use containers?

- You can run multiple services on the same server without their underlying software (software needed for each app to run) interfering with each other.
- It’s faster and more efficient than installing everything directly on the server.
- They make moving apps between environments (for example, test → production) super smooth (no more “But, it works on my machine…”).

Popular tools like Docker make working with containers easy.

#### Connecting It All Together: Domains, Subdomains, and Reverse Proxies

When your app lives on a server, you want people to be able to reach it. That’s where **domain names** come in.

- Your server has a public IP address – a set of numbers like `102.80.1.23`, that gives it a unique identifier on the public internet
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

And to help with all of this setup – from deploying containers to configuring reverse proxies – there are developer-friendly tools like [Coolify](https://coolify.io). Coolify is an open-source platform that makes it super easy for developers and DevOps teams to:

- Deploy apps in containers
- Set up domains and subdomains
- Configure reverse proxies – all from a clean dashboard, no complex terminal commands needed

![Coolify dashboard example](https://cdn.hashnode.com/res/hashnode/image/upload/v1746979943646/a6525a09-f44a-4e00-a945-7bded3483b0d.jpeg)

All this was set up on ONE SERVER/VM. But here’s the catch: when that one server got overloaded or went down…💥 everything stopped.

That’s why we needed a better way. And that's where **scaling** and **load balancing** came in – to keep apps running smoothly, no matter the traffic.

---

## ⚙️ Azure Virtual Machines (VMs) – The Building Blocks

![Virtual Machine illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1746980948928/eb6a7fb2-7432-42ed-8cbd-bff6c8250d4e.jpeg)

When it comes to running apps in the cloud, **Virtual Machines (VMs)** are the basic building blocks – kind of like renting an apartment in a giant digital skyscraper.

You don’t need to buy the whole building (aka physical servers), you just rent the space you need, when you need it.

### What Exactly Is a Virtual Machine?

A Virtual Machine is a software-based computer that runs inside a real, physical computer (a server) – hosted in a data center, like those run by Microsoft Azure.

It looks and behaves like a normal computer:

- It has an operating system (Windows, Linux)
- You can install apps
- It has memory (RAM), storage (disks), and CPU

But the best part? You don’t need to worry about the hardware. Azure takes care of that behind the scenes – all you do is say:

> “Hey Azure, give me a Linux VM with 4GB RAM and 2 CPUs.”

And boom 💥 — it spins up in minutes.

### Why Use a VM?

Let’s say you’ve built a web app – it’s just a simple blog. You want to deploy it and make it accessible to the world.

Here's what you can do with a VM:

- Set it up with your favorite OS (for example, Ubuntu)
- Install web servers like Nginx or Apache
- Deploy your app
- Bind it to your domain name
- Let the world visit your blog at [`myawesomeblog.com`](http://myawesomeblog.com)

It’s your own personal environment – no sharing, full control.

---

## 📈 The Need for Scaling – Vertical vs Horizontal

Imagine your app is growing. At first, it’s just a few users. Then a few hundred. Then thousands are logging in, placing orders, chatting, uploading photos – all at once 😮

Suddenly, your server (VM) is under pressure. It’s like trying to pour a flood through a straw.

### So, What Do You Do When One Server Isn’t Enough?

This is where scaling comes in – the art of upgrading your app’s infrastructure to keep up with traffic.

There are two main ways to scale:

#### 🧱 Option 1: Vertical Scaling (aka Scaling Up)

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

#### 🧩 Option 2: Horizontal Scaling (aka Scaling Out)

Instead of boosting one server, you add more servers – multiple VMs running copies of your app.

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

- Needs something to split traffic between VMs – Load Balancers
- More expensive. You end up paying the original amount for 1 VM (for example $30) for the number of VMs you provide – if you provide 3 VMs at $30 each, you end up paying $90 at the end of the month

:::

### Quick Real-World Example

Let’s say you’ve launched an e-commerce site for sneakers 👟 Traffic spikes during a big sale? Your vertical scaling (bigger VM) might choke.

But with horizontal scaling:

- You spin up 5 VMs across different regions
- Traffic is shared between them
- If one VM slows down, others handle the load

#### So, remember 👇🏾

| Scaling Type | Description | Pros | Cons |
| --- | --- | --- | --- |
| 🧱 Vertical Scaling | Make 1 VM more powerful (adding more CPU power, SSD, RAM, bandwidth, and so on) | Easy setup, fewer changes | Hardware limits, 1 point of failure - If that 1 server/VM goes down, so does your app |
| 🧩 Horizontal Scaling | Add more VMs to handle traffic | Flexible, reliable | Needs traffic distribution logic (Load Balancer). Usually more expensive (the price of 1 VM times the number of VMs) |

---

## 🔁 Azure Virtual Machine Scale Sets (VMSS) – Scaling Made Simple

Okay – so we’ve talked about **horizontal scaling**: adding multiple VMs to handle growing traffic. Sounds great, right?

But here’s the thing: manually spinning up and configuring 5, 10, or 100 VMs... every time your app gets busy? Yeah, that’s not fun 🙃

### Enter: Virtual Machine Scale Sets (VMSS)

VMSS is Azure’s way of automating horizontal scaling. Instead of creating each VM one by one, you define a template, and Azure takes care of the rest:

- How many VMs to start with
- How to configure them (OS, apps, settings) ⚙️
- When to add or remove VMs based on traffic 📈📉

### A Simple Analogy 🧃

Think of VMSS like a juice dispenser at a party:

- At first, it pours into 2 cups (VMs)
- If 10 guests show up? It starts filling 5 cups
- Party slows down? Back to 2 cups again

You never have to refill manually – the dispenser adjusts on its own. 🎉

### How It Works (Without the Jargon 😌)

1. **You set the rules:** “If CPU usage goes above 70%, add 2 more VMs.”
2. **Azure watches traffic and adjusts the number of VMs** automatically.
3. **All VMs are identical** – like clones, all running the same app setup.
4. **It works with Azure Load Balancer** to spread traffic across all these VMs smoothly.

### Real-Life Example: Food Delivery App 🍕📱

You’ve built an app where users order food. During lunch and dinner, traffic explodes.

::: tip With VMSS:

- You start with 3 VMs in the morning
- At 12PM, Azure sees high CPU usage, so it spins up 5 more VMs
- At 3PM, traffic drops, so Azure removes the extra VMs

:::

You only pay for what you use. And users get a smooth experience – no delays, no crashes 👌🏾

![Auto-scaling illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1746982520998/7fe3c997-fc8f-418a-861b-e999905ca43c.png)

---

## 📦 Azure Load Balancer – Spreading the Traffic

By now, you know that your app can live on multiple Virtual Machines (VMs), and that you can scale them easily using Virtual Machine Scale Sets (VMSS).

But here's the big question: when users start accessing your app – hundreds, even thousands at once – how do you make sure that all that traffic is fairly and efficiently distributed across those VMs?

You don’t want one VM to be overwhelmed while others are just chilling. You need a middleman – something smart enough to balance the load.

That’s where **Azure Load Balancer** steps in. It’s Azure’s way of saying, “Don’t worry, I got this” when traffic starts rolling in.

### 🏢 So, What Is Azure Load Balancer?

Azure Load Balancer is a **traffic director**. It takes incoming traffic from the internet (or even internal sources within your network) and intelligently spreads it across multiple backend machines – usually VMs.

It's like having a well-trained receptionist who routes every customer to the next available agent, so no one waits too long and no one gets overwhelmed 😃.

And the best part? This entire process happens in the background – fast, silent, and seamless. Users visiting your app have no idea a traffic manager is working behind the scenes. They just see a fast, responsive experience.

### 🌐 The Frontend IP – Your App’s Public Face

Every Azure Load Balancer is tied to a **Frontend IP**, which is basically the public IP address of your application – the one users connect to when they open `www.yourapp.com`.

This IP acts as the entry point. All user traffic comes through it first. But the Load Balancer doesn’t actually run your app. Instead, it accepts the traffic and forwards it to one of the VMs in the backend pool (we’ll get to that shortly).

You can configure this Frontend IP to be either public (accessible over the internet) or private (used for internal traffic within your cloud network – say, between microservices or internal tools).

![Frontend IP address illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1747055268951/5afbb738-d00d-4f49-9709-2fa1fe7cffdd.png)

### 🗂️ Backend Pool – Where the Magic Happens

Behind every Azure Load Balancer is a **backend pool** – a group of VMs (or VM Scale Set instances) where your actual app is running. These are the real workers, doing all the heavy lifting.

When traffic hits the Frontend IP, the Load Balancer takes that request and hands it off to one of the VMs in the backend pool.

But it doesn’t just randomly pick one. It checks a few things first – like whether the VM is healthy, whether it's already busy, and what rules you’ve set.

Each VM in the pool typically runs the same app or service. This means any of them can handle any incoming request, which is what makes load balancing possible in the first place.

![Backend pool illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1747055337014/e831056d-7c0c-49d9-b05a-6d3dbe3edc76.png)

### 🩺 Health Probes – Keeping Tabs on the VMs

Now, how does the Load Balancer know which VM is healthy or not? This is where **health probes** come in. Think of them as regular check-ups.

You configure the Load Balancer to periodically "ping" each VM – maybe by hitting a specific URL (like `/health`) or a certain port (like 80 for HTTP). If a VM doesn’t respond correctly, Azure marks it as unhealthy and temporarily removes it from the rotation.

This ensures users never get routed to a broken or unresponsive instance of your app. And once the VM becomes healthy again, it's automatically added back to the pool.

### ⚖️ Load Balancing Rules – Who Gets What?

Next, we have **Load Balancing Rules**. These are the instructions that tell Azure Load Balancer exactly how to behave.

You can define rules like:

- “Forward all HTTP (port 80) traffic to backend pool VMs on port 80”
- “Forward HTTPS (port 443) traffic to VMs on port 443”
- “Only route traffic to healthy VMs”

These rules make Azure Load Balancer highly customizable. You get to decide how traffic flows, which protocols to support, and how to handle backend ports. It's like customizing the rules of a relay race – who gets the baton and when.

### 👟 Real-World Example: Sneaker Sale Rush

Imagine you're running an online sneaker store at `www.sneakerblast.com`. You’re launching a flash sale, and thousands of users are hitting your website all at once.

Thanks to your Azure Load Balancer, here’s what happens:

1. All those users land on your Frontend IP, the public face of your site.
2. The Load Balancer accepts the traffic and checks the health probes of all VMs in the backend pool.
3. Based on its rules, it forwards each user to a healthy, available VM.
4. One VM might serve a user in Lagos, another in Nairobi, another in Accra – all seamlessly.

If one VM crashes or lags? The Load Balancer detects it instantly and stops routing traffic to it until it’s back online.

That’s smooth traffic management without any manual effort.

---

## 🍴 Azure Application Gateway – Smart Routing for Modern Apps

So far, we’ve seen how Azure Load Balancer helps you split traffic across multiple VMs running a single service – like a monolithic app or a web frontend.

Let’s say you have a web application deployed on a VM. It listens on port 80, and you’ve scaled it into 3 instances. The Azure Load Balancer takes requests from the internet and spreads them across all 3 instances of the same service. Easy, right?

You can even link the Load Balancer’s public IP address to your domain – like `mydomain.com` – so users can visit your site normally.

### 🧠 But What If You Have *Multiple* Services?

Now imagine you’ve gone beyond just one app. You’re building something more modern, like a set of microservices.

You now have:

- A payment service listening on port 5000
- An authentication service on port 6000
- A purchase service on port 7000

All deployed across the same VMs (or Virtual Machine Scale Set), just on different ports.

Here’s the problem: an Azure Load Balancer is designed to route traffic to *one* backend pool – basically one service – on one port. If you tie it to `mydomain.com`, it can only send traffic to one of your microservices. 😬

So… what do you do?

You might think: “Let me just create a separate Load Balancer for each service!” 🤕

But that means:

- You’ll have to pay for multiple load balancers
- You’ll end up managing 3–5 public IP addresses
- You might even need to buy multiple domains like `mypayment.com`, `myauth.com`, and so on to route users properly

Yikes. That’s impractical, messy, *and* expensive 😖💸

### 🎉 Enter Azure Application Gateway

**Azure Application Gateway** solves this problem beautifully. It’s designed to route traffic intelligently – not just to one service, but to multiple services using just one gateway.

It works like this:

1. You create one public-facing frontend IP (like `52.160.100.5`)
2. You link that IP address to your main domain, for example `mydomain.com`
3. Then, you define multiple backend pools – one for each service:
    - Payment service (port 5000)
    - Auth service (port 6000)
    - Purchase service (port 7000)
4. Next, you set up routing rules that decide how to forward each request.

### ✨ Two Ways to Route with Application Gateway

You can configure **smart routing** based on:

- **URL paths**:
  - `mydomain.com/payment` → Payment service
  - `mydomain.com/auth` → Auth service
- **Subdomains** (host headers):
  - `payment.mydomain.com` → Payment service
  - `auth.mydomain.com` → Auth service

This way, all your services share one public IP and one domain – super clean, super efficient 🙌🏾

### 🤓 Real-Life Scenario (Let’s Break It Down)

Let’s say you’re building a startup platform that has three key microservices:

- **Payment service** that handles transactions
- **Authentication service** that handles login and user identity
- **Purchase service** that manages product ordering

Each service is containerized and deployed on the same VM (or across several VMs using a VM Scale Set). But – and this is key – they all listen on **different ports** inside the VMs:

- Payment → port 3000
- Auth → port 6000
- Purchase → port 7000

Now, without a smart routing solution, you’d be stuck trying to expose just one of these services using a standard Azure Load Balancer. But you need all three to be accessible from the internet – and you don’t want to pay for or manage 3 different Load Balancers 😅

So, what do you do?

### 🧠 Using Azure Application Gateway to Route Traffic Intelligently

Here's how you can fix this using **one** Application Gateway:

1. Deploy your microservices inside each VM:
    - Each service runs on a specific port
    - All VMs in your scale set are identical (they contain all three services)
2. Create backend pools in Application Gateway:
    - A backend pool for the payment service (pointing to port 3000 on all VMs)
    - One for the auth service (port 6000)
    - Another for the purchase service (port 7000)
3. Create routing rules:
    - Option A (Path-based routing):
      - Requests to `mydomain.com/payment` → go to the payment backend pool
      - Requests to `mydomain.com/auth` → go to the auth backend pool
      - Requests to `mydomain.com/purchase` → go to the purchase backend pool
    - Option B (Subdomain-based routing):
      - `payment.mydomain.com` → payment service
      - `auth.mydomain.com` → auth service
      - `purchase.mydomain.com` → purchase service

You just tell the Application Gateway: “Hey, if a request comes in for this URL or subdomain, send it to this port on these VMs.” And it does just that – consistently and intelligently 🔁

### 📦 So, What’s Really Happening?

Imagine a user visits `mydomain.com/auth`. Here’s what goes on behind the scenes:

1. The DNS translates `mydomain.com` to your Application Gateway’s public IP
2. The Gateway receives the request
3. It checks your routing rules
4. It sees that `/auth` should go to the backend pool for port 6000
5. It forwards the request to one of the VMs running the auth service
6. The response goes back to the user – fast and seamless ✨

This happens in milliseconds, for every request. And because the Application Gateway is aware of multiple ports and services, it can handle routing logic that a regular Load Balancer just can’t do.

![Application Gateway Illustration](https://cdn.hashnode.com/res/hashnode/image/upload/v1747056436345/7ea97231-d2ee-4f63-aff1-50595e7c06e0.png)

---

## 🔍 Azure Load Balancer vs Azure Application Gateway

By now, you've seen how both tools help route traffic in Azure – but they solve different problems.

Let’s break down how they compare, and when you should use one over the other 👇🏾

### 🛣️ 1. Routing Logic

#### Azure Load Balancer

It simply distributes incoming traffic evenly across a pool of VMs. It doesn’t care *what* the request is – it just balances the load.

Imagine a delivery guy who doesn't ask questions – he just drops each package at the next available house.

That’s what Azure Load Balancer does: it sends traffic to one of your servers without looking inside the request.

#### Azure Application Gateway

This is the smart one. It looks at *what’s inside* each request (like the URL path or domain) and makes intelligent decisions.

Just like a smarter delivery guy who looks at the address and decides where to go: "Oh! This one is for the payment office, not the main office."

That’s what Application Gateway does: it reads the request (like the URL or domain name) and sends it to the right place according to the routing rules.

### 🌐 2. Protocols Handled

#### Load Balancer

Works at the transport layer (Layer 4 in the OSI model). It deals with TCP/UDP traffic – raw network traffic, like HTTP, video streaming, games, and so on.

#### Application Gateway

Works at the application layer (Layer 7). It handles web traffic only – like websites and apps (HTTP/HTTPS) – and it can actually read what's being asked, like:

- “Go to /login”
- “Go to <FontIcon icon="fas fa-globe"/>`payment.mydomain.com`”.

TL;DR: Load Balancer just pushes packets. App Gateway actually *reads* your web requests.

### 🔁 3. Use Case Scenarios

| Situation | Best Choice |
| --- | --- |
| You have one big app and just want to spread users across servers | ✅ Load Balancer |
| You have multiple services (like login, payment, and so on) and need to send users to the right one | ✅ Application Gateway |
| You want to use subdomains (like [login.mysite.com](http://login.mysite.com)) | ✅ Application Gateway |
| You want to secure your website with HTTPS and Web Application Firewall (WAF) | ✅ Application Gateway |
| You want the simplest setup and lowest cost | ✅ Load Balancer |

### 🔐 4. SSL Termination & Security Features

**Load Balancer** doesn’t handle security stuff. You’ll need to secure each server yourself (for example, set up HTTPS on each one).

**Application Gateway** can secure everything in one place – you upload your SSL certificate once and it takes care of HTTPS for all services.

It can also protect you from hackers and bad traffic with something called **WAF (Web Application Firewall)**, which protects your app from threats like SQL injection, XSS, and so on (you need to set this up manually).

### 💰 5. Pricing and Complexity

**Load Balancer** is cheaper and easier to set up. Great when you don’t need anything fancy.

**Application Gateway** costs more, but gives you more control and less headache when working with complex apps and microservices.

Trying to use Load Balancer for multiple services? You’ll need to create one Load Balancer per service, which becomes costly and impractical.

### 🧠 Summary Table

| Feature | Load Balancer | Application Gateway |
| --- | --- | --- |
| Can it understand the request? | ❌ No | ✅ Yes |
| Can it route based on URL or subdomain? | ❌ No | ✅ Yes |
| Can it handle secure HTTPS traffic? | ❌ No | ✅ Yes |
| Is it good for simple apps? | ✅ Yes | ✅ Yes |
| Is it good for complex apps with many services? | ❌ No | ✅ Yes |
| Cost | 💲 Lower | 💰 Higher |

---

## 🧭 Use Cases: When to Use Each One

There’s no one-size-fits-all when it comes to hosting apps in the cloud. The right setup depends on what you’re building, how much traffic you expect, and how complex your app is.

Let’s walk through 4 different use-case scenarios, starting from the most basic setup all the way to a fully auto-scaled and smartly routed architecture.

### 1️⃣ Single VM Instance – For Small Projects or Internal Tools

::: important Use this when:

You're just getting started. You’ve built a small app – maybe a portfolio, a blog, or a side project – and you want to make it live, OR You’re a startup that just launched.

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
- No auto-scaling – performance may drop with traffic spikes (the only way to adapt to increased CPU/memory usage due to traffic inflow is via manually scaling the VM vertically)
- You manually maintain and monitor everything

:::

### 2️⃣ Manual Horizontal Scaling – For Apps With Medium, Predictable Traffic

::: important Use this when:

Your app is growing – maybe you have a few thousand users now, and performance matters. You want more than one server so your app doesn’t crash during busy hours.

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

- You must manually add or remove VMs – which takes effort
- Still need to monitor performance manually
- No built-in automation or auto-healing

:::

### 3️⃣ Auto-Scaling with VM Scale Sets + Azure Load Balancer – For Apps With Spiky or Unpredictable Traffic

::: important Use this when:

You’re building something more serious – traffic comes in waves (for example, a fitness/coach booking app), and you don’t want to sit around scaling VMs all day. You want Azure to automatically scale your infrastructure for you.

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

- Automatic scaling – saves time and money
- High availability: VMs can be replaced if one fails
- Easy to grow as your user base grows

@tab Cons:

- Works best if your app is monolithic (one big service)
- No support for routing traffic to specific services – just spreads traffic across VMs
- Load Balancer can’t look at URL paths or subdomains

:::

### 4️⃣ VM Scale Set + Azure Application Gateway – For Microservices or Complex Web Apps

::: important Use this when:

You have a modern, multi-service app – maybe built with microservices. Each service (like payments, authentication, search, and so on) lives on a different port or even in a container.

You want to route traffic smartly – like `/login` goes to the auth service, `/pay` to payments, and `/search` to the search service – all on the same domain.

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

### 🧠 Quick Summary Table

| Setup | Best For | Scaling | Routing Logic | Cost | Ease |
| --- | --- | --- | --- | --- | --- |
| ☁️ Single VM | Small sites, personal apps | ❌ (Manual) | ❌ One app only | 💲 (Lowest) | ⭐⭐⭐⭐ |
| 🧱 Manual Horizontal Scaling + Load Balancer | Mid-size apps, predictable traffic | ✅ (Manual) | ❌ One app only | 💲💲💲 (due to multiple VMs running at once without down-scaling — even with no traffic) | ⭐⭐ (due to manual scaling) |
| 🔁 VMSS + Load Balancer | Busy apps, spiky traffic | ✅ (Auto) | ❌ One app only | 💲💲 | ⭐⭐⭐ |
| 🍴 VMSS + App Gateway | Microservices, modern apps | ✅ (Auto) | ✅ Smart routing (involving multiple microservices) | 💲💲💲💲(Highest) | ⭐⭐ |

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
