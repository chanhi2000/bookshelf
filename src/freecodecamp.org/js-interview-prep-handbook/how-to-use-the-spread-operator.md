---
lang: en-US
title: "‌How to Use the Spread Operator"
description: Article(s) > (11/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
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
      content: Article(s) > (11/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
    - property: og:description
      content: "‌How to Use the Spread Operator"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-use-the-spread-operator.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-use-the-spread-operator"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

The spread operator is used to spread out contents of an array or object into individual elements or collect a bunch of elements into a single object. It has following use cases:

Spread operator can be used to copy an array into a new one:

```js
const arr1 = [2, 4, 5];
const arr2 = [...arr1];

console.log(arr1); // [2, 4, 5]
console.log(arr2); // [2, 4, 5]
console.log(arr1 == arr2); // false
```

`arr1` and `arr2` are completely different objects as shown with the equality operator.

You can also reuse fields from one object while creating a new object:

```js
const obj1 = { name: 'kunal', age: 23 };
const obj2 = { ...obj1, gender: 'male', city: 'Mumbai' };

console.log(obj2); // { name: 'kunal', age: 23, gender: 'male', city: 'Mumbai' }
```

You can collect multiple arguments passed to a function into an array.

```js
function fun1(...args) {
    console.log(args);
}

fun1(1, 2, 3, 4, 5); // [ 1, 2, 3, 4, 5 ]
```

Or you can pass elements of an array as individual arguments to a function.

```js
function fun2(a, b) {
    console.log(`${a} and ${b}`);
}

const numbers = [1, 2];
fun2(...numbers);
```
