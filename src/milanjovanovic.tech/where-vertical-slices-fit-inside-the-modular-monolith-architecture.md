---
lang: en-US
title: "Where Vertical Slices Fit Inside the Modular Monolith Architecture"
description: "Article(s) > Where Vertical Slices Fit Inside the Modular Monolith Architecture"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Where Vertical Slices Fit Inside the Modular Monolith Architecture"
    - property: og:description
      content: "Where Vertical Slices Fit Inside the Modular Monolith Architecture"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/where-vertical-slices-fit-inside-the-modular-monolith-architecture.html
prev: /programming/cs/articles/README.md
date: 2026-02-21
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_182.png
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
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Where Vertical Slices Fit Inside the Modular Monolith Architecture"
  desc="Modular Monolith tells you how to split the system into modules. But it says nothing about how to organize code inside each module. Vertical Slice Architecture fills that gap, and the combination is incredibly powerful."
  url="https://milanjovanovic.tech/blog/where-vertical-slices-fit-inside-the-modular-monolith-architecture"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_182.png"/>

Most teams get the macro architecture right. They build a [**modular monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md) with clear module boundaries, [**public APIs**](/milanjovanovic.tech/internal-vs-public-apis-in-modular-monoliths.md), and proper [**data isolation**](/milanjovanovic.tech/modular-monolith-data-isolation.md).

But then they stop thinking about architecture. Every module gets the same internal structure, usually some form of layered architecture.

The thing is, [**Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) and [**Vertical Slice Architecture**](/milanjovanovic.tech/vertical-slice-architecture.md) aren't as far apart as people think. Both focus on use cases and maximizing cohesion. Clean Architecture just adds a rule for the direction of dependencies, which often leads to more abstractions and ceremony. My [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) approach takes a middle ground, and it's quite similar to VSA in nature.

The real question isn't which one is "better". It's where each one shines inside your modular monolith. And the beautiful part is: you can mix and match.

---

## Two Levels of Architecture

There are two architectural decisions you need to make when building a modular monolith:

1. **Macro architecture** - How do you decompose the system into modules? This covers module boundaries, [**communication patterns**](/milanjovanovic.tech/modular-monolith-communication-patterns.md), [**data isolation**](/milanjovanovic.tech/modular-monolith-data-isolation.md), public API design, and how modules are deployed.
2. **Micro architecture** - How do you organize code *inside* each module? This covers folder structure, the direction of dependencies, how you implement use cases, where validation lives, and how you access the database.

Most articles about modular monoliths focus entirely on the macro level. And for good reason. Getting **module boundaries** wrong is **expensive to fix**.

![Modular monolith.](https://milanjovanovic.tech/blogs/mnw_182/modular_monolith.png?imwidth=3840)

But the micro level is equally important. It determines how easy it is to add features, navigate code, and onboard new developers within a module. It's the architecture your team interacts with every day.

The key insight is this:

> The macro architecture constrains how modules interact. The micro architecture is a local decision each module can make independently.

Your `Ticketing` module doesn't have to follow the same internal structure as your `Notifications` module. The modular boundary gives you this freedom.

### Vertical Slices Are Not Modules

I've seen people conflate vertical slices with modules. On the macro level, a module can look like a "vertical slice" of the business domain. But that analogy breaks down at the application level.

A module is a bounded context. It owns its data, exposes a public API, and encapsulates a business capability. A vertical slice is a feature implementation pattern. It groups the request, handler, validation, and data access for a single use case.

Modules and vertical slices operate at different levels. Modules define the boundaries of the system. Vertical slices organize the code within those boundaries.

![Vertical slices.](https://milanjovanovic.tech/blogs/mnw_182/vertical_slices.png?imwidth=3840)

---

## Vertical Slices Inside a Module

[**Vertical Slice Architecture**](/milanjovanovic.tech/vertical-slice-architecture.md-structuring-vertical-slices.md) organizes code by feature instead of by technical layer. Each feature is a self-contained unit: request, handler, validation, data access, all in one place.

Inside a modular monolith module, this is a natural fit. The module boundary already enforces separation from the rest of the system. You don't need layers to protect you. The module's [**public API**](/milanjovanovic.tech/internal-vs-public-apis-in-modular-monoliths.md) does that.

Here's what a `Ticketing` module looks like with vertical slices using one file per feature:

```sh title="file structure"
📁 Modules/
|__ 📁 Ticketing
    |__ 📁 Features
        |__ 📁 AddItemToCart
            |__ #️⃣ AddItemToCart.cs
        |__ 📁 SubmitOrder
            |__ #️⃣ SubmitOrder.cs
        |__ 📁 GetOrder
            |__ #️⃣ GetOrder.cs
        |__ 📁 CancelOrder
            |__ #️⃣ CancelOrder.cs
        |__ 📁 RefundPayment
            |__ #️⃣ RefundPayment.cs
    |__ 📁 Data
        |__ #️⃣ TicketingDbContext.cs
    |__ 📁 Entities
        |__ #️⃣ Order.cs
        |__ #️⃣ Ticket.cs
    |__ #️⃣ ITicketingModule.cs
    |__ #️⃣ TicketingModule.cs
```

You can also use separate files per component if you prefer more granularity:

```sh title="file structure"
📁 Modules/
|__ 📁 Ticketing
    |__ 📁 Features
        |__ 📁 SubmitOrder
            |__ #️⃣ SubmitOrderRequest.cs
            |__ #️⃣ SubmitOrderResponse.cs
            |__ #️⃣ SubmitOrderHandler.cs
            |__ #️⃣ SubmitOrderValidator.cs
            |__ #️⃣ SubmitOrderEndpoint.cs
        |__ 📁 GetOrder
            |__ #️⃣ GetOrderRequest.cs
            |__ #️⃣ GetOrderResponse.cs
            |__ #️⃣ GetOrderHandler.cs
            |__ #️⃣ GetOrderEndpoint.cs
    |__ 📁 Data
    |__ 📁 Entities
    |__ #️⃣ ITicketingModule.cs
    |__ #️⃣ TicketingModule.cs
```

Both approaches keep everything for a feature in one folder. Compare this to having `Application`, `Domain`, and `Infrastructure` folders with dozens of files scattered across layers. The vertical slice version is flat, scannable, and easy to navigate.

Here's a concrete example using a static class to group the feature components:

```cs :collapsed-lines
public static class SubmitOrder
{
    public record Request(string CartId);
    public record Response(string OrderId, decimal Total);

    public class Validator : AbstractValidator<Request>
    {
        public Validator()
        {
            RuleFor(x => x.CartId).NotEmpty();
        }
    }

    public class Endpoint : IEndpoint
    {
        public void MapEndpoint(IEndpointRouteBuilder app)
        {
            app.MapPost("orders", Handler).WithTags("Ticketing");
        }

        public static async Task<IResult> Handler(
            Request request,
            IValidator<Request> validator,
            TicketingDbContext context)
        {
            var result = validator.Validate(request);
            if (!result.IsValid)
            {
                return Results.BadRequest(result.Errors);
            }

            var cart = await context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.Id == request.CartId);

            if (cart is null)
            {
                return Results.NotFound();
            }

            var order = Order.Create(cart);

            context.Orders.Add(order);
            await context.SaveChangesAsync();

            return Results.Ok(
                new Response(order.Id, order.Total));
        }
    }
}
```

Adding a new feature means adding a new folder. You're not touching shared code across layers. You're not worrying about side effects.

---

## Choosing the Internal Architecture

A common misconception is that VSA is only for simple modules and Clean Architecture is for complex ones. That's not how it works.

Vertical slices work great with rich domain models. You can have domain entities, value objects, and domain events inside a vertical slice. The slice organizes the entry point and orchestration. The domain model handles the business rules. As the slice grows in complexity, you [**push logic into the domain**](/milanjovanovic.tech/refactoring-from-an-anemic-domain-model-to-a-rich-domain-model.md) just like you would in Clean Architecture.

Similarly, [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) works well for simpler modules too. The structure is lightweight when the domain is simple.

So the decision isn't about complexity. It's about what your team is comfortable with and what gives you the most clarity.

Here are a few things I consider:

- **Team familiarity.** If your team already thinks in layers and dependency direction, Clean Architecture will feel natural. If they prefer organizing around features, VSA reduces friction.
- **Shared domain logic.** When many use cases share the same domain entities, having a dedicated `Domain` layer can make that sharing explicit. With VSA, you'd extract shared logic into a separate folder, which also works.
- **Independence of features.** When features are mostly independent and rarely share behavior, vertical slices keep things simple. Each feature is self-contained, and the mental model is straightforward.

The modular boundary protects the rest of the system regardless of what you choose inside the module. So pick what makes your team most productive and be willing to change as the module evolves.

---

## Takeaway

[**Modular Monolith**](/milanjovanovic.tech/what-is-a-modular-monolith) answers the macro question: how to decompose the system into modules with clear boundaries. [**Vertical Slice Architecture**](/milanjovanovic.tech/vertical-slice-architecture.md) answers the micro question: how to organize code by feature inside those modules.

They operate at different levels. Modular Monolith gives you high cohesion within each module and helps you manage coupling between modules. Vertical Slice Architecture gives you high cohesion within each feature inside a module.

You don't have to pick one internal architecture for the entire system. Each module can choose what works best for its context. Some modules will use [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md). Others will use vertical slices. A well-defined module boundary makes this safe.

If you want to see how I build modular monoliths with this approach, check out [**Modular Monolith Architecture**](/milanjovanovic.tech//modular-monolith-architecture).

See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Where Vertical Slices Fit Inside the Modular Monolith Architecture",
  "desc": "Modular Monolith tells you how to split the system into modules. But it says nothing about how to organize code inside each module. Vertical Slice Architecture fills that gap, and the combination is incredibly powerful.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/where-vertical-slices-fit-inside-the-modular-monolith-architecture.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
