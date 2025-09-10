---
lang: en-US
title: "Place CSS in the Head and JavaScript Files at the Bottom"
description: "Article(s) > (5/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (5/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Place CSS in the Head and JavaScript Files at the Bottom"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/place-css-in-the-head-and-javascript-files-at-the-bottom.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-place-css-in-the-head-and-javascript-files-at-the-bottom"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

- CSS execution blocks rendering and prevents JS execution
- JS loading and execution block HTML parsing and prevent CSSOM construction

If these CSS and JS tags are placed in the HEAD tag, and they take a long time to load and parse, then the page will be blank. So you should place JS files at the bottom (not blocking DOM parsing but will block rendering) so that HTML parsing is completed before loading JS files. This presents the page content to the user as early as possible.

So then you might be wondering - why should CSS files still be placed in the head?

Because loading HTML first and then loading CSS will make users see an unstyled, "ugly" page at first glance. To avoid this situation, place CSS files in the head.

You can also place JS files in the head as long as the script tag has the defer attribute, which means asynchronous download and delayed execution.

::: tip Here's an example of optimal placement:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Optimized Resource Loading</title>

  <!-- CSS in the head for faster rendering -->
  <link rel="stylesheet" href="styles.css">

  <!-- Critical JS that must load early can use defer -->
  <script defer src="critical.js"></script>
</head>
<body>
  <header>
    <h1>My Website</h1>
    <!-- Page content here -->
  </header>

  <main>
    <p>Content that users need to see quickly...</p>
  </main>

  <footer>
    <!-- Footer content -->
  </footer>

  <!-- Non-critical JavaScript at the bottom -->
  <script src="app.js"></script>
  <script src="analytics.js"></script>
</body>
</html>
```

**Explanation of this approach:**

1. **CSS in the** `<head>`: Ensures the page is styled as soon as it renders, preventing the "flash of unstyled content" (FOUC). CSS is render-blocking, but that's actually what we want in this case.
2. **Critical JS with** `defer`: The `defer` attribute tells the browser to:
    - Download the script in parallel while parsing HTML
    - Only execute the script after HTML parsing is complete but before the `DOMContentLoaded` event
    - Maintain the order of execution if there are multiple deferred scripts
3. **Non-critical JS before closing** `</body>`: Scripts without special attributes will:
    - Block HTML parsing while they download and execute
    - By placing them at the bottom, we ensure that all the important content is parsed and displayed first
    - This improves perceived performance even if the total load time is the same

:::

You can also use `async` for scripts that don't depend on DOM or other scripts:

```html
<script async src="independent.js"></script>
```

The `async` attribute will download the script in parallel and execute it as soon as it's available, which may interrupt HTML parsing. Use this only for scripts that don't modify the DOM or depend on other scripts.

::: info Reference:

<SiteInfo
  name="JavaScript: Adding interactivity - Learn web development | MDN"
  desc="JavaScript is a programming language that adds interactivity to websites. You can use it to control just about anything — form data validation, button functionality, game logic, dynamic styling, animation updates, and much more. This article gets you started with JavaScript and walks you through adding some fun features to your first website."
  url="https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::