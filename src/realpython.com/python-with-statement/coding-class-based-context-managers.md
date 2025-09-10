---
lang: en-US
title: "Coding Class-Based Context Managers"
description: "Article(s) > (6/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (6/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Coding Class-Based Context Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/coding-class-based-context-managers.html
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
  url="https://realpython.com/python-with-statement#coding-class-based-context-managers"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

To implement the context management protocol and create **class-based** context managers, you need to add both the `.__enter__()` and the `__exit__()` special methods to your classes. The table below summarizes how these methods work, the arguments they take, and the logic you can put in them:

| Method | Description |
| --- | --- |
| `.__enter__(self)` | This method handles the setup logic and is called when entering a new `with` context. Its return value is bound to the `with` target variable. |
| `.__exit__(self, exc_type, exc_value, exc_tb)` | This method handles the teardown logic and is called when the flow of execution leaves the `with` context. If an exception occurs, then `exc_type`, `exc_value`, and `exc_tb` hold the exception type, value, and traceback information, respectively. |

When the `with` statement executes, it calls `.__enter__()` on the context manager object to signal that you’re entering into a new runtime context. If you provide a target variable with the `as` specifier, then the return value of `.__enter__()` is assigned to that variable.

When the flow of execution leaves the context, `.__exit__()` is called. If no exception occurs in the `with` code block, then the three last arguments to `.__exit__()` are set to [**`None`**](/realpython.com/null-in-python.md). Otherwise, they hold the type, value, and [**traceback**](/realpython.com/python-traceback.md) associated with the exception at hand.

If the `.__exit__()` method returns `True`, then any exception that occurs in the `with` block is swallowed and the execution continues at the next statement after `with`. If `.__exit__()` returns `False`, then exceptions are propagated out of the context. This is also the default behavior when the method doesn’t return anything explicitly. You can take advantage of this feature to encapsulate exception handling inside the context manager.

---

## Writing a Sample Class-Based Context Manager

Here’s a sample class-based context manager that implements both methods, `.__enter__()` and `.__exit__()`. It also shows how Python calls them in a `with` construct:

```py
class HelloContextManager:
    def __enter__(self):
        print("Entering the context...")
        return "Hello, World!"
    def __exit__(self, exc_type, exc_value, exc_tb):
        print("Leaving the context...")
        print(exc_type, exc_value, exc_tb, sep="\n")


with HelloContextManager() as hello:
    print(hello)
# 
# Entering the context...
# Hello, World!
# Leaving the context...
# None
# None
# None
```

`HelloContextManager` implements both `.__enter__()` and `.__exit__()`. In `.__enter__()`, you first print a message to signal that the flow of execution is entering a new context. Then you return the `"Hello, World!"` string. In `.__exit__()`, you print a message to signal that the flow of execution is leaving the context. You also print the content of its three arguments.

When the `with` statement runs, Python creates a new instance of `HelloContextManager` and calls its `.__enter__()` method. You know this because you get `Entering the context...` printed on the screen.

::: note

A common mistake when you’re using context managers is forgetting to call the object passed to the `with` statement.

In this case, the statement can’t get the required context manager, and you get an `AttributeError` like this:

```py
with HelloContextManager as hello:
    print(hello)
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# AttributeError: __enter__
```

The exception message doesn’t say too much, and you might feel confused in this kind of situation. So, make sure to call the object in the `with` statement to provide the corresponding context manager.

:::

Then Python runs the `with` code block, which prints `hello` to the screen. Note that `hello` holds the return value of `.__enter__()`.

When the flow of execution exits the `with` code block, Python calls `.__exit__()`. You know that because you get `Leaving the context...` printed on your screen. The final line in the output confirms that the three arguments to `.__exit__()` are set to `None`.

::: note

A common trick when you don’t remember the exact signature of `.__exit__()` and don’t need to access its arguments is to use [**`*args` and `**kwargs`**](/realpython.com/python-kwargs-and-args.md) like in `def __exit__(self, *args, **kwargs):`.

:::

Now, what happens if an exception occurs during the execution of the `with` block? Go ahead and write the following `with` statement:

```py
with HelloContextManager() as hello:
    print(hello)
    hello[100]
# 
# Entering the context...
# Hello, World!
# Leaving the context...
# <class 'IndexError'>
# string index out of range
# <traceback object at 0x7f0cebcdd080>
# Traceback (most recent call last):
#   File "<stdin>", line 3, in <module>
# IndexError: string index out of range
```

In this case, you try to retrieve the value at index `100` in the [**string**](/realpython.com/python-strings.md) `"Hello, World!"`. This raises an `IndexError`, and the arguments to `.__exit__()` are set to the following:

- `exc_type` is the exception class, `IndexError`.
- `exc_value` is the exception instance.
- `exc_tb` is the traceback object.

This behavior is quite useful when you want to encapsulate the exception handling in your context managers.

---

## Handling Exceptions in a Context Manager

As an example of encapsulating exception handling in a context manager, say you expect `IndexError` to be the most common exception when you’re working with `HelloContextManager`. You might want to handle that exception in the context manager so you don’t have to repeat the exception-handling code in every `with` code block. In that case, you can do something like this:

```py :collapsed-lines title="exc_handling.py"
class HelloContextManager:
    def __enter__(self):
        print("Entering the context...")
        return "Hello, World!"

    def __exit__(self, exc_type, exc_value, exc_tb):
        print("Leaving the context...")
        if isinstance(exc_value, IndexError):
            # Handle IndexError here...
            print(f"An exception occurred in your with block: {exc_type}")
            print(f"Exception message: {exc_value}")
            return True

with HelloContextManager() as hello:
    print(hello)
    hello[100]

print("Continue normally from here...")
```

In `.__exit__()`, you check if `exc_value` is an instance of `IndexError`. If so, then you print a couple of informative messages and finally return with `True`. Returning a [**truthy value**](/realpython.com/python-operators-expressions.md#evaluation-of-non-boolean-values-in-boolean-context) makes it possible to swallow the exception and continue the normal execution after the `with` code block.

In this example, if no `IndexError` occurs, then the method returns `None` and the exception propagates out. However, if you want to be more explicit, then you can return `False` from outside the `if` block.

If you run <VPIcon icon="fa-brands fa-python"/>`exc_handling.py` from your command line, then you get the following output:

```sh
python exc_handling.py
# 
# Entering the context...
# Hello, World!
# Leaving the context...
# An exception occurred in your with block: <class 'IndexError'>
# Exception message: string index out of range
# Continue normally from here...
```

`HelloContextManager` is now able to handle `IndexError` exceptions that occur in the `with` code block. Since you return `True` when an `IndexError` occurs, the flow of execution continues in the next line, right after exiting the `with` code block.

---

## Opening Files for Writing: First Version

Now that you know how to implement the context management protocol, you can get a sense of what this would look like by coding a practical example. Here’s how you can take advantage of `open()` to create a context manager that opens files for writing:

```py title="writable.py"
class WritableFile:
    def __init__(self, file_path):
        self.file_path = file_path

    def __enter__(self):
        self.file_obj = open(self.file_path, mode="w")
        return self.file_obj

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file_obj:
            self.file_obj.close()
```

`WritableFile` implements the context management protocol and supports the `with` statement, just like the original `open()` does, but it always opens the file for writing using the `"w"` mode. Here’s how you can use your new context manager:

```py
from writable import WritableFile

with WritableFile("hello.txt") as file:
    file.write("Hello, World!")
```

After running this code, your `hello.txt` file contains the `"Hello, World!"` string. As an exercise, you can write a complementary context manager that opens files for reading, but using `pathlib` functionalities. Go ahead and give it a shot!

---

## Redirecting the Standard Output

A subtle detail to consider when you’re writing your own context managers is that sometimes you don’t have a useful object to return from `.__enter__()` and therefore to assign to the `with` target variable. In those cases, you can return [**`None`**](/realpython.com/null-in-python.md) explicitly or you can just rely on Python’s [**implicit return**](/realpython.com/python-return-statement.md#implicit-return-statements) value, which is `None` as well.

For example, say you need to temporarily redirect the standard output, [<VPIcon icon="fa-brands fa-python"/>`sys.stdout`](https://docs.python.org/3/library/sys.html#sys.stdout), to a given file on your disk. To do this, you can create a context manager like this:

```py :collapsed-lines title="redirect.py"
import sys

class RedirectedStdout:
    def __init__(self, new_output):
        self.new_output = new_output

    def __enter__(self):
        self.saved_output = sys.stdout
        sys.stdout = self.new_output

    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.stdout = self.saved_output
```

This context manager takes a file object through its constructor. In `.__enter__()`, you reassign the standard output, `sys.stdout`, to an instance attribute to avoid losing the reference to it. Then you reassign the standard output to point to the file on your disk. In `.__exit__()`, you just restore the standard output to its original value.

To use `RedirectedStdout`, you can do something like this:

```py
from redirect import RedirectedStdout

with open("hello.txt", "w") as file:
    with RedirectedStdout(file):
        print("Hello, World!")
    print("Back to the standard output...")
# 
# Back to the standard output...
```

The outer `with` statement in this example provides the file object that you’re going to use as your new output, `hello.txt`. The inner `with` temporarily redirects the standard output to `hello.txt`, so the first call to `print()` writes directly to that file instead of printing `"Hello, World!"` on your screen. Note that when you leave the inner `with` code block, the standard output goes back to its original value.

`RedirectedStdout` is a quick example of a context manager that doesn’t have a useful value to return from `.__enter__()`. However, if you’re only redirecting the `print()` output, you can get the same functionality without the need for coding a context manager. You just need to provide a `file` argument to `print()` like this:

```py
with open("hello.txt", "w") as file:
    print("Hello, World!", file=file)
```

In this examples, `print()` takes your `hello.txt` file as an argument. This causes `print()` to write directly into the physical file on your disk instead of printing `"Hello, World!"` to your screen.

---

## Measuring Execution Time

Just like every other class, a context manager can encapsulate some internal [<VPIcon icon="fa-brands fa-wikipedia-w"/>state](https://en.wikipedia.org/wiki/State_(computer_science)). The following example shows how to create a **stateful** context manager to measure the execution time of a given code block or function:

```py title="timing.py"
from time import perf_counter

class Timer:
    def __enter__(self):
        self.start = perf_counter()
        self.end = 0.0
        return lambda: self.end - self.start

    def __exit__(self, *args):
        self.end = perf_counter()
```

When you use `Timer` in a `with` statement, `.__enter__()` gets called. This method uses [<VPIcon icon="fa-brands fa-python"/>`time.perf_counter()`](https://docs.python.org/3/library/time.html#time.perf_counter) to get the time at the beginning of the `with` code block and stores it in `.start`. It also initializes `.end` and returns a [**`lambda` function**](/realpython.com/python-lambda.md) that computes a time delta. In this case, `.start` holds the initial state or time measurement.

::: note

To take a deeper dive into how to time your code, check out [**Python Timer Functions: Three Ways to Monitor Your Code**](/realpython.com/python-timer.md).

:::

Once the `with` block ends, `.__exit__()` gets called. The method gets the time at the end of the block and updates the value of `.end` so that the `lambda` function can compute the time required to run the `with` code block.

Here’s how you can use this context manager in your code:

```py
from time import sleep
from timing import Timer

with Timer() as timer:
    # Time-consuming code goes here...
    sleep(0.5)

timer()
# 
# 0.5005456680000862
```

With `Timer`, you can measure the execution time of any piece of code. In this example, `timer` holds an instance of the `lambda` function that computes the time delta, so you need to call `timer()` to get the final result.