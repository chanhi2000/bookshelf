---
lang: en-US
title: "Chapter 9: Database Normalization"
description: "Article(s) > (9/11) The SQL Handbook - A Free Course for Web Developers"
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
      content: "Article(s) > (9/11) The SQL Handbook - A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 9: Database Normalization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/a-beginners-guide-to-sql/chapter-9-database-normalization.html
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
  "title": "The SQL Handbook - A Free Course for Web Developers",
  "desc": "SQL is everywhere these days. Whether you're learning backend development, data engineering, DevOps, or data science, SQL is a skill you'll want in your toolbelt. This a free and open text-based handbook. If you want to get started, just scroll down ...",
  "link": "/freecodecamp.org/a-beginners-guide-to-sql/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The SQL Handbook - A Free Course for Web Developers"
  desc="SQL is everywhere these days. Whether you're learning backend development, data engineering, DevOps, or data science, SQL is a skill you'll want in your toolbelt. This a free and open text-based handbook. If you want to get started, just scroll down ..."
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-9-database-normalization"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

---

## Table Relationships

Relational databases are powerful because of the relationships between the tables. These relationships help us to keep our databases clean and efficient.

A relationship between tables assumes that one of these tables has a `foreign key` that references the `primary key` of another table.

<VidStack src="youtube/WJTdg1AsSz0" />

### Types of Relationships

There are 3 primary types of relationships in a relational database:

1. One-to-one
2. One-to-many
3. Many-to-many

![relationships](https://i.imgur.com/u4i6XdL.png)

---

## One-to-one

A `one-to-one` relationship most often manifests as a field or set of fields on a row in a table. For example, a `user` will have exactly one `password`.

Settings fields might be another example of a one-to-one relationship. A user will have exactly one `email_preference` and exactly one `birthday`.

---

## One to many

When talking about the relationships between tables, a one-to-many relationship is probably the most commonly used relationship.

A one-to-many relationship occurs when a single record in one table is related to potentially many records in another table.

Note that the one->many relation only goes one way, a record in the second table can not be related to multiple records in the first table!

### Examples of one-to-many relationships

- A `customers` table and a `orders` table. Each customer has `0`, `1`, or many orders that they've placed.
- A `users` table and a `transactions` table. Each `user` has `0`, `1`, or many transactions that taken part in.

---

## Many to many

A many-to-many relationship occurs when multiple records in one table can be related to multiple records in another table.

### Examples of many-to-many relationships

- A `products` table and a `suppliers` table - Products may have `0` to many suppliers, and suppliers can supply `0` to many products.
- A `classes` table and a `students` table - Students can take potentially many classes and classes can have many students enrolled.

### Joining tables

Joining tables helps define many-to-many relationships between data in a database. As an example, when defining the relationship above between products and suppliers, we would define a joining table called `products_suppliers` that contains the primary keys from the tables to be joined.

Then, when we want to see if a supplier supplies a specific product, we can look in the joining table to see if the ids share a row.

### Unique constraints across 2 fields

When enforcing specific schema constraints we may need to enforce the `UNIQUE` constraint across two different fields.

```sql
CREATE TABLE product_suppliers (
  product_id INTEGER,
  supplier_id INTEGER,
  UNIQUE(product_id, supplier_id)
);
```

This ensures that we can have multiple rows with the same `product_id` or `supplier_id`, but we can't have two rows where both the `product_id` and `supplier_id` are the same.

---

## Database normalization

Database normalization is a method for structuring your database schema in a way that helps:

- Improve data integrity
- Reduce data redundancy

### What is data integrity?

"Data integrity" refers to the accuracy and consistency of data. For example, if a user's age is stored in a database, rather than their birthday, that data becomes incorrect automatically with the passage of time.

It would be better to store a birthday and calculate the age as needed.

### What is data redundancy?

"Data redundancy" occurs when the same piece of data is stored in multiple places. For example: saving the same file multiple times to different hard drives.

Data redundancy can be problematic, especially when data in one place is changed such that the data is no longer consistent across all copies of that data.

---

## Normal Forms

The creator of "database normalization", [<VPIcon icon="fa-brands fa-wikipedia-w"/>Edgar F. Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd), described different "normal forms" a database can adhere to. We'll talk about the most common ones.

- First normal form (1NF)
- Second normal form (2NF)
- Third normal form (3NF)
- Boyce-Codd normal form (BCNF)

![normal forms](https://i.imgur.com/CpDOeej.png)

In short, 1st normal form is the least "normalized" form, and Boyce-Codd is the most "normalized" form.

The more normalized a database, the better its data integrity, and the less duplicate data you'll have.

### In the context of normal forms, "primary key" means something a bit different

In the context of database normalization, we're going to use the term "primary key" slightly differently. When we're talking about SQLite, a "primary key" is a single column that uniquely identifies a row.

When we're talking more generally about data normalization, the term "primary key" means the collection of columns that uniquely identify a row. That can be a single column, but it can actually be any number of columns. A primary key is the minimum number of columns needed to uniquely identify a row in a table.

If you think back to the many-to-many joining table `product_suppliers`, that table's "primary key" was actually a combination of the 2 ids, `product_id` and `supplier_id`:

```sql
CREATE TABLE product_suppliers (
    product_id INTEGER,
    supplier_id INTEGER,
    UNIQUE(product_id, supplier_id)
);
```

---

## 1st Normal Form (1NF)

To be compliant with [<VPIcon icon="fa-brands fa-wikipedia-w"/>first normal form](https://en.wikipedia.org/wiki/First_normal_form), a database table simply needs to follow 2 rules:

- It must have a unique primary key.
- A cell can't have a nested table as its value (depending on the database you're using, this may not even be possible)

### Example of NOT 1st normal form

| `name` | `age` | `email` |
| :--- | :--- | :--- |
| Lane | 27 | lane@boot.dev |
| Lane | 27 | lane@boot.dev |
| Allan | 27 | allan@boot.dev |

This table does not adhere to 1NF. It has two identical rows, so there isn't a unique primary key for each row.

### Example of 1st normal form

The simplest way (but not the only way) to get into first normal form is to add a unique `id` column.

| `id` | `name` | `age` | `email` |
| :---: | :--- | :--- | :--- |
| 1 | Lane | 27 | lane@boot.dev |
| 2 | Lane | 27 | lane@boot.dev |
| 3 | Allan | 27 | allan@boot.dev |

It's worth noting that if you create a "primary key" by ensuring that two columns are always "unique together" that works too.

::: note

You should *almost* never design a table that doesn't adhere to 1NF

:::

First normal form is simply a good idea. I've never built a database schema where each table isn't at least in first normal form.

---

## 2nd Normal Form (2NF)

A table in [<VPIcon icon="fa-brands fa-wikipedia-w"/>second normal form](https://en.wikipedia.org/wiki/Second_normal_form) follows all the rules of 1st normal form, and one additional rule:

- All columns that are not part of the primary key are dependent on the entire primary key, and not just one of the columns in the primary key.

### Example of 1st NF, but not 2nd NF

In this table, the primary key is a combination of `first_name` + `last_name`.

| `first_name` | `last_name` | `first_initial` |
| :--- | :--- | :--- |
| Lane | Wagner | l |
| Lane | Small | l |
| Allan | Wagner | a |

This table does not adhere to 2NF. The `first_initial` column is entirely dependent on the `first_name` column, rendering it redundant.

### Example of 2nd normal form

One way to convert the table above to 2NF is to add a new table that maps a `first_name` directly to its `first_initial`. This removes any duplicates:

| `first_name` | `last_name` |
| :--- | :--- |
| Lane | Wagner |
| Lane | Small |
| Allan | Wagner |

| `first_name` | `first_initial` |
| :--- | :--- |
| Lane | l |
| Allan | a |

::: tip 2NF is <i>usually</i> a good idea

You should probably default to keeping your tables in second normal form. That said, there are good reasons to deviate from it, particularly for performance reasons. The reason being that when you have query a second table to get additional data it can take a bit longer.

**My rule of thumb is**

> Optimize for data integrity and data de-duplication first. If you have speed issues, de-normalize accordingly.

:::

---

## 3rd Normal Form (3NF)

A table in [<VPIcon icon="fa-brands fa-wikipedia-w"/>3rd normal form](https://en.wikipedia.org/wiki/Third_normal_form) follows all the rules of 2nd normal form, and one additional rule:

- All columns that aren't part of the primary are dependent solely on the primary key.

Notice that this is only slightly different from second normal form. In second normal form we can't have a column completely dependent on a part of the primary key, and in third normal form we can't have a column that is entirely dependent on anything that isn't the entire primary key.

### Example of 2nd NF, but not 3rd NF

In this table, the primary key is simply the `id` column.

| `id` | `name` | `first_initial` | `email` |
| :---: | :--- | :--- | :--- |
| 1 | Lane | l | lane.works@example.com |
| 2 | Breanna | b | breanna@example.com |
| 3 | Lane | l | lane.right@example.com |

This table is in 2nd normal form because `first_initial` is not dependent on a part of the primary key. However, because it is dependent on the `name` column it doesn't adhere to 3rd normal form.

### Example of 3rd normal form

The way to convert the table above to 3NF is to add a new table that maps a `name` directly to its `first_initial`. Notice how similar this solution is to 2NF.

| `id` | `name` | `email` |
| :---: | :--- | :--- |
| 1 | Lane | lane.works@example.com |
| 2 | Breanna | breanna@example.com |
| 3 | Lane | lane.right@example.com |

| `name` | `first_initial` |
| :--- | :--- |
| Lane | l |
| Breanna | b |

::: tip 3NF is <i>usually</i> a good idea

The same exact rule of thumb applies to the second and third normal forms.

> Optimize for data integrity and data de-duplication first by adhering to 3NF. If you have speed issues, de-normalize accordingly.

Remember the [<VPIcon icon="fas fa-globe"/>IIF function](https://sqlitetutorial.net/sqlite-functions/sqlite-iif/) and the `AS` clause.

<SiteInfo
  name="An Essential Guide to the SQLite IIF() Function"
  desc="In this tutorial, you will learn about the SQLite IIF() function that allows you to add the if-else logic to queries."
  url="https://sqlitetutorial.net/sqlite-functions/sqlite-iif/"
  logo="https://sqlitetutorial.net/wp-content/uploads/2016/05/favicon.png"
  preview="https://sqlitetutorial.net/wp-content/uploads/2018/11/tracks.png"/>

:::

---

## Boyce-Codd Normal Form (BCNF)

A table in [<VPIcon icon="fa-brands fa-wikipedia-w"/>Boyce-Codd normal form](https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form) (created by [<VPIcon icon="fa-brands fa-wikipedia-w"/>Raymond F Boyce](https://en.wikipedia.org/wiki/Raymond_F._Boyce) and [<VPIcon icon="fa-brands fa-wikipedia-w"/>Edgar F Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd)) follows all the rules of 3rd normal form, plus one additional rule:

- A column that's part of a primary key can not be entirely dependent on a column that's not part of that primary key.

This only comes into play when there are multiple possible primary key combinations that overlap. Another name for this is "overlapping candidate keys".

Only in rare cases does a table in third normal form not meet the requirements of Boyce-Codd normal form.

### Example of 3rd NF, but not Boyce-Codd NF

| `release_year` | `release_date` | `sales` | `name` |
| :--- | :--- | :--- | :--- |
| 2001 | 2001-01-02 | 100 | Kiss me tender |
| 2001 | 2001-02-04 | 200 | Bloody Mary |
| 2002 | 2002-04-14 | 100 | I wanna be them |
| 2002 | 2002-06-24 | 200 | He got me |

The interesting thing here is that there are 3 possible primary keys:

- `release_year` + `sales`
- `release_date` + `sales`
- `name`

This means that by definition this table is in 2nd and 3rd normal form because those forms only restrict how dependent a column that is not part of a primary key can be.

This table is not in Boyce-Codd's normal form because `release_year` is entirely dependent on `release_date`.

### Example of Boyce-Codd normal form

The easiest way to fix the table in our example is to simply remove the duplicate data from `release_date`. Let's make that column `release_day_and_month`.

| `release_year` | `release_day_and_month` | `sales` | `name` |
| :--- | :--- | :--- | :--- |
| 2001 | 01-02 | 100 | Kiss me tender |
| 2001 | 02-04 | 200 | Bloody Mary |
| 2002 | 04-14 | 100 | I wanna be them |
| 2002 | 06-24 | 200 | He got me |

::: tip BCNF is <i>usually</i> a good idea

The same exact rule of thumb applies to the 2nd, 3rd and Boyce-Codd normal forms. That said, it's unlikely you'll see BCNF-specific issues in practice.

> Optimize for data integrity and data de-duplication first by adhering to Boyce-Codd normal form. If you have speed issues, de-normalize accordingly.

:::

---

## Normalization Review

In my opinion, the exact definitions of 1st, 2nd, 3rd and Boyce-Codd normal forms simply are not all that important in your work as a back-end developer.

However, what is important is to understand the basic principles of data integrity and data redundancy that the normal forms teach us.

Let's go over some rules of thumb that you should commit to memory - they'll serve you well when you design databases and even just in coding interviews.

### Rules of thumb for database design

1. Every table should always have a unique identifier (primary key)
2. 90% of the time, that unique identifier will be a single column named `id`
3. Avoid duplicate data
4. Avoid storing data that is completely dependent on other data. Instead, compute it on the fly when you need it.
5. Keep your schema as simple as you can. Optimize for a normalized database first. Only denormalize for speed's sake when you start to run into performance problems.

We'll talk more about speed optimization in a later chapter.
