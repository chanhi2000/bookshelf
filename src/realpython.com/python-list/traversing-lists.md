---
lang: en-US
title: "Traversing Lists"
description: "Article(s) > (10/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (10/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Traversing Lists"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/traversing-lists.html
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
  url="https://realpython.com/python-list#traversing-lists"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

When you’re working with lists in Python, one of the most common tasks that you’ll have to perform is to traverse the list while you run some transformation on the data or use the data for other purposes.

To traverse a list, you’ll need a loop that goes over each element from the start to the end of the list. Python provides several constructs that allow you to do this. The most popular are `for` loops and list comprehensions. You can also use some of Python’s [**functional programming**](/realpython.com/python-functional-programming.md) tools for traversing lists.

In the following sections, you’ll learn how to traverse an existing list using these tools. To kick things off, you’ll start with `for` loops.

---

## Using a `for` Loop to Iterate Over a List

The recommended way to iterate over a list is to use a `for` loop. This kind of loop is quite readable and straightforward in Python. Here’s how it goes:

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

for color in colors:
    print(color)
# 
# red
# orange
# yellow
# green
# blue
# indigo
# violet
```

To use a `for` loop with a list, you place the list after the `in` keyword and provide a suitable loop variable. Don’t you think this loop is beautiful? Its meaning is clear, and it reads like plain English. That’s great!

Python’s `for` loops are intrinsically ready to operate on any iterable input directly. In this example, you’re using a list, but it’d work the same with a tuple, string, set, or any other iterable.

In the above example, the target iterable is your `colors` list. The loop variable, `color`, holds the current color in each iteration, and you can process each color in the loop’s body as needed. Note that if your list has a plural noun as its name, then the loop variable can use the same name in singular. This tiny detail will improve your loop’s readability.

A coding pattern that you’ll usually notice in code by people who come from other programming languages is that they tend to iterate over lists using a `for` loop that looks something like this:

```py
for i in range(len(colors)):
    print(colors[i])
# 
# red
# orange
# yellow
# green
# blue
# indigo
# violet
```

This loop iterates over a [**range**](/realpython.com/python-range.md) of integer numbers from `0` up to the length of the target list. In each iteration, you use the current index to access the associated item in the underlying list. Even though this loop works, it’s not Pythonic and is considered bad practice.

You don’t have to use a range of indices to iterate over a list in a `for` loop. Just go ahead and use your list directly in the loop definition. Python will take care of the rest.

Some people will argue that, in many situations, you’ll need to know the index of the current item to be able to perform some computations. That’s right! It’s especially true when you’re dealing with complex algorithms that operate on indices. In those cases, Python has you covered as well. It offers you the built-in `enumerate()` function, which you can use as in the following example:

```py
for i, color in enumerate(colors):
    print(f"{i} is the index of '{color}'")
#   
# 0 is the index of 'red'
# 1 is the index of 'orange'
# 2 is the index of 'yellow'
# 3 is the index of 'green'
# 4 is the index of 'blue'
# 5 is the index of 'indigo'
# 6 is the index of 'violet'
```

The `enumerate()` function takes an iterable and returns an iterator. This iterator yields two-item tuples on demand. Each tuple will contain an index and the associated item.

::: note

The `enumerate()` function also takes a second argument called `start`, which is optional and defaults to `0`. This argument allows you to specify a different starting point for the item count. However, if you set this argument to something different from `0`, then the resulting values won’t match the items’ indices in the underlying list.

To learn more about `enumerate()`, check out [**Python `enumerate()`: Simplify Loops That Need Counters**](/realpython.com/python-enumerate.md).

:::

Python provides many other tools that you can use when you’re iterating through a list of values. For example, you can use `reversed()` to iterate over the list in reverse order:

```py
for color in reversed(colors):
    print(color)
# 
# violet
# indigo
# blue
# green
# yellow
# orange
# red
```

In this loop, you take advantage of the `reversed()` function to traverse your list of colors in reverse order, which might be a common requirement in your code.

Another common need is to traverse the list in sorted order. In this situation, you can use your old friend `sorted()` as in the code below:

```py
numbers = [2, 9, 5, 1, 6]

for number in sorted(numbers):
    print(number)
# 
# 1
# 2
# 5
# 6
# 9
```

The `sorted()` function allows you to get a new list of sorted data from your original list. Then you iterate over the new sorted list as usual.

If you continue digging into the Python tool kit, then you’ll find many other tools that will allow you to traverse your lists in different ways. For example, you’ll have the `zip()` function, which allows you to iterate over multiple lists in parallel:

```py
integers = [1, 2, 3]
letters = ["a", "b", "c"]
floats = [4.0, 5.0, 6.0]

for i, l, f in zip(integers, letters, floats):
    print(i, l, f)
# 
# 1 a 4.0
# 2 b 5.0
# 3 c 6.0
```

In this example, you use `zip()` to iterate over three lists in parallel. The `zip()` function returns an iterator of tuples. The elements of each tuple come from the input iterables. In this example, the tuples combine items from `integers`, `letters`, and `floats`.

::: note

For a deep dive into using the built-in `zip()` function, check out [**Using the Python `zip()` Function for Parallel Iteration**](/realpython.com/python-zip-function.md).

:::

Up to this point, all your list-traversing examples iterate over a list without performing any modification on the list itself. Modifying a list during iteration can lead to unexpected behavior and bugs, so avoid this practice. As a rule of thumb, if you need to modify the content of a list in a loop, then take a copy of that list first.

Say that you have a list of numbers, and you want to remove only odd values. In this situation, you can try something like this as your first attempt:

```py
numbers = [2, 9, 5, 1, 6]

for number in numbers:
    if number % 2:
        numbers.remove(number)

numbers
#
# [2, 5, 6]
```

Unfortunately, only `9` and `1` were removed, while `5` remained in your list. This unexpected and incorrect behavior happened because removing items from a list shifts their indices, which interferes with the indices inside a running `for` loop. You can avoid this problem in a few ways.

For example, you can iterate over a copy of the original list:

```py
numbers = [2, 9, 5, 1, 6]

for number in numbers[:]:
    if number % 2:
        numbers.remove(number)

numbers
#
# [2, 6]
```

This time, the result is correct. You use the `[:]` operator to create a shallow copy of your list. This copy allows you to iterate over the original data in a safe way. Once you have the copy, then you feed it into the `for` loop, as before.

Alternatively, you can iterate over the list in reverse order:

```py
numbers = [2, 9, 5, 1, 6]

for number in reversed(numbers):
    if number % 2:
        numbers.remove(number)

numbers
#
# [2, 6]
```

When you remove only the last item from the right end of a list on each iteration, you change the list length, but the indexing remains unaffected. This lets you correctly map indices to the corresponding list elements.

Note that this was just an illustrative example that relied on cherry-picked data. Remember that calling `.remove()` deletes the first occurrence of the given value, starting from the left side of the list, instead of the last one. If you had duplicate values on the list, then list elements would be removed in a different order.

While modifying list elements during iteration is less of a problem than deleting them, it also isn’t considered a good practice. It’s usually more desirable to create a completely new list and [**populate**](/realpython.com/python-append.md#populating-a-list-from-scratch) it with the transformed values:

```py
numbers_as_strings = ["2", "9", "5", "1", "6"]

numbers_as_integers = []
for number in numbers_as_strings:
    numbers_as_integers.append(int(number))

numbers_as_integers
#
# [2, 9, 5, 1, 6]
```

This example shows a pretty common pattern in Python. The pattern consists of creating an empty list and then populating it in a loop. You’ll find this pattern in several Python codebases all around. It provides an intuitive and readable way to populate a list from scratch. However, you’ll often find that you can replace this pattern with something even better, a list comprehension.

---

## Building New Lists With Comprehensions

List comprehensions are another great, popular way to traverse your lists. Comprehensions are fundamentally a list transformation tool. They allow you to create lists with transformed data out of another list or iterable.

To understand how comprehensions can help you transform your lists, refer to the example where you have a list of numbers as strings and want to turn them into integers. You can solve this problem with the following comprehension:

```py
numbers = ["2", "9", "5", "1", "6"]

numbers = [int(number) for number in numbers]
numbers
#
# [2, 9, 5, 1, 6]
```

This comprehension iterates over the values in your original list. The expression in the comprehension runs the conversion from string to integer. The final result is a new list object, which you assign back to the `numbers` variable.

Note that this comprehension is equivalent to a loop with the `enumerate()` function:

```py
numbers = ["2", "9", "5", "1", "6"]

for i, number in enumerate(numbers):
    numbers[i] = int(number)

numbers
#
# [2, 9, 5, 1, 6]
```

The loop is more verbose and complicated because you need to call `enumerate()` and declare an extra indexing variable, `i`. On the other hand, the loop modifies the original list in place, while the list comprehension creates a new list.

You can also use comprehensions to filter existing lists. For example, say that you have a list of integer values and want to create a new list containing only the even values out of your original list:

```py
integers = [20, 31, 52, 6, 17, 8, 42, 55]

even_numbers = [number for number in integers if number % 2 == 0]
even_numbers
#
# [20, 52, 6, 8, 42]
```

The `if` clause in this list comprehension works as a filter that selects only the even numbers from your original data. How would you write a similar comprehension to retrieve the odd numbers?

---

## Processing Lists With Functional Tools

You can also take advantage of some Python functional programming tools, such as `map()` and `filter()`, to traverse a list of values. These functions have an internal loop that iterates over the items of an input iterable and returns a given result.

For example, the `map()` function takes a **transformation function** and an iterable as arguments. Then it returns an iterator that yields items that result from applying the function to every item in the iterable.

Using `map()`, you can convert your list of numbers to integers with the following code:

```py
numbers = ["2", "9", "5", "1", "6"]

numbers = list(map(int, numbers))
numbers
#
# [2, 9, 5, 1, 6]
```

In this example, `map()` applies `int()` to every item in `numbers` in a loop. Because `map()` returns an iterator, you’ve used the `list()` constructor to consume the iterator and show the result as a list.

::: note

For a deeper dive into using the `map()` function, check out [**Python’s `map()`: Processing Iterables Without a Loop**](/realpython.com/python-map-function.md).

:::

If you need to filter values from an existing list, then you can use the built-in `filter()` function. This function takes two arguments: a [<VPIcon icon="fa-brands fa-wikipedia-w"/>predicate](https://en.wikipedia.org/wiki/Predicate_(mathematical_logic)) function and an iterable of data. Then it returns an iterator that yields items that meet a given condition, which the predicate function tests for.

Here’s how `filter()` works in practice:

```py
integers = [20, 31, 52, 6, 17, 8, 42, 55]

even_numbers = list(filter(lambda number: number % 2 == 0, integers))
even_numbers
#
# [20, 52, 6, 8, 42]
```

In this example, you use `filter()` to traverse your `integers` list and extract those values that satisfy the condition of being even numbers.

::: note

For a deeper dive into using the `filter()` function, check out [**Python’s `filter()`: Extract Values From Iterables**](/realpython.com/python-filter-function.md).

:::

In Python, you’ll find a few other built-in and standard-library functions that allow you to traverse a list of values and obtain a final result either as another list, an iterator, or even a single value. Some examples include [**`reduce()`**](/realpython.com/python-reduce-function.md), [**`min()` and `max()`**](/realpython.com/python-min-and-max.md), [**`sum()`**](/realpython.com/python-sum-function.md), [**`all()`**](/realpython.com/python-all.md), and [**`any()`**](/realpython.com/any-python.md). Note that some of these functions aren’t really functional programming tools, but they internally iterate over the input list.
