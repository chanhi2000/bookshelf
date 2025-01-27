---
lang: en-US
title: "Starting and Ending REPL Interactive Sessions"
description: "Article(s) > (2/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (2/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Starting and Ending REPL Interactive Sessions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/starting-and-ending-repl-interactive-sessions.html
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
  url="https://realpython.com/python-repl#starting-and-ending-repl-interactive-sessions"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

The Python standard REPL is available in every Python installation. To start a new REPL or interactive session, you just need to run the Python interpreter in interactive mode from your command line. This mode will put you into a [<FontIcon icon="fa-brands fa-wikipedia-w"/>shell](https://en.wikipedia.org/wiki/Shell_(computing)) environment where you can execute Python code. Learning how the input code works is basically a way of getting immediate feedback on it.

In the following sections, you’ll learn how to start a new Python interactive shell using the `python` command and some of its command-line options.

You’ll also learn about the standard look and feel of a Python interactive shell and about some of its core characteristics and features. Finally, you’ll learn how to terminate a Python interactive session.

---

## Running the `python` Command

Once you’ve [**installed**](/realpython.com/installing-python.md) Python on your computer, then you can immediately start benefiting from this amazing tool. To start a Python interactive shell or session, open a command-line window and run the `python` command without arguments:

```sh
python
```

This command makes Python enter its interactive mode. The interpreter will run, and you’ll get an output that’ll look something like this:

```plaintext title="output"
Python 3.11.0 (main, Nov  6 2022, 13:27:29) ... on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

The first line of this output shows information about your current Python version and the platform on which you’re running the interpreter. The second line shows a message with commands that you can run to get additional information about Python in general.

The last line, which is highlighted in the output, shows the **primary prompt** of a standard Python interactive session or shell. By default, this prompt consists of three greater-than signs (`>>>`), also known as chevrons. Its purpose is to communicate that the interpreter is ready to accept input.

::: note

The Python standard REPL doesn’t support [<FontIcon icon="fa-brands fa-wikipedia-w"/>syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting). However, in this tutorial, you’ll find that the examples are rendered using a syntax highlighter. Keep this detail in mind because you won’t get syntax highlighting when you run the examples on your computer.

:::

The interpreter also has a **secondary prompt** represented by three dots (`...`). This prompt appears when you’re entering compound statements or line continuations. You’ll learn more about this prompt in the [Running Compound Statements](/realpython.com/python-repl/running-code-in-a-repl-session.md#running-compound-statements) and [Dealing With Explicit and Implicit Line Continuations](/realpython.com/python-repl/running-code-in-a-repl-session.md#dealing-with-explicit-and-implicit-line-continuations) sections.

---

## Passing Command-Line Options to the `python` Command

The `python` command can take a bunch of command-line options. A few of them can be useful when working in a REPL session. One of the most relevant options in this context is the `-i` flag. This option makes the interpreter enter the interactive mode after running a script or executing a piece of code using the [<FontIcon icon="fa-brands fa-python"/>`-c`](https://docs.python.org/3/using/cmdline.html#cmdoption-c) option.

::: note

The `-c` command-line option allows you to quickly run a Python statement or expression that you provide as a string on your command line. Try out the command `python -c "print('Hello, World!')"` to see this option in action.

:::

You can use the `-i` option to check the current global variables in your script or to inspect the stack trace when your program raises an exception.

To try this option out, say that you have the following sample script:

```py title="sample.py"
def read_data():
    # Read data from a file or database...
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

sample = read_data()

def mean(data):
    return sum(data) / len(data)

average = mean(sample)
```

This script reads some sample data for a file or database and provides a function to compute the mean, or average, of the data.

Go ahead and run the script with the following command:

```sh
python -i sample.py
```

Once you press <kbd>Enter</kbd>, this command runs the code in <FontIcon icon="fa-brands fa-python"/>`sample.py` and takes you directly to an interactive session. You’ll recognize this session because your screen will present the REPL’s primary prompt (`>>>`).

From this point on, you can inspect, test, and debug the code in <FontIcon icon="fa-brands fa-python"/>`sample.py` as needed:

```py :collapsed-lines
globals()
# 
# {
#  '__name__': '__main__',
#  ...
#  'read_data': <function read_data at 0x104dd4860>,
#  'sample': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
#  'mean': <function mean at 0x104fe3ec0>,
#  'average': 5.5
# }

mean([2, 3, 3, 2])
#
# 2.5

mean([])
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File ".../sample.py", line 10, in mean
#  return sum(data) / len(data)
#  ~~~~~~~~~~^~~~~~~~~~~
# ZeroDivisionError: division by zero
```

In these examples, you first call the built-in [**`globals()`**](/realpython.com/python-scope-legb-rule.md#globals) function to inspect the global names defined in your script. This function returns a dictionary that maps names to their corresponding objects. The second example calls `mean()` with a new sample of data.

::: note

When you run a piece of code in an interactive session, you typically get immediate feedback as an output on your screen. You’ll recognize the code’s output because it won’t have any leading prompt.

The final example calls `mean()` with an empty list as an argument. In this case, the function fails with a `ZeroDivisionError` because calling [**`len()`**](/realpython.com/len-python-function.md) with an empty list returns `0`.

::: note

When you use the `-i` command-line option with the `python` command, keep in mind that the [<FontIcon icon="fa-brands fa-python"/>`PYTHONSTARTUP`](https://docs.python.org/3/using/cmdline.html#envvar-PYTHONSTARTUP) environment variable won’t be read. You’ll learn more about this environment variable in the [Providing a Startup File](/realpython.com/python-repl/customizing-the-standard-repl.md##providing-a-startup-file) section.

The `-b` flag is another command-line option to consider when you run Python in interactive mode. This option comes in handy when you’re running code that compares [**`bytes`**](/realpython.com/python-data-structures.md#bytes-immutable-arrays-of-single-bytes) objects, and you want to get a warning if a [**string**](/realpython.com/python-strings.md) or integer value gets in the middle of a comparison:

```py
# Run python with the -b option
b = b"Hello"
s = "Hello"
b == s
# 
# <stdin>:1: BytesWarning: Comparison between bytes and string
# False
```

The `-b` option in the second example makes the interpreter display a warning when it finds operations that compare `bytes` with either strings or [**`int`**](/realpython.com/python-numbers.md#integers) values. If you don’t use this option, then no warning is shown:

```py
# Run python without the -b option
b = b"Hello"
s = "Hello"
b == s
#
# False
```

As in the previous example, the comparison returns `False` because the values are of different data types. However, in this final example, you don’t get any warning that helps you understand why you’re getting this result.

This is just a sampling of the options that may come in handy when you’re using Python in interactive mode. For a complete list of command-line options, check out [**Python Command-Line Arguments**](/realpython.com/python-command-line-arguments.md).

---

## Exiting the Current Python REPL Session

If you’re used to working on your command line or terminal, then you probably don’t like closing and opening terminal windows all the time. Your regular workflow may go through executing [**CLI tools**](/realpython.com/command-line-interfaces-python-argparse.md), closing them when the work is done, and returning to your current shell session.

This may be the case when you’re using Python in interactive mode. Once inside the REPL, you can’t run normal shell commands because you’re inside a different environment. To get back to your normal shell, you need to terminate the REPL session.

There are a few ways to exit an interactive session. You can use either of the following Python functions:

- [<FontIcon icon="fa-brands fa-python"/>`quit()`](https://docs.python.org/3/library/constants.html#quit)
- [<FontIcon icon="fa-brands fa-python"/>`exit()`](https://docs.python.org/3/library/constants.html?highlight=quit#exit)

These two functions are built into Python. Therefore, they’re available to you at any moment in an interactive session. Both functions allow you to exit the current session by implicitly raising a [<FontIcon icon="fa-brands fa-python"/>`SystemExit`](https://docs.python.org/3/library/exceptions.html#SystemExit) exception.

Alternatively, you can explicitly raise the `SystemExit` exception manually with an exit code of `0`. You’ll get the same result, and your current REPL session will terminate.

Any of these tools will get you out of your current Python interactive session and take you back to the operating system (OS) shell. After this, you can run regular shell commands again.

Another option for terminating a REPL session is to use one of the following keyboard shortcuts, depending on your current operating system:

- <kbd>Ctrl</kbd>+<kbd>D</kbd> on Unix systems, such as Linux or macOS
- <kbd>Ctrl</kbd>+<kbd>Z</kbd> and then <kbd>Enter</kbd> on Windows systems

These key combinations represent the **end-of-file character (EOF)** in the corresponding OS. They allow you to exit the current interactive session because the interpreter runs in a special file called `__main__`, as you can confirm by inspecting the `__name__` attribute:

```py
__name__
# 
# '__main__'
```

All the Python code in an interactive session will be contained in the `__main__` file, which runs until an EOF character is read. This means that when the interpreter finds this character, it immediately terminates the current REPL session.
