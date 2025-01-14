---
lang: en-US
title: "Using Thread-Safe Queues"
description: "Article(s) > (4/7) Python Stacks, Queues, and Priority Queues in Practice"
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
      content: "Article(s) > (4/7) Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Using Thread-Safe Queues"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/using-thread-safe-queues.html
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
  url="https://realpython.com/queue-in-python#using-thread-safe-queues"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>



---

## Using Thread-Safe Queues

Now suppose you’ve written a program with more than one flow of execution. Beyond being a valuable algorithmic tool, queues can help abstract away [concurrent](https://realpython.com/python-concurrency/) access to a shared resource in a [multithreaded](https://realpython.com/intro-to-python-threading/) environment without the need for explicit locking. Python provides a few **synchronized queue** types that you can safely use on multiple threads to facilitate communication between them.

In this section, you’re going to implement the classic [multi-producer, multi-consumer problem](https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem) using Python’s [thread-safe](https://en.wikipedia.org/wiki/Thread_safety) queues. More specifically, you’ll create a command-line script that lets you decide on the number of producers and consumers, their relative speed rates, and the type of queue:

```sh
$ python thread_safe_queues.py --producers 3 \
 --consumers 2 \
 --producer-speed 1 \
 --consumer-speed 1 \
 --queue fifo
```

All parameters are optional and have sensible defaults. When you run this script, you’ll see an animated simulation of the producer and consumer threads communicating over a synchronized queue:

[![Animated Visualization of the Producers, Consumers, and the Thread-Safe Queue](https://files.realpython.com/media/queue_fifo.4bfb28b845b0.png)](https://files.realpython.com/media/queue_fifo.4bfb28b845b0.png)

Visualization of the Producers, Consumers, and the Thread-Safe Queue

The script uses the [Rich](https://realpython.com/python-rich-package/) library, which you’ll need to install into your virtual environment first:

```sh
(venv) $ python -m pip install rich
```

This will let you add colors, [emojis](https://en.wikipedia.org/wiki/Emoji), and visual components to your terminal. Note that some terminals may not support this kind of rich text formatting. Remember that at any point, you can download the complete source code of the scripts mentioned in this tutorial by following the link below if you haven’t already:

**Get Source Code:** [Click here to get access to the source code and sample data](https://realpython.com/bonus/queue-code/) that you’ll use to explore queues in Python.

Before you start using queues, you’ll have to do a bit of scaffolding. Create a new file named `thread_safe_queues.py` and define the entry point to your script, which will parse arguments with the [`argparse`](https://realpython.com/command-line-interfaces-python-argparse/) module:

```py
# thread_safe_queues.py

import argparse
from queue import LifoQueue, PriorityQueue, Queue

QUEUE_TYPES = {
    "fifo": Queue,
    "lifo": LifoQueue,
    "heap": PriorityQueue
}

def main(args):
    buffer = QUEUE_TYPES[args.queue]()

def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-q", "--queue", choices=QUEUE_TYPES, default="fifo")
    parser.add_argument("-p", "--producers", type=int, default=3)
    parser.add_argument("-c", "--consumers", type=int, default=2)
    parser.add_argument("-ps", "--producer-speed", type=int, default=1)
    parser.add_argument("-cs", "--consumer-speed", type=int, default=1)
    return parser.parse_args()

if __name__ == "__main__":
    try:
        main(parse_args())
    except KeyboardInterrupt:
        pass
```

First, you import the necessary module and queue classes into the global namespace. The `main()` function is your entry point, which receives the parsed arguments supplied by `parse_args()`, which is defined below. The `QUEUE_TYPES` dictionary maps queue names to their respective classes, which you call to create a new queue instance based on the value of a command-line argument.

Next, you define the products that your producers will pick at random and pretend to be working on:

```py
# thread_safe_queues.py

# ...

PRODUCTS = (
    ":balloon:",
    ":cookie:",
    ":crystal_ball:",
    ":diving_mask:",
    ":flashlight:",
    ":gem:",
    ":gift:",
    ":kite:",
    ":party_popper:",
    ":postal_horn:",
    ":ribbon:",
    ":rocket:",
    ":teddy_bear:",
    ":thread:",
    ":yo-yo:",
)

# ...
```

These are textual codes that Rich will eventually replace with the corresponding emoji [glyphs](https://en.wikipedia.org/wiki/Glyph). For example, `:balloon:` will render as 🎈. You can find all emoji codes available in Rich by running `python -m rich.emoji` in your terminal.

Your producer and consumer threads will share a wealth of attributes and behaviors, which you can encapsulate in a common base class:

```py
# thread_safe_queues.py

import threading

# ...

class Worker(threading.Thread):
    def __init__(self, speed, buffer):
        super().__init__(daemon=True)
        self.speed = speed
        self.buffer = buffer
        self.product = None
        self.working = False
        self.progress = 0
```

The worker class extends the `threading.Thread` class and configures itself as a [daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) thread so that its instances won’t prevent your program from exiting when the main thread finishes, for example, due to a [keyboard interrupt](https://en.wikipedia.org/wiki/Keyboard_interrupt) signal. A worker object expects the speed rate to work with and a buffer queue to put finished products into or get them from.

In addition to that, you’ll be able to check the state of a worker thread and request that it simulate some work or idle time:

```py
# thread_safe_queues.py

from random import randint
from time import sleep

# ...

class Worker(threading.Thread):
    # ...

    @property
    def state(self):
        if self.working:
            return f"{self.product} ({self.progress}%)"
        return ":zzz: Idle"

    def simulate_idle(self):
        self.product = None
        self.working = False
        self.progress = 0
        sleep(randint(1, 3))

    def simulate_work(self):
        self.working = True
        self.progress = 0
        delay = randint(1, 1 + 15 // self.speed)
        for _ in range(100):
            sleep(delay / 100)
            self.progress += 1
```

The `.state` [property](https://realpython.com/python-property/) returns a string with either the product’s name and the progress of work or a generic message indicating that the worker is currently idle. The `.simulate_idle()` method resets the state of a worker thread and goes to sleep for a few randomly chosen seconds. Similarly, `.simulate_work()` picks a random delay in seconds adjusted to the worker’s speed and progresses through the work.

Studying the presentation layer based on the Rich library isn’t crucial to understanding this example, but feel free to expand the collapsible section below for more details:

Source Code For the `View` ClassShow/Hide

The code below defines a view that renders the current state of your producers, consumers, and the queue ten times a second:

```py
# thread_safe_queues.py

from itertools import zip_longest

from rich.align import Align
from rich.columns import Columns
from rich.console import Group
from rich.live import Live
from rich.panel import Panel

# ...

class View:
    def __init__(self, buffer, producers, consumers):
        self.buffer = buffer
        self.producers = producers
        self.consumers = consumers

    def animate(self):
        with Live(
            self.render(), screen=True, refresh_per_second=10
        ) as live:
            while True:
                live.update(self.render())

    def render(self):

        match self.buffer:
            case PriorityQueue():
                title = "Priority Queue"
                products = map(str, reversed(list(self.buffer.queue)))
            case LifoQueue():
                title = "Stack"
                products = list(self.buffer.queue)
            case Queue():
                title = "Queue"
                products = reversed(list(self.buffer.queue))
            case _:
                title = products = ""

        rows = [
            Panel(f"[bold]{title}:[/] {', '.join(products)}", width=82)
        ]
        pairs = zip_longest(self.producers, self.consumers)
        for i, (producer, consumer) in enumerate(pairs, 1):
            left_panel = self.panel(producer, f"Producer {i}")
            right_panel = self.panel(consumer, f"Consumer {i}")
            rows.append(Columns([left_panel, right_panel], width=40))
        return Group(*rows)

    def panel(self, worker, title):
        if worker is None:
            return ""
        padding = " " * int(29 / 100 * worker.progress)
        align = Align(
            padding + worker.state, align="left", vertical="middle"
        )
        return Panel(align, height=5, title=title)

# ...
```

Notice the use of [structural pattern matching](https://realpython.com/python310-new-features/#structural-pattern-matching) to set the title and products based on the queue type. You’ll create an instance of the view and call its `.animate()` method once the producers and consumers are in place.

Next up, you’ll define the producer and consumer classes, and connect the pieces together.

### queue.Queue

The first synchronized queue that you’ll give a try is an unbounded FIFO queue or, simply put, a queue. You’ll need to pass it around to both your producers and consumers, so go ahead and define them now. The producer thread will extend a worker class and take an additional collection of products to choose from:

```py
# thread_safe_queues.py

from random import choice, randint

# ...

class Producer(Worker):
    def __init__(self, speed, buffer, products):
        super().__init__(speed, buffer)
        self.products = products

    def run(self):
        while True:
            self.product = choice(self.products)
            self.simulate_work()
            self.buffer.put(self.product)
            self.simulate_idle()

# ...
```

The `.run()` method is where all the magic happens. A producer works in an infinite loop, choosing a random product and simulating some work before putting that product onto the queue, called a `buffer`. It then goes to sleep for a random period, and when it wakes up again, the process repeats.

A consumer is very similar, but even more straightforward than a producer:

```py
# thread_safe_queues.py

# ...

class Consumer(Worker):
    def run(self):
        while True:
 self.product = self.buffer.get()            self.simulate_work()
 self.buffer.task_done()            self.simulate_idle()

# ...
```

It also works in an infinite loop, waiting for a product to appear in the queue. The `.get()` method is **blocking** by default, which will keep the consumer thread stopped and waiting until there’s at least one product in the queue. This way, a waiting consumer won’t be wasting any CPU cycles while the operating system allocates valuable resources to other threads doing useful work.

**Note:** To avoid a [deadlock](https://en.wikipedia.org/wiki/Deadlock), you can optionally set a timeout on the `.get()` method by passing a `timeout` keyword argument with the number of seconds to wait before giving up.

Each time you get something from a synchronized queue, its internal counter increases to let other threads know the queue hasn’t been drained yet. Therefore, it’s important to mark a dequeued task as done when you’re finished processing it unless you don’t have any threads [joining](https://docs.python.org/3/library/queue.html#queue.Queue.join) the queue. Doing so decreases the queue’s internal counter.

Now, go back to your `main()` function, create the producer and consumer threads, and start them:

```py
# thread_safe_queues.py

# ...

def main(args):
    buffer = QUEUE_TYPES[args.queue]()
    producers = [
        Producer(args.producer_speed, buffer, PRODUCTS)
        for _ in range(args.producers)
    ]
    consumers = [
        Consumer(args.consumer_speed, buffer) for _ in range(args.consumers)
    ]

    for producer in producers:
        producer.start()

    for consumer in consumers:
        consumer.start()

    view = View(buffer, producers, consumers)
    view.animate()
```

The number of producers and consumers is determined by the command-line arguments passed into your function. They’ll begin working and using the queue for interthread communication as soon as you start them. The `View` instance at the bottom continually re-renders the screen to reflect the current state of your application:

Thread-Safe FIFO Queue

Producers will always push their finished products through that queue to the consumers. Even though it may sometimes appear as if a consumer takes an element directly from a producer, it’s only because things are happening too fast to notice the enqueue and dequeue operations.

**Note:** It’s worth noting that whenever a producer puts something onto a synchronized queue, at most one consumer will dequeue that element and process it without other consumers ever knowing. If you wish to notify more than one consumer about a particular event in your program, then have a look at other thread coordination primitives in the [`threading`](https://docs.python.org/3/library/threading.html) module.

You can increase the number of producers, their speed, or both to see how these changes affect the overall capacity of your system. Because the queue is unbounded, it’ll never slow down the producers. However, if you specified the queue’s `maxsize` parameter, then it would start blocking them until there was enough space in the queue again.

Using a FIFO queue makes the producers put elements on the left end of the queue in the visualization above. At the same time, consumers compete with each other for the rightmost product in the queue. In the next section, you’ll see how this behavior changes when you call the script with the `--queue lifo` option.

### queue.LifoQueue

From your workers’ perspective, there’s absolutely no need to make any changes to your code in order to modify how they communicate. Merely by injecting a different type of synchronized queue into them, you can modify the rules of the workers’ communication. Run your script with a LIFO queue now:

```sh
$ python thread_safe_queues.py --queue lifo
```

When you use a LIFO queue or a stack, each new product that has just been created will take precedence over the older ones in the queue:

Thread-Safe LIFO Queue

In rare cases, when new products are created more quickly than your consumers can cope with them, older products might suffer from [starvation](https://en.wikipedia.org/wiki/Starvation_(computer_science)) because they get stuck at the bottom of the stack and never get consumed. On the other hand, that might not be a problem when you have a big enough consumer pool or when you don’t get as many incoming products. Starvation can also involve elements on a priority queue, which you’ll read about next.

### queue.PriorityQueue

To use a synchronized priority queue or a heap, you’ll need to make a few adjustments in your code. First of all, you’re going to need a new kind of product that has an associated priority, so define two new data types:

```py
# thread_safe_queues.py

from dataclasses import dataclass, field
from enum import IntEnum

# ...

@dataclass(order=True)
class Product:
    priority: int
    label: str = field(compare=False)

    def __str__(self):
        return self.label

class Priority(IntEnum):
    HIGH = 1
    MEDIUM = 2
    LOW = 3

PRIORITIZED_PRODUCTS = (
    Product(Priority.HIGH, ":1st_place_medal:"),
    Product(Priority.MEDIUM, ":2nd_place_medal:"),
    Product(Priority.LOW, ":3rd_place_medal:"),
)
```

To represent products, you use a data class with a customized string representation and ordering enabled, but you’re careful not to compare the products by their label. In this case, you expect the label to be a string, but generally, it could be any object that might not be comparable at all. You also define an [enum](https://docs.python.org/3/library/enum.html) class with known priority values and three products with descending priorities from highest to lowest.

**Note:** Contrary to your earlier priority queue implementation, Python’s thread-safe queue orders elements with the lowest numeric priority value first.

Additionally, when the user supplies the `--queue heap` option in the command line, then you must supply the right collection of products to your producer threads:

```py
# thread_safe_queues.py

# ...

def main(args):
    buffer = QUEUE_TYPES[args.queue]()
 products = PRIORITIZED_PRODUCTS if args.queue == "heap" else PRODUCTS    producers = [
 Producer(args.producer_speed, buffer, products)        for _ in range(args.producers)
    ]
    # ...
```

You provide either plain or prioritized products depending on a command-line argument using a [conditional expression](https://realpython.com/python-conditional-statements/#conditional-expressions-pythons-ternary-operator).

The rest of your code can remain agnostic to this change as long as the producers and consumers know how to deal with a new product type. Because this is only a simulation, the worker threads don’t really do anything useful with the products, so you can run your script with the `--queue heap` flag and see the effect:

Thread-Safe Priority Queue

Remember that a heap data structure is a binary tree, which keeps a specific relationship between its elements. Therefore, even though the products in the priority queue don’t appear to be arranged quite correctly, they’re actually consumed in the right order. Also, because of the non-deterministic nature of multithreaded programming, Python queues don’t always report their most up-to-date size.

All right, you’ve witnessed the traditional way of coordinating worker threads using three types of synchronized queues. Python threads are well-suited to [I/O-bound](https://en.wikipedia.org/wiki/I/O_bound) tasks, which spend most of their time waiting for data on the network, the file system, or a database. However, there’s recently been a single-threaded alternative to synchronized queues, taking advantage of [Python’s asynchronous features](https://realpython.com/python-async-features/). That’s what you’ll look at now.
