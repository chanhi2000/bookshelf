---
lang: en-US
title: "ES6 Classes: Class Syntax – Prototypes in Disguise"
description: "Article(s) > (11/12) How to Use Classes in JavaScript – A Handbook for Beginners"
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
      content: "Article(s) > (11/12) How to Use Classes in JavaScript – A Handbook for Beginners"
    - property: og:description
      content: "ES6 Classes: Class Syntax – Prototypes in Disguise"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/es6-classes-class-syntax-prototypes-in-disguise.html
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
  "title": "How to Use Classes in JavaScript – A Handbook for Beginners",
  "desc": "Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was...",
  "link": "/freecodecamp.org/how-to-use-classes-in-javascript-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Classes in JavaScript – A Handbook for Beginners"
  desc="Are you curious about classes in JavaScript but feel a little puzzled about how they work or why you'd even use them? If that's you, then you're definitely in the right place. Lots of developers find classes a bit tricky at first, and honestly, I was..."
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-es6-classes-class-syntax-prototypes-in-disguise"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>


Okay, we've wrestled with constructor functions and `call()` and `Object.create()` to get inheritance working with prototypes. It's powerful, but let's be honest, it can feel a little verbose and indirect, especially if you're used to class-based languages.

That's where ES6 classes come to the rescue. They offer a much more streamlined and class-like syntax for creating object blueprints in JavaScript.

Let's rewrite our `PersonConstructor` example using the `class` syntax. Get ready for a breath of fresh air.

---

## `PersonClass` - Constructor Function Reimagined as a Class

Here's how we can define our `Person` blueprint as a class:

```js
class PersonClass {
  //  Using the 'class' keyword!
  constructor(name, age) {
    //  'constructor' method - like our old constructor function
    this.name = name; //  Still using 'this' in the constructor
    this.age = age;
  }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}
```

Doesn't that look much cleaner and more organized? Let's break down the class syntax:

- `class PersonClass { ... }`: We start with the `class` keyword, followed by the class name (`PersonClass` in this case). Class names are conventionally capitalized.
- `constructor(name, age) { ... }`: Inside the class, we have a special method called `constructor`. This is like our old `PersonConstructor` function. It's where we put the code to initialize the properties of a new `PersonClass` object when it's created with `new`. We still use `this` inside the `constructor` to refer to the new object being created.
- `greet() { ... }`: This is how we define methods in a class. We simply write the method name (`greet`), followed by parentheses for parameters (none in this case), and then the method body in curly braces. Notice that we don't use the `function` keyword here. It's just `greet() { ... }`.

---

## Creating Objects from a Class - Still Using `new`

To create objects from our `PersonClass` blueprint, we still use the `new` keyword, just like we did with constructor functions:

```js
const classPerson1 = new PersonClass("Charlie", 28);
const classPerson2 = new PersonClass("Diana", 32);

console.log(classPerson1.name); // Output: Charlie
classPerson1.greet(); // Output: Hello, I'm Charlie
```

Yep, it works exactly the same way as our constructor function example, but the class syntax is just much more readable and less cluttered.

---

## `DeveloperPersonClass` - Inheritance Made Easy with `extends`

Now, let's tackle inheritance using classes. Remember how we had to use `call()` and `Object.create()` to get `DeveloperPersonConstructor` to inherit from `PersonConstructor`? With classes, inheritance becomes super straightforward using the `extends` keyword.

Here's how we can rewrite `DeveloperPersonConstructor` as a `DeveloperPersonClass` that inherits from `PersonClass`:

```js
class DeveloperPersonClass extends PersonClass {
  //  'extends' for inheritance!
  constructor(name, age, programmingLanguage) {
    super(name, age); //  'super()' calls the parent class constructor!
    this.programmingLanguage = programmingLanguage;
  }

  code() {
    // Developer-specific method
    console.log(`${this.name} is coding in ${this.programmingLanguage}`);
  }
}
```

Look at that. Inheritance in classes is declared using the `extends` keyword: `class DeveloperPersonClass extends PersonClass {...}`. This line alone says, "Hey JavaScript, `DeveloperPersonClass` should inherit from `PersonClass`."

Inside the `DeveloperPersonClass` constructor, we have this line: `super(name, age);`. `super()` is crucial for class inheritance. It's how we call the constructor of the parent class (`PersonClass` in this case). When we call `super(name, age)`, it's essentially doing the same thing as `PersonConstructor.call(this, name, age)` in our constructor function example—it's running the `PersonClass` constructor to set up the inherited properties (`name` and `age`) on the `DeveloperPersonClass` object.

After calling `super()`, we can then add any developer-specific properties or methods to our `DeveloperPersonClass`, like `this.programmingLanguage = programmingLanguage;` and the `code()` method.

---

## Using `DeveloperPersonClass` - Inheritance in Action, Cleaner Syntax

Let's create a `DeveloperPersonClass` object and see inheritance in action with this cleaner syntax:

```js
const classDevPerson1 = new DeveloperPersonClass("Eve", 35, "JavaScript");

console.log(classDevPerson1.name);
//
// Eve (Inherited from PersonClass!)
console.log(classDevPerson1.age);
//
// 35 (Inherited from PersonClass!)
classDevPerson1.greet(); 
//
// Hello, I'm Eve (Inherited from PersonClass!)
console.log(classDevPerson1.programmingLanguage);
//
// JavaScript (Developer-specific)
classDevPerson1.code(); 
//
// Eve is coding in JavaScript (Developer-specific)
```

It works exactly as expected. `classDevPerson1` inherits `name`, `age`, and `greet()` from `PersonClass` and also has its own `programmingLanguage` and `code()` methods. But the class syntax makes the inheritance relationship much more obvious and easier to work with.

---

## Classes: Syntactic Sugar, Prototype Power Underneath

Let's be crystal clear again: JavaScript classes are syntactic sugar over prototypes. They are a more user-friendly way to write code that is still based on prototypes and constructor functions behind the scenes.

When you define a class, JavaScript is actually doing these things for you under the hood:

- It's creating a constructor function (like our `PersonConstructor`).
- It's setting up the `.prototype` property of that constructor function.
- When you use `extends`, it's using `Object.create()` and `call() to` set up the prototype chain for inheritance.

Classes don't change the fundamental prototype-based nature of JavaScript OOP. They just give us a more familiar and less verbose syntax to work with it.

---

## So, Are Classes Just "Fake" Classes?

Some people argue that JavaScript classes are “fake” because they’re merely syntactic sugar. But honestly, that’s not the point at all. Syntactic sugar is awesome—it makes our code easier to read, write, and maintain. For those coming from a class-based language background, classes make object-oriented programming in JavaScript much more approachable and understandable.

The key takeaway is that while classes give you a neat, familiar syntax, you still need to understand the underlying mechanism: prototypes. Classes are just a friendly layer on top of JavaScript’s prototype system.
