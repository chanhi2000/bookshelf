---
lang: en-US
title: "How to Use Transactions"
description: Article(s) > (7/11) How to Work with SQLite in Python - A Handbook for Beginners 
category:
  - Python
  - SQLite
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - sqlite
head:
  - - meta:
    - property: og:title
      content: Article(s) > (7/11) How to Work with SQLite in Python - A Handbook for Beginners
    - property: og:description
      content: "How to Use Transactions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-use-transactions.html
date: 2024-10-02
isOriginal: false
author: Ashutosh Krishna
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Work with SQLite in Python - A Handbook for Beginners",
  "desc": "SQLite is one of the most popular relational database management systems (RDBMS). It’s lightweight, meaning that it doesn’t take up much space on your system. One of its best features is that it’s serverless, so you don’t need to install or manage a ...",
  "link": "/freecodecamp.org/work-with-sqlite-in-python-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with SQLite in Python - A Handbook for Beginners"
  desc="SQLite is one of the most popular relational database management systems (RDBMS). It’s lightweight, meaning that it doesn’t take up much space on your system. One of its best features is that it’s serverless, so you don’t need to install or manage a ..."
  url="https://freecodecamp.org/news/work-with-sqlite-in-python-handbook/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"/>

A transaction is a sequence of one or more SQL operations that are treated as a single unit of work. In the context of a database, a transaction allows you to perform multiple operations that either all succeed or none at all. This ensures that your database remains in a consistent state, even in the face of errors or unexpected issues.

For example, if you are transferring money between two bank accounts, you would want both the debit from one account and the credit to the other to succeed or fail together. If one operation fails, the other should not be executed to maintain consistency.

---

## Why Use Transactions?

1. **Atomicity**: Transactions ensure that a series of operations are treated as a single unit. If one operation fails, none of the operations will be applied to the database.
2. **Consistency**: Transactions help maintain the integrity of the database by ensuring that all rules and constraints are followed.
3. **Isolation**: Each transaction operates independently of others, preventing unintended interference.
4. **Durability**: Once a transaction is committed, the changes are permanent, even in the event of a system failure.

---

## When to Use Transactions?

You should use transactions when:

- Performing multiple related operations that must succeed or fail together.
- Modifying critical data that requires consistency and integrity.
- Working with operations that can potentially fail, such as financial transactions or data migrations.

---

## How to Manage Transactions in Python

In SQLite, transactions are managed using the `BEGIN`, `COMMIT`, and `ROLLBACK` commands. However, when using the `sqlite3` module in Python, you typically manage transactions through the connection object.

### Starting a Transaction

A transaction begins implicitly when you execute any SQL statement. To start a transaction explicitly, you can use the `BEGIN` command:

```
cursor.execute("BEGIN;")
``` 

However, it’s usually unnecessary to start a transaction manually, as SQLite starts a transaction automatically when you execute an SQL statement.

### How to Commit a Transaction

To save all changes made during a transaction, you use the `commit()` method. This makes all modifications permanent in the database.

```py
connection.commit()
```

We have already used the `commit()` method in the above provided examples.

### Rolling Back a Transaction

If something goes wrong and you want to revert the changes made during a transaction, you can use the `rollback()` method. This will undo all changes made since the transaction started.

```py
connection.rollback()
```

---

## Example of Using Transactions in Python

To illustrate the use of transactions in a real-world scenario, we’ll create a new table called `Customers` to manage customer accounts. In this example, we’ll assume each customer has a `balance`. We will add two customers to this table and perform a funds transfer operation between them.

First, let's create the `Customers` table and insert two customers:

```py
import sqlite3

# Create the Customers table and add two customers
with sqlite3.connect('my_database.db') as connection:
    cursor = connection.cursor()

    # Create Customers table
    create_customers_table = '''
    CREATE TABLE IF NOT EXISTS Customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        balance REAL NOT NULL
    );
    '''
    cursor.execute(create_customers_table)

    # Insert two customers
    cursor.execute(
        "INSERT INTO Customers (name, balance) VALUES (?, ?);", ('Ashutosh', 100.0))
    cursor.execute(
        "INSERT INTO Customers (name, balance) VALUES (?, ?);", ('Krishna', 50.0))

    connection.commit()
```

Now, let’s perform the funds transfer operation between Ashutosh and Krishna:

```py
import sqlite3


def transfer_funds(from_customer, to_customer, amount):
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        try:
            # Start a transaction
            cursor.execute("BEGIN;")

            # Deduct amount from the sender
            cursor.execute(
                "UPDATE Customers SET balance = balance - ? WHERE name = ?;", (amount, from_customer))
            # Add amount to the receiver
            cursor.execute(
                "UPDATE Customers SET balance = balance + ? WHERE name = ?;", (amount, to_customer))

            # Commit the changes
            connection.commit()
            print(
                f"Transferred {amount} from {from_customer} to {to_customer}.")

        except Exception as e:
            # If an error occurs, rollback the transaction
            connection.rollback()
            print(f"Transaction failed: {e}")


# Example usage
transfer_funds('Ashutosh', 'Krishna', 80.0)
```

In this example, we first created a `Customers` table and inserted two customers, Ashutosh with a balance of ₹100, and Krishna with a balance of ₹50. We then performed a funds transfer of ₹80 from Ashutosh to Krishna. By using transactions, we ensure that both the debit from Ashutosh's account and the credit to Krishna's account are executed as a single atomic operation, maintaining data integrity in the event of any errors. If the transfer fails (for example, due to insufficient funds), the transaction will roll back, leaving both accounts unchanged.
