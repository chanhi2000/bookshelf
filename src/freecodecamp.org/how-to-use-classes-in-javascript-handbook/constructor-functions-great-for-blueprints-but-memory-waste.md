---
lang: en-US
title: "Constructor Functions: Great for Blueprints, but... Memory Waste?"
description: "Article(s) > (6/12) How to Use Classes in JavaScript – A Handbook for Beginners"
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
      content: "Article(s) > (6/12) How to Use Classes in JavaScript – A Handbook for Beginners"
    - property: og:description
      content: "Constructor Functions: Great for Blueprints, but... Memory Waste?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-classes-in-javascript-handbook/constructor-functions-great-for-blueprints-but-memory-waste.html
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
  url="https://freecodecamp.org/news/how-to-use-classes-in-javascript-handbook#heading-constructor-functions-great-for-blueprints-but-memory-waste"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739878241514/a725b4af-8061-49c2-9575-2aa4096acb74.png"/>

Okay, so now that you know how to create object blueprints using constructor functions, and you understand what `this` does, we can make lots of `Person` objects.

But there's a little problem lurking in our `PersonConstructor`:

```js
function PersonConstructor(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    // 😬 Look at this greet function!
    console.log(`Hello, I'm ${this.name}`);
  };
}

const person1 = new PersonConstructor("Alice", 25);
const person2 = new PersonConstructor("Bob", 30);

console.log(person1, person2);
//
// PersonConstructor {name: "Alice", age: 25, greet: function}
// PersonConstructor {name: "Bob", age: 30, greet: function}
```

Notice the `greet` function inside the `PersonConstructor`? Every time we create a new `Person` object using `new PersonConstructor()`, we're actually copying the entire `greet` function to each and every object.

Imagine that we create one thousand `Person` objects. We'd have a thousand identical `greet` functions in memory. For a simple `greet()` function, the memory impact might seem small. However, if you had more complex methods with lots of code, or if you were creating thousands or even millions of objects, duplicating these functions for every single object can become a significant waste of memory.

It also impacts performance as JavaScript has to manage all these duplicated functions. That's a lot of duplicated code, and it's not very memory-efficient, especially if the `greet` function (or other methods) were more complex.
