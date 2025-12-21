---
lang: en-US
title: "Deciding Whether to Use Lists"
description: "Article(s) > (15/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (15/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Deciding Whether to Use Lists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/deciding-whether-to-use-lists.html
next: /realpython.com/python-list/README.md#conclusion
date: 2023-07-19
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python's list Data Type: A Deep Dive With Examples",
  "desc": "In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python.",
  "link": "/realpython.com/python-list/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python's list Data Type: A Deep Dive With Examples"
  desc="In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python."
  url="https://realpython.com/python-list#deciding-whether-to-use-lists"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

As you’ve learned throughout this tutorial, lists are powerful, flexible, versatile, and full-featured data structures. Because of their characteristics, people tend to use and abuse them. Yes, they’re suitable for many use cases, but sometimes they aren’t the best available option.

In general, you should use lists when you need to:

- **Keep your data ordered**: Lists maintain the order of insertion of their items.
- **Store a sequence of values**: Lists are a great choice when you need to store a sequence of related values.
- **Mutate your data**: Lists are mutable data types that support multiple mutations.
- **Access random values by index**: Lists allow quick and easy access to elements based on their index.

In contrast, avoid using lists when you need to:

- **Store immutable data**: In this case, you should use a tuple. They’re immutable and more memory efficient.
- **Represent database records:** In this case, consider using a tuple or a [**data class**](/realpython.com/python-data-classes.md).
- **Store unique and unordered values**: In this scenario, consider using a set or dictionary. Sets don’t allow duplicated values, and dictionaries can’t hold duplicated keys.
- **Run many membership tests where item doesn’t matter**: In this case, consider using a `set`. Sets are optimized for this type of operation.
- **Run advanced array and matrix operations**: In these situations, consider using [**NumPy’s**](/realpython.com/numpy-array-programming.md) specialized data structures.
- **Manipulate your data as a stack or queue**: In those cases, consider using [**`deque`**](/realpython.com/python-deque.md) from the [**`collections`**](/realpython.com/python-collections-module.md) module or [**`Queue`**](/realpython.com/queue-in-python.md#asyncioqueue), [**`LifoQueue`**](/realpython.com/queue-in-python.md#asynciolifoqueue), or [**`PriorityQueue`**](//realpython.com/queue-in-python.md#asynciopriorityqueue). These data types are thread-safe and optimized for fast inserting and removing on both ends.

Depending on your specific scenario, lists may or may not be the right tool for the job. Therefore, you must carefully evaluate your needs and consider advanced data structures like the ones listed above.
