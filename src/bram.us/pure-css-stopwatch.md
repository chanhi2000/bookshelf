---
lang: en-US
title: "Pure CSS Stopwatch ⏱️"
description: "Article(s) > Pure CSS Stopwatch ⏱️"
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
      content: "Article(s) > Pure CSS Stopwatch ⏱️"
    - property: og:description
      content: "Pure CSS Stopwatch ⏱️"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/pure-css-stopwatch.html
prev: /programming/css/articles/README.md
date: 2021-02-19
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/02/css-stopwatch.gif
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

<SiteInfo
  name="Pure CSS Stopwatch ⏱️"
  desc="Nice demo by Jhey in which he created a Pure CSS Stopwatch: See the Pen Pure CSS Working Stopwatch 😎 (@property) by Jhey (@jh3y) on CodePen. It uses a clever combination of CSS Animations, CSS Counters, and @property: Each digit gets its own CSS Animation with its own timing. Inside each animation the value of … Continue reading ”Pure CSS Stopwatch ⏱️”"
  url="https://bram.us/2021/02/19/pure-css-stopwatch/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/02/css-stopwatch.gif"/>

Nice demo by [Jhey (<VPIcon icon="fa-brands fa-x-twitter"/>`jh3yy`)](https://twitter.com/jh3yy) in which he created a Pure CSS Stopwatch:

<CodePen
  user="jh3y"
  slug-hash="jOVmJBL"
  title="Pure CSS Working Stopwatch 😎 (@property)"
  :default-tab="['css','result']"
  :theme="dark"/>

It uses a clever combination of CSS Animations, CSS Counters, and `@property`:

1. Each digit gets its own CSS Animation with its own timing.
2. Inside each animation the value of a CSS Counter is adjusted.
3. By defining those values as numbers using [**CSS `@property`**](/web.dev/at-property.md), CSS knows how how to “animate” *(read: interpolate)* the values.

The animation play state is controlled using a checkbox, [**as detailed here**](/bram.us/how-to-play-and-pause-css-animations-with-css-custom-properties.md).

::: note 💁‍♂️

CSS Counters is one of the [**9 Underutilized CSS Features**](/bram.us/9-underutilized-features-in-css.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Pure CSS Stopwatch ⏱️",
  "desc": "Nice demo by Jhey in which he created a Pure CSS Stopwatch: See the Pen Pure CSS Working Stopwatch 😎 (@property) by Jhey (@jh3y) on CodePen. It uses a clever combination of CSS Animations, CSS Counters, and @property: Each digit gets its own CSS Animation with its own timing. Inside each animation the value of … Continue reading ”Pure CSS Stopwatch ⏱️”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/pure-css-stopwatch.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
