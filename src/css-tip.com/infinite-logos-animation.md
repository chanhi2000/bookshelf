---
lang: en-US
title: "An infinite logos animation"
description: "Article(s) > An infinite logos animation"
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
      content: "Article(s) > An infinite logos animation"
    - property: og:description
      content: "An infinite logos animation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/infinite-logos-animation.html
prev: /programming/css/articles/README.md
date: 2025-03-13
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/894d7676.png
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
  name="An infinite logos animation"
  desc="Using the offset property to create a CSS-only infinite logos animation"
  url="https://css-tip.com/infinite-logos-animation/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/894d7676.png"/>

Another classic logos animation?! No! This one is THE real infinite ∞ logos animation.

- Minimal HTML
- Powered by the `offset` property
- Responsive

![CSS-only infinite logos animation](https://css-tip.com/img/ffkjLzFJ5J-928.png)

```html
<div class="container">
  <img src=""><img src=""><img src=""><img src=""><img src=""><img src="">
  <svg viewBox='-152 -75 304 150'><path id="path" d='M-150 0 C-130 -150 130 150 150 0 C130 -150 -130 150 -150 0 Z'/></svg>
</div>
```

```css
@property --_w {
  syntax: '<length>';
  inherits: true;
  initial-value: min(100vw,200vh);
}
.container {
  display: grid;
  width: 300px;
  aspect-ratio: 2;
  scale: min(tan(atan2(var(--_w),350px)),3); /* for the responsive part */
}
.container > img {
  grid-area: 1/1;
  width: 35px;
  aspect-ratio: 1;
  translate: 150px 75px;
  offset: url(#path) 0% 0deg;
  animation: x 13s linear infinite;
}
@keyframes x { 
  to {offset-distance: 100%}
}
.container > :nth-of-type(2) {animation-delay:-1s}
.container > :nth-of-type(3) {animation-delay:-2s}
.container > :nth-of-type(4) {animation-delay:-3s}
.container > :nth-of-type(5) {animation-delay:-4s}
.container > :nth-of-type(6) {animation-delay:-5s}
```

<CodePen
  user="t_afif"
  slug-hash="wBvPWwB"
  title="Infinite ∞ logos animation"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Custom progress element using attr()**](/css-tip.com/custom-progress.md) Create a custom progress element with a dynamic coloration based on the value. March 25, 2025
- [**Zig-Zag edges using CSS mask**](/css-tip.com/zig-zag-edge.md) One line of code to add Zig-Zag edges to any element using the mask property. March 20, 2025
- [**Get the value of an input range (without JavaScript)**](/css-tip.com/value-input.md) Use modern features to get the value of an input range using only CSS. March 05, 2025
- [**Trim extra space using text-box**](/css-tip.com/text-box.md) An interactive tool to illustrate how to trim the extra space below and above text. February 26, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An infinite logos animation",
  "desc": "Using the offset property to create a CSS-only infinite logos animation",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/infinite-logos-animation.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
