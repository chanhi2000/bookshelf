---
lang: en-US
title: "Constructor Functions: Object Blueprints—Let's Get Practical"
description: "Article(s) > (5/12) How to Use Classes in JavaScript - A Handbook for Beginners"
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
      content: "Article(s) > (5/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Constructor Functions: Object Blueprints—Let's Get Practical"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/constructor-functions-object-blueprintslets-get-practical.html
date: 2025-02-18
isOriginal: false
author:
  - name: Spruce Emmanuel
    url : https://freecodecamp.org/news/author/Spruce/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Use Classes in JavaScript - A Handbook for Beginners",
  "desc": "Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was...",
  "link": "/freecodecamp.org/how-to-use-classes-in-javascript-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Classes in JavaScript - A Handbook for Beginners"
  desc="Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was..."
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-constructor-functions-object-blueprintslets-get-practical"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

Okay, prototypes are pretty cool for code reuse and making specialized objects. We saw how `Object.create()` lets us create objects that inherit from others. But imagine that we wanted to make tons of `Person` objects, like, hundreds of them for a website. Typing out `Object.create(person)` for every single one would get super repetitive, especially if we always want every `Person` to start with the same basic properties, like a `firstName` and `lastName`.

We need a more efficient way to make lots of objects that follow the same pattern. What we really need is something like a blueprint—something we can use over and over again to stamp out new objects, all looking and working in a similar way. And guess what? That’s exactly what constructor functions are for.

Think of constructor functions as JavaScript's way of creating blueprints for objects. They're like object factories. And in JavaScript, we use constructor functions, which are specialized functions used in a particular way, to create these blueprints. Yep, functions again. But we use them in a special way.

---

## So what is a constructor function, exactly?

Well, like I said, it's a function that creates objects. Take a look at this example:

```js
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}
```

That looks like a regular function. You're absolutely right. It looks just like any other function you've probably written in JavaScript. In fact, let's prove it. If we just log `PersonConstructor` itself, we’ll see:

```js
console.log(PersonConstructor);
```

```js
// output
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}
```

See? Just a regular function. So, what makes it a constructor function?

---

## The Magic Ingredient: The `new` Keyword

What turns an ordinary function into a constructor**—**something that builds objects—is the `new` keyword. It's like saying to JavaScript, "Hey, treat this function as a blueprint, and use it to create a new object for me."

Let's see it in action:

```js
const person1 = new PersonConstructor("Alice", 25);

console.log(person1);
//
// PersonConstructor { name: 'Alice', age: 25, greet: [Function] }
```

In the output now, instead of just seeing the function code, we're seeing a `PersonConstructor` object. The `new` keyword didn't just call the function, it actually created a brand new object based on the `PersonConstructor` blueprint.

Now, we can use this blueprint, `PersonConstructor`, to create as many `Person` objects as we want, all with the same basic structure:

```js
const person1 = new PersonConstructor("Alice", 25);
const person2 = new PersonConstructor("Bob", 30);
const person3 = new PersonConstructor("Charlie", 28);

console.log(person1);
console.log(person2);
console.log(person3);
//
// PersonConstructor { name: 'Alice', age: 25, greet: [Function] }
// PersonConstructor { name: 'Bob', age: 30, greet: [Function] }
// PersonConstructor { name: 'Charlie', age: 28, greet: [Function] }
```

Cool, right? We have three distinct `Person` objects, all created from the same `PersonConstructor` blueprint.

---

## Hold Up... What's This `this` Keyword I Keep Seeing?

You've probably noticed the word `this` popping up a lot in these code examples, like in `this.name`, `this.age`, and `this.greet()`. And you might be thinking, "What in the JavaScript world is `this`?"

Don't worry, `this` can be a bit confusing at first, but it's actually pretty simple once you get the hang of it. Let's break it down with a simple analogy.

Imagine you're describing yourself. You might say, "My name is \[Your Name\]." In this sentence, "my" refers to you, the person speaking.

In JavaScript objects, `this` is like "my" or "me." It's a way for an object to refer to itself.

Let's see this with a regular object example first:

```js
const PersonObject = {
  name: "Spruce",
  greet: function () {
    console.log("Hello, my name is " + PersonObject.name); //  Using PersonObject.name directly
  },
};

PersonObject.greet(); // Output: Hello, my name is Spruce
```

In this `PersonObject`, inside the `greet` function, we used `PersonObject.name` to access the `name` property. This works perfectly fine. We're directly telling JavaScript to get the `name` property from the `PersonObject`. We could use `this` here too, but let's see why `this` becomes super helpful, especially in constructor functions.

Now, consider this slightly different version using `this`:

```js
const PersonObjectThis = {
  name: "Spruce",
  greet: function () {
    console.log("Hello, my name is " + this.name); // Using 'this.name'
  },
};

PersonObjectThis.greet(); // Output: Hello, my name is Spruce
```

See? It still works the same way. When `greet` is called on `PersonObjectThis`, inside the `greet` function, it automatically refers to `PersonObjectThis`. So `this.name` is just a more dynamic way of saying "the `name` property of this current object."

---

## Why use `this` instead of directly naming the object?

Because `this` is dynamic and context-aware. It always points to the object that is currently calling the method. This becomes essential in constructor functions because constructor functions are designed to create many different objects.

---

## Back to constructor functions: What does `this` mean there?

Let's revisit our `PersonConstructor`:

```js
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
  };
}

const person1 = new PersonConstructor("Alice", 25);
const person2 = new PersonConstructor("Bob", 30);
```

When we do `const person1 = new PersonConstructor("Alice", 25);` inside the `PersonConstructor` function:

- `this` becomes `person1`. It's as if JavaScript is doing:
  - `person1.name = "Alice";`
  - `person1.age = 25;`
  - `person1.greet = function() { ... };`

And when we do `const person2 = new PersonConstructor("Bob", 30);` inside `PersonConstructor` again:

- `this` becomes `person2`. Like JavaScript doing:
  - `person2.name = "Bob";`
  - `person2.age = 30;`
  - `person2.greet = function() { ... };`

So, `this` in a constructor function is like a placeholder that gets filled in with the specific object being created when you use `new`. It's what lets us create many different objects from the same blueprint.
