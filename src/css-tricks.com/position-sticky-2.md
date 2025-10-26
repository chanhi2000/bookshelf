---
lang: en-US
title: "position: sticky;"
description: "Article(s) > position: sticky;"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > position: sticky;"
    - property: og:description
      content: "position: sticky;"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/position-sticky-2.html
prev: /programming/css/articles/README.md
date: 2017-06-21
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="position: sticky;"
  desc="Better position: sticky; support is on the horizon. WebKit dropped in 2013, Firefox in 2014, and now Blink in (probably) 2016."
  url="https://css-tricks.com/position-sticky-2"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

Better `position: sticky;` support is [<VPIcon icon="iconfont icon-caniuse"/>on the horizon](http://caniuse.com/#feat=css-sticky). WebKit dropped in 2013, Firefox in 2014, and now Blink in (probably) 2016. [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position#Sticky_positioning) explains it well:

::: info MDN (<VPIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>)

> Sticky positioning is a hybrid of relative and fixed positioning. The element is treated as relative positioned until it crosses a specified threshold, at which point it is treated as fixed positioned.

<SiteInfo
  name="position - CSS | MDN"
  desc="The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left physical properties and the inset-block-start, inset-block-end, inset-inline-start, and inset-inline-end flow-relative logical properties can be used to determine the final location of positioned elements."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/position/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

Šime Vidas pointed this out in a recent [<VPIcon icon="fas fa-globe"/>Open Web Platform Daily Digest](https://webplatformdaily.org/), and ported over the demo from MDN, which demonstrates the usefulness nicely:

<CodePen
  user="simevidas"
  slug-hash="JbdJRZ"
  title="Sticky positioning"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

As you can see in that demo, it’s a decent candidate for progressive enhancement, as if you don’t see the sticky header feature, it’s no big deal.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "position: sticky;",
  "desc": "Better position: sticky; support is on the horizon. WebKit dropped in 2013, Firefox in 2014, and now Blink in (probably) 2016.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/position-sticky-2.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
