---
lang: en-US
title: "How to Use the async and await Keywords"
description: Article(s) > (14/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
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
      content: Article(s) > (14/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "How to Use the async and await Keywords"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-use-the-async-and-await-keywords.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-use-the-async-and-await-keywords"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

`await` keyword pauses execution of a function till a promise has been resolved or rejected. `await` can only be used inside an `async` function. Let's take an example:

```js
function dataPromise() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Data retrieved"), 500);
    });
}

async function fetchData() {
    try {
        const res = await dataPromise();
        console.log(res); // Data retrieved (after 500ms)
    } catch(err) {
        console.log(err);
    }
}

fetchData();
```

When `dataPromise()` is called, the execution of the function pauses for 500ms. The execution continues after the promise has resolved. To handle errors, surround the code with a `try-catch` block.

The `await` keyword also makes it easier to work with multiple promises that run one after the other.

```js
function promise1() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Promise 1 resolved"), 500);
    });
}

function promise2() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Promise 2 resolved"), 300);
    });
}

async function fetchData() {
    try {
        const res1 = await promise1();
        console.log(res1); // Promise 1 resolved (after 500ms)
        const res2 = await promise2();
        console.log(res2); // Promise 2 resolved (after 300ms)
    } catch(err) {
        console.log(err);
    }
}

fetchData();
```

`async` and `await` makes it easier to work with promises and also makes your code cleaner and readable by removing nesting in the code.
