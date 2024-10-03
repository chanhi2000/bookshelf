---
lang: ko-KR
title: "How to Optimize SQLite Query Performance with Indexing"
description: Article(s) > (8/11) How to Work with SQLite in Python – A Handbook for Beginners 
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
      content: Article(s) > (8/11) How to Work with SQLite in Python – A Handbook for Beginners
    - property: og:description
      content: "How to Optimize SQLite Query Performance with Indexing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-optimize-sqlite-query-performance-with-indexing.html
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

Indexing is a powerful technique used in databases to improve query performance. An index is essentially a data structure that stores the location of rows based on specific column values, much like an index at the back of a book helps you quickly locate a topic.

Without an index, SQLite has to scan the entire table row by row to find the relevant data, which becomes inefficient as the dataset grows. By using an index, SQLite can jump directly to the rows you need, significantly speeding up query execution.

---

## How to Populate the Database with Fake Data

To effectively test the impact of indexing, we need a sizable dataset. Instead of manually adding records, we can use the `faker` library to quickly generate fake data. In this section, we’ll generate 10,000 fake records and insert them into our `Students` table. This will simulate a real-world scenario where databases grow large, and query performance becomes important.

We will use the `executemany()` method to insert the records as below:

```py
import sqlite3
from faker import Faker

# Initialize the Faker library
fake = Faker(['en_IN'])


def insert_fake_students(num_records):
    """Generate and insert fake student data into the Students table."""
    fake_data = [(fake.name(), fake.random_int(min=18, max=25),
                  fake.email()) for _ in range(num_records)]

    # Use 'with' to handle the database connection
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Insert fake data into the Students table
        cursor.executemany('''
        INSERT INTO Students (name, age, email) 
        VALUES (?, ?, ?);
        ''', fake_data)

        connection.commit()

    print(f"{num_records} fake student records inserted successfully.")


# Insert 10,000 fake records into the Students table
insert_fake_students(10000)
```

By running this script, 10,000 fake student records will be added to the `Students` table. In the next section, we'll query the database and compare the performance of queries with and without indexing.

## How to Query Without Indexes

In this section, we’ll query the `Students` table without any indexes to observe how SQLite performs when there are no optimizations in place. This will serve as a baseline to compare the performance when we add indexes later.

Without indexes, SQLite performs a full table scan, which means that it must check every row in the table to find matching results. For small datasets, this is manageable, but as the number of records grows, the time taken to search increases dramatically. Let’s see this in action by running a basic `SELECT` query to search for a specific student by name and measure how long it takes.

First, we’ll query the `Students` table by looking for a student with a specific name. We’ll log the time taken to execute the query using Python’s `time` module to measure the performance.

```py
import sqlite3
import time


def query_without_index(search_name):
    """Query the Students table by name without an index and measure the time taken."""

    # Connect to the database using 'with'
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Measure the start time
        start_time = time.perf_counter_ns()

        # Perform a SELECT query to find a student by name
        cursor.execute('''
        SELECT * FROM Students WHERE name = ?;
        ''', (search_name,))

        # Fetch all results (there should be only one or a few in practice)
        results = cursor.fetchall()

        # Measure the end time
        end_time = time.perf_counter_ns()

        # Calculate the total time taken
        elapsed_time = (end_time - start_time) / 1000

        # Display the results and the time taken
        print(f"Query completed in {elapsed_time:.5f} microseconds.")
        print("Results:", results)


# Example: Searching for a student by name
query_without_index('Ojasvi Dhawan')
```

Here’s the output:

```
Query completed in 1578.10000 microseconds.
Results: [(104, 'Ojasvi Dhawan', 21, 'lavanya26@example.com')]
```

By running the above script, you'll see how long it takes to search the `Students` table without any indexes. For example, if there are 10,000 records in the table, the query might take 1000-2000 microseconds depending on the size of the table and your hardware. This may not seem too slow for a small dataset, but the performance will degrade as more records are added.

We use `time.perf_counter_ns()` to measure the time taken for the query execution in nanoseconds. This method is highly accurate for benchmarking small time intervals. We convert the time to microseconds(`us`) for easier readability.

---

## Introducing the Query Plan

When working with databases, understanding how queries are executed can help you identify performance bottlenecks and optimize your code. SQLite provides a helpful tool for this called `EXPLAIN QUERY PLAN`, which allows you to analyze the steps SQLite takes to retrieve data.

In this section, we’ll introduce how to use `EXPLAIN QUERY PLAN` to visualize and understand the inner workings of a query—specifically, how SQLite performs a full table scan when no index is present.

Let’s use `EXPLAIN QUERY PLAN` to see how SQLite retrieves data from the `Students` table without any indexes. We’ll search for a student by name, and the query plan will reveal the steps SQLite takes to find the matching rows.

```py
import sqlite3


def explain_query(search_name):
    """Explain the query execution plan for a SELECT query without an index."""

    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Use EXPLAIN QUERY PLAN to analyze how the query is executed
        cursor.execute('''
        EXPLAIN QUERY PLAN
        SELECT * FROM Students WHERE name = ?;
        ''', (search_name,))

        # Fetch and display the query plan
        query_plan = cursor.fetchall()

        print("Query Plan:")
        for step in query_plan:
            print(step)


# Example: Analyzing the query plan for searching by name
explain_query('Ojasvi Dhawan')
```

When you run this code, SQLite will return a breakdown of how it plans to execute the query. Here’s an example of what the output might look like:

```
Query Plan:
(2, 0, 0, 'SCAN Students')
```

This indicates that SQLite is scanning the entire `Students` table (a full table scan) to find the rows where the `name` column matches the provided value (`Ojasvi Dhawan`). Since there is no index on the `name` column, SQLite must examine each row in the table.

---

## How to Create an Index

Creating an index on a column allows SQLite to find rows more quickly during query operations. Instead of scanning the entire table, SQLite can use the index to jump directly to the relevant rows, significantly speeding up queries—especially those involving large datasets.

To create an index, use the following SQL command:

```sql
CREATE INDEX IF NOT EXISTS index-name ON table (column(s));
```

In this example, we will create an index on the `name` column of the `Students` table. Here’s how you can do it using Python:

```py
import sqlite3
import time


def create_index():
    """Create an index on the name column of the Students table."""
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # SQL command to create an index on the name column
        create_index_query = '''
        CREATE INDEX IF NOT EXISTS idx_name ON Students (name);
        '''

        # Measure the start time
        start_time = time.perf_counter_ns()

        # Execute the SQL command to create the index
        cursor.execute(create_index_query)

        # Measure the start time
        end_time = time.perf_counter_ns()

        # Commit the changes
        connection.commit()

        print("Index on 'name' column created successfully!")

        # Calculate the total time taken
        elapsed_time = (end_time - start_time) / 1000

        # Display the results and the time taken
        print(f"Query completed in {elapsed_time:.5f} microseconds.")


# Call the function to create the index
create_index()
```

Output:

```
Index on 'name' column created successfully!
Query completed in 102768.60000 microseconds.
```

Even though creating the index takes this long (102768.6 microseconds), it's a one-time operation. You will still get substantial speed-up when running multiple queries. In the following sections, we will query the database again to observe the performance improvements made possible by this index.

## How to Query with Indexes

In this section, we will perform the same `SELECT` query we executed earlier, but this time we will take advantage of the index we created on the `name` column of the `Students` table. We'll measure and log the execution time to observe the performance improvements provided by the index.

```py
import sqlite3
import time


def query_with_index(student_name):
    """Query the Students table using an index on the name column."""
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # SQL command to select a student by name
        select_query = 'SELECT * FROM Students WHERE name = ?;'

        # Measure the execution time
        start_time = time.perf_counter_ns()  # Start the timer

        # Execute the query with the provided student name
        cursor.execute(select_query, (student_name,))
        result = cursor.fetchall()  # Fetch all results

        end_time = time.perf_counter_ns()  # End the timer

        # Calculate the elapsed time in microseconds
        execution_time = (end_time - start_time) / 1000

        # Display results and execution time
        print(f"Query result: {result}")
        print(f"Execution time with index: {execution_time:.5f} microseconds")


# Example: Searching for a student by name
query_with_index('Ojasvi Dhawan')
```

Here’s what we get in the output:

```
Query result: [(104, 'Ojasvi Dhawan', 21, 'lavanya26@example.com')]
Execution time with index: 390.70000 microseconds
```

We can observe a significant reduction in execution time compared to when the query was performed without an index.

Let’s analyze the query execution plan for the query with the index on the `name` column of the `Students` table. If you execute the same script again to explain the query, you’ll get the below output:

```
Query Plan:
(3, 0, 0, 'SEARCH Students USING INDEX idx_name (name=?)')
```

The plan now shows that the query uses the index `idx_name`, significantly reducing the number of rows that need to be scanned, which leads to faster query execution.

---

## Comparing Performance Results

Now, let's summarize the performance results we obtained when querying with and without indexes.

### Execution Time Comparison

| Query Type | Execution Time (microseconds)
| Without Index | 1578.1 |
| With Index | 390.7 |

### Performance Improvement Summary

- The query with the index is approximately 4.04 times faster than the query without the index.
- The execution time improved by about 75.24% after adding the index.

---

## Best Practices for Using Indexes

Indexes can significantly enhance the performance of your SQLite database, but they should be used judiciously. Here are some best practices to consider when working with indexes:

### When and Why to Use Indexes

1. **Frequent Query Columns**: Use indexes on columns that are frequently used in `SELECT` queries, especially those used in `WHERE`, `JOIN`, and `ORDER BY` clauses. This is because indexing these columns can drastically reduce query execution time.
2. **Uniqueness Constraints**: When you have columns that must hold unique values (like usernames or email addresses), creating an index can enforce this constraint efficiently.
3. **Large Datasets**: For tables with a large number of records, indexes become increasingly beneficial. They enable quick lookups, which is essential for maintaining performance as your data grows.
4. **Composite Indexes**: Consider creating composite indexes for queries that filter or sort by multiple columns. For example, if you often search for students by both `name` and `age`, an index on both columns can optimize such queries.

### Potential Downsides of Indexes

While indexes provide significant advantages, there are some potential downsides:

1. **Slower Insert/Update Operations**: When you insert or update records in a table with indexes, SQLite must also update the index, which can slow down these operations. This is because each insert or update requires additional overhead to maintain the index structure.
2. **Increased Storage Requirements**: Indexes consume additional disk space. For large tables, the storage cost can be substantial. Consider this when designing your database schema, especially for systems with limited storage resources.
3. **Complex Index Management**: Having too many indexes can complicate database management. It may lead to situations where you have redundant indexes, which can degrade performance rather than enhance it. Regularly reviewing and optimizing your indexes is a good practice.

Indexes are powerful tools for optimizing database queries, but they require careful consideration. Striking a balance between improved read performance and the potential overhead on write operations is key. Here are some strategies for achieving this balance:

- **Monitor Query Performance**: Use SQLite’s `EXPLAIN QUERY PLAN` to analyze how your queries perform with and without indexes. This can help identify which indexes are beneficial and which may be unnecessary.
- **Regular Maintenance**: Periodically review your indexes and assess whether they are still needed. Remove redundant or rarely used indexes to streamline your database operations.
- **Test and Evaluate**: Before implementing indexes in a production environment, conduct thorough testing to understand their impact on both read and write operations.

By following these best practices, you can leverage the benefits of indexing while minimizing potential drawbacks, ultimately enhancing the performance and efficiency of your SQLite database.
