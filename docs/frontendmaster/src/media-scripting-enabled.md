---
lang: en-US
title: "@media (scripting: enabled)"
description: "Article(s) > @media (scripting: enabled)"
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
      content: "Article(s) > @media (scripting: enabled)"
    - property: og:description
      content: "@media (scripting: enabled)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/media-scripting-enabled.html
prev: /programming/css/articles/README.md
date: 2023-12-14
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/267
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
  name="@media (scripting: enabled)"
  desc="Ahmad Shadeed: Today I learned about the media scripting feature. It's about detecting JS support via a CSS media query. Soon, we won't need the .no-js or .js classes once this is widely available. Currently supported in Chrome 120, Firefox 119, Safari 17. Tweet…"
  url="https://blog.master.dev/media-scripting-enabled/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/267"/>

Ahmad Shadeed:

::: info Ahmad Shadeed *From X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>shadeed9</code>)

> Today I learned about the media scripting feature. It’s about detecting JS support via a CSS media query. Soon, we won’t need the `.no-js` or `.js` classes once this is widely available. Currently supported in Chrome 120, Firefox 119, Safari 17.

<SiteInfo
  name="X에서 Ahmad Shadeed(@shadeed9) 님"
  desc="🤯 Today I learned about the media scripting feature. It's about detecting JS support via a CSS media query. Soon, we won't need the `.no-js` or `.js` classes once this is widely available. Currently supported in Chrome 120, Firefox 119, Safari 17."
  url="https://x.com/shadeed9/status/1726851509634441259"
  logo="https://x.com/favicon.ico"
  preview="https://pbs.twimg.com/media/F_cBMRvW0AACD9A?format=webp&name=large"/>

:::

```css
@media (scripting: enabled) {
  /* JavaScript is supported */
  :root {
    --js-supported: inline-flex;
  }
}
```

We used to put a class like `no-js` on the HTML element:

```html
<html class="no-js">
```

Then remove it or swap it out with a line of JavaScript, depending on if you needed to write styles for a situation where a user did or didn’t have JavaScript enabled.

```js
document.documentElement.classList.remove("no-js");
```

The `@media` query is now cleaner as it doesn’t require JavaScript, you can do it all in CSS.

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/06/Screenshot-2026-06-09-at-5.07.38-PM.png?fit=1146%2C622&quality=80&ssl=1&resize=350%2C200)](https://blog.master.dev/reduce-the-js-workload-with-no-or-lo-js-options/ "Reduce the JS Workload with No- or Lo-JS options")

#### [Reduce the JS Workload with No- or Lo-JS options](https://blog.master.dev/reduce-the-js-workload-with-no-or-lo-js-options/ "Reduce the JS Workload with No- or Lo-JS options")

Aaron T. Grogg has a nice page chock full of examples of UI, which used to be the sort of thing that we'd use JavaScript for, but can now be done in HTML & CSS. No hate: I have nothing against JS, but it has better things to do The…

```component VPCard
{
  "title": "Frontend to Fullstack Monthly #13 – How should masonry work in CSS?",
  "desc": "We’re back with Frontend to Fullstack Monthly – new courses, updates, and all the industry’s latest news! From Boost this month Boost has been busy this month bringing you articles on all sorts of web platform features and news. We’ve also shipped a freshened up design, leaning into GitHub’s open source Mona Sans, a variable font…",
  "link": "/blog.master.dev/frontend-to-fullstack-13.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "A Progressive Enhancement Challenge",
  "desc": "You want to hide an interactive element that you don't need anymore after JavaScript loads/runs. Can you do it without a ",
  "link": "/blog.master.dev/a-progressive-enhancement-challenge.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "@media (scripting: enabled)",
  "desc": "Ahmad Shadeed: Today I learned about the media scripting feature. It's about detecting JS support via a CSS media query. Soon, we won't need the .no-js or .js classes once this is widely available. Currently supported in Chrome 120, Firefox 119, Safari 17. Tweet…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/media-scripting-enabled.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
