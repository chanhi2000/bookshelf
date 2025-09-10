---
lang: en-US
title: "Exploring Other Features of Lists"
description: "Article(s) > (11/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (11/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Exploring Other Features of Lists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/exploring-other-features-of-lists.html
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
  url="https://realpython.com/python-list#exploring-other-features-of-lists"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Python’s `list` has an impressive set of features, making it a versatile, flexible, and powerful data structure. So far, you’ve learned about most of these features. You’ve learned to create lists, add and remove items from your lists, traverse existing lists in a loop or comprehension, and much more.

In the following sections, you’ll learn about some additional features that make lists even more powerful. You’ll learn how to find items in a list, determine the minimum and maximum values, and get the list’s length. You’ll also explore the details of how Python compares lists to each other.

---

## Finding Items in a List

Python has a few tools that allow you to search for values in an existing list. For example, if you only need to quickly determine whether a value is present in a list, but you don’t need to grab the value, then you can use the `in` or `not in` operator, which will run a **membership** test on your list.

::: note

To learn more about the `in` and `not in` operators and how to perform membership tests, check out [**Python’s “in” and “not in” Operators: Check for Membership**](/realpython.com/python-in-operator.md). These operators can be pretty useful when you need to [**check if a Python string contains a substring**](/realpython.com/python-string-contains-substring.md).

:::

As its name suggests, a membership test is a [**Boolean**](/realpython.com/python-boolean.md) test that allows you to find out whether an object is a **member** of a **collection** of values. The general syntax for membership tests on list objects looks something like this:

```py
item in list_object

item not in list_object
```

The first expression allows you to determine if `item` *is in* `list_object`. It returns `True` if it finds `item` in `list_object` or `False` otherwise. The second expression works in the opposite way, allowing you to check if `item` *is not in* `list_object`. In this case, you get `True` if `item` doesn’t appear in `list_object`.

Here’s how membership tests work in practice:

```py
usernames = ["john", "jane", "bob", "david", "eve"]

"linda" in usernames
#
# False
"linda" not in usernames
#
# True

"bob" in usernames
#
# True
"bob" not in usernames
#
# False
```

In this example, you have a list of users and want to determine whether some specific users are registered in your system.

The first test uses `in` to check whether the user `linda` is registered. You get `False` because that user isn’t registered. The second test uses the `not in` operator, which returns `True` as a confirmation that `linda` isn’t one of your users.

The `.index()` method is another tool that you can use to find a given value in an existing list. This method traverses a list looking for a specified value. If the value is in the list, then the method returns its index. Otherwise, it raises a [**`ValueError`**](/realpython.com/python-traceback.md#valueerror) exception:

```py
usernames = ["john", "jane", "bob", "david", "eve"]

usernames.index("eve")
#
# 4

usernames.index("linda")
#
# Traceback (most recent call last):
#  ...
# ValueError: 'linda' is not in list
```

In the first call to `.index()`, you get the index where you can find the user named `"eve"`. You can use this index later in your code to access the actual object as needed. In the second call, because the user `"linda"` isn’t in the list, you get a `ValueError` with an explanatory message.

Note that if your search’s target value appears several times in the list, then `.index()` will return the index of the first occurrence:

```py
sample = [12, 11, 10, 50, 14, 12, 50]

sample.index(12)
#
# 0
sample.index(50)
#
# 3
```

The `.index()` method returns as soon as it finds the input value in the underlying list. So, if the value occurs many times, then `.index()` always returns the index of the first occurrence.

Lists provide yet another method that you can use for searching purposes. The method is called `.count()`, and it allows you to check how many times a given value is present in a list:

```py
sample = [12, 11, 10, 50, 14, 12, 50]

sample.count(12)
#
# 2
sample.count(11)
#
# 1
sample.count(100)
#
# 0
```

The `.count()` method takes an item as an argument and returns the number of times the input item appears in the underlying list. If the item isn’t in the list, then you get `0`.

Searching for a specific value in a Python list isn’t a cheap operation. The time complexity of `.index()`, `.count()`, and membership tests on lists is *O(n)*. Such linear complexity may be okay if you don’t need to perform many lookups. However, it can negatively impact performance if you need to run many of these operations.

---

## Getting the Length, Maximum, and Minimum of a List

While working with Python lists, you’ll face the need to obtain descriptive information about a given list. For example, you may want to know the number of items in the list, which is known as the list’s **length**. You may also want to determine the greatest and lowest values in the list. In all these cases, Python has you covered.

To determine the length of a list, you’ll use the built-in `len()` function. In the following example, you use this function as an intermediate step to calculate the average grade of a student:

```py
grades = [80, 97, 86, 100, 98, 82]
n = len(grades)
sum(grades) / n
#
# 90.5
```

Here, you calculate the average grade of a student. To do this, you use the `sum()` function to get the total sum and `len()` to get the number of evaluated subjects, which is the length of your `grades` list.

It’s important to note that because lists keep track of their length, calling `len()` is pretty fast, with a time complexity of *O(1)*. So, in most cases, you don’t need to store the return value of `len()` in an intermediate variable as you did in the example above.

::: note

To learn more about using the `len()` function, check out [**Using the `len()` Function in Python**](/realpython.com/len-python-function.md).

:::

Another frequent task that you’ll perform on lists, especially on lists of numeric values, is to find the minimum and maximum values. To do this, you can take advantage of the built-in `min()` and `max()` functions:

```py
min([3, 5, 9, 1, -5])
#
# -5

max([3, 5, 9, 1, -5])
#
# 9
```

In these examples, you call `min()` and `max()` with a list of integer [**numbers**](/realpython.com/python-numbers.md). The call to `min()` returns the smallest number in the input list, `-5`. In contrast, the call to `max()` returns the largest number in the list, or `9`.

::: note

For a deeper dive into using the built-in `min()` and `max()` functions, check out [**Python’s `min()` and `max()`: Find Smallest and Largest Values**](/realpython.com/python-min-and-max.md).

:::

Overall, Python lists support the `len()`, `min()`, and `max()` functions. With `len()`, you get the length of a list. With `min()` and `max()`, you get the smallest and largest values in a list. All these values can be fairly useful when you’re working with lists in your code.

---

## Comparing Lists

You can also face the need to compare lists. Fortunately, list objects support the standard [**comparison operators**](/realpython.com/python-operators-expressions.md#comparison-operators). All these operators work by making item-by-item comparisons within the two involved lists:

```py
[2, 3] == [2, 3]
#
# True
[5, 6] != [5, 6]
#
# False

[5, 6, 7] < [7, 5, 6]
#
# True
[5, 6, 7] > [7, 5, 6]
#
# False

[4, 3, 2] <= [4, 3, 2]
#
# True
[4, 3, 2] >= [4, 3, 2]
#
# True
```

When you compare two lists, Python uses [<VPIcon icon="fa-brands fa-python"/>lexicographical ordering](https://docs.python.org/3/tutorial/datastructures.html#comparing-sequences-and-other-types). It compares the first two items from each list. If they’re different, this difference determines the comparison result. If they’re equal, then Python compares the next two items, and so on, until either list is exhausted.

In these examples, you compare lists of numbers using the standard comparison operators. In the first expression above, Python compares `2` and `2`, which are equal. Then it compares `3` and `3` to conclude that both lists are equal.

In the second expression, Python compares `5` and `5`. They’re equal, so Python has to compare `6` and `6`. They’re equal too, so the final result is `False`.

In the rest of the expressions, Python follows the same pattern to figure out the comparison. In short, Python compares lists in an item-by-item manner using lexicographical comparison. The first difference determines the result.

You can also compare lists of different lengths:

```py
[5, 6, 7] < [8]
#
# True

[5, 6, 7] == [5]
#
# False
```

In the first expression, you get `True` as a result because `5` is less than `8`. That fact is sufficient for Python to solve the evaluation. In the second example, you get `False`. This result makes sense because the lists don’t have the same length, so they can’t be equal.

As you can see, comparing lists can be tricky. It’s also an expensive operation that, in the worst case, requires traversing two entire lists. Things get more complex and expensive when you compare lists of strings. In this situation, Python will also have to compare the strings character by character, which adds cost to the operation.
