---
lang: en-US
title: "Implementing the Outbox Pattern"
description: "Article(s) > Implementing the Outbox Pattern"
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
      content: "Article(s) > Implementing the Outbox Pattern"
    - property: og:description
      content: "Implementing the Outbox Pattern"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-the-outbox-pattern.html
prev: /programming/cs/articles/README.md
date: 2024-10-05
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_110.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Implementing the Outbox Pattern"
  desc="Discover how the Outbox pattern solves the dual-write problem in distributed systems, ensuring data consistency between your database and external components. This article provides practical strategies for implementing and scaling the Outbox pattern in .NET applications."
  url="https://milanjovanovic.tech/blog/implementing-the-outbox-pattern"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_110.png"/>

In distributed systems, we often face the challenge of keeping our database and external systems in sync. Imagine saving an order to a database and then publishing a message to a message broker. If either operation fails, your system ends up in an inconsistent state.

The [Outbox pattern](/milanjovanovic.tech/outbox-pattern-for-reliable-microservices-messaging.md) solves this problem by treating message publication as part of your database transaction. Instead of publishing messages directly, we save them to an Outbox table in our database, ensuring atomic operations. A separate process then reliably publishes these messages.

In this newsletter, we'll dive into implementing this pattern in .NET, covering everything from setup to scaling.

---

## Why Do We Need the Outbox Pattern?

The transactional Outbox pattern fixes a common problem in distributed systems. This problem happens when you need to do two things at once: save data and communicate with an external component.

Consider scenarios like sending order confirmation emails, notifying other systems about new client registrations, or updating inventory levels after an order is placed. Each of these involves a local data change coupled with an external communication or update.

For example, imagine a microservice that needs to:

- Save a new order in its database
- Tell other systems about this new order

If one of these steps fails, your system could end up in an inconsistent state. Maybe the order is saved, but no one else knows about it. Or everyone thinks there's a new order, but it's not actually in the database.

Here's a `CreateOrderCommandHandler` without the Outbox pattern:

```cs title="CreateOrderCommandHandler.cs"
public class CreateOrderCommandHandler(
    IOrderRepository orderRepository,
    IProductInventoryChecker inventoryChecker,
    IUnitOfWork unitOfWork,
    IEventBus eventBus) : IRequestHandler<CreateOrderCommand, OrderDto>
{
    public async Task<OrderDto> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var order = new Order(request.CustomerId, request.ProductId, request.Quantity, inventoryChecker);

        await orderRepository.AddAsync(order);

        await unitOfWork.CommitAsync(cancellationToken);

        // The database transaction is completed at this point.

        await eventBus.Send(new OrderCreatedIntegrationEvent(order.Id));

        return new OrderDto { Id = order.Id, Total = order.Total };
    }
}
```

This code has a potential consistency problem. After the database transaction is committed, two things could go wrong:

1. The application might crash right after the transaction is committed but before the event is sent. The order would be created in the database, but other systems wouldn't know about it.
2. The event bus might be down or unreachable when we try to send the event. This would result in the order being created without notifying other systems.

The transactional Outbox pattern helps solve this problem by ensuring that the database update and event publication are treated as a single atomic operation.

![Flow diagram explaining how the Outbox Pattern works.](https://milanjovanovic.tech/blogs/mnw_110/outbox_pattern.png?imwidth=3840)

The sequence diagram illustrates how the Outbox pattern solves our consistency challenge. Instead of trying to save data and send a message as separate steps, we save both the order and an Outbox message in a **single database transaction**. This is an all-or-nothing operation - we can't end up in an inconsistent state.

A separate Outbox processor handles the actual message sending. It continuously checks for unsent messages in the Outbox table and publishes them to the message queue. The processor marks messages as sent after successful publishing, preventing duplicates.

An important thing to realize here is that the Outbox pattern gives us [<FontIcon icon="fas fa-globe"/>at-least-once delivery](https://cloudcomputingpatterns.org/at_least_once_delivery/). The Outbox message will be sent at least once, but it could also be sent multiple times in case of retries. This means we have to make our message consumers idempotent.

---

## Implementing the Outbox Pattern

First, let's create our Outbox table where we will store messages:

```sql
CREATE TABLE outbox_messages (
    id UUID PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    occurred_on_utc TIMESTAMP WITH TIME ZONE NOT NULL,
    processed_on_utc TIMESTAMP WITH TIME ZONE NULL,
    error TEXT NULL
);

-- We can consider adding this index since we will be querying for unprocessed messages often
-- and it will contain the rows in the correct sort order for our query.
CREATE INDEX IF NOT EXISTS idx_outbox_messages_unprocessed
ON outbox_messages (occurred_on_utc, processed_on_utc)
INCLUDE (id, type, content)
WHERE processed_on_utc IS NULL;
```

I'll use PostgreSQL as the database for this example. Notice the `jsonb` type for the `content` column. It allows for indexing and querying of the JSON data if needed in the future.

Now, let's create a class to represent our Outbox entry:

```cs title="OutboxMessage.cs"
public sealed class OutboxMessage
{
    public Guid Id { get; init; }
    public string Type { get; init; }
    public string Content { get; init; }
    public DateTime OccurredOnUtc { get; init; }
    public DateTime? ProcessedOnUtc { get; init; }
    public string? Error { get; init; }
}
```

Here's how we can add a message to the Outbox:

```cs title="AddToOutbox.cs"
public async Task AddToOutbox<T>(T message, NpgsqlDataSource dataSource)
{
    var outboxMessage = new OutboxMessage
    {
        Id = Guid.NewGuid(),
        OccurredOnUtc = DateTime.UtcNow,
        Type = typeof(T).FullName, // We'll need this for deserialization
        Content = JsonSerializer.Serialize(message)
    };

    await using var connection = await dataSource.OpenConnectionAsync();
    await connection.ExecuteAsync(
        @"""
        INSERT INTO outbox_messages (id, occurred_on_utc, type, content)
        VALUES (@Id, @OccurredOnUtc, @Type, @Content::jsonb)
        """,
        outboxMessage);
}
```

An elegant approach to implementing this is using [domain events](/milanjovanovic.tech/how-to-use-domain-events-to-build-loosely-coupled-systems.md) to represent notifications. When something significant happens in the domain, we will raise a domain event. Before completing the transaction, we can pick up all events and store them as Outbox messages. You could do this from the unit of work or with an [EF Core interceptor](/milanjovanovic.tech/how-to-use-ef-core-interceptors.md).

---

## Processing the Outbox

The Outbox processor is the next component we'll need. This could be a *physically* separate process or a background worker in the same process.

I'll use Quartz to [schedule background jobs](/milanjovanovic.tech/scheduling-background-jobs-with-quartz-net.md) for Outbox processing. It's a robust library with excellent support for scheduling recurring jobs.

Now, let's implement the `OutboxProcessorJob`:

```cs title="OutboxProcessorJob.cs"
[DisallowConcurrentExecution]
public class OutboxProcessorJob(
    NpgsqlDataSource dataSource,
    IPublishEndpoint publishEndpoint,
    Assembly integrationEventsAssembly) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        await using var connection = await dataSource.OpenConnectionAsync();
        await using var transaction = await connection.BeginTransactionAsync();

        // You can make the limit a parameter, to control the batch size.
        // We can also select just the id, type, and content columns.
        var messages = await connection.QueryAsync<OutboxMessage>(
            @"""
            SELECT id AS Id, type AS Type, content AS Content
            FROM outbox_messages
            WHERE processed_on_utc IS NULL
            ORDER BY occurred_on_utc LIMIT 100
            """,
            transaction: transaction);

        foreach (var message in messages)
        {
            try
            {
                var messageType = integrationEventsAssembly.GetType(message.Type);
                var deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType);

                // We should introduce retries here to improve reliability.
                await publishEndpoint.Publish(deserializedMessage);

                await connection.ExecuteAsync(
                    @"""
                    UPDATE outbox_messages
                    SET processed_on_utc = @ProcessedOnUtc
                    WHERE id = @Id
                    """,
                    new { ProcessedOnUtc = DateTime.UtcNow, message.Id },
                    transaction: transaction);
            }
            catch (Exception ex)
            {
                // We can also introduce error logging here.

                await connection.ExecuteAsync(
                    @"""
                    UPDATE outbox_messages
                    SET processed_on_utc = @ProcessedOnUtc, error = @Error
                    WHERE id = @Id
                    """,
                    new { ProcessedOnUtc = DateTime.UtcNow, Error = ex.ToString(), message.Id },
                    transaction: transaction);
            }
        }

        await transaction.CommitAsync();
    }
}
```

This approach uses polling to periodically fetch unprocessed messages from the database. Polling can increase the load on the database, as we'll need to query for unprocessed messages frequently.

An alternative way to process Outbox messages is by using [<FontIcon icon="fas fa-globe"/>Transaction log tailing](https://microservices.io/patterns/data/transaction-log-tailing.html). We can implement this using [<FontIcon icon="fas fa-globe"/>Postgres logical replication](https://npgsql.org/doc/replication.html). The database will stream changes from the Write-Ahead Log (WAL) to our application, and we'll process these messages and publish them to the message broker. You can use this to implement a push-based Outbox processor.

---

## Considerations and Tradeoffs

The Outbox pattern, while effective, introduces additional complexity and database writes. In high-throughput systems, it's crucial to monitor its performance to ensure it doesn't become a bottleneck.

I recommend implementing retry mechanisms in the Outbox processor to [improve reliability](/milanjovanovic.tech/building-resilient-cloud-applications-with-dotnet.md). Consider using exponential backoff for transient failures and a circuit breaker for persistent issues to prevent system overload during outages.

It's essential that you implement [idempotent message consumers](/milanjovanovic.tech/idempotent-consumer-handling-duplicate-messages.md). Network issues or processor restarts can lead to multiple deliveries of the same message, so your consumers must handle repeated processing safely.

Over time, the Outbox table can grow significantly, potentially impacting database performance. It's important to implement an archiving strategy early on. Consider moving processed messages to cold storage or deleting them after a set period.

---

## Scaling Outbox Processing

As your system grows, you may find that a single Outbox processor can't keep up with the volume of messages. This can lead to increased latency between when an event occurs and when it's processed by consumers.

One straightforward approach is to increase the frequency of the Outbox processor job. You should consider running it every few seconds. This can significantly reduce the delay in message processing.

Another effective strategy is to increase the batch size when fetching unprocessed messages. By processing more messages in each run, you can improve throughput. However, be cautious not to make the batches so large that they cause long-running transactions.

For high-volume systems, processing the Outbox in parallel can be very effective. Implement a locking mechanism to claim batches of messages, allowing multiple processors to work simultaneously without conflict. You can use `SELECT ... FOR UPDATE SKIP LOCKED` to claim a batch of messages. This approach can dramatically increase your processing capacity.

---

## Wrapping Up

The Outbox pattern is a powerful tool for maintaining data consistency in distributed systems. By decoupling database operations from message publishing, the Outbox pattern ensures that your system remains reliable even in the face of failures.

Remember to keep your consumers idempotent, implement proper scaling strategies, and manage your Outbox table growth.

While it adds some complexity, the benefits of guaranteed message delivery make it a valuable pattern in many scenarios.

If you're looking to implement the Outbox pattern in a robust, production-ready way, you can check out [Pragmatic Clean Architecture](/milanjovanovic.tech/pragmatic-clean-architecture/README.md). It includes an entire section on implementing the Outbox pattern, along with other essential patterns for building maintainable and scalable .NET applications.

That's all for today. Stay awesome, and I'll see you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Implementing the Outbox Pattern",
  "desc": "Discover how the Outbox pattern solves the dual-write problem in distributed systems, ensuring data consistency between your database and external components. This article provides practical strategies for implementing and scaling the Outbox pattern in .NET applications.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-the-outbox-pattern.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
