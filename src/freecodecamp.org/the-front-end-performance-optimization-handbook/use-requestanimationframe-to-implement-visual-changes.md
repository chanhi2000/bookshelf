---
lang: en-US
title: "Use requestAnimationFrame to Implement Visual Changes"
description: "Article(s) > (17/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
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
      content: "Article(s) > (17/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
    - property: og:description
      content: "Use requestAnimationFrame to Implement Visual Changes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/use-requestanimationframe-to-implement-visual-changes.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-requestanimationframe-to-implement-visual-changes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

From point 16, we know that most devices have a screen refresh rate of 60 times/second, which means the average time per frame is 16.66 milliseconds. When using JavaScript to implement animation effects, the best case is that the code starts executing at the beginning of each frame. The only way to ensure JavaScript runs at the beginning of a frame is to use `requestAnimationFrame`.

```js
/**
 * If run as a requestAnimationFrame callback, this
 * will be run at the start of the frame.
 */
function updateScreen(time) {
  // Make visual updates here.
}

requestAnimationFrame(updateScreen);
```

If you use `setTimeout` or `setInterval` to implement animations, the callback function will run at some point in the frame, possibly right at the end, which can often cause us to miss frames, leading to stuttering.

![show the execution time of javascript](https://camo.githubusercontent.com/6921c15237df7064a3fe41fa89a174d78b43a8a0764a3b7536051c59b223ef6d/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f32386238663463313066646333393633303135386562646162626264356432662e706e67)

::: info Reference:

```component VPCard
{
  "title": "Optimize JavaScript execution | Articles | web.dev",
  "desc": "JavaScript often triggers visual changes. Sometimes that&#39;s directly through style manipulations, and sometimes it&#39;s calculations that result in visual changes, like searching or sorting data. Badly-timed or long-running JavaScript is a common cause of performance issues. You should look to minimize its impact where you can.",
  "link": "https://web.dev/articles/optimize-javascript-execution/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v31bf0d5ece3babea9777b807f088a03e9bb2225d007f11b8410e9c896eb213a6/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

- [Improve JS performance](https://freecodecamp.org/news/immutable-javascript-improve-application-performance/)
<!-- TODO: /freecodecamp.org/immutable-javascript-improve-application-performance.md -->

:::