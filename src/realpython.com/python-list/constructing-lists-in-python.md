---
lang: en-US
title: "Constructing Lists in Python"
description: "Article(s) > (2/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (2/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Constructing Lists in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/constructing-lists-in-python.html
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
  url="https://realpython.com/python-list#constructing-lists-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

First things first. If you want to use a list to store or collect some data in your code, then you need to create a list object. You’ll find several ways to create lists in Python. That’s one of the features that make lists so versatile and popular.

For example, you can create lists using one of the following tools:

- List [<VPIcon icon="fa-brands fa-wikipedia-w"/>literals](https://en.wikipedia.org/wiki/Literal_(computer_programming))
- The [<VPIcon icon="fa-brands fa-python"/>`list()`](https://docs.python.org/3/library/stdtypes.html#list) constructor
- A list [comprehension](/realpython.com/list-comprehension-python.md)

In the following sections, you’ll learn how to use the three tools listed above to create new lists in your code. You’ll start off with list literals.

---

## Creating Lists Through Literals

List literals are probably the most popular way to create a `list` object in Python. These literals are fairly straightforward. They consist of a pair of square brackets enclosing a comma-separated series of objects.

Here’s the general syntax of a list literal:

```py
[item_0, item_1, ..., item_n]
```

This syntax creates a list of `n` items by listing the items in an enclosing pair of square brackets. Note that you don’t have to declare the items’ type or the list’s size beforehand. Remember that lists have a variable size and can store heterogeneous objects.

Here are a few examples of how to use the literal syntax to create new lists:

```py
digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
fruits = ["apple", "banana", "orange", "kiwi", "grape"]
cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia"
]

matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

inventory = [
    {"product": "phone", "price": 1000, "quantity": 10},
    {"product": "laptop", "price": 1500, "quantity": 5},
    {"product": "tablet", "price": 500, "quantity": 20}
]

functions = [print, len, range, type, enumerate]

empty = []
```

In these examples, you use the list literal syntax to create lists containing numbers, strings, other lists, dictionaries, and even [**function**](/realpython.com/defining-your-own-python-function.md) objects. As you already know, lists can store any type of object. They can also be empty, like the final list in the above code snippet.

Empty lists are useful in many situations. For example, maybe you want to create a list of objects resulting from computations that run in a loop. The loop will allow you to populate the empty list one element at a time.

Using a list literal is arguably the most common way to create lists. You’ll find these literals in many Python examples and codebases. They come in handy when you have a series of elements with closely related meanings, and you want to pack them into a single data structure.

Note that naming lists as plural nouns is a common practice that improves readability. However, there are situations where you can use collective nouns as well.

For example, you can have a list called `people`. In this case, every item will be a `person`. Another example would be a list that represents a table in a database. You can call the list `table`, and each item will be a `row`. You’ll find more examples like these in your walk-through of using lists.

---

## Using the `list()` Constructor

Another tool that allows you to create `list` objects is the class [**constructor**](/realpython.com/python-class-constructor.md), `list()`. You can call this constructor with any [**iterable**](/realpython.com/python-iterators-iterables.md) object, including other lists, tuples, sets, dictionaries and their components, strings, and many others. You can also call it without any arguments, in which case you’ll get an empty list back.

Here’s the general syntax:

```py
list([iterable])
```

To create a list, you need to call `list()` as you’d call any class constructor or function. Note that the square brackets around `iterable` mean that the argument is [**optional**](/realpython.com/python-optional-arguments.md), so the brackets aren’t part of the syntax. Here are a few examples of how to use the constructor:

```py
list((0, 1, 2, 3, 4, 5, 6, 7, 8, 9))
# 
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

list({"circle", "square", "triangle", "rectangle", "pentagon"})
# 
# ['square', 'rectangle', 'triangle', 'pentagon', 'circle']

list({"name": "John", "age": 30, "city": "New York"}.items())
# 
# [('name', 'John'), ('age', 30), ('city', 'New York')]

list("Pythonista")
# 
# ['P', 'y', 't', 'h', 'o', 'n', 'i', 's', 't', 'a']

list()
# 
# []
```

In these examples, you create different lists using the `list()` constructor, which accepts any type of iterable object, including tuples, dictionaries, strings, and many more. It even accepts sets, in which case you need to remember that sets are unordered data structures, so you won’t be able to predict the final order of items in the resulting list.

Calling `list()` without an argument creates and [**returns**](/realpython.com/python-return-statement.md) a new empty list. This way of creating empty lists is less common than using an empty pair of square brackets. However, in some situations, it can make your code more explicit by clearly communicating your intent: *creating an empty list*.

The `list()` constructor is especially useful when you need to create a list out of an [**iterator**](/realpython.com/python-iterators-iterables.md#getting-to-know-python-iterators) object. For example, say that you have a [**generator function**](/realpython.com/introduction-to-python-generators.md) that yields numbers from the [**Fibonacci sequence**](/realpython.com/fibonacci-sequence-python.md) on demand, and you need to store the first ten numbers in a list.

In this case, you can use `list()` as in the code below:

```py
def fibonacci_generator(stop):
    current_fib, next_fib = 0, 1
    for _ in range(0, stop):
        fib_number = current_fib
        current_fib, next_fib = next_fib, current_fib + next_fib
        yield fib_number

fibonacci_generator(10)
# 
# <generator object fibonacci_generator at 0x10692f3d0>

list(fibonacci_generator(10))
# 
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

Calling `fibonacci_generator()` directly returns a [**generator iterator**](/realpython.com/python-iterators-iterables.md#creating-generator-iterators) object that allows you to iterate over the numbers in the Fibonacci sequence up to the index of your choice. However, you don’t need an iterator in your code. You need a list. A quick way to get that list is to wrap the iterator in a call to `list()`, as you did in the final example.

This technique comes in handy when you’re working with functions that return iterators, and you want to construct a list object out of the items that the iterator yields. The `list()` constructor will consume the iterator, build your list, and return it back to you.

::: note

You can also use the literal syntax and the [**iterable unpacking**](/realpython.com/python-iterators-iterables.md#unpacking-iterables) operator (`*`) as an alternative to the `list()` constructor.

Here’s how:

```py
[*fibonacci_generator(10)]
# 
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

In this example, the iterable unpacking operator consumes the iterator, and the square brackets build the final list of numbers. However, this technique is less readable and explicit than using `list()`.

:::

As a side note, you’ll often find that built-in and third-party functions [**return**](/realpython.com/python-return-statement.md) iterators. Functions like [**`reversed()`**](/realpython.com/python-reverse-list.md#the-built-in-reversed-function), [**`enumerate()`**](/realpython.com/python-enumerate.md), [**`map()`**](/realpython.com/python-map-function.md), and [**`filter()`**](/realpython.com/python-filter-function.md) are good examples of this practice. It’s less common to find functions that directly return `list` objects, but the built-in [**`sorted()`**](/realpython.com/python-sort.md#ordering-values-with-sorted) function is one example. It takes an iterable as an argument and returns a list of sorted items.

---

## Building Lists With List Comprehensions

**List comprehensions** are one of the most distinctive features of Python. They’re quite popular in the Python community, so you’ll likely find them all around. List comprehensions allow you to quickly create and transform lists using a syntax that mimics a [**`for` loop**](/realpython.com/python-for-loop.md) but in a single line of code.

The core syntax of list comprehensions looks something like this:

```py
[expression(item) for item in iterable]
```

Every list comprehension needs at least three components:

1. `expression()` is a Python [**expression**](/realpython.com/python-operators-expressions.md) that returns a concrete value, and most of the time, that value depends on `item`. Note that it doesn’t have to be a function.
2. `item` is the current object from `iterable`.
3. `iterable` can be any Python iterable object, such as a [**list**](/realpython.com/python-lists-tuples.md#python-lists), [**tuple**](/realpython.com/python-lists-tuples.md#python-tuples), [**set**](/realpython.com/python-sets.md), [**string**](/realpython.com/python-strings.md), or [**generator**](/realpython.com/introduction-to-python-generators.md).

The `for` construct iterates over the items in `iterable`, while `expression(item)` provides the corresponding list item that results from running the comprehension.

To illustrate how list comprehensions allow you to create new lists out of existing iterables, say that you want to construct a list with the square values of the first ten [**integer**](/realpython.com/python-numbers.md#integers) numbers. In this case, you can write the following comprehension:

```py
[number ** 2 for number in range(1, 11)]
# 
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

In this example, you use `range()` to get the first ten integer numbers. The comprehension iterates over them while computing the square and building the new list. This example is just a quick sample of what you can do with a list comprehension.

::: note

To dive deeper into list comprehensions and how to use them, check out [**When to Use a List Comprehension in Python**](/realpython.com/list-comprehension-python.md).

:::

In general, you’ll use a list comprehension when you need to create a list of transformed values out of an existing iterable. Comprehensions are a great tool that you need to master as a Python developer. They’re optimized for performance and are quick to write.
