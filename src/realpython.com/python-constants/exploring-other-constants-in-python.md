---
lang: en-US
title: "Exploring Other Constants in Python"
description: "Article(s) > (5/7) Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > (5/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Exploring Other Constants in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/exploring-other-constants-in-python.html
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
  url="https://realpython.com/python-constants#exploring-other-constants-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

Apart from user-defined constants, Python also defines several internal names that can be considered as constants. Some of these names are strict constants, meaning that you can’t change them once the interpreter is running. This the case for the [**`__debug__`**](/realpython.com/python-assert-statement.md#understanding-the-__debug__-built-in-constant) constant, for example.

In the following sections, you’ll learn about some internal Python names that you can consider and should treat as constants in your code. To kick things off, you’ll review some built-in constants and constant values.

---

## Built-in Constants

According to the Python documentation, [<FontIcon icon="fas fa-python"/>“A small number of constants live in the built-in namespace”](https://docs.python.org/3/library/constants.html). The first two constants listed in the docs are `True` and `False`, which are the Python [**Boolean**](/realpython.com/python-boolean.md) values. These two values are also instances of `int`. `True` has a value of `1`, and `False` has a value of `0`:

```py
True
#
# True
False
#
# False

isinstance(True, int)
#
# True
isinstance(False, int)
#
# True

int(True)
#
# 1
int(False)
#
# 0

True = 42
#
# ...
# SyntaxError: cannot assign to True

True is True
#
# True
False is False
#
# True
```

Note that the `True` and `False` names are strict constants. In other words, they can’t be reassigned. If you try to reassign them, then you get a [**`SyntaxError`**](/realpython.com/invalid-syntax-python.md). These two values are also singleton objects in Python, meaning that there’s only one instance of each. That’s why the [**identity operator**](/realpython.com/python-is-identity-vs-equality.md) (`is`) returns `True` in the final examples above.

Another important and commonplace constant value is [**`None`**](/realpython.com/null-in-python.md), which is the null value in Python. This constant value comes in handy when you want to express the idea of [<FontIcon icon="fa-brands fa-wikipedia-w"/>nullability](https://en.wikipedia.org/wiki/Nullable_type). Just like `True` and `False`, `None` is also a singleton and strict constant object that can’t be reassigned:

```py
None is None
#
# True

None = 42
#
# ...
# SyntaxError: cannot assign to None
```

`None` is quite useful as a default argument value in functions, methods, and class constructors. It’s typically used to communicate that a variable is empty. Internally, Python uses `None` as the implicit return value of functions that don’t have an [**explicit `return` statement**](/realpython.com/python-return-statement.md#explicit-return-statements).

The ellipsis literal (`...`) is another constant value in Python. This special value is the same as [**`Ellipsis`**](/realpython.com/python-ellipsis.md) and is the only instance of the [<FontIcon icon="fa-brands fa-python"/>`types.EllipsisType`](https://docs.python.org/3/library/types.html#types.EllipsisType) type:

```py
Ellipsis
# 
# Ellipsis

...
# 
# Ellipsis

... is Ellipsis
# 
# True
```

You can use `Ellipsis` as a placeholder for unwritten code. You can also use it to replace the [**`pass`**](/realpython.com/python-pass.md) statement. In type hints, the `...` literal communicates the idea of an [<FontIcon icon="fas fa-globe"/>unknown-length collection](https://mypy.readthedocs.io/en/stable/builtin_types.html#generic-types) of data with a uniform type:

```py
def do_something():
    ...  # TODO: Implement this function later


class CustomException(Exception): ...

raise CustomException("some error message")
# 
# Traceback (most recent call last):
#  ...
# CustomException: some error message

# A tuple of integer values
numbers: tuple[int, ...]
```

The `Ellipsis` constant value can come in handy in many situations and help you make your code more readable because of its semantic equivalence to the English ellipsis punctuation sign (…).

Another interesting and potentially useful built-in constant is `__debug__`, as you already learned at the beginning of this section. Python’s `__debug__` is a Boolean constant that defaults to `True`. It’s a strict constant because you can’t change its value once your interpreter is running:

```py
__debug__
# 
# True

__debug__ = False
# 
#  ...
# SyntaxError: cannot assign to __debug__
```

The `__debug__` constant is closely related to the [**`assert`**](/realpython.com/python-assert-statement.md) statement. In short, if `__debug__` is `True`, then all your `assert` statements will run. If `__debug__` is `False`, then your `assert` statements will be disabled and won’t run at all. This feature can slightly improve the performance of your production code.

::: note

Even though `__debug__` also has a dunder name, it’s a strict constant because you can’t change its value once the interpreter is running. In contrast, the internal dunder names in the section below should be treated as constants but aren’t strict constants. You can change their values during your code’s execution. However, this practice can be tricky and would require advanced knowledge.

:::

To change the value of `__debug__` to `False`, you must run Python in **optimized mode** by using the [<FontIcon icon="fa-brands fa-python"/>`-O`](https://docs.python.org/3/using/cmdline.html#cmdoption-O) or [<FontIcon icon="fa-brands fa-python"/>`-OO`](https://docs.python.org/3/using/cmdline.html#cmdoption-OO) command-line options, which provide two levels of [<FontIcon icon="fa-brands fa-python"/>bytecode](https://docs.python.org/3/glossary.html#term-bytecode) optimization. Both levels generate an optimized Python bytecode that doesn’t contain assertions.

---

## Internal Dunder Names

Python also has a broad set of internal dunder names that you can consider as constants. Because there are several of these special names, you’ll just learn about [<FontIcon icon="fa-brands fa-python"/>`__name__`](https://docs.python.org/3/reference/import.html#name__) and [<FontIcon icon="fa-brands fa-python"/>`__file__`](https://docs.python.org/3/reference/import.html#file__) in this tutorial.

::: note

To dive deeper into other dunder names in Python and what they mean to the language, check out the official documentation about Python’s [<FontIcon icon="fa-brands fa-python"/>data model](https://docs.python.org/3/reference/datamodel.html#data-model).

:::

The `__name__` attribute is closely related to how you run a given piece of code. When importing a module, Python internally sets `__name__` to a string containing the name of the module that you’re importing.

Fire up your [**code editor**](/realpython.com/python-ides-code-editors-guide.md) and create the following sample module:

```py title="sample_name.py"
print(f"The type of __name__ is: {type(__name__)}")
print(f"The value of __name__ is: {__name__}")
```

Once you have this file in place, get back to your command-line window and run the following command:

```sh
python -c "import sample_name"
# 
# The type of __name__ is: <class 'str'>
# The value of __name__ is: sample_name
```

With the `-c` switch, you can execute a small piece of Python code at the command line. In this example, you import the `sample_name` module, which [**prints**](/realpython.com/python-print/README.md) some messages to the screen. The first message tells you that `__name__` is of type [<FontIcon icon="fa-brands fa-python"/>`str`](https://docs.python.org/3/library/stdtypes.html#str), or string. The second message shows that `__name__` was set to `sample_name`, which is the name of the module you just imported.

Alternatively, if you take <FontIcon icon="fa-brands fa-python"/>`sample_name.py` and [**run it as a script**](/realpython.com/run-python-scripts.md), then Python will set [**`__name__` to the `"__main__"`**](/realpython.com/if-name-main-python.md) string . To confirm this fact, go ahead and run the following command:

```sh
python sample_name.py
# 
# The type of __name__ is: <class 'str'>
# The value of __name__ is: __main__
```

Note that now `__name__` holds the `"__main__"` string. This behavior indicates that you’ve run the file directly as an executable Python program.

The `__file__` attribute will contain the path to the file that Python is currently importing or executing. You can use `__file__` from inside a given module when you need to get the path to the module itself.

As an example of how `__file__` works, go ahead and create the following module:

```py title="sample_file.py"
print(f"The type of __file__ is: {type(__file__)}")
print(f"The value of __file__ is: {__file__}")
```

If you import the `sample_file` module in your Python code, then `__file__` will store the path to its containing module on your file system. Check this out by running the following command:

```sh
python -c "import sample_file"
#
# The type of __file__ is: <class 'str'>
# The value of __file__ is: /path/to/sample_file.py
```

Likewise, if you run <FontIcon icon="fa-brands fa-python"/>`sample_file.py` as a Python executable program, then you get the same output as before:

```sh
python sample_file.py
# 
# The type of __file__ is: <class 'str'>
# The value of __file__ is: /path/to/sample_file.py
```

In short, Python sets `__file__` to contain the path to the module from which you’re using or accessing this attribute.

---

## Useful String and Math Constants

You’ll find many useful constants in the standard library. Some of them are tightly connected to some specific modules, functions, and classes. Others are more generic, and you can use them in various scenarios. That’s the case with some math and string-related constants that you can find in the [**`math`**](/realpython.com/python-math-module.md) and [<FontIcon icon="fa-brands fa-python"/>`string`](https://docs.python.org/3/library/string.html#module-string) modules, respectively.

The `math` module provides the following constants:

```py
import math

# Euler's number (e)
math.e
#
# 2.718281828459045

# Pi (π)
math.pi
#
# 3.141592653589793

# Infinite (∞)
math.inf
#
# inf

# Not a number (NaN)
math.nan
#
# nan

# Tau (τ)
math.tau
#
# 6.283185307179586
```

These constants will come in handy whenever you’re writing math-related code or even code that just uses them to perform specific computations, like your `Circle` class back in the [Reusing Objects for Maintainability](/realpython.com/python-constants/putting-constants-into-action.md#reusing-objects-for-maintainability) section.

Here’s an updated implementation of `Circle` using `math.pi` instead of your custom `PI` constant:

```py{1,8,10,12} title="circle.py"
import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius**2 
    def perimeter(self):
        return 2 * math.pi * self.radius 
    def projected_volume(self):
        return 4/3 * math.pi * self.radius**3 
    def __repr__(self):
        return f"{self.__class__.__name__}(radius={self.radius})"
```

This updated version of `Circle` is more readable than your original version because it provides more context on where the Pi constant comes from, making it clear that it’s a math-related constant.

The `math.pi` constant also has the advantage that if you’re using an older version of Python, then you’ll get a 32-bit version of Pi. In contrast, if you use `Circle` in a modern version of Python, then you’ll get a 64-bit version of Pi. So, your program will self-adapt to its concrete execution environment.

The `string` module also defines several useful [<FontIcon icon="fa-brands fa-python"/>string constants](https://docs.python.org/3/library/string.html#string-constants). The table below shows the name and value of each constant:

| Name | Value |
| --- | --- |
| `ascii_lowercase` | abcdefghijklmnopqrstuvwxyz |
| `ascii_uppercase` | ABCDEFGHIJKLMNOPQRSTUVWXYZ |
| `ascii_letters` | ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz |
| `digits` | 0123456789 |
| `hexdigits` | 0123456789abcdefABCDEF |
| `octdigits` | 01234567 |
| `punctuation` | !"#$%&'()\*+,-./:;<=>?@[\\]^_`{|}~ |
| `whitespace` | The combination of the [<FontIcon icon="fa-brands fa-wikipedia-w"/>space](https://en.wikipedia.org/wiki/Space_(punctuation)) character, [<FontIcon icon="fa-brands fa-wikipedia-w"/>horizontal and vertical tab](https://en.wikipedia.org/wiki/Tab_key#Tab_characters), [<FontIcon icon="fa-brands fa-wikipedia-w"/>linefeed](https://en.wikipedia.org/wiki/Newline), [<FontIcon icon="fa-brands fa-wikipedia-w"/>carriage return](https://en.wikipedia.org/wiki/Carriage_return), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>form feed](https://en.wikipedia.org/wiki/Page_break#Form_feed) |
| `printable` | The combination of `digits`, `ascii_letters`, `punctuation`, and `whitespace` |

These string-related constants come in handy in many situations. You can use them when you’re doing a lot of string processing, working with [**regular expressions**](/realpython.com/regex-python.md), processing [**natural language**](/realpython.com/nltk-nlp-python.md), and more.

