---
lang: en-US
title: "Putting Lists Into Action"
description: "Article(s) > (14/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (14/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Putting Lists Into Action"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/putting-lists-into-action.html
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
  url="https://realpython.com/python-list#putting-lists-into-action"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

So far, you’ve learned a ton about Python lists, their features, and their functionalities. You’ve dived into how to create new lists, make copies of existing lists, add items to your lists, traverse existing lists in a loop or a similar tool, create custom list-like classes, and much more.

Now you have all the required knowledge about lists to effectively solve common practical Python coding problems with them. In the following sections, you’ll code a few examples to help you solidify your new knowledge and understand how to use lists in real life.

---

## Removing Repeated Items From a List

Removing repeated items from an existing list is often a requirement in Python. You’ll probably manage to figure out several approaches to this problem. Using a `set` object could be one of them because sets don’t allow repeated items. So, you can do something like this:

```py
list(set([2, 4, 5, 2, 3, 5]))
#
# [2, 3, 4, 5]
```

This solution works because you get a new list of unique values. However, Python sets don’t necessarily keep the contained items in order. So, you may want to use another technique that preserves the original insertion order.

Arguably, the safest way to tackle the problem of removing repeated items from a list is to create a new list with unique values out of the original list. You can do this in a function like the following:

```py
def get_unique_items(list_object):
    result = []
    for item in list_object:
        if item not in result:
            result.append(item)
    return result

get_unique_items([2, 4, 5, 2, 3, 5])
#
# [2, 4, 5, 3]
```

In this function, you accept a list as an argument. Then you define a new empty list to store the function’s result. In the loop, you iterate over the items in the input list. The conditional checks if the current item is absent in `result`. If that’s the case, then you add the item using `.append()`. Once the loop has finished, you return the resulting list, which will contain unique values.

Note that using the `not in` operator on larger lists can be too slow due to its linear time complexity. If that’s the case, then you may want to introduce an additional helper variable to hold copies of the unique values in a Python `set`:

```py
def get_unique_items(list_object):
    result = []
    unique_items = set()
    for item in list_object:
        if item not in unique_items:
            result.append(item)
            unique_items.add(item)
    return result

len(get_unique_items(range(100_000)))
#
# 100000
```

You use the set to quickly determine if the given value is already present. Sets implement the `in` and `not in` operators differently, making them much faster than their list counterparts. While this functions returns instantaneously, it requires twice as much memory because you’re now storing every value in two places.

---

## Creating Multidimensional Lists

Creating a multidimensional list, such as a matrix or a list of lists, might also be a common requirement in your code. Again, you can tackle this problem in many different ways, depending on your specific needs.

A quick and safe way to create a multidimensional list is using a `for` loop or a comprehension. For example, say that you want to create a five-by-five matrix of numeric values, and you want to initialize all the values to `0`. You can do something like this:

```py
matrix = []
for row in range(5):
    matrix.append([])
    for _ in range(5):
        matrix[row].append(0)

matrix
# 
# [
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0]
# ]
```

In this example, you first create an empty list to store your matrix. Then you start a `for` loop that will run five times. In each iteration, you add a new empty list. So, your matrix will have five rows. Next, you start a nested loop that runs five times too.

Each time, you add a `0` to the current row using `.append()`. As a result, you get a five-by-five matrix with all its values initialized to `0`.

::: note

In Python, you commonly use an underscore (`_`) as a placeholder variable when the syntax requires a variable, but your code doesn’t.

:::

You can get the same result as in the example above with a list comprehension like the following:

```py
[[0 for _ in range(5)] for _ in range(5)]
#
# [
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0]
# ]
```

In this example, you use a list comprehension whose expression is another list comprehension. The inner comprehension provides the nested lists, while the outer comprehension builds the matrix.

You can make the above comprehension even more concise and readable by taking advantage of the repetition operator (`*`) as in the following code:

```py
[[0] * 5 for _ in range(5)]
#
# [
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0]
# ]
```

This new version of your list comprehension is way more readable than the previous one. It takes advantage of the repetition operator to build the rows of your matrix. This example might it seem like the following would work:

```py
[[0] * 5] * 5
#
# [
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0]
# ]
```

This output looks like what you need. It’s a list containing five nested lists. However, this resulting matrix internally works pretty differently from all the previous solutions. If you change one value in a given row, then the change will reflect in all the other rows:

```py
matrix = [[0] * 5] * 5
matrix
#
# [
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0],
#  [0, 0, 0, 0, 0]
# ]

matrix[0][0] = 1
matrix
#
# [
#  [1, 0, 0, 0, 0],
#  [1, 0, 0, 0, 0],
#  [1, 0, 0, 0, 0],
#  [1, 0, 0, 0, 0],
#  [1, 0, 0, 0, 0]
# ]
```

In this example, you try to change the value of the first item in the first nested list or row. However, you actually changed the first value in all the rows. When you pass a list as an argument to the repetition operator, you get aliases of the list instead of copies. So, all the rows in your matrix are actually the same list.

---

## Flattening Multidimensional Lists

Sometimes, you may need to process data that comes as a list of nested lists. Flattening this data into a one-dimensional list may be a common requirement in those scenarios. By flattening a list, you convert a multidimensional list, such as a matrix, into a one-dimensional list.

::: note

To dive deeper into how to flatten a list of lists, check out [**How to Flatten a List of Lists in Python**](/realpython.com/python-flatten-list.md).

:::

For example, suppose that you have the following list of lists:

```py
[[0, 1, 2], [10, 11, 12], [20, 21, 22]]
```

Processing this list may be annoying because of its nested structure. So you need to flatten the list and get the following list instead:

```py
[0, 1, 2, 10, 11, 12, 20, 21, 22]
```

How would you do this in Python? You’ll find several solutions to this problem for sure. In the code snippet below, you have one of them:

```py
matrix = [[0, 1, 2], [10, 11, 12], [20, 21, 22]]

flattened_list = []
for row in matrix:
    flattened_list.extend(row)

flattened_list
#
# [0, 1, 2, 10, 11, 12, 20, 21, 22]
```

In the `for` loop above, you iterate over the nested lists in `matrix`. Then you use the `.extend()` method to add the current sublist’s contents to `flattened_list` as independent items. This loop produces a flattened list as a result.

---

## Splitting Lists Into Chunks

Another useful list-related skill is to split an existing list into a certain number of chunks. This skill comes in handy when you need to distribute the workload across multiple [**threads**](/realpython.com/intro-to-python-threading.md) or [**processes**](/realpython.com/python-subprocess.md) for [**concurrent**](/realpython.com/python-concurrency.md#what-is-concurrency) processing.

::: note

For a complete walk-through of splitting a list or iterable into chunks, check out [**How to Split a Python List or Iterable Into Chunks**](/realpython.com/how-to-split-a-python-list-into-chunks.md).

:::

Again, you’ll find multiple solutions to this problem. The code below shows just one of them. Note that you won’t be using any standard-library or third-party specialized tool. You’ll code the solution based on your knowledge about lists:

```py
def split_list(list_object, chunk_size):
    chunks = []
    for start in range(0, len(list_object), chunk_size):
        stop = start + chunk_size
        chunks.append(list_object[start:stop])
    return chunks

split_list([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)
#
# [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

In this function, you take the list to split and the number of items in every resulting chunk. Then you define a new empty list to store the chunks. The `for` loop iterates over a range of indices that goes from `0` to the length of your input list. Every iteration jumps through the desired chunk size.

To extract the chunks, you use a slicing operation. The loop variable, `start`, defines the start index, while the `stop` variable provides the stop index. Then you append every chunk to your `chunks` list, and that’s it.

---

## Using a List as a Stack or Queue

You can use a Python list to emulate a stack or queue data structure. The `.append()` and `.pop()` methods will help you in that task. For example, to mimic a stack, or [**last-in-first-out (LIFO)**](/realpython.com/queue-in-python.md#stack-last-in-first-out-lifo) data structure, you can use `.append()` to push an item onto the top of the stack. Similarly, you can use `.pop()` with no arguments to pop items from the top of the stack:

```py
stack = []

stack.append("Copy")
stack.append("Paste")
stack.append("Remove")
stack
#
# ['Copy', 'Paste', 'Remove']

stack.pop()
#
# 'Remove'
stack.pop()
#
# 'Paste'
stack.pop()
#
# 'Copy'
stack
#
# []
```

In this example, you represent a stack using a list. The stack will hold actions that you can undo. You start by creating an empty list called `stack`. Then you push hypothetical actions onto the stack using `.append()`, which adds the actions to the right end of the list.

The `.pop()` method returns the actions so that you can redo them. This method also removes the actions from the right end of the list following the LIFO order that distinguishes a stack data structure.

::: note

For a deep dive into what stacks are and how to create them in Python, check out [**How to Implement a Python Stack**](/realpython.com/how-to-implement-python-stack.md).

:::

Alternatively, if you want to emulate a queue, or a [**first-in-first-out (FIFO)**](/realpython.com/queue-in-python.md#queue-first-in-first-out-fifo) data structure, then you can use `.append()` to place items at the end of the list, which is known as an **enqueue** operation. Similarly, you can use `.pop()` with `0` as an argument to return and remove items from the left end of the queue, which is known as a **dequeue**:

```py
queue = []

queue.append("John")
queue.append("Jane")
queue.append("Linda")
queue
#
# ['John', 'Jane', 'Linda']
queue.pop(0)
#
# 'John'
queue.pop(0)
#
# 'Jane'
queue.pop(0)
#
# 'Linda'
```

This list simulates a queue of people who may be arriving at a place to get some service. The `.append()` method allows you to add people to the end of the queue as they arrive. The `.pop()` method with `0` as an argument allows you to process people from the beginning of the queue when it’s their turn to access the service. Overall, you’re following the FIFO principle that rules queues.

::: note

**Note:** Check out [**Python Stacks, Queues, and Priority Queues in Practice**](/realpython.com/queue-in-python.md) for a complete walk-through of stacks and queues in Python.

:::

By using a Python list, you can quickly take advantage of the standard list functionality to provide basic stack and queue operations, such as push, pop, enqueue, and dequeue. However, keep in mind that even though lists can help you simulate stacks and queues, they aren’t optimized for these use cases. Using a list as a queue is especially bad because it can make the queue [**terribly slow**](/realpython.com/python-data-structures.md#list-terribly-sloooow-queues).
