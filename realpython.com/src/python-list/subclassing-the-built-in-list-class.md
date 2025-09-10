---
lang: en-US
title: "Subclassing the Built-In list Class"
description: "Article(s) > (13/15) Python's list Data Type: A Deep Dive With Examples"
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
      content: "Article(s) > (13/15) Python's list Data Type: A Deep Dive With Examples"
    - property: og:description
      content: "Subclassing the Built-In list Class"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/subclassing-the-built-in-list-class.html
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
  url="https://realpython.com/python-list#subclassing-the-built-in-list-class"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Pythons-list-Built-in-Data-Type-A-Deep-Dive-With-Examples_Watermarked.1f6291ed72f5.jpg"/>

Sometimes you may need to create a list-like class that either extends the features of `list` or customizes some of its standard behaviors. For a long time, it was impossible to inherit directly from built-in Python types implemented in [**C**](/realpython.com/c-for-python-programmers.md). Python 2.2 fixed this issue. Now you can [<VPIcon icon="fa-brands fa-python"/>subclass built-in types](https://docs.python.org/3/whatsnew/2.2.html#peps-252-and-253-type-and-class-changes), including `list`.

To understand how to do this, say that you’re working on an application to process and report your students’ grades. You want to create a list-like object to store the grades. Your custom list should have a method that computes the average grade. In this situation, you can create a `list` subclass like the following:

```py
class GradeList(list):
    def average(self):
        return sum(self) / len(self)

grades = GradeList([80, 97, 86, 100, 98])
grades.append(82)
grades.average()
#
# 90.5

grades[0] = 95
grades.average()
#
# 93.0
```

In this code snippet, you [**inherit**](/realpython.com/python-classes.md#using-inheritance-and-building-class-hierarchies) from `list` directly. You can instantiate `GradeList` with an iterable of grade values. Note that the class works as a regular list. You can use `list` methods, such as `.append()` and `.extend()`, do indexing and slicing, and so on.

Additionally, you have a new `.average()` method in the class. This method isn’t part of the standard functionality of a list. So, this method extends `list` with new functionality.

The above example is a relatively safe way to subclass `list` because it doesn’t touch on any standard behavior. In contrast, things get a bit trickier when you need to customize the standard `list` behaviors.

For example, say that you want to continue improving your `GradeList` class, and you’re thinking of adding some input validation functionality. You want your class to validate any input grade to make sure it’s a number between `1` and `100`.

In this situation, you need to make considerable changes to the standard functionality of `list`. You’ll need to modify all the methods that add new items to your lists. These methods include the following [**special methods**](/realpython.com/python-classes.md#special-methods-and-protocols):

- `.__init__()`, which initializes all the class’s new instances.
- `.__setitem__()`, which supports indexing operations.

You’ll also have to customize the [`.append()`](/realpython.com/python-list/growing-and-shrinking-lists-dynamically.md#appending-a-single-item-at-once-append), [`.extend()`](/realpython.com/python-list/growing-and-shrinking-lists-dynamically.md#extending-a-list-with-multiple-items-at-once-extend), and [`.insert()`](/realpython.com/python-list/growing-and-shrinking-lists-dynamically.md#inserting-an-item-at-a-given-position-insert) methods. Furthermore, if you want your class to validate the input when you run concatenations, then you’ll have to update other special methods, including [<VPIcon icon="fa-brands fa-python"/>`.__add__()`](https://docs.python.org/3/reference/datamodel.html#object.__add__), [`.__radd__()`](https://docs.python.org/3/reference/datamodel.html#object.__radd__), and [<VPIcon icon="fa-brands fa-python"/>`.__iadd__()`](https://docs.python.org/3/reference/datamodel.html#object.__iadd__).

Here’s a possible, yet minimal, update of your `GradeList` class:

```py :collapsed-lines title="grades.py"
class GradeList(list):
    def __init__(self, grades):
        grades = [self._validate(grade) for grade in grades]
        super().__init__(grades)

    def __setitem__(self, index, grade):
        if isinstance(index, slice):
            start, stop, step = index.indices(len(self))
            grades = [self._validate(grade) for grade in grade]
            return super().__setitem__(slice(start, stop, step), grades)
        super().__setitem__(index, self._validate(grade))

    def __add__(self, grades):
        grades = [self._validate(grade) for grade in grades]
        grades = super().__add__(grades)
        return self.__class__(grades)

    __radd__ = __add__

    def __iadd__(self, grades):
        grades = [self._validate(grade) for grade in grades]
        return super().__iadd__(grades)

    def append(self, grade):
        return super().append(self._validate(grade))

    def extend(self, grades):
        grades = [self._validate(grade) for grade in grades]
        return super().extend(grades)

    def average(self):
        return sum(self) / len(self)

    def _validate(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("grades must be numeric")
        if not (0 <= value <= 100):
            raise ValueError("grade must be between 0 and 100")
        return value
```

This class extends all the standard methods that add items to a regular list. All of these methods use the `._validate()` helper method to guarantee that the input grades are valid. The method checks whether the values are numbers. It also checks if they’re between `0` and `100`.

As you can conclude from the above code, modifying the standard behavior of a list in a subclass requires a lot of work, and it’s highly prone to errors.

Here are a few examples of how the above class works in practice:

```py :collapsed-lines
from grades import GradeList

grades = GradeList([80, 97, 86, 200])
#
# Traceback (most recent call last):
#  ...
# ValueError: grade must be between 0 and 100

grades = GradeList([80, 97, 86, 100])
grades.average()
#
# 90.75

grades[0] = 955
#
# Traceback (most recent call last):
#  ...
# ValueError: grade must be between 0 and 100

grades[0] = 95
grades
#
# [95, 97, 86, 100]

grades.append(-98)
#
# Traceback (most recent call last):
#  ...
# ValueError: grade must be between 0 and 100

grades.append(98)
grades
#
# [95, 97, 86, 100, 98]

grades += [88, 100]
grades
#
# [95, 97, 86, 100, 98, 88, 100]

grades[:3] = [100, 100, 100]
grades
#
# [100, 100, 100, 100, 98, 88, 100]

grades.average()
#
# 98.0
```

Great! Your `GradeList` class works as expected. It raises an exception whenever you try to introduce an invalid grade using any of the regular operations that add items to an existing list.

::: note

For a deeper dive into creating list-like classes, check out [**Custom Python Lists: Inheriting From `list` vs `UserList`**](/realpython.com/inherit-python-list.md).

:::

Subclassing the built-in `list` class can be both useful and challenging. While you can extend a list with relatively little effort, customizing its standard behavior comes with important challenges, as you learned in this section. So, before making the decision to subclass `list`, consider whether other techniques, such as [**composition**](/realpython.com/python-classes.md#composition), might be a better solution.
