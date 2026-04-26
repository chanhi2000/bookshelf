---
lang: en-US
title: "Using Intersection Observers"
description: "Article(s) > Using Intersection Observers"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - bram.us
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using Intersection Observers"
    - property: og:description
      content: "Using Intersection Observers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/using-intersection-observers.html
prev: /programming/js/articles/README.md
date: 2017-08-04
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2017/08/Blank-Diagram-Page-1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using Intersection Observers"
  desc="With the Intersection Observer coming to Firefox, a nice article covering it appeared on Mozilla Hacks. The IntersectionObserver interface of the Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document’s viewport. To use it, create a new instance … Continue reading ”Using Intersection Observers”"
  url="https://bram.us/2017/08/03/using-intersection-observers/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2017/08/Blank-Diagram-Page-1.png"/>

With the Intersection Observer coming to Firefox, a nice article covering it appeared on Mozilla Hacks.

> The `IntersectionObserver` interface of the Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document’s viewport.

To use it, create a new instance of `IntersectionObserver`, and then let it observe a given element (`target`):

```js
let observer = new IntersectionObserver((entries, observer) => { /* … */});
observer.observe(target); // <-- Element to watch
```

Here's a demo pen:

<CodePen
  user="callahad"
  slug-hash="YxXpyN"
  title="Hello IntersectionObserver"
  :default-tab="['css','result']"
  :theme="dark"/>

To not watch the `target`'s relation to the viewport, but to another element, use the `root` option.

```js
let observer = new IntersectionObserver((entries, observer) => { /* … */}, {
   root: parentElement,
});
observer.observe(target); // <-- Element to watch
```

Works in Edge 15, Chrome 51, and soon Firefox 55. For browsers that don't support it you can use a polyfill.

::: info

<SiteInfo
  name="Intersection Observer comes to Firefox – Mozilla Hacks - the Web developer blog"
  desc="What do infinite scrolling, lazy loading, and online advertisements all have in common? They need to know about—and react to—the visibility of elements on a page! Unfortunately, knowing whether or ..."
  url="https://hacks.mozilla.org/2017/08/intersection-observer-comes-to-firefox/"
  logo="https://hacks.mozilla.org/favicon.ico"
  preview="https://hacks.mozilla.org/wp-content/themes/Hax/img/hacks-meta-image.jpg"/>

<SiteInfo
  name="w3c/IntersectionObserver"
  desc="Intersection Observer."
  url="https://github.com/w3c/IntersectionObserver/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e0ccc8650c6c0a782fad422e2667ff232a49dad9095b7e2ca6ef0733c80f5842/w3c/IntersectionObserver"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using Intersection Observers",
  "desc": "With the Intersection Observer coming to Firefox, a nice article covering it appeared on Mozilla Hacks. The IntersectionObserver interface of the Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document’s viewport. To use it, create a new instance … Continue reading ”Using Intersection Observers”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/using-intersection-observers.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
