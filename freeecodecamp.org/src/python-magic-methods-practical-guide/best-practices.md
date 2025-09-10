---
lang: en-US
title: "Best Practices"
description: "Article(s) > (10/10) How Python Magic Methods Work: A Practical Guide" 
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
      content: "Article(s) > (10/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-magic-methods-practical-guide/best-practices.html
next: /freecodecamp.org/python-magic-methods-practical-guide/README.md#wrapping-up
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
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-best-practices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

When using magic methods, follow these best practices to ensure your code is maintainable, efficient, and reliable.

---

## 1. Be Consistent

When implementing related magic methods, maintain consistency in behavior:

```py
from functools import total_ordering

@total_ordering
class ConsistentNumber:
    def __init__(self, value):
        self.value = value

    def __eq__(self, other):
        if not isinstance(other, ConsistentNumber):
            return NotImplemented
        return self.value == other.value

    def __lt__(self, other):
        if not isinstance(other, ConsistentNumber):
            return NotImplemented
        return self.value < other.value
```

---

## 2. Return NotImplemented

When an operation doesn't make sense, return `NotImplemented` to let Python try the reverse operation:

```py
class Money:
    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        # ... rest of the implementation
```

---

## 3. Keep It Simple

Magic methods should be simple and predictable. Avoid complex logic that could lead to unexpected behavior:

```py
# Good: Simple and predictable
class SimpleContainer:
    def __init__(self):
        self.items = []

    def __getitem__(self, index):
        return self.items[index]

# Bad: Complex and potentially confusing
class ComplexContainer:
    def __init__(self):
        self.items = []
        self.access_count = 0

    def __getitem__(self, index):
        self.access_count += 1
        if self.access_count > 100:
            raise RuntimeError("Too many accesses")
        return self.items[index]
```

---

## 4. Document Behavior

Clearly document how your magic methods behave, especially if they deviate from standard expectations:

```py
class CustomDict(dict):
    def __missing__(self, key):
        """
        Called when a key is not found in the dictionary.
        Creates a new list for the key and returns it.
        This allows for automatic list creation when accessing
        non-existent keys.
        """
        self[key] = []
        return self[key]
```

---

## 5. Consider Performance

Be aware of the performance implications, especially for frequently called methods:

```py
class OptimizedContainer:
    __slots__ = ['items']  # Use __slots__ for better performance

    def __init__(self):
        self.items = []

    def __getitem__(self, index):
        return self.items[index]  # Direct access is faster
```

---

## 6. Handle Edge Cases

Always consider edge cases and handle them appropriately:

```py
class SafeContainer:
    def __getitem__(self, key):
        if not isinstance(key, (int, slice)):
            raise TypeError("Index must be integer or slice")
        if key < 0:
            raise ValueError("Index cannot be negative")
        # ... rest of the implementation
```
