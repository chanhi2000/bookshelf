---
lang: en-US
title: "What are Generator Functions?"
description: Article(s) > (17/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
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
      content: Article(s) > (17/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
    - property: og:description
      content: "What are Generator Functions?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/what-are-generator-functions.html
date: 2024-09-10
isOriginal: false
author: Kunal Nalawade
cover: https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples",
  "desc": "JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in...",
  "link": "/freecodecamp.org/js-interview-prep-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples"
  desc="JavaScript is a widely used language in web development and powers interactive features of virtually every website out there. JavaScript makes it possible to create dynamic web pages and is very versatile. JavaScript remains one of the most in-demand programming languages in 2024. Many companies are looking for proficiency in..."
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-what-are-generator-functions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Generator functions are special type of functions that can pause their execution and resume it later. They also return a value each time they pause execution.

Generator functions can be used to return a sequence of values in an iterative manner as opposed to normal functions that return only once.

Following is a basic example of a generator function:

```js
function* generatorFunction() {
    yield 1;
    yield 2;
}
```

A generator function is declared with `function*` and the `yield` keyword is used to pause execution and return a value. The above syntax creates a [<FontIcon icon="fa-brands fa-firefox"/>GeneratorFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction) object.

```js
const gen = generatorFunction()
```

‌This object uses an [<FontIcon icon="fa-brands fa-firefox"/>iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol) to execute a generator function. The iterator provides a `next()` method that executes the function's body till the next yield statement and returns an object containing the yielded value and a `done` property (Boolean), which indicates if the generator function has reached its end.

Let's call the generator function:

```js
console.log(gen.next().value); // 1
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

‌Here, the first call to `next()` yields 1 and the second one yields 2. The last one yields nothing and sets the `done` flag to true as there are no more `yield` statements.

You can also loop over a generator function using `for` loop:

```js
for(value of generatorFunction()) {
  console.log(value)
}
```

In this way, you can control the execution of a generator function by entering and exiting a function at any time.
