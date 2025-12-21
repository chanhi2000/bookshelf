---
lang: en-US
title: "How to Implement Polyfills for Array.map(), Array.reduce(), and Array.filter()"
description: Article(s) > (18/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
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
      content: Article(s) > (18/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "How to Implement Polyfills for Array.map(), Array.reduce(), and Array.filter()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/js-interview-prep-handbook/how-to-implement-polyfills-for-arraymap-arrayreduce-and-arrayfilter.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-implement-polyfills-for-arraymap-arrayreduce-and-arrayfilter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

JavaScript has evolved a lot since its inception. Several methods and constructs have been added to JavaScript that didn't exist before. Most modern browsers use the latest versions of JavaScript.

However, there are several applications still running on older browsers that use older versions of JavaScript . Array methods like `map`, `reduce` and `filter` may not be available. Therefore, you may have to provide polyfills for these methods.

Polyfills are pieces of code that provide modern functionality to older browsers that don't support it. This ensures that your code runs seemlessly on different browsers and versions.

Most companies have websites that still cater to users and systems running old browsers. So, knowing how to write polyfills for frequently used methods is important.

In our case, we are going to write polyfills for `Array.map`, `Array.reduce` and `Array.filter` methods. This means we are going to write our own implementations instead of using the default ones.

---

## `Array.map`

This method takes a callback function as a parameter, executes it on each array element and returns a new, modified array.

The callback function takes three arguments: the array element, index and the array itself. The last two arguments are optional.

```js
Array.prototype.map = function(callback) {
  var newArray = [];
  for (var i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};
```

‌The logic is simple. Call the function for each element of the array and append each value to the new array. The `this` keyword is the object on which you are calling the function, in this case, the array.

---

## `Array.filter`

This method also takes a callback function as a parameter. The callback function runs a condition on each array element and returns a Boolean value. The `filter` method returns a new, filtered array containing elements that satisfy the condition.

This callback function takes three arguments: the array element, index and the array itself. The last two arguments are optional.

```js
Array.prototype.filter = function(callback) {
  var filteredArr = [];
  for (var i = 0; i < this.length; i++) {
    var condition = callback(this[i], i, this);
    if (condition) {
      filteredArr.push(this[i]);
    }
  }
  return filteredArr;
};
```

Here, use the Boolean value returned by the callback function to add elements to the new array.

---

## `Array.reduce`

This method takes a callback function and an initial value as parameters and reduces the array to a single value. This is done by executing the function on the accumulator and current value and storing the result into the accumulator.

The callback function takes four arguments: the accumulator, current element, index and array itself. The last two arguments are optional.

```js
Array.prototype.reduce = function(callback, initialValue) {
    var accumulator = initialValue;
    for (var i = 0; i < this.length; i++) {
        if (accumulator !== undefined) {
            accumulator = callback(accumulator, this[i], i, this);
        } else {
            accumulator = this[i];
        }
    }
    return accumulator;
};
```

Initially, set the accumulator to the initial value. Execute the callback function for each array element and store the result in accumulator. If the accumulator is undefined, then set it to the element itself.

Let's test these methods:

```js
const arr = [1, 2, 3];
console.log(arr.map(ele => ele * 2)); // [ 2, 4, 6 ]
console.log(arr.filter(ele => ele < 2)); // [ 1 ]
console.log(arr.reduce((total, ele) => total + ele, 0)); // 6
```

::: note

Before adding a polyfill for any property, always check if the property exists on the object's prototype, or you might override the existing behaviour. For example:

```js
if (!Array.prototype.map)
```

:::
