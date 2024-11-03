---
lang: en-US
title: "How to Implement Debouncing"
description: Article(s) > (4/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
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
      content: Article(s) > (4/18) The JavaScript Interview Prep Handbook – Essential Topics to Know + Code Examples
    - property: og:description
      content: "How to Implement Debouncing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/js-interview-prep-handbook/how-to-implement-debouncing.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-to-implement-debouncing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Debouncing is a technique that delays a function call by few seconds and ensures that there is always a delay between function call and execution.

When you call a function, it gets executed after a delay. However, if you call the function again within that delay, the previous call is cancelled and a new timer is started. The same process repeats for each subsequent function call.

Let's see how to implement it:

```js
function debounce(func, delay) {
    let timeout = null;
    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}
```

Debouncing takes a function and a delay as parameters, and returns a new, debounced function. When you call the debounced function, it will execute after `delay` milliseconds. If the function is called within that time, it cancels the previous call and waits for `delay` again.

Let's test this behavior:

```js
function fun(a, b) {
    console.log(`This is a function with arguments ${a} and ${b}`);
}

const debouncedFun = debounce(fun, 500);
debouncedFun(2, 3);
debouncedFun(2, 3);
debouncedFun(2, 3); // This is a function with arguments 2 and 3
```

The first two calls do not execute, while the third one does, after 500ms. Debouncing uses the concept of closures, so it's important to understand them first.

Debouncing has plenty of applications, with the most popular one being the auto-complete functionality in search bars. I have explained debouncing in detail in the following [post](/freecodecamp.org/deboucing-in-react-autocomplete-example.md)
