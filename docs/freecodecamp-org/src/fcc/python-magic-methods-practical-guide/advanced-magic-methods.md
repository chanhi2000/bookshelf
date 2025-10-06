---
lang: en-US
title: "Advanced Magic Methods"
description: "Article(s) > (8/10) How Python Magic Methods Work: A Practical Guide"
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
      content: "Article(s) > (8/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Advanced Magic Methods"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/python-magic-methods-practical-guide/advanced-magic-methods.html
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
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-advanced-magic-methods"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

Now let's explore some of Python's more advanced magic methods. These methods give you fine-grained control over object creation, memory usage, and dictionary behavior.

---

## `__new__` for Object Creation

The `__new__` method is called before `__init__` and is responsible for creating and returning a new instance of the class. This is useful for implementing patterns like singletons or immutable objects.

Here's an example of a singleton pattern using `__new__`:

```py :collapsed-lines
class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self, name=None):
        # This will be called every time Singleton() is called
        if name is not None:
            self.name = name

# Usage
s1 = Singleton("Vivek")
s2 = Singleton("Wewake")
print(s1 is s2)  # Output: True
print(s1.name)   # Output: Wewake (the second initialization overwrote the first)
```

Let's break down how this singleton works:

1. **Class variable**: `_instance` stores the single instance of the class
2. **new** method:
    - Checks if an instance exists
    - Creates one if it doesn't
    - Returns the existing instance if it does
3. **init** method:
    - Called every time the constructor is used
    - Updates the instance's attributes

---

## `__slots__` for Memory Optimization

The `__slots__` class variable restricts which attributes an instance can have, saving memory. This is particularly useful when you have many instances of a class with a fixed set of attributes.

Here's a comparison of regular and slotted classes:

```py :collapsed-lines
import sys

class RegularPerson:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

class SlottedPerson:
    __slots__ = ['name', 'age', 'email']

    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

# Compare memory usage
regular_people = [RegularPerson("Vivek" + str(i), 30, "hello@wewake.dev") for i in range(1000)]
slotted_people = [SlottedPerson("Vivek" + str(i), 30, "hello@wewake.dev") for i in range(1000)]

print(f"Regular person size: {sys.getsizeof(regular_people[0])} bytes")  # Output: Regular person size: 48 bytes
print(f"Slotted person size: {sys.getsizeof(slotted_people[0])} bytes")  # Output: Slotted person size: 56 bytes
print(f"Memory saved per instance: {sys.getsizeof(regular_people[0]) - sys.getsizeof(slotted_people[0])} bytes")  # Output: Memory saved per instance: -8 bytes
print(f"Total memory saved for 1000 instances: {(sys.getsizeof(regular_people[0]) - sys.getsizeof(slotted_people[0])) * 1000 / 1024:.2f} KB")  # Output: Total memory saved for 1000 instances: -7.81 KB
```

Running this code produces an interesting result:

```plaintext
Regular person size: 48 bytes
Slotted person size: 56 bytes
Memory saved per instance: -8 bytes
Total memory saved for 1000 instances: -7.81 KB
```

Surprisingly, in this simple example, the slotted instance is actually 8 bytes larger than the regular instance! This seems to contradict the common advice about `__slots__` saving memory.

So what's going on here? The real memory savings from `__slots__` come from:

1. Eliminating dictionaries: Regular Python objects store their attributes in a dictionary (`__dict__`), which has overhead. The `sys.getsizeof()` function doesn't account for this dictionary's size.
2. Storing attributes: For small objects with few attributes, the overhead of the slot descriptors can outweigh the dictionary savings.
3. Scalability: The real benefit appears when:
    - You have many instances (thousands or millions)
    - Your objects have many attributes
    - You're adding attributes dynamically

Let's see a more complete comparison:

```py :collapsed-lines
# A more accurate memory measurement
import sys

def get_size(obj):
    """Get a better estimate of the object's size in bytes."""
    size = sys.getsizeof(obj)
    if hasattr(obj, '__dict__'):
        size += sys.getsizeof(obj.__dict__)
        # Add the size of the dict contents
        size += sum(sys.getsizeof(v) for v in obj.__dict__.values())
    return size

class RegularPerson:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

class SlottedPerson:
    __slots__ = ['name', 'age', 'email']

    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

regular = RegularPerson("Vivek", 30, "hello@wewake.dev")
slotted = SlottedPerson("Vivek", 30, "hello@wewake.dev")

print(f"Complete Regular person size: {get_size(regular)} bytes")  # Output: Complete Regular person size: 610 bytes
print(f"Complete Slotted person size: {get_size(slotted)} bytes")  # Output: Complete Slotted person size: 56 bytes
```

With this more accurate measurement, you'll see that slotted objects typically use less total memory, especially as you add more attributes.

Key points about `__slots__`:

1. **Real memory benefits**: The primary memory savings come from eliminating the instance `__dict__`
2. **Dynamic restrictions**: You can't add arbitrary attributes to slotted objects
3. **Inheritance considerations**: Using `__slots__` with inheritance requires careful planning
4. **Use cases**: Best for classes with many instances and fixed attributes
5. **Performance bonus**: Can also provide faster attribute access in some cases

---

## `__missing__` for Default Dictionary Values

The `__missing__` method is called by dictionary subclasses when a key is not found. This is useful for implementing dictionaries with default values or automatic key creation.

Here's an example of a dictionary that automatically creates empty lists for missing keys:

```py :collapsed-lines
class AutoKeyDict(dict):
    def __missing__(self, key):
        self[key] = []
        return self[key]

# Usage
groups = AutoKeyDict()
groups["team1"].append("Vivek")
groups["team1"].append("Wewake")
groups["team2"].append("Vibha")

print(groups)  # Output: {'team1': ['Vivek', 'Wewake'], 'team2': ['Vibha']}
```

This implementation provides several benefits:

1. No need to check if a key exists, which is more convenient.
2. Automatic initialization creates default values as needed.
3. Reduces boilerplate for dictionary initialization.
4. It’s more flexible, and can implement any default value logic.
5. Only creates values when needed, making it more memory efficient.
