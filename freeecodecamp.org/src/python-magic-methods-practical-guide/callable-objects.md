---
lang: en-US
title: "Callable Objects"
description: "Article(s) > (7/10) How Python Magic Methods Work: A Practical Guide" 
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Callable Objects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-magic-methods-practical-guide/callable-objects.html
date: 2025-03-21
isOriginal: false
author:
  - name: Vivek Sahu
    url : https://freecodecamp.org/news/author/viv1/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How Python Magic Methods Work: A Practical Guide",
  "desc": "Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe...",
  "link": "/freecodecamp.org/python-magic-methods-practical-guide/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Python Magic Methods Work: A Practical Guide"
  desc="Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe..."
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-callable-objects"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

The `__call__` magic method lets you make instances of your class behave like functions. This is useful for creating objects that maintain state between calls or for implementing function-like behavior with additional features.

---

## `__call__`

The `__call__` method is called when you try to call an instance of your class as if it were a function. Here's a simple example:

```py :collapsed-lines
class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

# Create instances that behave like functions
double = Multiplier(2)
triple = Multiplier(3)

print(double(5))  # Output: 10
print(triple(5))  # Output: 15
```

This example shows how `__call__` lets you create objects that maintain state (the factor) while being callable like functions.

---

## Practical Example: Memoization Decorator

Let's implement a memoization decorator using `__call__`. This decorator will cache function results to avoid redundant computations:

```py :collapsed-lines
import time
import functools

class Memoize:
    def __init__(self, func):
        self.func = func
        self.cache = {}
        # Preserve function metadata (name, docstring, etc.)
        functools.update_wrapper(self, func)

    def __call__(self, *args, **kwargs):
        # Create a key from the arguments
        # For simplicity, we assume all arguments are hashable
        key = str(args) + str(sorted(kwargs.items()))

        if key not in self.cache:
            self.cache[key] = self.func(*args, **kwargs)

        return self.cache[key]

# Usage
@Memoize
def fibonacci(n):
    """Calculate the nth Fibonacci number recursively."""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Measure execution time
def time_execution(func, *args, **kwargs):
    start = time.time()
    result = func(*args, **kwargs)
    end = time.time()
    print(f"{func.__name__}({args}, {kwargs}) took {end - start:.6f} seconds")
    return result

# Without memoization, this would be extremely slow
print("Calculating fibonacci(35)...")
result = time_execution(fibonacci, 35)
print(f"Result: {result}")

# Second call is instant due to memoization
print("\nCalculating fibonacci(35) again...")
result = time_execution(fibonacci, 35)
print(f"Result: {result}")
```

Let's break down how this memoization decorator works:

1. **Initialization**:
    - Takes a function as an argument
    - Creates a cache dictionary to store results
    - Preserves the function's metadata using `functools.update_wrapper`
2. **Call method**:
    - Creates a unique key from the function arguments
    - Checks if the result is in the cache
    - If not, computes the result and stores it
    - Returns the cached result
3. **Usage**:
    - Applied as a decorator to any function
    - Automatically caches results for repeated calls
    - Preserves function metadata and behavior

The benefits of this implementation include:

1. Better performance, as it avoids redundant computations
2. Better, transparency, as it works without modifying the original function
3. It’s flexible, and can be used with any function
4. It’s memory efficient and caches results for reuse
5. It maintains function documentation