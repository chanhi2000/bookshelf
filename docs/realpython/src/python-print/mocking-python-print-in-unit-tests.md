---
lang: en-US
title: "Mocking Python print() in Unit Tests"
description: "Article(s) > (4/7) Your Guide to the Python print() Function"
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
      content: "Article(s) > (4/7) Your Guide to the Python print() Function"
    - property: og:description
      content: "Mocking Python print() in Unit Tests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/mocking-python-print-in-unit-tests.html
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
  url="https://realpython.com/python-print#mocking-python-print-in-unit-tests"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

Nowadays, it’s expected that you ship code that meets high quality standards. If you aspire to become a professional, you must learn [**how to test**](/realpython.com/python-testing.md) your code.

Software testing is especially important in dynamically typed languages, such as Python, which don’t have a compiler to warn you about obvious mistakes. Defects can make their way to the production environment and remain dormant for a long time, until that one day when a branch of code finally gets executed.

Sure, you have [**linters**](/realpython.com/python-code-quality.md#linters), [**type checkers**](/realpython.com/python-type-checking.md), and other tools for static code analysis to assist you. But they won’t tell you whether your program does what it’s supposed to do on the business level.

So, should you be testing `print()`? No. After all, it’s a built-in function that must have already gone through a comprehensive suite of tests. What you want to test, though, is whether your code is calling `print()` at the right time with the expected parameters. That’s known as a **behavior**.

You can test behaviors by [mocking](https://realpython.com/python-mock-library/) real objects or functions. In this case, you want to mock `print()` to record and verify its invocations.

::: note

You might have heard the terms: **dummy**, **fake**, **stub**, **spy**, or **mock** used interchangeably. Some people make a distinction between them, while others don’t.

Martin Fowler explains their differences in a [<VPIcon icon="fas fa-globe"/>short glossary](https://martinfowler.com/bliki/TestDouble.html) and collectively calls them **test doubles**.

<SiteInfo
  name="bliki: Test Double"
  desc="Test Double is generic term for fakes, mocks, stubs, dummies and spies."
  url="https://martinfowler.com/bliki/TestDouble.html/"
  logo="https://martinfowler.com/favicon.ico"
  preview="https://martinfowler.com/logo-sq.png"/>

:::

Mocking in Python can be done twofold. First, you can take the traditional path of statically-typed languages by employing dependency injection. This may sometimes require you to change the code under test, which isn’t always possible if the code is defined in an external library:

```py
def download(url, log=print):
    log(f'Downloading {url}')
    # ...
```

This is the same example I used in an earlier section to talk about function composition. It basically allows for substituting `print()` with a custom function of the same interface. To check if it prints the right message, you have to intercept it by injecting a mocked function:

```py
def mock_print(message):
    mock_print.last_message = message

download('resource', mock_print)
assert 'Downloading resource' == mock_print.last_message
```

Calling this mock makes it save the last message in an attribute, which you can inspect later, for example in an [**`assert` statement**](/realpython.com/python-assert-statement.md).

In a slightly alternative solution, instead of replacing the entire `print()` function with a custom wrapper, you could redirect the standard output to an in-memory file-like stream of characters:

```py
def download(url, stream=None):
    print(f'Downloading {url}', file=stream)
    # ...

import io
memory_buffer = io.StringIO()
download('app.js', memory_buffer)
download('style.css', memory_buffer)
memory_buffer.getvalue()
#
# 'Downloading app.js\nDownloading style.css\n'
```

This time the function explicitly calls `print()`, but it exposes its `file` parameter to the outside world.

However, a more Pythonic way of mocking objects takes advantage of the built-in `mock` module, which uses a technique called [<VPIcon icon="fa-brands fa-wikipedai-w"/>monkey patching](https://en.wikipedia.org/wiki/Monkey_patch). This derogatory name stems from it being a “dirty hack” that you can easily shoot yourself in the foot with. It’s less elegant than dependency injection but definitely quick and convenient.

::: note

The `mock` module got absorbed by the standard library in Python 3, but before that, it was a third-party package. You had to install it separately:

```sh
pip2 install mock
```

Other than that, you referred to it as `mock`, whereas in Python 3 it’s part of the unit testing module, so you must import from `unittest.mock`.

:::

What monkey patching does is alter implementation dynamically at runtime. Such a change is visible globally, so it may have unwanted consequences. In practice, however, patching only affects the code for the duration of test execution.

To mock `print()` in a test case, you’ll typically use the `@patch` [**decorator**](/realpython.com/primer-on-python-decorators.md) and specify a target for patching by referring to it with a fully qualified name, that is including the module name:

```py
from unittest.mock import patch

@patch('builtins.print')
def test_print(mock_print):
    print('not a real print')
    mock_print.assert_called_with('not a real print')
```

This will automatically create the mock for you and inject it to the test function. However, you need to declare that your test function accepts a mock now. The underlying mock object has lots of useful methods and attributes for verifying behavior.

Did you notice anything peculiar about that code snippet?

Despite injecting a mock to the function, you’re not calling it directly, although you could. That injected mock is only used to make assertions afterward and maybe to prepare the context before running the test.

In real life, mocking helps to isolate the code under test by removing dependencies such as a database connection. You rarely call mocks in a test, because that doesn’t make much sense. Rather, it’s other pieces of code that call your mock indirectly without knowing it.

Here’s what that means:

```py
from unittest.mock import patch

def greet(name):
    print(f'Hello, {name}!')

@patch('builtins.print')
def test_greet(mock_print):
    greet('John')
    mock_print.assert_called_with('Hello, John!')
```

The code under test is a function that prints a greeting. Even though it’s a fairly simple function, you can’t test it easily because it doesn’t return a value. It has a side-effect.

To eliminate that side-effect, you need to mock the dependency out. Patching lets you avoid making changes to the original function, which can remain agnostic about `print()`. It thinks it’s calling `print()`, but in reality, it’s calling a mock you’re in total control of.

There are many reasons for testing software. One of them is looking for bugs. When you write tests, you often want to get rid of the `print()` function, for example, by mocking it away. Paradoxically, however, that same function can help you find bugs during a related process of debugging you’ll read about in the next section.

### Syntax in Python 2

You can’t monkey patch the `print` statement in Python 2, nor can you inject it as a dependency. However, you have a few other options:

- Use stream redirection.
- Patch the standard output defined in the `sys` module.
- Import `print()` from the `__future__` module.

Let’s examine them one by one.

Stream redirection is almost identical to the example you saw earlier:

```py
def download(url, stream=None):
    print >> stream, 'Downloading %s' % url
    # ...

from StringIO import StringIO
memory_buffer = StringIO()
download('app.js', memory_buffer)
download('style.css', memory_buffer)
memory_buffer.getvalue()
#
# 'Downloading app.js\nDownloading style.css\n'
```

There are only two differences. First, the syntax for stream redirection uses chevron (`>>`) instead of the `file` argument. The other difference is where `StringIO` is defined. You can import it from a similarly named `StringIO` module, or `cStringIO` for a faster implementation.

Patching the standard output from the `sys` module is exactly what it sounds like, but you need to be aware of a few gotchas:

```py
from mock import patch, call

def greet(name):
    print 'Hello, %s!' % name

@patch('sys.stdout')
def test_greet(mock_stdout):
    greet('John')
    mock_stdout.write.assert_has_calls([
       call('Hello, John!'),
       call('\n')
    ])
```

First of all, remember to install the `mock` module as it wasn’t available in the standard library in Python 2. Secondly, the `print` statement calls the underlying `.write()` method on the mocked object instead of calling the object itself. That’s why you’ll run assertions against `mock_stdout.write`.

Finally, a single `print` statement doesn’t always correspond to a single call to `sys.stdout.write()`. In fact, you’ll see the newline character written separately.

The last option you have is importing `print()` from `future` and patching it:

```py
from __future__ import print_function
from mock import patch

def greet(name):
    print('Hello, %s!' % name)

@patch('__builtin__.print')
def test_greet(mock_print):
    greet('John')
    mock_print.assert_called_with('Hello, John!')
```

Again, it’s nearly identical to Python 3, but the `print()` function is defined in the `__builtin__` module rather than `builtins`.
