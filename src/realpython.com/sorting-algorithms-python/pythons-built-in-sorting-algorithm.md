---
lang: en-US
title: "Python’s Built-In Sorting Algorithm"
description: "Article(s) > (2/8) Sorting Algorithms in Python"
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
      content: "Article(s) > (2/8) Sorting Algorithms in Python"
    - property: og:description
      content: "Python’s Built-In Sorting Algorithm"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/sorting-algorithms-python/pythons-built-in-sorting-algorithm.html
date: 2020-04-15
isOriginal: false
author:
  - name: Santiago Valdarrama
    url : https://realpython.com/team/svaldarrama/
cover: https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Sorting Algorithms in Python",
  "desc": "In this tutorial, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion.",
  "link": "/realpython.com/sorting-algorithms-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Sorting Algorithms in Python"
  desc="In this tutorial, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion."
  url="https://realpython.com/sorting-algorithms-python#pythons-built-in-sorting-algorithm"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

The Python language, like many other high-level programming languages, offers the ability to sort data out of the box using `sorted()`. Here’s an example of sorting an integer array:

```py
array = [8, 2, 6, 4, 5]
sorted(array)
# 
# [2, 4, 5, 6, 8]
```

You can use `sorted()` to sort any list as long as the values inside are comparable.

::: note

For a deeper dive into how Python’s built-in sorting functionality works, check out [**How to Use `sorted()` and `.sort()` in Python**](/realpython.com/python-sort.md) and [<FontIcon icon="fas fa-globe"/>Sorting Data With Python](https://realpython.com/courses/python-sorting-data/).

:::
