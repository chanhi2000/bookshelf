---
lang: en-US
title: "How to Implement Throttling"
description: Article(s) > (5/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
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
      content: Article(s) > (5/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
    - property: og:description
      content: "How to Implement Throttling"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-implement-throttling.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-implement-throttling"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Throttling is a technique that limits the rate at which a function is called. A throttled function executes for the first time and can only be called again after a certain delay. If it is called within the delay, nothing happens.

Let's see how to implement it:

```js
function throttle(func, delay) {
    let timeout = null;
    return (...args) => {
        if (!timeout) {
            func(...args);
            timeout = setTimeout(() => {
                timeout = null;
            }, delay);
        }
    };
}
```

`throttle()` takes a function and a delay as parameters, and returns a throttled function. When you call the throttled function, it executes the first time and starts a timeout with `delay`. Within this time, no matter how many times you call the throttled function, it won't execute.

Let's test this behavior:

```js
function fun(a, b) {
    console.log(`This is a function with arguments ${a} and ${b}`);
}

const throttledFun = throttle(fun, 500);

throttledFun(2, 3); // This is a function with arguments 2 and 3
throttledFun(2, 3);

setTimeout(() => {
    throttledFun(2, 3);
}, 300);

setTimeout(() => {
    throttledFun(2, 3); // This is a function with arguments 2 and 3
}, 600);
```

Here, the first call executes immediately, and for the next 500ms, no function call will execute. The last one executes since it is called after 500ms.

Throttling also uses the concept of closures. I have explained throttling in detail in my post, so [check it out](/freecodecamp.org/throttling-in-javascript.md)