---
lang: en-US
title: "How to Build Good Coding Habits as a New Python Developer"
description: "Article(s) > How to Build Good Coding Habits as a New Python Developer"
icon: fa-brands fa-python
category: 
  - Python
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Good Coding Habits as a New Python Developer"
    - property: og:description`
      content: "How to Build Good Coding Habits as a New Python Developer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-good-coding-habits.html
prev: /programming/py/articles/README.md
date: 2024-08-21
isOriginal: false
author:
  - name: Eleanor Hecks
    url: https://freecodecamp.org/news/author/ehecks/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1724179204764/68fe386c-336f-4f05-9652-bbf5644b5a1b.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Good Coding Habits as a New Python Developer"
  desc="When you're starting out as a new Python developer, you'll likely develop some habits, both good and bad. Coding is something of an art form. Flexibility and customization are encouraged — and you can usually write code how you want within the contex..."
  url="https://freecodecamp.org/news/how-to-build-good-coding-habits"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1724179204764/68fe386c-336f-4f05-9652-bbf5644b5a1b.jpeg"/>

When you're starting out as a new Python developer, you'll likely develop some habits, both good and bad.

Coding is something of an art form. Flexibility and customization are encouraged — and you can usually write code how you want within the context of the language.

The problem is, you're communicating with the computer publicly. You need to write your code in a way that makes sense to others.

Also, using improper syntax or not ensuring you’re writing effectively can lead to errors in your programming. Messy code makes it extremely difficult to find those errors later. Readable, clean writing is the way to go, which means forming good coding habits early on so you’re following them throughout your entire career.

Here are six tips for building good coding habits as you start out in Python.

---

## 1. Follow the PEP 8 Style Guide

Copywriters and other content writers typically use something called a style guide. A style guide sets rules about the formatting and organization of the text. It might explain whether to use the Oxford comma or when to use title caps and other structured approaches.

Python has a style guide just like this, known as PEP 8, PEP8, or PEP-8. Several skilled Python developers [<VPIcon icon="fa-brands fa-python"/>published the guide in 2001](https://peps.python.org/pep-0008/) to share how to write perfectly readable and consistent code.

Some tenets include:

- Using proper indentation techniques.
- Staying below the maximum line length of 79 characters.
- Using line breaks.
- Employing blank lines — double or single — for functions, class, and method definitions.
- Using proper naming conventions for variables, classes, functions, and so on.

If you haven’t yet, read through the Python Pep 8 style guide and make sure you’re following the techniques.

---

## 2. Use the Newest Python Version

Programming languages like Python go through many iterations during their life cycles. Old versions are typically phased out for newer releases. Generally, the newest release includes bug fixes, as well as security or performance improvements.

At a minimum, use Python 3 over Python 2, as the older version [<VPIcon icon="fa-brands fa-python"/>has reached end-of-life status](https://python.org/doc/sunset-python-2/) as of January 2020. Also, when working with third-party modules, frameworks or repositories, always reference the Minimum Required Python Version. This is the oldest version of Python that is compatible with the related components.

---

## 3. Always Comment Out Specific Code

In the moment as you’re writing your code, you know what you’re trying to achieve. When you read that code later, you might forget — or worse yet, if someone else is reading that code, they might find themselves perplexed. That’s what comments are for.

Every language has a way to “comment out” certain sections of code. The idea is to use descriptive yet succinct comments to explain what’s happening. Some developers forget to do this entirely, but if you start early and always follow the rule, you’ll be able to write easily followable syntax.

In Python, you use a “#” symbol at the start of the comment to comment out a line. To write a multi-line comment, you can use triple quotes (`"""`) at the beginning or end or multiple hashtags per line.

```py
#This is a regular comment.

"""
This is a multi-line comment.
To explain what the code is doing.
"""
```

Commenting can be a vital part of the coding process as it allows you to better remember and visualize the ideas going through your mind as you’re coding.

According to experts, handwriting your notes and then transcribing them digitally through things like commenting [<VPIcon icon="fas fa-globe"/>improves your retention by 75](https://blog.box.com/best-note-taking-methods) percent. This means, when you discover a bug or want to make improvements later, you can more easily recall the relevant code snippets.

Inline comments can also appear in the same line as a point of code. For example:

`print (“Hello World. This is my first code.”) # This is how you create an inline comment`

---

## 4. Use a Linter

A Python linter reviews code spacing, line length and various design qualifications like argument positioning. As a result, your code looks clean, organized and consistently written across multiple files in your project.

Bear in mind that a linter is different from an auto-formatter or beautifier — although, in modern coding, the same tool may handle both of these support functions. You can think of a linter as something that fixes practical issues versus an auto-formatter, which fixes more of the styling.

Linters can analyze and identify coding errors, potential bugs, misspellings or syntax problems, but also stylistic inconsistencies, such as how you’re using indents and spacing. Auto-formatters focus on the writing or stylistic part of syntax like commas, quotes, proper line length and so on. Both are helpful, but you seldom want to code without a linter handy.

Some examples of the best Python linters include Pylint, Flake8, Ruff, Xenon and Radon, among others. The linter used in the following screenshot is Ruff, installed via VSCode.

![Python Linter in VSCode with Ruff](https://freecodecamp.org/news/content/images/2024/08/Python-Linter-in-VSCode-with-Ruff.jpg)

---

## 5. Rely on Built-In Functions and Libraries

The beauty of Python and languages like it is that you’re never starting from scratch. You don’t have to write every single function or achievement yourself — instead, you can rely on built-in functions, libraries, frameworks, and repositories.

Built-in functions save you time, give you working functions, and are generally managed by a group of developers. More importantly, they boost the performance of your code and software. You can [<VPIcon icon="fa-brands fa-python"/>reference the official Python documentation](https://docs.python.org/3/library/functions.html) to see built-in language functions.

Some examples include:

- `append()`: Takes a single item and adds it to a list, modifying an existing list by adding to it and increasing the list by one
- `eval()`: Evaluates any specified expression as if it’s an official Python statement
- `id()`: Used to reference the unique identity of an object or integer
- `max()`: Returns the maximum value of an iterable from multiple given values
- `print()`: Displays or returns text variables to the Python console
- `round()`: Rounds up a number or value to a given decimal place

Using the most common beginner’s tutorial, when you use the `print()` function, it looks something like this:

```py
print(“Hello world I am coding.”)
#
# Hello world I am coding
```

That built-in function will always be recognized regardless of the IDE or coding environment you’re using, which applies to all built-in functions from `append()` to `round()`.

On the other hand, libraries are numerous and varied — they’re much larger collections of pre-written code or functions. To use or reference libraries and their functions, you merely import them into your Python script. Examples are Requests, FastAPI, Asyncio, aiohttp, Tkinter, and more.

---

## 6. Fix Code Issues as Soon as Possible

When writing code, if you notice something is awry, fix it right then and there. Don’t put it off or wait until you’re testing later. You might misplace the bug or error — and imagine if you cannot find it again. Between [<VPIcon icon="fas fa-globe"/>23%-42% of a developer’s time](https://codescene.com/blog/measuring-the-business-impact-of-low-code-quality) is wasted due to bad code, which is valuable time you could be spending elsewhere.

Most of all, bugs and errors compound over time, so the longer you leave it, the more likely entire segments of your code will error out or stop working. Many IDEs and linters can help with this process, especially [<VPIcon icon="fa-brands fa-python"/>if you’re using the logging module](https://docs.python.org/3/library/logging.html#module-logging) instead of merely printing results.

Python’s logging module tracks events during runtime — when a program is running. Essentially, this allows you to identify problems or errors while testing your code. It may flag warnings pertaining to errors, debugging or code-related events, but it can also help you understand the runtime behavior of your project — all things you might overlook during the writing process.

You can see and analyze user interactions, for example, especially if external users are testing your application. Most importantly, the logging module is an audit tool that’s invaluable once you start testing or running the code you’ve written. Don’t code without it.

---

## Practice Makes Perfect

There are many things to consider when working with Python, and it doesn’t matter how skilled or adept you are. Following Python best practices is always the way to go. But in the end, the best way to learn is always to take a hands-on approach, which means practice.

Continue using Python, even just to create simple or small projects for yourself. Practice using the habits discussed here and writing clean code. You should also read code from other developers to see how they approach the process.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Good Coding Habits as a New Python Developer",
  "desc": "When you're starting out as a new Python developer, you'll likely develop some habits, both good and bad. Coding is something of an art form. Flexibility and customization are encouraged — and you can usually write code how you want within the contex...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-good-coding-habits.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
