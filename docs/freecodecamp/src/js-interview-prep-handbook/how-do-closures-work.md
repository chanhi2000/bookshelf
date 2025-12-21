---
lang: en-US
title: "How Do Closures Work?"
description: Article(s) > (3/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
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
      content: Article(s) > (3/18) The JavaScript Interview Prep Handbook - Essential Topics to Know + Code Examples
    - property: og:description
      content: "How Do Closures Work?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/js-interview-prep-handbook/how-do-closures-work.html
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
  url="https://freecodecamp.org/news/js-interview-prep-handbook#heading-how-do-closures-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/05/JavaScript-Interview-Prep-Cover.png"/>

Closures are an important concept in JavaScript. When you have a function inside another function, the inner function has access to all the variables of the outer function.

But when this inner function is returned by the outer function, the inner function can be called anywhere outside the outer function and it can still access those variables.

```js
function fun() {
    let count = 0;
    return () => {
        count++;
        console.log(count);
    };
}

const innerFun = fun();
innerFun(); // prints 1
innerFun(); // prints 2
innerFun(); // prints 3
```

Here, `fun()` declares and initializes a variable `count`. Then, it returns an inner function that increments `count` before printing it. Now, when you call `innerFun()` anywhere outside the `fun()` method, it can still access `count` and increment it.

This is the concept of closures. You can understand more about closures in the following [post](/freecodecamp.org/closures-in-javascript.md) by [<VPIcon icon="fa-brands fa-free-code-camp"/>Matías Hernández](https://freecodecamp.org/news/author/matias-hernandez/).
