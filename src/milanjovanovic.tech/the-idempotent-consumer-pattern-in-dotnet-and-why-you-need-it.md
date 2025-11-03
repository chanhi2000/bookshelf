---
lang: en-US
title: "The Idempotent Consumer Pattern in .NET (And Why You Need It)"
description: "Article(s) > The Idempotent Consumer Pattern in .NET (And Why You Need It)"
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
      content: "Article(s) > The Idempotent Consumer Pattern in .NET (And Why You Need It)"
    - property: og:description
      content: "The Idempotent Consumer Pattern in .NET (And Why You Need It)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.html
prev: /programming/cs/articles/README.md
date: 2025-11-08
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_167.png
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
  name="The Idempotent Consumer Pattern in .NET (And Why You Need It)"
  desc="Distributed systems don't fail cleanly: they retry, duplicate, and occasionally fail. This article shows how to design resilient message handlers in .NET using broker-level idempotency and the Idempotent Consumer pattern, so your system stays consistent no matter how many times a message is delivered."
  url="https://milanjovanovic.tech/blog/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_167.png"/>

Distributed systems are unreliable by nature.

I always recommend reading about the <VPIcon icon="fa-brands fa-wikipedia-w"/>[Fallacies of Distributed Computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) to understand the common pitfalls.

One of the key challenges is ensuring that messages are processed **exactly once**. Theoretically, that's impossible to guarantee in most systems. I won't dive into the <VPIcon icon="fa-brands fa-wikipedia-w"/>[CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem) or the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Two Generals Problem](https://en.wikipedia.org/wiki/Two_Generals%27_Problem) here, but suffice to say:

- Messages can arrive out of order
- Messages can be duplicated
- Deliveries can be delayed

If you design your system assuming every message will be processed exactly once, you're setting yourself up for subtle data corruption.

But we can design our system to apply side effects **exactly once** using the [**Idempotent Consumer**](/milanjovanovic.tech/idempotent-consumer-handling-duplicate-messages.md) pattern.

Let's unpack what can go wrong, how brokers help with idempotency, and how you can build an idempotent consumer in .NET.

---

## What Can Go Wrong When Publishing

Let's say your service publishes an event when a new note is created:

```cs
await publisher.PublishAsync(new NoteCreated(note.Id, note.Title, note.Content));
```

We don't have to worry about the specific implementation of `publisher` or the message broker here. It could be RabbitMQ, SQS, Azure Service Bus, etc.

Now imagine:

- The publisher sends the message to the broker
- The broker stores it and sends an ACK
- **Network glitch**: the ACK never reaches the producer
- Producer times out and **retries** the publish
- The broker now has two `NoteCreated` events

From the producer's perspective, it "fixed" a timeout. But from the consumer's perspective, it received two events for the same note creation.

![Distributed messaging with network error causing duplicate messages.](https://milanjovanovic.tech/blogs/mnw_167/distributed_messaging_with_error.png?imwidth=3840)

And that's just one failure path. You can also get duplicates from:

- Broker redeliveries
- Consumer failures + retries

So even if you do everything "right" on the publisher, the **consumer still has to be defensive**.

---

## Publisher-Side Idempotency (Let the Broker Handle It)

Many message brokers already support idempotent publishing via message deduplication if you include a unique message ID. [**Azure Service Bus**](/milanjovanovic.tech/messaging-made-easy-with-azure-service-bus.md), for instance, can detect duplicates and ignore re-publishes for the same message ID within a configured window. [**Amazon SQS**](/milanjovanovic.tech/complete-guide-to-amazon-sqs-and-amazon-sns-with-masstransit.md) and other brokers also offer similar guarantees.

You don't need to reinvent this logic in your application. The key is to assign each message a stable identifier that uniquely represents the logical event you're sending.

For example, when publishing a `NoteCreated` event:

```cs{3}
var message = new NoteCreated(note.Id, note.Title, note.Content)
{
    MessageId = Guid.NewGuid() // or you can use note.Id
};

await publisher.PublishAsync(message);

```

If the network drops after you send the message, your app might retry. But when the broker sees the same `MessageId`, it knows this is a duplicate and safely discards it. You get deduplication without any custom tracking tables or extra state in your service.

This broker-level idempotency solves a large class of **producer-side issues**: network retries, transient failures, and duplicated publishes.

What it doesn't handle are **consumer retries**, which happen when messages are redelivered or your service crashes mid-processing.

That's where the idempotent consumer pattern comes in.

---

## Implementing an Idempotent Consumer in .NET

Here's an example of an idempotent consumer for a `NoteCreated` event:.

```cs :collapsed-lines
internal sealed class NoteCreatedConsumer(
    TagsDbContext dbContext,
    HybridCache hybridCache,
    ILogger<Program> logger) : IConsumer<NoteCreated>
{
    public async Task ConsumeAsync(ConsumeContext<NoteCreated> context)
    {
        // 1. Check if we've already processed this message for this consumer
        if (await dbContext.MessageConsumers.AnyAsync(c =>
                c.MessageId == context.MessageId &&
                c.ConsumerName == nameof(NoteCreatedConsumer)))
        {
            return;
        }

        var request = new AnalyzeNoteRequest(
            context.Message.NoteId,
            context.Message.Title,
            context.Message.Content);

        try
        {
            using var transaction = await dbContext.Database.BeginTransactionAsync();

            // 2. Deterministic processing: derive tags from note content
            var tags = AnalyzeContentForTags(request.Title, request.Content);

            // 3. Persist tags
            var tagEntities = tags.Select(ProjectToTagEntity(request.NoteId)).ToList();
            dbContext.Tags.AddRange(tagEntities);

            // 4. Record that this message was processed
            dbContext.MessageConsumers.Add(new MessageConsumer
            {
                MessageId = context.MessageId,
                ConsumerName = nameof(NoteCreatedConsumer),
                ConsumedAtUtc = DateTime.UtcNow
            });

            await dbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            // 5. Update cache
            await CacheNoteTags(request, tags);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error analyzing note {NoteId}", request.NoteId);
            throw;
        }
    }
}
```

This is a typical idempotent consumer with a few important details.

### 1. The Idempotency Key

```cs
if (await dbContext.MessageConsumers.AnyAsync(c =>
        c.MessageId == context.MessageId &&
        c.ConsumerName == nameof(NoteCreatedConsumer)))
{
    return;
}
```

You use:

- `MessageId` from the transport (`context.MessageId`)
- `ConsumerName` (so multiple consumers can safely process the same message)

If a duplicate message arrives, you short-circuit and do nothing.

What's also important here is having a **unique constraint** on `(MessageId, ConsumerName)` in the `MessageConsumers` table to prevent [**race conditions**](/milanjovanovic.tech/solving-race-conditions-with-ef-core-optimistic-locking.md). So even if you have concurrent processing of the same message, only one will succeed in inserting the record.

### 2. Atomic Side Effects + Idempotency Record

The processing and storing the message consumer record happen **in the same transaction**:

```cs{1,10}
using var transaction = await dbContext.Database.BeginTransactionAsync();

// write tags
dbContext.Tags.AddRange(tagEntities);

// write message-consumer record
dbContext.MessageConsumers.Add(new MessageConsumer { ... });

await dbContext.SaveChangesAsync();
await transaction.CommitAsync();
```

::: important Why this matters:

- If processing fails, there is no entry in `MessageConsumers`, so the message can be retried
- If processing succeeds, both the tags and the `MessageConsumer` row are committed together
- You never end up in a state where the work is done but the message is not marked as processed, or vice versa

:::

This is the core of idempotency:

> Do this work exactly once per message ID, even under retries.

### 3. Handling At-Least-Once Delivery

Most realistic setups are **at-least-once**:

- Consumer processes message
- ACK fails / times out
- Broker redelivers
- Your code runs again

With this pattern, the second run hits the `MessageConsumers` table and returns early.

No duplicate side effects.

This works, except for one caveat...

---

## Deterministic vs Non-Deterministic Handlers

What happens when your handler calls something *outside* the database? An email API, a payment gateway, or a background job queue?

These are all common side effects that need to be idempotent too.

Those calls sit outside your transaction boundary. Your database might commit successfully, but if the network hiccups before the external service responds, you can't tell if the action happened or not. On retry, your consumer might send another email or charge the credit card twice.

You've now crossed into the messy territory of non-deterministic handlers: operations that can't be repeated safely.

There are two main strategies to deal with this.

### 1. Use an Idempotency Key in the External Call

If the external service supports it, pass a stable identifier, like the message's `MessageId` with every request. Many APIs, including payment processors and email platforms, let you specify an idempotency key header. The service ensures that identical requests with the same key only execute once.

::: tip For example:

```cs{6}
await emailService.SendAsync(new SendEmailRequest
{
    To = user.Email,
    Subject = "Welcome!",
    Body = "Thanks for signing up.",
    IdempotencyKey = context.MessageId
});
```

:::

Even if the request is retried, the provider will recognize the key and skip the duplicate. This is the simplest and most reliable approach, if your external dependency supports it.

### 2. Store the Intent Locally

If the external service doesn't support idempotency keys, you can simulate it. Store a **record of the intended action** in your database before calling the external system. For example, create a `PendingEmails` table that records which messages should be sent, keyed by message ID or user ID.

A background process can later read these pending records and perform the action once. This makes the process deterministic, but at the cost of more complexity, extra tables, and background workers. It's often overengineering unless the side effect is critical or irreversible, like payments or account provisioning.

The trade-off comes down to confidence. If repeating the action has real consequences, introduce idempotency explicitly. If not, retrying the operation might be acceptable.

---

## When Idempotent Consumer Isn't Needed

Not every consumer needs the overhead of idempotency checks. If your operation is already naturally idempotent, you can often skip the extra table and transaction logic.

Updating a projection, setting a status flag, or refreshing a cache are all examples of deterministic actions that can safely run multiple times. For instance, "set user's status to Active" or "rebuild the read model" are operations that overwrite state rather than append to it.

Some handlers also use precondition checks to avoid duplication. If the handler updates an entity, it can first check whether that entity is already in the desired state and return early. That simple guard clause can be enough.

Don't blindly apply the **Idempotent Consumer** pattern everywhere. Apply it where it protects you from real harm, where duplicate processing causes financial or data inconsistencies.

For everything else, **simpler is better**.

---

## Takeaway

Distributed systems are unpredictable. Retries, duplicates, and partial failures are part of normal operation. You can't avoid them, but you can design your system so they don't impact you as much.

Use your broker's built-in **message deduplication** to prevent duplicates from the producer side. For the consumer side, apply the **Idempotent Consumer** pattern to ensure side effects happen once, even under retries. Keep the record of processed messages and the actual side effect in the same transaction.

Not every message handler needs this. If your consumer is naturally idempotent or can short-circuit with a simple precondition, skip the extra complexity. But for anything that modifies persistent state or calls external systems, idempotency isn't optional, it's the only way to keep your system consistent.

Build your consumers to tolerate retries. And your distributed system will be that much more reliable. The interesting part is that once you understand this principle, you start seeing it everywhere in real-world systems.

If you want to dive deeper into messaging patterns and learn how this is implemented in a production-grade system, check out my [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) course. We'll build a full-featured application with distributed messaging, CQRS, and DDD patterns from scratch.

Hope this was helpful.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Idempotent Consumer Pattern in .NET (And Why You Need It)",
  "desc": "Distributed systems don't fail cleanly: they retry, duplicate, and occasionally fail. This article shows how to design resilient message handlers in .NET using broker-level idempotency and the Idempotent Consumer pattern, so your system stays consistent no matter how many times a message is delivered.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
