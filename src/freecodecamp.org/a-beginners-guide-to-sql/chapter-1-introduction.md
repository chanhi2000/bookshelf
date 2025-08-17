---
lang: en-US
title: "Chapter 1: Introduction"
description: "Article(s) > (1/11) The SQL Handbook - A Free Course for Web Developers"
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
      content: "Article(s) > (1/11) The SQL Handbook - A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 1: Introduction"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-1-introduction.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-1-introduction"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

Structured Query Language, or [SQL](https://freecodecamp.org/news/what-is-sql-database-definition-for-beginners/), is the primary programming language used to manage and interact with [relational databases](https://cloud.google.com/learn/what-is-a-relational-database). SQL can perform various operations such as creating, updating, reading, and deleting records within a database.

---

## What is a SQL Select Statement?

Let's write our own SQL statement from scratch. A `SELECT` statement is the most common operation in SQL - often called a "query". `SELECT` retrieves data from one or more tables. Standard `SELECT` statements do *not* alter the state of the database.

```sql
SELECT id from users;
```

### How to select a single field

A `SELECT` statement begins with the keyword `SELECT` followed by the fields you want to retrieve.

```sql
SELECT id from users;
```

### How to select multiple fields

If you want to select more than one field, you can specify multiple fields separated by commas like this:

```sql
SELECT id, name from users;
```

### How to select all fields

If you want to select *every* field in a record, you can use the shorthand `*` syntax.

```sql
SELECT * from users;
```

After specifying fields, you need to indicate which table you want to pull the records from using the `from` statement followed by the name of the table.

We'll talk more about tables later, but for now, you can think about them like structs or objects. For example, the `users` table might have 3 fields:

- `id`
- `name`
- `balance`

And finally, *all* statements end with a semi-colon `;`.

---

## Which Databases Use SQL?

SQL is just a query language. You typically use it to interact with a specific database technology. For example:

- [<FontIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/index.html)
- [<FontIcon icon="iconfont icon-postgresql"/>PostgreSQL](https://postgresql.org/)
- [<FontIcon icon="iconfont icon-mysql"/>MySQL](https://mysql.com/)
- [<FontIcon icon="iconfont icon-cockroach-db"/>CockroachDB](https://cockroachlabs.com/)
- [<FontIcon icon="iconfont icon-oracle"/>Oracle](https://oracle.com/database/)

And others.

Although many different databases use the SQL *language*, most of them will have their own *dialect*. It's critical to understand that not all databases are created equal. Just because one SQL-compatible database does things a certain way, doesn't mean every SQL-compatible database will follow those exact same patterns.

### We're using SQLite

In this course, we'll be using [<FontIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/index.html) specifically. SQLite is great for embedded projects, web browsers, and toy projects. It's lightweight, but has limited functionality compared to the likes of PostgreSQL or MySQL - two of the more common production SQL technologies.

And I'll make sure to point out to you whenever some functionality we're working with is unique to SQLite.

---

## NoSQL vs SQL

When talking about SQL databases, we also have to mention the elephant in the room: [<FontIcon icon="fa-brands fa-wikipedia-w"/>NoSQL](https://en.wikipedia.org/wiki/NoSQL).

To put it simply, a NoSQL database is a database that does not use SQL (Structured Query Language). Each NoSQL typically has its own way of writing and executing queries. For example, [<FontIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/) uses MQL (MongoDB Query Language) and [<FontIcon icon="iconfont icon-elasticsearch"/>ElasticSearch](https://elastic.co/) simply has a JSON API.

While most relational databases are fairly similar, NoSQL databases tend to be fairly unique and are used for more niche purposes. Some of the main differences between a SQL and NoSQL database are:

1. NoSQL databases are usually non-relational, SQL databases are usually [<FontIcon icon="iconfont icon-gcp"/>relational](https://cloud.google.com/learn/what-is-a-relational-database) (we'll talk more about what this means later).
2. SQL databases usually have a defined schema, NoSQL databases usually have dynamic schema.
3. SQL databases are table-based, NoSQL databases have a variety of different storage methods, such as document, key-value, graph, wide-column, and more.

---

## Types of NoSQL databases

- [<FontIcon icon="fa-brands fa-wikipedia-w"/>Document Database](https://en.wikipedia.org/wiki/Document-oriented_database)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>Key-Value Store](https://en.wikipedia.org/wiki/Key%E2%80%93value_database)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>Wide-Column](https://en.wikipedia.org/wiki/Wide-column_store)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>Graph](https://en.wikipedia.org/wiki/Graph_database)

A few of the most popular NoSQL databases are:

- [<FontIcon icon="fa-brands fa-wikipedia-w"/>MongoDB](https://en.wikipedia.org/wiki/MongoDB)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>Cassandra](https://en.wikipedia.org/wiki/Apache_Cassandra)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>CouchDB](https://en.wikipedia.org/wiki/Apache_CouchDB)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>DynamoDB](https://en.wikipedia.org/wiki/Amazon_DynamoDB)
- [<FontIcon icon="iconfont icon-elasticsearch"/>ElasticSearch](https://elastic.co/)

---

## Comparing SQL Databases

Let's dive deeper and talk about some of the popular SQL Databases and what makes them different from one another. Some of the most popular SQL Databases right now are:

- [<FontIcon icon="fa-brands fa-wikipedia-w"/>PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>MySQL](https://en.wikipedia.org/wiki/MySQL)
- [<FontIcon icon="fas fa-globe"/>Microsoft SQL Server](https://db-engines.com/en/system/Microsoft+SQL+Server)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>SQLite](https://en.wikipedia.org/wiki/SQLite)
- [<FontIcon icon="fa-brands fa-wikipedia-w"/>And many others](https://en.wikipedia.org/wiki/List_of_relational_database_management_systems)

Source: [<FontIcon icon="fas fa-globe"/>db-engines.com](https://db-engines.com/en/ranking)

<SiteInfo
  name="DB-Engines Ranking"
  desc="Popularity ranking of database management systems."
  url="https://db-engines.com/en/ranking/"
  logo="https://db-engines.com/favicon.ico"
  preview="https://db-engines.com/pictures/db-engines_128x128.png"/>


While all of these Databases use SQL, each database defines specific rules, practices, and strategies that separate them from their competitors.

### SQLite vs PostgreSQL

Personally, SQLite and PostgreSQL are my favorites from the list above. Postgres is a very powerful, open-source, production-ready SQL database. SQLite is a lightweight, embeddable, open-source database. I usually choose one of these technologies if I'm doing SQL work.

SQLite is a serverless database management system (DBMS) that has the ability to run within applications, whereas PostgreSQL uses a Client-Server model and requires a server to be installed and listening on a network, similar to an HTTP server.

See a full [<FontIcon icon="fas fa-globe"/>comparison here](https://db-engines.com/en/system/PostgreSQL%3BSQLite).

<SiteInfo
  name="PostgreSQL vs. SQLite Comparison"
  desc="Detailed side-by-side view of PostgreSQL and SQLite"
  url="https://db-engines.com/en/system/PostgreSQL%3BSQLite/"
  logo="https://db-engines.com/favicon.ico"
  preview="https://db-engines.com/pictures/db-engines_128x128.png"/>

Again, in this course we will be working with SQLite, a lightweight and simple database. For most [<FontIcon icon="fas fa-globe"/>backend](https://blog.boot.dev/backend/do-backend-devs-need-sql/) web servers, PostgreSQL is a more production-ready option, but SQLite is great for learning and for small systems.
