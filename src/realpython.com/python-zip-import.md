---
lang: en-US
title: "Python Zip Imports: Distribute Modules and Packages Quickly"
description: "Article(s) > Python Zip Imports: Distribute Modules and Packages Quickly"
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
      content: "Article(s) > Python Zip Imports: Distribute Modules and Packages Quickly"
    - property: og:description
      content: "Python Zip Imports: Distribute Modules and Packages Quickly"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-zip-import.html
prev: /programming/py/articles/README.md
date: 2021-12-27
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Importing-Python-Code-From-a-ZIP-Archive_Watermarked.39d7915f1029.jpg
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
  name="Python Zip Imports: Distribute Modules and Packages Quickly"
  desc="In this step-by-step tutorial, you'll learn what Zip imports are and how to use them in Python. You'll learn to create your own importable ZIP files and make them available for use. Finally, you'll learn how to use the zipimport module to dynamically import code from ZIP files."
  url="https://realpython.com/python-zip-import"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Importing-Python-Code-From-a-ZIP-Archive_Watermarked.39d7915f1029.jpg"/>

Python allows you to import code from ZIP files directly through **Zip imports**. This interesting built-in feature enables you to zip Python code for distribution purposes. Zip imports also help if you often work with Python code that comes in ZIP files. In either case, learning to create importable ZIP files and to import code from them will be a valuable skill.

Even if your day-to-day workflow doesn’t involve ZIP files containing Python code, you’ll still learn some fun and interesting new skills by exploring Zip imports through this tutorial.

::: info In this tutorial, you’ll learn:

- What **Zip imports are**
- When to **use Zip imports** in your code
- How to create **importable ZIP files** with `zipfile`
- How to make your ZIP files available for **importing code** from them

:::

You’ll also learn how to use the `zipimport` module to dynamically import code from ZIP files without adding them to Python’s module search path. To do this, you’ll code a minimal plugin system that loads Python code from ZIP files.

To get the most out of this tutorial, you should have previous knowledge of how Python’s [**import system**](/realpython.com/python-import.md) works. You should also know the basics of manipulating ZIP files with [**`zipfile`**](/realpython.com/python-zipfile.md), [**working with files**](/realpython.com/working-with-files-in-python.md), and using the [**`with` statement**](/realpython.com/python-with-statement/README.md).

---

## Get to Know Python Zip Imports

Since Python [<FontIcon icon="fa-brands fa-python"/>2.3](https://docs.python.org/3/whatsnew/2.3.html#pep-273-importing-modules-from-zip-archives), you can import [**modules and packages**](/realpython.com/python-modules-packages.md) from inside [**ZIP files**](/realpython.com/python-zipfile.md#what-is-a-zip-file). This feature is known as **Zip imports** and is quite helpful when you need to distribute a complete package as a single file, which is its most common use case.

[<FontIcon icon="fa-brands fa-python"/>PEP 273](https://python.org/dev/peps/pep-0273/) introduced Zip imports as a built-in feature. The feature was widely accepted as a must-have among the Python community because distributing several separate `.py`, `.pyc`, and `.pyo` files isn’t always appropriate and efficient.

Zip imports can simplify the process of sharing and distributing your code so that your colleagues and end users don’t have to fumble around trying to extract the files into the right location to get the code working.

::: note

The `.pyo` file extension is no longer used, as of [<FontIcon icon="fa-brands fa-python"/>Python 3.5](https://docs.python.org/3/whatsnew/3.5.html#pep-488-elimination-of-pyo-files). See [<FontIcon icon="fa-brands fa-python"/>PEP 488](https://python.org/dev/peps/pep-0488/) for details.

:::

[<FontIcon icon="fa-brands fa-python"/>PEP 302](https://python.org/dev/peps/pep-0302/) added a series of **import [<FontIcon icon="fa-brands fa-wikipedia-w"/>hooks](https://en.wikipedia.org/wiki/Hooking)** that provides built-in support for Zip imports. If you want to import modules and packages from a ZIP file, then you just need the file to appear in Python’s [**module search path**](/realpython.com/python-modules-packages.md#the-module-search-path).

The module search path is a list of directories and ZIP files. It lives in [<FontIcon icon="fa-brands fa-python"/>`sys.path`](https://docs.python.org/3/library/sys.html#sys.path). Python automatically searches through items in this list when you run an [**`import`**](/realpython.com/python-import.md) statement in your code.

In the following sections, you’ll learn how to create ready-to-import ZIP files using different Python tools and techniques. You’ll also learn about a few ways to add those files to your current Python’s module search path. Finally, you’ll dig into `zipimport`, the module that supports the Zip import feature behind the scenes.

---

## Create Your Own Importable ZIP Files

Zip imports allow you to quickly distribute code that’s organized across several modules and packages as a single file. Python has you covered when it comes to creating **importable ZIP files**. The [<FontIcon icon="fa-brands fa-python"/>`zipfile`](https://docs.python.org/3/library/zipfile.html) module from the [<FontIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html) includes a class called [<FontIcon icon="fa-brands fa-python"/>`ZipFile`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile) for manipulating ZIP files. It also includes a more specialized class called [<FontIcon icon="fa-brands fa-python"/>`PyZipFile`](https://docs.python.org/3.9/library/zipfile.html#zipfile.PyZipFile), which facilitates the creation of importable ZIP files.

`PyZipFile` lets you bundle Python code into ZIP files quickly and efficiently. The class inherits from `ZipFile`, so it shares the same base interface. However, there are two main differences between these classes:

1. The initializer of `PyZipFile` takes an optional argument called `optimize`, which allows you to optimize the Python code by compiling it to [<FontIcon icon="fa-brands fa-python"/>bytecode](https://docs.python.org/3/glossary.html#term-bytecode) before archiving it.
2. The `PyZipFile` class provides a method called [<FontIcon icon="fa-brands fa-python"/>`.writepy()`](https://docs.python.org/3/library/zipfile.html#pyzipfile-objects), which accepts a Python module or package as an argument and adds it to a target ZIP file.

If `optimize` is `-1`, its default value, then the input `.py` files are automatically compiled to `.pyc` files and then added to the target archive. Why does this happen? Packaging `.pyc` files rather than the original `.py` files makes the importing process way more efficient by skipping the compilation step. You’ll learn more about this topic in upcoming sections.

In the following two sections, you’ll get your hands dirty and start creating your own importable ZIP files containing modules and packages.

### Bundle Python Modules Into ZIP Files

In this section, you’ll use `PyZipFile.writepy()` to compile a `.py` file down to bytecode and add the resulting `.pyc` file to a ZIP archive. To try `.writepy()` out, say that you have a <FontIcon icon="fa-brands fa-python"/>`hello.py` module:

```py title="hello.py"
"""Print a greeting message."""

def greet(name="World"):
    print(f"Hello, {name}! Welcome to Real Python!")
```

This module defines a [**function**](/realpython.com/defining-your-own-python-function.md) called `greet()` that takes `name` as an argument and [**prints**](/realpython.com/python-print/README.md) a friendly greeting message to the screen.

Now say that you want to package this module into a ZIP file that you can import later. To do this, you can run the following code:

```py
import zipfile

with zipfile.PyZipFile("hello.zip", mode="w") as zip_module:
    zip_module.writepy("hello.py")

with zipfile.PyZipFile("hello.zip", mode="r") as zip_module:
    zip_module.printdir()
# 
# File Name                                             Modified             Size
# hello.pyc                                      2021-10-18 05:40:04          313
```

After running this code, you’ll have a `hello.zip` file in your current working directory. The call to `.writepy()` on `zip_module` automatically compiles `hello.py` to `hello.pyc` and stores it in the underlying ZIP file, `hello.zip`. That’s why [<FontIcon icon="fa-brands fa-python"/>`.printdir()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.printdir) displays `hello.pyc` instead of your original `hello.py` file. This automatic compilation ensures an efficient import process.

::: note

The `PyZipFile` class doesn’t compress your Python modules and packages by default. It just stores them in a ZIP file container. If you want to squeeze your source files, you need to explicitly supply a compression method through the `compression` argument of `PyZipFile`. Currently, Python supports the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Deflate](https://en.wikipedia.org/wiki/Deflate), [<FontIcon icon="fa-brands fa-wikipedia-w"/>bzip2](https://en.wikipedia.org/wiki/Bzip2), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>LZMA](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm) compression methods.

In this tutorial, you’ll rely on the default value of `compression`, [<FontIcon icon="fa-brands fa-python"/>`ZIP_STORED`](https://docs.python.org/3/library/zipfile.html#zipfile.ZIP_STORED), which means that your source files won’t be compressed. Compressing the source files can impact the performance of import operations, as you’ll learn later in this tutorial.

:::

You can also manually package `.py` and `.pyc` files into a ZIP file by using any regular [<FontIcon icon="fa-brands fa-wikipedia-w"/>file archiver](https://en.wikipedia.org/wiki/File_archiver). If the resulting archive contains `.py` files without the corresponding `.pyc` files, then Python will compile them the first time you import from that specific ZIP file.

Python won’t modify the underlying ZIP file to add the newly compiled `.pyc` files. So the next time you run the import, Python will compile the code again. This behavior will make the import process slower.

You can also pass a directory as the first argument to `.writepy()`. If the input directory isn’t a Python package, then the method scans it for `.py` files, compiles them to `.pyc` files, and adds those `.pyc` files at the top level of the target ZIP file. The scanning step isn’t recursive, which means that subdirectories aren’t scanned for source files.

You can tweak the compilation process further by setting the `optimize` argument of `PyZipFile` to one of the following values:

| Value | Optimizations |
| ---: | :--- |
| `0` | Doesn’t perform any optimizations |
| `1` | Removes [**`assert` statements**](/realpython.com/python-assert-statement.md) |
| `2` | Removes `assert` statements and [**docstrings**](/realpython.com/documenting-python-code.md) |

With these values, you can fine-tune the level of optimization you want to use when `.writepy()` compiles your `.py` files to `.pyc` files before archiving them.

So far, you’ve learned how to bundle one or more modules into a ZIP file. In your day-to-day coding, you might also need to zip a complete Python package. You’ll learn how to do that in the following section.

### Bundle Python Packages Into ZIP Files

You can also bundle Python packages into ZIP files by using `PyZipFile` and its `.writepy()` method. As you already learned, if you pass a regular directory as the first argument to `.writepy()`, then the method scans the directory for `.py` files, compiles them, and adds the corresponding `.pyc` files to the resulting ZIP file.

On the other hand, if the input directory is a Python package, then `.writepy()` compiles all the `.py` files and adds them to the ZIP file, keeping the package’s internal structure.

To try `.writepy()` with a Python package, create a new <FontIcon icon="fas fa-folder-open"/>`hello/` directory and copy your <FontIcon icon="fa-brands fa-python"/>`hello.py` file into it. Then add an empty <FontIcon icon="fa-brands fa-python"/>`__init__.py` module to turn the directory into a package. You should end up with the following structure:

```plaintext title="file structure"
hello/
|
├── __init__.py
└── hello.py
```

Now suppose that you want to bundle this package into a ZIP file for distribution purposes. If that’s the case, then you can run the following code:

```py
import zipfile

with zipfile.PyZipFile("hello_pkg.zip", mode="w") as zip_pkg:
    zip_pkg.writepy("hello")

with zipfile.PyZipFile("hello_pkg.zip", mode="r") as zip_pkg:
    zip_pkg.printdir()
# 
# File Name                                             Modified             Size
# hello/__init__.pyc                             2021-10-18 05:56:00          110
# hello/hello.pyc                                2021-10-18 05:56:00          319
```

The call to `.writepy()` takes the `hello` package as an argument, searches for `.py` files inside it, compiles them to `.pyc` files, and finally adds them to the target ZIP file, keeping the same package structure.

### Understand the Limitations of Zip Imports

When you use ZIP files to distribute Python code, you need to consider a few limitations of Zip imports:

- Loading **dynamic files**, such as `.pyd`, `.dll`, and `.so`, **isn’t possible**.
- Importing code from **`.py` files** implies a **performance compromise**.
- Importing code from **compressed files** will fail if the **decompression library** isn’t available.

You can include any type of file in your ZIP archives. However, when your users import code from these archives, only `.py`, `.pyw`, `.pyc`, and `.pyo` files are read. Importing code from dynamic files, such as `.pyd`, `.dll`, and `.so`, isn’t possible if they live in a ZIP file. For example, you can’t load shared libraries and extension modules written in [**C**](/realpython.com/c-for-python-programmers.md) from ZIP archives.

You can work around this limitation by extracting dynamic modules from your ZIP files, writing them to the file system, and then loading their code. However, that means you need to create temporary files and deal with possible errors and security risks, which can complicate things.

Zip imports can also imply a performance compromise, as you learned earlier in this tutorial. If your archive contains `.py` modules, then Python will compile them to satisfy the imports. However, it won’t save the corresponding `.pyc` files. This behavior may reduce the performance of import operations.

Finally, if you need to import code from a compressed ZIP file, then [<FontIcon icon="fa-brands fa-python"/>`zlib`](https://docs.python.org/3/library/zlib.html) must be available in your working environment for decompression purposes. Importing code from compressed archives fails with a missing `zlib` message if this library isn’t available. Additionally, the decompression step adds extra performance overhead to the import process. For these reasons, you’ll use uncompressed ZIP files in this tutorial.

---

## Import Python Code From ZIP Files

Up to this point, you’ve learned how to create your own importable ZIP files for distribution purposes. Now say that you’re at the other end, and you’re getting ZIP files with Python modules and packages. How can you import code from them? In this section, you’ll get answers to this question and learn how to make ZIP files available for importing their content.

For Python to import code from a ZIP file, that file must be available in Python’s module search path, which is stored in `sys.path`. This module-level variable holds a [**list**](/realpython.com/python-list.md) of [**strings**](/realpython.com/python-strings.md) specifying the search path for modules. The content of `path` includes:

- The directory containing the script that you’re [**running**](/realpython.com/run-python-scripts.md)
- The current directory, if you’ve run the interpreter [**interactively**](/realpython.com/interacting-with-python.md)
- The directories in the [<FontIcon icon="fa-brands fa-python"/>`PYTHONPATH`](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONPATH) environment variable, if set
- A directory list that depends on your specific Python installation
- The directories listed in any path configuration files (`.pth` files)

The following table points out a few ways to add your ZIP files to `sys.path`:

| Option | Target Code or Interpreter |
| --- | --- |
| The `list.insert()`, `list.append()`, and `list.extend()` methods | The Python code that you’re writing and running |
| The `PYTHONPATH` environment variable | Every Python interpreter that you run on your system |
| A Python path configuration file, or `.pth` files | The Python interpreter that contains the `.pth` file |

In the following sections, you’ll explore these three ways to add items to `sys.path` so that you can make your ZIP files available for importing their content.

### Use `sys.path` Dynamically for Zip Imports

Because `sys.path` is a `list` object, you can manipulate it from your Python code by using regular `list` methods. In general, to add new items to a `list` object, you can use `.insert()`, [**`.append()`**](/realpython.com/python-append.md), or `.extend()`.

Typically, you’ll use `.insert(0, item)` to add new items to `sys.path` from your Python code. Calling `.insert()` this way inserts `item` at the beginning of the list, ensuring that your newly added item has precedence over the existing ones. Having `item` at the beginning enables you to [<FontIcon icon="fa-brands fa-wikipedia-w"/>shadow](https://en.wikipedia.org/wiki/Variable_shadowing) existing modules and packages when name collisions are possible.

Now say that you need to add the <FontIcon icon="fas fa-file-zipper"/>`hello.zip` file containing your <FontIcon icon="fa-brands fa-python"/>`hello.py` module to your current Python’s `sys.path`. In this case, you can run the  xample to work on your machine, you need to provide the correct path to <FontIcon icon="fas fa-file-zipper"/>`hello.zip`:

```py
import sys

# Insert the hello.zip into sys.path
sys.path.insert(0, "/path/to/hello.zip")

sys.path[0]
# 
# '/path/to/hello.zip'

# Import and use the code
import hello

hello.greet("Pythonista")
# 
# Hello, Pythonista! Welcome to Real Python!
```

Once you’ve added the path to <FontIcon icon="fas fa-file-zipper"/>`hello.zip` to your `sys.path`, then you can import objects from <FontIcon icon="fa-brands fa-python"/>`hello.py` as you would with any regular module.

If, like <FontIcon icon="fas fa-file-zipper"/>`hello_pkg.zip`, your ZIP file contains a Python package, then you can add it to `sys.path` too. In this case, the imports should be package-relative:

```py
import sys

sys.path.insert(0, "/path/to/hello_pkg.zip")

from hello import hello

hello.greet("Pythonista")
# 
# Hello, Pythonista! Welcome to Real Python!
```

Because your code is in a package now, you need to import the `hello` module from the `hello` package. Then you can access the `greet()` function as usual.

Another option for adding items to `sys.path` is to use `.append()`. This method takes a single object as an argument and adds it to the end of the underlying list. Restart your Python interactive session and run the code that provides the path to `hello.zip`:

```py
import sys

sys.path.append("/path/to/hello.zip")

# The hello.zip file is at the end of sys.path
sys.path[-1] '/path/to/hello.zip'

from hello import greet
greet("Pythonista")
# 
# Hello, Pythonista! Welcome to Real Python!
```

This technique works similarly to using `.insert()`. However, the path to your ZIP file is now at the end of `sys.path`. If any preceding item in the list contains a module called `hello.py`, then Python will import from that module instead of from your newly added `hello.py` module.

You can also use `.append()` in a loop to add several files to `sys.path`, or you can just use `.extend()`. This method takes an iterable of items and adds its content to the end of the underlying list. As with `.append()`, keep in mind that `.extend()` will add your files to the end of `sys.path`, so existing names can shadow modules and packages in your ZIP files.

### Use `PYTHONPATH` for System-Wide Zip Imports

In some situations, you may need a given ZIP file to be available for importing its content from any script or program that you run on your computer. In these situations, you can use the `PYTHONPATH` environment variable to make Python automatically load your archive into `sys.path` whenever you run the interpreter.

`PYTHONPATH` uses the same format as the [**`PATH`**](/realpython.com/add-python-to-path.md) environment variable, a list of directory paths separated by [<FontIcon icon="fa-brands fa-python"/>`os.pathsep`](https://docs.python.org/3/library/os.html#os.pathsep). On [<FontIcon icon="fa-brands fa-wikipedia-w"/>Unix](https://en.wikipedia.org/wiki/Unix) systems, such as Linux and macOS, this function returns a colon (`:`), while on Windows, it returns a semicolon (`;`).

For example, if you’re on Linux or macOS, then you can add your <FontIcon icon="fas fa-file-zipper"/>`hello.zip` file to `PYTHONPATH` by running the following command:

```sh
export PYTHONPATH="$PYTHONPATH:/path/to/hello.zip"
```

This command adds `/path/to/hello.zip` to your current `PYTHONPATH` and exports it so that it’s available in the current terminal session.

::: note

The above command exports a custom version of `PYTHONPATH` that includes the path to `hello.zip`. This custom version of the variable is only available in your current command-line session and will be lost once you close the session.

If you’re running [<FontIcon icon="fa-brands fa-wikipedia-w"/>Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) as your current [<FontIcon icon="fa-brands fa-wikipedia-w"/>shell](https://en.wikipedia.org/wiki/Unix_shell), then you can make this custom version of `PYTHONPATH` available for all your command-line sessions by adding the following code to your `.bashrc` file:

```sh title=".bashrc"

if [ -f /path/to/hello.zip ]; then
 export PYTHONPATH="$PYTHONPATH:/path/to/hello.zip"
fi
```

This code checks if `hello.zip` exists on your file system. If so, then it adds the file to the `PYTHONPATH` variable and exports it. Because Bash runs this file every time you launch a new command-line instance, the custom `PYTHONPATH` will be available in every session.

:::

Now you can issue the `python` command to run the interpreter. Once you’re there, check the content of `sys.path` as usual:

```py
import sys

sys.path
# 
# [..., '/path/to/hello.zip', ...]
```

Cool! Your `hello.zip` file is in the list. From this point on, you’ll be able to import objects from `hello.py` as you did in the above section. Go ahead and give it a try!

An important point to note in the above output is that your `hello.zip` file isn’t at the beginning of `sys.path`, which implies that a same-named module that appears earlier will take precedence over your `hello` module, according to how Python handles its [<FontIcon icon="fa-brands fa-python"/>module seach path](https://docs.python.org/3/tutorial/modules.html#the-module-search-path).

To add an item to `PYTHONPATH` on a Windows system, you can execute a command in your <FontIcon icon="fas fa-gears"/>`cmd.exe` window:

```batchfile
SET PYTHONPATH=%PYTHONPATH%;C:\path\to\hello.zip
```

This command adds <FontIcon icon="fas fa-folder-open"/>`C:\path\to\`<FontIcon icon="fas fa-file-zipper"/>`hello.zip` to the current content of the `PYTHONPATH` variable on your Windows machine. To check it out, run the Python interpreter in the same command prompt session and look at the content of `sys.path`, as you did before.

::: note

Again, the `PYTHONPATH` variable that you set with the above command will be available in your current terminal session only. To set the `PYTHONPATH` variable permanently on Windows, learn [<FontIcon icon="fa-brands fa-stack-overflow"/>how to add to the PYTHONPATH in Windows](https://stackoverflow.com/questions/3701646/how-to-add-to-the-pythonpath-in-windows-so-it-finds-my-modules-packages)

:::

Adding directories and ZIP files to the `PYTHONPATH` environment variable makes those entries available for whatever Python interpreter you run under the terminal session at hand. Finally, it’s important to note that Python will silently ignore nonexistent directories and ZIP files listed in `PYTHONPATH`, so keep an eye on that.

### Use a `.pth` File for Interpreter-Wide Zip Imports

Sometimes you may want to import code from a given ZIP file only when you’re running a specific Python interpreter. This is useful when you have a project that uses code from that ZIP file, and you don’t want the code to be available for the rest of your projects.

Python’s **path configuration files** allow you to extend the `sys.path` of a given interpreter with your custom directories and ZIP files.

A path configuration file uses the `.pth` file extension and can hold a list of paths to directories and ZIP files, one per line. This list of paths is added to `sys.path` every time you run the Python interpreter that provides the `.pth` file.

Python’s `.pth` files have a straightforward format:

- Each line must contain a single path entry.
- Blank lines and lines beginning with a number sign (`#`) are skipped.
- Lines starting with `import` are executed.

Once you have a suitable `.pth` file, you need to copy it to one of the **site directories** so that Python can find it and load its content. To get the site directories of your current Python environment, you can call [<FontIcon icon="fa-brands fa-python"/>`getusersitepackages()`](https://docs.python.org/3/library/site.html#site.getusersitepackages) from the [<FontIcon icon="fa-brands fa-python"/>`site`](https://docs.python.org/3/library/site.html) module. If you don’t have admin privileges on your current machine, then you can use the user site directory at [<FontIcon icon="fa-brands fa-python"/>`site.USER_SITE`](https://docs.python.org/3/library/site.html#site.USER_SITE).

::: note

The user site directory may not exist in your home folder. If that’s your case, then feel free to create it, following the required path structure.

:::

For example, the following command creates a `hello.pth` path configuration file for the system-wide Python 3 interpreter on Ubuntu:

```sh
sudo nano /usr/lib/python3/dist-packages/hello.pth
```

This command creates `hello.pth`, using the [<FontIcon icon="fa-brands fa-wikipedia-w"/>GNU nano](https://en.wikipedia.org/wiki/GNU_nano) text editor as `root`. Once there, type in the path to your `hello.zip` file. Save the file by pressing Ctrl+X, then Y, and finally Enter. Now this ZIP file will be available in `sys.path` when you launch the system Python interpreter again:

```py
import sys

sys.path
# 
# [..., '/path/to/hello.zip', ...]
```

That’s it! From this point on, you can import objects from <FontIcon icon="fa-brands fa-python"/>`hello.py` as long as you use the system-wide Python interpreter.

Again, nonexistent directories and ZIP files won’t be added to `sys.path` when Python reads and loads the content of a given `.pth` file. Finally, repeated entries in a `.pth` file are added only once to `sys.path`.

---

## Explore Python’s `zipimport`: The Tool Behind Zip Imports

You’ve already used the [<FontIcon icon="fa-brands fa-python"/>`zipimport`](https://docs.python.org/3/library/zipimport.html#module-zipimport) module from the standard library without even knowing it. Behind the scenes, Python’s built-in import mechanism uses this module automatically when a `sys.path` item holds the path to a ZIP file. In this section, you’ll learn how `zipimport` works and how to use it explicitly in your code with a practical example.

### Understand the Basics of `zipimport`

The main component of `zipimport` is [<FontIcon icon="fa-brands fa-python"/>`zipimporter`](https://docs.python.org/3/library/zipimport.html#zipimport.zipimporter). This class takes the path to a ZIP file as an argument and creates an importer instance. Here’s an example of how to use `zipimporter` and some of its attributes and methods:

```py
from zipimport import zipimporter

importer = zipimporter("/path/to/hello.zip")

importer.is_package("hello")
#
# False

importer.get_filename("hello")
# 
# '/path/to/hello.zip/hello.pyc'

hello = importer.load_module("hello")
hello.__file__
# 
# '/path/to/hello.zip/hello.pyc'

hello.greet("Pythonista")
# 
# Hello, Pythonista! Welcome to Real Python!
```

In this example, you first import `zipimporter` from `zipimport`. Then you create a `zipimporter` instance with the path to your `hello.zip` file.

The `zipimporter` class provides several useful attributes and methods. For example, [<FontIcon icon="fa-brands fa-python"/>`.is_package()`](https://docs.python.org/3/library/zipimport.html#zipimport.zipimporter.is_package) returns `True` if the input name is a package and `False` otherwise. The [<FontIcon icon="fa-brands fa-python"/>`.get_filename()`](https://docs.python.org/3/library/zipimport.html#zipimport.zipimporter.get_filename) method returns the path ([<FontIcon icon="fa-brands fa-python"/>`.__file__`](https://docs.python.org/3/reference/import.html#file__)) to a given module inside the archive.

If you want to bring the module’s name into your current [**namespace**](/realpython.com/python-namespaces-scope.md), then you can use `.load_module()`, which returns a reference to the input module. With that reference, you can access any code object from the module as usual.

### Build a Plugin System With `zipimport`

As you learned above, Python internally uses `zipimport` to load code from ZIP files. You also learned that this module provides tools that you can use in some real-life coding situations. For example, say that you want to implement a custom plugin system in which each plugin lives in its own ZIP file. Your code should search for ZIP files in a given folder and automatically import the plugin’s functionality.

To experience this example in action, you’ll implement two toy plugins that take a message and a title and show them in both your default web browser and a [**Tkinter**](/realpython.com/python-gui-tkinter.md) message box. Each plugin should live in its own directory, in a module called `plugin.py`. This module should implement the plugin’s functionality and provide a [**`main()`**](/realpython.com/python-main-function.md) function as the plugin’s entry point.

Go ahead and create a folder called <FontIcon icon="fas fa-folder-open"/>`web_message/` with a <FontIcon icon="fa-brands fa-python"/>`plugin.py` file in it. Open the file in your favorite [**code editor or IDE**](/realpython.com/python-ides-code-editors-guide.md/) and type in the following code for the web browser plugin:

```py :collapsed-lines title="web_message/plugin.py"
"""A plugin that displays a message using webbrowser."""

import tempfile
import webbrowser

def main(text, title="Alert"):
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".html", delete=False
    ) as home:
        html = f"""
 <html>
 <head>
 <title>{title}</title>
 </head>
 <body>
 <h1>
 {text}
 </h1>
 </body>
 </html>
 """
        home.write(html)
        path = "file:/" + home.name
    webbrowser.open(path)
```

The `main()` function in this code takes a `text` message and a window `title`. Then it creates a [<FontIcon icon="fa-brands fa-python"/>`NamedTemporaryFile`](https://docs.python.org/3/library/tempfile.html#tempfile.NamedTemporaryFile) in a `with` statement. The file will contain a minimal HTML document showing `title` and `text` on the page. To open this file in your default web browser, you use `webbrowser.open()`.

The next plugin provides similar functionality but uses the `Tkinter` toolkit. The code for this plugin should also live in a module called <FontIcon icon="fa-brands fa-python"/>`plugin.py`. You can place the module in a directory called <FontIcon icon="fas fa-folder-open"/>`tk_message/` in your file system:

```py title="tk_message/plugin.py"
"""A plugin that displays a message using Tkinter."""

import tkinter
from tkinter import messagebox

def main(text, title="Alert"):
    root = tkinter.Tk()
    root.withdraw()
    messagebox.showinfo(title, text)
```

Following the same pattern as the web browser plugin, `main()` takes `text` and `title`. In this case, the function creates a [<FontIcon icon="fa-brands fa-python"/>`Tk`](https://docs.python.org/3/library/tkinter.html#tkinter.Tk) instance to hold the plugin’s top-level window. However, you don’t need to show that window, only a message box. So, you use `.withdraw()` to hide the root windows and then call `.showinfo()` on `messagebox` to show a dialog with the input `text` and `title`.

Now you need to pack each plugin into its own ZIP file. To do so, start a Python [**interactive session**](/realpython.com/interacting-with-python.md) in the directory containing the <FontIcon icon="fas fa-folder-open"/>`web_message/` and <FontIcon icon="fas fa-folder-open"/>`tk_message/` folders and run the following code:

```py
import zipfile

plugins = ("web_message", "tk_message")

for plugin in plugins:
    with zipfile.PyZipFile(f"{plugin}.zip", mode="w") as zip_plugin:
        zip_plugin.writepy(plugin)

```

The next step is to create a root folder for your plugin system. This folder must contain a <FontIcon icon="fas fa-folder-open"/>`plugins/` directory with the newly created ZIP files in it. Here’s how your directory should look:

```plaintext title="file structure"
rp_plugins/
│
├── plugins/
│   │
│   ├── tk_message.zip
│   └── web_message.zip
│
└── main.py
```

In <FontIcon icon="fa-brands fa-python"/>`main.py`, you’ll place the client code for your plugin system. Go ahead and populate <FontIcon icon="fa-brands fa-python"/>`main.py` with the following code:

```py collapsed-lines title="main.py"
import zipimport
from pathlib import Path

def load_plugins(path):
    plugins = []
    for zip_plugin in path.glob("*.zip"):
        importer = zipimport.zipimporter(zip_plugin)
        plugin_module = importer.load_module("plugin")
        plugins.append(getattr(plugin_module, "main"))
    return plugins

if __name__ == "__main__":
    path = Path("plugins/")
    plugins = load_plugins(path)
    for plugin in plugins:
        plugin("Hello, World!", "Greeting!")
```

Here’s how this code works line by line:

- **Line 1** imports `zipimport` to dynamically load your plugins from the corresponding ZIP files.
- **Line 2** imports [**`pathlib`**](/realpython.com/python-pathlib.md) to manage system paths.
- **Line 4** defines `load_plugins()`, which takes the path to the directory containing your plugin archives.
- **Line 5** creates an empty list to hold the current plugins.
- **Line 6** defines a [**`for` loop**](/realpython.com/python-for-loop.md) that iterates over the `.zip` files in the plugins directory.
- **Line 7** creates a `zipimporter` instance for every plugin in the system.
- **Line 8** loads the `plugin` module from each plugin ZIP file.
- **Line 9** appends each plugin’s `main()` function to the `plugins` list.
- **Line 10** [**returns**](/realpython.com/python-return-statement.md) the `plugins` list to the caller.

Lines 14 to 18 call `load_plugins()` to generate the current list of available plugins and execute them in a loop.

If you run the `main.py` script from your command line, then you first get a Tkinter message box displaying the `Hello, World!` message and the `Greeting!` title. After closing that window, your web browser will display the same message and title on a new page. Go ahead and give it a try!

---

## Conclusion

Python can import code directly from ZIP files if they’re available in the module search path. This feature is known as **Zip imports**. You can take advantage of Zip imports to bundle modules and packages into a single archive so that you can distribute them to your end users quickly and efficiently.

You can also take advantage of Zip imports if you often get Python code bundled into ZIP files and need to use that code in your day-to-day tasks.

::: info In this tutorial, you learned

- What **Zip imports are**
- When and how to **use Zip imports**
- How to build **importable ZIP files** with `zipfile`
- How to make ZIP files available to the **import mechanism**

:::

You also coded a hands-on example of how to build a minimal plugin system with `zipimport`. Through this example, you learned how to **dynamically import code** from ZIP files in Python.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python Zip Imports: Distribute Modules and Packages Quickly",
  "desc": "In this step-by-step tutorial, you'll learn what Zip imports are and how to use them in Python. You'll learn to create your own importable ZIP files and make them available for use. Finally, you'll learn how to use the zipimport module to dynamically import code from ZIP files.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-zip-import.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
