---
lang: en-US
title: "How to Implement Multi-Threading in Node.js With Worker Threads [Full Handbook]"
description: "Article(s) > How to Implement Multi-Threading in Node.js With Worker Threads [Full Handbook]"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement Multi-Threading in Node.js With Worker Threads [Full Handbook]"
    - property: og:description
      content: "How to Implement Multi-Threading in Node.js With Worker Threads [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-multi-threading-in-nodejs-with-worker-threads-full-handbook/
prev: /programming/js-express/articles/README.md
date: 2025-10-25
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761323431527/d74eb2ba-edaa-4d19-a041-364e99a705ba.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement Multi-Threading in Node.js With Worker Threads [Full Handbook]"
  desc="JavaScript is a single-threaded programming language, and Node.js is the runtime environment for JavaScript. This means that JavaScript essentially runs within Node.js, and all operations are handled through a single thread. But when we perform tasks..."
  url="https://freecodecamp.org/news/how-to-implement-multi-threading-in-nodejs-with-worker-threads-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761323431527/d74eb2ba-edaa-4d19-a041-364e99a705ba.png"/>

JavaScript is a single-threaded programming language, and Node.js is the runtime environment for JavaScript. This means that JavaScript essentially runs within Node.js, and all operations are handled through a single thread.

But when we perform tasks that require heavy processing, Node.js's performance can start to decline. Many people mistakenly think that Node.js isn’t good or that JavaScript is flawed. But there’s actually a solution. JavaScript can also be used effectively with multi-threading.

In this article, we will focus on the backend: specifically, how to implement multi-threading on the server side using Node.js.

---

## Here’s What We’ll Cover

2. [Project Setup with ExpressJS](#heading-project-setup-with-expressjs)
3. [Understanding the Problem](#heading-understanding-the-problem)
4. [Understanding JavaScript Execution](#heading-understanding-javascript-execution)
5. [The CPU-Intensive Problem](#heading-the-cpu-intensive-problem)
6. [How to Implement Worker Threads](#heading-how-to-implement-worker-threads)
7. [How to Optimize with Multiple Cores](#heading-how-to-optimize-with-multiple-cores)
8. [How to Implement Multi-Core Optimization](#heading-how-to-implement-multi-core-optimization)
9. [Performance Comparison](#heading-performance-comparison)

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. Basic JavaScript (ES6-style) knowledge
2. Familiarity with Node.js fundamentals
3. Web-server basics using Express (or similar)
4. Understanding of blocking vs non-blocking operations in Node.js / JavaScript
5. Comfort with asynchronous code (Promises / async/await) and event-based handling
6. Setting up a simple development environment with Node.js

:::

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out here:

---

## Project Setup with ExpressJS

In this section, we will go through a detailed, beginner-friendly setup for a Node.js project using [<VPIcon icon="iconfont icon-expressjs"/>Express](https://expressjs.com/). This guide explains every step, so even if you are new to Node.js, you can follow along easily.

### 1. Create a New Project Folder

Start by creating a new folder for your project. Open your terminal or command prompt and run:

```sh
mkdir node-worker-threads
cd node-worker-threads
```

- `mkdir node-worker-threads`: This command creates a new folder named `node-worker-threads`.
- `cd node-worker-threads`: Moves you into the newly created folder where all project files will be stored.

Think of this folder as the home for your project.

### 2. Initialize a Node.js Project

Every Node.js project needs a <VPIcon icon="iconfont icon-json"/>`package.json` file to manage dependencies and scripts. Run:

```sh
npm init -y
```

- `npm init` creates a <VPIcon icon="iconfont icon-json"/>`package.json` file.
- The `-y` flag automatically fills in default values, saving you time.

After this, you will see a <VPIcon icon="iconfont icon-json"/>`package.json` file in your project folder. This file keeps track of all packages and configurations.

### 3. Install Express.js

Express is a lightweight web framework for Node.js. Install it with:

```sh
npm install express
```

This adds Express to your project and allows you to create routes, handle requests, and send responses easily.

### 4. Optional: Install Nodemon for Development

Nodemon automatically restarts your server whenever you make changes. This is very useful during development.

```sh
npm install -D nodemon
```

The `-D` flag installs Nodemon as a development dependency.

Next, Update <VPIcon icon="iconfont icon-json"/>`package.json` scripts:

```json title="package.json"
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

Now you can start the server with:

```sh
npm run dev
```

This will automatically restart your server whenever you make code changes.

### 5. Create the Main Server File

Create a file called <VPIcon icon="fa-brands fa-js"/>`index.js`. This will be the main entry point of your application:

```sh
touch index.js
```

Open <VPIcon icon="fa-brands fa-js"/>`index.js` and add the following code:

```js title="index.js"
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Non-blocking route
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking.");
});

// Blocking route using Worker Threads
app.get("/blocking", (req, res) => {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result++;
  }
  res.status(200).send(`Result is ${result}`);
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

Here’s what’s going on in this code:

- `express`: To create the server.
- `Worker`: To run CPU-intensive tasks in a separate thread.
- `/non-blocking` route: Sends a quick response immediately.
- `/blocking` route: Runs a Worker thread to handle heavy computation.
- `app.listen`: Starts the server on port 3000 (or environment port).

Don’t worry if all of this isn’t perfectly clear at the moment. We’ll explore everything in greater detail as we move forward. Get ready, because we’re going to break down each part step by step in the simplest way possible.

### 6. Run the Project

Start the server using Nodemon:

```sh
npm run dev
```

Or without Nodemon:

```sh
node index.js
```

Visit these URLs in your browser:

- `http://localhost:3000/non-blocking` displays a simple non-blocking message.
- `http://localhost:3000/blocking` executes a CPU-intensive task using Worker Threads.

**Congratulations!** Your Node.js project with Express is fully set up and ready for development.

---

## Understanding the Problem

We have already set up a basic Express.js application, which is essentially a Node.js app. In this application, we have defined **two routes**:

1. `/non-blocking`
2. `/blocking`

The `/non-blocking` route is straightforward: it simply returns a text response saying, "This page is non-blocking."

On the other hand, the `/blocking` route contains a heavy computation. It runs a loop up to one million numbers, calculates the sum of all these numbers, and then returns the result.

Finally, the application is set to run on port 3000 using `app.listen`.

### Observing the Behavior

If you open your browser and visit the `http://localhost:3000/non-blocking` URL, it works perfectly fine and responds immediately.

![Non-blocking Browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079165626/6d6a3c24-8095-4243-83db-8a44865e5af9.png)

But if you visit the `http://localhost:3000/blocking` URL, the page keeps loading and doesn’t respond right away.

What's even more interesting is that if you try to access `http://localhost:3000/non-blocking` **while** `/blocking` is still running, it also becomes unresponsive.

This demonstrates a key concept: while the `/blocking` route is executing, even the `/non-blocking` route cannot respond. In other words, the heavy computation in `/blocking` **blocks the Node.js event loop**, affecting all other routes.

![Blocking Browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079338040/ecaf458e-d91a-4752-863e-71ac34081949.gif)

### Why Does This Happen?

The reason lies in how Node.js works. Node.js is essentially a JavaScript runtime, and as we know, JavaScript is a **single-threaded** programming language. Naturally, Node.js also runs on a single thread by default.

![Single Threaded Programming](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079437967/3330b62c-54c2-41a9-bccc-8f962e71287c.gif)

So, where does the problem arise? When you execute the `/blocking` route, all the JavaScript code runs on the **main thread**. During this time, the main thread is completely busy or blocked. As a result, if another user tries to access the `/non-blocking` route, they won't get any response because the main thread is still occupied with the previous task.

This is why many people mistakenly think that JavaScript is weak because it's single-threaded. But this perception is not entirely accurate. With the right approach and techniques, JavaScript **can also be used in a multi-threaded way**, allowing you to handle heavy computations without blocking other operations.

![Weak JS](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079547228/0799f826-3715-4664-b94b-e8f2e80afd04.gif)

---

## Understanding JavaScript Execution

Let's think about the main thread where JavaScript primarily runs. You might ask, where exactly does JavaScript execute? JavaScript runs inside the **JavaScript engine**, which is responsible for converting JavaScript code into machine code.

In the case of Node.js, it runs on the **V8 engine**, which is the same engine used in Google Chrome. The V8 engine operates entirely on a single thread, meaning all JavaScript code executes within just one main thread.

Now, you might wonder: are there any threads other than the main thread? The answer is yes. Apart from the main thread, there are additional threads used to handle different types of tasks. The management and implementation of these threads are handled by a special library called **Libuv**.

![Understanding JavaScript Execution](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079628895/02bc21f7-1d49-4952-9c17-3f57cbbe3488.gif)

### How Libuv Works

Libuv is designed to work alongside the V8 Engine. While the V8 Engine executes JavaScript code on the main thread, additional threads are used to handle different types of tasks. For example, operations like database queries, network requests, or file read/write tasks are handled by these extra threads, and the Libuv library manages and coordinates them.

Whenever we perform such tasks, they are actually executed on these extra threads outside the main thread. Libuv instructs the V8 Engine on how to handle these tasks efficiently. These tasks are commonly referred to as **Input/Output operations**, or I/O operations for short. In other words, when performing file read/write, database queries, or network requests, these I/O operations are executed on separate threads without blocking the Main Thread.

But if we have tasks like a large for-loop in our earlier example, or any operation that primarily requires **CPU processing**, they do not fall under I/O operations. In such cases, the task must be executed on the main thread, which inevitably blocks it until the task is completed.

![How libuv works](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079720366/9f01e68c-ad5f-491a-9e68-d91a4ec5f3fb.gif)

### Asynchronous Nature of Node.js

Consider a scenario where a client sends a request to the main thread, and this request requires a database query to be executed.

When the user sends such a request, the database query is sent to the database, but importantly, it **does not block** the main thread. Instead, Libuv handles the database query on a **separate thread**, keeping the Main Thread free to handle other tasks.

In this situation, if another user sends a request that does **not** involve any database query or I/O operation, it can be executed immediately on the Main Thread. As a result, this second user receives a response without any delay.

Once the database query running on the separate thread completes, the result is returned to the Main Thread, which then sends it back as a response to the original user. This approach ensures that users receive their output efficiently, and the main thread remains available for other tasks.

This entire process represents the **asynchronous nature** of JavaScript and Node.js. Tasks are not executed synchronously – instead, they run asynchronously. One user's request can be processed on a separate thread while other users continue to interact with the server seamlessly. This is how Node.js maintains high performance and responsiveness even under multiple simultaneous requests.

![Asynchronous Nature of Node.js](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079806477/dd7b58e2-48ab-4994-ad09-41fad2f0b78b.gif)

### The CPU-Intensive Problem

So, this is how everything works effectively. Now, the question is, what happens if the main thread has a task that doesn't require any database access for a user's request but demands heavy CPU processing? In that case, the main thread will get blocked.

Let's say a task on the main thread is consuming a lot of CPU. If we execute it directly on the main thread, the event loop will get blocked, and other requests won't be able to be processed.

This is where **worker threads** come into play in Node.js. With worker threads, we can spin up a new thread outside the main thread to handle CPU-heavy operations separately. As a result, the main thread stays free, allowing other requests to be processed immediately.

In other words, by using worker threads, we can run **CPU-bound** tasks **asynchronously**, ensuring that the server's throughput and responsiveness are not affected.

![CPU Intensive Problem](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079890972/98686661-0c5f-493e-a0b4-25c744c60938.gif)

---

## How to Implement Worker Threads

If we take a look at our previous <VPIcon icon="fa-brands fa-js"/>`index.js` file, the task in the `/blocking` route handler is running entirely on the main thread, which is why it causes blocking. So, how can we solve this problem? The solution is to use Node.js's built-in worker threads module.

There is **no need to install any external package**, as worker threads is a core module of Node.js.  
We can directly require the `Worker` class from the `worker_threads` module and create a new worker thread.

```js title="index.js"
const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

// Non-blocking route
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking.");
});

// Blocking route using Worker Threads
app.get("/blocking", (req, res) => {
  const worker = new Worker("./worker.js");

  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result++;
  }
  res.status(200).send(`Result is ${result}`);
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

How it works:

- Inside the `/blocking` route handler, we create a new worker using `new Worker()` and provide a file path.
- This file (<VPIcon icon="fa-brands fa-js"/>`worker.js`) contains the **CPU-heavy** task that we want the worker to execute.
- For example, our heavy for-loop is moved into this separate file.

We create a new file named <VPIcon icon="fa-brands fa-js"/>`worker.js` and paste the loop there:

```js title="worker.js"
for (let i = 0; i < 1000000000; i++) {
  result++;
}
```

When we pass the path to <VPIcon icon="fa-brands fa-js"/>`worker.js` while creating the Worker, Node.js starts a new thread.

This new thread executes the CPU-intensive task independently, keeping the main thread free to handle other incoming requests.

By doing this, the application becomes more responsive and can handle multiple requests without blocking.

### Communication Between Threads

In Node.js, we have the main thread and additional worker threads. To coordinate tasks between them, we can use a **messaging system**. Essentially, all results eventually need to reach the main thread. Otherwise, we won't be able to provide any output to the user.

For example, suppose you assign a task to Thread B and another task to Thread C. When these threads complete their tasks, they must inform the main thread. They do this by sending messages through the messaging system.

Think of it like exchanging messages in an inbox: Thread C sends a message directly to the main thread once its task is finished. Through this communication, worker threads notify the main thread about task completion and send any necessary data.

This is exactly the mechanism we will use in our example to handle CPU-heavy tasks with worker threads, ensuring that the main thread remains free and responsive.

![Communication between threads](https://cdn.hashnode.com/res/hashnode/image/upload/v1761079966779/34f22f5e-9334-4e89-b54f-71de3de90923.gif)

### Setting Up Worker Communication

So, we’ve created a <VPIcon icon="fa-brands fa-js"/>`worker.js` file. Now, the question is, how do we inform the main thread about the task being done in this file?

To achieve this, we extract `parentPort` from the built-in `worker_threads` module in Node.js. The `parentPort` is a special object that allows communication **between the worker thread and the main thread**. It acts as a bridge: whenever the worker completes a task, it can send the result back to the main thread through this channel.

Once the task is complete, we use the method `parentPort.postMessage(result)` to send the final data. In other words, we’re posting a message to the parent thread, and in our case, that message is the computed result of our loop.

Here’s the full code for the <VPIcon icon="fa-brands fa-js"/>`worker.js` file:

```js title="worker.js
const { parentPort } = require("worker_threads");

let result = 0;
for (let i = 0; i < 10000000000; i++) {
  result++;
}

parentPort.postMessage(result);
```

In this example:

- We import parentPort from worker_threads.
- We perform a heavy task – a loop that counts up to 10 billion.
- After finishing the loop, we send the result back to the main thread using `parentPort.postMessage(result)`.

This is how communication between the worker thread and the main thread takes place in Node.js.

Now, the question is, once we send the data from the worker, how do we **receive it** in the `/blocking` handler of our <VPIcon icon="fa-brands fa-js"/>`index.js` file?

To do this, we need to set up a **listener** inside the handler. For that, we use the `worker.on()` method.

So, what exactly are we listening for? We listen for the `"message"` event – just like we listen for `onClick` or other events in JavaScript.

The first parameter of `worker.on()` is the event name (`"message"`), and the second parameter is a **callback function**. Inside that callback, the first argument represents the data we receive from the worker.

Once we receive the data, we can send it back to the browser as a response using:

```js title+"index.js"
// Inside the `/blocking` route handler, we listen for messages from the worker thread.
// Whenever the worker completes its task and sends a message, 
// the callback receives the data as the `data` parameter.
// We then send this data back to the client as an HTTP response with status code 200.
worker.on("message", (data) => {
  res.status(200).send(`Result is ${data}`);
});
```

::: info Explanation

- `worker.on("message", callback)` listens for messages sent from the worker thread using `parentPort.postMessage()`.
- The `data` parameter contains the result sent by the worker.
- Using `res.status(200).send(...)`, we send the computed result back to the browser.
- This allows the heavy computation to happen in a separate thread, keeping the main thread free and responsive.

:::

At the same time, we should also handle possible errors.

If any error occurs inside the worker, we can listen for it using the **"error"** event in the same way:

```js title="index.js"
// In the `/blocking` route handler, we listen for any errors that occur inside the worker thread.
// If an error occurs, the callback receives the error object `err`,
// and we send it back as an HTTP response with status code 400. 
worker.on("error", (err) => {
  res.status(400).send(`An Error occurred : ${err}`);
});
```

::: info Explanation

- `worker.on("error", callback)` listens specifically for errors inside the worker thread.
- The `err` parameter contains details about what went wrong in the worker.
- Using `res.status(400).send(...)`, we return the error to the client so the request doesn’t hang silently.

:::

**Here’s how the complete code looks:**

```js title="index.js"
const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;

// Non-blocking route
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non-blocking.");
});

// Blocking route using worker threads
app.get("/blocking", (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`Result is ${data}`);
  });

  worker.on("error", (err) => {
    res.status(400).send(`An Error occured : ${err}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
```

Once this is set up, you'll see a dramatic change. The `/blocking` route is loading, but even while it's loading, repeatedly refreshing the `/non-blocking` route works perfectly without any issues!

![Setting up worker communication](https://cdn.hashnode.com/res/hashnode/image/upload/v1761080061445/f1f213c7-6cce-4334-81e5-8cd828682f8e.gif)

Now notice, the `/non-blocking` route is accessible, which means even though the `/blocking` route is still running, it doesn't affect anything. So, we've successfully solved this problem. We moved the main task to a separate thread outside the main thread. What does this mean? The main thread created a new worker thread and assigned the CPU-heavy task to it. The new thread now works independently, while the main thread remains free.

Finally, when the new thread completes its task, it also becomes free. Then, through the messaging system, the new thread informs the main thread, "Your data is ready, here's your data." The main thread receives this data and sends it to the client as a response.

Therefore, the tasks that were automatically handled on separate threads for database queries or file read-write operations – because they were I/O operations – we have now manually initiated a thread and used it to handle similar CPU-heavy tasks.

![IO Operations](https://cdn.hashnode.com/res/hashnode/image/upload/v1761080131679/148cc279-e4f0-4f68-b2a9-34110abcbc90.gif)

---

## How to Optimize with Multiple Cores

Now that you have a clear understanding of how the process works, let's take it one step further and optimize it using multiple CPU cores.

When you visit the `/blocking` route, you might notice that it still takes a significant amount of time to respond. This indicates that the optimization isn't fully complete yet. So far, we've used a separate thread meaning we've utilized **one CPU core** outside the main thread. But most modern machines have **multiple cores**, and we can take advantage of that to improve performance.

![Final index](https://cdn.hashnode.com/res/hashnode/image/upload/v1761080243361/dddd924c-9138-4790-ac6c-811b39772c6c.gif)

### Checking How Many Cores Your System Has

Before assigning multiple cores, you can check how many cores are available on your system:

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
sysctl -n hw.ncpu
```

This command returns the total number of CPU cores on your machine. For example, on my Mac, it shows `10`, meaning I have ten cores available.

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
nproc
```

This will print the number of processing units available.

@tab <VPIcon icon="fa-brands fa-windows" />

```sh
echo %NUMBER_OF_PROCESSORS%
```

:::

Each of these commands will help you determine how many cores you can use for parallel processing.

### Utilizing Multiple Cores for Faster Execution

Once you know how many cores your machine has, you can decide how many of them to allocate for a specific job. For example, since my system has ten cores, I might choose to use four cores for the task.

By distributing the workload across multiple threads (each running on its own core), you can achieve significant performance improvements. Instead of relying on just one core, the system can execute multiple parts of the task simultaneously reducing the total execution time dramatically.

In short, the more cores you effectively utilize, the faster your computationally heavy tasks can complete (as long as your code is designed to handle parallel execution safely).

---

## How to Implement Multi-Core Optimization

Now, we'll optimize the `/blocking` task by using multiple worker threads. First, we’ll create copies of our existing files:

- <VPIcon icon="fa-brands fa-js"/>`index.js` → <VPIcon icon="fa-brands fa-js"/>`index-optimized.js`
- <VPIcon icon="fa-brands fa-js"/>`worker.js` → <VPIcon icon="fa-brands fa-js"/>`worker-optimized.js`

We plan to use four threads. Even though the machine may have more cores, using all could overload the system, so we’ll limit it to four.

```js :collapsed-lines title="index-optimize.js"
const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = process.env.PORT || 3000;
const THREAD_COUNT = 4;

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./worker-optimized.js", {
            workerData: {
                thread_count: THREAD_COUNT,
            },
        });

        worker.on("message", (data) => {
            resolve(data);
        });

        worker.on("error", (err) => {
            reject(`An Error occured : ${err}`);
        });
    });
}

app.get("/non-blocking", (req, res) => {
    res.status(200).send("This page is non-blocking.");
});

app.get("/blocking", async (req, res) => {
    const workerPromise = [];

    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromise.push(createWorker());
    }

    const threadResults = await Promise.all(workerPromise);
    const total =
        threadResults[0] +
        threadResults[1] +
        threadResults[2] +
        threadResults[3];

    res.status(200).send(`Result is ${total}`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
```

Here, we create a `createWorker` function that returns a Promise. Inside it, the worker is created, and the message and error events are handled. In the `/blocking` route, we create multiple workers asynchronously, wait for all of them to finish using `Promise.all`, and then sum the results.

```js title="worker-optimize.js"
const { parentPort, workerData } = require("worker_threads");

let result = 0;
for (let i = 0; i < 10000000000 / workerData.thread_count; i++) {
    result++;
}

parentPort.postMessage(result);
```

Each worker receives `thread_count` from the main thread and calculates its part of the task. Once done, it sends the result back using `parentPort.postMessage`. This way, heavy computation is distributed, and the main thread remains free.

### Understanding the Code Line by Line

Alright, some of these concepts might seem a bit complex at first. But don't worry! We we’ll go through all the code line by line, explaining everything in detail so that you understand exactly what is happening and why.

### Thread Planning and Configuration

Now, coming to the main point we'll be using threads, right? We've planned to use multiple threads. Let's say we've decided to use four threads. Our machine has ten cores, but we won't use them all because that would consume all our system resources. So, we'll use four threads from four of the available cores.

For this reason, in the <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` file, we've created a constant to store the number of threads we'll use. Let's say we've set it to 4 here, so that later another developer can easily change it if needed.

#### The createWorker Function

Then, we've created a new function called `createWorker`. The purpose of this function is to create a new Worker. Here, we’re returning a promise because the process of creating a Worker is performed asynchronously.

This is because when we create four workers, we want the creation process itself to happen asynchronously, so the main thread doesn't get blocked. After all, creating a worker is essentially a separate process.

The best practice is to create workers asynchronously. That's why we created the `createWorker` function, which returns a promise. As we know, events are listened to inside a promise, where resolve and reject are used. In the `/blocking` handler, we can handle the worker's result or any errors through this promise.

#### Creating a Worker

To create a worker, we use:

```js
const worker = new Worker("./worker-optimized.js");
```

Here, we need to provide the path to the Worker file. Then, as the second parameter, we can pass some options. For example, if we want to send some data to the Worker, we use `{ workerData }`. Inside this `workerData`, we'll send the `THREAD_COUNT`, which is stored in our file as `THREAD_COUNT`.

For instance, we can pass an object in `workerData` like:

```js
{
  threadCount: THREAD_COUNT;
}
```

When this Worker is being created, we send some properties from <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` as `workerData`. This is because in <VPIcon icon="fa-brands fa-js"/>`worker-optimized.js`, the worker can use `parentPort` to know how many threads it should use. So, we've included a `threadCount` property in `workerData`. When the worker starts, it reads `threadCount` from `workerData` and works accordingly. This is how we've designed the `createWorker` function, which simply returns a Promise.

#### Event Handling and Promise Structure

Here, we made an important change compared to our original <VPIcon icon="fa-brands fa-js"/>`index.js` file.

Since we copied all the code from <VPIcon icon="fa-brands fa-js"/>`index.js` into <VPIcon icon="fa-brands fa-js"/>`index-optimized.js`, we adjusted the `/blocking` route handler. Specifically, we removed the direct creation of the Worker from the `/blocking` handler. Instead, the Worker is now created inside the `createWorker` function.

Also, all the event listeners (`message` and `error`) that were previously inside the `/blocking` handler have also been moved into the `createWorker` function. This means that the worker is fully managed within the function, and the `/blocking` handler now only handles the promise results, keeping the main thread clean and organized.

But since these events are being listened to inside a promise, we cannot send the response directly from there. We'll send the response inside the `/blocking` handler. So from the Promise, we only use `resolve` and `reject`.

::: tip For example

```js
resolve(`Result is ${data}`);
reject(`An error occurred ${err}`);
```

:::

In other words, the entire process of creating a worker has been moved into the `createWorker` function, which ultimately returns a promise.

### Dividing Work Across Multiple Workers

Now, inside the `/blocking` handler, I simply call the `createWorker` function. The workerData we provide tells the worker what task it should perform. The created worker is linked with parentPort in the <VPIcon icon="fa-brands fa-js"/>`worker-optimized.js` file, which essentially communicates with the parent thread.

Now, we want to divide the for-loop running up to one million across four cores. The number of cores to use is sent from <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` as part of workerData. Because this information is in workerData, the workers can automatically divide and handle the tasks among themselves.

So, in the <VPIcon icon="fa-brands fa-js"/>`worker-optimized.js` file, we'll get the workerData using:

```js
{ workerData } = require("worker_threads")
```

Then, in the for-loop condition, we'll use `workerData.threadCount`. This means the threadCount sent from <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` will be used here instead of hardcoding 4. This is best practice because the data is passed to the worker at the time of its creation. In <VPIcon icon="fa-brands fa-js"/>`worker-optimized.js`, we use this to divide the work into four parts. Then, four workers will be created, meaning the `createWorker` function will be called four times. Each worker will take one part of the work, and at the end, all results will be combined. This is how the entire process is completed.

So, in this `/blocking` handler, our task is to collect the results of the four promises and then sum them all. Let's say we store them in an array called `workerPromises`. Each entry in this array will hold the promise result of a worker. Then, by combining all of them, we get the final result.

Since we need to create four Workers, we'll run a for-loop: `for (let i = 0; i < THREAD_COUNT; i++)`. Inside the body of this loop, we'll call the `createWorker` function each time. This means that in every iteration, a new worker is created, and its promise is pushed into the `workerPromises` array.

So, inside the body of this loop, we'll call the `createWorker` function four times. Each call to `createWorker` returns a promise. These four promises are pushed into the `workerPromises` array, like `workerPromises.push(createWorker())`. This way, each worker has its own promise. In the end, since all the promises are stored in the `workerPromises` array, we can easily call `Promise.all(workerPromises)`.

So, we used `threadResults = await Promise.all(workerPromises)`. As we know, `Promise.all` can handle multiple Promises together. Here, we passed the `workerPromises` array, so `threadResults` will contain the results of the four promises as separate elements, like `threadResults[0]`, `threadResults[1]`, `threadResults[2]`, and `threadResults[3]`. Then, we sum these results to get the total calculation, meaning `threadResults[0] + threadResults[1] + threadResults[2] + threadResults[3]` gives the final result. Since we used await, the entire function needs to be async.

Once everything is done correctly, we can send this total result to the client using `res.status(200).send(Result is ${total})`. This way, the total calculation works correctly, unlike before.

So, I hope it's clear now: we called the `createWorker` function four times here. Each call returns a promise. We then awaited all these promises together using `Promise.all`, so all the results came in at once. After that, we summed these results. The `/blocking` handler is essentially the one executing our operational work.

### Handling Complex Tasks

So, in the <VPIcon icon="fa-brands fa-js"/>`worker-optimized.js` file, we've essentially divided the work into four parts. But it's not necessary that the task will always be a for-loop. There could be different types of complex tasks as well, like image processing, data processing, or pagination.

In such cases, we can't always follow the same pattern. So, we need to send the necessary data from <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` as `workerData`, and the worker will use that data to perform the task in a separate process.

In the previous example, all the steps were sequential, so simply summing the results gave us the total. But in the case of complex tasks, we need to use data-driven processing.

In other complex applications, you might need to perform different tasks. But the main concept is clear: any data or property we send from here will be received by the worker, which will then divide the work. Each worker – whether you use four, five, or six – will handle its part, and all the results will need to be accumulated. This is essentially the entire process.

---

## Performance Comparison

When working with CPU-intensive tasks in Node.js, dividing the work using worker threads can significantly improve performance. Let's compare the behavior of our application before and after optimization.

### Testing Results

Running the <VPIcon icon="fa-brands fa-js"/>`index.js` file and hitting the `/blocking` route in the browser takes a significant amount of time.

![Final Index](https://cdn.hashnode.com/res/hashnode/image/upload/v1761164273474/02892dd3-3524-4e7e-83fa-ac279910d759.gif)

Running the <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` file and hitting the same route takes considerably less time – around 3 seconds.

![Final Optimized](https://cdn.hashnode.com/res/hashnode/image/upload/v1761164303764/4ba27180-49f7-4485-a1a5-73f2f419ab9b.gif)

Stopping it and running <VPIcon icon="fa-brands fa-js"/>`index.js` again clearly shows the original implementation is slower.

![Final unoptimized](https://cdn.hashnode.com/res/hashnode/image/upload/v1761164358090/4c3b9056-b936-4341-9302-461c290ea70e.gif)

### Performance Metrics

| **File** | **Route** | **Approx. Response Time** | **Notes** |
| --- | --- | --- | --- |
| <VPIcon icon="fa-brands fa-js"/>`index.js` | `/blocking` | Much longer | This is the original implementation. The single-threaded loop blocks the event loop, causing delays. |
| <VPIcon icon="fa-brands fa-js"/>`index-optimized.js` | `/blocking` | Around 3 seconds | Here, the work is divided into multiple worker threads, making the process much faster. |

### Key Takeaways

This comparison demonstrates how dividing the work into multiple parts using worker threads can make CPU-intensive tasks far more efficient, keeping the main thread responsive and improving overall performance.

---

## Summary

So, first we saw in <VPIcon icon="fa-brands fa-js"/>`index.js` how a blocking task can be handled in a `non-blocking`, asynchronous way. That is, we ran a worker thread, and because of this worker thread, the main thread didn't get blocked, allowing other users to continue their tasks simultaneously.

### The Multi-Core Challenge

But the problem is, when we use a new thread on the server, there isn't just a single core. Usually, there are multiple cores, like `8`, `16`, or more. To use multiple cores, we first need to find out how many cores are available on the server.

### Discovering Available Cores

If the server is Linux, we can easily find out the total number of cores using the `nproc` command. Then we can decide how many cores to use. For example, let's say we decide to use three cores. In <VPIcon icon="fa-brands fa-js"/>`index-optimized.js`, we've implemented a way to divide the work among these cores.

### Asynchronous Worker Creation

So, what we did was wrap the worker creation process in a promise. Since creating a worker takes some time and spinning it up isn't instantaneous, this process is done asynchronously. This way, even if multiple users hit the endpoint to create Workers, the main thread won't be blocked.

### How to Implement Multi-Core Optimization

We simply created workers, and then using the `createWorker` function inside a loop, we spawned four or a specified number of Workers based on the thread count. Each worker posts messages independently, and through the listener, we receive data from each worker. These results are collected via promises, stored together in an array, and finally, we sum all the results from this array to get the final outcome.

So, the other concepts are all part of basic JavaScript. I hope you now understand how worker threads work and how we can use multi-threaded processes in Node.js. It's an excellent concept and a great opportunity to learn thoroughly.

### What We Learned

Worker Threads in Node.js provide a powerful way to handle CPU-intensive tasks without blocking the main event loop. By leveraging multiple cores and distributing work across threads, we can significantly improve application performance while maintaining responsiveness for other users.

- **Non-blocking execution**: Worker threads prevent the main thread from being blocked
- **Multi-core utilization**: We can leverage multiple CPU cores for parallel processing
- **Asynchronous worker creation**: Using promises to handle worker creation without blocking
- **Result aggregation**: Collecting and combining results from multiple workers
- **Performance optimization**: Distributing heavy computations across multiple threads

This approach is particularly valuable for applications that need to handle computationally intensive tasks while remaining responsive to user requests.

---

## Final Words

If you found the information here valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [watch my coding tutorials (<VPIcon icon="fa-brands fa-youtube"/>`/@logicBaseLabs`)](https://youtube.com/@logicBaseLabs), [<VPIcon icon="fas fa-globe"/>visit my website](https://sumitsaha.me) or simply [connect with me (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/) on LinkedIn.

::: info Additional Resources

You can also check the [<VPIcon icon="fa-brands fa-node"/>Node.js Worker Threads documentation](https://nodejs.org/api/worker_threads.html) for more in-depth learning. You can find all the source code from this tutorial in [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`logicbaselabs/node-worker-threads`)](https://github.com/logicbaselabs/node-worker-threads/). If it helped you in any way, consider giving it a star to show your support!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Multi-Threading in Node.js With Worker Threads [Full Handbook]",
  "desc": "JavaScript is a single-threaded programming language, and Node.js is the runtime environment for JavaScript. This means that JavaScript essentially runs within Node.js, and all operations are handled through a single thread. But when we perform tasks...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-multi-threading-in-nodejs-with-worker-threads-full-handbook/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
