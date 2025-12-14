---
lang: en-US
title: "How to correctly use steps() with animations"
description: "Article(s) > How to correctly use steps() with animations"
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
      content: "Article(s) > How to correctly use steps() with animations"
    - property: og:description
      content: "How to correctly use steps() with animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/steps.html
prev: /programming/css/articles/README.md
date: 2024-11-18
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/a4053d41.png
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
  name="How to correctly use steps() with animations"
  desc="The default behavior of steps() is not intuitive so learn how to use it correctly"
  url="https://css-tip.com/steps/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/a4053d41.png"/>

You want to create a discrete animation using `steps()` but you struggle with its value, right? You never know how many steps it requires and it never works as expected!

In most cases, adding an extra value will fix your issue.

```css
/* Don't ❌ */
.element {
  animation: anime 3s steps(3);
}
/* Do  ✅ */
.element {
  animation: anime 3s steps(3,jump-none);
}
```

By default, `steps()` uses `jump-end` which is not very intuitive. The behavior you are looking for is the one of `jump-none`

![Illustrating the `steps()` function](https://css-tip.com/img/IpTB0WNVyz-730.png)

Here is a demo with some common examples (see the comments in the CSS code)

<CodePen
  user="t_afif"
  slug-hash="WNVBvNM"
  title="Using steps(N,jump-none)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## More CSS Tips

- [**Border-only breadcrumb shape using modern CSS**](/css-tip.com/border-only-breadcrumb.md) A few lines of code to create a border-only breadcrumb shape that you can easily adjust. December 05, 2024
- [**Glowing border animation with a smooth stop**](/css-tip.com/glowing-border.md) Add a fancy border animation on hover that stops smoothly on mouseout. December 03, 2024
- [**Get the scrollbar width using only CSS**](/css-tip.com/width-scrollbar.md) A few lines of code to get the scrollbar width within a CSS variable. November 14, 2024
- [**Folded rectangle shapes using CSS mask**](/css-tip.com/folded-rectangle.md) Create a folded rectangle shape with minimal code and a subtle 3D effect. November 08, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to correctly use steps() with animations",
  "desc": "The default behavior of steps() is not intuitive so learn how to use it correctly",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/steps.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
