---
lang: en-US
title: "Reduce the Complexity of CSS Selectors"
description: "Article(s) > (21/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (21/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Reduce the Complexity of CSS Selectors"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/reduce-the-complexity-of-css-selectors.html
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
  "title": "The Front-End Performance Optimization Handbook - Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-reduce-the-complexity-of-css-selectors"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

## 1. When browsers read selectors, they follow the principle of reading from right to left.

Let's look at an example:

```css
#block .text p {
    color: red;
}
```

1. Find all P elements.
2. Check if the elements found in result 1 have parent elements with class name "text"
3. Check if the elements found in result 2 have parent elements with ID "block"

**Why is this inefficient?** This right-to-left evaluation process can be very expensive in complex documents. Take the selector `#block .text p` as an example:

1. The browser first finds **all** `p` elements in the document (potentially hundreds)
2. For each of those paragraph elements, it must check if any of their ancestors have the class `text`
3. For those that pass step 2, it must check if any of their ancestors have the ID `block`

This creates a significant performance bottleneck because:

- The initial selection (`p`) is very broad
- Each subsequent step requires checking multiple ancestors in the DOM tree
- This process repeats for every paragraph element

A more efficient alternative would be:

```css
#block p.specific-text {
    color: red;
}
```

This is more efficient because it directly targets only paragraphs with a specific class, avoiding checking all paragraphs

---

## 2. CSS selector priority

```css
Inline > ID selector > Class selector > Tag selector
```

Based on the above two pieces of information, we can draw conclusions:

1. The shorter the selector, the better.
2. Try to use high-priority selectors, such as ID and class selectors.
3. Avoid using the universal selector.

**Practical advice for optimal CSS selectors:**

```css
/* ❌ Inefficient: Too deep, starts with a tag selector */
body div.container ul li a.link {
    color: blue;
}

/* ✅ Better: Shorter, starts with a class selector */
.container .link {
    color: blue;
}

/* ✅ Best: Direct, single class selector */
.nav-link {
    color: blue;
}
```

Finally, I should say that according to the materials I've found, there's no need to optimize CSS selectors because the performance difference between the slowest and fastest selectors is very small.

::: info Reference:

<SiteInfo
  name="Optimizing CSS: ID Selectors and Other Myths — SitePoint"
  desc="Ivan Čurić covers the basics of CSS parsing, how to measure CSS selector performance, and how to deal with multiple render passing on dynamic pages."
  url="https://sitepoint.com/optimizing-css-id-selectors-and-other-myths//"
  logo="https://sitepoint.com/favicons/32x32.png"
  preview="https://uploads.sitepoint.com/wp-content/uploads/2017/11/1510300025optimizing-css.jpg"/>

:::