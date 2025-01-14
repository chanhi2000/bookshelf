---
lang: en-US
title: "Python Stacks, Queues, and Priority Queues in Practice"
description: "Article(s) > Python Stacks, Queues, and Priority Queues in Practice"
icon: fa-brands fa-python
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
      content: "Article(s) > Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/
prev: /programming/py/articles/README.md
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
  name="Python Stacks, Queues, and Priority Queues in Practice"
  desc="In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding."
  url="https://realpython.com/queue-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>

Queues are the backbone of numerous algorithms found in games, artificial intelligence, satellite navigation, and task scheduling. They’re among the top **abstract data types** that computer science students learn early in their education. At the same time, software engineers often leverage higher-level **message queues** to achieve better scalability of a [**microservice architecture**](/realpython.com/python-microservices-grpc.md). Plus, using queues in Python is simply fun!

Python provides a few **built-in flavors of queues** that you’ll see in action in this tutorial. You’re also going to get a quick primer on the **theory of queues** and their types. Finally, you’ll take a look at some **external libraries** for connecting to popular message brokers available on major cloud platform providers.

::: info In this tutorial, you’ll learn how to

- Differentiate between various **types of queues**
- Implement the **queue data type** in Python
- Solve **practical problems** by applying the right queue
- Use Python’s **thread-safe**, **asynchronous**, and **interprocess** queues
- Integrate Python with **distributed message queue brokers** through libraries

:::

To get the most out of this tutorial, you should be familiar with Python’s sequence types, such as [**lists**](/realpython.com/python-list/README.md) and [**tuples**](/realpython.com/python-tuple.md), and the higher-level [**collections**](/realpython.com/python-collections-module.md) in the standard library.

You can download the complete source code for this tutorial with the associated sample data by clicking the link in the box below:

```component VPCard
{
  "title": "Learning About the Types of Queues",
  "desc": "(1/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/learning-about-the-types-of-queues.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Implementing Queues in Python",
  "desc": "(2/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/implementing-queues-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using Queues in Practice",
  "desc": "(3/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/using-queues-in-practice.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using Thread-Safe Queues",
  "desc": "(4/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/using-thread-safe-queues.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using Asynchronous Queues",
  "desc": "(5/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/using-asynchronous-queues.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Using multiprocessing.Queue for Interprocess Communication (IPC)",
  "desc": "(6/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/using-multiprocessingqueue-for-interprocess-communication-ipc.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Integrating Python With Distributed Message Queues",
  "desc": "(7/7) Python Stacks, Queues, and Priority Queues in Practice",
  "link": "/realpython.com/queue-in-python/integrating-python-with-distributed-message-queues.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

Now you have a solid understanding of the **theory of queues** in computer science and know their **practical uses**, ranging from finding the shortest path in a graph to synchronizing concurrent workers and decoupling distributed systems. You’re able to recognize problems that queues can elegantly solve.

You can implement **FIFO**, **LIFO**, and **priority queues** from scratch using different data structures in Python, understanding their trade-offs. At the same time, you know every queue built into the standard library, including **thread-safe** queues, **asynchronous** queues, and a queue for **process-based** parallelism. You’re also aware of the libraries allowing the integration of Python with popular **message broker queues** in the cloud.

::: info In this tutorial, you learned how to

- Differentiate between various **types of queues**
- Implement the **queue data type** in Python
- Solve **practical problems** by applying the right queue
- Use Python’s **thread-safe**, **asynchronous**, and **interprocess** queues
- Integrate Python with **distributed message queue brokers** through libraries

:::

Along the way, you’ve implemented breadth-first search **(BFS)**, depth-first search **(DFS)**, and **Dijkstra’s shortest path** algorithms. You’ve built a visual simulation of the **multi-producer, multi-consumer** problem, an asynchronous **web crawler**, and a parallel **MD5 hash reversal** program. To get the source code for these hands-on examples, follow the link below:

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python Stacks, Queues, and Priority Queues in Practice",
  "desc": "In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
