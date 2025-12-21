---
lang: en-US
title: "Using the Python zip() Function for Parallel Iteration"
description: "Article(s) > Using the Python zip() Function for Parallel Iteration"
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
      content: "Article(s) > Using the Python zip() Function for Parallel Iteration"
    - property: og:description
      content: "Using the Python zip() Function for Parallel Iteration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-zip-function.html
prev: /programming/py/articles/README.md
date: 2024-11-17
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/How-to-Use-Python-Zip-with-Examples_Watermarked.3020903367b6.jpg
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
  name="Using the Python zip() Function for Parallel Iteration"
  desc="In this step-by-step tutorial, you'll learn how to use the Python zip() function to solve common programming problems. You'll learn how to traverse multiple iterables in parallel and create dictionaries with just a few lines of code."
  url="https://realpython.com/python-zip-function"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-Zip-with-Examples_Watermarked.3020903367b6.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Parallel Iteration With Python's zip() Function - Real Python"
  desc="In this course, you'll learn how to use the Python zip() function to solve common programming problems. You'll learn how to traverse multiple iterables in parallel and create dictionaries with just a few lines of code."
  url="https://realpython.com/courses/python-zip-function/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-Zip-with-Examples_Watermarked.3020903367b6.jpg"/>

:::

Python’s `zip()` function combines elements from multiple iterables. Calling `zip()` generates an iterator that yields tuples, each containing elements from the input iterables. This function is essential for tasks like parallel iteration and dictionary creation, offering an efficient way to handle multiple sequences in Python programming.

::: info By the end of this tutorial, you’ll understand that

- `zip()` in Python aggregates elements from multiple iterables into tuples, facilitating **parallel iteration**.
- `dict(zip())` **creates dictionaries** by pairing keys and values from two sequences.
- `zip()` is **lazy** in Python, meaning it returns an iterator instead of a list.
- There’s no `unzip()` function in Python, but the same `zip()` function can **reverse the process** using the unpacking operator `*`.
- Alternatives to `zip()` include `itertools.zip_longest()` for handling iterables of **unequal lengths**.

:::

In this tutorial, you’ll explore how to use `zip()` for parallel iteration. You’ll also learn how to handle iterables of unequal lengths and discover the convenience of using `zip()` with dictionaries. Whether you’re working with lists, tuples, or other data structures, understanding `zip()` will enhance your coding skills and streamline your Python projects.

---

## Understanding the Python `zip()` Function

`zip()` is available in the [<VPIcon icon="fa-brands fa-python"/>built-in namespace](https://docs.python.org/3/library/builtins.html). If you use `dir()` to inspect `__builtins__`, then you’ll see `zip()` at the end of the list:

```py
>>> dir(__builtins__)
['ArithmeticError', 'AssertionError', 'AttributeError', ..., 'zip']
```

You can see that `'zip'` is the last entry in the list of available objects.

According to the [<VPIcon icon="fa-brands fa-python"/>official documentation](https://docs.python.org/3/library/functions.html#zip), Python’s `zip()` function behaves as follows:

::: info Built-in Functions - zip(*iterables, strict=False) (<code>docs.python.org</code>)

<SiteInfo
  name="Built-in Functions"
  desc="The Python interpreter has a number of functions and types built into it that are always available. They are listed here in alphabetical order.,,,, Built-in Functions,,, A, abs(), aiter(), all(), a..."
  url="https://docs.python.org/3/library/functions.html#zip"
  logo="https://docs.python.org/3/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

Returns an iterator of tuples, where the *i*-th tuple contains the *i*-th element from each of the argument sequences or iterables. The iterator stops when the shortest input iterable is exhausted. With a single iterable argument, it returns an iterator of 1-tuples. With no arguments, it returns an empty iterator.

:::

You’ll unpack this definition throughout the rest of the tutorial. As you work through the code examples, you’ll see that Python zip operations work just like the physical zipper on a bag or pair of jeans. Interlocking pairs of teeth on both sides of the zipper are pulled together to close an opening. In fact, this visual analogy is perfect for understanding `zip()`, since the function was named after physical zippers!

---

## Using `zip()` in Python

The signature of Python’s `zip()` function is `zip(*iterables, strict=False)`. You’ll learn more about `strict` later. The function takes in [<VPIcon icon="fa-brands fa-python"/>iterables](https://docs.python.org/3/glossary.html#term-iterable) as arguments and returns an **iterator**. This iterator generates a series of tuples containing elements from each iterable. `zip()` can accept any type of iterable, such as [**files**](/realpython.com/read-write-files-python.md), [**lists, tuples**](/realpython.com/python-lists-tuples.md), [**dictionaries**](/realpython.com/python-dicts.md), [**sets**](/realpython.com/python-sets.md), and so on.

### Passing `n` Arguments

If you use `zip()` with `n` arguments, then the function will return an iterator that generates tuples of length `n`. To see this in action, take a look at the following code block:

```py
numbers = [1, 2, 3]
letters = ["a", "b", "c"]
zipped = zip(numbers, letters)
zipped  # Holds an iterator object
# 
# <zip object at 0x7fa4831153c8>

type(zipped)
# 
# <class 'zip'>

list(zipped)
# 
# [(1, 'a'), (2, 'b'), (3, 'c')]
```

Here, you use `zip(numbers, letters)` to create an iterator that produces tuples of the form `(x, y)`. In this case, the `x` values are taken from `numbers` and the `y` values are taken from `letters`. Notice how the Python `zip()` function returns an iterator. To retrieve the final list object, you need to use `list()` to consume the iterator.

If you’re working with sequences like lists, tuples, or [**strings**](/realpython.com/python-strings.md), then your iterables are guaranteed to be evaluated from left to right. This means that the resulting list of tuples will take the form `[(numbers[0], letters[0]), (numbers[1], letters[1]),..., (numbers[n], letters[n])]`. However, for other types of iterables (like [**sets**](/realpython.com/python-sets.md)), you might see some weird results:

```py
s1 = {2, 3, 1}
s2 = {"b", "a", "c"}
list(zip(s1, s2))
# 
# [(1, 'a'), (2, 'c'), (3, 'b')]
```

In this example, `s1` and `s2` are `set` objects, which don’t keep their elements in any particular order. This means that the tuples returned by `zip()` will have elements that are paired up randomly. If you’re going to use the Python `zip()` function with unordered iterables like sets, then this is something to keep in mind.

### Passing No Arguments

You can call `zip()` with no arguments as well. In this case, you’ll simply get an empty iterator:

```py
zipped = zip()
zipped
# 
# <zip object at 0x7f196294a488>

list(zipped)
# 
# []
```

Here, you call `zip()` with no arguments, so your `zipped` [**variable**](/realpython.com/python-variables.md) holds an empty iterator. If you consume the iterator with `list()`, then you’ll see an empty list as well.

You could also try to force the empty iterator to yield an element directly. In this case, you’ll get a `StopIteration` [**exception**](/realpython.com/python-exceptions.md):

```py
zipped = zip()
next(zipped)
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# StopIteration
```

When you call [<VPIcon icon="fa-brands fa-python"/>`next()`](https://docs.python.org/3/library/functions.html#next) on `zipped`, Python tries to retrieve the next item. However, since `zipped` holds an empty iterator, there’s nothing to pull out, so Python raises a `StopIteration` exception.

### Passing One Argument

Python’s `zip()` function can take just one argument as well. The result will be an iterator that yields a series of 1-item tuples:

```py
a = [1, 2, 3]
zipped = zip(a)
list(zipped)
#
# [(1,), (2,), (3,)]
```

This may not be that useful, but it still works. Perhaps you can find some use cases for this behavior of `zip()`!

As you can see, you can call the Python `zip()` function with as many input iterables as you need. The length of the resulting tuples will always equal the number of iterables you pass as arguments. Here’s an example with three iterables:

```py
integers = [1, 2, 3]
letters = ["a", "b", "c"]
floats = [4.0, 5.0, 6.0]
zipped = zip(integers, letters, floats)  # Three input iterables
list(zipped)
# 
# [(1, 'a', 4.0), (2, 'b', 5.0), (3, 'c', 6.0)]
```

Here, you call the Python `zip()` function with three iterables, so the resulting tuples have three elements each.

### Passing Arguments of Unequal Length

When you’re working with the Python `zip()` function, it’s important to pay attention to the length of your iterables. It’s possible that the iterables you pass in as arguments aren’t the same length.

In these cases, the number of elements that `zip()` puts out will be equal to the length of the *shortest* iterable. The remaining elements in any longer iterables will be totally ignored by `zip()`, as you can see here:

```py
list(zip(range(5), range(100)))
# 
# [(0, 0), (1, 1), (2, 2), (3, 3), (4, 4)]
```

Since `5` is the length of the first (and shortest) [**`range()`**](/realpython.com/python-range.md) object, `zip()` outputs a list of five tuples. There are still 95 unmatched elements from the second `range()` object. These are all ignored by `zip()` since there are no more elements from the first `range()` object to complete the pairs.

If trailing or unmatched values are important to you, then you can use [<VPIcon icon="fa-brands fa-python"/>`itertools.zip_longest()`](https://docs.python.org/3/library/itertools.html#itertools.zip_longest) instead of `zip()`. With this function, the missing values will be replaced with whatever you pass to the `fillvalue` argument (defaults to [**`None`**](/realpython.com/null-in-python.md)). The iteration will continue until the longest iterable is exhausted:

```py
from itertools import zip_longest
numbers = [1, 2, 3]
letters = ["a", "b", "c"]
longest = range(5)
zipped = zip_longest(numbers, letters, longest, fillvalue="?")
list(zipped)
# 
# [(1, 'a', 0), (2, 'b', 1), (3, 'c', 2), ('?', '?', 3), ('?', '?', 4)]
```

Here, you use `itertools.zip_longest()` to yield five tuples with elements from `letters`, `numbers`, and `longest`. The iteration only stops when `longest` is exhausted. The missing elements from `numbers` and `letters` are filled with a question mark `?`, which is what you specified with `fillvalue`.

Since [**Python 3.10**](/realpython.com/python310-new-features.md), `zip()` has a new optional keyword argument called [<VPIcon icon="fa-brands fa-python"/>`strict`](https://docs.python.org/3/library/functions.html#zip), which was introduced through [<VPIcon icon="fa-brands fa-python"/>PEP 618—Add Optional Length-Checking To zip](https://python.org/dev/peps/pep-0618/). This argument’s main goal is to provide a **safe way** to handle **iterables of unequal length**.

The default value of `strict` is `False`, which ensures that `zip()` remains backward compatible and has a default behavior that matches its behavior in older Python 3 versions:

```py
list(zip(range(5), range(100)))
# 
# [(0, 0), (1, 1), (2, 2), (3, 3), (4, 4)]
```

In Python 3.10 and later, calling `zip()` without altering the default value to `strict` still gives you a list of five tuples, with the unmatched elements from the second `range()` object ignored.

Alternatively, if you set `strict` to `True`, then `zip()` checks if the input iterables you provided as arguments have the same length, raising a [<VPIcon icon="fa-brands fa-python"/>`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) if they don’t:

```py
list(zip(range(5), range(100), strict=True))
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# ValueError: zip() argument 2 is longer than argument 1
```

This new feature of `zip()` is useful when you need to make sure that the function only accepts iterables of equal length. Setting `strict` to `True` makes code that expects equal-length iterables safer, ensuring that faulty changes to the caller code don’t result in silently losing data.

---

## Looping Over Multiple Iterables

Looping over multiple iterables is one of the most common use cases for Python’s `zip()` function. If you need to iterate through multiple lists, tuples, or any other sequence, then it’s likely that you’ll fall back on `zip()`. This section will show you how to use `zip()` to iterate through multiple iterables at the same time.

### Traversing Lists in Parallel

Python’s `zip()` function allows you to iterate in parallel over two or more iterables. Since `zip()` generates tuples, you can unpack these in the header of a [<VPIcon icon="fas fa-globe"/>`for` loop](https://realpython.com/courses/python-for-loop/):

```py
letters = ["a", "b", "c"]
numbers = [0, 1, 2]
for letter, number in zip(letters, numbers):
    print(f"Letter: {letter}")
    print(f"Number: {number}")
# 
# Letter: a
# Number: 0
# Letter: b
# Number: 1
# Letter: c
# Number: 2
```

Here, you iterate through the series of tuples returned by `zip()` and unpack the elements into `letter` and `number`. When you combine `zip()`, `for` loops, and [**tuple unpacking**](/realpython.com/python-tuple.md#packing-and-unpacking-tuples), you can get a useful and [<VPIcon icon="fas fa-globe"/>Pythonic](https://realpython.com/courses/idiomatic-python-101/) idiom for traversing two or more iterables at once.

You can also iterate through more than two iterables in a single `for` loop. Consider the following example, which has three input iterables:

```py
letters = ["a", "b", "c"]
numbers = [0, 1, 2]
operators = ["*", "/", "+"]
for let, num, op in zip(letters, numbers, operators):
    print(f"Letter: {let}")
    print(f"Number: {num}")
    print(f"Operator: {op}")
# 
# Letter: a
# Number: 0
# Operator: *
# Letter: b
# Number: 1
# Operator: /
# Letter: c
# Number: 2
# Operator: +
```

In this example, you use `zip()` with three iterables to create and return an iterator that generates 3-item tuples. This lets you iterate through all three iterables in one go. There’s no restriction on the number of iterables you can use with Python’s `zip()` function.

::: note

If you want to dive deeper into Python `for` loops, check out [**Python “for” Loops (Definite Iteration)**](/realpython.com/python-for-loop.md).

:::

### Traversing Dictionaries in Parallel

In Python 3.6 and beyond, dictionaries are [<VPIcon icon="fa-brands fa-python"/>ordered collections](https://docs.python.org/3/whatsnew/3.6.html#whatsnew36-compactdict), meaning they keep their elements in the same order in which they were introduced. If you take advantage of this feature, then you can use the Python `zip()` function to iterate through multiple dictionaries in a safe and coherent way:

```py
dict_one = {"name": "John", "last_name": "Doe", "job": "Python Consultant"}
dict_two = {"name": "Jane", "last_name": "Doe", "job": "Community Manager"}
for (k1, v1), (k2, v2) in zip(dict_one.items(), dict_two.items()):
    print(k1, "->", v1)
    print(k2, "->", v2)
# 
# name -> John
# name -> Jane
# last_name -> Doe
# last_name -> Doe
# job -> Python Consultant
# job -> Community Manager
```

Here, you iterate through `dict_one` and `dict_two` in parallel. In this case, `zip()` generates tuples with the items from both dictionaries. Then, you can unpack each tuple and gain access to the items of both dictionaries at the same time.

::: note

If you want to dive deeper into dictionary iteration, check out [**How to Iterate Through a Dictionary in Python**](/realpython.com/iterate-through-dictionary-python.md).

:::

Notice that, in the above example, the left-to-right evaluation order is guaranteed. You can also use Python’s `zip()` function to iterate through sets in parallel. However, you’ll need to consider that, unlike dictionaries in Python 3.6, sets *don’t* keep their elements in order. If you forget this detail, the final result of your program may not be quite what you want or expect.

### Unzipping a Sequence

There’s a question that comes up frequently in forums for new Pythonistas: “If there’s a `zip()` function, then why is there no `unzip()` function that does the opposite?”

The reason why there’s no `unzip()` function in Python is because the opposite of `zip()` is… well, `zip()`. Do you recall that the Python `zip()` function works just like a real zipper? The examples so far have shown you how Python zips things closed. So, how do you unzip Python objects?

Say you have a list of tuples and want to separate the elements of each tuple into independent sequences. To do this, you can use `zip()` along with the [**unpacking operator `*`**](/realpython.com/python-kwargs-and-args.md#unpacking-with-the-asterisk-operators), like so:

```py
pairs = [(1, "a"), (2, "b"), (3, "c"), (4, "d")]
numbers, letters = zip(*pairs)
numbers
# 
# (1, 2, 3, 4)

letters
# 
# ('a', 'b', 'c', 'd')
```

Here, you have a `list` of tuples containing some kind of mixed data. Then, you use the unpacking operator `*` to unzip the data, creating two different lists (`numbers` and `letters`).

### Sorting in Parallel

[**Sorting**](/realpython.com/sorting-algorithms-python.md) is a common operation in programming. Suppose you want to combine two lists and sort them at the same time. To do this, you can use `zip()` along with [**`.sort()`**](/realpython.com/python-sort.md) as follows:

```py
letters = ["b", "a", "d", "c"]
numbers = [2, 4, 3, 1]
data1 = list(zip(letters, numbers))
data1
# 
# [('b', 2), ('a', 4), ('d', 3), ('c', 1)]

data1.sort()  # Sort by letters
data1
# 
# [('a', 4), ('b', 2), ('c', 1), ('d', 3)]

data2 = list(zip(numbers, letters))
data2
# 
# [(2, 'b'), (4, 'a'), (3, 'd'), (1, 'c')]

data2.sort()  # Sort by numbers
data2
# 
# [(1, 'c'), (2, 'b'), (3, 'd'), (4, 'a')]
```

In this example, you first combine two lists with `zip()` and sort them. Notice how `data1` is sorted by `letters` and `data2` is sorted by `numbers`.

You can also use `sorted()` and `zip()` together to achieve a similar result:

```py
letters = ["b", "a", "d", "c"]
numbers = [2, 4, 3, 1]
sorted(zip(letters, numbers))  # Sort by letters
# 
# [('a', 4), ('b', 2), ('c', 1), ('d', 3)]
```

In this case, `sorted()` runs through the iterator generated by `zip()` and sorts the items by `letters`, all in one go. This approach can be a little bit faster since you’ll need only two function calls: `zip()` and `sorted()`.

With `sorted()`, you’re also writing a more general piece of code. This will allow you to sort any kind of sequence, not just lists.

### Calculating in Pairs

You can use the Python `zip()` function to make some quick calculations. Suppose you have the following data in a spreadsheet:

| Element/Month | January | February | March |
| --- | --- | --- | --- |
| Total Sales | 52,000.00 | 51,000.00 | 48,000.00 |
| Production Cost | 46,800.00 | 45,900.00 | 43,200.00 |

You’re going to use this data to calculate your monthly profit. `zip()` can provide you with a fast way to make the calculations:

```py
total_sales = [52000.00, 51000.00, 48000.00]
prod_cost = [46800.00, 45900.00, 43200.00]
for sales, costs in zip(total_sales, prod_cost):
    profit = sales - costs
    print(f"Total profit: {profit}")
# 
# Total profit: 5200.0
# Total profit: 5100.0
# Total profit: 4800.0
```

Here, you calculate the profit for each month by subtracting `costs` from `sales`. Python’s `zip()` function combines the right pairs of data to make the calculations. You can generalize this logic to make any kind of complex calculation with the pairs returned by `zip()`.

### Building Dictionaries

Python’s [**dictionaries**](/realpython.com/python-dicts.md) are a very useful data structure. Sometimes, you might need to build a dictionary from two different but closely related sequences. A convenient way to achieve this is to use `dict()` and `zip()` together. For example, suppose you retrieved a person’s data from a form or a database. Now you have the following lists of data:

```py
fields = ["name", "last_name", "age", "job"]
values = ["John", "Doe", "45", "Python Developer"]
```

With this data, you need to create a dictionary for further processing. In this case, you can use `dict()` along with `zip()` as follows:

```py
person = dict(zip(fields, values))
person
# 
# {'name': 'John', 'last_name': 'Doe', 'age': '45', 'job': 'Python Developer'}
```

Here, you create a dictionary that combines the two lists. `zip(fields, values)` returns an iterator that generates 2-items tuples. If you call `dict()` on that iterator, then you’ll be building the dictionary you need. The elements of `fields` become the dictionary’s keys, and the elements of `values` represent the values in the dictionary.

You can also update an existing dictionary by combining `zip()` with `dict.update()`. Suppose that John changes his job and you need to update the dictionary. You can do something like the following:

```py
new_job = ["Python Consultant"]
field = ["job"]
person.update(zip(field, new_job))
person
# 
# {'name': 'John', 'last_name': 'Doe', 'age': '45', 'job': 'Python Consultant'}
```

Here, `dict.update()` updates the dictionary with the key-value tuple you created using Python’s `zip()` function. With this technique, you can easily overwrite the value of `job`.

---

## Conclusion

In this tutorial, you’ve learned how to use Python’s `zip()` function. `zip()` can receive multiple iterables as input. It returns an iterator that can generate tuples with paired elements from each argument. The resulting iterator can be quite useful when you need to process multiple iterables in a single loop and perform some actions on their items at the same time.

Now you can:

- **Use the `zip()` function** in Python effectively
- **Loop over multiple iterables** and perform different actions on their items in parallel
- **Create and update dictionaries** on the fly by zipping two input iterables together

You’ve also coded a few examples that you can use as a starting point for implementing your own solutions using Python’s `zip()` function. Feel free to modify these examples as you explore `zip()` in depth!

---

## Frequently Asked Questions

Now that you have some experience with the `zip()` function in Python, you can use the questions and answers below to check your understanding and recap what you’ve learned. These frequently asked questions sum up the most important concepts you’ve covered in this tutorial. 

::: details How does the Python `zip()` function work?

The `zip()` function takes multiple iterables as arguments and returns an iterator of tuples, where each tuple contains elements from the input iterables at the same index. The iteration stops when the shortest input iterable is exhausted. If called with a single iterable, it returns an iterator of 1-tuples, and with no arguments, it returns an empty iterator.

:::

::: details What happens when `zip()` is used with iterables of different lengths?

When `zip()` is used with iterables of different lengths, it stops creating tuples when the shortest iterable is exhausted. Any remaining elements in the longer iterables are ignored. However, you can use `itertools.zip_longest()` to handle this situation, which will fill missing values with a specified `fillvalue`.

:::

::: details How can `zip()` be used to create dictionaries?

`dict(zip())` is a common pattern used to create dictionaries on the fly by zipping two iterables together. The first iterable provides the keys, and the second iterable provides the values. For example, `dict(zip(["name", "age"], ("Alice", 30)))` creates the dictionary `{"name": "Alice", "age": 30}`.

:::

::: details Is `zip()` lazy in Python?

Yes, `zip()` is lazy in Python. It returns an iterator that generates tuples only as needed, rather than creating the entire list of tuples at once. This behavior is more memory efficient, especially when dealing with large datasets.

:::

::: details Is there an unzip function in Python?

No, there isn’t a direct `unzip()` function in Python, but you can achieve the same effect by using the unpacking operator `*` with `zip()`. For example, `zip(*zipped)` can be used to separate a list of tuples into individual sequences.

:::

::: details What can I use instead of `zip()` in Python?

If you need to handle iterables of unequal length and want to ensure that all elements are included, you can use `itertools.zip_longest()`. This function continues until the longest iterable is exhausted, filling missing values with a specified `fillvalue`.

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Parallel Iteration With Python's zip() Function - Real Python"
  desc="In this course, you'll learn how to use the Python zip() function to solve common programming problems. You'll learn how to traverse multiple iterables in parallel and create dictionaries with just a few lines of code."
  url="https://realpython.com/courses/python-zip-function/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-Python-Zip-with-Examples_Watermarked.3020903367b6.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using the Python zip() Function for Parallel Iteration",
  "desc": "In this step-by-step tutorial, you'll learn how to use the Python zip() function to solve common programming problems. You'll learn how to traverse multiple iterables in parallel and create dictionaries with just a few lines of code.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-zip-function.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
