---
lang: en-US
title: "Global Error Handling in ASP.NET Core: From Middleware to Modern Handlers"
description: "Article(s) > Global Error Handling in ASP.NET Core: From Middleware to Modern Handlers"
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
      content: "Article(s) > Global Error Handling in ASP.NET Core: From Middleware to Modern Handlers"
    - property: og:description
      content: "Global Error Handling in ASP.NET Core: From Middleware to Modern Handlers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/global-error-handling-in-aspnetcore-from-middleware-to-modern-handlers.html
prev: /programming/cs/articles/README.md
date: 2025-07-12
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_150.png
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
  name="Global Error Handling in ASP.NET Core: From Middleware to Modern Handlers"
  desc="Learn How to handle errors globally in ASP.NET Core using middleware, IProblemDetailsService, and the new IExceptionHandler in .NET 8. This week's issue walks you through pragmatic approaches to error handling, with real-world tips for validation, chaining, and observability."
  url="https://milanjovanovic.tech/blog/global-error-handling-in-aspnetcore-from-middleware-to-modern-handlers"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_150.png"/>

Let's talk about something we all deal with but often put off until the last minute - error handling in our ASP.NET Core apps.

When something breaks in production, the last thing you want is a cryptic 500 error with zero context. Proper error handling isn't just about logging exceptions. It's about making sure your app fails gracefully and gives useful info to the caller (and you).

In this article, I'll walk through the main options for global error handling in ASP.NET Core.

We'll look at how I used to do it, what ASP.NET Core 9 offers now, and where each approach makes sense.

---

## Middleware-Based Error Handling

The classic way to catch unhandled exceptions is with custom [**middleware**](/milanjovanovic.tech/3-ways-to-create-middleware-in-asp-net-core.md). This is where most of us start, and honestly, it still works great for most scenarios.

```cs
internal sealed class GlobalExceptionHandlerMiddleware(
    RequestDelegate next,
    ILogger<GlobalExceptionHandlerMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception occurred");

            // Make sure to set the status code before writing to the response body
            context.Response.StatusCode = ex switch
            {
                ApplicationException => StatusCodes.Status400BadRequest,
                _ => StatusCodes.Status500InternalServerError
            };

            await context.Response.WriteAsJsonAsync(
                new ProblemDetails
                {
                    Type = ex.GetType().Name,
                    Title = "An error occured",
                    Detail = ex.Message
                });
        }
    }
}
```

Don't forget to add the middleware to the request pipeline:

```cs
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
```

This approach is solid and works everywhere in your pipeline. The beauty is its simplicity: wrap everything in a try-catch, log the error, and return a consistent response.

But once you start adding specific rules for different exception types (e.g. `ValidationException`, `NotFoundException`), this becomes a mess. You end up with long `if` / `else` chains or more abstractions to handle each exception type.

Plus, you're manually crafting JSON responses, which means you're probably not following [<FontIcon icon="fas fa-globe"/>RFC 9457 (Problem Details)](https://rfc-editor.org/rfc/rfc9457) standards.

---

## Enter IProblemDetailsService

Microsoft recognized this pain point and gave us `IProblemDetailsService` to standardize error responses. Instead of manually serializing our own error objects, we can use the built-in Problem Details format.

```cs{3,23-33} :collapsed-lines
internal sealed class GlobalExceptionHandlerMiddleware(
    RequestDelegate next,
    IProblemDetailsService problemDetailsService,
    ILogger<GlobalExceptionHandlerMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception occurred");

            // Make sure to set the status code before writing to the response body
            context.Response.StatusCode = ex switch
            {
                ApplicationException => StatusCodes.Status400BadRequest,
                _ => StatusCodes.Status500InternalServerError
            };

            await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
            {
                HttpContext = httpContext,
                Exception = exception,
                ProblemDetails = new ProblemDetails
                {
                    Type = exception.GetType().Name,
                    Title = "An error occured",
                    Detail = exception.Message
                }
            });
        }
    }
}
```

This is much cleaner. We're now using a standard format that API consumers expect, and we're not manually fiddling with JSON serialization. But we're still stuck with that growing switch statement problem. [**You can learn more about using Problem Details in .NET here**](/milanjovanovic.tech/problem-details-for-aspnetcore-apis.md).

---

## The Modern Way: IExceptionHandler

ASP.NET Core 8 introduced `IExceptionHandler`, and it's a game-changer. Instead of one massive middleware handling everything, we can create focused handlers for specific exception types.

Here's how it works:

```cs :collapsed-lines
internal sealed class GlobalExceptionHandler(
    IProblemDetailsService problemDetailsService,
    ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled exception occurred");

        httpContext.Response.StatusCode = exception switch
        {
            ApplicationException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };

        return await problemDetailsService.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = httpContext,
            Exception = exception,
            ProblemDetails = new ProblemDetails
            {
                Type = exception.GetType().Name,
                Title = "An error occured",
                Detail = exception.Message
            }
        });
    }
}
```

The key here is the return value. If your handler can deal with the exception, return `true`. If not, return `false` and let the next handler try.

Don't forget to register it with DI and the request pipeline:

```cs
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// And in your pipeline
app.UseExceptionHandler();
```

This approach is so much cleaner. Each handler has one job, and the code is easy to test and maintain.

---

## Chaining Exception Handlers

You can chain multiple [**exception handlers**](/milanjovanovic.tech/global-error-handling-in-aspnetcore-8.md) together, and they'll run in the order you register them. ASP.NET Core will use the first one that returns `true` from `TryHandleAsync`.

Example: One for validation errors, one global fallback.

```cs
builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
```

Let's say you're using [<FontIcon icon="fas fa-globe"/>`FluentValidation`](https://fluentvalidation.net/) (and you should be). Here's a complete setup:

```cs :collapsed-lines
internal sealed class ValidationExceptionHandler(
    IProblemDetailsService problemDetailsService,
    ILogger<ValidationExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (exception is not ValidationException validationException)
        {
            return false;
        }

        logger.LogError(exception, "Unhandled exception occurred");

        httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        var context = new ProblemDetailsContext
        {
            HttpContext = httpContext,
            Exception = exception,
            ProblemDetails = new ProblemDetails
            {
                Detail = "One or more validation errors occurred",
                Status = StatusCodes.Status400BadRequest
            }
        };

        var errors = validationException.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(
                g => g.Key.ToLowerInvariant(),
                g => g.Select(e => e.ErrorMessage).ToArray()
            );
        context.ProblemDetails.Extensions.Add("errors", errors);

        return await problemDetailsService.TryWriteAsync(context);
    }
}
```

And in your app, just throw like this:

```cs
// In your controller or service - IValidator<CreateUserRequest>
public async Task<IActionResult> CreateUser(CreateUserRequest request)
{
    await _validator.ValidateAndThrowAsync(request);

    // Your business logic here
}
```

The execution order is important. The framework will try each handler in the order you registered them. So put your most specific handlers first, and your catch-all handler last.

---

## Summary

We've come a long way from the days of manually crafting error responses in middleware. The evolution looks like this:

- [**Middleware**](/milanjovanovic.tech/3-ways-to-create-middleware-in-asp-net-core.md): Simple, works everywhere, but gets complex fast
- [**IProblemDetailsService**](/milanjovanovic.tech/problem-details-for-aspnetcore-apis.md): Standardizes response format, still manageable
- [**IExceptionHandler**](/milanjovanovic.tech/global-error-handling-in-aspnetcore-8.md): Modern, testable, and scales beautifully

For new projects, I'd go straight to `IExceptionHandler`. It's cleaner, more maintainable, and gives you the flexibility to handle different exception types exactly how you want.

The key takeaway? Don't let error handling be an afterthought. Set it up early, make it consistent, and your users (and your future self) will thank you when things inevitably go wrong.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Global Error Handling in ASP.NET Core: From Middleware to Modern Handlers",
  "desc": "Learn How to handle errors globally in ASP.NET Core using middleware, IProblemDetailsService, and the new IExceptionHandler in .NET 8. This week's issue walks you through pragmatic approaches to error handling, with real-world tips for validation, chaining, and observability.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/global-error-handling-in-aspnetcore-from-middleware-to-modern-handlers.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
