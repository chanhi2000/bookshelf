---
lang: en-US
title: "HybridCache in ASP.NET Core - New Caching Library"
description: "Article(s) > HybridCache in ASP.NET Core - New Caching Library"
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
      content: "Article(s) > HybridCache in ASP.NET Core - New Caching Library"
    - property: og:description
      content: "HybridCache in ASP.NET Core - New Caching Library"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/hybrid-cache-in-aspnetcore-new-caching-library.html
prev: /programming/cs/articles/README.md
date: 2024-11-16
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_116.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="HybridCache in ASP.NET Core - New Caching Library"
  desc="HybridCache in .NET 9 combines fast in-memory caching with distributed caching, solving common problems like cache stampede while adding features like tag-based invalidation. This guide shows you how to use HybridCache in your applications, from basic setup to real-world usage patterns with Entity Framework Core and minimal APIs."
  url="https://milanjovanovic.tech/blog/hybrid-cache-in-aspnetcore-new-caching-library"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_116.png"/>

[Caching](/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.md) is essential for building fast, scalable applications. ASP.NET Core has traditionally offered two caching options: in-memory caching and distributed caching. Each has its trade-offs. In-memory caching using `IMemoryCache` is fast but limited to a single server. Distributed caching with `IDistributedCache` works across multiple servers using a backplane.

.NET 9 introduces `HybridCache`, a new library that combines the best of both approaches. It prevents common caching problems like cache stampede. It also adds useful features like tag-based invalidation and better performance monitoring.

In this week's issue, I'll show you how to use `HybridCache` in your applications.

---

## What is HybridCache?

The traditional caching options in ASP.NET Core have limitations. In-memory caching is fast but limited to one server. Distributed caching works across servers but is slower.

[<FontIcon icon="fa-brands fa-microsoft"/>HybridCache](https://learn.microsoft.com/en-us/aspnet/core/performance/caching/hybrid) combines both approaches and adds important features:

- Two-level caching (L1/L2)
  - L1: Fast in-memory cache
  - L2: Distributed cache (Redis, SQL Server, etc.)
- Protection against [<FontIcon icon="fa-brands fa-wikipedia-w"/>cache stampede](https://en.wikipedia.org/wiki/Cache_stampede) (when many requests hit an empty cache at once)
- Tag-based cache invalidation
- Configurable serialization
- Metrics and monitoring

The L1 cache runs in your application's memory. The L2 cache can be Redis, SQL Server, or any other distributed cache. You can use HybridCache with just the L1 cache if you don't need distributed caching.

---

## Installing HybridCache

Install the `Microsoft.Extensions.Caching.Hybrid` NuGet package:

```powershell
Install-Package Microsoft.Extensions.Caching.Hybrid
```

Add `HybridCache` to your services:

```cs
builder.Services.AddHybridCache(options =>
{
    // Maximum size of cached items
    options.MaximumPayloadBytes = 1024 * 1024 * 10; // 10MB
    options.MaximumKeyLength = 512;

    // Default timeouts
    options.DefaultEntryOptions = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(30),
        LocalCacheExpiration = TimeSpan.FromMinutes(30)
    };
});
```

For custom types, you can add your own serializer:

```cs
builder.Services.AddHybridCache()
    .AddSerializer<CustomType, CustomSerializer>();
```

---

## Using HybridCache

`HybridCache` provides several methods to work with cached data. The most important ones are `GetOrCreateAsync`, `SetAsync`, and various remove methods. Let's see how to use each one in real-world scenarios.

### Getting or Creating Cache Entries

The `GetOrCreateAsync` method is your main tool for working with cached data. It handles both cache hits and misses automatically. If the data isn't in the cache, it calls your factory method to get the data, caches it, and returns it.

Here's an endpoint that gets product details:

```cs
app.MapGet("/products/{id}", async (
    int id,
    HybridCache cache,
    ProductDbContext db,
    CancellationToken ct) =>
{
    var product = await cache.GetOrCreateAsync(
        $"product-{id}",
        async token =>
        {
            return await db.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id, token);
        },
        cancellationToken: ct
    );

    return product is null ? Results.NotFound() : Results.Ok(product);
});
```

In this example:

- The cache key is unique per product
- If the product is in the cache, it's returned immediately
- If not, the factory method runs to get the data
- Other concurrent requests for the same product wait for the first one to finish

### Setting Cache Entries Directly

Sometimes you need to update the cache directly, like after modifying data. The `SetAsync` method handles this:

```cs
app.MapPut("/products/{id}", async (int id, Product product, HybridCache cache) =>
{
    // First update the database
    await UpdateProductInDatabase(product);

    // Then update the cache with custom expiration
    var options = new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromHours(1),
        LocalCacheExpiration = TimeSpan.FromMinutes(30)
    };

    await cache.SetAsync(
        $"product-{id}",
        product,
        options
    );

    return Results.NoContent();
});
```

Key points about `SetAsync`:

- It updates both L1 and L2 cache
- You can specify different timeouts for L1 and L2
- It overwrites any existing value for the same key

### Using Cache Tags

Tags are powerful for managing groups of related cache entries. You can invalidate multiple entries at once using tags:

```cs
app.MapGet("/categories/{id}/products", async (
    int id,
    HybridCache cache,
    ProductDbContext db,
    CancellationToken ct) =>
{
    var tags = [$"category-{id}", "products"];

    var products = await cache.GetOrCreateAsync(
        $"products-by-category-{id}",
        async token =>
        {
            return await db.Products
                .Where(p => p.CategoryId == id)
                .Include(p => p.Category)
                .ToListAsync(token);
        },
        tags: tags,
        cancellationToken: ct
    );

    return Results.Ok(products);
});

// Endpoint to invalidate all products in a category
app.MapPost("/categories/{id}/invalidate", async (
    int id,
    HybridCache cache,
    CancellationToken ct) =>
{
    await cache.RemoveByTagAsync($"category-{id}", ct);

    return Results.NoContent();
});
```

Tags are useful for:

- Invalidating all products in a category
- Clearing all cached data for a specific user
- Refreshing all related data when something changes

### Removing Single Entries

For direct cache invalidation of specific items, use `RemoveAsync`:

```cs
app.MapDelete("/products/{id}", async (int id, HybridCache cache) =>
{
    // First delete from database
    await DeleteProductFromDatabase(id);

    // Then remove from cache
    await cache.RemoveAsync($"product-{id}");

    return Results.NoContent();
});
```

`RemoveAsync`:

- Removes the item from both L1 and L2 cache
- Works immediately, no delay
- Does nothing if the key doesn't exist
- Is safe to call multiple times

Remember that `HybridCache` handles all the complexity of distributed caching, serialization, and stampede protection for you. You just need to focus on your cache keys and when to invalidate the cache.

---

## Adding Redis as L2 Cache

To use [<FontIcon icon="iconfont icon-redis"/>Redis](https://redis.io/) as your distributed cache:

::: tabs

@tab:active 1.

Install the `Microsoft.Extensions.Caching.StackExchangeRedis` NuGet package:

```powershell
Install-Package Microsoft.Extensions.Caching.StackExchangeRedis
```

@tab 2.

Configure Redis and `HybridCache`:

```cs
// Add Redis
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "your-redis-connection-string";
});

// Add HybridCache - it will automatically use Redis as L2
builder.Services.AddHybridCache();
```

:::

`HybridCache` will automatically detect and use Redis as the L2 cache.

---

## Summary

`HybridCache` simplifies caching in .NET applications. It combines fast in-memory caching with distributed caching, prevents common problems like cache stampede, and works well in both single-server and distributed systems.

Start with the default settings and basic usage patterns - the library is designed to be simple to use while solving complex caching problems.

Thanks for reading.

And stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HybridCache in ASP.NET Core - New Caching Library",
  "desc": "HybridCache in .NET 9 combines fast in-memory caching with distributed caching, solving common problems like cache stampede while adding features like tag-based invalidation. This guide shows you how to use HybridCache in your applications, from basic setup to real-world usage patterns with Entity Framework Core and minimal APIs.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/hybrid-cache-in-aspnetcore-new-caching-library.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
