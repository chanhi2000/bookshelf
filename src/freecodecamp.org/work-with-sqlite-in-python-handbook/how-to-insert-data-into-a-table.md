---
lang: en-US
title: "How to Insert Data into a Table"
description: Article(s) > (4/11) How to Work with SQLite in Python – A Handbook for Beginners 
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
      content: Article(s) > (4/11) How to Work with SQLite in Python – A Handbook for Beginners
    - property: og:description
      content: "How to Insert Data into a Table"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-insert-data-into-a-table.html
date: 2024-10-02
isOriginal: false
author: Ashutosh Krishna
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Work with SQLite in Python – A Handbook for Beginners",
  "desc": "SQLite is one of the most popular relational database management systems (RDBMS). It’s lightweight, meaning that it doesn’t take up much space on your system. One of its best features is that it’s serverless, so you don’t need to install or manage a ...",
  "link": "/freecodecamp.org/work-with-sqlite-in-python-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with SQLite in Python – A Handbook for Beginners"
  desc="SQLite is one of the most popular relational database management systems (RDBMS). It’s lightweight, meaning that it doesn’t take up much space on your system. One of its best features is that it’s serverless, so you don’t need to install or manage a ..."
  url="https://freecodecamp.org/news/work-with-sqlite-in-python-handbook/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"/>

Now that we have our `Students` table created, it’s time to start inserting data into the database. In this section, we’ll cover how to insert both single and multiple records using Python and SQLite, and how to avoid common security issues like SQL injection by using parameterized queries.

---

## How to Insert a Single Record

To insert data into the database, we use the `INSERT INTO` SQL command. Let’s start by inserting a single record into our `Students` table.

Here’s the basic SQL syntax for inserting a single record:

```sql
INSERT INTO Students (name, age, email) 
VALUES ('John Doe', 20, 'johndoe@example.com');
```

However, instead of writing SQL directly in our Python script with hardcoded values, we’ll use parameterized queries to make our code more secure and flexible. Parameterized queries help prevent SQL injection, a common attack where malicious users can manipulate the SQL query by passing harmful input.

Here’s how we can insert a single record into the `Students` table using a parameterized query:

```py
import sqlite3

# Use 'with' to open and close the connection automatically
with sqlite3.connect('my_database.db') as connection:
    cursor = connection.cursor()

    # Insert a record into the Students table
    insert_query = '''
    INSERT INTO Students (name, age, email) 
    VALUES (?, ?, ?);
    '''
    student_data = ('Jane Doe', 23, 'jane@example.com')

    cursor.execute(insert_query, student_data)

    # Commit the changes automatically
    connection.commit()

    # No need to call connection.close(); it's done automatically!
    print("Record inserted successfully!")
```

The `?` placeholders represent the values to be inserted into the table. The actual values are passed as a tuple (`student_data`) in the `cursor.execute()` method.

## How to Insert Multiple Records

If you want to insert multiple records at once, you can use the `executemany()` method in Python. This method takes a list of tuples, where each tuple represents one record.

To make our example more dynamic, we can use the `Faker` library to generate random student data. This is useful for testing and simulating real-world scenarios.

```py
from faker import Faker
import sqlite3

# Initialize Faker
fake = Faker(['en_IN'])

# Use 'with' to open and close the connection automatically
with sqlite3.connect('my_database.db') as connection:
    cursor = connection.cursor()

    # Insert a record into the Students table
    insert_query = '''
    INSERT INTO Students (name, age, email) 
    VALUES (?, ?, ?);
    '''
    students_data = [(fake.name(), fake.random_int(
        min=18, max=25), fake.email()) for _ in range(5)]

    # Execute the query for multiple records
    cursor.executemany(insert_query, students_data)

    # Commit the changes
    connection.commit()

    # Print confirmation message
    print("Fake student records inserted successfully!")
```

In this code:

- `Faker()` generates random names, ages, and emails for students. Passing the locale(`[‘en_IN’]`) is optional.
- `cursor.executemany()`: This method allows us to insert multiple records at once, making the code more efficient.
- `students_data`: A list of tuples where each tuple represents one student’s data.

---

## How to Handle Common Issues: SQL Injection

SQL injection is a security vulnerability where attackers can insert or manipulate SQL queries by providing harmful input. For example, an attacker might try to inject code like `'; DROP TABLE Students; --` to delete the table.

By using parameterized queries (as demonstrated above), we avoid this issue. The `?` placeholders in parameterized queries ensure that input values are treated as data, not as part of the SQL command. This makes it impossible for malicious code to be executed.