---
lang: en-US
title: "Overriding Default HTTP Resilience Handlers in .NET"
description: "Article(s) > Overriding Default HTTP Resilience Handlers in .NET"
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
      content: "Article(s) > Overriding Default HTTP Resilience Handlers in .NET"
    - property: og:description
      content: "Overriding Default HTTP Resilience Handlers in .NET"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/overriding-default-http-resilience-handlers-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2025-02-01
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_127.png
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
  name="Overriding Default HTTP Resilience Handlers in .NET"
  desc="While .NET 8's standard resilience handlers provide excellent defaults for HTTP clients, they lack built-in support for overriding these handlers for specific endpoints that require different resilience strategies. This article demonstrates how to implement a custom solution for overriding default handlers and discusses upcoming improvements planned by the .NET team."
  url="https://milanjovanovic.tech/blog/overriding-default-http-resilience-handlers-in-dotnet"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_127.png"/>

Introducing [**.NET 8 resilience packages**](/milanjovanovic.tech/building-resilient-cloud-applications-with-dotnet.md) built on top of [<FontIcon icon="iconfont icon-github"/>`App-vNext/Polly`](https://github.com/App-vNext/Polly) has made it much easier to build robust HTTP clients. These packages provide standard resilience handlers that you can easily attach to `HttpClient` instances. They implement common patterns like retry, circuit breaker, and timeout policies.

However, there is a significant limitation: once you configure the standard resilience handlers globally for all clients, there is no built-in way to override them for specific cases. This can be problematic when different endpoints require different resilience strategies.

In today's issue, I'll show you how to fix this and what the .NET team is doing about it.

---

## Standard Resilience Configuration

Let's say you've configured default resilience handlers in your application startup. `ConfigureHttpClientDefaults` is a convenient way to add standard resilience handlers to all `HttpClient` instances:

```cs
builder.Services
    .AddHttpClient()
    .ConfigureHttpClientDefaults(http => http.AddStandardResilienceHandler());
```

The .NET team runs many large-scale services in production, and they've found a standard set of resilience strategies that work well for most scenarios.

The standard resilience handler combines five strategies to create a resilience pipeline:

- Rate limiter
- Total request timeout
- Retry
- Circuit breaker
- Attempt timeout

You can customize the standard resilience pipeline by configuring the `HttpStandardResilienceOptions`.

Here's an example of how to configure it:

```cs
builder.Services.ConfigureHttpClientDefaults(http => http.AddStandardResilienceHandler(options =>
{
    // Default is 2 seconds.
    options.Retry.Delay = TimeSpan.FromSeconds(1);

    // Default is 30 seconds.
    options.TotalRequestTimeout.Timeout = TimeSpan.FromSeconds(20);

    // Default is 0.1.    options.CircuitBreaker.FailureRatio = 0.2;
}));
```

Okay, so we have our standard resilience pipeline set up. Now all your `HttpClient` instances will use these resilience policies.

But what if you need different retry logic for a specific API endpoint or need to turn off circuit breaking for specific calls?

---

## The Problem

Let's say you have a named `HttpClient` for calling the GitHub API, and you want to configure specific resilience strategies for it:

```cs
builder.Services
    .AddHttpClient("github")
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri("https://api.github.com");
    })
    .AddResilienceHandler("custom", pipeline =>
    {
        pipeline.AddTimeout(TimeSpan.FromSeconds(10));

        pipeline.AddRetry(new HttpRetryStrategyOptions
        {
            MaxRetryAttempts = 3,
            BackoffType = DelayBackoffType.Exponential,
            UseJitter = true,
            Delay = TimeSpan.FromMilliseconds(500)
        });

        pipeline.AddTimeout(TimeSpan.FromSeconds(1));
    });
```

The `custom` policy won't be applied because we have a global resilience pipeline that overrides it.

This is a big oversight in the current implementation of the .NET resilience packages.

---

## The Solution

The solution is to create an extension method that clears all handlers from the resilience pipeline. This allows you to remove the default handlers and add your custom ones.

Here's how to implement it:

```cs
public static class ResilienceHttpClientBuilderExtensions
{
    public static IHttpClientBuilder RemoveAllResilienceHandlers(this IHttpClientBuilder builder)
    {
        builder.ConfigureAdditionalHttpMessageHandlers(static (handlers, _) =>
        {
            for (int i = handlers.Count - 1; i >= 0; i--)
            {
                if (handlers[i] is ResilienceHandler)
                {
                    handlers.RemoveAt(i);
                }
            }
        });
        return builder;
    }
}
```

Now you can use this extension method to implement custom resilience strategies:

```cs
builder.Services
    .AddHttpClient("github")
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri("https://api.github.com");
    })
    .RemoveAllResilienceHandlers()
    .AddResilienceHandler("custom", pipeline =>
    {
        // Configure the custom resilience pipeline...
    });

// Or use another standard resilience pipeline...
builder.Services
    .AddHttpClient("github-hedged")
    .RemoveAllResilienceHandlers()
    .AddStandardHedgingHandler();
```

---

## Future Improvements

The .NET team is aware of this limitation, and better support for overriding default resilience handlers is planned for an upcoming release. The [pull request for this API (<FontIcon icon="iconfont icon-github"/>`dotnet/extensions`)](https://github.com/dotnet/extensions/pull/5801) is merged and should be available in a future release.

Until then, this workaround using `RemoveAllResilienceHandlers` is a drop-in replacement for the missing feature.

---

## Conclusion

The ability to override default resilience handlers is much needed when building robust distributed systems. While .NET's standard resilience handlers provide excellent defaults, real-world applications often require fine-tuned resilience strategies for different services. The extension method presented here bridges this gap, allowing you to maintain both global defaults and specialized configurations where needed.

Want to dive deeper into building resilient cloud applications? Check out my article about [**building resilient cloud applications with .NET**](/milanjovanovic.tech/building-resilient-cloud-applications-with-dotnet.md).

Good luck out there, and see you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Overriding Default HTTP Resilience Handlers in .NET",
  "desc": "While .NET 8's standard resilience handlers provide excellent defaults for HTTP clients, they lack built-in support for overriding these handlers for specific endpoints that require different resilience strategies. This article demonstrates how to implement a custom solution for overriding default handlers and discusses upcoming improvements planned by the .NET team.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/overriding-default-http-resilience-handlers-in-dotnet.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
