---
lang: en-US
title: "Border gradient with border-radius"
description: "Article(s) > Border gradient with border-radius"
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
      content: "Article(s) > Border gradient with border-radius"
    - property: og:description
      content: "Border gradient with border-radius"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/border-gradient.html
prev: /programming/css/articles/README.md
date: 2024-07-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/d360d6ac.png
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
  name="Border gradient with border-radius"
  desc="The modern way to add gradient to borders while having rounder corners"
  url="https://css-tip.com/border-gradient/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/d360d6ac.png"/>

Save this code for the future! It will be the easiest way to add a gradient coloration to borders while having rounded corners.

- No pseudo-element
- One gradient layer
- Transparent background

![CSS gradient border with border-radius](https://css-tip.com/img/upkJLfF6zC-716.png)

::: note

There is no implementation yet, but it's good to know.

:::

```css
.gradient-border {
  border: 5px solid #0000;
  border-radius: 25px;
  background: linear-gradient(#FF4E50,#40C0CB) border-box;
  background-clip: border-area; /* The new added value */
}
```

::: info Related

<SiteInfo
  name="[css-backgrounds] background-clip: border-area · Issue #9456 · w3c/csswg-drafts"
  desc="Lots of use cases around specifying a continuous image across the border area, including gradient borders, patterned borders etc. From a quick search: https://css-tricks.com/gradient-borders-in-css..."
  url="https://github.com/w3c/csswg-drafts/issues/9456/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a25579603153b9ff0603fd0043a9eed75447bce88141a9020adf9ec63ed511f2/w3c/csswg-drafts/issues/9456"/>

:::

---

Until then, you can rely on CSS mask and pseudo-element if you want transparency

```css
.gradient-border {
  border-radius: 25px;
  position: relative;
}
.gradient-border:before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 5px; /* border length  */
  background: linear-gradient(#FF4E50,#40C0CB);
  border-radius: inherit;
  mask: conic-gradient(#000 0 0) content-box exclude,conic-gradient(#000 0 0);
}
```

Or two background layers if transparency is not required:

```css
.gradient-border {
  border: 5px solid #0000;
  border-radius: 25px;
  background: 
    conic-gradient(#fff /* the background color */ 0 0) padding-box,
    linear-gradient(#FF4E50,#40C0CB) border-box;
}
```

<CodePen
  user="t_afif"
  slug-hash="ZEdYKvo"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

---

::: info More CSS Tips

- [**Manual typography using Scroll-driven animations**](/css-tip.com/manual-typography.md) Use a range slider to manually adjust the font-size of your website (100% CSS). July 18, 2024
- [**Typed CSS variables using @property**](/css-tip.com/typed-variables.md) Upgrade your CSS variables by registring them using the @property. July 17, 2024
- [**Circular progress using scroll-driven animations**](/css-tip.com/circular-progress.md) Transforming the native progress element into a circular one using scroll-driven animations. July 04, 2024
- [**Grainy texture using CSS gradients**](/css-tip.com/grainy-texture.md) A simple code to create a random-style background to simulate a grainy texture. July 02, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Border gradient with border-radius",
  "desc": "The modern way to add gradient to borders while having rounder corners",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/border-gradient.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
