---
lang: en-US
title: "Context Managers and Python's with Statement"
description: "Article(s) > Context Managers and Python's with Statement"
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
      content: "Article(s) > Context Managers and Python's with Statement"
    - property: og:description
      content: "Context Managers and Python's with Statement"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement.html
prev: /programming/py/articles/README.md
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
  name="Context Managers and Python's with Statement"
  desc="In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers."
  url="https://realpython.com/python-with-statement"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Context Managers and Using Python's with Statement - Real Python"
  desc="In this video course, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers."
  url="https://realpython.com/courses/with-statement-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

:::

The `with` statement in Python is a quite useful tool for properly managing external resources in your programs. It allows you to take advantage of existing **context managers** to automatically handle the setup and teardown phases whenever you’re dealing with external resources or with operations that require those phases.

Besides, the **context management protocol** allows you to create your own context managers so you can customize the way you deal with system resources. So, what’s the `with` statement good for?

::: info In this tutorial, you’ll learn

- What the **Python `with` statement** is for and how to use it
- What the **context management protocol** is
- How to implement your own **context managers**

:::

With this knowledge, you’ll write more expressive code and avoid [<VPIcon icon="fa-brands fa-wikipedia-w"/>resource leaks](https://en.wikipedia.org/wiki/Resource_leak) in your programs. The `with` statement helps you implement some common resource management patterns by abstracting their functionality and allowing them to be factored out and reused.

::: info Quiz - Context Managers and Python's with Statement

<SiteInfo
  name="Context Managers and Python's with Statement Quiz - Real Python"
  desc="In this quiz, you'll assess your understanding of the Python with statement and context managers. By mastering these concepts, you'll be able to write more expressive code and manage system resources more effectively, avoiding resource leaks and ensuring proper setup and teardown of external resources."
  url="https://realpython.com/quizzes/python-with-statement/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

In this quiz, you'll assess your understanding of the Python with statement and context managers. By mastering these concepts, you'll be able to write more expressive code and manage system resources more effectively, avoiding resource leaks and ensuring proper setup and teardown of external resources.

:::

```component VPCard
{
  "title": "Managing Resources in Python",
  "desc": "(1/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/managing-resources-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using the Python with Statement",
  "desc": "(2/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/using-the-python-with-statement.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Summarizing the with Statement’s Advantages",
  "desc": "(3/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/summarizing-the-with-statements-advantages.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using the async with Statement",
  "desc": "(4/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/using-the-async-with-statement.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Creating Custom Context Managers",
  "desc": "(5/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/creating-custom-context-managers.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Coding Class-Based Context Managers",
  "desc": "(6/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/coding-class-based-context-managers.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Creating Function-Based Context Managers",
  "desc": "(7/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/creating-function-based-context-managers.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Writing Good APIs With Context Managers",
  "desc": "(8/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/writing-good-apis-with-context-managers.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Creating an Asynchronous Context Manager",
  "desc": "(9/9) Context Managers and Python's with Statement",
  "link": "/realpython.com/python-with-statement/creating-an-asynchronous-context-manager.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

The Python **`with` statement** is a powerful tool when it comes to managing external resources in your programs. Its use cases, however, aren’t limited to resource management. You can use the `with` statement along with existing and custom context managers to handle the setup and teardown phases of a given process or operation.

The underlying **context management protocol** allows you to create custom context managers and factor out the setup and teardown logic so you can reuse them in your code.

::: info In this tutorial, you learned:

- What the **Python `with` statement** is for and how to use it
- What the **context management protocol** is
- How to implement your own **context managers**

:::

With this knowledge, you’ll write safe, concise, and expressive code. You’ll also avoid resource leaks in your programs.

::: info Quiz - Context Managers and Python's with Statement

<SiteInfo
  name="Context Managers and Python's with Statement Quiz - Real Python"
  desc="In this quiz, you'll assess your understanding of the Python with statement and context managers. By mastering these concepts, you'll be able to write more expressive code and manage system resources more effectively, avoiding resource leaks and ensuring proper setup and teardown of external resources."
  url="https://realpython.com/quizzes/python-with-statement/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

In this quiz, you'll assess your understanding of the Python with statement and context managers. By mastering these concepts, you'll be able to write more expressive code and manage system resources more effectively, avoiding resource leaks and ensuring proper setup and teardown of external resources.

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Context Managers and Using Python's with Statement - Real Python"
  desc="In this video course, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers."
  url="https://realpython.com/courses/with-statement-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Context Managers and Python's with Statement",
  "desc": "In this step-by-step tutorial, you'll learn what the Python with statement is and how to use it with existing context managers. You'll also learn how to create your own context managers.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
