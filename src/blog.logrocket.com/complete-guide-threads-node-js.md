---
lang: en-US
title: "A complete guide to threads in Node.js"
description: "Article(s) > A complete guide to threads in Node.js"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A complete guide to threads in Node.js"
    - property: og:description
      content: "A complete guide to threads in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-threads-node-js.html
prev: /programming/js-node/articles/README.md
date: 2023-01-27
isOriginal: false
author:
  - name: Maciej Cieślar
    url : https://blog.logrocket.com/author/maciejcieslar/
cover: https://blog.logrocket.com/wp-content/uploads/2019/03/complete-guide-threads-node-js.png
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
  name="A complete guide to threads in Node.js"
  desc="While it is single-threaded, Node.js uses worker threads that allow for a separate execution thread that runs alongside the main thread."
  url="https://blog.logrocket.com/complete-guide-threads-node-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="https://blog.logrocket.com/wp-content/uploads/2019/03/complete-guide-threads-node-js.png"/>

::: note Editor’s note

This article was last updated on 10 February 2023. Check out this [**guide to multithreading in Node.js**](/blog.logrocket.com/node-js-multithreading-worker-threads-why-they-matter.md) for more information.

:::

![A Complete Guide To Threads In Node.js](https://blog.logrocket.com/wp-content/uploads/2019/03/complete-guide-threads-node-js.png)

Many people wonder how a single-threaded Node.js backend can compete with multithreaded backends. It may seem counterintuitive that so many huge companies pick Node as their backend, given its supposed single-threaded nature. To know why, we have to understand what we really mean when we say that Node is single-threaded.

JavaScript was created to be just good enough to do simple things on the web, like validate a form or, say, create a rainbow-colored mouse trail. It was [<FontIcon icon="fa-brands fa-youtube"/>only in 2009 that Ryan Dahl](https://youtu.be/ztspvPYybIY), creator of Node, made it possible for developers to use the language to write backend code.

Backend languages, which generally support multithreading, have all kinds of mechanisms for syncing values between threads and other thread-oriented features. To add support for such things to JavaScript would require changing the entire language, which wasn’t really Dahl’s goal. For plain JavaScript to support multithreading, he had to create a workaround. Let’s explore…

---

## How Node.js really works

Node.js follows the single-threaded event loop paradigm. To understand the complete working of Node, it’s important to understand what a thread is in Node, the event loop that comprises the node, and get the idea of the basic architecture of the node by understanding whether it is single-threaded or multi-threaded.

### Threads in Node.js

A thread in Node.js is a separate execution context in a single process. It is a lightweight, independent unit of processing that can run in parallel with other threads within the same process. It resides within process memory and it has an execution pointer. It has a stack of its own but a shared heap of the process.

Node.js uses two kinds of threads: a main thread handled by the event loop and several auxiliary threads in the worker pool. In the context of Node.js, auxiliary thread or thread is interchangeably used for worker threads.

In Node.js, the main thread is the initial execution thread that starts when Node.js starts. It is responsible for the execution of JavaScript code and handling incoming requests. A worker thread is a separate execution thread that runs alongside the main thread.

### Is Node.js multithreaded or single*–*threaded?

Single-threaded means that a program has only one thread of execution, which allows it to perform only one task at a given time. Meanwhile, the term “multi-threaded” implies that a program has multiple threads of execution, which allows it to perform multiple tasks concurrently.

Each thread operates independently and task allocation is handled by the operating system. Both approaches have their challenges. In single-threaded processes, all tasks are executed in a sequence and a blocking operation will delay the execution of other tasks. Meanwhile, in multi-threaded processes, the pain point that arises is the synchronization and coordination between multiple threads.

With an understanding of both of these terms, we can now answer the question.

Node.js is single-threaded as it has a single main event loop that processes JavaScript operations and handles all I/O. However, Node.js provides us with additional features that, if properly used, can give the advantages that multithreading has. To get a detailed understanding of what gives this ability to Node and how to deal with the challenges that come with this approach check out [**this article**](/blog.logrocket.com/node-js-multithreading-worker-threads-why-they-matter.md).

The main element in single-threaded Node architecture is the event loop, which makes nodes so powerful that, despite being a single-threaded runtime, it is becoming the first choice for most backend developers. We previously explained that there are two kinds of threads in a node. The main thread uses an event loop.

The event loop is the mechanism that takes callbacks (functions) and registers them to be executed at some point in the future. It operates in the same thread as the proper JavaScript code. When a JavaScript operation blocks the thread, the event loop is blocked as well.

The worker pool is an execution model that spawns and handles separate threads, which then synchronously perform the task and return the result to the event loop. The event loop then executes the provided callback with said result.

In short, it takes care of asynchronous I/O operations — primarily, interactions with the system’s disk and network. It is mainly used by modules such as `fs` (I/O-heavy) or `crypto` (CPU-heavy). Worker pool is implemented in [<FontIcon icon="fas fa-globe"/>libuv](http://docs.libuv.org/en/v1.x/), which results in a slight delay whenever Node needs to communicate internally between JavaScript and C++, but this is hardly noticeable.

With both of these mechanisms, we are able to write code like this:

```js
fs.readFile(path.join(__dirname, './package.json'), (err, content) => {
 if (err) {
   return null;
 }
 console.log(content.toString());
});
```

The aforementioned `fs` module tells the worker pool to use one of its threads to read the contents of a file and notify the event loop when it is done. The event loop then takes the provided callback function and executes it with the contents of the file.

Above is an example of non-blocking code; as such, we don’t have to wait synchronously for something to happen. We tell the worker pool to read the file and call the provided function with the result. Since worker pool has its own threads, the event loop can continue executing normally while the file is being read.

It’s all good until there’s a need to synchronously execute some complex operation: any function that takes too long to run will block the thread. If an application has many such functions, it could significantly decrease the throughput of the server or freeze it altogether. In this case, there’s no way of delegating the work to the worker pool.

Fields that require complex calculations  —  such as AI, machine learning, or big data  —  couldn’t really use Node.js efficiently due to the operations blocking the main (and only) thread, making the server unresponsive. That was the case up until Node.js v10.5.0 came out, which added support for multiple threads.

---

## Introducing `worker_threads`

The `worker_threads` module is a package that allows us to create fully functional multi-threaded Node.js applications.

A thread worker is a piece of code (usually taken out of a file) spawned in a separate thread.

Note that the terms thread worker, worker, and thread are often used interchangeably; they all refer to the same thing.

To start using thread workers, we have to import the `worker_threads` module. Let’s start by creating a function to help us spawn these thread workers, and then we’ll talk a little bit about their properties:

```js
type WorkerCallback = (err: any, result?: any) => any;
export function runWorker(path: string, cb: WorkerCallback, workerData: object | null = null) {
 const worker = new Worker(path, { workerData });
 worker.on('message', cb.bind(null, null));
 worker.on('error', cb);
 worker.on('exit', (exitCode) => {
   if (exitCode === 0) {
     return null;
   }
   return cb(new Error(`Worker has stopped with code ${exitCode}`));
 });
 return worker;
}
```

To create a worker, we have to create an instance of the `Worker` class. In the first argument, we provide a path to the file that contains the worker’s code; in the second, we provide an object containing a property called `workerData`. This is the data we’d like the thread to have access to when it starts running.

Note that whether you use JavaScript itself or something that transpiles to JavaScript (e.g., TypeScript), the path should always refer to files with either `.js` or `.mjs` extensions.

I would also like to point out why we used the callback approach as opposed to returning a promise that would be resolved when the `message` event is fired. This is because workers can dispatch many `message` events, not just one.

As you can see in the example above, the communication between threads is event-based, which means we are setting up listeners to be called once a given event is sent by the worker.

Here are the most common events:

```js
worker.on('error', (error) => {});
```

The `error` event is emitted whenever there’s an uncaught exception inside the worker. The worker is then terminated, and the error is available as the first argument in the provided callback:

```js
worker.on('exit', (exitCode) => {});
```

`exit` is emitted whenever a worker exits. If `process.exit()` was called inside the worker, `exitCode` would be provided to the callback. If the worker was terminated with `worker.terminate()`, the code would be `1`:

```js
worker.on('online', () => {});
```

`online` is emitted whenever a worker stops parsing the JavaScript code and starts the execution. It’s not used very often, but it can be informative in specific cases:

```js
worker.on('message', (data) => {});
```

`message` is emitted whenever a worker sends data to the parent thread.

Now let’s take a look at how the data is being shared between threads.

---

## Two ways of using workers

There are two ways to implement worker threads and reap the benefits that worker threads provide.

The first way is to spawn the worker, execute its code, and send the result to the parent. With this approach, we will have to set up a new worker from the start each time.

There is a lot of overhead cost that is required when creating a worker, starting the thread, and the memory overhead of creating a new worker head, and additional resources that are required to manage each thread. Although tasks can be implemented while using the first approach, it isn’t an efficient approach — especially when implementing large-scale Node based systems. To cater to the pain points that arise with this approach, there is another way that is also a standard industry practice.

The second way is to implement a worker pool. A worker pool solves the pain points of the first approach by creating a tool of worker threads that can be reused for multiple tasks. Instead of creating a worker thread each time, we can instead create a pool and assign the tasks to workers inside them.

In technical terms, a worker pool can be considered as an abstract data type that manages a pool of worker threads. Each worker thread in the pool is assigned a task and the thread runs the task in parallel to the other threads.

There are multiple ways of assigning tasks. The worker pool also acts as a manager by distributing tasks to the worker threads, collecting results from them, and enabling communication between those that are present in that worker pool.

A worker pool can be implemented by using different data structures and algorithms i.e, task queue and message passing systems. The choice of using a specific data structure depends on the requirements i.e, a number of worker threads required, the exact nature of the task, and how much communication between the threads is needed.

### Implementing the worker pool

In Node, a worker pool can be implemented by using built-in features or by using third-party tools. The built-in `worker-threads` module in the node provides support for worker threads, which can be used to build a worker pool. There are several libraries that can also be used to complement the worker pool.

These libraries provide high-level API for worker threads and also provide additional support such as automating the scheduling of tasks and thread management. To give an idea of how the worker pool is implemented, here is a sample code that uses the built-in `worker-threads` feature of Node:

```js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Main thread code
  // Create an array to store worker threads
  const workerThreads = [];
  // Create a number of worker threads and add them to the array
  for (let i = 0; i < 4; i++) {
    workerThreads.push(new Worker(__filename));
  }
  // Send a message to each worker thread with a task to perform
  workerThreads.forEach((worker, index) => {
    worker.postMessage({ task: index });
  });
} else {
  // Worker thread code
  // Listen for messages from the main thread
  parentPort.on('message', message => {
    console.log(`Worker ${process.pid}: Received task ${message.task}`);
    // Perform the task
    performTask(message.task);
  });
  function performTask(task) {
    // … operations to be performed to execute the task
  }
}
```

There are two portions in the code.above One is for the main thread and the other is for the worker thread. Firstly, we are importing the necessary members from the module and then, if the current execution context is in the main thread, we are creating an array to store four workers. After the creation of each worker, this code sends a new message to each of the worker threads with a task to be performed.

In the worker thread portion, we are listening for the messages from the main thread by using the `on` method of the `parentPort` property. After receiving the message, it logs the process id with the task and passes it on to a function performing the task that will apply appropriate methods to the task.

---

## What are the main benefits of using threads?

In essence, threads are a valuable tool that can significantly impact the performance, responsiveness, and overall efficiency of a program. When utilized effectively, they can make a big difference in the outcome of a program and help it keep pace with user demands.

Threading in Node.js is a powerful tool for developers. It allows them to split a process into multiple, completely autonomous execution streams. If used correctly, threading can improve the quality of a program by enhancing its speed, efficiency, and responsiveness.

Some of the main advantages of threading are:

1. **Improved performance**: Instead of just running one task, threads facilitate the running of multiple programs concurrently and thus allows the faster execution of the whole program
2. **Responsiveness**: If a task is compute-heavy, it will block or delay the execution of the rest of the operations, delaying the execution of the whole program. With threading, if a compute-heavy task is taking time and delaying the response from one thread, it won’t affect the responsiveness of the program as other threads can continue to handle user input and other tasks
3. **Resource sharing**: In Node.js, due to process-level global scope and inter-process communication, multiple threads can share resources. Sharing of resources helps multiple threads in accessing and modifying shared data i.e, variables, thus allowing concurrent processing which results in faster execution of the program
4. **Ease of programming**: With the introduction of threading, programmers don’t have to worry about the limitations of the single-threaded architecture of Node.js, making programming efficient and scalable
5. **Improved scalability**: It is easy and efficient to scale threads, thus they make it easier to build high-performance and scalable Node.js applications that can handle the increased load without any difficulty

---

## Conclusion

`worker_threads` provide a fairly easy way to add multi-threading support to our applications. By delegating heavy CPU computations to other threads, we can significantly increase our server’s throughput. With the official threads support, we can expect more developers and engineers from fields like AI, machine learning, and big data to start using Node.js.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A complete guide to threads in Node.js",
  "desc": "While it is single-threaded, Node.js uses worker threads that allow for a separate execution thread that runs alongside the main thread.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-threads-node-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
