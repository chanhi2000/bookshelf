---
lang: en-US
title: "Running Code in a REPL Session"
description: "Article(s) > (3/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (3/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Running Code in a REPL Session"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/running-code-in-a-repl-session.html
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
  url="https://realpython.com/python-repl#running-code-in-a-repl-session"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

Up to this point, you’ve learned what a Python REPL is and why Python developers love it. You’ve also learned how to start a REPL session using the `python` command and some of its command-line options. Additionally, you’ve learned how to terminate a Python interactive session, jumping back to the operating system shell.

In the following sections, you’ll learn how to enter and execute Python code in an interactive session.

---

## Evaluating Expressions and Simple Statements

Once you’ve launched a Python interactive session from your command line, you can start entering and executing Python code immediately. To do this, get back to your command-line window and run the `python` command.

When the REPL’s primary prompt (`>>>`) appears on your screen, type in the following expressions, pressing the <kbd>Enter</kbd> key after each of them:

```py
5 - 2
# 
# 3

sum([1, 2, 3, 4])
#
# 10

42 > 7
#
# # True

number = 42

7 / 0
#
# Traceback (most recent call last):
#  ...
# ZeroDivisionError: division by zero
```

The first expression subtracts two numbers and displays the result. The second expression is a call to the built-in [**`sum()`**](/realpython.com/python-sum-function.md) function, which takes a series of values and [**returns**](/realpython.com/python-return-statement.md) its total sum. In the third example, you execute a [**Boolean**](/realpython.com/python-boolean.md) expression that compares two numbers.

The fourth example uses an [**assignment statement**](/realpython.com/python-assignment-operator.md) to define and initialize a [**variable**](/realpython.com/python-variables.md) called `number`. Because assignments don’t return any value, the Python interpreter doesn’t display any output on your screen. Instead, it falls back to the primary prompt immediately. The final example shows how Python displays an error when your code has issues.

While running these examples, note how after executing each expression, the interpreter loops back to the primary prompt (`>>>`), which lets you introduce a new expression. Now you’ve seen the REPL cycle in action. The Python interpreter has read your expressions, executed them, and printed their corresponding result to finally loop back to the primary prompt.

---

## Running Compound Statements

With the examples in the previous section, you’ve executed [<FontIcon icon="fa-brands fa-python"/>simple statements](https://docs.python.org/3/reference/simple_stmts.html) in a Python interactive session. These expressions are known as simple statements because they don’t have an indented code block.

Python also has [<FontIcon icon="fa-brands fa-python"/>compound statements](https://docs.python.org/3/reference/compound_stmts.html), such as [**conditionals**](/realpython.com/python-conditional-statements.md), loops, and [**`with`**](/realpython.com/python-with-statement.md) statements. Compound statements require an indented code block. The Python interpreter has a secondary prompt that lets you enter the code block of compound statements.

Consider the following example of a conditional statement:

```py
number = -42

if number < 0:
    print("negative")
elif number > 0:
    print("positive")
else:
    print("equal to 0")
# 
# negative
```

In this code snippet, you first define a variable to hold a number. Next up, you start a conditional statement.

Once you type the colon character (`:`) and press <kbd>Enter</kbd>, you get three dots (`...`) on your screen. These dots represent the REPL’s secondary prompt. This prompt on your screen means that you can enter the required indented blocks of your current compound statement.

::: note

To break out of the REPL’s secondary prompt, you must press <kbd>Enter</kbd> twice. This action will take you back to the primary prompt.

:::

When it comes to entering indented code blocks, keep in mind that the standard REPL doesn’t support auto-indentation:

```py
if number < 0:
# 
# ... print("negative")
#   File "<stdin>", line 2
#  print("negative")
#  ^
# IndentationError: expected an indented block after 'if' statement on line 1
```

In the Python standard REPL, you must provide the appropriate [**indentation**](/realpython.com/python-pep8.md#indentation) manually for any indented code block that you need to enter. Otherwise, you’ll get an `IndentationError`, like in the example above.

---

## Dealing With Explicit and Implicit Line Continuations

Another situation where the REPL’s secondary prompt appears is when you need to use **line continuations**. A line continuation occurs when you [<FontIcon icon="fa-brands fa-python"/>explicitly join](https://docs.python.org/3/reference/lexical_analysis.html#explicit-line-joining) multiple [<FontIcon icon="fa-brands fa-python"/>physical lines](https://docs.python.org/3/reference/lexical_analysis.html#physical-lines) into a single [<FontIcon icon="fa-brands fa-python"/>logical line](https://docs.python.org/3/reference/lexical_analysis.html#logical-lines) using the backslash (``) character:

```py
number = 42

assert isinstance(number, int) and number > 0, \
    f"number greater than 0 expected, got: {number}"

```

This [**`assert`**](/realpython.com/python-assert-statement.md) statement performs two checks on `number`. First, it uses the built-in `isinstance()` function to check if the value is an integer [**number**](/realpython.com/python-numbers.md). Then it checks if the input value is greater than `0`. If either of these conditions fails, then the statement raises an [**`AssertionError`**](/realpython.com/python-assert-statement.md#the-assertionerror-exception) with the provided message as an argument.

Line continuations also happen when you use several physical lines to write an expression delimited by a pair of brackets—for example, when you define a [**list, tuple**](/realpython.com/python-lists-tuples.md), or [**dictionary**](/realpython.com/python-dicts.md):

```py
fruits = [
"apple",
"banana",
"orange",
"grape",
"lemon",
]

inventory = {
"mouse": 120,
"keyboard": 50,
"laptop": 200,
"headphones": 240,
}
```

Once you open a bracket, such as `[]`, `()`, or `{}`, and press <kbd>Enter</kbd>, you get the REPL’s secondary prompt. This is known as [<FontIcon icon="fa-brands fa-python"/>implicit line joining](https://docs.python.org/3/reference/lexical_analysis.html#implicit-line-joining).

You can also use implicit line joining in other contexts, such as math and [**Boolean**](/realpython.com/python-operators-expressions.md#logical-expressions-involving-boolean-operands) expressions, [**function**](/realpython.com/defining-your-own-python-function.md) definitions and calls, [**list comprehensions**](/realpython.com/list-comprehension-python.md), and [**generator expressions**](/realpython.com/introduction-to-python-generators.md#building-generators-with-generator-expressions). In short, implicit line continuation will appear in all those Python constructs that accept some type of brackets, including `[]`, `()`, or `{}`.

---

## Printing vs Evaluating

When you run Python in interactive mode, you’ll note that the interpreter immediately displays the resulting value of evaluating or executing any expression or statement. This is true for all the statements and expressions that generate a return value.

The interpreter doesn’t display anything for statements that don’t generate return values. That’s the case with assignment statements, as you already learned.

The Python interpreter behaves that way because its primary goal is to provide immediate feedback on how your code works. This behavior makes using the built-in [**`print()`**](/realpython.com/python-print.md) function almost unnecessary when you’re working interactively.

However, there’s at least one use case for `print()` in REPL sessions. You need to use `print()` when you want to display the result of an expression or statement that can or will return [**`None`**](/realpython.com/null-in-python.md).

For example, a common error that some Python beginners make when they start to learn about lists is to expect new lists from calls to [**list methods**](/realpython.com/python-lists-tuples.md#methods-that-modify-a-list), such as [**`.append()`**](/realpython.com/python-append.m/), [**`.sort()`**](/realpython.com/python-sort.md), and the like:

```py
numbers = [2, 4, 1, 3]

numbers.sort()
numbers.append(5)
```

Because these method calls don’t issue any output to the screen, it may seem that they didn’t perform any real action. However, they did.

Most list methods run their intended transformation or computation [<FontIcon icon="fa-brands fa-wikipedia-w"/>in place](https://en.wikipedia.org/wiki/In-place_algorithm). In other words, list methods often modify the underlying list object instead of creating a new one. Because of this, most list methods return `None`, which the REPL automatically ignores. As a result, nothing shows up on your screen.

If you ever need to display `None` in a REPL session, then you must use the `print()` function:

```py
print(numbers.append(6))
# 
# None

numbers
#
# [1, 2, 3, 4, 5, 6]

value = None
value
print(value)
#
# None
```

In this code snippet, you use `print()` to show the return value of `.append()`, which is `None`, as you can see.

Note that you can always access the content of a given variable by typing the variable’s name and pressing <kbd>Enter</kbd> after it, as you did with `numbers`. However, if the variable is currently set to `None`, then you won’t get anything on your screen. You’ll have to use `print()`, as you did with `value`.

---

## Flagging and Understanding Errors

When an error occurs in a REPL session, the interpreter automatically prints the corresponding error message and [**traceback**](/realpython.com/python-traceback.md). Then, it loops back to the REPL’s primary prompt. In the following examples, you’ll see this behavior in action:

```py
greeting = "Hello, World!
# 
#   File "<stdin>", line 1
#  greeting = "Hello, World!
#  ^
# SyntaxError: unterminated string literal (detected at line 1)

42 / 0
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# ZeroDivisionError: division by zero

sum()
# 
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: sum() takes at least 1 positional argument (0 given)
```

In the first example, the string literal isn’t properly closed with a double quote (`"`). This raises a [**`SyntaxError`**](/realpython.com/invalid-syntax-python.md). The second example raises a `ZeroDivisionError` exception because you’re trying to divide `42` by `0`. In the final example, you call the built-in `sum()` function without arguments, which raises a `TypeError`.

All these errors are immediately printed on the screen. This behavior allows you to quickly and carefully inspect the error message and traceback in order to track the underlying issue and fix your code.

---

## Using the `_` Special Variable

Every time you run a statement that returns a value, the interpreter internally stores that value in a special variable named with a single [**underscore**](/realpython.com/python-double-underscore.md) (`_`). You can access and use this variable like any other variable in Python.

Here are a couple of examples that show the implicit `_` variable in action when you work with expressions:

```py
42 < 7
#
# False
_
#
# False

12 + 30
#
# 42
_
#
# 42
```

In these examples, you’re evaluating expressions. Expressions always have a return value, which is automatically assigned to the `_` variable every time.

When it comes to function calls, if the target function returns a value different from [**`None`**](/realpython.com/null-in-python.md), then `_` will hold that value. In contrast, if the function returns `None`, then the `_` variable will keep the value of the preceding operation:

```py
pow(4, 2)
#
# 16
_
#
# 16

print("Hello, World!")
#
# Hello, World!
_
#
# 16
```

The built-in [<FontIcon icon="fa-brands fa-python"/>`pow()`](https://docs.python.org/3/library/functions.html#pow) function computes the power of a number to a given exponent, returning the result. Because the function’s result differs from `None`, the `_` variable is automatically reassigned. In contrast, if you call a function that returns `None`, like `print()`, then the `_` variable remains unchanged.

In the example below, you use an [**assignment statement**](/realpython.com/python-assignment-operator.md) to create and initialize a `counter` variable:

```py
counter = 0
_
#
# 16

counter
# 
# 0
_
#
# 0
```

Assignments don’t return any value. Instead, they store a reference to a value in a variable. In this case, the `_` variable isn’t updated after running the statement. That’s why the variable still contains the number `16` from the previous examples.

Note that accessing a variable in an interactive session returns the value referenced by the variable. In this case, that value is also assigned to the `_` variable.

Because `_` is a regular Python variable, you can use it in expressions and statements:

```py
numbers = [1, 2, 3, 4]

len(numbers)
#
# 4

sum(numbers) / _
#
# 2.5
```

In this example, you first create a list of values. Then you call [**`len()`**](/realpython.com/len-python-function.md) to get the number of values in the list. Python automatically stores this value in the `_` variable. Finally, you use `_` to compute the mean of your list of values.

When using the `_` variable in a REPL session, keep in mind that this variable only appears in interactive mode. If you run your code in script mode, then you won’t get this implicit behavior.

---

## Reloading Imported Modules

Say that you’re writing a Python [**module**](/realpython.com/python-modules-packages.md) with some functions for one of your projects. At the same time, you’re using Python in interactive mode to test the module’s code in real time. For example, say that you have the following module:

```py title="greeting.py"
def greet(name="World"):
    print(f"Hello, {name}!")
```

In this file, you define a `greet()` function that prints a greeting message on the screen. Here’s how to load and use this code from a REPL session:

```py
import greeting

greeting.greet()
#
# 'Hello, World!'
greeting.greet("Pythonista")
#
# 'Hello, Pythonista!'
```

Now say that you want to add a new argument to your function. The argument will be a Boolean flag that allows printing the greeting message in uppercase letters. To do this, you modify the function to look something like this:

```py{2-4} title="greeting.py"
def greet(name="World", upper=False):
    greeting = f"Hello, {name}!" 
    if upper: 
        greeting = greeting.upper()
    print(greeting)
```

This update allows you to call `greet()` with an `upper` argument. If you set the argument to `True`, then the message will be in uppercase letters. Now you’re eager to try your changes in your current REPL session. So, you import the module again, hoping to run the new version of `greet()` as follows:

```py
import greeting

greeting.greet("Pythonista", upper=True)
# 
# Traceback (most recent call last):
#   File "<input>", line 1, in <module>
#  greeting.greet("Pythonista", upper=True)
#  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# TypeError: greet() got an unexpected keyword argument 'upper'
```

What? You have an unexpected argument? For [**efficiency reasons**](/realpython.com/python-import.md#reloading-modules), running the import again after updating something in <FontIcon icon="fa-brands fa-python"/>`greeting.py` doesn’t reload the module. Python doesn’t load imported modules again when you rerun the import.

If you want to work around this behavior without closing your current REPL session and opening a new one, then you can use the [<FontIcon icon="fa-brands fa-python"/>`reload()`](https://docs.python.org/3/library/importlib.html#importlib.reload) function from [<FontIcon icon="fa-brands fa-python"/>`importlib`](https://docs.python.org/3/library/importlib.html?highlight=reload#module-importlib):

```py
import importlib
importlib.reload(greeting)
#
# <module 'greeting' from '.../greeting.py'>

greeting.greet("Pythonista", upper=True)
#
# HELLO, PYTHONISTA!
```

Now your function works! The `reload()` function has taken care of loading the new version of your `greeting` module. You can use this trick whenever you’re working in a module on your [**code editor**](/realpython.com/python-ides-code-editors-guide.md) and testing your changes in a REPL session.

Now that you’ve learned the basics of entering and executing code in a Python interactive shell, it’s time to explore and learn about a few editing features that the standard REPL provides.
