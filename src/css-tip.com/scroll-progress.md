---
lang: en-US
title: "Calculate the scroll progress of the page"
description: "Article(s) > Calculate the scroll progress of the page"
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
      content: "Article(s) > Calculate the scroll progress of the page"
    - property: og:description
      content: "Calculate the scroll progress of the page"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/scroll-progress.html
prev: /programming/css/articles/README.md
date: 2024-07-23
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/24d4986f.png
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
  name="Calculate the scroll progress of the page"
  desc="A few lines of CSS to get the scroll progress of the page inside a CSS variable"
  url="https://css-tip.com/scroll-progress/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/24d4986f.png"/>

Get the scroll progress of the page as a CSS variable using a few lines of code

- Powered by Scroll-Driven animations
- Defined at the `:root` level (avaiable to all the elements)
- Typed using @property
- You can easily use it within any formula

```css
@property --s {
  syntax: '<integer>';
  inherits: true;
  initial-value: 0; 
}
:root {
  animation: scroll 1s linear;
  animation-timeline: scroll();
}
@keyframes scroll {
  to {--s: 100}
}

element:before {
  content: counter(s) "%";
  counter-reset: s var(--s);
}
```

<CodePen
  user="t_afif"
  slug-hash="dyBXjYe"
  title="CSS only scroll progress "
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Count the number of lines inside a text**](/css-tip.com/count-lines.md) A CSS-only solution to count the lines of text. July 29, 2024
- [**Get the width & height of any element without JavaScript**](/css-tip.com/element-dimension.md) Using modern CSS to get the size of any element as CSS variables. July 26, 2024
- [**Typed CSS variables using @property**](/css-tip.com/typed-variables.md) Upgrade your CSS variables by registring them using the @property. July 17, 2024
- [**Get the screen width & height without JavaScript**](/css-tip.com/screen-dimension.md) A few lines of CSS to get the screen width/height as integer values. July 16, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Calculate the scroll progress of the page",
  "desc": "A few lines of CSS to get the scroll progress of the page inside a CSS variable",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/scroll-progress.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
