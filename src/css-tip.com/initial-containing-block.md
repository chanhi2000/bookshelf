---
lang: en-US
title: "Default behavior of position absolute"
description: "Article(s) > Default behavior of position absolute"
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
      content: "Article(s) > Default behavior of position absolute"
    - property: og:description
      content: "Default behavior of position absolute"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/initial-containing-block.html
prev: /programming/css/articles/README.md
date: 2024-09-30
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/066f6562.png
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
  name="Default behavior of position absolute"
  desc="Know the meaning of initial containing block and its relation with position absolute"
  url="https://css-tip.com/initial-containing-block/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/066f6562.png"/>

Many have a wrong information about the default behavior of `position: absolute` element.

*"if an absolute positioned element has no positioned ancestors, it uses the body element"* NO, **this is false!**

The W3Schools page is showing a wrong information but the MDN page is showing the correct one.

![](https://css-tip.com/img/FbqacAZUzf-512.webp)

What is the [<VPIcon icon="iconfont icon-w3c"/>initial containing block](https://w3.org/TR/CSS22/visudet.html#containing-block-details)?

It's a rectangle having the same dimension as the viewport (full width/height) and anchored at the canvas origin (moves on scroll). In other words, it's similar to the viewport but moves if we have scrolling.

Here is a demo to illustrate:

<CodePen
  user="t_afif"
  slug-hash="bGXVMjp"
  title="Default behavior of position: absolute"
  :default-tab="['css','result']"
  :theme="dark"/>

The absolute element is not using the body (blue rectangle) nor the html (red rectangle) but that green rectangle having the viewport dimension and moving on scroll. That's the initial containing block!

---

## More CSS Tips

- [**Inner display vs Outer display**](/css-tip.com/inner-outer-display.md) Learn the modern way to use the display property. October 16, 2024
- [**Puzzle shapes using CSS mask**](/css-tip.com/puzzle-shape.md) A few lines of code to craft different puzzle shapes. October 09, 2024
- [**Remove the unit from any CSS value**](/css-tip.com/length-to-integer.md) A hacky CSS trick to transform an length value into an integer. September 19, 2024
- [**Update CSS variables using range slider**](/css-tip.com/css-variables-range-slider.md) A CSS-only way to update CSS variables in real time using range slider. September 16, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Default behavior of position absolute",
  "desc": "Know the meaning of initial containing block and its relation with position absolute",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/initial-containing-block.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
