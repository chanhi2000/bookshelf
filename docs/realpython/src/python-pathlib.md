---
lang: en-US
title: "Python's pathlib Module: Taming the File System"
description: "Article(s) > Python's pathlib Module: Taming the File System"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Python's pathlib Module: Taming the File System"
    - property: og:description
      content: "Python's pathlib Module: Taming the File System"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-pathlib.html
prev: /programming/py/articles/README.md
date: 2025-01-11
isOriginal: false
author:
  - name: Geir Arne Hjelle
    url: https://realpython.com/team/gahjelle/
cover: https://files.realpython.com/media/Python-3s-pathlib-Module-Taming-the-File-System_Watermarked.524352e6d4ce.jpg
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
  name="Python's pathlib Module: Taming the File System"
  desc="Python's pathlib module enables you to handle file and folder paths in a modern way. This built-in module provides intuitive semantics that work the same way on different operating systems. In this tutorial, you'll get to know pathlib and explore common tasks when interacting with paths."
  url="https://realpython.com/python-pathlib"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-3s-pathlib-Module-Taming-the-File-System_Watermarked.524352e6d4ce.jpg"/>

Python’s `pathlib` module helps streamline your work with file and directory paths. Instead of relying on traditional string-based path handling, you can use the `Path` object, which provides a cross-platform way to read, write, move, and delete files.

`pathlib` also brings together functionality previously spread across other libraries like `os`, `glob`, and `shutil`, making file operations more straightforward. Plus, it includes built-in methods for reading and writing text or binary files, ensuring a clean and Pythonic approach to handling file tasks.

**By the end of this tutorial, you’ll understand that:**

- `pathlib` provides an **object-oriented interface** for managing file and directory paths in Python.
- You can **instantiate `Path` objects** using class methods like `.cwd()`, `.home()`, or by passing strings to `Path`.
- `pathlib` allows you to **read, write, move, and delete** files efficiently using methods.
- To get a **list of file paths** in a directory, you can use `.iterdir()`, `.glob()`, or `.rglob()`.
- You can use `pathlib` to **check if a path corresponds to a file** by calling the `.is_file()` method on a `Path` object.

You’ll also explore a bunch of code examples in this tutorial, which you can use for your everyday file operations. For example, you’ll dive into counting files, finding the most recently modified file in a directory, and creating unique filenames.

It’s great that `pathlib` offers so many methods and properties, but they can be hard to remember on the fly. That’s where a cheat sheet can come in handy. To get yours, click the link below:

**Free Download:** [Click here to claim your `pathlib` cheat sheet](https://realpython.com/bonus/python-pathlib-cheat-sheet/) so you can tame the file system with Python.

---

## The Problem With Representing Paths as Strings

With Python’s `pathlib`, you can save yourself some headaches. Its flexible `Path` class paves the way for intuitive semantics. Before you have a closer look at the class, take a moment to see how Python developers had to deal with paths before `pathlib` was around.

Traditionally, Python has represented file paths using regular [**text strings**](/realpython.com/python-strings/README.md). However, since paths are more than plain strings, important functionality was spread all around the standard library, including in libraries like [<VPIcon icon="fa-brands fa-python"/>`os`](https://docs.python.org/3/library/os.html), [<VPIcon icon="fa-brands fa-python"/>`glob`](https://docs.python.org/3/library/glob.html), and [<VPIcon icon="fa-brands fa-python"/>`shutil`](https://docs.python.org/3/library/shutil.html).

As an example, the following code block moves files into a subfolder:

```py
import glob
import os
import shutil

for file_name in glob.glob("*.txt"):
    new_path = os.path.join("archive", file_name)
    shutil.move(file_name, new_path)
```

You need three [**`import` statements**](/realpython.com/absolute-vs-relative-python-imports.md) in order to move all the text files to an archive directory.

Python’s [<VPIcon icon="fa-brands fa-python"/>`pathlib`](https://docs.python.org/3/library/pathlib.html) provides a `Path` class that works the same way on different operating systems. Instead of importing different modules such as `glob`, `os`, and `shutil`, you can perform the same tasks by using `pathlib` alone:

```py
from pathlib import Path

for file_path in Path.cwd().glob("*.txt"):
    new_path = Path("archive") / file_path.name
    file_path.replace(new_path)
```

Just as in the first example, this code finds all the text files in the current directory and moves them to an `archive/` subdirectory. However, with `pathlib`, you accomplish these tasks with fewer `import` statements and more straightforward syntax, which you’ll explore in depth in the upcoming sections.

---

## Path Instantiation With Python’s pathlib

One motivation behind `pathlib` is to represent the file system with dedicated objects [<VPIcon icon="fa-brands fa-python"/>instead of strings](https://snarky.ca/why-pathlib-path-doesn-t-inherit-from-str/). Fittingly, the [<VPIcon icon="fa-brands fa-python"/>official documentation of `pathlib`](https://docs.python.org/3/library/pathlib.html) is called *`pathlib` — Object-oriented filesystem paths*.

The [**object-oriented approach**](/realpython.com/python3-object-oriented-programming.md) is already quite visible when you contrast the `pathlib` syntax with the old `os.path` way of doing things. It gets even more obvious when you note that the heart of `pathlib` is the `Path` class:

> If you’ve never used this module before or just aren’t sure which class is right for your task, `Path` is most likely what you need. ([<VPIcon icon="fa-brands fa-python"/>Source](https://docs.python.org/3/library/pathlib.html#module-pathlib))

In fact, `Path` is so frequently used that you usually import it directly:

```py
from pathlib import Path
Path
#
# <class 'pathlib.Path'>
```

Because you’ll mainly be working with the `Path` class of `pathlib`, this way of importing `Path` saves you a few keystrokes in your code. This way, you can work with `Path` directly, rather than importing `pathlib` as a [**module**](/realpython.com/python-modules-packages.md) and referring to `pathlib.Path`.

There are a few different ways of instantiating a `Path` object. In this section, you’ll explore how to create paths by using [**class methods**](/realpython.com/instance-class-and-static-methods-demystified.md), passing in strings, or joining path components.

### Using Path Methods

Once you’ve imported `Path`, you can make use of existing methods to get the **current working directory** or your user’s **home directory**.

The current working directory is the directory in the file system that the current process is operating in. You’ll need to programmatically determine the current working directory if, for example, you want to create or open a file in the same directory as the script that’s being executed.

Additionally, it’s useful to know your user’s home directory when working with files. Using the home directory as a starting point, you can specify paths that’ll work on different machines, independent of any specific usernames.

To get your current working directory, you can use `.cwd()`:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```py
from pathlib import Path
Path.cwd()
#
# WindowsPath('C:/Users/philipp/Desktop/realpython')
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```py
from pathlib import Path
Path.cwd()
#
# PosixPath('/home/philipp/Desktop/realpython')
```

@tab <VPIcon icon="iconfont icon-macos"/>

```py
from pathlib import Path
Path.cwd()
#
# PosixPath('/Users/philipp/Desktop/realpython')
```

:::

When you instantiate `pathlib.Path`, you get either a `WindowsPath` or a `PosixPath` object. The kind of object will depend on which operating system you’re using.

On Windows, `.cwd()` returns a `WindowsPath`. On Linux and macOS, you get a `PosixPath`. Despite the differences under the hood, these objects provide identical interfaces for you to work with.

Operating System DifferencesShow/Hide

It’s possible to ask for a `WindowsPath` or a `PosixPath` explicitly, but you’ll only be limiting your code to that system without gaining any benefits. A concrete path like this won’t work on a different system:

```py
import pathlib
pathlib.WindowsPath("test.md")
#
# Traceback (most recent call last):
#  ...
# NotImplementedError: cannot instantiate 'WindowsPath' on your system
```

But what if you want to manipulate Unix paths on a Windows machine, or vice versa? In that case, you can directly instantiate `PureWindowsPath` or `PurePosixPath` on any system. When you make a path like this, you create a [<VPIcon icon="fa-brands fa-python"/>`PurePath` object](https://docs.python.org/3/library/pathlib.html#pure-paths) under the hood. You can use such an object if you need a representation of a path without access to the underlying file system.

Generally, it’s a good idea to use `Path`. With `Path`, you instantiate a **concrete path** for the platform that you’re using while also keeping your code platform-independent. Concrete paths allow you to do system calls on path objects, but **pure paths** only allow you to manipulate paths without accessing the operating system.

Working with platform-independent paths means that you can write a script on Windows that uses `Path.cwd()`, and it’ll work correctly when you run the file on macOS or Linux. The same is true for `.home()`:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```py
from pathlib import Path
Path.home()
#
# WindowsPath('C:/Users/philipp')
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```py
from pathlib import Path
Path.home()
#
# PosixPath('/home/philipp')
```

@tab <VPIcon icon="iconfont icon-macos"/>

```py
from pathlib import Path
Path.home()
#
# PosixPath('/Users/philipp')
```

:::

With `Path.cwd()` and `Path.home()`, you can conveniently get a starting point for your Python scripts. In cases where you need to spell paths out or reference a subdirectory structure, you can instantiate `Path` with a string.

### Passing in a String

Instead of starting in your user’s home directory or your current working directory, you can point to a directory or file directly by passing its string representation into `Path`:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```py
from pathlib import Path
Path(r"C:\Users\philipp\realpython\file.txt")
#
# WindowsPath('C:/Users/philipp/Desktop/realpython/file.txt')
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```py
from pathlib import Path
Path("/home/philipp/Desktop/realpython/file.txt")
#
# PosixPath('/home/philipp/Desktop/realpython/file.txt')
```

@tab <VPIcon icon="iconfont icon-macos"/>

```py
from pathlib import Path
Path("/Users/philipp/Desktop/realpython/file.txt")
#
# PosixPath('/Users/philipp/Desktop/realpython/file.txt')
```

:::

This process creates a `Path` object. Instead of having to deal with a string, you can now work with the flexibility that `pathlib` offers.

On Windows, the **path separator** is a backslash (``). However, in many contexts, the backslash is also used as an [<VPIcon icon="fa-brands fa-wikipedia-w"/>escape character](https://en.wikipedia.org/wiki/Escape_character) to represent non-printable characters. To avoid problems, use **raw string literals** to represent Windows paths:

```py
r"C:\Users"
#
# 'C:\\Users'
```

A string with an `r` in front of it is a raw string literal. In raw string literals, the `\` represents a literal backslash. In a normal string, you’d need to use two backslashes (`\\`) to indicate that you want to use the backslash literally and not as an escape character.

::: note

An idiomatic way of working with the current module’s location as the path is using `__file__`:

```py title="hello.py"
from pathlib import Path

print(f"You can find me here: {Path(__file__).parent}!")
```

The [**`__file__` attribute**](/realpython.com/python-constants/README.md#internal-dunder-names) contains the path to the file that Python is currently importing or executing. You can pass in `__file__` to `Path` when you need to work with the path to the module itself. For example, maybe you want to get the parent directory with `.parent`.

:::

You may have already noticed that although you enter paths on Windows with backslashes, `pathlib` represents them with the forward slash (`/`) as the path separator. This representation is named **POSIX style**.

POSIX stands for [<VPIcon icon="fa-brands fa-wikipedia-w"/>Portable Operating System Interface](https://en.wikipedia.org/wiki/POSIX), which is a standard for maintaining the compability between operating systems. The standard covers much more than path representation. You can learn more about it in [<VPIcon icon="fas fa-globe"/>Open Group Base Specifications Issue 7](https://pubs.opengroup.org/onlinepubs/9699919799/).

Still, when you convert a path back to a string, it’ll use the native form—for example, with backslashes on Windows:

```py
from pathlib import Path
str(Path(r"C:\Users\gahjelle\realpython\file.txt"))
#
# 'C:\\Users\\gahjelle\\realpython\\file.txt'
```

In general, you should try to use `Path` objects as much as possible in your code to take advantage of their benefits, but converting them to strings can be necessary in certain contexts. Some libraries and APIs still expect you to pass file paths as strings, so you may need to convert a `Path` object to a string before passing it to certain functions.

### Joining Paths

A third way to construct a path is to join the parts of the path using the special forward slash operator (`/`), which is possibly the most unusual part of the `pathlib` library. You may have already raised your eyebrows about it in the example at the beginning of this tutorial:

```py{4}
from pathlib import Path

for file_path in Path.cwd().glob("*.txt"):
    new_path = Path("archive") / file_path.name
    file_path.rename(new_path)
```

The forward slash operator can join several paths or a mix of paths and strings as long as you include one `Path` object. You use a forward slash regardless of your platform’s actual path separator.

If you don’t like the special slash notation, then you can do the same operation with the `.joinpath()` method:

```py
from pathlib import Path
Path.home().joinpath("python", "scripts", "test.py")
#
# PosixPath('/home/gahjelle/python/scripts/test.py')
```

This notation is closer to [<VPIcon icon="fa-brands fa-python"/>`os.path.join()`](https://docs.python.org/3/library/os.path.html#os.path.join), which you may have used in the past. It can feel more familiar than a forward slash if you’re used to backslashed paths.

After you’ve instantiated `Path`, you probably want to do something with your path. For example, maybe you’re aiming to perform file operations or pick parts from the path. That’s what you’ll do next.

---

## File System Operations With Paths

You can perform a bunch of handy [<VPIcon icon="fas fa-globe"/>operations on your file system](https://realpython.com/courses/python-basics-file-system-operations/) using `pathlib`. In this section, you’ll get a broad overview of some of the most common ones. But before you start performing file operations, have a look at the parts of a path first.

### Picking Out Components of a Path

A file or directory path consists of different parts. When you use `pathlib`, these parts are conveniently available as properties. Basic examples include:

- **`.name`**: The filename without any directory
- **`.stem`**: The filename without the file extension
- **`.suffix`**: The file extension
- **`.anchor`**: The part of the path before the directories
- **`.parent`**: The directory containing the file, or the parent directory if the path is a directory

Here, you can observe these properties in action:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```py
>>> from pathlib import Path
>>> path = Path(r"C:\Users\gahjelle\realpython\test.md")
>>> path
WindowsPath('C:/Users/gahjelle/realpython/test.md')

>>> path.name
'test.md'

>>> path.stem
'test'

>>> path.suffix
'.md'

>>> path.anchor
'C:\\'

>>> path.parent
WindowsPath('C:/Users/gahjelle/realpython")

>>> path.parent.parent
WindowsPath('C:/Users/gahjelle')
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```py
>>> from pathlib import Path
>>> path = Path("/home/gahjelle/realpython/test.md")
>>> path
PosixPath("/home/gahjelle/realpython/test.md")

>>> path.name
'test.md'

>>> path.stem
'test'

>>> path.suffix
'.md'

>>> path.anchor
'/'

>>> path.parent
PosixPath("/home/gahjelle/realpython")

>>> path.parent.parent
PosixPath('/home/gahjelle')
```

@tab <VPIcon icon="iconfont icon-macos"/>

```py
>>> from pathlib import Path
>>> path = Path("/users/gahjelle/realpython/test.md")
>>> path
PosixPath("/users/gahjelle/realpython/test.md")

>>> path.name
'test.md'

>>> path.stem
'test'

>>> path.suffix
'.md'

>>> path.anchor
'/'

>>> path.parent
PosixPath("/users/gahjelle/realpython")

>>> path.parent.parent
PosixPath('/users/gahjelle')
```

:::

Note that `.parent` returns a new `Path` object, whereas the other properties return strings. This means, for instance, that you can chain `.parent` in the last example or even combine it with the slash operator to create completely new paths:

```py
path.parent.parent / f"new{path.suffix}"
#
# PosixPath('/home/gahjelle/new.md')
```

That’s quite a few properties to keep straight. If you want a handy reference for these `Path` properties, then you can download the Real Python `pathlib` cheat sheet by clicking the link below:

### Reading and Writing Files

Consider that you want to [<VPIcon icon="fa-brands fa-wikipedia-w"/>print](https://realpython.com/python-print/) all the items on a shopping list that you wrote down in a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Markdown](https://en.wikipedia.org/wiki/Markdown) file. The content of <VPIcon icon="fa-brands fa-markdown"/>`shopping_list.md` looks like this:

```md title="shopping_list.md"

# Shopping List

---

## Fruit

* Banana
* Apple
* Peach

---

## Candy

* Chocolate
* Nougat Bits
```

Traditionally, the way to [**read or write a file in Python**](/realpython.com/read-write-files-python/README.md) has been to use the built-in `open()` function. With `pathlib`, you can use `open()` directly on `Path` objects.

So, a first draft of your script that finds all the items in <VPIcon icon="fa-brands fa-markdown"/>`shopping_list.md` and prints them may look like this:

```py{3-4} title="read_shopping_list.py"
from pathlib import Path

path = Path.cwd() / "shopping_list.md"
with path.open(mode="r", encoding="utf-8") as md_file:
    content = md_file.read()
    groceries = [line for line in content.splitlines() if line.startswith("*")]
print("\n".join(groceries))
```

In fact, `Path.open()` is calling the [<VPIcon icon="fa-brands fa-python"/>built-in `open()`](https://docs.python.org/3/library/functions.html#open) function behind the scenes. That’s why you can use parameters like `mode` and `encoding` with `Path.open()`.

On top of that, `pathlib` offers some convenient methods to read and write files:

- `.read_text()` opens the path in text mode and returns the contents as a string.
- `.read_bytes()` opens the path in binary mode and returns the contents as a byte string.
- `.write_text()` opens the path and writes string data to it.
- `.write_bytes()` opens the path in binary mode and writes data to it.

Each of these methods handles the opening and closing of the file. Therefore, you can update <VPIcon icon="fa-brands fa-python"/>`read_shopping_list.py` using `.read_text()`:

```py{3} title="read_shopping_list.py"
from pathlib import Path

path = Path.cwd() / "shopping_list.md"
content = path.read_text(encoding="utf-8")
groceries = [line for line in content.splitlines() if line.startswith("*")]
print("\n".join(groceries))
```

You can also specify paths directly as filenames, in which case they’re interpreted relative to the current working directory. So you can condense the example above even more:

```py{3} title="read_shopping_list.py"
from pathlib import Path

content = Path("shopping_list.md").read_text(encoding="utf-8")
groceries = [line for line in content.splitlines() if line.startswith("*")]
print("\n".join(groceries))
```

If you want to create a plain shopping list that only contains the groceries, then you can use `.write_text()` in a similar fashion:

```py{6} title="write_plain_shoppinglist.py"
from pathlib import Path

content = Path("shopping_list.md").read_text(encoding="utf-8")
groceries = [line for line in content.splitlines() if line.startswith("*")]

Path("plain_list.md").write_text("\n".join(groceries), encoding="utf-8")
```

When using `.write_text()`, Python overwrites any existing files on the same path without giving you any notice. That means you could erase all your hard work with a single keystroke! As always, when you write files with Python, you should be cautious of what your code is doing. The same is true when you’re renaming files.

### Renaming Files

When you want to rename files, you can use `.with_stem()`, `.with_suffix()`, or `.with_name()`. They return the original path but with the filename, the file extension, or both replaced.

If you want to change a file’s extension, then you can use `.with_suffix()` in combination with `.replace()`:

```py
from pathlib import Path
txt_path = Path("/home/gahjelle/realpython/hello.txt")
txt_path
# 
# PosixPath("/home/gahjelle/realpython/hello.txt")

md_path = txt_path.with_suffix(".md")
#
# PosixPath('/home/gahjelle/realpython/hello.md')

txt_path.replace(md_path)
```

Using `.with_suffix()` returns a new path. To actually rename the file, you use `.replace()`. This moves `txt_path` to `md_path` and renames it when saving.

If you want to change the complete filename, including the extension, then you can use `.with_name()`:

```py
from pathlib import Path
txt_path = Path("/home/gahjelle/realpython/hello.txt")
txt_path
#
# PosixPath("/home/gahjelle/realpython/hello.txt")

md_path = txt_path.with_name("goodbye.md")
#
# PosixPath('/home/gahjelle/realpython/goodbye.md')

txt_path.replace(md_path)
```

The code above renames `hello.txt` to `goodbye.md`.

If you want to rename the filename only, keeping the suffix as it is, then you can use `.with_stem()`. You’ll explore this method in the next section.

### Copying Files

Surprisingly, `Path` doesn’t have a method to copy files. But with the knowledge that you’ve gained about `pathlib` so far, you can create the same functionality with a few lines of code:

```py{4}
from pathlib import Path
source = Path("shopping_list.md")
destination = source.with_stem("shopping_list_02")
destination.write_bytes(source.read_bytes())
```

You’re using `.with_stem()` to create the new filename without changing the extension. The actual copying takes place in the highlighted line, where you use `.read_bytes()` to read the content of `source` and then write this content to `destination` using `.write_bytes()`.

While it’s tempting to use `pathlib` for everything path related, you may also consider [**using `shutil` for copying files**](/realpython.com/working-with-files-in-python/README.md#copying-files-in-python). It’s a great alternative that also knows how to work with `Path` objects.

### Moving and Deleting Files

Through `pathlib`, you also have access to basic file system–level operations like moving, updating, and even deleting files. For the most part, these methods don’t give a warning or wait for confirmation before getting rid of information or files. So, be careful when using these methods.

To move a file, you can use `.replace()`. Note that if the destination already exists, then `.replace()` will overwrite it. To avoid possibly overwriting the destination path, you can test whether the destination exists before replacing:

```py
from pathlib import Path

source = Path("hello.py")
destination = Path("goodbye.py")

if not destination.exists():
    source.replace(destination)
```

However, this does leave the door open for a possible [<VPIcon icon="fa-brands fa-python"/><VPIcon icon="fa-brands fa-wikipedia-w"/>race condition](https://en.wikipedia.org/wiki/Race_condition). Another process may add a file at the `destination` path between the execution of the `if` statement and the `.replace()` method. If that’s a concern, then a safer way is to open the destination path for [<VPIcon icon="fa-brands fa-python"/>exclusive creation](https://docs.python.org/3/library/functions.html#open) then explicitly copy the source data and delete the source file afterward:

```py
from pathlib import Path

source = Path("hello.py")
destination = Path("goodbye.py")

try:
    with destination.open(mode="xb") as file:
        file.write(source.read_bytes())
except FileExistsError:
    print(f"File {destination} exists already.")
else:
    source.unlink()
```

If `destination` already exists, then the code above catches a `FileExistsError` and prints a warning. To perform a move, you need to delete `source` with `.unlink()` after the copy is done. Using `else` ensures that the source file isn’t deleted if the copying fails.

### Creating Empty Files

To create an empty file with `pathlib`, you can use `.touch()`. This method is intended to update a file’s modification time, but you can use its side effect to create a new file:

```py
from pathlib import Path
filename = Path("hello.txt")
filename.exists()
#
# False

filename.touch()
filename.exists()
#
# True

filename.touch()
```

In the example above, you instantiate a `Path` object and create the file using `.touch()`. You use `.exists()` both to verify that the file didn’t exist before and then to check that it was successfully created. If you use `.touch()` again, then it updates the file’s modification time.

If you don’t want to modify files accidentally, then you can use the `exist_ok` parameter and set it to `False`:

```py
filename.touch(exist_ok=False)
#
# Traceback (most recent call last):
#  ...
# FileExistsError: [Errno 17] File exists: 'hello.txt'
```

When you use `.touch()` on a file path that doesn’t exist, you create a file without any content. Creating an empty file with `Path.touch()` can be useful when you want to reserve a filename for later use, but you don’t have any content to write to it yet. For example, you may want to create an empty file to ensure that a certain filename is available, even if you don’t have content to write to it at the moment.

---

## Python `pathlib` Examples

In this section, you’ll see some examples of how to use `pathlib` to deal with everyday challenges that you’re facing as a Python developer. You can use these examples as starting points for your own code or save them as code snippets for later reference.

### Counting Files

There are a few different ways to [**get a list of all the files in a directory with Python**](/realpython.com/get-all-files-in-directory-python.md). With `pathlib`, you can conveniently use the `.iterdir()` method, which iterates over all the files in the given directory. In the following example, you combine `.iterdir()` with the [**`collections.Counter` class**](/realpython.com/python-counter.md) to count how many files of each file type are in the current directory:

```py
from pathlib import Path
from collections import Counter
Counter(path.suffix for path in Path.cwd().iterdir())
#
# Counter({'.md': 2, '.txt': 4, '.pdf': 2, '.py': 1})
```

You can create more flexible file listings with the methods `.glob()` and `.rglob()`. For example, `Path.cwd().glob("*.txt")` returns all the files with a `.txt` suffix in the current directory. In the following, you only count file extensions starting with `p`:

```py
Counter(path.suffix for path in Path.cwd().glob("*.p*"))
#
# Counter({'.pdf': 2, '.py': 1})
```

If you want to recursively find all the files in both the directory and its subdirectories, then you can use `.rglob()`. This method also offers a cool way to display a directory tree, which is the next example.

### Displaying a Directory Tree

In this example, you define a function named `tree()`, which will print a visual tree representing the file hierarchy, rooted at a given directory. This is useful when, for example, you want to peek into the subdirectories of a project.

To traverse the subdirectories as well, you use the [**`.rglob()` method**](https://realpython.com/get-all-files-in-directory-python.md#recursively-listing-with-rglob):

```py title="display_dir_tree.py"
def tree(directory):
    print(f"+ {directory}")
    for path in sorted(directory.rglob("*")):
        depth = len(path.relative_to(directory).parts)
        spacer = "    " * depth
        print(f"{spacer}+ {path.name}")
```

Note that you need to know how far away from the root directory a file is located. To do this, you first use `.relative_to()` to represent a path relative to the root directory. Then, you use the `.parts` property to count the number of directories in the representation. When run, this function creates a visual tree like the following:

```py
from pathlib import Path
from display_dir_tree import tree
tree(Path.cwd())
#
# + /home/gahjelle/realpython
#     + directory_1
#         + file_a.md
#     + directory_2
#         + file_a.md
#         + file_b.pdf
#         + file_c.py
#     + file_1.txt
#     + file_2.txt
```

If you want to push this code to the next level, then you can try building a [**directory tree generator for the command line**](/realpython.com/directory-tree-generator-python.md).

### Finding the Most Recently Modified File

The `.iterdir()`, `.glob()`, and `.rglob()` methods are great fits for [**generator expressions**](/realpython.com/introduction-to-python-generators.md) and [**list comprehensions**](/realpython.com/list-comprehension-python.md). To find the most recently modified file in a directory, you can use the `.stat()` method to get information about the underlying files. For instance, `.stat().st_mtime` gives the time of last modification of a file:

```py
from pathlib import Path
from datetime import datetime
directory = Path.cwd()
time, file_path = max((f.stat().st_mtime, f) for f in directory.iterdir())
print(datetime.fromtimestamp(time), file_path)
#
# 2023-03-28 19:23:56.977817 /home/gahjelle/realpython/test001.txt
```

The timestamp returned from a property like `.stat().st_mtime` represents seconds since January 1, 1970, also known as the [**epoch**](/realpython.com/python-time-module.md#the-epoch). If you’d prefer a different format, then you can use `time.localtime` or `time.ctime` to convert the timestamp to something more usable. If this example has sparked your curiosity, then you may want learn more about [**how to get and use the current time in Python**](/realpython.com/python-get-current-time.md).

### Creating a Unique Filename

In the last example, you’ll construct a unique numbered filename based on a template string. This can be handy when you don’t want to overwrite an existing file if it already exists:

```py title="unique_path.py"
def unique_path(directory, name_pattern):
    counter = 0
    while True:
        counter += 1
        path = directory / name_pattern.format(counter)
        if not path.exists():
            return path
```

In `unique_path()`, you specify a pattern for the filename, with room for a counter. Then, you check the existence of the file path created by joining a directory and the filename, including a value for the counter. If it already exists, then you increase the counter and try again.

Now you can use the script above to get unique filenames:

```py
>>> from pathlib import Path
>>> from unique_path import unique_path
>>> template = "test{:03d}.txt"
>>> unique_path(Path.cwd(), template)
PosixPath("/home/gahjelle/realpython/test003.txt")
```

If the directory already contains the files `test001.txt` and `test002.txt`, then the above code will set `path` to `test003.txt`.

---

## Conclusion

Python’s `pathlib` module provides a modern and Pythonic way of working with file paths, making code more readable and maintainable. With `pathlib`, you can represent file paths with dedicated `Path` objects instead of plain strings.

::: info In this tutorial, you’ve learned how to

- Work with file and directory **paths** in Python
- **Instantiate** a `Path` object in different ways
- Use `pathlib` to **read and write** files
- Carefully **copy, move, and delete** files
- **Manipulate paths** and the underlying file system
- **Pick out components** of a path

:::

The `pathlib` module makes dealing with file paths convenient by providing helpful methods and properties. Peculiarities of the different systems are hidden by the `Path` object, which makes your code more consistent across operating systems.

If you want to get an overview PDF of the handy methods and properties that `pathlib` offers, then you can click the link below:

---

## Frequently Asked Questions

Now that you have some experience with Python’s `pathlib` module, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details What are the benefits of using `pathlib` over traditional string paths in Python?

The `pathlib` module provides a more intuitive and readable way to handle file paths with its object-oriented approach, methods, and attributes, reducing the need to import multiple libraries and making your code more platform-independent.

:::

::: details How do you instantiate a `Path` object in Python’s `pathlib`?

You can instantiate a `Path` object by importing `Path` from `pathlib` and then using `Path()` with a string representing the file or directory path. You can also use class methods like `Path.cwd()` for the current working directory or `Path.home()` for the user’s home directory.

:::

::: details How do you check if a path is a file in Python `pathlib`?

You can check if a path is a file by using the `.is_file()` method on a `Path` object. This method returns `True` if the path points to a file and `False` otherwise.

:::

::: details How do you join paths using `pathlib`?

You can join paths using the forward slash operator (`/`) or the `.joinpath()` method to combine path components into a single `Path` object.

:::

::: details How can you read a file using Python’s `pathlib`?

You can read a file using `pathlib` by creating a `Path` object for the file and then calling the `.read_text()` method to get the file’s contents as a string. Alternatively, use `.open()` with a `with` statement to read the file using traditional file handling techniques.

:::

::: details What method can you use to create an empty file with `pathlib`?

You can use the `.touch()` method of a `Path` object to create an empty file with `pathlib`.

:::

::: details How can you read and write files using `pathlib`?

You can use the `.read_text()` and `.write_text()` methods of a `pathlib.Path` object for reading and writing text files, and `.read_bytes()` and `.write_bytes()` for binary files. These methods handle file opening and closing for you.

:::

::: details How do you create a unique filename using Python `pathlib`?

You can create a unique filename by constructing a path with a counter in a loop, checking for the existence of the file using `.exists()`, and incrementing the counter until you find a filename that doesn’t exist.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python's pathlib Module: Taming the File System",
  "desc": "Python's pathlib module enables you to handle file and folder paths in a modern way. This built-in module provides intuitive semantics that work the same way on different operating systems. In this tutorial, you'll get to know pathlib and explore common tasks when interacting with paths.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-pathlib.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
