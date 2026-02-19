---
lang: en-US
title: "Typed CSS variables using @property"
description: "Article(s) > Typed CSS variables using @property"
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
      content: "Article(s) > Typed CSS variables using @property"
    - property: og:description
      content: "Typed CSS variables using @property"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/typed-variables.html
prev: /programming/css/articles/README.md
date: 2024-07-17
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/738103b9.png
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
  name="Typed CSS variables using @property"
  desc="Upgrade your CSS variables by registring them using the @property"
  url="https://css-tip.com/typed-variables/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/738103b9.png"/>

Stop defining your variables inside `:root`!

Use the `@property` instead and create "Typed CSS Variables"

- Easy to debug using Dev tools
- Implicit data validation
- Can be animated if the type allows it
- Available globally with a default value

Instead of doing this:

```css
/*
  We don't know the type of the variables 🤔
  Valid or invalid? We don't know! 🫣
  Hard to debug & the browser won't help you 😖
*/
:root {
  --color: #586de7;
  --size: 20px;
  --cols: 12;
}
```

Do this:

```css
/*
  Typed CSS variables! 🤩
  Easy to debug and the browser will help you 😃
*/
@property --color {
  syntax: '<color>';
  inherits: true;
  initial-value: #586de7; 
}
@property --size {
  syntax: '<length>';
  inherits: true;
  initial-value: 20px; 
}
@property --cols {
  syntax: '<integer>';
  inherits: true;
  initial-value: 12; 
}
```

---

Example of a data validation through the Dev tools.

"darkpink" could have been a valid color. The browser will show you a warning and use the initial-value as a fallback. Without `@property`, there is no way to know the issue.

![Dev tools CSS variables](https://css-tip.com/img/7qlIH2iYKr-934.png)

::: info More CSS Tips

- [**Calculate the scroll progress of an arbitrary element**](/css-tip.com/scroll-progress-2.md) A few lines of CSS to get the scroll progress of any element in the page. July 24, 2024
- [**Calculate the scroll progress of the page**](/css-tip.com/scroll-progress.md) A few lines of CSS to get the scroll progress of the page inside a CSS variable. July 23, 2024
- [**Border gradient with border-radius**](/css-tip.com/border-gradient.md) The modern way to add gradient to borders while having rounder corners. July 10, 2024
- [**Inverted border-radius using CSS mask**](/css-tip.com/inverted-radius.md) One property and 4 gradients to invert the corner of any element with a radius. July 09, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Typed CSS variables using @property",
  "desc": "Upgrade your CSS variables by registring them using the @property",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/typed-variables.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
