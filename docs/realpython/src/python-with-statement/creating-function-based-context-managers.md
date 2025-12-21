---
lang: en-US
title: "Creating Function-Based Context Managers"
description: "Article(s) > (7/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (7/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Creating Function-Based Context Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/creating-function-based-context-managers.html
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
  url="https://realpython.com/python-with-statement#creating-function-based-context-managers"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

Python’s [**generator functions**](/realpython.com/introduction-to-python-generators.md) and the [<VPIcon icon="fa-brands fa-python"/>`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager) decorator provide an alternative and convenient way to implement the context management protocol. If you decorate an appropriately coded generator function with `@contextmanager`, then you get a **function-based** context manager that automatically provides both required methods, `.__enter__()` and `.__exit__()`. This can make your life more pleasant by saving you some boilerplate code.

The general pattern to create a context manager using `@contextmanager` along with a generator function goes like this:

```py
from contextlib import contextmanager

@contextmanager
def hello_context_manager():
    print("Entering the context...")
    yield "Hello, World!"
    print("Leaving the context...")


with hello_context_manager() as hello:
    print(hello)
# 
# Entering the context...
# Hello, World!
# Leaving the context...
```

In this example, you can identify two visible sections in `hello_context_manager()`. Before the `yield` statement, you have the setup section. There, you can place the code that acquires the managed resources. Everything before the `yield` runs when the flow of execution enters the context.

After the `yield` statement, you have the teardown section, in which you can release the resources and do the cleanup. The code after `yield` runs at the end of the `with` block. The `yield` statement itself provides the object that will be assigned to the `with` target variable.

This implementation and the one that uses the context management protocol are practically equivalent. Depending on which one you find more readable, you might prefer one over the other. A downside of the function-based implementation is that it requires an understanding of advanced Python topics, such as [**decorators**](/realpython.com/primer-on-python-decorators.md) and generators.

The `@contextmanager` decorator reduces the boilerplate required to create a context manager. Instead of writing a whole class with `.__enter__()` and `.__exit__()` methods, you just need to implement a generator function with a single `yield` that produces whatever you want `.__enter__()` to return.

---

## Opening Files for Writing: Second Version

You can use the `@contextmanager` to reimplement your `WritableFile` context manager. Here’s what rewriting it with this technique looks like:

```py :collapsed-lines
from contextlib import contextmanager

@contextmanager
def writable_file(file_path):
    file = open(file_path, mode="w")
    try:
        yield file
    finally:
        file.close()


with writable_file("hello.txt") as file:
    file.write("Hello, World!")

```

In this case, `writable_file()` is a generator function that opens `file` for writing. Then it temporarily suspends its own execution and **yields** the resource so `with` can bind it to its target variable. When the flow of execution leaves the `with` code block, the function continues to execute and closes `file` correctly.

---

## Mocking the Time

As a final example of how to create custom context managers with `@contextmanager`, say you’re testing a piece of code that works with time measurements. The code uses [<VPIcon icon="fa-brands fa-python"/>`time.time()`](https://docs.python.org/3/library/time.html#time.time) to get the current time measurement and do some further computations. Since time measurements vary, you decide to mock `time.time()` so you can test your code.

Here’s a function-based context manager that can help you do that:

```py
from contextlib import contextmanager
from time import time

@contextmanager
def mock_time():
    global time
    saved_time = time
    time = lambda: 42
    yield
    time = saved_time


with mock_time():
    print(f"Mocked time: {time()}")
# 
# Mocked time: 42

# Back to normal time
time()
#
# 1616075222.4410584
```

Inside `mock_time()`, you use a [**`global` statement**](/realpython.com/python-scope-legb-rule.md#the-global-statement) to signal that you’re going to modify the global name `time`. Then you save the original `time()` function object in `saved_time` so you can safely restore it later. The next step is to [<VPIcon icon="fa-brands fa-wikipedia-w"/>monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) `time()` using a `lambda` function that always returns the same value, `42`.

The bare `yield` statement specifies that this context manager doesn’t have a useful object to send back to the `with` target variable for later use. After `yield`, you reset the global `time` to its original content.

When the execution enters the `with` block, any calls to `time()` return `42`. Once you leave the `with` code block, calls to `time()` return the expected current time. That’s it! Now you can test your time-related code.
