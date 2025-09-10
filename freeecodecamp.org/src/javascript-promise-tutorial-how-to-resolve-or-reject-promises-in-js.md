---
lang: en-US
title: "JavaScript Promise Tutorial - How to Resolve or Reject Promises in JS"
description: "Article(s) > JavaScript Promise Tutorial - How to Resolve or Reject Promises in JS"
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
      content: "Article(s) > JavaScript Promise Tutorial - How to Resolve or Reject Promises in JS"
    - property: og:description
      content: "JavaScript Promise Tutorial - How to Resolve or Reject Promises in JS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js.html
prev: /programming/js/articles/README.md
date: 2020-12-15
isOriginal: false
author:
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://freecodecamp.org/news/content/images/2020/11/cover-1.png
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
  name="JavaScript Promise Tutorial - How to Resolve or Reject Promises in JS"
  desc="Promises are important building blocks for asynchronous operations in JavaScript. You may think that promises are not so easy to understand, learn, and work with. And trust me, you are not alone!  Promises are challenging for many web developers, eve..."
  url="https://freecodecamp.org/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2020/11/cover-1.png"/>

`Promise`s are important building blocks for asynchronous operations in JavaScript. You may think that promises are not so easy to understand, learn, and work with. And trust me, you are not alone!

Promises are challenging for many web developers, even after spending years working with them.

In this article, I want to try to change that perception while sharing what I've learned about JavaScript Promises over the last few years. Hope you find it useful.

---

## What is a Promise in JavaScript?

A `Promise` is a special JavaScript object. It produces a value after an `asynchronous` (aka, async) operation completes successfully, or an error if it does not complete successfully due to time out, network error, and so on.

Successful call completions are indicated by the `resolve` function call, and errors are indicated by the `reject` function call.

You can create a promise using the promise constructor like this:

```js
let promise = new Promise(function (resolve, reject) {
  // Make an asynchronous call and either resolve or reject
});
```

In most cases, a promise may be used for an asynchronous operation. However, technically, you can resolve/reject on both synchronous and asynchronous operations.

---

## Hang on, don't we have `callback` functions for async operations?

Oh, yes! That's right. We have `callback` functions in JavaScript. But, a callback is not a special thing in JavaScript. It is a regular function that produces results after an `asynchronous` call completes (with success/error).

The word 'asynchronous' means that something happens in the future, not right now. Usually, callbacks are only used when doing things like network calls, or uploading/downloading things, talking to databases, and so on.

While `callbacks` are helpful, there is a huge downside to them as well. At times, we may have one callback inside another callback that's in yet another callback and so on. I'm serious! Let's understand this "callback hell" with an example.

### How to Avoid Callback Hell - PizzaHub Example

Let's order a Veg Margherita pizza 🍕 from the PizzaHub. When we place the order, PizzaHub automatically detects our location, finds a nearby pizza restaurant, and finds if the pizza we are asking for is available.

If it's available, it detects what kind of beverages we get for free along with the pizza, and finally, it places the order.

If the order is placed successfully, we get a message with a confirmation.

So how do we code this using callback functions? I came up with something like this:

```js
function orderPizza(type, name) {

  // Query the pizzahub for a store
  query(`/api/pizzahub/`, function (result, error) {
    if (!error) {
      let shopId = result.shopId;

      // Get the store and query pizzas
      query(`/api/pizzahub/pizza/${shopid}`, function (result, error) {
        if (!error) {
          let pizzas = result.pizzas;

          // Find if my pizza is availavle
          let myPizza = pizzas.find((pizza) => {
            return (pizza.type === type && pizza.name === name);
          });

          // Check for the free beverages
          query(`/api/pizzahub/beverages/${myPizza.id}`, function (result, error) {
            if (!error) {
              let beverage = result.id;

              // Prepare an order
              query(`/api/order`, { 'type': type, 'name': name, 'beverage': beverage }, function (result, error) {
                if (!error) {
                  console.log(`Your order of ${type} ${name} with ${beverage} has been placed`);
                } else {
                  console.log(`Bad luck, No Pizza for you today!`);
                }
              });

            }
          })
        }
      });
    }
  });
}

// Call the orderPizza method
orderPizza('veg', 'margherita');
```

Let's have a close look at the `orderPizza` function in the above code.

It calls an API to get your nearby pizza shop's id. After that, it gets the list of pizzas available in that restaurant. It checks if the pizza we are asking for is found and makes another API call to find the beverages for that pizza. Finally the order API places the order.

Here we use a callback for each of the API calls. This leads us to use another callback inside the previous, and so on.

This means we get into something we call (very expressively) `Callback Hell`. And who wants that? It also forms a code pyramid which is not only confusing but also error-prone.

![Demonstration of callback hell and pyramid](https://freecodecamp.org/news/content/images/2020/11/callback-hell.png)

There are a few ways to come out of (or not get into) `callback hell`. The most common one is by using a `Promise` or `async` function. However, to understand `async` functions well, you need to have a fair understanding of `Promise`s first.

So let's get started and dive into promises.

---

## Understanding Promise States

Just to review, a promise can be created with the constructor syntax, like this:

```js
let promise = new Promise(function(resolve, reject) {
  // Code to execute
});
```

The constructor function takes a function as an argument. This function is called the `executor function`.

```js
// Executor function passed to the 
// Promise constructor as an argument
function(resolve, reject) {
  // Your logic goes here...
}
```

The executor function takes two arguments, `resolve` and `reject`. These are the callbacks provided by the JavaScript language. Your logic goes inside the executor function that runs automatically when a `new Promise` is created.

For the promise to be effective, the executor function should call either of the callback functions, `resolve` or `reject`. We will learn more about this in detail in a while.

The `new Promise()` constructor returns a `promise` object. As the executor function needs to handle async operations, the returned promise object should be capable of informing when the execution has been started, completed (resolved) or retuned with error (rejected).

A `promise` object has the following internal properties:

1. `state` - This property can have the following values:
2. `pending`: Initially when the executor function starts the execution.
3. `fulfilled`: When the promise is resolved.
4. `rejected`: When the promise is rejected.

![Promise states](https://freecodecamp.org/news/content/images/2020/11/states_1.png)

1. `result` - This property can have the following values:
2. `undefined`: Initially when the `state` value is `pending`.
3. `value`: When `resolve(value)` is called.
4. `error`: When `reject(error)` is called.

These internal properties are code-inaccessible but they are inspectable. This means that we will be able to inspect the `state` and `result` property values using the debugger tool, but we will not be able to access them directly using the program.

![Able to inspect the internal properties of a promise](https://freecodecamp.org/news/content/images/2020/11/promise_state_inspect.png)

A promise's state can be `pending`, `fulfilled` or `rejected`. A promise that is either resolved or rejected is called `settled`.

![A settled promise is either fulfilled or rejected](https://freecodecamp.org/news/content/images/2020/11/states_2.png)

### How promises are resolved and rejected

Here is an example of a promise that will be resolved (`fulfilled` state) with the value `I am done` immediately.

```js
let promise = new Promise(function(resolve, reject) {
  resolve("I am done");
});
```

The promise below will be rejected (`rejected` state) with the error message `Something is not right!`.

```js
let promise = new Promise(function(resolve, reject) {
  reject(new Error('Something is not right!'));
});
```

::: important

A Promise executor should call only one `resolve` or one `reject`. Once one state is changed (pending => fulfilled or pending => rejected), that's all. Any further calls to `resolve` or `reject` will be ignored.

;::

```js
let promise = new Promise(function(resolve, reject) {
  resolve("I am surely going to get resolved!");

  reject(new Error('Will this be ignored?')); // ignored
  resolve("Ignored?"); // ignored
});
```

In the example above, only the first one to resolve will be called and the rest will be ignored.

---

## How to handle a Promise once you've created it

A `Promise` uses an executor function to complete a task (mostly asynchronously). A consumer function (that uses an outcome of the promise) should get notified when the executor function is done with either resolving (success) or rejecting (error).

The handler methods, `.then()`, `.catch()` and `.finally()`, help to create the link between the executor and the consumer functions so that they can be in sync when a promise `resolve`s or `reject`s.

![The executor and consumer functions](https://freecodecamp.org/news/content/images/2020/11/consumer_executor.png)

### How to Use the `.then()` Promise Handler

The `.then()` method should be called on the promise object to handle a result (resolve) or an error (reject).

It accepts two functions as parameters. Usually, the `.then()` method should be called from the consumer function where you would like to know the outcome of a promise's execution.

```js
promise.then(
  (result) => { 
     console.log(result);
  },
  (error) => { 
     console.log(error);
  }
);
```

If you are interested only in successful outcomes, you can just pass one argument to it, like this:

```js
promise.then(
  (result) => { 
      console.log(result);
  }
);
```

If you are interested only in the error outcome, you can pass `null` for the first argument, like this:

```js
promise.then(
  null,
  (error) => { 
      console.log(error)
  }
);
```

However, you can handle errors in a better way using the `.catch()` method that we will see in a minute.

Let's look at a couple of examples of handling results and errors using the `.then` and `.catch` handlers. We will make this learning a bit more fun with a few real asynchronous requests. We will use the [<VPIcon icon="fas fa-globe"/>PokeAPI](https://pokeapi.co/) to get information about Pokémon and resolve/reject them using Promises.

First, let us create a generic function that accepts a PokeAPI URL as argument and returns a Promise. If the API call is successful, a resolved promise is returned. A rejected promise is returned for any kind of errors.

We will be using this function in several examples from now on to get a promise and work on it.

```js
function getPromise(URL) {
  let promise = new Promise(function (resolve, reject) {
    let req = new XMLHttpRequest();
    req.open("GET", URL);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject("There is an Error!");
      }
    };
    req.send();
  });
  return promise;
}
```

::: tip Example 1

Get 50 Pokémon's information:

```js
const ALL_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50';

// We have discussed this function already!
let promise = getPromise(ALL_POKEMONS_URL);

const consumer = () => {
  promise.then(
    (result) => {
      console.log({ result }); // Log the result of 50 Pokemons
    },
    (error) => {
      // As the URL is a valid one, this will not be called.
      console.log('We have encountered an Error!'); // Log an error
    });
}

consumer();
```

:::

::: tip Example 2

Let's try an invalid URL

```js
const POKEMONS_BAD_URL = 'https://pokeapi.co/api/v2/pokemon-bad/';

// This will reject as the URL is 404
let promise = getPromise(POKEMONS_BAD_URL);

const consumer = () => {
  promise.then(
    (result) => {
      // The promise didn't resolve. Hence, it will
      // not be executed.
      console.log({ result });
    },
    (error) => {
      // A rejected prmise will execute this
      console.log('We have encountered an Error!'); // Log an error
    }
  );
}

consumer();
```

:::

### How to Use the `.catch()` Promise Handler

You can use this handler method to handle errors (rejections) from promises. The syntax of passing `null` as the first argument to the `.then()` is not a great way to handle errors. So we have `.catch()` to do the same job with some neat syntax:

```js
// This will reject as the URL is 404
let promise = getPromise(POKEMONS_BAD_URL);

const consumer = () => {
  promise.catch(error => console.log(error));
}

consumer();
```

If we throw an Error like `new Error("Something wrong!")` instead of calling the `reject` from the promise executor and handlers, it will still be treated as a rejection. It means that this will be caught by the `.catch` handler method.

This is the same for any *synchronous* exceptions that happen in the promise executor and handler functions.

Here is an example where it will be treated like a reject and the `.catch` handler method will be called:

```js
new Promise((resolve, reject) => {
  throw new Error("Something is wrong!");// No reject call
}).catch((error) => console.log(error));
```

### How to Use the `.finally()` Promise Handler

The `.finally()` handler performs cleanups like stopping a loader, closing a live connection, and so on. The `finally()` method will be called irrespective of whether a promise `resolve`s or `reject`s. It passes through the result or error to the next handler which can call a .then() or .catch() again.

Here is an example that'll help you understand all three methods together:

```js
let loading = true;
loading && console.log('Loading...');

// Gatting Promise
promise = getPromise(ALL_POKEMONS_URL);

promise.finally(() => {
  loading = false;
  console.log(`Promise Settled and loading is ${loading}`);
}).then((result) => {
  console.log({ result });
}).catch((error) => {
  console.log(error)
});
```

To explain a bit further:

- The `.finally()` method makes loading `false`.
- If the promise resolves, the `.then()` method will be called. If the promise rejects with an error, the `.catch()` method will be called. The `.finally()` will be called irrespective of the resolve or reject.

---

## What is the Promise Chain?

The `promise.then()` call always returns a promise. This promise will have the `state` as `pending` and `result` as `undefined`. It allows us to call the next `.then` method on the new promise.

When the first `.then` method returns a value, the next `.then` method can receive that. The second one can now pass to the third `.then()` and so on. This forms a chain of `.then` methods to pass the promises down. This phenomenon is called the `Promise Chain`.

![Promise Chain](https://freecodecamp.org/news/content/images/2020/12/image-105.png)

::: tip Example

Here is an example:

```js
let promise = getPromise(ALL_POKEMONS_URL);

promise.then(result => {
    let onePokemon = JSON.parse(result).results[0].url;
    return onePokemon;
}).then(onePokemonURL => {
    console.log(onePokemonURL);
}).catch(error => {
    console.log('In the catch', error);
});
```

Here we first get a promise resolved and then extract the URL to reach the first Pokémon. We then return that value and it will be passed as a promise to the next `.then()` handler function. Hence the output,

```sh
https://pokeapi.co/api/v2/pokemon/1/
```

The `.then` method can return either:

- A value (we have seen this already)
- A brand new promise.

:::

It can also throw an error.

Here is an example where we have created a promise chain with the `.then` methods which returns results and a new promise:

```js
// Promise Chain with multiple then and catch
let promise = getPromise(ALL_POKEMONS_URL);

promise.then(result => {
    let onePokemon = JSON.parse(result).results[0].url;
    return onePokemon;
}).then(onePokemonURL => {
    console.log(onePokemonURL);
    return getPromise(onePokemonURL);
}).then(pokemon => {
    console.log(JSON.parse(pokemon));
}).catch(error => {
    console.log('In the catch', error);
});
```

In the first `.then` call we extract the URL and return it as a value. This URL will be passed to the second `.then` call where we are returning a new promise taking that URL as an argument.

This promise will be resolved and passed down to the chain where we get the information about the Pokémon. Here is the output:

![Output of the promise chain call](https://freecodecamp.org/news/content/images/2020/11/image-159.png)

In case there is an error or a promise rejection, the .catch method in the chain will be called.

::: note

A point to note: Calling `.then` multiple times doesn't form a Promise chain. You may end up doing something like this only to introduce a bug in the code:

```js
let promise = getPromise(ALL_POKEMONS_URL);

promise.then(result => {
    let onePokemon = JSON.parse(result).results[0].url;
    return onePokemon;
});
promise.then(onePokemonURL => {
    console.log(onePokemonURL);
    return getPromise(onePokemonURL);
});
promise.then(pokemon => {
    console.log(JSON.parse(pokemon));
});
```

We call the `.then` method three times on the same promise, but we don't pass the promise down. This is different than the promise chain. In the above example, the output will be an error.

![](https://freecodecamp.org/news/content/images/2020/11/image-160.png)

:::

---

## How to Handle Multiple Promises

Apart from the handler methods (.then, .catch, and .finally), there are six static methods available in the Promise API. The first four methods accept an array of promises and run them in parallel.

1. Promise.all
2. Promise.any
3. Promise.allSettled
4. Promise.race
5. Promise.resolve
6. Promise.reject

Let's go through each one.

### The `Promise.all()` method

`Promise.all([promises])` accepts a collection (for example, an array) of promises as an argument and executes them in parallel.

This method waits for all the promises to resolve and returns the array of promise results. If any of the promises reject or execute to fail due to an error, all other promise results will be ignored.

Let's create three promises to get information about three Pokémons.

```js
const BULBASAUR_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
const RATICATE_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/raticate';
const KAKUNA_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon/kakuna';

let promise_1 = getPromise(BULBASAUR_POKEMONS_URL);
let promise_2 = getPromise(RATICATE_POKEMONS_URL);
let promise_3 = getPromise(KAKUNA_POKEMONS_URL);
```

Use the Promise.all() method by passing an array of promises.

```js
Promise.all([promise_1, promise_2, promise_3]).then(result => {
  console.log({result});
}).catch(error => {
  console.log('An Error Occured');
});
```

![Output](https://freecodecamp.org/news/content/images/2020/11/image-161.png)

As you see in the output, the result of all the promises is returned. The time to execute all the promises is equal to the max time the promise takes to run.

### The `Promise.any()` method

`Promise.any([promises])` - Similar to the `all()` method, `.any()` also accepts an array of promises to execute them in parallel. This method doesn't wait for all the promises to resolve. It is done when any one of the promises is settled.

```js
Promise.any([promise_1, promise_2, promise_3]).then(result => {
  console.log(JSON.parse(result));
}).catch(error => {
  console.log('An Error Occured');
});
```

![The output would be the result of any of the resolved promises](https://freecodecamp.org/news/content/images/2020/11/image-162.png)

### The Promise.allSettled() method

`romise.allSettled([promises])` - This method waits for all promises to settle(resolve/reject) and returns their results as an array of objects. The results will contain a state (fulfilled/rejected) and value, if fulfilled. In case of rejected status, it will return a reason for the error.

Here is an example of all fulfilled promises:

```js
Promise.allSettled([promise_1, promise_2, promise_3]).then(result => {
  console.log({result});
}).catch(error => {
  console.log('There is an Error!');
});
```

![Output](https://freecodecamp.org/news/content/images/2020/11/image-163.png)

If any of the promises rejects, say, the `promise_1`,

```js
let promise_1 = getPromise(POKEMONS_BAD_URL);
```

![](https://freecodecamp.org/news/content/images/2020/11/image-164.png)

### The `Promise.race()` method

`Promise.race([promises])` - It waits for the first (quickest) promise to settle, and returns the result/error accordingly.

```js
Promise.race([promise_1, promise_2, promise_3]).then(result => {
  console.log(JSON.parse(result));
}).catch(error => {
  console.log('An Error Occured');
});
```

![Output the fastest promise that got resolved](https://freecodecamp.org/news/content/images/2020/11/image-165.png)

### The `Promise.resolve`/`reject` methods

`Promise.resolve(value)` - It resolves a promise with the value passed to it. It is the same as the following:

```js
let promise = new Promise(resolve => resolve(value));
```

`Promise.reject(error)` - It rejects a promise with the error passed to it. It is the same as the following:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

---

## Can we rewrite the PizzaHub example with Promises?

Sure, let's do it. Let us assume that the `query` method will return a promise. Here is an example query() method. In real life, this method may talk to a database and return results. In this case, it is very much hard-coded but serves the same purpose.

```js
function query(endpoint) {
  if (endpoint === `/api/pizzahub/`) {
    return new Promise((resolve, reject) => {
      resolve({'shopId': '123'});
    })
  } else if (endpoint.indexOf('/api/pizzahub/pizza/') >=0) {
    return new Promise((resolve, reject) => {
      resolve({pizzas: [{'type': 'veg', 'name': 'margherita', 'id': '123'}]});
    })
  } else if (endpoint.indexOf('/api/pizzahub/beverages') >=0) {
    return new Promise((resolve, reject) => {
      resolve({id: '10', 'type': 'veg', 'name': 'margherita', 'beverage': 'coke'});
    })
  } else if (endpoint === `/api/order`) {
    return new Promise((resolve, reject) => {
      resolve({'type': 'veg', 'name': 'margherita', 'beverage': 'coke'});
    })
  }
}
```

Next is the refactoring of our `callback hell`. To do that, first, we will create a few logical functions:

```js
// Returns a shop id
let getShopId = result => result.shopId;

// Returns a promise with pizza list for a shop
let getPizzaList = shopId => {
  const url = `/api/pizzahub/pizza/${shopId}`;
  return query(url);
}

// Returns a promise with pizza that matches the customer request
let getMyPizza = (result, type, name) => {
  let pizzas = result.pizzas;
  let myPizza = pizzas.find((pizza) => {
    return (pizza.type===type && pizza.name===name);
  });
  const url = `/api/pizzahub/beverages/${myPizza.id}`;
  return query(url);
}

// Returns a promise after Placing the order
let performOrder = result => {
  let beverage = result.id;
   return query(`/api/order`, {'type': result.type, 'name': result.name, 'beverage': result.beverage});
}

// Confirm the order
let confirmOrder = result => {
    console.log(`Your order of ${result.type} ${result.name} with ${result.beverage} has been placed!`);
}
```

Use these functions to create the required promises. This is where you should compare with the `callback hell` example. This is so nice and elegant.

```js
function orderPizza(type, name) {
  query(`/api/pizzahub/`)
  .then(result => getShopId(result))
  .then(shopId => getPizzaList(shopId))
  .then(result => getMyPizza(result, type, name))
  .then(result => performOrder(result))
  .then(result => confirmOrder(result))
  .catch(function(error){
    console.log(`Bad luck, No Pizza for you today!`);
  })
}
```

Finally, call the orderPizza() method by passing the pizza type and name, like this:

```js
orderPizza('veg', 'margherita');
```

---

## What's next from here?

If you are here and have read through most of the lines above, congratulations! You should now have a better grip of JavaScript Promises. All the examples used in this article are in this [GitHub repository (<VPIcon icon="iconfont icon-github"/>`atapas/js-promise-example`)](https://github.com/atapas/js-promise-example).

<SiteInfo
  name="atapas/js-promise-example"
  desc="This repository contains the example of JavaScript Promises and Operations"
  url="https://github.com/atapas/js-promise-example/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/51bbf6f3c62e368e670717385757bfc54bd96c8db9f555e3c15a1baa9e3b7679/atapas/js-promise-example"/>

Next, you should learn about the `async` function in JavaScript which simplifies things further. The concept of JavaScript promises is best learned by writing small examples and building on top of them.

Irrespective of the framework or library (Angular, React, Vue, and so on) we use, async operations are unavoidable. This means that we have to understand promises to make things work better.

Also, I'm sure you will find the usage of the `fetch` method much easier now:

```js
fetch('/api/user.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json); // {"name": "tapas", "blog": "freeCodeCamp"}
  });
```

- The `fetch` method returns a promise. So we can call the `.then` handler method on it.
- The rest is about the promise chain which we learned in this article.

---

## Before we end...

Thank you for reading this far! Let's connect. You can @ me on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`)](https://x.com/tapasadhikary) with comments.

You may also like these other articles:

<SiteInfo
  name="JavaScript undefined and null: Let's talk about it one last time!"
  desc="In JavaScript, undefined and null are very different from each other. However, there are only a few similarities that may confuse a beginner to the language. This article aims to explain the similarities, differences, and usages with examples. Hope y..."
  url="https://blog.greenroots.info/javascript-undefined-and-null-lets-talk-about-it-one-last-time/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1604649035916%2FJkXejQgbs.png%3Fw%3D1200%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

<SiteInfo
  name="JavaScript: Equality comparison with ==, === and Object.is"
  desc="#100DaysOfCode is a great engagement to refresh some of the concepts that are basic, but extremely important.  Today, I spent time on refreshing my memory on JavaScript's equality operators and methods. Thought, why not to write about it? Traditional..."
  url="https://blog.greenroots.info/javascript-equality-comparison-with-and-objectis/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1597139563323%2FLk0rRsa-z.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

```component VPCard
{
  "title": "The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners",
  "desc": "JavaScript's this keyword is one of the hardest aspects of the language to grasp. But it is critically important for writing more advanced JavaScript code. In JavaScript, the this keyword allows us to: Reuse functions in different execution contexts...",
  "link": "/freecodecamp.org/javascript-this-keyword-binding-rules.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript TypeOf - How to Check the Type of a Variable or Object in JS",
  "desc": "Data types and type checking are fundamental aspects of any programming language. Many programming languages like Java have strict type checking. This means that if a variable is defined with a specific type it can contain a value of only that type. ...",
  "link": "/freecodecamp.org/javascript-typeof-how-to-check-the-type-of-a-variable-or-object-in-js.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

That's all for now. See you again with my next article soon. Until then, please take good care of yourself.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript Promise Tutorial - How to Resolve or Reject Promises in JS",
  "desc": "Promises are important building blocks for asynchronous operations in JavaScript. You may think that promises are not so easy to understand, learn, and work with. And trust me, you are not alone!  Promises are challenging for many web developers, eve...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
