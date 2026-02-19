---
lang: en-US
title: "Turn your image into a heart"
description: "Article(s) > Turn your image into a heart"
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
      content: "Article(s) > Turn your image into a heart"
    - property: og:description
      content: "Turn your image into a heart"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/image-heart-shape.html
prev: /programming/css/articles/README.md
date: 2022-07-01
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/321e5fe5.png
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
  name="Turn your image into a heart"
  desc="Create a CSS heart shape using any image"
  url="https://css-tip.com/image-heart-shape/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/321e5fe5.png"/>

Turn your favorite image into a [<VPIcon icon="fas fa-globe"/>Heart 💖](https://css-shape.com/heart/) using a few lines of code

- No extra element (only the `<img>` tag)
- No pseudo-element
- Only two CSS declarations

![An image with a heart shape](https://css-tip.com/img/VXwd44Un44-698.png)

```css
img {
  mask-border: radial-gradient(#000 69%,#0000 70%) 84.5%/50%;
  clip-path: polygon(-41% 0,50% 91%, 141% 0);
}
```

For better support we can rely on `mask`

```css
img {
  mask:
   radial-gradient(at 70% 31%,#000 29%,#0000 30%),
   radial-gradient(at 30% 31%,#000 29%,#0000 30%),
   linear-gradient(#000 0 0) bottom/100% 50% no-repeat;
  clip-path: polygon(-41% 0,50% 91%, 141% 0);
}
```

<CodePen
  user="t_afif"
  slug-hash="PoRwjPM"
  title="CSS only heart images"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Related Article

<SiteInfo
  name="CSS Shapes: The Heart"
  desc="Create a heart shape using modern CSS tricks. You can even transform images into hearts"
  url="https://verpex.com/blog/css-shapes-the-heart/"
  logo="https://verpex.com/assets/brand/favicons/16x16.png"
  preview="https://verpex.com/assets/brand/favicons/open-graph.png"/>

:::

::: info More CSS Tips

- [**Navigation menu with sliding items**](/css-tip.com/sliding-navigation-menu.md) A simple navigation menu with a cool sliding effect for the items. July 22, 2022
- [**Dashed lines using CSS gradient**](/css-tip.com/css-dashed-lines.md) Ceate dashed lines using one gradient and CSS variables. July 13, 2022
- [**Float an element to the bottom corner**](/css-tip.com/float-bottom-corner.md) Use shape-outside to place an element on the bottom corner. June 22, 2022
- [**Extend your underline to the edge of the screen II**](/css-tip.com/overflowing-underline-2.md) Use a border-image trick to create an overflowing underline. June 20, 2022

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Turn your image into a heart",
  "desc": "Create a CSS heart shape using any image",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/image-heart-shape.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
