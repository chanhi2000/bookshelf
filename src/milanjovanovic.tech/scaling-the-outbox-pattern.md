---
lang: en-US
title: "Scaling the Outbox Pattern (2B+ messages per day)"
description: "Article(s) > Scaling the Outbox Pattern (2B+ messages per day)"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - postgres
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scaling the Outbox Pattern (2B+ messages per day)"
    - property: og:description
      content: "Scaling the Outbox Pattern (2B+ messages per day)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scaling-the-outbox-pattern.html
prev: /programming/cs/articles/README.md
date: 2024-10-12
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_111.png
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
  name="Scaling the Outbox Pattern (2B+ messages per day)"
  desc="Learn how to supercharge your Outbox pattern implementation, scaling to 30,500 messages per second. Through strategic optimizations in database queries, message publishing, and parallel processing, I'll show you how to handle over 2.8 billion messages daily while maintaining system reliability."
  url="https://milanjovanovic.tech/blog/scaling-the-outbox-pattern"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_111.png"/>

In last week's newsletter, I talked about [implementing the Outbox pattern](/milanjovanovic.tech/implementing-the-outbox-pattern.md). It's a crucial tool for reliable distributed messaging. But implementing it is just the first step.

The real challenge? Scaling it to handle massive message volumes.

Today, we're taking it up a notch. We'll start with a basic Outbox processor and transform it into a high-performance engine capable of handling over 2 billion messages daily.

Let's dive in!

---

## Starting Point

This is our starting point. We have an `OutboxProcessor` that polls for unprocessed messages and publishes them to a queue. The first few things we can tweak are the **frequency** and **batch size**.

```cs title="OutboxProcessor.cs"
internal sealed class OutboxProcessor(NpgsqlDataSource dataSource, IPublishEndpoint publishEndpoint)
{
    private const int BatchSize = 1000;

    public async Task<int> Execute(CancellationToken cancellationToken = default)
    {
        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        var messages = await connection.QueryAsync<OutboxMessage>(
            @"""
            SELECT *
            FROM outbox_messages
            WHERE processed_on_utc IS NULL
            ORDER BY occurred_on_utc LIMIT @BatchSize
            """,
            new { BatchSize },
            transaction: transaction);

        foreach (var message in messages)
        {
            try
            {
                var messageType = Messaging.Contracts.AssemblyReference.Assembly.GetType(message.Type);
                var deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType);

                await publishEndpoint.Publish(deserializedMessage, messageType, cancellationToken);

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

        await transaction.CommitAsync(cancellationToken);

        return messages.Count;
    }
}
```

Let's assume that we run the `OutboxProcessor` continuously. I increased that batch size to `1000`.

How many messages are we able to process?

I'll run the Outbox processing for 1 minute and count how many messages were processed.

The baseline implementation processed $81,000$ messages in one minute or $1,350\text{ MPS}$ (messages per second).

Not bad, but let's see how much we can improve this.

---

## Measuring Each Step

You can't improve what you can't measure. Right? So, I'll use a `Stopwatch` to measure the total execution time and the time each step takes.

Notice that I also split the publish and update steps. It's so I can measure the time for publishing and updating separately. This will be important later because I want to optimize each step separately.

With the baseline implementation, here are the execution times for each step:

- Query time: ~$70\text{ ms}$
- Publish time: ~$320\text{ ms}$
- Update time: ~$300\text{ ms}$

```cs{13-14,26,56,70,75} title="OutboxProcessor.cs"
internal sealed class OutboxProcessor(
    NpgsqlDataSource dataSource,
    IPublishEndpoint publishEndpoint,
    ILogger<OutboxProcessor> logger)
{
    private const int BatchSize = 1000;

    public async Task<int> Execute(CancellationToken cancellationToken = default)
    {
        var totalStopwatch = Stopwatch.StartNew();
        var stepStopwatch = new Stopwatch();

        await using var connection = await dataSource.OpenConnectionAsync(cancellationToken);
        await using var transaction = await connection.BeginTransactionAsync(cancellationToken);

        stepStopwatch.Restart();
        var messages = (await connection.QueryAsync<OutboxMessage>(
            @"""
            SELECT *
            FROM outbox_messages
            WHERE processed_on_utc IS NULL
            ORDER BY occurred_on_utc LIMIT @BatchSize
            """,
            new { BatchSize },
            transaction: transaction)).AsList();
        var queryTime = stepStopwatch.ElapsedMilliseconds;

        var updateQueue = new ConcurrentQueue<OutboxUpdate>();

        stepStopwatch.Restart();
        foreach (var message in messages)
        {
            try
            {
                var messageType = Messaging.Contracts.AssemblyReference.Assembly.GetType(message.Type);
                var deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType);

                await publishEndpoint.Publish(deserializedMessage, messageType, cancellationToken);

                updateQueue.Enqueue(new OutboxUpdate
                {
                    Id = message.Id,
                    ProcessedOnUtc = DateTime.UtcNow
                });
            }
            catch (Exception ex)
            {
                updateQueue.Enqueue(new OutboxUpdate
                {
                    Id = message.Id,
                    ProcessedOnUtc = DateTime.UtcNow,
                    Error = ex.ToString()
                });
            }
        }
        var publishTime = stepStopwatch.ElapsedMilliseconds;

        stepStopwatch.Restart();
        foreach (var outboxUpdate in updateQueue)
        {
            await connection.ExecuteAsync(
                @"""
                UPDATE outbox_messages
                SET processed_on_utc = @ProcessedOnUtc, error = @Error
                WHERE id = @Id
                """,
                outboxUpdate,
                transaction: transaction);
        }
        var updateTime = stepStopwatch.ElapsedMilliseconds;

        await transaction.CommitAsync(cancellationToken);

        totalStopwatch.Stop();
        var totalTime = totalStopwatch.ElapsedMilliseconds;

        OutboxLoggers.Processing(logger, totalTime, queryTime, publishTime, updateTime, messages.Count);

        return messages.Count;
    }

    private struct OutboxUpdate
    {
        public Guid Id { get; init; }
        public DateTime ProcessedOnUtc { get; init; }
        public string? Error { get; init; }
    }
}
```

Now, onto the fun part!

---

## Optimizing Read Queries

The first thing I want to optimize is the query for fetching unprocessed messages. Performing a `SELECT *` query will have an impact if we don't need all the columns (hint: we don't).

Here's the current SQL query:

```sql
SELECT *
FROM outbox_messages
WHERE processed_on_utc IS NULL
ORDER BY occurred_on_utc LIMIT @BatchSize
```

We can modify the query to return only the columns we need. This will save us some bandwidth but will not significantly improve performance.

```sql
SELECT id AS Id, type AS Type, content as Content
FROM outbox_messages
WHERE processed_on_utc IS NULL
ORDER BY occurred_on_utc LIMIT @BatchSize
```

Let's examine the execution plan for this query. You'll see it's performing a table scan. I'm running this on PostgreSQL, and here's what I get from `EXPLAIN ANALYZE`:

```sql
EXPLAIN ANALYZE
--
-- Limit  (cost=86169.40..86286.08 rows=1000 width=129) (actual time=122.744..124.234 rows=1000 loops=1)
--   ->  Gather Merge  (cost=86169.40..245080.50 rows=1362000 width=129) (actual time=122.743..124.198 rows=1000 loops=1)
--         Workers Planned: 2
--         Workers Launched: 2
--         ->  Sort  (cost=85169.38..86871.88 rows=681000 width=129) (actual time=121.478..121.492 rows=607 loops=3)
--               Sort Key: occurred_on_utc
--               Sort Method: top-N heapsort  Memory: 306kB
--               Worker 0:  Sort Method: top-N heapsort  Memory: 306kB
--               Worker 1:  Sort Method: top-N heapsort  Memory: 306kB
--               ->  Parallel Seq Scan on outbox_messages  (cost=0.00..47830.88 rows=681000 width=129) (actual time=0.016..67.481 rows=666667 loops=3)
--                    Filter: (processed_on_utc IS NULL)
-- Planning Time: 0.051 ms
-- Execution Time: 124.298 ms
--
```

Now, I'll create an index that "covers" the query for fetching unprocessed messages. A covered index contains all the columns needed to satisfy a query without accessing the table itself.

The index will be on the `occurred_on_utc` and `processed_on_utc` columns. It will include the `id`, `type`, and `content` columns. Lastly, we'll apply a filter to index unprocessed messages only.

```sql
CREATE INDEX IF NOT EXISTS idx_outbox_messages_unprocessed
ON public.outbox_messages (occurred_on_utc, processed_on_utc)
INCLUDE (id, type, content)
WHERE processed_on_utc IS NULL
```

Let me explain the reasoning behind each decision:

- Indexing the `occurred_on_utc` will store the entries in the index in ascending order. This matches the `ORDER BY occurred_on_utc` statement in the query. This means the query can scan the index without sorting the results. The results are already in the correct sort order.
- Including the columns we select in the index allows us to return them from the index entry. This avoids reading the values from the table rows.
- Filtering for unprocessed messages in the index satisfies the `WHERE processed_on_utc IS NULL` statement.

::: tip Caveat

PostgreSQL has a maximum index row size of **2712B** (don't ask how I know). The columns in the `INCLUDE` list are also part of the index row (B-tree tuple). The `content` column contains the serialized JSON message, so it's the most likely culprit to make us exceed this limit. There's no way around it, so my advice is to keep your messages as small as possible. You could exclude this column from the `INCLUDE` list for a minor performance hit.

:::

Here's the updated execution plan after creating this index:

```sql
EXPLAIN ANALYZE
-- 
-- Limit  (cost=0.43..102.82 rows=1000 width=129) (actual time=0.016..0.160 rows=1000 loops=1)
--   ->  Index Only Scan using idx_outbox_messages_unprocessed on outbox_messages  (cost=0.43..204777.36 rows=2000000 width=129) (actual time=0.015..0.125 rows=1000 loops=1)
--         Heap Fetches: 0
-- Planning Time: 0.059 ms
-- Execution Time: 0.189 ms
--
```

Because we have a covered index, the execution plan only contains an `Index Only Scan` and `Limit` operation. There's no filtering or sorting that needs to happen, which is why we see a massive performance improvement.

What's the performance impact on the query time?

- Query time: $70 \text{ ms}$ → $1 \text{ ms}$ ($-98.5\%$)

---

## Optimizing Message Publishing

The next thing we can optimize is how we're publishing messages to the queue. I'm using the `IPublishEndpoint` from MassTransit to publish to RabbitMQ.

To be more precise here, we're publishing to an exchange. The exchange will then route the message to the appropriate queue.

But how can we optimize this?

A micro-optimization we can do is introduce a cache for the message types used in serialization. Performing reflection constantly for every message type is expensive, so we'll do the reflection once, and store the result.

```cs
var messageType = Messaging.Contracts.AssemblyReference.Assembly.GetType(message.Type);
```

The cache can be a `ConcurrentDictionary`, and we'll use `GetOrAdd` to retrieve the cached types.

I'll extract this piece of code to the `GetOrAddMessageType` helper method:

```cs
private static readonly ConcurrentDictionary<string, Type> TypeCache = new();

private static Type GetOrAddMessageType(string typeName)
{
    return TypeCache.GetOrAdd(
        typeName,
        name => Messaging.Contracts.AssemblyReference.Assembly.GetType(name));
}
```

This is what our message publishing step looks like. The biggest problem is we're waiting for the `Publish` to complete by awaiting it. The `Publish` takes some time because it's waiting for confirmation from the message broker. We're doing this in a loop, which makes it even less efficient.

```cs
var updateQueue = new ConcurrentQueue<OutboxUpdate>();

foreach (var message in messages)
{
    try
    {
        var messageType = Messaging.Contracts.AssemblyReference.Assembly.GetType(message.Type);
        var deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType);

        // We're waiting for the message broker confirmation here.
        await publishEndpoint.Publish(deserializedMessage, messageType, cancellationToken);

        updateQueue.Enqueue(new OutboxUpdate
        {
            Id = message.Id,
            ProcessedOnUtc = DateTime.UtcNow
        });
    }
    catch (Exception ex)
    {
        updateQueue.Enqueue(new OutboxUpdate
        {
            Id = message.Id,
            ProcessedOnUtc = DateTime.UtcNow,
            Error = ex.ToString()
        });
    }
}
```

We can improve this by publishing the messages in a batch. In fact, the `IPublishEndpoint` has a `PublishBatch` extension method. If we peek inside, here's what we'll find:

```cs
// MassTransit implementation
public static Task PublishBatch(
    this IPublishEndpoint endpoint,
    IEnumerable<object> messages,
    CancellationToken cancellationToken = default)
{
    return Task.WhenAll(messages.Select(x => endpoint.Publish(x, cancellationToken)));
}
```

So we can transform the collection of messages into a list of publishing tasks that we can await using `Task.WhenAll`.

```cs
var updateQueue = new ConcurrentQueue<OutboxUpdate>();

var publishTasks = messages
    .Select(message => PublishMessage(message, updateQueue, publishEndpoint, cancellationToken))
    .ToList();

await Task.WhenAll(publishTasks);

// I extracted the message publishing into a separate method for readability.
private static async Task PublishMessage(
    OutboxMessage message,
    ConcurrentQueue<OutboxUpdate> updateQueue,
    IPublishEndpoint publishEndpoint,
    CancellationToken cancellationToken)
{
    try
    {
        var messageType = GetOrAddMessageType(message.Type);
        var deserializedMessage = JsonSerializer.Deserialize(message.Content, messageType);

        await publishEndpoint.Publish(deserializedMessage, messageType, cancellationToken);

        updateQueue.Enqueue(new OutboxUpdate
        {
            Id = message.Id,
            ProcessedOnUtc = DateTime.UtcNow
        });
    }
    catch (Exception ex)
    {
        updateQueue.Enqueue(new OutboxUpdate
        {
            Id = message.Id,
            ProcessedOnUtc = DateTime.UtcNow,
            Error = ex.ToString()
        });
    }
}
```

What's the improvement for the message publishing step?

- Publish time: $320 \text{ ms}$ → $289 \text{ ms}$ $\left(-9.8\%\right)$

As you can see, it's not significantly faster. But this is needed for us to benefit from other optimizations I have in store.

---

## Optimizing Update Queries

The next step in our optimization journey is addressing the query updating the processed Outbox messages.

The current implementation is inefficient because we send one query to the database for each Outbox message.

```cs
foreach (var outboxUpdate in updateQueue)
{
    await connection.ExecuteAsync(
        @"""
        UPDATE outbox_messages
        SET processed_on_utc = @ProcessedOnUtc, error = @Error
        WHERE id = @Id
        """,
        outboxUpdate,
        transaction: transaction);
}
```

If you didn't get the memo by now, batching is the name of the game. We want a way to send one large `UPDATE` query to the database.

We have to construct the SQL for this batch query manually. We'll use the `DynamicParameters` type from Dapper to provide all the parameters.

```cs
var updateSql =
    @"""
    UPDATE outbox_messages
    SET processed_on_utc = v.processed_on_utc,
        error = v.error
    FROM (VALUES
        {0}
    ) AS v(id, processed_on_utc, error)
    WHERE outbox_messages.id = v.id::uuid
    """;

var updates = updateQueue.ToList();
var paramNames = string.Join(",", updates.Select((_, i) => $"(@Id{i}, @ProcessedOn{i}, @Error{i})"));

var formattedSql = string.Format(updateSql, paramNames);

var parameters = new DynamicParameters();

for (int i = 0; i < updates.Count; i++)
{
    parameters.Add($"Id{i}", updates[i].Id.ToString());
    parameters.Add($"ProcessedOn{i}", updates[i].ProcessedOnUtc);
    parameters.Add($"Error{i}", updates[i].Error);
}

await connection.ExecuteAsync(formattedSql, parameters, transaction: transaction);
```

This will produce a SQL query that looks something like this:

```sql
UPDATE outbox_messages
SET processed_on_utc = v.processed_on_utc,
    error = v.error
FROM (VALUES
    (@Id0, @ProcessedOn0, @Error0),
    (@Id1, @ProcessedOn1, @Error1),
    (@Id2, @ProcessedOn2, @Error2),
    -- A few hundred rows in beteween
    (@Id999, @ProcessedOn999, @Error999)
) AS v(id, processed_on_utc, error)
WHERE outbox_messages.id = v.id::uuid
```

Instead of sending one update query per message, we can send one query to update all messages.

This will obviously give us a noticeable performance benefit:

- Update time:  $300\text{ ms}$ → $52 \text{ ms}$ $\left(-82.6\%\right)$

---

## How Far Did We Get?

Let's test out the performance improvement with the current optimizations. The changes we made so far focus on improving the speed of the `OutboxProcessor`.

Here are the rough numbers I'm seeing for the individual steps:

- Query time: ~$1 \text{ ms}$
- Publish time: ~$289 \text{ ms}$
- Update time: ~$52 \text{ ms}$

I'll run the Outbox processing for 1 minute and count the number of processed messages.

The optimized implementation processed $162,000$ messages in one minute or $2,700 MPS$.

For reference, this allows us to process more than 230 million messages per day.

But we're just getting started.

---

## Parallel Outbox Processing

If we want to take this further, we have to scale out the `OutboxProcessor`. The problem we could face here is processing the same message more than once. So, we need to implement some form of locking on the current batch of messages.

PostgreSQL has a convenient `FOR UPDATE` statement that we can use here. It will lock the selected rows for the duration of the current transaction. However, we must add the `SKIP LOCKED` statement to allow other queries to skip the locked rows. Otherwise, any other query will be blocked until the current transaction is completed.

Here's the updated query:

```sql
SELECT id AS Id, type AS Type, content as Content
FROM outbox_messages
WHERE processed_on_utc IS NULL
ORDER BY occurred_on_utc LIMIT @BatchSize
FOR UPDATE SKIP LOCKED
```

To scale out the `OutboxProcessor`, we simply run multiple instances of the background job.

I'll simulate this using `Parallel.ForEachAsync`, where I can control the `MaxDegreeOfParallelism`.

```cs
var parallelOptions = new ParallelOptions
{
    MaxDegreeOfParallelism = _maxParallelism,
    CancellationToken = cancellationToken
};

await Parallel.ForEachAsync(
    Enumerable.Range(0, _maxParallelism),
    parallelOptions,
    async (_, token) =>
    {
        await ProcessOutboxMessages(token);
    });
```

We can process $179,000$ messages in one minute or $2,983\text{ MPS}$ with five (5) workers.

I thought this was supposed to be *much* faster. What gives?

Without parallel processing, we were able to get ~$2,700\text{ MPS}$.

A new **bottleneck** appears: publishing the messages in batches.

The publish time went from $~289\text{ ms}$ to $~1,540\text{ ms}$.

Interestingly, if you multiply the base publish time (for one worker) by the number of workers, you roughly get to the new publish time.

We're wasting a lot of time waiting for the acknowledgment from the message broker.

How can we fix this?

---

## Batching Message Publishing

RabbitMQ supports publishing messages in batches. We can enable this feature when configuring MassTransit by calling the `ConfigureBatchPublish` method. MassTransit will buffer messages before sending them to RabbitMQ, to increase throughput.

```cs
builder.Services.AddMassTransit(x =>
{
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration.GetConnectionString("Queue"), hostCfg =>
        {
            hostCfg.ConfigureBatchPublish(batch =>
            {
                batch.Enabled = true;
            });
        });

        cfg.ConfigureEndpoints(context);
    });
});
```

With only this small change, let's rerun our test with five workers.

This time around, we're able to process $1,956,000$ messages in one minute.

Which gives us a blazing ~$32,500\text{ MPS}$.

This is more than 2.8 billion processed messages per day.

I could call it a day here, but there's one more thing I want to show you.

---

## Turning Off Publisher Confirmation (Dangerous)

One more thing you *can* do (**which I don't recommend**) is turn off publisher confirmation. This means that calling `Publish` won't wait until the message is confirmed by the broker (ack'd). It could lead to **reliability issues** and potentially **losing messages**.

That being said, I did manage to get ~37,000 MPS with publisher confirmation turned off.

```cs
cfg.Host(builder.Configuration.GetConnectionString("Queue"), hostCfg =>
{
    hostCfg.PublisherConfirmation = false; // Dangerous. I don't recommend it.
    hostCfg.ConfigureBatchPublish(batch =>
    {
        batch.Enabled = true;
    });
});
```

---

## Key Considerations for Scaling

While we've achieved impressive throughput, consider these factors when implementing these techniques in a real-world system:

1. **Consumer Capacity**: Can your consumers keep up? Boosting producer throughput without matching consumer capacity can create backlogs. Consider the entire pipeline when scaling.
2. **Delivery Guarantees**: Our optimizations maintain at-least-once delivery. Design consumers to be idempotent to handle occasional duplicate messages.
3. **Message Ordering**: Parallel processing with `FOR UPDATE SKIP LOCKED` may cause out-of-order messages. For strict ordering, consider the **Inbox pattern** on the consumer side to buffer messages. An Inbox allows us to process messages in the correct order, even if they arrive out of sequence.
4. **Reliability vs. Performance Trade-offs**: Turning off publisher confirmation increases speed but risks message loss. Weigh performance against reliability based on your specific needs.

By addressing these factors, you'll create a high-performance Outbox processor that integrates smoothly with your system architecture.

---

## Summary

We've come a long way from our initial Outbox processor. Here's what we accomplished:

1. Optimized database queries with smart indexing
2. Improved message publishing with batching
3. Streamlined database updates with batching
4. Scaled out Outbox processing with parallel workers
5. Leveraged RabbitMQ's batch publishing feature

The result? We boosted processing from 1,350 messages per second to an impressive $32,500 MPS$. That's over 2.8 billion messages per day!

Scaling isn't just about raw speed - it's about identifying and addressing bottlenecks at each step. By measuring, optimizing, and rethinking our approach, we achieved massive performance gains.

That's all for today. Hope this was helpful.

::: info P.S.

You can find the [source code (<FontIcon icon="iconfont icon-github"/>`m-jovanovic/outbox-scaling`)](https://github.com/m-jovanovic/outbox-scaling) here.

<SiteInfo
  name="m-jovanovic/outbox-scaling"
  desc="Demonstrating how to scale the Outbox Pattern to 2B+ messages per day (~30,000 messages per second). - m-jovanovic/outbox-scaling"
  url="https://github.com/m-jovanovic/outbox-scaling/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7f2f26352f48833b44d3e83bbdfedd65d9a9d88a8bde744ea74721acb9cd2a22/m-jovanovic/outbox-scaling"/>

:::

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scaling the Outbox Pattern (2B+ messages per day)",
  "desc": "Learn how to supercharge your Outbox pattern implementation, scaling to 30,500 messages per second. Through strategic optimizations in database queries, message publishing, and parallel processing, I'll show you how to handle over 2.8 billion messages daily while maintaining system reliability.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scaling-the-outbox-pattern.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
