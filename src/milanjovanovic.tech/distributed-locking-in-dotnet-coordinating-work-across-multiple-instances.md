---
lang: en-US
title: "Distributed Locking in .NET: Coordinating Work Across Multiple Instances"
description: "Article(s) > Distributed Locking in .NET: Coordinating Work Across Multiple Instances"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Data Science
  - PostgreSQL
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
  - sql
  - postgres
  - postgresql
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Distributed Locking in .NET: Coordinating Work Across Multiple Instances"
    - property: og:description
      content: "Distributed Locking in .NET: Coordinating Work Across Multiple Instances"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/distributed-locking-in-dotnet-coordinating-work-across-multiple-instances.html
prev: /programming/cs/articles/README.md
date: 2025-09-20
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_160.png
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
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
  name="Distributed Locking in .NET: Coordinating Work Across Multiple Instances"
  desc="Learn how to coordinate work across multiple application instances using distributed locking in .NET, preventing race conditions and ensuring data consistency in scaled-out systems. Explore implementation approaches from PostgreSQL advisory locks to the DistributedLock library for production-ready solutions."
  url="https://milanjovanovic.tech/blog/distributed-locking-in-dotnet-coordinating-work-across-multiple-instances"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_160.png"/>

When you build applications that run across multiple servers or processes, you eventually run into the problem of concurrent access. Multiple workers try to update the same resource at the same time, and you end up with race conditions, duplicated work, or corrupted data.

.NET provides excellent [**concurrency control primitives**](/milanjovanovic.tech/introduction-to-locking-and-concurrency-control-in-dotnet-6.md) for single-process scenarios, like `lock`, `SemaphoreSlim`, and `Mutex`. But when your application is scaled out across multiple instances, these primitives don't work anymore.

That's where **distributed locking** comes in.

Distributed locking provides a solution by ensuring **only one node** (application instance) can access a critical section at a time, preventing race conditions and maintaining data consistency **across your distributed system**.

---

## Why and When You Need Distributed Locking

In a single-process app, you can just use `lock` or the new [<VPIcon icon="fa-brands fa-microsoft"/>Lock class](https://learn.microsoft.com/en-us/dotnet/api/system.threading.lock) in .NET 10. But once you scale out, that's not enough, because each process has its own memory space.

A few common cases where distributed locks are valuable:

- **Background jobs**: ensuring only one worker processes a particular job or resource at a time.
- **Leader election**: choosing a single process to perform periodic work (like applying async database projections).
- **Avoiding double execution**: ensuring scheduled tasks don't run multiple times when deployed to multiple instances.
- **Coordinating shared resources**: e.g., only one service instance performing a migration or cleanup at a time.
- **Cache stampede prevention**: ensuring only one instance refreshes the cache when a given cache key expires.

The key value: consistency and safety across distributed environments. Without this, you risk duplicate operations, corrupted state, or unnecessary load.

Now you know why distributed locking is important.

Let's look at some implementation options.

---

## DIY Distributed Locking with PostgreSQL Advisory Locks

Let's start simple. PostgreSQL has a feature called [<VPIcon icon="iconfont icon-postgresql"/>advisory locks](https://postgresql.org/docs/current/explicit-locking.html#ADVISORY-LOCKS) that's perfect for distributed locking. Unlike table locks, these don't interfere with your data - they're purely for coordination.

Here's an example:

```cs
public class NightlyReportService(NpgsqlDataSource dataSource)
{
    public async Task ProcessNightlyReport()
    {
        await using var connection = dataSource.OpenConnection();

        var key = HashKey("nightly-report");

        var acquired = await connection.ExecuteScalarAsync<bool>(
            "SELECT pg_try_advisory_lock(@key)",
            new { key });

        if (!acquired)
        {
            throw new ConflictException("Another instance is already processing the nightly report");
        }

        try
        {
            await DoWork();
        }
        finally
        {
            await connection.ExecuteAsync(
                "SELECT pg_advisory_unlock(@key)",
                new { key });
        }
    }

    private static long HashKey(string key) =>
        BitConverter.ToInt64(SHA256.HashData(Encoding.UTF8.GetBytes(key)), 0);

    private static Task DoWork() => Task.Delay(5000); // Your actual work here
}
```

Here's what's happening under the hood.

First, we convert our lock name into a number. PostgreSQL **advisory locks need numeric keys**, so we hash `nightly-report` into a 64-bit integer. Every node (application instance) must generate the same number for the same string, or this won't work.

Next, `pg_try_advisory_lock()` attempts to grab an exclusive lock on that number. It returns `true` if successful, `false` if another connection already holds it. This call doesn't block - it tells you immediately whether you got the lock.

If we get the lock, we do our work. If not, we return a conflict response and let the other instance handle it.

The `finally` block ensures we always release the lock, even if something goes wrong. PostgreSQL also **automatically releases advisory locks when connections close**, which is a nice safety net.

SQL Server has a similar feature with [<VPIcon icon="iconfont icon-postgresql"/>`sp_getapplock`](https://learn.microsoft.com/en-us/sql/relational-databases/system-stored-procedures/sp-getapplock-transact-sql).

---

## Exploring the DistributedLock Library

While the DIY approach works, production applications need more sophisticated features. The [<VPIcon icon="iconfont icon-github"/>`madelson/DistributedLock`](https://github.com/madelson/DistributedLock) library handles the edge cases and provides multiple backend options (Postgres, Redis, SqlServer, etc.). You know I'm a fan of not reinventing the wheel, so this is a great choice.

Install the package:

```powershell
Install-Package DistributedLock
```

I'll use the approach with `IDistributedLockProvider` which works nicely with DI. You can acquire a lock without having to know anything about the underlying infrastructure. All you have to do is register a lock provider implementation in your DI container.

For example, using Postgres:

```cs
// Register the distributed lock provider
builder.Services.AddSingleton<IDistributedLockProvider>(
    (_) =>
    {
        return new PostgresDistributedSynchronizationProvider(
            builder.Configuration.GetConnectionString("distributed-locking")!);
    });
```

Or if you want to use Redis with the [<VPIcon icon="iconfont icon-redis"/>Redlock algorithm](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/):

```cs
// Requires StackExchange.Redis
builder.Services.AddSingleton<IConnectionMultiplexer>(
    (_) =>
    {
        return ConnectionMultiplexer.Connect(
            builder.Configuration.GetConnectionString("redis")!);
    });

// Register the distributed lock provider
builder.Services.AddSingleton<IDistributedLockProvider>(
    (sp) =>
    {
        var connectionMultiplexer = sp.GetRequiredService<IConnectionMultiplexer>();

        return new RedisDistributedSynchronizationProvider(connectionMultiplexer.GetDatabase());
    });
```

The usage is straightforward:

```cs
// You can also pass in a timeout, where the provider will keep retrying to acquire the lock
// until the timeout is reached.
IDistributedSynchronizationHandle? distributedLock = distributedLockProvider
    .TryAcquireLock("nightly-report");

// If we didn't get the lock, the object will be null
if (distributedLock is null)
{
    return Results.Conflict();
}

// It's important to wrap the lock in a using statement to ensure it's released properly
using (distributedLock)
{
    await DoWork();
}
```

The library handles all the tricky parts: timeouts, retries, and ensuring locks are released even in failure scenarios.

It also supports many backends (SQL Server, Azure, ZooKeeper, etc.), making it a solid choice for production workloads.

---

## Wrapping Up

**Distributed locking** isn't something you need every day. But when you do, it saves you from subtle, painful bugs that only appear under load or in production.

**Start simple**: if you're already using Postgres, **advisory locks** are a powerful tool.

For a cleaner developer experience, reach for the **DistributedLock library**.

Choose the backend that fits your infrastructure (Postgres, Redis, SQL Server, etc.).

The right lock at the right time ensures your system stays consistent, reliable, and resilient, even across multiple processes and servers.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Distributed Locking in .NET: Coordinating Work Across Multiple Instances",
  "desc": "Learn how to coordinate work across multiple application instances using distributed locking in .NET, preventing race conditions and ensuring data consistency in scaled-out systems. Explore implementation approaches from PostgreSQL advisory locks to the DistributedLock library for production-ready solutions.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/distributed-locking-in-dotnet-coordinating-work-across-multiple-instances.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
