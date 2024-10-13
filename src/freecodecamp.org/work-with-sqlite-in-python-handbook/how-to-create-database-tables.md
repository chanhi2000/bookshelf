---
lang: en-US
title: "How to Create Database Tables"
description: Article(s) > (3/11) How to Work with SQLite in Python – A Handbook for Beginners 
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
      content: Article(s) > (3/11) How to Work with SQLite in Python – A Handbook for Beginners
    - property: og:description
      content: "How to Create Database Tables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-create-database-tables.html
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

Now that we’ve created an SQLite database and connected to it, the next step is to create tables inside the database. A table is where we’ll store our data, organized in rows (records) and columns (attributes). For this example, we’ll create a table called `Students` to store information about students, which we’ll reuse in upcoming sections.

To create a table, we use SQL's `CREATE TABLE` statement. This command defines the table structure, including the column names and the data types for each column.

Here’s a simple SQL command to create a `Students` table with the following fields:

- `id`: A unique identifier for each student (an integer).
- `name`: The student's name (text).
- `age`: The student's age (an integer).
- `email`: The student's email address (text).

The SQL command to create this table would look like this:

```sql
CREATE TABLE Students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER,
    email TEXT
);
```

We can execute this `CREATE TABLE` SQL command in Python using the `sqlite3` library. Let’s see how to do that.

```py
import sqlite3

# Use 'with' to connect to the SQLite database and automatically close the connection when done
with sqlite3.connect('my_database.db') as connection:

    # Create a cursor object
    cursor = connection.cursor()

    # Write the SQL command to create the Students table
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS Students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        email TEXT
    );
    '''

    # Execute the SQL command
    cursor.execute(create_table_query)

    # Commit the changes
    connection.commit()

    # Print a confirmation message
    print("Table 'Students' created successfully!")
```

- `IF NOT EXISTS`: This ensures that the table is only created if it doesn’t already exist, preventing errors if the table has been created before.
- `connection.commit()`: This saves (commits) the changes to the database.

When you run the Python code above, it will create the `Students` table in the `my_database.db` database file. You’ll also see a message in the terminal confirming that the table has been created successfully.

If you’re using Visual Studio Code, you can install the [<FontIcon icon="iconfont icon-vscode"/>SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer) extension to view SQLite databases.

![SQLite Viewer - VS Code Extension](https://cdn.hashnode.com/res/hashnode/image/upload/v1727514353100/522fc6f1-0363-41ca-a76a-b730470cb64a.png)

---

## Data Types in SQLite and Their Mapping to Python

SQLite supports several data types, which we need to understand when defining our tables. Here’s a quick overview of common SQLite data types and how they map to Python types:

| SQLite Data Type | Description | Python Equivalent |
| :--- | :--- | :--- |
| **INTEGER** | Whole numbers | `int` |
| **TEXT** | Text strings | `str` |
| **REAL** | Floating-point numbers | `float` |
| **BLOB** | Binary data (e.g., images, files) | `bytes` |
| **NULL** | Represents no value or missing data | `None` |

In our `Students` table:

- `id` is of type `INTEGER`, which maps to Python’s `int`.
- `name` and `email` are of type `TEXT`, which map to Python’s `str`.
- `age` is also of type `INTEGER`, mapping to Python’s `int`.