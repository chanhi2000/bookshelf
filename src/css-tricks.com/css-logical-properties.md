---
lang: en-US
title: "CSS Logical Properties"
description: "Article(s) > CSS Logical Properties"
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
      content: "Article(s) > CSS Logical Properties"
    - property: og:description
      content: "CSS Logical Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-logical-properties.html
prev: /programming/css/articles/README.md
date: 2018-08-21
isOriginal: false
author:
  - name: Chris Coyier
    url: https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/08/logical-css-properties.gif
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
  name="CSS Logical Properties"
  desc="A property like margin-left seems fairly logical, but as Manuel Rego Casasnovas says:"
  url="https://css-tricks.com/css-logical-properties"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/08/logical-css-properties.gif"/>

A property like `margin-left` seems fairly logical, but as Manuel Rego Casasnovas says:

> Imagine that you have some right-to-left (RTL) content on your website your left might be probably the physical right, so if you are usually setting `margin-left: 100px` for some elements, you might want to replace that with `margin-right: 100px`.

Direction, writing mode, and even flexbox all have the power to flip things around and make properties less logical and more difficult to maintain than you’d hope. Now we’ll have `margin-inline-start` for that. The full list is:

- `margin-{block,inline}-{start,end}`
- `padding-{block,inline}-{start,end}`
- `border-{block,inline}-{start,end}-{width,style,color}`

Manuel gets into all the browser support details.

Rachel Andrew also [explains the logic](https://smashingmagazine.com/2018/03/understanding-logical-properties-values/):

::: info

> … these values have moved away from the underlying assumption that content on the web maps to the physical dimensions of the screen, with the first word of a sentence being top left of the box it is in. The order of lines in grid-area makes complete sense if you had never encountered the existing way that we set these values in a shorthand.

<!-- TODO: smahingmagazine.com/understanding-logical-properties-values.md -->
:::

Here’s the logical properties and how they map to existing properties in a default **left to right** nothing-else-happening sort of way.

| Property | Logical Property |
| --- | --- |
| `margin-top` | `margin-block-start` |
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `margin-bottom` | `margin-block-end` |

| Property | Logical Property |
| --- | --- |
| `padding-top` | `padding-block-start` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `padding-bottom` | `padding-block-end` |

| Property | Logical Property |
| --- | --- |
| `border-top{-size|style|color}` | `border-block-start{-size|style|color}` |
| `border-left{-size|style|color}` | `border-inline-start{-size|style|color}` |
| `border-right{-size|style|color}` | `border-inline-end{-size|style|color}` |
| `border-bottom{-size|style|color}` | `border-block-end{-size|style|color}` |

| Property | Logical Property |
| --- | --- |
| `top` | `inset-block-start` |
| `left` | `inset-inline-start` |
| `right` | `inset-inline-end` |
| `bottom` | `inset-block-end` |

::: inf Direct Link →

```component VPCard
{
  "title": "CSS Logical Properties and Values in Chromium and WebKit",
  "desc": "Post summarizing the status of the work by Oriol Brufau in his Igalia Coding Experience adding support for CSS Logical Properties and Values in Chromium and WebKit.",
  "link": "https://blogs.igalia.com/mrego/2018/08/08/css-logical-properties-and-values-in-chromium/",
  "logo": "https://blogs.igalia.com/mrego/img/favicon.ico",
  "background": "rgba(161,194,45,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Logical Properties",
  "desc": "A property like margin-left seems fairly logical, but as Manuel Rego Casasnovas says:",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-logical-properties.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
