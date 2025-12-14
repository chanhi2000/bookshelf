---
lang: en-US
title: "Alignment in Anchor Positioning using position-area"
description: "Article(s) > Alignment in Anchor Positioning using position-area"
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
      content: "Article(s) > Alignment in Anchor Positioning using position-area"
    - property: og:description
      content: "Alignment in Anchor Positioning using position-area"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/position-area.html
prev: /programming/css/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/72383bea.png
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
  name="Alignment in Anchor Positioning using position-area"
  desc="An interactive demo to understand how to control the alignment using the position-area property"
  url="https://css-tip.com/position-area/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/72383bea.png"/>

The `position-area` property allows you to control the placement of an absolutely positioned element relative to its anchor box. It considers a 3x3 grid defined by the **containing block** of the absolutely positioned element and the **edges** of the anchor box.

```css
.anchor {
  anchor-name: --a;
}
.element {
  position: absolute;
  position-anchor: --a;
}
```

![Overview of the position-area grid](https://css-tip.com/img/GYA0z71b7j-1195.png)

You can select an area that consists of one or more adjacent cells of the grid. That area becomes the **new containing block** of the absolutely positioned element where it's aligned.

Here is an interactive demo where you can select an area from among all 36 possibilities and get its code. You can also drag the anchor element and see how the grid behaves.

<!-- TODO: iframe 또는 codesandbox로 구현 -->

I am using a stretch alignment to illustrate the different areas, but you can change it to place the element wherever you want within the selected area.

The `normal` value is the default value and has an interesting behavior. It places the element as close as possible to the anchor, which is what you will want in 90% of cases, so you will rarely need to update the alignment.

The `anchor-center` is a special value different from `center`. `center` considers the center of the selected area, while `anchor-center` considers the center of the anchor in the relevant axis.

![Center vs anchor-center](https://css-tip.com/img/v91iC4zsqM-975.png)

`anchor-center` is a [**safe alignment value**](/css-tip.com/safe-align.md). If centering is not possible, the element will shift to remain within the selected area.

More details about alignment: [<VPIcon icon="fas fa-globe"/>The Fundamentals of CSS Alignment](https://css-tip.com/explore/alignment/)

---

## More CSS Tips

- [**Responsive List of Stacked/Overlapping Images**](/css-tip.com/responsive-stacked-img.md) A few lines of modern CSS to create a horizontal list of responsive stacked images. November 13, 2025
- [**The Universal Focus Ring**](/css-tip.com/universal-focus.md) Using anchor positioning to create a fancy focus ring that travels the whole page. November 07, 2025
- [**Conditional Border Radius with Modern CSS**](/css-tip.com/conditional-border-radius.md) A simple trick to control the border-radius based on the screen/container size. October 10, 2025
- [**Dynamic Tooltip Position with Anchor Positioning**](/css-tip.com/tooltip-anchor.md) A tootlip that follows its anchor while adjusting the position of its tail. October 06, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Alignment in Anchor Positioning using position-area",
  "desc": "An interactive demo to understand how to control the alignment using the position-area property",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/position-area.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
