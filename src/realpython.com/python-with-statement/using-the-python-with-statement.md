---
lang: en-US
title: "Using the Python with Statement"
description: "Article(s) > (2/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (2/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Using the Python with Statement"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/using-the-python-with-statement.html
date: 2021-06-02
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Context Managers and Python's with Statement",
  "desc": "In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers.",
  "link": "/realpython.com/python-with-statement/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Context Managers and Python's with Statement"
  desc="In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers."
  url="https://realpython.com/python-with-statement#using-the-python-with-statement"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

As long as Python developers have incorporated the `with` statement into their coding practice, the tool has been shown to have several valuable use cases. More and more objects in the Python standard library now provide support for the context management protocol so you can use them in a `with` statement.

In this section, you’ll code some examples that show how to use the `with` statement with several classes both in the standard library and in third-party libraries.

---

## Working With Files

So far, you’ve used `open()` to provide a context manager and manipulate files in a `with` construct. Opening files using the `with` statement is generally recommended because it ensures that open [<VPIcon icon="fa-brands fa-wikipedia-w"/>file descriptors](https://en.wikipedia.org/wiki/File_descriptor) are automatically closed after the flow of execution leaves the `with` code block.

As you saw before, the most common way to open a file using `with` is through the built-in `open()`:

```py
with open("hello.txt", mode="w") as file:
    file.write("Hello, World!")
```

In this case, since the context manager closes the file after leaving the `with` code block, a common mistake might be the following:

```py
file = open("hello.txt", mode="w")

with file:
    file.write("Hello, World!")
# 
# 13

with file:
    file.write("Welcome to Real Python!")
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# ValueError: I/O operation on closed file.
```

The first `with` successfully writes `"Hello, World!"` into `hello.txt`. Note that `.write()` returns the number of bytes written into the file, `13`. When you try to run a second `with`, however, you get a `ValueError` because your `file` is already closed.

Another way to use the `with` statement to open and manage files is by using [<VPIcon icon="fa-brands fa-python"/>`pathlib.Path.open()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.open):

```py
import pathlib

file_path = pathlib.Path("hello.txt")

with file_path.open("w") as file:
    file.write("Hello, World!")
# 
# 13
```

[<VPIcon icon="fa-brands fa-python"/>`Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path) is a class that represents concrete paths to physical files in your computer. Calling `.open()` on a `Path` object that points to a physical file opens it just like `open()` would do. So, `Path.open()` works similarly to `open()`, but the file path is automatically provided by the `Path` object you call the method on.

Since [**`pathlib`**](/realpython.com/python-pathlib.md) provides an elegant, straightforward, and [<VPIcon icon="fas fa-globe"/>Pythonic](https://realpython.com/learning-paths/writing-pythonic-code/) way to manipulate file system paths, you should consider using `Path.open()` in your `with` statements as a best practice in Python.

Finally, whenever you load an external file, your program should check for possible issues, such as a missing file, writing and reading access, and so on. Here’s a general pattern that you should consider using when you’re working with files:

```py
import pathlib
import logging

file_path = pathlib.Path("hello.txt")

try:
    with file_path.open(mode="w") as file:
        file.write("Hello, World!")
except OSError as error:
    logging.error("Writing to file %s failed due to: %s", file_path, error)
```

In this example, you wrap the `with` statement in a [**`try` … `except` statement**](/realpython.com/python-exceptions.md#the-try-and-except-block-handling-exceptions). If an [<VPIcon icon="fa-brands fa-python"/>`OSError`](https://docs.python.org/3/library/exceptions.html#OSError) occurs during the execution of `with`, then you use [**`logging`**](/realpython.com/python-logging.md) to log the error with a user-friendly and descriptive message.

---

## Traversing Directories

The [<VPIcon icon="fa-brands fa-python"/>`os`](https://docs.python.org/3/library/os.html#module-os) module provides a function called [<VPIcon icon="fa-brands fa-python"/>`scandir()`](https://docs.python.org/3/library/os.html#os.scandir), which returns an iterator over [<VPIcon icon="fa-brands fa-python"/>`os.DirEntry`](https://docs.python.org/3/library/os.html#os.DirEntry) objects corresponding to the entries in a given directory. This function is specially designed to provide optimal performance when you’re traversing a directory structure.

A call to `scandir()` with the path to a given directory as an argument returns an iterator that supports the context management protocol:

```py
>>> import os

with os.scandir(".") as entries:
    for entry in entries:
        print(entry.name, "->", entry.stat().st_size, "bytes")
# 
# Documents -> 4096 bytes
# Videos -> 12288 bytes
# Desktop -> 4096 bytes
# DevSpace -> 4096 bytes
# .profile -> 807 bytes
# Templates -> 4096 bytes
# Pictures -> 12288 bytes
# Public -> 4096 bytes
# Downloads -> 4096 bytes
```

In this example, you write a `with` statement with `os.scandir()` as the context manager supplier. Then you iterate over the entries in the selected directory (`"."`) and [**print**](/realpython.com/python-print/README.md) their name and size on the screen. In this case, `.__exit__()` calls [<VPIcon icon="fa-brands fa-python"/>`scandir.close()`](https://docs.python.org/3/library/os.html#os.scandir.close) to close the iterator and release the acquired resources. Note that if you run this on your machine, you’ll get a different output depending on the content of your current directory.

---

## Performing High-Precision Calculations

Unlike built-in [**floating-point numbers**](/realpython.com/python-numbers.md#floating-point-numbers), the [<VPIcon icon="fa-brands fa-python"/>`decimal`](https://docs.python.org/3/library/decimal.html#module-decimal) module provides a way to adjust the precision to use in a given calculation that involves [<VPIcon icon="fa-brands fa-python"/>`Decimal`](https://docs.python.org/3/library/decimal.html#decimal.Decimal) numbers. The precision defaults to `28` places, but you can change it to meet your problem requirements. A quick way to perform calculations with a custom precision is using [<VPIcon icon="fa-brands fa-python"/>`localcontext()`](https://docs.python.org/3/library/decimal.html#decimal.localcontext) from `decimal`:

```py
from decimal import Decimal, localcontext

with localcontext() as ctx:
    ctx.prec = 42
    Decimal("1") / Decimal("42")
# 
# Decimal('0.0238095238095238095238095238095238095238095')

Decimal("1") / Decimal("42")
# 
# Decimal('0.02380952380952380952380952381')
```

Here, `localcontext()` provides a context manager that creates a local decimal context and allows you to perform calculations using a custom precision. In the `with` code block, you need to set `.prec` to the new precision you want to use, which is `42` places in the example above. When the `with` code block finishes, the precision is reset back to its default value, `28` places.

---

## Handling Locks in Multithreaded Programs

Another good example of using the `with` statement effectively in the Python standard library is [<VPIcon icon="fa-brands fa-python"/>`threading.Lock`](https://docs.python.org/3/library/threading.html?highlight=threading#threading.Locks). This class provides a primitive lock to prevent multiple threads from modifying a shared resource at the same time in a [**multithreaded**](/realpython.com/intro-to-python-threading.md) application.

You can use a `Lock` object as the context manager in a `with` statement to automatically acquire and release a given lock. For example, say you need to protect the balance of a bank account:

```py
import threading

balance_lock = threading.Lock()

# Use the try ... finally pattern
balance_lock.acquire()
try:
    # Update the account balance here ...
finally:
    balance_lock.release()

# Use the with pattern
with balance_lock:
    # Update the account balance here ...
```

The `with` statement in the second example automatically acquires and releases a lock when the flow of execution enters and leaves the statement. This way, you can focus on what really matters in your code and forget about those repetitive operations.

In this example, the lock in the `with` statement creates a protected region known as the [<VPIcon icon="fa-brands fa-wikipedia-w"/>critical section](https://en.wikipedia.org/wiki/Critical_section), which prevents concurrent access to the account balance.

---

## Testing for Exceptions With pytest

So far, you’ve coded a few examples using context managers that are available in the Python standard library. However, several third-party libraries include objects that support the context management protocol.

Say you’re [**testing**](/realpython.com/python-testing.md) your code with [**pytest**](/realpython.com/pytest-python-testing.md). Some of your functions and code blocks raise exceptions under certain situations, and you want to test those cases. To do that, you can use [<VPIcon icon="fas fa-globe"/>`pytest.raises()`](https://docs.pytest.org/en/stable/reference.html#pytest.raises). This function allows you to assert that a code block or a function call raises a given exception.

Since `pytest.raises()` provides a context manager, you can use it in a `with` statement like this:

```py
import pytest

1 / 0
#
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# ZeroDivisionError: division by zero

with pytest.raises(ZeroDivisionError):
    1 / 0

favorites = {"fruit": "apple", "pet": "dog"}
favorites["car"]
#
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# KeyError: 'car'

with pytest.raises(KeyError):
    favorites["car"]

```

In the first example, you use `pytest.raises()` to capture the [<VPIcon icon="fa-brands fa-python"/>`ZeroDivisionError`](https://docs.python.org/3/library/exceptions.html#ZeroDivisionError) that the expression `1 / 0` raises. The second example uses the function to capture the [**`KeyError`**](/realpython.com/python-keyerror.md) that is raised when you access a key that doesn’t exist in a given dictionary.

If your function or code block doesn’t raise the expected exception, then `pytest.raises()` raises a failure exception:

```py
import pytest

with pytest.raises(ZeroDivisionError):
    4 / 2
# 
# 2.0
# Traceback (most recent call last):
#  ...
# Failed: DID NOT RAISE <class 'ZeroDivisionError'>
```

Another cool feature of `pytest.raises()` is that you can specify a target variable to inspect the raised exception. For example, if you want to verify the error message, then you can do something like this:

```py
with pytest.raises(ZeroDivisionError) as exc:
    1 / 0

assert str(exc.value) == "division by zero"
```

You can use all these `pytest.raises()` features to capture the exceptions you raise from your [**functions**](/realpython.com/defining-your-own-python-function.md) and code block. This is a cool and useful tool that you can incorporate into your current testing strategy.
