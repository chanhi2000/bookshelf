---
lang: en-US
title: "Chapter 4: CRUD Operations"
description: "Article(s) > (4/11) The SQL Handbook – A Free Course for Web Developers"
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
      content: "Article(s) > (4/11) The SQL Handbook – A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 4: CRUD Operations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-4-crud-operations-in-sql.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-4-crud-operations-in-sql"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

---

## What is CRUD?

CRUD is an acronym that stands for `CREATE`, `READ`, `UPDATE`, and `DELETE`. These four operations are the bread and butter of nearly every database you will create.

### HTTP and CRUD

The CRUD operations correlate nicely with the HTTP methods you may have already learned:

- `HTTP POST` - `CREATE`
- `HTTP GET` - `READ`
- `HTTP PUT` - `UPDATE`
- `HTTP DELETE` - `DELETE`

---

## SQL Insert Statement

Tables are pretty useless without data in them. In SQL we can add records to a table using an `INSERT INTO` statement. When using an `INSERT` statement we must first specify the `table` we are inserting the record into, followed by the `fields` within that table we want to add `VALUES` to.

Here's an example of an `INSERT INTO` statement:

```sql
INSERT INTO employees(id, name, title)
VALUES (1, 'Allan', 'Engineer');
```

---

## HTTP CRUD Database lifecycle

It's important to understand how data *flows* through a typical web application.

![database flow](https://i.imgur.com/hli3crD.png)

1. The front-end processes some data from user input - maybe a form is submitted.
2. The front-end sends that data to the server through an HTTP request - maybe a `POST`.
3. The server makes a SQL query to it's database to create an associated record - Probably using an `INSERT` statement.
4. Once the server has processed that the database query was successful, it responds to the front-end with a status code! Hopefully a 200-level code (success)!

---

## Manual Entry

Manually `INSERT`ing every single record in a database would be an *extremely* time-consuming task! Working with raw SQL as we are now is not super common when designing [<FontIcon icon="fas fa-globe"/>backend systems](https://blog.boot.dev/backend/do-backend-devs-need-sql/).

When working with SQL within a software system, like a backend web application, you'll typically have access to a programming language such as [<FontIcon icon="fas fa-globe"/>Go](https://boot.dev/learn/learn-golang) or [<FontIcon icon="fas fa-globe"/>Python](https://boot.dev/learn/learn-python).

For example, a backend server written in Go can use string concatenation to dynamically create SQL statements, and that's usually how it's done.

```go
sqlQuery := fmt.Sprintf(`
INSERT INTO users(name, age, country_code)
VALUES ('%s', %v, %s);
`, user.Name, user.Age, user.CountryCode)
```

### SQL Injection

The example above is an oversimplification of what *really* happens when you access a database using Go code. In essence, it's correct. String interpolation is how production systems access databases. That said, it must be done *carefully* to not be a [<FontIcon icon="fa-brands fa-wikipedia-w"/>security vulnerability](https://en.wikipedia.org/wiki/SQL_injection). We'll talk more about that later!

---

## Count

We can use a `SELECT` statement to get a count of the records within a table. This can be very useful when we need to know how many records there are, but we don't particularly care what's in them.

Here's an example in SQLite:

```sql
SELECT count(*) from employees;
```

The `*` in this case refers to a column name. We don't care about the count of a specific column - we want to know the number of total records so we can use the wildcard (\*).

---

## HTTP CRUD database lifecycle

We talked about how a "create" operation flows through a web application. Let's talk about a "read".

![read lifecycle](https://i.imgur.com/KTDQGy1.png)

Let's talk through an example. Our product manager wants to show profile data on a user's settings page. Here's how we could engineer that feature request:

1. First, the front-end webpage loads.
2. The front-end sends an HTTP `GET` request to a `/users` endpoint on the back-end server.
3. The server receives the request.
4. The server uses a `SELECT` statement to retrieve the user's record from the `users` table in the database.
5. The server converts the row of SQL data into a `JSON` object and sends it back to the front-end.

---

## WHERE clause

In order to keep learning about CRUD operations in SQL, we need to learn how to make the instructions we send to the database more specific. SQL accepts a `WHERE` statement within a query that allows us to be very specific with our instructions.

If we were unable to specify the specific record we wanted to `READ`, `UPDATE`, or `DELETE` making queries to a database would be very frustrating, and very inefficient.

### Using a WHERE clause

Say we had over 9000 records in our `users` table. We often want to look at specific user data within that table without retrieving *all* the other records in the table. We can use a `SELECT` statement followed by a `WHERE` clause to specify which records to retrieve. The `SELECT` statement stays the same, we just add the `WHERE` clause to the end of the `SELECT`.

::: tip Example

```sql
SELECT name FROM users WHERE power_level >= 9000;
```

:::

This will select only the `name` field of any user within the `users` table `WHERE` the `power_level` field is greater than or equal to `9000`.

---

## Finding `NULL` values

You can use a `WHERE` clause to filter values by whether or not they're `NULL`.

### `IS NULL`

```sql
SELECT name FROM users WHERE first_name IS NULL;
```

### `IS NOT NULL`

```sql
SELECT name FROM users WHERE first_name IS NOT NULL;
```

---

## DELETE

When a user deletes their account on Twitter, or deletes a comment on a YouTube video, that data needs to be removed from its respective database.

### `DELETE` statement

A `DELETE` statement removes a record from a table that match the `WHERE` clause. As an example:

```sql
DELETE from employees
    WHERE id = 251;
```

This `DELETE` statement removes all records from the `employees` table that have an id of `251`!

---

## The danger of deleting data

Deleting data can be a dangerous operation. Once removed, data can be really hard if not impossible to restore! Let's talk about a couple of common ways back-end engineers protect against losing valuable customer data.

### Strategy 1 - Backups

If you're using a cloud-service like GCP's [<FontIcon icon="iconfont icon-gcp"/>Cloud SQL](https://cloud.google.com/sql) or AWS's [<FontIcon icon="fa-brands fa-aws"/>RDS](https://aws.amazon.com/rds/) you should *always* turn on automated backups. They take an automatic snapshot of your entire database on some interval, and keep it around for some length of time.

For example, the Boot.dev database has a backup snapshot taken daily and we retain those backups for 30 days. If I ever accidentally run a query that deletes valuable data, I can restore it from the backup.

::: important

You should have a backup strategy for production databases.

:::

### Strategy 2 - Soft deletes

A "soft delete" is when you don't actually delete data from your database, but instead just "mark" the data as deleted.

For example, you might set a `deleted_at` date on the row you want to delete. Then, in your queries you ignore anything that has a `deleted_at` date set. The idea is that this allows your application to behave as if it's deleting data, but you can always go back and restore any data that's been removed.

You should probably only soft-delete if you have a specific reason to do so. Automated backups should be "good enough" for most applications that are just interested in protecting against developer mistakes.

---

## Update query in SQL

Whenever you update your profile picture or change your password online, you are changing the data in a field on a table in a database. Imagine if every time you accidentally messed up a Tweet on Twitter you had to delete the entire tweet and post a new one instead of just editing it...

...Well, that's a bad example.

### Update statement

The `UPDATE` statement in SQL allows us to update the fields of a record. We can even update many records depending on how we write the statement.

An `UPDATE` statement specifies the table that needs to be updated, followed by the fields and their new values by using the `SET` keyword. Lastly a `WHERE` clause indicates the record(s) to update.

```sql
UPDATE employees
SET job_title = 'Backend Engineer', salary = 150000
WHERE id = 251;
```

---

## Object-Relational Mapping (ORMs)

An [<FontIcon icon="fa-brands fa-wikipedia-w"/>Object-Relational Mapping](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) or an *ORM* for short, is a tool that allows you to perform CRUD operations on a database using a traditional programming language. These typically come in the form of a library or framework that you would use in your backend code.

The primary benefit an ORM provides is that it maps your database records to in-memory objects. For example, in Go we might have a struct that we use in our code:

```go
type User struct {
    ID int
    Name string
    IsAdmin bool
}
```

This struct definition conveniently represents a database table called `users`, and an instance of the struct represents a row in the table.

::: tip Example: Using an ORM

Using an ORM we might be able to write simple code like this:

```go
user := User{
    ID: 10,
    Name: "Lane",
    IsAdmin: false,
}

// generates a SQL statement and runs it,
// creating a new record in the users table
db.Create(user)
```

:::

::: tip Example: Using straight SQL

Using straight SQL we might have to do something a bit more manual:

```go
user := User{
    ID: 10,
    Name: "Lane",
    IsAdmin: false,
}

db.Exec("INSERT INTO users (id, name, is_admin) VALUES (?, ?, ?);",
    user.ID, user.Name, user.IsAdmin)
```

:::

### Should you use an ORM?

That depends – an ORM typically trades simplicity for control.

Using straight SQL you can take full advantage of the power of the SQL language. Using an ORM, you're limited by whatever functionality the ORM has.

If you run into issues with a specific query, it can be harder to debug with an ORM because you have to dig through the framework's code and documentation to figure out how the underlying queries are being generated.

I recommend doing projects both ways so that you can learn about the tradeoffs. At the end of the day, when you're working on a team of developers, it will be a team decision.
