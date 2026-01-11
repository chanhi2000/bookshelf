---
lang: en-US
title: "How to Work with the ORC File Format in Python – A Guide with Examples"
description: "Article(s) > How to Work with the ORC File Format in Python – A Guide with Examples"
icon: iconfont icon-pandas
category:
  - Python
  - Pandas
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pandas
  - py-pandas
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Work with the ORC File Format in Python – A Guide with Examples"
    - property: og:description
      content: "How to Work with the ORC File Format in Python – A Guide with Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-the-orc-file-format-in-python-a-guide-with-examples.html
prev: /programming/py-pandas/articles/README.md
date: 2026-01-14
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768353870711/56ddb07c-56b0-4c3a-92ce-b1a86ea0e6e0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Pandas > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-pandas/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with the ORC File Format in Python – A Guide with Examples"
  desc="If you've worked with big data or analytics platforms, you've probably heard about ORC files. But what exactly are they, and how can you work with them in Python? In this tutorial, I'll walk you through the basics of reading, writing, and manipulatin..."
  url="https://freecodecamp.org/news/how-to-work-with-the-orc-file-format-in-python-a-guide-with-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768353870711/56ddb07c-56b0-4c3a-92ce-b1a86ea0e6e0.png"/>

If you've worked with big data or analytics platforms, you've probably heard about [<VPIcon icon="fas fa-globe"/>ORC files](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+ORC). But what exactly are they, and how can you work with them in Python?

In this tutorial, I'll walk you through the basics of reading, writing, and manipulating ORC files using Python. By the end, you'll understand when to use ORC and how to integrate it into your data pipelines.

::: info

You can find the code on GitHub

<SiteInfo
  name="python-basics/working-with-orc at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/working-with-orc/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/41d23064bcefb59d777850e4e8ba58f9f69bab31d78af5706ba095ee4045e7cc/balapriyac/python-basics"/>

:::

---

## What Is the ORC File Format?

[<VPIcon icon="fas fa-globe"/>ORC](https://cwiki.apache.org/confluence/display/Hive/LanguageManual+ORC) stands for **Optimized Row Columnar**. It's a columnar storage file format designed for Hadoop workloads. Unlike traditional row-based formats like CSV, ORC stores data by columns, which makes it incredibly efficient for analytical queries.

Here's why ORC is popular:

- ORC files are highly compressed, often 75% smaller than text files
- Columnar format means you only read the columns you need
- You can add or remove columns without rewriting data
- ORC includes lightweight indexes for faster queries

Most organizations use ORC for their big data processing because it works well with [<VPIcon icon="iconfont icon-apachehive"/>Apache Hive](https://hive.apache.org/), [<VPIcon icon="iconfont icon-apachespark"/>Spark](https://spark.apache.org/), and [<VPIcon icon="fas fa-globe"/>Presto](https://prestodb.io/).

::: note Prerequisites

Before we get started, make sure you have:

- Python 3.10 or a later version installed
- Basic understanding of DataFrames (pandas or similar)
- Familiarity with file I/O operations

You'll need to install these libraries:

```sh
pip install pyarrow pandas
```

So why do we need [PyArrow<VPIcon icon="fas fa-globe"/>](https://arrow.apache.org/docs/python/index.html)? PyArrow is the Python implementation of [Apache <VPIcon icon="fas fa-globe"/>Arrow](https://arrow.apache.org/), which provides excellent support for columnar formats like ORC and Parquet. It's fast, memory-efficient, and actively maintained.

:::

---

## Reading ORC Files in Python

Let's start by reading an ORC file. First, I'll show you how to create a sample ORC file so we have something to work with.

### Creating a Sample ORC File

Here's how we'll create a simple employee dataset and save it as ORC:

```py
import pandas as pd
import pyarrow as pa
import pyarrow.orc as orc

# Create sample employee data
data = {
    'employee_id': [101, 102, 103, 104, 105],
    'name': ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Eve Davis'],
    'department': ['Engineering', 'Sales', 'Engineering', 'HR', 'Sales'],
    'salary': [95000, 65000, 88000, 72000, 71000],
    'years_experience': [5, 3, 7, 4, 3]
}

df = pd.DataFrame(data)

# Convert to PyArrow Table and write as ORC
table = pa.Table.from_pandas(df)
orc.write_table(table, 'employees.orc')

print("ORC file created successfully!")
#
# ORC file created successfully!
```

Let me break down what's happening here. We start with a pandas DataFrame containing employee information. Then we convert it to a PyArrow table, which is PyArrow's in-memory representation of columnar data. Finally, we use `orc.write_table()` to write it to disk in ORC format.

The conversion to a PyArrow table is necessary because ORC is a columnar format, and PyArrow handles the translation from row-based pandas to column-based storage.

### Reading the ORC File

Now that we have an ORC file, let's read it back:

```py
# Read ORC file
table = orc.read_table('employees.orc')

# Convert to pandas DataFrame for easier viewing
df_read = table.to_pandas()

print(df_read)
print(f"\nData types:\n{df_read.dtypes}")
#
#   employee_id           name   department  salary  years_experience
#           101  Alice Johnson  Engineering   95000                 5
#           102      Bob Smith        Sales   65000                 3
#           103    Carol White  Engineering   88000                 7
#           104    David Brown           HR   72000                 4
#           105      Eve Davis        Sales   71000                 3
#
# Data types:
# employee_id          int64
# name                object
# department          object
# salary               int64
# years_experience     int64
# dtype: object
```

The `orc.read_table()` function loads the entire ORC file into memory as a PyArrow table. We then convert it back to pandas for familiar DataFrame operations.

Notice how the data types are preserved. ORC maintains schema information, so your integers stay integers and strings stay strings.

### Reading Specific Columns

Here's where ORC really shines. When working with large datasets, you often don't need all columns. ORC lets you read only what you need:

```py
# Read only specific columns
table_subset = orc.read_table('employees.orc', columns=['name', 'salary'])
df_subset = table_subset.to_pandas()

print(df_subset)
#
#           name  salary
#  Alice Johnson   95000
#      Bob Smith   65000
#    Carol White   88000
#    David Brown   72000
#      Eve Davis   71000
```

This is called column pruning, and it's a massive performance optimization. If your ORC file has 50 columns but you only need 3, you're reading a fraction of the data. This translates to faster load times and lower memory usage.

---

## Writing ORC Files with Compression

ORC supports multiple compression codecs. Let's explore how to use compression when writing files:

```py
# Create a larger dataset
large_data = {
    'id': range(10000),
    'value': [f"data_{i}" for i in range(10000)],
    'category': ['A', 'B', 'C', 'D'] * 2500
}

df_large = pd.DataFrame(large_data)
table_large = pa.Table.from_pandas(df_large)

# Write with ZLIB compression (default)
orc.write_table(table_large, 'data_zlib.orc', compression='ZLIB')

# Write with SNAPPY compression (faster but less compression)
orc.write_table(table_large, 'data_snappy.orc', compression='SNAPPY')

# Write with ZSTD compression (good balance)
orc.write_table(table_large, 'data_zstd.orc', compression='ZSTD')

import os
print(f"ZLIB size: {os.path.getsize('data_zlib.orc'):,} bytes")
print(f"SNAPPY size: {os.path.getsize('data_snappy.orc'):,} bytes")
print(f"ZSTD size: {os.path.getsize('data_zstd.orc'):,} bytes")
#
# ZLIB size: 23,342 bytes
# SNAPPY size: 44,978 bytes
# ZSTD size: 6,380 bytes
```

Different compression codecs offer different trade-offs. [ZLIB](https://docs.python.org/3/library/zlib.html) gives better compression but is slower. [SNAPPY (<VPIcon icon="iconfont icon-github" />`google/snappy`)](https://github.com/google/snappy) is faster but produces larger files. [ZSTD (<VPIcon icon="iconfont icon-github" />`facebook/zstd`)](https://github.com/facebook/zstd) offers a good balance between compression ratio and speed.

For most use cases, I recommend ZSTD. It's fast enough for real-time processing and provides excellent compression.

---

## Working with Complex Data Types

ORC handles nested data structures well. Here's how to work with lists and nested data:

```py
# Create data with complex types
complex_data = {
    'user_id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Carol'],
    'purchases': [
        ['laptop', 'mouse'],
        ['keyboard'],
        ['monitor', 'cable', 'stand']
    ],
    'ratings': [
        [4.5, 5.0],
        [3.5],
        [4.0, 4.5, 5.0]
    ]
}

df_complex = pd.DataFrame(complex_data)
table_complex = pa.Table.from_pandas(df_complex)
orc.write_table(table_complex, 'complex_data.orc')

# Read it back
table_read = orc.read_table('complex_data.orc')
df_read = table_read.to_pandas()

print(df_read)
print(f"\nType of 'purchases' column: {type(df_read['purchases'][0])}")
#
#  user_id   name                purchases          ratings
#        1  Alice          [laptop, mouse]       [4.5, 5.0]
#        2    Bob               [keyboard]            [3.5]
#        3  Carol  [monitor, cable, stand]  [4.0, 4.5, 5.0]

Type of 'purchases' column: <class 'numpy.ndarray'>
```

ORC preserves list structures, which is incredibly useful for storing JSON-like data or aggregated information. Each cell can contain a list, and ORC handles the variable-length storage efficiently.

---

## A More Helpful Example: Processing Log Data

Let's put this together with a practical example. Imagine you're processing web server logs:

```py
from datetime import datetime, timedelta
import random

# Generate sample log data
log_data = []
start_date = datetime(2025, 1, 1)

for i in range(1000):
    log_data.append({
        'timestamp': start_date + timedelta(minutes=i),
        'user_id': random.randint(1000, 9999),
        'endpoint': random.choice(['/api/users', '/api/products', '/api/orders']),
        'status_code': random.choice([200, 200, 200, 404, 500]),
        'response_time_ms': random.randint(50, 2000)
    })

df_logs = pd.DataFrame(log_data)

# Write logs to ORC
table_logs = pa.Table.from_pandas(df_logs)
orc.write_table(table_logs, 'server_logs.orc', compression='ZSTD')

# Later, query only failed requests
table_subset = orc.read_table('server_logs.orc')
df_subset = table_subset.to_pandas()

# Filter for errors
errors = df_subset[df_subset['status_code'] >= 400]
print(f"Total errors: {len(errors)}")
print(f"\nError breakdown:\n{errors['status_code'].value_counts()}")
print(f"\nSlowest error response: {errors['response_time_ms'].max()}ms")
#
# Total errors: 387
# 
# Error breakdown:
# status_code
# 404    211
# 500    176
# Name: count, dtype: int64
# 
# Slowest error response: 1994ms
```

This example shows how ORC files are suitable file formats for log storage. You can write logs continuously, compress them efficiently, and query them quickly. The columnar format means you can filter by status code without reading endpoint or response time data.

---

## When Should You Use ORC?

Use ORC when you:

- Work with big data platforms (Hadoop, Spark, Hive)
- Need efficient storage for analytics workloads
- Have wide tables where you often query specific columns
- Want built-in compression and indexing

Don't use ORC when you:

- Need row-by-row processing – use [<VPIcon icon="fas fa-globe"/>Avro](https://avro.apache.org/) instead
- Work with small datasets – CSV is simpler in such cases
- Need human-readable files – [**use JSON**](/freecodecamp.org/how-to-parse-json-in-python-with-examples.md)
- Don't have big data infrastructure

---

## Conclusion

ORC is a powerful format for data engineering and analytics. With PyArrow, working with ORC in Python is both straightforward and performant.

You've learned how to read and write ORC files, use compression, handle complex data types, and apply these concepts to real-world scenarios. The columnar storage and compression make ORC an excellent choice for big data pipelines.

Try integrating ORC into your next data project. You'll likely see significant improvements in storage costs and query performance.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with the ORC File Format in Python – A Guide with Examples",
  "desc": "If you've worked with big data or analytics platforms, you've probably heard about ORC files. But what exactly are they, and how can you work with them in Python? In this tutorial, I'll walk you through the basics of reading, writing, and manipulatin...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-the-orc-file-format-in-python-a-guide-with-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
