---
lang: en-US
title: "Sorting Algorithms in Python"
description: "Article(s) > Sorting Algorithms in Python"
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
      content: "Article(s) > Sorting Algorithms in Python"
    - property: og:description
      content: "Sorting Algorithms in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/sorting-algorithms-python/
prev: /programming/py/articles/README.md
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
  name="Sorting Algorithms in Python"
  desc="In this tutorial, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion."
  url="https://realpython.com/sorting-algorithms-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Introduction to Sorting Algorithms in Python - Real Python"
  desc="In this course, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion."
  url="https://realpython.com/courses/intro-sorting-algorithms/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

:::

**Sorting** is a basic building block that many other algorithms are built upon. It’s related to several exciting ideas that you’ll see throughout your programming career. Understanding how sorting algorithms in Python work behind the scenes is a fundamental step toward implementing correct and efficient algorithms that solve real-world problems.

::: info In this tutorial, you’ll learn

- How different **sorting algorithms in Python** work and how they compare under different circumstances
- How **Python’s built-in sort functionality** works behind the scenes
- How different computer science concepts like **recursion** and **divide and conquer** apply to sorting
- How to measure the efficiency of an algorithm using **Big O notation** and **Python’s `timeit` module**

:::

By the end of this tutorial, you’ll understand sorting algorithms from both a theoretical and a practical standpoint. More importantly, you’ll have a deeper understanding of different algorithm design techniques that you can apply to other areas of your work. Let’s get started!

```component VPCard
{
  "title": "The Importance of Sorting Algorithms in Python",
  "desc": "(1/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-importance-of-sorting-algorithms-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Python’s Built-In Sorting Algorithm",
  "desc": "(2/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/pythons-built-in-sorting-algorithm.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "The Significance of Time Complexity",
  "desc": "(3/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-significance-of-time-complexity.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "The Bubble Sort Algorithm in Python",
  "desc": "(4/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-bubble-sort-algorithm-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "The Insertion Sort Algorithm in Python",
  "desc": "(5/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-insertion-sort-algorithm-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "The Merge Sort Algorithm in Python",
  "desc": "(6/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-merge-sort-algorithm-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "The Quicksort Algorithm in Python",
  "desc": "(7/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-quicksort-algorithm-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "The Timsort Algorithm in Python",
  "desc": "(8/8) Sorting Algorithms in Python",
  "link": "/realpython.com/sorting-algorithmes-python/the-timsort-algorithm-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

Sorting is an essential tool in any Pythonista’s toolkit. With knowledge of the different sorting algorithms in Python and how to maximize their potential, you’re ready to implement faster, more efficient apps and programs!

In this tutorial, you learned:

- How Python’s built-in `sort()` works behind the scenes
- What **Big O notation** is and how to use it to compare the efficiency of different algorithms
- How to measure the **actual time spent** running your code
- How to implement five different **sorting algorithms** in Python
- What the **pros and cons** are of using different algorithms

You also learned about different techniques such as **recursion**, **divide and conquer**, and **randomization**. These are fundamental building blocks for solving a long list of different algorithms, and they’ll come up again and again as you keep researching.

Take the code presented in this tutorial, create new experiments, and explore these algorithms further. Better yet, try implementing other sorting algorithms in Python. The list is vast, but [<FontIcon icon="fa-brands fa-wikipedia-w"/>selection sort](https://en.wikipedia.org/wiki/Selection_sort), [<FontIcon icon="fa-brands fa-wikipedia-w"/>heapsort](https://en.wikipedia.org/wiki/Heapsort), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>tree sort](https://en.wikipedia.org/wiki/Tree_sort) are three excellent options to start with.

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Introduction to Sorting Algorithms in Python - Real Python"
  desc="In this course, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion."
  url="https://realpython.com/courses/intro-sorting-algorithms/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Sorting Algorithms in Python",
  "desc": "In this tutorial, you'll learn all about five different sorting algorithms in Python from both a theoretical and a practical standpoint. You'll also learn several related and important concepts, including Big O notation and recursion.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/sorting-algorithms-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
