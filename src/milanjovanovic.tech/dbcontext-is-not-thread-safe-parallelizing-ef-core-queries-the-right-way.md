---
lang: en-US
title: "DbContext is Not Thread-Safe: Parallelizing EF Core Queries the Right Way"
description: "Article(s) > DbContext is Not Thread-Safe: Parallelizing EF Core Queries the Right Way"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > DbContext is Not Thread-Safe: Parallelizing EF Core Queries the Right Way"
    - property: og:description
      content: "DbContext is Not Thread-Safe: Parallelizing EF Core Queries the Right Way"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/dbcontext-is-not-thread-safe-parallelizing-ef-core-queries-the-right-way.html
prev: /programming/cs/articles/README.md
date: 2025-12-06
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_171.png
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

[[toc]]

---

<SiteInfo
  name="DbContext is Not Thread-Safe: Parallelizing EF Core Queries the Right Way"
  desc="Learn how to safely parallelize EF Core queries to improve performance by using IDbContextFactory to create isolated contexts, avoiding the thread-safety exceptions caused by sharing a single DbContext instance."
  url="https://milanjovanovic.tech/blog/dbcontext-is-not-thread-safe-parallelizing-ef-core-queries-the-right-way"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_171.png"/>

We have all built *that* endpoint.

You know the one: the "Executive Dashboard" or the "User Summary" screen. It's the endpoint that needs to fetch three or four completely unrelated sets of data to paint a complete picture for the user. It needs the last 50 orders, the current system health logs, the user's profile settings, and maybe a notification count.

So, you write the code the standard way:

```cs
var orders = await GetRecentOrdersAsync(userId);
var logs = await GetSystemLogsAsync();
var stats = await GetUserStatsAsync(userId);

return new DashboardDto(orders, logs, stats);
```

This works. It's clean. It's readable. But there is a problem.

If `GetRecentOrdersAsync` takes 300ms, `GetSystemLogsAsync` takes 400ms, and `GetUserStatsAsync` takes 300ms, your users are staring at a loading spinner for 1 full second (300 + 400 + 300).

In a distributed system, latency kills user experience. Since these data sets are unrelated, we should be able to run them in parallel. If we did, the total time would only be the duration of the slowest query (400ms). That is a 60% performance improvement just by changing how we execute the code.

But if you try the naive approach with Entity Framework Core, your application will crash.

---

## The False Promise of Task.WhenAll

The most common mistake developers make when trying to optimize this is wrapping their existing repository calls in tasks and waiting for them all at once.

It looks something like this:

```cs
// ❌ DO NOT DO THIS
public async Task<DashboardData> GetDashboardData(int userId)
{
    // These methods all use the same injected _dbContext
    var ordersTask = _repository.GetOrdersAsync(userId);
    var logsTask = _repository.GetLogsAsync();
    var statsTask = _repository.GetStatsAsync(userId);

    await Task.WhenAll(ordersTask, logsTask, statsTask); // BOOM 💥

    return new DashboardData(ordersTask.Result, logsTask.Result, statsTask.Result);
}
```

If you run this, you will immediately hit [<VPIcon icon="fa-brands fa-microsoft"/>this dreaded exception](https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/#avoiding-dbcontext-threading-issues):

::: info Avoiding DbContext threading issues (<VPIcon icon="fa-brands fa-microsoft"/><code>learn.microsoft.com</code>)

> A second operation started on this context before a previous operation completed. This is usually caused by different threads using the same instance of DbContext, however instance members are not guaranteed to be thread safe.

<SiteInfo
  name="DbContext Lifetime, Configuration, and Initialization - EF Core"
  desc="Patterns for creating and managing DbContext instances with or without dependency injection"
  url="https://learn.microsoft.com/en-us/ef/core/dbcontext-configuration/"
  logo="/assets/image/learn.microsoft.com/favicon.ico"
  preview="https://learn.microsoft.com/en-us/media/open-graph-image.png"/>

:::

**Why does this happen?**

The `DbContext` in EF Core is **not thread-safe**. It is a stateful object designed to manage a single unit of work. It maintains a "Change Tracker" to keep track of the entities you've loaded, and it wraps a single underlying database connection.

Database protocols (like the TCP stream for PostgreSQL or SQL Server) are generally synchronous at the connection level. You cannot push two different SQL queries down the same wire at the exact same millisecond. When you use `Task.WhenAll`, multiple threads try to grab that single connection simultaneously, and EF Core steps in to throw the exception to prevent data corruption.

So, we have a dilemma: We want the speed of parallelism, but the `DbContext` forces us into sequential execution.

---

## The Solution

Since .NET 5, EF Core has provided a first-class solution for this exact scenario: `IDbContextFactory<T>`.

Instead of injecting a scoped instance of your context (which lives for the entire HTTP request), you inject a factory that allows you to create lightweight, independent instances of `DbContext` on demand.

::: note

While using the factory is the cleanest approach for Dependency Injection, you can also manually instantiate the context (`using var context = new AppDbContext(options)`) if you have access to the `DbContextOptions`.

:::

First, we need to register the factory in our <VPIcon icon="iconfont icon-csharp"/>`Program.cs`.

```cs title="Program.cs"
// This registers IDbContextFactory<AppDbContext> as a Singleton (by default)
// It also registers AppDbContext as Scoped for ease of use elsewhere
builder.Services.AddDbContextFactory<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("db"));
});
```

Now, let's refactor our slow dashboard endpoint. Instead of injecting `AppDbContext`, we inject `IDbContextFactory<AppDbContext>`.

Inside our method, we spin up a dedicated task for each query. Inside each task, we create a brand new context, execute the query, and then immediately dispose of it.

```cs :collapsed-lines title="DashboardService.cs"
using Microsoft.EntityFrameworkCore;

public class DashboardService(IDbContextFactory<AppDbContext> contextFactory)
{
    public async Task<DashboardDto> GetDashboardAsync(int userId)
    {
        // 1. Start the tasks (The queries start executing immediately upon invocation)
        var ordersTask = GetOrdersAsync(userId);
        var logsTask = GetSystemLogsAsync();
        var statsTask = GetUserStatsAsync(userId);

        // 2. Wait for all to complete
        await Task.WhenAll(ordersTask, logsTask, statsTask);

        // 3. Return results (using 'await Task.WhenAll' here unwraps the result cleanly)
        return new DashboardDto(
            await ordersTask,
            await logsTask,
            await statsTask
        );
    }

    private async Task<List<Order>> GetOrdersAsync(int userId)
    {
        // Create a fresh context for this specific operation
        await using var context = await contextFactory.CreateDbContextAsync();

        return await context.Orders
            .AsNoTracking()
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ThenByDescending(o => o.Amount)
            .Take(50)
            .ToListAsync();
    }

    private async Task<List<SystemLog>> GetSystemLogsAsync()
    {
        await using var context = await contextFactory.CreateDbContextAsync();

        return await context.SystemLogs
            .AsNoTracking()
            .OrderByDescending(l => l.Timestamp)
            .Take(50)
            .ToListAsync();
    }

    private async Task<UserStats?> GetUserStatsAsync(int userId)
    {
        await using var context = await contextFactory.CreateDbContextAsync();

        return await context.Users
            .Where(u => u.Id == userId)
            .Select(u => new UserStats { OrderCount = u.Orders.Count })
            .FirstOrDefaultAsync();
    }
}
```


::: important Key Concepts

1. **Isolation**: Each task gets its own DbContext. This means they get their own database connection. There is no contention.
2. **Disposal**: Notice the await using. This is critical. As soon as the query is done, we want to dispose of that context and return the connection to the pool.

:::

---

## The Benchmark

To prove this works, I built a small .NET 10 app using Aspire and PostgreSQL.. Since I'm running this locally, the absolute times are very low. If I used a remote database, the times would be higher, but the speedup ratio would be similar.

### Sequential Execution

> ~36ms

![A distributed trace showing sequential EF Core queries.](https://milanjovanovic.tech/blogs/mnw_171/sequential_ef_queries_trace.png?imwidth=3840)

The waterfall is painfully obvious here. Each operation waits for the previous one to finish.

### Parallel Execution

> ~13ms

![A distributed trace showing parallel EF Core queries.](https://milanjovanovic.tech/blogs/mnw_171/parallel_ef_queries_trace.png?imwidth=3840)

By using the parallel approach, the timeline compresses. All three database spans start at the same time and complete together.

---

## Trade-offs & Conclusion

`IDbContextFactory` bridges the gap between EF Core's unit-of-work design and the reality of modern, parallel requirements. It allows you to break out of the "one request, one thread" box without sacrificing safety.

However, use this pattern sparingly:

- **Connection pool starvation**: A single HTTP request now occupies 3 database connections simultaneously instead of 1. If you have high concurrency, you can easily exhaust your connection pool.
- **Context overhead**: If your queries are extremely fast (e.g., simple lookups by ID), the overhead of creating multiple contexts and tasks might make the parallel version slower than the sequential one.

Next time you are staring at a slow dashboard, don't reach for raw SQL immediately. Check your awaits. If they are lined up single-file, it might be time to introduce some parallelization.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "DbContext is Not Thread-Safe: Parallelizing EF Core Queries the Right Way",
  "desc": "Learn how to safely parallelize EF Core queries to improve performance by using IDbContextFactory to create isolated contexts, avoiding the thread-safety exceptions caused by sharing a single DbContext instance.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/dbcontext-is-not-thread-safe-parallelizing-ef-core-queries-the-right-way.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
