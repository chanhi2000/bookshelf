---
lang: en-US
title: "How to Update and Delete Data"
description: Article(s) > (6/11) How to Work with SQLite in Python – A Handbook for Beginners 
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
      content: Article(s) > (6/11) How to Work with SQLite in Python – A Handbook for Beginners
    - property: og:description
      content: "How to Update and Delete Data"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-update-and-delete-data.html
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

In this section, we’ll learn how to update existing records and delete records from our `Students` table using SQL commands in Python. This is essential for managing and maintaining your data effectively.

---

## Updating Existing Records

To modify existing records in a database, we use the SQL `UPDATE` command. This command allows us to change the values of specific columns in one or more rows based on a specified condition.

For example, if we want to update a student's age, the SQL command would look like this:

```sql
UPDATE Students 
SET age = 21 
WHERE name = 'Jane Doe';
```

Now, let’s write Python code to update a specific student's age in our `Students` table.

```py
import sqlite3

# Use 'with' to connect to the SQLite database
with sqlite3.connect('my_database.db') as connection:
    cursor = connection.cursor()

    # SQL command to update a student's age
    update_query = '''
    UPDATE Students 
    SET age = ? 
    WHERE name = ?;
    '''

    # Data for the update
    new_age = 21
    student_name = 'Jane Doe'

    # Execute the SQL command with the data
    cursor.execute(update_query, (new_age, student_name))

    # Commit the changes to save the update
    connection.commit()

    # Print a confirmation message
    print(f"Updated age for {student_name} to {new_age}.")
```

In this example, we used parameterized queries to prevent SQL injection.

---

## How to Delete Records from the Table

To remove records from a database, we use the SQL `DELETE` command. This command allows us to delete one or more rows based on a specified condition.

For example, if we want to delete a student named 'Jane Doe', the SQL command would look like this:

```sql
DELETE FROM Students 
WHERE name = 'Jane Doe';
```

Let’s write Python code to delete a specific student from our `Students` table using the `with` statement.

```py
import sqlite3

# Use 'with' to connect to the SQLite database
with sqlite3.connect('my_database.db') as connection:
    cursor = connection.cursor()

    # SQL command to delete a student
    delete_query = '''
    DELETE FROM Students 
    WHERE name = ?;
    '''

    # Name of the student to be deleted
    student_name = 'Jane Doe'

    # Execute the SQL command with the data
    cursor.execute(delete_query, (student_name,))

    # Commit the changes to save the deletion
    connection.commit()

    # Print a confirmation message
    print(f"Deleted student record for {student_name}.")
```

### Important Considerations

#### Conditions

Always use the `WHERE` clause when updating or deleting records to avoid modifying or removing all rows in the table. Without a `WHERE` clause, the command affects every row in the table.

![357089 rows affected Meme](https://cdn.hashnode.com/res/hashnode/image/upload/v1727519069500/f22be4cc-e75f-4492-af01-ed08f31361f3.jpeg)

#### Backup

It’s good practice to back up your database before performing updates or deletions, especially in production environments.