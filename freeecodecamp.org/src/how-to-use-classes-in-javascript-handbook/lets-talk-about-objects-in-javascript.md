---
lang: en-US
title: "Let's talk about objects in JavaScript."
description: "Article(s) > (4/12) How to Use Classes in JavaScript - A Handbook for Beginners"
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
      content: "Article(s) > (4/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Let's talk about objects in JavaScript."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/lets-talk-about-objects-in-javascript.html
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
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-lets-talk-about-objects-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

If you're already familiar with how objects work, that's fantastic. It'll make understanding everything we cover in this article even smoother. To make sure we're all on the same page, let's start with a super basic object:

```js
const Person = {};
```

So, is `Person` an empty object? At first glance, it certainly looks empty. If you thought "yes," you're not alone. It's a common initial thought. But in JavaScript, objects are a little more interesting than just what we explicitly put into them. Let's explore how objects really work under the hood.

---

## Okay, so how do objects work in JavaScript?

Let's break it down. At its core, an object is a collection of properties. Think of properties as named containers for values. Each property has a name (also called a 'key').

```js
const Person = {
  firstName: "John",
  lastName: "Doe",
};
```

`firstName` and `lastName` are the property names (keys), and `"John"` and `"Doe"` are their respective values. A property in an object is always a key-value pair. The value part can be many things.

The value associated with a property can be a primitive data type. In JavaScript, primitives are things like strings, numbers, booleans (`true` or `false`), `null`, `undefined`, and symbols. Let's see some examples:

```js
const exampleObject = {
  name: "Example", // String
  age: 30, // Number
  isStudent: false, // Boolean
  favoriteColor: null, // null
};
```

But the cool thing is, property values can also be more complex data types or even other objects, functions, and arrays. Let's look at that:

```js
const anotherObject = {
  address: {
    // Value is another object
    street: "123 Main St",
    city: "Anytown",
  },
  hobbies: ["reading", "hiking"], // Value is an array
  greet: function () {
    // Value is a function (a method!)
    console.log("Hello!");
  },
};
```

When a function is a property of an object, we call it a method. It's essentially a function that belongs to the object and usually operates on the object's data.

```js
const calculator = {
  value: 0,
  add: function(number) {
    this.value += number; // 'this' refers to the calculator object
  },
  getValue: function() {
    return this.value;
  }
};

calculator.add(5);
console.log(calculator.getValue()); // Output: 5
```

Now, here’s where things get really interesting. Objects in JavaScript don't just have the properties we explicitly define. They can also reference properties from other objects. This is a core concept called prototypal inheritance (sometimes just called prototypal delegation).

Remember our seemingly empty `Person = {}` object? We said it looked empty, right? Well, it's time for a bit of JavaScript magic. Even though we didn't put any properties in it ourselves, it's not completely empty. Every object in JavaScript, by default, has a hidden link (often referred to internally as its `[[Prototype]]` property) to another object called its prototype.

For objects created using the simple `{}` syntax (like our `person` object), their default prototype is the built-in `Object.prototype`. Think of `Object.prototype` as a kind of parent object that provides some basic, built-in functionality to all objects.

This is why you can do things like this, even with our "empty" `Person` object:

```js
console.log(Person.toString()); 
//
// [object Object]
```

Wait a minute. We never defined a `toString()` method in our `Person` object. So where is it coming from? It's coming from its prototype, `Object.prototype`. `toString()` is a method that's built into `Object.prototype`, and because `Person's` prototype is `Object.prototype`, `Person` can access and use the `toString()` method.

So, a good way to think about it is: "The prototype of an object is another object from which it can look up and use properties and methods if it doesn't have them itself."

Why is understanding prototypes so important? Because it unlocks the power of code reuse and creating specialized objects based on more general ones. This is where things get really powerful, especially as your JavaScript projects grow.

Imagine that we want to create a more specific type of `Person`—say, a `Developer`. A `Developer` is still a `Person`, but they might have some additional properties or behaviors specific to developers. Basically, we want a `Developer` object to be a `Person`, but also have its own unique stuff.

This is where we can explicitly set up prototypes. Instead of relying on the default `Object.prototype`, we can tell JavaScript: "Hey, I want the prototype of my `Developer` object to be the `Person` object we already defined." We can do this using `Object.create()`:

```js
const Person = {
  firstName: "John",
  lastName: "Doe",
  sayHello: function () {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);
  },
};

const developer = Object.create(Person); // developer's prototype is now 'Person'
developer.firstName = "Spruce"; // Add a *specific* firstName for developer
developer.programmingLanguage = "JavaScript"; // Developer's own property

developer.sayHello(); 
//
// Hello, my name is Spruce Person (still accesses sayHello from 'person' prototype!)
console.log(developer.programmingLanguage); 
//
// JavaScript (developer's own property)
console.log(developer.lastName); 
//
// Doe (inherited from 'Person' prototype!)
```

Let's break down what's happening when we access properties on `Developer`:"

```js
console.log(developer.firstName); 
// 
// Spruce (developer's *own* property)
console.log(developer.programmingLanguage); 
//
// JavaScript (developer's *own* property)
console.log(developer.lastName); 
//
// Doe (found on the *prototype* 'Person')
console.log(developer.sayHello()); 
//
// Hello, my name is Spruce Person (method from *prototype*)
console.log(developer.job); 
//
// undefined (not on 'Developer' OR 'Person' prototype)
```

When you try to access a property like `Developer.lastName`, JavaScript does the following:

1. First, it checks: Does `Developer` have a property named `lastName` directly on itself? In our example, `Developer` only has `firstName` and `programmingLanguage` as its own properties. `lastName` is not there.
2. If it doesn't find it on the object itself, JavaScript then looks at the object's prototype (which we set to `Person using` `Object.create()`).
3. It checks: 'Does the `Person` object (the prototype) have a property named `lastName`?' Yes, `Person` does have `lastName: "Doe"`. So, JavaScript uses this value.
4. If the property isn’t found on the prototype either, JavaScript would then look at the `Person`'s prototype (which is `Object.prototype` by default), and so on, up the prototype chain. If it goes all the way up the chain and still doesn't find the property, it finally returns `undefined` (like when we tried to access `developer.job`).

Own properties are simply the properties that are defined directly on the object itself when you create it (like `firstName` and `programmingLanguage` on `Developer`). Prototype properties are accessed through the prototype chain.

You can even create longer prototype chains. For example, let's say we want to create a `JavaScriptDeveloper` object, which is a type of `Developer`. We can make `Developer` the prototype of `JavaScriptDeveloper`:

```js
const JavaScriptDeveloper = Object.create(Developer); // javaScriptDeveloper's prototype is 'Developer'

JavaScriptDeveloper.framework = "React"; // JavaScriptDeveloper's own property

console.log(JavaScriptDeveloper.firstName); 
//
// Spruce (from 'Developer' prototype)
console.log(JavaScriptDeveloper.lastName); 
//
// Doe (from 'Person' prototype)
console.log(JavaScriptDeveloper.programmingLanguage); 
//
// JavaScript (from 'Developer' prototype)
console.log(JavaScriptDeveloper.framework); 
//
// React (JavaScriptDeveloper's own property)
console.log(JavaScriptDeveloper.job); 
//
// undefined (not found anywhere in the chain)
```

::: tip Optional Exploration

If you're curious, trace the lookup for `javaScriptDeveloper.lastName`. It goes: `JavaScriptDeveloper` -> `Developer` -> `Person` -> `Object.prototype`.

:::

Okay, prototypes are powerful. We can create objects that share properties and behaviors and specialize them for different needs. But imagine if we wanted to create hundreds of `Person` objects, hundreds of `Developer` objects, and hundreds of `JavaScriptDeveloper` objects.

Using `Object.create()` every time would still be quite repetitive, especially if we want to ensure that every `Person` starts with the same basic properties (like `firstName` and `lastName`).

We need a better way to create multiple objects that follow the same pattern, like a blueprint that we can re-use over and over again to create objects. This is what classes are for, they are just blueprints that we can use to create multiple objects, and JavaScript uses Constructor functions to create classes (the blueprints).

In the next section, we’ll dive into how javascript uses Constructor functions to implement classes.
