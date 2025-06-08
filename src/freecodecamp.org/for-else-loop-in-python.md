---
lang: en-US
title: "How Does Python's For-Else Loop Construct Work?"
description: "Article(s) > How Does Python's For-Else Loop Construct Work?"
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
      content: "Article(s) > How Does Python's For-Else Loop Construct Work?"
    - property: og:description
      content: "How Does Python's For-Else Loop Construct Work?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/for-else-loop-in-python.html
prev: /programming/py/articles/README.md
date: 2024-06-19
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://www.freecodecamp.org/news/content/images/2024/06/fimg-1-.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Does Python's For-Else Loop Construct Work?"
  desc="Python supports the for-else loop construct that is lesser known but super helpful. If you’ve programmed in Python, you may have used the for loop to iterate over items in iterables such as lists. But for some use cases, using the for loop in conjunc..."
  url="https://freecodecamp.org/news/for-else-loop-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://www.freecodecamp.org/news/content/images/2024/06/fimg-1-.png"/>

Python supports the for-else loop construct that is lesser known but super helpful.

If you’ve programmed in Python, you may have used the `for` loop to iterate over items in iterables such as lists. But for some use cases, using the for loop in conjunction with the `else` clause can be helpful.

In this tutorial, we’ll learn how to use for-else loops by coding a couple of examples to understand how they work.

---

## Syntax of the `for-else` Loop in Python

In Python, the `for-else` loop is a construct that combines a `for` loop with an `else` clause.

The loop body typically checks for a condition. If the condition is `True`, the control breaks out of the loop. The `else` block will execute only when the `for` loop completes normally without encountering a `break` statement.

Let's look at a generic `for-else` loop construct:

```py
for item in iterable:
    # loop body
    if condition:
        break
else:
    # else body
```

Here's a breakdown of how this works:

- The `for` loop iterates over each item in the `iterable`.
- If the `condition` is `True` and the control breaks out of the loop, the `else` block is skipped.
- If the `for` loop iterates over all items in the `iterable`—without meeting the condition to break out of the loop—the `else` block is executed.

Now let's code a couple of examples.

---

## Example 1: Finding a Prime Number

Let's use the `for-else` loop to check if a number is prime. As you may recall, a number is prime if it is divisible only by 1 and itself and has no other factors.

Look at the code snippet below:

```py
import math

def is_prime(n):
    if n <= 1:
        return False

    for i in range(2, int(math.sqrt(n))+ 1):
        if n % i == 0:
            print(f"{n} is divisible by {i}. Not a prime number.")
            break
    else:
        # This block executes if the loop did not encounter a break statement
        print(f"{n} is a prime number.")
        return True
```

Here, the `is_prime()` function first checks if the input number `n` is less than or equal to 1. If so, it returns `False` since prime numbers are greater than 1. Remember, the smallest prime number is 2. We use the `for` loop to iterate over the range of numbers from 2 to the square root of `n` (inclusive).

- If `n` is divisible by any `i` in this range (2, `√n`), it means `n` is not a prime number, as we've found a factor. The function prints a message and breaks out of the loop. And the `else` block is skipped.
- If the loop completes without finding any factors—without hitting a `break` statement—the `else` block executes. The function prints that `n` is a prime number and returns `True`.

You can verify that the `is_prime()` function works as expected with a few function calls:

```py
# Test with a non-prime number
is_prime(10) 
# Output: 10 is divisible by 2. Not a prime number.


# Test with a prime number
is_prime(13) 
# Output: 13 is a prime number.
```

::: note A Note on Checking for Prime Numbers

You’d probably run the loop over all the numbers from 2 to `n` to check if there’s a factor. But it actually suffices to iterate up to the **square root of `n`**. Why?

Recall that if `p` is a factor, you can always find a `q` such that `p x q = n`:

- If `n` is a perfect square, then `p = q`.
- If `n` is not a perfect square, you have the following. If `p` is less than `√n`, `q` is greater than `√n`. And if `q` is greater than `√n`, `p` is less than `√n`.

💡 So if you don't find a factor up to `√n`, you cannot find one beyond `√n` either.

:::

---

## Example 2: Searching for an Item in a List

Let's take another example where the `for-else` loop is helpful.

The following `search item()` function takes in a list and an item. The goal is to loop over the items in the list and check if the item exists. For this problem you can use the for-else loop construct like so:

```py
def search_item(lst, item):
    for i in lst:
        if i == item:
            print(f"Found {item} in the list.")
            break
    else:
        print(f"{item} is not in the list.")
```

If the `item` is found the control breaks out of the loop. The `else` block is triggered only if the item is not found in the list.

Let’s verify with a few calls to the function:

```py
# Test with a list containing the item
search_item([1, 2, 3, 4, 5], 3)  
# Output: Found 3 in the list.

# Test with a list not containing the item
search_item([1, 2, 3, 4, 5], 6)  
# Output: 6 is not in the list.
```

---

## Wrapping Up

I hope you found this tutorial on the `for-else` loop construct in Python helpful.

This can come in handy especially when exiting the loop after iterating over all items—without breaking out of the loop earlier—is of interest. That said, if you don't need to conditionally break out of the loop, you don't need a `for-else` loop, and a simple `for` loop will suffice.

Keep coding. Until the next tutorial!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Does Python's For-Else Loop Construct Work?",
  "desc": "Python supports the for-else loop construct that is lesser known but super helpful. If you’ve programmed in Python, you may have used the for loop to iterate over items in iterables such as lists. But for some use cases, using the for loop in conjunc...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/for-else-loop-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
