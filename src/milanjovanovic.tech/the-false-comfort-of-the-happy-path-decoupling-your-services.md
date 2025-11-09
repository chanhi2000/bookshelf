---
lang: en-US
title: "The False Comfort of the “Happy Path”: Decoupling Your Services"
description: "Article(s) > The False Comfort of the “Happy Path”: Decoupling Your Services"
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
      content: "Article(s) > The False Comfort of the “Happy Path”: Decoupling Your Services"
    - property: og:description
      content: "The False Comfort of the “Happy Path”: Decoupling Your Services"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-false-comfort-of-the-happy-path-decoupling-your-services.html
prev: /programming/cs/articles/README.md
date: 2025-11-22
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_169.png
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
  name="The False Comfort of the “Happy Path”: Decoupling Your Services"
  desc="Coupling isn't just about code structure; it's about failure boundaries. Discover how to ensure your critical business logic survives when external dependencies like email or analytics go down."
  url="https://milanjovanovic.tech/blog/the-false-comfort-of-the-happy-path-decoupling-your-services"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_169.png"/>

**Let's be honest: We've all written this code.**

It's Monday morning, you have a deadline, and you need to implement a user registration feature. It's simple enough: save the user, send a welcome email, and track the signup in your analytics dashboard.

You write this:

```cs
public class UserService(
        IUserRepository userRepository,
        IEmailService emailService,
        IAnalyticsService analyticsService)
{
    public async Task RegisterUser(string email, string password)
    {
        var user = new User(email, password);
        await userRepository.SaveAsync(user);

        // 1. Directly coupled to email service (external API)
        await emailService.SendWelcomeEmail(user.Email);

        // 2. Directly coupled to analytics (this could be an external API)
        await analyticsService.TrackUserRegistration(user.Id);

        // What if we need to add more features?
        // This method will keep growing...
    }
}
```

It looks clean. It's readable. It works on your machine.

But this method is a **ticking time bomb**.

It assumes the “Happy Path” is the *only* path. It assumes the network is reliable, the email provider is up, and the analytics API is fast. In production, none of these are guaranteed.

Thinking further, I'm sure you can imagine similar code in your own projects. It might not be this exact scenario, but the pattern is common: a single method that orchestrates multiple side effects in a linear fashion.

Let's break down why this code is dangerous and how we can refactor it into a robust, event-driven architecture.

---

## The Hidden Dangers of the "God Method"

There are three major issues hiding in those ten lines of code.

### 1. Temporal Coupling (Latency)

When a user clicks "Register," they have to wait for:

1. The Database **+**
2. The SMTP Server **+**
3. The Analytics API

If your analytics provider is having a bad day and takes 3 seconds to respond, **your user waits 3 seconds**. You are punishing your user for the slowness of a background system they don't even care about.

### 2. The Partial Failure State

This is the **most critical risk**. Imagine this scenario:

1. `SaveAsync(user)` succeeds. The user is in the DB.
2. `SendWelcomeEmail` succeeds. The user gets an email.
3. `TrackUserRegistration` throws a `503 Service Unavailable`.

::: info What happens now?

If you wrap this in a transaction and rollback, you have deleted the user from the DB... **but you already sent them a welcome email.** The user tries to log in, but they don't exist. Now what?

:::

If you *don't* rollback, you have a user in your system that is missing from your analytics. You have data inconsistency.

### 3. Violation of Single Responsibility (SRP)

You might argue that because we are using interfaces (`IEmailService`), we are decoupled. That is true for *implementation details*, but false for *orchestration*.

The `UserService` currently has two reasons to change:

1. **Core Domain Logic:** "We now require a username in addition to email."
2. **Notification Policy:** "Marketing wants to send an SMS in addition to the Email."

The `UserService` should strictly be responsible for the **state change** (creating the user). It should not be responsible for **orchestrating the side effects** of that change.

---

## Level 1: Logical Decoupling with Domain Events

The first step to fixing this is to invert the control. Instead of the `UserService` *commanding* other services to do things, it should simply *announce* that something happened.

We can use [**Domain Events**](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md) to achieve this.

Here is the refactored `UserService`:

```cs
public class UserService(
        IUserRepository userRepository,
        IDomainEventDispatcher dispatcher,
        IUnitOfWork unitOfWork)
{
    public async Task RegisterUser(string email, string password)
    {
        // 1. Create the User Entity
        var user = new User(email, password);

        // 2. Capture the side effect as an event object
        var userRegisteredEvent = new UserRegisteredEvent(user.Id, user.Email);

        // 3. Add the entity to the repository
        await userRepository.AddAsync(user);

        // 4. Dispatch the event (Assuming in-process dispatching here for simplicity)
        // Note: Handlers for Email and Analytics are now completely separate classes.
        await dispatcher.Dispatch(userRegisteredEvent);

        await unitOfWork.SaveChangesAsync();
    }
}
```

The `UserService` is now stable. Adding a "Loyalty Points" feature later doesn't require touching this method. You just add a new handler for the `UserRegisteredEvent`.

**However, we haven't solved the reliability problem yet.** If the process crashes immediately after `Dispatch` but before `SaveChangesAsync` completes, we might send an email for a user that failed to save. Or, if we save first and dispatch later, we might save the user but lose the event if the server crashes.

---

## Level 2: Reliability with the Outbox Pattern

To fix this, we need **Atomicity**. Atomicity means that a set of operations either all succeed or all fail together.

We need to guarantee that if the `User` is saved, the `UserRegisteredEvent` is also saved.

Enter the [**Outbox Pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md).

Instead of publishing the event immediately to a message bus, we save the event to an `OutboxMessages` table in the **same database transaction** as the user.

Here is the complete implementation logic:

```cs
public async Task RegisterUser(string email, string password)
{
    // 1. Create the Domain Event
    var user = new User(email, password);
    var domainEvent = new UserRegisteredEvent(user.Id, user.Email);

    // 2. Open a Transaction
    using var transaction = dbContext.Database.BeginTransaction();

    try
    {
        // 3. Save the User to the Users Table
        dbContext.Users.Add(user);

        // 4. Serialize the Event and Save to Outbox Table
        var outboxMessage = new OutboxMessage
        {
            Id = Guid.NewGuid(),
            Type = nameof(UserRegisteredEvent),
            Content = JsonSerializer.Serialize(domainEvent),
            OccurredOn = DateTime.UtcNow,
            ProcessedOn = null // Null means it hasn't been handled yet
        };

        dbContext.OutboxMessages.Add(outboxMessage);

        // 5. Commit BOTH changes atomically
        await dbContext.SaveChangesAsync();
        await transaction.CommitAsync();
    }
    catch
    {
        await transaction.RollbackAsync();
        throw;
    }
}
```

Now, a [**background worker**](/milanjovanovic.tech/scheduling-background-jobs-with-quartz-net.md) (running in a separate process) polls the `OutboxMessages` table. It picks up the message and publishes it to your message bus (RabbitMQ, Azure Service Bus, etc.).

If the email service is down, the background worker just retries later. **We have achieved At-Least-Once delivery.**

---

## Level 3: Distributed Consistency with Sagas

The Outbox pattern is perfect for side effects (fire-and-forget actions like emails). But what if the subsequent action is **mandatory**?

**Scenario:** When a user registers, we *must* create a crypto-wallet for them in the `WalletService`. If the wallet creation fails (e.g., due to regulations), we cannot allow the user to exist in our system.

We can't just "retry later" if the `WalletService` says "Fraud Detected." We need to **undo** the user creation.

This is a distributed transaction, and we handle it with the [**Saga Pattern**](/milanjovanovic.tech/implementing-the-saga-pattern-with-masstransit). A Saga coordinates a series of steps. If one fails, it executes **Compensating Transactions** to undo the previous work.

Here is how the failure scenario looks when using a [**Choreography-based Saga**](/milanjovanovic.tech/orchestration-vs-choreography):

![A Saga Sequence Diagram showing UserService creating a user, WalletService attempting to create a wallet, failing, and UserService deleting the user as a compensation action.](https://milanjovanovic.tech/blogs/mnw_169/saga_sequence_diagram.png?imwidth=3840)
<!-- TODO: mermaid 화 -->

Here's the step-by-step breakdown of the flow:

1. **UserService:** Creates User → Publishes `UserCreated`
2. **WalletService:** Listens to `UserCreated` → Tries to create wallet
    - *Failure:* Wallet creation fails
    - *Action:* Publishes `WalletCreationFailed`
3. **UserService:** Listens to `WalletCreationFailed` → **Deletes/Deactivates the User**

This ensures **Eventual Consistency**. The system might be inconsistent for a few seconds (the user exists without a wallet), but it will eventually settle into a valid state (the user is removed).

---

## Summary: A Heuristic for Decision Making

You don't need Sagas for everything. Over-engineering is just as bad as tight coupling. Use this simple rule of thumb:

### 1. Is it a simple notification?

(Email, Analytics, Cache Invalidation)

- **Use Domain Events + Outbox.** It's okay if it happens 5 seconds later.

### 2. Is it a critical business dependency?

(Payments, Inventory, Account Status)

- **Use a Saga.** If step B fails, step A must be reverted.

Coupling isn't just about code structure. It's about understanding and managing **failure boundaries**. If your Analytics Service goes down, it shouldn't prevent a user from registering. Build your systems to survive the unhappy path.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The False Comfort of the “Happy Path”: Decoupling Your Services",
  "desc": "Coupling isn't just about code structure; it's about failure boundaries. Discover how to ensure your critical business logic survives when external dependencies like email or analytics go down.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-false-comfort-of-the-happy-path-decoupling-your-services.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
