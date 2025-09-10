---
lang: en-US
title: "Python Print Counterparts"
description: "Article(s) > (7/7) Your Guide to the Python print() Function"
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
      content: "Article(s) > (7/7) Your Guide to the Python print() Function"
    - property: og:description
      content: "Python Print Counterparts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-list/python-print-counterparts.html
next: /realpython.com/python-print/README.md#conclusion
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
  url="https://realpython.com/python-print#python-print-counterparts"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

By now, you know a lot of what there is to know about `print()`! The subject, however, wouldn’t be complete without talking about its counterparts a little bit. While `print()` is about the output, there are functions and libraries for the input.

---

## Built-In

Python comes with a built-in function for accepting input from the user, predictably called `input()`. It accepts data from the standard input stream, which is usually the keyboard:

```py
name = input('Enter your name: ')
#
# Enter your name: jdoe
print(name)
#
# jdoe
```

The function always returns a string, so you might need to parse it accordingly:

```py
try:
    age = int(input('How old are you? '))
except ValueError:
    pass
```

The prompt parameter is completely optional, so nothing will show if you skip it, but the function will still work:

```py
x = input()
#
# hello world
print(x)
#
# hello world
```

Nevertheless, throwing in a descriptive call to action makes the user experience so much better.

::: note

To read from the standard input in Python 2, you have to call `raw_input()` instead, which is yet another built-in. Unfortunately, there’s also a misleadingly named `input()` function, which does a slightly different thing.

In fact, it also takes the input from the standard stream, but then it tries to evaluate it as if it was Python code. Because that’s a potential **security vulnerability**, this function was completely removed from Python 3, while `raw_input()` got renamed to `input()`.

Here’s a quick comparison of the available functions and what they do:

| Python 2 | Python 3 |
| --- | --- |
| `raw_input()` | `input()` |
| `input()` | `eval(input())` |

As you can tell, it’s still possible to simulate the old behavior in Python 3. 

:::

Asking the user for a password with `input()` is a bad idea because it’ll show up in plaintext as they’re typing it. In this case, you should be using the `getpass()` function instead, which masks typed characters. This function is defined in a module under the same name, which is also available in the standard library:

```py
from getpass import getpass
password = getpass()
#
# Password: 
print(password)
#
# s3cret
```

The `getpass` module has another function for getting the user’s name from an environment variable:

```py
from getpass import getuser
getuser()
#
# 'jdoe'
```

Python’s built-in functions for handling the standard input are quite limited. At the same time, there are plenty of third-party packages, which offer much more sophisticated tools.

---

## Third-Party

There are external [**Python packages**](/realpython.com/python-modules-packages.md) out there that allow for building complex graphical interfaces specifically to collect data from the user. Some of their features include:

- Advanced formatting and styling
- Automated parsing, validation, and sanitization of user data
- A declarative style of defining layouts
- Interactive autocompletion
- Mouse support
- Predefined widgets such as checklists or menus
- Searchable history of typed commands
- Syntax highlighting

Demonstrating such tools is outside of the scope of this article, but you may want to try them out. I personally got to know about some of those through the [<VPIcon icon="fas fa-globe"/>Python Bytes Podcast](https://pythonbytes.fm/). Here they are:

- [<VPIcon icon="iconfont icon-github"/>`Mckinsey666/bullet`](https://github.com/Mckinsey666/bullet)
- [<VPIcon icon="iconfont icon-pypi"/>`cooked-input`](https://pypi.org/project/cooked-input/)
- [<VPIcon icon="iconfont icon-pypi"/>`prompt_toolkit`](https://pypi.org/project/prompt_toolkit/)
- [<VPIcon icon="iconfont icon-github"/>`kylebebak/questionnaire`](https://github.com/kylebebak/questionnaire)

Nonetheless, it’s worth mentioning a command line tool called `rlwrap` that adds powerful line editing capabilities to your Python scripts for free. You don’t have to do anything for it to work!

Let’s assume you wrote a command-line interface that understands three instructions, including one for adding numbers:

```py :collapsed-lines
print('Type "help", "exit", "add a [b [c ...]]"')
while True:
    command, *arguments = input('~ ').split(' ')
    if len(command) > 0:
        if command.lower() == 'exit':
            break
        elif command.lower() == 'help':
            print('This is help.')
        elif command.lower() == 'add':
            print(sum(map(int, arguments)))
        else:
            print('Unknown command')
```

At first glance, it seems like a typical prompt when you run it:

```sh
python calculator.py
# 
# Type "help", "exit", "add a [b [c ...]]"
add 1 2 3 4
# 10
aad 2 3
# Unknown command
exit
```

But as soon as you make a mistake and want to fix it, you’ll see that none of the function keys work as expected. Hitting the Left arrow, for example, results in this instead of moving the cursor back:

```sh
python calculator.py
# 
# Type "help", "exit", "add a [b [c ...]]"
aad^[[D
```

Now, you can wrap the same script with the `rlwrap` command. Not only will you get the arrow keys working, but you’ll also be able to search through the persistent history of your custom commands, use autocompletion, and edit the line with shortcuts:

```sh
rlwrap python calculator.py
# 
# Type "help", "exit", "add a [b [c ...]]"
# (reverse-i-search)`a': add 1 2 3 4`
```

Isn’t that great?
