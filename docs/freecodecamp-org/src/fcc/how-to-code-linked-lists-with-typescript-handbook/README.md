---
lang: en-US
title: "How to Code Linked Lists with TypeScript: A Handbook for Developers"
description: "Article(s) > How to Code Linked Lists with TypeScript: A Handbook for Developers"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typesccript
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Code Linked Lists with TypeScript: A Handbook for Developers"
    - property: og:description
      content: "How to Code Linked Lists with TypeScript: A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-code-linked-lists-with-typescript-handbook/
prev: /programming/ts/articles/README.md
date: 2025-06-03
isOriginal: false
author:
  - name: Yazdun
    url : https://freecodecamp.org/news/author/Yazdun/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748874008549/f7890467-2c7d-4558-a3ca-6094400530bc.png
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

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Code Linked Lists with TypeScript: A Handbook for Developers"
  desc="A linked list is a data structure where each item, called a node, contains data and a pointer to the next node. Unlike arrays, which store elements in contiguous memory, linked lists connect nodes that can be scattered across memory. In this hands-on..."
  url="https://freecodecamp.org/news/how-to-code-linked-lists-with-typescript-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748874008549/f7890467-2c7d-4558-a3ca-6094400530bc.png"/>

A linked list is a data structure where each item, called a node, contains data and a pointer to the next node.

Unlike arrays, which store elements in contiguous memory, linked lists connect nodes that can be scattered across memory.

In this hands-on tutorial, you’ll build linked lists from scratch in TypeScript, starting with a basic singly linked list and progressing to advanced variations like doubly linked lists and circular lists.

---

## Here’s What We’ll Cover

(1/8) [Getting Started](#heading-getting-started)
(2/8) [What are Linked Lists?](#heading-what-are-linked-lists)
(3/8) [What is a Singly Linked List?](#heading-what-is-a-singly-linked-list)
(4/8) [What is a Doubly Linked List?](#heading-what-is-a-doubly-linked-list)
(5/8) [What is a Circular Linked List?](#heading-what-is-a-circular-linked-list)
(6/8) [What is a Circular Singly Linked List?](#heading-what-is-a-circular-singly-linked-list)
(7/8) [What is a Circular Doubly Linked List?](#heading-what-is-a-circular-doubly-linked-list)
(8/8) [When to Use Linked Lists (and When to Avoid Them)](#heading-when-to-use-linked-lists-and-when-to-avoid-them)

::: note Prerequisites

1. **TypeScript:** You need to know [**TypeScript basics**](/freecodecamp.org/learn-typescript-with-react-handbook/README.md), such as interfaces, types, and classes.
2. **Algorithm fundamentals:** You need a basic understanding of data structures and algorithms. For example, you should be comfortable analyzing time and space complexity using [**Big-O notation**](/freecodecamp.org/big-o-cheat-sheet-time-complexity-chart.md).

:::

---

## Getting Started

To get started with this tutorial, you’ll use a playground project designed to help you implement linked lists and follow each step hands-on.

Clone the project from the [GitHub repository (<VPIcon icon="iconfont icon-github"/>`Yazdun/fcc-linked-list`)](https://github.com/Yazdun/fcc-linked-list) and code along with the tutorial.

The project structure is as follows:

```plaintext title="file structure"
fcc-linked-list/
├── src/
│   ├── examples/
│   │   ├── circular-1.ts
│   │   ├── circular-2.ts
│   │   ├── doubly.ts
│   │   └── singly.ts
│   └── playground/
│       ├── circular-1.ts
│       ├── circular-2.ts
│       ├── doubly.ts
│       └── singly.ts
```

The `examples` directory contains the final version of each implementation. If you get stuck, you can look at these solutions as a last resort!

---

## What are Linked Lists?

A linked list is a collection of elements called nodes, where each node contains data and a pointer to the next node, with the last node’s pointer typically pointing to `null` to mark the end of the list.

Some linked lists have extra pointers to speed up changes anywhere in the list. But finding a node can be slow because you have to follow each pointer one by one and can't jump directly to a node.

Linked lists are the foundation for data structures like queues and stacks. The linked lists you create in this tutorial will support many other data structures.

While linked lists can perform many operations, this tutorial will focus on the following:

- **prepend:** adds a node to the beginning of the list.
- **append:** adds a node to the end of the list.
- **delete:** removes a specific node from the list.
- **deleteTail:** removes the last node in the list.
- **deleteHead:** removes the first node in the list.
- **insertAt:** inserts a node at a specific position.
- **find:** searches for and returns a node in the list.
- **traverse:** visits each node in the list, usually from head to tail, for reading or processing data.

Once you understand these basic operations, you'll be able to implement any operation on your linked lists.

Now that you understand the concept, let's move to the next section and create your first linked list.

---

## What is a Singly Linked List?

In this first section, you'll create the simplest type of linked list, called a Singly Linked List.

It's called "Singly Linked" because each node points to only one other node, which is the next one in the list.

![Diagram of a singly linked list with four nodes labeled A, B, C, and D. It starts with the head at Node A and ends with the tail at Node D, pointing to NULL. Each node points to the next node in sequence.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748530545447/8dbffb8d-c941-4c57-934b-22c0335bdd6b.png)

### How to Create a Generic Node Structure for a Singly Linked List

To start building a singly linked list, you need a `Node` structure that holds two main parts:

- **data**: Stores the node’s value.
- **Next pointer**: Links to the next node in the list or `null` if there’s no next node.

Open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`singly.ts`, where you'll find a class named `N`. Change it to the following code to set up the node structure:

```ts title="src/playground/singly.ts"
class N<T> {
  /** Node value */
  public data: T;
  /** Next node reference */
  public next: N<T> | null = null;

  /** Creates a node with given value */
  constructor(value: T) {
    this.data = value;
  }
}
```

Here’s how the node structure works:

1. Builds a [<VPIcon icon="iconfont icon-typescript"/>generic](https://typescriptlang.org/fr/docs/handbook/2/generics.html) `Node`: Uses `<T>` to handle any data type.
2. Stores the node’s value: Assigns the value to the `data` property.
3. Link to the next node: Sets the `next` pointer to the next node or `null` if there isn't one.
4. Initializes the node: Takes a value in the constructor and assigns it to `data`.

Now, you can use the `N` class to create nodes in your singly linked list.

### How to Implement a Singly Linked List

Let's use the Node class you just created to build your singly linked list.

Open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`singly.ts` where you'll find the `SinglyLinkedList` class with a `head` pointer and several methods:

```ts :collapsed-lines title="src/playground/singly.ts"
class N<T> {
  /** Node value */
  public data: T;
  /** Next node reference */
  public next: N<T> | null = null;

  /** Creates a node with given value */
  constructor(value: T) {
    this.data = value;
  }
}

/** Singly linked list implementation */
export class SinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  /** Adds node to list start */
  prepend(val: T): void {}

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes head node */
  deleteHead(): void {}

  /** Removes tail node */
  deleteTail(): void {}

  /** Removes first node with given value */
  delete(data: T): void {}

  /** Finds node with given value */
  find(data: T): N<T> | null {
    return null;
  }

  /** Logs all node values */
  traverse(): void {}

  /** Inserts node at given position */
  insertAt(pos: number, data: T): void {}
}
```

By the end of this section, you'll create each of these methods. But first, let's discuss the `head` pointer.

### What is the `head` Pointer in a Linked List?

The `head` is the first node in the list, and you begin from `head` when going through the list.

You follow each node's `next` pointer until you get to the last node, where next is `null`.

If `head` is `null`, the list is empty.

A non-empty singly linked list needs a head to be valid, or it’s broken.

With this knowledge, you're ready to start working on the operations.

### How to Prepend a Node in a Singly Linked List

The goal is to add a new node to the beginning of your singly linked list and update the `head` pointer to this new node.

Modify the `prepend` method in your `SinglyLinkedList` class in <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`singly.ts`:

```ts title="src/playground/singly.ts"
prepend(data: T): void {
  const newNode = new N(data);
  newNode.next = this.head;
  this.head = newNode;
}
```

The `data` prop holds the value for the new node. Here’s how `prepend` works:

- Creates a new node with the given `data`.
- Points the new node’s `next` to the current `head`.
- Sets the `head` to the new node.

Now, the `head` points to the new node, and the previous `head` is the second node in the list.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Append a Node in a Singly Linked List

The goal is to add a new node to the end of your singly linked list.

Change the `append` method in your `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
append(data: T): void {
  const newNode = new N(data);

  if (!this.head) {
    this.head = newNode;
    return;
  }

  let current = this.head;

  while (current.next) {
    current = current.next;
  }

  current.next = newNode;
}
```

To add a new node to the end of the list, you first need to find the last node. In a non-empty singly linked list, the last node's `next` pointer always points to `null`.

In other words, to find the last node in a non-empty singly linked list, look for the node whose `next` pointer is `null`.

To append a new node, you should follow these steps:

- Create a new node with the given value.
- Check if the `head` is `null`. If it is, the list is empty, so set the `head` to the new node.
- If the list has nodes, find the last node by looping through the list.
- Start with a new pointer called `current` at the `head`.
- Keep moving `current` to the `next` node until you hit a node with no `next` node (where `next` is `null`).
- Link the last node’s next to the new node.

Now, the new node is the last node, and its `next` points to `null`.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the last node.

### How to Delete the `head` of a Singly Linked List

The goal is to delete the `head` of the list. Go ahead and update the `deleteHead` method in your `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
deleteHead(): void {
  if (this.head) {
    this.head = this.head.next;
  }
}
```

You just need to move the `head` pointer to the second node in the list. The second node is `head.next`, so all you have to do is set `head` to `head.next`.

And just like that, the old `head` is deleted!

### How to Delete the Last Node of a Singly Linked List

The goal is to delete the last node, called the `tail`, from your singly linked list.

The `tail` is the node whose `next` pointer is `null`.

Modify the `deleteTail` method in your `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
deleteTail(): void {
  if (!this.head) return;

  if (!this.head.next) {
    this.head = null;
    return;
  }

  let current = this.head;

  while (current.next && current.next.next) {
    current = current.next;
  }
  current.next = null;
}
```

Here’s how `deleteTail` works:

1. If the list is empty, it stops the operation because there is no `tail` to remove.
2. If the head's `next` is `null`, the list has only one node, which serves as both the `head` and the `tail`. To empty the list, simply set the `head` to `null`.
3. If the list has more than one node, it finds the node right before the `tail`. It starts with a pointer called `current` at the `head`.
4. It moves `current` forward until its `next` node is the `tail`. Then, it sets the `next` pointer of this node to `null` to make it the `tail`.
5. Now, the last node is removed, and the new `tail`’s `next` points to `null`.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the node before the `tail`.

### How to Delete a Node from a Singly Linked List

The goal is to remove the first occurrence of a node with a given value from your singly linked list.

Let's start by changing the `delete` method in your `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
delete(data: T): void {
  if (!this.head) return;

  if (this.head.data === data) {
    this.head = this.head.next;
    return;
  }

  let current = this.head;

  while (current.next) {
    if (current.next.data === data) {
      current.next = current.next.next;
      return;
    }
    current = current.next;
  }
}
```

Here’s how `delete` works:

- The `data` prop is the value to find and remove
- If the list is empty, it stops the operation because there is nothing to delete.
- It checks if the `head` node’s value matches `data` prop. If it does, you don’t need to search further because the `head` is the node to delete, so it moves the `head` to `head.next` to remove the old `head`.
- If the `head` doesn't match, it creates a new pointer called `current` starting at the `head`.
- It moves `current` through the list as long as there is a next node, and checks if the next node's value matches the `data` prop.
- If a match is found, it removes the `next` node by connecting `current`’s `next` to the node after it.
- This takes the matched node out of the list because `current` now points to the node after the one you want to remove.
- If no match is found, it keeps moving `current` to the next node until the end.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the node.

### How to Find a Node in a Singly Linked List

The goal is to find the first occurrence of a node with the given value.

Modify the `find` method inside the `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
find(data: T): N<T> | null {
  if (!this.head) return null;

  let current: N<T> | null = this.head;

  while (current) {
    if (current.data === data) return current;
    current = current.next;
  }

  return null;
}
```

The `data` prop is the value you're searching for.

Here's how `find` works:

- If the `head` is `null`, it returns `null` because the list is empty and there are no nodes to find.
- It creates a new pointer called `current` at the `head`.
- It moves `current` through the list while it exists and checks if its value matches `data`.
- If a match is found, it returns the `current` node because it holds the value you’re looking for.
- If no match is found, it moves `current` to the `next` node and keeps checking until the end.
- If you reach the end without a match, it returns `null`.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the node.

### How to Insert a Node at a Specific Position in a Singly Linked List

The goal is to add a new node at a specific position in your singly linked list.

Modify the `insertAt` method in your `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
insertAt(pos: number, data: T): void {
  const newNode = new N(data);
  let current: N<T> | null = this.head;

  if (pos < 0) throw new Error("failed");

  if (pos === 0) {
    newNode.next = this.head;
    this.head = newNode;
    return;
  }

  let idx = 0;

  while (current && idx < pos - 1) {
    current = current.next;
    idx++;
  }

  if (!current) throw new Error("failed");

  newNode.next = current.next;
  current.next = newNode;
}
```

The `pos` prop is the position in the list, and `data` is the value.

Here’s how `insertAt` works:

- It creates a new node with the given value.
- If the `pos` is negative, it stops the operation with an error because it's not valid.
- If `pos` is 0, it inserts the node at the head. It links the new node's `next` to the current `head`, makes the new node the head, and stops the operation.
- If the position is not 0, then it creates a pointer called `current` at the head and a counter called `idx` at 0.
- It moves `current` through the list until you reach the node just before the desired position, increasing `idx` as you go.
- If you reach the end of the list or the position is too large, it stops with an error.
- It links the new node's `next` to the node that is currently after the `current` node.
- It links `current`’s `next` to the new node to insert it in the list.

This runs in $O\left(n\right)$ time because you may need to traverse the list to find the insertion point.

### How to Traverse a Singly Linked List

The goal is to log the values of all nodes in your singly linked list.

Modify the `traverse` method inside the `SinglyLinkedList` class:

```ts title="src/playground/singly.ts"
traverse(): void {
  let current = this.head;
  while (current) {
    console.log(current.data);
    current = current.next;
  }
}
```

Here's how `traverse` works:

- It starts by setting the `current` pointer to `head` to begin at the start of the list. If `head` is `null`, the list is empty.
- If there are nodes in the list, it uses a `while (current)` loop to visit each one. In each loop, it logs `current.data` to display the node's value, then moves the `current` pointer to `current.next` to go to the next node.
- This loop continues until `current` becomes `null`, meaning you've reached the end of the list.

Overall, the time complexity is $O\left(n\right)$ due to traversing the whole list.

### How to Test Your Singly Linked List

Congratulations! You've successfully created your singly linked list.

Here's what the final code should look like:

```ts :collapsed-lines title="src/playground/singly.ts"
/** Node for singly linked list */
class N<T> {
  /** Node value */
  public data: T;
  /** Next node reference */
  public next: N<T> | null = null;

  /** Creates a node with given value */
  constructor(value: T) {
    this.data = value;
  }
}

/** Singly linked list implementation */
export class SinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  /** Adds node to list start */
  prepend(data: T): void {
    const newNode = new N(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  /** Adds node to list end */
  append(data: T): void {
    const newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  /** Removes head node */
  deleteHead(): void {
    if (this.head) {
      this.head = this.head.next;
    }
  }

  /** Removes tail node */
  deleteTail(): void {
    if (!this.head) return;

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }

    current.next = null;
  }

  /** Removes first node with given value */
  delete(data: T): void {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;

    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        return;
      }

      current = current.next;
    }
  }

  /** Finds node with given value */
  find(data: T): N<T> | null {
    if (!this.head) return null;

    let current: N<T> | null = this.head;

    while (current) {
      if (current.data === data) return current;
      current = current.next;
    }

    return null;
  }

  /** Logs all node values */
  traverse(): void {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  /** Inserts node at given position */
  insertAt(pos: number, data: T): void {
    const newNode = new N(data);
    let current: N<T> | null = this.head;

    if (pos < 0) throw new Error("failed");

    if (pos === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let idx = 0;

    while (current && idx < pos - 1) {
      current = current.next;
      idx++;
    }

    if (!current) throw new Error("failed");

    newNode.next = current.next;
    current.next = newNode;
  }
}
```

After you finish the implementation, run the following command to test your singly linked list:

```sh
npm run test:file singly
```

If any tests fail, you can use <VPIcon icon="fas fa-folder-open"/>`src/examples/`<VPIcon icon="iconfont icon-typescript"/>`singly.ts` to find and fix the issue, and then run the tests again.

That's it! You've successfully built a linked list and learned how to create nodes that point to the next node and perform operations on them.

While singly linked lists are useful, they have a big limitation: each node only points to the next node.

Wouldn't it be great if nodes could also point to the previous node? This would let us do many more operations with our linked list.

That's exactly what you will learn in the next section.

---

## What is a Doubly Linked List?

In this section, you’ll create a Doubly Linked List. It’s called "Doubly Linked" because each node points to both the next and previous nodes in the list.

![Diagram of a doubly linked list with nodes labeled A to D. Arrows indicate the "next" and "prev" connections between nodes, with Node A as the head and Node D as the tail. The tail points to NULL.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748530715135/52d0559e-0767-45cf-93b6-b236ba890740.png)

First, let’s look at the node structure in a doubly linked list, and then you’ll implement the operations in the actual linked list.

### How to Create a Generic Node Structure for a Doubly Linked List

The node structure in doubly linked lists is similar to singly linked lists, except it has an additional pointer to point to the previous node.

The Node structure in a doubly linked list consists of three parts:

- **data**: Stores the node’s value.
- **Next pointer**: Links to the next node in the list or `null` if there’s no next node.
- **Previous pointer**: Links to the previous node in the list or `null` if there’s no previous node.

Open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`doubly.ts` and modify the `N` class with the following code to set up the node structure:

```ts title="src/playground/doubly.ts"
export class N<T> {
  data: T;
  next: N<T> | null;
  prev: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
```

Here’s how the node structure works:

- It builds a [<VPIcon icon="iconfont icon-typescript"/>generic](https://typescriptlang.org/fr/docs/handbook/2/generics.html) `Node`: Uses `<T>` to handle any data type, such as numbers or strings.
- It stores the node’s value: Assigns the value to the `data` property.
- It links to the next node: Sets the `next` pointer to the next node or `null` if there isn’t one.
- It links to the previous node: Sets the `prev` pointer to the previous node or `null` if there isn’t one.

Then, the `constructor` sets the `data` when you create a new node.

### How to Implement a Doubly Linked List

Now that the Node class is ready, you can start building the actual list.

Open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`doubly.ts` and take a look at the `DoublyLinkedList` class:

```ts :collapsed-lines title="src/playground/doubly.ts"
export class N<T> {
  data: T;
  next: N<T> | null;
  prev: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList<T> {
  /** Head node */
  public head: N<T> | null;
  /** Tail node */
  public tail: N<T> | null;
  /** List length */
  public len: number;

  /** Creates an empty list */
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /** Adds node to list start */
  prepend(data: T): void {}

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes and returns head node data */
  deleteHead(): T | null {
    return null;
  }

  /** Removes and returns tail node data */
  deleteTail(): T | null {
    return null;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    return false;
  }

  /** Finds node at given index */
  find(idx: number): N<T> | null {
    return null;
  }

  /** Returns array of node data */
  traverse(dir: "forward" | "backward" = "forward"): T[] {
    return [];
  }

  /** Inserts node at given index */
  insertAt(idx: number, data: T): boolean {
    return false;
  }
}
```

This class has two pointers, `head` and `tail`, and a variable called `len`:

- `head`: This always points to the first item in your list.
- `tail`: This always points to the last item in your list.
- `len`: This represents the length of your linked list. Each time you modify the list by adding or removing a node, you need to update `len` to reflect the correct length.

A valid doubly linked list will always have a `head` and a `tail`. If either the `head` or `tail` is `null`, it means the list is empty and has no nodes.

That's why you initially set the `head` and `tail` to `null`. When you create a list, it's empty at first. As you add a node to the list, you update the pointers to point to the new node.

Now, let's move on to the next section and see how you can add a node to your doubly linked list.

### How to Prepend a Node in a Doubly Linked List

The goal is to add a new node to the beginning of your doubly linked list and update the `head` pointer to this new node.

Modify the `prepend` method in your `DoublyLinkedList` class located in <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`doubly.ts`:

```ts title="src/playground/doubly.ts"
prepend(data: T): void {
  let newNode = new N(data);

  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    let prevHead = this.head;
    newNode.next = prevHead;
    prevHead.prev = newNode;
    this.head = newNode;
  }

  this.len++;
}
```

The `data` prop holds the value for the new node. Here’s how `prepend` works:

- It creates a new node with the given data.
- If the list is empty (`head` is `null`), it sets both the `head` and `tail` to the new node.
- If the list has nodes, it points the new node’s `next` to the current `head`.
- It points the current `head`’s `prev` to the new node.
- It sets the `head` to the new node.
- It increases the list’s length by one.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Append a Node in a Doubly Linked List

The goal is to add a new node to the end of your doubly linked list and update the `tail` pointer to this new node.

Modify the append method in your `DoublyLinkedList`:

```ts title="src/playground/doubly.ts"

append(data: T): void {
  let newNode = new N(data);
  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail!.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  this.len++;
}
```

Here’s how `append` works:

- The `data` prop holds the value for the new node.
- It makes a new node with the given data.
- It checks if the list is empty (`head` is `null`), and sets both the `head` and `tail` to the new node.
- If the list has nodes, it points the current `tail`’s next to the new node.
- It points the new node’s `prev` to the current tail.
- It sets the `tail` to the new node.
- It increases the list’s length by one.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Delete the Head of a Doubly Linked List

The goal is to remove the first node from your doubly linked list and return its data.

Modify the `deleteHead` method in your `DoublyLinkedList`:

```ts title="src/playground/doubly.ts"
deleteHead(): T | null {
  if (!this.head) return null;

  let removedItem = this.head;

  if (this.len === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = removedItem.next;
    this.head!.prev = null;
    removedItem.next = null;
  }

  this.len--;

  return removedItem.data;
}
```

Here’s how `deleteHead` works:

- If the list is empty, it returns `null` because there’s no node to remove.
- It creates a new variable called `removedItem` and stores the `head` node in it as the item to be removed.
- If the list’s length is 1, it means the list has only one node, which acts as both the `head` and `tail` of the list. In this case, it sets both the `head` and `tail` to `null`.
- If the list has multiple nodes, it moves the `head` to the next node.
- It sets the new `head`'s `prev` to `null` since it’s now the first node.
- It clears the removed node’s `next` pointer.
- It decreases the list’s length by one.
- It returns the removed node’s data.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Delete the Last Node of a Doubly Linked List

The goal is to remove the last node from your doubly linked list and return its data.

Modify the `deleteTail` method in your `DoublyLinkedList`:

```ts title="src/playground/doubly.ts"
deleteTail(): T | null {
  if (!this.tail) return null;

  let removedItem = this.tail;

  if (this.len === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = this.tail.prev;
    this.tail!.next = null;
    removedItem.prev = null;
  }

  this.len--;

  return removedItem.data;
}
```

Here’s how `deleteTail` works:

- It checks if the list is empty. If the `tail` is `null`, it returns `null` because there’s no node to remove.
- It saves the `tail` node in a variable named `removedItem` as the node to be removed.
- It checks if the list has one node. If the length is 1, it sets both `head` and `tail` to `null`.
- If the list has multiple nodes, it moves the `tail` to the previous node.
- It sets the new `tail`'s `next` to `null` since it’s now the last node.
- It clears the removed node’s `prev` pointer.
- It decreases the list’s length by one.
- It returns the removed node’s data.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Delete a Node from a Doubly Linked List

The goal is to remove the first node with the given value from your doubly linked list and return `true` if successful.

Modify the `delete` method in your `DoublyLinkedList`:

```ts title="src/playground/doubly.ts"
delete(data: T): boolean {
  let current = this.head;

  if (!current) return false;

  if (current.data === data) {
    this.head = current.next;
    if (this.head) this.head.prev = null;
    else this.tail = null;
    this.len--;
    return true;
  }

  while (current.next) {
    if (current.next.data === data) {
      let nodeToRemove = current.next;
      current.next = nodeToRemove.next;
      if (current.next) current.next.prev = current;
      else this.tail = current;
      nodeToRemove.next = null;
      nodeToRemove.prev = null;
      this.len--;
      return true;
    }
    current = current.next;
  }

  return false;
}
```

The `data` prop is the value to find and remove.

Here’s how `delete` works:

- It checks if the list is empty - if the head is `null`, returns `false` because there’s nothing to delete.
- It checks if the `head` node’s value matches data and if it does, moves the `head` to the next node, sets the new `head`’s `prev` to `null` or clears the `tail` if empty, decreases the length, and returns `true`.
- If the `head` doesn’t match, it creates a new pointer called `current` at the head.
- It moves `current` through the list while a next node exists, checking if the next node’s value matches data.
- If a match is found, it skips the next node by linking `current`’s `next` to the node after it.
- It updates the next node’s `prev` to `current` or sets the `tail` to `current` if it’s the last node, clears the removed node’s pointers, decreases the length, and returns `true`.
- If no match is found, it moves `current` to the next node and keeps checking.
- If you reach the end without a match, it returns false.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the node.

### How to Find a Node in a Doubly Linked List

The goal is to find the node at a specific position in your doubly linked list.

Modify the `find` method in your `DoublyLinkedList`:

```ts title="src/playground/doubly.ts"
find(idx: number): N<T> | null {
  if (idx < 0 || idx >= this.len) return null;

  let current: N<T> | null = this.head;

  if (idx <= this.len / 2) {
    current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current!.next;
    }
  } else {
    current = this.tail;
    for (let i = this.len - 1; i > idx; i--) {
      current = current?.prev ?? null;
    }
  }

  return current;
}
```

The `idx` prop is the position in the list, starting at 0. Here’s how `find` works:

- It checks if the index is valid. If `idx` is negative or too large, it returns `null` because no node exists.
- It starts a new pointer called `current` at the `head`.
- It checks if `idx` is in the first half of the list. If it is, it moves `current` forward `idx` times using the `next` pointer.
- If `idx` is in the second half, it starts `current` at the `tail` and moves backward to the position using the `prev` pointer.
- It returns the `current` node, which is at the given index, or `null` if the list is empty.

This runs in $O\left(n\right)$ time because you may move through half the list to find the node.

### How to Traverse a Doubly Linked List

The goal is to return an array of all node data in your doubly linked list, either forward or backward. Modify the traverse method in your `DoublyLinkedList` class:

```ts title="src/playground/doubly.ts"
traverse(dir: "forward" | "backward" = "forward"): T[] {
  const isForward = dir === "forward";
  let current = isForward ? this.head : this.tail;
  const result: T[] = [];

  while (current) {
    result.push(current.data);
    current = isForward ? current.next : current.prev;
  }

  return result;
}
```

The `dir` prop sets whether to go forward (from `head` to `tail`) or backward (from `tail` to `head`).

Here’s how `traverse` works:

- It checks the direction and sets a flag to true if moving forward.
- It starts a new pointer called `current` at the `head` if forward, or the `tail` if backward.
- It creates an empty array to store the node data.
- While `current` exists, it adds its data to the array.
- It moves `current` to the next node if forward, or the previous node if backward.
- It returns the array with all node data.

This runs in $O\left(n\right)$ time because you may need to visit every node in the list.

### How to Insert a Node at a Specific Position in a Doubly Linked List

The goal is to add a new node at a specific index in your doubly linked list.

Modify the `insertAt` method in your `DoublyLinkedList` class:

```ts title="src/playground/doubly.ts"
insertAt(idx: number, data: T): boolean {
  if (idx < 0 || idx > this.len) return false;

  if (idx === 0) {
    this.prepend(data);
    return true;
  }

  if (idx === this.len) {
    this.append(data);
    return true;
  }

  let newNode = new N(data);
  let current = this.find(idx);

  if (!current) return false;

  newNode.next = current;
  newNode.prev = current?.prev ?? null;
  current.prev!.next = newNode;
  current.prev = newNode;

  this.len++;

  return true;
}
```

The `idx` prop is the position in the list, and `data` is the value.

Here’s how `insertAt` works:

- It checks if the index is invalid, if `idx` is negative or greater than the list’s length, returns `false`.
- If the index is 0, you are adding the new node at the beginning. Simply call `prepend` to add the node at the start and return `true`.
- If the index is equal to the list's length, you are adding the new node to the end of the list. In this case, you can call `append` to add the node at the end and return `true`.
- If the previous conditions are not met, it creates a new node with the given data.
- It finds the node at the given index using the `find` method and stores it as `current`.
- If no node is found at the index, it returns `false`.
- It points the new node’s `next` to `current`.
- It points the new node’s `prev` to `current`’s previous node.
- It points the previous node’s `next` to the new node.
- It points `current`’s `prev` to the new node.
- It increases the list’s length by one.
- It returns `true` to show the node was successfully inserted.

This runs in $O\left(n\right)$ time because finding the index may require traversing the list.

### How to Test Your Doubly Linked List

Awesome, what great progress! You've successfully implemented your doubly linked list. Here's what the final implementation should look like:

```ts :collapsed-lines title="src/playground/doubly.ts"
export class N<T> {
  data: T;
  next: N<T> | null;
  prev: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

/** Doubly linked list implementation */
export class DoublyLinkedList<T> {
  /** Head node */
  public head: N<T> | null;
  /** Tail node */
  public tail: N<T> | null;
  /** List length */
  public len: number;

  /** Creates an empty list */
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /** Adds node to list start */
  prepend(data: T): void {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let prevHead = this.head;
      newNode.next = prevHead;
      prevHead.prev = newNode;
      this.head = newNode;
    }

    this.len++;
  }

  /** Adds node to list end */
  append(data: T): void {
    let newNode = new N(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.len++;
  }

  /** Removes and returns head node data */
  deleteHead(): T | null {
    if (!this.head) return null;

    let removedItem = this.head;

    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedItem.next;
      this.head!.prev = null;
      removedItem.next = null;
    }

    this.len--;

    return removedItem.data;
  }

  /** Removes and returns tail node data */
  deleteTail(): T | null {
    if (!this.tail) return null;

    let removedItem = this.tail;

    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
      removedItem.prev = null;
    }

    this.len--;

    return removedItem.data;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    let current = this.head;

    if (!current) return false;

    if (current.data === data) {
      this.head = current.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
      this.len--;
      return true;
    }

    while (current.next) {
      if (current.next.data === data) {
        let nodeToRemove = current.next;
        current.next = nodeToRemove.next;
        if (current.next) current.next.prev = current;
        else this.tail = current;
        nodeToRemove.next = null;
        nodeToRemove.prev = null;
        this.len--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /** Finds node at given index */
  find(idx: number): N<T> | null {
    if (idx < 0 || idx >= this.len) return null;

    let current: N<T> | null = this.head;

    if (idx <= this.len / 2) {
      current = this.head;
      for (let i = 0; i < idx; i++) {
        current = current!.next;
      }
    } else {
      current = this.tail;
      for (let i = this.len - 1; i > idx; i--) {
        current = current?.prev ?? null;
      }
    }

    return current;
  }

  /** Returns array of node data */
  traverse(dir: "forward" | "backward" = "forward"): T[] {
    const isForward = dir === "forward";
    let current = isForward ? this.head : this.tail;
    const result: T[] = [];

    while (current) {
      result.push(current.data);
      current = isForward ? current.next : current.prev;
    }

    return result;
  }

  /** Inserts node at given index */
  insertAt(idx: number, data: T): boolean {
    if (idx < 0 || idx > this.len) return false;

    if (idx === 0) {
      this.prepend(data);
      return true;
    }

    if (idx === this.len) {
      this.append(data);
      return true;
    }

    let newNode = new N(data);
    let current = this.find(idx);

    if (!current) return false;

    newNode.next = current;
    newNode.prev = current?.prev ?? null;
    current.prev!.next = newNode;
    current.prev = newNode;

    this.len++;

    return true;
  }
}
```

Run the following command to make sure that your implementation is correct:

```sh
npm run test:file doubly
```

If the tests run successfully, you're good to go! If any tests fail, check <VPIcon icon="fas fa-folder-open"/>`src/examples/`<VPIcon icon="iconfont icon-typescript"/>`doubly.ts`, fix the issue, and run the tests again.

You've learned how to implement a linked node with two pointers. Doubly linked lists are useful in many scenarios, but like singly linked lists, they have a limitation you need to consider.

Let's say you have a music playlist, and every time you reach the end, you want to loop back to the first song instead of stopping.

In both singly and doubly linked lists, once you reach the end, there's no way to loop back to the first item because the last node points to `null`. So, what will you do if you want to create a music playlist using linked lists?

That's what you'll learn in the next section of this tutorial!

---

## What is a Circular Linked List?

So far, you've learned about singly and doubly linked lists, where the last item always points to `null`.

Sometimes, you need to go back to the first item after reaching the last one. In this case, the `tail`'s `next` pointer should point to the `head` instead of `null`.

This is what a circular linked list is. In circular linked lists, the `tail` points to the `head`, letting you keep going through the list without stopping.

In the next 2 sections, you'll learn about two types of circular linked lists:

- **Circular Singly Linked List:** Each node has one pointer to the next node, and the `tail` always points to the `head`.
- **Circular Doubly Linked List:** Each node has two pointers to the next and previous nodes. The `tail` points to the `head` as its next node, and the `head` points to the `tail` as its previous node.

Now, let's dive deeper and learn how to create each of these lists.

---

## What is a Circular Singly Linked List?

In a circular singly linked list, each node has only one pointer that points to the next node in the list. The main difference between a singly linked list and a circular singly linked list is the `tail` node.

In a circular singly linked list, the `tail` always points to the `head`, forming a circle that allows continuous looping through the list.

![Diagram of a circular singly linked list with nodes labeled A, B, C, and D. Arrows indicate the "next" pointers, forming a loop. The head points to Node A, and the tail points to Node D.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748531277470/15e7aafc-e499-47ec-a0b7-2b0e61867162.png)

Now, let's look at the node structure in a circular singly linked list.

### How to Create a Generic Node Structure for a Circular Singly Linked List

The `Node` structure in a circular singly linked list has two parts: the data and a pointer to the next node.

The `data` property holds the node's value, and `next` points to the next node in the list.

Open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`circular-1.ts` and modify the `N` class:

```ts title="src/playground/circular-1.ts"
/** Node for circular singly linked list */
export class N<T> {
  /** Node data */
  public data: T;
  /** Next node reference */
  public next: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
```

Here’s how the node structure works:

- It builds a [<VPIcon icon="iconfont icon-typescript"/>generic](https://typescriptlang.org/fr/docs/handbook/2/generics.html) Node: Uses `<T>` to handle any data type, such as numbers or strings.
- It stores the node’s value: Assigns the value to the data property.
- It links to the next node: Sets the `next` pointer to the next node, `null` only during initialization. In a valid circular list, next always connects to a node.
- It initializes the node: Takes a value in the constructor and assigns it to data.

In a valid circular linked list, `next` never stays `null`.

### How to Implement a Circular Singly Linked List

Once you have created your Node structure, you can start implementing the linked list.

To get started, let’s open <VPIcon icon="fas fa-folder-open"/>`src/playground/circular-1.ts`, where you'll find the `CircularSinglyLinkedList` class:

```ts :collapsed-lines title="src/playground/circular-1.ts"
export class N<T> {
  data: T;
  next: N<T> | null;
  prev: N<T> | null;

  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class CircularSinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  /** Adds node to list start */
  prepend(data: T): void {}

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes head node */
  deleteHead(): void {}

  /** Removes tail node */
  deleteTail(): boolean {
    return false;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    return false;
  }

  /** Finds data at given index */
  find(idx: number): T | null {
    return null;
  }

  /** Returns array of node data */
  traverse(): T[] {
    return [];
  }
}
```

You will complete each method by the end of this section.

Like in earlier implementations, `head` will point to the first item in the list. If it's `null`, the list is empty.

Now, let's go to the first method and learn how to add a node to the start of a circular linked list.

### How to Prepend a Node in a Circular Singly Linked List

The goal is to add a new node to the beginning of your circular singly linked list and update the head pointer to this new node.

Modify the prepend method in your `CircularSinglyLinkedList` class located in <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`circular-singly.ts`:

```ts title="src/playground/circular-singly.ts"
prepend(data: T) {
  let newNode = new N(data);

  if (!this.head) {
    this.head = newNode;
    newNode.next = newNode;
  } else {
    let last = this.head;

    while (last.next !== this.head) {
      if (!last.next) throw new Error("invalid list");
      last = last.next;
    }

    last.next = newNode;
    newNode.next = this.head;
    this.head = newNode;
  }
}
```

The `data` prop holds the value for the new node.

Here’s how `prepend` works:

- It creates a new node with the given value.
- Checks if the list is empty. If the `head` is `null`, it sets the head to the new node and points its `next` to itself to form a single-node circle.
- If the list has nodes, it finds the last node by moving through the list until it reaches the node whose `next` points to the head.
- It points the last node’s `next` to the new node.
- It points the new node’s `next` to the current `head`.
- It sets the `head` to the new node.
- Now, the new node is the head, and you’ve maintained the circular structure.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the last node.

### How to Append a Node in a Circular Singly Linked List

The goal is to add a new node to the end of your circular singly linked list and maintain the circular structure.

Let’s modify the append method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
append(data: T): void {
  let newNode = new N(data);

  if (!this.head) {
    this.head = newNode;
    newNode.next = this.head;
  } else {
    let last = this.head;

    while (last.next !== this.head) {
      if (!last.next) throw new Error("invalid list");
      last = last.next;
    }

    last.next = newNode;
    newNode.next = this.head;
  }
}
```

The `data` prop holds the value for the new node.

Here’s how `append` works:

- It creates a new node with the given value.
- It checks if the list is empty. If the `head` is `null`, it sets the `head` to the new node and points its `next` to itself to form a single-node circle.
- If the list has nodes, it finds the last node by moving through the list until it reaches the node whose `next` points to the `head`.
- It points the last node’s `next` to the new node.
- It points the new node’s `next` to the `head` to keep the list circular.
- Now, the new node is at the end, and you’ve maintained the circular structure.
- It increases the list’s length by one.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the last node.

### How to Delete the Head of a Circular Singly Linked List

The goal is to remove the first node from your circular singly linked list and update the `head` pointer.

Modify the `deleteHead` method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
deleteHead(): void {
  if (!this.head) return;

  if (this.head.next === this.head) {
    this.head = null;
    return;
  }

  let last = this.head;

  while (last.next !== this.head) {
    if (!last.next) throw new Error("invalid list");
    last = last.next;
  }

  let newHead = this.head.next;
  last.next = newHead;
  this.head = newHead;
}
```

Here’s how `deleteHead` works:

- It checks if the list is empty and stops the operation if the `head` is `null` because there’s no node to remove.
- It checks if the list has one node: if the `head`'s next points to itself, it sets the `head` to `null` to empty the list.
- If the list has multiple nodes, it finds the last node by moving through the list until it reaches the node whose next points to the `head`.
- It sets the current `head`’s `next` node as the new `head`.
- It points the tail node’s `next` to the new head to keep the list circular.
- It sets the head to the new head.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the last node.

### How to Delete the Last Node of a Circular Singly Linked List

The goal is to remove the last node from your circular singly linked list and maintain the circular structure.

Modify the `deleteTail` method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
deleteTail(): boolean {
  if (!this.head) return false;

  if (this.head.next === this.head) {
    this.head = null;
    return true;
  }

  let current: N<T> = this.head;
  let prev: N<T> | null = null;

  while (current.next !== this.head) {
    prev = current;
    current = current.next!;
  }

  prev!.next = this.head;
  return true;
}
```

Here’s how deleteTail works:

- It checks if the list is empty. If the `head` is `null`, it returns `false` because there’s no node to remove.
- It checks if the list has one node. If the `head`’s next points to itself, it sets the `head` to `null` and returns `true`.
- If the list has multiple nodes, it starts a new pointer called `current` at the `head` and a `prev` pointer at `null`.
- It moves `current` through the list until its next points to the `head`, keeping `prev` one node behind.
- It points `prev`’s `next` to the `head` to skip the last node and keep the list circular.
- It returns `true` to show the tail was removed.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the last node.

### How to Delete a Node from a Circular Singly Linked List

The goal is to remove the first node with the given value from your circular singly linked list and return `true` if successful.

Modify the `delete` method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
delete(data: T): boolean {
  if (!this.head) return false;

  if (this.head.data === data) {
    this.deleteHead();
    return true;
  }

  let current: N<T> = this.head;
  let prev: N<T> | null = null;

  do {
    if (current.data === data) {
      prev!.next = current.next;
      return true;
    }

    prev = current;
    current = current.next!;
  } while (current !== this.head);

  return false;
}
```

The data prop is the value to find and remove.

You must use a do-while loop instead of a simple while loop in the method because it ensures you always process the `head` node's data at least once before checking if you've returned to the `head`.

In a circular singly linked list, you start at the `head` and keep moving to the next node until you come back to the head.

A simple while loop might skip the `head` if checked first, but a do-while loop makes sure the `head`'s data is included.

Here’s how delete works:

- It checks if the list is empty. If the `head` is `null`, it returns `false` because there’s nothing to `delete`.
- It checks if the `head` node’s value matches data. If it does, it calls `deleteHead` to remove the head and returns `true`.
- If the `head` doesn’t match, it starts a new pointer called `current` at the `head` and a `prev` pointer at `null`.
- It moves `current` through the list, keeping `prev` one node behind, until it circles back to the head.
- If current’s value matches data, it links `prev`’s `next` to `current`’s `next` to skip the matched node.
- It returns `true` if a match is removed, or `false` if it finds no match after a full loop.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the node.

### How to Find a Node in a Circular Singly Linked List

The goal is to find the data at a specific index in your circular singly linked list.

Modify the `find` method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
find(idx: number): T | null {
  if (!this.head || idx < 0) return null;

  let current = this.head;
  let count = 0;

  do {
    if (!current.next) throw new Error("invalid list");

    if (count === idx) {
      return current.data;
    }

    count++;
    current = current.next;
  } while (current !== this.head);

  return null;
}
```

The `idx` prop is the position in the list.

Here’s how find works:

- It checks if the list is empty or the index is negative. If so, it returns `null` because no data exists.
- It creates a new pointer called `current` at the `head` and set a `counter` to 0.
- It moves `current` through the list, checking each node until it circles back to the `head`.
- If the `counter` equals `idx`, it returns the `current` node’s data.
- If not, it increases the `counter` and moves `current` to the next node.
- If you circle back to the `head` without finding the index, it returns `null`.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the index.

### How to Traverse a Circular Singly Linked List

The goal is to return an array of all node data in your circular singly linked list.

Modify the `traverse` method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
traverse(): T[] {
  if (!this.head) return [];
  const result: T[] = [];

  let current = this.head;

  do {
    result.push(current.data);
    current = current.next!;
  } while (current !== this.head);

  return result;
}
```

Here’s how traverse works:

- It checks if the list is empty. If the `head` is `null`, it returns an empty array.
- It creates an empty array to store the node data.
- It creates a new pointer called `current` at the `head`.
- It moves `current` through the list, adding each node’s data to the array.
- It continues moving `current` to the next node until you circle back to the `head`.
- It returns the array with all node data.

This runs in $O\left(n\right)$ time because you need to visit every node in the list.

### How to Insert a Node at a Specific Position in a Circular Singly Linked List

The goal is to add a new node at a specific index in your circular singly linked list.

Modify the `insertAt` method in your `CircularSinglyLinkedList` class:

```ts title="src/playground/circular-1.ts"
insertAt(data: T, idx: number): boolean {
  if (idx < 0) return false;

  if (idx === 0) {
    this.prepend(data);
    return true;
  }

  if (!this.head) {
    if (idx === 0) {
      this.prepend(data);
      return true;
    }
    return false;
  }

  let current: N<T> | null = this.head;
  let prev: N<T> | null = null;
  let count = 0;

  do {
    if (count === idx) {
      const newN = new N(data);
      newN.next = current;
      prev!.next = newN;
      return true;
    }
    prev = current;
    current = current!.next;
    count++;
  } while (current !== this.head);

  if (count === idx) {
    this.append(data);
    return true;
  }

  return false;
}
```

The `data` prop is the value, and `idx` is the position in the list.

Here’s how `insertAt` works:

- If the index is negative, it returns `false` because it’s invalid.
- If the index is 0, it calls `prepend` to add the node at the start and returns `true`.
- It creates a new pointer called `current` at the `head`, a `prev` pointer at `null`, and a counter at `0`.
- It moves `current` through the list, keeping `prev` one node behind, until you circle back to the `head`.
- If the counter equals `idx`, it creates a new node, point its `next` to `current`, points `prev`’s `next` to the new node, and returns `true`.
- If you circle back to the head and the counter equals `idx`, it calls `append` to add the node at the end and returns `true`.
- Finally, if the index is not found, it returns `false`.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the index.

### How to Test Your Circular Singly Linked List

Perfect! You are done with the circular singly linked list and now you are ready to test your implementation.

Your final implementation should look something like this:

```ts :collapsed-lines
/** Node for circular singly linked list */
export class N<T> {
  /** Node data */
  public data: T;
  /** Next node reference */
  public next: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

/** Circular singly linked list implementation */
export class CircularSinglyLinkedList<T> {
  /** Head node */
  public head: N<T> | null = null;

  /** Adds node to list start */
  prepend(data: T) {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
    } else {
      let last = this.head;

      while (last.next !== this.head) {
        if (!last.next) throw new Error("invalid list");
        last = last.next;
      }

      last.next = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  /** Adds node to list end */
  append(data: T): void {
    let newNode = new N(data);

    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head;
    } else {
      let last = this.head;

      while (last.next !== this.head) {
        if (!last.next) throw new Error("invalid list");
        last = last.next;
      }

      last.next = newNode;
      newNode.next = this.head;
    }
  }

  /** Removes head node */
  deleteHead(): void {
    if (!this.head) return;

    if (this.head.next === this.head) {
      this.head = null;
      return;
    }

    let last = this.head;

    while (last.next !== this.head) {
      if (!last.next) throw new Error("invalid list");
      last = last.next;
    }

    let newHead = this.head.next;
    last.next = newHead;
    this.head = newHead;
  }

  /** Removes tail node */
  deleteTail(): boolean {
    if (!this.head) return false;

    if (this.head.next === this.head) {
      this.head = null;
      return true;
    }

    let current: N<T> = this.head;
    let prev: N<T> | null = null;

    while (current.next !== this.head) {
      prev = current;
      current = current.next!;
    }

    prev!.next = this.head;
    return true;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    if (!this.head) return false;

    if (this.head.data === data) {
      this.deleteHead();
      return true;
    }

    let current: N<T> = this.head;
    let prev: N<T> | null = null;

    do {
      if (current.data === data) {
        prev!.next = current.next;
        return true;
      }

      prev = current;
      current = current.next!;
    } while (current !== this.head);

    return false;
  }

  /** Finds data at given index */
  find(idx: number): T | null {
    if (!this.head || idx < 0) return null;

    let current = this.head;
    let count = 0;

    do {
      if (!current.next) throw new Error("invalid list");

      if (count === idx) {
        return current.data;
      }

      count++;
      current = current.next;
    } while (current !== this.head);

    return null;
  }

  /** Returns array of node data */
  traverse(): T[] {
    if (!this.head) return [];
    const result: T[] = [];

    let current = this.head;

    do {
      result.push(current.data);
      current = current.next!;
    } while (current !== this.head);

    return result;
  }

  /** Inserts node at given index */
  insertAt(data: T, idx: number): boolean {
    if (idx < 0) return false;

    if (idx === 0) {
      this.prepend(data);
      return true;
    }

    if (!this.head) {
      if (idx === 0) {
        this.prepend(data);
        return true;
      }
      return false;
    }

    let current: N<T> | null = this.head;
    let prev: N<T> | null = null;
    let count = 0;

    do {
      if (count === idx) {
        const newN = new N(data);
        newN.next = current;
        prev!.next = newN;
        return true;
      }
      prev = current;
      current = current!.next;
      count++;
    } while (current !== this.head);

    if (count === idx) {
      this.append(data);
      return true;
    }

    return false;
  }
}
```

Now, let’s run the following command to test the linked list:

```sh
npm run test:file circular-1
```

If the tests run successfully, you're all set! If any tests fail, check <VPIcon icon="fas fa-folder-open"/>`src/examples/`<VPIcon icon="iconfont icon-typescript"/>`circular-1.ts`, fix the issue, and run the tests again.

That's it, you've completed your first circular linked list implementation.

In the last section, you'll learn how to create a circular linked list with two pointers instead of one.

---

## What is a Circular Doubly Linked List?

A circular doubly linked list forms a loop where nodes connect to both the next and previous nodes.

![Diagram of a Circular Doubly Linked List with nodes labeled A, B, C, and D, showing next and prev pointers. Node A is connected to Head, and Node D is connected to Tail. Links form a circular structure.](https://cdn.hashnode.com/res/hashnode/image/upload/v1748531479718/6eeb89a6-ee2a-4e24-a2c5-e4c798e65ce2.png)

The `head` links back to the `tail`, and the `tail` to the `head`, so you can have endless navigation in either direction.

### How to Create a Generic Node Structure for a Circular Doubly Linked List

The `Node` structure in a circular doubly linked list has three parts: the data, a pointer to the next node, and a pointer to the previous node.

The `data` property holds the node’s value, `next` points to the next node, and `prev` points to the previous node in the list.

Open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`circular-2.ts` and modify the `N` class:

```ts title="src/playground/circular-2.ts"
/** Node for circular doubly linked list */
export class N<T> {
  /** Node data */
  public data: T;
  /** Next node reference */
  public next: N<T> | null;
  /** Previous node reference */
  public prev: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
```

Here’s how the node structure works:

- It builds a [<VPIcon icon="iconfont icon-typescript"/>generic](https://typescriptlang.org/fr/docs/handbook/2/generics.html) `Node`: Uses `<T>` to handle any data type.
- It stores the node’s value: Assigns the value to the `data` property.
- It links to the next node: Sets the `next` pointer to the next node, `null` only during initialization. In a valid circular list, `next` always connects to a node.
- It links to the previous node: Sets the `prev` pointer to the previous node, `null` only during initialization. In a valid circular list, `prev` always connects to a node.
- It initializes the node: Takes a value in the constructor and assigns it to `data`.

In a valid circular doubly linked list, `next` and `prev` never stay `null`.

### How to Implement a Circular Doubly Linked List

You’ve created the `Node` structure for your circular doubly linked list. Now, you can start building the linked list itself. To get started, open <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`circular-2.ts`, where you’ll find the `CircularDoublyLinkedList` class:

```ts :collapsed-lines title="src/playground/circular-2.ts"
export class N<T> {
  /** Node data */
  public data: T;
  /** Next node reference */
  public next: N<T> | null;
  /** Previous node reference */
  public prev: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class CircularDoublyLinkedList<T> {
  /** Head node */
  public head: N<T> | null;
  /** Tail node */
  public tail: N<T> | null;
  /** List length */
  public len: number;

  /** Creates an empty list */
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /** Adds node to list end */
  append(data: T): void {}

  /** Removes and returns tail node data */
  deleteTail(): T | null {
    return null;
  }

  /** Adds node to list start */
  prepend(data: T): void {}

  /** Removes and returns head node data */
  deleteHead(): T | null {
    return null;
  }

  /** Finds node at given index */
  find(idx: number): N<T> | null {
    return null;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    return false;
  }

  /** Returns array of node data */
  traverse(): T[] {
    return [];
  }

  /** Inserts node at given index */
  insertAt(idx: number, data: T): boolean {
    return false;
  }
}
```

The `head` points to the first node and links backward to the tail to form a circular loop. It is `null` when the list is empty.

The `tail` points to the last node and links forward to the `head` to complete the circle. It is also `null` when empty.

The length, `len`, tracks the number of nodes. It starts at 0 and changes as you add or remove nodes.

Now, let’s move to the first method and learn how to add a node to the start of a circular doubly linked list.

### How to Prepend a Node in a Circular Doubly Linked List

The goal is to add a new node to the beginning of your circular doubly linked list and update the head pointer to this new node.

Modify the prepend method in your `CircularDoublyLinkedList` class located in <VPIcon icon="fas fa-folder-open"/>`src/playground/`<VPIcon icon="iconfont icon-typescript"/>`circular-2.ts`:

```ts title="src/playground/circular-2.ts"
prepend(data: T): void {
  let newNode = new N(data);

  if (!this.head) {
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

  this.len++;
}
```

The `data` prop holds the value for the new node.

Here’s how `prepend` works:

- It creates a new node with the given data.
- it checks if the list is empty. If the head is `null`, it sets both `head` and `tail` to the new node and links its next and prev to itself to form a single-node circle.
- If the list has nodes, it points the new node’s `next` to the current `head` and its `prev` to the current `tail`.
- It points the current `head`’s `prev` to the new node.
- It points the current `tail`’s `next` to the new node to keep the list circular.
- It sets the `head` to the new node.
- It increases the list’s length by one.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Append a Node in a Circular Doubly Linked List

The goal is to add a new node to the end of your circular doubly linked list and update the `tail` pointer to this new node.

Modify the append method in your `CircularDoublyLinkedList` class:

```ts title="src/playground/circular-2.ts"
append(data: T): void {
  let newNode = new N(data);

  if (!this.head) {
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

  this.len++;
}
```

The data prop holds the value for the new node, like a number or string.

Here’s how `append` works:

- It makes a new node with the given value.
- If the list is empty, then it sets both `head` and `tail` to the new node, and links its `next` and `prev` to itself to form a single-node circle.
- If the list has nodes, it points the new node’s next to the `head` to maintain the circular loop.
- It points the new node’s `prev` to the current `tail`.
- It points the current `tail`’s next to the new node.
- It points the `head`’s prev to the new node to complete the circle.
- It sets the `tail` to the new node.
- It increases the list’s length by one.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Delete the Last Node of a Circular Doubly Linked List

The goal is to remove the last node from your circular doubly linked list and return its data.

Modify the `deleteTail` method in your `CircularDoublyLinkedList` class:

```ts title="src/playground/circular-2.ts"
deleteTail(): T | null {
  if (!this.tail) return null;

  let removedItem = this.tail;

  if (this.len === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.tail = this.tail.prev;
    this.tail!.next = this.head;
    this.head!.prev = this.tail;
  }

  removedItem.next = null;
  removedItem.prev = null;
  this.len--;

  return removedItem.data;
}
```

Here’s how `deleteTail` works:

- If the list is empty, then it returns `null` because there’s no node to remove.
- It declares a variable called `removedItem` and stores the `tail` node in it to keep track of the node you want to remove.
- It checks if the list has one node. If the length is 1, it sets both `head` and `tail` to `null`.
- If the list has multiple nodes, it moves the `tail` to the previous node.
- It points the new `tail`’s `next` to the `head` to keep the circular loop.
- It points the `head`’s `prev` to the new `tail` to maintain the circle.
- It clears the removed node’s `next` and `prev` pointers.
- It decreases the list’s length by one.
- It returns the removed node’s data.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Delete the Head of a Circular Doubly Linked List

The goal is to remove the first node from your circular doubly linked list and return its data.

Modify the deleteHead method in your `CircularDoublyLinkedList` class:

```ts title="src/playground/circular-2.ts"
deleteHead(): T | null {
  if (!this.head) return null;

  let removedItem = this.head;

  if (this.len === 1) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = removedItem.next;
    this.head!.prev = this.tail;
    this.tail!.next = this.head;
  }

  this.len--;
  removedItem.next = null;
  removedItem.prev = null;
  return removedItem.data;
}
```

Here’s how `deleteHead` works:

- If the list is empty then it returns `null` because there’s no node to remove.
- It declares a variable called `removedItem` and stores the `head` node in it to keep track of the node you want to remove.
- It checks if the list has one node. If the length is 1, it sets both `head` and `tail` to `null`.
- If the list has multiple nodes, it moves the `head` to the `next` node to make it the new first node.
- It points the new `head`’s `prev` to the `tail` to maintain the backward loop in the circular structure.
- It points the `tail`’s `next` to the new `head` to keep the forward loop in the circular structure.
- It clears the removed node’s `next` and `prev` pointers to disconnect it from the list.
- It decreases the list’s length by one.
- It returns the removed node’s data.

This runs in $O\left(1\right)$ time because you only change a few pointers without looping.

### How to Find a Node in a Circular Doubly Linked List

The goal is to find the node at a specific index in your circular doubly linked list.

Modify the `find` method in your `CircularDoublyLinkedList` class:

```ts title="src/playground/circular-2.ts"
find(idx: number): N<T> | null {
  if (!this.head || idx < 0 || idx >= this.len) {
    return null;
  }

  let current = this.head;
  for (let i = 0; i < idx; i++) {
    current = current!.next!;
  }

  return current;
}
```

The `idx` prop is the position in the list. Here’s how `find` works:

- It checks if the list is empty or the index is invalid. If the `head` is `null`, `idx` is negative, or `idx` is too large, it returns `null` because no node exists.
- It creates a new pointer called `current` at the `head`.
- It moves `current` forward through the `next` pointers as many times as the index value.
- Once you exit the loop, it returns the `current` node, which is at the specified index.

This runs in $O\left(n\right)$ time because you may need to traverse up to `n` nodes to reach the index.

### How to Traverse a Circular Doubly Linked List

The goal is to return an array of all node data in your circular doubly linked list.

Modify the `traverse` method in your `CircularDoublyLinkedList`:

```ts title="src/playground/circular-2.ts"
traverse(): T[] {
  if (!this.head) return [];

  let current = this.head;
  const result: T[] = [];

  do {
    if (!current.next) throw new Error("invalid list");

    result.push(current.data);

    current = current.next;
  } while (current !== this.head);

  return result;
}
```

Here’s how `traverse` works:

- If the list is empty, it returns an empty array.
- It creates an empty array to store the node data.
- It creates a new pointer called `current` at the `head`.
- It adds the `current` node’s data to the array.
- It moves `current` to the next node using the `next` pointer.
- It repeats adding data and moving `current` until you circle back to the `head`.
- It returns the array with all node data.

This runs in $O\left(n\right)$ time because you need to visit every node in the list.

### How to Delete a Node from a Circular Doubly Linked List

The goal is to remove the first node with the given value from your circular doubly linked list and return `true` if successful.

Modify the delete method in your `CircularDoublyLinkedList` class located in:

```ts title="src/playground/circular-2.ts"
delete(data: T): boolean {
  if (!this.head) return false;

  let current = this.head;

  do {
    if (current.data === data) {
      if (this.len === 1) {
        this.head = null;
        this.tail = null;
      } else {
        current.prev!.next = current.next;
        current.next!.prev = current.prev;
        if (current === this.head) {
          this.head = current.next;
        }
        if (current === this.tail) {
          this.tail = current.prev;
        }
      }
      this.len--;
      return true;
    }
    current = current.next!;
  } while (current !== this.head);

  return false;
}
```

The `data` prop is the value to find and remove. Here’s how `delete` works:

- If the list is empty, then it returns `false` because there’s nothing to delete.
- It creates a new pointer called `current` at the `head`.
- It moves `current` through the list and checks each node’s value until you circle back to the `head`.
- If `current`’s value matches data, it checks if the list has one node, if so, it sets both `head` and `tail` to `null` since the single node within the list is both the `head` and the `tail`.
- If the list has multiple nodes, it links the previous node’s `next` to the next node and the next node’s `prev` to the previous node to skip `current`.
- If `current` is the `head`, it updates the `head` to the next node. If `current` is the `tail`, it updates the `tail` to the previous node.
- It decreases the list’s length by one and returns `true`.
- If no match, it moves `current` to the next node and continues checking.
- If you circle back to the `head` without a match, it returns `false`.

This runs in $O\left(n\right)$ time because you may need to traverse the entire list to find the node.

### How to Insert a Node at a Specific Position in a** Circular Doubly Linked Li

The goal is to add a new node at a specific index in your circular doubly linked list.

Modify the `insertAt` method in your `CircularDoublyLinkedList`:

```ts title="src/playground/circular-2.ts"
insertAt(idx: number, data: T): boolean {
  if (idx < 0 || idx > this.len) return false;

  if (idx === 0) {
    this.prepend(data);
    return true;
  }

  if (idx === this.len) {
    this.append(data);
    return true;
  }

  let newNode = new N(data);
  let current = this.find(idx);

  if (!current) return false;

  newNode.next = current;
  newNode.prev = current!.prev;
  current.prev!.next = newNode;
  current.prev = newNode;

  this.len++;
  return true;
}
```

The `idx` prop is the position in the list, and `data` is the value.

Here’s how `insertAt` works:

- If `idx` is negative or greater than the list’s length, then the `idx` prop is an invalid index, and you should return `false` to stop the operation.
- If the index is 0, it calls `prepend` to add the node at the start and returns `true`.
- If the `idx` equals the list's length, you are adding a new tail. In this case, it calls `append` to add the node at the end and returns true.
- If the above conditions are not met, it creates a new node with the given data.
- It finds the node at the given index using the `find` method and stores it as `current`.
- If no node is found at the `idx`, it returns `false`.
- It points the new node’s `next` to `current`. This sets the new node to precede `current` in the forward direction of the circular list.
- This sets the new node’s `prev` to `current`’s `prev` node. This links the new node to the node before `current` and keeps the backward link in the circular list intact.
- It sets the previous node's `next` to the new node, so the node before `current` now links to the new node. This keeps the circular loop intact by making sure the forward chain skips the original predecessor of `current` and includes the new node.
- It sets `current`'s `prev` to the new node. This completes the insertion by making `current` link back to the new node and keeping the circular structure with correct two-way links.
- It increases the list’s length by one.
- It returns `true` to show the node was inserted.

This runs in $O\left(n\right)$ time because finding the index may require traversing the list.

### How to Test Your Circular Doubly Linked List

Great job! You’ve completed the circular doubly linked list, and now you’re ready to test your implementation.

Your final implementation should look like this:

```ts :collapsed-lines title="src/playground/circular-2.ts"
/** Node for circular doubly linked list */
export class N<T> {
  /** Node data */
  public data;
  /** Next node reference */
  public next: N<T> | null;
  /** Previous node reference */
  public prev: N<T> | null;

  /** Creates a node with given data */
  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

/** Circular doubly linked list implementation */
export class CircularDoublyLinkedList<T> {
  /** Head node */
  public head: N<T> | null;
  /** Tail node */
  public tail: N<T> | null;
  /** List length */
  public len: number;

  /** Creates an empty list */
  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  /** Adds node to list end */
  append(data: T): void {
    let newNode = new N(data);

    if (!this.head) {
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

    this.len++;
  }

  /** Removes and returns tail node data */
  deleteTail(): T | null {
    if (!this.tail) return null;

    let removedItem = this.tail;

    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = this.head;
      this.head!.prev = this.tail;
    }

    removedItem.next = null;
    removedItem.prev = null;
    this.len--;

    return removedItem.data;
  }

  /** Adds node to list start */
  prepend(data: T): void {
    let newNode = new N(data);

    if (!this.head) {
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

    this.len++;
  }

  /** Removes and returns head node data */
  deleteHead(): T | null {
    if (!this.head) return null;

    let removedItem = this.head;

    if (this.len === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removedItem.next;
      this.head!.prev = this.tail;
      this.tail!.next = this.head;
    }

    this.len--;
    removedItem.next = null;
    removedItem.prev = null;
    return removedItem.data;
  }

  /** Finds node at given index */
  find(idx: number): N<T> | null {
    if (!this.head || idx < 0 || idx >= this.len) {
      return null;
    }

    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current!.next!;
    }

    return current;
  }

  /** Removes first node with given data */
  delete(data: T): boolean {
    if (!this.head) return false;

    let current = this.head;

    do {
      if (current.data === data) {
        if (this.len === 1) {
          this.head = null;
          this.tail = null;
        } else {
          current.prev!.next = current.next;
          current.next!.prev = current.prev;
          if (current === this.head) {
            this.head = current.next;
          }
          if (current === this.tail) {
            this.tail = current.prev;
          }
        }
        this.len--;
        return true;
      }
      current = current.next!;
    } while (current !== this.head);

    return false;
  }

  /** Returns array of node data */
  traverse(): T[] {
    if (!this.head) return [];

    let current = this.head;
    const result: T[] = [];

    do {
      if (!current.next) throw new Error("invalid list");

      result.push(current.data);

      current = current.next;
    } while (current !== this.head);

    return result;
  }

  /** Inserts node at given index */
  insertAt(idx: number, data: T): boolean {
    if (idx < 0 || idx > this.len) return false;

    if (idx === 0) {
      this.prepend(data);
      return true;
    }

    if (idx === this.len) {
      this.append(data);
      return true;
    }

    let newNode = new N(data);
    let current = this.find(idx);

    if (!current) return false;

    newNode.next = current;
    newNode.prev = current!.prev;
    current.prev!.next = newNode;
    current.prev = newNode;

    this.len++;
    return true;
  }
}
```

Run the following command to test the linked list:

```sh
npm run test:file circular-2
```

If the tests pass successfully, you’re all set! If any tests fail, review <VPIcon icon="fas fa-folder-open"/>`src/examples/`<VPIcon icon="iconfont icon-typescript"/>`circular-2.ts`, fix the issues, and run the tests again.

---

## When to Use Linked Lists (and When to Avoid Them)

Linked lists are powerful data structures, but they're not always the best choice. So it's important to know when to use them and when to choose an alternative.

### Why Use Linked Lists?

Linked lists are great for situations that need dynamic data or flexible navigation.

Their main benefits include:

- **Dynamic size**: Add or remove nodes without resizing, unlike arrays that need reallocation.
- **Efficient insertions/deletions**: Operations like `prepend` or `delete` are quick ($O\left(1\right)$ at known positions), which is very ideal for frequent updates.
- **Flexible traversal**: Doubly and circular lists allow you to move forward or backward, which makes them helpful for complex navigation patterns.

### Real-World Use Cases

You should consider using linked lists in scenarios where the data is frequently updated or requires cyclic or bidirectional access:

- **Browser history**: A doubly linked list keeps track of visited pages and lets users easily move back and forth. Adding a new page (`prepend`) or removing one (`delete`) is fast, and the list grows dynamically as users browse.
- **Music playlists**: Circular doubly linked lists are used for looping playlists in apps like Spotify. Users can easily skip forward (`next`) or backward (`prev`), and new songs (`append`) fit smoothly into the loop.
- **Undo/redo functionality**: Text editors use doubly linked lists to store actions. Each edit is a node, and moving backward (`undo`) or forward (`redo`) navigates through the list.
- **Task scheduling**: Circular singly linked lists are used for round-robin scheduling in operating systems. Each process is a node, and the list cycles through them to allocate CPU time. New tasks are added using `append`.

### When Not to Use Linked Lists

Despite their strengths, linked lists have weaknesses in some situations because of their structure:

- **Slow random access**: Reaching an index requires you to traverse from the head ($O\left(n\right)$), unlike arrays, which have $O\left(1\right)$ access.
- **High memory overhead**: Each node in a linked list stores pointers (`next`, `prev`), which uses more memory than arrays. This can be an issue for large datasets.
- **Poor search performance**: Finding a value requires checking each node ($O\left(n\right)$), which is slower than hash tables ($O\left(1\right)$) or binary search trees ($O\left(\log_{}{n}\right)$`).

### Better Alternatives for Specific Cases

In some cases, other data structures outperform linked lists:

- **Random access**: Use arrays or dynamic arrays (like JavaScript’s `Array`) for quick indexing. For instance, if you need to show a table in a web app, an array's $O\left(1\right)$ access lets you quickly reach any row.
- **Frequent searches**: Hash tables (like JavaScript’s `Map`) are better for fast lookups. For example, a contact list app that searches by name would use a hash table to speed up the process.
- **Memory-constrained environments**: Arrays use less memory for large, fixed-size datasets, such as image processing buffers in graphics apps.

The key takeaway is that linked lists are great when your data needs dynamic growth, frequent insertions or deletions, or cyclic navigation, like in playlists or history features.

Avoid using linked lists for random access, frequent searches, or memory-sensitive tasks, where arrays, hash tables, or trees are better options.

You can experiment with your `src/playground` implementations to see how linked lists fit your project’s needs.

---

## Conclusion

Congratulations on finishing this handbook! 🥳 You've learned how to implement different types of linked lists using TypeScript, including singly linked lists, doubly linked lists, and circular linked lists.

By understanding these linked lists, you're well-prepared to work with more complex data structures.

Thanks for following along with this tutorial. You can follow me on [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Yazdun`)](https://x.com/Yazdun), where I share more useful tips on data structures and web development.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Code Linked Lists with TypeScript: A Handbook for Developers",
  "desc": "A linked list is a data structure where each item, called a node, contains data and a pointer to the next node. Unlike arrays, which store elements in contiguous memory, linked lists connect nodes that can be scattered across memory. In this hands-on...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-code-linked-lists-with-typescript-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
