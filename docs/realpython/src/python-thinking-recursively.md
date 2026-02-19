---
lang: en-US
title: "Thinking Recursively in Python"
description: "Article(s) > Thinking Recursively in Python"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Thinking Recursively in Python"
    - property: og:description
      content: "Thinking Recursively in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-thinking-recursively.html
prev: /programming/py/articles/README.md
date: 2018-03-27
isOriginal: false
author:
  - name: Abhirag Awasthi
    url: https://realpython.com/team/aawasthi/
cover: https://files.realpython.com/media/Thinking-Recursively-in-Python_Watermarked.db67ac63aeb5.jpg
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
  name="Thinking Recursively in Python"
  desc="Learn how to work with recursion in your Python programs by mastering concepts such as recursive functions and recursive data structures."
  url="https://realpython.com/python-thinking-recursively"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Thinking-Recursively-in-Python_Watermarked.db67ac63aeb5.jpg"/>

::: info Seymour Papert, Mindstorms

> “Of all ideas I have introduced to children, recursion stands out as the one idea that is particularly able to evoke an excited response.”

![XKCD comic 1739: Fixing Problems<br/>Image: [<VPIcon icon="fas fa-globe"/>xkcd.com](https://xkcd.com/1739)](https://files.realpython.com/media/fixing_problems.ffd6d34e887e.png)

:::

Problems (in life and also in computer science) can often seem big and scary. But if we keep chipping away at them, more often than not we can break them down into smaller chunks trivial enough to solve. This is the essence of thinking recursively, and my aim in this article is to provide you, my dear reader, with the conceptual tools necessary to approach problems from this recursive point of view.

Together, we’ll learn how to work with [**recursion**](/realpython.com/python-recursion.md) in our Python programs by mastering concepts such as recursive functions and recursive data structures. We’ll also talk about maintaining state during recursion and avoiding recomputation by [**caching results**](/realpython.com/python-memcache-efficient-caching.md). This is going to be a lot of fun. Onwards and upwards!

---

## Dear Pythonic Santa Claus…

I realize that as fellow Pythonistas we are all consenting adults here, but children seem to grok the beauty of recursion better. So let’s *not* be adults here for a moment and talk about how we can use recursion to help Santa Claus.

Have you ever wondered how Christmas presents are delivered? I sure have, and I believe Santa Claus has a list of houses he loops through. He goes to a house, drops off the presents, eats the cookies and milk, and moves on to the next house on the list. Since this algorithm for delivering presents is based on an explicit loop construction, it is called an iterative algorithm.

![Iterative Present Delivery](https://files.realpython.com/media/santa_claus_2.ecbf2686f1a1.png)

The algorithm for iterative present delivery implemented in Python:

```py
houses = ["Eric's house", "Kenny's house", "Kyle's house", "Stan's house"]

def deliver_presents_iteratively():
    for house in houses:
        print("Delivering presents to", house)

>>> deliver_presents_iteratively()
Delivering presents to Eric's house
Delivering presents to Kenny's house
Delivering presents to Kyle's house
Delivering presents to Stan's house
```

But I feel for Santa. At his age, he shouldn’t have to deliver all the presents by himself. I propose an algorithm with which he can divide the work of delivering presents among his elves:

::: info

1. Appoint an elf and give all the work to him
2. Assign titles and responsibilities to the elves based on the number of houses for which they are responsible:
    - `> 1` He is a manager and can appoint two elves and divide his work among them
    - `= 1` He is a worker and has to deliver the presents to the house assigned to him

![Recursive Present Delivery](https://files.realpython.com/media/elves_7.8d1af1cd85c8.png)

:::

This is the typical structure of a recursive algorithm. If the current problem represents a simple case, solve it. If not, divide it into subproblems and apply the same strategy to them.

The algorithm for recursive present delivery implemented in Python:

```py
houses = ["Eric's house", "Kenny's house", "Kyle's house", "Stan's house"]

# Each function call represents an elf doing his work 
def deliver_presents_recursively(houses):
    # Worker elf doing his work
    if len(houses) == 1:
        house = houses[0]
        print("Delivering presents to", house)

    # Manager elf doing his work
    else:
        mid = len(houses) // 2
        first_half = houses[:mid]
        second_half = houses[mid:]

        # Divides his work among two elves
        deliver_presents_recursively(first_half)
        deliver_presents_recursively(second_half)

deliver_presents_recursively(houses)
#
# Delivering presents to Eric's house
# Delivering presents to Kenny's house
# Delivering presents to Kyle's house
# Delivering presents to Stan's house
```

---

## Recursive Functions in Python

Now that we have some intuition about recursion, let’s introduce the formal definition of a recursive function. A recursive function is a function defined in terms of itself via self-referential expressions.

This means that the function will continue to call itself and repeat its behavior until some condition is met to [**return**](/realpython.com/python-return-statement/README.md) a result. All recursive functions share a common structure made up of two parts: base case and recursive case.

To demonstrate this structure, let’s write a recursive function for calculating `n!`:

1. Decompose the original problem into simpler instances of the same problem. This is the recursive case:

```plaintext
n! = n x (n−1) x (n−2) x (n−3) ⋅⋅⋅⋅ x 3 x 2 x 1
n! = n x (n−1)!
```

2. As the large problem is broken down into successively less complex ones, those subproblems must eventually become so simple that they can be solved without further subdivision. This is the base case:

```plaintext
n! = n x (n−1)! 
n! = n x (n−1) x (n−2)!
n! = n x (n−1) x (n−2) x (n−3)!
⋅
⋅
n! = n x (n−1) x (n−2) x (n−3) ⋅⋅⋅⋅ x 3!
n! = n x (n−1) x (n−2) x (n−3) ⋅⋅⋅⋅ x 3 x 2!
n! = n x (n−1) x (n−2) x (n−3) ⋅⋅⋅⋅ x 3 x 2 x 1!
```

Here, `1!` is our base case, and it equals `1`.

Recursive function for calculating `n!` implemented in Python:

```py
def factorial_recursive(n):
    # Base case: 1! = 1
    if n == 1:
        return 1

    # Recursive case: n! = n * (n-1)!
    else:
        return n * factorial_recursive(n-1)

factorial_recursive(5)
#
# 120
```

Behind the scenes, each recursive call adds a stack frame (containing its execution context) to the call stack until we reach the base case. Then, the stack begins to unwind as each call returns its results:

![Call Stack](https://files.realpython.com/media/stack.9c4ba62929cf.gif)

---

## Maintaining State

When dealing with recursive functions, keep in mind that each recursive call has its own execution context, so to maintain state during recursion you have to either:

- Thread the state through each recursive call so that the current state is part of the current call’s execution context
- Keep the state in global scope

A demonstration should make things clearer. Let’s calculate `1 + 2 + 3 ⋅⋅⋅⋅ + 10` using recursion. The state that we have to maintain is *(current number we are adding, accumulated sum till now)*.

Here’s how you do that by [**threading**](/realpython.com/intro-to-python-threading.md) it through each recursive call (i.e. passing the updated current state to each recursive call as arguments):

```py
def sum_recursive(current_number, accumulated_sum):
    # Base case
    # Return the final state
    if current_number == 11:
        return accumulated_sum

    # Recursive case
    # Thread the state through the recursive call
    else:
        return sum_recursive(current_number + 1, accumulated_sum + current_number)

# Pass the initial state
sum_recursive(1, 0)
#
# 55
```

![Maintaining State](https://files.realpython.com/media/state_3.3e8a68c4fde5.png)

Here’s how you maintain the state by keeping it in global [**scope**](/realpython.com/python-namespace.md):

```py
# Global mutable state
current_number = 1
accumulated_sum = 0

def sum_recursive():
    global current_number
    global accumulated_sum
    # Base case
    if current_number == 11:
        return accumulated_sum
    # Recursive case
    else:
        accumulated_sum = accumulated_sum + current_number
        current_number = current_number + 1
        return sum_recursive()

sum_recursive()
#
# 55
```

I prefer threading the state through each recursive call because I find global mutable state to be evil, but that’s a discussion for a later time.

---

## Recursive Data Structures in Python

A data structure is recursive if it can be deﬁned in terms of a smaller version of itself. A [**list**](/realpython.com/python-lists-tuples.md) is an example of a recursive data structure. Let me demonstrate. Assume that you have only an empty list at your disposal, and the only operation you can perform on it is this:

```py
# Return a new list that is the result of
# adding element to the head (i.e. front) of input_list
def attach_head(element, input_list):
    return [element] + input_list
```

Using the empty list and the `attach_head` operation, you can generate any list. For example, let’s generate `[1, 46, -31, "hello"]`:

```py
attach_head(1,                                                  # Will return [1, 46, -31, "hello"]
            attach_head(46,                                     # Will return [46, -31, "hello"]
                        attach_head(-31,                        # Will return [-31, "hello"]
                                    attach_head("hello", [])))) # Will return ["hello"]
#
# [1, 46, -31, 'hello']
```

![Image of a list generated by recursively applying the attach_head  Python function](https://files.realpython.com/media/list.3df62a89243d.gif)

1. Starting with an empty list, you can generate any list by recursively applying the `attach_head` function, and thus the list data structure can be defined recursively as:

```plaintext
           +---- attach_head(element, smaller list)
    list = +
           +---- empty list
```

2. Recursion can also be seen as self-referential function composition. We apply a function to an argument, then pass that result on as an argument to a second application of the same function, and so on. Repeatedly composing `attach_head` with itself is the same as `attach_head` calling itself repeatedly.

List is not the only recursive data structure. Other examples include [**set**](/realpython.com/python-sets/README.md), tree, [**dictionary**](/realpython.com/python-dicts/README.md), etc.

Recursive data structures and recursive functions go together like bread and butter. The recursive function’s structure can often be modeled after the definition of the recursive data structure it takes as an input. Let me demonstrate this by calculating the sum of all the elements of a list recursively:

```py
def list_sum_recursive(input_list):
    # Base case
    if input_list == []:
        return 0

    # Recursive case
    # Decompose the original problem into simpler instances of the same problem
    # by making use of the fact that the input is a recursive data structure
    # and can be deﬁned in terms of a smaller version of itself
    else:
        head = input_list[0]
        smaller_list = input_list[1:]
        return head + list_sum_recursive(smaller_list)

>>> list_sum_recursive([1, 2, 3])
6
```

---

## Naive Recursion is Naive

The Fibonacci numbers were originally deﬁned by the Italian mathematician Fibonacci in the thirteenth century to model the growth of rabbit populations. Fibonacci surmised that the number of pairs of rabbits born in a given year is equal to the number of pairs of rabbits born in each of the two previous years, starting from one pair of rabbits in the ﬁrst year.

To count the number of rabbits born in the nth year, he deﬁned the recurrence relation:

$$
F_{n}=F_{n-1}+F_{n-2}
$$

The base cases are:

$$
F_{0}=0\:\text{and}\:F_{1}=1
$$

Let’s write a recursive function to compute the nth Fibonacci number:

```py
def fibonacci_recursive(n):
    print("Calculating F", "(", n, ")", sep="", end=", ")

    # Base case
    if n == 0:
        return 0
    elif n == 1:
        return 1

    # Recursive case
    else:
        return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

fibonacci_recursive(5)
#
# Calculating F(5), Calculating F(4), Calculating F(3), Calculating F(2), Calculating F(1), 
# Calculating F(0), Calculating F(1), Calculating F(2), Calculating F(1), Calculating F(0), 
# Calculating F(3), Calculating F(2), Calculating F(1), Calculating F(0), Calculating F(1),
#
# 5
```

Naively following the recursive deﬁnition of the nth Fibonacci number was rather inefficient. As you can see from the output above, we are unnecessarily recomputing values. Let’s try to improve `fibonacci_recursive` by caching the results of each Fibonacci computation Fk:

```py
from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci_recursive(n):
    print("Calculating F", "(", n, ")", sep="", end=", ")

    # Base case
    if n == 0:
        return 0
    elif n == 1:
        return 1

    # Recursive case
    else:
        return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

fibonacci_recursive(5)
#
# Calculating F(5), Calculating F(4), Calculating F(3), Calculating F(2), Calculating F(1), Calculating F(0),
#
# 5
```

[**`lru_cache`**](/realpython.com/lru-cache-python.md) is a [**decorator**](/realpython.com/primer-on-python-decorators/README.md) that caches the results. Thus, we avoid recomputation by explicitly checking for the value before trying to compute it. One thing to keep in mind about `lru_cache` is that since it uses a dictionary to cache results, the positional and keyword arguments (which serve as keys in that dictionary) to the function must be hashable.

---

## Pesky Details

Python doesn’t have support for [<VPIcon icon="fa-brands fa-python"/><VPIcon icon="fa-brands fa-wikipedia-w"/>tail-call elimination](https://en.wikipedia.org/wiki/Tail_call). As a result, you can cause a stack overflow if you end up using more stack frames than the [<VPIcon icon="fa-brands fa-python"/>default call stack depth](https://docs.python.org/3.6/library/sys.html#sys.getrecursionlimit):

```py
import sys
sys.getrecursionlimit()
#
# 1000
```

Keep this limitation in mind if you have a program that requires deep recursion.

Also, Python’s mutable data structures don’t support structural sharing, so treating them like [<VPIcon icon="fa-brands fa-wikipedia-w"/>immutable data structures](https://en.wikipedia.org/wiki/Persistent_data_structure) is going to negatively affect your space and [**GC (garbage collection)**](/realpython.com/python-memory-management.md#garbage-collection) efficiency because you are going to end up unnecessarily copying a lot of mutable objects. For example, I have used this pattern to decompose lists and recurse over them:

```py
input_list = [1, 2, 3]
head = input_list[0]
tail = input_list[1:]
print("head --", head)
#
# head -- 1
print("tail --", tail)
#
# tail -- [2, 3]
```

I did that to simplify things for the sake of clarity. Keep in mind that tail is being created by copying. Recursively doing that over large lists can negatively affect your space and GC efficiency.

---

## Fin

I was once asked to explain recursion in an interview. I took a sheet of paper and wrote `Please turn over` on both sides. The interviewer didn’t get the joke, but now that you have read this article, hopefully you do 🙂 Happy Pythoning!

:: info References

```component VPCard
{
  "title": "Thinking Recursively: Roberts, Eric S.: 9780471816522: Amazon.com: Books",
  "desc": "Buy Thinking Recursively on Amazon.com ✓ FREE SHIPPING on qualified orders",
  "link": "https://amazon.com/dp/0471816523/",
  "logo": "https://amazon.com/favicon.ico",
  "background": "rgba(244,245,246,0.2)"
}
```

```component VPCard
{
  "title": "The Little Schemer - 4th Edition: Daniel P. Friedman, Matthias Felleisen, Duane Bibby, Gerald J. Sussman: 8601300171425: Amazon.com: Books",
  "desc": "The Little Schemer - 4th Edition [Daniel P. Friedman, Matthias Felleisen, Duane Bibby, Gerald J. Sussman] on Amazon.com. *FREE* shipping on qualifying offers. The Little Schemer - 4th Edition",
  "link": "https://amazon.com/dp/0262560992/",
  "logo": "https://amazon.com/favicon.ico",
  "background": "rgba(244,245,246,0.2)"
}
```

```component VPCard
{
  "title": "Concepts, Techniques, and Models of Computer Programming: Peter Van Roy, Seif Haridi: 9780262220699: Amazon.com: Books",
  "desc": "Concepts, Techniques, and Models of Computer Programming [Peter Van Roy, Seif Haridi] on Amazon.com. *FREE* shipping on qualifying offers. Concepts, Techniques, and Models of Computer Programming",
  "link": "https://amazon.com/dp/0262220695/",
  "logo": "https://amazon.com/favicon.ico",
  "background": "rgba(244,245,246,0.2)"
}
```

```component VPCard
{
  "title": "The Algorithm Design Manual: Skiena, Steve S.: 9781848000698: Amazon.com: Books",
  "desc": "Buy The Algorithm Design Manual on Amazon.com ✓ FREE SHIPPING on qualified orders",
  "link": "https://amazon.com/dp/1848000693/",
  "logo": "https://amazon.com/favicon.ico",
  "background": "rgba(244,245,246,0.2)"
}
```

<SiteInfo
  name="Haskell Programming"
  desc="A Haskell book for beginners that works for non-programmers and experienced hackers alike."
  url="http://haskellbook.com/"
  logo="http://haskellbook.com/img/favicon.ico"
  preview="http://haskellbook.com/images/book_cover-min.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Thinking Recursively in Python",
  "desc": "Learn how to work with recursion in your Python programs by mastering concepts such as recursive functions and recursive data structures.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-thinking-recursively.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
