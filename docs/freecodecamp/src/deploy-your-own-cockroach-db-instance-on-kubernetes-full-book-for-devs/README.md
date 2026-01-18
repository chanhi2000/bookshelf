---
lang: en-US
title: "How to Deploy Your Own Cockroach DB  Instance on Kubernetes [Full Book for Devs]"
description: "Article(s) > How to Deploy Your Own Cockroach DB  Instance on Kubernetes [Full Book for Devs]"
icon: iconfont icon-cockroach-db
category:
  - Data Science
  - CockroachDB
  - DevOps
  - Kubernetes
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - cockroachdb
  - cockroach-db
  - devops
  - k8s
  - kubernetes
  - google
  - google-cloud
  - gcp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Deploy Your Own Cockroach DB  Instance on Kubernetes [Full Book for Devs]"
    - property: og:description
      content: "How to Deploy Your Own Cockroach DB  Instance on Kubernetes [Full Book for Devs]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploy-your-own-cockroach-db-instance-on-kubernetes-full-book-for-devs/
prev: /data-science/cockroach/articles/README.md
date: 2025-11-26
isOriginal: false
author:
  - name: Prince Onukwili
    url : https://freecodecamp.org/news/author/onukwilip/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764088553942/496bf5f4-f059-4873-b6c1-419a86e594ef.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CockroachDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/cockroach/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Deploy Your Own Cockroach DB  Instance on Kubernetes [Full Book for Devs]"
  desc="Developers are smart, wonderful people, and they’re some of the most logical thinkers you’ll ever meet. But we’re pretty terrible at naming things 😂 Like, what in the world – out of every other possible name, they decided to name a database after a ..."
  url="https://freecodecamp.org/news/deploy-your-own-cockroach-db-instance-on-kubernetes-full-book-for-devs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764088553942/496bf5f4-f059-4873-b6c1-419a86e594ef.png"/>

Developers are smart, wonderful people, and they’re some of the most logical thinkers you’ll ever meet. But we’re pretty terrible at naming things 😂

Like, what in the world – out of every other possible name, they decided to name a database after a *literal cockroach*? 🤣

I mean, I get it: cockroaches are known for being resilient, and the devs were probably trying to say “our database never dies”… but still…a cockroach?

The name aside, out of all the databases out there, you might be wondering why would you choose CockroachDB? And if you did choose it, where would you even start when trying to host and deploy it? Would you go for a managed cloud service? Or could you actually self-manage it?

If you ever thought of doing it yourself – maybe in a dev environment, or even introducing it to your company – how would you go about it?

Well, just calm your nerves 😄

In this book, we’ll explore everything you need to know about **deploying and managing CockroachDB on Kubernetes**. We’ll dive deep into:

- Understanding how CockroachDB’s masterless (multi-primary) architecture actually works
- Setting up and deploying CockroachDB on a Kubernetes cluster
- Automating backups to Google Cloud Storage using just a few queries in the CockroachDB cluster
- Managing service accounts and authentication securely
- Tuning CockroachDB’s memory settings for stable performance
- Scaling the cluster horizontally and vertically without downtime
- Monitoring and maintaining the database like a pro

By the end, you’ll not only understand how CockroachDB works, you’ll be confident enough to deploy and manage your own resilient, production-ready instance. 🚀

---

## Table of Contents

1. [What Even Is CockroachDB? 🤔](#heading-what-even-is-cockroachdb)
2. [Why Choose CockroachDB Over PostgreSQL or MongoDB 🤷🏾‍♂️?](#heading-why-choose-cockroachdb-over-postgresql-or-mongodb)
3. [How CockroachDB Works Behind the Scenes ⚙️](#heading-how-cockroachdb-works-behind-the-scenes)
4. [Where (and How) Should You Host CockroachDB? ☁️](#heading-where-and-how-should-you-host-cockroachdb)
5. [Setting Up Your Local Environment 🧑‍💻](#heading-setting-up-your-local-environment)
6. [Deploying CockroachDB on Minikube (The Fun Part Begins 😁!)](#heading-deploying-cockroachdb-on-minikube-the-fun-part-begins)
7. [Accessing the CockroachDB Console & Viewing Metrics](#heading-accessing-the-cockroachdb-console-amp-viewing-metrics)
8. [Backing Up CockroachDB to Google Cloud Storage ☁️](#heading-backing-up-cockroachdb-to-google-cloud-storage)
9. [Managing Resources & Optimizing Memory Usage](#heading-managing-resources-amp-optimizing-memory-usage)
10. [Scaling CockroachDB the Right Way](#heading-scaling-cockroachdb-the-right-way)
11. [What to Consider When Deploying CockroachDB on Google Kubernetes Engine (GKE) ☁️](#heading-what-to-consider-when-deploying-cockroachdb-on-google-kubernetes-engine-gke)
12. [How to Get a CockroachDB Enterprise License for FREEE!](#heading-how-to-get-a-cockroachdb-enterprise-license-for-free)

---

## What Even Is CockroachDB? 🤔

![An image summarizing what CockroachDB is](https://cdn.hashnode.com/res/hashnode/image/upload/v1760416037885/c67edcbb-be85-4614-bdf3-104942048eea.jpeg)

Hey! before we jump into setting up our Kubernetes cluster and deploying our CockroachDB cluster, let’s get grounded in what CockroachDB really is. (Because if you don’t understand the why and how, the implementation and practical session will just feel like magic 😅.)

### Simple Definition

CockroachDB is a distributed SQL database. This means it gives you the features of a relational database (tables, SQL queries, JOINS, transactions) but copies data across multiple replicas (servers, nodes, instances). No need for sharding manually. 😃

It’s built to survive failures, scale easily (compared to other SQL databases), and keep your data consistent no matter what (across all the instances).

### Who Made CockroachDB? When Was it Released?

CockroachDB was created by [**Cockroach Labs**](https://cockroachlabs.com/), founded by Spencer Kimball, Peter Mattis, and Ben Darnell. The idea first started taking shape around 2014, and by 2015 Cockroach Labs was formally founded.

Its 1.0 “production-ready” version was announced in 2017, marking its transition from beta to being suitable for real-world use.

### What Problems Does CockroachDB Try to Solve?

Traditional relational databases are great, but they run into real challenges when your app grows. CockroachDB was built to solve those. Here are the key pain points and how CockroachDB addresses them:

| Pain Point | What usually happens | How CockroachDB fixes it |
| --- | --- | --- |
| **Single primary bottleneck** | ONLY ONE “primary” node handles writes, updates, and deletes. That node can become difficult to scale (adapt to the DB usage) without downtime | CockroachDB is **multi-primary**, meaning every node can accept reads and writes. No single “primary” for the entire cluster. |
| **Manual sharding complexity** | You have to split data (shard) by hand, decide which piece goes where, and handle cross-shard queries, lots of headache 😖. | CockroachDB automatically partitions data into smaller units (called *ranges*) and moves them around to balance load. |
| **Failover downtime** | If the primary node fails, you need to promote a replica (read-only instance) and switch over. During that time, your app might be down. | Because there’s no single primary, if one of the instances fail, others take over seamlessly (via consensus) without a big outage. |
| **Geographic scaling & latency** | Serving users in different regions is hard — either data is far away (slow) or you must build complex replication logic. | CockroachDB lets you distribute nodes across regions. You can serve local reads/writes while keeping global consistency. |

So instead of fighting your database as it grows, CockroachDB handles much of the hard work for you.

### Key Terms You Should Know (in plain language):

- **Node:** Duplicates or copies of your database. These are also known as replicas. They can be read-only (databases from which data can only be read, for example using SELECT statements), OR read-write (databases from which data can be read, created, updated, and deleted).
- **Replication**: making copies of data on multiple nodes. If one node fails, others still have the data.
- **Raft (consensus algorithm)**: a system that ensures copies (replicas) agree on changes in a safe, reliable way. For example, when you want to write data, Raft ensures that most copies agree before it’s accepted.
- **Sharding / Ranges**: Instead of putting all your data in one big blob, CockroachDB splits it into smaller chunks called *ranges*. Each range is replicated and can move between nodes.
- **Distributed transaction**: a transaction (series of operations) that might touch data stored in different nodes. CockroachDB manages this, so you still get ACID (atomic, consistent, isolated, durable) properties.

### Why the name “CockroachDB”? 😅

You might wonder: *Why name a database after a cockroach?* It sounds weird at first, but there's a reason:

Cockroaches are known for surviving harsh conditions: radiation, natural disasters, and so on. The founders wanted a database that feels almost “impossible to kill,” that can survive node failures, outages, and network splits. The name is a tongue-in-cheek nod to resilience.

---

## Why Choose CockroachDB Over PostgreSQL or MongoDB 🤷🏾‍♂️?

Let’s compare the classic setup (Postgres / MongoDB) to CockroachDB, especially why you might want to go with CockroachDB, and how it helps ease scaling. I’ll also explain some terms to make sure you’re following.

In many setups, when you use Postgres or MongoDB, you’ll often have one “primary” node that handles all writes (that is, inserts, updates, deletes).

Then you have multiple “read replicas” that copy the primary’s data and serve read requests (selects). That works okay – reads can be spread out – but all write traffic goes to that one primary node.

Usually, the primary eventually gets stressed when the write volume grows (for example, more customers create accounts and products on your platform).

You can add more read replicas (horizontal scaling for reads, for example customers trying to view their accounts, or previously created products on your site), but scaling the primary is much harder.

To scale the primary, you often resort to upgrading its resources (CPU, RAM, disk) – that’s vertical scaling – which often needs downtime (shut down the primary database, increase its CPU and RAM, then spin it back up).

Or you’d have to manually shard (split) your data across multiple primaries, route traffic carefully, and manage complexity.

### How Fault Tolerance is Handled in PostgreSQL and MongoDB

When you try to make Postgres (or MongoDB) highly available and fault tolerant in a self-managed setup, you often need two+ read replicas and one primary.

The tricky part is handling what happens when the primary fails (or is taken down temporarily for an upgrade). You need something that can promote a replica to a primary automatically.

In Postgres land, that’s often handled by [<VPIcon icon="iconfont icon-github"/>`patroni/patroni`](https://github.com/patroni/patroni) or [<VPIcon icon="fas fa-globe"/>repmgr](https://repmgr.org/) (tools that handle cluster management, failover, leader election, and so on).

In MongoDB, such logic is part of the **replica set** behavior: it does automatic elections among replicas.

Here are some of the core challenges with that classic model:

- Every write must go to a single primary. If that primary fails or is overloaded, your whole system suffers.
- Scaling reads is easy (add more replicas), but scaling writes is hard.
- Vertical scaling (give more resources to one server) has its cons. If the primary node needs more resources, you might experience some downtime when it’s being scaled up.
- Manual sharding is messy: you decide which piece of data goes to which shard, handle cross-shard queries, and build routing logic. That’s a lot of maintenance and can lead to unexpected issues if not handled properly.
- One service (or load balancer/proxy) points to the primary (for ALL write queries).
- Another service or routing logic handles read queries and can share reads across replicas.
- You might use **HAProxy**, **pgpool-II**, or **pgBouncer** for Postgres to route traffic, do read/write splitting, or manage connection pooling. These are external (not part of the database core) tools you have to configure.

So when the primary fails, Patroni (or repmgr, and so on) will detect it and promote one of the read replicas to be the new primary.

But that promotion, reconfiguration, and traffic rerouting often cause a brief window of downtime (when your primary database node becomes unavailable).

### How CockroachDB Handles It Differently

![A brief look at CockroachDB properties](https://cdn.hashnode.com/res/hashnode/image/upload/v1760416070693/af1ade70-19bb-4e9f-82ec-9711c13d8079.jpeg)

CockroachDB changes the rules:

- **All replicas are equal** for reads *and* writes. You don’t have a special “primary” that handles writes. Every node in the cluster can accept write requests.
- CockroachDB breaks your data into small chunks (ranges) and replicates them across nodes. If you add a new node, data moves around automatically to balance the load.
- Every write is automatically copied to other replicas, and consistency is managed by a protocol (Raft), so you don’t have to build this yourself.
- No manual sharding needed. Because the database handles how data is split and moved, you don’t need to decide how to shard by hand.
- You **don’t need a special service** to route writes vs reads queries. Any node can accept both reads **and** writes.
- During scaling, you don’t have to worry about which node is the primary – because *there is no primary*.
- You can scale your nodes one at a time (rollout style). When one node is being upgraded, the others continue to serve traffic. You won’t hit a downtime window just because you're scaling the “primary.”
- Because there's no replica promotion logic to fight with, there's no moment where a replica needs to be “elevated” to primary – it’s all just nodes continuing to serve.

---

## How CockroachDB Works Behind the Scenes ⚙️

In CockroachDB, there are many moving parts behind the scenes. But they work together, so you don’t have to babysit them. The core ideas, which we’ve mostly already touched on, are:

- Splitting data into pieces (**ranges**)
- Keeping multiple copies of each piece (**replicas/replication**)
- Making sure all copies agree via **Raft consensus**
- Moving pieces around to balance the load (**automatic rebalancing/distribution**)
- Coordinating transactions that might touch many pieces

Let’s go through each of those, one by one.

### Ranges: The Small Pieces of Data

![A little depiction of CockroachDB ranges](https://cdn.hashnode.com/res/hashnode/image/upload/v1760413105037/984f8b5c-bd53-4850-9704-57ce1dcedb80.png)

Imagine you have a giant book of recipes. If you try to carry the whole thing, it’s heavy. So you split the book into smaller booklets, each covering recipes for a certain range of meals: breakfasts, lunches, dinners, desserts.

In CockroachDB, data is split into ranges, which are like those smaller booklets:

- Each range covers a certain block of data (like “all users whose ID is 1-1000”)
- When a range gets too big (like having too many recipes in one booklet) it’s cut/split into two smaller ones. That makes each piece easier to manage.
- If two neighboring ranges have become very small (few recipes), they might be merged (joined) back together so you’re not keeping too many tiny booklets.
- These splits and merges happen automatically, behind the scenes, so the database stays smooth as things grow or shrink.

This chopping helps the system in many ways: moving pieces, copying them, balancing load, recovering from node failures becomes easier.

### Replication: Many Copies for Safety

![Replication of Ranges across multiple Nodes (databases) in CockroachDB](https://cdn.hashnode.com/res/hashnode/image/upload/v1760413678362/a0066780-1360-4511-8fd0-466f54ea2135.jpeg)

Nobody likes losing their work, so you keep backup copies. CockroachDB does this for data as well.

For each range, there are usually 3 copies (replicas) stored on different machines (nodes). If one machine dies, you still have others. ([cockroachlabs.com](https://cockroachlabs.com/docs/stable/architecture/replication-layer?utm_source=chatgpt.com)). And these copies are always kept in sync: when you write something (for example, insert or update), the change is propagated to the other copies.

The database also tolerates failures. If one node goes down, the system detects it and eventually makes a new copy elsewhere to replace it. So the target number of copies is maintained. This gives you fault tolerance: your data stays safe even when parts of your system fail.

### Raft Consensus: How All Copies Agree

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1760415307117/79859a4b-4341-46eb-91d9-cccc3bde9a66.jpeg)

Having copies is useful, but you also need them to agree with each other – like all your recipe booklets have the same content in each copy. The Raft protocol is a way to make sure that happens reliably.

Here’s how Raft works in simple terms:

- Each range has a group of replicas. One of these replicas acts as the **leader**. Others are **followers**.
- All write requests for that range go through the leader. The leader gets the request, then tells followers to record the same change.
- Once most of the copies (a majority) say “yep, we got it,” the change is considered final (committed). Then the leader tells the client, “Done.”
- If the leader stops working (the machine dies or the network fails), the followers notice it (they stop getting regular “I’m alive” messages), then they hold an election to pick a new leader, and the show goes on.
- This way, the system ensures everyone has the same final data and no conflicting changes happen.

So Raft is the agreement protocol that keeps all copies in sync and safe.

### MultiRaft: Keeping Raft Efficient When Things Scale

When you have many ranges (many pieces of the booklets), each range has its own Raft group. That can mean a lot of “are you alive?” messages between nodes, and a lot of overhead. MultiRaft is the trick CockroachDB uses to make this efficient.

MultiRaft groups together Raft work for many ranges that share nodes, so overhead is reduced. Instead of sending separate heartbeat (are you alive?) messages for each range, some of the messages are bundled.

This reduces network chatter and resource waste and helps the database scale smoothly when you have tons of data and many pieces.

### Rebalancing: Movement for Balance

When your ranges are not evenly spread across nodes (machines), some machines are doing way too much work, and some hardly any. That’s not good. So CockroachDB automatically moves pieces around to balance things.

- The system watches how busy each node is (how many ranges it holds, how much data, how much read/write traffic).
- If one node is overloaded, it will move some ranges to other nodes.
- If a node dies, the system notices and makes sure that ranges that were on that node get copied somewhere else so safety (replica count) is maintained.
- If you add a new node, the system starts moving ranges to the new node so its resources are used.

This happens without you having to manually decide “move this here, move that there.”

### Distributed Transactions: Doing Work Across Multiple Ranges

Often, an operation touches multiple ranges. For example, “transfer money from account A (in range 1) to account B (in range 2)”. That must be handled carefully so that either both parts succeed, or neither do.

CockroachDB supports **distributed transactions**, meaning a single transaction can work across many ranges. It uses “intent” writes (temporary placeholders) and once everything is ready, it commits the transaction so it becomes permanent. If something fails, it aborts (cancels) the whole thing. The system ensures atomic behavior: all or nothing.

### How It All Fits Together: Read + Write Flow (What Happens When You Use It)

Let’s picture a write, step by step:

1. Your app sends a write (for example, “add new user”) to any node in the CockroachDB cluster.
2. That node figures out which range(s) are involved (which pieces hold the data you want to write).
3. For each range, the write goes to that range’s leader.
4. The leader writes the change to their own copy, then tells followers to do the same.
5. Once most copies confirm they have the change, the leader declares it “committed” and tells your app, “yes, write done.”
6. If a node is busy or down, others still handle traffic.

Read flow:

- Your app sends a read (for example “get user by ID”) to any node.
- That node checks its copies. If it has a fresh copy, it answers. If not, it asks the node that does.

Everything works so data is correct, up to date, and reliably available even if machines fail or network lags.

### Why This All Matters (Putting It in Plain English)

All these tweaks are important for several key reasons. First of all, because data is chopped into ranges and replicated, no single node is a bottleneck. Also, Raft ensures consensus, so you can trust that data is consistent across all working replicas.

Beyond this, rebalancing is automatic, you don’t have to micromanage shards or worry about nodes drowning in load. And because transactions that touch multiple ranges are coordinated, you can trust ACID properties even in a distributed setup.

---

## Where (and How) Should You Host CockroachDB? ☁️

There isn’t just one “right” way to host CockroachDB. There are a few paths you can pick, each with pros and cons. What you pick depends on cost, control, ease of use, and your risk tolerance.

In this section, we’ll explore:

- Cockroach Labs’ own managed cloud (CockroachDB Cloud)
- “Bring Your Own Cloud” (BYOC) – letting Cockroach Labs manage it inside *your* cloud account
- Hosting via cloud marketplaces (AWS, GCP, Azure)
- Self-hosting / Kubernetes / your own infrastructure
- And notes on DigitalOcean support

Let’s dive in.

### Option 1: CockroachDB Cloud (fully managed by Cockroach Labs)

This is the easiest option if you want to offload operations. You don’t manage nodes (computers, Virtual machines, and so on), upgrades, or backups, as Cockroach Labs handles all that.

**What it offers:**

- You sign up and click “create cluster.”
- Automatic scaling, zero-downtime upgrades, and managed backups.
- It supports multiple cloud providers behind the scenes (you pick region(s)).
- You get tools, APIs, and Terraform integration to automate it.
- They often give free credits to get started.

**Tradeoffs:**

- You have less control over underlying infrastructure, for example Virtual Machines, networking, disks, and so on (you trade control for convenience).
- You pay for the managed service premium.
- You rely on Cockroach Labs’ SLAs, uptime, and support.

If you want, you can check it out here: [<VPIcon icon="iconfont icon-cockroach-db"/>CockroachDB Cloud (managed by Cockroach Labs)](https://cockroachlabs.com/product/cloud/).

### Option 2: Bring Your Own Cloud (BYOC)

This is a middle ground: you keep your cloud environment, but let Cockroach Labs manage the database. It gives you control over infrastructure, billing, network, and so on, while still offloading operational complexity.

**How it works:**

- You run CockroachDB Cloud inside your cloud account (AWS, GCP, and so on).
- Cockroach Labs still handles provisioning, upgrades, backups, and observability. You manage roles, networking, and logs.
- Useful for complying with regulations, keeping data within your cloud folder/account, and using your cloud discounts.

**Tradeoffs:**

- You still need to set up cloud aspects (VPCs, IAM, roles) correctly.
- There’s more complexity than pure managed, but more control as well.
- Cockroach Labs needs access to certain parts of your account (permissions).

If you want to explore BYOC, you can read more here: [<VPIcon icon="iconfont icon-cockroach-db"/>CockroachDB Bring Your Own Cloud](https://cockroachlabs.com/product/cloud/bring-your-own-cloud/).

### Option 3: Use Cloud Marketplaces (AWS, GCP, Azure)

If you already use a cloud provider, sometimes the easiest way is to deploy via their marketplace offerings. It gives you familiarity, billing simplicity, and so on.

- **GCP Marketplace**: CockroachDB is available on the Google Cloud Marketplace, making it easier to deploy within your GCP environment. You can learn more here: [<VPIcon icon="iconfont icon-gcp"/>GCP Marketplace](https://console.cloud.google.com/marketplace/product/cockroachdb-public/cockroachdb).
- **AWS Marketplace**: CockroachDB is listed there: [<VPIcon icon="fa-brands fa-aws"/>AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-n3xpypxea63du).
- **Azure Marketplace**: Also supported for Azure deployments (SaaS/managed listings): [<VPIcon icon="iconfont icon-microsoftazure"/>Azure Marketplace](https://marketplace.microsoft.com/en-us/product/saas/cockroachlabs1586448087626.cockroachdb-azure?tab=overview).
- **DigitalOcean**: There is support for CockroachDB deployment on DigitalOcean using their infrastructure: [<VPIcon icon="iconfont icon-cockroach-db"/>Deploy CockroachDB on DigitalOcean](https://cockroachlabs.com/docs/stable/deploy-cockroachdb-on-digital-ocean).

These options let you stay in your cloud console, use your existing cloud accounts, and integrate with other resources you already have.

But you're still responsible for certain operational tasks (networking, security, monitoring, backups) depending on how the marketplace offering is configured.

### Option 4 (My Favorite 😁): Self-Hosting — Especially Using Kubernetes

If you self-host CockroachDB, you get **full control**. You’re the boss of everything: the machines, storage, networking, backups, upgrades, monitoring – all of it.

What’s even better is that using Kubernetes means your setup isn’t tied to one cloud provider. You can run it on AWS, GCP, Azure, or even on-premises later, with very little change. Kubernetes gives you a “portable infra” layer.

Managed CockroachDB services charge you extra for “maintenance, upgrades, backup, etc.” – those are baked into the price. But when you self-host, you accept the burden, but also avoid paying that extra margin. You pay for compute, disks, network, and your time/ops work.

You can also self-host in the cloud (using cloud VMs) but still manage every layer: disks, network, security, and so on. Using Kubernetes, there is a sweet middle ground: you get cloud reliability for VMs, but you fully control everything above that.

#### Why Kubernetes Beats Tools Like Docker Swarm or Hashicorp Nomad for Databases

Because CockroachDB is a **stateful** system (it holds data), you need strong support for “data that stays even when a pod restarts or moves.” Kubernetes is designed with good primitives for that. Other tools don’t always shine there.

Here’s the comparison in simple terms:

- **Docker Swarm / Docker Compose:** Great for stateless apps (web servers, APIs), but when it comes to databases, it struggles. Swarm doesn’t natively support persistent volume claims at a cluster level, so if a container (database replica) moves to a different node (VM), it might lose access to its storage. Devs often pin containers to specific nodes manually to avoid this.
- **Nomad:** More flexible and simpler in some ways, but it’s not as rich in features around connectivity, storage management, and built-in tooling for containers. It works well in mixed workloads, but handling complex databases usually means you need to build extra layers.
- **Kubernetes:** It has built-in support for stateful workloads:
  - **StatefulSets (Properly managing data for each database):** This ensures that each CockroachDB replica (pod) keeps its identity and storage intact even if the pod restarts. So the database replica doesn’t lose its “name” or data when things change.
  - **Persistent volumes and persistent volume claims (external disks):** These are like dedicated hard drives or disks attached to pods (database replicas). Even if a pod moves, crashes, or restarts, the disk (data) stays. Kubernetes makes sure the data stays safe.
  - **StorageClasses (choose your disk):** You can customize the disks in which your data will be stored, that is:
    - HDD (most affordable, but slower),
    - Balanced Disk (SSD enabled, a balance between costs and speed),
    - Fast SSD (Very fast, recommended by the CockroachDB team, but a bit more expensive than a Balanced Disk).
    - Rolling updates, anti-affinity, (No Downtime, High Availability, Fault tolerance).<br/>Anti-affinity means you can tell Kubernetes, “don’t put more than one CockroachDB replica on the same VM or physical machine.” This protects you if one VM goes bad, other replicas are safe.
    - Rolling updates let you update one replica at a time (configuration, version, resources) without bringing down the whole cluster. While one replica updates, others serve traffic. That helps avoid downtime.
    - Kubernetes also has ordered start/stop for replicas (via StatefulSets) so things are predictable and safe
  - **Vertical vs horizontal scaling (earlier talk – reminder)** You remember we talked about scaling in prior sections:
    - **Horizontal scaling** means adding more replicas (more pods, more nodes) so load spreads out.
    - **Vertical scaling** means increasing the resources (CPU, RAM, disk) of existing nodes/replicas.<br/>In tools like Nomad or Docker Swarm, vertical scaling tends to be harder, often involves stopping services, shutting things down, and restarting VMs, which causes downtime.

Kubernetes makes vertical and horizontal scaling easier at the pod level (you can resize one pod CPU + RAM) and manage rolling upgrades so you don’t take everything down at once.

You can also add more database replicas to the cluster easily (to balance load and make the database process queries faster), and the data is automatically copied to the new database replica (replication), especially when you use the official CockroachDB Helm Chart.

#### Why Other Tools (Swarm / Nomad / Docker Compose) Don’t Match Up Here

Docker Swarm and Docker Compose are simpler to use and are good when you don’t have much complexity. But they lack robust features for stable storage, default support for replication, vertical scaling, horizontal scaling of stateful services, and so on. For example, Swarm doesn’t have built-in StatefulSets or dynamic volume provisioning like Kubernetes.

Nomad is more flexible than Swarm in some ways, but many users say storage plugins (CSI) are weaker than what Kubernetes has. Also, less built-in for ordering things, rolling updates for stateful apps.

So while these work fine for simpler apps (stateless services, small apps), when you have a distributed stateful SQL database like CockroachDB, Kubernetes gives you more safety, more control, less chance of data loss or misconfiguration.

Because of all this, running CockroachDB on Kubernetes gives you the tools you need baked in, reducing how much custom plumbing you must write yourself.

#### Trade-offs (things to watch out for)

- You have to manage everything: backups, monitoring the ENTIRE CockroachDB cluster, withstanding failures (fault tolerance), and upgrades. That’s work 🥲.
- You need to know your way around infra (VMs, disks, networking, and inter-node connections) and operations (or have teammates who do – DevOps Engineers, Cloud Architects, Site Reliability Engineers).
- Using managed Kubernetes (like GKE, EKS, AKS) helps as you offload the control plane. You still manage the nodes, storage, and higher layers.
- But even with that, you avoid paying for “database management as a service” markup – you're only paying for infrastructure plus your time.

---

## Setting Up Your Local Environment 🧑‍💻

Alright, we’ve learned quite a bit so far: what CockroachDB is, how it works behind the scenes, and where you can host it. Now, it’s time to roll up our sleeves and get our hands dirty with some practical setup.

Before we deploy CockroachDB, we need a safe “playground” where we can test and experiment without touching the cloud or spending a dime.

### Why these tools?

Before we jump into running commands, here’s a quick lookup of what tools we’ll use and why:

- **Minikube**: A tool that runs a small Kubernetes cluster on your computer. It gives you a local “mini cloud” where you can deploy and experiment.
- **Kubectl**: The command line tool you’ll use to talk to your Kubernetes cluster to deploy apps, check status, and manage resources.
- **Helm**: A package manager for Kubernetes. It helps you install complex applications (like CockroachDB) with fewer manual steps.

### Step 1: Install Minikube

#### What is Minikube?

Minikube is a lightweight tool that helps you run a small Kubernetes cluster on your personal computer.

Think of it as your own mini-cloud environment where you can test, deploy, and learn Kubernetes (and in our case, CockroachDB) locally. It’s perfect for learning and experimenting before deploying on the cloud.

Here’s how to get it on different operating systems:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

1. Make sure you have a hypervisor (VirtualBox, Hyper-V) or Docker installed.
2. Open PowerShell as Administrator.
3. Run:

```sh
choco install minikube
# or use
winget install minikube
```

After installation, check the version:

```sh
minikube version
```

If it returns a version number, you’re good 👍🏾

If you don’t have the `choco` or `winget` package manager, you can install Minikube via PowerShell by following the steps in the [<VPIcon icon="iconfont icon-minikube"/>docs](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download).

@tab <VPIcon icon="iconfont icon-macos"/>

1. Ensure you have Homebrew installed.
2. In Terminal, run:

```sh
brew install minikube
```

Start the cluster:

```sh
minikube start
```

Verify:

```sh
minikube version
```

@tab <VPIcon icon="fa-brands fa-linux"/>

1. Ensure you’re on a supported distribution (Ubuntu, Fedora, and so on) and virtualization (Docker, KVM, and so on) is enabled.
2. Run:

```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64
```

Start the cluster:

```sh
minikube start
```

Verify:

```sh
minikube status
```

:::

✅ At this point you should have a local Kubernetes cluster up and running on your machine! Next, we’ll install Kubectl so you can talk to the cluster from your command line.

### Step 2: Install kubectl

#### What kubectl does

kubectl is the command-line tool that lets you talk to your Kubernetes cluster. Using it, you can deploy applications, check your cluster’s health, and manage resources inside your cluster.

You’ll use it a lot when working with Kubernetes on Minikube and later when you deploy CockroachDB.

Here’s how to install it on Windows, macOS, and Linux:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

1. Open PowerShell as Administrator.
2. Run:

```sh
choco install kubernetes-cli
# or if you prefer:
choco install kubectl
```

Then check the version:

```sh
kubectl version --client
```

If it prints a version number, you’re good.

@tab <VPIcon icon="iconfont icon-macos"/>

1. Open Terminal.
2. If you have Homebrew installed, run:

```sh
brew install kubectl
```

Check the version:

```sh
kubectl version --client
```

That should show something like “Client Version: v1.x.x”.

@tab <VPIcon icon="fa-brands fa-linux"/>

1. Open your terminal.
2. Download the latest kubectl binary:

```sh
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

Make it executable and move it into your PATH:

```sh
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl
```

Verify:

```sh
kubectl version --client
```

:::

After this, you’ll have `kubectl` installed and ready to use with your local Minikube cluster. Next up we’ll install Helm, which will make deploying CockroachDB much easier.

### Step 3: Install Helm

Helm is basically the package manager for Kubernetes. Think of it like how you use `apt`, `yum`, or `brew` to install software on your computer. Helm does something similar for Kubernetes apps.

With Kubernetes, deploying a full app often means writing lots of configs (manifests – Deployments, Services, PersistentVolumes, ConfigMaps, and so on). Helm lets us bundle all of that into a single “package” (called a chart) so we don’t have to manually create the resources one-after-the-other (which could be hectic to manage btw 😖).

Because our goal is to deploy a pretty complex system (CockroachDB) on Kubernetes – which includes stateful nodes, persistent storage, networking, SSL/TLS, and so on – using a Helm chart makes it *so much easier* than crafting dozens of YAML files from scratch.

So before we install CockroachDB, we’ll install Helm. This gives us the toolkit to deploy and manage our cluster much more easily.

Let’s install Helm on each platform. After this, you’ll have the `helm` command ready to deploy apps into your Kubernetes cluster.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

1. Open PowerShell as Administrator.
2. If you have Chocolatey installed, run:

```sh
choco install kubernetes-helm
# Alternatively:
choco install helm
```

Confirm installation:

```sh
helm version
```

You should see something like `version.BuildInfo{Version:"v3.x.x",…}`.

@tab <VPIcon icon="iconfont icon-macos"/>

1. Open Terminal.
2. With Homebrew installed, run:

```sh
brew install helm
```

Verify:

```sh
helm version
```

If you see version info, you’re good.

@tab <VPIcon icon="fa-brands fa-linux"/>

1. Open your terminal.
2. Download and install the binary (example for the latest version):

```sh
curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
chmod 700 get_helm.sh
./get_helm.sh
```

Or you can directly download the binary and move it into your `PATH`.

Check version:

```sh
helm version
```

:::

✅ After this, you have `helm` installed and you’re ready to use it.

In the next part, we’ll use Helm to install CockroachDB into your local Minikube cluster. We’ll add the CockroachDB chart, configure it, and spin up a multi-node replica setup right on your PC.

---

## Deploying CockroachDB on Minikube (The Fun Part Begins 😁!)

Before we go to the cloud, we’ll deploy CockroachDB locally on Minikube using Helm.

This process will help us:

- Understand how CockroachDB runs in a cluster
- Learn how Kubernetes manages database replicas
- Gain hands-on experience before deploying to the cloud

### Step 1: Visit ArtifactHub

**ArtifactHub** is like an App Store for Kubernetes Helm Charts – a huge collection of open-source Helm charts and packages you can easily install.

1. Go to [<VPIcon icon="fas fa-globe"/>artifacthub.io](https://artifacthub.io)
2. In the search bar, type **CockroachDB**
3. Click the **CockroachDB Helm chart** result (you’ll see it published by *Cockroach Labs*).

You’ll see something like this 👇🏾

![The official CockroachDB Helm chart](https://cdn.hashnode.com/res/hashnode/image/upload/v1760848079912/1778bbcf-088a-4919-80bb-ca24241ffa85.png)

### Step 2: Explore the Helm Chart

You’ll notice a lot of information on the page:

- **README**: the documentation for installing and customizing CockroachDB
- **Default Values**: all the settings that define how the database runs

Don’t worry if it looks overwhelming. We’ll walk through it together 😉

### Step 3: Copy the Default Values

Every Helm chart has a *default configuration* file. These defaults are usually too advanced or too heavy for local setups, so we’ll create our own lighter version. But first, let’s copy the original for reference.

1. On the CockroachDB chart page, click the **Default Values** button.
2. A modal window will pop up showing a long YAML file.
3. Click the **Copy** icon in the top-right corner to copy all the default values.

![The Default Values button description](https://cdn.hashnode.com/res/hashnode/image/upload/v1760848210119/17cd734b-6d7c-40dc-a8c3-f01c85edd7a7.png)

![Copy the default values](https://cdn.hashnode.com/res/hashnode/image/upload/v1760848520060/1e1ce249-0cf0-46cb-abbc-00efb3ea1343.png)

### Step 4: Create a Folder for Our Project

We’ll keep everything organized in a single folder.

```sh
mkdir cockroachdb-tutorial
cd cockroachdb-tutorial
```

Inside this folder, create a new file called:

```sh
nano cockroachdb-original-values.yml
```

Now paste all the default values you copied earlier (use <kbd>Ctrl</kbd>+<kbd>V</kbd> or right-click → Paste), then save and exit (<kbd>Ctrl</kbd>+<kbd>O</kbd>, then <kbd>Ctrl</kbd>+<kbd>X</kbd> in nano).

If you’re on Windows, just open Notepad/VSCode, paste the content, and save the file in the same folder.

### Step 5: Understanding the Key Configurations

Let’s break down a few important values you’ll notice in the file.

#### 🧩 `statefulset.replicas`

This tells CockroachDB how many database nodes (replicas) to run in the cluster. By default, it’s set to 3, meaning you’ll have 3 independent database instances that can all read and write data.

#### ⚙️ `statefulset.resources.requests` and `statefulset.resources.limits`

These settings tell Kubernetes how much CPU and memory to give CockroachDB.

- `requests`: the minimum guaranteed amount
- `limits`: the maximum allowed amount

CockroachDB can be a bit greedy with memory 😅, so limits make sure it doesn’t take everything and leave no room for other apps.

#### 💾 `storage.persistentVolume.size`

This defines how much disk space each CockroachDB node gets. For example, if you set it to `10Gi` and you have 3 replicas, total usage = `30Gi`.

#### 💽 `storage.persistentVolume.storageClass`

This defines the type of disk to use:

- `standard`: HDD (cheap but slow)
- `standard-rwo`: SSD (faster and affordable)
- `pd-ssd` or `fast-ssd`: NVMe (super fast but pricey)

You can check available storage classes in your Minikube cluster using:

```sh
kubectl get sc
```

On Minikube, the default storage class is usually `standard`.

You can learn more about [<VPIcon icon="iconfont icon-gcp"/>Google Cloud storage classes here](https://cloud.google.com/kubernetes-engine/docs/concepts/storage-overview).

#### 🔐 `tls.enabled`

This controls whether CockroachDB requires **TLS certificates** for secure connections.

If `true`, you’ll need to generate certificates for any app or client that connects to your cluster (instead of using a username and password). This is **strongly recommended for production**, but for our local Minikube setup, we’ll disable it so it’s easier to play around and test connections.

### Step 6: Create a Simplified Values Config for the CockroachDB Helm Chart

We’ll now create a new config file with lighter resource settings for our local test environment.

In the same folder, create:

```sh
nano cockroachdb-values.yml
```

Then paste this:

```yaml title="cockroachdb-values.yml"
statefulset:
  replicas: 3
  podSecurityContext:
    fsGroup: 1000
    runAsUser: 1000
    runAsGroup: 1000
  resources:
    requests:
      memory: "1Gi" # You should have 3GB+ of RAM free on your device; else, you can reduce this to 500Mi (this will result in your PC needing just 1.5 GB of RAM free)
      cpu: 1  # The same with this, you can reduce it to 500m CPU if you don't have up to 3 CPU cores (1 CPU core * 3 replicas)
    limits:
      memory: "1Gi"
      cpu: 1
  podAntiAffinity:
    type: ""
  nodeSelector:
    kubernetes.io/hostname: minikube

storage:
  persistentVolume:
    size: 5Gi # Make sure you have 15GB+ of free storage on your local machine, if not, you can reduce it to 2 - 3 Gi
    storageClass: standard

tls:
  enabled: false

init:
  jobs:
    wait:
      enabled: true
```

Setting the `requests` and `limits` to the same value ensures Kubernetes won’t terminate CockroachDB pods due to high memory or CPU usage.

You can [<VPIcon icon="iconfont icon-k8s"/>read more about this here](https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/).

### Overview of the YAML values

Now, let’s understand the content of the <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-values.yml` file together

`podSecurityContext` – why you needed it on Minikube:

```yaml title="cockroachdb-values.yml"
podSecurityContext:
  fsGroup: 1000
  runAsUser: 1000
  runAsGroup: 1000
```

This block sets the Linux user and group IDs that the CockroachDB process runs as inside the container, and the group ownership for mounted files.

Why this matters, simply:

- The CockroachDB process runs as **UID 1000** inside the container. If the disk mount (the persistent volume) is owned by a different UID, Cockroach can’t create files there and fails with `permission denied`.
- `runAsUser` and `runAsGroup` make the container process run as UID/GID 1000.
- `fsGroup` makes the mounted volume be accessible to that group, so the process can write to `/cockroach/cockroach-data`.

In short, these lines make sure the DB process has permission to create and write files on the mounted disk (volume), which is especially important on Minikube and other local setups where host-mounted storage can have odd permissions.

`podAntiAffinity` and `nodeSelector` – what they do:

```yaml title="cockroachdb-values.yml"
podAntiAffinity:
  type: ""

nodeSelector:
  kubernetes.io/hostname: minikube
```

`podAntiAffinity` is the default behavior. Normally this tells Kubernetes to *spread* pods across different nodes (VMs), so replicas don’t run on the same physical machine. This is good for high availability, because one node failing won’t kill multiple replicas.

By setting `type: ""` (empty), you **disabled** that spreading rule, so Kubernetes can place multiple CockroachDB replicas on the same node.

`nodeSelector` tells Kubernetes to schedule pods only on nodes that match the label you set (here `kubernetes.io/hostname: minikube`). That forces all pods to run on the node named `minikube`.

Quick summary of the effect:

- Good for local testing on a multi-node Minikube cluster, when only one node has properly mounted writable storage.
- **Not recommended for production**, because it places all replicas on the same machine (single point of failure).

PS: If you’re using another Kubernetes cluster provider, for example K3s, Kind, and so on… this might not get deployed due to the nodeSelector property targeting `minikube` nodes. So, I'd advise removing the `nodeSelector` property entirely.

```yaml title="cockroachdb-values.yml"
# ...
nodeSelector:
    kubernetes.io/hostname: minikube
# ...
```

✅ **At this point**, we’ve:

- Copied the default CockroachDB Helm chart configuration
- Created a lightweight version for Minikube
- Learned what each key property means

### 🚀 Step 7: Install the CockroachDB Cluster Using Helm

Great job so far! You’ve created your <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-values.yml` file and set up your custom configuration for Minikube. Now we’ll actually deploy the cluster.

#### What we’re going to do

We’ll use Helm to install the official CockroachDB Helm chart using our custom values. This will spin up your 3-node cluster locally so you can play with it.

#### Command to run

```sh
helm install crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

::: info Here:

- `crdb` is the name we’re giving this release (you can pick something else if you like).
- `cockroachdb/cockroachdb` tells Helm which chart to use.
- `-f cockroachdb-values.yml` tells Helm to use our custom file instead of default values.

:::

#### After the command runs

After a little while the command completes, and you’ll see output telling you what resources were created (pods, services, persistent volume claims, and so on).

![The CockroachDB Helm Chart post-installation message](https://cdn.hashnode.com/res/hashnode/image/upload/v1761386160496/babc3e67-1ea9-4aa1-b6a7-516fe3a9972a.png)

Now to check if everything is working, do this:

```sh
kubectl get pods | grep -i crdb
```

This filters pods with “crdb” in the name (our release prefix).

You should see something like:

![The CockroachDB replicas running successfully](https://cdn.hashnode.com/res/hashnode/image/upload/v1761386195190/21469ce5-c909-4336-ba5f-a4c4a776a470.png)

The three primary pods (`0`, `1`, `2`) should be in `Running` state. The `init` job or pod (`crdb-cockroachdb-init-xxx`) should show `Completed`. This means the initialization tasks (cluster bootstrap) succeeded.

If you see that, congratulations! You’ve got your local CockroachDB cluster up and running! 🎉

---

## Accessing the CockroachDB Console & Viewing Metrics

Alright! Now that our CockroachDB cluster is up and running, let’s take a peek behind the scenes and explore the CockroachDB Admin Console. It’s a beautiful web dashboard that helps us visualize everything happening in our database cluster.

In this section, we’ll learn how to:

- Access the CockroachDB admin console right from your browser 🖥️
- Understand what each built-in dashboard shows (CPU, memory, disk, SQL performance)
- Confirm that our cluster is healthy and that all 3 nodes are working together perfectly

### Step 1: Locate the CockroachDB Public Service

CockroachDB automatically creates a **public service** that allows us to connect to the database and also access its dashboard.

Let’s check it out by running:

```sh
kubectl get svc | grep -i crdb
#
# crdb-cockroachdb-public   ClusterIP   10.x.x.x   <none>   26257/TCP,8080/TCP   ...
```

This service (`crdb-cockroachdb-public`) is what we’ll use to connect to both:

- The **database** itself (via port 26257)
- The **dashboard UI** (via port 8080)

### Step 2: Learn More About the Service

Let’s dig a little deeper to understand it:

```sh
kubectl describe svc crdb-cockroachdb-public
```

Here’s what you’ll notice:

- **Port 26257** is used for **gRPC connections** (this is how applications connect to send and receive SQL queries).
- **Port 8080** is used for the **web dashboard**, where we can view metrics and monitor performance.

![Description of the `crdb-cockroachdb-public` service](https://cdn.hashnode.com/res/hashnode/image/upload/v1761387757614/dab8cfd0-2d89-45b0-a54f-41e530f1a6ab.png)

### Step 3: Access the CockroachDB Dashboard

Now, let’s make the dashboard available on your local computer. Run this command:

```sh
kubectl port-forward svc/crdb-cockroachdb-public 8080:8080
```

This command simply tells Kubernetes:

> “Hey, please open a tunnel from my local computer’s port 8080 to the CockroachDB service’s port 8080 in the cluster.”

Once you see something like:

![Result of port-forwarding the `crdb-cockroachdb-public` service on port 8080](https://cdn.hashnode.com/res/hashnode/image/upload/v1761387838362/186ff222-c643-4e67-b0a4-dbaff8777977.png)

...you’re good to go!

### Step 4: Visit the Dashboard

Now, open your browser and go to `http://localhost:8080`. You’ll see the CockroachDB Admin Console. This is your central command center for monitoring your cluster

Here, you’ll be able to view:

- **Number of replicas (nodes)**: You should see 3 in our setup.
- **RAM usage** per node: Helps track how much memory each CockroachDB instance is using.
- **CPU usage**: Useful to know when your database is getting busy.
- **Disk space**: Shows how much data your cluster is storing and how much free space remains.

Here’s what your dashboard might look like 👇🏾

![The CockroachDB dashboard UI on `http://localhost:8080`](https://cdn.hashnode.com/res/hashnode/image/upload/v1761387968743/327288e5-4811-42bf-8fd8-74ed187792a4.png)

### Step 5: Exploring the Metrics Dashboard

Now that you’re inside the CockroachDB Admin Console (`http://localhost:8080`), let’s take things a step further by exploring the **Metrics** section. This is where CockroachDB really shines.

On the left-hand side, click on “Metrics.” Here, you’ll find a collection of dashboards showing how your database is performing behind the scenes, things like query activity, performance, memory use, and much more.

These metrics help you understand what’s happening inside your cluster and make data-driven decisions – like when to scale up, optimize queries, or add more nodes.

We’ll start by focusing on some of the most insightful ones, such as:

- **SQL Queries Per Second**: how busy your database is
- **Service Latency (SQL Statements, 99th percentile)**: how fast or slow your queries are

Then, we’ll also look at others like SQL Contention, Replicas per Node, and Capacity to get a complete view of your CockroachDB cluster’s health.

Here’s what each of these metrics means in simple, everyday terms 👇🏾

#### SQL Queries Per Second

This metric shows the number of SQL commands (like `SELECT`, `INSERT`, `UPDATE`, `DELETE`) your database cluster is handling every second. In simpler words, it’s how busy your database is. Imagine cars passing through a toll booth – this is the count of cars per second.

This is useful to know because if this number is steadily climbing, your system is getting more traffic or work. You may need to scale up (more nodes, more resources) or optimize queries. If it drops suddenly, something might be wrong (traffic drop, and so on).

Look for a stable or expected value for your workload. Spikes or sustained high values mean you should check performance.

#### Service Latency: SQL Statements, 99th percentile

This metric shows the time it takes (for the slowest ~1 % of queries) from when the database gets the request until it finishes executing it. Think of waiting in a queue: 99% percentile is what the slowest people (1 in 100) experienced.

You’ll want to know this because if the slowest queries are taking too long, it might signal a bottleneck (CPU, disk, network, and so on). Low latency = good user experience.

So keep an eye out: if this value rises (gets worse) over time, investigate what’s slowing down. If it stays low and stable, you’re in good shape.

#### SQL Statement Contention

Statement contention demonstrates the number of SQL queries that got “stuck” or had to wait because other queries were using the same data or resources. This is like if two people were trying to grab the same book – one has to wait. That waiting is contention.

High contention means your database is chasing conflicts, waiting for locks or resources. This slows things down overall. So you’ll want to keep this number as low as possible. If it starts rising, you might need to revisit your schema, queries, or scale differently.

#### Replicas per Node

This tells you how many copies (“replicas”) of data ranges live on each database node. If you imagine your data is like documents saved in several safes (nodes), this shows how many copies are in each safe.

This matters, because you want balanced replicas so no node is overloaded with too many copies (which can slow it down or put it at risk).

To check on this, make sure nodes have roughly equal replica counts. If one node has many more replicas, you might need to rebalance or add nodes.

#### Capacity

Capacity shows how much disk/storage your cluster has (total), how much is used, and how much is free. Imagine a warehouse: it’s like how many boxes you can store, how many you’ve filled, and how much empty space remains.

You’ll need to know this, because if capacity is nearly full, you risk running out of space which can cause downtime or performance issues.

Free space should stay healthy (for example less than ~80% used). If it crosses that, plan to add storage or nodes.

#### Why These Matter Together

When you combine these metrics, you get a clear picture:

- High Queries Per Second + high latency = maybe you're under-powered.
- High contention = your workload design might be fighting itself.
- Imbalanced replicas or full capacity = infrastructure issues.
- Stable low latency + balanced replicas + plenty of capacity = sounds like a healthy cluster.

So by keeping an eye on these, you make data-driven decisions: when to scale, when to optimize, when to tweak configs.

### Step 6: Creating a Little Load on the CockroachDB Cluster

So far, we’ve explored the CockroachDB dashboard and understood what each metric means. Now, let’s make things a bit more fun. 🎉

In this part, we’ll run a simple Python app that connects to our CockroachDB cluster and performs a few database operations (creating, updating, deleting, and retrieving some records). This will help us generate a small load on the database so we can actually see the metrics in action.

Here’s what we’ll be doing step-by-step 👇🏾

#### Step 6.1: Create a ConfigMap for Our Books Data

We’ll first create a list of 20 books that our Python script will interact with. Each book will have basic info like name, author, genre, pages, and price.

##### 1. Create a new file called <VPIcon icon="iconfont icon-json"/>`books.json`

::: details <VPIcon icon="fa-brands fa-linux"/>

```sh
nano books.json
```

Paste the below JSON content into it.

```json :collapsed-lines title="books.json"
[
  {
    "name": "The Bright Signal",
    "author": "Ava Hart",
    "isbn": "9783218196000",
    "published_year": 2020,
    "pages": 234,
    "genre": "Fantasy",
    "price": 10.99
  }, {
    "name": "The Hidden Library",
    "author": "Liam Stone",
    "isbn": "9783863794026",
    "published_year": 1993,
    "pages": 358,
    "genre": "Romance",
    "price": 30.2
  }, {
    "name": "The Shadow Archive",
    "author": "Maya Chen",
    "isbn": "9781615594078",
    "published_year": 2001,
    "pages": 404,
    "genre": "History",
    "price": 16.21
  }, {
    "name": "The Bright Voyage",
    "author": "Noah Rivers",
    "isbn": "9785931034133",
    "published_year": 1987,
    "pages": 507,
    "genre": "Fantasy",
    "price": 13.14
  }, {
    "name": "The Shadow Garden",
    "author": "Zara Malik",
    "isbn": "9785534192834",
    "published_year": 2004,
    "pages": 404,
    "genre": "Sci-Fi",
    "price": 28.13
  }, {
    "name": "The Crystal Signal",
    "author": "Ethan Brooks",
    "isbn": "9785030564135",
    "published_year": 2009,
    "pages": 508,
    "genre": "Self-Help",
    "price": 20.79
  }, {
    "name": "The Atomic Atlas",
    "author": "Iris Park",
    "isbn": "9787242388493",
    "published_year": 2025,
    "pages": 442,
    "genre": "Romance",
    "price": 18.5
  }, {
    "name": "The First Library",
    "author": "Caleb Nguyen",
    "isbn": "9787101226911",
    "published_year": 2017,
    "pages": 528,
    "genre": "Romance",
    "price": 24.47
  }, {
    "name": "The Crystal River",
    "author": "Sofia Diaz",
    "isbn": "9781845146276",
    "published_year": 2004,
    "pages": 599,
    "genre": "Fiction",
    "price": 31.15
  }, {
    "name": "The Crystal Archive",
    "author": "Jude Bennett",
    "isbn": "9784893252883",
    "published_year": 1996,
    "pages": 632,
    "genre": "Fiction",
    "price": 40.47
  }, {
    "name": "The Last Compass",
    "author": "Nina Volkova",
    "isbn": "9784303911713",
    "published_year": 2018,
    "pages": 451,
    "genre": "History",
    "price": 29.53
  }, {
    "name": "The Crystal Garden",
    "author": "Omar Haddad",
    "isbn": "9784896383461",
    "published_year": 1988,
    "pages": 251,
    "genre": "Thriller",
    "price": 36.38
  }, {
    "name": "The Silent Signal",
    "author": "Priya Kapoor",
    "isbn": "9781509839308",
    "published_year": 2008,
    "pages": 649,
    "genre": "Fantasy",
    "price": 28.05
  }, {
    "name": "The Hidden Compass",
    "author": "Felix Romero",
    "isbn": "9781834738291",
    "published_year": 2025,
    "pages": 180,
    "genre": "Self-Help",
    "price": 19.15
  }, {
    "name": "The Lost Signal",
    "author": "Tara Quinn",
    "isbn": "9781165667017",
    "published_year": 2010,
    "pages": 368,
    "genre": "Fiction",
    "price": 41.37
  }, {
    "name": "The Last Signal",
    "author": "Hana Sato",
    "isbn": "9783387262476",
    "published_year": 2005,
    "pages": 467,
    "genre": "Nonfiction",
    "price": 42.01
  }, {
    "name": "The Crystal Archive",
    "author": "Leo Fischer",
    "isbn": "9780801326776",
    "published_year": 1984,
    "pages": 573,
    "genre": "Nonfiction",
    "price": 42.31
  }, {
    "name": "The Hidden Atlas",
    "author": "Mila Novak",
    "isbn": "9784746872343",
    "published_year": 2005,
    "pages": 180,
    "genre": "Nonfiction",
    "price": 16.58
  }, {
    "name": "The Hidden Compass",
    "author": "Arthur Wells",
    "isbn": "9780097882086",
    "published_year": 1983,
    "pages": 713,
    "genre": "Fantasy",
    "price": 39.42
  }, {
    "name": "The Silent Atlas",
    "author": "Selene Ortiz",
    "isbn": "9781939909169",
    "published_year": 1991,
    "pages": 190,
    "genre": "Self-Help",
    "price": 33.79
  }
]
```

To save and close the file in nano:

- Press <kbd>Ctrl</kbd>+<kbd>O</kbd> → then <kbd>Enter</kbd> (to save)
- Press <kbd>CTRL</kbd>+<kbd>X</kbd> (to exit the editor)

:::

##### 2. Then create a ConfigMap from the file:

```sh
kubectl create configmap books-json --from-file=books.json
```

#### Step 6.2: Create the Python Script ConfigMap

Next, we’ll create a simple Python script that:

- Creates a new table for books
- Inserts 20 records
- Updates 7 of them
- Deletes 5
- Retrieves 15 books from the database

It’s like simulating a small library app. 📚

Create a new file called <VPIcon icon="iconfont icon-yaml"/>`books-script.yml` and paste the content below:

```yaml :collapsed-lines title="books-script.yml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: books-script
data:
  run.py: |
    #!/usr/bin/env python3
    import argparse
    import json
    import os
    import sys
    import time
    from typing import List, Dict

    import psycopg
    from psycopg.rows import dict_row

    DDL = """
    CREATE TABLE IF NOT EXISTS books (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name STRING NOT NULL,
        author STRING NOT NULL,
        isbn STRING UNIQUE,
        published_year INT4,
        pages INT4,
        genre STRING,
        price DECIMAL(10,2),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    """

    INSERT_SQL = """
    INSERT INTO books (name, author, isbn, published_year, pages, genre, price)
    VALUES (%s, %s, %s, %s, %s, %s, %s);
    """

    UPDATE_SQL = """
    UPDATE books
    SET price = %s, pages = %s
    WHERE isbn = %s;
    """

    DELETE_SQL = """
    DELETE FROM books
    WHERE isbn = %s;
    """

    GET_SQL = """
    SELECT id, name, author, isbn, published_year, pages, genre, price, created_at
    FROM books
    WHERE isbn = %s;
    """

    def load_books(path: str) -> List[Dict]:
        with open(path, "r") as f:
            return json.load(f)

    def connect_with_retry(dsn: str, attempts: int = 30, delay: float = 2.0):
        last_exc = None
        for _ in range(attempts):
            try:
                conn = psycopg.connect(dsn, autocommit=False)
                return conn
            except Exception as e:
                last_exc = e
                time.sleep(delay)
        raise last_exc

    def main():
        ap = argparse.ArgumentParser()
        ap.add_argument("--dsn", required=True, help="Postgres/CockroachDB DSN")
        ap.add_argument("--json", default="/app/books.json", help="Path to books JSON")
        args = ap.parse_args()

        books = load_books(args.json)
        print(f"Loaded {len(books)} books")

        conn = connect_with_retry(args.dsn)
        conn.row_factory = dict_row
        try:
            with conn:
                with conn.cursor() as cur:
                    print("Creating table...")
                    cur.execute(DDL)

                    print("Inserting 20 books...")
                    for b in books[:20]:
                        cur.execute(INSERT_SQL, (
                            b["name"], b["author"], b["isbn"],
                            b.get("published_year"), b.get("pages"),
                            b.get("genre"), b.get("price"),
                        ))

                    print("Updating 7 books...")
                    for b in books[:7]:
                        new_price = round(float(b.get("price", 10)) + 1.23, 2)
                        new_pages = int(b.get("pages", 100)) + 5
                        cur.execute(UPDATE_SQL, (new_price, new_pages, b["isbn"]))

                    print("Deleting 5 books...")
                    for b in books[-5:]:
                        cur.execute(DELETE_SQL, (b["isbn"],))

                    print("Performing 15 retrievals...")
                    for b in books[:15]:
                        cur.execute(GET_SQL, (b["isbn"],))
                        row = cur.fetchone()
                        if row:
                            print(f"GET {b['isbn']}: {row['name']} by {row['author']} (${row['price']})")
                        else:
                            print(f"GET {b['isbn']}: not found (possibly deleted)")

            print("All operations completed.")
        finally:
            conn.close()

    if __name__ == "__main__":
        main()
```

This script connects to the CockroachDB cluster, creates a table (if it doesn’t exist), and performs all those operations in sequence.

It runs around 50 SQL queries in total – a mix of `INSERT`, `UPDATE`, `DELETE`, and `SELECT` statements.

Now apply it:

```sh
kubectl apply -f books-script.yml
```

#### Step 6.3: Create the Job to Run the Script

Next, let’s create a Kubernetes Job that will actually run our Python script inside a container.

Create a file called <VPIcon icon="iconfont icon-yaml"/>`books-job.yml` and paste the manifest below:

```yaml title="books-script.yml"
apiVersion: batch/v1
kind: Job
metadata:
  name: books-job
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: runner
          image: python:3.12-slim
          env:
            - name: CRDB_DSN
              value: "postgresql://root@crdb-cockroachdb-public:26257/defaultdb?sslmode=disable"
          command: ["bash", "-lc"]
          args:
            - |
              pip install --no-cache-dir "psycopg[binary]>=3.1,<3.3" && \
              python /app/run.py --dsn "$CRDB_DSN" --json /app/books.json
          volumeMounts:
            - name: script
              mountPath: /app/run.py
              subPath: run.py
            - name: books
              mountPath: /app/books.json
              subPath: books.json
      volumes:
        - name: script
          configMap:
            name: books-script
            defaultMode: 0555
        - name: books
          configMap:
            name: books-json
```

Here’s what’s happening:

- The Job runs a container based on Python 3.12-slim.
- It connects to CockroachDB using the connection string `postgresql://root@crdb-cockroachdb-public:26257/defaultdb?sslmode=disable`. Notice how `sslmode=disable`: this is because we disabled TLS in our Helm values earlier.
- The Job mounts the two ConfigMaps we created earlier (`books-json` and `books-script`) as **volumes** inside the container. Think of volumes like small external drives that the container can read from.

Apply it:

```sh
kubectl apply -f books-job.yml
```

#### Step 6.4: Check if the Job Ran Successfully

After a minute or two, check your pods:

```sh
kubectl get po
```

If you see `books-job-xxx` with the status **Completed**, then your script ran successfully 🎉

That means our database just got a nice little workout – some records were created, updated, deleted, and read.

![The Completed state of the Books Job](https://cdn.hashnode.com/res/hashnode/image/upload/v1761460118429/99ed49a3-52e9-4357-ba2b-9295f0dfbdc8.png)

### Step 7: Viewing the Metrics from the Load

Now that we’ve generated a small load, let’s jump back to the CockroachDB dashboard.

Head to the Metrics section, and under SQL Queries Per Second, you should see a little spike: this shows the activity from our Python job.👇🏾

![The SQL Queries Per Second Metric](https://cdn.hashnode.com/res/hashnode/image/upload/v1761460175366/6c1e129e-c8bd-4f41-89de-60a1a753026e.png)

Hover your mouse over the graph lines to see exact numbers.

Do the same for Service Latency: SQL Statements (99th percentile). You’ll notice a few bumps showing how long some of the queries took.👇🏾

![The Service Latency Metric](https://cdn.hashnode.com/res/hashnode/image/upload/v1761460224971/8ba9d5ed-0724-4dc6-82f4-7e5d0d05be82.png)

This small experiment gives you a real feel for how CockroachDB reacts under activity, even a tiny one.

To explore more metrics and dashboards, check out the [official CockroachDB documentation here](https://cockroachlabs.com/docs/stable/ui-overview-dashboard).

### Step 8: View the List of Created Items in the Database

Now that our Python job ran and touched the database (creating, updating, deleting, retrieving records), let’s check the content of our `books` table just to verify everything really happened.

First, we’ll create another Kubernetes job (or pod) that connects to our CockroachDB cluster and runs a simple SQL query `SELECT * FROM books;`. This pulls out all the remaining records in the table.

Here’s the manifest to use. Create a file named <VPIcon icon="iconfont icon-yaml"/>`view-books.yml` and paste the below content inside it:

```yaml title="view-books.yml"
apiVersion: batch/v1
kind: Job
metadata:
  name: view-books
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: client
          image: cockroachdb/cockroach:v25.3.2
          command: ["bash", "-lc"]
          args:
            - |
              cockroach sql \
                --insecure \
                --host=crdb-cockroachdb-public:26257 \
                --database=defaultdb \
                --format=records \
                --execute="SELECT * FROM public.books;"
```

Note: We use `sslmode=disable` because we turned off TLS in our Minikube config. This job mounts nothing fancy. It just spins up, connects to the database, runs the `SELECT`, and displays the result.

Run the job:

```sh
kubectl apply -f view-books.yml
```

Wait a minute, then check the pod status:

```sh
kubectl get po
```

Look for something like `books-client-job-xxx` in **Completed** state.

Finally, view the job logs to see the actual records:

```sh
kubectl logs view-books
```

You’ll see output similar to the below:

![The list of created books in the books table in the CockroachDB database](https://cdn.hashnode.com/res/hashnode/image/upload/v1761462270132/c881eca7-18b0-4647-a6b1-2841e7774969.png)

---

## Backing Up CockroachDB to Google Cloud Storage ☁️

In this section we’ll explain how you can automate backups of your CockroachDB cluster using simple SQL commands, service accounts (for authenticating to Google Cloud), and Google Cloud Storage (where the data will be stored).

### Why Backups Are Absolutely Critical

Imagine you’ve built your cluster on Kubernetes, and everything’s humming along for weeks or months. You’ve got tens or hundreds of gigabytes of data and 10k+ users relying on it.

Then **BAM!** Something happens. Maybe someone accidentally overwrote the Helm release (`helm upgrade --install …` with the same release name, for example `crdb`), or a cloud disk got deleted, or a critical node failed and you lose the majority of data replicas. That’s the nightmare we all dread 😭.

Mistakes happen, even if you’re super careful. What matters most is: How fast and easily could you recover?

That’s why we’ll set up **daily backups** of our CockroachDB cluster, targeting a Google Cloud Storage bucket. (Quick note: Google Cloud Object Storage is a service where you can store large amounts of data in the cloud as “objects”. You can grab, store, and retrieve data from it, just like Google Drive or Apple Storage. 😃)

With your backups going into a storage bucket, if disaster strikes, you can restore the entire cluster (or specific databases/tables) in minutes or hours – instead of days or losing data forever.

### Connecting to Our DB – Installing Beekeeper Studio

So far, we’ve been connecting to our database programmatically, running commands from pods or jobs inside Kubernetes. But what if there was a *more visual* and *user-friendly* way to explore our data?

Well, meet my friend **Beekeeper Studio.** 🙂

Beekeeper Studio is a sleek, open-source database management tool that lets you connect to a wide range of databases like PostgreSQL, MySQL, SQLite, and (most importantly for us) CockroachDB.

It comes with a simple, modern interface for running queries, browsing tables, and viewing data – no need to jump into pods or remember command-line flags 😄

### How to Install Beekeeper Studio

1. Visit the official Beekeeper Studio download page here: [<VPIcon icon="fas fa-globe"/>beekeeperstudio.io/get](https://beekeeperstudio.io/get)
2. Click the “Skip to the download” link. You’ll see something like this:

![Finding the Button to Skip to the DOwnload page on the Beekeeper Studio website](https://cdn.hashnode.com/res/hashnode/image/upload/v1761542821015/2e7a0fd5-7047-4090-97fb-46b81a3dd638.png)

3. You’ll be redirected to a page listing download options for different operating systems.

![Page to select download option according to the user OS](https://cdn.hashnode.com/res/hashnode/image/upload/v1761542877590/6034dcf0-d9b0-447b-bd2b-089458729db7.png)

4. Choose your OS and download the correct installer.
5. Afterwards, install the downloaded Beekeeper Studio software according to your OS

### Connecting Beekeeper Studio to CockroachDB

Now that we’ve installed Beekeeper Studio, it’s time to connect it to our CockroachDB cluster running inside Minikube

But before we jump in, here’s something important to note:👇🏾

::: note

Our CockroachDB cluster is running INSIDE Kubernetes, and by default, it’s not accessible from outside the cluster.

:::

To confirm this, run:

```sh
kubectl get svc crdb-cockroachdb-public
```

You should see something like this 👇🏾

![The CockroachDB service being of type ClusterIP](https://cdn.hashnode.com/res/hashnode/image/upload/v1761544640270/2cf9f8f1-15f1-459b-acd0-63b1c361fa54.png)

Notice the **CLUSTER-IP** column. That means the service can only be accessed by other pods INSIDE the Minikube cluster – not from your laptop or external apps

### Exposing the Cluster for Local Access

To make our database accessible from your local machine (so Beekeeper Studio can reach it), we’ll use **Kubernetes Port Forwarding**.

In a new terminal tab, run:

```sh
kubectl port-forward svc/crdb-cockroachdb-public 26257
```

This command tells Kubernetes to forward your local port 26257 to CockroachDB service’s port 26257 inside the cluster.

Once it’s running, your CockroachDB instance will now be accessible from `localhost:26257`.

::: note

it’s not accessible via your browser because this isn’t an HTTP endpoint 😅

:::

### 🐝 Connecting via Beekeeper Studio

1. Open Beekeeper Studio.
2. Click on the dropdown that says “Select a connection type…”.
3. Choose CockroachDB from the list.

![Selecting CockroachDB as a connection type in Beekeeper Studio](https://cdn.hashnode.com/res/hashnode/image/upload/v1761544886889/98443b46-574d-4bcc-a41c-d2daa7412201.png)

4. In the connection window that pops up:
    - Disable the `Enable SSL` option.
    - Set User to `root`
    - Set Default Database to `defaultdb`
    - Host to `localhost`
    - Port to `26257`
5. Now click **Test** (bottom right corner). You should see a success message like *Connection looks good*.

Your setup should look like this: 👇🏾

![Connecting to the CockroachDB cluster from the Beekeeper Studio software](https://cdn.hashnode.com/res/hashnode/image/upload/v1761544818021/0248173e-9969-433c-a9d4-e83684bf34cf.png)

Finally, click Connect (right beside the Test button).

### Verify the Connection

Once connected, you’ll land on a clean workspace where you can run SQL queries.

To confirm you’re connected to the right cluster, run:

```sql
SELECT * FROM books;
```

You should see a table containing about 15 books (the same ones we inserted earlier):

![List of books in the CockroachDB database](https://cdn.hashnode.com/res/hashnode/image/upload/v1761545094817/99ef4415-bd0d-4452-817f-380996485397.png)

And there you go. You’ve now connected Beekeeper Studio to your CockroachDB running inside Minikube! 🚀

### Creating a Google Cloud Account

Before we can back up our CockroachDB data to Google Cloud Storage, we need to have a Google Cloud account ready.

#### Step 1: Visit the Google Cloud Console

Head over to 👉🏾 [<VPIcon icon="iconfont icon-gcp"/>console.cloud.google.com](https://console.cloud.google.com)

If you don’t have a Google account yet, don’t worry. The process is simple and self-explanatory once you visit the site. You’ll be guided to create a Google account first, and then your Google Cloud account.

#### Step 2: Create or Use a Project

Once you’re in the Google Cloud Console, you’ll either:

- Use the **default project** that was automatically created for you, **or**
- Create a new one by clicking on **“New Project”** and naming it `crdb-tutorial`.

![Creating a new Project in our Google Cloud account](https://cdn.hashnode.com/res/hashnode/image/upload/v1761546797213/295c7b09-9bb8-4c34-85cf-8701242b2768.png)

Projects are like folders that contain all your Google Cloud resources: compute instances, storage buckets, databases, and more.

#### Step 3: Link a Billing Account (Optional but Recommended)

If you already have a billing account, link it to your project.

If not, you can easily create one by [<VPIcon icon="iconfont icon-gcp"/>following Google’s instructions here](https://docs.cloud.google.com/billing/docs/how-to/create-billing-account). (You’ll need a valid Debit or Credit card.)

Don’t worry if your card doesn’t link right away. Sometimes Google’s billing system can be picky. 😅

Here’s a quick fix that usually works:

1. Add your card to Google Pay first.
2. Then go to Google Subscriptions in your Google account, and link it to your Google Billing Account.

To add your card via Google Subscriptions, [<VPIcon icon="fa-brands fa-google"/>visit here](https://myaccount.google.com/payments-and-subscriptions). (You need to have a Google account first. Don’t worry, the site will direct you on what to do if you don’t.)

You’ll see a page like this:👇🏾

![Adding a card to Google Subscriptions](https://cdn.hashnode.com/res/hashnode/image/upload/v1761546938934/9e983134-dd7e-49b1-85a7-cd12bd01bf67.png)

Click Manage payment methods, then add your card details.

Once you’ve done that, refresh your Google Billing Account page – you should now see your card as one of the available options.

### Creating a Google Cloud Storage Bucket

Now that we’ve set up our Google Cloud account and enabled billing, let’s create a Cloud Storage Bucket. This is simply a location (like an online folder) where our CockroachDB backup files will be stored.

In your Google Cloud console, type “storage” in the search bar at the top. From the dropdown results, click on “Cloud Storage”:

![Navigating to the Cloud Storage page](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089121918/c737c3e1-e45f-48e1-aed9-99e273583425.png)

On the new page, click on the “Buckets” link in the side menu, then click the “Create Bucket” button.

![Creating a new Bucket in Cloud Storage](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089164660/8b9336fc-c0c3-4811-ab98-d3538596ee5a.png)

Give your bucket a unique name, like `cockroachdb-backup`-. For example, `cockroachdb-backup-i8wu`, `cockroachdb-backup-7gw8u`. The random characters ensure your bucket name is unique globally (no other Google Cloud user will have the same name).

Scroll to the bottom and click “Create” to create your bucket.

![Creating your Bucket in Google Cloud Storage](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089287083/a376f695-81b8-4f5a-80a7-cd563c8b4c81.png)

You’ll see a pop-up asking you to **confirm public access prevention**. This means that only you (and people you explicitly give access to) can view or edit your bucket. Make sure the “Enforce public access prevention on this bucket” checkbox is checked, then click “Confirm.”

![Preventing random users from accessing your bucket](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089404876/38c8e6b5-0de0-4771-9bed-9334f8f8c43a.png)

Perfect! 🎉 You’ve now created a storage bucket where your CockroachDB backups will live.

### Giving CockroachDB Access to the Bucket

Our next goal is to let the CockroachDB cluster upload and read files from this bucket. To do this, we’ll create something called a **Service Account** using **Google IAM**.

#### What’s IAM

IAM stands for *Identity and Access Management.* It’s basically Google Cloud’s way of managing who can access what in your project.

With IAM, we can create a service account (like a “digital employee”) and give it permission to interact with our bucket instead of using our personal Google account.

#### Creating a Service Account

Type “service account” in the search bar and click on “Service Accounts” in the results.

![Navigating the Service Accounts page](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089569066/2855b7fa-d896-4249-825d-4ec590499ca8.png)

Click “Create Service Account” at the top of the page. On the new page, type: `cockroachdb-backup` as the service account name, then click ‘Create and Continue’

![Creating a new Service Account for the CockroachDB cluster, to give it access to our Cloud Storage Bucket](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089677768/05c9f9ed-257f-44c6-89b5-3880c8af017d.png)

Now we’ll give this service account permission to work with our storage bucket. In the *Permissions* section, type “storage object creator” in the filter box and select it from the dropdown.

![Providing our Service Account with the necessary permissions to access the bucket](https://cdn.hashnode.com/res/hashnode/image/upload/v1762089744927/64ed65df-88ee-43c9-8be4-892a41a24989.png)

Repeat the same for “storage object viewer”, and “storage object user”.

At the end, you should see three roles assigned:

- Storage Object Creator
- Storage Object Viewer
- Storage Object User

Click “Continue”, then “Done.”

![The necessary permissions to be assigned to the Service Account](https://cdn.hashnode.com/res/hashnode/image/upload/v1762092953125/0419abe8-a1ff-4f1c-b367-f9e203bdf6ff.png)

You’ve now created a service account that can create and read files in your bucket.

#### Downloading the Service Account Key

To let our CockroachDB cluster use this service account, we’ll generate a **key file**.

::: info What’s a key file?

It’s just a small **JSON file** containing secret information your app (CockroachDB) can use to authenticate securely with Google Cloud – like an ID card.

:::

::: warning But be careful ⚠️

If this key gets into the wrong hands, anyone could use it to access your Google Cloud resources. **Never share or upload this file** to your GitHub, BitBucket, or GitLab repository, or any other online repositories.

:::

In the Service Accounts page, find your `cockroachdb-backup` account, click the three dots (`⋮`) under the Action column, then select “Manage Keys.”

![Finding the newly created service account, and creating a key](https://cdn.hashnode.com/res/hashnode/image/upload/v1762090008411/11c4b373-87b0-416d-bf14-1a9ccd15c452.png)

On the new page, click “Add Key” then “Create new key.”

![Creating a new key for the new service account](https://cdn.hashnode.com/res/hashnode/image/upload/v1762090059309/ebe17228-e2a8-4abe-b41b-7378013570d5.png)

A dialog box will pop-up, choose JSON as the key type, and click “Create.”

![Selecting the Key Type as JSON](https://cdn.hashnode.com/res/hashnode/image/upload/v1762090115728/5ed82664-f57a-4489-af08-be85c2ad42e9.png)

Google will automatically download a file named something like <VPIcon icon="iconfont icon-json"/>`cockroachdb-backup-1234567890abcdef.json`

We’ll use this key soon when we configure our CockroachDB backup job.

### Attaching the Key to Our CockroachDB Cluster

Now that we’ve downloaded the service account key, we need to attach it to our CockroachDB cluster so that the DB can upload and read backups from our Google Cloud Storage bucket.

::: important Why this is needed

Our Minikube cluster (and even any managed Kubernetes cluster like GKE, EKS, or AKS) **doesn’t have direct access** to the files on your computer. So, we’ll upload the key file to Kubernetes as a Secret, and then mount it inside our CockroachDB pods as a volume.

:::

#### Step 1: Create a Kubernetes Secret

Run the command below in your terminal👇🏾 Replace `<PATH_TO_KEY>` with the path to your downloaded key file:

```sh
kubectl create secret generic gcs-key --from-file=key.json=<PATH_TO_KEY>
```

This command creates a **Kubernetes Secret** named `gcs-key` that securely stores your Google Cloud key.

#### Step 2: Mount the Secret to the CockroachDB Cluster

Now, let’s tell Kubernetes to use this secret inside our CockroachDB cluster.

Open your <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-values.yml` file and scroll to the `statefulset:` section. Add the following lines under it:👇🏾

```yaml title="cockroachdb-values.yml"
statefulset:
  # ...
  env:
    - name: GOOGLE_APPLICATION_CREDENTIALS
      value: /var/run/gcp/key.json

  volumes:
    - name: gcp-sa
      secret:
        secretName: gcs-key

  volumeMounts:
    - name: gcp-sa
      mountPath: /var/run/gcp
      readOnly: true
```

Here’s what this does:

- The `volumes` section tells Kubernetes to create a volume from the secret we just made.
- The `volumeMounts` section attaches that volume inside the CockroachDB container.
- The `GOOGLE_APPLICATION_CREDENTIALS` environment variable points CockroachDB to our key file so it knows where to find it when connecting to Google Cloud.

Your final file should look like this:👇🏾

```yaml :collapsed-lines title="cockroachdb-values.yml"
statefulset:
  replicas: 3
  podSecurityContext:
    fsGroup: 1000
    runAsUser: 1000
    runAsGroup: 1000
  resources:
    requests:
      memory: "1Gi"
      cpu: 1
    limits:
      memory: "1Gi"
      cpu: 1
  podAntiAffinity:
    type: ""
  nodeSelector:
    kubernetes.io/hostname: minikube
  env:
    - name: GOOGLE_APPLICATION_CREDENTIALS
      value: /var/run/gcp/key.json
  volumes:
    - name: gcp-sa
      secret:
        secretName: gcs-key
  volumeMounts:
    - name: gcp-sa
      mountPath: /var/run/gcp
      readOnly: true

storage:
  persistentVolume:
    size: 5Gi
    storageClass: standard

tls:
  enabled: false

init:
  jobs:
    wait:
      enabled: true
```

Now, apply the update using Helm:👇🏾

```sh
helm upgrade crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

#### Step 3: Confirm the Key Exists in the Cluster

Once the upgrade is complete, run this command to confirm the key is now inside your CockroachDB pods:

```sh
kubectl exec -it crdb-cockroachdb-1 -- cat /var/run/gcp/key.json
```

You should see something similar to this:👇🏾

```sh
kubectl exec -it crdb-cockroachdb-1 -- cat /var/run/gcp/key.json
# 
# {
#   "type": "service_account",
#   "project_id": ***,
#   "private_key_id": ***,
#   "private_key": ***,
#   "client_email": ***,
#   "client_id": ***,
#   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
#   "token_uri": "https://oauth2.googleapis.com/token",
#   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
#   "client_x509_cert_url": ***,
#   "universe_domain": "googleapis.com"
# }
```

Nice! That means our cluster now has access to the Google Cloud key.

#### Step 4: Creating the Backup Schedule

CockroachDB makes backups super convenient. It can automatically back up your database **on a schedule** (without you needing to manually create Kubernetes CronJobs).

To create an automatic backup schedule, run this SQL command inside the CockroachDB SQL shell 👇🏾(Replace the BUCKET_NAME placeholder with the name of your Google Cloud Storage bucket):

```sql
CREATE SCHEDULE backup_cluster
FOR BACKUP INTO 'gs://<BUCKET_NAME>/cluster?AUTH=implicit'
WITH revision_history
RECURRING '@hourly'
FULL BACKUP '@daily'
WITH SCHEDULE OPTIONS first_run = 'now';
```

Here’s what each part means:

- `AUTH=implicit` tells CockroachDB to use the Google key we mounted (`GOOGLE_APPLICATION_CREDENTIALS`) for authentication.
- `FULL BACKUP '@daily'` creates a complete backup of the entire database every day.
- `RECURRING '@hourly'` creates smaller, incremental backups every hour, capturing just the changes since the last backup.
- `WITH SCHEDULE OPTIONS first_run = 'now'` starts the first backup immediately after running the command.

After running it, CockroachDB will return two rows:

- The first is for the **recurring incremental backup** (hourly updates)
- The second is for the **full backup** (daily snapshot)

You can read more about full and incremental backups in the official docs here 👉🏾[CockroachDB Backups Guide](https://cockroachlabs.com/docs/stable/take-full-and-incremental-backups).

#### Step 5: Checking Backup Status

To see the status of your backups, copy the **Job ID** from the second row (the `id` column) and run this command:

![The job ID to copy](https://cdn.hashnode.com/res/hashnode/image/upload/v1762103549260/742fc309-9c4d-4967-9436-91539851a9b9.png)

```sh
SHOW JOBS FOR SCHEDULE <YOUR_JOB_ID>;
```

Replace `<YOUR_JOB_ID>` with the ID you copied.

You’ll see output similar to this:👇🏾

![Getting the status of the backup job](https://cdn.hashnode.com/res/hashnode/image/upload/v1762103606748/8627d561-0b54-4e6d-9109-ba7e1c7a85c3.png)

Now, do the same for the recurring backup job (the ID on the 1st row of the previous result)

If both statuses show `succeeded`, that means your full and recurring backups worked perfectly! If either is still running, just give it a few minutes – backups can take a bit of time

### Testing Our Backup — Disaster Recovery Time

Woohoo! We’ve successfully created a backup of our CockroachDB cluster to Google Cloud Storage. That’s a huge milestone. But let’s be honest: how can we be *sure* it works if we’ve never tried restoring it?

So, in true brave-developer fashion, we’re going to do the unthinkable: **destroy our entire database**...yes, everything! 😬

Why would we do that?! Because in real life, disasters happen. A node crashes, data gets wiped, or an upgrade goes sideways. The question is: *Can we recover?* Let’s find out.

#### Step 1: Uninstall the Helm Chart

First, let’s remove the CockroachDB Helm release. This deletes the cluster resources like StatefulSets, pods, and secrets:

```sh
helm uninstall crdb
```

This removes the running cluster, but **not the actual data**, which is stored on Persistent Volumes (PVs).

#### Step 2: Delete Persistent Volume Claims (PVCs)

Each CockroachDB node stores its data in a **Persistent Volume Claim** (PVC). These PVCs remain even after uninstalling the Helm release, so let’s manually delete them:

```sh
kubectl delete pvc datadir-crdb-cockroachdb-0
kubectl delete pvc datadir-crdb-cockroachdb-1
kubectl delete pvc datadir-crdb-cockroachdb-2
```

#### Step 3: Delete the Persistent Volumes (PVs)

Next, list all the Persistent Volumes:

```sh
kubectl get pv
```

You’ll see a list of volumes similar to this 👇🏾

![List existing Persistent Volumes for CockroachDB](https://cdn.hashnode.com/res/hashnode/image/upload/v1762107818554/01defffd-543b-486a-aa19-4bbf6f768270.png)

Look for the PVs that are **bound to the PVCs** you just deleted. Then delete them manually using:

```sh
kubectl delete pv <PV_NAME>
```

At this point, you’ve completely wiped out your database like it never existed 🥲. Don’t worry: this is all part of the plan.

#### Step 4: Reinstall the Cluster

Let’s bring CockroachDB back to life (an empty one for now):

```sh
helm install crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

Once the installation is done, expose the cluster locally again:

```sh
kubectl port-forward svc/crdb-cockroachdb-public 26257
```

#### Step 5: Check What’s Left

Connect to the Beekeeper Studio to your DB if your not, and try running the query below:

```sql
SELECT * FROM books;
```

You’ll get an error saying the `books` table doesn’t exist, because this is a *brand new* database.

#### Step 6: Restore from Google Cloud Storage

Now for the magic part, let’s bring our data back from the backup we created earlier 😃!

Run this query the new cluster:

```sql
RESTORE FROM LATEST IN 'gs://<BUCKET_NAME>/cluster?AUTH=implicit';
```

Replace `<BUCKET_NAME>` with your actual Google Cloud Storage bucket name (for example: `cockroachdb-backup-7gw8u`).

CockroachDB will begin restoring your data. This can take a few seconds or minutes depending on your backup size. When it’s done, you’ll see a response showing a success status:

![Database restored successfully](https://cdn.hashnode.com/res/hashnode/image/upload/v1762108106557/0da98d45-d8f4-48ed-b852-9f76209fb20f.png)

#### Step 7: Confirm the Restoration

Now, run the same query again:

```sql
SELECT * FROM books;
```

Boom 💥 your books are back 😁! That means your backup and restore process works perfectly. You just performed a full disaster recovery test.

Congrats! You’ve done something many real-world teams fail to test: a **full backup and restore cycle**. You’ve now proven that your database setup is resilient, even in a worst-case scenario.

---

## Managing Resources & Optimizing Memory Usage

In this section, we’ll learn how CockroachDB handles memory internally (for things like caching and SQL query work), and how to tune these setting**s** so you avoid OOM kills or Eviction – Kubernetes crashing/stopping the database due to it using too much memory than what was allocated to it.

### How CockroachDB Uses Memory

When you deploy CockroachDB nodes (each replica) via Kubernetes, each pod (node) needs memory for multiple things. At a high level, there are two major internal uses:

- **Cache** (`conf.cache`): This is the space CockroachDB uses to keep frequently accessed data in memory so queries can run faster without hitting the disk.
- **SQL Memory** (`conf.max-sql-memory`): This is the memory used when running SQL queries (things like sorting, joins, buffering numbers, and temporary data).

Together, they need to be sized appropriately relative to the total memory you give the pod, so there’s room for these internal operations *plus* other overhead (networking, logging, background tasks).

### The Memory Usage Formula You Must Follow

Here’s the golden rule you should **never forget**:

```yaml
(2 × max-sql-memory) + cache  ≤  80% of the memory limit
```
<!-- TODO: LaTeX화 -->

What this means:

- You take the `max-sql-memory` value and multiply by 2 (because SQL work may need space for both input and output, etc)
- Add your `cache` value
- That total must be **less than or equal to 80%** of the pod’s memory limit (`statefulset.resources.limits.memory`)
- The remaining ~20% (or more) is free space for *other internal CockroachDB processes* like background jobs, metrics, network, and so on

If you give CockroachDB too little “free” memory beyond these two settings, you risk OOM kills (pod gets killed by Kubernetes because it used more memory than allowed) or performance issues.

### Where You Find These Settings

If you go to the Helm chart docs on ArtifactHub, [<VPIcon icon="fas fa-globe"/>CockroachDB Helm Chart on ArtifactHub](https://artifacthub.io/packages/helm/cockroachdb/cockroachdb), and scroll down to the **Configuration** section (or press <kbd>Ctrl</kbd>-<kbd>F</kbd> for `conf.cache`), you’ll see:

- `conf.cache` (cache size)
- `conf.max-sql-memory` (SQL memory size)
- It states that each of these is by default set to roughly 25% of the memory allocation you set in the `resources.limits.memory` for the statefulset.

![Artifacthub docs for the CockroachDB Helm chart](https://cdn.hashnode.com/res/hashnode/image/upload/v1762235290740/bd176882-43bd-4abd-94e0-cce083335d64.png)

### Concrete Example (Step-by-Step)

Let’s do the math with numbers in our Minikube environment.

- In our case we set `statefulset.resources.limits.memory` = **2 GiB** for each CockroachDB pod.
- The Helm default of ¼ (25%) rule means:
  - `conf.cache` = ¼ × 2 GiB = **512 MiB**
  - `conf.max-sql-memory` = ¼ × 2 GiB = **512 MiB**
- Apply the formula: `(2 × 512 MiB) + 512 MiB = 1,536 MiB`
- Calculate 80% of the memory limit: `80% of 2 GiB = 1,638 MiB` (approximately)
- Compare: 1,536 MiB ≤ 1,638 MiB – so we’re within the safe zone ✅
- That means in this configuration, CockroachDB expects to use **~1,536 MiB** for its cache + SQL memory. This leaves **~512 MiB** (20%) of the 2 GiB limit for other internal processes.

That leftover memory is for things like internal bookkeeping (range rebalancing, replication metadata), communication among database replicas, metric collection, logging, garbage collection, and temporary or unexpected memory spikes.

If you don’t leave this free space, your node might struggle when “normal operations”. And on Kubernetes, if the pod uses more memory than the `limits.memory` says, it can get OOM-killed which causes downtime or restarts.

### ⚠️ On Requests vs Limits in Kubernetes

Important nuance: Kubernetes schedules pods based on **requests** (what you ask for) but enforces limits based on **limits** (what you allow).

- `statefulset.resources.requests.memory` = what the scheduler guarantees the pod will have.
- `statefulset.resources.limits.memory` = the maximum the pod can use before Kubernetes will kill it for excess memory.

Because CockroachDB’s internal memory computations (cache + SQL memory) use the **limit** value to calculate sizing, if you set requests < limits you’ll get a mismatch. Example:

- Suppose requests = 1 GiB, limits = 2 GiB
- Kubernetes may schedule the pod on a node that has (at least) 1 GiB free
- But internally, CockroachDB will plan for ~1.5 GiB usage (based on the 2 GiB limit)
- The node may not actually have that much free memory available
- The pod might try to use more memory than the node reserved and risk eviction due to less memory for other pods

::: tip Best practice

Set requests = limits for memory and CPU for CockroachDB pods. That way the scheduler reserves enough space for what CockroachDB will use internally.

:::

### Overriding the Default Fractions

If you want to set static `conf.cache` or `conf.max-sql-memory` values (rather than relying on 25% of limit) you *can* – but you must still obey the memory usage formula.

For example, if you set:

```yaml
# ...
conf:
  cache: "1Gi"
  max-sql-memory: "1Gi"
statefulset:
  resources:
    requests:
      memory: "3Gi"
      cpu: 1
    limits:
      memory: "3Gi"
      cpu: 1
```

According to the above configuration your pod memory request and limit is **3 GiB**, then calculate:

```yaml
(2 × 1Gi) + 1Gi = 3Gi
80% of 3Gi = ~2.4Gi
```
<!-- TODO: LaTeX화 -->

Here **3Gi > 2.4Gi**, so you’d be violating the rule. This is a risky setup.

So you’ll need to either reduce cache or SQL memory, for example to 768Mi (or increase the memory limit, for example 4Gi) so that your formula results in ≤ 80% of the limit.

---

## Scaling CockroachDB the Right Way

In this section we’ll look at when and how you should grow your CockroachDB cluster – whether that means adding more replicas (horizontal scale), giving each node more CPU/RAM (vertical scale), or giving them more storage.

I’ll explain everything in simple terms and cover what metrics to watch, what decisions to make, and how to scale safely.

What we’ll discuss:

- How you can tell it’s time to “grow” your cluster
- How to safely add more nodes or upgrade what you already have
- How to decide whether you need more nodes, bigger nodes, or bigger disks
- How to do all this without causing downtime or stress

### Key Metrics to Understand

Before we dive into how to scale our cluster, we need to understand what certain metrics mean. Because, these metrics will help us make calculated decisions, knowing what and and when to scale certain resources.

#### Read bytes/second & Write bytes/second (Throughput)

Read bytes/second is how much data (in bytes) the disk is **reading** every second from itself to the database, that is, passing from the disk to the database app.

Write bytes/second is how much data is being **written** to the disk per second, that is, moving from the database to the disk.

This matters because your database is an application that stores data on disk. If your app needs to read a lot of data (reads) or write a lot of data (writes), this metric shows the **volume** of data flowing to/from disk.

To keep an eye on it, go to your CockroachDB dashboard and navigate to the “Metrics” link on the sidebar. Under the “Metrics” title, click the “Dashboard:…” drop-down and select “Hardware” from the options.

Now, scroll down a bit till you see “Disk Read Bytes/s” and “Disk Write Bytes/s”.

![The Disk Read & Write Bytes/s metrics](https://cdn.hashnode.com/res/hashnode/image/upload/v1762325396257/553ac9d4-4927-40f3-b654-8b19a0b2aef8.png)

#### Read IOPS & Write IOPS

**IOPS** = “Input/Output Operations Per Second”. Here, Read IOPS = how many **read operations** the disk is performing per second. Write IOPS = how many **write operations** per second.

This is different from throughput because throughput is about how many bytes (data) are being transferred. IOPS, on the other hand, is about **how many operations** are happening (regardless of size).

Here’s an example: 10 read operations/sec of 1 MiB each = 10 MiB/sec throughput, 10 IOPS. Another scenario: 100 reads/sec of 10 KiB each = ~1 MiB/sec throughput, but 100 IOPS (higher operations count though lower data size.)

Scroll down a bit more to view the IOPS metrics:

![Illustrating the IOPS metrics on the dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1762325699278/dd549ac3-16cf-4373-9637-5a1e798bf5db.png)

#### SQL p99 Latency (99th percentile latency)

P99 latency is the time it takes for the **slowest 1% of queries** to finish.

For example, let’s say you run 1,000 queries. How long the slowest 10 of them took is what p99 shows.

This matters because it’s not about the average query, but about the tail (worst cases). If your p99 is high, it means some queries are seriously lagging. All other queries might be fine, but some are dragging.

So if p99 jumps up (for example, from 10 ms → 300 ms), you should investigate: maybe big joins, missing indexes, contention, or data takes too much time to get stored in the disk.

To access the SQL P99 Latency metrics, simply click the “Dashboard:…” select field, and choose the “Overview” option from the dropdown.

PS: The higher the p99 latency, the more problem there is (slower queries).

![The SQL p99 latency metric](https://cdn.hashnode.com/res/hashnode/image/upload/v1762326088120/e6f39e6e-942b-4db9-b808-cb228c1e0cc5.png)

#### Disk Ops In Progress (Queue Depth)

This shows how many disk reads and writes are waiting *in line* (queued) because the storage system is busy.

A queue depth of 0–5 is generally OK. If it frequently goes into double-digits (10+), that means storage is struggling and latency may spike. If you see this number high and staying high, you may need faster storage or more database replicas.

Simple rule: if “Ops In Progress” > ~9 for extended time, this is a bad sign. Time to check disks and I/O.

To access the “Disk Ops In Progress“ metric, return to the “Hardware“ dashboard, and scroll down:

![Accessing the Disk Ops In Progress metrics on the COckroachDB dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1762488796957/b2a215fd-ec51-4ee3-9056-a5fa6d511c61.png)

By monitoring these, you can choose:

- “I need **more nodes**” (horizontal scale)
- “I need **bigger nodes or faster storage**” (vertical scale)
- “I need **better query/index tuning**” (optimize rather than scale)

### When (and What) to Scale Based on Your Metrics

So, let’s imagine you’re watching your CockroachDB dashboard and notice this pattern:

- The **SQL P99 latency** (the slowest 1% of your queries) is high, meaning your queries are taking too long.
- The **CPU usage** for your CockroachDB pods (under *Cockroach process CPU%*) is above **80%** consistently.

That’s a classic sign your cluster is running out of CPU power and the database is struggling to process queries fast enough because the CPU is maxed out.

Here’s how to fix it 👇🏾

#### Step 1: Add More CPU Power

You can scale up your CPUs directly through the **Helm chart values file**, <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-values.yml`.

In that file, look for the section where CPU and memory requests/limits are defined under `statefulset.resources`. Then, increase the CPU allocations. For example:

```yaml title="cockroachdb-values.yml"
statefulset:
  resources:
    requests:
      cpu: "3"
      memory: "6Gi"
    limits:
      cpu: "3"
      memory: "6Gi"
```

This means each CockroachDB pod (replica) will now *request* 3 vCPUs (guaranteed). Save the file, then apply the update with the Helm command:

```sh
helm upgrade crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

Once the upgrade is done, give it 30 minutes to 1 hour to stabilize. The CockroachDB dashboard will automatically start showing you updated metrics.

If you see that the CPU usage drops below 70% and the SQL P99 latency improves, you’re good. 👍🏾

#### Step 2: Add Another Replica (New Node)

But…what if the latency is **still high** even after adding more CPU? That likely means the cluster is still overloaded, and it’s time to add another node (replica) to distribute the load.

Here’s why that works: CockroachDB is horizontally scalable, meaning it automatically spreads out your data (remember **ranges**?) and balances reads/writes across all replicas. So, the more nodes you add, the more evenly your cluster can share the work.

To add another replica, simply increase the `replicas` value in your Helm config:

```yaml title="cockroachdb-values.yml"
statefulset:
  replicas: 4  # If it was 3 before
```

Then, redeploy again:

```sh
helm upgrade crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

This adds a new pod (a new CockroachDB node) to your cluster. CockroachDB will automatically rebalance your data across nodes – no manual migration needed

::: tip

Try to keep one CockroachDB pod (replica) per VM. For example, if you have 3 replicas, you should ideally have 3 separate VMs (worker nodes). This ensures better fault tolerance and performance.

:::

Luckily, the official CockroachDB Helm chart already helps with this by managing **Pod** **anti-affinity rules**, so pods are automatically spread across nodes safely.

### Disk-Bound Situations — What to Do When Your Disk Is the Limiting Factor

If you’re seeing this kind of pattern in your CockroachDB dashboard and Kubernetes cluster:

- SQL P99 latency is high (queries are slow)
- “Disk Ops In Progress” (queue depth) stays above ~9-10 – meaning many disk I/O operations are waiting to be processed
- Disk “Read bytes/sec” or “Write bytes/sec” (throughput) are high **or** “Read IOPS” or “Write IOPS” are high (even though CPU looks okay)

Then you’re very likely **disk-bound**, meaning your storage is the bottleneck.

Here’s how to fix it (and yes, it’s a bit more complex than just “add more RAM”)…

#### Step 1: Increase Disk Size in Your Helm Values

Often the first problem is that the disk size is too small. Here’s how you can increase it:

1. Open your <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-values.yml` (the Helm chart values file)
2. Look for the storage section, for example:

```yaml title="cockroachdb-values.yml"
storage:
  persistentVolume:
    size: 5Gi  # current size
```

3. Update it to a larger size, like:

```yaml title="cockroachdb-values.yml"
storage:
  persistentVolume:
    size: 15Gi  # increased size
```

4. Save the file and run:

```sh
helm upgrade crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

::: note N.B.

If this doesn’t work or you receive an error from the Helm chart concerning not being able to modify some values (this is normal), just upsize the disk this way:👇🏾 (just replace the PVC_NAME and SIZE placeholders accordingly)

```sh
kubectl patch pvc <PVC_NAME> \
-p '{"spec":{"resources":{"requests":{"storage":"<SIZE>"}}}}'
```

:::

Do that for each PVC (`datadir-crdb-cockroachdb-0`, `datadir-crdb-cockroachdb-1`, and so on).

::: important

Increasing size *may help*, but often alone is not enough because your disk speed (IOPS/throughput) also depends on factors beyond just size.

:::

Let’s break down why that’s the case, and what really affects your disk performance (especially on Google Cloud, which is what I’m using, too).

#### Why Disk Speed Can Vary

Your CockroachDB cluster uses **external disks** provided by your cloud provider (like Google, AWS, or Azure). The speed of those disks – that is, how fast they can read/write data – isn’t fixed. It depends on a few key factors.

On Google Cloud, disk performance depends on three main things:

1. **Disk type**: HDD, SSD, or fast SSD (pd-ssd) (the faster the disk type, the faster it can handle data operations)
2. **Disk size**: larger disks usually come with higher speed limits (the bigger, the faster)
3. **VM’s vCPU count**: more CPUs mean higher quotas for both
    - read/write operations per second (**IOPS**), and
    - how much data can flow to/from the disk per second (**throughput**)

#### The Recommended Disk Type for CockroachDB

The pd-ssd (Google’s fast SSD) is the recommended type for CockroachDB.

- Each pd-ssd disk starts with a minimum of 6,000 IOPS (read or write operations per second).
- It also has around 240 MiB/s (~252 MB/s) of read/write throughput.

In simple terms, that means your CockroachDB disk can handle up to 6,000 read/write operations EVERY SECOND, and move 250+ MB of data in and out every second. That’s pretty impressive!

But here’s the catch: those numbers can still vary depending on your **VM family** and **CPU count**.

#### How VM Family Affects Disk Speed (E2 Example)

If your CockroachDB is running on an E2 VM family (one of Google Cloud’s general-purpose VM types):

- A VM with 2–7 vCPUs can handle up to:
  - 15k IOPS (read/write operations per second)
  - 250+ MiB/s throughput (which is already far more than many databases ever use 😅)
- A VM with 8–15 vCPUs still allows 15k IOPS, but throughput jumps up to ~800 MiB/s 😮<br/>meaning your disk can push nearly 0.8 GB per second of data in/out IN A SECOND.

The more vCPUs you have, the higher these limits grow, both for IOPS and throughput.

#### Putting It All Together

So, if you notice high SQL P99 latency (queries taking long), and disk read and write IOPS or throughput (read & write bytes) usage close to their limits, then your disk may be maxing out, not your database itself.

Here’s what you can do:

- Check your current VM’s vCPU count and disk performance limit for that CPU.
- If you’re using E2 with low vCPUs (for example, 2–4), try increasing it to **8 vCPUs or more**. That’ll immediately lift your IOPS and throughput ceiling.

::: tip Example: E2 VM Family IOPS/Throughput Table

```plaintext title="table"
E2 per-VM caps (pd-ssd):

e2-medium:     10k write / 12k read IOPS, 200/200 MiB/s
2–7 vCPUs:     15k / 15k IOPS, 240/240 MiB/s
8–15 vCPUs:    15k / 15k IOPS, 800/800 MiB/s
16–31 vCPUs:   25k / 25k IOPS, 1,000 write / 1,200 read MiB/s
32 vCPUs:      60k / 60k IOPS, 1,000 write / 1,200 read MiB/s
```
<!-- TODO: 테이블화 -->

The rule is simple — the higher the CPU tier (2–7, 8–15, and so on), the higher the disk speed cap.

#### ⚠️ But What If You’re Still Seeing Slow Queries?

If your CockroachDB queries are *still* slow, but your metrics show that you’re not fully using your disk capacity (based on your VM’s CPU range), then your **disk size** might be the actual limitation.

In that case:

- Gradually increase your disk size, for exaxmple from `50Gi` to `70Gi` to `100Gi`.
- Each increase enables your disk to pass more amount of data in and out (especially with pd-ssd).
- Remember: once you increase disk size on Google Cloud, **you can’t shrink it back down**, so grow it slowly and observe improvements before scaling again.

This step helps you pinpoint *exactly* whether the slowdown is coming from insufficient IOPS, throughput, or just a disk that’s too small for CockroachDB’s workload 💪🏾

### Memory Pressure — What to Do When Your Database Hits the Limit

There are some signs in your cluster you can look out for that’ll tell you your database is getting close to its limit. Pods (database replicas) might be getting **OOMKilled** (out of memory) or being evicted by Kubernetes, or your memory usage might be staying above ~ 75–80% for a while.

If either these is the case, you’re often dealing with **memory pressure** (you can check memory usage on the CockroachDB overview dashboard).

![Accessing your Cluster memory usage](https://cdn.hashnode.com/res/hashnode/image/upload/v1762584827011/e7828548-7ed7-4a87-b6b2-fff52c6f6df1.png)

#### Why this happens

If you didn’t set memory requests and limits properly for each replica, the pod might not have enough head-room for all of its internal work (cache, SQL memory, background jobs) and Kubernetes kills it or it crashes.

Also, as you increase load (lots of queries, many users), your database needs more memory for two internal areas:

- `--cache` (or `conf.cache`): in-memory data caching
- `--max-sql-memory` (or `conf.max-sql-memory`): memory for running SQL queries (joins, sorts, and so on).<br/>And yes, we covered the formula earlier `(2 × max-sql-memory) + cache ≤ ~ 80% of RAM limit`.

#### What to do

First, you can increase the DB memory. In your Helm chart values (`cockroachdb-values.yml`), bump up the `statefulset.resources.limits.memory` and `statefulset.resources.requests.memory`. Or you can modify `conf.cache` and `conf.max-sql-memory` values (if you’re comfortable) but only if the total RAM limit is sufficient to support them.

Because the defaults (when you installed) set each to ~25% of RAM limit, they will scale automatically when you increase RAM.

For example:

- If RAM limit per pod = **5 GiB**, then cache ≈ **1.25 GiB**, max-sql-memory ≈ **1.25 GiB**
- If you raise RAM limit to **8 GiB**, these become ≈ **2 GiB** each. This keeps you inside the formula and avoids memory crashes.

#### Quick YAML snippet example

```yaml title="cockroachdb-values.yml"
statefulset:
  resources:
    requests:
      memory: "8Gi"
    limits:
      memory: "8Gi"
conf:
  cache: "25%"
  max-sql-memory: "25%"
```

After editing your values file, remember to apply it:

```sh
helm upgrade crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

### When Queries Are Slow but Everything Else (CPU, Memory & Disk) Looks “Fine”

Sometimes you’ll see that your resource metrics (CPU, memory, disk I/O) all seem healthy. But your queries are still slow.

What then? One important cause: **hotspots**: especially “hot ranges” or “hot nodes” in CockroachDB.

A **hot range** is a portion of data (in CockroachDB, a range is a section of data from a table) that’s receiving much more traffic (reads or writes) than others.

A **hot node**, on the other hand, is a node/replica in the cluster which has significantly more load compared to the other nodes – often because it holds one or more hot ranges.

Because most of the traffic (queries) go to a range which is on a specific node, even though your overall CPU / memory / disk metrics might look “okay”, performance still suffers locally: queries are funneled into that specific range, making a “hotspot”.

Learn more about Hotspots [<VPIcon icon="iconfont icon-cockroach-db"/>here](https://cockroachlabs.com/docs/stable/understand-hotspots).

#### Why A High Write Workload Can Slow Reads

When you have lots of write queries, they may overload specific ranges or nodes (especially if the keyspace is skewed). Writes tend to:

- Acquire locks or latches on rows or ranges
- Cause contention among transactions
- Require coordination (for example, via Raft consensus) which impacts performance.

When writes dominate a range, read queries that hit the same ranges may get queued behind these write operations, or suffer longer wait times.

Since reads and writes are sharing the same underlying data/ranges, too much writes can delay reads by creating bottlenecks. The docs call this part of “write hotspots”.

#### Key Signs You Might Have a Hotspot

- One node’s CPU % is much higher than the others (even though overall resources seem fine)
- On the Hot Ranges page in the CockroachDB UI, some ranges show very high QPS (queries per second) compared to others.

![The Hot Ranges page in the CockorachDB dashboard UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1762586236835/aeb3b0ea-b280-48d3-b12f-4cfe78d11dc1.png)

- You observe that increasing overall resources (more CPU, more nodes) didn’t resolve the slowness. This suggests the problem isn’t “not enough resources” but “resource imbalance”.

#### What You Can Do

There are a few things you can do to prevent hotspots:

- Use the **Hot Ranges** UI page (go to the Database Console and then to Hot Ranges) to identify the range IDs and table/indexes causing the issue.
- Examine how the key space is being used. If your table/index primary key is monotonically increasing (for example, timestamps or serial IDs), the writes may target a narrow portion of the data, causing a hotspot. The docs suggest using hash-sharded indexes or distributing writes across the key-space.
- Ensure load is balanced across nodes: avoid “one node doing most of the work”. If needed, add nodes or ensure range distribution/lease-holder movement is happening.
- Monitor write-versus-read workload. if writes are heavy, they may cause queuing for reads even when resources appear OK. So look at write heavy traffic patterns and try reducing the amount of writes (if possible).

::: note

Learning everything about hotspots, key visualizers, and range splitting is a bit advanced. For those wanting to dive deeper: see the CockroachDB [<VPIcon icon="iconfont icon-cockroach-db"/>Performance Recipes page](https://cockroachlabs.com/docs/stable/performance-recipes).

:::

### Understanding Disk Speed (IOPS & Throughput) Across Cloud Providers

So far, we’ve talked about how disk speed affects CockroachDB’s performance – especially how Google Cloud measures it. But it’s important to know that **each cloud provider has its own way of measuring and limiting disk performance** (IOPS and throughput).

So, while our earlier examples focused on Google Cloud, similar logic applies to AWS, Azure, and even DigitalOcean, just with different formulas and limits.

#### For Google Cloud

These guides break down how disk performance works:

- [<VPIcon icon="iconfont icon-gcp"/>Persistent Disk performance overview](https://cloud.google.com/compute/docs/disks/performance): explains how baseline IOPS and throughput are calculated and the per-instance caps.
- [<VPIcon icon="iconfont icon-gcp"/>About Persistent Disks](https://docs.cloud.google.com/compute/docs/disks/persistent-disks): quick definitions of `pd-standard` (HDD), `pd-balanced` (SSD), and `pd-ssd` (SSD).
- [<VPIcon icon="iconfont icon-gcp"/>Optimize PD performance](https://cloud.google.com/compute/docs/disks/optimizing-pd-performance): shows how disk size, machine series, and tuning can affect performance.

#### For AWS (EBS)

AWS’s Elastic Block Store (EBS) has several disk types:

- [<VPIcon icon="fa-brands fa-aws"/>EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html): overview of all SSD and HDD types (`gp3`, `gp2`, `io2`, and so on).
- [<VPIcon icon="fa-brands fa-aws"/>General Purpose SSD (gp3)](https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html): lets you provision custom IOPS and throughput for your disks (about 0.25 MiB/s per IOPS, up to 2,000 MiB/s).

#### For Azure (Managed Disks)

Azure disks also vary by type and size:

- [<VPIcon icon="iconfont icon-microsoftazure"/>Disk types overview](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types): compares Standard HDD, Standard SSD, Premium SSD, Premium SSD v2, and Ultra Disk.
- [<VPIcon icon="iconfont icon-microsoftazure"/>Premium SSD v2](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-deploy-premium-v2): lets you independently set IOPS and throughput for your disks.
- [<VPIcon icon="iconfont icon-microsoftazure"/>VM & disk performance](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-performance): lists per-VM IOPS and throughput caps.

#### For DigitalOcean

DigitalOcean offers simpler storage setups:

- [<VPIcon icon="fa-brands fa-digital-ocean"/>Volumes overview](https://docs.digitalocean.com/products/volumes/): explains block storage and NVMe details.
- [<VPIcon icon="fa-brands fa-digital-ocean"/>Volume Limits](https://docs.digitalocean.com/products/volumes/details/limits/): shows per-Droplet IOPS and throughput caps (including burst windows).

### Downsizing the Cluster (Reducing Replicas)

Now that we’ve seen how to scale up our CockroachDB cluster, let’s look at how to scale it down safely and correctly.

Let’s assume we scaled our cluster from 3 replicas to 5 replicas earlier (to handle more workload).

PS: If your CockroachDB pods were crashing often, you might need to increase the CPU and memory limits in the Helm chart configuration, like this:

```yaml title="cockroachdb-values.yml"
statefulset:
  replicas: 5
  resources:
    requests:
      memory: "2Gi"
      cpu: 1
    limits:
      memory: "3Gi" # We can keep the memory requests and limits inconsistent for now, since we're in a development environment
      cpu: 1
...
```

Then, you update the cluster using:

```sh
helm upgrade crdb cockroachdb/helm-chart -f cockroachdb-values.yml
```

After a few minutes, you can confirm the newly added replicas `kubectl get pods`. You should now see five CockroachDB pods running.

![The newly added CockroachDB replicas](https://cdn.hashnode.com/res/hashnode/image/upload/v1762612478598/dee9f9e7-6b31-4b06-aed3-e2b0b97268fd.png)

Also, check your CockroachDB Admin UI – the new nodes should now appear in the cluster overview.

![Newly added nodes in the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1762612539734/30e01a7d-3d2b-4160-be90-2988a161d87d.png)

P.S: You might experience some issues when upscaling your cluster, especially if you don’t have sufficient memory and CPU on your PC or wherever you’re running your Kubernetes cluster.

::: warning The Wrong Way to Downscale

Now, what if your workload reduces and you’d like to cut costs by scaling down from 5 replicas back to 3?

You might think, *“Oh, I’ll just reduce the number of replicas in the Helm chart from 5 to 3 and redeploy.”* But hold on, that’s very wrong! 😅

Scaling up CockroachDB is simple…but scaling down must be done carefully, because of certain factors which will explain.

:::

### Decommissioning a Node Before Scaling Down the Cluster

Before you go ahead and reduce the number of replicas in your CockroachDB cluster, it’s important to follow the right process.

You *can’t* just go from 5 replicas down to 3 and expect everything to go smoothly. There are steps you must take.

#### Why you can’t just scale from 5 to 3 instantly

If you reduce your cluster size too quickly, you might:

- Lose data redundancy or fail to meet the required replication factor.
- Cause data rebalancing to happen under heavy load, which can slow queries.
- Put your cluster into a state where certain ranges or data replicas don’t have enough copies to remain fault-tolerant.

#### ✅ The correct approach: Decommission first, then scale down one node at a time

Here’s the safe way to downscale:

1. **Decommission** the node you plan to remove.
2. Once decommissioning is complete, **reduce the replica count** (for example, from 5 to 4).
3. Delete the disk/PVC tied to that removed node.
4. Repeat the process (remove one node at a time) until you reach your target size (for example, down to 3 replicas).

#### Step-by-step: Decommission the 5th node (before scaling 5 to 4)

1. **Create a client pod** to run CockroachDB commands.<br/>Create a file named <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-client.yml` with this content:

```yaml title="cockroachdb-client.yml"
apiVersion: v1
kind: Pod
metadata:
  name: cockroachdb-client
spec:
  serviceAccountName: <SA>
  containers:
    - name: cockroachdb-client
      image: cockroachdb/cockroach:v25.3.1
      imagePullPolicy: IfNotPresent
      command:
        - sleep
        - "2147483648"
  terminationGracePeriodSeconds: 300
```

Replace `<SA>` with your CockroachDB service account name (find it via `kubectl get sa -l app.kubernetes.io/name=cockroachdb`).
    
![The CockroachDB service account details](https://cdn.hashnode.com/res/hashnode/image/upload/v1762620657038/34d5eb4b-de16-4e8a-b85c-1e7bf6b76172.png)

2. Apply the manifest:

```sh
kubectl apply -f cockroachdb-client.yml
```

3. Confirm the pod is running:

```sh
kubectl get pods
```

You should see `cockroachdb-client`.

4. Exec into the client pod:

```sh
kubectl exec -it cockroachdb-client -- bash
```

5. Get the list of nodes and IDs:

```sh
./cockroach node status --insecure --host <SERVICE_NAME>
```

Find your service name: `kubectl get svc -l app.kubernetes.io/component=cockroachdb`. In our case it’s `crdb-cockroachdb-public`.

You’ll see nodes with IDs 1, 2, 3, 4, 5. Each maps to a replica pod like `crdb-cockroachdb-0`, `-1`, `-2`, `-3`, `-4`.

![The nodes in the CockroachDB cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1762620790692/af8d382e-71db-4eab-af7a-a3491d98c8a8.png)

6. **Decommission the node with the highest index** (since Kubernetes will remove the highest-numbered replica when scaling down).<br/>For example, if you’re removing the pod `crdb-cockroachdb-4…`, and the node ID is 5:

![The node to be decommissioned](https://cdn.hashnode.com/res/hashnode/image/upload/v1762620838125/b51856cb-2fbb-4b24-ba41-21f572c7678c.png)

Run the command below to decommission the 5th node.

```sh
./cockroach node decommission 5 --host crdb-cockroachdb-public --insecure
```

7. Navigate to the CockroachDB dashboard, and monitor until the node status shows as `decommissioned`.<br/>In the CockroachDB Console’s Cluster Overview page, you’ll see formerly removed nodes under “Recently Decommissioned Nodes”.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1762620923692/e678b21b-e2cc-4fe5-bd5b-46c4b0248958.png)

8. **Scale down the replicas** in your Helm values file:

```yaml titile="cockroachdb-values.yml"
statefulset:
  replicas: 4
# ...
```

Then run:

```sh
helm upgrade crdb cockroachdb/cockroachdb -f cockroachdb-values.yml
```

9. Verify pods:

```sh
kubectl get pods
```

You should now see 4 CockroachDB replica pods.
    
10. **Delete the PVC** for the removed node (to avoid paying for storage you’re no longer using):

```sh
kubectl delete pvc datadir-crdb-cockroachdb-4
```

11. Repeat the process for the next node if you want to go from 4 to 3 replicas: decommission node #4 next, scale to 3, delete its PVC, and so on.

After you’re done, you’ll have the target state (for example, 3 nodes) safely and cleanly without causing cluster instability or data loss.

![Scaling down to 3 nodes, the nodes status on the CockroachDB dashboarrd](https://cdn.hashnode.com/res/hashnode/image/upload/v1762621007089/cf7fce07-a3a6-4b01-9536-1d5476c2119e.png)

To learn more about scaling down your CockroachDB nodes, visit the [<VPIcon icon="iconfont icon-cockroach-db"/>official CockroachDB docs](https://cockroachlabs.com/docs/stable/scale-cockroachdb-kubernetes?filters=helm#remove-nodes).

Note that you should **NOT** use Horizontal Pod Autoscalers for scaling up and down your CockroachDB cluster.

Remember, before scaling down, you need to **DECOMMISSION THE NODES FIRST**, and **scale down ONE AT A TIME**!

However, the Horizontal Pod Autoscalers do NOT obey this. So if you intend to auto-scale your CockroachDB cluster, it's best to have a fixed size of replicas, for example, 3, 5, 7. Then set up a Vertical pod Autoscaler to scale their CPU and RAM (Remember to set the Memory and CPU requests and limits to the same quantity to prevent eviction as explained earlier).

---

## What to Consider When Deploying CockroachDB on Google Kubernetes Engine (GKE) ☁️

Up until now we’ve been working in a **development environment** (using Minikube, local setups), testing and learning.

Now we’re ready to move into **production mode 🤓**. And one of the best places to host CockroachDB in production is on GKE.

In this section, we’ll cover GKE-specific considerations, such as storage classes, load balancers, networking, and how to secure our CockroachDB cluster on GKE using mTLS for authenticating our clients and encrypting any data sent to and from our CockroachDB cluster.

### Creating Your GKE Cluster

To get started, head over to the [<VPIcon icon="iconfont icon-gcp"/>Google Cloud Console](https://console.cloud.google.com/).

In the search bar at the top, type “Kubernetes” and click on “Kubernetes Engine” from the dropdown.

![Searching the Kubernetes Engine resource](https://cdn.hashnode.com/res/hashnode/image/upload/v1762836788168/0d509529-69fb-4308-ba05-6a1426ee7fe1.png)

You’ll be taken to the Kubernetes Engine page. On the left sidebar, click “Clusters.” Then click the “Create” button at the top.

![Creating a new cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1762836843514/fc6d59a2-5b9d-4dee-9fea-7bbb7fc2a023.png)

::: note

You’ll need to enable the **Compute Engine API** before you can create a GKE cluster. If you haven’t done that yet, Google Cloud will automatically redirect you to a page where you can enable it. Just click “Enable”, then return to the cluster page.

:::

![Enabling the Compute Engine API](https://cdn.hashnode.com/res/hashnode/image/upload/v1763998084001/3ecbe47c-3def-4f9c-bc80-dabe2c0002c8.png)

You can also learn more about enabling APIs in Google Cloud here: [<VPIcon icon="iconfont icon-gcp"/>Enable APIs in Google Cloud](https://docs.cloud.google.com/endpoints/docs/openapi/enable-api).

Once you’re back, you’ll see the cluster creation page. If it defaults to Autopilot, click “Switch to Standard cluster” in the top-right corner. This gives you more control over node settings.

![Switching to Standard Cluster settings](https://cdn.hashnode.com/res/hashnode/image/upload/v1762836938958/a2c35e79-6404-4c3a-a821-94d4ce926839.png)

Under Cluster basics, give your cluster a name – something like `cockroachdb-tutorial` works great! Then, set Location type to Zonal (that’s fine for now).

![Configuring Zonal clusters](https://cdn.hashnode.com/res/hashnode/image/upload/v1762836985443/eb7b1f79-66e3-4ca4-bfe3-842c5571509b.png)

On the left sidebar, go to “Node pools.” You’ll see a default pool already added.

- Keep the name as is.
- Set the Number of nodes to 1.
- Enable the Cluster autoscaler option (so it can scale up automatically later).
- Set the Maximum number of Nodes to 10, and the minimum to 0.

![Modifying our default node pool, the cluster autoscaler, etc](https://cdn.hashnode.com/res/hashnode/image/upload/v1762918866561/89a00b2c-46e8-440d-8662-77386cc2cf0e.png)

Next, click the dropdown arrow beside “default-pool” and select “Nodes.” Here, set up your node specifications:

- **VM family:** `E2`
- **Machine type:** `Custom`
- **vCPUs:** 2
- **Memory:** 7 GB
- **Boot disk type:** Standard persistent disk
- **Disk size:** 50 GB

![Configuring the E2 Machine type](https://cdn.hashnode.com/res/hashnode/image/upload/v1762837157043/89da8297-8ecc-4369-aef5-c3b0e75e37be.png)

![Configuring our default pool CPU, RAM, and disk](https://cdn.hashnode.com/res/hashnode/image/upload/v1762920102117/173a1d66-d31b-49e3-835b-436ec2781b49.png)

When all that’s set, click “Create.” Your cluster will start provisioning.

### Connecting to your GKE cluster

Once your GKE cluster creation is complete (this might take a few minutes), you’ll see something like this in the console:

![Accessing out new cluster page](https://cdn.hashnode.com/res/hashnode/image/upload/v1762844143298/042cc870-82ae-4981-b7c8-d80b187f37a9.png)

Next, click the “Connect” link at the top of the page. A modal will pop up. Copy the CLI command you see.

![Getting the command to access the cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1762844213835/119b603c-26c3-46ee-83e1-8feba78031a7.png)

It’ll look something like:

```sh
gcloud container clusters get-credentials cockroachdb-tutorial --zone us-central1-a --project <PROJECT_NAME>
```

::: note

To run this command successfully, you need to have the `gcloud` CLI tool installed. If you don’t have it yet, visit [<VPIcon icon="iconfont icon-gcp"/>Install Google Cloud SDK](https://docs.cloud.google.com/sdk/docs/install) and pick the steps for your OS.

:::

After installing the `gcloud` CLI, run:

```sh
gcloud auth login
```

This authenticates your terminal with your Google Cloud account so you can access the cluster securely.

After authenticating your terminal with access to Google Cloud, run the command you copied earlier. You should see something like this:

![The command to provide your terminate your terminal to the newly created Kubernetes cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1762844890936/12e6d8a7-b0ae-44d1-a77c-aeb118ba269b.png)

Now run the command to retrieve your pods, `kubectl get po`. This will retrieve the pods from your new cluster on Google Kubernetes Engine, not Minikube.

For now, we’ve not deployed anything yet, so the namespace should be empty.

But we should have at least 1 worker node available. Run the `kubectl get nodes` command to view it. You should see something similar to this (GKE takes care of our control plane for us, so when we view the nodes, we’ll only see the worker nodes).

![The available nodes in the GKE cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1762917947091/c29eb598-1723-43d0-a77f-c6611d04d3d8.png)

### Deploying CockroachDB in Production (on GKE)

Now that we’ve successfully created our Google Kubernetes Engine (GKE) cluster, it’s time to deploy our CockroachDB cluster in it – this time, in production mode.

Unlike our earlier Minikube setup (which we used for local development), deploying to GKE introduces new considerations like security, storage classes, and authentication methods – all tailored for a real-world production environment.

To get started, create a new file called <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-production.yml`, and paste the following configuration inside:

```yaml title="cockroachdb-production.yml"
statefulset:
  replicas: 3
  resources:
    requests:
      memory: "3Gi"
      cpu: 1
    limits:
      memory: "3Gi"
      cpu: 1
  serviceAccount:
    create: true
    name: "crdb-cockroachdb"
    annotations:
      iam.gke.io/gcp-service-account: <GOOGLE_SERVICE_ACCOUNT>

storage:
  persistentVolume:
    size: 10Gi
    storageClass: premium-rwo

tls:
  enabled: true

init:
  labels:
    app.kubernetes.io/component: init
  jobs:
    wait:
      enabled: true
```

Replace the placeholder `<GOOGLE_SERVICE_ACCOUNT>` with the **CockroachDB backup service account** you created earlier (in the “Backing Up CockroachDB to Google Cloud Storage” section). It should look something like this `cockroachdb-backup@<PROJECT_ID>.iam.gserviceaccount.com`.

### Understanding the Configuration

Let’s break down what’s happening in this production Helm values configuration and how it differs from the one we used in Minikube.👇🏽

#### 1. Modified the `statefulset` Configuration

We’re allocating 3 GiB of RAM and 1 vCPU to each replica, both as requests and limits.

This ensures that each node has enough guaranteed resources and avoids Kubernetes evicting it due to it using more than its requested resources.

We also defined a **service account** and annotated it with a GCP service account using the `iam.gke.io/gcp-service-account` annotation.

This annotation allows CockroachDB to securely access Google Cloud services (like Google Cloud Storage) without using static JSON key files (key.json), thanks to a GKE feature called **Workload Identity**.

In production, we let GKE handle authentication to Google services instead of mounting key files.

#### 2. Removed `podSecurityContext`

In Minikube, we included this section:

```yaml
# ...
podSecurityContext:
  fsGroup: 1000
  runAsUser: 1000
  runAsGroup: 1000
...
```

We did that to give CockroachDB permission to access our local disk for persistent storage. But in GKE, this isn’t needed. Google Cloud handles storage mounting securely on our behalf, so we can safely omit this part.

#### 3. Removed `podAntiAffinity` and `nodeSelector`

In our Minikube deployment, we used:

```yaml
...
podAntiAffinity:
  type: ""
nodeSelector:
  kubernetes.io/hostname: minikube
...
```

That was just to **force all CockroachDB instances to run on the same node** on Minikube.

But in production, we *want* each replica on a different VM. This ensures high availability, even if one VM fails, only one CockroachDB replica is affected, and the cluster stays active.

Since our cluster uses a replication factor of 3, at least 2 replicas (a quorum) need to be active for the database to stay online, else, it will crash 🥲.

#### 4. Removed `env`, `volumes`, and `volumeMounts`

In Minikube, we had to manually mount the Service Account key:

```yaml
...
env:
  - name: GOOGLE_APPLICATION_CREDENTIALS
    value: /var/run/gcp/key.json
volumes:
  - name: gcp-sa
    secret:
      secretName: gcs-key
volumeMounts:
  - name: gcp-sa
    mountPath: /var/run/gcp
    readOnly: true
...
```

This was needed so CockroachDB could access our Google Cloud Storage bucket for backups.

But in production, we don’t use key files. Instead, we use a GKE feature called Workload Identity.

It securely binds a Kubernetes Service Account to a Google Service Account, giving our CockroachDB pods the same permissions as the GCP account: no keys, no secrets, and much safer 🔒

#### 5. Updated `storage.persistentVolume.storageClass`

In Minikube, we used a standard disk:

```yaml
...
storage:
  persistentVolume:
    size: 5Gi
    storageClass: standard
...
```

But for production, we’re switching to a faster SSD:

```yaml
...
storage:
  persistentVolume:
    size: 10Gi
    storageClass: premium-rwo
...
```

This uses Google Cloud’s `pd-ssd` disk type which is the recommended choice for CockroachDB due to its **high IOPS** (read/write operations per second) and **throughput**. This gives our cluster faster read and write speeds under load, leading to better performance.

#### 6. Enabled TLS for Secure Communication

In development, we disabled TLS:

```yaml
tls:
  enabled: false
```

That made it easier and simpler to connect without dealing with certificates.

But in production, security is non-negotiable. We’re enabling TLS to ensure that all communication with CockroachDB is encrypted in transit, and that only clients with **valid certificates** (signed by the same authority) can connect. This is **mutual TLS (mTLS)** authentication.

mTLS ensures that both sides (client and server) prove who they are, preventing impersonation or man-in-the-middle attacks. It’s one of the strongest ways to secure a production database connection.

To learn more about TLS and mTLS encryption, check out:

- [**Understanding Website Encryption (FreeCodeCamp)**](/freecodecamp.org/understanding-website-encryption.md)

<SiteInfo
  name="Mutual TLS (mTLS): A Deep Dive into Secure Client-Server Communication"
  desc="Mutual SSL/TLS also called mutual authentication or two-way SSL (mTLS) is a security mechanism that extends traditional TLS to ensure both…"
  url="https://medium.com/@LukV/mutual-tls-mtls-a-deep-dive-into-secure-client-server-communication-bbb83f463292/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*IDc867qgk0YTnXGx6sU66w.png"/>

### Installing the CockroachDB Cluster on GKE

We’ll use the values file you created (<VPIcon icon="iconfont icon-yaml"/>`cockroachdb-production.yml`) and deploy our CockroachDB cluster in our GKE cluster using Helm.

#### Deploy the cluster

Run the following command:

```sh
helm install crdb cockroachdb/cockroachdb -f cockroachdb-production.yml
```

This command tells Helm to install a release named `crdb` using the `cockroachdb/cockroachdb` chart with your custom production-values file.

This step will take a few minutes. GKE will spin up 3 (or more) worker nodes to host the CockroachDB replicas.

Thanks to pod anti-affinity rules, you’ll typically see **one replica pod per VM** (which improves fault tolerance).

#### Verify the pods

Once provisioning is done, check the pods:

```sh
kubectl get pods
```

You should see three CockroachDB replica pods (for example: `crdb-cockroachdb-0`, `crdb-cockroachdb-1`, `crdb-cockroachdb-2`) in `Running` status.

#### Verify the storage class (SSD)

Now check the persistent volume claims to confirm they’re using the fast SSD storage class you requested:

```sh
kubectl get pvc
```

Look for your PVCs (persistent volume claims) and check the `STORAGECLASS` column. You should see something like `premium-rwo` instead of `standard` or `standard-rwo`. This confirms that your replicas are using the high-performance disk type you configured.

![The CockorachDB replicas and disk in production](https://cdn.hashnode.com/res/hashnode/image/upload/v1762928441524/d7e3d17f-c144-468f-8cc5-d71628ac6a3b.png)

::: important 

This is important, because in production you want good disk IOPS and throughput. Slower disks can bottleneck the database.

:::

### Connecting to Our CockroachDB Cluster (Now That TLS + mTLS Are Enabled)

Now that we’ve enabled TLS encryption and mTLS authentication, let’s actually try connecting to the cluster so you can *see* what this security setup looks like in action.

We’ll break down in more detail what TLS and mTLS mean shortly. But for now, let’s jump straight into trying to connect – because once you see the behavior, the explanation becomes much easier to understand.

#### Step 1: Expose the CockroachDB Cluster to Your Local PC (Using Port Forwarding)

Just like we've been doing from the start, we’ll expose our CockroachDB cluster through **port-forwarding**.

Open a new terminal window and run:

```sh
kubectl port-forward svc/crdb-cockroachdb-public 26259:26257
```

What this means:

- The first port (26259) is the port on your computer.
- The second port (26257) is the port inside the CockroachDB cluster.
- Format is: `<YOUR_COMPUTER_PORT>` **:** `<COCKROACHDB_PORT>`

So now, CockroachDB will be reachable locally at `localhost:26259`.

#### Step 2: Open Beekeeper Studio and Create a Fresh Connection

If Beekeeper Studio is still connected to our old Minikube cluster, or you're not seeing the “new connection” screen, just press `Ctrl + Shift + N`. This opens a new connection window instantly.

#### Step 3: Enter the Connection Details

Now fill in these fields:

- **Port:** `26259`
- **User:** `root`
- **Default Database:** `defaultdb`

Now click Test Connection.

And boom! You should see a message telling you something like:

> “This cluster is running in secure mode. You must use SSL to connect.”

It’ll look similar to this:👇🏾

![Trying to connect to the new CockroachDB cluster in insecure mode](https://cdn.hashnode.com/res/hashnode/image/upload/v1763193779864/f3e7abcb-34b0-4c21-8652-48a03e4ff6c9.png)

This is good: it means our CockroachDB cluster is officially in **secure mode**, and it’s rejecting any connection that doesn’t include proper TLS certificates.

### Connecting via Mutual TLS (mTLS) — Why We Need a Certificate for Our `root` User

Now that our CockroachDB cluster is officially running in secure mode, we can’t just connect to it with a username and port anymore. CockroachDB won’t accept that.

To talk to it, **we must connect using Mutual TLS (mTLS)**.

Why? Because TLS alone only protects the connection in one direction (you verifying the server). mTLS protects the connection in both directions (you verify the server, and the server also verifies *you*).

Let’s break this down in simple, everyday English 👇🏾

#### Why TLS Exists in the First Place

Whenever you send anything to CockroachDB, like a query, a connection, a password, whatever, it’s all data moving over a network – for example, the internet.

Without protection, anyone could intercept it and read the data being sent to your DB while it’s on its way  
TLS fixes that

✔️ The CockroachDB cluster has its own **public key + private key**  
✔️ It has a **certificate** that carries its public key  
✔️ When you connect, the cluster sends you this certificate  
✔️ Your database tool, for example Beekeeper, uses the public key in the process of encrypting all your traffic sent to the DB  
✔️ Only CockroachDB can decrypt it with the help of its private key

This gives you encryption and proof you’re really talking to CockroachDB, not some fake service pretending to be it.

#### Why mTLS Exists (Mutual TLS)

TLS protects the server – CockroachDB. mTLS protects **both sides**: you and CockroachDB.

So CockroachDB also wants YOU to send your certificate.

But not just any certificate. Your certificate must be:

- Signed by **THE SAME Certificate Authority (CA)**
- Trusted by the CockroachDB cluster
- Mapped to a CockroachDB user (like `root`)

This is how CockroachDB says:

> “Let me see your certificate so I know you’re someone I should allow in.”

And we reply:

> “Here is my certificate, signed by the same CA that signed yours.”

At that point, both sides trust each other.

If this still feels abstract, [<VPIcon icon="fa-brands fa-youtube"/>watch this video](https://youtu.be/EnY6fSng3Ew). It explains TLS beautifully.

<VidStack src="youtube/EnY6fSng3Ew" />

### Let’s Explore Our Cluster’s Certificate

Remember that the Helm chart automatically created:

- The CockroachDB Certificate Authority
- The CockroachDB node certificates
- The keypairs used for encryption

You can list all the CockroachDB-related Kubernetes secrets with:

```sh
kubectl get secrets
```

The one we're interested in is:

```sh
crdb-cockroachdb-node-secret
```

If you inspect this secret, you’ll see three keys inside:

- <VPIcon icon="fas fa-key"/>`ca.crt`: the CA’s public certificate
- <VPIcon icon="fas fa-key"/>`tls.key`: the CockroachDB node’s private key
- <VPIcon icon="fas fa-key"/>`tls.crt`: the CockroachDB node certificate

Now let’s decode the CockroachDB node certificate.

Run this:

```sh
kubectl get secret crdb-cockroachdb-node-secret \
-o jsonpath='{.data.tls.crt}' | base64 -d > crdb-node.crt
```

This gives you the raw certificate (which looks like gibberish):

```plaintext title="output"
-----BEGIN CERTIFICATE-----
MIIEGDCCAwCgAwIBAgIQWgOPJa4OLoZZjcXLgDF3bjANBgkqhkiG9w0BAQsFADAr
...
-----END CERTIFICATE-----
```

Let’s decode it into something readable:

```sh
openssl x509 -in ./crdb-node.crt -text -noout > crdb-node.crt.decoded
```

Open the `crdb-node.crt.decoded` file. This is the **human-readable** CockroachDB cluster certificate.

::: note N.B.

You need to have the `openssl` tool installed in order to be able to make the certificate human-readable. If you don’t, [install it following this tutorial (<VPIcon icon="iconfont icon-github"/>`openssl/openssl`)](https://github.com/openssl/openssl#download).

:::

### Understanding the Certificate Sections (Explained Super Simply)

#### 1. Issuer

You’ll see something like:

```plaintext title="output"
Issuer: O = Cockroach, CN = Cockroach CA
```

This tells us:

- The certificate was signed by a Certificate Authority created by the Helm chart
- The **Organization (O)** is “Cockroach”
- The **Common Name (CN)** is “Cockroach CA”

This basically means:

> “This certificate comes from the CockroachDB internal CA.”

#### 2. Subject

You’ll also see this:

```plaintext title="output"
Subject: O = Cockroach, CN = node
```

What does this mean?

##### Organization = Cockroach

- This simply groups all CockroachDB-generated certificates under one “organization label.”
- It doesn’t refer to the company. It’s just a logical grouping created by CockroachDB’s built-in toolset.

##### Common Name = node

- This tells CockroachDB that this certificate belongs to a **cluster node**, not a user or a client machine.
- In CockroachDB, node certificates are used for:
    1. DB-to-DB communication
    2. cluster gossip
    3. handling incoming connections from clients (you)

So this certificate is saying:

> “Hi, I’m a CockroachDB node. Please trust me as part of the cluster.”

#### 3. Extended Key Usage (EKU)

Scroll down and you’ll see:

```plaintext title="output"
X509v3 Extended Key Usage:
    TLS Web Server Authentication
    TLS Web Client Authentication
```

This is *super important*, because it defines **how** this certificate is allowed to be used.

Let’s simplify it:

#### TLS Web Server Authentication

This means:

> “This certificate can be presented **by a server** to prove its identity.”

In our case, the CockroachDB node uses this certificate to prove to you (the client) that it is the real CockroachDB server. Think of it like flashing an ID card before letting you in.

#### TLS Web Client Authentication

This means:

> “This certificate can also be used **as a client certificate**.”

Why would a server have a client certificate? Well, because in CockroachDB, nodes (DBs) talk to each other. When node A connects to node B, node A is a **client**, and node B is a **server**.

So the same certificate serves two roles. Your local machine will use a different certificate, created specifically for your `root` user. We’ll generate that soon.

### Creating a Client Certificate (So We Can Finally Connect to CockroachDB)

Now that we’ve seen how the CockroachDB node certificate works, let’s generate our client certificate – the one we’ll use to connect from Beekeeper Studio.

Remember: CockroachDB is running in secure mode, so it won’t accept any connection that doesn’t come with a valid, signed certificate.

To fix that, let’s build a tiny Kubernetes pod whose only job is to create a certificate for our `root` SQL user.

#### Step 1: Create a File Called <VPIcon icon="iconfont icon-yaml"/>`gen-root-cert.yml`

Paste this into it:

```yaml title="gen-root-cert.yml"
apiVersion: v1
kind: Pod
metadata:
  name: gen-root-cert
spec:
  restartPolicy: Never
  volumes:
    - name: crdb-ca
      secret:
        secretName: crdb-cockroachdb-ca-secret
        items:
          - key: ca.crt
            path: ca.crt
          - key: ca.key
            path: ca.key
  containers:
    - name: gen
      image: cockroachdb/cockroach:v25.3.1
      command: ["sh", "-ec"]
      args:
        - |
          mkdir -p /out

          # Copy the CockroachDB cluster Certificate Authority certificate file <VPIcon icon="fas fa-key"/>`ca.crt` (for Mutual TLS authentication)
          cp /ca/ca.crt /out/ca.crt

          # Create the client certificate and key pair for the SQL user 'root' using the CockroachDB cluster Certificate Authority private key `ca.key`
          /cockroach/cockroach cert create-client root \
            --certs-dir=/out \
            --ca-key=/ca/ca.key \
            --lifetime=5h \
            --overwrite

          # List the generated files
          ls -al /out

          # Keep the pod alive so we can kubectl cp the files
          sleep 3600
      volumeMounts:
        - { name: crdb-ca, mountPath: /ca, readOnly: true }
      resources:
        requests:
          memory: "50Mi"
          cpu: "10m"
        limits:
          memory: "500Mi"
          cpu: "50m"
```

So how does this work?

We previously mentioned that the Helm chart created a secret, `crdb-cockroachdb-ca-secret`.

This secret contains:

- The Certificate Authority public certificate
- The private key (used for signing)
- The CA metadata

CockroachDB requires that the server certificate (node cert) and the client certificate (your root cert) be signed by **THE SAME CA**. Because this ensures both sides trust each other.

So what do we do?

We mount the CA secret into the pod:

```yaml title="gen-root-cert.yml"
volumes:
  - name: crdb-ca
    secret:
      secretName: crdb-cockroachdb-ca-secret
```

This gives the pod access to:

- `/ca/ca.crt`: CA public certificate
- `/ca/ca.key`: CA *private* key

And with these, we can sign new client certificates inside the cluster.

The important command inside the pod:

```sh
/cockroach/cockroach cert create-client root \
--certs-dir=/out \
--ca-key=/ca/ca.key \
--lifetime=5h \
--overwrite
```

::: info What this does:

- Generates a brand new public/private key pair for the `root` SQL user
- Uses the CA private key to **sign the client certificate**
- Places everything inside `/out`
- Makes the certificate valid for **5 hours**

:::

If we passed `demo` instead of `root`, then the certificate CN would be `demo`, and CockroachDB would treat anyone using that certificate as the `demo` SQL user.

That’s how CockroachDB identifies and authenticates users when running in secure mode.

#### Step 2: Deploy the Pod

Run:

```sh
kubectl apply -f gen-root-cert.yml
```

Give it a minute to start and generate the files.

#### Step 3: Copy the Certificates to Your Local PC

We need three files:

- <VPIcon icon="fas fa-key"/>`client.root.crt`: client certificate
- <VPIcon icon="fas fa-key"/>`client.root.key`: private key
- <VPIcon icon="fas fa-key"/>`ca.crt`: CA certificate

Copy them from the pod to your machine:

```sh
kubectl cp default/gen-root-cert:/out/client.root.crt ./client.root.crt
kubectl cp default/gen-root-cert:/out/client.root.key ./client.root.key
kubectl cp default/gen-root-cert:/out/ca.crt             ./ca.crt
```

Now your folder should contain:

```plaintext title="files"
client.root.crt
client.root.key
ca.crt
```

These are the files Beekeeper Studio needs for mTLS.

#### Step 4: Decode the Client Certificate (Just Like We Did for the Node Certificate)

Run:

```sh
openssl x509 -in client.root.crt -text -noout > crdb-root.crt.decoded
```

Open the `crdb-root.crt.decoded` file and look at the contents.

#### Understanding the Client Certificate

##### 1. Issuer

You'll see `Issuer: O = Cockroach, CN = Cockroach CA`

This is the same Issuer as the CockroachDB node certificate.

This confirms that both certificates were signed by the *same* Certificate Authority, that they trust each other, and that mTLS will work perfectly.

##### 2. Subject

You’ll see: `Subject: O = Cockroach, CN = root`

This means that the Organization is just a label grouping CockroachDB identities, and that the Common Name is `root`. This is VERY important.

The CN of a client certificate literally tells CockroachDB:

> “This connection belongs to the SQL user named `root`.”

If CN was `demo`, CockroachDB would authenticate you as the `demo` SQL user.

#### Extended Key Usage (EKU)

You should see: `TLS Web Client Authentication`.

This is exactly what we want. It tells CockroachDB:

> “This certificate is only for clients connecting to the database.”

Unlike node certificates, you will NOT see: `TLS Web Server Authentication`.

Why?

Because:

- **Server Authentication** = for certificates the SERVER SHOWS TO THE CLIENT. For example: CockroachDB nodes proving they are legitimate.
- **Client Authentication** = for certificates THE CLIENT SENDS TO THE SERVER. For example: You proving you are the real `root` user.

#### Why your client certificate **cannot** be used as a server certificate

Because a server certificate says:

> “Trust me, I AM the CockroachDB server.”

But your client certificate says:

> “Trust me, I am an authenticated user.”

Two very different identities. And CockroachDB will *reject* any certificate used in the wrong role.

So having only TLS Web Client Authentication in your certificate is perfect for our use case.

### Connecting to Our CockroachDB Cluster Securely (Using mTLS)

Now that we’ve successfully generated the certificates and key pairs we need, it's time to use them to securely connect to our CockroachDB cluster from Beekeeper Studio.

Remember: CockroachDB is running in secure mode, so without these certificates, it will *reject all incoming connections*, even if you enter the correct username and password.

Let’s walk through the steps.👇🏾

#### Step 1: Make Sure Port Forwarding Is Still Running

Before connecting, ensure that your CockroachDB cluster is still exposed to your PC.

If you already closed the previous terminal window, simply re-run this:

```sh
kubectl port-forward svc/crdb-cockroachdb-public 26259:26257
```

This makes your CockroachDB node reachable at: `localhost:26259`. If this step isn’t active, *Beekeeper Studio will not be able to connect*.

#### Step 2: Open Beekeeper Studio and Set Up the Connection

Launch Beekeeper Studio and open a fresh connection window (Ctrl + Shift + N if needed).

Now fill in the fields like this:

| Field | Value |
| --- | --- |
| **Connection Type** | CockroachDB |
| **Host** | `localhost` |
| **Port** | `26259` |
| **User** | `root` |
| **Default Database** | `defaultdb` |

Now enable the **“Enable SSL”** option. Once enabled, expand the SSL section and set the following three fields:

- **CA Cert:** Set this to the location of: <VPIcon icon="fas fa-key"/>`ca.crt`. This is the root Certificate Authority file you copied earlier using: `kubectl cp default/gen-root-cert:/out/ca.crt ./ca.crt`. It should still be in your project’s root directory (for example, `cockroachdb-tutorial/`).
- **Certificate:** Set this to the location of: <VPIcon icon="fas fa-key"/>`client.root.crt`
- **Key File:** Set this to the location of: <VPIcon icon="fas fa-key"/>`client.root.key`

![Connecting to the CokcorachDB cluster from Beekeeper Studio in "Secure" mode](https://cdn.hashnode.com/res/hashnode/image/upload/v1763389469459/bbdb17c5-1c3b-4163-932f-3cd5382160f4.png)

#### Step 3: Click “Connect”

Once all the fields are set properly, click **Connect**.

If everything was done correctly, you should now be connected to your CockroachDB cluster securely over Mutual TLS.

If the connection fails:

- Double-check your certificate paths
- Ensure port-forwarding is running
- Verify the user is `root`
- Confirm the selected connection type is `CockroachDB`.

#### Step 4: Run Your First Secure Query

Now that you're connected, let’s verify everything works by running:

```sql
SHOW users;
```

You should see two users automatically created by CockroachDB:

- **admin**
- **root**

In the next subsection, we’ll create a **new SQL user** and generate a certificate for that user (just like we did for the `root` user) so you’ll understand how CockroachDB handles user authentication in production environments.

### Restoring Our Previous Database into the New GKE CockroachDB Cluster (without SA keys)

Now that our CockroachDB cluster is up and running on GKE – fully secured with TLS encryption and mTLS authentication – it’s time to bring back the data from our previous setup.

Remember how we backed up our CockroachDB database (running on Minikube) to Google Cloud Storage?

Well, now we’re going to restore that same backup into our new production cluster on GKE. But before CockroachDB can access our bucket, we must give it permission – securely.

And here’s the cool part: **we don’t need to use Service Account keys anymore.**

#### Why We Don’t Need Service Account Keys on GKE

Earlier, in the backup section, we generated a Service Account key on our PC and mounted it into our Minikube cluster.

But for GKE, we intentionally left out the following fields in our <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-production.yml`:

- `env`
- `volumes`
- `volumeMounts`

The reason? GKE supports something called **Workload Identity**.

Workload Identity lets us securely connect Kubernetes Service Accounts (KSAs) to Google Cloud Service Accounts (GSAs), without storing or mounting any secret keys. The authentication happens “implicitly” thanks to Google’s metadata server.

💡 Workload Identity works easily when your cluster is running on GKE. It’s more complex to set up on Minikube, Kind, EKS, AKS, or any other non-GKE cluster.

#### Step 1: Linking the Google Service Account to Our Kubernetes Service Account

We already touched this when deploying our cluster, but let’s look at the specific line again.

Open your <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-production.yml` Helm values file and scroll to the `serviceAccount` section. You should see something like this:

```yaml
...
serviceAccount:
    create: true
    name: "crdb-cockroachdb"
    annotations:
      iam.gke.io/gcp-service-account: cockroachdb-backup@<PROJECT_ID>.iam.gserviceaccount.com
...
```

Replace the `<PROJECT_ID>` placeholder with your real Google Cloud project ID.

If you’re unsure of the ID, go to Google Cloud Console, then to IAM & Admin, and finally to Service Accounts. Search for `cockroachdb-backup` and copy the project ID from there.

This annotation instructs GKE to automatically authenticate our CockroachDB pods as the `cockroachdb-backup` Google Service Account – no keys needed.

#### Step 2: Binding KSA ↔️ GSA Using Workload Identity

Annotating the Service Account isn’t enough. We still need to explicitly allow our KSA to “impersonate" the GSA.

Run this command to set the active project:

```sh
gcloud config set project <PROJECT_ID>
```

Now, apply the IAM policy binding:

```sh
gcloud iam service-accounts add-iam-policy-binding \
<GOOGLE_SERVICE_ACCOUNT> \
--role roles/iam.workloadIdentityUser \
--member "serviceAccount:<PROJECT_ID>.svc.id.goog[<NAMESPACE>/<KUBERNETES_SERVICE_ACCOUNT>]"
```

Replace the placeholders with:

- `<GOOGLE_SERVICE_ACCOUNT>` with `cockroachdb-backup@<PROJECT_ID>.iam.gserviceaccount.com`
- `<PROJECT_ID>` with your GCP project ID
- `<NAMESPACE>` with where CockroachDB runs (`default`)
- `<KUBERNETES_SERVICE_ACCOUNT>` with `crdb-cockroachdb`

After a few seconds, you should see something like:

```yaml
# Updated IAM policy for serviceAccount [cockroachdb-backup@<PROJECT_ID>.iam.gserviceaccount.com].
bindings:
- members:
  - serviceAccount:<PROJECT_ID>.svc.id.goog[default/crdb-cockroachdb]
  role: roles/iam.workloadIdentityUser
etag: ***
version: 1
```

Perfect. Your KSA can now access Google Cloud Storage automatically.

### Restoring Our Previous Database from Google Cloud Storage

Now that authentication is set up, let’s restore the backup we previously created in the Minikube cluster.

Open Beekeeper Studio and reconnect to your CockroachDB cluster (the one running on GKE).

Before restoring anything, let’s check if the `books` table exists:

```sql
SELECT * FROM books;
```

You should see an error saying the table doesn’t exist. Don’t worry, that’s expected.

### Now, Let’s Restore the Data 🎉

Run this command:

```sql
RESTORE FROM LATEST IN 'gs://<BUCKET_NAME>/cluster?AUTH=implicit';
```

Replace `<BUCKET_NAME>` with the name of the bucket you created earlier (for example: `cockroachdb-backup-7gw8u`).

CockroachDB will now:

- Authenticate using Workload Identity
- Find the latest backup inside your bucket
- Restore all tables, schemas, and data into your new GKE cluster

After a couple of minutes, you should get a Success message.

![Successfully restored CockroachDB database](https://cdn.hashnode.com/res/hashnode/image/upload/v1763393752870/f95d76c0-3722-491a-a97c-a1b8a79bdc79.png)

Now, run the query again:

```sql
SELECT * FROM books;
```

Boom! Your books from the Minikube cluster should now appear inside the new CockroachDB cluster running on GKE 😃.

### Connecting to the Database with a New User

So far, we’ve been connecting to our CockroachDB cluster using the `root` user. While this is super convenient for tutorials, it’s not recommended for real apps.

This is because the `root` user has advanced privileges – basically, full access to your entire cluster. If an attacker got hold of these credentials, or your application was compromised, they could do **A LOT** of damage. 😬

Instead, it’s best practice to create a user with **limited permissions** for your apps. This way, even if the user is compromised, the damage is contained.

#### Authentication Options for Users

CockroachDB is flexible when it comes to authentication:

1. **Password Authentication:** Create a user with a password and connect using just username + password (no client certificates required).
2. **Passwordless / Mutual TLS Authentication:** Create a user without a password, then connect using client certificates signed by the same CA (like we did for `root`).
3. **Both Password + Mutual TLS:** Create a user with a password and also connect using client certificates. This adds an extra layer of security.

In this subsection, we’ll start simple and use password authentication.

#### Step 1: Create the New User

Open your current connection in Beekeeper Studio (signed in as `root`) and run:

```sql
CREATE USER password_auth WITH PASSWORD 'supersecret';
```

You should see a message confirming the user was created successfully.

#### Step 2: Connect as the New User

Open a new Beekeeper Studio window (Ctrl + Shift + N). **DO NOT** exit/close the old window, as we’ll need it later.

Fill in the connection fields:

| Field | Value |
| --- | --- |
| **Connection Type** | CockroachDB |
| **Host** | `localhost` |
| **Port** | `26259` |
| **Database** | `defaultdb` |
| **User** | `password_auth` |
| **Password** | `huh` (for now, we’ll try a wrong password to see it fail) |

Click Connect.

❌ You’ll see an error about SSL connection being required.

Even though we’re connecting with a password instead of certificates, **enabling SSL is still important**. It encrypts the data between Beekeeper Studio and CockroachDB.

Without it, sensitive info like passwords and queries could be intercepted (man-in-the-middle attacks).

#### Step 3 — Enable SSL & CA Verification

- Tick **Enable SSL**
- Click the **CA Cert** field and select the <VPIcon icon="fas fa-key"/>`ca.crt` file in your project root (`cockroachdb-tutorial/`)

This ensures that Beekeeper Studio verifies it’s really talking to our CockroachDB cluster and protects against attackers trying to intercept the connection.

Now, click Connect again.

❌ Initially, you’ll still see a **Password authentication failed** error because we intentionally entered the wrong password.

#### Step 4: Connect With the Correct Password

Replace the password with `supersecret`, then click Connect.

You are now signed in as the `password_auth` user!

#### Step 5: Check Permissions

Run:

```sql
SELECT * FROM books;
```

❌ You should see an error stating that `password_auth` does not have permission to access the `books` table.

This is expected, as it confirms that our limited-access user can **only access what we explicitly grant it**. Even if compromised, the attacker can’t modify our entire database.

#### Step 6: Granting Access to Specific Tables

To allow `password_auth` to work with the `books` table, switch back to the `root` connection Beekeeper Studio window and run:

```sql
GRANT USAGE ON SCHEMA defaultdb.public TO password_auth;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE defaultdb.public.books TO password_auth;
```

This gives the user read and write access to the `books` table only.

#### Step 7: Verify the New User Access

Go back to the Beekeeper Studio window where you’re signed in as `password_auth` and run:

```sql
SELECT * FROM books;
```

Boom! You should now see the list of books from your restored database.

Our new user is fully functional with **limited privileges**, making it safe for use in real applications.

### Connecting with Passwordless Authentication (Mutual TLS)

We’ve already seen how to connect to the database using a user that authenticates with a password, and without any client certificates.

Now, let’s look at the opposite scenario: passwordless authentication via Mutual TLS (mTLS).

This is one of the strongest forms of authentication because instead of a password, the database verifies you using a **cryptographically signed certificate**.

Let’s walk through it.

#### Step 1: Create the `mtls_auth` User

Navigate back to the Beekeeper Studio window where you're currently signed in as the `root` user. Run:

```sql
CREATE USER mtls_auth;
```

You should see a success message confirming that the user has been created.

::: note N.B.

If this query fails, there’s a good chance your `root` client certificate has expired. Remember that we set a **5-hour lifetime** when generating it earlier.

:::

If this happens, delete the certificate-generation pod:

```sh
kubectl delete po/gen-root-cert
```

Then re-apply the `gen-root-cert.yml` manifest. Copy the newly generated <VPIcon icon="fas fa-key"/>`client.root.crt`, <VPIcon icon="fas fa-key"/>`client.root.key`, and <VPIcon icon="fas fa-key"/>`ca.crt` back to your PC. Then try creating the user again.

#### Step 2: Attempt Signing In as `mtls_auth` (Expect Failure)

Open a new Beekeeper Studio window (<kbd>Ctrl</kbd>+<kbd>v</kbd>+<kbd>v</kbd>).

Try filling in the connection settings using:

- User: `mtls_auth`
- SSL enabled
- CA Cert: <VPIcon icon="fas fa-key"/>`ca.crt`
- Client Cert: <VPIcon icon="fas fa-key"/>`client.root.crt`
- Client Key: <VPIcon icon="fas fa-key"/>`client.root.key`

Click Connect.

You’ll see an error message similar to this:

![Connecting as the `mtls_auth` user with the wrong certificate and key-pair](https://cdn.hashnode.com/res/hashnode/image/upload/v1763444971964/93f41787-425b-4e36-86da-4b688cef672f.png)

Why does this fail?

1. The user has no password, so password login is impossible.
2. You’re using the *root* certificate, not a certificate belonging to `mtls_auth`. CockroachDB is strict: each user must authenticate using *their own* certificate.

So let's fix that by generating a new certificate + key pair for the `mtls_auth` user.

#### Step 3: Create Certificate + Key for `mtls_auth`

Just like we generated certificates for the `root` user earlier, we’ll do the same for `mtls_auth`.

Create a new manifest named <VPIcon icon="iconfont icon-yaml"/>`gen-mtls_auth-cert.yml`.

Paste in this content:

```yaml title="gen-mtls_auth-cert.yml"
apiVersion: v1
kind: Pod
metadata:
  name: gen-mtls-auth-cert 
spec:
  restartPolicy: Never
  volumes:
    - name: crdb-ca
      secret:
        secretName: crdb-cockroachdb-ca-secret 
        items:
          - key: ca.crt
            path: ca.crt
          - key: ca.key
            path: ca.key
  containers:
    - name: gen
      image: cockroachdb/cockroach:v25.3.1
      command: ["sh", "-ec"]
      args:
        - |
          mkdir -p /out

          # Copy the CA certificate
          cp /ca/ca.crt /out/ca.crt

          # Create the client certificate and key pair for user 'mtls_auth'
          /cockroach/cockroach cert create-client mtls_auth \
            --certs-dir=/out \
            --ca-key=/ca/ca.key \
            --lifetime=5h \
            --overwrite

          # List generated files
          ls -al /out

          # Keep pod alive for kubectl cp
          sleep 3600
      volumeMounts:
        - { name: crdb-ca, mountPath: /ca, readOnly: true }
      resources:
        requests:
          memory: "50Mi"
          cpu: "10m"
        limits:
          memory: "500Mi"
          cpu: "50m"
```

Apply this file, wait for the pod to start, then copy the generated files:

```sh
kubectl cp default/gen-mtls-auth-cert:/out/client.mtls_auth.crt ./client.mtls_auth.crt 
kubectl cp default/gen-mtls-auth-cert:/out/client.mtls_auth.key ./client.mtls_auth.key
kubectl cp default/gen-mtls-auth-cert:/out/ca.crt ./ca.crt
```

Now we have the correct certificate + key pair for our new user.

#### Step 4: Connect as `mtls_auth`

Go back to the new Beekeeper Studio window and update the SSL fields:

- **CA Cert:** <VPIcon icon="fas fa-key"/>`ca.crt`
- **Certificate:** `client.mtls_auth.crt`
- **Key File:** `client.mtls_auth.key`

Click Connect.

This time, it should succeed instantly

#### Step 5 — Inspect the Certificate

To understand how CockroachDB links certificates to users, decode the certificate:

```sh
openssl x509 -in client.mtls_auth.crt -text -noout > client.mtls_auth.crt.decoded
```

Open the file, scroll to the Subject field, and you’ll see:

```plaintext title="client.mtls_auth.crt.decoded"
...
Subject: O = Cockroach, CN = mtls_auth
...
```

The `CN` (Common Name) is the username CockroachDB uses to authenticate the session.

This is how CockroachDB knows you’re connecting as the `mtls_auth` user without any password at all.

#### Step 6: Try Reading the Books Table

Run:

```sql
SELECT * FROM books;
```

❌ You’ll get a permission error, just like we did earlier with the `password_auth` user.

This is expected because `mtls_auth` has *no* privileges yet. Perfect!

#### Step 7: Grant Permissions to `mtls_auth`

Switch to the Beekeeper Studio window where you're signed in as `root`, and run:

```sql
GRANT USAGE ON SCHEMA defaultdb.public TO mtls_auth;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE defaultdb.public.books TO mtls_auth;
```

You should see a success message.

Now return to the `mtls_auth` session and run:

```sql
SELECT * FROM books;
```

Boom! You should now see your previously restored list of books.

You’ve successfully connected using passwordless, certificate-based authentication and granted controlled permissions to the new user.

### Connecting via Mutual TLS (mTLS) from Our Apps on Kubernetes

So far, we’ve been connecting to our CockroachDB cluster *securely* using Beekeeper Studio thanks to our TLS certificates and mTLS authentication.

But…what happens when we have applications running inside our Kubernetes cluster that need to talk to CockroachDB as well?

Exactly: those apps also need to authenticate using client certificates

And that brings us to a very important point…

#### Why We Should *Not* Generate Client Certificates Using Pods (The Dangerous Way)

Up until now, we’ve been generating our client certificates using Kubernetes Pods like:

- `gen-root-cert`
- `gen-mtls-auth-cert`

They *work*, yes…but they’re not safe for production.

Why? Because these jobs **mount our Certificate Authority (CA) key** inside the pod:

```yaml
# ...
volumes:
  - name: crdb-ca
    secret:
      secretName: crdb-cockroachdb-ca-secret
      items:
        - key: ca.crt
          path: ca.crt
        - key: ca.key
          path: ca.key
...
```

This is a *big* security risk!

If an attacker ever gains access to that pod?

🔥 Your CA key is exposed  
🔥 They can generate *their own trusted certificates*  
🔥 They can impersonate ANY client/user, including the `root` and `admin` users  
🔥 They’ll have full access to your CockroachDB cluster

And they’ll keep that access **forever**, until you rotate the CA key (which is painful and disruptive).

This is why CockroachDB strongly advises against mounting CA keys into Pods.

#### The Right Way: Using Cert Manager (Recommended by CockroachDB)

CockroachDB’s [<VPIcon icon="iconfont icon-cockroach-db"/>official docs recommend](https://cockroachlabs.com/docs/stable/secure-cockroachdb-kubernetes?filters=helm#deploy-cert-manager-for-mtls) managing client certificates using **cert-manager**.

This is because instead of YOU exposing your CA key inside Pods, cert-manager handles everything *internally and securely:*

- Cert-manager stores and protects your CA key
- It generates client certificates for you
- It issues private keys *without ever exposing your CA key*
- It auto-renews certificates before they expire
- And it gives you production-grade certificate lifecycle management

#### But Wait: Don’t We Need the CA Key to Generate Client Certificates?

Great question.

Yes, normally you need the CA key to sign client certificates…but **cert-manager takes care of that for us**.

You simply:

1. Create an Issuer (or ClusterIssuer)
2. Tell cert-manager to use your CockroachDB CA
3. Request a Certificate

Then cert-manager automatically:

1. Signs it
2. Stores it in a Kubernetes Secret (where its safe)
3. Rotates it before expiry
4. Keeps your CA key completely secure

No more exposing the CA key in Pods. No more writing custom Kubernetes Pods.

#### Certificate Rotation — Another Huge Win

Let’s talk about expirations.

Right now:

- The `mtls_auth` client cert we generated manually has **5 hours** validity
- After 5 hours, it expires
- Your apps will fail all DB connections
- You’d need to regenerate a new certificate manually
- Or worse: create a CronJob to regenerate them every 4 hours

This is messy and unsafe.

With cert-manager?

- Certificates are automatically rotated
- Renewed before expiration
- No downtime
- No manual intervention
- Apps easily reload the new certificates

#### Alright — Let’s Install Cert Manager

To start using cert-manager, install it using the Helm chart:

```sh
helm repo add cert-manager https://charts.jetstack.io

helm install cert-manager cert-manager/cert-manager \
--set crds.enabled=true \
--create-namespace \
-n cert-manager \
--version 1.19.1
```

Once cert-manager is installed, we’ll:

1. Create a **ClusterIssuer** that uses our CockroachDB CA
2. Create a **Certificate** for our `mtls_auth` user
3. Mount that Certificate into our application Pods
4. Connect securely to CockroachDB via mTLS from inside Kubernetes

That’s what we’ll walk through next

Before cert-manager can issue our certificates, it needs an **Issuer**. And before creating an Issuer, we need a secret that contains our CA certificate and CA key using the correct key names.

#### Creating a CA Secret for the Issuer

cert-manager’s `Issuer` is a bit picky about the secret format. It expects the secret to contain two keys:

- <VPIcon icon="fas fa-key"/>`tls.crt`: the CA certificate
- <VPIcon icon="fas fa-key"/>`tls.key`: the CA private key

But the CockroachDB Helm chart automatically generates a secret named `crdb-cockroachdb-ca-secret`, which uses different key names:

- .<VPIcon icon="fas fa-key"/>`ca.crt`
- .<VPIcon icon="fas fa-key"/>`ca.key`

So even though this secret contains exactly what we need, cert-manager won’t accept it because the keys are not named the way it expects.

To fix this, we’ll re-create a new secret with the correct key names. First, copy the existing CA files from Kubernetes to your local machine:

```sh
kubectl get secret crdb-cockroachdb-ca-secret \
-o jsonpath='{.data.ca.crt}' | base64 -d > ca.crt
```

If you get a “permission denied”, simply delete any existing <VPIcon icon="fas fa-key"/>`ca.crt` file in your project directory.

Now copy the key:

```sh
kubectl get secret crdb-cockroachdb-ca-secret \
-o jsonpath='{.data.ca.key}' | base64 -d > ca.key
```

Next, create the properly formatted secret:

```sh
kubectl create secret tls crdb-ca-issuer-secret \
--cert=ca.crt \
--key=ca.key
```

If you describe it:

```sh
kubectl describe secret crdb-ca-issuer-secret
```

You should now see <VPIcon icon="fas fa-key"/>`tls.crt` and <VPIcon icon="fas fa-key"/>`tls.key` in the `Data` section – exactly what cert-manager needs.

#### Creating the Issuer

Now that we have a properly formatted CA secret, we can create the Issuer that cert-manager will use to sign our client certificates.

Create a file called <VPIcon icon="iconfont icon-yaml"/>`crdb-issuer.yml`:

```yaml title="crdb-issuer.yml"
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: crdb-issuer
spec:
  ca:
    secretName: crdb-ca-issuer-secret
```

Apply it:

```sh
kubectl apply -f crdb-issuer.yml
```

Confirm that it’s ready:

```sh
kubectl get issuer crdb-issuer
```

The `Ready` column should display `True`.

#### Creating the Certificate Manifest

Now we’ll define a Certificate object. This doesn’t create the client certificate instantly – instead, it tells cert-manager **what kind** of certificate we need. cert-manager then generates and stores the certificate automatically.

Create a file named <VPIcon icon="iconfont icon-yaml"/>`crdb-mtls_auth-certificate.yml`:

```yaml title="crdb-mtls_auth-certificate.yml"
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: crdb-mtls-auth-certificate
spec:
  secretName: crdb-mtls-auth-certificate # Secret that will hold the cert+key
  commonName: mtls_auth # MUST match Cockroach SQL role
  duration: 24h # 1 day
  renewBefore: 20h # renew 4 hours before expiry
  privateKey:
    algorithm: RSA
    size: 2048
    encoding: PKCS8
  usages:
    - client auth # important: client certificate
  issuerRef:
    name: crdb-issuer
    kind: Issuer
    group: cert-manager.io
```

Let’s look at the important properties so we can understand what the Certificate workload does:

- **secretName:** The Kubernetes secret where cert-manager will store the generated certificate, key, and CA certificate. This is where your apps will later mount the certificate files from.
- **commonName:** Very important! This must match the **CockroachDB SQL user** (`mtls_auth`), because CockroachDB uses the certificate’s Common Name to identify the connecting user.
- **duration** and **renewBefore:** `duration` defines how long the certificate is valid. `renewBefore` ensures cert-manager renews it early, preventing the certificate from getting expired before it gets renewed (to avoid downtime).
- **usages:** Tells cert-manager what the certificate is for. `client auth` ensures this certificate is only used by clients connecting to servers, not the other way around.
- **issuerRef:** Points to the Issuer we created earlier. This tells cert-manager *who* should sign the certificate.

Apply the manifest:

```sh
kubectl apply -f crdb-mtls_auth-certificate.yml
```

After a few seconds, cert-manager will generate the certificate.

Check the secret:

```sh
kubectl get secret crdb-mtls-auth-certificate
```

Describe it to view the keys:

```sh
kubectl describe secret crdb-mtls-auth-certificate
```

You should see:

- <VPIcon icon="fas fa-key"/>`tls.crt`
- <VPIcon icon="fas fa-key"/>`tls.key`
- <VPIcon icon="fas fa-key"/>`ca.crt`

These are the files the application will use.

If we copied the content of the <VPIcon icon="fas fa-key"/>`tls.crt` to our local machine and decoded it using the `openssl x509...` command, we'll see similar details to the content in the `client.mtls_auth.crt` client certificate we previously generated, with the Common Name (CN being `mtls_auth`).

#### Creating a Pod That Connects Using the Client Certificate

Now let’s create a simple Pod that uses our new client certificate to connect to CockroachDB.

Create a file called <VPIcon icon="iconfont icon-yaml"/>`books-pod.yml`:

```yaml :collapsed-lines title="books-pod.yml"
apiVersion: v1
kind: Pod
metadata:
  name: books-pod
spec:
  restartPolicy: Never
  volumes:
    - name: crdb-certs
      secret:
        secretName: crdb-mtls-auth-certificate
        # Make secret files read-only for the user only: 0400 (Without this, the Python app will thow an error). Howevwe, this is not compulsory for all apps, just this one being used in this tutorial
        defaultMode: 0400
  containers:
    - name: books
      image: prince2006/cockroachdb-tutorial-python-app:new
      imagePullPolicy: Always
      env:
        - name: DATABASE_URL
          value: >-
            postgresql://mtls_auth@crdb-cockroachdb-public.default:26257/defaultdb?sslmode=verify-full&sslrootcert=/crdb-certs/ca.crt&sslcert=/crdb-certs/tls.crt&sslkey=/crdb-certs/tls.key
      volumeMounts:
        - name: crdb-certs
          mountPath: /crdb-certs
          readOnly: true
      resources:
        limits:
          memory: "100Mi"
          cpu: "50m"
        requests:
          memory: "50Mi"
          cpu: "10m"
```

Here’s what’s happening:

- We mount the generated certificate secret into `/crdb-certs`.
- The Python app uses those certificate files (`tls.crt`, <VPIcon icon="fas fa-key"/>`tls.key`, <VPIcon icon="fas fa-key"/>`ca.crt`) to authenticate.
- The connection string does **NOT** include a password. CockroachDB authenticates the user entirely via the certificate’s Common Name.

Apply the Pod:

```sh
kubectl apply -f books-pod.yml
```

After about a minute, view the logs:

```sh
kubectl logs books-pod
```

Or if the Pod already restarted:

```sh
kubectl logs -p books-pod
```

You should see a successful connection to CockroachDB using the `mtls_auth` user and a list of books

![List of books from our books-pod logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1763534354156/60114f7b-ba62-4706-a0b7-7629e20bfaaa.png)

If you remove the certificate files or try connecting without them, the app will fail – as expected.

**Congratulations!**

You’ve officially built a fully secure, production-ready CockroachDB cluster on Kubernetes – complete with:

- End-to-end encryption (TLS)
- Mutual TLS authentication (mTLS) for users and apps
- Automated, daily backups to Google Cloud Storage
- Proper certificate rotation with cert-manager

---

## How to Get a CockroachDB Enterprise License for Free

Okay, so here’s a thing: even though you’ve built a super professional CockroachDB cluster, there’s one small catch: **without a license, your cluster might be “throttled.”**

We know that because, when we access our dashboard, we get a message concerning our cluster getting throttled.

That means things slow down: queries take longer, performance gets worse, and scaling up won’t magically make it faster. Yeah, it’s real. 🥲

Why does this happen? Because CockroachDB’s “full feature set” is under a special license. If you don’t set a valid license, it limits how many SQL transactions you can run at a time.

### Three Types of Licenses

Here’s a breakdown of the different kinds of CockroachDB licenses and what they mean for you:

#### 1. Trial License

- Valid for **30 days**.
- Lets you try all the “Enterprise” features.
- You *must* send telemetry (more on that soon) while the trial is active.

#### 2. Enterprise License (Paid)

- This is CockroachDB’s “premium / fully paid” version.
- You can pick the kind of license based on your environment: “Production”, “Pre-production”, or “Development.”
- Companies with more than **$10 million in annual revenue** need to pay for this license.
- There *are* discounts, startup perks, or “free” versions for smaller companies (more below).

#### 3. Enterprise Free License

- This is the magic one for early-stage companies or startups: it has exactly the same features as the paid Enterprise license. But it’s free if your business makes **under $10 million per year**.
- You *do* need to renew it each year.
- Support for this “Free” license is **community-level** (forums, docs), not paid enterprise.

::: note N.B.

To keep your free license active and *not* get throttled, CockroachDB requires telemetry. Telemetry means your cluster sends some usage data back to Cockroach Labs. And no, they’re not “stealing your data”. Here’s what that actually means:

:::

- Telemetry includes basic usage stats, cluster health info, and configuration metrics.
- It does NOT send your business data, queries, or personal customer data.
- It helps Cockroach Labs *make sure the free license is used responsibly*, and helps them build better features.
- If you stop sending telemetry, your cluster will eventually be throttled after 7 days (slowed down).

### How to Apply for the Free Enterprise License

Here’s how you can try to get that free enterprise license:

1. Go to the CockroachDB Cloud Console (Sign up if you don’t have a account). Then go to the “Organization” link on the menu, click it, then click the “Enterprise Licenses” from the dropdown.
2. Click the Create License button → Enable the “Find out if my company qualifies for an Enterprise Free license” option.
3. Fill in the form: your name, company name, job function, and the intended use of the license.
4. Click “Continue”.

You should see this success message “Based on your company's intended use, you qualify for an Enterprise Free license.” Now agree to the terms and conditions, then click the “Generate License key“.

Learn more about CockroachDB licenses here 👉🏾

<SiteInfo
  name="Licensing FAQs"
  desc="Frequently asked questions about CockroachDB Enterprise licensing."
  url="https://cockroachlabs.com/docs/stable/licensing-faqs/"
  logo="https://crl2020.imgix.net/img/crl-32x32.png?w=16h=16"
  preview="https://cockroachlabs.com/img/crl-socialpost-default-2020-2.jpg?auto=format,compress"/>

### Adding Your License to the CockroachDB Cluster

Now that you’ve gotten your shiny new CockroachDB license (whether it’s the Free one or the Enterprise one), the next step is…actually *using it*.

Let’s add it to your CockroachDB cluster so it stops shouting “THROTTLED!” at you every time you open the dashboard

We’ll do this by updating our CockroachDB Helm configuration.

#### Step 1: Update Your <VPIcon icon="iconfont icon-yaml"/>`cockroachdb-production.yml`

Open your production Helm values file, and inside the `init` section, add the following:

```yaml title="cockroachdb-production.yml"
init:
...
    provisioning:
        enabled: true
        clusterSettings:
          cluster.organization: "'<ORGANIZATION>'" # Enter the name of your organization here 
          enterprise.license: "'<LICENSE>'" # Enter your CockroachDB Enterprise license key here
...
```

Now replace:

- `<ORGANIZATION>` with the name of your startup, business, project, or company
- `<LICENSE>` with the exact license string CockroachDB gave you

That’s it – super simple.

#### Step 2: Apply the Changes With Helm

Run your usual Helm upgrade command:

```sh
helm upgrade cockroachdb -f cockroachdb-production.yml cockroachdb/cockroachdb
```

#### Step 3: Confirm the License Was Added Correctly

Now let’s double-check everything worked.

1. Connect as the `root` user: You can connect using Beekeeper Studio (like we’ve been doing).
2. Run this query to check your license:

```sql
SHOW CLUSTER SETTING enterprise.license;
```

If everything went well, you should see your license key printed out in the results.

#### Step 4: Make Sure Telemetry Is Enabled (Important!)

Remember: without telemetry enabled, your cluster will still get throttled, even if you have a valid license 🥲

Run:

```sql
SHOW CLUSTER SETTING diagnostics.reporting.enabled;
```

If the result says “true”, you're good! Telemetry is on, CockroachDB can verify your license, and your cluster will behave normally without slowing down.

---

## Conclusion & Next Steps ✨

Throughout this book, you’ve gone from “What even is CockroachDB?” to actually running your **own secure, production-ready database** on Kubernetes – and that’s a BIG deal. 🎉

You learned why CockroachDB is special, how it avoids downtime, and why it’s different from the usual databases everyone talks about.

Then you set up your own local environment, practiced everything safely on Minikube, and gradually built your way to a full production setup on GKE.

You explored CockroachDB’s dashboard, checked your cluster’s health, backed up your data to the cloud, and even learned how to keep your database fast, stable, and ready to grow when needed.

Finally, you deployed it on Google Cloud, secured it with encryption and certificates, and connected to it from your own PC – all step-by-step.

By now, you’ve basically gone from curious learner to “I can actually run this thing in production.” 🚀

You’ve covered a lot – and you’ve built something powerful, modern, and production-worthy. Amazing job 👏🏾😁!! And thanks for reading.

::: info About the Author 👨🏾‍💻

Hi, I’m Prince! I’m a DevOps engineer and Cloud architect passionate about building, deploying, architecting, and managing applications and sharing knowledge with the tech community.

If you enjoyed this book, you can learn more about me by exploring more of my blogs and projects on my [LinkedIn profile (<VPIcon icon="fa-brands fa-linkedin"/>`prince-onukwili-a82143233`)](https://linkedin.com/in/prince-onukwili-a82143233/). and reach out to me on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`POnukwili`)](https://x.com/POnukwili). You can find more of my [articles here (<VPIcon icon="fa-brands fa-linkedin"/>`prince-onukwili-a82143233`)](https://linkedin.com/in/prince-onukwili-a82143233/details/publications/) or on [my freeCodeCamp blog (<VPIcon icon="fa-brands fa-free-code-camp"/>`onukwilip`)](https://freecodecamp.org/news/author/onukwilip/).

You can also [<VPIcon icon="fas fa-globe"/>visit my website](https://prince-onuk.vercel.app). Let’s connect and grow together! 😊

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Deploy Your Own Cockroach DB  Instance on Kubernetes [Full Book for Devs]",
  "desc": "Developers are smart, wonderful people, and they’re some of the most logical thinkers you’ll ever meet. But we’re pretty terrible at naming things 😂 Like, what in the world – out of every other possible name, they decided to name a database after a ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/deploy-your-own-cockroach-db-instance-on-kubernetes-full-book-for-devs/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
