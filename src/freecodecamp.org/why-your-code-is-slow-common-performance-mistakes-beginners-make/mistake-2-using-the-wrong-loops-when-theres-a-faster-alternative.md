---
lang: en-US
title: "Mistake #2: Using the Wrong Loops (When There’s a Faster Alternative)"
description: "Article(s) > (2/8) Why Your Code is Slow: Common  Performance Mistakes Beginners Make"
icon: fa-brands fa-python
category:
  - Python
  - Java
  - C#
  - C++
  - C
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - java
  - c#
  - csharp
  - c++
  - cpp
  - c
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/8) Why Your Code is Slow: Common  Performance Mistakes Beginners Make"
    - property: og:description
      content: "Mistake #2: Using the Wrong Loops (When There’s a Faster Alternative)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/mistake-2-using-the-wrong-loops-when-theres-a-faster-alternative.html
date: 2025-03-29
isOriginal: false
author:
  - name: Rahul
    url : https://freecodecamp.org/news/author/RAHULISM/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Why Your Code is Slow: Common  Performance Mistakes Beginners Make",
  "desc": "Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like...",
  "link": "/freecodecamp.org/why-your-code-is-slow-common-performance-mistakes-beginners-make/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why Your Code is Slow: Common  Performance Mistakes Beginners Make"
  desc="Maybe you’ve experienced something like this before: you’ve written code that works, but when you hit “run,” it takes forever. You stare at the spinner, wondering if it’s faster to just solve the problem by hand. But you end up looking something like..."
  url="https://freecodecamp.org/news/why-your-code-is-slow-common-performance-mistakes-beginners-make#heading-mistake-2-using-the-wrong-loops-when-theres-a-faster-alternative"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743176201295/448f0407-8a15-4b59-a91f-8a197bc07578.png"/>

::: important Why This is a Problem

Loops are one of the first things you learn in programming, and for loops feel natural—they give you control, they’re easy to understand, and they work everywhere. That’s why beginners tend to reach for them automatically.

But just because something works doesn’t mean it’s the best way. In Python, for loops can be slow—especially when there’s a built-in alternative that does the same job faster and more efficiently.

This isn’t just a Python thing. Most programming languages have optimized ways to handle loops under the hood—whether it's vectorized operations in NumPy, functional programming in JavaScript, or stream processing in Java. Knowing when to use them is key to writing fast, clean code.

:::

::: tip Example

Let’s say you want to square a list of numbers. A beginner might write this:

```py
numbers = [1, 2, 3, 4, 5]
squared = []

for num in numbers:
    squared.append(num ** 2)
```

Looks fine, right? But there are two inefficiencies here:

1. You're manually looping when Python has a better, built-in way to handle this.
2. You're making repeated `.append()` calls, which add unnecessary overhead.

In small cases, you won’t notice a difference. But when processing large datasets, these inefficiencies add up fast.

:::

::: info The Better, Faster Way

Python has built-in optimizations that make loops run faster. One of them is list comprehensions, which are optimized in C and run significantly faster than manual loops. Here’s how you can rewrite the example:

```py
pythonCopyEdit# Much faster and cleaner
squared = [num ** 2 for num in numbers]
```

**Why this is better:**

1. **It’s faster.** List comprehensions run in C under the hood, meaning they don’t have the overhead of Python function calls like `.append()`.
2. **It eliminates extra work.** Instead of growing a list dynamically (which requires resizing in memory), Python pre-allocates space for the entire list. This makes the operation much more efficient.
3. **It’s more readable.** The intent is clear: "I’m creating a list by squaring each number"—no need to scan through multiple lines of code.
4. **It’s less error-prone.** Since everything happens in a single expression, there’s less chance of accidentally modifying the list incorrectly (for example, forgetting to `.append()`).

:::

---

## When to Use For Loops vs. List Comprehensions

For loops still have their place. Use them when:

- You need complex logic inside the loop (for example, multiple operations per iteration).
- You need to modify existing data in place rather than create a new list.
- The operation involves side effects, like logging, file writing, or network requests.

Otherwise, list comprehensions should be your default choice for simple transformations. They’re faster, cleaner, and make your Python code more efficient.
