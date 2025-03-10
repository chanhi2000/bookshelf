---
lang: en-US
title: "Chapter 8: SQL Subqueries"
description: "Article(s) > (8/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (8/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 8: SQL Subqueries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-8-sql-subqueries.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-8-sql-subqueries"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

---

## Subqueries

Sometimes a single query is not enough to retrieve the specific records we need.

It is possible to run a query on the result set of another query - a query within a query! This is called "query-ception"... erm... I mean a "subquery".

Subqueries can be very useful in a number of situations when trying to retrieve specific data that wouldn't be accessible by simply querying a single table.

### How to retreive data from multiple tables

Here is an example of a subquery:

```sql
SELECT id, song_name, artist_id
FROM songs
WHERE artist_id IN (
    SELECT id
    FROM artists
    WHERE artist_name LIKE 'Rick%'
);
```

In this hypothetical database, the query above selects all of the `song_id`s, `song_name`s, and `artist_id`s from the `songs` table that are written by artists whose name starts with "Rick". Notice that the subquery allows us to use information from a different table - in this case the `artists` table.

### Subquery syntax

The only syntax unique to a subquery is the parentheses surrounding the nested query. The `IN` operator could be different, for example, we could use the `=` operator if we expect a single value to be returned.

Here's an example:

```sql
SELECT id, song_name, artist_id
FROM songs
WHERE artist_id IN (
    SELECT id
    FROM artists
    WHERE artist_name LIKE 'Rick%'
);
```

---

## No tables necessary

When working on a back-end application, this doesn't come up often, but it's important to remember that **SQL is a full programming language**. We usually use it to interact with data stored in tables, but it's quite flexible and powerful.

For example, you can `SELECT` information that's simply calculated, with no tables necessary.

```sql
SELECT 5 + 10 as sum;
```
