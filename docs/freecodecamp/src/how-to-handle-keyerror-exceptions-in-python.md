---
lang: en-US
title: "How to Handle KeyErrors in Python – with Code Examples"
description: "Article(s) > How to Handle KeyErrors in Python – with Code Examples"
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
      content: "Article(s) > How to Handle KeyErrors in Python – with Code Examples"
    - property: og:description
      content: "How to Handle KeyErrors in Python – with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-keyerror-exceptions-in-python.html
prev: /programming/py/articles/README.md
date: 2024-06-18
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://freecodecamp.org/news/content/images/2024/06/fimg-key-errors.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Handle KeyErrors in Python – with Code Examples"
  desc="When working with dictionaries in Python, you’d often run into KeyError exceptions. Dictionaries are built-in data structures of key value pairs. So you can look up a value—in constant time—using the corresponding key like so: dict[key] returns value..."
  url="https://freecodecamp.org/news/how-to-handle-keyerror-exceptions-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/fimg-key-errors.png"/>

When working with dictionaries in Python, you’d often run into `KeyError` exceptions.

Dictionaries are built-in data structures of key value pairs. So you can look up a value—in constant time—using the corresponding key like so: `dict[key]` returns `value`. But what if the key doesn't exist in the dictionary? Well, that’s when you get a `KeyError` in Python.

There are few different ways you can handle such `KeyError` exceptions. You can handle them explicitly or use certain dictionary methods to set default values for missing keys. And in this tutorial, we’ll look at the following methods by coding a simple example:

- Using `try-except` blocks
- Using the dictionary method `get()`
- Using `defaultdict` from the `collections` module

Let's get started.

---

## 1. How to Handle KeyError Exceptions with `try-except` Blocks

Let's start by reviewing when KeyErrors occur and how we can handle these exceptions using `try-except` blocks.

### When Does a KeyError Occur?

In Python, a `KeyError` exception occurs when you try to access the value corresponding to a key that doesn't exist. Consider the following `books` dictionary:

```py
books = {
    "1984": "George Orwell",
    "To Kill a Mockingbird": "Harper Lee",
    "The Great Gatsby": "F. Scott Fitzgerald"
}
```

In the `books` dictionary, the keys are titles of the books and the values are the names of the authors. So you can look up the author of a book using the title as the key.

Now let's try to look up the author of a book that doesn't exist in the dictionary:

```py
print(books["Brave New World"])
```

You’ll run into the following `KeyError` exception:

```plaintext
Traceback (most recent call last):
  File "/home/balapriya/keyerror/main.py", line 7, in <module>
    print(books["Brave New World"])
          ~~~~~^^^^^^^^^^^^^^^^^^^
KeyError: 'Brave New World'
```

### How to Handle KeyError Exceptions

You can explicitly handle such `KeyError` exceptions using `try-except` blocks like so:

```py
try:
    value = dictionary[key]
except KeyError:
    value = default_value
```

::: info Here:

- We wrap the block of code that might raise an exception within the try block. In this case, we attempt to access the value associated with the key.
- If a `KeyError` is raised, we handle it in the `except` block by assigning a default value.

:::

For the `books` dictionary example, we have:

```py
books = {
    "1984": "George Orwell",
    "To Kill a Mockingbird": "Harper Lee",
    "The Great Gatsby": "F. Scott Fitzgerald"
}

try:
    # Try to access the key "Brave New World"
    author = books["Brave New World"]  
    # Catch the KeyError if the key does not exist
except KeyError:  
    author = "Book not found"  

print(author)
```

We try to look up the author of “Brave New World'' again. But this time the `KeyError` triggers the except block, and we get “Book not found”.

```py
Output >>> Book not found
```

---

## 2. How to Handle KeyErrors Using the `get()` Dictionary Method

Another way to handle missing keys without raising an exception is using the `get()` dictionary method.

You can use the `get()` method on any valid dictionary object. The `get()` method returns the value for a given key if it exists – otherwise, it returns a specified default value. You can use it like so:

```py
value = dictionary.get(key, default_value)
```

In essence, the `get()` method tries to *get* the value for the specified key:

- If the key exists, it returns the corresponding value.
- If the key does not exist, it returns the `default_value`.

Let's now use the `get()` method on the books dictionary. We pass in "Book not found" as the default value in the method call.

```py
books = {
    "1984": "George Orwell",
    "To Kill a Mockingbird": "Harper Lee",
    "The Great Gatsby": "F. Scott Fitzgerald"
}

# Try to get the value for "Brave New World"
author = books.get("Brave New World", "Book not found")  
print(author)
```

As expected, you should get the following output:

```py
Output >>> Book not found
```

::: note

The `get()` method does not modify the original dictionary. If you also want to add the missing key with a default value, you can use the `setdefault()` method instead with the syntax `dictionary.setdefault(key,default_value)`.

:::

---

## 3. How to Use `defaultdict` from the `collections` Module

A (much) cleaner way to handle KeyErrors is using `defaultdict` from Python’s `collections` module. Defaultdict extends the capabilities of Python's built-in dictionary by allowing you to provide a default value for keys that haven't been explicitly set.

The `defaultdict` constructor takes a default factory function as an argument. This factory function is called *without* arguments to provide a default value for a non-existent key.

The syntax for creating a `defaultdict` is as follows:

```py
from collections import defaultdict

# Syntax
defaultdict(default_factory)
```

Let's create a `defaultdict` from the `books` dictionary as shown:

```py
from collections import defaultdict

books = {
    "1984": "George Orwell",
    "To Kill a Mockingbird": "Harper Lee",
    "The Great Gatsby": "F. Scott Fitzgerald"
}

books_default = defaultdict(lambda: "Book not found",books)  
# Access the key "Brave New World"
author = books_default["Brave New World"]  
print(author)
```

For the default factory function, we use a simple lambda function that returns the string "Book not found". This function is called whenever you try to access a key that's not present in the dictionary.

Running the above snippet should also give you:

```plaintext
Output >>> Book not found
```

Using `defaultdict` can be especially helpful when you need to dynamically access many keys.

---

## Conclusion

And that's a wrap! I hope you learned how to handle KeyError exceptions in Python. Let's review what we learned:

- To explicitly handle a `KeyError`, you can wrap the dictionary access code with a `try` block, and catch the `KeyError` in the `except` block.
- Use the `get()` method to access the value of a key, with the option to return a default value if the key does not exist.
- You can initialize a `defaultdict` from the `collections` module with a factory function that returns the default value.

If you'd like to learn about exception handling in Python, read [**Python Try and Except Statements - How to Handle Exceptions in Python**](/freecodecamp.org/python-try-and-except-statements-how-to-handle-exceptions-in-python.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle KeyErrors in Python – with Code Examples",
  "desc": "When working with dictionaries in Python, you’d often run into KeyError exceptions. Dictionaries are built-in data structures of key value pairs. So you can look up a value—in constant time—using the corresponding key like so: dict[key] returns value...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-keyerror-exceptions-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
