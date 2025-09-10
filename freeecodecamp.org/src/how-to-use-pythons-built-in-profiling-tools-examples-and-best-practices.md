---
lang: en-US
title: "How to Use Python's Built-in Profiling Tools: Examples and Best Practices"
description: "Article(s) > How to Use Python's Built-in Profiling Tools: Examples and Best Practices"
icon: fa-brands fa-python
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
      content: "Article(s) > How to Use Python's Built-in Profiling Tools: Examples and Best Practices"
    - property: og:description
      content: "How to Use Python's Built-in Profiling Tools: Examples and Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-pythons-built-in-profiling-tools-examples-and-best-practices.html
prev: /programming/py/articles/README.md
date: 2025-03-26
isOriginal: false
author:
  - name: Vivek Sahu
    url : https://freecodecamp.org/news/author/viv1/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742917060232/7ea623ac-4c4d-4bb9-9edf-f9041a8bc9ae.png
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
  name="How to Use Python's Built-in Profiling Tools: Examples and Best Practices"
  desc="Python is known for its simplicity and readability, making it a favorite among developers. But this simplicity sometimes comes at the cost of performance. When your Python application grows or needs to handle larger workloads, understanding what's ha..."
  url="https://freecodecamp.org/news/how-to-use-pythons-built-in-profiling-tools-examples-and-best-practices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742917060232/7ea623ac-4c4d-4bb9-9edf-f9041a8bc9ae.png"/>

`Python` is known for its simplicity and readability, making it a favorite among developers. But this simplicity sometimes comes at the cost of performance. When your Python application grows or needs to handle larger workloads, understanding what's happening under the hood becomes crucial.

While many developers reach for third-party profiling tools, Python's standard library already comes packed with powerful profiling capabilities that are often overlooked or underutilized.

In this article, you'll learn how to use these built-in profiling tools beyond their basic usage. You'll discover how to combine and leverage them to gain deep insights into your code's performance without installing additional packages.

::: note Prerequisites

Before diving into the profiling techniques, make sure you have:

1. **Python 3.6+**: All examples in this article are compatible with Python 3.6 and newer versions.
2. **Basic Python Knowledge**: You should be comfortable with Python fundamentals like functions, modules, and basic data structures.
3. **A Test Environment**: Either a local Python environment or a virtual environment where you can run the code examples.

:::

No external libraries are required for this tutorial as we'll be focusing exclusively on Python's built-in profiling tools. You can verify your Python version this way:

```py
# Verify your Python version
import sys
print(f"Python version: {sys.version}")
```

---

## The Built-in Profiling Arsenal

Python ships with several profiling tools in its standard library. Let's explore each one and understand their various strengths.

### The `timeit` Module

Most Python developers are familiar with the basic `timeit` usage:

```py
import timeit

# Basic usage
execution_time = timeit.timeit('"-".join(str(n) for n in range(100))', number=1000)
print(f"Execution time: {execution_time} seconds")

# Sample output:
# Execution time: 0.006027 seconds
```

This basic example measures how long it takes to join 100 numbers into a string with hyphens. The `number=1000` parameter tells Python to run this operation 1,000 times and return the total execution time, which helps average out any random fluctuations.

However, `timeit` offers much more flexibility than most developers realize. Let's explore some powerful ways to use it:

::: tip Setup Code Separation

```py
setup_code = """
data = [i for i in range(1000)]
"""

test_code = """
result = [x * 2 for x in data]
"""

execution_time = timeit.timeit(stmt=test_code, setup=setup_code, number=100)
print(f"Execution time: {execution_time} seconds")

# Sample output:
# Execution time: 0.001420 seconds
```

In this example, we separate the setup code from the code being timed. This is extremely useful when:

- You need to create test data but don't want that time included in your measurement
- You're timing a function that relies on imports or variable definitions
- You want to reuse the same setup for multiple timing tests

The advantage is that only the code in `test_code` is timed, while the setup runs just once before the timing begins.

:::

::: tip Comparing Functions

```py
def approach_1(data):
    return [x * 2 for x in data]

def approach_2(data):
    return list(map(lambda x: x * 2, data))

data = list(range(1000))

time1 = timeit.timeit(lambda: approach_1(data), number=100)
time2 = timeit.timeit(lambda: approach_2(data), number=100)

print(f"Approach 1: {time1} seconds")
print(f"Approach 2: {time2} seconds")
print(f"Ratio: {time2/time1:.2f}x")

# Sample output:
# Approach 1: 0.001406 seconds
# Approach 2: 0.003049 seconds
# Ratio: 2.17x
```

This example demonstrates how to compare two different implementations of the same functionality. Here we're comparing:

1. A list comprehension approach
2. A `map()` with lambda approach

By using lambda functions, we can pass existing data to our functions when timing them. This directly measures real-world scenarios where your functions are working with existing data. The ratio calculation makes it easy to understand exactly how much faster one approach is than the other.

In this case, we can see the list comprehension is about 2.17 times faster than the map approach for this specific operation.

:::

### The `cProfile` Module

`cProfile` is Python's C-based profiler that provides detailed statistics about function calls. Many developers use it with its default settings:

```py
import cProfile

def my_function():
    total = 0
    for i in range(100000):  # Reduced for faster execution
        total += i
    return total

cProfile.run('my_function()')

# Sample output:
#          4 function calls in 0.002 seconds
#
#    Ordered by: standard name
#
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.000    0.000    0.002    0.002 <string>:1(<module>)
#         1    0.002    0.002    0.002    0.002 <stdin>:1(my_function)
#         1    0.000    0.000    0.002    0.002 {built-in method builtins.exec}
#         1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

This basic example runs the profiler on a simple function that sums the numbers from 0 to 99,999. The output provides several key pieces of information:

- `ncalls`: How many times each function was called
- `tottime`: The total time spent in the function (excluding time in subfunctions)
- `percall`: Time per call (`tottime` divided by `ncalls`)
- `cumtime`: Cumulative time spent in this function and all subfunctions
- `filename:lineno(function)`: Where the function is defined

This gives you a comprehensive view of where time is being spent in your code, but there's much more you can do with `cProfile`.

The real power comes from advanced usage techniques:

::: tip Sorting Results

```py
import cProfile
import pstats

# Profile the function
profiler = cProfile.Profile()
profiler.enable()
my_function()
profiler.disable()

# Create stats object
stats = pstats.Stats(profiler)

# Sort by different metrics
stats.sort_stats('cumulative').print_stats(10)  # Top 10 functions by cumulative time
stats.sort_stats('calls').print_stats(10)       # Top 10 functions by call count
stats.sort_stats('time').print_stats(10)        # Top 10 functions by time

# Sample output for cumulative sorting:
#          2 function calls in 0.002 seconds
#
#    Ordered by: cumulative time
#
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.002    0.002    0.002    0.002 <stdin>:1(my_function)
#         1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

This example demonstrates how to control the profiling process and sort the results in different ways. The advantages are:

1. You can enable/disable profiling around specific sections of code
2. You can sort results by different metrics to identify different types of bottlenecks:
    - `cumulative`: Find functions that consume the most time overall (including subfunctions)
    - `calls`: Find functions called most frequently
    - `time`: Find functions with the highest self-time (excluding subfunctions)
3. Limit output to only the top N results with `print_stats(N)`

This flexibility lets you focus on specific performance aspects of your code.

:::

::: tip Filtering Results

```py
stats.strip_dirs().print_stats()  # Remove directory paths for cleaner output
stats.print_stats('my_module')   # Only show results from my_module

# Sample output with strip_dirs():
#          2 function calls in 0.002 seconds
#
#    Random listing order was used
#
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.002    0.002    0.002    0.002 <stdin>:1(my_function)
#         1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

These filtering techniques are invaluable when working with larger applications:

- `strip_dirs()` removes directory paths, making the output much more readable
- `print_stats('my_module')` filters results to only show functions from a specific module, letting you focus on your code rather than library code

This is particularly useful when profiling large applications where the full output might include hundreds or thousands of function calls.

:::

### The `pstats` Module

The `pstats` module is often overlooked but provides powerful ways to analyze profiling data:

::: tip Saving and Loading Profile Data:

```py
import cProfile
import pstats

# Save profile data to a file
cProfile.run('my_function()', 'my_profile.stats')

# Load and analyze later
stats = pstats.Stats('my_profile.stats')
stats.strip_dirs().sort_stats('cumulative').print_stats(10)

# Sample output:
# Wed Mar 20 14:30:00 2024    my_profile.stats
#
#          4 function calls in 0.002 seconds
#
#    Ordered by: cumulative time
#
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.000    0.000    0.002    0.002 {built-in method builtins.exec}
#         1    0.000    0.000    0.002    0.002 <string>:1(<module>)
#         1    0.002    0.002    0.002    0.002 <stdin>:1(my_function)
#         1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

This example shows how to save profiling data to a file and load it later for analysis. The key advantages are:

1. You can collect profiling data in one session or environment and analyze it in another
2. You can share profiling data with team members without them needing to run the code
3. You can save profiling data from production environments where interactive analysis might not be possible
4. You can compare different runs over time to track performance improvements

This approach separates data collection from analysis, making it more flexible for real-world applications.

:::

::: tip Combining Multiple Profiles:

```py
stats = pstats.Stats('profile1.stats')
stats.add('profile2.stats')
stats.add('profile3.stats')
stats.sort_stats('time').print_stats()

# This allows you to combine results from multiple profiling runs,
# useful for aggregating data from different test cases or scenarios
```

This powerful feature lets you combine results from multiple profiling runs. This is useful for:

1. Comparing performance across different inputs
2. Aggregating data from multiple test scenarios
3. Combining data from different parts of your application
4. Building a more comprehensive performance picture across multiple runs

By combining stats from multiple runs, you can identify patterns that might not be apparent from a single profiling session.

:::

### The `profile` Module

The `profile` module is a pure Python implementation of the profiler interface. While it's slower than `cProfile`, it can be more flexible for specific cases:

```py
import profile

def my_function():
    total = 0
    for i in range(100000):  # Using 100000 for faster execution
        total += i
    return total

profile.run('my_function()')

# Sample output:
#          5 function calls in 0.011 seconds
#
#    Ordered by: standard name
#
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.000    0.000    0.002    0.002 :0(exec)
#         1    0.009    0.009    0.009    0.009 :0(setprofile)
#         1    0.000    0.000    0.002    0.002 <string>:1(<module>)
#         1    0.000    0.000    0.011    0.011 profile:0(my_function())
#         0    0.000             0.000          profile:0(profiler)
#         1    0.002    0.002    0.002    0.002 <stdin>:1(my_function)
```

The `profile` module works similarly to `cProfile` but offers advantages in specific scenarios:

1. It's implemented in pure Python, making it easier to modify if you need custom profiling behavior
2. You can subclass and extend it to implement custom profiling logic
3. It allows more fine-grained control over the profiling process
4. It's useful for profiling in environments where the C extension might not be available

While it's slower than `cProfile` (because it's implemented in Python rather than C), its flexibility makes it valuable for specialized profiling needs.

The `profile` module follows the same API as `cProfile`, so you can use all the same techniques for analyzing results.

---

## Practical Experiments

Let's put these tools to practical use with some experiments.

### Setup

First, create a simple Python module with various functions to profile:

```py :collapsed-lines title="profiling_example.py"
import time
import random

def process_data(data):
    result = []
    for item in data:
        result.append(process_item(item))
    return result

def process_item(item):
    # Simulate processing time
    time.sleep(0.0001)  # Small delay for demonstration purposes
    return item * 2

def generate_data(size):
    return [random.randint(1, 100) for _ in range(size)]

def process_data_optimized(data):
    return [process_item(item) for item in data]

def main():
    data = generate_data(50)
    result1 = process_data(data)
    result2 = process_data_optimized(data)
    assert result1 == result2
    return result1

if __name__ == "__main__":
    main()
```

### Experiment 1: Basic vs Advanced** `timeit` Usage

Let's compare different ways of timing our functions:

```py :collapsed-lines
import timeit
from profiling_example import generate_data, process_data, process_data_optimized

# Method 1: Basic string evaluation (limited but simple)
setup1 = """
from profiling_example import generate_data, process_data
data = generate_data(5)  # Using a small size for demonstration
"""
basic_time = timeit.timeit('process_data(data)', setup=setup1, number=5)
print(f"Basic timing: {basic_time:.4f} seconds")

# Method 2: Using lambda for better control
data = generate_data(5)
advanced_time = timeit.timeit(lambda: process_data(data), number=5)
print(f"Advanced timing: {advanced_time:.4f} seconds")

# Method 3: Comparing implementations
data = generate_data(5)
original_time = timeit.timeit(lambda: process_data(data), number=5)
optimized_time = timeit.timeit(lambda: process_data_optimized(data), number=5)
print(f"Original implementation: {original_time:.4f} seconds")
print(f"Optimized implementation: {optimized_time:.4f} seconds")
print(f"Improvement ratio: {original_time/optimized_time:.2f}x")

# Sample output:
# Basic timing: 0.0032 seconds
# Advanced timing: 0.0034 seconds
# Original implementation: 0.0033 seconds
# Optimized implementation: 0.0034 seconds
# Improvement ratio: 0.98x
```

This experiment demonstrates three different approaches to timing code with the `timeit` module:

**Method 1: Basic string evaluation** - This approach evaluates a string of code after running the setup code. The advantages include:

- Simple syntax for basic timing needs
- Setup code runs only once, not during each timing run
- Good for timing simple expressions

**Method 2: Lambda functions** - This more advanced approach uses lambda functions to call our functions directly. Benefits include:

- Direct access to functions and variables in the current scope
- No need to import functions in setup code
- Better for timing functions that take arguments
- More intuitive for complex timing scenarios

**Method 3: Implementation comparison** - This practical approach compares two different implementations of the same functionality. This is valuable when:

- Deciding between alternative implementations
- Measuring the impact of optimizations
- Quantifying performance differences with a ratio

In this example, the list comprehension isn't significantly faster because the dominant cost is the `time.sleep()` call in both implementations. In real-world cases with actual computation instead of sleep, the difference is often more pronounced.

### Experiment 2: Effective `cProfile` Analysis

Now let's use `cProfile` to identify bottlenecks:

```py :collapsed-lines
import cProfile
import pstats
import io
from profiling_example import main

# Method 1: Basic profiling
cProfile.run('main()')

# Sample output snippet:
#         679 function calls in 0.014 seconds
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#      100    0.000    0.000    0.014    0.000 profiling_example.py:10(process_item)
#      100    0.014    0.000    0.014    0.000 {built-in method time.sleep}
#        1    0.000    0.000    0.007    0.007 profiling_example.py:4(process_data)
#        1    0.000    0.000    0.007    0.007 profiling_example.py:18(process_data_optimized)

# Method 2: Capturing and analyzing results
profiler = cProfile.Profile()
profiler.enable()
main()
profiler.disable()

# Redirect output to string for analysis
s = io.StringIO()
stats = pstats.Stats(profiler, stream=s).sort_stats('cumulative')
stats.print_stats(10)  # Print top 10 functions by cumulative time
print(s.getvalue())

# Method 3: Focus on specific functions
s = io.StringIO()
stats = pstats.Stats(profiler, stream=s).sort_stats('cumulative')
stats.print_callers('process_item')  # Show what's calling this function
print(s.getvalue())

# Sample output for the callers analysis:
# Function was called by...
#       ncalls  tottime  cumtime
# profiling_example.py:10(process_item)  <-  
#     50    0.000    0.007  profiling_example.py:4(process_data)
#     50    0.000    0.007  profiling_example.py:18(process_data_optimized)
```

This experiment demonstrates three powerful `cProfile` techniques for identifying bottlenecks:

**Method 1: Basic profiling** - Using `cProfile.run()` to profile a function call provides an immediate overview of performance. This technique:

- Gives you a quick snapshot of all function calls
- Shows precisely where time is being spent
- Is easy to use with minimal setup
- Identifies the most time-consuming operations

In our example, we can immediately see that `time.sleep()` is consuming most of the execution time.

**Method 2: Programmatic profiling and analysis** - This approach gives you more control:

- You can enable/disable profiling for specific sections of code
- You can save the results to a variable for further analysis
- You can customize how results are sorted and displayed
- You can redirect output to a string or file for post-processing

This method is particularly useful for profiling specific parts of a larger application.

**Method 3: Caller analysis** - The `print_callers()` method is extremely valuable because it:

- Shows which functions are calling your bottleneck functions
- Helps identify which code paths are contributing to performance issues
- Reveals how many times each caller invokes a particular function
- Provides context that's crucial for understanding performance patterns

In our example, we can see that both `process_data` and `process_data_optimized` are calling `process_item` 50 times each, confirming they're contributing equally to the bottleneck.

This immediate shows us that `process_item` is the bottleneck, specifically the `time.sleep()` call inside it, and it's being called equally by both implementations.

### Experiment 3: Combining Tools for Real-world Profiling

In real-world scenarios, combining profiling tools gives the most complete picture:

```py :collapsed-lines
import cProfile
import pstats
import timeit
from profiling_example import main, process_data, process_data_optimized, generate_data

# First, use timeit to get baseline performance of main components
data = generate_data(50)
time_process = timeit.timeit(lambda: process_data(data), number=3)
time_process_opt = timeit.timeit(lambda: process_data_optimized(data), number=3)
print(f"Process data: {time_process:.4f}s")
print(f"Process data optimized: {time_process_opt:.4f}s")

# Sample output:
# Process data: 0.0196s
# Process data optimized: 0.0194s

# Then, use cProfile for deeper insights
profiler = cProfile.Profile()
profiler.enable()
main()
profiler.disable()

# Save stats for later analysis
profiler.dump_stats('profile_results.stats')

# Load and analyze
stats = pstats.Stats('profile_results.stats')
stats.strip_dirs().sort_stats('cumulative').print_stats(10)

# Sample output:
# Wed Mar 20 14:30:00 2024    profile_results.stats
#          659 function calls in 0.013 seconds
#    Ordered by: cumulative time
#    ncalls  tottime  percall  cumtime  percall filename:lineno(function)
#         1    0.000    0.000    0.013    0.013 profiling_example.py:21(main)
#       100    0.000    0.000    0.013    0.000 profiling_example.py:10(process_item)
#       100    0.013    0.000    0.013    0.000 {built-in method time.sleep}
```

This experiment demonstrates a comprehensive real-world profiling strategy that combines multiple tools:

**First step: High-level timing with** `timeit` - We start with `timeit` to:

- Get baseline performance metrics for specific functions
- Compare different implementations directly
- Measure overall execution time
- Identify which high-level components might need optimization

This gives us a quick overview that both implementations take about the same time, confirming our earlier findings.

**Second step: Detailed profiling with** `cProfile` - Next, we use `cProfile` to:

- Get a function-by-function breakdown of execution time
- Identify specific bottlenecks at a granular level
- See the number of calls to each function
- Understand the call hierarchy

**Third step: Saving and analyzing with** `pstats` - Finally, we:

- Save profiling data to a file for persistence
- Load the data and apply filtering/sorting
- Focus on the most time-consuming functions
- Get a clean, readable output

This multi-tool approach provides several advantages:

1. You get both high-level and detailed insights
2. You can save profiling data for later comparison
3. You can share results with team members
4. You can track performance changes over time

In our example, we confirm that our main bottleneck is the `time.sleep()` call inside `process_item`, which accounts for most of the execution time. Without this combined approach, we might have missed important details or wasted time optimizing the wrong parts of our code.

This approach gives you both high-level timing information and detailed profiling data, allowing for a comprehensive performance analysis.

---

## Best Practices

Based on our experiments, here are some best practices for effective profiling:

### 1. Start with the right tool for the job

- Use `timeit` for quick, targeted measurements of specific functions or code blocks
- Use `cProfile` for comprehensive program analysis when you need to understand how all parts of your code interact
- Use `pstats` for in-depth analysis of profiling data when you need to filter, sort, and interpret complex profiling results

For example, if you're just trying to decide between two implementations of a sorting algorithm, `timeit` is sufficient. But if you're trying to understand why your entire web application is slow, start with `cProfile`.

### 2. Profile realistic workloads

- Synthetic benchmarks often mislead because they don't reflect real-world usage patterns
- Use production-like data sizes to see how your code scales with realistic inputs
- Run multiple iterations to account for variance and ensure your results are reliable

A function that's fast with 10 items might be painfully slow with 10,000. Always test with data sizes that match your production needs.

### 3. Focus on the right metrics

- `cumulative` time shows the total time spent in a function and all its calls. It’s useful for finding the overall most expensive operations.
- `tottime` shows time spent only in the function itself. It’s useful for finding inefficient implementations.
- `ncalls` helps identify functions called excessively. It’s useful for finding redundant operations.

For example, a function with a small `tottime` but large `cumulative` time might be efficient itself but is calling expensive subfunctions.

### 4. Save profiling data for comparison

- Use `profiler.dump_stats()` to save data from different versions of your code
- Compare before and after optimization to quantify improvements
- Track performance over time to catch regressions early

This practice helps you prove that your optimizations are actually working and prevents performance from degrading over time.

### 5. Look for the 80/20 rule

- 80% of time is often spent in 20% of the code. Focus optimization efforts on these "hot spots"
- Focus optimization efforts on the functions with the highest cumulative time.
- Don't optimize what isn't slow - premature optimization wastes time and can make code more complex.

For example, in our experiments, the `time.sleep()` call was the clear bottleneck. Optimizing anything else would be pointless until that's addressed.

By following these practices, you'll make the most efficient use of your profiling tools and focus your optimization efforts where they'll have the greatest impact.

---

## Conclusion

Python's built-in profiling tools offer a powerful arsenal for identifying and resolving performance bottlenecks in your code. By leveraging the `timeit`, `cProfile`, and `pstats` modules effectively, you can get deep insights into your application's performance without relying on third-party tools.

Each tool serves a specific purpose:

- `timeit` helps you measure execution time of specific code snippets
- `cProfile` gives you a comprehensive view of function calls and execution time
- `pstats` lets you analyze, filter, and interpret profiling data
- `profile` provides a customizable profiling interface for special cases

The greatest power comes from combining these tools, as we demonstrated in our practical experiments. This allows you to approach performance optimization systematically:

1. Identify high-level performance concerns with `timeit`
2. Drill down into specific bottlenecks with `cProfile`
3. Analyze and interpret results with `pstats`
4. Make targeted optimizations based on data, not guesswork

Remember that profiling is as much an art as it is a science. The goal isn't just to make code faster, but to understand why it's slow in the first place. With the techniques demonstrated in this article, you're well-equipped to tackle performance challenges in your Python applications.

Apply these profiling techniques to your own code, and you'll be surprised at what you discover. Often, the bottlenecks aren't where you expect them to be!

---

::: info References and Further Reading

<SiteInfo
  name="timeit — Measure execution time of small code snippets"
  desc="Source code: Lib/timeit.py This module provides a simple way to time small bits of Python code. It has both a Command-Line Interface as well as a callable one. It avoids a number of common traps fo..."
  url="https://docs.python.org/3/library/timeit.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

<SiteInfo
  name="The Python Profilers"
  desc="Source code: Lib/profile.py and Lib/pstats.py Introduction to the profilers: cProfile and profile provide deterministic profiling of Python programs. A profile is a set of statistics that describes..."
  url="https://docs.python.org/3/library/profile.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

<SiteInfo
  name="The Python Profilers > The Stats Class"
  desc="Source code: Lib/profile.py and Lib/pstats.py Introduction to the profilers: cProfile and profile provide deterministic profiling of Python programs. A profile is a set of statistics that describes..."
  url="https://docs.python.org/3/library/profile.html#pstats.Stats"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

```component VPCard
{
  "title": "PythonSpeed/PerformanceTips - Python Wiki",
  "desc": "This page is devoted to various tips and tricks that help improve the performance of your Python programs. Wherever the information comes from someone else, I've tried to identify the source.",
  "link": "https://wiki.python.org/moin/PythonSpeed/PerformanceTips/",
  "logo": "https://wiki.python.org/favicon.ico",
  "background": "rgba(247,246,246,0.2)"
}
```

<SiteInfo
  name="The Python Profilers > profile and cProfile Module Reference"
  desc="Source code: Lib/profile.py and Lib/pstats.py Introduction to the profilers: cProfile and profile provide deterministic profiling of Python programs. A profile is a set of statistics that describes..."
  url="https://docs.python.org/3/library/profile.html#module-cProfile"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

```component VPCard
{
  "title": "Practical Experiments for Optimizing Django query with the power of SQL joins",
  "desc": "Here we experiment with a couple of query optimization techniques for Django.",
  "link": "https://wewake.dev/posts/practical-experiments-for-django-orm-query-optimizations/",
  "logo": "https://wewake.dev/assets/img/favicons/favicon.ico",
  "background": "rgba(241,248,254,0.2)"
}
```

```component VPCard
{
  "title": "How Python Magic Methods Work: A Practical Guide",
  "desc": "Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe...",
  "link": "/freecodecamp.org/python-magic-methods-practical-guide.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Python's Built-in Profiling Tools: Examples and Best Practices",
  "desc": "Python is known for its simplicity and readability, making it a favorite among developers. But this simplicity sometimes comes at the cost of performance. When your Python application grows or needs to handle larger workloads, understanding what's ha...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-pythons-built-in-profiling-tools-examples-and-best-practices.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
