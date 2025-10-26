---
lang: en-US
title: "How to Parse JSON in Python – A Complete Guide With Examples"
description: "Article(s) > How to Parse JSON in Python – A Complete Guide With Examples"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Parse JSON in Python – A Complete Guide With Examples"
    - property: og:description
      content: "How to Parse JSON in Python – A Complete Guide With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-parse-json-in-python-with-examples.html
prev: /programming/py/articles/README.md
date: 2025-10-30
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761774871223/d4b07c0a-d37e-4197-bb47-f1ee6f51dffd.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Parse JSON in Python – A Complete Guide With Examples"
  desc="JSON has become the standard format for data exchange on the web. So you'll run into JSON all the time when working with REST APIs, configuration files, database exports, and more. As a developer, you should know how to parse, manipulate, and generat..."
  url="https://freecodecamp.org/news/how-to-parse-json-in-python-with-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761774871223/d4b07c0a-d37e-4197-bb47-f1ee6f51dffd.png"/>

JSON has become the standard format for data exchange on the web. So you'll run into JSON all the time when working with REST APIs, configuration files, database exports, and more. As a developer, you should know how to parse, manipulate, and generate JSON efficiently.

Python's [<VPIcon icon="fa-brands fa-python"/>built-in json module](https://docs.python.org/3/library/json.html) provides a straightforward interface for working with JSON data. You'll use it to convert JSON strings into Python dictionaries and lists that you can manipulate with familiar syntax, and then convert your Python data structures back into JSON when you need to send data to an API or save it to a file.

Beyond basic parsing, you'll often need to handle nested structures, validate data integrity, manage, and transform data formats. This guide covers practical JSON parsing techniques you can use in your projects right away. Let’s get started!

::: info 🔗 You can find the code examples on GitHub

<SiteInfo
  name="python-basics/parsing-json at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/parsing-json/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/03a9b38438630a544d6422a1c8e8ae633aa891ac67e4d01fe964226beffe2237/balapriyac/python-basics"/>

:::

::: note Prerequisites

To follow along with this tutorial, you should have:

- Python 3.7 or later installed on your system
- Basic understanding of Python dictionaries and lists
- Familiarity with Python file operations (opening and reading files)
- A text editor or IDE for writing Python code

:::

---

## Understanding JSON Structure and Basic Parsing

JSON represents data using a simple syntax with six data types: **objects (key-value pairs), arrays, strings, numbers, Booleans,** and **null**.

When Python parses JSON, these types map directly to Python equivalents:

- JSON objects become dictionaries,
- arrays become lists,
- strings remain strings,
- numbers become `int` or `float`,
- true and false become `True` and `False`, and
- null becomes `None`.

This direct mapping makes working with JSON in Python intuitive once you understand the correspondence.

Before you start, import the `json` module that’s built into the Python standard library.

The basic operation in JSON parsing is converting a JSON string into a Python data structure you can work with. Here's how to perform this basic conversion:

```py
import json

json_string = '{"name": "Sarah Chen", "age": 28, "city": "Portland"}'
person = json.loads(json_string)

print(person["name"]) 
print(person["age"])   
print(type(person))
#
# Sarah Chen
# 28
# <class 'dict'>
```

Here, the `json.loads()` function takes a string containing JSON and returns a Python object. The `'s'` in `'loads'` stands for 'string', indicating it works with string data. After parsing, you have a regular Python dictionary that you can access with bracket notation using the JSON keys.

---

## How to Work with Nested JSON Objects

Real-world JSON data rarely comes in flat structures. APIs typically return deeply nested objects containing multiple levels of data. Understanding how to navigate these structures is essential for extracting the information you need.

Consider this example of parsing a weather API response that contains nested objects for location data and current conditions:

```py
import json

weather_data = '''
{
    "location": {
        "city": "Seattle",
        "state": "WA",
        "coordinates": {
            "latitude": 47.6062,
            "longitude": -122.3321
        }
    },
    "current": {
        "temperature_f": 58,
        "conditions": "Partly Cloudy",
        "humidity": 72,
        "wind": {
            "speed_mph": 8,
            "direction": "NW"
        }
    }
}
'''

weather = json.loads(weather_data)
```

After parsing the JSON string with `json.loads()`, you can access nested values by chaining dictionary keys together:

```py
city = weather["location"]["city"]
temp = weather["current"]["temperature_f"]
wind_speed = weather["current"]["wind"]["speed_mph"]

print(f"{city}: {temp}°F, Wind {wind_speed} mph")
#
# Seattle: 58°F, Wind 8 mph
```

In this example, each level of nesting requires another set of brackets. The expression `weather["location"]["city"]` first accesses the `"location"` object, then retrieves the `"city"` value from within it. You can drill down as many levels as needed, like `weather["current"]["wind"]["speed_mph"]` which traverses three levels deep. This chaining syntax mirrors how you would access the data in the original JSON structure.

---

## How to Parse JSON Arrays

JSON arrays represent ordered lists of values and appear frequently in API responses when returning collections of items. Python converts JSON arrays into lists, which you can iterate through or access by index.

Here's an example parsing a list of products from an inventory system:

```py
import json

products_json = '''
[
    {
        "id": "PROD-001",
        "name": "Wireless Mouse",
        "price": 24.99,
        "in_stock": true
    },
    {
        "id": "PROD-002",
        "name": "Mechanical Keyboard",
        "price": 89.99,
        "in_stock": false
    },
    {
        "id": "PROD-003",
        "name": "USB-C Hub",
        "price": 34.99,
        "in_stock": true
    }
]
'''

products = json.loads(products_json)
```

The JSON string starts with a square bracket, indicating an array at the root level. After parsing, products is a Python list containing three dictionaries.

You can now use standard Python list operations on the parsed data. The `len()` function returns the number of items, and you can iterate through the list with a for loop. Each iteration gives you a dictionary representing one product, which you access using dictionary syntax.

```py
print(f"Total products: {len(products)}")

for product in products:
    status = "Available" if product["in_stock"] else "Out of stock"
    print(f"{product['name']}: ${product['price']} - {status}")
#
# Total products: 3
# Wireless Mouse: $24.99 - Available
# Mechanical Keyboard: $89.99 - Out of stock
# USB-C Hub: $34.99 - Available
```

You can also access specific array elements by index and filter the data. List indexing works exactly as it does with any Python list, starting at zero.

```py
first_product = products[0]
print(f"First product ID: {first_product['id']}")
#
# First product ID: PROD-001
```

You can also use list comprehensions to filter the parsed data, creating a new list containing only products where the "in_stock" value is `True`.

```py
available_products = [p for p in products if p["in_stock"]]
print(f"Available: {len(available_products)} products")
#
# Available: 2 products
```

---

## How to Read JSON from Files

Most applications read JSON from files rather than hardcoded strings. Configuration files, data exports, and cached API responses typically live in JSON files that your application needs to load at runtime.

The `json` module comes with the `load` function for reading files that handles opening and parsing in one step.

This code creates a sample configuration file to demonstrate file reading:

```py
import json

# First, let's create a sample config 
config_data = {
    "api_url": "https://api.example.com/v2",
    "timeout": 30,
    "retry_attempts": 3,
    "enable_logging": True
}

with open('config.json', 'w') as f:
    json.dump(config_data, f, indent=2)
```

The `json.dump()` function writes Python data to a file, and the `indent=2` parameter formats the JSON with 2-space indentation to make it human-readable. The `'w'` mode opens the file for writing, creating it if it doesn't exist or overwriting it if it does.

Now you can read that file back into your application. The `json.load()` function (without the `'s'`) reads from a file object and parses the JSON in one operation.

```py
with open('config.json', 'r') as f:
    config = json.load(f)

print(f"API URL: {config['api_url']}")
print(f"Timeout: {config['timeout']} seconds")
print(f"Logging: {'Enabled' if config['enable_logging'] else 'Disabled'}")
```

::: note Note the difference

`json.loads()` parses strings, while `json.load()` reads from files.

:::

The `with` statement ensures that the file closes properly even if an error occurs during reading. After the `with` block completes, you have a Python dictionary containing all the parsed configuration data.

```plaintext
API URL: https://api.example.com/v2
Timeout: 30 seconds
Logging: Enabled
```

---

## How to Handle JSON Parsing Errors

JSON parsing can fail for many reasons: malformed syntax, unexpected data types, corrupted files, or network issues when fetching from APIs. Your code must handle these errors gracefully rather than crashing.

The `json` module raises a `JSONDecodeError` when it runs into invalid JSON. Here's how to catch and handle these errors appropriately.

The `try-except` block catches any JSON parsing errors:

- The `JSONDecodeError` exception provides detailed information about what went wrong: `e.msg` describes the error, `e.lineno` indicates which line contains the problem, and `e.colno` shows the character position. This information helps you debug malformed JSON quickly.
- The function returns `None` when parsing fails, allowing calling code to check for this and handle the error appropriately.

Let's test this with a few JSON examples:

```py
# Missing closing quote
bad_json1 = '{"name": "Sarah, "age": 28}'
result1 = parse_json_safely(bad_json1)
print(f"Result 1: {result1}\n")

# Missing closing brace
bad_json2 = '{"name": "Sarah", "age": 28'
result2 = parse_json_safely(bad_json2)
print(f"Result 2: {result2}\n")

# Extra comma
bad_json3 = '{"name": "Sarah", "age": 28,}'
result3 = parse_json_safely(bad_json3)
print(f"Result 3: {result3}\n")

# Valid JSON for comparison
good_json = '{"name": "Sarah", "age": 28}'
result4 = parse_json_safely(good_json)
print(f"Result 4: {result4}")
```

Each malformed JSON string triggers a different error message indicating the specific syntax problem. The error messages help pinpoint exactly where the JSON is invalid. The final example shows that valid JSON parses successfully and returns a dictionary instead of `None`.

```plaintext title="output"
JSON parsing failed: Expecting ',' delimiter
Error at line 1, column 19
Result 1: None

JSON parsing failed: Expecting ',' delimiter
Error at line 1, column 28
Result 2: None

JSON parsing failed: Expecting property name enclosed in double quotes
Error at line 1, column 29
Result 3: None

Result 4: {'name': 'Sarah', 'age': 28}
```

When reading JSON files, you should also handle file-related errors. The following function `load_json_file_safely` handles three types of errors:

- `FileNotFoundError` when the file doesn't exist,
- `PermissionError` when the application can't read the file, and
- `JSONDecodeError` when the file contains invalid JSON. Each error type gets its own except block with an appropriate message.

The calling code checks if the result is `None` and falls back to default values, ensuring the application continues running even when the file can't be loaded.

```py
import json

def load_json_file_safely(filepath):
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File '{filepath}' not found")
        return None
    except PermissionError:
        print(f"Error: Permission denied reading '{filepath}'")
        return None
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON in '{filepath}'")
        print(f"  {e.msg} at line {e.lineno}")
        return None

data = load_json_file_safely('missing_file.json')
if data is None:
    print("Using default configuration")
    data = {"timeout": 30, "retries": 3}
```

If you run the above code, you’ll get the following output:

```plaintext title="output"
Error: File 'missing_file.json' not found
Using default configuration
```

And that’s a wrap! Thank you for making it this far if you’ve following along! 🥳

---

## Conclusion

The `json` module provides everything you need for working with JSON data in Python. Here’s a summary of what we covered:

- The core functions handle the most common operations: `json.loads()` parses JSON strings into Python objects, and `json.load()` reads and parses JSON from files.
- JSON parsing automatically converts between JSON and Python data types. This conversion lets you work with parsed JSON using standard Python syntax.
- You can navigate nested JSON by chaining dictionary keys and list indices together. Access nested values like `data['section']['subsection']['field']` by following the structure down through each level.
- Always wrap JSON parsing in `try-except` blocks when working with external data. The `JSONDecodeError` exception provides specific information about parsing failures including the error location, helping you debug issues quickly. When reading files, also catch `FileNotFoundError` and `PermissionError` to handle common file access problems gracefully.

Get comfortable with these fundamentals and you'll be able to handle most JSON parsing tasks you’ll need for your Python projects. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Parse JSON in Python – A Complete Guide With Examples",
  "desc": "JSON has become the standard format for data exchange on the web. So you'll run into JSON all the time when working with REST APIs, configuration files, database exports, and more. As a developer, you should know how to parse, manipulate, and generat...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-parse-json-in-python-with-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
