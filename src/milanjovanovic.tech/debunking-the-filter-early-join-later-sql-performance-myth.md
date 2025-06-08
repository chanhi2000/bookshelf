---
lang: en-US
title: "Debunking the “Filter Early, JOIN Later” SQL Performance Myth"
description: "Article(s) > Debunking the “Filter Early, JOIN Later” SQL Performance Myth"
icon: fas fa-database
category:
  - Data Science
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Debunking the “Filter Early, JOIN Later” SQL Performance Myth"
    - property: og:description
      content: "Debunking the “Filter Early, JOIN Later” SQL Performance Myth"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/debunking-the-filter-early-join-later-sql-performance-myth.html
prev: /data-science/articles/README.md
date: 2025-06-07
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_145.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Debunking the “Filter Early, JOIN Later” SQL Performance Myth"
  desc="That viral SQL performance tip about filtering before joining? It is complete nonsense. Here is why query optimizers make it irrelevant."
  url="https://milanjovanovic.tech/blog/debunking-the-filter-early-join-later-sql-performance-myth"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_145.png"/>

I came across a Medium article with 700+ claps promoting this "SQL performance trick":

**"Filter Early, JOIN Later"**

![SQL performance tip that doesn't actually work.](https://milanjovanovic.tech/blogs/mnw_145/sql_performance_tip.png?imwidth=1920)

Source: SQL Tricks that Cut My Query Time by 80%

The claim goes like this: instead of joining tables first and then filtering, you should filter in a subquery first, then join.

The supposed benefit?

> The database filtered the smaller table first, then did the JOIN — saving time and memory.

Here is the thing - this advice is **completely wrong** for modern databases.

Let me show you why with actual data.

---

## The Supposed "Optimization"

The article shows two queries. Here is the "bad" version:

```sql
SELECT * FROM users u
JOIN orders o 
ON u.id = o.user_id
WHERE 1=1
AND o.total > 500;
```

And the "optimized" version:

```sql
SELECT *
FROM (
  SELECT * FROM orders WHERE 1=1 AND total > 500
) o
JOIN users u ON u.id = o.user_id;
```

The claim is that the second query is faster because it “filters first, then joins."

Sounds logical, right? **Wrong.**

---

## Testing with Real Data

I tested both queries on a PostgreSQL database with:

- 10,000 users
- 5,000,000 orders (500 per user)
- Filtering for orders > $500

Let me run `EXPLAIN ANALYZE` on both queries to see what actually happens.

---

## The Results

Here are the execution plans for both queries:

::: tabs

@tab:active 'Bad' Query Execution Plan

```plaintext
Hash Join  (cost=280.00..96321.92 rows=2480444 width=27) (actual time=1.014..641.202 rows=2499245 loops=1)
  Hash Cond: (o.user_id = u.id)
  ->  Seq Scan on orders o  (cost=0.00..89528.00 rows=2480444 width=14) (actual time=0.006..368.857 rows=2499245 loops=1)
        Filter: (total > '500'::numeric)
        Rows Removed by Filter: 2500755
  ->  Hash  (cost=155.00..155.00 rows=10000 width=13) (actual time=0.998..0.999 rows=10000 loops=1)
        Buckets: 16384  Batches: 1  Memory Usage: 577kB
        ->  Seq Scan on users u  (cost=0.00..155.00 rows=10000 width=13) (actual time=0.002..0.341 rows=10000 loops=1)
Planning Time: 0.121 ms
Execution Time: 685.818 ms
```

@tab 'Optimized' Query Execution Plan:

```plaintext
Hash Join  (cost=280.00..96321.92 rows=2480444 width=27) (actual time=1.019..640.613 rows=2499245 loops=1)
  Hash Cond: (orders.user_id = u.id)
  ->  Seq Scan on orders  (cost=0.00..89528.00 rows=2480444 width=14) (actual time=0.005..368.260 rows=2499245 loops=1)
        Filter: (total > '500'::numeric)
        Rows Removed by Filter: 2500755
  ->  Hash  (cost=155.00..155.00 rows=10000 width=13) (actual time=1.004..1.005 rows=10000 loops=1)
        Buckets: 16384  Batches: 1  Memory Usage: 577kB
        ->  Seq Scan on users u  (cost=0.00..155.00 rows=10000 width=13) (actual time=0.003..0.348 rows=10000 loops=1)
Planning Time: 0.118 ms
Execution Time: 685.275 ms
```

:::

**The execution plans are identical.**

Both queries took ~685ms. The "optimization" did absolutely nothing.

Here's the simplified execution plan, where I removed some details:

```plaintext
Hash Join
  Hash Cond: (o.user_id = u.id)
  ->  Seq Scan on orders o
        Filter: (total > '500'::numeric)
        Rows Removed by Filter
  ->  Hash
        ->  Seq Scan on users u
```

The core operations are:

1. Sequential Scan on `orders` table with filter applied
2. Sequential Scan on `users` table
3. Hash operation to build hash table from `users`
4. Hash Join using the hash condition on `user_id`

---

## Query Optimizers Are Smarter Than You

Modern databases use **cost-based optimizers**. Here is what happens when you run a query:

1. **Parser** turns your SQL into an abstract syntax tree
2. **Optimizer** rewrites your query into the most efficient form
3. **Executor** runs the optimized plan

The optimizer looks at your query and says: "I don't care how you wrote this. I will figure out the best way to execute it."

Both of our queries get rewritten to the same optimal plan:

- Filter the orders table first (because that eliminates rows early)
- Build a hash table from users (the smaller table)
- Hash join the filtered orders with users

**The optimizer already does the "optimization" automatically.**

Your manual subquery does not make it faster - it just makes your SQL harder to read.

---

## How Cost-Based Optimization Works

The query optimizer has statistics about your tables:

- Row counts
- Data distribution
- Index availability
- Column selectivity

It uses these stats to estimate the cost of different execution strategies:

- Which table to scan first
- Which join algorithm to use (hash, nested loop, merge)
- When to apply filters
- Which indexes to use

Then it picks the cheapest plan. Your well-intentioned manual "optimization" gets ignored because the optimizer knows better.

---

## Summary

The “Filter Early, JOIN Later" advice is a relic from ancient database systems that did not have sophisticated optimizers.

Modern databases like PostgreSQL, MySQL, and SQL Server already do predicate pushdown and join reordering automatically. Your manual "optimizations" are pointless and make code harder to maintain.

Write clear, readable SQL. Let the optimizer do its job.

**The real lesson?** Stop believing every performance tip you read online. Use `EXPLAIN ANALYZE` to understand what your database is actually doing.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Debunking the “Filter Early, JOIN Later” SQL Performance Myth",
  "desc": "That viral SQL performance tip about filtering before joining? It is complete nonsense. Here is why query optimizers make it irrelevant.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/debunking-the-filter-early-join-later-sql-performance-myth.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
