---
lang: en-US
title: "Implementing the Saga Pattern With Wolverine"
description: "Article(s) > Implementing the Saga Pattern With Wolverine"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Implementing the Saga Pattern With Wolverine"
    - property: og:description
      content: "Implementing the Saga Pattern With Wolverine"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-the-saga-pattern-with-wolverine.html
prev: /programming/cs/articles/README.md
date: 2026-04-11
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_189.png
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Implementing the Saga Pattern With Wolverine"
  desc="Long-running business processes don't fit neatly into a single request. Wolverine's Saga support gives you a convention-based approach to orchestrating workflows in .NET - with built-in timeout handling and compensation. Here's how to implement a user onboarding saga."
  url="https://milanjovanovic.tech/blog/implementing-the-saga-pattern-with-wolverine"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_189.png"/>

Long-running business processes don't fit neatly into a single request.

Think about user onboarding: you register the user, send a verification email, wait for them to verify, and then send a welcome email. Each step depends on the previous one. If the user never verifies, you need a way to handle that.

The [**Saga pattern**](/milanjovanovic.tech/implementing-the-saga-pattern-with-masstransit.md) breaks this into a sequence of steps, each with its own message and handler. If a step fails or times out, the saga runs [<VPIcon icon="fa-brands fa-wikipedia-w"/>compensation logic](https://en.wikipedia.org/wiki/Compensating_transaction) instead of leaving the system in a broken state.

I've covered sagas with [**MassTransit**](/milanjovanovic.tech/implementing-the-saga-pattern-with-masstransit.md) and [**Rebus**](/milanjovanovic.tech/implementing-the-saga-pattern-with-rebus-and-rabbitmq.md) before. Both work well, but their [<VPIcon icon="fa-brands fa-wikipedia-w"/>state machine](https://en.wikipedia.org/wiki/Finite-state_machine) DSLs come with a fair amount of ceremony. Since [**MassTransit moved to a commercial license**](/milanjovanovic.tech/mediatr-and-masstransit-going-commercial-what-this-means-for-you.md), more teams have been exploring Wolverine as an alternative.

[<VPIcon icon="fas fa-globe"/>Wolverine](https://wolverinefx.net/) takes a [<VPIcon icon="fas fa-globe"/>different approach](https://wolverinefx.net/guide/durability/sagas) - you write a class that extends `Saga`, define `Handle` methods for each message type, and [<VPIcon icon="fas fa-globe"/>cascade new messages](https://wolverinefx.net/guide/handlers/cascading) from return values. Wolverine handles routing, persistence, and correlation automatically.

---

## Configuring Wolverine

We need [**RabbitMQ**](/milanjovanovic.tech/event-driven-architecture-in-dotnet-with-rabbitmq.md) for message transport and [<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL](https://postgresql.org/) for durable saga state and messaging.

```cs
var connectionString = builder.Configuration.GetConnectionString("user-mgmt");

builder.Host.UseWolverine(options =>
{
    options.UseRabbitMqUsingNamedConnection("rmq")
        .AutoProvision()
        .UseConventionalRouting();

    options.Policies.DisableConventionalLocalRouting();

    options.PersistMessagesWithPostgresql(connectionString!);
});
```

- `AutoProvision` creates RabbitMQ exchanges and queues automatically
- `UseConventionalRouting` routes messages to queues based on message type names
- `DisableConventionalLocalRouting` forces all messages through RabbitMQ instead of in-process handling
- [<VPIcon icon="fas fa-globe"/>`PersistMessagesWithPostgresql`](https://wolverinefx.net/guide/durability/postgresql) stores saga state and messages in PostgreSQL. Wolverine uses [<VPIcon icon="fas fa-globe"/>lightweight saga storage](https://wolverinefx.net/guide/durability/sagas#lightweight-saga-storage) to create a table per saga type, and the [<VPIcon icon="fas fa-globe"/>durable messaging](https://wolverinefx.net/guide/durability/) infrastructure ensures nothing is lost if the process crashes

Wolverine gives you **three ways to persist saga state**. [<VPIcon icon="fas fa-globe   "/>Lightweight storage](https://wolverinefx.net/guide/durability/sagas#lightweight-saga-storage) (what we're using) serializes saga state as JSON in a per-saga table with zero ORM config. [<VPIcon icon="fas fa-globe"/>Marten](https://wolverinefx.net/guide/durability/marten/sagas) stores sagas as [<VPIcon icon="fas fa-globe"/>Marten](https://martendb.io/) documents with [<VPIcon icon="fa-brands fa-wikipedia-w"/>optimistic concurrency](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) and strong-typed IDs. [<VPIcon icon="fas fa-globe"/>EF Core](https://wolverinefx.net/guide/durability/efcore/sagas) maps sagas into a flat, queryable table and lets you commit saga state with other data in a single transaction. If you just need saga state management, lightweight storage is the simplest path.

Required packages:

```xml
<PackageReference Include="WolverineFx" Version="5.16.2" />
<PackageReference Include="WolverineFx.Postgresql" Version="5.16.2" />
<PackageReference Include="WolverineFx.RabbitMQ" Version="5.16.2" />
```

---

## The Saga Messages

Before building the saga, let's define all the messages it will work with:

```cs
public record SendVerificationEmail(Guid UserId, string Email);
public record VerificationEmailSent(Guid Id);

public record VerifyUserEmail(Guid Id);

public record SendWelcomeEmail(Guid UserId, string Email, string FirstName);
public record WelcomeEmailSent(Guid Id);

public record OnboardingTimedOut(Guid Id) : TimeoutMessage(5.Minutes());
```

`OnboardingTimedOut` extends Wolverine's [<VPIcon icon="fas fa-globe"/>`TimeoutMessage`](https://wolverinefx.net/guide/durability/sagas#timeout-messages), which automatically schedules a delayed delivery. When the saga starts, Wolverine will deliver this message after 5 minutes. If the user hasn't verified by then, the saga compensates.

::: info The Saga State Diagram

Here's how the saga transitions between states:

![Saga pattern state diagram showing message flow from broker to consumer to database and processor.](https://milanjovanovic.tech/blogs/mnw_189/saga_pattern_state_diagram.png?imwidth=1080)
<!-- TODO: mermaid화 -->

:::

---

## Building the Saga

Here's the complete saga class:

```cs :collapsed-lines
public class UserOnboardingSaga : Saga
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsVerificationEmailSent { get; set; }
    public bool IsEmailVerified { get; set; }
    public bool IsWelcomeEmailSent { get; set; }
    public DateTime StartedAt { get; set; }

    // Step 1: Start the saga when UserRegistered is published
    public static (
        UserOnboardingSaga,
        SendVerificationEmail,
        OnboardingTimedOut) Start(
            UserRegistered @event,
            ILogger<UserOnboardingSaga> logger)
    {
        logger.LogInformation(
            "Starting onboarding for user {UserId}", @event.Id);

        var saga = new UserOnboardingSaga
        {
            Id = @event.Id,
            Email = @event.Email,
            FirstName = @event.FirstName,
            LastName = @event.LastName,
        };

        return (
            saga,
            new SendVerificationEmail(saga.Id, saga.Email),
            new OnboardingTimedOut(saga.Id));
    }

    // Step 2: Verification email was sent
    public void Handle(
        VerificationEmailSent @event,
        ILogger<UserOnboardingSaga> logger)
    {
        logger.LogInformation(
            "Verification email sent for user {UserId}", Id);

        IsVerificationEmailSent = true;
    }

    // Step 3: User verified their email
    public SendWelcomeEmail Handle(
        VerifyUserEmail command,
        ILogger<UserOnboardingSaga> logger)
    {
        logger.LogInformation("Email verified for user {UserId}", Id);

        IsEmailVerified = true;

        return new SendWelcomeEmail(Id, Email, FirstName);
    }

    // Step 4: Welcome email sent - onboarding complete
    public void Handle(
        WelcomeEmailSent @event,
        ILogger<UserOnboardingSaga> logger)
    {
        logger.LogInformation("Onboarding complete for user {UserId}", Id);

        IsWelcomeEmailSent = true;

        MarkCompleted();
    }

    // Compensation: timeout handler
    public void Handle(
        OnboardingTimedOut timeout,
        ILogger<UserOnboardingSaga> logger)
    {
        if (IsEmailVerified)
        {
            logger.LogInformation(
                "Timeout ignored - email already verified for user {UserId}",
                Id);
            return;
        }

        logger.LogWarning(
            "Onboarding timed out for user {UserId} - email not verified",
            Id);

        MarkCompleted();
    }

    // NotFound: messages arriving for completed/deleted sagas
    public static void NotFound(
        VerifyUserEmail command,
        ILogger<UserOnboardingSaga> logger)
    {
        logger.LogWarning(
            "Verify email received but saga {Id} no longer exists",
            command.Id);
    }

    public static void NotFound(
        OnboardingTimedOut timeout,
        ILogger<UserOnboardingSaga> logger)
    {
        logger.LogInformation(
            "Timeout received for already-completed saga {Id}",
            timeout.Id);
    }
}
```

A few things worth calling out.

**Starting the saga.** `Start` is a static factory that returns a tuple: the saga instance, a `SendVerificationEmail` command, and a [<VPIcon icon="fas fa-globe"/>scheduled](https://wolverinefx.net/guide/messaging/message-bus#scheduling-message-delivery-or-execution) `OnboardingTimedOut` message. Wolverine persists the saga and delivers the messages for you.

**Handling messages.** Wolverine [<VPIcon icon="fas fa-globe"/>correlates messages](https://wolverinefx.net/guide/durability/sagas#saga-message-identity) to the correct saga instance by looking for a `[SagaIdentity]` attribute, then `{SagaTypeName}Id`, then `Id`. Return `void` to update state silently, or return a message to cascade a new command.

::: warning

Do not call `IMessageBus.InvokeAsync()` within a saga handler to execute a command on that same saga. You'll be acting on stale or missing data. Use cascading messages (return values) for subsequent work.

:::

**Completing the saga.** `MarkCompleted()` tells Wolverine to delete the saga state from PostgreSQL.

**Concurrency.** Wolverine applies [<VPIcon icon="fa-brands fa-wikipedia-w"/>optimistic concurrency control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control) to saga state by default. If two messages for the same saga arrive at the same time, one succeeds and the other retries automatically.

**Timeout and compensation.** `OnboardingTimedOut` fires 5 minutes after the saga started. If the user verified, we ignore it. Otherwise, we compensate and end the saga. This is the key advantage over fire-and-forget workflows.

**NotFound handlers.** Static [<VPIcon icon="fas fa-globe"/>`NotFound` methods](https://wolverinefx.net/guide/durability/sagas#when-sagas-are-not-found) handle messages for sagas that no longer exist. You **must** have one for any message type that could arrive after the saga is deleted. The timeout `NotFound` handler matters most: in the happy path, the saga completes before the timeout fires.

::: info The Sequence Flow

Here's the happy path where the user verifies before the timeout:

![Saga pattern sequence diagram showing message flow from broker to consumer to database and processor.](https://milanjovanovic.tech/blogs/mnw_189/saga_pattern_sequence_diagram.png?imwidth=3840)
<!-- TODO: mermaid화 -->

If the user never verifies, the `VerifyUserEmail` message never arrives. After 5 minutes, `OnboardingTimedOut` fires and the saga compensates.

:::

---

## Summary

Wolverine's `Saga` base class gives you a convention-driven way to implement long-running workflows:

- **`Start` methods** create and initialize the saga from a triggering event
- **`Handle` methods** process messages and cascade new commands via return values
- **`TimeoutMessage`** schedules delayed compensation without external schedulers
- **`MarkCompleted()`** cleans up the saga state when the workflow is done
- **`NotFound` handlers** gracefully handle messages for sagas that no longer exist

The Saga pattern shines when you have multi-step processes with potential failures. Instead of hoping everything goes right, you design for the cases where it doesn't.

What I really like about Wolverine's approach is how little code you need. You skip the state machine DSL and explicit correlation config entirely.

If you want to go deeper on orchestrating distributed workflows and building real-world sagas, check out [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md).

Hope this was useful. See you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Implementing the Saga Pattern With Wolverine",
  "desc": "Long-running business processes don't fit neatly into a single request. Wolverine's Saga support gives you a convention-based approach to orchestrating workflows in .NET - with built-in timeout handling and compensation. Here's how to implement a user onboarding saga.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-the-saga-pattern-with-wolverine.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
