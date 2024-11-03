---
lang: en-US
title: "What is Currying?"
description: Article(s) > (6/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
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
      content: Article(s) > (6/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
    - property: og:description
      content: "What is Currying?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/what-is-currying.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-what-is-currying"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Currying is a technique where a function with multiple arguments is transformed into a sequence of functions, with each function taking a single argument and returning another function. For example, consider the function below:

```js
function add(a, b, c) {
    return a + b + c;
}
```

With currying, the above function can be written as:

```js
function curryAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}
```

Here, each function inside `curryAdd` takes one argument and returns another function till all arguments are collected. `curryAdd` is also known as a [higher-order function](/freecodecamp.org/higher-order-functions-explained.md).

Currying allows you to reuse partial implementations of a function. In case you do not have all the arguments available, you can fix some arguments of the function initially and return a reusable function.

```js
// Reusable function
const addTwo = curryAdd(2);
console.log(addTwo); // prints the function

// Calling final result
const result1 = addTwo(5)(10);
console.log(result1); // 17

const result2 = addTwo(3)(5);
console.log(result2); // 10
```

`addTwo` is a reusable function that can be used later, when additional arguments become available.

Thus, currying enhances code modularity and flexibility with partial function application. It also allows you to create functions that are tailored to specific needs as seen in the example above.

Currying simplifies complex functions by breaking them down into simpler, more manageable parts. This leads to cleaner and readable code.
