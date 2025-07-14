---
lang: en-US
title: "Avoid Page Stuttering"
description: "Article(s) > (16/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (16/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
    - property: og:description
      content: "Avoid Page Stuttering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/avoid-page-stuttering.html
date: 2025-05-07
isOriginal: false
author:
  - name: Gordan Tan
    url : https://freecodecamp.org/news/author/woai3c/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Front-End Performance Optimization Handbook – Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-avoid-page-stuttering"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

## 60fps and Device Refresh Rate

> Currently, most devices have a screen refresh rate of 60 times/second. Therefore, if there's an animation or gradient effect on the page, or if the user is scrolling the page, the browser needs to render animations or pages at a rate that matches the device's screen refresh rate.
> 
> The budget time for each frame is just over 16 milliseconds (1 second / 60 = 16.66 milliseconds). But in reality, the browser has housekeeping work to do, so all your work needs to be completed within 10 milliseconds. If you can't meet this budget, the frame rate will drop, and content will jitter on the screen.
> 
> This phenomenon is commonly known as stuttering and has a negative impact on user experience. *Source:* [*Google Web Fundamentals - Rendering Performance*](https://developers.google.com/web/fundamentals/performance/rendering)

![Frame budget timing diagram showing the 16ms frame budget and browser overhead](https://camo.githubusercontent.com/300b19e6e2523e1dfba3a8addba37a65797cc55de57501768ce987a81d06332f/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f31626565666137613665323039346465643966656261336165633832303135382e706e67)

Suppose you use JavaScript to modify the DOM, trigger style changes, go through reflow and repaint, and finally paint to the screen. If any of these takes too long, it will cause the rendering time of this frame to be too long, and the average frame rate will drop. Suppose this frame took 50 ms, then the frame rate would be 1s / 50ms = 20fps, and the page would appear to stutter.

For some long-running JavaScript, we can use timers to split and delay execution.

```js
for (let i = 0, len = arry.length; i < len; i++) {
  process(arry[i])
}
```

Suppose the loop structure above takes too long due to either the high complexity of `process()` or too many array elements, or both, you might want to try splitting.

```js
const todo = arry.concat()
setTimeout(function() {
  process(todo.shift())
  if (todo.length) {
    setTimeout(arguments.callee, 25)
  } else {
    callback(arry)
  }
}, 25)
```

If you're interested in learning more, check out [<FontIcon icon="fa-brands fa-aws"/>High Performance JavaScript](https://amazon.com/High-Performance-JavaScript-Application-Interfaces/dp/059680279X) Chapter 6. 

::: info Reference:

```component VPCard
{
  "title": "Rendering performance | Articles | web.dev",
  "desc": "Users notice if sites and apps don&#39;t run well, so optimizing rendering performance is crucial!",
  "link": "https://web.dev/articles/rendering-performance/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v31bf0d5ece3babea9777b807f088a03e9bb2225d007f11b8410e9c896eb213a6/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

:::
