---
lang: en-US
title: "Accessing Items in a List: Indexing"
description: "Article(s) > (3/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (3/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Accessing Items in a List: Indexing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/accessing-items-in-a-list-indexing.html
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
  url="https://realpython.com/python-list#accessing-items-in-a-list-indexing"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

You can access individual items from a list using the item’s associated **index**. What’s an item’s index? Each item in a list has an index that specifies its position in the list. Indices are integer numbers that start at `0` and go up to the number of items in the list minus `1`.

To access a list item through its index, you use the following syntax:

```py
list_object[index]
```

This construct is known as an **indexing** operation, and the `[index]` part is known as the **indexing operator**. It consists of a pair of square brackets enclosing the desired or target index. You can read this construct as *from `list_object` give me the item at `index`*.

Here’s how this syntax works in practice:

```py
languages = ["Python", "Java", "JavaScript", "C++", "Go", "Rust"]
languages[0]
# 
# 'Python'
languages[1]
# 
# 'Java'
languages[2]
# 
# 'JavaScript'
languages[3]
# 
# 'C++'
languages[4]
# 
# 'Go'
languages[5]
# 
# 'Rust'
```

Indexing your list with different indices gives you direct access to the underlying items. If you use the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Big O notation](https://en.wikipedia.org/wiki/Big_O_notation) for [<VPIcon icon="fa-brands fa-wikipedia-w"/>time complexity](https://wiki.python.org/moin/TimeComplexity), then you can say that indexing is an $O\left(1\right)$ operation. This means that lists are quite good for those situations where you need to access random items from a series of items.

Here’s a more visual representation of how indices map to items in a list:

| `"Python"` | `"Java"` | `"JavaScript"` | `"C++"` | `"Go"` | `"Rust"` |
| --- | --- | --- | --- | --- | --- |
| `0` | `1` | `2` | `3` | `4` | `5` |

In any Python list, the index of the first item is `0`, the index of the second item is `1`, and so on. The index of the last item is the number of items minus `1`.

The number of items in a list is known as the list’s **length**. You can check the length of a list by using the built-in [**`len()`**](/realpython.com/len-python-function.md) function:

```py
len(languages)
# 
# 6
```

So, the index of the last item in `languages` is `6 - 1 = 5`. That’s the index of the `"Rust"` item in your sample list. If you use an index greater than this number in an indexing operation, then you get an [**`IndexError`**](/realpython.com/python-traceback.md#indexerror) exception:

```py
languages[6]
# 
# Traceback (most recent call last):
#  ...
# IndexError: list index out of range
```

In this example, you try to retrieve the item at index `6`. Because this index is greater than `5`, you get an `IndexError` as a result. Using out-of-range indices can be an incredibly common issue when you work with lists, so keep an eye on your target indices.

Indexing operations are quite flexible in Python. For example, you can also use [<VPIcon icon="fa-brands fa-python"/>negative indices](https://docs.python.org/3/faq/programming.html#what-s-a-negative-index) while indexing lists. This kind of index gives you access to the list items in backward order:

```py
languages[-1]
# 
# 'Rust'
languages[-2]
# 
# 'Go'
languages[-3]
# 
# 'C++'
languages[-4]
# 
# 'JavaScript'
languages[-5]
# 
# 'Java'
languages[-6]
# 
# 'Python'
```

A negative index specifies an element’s position relative to the right end of the list, moving back to the beginning of the list. Here’s a representation of the process:

| `"Python"` | `"Java"` | `"JavaScript"` | `"C++"` | `"Go"` | `"Rust"` |
| --- | --- | --- | --- | --- | --- |
| `-6` | `-5` | `-4` | `-3` | `-2` | `-1` |

You can access the last item in a list using index `-1`. Similarly, index `-2` specifies the next-to-last item, and so forth. It’s important to note that negative indices don’t start from `0` because `0` already points to the first item. This may be confusing when you’re first learning about negative and positive indices, but you’ll get used to it. It just takes a bit of practice.

Note that if you use negative indices, then `-len(languages)` will be the first item in the list. If you use an index lower than that value, then you get an `IndexError`:

```py
languages[-7]
# 
# Traceback (most recent call last):
#  ...
# IndexError: list index out of range
```

When you use an index lower than `-len(languages)`, you get an error telling you that the target index is out of range.

Using negative indices can be very convenient in many situations. For example, accessing the last item in a list is a fairly common operation. In Python, you can do this by using negative indices, like in `languages[-1]`, which is more readable and concise than doing something like `languages[len(languages) - 1]`.

::: note

Negative indices also come in handy when you need to reverse a list, as you’ll learn in the section [**Reversing and Sorting Lists**](/realpython.com/python-list/reversing-and-sorting-lists.md).

:::

As you already know, lists can contain items of any type, including other lists and sequences. When you have a list containing other sequences, you can access the items in any nested sequence by chaining indexing operations. Consider the following list of employee records:

```py
employees = [
    ("John", 30, "Software Engineer"),
    ("Alice", 25, "Web Developer"),
    ("Bob", 45, "Data Analyst"),
    ("Mark", 22, "Intern"),
    ("Samantha", 36, "Project Manager")
]
```

How can you access the individual pieces of data from any given employee? You can use the following indexing syntax:

```py
list_of_sequences[index_0][index_1]...[index_n]
```

The number at the end of each index represents the level of nesting for the list. For example, your employee list has one level of nesting. Therefore, to access Alice’s data, you can do something like this:

```py
employees[1][0]
# 
# 'Alice'
employees[1][1]
# 
# 25
employees[1][2]
# 
# 'Web Developer'
```

In this example, when you do `employees[1][0]`, index `1` refers to the second item in the `employees` list. That’s a nested list containing three items. The `0` refers to the first item in that nested list, which is `"Alice"`. As you can see, you can access items in the nested lists by applying multiple indexing operations in a row. This technique is extensible to lists with more than one level of nesting.

If the nested items are dictionaries, then you can access their data using keys:

```py
>>> employees = [
...     {"name": "John", "age": 30, "job": "Software Engineer"},
...     {"name": "Alice", "age": 25, "job": "Web Developer"},
...     {"name": "Bob", "age": 45, "job": "Data Analyst"},
...     {"name": "Mark", "age": 22, "job": "Intern"},
...     {"name": "Samantha", "age": 36, "job": "Project Manager"}
... ]

>>> employees[3]["name"]
'Mark'
>>> employees[3]["age"]
22
>>> employees[3]["job"]
Intern
```

In this example, you have a list of dictionaries. To access the data from one of the dictionaries, you need to use its index in the list, followed by the target key in square brackets.
