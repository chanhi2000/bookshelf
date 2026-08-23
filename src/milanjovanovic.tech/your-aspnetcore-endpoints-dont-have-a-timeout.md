---
lang: en-US
title: "Your ASP.NET Core Endpoints Don't Have a Timeout"
description: "Article(s) > Your ASP.NET Core Endpoints Don't Have a Timeout"
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
      content: "Article(s) > Your ASP.NET Core Endpoints Don't Have a Timeout"
    - property: og:description
      content: "Your ASP.NET Core Endpoints Don't Have a Timeout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/your-aspnetcore-endpoints-dont-have-a-timeout.html
prev: /programming/cs/articles/README.md
date: 2026-08-29
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_209.png
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
  name="Your ASP.NET Core Endpoints Don't Have a Timeout"
  desc="ASP.NET Core doesn't enforce an application timeout on incoming requests by default. The built-in middleware can add one, but it only cancels RequestAborted."
  url="https://milanjovanovic.tech/blog/your-aspnetcore-endpoints-dont-have-a-timeout"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_209.png"/>

ASP.NET Core request timeouts can be configured globally or per endpoint with the built-in middleware in .NET 8 and later. The middleware uses cooperative cancellation, so downstream work must observe `HttpContext.RequestAborted`.

ASP.NET Core does not apply an application timeout to incoming requests by default. The built-in request timeout middleware adds a deadline, but it only cancels `HttpContext.RequestAborted`. Your endpoint must pass that token into the work you want to stop.

A reverse proxy might return its own timeout first, but then it controls the deadline and response instead of your application.

A slow database query or stalled API call can keep consuming resources after its response is no longer useful. .NET 8 introduced [<VPIcon icon="fa-brands fa-microsoft"/>request timeout middleware](https://learn.microsoft.com/en-us/aspnet/core/performance/timeouts) to give request processing a cooperative deadline.

Let's wire it up.

---

## Add a Timeout to the Endpoint

Register the middleware and apply a three-second timeout in `Program.cs`:

```cs{3,7,10,12-14,18}
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRequestTimeouts();

var app = builder.Build();

app.UseRequestTimeouts();

app.MapGet("/reports", async (
    CancellationToken cancellationToken) =>
{
    await Task.Delay(
        TimeSpan.FromSeconds(10),
        cancellationToken);

    return Results.Ok("Ready");
})
.WithRequestTimeout(TimeSpan.FromSeconds(3));

app.Run();
```

`AddRequestTimeouts` only registers the required services. It does not configure a limit by itself.

`WithRequestTimeout` gives this endpoint three seconds. Minimal APIs bind the `CancellationToken` parameter to `HttpContext.RequestAborted`.

After three seconds, `Task.Delay` observes cancellation and throws. If that exception reaches the middleware before the response starts, the default response is an empty `504 Gateway Timeout`.

Test this without an attached debugger because the timeout does not trigger while a debugger is attached.

---

## The Token Has to Reach the Work

The middleware does not abort a thread or call `HttpContext.Abort()`. It cancels a token and keeps waiting for the endpoint.

Remove `cancellationToken` from the `Task.Delay` call above and the handler waits the full ten seconds before returning `200 OK`. There is no immediate `504` because no cancellation exception reaches the middleware.

A trace-style span waterfall makes the difference visible:

![A trace-style span waterfall compares delayed work that observes RequestAborted and stops around the three-second deadline with work that ignores cancellation and returns 200 after ten seconds](https://milanjovanovic.tech/blogs/mnw_209/timeout_trace_waterfall.png)

The same rule applies to real dependencies. Pass the token through your application service and into [<VPIcon icon="fa-brands fa-microsoft"/>EF Core](https://learn.microsoft.com/en-us/ef/core/miscellaneous/async):

```cs{3,7-9}
public Task<Order?> GetByIdAsync(
    Guid id,
    CancellationToken cancellationToken)
{
    return dbContext.Orders
        .AsNoTracking()
        .SingleOrDefaultAsync(
            order => order.Id == id,
            cancellationToken);
}
```

EF Core forwards the token to the database provider, which decides whether the operation can be canceled. The token has to cross every boundary before the provider can see it:

![The request timeout middleware cancels RequestAborted, which is passed through the endpoint, application service, and EF Core before the database provider can attempt to cancel the query](https://milanjovanovic.tech/blogs/mnw_209/cancellation_propagation.png)

Pass it into [**HttpClient**](/milanjovanovic.tech/the-right-way-to-use-httpclient-in-dotnet.md), messaging clients, and other asynchronous work where abandoning the operation is safe.

The same token is canceled when the client disconnects. Flowing it through the entire call chain matters even before you add a timeout. When a dependency honors cancellation, timed-out work stops instead of piling up under load.

---

## Choose Timeouts Per Endpoint

Not every endpoint should share the same limit. A small API read and a report export have different latency budgets, so give them different policies.

Replace the parameterless registration with named policies, then attach each one when mapping the endpoint:

```cs{3-4,8,11,14}
builder.Services.AddRequestTimeouts(options =>
{
    options.AddPolicy("api-read", TimeSpan.FromSeconds(3));
    options.AddPolicy("report-export", TimeSpan.FromSeconds(30));
});

app.MapGet("/orders/{id:guid}", GetOrder)
    .WithRequestTimeout("api-read");

app.MapGet("/reports/{id:guid}", ExportReport)
    .WithRequestTimeout("report-export");

app.MapGet("/events", StreamEvents)
    .DisableRequestTimeout();
```

Small reads get three seconds, report exports get 30 seconds, and the streaming endpoint opts out.

[**Server-Sent Events**](/milanjovanovic.tech/server-sent-events-in-aspnetcore-and-dotnet-10.md), WebSockets, long polling, and large uploads usually need a longer policy or `.DisableRequestTimeout()`. Once a streaming response starts, the middleware cannot replace it with a clean `504`.

If an operation genuinely needs minutes, return `202 Accepted` and finish it in the background, as described in [**scaling long-running API requests**](/milanjovanovic.tech/how-to-scale-long-running-api-requests.md).

---

## Summary

A `504` from the middleware tells you that cancellation reached it. It does not prove that every downstream operation stopped.

Start with one endpoint that calls EF Core or `HttpClient`. Set a realistic limit and force a slow call past it without a debugger attached. Use logs or a trace to verify that the dependency observed cancellation.

Thanks for reading.

And stay awesome!

---

## Frequently Asked Questions

::: details Does ASP.NET Core have a default request timeout?

ASP.NET Core has no default application-level deadline for processing a request. Kestrel still has transport limits, and a reverse proxy may impose its own timeout, but you must configure an application timeout when endpoint execution needs a deadline.

:::

::: details How do you add a request timeout in ASP.NET Core?

On .NET 8 or later, call AddRequestTimeouts to register the services, add UseRequestTimeouts to the pipeline, and apply a duration or named policy with WithRequestTimeout. Registration alone does not set a timeout.

:::

::: details Does the request timeout middleware forcibly stop endpoint code?

No. The middleware cancels the token exposed through HttpContext.RequestAborted and continues waiting for the endpoint. Code that ignores cancellation can keep running and may eventually return a successful response.

:::

::: details What response does an ASP.NET Core request timeout return?

The default is an empty 504 Gateway Timeout when the timeout expires and an OperationCanceledException reaches the middleware before the response starts. If the endpoint catches or ignores cancellation, or has already started the response, the result can be different.

:::

::: details Why does a request timeout not fire while debugging?

The request timeout middleware does not trigger while a debugger is attached. Run the application without the debugger when verifying timeout behavior.

:::

::: details Should streaming endpoints disable request timeouts?

Streaming, Server-Sent Events, WebSockets, and long polling usually need a separate longer policy or an explicit opt-out with DisableRequestTimeout. After a response starts, the middleware cannot replace it with a 504.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Your ASP.NET Core Endpoints Don't Have a Timeout",
  "desc": "ASP.NET Core doesn't enforce an application timeout on incoming requests by default. The built-in middleware can add one, but it only cancels RequestAborted.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/your-aspnetcore-endpoints-dont-have-a-timeout.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
