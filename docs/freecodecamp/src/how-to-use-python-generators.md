---
lang: en-US
title: How to Use Python Generators - Explained With Code Examples
description: Article(s) > How to Use Python Generators - Explained With Code Examples
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
      content: Article(s) > How to Use Python Generators - Explained With Code Examples
    - property: og:description`
      content: How to Use Python Generators - Explained With Code Examples
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-python-generators.html
prev: /programming/py/articles/README.md
date: 2024-07-11
isOriginal: false
author:
  - name: Rochdi Khalid
    url: https://freecodecamp.org/news/author/rochdikhalid/
cover: https://freecodecamp.org/news/content/images/2024/07/SERIE-1.png
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
  name="How to Use Python Generators – Explained With Code Examples"
  desc="Python generators are a powerful feature that allow lazy iteration through a sequence of values. They produce items one at a time and only when needed, which makes them the best choice for working with large datasets or streams of data where it would..."
  url="https://freecodecamp.org/news/how-to-use-python-generators"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/SERIE-1.png"/>

Python generators are a powerful feature that allow lazy iteration through a sequence of values.

They produce items one at a time and only when needed, which makes them the best choice for working with large datasets or streams of data where it would be inefficient and impractical to load everything into memory at once.

---

## How to Define and Use Generators

To define a generator, you can use the `def` keyword like you would with a normal function. However, instead of returning a value with `return`, we use `yield`.

Here, the `yield` keyword is used to produce a value and pause the execution of the generator function. When the function is resumed, it continues execution immediately after the `yield` statement.

### Example: Simple Generator

Here is a simple generator that yields the first `n` numbers:

```py
def simple_generator(n):
    i = 0
    while i < n:
        yield i
        i += 1

# Using the generator
gen = simple_generator(5)
for number in gen:
    print(number)
#
# 0
# 1
# 2
# 3
# 4
```

When the `simple_generator()` function is called, it doesn't execute its code. Instead, it returns a generator object that contains an internal method named `__next__()`, which is created when the generator function is called.

The generator object implicitly uses this method as an iterator protocol when we iterate over the generator.

---

## Benefits of Using Generators

Python generators offer several advantages that significantly enhance code efficiency and readability. By efficiently producing items on-the-fly, generators optimize memory usage and enhance performance compared to traditional iterable methods.

Let's explore some these benefits in detail, highlighting how generators streamline Python development and improve code quality.

### Memory Optimization

Compared to lists that load all elements into memory at once, generators are memory usage optimizers. They produce items one at a time and only when required.

Here is an example that considers a scenario where we need to generate a large list of numbers:

```py
# Using a list
numbers = [i for i in range(1000000)]

# Using a generator
def number_generator():
    for i in range(1000000):
        yield i

gen_numbers = number_generator()
```

With the list, all 1000000 numbers are stored in memory at once, but with the generator, numbers are produced one at a time, reducing memory usage.

### Enhanced Performance

Since generators produce items on-the-fly, they enhance performance, particularly in terms of speed and efficiency. They can start yielding results immediately without waiting to process an entire dataset.

In this example, let's assume that we need to process each number in a sequence:

```py
# Using a list
numbers = [i for i in range(1000000)]
squared_numbers = [x**2 for x in numbers]

# Using a generator
def number_generator():
    for i in range(1000000):
        yield i

def squared_gen(gen):
    for num in gen:
        yield num**2

gen_numbers = number_generator()
squared_gen_numbers = squared_gen(gen_numbers)
```

When we use the list, we generated all the numbers and then process them, which takes more time. However, with the generator, each number is processed as soon as it is generated, making the process more efficient.

### Code Simplicity and Readability

Generators help in writing clean and readable code. They allow us to define an iterative algorithm in a simple way, without the need for boilerplate code to manage the state of the iteration. Let's consider a scenario where we need to read lines from a large file:

```py
# Using a list
def read_large_file(file_name):
    with open(file_name, 'r') as file:
        lines = file.readlines()
    return lines

lines = read_large_file('large_file.txt')

# Using a generator
def read_large_file(file_name):
    with open(file_name, 'r') as file:
        for line in file:
            yield line

lines_gen = read_large_file('large_file.txt')
```

With the list approach, we read all lines into memory at once. With the generator, we read and yielded one line at a time, which makes the code simpler and more readable while contributing to saving memory.

---

## Practical Use Cases

This section explores some practical use cases where Python generators excel, discovering how generators simplify complex tasks while optimizing performance and memory usage.

### Stream Processing

Generators are excellent at handling continuous streams of data, like real-time sensor data, log streams, or live feeds from APIs. They provide efficient processing of data as it becomes available, without the need to store large amounts of data in memory.

```py
import time

def data_stream():
    """Simulate a data stream."""
    for i in range(10):
        time.sleep(1) # Simulate data arriving every second
        yield 1


def stream_processor(data_stream):
    """Process data from the stream."""
    for data in data_stream:
        processed_data = data * 2 # Example processing step
        yield processed_data


# Usage
stream = data_stream()
processed_stream = stream_processor(stream)
for data in processed_stream:
    print(data)
```

In this example, the `data_stream()` method generates data at intervals, simulating a continuous data stream. The `stream_processor()` processes each piece of data as it arrives, demonstrating how generators can handle streaming data efficiently without the need to load all data into memory at once.

### Iterative Algorithms

Generators provide a straightforward way to define and execute iterative algorithms that involve repetitive calculations and simulations. They allow us to maintain the state of the iteration without manually managing loop variables, which can enhance code clarity and maintainability.

```py
def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


# Usage
fib_gen = fibonacci_generator()
for i in range(10):
    print(next(fib_gen))
```

In the example above, the `fibonacci_generator()` method defines a generator that produces Fibonacci numbers indefinitely. It returns each Fibonacci number one at a time, starting from 0 and 1. Here, the `for` loop iterates 10 times to print the first 10 Fibonacci numbers, demonstrating how generators can efficiently generate and manage sequences without preloading them into memory.

### Real-Time Simulator

In this example, we will simulate real-time updates of a stock price. The generator will produce a new stock price at each step, based on the previous price and some random fluctuation.

```py
import random
import time

def stock_price_generator(initial_price, volatility, steps):
    """Generates stock prices starting from initial_price with given volatility."""

    price = initial_price
    for _ in range(steps):
        # Simulate price change
        change_percent = random.uniform(-volatility, volatility)
        price += price * change_percent
        yield price
        time.sleep(1) # Simulate real-time delay

# Create the stock price generator
initial_price = 100.0 # Starting stock price
volatility = 0.02 # Volatility as a percentage
steps = 10 # Number of steps (updates) to simulate

stock_prices = stock_price_generator(initial_price, volatility, steps)

# Simulate recieving and processing real-time stock prices
for price in stock_prices:
    print(f"New stock price: {price:.2f}")
```

This example generates each stock price on-the-fly based on the previous price and doesn't store all generated prices in memory, making it efficient for long-running simulations.

The generator provides a new stock price at each step with minimal computation. The `time.sleep(1)` simulates a real-time delay, allowing the system to handle other tasks concurrently if needed.

---

## Summary

In summary, Python generators offer efficient memory management and enhanced performance, simplifying code while tackling diverse tasks like stream processing, iterative algorithms, and real-time simulation.

Their ability to optimize resources makes them a valuable tool for modern Python developers seeking elegant and scalable solutions.

Hopefully, this exploration of Python generators provides you with the insights needed to leverage their full potential. If you have any questions or want to discuss further, feel free to reach out to me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`rochdi-khalid`)](https://linkedin.com/in/rochdi-khalid/). Additionally, you can subscribe to [my YouTube channel (<VPIcon icon="fa-brands fa-youtube"/>`codasteroid4580`)](https://youtube.com/@codasteroid4580) where I share videos on coding techniques and projects I'm working on.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Python Generators – Explained With Code Examples",
  "desc": "Python generators are a powerful feature that allow lazy iteration through a sequence of values. They produce items one at a time and only when needed, which makes them the best choice for working with large datasets or streams of data where it would...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-python-generators.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
