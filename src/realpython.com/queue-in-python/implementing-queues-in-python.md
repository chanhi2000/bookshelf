---
lang: en-US
title: "Implementing Queues in Python"
description: "Article(s) > (2/7) Python Stacks, Queues, and Priority Queues in Practice"
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
      content: "Article(s) > (2/7) Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Implementing Queues in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/implementing-queues-in-python.html
date: 2022-06-29
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Stacks, Queues, and Priority Queues in Practice",
  "desc": "In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding.",
  "link": "/realpython.com/queue-in-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Stacks, Queues, and Priority Queues in Practice"
  desc="In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding."
  url="https://realpython.com/queue-in-python#implementing-queues-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>

First of all, should you implement a queue yourself in Python? In most cases, the answer to that question will be a decisive *no*. The language comes with batteries included, and queues are no exception. In fact, you’ll discover that Python has an abundance of queue implementations suited to solving various problems.

That being said, trying to build something from scratch can be an invaluable learning experience. You might also get asked to provide a queue implementation during a [**technical interview**](/realpython.com/python-coding-interview-tips.md). So, if you find this topic interesting, then please read on. Otherwise, if you only seek to [use queues in practice](#using-queues-in-practice), then feel free to skip this section entirely.

---

## Representing FIFO and LIFO Queues With a Deque

To represent a FIFO queue in the computer’s memory, you’ll need a [<FontIcon icon="fa-brands fa-python"/>sequence](https://docs.python.org/3/glossary.html#term-sequence) that has O(1), or constant time, performance for the enqueue operation on one end, and a similarly efficient dequeue operation on the other end. As you already know by now, a deque or double-ended queue satisfies those requirements. Plus, it’s universal enough to adapt for a LIFO queue as well.

However, because coding one would be out of scope of this tutorial, you’re going to leverage Python’s [`deque`](https://realpython.com/python-deque/) collection from the standard library.

**Note:** A deque is an abstract data type that you may implement in a few ways. Using a [doubly linked list](https://realpython.com/linked-lists-python/#how-to-use-doubly-linked-lists) as the underlying implementation will ensure that accessing and removing elements from both ends will have the desired O(1) time complexity. If your deque has a fixed size, then you can use a [circular buffer](https://en.wikipedia.org/wiki/Circular_buffer) instead, letting you access *any* element in constant time. Unlike a linked list, a circular buffer is a [random-access](https://en.wikipedia.org/wiki/Random_access) data structure.

Why not use a Python `list` instead of `collections.deque` as a building block for your FIFO queue?

Both sequences allow for enqueuing elements with their `.append()` methods rather cheaply, with a small reservation for lists, which will occasionally require copying all elements to a new memory location when their number exceeds a certain threshold.

Unfortunately, dequeuing an element from the front of a list with `list.pop(0)`, or equivalently inserting one with `list.insert(0, element)`, is far less efficient. Such operations always shift the remaining elements, resulting in a linear, or O(n), time complexity. In contrast, `deque.popleft()` and `deque.appendleft()` avoid that step altogether.

With that, you can proceed to define your custom `Queue` class based on Python’s `deque` collection.

---

## Building a Queue Data Type

Now that you’ve chosen a suitable queue representation, you can fire up your favorite [code editor](https://realpython.com/python-ides-code-editors-guide/), such as [Visual Studio Code](https://realpython.com/python-development-visual-studio-code/) or [PyCharm](https://realpython.com/pycharm-guide/), and create a new [Python module](https://realpython.com/python-modules-packages/) for the different queue implementations. You can call the file `queues.py` (plural form) to avoid a conflict with the similarly named `queue` (singular form) module already available in Python’s standard library.

**Note:** You’ll have a closer look at the built-in `queue` module in a later section devoted to [thread-safe queues](#using-thread-safe-queues) in Python.

Because you want your custom FIFO queue to support at least the enqueue and dequeue operations, go ahead and write a bare-bones `Queue` class that’ll delegate those two operations to `deque.append()` and `deque.popleft()` methods, respectively:

```py
# queues.py

from collections import deque

class Queue:
    def __init__(self):
        self._elements = deque()

    def enqueue(self, element):
        self._elements.append(element)

    def dequeue(self):
        return self._elements.popleft()
```

This class merely wraps a `collections.deque` instance and calls it `._elements`. The leading [underscore](https://realpython.com/python-double-underscore/) in the attribute’s name indicates an *internal* bit of implementation, which only the class should access and modify. Such fields are sometimes called private because they’re not supposed to be visible outside of the class body.

You can test your FIFO queue by importing it from the local module within an [interactive Python interpreter](https://realpython.com/interacting-with-python/) session:

```py
>>> from queues import Queue

>>> fifo = Queue()
>>> fifo.enqueue("1st")
>>> fifo.enqueue("2nd")
>>> fifo.enqueue("3rd")

>>> fifo.dequeue()
'1st'
>>> fifo.dequeue()
'2nd'
>>> fifo.dequeue()
'3rd'
```

As expected, the enqueued elements come back to you in their original order. If you want, you may improve your class by making it [iterable](https://docs.python.org/3/glossary.html#term-iterable) and able to report its length and optionally accept initial elements:

```py
# queues.py

from collections import deque

class Queue:
 def __init__(self, *elements): self._elements = deque(elements) 
 def __len__(self): return len(self._elements) 
 def __iter__(self): while len(self) > 0: yield self.dequeue() 
    def enqueue(self, element):
        self._elements.append(element)

    def dequeue(self):
        return self._elements.popleft()
```

A `deque` takes an optional iterable, which you can provide through a varying number of positional arguments, `*elements`, in your initializer method. By implementing the special `.__iter__()` method, you’ll make your class instances usable in a [`for` loop](https://realpython.com/python-for-loop/), while implementing `.__len__()` will make them compatible with the `len()` function. The `.__iter__()` method above is an example of a [generator iterator](https://docs.python.org/3/glossary.html#term-generator-iterator), which [yields](https://realpython.com/introduction-to-python-generators/) elements [lazily](https://en.wikipedia.org/wiki/Lazy_evaluation).

**Note:** The implementation of `.__iter__()` causes your custom queue to reduce its size by dequeuing elements from itself as you iterate over it.

Restart the Python interpreter and import your class again to see the updated code in action:

```py
>>> from queues import Queue

>>> fifo = Queue("1st", "2nd", "3rd")
>>> len(fifo)
3

>>> for element in fifo:
...     print(element)
...
1st
2nd
3rd

>>> len(fifo)
0
```

The queue has three elements initially, but its length drops to zero after consuming all elements in a loop. Next up, you’ll implement a stack data type that’ll dequeue elements in reverse order.

---

## Building a Stack Data Type

Building a [stack](https://realpython.com/how-to-implement-python-stack/) data type is considerably more straightforward because you’ve already done the bulk of the hard work. Since most of the implementation will remain the same, you can extend your `Queue` class using [inheritance](https://realpython.com/inheritance-composition-python/) and override the `.dequeue()` method to remove elements from the top of the stack:

```py
# queues.py

# ...

class Stack(Queue):
    def dequeue(self):
        return self._elements.pop()
```

That’s it! Elements are now popped from the same end of the queue that you pushed them through before. You can quickly verify this in an interactive Python session:

```py
>>> from queues import Stack

>>> lifo = Stack("1st", "2nd", "3rd")
>>> for element in lifo:
...     print(element)
...
3rd
2nd
1st
```

With an identical setup and test data as before, the elements return to you in reverse order, which is the expected behavior of a LIFO queue.

**Note:** In this tutorial, you use inheritance as a convenient mechanism to reuse code. However, the current class relationship isn’t semantically correct, because a stack isn’t a subtype of a queue. You could just as well define the stack first and let the queue extend it. In the real world, you should probably make both classes inherit from an [abstract base class](https://docs.python.org/3/glossary.html#term-abstract-base-class) because they share the same interface.

In one-off scripts, you could probably get away with using a plain old Python `list` as a rudimentary stack when you don’t mind the extra overhead of having to copy the values from time to time:

```py
>>> lifo = []

>>> lifo.append("1st")
>>> lifo.append("2nd")
>>> lifo.append("3rd")

>>> lifo.pop()
'3rd'
>>> lifo.pop()
'2nd'
>>> lifo.pop()
'1st'
```

Python lists are iterable out of the box. They can report their length and have a sensible textual representation. In the next section, you’ll choose them as the foundation for a priority queue.

---

## Representing Priority Queues With a Heap

The last queue that you’ll implement in this tutorial will be a priority queue. Unlike a stack, the priority queue can’t extend the `Queue` class defined earlier, because it doesn’t belong to the same type hierarchy. The order of elements in a FIFO or LIFO queue is determined solely by the elements’ time of arrival. In a priority queue, it’s an element’s priority and the insertion order that together determine the ultimate position within the queue.

There are many ways to implement a priority queue, such as:

- An **unordered list** of elements and their priorities, which you search through every time before dequeuing the element with the highest priority
- An **ordered list** of elements and their priorities, which you sort every time you enqueue a new element
- An **ordered list** of elements and their priorities, which you keep sorted by finding the right spot for a new element using [binary search](https://realpython.com/binary-search-python/)
- A **binary tree** that maintains the heap [invariant](https://en.wikipedia.org/wiki/Invariant_(mathematics)#Invariants_in_computer_science) after the enqueue and dequeue operations

You can think of a priority queue as a list that needs to be sorted every time a new element arrives so that you’ll be able to remove the last one with the highest priority when performing the dequeue operation. Alternatively, you could ignore the element order until removing one with the highest priority, which you could find using the [linear search](https://realpython.com/binary-search-python/#linear-search) algorithm.

Looking up an element in an unordered list has O(n) time complexity. Sorting the entire queue would be even more expensive, especially when exercised often. Python’s `list.sort()` method employs an algorithm called [Timsort](https://en.wikipedia.org/wiki/Timsort), which has O(n log(n)) worst-case time complexity. Inserting an element with [`bisect.insort()`](https://realpython.com/binary-search-python/#using-the-bisect-module) is slightly better because it can take advantage of an already sorted list, but the gain is offset by the slow insertion that follows.

Fortunately, you can be smart about keeping the elements sorted in a priority queue by using a **heap data structure** under the hood. It provides a more efficient implementation than those listed earlier. Here’s a table with a quick comparison of the time complexity for the enqueue and dequeue operations provided by those different implementations:

| Implementation | Enqueue | Dequeue |
| --- | --- | --- |
| Find Max on Dequeue | O(1) | O(n) |
| Sort on Enqueue | O(n log(n)) | O(1) |
| Bisect and Insert on Enqueue | O(n) | O(1) |
| Push onto a Heap on Enqueue | O(log(n)) | O(log(n)) |

The heap has the best overall performance for large data volumes. Although using the [bisection method](https://en.wikipedia.org/wiki/Bisection_method) to find the right spot for a new element is O(log(n)), the actual insertion of that element is O(n), making it less desirable than a heap.

Python has the `heapq` module, which conveniently provides a few functions that can turn a regular list into a heap and manipulate it efficiently. The two functions that’ll help you build a priority queue are:

1. `heapq.heappush()`
2. `heapq.heappop()`

When you push a new element onto a non-empty heap, it’ll end up in the right spot, maintaining the heap invariant. Note that this doesn’t necessarily mean that the resulting elements will become sorted:

```py
>>> from heapq import heappush

>>> fruits = []
>>> heappush(fruits, "orange")
>>> heappush(fruits, "apple")
>>> heappush(fruits, "banana")

>>> fruits
['apple', 'orange', 'banana']
```

Fruit names in the resulting heap in the example above don’t follow alphabetical order. If you pushed them in a different order, though, they could!

The point of a heap isn’t so much about sorting elements but rather keeping them in a certain relationship to allow for quick lookup. What really matters is that the first element on a heap always has the smallest (**min-heap**) or the highest (**max-heap**) value, depending on how you define the condition for the mentioned relationship. Python’s heaps are min-heaps, which means that the first element has the *smallest* value.

When you pop an element from a heap, you’ll always get the first one, while the remaining elements might shuffle a little bit:

```py
>>> from heapq import heappop

>>> heappop(fruits)
'apple'

>>> fruits
['banana', 'orange']
```

Notice how the *banana* and *orange* swapped places to ensure the first element continues to be the smallest. When you tell Python to compare two string objects by value, it starts looking at their characters pairwise from left to right and checks each pair one by one. The character with a lower [Unicode](https://realpython.com/python-encodings-guide/) code point is considered smaller, which resolves the word order.

Now, how do you throw priorities into the mix? The heap compares elements by *value* rather than by their priority, after all. To work around this, you can leverage Python’s **tuple comparison**, which takes into account the tuple’s components, looking from left to right until the outcome is known:

```py
>>> person1 = ("John", "Brown", 42)
>>> person2 = ("John", "Doe", 42)
>>> person3 = ("John", "Doe", 24)

>>> person1 < person2
True
>>> person2 < person3
False
```

Here, you have three tuples representing different people. Each has a first name, last name, and age. Python determines that `person1` should go before `person2` based on their last names since they share the same first name, but Python doesn’t look at their ages because the ordering is already known. The age becomes important in the second comparison between `person2` and `person3`, who happen to have the same first and last names.

You can enforce a prioritized order on the heap by storing tuples whose first element is a priority. However, there will be a few fine details that you need to be careful about. You’ll learn more about them in the next section.

---

## Building a Priority Queue Data Type

Imagine you were building software for an automotive company. Modern vehicles are practically computers on wheels, which leverage a [controller area network (CAN) bus](https://en.wikipedia.org/wiki/CAN_bus) to broadcast messages about various events going on in your car, such as unlocking the doors or inflating an airbag. Clearly, some of those events are more important than others and should be prioritized accordingly.

**Fun Fact:** You can download a mobile app for your smartphone, such as [Torque](https://wiki.torque-bhp.com/view/Main_Page), that’ll let you connect to the CAN bus of your car over Bluetooth or an ad hoc WiFi network through a small [scanner device](https://realpython.com/asins/B08B5Q1W4Y/) hooked up to your car’s [on-board diagnostics (OBD)](https://en.wikipedia.org/wiki/On-board_diagnostics) port.

This setup will allow you to monitor your vehicle’s parameters in real time, even if they’re not exposed on the dashboard! This includes things like coolant temperature, battery voltage, miles per gallon, and emissions. Moreover, you’ll be able to check if your car’s [ECUs](https://en.wikipedia.org/wiki/Electronic_control_unit) report any fault codes.

It’s okay to miss a faulty headlight message or wait a little longer for the audio volume level to go down. However, when you press the brake pedal, you expect it to have an immediate effect because it’s a safety-critical subsystem. Each message has a priority in the CAN bus protocol, which tells the intermediate units whether they should relay the message further or disregard it completely.

Even though this is an oversimplification of the problem, you can think of the CAN bus as a priority queue that sorts the messages according to their importance. Now, return to your code editor and define the following class in the Python module that you created before:

```py
# queues.py

from collections import deque
from heapq import heappop, heappush 
# ...

class PriorityQueue:
    def __init__(self):
        self._elements = []

    def enqueue_with_priority(self, priority, value):
        heappush(self._elements, (priority, value))

    def dequeue(self):
        return heappop(self._elements)
```

It’s a basic priority queue implementation, which defines a heap of elements using a Python list and two methods that manipulate it. The `.enqueue_with_priority()` method takes two arguments, a priority and a corresponding value, which it then wraps in a tuple and pushes onto the heap using the `heapq` module. Notice that the priority comes before the value to take advantage of how Python compares tuples.

Unfortunately, there are a few problems with the above implementation that become apparent when you try to use it:

```py
>>> from queues import PriorityQueue

>>> CRITICAL = 3
>>> IMPORTANT = 2
>>> NEUTRAL = 1

>>> messages = PriorityQueue()
>>> messages.enqueue_with_priority(IMPORTANT, "Windshield wipers turned on")
>>> messages.enqueue_with_priority(NEUTRAL, "Radio station tuned in")
>>> messages.enqueue_with_priority(CRITICAL, "Brake pedal depressed")
>>> messages.enqueue_with_priority(IMPORTANT, "Hazard lights turned on")

>>> messages.dequeue()
(1, 'Radio station tuned in')
```

You defined three priority levels: critical, important, and neutral. Next, you instantiated a priority queue and used it to enqueue a few messages with those priorities. However, instead of dequeuing the message with the highest priority, you got a tuple corresponding to the message with the *lowest* priority.

**Note:** Ultimately, it’s up to you how you want to define the order of your priorities. In this tutorial, a lower priority corresponds to a lower numeric value, while a higher priority has a greater value.

That said, it can be more convenient to reverse this order in some cases. For example, in Dijkstra’s shortest path algorithm, you’ll want to prioritize paths with a smaller total cost over those with a high cost. To handle such a situation, you’ll implement another class later.

Because Python’s heap is a min-heap, its first element always has the lowest value. To fix this, you can flip the sign of a priority when pushing a tuple onto the heap, making the priority a **negative number** so that the highest one becomes the lowest:

```py
# queues.py

# ...

class PriorityQueue:
    def __init__(self):
        self._elements = []

    def enqueue_with_priority(self, priority, value):
 heappush(self._elements, (-priority, value)) 
    def dequeue(self):
 return heappop(self._elements)[1]
```

With this small change, you’ll push critical messages ahead of important and neutral ones. Additionally, when performing a dequeue operation, you’ll unpack the value from the tuple by accessing its second component, located at index one using the square bracket (`[]`) syntax.

Now, if you head back to your interactive Python interpreter, import the updated code, and enqueue the same messages once again, then they’ll come back to you in a more sensible order:

```py
>>> messages.dequeue()
'Brake pedal depressed'

>>> messages.dequeue()
'Hazard lights turned on'

>>> messages.dequeue()
'Windshield wipers turned on'

>>> messages.dequeue()
'Radio station tuned in'
```

You get the critical message first, followed by the two important ones, and then the neutral message. So far, so good, right? However, there are two problems with your implementation. One of them you can already see in the output, while the other will only manifest itself under specific circumstances. Can you spot these problems?

---

## Handling Corner Cases in Your Priority Queue

Your queue can correctly order elements by priority, but at the same time, it violates **sort stability** when comparing elements with equal priorities. This means that in the example above, flashing the hazard lights takes precedence over engaging the windshield wipers, even though this ordering doesn’t follow the chronology of events. Both messages have the same priority, important, so the queue should sort them by their insertion order.

To be clear, this is a direct consequence of tuple comparison in Python, which moves to the next component in a tuple if the earlier ones didn’t resolve the comparison. So, if two messages have equal priorities, then Python will compare them by value, which would be a string in your example. Strings follow the [lexicographic order](https://en.wikipedia.org/wiki/Lexicographic_order), in which the word *Hazard* comes before the word *Windshield*, hence the inconsistent order.

There’s another problem related to that, which would completely break the **tuple comparison** in rare cases. Specifically, it’d fail if you tried to enqueue an element that doesn’t support any [comparison operators](https://realpython.com/python-operators-expressions/#comparison-operators), such as an instance of a custom class, and the queue already contained at least one element with the same priority that you wanted to use. Consider the following [data class](https://realpython.com/python-data-classes/) to represent messages in your queue:

```py
>>> from dataclasses import dataclass

>>> @dataclass
... class Message:
...     event: str
...

>>> wipers = Message("Windshield wipers turned on")
>>> hazard_lights = Message("Hazard lights turned on")

>>> wipers < hazard_lights
Traceback (most recent call last):
 ...
TypeError: '<' not supported between instances of 'Message' and 'Message'
```

`Message` objects might be more convenient to work with than plain strings, but unlike strings, they aren’t comparable unless you tell Python how to perform the [comparison](https://realpython.com/python-data-classes/#comparing-cards). As you can see, custom class instances don’t provide the implementation for the less than (`<`) operator by default.

As long as you enqueue messages with different priorities, Python won’t compare them by value:

```py
>>> messages = PriorityQueue()
>>> messages.enqueue_with_priority(CRITICAL, wipers)
>>> messages.enqueue_with_priority(IMPORTANT, hazard_lights)
```

For example, when you enqueue a critical message and an important message, Python determines their order unambiguously by looking at the corresponding priorities. However, as soon as you try enqueuing another critical message, you’ll get a familiar error:

```py
>>> messages.enqueue_with_priority(CRITICAL, Message("ABS engaged"))
Traceback (most recent call last):
 ...
TypeError: '<' not supported between instances of 'Message' and 'Message'
```

This time around, the comparison fails because two of the messages are of equal priority and Python falls back to comparing them by value, which you haven’t defined for your custom `Message` class instances.

You can solve both problems—that is, the sort instability and the broken tuple comparison—by introducing another component to the elements stored on the heap. This extra component should be comparable and represent the **time of arrival**. When placed between the element’s priority and value in a tuple, it’ll resolve the order if two elements have the same priority, regardless of their values.

The most straightforward way of representing the arrival time in a priority queue is perhaps a [monotonically increasing](https://en.wikipedia.org/wiki/Monotonic_function) counter. In other words, you want to count the number of enqueue operations performed without considering the potential dequeue operations that might be taking place. Then, you’ll store the current value of the counter in every enqueued element to reflect the state of your queue at that instant.

You can use the `count()` iterator from the [`itertools`](https://realpython.com/python-itertools/) module to count from zero to infinity in a concise way:

```py
# queues.py

from collections import deque
from heapq import heappop, heappush
from itertools import count 
# ...

class PriorityQueue:
    def __init__(self):
        self._elements = []
 self._counter = count() 
    def enqueue_with_priority(self, priority, value):
 element = (-priority, next(self._counter), value) heappush(self._elements, element) 
    def dequeue(self):
 return heappop(self._elements)[-1]
```

The counter gets initialized when you create a new `PriorityQueue` instance. Whenever you enqueue a value, the counter increments and retains its current state in a tuple pushed onto the heap. So, if you enqueue another value with the same priority later, then the earlier one will take precedence because you enqueued it with a smaller counter.

The last tiny detail to keep in mind after introducing this extra counter component into the tuple is updating the popped value index during a dequeue operation. Because elements are tuples with three components now, you ought to return the value located at index two instead of one. However, it’d be safer to use the negative one as an index to indicate the *last* component of the tuple, regardless of its length.

Your priority queue is almost ready, but it’s missing the two [special methods](https://realpython.com/python-classes/#special-methods-and-protocols), `.__len__()` and `.__iter__()`, which you implemented in the other two queue classes. While you can’t reuse their code through inheritance, as the priority queue is *not* a subtype of the FIFO queue, Python provides a powerful mechanism that lets you work around that issue.

---

## Refactoring the Code Using a Mixin Class

To reuse code across unrelated classes, you can identify their least common denominator and then extract that code into a [mixin class](https://realpython.com/inheritance-composition-python/#mixing-features-with-mixin-classes). A mixin class is like a spice. It can’t stand on its own, so you wouldn’t typically instantiate it, but it can add that extra flavor once you mix it into another class. Here’s how it would work in practice:

```py
# queues.py

# ...

class IterableMixin:
 def __len__(self): return len(self._elements)   def __iter__(self): while len(self) > 0: yield self.dequeue() 
class Queue(IterableMixin):
    # ...

class Stack(Queue):
    # ...

class PriorityQueue(IterableMixin):
    # ...
```

You moved the `.__len__()` and `.__iter__()` methods from the `Queue` class to a separate `IterableMixin` class and made the former extend that mixin. You also made the `PriorityQueue` inherit from the same mixin class. How is this different from the standard inheritance?

Unlike programming languages like [Scala](https://scala-lang.org/) that support mixins directly with [traits](https://en.wikipedia.org/wiki/Trait_(computer_programming)), Python uses [multiple inheritance](https://realpython.com/inheritance-composition-python/#inheriting-multiple-classes) to implement the same concept. However, extending a mixin class is semantically different from extending a regular class, which is no longer a form of **type specialization**. To emphasize this difference, some people call it the **inclusion** of a mixin class rather than pure inheritance.

Notice that your mixin class refers to an `._elements` attribute, which you haven’t defined yet! It’s provided by the concrete classes, such as `Queue` and `PriorityQueue`, that you throw into the mix much later. Mixins are great for encapsulating **behavior** rather than state, much like [default methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) in [Java](https://realpython.com/java-vs-python/) interfaces. By composing a class with one or more mixins, you can change or augment its original behavior.

Expand the collapsible section below to reveal the complete source code:

Complete Source Code for the QueuesShow/Hide

```py
# queues.py

from collections import deque
from heapq import heappop, heappush
from itertools import count

class IterableMixin:
    def __len__(self):
        return len(self._elements)

    def __iter__(self):
        while len(self) > 0:
            yield self.dequeue()

class Queue(IterableMixin):
    def __init__(self, *elements):
        self._elements = deque(elements)

    def enqueue(self, element):
        self._elements.append(element)

    def dequeue(self):
        return self._elements.popleft()

class Stack(Queue):
    def dequeue(self):
        return self._elements.pop()

class PriorityQueue(IterableMixin):
    def __init__(self):
        self._elements = []
        self._counter = count()

    def enqueue_with_priority(self, priority, value):
        element = (-priority, next(self._counter), value)
        heappush(self._elements, element)

    def dequeue(self):
        return heappop(self._elements)[-1]
```

With the three queue classes in place, you can finally apply them to solving a real problem!
