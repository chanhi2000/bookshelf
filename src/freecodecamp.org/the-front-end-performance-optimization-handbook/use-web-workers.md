---
lang: en-US
title: "Use Web Workers"
description: "Article(s) > (18/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (18/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
    - property: og:description
      content: "Use Web Workers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/use-web-workers.html
date: 2025-05-07
isOriginal: false
author:
  - name: Gordan Tan
    url : https://freecodecamp.org/news/author/woai3c/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Front-End Performance Optimization Handbook – Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-web-workers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

Web Workers use other worker threads to operate independently of the main thread. They can perform tasks without interfering with the user interface. A worker can send messages to the JavaScript code that created it by sending messages to the event handler specified by that code (and vice versa).

Web Workers are suitable for processing pure data or long-running scripts unrelated to the browser UI.

Creating a new worker is simple – just specify a script URI to execute the worker thread (main.js):

```js
var myWorker = new Worker('worker.js');
// You can send messages to the worker through the postMessage() method and onmessage event
first.onchange = function() {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
}

second.onchange = function() {
  myWorker.postMessage([first.value, second.value]);
  console.log('Message posted to worker');
}
```

In the worker, after receiving the message, you can write an event handler function code as a response (<FontIcon icon="fa-brands fa-js"/>`worker.js`):

```js
onmessage = function(e) {
  console.log('Message received from main script');
  var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
  console.log('Posting message back to main script');
  postMessage(workerResult);
}
```

The `onmessage` handler function executes immediately after receiving the message, and the message itself is used as the data property of the event. Here we simply multiply the two numbers and use the `postMessage()` method again to send the result back to the main thread.

Back in the main thread, we use `onmessage` again to respond to the message sent back from the worker:

```js
myWorker.onmessage = function(e) {
  result.textContent = e.data;
  console.log('Message received from worker');
}
```

Here we get the data from the message event and set it as the `textContent` of result, so the user can directly see the result of the calculation.

Note that inside the worker, you cannot directly manipulate DOM nodes, nor can you use the default methods and properties of the window object. But you can use many things under the window object, including data storage mechanisms such as WebSockets, IndexedDB, and Firefox OS-specific Data Store API.

::: info Reference

<SiteInfo
  name="Using Web Workers - Web APIs | MDN"
  desc="Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the fetch() or XMLHttpRequest APIs. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

- [How web workers work in JS](https://freecodecamp.org/news/how-webworkers-work-in-javascript-with-example/)
<!-- TODO:  /freecodecamp.org/how-webworkers-work-in-javascript-with-example.md -->

:::