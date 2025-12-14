---
lang: en-US
title: "When to use the min() or max() function"
description: "Article(s) > When to use the min() or max() function"
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
      content: "Article(s) > When to use the min() or max() function"
    - property: og:description
      content: "When to use the min() or max() function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/min-max.html
prev: /programming/css/articles/README.md
date: 2024-02-06
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/ec8d02b8.png
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
  name="When to use the min() or max() function"
  desc="a quick trick to know when to use min() or max()"
  url="https://css-tip.com/min-max/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/ec8d02b8.png"/>

`min()` or `max()`? You always struggle to know which one to use and you end up trying both until one of them works.

💡 Here is a figure to help you decide when to use them

You start with `clamp()` then:

- when you remove max, you use `max()`
- when you remove min, you use `min()`

![A 3D shine animation on image](https://css-tip.com/img/uI7CCFn8mO-926.png)

If you want to set a `max-width` to your element then it's `min()`

`width: clamp(min,100%,max)` ➞ `width: min(100%, max)`

<CodePen
  user="t_afif"
  slug-hash="KKEeLpp"
  title="max-width using min()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you want to set a min value for `font-size` then it's `max()`

`font-size: clamp(min,5vw,max)` ➞ `font-size: max(min, 5vw)`

<CodePen
  user="t_afif"
  slug-hash="KKEeLzd"
  title="min font-size using max()\"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## More CSS Tips

- [**Heart shape with a sliding hover effect**](/css-tip.com/heart-shape-hover.md) A lovely animation to your heart shape image. February 14, 2024
- [**Create a triangle shape with 2 CSS properties**](/css-tip.com/triangle-shape.md) Only two CSS properties to create a triangle shape. February 11, 2024
- [**A curved ribbon shape with hover effect**](/css-tip.com/curved-ribbon.md) A simple ribbon shape with a fancy hover effect. January 29, 2024
- [**A fancy frame with wavy borders (wavy box)**](/css-tip.com/image-wavy-borders.md) Place your image inside a wavy box using modern CSS. January 23, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When to use the min() or max() function",
  "desc": "a quick trick to know when to use min() or max()",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/min-max.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
