---
lang: en-US
title: "How to Build a High-Performance Cache Without External Libraries"
description: "Article(s) > How to Build a High-Performance Cache Without External Libraries"
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
      content: "Article(s) > How to Build a High-Performance Cache Without External Libraries"
    - property: og:description
      content: "How to Build a High-Performance Cache Without External Libraries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-build-a-high-performance-cache-without-external-libraries.html
prev: /programming/cs/articles/README.md
date: 2025-12-27
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_174.png
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
  name="How to Build a High-Performance Cache Without External Libraries"
  desc="Learn how to build a high-performance cache from scratch in .NET, moving from a simple ConcurrentDictionary to an optimized keyed-locking system. This deep dive explores how to master concurrency patterns like double-checked locking to protect your APIs and improve application scalability."
  url="https://milanjovanovic.tech/blog/how-to-build-a-high-performance-cache-without-external-libraries"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_174.png"/>

A couple of days ago, I was looking at a piece of code that's doing too much work. I'm sure you'll be able to draw a parallel to something in your own applications. Maybe it's a database call that should be faster, or an external API that's starting to bill you by the thousands.

My first instinct is: **"I'll just cache it"**.

In .NET, that usually means reaching for `IMemoryCache` or plugging in a distributed cache like Redis.

But have you ever stopped to wonder what's actually happening inside those libraries?  
Why do we need all that complexity just to store a value in memory?

So I spent the afternoon trying to build a [**high-performance cache**](/milanjovanovic.tech/caching-in-aspnetcore-improving-application-performance.md) from scratch.

I don't recommend DIY-ing your own caching library for production use. But I learn best by doing something myself. Understanding these patterns (concurrency, race conditions, and [**locking**](/milanjovanovic.tech/introduction-to-locking-and-concurrency-control-in-dotnet-6.md)) is what separates a "coder" from an engineer.

---

## The Starting Point

I was working on a simple currency conversion handler. We're calling a third-party API to get exchange rates. The API returns the current exchange rate for a given currency code (like EUR, GBP, JPY) against USD.

This is the initial implementation:

```cs{23}
public static class CurrencyConversion
{
    public static async Task<IResult> Handle(
        string currencyCode,
        decimal amount,
        CurrencyApiClient currencyClient)
    {
        // Validate currency code format (3 uppercase letters)
        if (string.IsNullOrWhiteSpace(currencyCode) ||
            currencyCode.Length != 3 ||
            !currencyCode.All(char.IsLetter))
        {
            return Results.BadRequest(
                new { error = "Currency code must be a 3-letter uppercase code (e.g., EUR, GBP)" });
        }

        // Validate amount (must be positive)
        if (amount < 0)
        {
            return Results.BadRequest(new { error = "Amount must be a positive number" });
        }

        var rate = await currencyClient.GetExchangeRateAsync(currencyCode);

        if (rate == null)
        {
            return Results.NotFound(
                new { error = $"Exchange rate for {currencyCode} not found or API error occurred" });
        }

        var convertedAmount = amount * rate.Value;

        return Results.Ok(new ExchangeRateResponse(
            Currency: currencyCode,
            BaseCurrency: "USD",
            Rate: rate.Value,
            Amount: amount,
            ConvertedAmount: convertedAmount
        ));
    }
}
```

This works fine in your local dev environment. But in production, if 100 people hit this at the same time, you're making 100 identical network calls. Your API provider will hate you (and you may even get rate limited), and your latency will spike.

Now let's build a cache to fix this without using any external libraries. Remember, we're doing this for learning purposes only.

---

## Level 1: Adding a `ConcurrentDictionary`

Your first thought is probably to store the rates in a `ConcurrentDictionary`. It’s thread-safe, so it feels like the right tool.

```cs{4,11}
private static readonly ConcurrentDictionary<string, decimal> Cache = new();

// In the Handler:
if (Cache.TryGetValue(currencyCode, out var cachedRate))
{
    return cachedRate;
}

var rate = await currencyClient.GetExchangeRateAsync(currencyCode);

Cache.TryAdd(currencyCode, rate.Value);
```

This definitely helps with performance under load. Multiple threads can read and write to the dictionary without crashing. But `ConcurrentDictionary` protects the *dictionary structure*, not your *logic*.

If 100 users request "EUR" at the exact same time, `TryGetValue` will return false for all of them. They will all proceed to call the API. This is a classic [**race condition**](/milanjovanovic.tech/solving-race-conditions-with-ef-core-optimistic-locking.md). You've protected your memory, but you haven't protected the external API.

There's also another problem with this approach: the rates never expire.

---

## Level 2: Adding Cache Expiration

Currency rates don't stay the same forever. We need a way to expire them. Since `ConcurrentDictionary` doesn't have a "Time to Live" (TTL), we have to wrap our data.

```cs{9-10}
// Store both the rate and the time it was created
private record CacheEntry(decimal Rate, DateTime CreatedAt);

// Our cache now stores CacheEntry objects
private static readonly ConcurrentDictionary<string, CacheEntry> Cache = new();
private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

// Check: Is it there? And is it still "fresh"?
if (Cache.TryGetValue(currencyCode, out var entry) &&
    (DateTime.UtcNow - entry.CreatedAt) < CacheDuration)
{
    return entry.Rate;
}
```

Now we have expiration. But we've actually created a new problem: [<VPIcon icon="fa-brands fa-wikipedia-w"/>The Thundering Herd](https://en.wikipedia.org/wiki/Thundering_herd_problem) (a.k.a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Cache Stampede](https://en.wikipedia.org/wiki/Cache_stampede)).

Every 5 minutes, when the cache expires, all incoming traffic will see "stale" data and try to refresh it at once.

So we need to fix that next.

---

## Level 3: Solving the "Cache Stampede"

To fix the stampede, we need to ensure that only *one* person can fetch the update while everyone else waits.

How do we do that in C#?

We use a `SemaphoreSlim` and a pattern called [<VPIcon icon="fa-brands fa-wikipedia-w"/>Double-Checked Locking](https://en.wikipedia.org/wiki/Double-checked_locking). We check the cache once (the "fast path"), then we lock, and then we check *again* to see if someone else filled it while we were waiting for the lock.

```cs{12} :collapsed-lines
// Basically a mutex but async-friendly
private static readonly SemaphoreSlim Lock = new(1, 1);

public static async Task<decimal> GetRateAsync(string code, CurrencyApiClient client)
{
    // Fast path: No locking needed
    if (Cache.TryGetValue(code, out var entry) && IsFresh(entry))
    {
        return entry.Rate;
    }

    var acquired = await Lock.WaitAsync(TimeSpan.FromSeconds(10)); // Avoid deadlocks
    if (!acquired)
    {
        throw new Exception("Could not acquire lock to fetch exchange rate.");
    }
    try
    {
        // Double-check: Did someone else finish the API call while we waited?
        if (Cache.TryGetValue(code, out entry) && IsFresh(entry))
        {
            return entry.Rate;
        }

        var rate = await client.GetExchangeRateAsync(code);
        var newEntry = new CacheEntry(rate.Value, DateTime.UtcNow);

        // Atomically update the cache
        // This is safe because we're inside the lock
        Cache.AddOrUpdate(code, newEntry, (_, _) => newEntry);
        return rate.Value;
    }
    finally
    {
        // Always release the lock
        Lock.Release();
    }
}
```

This is an improvement. But something still feels off.

Can you spot the *problem* with this code?

Our lock behaves like a global lock. This means that if one thread is fetching "EUR", all other threads (even those requesting "JPY") are blocked until the "EUR" fetch completes. This problem is called **lock contention**.

Let's fix that next.

---

## Level 4: Scaling with Keyed Locking

The "pro" move here is **Keyed Locking**. We create a lock for every specific currency. Since the number of currencies is finite, this isn't too memory-intensive.

We need an additional `ConcurrentDictionary` to hold our semaphores, per currency code.

```cs{4}
private static readonly ConcurrentDictionary<string, SemaphoreSlim> Locks = new();

// In the Handler:
var semaphore = Locks.GetOrAdd(currencyCode, _ => new SemaphoreSlim(1, 1));
if (!Cache.TryGetValue(currencyCode, out var cachedRate) &&
    DateTime.UtcNow - cachedRate?.CreatedAt < CacheDuration)
{
    var acquired = await semaphore.WaitAsync(TimeSpan.FromSeconds(10));
    if (!acquired)
    {
        throw new Exception("Could not acquire lock to fetch exchange rate.");
    }
    try
    {
        // Fetch and update logic...
    }
    finally { semaphore.Release(); }
}
```

The only thing that changes is how we acquire the lock. Now, if one thread is fetching "EUR", other threads requesting "JPY" can proceed without waiting. This is the most scalable version of our cache.

**But...** It only works in memory. So it's not suitable for distributed systems or multiple server instances. There are also a few more edge cases to consider, but you can explore those as an exercise.

---

## The Final Code

Here's the final version of our caching logic:

```cs :collapsed-lines
public static class CurrencyConversion
{
    private record CacheEntry(decimal Rate, DateTime CreatedAt);
    private static readonly ConcurrentDictionary<string, CacheEntry> Cache = new();
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

    private static readonly ConcurrentDictionary<string, SemaphoreSlim> Locks = new();

    public static async Task<IResult> Handle(
        string currencyCode,
        decimal amount,
        CurrencyApiClient currencyClient)
    {
        // Validate currency code format (3 uppercase letters)
        if (string.IsNullOrWhiteSpace(currencyCode) ||
            currencyCode.Length != 3 ||
            !currencyCode.All(char.IsLetter))
        {
            return Results.BadRequest(
                new { error = "Currency code must be a 3-letter uppercase code (e.g., EUR, GBP)" });
        }

        // Validate amount (must be positive)
        if (amount < 0)
        {
            return Results.BadRequest(new { error = "Amount must be a positive number" });
        }

        decimal? rate;
        var semaphore = Locks.GetOrAdd(currencyCode, _ => new SemaphoreSlim(1, 1));
        if (!Cache.TryGetValue(currencyCode, out var cachedRate) &&
            DateTime.UtcNow - cachedRate?.CreatedAt < CacheDuration)
        {
            var acquired = await semaphore.WaitAsync(TimeSpan.FromSeconds(10));
            if (!acquired)
            {
                throw new Exception("Could not acquire lock to fetch exchange rate.");
            }

            try
            {
                // Double-check locking pattern: check again inside the lock
                if (!Cache.TryGetValue(currencyCode, out cachedRate) &&
                    DateTime.UtcNow - cachedRate?.CreatedAt < CacheDuration)
                {
                    rate = await currencyClient.GetExchangeRateAsync(currencyCode);

                    if (rate == null)
                    {
                        return Results.NotFound(
                            new { error = $"Exchange rate for {currencyCode} not found or API error occurred" });
                    }

                    Cache.AddOrUpdate(currencyCode,
                        _ => new CacheEntry(rate.Value, DateTime.UtcNow),
                        (_, _) => new CacheEntry(rate.Value, DateTime.UtcNow));
                }
                else
                {
                    rate = cachedRate!.Rate;
                }
            }
            finally
            {
                semaphore.Release();
            }
        }
        else
        {
            rate = cachedRate!.Rate;
        }

        var convertedAmount = amount * rate.Value;

        return Results.Ok(new ExchangeRateResponse(
            Currency: currencyCode,
            BaseCurrency: "USD",
            Rate: rate.Value,
            Amount: amount,
            ConvertedAmount: convertedAmount
        ));
    }
}
```

The next step would be to extract the core caching logic into its own reusable class. That way, you can use it in other parts of your application.

---

## Takeaway

Why go through all this trouble?

It's easy to look at a simple `ConcurrentDictionary` and think you're done. But as we've seen, the gap between "it works" and "it scales" is filled with edge cases that can bring a production system to its knees.

When you use a library, it handles these edge cases for you. But building it yourself teaches you about the "three pillars" of high-performance code:

1. **Thread safety**
2. **Lock contention**
3. **Resource protection**

Sometimes the most "boring" parts of our infrastructure, like a cache, are actually the most architecturally interesting.

There's also that 1% of the time when you need a custom solution that no library can provide. So it's worth knowing the fundamentals of how these things work.

Modern libraries like [**HybridCache**](/milanjovanovic.tech/hybrid-cache-in-aspnetcore-new-caching-library.md) or [<VPIcon icon="iconfont icon-github"/>`ZiggyCreatures/FusionCache`](https://github.com/ZiggyCreatures/FusionCache) handle this for you, but understanding these patterns ensures you know exactly why your application behaves the way it does under load.

And since this is the last issue of the year, I wish you a fantastic New Year! 🎉

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a High-Performance Cache Without External Libraries",
  "desc": "Learn how to build a high-performance cache from scratch in .NET, moving from a simple ConcurrentDictionary to an optimized keyed-locking system. This deep dive explores how to master concurrency patterns like double-checked locking to protect your APIs and improve application scalability.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/how-to-build-a-high-performance-cache-without-external-libraries.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
