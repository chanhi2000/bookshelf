---
lang: en-US
title: "How to Query Data"
description: Article(s) > (5/11) How to Work with SQLite in Python – A Handbook for Beginners 
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
      content: Article(s) > (5/11) How to Work with SQLite in Python – A Handbook for Beginners
    - property: og:description
      content: "How to Query Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-query-data.html
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

Now that we’ve inserted some data into our `Students` table, let’s learn how to retrieve the data from the table. We'll explore different methods for fetching data in Python, including `fetchone()`, `fetchall()`, and `fetchmany()`.

To query data from a table, we use the `SELECT` statement. Here’s a simple SQL command to select all columns from the `Students` table:

```sql
SELECT * FROM Students;
```

This command retrieves all records and columns from the `Students` table. We can execute this `SELECT` query in Python and fetch the results.

---

## How to Fetch All Records

Here’s how we can fetch all records from the `Students` table:

```py
import sqlite3

# Use 'with' to connect to the SQLite database
with sqlite3.connect('my_database.db') as connection:

    # Create a cursor object
    cursor = connection.cursor()

    # Write the SQL command to select all records from the Students table
    select_query = "SELECT * FROM Students;"

    # Execute the SQL command
    cursor.execute(select_query)

    # Fetch all records
    all_students = cursor.fetchall()

    # Display results in the terminal
    print("All Students:")
    for student in all_students:
        print(student)
```

In this example, the `fetchall()` method retrieves all rows returned by the query as a list of tuples.

```
All Students:
(1, 'Jane Doe', 23, 'jane@example.com')
(2, 'Bahadurjit Sabharwal', 18, 'tristanupadhyay@example.net')
(3, 'Zayyan Arya', 20, 'yashawinibhakta@example.org')
(4, 'Hemani Shukla', 18, 'gaurikanarula@example.com')
(5, 'Warda Kara', 20, 'npatil@example.net')
(6, 'Mitali Nazareth', 19, 'sparekh@example.org')
```

---

## How to Fetch a Single Record

If you want to retrieve only one record, you can use the `fetchone()` method:

```py
import sqlite3

# Use 'with' to connect to the SQLite database
with sqlite3.connect('my_database.db') as connection:

    # Create a cursor object
    cursor = connection.cursor()

    # Write the SQL command to select all records from the Students table
    select_query = "SELECT * FROM Students;"

    # Execute the SQL command
    cursor.execute(select_query)

    # Fetch one record
    student = cursor.fetchone()

    # Display the result
    print("First Student:")
    print(student)
```

Output:

```
First Student:
(1, 'Jane Doe', 23, 'jane@example.com')
```

---

## How to Fetch Multiple Records

To fetch a specific number of records, you can use `fetchmany(size)`:

```py
import sqlite3

# Use 'with' to connect to the SQLite database
with sqlite3.connect('my_database.db') as connection:

    # Create a cursor object
    cursor = connection.cursor()

    # Write the SQL command to select all records from the Students table
    select_query = "SELECT * FROM Students;"

    # Execute the SQL command
    cursor.execute(select_query)

    # Fetch three records
    three_students = cursor.fetchmany(3)

    # Display results
    print("Three Students:")
    for student in three_students:
        print(student)
```

Output:

```
Three Students:
(1, 'Jane Doe', 23, 'jane@example.com')
(2, 'Bahadurjit Sabharwal', 18, 'tristanupadhyay@example.net')
(3, 'Zayyan Arya', 20, 'yashawinibhakta@example.org')
```

---

## How to Use `pandas` for Better Data Presentation

For better data presentation, we can use the `pandas` library to create a `DataFrame` from our query results. This makes it easier to manipulate and visualize the data.

Here’s how to fetch all records and display them as a pandas DataFrame:

```py
import sqlite3
import pandas as pd

# Use 'with' to connect to the SQLite database
with sqlite3.connect('my_database.db') as connection:
    # Write the SQL command to select all records from the Students table
    select_query = "SELECT * FROM Students;"

    # Use pandas to read SQL query directly into a DataFrame
    df = pd.read_sql_query(select_query, connection)

# Display the DataFrame
print("All Students as DataFrame:")
print(df)
```

Output:

```
All Students as DataFrame:
    id                  name  age                        email
0   1              Jane Doe   23             jane@example.com
1   2  Bahadurjit Sabharwal   18  tristanupadhyay@example.net
2   3           Zayyan Arya   20  yashawinibhakta@example.org
3   4         Hemani Shukla   18    gaurikanarula@example.com
4   5            Warda Kara   20           npatil@example.net
5   6       Mitali Nazareth   19          sparekh@example.org
```

The `pd.read_sql_query()` function executes the SQL query and directly returns the results as a pandas DataFrame.
