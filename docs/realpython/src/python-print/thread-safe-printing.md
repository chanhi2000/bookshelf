---
lang: en-US
title: "Thread-Safe Printing"
description: "Article(s) > (6/7) Your Guide to the Python print() Function"
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
      content: "Article(s) > (6/7) Your Guide to the Python print() Function"
    - property: og:description
      content: "Thread-Safe Printing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/thread-safe-printing.html
date: 2019-08-12
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Your Guide to the Python print() Function",
  "desc": "In this step-by-step tutorial, you'll learn about the print() function in Python and discover some of its lesser-known features. Avoid common mistakes, take your ”hello world” to the next level, and know when to use a better alternative.",
  "link": "/realpython.com/python-print/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Your Guide to the Python print() Function"
  desc="In this tutorial, you'll dive deep into Python's lists. You'll learn how to create them, update their content, populate and grow them, and more. Along the way, you'll code practical examples that will help you strengthen your skills with this fundamental data type in Python."
  url="https://realpython.com/python-print#thread-safe-printing"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

I briefly touched upon the thread safety issue before, recommending `logging` over the `print()` function. If you’re still reading this, then you must be comfortable with [**the concept of threads**](/realpython.com/intro-to-python-threading.md).

Thread safety means that a piece of code can be safely shared between multiple threads of execution. The simplest strategy for ensuring thread-safety is by sharing **immutable** objects only. If threads can’t modify an object’s state, then there’s no risk of breaking its consistency.

Another method takes advantage of **local memory**, which makes each thread receive its own copy of the same object. That way, other threads can’t see the changes made to it in the current thread.

But that doesn’t solve the problem, does it? You often want your threads to cooperate by being able to mutate a shared resource. The most common way of synchronizing concurrent access to such a resource is by **locking** it. This gives exclusive write access to one or sometimes a few threads at a time.

However, locking is expensive and reduces concurrent throughput, so other means for controlling access have been invented, such as **atomic variables** or the **compare-and-swap** algorithm.

Printing isn’t thread-safe in Python. The `print()` function holds a reference to the standard output, which is a shared global variable. In theory, because there’s no locking, a context switch could happen during a call to `sys.stdout.write()`, intertwining bits of text from multiple `print()` calls.

::: note

A context switch means that one thread halts its execution, either voluntarily or not, so that another one can take over. This might happen at any moment, even in the middle of a function call.

:::

In practice, however, that doesn’t happen. No matter how hard you try, writing to the standard output seems to be atomic. The only problem that you may sometimes observe is with messed up line breaks:

```plaintext title="output"
[Thread-3 A][Thread-2 A][Thread-1 A]

[Thread-3 B][Thread-1 B]


[Thread-1 C][Thread-3 C]

[Thread-2 B]
[Thread-2 C]
```

To simulate this, you can increase the likelihood of a context switch by making the underlying `.write()` method go to sleep for a random amount of time. How? By mocking it, which you already know about from an earlier section:

```py :collapsed-lines
import sys

from time import sleep
from random import random
from threading import current_thread, Thread
from unittest.mock import patch

write = sys.stdout.write

def slow_write(text):
    sleep(random())
    write(text)

def task():
    thread_name = current_thread().name
    for letter in 'ABC':
        print(f'[{thread_name} {letter}]')

with patch('sys.stdout') as mock_stdout:
    mock_stdout.write = slow_write
    for _ in range(3):
        Thread(target=task).start()
```

First, you need to store the original `.write()` method in a variable, which you’ll delegate to later. Then you provide your fake implementation, which will take up to one second to execute. Each thread will make a few `print()` calls with its name and a letter: A, B, and C.

If you read the mocking section before, then you may already have an idea of why printing misbehaves like that. Nonetheless, to make it crystal clear, you can capture values fed into your `slow_write()` function. You’ll notice that you get a slightly different sequence each time:

```plaintext title="output"
[
    '[Thread-3 A]',
    '[Thread-2 A]',
    '[Thread-1 A]',
    '\n',
    '\n',
    '[Thread-3 B]',
    (...)
]
```

Even though `sys.stdout.write()` itself is an atomic operation, a single call to the `print()` function can yield more than one write. For example, line breaks are written separately from the rest of the text, and context switching takes place between those writes.

::: note

The atomic nature of the standard output in Python is a byproduct of the [**Global Interpreter Lock**](/realpython.com/python-gil.md), which applies locking around bytecode instructions. Be aware, however, that many interpreter flavors don’t have the GIL, where multi-threaded printing requires explicit locking.

:::

You can make the newline character become an integral part of the message by handling it manually:

```py
print(f'[{thread_name} {letter}]\n', end='')
```

This will fix the output:

```plaintext title="output"
[Thread-2 A]
[Thread-1 A]
[Thread-3 A]
[Thread-1 B]
[Thread-3 B]
[Thread-2 B]
[Thread-1 C]
[Thread-2 C]
[Thread-3 C]
```

Notice, however, that the `print()` function still keeps making a separate call for the empty suffix, which translates to useless `sys.stdout.write('')` instruction:

```plaintext title="output"
[
    '[Thread-2 A]\n',
    '[Thread-1 A]\n',
    '[Thread-3 A]\n',
    '',
    '',
    '',
    '[Thread-1 B]\n',
    (...)
]
```

A truly thread-safe version of the `print()` function could look like this:

```py
import threading

lock = threading.Lock()

def thread_safe_print(*args, **kwargs):
    with lock:
        print(*args, **kwargs)
```

You can put that function in a module and import it elsewhere:

```py
from thread_safe_print import thread_safe_print

def task():
    thread_name = current_thread().name
    for letter in 'ABC':
        thread_safe_print(f'[{thread_name} {letter}]')
```

Now, despite making two writes per each `print()` request, only one thread is allowed to interact with the stream, while the rest must wait:

```py
[
    # Lock acquired by Thread-3 
    '[Thread-3 A]',
    '\n',
    # Lock released by Thread-3
    # Lock acquired by Thread-1
    '[Thread-1 B]',
    '\n',
    # Lock released by Thread-1
    (...)
]
```

I added comments to indicate how the lock is limiting access to the shared resource.

::: note

Even in single-threaded code, you might get caught up in a similar situation. Specifically, when you’re printing to the standard output and the standard error streams at the same time. Unless you redirect one or both of them to separate files, they’ll both share a single terminal window.

:::

Conversely, the `logging` module is thread-safe by design, which is reflected by its ability to display thread names in the formatted message:

```py
import logging
logging.basicConfig(format='%(threadName)s %(message)s')
logging.error('hello')
# 
# MainThread hello
```

It’s another reason why you might not want to use the `print()` function all the time.
