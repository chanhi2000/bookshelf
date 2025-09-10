---
lang: en-US
title: "Stop Conflating CQRS and MediatR"
description: "Article(s) > Stop Conflating CQRS and MediatR"
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
      content: "Article(s) > Stop Conflating CQRS and MediatR"
    - property: og:description
      content: "Stop Conflating CQRS and MediatR"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/stop-conflating-cqrs-and-mediatr.html
prev: /programming/cs/articles/README.md
date: 2025-02-08
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_128.png
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
  name="Stop Conflating CQRS and MediatR"
  desc="The .NET ecosystem has gradually fused CQRS and MediatR together, creating a reflexive assumption that they're inseparable, but this mental shortcut has led teams down a path of unnecessary complexity. This article dispels common misconceptions by explaining how CQRS and MediatR are distinct tools solving different problems, and demonstrates how to implement CQRS effectively with or without MediatR."
  url="https://milanjovanovic.tech/blog/stop-conflating-cqrs-and-mediatr"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_128.png"/>

"We need to implement CQRS? Great, let me install MediatR."

If you've heard this in your development team - or perhaps said it yourself - you're not alone. The .NET ecosystem has gradually fused these two concepts together, creating an almost reflexive response: CQRS equals MediatR.

This mental shortcut has led countless teams down a path of unnecessary complexity. Others have avoided CQRS entirely, fearing the overhead of yet another messaging framework.

In this article, we'll dispel some common misconceptions and highlight the benefits of each pattern.

---

## Understanding CQRS in Its Pure Form

[<VPIcon icon="iconfont icon-microsoftazure"/>CQRS](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs) is a pattern that separates read and write operations in your application. The pattern suggests that the models used for reading data should be different from those used for writing data.

That's it.

No specific implementation details, no prescribed libraries, just a simple architectural principle.

The pattern emerged from the understanding that in many applications, especially those with complex domains, the requirements for reading and writing data are fundamentally different. Read operations often need to combine data from multiple sources or present it in specific formats for UI consumption. Write operations need to enforce business rules, maintain consistency, and manage domain state.

This separation provides several benefits:

- Optimized read and write models for their specific purposes
- Simplified maintenance as read and write concerns evolve independently
- Enhanced scalability options for read and write operations
- Clearer boundary between domain logic and presentation needs

---

## MediatR: A Different Tool for Different Problems

[<VPIcon icon="iconfont icon-github"/>`jbogard/MediatR`](https://github.com/jbogard/MediatR) is an implementation of the mediator pattern. Its primary purpose is to reduce direct dependencies between components by providing a central point of communication. Instead of knowing about each other, the mediator connects the components.

The library provides several features:

- In-process messaging between components
- Behavior pipelines for [**cross-cutting concerns**](/milanjovanovic.tech/balancing-cross-cutting-concerns-in-clean-architecture.md)
- [**Notification handling**](/milanjovanovic.tech/how-to-publish-mediatr-notifications-in-parallel.md) (publish/subscribe)

The indirection MediatR introduces is its most criticized aspect. It can make code harder to follow, especially for newcomers to the codebase. However, you can easily solve this problem by defining the requests in the same file as the handler.

---

## Why They Often Appear Together

The frequent pairing of CQRS and MediatR isn't without reason. MediatR's [**request/response model**](/milanjovanovic.tech/vertical-slice-architecture.md) aligns well with CQRS's command/query separation. Commands and queries can be implemented as MediatR requests, with handlers containing the actual implementation logic.

Here's an example command using MediatR:

```cs title="CreateHabit.cs"
public record CreateHabit(string Name, string? Description, int Priority) : IRequest<HabitDto>;

public sealed class CreateHabitHandler(ApplicationDbContext dbContext, IValidator<CreateHabit> validator)
    : IRequestHandler<CreateHabit, HabitDto>
{
    public async Task<HabitDto> Handle(CreateHabit request, CancellationToken cancellationToken)
    {
        await validator.ValidateAndThrowAsync(createHabitDto);

        Habit habit = createHabitDto.ToEntity();

        dbContext.Habits.Add(habit);

        await dbContext.SaveChangesAsync(cancellationToken);

        return habit.ToDto();
    }
}
```

[**CQRS with MediatR**](/milanjovanovic.tech/cqrs-pattern-with-mediatr.md) offers several advantages:

- Consistent handling of both commands and queries
- Pipeline behaviors for logging, validation, and error handling
- Clear separation of concerns through handler classes
- Simplified testing through handler isolation

However, this convenience comes at the cost of additional abstraction and complexity. We have to define the request/response classes and handlers, write code for sending the requests, and so on. This can be overkill for simple applications.

The question isn't whether this trade-off is universally good or bad but whether it's appropriate for your specific context.

---

## CQRS Without MediatR

CQRS can be implemented just as easily without MediatR. Here's a simple example of what it might look like.

You can define commands and queries as simple interfaces:

```cs title="ICommandHandler.cs"
public interface ICommandHandler<in TCommand, TResult>
{
    Task<TResult> Handle(TCommand command, CancellationToken cancellationToken = default);
}

// Same thing for IQueryHandler
```

Then, you can implement your handlers and register them with dependency injection:

```cs :collapsed-lines title="CreateOrderCommand.cs"
public record CreateOrderCommand(string CustomerId, List<OrderItem> Items)
    : ICommand<CreateOrderResult>;

public class CreateOrderCommandHandler : ICommandHandler<CreateOrderCommand, CreateOrderResult>
{
    public async Task<CreateOrderResult> Handle(
        CreateOrderCommand command,
        CancellationToken cancellationToken = default)
    {
        // implementation
    }
}

// DI registration...
builder.Services
    .AddScoped<ICommandHandler<CreateOrderCommand, CreateOrderResult>, CreateOrderCommandHandler>();
```

Finally, you can use the handler in your controller:

```cs title="OrdersController.cs"
[ApiController]
[Route("orders")]
public class OrdersController : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<CreateOrderResult>> CreateOrder(
        CreateOrderCommand command,
        ICommandHandler<CreateOrderCommand, CreateOrderResult> handler)
    {
        var result = await handler.Handle(command);

        return Ok(result);
    }
}
```

What's the difference between this and the MediatR approach?

This approach provides the same separation of concerns but without the indirection. It's direct, explicit, and often sufficient for many applications.

However, it lacks some of the conveniences that MediatR offers, such as pipeline behaviors and automatically registering handlers. You also need to inject the specific handlers into your controllers, which can be cumbersome for larger applications.

---

## Takeaway

CQRS and MediatR are distinct tools that solve different problems. While they can work well together, treating them as inseparable does a disservice to both. CQRS separates read and write concerns, while MediatR decouples components through a mediator.

The key is understanding what each pattern offers and making informed decisions based on your specific context. Sometimes, you'll want both, sometimes just one, and sometimes neither. That's the essence of thoughtful architecture: choosing the right tools for your specific needs.

If you want to learn more about implementing CQRS effectively as part of a clean, maintainable architecture, check out [**Pragmatic Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md). You'll learn how to apply these patterns in real-world scenarios, avoiding common pitfalls and over-engineering while building scalable applications.

That's all for today. Hope this was helpful.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop Conflating CQRS and MediatR",
  "desc": "The .NET ecosystem has gradually fused CQRS and MediatR together, creating a reflexive assumption that they're inseparable, but this mental shortcut has led teams down a path of unnecessary complexity. This article dispels common misconceptions by explaining how CQRS and MediatR are distinct tools solving different problems, and demonstrates how to implement CQRS effectively with or without MediatR.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/stop-conflating-cqrs-and-mediatr.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
