---
lang: en-US
title: "Calculate the scroll progress of an arbitrary element"
description: "Article(s) > Calculate the scroll progress of an arbitrary element"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tip.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Calculate the scroll progress of an arbitrary element"
    - property: og:description
      content: "Calculate the scroll progress of an arbitrary element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/scroll-progress-2.html
prev: /programming/css/articles/README.md
date: 2024-07-24
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/d8e58a3d.png
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
  name="Calculate the scroll progress of an arbitrary element"
  desc="A few lines of CSS to get the scroll progress of any element in the page"
  url="https://css-tip.com/scroll-progress-2/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/d8e58a3d.png"/>

The same code of [**the previous trick**](/css-tip.com/scroll-progress.md) can also be used to get the scroll progress of any element on the page. The only difference is the use of `self` inside the `scroll()` value.

```css
@property --s {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0; 
}
.scroll {
  animation: scroll 1s linear;
  animation-timeline: scroll(self);
}
@keyframes scroll {
  to {--s: 100}
}

.scroll:before {
  content: "Scroll Progress: " counter(s) "%";
  counter-reset: s var(--s);
}
```

<CodePen
  user="t_afif"
  slug-hash="qBzaOdP"
  title="CSS only scroll progress II"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Get the width of the scrollbar using only CSS**](/css-tip.com/scrollbar-width.md) Using modern CSS features to get the scrollbar width as a CSS variable. July 31, 2024
- [**Count the number of lines inside a text**](/css-tip.com/count-lines.md) A CSS-only solution to count the lines of text. July 29, 2024
- [**Manual typography using Scroll-driven animations**](/css-tip.com/manual-typography.md) Use a range slider to manually adjust the font-size of your website (100% CSS). July 18, 2024
- [**Typed CSS variables using @property**](/css-tip.com/typed-variables.md) Upgrade your CSS variables by registring them using the @property. July 17, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Calculate the scroll progress of an arbitrary element",
  "desc": "A few lines of CSS to get the scroll progress of any element in the page",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/scroll-progress-2.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
