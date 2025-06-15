---
lang: en-US
title: "How to Work with Queues in TypeScript"
description: "Article(s) > How to Work with Queues in TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Work with Queues in TypeScript"
    - property: og:description
      content: "How to Work with Queues in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-queues-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2025-06-17
isOriginal: false
author:
  - name: Yazdun
    url : https://freecodecamp.org/news/author/Yazdun/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750082265731/de8b778c-935d-4a38-a5ef-748896475327.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with Queues in TypeScript"
  desc="A queue is a collection of items arranged in a First-In-First-Out (FIFO) order. This means that the first item added is the first to be removed, much like a supermarket line where customers are served in the order they arrive. In this hands-on tutor..."
  url="https://freecodecamp.org/news/how-to-work-with-queues-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750082265731/de8b778c-935d-4a38-a5ef-748896475327.png"/>

A queue is a collection of items arranged in a First-In-First-Out (FIFO) order. This means that the first item added is the first to be removed, much like a supermarket line where customers are served in the order they arrive.

![Diagram illustrating a queue. Items are added to the back through "enqueue" and removed from the front through "dequeue." Arrows show the flow into and out of a rectangular box representing the queue.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749741091206/42a62a3c-cf1b-4e7a-b8ce-4209e13f70d3.png)

In this hands-on tutorial, you will learn how to implement queues in TypeScript using linked lists.

::: note Prerequisites

1. **TypeScript:** You need to know [**TypeScript basics**](/freecodecamp.org/learn-typescript-with-react-handbook/README.md), such as interfaces, types, and classes.
2. **Algorithm fundamentals:** You need a basic understanding of data structures and algorithms. For example, you should be comfortable analyzing time and space complexity using [**Big-O notation**](/freecodecamp.org/big-o-cheat-sheet-time-complexity-chart.md).
3. **Linked Lists Data Structure:** It's important to have a solid understanding of linked lists before starting this tutorial. I wrote a detailed [**linked list tutorial**](/freecodecamp.org/how-to-code-linked-lists-with-typescript-handbook/README.md) that you can use to learn about this data structure.

:::

---

## Getting Started

To get started with this tutorial, you’ll use a playground project that’s designed to help you implement queues and follow each step hands-on.

Clone the project from the [GitHub repository and code along (<FontIcon icon="iconfont icon-github"/>`Yazdun/fcc-queues`)](https://github.com/Yazdun/fcc-queues) with the tutorial.

The project structure is as follows:

```plaintext title="file structure"
.
├── index.ts
├── examples
│   ├── 01-linked-list.ts
│   ├── 02-simple-queue.ts
│   ├── 03-circular-queue.ts
│   ├── 04-double-ended-queue.ts
│   └── 05-priority-queue.ts
└── playground
    ├── 01-linked-list.ts
    ├── 02-simple-queue.ts
    ├── 03-circular-queue.ts
    ├── 04-double-ended-queue.ts
    └── 05-priority-queue.ts
```

Throughout the tutorial, you will use the <FontIcon icon="fas fa-folder-open"/>`playground` directory to implement and test your code.

The <FontIcon icon="fas fa-folder-open"/>`examples` directory contains the final version of each implementation. If you get stuck, you can look at these solutions as a last resort!

---

## What Are Queues?

A queue is a data structure that manages items in a first-in, first-out (FIFO) order, where the first item added is the first removed.

For example, imagine a printer handling jobs. If you send three documents to print, the printer processes them in the order they arrive. The first document prints first, then the second, and finally the third.

In programming, queues help manage tasks that need to happen in order, such as:

- A web server queues incoming requests to process them one by one.
- A chat app queues messages to send them in the order they’re typed.
- A navigation app queues locations to explore a map level by level. (Breadth-First Search)

There are four types of queues in a data structure:

- **Simple Queue**: Adds items to the back and removes them from the front in first-in, first-out (FIFO) order.
- **Circular Queue**: It is similar to a simple queue, except the last element is connected to the first.
- **Double-Ended Queue (Deque)**: Allows adding or removing items from both front and back, like a bus stop line where people join or leave either end.
- **Priority Queue**: Processes items based on priority, not arrival order. Like a delivery app processes VIP orders before regular ones.

Each of these queues has a set of operations for managing their items. In this tutorial, you will learn about the following common and widely used operations:

- **enqueue**: Adds an item to the back of the queue, like a new customer joining the end of a ticket line.
- **dequeue**: Removes and returns the item at the front of the queue.
- **getFront**: Looks at the item at the front without removing it, like checking who’s first in line.
- **getRear**: Looks at the item at the back without removing it, like seeing who’s last in line.
- **isEmpty**: Checks if the queue has no items.
- **isFull**: Checks if the queue has reached its maximum size.
- **peek**: Same as `getFront`, views the front item without removing it, like a quick glance at the first task.
- **size**: Returns the number of items in the queue, like counting how many people are in line.

Now that you know about queues and their main operations, let's get into the actual implementation and see how it looks in code.

There are a few different ways to implement queues, but in this tutorial, you will learn about **linked list-based queues**, which use a linked list to create the queues.

First, let's briefly learn about the linked list data structure and then move on to the queue implementation.

---

## What Are Linked Lists?

A linked list is a method of storing a collection of items where each item, known as a "node," contains two parts: the actual data and a reference (or pointer) to the next item in the list.

Unlike arrays, where all items are stored next to each other in memory, linked lists connect nodes using these references, like a chain.

Linked lists are used to implement queues because they allow efficient **insertion at the end** and **removal from the front**, which are the two main operations of a queue.

In a linked list-based queue, you can add a new node at the tail and remove one from the head in constant time ($O\left(1\right)$) without needing to shift elements, as you would in an array.

![Diagram of a linked list with four nodes connected sequentially. Node 1 is labeled as the head and Node 4 as the tail.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749741385495/1bfab581-481d-4108-9f48-bf93d9dcf4f1.png)

In this tutorial, you are going to use a specific type of linked list called **Circular Doubly Linked List**.

A circular doubly linked list is a type of linked list where each node connects to both the next and previous nodes, and the last node loops back to the first one to form a circle.

This means you can move through the list in both directions and never hit a dead end. This makes it easy to go forward or backward through nodes and helps avoid special cases like handling `null` at the ends.

In a circular doubly linked list, everything is connected in a loop, which simplifies certain queue operations and keeps things efficient.

![Diagram showing a circular doubly linked list with five nodes labeled from Node 1 (head) to Node 5 (tail), connected in a loop.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749741872784/d01a9c89-945e-4b4a-acff-56b7e528ea7e.png)

You can learn more about circular linked lists in my [**Linked Lists Handbook**](/freecodecamp.org/how-to-code-linked-lists-with-typescript-handbook/what-is-a-circular-linked-list.md).

For this tutorial, I’ve already added a circular doubly linked list in <FontIcon icon="fas fa-folder-open"/>`src/playground/`<FontIcon icon="iconfont icon-typescript"/>`01-linked-list.ts`:

```ts :collapsed-lines title="playground/01-linked-list.ts"
/**
 * Node for doubly linked list
 */
export class NodeItem<T> {
  value: T;
  next: NodeItem<T> | null = null;
  prev: NodeItem<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

/**
 * Circular Doubly Linked List
 */
export class LinkedList<T> {
  private head: NodeItem<T> | null = null;
  private tail: NodeItem<T> | null = null;
  private currentSize: number = 0;

  /**
   * Add a new node to the front of the list
   * @param value The value to add
   */
  prepend(value: T): void {
    const newNode = new NodeItem(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.head!.prev = newNode;
      this.tail!.next = newNode;
      this.head = newNode;
    }
    this.currentSize++;
  }

  /**
   * Add a new node to the back of the list
   * @param value The value to add
   */
  append(value: T): void {
    const newNode = new NodeItem(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.head!.prev = newNode;
      this.tail = newNode;
    }
    this.currentSize++;
  }

  /**
   * Remove and return the value from the front of the list
   * @returns The value at the head or undefined if empty
   */
  deleteHead(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.head!.value;
    if (this.currentSize === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = this.tail;
      this.tail!.next = this.head;
    }
    this.currentSize--;
    return value;
  }

  /**
   * Remove and return the value from the back of the list
   * @returns The value at the tail or undefined if empty
   */
  deleteTail(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const value = this.tail!.value;
    if (this.currentSize === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = this.head;
      this.head!.prev = this.tail;
    }
    this.currentSize--;
    return value;
  }

  /**
   * Get the value at the front without removing it
   * @returns The value at the head or undefined if empty
   */
  getHead(): T | undefined {
    return this.head?.value;
  }

  /**
   * Get the value at the back without removing it
   * @returns The value at the tail or undefined if empty
   */
  getTail(): T | undefined {
    return this.tail?.value;
  }

  /**
   * Check if the list is empty
   * @returns True if the list is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.currentSize === 0;
  }

  /**
   * Get the current size of the list
   * @returns The number of nodes in the list
   */
  size(): number {
    return this.currentSize;
  }
}
```

In this module, you have a circular doubly linked list with 8 different methods that will make it easier to build queues later in the tutorial:

- `prepend`: Adds a new value to the **front** of the list.
- `append`: Adds a new value to the **end** of the list.
- `deleteHead`: Removes and returns the value at the **front**.
- `deleteTail`: Removes and returns the value at the **end**.
- `getHead`: Returns the front value **without removing it**.
- `getTail`: Returns the end value **without removing it**.
- `isEmpty`: Checks whether the list has **no items**.
- `size`: Returns the **number of items** currently in the list.

Now that your linked list is ready, let's begin creating your first queue!

---

## What is a Simple Queue?

A Simple Queue follows the basic FIFO rule: you’ll to add items to the back and remove them from the front.

It’s like a line of customers at a ticket counter, where the first person in line buys a ticket first.

To get started, open <FontIcon icon="fas fa-folder-open"/>`src/playground/`<FontIcon icon="iconfont icon-typescript"/>`02-simple-queue.ts`, where you will find the placeholder for the Simple Queue with its methods:

```ts title="playground/02-simple-queue.ts"
import { LinkedList } from "./01-linked-list";

/**
 * Simple Queue implemented with a circular doubly linked list
 */
export class SimpleQueue<T> {
  private list: LinkedList<T>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the queue
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<T>();
    this.maxSize = maxSize;
  }

  ...methods
}
```

At the core of this `SimpleQueue` class, you're using a circular doubly linked list to store the items, and optionally allowing a maximum size limit to control how big the queue can grow.

- `private list: LinkedList<T>` is where the queue's data is stored. Instead of a simple array, you're using a custom linked list, which makes it efficient to add or remove items from either end. The linked list manages the data structure and allows you to focus on how the queue works.
- `private maxSize` is an optional limit for how many items the queue can hold. If not provided, the queue can grow as large as needed.
- Then, the `constructor` method that runs when you create a new queue. It creates a new, empty linked list to hold the queue items.

Now, let's implement the queue methods.

Open your code editor and update <FontIcon icon="fas fa-folder-open"/>`src/playground/`<FontIcon icon="iconfont icon-typescript"/>`02-simple-queue.ts` with the following code:

```ts :collapsed-lines title="playground/02-simple-queue.ts"

import { LinkedList } from "./01-linked-list";

/**
 * Simple Queue implemented with a circular doubly linked list
 */
export class SimpleQueue<T> {
  private list: LinkedList<T>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the queue
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<T>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the rear of the queue
   * @param item The element to add
   */
  enqueue(item: T): void {
    if (this.isFull()) {
      throw new Error("Queue is full");
    }
    this.list.append(item);
  }

  /**
   * Remove and return the element from the front of the queue
   * @returns The element at the front or undefined if empty
   */
  dequeue(): T | undefined {
    return this.list.deleteHead();
  }

  /**
   * Get the element at the front without removing it
   * @returns The element at the front or undefined if empty
   */
  getFront(): T | undefined {
    return this.list.getHead();
  }

  /**
   * Get the element at the rear without removing it
   * @returns The element at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return this.list.getTail();
  }

  /**
   * Check if the queue is empty
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Check if the queue is full
   * @returns True if the queue is full, false otherwise
   */
  isFull(): boolean {
    return this.maxSize !== undefined && this.list.size() >= this.maxSize;
  }

  /**
   * Peek at the front element without removing it
   * @returns The element at the front or undefined if empty
   */
  peek(): T | undefined {
    return this.getFront();
  }

  /**
   * Get the current size of the queue
   * @returns The number of elements in the queue
   */
  size(): number {
    return this.list.size();
  }
}
```

As you can see, the linked list greatly simplifies your queue implementation because it acts as the engine behind your queue.

Here's how your Simple Queue works:

- `isEmpty()`: This method checks whether the queue contains any items. It calls the `isEmpty()` method on the linked list, which internally checks if the current size of the list is zero. If the list has no nodes, it returns `true`, indicating that the queue is empty. This is a basic utility method often used before attempting to dequeue or inspect the queue.
- `isFull()`: This method determines whether the queue has reached its capacity. It compares the current size of the linked list (via the `size()` method) to the optional `maxSize` value. If `maxSize` is defined and the size is equal to or greater than that limit, it returns `true`, indicating that no more items can be added. This is useful to prevent overflow in bounded queues.
- `size()`: This method returns the number of items currently stored in the queue. It directly calls the `size()` method of the linked list, which tracks how many nodes are present. This allows you to monitor queue usage and remaining capacity.
- `enqueue()`: This method adds a new item to the end (rear) of the queue. It first checks whether the queue is full by calling the `isFull()` method. If it is, the method throws an error. Otherwise, it appends the new item to the internal linked list using the `append()` method, which adds the new node to the tail of the circular doubly linked list.
- `dequeue()`: This method removes and returns the item at the front of the queue. It calls the `deleteHead()` method of the linked list, which removes the head node and updates the links of the surrounding nodes to maintain the circular structure. If the queue is empty, it returns `undefined`.
- `getFront()`: This method returns the value at the front of the queue without removing it. It uses the `getHead()` method of the linked list to retrieve the value of the head node. This operation does not modify the queue and is useful for previewing the next item to be dequeued.
- `getRear()`: This method returns the value at the rear of the queue without removing it. It uses the `getTail()` method of the linked list, which returns the value of the tail node. This helps you inspect the most recently added item without altering the queue.
- `peek()`: This method is an alias for `getFront()`. It returns the item at the front of the queue without removing it. Internally, it calls `getFront()` to get the head value. This is often used in queue APIs to check the next item in line.

![Flowchart illustrating queue operations. The process starts with either an enqueue or dequeue operation. Enqueue checks if the queue is full: if yes, triggers an error; if no, it adds an element, updates the rear pointer, and ends. Dequeue checks if the queue is empty: if yes, triggers an error; if no, removes an element, updates the front pointer, and ends.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749742108067/3f5aab62-8314-4889-925a-cb9d52d9a277.png)

You’ve just implemented your first queue in TypeScript. To make sure that your implementation works correctly, run the following command in your terminal at the root of the project:

```sh
npm run test:file 02
```

If any of the tests fail, use the final example from <FontIcon icon="fas fa-folder-open"/>`src/examples/`<FontIcon icon="iconfont icon-typescript"/>`02-simple-queue.ts` to debug the issue, and then run the tests again.

If all tests pass, you can proceed to the next section, where you'll implement a Circular Queue.

---

## What is a Circular Queue?

A `CircularQueue` is a fixed-size queue where the last position connects back to the first. This allows you to reuse space after removing items.

Imagine a buffet line with a limited number of plates: when someone takes a plate from the front, a new one is added at the back, using the same space again.

The `CircularQueue` is quite similar to the `SimpleQueue`, but it has a few unique differences.

Let’s modify <FontIcon icon="fas fa-folder-open"/>`src/playground/`<FontIcon icon="iconfont icon-typescript"/>`03-circular-queue.ts` and add the following code:

```ts :collapsed-lines title="playground/03-circular-queue.ts"
import { LinkedList } from "./01-linked-list";

/**
 * Circular Queue implemented with a circular doubly linked list
 */
export class CircularQueue<T> {
  private list: LinkedList<T>;
  private maxSize: number;

  /**
   * @param maxSize Required maximum size of the circular queue
   */
  constructor(maxSize: number) {
    this.list = new LinkedList<T>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the rear of the queue
   * @param item The element to add
   */
  enqueue(item: T): void {
    if (this.isFull()) {
      throw new Error("Circular queue is full");
    }
    this.list.append(item);
  }

  /**
   * Remove and return the element from the front of the queue
   * @returns The element at the front or undefined if empty
   */
  dequeue(): T | undefined {
    return this.list.deleteHead();
  }

  /**
   * Get the element at the front without removing it
   * @returns The element at the front or undefined if empty
   */
  getFront(): T | undefined {
    return this.list.getHead();
  }

  /**
   * Get the element at the rear without removing it
   * @returns The element at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return this.list.getTail();
  }

  /**
   * Check if the queue is empty
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Check if the queue is full
   * @returns True if the queue is full, false otherwise
   */
  isFull(): boolean {
    return this.list.size() >= this.maxSize;
  }

  /**
   * Peek at the front element without removing it
   * @returns The element at the front or undefined if empty
   */
  peek(): T | undefined {
    return this.getFront();
  }

  /**
   * Get the current size of the queue
   * @returns The number of elements in the queue
   */
  size(): number {
    return this.list.size();
  }
}
```

This may look very similar to a `SimpleQueue`, but there are a few key differences:

- **Constructor Difference**: Unlike the `SimpleQueue`, the `CircularQueue` **requires** a `maxSize` parameter during instantiation. This enforces a strict upper limit on how many elements can be in the queue at once.<br/>In contrast, `SimpleQueue` treats `maxSize` as optional and allows unbounded queues. By making the size mandatory, `CircularQueue` is better suited for fixed-size buffer scenarios where memory or resource control is important (for example, in real-time systems or caching).
- `enqueue()`: This method is almost identical to the one in `SimpleQueue`, but the key difference lies in the design intent. In `CircularQueue`, throwing an error when the queue is full is part of the contract and it assumes that you’re managing a fixed buffer.<br/>The circular nature comes into play conceptually: once full, no more data can enter unless older entries are removed, which mimics a circular overwrite mechanism (though this specific implementation doesn’t auto-overwrite).
- `isFull()`: This method behaves the same as in `SimpleQueue` when a `maxSize` is set, but in `CircularQueue`, it’s always applicable because `maxSize` is required. The consistent presence of a size limit makes the queue predictable and ideal for bounded use cases like streaming data and rate-limited processing.

Now, let's test the implementation to see if it works:

```sh
npm run test:file 03
```

If any of the tests fail, use the final <FontIcon icon="fas fa-folder-open"/>`/examples` directory to debug the issue.

If the tests pass, you'll be ready to move on to the next section, where you will learn about double-ended queues.

---

## What is a Double Ended Queue?

A double-ended queue (deque) lets you add or remove items from both the front and the back.

It’s like a line at a bus stop where people can join or leave from either end.

Let’s modify <FontIcon icon="fas fa-folder-open"/>`src/playground/`<FontIcon icon="iconfont icon-typescript"/>`04-double-ended-queue.ts` and add the following code:

```ts :collapsed-lines title="playground/04-double-ended-queue.ts"
import { LinkedList } from "./01-linked-list";

/**
 * Double-Ended Queue (Deque) implemented with a circular doubly linked list
 */
export class Deque<T> {
  private list: LinkedList<T>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the deque
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<T>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the front of the deque
   * @param item The element to add
   */
  enqueueFront(item: T): void {
    if (this.isFull()) {
      throw new Error("Deque is full");
    }
    this.list.prepend(item);
  }

  /**
   * Add an element to the rear of the deque
   * @param item The element to add
   */
  enqueueRear(item: T): void {
    if (this.isFull()) {
      throw new Error("Deque is full");
    }
    this.list.append(item);
  }

  /**
   * Remove and return the element from the front of the deque
   * @returns The element at the front or undefined if empty
   */
  dequeueFront(): T | undefined {
    return this.list.deleteHead();
  }

  /**
   * Remove and return the element from the rear of the deque
   * @returns The element at the rear or undefined if empty
   */
  dequeueRear(): T | undefined {
    return this.list.deleteTail();
  }

  /**
   * Get the element at the front without removing it
   * @returns The element at the front or undefined if empty
   */
  getFront(): T | undefined {
    return this.list.getHead();
  }

  /**
   * Get the element at the rear without removing it
   * @returns The element at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return this.list.getTail();
  }

  /**
   * Check if the deque is empty
   * @returns True if the deque is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Check if the deque is full
   * @returns True if the deque is full, false otherwise
   */
  isFull(): boolean {
    return this.maxSize !== undefined && this.list.size() >= this.maxSize;
  }

  /**
   * Peek at the front element without removing it
   * @returns The element at the front or undefined if empty
   */
  peek(): T | undefined {
    return this.getFront();
  }

  /**
   * Get the current size of the deque
   * @returns The number of elements in the deque
   */
  size(): number {
    return this.list.size();
  }
}
```

Now, let's go through the methods:

- `enqueueFront()`: This method allows adding an element to the **front** of the deque, unlike in `SimpleQueue` or `CircularQueue` which only support adding to the rear. Internally, it uses `list.prepend(item)` to insert the item at the head.<br/>This operation makes the deque suitable for use cases where elements need to be pushed and popped from both ends, like in undo/redo systems or task schedulers.
- `enqueueRear()`: This behaves similarly to `SimpleQueue`’s `enqueue`, adding elements to the **rear** using `list.append(item)`.<br/>The distinction in `Deque` is that this is just one of two symmetric operations and it gives you full double-ended control.
- `dequeueFront()`: This removes and returns the element from the **front** of the deque using `list.deleteHead()`.<br/>While similar to the `dequeue` method in queues, the naming here is explicit to clarify that it's operating on the front and can be paired with a rear counterpart.
- `dequeueRear()`: This is a unique feature to deques, it removes and returns the element at the **rear** using `list.deleteTail()`. This complements `dequeueFront()` and enables LIFO (stack-like) behavior if needed.
- **Constructor Difference**: Like `SimpleQueue`, the `Deque` accepts an optional `maxSize`. This allows for flexible configurations.<br/>You can have unbounded deques when `maxSize` is not provided, or fixed-size deques when constraints are important. This is in contrast to `CircularQueue`, which requires a max size.

Once you have completed the implementation, run the following command to test the module:

```sh
npm run test:file 04
```

Now, you're ready to move on to the last section of the tutorial, where you'll learn about the Priority Queue.

---

## What is a Priority Queue?

A priority queue processes items based on their priority, not their order of arrival.

Higher-priority items are removed first, like an emergency room where patients with severe conditions are treated before others.

Let’s modify <FontIcon icon="fas fa-folder-open"/>`src/playground/`<FontIcon icon="iconfont icon-typescript"/>`05-priority-queue.ts`:

```ts :collapsed-lines title="playground/05-priority-queue.ts"
import { LinkedList, NodeItem } from "./01-linked-list";

/**
 * Interface for an element with priority
 */
interface PriorityItem<T> {
  value: T;
  priority: number;
}

/**
 * Priority Queue implemented with a circular doubly linked list
 */
export class PriorityQueue<T> {
  private list: LinkedList<PriorityItem<T>>;
  private maxSize?: number;

  /**
   * @param maxSize Optional maximum size of the priority queue
   */
  constructor(maxSize?: number) {
    this.list = new LinkedList<PriorityItem<T>>();
    this.maxSize = maxSize;
  }

  /**
   * Add an element to the queue based on its priority
   * Higher priority numbers are dequeued first
   * @param value The value to add
   * @param priority The priority of the value (higher number = higher priority)
   */
  enqueue(value: T, priority: number): void {
    if (this.isFull()) {
      throw new Error("Priority queue is full");
    }

    const newItem: PriorityItem<T> = { value, priority };
    if (this.isEmpty()) {
      this.list.prepend(newItem);
      return;
    }

    let current = this.list["head"];
    let count = 0;
    while (
      current &&
      current.value.priority >= priority &&
      count < this.size()
    ) {
      current = current.next;
      count++;
    }

    if (count === this.size()) {
      this.list.append(newItem);
    } else {
      const newNode = new NodeItem(newItem);
      newNode.next = current;
      newNode.prev = current!.prev;
      if (current!.prev) {
        current!.prev.next = newNode;
      } else {
        this.list["head"] = newNode;
      }
      current!.prev = newNode;
      if (current === this.list["head"]) {
        this.list["head"] = newNode;
      }
      this.list["tail"]!.next = this.list["head"];
      this.list["head"]!.prev = this.list["tail"];
      this.list["currentSize"]++;
    }
  }

  /**
   * Remove and return the element with the highest priority from the queue
   * @returns The value with the highest priority or undefined if empty
   */
  dequeue(): T | undefined {
    return this.list.deleteHead()?.value;
  }

  /**
   * Get the element with the highest priority without removing it
   * @returns The value at the front or undefined if empty
   */
  getFront(): T | undefined {
    return this.list.getHead()?.value;
  }

  /**
   * Get the element with the lowest priority without removing it
   * @returns The value at the rear or undefined if empty
   */
  getRear(): T | undefined {
    return this.list.getTail()?.value;
  }

  /**
   * Check if the queue is empty
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  /**
   * Check if the queue is full
   * @returns True if the queue is full, false otherwise
   */
  isFull(): boolean {
    return this.maxSize !== undefined && this.list.size() >= this.maxSize;
  }

  /**
   * Peek at the element with the highest priority without removing it
   * @returns The value at the front or undefined if empty
   */
  peek(): T | undefined {
    return this.getFront();
  }

  /**
   * Get the current size of the queue
   * @returns The number of elements in the queue
   */
  size(): number {
    return this.list.size();
  }
}
```

Let's understand how the methods work within a Priority Queue:

- `enqueue()`: This method inserts a new element into the queue based on its `priority`. Unlike other queue types where order is based on insertion time, `PriorityQueue` uses a sorting mechanism where elements with higher `priority` values are placed closer to the front.<br/>The method traverses the linked list from the head, searching for the correct position where the new item should be inserted so that the list remains sorted in descending priority order.<br/>It manually adjusts the `prev` and `next` pointers to keep the circular doubly linked list intact. This sorting during insertion ensures quick access to the highest priority element later.
- `dequeue()`: This method removes and returns the element with the highest priority, which is always positioned at the front of the list.<br/>Internally, it calls `deleteHead()` and then returns the `value` from the `PriorityItem<T>` node. Because items are sorted during insertion, this operation is always efficient and retrieves the correct item.
- `getFront()`: This retrieves the value at the front of the queue without removing it. Since the list is sorted in descending priority, this value always represents the highest priority item.
- `getRear()`: This returns the value at the rear of the queue, which is the item with the **lowest** priority. It accesses the last element in the list using `getTail()` and extracts the `value`.
- `isEmpty()`: This checks whether the queue contains any elements by delegating to the linked list’s `isEmpty()` method.
- `isFull()`: This checks whether the queue has reached its maximum allowed size. It compares the current size with `maxSize` if it's defined.
- `peek()`: This is functionally equivalent to `getFront()`. It provides a clearer semantic name when users want to examine the highest-priority element without removing it.
- `size()`: This returns the total number of items currently in the priority queue. It's useful for monitoring capacity or debugging.

::: important Key Differences

The priority queue differs from other queue types by enforcing order during insertion based on a numeric priority.

This enables **constant-time access to the highest priority element** but introduces **linear-time insertion** complexity due to the need to find the correct place for each new element.

It supports advanced scheduling and load balancing use cases where task urgency or importance matters more than arrival time.

![Flowchart illustrating the process of inserting an element into a priority queue. It begins by checking if the queue is empty, then assesses priority, updates the queue, traverses it if necessary, and continually checks for the correct position to insert.](https://cdn.hashnode.com/res/hashnode/image/upload/v1749743948626/78505f93-d7fd-4c63-b59a-5db1edcdae6c.png)

:::

Once you’re done with the implementation, run the following command to test your code:

```sh
npm run test:file 05
```

That’s it, congratulations!

You have successfully completed the tutorial and learned about queues and their different variations. Great job!

Before reaching conclusions, let’s briefly learn about where to use queues and where to avoid them. We’ll also discuss the bottlenecks and issues that queues may create if not used correctly and in the right place.

---

## When to Use Queues (and When to Avoid Them)

Queues are ideal in scenarios where tasks or data must be processed in the exact order they arrive, such as in job scheduling and event handling systems.

For example, when multiple print jobs are sent to a printer, a queue can make sure each document is printed in the order it was submitted.

Similarly, queues are used in operating systems for managing tasks in thread pools or CPU scheduling (for example, Round Robin), where order is crucial.

Queues are also heavily used in asynchronous communication systems such as message brokers like RabbitMQ and Kafka.

In these systems, producers and consumers operate independently: a producer pushes messages into the queue, and a consumer processes them later.

This pattern is extremely useful in microservices architecture or serverless environments, where different parts of a system need to remain loosely coupled and highly scalable.

Similarly, in real-time systems like video streaming or sensor data ingestion, queues help buffer incoming data to avoid data loss and allow for smooth downstream processing.

### When to Avoid Queues

Queues are not well-suited for problems that require random access to elements, complex search operations, or sorting.

Since queues typically allow insertion at one end and removal from the other, they’re inefficient for use cases where you frequently need to access elements in the middle or search through all items.

An array, tree, or hash map would serve better in such cases.

Using queues inappropriately can introduce unnecessary complexity and hidden bottlenecks.

For instance, blindly placing a queue between every microservice might decouple components but also make debugging and failure handling more difficult.

Over-queuing can also lead to backpressure problems where queues grow uncontrollably under high load which will increase latency or even crashing the system if not managed properly.

So you should use queues deliberately: when order, buffering, or async processing is required.

---

## Conclusion

Queues are a basic data structure that work well when you need order and async processing.

Queues are useful for handling tasks, streaming data, or coordinating services, and making sure things run smoothly and efficiently.

But they aren't suitable for every problem. It's important to understand their pros and cons to use them correctly and avoid unnecessary complexity.

Thanks for following along with this tutorial. You can follow me on [X (<FontIcon icon="fa-brands fa-x-twitter"/>`Yazdun`)](https://x.com/Yazdun), where I share more useful tips on data structures and web development.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with Queues in TypeScript",
  "desc": "A queue is a collection of items arranged in a First-In-First-Out (FIFO) order. This means that the first item added is the first to be removed, much like a supermarket line where customers are served in the order they arrive. In this hands-on tutor...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-queues-in-typescript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
