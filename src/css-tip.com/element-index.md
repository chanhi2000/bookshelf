---
lang: en-US
title: "Get the index of an element within its parent"
description: "Article(s) > Get the index of an element within its parent"
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
      content: "Article(s) > Get the index of an element within its parent"
    - property: og:description
      content: "Get the index of an element within its parent"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/element-index.html
prev: /programming/css/articles/README.md
date: 2025-07-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/4b45ceec.png
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
  name="Get the index of an element within its parent"
  desc="A native CSS function to get the index of an element among its siblings within a parent element"
  url="https://css-tip.com/element-index/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/4b45ceec.png"/>

With CSS, you can use the new `sibling-index()` function to get the position of any element relative to all its sibling elements. You can also rely on `sibling-count()` to get the number of siblings.

The results are also available within pseudo-elements.

```html
<div class="container">
  <div></div>
  <div></div>
  <div></div>
  ...
</div>
```

```css
.container div { 
  border: calc(sibling-index()*2px) solid;
  opacity: calc(sibling-index()/sibling-count());
}
.container div::before {
  content: counter(i) "/" counter(N);
  counter-reset: N sibling-count() i sibling-index() /* they refer to the div element */
}
```

<CodePen
  user="t_afif"
  slug-hash="pvjowwj"
  title="sibling-index() / sibling-count()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The functions are a bit verbose, so we can create our custom functions and write less code.

```css
@function --N() {
  result: sibling-count();
}
@function --i() {
  result: calc(sibling-index() - 1); /* we can change and start from 0 instead of 1 */
}

.container div { 
  border: calc(--i()*2px) solid;
  opacity: calc(--i()/--N());
}
.container div::before {
  content: counter(i) "/" counter(N);
  counter-reset: N --N() i --i() 
}
```

:: note ⚠️ Limited support (Chrome only for now)

<CodePen
  user="t_afif"
  slug-hash="EaVxmrK"
  title="sibling-index() / sibling-count() + custom functions"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

---

## More CSS Tips

- [**Responsive Infinite Logo Marquee**](/css-tip.com/logo-marquee.md) Use modern CSS and a few lines of code to create an infinite scroll animation. July 29, 2025
- [**How to place images around a circle**](/css-tip.com/images-circle.md) A simple CSS code to correctly place a set of images (or any elements) around a circle. July 17, 2025
- [**Dots loader using shape()**](/css-tip.com/dots-loader.md) A classic 3 dots loader created using the new shape(). June 24, 2025
- [**The future of hexagon shapes**](/css-tip.com/hexagon.md) A new way to easily create hexagon shapes using corner-shape. June 12, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Get the index of an element within its parent",
  "desc": "A native CSS function to get the index of an element among its siblings within a parent element",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/element-index.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
