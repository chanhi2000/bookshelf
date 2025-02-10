---
lang: en-US
title: "The Python Standard REPL: Try Out Code and Ideas Quickly"
description: "Article(s) > The Python Standard REPL: Try Out Code and Ideas Quickly"
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
      content: "Article(s) > The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:description
      content: "The Python Standard REPL: Try Out Code and Ideas Quickly"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-repl/
prev: /programming/py/articles/README.md
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
  name="The Python Standard REPL: Try Out Code and Ideas Quickly"
  desc="In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/python-repl"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Getting the Most Out of the Python Standard REPL – Real Python"
  desc="In this video course, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/courses/python-repl//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

:::

The Python standard shell, or **REPL (Read-Eval-Print Loop)**, allows you to run Python code interactively while working on a project or learning the language. This tool is available in every Python installation, so you can use it at any moment.

As a Python developer, you’ll spend a considerable part of your coding time in a REPL session because this tool allows you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, and try out examples.

::: important In this tutorial, you’ll learn how to

- Run the Python **standard REPL**, or interactive shell
- Write and execute **Python code** in an interactive session
- Quickly **edit**, **modify**, and **reuse** code in a REPL session
- Get **help** and **introspect** your code in an interactive session
- **Tweak** some features of the standard REPL
- Identify the standard REPL’s **missing features**

:::

You’ll also learn about available feature-rich REPLs, such as [**IDLE**](/realpython.com/python-idle.md), [**IPython**](/realpython.com/ipython-interactive-python-shell.md), [**bpython**](/realpython.com/bpython-alternative-python-repl.md), and [**ptpython**](/realpython.com/ptpython-shell.md).

To get the most out of this tutorial, you should be familiar with your operating system’s command line, or terminal. You should also know the basics of using the [**`python` command**](/realpython.com/python-command-line-arguments.md) to run your code.

::: info Quiz - The Python Standard REPL: Try Out Code and Ideas Quickly

<SiteInfo
  name="The Python Standard REPL: Try Out Code and Ideas Quickly Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of the Python standard REPL. The Python REPL allows you to run Python code interactively, which is useful for testing new ideas, exploring libraries, refactoring and debugging code, and trying out examples."
  url="https://realpython.com/quizzes/python-repl//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

In this quiz, you'll test your understanding of the Python standard REPL. The Python REPL allows you to run Python code interactively, which is useful for testing new ideas, exploring libraries, refactoring and debugging code, and trying out examples.

:::

```component VPCard
{
  "title": "Getting to Know the Python Standard REPL",
  "desc": "(1/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/getting-to-know-the-python-standard-repl.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Starting and Ending REPL Interactive Sessions",
  "desc": "(2/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/starting-and-ending-repl-interactive-sessions.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Running Code in a REPL Session",
  "desc": "(3/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/running-code-in-a-repl-session.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Editing Code in the Standard REPL",
  "desc": "(4/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/editing-code-in-the-standard-repl.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Getting Help and Introspecting Code in the REPL",
  "desc": "(5/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/getting-help-and-introspecting-code-in-the-repl.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Customizing the Standard REPL",
  "desc": "(6/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/customizing-the-standard-repl.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Uncovering Missing Features in the Standard REPL",
  "desc": "(7/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/uncovering-missing-features-in-the-standard-repl.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using an Alternative REPL",
  "desc": "(8/8) The Python Standard REPL: Try Out Code and Ideas Quickly",
  "link": "/realpython.com/python-repl/using-an-alternative-repl.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

You’ve learned how to work with Python in interactive mode using the standard shell, or **REPL (Read-Eval-Print Loop)**. This tool comes in every Python installation so that you can use it at any moment to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more.

::: important In this tutorial, you’ve learned how to

- Start the Python **standard REPL** from your command line
- Use the REPL to write and execute **Python code**
- **Edit**, **modify**, and **reuse** code in an interactive session
- Access Python’s built-in **help system** and **introspect** your code
- **Fine-tune** some features of the Python standard REPL
- Understand the REPL’s **missing features**

:::

You’ve also learned about alternative and feature-rich REPLs, such as **IDLE**, **IPython**, **bpython**, and **ptpython**, which provide IDE-like features that can highly improve your user experience and productivity while working in interactive mode.

::: info Quiz - The Python Standard REPL: Try Out Code and Ideas Quickly

<SiteInfo
  name="The Python Standard REPL: Try Out Code and Ideas Quickly Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of the Python standard REPL. The Python REPL allows you to run Python code interactively, which is useful for testing new ideas, exploring libraries, refactoring and debugging code, and trying out examples."
  url="https://realpython.com/quizzes/python-repl//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

In this quiz, you'll test your understanding of the Python standard REPL. The Python REPL allows you to run Python code interactively, which is useful for testing new ideas, exploring libraries, refactoring and debugging code, and trying out examples.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Getting the Most Out of the Python Standard REPL – Real Python"
  desc="In this video course, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more."
  url="https://realpython.com/courses/python-repl//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Use-the-Interactive-Python-REPL_Watermarked.dce4d5791b83.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Python Standard REPL: Try Out Code and Ideas Quickly",
  "desc": "In this tutorial, you'll learn how to use the Python standard REPL (Read-Eval-Print Loop) to run your code interactively. This tool will allow you to test new ideas, explore and experiment with new tools and libraries, refactor and debug your code, try out examples, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-repl.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
