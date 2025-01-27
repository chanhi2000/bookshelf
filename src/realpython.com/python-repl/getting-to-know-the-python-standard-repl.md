---
lang: en-US
title: "Getting to Know the Python Standard REPL"
description: "Article(s) > (1/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > (1/8) The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "Getting to Know the Python Standard REPL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/getting-to-know-the-python-standard-repl.html
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
  url="https://realpython.com/python-repl#getting-to-know-the-python-standard-repl"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>



---

## Getting to Know the Python Standard REPL

In computer programming, you’ll find two kinds of programming languages: **compiled** and **interpreted** languages. Compiled programming languages like [C](/realpython.com/c-for-python-programmers.md) and [**C++**](/realpython.com/python-vs-cpp.md) will have a [<FontIcon icon="fa-brands fa-wikipedia-w"/>compiler](https://en.wikipedia.org/wiki/Compiler) program, which takes care of translating the language’s code into [<FontIcon icon="fa-brands fa-wikipedia-w"/>machine code](https://en.wikipedia.org/wiki/Machine_code).

This machine code is typically saved into an executable file. Once you have an executable file, you can run your program on any compatible computer system without needing the compiler or the source code.

In contrast, interpreted languages like Python need an [<FontIcon icon="fa-brands fa-wikipedia-w"/>interpreter](https://en.wikipedia.org/wiki/Interpreter_(computing)) program. This means that you need to have a Python interpreter installed to run Python code on your computer. Some may consider this characteristic a drawback because it can make your code distribution process much more difficult.

However, in Python, having an interpreter offers one significant advantage that comes in handy during your development and testing process. The Python interpreter allows for what’s known as an interactive [<FontIcon icon="fa-brands fa-wikipedia-w"/>REPL (Read-Eval-Print Loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), or shell, which reads a piece of code, evaluates it, and then prints the result to the console in a loop.

::: note

In this tutorial, you’ll learn about the [**CPython**](/realpython.com/cpython-source-code-guide.md) standard REPL, which is available in all the installers of this Python distribution. If you don’t have CPython yet, then check out [Python 3 Installation & Setup Guide](https://realpython.com/installing-python.md) for detailed instructions.

:::

The Python interpreter can execute Python code in two modes:

1. [**Script**](/realpython.com/run-python-scripts.md), or program
2. [**Interactive**](/realpython.com/interacting-with-python.md), or REPL

In **script mode**, you use the interpreter to run a source file as an executable program. In this case, Python loads the file content and runs the code line by line, following the script or program’s execution flow. Alternatively, **interactive mode** is when you launch the interpreter and use it as a platform to run code that you type in directly.

::: note

The name Python is commonly used to denote two different things: the **language** itself, and the **interpreter**. In this tutorial, you’ll find the explicit term **Python interpreter** only in situations where ambiguity can arise.

:::

In this tutorial, you’ll learn how to use the Python standard REPL to run code interactively, which allows you to try ideas and test concepts when using and learning Python. Are you ready to take a closer look at the Python REPL? Keep reading!

### What Is Python’s Interactive Shell or REPL?

When you run the Python interpreter in interactive mode, you open an **interactive shell**, also known as an **interactive** or a **REPL** session. In this [<FontIcon icon="fa-brands fa-wikipedia-w"/>shell](https://en.wikipedia.org/wiki/Shell_(computing)), your keyboard is the input source, and your screen is the output destination.

::: note

In this tutorial, you’ll find the terms **interactive shell**, **interactive session**, **interpreter session**, and **REPL session** used interchangeably.

The input consists of Python code, which the interpreter parses and evaluates. After that’s done, the interpreter automatically displays the result on your screen, and the process starts again as a loop.

So, Python’s REPL is an interactive way to talk to your computer using the Python language. It’s like live chat. The whole process is known as a REPL because it goes through four steps that run under the hood:

1. **Reading** your input, which consists of Python code as [<FontIcon icon="fa-brands fa-python"/>expressions](https://docs.python.org/3/glossary.html#term-expression) and [<FontIcon icon="fa-brands fa-python"/>statements](https://docs.python.org/3/glossary.html#term-statement)
2. **Evaluating** your Python code, which generates a result or causes [<FontIcon icon="fa-brands fa-wikipedia-w"/>side effects](https://en.wikipedia.org/wiki/Side_effect_(computer_science))
3. **Printing** any output so that you can check your code’s results and get immediate feedback
4. **Looping** back to step one to continue the interaction

This feature of Python is a powerful tool that you’ll wind up needing in your Python coding adventure, especially when you’re learning the language or when you’re in the early stages of a development process. That’s because the REPL offers several benefits, which you’ll learn about next.

### Why Use a Python REPL?

As a Python programmer, you’ll spend considerable time in interactive mode. This mode provides a quick way to try out ideas and code snippets. In a REPL session, you can do some or all of the following tasks:

- Explore and learn **Python syntax**
- Try out and prove **ideas**, **concepts**, and **implementations**
- Quickly evaluate **code snippets**
- Dive into the **language behaviors**
- Edit and [**refactor**](/realpython.com/python-refactoring.md) your code for later use in **script mode**
- Perform code and [<FontIcon icon="fa-brands fa-wikipedia-w"/>type introspection](https://en.wikipedia.org/wiki/Type_introspection)
- Get interactive **help** on how to use the language
- Run basic code **debugging**
- Explore standard-library and third-party [**modules**](/realpython.com/python-modules-packages.md), **libraries**, and [<FontIcon icon="fa-brands fa-wikipedia-w"/>APIs](https://en.wikipedia.org/wiki/API)
- Inspect the implementation of **classes**, **functions**, and **other objects**

Clearly, as a Python developer, you’ll have many reasons to spend a lot of your time in REPL sessions, working interactively with the interpreter. Getting immediate feedback on how your code works is the most relevant benefit of using a REPL session.

Interactive mode is one of the best features of Python. It allows you to test solutions and experiment with the language in real time. If you want to know how something works, then just try it in an interactive shell.

You should definitely consider the interactive shell a powerful **learning tool**, especially if your previous programming experience has been with compiled languages that don’t provide a REPL.

While learning Python or exploring new features and concepts, you’ll note that many examples in the Python [<FontIcon icon="fa-brands fa-python"/>documentation](https://docs.python.org/3/index.html), online tutorials, manuals, and courses are copied and pasted from an interactive session. You’ll recognize them because of the REPL’s characteristic **prompts**, which you’ll get to know in the [Running the `python` Command](/realpython.com/starting-and-ending-repl-interactive-sessions.md#running-the-python-command) section.

With this introduction to interpreters and REPLs under your belt, you’re ready to get into action. In the following session, you’ll learn how to start and end a Python interactive session.
