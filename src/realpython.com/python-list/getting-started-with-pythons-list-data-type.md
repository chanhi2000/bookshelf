---
lang: en-US
title: "Getting Started With Python’s list Data Type"
description: "Article(s) > (1/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (1/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Getting Started With Python’s list Data Type"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/getting-started-with-pythons-list-data-type.html
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
  url="https://realpython.com/python-list#getting-started-with-pythons-list-data-type"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Python’s [<FontIcon icon="fa-brands fa-python"/>`list`](https://docs.python.org/3/library/stdtypes.html#list) is a flexible, versatile, powerful, and popular built-in [**data type**](/realpython.com/python-data-types.md). It allows you to create variable-length and mutable [<FontIcon icon="fa-brands fa-python"/>sequences](https://docs.python.org/3/glossary.html#term-sequence) of objects. In a [<FontIcon icon="fa-brands fa-python"/>list](https://docs.python.org/3/glossary.html#term-list), you can store objects of any type. You can also mix objects of different types within the same list, although list elements often share the same type.

::: note

Throughout this tutorial, you’ll use the terms **items**, **elements**, and **values** interchangeably to refer to the objects stored in a list.

:::

Some of the more relevant characteristics of [**`list`**](/realpython.com/python-lists-tuples.md#python-lists) objects include being:

- **Ordered**: They contain elements or items that are sequentially arranged according to their specific insertion order.
- **Zero-based**: They allow you to access their elements by indices that start from zero.
- **Mutable**: They support in-place mutations or changes to their contained elements.
- **Heterogeneous**: They can store objects of different types.
- **Growable and dynamic**: They can grow or shrink dynamically, which means that they support the addition, insertion, and removal of elements.
- **Nestable**: They can contain other lists, so you can have lists of lists.
- **Iterable**: They support iteration, so you can traverse them using a loop or comprehension while you perform operations on each of their elements.
- **Sliceable**: They support slicing operations, meaning that you can extract a series of elements from them.
- **Combinable**: They support concatenation operations, so you can combine two or more lists using the concatenation operators.
- **Copyable**: They allow you to make copies of their content using various techniques.

Lists are sequences of objects. They’re commonly called **containers** or **collections** because a single list can contain or collect an arbitrary number of other objects.

::: note

In Python, lists support a rich set of operations that are common to all sequence types, including [**tuples**](/realpython.com/python-lists-tuples.md#python-tuples), strings, and [**ranges**](/realpython.com/python-range.md). These operations are known as [<FontIcon icon="fa-brands fa-python"/>common sequence operations](https://docs.python.org/3/library/stdtypes.html#common-sequence-operations). Throughout this tutorial, you’ll learn about several operations that fall into this category.

:::

In Python, lists are ordered, which means that they keep their elements in the order of insertion:

```py
colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
]

colors
# 
# ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
```

The items in this list are strings representing colors. If you access the list object, then you’ll see that the colors keep the same order in which you inserted them into the list. This order remains unchanged during the list’s lifetime unless you perform some mutations on it.

You can access an individual object in a list by its position or index in the sequence. Indices start from zero:

```py
colors[0]
# 
# 'red'
colors[1]
# 
# 'orange'
colors[2]
# 
# 'yellow'
colors[3]
# 
# 'green'
```

Positions are numbered from zero to the length of the list minus one. The element at index `0` is the first element in the list, the element at index `1` is the second, and so on.

Lists can contain objects of different types. That’s why lists are heterogeneous collections:

```plaintext title="output"
[42, "apple", True, {"name": "John Doe"}, (1, 2, 3), [3.14, 2.78]]
```

This list contains objects of different data types, including an integer [**number**](/realpython.com/python-numbers.md), string, [**Boolean**](/realpython.com/python-boolean.md) value, [**dictionary**](/realpython.com/python-dicts.md), tuple, and another list. Even though this feature of lists may seem cool, in practice you’ll find that lists typically store homogeneous data.

::: note

One of the most relevant characteristics of lists is that they’re [**mutable**](/realpython.com/python-mutable-vs-immutable-types.md#lists) data types. This feature deeply impacts their behavior and use cases. For example, mutability implies that lists aren’t [**hashable**](/realpython.com/python-hash-table.md), so you can’t use them as dictionary [**keys**](/realpython.com/python-dicts.md#dictionary-keys-vs-list-indices). You’ll learn a lot about how mutability affects lists throughout this tutorial. So, keep reading!

:::

Okay! That’s enough for a first glance at Python lists. In the rest of this tutorial, you’ll dive deeper into all the above characteristics of lists and more. Are you ready? To kick things off, you’ll start by learning the different ways to create lists.
