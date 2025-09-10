---
lang: en-US
title: "Chapter 5: Basic SQL Queries"
description: "Article(s) > (5/11) The SQL Handbook - A Free Course for Web Developers"
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
      content: "Article(s) > (5/11) The SQL Handbook - A Free Course for Web Developers"
    - property: og:description
      content: "Chapter 5: Basic SQL Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-beginners-guide-to-sql/chapter-5-basic-sql-queries.html
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
  url="https://freecodecamp.org/news/a-beginners-guide-to-sql#heading-chapter-5-basic-sql-queries"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/09/The-SQL-Handbook-Cover.png"/>

---

## How to use the `AS` Clause in SQL

Sometimes we need to structure the data we return from our queries in a specific way. An `AS` clause allows us to "alias" a piece of data in our query. The alias only exists for the duration of the query.

### `AS` keyword

The following queries return the same data:

```sql
SELECT employee_id AS id, employee_name AS name
FROM employees;
-- and
SELECT employee_id, employee_name
FROM employees;
```

The difference is that the results from the aliased query would have column names `id` and `name` instead of `employee_id` and `employee_name`.

---

## SQL Functions

At the end of the day, SQL is a programming language, and it's one that supports functions. We can use functions and aliases to *calculate* new columns in a query. This is similar to how you might use formulas in Excel.

### IIF function

In SQLite, the `IIF` function works like a [<VPIcon icon="fas fa-globe"/>ternary](https://book.pythontips.com/en/latest/ternary_operators.html). For example:

```sql
IIF(carA > carB, "Car a is bigger", "Car b is bigger")
```

If `a` is greater than `b`, this statement evaluates to the string `"Car a is bigger"`. Otherwise, it evaluates to `"Car b is bigger"`.

Here's how we can use `IIF()` and a `directive` alias to add a new calculated column to our result set:

```sql
SELECT 
  quantity
  , IIF(quantity < 10, "Order more", "In Stock") AS directive
FROM products
```

---

## How to Use `BETWEEN` with `WHERE`

We can check if certain values are `between` two numbers using the `WHERE` clause in an intuitive way. The `WHERE` clause doesn't always have to be used to specify specific id's or values. We can also use it to help narrow down our result set. Here's an example:

```sql
SELECT employee_name, salary
FROM employees
WHERE salary BETWEEN 30000 and 60000;
```

This query returns all the employees `name` and `salary` fields for any rows where the `salary` is `BETWEEN` 30,000 and 60,000. We can also query results that are `NOT BETWEEN` two specified values.

```sql
SELECT product_name, quantity
FROM products
WHERE quantity NOT BETWEEN 20 and 100;
```

This query returns all the product names where the quantity was not between `20` and `100`. We can use conditionals to make the results of our query as specific as we need them to be.

---

## How to return distinct values

Sometimes we want to retrieve records from a table without getting back any duplicates.

For example, we may want to know all the different companies our employees have worked at previously, but we don't want to see the same company multiple times in the report.

### `SELECT DISTINCT`

SQL offers us the `DISTINCT` keyword that removes duplicate records from the resulting query.

```sql
SELECT DISTINCT previous_company
    FROM employees;
```

This only returns one row for each unique `previous_company` value.

---

## Logical Operators

We often need to use multiple conditions to retrieve the exact information we want. We can begin to structure much more complex queries by using multiple conditions together to narrow down the search results of our query.

The logical `AND` operator can be used to narrow down our result sets even more.

### `AND` operator

```sql
SELECT product_name, quantity, shipment_status
FROM products
WHERE shipment_status = 'pending'
AND quantity BETWEEN 0 and 10;
```

This only retrieves records where both the `shipment_status` is "pending" AND the `quantity` is between `0` and `10`.

### Equality operators

All of the following operators are supported in SQL. The `=` is the main one to watch out for, it's not `==` like in many other languages.

- `=`
- `<`
- `>`
- `<=`
- `>=`

For example, in Python you might compare two values like this:

```py
if name == "age"
```

Whereas in SQL you would do:

```sql
WHERE name = "age"
```

### `OR` operator

As you've probably guessed, if the logical `AND` operator is supported, the `OR` operator is probably supported as well.

```sql
SELECT product_name, quantity, shipment_status
FROM products
WHERE shipment_status = 'out of stock'
OR quantity BETWEEN 10 and 100;
```

This query retrieves records where either the shipment_status `condition` OR the `quantity` condition are met.

Order of operations matter when using these operators.

You can group logical operations with parentheses to specify the [<VPIcon icon="fas fa-globe"/>order of operations](https://mathsisfun.com/operation-order-pemdas.html).

```sql
(this AND that) OR the_other
```

### The `IN` operator

Another variation to the `WHERE` clause we can utilize is the `IN` operator. `IN` returns `true` or `false` if the first operand matches any of the values in the second operand. The `IN` operator is a shorthand for multiple `OR` conditions.

These two queries are equivalent:

```sql
SELECT product_name, shipment_status
FROM products
WHERE shipment_status IN ('shipped', 'preparing', 'out of stock');
```

```sql
SELECT product_name, shipment_status
FROM products
WHERE shipment_status = 'shipped'
OR shipment_status = 'preparing'
OR shipment_status = 'out of stock';
```

Hopefully, you're starting to see how querying specific data using fine-tuned SQL clauses helps reveal important insights. The larger a table becomes the harder it becomes to analyze without proper queries.

### The `LIKE` keyword

Sometimes we don't have the luxury of knowing exactly what it is we need to query. Have you ever wanted to look up a song or a video but you only remember part of the name? SQL provides us an option for when we're in situations `LIKE` this.

The `LIKE` keyword allows for the use of the `%` and `_` wildcard operators. Let's focus on `%` first.

### `%` Operator

The `%` operator will match zero or more characters. We can use this operator within our query string to find more than just exact matches depending on where we place it.

Here are some examples that show how these work:

Product starts with "banana":

```sql
SELECT * FROM products
WHERE product_name LIKE 'banana%';
```

Product ends with "banana":

```sql
SELECT * from products
WHERE product_name LIKE '%banana';
```

Product contains "banana":

```sql
SELECT * from products
WHERE product_name LIKE '%banana%';
```

---

## Underscore Operator

As discussed, the `%` wildcard operator matches zero or more characters. Meanwhile, the `_` wildcard operator only matches a single character.

```sql
SELECT * FROM products
WHERE product_name LIKE '_oot';
```

The query above matches products like:

- boot
- root
- foot

```sql
SELECT * FROM products
WHERE product_name LIKE '__oot';
```

The query above matches products like:

- shoot
- groot
