---
lang: en-US
title: "Solving the Distributed Cache Invalidation Problem with Redis and HybridCache"
description: "Article(s) > Solving the Distributed Cache Invalidation Problem with Redis and HybridCache"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Solving the Distributed Cache Invalidation Problem with Redis and HybridCache"
    - property: og:description
      content: "Solving the Distributed Cache Invalidation Problem with Redis and HybridCache"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/solving-the-distributed-cache-invalidation-problem-with-redis-and-hybridcache.html
prev: /programming/cs/articles/README.md
date: 2026-01-17
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_177.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Solving the Distributed Cache Invalidation Problem with Redis and HybridCache"
  desc="Learn how to solve the distributed cache invalidation problem in .NET 9 by implementing a Redis Pub/Sub backplane to synchronize HybridCache instances across multiple nodes."
  url="https://milanjovanovic.tech/blog/solving-the-distributed-cache-invalidation-problem-with-redis-and-hybridcache"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_177.png"/>

Distributed systems are great for scalability, but they introduce a whole new class of problems. One of the hardest problems to solve is **cache invalidation**.

In .NET 9, [**Microsoft introduced `HybridCache`**](/milanjovanovic.tech/hybrid-cache-in-aspnetcore-new-caching-library.md) to simplify caching. It's a fantastic library that combines the speed of in-memory caching (L1) with the durability of distributed caching (L2) like Redis. It also handles "cache stampede" protection out of the box.

However, there is a catch.

When you run multiple instances of your application, `HybridCache` doesn't automatically synchronize the local L1 cache across all nodes. If you update data on **Node A**, **Node B** will continue serving stale data from its in-memory cache until the entry expires.

While HybridCache is a massive step forward, the lack of a built-in backplane for invalidation is a known limitation. In fact, there is an active discussion on the [dotnet/extensions GitHub repository (<VPIcon icon="iconfont icon-github" />`dotnet/extensions`)](https://github.com/dotnet/extensions/issues/5517) tracking this exact feature request. Until that ships, we have to roll our own solution.

In this week's newsletter, we'll explore:

- The distributed caching dilemma
- Why `HybridCache` doesn't solve this alone
- Using Redis Pub/Sub as a backplane
- Implementing real-time cache invalidation

Let's dive in.

---

## The Distributed Caching Dilemma

Let's imagine a typical production scenario. You have an API running on multiple servers (or pods) behind a load balancer.

To improve performance, you introduce [**caching**](/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.md). You want the speed of local memory, so you use `HybridCache`.

Here is the failure scenario:

1. **User A** updates their profile on **Server 1**.
2. **Server 1** updates the database and clears its local cache.
3. **User A** (or User B) hits **Server 2**.
4. **Server 2** still holds the *old* profile data in its local `HybridCache`.
5. The user sees outdated information, since the local cache hasn't been invalidated.

![A sequence diagram showing two servers with HybridCache out of sync after a user update.](https://milanjovanovic.tech/blogs/mnw_177/hybridcache_out_of_sync_scenario.png?imwidth=3840)
<!-- TODO: mermaid화 -->

**Why Not Just Shorten the Cache Duration?**

A common "hack" to solve this is to simply reduce the L1 cache duration (TTL). For example, setting the local cache to expire every 10 seconds.

While this reduces the window of inconsistency, it doesn't solve the problem. It just masks it.

This approach introduces two new issues:

- **Increased Latency**: You are now forcing your application to reach out to the distributed L2 cache (Redis) or the database much more frequently.
- **Lost Efficiency**: The main benefit of L1 caching is avoiding network requests entirely. If you expire data too fast, you lose the performance gain for the majority of your traffic.

For things like user permissions, feature flags, or pricing, "mostly correct" is often not good enough. You need immediate consistency.

---

## The Solution: Redis Pub/Sub Backplane

To solve this, we need a **backplane**. It's a communication channel that connects all our application nodes.

When a cache entry is removed or updated on one node, we publish a message to the backplane. All other nodes subscribe to this channel and, upon receiving the message, remove the corresponding key from their local cache.

Redis is already a popular choice for the L2 cache, so it makes perfect sense to use its [**Pub/Sub feature**](/milanjovanovic.tech/simple-messaging-in-dotnet-with-redis-pubsub.md) for this signaling mechanism.

It works like this:

1. **Publisher:** The node that modifies data publishes a `cache-invalidation` message with the cache key.
2. **Subscriber:** All nodes listen to this channel.
3. **Action:** When a message arrives, they call `HybridCache.RemoveAsync(key)`.

![A sequence diagram showing cache invalidation messages being published and received by multiple servers.](https://milanjovanovic.tech/blogs/mnw_177/cache_invalidation_message_fanout.png?imwidth=3840)
<!-- TODO: mermaid화 -->

---

## Implementing the Solution

We will need the `StackExchange.Redis` library to handle the messaging.

Let's start by defining a simple service to handle the publishing. This service will be responsible for notifying the rest of the system that a key has changed.

```cs
public interface ICacheInvalidator
{
    Task InvalidateAsync(string key, CancellationToken cancellationToken = default);
}

public class RedisCacheInvalidator(
    IConnectionMultiplexer connectionMultiplexer,
    ILogger<RedisCacheInvalidator> logger)
    : ICacheInvalidator
{
    private const RedisChannel Channel = RedisChannel.Literal("cache-invalidation");

    public async Task InvalidateAsync(string key, CancellationToken cancellationToken = default)
    {
        var subscriber = connectionMultiplexer.GetSubscriber();

        await subscriber.PublishAsync(Channel, new RedisValue(key));

        logger.LogInformation("Published invalidation for key: {Key}", key);
    }
}
```

Now, whenever you update an entity in your Command Handler or Service, you just call `ICacheInvalidator.InvalidateAsync`.

```cs{3,20} :collapsed-lines
public class UpdateUserProfileHandler(
    AppDbContext dbContext,
    ICacheInvalidator cacheInvalidator,
    ILogger<UpdateUserProfileHandler> logger)
{
    public async Task Handle(int userId, string newName, CancellationToken ct)
    {
        // 1. Update the database
        var user = await dbContext.Users.FindAsync([userId], ct);
        if (user is null)
        {
             return;
        }

        user.Name = newName;
        await dbContext.SaveChangesAsync(ct);

        // 2. Invalidate the cache (Distributed)
        var cacheKey = $"user:{userId}";
        await cacheInvalidator.InvalidateAsync(cacheKey, ct);

        logger.LogInformation("Updated user and invalidated cache for {UserId}", userId);
    }
}
```

### The Background Listener

Next, we need a [**background service**](/milanjovanovic.tech/running-background-tasks-in-asp-net-core.md) that runs on every node. It will subscribe to the Redis channel and evict keys from the local `HybridCache`.

**A quick note on self-publishing**: Because Redis Pub/Sub broadcasts to everyone subscribed, the node that published the invalidation will also receive the message. In this implementation, we simply remove the key again. It's redundant but harmless, and it keeps the code simple.

Note that we are injecting `HybridCache` directly into our background service. An alternative is using `IMemoryCache`, since that is the L1 cache inside `HybridCache`.

```cs
public class CacheInvalidationService(
    IConnectionMultiplexer connectionMultiplexer,
    HybridCache hybridCache,
    ILogger<CacheInvalidationService> logger)
    : BackgroundService
{
    private const RedisChannel Channel = RedisChannel.Literal("cache-invalidation");

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var subscriber = connectionMultiplexer.GetSubscriber();

        await subscriber.SubscribeAsync(Channel, (channel, value) =>
        {
            string key = value.ToString();

            logger.LogInformation("Invalidating local cache for: {Key}", key);

            // This removes the item from the local L1 cache
            var task = hybridCache.RemoveAsync(key, stoppingToken);

            if (!task.IsCompleted)
            {
                task.GetAwaiter().GetResult();
            }
        });
    }
}

```

### Wiring It All Together

Finally, we need to register these services in our DI container.

```cs
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
    ConnectionMultiplexer.Connect("<REDIS_CONNECTION_STRING>"));

// Register HybridCache (defaults generally work fine for L1)
builder.Services.AddHybridCache();

// Register our invalidation services
builder.Services.AddSingleton<ICacheInvalidator, RedisCacheInvalidator>();
builder.Services.AddHostedService<CacheInvalidationService>();

```

Now, when **Node A** calls `InvalidateAsync("user:123")`, Redis pushes that message to **Node B**, **Node C**, and so on. They all trigger `hybridCache.RemoveAsync("user:123")`, ensuring the next request fetches fresh data from the source (or the shared L2).

---

## A Better Way: FusionCache

If building your own backplane feels like reinventing the wheel, you should look at [**FusionCache** (<VPIcon icon="iconfont icon-github" />`ZiggyCreatures/FusionCache`)](https://github.com/ZiggyCreatures/FusionCache).

FusionCache is a mature, battle-tested library that has solved this exact problem for years. It has a built-in backplane feature that automatically handles the Pub/Sub messaging for you.

Even better, FusionCache recently added an implementation of the HybridCache abstract class. This means you can swap it in without changing much of your existing code.

```cs{3}
// Using FusionCache's implementation of HybridCache
builder.Services.AddFusionCache()
    .WithBackplane(
        new RedisBackplane(new RedisBackplaneOptions { Configuration = "<REDIS_CONNECTION_STRING>" }))
    .AsHybridCache();
```

---

## Summary

`HybridCache` is a powerful addition to the .NET ecosystem, effectively merging the benefits of `IMemoryCache` and `IDistributedCache`. However, for multi-node setups requiring high consistency, you still need a mechanism to synchronize the local caches.

Redis Pub/Sub offers a lightweight, effective solution to this problem.

By implementing a simple "bus" for invalidation messages, you get the best of both worlds: the extreme performance of local caching and the data consistency of a distributed system.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Solving the Distributed Cache Invalidation Problem with Redis and HybridCache",
  "desc": "Learn how to solve the distributed cache invalidation problem in .NET 9 by implementing a Redis Pub/Sub backplane to synchronize HybridCache instances across multiple nodes.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/solving-the-distributed-cache-invalidation-problem-with-redis-and-hybridcache.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
