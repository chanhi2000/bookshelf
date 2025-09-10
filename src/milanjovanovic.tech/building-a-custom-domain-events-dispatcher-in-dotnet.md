---
lang: en-US
title: "Building a Custom Domain Events Dispatcher in .NET"
description: "Article(s) > Building a Custom Domain Events Dispatcher in .NET"
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
      content: "Article(s) > Building a Custom Domain Events Dispatcher in .NET"
    - property: og:description
      content: "Building a Custom Domain Events Dispatcher in .NET"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-a-custom-domain-events-dispatcher-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2025-05-24
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_143.png
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
  name="Building a Custom Domain Events Dispatcher in .NET"
  desc="Learn how to build a lightweight, in-process domain events dispatcher in .NET without external dependencies. We'll explore the trade-offs between immediate consistency and coupling while implementing a strongly-typed solution from scratch."
  url="https://milanjovanovic.tech/blog/building-a-custom-domain-events-dispatcher-in-dotnet"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_143.png"/>

Domain events are a powerful way to decouple parts of your system. Instead of tightly coupling your logic, you can publish events and have other parts of your code subscribe to those events. This pattern is especially valuable in [<VPIcon icon="fa-brands fa-wikipedia-w"/>Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) (DDD) where business logic should remain focused and cohesive.

In this article, we'll walk through how to implement a lightweight, custom domain event dispatcher in .NET. The core dispatching logic should not depend on third-party libraries.

::: info We'll cover:

- Why you might want to use publish-subscribe in your application
- How to define basic domain event abstractions
- How to implement and register handlers
- How to build a domain events dispatcher
- Trade-offs and when to consider other options

:::

Let's get started.

---

## Why Domain Events Matter

Before diving into implementation, let's understand the problem domain events solve. Consider this tightly coupled code:

```cs title="UserService.cs"
public class UserService
{
    public async Task RegisterUser(string email, string password)
    {
        var user = new User(email, password);
        await _userRepository.SaveAsync(user);
        
        // Directly coupled to email service
        await _emailService.SendWelcomeEmail(user.Email);
        
        // Directly coupled to analytics
        await _analyticsService.TrackUserRegistration(user.Id);
        
        // What if we need to add more features?
        // This method will keep growing...
    }
}
```

With domain events, we can decouple this:

```cs title="UserService.cs"
public class UserService
{
    public async Task RegisterUser(string email, string password)
    {
        var user = new User(email, password);
        await _userRepository.SaveAsync(user);
        
        // Publish event - let other parts of the system react
        await _domainEventsDispatcher.DispatchAsync(
            [new UserRegisteredDomainEvent(user.Id, user.Email)]);
    }
}
```

Now the `UserService` focuses solely on user registration, while other concerns are handled through event handlers.

---

## Basic Abstractions

Let's start by defining two simple interfaces that form the foundation of our event system:

```cs title="IDomainEvent.cs"
// Marker interface for all domain events.
public interface IDomainEvent
{
    // We could add common properties here like:
    // DateTime OccurredAt { get; }
    // Guid EventId { get; }
}
```

```cs title="IDomainEventHandler.cs"
// Generic interface for handling domain events.
public interface IDomainEventHandler<in T> where T : IDomainEvent
{
    Task Handle(T domainEvent, CancellationToken cancellationToken = default);
}
```

This design gives us type safety through generic constraints while keeping publishers and handlers completely decoupled. You can add new events or handlers without touching existing code, and everything remains easily testable in isolation.

---

## Implementing Sample Handlers

Let's add some sample handlers that demonstrate how different parts of your system can react to the same event:

```cs title="SendWelcomeEmailHandler.cs"
// Handles sending welcome emails when users register
internal sealed class SendWelcomeEmailHandler(IEmailService emailService) 
    : IDomainEventHandler<UserRegisteredDomainEvent>
{
    public async Task Handle(
        UserRegisteredDomainEvent domainEvent,
        CancellationToken cancellationToken = default)
    {
        // Send welcome email
        var welcomeEmail = new WelcomeEmail(domainEvent.Email, domainEvent.UserId);

        await emailService.SendAsync(welcomeEmail, cancellationToken);
    }
}
```

```cs title="TrackUserRegistrationHandler.cs"
// Handles analytics tracking for new user registrations
internal sealed class TrackUserRegistrationHandler(IAnalyticsService analyticsService) 
    : IDomainEventHandler<UserRegisteredDomainEvent>
{
    public async Task Handle(
        UserRegisteredDomainEvent domainEvent,
        CancellationToken cancellationToken = default)
    {
        // Track registration in analytics
        await analyticsService.TrackEvent(
            "user_registered",
            new
            {
                user_id = domainEvent.UserId,
                registration_date = domainEvent.RegisteredAt
            },
            cancellationToken);
    }
}
```

To make this work, we need to register our handlers with the DI container.

Here's how to do it manually:

```cs title="Program.cs or Startup.cs"
services.AddScoped<IDomainEventHandler<UserRegisteredDomainEvent>, SendWelcomeEmailHandler>();
services.AddScoped<IDomainEventHandler<UserRegisteredDomainEvent>, TrackUserRegistrationHandler>();
```

Or you can automate this registration using [**assembly scanning with Scrutor**](/milanjovanovic.tech/improving-aspnetcore-dependency-injection-with-scrutor):

```cs
services.Scan(scan => scan.FromAssembliesOf(typeof(DependencyInjection))
    .AddClasses(classes => classes.AssignableTo(typeof(IDomainEventHandler<>)), publicOnly: false)
    .AsImplementedInterfaces()
    .WithScopedLifetime());
```

The important thing is that multiple handlers can react to the same event.

---

## The Dispatcher (Strongly Typed)

Now we need something to orchestrate calling the handlers. The dispatcher will take the domain events and call the appropriate handlers for each event.

```cs title="IDomainEventsDispatcher.cs"
public interface IDomainEventsDispatcher
{
    Task DispatchAsync(
        IEnumerable<IDomainEvent> domainEvents,
        CancellationToken cancellationToken = default);
}
```

```cs{27,29} :collapsed-lines title="DomainEventsDispatcher.cs"
internal sealed class DomainEventsDispatcher(IServiceProvider serviceProvider)
    : IDomainEventsDispatcher
{
    private static readonly ConcurrentDictionary<Type, Type> HandlerTypeDictionary = new();
    private static readonly ConcurrentDictionary<Type, Type> WrapperTypeDictionary = new();

    public async Task DispatchAsync(
        IEnumerable<IDomainEvent> domainEvents,
        CancellationToken cancellationToken = default)
    {
        foreach (IDomainEvent domainEvent in domainEvents)
        {
            using IServiceScope scope = serviceProvider.CreateScope();

            Type domainEventType = domainEvent.GetType();

            Type handlerType = HandlerTypeDictionary.GetOrAdd(
                domainEventType,
                et => typeof(IDomainEventHandler<>).MakeGenericType(et));

            IEnumerable<object?> handlers = scope.ServiceProvider.GetServices(handlerType);

            foreach (object? handler in handlers)
            {
                if (handler is null) continue;

                var handlerWrapper = HandlerWrapper.Create(handler, domainEventType);

                await handlerWrapper.Handle(domainEvent, cancellationToken);
            }
        }
    }

    // Abstract base class for strongly-typed handler wrappers
    private abstract class HandlerWrapper
    {
        public abstract Task Handle(IDomainEvent domainEvent, CancellationToken cancellationToken);

        public static HandlerWrapper Create(object handler, Type domainEventType)
        {
            Type wrapperType = WrapperTypeDictionary.GetOrAdd(
                domainEventType,
                et => typeof(HandlerWrapper<>).MakeGenericType(et));

            return (HandlerWrapper)Activator.CreateInstance(wrapperType, handler)!;
        }
    }

    // Generic wrapper that provides strong typing for handler invocation
    private sealed class HandlerWrapper<T>(object handler) : HandlerWrapper where T : IDomainEvent
    {
        private readonly IDomainEventHandler<T> _handler = (IDomainEventHandler<T>)handler;

        public override async Task Handle(
            IDomainEvent domainEvent,
            CancellationToken cancellationToken)
        {
            await _handler.Handle((T)domainEvent, cancellationToken);
        }
    }
}
```

The dispatcher uses a wrapper to eliminate reflection during handler execution while maintaining type safety. When we encounter a `UserRegisteredDomainEvent`, we create a `HandlerWrapper<UserRegisteredDomainEvent>` that holds a strongly-typed reference to `IDomainEventHandler<UserRegisteredDomainEvent>`. The wrapper casts the generic `IDomainEvent` to the specific event type at runtime, but the actual handler invocation uses compile-time types.

This gives us the performance benefits of avoiding reflection in the hot path (handler execution) while only using reflection once during wrapper creation. The trade-off is additional complexity, but the performance gain is significant if you're dispatching many events.

Don't forget to register the dispatcher with DI:

```cs
services.AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher>();
```

::: tip Usage Example

Here's how to use the domain events dispatcher in your application:

```cs title="UserController.cs"
public class UserController(
    IUserService userService, 
    IDomainEventsDispatcher domainEventsDispatcher) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserRequest request)
    {
        try
        {
            // Create the user
            var user = await userService.CreateUserAsync(request.Email, request.Password);
            
            // Publish the domain event
            var userRegisteredEvent = new UserRegisteredDomainEvent(user.Id, user.Email);

            await domainEventsDispatcher.DispatchAsync([userRegisteredEvent]);
            
            return Ok(new { UserId = user.Id, Message = "User registered successfully" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }
}
```

:::

You could also [**integrate domain events directly into your domain entities**](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md).

---

## Limitations and Tradeoffs

This implementation runs entirely in-process, which has important implications. All handlers execute synchronously within the same request context, but each gets its own DI scope. This means:

- **Immediate feedback**: If any handler fails, the exception bubbles up to the caller immediately. No silent failures or eventual consistency surprises.
- **Caller control**: The code that dispatches events decides how to handle failures — rollback transactions, retry operations, or continue despite errors. The dispatcher doesn't make these decisions for you.
- **Reliability concerns**: If the process crashes after some handlers succeed but before others complete, there's no automatic recovery. Events aren't persisted or retried.

For critical side effects that can't be lost, consider the [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md). Instead of dispatching events immediately, store them alongside your business data in the same transaction. A background service can later retry failed events, ensuring nothing gets lost. This decouples reliability from performance — your main operation completes quickly while events are processed reliably in the background.

---

## Wrapping Up

Domain events are a powerful pattern for decoupling business logic, and you don't need a heavyweight framework to use them effectively. The implementation we've built here provides a solid foundation that you can extend as your needs grow.

The beauty of rolling your own solution is that you understand every piece, making debugging and customization straightforward. This pattern fits excellently in [**Domain-Driven Design**](/milanjovanovic.tech/ddd-refactoring/README.md) and [**Clean Architecture**](/milanjovanovic.tech/pragmatic-clean-architecture/README.md) systems where decoupling business logic is crucial.

For systems requiring bulletproof reliability or cross-service communication, invest in proper message infrastructure. But for many applications, this simple approach hits the sweet spot between coupling and complexity.

The key insight is understanding your trade-offs upfront rather than discovering them in production. Start simple, measure what matters, and evolve based on real requirements.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Custom Domain Events Dispatcher in .NET",
  "desc": "Learn how to build a lightweight, in-process domain events dispatcher in .NET without external dependencies. We'll explore the trade-offs between immediate consistency and coupling while implementing a strongly-typed solution from scratch.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-a-custom-domain-events-dispatcher-in-dotnet.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
