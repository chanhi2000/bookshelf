---
lang: en-US
title: "Scaling Monoliths: A Practical Guide for Growing Systems"
description: "Article(s) > Scaling Monoliths: A Practical Guide for Growing Systems"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scaling Monoliths: A Practical Guide for Growing Systems"
    - property: og:description
      content: "Scaling Monoliths: A Practical Guide for Growing Systems"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scaling-monoliths-a-practical-guide-for-growing-systems.html
prev: /academics/system-design/articles/README.md
date: 2025-01-18
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_125.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Scaling Monoliths: A Practical Guide for Growing Systems"
  desc="A well-designed monolith can scale remarkably well, despite industry trends pushing toward microservices. From database sharding to message queues, learn practical strategies to grow your monolithic system effectively."
  url="https://milanjovanovic.tech/blog/scaling-monoliths-a-practical-guide-for-growing-systems"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_125.png"/>

Monoliths get a bad rap in our industry. We're told they're legacy, that they don't scale, and that we need microservices to succeed. After spending many years scaling systems from startups to enterprises, I can tell you this isn't true. A well-designed monolith is often the right architecture choice, and it can scale remarkably well with the right approach.

In my experience building and scaling monolithic systems, I've found that the key to success isn't following trends. It's understanding your scaling needs and applying the right solutions at the right time. In this article, I'll share what I've learned about scaling monoliths effectively and when to use each approach.

---

## Understanding Scale

A monolith puts all your code in one deployable unit. This brings significant advantages: faster development cycles, simpler debugging, and straightforward deployments. But as your system grows, you'll face scaling challenges.

![Simple monolith system.](https://milanjovanovic.tech/blogs/mnw_125/monolith_system.png?imwidth=384)

Your database queries slow down as data volume grows. API endpoints that worked fine with hundreds of users start timing out with thousands. Build times creep up as your codebase expands. These are natural growing pains that every successful system faces.

---

## Vertical Scaling

Vertical scaling means giving your application more resources on a single machine. It's the simplest scaling strategy and often the most effective first step. Before diving into complex distributed systems, consider whether upgrading your existing infrastructure could solve your performance problems.

![Example of vertically scaling a monolith.](https://milanjovanovic.tech/blogs/mnw_125/vertical_scaling.png?imwidth=1920)

Vertical scaling works particularly well when there are clear resource bottlenecks. If your CPU is consistently above 80% utilization, adding more cores will help. If your database is I/O bound, upgrading to faster storage can dramatically improve performance. Modern cloud platforms make this especially straightforward. You can often upgrade with a few clicks and minimal downtime.

The benefits of vertical scaling extend beyond just performance. It maintains your system's simplicity. You don't need to redesign your architecture, implement new deployment patterns, or manage distributed system complexity. Your monitoring, debugging, and operational procedures all stay the same.

However, vertical scaling does have limits. You'll eventually hit a ceiling on what a single machine can handle. Cloud providers have maximum instance sizes, and costs typically increase exponentially with larger instances. More importantly, vertical scaling doesn't provide redundancy - you're still running on a single machine that represents a potential single point of failure.

Knowing when to move beyond vertical scaling is crucial. Watch for these indicators:

- Costs are growing faster than your user base
- You need better redundancy and fault tolerance
- Your deployment downtime is impacting business operations
- Your largest available instance size is approaching 70% utilization

---

## Horizontal Scaling

[**Horizontal scaling**](/milanjovanovic.tech/horizontally-scaling-aspnetcore-apis-with-yarp-load-balancing.md) runs multiple instances of your application behind a load balancer. It's the next step when vertical scaling reaches its limits. It offers improved fault tolerance and nearly linear scaling capabilities.

![Example of horizontally scaling a monolith.](https://milanjovanovic.tech/blogs/mnw_125/horizontal_scaling.png?imwidth=1920)

The key to successful horizontal scaling lies in application design. Your application must be stateless - each request should contain all the information needed to process it.

This means:

- Authentication should use tokens (like JWTs) rather than server-side sessions
- Cached data should live in a distributed cache

Load balancers are crucial in this architecture. Whether you call it an [**API Gateway**](/milanjovanovic.tech/implementing-an-api-gateway-for-microservices-with-yarp.md), Reverse Proxy, or Load Balancer, its job is to distribute traffic across your application instances. Popular choices include:

- [<FontIcon icon="iconfont icon-nginx"/>nginx](https://nginx.org/en/): Powerful, open-source, great for custom configurations
- [<FontIcon icon="fas fa-globe"/>YARP](https://microsoft.github.io/reverse-proxy/): Microsoft's .NET reverse proxy, great for .NET applications
- Cloud: [<FontIcon icon="fa-brands fa-aws"/>AWS ALB](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html), [<FontIcon icon="iconfont icon-microsoftazure"/>Azure Application Gateway](https://learn.microsoft.com/en-us/azure/application-gateway/overview), [<FontIcon icon="iconfont icon-gcp"/>Google Cloud Load Balancing](https://cloud.google.com/load-balancing?hl=en)

::: important Horizontal scaling provides several key benefits

- Better fault tolerance through redundancy
- Ability to handle more concurrent users
- Rolling deployments with zero downtime
- Cost-effective scaling (scale down when traffic is low)

:::

The main challenge in horizontal scaling isn't technical—it's architectural. Your application needs to be designed for horizontal scaling from the start. Converting a stateful application to a stateless one often requires significant refactoring.

---

## Database Scaling

Database scaling is where most monoliths first hit real limitations. Let's explore each scaling strategy in detail.

### Read Replicas

Read replicas are often your first step in database scaling but come with significant trade-offs. Read replicas maintain a copy of your primary database that serves read-only traffic. When you run a query against a replica, you're not competing with writes on your primary database.

Each replica maintains an up-to-date copy of your data through replication. Changes flow one-way: from primary to replicas. This means any data written to your primary will eventually show up in your replicas. That "eventually" is important - you're trading consistency for better read performance.

Most cloud providers make read replicas easy to set up. AWS RDS and Azure SQL all support read replicas with minimal configuration. They handle replication, monitoring, and failover for you.

![Example of database read replication for scaling a monolith.](https://milanjovanovic.tech/blogs/mnw_125/database_read_replicas.png?imwidth=3840)

::: important When implementing read replicas, consider:

- Replication lag affects data freshness
- Write volume impacts replication speed
- Geographic location affects latency
- Each replica adds to your costs

:::

### Materialized Views

Sometimes read replicas aren't enough. Perhaps you need to reshape your data for specific use cases, or you're running complex analytical queries that are slow even on a replica. This is where materialized views come in.

A materialized view is a pre-computed dataset stored as a table. Unlike regular views that compute their results on each query, materialized views store their results. This makes them much faster to query but introduces a new challenge: keeping them up to date.

::: important Materialized views excel at:

- Complex analytical queries
- Data that updates on a schedule
- Aggregations and summaries
- Denormalized data for specific views

:::

The key trade-off is freshness versus performance. You need to decide how often to refresh your materialized views. Too often, and you're putting load on your database. Too rarely, and your data gets stale.

### Database Sharding

Sharding becomes necessary when your database grows beyond what a single instance can handle. Sharding splits your data across multiple database instances, with each shard containing a distinct subset of your data. The key to successful sharding lies in choosing the right sharding strategy for your use case.

#### Range-based sharding

splits data based on ranges of a key value - for example, customers A-M go to Shard 1, N-Z to Shard 2. This approach works well with data that has a natural range distribution, like dates or alphabetical order, but can lead to hotspots if certain ranges see more activity than others.

#### Hash-based sharding

applies a hash function to your sharding key to determine which shard holds the data. The choice of hashing function is crucial. It must distribute data evenly across your shards to prevent any single shard from becoming a bottleneck. While this approach provides better data distribution, it makes range-based queries more complex since related data might live on different shards.

#### Tenant-based sharding

gives each tenant their own database. This approach provides natural isolation and makes tenant-specific operations straightforward. While it makes cross-tenant queries more complex, it's often the cleanest solution for multi-tenant systems where data isolation is important.

![Example of database sharding for scaling a monolith.](https://milanjovanovic.tech/blogs/mnw_125/database_sharding.png?imwidth=3840)

---

## Caching

Caching is one of the most effective ways to improve your system's performance. A well-implemented caching strategy can dramatically reduce database load and improve response times by storing frequently accessed data in memory.

Modern caching happens at multiple levels. Browser caching reduces unnecessary network requests. CDN caching brings your content closer to users. [**Application-level caching**](/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.md) with tools like Redis stores frequently accessed data in memory. Database query caching reduces expensive computations.

The key to effective caching is understanding your data access patterns. Frequently read, rarely changed data benefits most from caching. Tools like Redis and Memcached excel at storing such data in memory, providing sub-millisecond access times. Cloud providers offer managed caching services like Azure Cache for Redis, handling the operational complexity of maintaining a distributed cache.

---

## Message Queues

Message queues are a powerful tool for scaling your monolith. They let you defer time-consuming operations and distribute work across multiple processors. This keeps your API responsive while handling heavy tasks in the background.

Message queues transform your system's behavior under load. Instead of processing everything synchronously, you can queue work for later. This pattern works especially well for operations like:

- Processing uploaded files
- Sending emails and notifications
- Generating reports
- Updating search indexes
- Running batch operations

The real power of message queues lies in their ability to handle traffic spikes. When your system gets hit with a surge of requests, queues act as a buffer. They let you accept work at peak rates but process it at a sustainable pace.

---

## Summary

Scaling a monolith isn't about choosing between vertical scaling, horizontal scaling, caching, or any single approach. It's about using the right tool at the right time. Start with the simplest solution that solves your immediate problem, then add complexity only when needed.

A practical scaling journey often looks like this:

1. Optimize your code and database queries
2. Add caching where it matters most
3. Scale vertically until it's no longer cost-effective
4. Move to horizontal scaling for better redundancy
5. Implement message queues for background work
6. Consider database sharding when data size demands it

A well-designed monolith can handle significant load with just a subset of these techniques. The key is to understand your system's actual bottlenecks and address them specifically.

If you're interested in building maintainable, scalable monoliths, my [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) course dives deeper into these concepts. You'll learn how to structure your code for long-term maintainability and scale.

Remember: don't let perfect be the enemy of good. Start with the simplest solution that could work, measure everything, and scale what's necessary. A well-designed monolith can take you further than you might think.

That's all for today. Hope this was helpful.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scaling Monoliths: A Practical Guide for Growing Systems",
  "desc": "A well-designed monolith can scale remarkably well, despite industry trends pushing toward microservices. From database sharding to message queues, learn practical strategies to grow your monolithic system effectively.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scaling-monoliths-a-practical-guide-for-growing-systems.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
