---
lang: en-US
title: "How to Create an SQLite Database"
description: Article(s) > (2/11) How to Work with SQLite in Python - A Handbook for Beginners 
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
      content: Article(s) > (2/11) How to Work with SQLite in Python - A Handbook for Beginners
    - property: og:description
      content: "How to Create an SQLite Database"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-create-an-sqlite-database.html
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

A database is a structured way to store and manage data so that it can be easily accessed, updated, and organized. It’s like a digital filing system that allows you to efficiently store large amounts of data, whether it’s for a simple app or a more complex system. Databases use tables to organize data, with rows and columns representing individual records and their attributes.

---

## How SQLite Databases Work

Unlike most other database systems, SQLite is a serverless database. This means that it doesn’t require setting up or managing a server, making it lightweight and easy to use. All the data is stored in a single file on your computer, which you can easily move, share, or back up. Despite its simplicity, SQLite is powerful enough to handle many common database tasks and is widely used in mobile apps, embedded systems, and small to medium-sized projects.

---

## How to Create a New SQLite Database

Let’s create a new SQLite database and learn how to interact with it using Python’s `sqlite3` library.

### Connecting to the Database

Since `sqlite3` is pre-installed, you just need to import it in your Python script. To create a new database or connect to an existing one, we use the `sqlite3.connect()` method. This method takes the name of the database file as an argument. If the file doesn’t exist, SQLite will automatically create it.

```py
import sqlite3

# Connect to the SQLite database (or create it if it doesn't exist)
connection = sqlite3.connect('my_database.db')
```

In this example, a file named <FontIcon icon="fas fa-database"/>`my_database.db` is created in the same directory as your script. If the file already exists, SQLite will just open the connection to it.

### Creating a Cursor

Once you have a connection, the next step is to create a cursor object. The cursor is responsible for executing SQL commands and queries on the database.

```py
# Create a cursor object
cursor = connection.cursor()
```

### Closing the Connection

After you’ve finished working with the database, it’s important to close the connection to free up any resources. You can close the connection with the following command:

```py
# Close the database connection
connection.close()
```

However, you should only close the connection once you’re done with all your operations.

When you run your Python script, a file named <FontIcon icon="fas fa-database"/>`my_database.db` will be created in your current working directory. You’ve now successfully created your first SQLite database!

---

## How to Use Context Manager to Open and Close Connections

Python provides a more efficient and cleaner way to handle database connections using the `with` statement, also known as a context manager. The `with` statement automatically opens and closes the connection, ensuring that the connection is properly closed even if an error occurs during the database operations. This eliminates the need to manually call `connection.close()`.

Here’s how you can use the `with` statement to handle database connections:

```py
import sqlite3

# Step 1: Use 'with' to connect to the database (or create one) and automatically close it when done
with sqlite3.connect('my_database.db') as connection:

    # Step 2: Create a cursor object to interact with the database
    cursor = connection.cursor()

    print("Database created and connected successfully!")

# No need to call connection.close(); it's done automatically!
```

From now on, we’ll use the `with` statement in our upcoming code examples to manage database connections efficiently. This will make the code more concise and easier to maintain.