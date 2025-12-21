---
lang: en-US
title: "Inheritance with Constructor Functions: Passing Down the Family Traits (the Constructor Way)"
description: "Article(s) > (9/12) How to Use Classes in JavaScript - A Handbook for Beginners"
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
      content: "Article(s) > (/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Inheritance with Constructor Functions: Passing Down the Family Traits (the Constructor Way)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-classes-in-javascript-handbook/inheritance-with-constructor-functions-passing-down-the-family-traits-the-constructor-way.html
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
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-inheritance-with-constructor-functions-passing-down-the-family-traits-the-constructor-way"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

Alright, we're making good progress. We've got constructor functions to create object blueprints, and prototypes to share methods efficiently. But one of the big reasons people use OOP is for inheritance - the idea of creating specialized objects that build upon more general ones.

Think back to our `Person` and `Developer` example. A `Developer` is a `Person`, right? They have a name, an age, maybe they greet people, but they also have developer-specific properties, like a favorite programming language and the ability to code.

How can we create a `DeveloperPersonConstructor` blueprint that inherits all the basic `PersonConstructor` stuff, and then adds its own developer-specific features? With constructor functions, you can use something called `call()`.

---

## `call()`: The Secret Inheritance Handshake

`call()` is a function method that lets you do something a bit unusual: you can borrow a function from one object and run it in the context of another object. Sounds confusing? Let's simplify.

To illustrate `call()`, let's consider our `PersonConstructor`. We want to create a `DeveloperPersonConstructor` that also sets up `name` and `age` in the same way `PersonConstructor` does, before adding developer-specific properties.

This is where `call()` comes in. We can use `call()` to essentially say: "Hey `PersonConstructor`, run your code, but run it as if you were inside `DeveloperPersonConstructor`, and set up `name` and `age` for this `DeveloperPerson` object we're currently creating."

Let's see this in code to make it clearer:

```js
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

PersonConstructor.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

function DeveloperPersonConstructor(name, age, programmingLanguage) {
  //  --- "Borrow" the PersonConstructor to set up name and age! ---
  PersonConstructor.call(this, name, age); //  <--  The magic of 'call()'

  // --- Now, add developer-specific properties ---
  this.programmingLanguage = programmingLanguage;
  this.code = function () {
    console.log(`${this.name} is coding in ${this.programmingLanguage}`);
  };
}
```

See that line: `PersonConstructor.call(this, name, age);` ? That's the key to inheritance here. Let's break it down:

- `PersonConstructor.call(...)`: We're calling the `PersonConstructor` function, but not in the usual way. We're using `.call()`.
- `this`: The first argument to `call()` is crucial. It specifies what `this` should be inside the `PersonConstructor` function when it runs. Here, we're passing `this` from `DeveloperPersonConstructor`. Why? Because we want `PersonConstructor` to set up `name` and `age` on the `DeveloperPerson` object that's currently being created.
- `name, age`: These are the arguments we're passing to the `PersonConstructor` function itself. So, when `PersonConstructor` runs (thanks to `.call()`), it will receive `name` and `age` and do what it normally does: set `this.name = name` and `this.age = age`. But because `this` is actually the `DeveloperPerson` object, it sets these properties on the `DeveloperPerson` object.

---

## Putting it all Together: Creating a `DeveloperPerson`

Now, let's create a `DeveloperPerson` object and see what happens:

```js
const devPerson1 = new DeveloperPersonConstructor("Eve", 30, "JavaScript");

console.log(devPerson1.name); // Output: Eve (Inherited from PersonConstructor!)
console.log(devPerson1.age); // Output: 30 (Inherited from PersonConstructor!)
devPerson1.greet(); // Output: (Oops! Error!)
console.log(devPerson1.programmingLanguage); // Output: JavaScript (Developer-specific)
devPerson1.code(); // Output: Eve is coding in JavaScript (Developer-specific)
```

Notice that `devPerson1.name` and `devPerson1.age` are there. `DeveloperPersonConstructor` borrowed the part of `PersonConstructor` that sets up those basic properties. And we also have `devPerson1.programmingLanguage` and `devPerson1.code()` which are specific to developers.

---

## Uh Oh! Where's `greet()`?

But wait, `devPerson1.greet()` is throwing an error. Why? Because even though we borrowed the constructor logic from `PersonConstructor`, we haven't yet set up the prototype chain for inheritance of prototype methods like `greet()`.

Right now, `devPerson1`'s prototype is just the default object prototype (`Object.prototype`). It's not inheriting from `PersonConstructor.prototype`. We need to fix that.

---

## Setting the Prototype Chain for Constructor Inheritance

To make `DeveloperPersonConstructor` objects also inherit prototype methods from `PersonConstructor`, we need to manually adjust the prototype chain. We can do this using `Object.create()` again.

We want the prototype of `DeveloperPersonConstructor` to be an object that inherits from `PersonConstructor.prototype`.

Here's the code:

```js
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

PersonConstructor.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};

function DeveloperPersonConstructor(name, age, programmingLanguage) {
  PersonConstructor.call(this, name, age);
  this.programmingLanguage = programmingLanguage;
  this.code = function () {
    console.log(`${this.name} is coding in ${this.programmingLanguage}`);
  };
}

// ---  Set up the Prototype Chain for Inheritance! ---
DeveloperPersonConstructor.prototype = Object.create(
  PersonConstructor.prototype
);
```

That line `DeveloperPersonConstructor.prototype = Object.create(PersonConstructor.prototype);` is doing the magic. It's saying, "Hey JavaScript, set the prototype of `DeveloperPersonConstructor` to be a new object that inherits from `PersonConstructor.prototype`."

Now, let's try `devPerson1.greet()` again:

```js
const devPerson1 = new DeveloperPersonConstructor("Eve", 30, "JavaScript");

devPerson1.greet(); // Output: Hello, I'm Eve  - 🎉 It works now!
```

`devPerson1.greet()` now works. `devPerson1` is inheriting the `greet()` method from `PersonConstructor.prototype` through the prototype chain we just set up.

---

## Let's Trace the Prototype Chain

Let's really understand what's happening when we do `devPerson1.greet()`:

1. JavaScript checks: Does `devPerson1` itself have a `greet` property? No.
2. JavaScript looks at `devPerson1`'s prototype: `DeveloperPersonConstructor.prototype`. Does it have a `greet`property? No, we only added developer-specific methods or properties to `DeveloperPersonConstructor` directly, not to its prototype in our example. (We could add developer-specific prototype methods later).
3. JavaScript goes up the prototype chain to `DeveloperPersonConstructor.prototype`'s prototype: `PersonConstructor.prototype`. Does it have a `greet` property? Yes. We defined `PersonConstructor.prototype.greet = function() { ... };`
4. JavaScript finds `greet()` on `PersonConstructor.prototype`, and executes it in the context of `devPerson1` (so `this.name` inside `greet()` refers to `devPerson1.name`).

Prototype chain in action. `devPerson1` -> `DeveloperPersonConstructor.prototype` -> `PersonConstructor.prototype` -> `Object.prototype`.

---

## Going Even Further: JavaScript Developer Person

We can even create longer inheritance chains. Let's say we want to create a `JavaScriptDeveloperPersonConstructor` that's a special type of `DeveloperPersonConstructor`, maybe with a specific JavaScript framework preference.

We can do the same pattern:

```js
function JavaScriptDeveloperPersonConstructor(name, age, framework) {
  //  "Borrow" from DeveloperPersonConstructor first!
  DeveloperPersonConstructor.call(this, name, age, "JavaScript"); // Hardcoded "JavaScript"
  this.framework = framework;
  this.codeJavaScript = function () {
    // Specific to JavaScript developers
    console.log(`${this.name} is coding in JavaScript with ${this.framework}`);
  };
}

// Set up prototype chain: JavaScriptDeveloperPerson -> DeveloperPerson -> Person
JavaScriptDeveloperPersonConstructor.prototype = Object.create(
  DeveloperPersonConstructor.prototype
);
```

Now we have a three-level inheritance chain.

---

## Constructor Functions: Powerful, but a Bit... Verbose?

Constructor functions and prototypes are really powerful. They are the fundamental way JavaScript achieves OOP-like behavior. However, as you can see, setting up inheritance with `call()` and `Object.create()` can get a bit wordy and tricky to read, especially as inheritance chains get longer.

And guess what? The JavaScript folks noticed this too. In 2015, a new, cleaner syntax for creating object blueprints was introduced in JavaScript.
