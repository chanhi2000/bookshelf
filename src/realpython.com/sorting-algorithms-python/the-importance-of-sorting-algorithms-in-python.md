---
lang: en-US
title: "The Importance of Sorting Algorithms in Python"
description: "Article(s) > (1/8) Sorting Algorithms in Python"
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
      content: "Article(s) > (1/8) Sorting Algorithms in Python"
    - property: og:description
      content: "The Importance of Sorting Algorithms in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/sorting-algorithms-python/the-importance-of-sorting-algorithms-in-python.html
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
  url="https://realpython.com/sorting-algorithms-python#the-importance-of-sorting-algorithms-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

[<VPIcon icon="fa-brands fa-python"/>Sorting](https://docs.python.org/3/howto/sorting.html) is one of the most thoroughly studied algorithms in computer science. There are dozens of different sorting implementations and applications that you can use to make your code more efficient and effective.

You can use sorting to solve a wide range of problems:

- **Searching:** Searching for an item on a [**list**](/realpython.com/python-lists-tuples.md) works much faster if the list is sorted.
- **Selection:** Selecting items from a list based on their relationship to the rest of the items is easier with sorted data. For example, finding the *kth*-largest or smallest value, or finding the median value of the list, is much easier when the values are in ascending or descending order.
- **Duplicates:** Finding duplicate values on a list can be done very quickly when the list is sorted.
- **Distribution:** Analyzing the frequency distribution of items on a list is very fast if the list is sorted. For example, finding the element that appears most or least often is relatively straightforward with a sorted list.

From commercial applications to academic research and everywhere in between, there are countless ways you can use sorting to save yourself time and effort.
