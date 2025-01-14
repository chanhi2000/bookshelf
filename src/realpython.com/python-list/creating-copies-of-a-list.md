---
lang: en-US
title: "Creating Copies of a List"
description: "Article(s) > (5/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (5/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Creating Copies of a List"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/creating-copies-of-a-list.html
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
  url="https://realpython.com/python-list#creating-copies-of-a-list"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Creating copies of an existing list is a common need in Python code. Having a copy ensures that when you change a given list, that change doesn’t affect the original data or the data in other copies.

::: note

In Python, an object’s **identity** is a unique identifier that distinguishes it from other objects. You can use the built-in [<FontIcon icon="fa-brands fa-python"/>`id()`](https://docs.python.org/3/library/functions.html#id) function to get the identity of any Python object. In Python’s [**CPython implementation**](/realpython.com/cpython-source-code-guide.md), an object’s identity coincides with the memory address where the object is stored.

:::

In Python, you’ll have two kinds of mechanisms to create copies of an existing list. You can create either:

1. A **shallow** copy
2. A **deep** copy

Both types of copies have specific characteristics that will directly impact their behavior. In the following sections, you’ll learn how to create shallow and deep copies of existing lists in Python. First, you’ll take a glance at **aliases**, a related concept that can cause some confusion and lead to issues and bugs.

---

## Aliases of a List

In Python, you can create [**aliases**](/realpython.com/python-mutable-vs-immutable-types.md#aliasing-variables) of [**variables**](/realpython.com/python-variables.md) using the [**assignment operator**](/realpython.com/python-assignment-operator.md) (`=`). Assignments don’t create copies of objects in Python. Instead, they create bindings between the variable and the object involved in the assignment. Therefore, when you have several aliases of a given list, changes in an alias will affect the rest of the aliases.

To illustrate how you can create aliases and how they work, consider the following example:

```py
countries = ["United States", "Canada", "Poland", "Germany", "Austria"]

nations = countries >>> id(countries) == id(nations)
# 
# True

countries[0] = "United States of America" 
nations
# 
# ['United States of America', 'Canada', 'Poland', 'Germany', 'Austria']
```

In this code snippet, the first highlighted line creates `nations` as an alias of `countries`. Note how both variables point to the same object, which you know because the object’s identity is the same. In the second highlighted line, you update the object at index `0` in `countries`. This change reflects in the `nations` alias.

Assignment statements like the one in the first highlighted line above don’t create copies of the right-hand object. They just create aliases or variables that point to the same underlying object.

In general, aliases can come in handy in situations where you need to avoid name collisions in your code or when you need to adapt the names to specific naming patterns.

To illustrate, say that you have an app that uses your list of countries as `countries` in one part of the code. The app requires the same list in another part of the code, but there’s already a variable called `countries` with other content.

If you want both pieces of code to work on the same list, then you can use `nations` as an alias for `countries`. A handy way to do this would be to use the [**`as` keyword**](/realpython.com/python-assignment-operator.md#use-the-as-keyword) for creating the alias through an [**implicit assignment**](/realpython.com/python-assignment-operator.md#implicit-assignments-in-python), for example, when you [**import**](/realpython.com/python-import.md) the list from another [**module**](/realpython.com/python-modules-packages.md).

---

## Shallow Copies of a List

A **shallow copy** of an existing list is a new list containing references to the objects stored in the original list. In other words, when you create a shallow copy of a list, Python constructs a new list with a new identity. Then, it inserts references to the objects in the original list into the new list.

There are at least three different ways to create shallow copies of an existing list. You can use:

1. The slicing operator, `[:]`
2. The `.copy()` [**method**](/realpython.com/python-classes.md#providing-behavior-with-methods)
3. The [<FontIcon icon="fa-brands fa-python"/>`copy()`](https://docs.python.org/3/library/copy.html#copy.copy) function from the [<FontIcon icon="fa-brands fa-python"/>`copy`](https://docs.python.org/3/library/copy.html#module-copy) module

These three tools demonstrate equivalent behavior. So, to kick things off, you’ll start exploring the slicing operator:

```py
countries = ["United States", "Canada", "Poland", "Germany", "Austria"]

nations = countries[:] >>> nations
# 
# ['United States', 'Canada', 'Poland', 'Germany', 'Austria']

id(countries) == id(nations)
#
# False
```

The highlighted line creates `nations` as a shallow copy of `countries` by using the slicing operator with one colon only. This operation takes a slice from the beginning to the end of `countries`. In this case, `nations` and `countries` have different identities. They’re completely independent `list` objects.

However, the elements in `nations` are aliases of the elements in `countries`:

```py
id(nations[0]) == id(countries[0])
#
# True
id(nations[1]) == id(countries[1])
#
# True
```

As you can see, items under the same index in both `nations` and `countries` share the same object identity. This means that you don’t have copies of the items. You’re really sharing them. This behavior allows you to save some memory when working with lists and their copies.

Now, how would this impact the behavior of both lists? If you changed an item in `nations`, would the change reflect in `countries`? The code below will help you answer these questions:

```py
countries[0] = "United States of America"
countries
# 
# ['United States of America', 'Canada', 'Poland', 'Germany', 'Austria']

nations
# 
# ['United States', 'Canada', 'Poland', 'Germany', 'Austria']

id(countries[0]) == id(nations[0])
# 
# False
id(countries[1]) == id(nations[1])
# 
# True
```

On the first line of this piece of code, you update the item at index `0` in `countries`. This change doesn’t affect the item at index `0` in `nations`. Now the first items in the lists are completely different objects with their own identities. The rest of the items, however, continue to share the same identity. So, they’re the same object in each case.

Because making copies of a list is such a common operation, the `list` class has a dedicated method for it. The method is called `.copy()`, and it returns a shallow copy of the target list:

```py
countries = ["United States", "Canada", "Poland", "Germany", "Austria"]

nations = countries.copy() >>> nations
# 
# ['United States', 'Canada', 'Poland', 'Germany', 'Austria']

id(countries) == id(nations)
# 
# False
id(countries[0]) == id(nations[0])
# 
# True
id(countries[1]) == id(nations[1])
# 
# True

countries[0] = "United States of America"
countries
# 
# ['United States of America', 'Canada', 'Poland', 'Germany', 'Austria']
nations
#
# ['United States', 'Canada', 'Poland', 'Germany', 'Austria']
```

Calling `.copy()` on `countries` gets you a shallow copy of this list. Now you have two different lists. However, their elements are common to both. Again, if you change an element in one of the lists, then the change won’t reflect in the copy.

You’ll find yet another tool for creating shallow copies of a list. The `copy()` function from the `copy` module allows you to do just that:

```py
from copy import copy

countries = ["United States", "Canada", "Poland", "Germany", "Austria"]

nations = copy(countries)
nations
# 
# ['United States', 'Canada', 'Poland', 'Germany', 'Austria']

id(countries) == id(nations)
# 
# False
id(countries[0]) == id(nations[0])
# 
# True
id(countries[1]) == id(nations[1])
# 
# True

countries[0] = "United States of America"
countries
# 
# ['United States of America', 'Canada', 'Poland', 'Germany', 'Austria']
nations
# 
# ['United States', 'Canada', 'Poland', 'Germany', 'Austria']
```

When you feed `copy()` with a mutable container data type, such as a list, the function returns a shallow copy of the input object. This copy behaves the same as the previous shallow copies that you’ve built in this section.

---

## Deep Copies of a List

Sometimes you may need to build a complete copy of an existing list. In other words, you want a copy that creates a new list object and also creates new copies of the contained elements. In these situations, you’ll have to construct what’s known as a **deep copy**.

When you create a deep copy of a list, Python constructs a new list object and then inserts copies of the objects from the original list [**recursively**](/realpython.com/python-thinking-recursively.md).

To create a deep copy of an existing list, you can use the [<FontIcon icon="fa-brands fa-python"/>`deepcopy()`](https://docs.python.org/3/library/copy.html#copy.deepcopy) function from the `copy` module. Here’s an example of how this function works:

```py
from copy import deepcopy

matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
matrix_copy = deepcopy(matrix) 
id(matrix) == id(matrix_copy)
#
# False
id(matrix[0]) == id(matrix_copy[0])
# 
# False
id(matrix[1]) == id(matrix_copy[1])
# 
# False
```

In this example, you create a deep copy of your `matrix` list. Note how both the lists and their sibling items have different identities.

Why would you need to create a deep copy of `matrix`, anyway? For example, if you only create a shallow copy of `matrix`, then you can face some issues when trying to mutate the nested lists:

```py
from copy import copy

matrix_copy = copy(matrix)
matrix_copy[0][0] = 100
matrix_copy[0][1] = 200
matrix_copy[0][2] = 300
matrix_copy
#
# [[100, 200, 300], [4, 5, 6], [7, 8, 9]] 
matrix
#
# [[100, 200, 300], [4, 5, 6], [7, 8, 9]]
```

In this example, you create a shallow copy of `matrix`. If you change items in a nested list within `matrix_copy`, then those changes affect the original data in `matrix`. The way to avoid this behavior is to use a deep copy:

```py
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

matrix_copy = deepcopy(matrix)
matrix_copy[0][0] = 100
matrix_copy[0][1] = 200
matrix_copy[0][2] = 300
matrix_copy
#
# [[100, 200, 300], [4, 5, 6], [7, 8, 9]] 
matrix
#
# [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

Now the changes in `matrix_copy` or any other deep copy don’t affect the content of `matrix`, as you can see on the highlighted lines.

Finally, it’s important to note that when you have a list containing immutable objects, such as numbers, strings, or tuples, the behavior of `deepcopy()` mimics what `copy()` does:

```py
countries = ["United States", "Canada", "Poland", "Germany", "Austria"]
nations = deepcopy(countries)

id(countries) == id(nations)
# 
# False
id(countries[0]) == id(nations[0])
# 
# True
id(countries[1]) == id(nations[1])
# 
# True
```

In this example, even though you use `deepcopy()`, the items in `nations` are aliases of the items in `countries`. That behavior makes sense because you can’t change immutable objects in place. Again, this behavior optimizes the memory consumption of your code when you’re working with multiple copies of a list.
