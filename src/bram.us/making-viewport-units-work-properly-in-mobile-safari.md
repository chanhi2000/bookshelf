---
lang: en-US
title: "Making viewport units work properly in Mobile Safari"
description: "Article(s) > Making viewport units work properly in Mobile Safari"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - bram.us
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Making viewport units work properly in Mobile Safari"
    - property: og:description
      content: "Making viewport units work properly in Mobile Safari"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/making-viewport-units-work-properly-in-mobile-safari.html
prev: /programming/css/articles/README.md
date: 2016-09-12
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: 
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

```component VPCard
{
  "title": "Making viewport units work properly in Mobile Safari",
  "desc": "A typical issue with the well supported Viewport Relative Units (you know: vh, vw, vmin, and vmax) that bothers me a lot is that MobileSafari (Safari on iOS) takes the height of the address bar into account for 100vh. Take a look at the footer of that first block in the screenshot below: since its … Continue reading ”Making viewport units work properly in Mobile Safari”",
  "link": "https://bram.us/bram.us/2016/09/12/making-viewport-units-work-properly-in-mobile-safari/",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

A typical issue with the [<VPIcon icon="iconfont icon-caniuse"/>well supported](http://caniuse.com/#feat=viewport-units) Viewport Relative Units (you know: `vh`, `vw`, `vmin`, and `vmax`) that bothers me a lot is that MobileSafari (Safari on iOS) takes the height of the address bar into account for `100vh`.

Take a look at the footer of that first block in the screenshot below: since its container exceeds 100% of the viewport’s height – even though said container is set to be `100vh` in height – the date at the bottom bleeds out of the viewport:

![viewport-units-buggyfill-without](https://bram.us/wordpress/wp-content/uploads/2016/09/viewport-units-buggyfill-without.png)

Viewport Units Buggyfill is a script that fixes that kind of bad browser implementations. With Viewport Units Buggyfill applied, all is fine and dandy:

![viewport-units-buggyfill-with](https://bram.us/wordpress/wp-content/uploads/2016/09/viewport-units-buggyfill-with.png)

Next to initializing the script on load, on also needs to listen for the `resize` event in case – for example – the tabs bar get shown/hidden.

```js
import * as viewportUnitsBuggyfill from 'viewport-units-buggyfill';

// …

// Initialize viewportUnitsBuggyfill
viewportUnitsBuggyfill.init();

// Also hook viewportUnitsBuggyfill to resize event (if it was initialized)
if (document.getElementById('patched-viewport')) {
    window.addEventListener('resize', viewportUnitsBuggyfill.refresh, true);
}
```

<SiteInfo
  name="rodneyrehm/viewport-units-buggyfill"
  desc="Making viewport units (vh|vw|vmin|vmax) work properly in Mobile Safari."
  url="https://github.com/rodneyrehm/viewport-units-buggyfill/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/acd052614af4b5daa89ff33df4c15f813bfe125b951c06d16bb230663a66ab9e/rodneyrehm/viewport-units-buggyfill"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Making viewport units work properly in Mobile Safari",
  "desc": "A typical issue with the well supported Viewport Relative Units (you know: vh, vw, vmin, and vmax) that bothers me a lot is that MobileSafari (Safari on iOS) takes the height of the address bar into account for 100vh. Take a look at the footer of that first block in the screenshot below: since its … Continue reading ”Making viewport units work properly in Mobile Safari”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/making-viewport-units-work-properly-in-mobile-safari.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
