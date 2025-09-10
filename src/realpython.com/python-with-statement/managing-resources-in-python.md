---
lang: en-US
title: "Managing Resources in Python"
description: "Article(s) > (1/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (1/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Managing Resources in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/managing-resources-in-python.html
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
  url="https://realpython.com/python-with-statement#managing-resources-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

One common problem you’ll face in programming is how to properly manage **external resources**, such as [**files**](/realpython.com/working-with-files-in-python.md), [<VPIcon icon="fa-brands fa-wikipedia-w"/>locks](https://en.wikipedia.org/wiki/Lock_(computer_science)), and network connections. Sometimes, a program will retain those resources forever, even if you no longer need them. This kind of issue is called a [<VPIcon icon="fa-brands fa-wikipedia-w"/>memory leak](https://en.wikipedia.org/wiki/Memory_leak) because the available memory gets reduced every time you create and open a new instance of a given resource without closing an existing one.

Managing resources properly is often a tricky problem. It requires both a **setup** phase and a **teardown** phase. The latter phase requires you to perform some cleanup actions, such as [**closing a file**](/realpython.com/why-close-file-python.md), releasing a lock, or closing a network connection. If you forget to perform these cleanup actions, then your application keeps the resource alive. This might compromise valuable system resources, such as memory and network bandwidth.

For example, a common problem that can arise when developers are working with databases is when a program keeps creating new connections without releasing or reusing them. In that case, the database [<VPIcon icon="fa-brands fa-wikipedia-w"/>back end](https://en.wikipedia.org/wiki/Back-end_database) can stop accepting new connections. This might require an admin to log in and manually kill those stale connections to make the database usable again.

Another frequent issue shows up when developers are working with files. [**Writing text to files**](/realpython.com/read-write-files-python.md) is usually a buffered operation. This means that calling `.write()` on a file won’t immediately result in writing text to the physical file but to a temporary buffer. Sometimes, when the buffer isn’t full and developers forget to call `.close()`, part of the data can be lost forever.

Another possibility is that your application runs into errors or [**exceptions**](/realpython.com/python-exceptions.md) that cause the control flow to bypass the code responsible for releasing the resource at hand. Here’s an example in which you use [<VPIcon icon="fa-brands fa-python"/>`open()`](https://docs.python.org/3/library/functions.html#open) to write some text to a file:

```py
file = open("hello.txt", "w")
file.write("Hello, World!")
file.close()
```

This implementation doesn’t guarantee the file will be closed if an exception occurs during the `.write()` call. In this case, the code will never call `.close()`, and therefore your program might leak a file descriptor.

In Python, you can use two general approaches to deal with resource management. You can wrap your code in:

1. A [<VPIcon icon="fa-brands fa-python"/>`try` … `finally`](https://realpython.com/python-exceptions/#cleaning-up-after-using-finally) construct
2. A [<VPIcon icon="fa-brands fa-python"/>`with`](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement) construct

The first approach is quite general and allows you to provide setup and teardown code to manage any kind of resource. However, it’s a little bit verbose. Also, what if you forget any cleanup actions?

The second approach provides a straightforward way to provide and reuse setup and teardown code. In this case, you’ll have the limitation that the `with` statement only works with [<VPIcon icon="fa-brands fa-python"/>context managers](https://docs.python.org/3/glossary.html#term-context-manager). In the next two sections, you’ll learn how to use both approaches in your code.

---

## The `try` … `finally` Approach

Working with files is probably the most common example of resource management in programming. In Python, you can use a `try` … `finally` statement to handle opening and closing files properly:

```py
# Safely open the file
file = open("hello.txt", "w")

try:
    file.write("Hello, World!")
finally:
    # Make sure to close the file after using it
    file.close()
```

In this example, you need to safely open the file `hello.txt`, which you can do by wrapping the call to `open()` in a `try` … `except` statement. Later, when you try to write to `file`, the `finally` clause will guarantee that `file` is properly closed, even if an exception occurs during the call to `.write()` in the `try` clause. You can use this pattern to handle setup and teardown logic when you’re managing external resources in Python.

The `try` block in the above example can potentially raise exceptions, such as `AttributeError` or `NameError`. You can handle those exceptions in an `except` clause like this:

```py
# Safely open the file
file = open("hello.txt", "w")

try:
    file.write("Hello, World!")
except Exception as e:
    print(f"An error occurred while writing to the file: {e}")
finally:
    # Make sure to close the file after using it
    file.close()
```

In this example, you catch any potential exceptions that can occur while writing to the file. In real-life situations, you should use a specific [<VPIcon icon="fa-brands fa-python"/>exception type](https://docs.python.org/3/library/exceptions.html#built-in-exceptions) instead of the general [<VPIcon icon="fa-brands fa-python"/>`Exception`](https://docs.python.org/3/library/exceptions.html#Exception) to prevent unknown errors from passing silently.

---

## The `with` Statement Approach

The Python **`with` statement** creates a **runtime context** that allows you to run a group of statements under the control of a [<VPIcon icon="fa-brands fa-python"/>context manager](https://docs.python.org/3/library/stdtypes.html#context-manager-types). [<VPIcon icon="fa-brands fa-python"/>PEP 343](https://python.org/dev/peps/pep-0343/) added the `with` statement to make it possible to factor out standard use cases of the `try` … `finally` statement.

Compared to traditional `try` … `finally` constructs, the `with` statement can make your code clearer, safer, and reusable. Many classes in the [<VPIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html) support the `with` statement. A classic example of this is [<VPIcon icon="fa-brands fa-python"/>`open()`](https://docs.python.org/3/library/functions.html#open), which allows you to work with [<VPIcon icon="fa-brands fa-python"/>file objects](https://docs.python.org/3/glossary.html#term-file-object) using `with`.

To write a `with` statement, you need to use the following general syntax:

```py
with expression as target_var:
    do_something(target_var)
```

The context manager object results from evaluating the `expression` after `with`. In other words, `expression` must return an object that implements the **context management protocol**. This protocol consists of two [**special methods**](/realpython.com/python-classes.md#special-methods-and-protocols):

1. [<VPIcon icon="fa-brands fa-python"/>`.__enter__()`](https://docs.python.org/3/library/stdtypes.html#contextmanager.__enter__) is called by the `with` statement to enter the runtime context.
2. [<VPIcon icon="fa-brands fa-python"/>`.__exit__()`](https://docs.python.org/3/library/stdtypes.html#contextmanager.__exit__) is called when the execution leaves the `with` code block.

The `as` specifier is optional. If you provide a `target_var` with `as`, then the [**return**](/realpython.com/python-return-statement.md) value of calling `.__enter__()` on the context manager object is bound to that variable.

::: note

Some context managers return `None` from `.__enter__()` because they have no useful object to give back to the caller. In these cases, specifying a `target_var` makes no sense.

:::

Here’s how the `with` statement proceeds when Python runs into it:

1. Call `expression` to obtain a context manager.
2. Store the context manager’s `.__enter__()` and `.__exit__()` methods for later use.
3. Call `.__enter__()` on the context manager and bind its return value to `target_var` if provided.
4. Execute the `with` code block.
5. Call `.__exit__()` on the context manager when the `with` code block finishes.

In this case, `.__enter__()`, typically provides the setup code. The `with` statement is a [<VPIcon icon="fa-brands fa-python"/>compound statement](https://docs.python.org/3/reference/compound_stmts.html#compound-statements) that starts a code block, like a [**conditional statement**](/realpython.com/python-conditional-statements.md) or a [**`for` loop**](/realpython.com/python-for-loop.md). Inside this code block, you can run several statements. Typically, you use the `with` code block to manipulate `target_var` if applicable.

Once the `with` code block finishes, `.__exit__()` gets called. This method typically provides the teardown logic or cleanup code, such as calling `.close()` on an open file object. That’s why the `with` statement is so useful. It makes properly acquiring and releasing resources a breeze.

Here’s how to open your <VPIcon icon="fas fa-file-lines"/>`hello.txt` file for writing using the `with` statement:

```py
with open("hello.txt", mode="w") as file:
    file.write("Hello, World!")
```

When you run this `with` statement, `open()` returns an [<VPIcon icon="fa-brands fa-python"/>`io.TextIOBase`](https://docs.python.org/3/library/io.html#io.TextIOBase) object. This object is also a context manager, so the `with` statement calls `.__enter__()` and assigns its return value to `file`. Then you can manipulate the file inside the `with` code block. When the block ends, `.__exit__()` automatically gets called and closes the file for you, even if an exception is raised inside the `with` block.

This `with` construct is shorter than its `try` … `finally` alternative, but it’s also less general, as you already saw. You can only use the `with` statement with objects that support the context management protocol, whereas `try` … `finally` allows you to perform cleanup actions for arbitrary objects without the need for supporting the context management protocol.

In Python 3.1 and later, the `with` statement [<VPIcon icon="fa-brands fa-python"/>supports multiple context managers](https://docs.python.org/3/whatsnew/3.1.html#other-language-changes). You can supply any number of context managers separated by commas:

```py
with A() as a, B() as b:
    pass
```

This works like nested `with` statements but without nesting. This might be useful when you need to open two files at a time, the first for reading and the second for writing:

```py
with open("input.txt") as in_file, open("output.txt", "w") as out_file:
    # Read content from input.txt
    # Transform the content
    # Write the transformed content to output.txt
    pass
```

In this example, you can add code for reading and transforming the content of `input.txt`. Then you write the final result to `output.txt` in the same code block.

Using multiple context managers in a single `with` has a drawback, though. If you use this feature, then you’ll probably break your line length limit. To work around this, you need to use backslashes (``) for line continuation, so you might end up with an ugly final result.

The `with` statement can make the code that deals with system resources more readable, reusable, and concise, not to mention safer. It helps avoid bugs and leaks by making it almost impossible to forget cleaning up, closing, and releasing a resource after you’re done with it.

Using `with` allows you to abstract away most of the resource handling logic. Instead of having to write an explicit `try` … `finally` statement with setup and teardown code each time, `with` takes care of that for you and avoids repetition.
