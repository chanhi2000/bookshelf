---
lang: en-US
title: "Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More"
description: "Article(s) > Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More"
    - property: og:description
      content: "Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/synchronous-vs-asynchronous-in-javascript.html
prev: /programming/js/articles/README.md
date: 2021-09-14
isOriginal: false
author: 
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://freecodecamp.org/news/content/images/2021/09/freeCodeCamp-Cover-2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More"
  desc="Let me start this article by asking, ”What is JavaScript”? Well, here's the most confusing yet to-the-point answer I have found so far: JavaScript is a single-threaded, non-blocking, asynchronous, concurrent programming language with lots of flexibi..."
  url="https://freecodecamp.org/news/synchronous-vs-asynchronous-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/09/freeCodeCamp-Cover-2.png"/>

Let me start this article by asking, "What is JavaScript"? Well, here's the most confusing yet to-the-point answer I have found so far:

> JavaScript is a single-threaded, non-blocking, asynchronous, concurrent programming language with lots of flexibility.

Hold on a second - did it say single-threaded and asynchronous at the same time? If you understand what single-threaded means, you'll likely mostly associate it with synchronous operations. How can JavaScript be asynchronous, then?

In this article, we will learn all about the synchronous and asynchronous parts of JavaScript. You use both in web programming almost daily.

If you like to learn from video content as well, this article is also available as a video tutorial here: 🙂

In this article, You'll Learn:

- How JavaScript is synchronous.
- How asynchronous operations occur when JavaScript is single-threaded.
- How understanding synchronous vs. asynchronous helps you better understand JavaScript promises.
- Lots of simple but powerful examples to cover these concepts in detail.

---

## JavaScript Functions are First-Class Citizens

In JavaScript, you can create and modify a function, use it as an argument, return it from another function, and assign it to a variable. All these abilities allow us to use functions everywhere to place a bunch of code logically.

![Lines of code organized into functions logically](https://freecodecamp.org/news/content/images/2021/08/block-function.png)

We need to tell the JavaScript engine to execute functions by invoking them. It'll look like this:

```js
// Define a function
function f1() {
    // Do something
    // Do something again
    // Again
    // So on...
}

// Invoke the function
f1();
```

By default, every line in a function executes sequentially, one line at a time. The same is applicable even when you invoke multiple functions in your code. Again, line by line.

---

## Synchronous JavaScript - How the Function Execution Stack Works

So what happens when you define a function and then invoke it? The JavaScript engine maintains a `stack` data structure called `function execution stack`. The purpose of the stack is to track the current function in execution. It does the following:

- When the JavaScript engine invokes a function, it adds it to the stack, and the execution starts.
- If the currently executed function calls another function, the engine adds the second function to the stack and starts executing it.
- Once it finishes executing the second function, the engine takes it out from the stack.
- The control goes back to resume the execution of the first function from the point it left it last time.
- Once the execution of the first function is over, the engine takes it out of the stack.
- Continue the same way until there is nothing to put into the stack.

The function execution stack is also known as the `Call Stack`.

![Function Execution Stack](https://freecodecamp.org/news/content/images/2021/09/stack.png)

Let's look at an example of three functions that execute one by one:

```js
function f1() {
  // some code
}
function f2() {
  // some code
}
function f3() {
  // some code
}

// Invoke the functions one by one
f1();
f2();
f3();
```

Now let's see what happens with the function execution stack:

![A step-by-step flow shows the execution order](https://freecodecamp.org/news/content/images/2021/09/first-flow.gif)

Did you see what happened there? First, `f1()` goes into the stack, executes, and pops out. Then `f2()` does the same, and finally `f3()`. After that, the stack is empty, with nothing else to execute.

Ok, let's now work through a more complex example. Here is a function `f3()` that invokes another function `f2()` that in turn invokes another function `f1()`.

```js
function f1() {
  // Some code
}
function f2() {
  f1();
}
function f3() {
  f2();
}
f3();
```

Let's see what's going on with the function execution stack:

![A step-by-step flow shows the execution order](https://freecodecamp.org/news/content/images/2021/09/second-flow.gif)

Notice that first `f3()` gets into the stack, invoking another function, `f2()`. So now `f2()` gets inside while `f3()` remains in the stack. The `f2()` function invokes `f1()`. So, time for `f1()` to go inside the stack with both `f2()` and `f3()` remaining inside.

First, `f1()` finishes executing and comes out of the stack. Right after that `f2()` finishes, and finally `f3()`.

The bottom line is that everything that happens inside the `function execution stack` is sequential. This is the `Synchronous` part of JavaScript. JavaScript's `main` thread makes sure that it takes care of everything in the stack before it starts looking into anything `elsewhere`.

Great! Now that we understand how `synchronous` operations work in JavaScript, let's now flip the coin and see its `asynchronous` side. Are you ready?

---

## Asynchronous JavaScript - How Browser APIs and Promises Work

The word `asynchronous` means **not occurring at the same time**. What does it mean in the context of JavaScript?

Typically, executing things in sequence works well. But you may sometimes need to fetch data from the server or execute a function with a delay, something you do not anticipate occurring `NOW`. So, you want the code to execute `asynchronously`.

In these circumstances, you may not want the JavaScript engine to halt the execution of the other sequential code. So, the JavaScript engine needs to manage things a bit more efficiently in this case.

We can classify most asynchronous JavaScript operations with two primary triggers:

1. **Browser API/Web API** events or functions. These include methods like `setTimeout`, or event handlers like click, mouse over, scroll, and many more.
2. **Promises**. A unique JavaScript object that allows us to perform asynchronous operations.

Don't worry if you are new to promises. You do not need to know more than this to follow this article. At the end of the article, I have provided some links so you can start learning promises in the most beginner-friendly way.

---

## How to Handle Browser APIs/Web APIs

Browser APIs like `setTimeout` and event handlers rely on `callback` functions. A callback function executes when an asynchronous operation completes. Here is an example of how a `setTimeout` function works:

```js
function printMe() {
  console.log('print me');
}

setTimeout(printMe, 2000);
```

The `setTimeout` function executes a function after a certain amount of time has elapsed. In the code above, the text `print me` logs into the console after a delay of 2 seconds.

Now assume we have a few more lines of code right after the `setTimeout` function like this:

```js
function printMe() {
  console.log('print me');
}

function test() {
  console.log('test');
}

setTimeout(printMe, 2000);
test();
```

So, what do we expect to happen here? What do you think the output will be?

Will the JavaScript engine wait for 2 seconds to go to the invocation of the `test()` function and output this:

```sh
printMe
test
```

Or will it manage to keep the callback function of `setTimeout` aside and continue its other executions? So the output could be this, perhaps:

```sh
test
printMe
```

If you guessed the latter, you're right. That's where the asynchronous mechanism kicks in.

---

## How the JavaScript Callback Queue Works (aka Task Queue)

JavaScript maintains a queue of callback functions. It is called a callback queue or task queue. A queue data structure is `First-In-First-Out(FIFO)`. So, the callback function that first gets into the queue has the opportunity to go out first. But the question is:

- When does the JavaScript engine put it in the queue?
- When does the JavaScript engine take it out of the queue?
- Where does it go when it comes out of the queue?
- Most importantly, how do all these things relate to the asynchronous part of JavaScript?

Whoa, lots of questions!

![Let's figure out the answers with the help of the following image](https://freecodecamp.org/news/content/images/2021/09/taskQ.png)

The above image shows the regular `call stack` we have seen already. There are two additional sections to track if a browser API (like setTimeout) kicks in and `queue`s the callback function from that API.

The JavaScript engine keeps executing the functions in the call stack. As it doesn't put the callback function straight into the stack, there is no question of any code waiting for/blocking execution in the stack.

The engine creates a `loop` to look into the queue periodically to find what it needs to pull from there. It pulls a callback function from the queue to the call stack when the stack is empty. Now the callback function executes generally as any other function in the stack. The loop continues. This loop is famously known as the `Event Loop`.

So, the moral of the story is:

- When a Browser API occurs, park the callback functions in a queue.
- Keep executing code as usual in the stack.
- The event loop checks if there is a callback function in the queue.
- If so, pull the callback function from the queue to the stack and execute.
- Continue the loop.

Alright, let's see how it works with the code below:

```js
function f1() {
    console.log('f1');
}

function f2() {
    console.log('f2');
}

function main() {
    console.log('main');

    setTimeout(f1, 0);

    f2();
}

main();
```

The code executes a `setTimeout` function with a callback function `f1()`. Note that we have given zero delays to it. This means that we expect the function `f1()` to execute immediately. Right after setTimeout, we execute another function, `f2()`.

So, what do you think the output will be? Here it is:

```sh
main
f2
f1
```

But, you may think that `f1` should print before `f2` as we do not delay f1 to execute. But no, that's not the case. Remember the `event loop` mechanism we discussed above? Now, let's see it in a step-by-step flow for the above code.

![Image](https://freecodecamp.org/news/content/images/2021/09/third-flow.gif) *Event loop - see the step-by-step execution*

Here are steps written out:

1. The `main()` function gets inside the call stack.
2. It has a console log to print the word main. The `console.log('main')` executes and goes out of the stack.
3. The setTimeout browser API takes place.
4. The callback function puts it into the callback queue.
5. In the stack, execution occurs as usual, so `f2()` gets into the stack. The console log of `f2()` executes. Both go out of the stack.
6. The `main()` also pops out of the stack.
7. The event loop recognizes that the call stack is empty, and there is a callback function in the queue.
8. The callback function `f1()` then goes into the stack. Execution starts. The console log executes, and `f1()` also comes out of the stack.
9. At this point, nothing else is in the stack and queue to execute further.

I hope it's now clear to you how the `asynchronous` part of JavaScript works internally. But, that's not all. We have to look at `promises`.

---

## How the JavaScript Engine Handles Promises

In JavaScript, promises are special objects that help you perform asynchronous operations.

You can create a promise using the `Promise` constructor. You need to pass an `executor` function to it. In the executor function, you define what you want to do when a promise returns successfully or when it throws an error. You can do that by calling the `resolve` and `reject` methods, respectively.

Here is an example of a promise in JavaScript:

```js
const promise = new Promise((resolve, reject) =>
        resolve('I am a resolved promise');
);
```

After the promise is executed, we can handle the result using the `.then()` method and any errors with the `.catch()` method.

```js
promise.then(result => console.log(result))
```

You use promises every time you use the `fetch()` method to get some data from a store.

The point here is that JavaScript engine doesn't use the same `callback queue` we have seen earlier for browser APIs. It uses another special queue called the `Job Queue`.

---

## What is the Job Queue in JavaScript?

Every time a promise occurs in the code, the executor function gets into the job queue. The event loop works, as usual, to look into the queues but gives priority to the `job queue` items over the `callback queue` items when the `stack` is free.

The item in the callback queue is called a `macro task`, whereas the item in the job queue is called a `micro task`.

So the entire flow goes like this:

- For each loop of the `event loop`, one task is completed out of the `callback queue`.
- Once that task is complete, the event loop visits the `job queue`. It completes all the `micro tasks` in the job queue before it looks into the next thing.
- If both the queues got entries at the same point in time, the `job queue` gets preference over the `callback queue`.

![The image below shows the inclusion of the job queue along with other preexisting items](https://freecodecamp.org/news/content/images/2021/09/JObQ.png)

Now, let's look at an example to understand this sequence better:

```js
function f1() {
    console.log('f1');
}

function f2() {
    console.log('f2');
}

function main() {
    console.log('main');

    setTimeout(f1, 0);

    new Promise((resolve, reject) =>
        resolve('I am a promise')
    ).then(resolve => console.log(resolve))

    f2();
}

main();
```

In the above code, we have a `setTimeout()` function as before, but we have introduced a promise right after it. Now remember all that we have learned and guess the output.

If your answer matches this, you are correct:

```sh
main
f2
I am a promise
f1
```

Now let's see the flow of actions:

![Callback queue vs. Job queue](https://freecodecamp.org/news/content/images/2021/09/fourth-flow.gif)

The flow is almost the same as above, but it is crucial to notice how the items from the job queue prioritize the items from the task queue. Also note that it doesn't even matter if the `setTimeout` has zero delay. It is always about the job queue that comes before the callback queue.

Alright, we have learned everything we need to understand synchronous and asynchronous execution in JavaScript.

---

## Here is a Quiz for You!

Let's test your understanding by taking a quiz. Guess the output of the following code and apply all the knowledge we have gained so far:

```js
function f1() {
  console.log('f1');
}

function f2() { 
  console.log('f2');
}

function f3() { 
  console.log('f3');
}

function main() {
  console.log('main');

  setTimeout(f1, 50);
  setTimeout(f3, 30);

  new Promise((resolve, reject) =>
    resolve('I am a Promise, right after f1 and f3! Really?')
  ).then(resolve => console.log(resolve));

  new Promise((resolve, reject) =>
    resolve('I am a Promise after Promise!')
  ).then(resolve => console.log(resolve));

  f2();
}

main();
```

Here is the expected output:

```sh
# 
# main
# f2
# I am a Promise, right after f1 and f3! Really?
# I am a Promise after Promise!
# f3
# f1
#
```

Do you want more such quizzes? [Head over to this repository (<FontIcon icon="iconfont icon-github"/>`atapas/promise-interview-ready`)](https://github.com/atapas/promise-interview-ready) to practice more exercises.

In case you are stuck or need any clarifications, my DM is always [open on Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://twitter.com/tapasadhikary).

---

## In Summary

To summarize:

- The JavaScript engine uses the stack data structure to keep track of currently executed functions. The stack is called the function execution stack.
- The function execution stack (aka call stack) executes the functions sequentially, line-by-line, one-by-one.
- The browser/web APIs use callback functions to complete the tasks when an asynchronous operation/delay is done. The callback function is placed in the callback queue.
- The promise executor functions are placed in the job queue.
- For each loop of the event loop, one macro task is completed out of the callback queue.
- Once that task is complete, the event loop visits the job queue. It completes all the micro-tasks in the job queue before it looks for the next thing.
- If both the queues get entries at the same point in time, the job queue gets preference over the callback queue.

---

## Before We End...

That's all for now. I hope you've found this article insightful, and that it helps you understand JavaScript's synchronous vs asynchronous concepts better.

Let's connect. You can follow me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://twitter.com/tapasadhikary), My [Youtube channel (<FontIcon icon="fa-brands fa-youtube"/>`@TapasAdhikary`)](https://youtube.com/c/TapasAdhikary), and [GitHub (<FontIcon icon="iconfont icon-github"/>`atapas`)](https://github.com/atapas).

As promised before, here are a few articles you may find useful,

- [JavaScript Promises - Explain Like I'm Five](https://blog.greenroots.info/javascript-promises-explain-like-i-am-five)
- [JavaScript Promise Chain - The art of handling promises](https://blog.greenroots.info/javascript-promise-chain-the-art-of-handling-promises)
- [JavaScript async and await - in plain English, please](https://blog.greenroots.info/javascript-async-and-await-in-plain-english-please)
- [Introducing PromiViz - visualize and learn JavaScript promise APIs](https://blog.greenroots.info/introducing-promiviz-visualize-and-learn-javascript-promise-apis)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Synchronous vs Asynchronous JavaScript - Call Stack, Promises, and More",
  "desc": "Let me start this article by asking, ”What is JavaScript”? Well, here's the most confusing yet to-the-point answer I have found so far: JavaScript is a single-threaded, non-blocking, asynchronous, concurrent programming language with lots of flexibi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/synchronous-vs-asynchronous-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```