---
lang: en-US
title: "Creating Custom Context Managers"
description: "Article(s) > (5/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (5/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Creating Custom Context Managers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/creating-custom-context-managers.html
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
  url="https://realpython.com/python-with-statement#creating-custom-context-managers"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

You’ve already worked with context managers from the standard library and third-party libraries. There’s nothing special or magical about `open()`, `threading.Lock`, `decimal.localcontext()`, or the others. They just return objects that implement the context management protocol.

You can provide the same functionality by implementing both the `.__enter__()` and the `.__exit__()` special methods in your **class-based** context managers. You can also create custom **function-based** context managers using the [<FontIcon icon="fa-brands fa-python"/>`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html#contextlib.contextmanager) decorator from the standard library and an appropriately coded [**generator**](/realpython.com/introduction-to-python-generators.md) function.

In general, context managers and the `with` statement aren’t limited to resource management. They allow you to provide and reuse common setup and teardown code. In other words, with context managers, you can perform any pair of operations that needs to be done *before* and *after* another operation or procedure, such as:

- Open and close
- Lock and release
- Change and reset
- Create and delete
- Enter and exit
- Start and stop
- Setup and teardown

You can provide code to safely manage any of these pairs of operations in a context manager. Then you can reuse that context manager in `with` statements throughout your code. This prevents errors and reduces repetitive boilerplate code. It also makes your [**APIs**](/realpython.com/python-api.md) safer, cleaner, and more user-friendly.

In the next two sections, you’ll learn the basics of creating class-based and function-based context managers.
