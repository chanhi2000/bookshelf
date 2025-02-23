---
lang: en-US
title: "Writing Good APIs With Context Managers"
description: "Article(s) > (8/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (8/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Writing Good APIs With Context Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/writing-good-apis-with-context-managers.html
date: 2021-06-02
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Context Managers and Python's with Statement",
  "desc": "In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers.",
  "link": "/realpython.com/python-with-statement/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Context Managers and Python's with Statement"
  desc="In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers."
  url="https://realpython.com/python-with-statement#writing-good-apis-with-context-managers"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

Context managers are quite flexible, and if you use the `with` statement creatively, then you can define convenient APIs for your classes, [**modules, and packages**](/realpython.com/python-modules-packages.md).

For example, what if the resource you wanted to manage is the **text indentation level** in some kind of report generator application? In that case, you could write code like this:

```py
with Indenter() as indent:
    indent.print("hi!")
    with indent:
        indent.print("hello")
        with indent:
            indent.print("bonjour")
    indent.print("hey")
```

This almost reads like a [<FontIcon icon="fa-brands fa-wikipedia-w"/>domain-specific language (DSL)](https://en.wikipedia.org/wiki/Domain-specific_language) for indenting text. Also, notice how this code enters and leaves the same context manager multiple times to switch between different indentation levels. Running this code snippet leads to the following output and prints neatly formatted text:

```plaintext title="output"
hi!
    hello
        bonjour
hey
```

How would you implement a context manager to support this functionality? This could be a great exercise to wrap your head around how context managers work. So, before you check out the implementation below, you might take some time and try to solve this by yourself as a learning exercise.

Ready? Here’s how you might implement this functionality using a context manager class:

```py
class Indenter:
    def __init__(self):
        self.level = -1

    def __enter__(self):
        self.level += 1
        return self

    def __exit__(self, exc_type, exc_value, exc_tb):
        self.level -= 1

    def print(self, text):
        print("    " * self.level + text)
```

Here, `.__enter__()` increments `.level` by `1` every time the flow of execution enters the context. The method also returns the current instance, `self`. In `.__exit__()`, you decrease `.level` so the printed text steps back one indentation level every time you exit the context.

The key point in this example is that returning `self` from `.__enter__()` allows you to reuse the same context manager across several nested `with` statements. This changes the text indentation level every time you enter and leave a given context.

A good exercise for you at this point would be to write a function-based version of this context manager. Go ahead and give it a try!
