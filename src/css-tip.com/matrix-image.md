---
lang: en-US
title: "Cut your image into pieces"
description: "Article(s) > Cut your image into pieces"
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
      content: "Article(s) > Cut your image into pieces"
    - property: og:description
      content: "Cut your image into pieces"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/matrix-image.html
prev: /programming/css/articles/README.md
date: 2022-01-02
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/8050e1ef.png
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
  name="Cut your image into pieces"
  desc="Use CSS mask to cut your image into small pieces"
  url="https://css-tip.com/matrix-image/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/8050e1ef.png"/>

Cut your image into small pieces using one CSS instruction.

![A image cut into small pieces](https://css-tip.com/img/X_UmozURIl-628.png)

```css
img {
  --n: 10; /* number of rows */
  --m: 15; /* number of columns */
  --gap: 3px;
  mask:
    conic-gradient(from 90deg at var(--gap) var(--gap),#000 90deg,#0000 0) 
    calc(-1*var(--gap)) calc(-1*var(--gap))/
    calc((100% + var(--gap))/var(--m))
    calc((100% + var(--gap))/var(--n))
}
```

<CodePen
  user="t_afif"
  slug-hash="xxXWqym"
  title="cut image into small pieces"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More CSS Tips

- [**Equal width buttons to the widest one**](/css-tip.com/equal-width-button.md) A few lines of code ot create equal width buttons. January 20, 2022
- [**Stick an element to the top-right corner**](/css-tip.com/stick-element-grid.md) Place an element on the top-right corner of your CSS grid. January 13, 2022
- [**Full screen height container**](/css-tip.com/full-screen-height.md) Make your container fill all the screen height. December 15, 2021
- [**max-width + centering with one instruction**](/css-tip.com/center-max-width.md) Use max() to center your element and set a max-width. December 10, 2021

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cut your image into pieces",
  "desc": "Use CSS mask to cut your image into small pieces",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/matrix-image.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
