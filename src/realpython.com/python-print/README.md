---
lang: en-US
title: "Your Guide to the Python print() Function"
description: "Article(s) > Your Guide to the Python print() Function"
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
      content: "Article(s) > Your Guide to the Python print() Function"
    - property: og:description
      content: "Your Guide to the Python print() Function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-print/
prev: /programming/py/articles/README.md
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
  name="Your Guide to the Python print() Function"
  desc="In this step-by-step tutorial, you'll learn about the print() function in Python and discover some of its lesser-known features. Avoid common mistakes, take your ”hello world” to the next level, and know when to use a better alternative."
  url="https://realpython.com/python-print"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] The Python print() Function: Go Beyond the Basics – Real Python"
  desc="In this step-by-step course, you'll learn about the print() function in Python and discover some of its lesser-known features. Avoid common mistakes, take your ”hello world” to the next level, and know when to use a better alternative."
  url="https://realpython.com/courses/python-print/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

:::

If you’re like most Python users, including me, then you probably started your Python journey by learning about `print()`. It helped you write your very own `hello world` one-liner. You can use it to display formatted messages onto the screen and perhaps find some bugs. But if you think that’s all there is to know about Python’s `print()` function, then you’re missing out on a lot!

Keep reading to take full advantage of this seemingly boring and unappreciated little function. This tutorial will get you up to speed with using Python `print()` effectively. However, prepare for a deep dive as you go through the sections. You may be surprised how much `print()` has to offer!

::: info By the end of this tutorial, you’ll know how to

- Avoid common mistakes with Python’s `print()`
- Deal with newlines, character encodings, and buffering
- Write text to files
- Mock `print()` in unit tests
- Build advanced user interfaces in the terminal

:::

If you’re a complete [**beginner**](/realpython.com/python-beginner-tips.md), then you’ll benefit most from reading the first part of this tutorial, which illustrates the essentials of printing in Python. Otherwise, feel free to skip that part and jump around as you see fit.

::: note

`print()` was a major addition to Python 3, in which it replaced the old `print` statement available in Python 2. There were a number of good reasons for that, as you’ll see shortly. Although this tutorial focuses on Python 3, it does show the old way of printing in Python for reference.

:::

```component VPCard
{
  "title": "Printing in a Nutshell",
  "desc": "(1/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/printing-in-a-nutshell.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Understanding Python print()",
  "desc": "(2/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/understanding-python-print.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Printing With Style",
  "desc": "(3/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/printing-with-style.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Mocking Python print() in Unit Tests",
  "desc": "(4/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/mocking-python-print-in-unit-tests.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "print() Debugging",
  "desc": "(5/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/print-debugging.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Thread-Safe Printing",
  "desc": "(6/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/thread-safe-printing.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Python Print Counterparts",
  "desc": "(7/7) Your Guide to the Python print() Function",
  "link": "/realpython.com/python-print/python-print-counterparts.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

You’re now armed with a body of knowledge about the `print()` function in Python, as well as many surrounding topics. You have a deep understanding of what it is and how it works, involving all of its key elements. Numerous examples gave you insight into its evolution from Python 2. Apart from that, you learned how to:

- Avoid common mistakes with `print()` in Python
- Deal with newlines, character encodings and buffering
- Write text to files
- Mock the `print()` function in unit tests
- Build advanced user interfaces in the terminal

Now that you know all this, you can make interactive programs that communicate with users or produce data in popular file formats. You’re able to quickly diagnose problems in your code and protect yourself from them. Last but not least, you know how to implement the classic snake game.

If you’re still thirsty for more information, have questions, or simply would like to share your thoughts, then feel free to reach out in the comments section below.

::: info Quiz - The Python print() Function

<SiteInfo
  name="The Python print() Function Quiz – Real Python"
  desc="In this interactive quiz, you can revisit what you know about Python's print() function. You'll also get to quiz yourself about some of its lesser-known features."
  url="https://realpython.com/quizzes/python-print/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

In this interactive quiz, you can revisit what you know about Python's print() function. You'll also get to quiz yourself about some of its lesser-known features.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] The Python print() Function: Go Beyond the Basics – Real Python"
  desc="In this step-by-step course, you'll learn about the print() function in Python and discover some of its lesser-known features. Avoid common mistakes, take your ”hello world” to the next level, and know when to use a better alternative."
  url="https://realpython.com/courses/python-print/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/The-Python-Print-Function_Watermarked.26066d64ad82.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Your Guide to the Python print() Function",
  "desc": "In this step-by-step tutorial, you'll learn about the print() function in Python and discover some of its lesser-known features. Avoid common mistakes, take your ”hello world” to the next level, and know when to use a better alternative.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-print.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
