---
lang: en-US
title: "How Database Indexes Work – A Practical Guide with PostgreSQL Examples"
description: "Article(s) > How Database Indexes Work – A Practical Guide with PostgreSQL Examples"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - sql
  - mysql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Database Indexes Work – A Practical Guide with PostgreSQL Examples"
    - property: og:description
      content: "How Database Indexes Work – A Practical Guide with PostgreSQL Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-database-indexes-work-a-practical-guide-with-postgresql-examples.html
prev: /data-science/postgresql/articles/README.md
date: 2026-04-17
isOriginal: false
author:
  - name: iyiola
    url: https://freecodecamp.org/news/author/iyiola/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cf6919a4-f803-4783-83ff-5c7674141c55.png
---

# {{ $frontmatter.title }} 관련

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
  name="How Database Indexes Work – A Practical Guide with PostgreSQL Examples"
  desc="Every developer eventually runs into a slow query. The table has grown from a few hundred rows to a few million, and what used to take milliseconds now takes seconds — or worse. The fix, more often th"
  url="https://freecodecamp.org/news/how-database-indexes-work-a-practical-guide-with-postgresql-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/cf6919a4-f803-4783-83ff-5c7674141c55.png"/>

Every developer eventually runs into a slow query. The table has grown from a few hundred rows to a few million, and what used to take milliseconds now takes seconds — or worse.

The fix, more often than not, is an index.

A database index is a data structure that helps the database find rows faster without scanning the entire table. It works a lot like the index at the back of a textbook: instead of reading every page to find a topic, you look it up in the index, get the page number, and go straight there.

In this tutorial, you'll learn how indexes work under the hood, how to create and use them effectively in PostgreSQL, and how to avoid the common mistakes that make indexes useless or even harmful.

::: note Prerequisites

To follow along with the examples, you'll need:

- Basic knowledge of SQL (SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN)
- A running PostgreSQL instance (version 12 or later)
- A SQL client like `psql`, pgAdmin, or DBeaver

:::

If you don't have PostgreSQL installed locally, you can use a free cloud-hosted instance from services like [<VPIcon icon="iconfont icon-neon"/>Neon](https://neon.tech) or [<VPIcon icon="iconfont icon-supabase"/>Supabase](https://supabase.com).

---

## Why Do You Need Indexes?

When you run a query like `SELECT * FROM users WHERE email = 'jane@example.com'`, the database needs to find the matching row. Without an index, PostgreSQL performs a **sequential scan** — it reads every single row in the table and checks whether the `email` column matches.

For a table with 100 rows, this is fine. For a table with 10 million rows, it's painfully slow.

An index solves this by creating a separate, sorted data structure that maps column values to their row locations. Instead of scanning 10 million rows, PostgreSQL can look up the value in the index and jump directly to the matching row. This can reduce query time from seconds to milliseconds.

But indexes aren't free. They come with trade-offs you need to understand before adding them everywhere. You'll learn about those trade-offs throughout this tutorial.

---

## How Indexes Work Under the Hood

PostgreSQL's default index type is the **B-tree** (balanced tree). Understanding how a B-tree works will help you make smarter decisions about when and how to index.

A B-tree organizes data into a sorted, hierarchical structure with three levels:

1. **Root node** — the top of the tree. It holds a few values that divide the data into broad ranges.
2. **Internal nodes** — each one further narrows down the range.
3. **Leaf nodes** — the bottom level. These hold the actual indexed values along with pointers to the corresponding rows in the table.

When PostgreSQL uses a B-tree index to find a value, it starts at the root and follows the path that matches the target value, moving through internal nodes until it reaches the correct leaf node. This path is called a **tree traversal**, and it typically requires only 3–4 steps even for tables with millions of rows.

Think of it like a phone book. You don't start at page one and read every name. You open to roughly the right section (root), narrow it down to the right page (internal nodes), and scan the entries on that page (leaf node).

This sorted structure is also why B-tree indexes work well for range queries like `WHERE price > 50 AND price < 100`. The database finds the starting point in the tree and then scans forward through the leaf nodes, which are already in order.

---

## How to Create Your First Index

Let's build a practical example. You'll create a table, load it with data, and see the difference an index makes.

### Step 1 – Create the Table and Insert Sample Data

```sql
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

Now insert a large number of rows so the performance difference is visible. This generates 500,000 rows of sample data:

```sql
INSERT INTO customers (first_name, last_name, email, city)
SELECT
    'User' || gs,
    'Last' || gs,
    'user' || gs || '@example.com',
    (ARRAY['Lagos', 'London', 'New York', 'Berlin', 'Tokyo'])[1 + (gs % 5)]
FROM generate_series(1, 500000) AS gs;
```

### Step 2 – Query Without an Index

```sql
EXPLAIN ANALYZE
SELECT * FROM customers WHERE email = 'user250000@example.com';
```

You'll see output similar to this:

```plaintext
Seq Scan on customers  (cost=0.00..11374.00 rows=1 width=52) (actual time=45.123..91.456 rows=1 loops=1)
  Filter: ((email)::text = 'user250000@example.com'::text)
  Rows Removed by Filter: 499999
Planning Time: 0.085 ms
Execution Time: 91.502 ms
```

The key detail here is `Seq Scan` — PostgreSQL scanned all 500,000 rows to find a single match. It filtered out 499,999 rows. That's a lot of wasted work.

### Step 3 – Create an Index

```sql
CREATE INDEX idx_customers_email ON customers (email);
```

This creates a B-tree index on the `email` column. The name `idx_customers_email` follows a common naming convention: `idx_` prefix, then the table name, then the column name.

### Step 4 – Query With the Index

Run the same query again:

```sql
EXPLAIN ANALYZE
SELECT * FROM customers WHERE email = 'user250000@example.com';
```

Now you'll see something like this:

```plaintext
Index Scan using idx_customers_email on customers  (cost=0.42..8.44 rows=1 width=52) (actual time=0.034..0.036 rows=1 loops=1)
  Index Cond: ((email)::text = 'user250000@example.com'::text)
Planning Time: 0.112 ms
Execution Time: 0.058 ms
```

The scan type changed from `Seq Scan` to `Index Scan`. The execution time dropped from ~91ms to ~0.06ms. That's roughly a 1,500x improvement — from one line of SQL.

---

## How to Use `EXPLAIN ANALYZE` to Measure Performance

`EXPLAIN ANALYZE` is your most important tool for understanding how PostgreSQL executes a query. You already saw it in the previous section, but let's break down what the output means.

```sql
EXPLAIN ANALYZE SELECT * FROM customers WHERE city = 'Lagos';
```

The output will tell you several things:

- **Scan type** — whether PostgreSQL used a sequential scan, index scan, bitmap index scan, or another access method
- **Cost** — the estimated cost in arbitrary units. The first number is the startup cost, the second is the total cost
- **Rows** — how many rows PostgreSQL estimated it would find versus how many it actually found
- **Actual time** — the real time in milliseconds to execute the query
- **Rows Removed by Filter** — how many rows were scanned but didn't match the condition

If you see `Seq Scan` on a large table with a selective WHERE clause, that's usually a sign you need an index. If you see `Index Scan` or `Index Only Scan`, your index is working.

One thing to keep in mind: `EXPLAIN` without `ANALYZE` shows the plan without actually running the query. `EXPLAIN ANALYZE` runs the query and shows real timing data. Always use `EXPLAIN ANALYZE` when you're investigating performance, but be careful with it on destructive queries — `EXPLAIN ANALYZE DELETE FROM ...` will actually delete the rows. Wrap those in a transaction and roll back:

```sql
BEGIN;
EXPLAIN ANALYZE DELETE FROM customers WHERE city = 'Berlin';
ROLLBACK;
```

---

## Types of Indexes in PostgreSQL

PostgreSQL supports several index types, each optimized for different query patterns.

### B-tree (Default)

B-tree is the default index type and covers the vast majority of use cases. It supports equality checks (`=`), range queries (`<`, `>`, `<=`, `>=`, `BETWEEN`), sorting (`ORDER BY`), and `IS NULL` / `IS NOT NULL` checks.

```sql
-- These are equivalent – B-tree is the default
CREATE INDEX idx_name ON customers (last_name);
CREATE INDEX idx_name ON customers USING btree (last_name);
```

Use B-tree when you don't have a specific reason to use something else.

### Hash

Hash indexes are optimized purely for equality comparisons (`=`). They don't support range queries or sorting. In practice, B-tree handles equality checks almost as fast, so hash indexes are rarely necessary.

```sql
CREATE INDEX idx_email_hash ON customers USING hash (email);
```

Consider a hash index only if you have a very large table with frequent equality-only lookups and want to save a small amount of index space.

### GIN (Generalized Inverted Index)

GIN indexes are designed for values that contain multiple elements — like arrays, JSONB documents, or full-text search vectors. Instead of indexing a single value per row, GIN indexes every element within the value.

```sql
-- Add a JSONB column
ALTER TABLE customers ADD COLUMN preferences JSONB DEFAULT '{}';

-- Index the JSONB column
CREATE INDEX idx_preferences ON customers USING gin (preferences);

-- Now this query uses the GIN index
SELECT * FROM customers WHERE preferences @> '{"newsletter": true}';
```

Use GIN when you're querying inside JSONB data, searching arrays with `@>` or `&&`, or doing full-text search with `tsvector`.

### GiST (Generalized Search Tree)

GiST indexes support geometric data, ranges, and full-text search. They're commonly used with PostGIS for geospatial queries.

```sql
-- Range type example
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    duration TSRANGE
);

CREATE INDEX idx_event_duration ON events USING gist (duration);

-- Find overlapping events
SELECT * FROM events WHERE duration && '[2025-01-01, 2025-01-31]'::tsrange;
```

Use GiST when you're working with spatial data, range types, or need overlap/containment operators.

### BRIN (Block Range Index)

BRIN indexes are extremely small and work well on large tables where the physical row order correlates with the indexed column's value. A common example is a timestamp column on an append-only table where new rows always have later timestamps.

```sql
CREATE INDEX idx_created_at_brin ON customers USING brin (created_at);
```

BRIN stores summary information (min/max values) for each block of rows rather than indexing every row individually. This makes the index much smaller than a B-tree, but it only works well when the data is naturally ordered.

Use BRIN for very large, append-only tables with naturally ordered data — like logs, events, or time-series data.

---

## How to Create a Composite Index

A composite index (also called a multi-column index) covers more than one column. It's useful when your queries frequently filter or sort by multiple columns together.

```sql
CREATE INDEX idx_city_lastname ON customers (city, last_name);
```

The order of columns in a composite index matters. PostgreSQL can use this index for queries that filter on `city` alone, or on both `city` and `last_name`. But it **can't** efficiently use this index for queries that filter only on `last_name`.

Think of it like a phone book sorted by city first, then by last name within each city. You can easily look up everyone in Lagos. You can also look up everyone named "Adeyemi" in Lagos. But finding all people named "Adeyemi" across all cities requires scanning the whole book.

This principle is called the **leftmost prefix rule**: PostgreSQL can use a composite index for queries that include the leftmost column(s) of the index, but not for queries that skip them.

```sql
-- ✅ Uses the index (matches leftmost column)
SELECT * FROM customers WHERE city = 'Lagos';

-- ✅ Uses the index (matches both columns, left to right)
SELECT * FROM customers WHERE city = 'Lagos' AND last_name = 'Adeyemi';

-- ❌ Cannot use this index efficiently (skips the leftmost column)
SELECT * FROM customers WHERE last_name = 'Adeyemi';
```

When deciding column order, place the most selective column first — the one that narrows down the results the most.

---

## How to Create a Partial Index

A partial index covers only a subset of rows in a table. You define the subset with a WHERE clause in the index definition.

This is useful when you only query a specific portion of the data. For example, if you have an `orders` table and you frequently query for pending orders but rarely look at completed ones:

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    total NUMERIC(10, 2),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Only index rows where status is 'pending'
CREATE INDEX idx_orders_pending ON orders (customer_id)
WHERE status = 'pending';
```

This index is smaller than a full index because it skips all rows that don't match the WHERE condition. Smaller indexes use less disk space, consume less memory, and are faster to maintain during writes.

For the index to be used, your query's WHERE clause must match the index's condition:

```sql
-- ✅ Uses the partial index
SELECT * FROM orders WHERE status = 'pending' AND customer_id = 42;

-- ❌ Cannot use the partial index (different status)
SELECT * FROM orders WHERE status = 'shipped' AND customer_id = 42;
```

---

## How to Create an Expression Index

Sometimes you need to index the result of a function or expression rather than a raw column value. Expression indexes (also called functional indexes) handle this.

A common scenario is case-insensitive email lookups. If your queries use `LOWER(email)`, a regular index on `email` won't help — PostgreSQL sees the function call as a different expression.

```sql
-- Regular index on email – won't help with LOWER() queries
CREATE INDEX idx_email ON customers (email);

-- This query does NOT use the index above
SELECT * FROM customers WHERE LOWER(email) = 'user100@example.com';
```

To fix this, create an index on the expression itself:

```sql
CREATE INDEX idx_email_lower ON customers (LOWER(email));
```

Now queries that use `LOWER(email)` in their WHERE clause will use this index:

```sql
-- ✅ Uses the expression index
SELECT * FROM customers WHERE LOWER(email) = 'user100@example.com';
```

The rule is straightforward: the expression in your query must match the expression in the index exactly. If the index is on `LOWER(email)`, your query must also use `LOWER(email)`.

---

## How to Create a Unique Index

A unique index guarantees that no two rows have the same value (or combination of values) in the indexed columns. It serves a dual purpose: it enforces data integrity and provides fast lookups.

```sql
CREATE UNIQUE INDEX idx_customers_email_unique ON customers (email);
```

If you try to insert a duplicate value, PostgreSQL will reject the operation:

```sql
INSERT INTO customers (first_name, last_name, email, city)
VALUES ('Test', 'User', 'user1@example.com', 'Lagos');
-- ERROR: duplicate key value violates unique constraint "idx_customers_email_unique"
```

You might wonder how this differs from a UNIQUE constraint. Under the hood, PostgreSQL implements UNIQUE constraints by creating a unique index. The two are functionally identical.

The difference is intent — a UNIQUE constraint expresses a data integrity rule, while a unique index explicitly focuses on query performance with uniqueness as a bonus.

---

## How to Manage Indexes

As your database grows, you'll need to inspect, monitor, and maintain your indexes.

### How to List All Indexes on a Table

```sql
SELECT
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'customers';
```

This shows the name and full definition of every index on the table.

### How to Check Index Size

```sql
SELECT
    pg_size_pretty(pg_relation_size('idx_customers_email')) AS index_size;
```

For a broader view of all indexes and their sizes:

```sql
SELECT
    indexrelname AS index_name,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE relname = 'customers'
ORDER BY pg_relation_size(indexrelid) DESC;
```

### How to Find Unused Indexes

Indexes that are never used waste disk space and slow down writes. You can find them by checking `pg_stat_user_indexes`:

```sql
SELECT
    indexrelname AS index_name,
    idx_scan AS times_used,
    pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE relname = 'customers'
AND idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

If an index has `idx_scan = 0` after a reasonable period of normal usage, it's a candidate for removal. Just make sure to check across a full business cycle — some indexes are only used during monthly reports or seasonal operations.

### How to Drop an Index

```sql
DROP INDEX IF EXISTS idx_customers_email;
```

If you're dropping an index on a production table and want to avoid locking writes, use `CONCURRENTLY`:

```sql
DROP INDEX CONCURRENTLY IF EXISTS idx_customers_email;
```

### How to Rebuild an Index

Over time, indexes can become bloated as rows are inserted, updated, and deleted. You can rebuild an index to reclaim space:

```sql
REINDEX INDEX idx_customers_email;
```

Or rebuild all indexes on a table:

```sql
REINDEX TABLE customers;
```

On production systems, use `REINDEX CONCURRENTLY` (PostgreSQL 12+) to avoid locking the table:

```sql
REINDEX INDEX CONCURRENTLY idx_customers_email;
```

---

## When Indexes Hurt Instead of Help

Indexes aren't free. Every index you add comes with costs:

1. **Write overhead** — every INSERT, UPDATE, or DELETE must also update every index on the table. If a table has 10 indexes and you insert a row, PostgreSQL performs 11 write operations (one for the table and one for each index). On write-heavy tables, excessive indexes can significantly slow down data modification.
2. **Storage cost** — indexes consume disk space. On large tables, indexes can take up as much space as the table itself, sometimes more. You can check this with `pg_relation_size`.
3. **Memory consumption** — PostgreSQL caches frequently used indexes in memory. More indexes means more memory pressure, which can push useful data out of the cache and slow down other queries.
4. **Maintenance burden** — indexes need periodic maintenance (vacuuming, reindexing) and add complexity to schema migrations.

The question to ask is not "should I add an index?" but rather "does the read performance gain justify the write performance cost for this table's workload?"

---

## Common Mistakes That Prevent Index Usage

You can have the perfect index and PostgreSQL might still ignore it. Here are the most common reasons.

### Wrapping the Indexed Column in a Function

```sql
-- Index on email
CREATE INDEX idx_email ON customers (email);

-- ❌ PostgreSQL cannot use the index because of LOWER()
SELECT * FROM customers WHERE LOWER(email) = 'user1@example.com';

-- ✅ Fix: create an expression index on LOWER(email)
CREATE INDEX idx_email_lower ON customers (LOWER(email));
```

Any function applied to the indexed column in a WHERE clause prevents the standard index from being used. You need an expression index that matches the function.

### Implicit Type Casting

```sql
-- id is an INTEGER column with an index
-- ❌ Passing a string forces a type cast, which may prevent index usage
SELECT * FROM customers WHERE id = '42';

-- ✅ Use the correct type
SELECT * FROM customers WHERE id = 42;
```

When the query's value type doesn't match the column type, PostgreSQL may cast the column to match, which prevents index usage.

### Using OR Conditions Across Different Columns

```sql
-- ❌ OR across different columns can prevent index usage
SELECT * FROM customers WHERE email = 'user1@example.com' OR city = 'Lagos';

-- ✅ Rewrite as UNION for better index utilization
SELECT * FROM customers WHERE email = 'user1@example.com'
UNION
SELECT * FROM customers WHERE city = 'Lagos';
```

### Leading Wildcards in LIKE Queries

```sql
-- ❌ Leading wildcard cannot use a B-tree index
SELECT * FROM customers WHERE email LIKE '%@example.com';

-- ✅ Trailing wildcard CAN use a B-tree index
SELECT * FROM customers WHERE email LIKE 'user1%';
```

A B-tree index is sorted from left to right. A leading wildcard (`%something`) means the database can't use the sorted structure and falls back to a sequential scan. If you need to search by suffix or substring, consider a GIN index with the `pg_trgm` extension.

### Low Selectivity

If a column has very few distinct values relative to the number of rows (low selectivity), PostgreSQL may decide a sequential scan is faster than using the index.

For example, if a `status` column has only three possible values (`'pending'`, `'shipped'`, `'delivered'`) and each value covers roughly a third of the table, an index on `status` alone provides little benefit. PostgreSQL would still need to read a large portion of the table, and the extra index lookup adds overhead.

A partial index is often the better solution in these cases.

---

## Best Practices for Indexing

Here's a summary of the key principles to follow:

1. **Index columns that appear in WHERE, JOIN, and ORDER BY clauses.** These are the columns the database needs to search, match, or sort by. Start with the queries that run most frequently or take the longest.
2. **Measure before and after with EXPLAIN ANALYZE.** Never add an index based on guesswork. Run your query with `EXPLAIN ANALYZE`, add the index, and run it again. If the execution time doesn't improve meaningfully, the index isn't helping.
3. **Don't index every column.** Each index slows down writes and consumes storage. Be deliberate about which columns you index based on actual query patterns.
4. **Use composite indexes for multi-column filters.** If your queries commonly filter on `city` and `last_name` together, a composite index on `(city, last_name)` is more efficient than two separate single-column indexes.
5. **Put the most selective column first in composite indexes.** The column that narrows the results the most should come first.
6. **Use partial indexes when you only query a subset of data.** If 90% of your queries target rows where `status = 'active'`, a partial index on that subset is smaller and faster than a full index.
7. **Monitor index usage regularly.** Query `pg_stat_user_indexes` to find unused indexes and remove them.
8. **Rebuild bloated indexes periodically.** On tables with heavy update/delete activity, indexes can become bloated. Use `REINDEX CONCURRENTLY` on production systems.

---

## Conclusion

In this tutorial, you learned what database indexes are and why they matter for query performance. You explored how B-tree indexes work under the hood, created several types of indexes (single-column, composite, partial, expression, and unique), and used `EXPLAIN ANALYZE` to measure the impact.

You also learned about the trade-offs indexes introduce — write overhead, storage cost, and memory pressure — and the common mistakes that silently prevent PostgreSQL from using your indexes.

The core principle is simple: index deliberately based on your actual query patterns, measure the results, and remove anything that isn't pulling its weight.

::: info About me

If you found this tutorial helpful, you can find more of my writing on [freeCodeCamp (<VPIcon icon="fa-brands fa-free-code-camp"/>`iyiola`)](https://freecodecamp.org/author/iyiola) and connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`iyioladev`)](https://linkedin.com/in/iyioladev) and [X (<VPIcon icon="fa-brands fa-x-twitter" />`iyiola_dev_`)](https://x.com/iyiola_dev_).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Database Indexes Work – A Practical Guide with PostgreSQL Examples",
  "desc": "Every developer eventually runs into a slow query. The table has grown from a few hundred rows to a few million, and what used to take milliseconds now takes seconds — or worse. The fix, more often th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-database-indexes-work-a-practical-guide-with-postgresql-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
