---
lang: en-US
title: "The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners"
description: "Article(s) > The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners"
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
      content: "Article(s) > The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners"
    - property: og:description
      content: "The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/javascript-this-keyword-binding-rules.html
prev: /programming/js/articles/README.md
date: 2020-10-23
isOriginal: false
author:
  - name: Tapas Adhikary
    url : https://freecodecamp.org/news/author/atapas/
cover: https://freecodecamp.org/news/content/images/2020/10/cover_freecodecamp.png
---

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
  name="The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners"
  desc="JavaScript's this keyword is one of the hardest aspects of the language to grasp. But it is critically important for writing more advanced JavaScript code. In JavaScript, the this keyword allows us to: Reuse functions in different execution contexts..."
  url="https://freecodecamp.org/news/javascript-this-keyword-binding-rules"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2020/10/cover_freecodecamp.png"/>

JavaScript's `this` keyword is one of the hardest aspects of the language to grasp. But it is critically important for writing more advanced JavaScript code.

In JavaScript, the `this` keyword allows us to:

- Reuse functions in different execution contexts. It means, a function once defined can be invoked for different objects using the `this` keyword.
- Identifying the object in the current execution context when we invoke a method.

The `this` keyword is very closely associated with JavaScript functions. When it comes to `this`, the fundamental thing is to understand where a function is invoked. Because we don't know what is in the `this` keyword until the function is invoked.

The usage of `this` can be categorized into five different `binding` aspects. In this article, we will learn about all five aspects with examples.

---

## First, What is Binding?

In JavaScript, a `Lexical Environment` is where your code is physically written. In the example below, the variable name is `lexically` inside the function `sayName()`.

```js
function sayName() {
  let name = 'someName';
  console.log('The name is, ', name);
}
```

An `Execution Context` refers to the code that is currently running and everything else that helps run it. There can be lots of lexical environments available but the one that's *currently* running is managed by the *[<VPIcon icon="fas fa-globe"/>Execution Context](https://blog.greenroots.info/understanding-javascript-execution-context-like-never-before-ckb8x246k00f56hs1nefzpysq)*.

<SiteInfo
  name="Understanding JavaScript Execution Context like never before"
  desc="Introduction Execution Context is the most fundamental part of JavaScript programming language. In this post, we will take an in-depth dive into this concept to find out and it is not only fundamental but straightforward to understand. In many cases..."
  url="https://blog.greenroots.info/understanding-javascript-execution-context-like-never-before/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1591021773127%2FYJIVeqU55.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

![Lexical Environment vs Execution Context](https://freecodecamp.org/news/content/images/2020/10/lexical.gif)

Each of the Execution Context contains an `Environment Record`. As JavaScript engine executes the code, variables and function names gets added to the Environment Record.

This phenomenon is known as `Binding` in JavaScript. `Binding` helps associate the identifiers(variables, function names) with the `this` keyword for an `execution context`.

Don't worry if you find this a bit hard to understand now. You will get a better grasp as we proceed.

---

## Rule #1: How JavaScript Implicit Binding Works

Implicit binding covers most of the use-cases for dealing with the `this` keyword.

When we invoke a method of an object, we use the dot(.) notation to access it. In implicit binding, you need to check the object adjacent to the method at the invocation time. This determines what `this` is binding to.

Let's look at an example to understand it better.

```js
let blog = {
  name: 'Tapas',
  address: 'freecodecamp',
  message: function () {
    console.log(`${this.name} blogs on ${this.address}`);
  }
};

blog.message();
```

Here `this` is bound to the blog object. We know this because we invoke the method `message()` on the blog object. So `this.name` is going to log *Tapas* and `this.address` is going to log *freeCodeCamp* in the console.

Let's see another example to better understand this concept:

```js
 function greeting(obj) {
  obj.logMessage = function () {
    console.log(`${this.name} is ${this.age} years old!`);
  }
};

const tom = {
  name: 'Tom',
  age: 7
};

const jerry = {
  name: 'jerry',
  age: 3
};

greeting(tom);
greeting(jerry);

tom.logMessage();
jerry.logMessage();
```

In this example, we have two objects, `tom` and `jerry`. We have decorated (enhanced) these objects by attaching a method called `logMessage()`.

Notice that when we invoke `tom.logMessage()`, it was invoked on the `tom` object. So `this` is bound to the `tom` object and it logs the value *tom* and 7 (`this.name` is equal to tom and `this.age` is 7 here). The same applies when `jerry.logMessage()` is invoked.

---

## Rule #2: How JavaScript Explicit Binding Works

We have seen that JavaScript creates an environment to execute the code we write. It takes care of the memory creation for variables, functions, objects, and so on in the *creation phase*. Finally it executes the code in the *execution phase*. This special environment is called the `Execution Context`.

There can be many such environments (Execution Contexts) in a JavaScript application. Each execution context operates independently from the others.

But at times, we may want to use stuff from one execution context in another. That is where explicit binding comes into play.

In explicit binding, we can call a function with an object when the function is outside of the execution context of the object.

There are three very special methods, `call()`, `apply()` and `bind()` that help us achieve explicit binding.

### How the JavaScript `call()` Method Works

With the `call()` method, the context with which the function has to be called will be passed as a parameter to the `call()`. Let us see how it works with an example:

```js
let getName = function () {
  console.log(this.name);
}

let user = {
  name: 'Tapas',
  address: 'Freecodecamp'
};

getName.call(user);
```

Here the `call()` method is invoked on a function called `getName()`. The `getName()` function just logs `this.name`. But what is `this` here? That gets determined by what has been passed to the `call()` method.

Here, `this` will bind to the user object because we have passed the user as a parameter to the `call()` method. So `this.name` should log the value of the name property of the user object, that is *Tapas*.

In the above example, we have passed just one argument to `call()`. But we can also pass multiple arguments to `call()`, like this:

```js
let getName = function (hobby1, hobby2) {
  console.log(this.name + ' likes ' + hobby1 + ' , ' + hobby2);
}

let user = {
  name: 'Tapas',
  address: 'Bangalore'
};

let hobbies = ['Swimming', 'Blogging'];

getName.call(user, hobbies[0], hobbies[1]);
```

Here we have passed multiple arguments to the `call()` method. The first argument must be the object context with which the function has to be invoked. Other parameters could just be values to use.

Here I am passing *Swimming* and *Blogging* as two parameters to the `getName()` function.

Did you notice a pain point here? In case of a `call()`, the arguments need to be passed one by one - which is not a smart way of doing things! That's where our next method, `apply()`, comes into the picture.

### How the JavaScript `apply()` Method Works

This hectic way of passing arguments to the `call()` method can be solved by another alternate method called `apply()`. It is exactly the same as `call()` but allows you to pass the arguments more conveniently. Have a look:

```js
let getName = function (hobby1, hobby2) {
  console.log(this.name + ' likes ' + hobby1 + ' , ' + hobby2);
}

let user = {
  name: 'Tapas',
  address: 'Bangalore'
};

let hobbies = ['Swimming', 'Blogging'];

getName.apply(user, hobbies);
```

Here we are able to pass an array of arguments, which is much more convenient than passing them one by one.

Tip: When you only have one value argument or no value arguments to pass, use `call()`. When you have multiple value arguments to pass, use `apply()`.

### How The JavaScript `bind()` Method Works

The `bind()` method is similar to the `call()` method but with one difference. Unlike the `call()` method of calling the function directly, `bind()` returns a brand new function and we can invoke that instead.

```js
let getName = function (hobby1, hobby2) {
  console.log(this.name + ' likes ' + hobby1 + ' , ' + hobby2);
}

let user = {
  name: 'Tapas',
  address: 'Bangalore'
};

let hobbies = ['Swimming', 'Blogging'];
let newFn = getName.bind(user, hobbies[0], hobbies[1]);

newFn();
```

Here the `getName.bind()` doesn't invoke the function `getName()` directly. It returns a new function, `newFn` and we can invoke it as `newFn()`.

---

## Rule #3: The JavaScript `new` Binding

A `new` keyword is used to create an object from the constructor function.

```js
let Cartoon = function (name, character) {
  this.name = name;
  this.character = character;
  this.log = function () {
    console.log(this.name + ' is a ' + this.character);
  }
};
```

You can create objects using the `new` keyword like this:

```js
let tom = new Cartoon('Tom', 'Cat');
let jerry = new Cartoon('Jerry', 'Mouse');
```

When a function is invoked with the `new` keyword, JavaScript creates an internal `this` object(like, this = {}) within the function. The newly created `this` binds to the object being created using the `new` keyword.

Sounds complex? Ok, let's break it down. Take this line,

```js
let tom = new Cartoon('Tom', 'Cat');
```

Here the function Cartoon is invoked with the `new` keyword. So the internally created `this` will be bound to the new object being created here, which is *tom*.

---

## Rule #4: JavaScript Global Object Binding

What do you think will be the output of the code below? What is `this` binding to here?

```js
let sayName = function (name) {
  console.log(this.name);
};

window.name = 'Tapas';
sayName();
```

If the `this` keyword is not resolved with any of the bindings, `implicit`, `explicit` or `new`, then the `this` is bound to the `window(global)` object.

There is one exception though. JavaScript **strict mode** does not allow this default binding.

```js
"use strict";
function myFunction() {
  return this;
}
```

In the above case, `this` is `undefined.`

---

## Rule #5: HTML Event Element Binding in JavaScript

In HTML event handlers, `this` binds to the HTML elements that receive the event.

```html
<button onclick="console.log(this)">Click Me!</button>
```

The is the output log in the console when you click on the button:

```plaintext title="output"
"<button onclick='console.log(this)'>Click Me!</button>"
```

You can change the button style using the `this` keyword, like this:

```html
<button onclick="this.style.color='teal'">Click Me!</button>
```

But be mindful when you call a function on the button click and use `this` inside that function.

```html
<button onclick="changeColor()">Click Me!</button>
```

and the JavaScript:

```js
function changeColor() {
  this.style.color='teal';
}
```

The above code won't work as expected. As we have seen in the Rule 4, here `this` will be bound to the global object (in the 'non-strict' mode) where there is no *style* object to set the color.

---

## In Summary

To summarize,

- In the case of implicit binding, `this` binds to the object adjacent to the dot(.) operator while invoking the method.
- In the case of explicit binding, we can call a function with an object when the function is outside of the execution context of the object. The methods `call()`, `apply()`, and `bind()` play a big role here.
- When a function is invoked with the `new` keyword, the `this` keyword inside the function binds to the new object being constructed.
- When the `this` keyword is not resolved with any of the bindings, `implicit`, `explicit` or `new`, then `this` is bound to the `window(global)` object. In JavaScript's strict mode, `this` will be undefined.
- In HTML event handlers, `this` binds to the HTML elements that receive the event.

There is one more case where `this` behaves differently, such as with `ES6 arrow function`s. We will take a look at that in a future article.

I hope you found this article insightful. You may also like,

<SiteInfo
  name="JavaScript Hoisting Internals"
  desc="Introduction Welcome to the third post of the series, JavaScript: Cracking the Nuts. In this post, we will learn about another fundamental JavaScript concept called Hoisting. As the series's focus is to get to the basics and internals of every conce..."
  url="https://blog.greenroots.info/javascript-hoisting-internals/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1593058699029%2FFWjiHrgOm.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

<SiteInfo
  name="Understanding JavaScript Execution Context like never before"
  desc="Introduction Execution Context is the most fundamental part of JavaScript programming language. In this post, we will take an in-depth dive into this concept to find out and it is not only fundamental but straightforward to understand. In many cases..."
  url="https://blog.greenroots.info/understanding-javascript-execution-context-like-never-before/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1591021773127%2FYJIVeqU55.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

<SiteInfo
  name="JavaScript Scope Fundamentals with Tom and Jerry"
  desc="Introduction Welcome to another post of the series, JavaScript: Cracking the Nuts. This series is all about visiting JavaScript fundamental concepts with more significant details. In this article, I am going to explain another important concept calle..."
  url="https://blog.greenroots.info/javascript-scope-fundamentals-with-tom-and-jerry/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1594984519436%2F2oN1KRnZl.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

<SiteInfo
  name="Understanding JavaScript Closure with example"
  desc="Joy of getting to the endAll's well that ends well. Welcome to the last post of the series JavaScript: Cracking the Nuts. I want to thank you all for liking the series so far. There is another reason why this article is special to me. This is my 5..."
  url="https://blog.greenroots.info/understanding-javascript-closure-with-example/"
  logo="https://cdn.hashnode.com/res/hashnode/image/upload/v1560855683137/85XtBDDa2.png?auto=compress,format&format=webp&fm=png"
  preview="https://hashnode.com/utility/r?url=https%3A%2F%2Fcdn.hashnode.com%2Fres%2Fhashnode%2Fimage%2Fupload%2Fv1595646310094%2F_PZOw3_PH.png%3Fw%3D1200%26h%3D630%26fit%3Dcrop%26crop%3Dentropy%26auto%3Dcompress%2Cformat%26format%3Dwebp%26fm%3Dpng"/>

If this article was useful, please share it so others can read it as well. You can @ me on Twitter ([<VPIcon icon="fa-brands fa-x-twitter"/>`tapasadhikary`](https://x.com/tapasadhikary)) with comments, or feel free to follow me.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The JavaScript `this` Keyword + 5 Key Binding Rules Explained for JS Beginners",
  "desc": "JavaScript's this keyword is one of the hardest aspects of the language to grasp. But it is critically important for writing more advanced JavaScript code. In JavaScript, the this keyword allows us to: Reuse functions in different execution contexts...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/javascript-this-keyword-binding-rules.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
