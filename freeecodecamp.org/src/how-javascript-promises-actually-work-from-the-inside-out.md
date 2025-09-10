---
lang: en-US
title: "How JavaScript promises actually work from the inside out"
description: "Article(s) > How JavaScript promises actually work from the inside out"
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
      content: "Article(s) > How JavaScript promises actually work from the inside out"
    - property: og:description
      content: "How JavaScript promises actually work from the inside out"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-javascript-promises-actually-work-from-the-inside-out.html
prev: /programming/js/articles/README.md
date: 2019-02-19
isOriginal: false
author:
  - name: Shailesh Shekhawat
    url : https://freecodecamp.org/news/author/
cover: https://cdn-media-1.freecodecamp.org/images/1*IXaKMoKxyvrZs1prvukJvw.jpeg
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
  name="How JavaScript promises actually work from the inside out"
  desc="By Shailesh Shekhawat One of the most important questions I faced in interviews was how promises are implemented. Since async/await is becoming more popular, you need to understand promises. What is a Promise? A promise is an object which represents ..."
  url="https://freecodecamp.org/news/how-javascript-promises-actually-work-from-the-inside-out-76698bb7210b"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-1.freecodecamp.org/images/1*IXaKMoKxyvrZs1prvukJvw.jpeg"/>

One of the most important questions I faced in interviews was how promises are implemented. Since async/await is becoming more popular, you need to understand promises.

---

## What is a Promise?

A promise is an object which represents the result of an asynchronous operation which is either resolved or rejected (with a reason).

There are 3 states

- **Fulfilled:** `onFulfilled()` will be called (e.g., `resolve()` was called)
- **Rejected:** `onRejected()` will be called (e.g., `reject()` was called)
- **Pending:** not yet fulfilled or rejected

So let’s see how’s it is implemented:

```js :collapsed-lines title="promise/src/core.js"
'use strict';

var asap = require('asap/raw');

function noop() {}

// States:
//
// 0 - pending
// 1 - fulfilled with _value
// 2 - rejected with _value
// 3 - adopted the state of another promise, _value
//
// once the state is no longer pending (0) it is immutable

// All `_` prefixed properties will be reduced to `_{random number}`
// at build time to obfuscate them and discourage their use.
// We don't use symbols or Object.defineProperty to fully hide them
// because the performance isn't good enough.


// to avoid using try/catch inside critical functions, we
// extract them to here.
var LAST_ERROR = null;
var IS_ERROR = {};
function getThen(obj) {
  try {
    return obj.then;
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}
function tryCallTwo(fn, a, b) {
  try {
    fn(a, b);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
}

module.exports = Promise;

function Promise(fn) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Promise constructor\'s argument is not a function');
  }
  this._deferredState = 0;
  this._state = 0;
  this._value = null;
  this._deferreds = null;
  if (fn === noop) return;
  doResolve(fn, this);
}
Promise._onHandle = null;
Promise._onReject = null;
Promise._noop = noop;

Promise.prototype.then = function(onFulfilled, onRejected) {
  if (this.constructor !== Promise) {
    return safeThen(this, onFulfilled, onRejected);
  }
  var res = new Promise(noop);
  handle(this, new Handler(onFulfilled, onRejected, res));
  return res;
};

function safeThen(self, onFulfilled, onRejected) {
  return new self.constructor(function (resolve, reject) {
    var res = new Promise(noop);
    res.then(resolve, reject);
    handle(self, new Handler(onFulfilled, onRejected, res));
  });
}
function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (Promise._onHandle) {
    Promise._onHandle(self);
  }
  if (self._state === 0) {
    if (self._deferredState === 0) {
      self._deferredState = 1;
      self._deferreds = deferred;
      return;
    }
    if (self._deferredState === 1) {
      self._deferredState = 2;
      self._deferreds = [self._deferreds, deferred];
      return;
    }
    self._deferreds.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}

function handleResolved(self, deferred) {
  asap(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      if (self._state === 1) {
        resolve(deferred.promise, self._value);
      } else {
        reject(deferred.promise, self._value);
      }
      return;
    }
    var ret = tryCallOne(cb, self._value);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
function resolve(self, newValue) {
  // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError('A promise cannot be resolved with itself.')
    );
  }
  if (
    newValue &&
    (typeof newValue === 'object' || typeof newValue === 'function')
  ) {
    var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (
      then === self.then &&
      newValue instanceof Promise
    ) {
      self._state = 3;
      self._value = newValue;
      finale(self);
      return;
    } else if (typeof then === 'function') {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._state = 1;
  self._value = newValue;
  finale(self);
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  if (Promise._onReject) {
    Promise._onReject(self, newValue);
  }
  finale(self);
}
function finale(self) {
  if (self._deferredState === 1) {
    handle(self, self._deferreds);
    self._deferreds = null;
  }
  if (self._deferredState === 2) {
    for (var i = 0; i < self._deferreds.length; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }
}

function Handler(onFulfilled, onRejected, promise){
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, promise) {
  var done = false;
  var res = tryCallTwo(fn, function (value) {
    if (done) return;
    done = true;
    resolve(promise, value);
  }, function (reason) {
    if (done) return;
    done = true;
    reject(promise, reason);
  });
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
  }
}
```

According to the definition at [<VPIcon icon="fa-brands fa-firefox"/>Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Parameters): It takes an *executor* function as an argument.

```js
function noop() {} 

function Promise(executor) {
  if (typeof this !== 'object') {
    throw new TypeError('Promises must be constructed via new');
  }
 if (typeof executor !== 'function') {
   throw new TypeError('Promise constructor\'s argument is not a function');
 }
  this._deferredState = 0;
  this._state = 0;
  this._value = null;
  this._deferreds = null;
  if (executor === noop) return;
  doResolve(executor, this);
}
```

Looks like a simple function with some properties initialized to `0` or `null`. Here are a few things to notice:

`this._state` property can have three possible values as described above:

```plaintext
0 - pending
1 - fulfilled with _value
2 - rejected with _value
3 - adopted the state of another promise, _value
```

Its value is`0` (**pending**) when you create a new **promise.**

Later `doResolve(executor, this)` is invoked with `executor and promise` object.

Let’s move on to the definition of `doResolve` and see how it’s implemented.

```js :collapsed-lines
/**
* Take a potentially misbehaving resolver function and make sure
* onFulfilled and onRejected are only called once.
*
* Makes no guarantees about asynchrony.
*/

function doResolve(fn, promise) {
  var done = false;
  var resolveCallback = function(value) {
      if (done) return;
      done = true;
      resolve(promise, value);
 };
 var rejectCallback = function(reason) {
   if (done) return;
   done = true;
   reject(promise, reason);
};

var res = tryCallTwo(fn, resolveCallback, rejectCallback);
  if (!done && res === IS_ERROR) {
    done = true;
    reject(promise, LAST_ERROR);
 }
}
```

Here it is again calling `tryCallTwo` function with executor and 2 callbacks. The callbacks are again calling `resolve` and `reject`

The `done` variable is used here to make sure the promise is resolved or rejected only once, so if you try to reject or resolve a promise more than once then it will return because `done = true`.

```js
function tryCallTwo(fn, a, b) {
   try {
    fn(a, b);
   } catch (ex) {
     LAST_ERROR = ex;
     return IS_ERROR;
  }
}
```

This function indirectly calls the main `executor` callback with 2 arguments. These arguments contain logic on how `resolve` or `reject` should be called. You can check *resolveCallback* and *rejectCallback* in `doResolve` function above*.*

If there is an error during execution it will store the error in `LAST_ERROR` and return the error.

Before we jump to the `resolve` function definition, let’s check out the `.then` function first:

```js
Promise.prototype.then = function(onFulfilled, onRejected) {
   if (this.constructor !== Promise) {
     return safeThen(this, onFulfilled, onRejected);
   }
   var res = new Promise(noop);
   handle(this, new Handler(onFulfilled, onRejected, res));
   return res;
};

function Handler(onFulfilled, onRejected, promise) {
   this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled  : null;
   this.onRejected = typeof onRejected === "function" ? onRejected :  null;
   this.promise = promise;
}
```

So in the above function, then is creating new `promise` and assigning it as a property to a new function called `Handler`. The `Handler` function has arguments *onFulfilled* and *onRejected.* Later it will use this promise to resolve or reject with value/reason.

As you can see, the `.then` function is calling again another function:

```js
handle(this, new Handler(onFulfilled, onRejected, res));
```

::: tip Implementation:

```js :collapsed-lines
function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (Promise._onHandle) {
    Promise._onHandle(self);
  }
  if (self._state === 0) {
    if (self._deferredState === 0) {
      self._deferredState = 1;
      self._deferreds = deferred;
      return;
    }
    if (self._deferredState === 1) {
      self._deferredState = 2;
      self._deferreds = [self._deferreds, deferred];
      return;
    }
    self._deferreds.push(deferred);
    return;
  }
  handleResolved(self, deferred);
}
```

- There is a while loop which will keep assigning the resolved promise object to the current promise which is also a promise for `_state === 3`
- If `_state = 0(pending)` and promise state has been deferred until another nested promise is resolved, its callback is stored in `self._deferreds`

```js
function handleResolved(self, deferred) {
  asap(function() { // asap is external lib used to execute cb immediately
  var cb = self._state === 1 ? deferred.onFulfilled :     deferred.onRejected;
  if (cb === null) {
    if (self._state === 1) {
      resolve(deferred.promise, self._value);
    } else {
      reject(deferred.promise, self._value);
    }
    return;
  }
  var ret = tryCallOne(cb, self._value);
    if (ret === IS_ERROR) {
      reject(deferred.promise, LAST_ERROR);
    } else {
      resolve(deferred.promise, ret);
    }
  });
}
```

What's happening:

- If the state is 1`(fulfilled)` then call the *resolve* else *reject*
- If `onFulfilled` or `onRejected` is `null` or if we used an empty `.then()` *resolved* or *reject* will be called respectively
- If `cb` is not empty then it is calling another function `tryCallOne(cb, self._value)`

```js
function tryCallOne(fn, a) {
  try {
    return fn(a);
  } catch (ex) {
    LAST_ERROR = ex;
    return IS_ERROR;
  }
} a) {
```

`**tryCallOne**` **:** This function only calls the callback that is passed into the argument `self._value`. If there is no error it will resolve the promise, otherwise it will reject it.

Every promise must supply a `.then()` method with the following signature:

```js
promise.then(
  onFulfilled?: Function,
  onRejected?: Function
) => Promise
```

- Both `onFulfilled()` and `onRejected()` are optional.
- If the arguments supplied are not functions, they must be ignored.
- `onFulfilled()` will be called after the promise is fulfilled, with the promise’s value as the first argument.
- `onRejected()` will be called after the promise is rejected, with the reason for rejection as the first argument.
- Neither `onFulfilled()` nor `onRejected()` may be called more than once.
- `.then()` may be called many times on the same promise. In other words, a promise can be used to aggregate callbacks.
- `.then()` must return a new promise.

### Promise Chaining

`.then` should return a promise. That's why we can create a chain of promises like this:

```js
Promise.then(() => 
  Promise.then(() => 
    Promise.then(result => result) 
)).catch(err)
```

#### Resolving a promise

Let’s see the `resolve` function definition that we left earlier before moving on to `.then()`:

```js :collapsed-lines
function resolve(self, newValue) {
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  if (newValue === self) {
    return reject(
      self,
      new TypeError("A promise cannot be resolved with itself.")
    );
  }
  if (
    newValue &&
    (typeof newValue === "object" || typeof newValue === "function")
  ) {
   var then = getThen(newValue);
    if (then === IS_ERROR) {
      return reject(self, LAST_ERROR);
    }
    if (then === self.then && newValue instanceof Promise) {
      self._state = 3;
      self._value = newValue;
      finale(self);
      return;
    } else if (typeof then === "function") {
      doResolve(then.bind(newValue), self);
      return;
    }
  }
  self._state = 1;
  self._value = newValue;
  finale(self);
}
```

- We check if the result is a promise or not. If it’s a function, then call that function with value using `doResolve()`.
- If the result is a promise then it will be pushed to the `deferreds` array. You can find this logic in the `finale` function.

#### Rejecting a promise

```js
Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};
```

The above function can be found in `./es6-extensions.js`.

Whenever we reject a promise, the `.catch` callback is called which is a sugar coat for `then(null, onRejected)`.

Here is the basic rough diagram that I have created which is a birds-eye view of what's happening inside:

![](https://cdn-media-1.freecodecamp.org/images/r2vWWMWfHAR70Vx6s3URd8HIb9aA-ngZJcqt)

Let’s see once again how everything is working:

For example, we have this promise:

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Time is out");
  }, 3000)
})
.then(console.log.bind(null, 'Promise is fulfilled'))
.catch(console.error.bind(null, 'Something bad happened: '))
```

1. Promise `constructor` is called and an instance is created with `new Promise`
2. `executor` function is passed to `doResolve(executor, this)` and callback where we have defined `setTimeout` will be called by `tryCallTwo(executor, resolveCallback, rejectCallback)`so it will take 3 seconds to finish
3. We are calling `.then()` over the promise instance so before our `timeout` is completed or any async `api` returns, `Promise.prototype.then` will be called as `.then(cb, null)`
4. `.then` creates a new `promise` and passes it as an argument to `new Handler(onFulfilled, onRejected, promise)`
5. `handle` function is called with the original `promise` instance and the `handler` instance we created in point 4.
6. Inside the `handle` function, current `self._state = 0` and `self._deferredState = 0` so `self_deferredState` will become `1` and `handler` instance will be assigned to `self.deferreds` after that control will return from there
7. After `.then()` we are calling `.catch()` which will internally call `.then(null, errorCallback)` — again the same steps are repeated from **point 4 to point 6 and skip point 7** since we called `.catch` once
8. Current `promise` state is **pending** and it will wait until it is resolved or rejected. So in this example, after 3 seconds, `setTimeout` callback is called and we are resolving this explicitly which will call `resolve(value)`.
9. `resolveCallback` will be called with value `Time is out` :) and it will call the main `resolve` function which will check if `value !== null && value == 'object' && value === 'function'`
10. It will fail in our case since we passed `string` and `self._state` will become `1` with `self._value = 'Time is out'` and later `finale(self)` is called.
11. `finale` will call `handle(self, self.deferreds)` once because `self._deferredState = 1`, and for the chain of promises, it will call `handle()` for each `deferred` function.
12. In the `handle` function, since `promise` is resolved already, it will call `handleResolved(self, deferred)`
13. `handleResolved` function will check if `_state === 1` and assign `cb = deferred.onFulfilled` which is our `then` callback. Later `tryCallOne(cb, self._value)` will call that callback and we get the final result. While doing this if any error occurred then `promise` will be rejected.

#### When a promise is rejected

In this case, all the steps will remain the same — but in **point 8** we call `reject(reason)`. This will indirectly call `rejectCallback` defined in `doResolve()` and `self._state` will become `2`. In the `finale` function `cb` will be equal to `deferred.onRejected` which will be called later by `tryCallOne`. That’s how the `.catch` callback will be called.

That's all for now! I hope you enjoyed the article and it helps in your next JavaScript interview.

If you encounter any problem feel free to *[get in touch (<VPIcon icon="fa-brands fa-x-twitter"/>`thatshailesh`)](https://x.com/thatshailesh) or comment below.* I would be happy to help ?

::: info

Originally published at [<VPIcon icon="fas fa-globe"/>101node.io](https://101node.io/blog/how-promises-actually-work-inside-out) on February 05, 2019.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How JavaScript promises actually work from the inside out",
  "desc": "By Shailesh Shekhawat One of the most important questions I faced in interviews was how promises are implemented. Since async/await is becoming more popular, you need to understand promises. What is a Promise? A promise is an object which represents ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-javascript-promises-actually-work-from-the-inside-out.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
