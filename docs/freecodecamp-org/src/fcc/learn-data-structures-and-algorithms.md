---
lang: en-US
title: "Learn Data Structures and Algorithms - Introduction and Learning Resources"
description: "Article(s) > Learn Data Structures and Algorithms - Introduction and Learning Resources"
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
      content: "Article(s) > Learn Data Structures and Algorithms - Introduction and Learning Resources"
    - property: og:description
      content: "Learn Data Structures and Algorithms - Introduction and Learning Resources"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-data-structures-and-algorithms.html
prev: /programming/py/articles/README.md
date: 2023-02-03
isOriginal: false
author: Kolade Chris
cover: https://freecodecamp.org/news/content/images/2023/02/pexels-david-gallie-15128598.jpg
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
  name="Learn Data Structures and Algorithms - Introduction and Learning Resources"
  desc="Data structures and algorithms (DSA) are an important aspect of any programming language. Every language has its own data structures and its way of handling different types of algorithms. So, as a programmer, no matter what programming language you a..."
  url="https://freecodecamp.org/news/learn-data-structures-and-algorithms"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/02/pexels-david-gallie-15128598.jpg"/>

Data structures and algorithms (DSA) are an important aspect of any programming language. Every language has its own data structures and its way of handling different types of algorithms.

So, as a programmer, no matter what programming language you are working with, data structures and algorithms have to be an important aspect of your day-to-day programming. That’s because we always need them to solve complex problems.

And that’s why I put together this article - to show you what data structures and algorithms are, and to share some resources with you to help you learn them in various languages.

---

## What are Data Structures and Algorithms?

Data structures and algorithms go hand in hand. You may have a set of data arranged in a certain structure which you then pass into an algorithm to execute in a certain way.

But data structures and algorithms are not the same things. So let’s look at them separately.

### What is a Data Structure?

A data structure is a particular way data is arranged so it can be saved in memory and retrieved for later use.

If you want to read an in-depth guide to data structures in JavaScript, [check out this tutorial](/freecodecamp.org/data-structures-in-javascript-with-examples.md).

#### Examples of Data Structures

Data can be anything that can be saved. It could be primitive types like string, boolean, integer, or float. Or non-primitive types like arrays, linked list trees, stacks, and queues.

Below is an example of a linked list, stack, and queue in Python:

Here's the code for a linked list:

```py
# Linked list
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class My_linkedlist:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        last_node = self.head
        while last_node.next:
            last_node = last_node.next
        last_node.next = new_node

    def print_list(self):
        current_node = self.head
        while current_node:
            print(current_node.data)
            current_node = current_node.next

linked_list = My_linkedlist()
linked_list.append("List weekdays from the start:")
linked_list.append("Monday")
linked_list.append("Tuesday")
linked_list.append("Wednesday")
linked_list.append("Thursday")
linked_list.append("Friday")
linked_list.print_list()

"""
Output:
Weekdays:
Monday
Tuesday
Wednesday
Thursday
Friday
"""

print()
print()
```

You can read more about [linked lists in Python here](/freecodecamp.org/introduction-to-linked-lists-in-python.md).

Here's the code for a stack:

```py
# Stack
class My_stack:
    def __init__(self):
        self.stack = []

    def push(self, data):
        self.stack.append(data)

    def pop(self):
        return self.stack.pop()

    def is_empty(self):
        return len(self.stack) == 0

    def peek(self):
        return self.stack[-1]

stack = My_stack()
stack.push("Monday")
stack.push("Tuesday")
stack.push("Wednesday")
stack.push("Thursday")
stack.push("Friday")
stack.push("Pop Weekdays from the last:")
print(stack.pop())
print(stack.pop())
print(stack.pop())
print(stack.pop())
print(stack.pop())
print(stack.pop())

"""
Output:
Pop Weekdays from the last:
Friday
Thursday
Wednesday
Tuesday
Monday
"""

print()
print()
```

[Here's a video](/freecodecamp.org/stack-data-structure-solve-coding-challenges.md) about how to use the stack data structure to solve coding challenges.

And here's the code for a queue:

```py
# Queue
from collections import deque

class My_queue:
    def __init__(self):
        self.queue = deque()

    def enqueue(self, data):
        self.queue.append(data)

    def dequeue(self):
        return self.queue.popleft()

    def is_empty(self):
        return len(self.queue) == 0

    def peek(self):
        return self.queue[0]

queue = My_queue()
queue.enqueue("Queue weekdays:")
queue.enqueue("Monday")
queue.enqueue("Tuesday")
queue.enqueue("Wednesday")
queue.enqueue("Thursday")
queue.enqueue("Friday")
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())

"""
Output:
Queue weekdays:
Monday
Tuesday
Wednesday
Thursday
Friday
"""
```

And [here's an article](/freecodecamp.org/queue-data-structure-definition-and-java-example-code.md) about the queue data structure in Java if you want to read more.

The examples above are the common ones you can find in almost all available programming languages. Each programming language has its own way of implementing those data structures.

In the same vein, each programming language has its own data structures exclusive to it. For example, Python has unique data types like tuples, lists, and dictionaries:

Here's how you write a tuple in Python:

```py
# tuple in python
person_tuple = ("John Smith", 26, "Python Engineer")
```

Here's an example of a list:

```py
# list in python
fruits_list = ["apple", "orange", "Cashew", "Mango"]
```

Here's an article that [compares tuples and lists in Python](/freecodecamp.org/python-tuple-vs-list-what-is-the-difference.md) to help you understand how they work and what their main differences are.

And here's a dictionary:

```py
# dictionary in python
person = {"name": "John Doe", "age": 28, "occupation": "Software Developer"}
```

Here's a [guide to dictionaries in Python](/freecodecamp.org/python-dictionary-guide.md) - what they are and how to work with them.

And in JavaScript, we have sets, objects, and its own way of implementing arrays:

```js
// Set in JavaScript
const uniqueFruits = new Set(["Mango", "Cashew", "Strawberry", "Coconut", "Mango"]);

// Array in JavaScript
const sportsArray = ["Football", "Tennis", "Athletics", "Badminton"];

// Object in JavaScript
const player = { name: "Enzo Fernandez", age: 22, sport: "Footballer", club: "Chelsea", country: "Argentina" };
```

These are all examples of data structures that we can use to work with our data.

If you want to learn Data Structures from a Google engineer, [here's a course you might enjoy](/freecodecamp.org/learn-data-structures-from-a-google-enginee.md).

Now let's look at algorithms.

### What is an Algorithm?

In programming, an algorithm is a set of steps for solving a known problem. The problems solved by an algorithm could be sorting a set of data, searching through available data, or even encrypting data.

#### Types of Algorithms

There are a number of types of algorithms available today. There’s no particular way the types are characterized, but there are broad categories like [**sorting**](/freecodecamp.org/sorting-algorithms-explained-with-examples-in-python-java-and-c/) and [**searching**](/freecodecamp.org/search-algorithms-explained-with-examples-in-java-python-and-c.md) algorithms.

Examples of sorting algorithms are merge sort, bubble sort, selection sort, and others. And examples of searching algorithms are exponential search, binary search, jump search, and others.

There are other types of algorithms like hashing, greeting algorithms, brute force algorithms, and more.

Here’s an example of a bubble sort algorithm in Python:

```py
# Bubble sort in Python
def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(0, n-i-1):

            if arr[j] < arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

    return arr

arr = [10, 8, 9, 5, 7, 6, 3, 2, 1, 4]

print("Array in descending order:", bubble_sort(arr))
# Array in descending order: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

[Here's an article](/freecodecamp.org/bubble-sort-algorithm-in-java-cpp-python-with-example-code.md) with more examples if you want to read further.

And here’s an example of binary search algorithm in Python:

```py
def binary_search_demo(arr, x):
    low = 0
    high = len(arr) - 1
    mid = 0

    while low <= high:
        mid = (high + low) // 2

        if arr[mid] < x:
            low = mid + 1
        elif arr[mid] > x:
            high = mid - 1
        else:
            return mid
    return -1

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
x = 9

result = binary_search_demo(arr, x)

if result != -1:
    print("Element is present at index", result)
else:
    print("Element is not present in the array")

# Output: Element is present at index 8
```

Here's an [in-depth tutorial](/freecodecamp.org/binary-search-in-python-with-examples.md) about Binary Search in Python if you want to learn more.

---

## In Which Language Should I Write Algorithms?

You can write algorithms with any programming language out there. Each programming language has its way of implementing a particular algorithm.

At the end of the day, no matter which language you use, an algorithm is still an algorithm. For instance, you can implement a bubble sort algorithm or any other type of algorithm with any programming language.

But in some instances, choosing a language to write an algorithm depends on the exact programming language you’re using in your project.

If you’re developing a web solution and you’re already using PHP or Node JS, then you might have to write the algorithm you need in PHP or JavaScript.

---

## How to Learn Algorithms

The first step towards learning algorithms starts when you begin to learn a programming language.

At this point, the fundamentals are very important because there’s no way you can understand complex coding concepts without them.

If you’re learning web development, for example, you need to understand HTML, CSS, and the basics of JavaScript very well.

The next thing to do is to step beyond the basics and understand data structures very well. That’s because, on many occasions, you’ll be passing various data into an algorithm as the input.

You can then pick up the theoretical aspects of the algorithm. Those include what an algorithm is and the different types of algorithms.

After you understand the theory, the next thing is practicals. Learn how to implement various algorithms, then continue to practice until you understand them.

---

## Resources for Learning Algorithms

Here are several online video and text-based resources for learning algorithms:

If you’re just starting out with JavaScript, the freeCodeCamp’s [<FontIcon icon="fa-brands fa-free-code-camp"/>JavaScript Algorithms and Data Structures Certification](https://freecodecamp.org/learn/javascript-algorithms-and-data-structures) curriculum would make a great start.

Here are some videos from the freeCodeCamp YouTube channel that can help you learn algorithms:

- [Algorithms and Data Structures Tutorial - Full Course for Beginners](/freecodecamp.org/algorithms-and-data-structures-free-treehouse-course.md)
- [Intro to Algorithms in Python - Full Course for Beginners](/freecodecamp.org/intro-to-algorithms-with-python.md)
- [Learn Algorithms and Data Structures in Python - Full Course](/freecodecamp.org/learn-algorithms-and-data-structures-in-python.md)
- [Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer](/freecodecamp.org/learn-data-structures-from-a-google-engineer.md)
- [Data Structures Explained](/freecodecamp.org/learn-all-about-data-structures-used-in-computer-science.md)
- [Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges](/freecodecamp.org/learn-dynamic-programing-to-solve-coding-challenges.md)
- [Understanding Sorting Algorithms](/freecodecamp.org/understanding-sorting-algorithms.md)

---

## Conclusion

This article took you through:

- what data structures and algorithms are
- some types with examples of data structures and algorithms in Python and JavaScript
- the collective types of data structures in programming
- how to learn algorithms
- and resources for learning algorithms.

If you want to learn algorithms, you should look at the resources provided in this article. They are a good place to start learning algorithms in the languages they are available in.

Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Data Structures and Algorithms - Introduction and Learning Resources",
  "desc": "Data structures and algorithms (DSA) are an important aspect of any programming language. Every language has its own data structures and its way of handling different types of algorithms. So, as a programmer, no matter what programming language you a...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/learn-data-structures-and-algorithms.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
