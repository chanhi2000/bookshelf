---
lang: en-US
title: "Writing JSON With Python"
description: "Article(s) > (2/4) Working With JSON Data in Python"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/4) Working With JSON Data in Python"
    - property: og:description
      content: "Writing JSON With Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-json/writing-json-with-python.html
date: 2024-12-22
isOriginal: false
author:
  - name: Philipp Acsany
    url : https://realpython.com/team/pacsany/
cover: https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Working With JSON Data in Python",
  "desc": "In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data.",
  "link": "/realpython.com/python-json/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Working With JSON Data in Python"
  desc="In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data."
  url="https://realpython.com/python-json#writing-json-with-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

Python supports the JSON format through the built-in module named [<FontIcon icon="fa-brands fa-python"/>`json`](https://docs.python.org/3/library/json.html). The `json` module is specifically designed for reading and writing strings formatted as JSON. That means you can conveniently convert Python data types into JSON data and the other way around.

The act of converting data into the JSON format is referred to as **serialization**. This process involves transforming data into a series of bytes for storage or transmission over a network. The opposite process, **deserialization**, involves decoding data from the JSON format back into a usable form within Python.

You’ll start with the serialization of Python code into JSON data with the help of the `json` module.

---

## Convert Python Dictionaries to JSON

One of the most common actions when working with JSON in Python is to convert a Python dictionary into a JSON object. To get an impression of how this works, hop over to your [**Python REPL**](/realpython.com/python-repl/README.md) and follow along with the code below:

```py
import json
food_ratings = {"organic dog food": 2, "human food": 10}
json.dumps(food_ratings)
#
# '{"organic dog food": 2, "human food": 10}'
```

After importing the `json` module, you can use [<FontIcon icon="fa-brands fa-python"/>`.dumps()`](https://docs.python.org/3/library/json.html#json.dumps) to convert a Python dictionary to a **JSON-formatted string**, which represents a JSON object.

It’s important to understand that when you use `.dumps()`, you get a Python string in return. In other words, you don’t create any kind of JSON data type. The result is similar to what you’d get if you used Python’s built-in [**`str()` function**](/realpython.com/python-strings.md):

```py
str(food_ratings)
# 
# "{'organic dog food': 2, 'human food': 10}"
```

Using `json.dumps()` gets more interesting when your Python dictionary doesn’t contain strings as keys or when values don’t directly translate to a JSON format:

```py
numbers_present = {1: True, 2: True, 3: False}
json.dumps(numbers_present)
# 
# '{"1": true, "2": true, "3": false}'
```

In the `numbers_present` dictionary, the keys `1`, `2`, and `3` are [**numbers**](/realpython.com/python-numbers.md). Once you use `.dumps()`, the dictionary keys become strings in the JSON-formatted string.

**Note:** When you convert a dictionary to JSON, the dictionary keys will always be strings in JSON.

The Boolean Python values of your dictionary become **JSON Booleans**. As mentioned before, the tiny but significant difference between JSON Booleans and Python Booleans is that JSON Booleans are lowercase.

The cool thing about Python’s `json` module is that it takes care of the conversion for you. This can come in handy when you’re using variables as dictionary keys:

```py
dog_id = 1
dog_name = "Frieda"
dog_registry = {dog_id: {"name": dog_name}}
json.dumps(dog_registry)
# 
# '{"1": {"name": "Frieda"}}'
```

When converting Python data types into JSON, the `json` module receives the evaluated values. While doing so, `json` sticks tightly to the JSON standard. For example, when converting integer keys like `1` to the string `"1"`.

---

## Serialize Other Python Data Types to JSON

The `json` module allows you to convert common [**Python data types**](/realpython.com/python-data-types.md) to JSON. Here’s an overview of all Python data types and values that you can convert to JSON values:

| Python | JSON |
| --- | --- |
| `dict` | `object` |
| `list` | `array` |
| `tuple` | `array` |
| `str` | `string` |
| `int` | `number` |
| `float` | `number` |
| `True` | `true` |
| `False` | `false` |
| `None` | `null` |

Note that different Python data types like lists and tuples serialize to the same JSON `array` data type. This can cause problems when you convert JSON data back to Python, as the data type may not be the same as before. You’ll explore this pitfall later in this tutorial when you learn how to [read JSON](/realpython.com/python-json/reading-json-with-python.md).

Dictionaries are probably the most common Python data type that you’ll use as a top-level value in JSON. But you can convert the data types listed above just as smoothly as dictionaries using `json.dumps()`. Take a Boolean or a list, for example:

```py
>>> json.dumps(True)
'true'

>>> json.dumps(["eating", "sleeping", "barking"])
'["eating", "sleeping", "barking"]'
```

A JSON document may contain a single scalar value, like a number, at the top level. That’s still valid JSON. But more often than not, you want to work with a collection of key-value pairs. Similar to how not every data type can be used as a dictionary key in Python, not all keys can be converted into JSON key strings:

| Python Data Type | Allowed as JSON Key |
| --- | --- |
| `dict` | ❌ |
| `list` | ❌ |
| `tuple` | ❌ |
| `str` | ✅ |
| `int` | ✅ |
| `float` | ✅ |
| `bool` | ✅ |
| `None` | ✅ |

You can’t use dictionaries, lists, or tuples as JSON keys. For dictionaries and lists, this rule makes sense as they’re not [**hashable**](/realpython.com/python-hash-table.md#hashability-vs-immutability). But even when a tuple is hashable and allowed as a key in a dictionary, you’ll get a [**`TypeError`**](/realpython.com/python-built-in-exceptions.md#typeerror) when you try to use a tuple as a JSON key:

```py
available_nums = {(1, 2): True, 3: False}
json.dumps(available_nums)
# 
# Traceback (most recent call last):
#  ...
# TypeError: keys must be str, int, float, bool or None, not tuple
```

By providing the `skipkeys` argument, you can prevent getting a `TypeError` when creating JSON data with unsupported Python keys:

```py
json.dumps(available_nums, skipkeys=True)
# 
# '{"3": false}'
```

When you set `skipkeys` in `json.dumps()` to `True`, then Python skips the keys that are not supported and would otherwise raise a `TypeError`. The result is a JSON-formatted string that only contains a subset of the input dictionary. In practice, you usually want your JSON data to resemble the input object as close as possible. So, you must use `skipkeys` with caution to not lose information when calling `json.dumps()`.

::: note

If you’re ever in a situation where you need to convert an unsupported object into JSON, then you can consider creating a [**subclass**](/realpython.com/python-classes.md#class-hierarchies) of the `JSONEncoder` and implementing a [<FontIcon icon="fa-brands fa-python"/>`.default()`](https://docs.python.org/3/library/json.html#json.JSONEncoder.default) method.

:::

When you use `json.dumps()`, you can use [<FontIcon icon="fas fa-globe"/>additional arguments](https://docs.python.org/3/library/json.html#json.dumps) to control the look of the resulting JSON-formatted string. For example, you can sort the dictionary keys by setting the `sort_keys` parameter to `True`:

```py
toy_conditions = {"chew bone": 7, "ball": 3, "sock": -1}
json.dumps(toy_conditions, sort_keys=True)
# 
# '{"ball": 3, "chew bone": 7, "sock": -1}'
```

When you set `sort_keys` to `True`, then Python sorts the keys alphabetically for you when serializing a dictionary. Sorting the keys of a JSON object can come in handy when your dictionary keys formerly represented the column names of a database, and you want to display them in an organized fashion to the user.

Another notable parameter of `json.dumps()` is `indent`, which you’ll probably use the most when serializing JSON data. You’ll explore `indent` later in this tutorial in the [**prettify JSON**](/realpython.com/python-json/interacting-with-json.md#prettify-json-with-python) section.

When you convert Python data types into the JSON format, you usually have a goal in mind. Most commonly, you’ll use JSON to persist and exchange data. To do so, you need to save your JSON data outside of your running Python program. Conveniently, you’ll explore saving JSON data to a file next.

---

## Write a JSON File With Python

The JSON format can come in handy when you want to save data outside of your Python program. Instead of spinning up a database, you may decide to use a JSON file to store data for your workflows. Again, Python has got you covered.

To write Python data into an external JSON file, you use `json.dump()`. This is a similar function to the one you saw earlier, but without the *s* at the end of its name:

```py title="hello_frieda.py"
import json

dog_data = {
  "name": "Frieda",
  "is_dog": True,
  "hobbies": ["eating", "sleeping", "barking",],
  "age": 8,
  "address": {
    "work": None,
    "home": ("Berlin", "Germany",),
  },
  "friends": [
    {
      "name": "Philipp",
      "hobbies": ["eating", "sleeping", "reading",],
    }, {
      "name": "Mitch",
      "hobbies": ["running", "snacking",],
    },
  ],
}

with open("hello_frieda.json", mode="w", encoding="utf-8") as write_file:
    json.dump(dog_data, write_file)
```

In lines 3 to 22, you define a `dog_data` dictionary that you write to a JSON file in line 25 using a [**context manager**](/realpython.com/python-with-statement.md). To properly indicate that the file contains JSON data, you set the file extension to `.json`.

When you use [**`open()`**](/realpython.com/python-built-in-functions.md#opening-files-open), then it’s good practice to define the encoding. For JSON, you commonly want to use `"utf-8"` as the encoding when reading and writing files:

::: info Source (<code>docs.python.org</code>)

<SiteInfo
  name="json — JSON encoder and decoder"
  desc="Source code: Lib/json/__init__.py JSON (JavaScript Object Notation), specified by RFC 7159(which obsoletes RFC 4627) and by ECMA-404, is a lightweight data interchange format inspired by JavaScript..."
  url="https://docs.python.org/3/library/json.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

> The RFC requires that JSON be represented using either UTF-8, UTF-16, or UTF-32, with UTF-8 being the recommended default for maximum interoperability.

:::

The `json.dump()` function has two required arguments:

1. The object you want to write
2. The file you want to write into

Other than that, there are a bunch of [<FontIcon icon="fa-brands fa-python"/>optional parameters for `json.dump()`](https://docs.python.org/3/library/json.html#json.dump). The optional parameters of `json.dump()` are the same as for `json.dumps()`. You’ll investigate some of them later in this tutorial when you prettify and minify JSON files.
