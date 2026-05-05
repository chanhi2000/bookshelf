---
lang: en-US
title: "How Passing by Object Reference Works in Python"
description: "Article(s) > How Passing by Object Reference Works in Python"
icon: fa-brands fa-python
category:
  - Python
  - C
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - c
  - clang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Passing by Object Reference Works in Python"
    - property: og:description
      content: "How Passing by Object Reference Works in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-passing-by-object-reference-works-in-python.html
prev: /programming/py/articles/README.md
date: 2026-03-26
isOriginal: false
author:
  - name: Mokshita V P
    url: https://freecodecamp.org/news/author/vpmokshita/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0fb11934-22c6-4304-948c-54c7d423c79d.png
---

# {{ $frontmatter.title }}

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "C > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/c/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Passing by Object Reference Works in Python"
  desc="If you've ever modified a variable inside a Python function and been surprised or confused by what happened to it outside the function, you're not alone. This tripped me up for a long time. Coming fro"
  url="https://freecodecamp.org/news/how-passing-by-object-reference-works-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0fb11934-22c6-4304-948c-54c7d423c79d.png"/>

If you've ever modified a variable inside a Python function and been surprised or confused by what happened to it outside the function, you're not alone. This tripped me up for a long time.

Coming from tutorials that talked about "call by value" and "call by reference," I assumed Python must follow one of those two models. It doesn't. Python does something slightly different, and once you understand it, a lot of previously confusing behavior will suddenly click.

In this article, you'll learn:

- What calling by value and calling by reference mean
- How other languages like C handle this
- What Python actually does (passing by object reference)
- How mutable and immutable types affect behavior inside functions

---

## Call by Value and Call by Reference Explained

Before we get to Python, let's quickly define these two terms.

**Call by value** means a copy of the variable is passed to the function. Whatever you do to it inside the function, the original stays unchanged.

**Call by reference** means the actual memory location of the variable is passed. Changes inside the function directly affect the original variable.

Many languages support one or both of these models. Python, however, uses neither – at least not in the traditional sense.

### How It Works in C (with Examples)

C is a good example of a language that supports both models explicitly.

Here's how you call by value in C. The original variable is unaffected:

```c
#include <stdio.h>

void modify(int *n) {

*n = *n + 10;

printf("Inside function: %d\n", *n); }

int main() {

int x = 5;

modify(&x);

printf("Outside function: %d\n", x);

return 0; }
```

Output:

Inside function: 15

Outside function: 15 ← original changed!

In C, you explicitly choose the behavior by deciding whether to pass a pointer or a plain value. Python doesn't give you that choice, but what it does instead is actually quite logical.

---

## What Python Does Instead

Python uses a model called **passing by object reference** (sometimes called passing by assignment).

When you pass a variable to a function in Python, you're passing a reference to the object that variable points to, not a copy of the value, and not the variable itself.

What happens next depends entirely on whether that object is **mutable** (can be changed in place) or **immutable** (cannot be changed in place).

### Mutable vs Immutable Types

**Immutable types** in Python include `int`, `float`, `str`, and `tuple`. These objects cannot be modified in place. When you "change" one inside a function, Python creates a brand new object and the original is left untouched.

```py
def modify_number(n):
     n = n + 10
     print("Inside function:", n)

x = 5

modify_number(x)

print("Outside function:", x)
```

Output:

Inside function: 15

Outside function: 15 ← original unchanged

**Mutable types** include `list`, `dict`, and `set`. These can be changed in place. When you modify one inside a function, you're modifying the same object the caller is holding a reference to.

```py
def modify_list(items):

    items.append(99)

    print("Inside function:", items)

my_list = [1, 2, 3]

modify_list(my_list)

print("Outside function:", my_list)
```

Output:

Inside function: [1, 2, 3, 99]

Outside function: [1, 2, 3, 99] ← original changed!

This is the key insight: Python doesn't decide behavior based on how you pass something, it decides based on what type of object you're passing.

---

## Conclusion

Python doesn't use call by value or call by reference. It **passes by object reference**, where the function receives a reference to the object, and whether that object can be modified in place determines what happens next.

::: info To recap:

- **Immutable types** (`int`, `str`, `tuple`): a new object is created inside the function, original stays the same
- **Mutable types** (`list`, `dict`, `set`): the original object is modified directly

:::

Once this clicked for me, a lot of the "why is Python doing this?" moments started making sense. If you're just getting started with functions in Python, keep this in the back of your mind, it'll save you a lot of debugging headaches.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Passing by Object Reference Works in Python",
  "desc": "If you've ever modified a variable inside a Python function and been surprised or confused by what happened to it outside the function, you're not alone. This tripped me up for a long time. Coming fro",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-passing-by-object-reference-works-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
