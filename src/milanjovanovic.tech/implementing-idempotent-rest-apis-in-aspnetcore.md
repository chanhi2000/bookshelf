---
lang: en-US
title: "Implementing Idempotent REST APIs in ASP.NET Core"
description: "Article(s) > Implementing Idempotent REST APIs in ASP.NET Core"
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
      content: "Article(s) > Implementing Idempotent REST APIs in ASP.NET Core"
    - property: og:description
      content: "Implementing Idempotent REST APIs in ASP.NET Core"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-idempotent-rest-apis-in-aspnetcore.html
prev: /programming/cs/articles/README.md
date: 2024-10-26
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_113.png
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
  name="Implementing Idempotent REST APIs in ASP.NET Core"
  desc="Learn how to implement idempotency in ASP.NET Core Web APIs to improve reliability and prevent duplicate operations in distributed systems."
  url="https://milanjovanovic.tech/blog/implementing-idempotent-rest-apis-in-aspnetcore"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_113.png"/>

Idempotency is a crucial concept for REST APIs that ensures the reliability and consistency of your system. An idempotent operation can be repeated multiple times without changing the result beyond the initial API request. This property is especially important in distributed systems, where network failures or timeouts can lead to repeated requests.

Implementing idempotency in your API brings several benefits:

- It prevents unintended duplicate operations
- It improves reliability in distributed systems
- It helps handle network issues and retries gracefully

In this week's issue, we'll explore how to implement idempotency in ASP.NET Core APIs, ensuring your system remains robust and reliable.

---

## What is Idempotence?

Idempotence, in the context of web APIs, means that making multiple identical requests should have the same effect as making a single request. In other words, no matter how many times a client sends the same request, the server-side effect should only occur once.

The [<FontIcon icon="fas fa-globe"/>RFC 9110](https://rfc-editor.org/rfc/rfc9110) standard about HTTP Semantics offers a definition we could use. Here's what it says about **idempotent methods**:

::: info RFC 9110 (HTTP Semantics), Section 9.2.2, Paragraph 1

> A request method is considered "idempotent" if the intended effect on the server of multiple identical requests with that method is the same as the effect for a single such request.
> 
> Of the request methods defined by this specification, PUT, DELETE, and safe request methods \[(GET, HEAD, OPTIONS, and TRACE) - author's note\] are idempotent.

```component VPCard
{
  "title": "RFC 9110: HTTP Semantics",
  "desc": "",
  "link": "https://rfc-editor.org/rfc/rfc9110#section-9.2.2-1/",
  "logo": "https://rfc-editor.org/wp-content/uploads/favicon-1.ico",
  "background": "rgba(227,227,227,0.2)"
}
```

:::

However, the following paragraph is quite interesting. It clarifies that the server can implement "other non-idempotent side effects" that don't apply to the resource.

::: info RFC 9110 (HTTP Semantics), Section 9.2.2, Paragraph 2

> ... the idempotent property only applies to what has been requested by the user; a server is free to log each request separately, retain a revision control history, or implement other non-idempotent side effects for each idempotent request.

```component VPCard
{
  "title": "RFC 9110: HTTP Semantics",
  "desc": "",
  "link": "https://rfc-editor.org/rfc/rfc9110#section-9.2.2-2/",
  "logo": "https://rfc-editor.org/wp-content/uploads/favicon-1.ico",
  "background": "rgba(227,227,227,0.2)"
}
```

:::

The benefits of implementing idempotency extend beyond just adhering to HTTP method semantics. It significantly improves the reliability of your API, especially in distributed systems where network issues can lead to retried requests. By implementing idempotency, you prevent duplicate operations that could occur due to client retries.

---

## Which HTTP Methods are Idempotent?

Several HTTP methods are inherently idempotent:

- `GET`, `HEAD`: Retrieve data without modifying the server state.
- `PUT`: Update a resource, resulting in the same state regardless of repetition.
- `DELETE`: Remove a resource with the same outcome for multiple requests.
- `OPTIONS`: Retrieve communication options information.

`POST` is not inherently idempotent, as it typically creates resources or processes data. Repeated `POST` requests could create multiple resources or trigger multiple actions.

However, we can implement idempotency for `POST` methods using custom logic.

::: note

While `POST` requests aren't naturally idempotent, we can design them to be. For example, checking for existing resources before creation ensures that repeated `POST` requests don't result in duplicate actions or resources.

:::

---

## Implementing Idempotency in ASP.NET Core

To implement idempotency, we'll use a strategy involving idempotency keys:

1. The client generates a unique key for each operation and sends it in a custom header.
2. The server checks if it has seen this key before:
    - For a new key, process the request and store the result.
    - For a known key, return the stored result without reprocessing.

This ensures that retried requests (e.g., due to network issues) are processed only once on the server.

We can implement idempotency for controllers by combining an `Attribute` and `IAsyncActionFilter`. Now, we can specify the `IdempotentAttribute` to apply idempotency to a controller endpoint.

::: note

When a request fails (returns 4xx/5xx), we don't cache the response. This allows clients to retry with the same idempotency key. However, this means a failed request followed by a successful one with the same key will succeed - make sure this aligns with your business requirements.

:::

```cs title="IdempotentAttribute.cs"
[AttributeUsage(AttributeTargets.Method)]
internal sealed class IdempotentAttribute : Attribute, IAsyncActionFilter
{
    private const int DefaultCacheTimeInMinutes = 60;
    private readonly TimeSpan _cacheDuration;

    public IdempotentAttribute(int cacheTimeInMinutes = DefaultCacheTimeInMinutes)
    {
        _cacheDuration = TimeSpan.FromMinutes(minutes);
    }

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        // Parse the Idempotence-Key header from the request
        if (!context.HttpContext.Request.Headers.TryGetValue(
                "Idempotence-Key",
                out StringValues idempotenceKeyValue) ||
            !Guid.TryParse(idempotenceKeyValue, out Guid idempotenceKey))
        {
            context.Result = new BadRequestObjectResult("Invalid or missing Idempotence-Key header");
            return;
        }

        IDistributedCache cache = context.HttpContext
            .RequestServices.GetRequiredService<IDistributedCache>();

        // Check if we already processed this request and return a cached response (if it exists)
        string cacheKey = $"Idempotent_{idempotenceKey}";
        string? cachedResult = await cache.GetStringAsync(cacheKey);
        if (cachedResult is not null)
        {
            IdempotentResponse response = JsonSerializer.Deserialize<IdempotentResponse>(cachedResult)!;

            var result = new ObjectResult(response.Value) { StatusCode = response.StatusCode };
            context.Result = result;

            return;
        }

        // Execute the request and cache the response for the specified duration
        ActionExecutedContext executedContext = await next();

        if (executedContext.Result is ObjectResult { StatusCode: >= 200 and < 300 } objectResult)
        {
            int statusCode = objectResult.StatusCode ?? StatusCodes.Status200OK;
            IdempotentResponse response = new(statusCode, objectResult.Value);

            await cache.SetStringAsync(
                cacheKey,
                JsonSerializer.Serialize(response),
                new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = _cacheDuration }
            );
        }
    }
}

internal sealed class IdempotentResponse
{
    [JsonConstructor]
    public IdempotentResponse(int statusCode, object? value)
    {
        StatusCode = statusCode;
        Value = value;
    }

    public int StatusCode { get; }
    public object? Value { get; }
}
```

::: note

There's a small [**race condition**](/milanjovanovic.tech/solving-race-conditions-with-ef-core-optimistic-locking.md) window between checking and setting the cache. For absolute consistency, we should consider using a distributed lock pattern, though this adds complexity and latency.

:::

Now, we can apply this attribute to our controller actions:

```cs{6} title="OrdersController.cs"
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpPost]
    [Idempotent(cacheTimeInMinutes: 60)]
    public IActionResult CreateOrder([FromBody] CreateOrderRequest request)
    {
        // Process the order...

        return CreatedAtAction(nameof(GetOrder), new { id = orderDto.Id }, orderDto);
    }
}
```

### Idempotency with Minimal APIs

To implement idempotency with Minimal APIs, we can use an `IEndpointFilter`.

```cs title="IdempotencyFilter.cs"
internal sealed class IdempotencyFilter(int cacheTimeInMinutes = 60)
    : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context,
        EndpointFilterDelegate next)
    {
        // Parse the Idempotence-Key header from the request
        if (TryGetIdempotenceKey(out Guid idempotenceKey))
        {
            return Results.BadRequest("Invalid or missing Idempotence-Key header");
        }

        IDistributedCache cache = context.HttpContext
            .RequestServices.GetRequiredService<IDistributedCache>();

        // Check if we already processed this request and return a cached response (if it exists)
        string cacheKey = $"Idempotent_{idempotenceKey}";
        string? cachedResult = await cache.GetStringAsync(cacheKey);
        if (cachedResult is not null)
        {
            IdempotentResponse response = JsonSerializer.Deserialize<IdempotentResponse>(cachedResult)!;
            return new IdempotentResult(response.StatusCode, response.Value);
        }

        object? result = await next(context);

        // Execute the request and cache the response for the specified duration
        if (result is IStatusCodeHttpResult { StatusCode: >= 200 and < 300 } statusCodeResult
            and IValueHttpResult valueResult)
        {
            int statusCode = statusCodeResult.StatusCode ?? StatusCodes.Status200OK;
            IdempotentResponse response = new(statusCode, valueResult.Value);

            await cache.SetStringAsync(
                cacheKey,
                JsonSerializer.Serialize(response),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(cacheTimeInMinutes)
                }
            );
        }

        return result;
    }
}

// We have to implement a custom result to write the status code
internal sealed class IdempotentResult : IResult
{
    private readonly int _statusCode;
    private readonly object? _value;

    public IdempotentResult(int statusCode, object? value)
    {
        _statusCode = statusCode;
        _value = value;
    }

    public Task ExecuteAsync(HttpContext httpContext)
    {
        httpContext.Response.StatusCode = _statusCode;

        return httpContext.Response.WriteAsJsonAsync(_value);
    }
}
```

Now, we can apply this endpoint filter to our Minimal API endpoint:

```cs{4}
app.MapPost("/api/orders", CreateOrder)
    .RequireAuthorization()
    .WithOpenApi()
    .AddEndpointFilter<IdempotencyFilter>();
```

An alternative to the previous two implementations is implementing idempotency logic in a custom middleware.

---

## Best Practices and Considerations

Here are the key things I always keep in mind when implementing idempotency.

Cache duration is tricky. I aim to cover reasonable retry windows without holding onto stale data. A reasonable cache time typically ranges from a few minutes to 24-48 hours, depending on your specific use case.

Concurrency can be a pain, especially in high-traffic APIs. A thread-safe implementation using a distributed lock works great. It keeps things in check when multiple requests hit at once. But this should be a rare occurrence.

For distributed setups, Redis is my go-to. It's perfect as a shared cache, keeping idempotency consistent across all your API instances. Plus, it handles distributed locking.

What if a client reuses an idempotency key with a different request body? I return an error in this case. My approach is to hash the request body and store it with the idempotency key. When a request comes in, I compare the request body hashes. If they differ, I return an error. This prevents misuse of idempotency keys and maintains the integrity of your API.

---

## Summary

Implementing idempotency in REST APIs enhances service reliability and consistency. It ensures identical requests yield the same result, preventing unintended duplicates and gracefully handling network issues.

While our implementation provides a foundation, I recommend adapting it to your needs. Focus on critical operations in your APIs, especially those that modify the system state or trigger important business processes.

By embracing idempotency, you're building more robust and user-friendly APIs.

That's all for today.

See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Implementing Idempotent REST APIs in ASP.NET Core",
  "desc": "Learn how to implement idempotency in ASP.NET Core Web APIs to improve reliability and prevent duplicate operations in distributed systems.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-idempotent-rest-apis-in-aspnetcore.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
