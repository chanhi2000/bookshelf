---
lang: en-US
title: "What are the event loop and call stack in JavaScript?"
description: "Article(s) > What are the event loop and call stack in JavaScript?"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What are the event loop and call stack in JavaScript?"
    - property: og:description
      content: "What are the event loop and call stack in JavaScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/event-loop-and-call-stack-js.html
prev: /programming/js/articles/README.md
date: 2025-02-18
isOriginal: false
author:
  - name: Ikeh Akinyemi
    url : https://blog.logrocket.com/author/ikehakinyemi/
cover: /assets/image/blog.logrocket.com/event-loop-and-call-stack-js/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What are the event loop and call stack in JavaScript?"
  desc="Explore the inner workings of the event loop and call stack in JavaScript, which help JS handle asynchronous operations."
  url="https://blog.logrocket.com/event-loop-and-call-stack-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/event-loop-and-call-stack-js/banner.png"/>

JavaScript’s reputation as a single-threaded language often raises eyebrows. How can it handle asynchronous operations like network requests or timers without freezing the application?

![what are the event loop and call stack in JavaScript](/assets/image/blog.logrocket.com/event-loop-and-call-stack-js/banner.png)

The answer lies in its runtime architecture, which includes the call stack, Web APIs, task queues (including the microtask queue), and the event loop.

This article will discuss how [**JavaScript**](/blog.logrocket.com/six-things-you-may-not-know-about-javascript.md) achieves this seemingly paradoxical feat. We’ll explore the interworking between the call stack, event loop, and various queues that make it all possible while maintaining its single-threaded nature.

---

## The call stack: JavaScript’s execution coordinator

JavaScript’s single-threaded nature means it can only execute one task at a time. But how does it keep track of what’s running, what’s next, and where to resume after an interruption? This is where the call stack comes into play.

### What is the call stack?

The call stack is a data structure that records the execution context of your program. Think of it as a to-do list for JavaScript’s engine.

Here’s how it operates:

- **Last-In-First-Out (LIFO)** — Functions are added to the top of the stack and removed from the top once completed
- **Execution context** — Each function call creates a new context (e.g., variables, arguments) that’s pushed onto the stack

Let’s see how the call stack works by dissecting and following the execution path of the simple script below:

```js
function logThree() {
  console.log(‘Three’);
}

Function logThreeAndFour() {
  logThree(); // step 3
  console.log(‘Four’); // step 4
}

console.log(‘One’); // step 1
console.log(‘Two’); // step 2
logThreeAndFour(); // step 3-4
>
```

In this walkthrough:

- **Stack** — Represents the current functions waiting to be executed, with the most recently added function at the top
- **Action** — Describes what the JavaScript engine actually does at each step, including executing functions and removing them from the stack

Here’s how the call stack processes the above script:

::: tabs

@tab:active Step 1

`console.log('One')` is pushed onto the stack:

- **Stack** — `[main(), console.log('One')]`
- **Action** — Executes — `'One'`, pops off the stack

@tab Step 2

`console.log('Two')` is pushed:

- **Stack** — `[main(), console.log('Two')]`
- **Action** — Executes `'Two'`, pops off

@tab Step 3

`logThreeAndFour()` is invoked:

- **Stack** — `[main(), logThreeAndFour()]`
- **Action** — Inside `logThreeAndFour(), logThree()` is called
  - **Stack** — `[main(), logThreeAndFour(), logThree()]`
  - **Action** — `logThree()` calls `console.log('Three')`
    - **Stack** — `[main(), logThreeAndFour(), logThree(), console.log('Three')]`
    - **Action** — Executes `'Three'`, pops off
  - **Stack** — `[main(), logThreeAndFour(), logThree()]` → `logThree()` pops off

@tab Step 4

`console.log('Four')` is pushed

- **Stack** — `[main(), logThreeAndFour(), console.log('Four')]`
- **Action** — Executes `'Four'`, pops off
- **Stack** —`[main(), logThreeAndFour()]` → `logThreeAndFour()` pops off

:::

Finally, the stack is empty, and the program exits:

![call stack’s LIFO structure ensures nested functions resolve before outer ones](/assets/image/blog.logrocket.com/event-loop-and-call-stack-js/1_call-stack-LIFO.jpeg)
<!-- TODO: mermaid로 작성 -->

### The single-threaded dilemma

Since JavaScript has only one call stack, blocking operations (e.g., CPU-heavy loops) freeze the entire application:

```js
function longRunningTask() {
  // Simulate a 3-second delay
  const start = Date.now();
  while (Date.now() - start < 3000) {} // Blocks the stack
  console.log('Task done!');
}

longRunningTask(); // Freezes the UI for 3 seconds
console.log('This waits...'); // Executes after the loop
```

This limitation is why JavaScript relies on asynchronous operations (e.g., `setTimeout`, `fetch`) handled by browser APIs outside the call stack.

---

## Web APIs & task queue: Extending JavaScript’s capabilities

While the call stack manages synchronous execution, JavaScript’s true power lies in its ability to handle asynchronous operations without blocking the main thread. This is made possible by Web APIs and the task queue, which work in tandem with the event loop to offload and schedule non-blocking tasks.

### The role of Web APIs

[<FontIcon icon="fa-brands fa-firefox"/>Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) are browser-provided interfaces that handle tasks outside JavaScript’s core runtime. They include:

- **Timers** — `setTimeout`, `setInterval`
- **Network requests**— `fetch`, `XMLHttpRequest`
- **DOM manipulation** — `addEventListener`, `click`, `scroll`
- **Device APIs** — Geolocation, Camera, Notifications

These APIs allow JavaScript to delegate time-consuming operations to the browser’s multi-threaded environment, freeing the call stack to process other tasks.

### How Web APIs and the task queue work together

Let’s break down a `setTimeout` example:

```js
console.log('Start');

setTimeout(() => {  
  console.log('Timeout callback');  
}, 1000);  

console.log('End');  
```

Here’s the execution flow of the above snippet:

::: tabs

@tab:active 1. Call stack

- `console.log('Start')` executes and pops off
- `setTimeout()` registers the callback with the browser’s timer API and pops off
- `console.log('End')` executes and pops off

@tab 2. Browser background

- The timer API counts 1,000ms

@tab 3. Task queue

- After the timer expires, the callback `() => { console.log(...) }` is added to the task queue

@tab 4. Event loop

- Once the call stack is empty, the event loop moves the callback from the task queue to the stack
- `console.log('Timeout callback')` executes:

```plaintext
Start
End
Timeout callback
```

![non-blocking execution using Web APIs and the task queue](/assets/image/blog.logrocket.com/event-loop-and-call-stack-js/2_non-blocking-execution.png)
<!-- TODO: mermaid로 작성 -->

:::

Note that timer delays are minimum guarantees, meaning a `setTimeout(callback, 1000)` callback might execute *after* 1,000ms, but never before. If the call stack is busy (e.g., with a long-running loop), the callback waits in the task queue.

Let’s see another example using the [**Geolocation API**](/blog.logrocket.com/what-you-need-know-while-using-geolocation-api.md):

```js
console.log('Requesting location...');

navigator.geolocation.getCurrentPosition(  
  (position) => { console.log(position); }, // Success callback  
  (error) => { console.error(error); }     // Error callback  
);

console.log('Waiting for user permission...');
```

In the above snippet, `getCurrentPosition` registers the callbacks with the browser’s geolocation API. Then the browser handles permission prompts and GPS data fetching. Once the user responds, the relevant callback joins the task queue. This allows the event loop to transfer it to the call stack when idle:

```plaintext title="output"
Requesting location...  
Waiting for user permission...  
{ coords: ... } // After user grants permission  
```

Without Web APIs and the task queue, the call stack would freeze during network requests, timers, or user interactions.

---

## Microtask queue and event loop: Prioritizing promises

While the task queue handles callback-based APIs like [`setTimeout`](/blog.logrocket.com/using-settimeout-timer-apis-node-js.md), JavaScript’s modern asynchronous features (promises, `async/await`) rely on the microtask queue. Understanding how the event loop prioritizes this queue is key to mastering JavaScript’s execution order.

### What is the microtask queue?

The microtask queue is a dedicated queue for:

- **Promise reactions** — `.then()`, `.catch()`, `.finally()` handlers
- `queueMicrotask()` — Explicitly adds a function to the microtask queue
- `**async/await**` — A function call after `await` is queued as a microtask
- **MutationObserver callbacks** — Used to track DOM changes

Unlike the task queue, the microtask queue has higher priority. The event loop processes all microtasks before moving to tasks.

The event loop follows a strict sequence of workflow. It executes all tasks in the call stack, drains the microtask queue completely, renders UI updates (if any), and then processes one task from the task queue before repeating the entire process again, continuously. This ensures promise-based code runs as soon as possible, even if tasks are scheduled earlier.

Let’s see an example of microtasks vs tasks queues:

```js
console.log('Start');

// Task (setTimeout)
setTimeout(() => console.log('Timeout'), 0);

// Microtask (Promise)
Promise.resolve().then(() => console.log('Promise'));

console.log('End');
```

This produces the following output:

```js
Start  
End  
Promise  
Timeout  
```

![Event loop prioritizes the microtask queue entirely before touching the task queue](/assets/image/blog.logrocket.com/event-loop-and-call-stack-js/3_prioritizing-microtask-queue.png)
<!-- TODO: mermaid로 작성 -->

The breakdown execution follows the following sequence:

1. `console.log('Start')` executes
2. `setTimeout` schedules its callback in the task queue
3. `Promise.resolve().then()` schedules its callback in the microtask queue
4. `console.log('End')` executes
5. Event Loop:
    - Call stack is empty → process microtasks
    - `Promise` logs
    - Microtask queue is empty → process next task
    - `Timeout` logs

### A common caveat with microtasks

Before continuing, it is worth mentioning a caveat that exists with microtasks. This has to do with nested microtasks; microtasks can schedule more microtasks, potentially blocking the event loop like below:

```js
function recursiveMicrotask() {
  Promise.resolve().then(() => {
    console.log('Microtask!');
    recursiveMicrotask(); // Infinite loop
  });
}

recursiveMicrotask();
```

The above script will hang as the microtask queue is never empty, and the approach to fix this issue is to use `setTimeout` to defer work to the task queue.

### `async/await`and microtasks

[**`async/await`**](/blog.logrocket.com/async-await-typescript.md) syntax is syntactic sugar for promises. Code after `await` is wrapped in a microtask:

```js
async function fetchData() {
  console.log('Fetching...');
  const response = await fetch('/data'); // Pauses here
  console.log('Data received'); // Queued as microtask
}

fetchData();
console.log('Script continues');
```

The output is as follows:

```js
Fetching...  
Script continues  
Data received 
```

---

## Web Workers: Offloading heavy tasks

JavaScript’s single-threaded model ensures simplicity but struggles with CPU-heavy tasks like image processing, and complex or large dataset calculations. These tasks can freeze the UI, creating a poor user experience. [<FontIcon icon="fa-brands fa-firefox"/>Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) solve this by executing scripts in separate background threads, freeing the main thread to handle [**the DOM**](/blog.logrocket.com/exploring-essential-dom-methods-frontend-development.md) and user interactions.

### How Web Workers operate

Workers run in an isolated environment with their own memory space. They cannot access the DOM or `window` object, ensuring thread safety. Communication between the main thread and workers happens via message passing, where data is copied (via structured cloning) or transferred (using `Transferable` objects) to avoid shared memory conflicts.

The below code block shows a sample of delegating a complex work of processing an image that’s assumed in this scenario to take a lot of computational time to complete. `worker.postMessage` method sends a message to the worker. It then utilizes the `worker.onmessage` and `worker.onerror` to handle the success and error of the background work.

Here’s the main thread:

```js
// Create a worker and send data
const worker = new Worker('worker.js');
worker.postMessage({ task: 'processImage', imageData: rawPixels }); 

// Listen for results or errors
worker.onmessage = (event) => {
  displayProcessedImage(event.data); // Handle result
};

worker.onerror = (error) => {
  console.error('Worker error:', error); // Handle failures
};
```

In the below code snippet, we utilize the `onmessage` method to receive the notification to start processing the image. The `rawPixel` passed down can be accessed on the `event` object through the `data` field as below.

And now we see it from the worker.js viewpoint:

```js
// Receive and process data
self.onmessage = (event) => {
  const processedData = heavyComputation(event.data.imageData); 
  self.postMessage(processedData); // Return result
};
```

Workers operate in a separate global scope, hence the use of `self`. Use `Transferable` objects (e.g., `ArrayBuffer`) for large data to avoid costly copying, and spawning too many workers can bloat memory; reuse them for recurring tasks.

---

## Conclusion

JavaScript’s asynchronous prowess lies in its elegant orchestration of the call stack, Web APIs, and the event loop—a system that enables non-blocking execution despite its single-threaded nature. By leveraging the task queue for callback-based operations and prioritizing the microtask queue for promises, JavaScript ensures efficient handling of asynchronous workflows.

By mastering these concepts, you’ll write code that’s not just functional but predictable and performant, whether you’re handling user interactions, fetching data, or optimizing rendering.

Experiment with DevTools, embrace asynchronous patterns, and let JavaScript’s event loop work for you—not against you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are the event loop and call stack in JavaScript?",
  "desc": "Explore the inner workings of the event loop and call stack in JavaScript, which help JS handle asynchronous operations.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/event-loop-and-call-stack-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
