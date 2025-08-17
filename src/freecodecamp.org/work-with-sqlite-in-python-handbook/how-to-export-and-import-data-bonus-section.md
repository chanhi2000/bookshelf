---
lang: en-US
title: "How to Export and Import Data [Bonus Section]"
description: Article(s) > (10/11) How to Work with SQLite in Python - A Handbook for Beginners 
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
      content: Article(s) > (10/11) How to Work with SQLite in Python - A Handbook for Beginners
    - property: og:description
      content: "How to Export and Import Data [Bonus Section]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/work-with-sqlite-in-python-handbook/how-to-export-and-import-data-bonus-section.html
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

In this section, we will learn how to export data from an SQLite database to common formats like CSV and JSON, as well as how to import data into SQLite from these formats using Python. This is useful for data sharing, backup, and integration with other applications.

---

## Exporting Data from SQLite to CSV

Exporting data to a CSV (Comma-Separated Values) file is straightforward with Python’s built-in libraries. CSV files are widely used for data storage and exchange, making them a convenient format for exporting data.

Here’s how to export data from an SQLite table to a CSV file:

```py
import sqlite3
import csv

def export_to_csv(file_name):
    """Export data from the Customers table to a CSV file."""
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Execute a query to fetch all customer data
        cursor.execute("SELECT * FROM Customers;")
        customers = cursor.fetchall()

        # Write data to CSV
        with open(file_name, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            csv_writer.writerow(['ID', 'Name', 'Balance'])  # Writing header
            csv_writer.writerows(customers)  # Writing data rows

        print(f"Data exported successfully to {file_name}.")

# Example usage
export_to_csv('customers.csv')
```

---

## How to Export Data to JSON

Similarly, you can export data to a [<FontIcon icon="fas fa-globe"/>JSON](https://blog.ashutoshkrris.in/a-beginners-guide-to-the-json-module-in-python) (JavaScript Object Notation) file, which is a popular format for data interchange, especially in web applications.

Here’s an example of how to export data to JSON:

```py
import json
import sqlite3


def export_to_json(file_name):
    """Export data from the Customers table to a JSON file."""
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Execute a query to fetch all customer data
        cursor.execute("SELECT * FROM Customers;")
        customers = cursor.fetchall()

        # Convert data to a list of dictionaries
        customers_list = [{'ID': customer[0], 'Name': customer[1],
                            'Balance': customer[2]} for customer in customers]

        # Write data to JSON
        with open(file_name, 'w') as json_file:
            json.dump(customers_list, json_file, indent=4)

        print(f"Data exported successfully to {file_name}.")


# Example usage
export_to_json('customers.json')
```

## How to Import Data into SQLite from CSV

You can also import data from a CSV file into an SQLite database. This is useful for populating your database with existing datasets.

Here's how to import data from a CSV file:

```py
import csv
import sqlite3


def import_from_csv(file_name):
    """Import data from a CSV file into the Customers table."""
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Open the CSV file for reading
        with open(file_name, 'r') as csv_file:
            csv_reader = csv.reader(csv_file)
            next(csv_reader)  # Skip the header row

            # Insert each row into the Customers table
            for row in csv_reader:
                cursor.execute(
                    "INSERT INTO Customers (name, balance) VALUES (?, ?);", (row[1], row[2]))

        connection.commit()
        print(f"Data imported successfully from {file_name}.")


# Example usage
import_from_csv('customer_data.csv')
```

## How to Import Data into SQLite from JSON

Similarly, importing data from a JSON file is simple. You can read the JSON file and insert the data into your SQLite table.

Here's how to do it:

```py
import json
import sqlite3


def import_from_json(file_name):
    """Import data from a JSON file into the Customers table."""
    with sqlite3.connect('my_database.db') as connection:
        cursor = connection.cursor()

        # Open the JSON file for reading
        with open(file_name, 'r') as json_file:
            customers_list = json.load(json_file)

            # Insert each customer into the Customers table
            for customer in customers_list:
                cursor.execute("INSERT INTO Customers (name, balance) VALUES (?, ?);", (customer['Name'], customer['Balance']))

        connection.commit()
        print(f"Data imported successfully from {file_name}.")


# Example usage
import_from_json('customer_data.json')
```
