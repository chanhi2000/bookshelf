---
lang: en-US
title: "Understanding (and effectively using) asynchronous JavaScript"
description: "Article(s) > Understanding (and effectively using) asynchronous JavaScript"
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
      content: "Article(s) > Understanding (and effectively using) asynchronous JavaScript"
    - property: og:description
      content: "Understanding (and effectively using) asynchronous JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-asynchronous-javascript.html
prev: /programming/js/articles/README.md
date: 2020-11-06
isOriginal: false
author:
  - name: Fortune Ikechi
    url : https://blog.logrocket.com/author/fortuneikechi/
cover: /assets/image/blog.logrocket.com/understanding-asynchronous-javascript/banner.png
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
  name="Understanding (and effectively using) asynchronous JavaScript"
  desc="In this article, we will learn what asynchronous JavaScript is and how to write asynchronous JavaScript using promises and async/await."
  url="https://blog.logrocket.com/understanding-asynchronous-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/understanding-asynchronous-javascript/banner.png"/>

JavaScript has grown to become one of the most popular languages in the world today. It is a single-threaded language which means only one thing can be done at a time. This had previously been a limitation until asynchronous JavaScript — using promises and async/await — was added to JavaScript.

![Understanding async javascript](/assets/image/blog.logrocket.com/understanding-asynchronous-javascript/banner.png)

In this article, we will learn how to use asynchronous JavaScript more effectively.

---

## Introduction

JavaScript is a single-threaded language, meaning it only allows one logic to be performed at a time, because of this you can’t perform complex long functions that will block JavaScript’s main thread. To solve this, callbacks — which are [<VPIcon icon="fas fa-globe"/>functions](https://javascripttutorial.net/javascript-function/) passed into other functions as an argument to be executed later — were used to perform asynchronous functions. Using async JavaScript, you can perform large functions without blocking the main thread of JavaScript.

To better understand this, let’s look at what we mean by synchronous and asynchronous JavaScript.

---

## Synchronous JavaScript

Synchronous JavaScript as the name implies, means in a sequence, or an order. Here, every function or program is done in a sequence, each waiting for the first function to execute before it executes the next, synchronous code goes from top to bottom.

To better understand synchronous JavaScript, let’s look at the code below:

```js
let a = 5;
let b = 10;
console.log(a);
console.log(b);
```

And here is the result:

![synchronous JavaScript functions displaying function results, 5 and 10, in the console](/assets/image/blog.logrocket.com/understanding-asynchronous-javascript/synchronousjs.png)

Here, the JavaScript engine executes the first one in the equation, which in this case is 5 and then goes down to execute the second line of code, printing 10 to the console. If we add any other line of code, the JavaScript engine executes it based on the position we add it, this is what synchronous JavaScript entails, a sequential way of executing code.

---

## Asynchronous JavaScript

Now, we have an idea on how synchronous JavaScript works, let’s talk about asynchronous JavaScript. To explain this, let’s look at the code below:

```js
console.log("Hello.");
setTimeout(function() {
  console.log("Goodbye!");
}, 3000);
console.log("Hello again!");
```

Unlike our other example, JavaScript engine won’t execute the code above synchronously. Let’s take a look at the output below:

!["Hello!", "Hello again!", and "Goodbye" all logged in the console](/assets/image/blog.logrocket.com/understanding-asynchronous-javascript/asynchronousjavascript.png)

In the code, we logged `Hello` to our console, next we wrote a function that will log `Goodbye` to our console after three seconds and the last part of our code logs `Hello again` to our console. Here, the JavaScript engine goes through the first function and executes it, printing `Hello` to the console, going to the next function, it sees the `setTimeout` function and instead of waiting for three seconds to print the function, it goes to the last function and executes it, printing `Hello again`, waits for three seconds, and then executes the second function.

So with asynchronous JavaScript, the JavaScript doesn’t wait for responses when executing a function, instead it continues with executing other functions. Let’s look at ways of executing asynchronous JavaScript.

---

## Methods for writing asynchronous JavaScript

There are two ways of writing asynchronous code in JavaScript, promises and async/await.

### Promises

A promise only passes if a certain criteria is true. With JavaScript promises, we can defer a code execution until an asynchronous request is completed, this way other functions can keep running without blocking the thread.

Promises are a new way of writing asynchronous JavaScript, its usually an object with three main states, which includes:

- Pending — the initial state of the program before the promise passes or fails
- Resolved — a successful promise
- Rejected — a failed promise

To better understand this, let’s create a promise below:

```js
const hungry = true;
const eat = new Promise(function(resolve, reject) {
  if (hungry) {
      const fastfood = {
        activity: 'Cook noodles',
        location: 'Market Square'
      };
  resolve(fastfood)
  } else {
    reject(new Error('Not hungry'))
    }
});
```

In the code above, if `hungry` is true, resolve the promise returning the data with a `fastfood` with an activity that says `Cook noodles`, else return an error object that says `Not hungry`.

### Using a promise

Let’s push this further and use the promise we initialized above, we can chain `.then()` and a `.catch()` method to our Promise below:

```js
const willEat = function() {
  eat
    .then(function(hungry) {
      console.log('Going to eat noodles!')
      console.log(hungry)
    })
    .catch(function(error) {
        console.log(error.message)
    })
}

willEat();
```

In the code above, we created a new function called `willEat()` with a promise of `eat`, next we used the `.then()` to add a function that will contain the resolve for our promise. We then added a `.catch()` method to return the error message in our promise.

Since the hungry value is true, when we call our `willEat()` function, we should get the results below:

```plaintext title="output"
Going to eat noodles!
{
  activity: 'Cook noodles',
  location: 'Market square'
}
```

If we change the value of hungry to false, our promise will display the status for a failed promise which in our case will be `not hungry`. We can push our promises further by creating a new promise that’d take parameters from our earlier examples:

```js
const foodTour = function(fastfood) {
  return new Promise(function(resolve, reject) {
    const response = `I'm going on a food tour at ${fastfood.location}`;
    resolve(response)
  });
}
```

In the code above, we created a new promise called `foodTour` that takes the `fastfood` value from earlier example, and resolves a response with a template string on the `fastfood` location in our earlier example.

### Async/await

Async/await was added in the (ES2017+) release, it is *syntactic sugar* that makes it easier to write promises in JavaScript. Async/await helps you write synchronous-looking JavaScript code that works asynchronously.

An async function returns a promise, if the functions returns a value, the promise is resolved with the value, but if the async function throws an error, the promise is rejected with that value. Let’s create a simple async function below:

```js
async function favoriteDrink() {
  return 'Monster energy drink'
}
```

Here, we are declaring a function called `favoriteDrink()` which returns `Monster energy drink`. If a promise is rejected in an async function, it displays a rejected method similar to this:

```js
async function() {
  throw 3;
}
```

Await is in an async function to ensure that all promises that are returned in the function are synchronized. With async/await, there’s no use of callbacks. `try` and `catch` methods are also used to get rejection values of async functions. Let’s create an async/await function wrapped inside of a `try…catch` method using our earlier examples:

```js
async function willEat() {
  try {
    let fastfood = await eat;
    let response = await foodTour(fastfood);
  console.log(response);
  } catch(error) {
      console.log(error.message);
    }
}

willEat();
```

Here we converted our earlier example to use async/await wrapped in `try…catch` method, we logged the response as our earlier example, which returns the string `I'm going on a food tour at Market Square`.

### Making asynchronous requests in JavaScript

Recently in JavaScript, the `fetch()` API has been used for API requests to URLs. Before this, requests were made using XMLHttpRequest. With `ES2017+`, using fetch API and async/await, you can make asynchronous requests to URL endpoints, first you’d need to define the function as an async function and await the response in `json` and then return your data. To better explain this, let’s look at the code below:

```js
async function getJobAsync()
{
  let response = await fetch(`https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json`);
  let data = await response.json()
  return data;
}
getJobAsync('jobPositionHere')
  .then(data => console.log(data));
```

In the code above, we wrote an async function `getJobAsync()` that makes a fetch request to an external URL, next we awaited the `response` in a `json` format and then returned the data once the request is resolved. This is how to make an asynchronous request using asynchronous JavaScript. Let’s look at the result of the function in the image below.

![jobs requested shown in the console](/assets/image/blog.logrocket.com/understanding-asynchronous-javascript/jobsasyncrequest.png)

Next, we are going to look at how to return the response from an asynchronous API call.

---

## Returning a response from an asynchronous call

There are many ways to return the response from an async call in JavaScript, callbacks, and promises. Let’s say you are making an asynchronous call and you want the result of the call to be from the function, this can be done using async/await, let’s explain this further in the code below:

```js
const getResult = async (request) => {
  let response = await new Promise((resolve, reject) => {
    request((err, res, body) => {
      if (err) return reject(err);
      try {
          resolve(JSON.parse(body));
      } catch (error) {
          reject(error);
      }
    });
  });

  try {
    console.log(response);
  }
  catch (err) {
    console.error(err);
  }
}

getResult();
console.log('This is how to return async JavaScript');
```

In the code block above, we are wrapping the response from the request in a promise, then await it while it gets resolved or rejected, and also wait for the promise to return a response. In JavaScript operations, it’s advised to wrap your code in a `try…catch` method in order to handle errors that might be in our function. Lastly, we call the function at the end of the program and log the message `This is how to return async JavaScript` in our console, this is how we respond to asynchronous calls in JavaScript, callbacks or async/await.

---

## Conclusion

In this article, we learned what asynchronous JavaScript is and how to write asynchronous JavaScript using promises and async/await. We’ve also seen how to send requests using the fetch API and async/await and how to return a response to asynchronous calls. You can read more on asynchronous JavaScript [<VPIcon icon="fa-brands fa-firefox" />here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous).

<SiteInfo
  name="Asynchronous JavaScript - Learn web development | MDN"
  desc="In this module, we take a look at asynchronous JavaScript, why it is important, and how it can be used to effectively handle potential blocking operations, such as fetching resources from a server."
  url="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding (and effectively using) asynchronous JavaScript",
  "desc": "In this article, we will learn what asynchronous JavaScript is and how to write asynchronous JavaScript using promises and async/await.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-asynchronous-javascript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
