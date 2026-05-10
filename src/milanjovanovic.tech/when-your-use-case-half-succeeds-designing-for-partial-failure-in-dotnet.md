---
lang: en-US
title: "When Your Use Case Half-Succeeds: Designing for Partial Failure in .NET"
description: "Article(s) > When Your Use Case Half-Succeeds: Designing for Partial Failure in .NET"
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
      content: "Article(s) > When Your Use Case Half-Succeeds: Designing for Partial Failure in .NET"
    - property: og:description
      content: "When Your Use Case Half-Succeeds: Designing for Partial Failure in .NET"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/when-your-use-case-half-succeeds-designing-for-partial-failure-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2026-05-16
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_194.png
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
  name="When Your Use Case Half-Succeeds: Designing for Partial Failure in .NET"
  desc="A use case isn't a transaction. The moment it touches more than one system, you are dealing with partial failure. Here's how I classify side effects and design use cases that fail loudly and recover safely."
  url="https://milanjovanovic.tech/blog/when-your-use-case-half-succeeds-designing-for-partial-failure-in-dotnet"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_194.png"/>

One of the recurring bugs I've chased over the years is the "duplicate charge" support ticket.

The customer was charged once, but our system thought the payment had failed. The payment provider had taken the money, the order had rolled back to a draft state, and the user had received a "Payment failed, please retry" email on top of it. A single user action left every subsystem with a different opinion about what actually happened.

A use case looks like a transaction because it sits behind a single method call. But the moment it touches more than one system, you are dealing with **partial failure**.

Here's how I think about it:

- The three categories every side effect falls into
- How to design use cases that fail loudly and recover safely
- When to reach for the [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md) and when not to

Let's dive in.

---

## The Code That Looks Fine

Here's a typical "place an order" use case. I've written this exact shape a hundred times, and so have you.

```cs{12,14,16}
internal sealed class PlaceOrder(
    IOrderRepository orders,
    IPaymentService payments,
    IEmailService emails,
    IUnitOfWork unitOfWork)
{
    public async Task<Result> ExecuteAsync(PlaceOrderRequest request, CancellationToken ct)
    {
        var order = Order.Create(request.CustomerId, request.Items);
        orders.Insert(order);

        await payments.ChargeAsync(order.Id, order.Total, ct);

        await emails.SendOrderConfirmationAsync(order.Id, ct);

        await unitOfWork.SaveChangesAsync(ct);
        return Result.Success();
    }
}
```

There are three side effects in this method, sitting behind what looks like a single transactional boundary, with no coordination between them.

If `SaveChangesAsync` throws *after* `ChargeAsync` succeeded, you've taken the customer's money and lost the order. If `SendOrderConfirmationAsync` throws, the order saves and the charge goes through, but no email is sent. And if you naively retry, you double-charge.

The use case "works" until it doesn't, and when it doesn't, it tends to fail in a different way every time.

---

## Three Categories of Side Effect

Before you write a single line of recovery code, classify every side effect into one of three buckets:

1. **Transactional** - lives inside your database transaction. Inserts, updates, [**domain events**](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md) dispatched in-process.
2. **External and reversible** - an API call you can compensate for. Charge → refund. Reserve inventory → release.
3. **External and irreversible** - sent emails, posted webhooks, SMS messages. Once they're out, they're out.

The category determines the strategy. There is no single "handle errors properly" rule that covers all three.

---

## Strategy 1: Pull Transactional Work to the End

The first move is mechanical. Anything transactional should commit *last*, after all external calls have either succeeded or been explicitly tolerated.

```cs{7,11}
public async Task<Result> ExecuteAsync(PlaceOrderRequest request, CancellationToken ct)
{
    var order = Order.Create(request.CustomerId, request.Items);

    var charge = await payments.ChargeAsync(order.Id, order.Total, ct);
    if (charge.IsFailure) return charge;
    order.MarkPaid(charge.Value.TransactionId);

    orders.Insert(order);

    await unitOfWork.SaveChangesAsync(ct);
    return Result.Success();
}
```

You can't always do this - sometimes you need a database ID before calling the external service. That's fine. The point isn't ordering for its own sake. It's making sure that if you commit, you've already done the work the commit promises.

---

## Strategy 2: Move Irreversible Side Effects Outside the Use Case

This is where the [**Outbox pattern**](/milanjovanovic.tech/scaling-the-outbox-pattern.md) earns its keep.

Instead of sending the email directly, raise an `OrderPlaced` [**domain event**](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md) and let an outbox dispatcher pick it up *after* the transaction commits.

```cs{10,11}
public async Task<Result> ExecuteAsync(PlaceOrderRequest request, CancellationToken ct)
{
    var order = Order.Create(request.CustomerId, request.Items);

    var charge = await payments.ChargeAsync(order.Id, order.Total, ct);
    if (charge.IsFailure) return charge;
    order.MarkPaid(charge.Value.TransactionId);

    orders.Insert(order);
    order.Raise(new OrderPlacedEvent(order.Id));
    await unitOfWork.SaveChangesAsync(ct);

    return Result.Success();
}
```

The email is no longer the use case's problem. If the transaction commits, the event commits with it inside the same write. If it doesn't, the event never escapes the database and no email is ever sent. A separate worker turns events into emails, with its own retries and its own [**idempotency**](/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md) guarantees.

---

## Strategy 3: Make External Calls Idempotent or Compensable

The payment call is the dangerous one. If it succeeds and your transaction rolls back, you've taken money you can't account for.

What you do *not* do is silently swallow the failure:

```cs
try
{
    await payments.ChargeAsync(order.Id, order.Total, ct);
}
catch
{
    // shrug
}
```

The symptom disappears from your logs, the money stays gone, and the next time the user retries you charge them again.

There are two approaches I actually use, and they compose well together.

### Approach A: Idempotency Keys

Most serious payment providers (Stripe, Adyen, Braintree) let you attach an **idempotency key** to a charge. A retry with the same key is a no-op on their side and returns the original result. The natural key here is the order ID:

```cs{6}
var charge = await payments.ChargeAsync(
    new ChargeRequest
    {
        OrderId = order.Id,
        Amount = order.Total,
        IdempotencyKey = order.Id.ToString()
    },
    ct);
```

Now it's safe to retry the use case. If the previous attempt charged the customer and crashed before committing, the next attempt gets the *same* charge back from the provider instead of creating a new one, and the order finally gets persisted.

### Approach B: Compensate via a Domain Event

Idempotency keys only help when you can replay with the same inputs. Sometimes you can't - the user gave up, the request was cancelled, or the failure is permanent.

In that case, the money is real and needs to come back. Make the failure itself a first-class event and refund out-of-band:

```cs{12,15}
public async Task<Result> ExecuteAsync(PlaceOrderRequest request, CancellationToken ct)
{
    var order = Order.Create(request.CustomerId, request.Items);

    var charge = await payments.ChargeAsync(order.Id, order.Total, ct);
    if (charge.IsFailure) return charge;
    order.MarkPaid(charge.Value.TransactionId);

    try
    {
        orders.Insert(order);
        order.Raise(new OrderPlacedEvent(order.Id));
        await unitOfWork.SaveChangesAsync(ct);
    }
    catch (Exception ex)
    {
        await outbox.PublishAsync(
            new PaymentFailedEvent(
                order.Id,
                charge.Value.TransactionId,
                order.Total,
                Reason: ex.Message),
            ct);
        throw;
    }

    return Result.Success();
}
```

A background consumer subscribes to `PaymentFailedEvent` and issues the refund, using the transaction ID as its own idempotency key. This turns a scary cross-process compensation into a normal, observable, retryable [**message handler**](/milanjovanovic.tech/idempotent-consumer-handling-duplicate-messages.md).

In practice, I use Approach A for transient failures and Approach B for permanent ones. They aren't mutually exclusive.

---

## When the Saga Pattern Wins Instead

The strategies above work when one use case coordinates a small number of side effects in a single service. Once the work spans multiple services and needs to survive process restarts, you're in [**saga**](/milanjovanovic.tech/implementing-the-saga-pattern-with-masstransit.md) territory.

The rule I use: if you can fit the recovery logic in your head, a well-designed use case is enough. If you can't, reach for a saga.

---

## Summary

A use case is a unit of *intent*, not a unit of *atomicity*.

- **Transactional** work commits with the database, last.
- **Irreversible** work goes through the [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md), not the use case.
- **External, reversible** work uses idempotency keys first, compensating events second.
- **Never** swallow failures to make the use case "look successful".

Most of the production bugs I've debugged in event-driven systems come down to a use case that lied about whether it succeeded. Stop lying, and the system gets a lot easier to reason about.

If you want to see this kind of thinking applied across a full system, that's exactly what I build inside [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When Your Use Case Half-Succeeds: Designing for Partial Failure in .NET",
  "desc": "A use case isn't a transaction. The moment it touches more than one system, you are dealing with partial failure. Here's how I classify side effects and design use cases that fail loudly and recover safely.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/when-your-use-case-half-succeeds-designing-for-partial-failure-in-dotnet.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
