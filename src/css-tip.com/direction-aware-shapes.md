---
lang: en-US
title: "Direction-Aware CSS Shapes"
description: "Article(s) > Direction-Aware CSS Shapes"
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
      content: "Article(s) > Direction-Aware CSS Shapes"
    - property: og:description
      content: "Direction-Aware CSS Shapes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/direction-aware-shapes.html
prev: /programming/css/articles/README.md
date: 2025-11-27
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/fdbb0128.png
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
  name="Direction-Aware CSS Shapes"
  desc="A few lines of code to make any CSS shape adjust according to the direction of the text"
  url="https://css-tip.com/direction-aware-shapes/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/fdbb0128.png"/>

Building on [**the previous idea**](/css-tip.com/arrow.md), here is a more generic piece of code to make any CSS shape direction-aware. It relies on a few lines of well-supported CSS code.

![Direct-aware CSS-only shapes](https://css-tip.com/img/gYAHXQNuO8-1006.png)

```css
.shape {
  position: relative;
  overflow: hidden;
}
.shape:before,
.shape:after {
  content: "";
  position: absolute;
  width: 100%;
  inset-block: 0;
  translate: 100%;
  /* Build your shape using whatever you want
    clip-path: ...;
    mask: ...;
    background: url(...);
    content: "👉";
  */
}
.shape:before {
  inset-inline-end: 100%;
}
.shape:after {
  inset-inline-start: 100%;
  scale: -1 1;
}
```

Here are a few examples of shapes, mostly taken from [<VPIcon icon="fas fa-globe"/>css-shape.com](https://css-shape.com/). Adjust the direction and see how they behave:

<CodePen
  user="t_afif"
  slug-hash="xbVjbzY"
  title="Direction-aware CSS shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How Does It Work?

First, we create the shape using both pseudo-elements, which results in the same shape appearing twice.

```css
.shape {
  position: relative;
}
.shape:before,
.shape:after {
  content: "";
  position: absolute;
  width: 100%;
  inset-block: 0;
  clip-path: polygon(0 0,100% 50%,0 100%);
}
```

Then, we place one pseudo-element with `inset-inline-end: 100%` and the other with `inset-inline-start: 100%`. Depending on the direction, they will get mapped to either `left: 100%` or `right: 100%`. We invert one of the shapes using `scale: -1 1`.

![Overview of the shapes position](https://css-tip.com/img/gSDHW4aaAM-1102.png)

Both shapes are outside the element boundary, and they swap their position according to the direction. We translate both of them to the right using `translate: 100%` so that only one shape is inside the element boundary.

![Showing one css shape at once](https://css-tip.com/img/-s2_6b37zJ-1039.png)

We hide the overflow, and it's done!

::: info More CSS Tips

- [**Fizz Buzz using Modern CSS (no HTML)**](/css-tip.com/fizz-buzz.md) A fun experiment using modern CSS to create the classic Fizz Buzz. December 06, 2025
- [**The Hidden Selectors of The HTML Element**](/css-tip.com/root-selectors.md) Discover alternative selectors for the html element beyond the classic :root{} and html{}. December 04, 2025
- [**Dynamic Tooltip Position with Anchor Positioning IV**](/css-tip.com/tooltip-anchor-4.md) A tooltip with a stretchy arrow that follows its anchor. November 20, 2025
- [**Responsive Circular List of Stacked/Overlapping Images**](/css-tip.com/responsive-stacked-img-2.md) Images placed around a circle with a slight overlap and a nice hover effect. November 18, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Direction-Aware CSS Shapes",
  "desc": "A few lines of code to make any CSS shape adjust according to the direction of the text",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/direction-aware-shapes.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
