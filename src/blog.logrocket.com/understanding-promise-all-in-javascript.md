---
lang: en-US
title: "Understanding Promise.all in JavaScript"
description: "Article(s) > Understanding Promise.all in JavaScript"
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
      content: "Article(s) > Understanding Promise.all in JavaScript"
    - property: og:description
      content: "Understanding Promise.all in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-promise-all-in-javascript.html
prev: /programming/js/articles/README.md
date: 2020-08-20
isOriginal: false
author:
  - name: Leonardo Maldonado
    url : https://blog.logrocket.com/author/leonardomaldonado/
cover: /assets/image/blog.logrocket.com/understanding-promise-all-in-javascript/banner.png
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
  name="Understanding Promise.all in JavaScript"
  desc="When working with promises in JavaScript, we have a lot of methods that can help us. We’re going to cover the Promise.all method here."
  url="https://blog.logrocket.com/understanding-promise-all-in-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/understanding-promise-all-in-javascript/banner.png"/>

Before promises were introduced natively in JavaScript, we used a lot of callbacks for asynchronous tasks. It’s pretty common to see callbacks being used for asynchronous tasks because a lot of developers might still think that callbacks and promises are the same, but in fact, they are not.

![Understanding Promise.all in JavaScript](/assets/image/blog.logrocket.com/understanding-promise-all-in-javascript/banner.png)

When promises were introduced natively in JavaScript, it was definitely a game-changer. In a lot of projects, the usage of callbacks was replaced by promises for running asynchronous tasks, and promises became the main alternative for it. Promises resemble callbacks in some ways, but with an easier to follow syntax and a better understanding of the code.

When working with promises in JavaScript, we have a lot of methods that can help us. In this article, we’re going to cover the `Promise.all` method.

To understand how the `Promise.all` method works, first, we need to understand how promises work in JavaScript.

---

## Promises

JavaScript is single-threaded, which means that we can only run one block of code at a time. It executes code in order and must finish executing code before running the next one.

A promise represents the future result of an asynchronous operation. Promises are often used to handle asynchronous tasks in JavaScript.

A promise is an object that will return a value in the future, it can either be a resolved value, which means the promise was successful, or a rejected value, which means that an error occurred. A promise will only return a value once, which means that if a promise returns an error, it will only return it once.

::: info

[A promise has three possible mutually exclusive states (<FontIcon icon="iconfont icon-github"/>`domenic/promises-unwrapping`)](https://github.com/domenic/promises-unwrapping):

- fulfilled  —  a promise is fulfilled if `promise.then(f)` will call `f` “as soon as possible”
- rejected  —  a promise is rejected if `promise.then(undefined, r)` will call `r` “as soon as possible”
- pending  —  a promise is pending if it is neither fulfilled nor rejected

:::

Sometimes we might hear that a promise is `settled`. That means that this promise is either `fulfilled` or `rejected`, `settled` is not a state but it’s used just for convenience.

To create a promise, we use the `new` keyword, and inside the `Promise` object, we pass a function. This function is called `executor`, and it takes two arguments, `resolve` for success and `reject` for error:

```js
const firstPromise = new Promise((resolve, reject) => { 
  // ... 
});
```

Inside the promise, there’s a condition and this is where you put your logic. In case the condition is met, we use the `resolve` argument to return success for us. In case there’s an error, the `reject` argument will return an error for the promise:

```js
const firstPromise = new Promise((resolve, reject) => {
  const sum = () => 1 + 1;
  if (sum() === 2) resolve("Success");
  else reject("Error");
});
```

---

## Chaining

Promise chaining is one of the things that makes promises so great and easy to use. We can execute a chain of asynchronous tasks, each task will be executed as soon as the previous task was completed.

We can chain our promise using a `.then` block, anything returned from this block becomes a resolved promise:

```js
const firstPromise = new Promise((resolve, reject) => {
  const sum = () => 1 + 1;
  if (sum() === 2) resolve("Success");
  else reject("Error");
});
firstPromise
  .then(success => console.log("success: ", success));
```

The beauty of the `.then` block is that we can perform additional async actions one after another. For error handling, we can use the `.catch` block:

```js
const firstPromise = new Promise((resolve, reject) => {
  const sum = () => 1 + 1;
  if (sum() === 2) resolve("Success");
  else reject("Error");
});
firstPromise
  .then(success => console.log("success: ", success))
  .catch(error => console.log("error: ", error));
```

You can perform asynchronous operations by using callbacks or promises. But there are differences.

If you are using callbacks to perform asynchronous operations, in some cases you might end up having too many nested functions, this is what is called [<FontIcon icon="fas fa-globe"/>callback hell](http://callbackhell.com/). Too many nested functions can cause your code to be unreadable and unmanageable. You can solve it by using promises, with promises you can have more readable and manageable code.

Promises are a cleaner way to run asynchronous tasks. Promises provide catch mechanism, which callbacks do not have. Promises allow cleaner, better, and functional code.

Now that we covered a little bit about promises, let’s look at `Promise.all`.

---

## `Promise.all`

The `Promise.all` method takes asynchronous operations to a whole new level and helps us to aggregate and perform a group of promises in JavaScript.

`Promise.all` is just a promise that receives an array of promises as an input. It gets resolved when all the promises get resolved or gets rejected if one of the promises gets rejected.

You accumulated a lot of promises in your code, and you want to perform all these asynchronous operations once, without having to use some strange thing for it like a `for` loop, for example. How can you do it?

You either have two choices here that you can use for this use case:

1. You can perform all the promises one by one – you can run these promises one by one or chain them and process the data as soon as it is available
2. You can perform all promises passing them as an array input to `Promise.all` and the method will return a value

The better solution to use in this case is to use the `Promise.all` method. It will perform all the promises, return a single promise, and resolve when all of the promises passed are resolved:

```js
const allpromises = Promise.all([Promise1, Promise2, Promise3, Promise4, ...]);
```

Remember, the `Promise.all` method will only return `resolve` if all the promises passed in the array returns successfully. In case there’s only one promise in the array that returns rejected, the `Promise.all` method will return rejected.

For example, let’s imagine that we have a function called `sum`. This function will just return the value of some operation for us:

```js
const sum = (a, b) => a + b;
```

Now, let’s imagine that we have five promises, and inside each one of these promises we’re going to use the `sum` function and inside an `if` statement, compare the value. In case it’s `true`, we are going to return a success message and in case it’s `false` we are going to return an error message:

```js :collapsed-lines
const first = new Promise((resolve, reject) => {
  const value = sum(1, 1);
  if (value === 2) resolve(value);
  else reject(value);
});

const second = new Promise((resolve, reject) => {
  const value = sum(2, 2);
  if (value === 4) resolve(value);
  else reject(value);
});

const third = new Promise((resolve, reject) => {
  const value = sum(3, 3);
  if (value === 6) resolve(value);
  else reject(value);
});

const fourth = new Promise((resolve, reject) => {
  const value = sum(4, 4);
  if (value === 8) resolve(value);
  else reject(value);
});

const fifth = new Promise((resolve, reject) => {
  const value = sum(5, 5);
  if (value === 10) resolve(value);
  else reject(value);
});
```

To perform all promises at once, we pass an array input to `Promise.all`:

```js
const allPromises = Promise.all([first, second, third, fourth, fifth]);
```

Now, we just call our single promise called `allPromises` and it will return to us an array of resolved values:

```js
allpromises.then(success => console.log('sucess: ', success)).catch(error => console.log('error: ', error));
// Result
// sucess: [ 2, 4, 2, 8, 10 ]
```

In case one of the promises returns an error, our single promise will return an error as well. In our example, inside the `fifth` promise, we are going to pass as arguments for the `sum` function the values `5` and `6`.

Of course, this will return an error as `5` + `6` is not `10`. This will cause our single promise to return an error:

```js
const fifth = new Promise((resolve, reject) => {
  const value = sum(5, 6);
  if (value === 10) resolve(value);
  else reject(value);
});

const allpromises = Promise.all([first, second, third, fourth, fifth]);
allpromises.then(success => console.log('sucess: ', success)).catch(error => console.log('error: ', error));
//
// Result
// error:  11
```

---

## `Promise.all` vs. `Promise.allSettled`

You have many promises that you want to perform but the `Promise.all` might not be the best solution for you if you want to return all the values, regardless if there is an error in your promises.

You can use the `Promise.allSettled` method for it. This method will return a single promise that will be resolved after all the promises were either fulfilled or rejected.

Let’s use our last example, and instead of using the `Promise.all` method, we are going to use the `Promise.allSettled` method:

```js
const allpromises = Promise.allSettled([first, second, third, fourth, fifth]);
allpromises.then(success => console.log('sucess: ', success)).catch(error => console.log('error: ', error));
//
// success:  [
//   { status: 'fulfilled', value: 2 },
//   { status: 'fulfilled', value: 4 },
//   { status: 'fulfilled', value: 6 },
//   { status: 'fulfilled', value: 8 },
//   { status: 'rejected', reason: 11 }
// ]
```

---

## When to use

To use the `Promise.all` method, you need to know first what you need to achieve. The `Promise.all`method is very helpful and useful in some cases, for example:

1. The tasks that you are performing are dependent on each other and you want to know if all of the promises have finished successfully
2. You need to make requests to different APIs and after all the responses you want to do something with the result

The `Promise.all` is a great way to achieve concurrency in JavaScript, it is one of the best ways to perform concurrent asynchronous operations in JavaScript when you have multiple promises and you want to perform all of them.

---

## Conclusion

In this article, we covered a little bit about promises in JavaScript and learned more about a promise method called `Promise.all`. This method is a very helpful and useful method to aggregate and perform many promises and return a single promise with all the values inside an array.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Promise.all in JavaScript",
  "desc": "When working with promises in JavaScript, we have a lot of methods that can help us. We’re going to cover the Promise.all method here.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-promise-all-in-javascript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
