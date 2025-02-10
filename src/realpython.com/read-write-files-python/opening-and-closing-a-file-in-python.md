---
lang: en-US
title: "Opening and Closing a File in Python"
description: "Article(s) > (2/4) Reading and Writing Files in Python (Guide)"
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
      content: "Article(s) > (2/4) Reading and Writing Files in Python (Guide)"
    - property: og:description
      content: "Opening and Closing a File in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/read-write-files-python/opening-and-closing-a-file-in-python.html
date: 2019-02-20
isOriginal: false
author:
  - name: James Mertz
    url : https://realpython.com/team/jmertz/
cover: https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Reading and Writing Files in Python (Guide)",
  "desc": "In this tutorial, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques.",
  "link": "/realpython.com/read-write-files-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Reading and Writing Files in Python (Guide)"
  desc="In this tutorial, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques."
  url="https://realpython.com/read-write-files-python#opening-and-closing-a-file-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

When you want to work with a file, the first thing to do is to open it. This is done by invoking the [<FontIcon icon="fa-brands fa-python"/>`open()` built-in function](https://docs.python.org/3/library/functions.html#open). `open()` has a single required argument that is the path to the file. `open()` has a single return, the [<FontIcon icon="fa-brands fa-python"/>file object](https://docs.python.org/3/glossary.html#term-file-object):

```py
file = open('dog_breeds.txt')
```

After you open a file, the next thing to learn is how to close it.

::: warning

You should *always* make sure that an open file is properly closed. To learn why, check out the [**Why Is It Important to Close Files in Python?**](/realpython.com/why-close-file-python.md) tutorial.

:::

It’s important to remember that it’s your responsibility to close the file. In most cases, upon termination of an application or script, a file will be closed eventually. However, there is no guarantee when exactly that will happen. This can lead to unwanted behavior including resource leaks. It’s also a best practice within Python (Pythonic) to make sure that your code behaves in a way that is well defined and reduces any unwanted behavior.

When you’re manipulating a file, there are two ways that you can use to ensure that a file is closed properly, even when encountering an error. The first way to close a file is to use the `try-finally` block:

```py
reader = open('dog_breeds.txt')
try:
    # Further file processing goes here
finally:
    reader.close()
```

If you’re unfamiliar with what the `try-finally` block is, check out [**Python Exceptions: An Introduction**](/realpython.com/python-exceptions.md).

The second way to close a file is to use the [**`with` statement**](/realpython.com/python-with-statement.md):

```py
with open('dog_breeds.txt') as reader:
    # Further file processing goes here
```

The `with` statement automatically takes care of closing the file once it leaves the `with` block, even in cases of error. I highly recommend that you use the `with` statement as much as possible, as it allows for cleaner code and makes handling any unexpected errors easier for you.

Most likely, you’ll also want to use the second positional argument, `mode`. This argument is a [**string**](/realpython.com/python-strings.md) that contains multiple characters to represent how you want to open the file. The default and most common is `'r'`, which represents opening the file in read-only mode as a text file:

```py
with open('dog_breeds.txt', 'r') as reader:
    # Further file processing goes here
```

Other options for modes are [<FontIcon icon="fa-brands fa-python"/>fully documented online](https://docs.python.org/3/library/functions.html#open), but the most commonly used ones are the following:

| Character | Meaning |
| :---: | :--- |
| `'r'` | Open for reading (default) |
| `'w'` | Open for writing, truncating (overwriting) the file first |
| `'rb'` or `'wb'` | Open in binary mode (read/write using byte data) |

Let’s go back and talk a little about file objects. A file object is:

::: info Glossary — Python 3.13.2 documentation (<code>docs.python.org</code>)

> “an object exposing a file-oriented API (with methods such as `read()` or `write()`) to an underlying resource.”

<SiteInfo
  name="Glossary"
  desc="The default Python prompt of the interactive shell. Often seen for code examples which can be executed interactively in the interpreter.,,..., Can refer to:- The default Python prompt of the i..."
  url="https://docs.python.org/3/glossary.html#term-file-object"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

:::

There are three different categories of file objects:

- Text files
- Buffered binary files
- Raw binary files

Each of these file types are defined in the `io` module. Here’s a quick rundown of how everything lines up.

---

## Text File Types

A text file is the most common file that you’ll encounter. Here are some examples of how these files are opened:

```py
open('abc.txt')

open('abc.txt', 'r')

open('abc.txt', 'w')
```

With these types of files, `open()` will return a `TextIOWrapper` file object:

```py
file = open('dog_breeds.txt')
type(file)
# 
# <class '_io.TextIOWrapper'>
```

This is the default file object returned by `open()`.

---

## Buffered Binary File Types

A buffered binary file type is used for reading and writing binary files. Here are some examples of how these files are opened:

```py
open('abc.txt', 'rb')

open('abc.txt', 'wb')
```

With these types of files, `open()` will return either a `BufferedReader` or `BufferedWriter` file object:

```py
file = open('dog_breeds.txt', 'rb')
type(file)
# 
# <class '_io.BufferedReader'>
file = open('dog_breeds.txt', 'wb')
type(file)
# 
# <class '_io.BufferedWriter'>
```

---

## Raw File Types

A raw file type is:

::: info io — Core tools for working with streams — Python 3.7.17 documentation (<code>docs.python.org</code>)

> “generally used as a low-level building-block for binary and text streams.”

<SiteInfo
  name="io — Core tools for working with streams — Python 3.7.17 documentation"
  desc="The io module provides Python’s main facilities for dealing with various types of I/O. There are three main types of I/O: text I/O, binary I/O and raw I/O. These are generic categories, and various backing stores can be used for each of them. A concrete object belonging to any of these categories is called a file object. Other common terms are stream and file-like object."
  url="https://docs.python.org/3.7/library/io.html#raw-i-o/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

:::

It is therefore not typically used.

Here’s an example of how these files are opened:

```py
open('abc.txt', 'rb', buffering=0)
```

With these types of files, `open()` will return a `FileIO` file object:

```py
file = open('dog_breeds.txt', 'rb', buffering=0)
type(file)
# 
# <class '_io.FileIO'>
```
