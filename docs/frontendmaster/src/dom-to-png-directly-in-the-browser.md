---
lang: en-US
title: "DOM to PNG Directly in the Browser"
description: "Article(s) > DOM to PNG Directly in the Browser"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > DOM to PNG Directly in the Browser"
    - property: og:description
      content: "DOM to PNG Directly in the Browser"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/dom-to-png-directly-in-the-browser.html
prev: /programming/css/articles/README.md
date: 2024-03-13
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/1232
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="DOM to PNG Directly in the Browser"
  desc="You could design something on the web then take a screenshot of it. That is, in a basic sense, converting DOM to PNG. But a screenshot is rather manual and finicky. If you had to do this over and over, or you needed a very exact size (like a social media card), you can actually…"
  url="https://blog.master.dev/dom-to-png-directly-in-the-browser/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/1232"/>

You could design something on the web then take a screenshot of it. That is, in a basic sense, converting DOM to PNG. But a screenshot is rather manual and finicky. If you had to do this over and over, or you needed a very exact size (like a social media card), you can actually produce a PNG right from the browser with the click of a button. No backend service needed, like [<VPIcon icon="iconfont icon-playwright"/>Puppeteer](https://pptr.dev/) or [<VPIcon icon="iconfont icon-playwright"/>Playwright](https://playwright.dev/) which are often thought of for this type of automatic screenshotting job.

The trick is that you can render DOM to a `<canvas>`, thanks to the very fancy [<VPIcon icon="iconfont icon-github"/>`niklasvh/html2canvas`](https://github.com/niklasvh/html2canvas) library. Then you can use `.toDataURL()` to get it into PNG format and ultimately download it. [I always reference Andrew Walpole’s Pen (<VPIcon icon="fa-brands fa-codepen"/>`walpolea`)](https://codepen.io/walpolea/pen/wvmELrN) to see it done, which also happens to be a rather elegant [Petite Vue (<VPIcon icon="iconfont icon-github"/>`vuejs/petite-vue`)](https://github.com/vuejs/petite-vue) example, and the `contenteditable` usage is a clever way to make it even more usable.

<CodePen
  user="anon"
  slug-hash="wvmELrN"
  title="Blog Post Featured Image Generator with contenteditable Magic"
  :default-tab="['css','result']"
  :theme="dark"/>

```component VPCard
{
  "title": "Writing to the Clipboard in JavaScript",
  "desc": "The most basic use case, writing a bit of text to the user's clipboard, is mercifully easy. But there is plenty more to know. Did you know writing image data to the clipboard ONLY works with PNG?",
  "link": "/blog.master.dev/writing-to-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "How to Favicon in 2024",
  "desc": "Andrey Sitnik does a good job each year investigating what websites actually need in terms of doing the best we can for site favicons. The 2024 edition is out, and it looks like this: …",
  "link": "/blog.master.dev/how-to-favicon-in-2024.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Icônes",
  "desc": "Icônes is an amazing icon resource site. There are tens of thousands of free-to-use icons which are easy to browse and find. Export or copy in SVG, PNG, or as a component in many popular frameworks. https://icones.js.org/",
  "link": "/blog.master.dev/icones.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "DOM to PNG Directly in the Browser",
  "desc": "You could design something on the web then take a screenshot of it. That is, in a basic sense, converting DOM to PNG. But a screenshot is rather manual and finicky. If you had to do this over and over, or you needed a very exact size (like a social media card), you can actually…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/dom-to-png-directly-in-the-browser.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
