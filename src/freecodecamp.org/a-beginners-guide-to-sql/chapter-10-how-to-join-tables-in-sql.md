---
lang: en-US
title: "Chapter 10: How to Join Tables in SQL"
description: "Article(s) > (10/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (10/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 10: How to Join Tables in SQL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-10-how-to-join-tables-in-sql.html
prev: /data-science/articles/README.md
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-10-how-to-join-tables-in-sql"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

Joins are one of the most important features that SQL offers. Joins allow us to make use of the relationships we have set up between our tables. In short, joins allow us to query multiple tables at the same time.

---

## `INNER JOIN`

The simplest and most common type of join in SQL is the `INNER JOIN`. By default, a `JOIN` command is an `INNER JOIN`.

An `INNER JOIN` returns all of the records in `table_a` that have matching records in `table_b`, as demonstrated by the following Venn diagram.

![inner join](https://i.imgur.com/wgxAmhA.png)

### The `ON` clause

In order to perform a join, we need to tell the database which fields should be "matched up". The `ON` clause is used to specify these columns to join.

```sql
SELECT *
FROM employees
INNER JOIN departments 
ON employees.department_id = departments.id;
```

The query above returns all the fields from both tables. The `INNER` keyword doesn't have anything to do with the number of columns returned - it only affects the number of rows returned.

---

## Namespacing on Tables

When working with multiple tables, you can specify which table a field exists on using a `.`. For example:

`table_name.column_name`

```sql
SELECT students.name, classes.name
FROM students
INNER JOIN classes on classes.class_id = students.class_id;
```

The above query returns the `name` field from the `students` table and the `name` field from the `classes` table.

---

## `LEFT JOIN`

A `LEFT JOIN` will return every record from `table_a` regardless of whether or not any of those records have a match in `table_b`. A left join will also return any matching records from `table_b`.

Here is a Venn diagram to help visualize the effect of a `LEFT JOIN`.

![left-join](https://i.imgur.com/mNbhWfM.png)

A small trick you can do to make writing the SQL query easier is define an [<FontIcon icon="fa-brands fa-wikipedia-w"/>alias](https://en.wikipedia.org/wiki/Alias_(SQL)) for each table. Here's an example:

```sql
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d
ON e.department_id = d.id;
```

Notice the simple alias declarations `e` and `d` for `employees` and `departments` respectively.

Some developers do this to make their queries less verbose. That said, I personally hate it because single-letter variables are harder to understand the meaning of.

---

## `RIGHT JOIN`

A `RIGHT JOIN` is, as you may expect, the opposite of a `LEFT JOIN`. It returns all records from `table_b` regardless of matches, and all matching records between the two tables.

![right-join](https://i.imgur.com/LG6Y43j.png)

### SQLite Restriction

SQLite does not support right joins, but many dialects of SQL do. If you think about it, a `RIGHT JOIN` is just a `LEFT JOIN` with the order of the tables switched, so it's not a big deal that SQLite doesn't support the syntax.

---

## `FULL JOIN`

A `FULL JOIN` combines the result set of the `LEFT JOIN` and `RIGHT JOIN` commands. It returns all records from both from `table_a` and `table_b` regardless of whether or not they have matches.

![Full-join](https://i.imgur.com/Kk3k1Ub.png)

### SQLite

Like `RIGHT JOIN`s, SQLite doesn't support `FULL JOIN`s but they are still important to know.
