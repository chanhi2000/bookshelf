---
lang: en-US
title: "Why I Switched to Primary Constructors for DI in C#"
description: "Article(s) > Why I Switched to Primary Constructors for DI in C#"
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
      content: "Article(s) > Why I Switched to Primary Constructors for DI in C#"
    - property: og:description
      content: "Why I Switched to Primary Constructors for DI in C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/why-i-switched-to-primary-constructors-for-di-in-csharp.html
prev: /programming/cs/articles/README.md
date: 2026-04-18
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_190.png
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
  name="Why I Switched to Primary Constructors for DI in C#"
  desc="I resisted primary constructors for a while. They felt like a shortcut that would cost me later. But after using them across several projects, I'm sold, with one important caveat. Here's what convinced me to switch, and the one pitfall you need to watch out for."
  url="https://milanjovanovic.tech/blog/why-i-switched-to-primary-constructors-for-di-in-csharp"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_190.png"/>

I'll be honest. I resisted primary constructors for a while.

When C# 12 extended them from `record` types to regular classes and structs, my first reaction was skepticism. An implicit mutable capture instead of explicit `readonly` fields? That felt like trading safety for convenience.

But after using them across several projects, I changed my mind. The boilerplate they eliminate in DI service classes is significant, and the pitfall I was worried about is manageable once you know about it.

Here's what convinced me to switch, and the one thing you need to watch out for.

---

## What Changed My Mind

Here's what my service classes used to look like:

```cs
public class OrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly ILogger<OrderService> _logger;

    public OrderService(
        IOrderRepository orderRepository,
        ILogger<OrderService> logger)
    {
        _orderRepository = orderRepository;
        _logger = logger;
    }

    public async Task<Order?> GetOrderAsync(Guid id)
    {
        _logger.LogInformation("Fetching order {OrderId}", id);

        return await _orderRepository.GetByIdAsync(id);
    }
}
```

And here's what they look like now:

```cs
public class OrderService(
    IOrderRepository orderRepository,
    ILogger<OrderService> logger)
{
    public async Task<Order?> GetOrderAsync(Guid id)
    {
        logger.LogInformation("Fetching order {OrderId}", id);

        return await orderRepository.GetByIdAsync(id);
    }
}
```

The field declarations, the constructor body, the assignments. All gone. The parameters are captured and available throughout the class body.

This is the most common use case for primary constructors: [**dependency injection**](/milanjovanovic.tech/improving-aspnetcore-dependency-injection-with-scrutor.md) in service classes. You declare what you need, and use it directly.

---

## Where I Use Them Most: DI Service Classes

The place where primary constructors sold me is ASP.NET Core service classes. This is where I spend most of my time, and the boilerplate savings add up fast.

Here's a more realistic example from a checkout flow:

```cs
public class CheckoutService(
    IPaymentProcessor paymentProcessor,
    IOrderRepository orderRepository,
    ILogger<CheckoutService> logger,
    IOptions<CheckoutOptions> options)
{
    public async Task<CheckoutResult> ProcessAsync(
        Cart cart,
        CancellationToken ct = default)
    {
        var settings = options.Value;

        if (cart.Total < settings.MinimumOrderAmount)
        {
            logger.LogWarning("Order below minimum: {Total}", cart.Total);
            return CheckoutResult.BelowMinimum;
        }

        var order = Order.Create(cart);

        await paymentProcessor.ChargeAsync(order, ct);
        await orderRepository.SaveAsync(order, ct);

        logger.LogInformation("Checkout complete for order {OrderId}", order.Id);

        return CheckoutResult.Success;
    }
}
```

Four dependencies, zero boilerplate. The class reads top-to-bottom without any noise.

This pattern works well because service classes typically don't need to validate or transform their dependencies. The DI container provides them, and you use them. Primary constructors are a perfect fit for this.

---

## Entity Construction (With a Caveat)

I also started using primary constructors for [**domain entities**](/milanjovanovic.tech/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model.md) and [**value objects**](/milanjovanovic.tech/value-objects-in-dotnet-ddd-fundamentals.md) where you want to enforce required parameters at construction time:

```cs
public class Order(Guid customerId, Money total)
{
    public Guid Id { get; } = Guid.NewGuid();
    public Guid CustomerId { get; } = customerId;
    public Money Total { get; } = total;
    public OrderStatus Status { get; private set; } = OrderStatus.Pending;
    public DateTime CreatedAt { get; } = DateTime.UtcNow;

    public void Confirm()
    {
        if (Status != OrderStatus.Pending)
        {
            throw new InvalidOperationException(
                $"Cannot confirm order in {Status} status.");
        }

        Status = OrderStatus.Confirmed;
    }
}
```

There's no way to create an `Order` without a `customerId` and `total`. The primary constructor makes this constraint visible at the type declaration level.

Notice the key difference from the service class pattern: here, I'm assigning primary constructor parameters to **properties with initializers** (`= customerId`). This is important, and it leads to the biggest pitfall.

---

## The Pitfall That Almost Stopped Me

This was the reason I held off for so long.

::: note

Primary constructor parameters are not `readonly` fields.

:::

When you use a primary constructor parameter directly in the class body (like we did in the service class), the compiler captures it as a **mutable variable**. There's no `readonly` backing field generated behind the scenes.

This means you can accidentally reassign a parameter:

```cs
public class OrderService(
    IOrderRepository orderRepository,
    ILogger<OrderService> logger)
{
    public async Task<Order?> GetOrderAsync(Guid id)
    {
        logger.LogInformation("Fetching order {OrderId}", id);

        return await orderRepository.GetByIdAsync(id);
    }

    public void SomeOtherMethod()
    {
        // This compiles. No warning. No error.
        orderRepository = null!;
        logger = null!;
    }
}
```

This compiles without any warning.

With a traditional constructor and `private readonly` fields, the compiler would stop you immediately. With primary constructors, it stays silent.

**If you need immutability guarantees**, explicitly assign the parameter to a `readonly` field:

```cs
public class OrderService(
    IOrderRepository orderRepository,
    ILogger<OrderService> logger)
{
    private readonly IOrderRepository _orderRepository = orderRepository;
    private readonly ILogger<OrderService> _logger = logger;

    public async Task<Order?> GetOrderAsync(Guid id)
    {
        _logger.LogInformation("Fetching order {OrderId}", id);

        return await _orderRepository.GetByIdAsync(id);
    }
}
```

But now you've lost most of the benefit of primary constructors. You're back to field declarations and assignments, just with a different syntax.

In practice, I've never actually hit this bug in a DI service class. You're unlikely to accidentally reassign `logger` in the middle of a method. But it **can** bite you in entity classes or value types where immutability actually matters. That's the one place where I still stay cautious.

---

## Where I Still Use Traditional Constructors

I haven't switched everything over. Here are the cases where I stick with the traditional approach:

**Complex validation logic.** If you need to validate parameters before assigning them, you need a constructor body:

```cs
public class EmailAddress
{
    private readonly string _value;

    public EmailAddress(string value)
    {
        if (string.IsNullOrWhiteSpace(value) || !value.Contains('@'))
        {
            throw new ArgumentException(
                "Invalid email address.", nameof(value));
        }

        _value = value;
    }
}
```

Primary constructors don't give you a place to put validation logic before the class body runs.

**Multiple constructor overloads.** Primary constructors support one constructor signature. If you need overloads, you'll have to chain secondary constructors with `this(...)`, which gets messy fast.

**Too many parameters.** Once you hit 5+ dependencies, the primary constructor line becomes hard to read. At that point, your class probably has too many responsibilities, and [**refactoring**](/milanjovanovic.tech/5-awesome-csharp-refactoring-tips.md) it is a better solution than formatting tricks.

---

## Summary

Here's what I've settled on after using primary constructors across several projects:

- I use **primary constructors** for all my **DI service classes**. The boilerplate savings are worth it.
- They're useful for **entity construction** when you want to enforce required parameters at the type level.
- Primary constructor parameters are **captured as mutable variables**, not `readonly` fields. This is the one thing you need to know.
- I'm not afraid of the mutable capture pitfall in service classes, because it's unlikely to cause real bugs in that context.
- I stick with **traditional constructors** for validation-heavy types, multiple overloads, or classes with too many dependencies

The switch was worth it. My service classes are shorter, easier to scan, and the pitfall is manageable with the right tooling.

That's all for today. See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why I Switched to Primary Constructors for DI in C#",
  "desc": "I resisted primary constructors for a while. They felt like a shortcut that would cost me later. But after using them across several projects, I'm sold, with one important caveat. Here's what convinced me to switch, and the one pitfall you need to watch out for.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/why-i-switched-to-primary-constructors-for-di-in-csharp.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
