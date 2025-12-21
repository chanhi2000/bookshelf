---
lang: en-US
title: "Updating Items in Lists: Index Assignments"
description: "Article(s) > (6/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (6/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Updating Items in Lists: Index Assignments"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/updating-items-in-lists-index-assignments.html
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
  url="https://realpython.com/python-list#updating-items-in-lists-index-assignments"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Python lists are [**mutable**](https://realpython.com/python-mutable-vs-immutable-types.md#lists) data types. This means that you can change their elements without changing the identity of the underlying list. These kinds of changes are commonly known as in-place **mutations**. They allow you to update the value of one or more items in an existing list.

::: note

To dive deeper into what mutable and immutable data types are and how they work in Python, check out [**Python’s Mutable vs Immutable Types: What’s the Difference?**](/realpython.com/python-mutable-vs-immutable-types.md)

:::

To change the value of a given element in a list, you can use the following syntax:

```py
list_object[index] = new_value
```

The indexing operator gives you access to the target item through its index, while the assignment operator allows you to change its current value.

Here’s how this assignment works:

```py
numbers = [1, 2, 3, 4]

numbers[0] = "one"
numbers
# 
# ['one', 2, 3, 4]
numbers[1] = "two"
numbers
# 
# ['one', 'two', 3, 4]

numbers[-1] = "four"
numbers
# 
# ['one', 'two', 3, 'four']
numbers[-2] = "three"
numbers
# 
# ['one', 'two', 'three', 'four']
```

In this example, you’ve replaced all the numeric values in `numbers` with strings. To do that, you’ve used their indices and the assignment operator in what you can call **index assignments**. Note that negative indices also work.

What if you know an item’s value but don’t know its index in the list? How can you update the item’s value? In this case, you can use the `.index()` method as in the code below:

```py
fruits = ["apple", "banana", "orange", "kiwi", "grape"]

fruits[fruits.index("kiwi")] = "mango"
fruits
# 
# ['apple', 'banana', 'orange', 'mango', 'grape']
```

The `.index()` method takes a specific item as an argument and returns the index of the first occurrence of that item in the underlying list. You can take advantage of this behavior when you know the item that you want to update but not its index. However, note that if the target item isn’t present in the list, then you’ll get a [**`ValueError`**](/realpython.com/python-traceback.md#valueerror).

You can also update the value of multiple list items in one go. To do that, you can access the items with the slicing operator and then use the assignment operator and an iterable of new values. This combination of operators can be called **slice assignment** for short.

Here’s the general syntax:

```py
list_object[start:stop:step] = iterable
```

In this syntax, the values from `iterable` replace the portion of `list_object` defined by the slicing operator. If `iterable` has the same number of elements as the target slice, then Python updates the elements one by one without altering the length of `list_object`.

To understand these behaviors, consider the following examples:

```py
numbers = [1, 2, 3, 4, 5, 6, 7]

numbers[1:4] = [22, 33, 44]
numbers
# 
# [1, 22, 33, 44, 5, 6, 7]
```

In this example, you update the items located from `1` to `4`, without including the last item. In this slice, you have three items, so you use a list of three new values to update them one by one.

If `iterable` has more or fewer elements than the target slice, then `list_object` will automatically grow or shrink accordingly:

```py
numbers = [1, 5, 6, 7]

numbers[1:1] = [2, 3, 4]
numbers
# 
# [1, 2, 3, 4, 5, 6, 7]
```

Now the initial list of numbers only has four values. The values `1`, `2`, and `3` are missing. So, you use a slice to insert them starting at index `1`. In this case, the slice has a single index, while the list of values has three new values, so Python grows your list automatically to hold the new values.

You can also use a slice to shrink an existing list:

```py
numbers = [1, 2, 0, 0, 0, 0, 4, 5, 6, 7]

numbers[2:6] = [3]
numbers
# 
# [1, 2, 3, 4, 5, 6, 7]
```

Here, the initial list has a bunch of zeros where it should have a `3`. Your slicing operator takes the portion filled with zeros and replaces it with a single `3`.

Using the slicing operator to update the value of several items in an existing list is a pretty useful technique that may be hard to grasp at first. Go ahead and practice a bit more to get a deeper understanding of how this technique works.
