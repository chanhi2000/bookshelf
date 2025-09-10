---
lang: en-US
title: "The Significance of Time Complexity"
description: "Article(s) > (3/8) Sorting Algorithms in Python"
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
      content: "Article(s) > (3/8) Sorting Algorithms in Python"
    - property: og:description
      content: "The Significance of Time Complexity"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/sorting-algorithms-python/the-significance-of-time-complexity.html
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
  url="https://realpython.com/sorting-algorithms-python#the-significance-of-time-complexity"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Sorting-Algorithms-in-Python-Merge-Sort-vs-Bubble-Sort_Watermarked.5c97ff618265.jpg"/>

This tutorial covers two different ways to measure the **runtime** of sorting algorithms:

1. For a practical point of view, you’ll measure the runtime of the implementations using the `timeit` module.
2. For a more theoretical perspective, you’ll measure the **runtime complexity** of the algorithms using [<VPIcon icon="fa-brands fa-wikipedia-w"/>Big O notation](https://en.wikipedia.org/wiki/Big_O_notation).

---

## Timing Your Code

When comparing two sorting algorithms in Python, it’s always informative to look at how long each one takes to run. The specific time each algorithm takes will be partly determined by your hardware, but you can still use the proportional time between executions to help you decide which implementation is more time efficient.

In this section, you’ll focus on a practical way to measure the actual time it takes to run to your sorting algorithms using the `timeit` module. For more information on the different ways you can time the execution of code in Python, check out [**Python Timer Functions: Three Ways to Monitor Your Code**](/realpython.com/python-timer.md).

Here’s a function you can use to time your algorithms:

```py :collapsed-lines
from random import randint
from timeit import repeat

def run_sorting_algorithm(algorithm, array):
    # Set up the context and prepare the call to the specified
    # algorithm using the supplied array. Only import the
    # algorithm function if it's not the built-in `sorted()`.
    setup_code = f"from __main__ import {algorithm}" \
        if algorithm != "sorted" else ""

    stmt = f"{algorithm}({array})"

    # Execute the code ten different times and return the time
    # in seconds that each execution took
    times = repeat(setup=setup_code, stmt=stmt, repeat=3, number=10)

    # Finally, display the name of the algorithm and the
    # minimum time it took to run
    print(f"Algorithm: {algorithm}. Minimum execution time: {min(times)}")
```

In this example, `run_sorting_algorithm()` receives the name of the algorithm and the input array that needs to be sorted. Here’s a line-by-line explanation of how it works:

- **Line 8** imports the name of the algorithm using the magic of [**Python’s f-strings**](/realpython.com/python-f-strings.md). This is so that `timeit.repeat()` knows where to call the algorithm from. Note that this is only necessary for the custom implementations used in this tutorial. If the algorithm specified is the built-in `sorted()`, then nothing will be imported.
- **Line 11** prepares the call to the algorithm with the supplied array. This is the statement that will be executed and timed.
- **Line 15** calls `timeit.repeat()` with the setup code and the statement. This will call the specified sorting algorithm ten times, returning the number of seconds each one of these executions took.
- **Line 19** identifies the shortest time returned and prints it along with the name of the algorithm.

::: note

A common misconception is that you should find the average time of each run of the algorithm instead of selecting the single shortest time. Time measurements are [<VPIcon icon="fa-brands fa-wikipedia-w"/>noisy](https://en.wikipedia.org/wiki/Noisy_data) because the system runs other processes concurrently. The shortest time is always the least noisy, making it the best representation of the algorithm’s true runtime.

:::

Here’s an example of how to use `run_sorting_algorithm()` to determine the time it takes to sort an array of ten thousand integer values using `sorted()`:

```py{10}
ARRAY_LENGTH = 10000

if __name__ == "__main__":
    # Generate an array of `ARRAY_LENGTH` items consisting
    # of random integer values between 0 and 999
    array = [randint(0, 1000) for i in range(ARRAY_LENGTH)]

    # Call the function using the name of the sorting algorithm
    # and the array you just created
    run_sorting_algorithm(algorithm="sorted", array=array)
```

If you save the above code in a <VPIcon icon="fa-brands fa-python"/>`sorting.py` file, then you can run it from the [**terminal**](/realpython.com/terminal-commands.md) and see its output:

```sh
python sorting.py
#
# Algorithm: sorted. Minimum execution time: 0.010945824000000007
```

Remember that the time in seconds of every experiment depends in part on the hardware you use, so you’ll likely see slightly different results when running the code.

::: note

You can learn more about the `timeit` module in the [<VPIcon icon="fa-brands fa-python"/>official Python documentation](https://docs.python.org/2/library/timeit.html).

:::

---

## Measuring Efficiency With Big O Notation

The specific time an algorithm takes to run isn’t enough information to get the full picture of its [<VPIcon icon="fa-brands fa-wikipedia-w"/>time complexity](https://en.wikipedia.org/wiki/Time_complexity). To solve this problem, you can use Big O (pronounced “big oh”) notation. Big O is often used to compare different implementations and decide which one is the most efficient, skipping unnecessary details and focusing on what’s most important in the runtime of an algorithm.

The time in seconds required to run different algorithms can be influenced by several unrelated factors, including processor speed or available memory. Big O, on the other hand, provides a platform to express runtime complexity in hardware-agnostic terms. With Big O, you express complexity in terms of how quickly your algorithm’s runtime grows relative to the size of the input, especially as the input grows arbitrarily large.

Assuming that $n$ is the size of the input to an algorithm, the Big O notation represents the relationship between $n$ and the number of steps the algorithm takes to find a solution. Big O uses a capital letter “O” followed by this relationship inside parentheses. For example, $O\left(n\right)$ represents algorithms that execute a number of steps proportional to the size of their input.

Although this tutorial isn’t going to dive very deep into the details of Big O notation, here are five examples of the runtime complexity of different algorithms:

| Big O | Complexity | Description |
| --- | --- | --- |
| $O\left(1\right)$ | constant | The runtime is constant regardless of the size of the input. Finding an element in a [**hash table**](/realpython.com/python-hash-table.md) is an example of an operation that can be performed in **constant time**. |
| $O\left(n\right)$ | linear | The runtime grows linearly with the size of the input. A function that checks a condition on every item of a list is an example of an $O\left(n\right)$ algorithm. |
| $O\left(n^2\right)$ | quadratic | The runtime is a quadratic function of the size of the input. A naive implementation of finding duplicate values in a list, in which each item has to be checked twice, is an example of a quadratic algorithm. |
| $O\left(2^n\right)$ | exponential | The runtime grows exponentially with the size of the input. These algorithms are considered extremely inefficient. An example of an exponential algorithm is the [<VPIcon icon="fa-brands fa-wikipedia-w"/>three-coloring problem](https://en.wikipedia.org/wiki/Graph_coloring). |
| $O\left(\log_{}n\right)$ | logarithmic | The runtime grows linearly while the size of the input grows exponentially. For example, if it takes one second to process one thousand elements, then it will take two seconds to process ten thousand, three seconds to process one hundred thousand, and so on. [**Binary search**](/realpython.com/binary-search-python.md) is an example of a logarithmic runtime algorithm. |

This tutorial covers the Big O runtime complexity of each of the sorting algorithms discussed. It also includes a brief explanation of how to determine the runtime on each particular case. This will give you a better understanding of how to start using Big O to classify other algorithms.

::: note

For a deeper understanding of Big O, together with several practical examples in Python, check out [<VPIcon icon="fas fa-globe"/>Big O Notation and Algorithm Analysis with Python Examples](https://stackabuse.com/big-o-notation-and-algorithm-analysis-with-python-examples/).

:::
