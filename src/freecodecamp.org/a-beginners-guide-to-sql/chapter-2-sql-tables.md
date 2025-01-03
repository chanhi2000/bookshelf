---
lang: en-US
title: "Chapter 2: SQL Tables"
description: "Article(s) > (2/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (2/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 2: SQL Tables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-2-sql-tables.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-2-sql-tables"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

The `CREATE TABLE` statement is used to create a new table in a database.

---

## How to use the `CREATE TABLE` statement

To create a table, use the `CREATE TABLE` statement followed by the name of the table and the fields you want in the table.

```sql
CREATE TABLE employees (id INTEGER, name TEXT, age INTEGER, is_manager BOOLEAN, salary INTEGER);
```

Each field name is followed by its datatype. We'll get to data types in a minute.

It's also acceptable and common to break up the `CREATE TABLE` statement with some whitespace like this:

```sql
CREATE TABLE employees(
    id INTEGER,
    name TEXT,
    age INTEGER,
    is_manager BOOLEAN,
    salary INTEGER
);
```

---

## How to Alter Tables

We often need to alter our database schema without deleting it and re-creating it. Imagine if Twitter deleted its database each time it needed to add a feature, that would be a disaster! Your account and all your tweets would be wiped out on a daily basis.

Instead, we can use use the `ALTER TABLE` statement to make changes in place without deleting any data.

### How to use `ALTER TABLE`

With SQLite an `ALTER TABLE` statement allows you to:

#### 1. Rename a table or column, which you can do like this

```sql
ALTER TABLE employees
RENAME TO contractors;

ALTER TABLE contractors
RENAME COLUMN salary TO invoice;
```

#### 2. `ADD` or `DROP` a column, which you can do like this:

```sql
ALTER TABLE contractors
ADD COLUMN job_title TEXT;

ALTER TABLE contractors
DROP COLUMN is_manager;
```

---

## Intro to Migrations

A database [<FontIcon icon="fa-brands fa-wikipedia-w"/>migration](https://en.wikipedia.org/wiki/Schema_migration) is a set of changes to a relational database. In fact, the `ALTER TABLE` statements we did in the last exercise were examples of migrations.

Migrations are helpful when transitioning from one state to another, fixing mistakes, or adapting a database to changes.

Good migrations are small, incremental and ideally reversible changes to a database. As you can imagine, when working with large databases, making changes can be scary. We have to be careful when writing database migrations so that we don't break any systems that depend on the old database schema.

### Example of a bad migration

If a backend server periodically runs a query like `SELECT * FROM people`, and we execute a database migration that alters the table name from `people` to `users` *without updating the code*, the application will break. It will try to grab data from a table that no longer exists.

A simple solution to this problem would be to deploy new code that uses a new query:

```sql
SELECT * FROM users;
```

And we would deploy that code to production immediately following the migration.

---

## SQL Data Types

SQL as a language can support many different data types. But the datatypes that your database management system ([<FontIcon icon="fa-brands fa-wikipedia-w"/>DBMS](https://en.wikipedia.org/wiki/Database#:~:text=A%20database%20management%20system%20(DBMS))) supports will vary depending on the specific database you're using.

SQLite only supports the most basic types, and we're using SQLite in this course.

### SQLite Data Types

Let's go over the [<FontIcon icon="iconfont icon-sqlite"/>data types supported by SQLite:](https://sqlite.org/datatype3.html) and how they are stored.

1. `NULL` - Null value.
2. `INTEGER` - A signed integer stored in 0,1,2,3,4,6, or 8 bytes.
3. `REAL` - Floating point value stored as an 64-bit [<FontIcon icon="fa-brands fa-wikipedia-w"/>IEEE floating point number](https://en.wikipedia.org/wiki/IEEE_754).
4. `TEXT` - Text string stored using database encoding such as [<FontIcon icon="fa-brands fa-wikipedia-w"/>UTF-8](https://en.wikipedia.org/wiki/UTF-8)
5. `BLOB` - Short for [<FontIcon icon="fa-brands fa-wikipedia-w"/>Binary large object](https://en.wikipedia.org/wiki/Binary_large_object) and typically used for images, audio or other multimedia.

::: tip Example

```sql
CREATE TABLE employees (
    id INTEGER,
    name TEXT,
    age INTEGER,
    is_manager BOOLEAN,
    salary INTEGER
);
```

:::

### Boolean values

It's important to note that SQLite does not have a separate `BOOLEAN` storage class. Instead, boolean values are stored as integers:

- `0` = `false`
- `1` = `true`

It's not actually all that weird – boolean values are just binary bits after all!

SQLite will still let you write your queries using `boolean` expressions and `true`/`false` keywords, but it will convert the booleans to integers under-the-hood.
