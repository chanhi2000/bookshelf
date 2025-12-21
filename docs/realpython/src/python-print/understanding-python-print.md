---
lang: en-US
title: "Understanding Python print()"
description: "Article(s) > (2/7) Your Guide to the Python print() Function"
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
      content: "Article(s) > (2/7) Your Guide to the Python print() Function"
    - property: og:description
      content: "Understanding Python print()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/understanding-python-print.html
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
  url="https://realpython.com/python-print#understanding-python-print"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

You know **how** to use `print()` quite well at this point, but knowing **what** it is will allow you to use it even more effectively and consciously. After reading this section, you’ll understand how printing in Python has improved over the years.

---

## Print Is a Function in Python 3

You’ve seen that `print()` is a function in Python 3. More specifically, it’s a built-in function, which means that you don’t need to import it from anywhere:

```py
print
# 
# <built-in function print>
```

It’s always available in the global namespace so that you can call it directly, but you can also access it through a module from the standard library:

```py
import builtins
builtins.print
# 
# <built-in function print>
```

This way, you can avoid name collisions with custom functions. Let’s say you wanted to **redefine** `print()` so that it doesn’t append a trailing newline. At the same time, you wanted to rename the original function to something like `println()`:

```py
import builtins
println = builtins.print
def print(*args, **kwargs):
    builtins.print(*args, **kwargs, end='')

println('hello')
# 
# hello
print('hello\n')
# 
# hello
```

Now you have two separate printing functions just like in the Java programming language. You’ll define custom `print()` functions in the [mocking section](/realpython.com/python-print/mocking-python-print-in-unit-tests.md) later as well. Also, note that you wouldn’t be able to overwrite `print()` in the first place if it wasn’t a function.

On the other hand, `print()` isn’t a function in the mathematical sense, because it doesn’t return any meaningful value other than the implicit `None`:

```py
value = print('hello world')
# 
# hello world
print(value)
# 
# None
```

Such functions are, in fact, procedures or subroutines that you call to achieve some kind of side-effect, which ultimately is a change of a global state. In the case of `print()`, that side-effect is showing a message on the standard output or writing to a file.

Because `print()` is a function, it has a well-defined signature with known attributes. You can quickly find its **documentation** using the editor of your choice, without having to remember some weird syntax for performing a certain task.

Besides, functions are easier to **extend**. Adding a new feature to a function is as easy as adding another keyword argument, whereas changing the language to support that new feature is much more cumbersome. Think of stream redirection or buffer flushing, for example.

Another benefit of `print()` being a function is **composability**. Functions are so-called [<VPIcon icon="fas fa-globe"/>first-class objects](https://realpython.com/lessons/functions-first-class-objects-python/) or [<VPIcon icon="fas fa-globe"/>first-class citizens](https://realpython.com/lessons/functions-are-first-class-citizens-python/) in Python, which is a fancy way of saying they’re values just like strings or numbers. This way, you can assign a function to a variable, pass it to another function, or even return one from another. `print()` isn’t different in this regard. For instance, you can take advantage of it for dependency injection:

```py
def download(url, log=print):
    log(f'Downloading {url}')
    # ...

def custom_print(*args):
    pass  # Do not print anything

download('/js/app.js', log=custom_print)
```

Here, the `log` parameter lets you inject a callback function, which defaults to `print()` but can be any callable. In this example, printing is completely disabled by substituting `print()` with a dummy function that does nothing.

::: note John Munsch, 28 October 2009

A **dependency** is any piece of code required by another bit of code.

**Dependency injection** is a technique used in code design to make it more testable, reusable, and open for extension. You can achieve it by referring to dependencies indirectly through abstract interfaces and by providing them in a **push** rather than **pull** fashion.

There’s a funny explanation of dependency injection circulating on the Internet:

> Dependency injection for five-year-olds
> 
> When you go and get things out of the refrigerator for yourself, you can cause problems. You might leave the door open, you might get something Mommy or Daddy doesn’t want you to have. You might even be looking for something we don’t even have or which has expired.
> 
> What you should be doing is stating a need, “I need something to drink with lunch,” and then we will make sure you have something when you sit down to eat.

<SiteInfo
  name="How to explain dependency injection to a 5-year-old?"
  desc="What is a good way to explain dependency injection? I found several tutorials on Google, but none of them that would assume the reader is just a Java beginner. How would you explain this to a novice?"
  url="https://stackoverflow.com/questions/1638919/how-to-explain-dependency-injection-to-a-5-year-old/"
  logo="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
  preview="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded"/>

:::

Composition allows you to combine a few functions into a new one of the same kind. Let’s see this in action by specifying a custom `error()` function that prints to the standard error stream and prefixes all messages with a given log level:

```py
from functools import partial
import sys
redirect = lambda function, stream: partial(function, file=stream)
prefix = lambda function, prefix: partial(function, prefix)
error = prefix(redirect(print, sys.stderr), '[ERROR]')
error('Something went wrong')
#
# [ERROR] Something went wrong
```

This custom function uses **partial functions** to achieve the desired effect. It’s an advanced concept borrowed from the [**functional programming**](/realpython.com/python-functional-programming.md) paradigm, so you don’t need to go too deep into that topic for now. However, if you’re interested in this topic, I recommend taking a look at the [`functools`](https://pymotw.com/3/functools/) module.

Unlike statements, functions are values. That means you can mix them with **expressions**, in particular, [**lambda expressions**](/realpython.com/python-lambda.md). Instead of defining a full-blown function to replace `print()` with, you can make an anonymous lambda expression that calls it:

```py
download('/js/app.js', lambda msg: print('[INFO]', msg))
#
# [INFO] Downloading /js/app.js
```

However, because a lambda expression is defined in place, there’s no way of referring to it elsewhere in the code.

::: note

In Python, you can’t put statements, such as assignments, conditional statements, loops, and so on, in an **anonymous lambda function**. It has to be a single expression!

:::

Another kind of expression is a ternary conditional expression:

```py
user = 'jdoe'
print('Hi!') if user is None else print(f'Hi, {user}.')
#
# Hi, jdoe.
```

Python has both [**conditional statements**](/realpython.com/python-conditional-statements.md) and [**conditional expressions**](/realpython.com/python-conditional-statements.md#conditional-expressions-pythons-ternary-operator). The latter is evaluated to a single value that can be assigned to a variable or passed to a function. In the example above, you’re interested in the side-effect rather than the value, which evaluates to `None`, so you simply ignore it.

As you can see, functions allow for an elegant and extensible solution, which is consistent with the rest of the language. In the next subsection, you’ll discover how not having `print()` as a function caused a lot of headaches.

---

## `print` Was a Statement in Python 2

A **statement** is an instruction that may evoke a side-effect when executed but never evaluates to a value. In other words, you wouldn’t be able to print a statement or assign it to a variable like this:

```py
result = print 'hello world'
```

That’s a syntax error in Python 2. Here are a few more examples of statements in Python:

- **assignment:** `=`
- **conditional:** `if`
- **loop:** `while`
- **assertion**: `assert`

::: note

[Python 3.8](/realpython.com/python38-new-features.md) brings a controversial **walrus operator** (`:=`), which is an [<VPIcon icon="fa-brands fa-python"/>assignment expression](https://python.org/dev/peps/pep-0572/). With it, you can evaluate an expression and assign the result to a variable at the same time, even within another expression!

Take a look at this example, which calls an expensive function once and then reuses the result for further computation:

```py title="Python 3.8+"
values = [y := f(x), y**2, y**3]
```

This is useful for simplifying the code without losing its efficiency. Typically, performant code tends to be more verbose:

```py
y = f(x)
values = [y, y**2, y**3]
```

The controversy behind this new piece of syntax caused a lot of argument. An abundance of negative comments and heated debates eventually led Guido van Rossum to step down from the **Benevolent Dictator For Life** or BDFL position.

:::

Statements are usually comprised of reserved keywords such as `if`, `for`, or `print` that have fixed meaning in the language. You can’t use them to name your variables or other symbols. That’s why redefining or mocking the `print` statement isn’t possible in Python 2. You’re stuck with what you get.

Furthermore, you can’t print from anonymous functions, because statements aren’t accepted in lambda expressions:

```py
lambda: print 'hello world'
# 
#   File "<stdin>", line 1
#     lambda: print 'hello world'
#                 ^
# SyntaxError: invalid syntax
```

The syntax of the `print` statement is ambiguous. Sometimes you can add parentheses around the message, and they’re completely optional:

```py
print 'Please wait...'
#
# Please wait...
print('Please wait...')
#
# Please wait...
```

At other times they change how the message is printed:

```py
print 'My name is', 'John'
#
# My name is John
print('My name is', 'John')
#
# ('My name is', 'John')
```

String concatenation can raise a `TypeError` due to incompatible types, which you have to handle manually, for example:

```py
values = ['jdoe', 'is', 42, 'years old']
print ' '.join(map(str, values))
#
# jdoe is 42 years old
```

Compare this with similar code in Python 3, which leverages sequence unpacking:

```py
values = ['jdoe', 'is', 42, 'years old']
print(*values)  # Python 3
#
# jdoe is 42 years old
```

There aren’t any keyword arguments for common tasks such as flushing the buffer or stream redirection. You need to remember the quirky syntax instead. Even the built-in `help()` function isn’t that helpful with regards to the `print` statement:

```py
help(print)
# 
#   File "<stdin>", line 1
#     help(print)
#              ^
# SyntaxError: invalid syntax
```

Trailing newline removal doesn’t work quite right, because it adds an unwanted space. You can’t compose multiple `print` statements together, and, on top of that, you have to be extra diligent about character encoding.

The list of problems goes on and on. If you’re curious, you can jump back to the [previous section](/realpython.com/python-print/printing-in-a-nutshell.md) and look for more detailed explanations of the syntax in Python 2. However, you can mitigate some of those problems with a much simpler approach. It turns out the `print()` function was backported to ease the migration to Python 3. You can import it from a special `__future__` module, which exposes a selection of language features released in later Python versions.

::: note

You may import future functions as well as baked-in language constructs such as the `with` statement.

To find out exactly what features are available to you, inspect the module:

```py
import __future__
__future__.all_feature_names
# 
# ['nested_scopes',
#  'generators',
#  'division',
#  'absolute_import',
#  'with_statement',
#  'print_function',
#  'unicode_literals']
```

You could also call `dir(__future__)`, but that would show a lot of uninteresting internal details of the module.

:::

To enable the `print()` function in Python 2, you need to add this import statement at the beginning of your source code:

```py
from __future__ import print_function
```

From now on the `print` statement is no longer available, but you have the `print()` function at your disposal. Note that it isn’t the same function like the one in Python 3, because it’s missing the `flush` keyword argument, but the rest of the arguments are the same.

Other than that, it doesn’t spare you from managing character encodings properly.

Here’s an example of calling the `print()` function in Python 2:

```py
from __future__ import print_function
import sys
print('I am a function in Python', sys.version_info.major)
#
# I am a function in Python 2
```

You now have an idea of how printing in Python evolved and, most importantly, understand why these backward-incompatible changes were necessary. Knowing this will surely help you become a better Python programmer.
