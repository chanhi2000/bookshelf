---
lang: en-US
title: "From 17ms to 0.04ms: How to Design the Right SQL Index"
description: "Article(s) > From 17ms to 0.04ms: How to Design the Right SQL Index"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > From 17ms to 0.04ms: How to Design the Right SQL Index"
    - property: og:description
      content: "From 17ms to 0.04ms: How to Design the Right SQL Index"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-to-design-the-right-sql-index.html
prev: /data-science/postgresql/articles/README.md
date: 2026-08-22
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_208.png
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
  name="From 17ms to 0.04ms: How to Design the Right SQL Index"
  desc="What does a good SQL index look like? I seeded Postgres with 1 million comments and measured every indexing decision with EXPLAIN ANALYZE: a 17ms sequential…"
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techbloghow-to-design-the-right-sql-index"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_208.png"/>

A good SQL index comes from the queries your application runs, not from the table schema. Composite indexes need the right column order: equality columns first, then the column you sort or range on. `EXPLAIN ANALYZE` is how you verify it: a sequential scan over 1 million comments takes 17ms, and the right composite index answers in 0.04ms.

What does a good SQL index look like?

The answer will vary based on your queries and access paths. The only way to confidently know is to examine the query plans with `EXPLAIN ANALYZE` and figure out from there which index might help.

So let's do exactly that. I seeded a [<VPIcon icon="iconfont icon-postgresql"/>Postgres](https://postgresql.org) 18 instance in Docker with an issue tracker: 100 users, 10,000 issues, and 1 million comments. By the end, one query drops from 436ms to half a millisecond.

---

## What Is a SQL Index?

An index stores your chosen columns in sorted order, with every entry pointing back to its full row. The default kind in every major database is the **B-tree**: a shallow tree, a few levels deep even at millions of rows. A sequential scan reads all 1 million comments; an index scan descends those few levels and fetches only the matches.

![Side by side comparison of a sequential scan reading every row in a one million row comments table versus a B-tree index scan descending three levels and fetching only the matching rows](https://milanjovanovic.tech/blogs/mnw_208/seq_scan_vs_index_walk.png)

---

## Start With the Query, Not the Table

You don't pick indexes by staring at the schema; they come from the queries your application actually runs.

My `comments` table serves three access patterns:

- All comments by a user
- All comments for an issue
- Comments for an issue from one user, newest first, last month only

---

## Reading the First Plan

The first pattern, with no index beyond the primary key:

```sql{10,12,13}
EXPLAIN ANALYZE
SELECT COUNT(*) FROM comments WHERE 1=1
AND user_id = 1;

---
Finalize Aggregate
  ->  Gather
        ->  Partial Aggregate
              ->  Parallel Seq Scan on comments  (actual time=0.010..11.727 rows=3356.67 loops=3)
                    Filter: (user_id = 1)
                    Rows Removed by Filter: 329977
Execution Time: 17.066 ms
```

`EXPLAIN ANALYZE` runs the query for real and prints the plan Postgres used: a `Parallel Seq Scan` reads all 1 million rows to count 10,070, in **17ms**.

Create the index and rerun the query:

```sql
CREATE INDEX ix_comments_user_id
ON comments (user_id);
```

```sql{2,5}
Aggregate
  ->  Index Only Scan using ix_comments_user_id on comments  (actual time=0.024..0.348 rows=10070.00 loops=1)
        Index Cond: (user_id = 1)
        Heap Fetches: 0
Execution Time: 0.612 ms
```

17ms down to **0.6ms**. It's an `Index Only Scan` because the index alone can answer a `COUNT(*)`: Postgres never touches the table.

---

## Column Order Is Everything

The third access pattern is the interesting one:

```sql
SELECT * FROM comments WHERE 1=1
AND issue_id = 10
AND user_id = 29
AND created_at >= NOW() - INTERVAL '1 month'
ORDER BY created_at DESC;
```

With no index, it's another sequential scan: **16.6ms**. With single-column indexes on `issue_id` and `user_id`, Postgres intersects them with a `BitmapAnd` and still sorts the survivors: **0.6ms**, in three steps.

A composite index answers the whole query in one motion:

```sql
CREATE INDEX ix_comments_issue_user_date
ON comments (issue_id, user_id, created_at DESC);
```

```sql{1,3}
Index Scan using ix_comments_issue_user_date on comments  (actual time=0.019..0.026 rows=2.00 loops=1)
  Index Cond: ((issue_id = 10) AND (user_id = 29) AND (created_at >= (now() - '1 mon'::interval)))
Execution Time: 0.039 ms
```

All three conditions moved into the `Index Cond`, and the `Sort` is gone: the index already returns rows ordered by `created_at DESC`. Runtime: **0.04ms**, over 400x faster.

A composite index sorts by its first column, then the second within equal values, then the third. Postgres jumps straight to the `issue_id = 10, user_id = 29` section and reads it in order.

Column order also decides what else the index can serve: `issue_id` alone works, `issue_id` plus `user_id` works, but `user_id` alone doesn't (its values are scattered across the whole tree). This is the **leftmost prefix rule**, and it's why the index on `user_id` stays.

The rule of thumb: **equality columns first, then the column you sort or range on**.

---

## The Query Our New Index Can't Serve

Every issue tracker runs this dashboard query: the 25 newest open issues, each with its latest comment, fetched by a `LATERAL` subquery:

```sql
SELECT i.id, c.body, c.created_at
FROM issues i
CROSS JOIN LATERAL (
  SELECT body, created_at
  FROM comments
  WHERE issue_id = i.id
  ORDER BY created_at DESC
  LIMIT 1
) c
WHERE 1=1
AND i.status = 'open'
ORDER BY i.created_at DESC
LIMIT 25;
```

```sql{1,4,6}
Nested Loop  (actual time=0.790..352.076 rows=6537.00 loops=1)
  ->  Seq Scan on issues i  (rows=6537.00 loops=1)
  ->  Limit  (rows=1.00 loops=6537)
        ->  Sort  (actual time=0.053..0.053 rows=1.00 loops=6537)
              ->  Bitmap Index Scan on ix_comments_issue_user_date  (loops=6537)
Execution Time: 435.794 ms
```

The composite index gets used, but its entries are sorted by `user_id` before `created_at`, so a `Sort` runs 6,537 times, once per open issue: **436ms**.

Column order strikes again. For this access path, `created_at` must come right after `issue_id`:

```sql
CREATE INDEX ix_comments_issue_date
ON comments (issue_id, created_at DESC);
```

Each probe becomes a one-row index scan: **25ms**. But the `LIMIT` still can't stop the loop, because issues arrive unsorted. One more index streams them newest-first:

```sql
CREATE INDEX ix_issues_status_date
ON issues (status, created_at DESC);
```

```sql{1,3,5,6}
Limit  (actual time=0.086..0.465 rows=25.00 loops=1)
  ->  Nested Loop  (actual time=0.085..0.463 rows=25.00 loops=1)
        ->  Index Scan using ix_issues_status_date on issues i  (rows=25.00 loops=1)
        ->  Limit  (rows=1.00 loops=25)
              ->  Index Scan using ix_comments_issue_date on comments  (rows=1.00 loops=25)
Execution Time: 0.489 ms
```

Every node reads only what it returns: 25 issues, 25 probes, one comment each. **0.5ms**, nearly 900x faster.

---

## What Do Indexes Cost?

Every insert, update, and delete now maintains every index, so each one you add slows writes a little. They take disk space, too:

```sql
SELECT
  indexrelname AS index_name
  , pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
WHERE 1=1
AND relname = 'comments';
```

Each composite index weighs **30 MB** for 1 million comments, against about 7 MB per single-column one. And `(issue_id, created_at DESC)` makes the plain `issue_id` index redundant, so drop it. Index the queries you actually run, not the ones you might run someday.

An index only helps if the query can use it: wrap the indexed column in a function and Postgres ignores it, a failure mode I covered in [**Why Postgres Ignores Your Index**](/blog/sql-index-not-used-sargability).

---

## Summary

- **Design indexes from your queries, not your tables.**
- **Composite indexes need the right column order**: equality columns first, then the sort column.
- **`LIMIT` only helps when an index feeds it rows already in order.**
- **`EXPLAIN ANALYZE` is the proof.** Read the plan, not just the timing.
- **Every index costs writes and space.**

Once the indexes are right, [**cursor pagination**](/blog/understanding-cursor-pagination-and-why-its-so-fast-deep-dive) is the natural next step, built on exactly these composite indexes.

Thanks for reading.

And stay awesome!

---

---

## Frequently Asked Questions

What is a composite index?

A composite index stores several columns together, sorted by the first column, then by the second within equal values, then by the third. Postgres can jump straight to the section matching the leading columns and read it in order.

What order should columns go in a composite index?

Equality columns first, then the column you sort or range on. On the demo query, an index on (issue_id, user_id, created_at DESC) moved all three conditions into the index condition and removed the sort, going from 16.6ms to 0.04ms.

What is the leftmost prefix rule?

A composite index only serves queries that use its leading columns. With (issue_id, user_id, created_at DESC), filtering on issue_id works and issue_id plus user_id works, but user_id alone doesn't, because its values are scattered across the whole tree.

Why is my query still doing a sort when it uses an index?

The index returns rows in the wrong order. A dashboard query hit the index on (issue_id, user_id, created_at DESC), which sorts by user_id before created_at, so Postgres ran a sort once per open issue, 6,537 times, and the query took 436ms.

What is an Index Only Scan in Postgres?

An Index Only Scan means the index alone can answer the query, so Postgres never touches the table. Counting comments for one user ran as an Index Only Scan with zero heap fetches, in 0.6ms instead of a 17ms sequential scan.

Do indexes slow down writes?

Yes. Every insert, update, and delete maintains every index on the table, so each one you add slows writes a little. Indexes take disk space too: each composite index here weighed 30 MB for 1 million comments, against about 7 MB per single-column index.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "From 17ms to 0.04ms: How to Design the Right SQL Index",
  "desc": "What does a good SQL index look like? I seeded Postgres with 1 million comments and measured every indexing decision with EXPLAIN ANALYZE: a 17ms sequential…",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techbloghow-to-design-the-right-sql-index.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
