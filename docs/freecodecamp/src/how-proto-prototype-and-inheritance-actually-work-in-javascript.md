---
lang: en-US
title: "How __proto__, prototype, and Inheritance Actually Work in JavaScript"
description: "Article(s) > How __proto__, prototype, and Inheritance Actually Work in JavaScript"
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
      content: "Article(s) > How __proto__, prototype, and Inheritance Actually Work in JavaScript"
    - property: og:description
      content: "How __proto__, prototype, and Inheritance Actually Work in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-proto-prototype-and-inheritance-actually-work-in-javascript.html
prev: /programming/js/articles/README.md
date: 2025-11-05
isOriginal: false
author:
  - name: Shejan Mahamud
    url : https://freecodecamp.org/news/author/Shejan-Mahamud/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1762210692821/651a67f9-cbe5-4f09-b048-957caaa5e1ac.png
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
  name="How __proto__, prototype, and Inheritance Actually Work in JavaScript"
  desc="Have you ever wondered why everything in JavaScript acts like an object? Or how inheritance actually works behind the scenes? What's the difference between __proto__ and prototype? If these questions have crossed your mind, you're not alone. These ar..."
  url="https://freecodecamp.org/news/how-proto-prototype-and-inheritance-actually-work-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1762210692821/651a67f9-cbe5-4f09-b048-957caaa5e1ac.png"/>

Have you ever wondered why everything in JavaScript acts like an object? Or how inheritance actually works behind the scenes? What's the difference between `__proto__` and `prototype`?

If these questions have crossed your mind, you're not alone. These are some of the most fundamental concepts in JavaScript, yet they often confuse developers.

In this tutorial, we'll demystify prototypes, prototype chains, and inheritance in JavaScript. By the end, you'll understand the "what," "why," and "how" of JavaScript's prototype system.

::: note Prerequisites

To get the most out of this tutorial, you should have:

- Basic understanding of JavaScript fundamentals
- Familiarity with objects, functions, and classes in JavaScript
- Knowledge of how to declare and use variables
- Experience working with the `new` keyword (helpful but not required)

:::

---

## The String Method Mystery

Let's start with a simple example that demonstrates something interesting about JavaScript:

```js
let name = "Shejan Mahamud";
```

After declaring this variable, we can use String methods like:

```js
name.toLowerCase(); // "shejan mahamud"
name.toUpperCase(); // "SHEJAN MAHAMUD"
```

This seems normal at first glance, but wait – something unusual is happening. Notice anything odd here? We're using dot notation on a string primitive.

Here's the puzzling part: we know that strings are primitive types in JavaScript, not objects. So how can we use dot notation to access methods? After all, dot notation typically only works with objects.

The answer to this mystery lies in understanding how JavaScript handles primitives and prototypes. But before we get there, let's first look at how objects work internally.

---

## How Objects Work Internally

When you create an object in JavaScript like this:

```js
const info1 = {
  fName: "Shejan",
  lName: "Mahamud"
};
```

JavaScript does something interesting behind the scenes. It automatically adds a hidden property called `__proto__` to your object. This property points to `Object.prototype`, which is the prototype of the built-in Object class.

You might wonder: does `Object.prototype` also have a `__proto__`? Yes, it does, but its value is `null`. This is because `Object.prototype` is at the top of the prototype chain and doesn't inherit from anything else.

Let's look at a more complex example to understand this better:

```js
const info1 = {
  fName1: "Shejan",
  lName1: "Mahamud"
};

const info2 = {
  fName2: "Boltu",
  lName2: "Mia",
  __proto__: info1
};

const info3 = {
  fName3: "Habu",
  lName3: "Mia",
  __proto__: info2
};
```

In this example, we've intentionally set the `__proto__` property for `info2` and `info3`. Now here's an interesting question: can we access `fName1` from `info3`?

```js
console.log(info3.fName1); // "Shejan"
```

Yes, we can! Let's understand how this works.

---

## Understanding the Prototype Chain

When you try to access a property on an object, JavaScript follows a specific lookup process:

1. First, it searches for the property in the object itself (the base object)
2. If it doesn't find it there, it looks in the object's `__proto__`
3. If it still doesn't find it, it continues up the chain, checking each `__proto__` until it either finds the property or reaches `null`

In our example with `info3.fName1`:

- JavaScript first looks in `info3` – and it doesn't find `fName1`
- Then it checks `info3.__proto__`, which points to `info2` – it doesn't find `fName1` there, either
- Next it checks `info2.__proto__`, which points to `info1` – and it finds `fName1` here!

This is called the **prototype chain**, and this is how inheritance works in JavaScript. Here's a visual representation:

```js
┌────────────┐
│  info3     │
│ fName3     │
│ lName3     │
└────┬───────┘
     │ __proto__
     ▼
┌────────────┐
│  info2     │
│ fName2     │
│ lName2     │
└────┬───────┘
     │ __proto__
     ▼
┌────────────┐
│  info1     │
│ fName1     │
│ lName1     │
└────┬───────┘
     │ __proto__
     ▼
┌─────────────────┐
│ Object.prototype│
└────┬────────────┘
     ▼
    null
```
<!-- TODO: mermaid화 -->

Each object points to the next object in the chain through its `__proto__` property. This chain continues until it reaches `null`.

---

## Why Everything in JavaScript is an Object

Now let's solve the mystery we started with: how can primitive types use object methods?

In JavaScript, almost everything behaves like an object, even though primitive types (like strings, numbers, and booleans) technically aren't objects. This works through a process called **auto-boxing** or **wrapper objects**.

Let's see this in action:

```js
let yourName = "Boltu";
```

When you try to use a method on this string:

```js
yourName.toLowerCase();
```

Here's what JavaScript does behind the scenes:

1. It temporarily wraps the primitive value in a wrapper object: `new String("Boltu")`
2. This temporary object's `__proto__` automatically points to `String.prototype`
3. The method is found in `String.prototype` and executed
4. After the operation completes, the wrapper object is discarded
5. `yourName` returns to being a simple primitive value

This is why you can use methods on primitives even though they're not objects. JavaScript creates a temporary object, uses it to access the method, then throws it away.

The same process happens with other primitive types:

- Numbers use `Number.prototype`
- Booleans use `Boolean.prototype`

And so on. This elegant system is why developers often say "everything in JavaScript is an object" – even when it's not technically true, it behaves that way when needed.

---

## The Difference Between `__proto__` and `prototype`

This is one of the most confusing aspects of JavaScript for many developers. Let's break it down clearly.

### What is `prototype`?

When you create a function or class in JavaScript, the language automatically creates a blueprint object called `prototype`. This happens behind the scenes.

Here's an example:

```js
function Person(name) {
  this.name = name;
}
```

When JavaScript sees this function, it internally does this:

```js
Person.prototype = { 
  constructor: Person 
};
```

The `Person` function now has a hidden property called `prototype`, which is an object containing a `constructor` property.

You can add methods to this prototype object:

```js
Person.prototype.sayHi = function() {
  console.log("Hi, I'm " + this.name);
};
```

### What is `__proto__`?

`__proto__` is a property that exists on every object instance (arrays, functions, objects – everything). It's an internal reference or pointer that indicates which prototype the object inherits from.

By default, when you create an object, its `__proto__` points to `Object.prototype`.

### How They Work Together

When you use the `new` keyword:

```js
const p1 = new Person("Shejan");
```

JavaScript performs these steps internally:

1. Creates a new empty object: `p1 = {}`
2. Sets the object's `__proto__`: `p1.__proto__ = Person.prototype`
3. Calls the constructor function with the new object: `Person.call(p1, "Shejan")`
4. Returns the object: `return p1`

Now when you try to access a method:

```js
p1.sayHi(); // "Hi, I'm Shejan"
```

JavaScript looks for `sayHi` in `p1` first. When it doesn't find it, it checks `p1.__proto__`, which points to `Person.prototype`, where the method is defined.

The relationship can be expressed as:

```js
p1.__proto__ === Person.prototype; // true
Person.prototype.constructor === Person; // true
```

::: info In summary:

- `prototype` is a property of functions/classes that serves as a blueprint for instances
- `__proto__` is a property of object instances that points to the prototype they inherit from

:::

---

## How Prototypes Work with Functions

Let's see a complete example with functions:

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype
Person.prototype.introduce = function() {
  console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old.`);
};

// Creating instances
const person1 = new Person("Alice", 25);
const person2 = new Person("Bob", 30);

person1.introduce(); // "Hi, I'm Alice and I'm 25 years old."
person2.introduce(); // "Hi, I'm Bob and I'm 30 years old."

// Both instances share the same prototype
console.log(person1.__proto__ === Person.prototype); // true
console.log(person2.__proto__ === Person.prototype); // true
console.log(person1.__proto__ === person2.__proto__); // true
```

The key benefit here is memory efficiency: the `introduce` method exists only once in `Person.prototype`, but all instances can access it through the prototype chain.

---

## How Prototypes Work with Classes

ES6 introduced the `class` syntax, which looks different but works the same way under the hood:

```js
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const user1 = new User("Charlie");
user1.sayHi(); // "Hi, I'm Charlie"

// Let's check what's really happening
console.log(typeof User); // "function"
console.log(User.prototype); // { sayHi: f, constructor: f User() }
console.log(user1.__proto__ === User.prototype); // true
```

Classes are essentially syntactic sugar over JavaScript's prototype-based inheritance. Internally:

- A class is still a constructor function
- Methods defined in the class are added to `ClassName.prototype`
- Instances created with `new` have their `__proto__` set to the class's prototype

This means everything we learned about function prototypes applies to classes as well.

---

## Conclusion

Understanding prototypes and the prototype chain is fundamental to mastering JavaScript. These concepts form the foundation of how JavaScript implements inheritance and object-oriented programming.

::: important Key Takeaways

Let's recap what we've learned:

1. **Every object has** `__proto__`: This property points to the prototype the object inherits from, enabling the prototype chain lookup mechanism.
2. **Functions and classes have** `prototype`: This property serves as a blueprint for instances created with the `new` keyword.
3. **The prototype chain enables inheritance**: When JavaScript can't find a property on an object, it walks up the prototype chain until it finds the property or reaches `null`.
4. **Primitives use wrapper objects**: Even though primitives aren't objects, JavaScript temporarily wraps them in objects to provide access to methods.
5. **Classes are syntactic sugar**: The modern `class` syntax is cleaner, but it still uses prototypes under the hood.

:::

JavaScript might seem quirky at first, but once you understand how it works under the hood, you'll appreciate its elegant and flexible design.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How __proto__, prototype, and Inheritance Actually Work in JavaScript",
  "desc": "Have you ever wondered why everything in JavaScript acts like an object? Or how inheritance actually works behind the scenes? What's the difference between __proto__ and prototype? If these questions have crossed your mind, you're not alone. These ar...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-proto-prototype-and-inheritance-actually-work-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
