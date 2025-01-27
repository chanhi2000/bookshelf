---
lang: en-US
title: "Why Is It Important to Close Files in Python?"
description: "Article(s) > Why Is It Important to Close Files in Python?"
icon: fa-brands fa-python
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
      content: "Article(s) > Why Is It Important to Close Files in Python?"
    - property: og:description
      content: "Why Is It Important to Close Files in Python?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/why-close-file-python.html
prev: /programming/py/articles/README.md
date: 2022-04-27
isOriginal: false
author:
  - name: Ian Currie
    url : https://realpython.com/team/icurrie/
cover: https://files.realpython.com/media/Why-Close-Your-Files_Watermarked.949c2f5df055.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Is It Important to Close Files in Python?"
  desc="Model citizens use context managers to open and close file resources in Python, but have you ever wondered why it's important to close files? In this tutorial, you'll take a deep dive into the reasons why it's important to close files and what can happen if you don't."
  url="https://realpython.com/why-close-file-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Why-Close-Your-Files_Watermarked.949c2f5df055.jpg"/>

At some point in your Python coding journey, you learn that you should use a **context manager** to open files. Python context managers make it easy to **close your files** once you’re done with them:

```py
with open("hello.txt", mode="w") as file:
    file.write("Hello, World!")
```

The [**`with` statement**](/realpython.com/python-with-statement.md) initiates a context manager. In this example, the context manager [**opens**](/realpython.com/read-write-files-python.md#opening-and-closing-a-file-in-python) the file <FontIcon icon="fas fa-file-lines"/>`hello.txt` and **manages** the file resource as long as the **context** is active. In general, all the code in the indented block depends on the file object being open. Once the indented block either ends or raises an exception, then the file will close.

If you’re not using a context manager or you’re working in a different language, then you might explicitly close files with the [**`try` … `finally` approach**](/realpython.com/python-with-statement.md#the-try-finally-approach):

```py
try:
    file = open("hello.txt", mode="w")
    file.write("Hello, World!")
finally:
    file.close()
```

The `finally` block that closes the file runs unconditionally, whether the `try` block succeeds or fails. While this syntax effectively closes the file, the Python context manager offers less verbose and more intuitive syntax. Additionally, it’s a bit more [<FontIcon icon="fa-brands fa-python"/>flexible](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement) than simply wrapping your code with `try` … `finally`.

You probably use context managers to manage files already, but have you ever wondered why most tutorials and four out of five dentists recommend doing this? In short, **why is it important to close files in Python?**

In this tutorial, you’ll dive into that very question. First, you’ll learn about how file handles are a **limited resource**. Then you’ll experiment with the **consequences** of not closing your files.

---

## In Short: Files Are Resources Limited by the Operating System

Python delegates file operations to the [<FontIcon icon="fa-brands fa-wikipedia-w"/>operating system](https://en.wikipedia.org/wiki/Operating_system). The operating system is the mediator between [<FontIcon icon="fa-brands fa-wikipedia-w"/>processes](https://en.wikipedia.org/wiki/Process_(computing)), such as Python, and all the **system resources**, such as the hard drive, RAM, and CPU time.

When you open a file with `open()`, you make a [<FontIcon icon="fa-brands fa-wikipedia-w"/>system call](https://en.wikipedia.org/wiki/System_call) to the operating system to locate that file on the hard drive and prepare it for reading or writing. The operating system will then return an [**unsigned integer**](/realpython.com/python-bitwise-operators.md#unsigned-integers) called a **file handle** on Windows and a **file descriptor** on UNIX-like systems, including Linux and macOS:

![Illustration of Python making a system call for a file handle](https://files.realpython.com/media/open_file.b4d0477f04f1.png)

A Python process making a system call and getting the integer 10 as the file handle

Once you have the number associated with the file, you’re ready to do [**read or write operations**](/realpython.com/read-write-files-python.md). Whenever Python wants to read, write, or close the file, it’ll make another system call, providing the file handle number. The Python file object has a `.fileno()` method that you can use to find the file handle:

```py
with open("test_file.txt", mode="w") as file:
    file.fileno()
# 
# 4
```

The `.fileno()` method on the opened file object will return the integer used by the operating system as a file descriptor. Just like how you might use an ID field to get a record from a database, Python provides this number to the operating system every time it reads or writes from a file.

**Operating systems limit the number of open files any single process can have**. This number is typically in the thousands. Operating systems set this limit because if a process tries to open thousands of file descriptors, something is probably wrong with the process. Even though thousands of files may seem like a lot, it’s still possible to run into the limit.

Apart from the risk of running into the limit, **keeping files open leaves you vulnerable to losing data**. In general, Python and the operating system work hard to protect you from data loss. But if your program—or computer—crashes, the usual routines may not take place, and open files can get corrupted.

::: note

Some libraries have specific methods and functions that seem to open files without a context manager. For example, the pathlib library has [**`.write_text()`**](/realpython.com/python-pathlib.md#reading-and-writing-files), and pandas has [**`read_csv()`**](/realpython.com/pandas-read-write-files.md#using-the-pandas-read_csv-and-to_csv-functions).

:::

They do manage resources properly under the hood, though, so you don’t need to use a context manager in those cases. It’s best to refer to the documentation for the library you’re using to see whether you need a context manager or not.

In short, letting context managers manage your files is a defensive technique that’s easy to practice and makes your code better—so you might as well do it. It’s like wearing a seatbelt. You probably won’t need it, but the costs of going without can be high.

In the rest of this tutorial, you’ll be taking a deeper dive into the limits, consequences, and dangers of not closing files. In the next section, you’ll be exploring the `Too many open files` error.

---

## What Happens When You Open Too Many Files?

In this section, you’ll explore what happens when you run into the file limit. You’ll do this by trying out a code snippet that will create a load of open files and provoke an `OSError`.

::: note

As the `OS` in `OSError` suggests, the limit is enforced by the operating system and not by Python. However, the operating system could, in theory, deal with many more file descriptors. Later on, you’ll learn more about [why the operating system limits file handles](#why-does-the-operating-system-limit-file-handles).

:::

You can test out the file limit per process on your operating system by trying to open thousands of files all at once. You’ll store the file objects in a list so that they’re not cleaned up automatically. But first, you’ll want to do some housekeeping to make sure you don’t create lots of files somewhere that you don’t want them:

```sh
mkdir file_experiment
cd file_experiment
```

Creating a folder where you can dump the files and then navigating to that folder is enough. Then, you can open a [**Python REPL**](/realpython.com/python-repl/README.md) and try to make thousands of files:

```py
files = [open(f"file-{n}.txt", mode="w") for n in range(10_000)]
# 
# Traceback (most recent call last):
#  ...
# OSError: [Errno 24] Too many open files: 'file-1021.txt'
```

This snippet tries to open ten thousand files and keep them in a list. The operating system starts creating files but pushes back once it has reached its limit. If you list the files in your newly created directory, you’ll note that even though the list comprehension eventually failed, the operating system made many of the files—just not the ten thousand that you asked for.

The limit that you encounter will vary across operating systems and seems larger by default in Windows. Depending on the operating system, there are ways to raise this files-per-process limit. However, you should ask yourself if you really need to. There are only a few legitimate use cases for choosing this solution.

One legitimate scenario is for servers. Servers work with [**sockets**](/realpython.com/python-sockets.md), which are treated much like files. The operating system tracks sockets in the file table using file handles. A server may need to have many sockets open for each client that they connect to. Plus, a server may be communicating with several clients. This situation can lead to many thousands of file handles being required.

Funnily enough, even though certain applications may call for raising the operating system limit for open files, it’s usually these very applications that need to be especially diligent about closing files!

Maybe you think you’re not in any immediate danger of running into the limit. Even so, read on, because in the next section, you’ll take a closer look at some of the consequences of accidentally running into that limit.

---

## What Are the Real-Life Consequences of Running Into the File Limit?

If you open files and never close them in Python, you might not notice any difference, especially if you’re working on one-file scripts or small projects. As the projects you work on grow in complexity, however, you’ll be increasing your exposure to problematic situations.

Imagine you’re working in a large team on a massive codebase. Then, one day you reach the limit for open files. The kicker is that the error message for the limit won’t tell you *where* the issue is. It’ll be the generic [<FontIcon icon="fa-brands fa-python"/>`OSError`](https://docs.python.org/3/library/exceptions.html#OSError) you saw earlier, which only tells you `Too many open files`.

You may have thousands of places in your codebase where you open files. Imagine hunting for spots where the code doesn’t handle files properly. Imagine that the code passes file objects between functions, and you can’t immediately tell if any given file object is eventually closed or not. That’s not a fun time.

If you’re interested, there are ways to explore your system’s open file handles. Expand the following block to explore:

### Utilities to Explore File Handles

::: tabs

@tab:active <FontIcon icon="fa-brands fa-windows"/>

Install [<FontIcon icon="fas fa-globe"/>process hacker](https://processhacker.sourceforge.io/):

```powershell
choco install processhacker
```

Open the application and click the *Find Handles or DLLs* button. Tick the *regex* checkbox and type `.*` to see all file handles with accompanying information.

The official Microsoft version of process hacker is part of the [<FontIcon icon="fa-brands fa-micorosoft"/>Sysinternals](https://docs.microsoft.com/en-us/sysinternals/) utilities, namely [<FontIcon icon="fa-brands fa-micorosoft"/>Process Monitor](https://docs.microsoft.com/en-us/sysinternals/downloads/procmon) and [<FontIcon icon="fa-brands fa-micorosoft"/>Process Explorer](https://docs.microsoft.com/en-us/sysinternals/downloads/process-explorer).

@tab <FontIcon icon="fa-brands fa-linux"/>,<FontIcon icon="iconfont icon-macos"/>

You may need to install [<FontIcon icon="fa-brands fa-wikipedia-w"/>`lsof`](https://en.wikipedia.org/wiki/Lsof), which is a Linux utility to **l**i**s**t **o**pen **f**iles. With this utility, you can get information and count how many open files there are:

```sh
lsof | head
lsof | wc -l
```

The `lsof` command prints a newline for each open file with basic information about that file. Piping it into the `head` command will show you the start of the output, including the column names.

The output of `lsof` can be piped into the `wc`, or word count, command. The `-l` switch means that it’ll only count newlines. This number will likely be in the hundreds of thousands.

You can pipe the output of `lsof` into `grep` to find lines that contain a string like `python`. You can also pass in a process ID, which can be helpful if you want to hunt for file descriptors:

```sh
lsof | grep python
```

This command will filter out all lines that don’t contain the term after `grep`, in this case `python`.

If you’re curious about the theoretical limit for files on your system, you can explore this on UNIX-based systems by studying the content of a special file:

```sh
cat /proc/sys/fs/file-max
```

The number is very platform dependent, but it’s likely massive. The system would almost certainly run out of other resources before reaching this limit.

:::

You may wonder *why* the operating system limits files, though. Presumably, it can handle many more file handles than it’s letting on, right? In the next section, you’ll discover why the operating system cares.

---

## Why Does the Operating System Limit File Handles?

The [<FontIcon icon="fa-brands fa-windows"/>actual limits](https://techcommunity.microsoft.com/t5/windows-blog-archive/pushing-the-limits-of-windows-handles/ba-p/723848) of the number of files that an operating system can keep open simultaneously are huge. You’re talking millions of files. But actually reaching that limit and putting a fixed number on it isn’t clear-cut. Typically, a system will run out of other resources before it runs out of file handles.

The limit is conservative from the point of view of the operating system but ample from the perspective of most programs. From the operating system’s perspective, any process that reaches the limit is probably leaking file handles along with other resources.

The leaking of resources may be due to poor programming practice or a malicious program attempting to attack the system. This is why the operating system imposes the limit—to keep you safe from others, and from yourself!

Plus, for most applications, it doesn’t make sense to have so many files open. No more than a single read or write operation can happen simultaneously on one hard drive, so it doesn’t make things any faster if you’re just dealing with files.

Okay, so you know that opening lots of files is problematic, but there are other downsides to not closing files in Python, even if you’re only opening a handful.

---

## What Happens if You Don’t Close a File and Python Crashes?

In this section, you’ll experiment with simulating a crash and see how it affects open files. You can use a special function in the `os` module that will exit without performing any of the cleanups that Python usually does, but first, you’ll see how things are normally cleaned up.

Performing write operations for each command can be expensive. For this reason, the Python default is to use a [<FontIcon icon="fa-brands fa-python"/>buffer](https://docs.python.org/3/library/io.html#io.BufferedIOBase) that collects write operations. When the buffer gets full, or when the file is closed explicitly, the buffer is flushed, and the write operation is complete.

Python works hard to clean up after itself. In most cases, it’ll proactively flush and close files by itself:

```py title="write_hello.py"
file = open("hello.txt", mode="w")
file.write("Hello, world!")
```

When running this code, the operating system creates the file. The operating system also writes the content even though you never actually flush or close the file in the code. This flushing and closing are taken care of by a cleanup routine that Python will perform at the end of execution.

Sometimes exits aren’t so controlled, though, and a crash can end up bypassing this cleanup:

```py title="crash_hello.py"
import os

file = open("crash.txt", mode="w")
file.write("Hello, world!")
os._exit(1)
```

After running the snippet above, you can use `cat` to inspect the contents of the file you just created:

```sh
cat crash.txt
#
# No output!
```

You’ll see that even though the operating system has created the file, it doesn’t have any content. The lack of output is because [<FontIcon icon="fa-brands fa-python"/>`os._exit()`](https://docs.python.org/3/library/os.html#os._exit) bypasses the usual Python exit routine, simulating a crash. That said, even this type of simulation is relatively controlled because it assumes that Python, rather than your operating system, has crashed.

Behind the scenes, once Python is done, the operating system will also perform its own cleanup, closing all file descriptors opened by the process. Crashes can occur at many levels and interfere with the operating system’s cleanup, leaving file handles dangling.

On Windows, for example, dangling file handles can be problematic because any process that opens a file also locks it. Another process can’t open that file until it’s closed. Windows users may be familiar with rogue processes that won’t let you open or delete files.

What’s potentially worse than being locked out of files? Leaking file handles can present a [<FontIcon icon="fas fa-globe"/>security risk](https://cwe.mitre.org/data/definitions/403.html) because the permissions associated with files sometimes get mixed up.

::: note

The most common implementation of Python, [<FontIcon icon="iconfont icon-github"/>`python/cpython`](https://github.com/python/cpython), goes further in cleaning up your dangling file handles than you might think. It uses [**reference counting**](/realpython.com/python-memory-management.md) for garbage collection so that files are closed once they’re not referenced anymore. That said, other implementations, like [<FontIcon icon="fas fa-globe"/>PyPy](https://pypy.org/), use different strategies that may not be as aggressive in cleaning up unused file handles.

The fact that some implementations may not clean up as effectively as CPython is yet another argument for always using a context manager!

:::

File handles getting leaked and content getting lost in a buffer are bad enough, but a crash interrupting a file operation could also result in file corruption. That significantly increases the potential for data loss. Again, these are unlikely scenarios, but they can be costly.

You can never totally insulate yourself from a crash, but you can reduce your exposure by using a context manager. The syntax of a context manager will naturally lead you to code in a way that keeps a file open only for as long as it’s needed.

---

## Conclusion

You’ve learned **why it’s important to close files in Python**. Because files are limited resources managed by the operating system, making sure files are closed after use will protect against hard-to-debug issues like running out of file handles or experiencing corrupted data. The best defense is always to open files with a context manager.

Digging under the surface, you’ve seen what happens when you open too many files, and you’ve provoked a crash that leads to the contents of a file going missing. To learn more about opening files, see [**Reading and Writing Files in Python**](/realpython.com/read-write-files-python.md). For an in-depth guide to context managers, check out [**Context Managers and Python’s `with` Statement**](/realpython.com/python-with-statement.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Is It Important to Close Files in Python?",
  "desc": "Model citizens use context managers to open and close file resources in Python, but have you ever wondered why it's important to close files? In this tutorial, you'll take a deep dive into the reasons why it's important to close files and what can happen if you don't.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/why-close-file-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
