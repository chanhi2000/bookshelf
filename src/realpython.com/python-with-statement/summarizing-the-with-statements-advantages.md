---
lang: en-US
title: "Summarizing the with Statement’s Advantages"
description: "Article(s) > (3/9) Context Managers and Python's with Statement"
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
      content: "Article(s) > (3/9) Context Managers and Python's with Statement"
    - property: og:description
      content: "Summarizing the with Statement’s Advantages"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-with-statement/summarizing-the-with-statements-advantages.html
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
  url="https://realpython.com/python-with-statement#summarizing-the-with-statements-advantages"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Context-Managers--the-Python-with-Statement_Watermarked.3774ffbe2514.jpg"/>

To summarize what you’ve learned so far, here’s an inexhaustive list of the general benefits of using the Python `with` statement in your code:

- Makes **resource management** safer than its equivalent `try` … `finally` statements
- Encapsulates standard uses of `try` … `finally` statements in **context managers**
- Allows reusing the code that automatically manages the **setup** and **teardown** phases of a given operation
- Helps avoid **resource leaks**

Using the `with` statement consistently can improve the general quality of your code and make it safer by preventing resource leak problems.
