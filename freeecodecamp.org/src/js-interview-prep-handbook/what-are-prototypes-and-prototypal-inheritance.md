---
lang: en-US
title: "What are Prototypes and Prototypal Inheritance?"
description: Article(s) > (10/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
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
      content: Article(s) > (10/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "What are Prototypes and Prototypal Inheritance?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/what-are-prototypes-and-prototypal-inheritance.html
date: 2024-09-10
isOriginal: false
author:
  - name: Kunal Nalawade
    url: https://freecodecamp.org/news/author/KunalN25/
cover: https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples",
  "desc": "JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",
  "link": "/freecodecamp.org/js-interview-prep-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples"
  desc="JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in..."
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-what-are-prototypes-and-prototypal-inheritance"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Inheritance is a concept in object oriented programming that allows an object to inherit properties and methods from another object. However, inheritance works differently in JavaScript.

In JavaScript, every object has a property that links to another object called a prototype. The prototype itself is an object that can have its own prototype, thus forming a prototype chain. This chain ends when we reach a prototype equal to `null`.

Prototype allows you to inherit methods and properties from another object. When a property does not exist on an object, JavaScript searches its prototype and so on till it reaches the end of the prototype chain.

Let's understand with an example.

```js
let animal = {
    eats: true,
    walk() {
        console.log("Animal is walking");
    }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;
rabbit.walk(); // Animal is walking
```

`Object.create` creates a new object `rabbit` with its prototype set to `animal`. You can also set additional properties of the new object.

Also, the `walk()` method does not exist on `rabbit`, so it searches the object's prototype `animal`. This means the `rabbit` object has inherited the properties and methods of the `animal` object.

You can also use the ES6 `Object.setPrototypeOf` method on any object.

```js
const dog = {
    bark() {
        console.log("Dog barking");
    }
};

Object.setPrototypeOf(dog, animal);
console.log(dog.eats); // true
dog.walk(); // Animal is walking
```

You can also use a function as a constructor and set its prototype using the `prototype` property.

```js
function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function () {
    console.log(`${this.name} is walking`);
};

const dog = new Animal("Dog");
console.log(dog); // Animal { name: 'Dog' }
dog.walk(); // Dog is walking
```

You can learn more about prototypes and inheritance in JavaScript in the following [post](/freecodecamp.org/prototypes-and-inheritance-in-javascript.md) by [Germán Cocca (<VPIcon icon="fa-brands fa-free-code-camp"/>`gercocca`)](https://freecodecamp.org/news/author/gercocca/).
