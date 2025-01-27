---
lang: en-US
title: "Learning About the Types of Queues"
description: "Article(s) > (1/7) Python Stacks, Queues, and Priority Queues in Practice"
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
      content: "Article(s) > (1/7) Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Learning About the Types of Queues"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/learning-about-the-types-of-queues.html
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
  url="https://realpython.com/queue-in-python#learning-about-the-types-of-queues"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>

A queue is an [<FontIcon icon="fa-brands fa-wikipedia-w"/>abstract data type](https://en.wikipedia.org/wiki/Abstract_data_type) that represents a **sequence** of elements arranged according to a set of rules. In this section, you’ll learn about the most common types of queues and their corresponding element arrangement rules. At the very least, every queue provides operations for adding and removing elements in [<FontIcon icon="fa-brands fa-wikipedia-w"/>constant time](https://en.wikipedia.org/wiki/Time_complexity#Constant_time) or O(1) using the [**Big O**](/realpython.com/binary-search-python.md#the-big-o-notation) notation. That means both operations should be instantaneous regardless of the queue’s size.

Some queues may support other, more specific operations. It’s time to learn more about them!

---

## Queue: First-In, First-Out (FIFO)

The word *queue* can have different meanings depending on the context. However, when people refer to a queue without using any qualifiers, they usually mean a [<FontIcon icon="fa-brands fa-wikipedia-w"/>FIFO queue](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)), which resembles a line that you might find at a grocery checkout or tourist attraction:

![Tourists Queuing Up to Enter the American Museum of Natural History in New York](https://files.realpython.com/media/IMG_3976.aaccf0e9a1fb.jpg)

Note that unlike the line in the photo, where people are clustering side by side, a queue in a strict sense will be single file, with people admitted one at a time.

FIFO is short for **first-in, first-out**, which describes the flow of elements through the queue. Elements in such a queue will be processed on a [<FontIcon icon="fas fa-globe"/>first-come, first-served](https://merriam-webster.com/dictionary/first%20come%2C%20first%20served) basis, which is how most real-life queues work. To better visualize the element movement in a FIFO queue, have a look at the following animation:

<VidStack src="vimeo/723390369" />
<!-- Unbounded FIFO Queue -->

Notice that, at any given time, a new element is only allowed to join the queue on one end called the **tail**—which is on the right in this example—while the oldest element must leave the queue from the opposite end. When an element leaves the queue, then all of its followers shift by exactly one position towards the **head** of the queue. These few rules ensure that elements are processed in the order of their arrival.

::: note

You can think of elements in a FIFO queue as cars stopping at a traffic light.

:::

Adding an element to the FIFO queue is commonly referred to as an **enqueue** operation, while retrieving one from it is known as a **dequeue** operation. Don’t confuse a *dequeue* operation with the [deque (double-ended queue)](#deque-double-ended-queue) data type that you’ll learn about later!

Enqueuing and dequeuing are two independent operations that may be taking place at different speeds. This fact makes FIFO queues the perfect tool for **buffering data** in streaming scenarios and for **scheduling tasks** that need to wait until some [<FontIcon icon="fa-brands fa-wikipedia-w"/>shared resource](https://en.wikipedia.org/wiki/Shared_resource) becomes available. For example, a web server flooded with HTTP requests might place them in a queue instead of immediately rejecting them with an error.

::: note

In programs that leverage [**concurrency**](/realpython.com/python-concurrency.md), a FIFO queue often becomes the shared resource itself to facilitate two-way communication between asynchronous workers. By temporarily locking the read or write access to its elements, a **blocking queue** can elegantly coordinate a pool of producers and a pool of consumers. You’ll find more information about this use case in later sections about queues in [multithreading](/realpython.com/queue-in-python/using-thread-safe-queues.md) and [multiprocessing](/realpython.com/queue-in-python/using-multiprocessingqueue-for-interprocess-communication-ipc.md).

:::

Another point worth noting about the queue depicted above is that it can grow without bounds as new elements arrive. Picture a checkout line stretching to the back of the store during a busy shopping season! In some situations, however, you might prefer to work with a **bounded queue** that has a fixed capacity known up front. A bounded queue can help to keep scarce resources under control in two ways:

1. By irreversibly rejecting elements that don’t fit
2. By overwriting the oldest element in the queue

Under the first strategy, once a FIFO queue becomes saturated, it won’t take any more elements until others leave the queue to make some space. You can see an animated example of how this works below:

<VidStack src="vimeo/723396777" />
<!-- Bounded FIFO Queue (Bounce) -->

This queue has a capacity of three, meaning it can hold at most three elements. If you try to stuff more elements into it, then they’ll bounce off into oblivion without leaving any trace behind. At the same time, as soon as the number of elements occupying the queue decreases, the queue will start accepting new elements again.

Where would you find such a bounded FIFO queue in the wild?

Most digital cameras support the [<FontIcon icon="fa-brands fa-wikipedia-w"/>burst mode](https://en.wikipedia.org/wiki/Burst_mode_(photography)) for continuously shooting a series of pictures as rapidly as possible in the hope of capturing at least one sharp photo of a moving object. Because saving data onto a memory card is the bottleneck, there’s usually an **internal buffer** that enables the camera to keep taking new pictures while earlier ones are being compressed and saved.

In older still cameras, the buffer was usually quite small and would fill up within a few seconds. When that happened, holding the shutter button down would no longer have any effect, or the pace of snapping new pictures would reduce noticeably. The camera’s maximum speed would fully recover only after draining the data buffer.

The second strategy for dealing with incoming elements in a bounded FIFO queue lets you implement a basic **cache** that forgets the oldest element without considering how many times or how frequently you’ve accessed it. A FIFO cache works best when newer elements are more likely to be reused than older ones. For example, you can use the FIFO cache eviction strategy to forcefully log out users who logged in a long time ago regardless if they’re still active.

::: note

For a brief comparison of other cache eviction strategies, head over to [**Caching in Python Using the LRU Cache Strategy**](/realpython.com/lru-cache-python.md).

:::

Here’s a visual depiction of a bounded FIFO queue that can hold up to three elements but, unlike before, won’t prevent you from adding more elements:

Bounded FIFO Queue (Overwrite)

When this queue reaches its maximum capacity, then adding a new element will first shift all existing elements by one position towards the head, discarding the oldest element and making room for the new one. Notice that the discarded element gets overwritten by its immediate neighbor.

While the unbounded FIFO queue and its two bounded counterparts cover a wide range of use cases, they all share one common feature—that is, having separate entry and exit points. In the next section, you’ll learn about yet another popular type of queue, which has a slightly different layout.

---

## Stack: Last-In, First-Out (LIFO)

A stack is a more specialized queue, also known as a LIFO or **last-in, first-out** queue. It works almost exactly like a regular queue, except that elements must now join and leave it through only one end called the **top** of the stack. The name *top* reflects the fact that real-world stacks tend to be vertical. A pile of plates in the kitchen sink is an example of a stack:

![A Pile of Dirty Dishes Left in an Office Kitchen Sink](https://files.realpython.com/media/stack.475e76056033.jpg)

When the dishwasher is full, employees will **push** their dirty plates on the top of the stack after having a meal. Once there are no more clean plates in the cabinet, a hungry employee will have to **pop** the last dirty plate from the top of the stack and clean it with a sponge before microwaving their lunch.

If there’s a much-needed fork at the bottom of the stack, then some poor soul will have to dig through all of the plates above, one by one, to get to the desired utensil. Similarly, when the cleaning personnel comes to the office at the end of a business day, they’ll have to go through the plates in [**reverse order**](/realpython.com/python-reverse-list.md) before getting to the last one at the bottom of the stack.

You’ll see this element movement in the following animated stack:

<VidStack src="vimeo/723398613" />

Even though the LIFO queue above is oriented horizontally, it preserves the general idea of a stack. New elements grow the stack by joining it only on the right end, as in the previous examples. This time, however, only the last element pushed onto the stack can leave it. The rest must wait until there are no more elements that have joined the stack later.

Stacks are widely used in computing for various purposes. Perhaps the most familiar context for a programmer is the [<FontIcon icon="fa-brands fa-wikipedia-w"/>call stack](https://en.wikipedia.org/wiki/Call_stack) containing the functions in the order they were called. Python will reveal this stack to you through a [**traceback**](/realpython.com/python-traceback.md) in case of an unhandled [**exception**](/realpython.com/python-exceptions.md). It’s usually a **bounded stack** with a limited capacity, which you’ll find out about during a [<FontIcon icon="fa-brands fa-wikipedia-w"/>stack overflow error](https://en.wikipedia.org/wiki/Stack_buffer_overflow) caused by too many [**recursive**](/realpython.com/python-recursion.md) calls.

In compiled languages with static type checking, local variables are [<FontIcon icon="fa-brands fa-wikipedia-w"/>allocated on the stack](https://en.wikipedia.org/wiki/Stack-based_memory_allocation), which is a fast memory region. Stacks can help detect unmatched brackets in a code block or evaluate arithmetic expressions represented in [<FontIcon icon="fa-brands fa-wikipedia-w"/>reverse Polish notation (RPN)](https://en.wikipedia.org/wiki/Reverse_Polish_notation). You can also use stacks to solve the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) puzzle or keep track of the visited nodes in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>graph](https://en.wikipedia.org/wiki/Graph_(abstract_data_type)) or a [<FontIcon icon="fa-brands fa-wikipedia-w"/>tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) traversed with the [<FontIcon icon="fa-brands fa-wikipedia-w"/>depth-first search (DFS)](https://en.wikipedia.org/wiki/Depth-first_search) algorithm.

::: note

When you replace the stack, or LIFO queue, with a FIFO queue in the DFS algorithm and make a few minor tweaks, then you’ll get the [<FontIcon icon="fa-brands fa-wikipedia-w"/>breadth-first search (BFS)](https://en.wikipedia.org/wiki/Breadth-first_search) algorithm almost for free! You’ll explore both algorithms in more detail later in this tutorial.

:::

While a stack is a specialization of a queue, the deque or double-ended queue is a generalization that you can use as a basis to implement both FIFO and LIFO queues. You’ll see how deques work and where you can use them in the next section.

---

## Deque: Double-Ended Queue

A [<FontIcon icon="fa-brands fa-wikipedia-w"/>double-ended queue](https://en.wikipedia.org/wiki/Double-ended_queue) or **deque** (pronounced *deck*) is a more generic data type that combines and extends the ideas behind the stack and the queue. It allows you to enqueue or dequeue elements from both ends in constant time at any given moment. Therefore, a deque can work as a FIFO or a LIFO queue, as well as anything in between and beyond.

Using the same example of a line of people as before, you can take advantage of a deque to model more sophisticated corner cases. In real life, the last person in the queue might get impatient and decide to leave the queue early or join another queue at a new checkout that has just opened. Conversely, someone who has booked a visit online for a particular date and time in advance may be allowed to join the queue at the front without waiting.

Below is an animation that shows an **unbounded deque** in action:

<VidStack src="vimeo/723399870" />
<!-- Unbounded Double-Ended Queue -->

In this particular example, most elements generally follow one direction by joining the queue on the **right** and leaving it on the **left**, just like in a plain FIFO queue. However, some privileged elements are allowed to join the queue from the left end, while the last element can leave the queue through the opposite end.

Adding an element to a **bounded deque** that has already reached its full capacity will overwrite the element currently located at the opposite end. That feature might be handy for isolating the first few or the last few elements from a sequence. You may also want to stop anywhere in that sequence and then move to the left or right in smaller steps:

<VidStack src="vimeo/723401029" />
<!-- Bounded Double-Ended Queue -->

Suppose you were calculating the [<FontIcon icon="fa-brands fa-wikipedia-w"/>moving average](https://en.wikipedia.org/wiki/Moving_average) of pixel intensities in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>scan line](https://en.wikipedia.org/wiki/Scan_line) of a raster image. Moving left or right would give you a preview of the few consecutive pixel values and dynamically calculate their average. This is more or less how [**convolution kernels**](/realpython.com/image-processing-with-the-python-pillow-library.md#image-filters-using-convolution-kernels) work for applying filters in advanced image processing.

Most deques support two additional operations called **rotate left** and **rotate right**, which shift the elements a specified number of places in one or the other direction in a circular fashion. Because the deque’s size remains unchanged, elements that would stick out get wrapped around at the ends, as in an [<FontIcon icon="fas fa-globe"/>analog car odometer](https://upload.wikimedia.org/wikipedia/commons/5/53/Odometer_rollover.jpg):

<VidStack src="vimeo/723405800" />
<!-- Rotation of a Double-Ended Queue -->

When rotated right, the last element in the deque becomes first. On the other hand, when rotated left, the first element becomes the last one. Perhaps you could imagine this process more easily by arranging the deque’s elements in a circle so that both ends meet. Then, rotating right and left would correspond to a clockwise and counterclockwise rotation, respectively.

Rotations, combined with the deque’s core capabilities, open up interesting possibilities. For example, you could use a deque to implement a [<FontIcon icon="fa-brands fa-wikipedia-w"/>load balancer](https://en.wikipedia.org/wiki/Load_balancing_(computing)) or a task scheduler working in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>round-robin](https://en.wikipedia.org/wiki/Round-robin_scheduling) fashion. In a [<FontIcon icon="fas fa-globe"/>GUI application](https://realpython.com/learning-paths/python-gui-programming/), you could use a deque to store **recently opened files**, allow a user to **undo and redo** their actions, or let the user navigate back and forth through their **web browsing history**.

As you can see, deques find many practical uses, especially in tracking the most recent activity. However, some problems will require you to take advantage of yet another type of queue, which you’ll read about next.

---

## Priority Queue: Sorted From High to Low

A **priority queue** is different from those you’ve seen so far because it can’t store ordinary elements. Instead, each element must now have an associated priority to compare against other elements. The queue will maintain a **sorted order**, letting new elements join where necessary while shuffling the existing elements around if needed. When two elements are of equal priority, they’ll follow their insertion order.

::: note

Make sure to choose a data type for your priorities whose values are *comparable* through the [**comparison operators**](/realpython.com/python-operators-expressions.md#comparison-operators), such as less than (`<`). For example, integers and timestamps would be fine, while [**complex numbers**](/realpython.com/python-complex-numbers.md) wouldn’t work for indicating priority because they don’t implement any relevant comparison operator.

:::

This kind of queue works in a way that’s analogous to priority boarding on a plane:

![Passenger Boarding Bridges Hooked Up to an Airbus A380 at Frankfurt Airport](https://files.realpython.com/media/airbus.90ede7e8a131.jpg)

Regular passengers will join the queue at the very end unless they’re accompanied by small children, have disabilities, or have earned loyalty points, in which case they’ll be fast-tracked to the front of the line. Business-class travelers usually enjoy the luxury of a separate, much smaller queue, but even they sometimes have to let the first-class travelers pass.

The animation below illustrates a sample flow of elements having three distinct priorities through an **unbounded priority queue**:

<VidStack src="vimeo/723407699" />
<!-- Unbounded Priority Queue -->

Blue squares represent the lowest priority, yellow triangles are higher in the hierarchy, and red circles are the most important. A new element gets inserted between one with a higher or equal priority and another one with a lower priority. This rule resembles the [**insertion sort**](/realpython.com/sorting-algorithms-python/the-insertion-sort-algorithm-in-python.md) algorithm, which happens to be [<FontIcon icon="fa-brands fa-wikipedia-w"/>stable](https://en.wikipedia.org/wiki/Sorting_algorithm#Stability), as elements with the same priority never swap their initial places.

You could use the priority queue to **sort a sequence** of elements by a given key or get the **top few elements**. However, that would be overkill because there are far more efficient [**sorting algorithms**](/realpython.com/sorting-algorithms-python/README.md) available. The priority queue is better suited for situations when elements can come and go dynamically. One such situation would be searching for the **shortest path** in a weighted graph using [Dijkstra’s algorithm](#dijkstras-algorithm-using-a-priority-queue), which you’ll read about later.

::: note

Even though the priority queue is conceptually a sequence, its most efficient implementation builds on top of the [**heap data structure**](/realpython.com/python-heapq-module.md), which is a kind of [<FontIcon icon="fa-brands fa-wikipedia-w"/>binary tree](https://en.wikipedia.org/wiki/Binary_tree). Therefore, the terms heap and priority queue are sometimes used interchangeably.

:::

That was a longish introduction to the theory and taxonomy of queues. Along the way, you’ve learned about FIFO queues, stacks (LIFO queues), deques, and priority queues. You’ve also seen the difference between bounded and unbounded queues, and you’ve gotten an idea about their potential applications. Now, it’s time to take a stab at implementing some of those queues yourself.
