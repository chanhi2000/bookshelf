---
lang: en-US
title: "How to Use Closures in JavaScript - A Beginner's Guide"
description: "Article(s) > How to Use Closures in JavaScript - A Beginner's Guide"
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
      content: "Article(s) > How to Use Closures in JavaScript - A Beginner's Guide"
    - property: og:description
      content: "How to Use Closures in JavaScript - A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/closures-in-javascript.html
prev: /programming/js/articles/README.md
date: 2021-06-08
isOriginal: false
author:
  - name: Matías Hernández
    url: https://matiashernandez.ck.page
cover: https://freecodecamp.org/news/content/images/2021/01/English-Header-4.png
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
  name="How to Use Closures in JavaScript - A Beginner's Guide"
  desc="Closures are a confusing JavaScript concept to learn, because it's hard to see how they're actually used.  Unlike other concepts such as functions, variables, and objects, you don't always use closures conscientiously and directly..."
  url="https://freecodecamp.org/news/closures-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/01/English-Header-4.png"/>

Closures are a confusing JavaScript concept to learn, because it's hard to see how they're actually used.

Unlike other concepts such as functions, variables, and objects, you don't always use closures conscientiously and directly. You don't say: Oh! Here I will use a closure as a solution.

But at the same time, you might have already used this concept a hundred times. Learning about closures is more about identifying when one is being used rather than learning a new concept.

---

## What is a closure in JavaScript?

You have a closure when a function reads or modifies the value of a variable defined outside its context.

```js
const value = 1
function doSomething() {
  let data = [1,2,3,4,5,6,7,8,9,10,11]
  return data.filter(item => item % value === 0)
}
```

Here the function `doSomething` uses the variable `value`. But also the function `item => item % value === 0` can then be written like this:

```js
function(item) {
  return item % value === 0
}
```

You use the value of the variable `value` that was defined outside of the function itself.

---

## Functions can access values out of context

As in the previous example, a function can access and use values that are defined outside its "body" or context, for example:

```js
let count = 1
function counter() {
  console.log(count)
}
counter() // print 1
count = 2
counter() // print 2
```

This allows us to modify the value of the `count` variable from anywhere in the module. Then when the counter function is called, it will know how to use the current value.

---

## Why do we use functions?

But why do we use functions in our programs? Certainly it is possible - difficult, but possible - to write a program without using functions we define. So why do we create proper functions?

Imagine a piece of code that does something wonderful, whatever, and is made up of X number of lines.

```js
/* My wonderful piece of code */
```

Now suppose you must use this **wonderful piece of code** in various parts of your program, what would you do?.

The "natural" option is to put this piece of code together into a set that can be reusable, and that reusable set is what we call a function. Functions are the best way to reuse and share code within a program.

Now, you can use your function as many times as possible. And, ignoring some particular cases, calling your function N times is the same as writing that **wonderful piece of code** N times. It is a simple replacement.

---

## But where is the closure?

Using the counter example, let's consider that as the **wonderful piece of code.**

```js
let count = 1
function counter() {
  console.log(count)
}
counter() // print 1
```

Now, we want to reuse it in many parts, so we will "wrap" it in a function.

```js
function wonderfulFunction() {
  let count = 1
  function counter() {
    console.log(count)
  }
  counter() // print 1
}
```

Now what do we have? A function: `counter` that uses a value that was declared outside it `count`. And a value: `count` that was declared in the `wonderfulFunction` function scope but that is used inside the `counter` function.

That is, we have a function that uses a value that was declared outside its context: **a closure**.

Simple, isn't it? Now, what happens when the function `wonderfulFunction` is executed? What happens to the variable `count` and the function `counter` once the **parent** function is executed?

The variables and functions declared in its body *"disappear"* (garbage collector).

Now, let's modify the example a bit:

```js
function wonderfulFunction() {
  let count = 1
  function counter() {
    count++
    console.log(count)
  }
  setInterval(counter, 2000)
}
wonderfulFunction()
```

What will happen now to the variable and function declared inside `wonderfulFunction`?

In this example, we tell the browser to run `counter` every 2 seconds. So the JavaScript engine must keep a reference to the function and also to the variable that is used by it. Even after the parent function `wonderfulFunction` finishes its execution cycle, the function `counter` and the value count will still "*live"*.

This "effect" of having closures occurs because JavaScript supports the nesting of functions. Or in other words, functions are **first class citizens** in the language and you can use them like any other object: nested, passed as an argument, as a value of return, and so on.

---

## What can I do with closures in JavaScript?

### Immediately-invoked Function Expression (IIFE)

This is a technique that was used a lot in the ES5 days to implement the "module" design pattern (before this was natively supported). The idea is to "wrap" your module in a function that is immediately executed.

```js
(function(arg1, arg2){
  // ...
  // ...
})(arg1, arg2)
```

This lets you use private variables that can only be used by the module itself within the function - that is, it's allowed to emulate the access modifiers.

```js
const module = (function(){
  function privateMethod () {
  }
  const privateValue = "something"
  return {
   get: privateValue,
   set: function(v) { privateValue = v }
  }
})()

var x = module()
x.get() // "something"
x.set("Another value")
x.get() // "Another Value"
x.privateValue //Error
```

### Function Factory

Another design pattern implemented thanks to closures is the “Function Factory”. This is when functions create functions or objects, for example, a function that allows you to create user objects.

```js
const createUser = ({ userName, avatar }) => ({
  id: createID(),
  userName,
  avatar,
  changeUserName(userName) {
    this.userName = userName;
    return this;
  },
  changeAvatar(url) {
    // execute some logic to retrieve avatar image
    const newAvatar = fetchAvatarFromUrl(url)
    this.avatar = newAvatar
    return this
  }
});

console.log(createUser({ userName: 'Bender', avatar: 'bender.png' }));
//
// output
// {
//   "id": "17hakg9a7jas",
//   "avatar": "bender.png",
//   "userName": "Bender",
//   "changeUsername": [Function changeUsername]
//   "changeAvatar": [Function changeAvatar]
// 
// }
```

And using this pattern you can implement an idea from functional programming called **currying**.

### Currying

Currying is a design pattern (and a characteristic of some languages) where a function is immediately evaluated and returns a second function. This pattern lets you execute specialization and composition.

You create these "curried" functions using closures, defining and returning the inner function of the closure.

```js
function multiply(a) {

  return function (b) {
    return function (c) {
      return a * b * c
    }
  }
}
let mc1 = multiply(1);
let mc2 = mc1(2);
let res = mc2(3);
console.log(res);

let res2 = multiply(1)(2)(3);
console.log(res2);
```

These types of functions take a single value or argument and return another function that also receives an argument. It is a partial application of the arguments. It is also possible to rewrite this example using ES6.

```js
let multiply = (a) => (b) => (c) => {
  return a * b * c;
}

let mc1 = multiply(1);
let mc2 = mc1(2);
let res = mc2(3);
console.log(res);

let res2 = multiply(1)(2)(3);
console.log(res2);
```

Where can we apply currying? In composition, let's say you have a function that creates HTML elements.

```js
function createElement(element) {
  const el = document.createElement(element)
  return function (content) {
    return el.textNode = content
  }
}

const bold = crearElement('b')
const italic = createElement('i')
const content = 'My content'
const myElement = bold(italic(content)) // <b><i>My content</i></b>
```

### Event Listeners

Another place you can use and apply closures is in event handlers using React.

Suppose you are using a third party library to render the items in your data collection. This library exposes a component called `RenderItem` that has only one available prop `onClick`. This prop does not receive any parameters and does not return a value.

Now, in your particular app, you require that when a user clicks on the item the app displays an alert with the item's title. But the `onClick` event that you have available does not accept arguments - so what can you do? **Closures to the rescue**:

```js
// Closure
// with es5
function onItemClick(title) {
  return function () {
    alert("Clicked " + title)
  }
}
// with es6
const onItemClick = title => () => alert(`Clcked ${title}`)

return (
  <Container>
    {items.map(item => {
      return (
        <RenderItem onClick={onItemClick(item.title)}>
          <Title>{item.title}</Title>
        </RenderItem>
      )
    })}
  </Container>
)
```

In this simplified example we create a function that receives the title that you want to display and returns another function that meets the definition of the function that RenderItem receives as a prop.

---

## Conclusion

You can develop an app without even knowing that you are using closures. But knowing that they exist and how they really work unlocks new possibilities when you're creating a solution.

Closures are one of those concepts that can be hard to understand when you're starting out. But once you know you're using them and understand them, it allows you to increase your tools and advance your career.

![](https://freecodecamp.org/news/content/images/2021/01/English-Footer-Social-Card-1.jpg)

::: info Matías Hernández

🐦 [Follow me on Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`matiasfha`)](https://x.com/matiasfha) ✉️ [<FontIcon icon="fas fa-globe"/>Join to the newsletter](https://matiashernandez.ck.page) [❤️ Support my work](https://buymeacoffee.com/matiasfha)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Closures in JavaScript - A Beginner's Guide",
  "desc": "By Matías Hernández Closures are a confusing JavaScript concept to learn, because it's hard to see how they're actually used.  Unlike other concepts such as functions, variables, and objects, you don't always use closures conscientiously and directly...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/closures-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
