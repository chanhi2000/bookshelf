---
lang: en-US
title: "Concatenating and Repeating Lists"
description: "Article(s) > (8/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (8/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Concatenating and Repeating Lists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/concatenating-and-repeating-lists.html
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
  url="https://realpython.com/python-list#concatenating-and-repeating-lists"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Another interesting and useful feature of Python’s `list` is that it supports the following two operations:

1. **Concatenation**, which uses the plus operator (`+`)
2. **Repetition**, which uses the multiplication operator (`*`)

In the following sections, you’ll learn how these two operations work on Python lists and how you can use them in your code.

---

## Concatenating Lists

**Concatenation** consists of joining two things together. In this case, you’d like to concatenate two lists, which you can do using the plus operator (`+`). In this context, this operator is known as the **concatenation operator**.

Here’s how it works:

```py
[0, 1, 2, 3] + [4, 5, 6] + [7, 8, 9]
# 
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

In this example, you combine three list objects using the concatenation operator. Note how the operator creates a new list containing all the individual items from the three original lists.

Whenever you use the concatenation operator, you get a new list object as a result. Consider the following example. Keep an eye on the identity of `digits`:

```py
digits = [0, 1, 2, 3, 4, 5]
id(digits)
# 
# 4558758720

digits = digits + [6, 7, 8, 9]
id(digits)
# 
# 4470412224
```

In this example, you first create a list containing a few numbers. The `id()` function allows you to know the identity of this first list. Then you use a concatenation operation to complete your list of digits. Note how `id()` now returns a different value. This result confirms that the concatenation operator always creates a new list that joins its operands.

::: note

You can only concatenate a list with another list. If you try to concatenate a list with something else, then you’ll get an exception:

```py
[0, 1, 2, 3, 4, 5] + (6, 7, 8, 9)
# 
# Traceback (most recent call last):
#  ...
# TypeError: can only concatenate list (not "tuple") to list
```

Python’s concatenation operator raises a `TypeError` exception when you try to concatenate a list with a different data type, such as a tuple.

:::

The concatenation operator has an [**augmented variation**](/realpython.com/python-assignment-operator.md#augmented-assignments-for-concatenation-and-repetition), which uses the `+=` operator. Here’s how this operator works:

```py
digits = [0, 1, 2, 3, 4, 5]
digits += [6, 7, 8, 9]
digits
# 
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

The **augmented concatenation operator** works on an existing list. It takes a second list and adds its items, one by one, to the end of the initial list. The operation is a shortcut to something like `digits = digits + [6, 7, 8, 9]`. However, it works a bit differently.

Unlike the regular concatenation operator, the augmented variation mutates the target list in place rather than creating a new list:

```py
digits = [0, 1, 2, 3, 4, 5]
id(digits)
# 
# 4699578112

digits += [6, 7, 8, 9]
id(digits)
# 
# 4699578112
```

In this example, the `id()` function returns the same value in both calls, meaning that you have a single list object instead of two. The augmented concatenation mutates `digits` in place, so the whole process is more efficient in terms of memory and execution time than a plain concatenation would be.

---

## Repeating the Content of a List

**Repetition** consists of cloning the content of a given list a specific number of times. You can achieve this with the repetition operator (`*`), which takes two operands:

1. The list whose content you want to repeat
2. The number of times that you need to repeat the content

To understand how this operator works, consider the following example:

```py
["A", "B", "C"] * 3
#
# ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']

3 * ["A", "B", "C"]
#
# ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']
```

Here, you repeat the content of a list three times and get a new list as a result. In the first example, the left-hand operand is the target list, and the right-hand operand is an integer representing the number of times that you want to repeat the list’s content. In this second example, the operands are swapped, but the result is the same, as you’d expect in a multiplication operation.

The repetition operator also has an augmented variation that you’ll call the augmented repetition operator. This variation uses the `*=` operator. Here’s how it works:

```py
letters = ["A", "B", "C"]
letters *= 3 >>> letters
# 
# ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C']
```

In the highlighted expression, the left-hand operand is the target list, while the right-hand operand is the integer value. You can’t swap them.

Again, the regular repetition operator returns a new list object containing the repeated data. However, its augmented variation mutates the target list in place, which makes it more efficient. As an exercise, go ahead and use the `id()` function to confirm this statement.
