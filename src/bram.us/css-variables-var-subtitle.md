---
lang: en-US
title: "CSS Variables: var(--subtitle);"
description: "Article(s) > CSS Variables: var(--subtitle);"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Variables: var(--subtitle);"
    - property: og:description
      content: "CSS Variables: var(--subtitle);"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-variables-var-subtitle.html
prev: /programming/css/articles/README.md
date: 2016-11-13
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

[[toc]]

---

```component VPCard
{
  "title": "CSS Variables: var(--subtitle);",
  "desc": "As per usual, great talk by Lea Verou: The key takeaway about CSS Custom Properties to me is the very first one Lea mentioned: they’re just properties like the other CSS properties we already know. This means that the normal behavior of inheritance is in place, you can manipulate them from within media queries, and … Continue reading ”CSS Variables: var(--subtitle);”",
  "link": "https://bram.us/2016/11/12/css-variables-var-subtitle/",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

As per usual, great talk by Lea Verou:

<VidStack src="youtube/2an6-WVPuJU" />

The key takeaway about CSS Custom Properties to me is the very first one Lea mentioned: they’re *just* properties like the other CSS properties we already know. This means that the normal behavior of inheritance is in place, you can manipulate them from within media queries, and you can even get/set them via `style` attributes or even JavaScript:

```js
const el = document.querySelector('#my-elem');

// Get
var foo = window.getComputedStyle(el).getPropertyValue('--foo');

// Set
el.style.setProperty('--foo', newValue);
```

I’ve created pens for [the background mouse position follower (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/eBZgPB), and for [the CSS scroll indicator (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/QGNdRb?editors=1111).

<CodePen
  user="bramus"
  slug-hash="eBZgPB"
  title="CSS Variables: Follow Mouse Position"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Variables: var(--subtitle);",
  "desc": "As per usual, great talk by Lea Verou: The key takeaway about CSS Custom Properties to me is the very first one Lea mentioned: they’re just properties like the other CSS properties we already know. This means that the normal behavior of inheritance is in place, you can manipulate them from within media queries, and … Continue reading ”CSS Variables: var(--subtitle);”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-variables-var-subtitle.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
