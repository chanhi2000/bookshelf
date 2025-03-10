---
lang: en-US
title: "Chapter 6: How to Structure Return Data in SQL"
description: "Article(s) > (6/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (6/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 6: How to Structure Return Data in SQL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-6-how-to-structure-return-data-in-sql.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-6-how-to-structure-return-data-in-sql"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

---

## The `LIMIT` keyword

Sometimes we don't want to retrieve every record from a table. For example, it's common for a production database table to have millions of rows, and `SELECT`ing all of them might crash your system. This is where the `LIMIT` keyword enters the chat.

The `LIMIT` keyword can be used at the end of a select statement to reduce the number of records returned.

```sql
SELECT * FROM products
WHERE product_name LIKE '%berry%'
LIMIT 50;
```

The query above retrieves all the records from the `products` table where the name contains the word berry. If we ran this query on the Facebook database, it would almost certainly return a lot of records.

The `LIMIT` statement only allows the database to return up to 50 records matching the query. This means that if there aren't that many records matching the query, the `LIMIT` statement will not have an effect.

---

## The SQL `ORDER BY` keyword

SQL also offers us the ability to sort the results of a query using `ORDER BY`. By default, the `ORDER BY` keyword sorts records by the given field in ascending order, or `ASC` for short. However, `ORDER BY` does support descending order as well with the keyword `DESC`.

::: tip Examples

This query returns the `name`, `price`, and `quantity` fields from the `products` table sorted by `price` in ascending order:

```sql
SELECT name, price, quantity FROM products
ORDER BY price;
```

This query returns the `name`, `price`, and `quantity` of the products ordered by the quantity in descending order:

```sql
SELECT name, price, quantity FROM products
ORDER BY quantity desc;
```

:::

---

## Order By and Limit

When using both `ORDER BY` and `LIMIT`, the `ORDER BY` clause must come first.
