---
lang: en-US
title: "Use Rules Reasonably, Avoid Over-Optimization"
description: "Article(s) > (24/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (24/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use Rules Reasonably, Avoid Over-Optimization"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/use-rules-reasonably-avoid-over-optimization.html
next: /freecodecamp.org/the-front-end-performance-optimization-handbook/README.md#conclusion
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-rules-reasonably-avoid-over-optimization"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

Performance optimization is mainly divided into two categories:

1. Load-time optimization
2. Runtime optimization

Of the 23 suggestions above, the first 10 belong to load-time optimization, and the last 13 belong to runtime optimization. Usually, there's no need to apply all 23 performance optimization rules. It's best to make targeted adjustments based on the website's user group, saving effort and time.

Before solving a problem, you need to identify the problem first, otherwise you won't know where to start. So before doing performance optimization, it's best to investigate the website's loading and running performance.

---

## Check Loading Performance

A website's loading performance mainly depends on white screen time and first screen time.

- White screen time: The time from entering the URL to when the page starts displaying content.
- First screen time: The time from entering the URL to when the page is completely rendered.

You can get the white screen time by placing the following script before `</head>`.

```html
<script>
  new Date() - performance.timing.navigationStart
  // You can also use domLoading and navigationStart
  performance.timing.domLoading - performance.timing.navigationStart
</script>
```

You can get the first screen time by executing `new Date() - performance.timing.navigationStart` in the `window.onload` event.

---

## Check Runtime Performance

With Chrome's developer tools, we can check the website's performance during runtime.

Open the website, press F12 and select performance, click the gray dot in the upper left corner, it turns red to indicate it has started recording. At this point, you can simulate users using the website, and after you're done, click stop, then you'll see the website's performance report during the runtime.

If there are red blocks, it means there are frame drops. If it's green, it means the FPS is good. For detailed usage of performance, you can search using a search engine, as the scope is limited.

By checking the loading and runtime performance, I believe you already have a general understanding of the website's performance. So what you need to do now is to use the 23 suggestions above to optimize your website. Go for it!

::: info References:

<SiteInfo
  name="PerformanceTiming: navigationStart property - Web APIs | MDN"
  desc="The legacy PerformanceTiming.navigationStart read-only property returns an unsigned long long representing the moment, in milliseconds since the UNIX epoch, right after the prompt for unload terminates on the previous document in the same browsing context. If there is no previous document, this value will be the same as PerformanceTiming.fetchStart."
  url="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/navigationStart/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::