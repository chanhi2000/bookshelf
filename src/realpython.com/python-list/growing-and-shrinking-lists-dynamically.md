---
lang: en-US
title: "Growing and Shrinking Lists Dynamically"
description: "Article(s) > (7/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (7/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Growing and Shrinking Lists Dynamically"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/growing-and-shrinking-lists-dynamically.html
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
  url="https://realpython.com/python-list#growing-and-shrinking-lists-dynamically"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

In Python lists, mutability goes beyond allowing you to modify the items in place. Because lists are mutable, you can change their length on the fly by adding or removing elements. So, lists are also variable-length containers, as you already learned.

Adding new items to a list or removing unneeded ones are everyday tasks. That’s why Python provides different efficient ways to perform these actions. Using the right tool for the job is an essential skill.

In the following sections, you’ll explore the different tools that Python offers to grow and shrink a list dynamically.

---

## Appending a Single Item at Once: `.append()`

The [**`.append()`**](/realpython.com/python-append.md) method is probably the most common tool that you’ll use to add items to an existing list. As its name suggests, this method allows you to append items to a list. The method takes one item at a time and adds it to the right end of the target list.

Here’s an example of how `.append()` works:

```py
pets = ["cat", "dog"]

pets.append("parrot")
pets
#
# ['cat', 'dog', 'parrot']

pets.append("gold fish")
pets
#
# ['cat', 'dog', 'parrot', 'gold fish']

pets.append("python")
pets
#
# ['cat', 'dog', 'parrot', 'gold fish', 'python']
```

In these examples, every call to `.append()` adds a new pet at the end of your list. This behavior allows you to gradually populate an empty list or to add items to an existing list, as you did in the example.

::: note

For a deep dive into how `.append()` works, check out [**Python’s `.append()`: Add Items to Your Lists in Place**](/realpython.com/python-append.md).

:::

Using `.append()` is equivalent to doing the following slice assignment:

```py
pets[len(pets):] = ["hawk"] 
pets
# 
# ['cat', 'dog', 'parrot', 'gold fish', 'python', 'hawk']
```

The slice assignment in this example grows your lists by appending a new item, `"hawk"`, after the current last item in `pets`. This technique works the same as `.append()`. However, using `.append()` leads to a more readable and explicit solution.

An important fact to keep in mind when using `.append()` is that this method adds only a single item at a time. That item could be of any data type, including another list:

```py
pets.append(["hamster", "turtle"])
pets
#
# [
#  'cat',
#  'dog',
#  'parrot',
#  'gold fish',
#  'python',
#  'hawk',
#  ['hamster', 'turtle'] ]
```

Note how the last item in `pets` is a list of two pets rather than two new independent pets. This behavior may be a source of subtle errors. To avoid problems, you must remember that `.append()` takes and adds a single item each time.

If you need to add several items from an iterable at the end of an existing list, then you can use the `.extend()` method, which you’ll expore in the following section.

---

## Extending a List With Multiple Items at Once: `.extend()`

When you’re working with lists, you may face the need to add multiple items to the right end of a list at once. Because this is such a common requirement, Python’s `list` has a dedicated method for that task.

The method is called `.extend()`. It takes an iterable of objects and appends them as individual items to the end of the target list:

```py
fruits = ["apple", "pear", "peach"]

fruits.extend(["orange", "mango", "banana"])
fruits
# 
# ['apple', 'pear', 'peach', 'orange', 'mango', 'banana']
```

The `.extend()` method unpacks the items in the input iterable and adds them one by one to the right end of your target list. Now `fruits` has three more items on its end.

You should note that `.extend()` can take any iterable as an argument. So, you can use tuples, strings, dictionaries and their components, iterators, and even sets. However, remember that if you use a set as an argument to `extend()`, then you won’t know the final order of items beforehand.

Again, you must note that `.extend()` is equivalent to the following slice assignment:

```py
fruits = ["apple", "pear", "peach"]

fruits[len(fruits):] = ["orange", "mango", "banana"]
fruits
# 
# ['apple', 'pear', 'peach', 'orange', 'mango', 'banana']
```

In this example, you use a slice assignment to add three items after the end of your original `fruits` list. Note that the result is the same as when you use `.extend()`. However, the `.extend()` variation is more readable and explicit.

---

## Inserting an Item at a Given Position: `.insert()`

The `.insert()` method is another tool that you can use to add items to an existing list. This method is a bit different from `.append()` and `.extend()`. Instead of adding items at the right end of the list, `.insert()` allows you to decide where you want to put your item. That said, `.insert()` takes two arguments:

1. `index`: the index at which you want to insert the item
2. `item`: the item that you need to insert into the list

When you insert an item at a given index, Python moves all the following items one position to the right in order to make space for the new item, which will take the place of the old item at the target index:

```py
letters = ["A", "B", "F", "G"]

letters.insert(2, "C")
letters
# 
# ['A', 'B', 'C', 'F', 'G']

letters.insert(3, "D")
letters
# 
# ['A', 'B', 'C', 'D', 'F', 'G']

letters.insert(4, "E")
letters
# 
# ['A', 'B', 'C', 'D', 'E', 'F', 'G']
```

In this example, you insert letters into specific positions in `letters`. You must insert one letter at a time because `.insert()` adds a single item in every call. To insert an item, the method shifts all the items starting from the target index to the right end of the list. This shifting makes space for the new item.

As an exercise, could you come up with a slice assignment that produces the same result as `.insert()`? Click the collapsible section below for the solution:

Slice assignment equivalent to `list_object.insert(index, item)`Show/Hide

Here’s the equivalent slicing of an insert operation:

```py
list_object[index:index] = [item]
```

This statement takes an empty slice from `list_object`. Why empty? Well, the slicing starts at `index` and stops at `index`. Because of this, the slice doesn’t include any items.

Then the statement assigns a one-item list to the empty slice. This action results in `item` being inserted at `index` in `list_object`. Go ahead and give it a try!

Now that you’ve learned how to add items to an existing list using different tools and techniques, it’s time to learn how to remove unneeded items from a list, which is another common task.

---

## Deleting Items From a List

Python also allows you to remove one or more items from an existing list. Again, deleting items from lists is such a common operation that the `list` class already has [<VPIcon icon="fa-brands fa-python"/>methods](https://docs.python.org/3/tutorial/datastructures.html#more-on-lists) to help you with that. You’ll have the following methods:

| Method | Description |
| --- | --- |
| `.remove(item)` | Removes the first occurrence of `item` from the list. It raises a [<VPIcon icon="fa-brands fa-python"/>`ValueError`](https://docs.python.org/3/library/exceptions.html#ValueError) if there’s no such item. |
| `.pop([index])` | Removes the item at `index` and returns it back to the caller. If you don’t provide a target `index`, then `.pop()` removes and returns the last item in the list. Note that the square brackets around `index` mean that the argument is optional. The brackets aren’t part of the syntax. |
| `.clear()` | Removes all items from the list. |

The `.remove()` method comes in handy when you want to remove an item from a list, but you don’t know the item’s index. If you have several items with the same value, then you can remove all of them by calling `.remove()` as many times as the item occurs:

```py
sample = [12, 11, 10, 42, 14, 12, 42]

sample.remove(42)
sample
# 
# [12, 11, 10, 14, 12, 42]

sample.remove(42)
sample
# 
# [12, 11, 10, 14, 12]

sample.remove(42)
# 
# Traceback (most recent call last):
#  ...
# ValueError: list.remove(x): x not in list
```

The first call to `.remove()` deletes the first instance of the number `42`. The second call removes the remaining instance of `42`. If you call `.remove()` with an item that’s not in the target list, then you get a `ValueError`.

The `.pop()` method allows you to remove and return a specific item using its index. If you call the method with no index, then it removes and returns the last item in the underlying list:

```py
to_visit = [
    "https://realpython.com",
    "https://python.org",
    "https://stackoverflow.com",
]

visited = to_visit.pop() >>> visited
#
# 'https://stackoverflow.com'
to_visit
#
# ['https://realpython.com', 'https://python.org']

visited = to_visit.pop(0) 
visited
#
# 'https://realpython.com'
to_visit
#
# ['https://python.org']

visited = to_visit.pop(-1) 
visited
#
# 'https://python.org'
to_visit
#
# []
```

In these examples, the first call to `.pop()` removes and returns the last site in your list of sites to visit. The second call removes and returns the first site, which is the site at index `0`.

Finally, you use `.pop()` with `-1` as an argument to emphasize that you can also use negative indices. This call removes and returns the last item. At the end of the process, your list of sites to visit is empty, pointing out that you’ve done all your planned visits.

Removing all the items from a list in one go can be another frequent task. In this case, Python also has you covered because `list` has a method called `.clear()`, which does exactly that. Consider the following example:

```py
cache = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
cache.clear()
cache
# 
# []
```

If you call `.clear()` on a non-empty list object, then you get the list content completely removed. This method can be useful when your lists work as a cache that you want to quickly clean for a restart.

The following slice assignment produces the same result as the `.clear()` method:

```py
cache = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
cache[:] = [] >>> cache
# 
# []
```

In this slice assignment, you assign an empty list to a slice that grabs the whole target list. Again, this syntax is less explicit and readable than using `.clear()`.

There’s still one more Python tool that you can use to remove one or more items from an existing list. Yes, that’s the [**`del` statement**](/realpython.com/python-del-statement.md). You can combine `del` with an indexing or slicing operation to remove an item or multiple items, respectively:

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

del colors[1]
colors
#
# ['red', 'yellow', 'green', 'blue', 'indigo', 'violet']

del colors[-1]
colors
#
# ['red', 'yellow', 'green', 'blue', 'indigo']

del colors[2:4]
colors
#
# ['red', 'yellow', 'indigo']

del colors[:]
colors
#
# []
```

With the first `del` statement, you remove the color at index `1`, which is `"orange"`. In the second `del`, you use a negative index of `-1` to remove the last color, `"violet"`. Next, you use a slice to remove `"green"` and `"blue"`.

::: note

To dive deeper into using the `del` statement, check out [**Python’s `del`: Remove References From Scopes and Containers**](/realpython.com/python-del-statement.md).

:::

In the final example, you use `del` and a slice to remove all the items from an existing list. That construct produces a result that’s equivalent to calling `.clear()` on your target list.

---

## Considering Performance While Growing Lists

When you create a list, Python allocates enough space to store the provided items. It also allocates extra space to host future items. When you use the extra space by adding new items to that list with `.append()`, `.extend()`, or `.insert()`, Python automatically creates room for additional new items.

This process is known as **resizing**, and while it ensures that the list can accept new items, it requires extra CPU time and additional memory. Why? Well, to grow an existing list, Python creates a new one with room for your current data and the extra items. Then it moves the current items to the new list and adds the new item or items.

Consider the following code to explore how Python grows a list dynamically:

```py
from sys import getsizeof

numbers = []
for value in range(100):
    print(getsizeof(numbers))
    numbers.append(value)
# 
# 56
# 88
# 88
# 88
# 88
# 120
# 120
# 120
# 120
# 184
# 184
# ...
```

In this code snippet, you first import [<VPIcon icon="fa-brands fa-python"/>`getsizeof()`](https://docs.python.org/3/library/sys.html#sys.getsizeof) from the [<VPIcon icon="fa-brands fa-python"/>`sys`](https://docs.python.org/3/library/sys.html#module-sys) module. This function allows you to get the size of an object in bytes. Then you define `numbers` as an empty list.

Inside the `for` loop, you get and [**print**](/realpython.com/python-print/README.md) your list object’s size in bytes. The first iteration shows that the size of your empty list is `56` bytes, which is the baseline size of every list in Python.

Next, the `.append()` method adds a new value to your list. Note how the size of `numbers` grows to `88` bytes. That’s the baseline size plus 32 additional bytes ($56+4\times{8}=88$), which represent four 8-byte [**pointers**](/realpython.com/pointers-in-python.md) or slots for future items. It means that Python went ahead and allocated space for four items when you added the first element.

As the loop goes, the size of `numbers` grows to `120` bytes, which is $88+4\times{8}=120$. This step allocates space for four more items. That’s why you get `120` four times on your screen.

If you follow the loop’s output, then you’ll notice that the next steps add room for eight extra items, then for twelve, then for sixteen, and so on. Every time Python resizes the list, it has to move all the items to the new space, which takes considerable time.

In practice, if you’re working with small lists, then the overall impact of this internal behavior is negligible. However, in performance-critical situations or when your lists are large, you may want to use more efficient data types, such as [**`collections.deque`**](/realpython.com/python-deque.md), for example.

Check out the [<VPIcon icon="fa-brands fa-python"/>time complexity Wiki page](https://wiki.python.org/moin/TimeComplexity) for a detailed summary of how time-efficient `list` operations are. For example, the `.append()` method has a time complexity of $O\left(1\right)$, which means that appending an item to a list takes constant time. However, when Python has to grow the list to make room for the new item, this performance will be a bit poorer.

Being aware of the time complexity of common list operations will significantly improve your ability to choose the right tool for the job, depending on your specific needs.
