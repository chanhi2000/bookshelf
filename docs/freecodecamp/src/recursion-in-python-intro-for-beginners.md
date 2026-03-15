---
lang: en-US
title: "Recursion in Python – A Practical Introduction for Beginners"
description: "Article(s) > Recursion in Python – A Practical Introduction for Beginners"
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
      content: "Article(s) > Recursion in Python – A Practical Introduction for Beginners"
    - property: og:description
      content: "Recursion in Python – A Practical Introduction for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/recursion-in-python-intro-for-beginners.html
prev: /programming/py/articles/README.md
date: 2026-03-13
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4893014c-db1c-4a2b-9040-e3103faf5169.png
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
  name="Recursion in Python – A Practical Introduction for Beginners"
  desc="Recursion is when a function solves a problem by calling itself. It sounds odd at first — why would a function call itself? — but once it clicks, you'll find it's often the most natural way to express"
  url="https://freecodecamp.org/news/recursion-in-python-intro-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4893014c-db1c-4a2b-9040-e3103faf5169.png"/>

Recursion is when a function solves a problem by calling itself.

It sounds odd at first — why would a function call itself? — but once it clicks, you'll find it's often the most natural way to express certain kinds of problems in code.

In this article, you'll learn what recursion is, how it works under the hood, and how to use it in Python with examples that go from the basics all the way to practical real-world use cases.

You can get the code [on GitHub (<VPIcon icon="iconfont icon-github"/>`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/recursion).

::: note Prerequisites

Before we get started, make sure you have:

- Python 3.10 or higher installed
- Basic understanding of Python functions and how they work
- Familiarity with loops and conditionals

:::

---

## What Is Recursion?

Recursion is a technique where a **function solves a problem by breaking it into a smaller version of the same problem, and calling itself on that smaller version**.

Think of a set of Russian nesting dolls or Matryoshka dolls. To find the smallest doll, you open the outer doll, then open the next one inside it, and keep going until there's nothing left to open. Each step is the same action — open the doll — just on a smaller doll than before.

That's recursion in a nutshell: the same action, applied to a shrinking problem, until you hit a point where there's nothing left to do.

---

## The Two Rules of Every Recursive Function

Every correct recursive function must have exactly two things:

**1. A base case**: the condition where the function stops calling itself and returns a result directly.

**2. A recursive case**: the part where the function calls itself with a smaller or simpler version of the input.

If you forget the base case, the function will keep calling itself forever — until Python raises a `RecursionError`. We'll talk more about that later.

---

## Your First Recursive Function

Let's start with the classic example: calculating a factorial.

The factorial of `n` (written as `n!`) is the product of all integers from 1 to n. So `5! = 5 × 4 × 3 × 2 × 1 = 120`.

Notice the pattern: `5! = 5 × 4!`. And `4! = 4 × 3!`. Each factorial is just `n` multiplied by the factorial of the number below it. That's a perfect fit for recursion.

```py
def factorial(n):
    # Base case: factorial of 0 or 1 is 1
    if n <= 1:
        return 1
    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

print(factorial(5))
print(factorial(10))
```

This outputs:

```plaintext
120
3628800
```

The base case is `n <= 1`. When we hit 0 or 1, we stop and return 1. The recursive case is `n * factorial(n - 1)`. We multiply `n` by the factorial of the number below it, trusting the function to figure out the rest.

---

## How Python Handles Recursive Calls

When a function calls itself, Python doesn't just replace the current call – it stacks them. Each call waits for the one below it to return a value before it can finish.

Let's trace `factorial(4)` step by step:

```plaintext
factorial(4)
  └── 4 * factorial(3)
            └── 3 * factorial(2)
                      └── 2 * factorial(1)
                                └── returns 1   ← base case
                      └── 2 * 1 = 2
            └── 3 * 2 = 6
  └── 4 * 6 = 24
```

Each call is pushed onto Python's **call stack**. Once the base case returns, the stack unwinds — each waiting call gets its answer and finishes. This is why deep recursion can be a problem: too many stacked calls and Python runs out of stack space.

---

## Recursion vs Iteration

Most problems you can solve recursively, you can also solve with a loop. Let's compare both approaches for summing a list of numbers.

### Iterative approach

```py
def sum_iterative(numbers):
    total = 0
    for n in numbers:
        total += n
    return total
```

### Recursive approach

```py
def sum_recursive(numbers):
    if not numbers:       # base case: empty list
        return 0
    return numbers[0] + sum_recursive(numbers[1:])

print(sum_recursive([10, 20, 30, 40]))
```

The recursive function call gives the following output:

```plaintext
100
```

The recursive version says: *the sum of a list is the first element plus the sum of everything else*. The base case is an empty list, which sums to 0. Both the iterative and recursive approaches work. Recursion tends to be more expressive. It's closer to how you'd describe the problem in plain English. Iteration tends to be more efficient in Python. Knowing when to use which one is a skill you'll develop with practice.

---

## Working with Nested Data

Here's where recursion really starts to make sense. Loops are great for flat data, but nested structures — like a folder tree or a deeply nested dictionary — are often awkward to handle with loops alone.

Let's say you have a nested dictionary representing a product catalog, and you want to find all the prices buried inside it:

```py
catalog = {
    "electronics": {
        "laptops": {
            "ThinkPad X1": 1299.99,
            "MacBook Air": 1099.99
        },
        "accessories": {
            "USB-C Hub": 49.99,
            "Laptop Stand": 34.99
        }
    },
    "stationery": {
        "Notebook A5": 8.99,
        "Gel Pen Set": 12.49
    }
}

def find_all_prices(data):
    prices = []
    for value in data.values():
        if isinstance(value, dict):
            # It's a nested dict — recurse into it
            prices.extend(find_all_prices(value))
        else:
            # It's a price — collect it
            prices.append(value)
    return prices

all_prices = find_all_prices(catalog)
print(f"All prices: {all_prices}")
print(f"Total inventory value: ${sum(all_prices):.2f}")
```

The function checks each value. If it's another dictionary, it recurses into it. If it's a number, it collects it.

Writing this with nested loops would require you to know the depth of the structure in advance. Recursion doesn't care how deep it goes.

```plaintext title="output"
All prices: [1299.99, 1099.99, 49.99, 34.99, 8.99, 12.49]
Total inventory value: $2506.44
```

---

## Recursive Tree Traversal

A [<VPIcon icon="fa-brands fa-wikipedia-w"/>tree](https://en.wikipedia.org/wiki/Tree_(abstract_data_type)) is a structure where each node can have child nodes, and each child node is itself a tree. That self-similar structure maps directly to a recursive function.

Let's build a simple file system tree and calculate the total size of all files:

```py
class FileNode:
    def __init__(self, name, size=0, children=None):
        self.name = name
        self.size = size  # 0 for folders
        self.children = children or []

def total_size(node):
    # Base case: it's a file (no children)
    if not node.children:
        return node.size
    # Recursive case: sum this node's size + all children's sizes
    return node.size + sum(total_size(child) for child in node.children)

# Build a small file tree
project = FileNode("project", children=[
    FileNode("src", children=[
        FileNode("main.py", size=12400),
        FileNode("utils.py", size=5800),
    ]),
    FileNode("data", children=[
        FileNode("sales_jan.parquet", size=302914),
        FileNode("sales_feb.parquet", size=289000),
    ]),
    FileNode("README.md", size=3200)
])

print(f"Total project size: {total_size(project):,} bytes")
print(f"Source files only: {total_size(project.children[0]):,} bytes")
```

For each node, we either return its size directly (base case: it's a file) or add its size to the sum of all its children (recursive case: it's a folder). The structure of the code mirrors the structure of the tree.

Running the above should give the following output:

```plaintext title="output"
Total project size: 613,314 bytes
Source files only: 18,200 bytes
```

---

## Memoization: Fixing Slow Recursion

Recursion can sometimes do a lot of repeated work. The classic example is the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence), where each number is the sum of the two before it.

```py
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

This works, but `fib(35)` already takes a noticeable pause. The problem is that `fib(30)` gets calculated dozens of times across different branches.

The fix is **memoization** which involves caching results so each value is only computed once. Python makes this super simple with `functools.lru_cache`, which you can use like so:

```py
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_fast(n):
    if n <= 1:
        return n
    return fib_fast(n - 1) + fib_fast(n - 2)

print(fib_fast(10))
print(fib_fast(50))
print(fib_fast(100))
#
# 55
# 12586269025
# 354224848179261915075
```

Adding `@lru_cache` stores the result of each call. The next time `fib_fast(30)` is needed, it returns the cached value instantly instead of recalculating the entire subtree.

::: note

Memoization is worth reaching for any time your recursive function might solve the same subproblem more than once.

:::

---

## Python's Recursion Limit

Python sets a default recursion limit of **1000 calls**. If your function goes deeper than that, you'll get a `RecursionError`:

```py
def countdown(n):
    if n == 0:
        return "Done"
    return countdown(n - 1)

print(countdown(5))     # works fine
print(countdown(2000))  # raises RecursionError
```

Here `countdown(5)` works and we get the `Done` message while `countdown(2000)` gives a `RecursionError` as it exceeds the preset recursion limit of 1000 recursive calls.

```plaintext title="output"
Done
RecursionError: maximum recursion depth exceeded
```

You can raise the limit with `sys.setrecursionlimit()`, but this is usually a sign that iteration — or memoization — is the better tool for that particular problem.

```py
import sys
sys.setrecursionlimit(5000)  # use with caution
```

For most tree traversals and [<VPIcon icon="fa-brands fa-wikipedia-w"/>divide-and-conquer](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm) algorithms, the default limit is more than enough. You'll only hit it when working with very deep input structures.

---

## When to Use Recursion

Recursion is a good fit when:

- The problem has a naturally self-similar structure — trees, graphs, nested data, file systems
- You're implementing divide-and-conquer algorithms — merge sort, binary search, quicksort
- The recursive solution is significantly clearer than the iterative equivalent
- The depth of the structure is unknown at compile time

Prefer iteration when:

- You're working with flat sequences — summing a list, searching an array
- Performance is critical — Python doesn't optimise tail calls, so deep recursion has overhead
- The input could be very large or deeply nested — risking a RecursionError

---

## Conclusion

Recursion takes a little time to feel natural, but the core idea is simple: solve a small version of the problem, trust the function to handle the rest, and always define a base case to stop.

You've covered the fundamentals: how the call stack works, how to handle nested data, tree traversal, and how to speed things up with memoization. These patterns come up repeatedly in practice, especially when working with file systems, parsers, and hierarchical data.

The best way to get comfortable with recursion is to pick a suitable problem and try writing it recursively before reaching for a loop. The thinking gets easier every time. You can also solve related programming challenges on HackerRank or Leetcode.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Recursion in Python – A Practical Introduction for Beginners",
  "desc": "Recursion is when a function solves a problem by calling itself. It sounds odd at first — why would a function call itself? — but once it clicks, you'll find it's often the most natural way to express",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/recursion-in-python-intro-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
