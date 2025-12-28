---
lang: en-US
title: "How and when to use JavaScript arrow functions"
description: "Article(s) > How and when to use JavaScript arrow functions"
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
      content: "Article(s) > How and when to use JavaScript arrow functions"
    - property: og:description
      content: "How and when to use JavaScript arrow functions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-arrow-functions.html
prev: /programming/js/articles/README.md
date: 2025-02-17
isOriginal: false
author:
  - name: Joe Attardi
    url : https://blog.logrocket.com/author/joeattardi/
cover: /assets/image/blog.logrocket.com/javascript-arrow-functions/banner.png
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
  name="How and when to use JavaScript arrow functions"
  desc="Learn the basic syntax of JavaScript arrow functions, how to use them, and how they differ from standard functions."
  url="https://blog.logrocket.com/javascript-arrow-functions"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/javascript-arrow-functions/banner.png"/>

The ES2015 standard introduced arrow functions to JavaScript. Arrow functions have a simpler syntax than standard functions, but we’ll also see that there are some important differences in how they behave.

---

## What are JavaScript arrow functions?

![how and when to use JavaScript arrow functions](/assets/image/blog.logrocket.com/javascript-arrow-functions/banner.png)

Arrow functions can be used almost anywhere a standard function expression can be used, with a few exceptions. They have a compact syntax, and like standard functions, have an argument list, a body, and a possible return value.

We’ll explore arrow functions in detail below, but in general they should be avoided any time you need a new `this` binding. Arrow functions don’t have their own `this`; they inherit the `this` from the outer scope.

Arrow functions also can’t be used as constructors or generator functions, as they can’t contain a `yield` statement.

---

## What is the basic syntax of a JavaScript arrow function?

An arrow function consists of a list of arguments, followed by an arrow (made with an equals sign and a greater-than sign (`=>`), followed by the function body. Here’s a simple example of an arrow function that takes a single argument:

```js
const greet = name => {
  console.log(`Hello, ${name}!`);
};
```

You can optionally also surround the argument with parentheses:

```js
const greet = (name) => {
  console.log(`Hello, ${name}!`);
}
```

If an arrow function takes more than one argument, the parentheses are required. Like a standard function, the argument names are separated by commas:

```js
const sum = (a, b) => {
  return a + b;
}
```

An anonymous [**arrow function**](/blog.logrocket.com/anomalies-in-javascript-arrow-functions.md) has no name. These are typically passed as callback functions:

```js
button.addEventListener('click', event => {
  console.log('You clicked the button!');
});
```

If your arrow function body is a single statement, you don’t even need the curly braces:

```js
const greet = name => console.log(`Hello, ${name}!`);
```

---

## Implicit returns and the JavaScript arrow function

One of the important differences between JavaScript arrow functions and standard functions is the idea of an [**implicit return**](/blog.logrocket.com/javascript-typescript-shorthands.md#implicit-return-arrow-function-expressions): returning a value without using a `return` statement.

If you omit the curly braces from an arrow function, the value of the function body’s expression will be returned from the function without needing a `return` statement. Let’s revisit the `sum` function from earlier. This can be rewritten to use an implicit return:

```js
const sum = (a, b) => a + b;
```

Implicit return is handy when creating callback functions:

```js
const values = [1, 2, 3];
const doubled values = values.map(value => value * 2); // [2, 4, 6]
```

### Returning an object implicitly

You can return any kind of value you want with an implicit return, but you’ll need a little extra help if you want to return an object. Since an object literal uses curly braces, JavaScript will interpret the curly braces as the function body. Consider this example:

```js
const createUser = (name, email) => { name, email };
```

In this case, there will be no implicit return and the function will actually return `undefined` because there is no `return` statement. To return an object implicitly, you need to wrap the object with parentheses:

```js
const createUser = (name, email) => ({ name, email });
```

Now JavaScript knows this is an implicit return of an object containing the `name` and `email` properties.

---

## Explicit returns and the JavaScript arrow function

Like with standard functions, an arrow function can explicitly return a value with a `return` statement:

```js
const createUser = (name, email) => {
  return { name, email };
};
```

---

## How JavaScript arrow functions differ from standard functions

Arrow functions behave differently from standard functions in some other ways.

### No `this` binding

The most significant difference is that, unlike a standard function, an arrow function doesn’t create a `this` binding of its own. Consider the following example:

```js
const counter = {
  value: 0,
  increment: () => {
    this.value += 1;
  }
};
```

Because the `increment` method is an arrow function, the [**`this`value**](/blog.logrocket.com/access-correct-this-inside-callback-javascript.md) in the function does not refer to the `counter` object. Instead, it inherits the outer `this`, which in this example would be the global window object.

As you might expect, if you call `counter.increment()`, it won’t change `counter.value`. Instead, `this.value` will be `undefined` since `this` refers to the window.

Sometimes, you can use this to your advantage. There are cases where you do want the outer `this` value from within a function. This is a common scenario when using callback functions. Before arrow functions, you’d have to call `bind` on a function to force it to have a certain `this`, or you might have followed a pattern like this:

```js
var self = this;
setTimeout(function() {
  console.log(self.name);
}, 1000);
```

With an arrow function, you get the `this` from the enclosing scope:

```js
setTimeout(() => console.log(this.name));
```

### No `arguments` object

In a standard function, you can reference the `arguments` object to get information about the arguments passed to the function call. This is an array-like object that holds all the argument values. In the past, you might have used this to write a variadic function.

Consider this `sum` function, which supports a variable number of arguments:

```js
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }

  return total;
}
```

You can call `sum` with any number of arguments:

```js
sum(1, 2, 3) // 6
```

If you implement `sum` as an arrow function, there won’t be an `arguments` object. Instead, you’ll need to use the rest parameter syntax:

```js
const sum = (...args) => {
  let total = 0;
  for (let i = 0; i < args.length; i++) {
    total += args[i];
  }

  return args;
}
```

You can call this version of the `sum` function the same way:

```js
sum(1, 2, 3) // 6
```

This syntax isn’t unique to arrow functions, of course. You can use the [<VPIcon icon="fa-brands fa-firefox"/>rest parameter syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) with standard functions, too. In my experience with [**modern JavaScript**](/blog.logrocket.com/six-things-you-may-not-know-about-javascript.md), I don’t really see the `arguments` object being used anymore, so this distinction may be a moot point.

### No prototype

Standard JavaScript functions have a `prototype` property. Before the introduction of the `class` syntax, this was the way to create objects with `new`:

```js
function Greeter() { }
Greeter.prototype.sayHello = function(name) {
  console.log(`Hello, ${name}!`);
};

new Greeter().sayHello('Joe'); // Hello, Joe!
```

If you try this with an arrow function, you’ll get an error. This is because arrow functions don’t have a prototype:

```js
const Greeter = () => {};
Greeter.prototype.sayHello = name => console.log(`Hello, ${name}!`);
// TypeError: Cannot set properties of undefined (setting 'sayHello')
```

---

## When to use JavaScript arrow functions vs. standard functions

Arrow functions can be used in a lot of scenarios, but there are some situations where you still need to use a standard function expression. These include:

- The constructor of a class
- An object method where you need to access the object via a `this` value
- A function that you need to explicitly bind to a given `this` value with `Function.prototype.bind`
- A generator function containing `yield` statements

Arrow functions particularly shine when used as callback functions, due to their terse syntax. In particular, they are very useful for array methods such as `forEach`, `map`, and `filter`. You *can* use them as object methods, but only if the method doesn’t try to access the object using `this`.

The arrow function is very useful in certain situations. But like most things, arrow functions have potential pitfalls if you don’t use them correctly.

---

## How to define a method using an arrow function

Here’s how you’d define a method using an arrow function:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet = () => console.log(`Hello, ${this.name}!`);
}
```

Unlike a method on an object literal — which as we saw earlier does not get the `this` value — here the `greet` method gets its `this` value from the enclosing `Person` instance. Then, no matter how the method is called, the `this` value will always be the instance of the class. Consider this example that uses a standard method with `setTimeout`:

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
      console.log(`Hello, ${this.name}!`);
  }

  delayedGreet() {
      setTimeout(this.greet, 1000);
  }
}

new Person('Joe').delayedGreet(); // Hello, undefined!
```

When the `greet` method is called from the `setTimeout` call, its `this` value becomes the global window object. The `name` property isn’t defined there, so you’ll get `Hello, undefined!` when you call the `delayedGreet` method.

If you define `greet` as an arrow function instead, it will still have the enclosing `this` set to the class instance, even when called from `setTimeout`:

```js
class Person {
    constructor(name) {
      this.name = name;
    }

    greet = () => console.log(`Hello, ${this.name}!`);

    delayedGreet() {
        setTimeout(this.greet, 1000);
    }
}

new Person('Joe').delayedGreet(); // Hello, Joe!
```

You can’t, however, define the constructor as an arrow function. If you try, you’ll get an error:

```js
class Person {
  constructor = name => {
    this.name = name;
  }
}

// SyntaxError: Classes may not have a field named 'constructor'
```

---

## Conclusion

Since the arrival of the ES2015 standard, JavaScript programmers have had arrow functions in their toolbox. Their main strength is the abbreviated syntax; you don’t need the `function` keyword, and with implicit return you don’t need a `return` statement.

The lack of a `this` binding can cause confusion, but is also handy when you want to preserve the enclosing `this` value to another function when passed as a callback.

Consider this chain of array operations:

```js
const numbers = [1, 2, 3, 4]
  .map(function(n) {
    return n * 3;
  })
  .filter(function(n) {
    return n % 2 === 0;
  });
```

This looks fine, but it’s a little verbose. With arrow functions, the syntax is cleaner:

```js
const numbers = [1, 2, 3, 4]
  .map(n => n * 3)
  .filter(n => n % 2 === 0);
```

Arrow functions don’t have an `arguments` object, but they do support rest parameter syntax. This makes it easy to build arrow functions that take a variable number of arguments.

The main advantages of arrow functions are enhanced readability as well as the different `this` behavior, which will make life easier in certain situations where you need to preserve an outer `this` value.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How and when to use JavaScript arrow functions",
  "desc": "Learn the basic syntax of JavaScript arrow functions, how to use them, and how they differ from standard functions.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-arrow-functions.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
