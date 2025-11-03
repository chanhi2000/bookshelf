---
lang: en-US
title: "How Do Global Execution Context and Temporal Dead Zone Work in JavaScript?"
description: "Article(s) > How Do Global Execution Context and Temporal Dead Zone Work in JavaScript?"
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
      content: "Article(s) > How Do Global Execution Context and Temporal Dead Zone Work in JavaScript?"
    - property: og:description
      content: "How Do Global Execution Context and Temporal Dead Zone Work in JavaScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/global-execution-context-and-temporal-dead-zone-explained.html
prev: /programming/js/articles/README.md
date: 2025-11-05
isOriginal: false
author:
  - name: Shejan Mahamud
    url : https://freecodecamp.org/news/author/Shejan-Mahamud/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762347165225/c7bd75a9-a819-41b6-8a35-4feecfb7cf58.png
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
  name="How Do Global Execution Context and Temporal Dead Zone Work in JavaScript?"
  desc="Have you ever wondered how JavaScript runs your code behind the scenes, and how the Global Execution Context actually works? How does hoisting work for var, let, and const?"
  url="https://freecodecamp.org/news/global-execution-context-and-temporal-dead-zone-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762347165225/c7bd75a9-a819-41b6-8a35-4feecfb7cf58.png"/>

Have you ever wondered how JavaScript runs your code behind the scenes, and how the Global Execution Context actually works? How does hoisting work for `var`, `let`, and `const`?

Consider the code bellow:

```js
console.log('My age is', age)
console.log('My name is', name)
console.log('My country is', country)

var age = 24
let name = 'Shejan'
const country = 'Bangladesh'
sayHi()
function sayHi() {
  console.log('Hi!')
}
```

What do you think the output of this code will be?

The first line will probably print `undefined`, right? But what about the second line with `name`? This will throw a “`ReferenceError`: Cannot access `name` before initialization.” Why? Because `let` variables are hoisted but remain uninitialized in the temporal dead zone (TDZ) until their declaration line is reached.

The third line with `country` will never execute because the code stops at line 2 due to the `ReferenceError`. But if line 2 wasn’t there, line 3 would throw the same error for the same reason – `const` also stays in the TDZ.

And what about the `sayHi()` function call? If we could reach it, it would work perfectly and print "Hi!" because function declarations are fully hoisted with their complete body.

The main question: why and how is all this happening? Let's dive in and find answers to these questions.

---

## How Does the Global Execution Context Work?

When we run any JavaScript code, the very first thing that happens is the creation of a **Global Execution Context (GEC)**. This is the fundamental concept behind JavaScript execution! This global execution context has two important phases:

1. **Memory creation phase** (memory phase)
2. **Code execution phase** (thread phase)

Let's look at what happens in each phase, one by one.

---

## Memory Creation Phase

This is the preparation time. During this phase, the JavaScript engine scans through the entire code once (without executing it) and allocates memory for all variables and functions.

But here's where it gets interesting:

- **Variables** (var, let, const) are given space in memory.
  - `var` is assigned the value `undefined`.
  - `let` and `const` are placed in memory but remain uninitialized.
  - Functions (function declarations) are stored in memory with their complete code body.

So what happens in the memory phase for our example code?

```plaintext title="output"
age: undefined
name: <uninitialized>
country: <uninitialized>
sayHi: function() { console.log("Hi!"); }
```

As you can see, even before a single line of code is executed, everything is already in memory! This entire process of lifting variables and functions into memory during the memory creation phase is called **Hoisting** – and this is what makes JavaScript execution seem "magical."

### Code Execution Phase

Now the real action begins! The JavaScript engine starts executing the code line by line.

**Line 1:** `console.log("My age is", age);`

- Looks for `age` in memory
- Finds `undefined`
- **Output:** `My age is undefined`

Line 2: `console.log("My name is", name);`

- Looks for name in memory Finds that it exists in memory but hasn't been initialized yet (it's in the temporal dead zone, or TDZ – we'll explore this concept in detail later).
- Output: `ReferenceError`: Cannot access `name` before initialization.

The code execution stops right here! The remaining lines won't be executed.

But what would happen if Lines 2 and 3 weren't there?

**Line 4:** `var age = 24;`

- The value of `age` in memory gets updated from `undefined` to `24`

**Line 5:** `let name = "Shejan";`

- `name` is now initialized with the value `"Shejan"`
- From this point forward, `name` can be accessed

**Line 6:** `const country = "Bangladesh";`

- `country` is initialized with the value `"Bangladesh"`

**Lines 7-9:** Function call

- The `sayHi()` function was already loaded with its complete body during the memory phase.
- When `sayHi()` is called, the JavaScript engine creates a new execution context specifically for this function.
- This new context is known as a **Function Execution Context (FEC)** – it works as a child of the global execution context.

This function execution context also has **two phases**, just like the global execution context:

#### 1. Memory Creation Phase

- All variables, parameters, and nested functions inside the function are allocated in memory.
- Function arguments are assigned.
- A function scope is created and a reference link is established with the outer lexical environment (where the function was defined) – this link is called the **scope chain**. The scope chain is JavaScript's way of resolving variable names. It's like a chain of connected scopes. When JavaScript looks for a variable inside a function, it first checks the function's own scope. If it doesn't find the variable there, it moves up the chain to check the parent scope (where the function was defined), then the grandparent scope, and so on, until it reaches the global scope. This chain ensures that functions can access variables from their outer environments.

#### 2. Code Execution (Thread) Phase:

- Now the function body is executed line by line.
- `console.log("Hi!");` executes and prints **"Hi!"**

Once the function execution is complete:

- That function execution context is popped off the call stack.
- And control returns to the global execution context.

::: note

When all code execution is complete, the global execution context is also popped off the call stack.

:::

![Flowchart diagram illustrating JavaScript Global Execution Context workflow, showing the two phases - Memory Creation Phase where variables and functions are allocated, and Code Execution Phase where code runs line by line, including how Function Execution Context is created when functions are called](https://cdn.hashnode.com/res/hashnode/image/upload/v1761988425883/33792916-eee7-4f87-b365-51a04290aa96.png)

The flowchart diagram above illustrates the JavaScript global execution context workflow, showing the two phases. In the memory creation phase, variables and functions are allocated, and in the code execution phase, the code runs line by line. It also shows how the function execution context is created when functions are called.

---

## Understanding the Flowchart

The diagram above visualizes the complete journey of JavaScript code execution from start to finish.

### The flow begins

When JavaScript execution starts and immediately creates a global execution context (GEC). This context then splits into two distinct phases, shown as a diamond in the diagram.

### On the left side - Memory Creation Phase

You can see three parallel branches showing how different types of declarations are handled:

- `var` variables are allocated with the value `undefined`
- `let` and `const` variables are allocated but remain uninitialized (in the temporal dead zone)
- Function declarations are fully hoisted with their complete body

### On the right side - Code Execution Phase

JavaScript now executes the code line by line. During execution:

- It accesses variable values from memory
- If you try to access `let` or `const` before initialization, you get a ReferenceError (temporal dead zone)
- If you access `var` before assignment, you get `undefined`
- When a function is called, a new Function Execution Context (FEC) is created

### The Function Execution Context (FEC)

(shown in the right branch) works as a child of the GEC and has its own Memory and Execution phases. After the function executes completely, the FEC is popped off the call stack and control returns to the GEC.

**Finally**, when all code execution is complete, the GEC itself is popped from the call stack, and the program ends.

This visual representation helps you understand that JavaScript doesn't just read and run your code - it prepares everything first (Memory Phase) and then executes it systematically (Execution Phase).

---

## What Exactly is Hoisting?

Hoisting is JavaScript's default behavior of moving variable and function declarations to memory before code execution begins.

Think of it this way – it appears as if all declarations automatically move to the very top of the code. Although the code doesn't physically move, the memory allocation happens first.

---

## Does Only `var` Get Hoisted?

This surprises many people, but the answer is no. It's not just `var` that gets hoisted! This is a huge misconception among many developers.

The truth is that—`let`, `const`, and functions—everything gets hoisted! But their behavior is completely different. Let's dive into the details.

### What Happens with `var`?

```js
console.log(name) // undefined
var name = 'Rahim'
console.log(name) // "Rahim"
```

Variables declared with `var`:

- Get hoisted
- Are initialized with `undefined`
- Exist in global scope or function scope
- Can be accessed before declaration (doesn't throw an error)

### What Happens with `let`?

```js
console.log(name) // ReferenceError: Cannot access 'name' before initialization
let name = 'Rahim'
console.log(name) // "Rahim"
```

Is this magic? No! Actually, `let` does get hoisted, but it's stuck in a special state called the temporal dead zone!

Space is allocated in memory, but it's not initialized. So if you try to access it before declaration, JavaScript says – "Hey, the variable exists, but you can't use it yet!"

### What Happens with `const`?

```js
console.log(age) // ReferenceError: Cannot access 'age' before initialization
const age = 24
console.log(age) // 24
```

The behavior of `const` is exactly the same as `let`:

- Gets hoisted
- Stays in the TDZ until declaration
- Exists in block scope
- Plus, once assigned, it cannot be reassigned

---

## Temporal Dead Zone (TDZ) – What is it Really?

The Temporal Dead Zone is the time period or zone when a variable exists in memory (due to hoisting) but hasn't been initialized yet. During this time, the variable is essentially "dead" – meaning that you cannot access it.

```js
// ← TDZ starts for x and y
console.log(x) // ReferenceError - still in TDZ
console.log(y) // ReferenceError - still in TDZ

// TDZ continues...
let x = 10 // ← x's TDZ ends at this line
const y = 20 // ← y's TDZ ends at this line

console.log(x) // 10 - can access now
console.log(y) // 20 - can access now
```

The entire concept of TDZ is to force us to write better code. Using variables before declaring them is a bad practice, and TDZ prevents us from doing that.

---

## Function Hoisting – The Most Interesting Part!

Hoisting with functions is even more interesting and powerful:

```js
greet() // "Hello World!" - Perfect! It works!

function greet() {
  console.log('Hello World!')
}
```

How is this possible? Because function declarations are completely hoisted! This means not just the name, but the entire function body is lifted into memory. That's why it can be called even before the declaration.

But wait! Not all functions work this way.

### With Function Expressions

```js
greet() // TypeError: greet is not a function

var greet = function () {
  console.log('Hello World!')
}
```

What happened here? `greet` was hoisted as a variable and received the value `undefined`. It wasn't hoisted as a function! So when you try to call it, you get an error. In other words, it's hoisted as a variable (assigned `undefined`), but the function body isn't loaded into memory.

### With Arrow Functions

```js
sayHello() // ReferenceError (if let/const is used)

const sayHello = () => {
  console.log('Hello!')
}
```

Arrow functions behave just like function expressions. They follow variable rules.

Let's clear everything up with a complete example:

```js
console.log(a) // undefined (var hoisting)
console.log(b) // ReferenceError (TDZ)
console.log(c) // ReferenceError (TDZ)
multiply(2, 3) // 6 (function hoisting)
add(2, 3) // TypeError (function expression)

var a = 10
let b = 20
const c = 30

function multiply(x, y) {
  return x * y
}

var add = function (x, y) {
  return x + y
}
```

::: info What Happens in the Memory Phase

```plaintext title="output"
a: undefined
b: <uninitialized>
c: <uninitialized>
multiply: function(x, y) { return x * y; }
add: undefined
```

This snapshot represents the state of memory before any code is executed. Here's what each line means:

`a: undefined` - Since `a` is declared with `var`, it gets hoisted and immediately assigned the value `undefined`. This is why you get `undefined` instead of an error when you try to access `a` before its declaration line.

`b: <uninitialized>` - The variable `b` is declared with `let`, so it's hoisted and memory is allocated for it, but it remains uninitialized. It's in the Temporal Dead Zone (TDZ). Attempting to access it before the declaration line will throw a `ReferenceError`.

`c: <uninitialized>` - Similarly, `c` is declared with `const` and follows the same behavior as `let`. It's hoisted but stays uninitialized in the TDZ until the declaration line is reached.

`multiply: function(x, y) { return x * y; }` - This is a function declaration, so it's fully hoisted with its complete body. The entire function is stored in memory and ready to be called even before the JavaScript engine reaches its declaration in the code. This is why `multiply(2, 3)` works perfectly and returns `6`.

`add: undefined` - Here's the crucial difference! Even though `add` will eventually store a function, it's declared using `var add = function() {...}` (a function expression). During the memory phase, only the variable `add` is hoisted and initialized with `undefined`. The actual function body isn't assigned until the execution phase reaches line 11. This is why calling `add(2, 3)` before the assignment throws a `TypeError: add is not a function` - you're essentially trying to execute `undefined()`.

:::

---

## Conclusion

Understanding JavaScript's execution mechanism is fundamental to becoming a proficient developer. Let's recap the essential concepts we've explored:

**The Global Execution Context (GEC)** is the foundation of JavaScript execution. Every time you run JavaScript code, the GEC is created first. It works in two critical phases:

- **Memory Creation Phase**: JavaScript prepares by scanning the code and allocating memory for variables and functions.
- **Code Execution Phase**: JavaScript runs your code line by line.

**Hoisting is universal** - not just limited to `var`. Here's how different declarations are hoisted:

- `var` variables are hoisted and initialized with `undefined`.
- `let` and `const` are hoisted but remain uninitialized in the TDZ.
- Function declarations are fully hoisted with their entire body.
- Function expressions and arrow functions follow variable hoisting rules

**The Temporal Dead Zone (TDZ)** is JavaScript's built-in safety mechanism. It exists from the start of the scope until the variable declaration line is reached. The TDZ prevents us from accessing `let` and `const` variables before they're declared, encouraging better coding practices and helping us avoid bugs.

**Function hoisting behavior varies**:

- Function declarations can be called before they appear in code.
- Function expressions behave like variables and cannot be called before assignment.
- Arrow functions follow the same rules as function expressions.

**Why does this matter?** Understanding these concepts helps you:

- Predict how your code will behave before running it.
- Avoid common errors like `ReferenceError` and `TypeError`.
- Write cleaner, more maintainable code.
- Debug issues faster when they arise.
- Make informed decisions about when to use `var`, `let`, or `const`.

**The key takeaway**: **JavaScript doesn't just execute your code - it prepares first, then executes.** The memory phase sets up the stage, and the execution phase performs the show. Master this two-phase process, and you'll have a solid understanding of how JavaScript works under the hood.

Now you're equipped with the knowledge to write better JavaScript code and understand exactly what's happening behind the scenes. Keep practicing these concepts, and they'll become second nature!

Happy Coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Do Global Execution Context and Temporal Dead Zone Work in JavaScript?",
  "desc": "Have you ever wondered how JavaScript runs your code behind the scenes, and how the Global Execution Context actually works? How does hoisting work for var, let, and const?",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/global-execution-context-and-temporal-dead-zone-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
