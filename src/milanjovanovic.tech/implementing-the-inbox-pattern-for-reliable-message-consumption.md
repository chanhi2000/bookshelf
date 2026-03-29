---
lang: en-US
title: "Implementing the Inbox Pattern for Reliable Message Consumption"
description: "Article(s) > Implementing the Inbox Pattern for Reliable Message Consumption"
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
      content: "Article(s) > Implementing the Inbox Pattern for Reliable Message Consumption"
    - property: og:description
      content: "Implementing the Inbox Pattern for Reliable Message Consumption"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-the-inbox-pattern-for-reliable-message-consumption.html
prev: /programming/cs/articles/README.md
date: 2026-04-04
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_188.png
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
  name="Implementing the Inbox Pattern for Reliable Message Consumption"
  desc="The Outbox pattern guarantees reliable publishing. But what about the consumer side? The Inbox pattern ensures each incoming message is processed exactly once, even when the broker retries or delivers duplicates. Here's how to implement it in .NET with MassTransit and PostgreSQL."
  url="https://milanjovanovic.tech/blog/implementing-the-inbox-pattern-for-reliable-message-consumption"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_188.png"/>

The [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md) gets a lot of attention, and rightly so. But what about the consumer side?

Your publisher reliably sends a message. The broker delivers it. Your consumer processes it. Then something goes wrong. A timeout, a crash, a network blip. The broker **redelivers the same message**. Your consumer runs the same logic twice. This is a problem.

The **Inbox pattern** is the counterpart to the Outbox. The Outbox ensures reliable *publishing*. The Inbox ensures reliable *consumption*. Each incoming message is processed **exactly once**, even when the broker retries.

Here's how to implement it.

---

## Why You Need an Inbox

Most message brokers provide **at-least-once delivery**. The broker guarantees every message will be delivered, but it **doesn't** guarantee each message arrives only once.

Here's a common failure path:

1. The broker delivers a message to your consumer
2. Your consumer processes it successfully
3. Before the ACK reaches the broker, the connection drops
4. The broker assumes the message was lost and redelivers it
5. Your consumer processes the same message **twice**

You could make each handler [**idempotent**](/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md). That works, but it means every consumer needs to check a deduplication table before doing any work. The Inbox centralizes this into a single mechanism at the infrastructure level. I will talk more about the trade-offs between the Inbox and the Idempotent Consumer at the end.

The idea:

1. A message arrives from the broker
2. Instead of processing it immediately, **write it to an inbox table**
3. If the message already exists (duplicate), the write is silently ignored
4. A [**background process**](/milanjovanovic.tech/running-background-tasks-in-asp-net-core.md) reads unprocessed messages and handles them

This decouples reception from processing. The consumer becomes a thin persistence layer that can't produce duplicates.

![Inbox pattern sequence diagram showing message flow from broker to consumer to database and processor.](https://milanjovanovic.tech/blogs/mnw_188/inbox_pattern_sequence_diagram.png?imwidth=3840)
<!-- TODO: mermaid 화 -->

---

## Inbox Database Schema

The `inbox_messages` table stores every incoming message:

```sql
CREATE TABLE IF NOT EXISTS inbox_messages (
    id UUID PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    received_on_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    processed_on_utc TIMESTAMP WITH TIME ZONE NULL,
    error TEXT NULL
);

CREATE INDEX IF NOT EXISTS idx_inbox_messages_unprocessed
ON public.inbox_messages (received_on_utc, processed_on_utc)
INCLUDE (id, type, content)
WHERE processed_on_utc IS NULL;
```

The structure mirrors the [**Outbox pattern's**](/milanjovanovic.tech/implementing-the-outbox-pattern.md) `outbox_messages` table. The `id` enables idempotent inserts via `ON CONFLICT DO NOTHING`. The filtered index keeps the index small since processed messages drop out automatically.

Messages between services use a shared `IntegrationEvent` base record:

```cs
public abstract record IntegrationEvent(Guid MessageId);

public sealed record OrderCreatedIntegrationEvent(Guid OrderId)
    : IntegrationEvent(Guid.CreateVersion7());
```

---

## Inbox Consumer

The consumer is a [**MassTransit**](/milanjovanovic.tech/using-masstransit-with-rabbitmq-and-azure-service-bus.md) `IConsumer<T>`. Instead of processing the message, it **writes it to the inbox table** and returns. That's it.

We can make this generic so it works for any integration event:

```cs
internal sealed class InboxConsumer<T>(NpgsqlDataSource dataSource)
    : IConsumer<T> where T : IntegrationEvent
{
    public async Task Consume(ConsumeContext<T> context)
    {
        await using var connection = await dataSource.OpenConnectionAsync(
            context.CancellationToken);

        const string sql =
            @"""
            INSERT INTO public.inbox_messages (id, type, content, received_on_utc)
            VALUES (@Id, @Type, @Content::jsonb, @ReceivedOnUtc)
            ON CONFLICT (id) DO NOTHING;
            """;

        await connection.ExecuteAsync(sql, new
        {
            Id = context.Message.MessageId,
            Type = typeof(T).FullName,
            Content = JsonSerializer.Serialize(context.Message),
            ReceivedOnUtc = DateTime.UtcNow
        });
    }
}
```

`ON CONFLICT (id) DO NOTHING` is doing the heavy lifting. If the broker delivers the same message twice, the second insert is silently ignored. Crash after insert but before ACK? The next delivery is safely deduplicated.

---

## Inbox Processor

The processor runs in a [**background service**](/milanjovanovic.tech/running-background-tasks-in-asp-net-core.md) or a [**scheduled job**](/milanjovanovic.tech/scheduling-background-jobs-with-quartz-net.md), fetching unprocessed messages in batches and dispatching them for handling.

```cs :collapsed-lines
internal sealed class InboxProcessor(
    NpgsqlDataSource dataSource,
    IEventDispatcher eventDispatcher,
    ILogger<InboxProcessor> logger)
{
    private const int BatchSize = 1000;

    public async Task<int> Execute(CancellationToken cancellationToken = default)
    {
        await using var connection =
            await dataSource.OpenConnectionAsync(cancellationToken);
        await using var transaction =
            await connection.BeginTransactionAsync(cancellationToken);

        var messages = (await connection.QueryAsync<InboxMessage>(
            @"""
            SELECT id AS Id, type AS Type, content AS Content
            FROM inbox_messages
            WHERE processed_on_utc IS NULL
            ORDER BY received_on_utc
            LIMIT @BatchSize
            FOR UPDATE SKIP LOCKED
            """,
            new { BatchSize },
            transaction: transaction)).AsList();

        var processedAt = DateTime.UtcNow;
        var results = new List<(Guid Id, DateTime ProcessedAt, string? Error)>(
            messages.Count);

        foreach (var message in messages)
        {
            try
            {
                var messageType = Type.GetType(message.Type)!;
                var deserialized = JsonSerializer.Deserialize(
                    message.Content, messageType)!;

                await eventDispatcher.DispatchAsync(deserialized, cancellationToken);

                results.Add((message.Id, processedAt, null));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to process inbox message {Id}", message.Id);
                results.Add((message.Id, processedAt, ex.ToString()));
            }
        }

        if (results.Count > 0)
        {
            await connection.ExecuteAsync(
                @"""
                UPDATE inbox_messages
                SET processed_on_utc = v.processed_on_utc,
                    error = v.error
                FROM UNNEST(@Ids, @ProcessedAts, @Errors)
                    AS v(id, processed_on_utc, error)
                WHERE inbox_messages.id = v.id
                """,
                new
                {
                    Ids = results.Select(r => r.Id).ToArray(),
                    ProcessedAts = results.Select(r => r.ProcessedAt).ToArray(),
                    Errors = results.Select(r => r.Error).ToArray()
                },
                transaction: transaction);
        }

        await transaction.CommitAsync(cancellationToken);

        return messages.Count;
    }
}
```

- **`FOR UPDATE SKIP LOCKED`** lets multiple processor instances run concurrently without contention. I covered this in [**scaling the Outbox pattern**](/milanjovanovic.tech/scaling-the-outbox-pattern.md).
- **Batch update with `UNNEST`** writes all results in a single round-trip using the same [**bulk update approach**](/milanjovanovic.tech/optimizing-bulk-database-updates-in-dotnet.md).
- **Error capture**: failed messages get marked with the exception so they don't block the queue.

If the process crashes mid-batch, the transaction rolls back and messages get picked up on the next run.

---

## Things to Watch Out For

### Table growth

The inbox table grows indefinitely. Delete processed messages after a retention period, or partition by time range and drop old partitions. You can also archive them to another table if you need to keep a history.

### Poison messages

If a message consistently fails, it gets marked with an error each time. Consider a max retry count. After N failures, dead-letter it and alert.

### Ordering

`ORDER BY received_on_utc` gives you rough arrival-time ordering. But with `SKIP LOCKED` and multiple processors, strict ordering is **not** guaranteed. If you need [**per-aggregate ordering**](/milanjovanovic.tech/solving-message-ordering-from-first-principles.md), you'll need additional coordination.

### Monitoring

Track the lag between `received_on_utc` and `processed_on_utc`. If this gap grows, increase the batch size, decrease the polling interval, or scale out more processor instances.

---

## Inbox vs. Idempotent Consumer

Both the Inbox and the [**Idempotent Consumer**](/milanjovanovic.tech/idempotent-consumer-handling-duplicate-messages.md) prevent duplicate processing. The difference is *when* processing happens and *who controls* retries.

The [**Idempotent Consumer**](/milanjovanovic.tech/the-idempotent-consumer-pattern-in-dotnet-and-why-you-need-it.md) processes messages inline. It checks a deduplication table, does the work, and records the dedup entry in the same transaction. If processing fails, the transaction rolls back, no dedup record is written, and the **broker** redelivers the message on its own schedule. You don't control retry timing or backoff.

The Inbox separates reception from processing. The consumer writes the message and ACKs immediately. The broker is done. If the processor fails, it records the error and moves on. Retries are your responsibility: reset `processed_on_utc` to `NULL` for messages under a retry threshold, or run a separate loop that picks up failed messages after a delay.

Use the **Idempotent Consumer** when your side effects are transactional and broker-managed retries are good enough. Use the **Inbox** when you need batching, custom retry policies, or horizontal scaling via `FOR UPDATE SKIP LOCKED`.

---

## Summary

The Inbox pattern is the consumer-side counterpart to the [**Outbox pattern**](/milanjovanovic.tech/implementing-the-outbox-pattern.md).

- **`ON CONFLICT DO NOTHING`** makes consumer inserts idempotent
- **Separation of reception and processing** gives you independent retry control
- **`FOR UPDATE SKIP LOCKED`** enables horizontal scaling of the processor
- **Batch updates with `UNNEST`** minimize database round-trips

If you want to see how I build [**event-driven systems**](/milanjovanovic.tech/event-driven-architecture-in-dotnet-with-rabbitmq.md) with these patterns, check out [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Implementing the Inbox Pattern for Reliable Message Consumption",
  "desc": "The Outbox pattern guarantees reliable publishing. But what about the consumer side? The Inbox pattern ensures each incoming message is processed exactly once, even when the broker retries or delivers duplicates. Here's how to implement it in .NET with MassTransit and PostgreSQL.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-the-inbox-pattern-for-reliable-message-consumption.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
