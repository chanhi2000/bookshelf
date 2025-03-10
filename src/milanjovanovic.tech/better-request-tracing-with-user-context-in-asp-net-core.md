---
lang: en-US
title: "Better Request Tracing with User Context in ASP.NET Core"
description: "Article(s) > Better Request Tracing with User Context in ASP.NET Core"
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
      content: "Article(s) > Better Request Tracing with User Context in ASP.NET Core"
    - property: og:description
      content: "Better Request Tracing with User Context in ASP.NET Core"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/better-request-tracing-with-user-context-in-asp-net-core.html
prev: /programming/cs/articles/README.md
date: 2025-03-08
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_132.png
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
  name="Better Request Tracing with User Context in ASP.NET Core"
  desc="Adding user context to request tracing in ASP.NET Core helps track issues and understand user behavior. This article shows how to implement middleware that enriches logs with user IDs for better troubleshooting and performance monitoring."
  url="https://milanjovanovic.tech/blog/better-request-tracing-with-user-context-in-asp-net-core"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_132.png"/>

When building web applications, knowing what's happening behind the scenes is crucial. In ASP.NET Core, we can make our lives easier by adding user context to our request tracing. This helps us track issues, understand user behavior, and improve our applications.

Let me show you how to enhance your request tracing by adding user context in ASP.NET Core applications.

---

## Why Add User Context to Request Tracing?

When something goes wrong in your application, having the user's ID in your logs makes it much easier to figure out what happened. Instead of searching through thousands of log entries, you can filter by user ID and see only the relevant logs.

Adding user context also helps with:

- Tracking user journeys through your application
- Identifying patterns in user behavior
- Troubleshooting issues for specific users
- Monitoring performance for different user segments

---

## Implementing User Context Enrichment

The core of our solution is a middleware component that extracts the user ID from the current user's claims and adds it to the current **activity** and **logging scope**.

A **logging scope** in ASP.NET Core lets you attach additional data to all log messages created within that scope. [**Structured logging**](/milanjovanovic.tech/structured-logging-in-asp-net-core-with-serilog.md) frameworks like [**Serilog**](/milanjovanovic.tech/5-serilog-best-practices-for-better-structured-logging.md) and the built-in logger support this feature. For example, if you add a user ID to a logging scope, every log message within that scope will include that user ID, even if the log message itself doesn't mention the user. This makes it easy to correlate logs for a specific user across different parts of your application.

The `Activity` class is part of the .NET diagnostics infrastructure. It represents a unit of work or operation and is designed for distributed tracing across service boundaries. When you add a tag to `Activity.Current`, that information becomes part of the trace and can be used to filter and analyze requests in your monitoring systems.

Here's the code:

```cs :collapsed-lines
using System.Diagnostics;
using System.Security.Claims;

namespace MyApp.Middleware;

public sealed class UserContextEnrichmentMiddleware(
    RequestDelegate next,
    ILogger<UserContextEnrichmentMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        string? userId = context.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is not null)
        {
            Activity.Current?.SetTag("user.id", userId);

            var data = new Dictionary<string, object>
            {
                ["UserId"] = userId
            };

            using (logger.BeginScope(data))
            {
                await next(context);
            }
        }
        else
        {
            await next(context);
        }
    }
}
```

Let's break down what this middleware does:

1. It extracts the user ID from the authenticated user's claims using `context.User?.FindFirstValue(ClaimTypes.NameIdentifier)`
2. If a user ID is found, it adds the ID as a tag to the current activity with `Activity.Current?.SetTag("user.id", userId)`
3. It creates a logging scope using `ILogger.BeginScope` with the user ID, which means all log entries within this scope will include the user ID
4. It calls the next middleware in the pipeline
5. If no user ID is found (for anonymous requests), it simply calls the next middleware

---

## Logging Scopes and OpenTelemetry

If you're using [**OpenTelemetry**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md) to export logs, you have to configure the provider to include the log scopes on the generated log records.

Here's how:

```cs
builder.Logging.AddOpenTelemetry(options =>
{
    options.IncludeScopes = true;
    options.IncludeFormattedMessage = true;
});
```

---

## Adding the Middleware to Your Application

To use this [**middleware**](/milanjovanovic.tech/3-ways-to-create-middleware-in-asp-net-core.md) in your ASP.NET Core application, add it to your pipeline in the `Program.cs` file:

```cs
app.UseAuthentication();
app.UseAuthorization();

// Add the user context enrichment middleware after authentication
app.UseMiddleware<UserContextEnrichmentMiddleware>();

app.MapControllers();

app.Run();
```

Make sure to place it after the authentication and authorization middleware so that the user identity is available.

---

## Handling PII Concerns

When adding user IDs to your logs and traces, you need to be careful about [<FontIcon icon="fa-brands fa-wikipedia-w"/>Personally Identifiable Information](https://en.wikipedia.org/wiki/Personal_data) (PII). Here are some important points to consider:

- User IDs should be opaque identifiers (like GUIDs) that don't reveal personal information
- Avoid logging email addresses, names, or other personal data
- Make sure your logging configuration doesn't send PII to systems where it shouldn't go

If you need to comply with data protection regulations, consider implementing log retention policies and the ability to purge user data from logs when needed.

---

## Expanding Context Enrichment

User IDs are just the beginning. We can add more context to make our logs and traces even more useful:

### Feature Flags

[**Feature flags**](/milanjovanovic.tech/feature-flags-in-dotnet-and-how-i-use-them-for-ab-testing.md) help us roll out new features gradually or enable them for specific users. Adding feature flag information to our context gives us valuable insights:

```cs
// Inside the middleware
if (featureFlagService.IsEnabled("NewFeature", userId))
{
    Activity.Current?.SetTag("features.newfeature", "enabled");
    // Add to logging scope as well
}
```

### Tenant Information for Multi-tenant Applications

If your application serves [**multiple tenants**](/milanjovanovic.tech/multi-tenant-applications-with-ef-core.md), adding tenant IDs is extremely helpful:

```cs
string? tenantId = context.User?.FindFirstValue("TenantId");
if (tenantId is not null)
{
    Activity.Current?.SetTag("tenant.id", tenantId);
    // Add to logging scope
}
```

---

## Takeaway

Adding user context to your request tracing in ASP.NET Core is a simple but powerful technique. By implementing the middleware we've explored, you'll see several important benefits:

1. Faster troubleshooting - when users report issues, you can quickly find relevant logs
2. Better understanding of usage patterns - see which features are being used and by whom
3. Improved performance monitoring - identify slow requests for specific user segments
4. More effective A/B testing - track metrics for users with different feature flags

Understanding logging scopes and the `Activity` class helps you get the most out of this technique. Logging scopes ensure your log entries contain consistent contextual information, while activities enable distributed tracing across service boundaries. Remember to be careful with PII and make sure your logging practices comply with relevant regulations.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Better Request Tracing with User Context in ASP.NET Core",
  "desc": "Adding user context to request tracing in ASP.NET Core helps track issues and understand user behavior. This article shows how to implement middleware that enriches logs with user IDs for better troubleshooting and performance monitoring.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/better-request-tracing-with-user-context-in-asp-net-core.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
