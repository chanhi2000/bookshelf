---
lang: en-US
title: "How to Use var, let, and const Keywords."
description: Article(s) > (1/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
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
      content: Article(s) > (1/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
    - property: og:description
      content: "How to Use var, let, and const Keywords."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-use-var-let-and-const-keywords.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-use-var-let-and-const-keywords"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

In JavaScript, you can declare a variable in three ways: using `var`, `let` and `const`. It's essential to understand the difference between these three.

A `var` variable has global and function level scope. If the variable is declared globally, it can be accessed anywhere and if declared inside a function, it can be accessed anywhere within the function.

```js
var a=5
function fun() {
    var b=4
}

console.log(a) // 5
console.log(b) // throws ReferenceError
```

A `let` variable has block level scope. This variable, if declared inside a block, cannot be accessed outside it. For example:

```js
var a = 5;
if (a > 1) {
    var b = 6;
    let c = 7;
}
console.log(a); // prints 5
console.log(b); // prints 6
console.log(c); // throws ReferenceError
```

Here, variables `a` and `b` have global scope, so they can be accessed anywhere. Variable `c` cannot be accessed outside the `if` block since `let` only has block level scope.

`const` is used to declare a constant. Once a variable is declared with `const`, it cannot be modified.

```js
const x = 5;
x = 6; // Throws an error
```

However, you can modify properties of an object, or elements of an array.

```js
const obj = { name: 'kunal', age: 21 };
obj.name = 'alex';
console.log(obj); // { name: 'alex', age: 21 }

const arr = [1, 2, 3];
arr[1] = 4;
console.log(arr); // [ 1, 4, 3 ]
```
