---
lang: en-US
title: "What are Promises?"
description: Article(s) > (13/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
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
      content: Article(s) > (13/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "What are Promises?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/what-are-promises.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-what-are-promises"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Promises are a very important concept in JavaScript, almost certain to be asked in interviews. Promises are used for asynchronous operations in JavaScript like timeouts or API calls.

Promises use a [<VPIcon icon="fa-brands fa-firefox"/>Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object that exists in one of three states: pending, fulfilled (resolved), and rejected. When an asynchronous operation ends, a promise can either be resolved (successful) or rejected (failure).

Let's take a simple example:

```js
function asyncOperation() {
    return new Promise((resolve, reject) => {
        const x = 1 + Math.random() * 10;
        if (x < 5) 
            resolve("Successful");
        else 
            reject("Error");
    });
}
```

The above function returns a promise that performs an asynchronous operation.

- If the operation is successful, the `resolve` method is called to indicate that the promise has been fulfilled.
- If the operation fails, the `reject` method is called to indicate that the promise has been rejected.

In this example, these methods are called at random. To handle this promise in your code, use the `then` and `catch` methods.

```js
asyncOperation()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

- The `then` method takes a callback function that executes if the promise was resolved. It takes a response object as an argument that is equal to the object you pass in the `resolve` method.
- The `catch` method takes a callback function that executes if the promise was rejected and takes an error object as argument that is passed in the `reject` method.

The above code prints "Successful" and "Error" at random.

Apart from the basics, the Promise object also contains useful methods that work with multiple promises: [<VPIcon icon="fa-brands fa-firefox"/>`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), [<VPIcon icon="fa-brands fa-firefox"/>`Promise.any()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any), [<VPIcon icon="fa-brands fa-firefox"/>`Promise.race()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

[Read the following tutorial](/freecodecamp.org/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js.md) to learn about promises in detail
