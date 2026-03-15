---
lang: en-US
title: "Optimizing Bulk Database Updates in .NET: From Naive to Lightning-Fast"
description: "Article(s) > Optimizing Bulk Database Updates in .NET: From Naive to Lightning-Fast"
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
      content: "Article(s) > Optimizing Bulk Database Updates in .NET: From Naive to Lightning-Fast"
    - property: og:description
      content: "Optimizing Bulk Database Updates in .NET: From Naive to Lightning-Fast"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/optimizing-bulk-database-updates-in-dotnet.html
prev: /programming/cs/articles/README.md
date: 2026-03-14
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_185.png
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
  name="Optimizing Bulk Database Updates in .NET: From Naive to Lightning-Fast"
  desc=".NET • ASP.NET Core • Software Architecture"
  url="https://milanjovanovic.tech/blog/optimizing-bulk-database-updates-in-dotnet"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_185.png"/>

Every outbox processor, job queue, and batch pipeline hits the same problem at some point: mark a set of rows as done in bulk.

I went through this recently while optimizing an outbox processor. I measured seven different approaches against 1,000, 10,000, and 25,000 rows in PostgreSQL. At 10,000 rows the slowest approach took 2,414ms and the fastest took 41ms. The bottleneck was almost never the SQL. It was how many times the code was talking to the database.

The scenario: mark a batch of orders as processed by setting a status and a **unique** `processed_at` timestamp per row. That uniqueness constraint is what makes it tricky. You can't use a simple `UPDATE ... WHERE id IN (...)` with a single value because every row gets a different timestamp.

Let's go through each approach.

---

## The Scenario

A table of orders, each needing two updates: a `status` change to `"Processed"` and a unique `processed_at` timestamp.

```sql
CREATE TABLE orders (
    id            UUID         NOT NULL PRIMARY KEY,
    customer_name TEXT         NOT NULL,
    status        TEXT         NOT NULL DEFAULT 'Pending',
    processed_at  TIMESTAMPTZ
);
```

The update payload is a simple record pairing each order with its timestamp:

```cs
record OrderUpdate(Guid Id, DateTime ProcessedAt);
```

With 10,000 of these, here's how each approach plays out.

---

## Approach 1: Naive Dapper, One UPDATE Per Row

The first thing you'd try: loop through the list and fire one `UPDATE` per row.

```cs
await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();
await using var transaction = await connection.BeginTransactionAsync();

foreach (var update in updates)
{
    await connection.ExecuteAsync(
        """
        UPDATE orders
        SET processed_at = @ProcessedAt,
            status       = 'Processed'
        WHERE id = @Id
        """,
        new { update.Id, update.ProcessedAt },
        transaction: transaction);
}

await transaction.CommitAsync();
```

10,000 rows means 10,000 round-trips to the database. Each `ExecuteAsync` call sends the SQL, waits for PostgreSQL to respond, then moves on to the next one. At 10,000 rows this took **2,414ms** in my benchmark. At 25,000 rows it was over 6 seconds. Over a real network it would be worse. The database is not slow. The constant back-and-forth is.

---

## Approach 2: EF Core SaveChanges, Batched Round-Trips

EF Core batches the generated SQL statements to cut down on round-trips. With `MaxBatchSize` set high enough, you can push all 10,000 updates in far fewer network calls. The default batch size is 42, in case you were wondering. You can read more about this in the [<VPIcon icon="fa-brands fa-microsoft"/>EF Core efficient updating docs](https://learn.microsoft.com/en-us/ef/core/performance/efficient-updating).

```cs
var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseNpgsql(connectionString, o => o.MinBatchSize(5000).MaxBatchSize(10000))
    .Options;

await using var db = new AppDbContext(options);

var ids = updates.Select(u => u.Id).ToHashSet();
var orders = await db.Orders
    .Where(o => ids.Contains(o.Id))
    .ToListAsync();

var updateMap = updates.ToDictionary(u => u.Id);

foreach (var order in orders)
{
    order.Status = "Processed";
    order.ProcessedAt = updateMap[order.Id].ProcessedAt;
}

await db.SaveChangesAsync();
```

It's a meaningful improvement over the loop. At 10,000 rows it came in at **1,030ms**, roughly half the time of Approach 1. But there's hidden cost in two places: the upfront `SELECT` to load all 10,000 entities into the change tracker, and the fact that EF Core still generates 10,000 individual `UPDATE` statements. They're packed into fewer round-trips, but the SQL is all still there.

---

## Approach 3: Dapper with a VALUES Table, One Statement, One Round-Trip

Instead of sending N separate statements, you can send a single `UPDATE` that supplies all the new values inline using a derived `VALUES` table:

```sql
UPDATE orders
SET processed_at = v.processed_at,
    status       = 'Processed'
FROM (VALUES
    (@Id0, @ProcessedAt0),
    (@Id1, @ProcessedAt1),
    ...
) AS v(id, processed_at)
WHERE orders.id = v.id::uuid
```

Here's the C# code to build and execute that:

```cs
await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();
await using var transaction = await connection.BeginTransactionAsync();

const string updateTemplate =
    @"""
    UPDATE orders
    SET processed_at = v.processed_at,
        status       = 'Processed'
    FROM (VALUES
        {0}
    ) AS v(id, processed_at)
    WHERE orders.id = v.id::uuid
    """;

var paramNames = string.Join(
    ",\n    ",
    updates.Select((_, i) => $"(@Id{i}, @ProcessedAt{i})"));

var sql = string.Format(updateTemplate, paramNames);

var parameters = new DynamicParameters();
for (int i = 0; i < updates.Count; i++)
{
    parameters.Add($"Id{i}", updates[i].Id.ToString());
    parameters.Add($"ProcessedAt{i}", updates[i].ProcessedAt);
}

await connection.ExecuteAsync(sql, parameters, transaction: transaction);

await transaction.CommitAsync();
```

PostgreSQL receives one statement, builds one execution plan, and updates all rows in a single pass. One round-trip total. This dropped from 2,414ms down to **89ms** at 10,000 rows.

There is a trade-off: the SQL string grows with the batch size. At 10,000 rows you end up with 10,000 parameter pairs in the query text. PostgreSQL allows a **maximum of 65,535 parameters**, so you have headroom, but it is something to be aware of at very large batch sizes. Approaches 6 and 7 avoid this entirely.

---

## Approach 4: EF Core ExecuteSqlRaw, Same SQL Inside EF Core

The SQL here is exactly the same as Approach 3. The reason to use this instead is if you're already working inside an EF Core `DbContext` and want your bulk update to share the same transaction as other EF Core operations.

```cs
await using var db = new AppDbContext(options);
await using var transaction = await db.Database.BeginTransactionAsync();

var paramEntries = new List<NpgsqlParameter>();
var valueClauses = new List<string>();

for (int i = 0; i < updates.Count; i++)
{
    valueClauses.Add($"(@Id{i}::uuid, @ProcessedAt{i})");
    paramEntries.Add(new NpgsqlParameter($"Id{i}", updates[i].Id.ToString()));
    paramEntries.Add(new NpgsqlParameter($"ProcessedAt{i}", updates[i].ProcessedAt));
}

var sql = string.Format(updateTemplate, string.Join(",\n    ", valueClauses));

await db.Database.ExecuteSqlRawAsync(sql, paramEntries);

await transaction.CommitAsync();
```

The performance is the same as Approach 3 since it's the same SQL hitting the database. In my benchmark it came in at **166ms** at 10,000 rows, a bit slower than Approach 3's 89ms. The small gap is likely overhead from the EF Core transaction wrapper rather than the SQL itself. What you get is the ability to mix change-tracked operations with raw SQL inside the same EF Core transaction. Dapper and EF Core are not mutually exclusive.

One thing to watch out for: `ExecuteSqlRawAsync` doesn't accept Dapper's `DynamicParameters`. You have to use [<VPIcon icon="fas fa-globe"/>`NpgsqlParameter`](https://npgsql.org/doc/api/Npgsql.NpgsqlParameter.html) objects directly. If you want a full overview of EF Core's raw SQL options, I covered them in [**this article**](/milanjovanovic.tech/ef-core-raw-sql-queries.md).

---

## Approach 5: Dapper CTE (WITH ... AS VALUES)

This is a variation on Approach 3 that wraps the same `VALUES` data in a named CTE instead of an inline derived table:

```sql
WITH updates(id, processed_at) AS (
    VALUES
        (@Id0::uuid, @ProcessedAt0),
        (@Id1::uuid, @ProcessedAt1),
        ...
)
UPDATE orders
SET processed_at = updates.processed_at,
    status       = 'Processed'
FROM updates
WHERE orders.id = updates.id
```

And here's the C# code to execute it:

```cs
await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();
await using var transaction = await connection.BeginTransactionAsync();

var valueClauses = string.Join(
    ",\n        ",
    updates.Select((_, i) => $"(@Id{i}::uuid, @ProcessedAt{i})"));

var sql =
    @$"""
    WITH updates(id, processed_at) AS (
        VALUES
            {valueClauses}
    )
    UPDATE orders
    SET processed_at = updates.processed_at,
        status       = 'Processed'
    FROM updates
    WHERE orders.id = updates.id
    """;

var parameters = new DynamicParameters();
for (int i = 0; i < updates.Count; i++)
{
    parameters.Add($"Id{i}", updates[i].Id.ToString());
    parameters.Add($"ProcessedAt{i}", updates[i].ProcessedAt);
}

await connection.ExecuteAsync(sql, parameters, transaction: transaction);

await transaction.CommitAsync();
```

Still a single statement and a single round-trip. PostgreSQL materializes the CTE once and joins against it for the update. In the benchmark it came in at **103ms** at 10,000 rows, slightly behind the plain `VALUES` approach at 89ms. The performance difference is small enough that this is really a style choice. Some teams prefer the CTE form when the update logic is more involved and they want to name the data source explicitly.

---

## Approach 6: Dapper with UNNEST (PostgreSQL)

If you're on PostgreSQL, there's a cleaner option: [<VPIcon icon="iconfont icon-postgresql"/>`UNNEST`](https://postgresql.org/docs/current/functions-array.html). Instead of building `@Id0` through `@Id9999` dynamically, you pass two arrays as parameters and let PostgreSQL expand them:

```cs
await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();
await using var transaction = await connection.BeginTransactionAsync();

var ids = updates.Select(u => u.Id).ToArray();
var processedAts = updates.Select(u => u.ProcessedAt).ToArray();

await connection.ExecuteAsync(
    @"""
    UPDATE orders
    SET processed_at = v.processed_at,
        status       = 'Processed'
    FROM UNNEST(@Ids, @ProcessedAts) AS v(id, processed_at)
    WHERE orders.id = v.id
    """,
    new { Ids = ids, ProcessedAts = processedAts },
    transaction: transaction);

await transaction.CommitAsync();
```

::: info This is my preferred approach when working with PostgreSQL:

- **No dynamic SQL.** The query text is always the same. No `string.Format`, no growing parameter lists.
- **Two parameters total.** `@Ids` and `@ProcessedAts`. Npgsql maps `Guid[]` and `DateTime[]` directly to PostgreSQL array types.
- **Stable query plans.** The SQL never changes, so PostgreSQL can cache and reuse the execution plan regardless of how many rows you're updating.
- **Scales cleanly.** The query text stays constant for any batch size. Only the array data grows, and it's sent as compact binary.

:::

The catch: `UNNEST` is PostgreSQL-specific. If you're targeting multiple databases, stick with the `VALUES` approach from Approach 3, 4, or 5. Or you can research the equivalent array expansion functions in your other database of choice.

---

## Approach 7: Temp Table + Binary COPY

All the previous approaches pass data as SQL parameters. At extreme batch sizes that starts to become a constraint, both from the 65,535 parameter limit and from the overhead of building large parameter lists.

A completely different path: skip parameters altogether. Create a temporary staging table, bulk-load the data using [<VPIcon icon="fas fa-globe"/>Npgsql's binary COPY](https://npgsql.org/doc/copy.html), then run a single `UPDATE ... FROM`.

```cs
await using var connection = new NpgsqlConnection(connectionString);
await connection.OpenAsync();
await using var transaction = await connection.BeginTransactionAsync();

await connection.ExecuteAsync(
    @"""
    CREATE TEMP TABLE temp_updates (
        id           UUID        NOT NULL,
        processed_at TIMESTAMPTZ NOT NULL
    ) ON COMMIT DROP
    """,
    transaction: transaction);

await using (var writer = await connection.BeginBinaryImportAsync(
    "COPY temp_updates (id, processed_at) FROM STDIN (FORMAT BINARY)"))
{
    foreach (var u in updates)
    {
        await writer.StartRowAsync();
        await writer.WriteAsync(u.Id, NpgsqlTypes.NpgsqlDbType.Uuid);
        await writer.WriteAsync(u.ProcessedAt, NpgsqlTypes.NpgsqlDbType.TimestampTz);
    }
    await writer.CompleteAsync();
}

await connection.ExecuteAsync(
    @"""
    UPDATE orders
    SET processed_at = t.processed_at,
        status       = 'Processed'
    FROM temp_updates t
    WHERE orders.id = t.id
    """,
    transaction: transaction);

await transaction.CommitAsync();
```

Binary COPY is Npgsql's most efficient data loading path. It bypasses the SQL parameter system and streams rows directly in PostgreSQL's binary wire format. The `ON COMMIT DROP` means the temp table is cleaned up automatically when the transaction ends.

The trade-off is complexity: you create a table, stream data into it, then fire the update. It is technically two operations (COPY + UPDATE), but both are efficient. At 10,000 rows it came in at **41ms**, matching UNNEST. At larger batch sizes (say, 100k+ rows), binary COPY would likely pull ahead further since the data payload grows but the query text stays constant and there are no parameter limits to worry about.

---

## Benchmark Results

Here are the numbers across all three batch sizes:

```plaintext
| Approach                                   | 1,000 rows | 10,000 rows | 25,000 rows |
| ------------------------------------------ | ---------- | ----------- | ----------- |
| Approach 1: Naive Dapper                   | 317ms      | 2,414ms     | 6,283ms     |
| Approach 2: EF Core SaveChanges            | 575ms      | 1,030ms     | 1,767ms     |
| Approach 3: Dapper + VALUES table          | 19ms       | 89ms        | 233ms       |
| Approach 4: EF Core ExecuteSqlRaw + VALUES | 58ms       | 166ms       | 282ms       |
| Approach 5: Dapper + CTE                   | 13ms       | 103ms       | 251ms       |
| Approach 6: Dapper + UNNEST                | 12ms       | 41ms        | 92ms        |
| Approach 7: Temp table + binary COPY       | 11ms       | 41ms        | 93ms        |
```

A few things stand out. EF Core `SaveChanges` is actually faster than naive Dapper at 10,000+ rows because its batching cuts down round-trips significantly. But both are far behind the single-statement approaches. The biggest jump in the table is from Approach 2 to Approach 3. Approach 5 (CTE) is essentially the same performance as Approach 3 (VALUES), confirming it is a style choice rather than a performance one. Approaches 6 and 7 are the fastest at every scale, and the gap over CTE and VALUES widens as batch size grows.

---

## Summary

The takeaway from this exercise is simple: round-trips are expensive and individual SQL statements add up fast.

Reducing 10,000 database calls to 1 is where all the gains come from. Everything else is secondary.

A few things worth keeping in mind:

- **EF Core `SaveChanges` is not a bulk update tool.** It reduces round-trips through batching, but it still generates N individual `UPDATE` statements and requires a `SELECT` to load the change tracker. For bulk mutations, raw SQL is a better fit. The same logic applies to inserts - I covered that in [**Fast SQL Bulk Inserts with C# and EF Core**](/milanjovanovic.tech/fast-sql-bulk-inserts-with-csharp-and-ef-core.md).
- **For PostgreSQL, `UNNEST` and binary COPY are the best options at scale.** Both use a fixed query text that doesn't grow with batch size and have no parameter count limits. `VALUES` and CTE are solid choices for smaller batches or when you need to stay closer to portable SQL.
- **Dapper and EF Core work well together.** You don't have to choose one or the other. Query with EF Core, bulk-update with raw SQL, share the same transaction.

If you want to go deeper on SQL performance more broadly, I recently wrote about [**a common myth around filter and join ordering in SQL queries**](/milanjovanovic.tech/debunking-the-filter-early-join-later-sql-performance-myth.md) that trips up a lot of developers.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Optimizing Bulk Database Updates in .NET: From Naive to Lightning-Fast",
  "desc": ".NET • ASP.NET Core • Software Architecture",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/optimizing-bulk-database-updates-in-dotnet.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
