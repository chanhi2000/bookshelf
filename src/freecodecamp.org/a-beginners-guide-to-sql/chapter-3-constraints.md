---
lang: en-US
title: "Chapter 3: Constraints"
description: "Article(s) > (3/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (3/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 3: Constraints"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-3-constraints.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-3-constraints"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

A `constraint` is a rule we create on a database that enforces some specific behavior. For example, setting a `NOT NULL` constraint on a column ensures that the column will not accept `NULL` values.

If we try to insert a `NULL` value into a column with the `NOT NULL` constraint, the insert will fail with an error message. Constraints are extremely useful when we need to ensure that certain kinds of data exist within our database.

---

## `NOT NULL` constraint

The `NOT NULL` constraint can be added directly to the `CREATE TABLE` statement.

```sql
CREATE TABLE employees(
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE,
    title TEXT NOT NULL
);
```

### SQLite limitation

In other dialects of SQL you can `ADD CONSTRAINT` within an `ALTER TABLE` statement. SQLite does not support this feature, so when we create our tables we need to make sure we specify all the constraints we want.

Here's a [<FontIcon icon="iconfont icon-sqlite"/>list of SQL Features](https://sqlite.org/omitted.html) SQLite does not implement in case you're curious.

---

## Primary Key Constraints

A *key* defines and protects relationships between tables. A [<FontIcon icon="fa-brands fa-wikipedia-w"/>`primary key`](https://en.wikipedia.org/wiki/Primary_key) is a special column that uniquely identifies records within a table. Each table can have one, and only one primary key.

### Your primary key will almost always be the "id" column

It's very common to have a column named `id` on each table in a database, and that `id` is the primary key for that table. No two rows in that table can share an `id`.

A `PRIMARY KEY` constraint can be explicitly specified on a column to ensure uniqueness, rejecting any inserts where you attempt to create a duplicate ID.

---

## Foreign Key Constraints

Foreign keys are what makes relational databases relational! Foreign keys define the relationships *between* tables. Simply put, a `FOREIGN KEY` is a field in one table that references another table's `PRIMARY KEY`.

### Creating a Foreign Key in SQLite

Creating a `FOREIGN KEY` in SQLite happens at table creation! After we define the table fields and constraints we add an additional `CONSTRAINT` where we define the `FOREIGN KEY` and its `REFERENCES`.

Here's an example:

```sql
CREATE TABLE departments (
    id INTEGER PRIMARY KEY,
    department_name TEXT NOT NULL
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_departments
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);
```

In this example, an `employee` has a `department_id`. The `department_id` must be the same as the `id` field of a record from the `departments` table.

---

## Schema

We've used the word *schema* a few times now, let's talk about what that word means. A database's [<FontIcon icon="iconfont icon-ibm"/>schema](https://ibm.com/cloud/learn/database-schema) describes how data is organized within it.

Data types, table names, field names, constraints, and the relationships between all of those entities are part of a database's *schema*.

### There is no perfect way to architect a database schema

When designing a database schema there typically isn't a "correct" solution. We do our best to choose a sane set of tables, fields, constraints, etc that will accomplish our project's goals. Like many things in programming, different schema designs come with different tradeoffs.

### How do we decide on a sane schema architecture?

One very important decision that needs to be made is to decide which table will store a user's balance! As you can imagine, ensuring our data is accurate when dealing with money is *super* important. We want to be able to:

- Keep track of a user's current balance
- See the historical balance at any point in the past
- See a log of which transactions changed the balance over time

There are many ways to approach this problem. For our first attempt, let's try the simplest schema that fulfills our project's needs.
