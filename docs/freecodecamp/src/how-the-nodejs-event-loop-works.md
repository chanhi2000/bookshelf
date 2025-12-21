---
lang: en-US
title: "How the Node.js Event Loop Works"
description: "Article(s) > How the Node.js Event Loop Works"
icon: fa-brands fa-js
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How the Node.js Event Loop Works"
    - property: og:description
      content: "How the Node.js Event Loop Works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-the-nodejs-event-loop-works.html
prev: /programming/js-node/articles/README.md
date: 2025-09-04
isOriginal: false
author:
  - name: Amanda Ene Adoyi
    url : https://freecodecamp.org/news/author/Lonercode/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1756916907320/01074df6-0f8e-4a63-9a3e-07c8297fc22b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How the Node.js Event Loop Works"
  desc="The Node.js event loop is a concept that may seem difficult to understand at first. But as with any seemingly complex subject, the best way to understand it is often through an analogy. In this article, you’ll learn how overworked managers, busy wait..."
  url="https://freecodecamp.org/news/how-the-nodejs-event-loop-works"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1756916907320/01074df6-0f8e-4a63-9a3e-07c8297fc22b.png"/>

The Node.js event loop is a concept that may seem difficult to understand at first. But as with any seemingly complex subject, the best way to understand it is often through an analogy.

In this article, you’ll learn how overworked managers, busy waiters, and train stations can help bring home the fundamental concept of the event loop. If you’re working with Node, you’ll need to understand how the event loop works, as it lies at the root of some of the most powerful applications today.

::: note Prerequisites

In order to seamlessly follow along with this article, it would help if you are familiar with the following concepts:

1. **A basic understanding of JavaScript:** Node.js runs on JavaScript, so you’ll need to understand variables, functions, and control flow.
2. **Familiarity with Node.js basics:** Running simple scripts with Node and requiring modules.
3. **Some exposure to asynchronous patterns:** Knowing what patterns such as `setTimeout()` do.
4. **Some familiarity with basic CPU concepts (cores and threads):** This will help you better understand concurrency and parallelism.
5. **Awareness of promises and async/await:** This is optional and not a strict requirement, but will be helpful.

:::

---

## What are Synchronous and Asynchronous Code?

When writing code for Node.js applications, there are two different ways it can run: synchronous (sync) and asynchronous (async). Synchronous code is referred to as *blocking* because when it runs, no other code runs until execution is complete.

An analogy for this is a busy restaurant. Picture a waiter who refuses to wait on other tables until the table they’re presently serving has received their orders and has started eating. While the food is being prepared, the waiter waits around doing nothing and only approaches your table to take your order when they are completely finished with the previous table. Needless to say, the waiter may not receive a great tip for that service.

This is what synchronous code is. It halts the execution of other processes until it’s complete. You can see how it works in the example below:

```js
const syncWaiter = (name) => {
  console.log(`${name} attends to tables pretty slowly.`);
};

syncWaiter("Devin");
console.log("At least all the orders are correct!");
```

The code above will be run in sequence, in the order it appears.

Asynchronous code, unlike synchronous code, doesn’t halt all other processes until one task is executed – rather, it proceeds to carry out other tasks while a longer process runs in the background.

Using our waiter analogy, in this case the waiter in the restaurant would go take an order from one table, pass the order to the kitchen, and while it’s being prepared, proceeds to your table to take your order as well. This way, the waiter is able to ensure different processes are started even if one process takes a bit longer than the rest. Check out the example below:

```js
const asyncWaiter = (name) => {
  setTimeout(()=> {console.log(`${name} attends to tables pretty quickly.`)}, 3000)
};

asyncWaiter("James");
console.log("Wow! All the tables are attended to in a short time.");
```

Unlike synchronous code, this code does run the function `asyncWaiter()` – but the callback inside the function executes later. When the duration elapses, the result is then shown on the screen. This is why asynchronous programs are referred to as *non-blocking.* They don’t halt the program, but move from one available task to another.

The code above returns the following:

```plaintext title="output"
Wow! All the tables are attended to in a short time.
James attends to tables pretty quickly.
```

This print order happens because of how the *event loop* manages tasks: the synchronous `console.log()` that comes after `asyncWaiter()` runs immediately, while the asynchronous callback inside `asyncWaiter()` (from `setTimeout`) is scheduled to run later. If you don’t understand this just yet, don’t worry as I’ll break it down in detail shortly.

---

## What Concurrency and Parallelism Mean

Node.js is single-threaded but often gives the appearance of a multi-threaded environment due to how it handles concurrency and parallelism. A thread is a single sequence of instructions executed by the CPU independently. Think of it like a single waiter named James in a restaurant.

If James handles multiple tasks around the same time and quickly, an onlooker outside the restaurant who sees the number of customers moving in and out of the restaurant may assume that there are a ton of waiters serving tables. In reality, James just handles his tasks asynchronously.

Before grasping the concept of the event loop, it’s good to understand what concurrency and parallelism are, as they help explain this.

### Concurrency in Node.js

Concurrency means having multiple processes run around the same time. In the waiter analogy, it is like James carrying out different tasks, though not simultaneously. He could, for instance take an order from a table and, while waiting for the food to arrive, request that extra salt be provided to another table. While the salt is on its way, he uses the waiting time to read the bill to a third table.

The key idea is that James never sits idle — he works on other tasks while waiting for one to finish. If this sounds an awful lot like asynchronous programming, it is because asynchronous code is just one way to achieve concurrency.

Other ways to execute concurrency are [**multithreading**](/freecodecamp.org/multithreading-for-beginners.md) on a single CPU core and [**coroutines**](/freecodecamp.org/how-to-handle-concurrency-in-go.md) which are just functions that pause their execution to resume at a later time.

### Parallelism in Node.js

Parallelism, on the other hand, also means having several tasks run at the same time – but instead of the tasks just being processed around the same time, they are executed at exactly the same time, simultaneously. In this case, the restaurant manager decides to hire multiple waiters and each table has a waiter who is taking orders at exactly the same time.

Parallelism can be achieved using multithreading on multiple CPU cores. In this setup, the threads share the same memory and run simultaneously while using clusters which run independently – each with its own memory space. Here’s a clear example of parallelism using the `worker_threads` module:

```js
const { Worker}  = require('worker_threads');

new Worker('./worker.js');
new Worker('./worker.js');
new Worker('./worker.js');

console.log("Main thread keeps running in the process...");
```

The code above creates three worker threads in parallel on a multi-core machine. This doesn’t stop the main thread which continues to run, allowing each worker thread independently do its task. `worker.js` could be a simple file carrying out any task. In this case, it simply logs a message to the screen:

```js
console.log("This worker thread is running here!");
```

Note that the argument for the `Worker` constructor can be any file path, and the order in which they are executed isn’t dependent on the order they appear in code. Each worker runs independently of the others and they run in parallel.

Concurrency and parallelism allow Node.js (which is single-threaded) to appear to manage multiple tasks simultaneously. Understanding these concepts sets the stage for the event loop, showing how Node.js manages to give the appearance of concurrency while still executing code in a single-threaded environment.

---

## What is the Event Loop?

The event loop listens for events in the Node.js environment. It essentially listens for actions and then processes tasks or outputs values.

To better understand how this works, you can picture the Node.js environment as a fast-paced organization and the event loop as an overworked manager who refuses to hire a personal assistant. The manager oversees the operations of the entire office, and has a dedicated desk that contains whatever they are working on at that particular time. Let’s call this desk *the call stack*.

The call stack consists of whatever processes or tasks that Node.js is currently working on. When input is entered or code is written to do something, it gets moved to the call stack and from there gets executed.

The order in which this execution takes place is important, as synchronous code makes it to the call stack before asynchronous code. What happens to the asynchronous code you may ask? It goes into something known as the callback queue first before ending up on the call stack.

The callback queue is a lineup of asynchronous tasks that make it to the call stack only if the stack is empty. You can think of it like a file cabinet in the office, where asynchronous code that is processed by a specialized team of workers under the manager go to stay until the manager’s desk is cleared. The manager only heads to the cabinet when they’re done handling all the synchronous task on the call stack. This specialized team that handles asynchronous code like callbacks and async/await are the Node APIs or the Web APIs.

Node or Web APIs process asynchronous code. When the code comes in, it’s processed here and then placed in the callback queue for the event loop to pick up and take to the call stack. But there are some asynchronous tasks that are prioritized. These are known as microtasks, such as [**promises**](/freecodecamp.org/guide-to-javascript-promises.md).

Microtasks are given particular priority and are queued in a special microtask queue. This is usually checked after an operation before checking the callback queue. If nothing is present, the event loop checks the callback queue but if some task exists such as `process.nextTick()`, it gets handled immediately. Macrotasks consist of tasks that are regularly scheduled and handled by the event loop only after the microtasks are treated, such as `setTimeout()` and `setInterval()`.

So as you can see, the event loop is basically what it sounds like – a loop. It looks through events and handles tasks based on a prioritized schedule.

One thing to note, though, is that even within callback queues and microtask queues, there are phases. The event loop, for instance, must handle certain tasks before others even within the same category. This is where the phases of the event loop come in.

---

## The Phases of the Event Loop

By analogy, the event loop is akin to a manager who checks the status of projects and tasks at regular intervals. In this case, they have a specific schedule for checking the status of projects. Some projects or tasks take priority over others, and the manager has to look through them in a set order.

You can also visualize event loop phases as a train moving from station to station. It starts from one location and moves to others in a particular order until it’s complete, then starts the journey again. This arrangement determines what tasks get executed before others.

Here are the phases of the event loop in order:

1. The timers phase: This phase executes the `setTimeout()` and `setInterval()` callbacks after the duration is run. The event loop starts here, like the first station on a train’s journey.
2. The pending callbacks phase: These are system-level callbacks, checked after the timers phase operations.
3. The poll phase: This phase handles input/output (I/O) events and executes the callbacks. In the absence of callbacks, the event loop waits for new ones here.
4. The check phase: This phase executes `setImmediate()` callbacks.
5. Close callbacks: This phase is concerned with executing close events like socket closes.

These callback events are checked in order and run accordingly, so that if `setTimeout()` and `setImmediate()` are in the same code, `setTimeout()` runs first unless the “train” is say, in the Poll Phase of the loop so that `setImmediate()` runs before `setTimeout()`.

You can see this illustrated with the example below:

```js
const fs = require('fs');

fs.readFile('trainMap.txt', () => {
  setTimeout(() => {
    console.log("Train takes off");
  }, 0);
  setImmediate(() => {
    console.log("Oops! Immediate halt! There's a cat on the tracks!");
  })
});
```

You see in the code above that the callbacks are handled asynchronously. Recall that the event loop waits for new callbacks in the poll phase. What this means is that since `fs.readfile()` is a callback, it gets processed in the poll phase.

`setTimeout()` is set to run in the timers phase but the event loop proceeds to the check phase (which comes next) where `setImmediate()` is executed. This is why `setImmediate()` runs before `setTimeout()` in this case. The event loop then continues from the check phase to the close phase, back to the timers phase, repeating this cycle continuously.

This explains why you see the output below printed to the screen:

```plaintext title="output"
Oops! Immediate halt! There's a cat on the tracks!
Train takes off
```

This illustrates how the event loop enforces order of execution across the different phases, ensuring that asynchronous operations run in the correct sequence.

---

## Conclusion

The Node.js event loop can sometimes appear mysterious, but it really isn’t as complex as it first seems. At its core, it really is just the engine that ensures JavaScript can handle multiple tasks without freezing.

In this article, you’ve learnt about synchronous and asynchronous code, concurrency, parallelism, and how these concepts help explain the event loop and the phases of the event loop. Understanding how they work gives you the confidence to write asynchronous code without fear, debug more efficiently, and appreciate the power behind Node.js’s ability to handle concurrent tasks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How the Node.js Event Loop Works",
  "desc": "The Node.js event loop is a concept that may seem difficult to understand at first. But as with any seemingly complex subject, the best way to understand it is often through an analogy. In this article, you’ll learn how overworked managers, busy wait...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-the-nodejs-event-loop-works.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
