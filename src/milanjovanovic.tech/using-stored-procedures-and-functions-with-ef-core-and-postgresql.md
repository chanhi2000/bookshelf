---
lang: en-US
title: "Using Stored Procedures and Functions With EF Core and PostgreSQL"
description: "Article(s) > Using Stored Procedures and Functions With EF Core and PostgreSQL"
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
      content: "Article(s) > Using Stored Procedures and Functions With EF Core and PostgreSQL"
    - property: og:description
      content: "Using Stored Procedures and Functions With EF Core and PostgreSQL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/using-stored-procedures-and-functions-with-ef-core-and-postgresql.html
prev: /programming/cs/articles/README.md
date: 2025-10-04
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_162.png
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
  name="Using Stored Procedures and Functions With EF Core and PostgreSQL"
  desc="Learn how to use PostgreSQL stored procedures and functions with EF Core to handle complex queries, atomic operations with locking, and database-specific features while keeping the type safety and convenience of EF Core."
  url="https://milanjovanovic.tech/blog/using-stored-procedures-and-functions-with-ef-core-and-postgresql"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_162.png"/>

You're building a .NET application with [<VPIcon icon="fa-brands fa-microsoft"/>EF Core](https://learn.microsoft.com/en-us/ef/core/). Most of your queries work fine with [**LINQ**](/milanjovanovic.tech/why-i-write-tall-linq-queries.md), but now you're hitting scenarios where you need something more.

Maybe you have a complex report that joins five tables with aggregations and window functions. Your LINQ query generates SQL that's slower than you'd like, and you know you could write better SQL by hand.

Or maybe you need to update inventory with proper locking to prevent race conditions. You could manage [**transactions**](/milanjovanovic.tech/working-with-transactions-in-ef-core.md) and explicit locks in C#, but it feels like you're fighting the framework.

Here's what usually happens: you search for "EF Core stored procedures" and find conflicting advice. Some articles say avoid raw SQL at all costs. Others suggest abandoning EF entirely and writing ADO.NET. Neither feels right.

Actually, **EF Core works great with database functions and procedures**. You get the database's power for what it does best, and EF's convenience for everything else. Let me show you how this actually works.

I'll use [<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL](https://postgresql.org/) for examples, but the same principles apply to SQL Server and other relational databases.

---

## When Should You Even Use Raw SQL?

Let's be honest: most of the time, **LINQ is fine**. EF Core translates your C# into decent SQL, and you get type safety and refactoring support.

But there are times when raw SQL makes more sense:

**You need performance you can't get from LINQ**. Complex aggregations with multiple joins, [<VPIcon icon="iconfont icon-postgresql"/>window functions](https://postgresql.org/docs/current/tutorial-window.html), or reporting queries often run faster when written directly in SQL. You can test and tune the query in your database tool before bringing it into your code.

**You're using database-specific features**. PostgreSQL has powerful capabilities like [<VPIcon icon="iconfont icon-postgresql"/>full-text search](https://postgresql.org/docs/current/textsearch.html), JSON operators, and [<VPIcon icon="iconfont icon-postgresql"/>common table expressions (CTEs)](https://postgresql.org/docs/current/queries-with.html) that don't always have clean LINQ equivalents. Sometimes the straightest path is just writing the SQL.

**You have existing database logic**. If your database already has stored procedures and functions (maybe from a [**legacy system**](/milanjovanovic.tech/what-rewriting-a-40-year-old-project-taught-me-about-software-development.md)), calling them directly beats rewriting everything in C#.

**You need atomic operations with proper locking**. A stored procedure that coordinates multiple updates with `FOR UPDATE` locks ([**here's a good use case**](/milanjovanovic.tech/scaling-the-outbox-pattern.md)) is simpler and safer than trying to manage that from application code.

**You want to reduce round trips**. One function call that aggregates data from five tables is more efficient than five separate LINQ queries.

Now let's see how to actually do this.

---

## Example 1: Simple Scalar Function

Here's a straightforward function that tells you how many tickets are left:

```sql
CREATE OR REPLACE FUNCTION ticketing.tickets_left(p_ticket_type_id uuid)
RETURNS numeric
LANGUAGE sql
AS $$
  SELECT tt.available_quantity
  FROM ticketing.ticket_types tt
  WHERE tt.id = p_ticket_type_id
$$;
```

Nothing fancy, just a query wrapped in a function.

Calling it from EF Core is straightforward:

```cs{6}
app.MapGet("ticket-types/{ticketTypeId}/available-quantity",
async (Guid ticketTypeId, EventManagementContext dbContext) =>
{
    var result = await dbContext.Database.SqlQuery<int>(
            $"""
             SELECT ticketing.tickets_left({ticketTypeId}) AS "Value"
             """)
        .FirstAsync();

    return Results.Ok(result);
});
```

Notice the `AS "Value"` alias. When EF Core maps to a primitive type, it expects a property named `Value`. The quotes preserve the exact casing (PostgreSQL lowercases unquoted identifiers by default).

The interpolated string syntax (`$"{ticketTypeId}"`) might look dangerous, but EF Core converts this into a parameterized query automatically. You're not building SQL strings, you're using C# interpolation as a convenient syntax for parameters.

---

## Example 2: Table-Valued Function

Functions can return entire result sets, which is where they really shine:

```sql
CREATE OR REPLACE FUNCTION ticketing.customer_order_summary(p_customer_id uuid)
RETURNS TABLE (
    order_id uuid,
    created_at_utc timestamptz,
    total_price numeric,
    currency text,
    item_count numeric
)
LANGUAGE sql
AS $$
SELECT
    o.id,
    o.created_at_utc,
    o.total_price,
    o.currency,
    COALESCE(SUM(oi.quantity), 0) AS item_count
FROM ticketing.orders o
LEFT JOIN ticketing.order_items oi ON oi.order_id = o.id
WHERE o.customer_id = p_customer_id
GROUP BY o.id, o.created_at_utc, o.total_price, o.currency
ORDER BY o.created_at_utc DESC
$$;
```

This function joins orders with their items, aggregates quantities, and returns multiple rows. You could write this in LINQ, but the SQL is clearer and you can test it directly in your database tool.

To use it from C#, create a DTO that matches the function's output:

```cs
public class OrderSummaryDto
{
    public Guid OrderId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public decimal TotalPrice { get; set; }
    public string Currency { get; set; }
    public int ItemCount { get; set; }
}
```

Then query the function like any other table:

```cs{13}
app.MapGet("customers/{customerId}/order-summary",
async (Guid customerId, EventManagementContext dbContext) =>
{
    var orders = await dbContext.Database
        .SqlQuery<OrderSummaryDto>(
            $"""
             SELECT
                order_id AS OrderId,
                created_at_utc AS CreatedAtUtc,
                total_price AS TotalPrice,
                currency AS Currency,
                item_count AS ItemCount
             FROM ticketing.customer_order_summary({customerId})
             """)
        .ToListAsync();

    return Results.Ok(orders);
});
```

The key is mapping column names to your DTO properties using aliases. EF Core handles the rest automatically.

This is a simple case without joins, but you can use this pattern in more complex queries too. However, you will have to project into DTOs manually since EF Core can't translate joins in raw SQL into entity graphs. Usually, you'll return a flat structure from functions anyway, and then map to richer models in C# if needed.

---

## Understanding PostgreSQL Functions vs Procedures

PostgreSQL distinguishes between functions and procedures in important ways:

**Functions** are designed to **return values**. They can return scalar values, tables, or even complex JSON objects. You call them with `SELECT` and can use them in queries like any other expression. Functions run within a transaction and can be used in `WHERE` clauses, joins, and other query contexts.

**Procedures** are designed for **side effects**. They don't return values directly but can modify data and have `OUT` parameters. You call them with `CALL` and they're ideal for complex operations that need to manage transactions explicitly or perform multiple related updates.

Think of it this way: use functions when you need data, use procedures when you need to change something.

This distinction matters because it affects how you design your database logic and how you call these routines from C#.

Let's see an example of a procedure.

---

## Example 3: Stored Procedure with Validation

Here's where procedures really prove their worth. Let's say you need to adjust ticket inventory, but you want to prevent [**race conditions**](/milanjovanovic.tech/solving-race-conditions-with-ef-core-optimistic-locking.md) and validate the operation:

```sql :collapsed-lines
CREATE OR REPLACE PROCEDURE ticketing.adjust_available_quantity(
    p_ticket_type_id uuid,
    p_delta numeric,
    p_reason text DEFAULT 'manual-adjust'
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_qty numeric;
    v_avail numeric;
    v_new_avail numeric;
BEGIN
    SELECT quantity, available_quantity
    INTO v_qty, v_avail
    FROM ticketing.ticket_types
    WHERE id = p_ticket_type_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'ticket_type % not found', p_ticket_type_id;
    END IF;

    v_new_avail := v_avail + p_delta;

    IF v_new_avail < 0 THEN
        RAISE EXCEPTION 'Cannot reduce below zero';
    END IF;

    IF v_new_avail > v_qty THEN
        RAISE EXCEPTION 'Cannot exceed quantity';
    END IF;

    UPDATE ticketing.ticket_types
    SET available_quantity = v_new_avail
    WHERE id = p_ticket_type_id;
END;
$$;
```

This procedure does several important things:

- **Locks the row** with `FOR UPDATE` so no other transaction can modify it until we're done
- **Validates business rules** before making changes
- **Provides clear error messages** when something goes wrong
- **Keeps everything atomic** in a single database round trip

You could do all this in C# with manual transaction management and explicit locking, but it's more complex and error-prone. Let the database handle what it's good at.

Here's how you call it from EF Core:

```cs{10}
app.MapPut("ticket-types/{ticketTypeId}/available-quantity", async (
    Guid ticketTypeId,
    int quantity,
    EventManagementContext dbContext) =>
{
    try
    {
        await dbContext.Database.ExecuteSqlAsync(
            $"""
             CALL ticketing.adjust_available_quantity({ticketTypeId},{quantity})
             """);

        return Results.Ok(result);
    }
    catch (Exception e)
    {
        return Results.BadRequest(e.Message);
    }
});
```

The procedure doesn't return a value, but if it raises an exception (with `RAISE EXCEPTION`), PostgreSQL will propagate that to your C# code. You can catch it and return a proper error response.

---

## About SQL Injection (Don't Panic)

You might be looking at those interpolated strings and thinking "wait, isn't this [**SQL injection waiting to happen**](/milanjovanovic.tech/ef-core-raw-sql-queries.md)?"

**It's not**.

When you write:

```cs
$"SELECT * FROM users WHERE id = {userId}"
```

EF Core doesn't concatenate strings. It converts this into:

```sql
SELECT * FROM users WHERE id = @p0
```

**The actual value is sent as a parameter**, completely separate from the SQL text. This works for all the examples in this article.

The interpolation syntax is just a convenient way to write parameterized queries.

The reason why is we're not actually passing in a `string` to the `SqlQuery` method, but a [<VPIcon icon="fa-brands fa-microsoft"/>`FormattableString`](https://learn.microsoft.com/en-us/dotnet/api/system.formattablestring). This is a special type that captures the format and arguments separately, allowing EF Core to handle parameters.

Everything in this article works with [<VPIcon icon="iconfont icon-mssql"/>SQL Server](https://learn.microsoft.com/en-us/sql/), [<VPIcon icon="iconfont icon-mysql"/>MySQL](https://dev.mysql.com/), [<VPIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/), and other databases EF Core supports. The differences are mostly syntax.

---

## A Quick Word on Views

Database views are like functions without parameters. They're saved queries you can reference by name.

You can query them using `SqlQuery<T>` just like functions:

```cs
var results = await dbContext.Database
    .SqlQuery<ActiveCustomerDto>(
        $"SELECT * FROM ticketing.active_customers")
    .ToListAsync();
```

Or you can map them to entity types in your `DbContext` for full LINQ support.

Views are great for frequently-used queries that don't need parameters. Functions give you the flexibility of parameterization.

---

## Wrapping Up

We've covered how to use PostgreSQL functions and procedures with EF Core, from simple scalar functions to complex procedures with validation and locking.

You learned when to use functions (when you need data back) versus procedures (when you need to modify data). You saw how EF Core's `SqlQuery<T>` and `ExecuteSqlAsync` give you type safety while letting you write the SQL you need. And you learned when raw SQL makes sense: complex aggregations, database-specific features, atomic operations with locking, and reducing round trips.

**EF Core** doesn't force you to choose between LINQ and raw SQL. You can use both.

Use functions when you need to return data, procedures when you need to modify data with complex logic, and raw SQL queries when LINQ doesn't capture your requirements efficiently. The combination of EF Core's convenience and the database's power gives you the flexibility to choose the right tool for each scenario.

That's all for today. Hope this was helpful.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Stored Procedures and Functions With EF Core and PostgreSQL",
  "desc": "Learn how to use PostgreSQL stored procedures and functions with EF Core to handle complex queries, atomic operations with locking, and database-specific features while keeping the type safety and convenience of EF Core.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/using-stored-procedures-and-functions-with-ef-core-and-postgresql.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
