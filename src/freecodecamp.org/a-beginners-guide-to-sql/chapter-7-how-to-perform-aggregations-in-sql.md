---
lang: en-US
title: "Chapter 7: How to Perform Aggregations in SQL"
description: "Article(s) > (7/11) The SQL Handbook – A Free Course for Web Developers"
category:
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 7: How to Perform Aggregations in SQL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-7-how-to-perform-aggregations-in-sql.html
date: 2023-09-05
isOriginal: false
author:
  - name: Lane Wagner
    url : https://freecodecamp.org/news/author/wagslane/
cover: https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The SQL Handbook – A Free Course for Web Developers",
  "desc": "SQL is everywhere these days. Whether you're learning backend development, data engineering, DevOps, or data science, SQL is a skill you'll want in your toolbelt. This a free and open text-based handbook. If you want to get started, just scroll down ...",
  "link": "/freecodecamp.org/a-beginners-guide-to-sql/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The SQL Handbook – A Free Course for Web Developers"
  desc="SQL is everywhere these days. Whether you're learning backend development, data engineering, DevOps, or data science, SQL is a skill you'll want in your toolbelt. This a free and open text-based handbook. If you want to get started, just scroll down ..."
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-7-how-to-perform-aggregations-in-sql"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

An "aggregation" is a single value that's derived by combining several other values. We performed an aggregation earlier when we used the `count` statement to count the number of records in a table.

---

## Why use aggregations?

Data stored in a database should generally be stored [<FontIcon icon="fas fa-globe"/>raw](https://wagslane.dev/posts/keep-your-data-raw-at-rest/). When we need to calculate some additional data from the raw data, we can use an aggregation.

Take the following `count` aggregation as an example:

```sql
SELECT COUNT(*)
FROM products
WHERE quantity = 0;
```

This query returns the number of products that have a `quantity` of `0`. We could store a count of the products in a separate database table, and increment/decrement it whenever we make changes to the `products` table - but that would be redundant.

It's much simpler to store the products in a single place (we call this a [<FontIcon icon="fa-brands fa-wikipedia-w"/>single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth)) and run an aggregation when we need to derive additional information from the raw data.

---

## The `SUM` function

The `sum` aggregation function returns the sum of a set of values.

For example, the query below returns a single record containing a single field. The returned value is equal to the total salary being collected by all of the `employees` in the `employees` table.

```sql
SELECT sum(salary)
FROM employees;
```

Which returns:

| `SUM(SALARY)` |
| :--- |
| 2483 |

---

## The `MAX` function

As you may expect, the `max` function retrieves the *largest* value from a set of values. For example:

```sql
SELECT max(price)
FROM products
```

This query looks through all of the prices in the `products` table and returns the price with the largest price value. Remember it only returns the `price`, not the rest of the record. You always need to specify each field you want a query to return.

::: note Schema

- The `sender_id` will be present for any transactions where the user in question (`user_id`) is receiving money (from the sender).
- The `recipient_id` will be present for any transactions where the user in question (`user_id`) is sending money (to the recipient).

In other words, a transaction can only have a `sender_id` or a `recipient_id` - not both. The presence of one or the other indicates whether money is going into or out of the user's account.

This `user_id`, `recipient_id`, `sender_id` schema we've designed is only one way to design a transactions database - there are other valid ways to do it. It's the one we're using, and later we'll talk more about the tradeoffs in different database design options.

:::

---

## The `MIN` function

The `min` function works the same as the `max` function but finds the lowest value instead of the highest value.

```sql
SELECT product_name, min(price)
from products;
```

This query returns the `product_name` and the `price` fields of the record with the lowest `price`.

---

## The `GROUP BY` clause

There are times we need to group data based on specific values.

SQL offers the `GROUP BY` clause which can group rows that have similar values into "summary" rows. It returns one row for each group. The interesting part is that each group can have an aggregate function applied to it that operates only on the grouped data.

::: tip Example

Imagine that we have a database with songs and albums, and we want to see how many songs are on each album. We can use a query like this:

```sql
SELECT album_id, count(song_id)
FROM songs
GROUP BY album_id;
```

This query retrieves a count of all the songs on each album. One record is returned per album, and they each have their own `count`.

:::

---

## The `AVG()` function

Just like we may want to find the minimum or maximum values within a dataset, sometimes we need to know the [average](https://en.wikipedia.org/wiki/Arithmetic_mean)!

SQL offers us the `AVG()` function. Similar to `MAX()`, `AVG()` calculates the average of all non-NULL values.

```sql
select song_name, avg(song_length)
from songs
```

This query returns the average `song_length` in the `songs` table.

---

## The `HAVING` clause

When we need to filter the results of a `GROUP BY` query even further, we can use the `HAVING` clause. The `HAVING` clause specifies a search condition for a group.

The `HAVING` clause is similar to the `WHERE` clause, but it operates on groups after they've been grouped, rather than rows before they've been grouped.

```sql
SELECT album_id, count(id) as count
FROM songs
GROUP BY album_id
HAVING count > 5;
```

This query returns the `album_id` and count of its songs, but only for albums with more than `5` songs.

---

## `HAVING` vs `WHERE` in SQL

It's fairly common for developers to get confused about the difference between the `HAVING` and the `WHERE` clauses - they're pretty similar after all.

The difference is fairly simple in actuality:

- A `WHERE` condition is applied to all the data in a query before it's grouped by a `GROUP BY` clause.
- A `HAVING` condition is only applied to the grouped rows that are returned after a `GROUP BY` is applied.

This means that if you want to filter on the result of an aggregation, you need to use `HAVING`. If you want to filter on a value that's present in the raw data, you should use a simple `WHERE` clause.

---

## The `ROUND` function

Sometimes we need to [<FontIcon icon="fa-brands fa-wikipedia-w"/>round](https://en.wikipedia.org/wiki/Rounding) some numbers, particularly when working with the results of an aggregation. We can use the `ROUND()` function to get the job done.

The SQL `round()` function allows you to specify both the value you wish to round and the precision to which you wish to round it:

```sql
round(value, precision)
```

If no precision is given, SQL will round the value to the nearest whole value:

```sql
select song_name, round(avg(song_length), 1)
from songs
```

This query returns the average `song_length` from the `songs` table, rounded to a single decimal point.
