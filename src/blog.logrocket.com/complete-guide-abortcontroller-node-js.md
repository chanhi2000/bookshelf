---
lang: en-US
title: "The complete guide to AbortController in Node.js"
description: "Article(s) > The complete guide to AbortController in Node.js"
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
      content: "Article(s) > The complete guide to AbortController in Node.js"
    - property: og:description
      content: "The complete guide to AbortController in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-abortcontroller-node-js.html
prev: /programming/js-node/articles/README.md
date: 2022-06-06
isOriginal: false
author:
  - name: Joseph Mawa
    url : https://blog.logrocket.com/author/josephmawa/
cover: /assets/image/blog.logrocket.com/complete-guide-abortcontroller-node-js/banner.png
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
  name="The complete guide to AbortController in Node.js"
  desc="The AbortController API in Node.js is a wonderful new development - learn all about it in this comprehensive tutorial."
  url="https://blog.logrocket.com/complete-guide-abortcontroller-node-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/complete-guide-abortcontroller-node-js/banner.png"/>

## Introduction

JavaScript is a single-threaded programming language. Depending on the runtime environment, the JavaScript engine offloads asynchronous processes, such as making network requests, file system access, and other time-consuming jobs, to some APIs to achieve asynchrony.

![](/assets/image/blog.logrocket.com/complete-guide-abortcontroller-node-js/banner.png)

Ordinarily, we expect the result of an asynchronous operation to succeed or fail. However, the process can also take more time than anticipated, or you may no longer need the results when you receive them.

Therefore, it is logical to terminate an asynchronous operation that has taken more time than it should or whose result you don’t need. However, doing so natively in Node.js was a daunting challenge for a very long time.

`AbortController` was introduced in Node v15.0.0 to address the above problem. It is for aborting certain asynchronous operations natively in Node. This tutorial will be a complete guide to the `AbortController` and `AbortSignal` APIs.

---

## Introduction to the `AbortController` API

As highlighted in the previous section, the `AbortController` API became part of Node in v15.0.0. It is a handy API for aborting some asynchronous processes, similar to the `AbortController` interface in the browser environment.

You need to create an instance of the `AbortController` class to use it:

```js
const controller = new AbortController();
```

An instance of the `AbortController` class exposes the `abort` method and the `signal` property.

Invoking the `abort` method emits the `abort` event to notify the abortable API watching the controller about the cancellation. You can pass an optional reason for aborting to the `abort` method. If you don’t include a reason for the cancellation, it defaults to the `AbortError`.

To listen for the `abort` event, you need to add an event listener to the controller’s `signal` property using the `addEventListener` method so that you run some code in response to the `abort` event. An equivalent method for removing the event listener is the `removeEventListener` method.

The code below shows how to add and remove the `abort` event listener with the `addEventListener` and `removeEventListener` methods:

```js
const controller = new AbortController();
const { signal } = controller;

const abortEventListener = (event) => {
  console.log(signal.aborted); // true
  console.log(signal.reason); // Hello World
};

signal.addEventListener("abort", abortEventListener);
controller.abort("Hello World");
signal.removeEventListener("abort", abortEventListener);
```

The controller’s `signal` has a `reason` property, which is the reason you pass to the `abort` method at cancellation. Its initial value is `undefined`. The value of the `reason` property changes to the reason you pass as an argument to the `abort` method or defaults to `AbortError` if you abort without providing a reason for the cancellation. Similarly, the signal’s `aborted` property with an initial value of `false` changes to `true` after aborting.

Unlike in the above example, practical use of the `AbortController` API involves passing the `signal` property to any cancelable asynchronous API. You can pass the same `signal` property to as many cancelable APIs. The APIs will then wait for the controller’s “signal” to abort the asynchronous operation when you invoke the `abort` method.

Most of the built-in cancellation-aware APIs implement the cancellation out of the box for you. You pass in the controller’s `signal` property to the API, and it aborts the process when you invoke the controller’s `abort` method.

However, to implement a custom cancelable promise-based functionality, you need to add an event listener which listens for the `abort` event and cancels the process from the event handler when the event is triggered.

---

## How to use `AbortController` in Node.js

As pointed out in the introduction, the `AbortController` API is a relatively new addition to Node. Therefore, a few asynchronous APIs support it at the moment. These APIs include the new Fetch API, timers, `fs.readFile`, `fs.writeFile`, `http.request`, and `https.request`.

We will learn how to use the AbortController API with some of the mentioned APIs. Because the APIs work withAbortController in a similar way, we shall only look at the Fetch and `fs.readFile` API.

### How to use `AbortController` with the Fetch API

Historically, `node-fetch` has been the de facto HTTP client for Node. With the introduction of [**the Fetch API in Node.js**](/blog.logrocket.com/fetch-api-node-js.md), however, that is about to change. Though experimental at the time of writing, Fetch is one of the native APIs whose behavior you can control with the `AbortController` API.

As explained above, you pass the `signal` property of the `AbortController` instance to any abortable, promise-based API like Fetch. The example below illustrates how you can use it with the `AbortController` API:

```js
const url = "https://jsonplaceholder.typicode.com/todos/1";

const controller = new AbortController();
const signal = controller.signal;

const fetchTodo = async () => {
  try {
    const response = await fetch(url, { signal });
    const todo = await response.json();
    console.log(todo);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Operation timed out");
    } else {
      console.error(err);
    }
  }
};

fetchTodo();

controller.abort();
```

The trivial example above illustrates how to use the `AbortController` API with the Fetch API in Node. However, in a real-world project, you don’t start an asynchronous operation and abort it immediately like in the code above.

It is also worth emphasizing that `fetch` is still an experimental feature in Node. Its features might change in future versions.

### How to use `AbortController` with `fs.readFile`

I n the previous section, we looked at using `AbortController` with the Fetch API. Similarly, you can use this API with the other cancelable APIs.

You can do this by passing the controller’s `signal` property to the API’s respective function. The code below shows how to use `AbortController` with `fs.readFile`:

```js
const fs = require("node:fs");

const controller = new AbortController();
const { signal } = controller;

fs.readFile("data.txt", { signal, encoding: "utf8" }, (error, data) => {
  if (error) {
    if (error.name === "AbortError") {
      console.log("Read file process aborted");
    } else {
      console.error(error);
    }
    return;
  }
  console.log(data);
});

controller.abort();
```

Since the other cancelable APIs work similarly with `AbortController`, we won’t cover them here.

---

## Introduction to `AbortSignal`

Each `AbortController` class instance has a corresponding `AbortSignal` class instance, accessible using the `signal` property. However, `AbortSignal` has functions such as the `AbortSignal.timeout` static method that you can also use independent of `AbortController`.

The `AbortSignal` class extends the `EventTarget` class and can receive the `abort` event. Therefore, you can use the `addEventListener` and `removeEventListener` methods to add and remove listeners for the `abort` event:

```js :collapsed-lines
const controller = new AbortController();
const { signal } = controller;

signal.addEventListener(
  "abort",
  () => {
    console.log("First event handler");
  },
  { once: true }
);
signal.addEventListener(
  "abort",
  () => {
    console.log("Second event handler");
  },
  { once: true }
);

controller.abort();
```

As in the above example, you can add as many event handlers as possible. Invoking the controller’s `abort` method will trigger all the event listeners. Removing the `abort` event listener after aborting the asynchronous process is standard practice to prevent memory leaks.

You can pass the optional third argument `{ once: true }` to `addEventListener` as we did above instead of using `removeEventListener` to remove the event listener. The optional third argument will ensure Node triggers the event listener once and remove it.

---

## How to use `AbortSignal` to time out async operations in Node.js

As mentioned above, in addition to using it with `AbortController`, the `AbortSignal` class has some handy methods you might need. One of these methods is the `AbortSignal.timeout` static method. As its name suggests, you can use it to abort cancelable asynchronous processes on timeout.

It takes the number of milliseconds as an argument and returns a signal you can use to timeout an abortable operation. The code below shows how you can implement it with the Fetch API:

```js :collapsed-lines
const signal = AbortSignal.timeout(200);
const url = "https://jsonplaceholder.typicode.com/todos/1";

const fetchTodo = async () => {
  try {
    const response = await fetch(url, { signal });
    const todo = await response.json();
    console.log(todo);
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Operation timed out");
    } else {
      console.error(err);
    }
  }
};

fetchTodo();
```

You can use `AbortSignal.timeout` similarly with the other abortable APIs.

---

## How to implement an abortable API using `AbortController` and `AbortSignal`

As highlighted in the previous section, several built-in asynchronous APIs have support for the `AbortController` API. However, you can also implement a custom abortable promise-based API that uses `AbortController`.

Like the built-in APIs, your API should take the `signal` property of an `AbortController` class instance as an argument as in the example below. It is standard practice for all APIs capable of using the `AbortController` API:

```js :collapsed-lines
const myAbortableApi = (options = {}) => {
  const { signal } = options;

  if (signal?.aborted === true) {
    throw new Error(signal.reason);
  }

  const abortEventListener = () => {
    // Abort API from here
  };
  if (signal) {
    signal.addEventListener("abort", abortEventListener, { once: true });
  }
  try {
    // Run some asynchronous code
    if (signal?.aborted === true) {
      throw new Error(signal.reason);
    }
    // Run more asynchronous code
  } finally {
    if (signal) {
      signal.removeEventListener("abort", abortEventListener);
    }
  }
};
```

In the example above, we first checked whether the value of signal’s `aborted` property is `true`. If so, it means the controller’s `abort` method has been invoked. Therefore, we throw an error.

Like mentioned in the previous sections, you can register the `abort` event listener using the `addEventListener` method. To prevent memory leaks, we are passing the `{ once: true }` option as the third argument to the `addEventListener` method. It removes the event handler after handling the `abort` event.

Similarly, we removed the event listener using the `removeEventListener` in the `finally` block to prevent memory leaks. If you don’t remove it, and the `myAbortableApi` function runs successfully without aborting, the event listener you added will still be attached to the `signal` even after exiting the function.

---

## Conclusion

Ordinarily, an asynchronous processes may succeed, fail, take longer than anticipated, or you may not need the results when you receive them. Therefore, it is logical to cancel an asynchronous operation that has taken more time than it should or whose results you don’t need. The `AbortController` API is a handy functionality for doing just that.

The `AbortController` API is globally available. Therefore, you don’t need to import it. An instance of the `AbortController` class exposes the `abort` method and the `signal` property. The `signal` property is an instance of the `AbortSignal` class. Each `AbortController` class instance has a corresponding AbortSignal class instance, which you can access using the controller’s `signal` property.

You pass the `signal` property to a cancelable asynchronous API and invoke the controller’s `abort` method to trigger the abort process. If the built-in APIs do not meet your use case, you can also implement a custom abortable API using `AbortController` and `AbortSignal`. However, follow the best practices hinted above to prevent memory leaks.

Did I miss anything? Leave a comment in the comments section below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The complete guide to AbortController in Node.js",
  "desc": "The AbortController API in Node.js is a wonderful new development - learn all about it in this comprehensive tutorial.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-abortcontroller-node-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
