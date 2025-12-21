---
lang: en-US
title: "Defining Strict Constants in Python"
description: "Article(s) > (7/7) Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > (7/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Defining Strict Constants in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/defining-strict-constants-in-python.html
next: /realpython.com/python-constants/README.md#conclusion
date: 2025-01-19
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Constants: Improve Your Code's Maintainability",
  "desc": "In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability.",
  "link": "/realpython.com/python-constants/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Constants: Improve Your Code's Maintainability"
  desc="In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability."
  url="https://realpython.com/python-constants#defining-strict-constants-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

Up to this point, you’ve learned a lot about programming and Python constants. You now know that Python doesn’t support strict constants. It just has variables. Therefore, the Python community has adopted the naming convention of using uppercase letters to communicate that a given variable is really a constant.

So, in Python, you don’t have constants. Rather, you have variables that never change. This can be an issue if you’re working on a large Python project with many programmers at different levels. In this situation, it’d be nice to have a mechanism that guarantees **strict constants**— constants that no one can change after the program has started.

Because Python is a pretty flexible programming language, you’ll find several ways to achieve the goal of making your constant unchangeable. In the following few sections, you’ll learn about some of these ways. They all imply creating a custom class and using it as a namespace for constants.

Why should you use a class as the namespace for your constants? In Python, any name can be rebound at will. At the module level, you don’t have the appropriate tools to prevent this from happening. So, you need to use a class because classes provide way more customization tools than modules.

In the following sections, you’ll learn about several different ways to use a class as your namespace for strict constants.

---

## The `.__slots__` Attribute

Python classes allow you to define a special class attribute called [<VPIcon icon="fa-brands fa-python"/>`.__slots__`](https://docs.python.org/3/reference/datamodel.html#object.__slots__). This attribute will hold a sequence of names that’ll work as instance attributes.

You won’t be able to add new instance attribute to a class with a `.__slots__` attribute, because `.__slots__` prevents the creation of an instance [<VPIcon icon="fa-brands fa-python"/>`.__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__) attribute. Additionally, not having a `.__dict__` attribute implies an optimization in terms of memory consumption.

Using `.__slots__`, you can create a class that works as a namespace for read-only constants:

```py
class ConstantsNamespace:
    __slots__ = ()
    PI = 3.141592653589793
    EULER_NUMBER = 2.718281828459045


constants = ConstantsNamespace()

constants.PI
#
# 3.141592653589793
constants.EULER_NUMBER
#
# 2.718281828459045

constants.PI = 3.14
#
# Traceback (most recent call last):
#  ...
# AttributeError: 'ConstantsNamespace' object attribute 'PI' is read-only
```

In this example, you define `ConstantsNamespace`. The class’s `.__slots__` attribute holds an empty [**tuple**](/realpython.com/python-tuple.md), meaning that instances of this class will have no attributes. Then you define your constants as class attributes.

The next step is to instantiate the class to create a variable holding the namespace with all your constants. Note that you can quickly access any constant in your special namespace, but you can’t assign it a new value. If you try to do it, then you get an `AttributeError`.

With this technique, you’re guaranteeing that no one else on your team can change the value of your constants. You’ve achieved the expected behavior of a strict constant.

---

## The `@property` Decorator

You can also take advantage of the [**`@property`**](/realpython.com/python-property.md) [**decorator**](/realpython.com/primer-on-python-decorators.md) to create a class that works as a namespace for your constants. To do this, you just need to define your constants as properties without providing them with a setter method:

```py :collapsed-lines
class ConstantsNamespace:
    @property
    def PI(self):
        return 3.141592653589793
    @property
    def EULER_NUMBER(self):
        return 2.718281828459045

constants = ConstantsNamespace()

constants.PI
#
# 3.141592653589793
constants.EULER_NUMBER
#
# 2.718281828459045

constants.PI = 3.14
#
# Traceback (most recent call last):
#  ...
# AttributeError: can't set attribute 'PI'
```

Because you don’t provide setter methods for the `PI` and `EULER_NUMBER` properties, they’re [**read-only properties**](/realpython.com/python-property.md#providing-read-only-attributes). This means that you can only *access* their values. It’s impossible to assign a new value to either one. If you try to do it, then you get an `AttributeError`.

---

## The `namedtuple()` Factory Function

Python’s [<VPIcon icon="fa-brands fa-python"/>`collections`](https://docs.python.org/3/library/collections.html#module-collections) module provides a [<VPIcon icon="fa-brands fa-wikipedia-w"/>factory function](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)) called [<VPIcon icon="fa-brands fa-python"/>`namedtuple()`](https://docs.python.org/3/library/collections.html#collections.namedtuple). This function lets you create **tuple subclasses** that allow the use of **named fields** and the **dot notation** to access their items, like in `tuple_obj.attribute`.

Like regular tuples, named tuple instances are [<VPIcon icon="fa-brands fa-python"/>immutable](https://docs.python.org/3/glossary.html#term-immutable), which implies that you can’t modify an existing named tuple object [<VPIcon icon="fa-brands fa-wikipedia-w"/>in place](https://en.wikipedia.org/wiki/In-place_algorithm). Being immutable sounds appropriat 

Here’s how to do it:

```py
from collections import namedtuple

ConstantsNamespace = namedtuple(
    "ConstantsNamespace", ["PI", "EULER_NUMBER"]
)
constants = ConstantsNamespace(3.141592653589793, 2.718281828459045)

constants.PI
#
# 3.141592653589793
constants.EULER_NUMBER
#
# 2.718281828459045

constants.PI = 3.14
#
# Traceback (most recent call last):
#  ...
# AttributeError: can't set attribute
```

In this example, your constants play the role of fields in the underlying named tuple, `ConstantsNamespace`. Once you’ve created the named tuples instance, `constants`, you can access your constants by using the dot notation, like in `constants.PI`.

Because tuples are immutable, there’s no way for you to modify the value of any field. So, your `constants` named tuple object is a full-fledged namespace of strict constants.

---

## The `@dataclass` Decorator

[**Data classes**](/realpython.com/python-data-classes.md) are classes that contain mainly data, as their name indicates. They can also have methods, but that’s not their primary goal. To create a data class, you need to use the [<VPIcon icon="fa-brands fa-python"/>`@dataclass`](https://docs.python.org/3/library/dataclasses.html#dataclasses.dataclass) decorator from the [<VPIcon icon="fa-brands fa-python"/>`dataclasses`](https://docs.python.org/3/library/dataclasses.html#module-dataclasses) module.

How can you use this type of class to create a namespace of strict constants? The `@dataclass` decorator accepts a `frozen` argument that allows you to mark your data class as immutable. If it’s immutable, then once you’ve created an instance of a given data class, you have no way to modify its instance attributes.

Here’s how you can use a data class to create a namespace containing your constants:

```py
from dataclasses import dataclass

@dataclass(frozen=True)
class ConstantsNamespace:
    PI = 3.141592653589793
    EULER_NUMBER = 2.718281828459045

constants = ConstantsNamespace()

constants.PI
#
# 3.141592653589793
constants.EULER_NUMBER
#
# 2.718281828459045

constants.PI = 3.14
# 
# Traceback (most recent call last):
#  ...
# dataclasses.FrozenInstanceError: cannot assign to field 'PI'
```

In this example, you first import the `@dataclass` decorator. Then you use this decorator to turn `ConstantsNamespace` into a data class. To make the data class immutable, you set the `frozen` argument to `True`. Finally, you define `ConstantsNamespace` with your constants as class attributes.

You can create an instance of this class and use it as your constants namespace. Again, you can access all the constants, but you can’t modify their values, because the data class is frozen.

---

## The `.__setattr__()` Special Method

Python classes let you define a [**special method**](/realpython.com/python-classes.md#special-methods-and-protocols) called [<VPIcon icon="fa-brands fa-python"/>`.__setattr__()`](https://docs.python.org/3/reference/datamodel.html#object.__setattr__). This method allows you to customize the attribute assignment process because Python automatically calls the method on every attribute assignment.

In practice, you can override `.__setattr__()` to prevent all attribute reassignments and make your attributes immutable. Here’s how you can override this method to create a class that works as a namespace for your constants:

```py
class ConstantsNamespace:
    PI = 3.141592653589793
    EULER_NUMBER = 2.718281828459045
    def __setattr__(self, name, value):
        raise AttributeError(f"can't reassign constant '{name}'")

constants = ConstantsNamespace()

constants.PI
#
# 3.141592653589793
constants.EULER_NUMBER
#
# 2.718281828459045

constants.PI = 3.14
#
# Traceback (most recent call last):
#  ...
# AttributeError: can't reassign constant 'PI'
```

Your custom implementation of `.__setattr__()` doesn’t perform any assignment operation on the class’s attributes. It just raises an `AttributeError` when you try to set any attribute. This implementation makes the attributes immutable. Again, your `ConstantsNamespace` behaves as a namespace for constants.
