---
lang: en-US
title: "Chapter 11: Database Performance"
description: "Article(s) > (11/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (11/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 11: Database Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-11-database-performance.html
next: /freecodecamp.org/a-beginners-guide-to-sql/README.md#congratulations-on-making-it-to-the-end
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-11-database-performance"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

---

## SQL Indexes

An index is an in-memory structure that ensures that queries we run on a database are performant, that is to say, they run quickly.

If you've learned about data structures, most database indexes are just [<FontIcon icon="fa-brands fa-wikipedia-w"/>binary trees](https://en.wikipedia.org/wiki/Binary_tree). The binary tree can be stored in [<FontIcon icon="fa-brands fa-wikipedia-w"/>ram](https://en.wikipedia.org/wiki/Random-access_memory) as well as on [<FontIcon icon="fa-brands fa-wikipedia-w"/>disk](https://en.wikipedia.org/wiki/Computer_data_storage), and it makes it easy to lookup the location of an entire row.

`PRIMARY KEY` columns are indexed by default, ensuring you can look up a row by its `id` very quickly. But if you have other columns that you want to be able to do quick lookups on, you'll need to index them.

### `CREATE INDEX`

```sql
CREATE INDEX index_name on table_name (column_name);
```

It's fairly common to name an index after the column it's created on with a suffix of `_idx`.

---

## Index Review

As we discussed, an index is a data structure that can perform quick lookups. By indexing a column, we create a new in-memory structure, usually a binary-tree, where the values in the indexed column are sorted into the tree to keep lookups fast.

In terms of Big-O complexity, a binary tree index ensures that lookups are [<FontIcon icon="fa-brands fa-wikipedia-w"/>O(log(n))](https://en.wikipedia.org/wiki/Big_O_notation).

### Shouldn't we index everything? We can make the database ultra-fast!

While indexes make specific kinds of lookups much faster, they also add performance overhead - they can slow down a database in other ways.

Think about it: if you index every column, you could have hundreds of binary trees in memory. That needlessly bloats the memory usage of your database. It also means that each time you insert a record, that record needs to be added to many trees - slowing down your insert speed.

::: info Rule of thumb

Add an index to columns you know you'll be doing frequent lookups on. Leave everything else un-indexed. You can always add indexes later.

:::

---

## Multi-column indexes

Multi-column indexes are useful for the exact reason you might think - they speed up lookups that depend on multiple columns.

### `CREATE INDEX`

```sql
CREATE INDEX first_name_last_name_age_idx
ON users (first_name, last_name, age);
```

A multi-column index is sorted by the first column first, the second column next, and so forth. A lookup on only the first column in a multi-column index gets almost all of the performance improvements that it would get from its own single-column index. But lookups on only the second or third column will have very degraded performance.

::: info Rule of thumb

Unless you have specific reasons to do something special, only add multi-column indexes if you're doing frequent lookups on a specific combination of columns.

:::

---

## Denormalizing for speed

I left you with a cliffhanger in the "normalization" chapter. As it turns out, data integrity and deduplication come at a cost, and that cost is usually speed.

Joining tables together, using subqueries, performing aggregations, and running post-hoc calculations all take time. At very large scales these advanced techniques can actually take a huge performance toll on an application - sometimes grinding the database server to a halt.

Storing duplicate information can drastically speed up an application that needs to look it up in different ways. For example, if you store a user's country information right on their user record, no expensive join is required to load their profile page.

That said, denormalize at your own risk. Denormalizing a database incurs a large risk of inaccurate and buggy data.

In my opinion, it should be used as a kind of "last resort" in the name of speed.

---

## SQL Injection

SQL is a very common way hackers attempt to cause damage or breach a database. One of my favorite [<FontIcon icon="fas fa-globe"/>XKCD](https://xkcd.com/327/) comics of all time demonstrates the problem:

![bobby tables](https://bobby-tables.com/img/xkcd.png)

The joke here is that if someone was using this query:

```sql
INSERT INTO students(name) VALUES (?);
```

And the "name" of a student was `'Robert'); DROP TABLE students;--` then the resulting SQL query would look like this:

```sql
INSERT INTO students(name) VALUES ('Robert'); DROP TABLE students;
```

As you can see, this is actually 2 queries! The first one inserts "Robert" into the database, and the second one deletes the students table!

### How do we protect against SQL injection?

You need to be aware of SQL injection attacks, but to be honest the solution these days is to simply use a modern SQL library that sanitizes SQL inputs. We don't often need to sanitize inputs by hand at the application level anymore.

For example, the Go standard library's SQL packages automatically protects your inputs against SQL attacks if you [<FontIcon icon="fa-brands fa-golang"/>use it properly](https://go.dev/doc/database/sql-injection). In short, don't interpolate user input into raw strings yourself - make sure your database library has a way to sanitize inputs, and pass it those raw values.
