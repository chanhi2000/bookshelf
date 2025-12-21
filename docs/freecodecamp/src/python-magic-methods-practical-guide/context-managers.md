---
lang: en-US
title: "Context Managers"
description: "Article(s) > (6/10) How Python Magic Methods Work: A Practical Guide" 
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Context Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/python-magic-methods-practical-guide/context-managers.html
date: 2025-03-21
isOriginal: false
author:
  - name: Vivek Sahu
    url : https://freecodecamp.org/news/author/viv1/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How Python Magic Methods Work: A Practical Guide",
  "desc": "Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe...",
  "link": "/freecodecamp.org/python-magic-methods-practical-guide/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Python Magic Methods Work: A Practical Guide"
  desc="Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe..."
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-context-managers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

Context managers are a powerful feature in Python that helps you manage resources properly. They ensure that resources are properly acquired and released, even if an error occurs. The `with` statement is the most common way to use context managers.

---

## `__enter__` and `__exit__`

To create a context manager, you need to implement two magic methods:

1. `__enter__`: Called when entering the `with` block. It should return the resource to be managed.
2. `__exit__`: Called when exiting the `with` block, even if an exception occurs. It should handle cleanup.

The `__exit__` method receives three arguments:

- `exc_type`: The type of the exception (if any)
- `exc_val`: The exception instance (if any)
- `exc_tb`: The traceback (if any)

---

## Practical Example: Database Connection Manager

Let's create a context manager for database connections. This example shows how to properly manage database resources and handle transactions:

```py :collapsed-lines
import sqlite3
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class DatabaseConnection:
    def __init__(self, db_path):
        self.db_path = db_path
        self.connection = None
        self.cursor = None

    def __enter__(self):
        logging.info(f"Connecting to database: {self.db_path}")
        self.connection = sqlite3.connect(self.db_path)
        self.cursor = self.connection.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            logging.error(f"An error occurred: {exc_val}")
            self.connection.rollback()
            logging.info("Transaction rolled back")
        else:
            self.connection.commit()
            logging.info("Transaction committed")

        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

        logging.info("Database connection closed")

        # Return False to propagate exceptions, True to suppress them
        return False
```

Let's break down how this context manager works:

1. **Initialization**:
    - The class takes a database path
    - It initializes connection and cursor as None
2. **Enter method**:
    - Creates a database connection
    - Creates a cursor
    - Returns the cursor for use in the `with` block
3. **Exit method**:
    - Handles transaction management (commit/rollback)
    - Closes cursor and connection
    - Logs all operations
    - Returns False to propagate exceptions

Here's how to use the context manager:

```py :collapsed-lines
# Create a test database in memory
try:
    # Successful transaction
    with DatabaseConnection(":memory:") as cursor:
        # Create a table
        cursor.execute("""
            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT
            )
        """)

        # Insert data
        cursor.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            ("Vivek", "hello@wewake.dev")
        )

        # Query data
        cursor.execute("SELECT * FROM users")
        print(cursor.fetchall())  # Output: [(1, 'Vivek', 'hello@wewake.dev')]

    # Demonstrate transaction rollback on error
    with DatabaseConnection(":memory:") as cursor:
        cursor.execute("""
            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                email TEXT
            )
        """)
        cursor.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            ("Wewake", "contact@wewake.dev")
        )
        # This will cause an error - table 'nonexistent' doesn't exist
        cursor.execute("SELECT * FROM nonexistent")
except sqlite3.OperationalError as e:
    print(f"Caught exception: {e}")
```

This context manager provides several benefits:

1. Resources are managed automatically (ex: connections are always closed).
2. With transaction safety, changes are committed or rolled back appropriately.
3. Exceptions are caught and handled gracefully
4. All operations are logged for debugging
5. The `with` statement makes the code clear and concise
