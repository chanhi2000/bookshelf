---
lang: en-US
title: "CQRS Pattern the Way It Should've Been From the Start"
description: "Article(s) > CQRS Pattern the Way It Should've Been From the Start"
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
      content: "Article(s) > CQRS Pattern the Way It Should've Been From the Start"
    - property: og:description
      content: "CQRS Pattern the Way It Should've Been From the Start"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/cqrs-pattern-the-way-it-should-have-been-from-the-start.html
prev: /programming/cs/articles/README.md
date: 2025-05-17
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_142.png
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
  name="CQRS Pattern the Way It Should've Been From the Start"
  desc="Learn how to implement CQRS in .NET without relying on MediatR. This guide walks you through a lightweight setup using simple interfaces, decorators, and DI — no frameworks required."
  url="https://milanjovanovic.tech/blog/cqrs-pattern-the-way-it-should-have-been-from-the-start"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_142.png"/>

MediatR is going commercial.

[<FontIcon icon="fas fa-globe"/>Jimmy Bogard recently announced](https://jimmybogard.com/automapper-and-mediatr-going-commercial/) that MediatR will adopt a commercial license model for companies above a certain size.

For many teams, this is a trigger to re-evaluate their usage and possibly look for alternatives.

And it's not a bad time to do so. MediatR became almost synonymous with CQRS in .NET, despite the fact that [**CQRS and MediatR are not the same thing**](/milanjovanovic.tech/stop-conflating-cqrs-and-mediatr.md). Most projects use it as a thin dispatching layer for commands and queries — a use case that can be covered with a few straightforward abstractions.

::: info By removing MediatR, you gain:

- Full control over your CQRS infrastructure
- Predictable, explicit handler dispatching
- Simpler debugging and onboarding
- Cleaner DI setup and better testability

:::

In this article, I'll walk you through building a minimal CQRS setup with just a few interfaces and support for decorators. No hidden DI magic. Just clean, predictable code.

::: info We'll cover:

- Defining `ICommand`, `IQuery`, and handler contracts
- Adding support for decorators (logging, validation, etc.)
- Registering everything with DI
- A full working example in a real-world scenario

:::

Let's get started.

---

## Commands, Queries, and Handlers

Let's start by defining the basic contracts for commands and queries.

```cs title="ICommand.cs"
public interface ICommand;
public interface ICommand<TResponse>;
```

```cs title="IQuery.cs"
public interface IQuery<TResponse>;
```

These interfaces exist purely as markers. They allow us to structure application logic around intention — write operations go through `ICommand`, read operations through `IQuery`.

The handler interfaces follow the same model:

```cs title="ICommandHandler.cs"
public interface ICommandHandler<in TCommand>
    where TCommand : ICommand
{
    Task<Result> Handle(TCommand command, CancellationToken cancellationToken);
}

public interface ICommandHandler<in TCommand, TResponse>
    where TCommand : ICommand<TResponse>
{
    Task<Result<TResponse>> Handle(TCommand command, CancellationToken cancellationToken);
}
```

```cs title="IQueryHandler.cs"
public interface IQueryHandler<in TQuery, TResponse>
    where TQuery : IQuery<TResponse>
{
    Task<Result<TResponse>> Handle(TQuery query, CancellationToken cancellationToken);
}
```

These are nearly identical to MediatR's `IRequest` and `IRequestHandler` APIs, making migration trivial if you're moving off of MediatR.

You'll notice we're using a `Result` wrapper for all return types. This is optional, but it promotes explicit success/failure handling and encourages consistency across the application boundary. You can learn more about it in my [**previous article**](/milanjovanovic.tech/functional-error-handling-in-dotnet-with-the-result-pattern.md).

These interfaces form a lightweight CQRS infrastructure, focused purely on intent and separation of concerns. No mediator, no runtime indirection — just clear contracts for handling reads and writes.

---

## Practical Example: Command Handler

To see these abstractions in action, let's implement a command that marks a todo item as completed.

```cs title="CompleteTodoCommand.cs"
public sealed record CompleteTodoCommand(Guid TodoItemId) : ICommand;
```

```cs :collapsed-lines title="CompleteTodoCommandHandler.cs"
internal sealed class CompleteTodoCommandHandler(
    IApplicationDbContext context,
    IDateTimeProvider dateTimeProvider,
    IUserContext userContext)
    : ICommandHandler<CompleteTodoCommand>
{
    public async Task<Result> Handle(CompleteTodoCommand command, CancellationToken cancellationToken)
    {
        TodoItem? todoItem = await context.TodoItems
            .SingleOrDefaultAsync(
                t => t.Id == command.TodoItemId && t.UserId == userContext.UserId,
                cancellationToken);

        if (todoItem is null)
        {
            return Result.Failure(TodoItemErrors.NotFound(command.TodoItemId));
        }

        if (todoItem.IsCompleted)
        {
            return Result.Failure(TodoItemErrors.AlreadyCompleted(command.TodoItemId));
        }

        todoItem.IsCompleted = true;
        todoItem.CompletedAt = dateTimeProvider.UtcNow;

        todoItem.Raise(new TodoItemCompletedDomainEvent(todoItem.Id));

        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
```

A few important things to note:

- The command is an immutable value object (just data, no behavior).
- The handler encapsulates all business logic: validation, state change, raising domain events, and persistence.
- There's no mediator, no `ISender`, no hidden dispatching. The handler is invoked directly via our custom abstractions.

This makes intent explicit, avoids magic, and keeps the dependencies minimal.

We'll look at how to add decorators next, so we can introduce things like logging, validation, or transactions without modifying the handler itself.

---

## Decorators

To support cross-cutting concerns like logging, validation, and transactions, we apply the **decorator pattern** around our handlers. Technically, this is closer to the **proxy pattern**, since we're injecting behavior before/after delegating to the real handler. But in the context of cross-cutting concerns, most people refer to this as a decorator — which is fine for our purposes.

Let's look at two examples: one for logging, one for validation.

```cs
using Serilog.Context;

internal sealed class LoggingCommandHandler<TCommand, TResponse>(
    ICommandHandler<TCommand, TResponse> innerHandler,
    ILogger<CommandHandler<TCommand, TResponse>> logger)
    : ICommandHandler<TCommand, TResponse>
    where TCommand : ICommand<TResponse>
{
    public async Task<Result<TResponse>> Handle(TCommand command, CancellationToken cancellationToken)
    {
        string commandName = typeof(TCommand).Name;

        logger.LogInformation("Processing command {Command}", commandName);

        Result<TResponse> result = await innerHandler.Handle(command, cancellationToken);

        if (result.IsSuccess)
        {
            logger.LogInformation("Completed command {Command}", commandName);
        }
        else
        {
            using (LogContext.PushProperty("Error", result.Error, true))
            {
                logger.LogError("Completed command {Command} with error", commandName);
            }
        }

        return result;
    }
}
```

This class wraps any `ICommandHandler<TCommand, TResponse>`, injecting the decorated handler as `innerHandler`. It adds structured logging around the command execution without touching the core business logic.

Now a [**validation example with FluentValidation**](/milanjovanovic.tech/cqrs-validation-with-mediatr-pipeline-and-fluentvalidation.md):

```cs
using FluentValidation;
using FluentValidation.Results;

internal sealed class ValidationCommandHandler<TCommand, TResponse>(
    ICommandHandler<TCommand, TResponse> innerHandler,
    IEnumerable<IValidator<TCommand>> validators)
    : ICommandHandler<TCommand, TResponse>
    where TCommand : ICommand<TResponse>
{
    public async Task<Result<TResponse>> Handle(TCommand command, CancellationToken cancellationToken)
    {
        // Validate the command using all registered validators
        ValidationFailure[] validationFailures = await ValidateAsync(command, validators);

        if (validationFailures.Length == 0)
        {
            return await innerHandler.Handle(command, cancellationToken);
        }

        // If validation fails, return a failure result with the errors
        return Result.Failure<TResponse>(CreateValidationError(validationFailures));
    }

    private static async Task<ValidationFailure[]> ValidateAsync<TCommand>(
        TCommand command,
        IEnumerable<IValidator<TCommand>> validators)
    {
        if (!validators.Any())
        {
            return [];
        }

        var context = new ValidationContext<TCommand>(command);

        ValidationResult[] validationResults = await Task.WhenAll(
            validators.Select(validator => validator.ValidateAsync(context)));

        ValidationFailure[] validationFailures = validationResults
            .Where(validationResult => !validationResult.IsValid)
            .SelectMany(validationResult => validationResult.Errors)
            .ToArray();

        return validationFailures;
    }

    private static ValidationError CreateValidationError(ValidationFailure[] validationFailures) =>
        new(validationFailures.Select(f => Error.Problem(f.ErrorCode, f.ErrorMessage)).ToArray());
}
```

Each decorator handles a single concern and can be layered transparently around the core handler.

::: important

Since we're working with generic interfaces (`ICommandHandler<,>`, `IQueryHandler<,>`), each decorator must explicitly target the same generic contract. That means you'll need separate decorator classes for each handler abstraction you're using (e.g. command with result, command without result, query with result).

:::

In the next section, we'll wire this up using [<FontIcon icon="iconfont icon-github"/>`khellang/Scrutor`](https://github.com/khellang/Scrutor). It's a simple assembly scanning library that helps us register and decorate handlers cleanly. Yes, it uses reflection, but only during startup — and it's fully transparent and predictable.

---

## DI Setup

With our handlers and decorators in place, we can register everything using Scrutor.

```cs
services.Scan(scan => scan.FromAssembliesOf(typeof(DependencyInjection))
    .AddClasses(classes => classes.AssignableTo(typeof(IQueryHandler<,>)), publicOnly: false)
        .AsImplementedInterfaces()
        .WithScopedLifetime()
    .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<>)), publicOnly: false)
        .AsImplementedInterfaces()
        .WithScopedLifetime()
    .AddClasses(classes => classes.AssignableTo(typeof(ICommandHandler<,>)), publicOnly: false)
        .AsImplementedInterfaces()
        .WithScopedLifetime());
```

This scans the application assembly and registers all command and query handlers (including internal types) as their respective interfaces.

Next, we apply decorators for validation and logging:

```cs
services.Decorate(typeof(ICommandHandler<,>), typeof(ValidationDecorator.CommandHandler<,>));
services.Decorate(typeof(ICommandHandler<>), typeof(ValidationDecorator.CommandBaseHandler<>));

services.Decorate(typeof(IQueryHandler<,>), typeof(LoggingDecorator.QueryHandler<,>));
services.Decorate(typeof(ICommandHandler<,>), typeof(LoggingDecorator.CommandHandler<,>));
services.Decorate(typeof(ICommandHandler<>), typeof(LoggingDecorator.CommandBaseHandler<>));
```

Each `Decorate` call wraps the previous registration. **Order matters**, but it might not be intuitive at first glance.

The last decorator applied will be the outermost one at runtime. So in this example:

- The **base handler** is first decorated by **validation**
- That composite is then decorated again by **logging**

Which means the **logging decorator runs first**, followed by **validation**, and then the core handler.

This order allows logging to capture the full command lifecycle, including any early exits from validation failures.

With this setup, you now have a fully functional and extensible CQRS pipeline:

- Custom handler interfaces
- Clean decorator chain
- Assembly-scanned DI setup

---

## Usage from Minimal API

Once everything is wired up, using a command handler from a Minimal API endpoint is straightforward:

```cs
internal sealed class Complete : IEndpoint
{
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPut("todos/{id:guid}/complete", async (
            Guid id,
            ICommandHandler<CompleteTodoCommand> handler,
            CancellationToken cancellationToken) =>
        {
            var command = new CompleteTodoCommand(id);

            Result result = await handler.Handle(command, cancellationToken);

            return result.Match(Results.NoContent, CustomResults.Problem);
        })
        .WithTags(Tags.Todos)
        .RequireAuthorization();
    }
}
```

We're injecting the appropriate `ICommandHandler<CompleteTodoCommand>` directly into the endpoint. No need for `ISender`, no mediator layer, no runtime lookup.

This keeps the endpoint clean and focused on its primary responsibility: handling HTTP requests.

Everything is resolved explicitly by the container. This makes the code easier to test, reason about, and trace while maintaining all the benefits of CQRS and separation of concerns.

---

## Conclusion

CQRS doesn't require a complex framework.

With a few small interfaces, some decorator classes, and a clean DI setup, you can build a simple and flexible pipeline for handling commands and queries. It's easy to understand, easy to test, and easy to extend.

If you want to see this pattern applied in a complete solution, my [**free Clean Architecture template**](/milanjovanovic.tech/templates/clean-architecture/README.md) includes everything covered in this article (fully wired up).

Use it as a reference or as a starting point for your next project.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CQRS Pattern the Way It Should've Been From the Start",
  "desc": "Learn how to implement CQRS in .NET without relying on MediatR. This guide walks you through a lightweight setup using simple interfaces, decorators, and DI — no frameworks required.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/cqrs-pattern-the-way-it-should-have-been-from-the-start.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
