---
lang: en-US
title: "Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization"
description: "Article(s) > Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - data-science
  - sql
  - db
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization"
    - property: og:description
      content: "Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/advanced-postgresql-indexing.html
prev: /data-science/postgres/articles/README.md
date: 2025-09-03
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6882
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization"
  desc="Postgres creates an execution plan for how to retrieve the data you're asking for in a query. The execution plan is based in part on statistics from your data and indexes it has available. Just the right index and a bit of query tuning can have a huge payoff in performance gains that your users will notice."
  url="https://frontendmasters.com/blog/advanced-postgresql-indexing/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6882"/>

Welcome to part two of our exploration of Postgres indexes. Be sure to check out part one if you haven’t already. We’ll be picking up exactly where we left off.

::: info Article Series

```component VPCard
{
  "title": "Introduction to Postgres Indexes",
  "desc": "This Part 1 (of a 2-part series) is a practical, hands-on, applicable approach to database indexes. We’ll cover what B Trees are with a focus on deeply understanding, and internalizing how they store data on disk, and how your database uses them to speed up queries. This will set us up nicely for part 2, […]",
  "link": "/frontendmasters.com/intro-to-postgres-indexes.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization",
  "desc": "Postgres creates an execution plan for how to retrieve the data you're asking for in a query. The execution plan is based in part on statistics from your data and indexes it has available. Just the right index and a bit of query tuning can have a huge payoff in performance gains that your users will notice.",
  "link": "/frontendmasters.com/advanced-postgresql-indexing.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

We have the same books table as before, containing approximately 90 million records.

::: note Editors’ note

Need to bone up on PostgreSQL all around? Our course [<FontIcon icon="fas fa-globe"/>Complete Intro to SQL & PostgreSQL](https://frontendmasters.com/courses/sql/) from Brian Holt will be perfect for you.

:::

---

## Filtering and sorting

Let’s dive right in. Imagine you work for a book distribution company. You’re responsible for publishers and need to query info on them. There are approximately 250,000 different publishers, with a wide variance in the number of books published by each, which we’ll explore.

Let’s start easy. You want to see the top 10 books, sorted alphabetically, for a single publisher.

```sql
EXPLAIN ANALYZE
SELECT *
FROM books
WHERE publisher = 157595
ORDER BY title
LIMIT 10;
```

This publisher is relatively small, with only 65 books in its catalog. Nonetheless, the query is slow to run, taking almost **four seconds**.

::: note

If you followed the same steps from part 1 to create this same database, note that your ids will be different.

:::

![A detailed execution plan showing the performance analysis of a query in Postgres, including sorting and filtering operations.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img1-basic-publisher-query.png?resize=1024%2C462&ssl=1)

This is hardly surprising; there are a lot of rows in our table, and finding the rows for that publisher takes a while, since Postgres has to scan the entire heap.

So we add an index on, for now, just publisher.

```sql
CREATE INDEX idx_publisher ON books(publisher);
```

We can think of our index in this way. It just helps us identify all the book entries by publisher. To get the rest of the info on the book, we go to the heap.

![A visual representation of a tree structure showing nodes and leaves, illustrating the hierarchical arrangement of data, likely related to a database index.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img2-publisher-btree.png?resize=1024%2C294&ssl=1)

And now our same query is incredibly fast.

![Execution plan displayed for a SQL query, includes cost, index conditions, number of rows, and execution time details.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img3-small-publisher-query-plan.png?resize=1024%2C225&ssl=1)

Nothing surprising or interesting.

But now you need to run the same query, but on a different publisher, number 210537. This is the biggest publisher in the entire database, with over 2 million books. Let’s see how our index fares.

```sql
EXPLAIN ANALYZE
SELECT *
FROM books
WHERE publisher = 210537
ORDER BY title
LIMIT 10;
```

![A detailed query plan output for a PostgreSQL database showing execution details, including cost, rows returned, and time taken for sorting and scanning operations.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img4-large-publisher-plan.png?resize=1024%2C449&ssl=1)

Actually, our index wasn’t used at all. Postgres just scanned the whole table, grabbing our publisher along the way, and then sorted the results to get the top 10. We’ll discuss why a little later, as we did in the prior post, but the short of it is that the **random** heap accesses from reading so many entries off of an index would be expensive; Postgres decided the scan would be cheaper. These decisions are all about tradeoffs and are governed by statistics and cost estimates.

Previously, we threw the “other” field into the `INCLUDE()` list, so the engine wouldn’t have to leave the index to get the other field it needed. In this case, we’re selecting *everything*. I said previously to be diligent in avoiding unnecessary columns in the `SELECT` clause for just this reason, but here, we assume we actually do need all these columns.

We probably don’t want to dump every single column into the `INCLUDE` list of the index: we’d basically just be redefining our table into an index.

But why do we need to read so many rows in the first place? We have a limit of 10 on our query. The problem, of course, is that we’re ordering on title. And Postgres needs to see all rows for a publisher (2 million rows in this case) in order to sort them, and grab the first 10. What if we built an index on `publisher`, *and then* `title`?

```sql
CREATE INDEX idx_publisher_title ON books(publisher, title);
```

That would look like this:

![A diagram illustrating a B-tree structure for organizing books, showing nodes and leaves with book titles like 'Jane Eyre' and 'War and Peace' arranged hierarchically.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img5-publisher-title-index.png?resize=1024%2C347&ssl=1)

If Postgres were to search for a specific publisher, it could just seek down to the start of that publisher’s books, and then read however many needed, right off the leaf nodes, couldn’t it? There could be 2 million book entries in the leaf nodes, but Postgres could just read the first 10, and be guaranteed that they’re the first 10, since that’s how the index is ordered.

Let’s try it.

![Execution plan showing the limit, index scan using idx_publisher_title on books, and the planning and execution times.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img6-fast-search-large-pub.png?resize=1024%2C150&ssl=1)

We got the top 10 books, sorted, from a list of over two million in less than a fourth of a millisecond. Amazing!

---

## More publishers!

Now your boss comes and tells you to query the top 10 books, sorted alphabetically, as before, but over **either** publisher, combined. To be clear, the requirement is to take all books both publishers have published, combine them, then get the first ten, alphabetically.

Easy, you say assuredly, fresh off the high of seeing Postgres grab you that same data for your enormous publisher in under a millisecond.

You can put both publisher ids into an `IN` clause. Then, Postgres can search for each, one at a time, save the starting points of both, and then start reading forward on both, and sort of merge them together, taking the smaller title from either, until you have 10 books total.

Let’s try it!

```sql
EXPLAIN ANALYZE
SELECT *
FROM books
WHERE publisher IN (157595, 210537)
ORDER BY title
LIMIT 10;
```

Which produces this

![Query plan output from a PostgreSQL execution showing the execution strategy and performance metrics.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img7-multiple-publishers.png?resize=1024%2C447&ssl=1)

::: info [Sad Trombone]

Let’s re-read my completely made-up, assumed chain of events Postgres would take, from above.

> Postgres can search for each, one at a time, save the starting points of both, and then start reading forward on both, and sort of merge them together, taking the smaller title from either, until you have 10 books total.

:::

It reads like the Charlie meme from Always Sunny in Philadelphia.

![A scene from a television show featuring a man pointing at a chaotic board covered in papers, with red strings connecting different documents, emphasizing a frenzied investigation.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/always-sunny-meme.gif?resize=640%2C404&ssl=1)

If your description of what the database will do sounds like something that would fit with this meme, you’re probably overthinking things.

Postgres operates on very simple operations that it chains together. Index Scan, Gather Merge, Sort, Sequential Scan, etc.

---

## Searching multiple publishers

To be crystal clear, Postgres absolutely can search multiple keys from an index. Here’s the execution plan for the identical query from a moment ago, but with two small publishers for the publisher ids, which each have just a few hundred books

![Query plan visualization showing execution details for a SQL command, including limit, sort key, and index scan operations with timing statistics.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img8-multiple-small-publishers.png?resize=1024%2C215&ssl=1)

It did indeed do an index scan, on that same index. It just matched two values at once.

Rather than taking one path down the B Tree, it takes multiple paths down the B Tree, based on the multiple key value matches.

```plaintext
Index Cond: (publisher = ANY ('{157595,141129}'::integer[]))
```

That gives us **all** rows for *either* publisher. Then it needs to sort them, which it does next, followed by the limit.

Why does it need to sort them? When we have a *single* publisher, we *know* all values under that publisher are ordered.

*Look* at the index.

![A flowchart representing a tree structure of book titles, with nodes for major titles like 'Jane Eyre' and 'War and Peace,' and leaves for individual entries, including 'The Great Gatsby' and 'Moby Dick.'](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img9-single-publisher-read.png?resize=1024%2C352&ssl=1)

Imagine we searched for publisher 8. Postgres can go directly to the beginning of that publisher, and *just read*:

```plaintext
"Animal Farm"  
"Of Mice and Men"  
```

Look what happens when we search for *two* publishers, 8 and also, now, 21.

![A tree structure diagram representing a set of books, showing nodes with titles such as 'Jane Eyre' and 'War and Peace', along with leaf nodes containing book entries like 'The Great Gatsby', 'Animal Farm', and 'To Kill a Mockingbird'.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img10-double-publisher-read.png?resize=1024%2C348&ssl=1)

We can’t just start reading for those matched records. That would give us

```plaintext
"Animal Farm"
"Of Mice and Men"
"Lord of The Flies"
"The Catcher in The Rye"
```

The books under each publisher are ordered, but the overall list of matches is not. And again, Postgres operates on *simple* operations. Elaborate meta descriptions like “well it’ll just merge the matches from each publisher taking the less of the next entry from either until the limit is satisfied” won’t show up in your execution plan, at least not directly.

### Why did the publisher id change the plan?

Before we make this query fast, let’s briefly consider why our query’s plan changed so radically between searching for two small publishers compared to an enormous publisher and a small one.

As we discussed in part 1, Postgres tracks and uses statistics about your data in order to craft the best execution plan it can. Here, when you searched for the large publisher, it realized that query would yield an enormous number of rows. That led it to decide that simply scanning through the heap directly would be faster than the large number of random i/o that would be incurred from following so many matches in the index’s leaf nodes, over to the corresponding locations on the heap. Random i/o is bad, and Postgres will usually try to avoid it.

---

## Crafting a better query

You can absolutely have Postgres find the top 10 books in both publishers, and then put them together, sorted, and take the first 10 from there. You just have to be explicit about it.

```sql
EXPLAIN ANALYZE
WITH pub1 AS (
    SELECT * FROM books
    WHERE publisher = 157595
    ORDER BY title LIMIT 10
), pub2 as (
    SELECT * FROM books
    WHERE publisher = 210537
    ORDER BY title LIMIT 10
)
SELECT * FROM pub1
UNION ALL
SELECT * FROM pub2
ORDER BY title
limit 10;
```

The syntax below is called a common table expression, or a CTE. It’s basically a query that we define, and then query against later.

```sql
WITH pub1 AS (
    SELECT * FROM books
    WHERE publisher = 157595
    ORDER BY title LIMIT 10
)
```

Let’s run it!

The execution plan is beautiful

![A screenshot displaying a query execution plan from a database, showing the steps involved in retrieving data for two publishers from a books table using indexed scans and sorting.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img11-cte-append.png?resize=1024%2C257&ssl=1)

It’s fast! As you can see, it runs in less than a fifth of a millisecond (0.186ms — but who’s counting)?

Always read these from the bottom:

![Execution plan showing the performance of an index scan in a PostgreSQL database, with details on limits, rows processed, and execution time.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img11a-cte-append.png?resize=1024%2C130&ssl=1)

It’s the same exact index scan from before, but on a single publisher, with a limit of 10, run twice. Postgres can seek to the right publisher, and just read 10 for the first publisher, and then repeat for the second publisher. Then it puts those lists together.

Remember the silly, contrived Postgres operation I made up before?

> … and then start reading forward on both, and sort of merge them together, taking the smaller title from either, until you have 10 books total.

You’re not going to believe this, but that’s exactly what the Merge Append on line 2 does

```plaintext
->  Merge Append  (cost=1.40..74.28 rows=20 width=111) (actual time=0.086..0.115 rows=10 loops=1)
```

You can achieve amazing things with modern databases if you know how to structure your queries *just* right.

---

## How does this scale?

You won’t want to write queries like this manually. Presumably, you’d have application code taking a list of publisher ids, and constructing something like this. How will it perform as you add more and more publishers?

I’ve explored this very idea on larger production sets of data (much larger than what we’re using here). I found that, somewhere around a *thousand* ids, the performance does break down. But not because there’s too much data to work with. The *execution* of those queries, with even a thousand ids, took only a few hundred `ms`. But the *Planning Time* started to take many, many seconds. It turns out having Postgres parse through a thousand CTEs, and put a plan together takes time.

---

## Version 2

We’re onto something, for sure. But can we take a list of ids, and force them into individual queries that match on that specific id, with a limit, and then select from the overall bucket of results? Exactly like before, but without having to manually cobble together a CTE for each id?

When there’s a will, there’s a way.

```sql
EXPLAIN ANALYZE
WITH ids AS (
    SELECT * FROM (
      VALUES (157595), (210537)
    ) t(id)
), results AS (
    SELECT bookInfo.*
    FROM ids
    CROSS JOIN lateral (
      SELECT *
      FROM books
      WHERE publisher = ids.id
      ORDER BY title
      LIMIT 10
    ) bookInfo
)
SELECT *
FROM results
ORDER BY title
LIMIT 10;
```

Let’s walk through this.

Our `ids` CTE:

```sql
WITH ids AS (
    SELECT * FROM (
      VALUES (157595), (210537)
    ) t(id)
)
```

This defines a pseudo-table that has one column, with two rows. The rows have values of our publisher ids for the sole column: 157595 and 210537.

```plaintext
values (157595), (210537)
```

But if it’s a table, how do we query against the column? It needs to have a name. That’s what this syntax is.

```plaintext
t(id)
```

We gave that column a name of `id`.

The `results` CTE is where the real work happens.

```sql
results AS (
    SELECT bookInfo.*
    FROM ids
    CROSS JOIN lateral (
      SELECT *
      FROM books
      WHERE publisher = ids.id
      ORDER BY title
      LIMIT 10
    ) bookInfo
)
```

We query against our `ids` table, and then use the ugly `cross join lateral` expression as a neat trick to run our normal books query, but with access to the publisher value in the ids CTE. The value in the ids CTE is the publisher id. So we’ve achieved what we want: we’re conceptually looping through those ids, and then running our fast query on each.

The term `lateral` is the key. Think of (American) football, where a lateral is a sideways pass. Here, the lateral keyword allows us to “laterally” reference the `ids.id` value from the expression right beside it; the `ids` CTE *laterals* each id over to the results CTE.

That coaxes Postgres to run its normal index scan, followed by a read of the next 10 rows. That happens once for each id. That whole meta-list will then contain (up to) 10 rows for each publisher, and then this…

```sql
SELECT *
FROM results
ORDER BY title
LIMIT 10;
```

… re-sorts, and takes the first 10. In my own experience, this scales fabulously. Even with a few thousand ids I couldn’t get this basic setup to take longer than half a second, even on a much larger table than we’ve been looking at here.

### Let’s run it!

Let’s see what this version of our query looks like

![A query plan execution analysis demonstrating performance improvements after creating an index on the 'books' table in Postgres.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/img12-cross-join.png?resize=1024%2C268&ssl=1)

Still a small fraction of a millisecond, but ever so slightly slower; this now runs in 0.207ms. And the execution plan is a bit longer and more complex.

```plaintext
->  Nested Loop  (cost=0.69..81.19 rows=20 width=111) (actual time=0.042..0.087 rows=20 loops=1)
```

A nested loop join is a pretty simple (and *usually* pretty slow) join algorithm. It just takes each value in the one list, and then applies it to each value in the second list. In this case, though, it’s taking values from a static list and applying them against an incredibly fast query.

The left side of the join is each id from that static table we built

```plaintext
->  Values Scan on "\*VALUES\*"  (cost=0.00..0.03 rows=2 width=4) (actual time=0.001..0.002 rows=2 loops=1)
```

The right side is our normal (*fast*) query that we’ve seen a few times now.

```plaintext
->  Limit  (cost=0.69..40.48 rows=10 width=111) (actual time=0.024..0.037 rows=10 loops=2)
      ->  Index Scan using idx_publisher_title on books  (cost=0.69..2288.59 rows=575 width=111) (actual time=0.023..0.034 rows=10 loops=2)
         Index Cond: (publisher = "\*VALUES\*".column1)
```

However, our nice Merge Append is gone, replaced with a normal sort. The reason is that we replaced discrete CTEs, each of which produced separate, identically sorted outputs, which the planner could identify, and apply a Merge Append to. Merge Append works on multiple, independently sorted streams of data. Instead, this is just a regular join, which produces one stream of data, and therefore needs to be sorted.

But this is no tragedy. The query runs in a tiny fraction of a **milli**second, and will not suffer planning time degradation like the previous CTE version would, as we add more and more publisher ids. Plus, the sort is over just `N*10` records, where N is the number of publishers. It would take a catastrophically large N to wind up with enough rows where Postgres would struggle to sort them quickly, especially since the limit of 10 would allow it to do an efficient top-N heapsort, like we saw in part 1. ---

## Stepping back

The hardest part of writing this post is knowing when to stop. I could easily write as much content again: we haven’t even gotten into joins, and how indexes can help there, or even materialized views. This is an endless topic, and one that I enjoy, but we’ll stop here for now.

The one theme throughout can be summed up as: understand *how* your data is stored, and *craft* your queries to make the best use possible of this knowledge. If you’re not sure exactly how to craft your queries to do this, then use your knowledge of how indexes work, and what you want your queries to accomplish to ask an *extremely* specific question to your favorite AI model. It’s very likely to *at least* get you closer to your answer. Oftentimes knowing *what* to ask is half the battle.

And of course, if your data is not stored as you need, then change how your data is stored. Indexes are the most common way, which we’ve discussed here. Materialized views would be the next power tool to consider when needed. But that’s a topic for another day.

---

## Parting thoughts

Hopefully, these posts have taught you a few things about querying, query tuning, and crafting the right index for the right situation. These are skills that can have a huge payoff in achieving palpable performance gains that your users will notice.

::: info Article Series

```component VPCard
{
  "title": "Introduction to Postgres Indexes",
  "desc": "This Part 1 (of a 2-part series) is a practical, hands-on, applicable approach to database indexes. We’ll cover what B Trees are with a focus on deeply understanding, and internalizing how they store data on disk, and how your database uses them to speed up queries. This will set us up nicely for part 2, […]",
  "link": "/frontendmasters.com/intro-to-postgres-indexes.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization",
  "desc": "Postgres creates an execution plan for how to retrieve the data you're asking for in a query. The execution plan is based in part on statistics from your data and indexes it has available. Just the right index and a bit of query tuning can have a huge payoff in performance gains that your users will notice.",
  "link": "/frontendmasters.com/advanced-postgresql-indexing.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

::: note Editor’s note

our [The Complete Course for Building Backend Web Apps with Go](https://frontendmasters.com/courses/complete-go/) includes setting up a PostgreSQL database and running it in Docker, all from scratch.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Advanced PostgreSQL Indexing: Multi-Key Queries and Performance Optimization",
  "desc": "Postgres creates an execution plan for how to retrieve the data you're asking for in a query. The execution plan is based in part on statistics from your data and indexes it has available. Just the right index and a bit of query tuning can have a huge payoff in performance gains that your users will notice.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/advanced-postgresql-indexing.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
