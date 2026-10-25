---
lang: en-US
title: "How to Use the call, apply and bind Methods."
description: Article(s) > (9/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
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
      content: Article(s) > (9/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "How to Use the call, apply and bind Methods."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-use-the-call-apply-and-bind-methods.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-use-the-call-apply-and-bind-methods"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

When you use `this` inside a function, its value is set to the object on which the function is called. Let's take an example:

```js
function getInfo() {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
}
```

`call`, `apply` and `bind` are used to set the value of the `this` keyword inside a method.

---

## `call`

To call `getInfo()` function on an object, use the `call` function. Let's create two objects and call `getInfo()` on these objects.

```js
const ob1 = { name: 'alex', age: 25 };
const ob2 = { name: 'marcus', age: 23 };

getInfo.call(ob1); // Name: alex, Age: 25
getInfo.call(ob2); // Name: marcus, Age: 23
```

`call` sets the value of the `this` keyword inside a function.

---

## `apply`

The `apply` method is similar to `call`, but it differs in the way you pass arguments. Consider a function with arguments:

```js
function getInfo(a, b) {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
    console.log(`Args: ${a} and ${b}`);
}

const obj = {
    name: 'alex',
    age: 25
};

getInfo.call(obj, 2, 3);
getInfo.apply(obj, [2, 3]);
```

---

## `bind`

`bind` is used to create a new function that has its `this` keyword set to one object. Let's use the above `getInfo` function as example.

```js
const obj = {
    name: 'alex',
    age: 25
};

const objGetInfo = getInfo.bind(obj, 2, 3);
objGetInfo();
```

When `bind` is called on `getInfo()` function, it returns a new function that is bound to `obj`. Now, every time you call the `objGetInfo()` function, `this` keyword refers to `obj`.

All three methods are similar. That is, they set the value of `this` keyword. However, a key difference in `bind` is that it returns a new function, whereas `call` and `apply` simply just call the function.
