---
lang: en-US
title: "How to correctly define a one-color gradient"
description: "Article(s) > How to correctly define a one-color gradient"
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
      content: "Article(s) > How to correctly define a one-color gradient"
    - property: og:description
      content: "How to correctly define a one-color gradient"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/one-color-gradient.html
prev: /programming/css/articles/README.md
date: 2024-10-21
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/1aad158c.png
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
  name="How to correctly define a one-color gradient"
  desc="The most optimized way to create a one-color gradient"
  url="https://css-tip.com/one-color-gradient/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/1aad158c.png"/>

Learn the correct way to create a one-color gradient with an optimized code. Stop using default values and save some space!

All the below are the same. You can save up to 32 chars!

```css
.gradient {
  background: linear-gradient(75deg,#D95B43 0%,#D95B43 100%);/* 46 chars */
  /* you don't need the angle if it's the same color */
  background: linear-gradient(#D95B43 0%,#D95B43 100%);      /* 40 chars */
  /* you can remove the 0% and 100%, they are implicit */
  background: linear-gradient(#D95B43,#D95B43);              /* 32 chars */
  /* if it's the same color, write it once with two color stops 
     the color stops don't matter so use the shortest one
  */
  background: linear-gradient(#D95B43 0 0);                  /* 28 chars */
  /* if it's a one-color gradient any type of gradient will do the job
     so pick the conic-gradient() as it's one character shorter
  */
  background: conic-gradient(#D95B43 0 0);                   /* 27 chars */
  
  
  /* In the near future, we can also remove the color stops */
  background: conic-gradient(#D95B43);                       /* 23 chars */
  /* In another future, we will have a better function to create 
     a one-color image (yes, gradients are images)
  */
  background: image(#D95B43);                                /* 14 chars */
}                               /* 14 chars */
```

Where you need a one-color gradient? Everywhere!

::: info Hover Effects

```component VPCard
{
  "title": "Cool Hover Effects That Use Background Properties",
  "desc": "A while ago, Geoff wrote an article about a cool hover effect. The effect relies on a combination of CSS pseudo-elements, transforms, and transitions. A lot",
  "link": "/css-tricks.com/cool-hover-effects-using-background-properties.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<CodePen
  user="t_afif"
  slug-hash="xxXNpBW"
  title="hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info CSS Loaders

```component VPCard
{
  "title": "Single Element Loaders: The Bars",
  "desc": "We’ve looked at spinners. We’ve looked at dots. Now we’re going to tackle another common pattern for loaders: bars. And we’re going to do the same thing in",
  "link": "/css-tricks.com/single-element-loaders-the-bars.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<CodePen
  user="t_afif"
  slug-hash="mdWVOrR"
  title="The bars"
  :default-tab="['css','result']"
  :theme="dark"/>

Decorations and shapes with `border-image`: [smashingmagazine.com/2024/01/css-border-image-property](https://smashingmagazine.com/2024/01/css-border-image-property/)

<CodePen
  user="t_afif"
  slug-hash="XWoNdGK"
  title="Infinite image shadow"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="t_afif"
  slug-hash="ExrEXoO"
  title="A simple Tooltip using 2 CSS properties"
  :default-tab="['css','result']"
  :theme="dark"/>

Masking: [css-tip.com/border-gradient](/css-tip.com/border-gradient.md)

<CodePen
  user="t_afif"
  slug-hash="ZEdYKvo"
  title="Gradient borders with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

And many more!

::: info More CSS Tips

- [**Select the last occurrence of an element in the whole document**](/css-tip.com/last-element-dom.md) Select the last occurrence of any element in the whole document. October 31, 2024
- [**Select the first occurrence of an element in the whole document**](/css-tip.com/first-element-dom.md) Select the first occurrence of any element in the whole document. October 30, 2024
- [**Inner display vs Outer display**](/css-tip.com/inner-outer-display.md) Learn the modern way to use the display property. October 16, 2024
- [**Puzzle shapes using CSS mask**](/css-tip.com/puzzle-shape.md) A few lines of code to craft different puzzle shapes. October 09, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to correctly define a one-color gradient",
  "desc": "The most optimized way to create a one-color gradient",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/one-color-gradient.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
