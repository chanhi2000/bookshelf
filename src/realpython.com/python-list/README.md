---
lang: en-US
title: "Python's list Data Type: A Deep Dive With Examples"
description: "Article(s) > Python's list Data Type: A Deep Dive With Examples"
icon: fa-brands fa-python
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
      content: "Article(s) > Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Python's list Data Type: A Deep Dive With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/
prev: /programming/py/articles/README.md
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
  name="Python's list Data Type: A Deep Dive With Examples"
  desc="In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python."
  url="https://realpython.com/python-list"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

The `list` class is a fundamental **built-in data type** in Python. It has an impressive and useful set of features, allowing you to efficiently organize and manipulate heterogeneous data. Knowing how to use lists is a must-have skill for you as a Python developer. Lists have many use cases, so you’ll frequently reach for them in real-world coding.

By working through this tutorial, you’ll dive deep into lists and get a solid understanding of their key features. This knowledge will allow you to write more effective code by taking advantage of lists.

::: info In this tutorial, you’ll learn how to

- **Create** new lists in Python
- **Access** the items in an existing list
- **Copy**, **update**, **grow**, **shrink**, and **concatenate** existing lists
- **Sort**, **reverse**, and **traverse** existing lists
- Use other **features** of Python lists

:::

In addition, you’ll code some examples that showcase common use cases of lists in Python. They’ll help you understand how to better use lists in your code.

To get the most out of this tutorial, you should have a good understanding of core Python concepts, including [**variables**](/realpython.com/python-variables.md), [**functions**](/realpython.com/defining-your-own-python-function.md), and [**`for` loops**](/realpython.com/python-for-loop.md). You’ll also benefit from familiarity with other built-in [**data types**](/realpython.com/python-data-types.md), such as [**strings**](/realpython.com/python-strings.md), [**tuples**](/realpython.com/python-tuple.md), [**dictionaries**](/realpython.com/python-dicts.md), and [**sets**](/realpython.com/python-sets.md).

```component VPCard
{
  "title": "Getting Started With Python’s list Data Type",
  "desc": "(1/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/getting-started-with-pythons-list-data-type.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Constructing Lists in Python",
  "desc": "(2/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/constructing-lists-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Accessing Items in a List: Indexing",
  "desc": "(3/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/accessing-items-in-a-list-indexing.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Retrieving Multiple Items From a List: Slicing",
  "desc": "(4/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/retrieving-multiple-items-from-a-list-slicing.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Creating Copies of a List",
  "desc": "(5/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/creating-copies-of-a-list.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Updating Items in Lists: Index Assignments",
  "desc": "(7/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/updating-items-in-lists-index-assignments.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Growing and Shrinking Lists Dynamically",
  "desc": "(7/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/growing-and-shrinking-lists-dynamically.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Concatenating and Repeating Lists",
  "desc": "(8/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/concatenating-and-repeating-lists.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Reversing and Sorting Lists",
  "desc": "(9/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/reversing-and-sorting-lists.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Traversing Lists",
  "desc": "(10/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/traversing-lists.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Exploring Other Features of Lists",
  "desc": "(11/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/exploring-other-features-of-lists.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Common Gotchas of Python Lists",
  "desc": "(12/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/exploring-other-features-of-lists.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Subclassing the Built-In list Class",
  "desc": "(13/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/subclassing-the-built-in-list-class.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Putting Lists Into Action",
  "desc": "(14/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/putting-lists-into-action.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Deciding Whether to Use Lists",
  "desc": "(15/15) Python's list Data Type: A Deep Dive With Examples",
  "link": "/realpython.com/python-list/deciding-whether-to-use-lists.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

Now you have a deep, solid understanding of the core features and functionalities of Python **lists**. Lists are everywhere. They’re an important part of the language itself and are present in the [<VPIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html), third-party packages, and in just about every piece of Python code that you’ll find out there. So, learning about them is a fundamental skill that you must have under your belt.

::: info In this tutorial, you’ve learned how to:

- **Create** new lists in Python using different approaches
- **Access** one or more items in an existing list
- **Copy**, **update**, **grow**, **shrink**, and **concatenate** existing Python lists
- **Sort**, **reverse**, and **traverse** existing lists using built-in functions and methods
- Use some other **features** of lists

:::

With all this knowledge, you’re ready to write better, more effective code by taking advantage of Python lists. You’re also empowered to make informed decisions about when to use lists in your code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python's list Data Type: A Deep Dive With Examples",
  "desc": "In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-list.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
