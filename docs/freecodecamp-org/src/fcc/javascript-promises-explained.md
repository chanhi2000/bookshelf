---
lang: en-US
title: "JavaScript Promises Explained"
description: "Article(s) > JavaScript Promises Explained"
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
      content: "Article(s) > JavaScript Promises Explained"
    - property: og:description
      content: "JavaScript Promises Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/javascript-promises-explained.html
prev: /programming/js/articles/README.md
date: 2020-01-16
isOriginal: false
cover: https://cdn-media-2.freecodecamp.org/w1280/5f9c9ddb740569d1a4ca3a03.jpg
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
  name="JavaScript Promises Explained"
  desc="What is a promise in JavaScript? JavaScript is single threaded, meaning that two bits of script cannot run at the same time; they have to run one after another. A Promise is an object that represents the eventual completion (or failure) of an asynchr..."
  url="https://freecodecamp.org/news/javascript-promises-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-2.freecodecamp.org/w1280/5f9c9ddb740569d1a4ca3a03.jpg"/>

## What is a promise in JavaScript?

JavaScript is single threaded, meaning that two bits of script cannot run at the same time; they have to run one after another. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.

```js
var promise = new Promise(function(resolve, reject) {
  // do thing, then…

  if (/* everything worked */) {
    resolve("See, it worked!");
  }
  else {
    reject(Error("It broke"));
  }
});
```

---

## A Promise exists in one of these states

- Pending: initial state, neither fulfilled nor rejected.
- Fulfilled: operation completed successfully.
- Rejected: operation failed.

The Promise object works as proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action’s eventual success value or failure reason.

This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

---

## Using ‘Then’ (Promise Chaining)

To take several asynchronous calls and synchronize them one after the other, you can use promise chaining. This allows using a value from the first promise in later subsequent callbacks.

```js
Promise.resolve('some')
  .then(function(string) { // <-- This will happen after the above Promise resolves (returning the value 'some')
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'thing';
        resolve(string);
      }, 1);
    });
  })
  .then(function(string) { // <-- This will happen after the above .then's new Promise resolves
    console.log(string); // <-- Logs 'something' to the console
  });
```

---

## Promise API

There are 4 static methods in the Promise class:

- Promise.resolve
- Promise.reject
- Promise.all
- Promise.race

---

## Promises can be chained together

When writing Promises to solve a particular problem, you can chain them together to form logic.

```js
var add = function(x, y) {
  return new Promise((resolve,reject) => {
    var sum = x + y;
    if (sum) {
      resolve(sum);
    }
    else {
      reject(Error("Could not add the two values!"));
    }
  });
};

var subtract = function(x, y) {
  return new Promise((resolve, reject) => {
    var sum = x - y;
    if (sum) {
      resolve(sum);
    }
    else {
      reject(Error("Could not subtract the two values!"));
    }
  });
};

// Starting promise chain
add(2,2)
  .then((added) => {
    // added = 4
    return subtract(added, 3);
  })
  .then((subtracted) => {
    // subtracted = 1
    return add(subtracted, 5);
  })
  .then((added) => {
    // added = 6
    return added * 2;    
  })
  .then((result) => {
    // result = 12
    console.log("My result is ", result);
  })
  .catch((err) => {
    // If any part of the chain is rejected, print the error message.
    console.log(err);
  });
```

This is useful for following a *Functional Programming* paradigm. By creating functions for manipulating data you can chain them together to assemble a final result. If at any point in the chain of functions a value is *rejected* the chain will skip to the nearest `catch()` handler.

For more information on Functional Programming: [<VPIcon icon="fa-brands fa-wikipedia-w"/>Functional Programming](https://en.wikipedia.org/wiki/Functional_programming)

---

## Function Generators

In recent releases, JavaScript has introduced more ways to natively handle Promises. One such way is the function generator. Function generators are “pausable” functions. When used with Promises, generators can make using a lot easier to read and appear “synchronous”.

```js
const myFirstGenerator = function* () {
  const one = yield 1;
  const two = yield 2;
  const three = yield 3;

  return 'Finished!';
}

const gen = myFirstGenerator();
```

Here’s our first generator, which you can see by the `function*` syntax. The `gen` variable we declared will not run `myFirstGenerator`, but instead will “this generator is ready to use”.

```js
console.log(gen.next());
// Returns { value: 1, done: false }
```

When we run `gen.next()` it will unpause the generator and carry on. Since this is the first time we have called `gen.next()` it will run `yield 1` and pause until we call `gen.next()` again. When `yield 1` is called, it will return to us the `value` that was yielded and whether or not the generator is `done`.

```js
console.log(gen.next());
// Returns { value: 2, done: false }

console.log(gen.next());
// Returns { value: 3, done: false }

console.log(gen.next());
// Returns { value: 'Finished!', done: true }

console.log(gen.next());
// Will throw an error
```

As we keep calling `gen.next()` it will keep going onto the next `yield` and pausing each time. Once there are no more `yield`’s left, it will proceed to run the rest of the generator, which in this case simply returns `'Finished!'`. If you call `gen.next()` again, it will throw an error as the generator is finished.

Now, imagine if each `yield` in this example was a `Promise`, the code itself would appear extremely synchronous.

### `Promise.all(iterable)` is very usefull for multiple request to different source

The `Promise.all(iterable)` method returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.

```js
var promise1 = Promise.resolve(catSource);
var promise2 = Promise.resolve(dogSource);
var promise3 = Promise.resolve(cowSource);

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
// expected output: Array ["catData", "dogData", "cowData"]
```

::: info More info on Promises

```component VPCard
{
  "title": "How JavaScript promises actually work from the inside out",
  "desc": "By Shailesh Shekhawat One of the most important questions I faced in interviews was how promises are implemented. Since async/await is becoming more popular, you need to understand promises. What is a Promise? A promise is an object which represents ...",
  "link": "/freecodecamp.org/how-javascript-promises-actually-work-from-the-inside-out.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Implementing Promises In JavaScript",
  "desc": "By Maciej Cieślar The thing I love most about programming is the aha! moment when you start to fully understand a concept. Even though it might take a long time and no small amount of effort to get there, it sure is worth it. I think that the most ef...",
  "link": "/freecodecamp.org/how-to-implement-promises-in-javascript.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Write a JavaScript Promise",
  "desc": "What is a promise? A JavaScript promise is an object that represents the completion or failure of an asynchronous task and its resulting value.¹ The end. I’m kidding of course. So, what does that definition even mean? First of all, many things in Jav...",
  "link": "/freecodecamp.org/how-to-write-a-javascript-promise.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript Promises Explained",
  "desc": "What is a promise in JavaScript? JavaScript is single threaded, meaning that two bits of script cannot run at the same time; they have to run one after another. A Promise is an object that represents the eventual completion (or failure) of an asynchr...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/javascript-promises-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
