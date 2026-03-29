---
lang: en-US
title: "What Are Database Triggers? A Practical Introduction with PostgreSQL Examples"
description: "Article(s) > What Are Database Triggers? A Practical Introduction with PostgreSQL Examples"
icon: iconfont icon-postgresql
category:
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
  - sql
  - mysql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Are Database Triggers? A Practical Introduction with PostgreSQL Examples"
    - property: og:description
      content: "What Are Database Triggers? A Practical Introduction with PostgreSQL Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-database-triggers-practical-intro-with-postgresql-examples.html
prev: /data-science/postgresql/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: iyiola
    url: https://freecodecamp.org/news/author/iyiola/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b5940820-d1aa-4d10-8b40-06005bec7e60.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Are Database Triggers? A Practical Introduction with PostgreSQL Examples"
  desc="If you've ever needed your database to automatically respond to changes – like logging every update to a sensitive table, enforcing a business rule before an insert, or syncing derived data after a de"
  url="https://freecodecamp.org/news/what-are-database-triggers-practical-intro-with-postgresql-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b5940820-d1aa-4d10-8b40-06005bec7e60.png"/>

If you've ever needed your database to automatically respond to changes – like logging every update to a sensitive table, enforcing a business rule before an insert, or syncing derived data after a delete – then triggers are the tool you're looking for.

A database trigger is a function that the database executes automatically when a specific event occurs on a table. You don't call it manually. Instead, you define the conditions, and the database handles the rest.

In this tutorial, you'll learn what triggers are, how they work, when to use them, and when to avoid them. You'll work through practical examples using PostgreSQL, but the core concepts apply to most relational databases.

::: note Prerequisites

To follow along with the examples, you'll need:

- Basic knowledge of SQL (SELECT, INSERT, UPDATE, DELETE)
- A running PostgreSQL instance (version 12 or later)
- A SQL client like `psql`, pgAdmin, or DBeaver

:::

If you don't have PostgreSQL installed, you can use a free cloud-hosted instance from services like [<VPIcon icon="fas fa-globe"/>Neon](https://neon.tech) or [<VPIcon icon="iconfont icon-supabase"/>Supabase](https://supabase.com) to follow along.

---

## How Triggers Work

At a high level, a trigger has three parts:

1. **The event**: what action activates the trigger (INSERT, UPDATE, DELETE, or TRUNCATE)
2. **The timing**: when the trigger fires relative to the event (BEFORE or AFTER)
3. **The function**: what logic runs when the trigger fires

Here's the general flow: a user or application performs an operation on a table, the database checks if any triggers are associated with that operation, and if a match is found, the database executes the trigger function automatically.

You can think of triggers as event listeners for your database. Just like a JavaScript `addEventListener` watches for a click or keypress, a database trigger watches for row-level changes on a table.

---

## How to Create Your First Trigger

In PostgreSQL, creating a trigger is a two-step process. You first create a trigger function, then you attach that function to a table with a `CREATE TRIGGER` statement.

Let's build a concrete example. Say you have a `products` table and you want to automatically set the `updated_at` timestamp every time a row is modified.

### Step 1 – Create the Table

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Step 2 – Create the Trigger Function

A trigger function in PostgreSQL is a special function that returns the `TRIGGER` type. Inside the function body, you have access to two important variables: `NEW` (the row after the operation) and `OLD` (the row before the operation).

```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

This function sets the `updated_at` column to the current timestamp every time it runs. It then returns `NEW`, which tells PostgreSQL to proceed with the modified row.

### Step 3 – Attach the Trigger to the Table

```sql
CREATE TRIGGER trigger_set_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
```

Let's break down each part of this statement:

- `BEFORE UPDATE` – the trigger fires before the update is applied to the table
- `ON products` – the trigger is associated with the `products` table
- `FOR EACH ROW` – the function runs once for every row affected by the update
- `EXECUTE FUNCTION set_updated_at()` – the function to call

### Step 4 – Test It

```sql
INSERT INTO products (name, price) VALUES ('Wireless Keyboard', 49.99);

-- Wait a moment, then update the row
UPDATE products SET price = 44.99 WHERE name = 'Wireless Keyboard';

SELECT name, price, created_at, updated_at FROM products;
```

You'll see that `updated_at` has been automatically updated to the time of the UPDATE operation, even though you didn't explicitly set it in your query. That's the trigger doing its job.

---

## BEFORE vs AFTER Triggers

The timing of a trigger determines when the function executes relative to the actual data change.

**BEFORE triggers** run before the row is inserted, updated, or deleted. They are useful when you want to modify or validate the incoming data. Since the change hasn't been applied yet, you can alter the `NEW` row or even cancel the operation entirely by returning `NULL`.

**AFTER triggers** run after the row change has been committed to the table. They are useful for side effects like logging, sending notifications, or updating related tables. At this point, the change is already done, so you can't modify the row – but you can read both `OLD` and `NEW` to see what changed.

Here's a rule of thumb: use BEFORE triggers when you need to change or reject data, and use AFTER triggers when you need to react to a completed change.

---

## How to Build an Audit Log with an AFTER Trigger

One of the most common uses for triggers is audit logging – keeping a record of every change made to an important table. Let's build one.

### Step 1 – Create an Audit Table

```sql
CREATE TABLE product_audit (
    audit_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    action VARCHAR(10) NOT NULL,
    old_price NUMERIC(10, 2),
    new_price NUMERIC(10, 2),
    changed_by TEXT DEFAULT current_user,
    changed_at TIMESTAMP DEFAULT NOW()
);
```

### Step 2 – Create the Audit Trigger Function

```sql
CREATE OR REPLACE FUNCTION log_product_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO product_audit (product_id, action, old_price, new_price)
        VALUES (OLD.id, 'UPDATE', OLD.price, NEW.price);
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO product_audit (product_id, action, old_price)
        VALUES (OLD.id, 'DELETE', OLD.price);
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO product_audit (product_id, action, new_price)
        VALUES (NEW.id, 'INSERT', NEW.price);
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;
```

There are a few important things happening here. The `TG_OP` variable is a special string that PostgreSQL provides inside trigger functions. It tells you which operation activated the trigger: `'INSERT'`, `'UPDATE'`, or `'DELETE'`. This lets you handle different operations with a single function.

The `RETURN COALESCE(NEW, OLD)` at the end ensures the function returns the correct row. For INSERT and UPDATE operations, `NEW` exists and is returned. For DELETE operations, `NEW` is null, so `OLD` is returned instead.

### Step 3 – Attach the Trigger

```sql
CREATE TRIGGER trigger_product_audit
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION log_product_changes();
```

Notice the `AFTER INSERT OR UPDATE OR DELETE` syntax. You can bind a single trigger to multiple events, which keeps your setup clean.

### Step 4 – Test It

```sql
-- Insert a new product
INSERT INTO products (name, price) VALUES ('USB-C Hub', 29.99);

-- Update the price
UPDATE products SET price = 24.99 WHERE name = 'USB-C Hub';

-- Delete the product
DELETE FROM products WHERE name = 'USB-C Hub';

-- Check the audit log
SELECT * FROM product_audit ORDER BY changed_at;
```

You'll see three rows in `product_audit` (one for each operation) with the old and new prices recorded automatically. No application code needed.

---

## How to Use a BEFORE Trigger for Validation

Triggers can also enforce business rules at the database level. Let's say you want to prevent any product from having a negative price.

```sql
CREATE OR REPLACE FUNCTION prevent_negative_price()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.price < 0 THEN
        RAISE EXCEPTION 'Product price cannot be negative. Got: %', NEW.price;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_price
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION prevent_negative_price();
```

Now test it:

```sql
INSERT INTO products (name, price) VALUES ('Faulty Item', -10.00);
-- ERROR: Product price cannot be negative. Got: -10.00
```

The insert is rejected entirely. The row never makes it into the table. This is powerful because the rule is enforced at the database level regardless of which application or script sends the query.

---

## Row-Level vs Statement-Level Triggers

All the triggers you've seen so far use `FOR EACH ROW`, which means the function runs once per affected row. If you update 100 rows in a single query, the trigger function runs 100 times.

PostgreSQL also supports `FOR EACH STATEMENT` triggers, which run once per SQL statement regardless of how many rows are affected.

```sql
CREATE OR REPLACE FUNCTION log_bulk_update()
RETURNS TRIGGER AS $$
BEGIN
    RAISE NOTICE 'A bulk operation was performed on the products table';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_bulk_update_notice
AFTER UPDATE ON products
FOR EACH STATEMENT
EXECUTE FUNCTION log_bulk_update();
```

Statement-level triggers are less common, but they're useful for operations like refreshing a materialized view or sending a single notification after a batch update instead of one notification per row.

::: important

in statement-level triggers, the `NEW` and `OLD` variables are not available because the trigger isn't tied to any specific row.

:::

---

## The NEW and OLD Variables Reference

Here's a quick reference for when `NEW` and `OLD` are available in row-level triggers:

| Operation | OLD | NEW |
| --- | --- | --- |
| INSERT | Not available | Contains the new row |
| UPDATE | Contains the row before the change | Contains the row after the change |
| DELETE | Contains the deleted row | Not available |

Understanding when each variable is available will save you from runtime errors in your trigger functions.

---

## How to Manage Triggers

As you add more triggers to your database, you'll need to know how to inspect, disable, and remove them.

### How to List All Triggers on a Table

```sql
SELECT trigger_name, event_manipulation, action_timing
FROM information_schema.triggers
WHERE event_object_table = 'products';
```

### How to Disable a Trigger Temporarily

```sql
-- Disable a specific trigger
ALTER TABLE products DISABLE TRIGGER trigger_product_audit;

-- Disable all triggers on a table
ALTER TABLE products DISABLE TRIGGER ALL;
```

This is useful during bulk data migrations where you want to skip trigger execution for performance reasons.

### How to Re-Enable a Trigger

```sql
ALTER TABLE products ENABLE TRIGGER trigger_product_audit;
```

### How to Drop a Trigger

```sql
DROP TRIGGER IF EXISTS trigger_product_audit ON products;
```

Note that dropping a trigger does not drop the associated function. You'll need to drop the function separately if you no longer need it:

```sql
DROP FUNCTION IF EXISTS log_product_changes();
```

---

## When to Use Triggers

Triggers work well for specific use cases. Here are the scenarios where they're a strong choice:

- **Audit logging**: automatically recording who changed what and when, as you saw earlier in this tutorial.
- **Derived data maintenance**: keeping computed columns, counters, or summary tables in sync with the source data.
- **Data validation**: enforcing business rules that go beyond what CHECK constraints can express, like cross-table validations.
- **Automatic timestamping**: setting `created_at` and `updated_at` fields without relying on the application layer.

---

## When to Avoid Triggers

Triggers are powerful, but they come with trade-offs. Here are cases where you should think twice before using them:

- **Complex business logic**: if the logic involves calling external APIs, sending emails, or orchestrating multi-step workflows, it belongs in your application layer. Triggers should stay lightweight.
- **Performance-sensitive bulk operations**: row-level triggers on tables that frequently receive bulk inserts or updates can create significant overhead. If you're inserting millions of rows, those triggers fire millions of times.
- **Cascading triggers**: when one trigger's action fires another trigger, which fires another, debugging becomes extremely difficult. If you find yourself building a chain of triggers, reconsider the design.
- **Logic that developers need to discover easily**: triggers are sometimes called "hidden logic" because they execute automatically without appearing in application code. If your team frequently asks "why did this column change?" and the answer is always "there's a trigger," that's a sign the logic might be more discoverable if placed in your application layer or a stored procedure that's called explicitly.

A good rule of thumb: if the logic is tightly coupled to the data and should always execute regardless of which client or service touches the table, a trigger is appropriate. If the logic depends on application context (like the current user's session, feature flags, or external state), it belongs in the application.

---

## Conclusion

In this tutorial, you learned what database triggers are and how they work in PostgreSQL. You built three practical triggers: an automatic timestamp updater, a full audit logging system, and a data validation guard. You also learned the difference between BEFORE and AFTER triggers, row-level and statement-level triggers, and when `NEW` and `OLD` variables are available.

Triggers are a powerful tool for keeping your data consistent and your business rules enforced at the database level. Use them for focused, data-centric operations, and keep the logic simple.

::: info

If you found this tutorial helpful, you can connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`iyioladev`)](https://linkedin.com/in/iyioladev) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`iyiola_dev_`)](https://x.com/iyiola_dev_).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Are Database Triggers? A Practical Introduction with PostgreSQL Examples",
  "desc": "If you've ever needed your database to automatically respond to changes – like logging every update to a sensitive table, enforcing a business rule before an insert, or syncing derived data after a de",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/what-are-database-triggers-practical-intro-with-postgresql-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
