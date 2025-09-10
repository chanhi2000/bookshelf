---
lang: en-US
title: "Attribute Access"
description: "Article(s) > (5/10) How Python Magic Methods Work: A Practical Guide" 
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
      content: "Article(s) > (5/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Attribute Access"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-magic-methods-practical-guide/attribute-access.html
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
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-attribute-access"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

Attribute access methods let you control how your objects handle getting, setting, and deleting attributes. This is particularly useful for implementing properties, validation, and logging.

---

## getattr and getattribute

Python provides two methods for controlling attribute access:

1. `__getattr__`: Called only when an attribute lookup fails (that is, when the attribute doesn't exist)
2. `__getattribute__`: Called for every attribute access, even for attributes that exist

The key difference is that `__getattribute__` is called for all attribute access, while `__getattr__` is only called when the attribute isn't found through normal means.

Here's a simple example showing the difference:

```py :collapsed-lines
class AttributeDemo:
    def __init__(self):
        self.name = "Vivek"

    def __getattr__(self, name):
        print(f"__getattr__ called for {name}")
        return f"Default value for {name}"

    def __getattribute__(self, name):
        print(f"__getattribute__ called for {name}")
        return super().__getattribute__(name)

demo = AttributeDemo()
print(demo.name)      # Output: __getattribute__ called for name
                      #        Vivek
print(demo.age)       # Output: __getattribute__ called for age
                      #        __getattr__ called for age
                      #        Default value for age
```

---

## `__setattr__` and `__delattr__`

Similarly, you can control how attributes are set and deleted:

1. `__setattr__`: Called when an attribute is set
2. `__delattr__`: Called when an attribute is deleted

These methods let you implement validation, logging, or custom behavior when attributes are modified.

---

## Practical Example: Auto-Logging Properties

Let's create a class that automatically logs all property changes. This is useful for debugging, auditing, or tracking object state changes:

```py :collapsed-lines
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class LoggedObject:
    def __init__(self, **kwargs):
        self._data = {}
        # Initialize attributes without triggering __setattr__
        for key, value in kwargs.items():
            self._data[key] = value

    def __getattr__(self, name):
        if name in self._data:
            logging.debug(f"Accessing attribute {name}: {self._data[name]}")
            return self._data[name]
        raise AttributeError(f"'{self.__class__.__name__}' object has no attribute '{name}'")

    def __setattr__(self, name, value):
        if name == "_data":
            # Allow setting the _data attribute directly
            super().__setattr__(name, value)
        else:
            old_value = self._data.get(name, "<undefined>")
            self._data[name] = value
            logging.info(f"Changed {name}: {old_value} -> {value}")

    def __delattr__(self, name):
        if name in self._data:
            old_value = self._data[name]
            del self._data[name]
            logging.info(f"Deleted {name} (was: {old_value})")
        else:
            raise AttributeError(f"'{self.__class__.__name__}' object has no attribute '{name}'")
```

Let's break down how this class works:

1. **Storage**: The class uses a private `_data` dictionary to store attribute values.
2. **Attribute access**:
    - `__getattr__`: Returns values from `_data` and logs debug messages
    - `__setattr__`: Stores values in `_data` and logs changes
    - `__delattr__`: Removes values from `_data` and logs deletions
3. **Special handling**: The `_data` attribute itself is handled differently to avoid infinite recursion.

Here's how to use the class:

```py :collapsed-lines
# Create a logged object with initial values
user = LoggedObject(name="Vivek", email="hello@wewake.dev")

# Modify attributes
user.name = "Vivek"  # Logs: Changed name: Vivek -> Vivek
user.age = 30         # Logs: Changed age: <undefined> -> 30

# Access attributes
print(user.name)      # Output: Vivek

# Delete attributes
del user.email        # Logs: Deleted email (was: hello@wewake.dev)

# Try to access deleted attribute
try:
    print(user.email)
except AttributeError as e:
    print(f"AttributeError: {e}")  # Output: AttributeError: 'LoggedObject' object has no attribute 'email'
```

This implementation provides several benefits:

1. Automatic logging of all attribute changes
2. Debug-level logging for attribute access
3. Clear error messages for missing attributes
4. Easy tracking of object state changes
5. Useful for debugging and auditing
