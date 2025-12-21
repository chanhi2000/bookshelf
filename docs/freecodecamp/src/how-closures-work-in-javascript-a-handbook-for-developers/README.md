---
lang: en-US
title: "How Closures Work in JavaScript: A Handbook for Developers"
description: "Article(s) > How Closures Work in JavaScript: A Handbook for Developers"
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
      content: "Article(s) > How Closures Work in JavaScript: A Handbook for Developers"
    - property: og:description
      content: "How Closures Work in JavaScript: A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-closures-work-in-javascript-a-handbook-for-developers/
prev: /programming/js/articles/README.md
date: 2025-11-26
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764083198713/3afde98a-fecd-4669-a2ad-3d78c28d3d5a.png
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
  name="How Closures Work in JavaScript: A Handbook for Developers"
  desc="If you're learning JavaScript, you've probably heard the term ”closure” at some point. In many developers' experience, just hearing this word can trigger anxiety. In nearly 17 years of programming experience, I've noticed that closures are one of the..."
  url="https://freecodecamp.org/news/how-closures-work-in-javascript-a-handbook-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764083198713/3afde98a-fecd-4669-a2ad-3d78c28d3d5a.png"/>

If you're learning JavaScript, you've probably heard the term "closure" at some point. In many developers' experience, just hearing this word can trigger anxiety. In nearly 17 years of programming experience, I've noticed that closures are one of the most intimidating topics for JavaScript developers, even though they shouldn't be.

The main goal of this handbook is to remove that fear. By the end of this guide, you should be able to confidently say, "I’m not afraid of closures anymore!"

Closures aren't actually that complicated at all when you break them down. They just might seem harder to grasp while you don't understand them clearly. Many articles or tutorials don't explain the topic deeply, which leaves you confused, asking questions like, "What exactly is a closure?" or "What does it really mean?"

Throughout this handbook, I'll walk you through several examples step by step. If you stick with this guide until the end, I promise – all your confusion about closures should disappear.

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. Basic JavaScript (ES6-style) knowledge
2. Familiarity with browser developer tools
3. Comfort with asynchronous code (promises)
4. Basic ability to use the terminal/command line
5. Familiarity with a code editor like VS Code – Live Server extension (for running HTML files locally)

:::

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out below.

---

## Project Setup Before Learning Closures

Closures are an amazing concept in JavaScript. But if you jump into the code without preparation, they can feel a bit intimidating.

So before we start exploring closures, let's set up a simple, clean project where you can test each example comfortably. Once this setup is done, you won't need to repeat it again and again throughout the article. So follow along carefully and you'll prepare everything at once.

### Create a New Project Folder

Open your terminal and run:

```sh
mkdir closure
cd closure
```

This folder will contain your main HTML file and all the JavaScript examples.

### Create the index.html File

Now create the HTML file:

```sh
touch index.html
```

Open <VPIcon icon="fa-brands fa-html5"/>`index.html` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Closure Tutorial | LogicBase Labs</title>
  </head>
  <body>
    <script src="./script/example-1.js"></script>
    <script src="./script/example-2.js"></script>
    <script src="./script/example-3.js"></script>
    <script src="./script/example-4.js"></script>
    <script src="./script/example-5.js"></script>
    <script src="./script/example-6.js"></script>
    <script src="./script/example-7.js"></script>
  </body>
</html>
```

#### Why so many `<script>` tags?

Good question! In this tutorial, you'll explore closures in **7 different ways**. Each example will live in its own JavaScript file, so things stay clean and beginner-friendly. If you tried to put everything inside one file, the outputs would get mixed up and confusing. That's why you're loading each example separately.

### Create the `script` Folder + Seven Example Files

Let's create a folder named **script**:

```sh
mkdir script
cd script
```

Now create the seven example files:

```sh
touch example-1.js
touch example-2.js
touch example-3.js
touch example-4.js
touch example-5.js
touch example-6.js
touch example-7.js
```

You'll write and test each closure example inside these files.

::: note Very Important Note

If all 7 files run at the same time, your console output will get mixed up. You won't understand which message came from which example.

So here's the rule:

- When working on <VPIcon icon="fa-brands fa-js"/>`example-1.js`, comment out the rest.
- When working on <VPIcon icon="fa-brands fa-js"/>`example-3.js`, uncomment that one only, and comment out the others.

:::

::: tip Example

```html
<!-- <script src="./script/example-1.js"></script> -->
<!-- <script src="./script/example-2.js"></script> -->
<script src="./script/example-3.js"></script>
<!-- <script src="./script/example-4.js"></script> -->
<!-- <script src="./script/example-5.js"></script> -->
<!-- <script src="./script/example-6.js"></script> -->
<!-- <script src="./script/example-7.js"></script> -->
```

This keeps your output clean, clear, and conflict-free.

:::

### Run the Project

Open **Live Server** from VS Code and you'll see: `http://127.0.0.1:5500/closure/index.html`

This is your working route. Inside this project, you'll explore the full world of closures step by step. Now you're ready to dive into closures and learn what they are, how they work, and why closures are one of the most powerful concepts in JavaScript.

---

## Functions and Parameters – The Basics

So now you will mainly work on the <VPIcon icon="fa-brands fa-js"/>`example-1.js` file. Listen, throughout this entire handbook, you will first write the full code, and then we’ll go line by line to understand the breakdown in detail. There's nothing to worry about: we will uncover every single thing in its full depth.

```js title="example-1.js"
function sum(num1, num2) {
  return num1 + num2;
}
console.log(sum(2, 3));
```

Usually, when you want to use an outside variable inside a function, you pass it as a parameter. For example, consider a function called `sum`:

```js title="example-1.js"
function sum(num1, num2) { // [!code focus]
  return num1 + num2;
}
console.log(sum(2, 3));
```

Here, two numbers are taken as parameters. To add these numbers and return the result:

```js title="example-1.js"
function sum(num1, num2) {
  return num1 + num2; // [!code focus]
}
console.log(sum(2, 3));
```

To see the output:

```js title="example-1.js"
function sum(num1, num2) {
  return num1 + num2;
}
console.log(sum(2, 3)); // [!code focus]
```

The output will be `5`. Simple, right?

---

## Accessing Variables Without Parameters

```js title="example-1.js"
var num1 = 2;
var num2 = 3;

function sum() {
    return num1 + num2;
}

console.log(sum());
```

But in JavaScript, there's a way to do the same thing without passing parameters. Let's remove the parameters from the `sum` function. Instead, you'll define two variables in the global scope:

```js title="example-1.js"
var num1 = 2; // [!code focus]
var num2 = 3; // [!code focus]

function sum() {
    return num1 + num2;
}

console.log(sum());
```

Now, when you call `sum()`, the output will still be `5`.

The question is: *“how does JavaScript do this?”* It seems strange, right? Inside a function, you're using variables that don't actually belong to that function – they exist outside in the wider environment where the function was created. In simple terms, the function is using variables from its parent scope.

---

## Understanding Scope and Lexical Scoping

This concept relates to one of the most fundamental principles in JavaScript: everything from a parent is accessible to the child. If there were nested functions inside this function, even the deepest child function could access variables like `num1` and `num2` from the parent. The parent's variables are fully accessible to the child, but nothing from the child can be accessed by the parent.

I’ve already covered this topic in a detailed video on **JavaScript Scope** on the LogicBase Labs YouTube channel. If you'd like to revisit the concept or get a quick refresher, you can watch the video below.

For example, if you define a new variable inside the `sum` function, it cannot be accessed from outside the function. This is the core idea of scope. This system of scope is theoretically called **Lexical Scoping**. Since today's topic is Closures, understanding scope is essential, as closures and scope are deeply connected.

According to lexical scoping, a child function can access its parent's variables, but a parent cannot access the child's. This isn't random – it's a specific convention or guideline in JavaScript.

---

## What is a Closure?

The word "closure" literally means a "bond" or "enclosure." Think of it like keeping a variable safely locked away, just like storing something inside a box.

Even though the box is closed, you can still use its contents when needed. This is why it's called a closure: because you keep a function's variables enclosed in such a way that, even if the outside world cannot access them directly, the function itself can still use them whenever required.

---

## Functions as Objects

In JavaScript, whenever you write a function, the function is actually treated as an object. Every function in JavaScript works as an object. Just as you can `console.log` an object to see it, you can also inspect a function.

Let's print our `sum` function:

```js
console.dir(sum);
```

Notice that you're not calling the function. Rather, you're just printing its body. You use `dir` instead of `log` because `console.log` only shows the function body, while `console.dir` displays the function as an object, letting you see each of its properties one by one. You can think of it as an upgraded version of `console.log`.

Looking at the output, you'll see an object. Expanding it reveals many properties, like `name`, `length`, `prototype`, and more. At the very bottom, there's a property called `Scopes`. Inside `Scopes`, there's a section named `Global` containing further details. The `Scopes` property is what we’ll mainly focus on here.

![Nested Function and Closure](https://cdn.hashnode.com/res/hashnode/image/upload/v1763460615059/210b2880-7cb7-4161-ac75-c67d196341ed.png)

---

## The Function-Parent Relationship

Notice something here: the `sum` function has its own world, right? So why is it still referencing the global scope?

Every function actually maintains a connection with its parent environment. It doesn't just live in its own world – it keeps a link to the environment where it was created. Simply put, it always holds a reference to its parent.

Why does it do this? Because if anything changes in the parent environment (like a variable's value or the need to use it inside the function), the function can still access it.

This whole process is the core concept of a closure. A function keeps track of the variables it uses from outside its own scope by closing over its parent, and its parent's parent – essentially the entire scope chain above it – holds them as references.

That's why this example is actually the simplest form of a closure. The `sum` function itself is a closure because it has captured some variables from its outer environment and can use them whenever needed.

Even though you often see closures explained with examples where "a function is inside another function," the fundamental idea starts here: *“any function that retains access to variables from its outer scope is, in essence, a closure.”*

---

## Nested Functions and Closures

```js title="example-1.js"
var num1 = 2;
var num2 = 3;

function sum() {
  return function () {
    return num1 + num2;
  };
}

var myFunc = sum();

console.dir(myFunc);
```

You can understand this even more clearly by tweaking the previous `sum` function. Instead of directly returning a value, you'll have the `sum` function return another function:

```js title="example-1.js"
var num1 = 2;
var num2 = 3;

function sum() {
  return function () { // [!code focus]
    return num1 + num2; // [!code focus]
  }; // [!code focus]
}

var myFunc = sum();

console.dir(myFunc);
```

The `sum` function is no longer returning a value directly. Instead, it's returning a function.

Now, create another variable called `myFunc`:

```js
var myFunc = sum();
```

You called the `sum` function, and whatever it returned (the inner function) is now stored in `myFunc`. In other words, `myFunc` is essentially the inner function returned by `sum`.

If you print `myFunc` to the console:

```js
console.dir(myFunc);
```

You'll see `num1` and `num2` listed as variables in the output. This function is still holding onto its global environment. Even though it's an inner function, it's still connected to the global scope and maintains the same global references as before.

![Nested Function and Closure](https://cdn.hashnode.com/res/hashnode/image/upload/v1763460615059/210b2880-7cb7-4161-ac75-c67d196341ed.png)

---

## Refining the Example

```js title="example-1.js"
var num1 = 2;

function sum() {
    var num2 = 3;
    return function () {
        return num1 + num2;
    };
}

var myFunc = sum();

console.dir(myFunc);
```

Now, remove the `num2` variable from the global scope and define it inside the `sum` function instead.

![Refine the closure](https://cdn.hashnode.com/res/hashnode/image/upload/v1763463873933/84153aca-ee54-476d-99be-4b638926c0f4.gif)

This time, in the browser, you can clearly see something labeled "Closure." In other words, the browser is directly showing that a closure has been created inside this function.

In older versions of Chrome, you would have seen "Closure" in the previous example too. But in the newer versions, it shows as "Global" until a function actually closes over another function. When a function is returned from within another function, that's when the browser displays "Closure." But keep in mind that theoretically, the previous example was also a kind of closure. The difference is just in how the browser presents it.

When you did `console.dir(myFunc)`, you saw that this inner function is using both `num1` and `num2`:

- `num1` is in the global scope
- `num2` is inside the `sum` function's scope

So what is this inner function doing? It's taking a reference to `num1` from the global scope and at the same time taking a reference to `num2` from its parent function, `sum`. In other words, this inner function now carries two worlds within it: one is the global scope, and the other is its parent scope. This is exactly what a closure does: it keeps all the outer scopes it needs "enclosed" so it can use their variables whenever necessary.

In the browser, you can see that inside this closure, `num2` exists, while `num1` remains in the global scope. So `num1` is no longer part of the closure. What does this mean? The function only carries the parts of the environment it actually needs for its execution. Simply put, it takes all the variables it needs, along with their references, as a compact package.

Think of it like the function holding onto references: whenever any of these variables are updated, the function can see those changes because it's still connected to the same references.

If you called `myFunc = sum()` once and keep calling `sum()` repeatedly, there's no problem. Each time, a new function will create its own separate scope and keep a reference to that scope. You defined a function and then called it elsewhere. Every time you call that function, it can still access the data from its previous scope. That's because every function preserves all the information from its parent scope as references. This is exactly how a function remembers its outer variables – and this is what a closure is.

---

## Creating Private Properties with Closures

So far, all the examples you've seen were very simple. Now, let's look at a practical example that will help you understand closures better and clear up any confusion.

Think about other programming languages for a minute: when you want to create a private property, what do you usually do? You define a property inside a class and mark it as "private" so that no one can access it directly from outside the class. Then, inside the class, you create one or more public functions (like getters or setters) which allow controlled access to or modification of that property. In other words, you can't touch the property directly from outside – you can only interact with it through specific functions defined inside the class.

In JavaScript, you can achieve the same idea much more simply using closures, entirely in a functional style.

![Creating private property](https://cdn.hashnode.com/res/hashnode/image/upload/v1763463928785/5e2d10bf-0e21-420d-8c27-576ab7172896.gif)

How? Let's see an example. Suppose you have a simple function:

```js title="example-2.js"
function bankAccount(initialBalance) {
  var balance = initialBalance;
  return function () {
    return balance;
  };
}
var account = bankAccount(100000);

console.log(account());
console.dir(account);
```

You've named it `bankAccount`, and it takes the user's initial balance as a parameter.

Inside it, define a variable:

```js title="example-2.js"
function bankAccount(initialBalance) {
  var balance = initialBalance; // [!code focus]
  return function () {
    return balance;
  };
}
var account = bankAccount(100000);

console.log(account());
console.dir(account);
```

So, the user's initial balance is stored internally in a variable called `balance`. Next, return a function that returns this `balance` variable. In other words, the balance can only be accessed through this returned function.

Outside, in the global scope, create a variable:

```js title="example-2.js"
function bankAccount(initialBalance) {
  var balance = initialBalance;
  return function () {
    return balance;
  };
}
var account = bankAccount(100000); // [!code focus]

console.log(account());
console.dir(account);
```

Here, you called the `bankAccount` function and passed 100000 as the initial balance. What is this function actually doing? It's returning another function. So now, the `account` variable holds that returned function.

If you write in the console:

```js title="example-2.js"
function bankAccount(initialBalance) {
  var balance = initialBalance;
  return function () {
    return balance;
  };
}
var account = bankAccount(100000);

console.log(account()); // [!code focus]
console.dir(account);
```

The output will be 100000. 

![Private Property Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763463963441/8104145d-b908-4131-8a6b-3c4c3ad88434.png)

But if you try this:

```js title="example-2.js"
function bankAccount(initialBalance) {
  var balance = initialBalance;
  return function () {
    return balance;
  };
}
var account = bankAccount(100000);

console.log(account());
console.dir(account); // [!code focus]
```

it won't work, because the `balance` variable cannot be accessed from outside.

![Error Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763463984564/6c70013b-6566-4bf2-a517-bea3672022e1.png)

What does this mean? The `balance` property is protected or private. No one from the outside can directly touch it. To see the balance, you can only call the returned function inside the original function. This is how you keep `balance` as a private variable and control access to it.

---

## The Role of Closures in Privacy

So, what's the role of the closure here? It's exactly what makes this possible. The inner function is the closure. If you write:

```js
console.dir(account);
```

You'll see that inside the `account` function is the returned function.

By taking the output and expanding it, you'll see that the `balance` variable exists inside the closure. Exactly, right? This means that `balance` wasn't created inside the `account` function itself – it was created one scope level up. Yet, you can still access `balance` from the returned function.

It's similar to the previous example, but this use case is slightly different. Here, you're showing how a private property can be kept secure. Even though you called the inner function from the outside, it still had access to `balance` within its scope. So, the outer scope cannot directly access `balance`, but thanks to the closure, you can maintain a reference to it. Even though the function is called from outside, the closure allows you to access the private property in a protected way.

Why protected? Because you're not accessing it directly – you can only see `balance` through the function call.

💡This is another powerful use case of closures: securing private properties so that they can't be directly accessed from outside, but only through specific functions.

---

## Understanding Closure Mechanics

### How Closures Make Decisions

Now, let’s look at another aspect of closures. We’ll revisit our first example.

```js title="example-1.js"
// 
var num1 = 2;

function sum() {
  var num2 = 3;
  return function () {
    return num1 + num2;
  };
}

var myFunc = sum();

console.dir(myFunc);
```

In that example, you used a variable called `num2` inside the inner function. That's why the function acted as a closure, right?

```js title="example-3.js"
var num1 = 2;
function sum() {
  var num2 = 3;
  return function () {
    return num1;
  };
}
var myFunc = sum();
console.dir(myFunc);
```

Now, keep the variable but stop using `num2` inside the inner function. If you check the output, you'll see that the closure is gone. Why?

![Closure Gone Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464099671/a34e465a-ed85-4631-8a0d-07e681cecc52.png)

It's because `num2` isn't used inside the inner function. JavaScript smartly recognizes that this variable isn't needed, so it's not included in the closure. In other words, JavaScript decides on its own: variables that won't be used inside the function, even if they exist in the outer scope, are not included in the closure. Only the variables that the function actually needs become part of the closure.

```js title="example-3.js"
var num1 = 2;
function sum() {
  var num2 = 3;
  var num = 6;
  return function () {
    return num;
  };
}
var myFunc = sum();
console.dir(myFunc);
```

For example, if you define another variable inside the `sum` function:

```js
var num = 6;
```

and do nothing else, there's still no need for a closure. But if you modify the inner function to return `num` instead of `num1`, the closure appears again. This time, the closure contains only `num`. `num2` won't be there, but `num1` remains because it exists in the global scope. JavaScript preserves this scope to maintain lexical scoping.

![Closure with num Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464124937/3a155661-838d-4070-a8ab-e6c283a0838f.png)

If you look at the global scope, you can still see `num1`. That's because you used the `var` keyword. If you had used `let`, it wouldn't be visible. The key difference you're noticing is: `num1` exists in the global scope, so it remains in the closure's "environment," but if a variable inside the inner function isn't used, it's not included in the closure.

For example, if you use `num1`, you're accessing the global variable. So what happens now? Will there be a closure? Look, there isn't one. Since `num1` exists in the global scope, there's no extra need. The global scope is sufficient, and no separate closure is required. This shows how closures actually work.

![No Closure with Global Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464145498/68d704f4-f614-49e9-929f-735880ef374a.png)

A closure decides which variables need to be kept inside the function and which don't. JavaScript makes this decision automatically. You just need to remember lexical scoping so that outer scope variables can be accessed.

In simple terms, closures make intelligent decisions. Variables used inside the function are kept "inside," variables in outer scopes that aren't used aren't included, and global variables are accessible directly, so there's no need to include them in the closure.

So here, you kept `num1`, and it exists in the global scope. The function can access it directly from there. But if the inner function used only `num` – which doesn't exist in its own scope or globally – then a closure would have to be created to carry that variable along.

In short, a closure doesn't wrap everything. It doesn't include variables that are already outside. This is an important point. Another important point is that global scope variables are never included in closures.

---

## Here’s What We’ll Cover

1. [Closures and Enclosing Scopes](#heading-closures-and-enclosing-scopes)
2. [Practical Example - Self-Contained Closures](#heading-practical-example-self-contained-closures)
3. [The Difference Between var and let](#heading-the-difference-between-var-and-let)
4. [Understanding Closures Through a Practical Stopwatch Example](#heading-understanding-closures-through-a-practical-stopwatch-example)
5. [Closures in Asynchronous Code](#heading-closures-in-asynchronous-code)
6. [Practical Example: API Requests with Closures](#heading-practical-example-api-requests-with-closures)
7. [Advanced Example - Closures in Loops](#heading-advanced-example-closures-in-loops)

---

## Closures and Enclosing Scopes

### The Documentation Definition

Often, there's some confusion about when a closure appears and when it just shows global. Even senior interviewers sometimes hesitate to call the global scope a closure at first glance.

If you look at the JavaScript documentation maintained by Mozilla, the 2016 docs highlighted something important.

In the definition, it stated:

::: info <VPIcon icon="fas fa-globe"/><code>web.archive.org</code>

> "variables that are used locally, but defined in an enclosing scope"

<SiteInfo
  name="Closures"
  desc="Closures are functions that refer to independent (free) variables (variables that are used locally, but defined in an enclosing scope). In other words, these functions 'remember' the environment in which they were created."
  url="https://web.archive.org/web/20160722004334/https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures/"
  logo="https://web.archive.org/web/20160722004334im_/https://developer.cdn.mozilla.net/static/img/favicon32.e02854fdcf73.png"
  preview="https://web.archive.org/web/20160722004334im_/https://developer.cdn.mozilla.net/static/img/opengraph-logo.dc4e08e2f6af.png"/>

:::

This refers to variables that are used locally inside a function but are actually defined in an outer scope. This is key. Only variables that are actually used inside a function are included in the closure. Variables that exist in an outer scope but aren't used inside the function aren't part of the closure.

In simple terms, a closure is a function that remembers its local scope along with the necessary variables from an outer scope, so even if the function is called from outside, it can still access those variables.

### The Enclosing Scope Concept

Suppose you have a variable `num` defined outside, but you use it locally inside the function. That's why the browser shows it as a closure, just like the documentation says.

```js title="example-3.js"
var num1 = 2;
function sum() {
  var num2 = 3;
  return num1 + num2;
}
console.dir(sum);
```

But if you don't use the outer variable inside the returned function, what happens? If you removed everything else and just returned `num1 + num2`, the `sum` function would work fine. But if you do `console.dir(sum)`, the word "closure" doesn't appear.

Why? Because `num2` is local inside the function, and there's no need to include it in a closure. A closure is only needed to use variables from an outer scope. Since this is the very first-level outer scope (meaning the global scope) and it's not inside any function, the `sum` function is already capturing it in its own scope. So no additional closure is created.

The critical question is: *“when does the browser show a closure, and when doesn't it?”* The explanation comes from the documentation: "variables that are used locally, but defined in an enclosing scope." Your `num1` variable is defined outside but used locally inside. But `num1` doesn't have any enclosing scope. Here, an enclosing scope means a scope that wraps around another scope – inside a set of brackets. But `num1` is directly in the global scope, not inside any enclosing scope.

```js title="example-3.js"
(function(){
  var num1 = 2;
  function sum() {
    var num2 = 3;
    return num1 + num2;
  }

  console.dir(sum);
})();
```

If you want to bring this into an enclosing scope, you need to wrap the whole thing inside a function. You can write an anonymous function like this:

```js
function(){}
```

Then you put everything inside that function and immediately call it. This is known as an **Immediately Invoked Function Expression** (IIFE for short). It’s basically a function that gets defined and executed at the same time.

When you use an IIFE, everything gets moved into an enclosing scope. The `num1` that was previously open in the global scope is now inside this function. So it's now part of an enclosing scope. If you check in the browser and expand it, you see the word "closure."

![Closure with Enclosing Scope Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464214402/43092c54-012f-42be-a7ea-d25c4d15eb90.png)

That's because you've brought the variables into an enclosing scope. The browser now shows it as a closure.

### Interpreting the Closure Definition

If someone ever gets confused or disagrees, they might say, "The outer one isn't a closure, it's just the global scope." But theoretically, you can still consider it a closure. Some might insist, "That's a closure," while others may not agree.

The thing is, JavaScript always keeps the global scope intact to maintain lexical scoping. People who disagree might say, "The global scope is just preserved, that's not a closure." And that's fair. But the concept is really the same. If a variable from an outer scope is used or referenced inside a function, it behaves just like a closure. The idea is consistent.

There's a small difference though: the global scope keeps all variables that exist outside any function. That's why some might argue it's not technically a closure. But from a theoretical perspective, it behaves like one, with only minor differences for global variables.

```js title=Z"example-3.js"
var num1 = 2;
function sum() {
  var num2 = 3;
  return num1 + num2;
}

console.dir(sum);
```

If you didn't use an IIFE and went back to the previous setup, the browser would no longer show it as a closure. And the `var num1` is in the global scope.

![No Closure with Global Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464280818/d25cc856-0178-4d94-9f56-654f4c62637d.png)

If you add another variable:

```js
var num3 = 5;
```

This `num3` isn't used by the `sum` function, but if you look in the global scope, you can still see it. The browser shows `num3` as well.

![Global Scope with num3 Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464328789/6bcffff2-3e8c-4cc7-8da6-9f03910aee92.png)

But a closure only keeps what's necessary. Here, `num3` exists because it's part of the global scope. The global object always holds references to its own variables, which is why `num3` is visible. This often causes confusion: should you call it a closure or not?

The point is, in the 2016 documentation, the term "enclosing scope" was clearly mentioned. In the current documentation, that phrase is missing. This means they've intentionally avoided that confusion.

The modern definition now says, "closure is the combination of a function bundled together with references to its surrounding state" which is written more concisely compared to before. ([<VPIcon icon="fa-brands fa-firefox"/>Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures))

Here, "state" refers to the lexical environment – that could be the child's environment, the parent's environment, or the entire scope. Based on this definition, a function keeps itself along with any variables it needs to remember, all bundled together. Explaining this clearly in words can be tricky. But you'll see more examples ahead, which will make each use case clear.

---

## Practical Example: Self-Contained Closures

```js title="example-3.js"
(function(){
  var num1 = 2;
  var num2 = 3;

  function sum() {
    return num1 + num2;
  }

  console.log(sum());
  console.dir(sum);
})();
```

Let's look at another aspect. You're going back to the IIFE function. Here, you have a function called `sum` that adds `num1` and `num2` and returns the result. Both `num1` and `num2` exist inside the IIFE function. This means you've kept the whole setup self-contained within a closure function.

When you call the `sum` function:

```js title="example-3.js"
(function(){
  var num1 = 2;
  var num2 = 3;

  function sum() {
    return num1 + num2;
  }

  console.log(sum()); // [!code focus]
  console.dir(sum);
})();
console.log(sum());
```

and on the next line write:

```js title="example-3.js"
(function(){
  var num1 = 2;
  var num2 = 3;

  function sum() {
    return num1 + num2;
  }

  console.log(sum());
  console.dir(sum); // [!code focus]
})();
console.log(sum());
```

Check the output. Initially, `2 + 3` gives `5`, which is exactly what you see. Since `num1` and `num2` now exist inside the global scope of the IIFE.

![IIFE Closure Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464361079/cdcff658-023c-4a25-8749-eb618b3cfcc3.png)

```js title="example-3.js"
(function(){
  var num1 = 2;
  var num2 = 3;
  function sum() {
    return num1 + num2;
  }
  console.log(sum());
  console.dir(sum);

  num1 = 6;
  num2 = 7;

  console.log(sum());
  console.dir(sum);
})();
```

You can modify these variables if you want:

```js title="example-3.js"
(function(){
  var num1 = 2;
  var num2 = 3;
  function sum() {
    return num1 + num2;
  }
  console.log(sum());
  console.dir(sum);

  num1 = 6; // [!code focus]
  num2 = 7; // [!code focus]

  console.log(sum());
  console.dir(sum);
})();
```

Then if you call again:

```js title="example-3.js"
(function(){
  var num1 = 2;
  var num2 = 3;
  function sum() {
    return num1 + num2;
  }
  console.log(sum());
  console.dir(sum);

  num1 = 6;
  num2 = 7;

  console.log(sum()); // [!code focus]
  console.dir(sum); // [!code focus]
})();
```

You'll see two different results. The first call returns `5` because initially `2 + 3` was calculated. After changing `num1` and `num2`, the next call returns `13`. So, you can see that a closure keeps hold of the outer variables and makes them accessible inside the function, right?

![IIFE Closure with Updated Values Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464386404/cd2447c8-447e-4fff-b72d-f6ec2d2c8122.png)

Now, at that moment, you checked the function using `console.dir`. First, expand the `dir` at the bottom. Here, you see an entry labeled "closure," and inside it, you notice `num1 = 6` and `num2 = 7`. Great, because before writing `dir`, you had changed the values of `num1` and `num2`, so it's showing the latest values. But if you go back to the previous state and expand the first `console.dir`, surprisingly, it still shows `num1 = 6` and `num2 = 7`. Both are the same – pretty weird, isn't it?

This is because when you did `console.log`, the result showed `2 + 3`. But in the very next line, the values hadn't actually changed yet. In `console.dir`, you see that inside the closure, the values remain 6 and 7.

![Closure with Updated Values Dir Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464426043/f7f87ffb-8bf5-4fbb-ac1c-091bee65570c.gif)

This is exactly what I’ve been emphasizing: **a closure doesn't really hold the values themselves. It holds a reference to the variables.**

### Understanding References

So, what does this mean? It means that there's a pointer stored to the memory location of your variable. Once a reference is stored, the pointer itself stays the same, but the value can change anytime.

When you use `console.dir`, the browser is showing that reference, which is why it always displays the latest value. The browser works very fast, and the reference has already been updated. When you set `num1` and `num2` to 6 and 7 inside the closure, the reference gets updated. You're seeing the exact same variable, but you don't see the intermediate values. But when you do `console.log`, the function uses its corresponding value correctly. That's why not every change in the intermediate scope is clearly visible. Because of reference updates, you always see the latest value, not the direct intermediate state.

![Closure Reference Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464448552/b61bc77c-2563-4fb0-9630-d36a4f304439.png)

So, to reiterate: a closure doesn't store the actual values inside. It stores references to those values.

Keeping this concept in mind is really crucial.

---

## The Difference Between `var` and `let`

```js title="example-3.js"
var num1 = 2;
var num2 = 3;
function sum() {
  return num1 + num2;
}

console.dir(sum);
```

Now, let's look at another aspect of closures. Earlier, you declared two variables in the global scope: `num1` and `num2`. So far, you've been using the `var` keyword. If you don't put anything inside an IIFE and just stay in the global scope, you won't see any closure in the browser.

![No Closure In Global Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464484448/99a70a30-f07f-469d-a592-59f3ed5f193c.png)

But where do `num1` and `num2` live? Well, in the global scope. That's why you write `console.dir(sum)`. In the browser, you can see `num1` and `num2` inside the global object.

Here's the interesting part: what happens if you replace these `var` keywords with `let`?

### Understanding `var` and `let` Scoping

```js title="example-3.js"
let num1 = 2;
let num2 = 3;

function sum() {
  return num1 + num2;
}

console.log(sum());

console.dir(sum);
```

This is where the difference between `var` and `let` comes in. Many people think they're the same, but in JavaScript, `var` and `let` are not equal.

Simply put:

- `var` is the old JavaScript declaration, and it's function-scoped. A variable declared with `var` only lives inside the function it's defined in. If it's defined outside any function, it goes to the global scope.
- `let` is the new ES6 declaration, and it's block-scoped. A variable declared with `let` only exists within the block or scope where it was defined and cannot be accessed from outside.

One important difference is hoisting. Variables declared with `var` are hoisted, meaning JavaScript moves the declaration to the top, but the initialization doesn't happen. So if you use a `var` before it's declared, you'll get `undefined`. With `let`, even though it's hoisted, the [**temporal dead zone**](/freecodecamp.org/javascript-temporal-dead-zone-and-hoisting-explained.md) ensures that using it before declaration throws an error.

### Observing the Difference

Let's see what happens if you declare the variable with `let`. Last time, when it was just in the global scope, you could see the variables when you did `console.dir`. Now, though, you see a new object named `script` has appeared, and `num1` and `num2` are no longer in the global scope.

![Let Scope Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464511845/d627b15b-8d03-48e2-ae11-3e3516cc760e.png)

Why is that? It's because of the difference between `let` and `var` that you talked about earlier. `let` is block-scoped, while `var` is function-scoped. If you treat the outer context as a main function, a variable declared with `var` becomes part of the global scope. But with `let`, it stays within its block scope and doesn't directly become part of the global object. So `let` actually lives inside a separate object called `script` and not in the global scope.

Understanding this is really important, because if you’re following along with this handbook and you’re trying to print variables while using `let` out of habit, the output won't be like it is with `var`. This can definitely be confusing. Simply put, `let` doesn't go into the global object. It exists inside a separate `script` object.

### Using IIFE with `let`

```js title="example-3.js"
(function(){
  let num1 = 2;
  let num2 = 3;

  function sum() {
    return num1 + num2;
  }

  console.dir(sum);
})();
```

But what if you wrap the whole thing in an enclosing function again, like before with an IIFE? When you check the output now, everything goes back inside its closure.

![Closure with Let in IIFE Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464534468/13f0579b-0476-47b4-a4b3-2d894b0e1570.png)

Ultimately, the concept of closures remains the same: what changes is whether the variable goes into `var` or `let` scope.

Now the situation becomes a bit simpler. You have a function, and it's in its end-closing state. According to the definition of a closure, the inner function of this function is using the outer variable `num1`. So, this inner function definitely needs a closure. That closure comes from exactly this function.

JavaScript creates the closure and packages `num1` inside it. The outer global world always exists separately, of course. Also remember, when using `console.dir` in the browser, the output will look different depending on whether you're dealing with `let` or `var`.

---

## Understanding Closures Through a Practical Stopwatch Example

So far, all the examples you've seen were very simple. Now, let's look at a practical example that will help you understand closures better and clear up any confusion.

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();
```

### Defining the Stopwatch Function

Let's define a function:

```js title="example-4.js"
function stopWatch() { // [!code focus]
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
} // [!code focus]

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();
```

You've named it `stopWatch`, and it works just like a real stopwatch. Just like when you start a stopwatch, wait for a while, and then stop it to get the elapsed time, this function will do the same.

First, write:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now(); // [!code focus]

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();
```

This stores the current time in `startTime`. Then, inside the function, define:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() { // [!code focus]
    console.log(Date.now() - startTime);
  }; // [!code focus]
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();
```

Create a `getDelay` function, which will log the elapsed time to the console. For that, write:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime); // [!code focus]
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();
```

Here, the elapsed time is calculated by subtracting `startTime` from the current time. Finally, simply return this `getDelay` function. The `stopWatch` function does just one thing: when you call `stopWatch`, it starts a stopwatch using `Date.now()` and returns a `getDelay` function. When you call that `getDelay` function, it shows the elapsed time from the start time to the current moment.

### Using the Stopwatch

Now, call it. Write:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch(); // [!code focus]

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();
```

Here, you've started the `stopWatch`. This function executes, which means `startTime` is set and the `getDelay` function is defined. Then, `stopWatch` returns that `getDelay` function. The `stopWatch` function itself isn't called directly afterward – you simply called it once, and the outer function returns the `getDelay` function. Store this returned function in `timer`.

At this point, the `stopWatch` is already running because you called it, but you haven't printed anything from `getDelay` yet. Before calling `getDelay`, create a fake delay like this:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) { // [!code focus]
  var a = Math.random() * 1000000;
} // [!code focus]

timer();
```

Use a large for-loop to waste some time. You chose a big number intentionally so it takes a noticeable delay. If you want, you can also perform some expensive operations in the loop, like calculating a random number:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000; // [!code focus]
}

timer();
```

This way, you create a fake delay.

### Calling the Timer Function

Now, we come to `timer`. `Timer` is actually a function because it was returned by calling `stopWatch`. This returned `getDelay` function acts as your actual timer. Let’s call `timer()` and see what happens. The output doesn't appear instantly – it takes a moment, and then it shows up. So you get a delay.

![Stopwatch Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464566077/f4a450a5-796b-4999-97cb-1e697afbbcfa.gif)

The question is: how is this still working? The `stopWatch` function, where you initially called it, has already finished executing. That means everything inside that function should be gone.

So how does `timer()` still know the value of `startTime`? Especially after you added such a long delay before calling it? This means the `timer` function still remembers its parent function – specifically, the `startTime` variable inside `stopWatch`. It holds onto that reference.

How? Because of a closure. When `getDelay` was created, a closure was also created inside it that kept track of the `startTime` variable. So even after the delay, and even after a long time, it can still use that old value. This shows that JavaScript is really smart. It tracks all variables, references, and closures, and when needed, it can use them again. This is why this behavior is possible: because of closures.

### Inspecting the Timer Function

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();
  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();

console.dir(timer);
```

If you do:

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();
  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
  var a = Math.random() * 1000000;
}

timer();

console.dir(timer); // [!code focus]
```

like before and check the output in the browser, you'll notice it takes some time to appear because of the delay. But even after the delay, it still retains `startTime` inside the closure.

![Timer Closure Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464588970/1dcb2502-4989-447f-9c4c-09056c948243.png)

If you try:

```js
console.log(startTime);
```

you won't be able to access `startTime` directly. But since `timer` is a member function, it can use that `startTime` you initialized long ago, before the for-loop. It still remembers `startTime`. No matter how long the delay, it can keep track. Even if there were more lines of code or more expensive operations during the delay, at the end of the day, when you call the timer, the closure ensures that `startTime` is correctly preserved.

This is one of the more fascinating aspects of JavaScript: it can really remember such information, and this is one of the biggest use cases of closures.

### Closures and Garbage Collection

This is one of the most powerful features of closures. Because of closures, no matter how many times you call the `timer()` function, each call works independently and keeps its own reference. Every time, a new reference is created and held as long as it's needed.

Let's consider a small example – but imagine in a large application, there could be countless closures holding references to many variables. Naturally, the question arises: if so many things are being remembered, will performance suffer?

This is where JavaScript's performance optimization comes in. **JavaScript is a smart, garbage-collected language.** That means when JavaScript realizes that a reference or variable is no longer needed, it automatically removes it from memory.

In some situations, programmers can manually optimize. For example, if you created a timer holding a reference to a `getDelay()` function, but you haven't called `getDelay()` yet, JavaScript doesn't know if it will be used in the future, so it keeps the reference.

```js title="example-4.js"
function stopWatch() {
  var startTime = Date.now();

  var getDelay = function() {
    console.log(Date.now() - startTime);
  };
  return getDelay;
}

var timer = stopWatch();

for (let i=0; i<100000000; i++) {
    var a = Math.random() * 1000000;
}

timer();

console.dir(timer);
timer = null;

timer();
```

If you're certain it won't be used anymore, you can manually clear the reference by writing:

```js
timer = null;
```

Now, `timer()` won't work because you set it to null. JavaScript understands that it's no longer needed and garbage collects the reference from memory. If you try this in the browser, you'll see an error: "TypeError: timer is not a function" – because `timer` is now null.

![Timer Null Error Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464662207/267dbda0-31c0-47b3-9df8-a6b18c04b317.png)

Simply put, setting `timer = null` tells JavaScript, "This variable won't be used anymore, forget it." The Garbage Collector then recognizes that there are no references and quietly removes it from memory, preventing memory waste.

The interesting part is that JavaScript doesn't just run the code – it predicts a lot even before compilation. When it sees `timer = null`, it already knows, "Okay, the programmer used this timer only this much, and it won't be needed anymore." So as soon as the code finishes running, it intelligently cleans up the memory.

This makes your program automatically optimized. There are no memory leaks, browser load decreases, and JavaScript executes faster. This is a very small example, but it already shows how elegantly you can manage performance in JavaScript.

---

## Closures in Asynchronous Code

So far, all the examples you've seen were using closures in a synchronous way. Now, many people might wonder, "Okay, but how do closures work in asynchronous situations?"

That's a very good question. In real-world coding, most tasks run asynchronously – like with `setTimeout`, `fetch`, or event listener functions. The key point is, synchronous code executes line by line, but asynchronous code takes some time to complete. That means you call a function, but its result arrives a little later.

So the question is: if the outer scope has already finished by then, how does the inner function still remember the values of the outer variables?

**This is exactly where the true power of closures comes in.** A closure keeps the reference to the outer scope as long as the inner function hasn't executed yet. That means whether the code is synchronous or asynchronous, closures work the same way.

![Asynchronous Closures](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464732632/3d49dab4-4b0e-4f58-9923-fe5dae876915.gif)

### Basic Asynchronous Example with `setTimeout`

```js title="example-5.js"
function asyncExample() {
  var a = 20;

  setTimeout(function () {
    console.log(a);
  }, 3000);
}

asyncExample();
```

Now let’s see a small asynchronous example to understand how closures work and why they are just as reliable in asynchronous scenarios.

Define a function:

```js title="example-5.js"
function asyncExample() { // [!code focus]
  var a = 20;

  setTimeout(function () {
    console.log(a);
  }, 3000);
} // [!code focus]

asyncExample();
```

Inside this function, write:

```js title="example-5.js"
function asyncExample() {
  var a = 20; // [!code focus]

  setTimeout(function () {
    console.log(a);
  }, 3000);
}

asyncExample();
```

You've defined a variable. Next, use JavaScript's built-in `setTimeout` function:

```js title="example-5.js"
function asyncExample() {
  var a = 20;

  setTimeout(function () { // [!code focus]
    console.log(a);
  }, 3000); // [!code focus]
}

asyncExample();
```

`setTimeout` takes two parameters: one is the function to run, and the other is the time in milliseconds, meaning it will call that function after the specified delay.

Now, suppose you put `console.log(a)` inside that function. Surprisingly, even though `a` isn't defined inside the timeout function, it can still access the `a` from `asyncExample`'s outer scope. This is possible because of closures. After 3 seconds, it appears, and you see `20`. This is also possible because of closures. The function inside `setTimeout` doesn't have `a` defined within itself, yet it can access `a` from `asyncExample`'s scope.

![Asynchronous Closure Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464763043/0d51130c-3299-49c1-bab9-6cac74b215ab.png)

### External Function Reference Example

```js title="example-5.js"
function asyncExample() {
  var a = 20;

  function myFunc() {
    console.log(a);
  }

  setTimeout(myFunc, 3000);
  console.dir(myFunc);
}

asyncExample();
```

Now, what if you define the `setTimeout` function outside `asyncExample`, just for demonstration – like this:

```js title="example-5.js"
function asyncExample() {
  var a = 20;

  function myFunc() { // [!code focus]
    console.log(a);
  } // [!code focus]

  setTimeout(myFunc, 3000);
  console.dir(myFunc);
}

asyncExample();
```

Inside `myFunc`, write:

```js title="example-5.js"
function asyncExample() {
  var a = 20;

  function myFunc() {
    console.log(a); // [!code focus]
  }

  setTimeout(myFunc, 3000);
  console.dir(myFunc);
}

asyncExample();
```

Then pass `myFunc` into `setTimeout` and also write:

```js title="example-5.js"
function asyncExample() {
  var a = 20;

  function myFunc() {
    console.log(a);
  }

  setTimeout(myFunc, 3000);
  console.dir(myFunc); // [!code focus]
}

asyncExample();
```

If you check the output of `console.dir`, you'll see that inside `myFunc`, the closure contains the variable `a=20`. This is because `a` was part of `asyncExample`'s scope, so `myFunc` can still access it.

![Asynchronous Closure with External Function Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464809847/359fc698-cc18-4e41-beb7-e3b7148accc1.png)

Just like before, this is possible thanks to closures. But here, there's a subtle difference. Earlier, you talked about a reference example, but this reference works a little differently.

```js title="example-5.js"
var a = 20;

function asyncExample() {
  function myFunc() {
    console.log(a);
  }

  setTimeout(myFunc, 3000);
  console.dir(myFunc);
}

asyncExample();

a = 30;
```

Suppose the variable `a=20` was originally inside `asyncExample`. Now, if you move `a` to the global scope and write:

```js title="example-5.js"
var a = 20; // [!code focus]

function asyncExample() {
  function myFunc() {
    console.log(a);
  }

  setTimeout(myFunc, 3000);
  console.dir(myFunc);
}

asyncExample();

a = 30;
```

In simple terms, you've defined it outside. Now, the closure won't show it, because it's part of the global scope. `a` will just exist in the global scope with a value of `20`. You call the `asyncExample` function, which starts the `setTimeout` timer. Then, on the next line after calling `asyncExample`, you change the value of `a`:

```js title="example-5.js"
var a = 20;

function asyncExample() {
  function myFunc() {
    console.log(a);
  }

  setTimeout(myFunc, 3000);
  console.dir(myFunc);
}

asyncExample();

a = 30; // [!code focus]
```

Now think: if `myFunc` is called as the callback for `setTimeout` and does `console.log(a)`, what value will it show? If you check the output, it will show `30`.

![Global Variable Asynchronous Closure Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464836227/3d4cc9aa-cd26-4026-bc14-2d0b980bc333.png)

What does this mean?

When `asyncExample` is called, the `setTimeout` starts and `myFunc` is ready as the callback. Inside `myFunc`, you have `console.log(a)`. At that moment, `a` was `20` in its parent scope. But since `a` is now global and its value has been changed from outside, when the callback executes, it shows `30`.

This demonstrates that **closures actually hold a reference to the variable.** If the variable is global, any external changes are also tracked. So if you expand the global `a` in the console, you'll see `a = 30`.

I mentioned earlier that closures keep a reference to the value. So when `setTimeout` sends the callback to the main thread after 3 seconds, `myFunc` can still access that reference. Remember, `myFunc` comes back via `setTimeout` from another place – it doesn't run directly on the main thread. This is part of asynchronous JavaScript.

The function is called in the main thread after returning from the Web API, but it still retains the reference to `a`. Since `a` has been changed globally, when `myFunc` prints it, it shows the new value `30`.

This point is very important. Practicing multiple examples will help you better understand how closures track outer variables in asynchronous situations. This is why you need to be careful when using global variables and `var`.

This is also the reason `var` can sometimes cause conflicts, and why the `let` keyword was introduced. For example, if you define `var a` globally and later change `a` somewhere in the program, any asynchronous functions referencing `a` will use the new value. That's why using `var` with `setTimeout` or other asynchronous functions can lead to such issues.

💡An important point is that a closure doesn't keep the entire variable from its parent scope. It only keeps a reference to that variable.

---

## Practical Example: API Requests with Closures

Now, let’s see another practical example of closures. In typical JavaScript applications, you often make AJAX requests to fetch data from an API URL. We’ll see how closures are used in this context. For API requests like this, JavaScript's built-in `fetch` function can be used, though third-party libraries like `axios` or `jQuery AJAX` can also accomplish the same task.

```js title="example-6.js"
function apiFunction(url) {
  fetch(url).then((res) => {
    console.log(res);
  });
}

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

Here, we’ll use `fetch` for a practical example. First, write a function:

```js title="example-6.js"
function apiFunction(url) { // [!code focus]
  fetch(url).then((res) => {
    console.log(res);
  });
} // [!code focus]

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

You've named it `apiFunction` and gave it a parameter called `url`. This function will send a request to that URL. Then you call the built-in `fetch` function

So what does `fetch` do with the URL? Basically, `fetch` returns a promise. You know that to get the output from a promise, you use `then`. So you write:

```js title="example-6.js"
function apiFunction(url) {
  fetch(url).then((res) => { // [!code focus]
    console.log(res);
  }); // [!code focus]
}

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

After the response comes back, you use a callback function. Here, you log the response to the console:

```js title="example-6.js"
function apiFunction(url) {
  fetch(url).then((res) => { 
    console.log(res); // [!code focus]
  });
}

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

This is how your `apiFunction` is set up.

Now call the function. You need to pass a URL for the API call. A popular choice is [<VPIcon icon="fas fa-globe"/>jsonplaceholder](https://jsonplaceholder.typicode.com/), so use its `/todos/1` endpoint:

```js title="example-6.js"
function apiFunction(url) {
  fetch(url).then((res) => { 
    console.log(res);
  });
}

apiFunction("https://jsonplaceholder.typicode.com/todos/1"); // [!code focus]
```

Check the output. Notice that it appears after a short delay-this is asynchronous.

![API Function Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464859727/39dd7757-f04e-49f2-ac8a-46f2472a429e.png)

To make this clearer, write another line below:

```js
console.log("I am here");
```

Now the question is: which prints first? Without a doubt, "I am here" prints first, and then the output from `apiFunction` appears. This clearly demonstrates the flow of asynchronous operations. Since the response comes quickly, it might not have been obvious without this extra line.

![API Function with Log Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464881162/59208d49-83f9-48af-8ab4-c9d1c453356b.png)

What does this mean? The output is coming, right? Here, the connection to closures is that you passed the `url` parameter from outside when calling `apiFunction`. This `url` now exists inside the body of `apiFunction`. `fetch` takes it as a parameter, and then the callback function inside `then` executes much later.

By that time, the call to `apiFunction` has already finished, but the callback still remembers the variables from its scope. That's why even after the result arrives, you can still access `url`. To see this, print it:

```js
console.log(url);
```

Notice that the output is correct. This means that if there were more nested functions inside `then`, like another `then` inside a `then`, all the way down, the innermost function could still access the original `url`. And this is possible only because of closures.

![API Function URL Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464901905/8980f4a3-3eb9-4af1-868f-d3ef6d907e9b.png)

### Refactoring with External Function

```js title="example-6.js"
function apiFunction(url) {
  handleResponse = function (res) {
    console.log(res);
    console.log(url);
  };

  fetch(url).then(handleResponse);
  console.dir(handleResponse);
}

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

To demonstrate, let’s rewrite the callback function inside `apiFunction` a little differently:

```js title="example-6.js"
function apiFunction(url) { // [!code focus]
  handleResponse = function (res) {
    console.log(res);
    console.log(url);
  };

  fetch(url).then(handleResponse);
  console.dir(handleResponse);
} // [!code focus]

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

This function simply does `console.log(url)`. Now pass `handleResponse` into the `then`. Then write:

```js title="example-6.js"
function apiFunction(url) {
  handleResponse = function (res) {
    console.log(res);
    console.log(url);
  };

  fetch(url).then(handleResponse);
  console.dir(handleResponse); // [!code focus]
}

apiFunction("https://jsonplaceholder.typicode.com/todos/1");
```

In the output, you'll see that inside `handleResponse`, the closure contains `url`. This is because it was part of `apiFunction`'s scope, so it can access it.

![API Function with External Handler Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464922631/3a2edbeb-d3e9-470d-bea3-fdf46144165e.png)

---

## Advanced Example - Closures in Loops

Finally, let’s look at another example that often comes up in job interviews. This one is a bit more complex and tricky, and it shows how using closures inside loops can create unpredictable output.

### Synchronous Loop Example

```js title="example-7.js"
for (let i=0; i<3; i++) {
  function a() {
    console.log(i);
  }
  a();
}
```

Let’s write a simple for loop:

```js title="example-7.js"
for (let i=0; i<3; i++) { // [!code focus]
  function a() {
    console.log(i);
  }
  a();
} // [!code focus]
```

This loop will run three times, and inside it we’ll define another function:

```js title="example-7.js"
for (let i=0; i<3; i++) {
  function a() { // [!code focus]
    console.log(i);
  } // [!code focus]
  a();
}
```

Inside this function, you simply do:

```js title="example-7.js"
for (let i=0; i<3; i++) {
  function a() {
    console.log(i); // [!code focus]
  }
  a();
}
```

From this, you see that the function `a` exists within the scope of the `for loop`, but in reality, it's also accessible in the global scope. Then you call the function `a`:

```js title="example-7.js"
for (let i=0; i<3; i++) {
  function a() {
    console.log(i);
  }
  a(); // [!code focus]
}
```

The expected output would be 0, 1, 2. First, the value of `i` prints 0, then 1, then 2 – one after another. Looking at the output, you see 0, 1, 2. This is because you defined `i` using `let`.

![Synchronous Loop Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763464949327/23ded10a-19c2-4aff-9d11-927e179c2c82.png)

```js title="example-7.js"
for (var i=0; i<3; i++) {
  function a() {
      console.log(i);
  }
  a();
}
```

If you remove `let` and use `var` instead, what happens? Even with `var`, the output will be the same in this simple case because `var` works outside the block scope. Writing `for (var i = 0)` or declaring `var i` separately behaves effectively the same.

```js title="example-7.js"
var i; // [!code focus]
for (i=0; i<3; i++) { // [!code focus]
  function a() {
    console.log(i);
  }
  a();
}
```

So in this case, there's no problem. A closure isn't required because you are running the function in the global scope. Your `i` prints 0, then 1, then 2, and everything works correctly.

### Asynchronous Loop Example

```js title="example-7.js"
for (let i=0; i<3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}

console.log("After for loop");
```

Now let's go back and use `let` for `i` again. Suppose you want to call the `a` function from outside the loop. Imagine you wrap the function call in a `setTimeout`, and in the first parameter you pass the body of `a` as a callback, while the second parameter is `1000 * i` milliseconds.

Using this `1000 * i`, you want 0 to print after 1 second, 1 after 2 seconds, and 2 after 3 seconds. When you run this, the output comes exactly as expected: after 1 second, 0 prints; after 2 seconds, 1 prints; and after 3 seconds, 2 prints.

But here's the important point: the `for` loop itself is synchronous, while the functions inside `setTimeout` are asynchronous. That means the functions inside `setTimeout` will execute one by one according to the timer, only after the loop has finished. First after 1 second, then after 2, and then after 3. You can verify this asynchronous behavior. Suppose at the end of the loop you write:

```js title="example-7.js"
for (let i=0; i<3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}

console.log("After for loop"); // [!code focus]
```

Now, if you check the output, "After for loop" prints first, then after 1 second, 0 prints, after 2 seconds, 1 prints, and finally 2 prints. This clearly shows how asynchronous functions execute, right? No confusion there.

![Asynchronous Loop Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465056351/9ca676db-c54a-4dc2-9ac8-0bbf1cf08be4.gif)

### The `var` vs `let` Problem

```js title="example-7.js"
for (var i=0; i<3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}
console.log("After for loop");
```

Now, let's see what happens if you replace `let i` with `var i`. The interesting part is, if you use "var i" instead of "let i", the behavior changes. All three outputs end up being 3. You don't get 0, 1, 2 like before. That's exactly the tricky part of this question.

![`var` Loop Problem Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465090022/87518cc5-4942-4c2e-a728-a11751d9a552.png)

This question often comes up in job interviews because it's a bit advanced, but if you understand closures and the difference between `let` and `var` scopes, it's not complicated at all. You can analyze this by going back to `let`. Remove `var` and write:

```js
let i=0;
```

Now the expected output is 0, 1, 2. `let` is block-scoped, meaning this `i` exists only inside the loop and has no effect outside.

![`let` Loop Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465164777/ba0b0084-95db-4de5-a1e6-67aaa8172c51.gif)

During the first iteration, `i` is 0, and the `setTimeout` function is defined. This function will be called after the loop finishes, so a closure is used to remember the value of `i`. The callback needs a closure to reference i correctly. Since `let` doesn't leak outside the loop, each iteration creates a new `i`. For example, when `i` becomes 1, it's a completely separate `i` from the previous iteration.

```js title="example-7.js"
var i;

for (i=0; i<3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}
console.log(i);
console.log("After for loop");
```

So, when this function runs the second time, it references this new i. But with `var`, the situation is different. `var` is function-scoped, so the same variable exists outside the loop. If you write:

```js title="example-7.js"
var i; // [!code focus]

for (i=0; i<3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}
console.log(i);
console.log("After for loop");
```

and then use the loop:

```js title="example-7.js"
var i;

for (i=0; i<3; i++) { // [!code focus]
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
} // [!code focus]
console.log(i);
console.log("After for loop");
```

there is only one i. Changing i inside the loop modifies the same i – no new i is created. So when the setTimeout callbacks execute, they all reference that same i. From previous examples, you know setTimeout callbacks run after the loop finishes. Now, after the loop ends, what's the value of i? Since you used `var`, i has become 3. Check it with:

```js title="example-7.js"
var i;

for (i=0; i<3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}
console.log(i); // [!code focus]
console.log("After for loop");
```

In the console, you'll see 3 prints first. That means that when the callbacks execute, they all reference the same i, which is already 3. 

![`var` Loop Problem with Log Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465201159/7730557a-5255-4c32-8f46-ca01c11a6899.png)

So every console.log in the callbacks prints i = 3, which explains the output perfectly.

### Using `console.dir` with Loop Closures

```js title="example-7.js"
// var i;

for (let i=0; i<3; i++) {
  function myFunc() {
    console.log(i);
  }

  setTimeout(myFunc, 1000 * i);

  console.dir(myFunc);
}

console.log("After for loop");
```

To understand this even better, you can use "console.dir" like before.

Let's see how. First, you'll stick with the `let` case. So in the for loop you write:

```js title="example-7.js"
let i=0;
```

You comment out the global "var i;" since `let` is block-scoped. Now let's see how the closure works. The closure is created inside the setTimeout callback function, and you want to inspect this callback function.

For that, you define:

```js title="example-7.js"
// var i;

for (let i=0; i<3; i++) {
  function myFunc() { // [!code focus]
    console.log(i);
  } // [!code focus]

  setTimeout(myFunc, 1000 * i);

  console.dir(myFunc);
}

console.log("After for loop");
```

and pass this myFunc inside setTimeout. Then, to inspect it, write:

```js title="example-7.js"
// var i;

for (let i=0; i<3; i++) {
  function myFunc() 
    console.log(i);
  }

  setTimeout(myFunc, 1000 * i);

  console.dir(myFunc);{ // [!code focus]
}

console.log("After for loop");
```

If you run this, the browser shows the same output. That means the dir of myFunc appears three times, but in Chrome's console, it only prints once. Chrome wraps similar objects together, so even though the internal properties are different, it doesn't display them separately. To see each property individually, take the next step.

![`let` Loop with Dir Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465312812/f4ec260c-2b8f-474f-a1ad-59797eda63d4.gif)

Below the dir, write:

```js
console.log("---");
```

This acts as a separator. Now, when the browser prints myFunc's dir, it also prints the separator, making it clear that each instance is separate.

At the same time, outside the for loop, add:

```js
console.log("After for loop");
```

Now, if you check the output, the browser prints 'After for loop' first, then 0, 1, 2. When you defined it, the console logs show myFunc and the dashes.

![`let` Loop with Dir and Separator Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465334580/a92fd163-4095-4b6a-bdb5-f239350a7416.png)

Notice, when i is 0, the closure holds i = 0. When i = 1, the closure holds i = 1. When i = 2, the closure holds i = 2. So, all three values exist as references until the end, which is why you get three separate outputs.

![`let` Loop Closure Values Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465373352/5e8903fa-76c4-4031-9a09-d45e9cd29e5f.gif)

### The `var` Loop Problem

```js title="example-7.js"
for (var i=0; i<3; i++) {
  function myFunc() {
    console.log(i);
  }

  setTimeout(myFunc, 1000 * i);

  console.dir(myFunc);

  console.log("---");
}

console.log("After for loop");

console.log(i);
```

But what happens if you replace `"let i"` with `"var i"`? After printing `'After for loop'`, all three outputs show 3. How? When i is 0, there's no closure because var moves this variable to the global scope. Unlike the previous example, no closure is needed here. Var exists in the global scope, and i changes within that same global variable.

![`var` Loop with Dir Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465417027/24635534-867e-4b9d-a4cf-637abbd4610c.png)

So, if you expand the first myFunc in the console and look for i in the global scope, you'll see i = 3. Why? Because the for loop finishes first, and at the end, i becomes 3. At the moment of `'After for loop'`, i is 3. If you do `console.log(i)` there, the browser prints 3. This means, when the reference values are called, they still use the reference to that i. Even if i changes later in the program, since the calls happen afterward, the reference values get the updated i.

That's why the first call shows 3, the second call shows 3, and the third call also shows 3. If you expand them all, you'll see i = 3 everywhere. This happens because no closure is used here; it's referencing the original i in the global scope, which keeps updating.

![`var` Loop Closure Values Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465457673/56530a97-5bd4-4f67-9311-77655b9638cb.gif)

The difference in scope between `let` and `var` is why the output changes completely.

### Fixing the `var` Loop Problem with IIFE

To fix this var issue, you can create an IIFE inside the for loop. This IIFE will take one parameter: in this case, the value of your loop variable "i."

```js title="example-7.js"
for (var i=0; i<3; i++) {
  (function(i) {
    function myFunc() {
      console.log(i);
    }

    setTimeout(myFunc, 1000 * i);

    console.dir(myFunc);

    console.log("---");
  })(i);
}

console.log("After for loop");
```

You write the code. Inside the IIFE, you're passing a parameter named "i." Of course, you can name it anything you want – you already know that. But for now, just keep it as "i". Then, when you call the IIFE, pass the loop's "i" value into it. Nice, right?

Let's see what the output looks like. This time, you get 0, 1, and 2 correctly. So, why is it fixed now? Because "i" is now inside its own scope within the IIFE. Whenever you pass "i" to myFunc, a separate copy of that "i" is created as a parameter inside myFunc, and that copy is what gets used inside the function.

![IIFE Loop with Dir Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465482476/0939504b-40c4-4b9c-b698-a55f266f24c4.gif)

Everything's clear now, right? If you expand the dirs at the end, you'll see: the last one has "i = 2" in its closure, the second one has "i = 1," and the first one has "i = 0." Perfectly clear, isn't it?

![IIFE Loop Closure Values Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1763465516842/0c708a0d-f0c6-44de-828e-61827375ecc1.gif)

---

## Summary and Key Takeaways

If you have a solid grasp of the overall concepts discussed here, and if you practice all these examples repeatedly, your understanding of closures will become much stronger.

Of course, there are more complex examples of closures, but the basics we've covered today are the most important. Once you understand them step by step, you'll be able to create many use cases yourself and debugging will no longer be difficult. Because now, with just a glance at `console.dir()` or by playing with the code a bit, you can see how closures actually work.

Not having a good understanding of closures can make you get stuck in many parts of JavaScript, especially when working with asynchronous code.

### To summarize

If you're asked in a job interview, "What is a Closure?" you can answer simply:

> A closure is a mechanism where a function remembers variables outside its own scope and can access them whenever needed.

In other words, values that aren't inside the function itself, but the function takes a reference from its parent or outer scope. This is what we call a Closure.

### Closure = Function + Remembered Values

This is why closures are so important in job interviews. They show how deeply a programmer understands JavaScript. A programmer who understands closures can clearly grasp JavaScript's internal behavior, memory handling, and asynchronous flow.

### The Importance of Closures

JavaScript was originally created just for small interactive tasks in the browser, but now you can build large-scale applications, even backend systems, with it. The reason behind this is powerful concepts in JavaScript like Closures, Prototypes, and more.

Many people say, "I know var, let, const, so tell me about closures." But as you've seen, var, let, and const aren't that simple either. This is where the understanding of closures begins.

---

## Final Words

We covered a lot in this handbook! If reading this all at once feels overwhelming, you can break it into parts and read it step by step. I’ve tried to explain the whole topic very simply, piece by piece. If there are any areas that could be clearer, I appreciate your feedback. But once you’ve really understood and digested this info, you shouldn’t be intimidated by the word "Closure" ever again.

::: info

You can find all the source code from this tutorial in this [GitHub repository (<VPIcon icon="iconfont icon-github"/>`logicbaselabs/understanding-closure`)](https://github.com/logicbaselabs/understanding-closure/). If it helped you in any way, consider giving it a star to show your support!

If you found the information here valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [watch (<VPIcon icon="fa-brands fa-youtube"/>`@logicBaseLabs`)](https://youtube.com/@logicBaseLabs) my coding tutorials, or simply [connect with me (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/) on LinkedIn. You can also checkout my official website [<VPIcon icon="fas fa-globe"/>sumitsaha.me](https://sumitsaha.me) for more details about me.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Closures Work in JavaScript: A Handbook for Developers",
  "desc": "If you're learning JavaScript, you've probably heard the term ”closure” at some point. In many developers' experience, just hearing this word can trigger anxiety. In nearly 17 years of programming experience, I've noticed that closures are one of the...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-closures-work-in-javascript-a-handbook-for-developers/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
