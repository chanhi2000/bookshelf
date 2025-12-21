---
lang: en-US
title: "Prototypes to the Rescue (Again): Sharing Methods Efficiently"
description: "Article(s) > (7/12) How to Use Classes in JavaScript - A Handbook for Beginners"
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
      content: "Article(s) > (7/12) How to Use Classes in JavaScript - A Handbook for Beginners"
    - property: og:description
      content: "Prototypes to the Rescue (Again): Sharing Methods Efficiently"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-classes-in-javascript-handbook/prototypes-to-the-rescue-again-sharing-methods-efficiently.html
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
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-prototypes-to-the-rescue-again-sharing-methods-efficiently"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

Remember prototypes? We learned that objects can inherit properties and methods from their prototypes. Well, constructor functions have a built-in way to use prototypes to solve this memory-waste problem.

Instead of defining the `greet` function inside the constructor and thus copying it to every instance, we can add it to the `prototype` of the `PersonConstructor` function.

Like this:

```js
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
}

//  --- Add the greet method to the PROTOTYPE of PersonConstructor! ---
PersonConstructor.prototype.greet = function () {
  console.log(`Hello, I'm ${this.name}`);
};
```

Now, the `greet` method is defined only once on `PersonConstructor.prototype`. But all objects created with `PersonConstructor` can still use it. They inherit it from the prototype.

Let's test it:

```js
const person1 = new PersonConstructor("Alice", 25);
const person2 = new PersonConstructor("Bob", 30);

person1.greet(); // Output: Hello, I'm Alice  - Still works!
person2.greet(); // Output: Hello, I'm Bob    - Still works!

console.log(person1.greet === person2.greet); // Output: false - They are NOT the same function object in memory

console.log(person1.__proto__.greet === person2.__proto__.greet); // Output: true - But they share the same prototype method!
```

`person1.greet()` and `person2.greet()` still work perfectly. But now, the `greet` function is not copied for each object. It's shared through the prototype. This is much more efficient, especially when we're dealing with lots of objects and methods.
