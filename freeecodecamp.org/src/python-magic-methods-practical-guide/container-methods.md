---
lang: en-US
title: "Container Methods"
description: "Article(s) > (4/10) How Python Magic Methods Work: A Practical Guide" 
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
      content: "Article(s) > (4/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Container Methods"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-magic-methods-practical-guide/container-methods.html
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
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-container-methods"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

Container methods let you make your objects behave like built-in containers such as lists, dictionaries, or sets. This is particularly useful when you need custom behavior for storing and retrieving data.

---

## Sequence Protocol

To make your object behave like a sequence (like a list or tuple), you need to implement these methods:

| Method | Description | Example Usage |
| ---: | --- | --- |
| `__len__` | Returns the length of the container | `len(obj)` |
| `__getitem__` | Allows indexing with `obj[key]` | `obj[0]` |
| `__setitem__` | Allows assignment with `obj[key] = value` | `obj[0] = 42` |
| `__delitem__` | Allows deletion with `del obj[key]` | `del obj[0]` |
| `__iter__` | Returns an iterator for the container | `for item in obj:` |
| `__contains__` | Implements the `in` operator | `42 in obj` |

---

## Mapping Protocol

For dictionary-like behavior, you'll want to implement these methods:

| Method | Description | Example Usage |
| ---: | --- | --- |
| `__getitem__` | Get value by key | `obj["key"]` |
| `__setitem__` | Set value by key | `obj["key"] = value` |
| `__delitem__` | Delete key-value pair | `del obj["key"]` |
| `__len__` | Get number of key-value pairs | `len(obj)` |
| `__iter__` | Iterate over keys | `for key in obj:` |
| `__contains__` | Check if key exists | `"key" in obj` |

---

## Practical Example: Custom Cache

Let's implement a time-based cache that automatically expires old entries. This example shows how to create a custom container that behaves like a dictionary but with additional functionality:

```py :collapsed-lines
import time
from collections import OrderedDict

class ExpiringCache:
    def __init__(self, max_age_seconds=60):
        self.max_age = max_age_seconds
        self._cache = OrderedDict()  # {key: (value, timestamp)}

    def __getitem__(self, key):
        if key not in self._cache:
            raise KeyError(key)

        value, timestamp = self._cache[key]
        if time.time() - timestamp > self.max_age:
            del self._cache[key]
            raise KeyError(f"Key '{key}' has expired")

        return value

    def __setitem__(self, key, value):
        self._cache[key] = (value, time.time())
        self._cache.move_to_end(key)  # Move to end to maintain insertion order

    def __delitem__(self, key):
        del self._cache[key]

    def __len__(self):
        self._clean_expired()  # Clean expired items before reporting length
        return len(self._cache)

    def __iter__(self):
        self._clean_expired()  # Clean expired items before iteration
        for key in self._cache:
            yield key

    def __contains__(self, key):
        if key not in self._cache:
            return False

        _, timestamp = self._cache[key]
        if time.time() - timestamp > self.max_age:
            del self._cache[key]
            return False

        return True

    def _clean_expired(self):
        """Remove all expired entries from the cache."""
        now = time.time()
        expired_keys = [
            key for key, (_, timestamp) in self._cache.items()
            if now - timestamp > self.max_age
        ]
        for key in expired_keys:
            del self._cache[key]
```

Let's break down how this cache works:

1. **Storage**: The cache uses an `OrderedDict` to store key-value pairs along with timestamps.
2. **Expiration**: Each value is stored as a tuple of `(value, timestamp)`. When accessing a value, we check if it has expired.
3. **Container methods**: The class implements all necessary methods to behave like a dictionary:
    - `__getitem__`: Retrieves values and checks expiration
    - `__setitem__`: Stores values with current timestamp
    - `__delitem__`: Removes entries
    - `__len__`: Returns number of non-expired entries
    - `__iter__`: Iterates over non-expired keys
    - `__contains__`: Checks if a key exists

Here's how to use the cache:

```py :collapsed-lines
# Create a cache with 2-second expiration
cache = ExpiringCache(max_age_seconds=2)

# Store some values
cache["name"] = "Vivek"
cache["age"] = 30

# Access values
print("name" in cache)  # Output: True
print(cache["name"])    # Output: Vivek
print(len(cache))       # Output: 2

# Wait for expiration
print("Waiting for expiration...")
time.sleep(3)

# Check expired values
print("name" in cache)  # Output: False
try:
    print(cache["name"])
except KeyError as e:
    print(f"KeyError: {e}")  # Output: KeyError: 'name'

print(len(cache))  # Output: 0
```

This cache implementation provides several benefits:

1. Automatic expiration of old entries
2. Dictionary-like interface for easy use
3. Memory efficiency by removing expired entries
4. Thread-safe operations (assuming single-threaded access)
5. Maintains insertion order of entries
