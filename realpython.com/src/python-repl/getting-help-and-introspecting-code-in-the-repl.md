---
lang: en-US
title: "Getting Help and Introspecting Code in the REPL"
description: "Article(s) > (5/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (5/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Getting Help and Introspecting Code in the REPL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/getting-help-and-introspecting-code-in-the-repl.html
date: 2023-01-25
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Python Standard REPL: Try Out Code and Ideas Quickly",
  "desc": "In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more.",
  "link": "/realpython.com/python-repl/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Python Standard REPL: Try Out Code and Ideas Quickly"
  desc="In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/python-repl#getting-help-and-introspecting-code-in-the-repl"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

An important feature of any coding environment like an IDE (or integrated development environment), editor, or REPL is the possibility of getting quick help and guidance about using the language, libraries, and tools that you’re working with.

If you’re working on the standard REPL, then you’ll have a few tools that allow you to get help and introspect your code depending on your needs and specific context.

---

## Using Python’s Built-in Help System

The built-in [<VPIcon icon="fa-brands fa-python"/>`help()`](https://docs.python.org/3/library/functions.html#help) function gives you access to Python’s **built-in help system**. You can use this function by calling it in two ways:

1. With an **object** or a **string** as an argument, which gives you access to the object’s help page
2. With **no arguments**, which enters Python’s help system

The help page of an object typically contains information from the object’s docstrings. It may also include a list of methods and attributes. For example, here’s a fragment from the page of the [<VPIcon icon="fa-brands fa-python"/>`str`](https://docs.python.org/3/library/stdtypes.html#str) class that you can access by typing `help(str)` in your REPL session:

```py :collapsed-lines
help(str)
# 
# Help on class str in module builtins:
# 
# class str(object)
#  |  str(object='') -> str
#  |  str(bytes_or_buffer[, encoding[, errors]]) -> str
#  |
#  |  Create a new string object from the given object. If encoding or
#  |  errors is specified, then the object must expose a data buffer
#  |  that will be decoded using the given encoding and error handler.
#  |  Otherwise, returns the result of object.__str__() (if defined)
#  |  or repr(object).
#  |  encoding defaults to sys.getdefaultencoding().
#  |  errors defaults to 'strict'.
#  |
#  |  Methods defined here:
#  |
#  |  __add__(self, value, /)
#  |      Return self+value.
#  |
#  |  __contains__(self, key, /)
#  |      Return key in self.
# ...
```

In this example, you use the `str` class object as an argument to `help()`. This way, you access the class’s help page. You can use the Up and Down keys to move through the page. When you get the desired information, you can press the Q key to exit the help viewer.

If you use a string as an argument to `help()`, then the help system looks for it as the name of a module, function, class, method, keyword, or documentation topic. The corresponding help page is printed on the screen. This way to call `help()` comes in handy when the target object isn’t available in your current [**namespace**](/realpython.com/python-namespaces-scope.md).

For example, say that you want to get help on the [**`pathlib`**](/realpython.com/python-pathlib.md) module, but you haven’t imported it yet. Then you can run `help()` with the string `"pathlib"` as an argument. You’ll get something like the following:

```py :collapsed-lines
help("pathlib")
# 
# Help on module pathlib:
# 
# NAME
#  pathlib
# 
# MODULE REFERENCE
#  https://docs.python.org/3.11/library/pathlib.html
# 
#  The following documentation is automatically generated from the Python
#  source files.  It may be incomplete, incorrect or include features that
#  are considered implementation detail and may vary between Python
#  implementations.  When in doubt, consult the module reference at the
#  location listed above.
# ...
```

The call to `help()` with `"pathlib"` as an argument displays the module’s help page. Note that if you call `help()` with the `pathlib` name as an argument, then you’ll get a `NameError` because you haven’t imported the module to your current namespace.

The second way to use `help()` is to call the function without arguments. This way, you enter the built-in help system:

```py
help()
```

This call allows you to enter help mode. Once you run it, you’ll immediately note that the prompt changes from `>>>` to `help>`. This new prompt reminds you that you’re in the interactive help mode.

In help mode, you can enter keywords, module names, function names, or any other name. The help system will search for the target name and present the associated documentation page. To try this functionality out, go ahead and type `sys` on the `help>` prompt, then press <kbd>Enter</kbd>. You’ll get the following page on your screen:

```py
help> sys
# 
# Help on built-in module sys:
# 
# NAME
#  sys
# 
# MODULE REFERENCE
#  https://docs.python.org/3.11/library/sys.html
# 
#  The following documentation is automatically generated from the Python
#  source files.  It may be incomplete, incorrect or include features that
#  are considered implementation detail and may vary between Python
#  implementations.  When in doubt, consult the module reference at the
#  location listed above.
# ...
```

Again, to exit the page, you can press the Q key on your keyboard. The help system allows you to search for different topics. Just type the desired topic and press <kbd>Enter</kbd>. If the topic has a documentation page, then you’ll get it on your screen. Otherwise, you’ll get an `ImportError` that’ll bring you back to the primary prompt:

```py :collapsed-lines
help> keywords
# 
# Here is a list of the Python keywords.  Enter any keyword to get more help.
# 
# False               class               from                or
# None                continue            global              pass
# True                def                 if                  raise
# and                 del                 import              return
# as                  elif                in                  try
# assert              else                is                  while
# async               except              lambda              with
# await               finally             nonlocal            yield
# break               for                 not

help> iterable
# 
# Traceback (most recent call last):
#  ...
# ImportError: No Python documentation found for 'iterable'.
# Use help() to get the interactive help utility.
# Use help(str) for help on the str class.
```

In this example, you first search for the term `keywords`. This search finds and shows the page on Python keywords. Then, you search for the term `iterable`. Unfortunately, this topic doesn’t have a documentation page, so you get an `ImportError` that takes you out of the help system.

Once you’ve found the required information, then you can exit the help system by typing `q` or `quit` and then pressing <kbd>Enter</kbd>. This way, you’ll be back to your REPL session.

---

## Introspecting Your Code Dynamically

When you’re working in a REPL session, you have direct access to some cool Python built-in tools that you can use to introspect your code and obtain more information and context on the objects that you’re working with.

Some of these built-in tools include the following:

| Function | Description |
| --- | --- |
| [<VPIcon icon="fa-brands fa-python"/>`dir()`](https://docs.python.org/3/library/functions.html#dir) | Returns the list of names in the current [**local scope**](/realpython.com/python-scope-legb-rule.md#functions-the-local-scope) when you call it with no argument. Attempts to return a list of valid attributes for the object passed as an argument. |
| [<VPIcon icon="fa-brands fa-python"/>`vars()`](https://docs.python.org/3/library/functions.html#vars) | Returns the [<VPIcon icon="fa-brands fa-python"/>`.__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__) attribute for a module, class, instance, or any other object with this attribute. The `.__dict__` attribute holds a list of names pertaining to the underlying object. |
| [<VPIcon icon="fa-brands fa-python"/>`locals()`](https://docs.python.org/3/library/functions.html#locals) | Returns a dictionary representing the names in the current local scope. |
| [<VPIcon icon="fa-brands fa-python"/>`globals()`](https://docs.python.org/3/library/functions.html#globals) | Returns the dictionary representing the current module namespace. |
| [<VPIcon icon="fa-brands fa-python"/>`type()`](https://docs.python.org/3/library/functions.html#type) | Returns the type of an *object* when you call it with one argument. |

You can use any of these built-in functions to introspect your code and retrieve useful information that you can later use in your coding process.

For example, say that you’re working with dictionaries and want to get a list of all the methods and attributes in this class. You can do something like this:

```py
dir(dict)
# 
# ['__class__', ..., 'popitem', 'setdefault', 'update', 'values']
```

The output in this example shows a list of names as strings. This list will include the attributes and methods defined in the `dict` class. You can use this built-in function with any Python object.

The `vars()` function works similarly to `dir()` but returns a dictionary of name-object pairs instead of a list.

The `locals()` and `globals()` functions can also be useful when you want to know the names defined in a given scope in your code. Finally, the `type()` function helps you determine the data type or class of a given object in your code.
