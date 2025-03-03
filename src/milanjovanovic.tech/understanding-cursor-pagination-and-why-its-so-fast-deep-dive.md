---
lang: en-US
title: "Understanding Cursor Pagination and Why It's So Fast (Deep Dive)"
description: "Article(s) > Understanding Cursor Pagination and Why It's So Fast (Deep Dive)"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Postgres
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understanding Cursor Pagination and Why It's So Fast (Deep Dive)"
    - property: og:description
      content: "Understanding Cursor Pagination and Why It's So Fast (Deep Dive)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/understanding-cursor-pagination-and-why-its-so-fast-deep-dive.html
prev: /programming/cs/articles/README.md
date: 2025-02-15
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_129.png
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
  "link": "/data-science/postgres/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Understanding Cursor Pagination and Why It's So Fast (Deep Dive)"
  desc="While offset pagination is widely used, cursor-based pagination offers significant performance advantages - my tests show a 17x speedup when paginating through a million-record dataset in PostgreSQL. Let's take a deep dive into cursor pagination, compare it with offset pagination, and examine the SQL execution plans."
  url="https://milanjovanovic.tech/blog/understanding-cursor-pagination-and-why-its-so-fast-deep-dive"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_129.png"/>

Pagination is crucial for efficiently handling large datasets. While offset pagination is widely used and gets the job done, cursor-based pagination offers some interesting advantages for certain scenarios.

It's particularly valuable for real-time feeds, infinite scroll interfaces, and APIs where performance at scale matters - like social media timelines, activity logs, or event streams where users frequently page through large datasets.

Let's explore both approaches using a simple `UserNotes` table and see how they perform with a million records.

We'll look at the implementation details, compare query performance, and discuss where each approach makes the most sense.

I've included real execution plans from [<FontIcon icon="iconfont icon-postgres"/>PostgreSQL](https://postgresql.org) to demonstrate the significant performance differences between these approaches.

---

## Database Schema

I created a simple table to demonstrate pagination techniques. The table is seeded with `1,000,000` records for testing purposes, which should be enough to show the performance difference between offset and cursor pagination.

We'll use the following SQL schema for the examples:

```sql
CREATE TABLE user_notes (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    note character varying(500),
    date date NOT NULL,
    CONSTRAINT pk_user_notes PRIMARY KEY (id)
);
```

And here's the C# class representing the `UserNote` entity:

```cs title="UserNote.cs"
public class UserNote
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string? Note { get; set; }
    public DateOnly Date { get; set; }
}
```

I will use PostgreSQL as the database, but the concepts also apply to other databases.

---

## Offset Pagination: The Traditional Approach

[<FontIcon icon="fa-brands fa-microsoft"/>Offset pagination](https://learn.microsoft.com/en-us/ef/core/querying/pagination#offset-pagination) uses `Skip` and `Take` operations. We *skip* a certain number of rows and *take* a fixed number of rows. These usually translate to `OFFSET` and `LIMIT` in SQL queries.

Here's an example of offset pagination in ASP.NET Core:

```cs{21-22} :collapsed-lines
app.MapGet("/offset", async (
    AppDbContext dbContext,
    int page = 1,
    int pageSize = 10,
    CancellationToken cancellationToken = default) =>
{
    if (page < 1) return Results.BadRequest("Page must be greater than 0");
    if (pageSize < 1) return Results.BadRequest("Page size must be greater than 0");
    if (pageSize > 100) return Results.BadRequest("Page size must be less than or equal to 100");

    var query = dbContext.UserNotes
        .OrderByDescending(x => x.Date)
        .ThenByDescending(x => x.Id);

    // Offset pagination typically counts the total number of items
    var totalCount = await query.CountAsync(cancellationToken);
    var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

    // Skip and take the required number of items
    var items = await query
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync(cancellationToken);

    return Results.Ok(new
    {
        Items = items,
        Page = page,
        PageSize = pageSize,
        TotalCount = totalCount,
        TotalPages = totalPages,
        HasNextPage = page < totalPages,
        HasPreviousPage = page > 1
    });
});
```

Note that I'm sorting the results by `Date` and `Id` in descending order. This ensures consistent results when paginating.

Here's the generated SQL for offset pagination:

```sql
-- This query is sent first
SELECT count(*)::int FROM user_notes AS u;

-- Followed by the actual data query
SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
ORDER BY u.date DESC, u.id DESC
LIMIT @pageSize OFFSET @offset;
```

### Limitations of Offset Pagination

1. Performance degrades as offset increases because the database must scan and discard all rows before the offset
2. Risk of missing or duplicating items when data changes between pages
3. Inconsistent results with concurrent updates

---

## Cursor-Based Pagination: A Faster Approach

[<FontIcon icon="fa-brands fa-microsoft"/>Cursor pagination](https://learn.microsoft.com/en-us/ef/core/querying/pagination#keyset-pagination) uses a reference point (cursor) to fetch the next set of results. This reference point is typically a **unique identifier** or a combination of fields that define the sort order.

I'll use the `Date` and `Id` fields to create a cursor for our `UserNotes` table. The cursor is a composite of these two fields, allowing us to paginate efficiently.

Here's an example of cursor pagination in ASP.NET Core:

```cs{17,24} :collapsed-lines
app.MapGet("/cursor", async (
    AppDbContext dbContext,
    DateOnly? date = null,
    Guid? lastId = null,
    int limit = 10,
    CancellationToken cancellationToken = default) =>
{
    if (limit < 1) return Results.BadRequest("Limit must be greater than 0");
    if (limit > 100) return Results.BadRequest("Limit must be less than or equal to 100");

    var query = dbContext.UserNotes.AsQueryable();

    if (date != null && lastId != null)
    {
        // Use the cursor to fetch the next set of results
        // If we were sorting in ASC order, we'd use > instead of <
        query = query.Where(x => x.Date < date || (x.Date == date && x.Id <= lastId));
    }

    // Fetch the items and determine if there are more
    var items = await query
        .OrderByDescending(x => x.Date)
        .ThenByDescending(x => x.Id)
        .Take(limit + 1)
        .ToListAsync(cancellationToken);

    // Extract the cursor and ID for the next page
    bool hasMore = items.Count > limit;
    DateOnly? nextDate = hasMore ? items[^1].Date : null;
    Guid? nextLastId = hasMore ? items[^1].Id : null;

    // Remove the extra item before returning results
    if (hasMore)
    {
        items.RemoveAt(items.Count - 1);
    }

    return Results.Ok(new
    {
        Items = items,
        NextDate = nextDate,
        NextLastId = nextLastId,
        HasMore = hasMore
    });
});
```

The sort order is the same as in the offset pagination example. However, the sort order is critical for consistent results with cursor pagination. Because the `Date` isn't a unique value in our table, we use the `Id` field to handle ties. This ensures that we don't miss or duplicate items when paginating.

Here's the generated SQL for cursor pagination:

```sql
SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
WHERE u.date < @date OR (u.date = @date AND u.id <= @lastId)
ORDER BY u.date DESC, u.id DESC
LIMIT @limit;
```

Note that there's no `OFFSET` in the query. We're directly seeking the rows based on the cursor, which is more efficient than offset pagination.

The `COUNT` query is omitted in cursor pagination because we're not counting the total number of items. This can be a limitation if you need to display the total number of pages upfront. However, the performance benefits of cursor pagination often outweigh this limitation.

### Limitations of Cursor Pagination

1. If users need to change sort fields dynamically, cursor pagination becomes significantly more complicated since the cursor must incorporate all sort conditions
2. Users can't jump to a specific page number - they must traverse sequentially through the pages
3. More complex to implement correctly compared to offset pagination, especially when handling ties and ensuring stable ordering

---

## Examining the SQL Execution Plans

I wanted to compare the execution plans for offset and cursor pagination. I used the `EXPLAIN ANALYZE` command in PostgreSQL to see the [<FontIcon icon="iconfont icon-postgres"/>query plans](https://postgresql.org/docs/current/using-explain.html).

Here's the offset pagination query:

```sql
SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
ORDER BY u.date DESC, u.id DESC
LIMIT 1000 OFFSET 900000;
```

I'm intentionally skipping `900,000` rows to exaggerate the performance impact. After that, we fetch the next `1,000` rows.

Here's the query plan for offset pagination:

```sql :collapsed-lines
EXPLAIN ANALYZE SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
ORDER BY u.date DESC, u.id DESC
LIMIT 1000 OFFSET 900000;

---
-- Limit  (cost=165541.59..165541.71 rows=1 width=52) (actual time=695.026..701.406 rows=1000 loops=1)
--   ->  Gather Merge  (cost=68312.50..165541.59 rows=833334 width=52) (actual time=342.475..684.567 rows=901000 loops=1)
--         Workers Planned: 2
--         Workers Launched: 2
--         ->  Sort  (cost=67312.48..68354.15 rows=416667 width=52) (actual time=327.846..450.295 rows=300841 loops=3)
--               Sort Key: date DESC, id DESC
--               Sort Method: external merge  Disk: 20440kB
--               Worker 0:  Sort Method: external merge  Disk: 18832kB
--               Worker 1:  Sort Method: external merge  Disk: 18912kB
--               ->  Parallel Seq Scan on user_notes u  (cost=0.00..14174.67 rows=416667 width=52) (actual time=1.035..22.876 rows=333333 loops=3)
-- Planning Time: 0.050 ms
-- JIT:
--   Functions: 8
--   Options: Inlining false, Optimization false, Expressions true, Deforming true
--   Timing: Generation 0.243 ms (Deform 0.111 ms), Inlining 0.000 ms, Optimization 0.270 ms, Emission 4.085 ms, Total 4.598 ms
-- Execution Time: 704.217 ms
```

The total execution time is `704.217 ms` for offset pagination.

Here's the query returning the same set of rows using cursor pagination. I had to hardcode the `@date` and `@lastId` values for this comparison:

```sql
SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
WHERE u.date < @date OR (u.date = @date AND u.id <= @lastId)
ORDER BY u.date DESC, u.id DESC
LIMIT 1000;
```

Finally, here's the query plan for cursor pagination:

```sql :collapsed-lines
EXPLAIN ANALYZE SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
WHERE u.date < @date OR (u.date = @date AND u.id <= @lastId)
ORDER BY u.date DESC, u.id DESC
LIMIT 1000;

---
-- Limit  (cost=20605.63..20722.31 rows=1000 width=52) (actual time=37.993..40.958 rows=1000 loops=1)
--   ->  Gather Merge  (cost=20605.63..30419.62 rows=84114 width=52) (actual time=37.992..40.921 rows=1000 loops=1)
--         Workers Planned: 2
--         Workers Launched: 2
--         ->  Sort  (cost=19605.61..19710.75 rows=42057 width=52) (actual time=24.611..24.630 rows=811 loops=3)
--               Sort Key: date DESC, id DESC
--               Sort Method: top-N heapsort  Memory: 240kB
--               Worker 0:  Sort Method: top-N heapsort  Memory: 239kB
--               Worker 1:  Sort Method: top-N heapsort  Memory: 238kB
--               ->  Parallel Seq Scan on user_notes u  (cost=0.00..17299.67 rows=42057 width=52) (actual time=0.009..21.462 rows=33333 loops=3)
--                     Filter: ((date < @date::date) OR ((date = @date::date) AND (id <= @lastId::uuid)))
--                     Rows Removed by Filter: 300000
-- Planning Time: 0.063 ms
-- Execution Time: 40.993 ms
```

The total execution time for cursor pagination is `40.993 ms`.

A whopping `17x` performance improvement with cursor pagination compared to offset pagination!

The performance with cursor pagination is consistent regardless of the page depth. This is because we're directly seeking the rows based on the cursor, which is more efficient than offset pagination. It's a huge advantage over offset pagination, especially for large datasets.

---

## Adding Indexes for Cursor Pagination

I also tested the impact of indexes on [<FontIcon icon="fas fa-globe"/>cursor pagination](https://use-the-index-luke.com/blog/2013-07/pagination-done-the-postgresql-way). I created a composite index on the `Date` and `Id` fields to speed up the queries. Or so I thought...

Here's the SQL command to create the composite index:

```sql
CREATE INDEX idx_user_notes_date_id ON user_notes (date DESC, id DESC);
```

The index is created in descending order to match the sort order in our queries.

Let's see the query plan for cursor pagination with the composite index:

```sql
EXPLAIN ANALYZE SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
WHERE u.date < @date OR (u.date = @date AND u.id <= @lastId)
ORDER BY u.date DESC, u.id DESC
LIMIT 1000;

---
-- Limit  (cost=0.42..816.55 rows=1000 width=52) (actual time=298.534..298.924 rows=1000 loops=1)
--   ->  Index Scan using idx_user_notes_date_id on user_notes u  (cost=0.42..82376.42 rows=100936 width=52) (actual time=298.532..298.888 rows=1000 loops=1)
--         Filter: ((date < @date::date) OR ((date = @date::date) AND (id <= @lastId::uuid)))
--         Rows Removed by Filter: 900000
-- Planning Time: 0.068 ms
-- Execution Time: 298.955 ms
```

We have an `Index Scan` using the composite index. However, the execution time is `298.955 ms`, which is slower than the previous query without the index.

This might be because the dataset is too small to benefit from the index. I have only `1,000,000` records in the table, which might not be enough to see the performance improvement with the index.

But wait, there's more to it!

What if we were to use a tuple comparison in SQL?

```sql{3}
EXPLAIN ANALYZE SELECT u.id, u.date, u.note, u.user_id
FROM user_notes AS u
WHERE (u.date, u.id) <= (@date, @lastId)
ORDER BY u.date DESC, u.id DESC
LIMIT 1000;

---
-- Limit  (cost=0.42..432.81 rows=1000 width=52) (actual time=0.020..0.641 rows=1000 loops=1)
--   ->  Index Scan using idx_user_notes_date_id on user_notes u  (cost=0.42..43817.85 rows=101339 width=52) (actual time=0.019..0.606 rows=1000 loops=1)
--         Index Cond: (ROW(date, id) <= ROW(@date::date, @lastId::uuid))
-- Planning Time: 0.060 ms
-- Execution Time: 0.668 ms
```

Finally, the index is working. The execution time is `0.668 ms`, which is significantly faster than the previous queries.

The query optimizer cannot determine whether the composite index can be used for row-level comparison. However, the index is effectively used with a tuple comparison.

How do you translate this to EF Core?

The Postgres provider has `EF.Functions.LessThanOrEqual`, which accepts a `ValueTuple` as an argument. We can use it to produce a `(u.date, u.id) <= (@date, @lastId)` comparison in the query. And this will utilize the composite index.

```cs
query = query.Where(x => EF.Functions.LessThanOrEqual(
    ValueTuple.Create(x.Date, x.Id),
    ValueTuple.Create(date, lastId)));
```

---

## Encoding the Cursor

Here's a small utility class for encoding and decoding the cursor. We'll use this to encode the cursor in the URL and decode it when fetching the next set of results.

The clients will receive the cursor as a Base64-encoded string. They don't need to know the internal structure of the cursor.

```cs :collapsed-lines title="Cursor.cs"
using Microsoft.AspNetCore.Authentication; // For Base64UrlTextEncoder

public sealed record Cursor(DateOnly Date, Guid LastId)
{
    public static string Encode(DateOnly date, string lastId)
    {
        var cursor = new Cursor(date, lastId);
        string json = JsonSerializer.Serialize(cursor);
        return Base64UrlTextEncoder.Encode(Encoding.UTF8.GetBytes(json));
    }

    public static Cursor? Decode(string? cursor)
    {
        if (string.IsNullOrWhiteSpace(cursor))
        {
            return null;
        }

        try
        {
            string json = Encoding.UTF8.GetString(Base64UrlTextEncoder.Decode(cursor));
            return JsonSerializer.Deserialize<Cursor>(json);
        }
        catch
        {
            return null;
        }
    }
}
```

Here's an example of encoding and decoding the cursor:

```cs
string encodedCursor = Cursor.Encode(
  new DateOnly(2025, 2, 15),
  Guid.Parse("019500f9-8b41-74cf-ab12-25a48d4d4ab4"));
// Result:
// eyJEYXRlIjoiMjAyNS0wMi0xNSIsIkxhc3RJZCI6IjAxOTUwMGY5LThiNDEtNzRjZi1hYjEyLTI1YTQ4ZDRkNGFiNCJ9

Cursor decodedCursor = Cursor.Decode(encodedCursor);
// Result:
// {
//     "Date": "2025-02-15",
//     "LastId": "019500f9-8b41-74cf-ab12-25a48d4d4ab4"
// }
```

---

## Summary

While offset pagination is simpler to implement, it suffers from significant performance degradation at scale. My tests showed a 17x slowdown compared to cursor pagination when accessing deeper pages.

Cursor pagination maintains consistent performance regardless of page depth and works particularly well for real-time feeds and infinite scroll interfaces.

However, cursor pagination comes with tradeoffs. It requires careful implementation, especially around cursor encoding and handling sort orders. It also doesn't provide total page counts, making it unsuitable for interfaces that need to support paged navigation.

The choice between these approaches ultimately depends on your use case:

- Choose cursor pagination for performance-critical APIs, real-time feeds, infinite scroll, or any scenario where users frequently access deep pages
- Stick with offset pagination for admin interfaces, small datasets, or when you need upfront page counts

Another thing to consider: which page will your users typically land on? If most users start at the first page and rarely visit other pages, offset pagination might be sufficient. This will be the case for many applications.

Remember to use tuple comparisons and appropriate indexes to get the best performance from cursor pagination.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Cursor Pagination and Why It's So Fast (Deep Dive)",
  "desc": "While offset pagination is widely used, cursor-based pagination offers significant performance advantages - my tests show a 17x speedup when paginating through a million-record dataset in PostgreSQL. Let's take a deep dive into cursor pagination, compare it with offset pagination, and examine the SQL execution plans.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/understanding-cursor-pagination-and-why-its-so-fast-deep-dive.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
