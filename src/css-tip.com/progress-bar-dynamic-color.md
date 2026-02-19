---
lang: en-US
title: "Progress bar with dynamic coloration"
description: "Article(s) > Progress bar with dynamic coloration"
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
      content: "Article(s) > Progress bar with dynamic coloration"
    - property: og:description
      content: "Progress bar with dynamic coloration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/progress-bar-dynamic-color.html
prev: /programming/css/articles/README.md
date: 2021-11-15
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/13cc9256.png
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
  name="Progress bar with dynamic coloration"
  desc="Create a scrolling shadow effect using only CSS gradients"
  url="https://css-tip.com/progress-bar-dynamic-color/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/13cc9256.png"/>

Create a CSS-only progress bar with a dynamic coloration. The color change based on the value

- No JavaScript
- No specific CSS selector

![progress bar with dynamic coloration](https://css-tip.com/img/NFetG98fqb-296.png)

```css
progress[value] {
  --w: 200px; /* The width */
  /* The background property */
  --b: /* static layers */
      linear-gradient(#fff8,#fff0),
      repeating-linear-gradient(135deg,#0003 0 10px,#0000 0 20px),
      /* dynamic layers */
      /* if < 30% "red" */
      conic-gradient(red    0 0) 0 /calc(var(--w)*.3 - 100%) 1%,
      /* if < 60% "orange" */
      conic-gradient(orange 0 0) 0 /calc(var(--w)*.6 - 100%) 1%,
      /* else "green" */
      green;
  width: var(--w); 
}
progress[value]::-webkit-progress-value {
  background: var(--b);
}
progress[value]::-moz-progress-bar {
  background: var(--b);
}
```

<CodePen
  user="t_afif"
  slug-hash="dyzgwOa"
  title="CodePen Embed"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Multi-line text decoration**](/css-tip.com/multi-line-text-decoration.md) Use CSS gradients to decorate your text. November 30, 2021
- [**Circular dashed border**](/css-tip.com/dashed-rounded-border.md) Use mask and gradient to create a fancy dashed border. November 25, 2021
- [**CSS-only plus/cross icon**](/css-tip.com/css-plus-symbol.md) Use one element and one gradient to create a plus/cross icon. November 04, 2021
- [**Corner-only border around an image**](/css-tip.com/corner-only-border.md) Use CSS gradient and mask to create a Corner-only border around your image. November 03, 2021

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Progress bar with dynamic coloration",
  "desc": "Create a scrolling shadow effect using only CSS gradients",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/progress-bar-dynamic-color.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
