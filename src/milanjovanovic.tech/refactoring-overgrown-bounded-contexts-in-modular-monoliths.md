---
lang: en-US
title: "Refactoring Overgrown Bounded Contexts in Modular Monoliths"
description: "Article(s) > Refactoring Overgrown Bounded Contexts in Modular Monoliths"
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
  - csharp
  - c#
  - dotnet
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Refactoring Overgrown Bounded Contexts in Modular Monoliths"
    - property: og:description
      content: "Refactoring Overgrown Bounded Contexts in Modular Monoliths"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/refactoring-overgrown-bounded-contexts-in-modular-monoliths.html
prev: /programming/cs/articles/README.md
date: 2025-04-26
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_139.png
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
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Refactoring Overgrown Bounded Contexts in Modular Monoliths"
  desc="Learn how to untangle bloated services and split them into clean, modular bounded contexts in a .NET modular monolith - one practical refactor at a time."
  url="https://milanjovanovic.tech/blog/refactoring-overgrown-bounded-contexts-in-modular-monoliths"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_139.png"/>

When you're building a [**modular monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md), it's easy to let bounded contexts grow too large over time. What started as a clean domain boundary slowly turns into a dumping ground for unrelated logic. Before you know it, you have a massive context responsible for users, payments, notifications, and reporting - all tangled together.

This article is about tackling that mess. We'll walk through how to identify an overgrown bounded context, and refactor it step-by-step into smaller, well-defined contexts. You'll see practical techniques in action, with real .NET code and without theoretical fluff.

---

## Identifying an Overgrown Context

You know you have a problem when:

- You're afraid to touch code because everything is interconnected
- The same entity is used for 4 unrelated use cases
- You see classes with 1000+ lines or services that do too much
- Business logic from different subdomains bleeds into each other

Here's a classic example.

We start with a `BillingContext` that now handles everything from notifications to reporting:

```cs
public class BillingService
{
    public void ChargeCustomer(int customerId, decimal amount) { ... }
    public void SendInvoice(int invoiceId) { ... }
    public void NotifyCustomer(int customerId, string message) { ... }
    public void GenerateMonthlyReport() { ... }
    public void DeactivateUserAccount(int userId) { ... }
}
```

This service has no clear boundaries. It mixes **Billing**, **Notifications**, **Reporting**, and **User Management** into a single, bloated class. Changing one feature could easily break another.

---

## Step 1: Identify Logical Subdomains

We start by breaking this apart logically. Think like a product owner.

Just ask: "What domains are we really working with?"

Group the methods:

- **Billing**: `ChargeCustomer`, `SendInvoice`
- **Notifications**: `NotifyCustomer`
- **Reporting**: `GenerateMonthlyReport`
- **User Management**: `DeactivateUserAccount`

Code within a [**bounded context**](/milanjovanovic.tech/monolith-to-microservices-how-a-modular-monolith-helps.md) should model a coherent domain. When multiple domains are jammed into the same context, your architecture becomes misleading.

You can validate these groupings by checking:

- Which parts of the system change together?
- Do teams use different vocabulary for each area?
- Would you give each domain to a different team?

If yes, it's a sign you're dealing with distinct contexts.

---

## Step 2: Extract One Context at a Time

Don't try to do it all at once. Start with something low-risk.

Let's begin by extracting **Notifications**.

Why **Notifications**? Because it's a pure side-effect. It doesn't impact business state, so it's easier to decouple safely.

Create a new module and move the logic there:

```cs
// New module: Notifications
public class NotificationService
{
    public void Send(int customerId, string message) { ... }
}
```

Then simplify the original `BillingService`:

```cs
public class BillingService
{
    private readonly NotificationService _notificationService;

    public BillingService(NotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    public void ChargeCustomer(int customerId, decimal amount)
    {
        // Charge logic...
        _notificationService.Send(customerId, $"You were charged ${amount}");
    }
}
```

This works. But now **Billing** _depends on_ **Notifications**. That's a coupling we want to avoid long-term.

Why? Because a failure in **Notifications** could block a billing operation. It also means **Billing** can't evolve independently.

Let's decouple with [**domain events**](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md):

```cs{10,19-24}
public class CustomerChargedEvent
{
    public int CustomerId { get; init; }
    public decimal Amount { get; init; }
}

// Module: Billing
public class BillingService
{
    private readonly IDomainEventDispatcher _dispatcher;

    public BillingService(IDomainEventDispatcher dispatcher)
    {
        _dispatcher = dispatcher;
    }

    public void ChargeCustomer(int customerId, decimal amount)
    {
        // Charge logic...
        _dispatcher.Dispatch(new CustomerChargedEvent
        {
            CustomerId = customerId,
            Amount = amount
        });
    }
}

// Module: Notifications
public class CustomerChargedEventnHandler : IDomainEventHandler<CustomerChargedEvent>
{
    public Task Handle(CustomerChargedEvent @event)
    {
        // Send notification
    }
}
```

Now **Billing** doesn't even *know* about **Notifications**. That's real modularity. You can replace, remove, or enhance the **Notifications** module without touching **Billing**.

---

## Step 3: Migrate Data (If Needed)

Most monoliths start with a single database. That's fine. But real modularity comes when each module controls its own [**schema**](/milanjovanovic.tech/modular-monolith-data-isolation.md).

Why? Because the database structure reflects ownership. If everything touches the same tables, it's hard to enforce boundaries.

You don't have to do it all at once. Start with:

- Creating a [**separate `DbContext` per module**](/milanjovanovic.tech/using-multiple-ef-core-dbcontext-in-single-application.md)
- Gradually migrate the tables to their own schemas
- Read-only projections or database views for cross-context reads

```cs
// Module: Billing
public class BillingDbContext : DbContext
{
    public DbSet<Invoice> Invoices { get; set; }
}

// Module: Notifications
public class NotificationsDbContext : DbContext
{
    public DbSet<NotificationLog> Logs { get; set; }
}
```

This separation enables independent schema evolution. It also makes [**testing**](/milanjovanovic.tech/testing-modular-monoliths-system-integration-testing.md) faster and safer.

When migrating, use a transitional phase where both contexts read from the same underlying data. Only switch write paths when confidence is high.

---

## Step 4: Repeat for Other Areas

Apply the same playbook. Target a clean split per subdomain.

Next up: **Reporting** and **User Management**.

Before:

```cs
billingService.GenerateMonthlyReport();
billingService.DeactivateUserAccount(userId);
```

After:

```cs
reportingService.GenerateMonthlyReport();
userService.DeactivateUser(userId);
```

Or via events:

```cs
_dispatcher.Dispatch(new MonthEndedEvent());
_dispatcher.Dispatch(new UserInactiveEvent(userId));
```

The goal here isn't just technical cleanliness - it's clarity. Anyone looking at your solution should know what each module is responsible for.

And remember: boundaries should be enforced by code, not just by folder structure. Different projects, separate EF models, and [**explicit interfaces**](/milanjovanovic.tech/internal-vs-public-apis-in-modular-monoliths.md) help enforce the split. [**Architecture tests**](/milanjovanovic.tech/enforcing-software-architecture-with-architecture-tests.md) can also help ensure that modules don't break their boundaries.

---

## Takeaway

Once you've finished the refactor, you'll have:

- **Smaller services** focused on one job
- **Decoupled modules** that evolve independently
- **Better tests** and easier debugging
- **Bounded contexts** that actually match the domain

This is more than structure, it's design that supports change. You get loose coupling, testability, and clearer mental models.

You don't need microservices to get modularity. You need to treat your monolith like a set of cooperating, isolated parts.

Start with one module. Ship the change. Repeat.

Want to go deeper into modular monolith design? My full video course, [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md), walks you through building a real-world system from scratch - with clear boundaries, isolated modules, and practical patterns that scale. Join 1,800+ students and start building better systems today.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Refactoring Overgrown Bounded Contexts in Modular Monoliths",
  "desc": "Learn how to untangle bloated services and split them into clean, modular bounded contexts in a .NET modular monolith - one practical refactor at a time.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/refactoring-overgrown-bounded-contexts-in-modular-monoliths.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
