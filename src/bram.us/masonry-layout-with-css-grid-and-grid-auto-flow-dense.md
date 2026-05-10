---
lang: en-US
title: "Masonry Layout with CSS Grid and grid-auto-flow: dense;"
description: "Article(s) > Masonry Layout with CSS Grid and grid-auto-flow: dense;"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Masonry Layout with CSS Grid and grid-auto-flow: dense;"
    - property: og:description
      content: "Masonry Layout with CSS Grid and grid-auto-flow: dense;"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/masonry-layout-with-css-grid-and-grid-auto-flow-dense.html
prev: /programming/css/articles/README.md
date: 2017-08-15
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2017/08/grid-auto-flow-dense-768x315.png
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
  name="Masonry Layout with CSS Grid and grid-auto-flow: dense;"
  desc="By setting grid-auto-flow: dense;, the Grid auto-placement algorithm will attempt to fill in holes earlier in the grid if smaller items come up later, resulting in a Masonry-like layout. (click for demo) (via) 💁‍♂️ Do note that the result isn’t 100% masonry, but masonry-like. As Rachel Andrew – who else – notes: At first glance … Continue reading ”Masonry Layout with CSS Grid and grid-auto-flow: dense;”"
  url="https://bram.us/2017/08/15/masonry-layout-with-css-grid-and-grid-auto-flow-dense/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2017/08/grid-auto-flow-dense-768x315.png"/>

By setting `grid-auto-flow: dense;`, the Grid auto-placement algorithm will attempt to fill in holes earlier in the grid if smaller items come up later, resulting in a *[<VPIcon icon="fas fa-globe"/>Masonry](https://masonry.desandro.com/)-like* layout.

![[click for demo (<VPIcon icon="fa-brands fa-codepen"/>`Kseso`)](https://codepen.io/Kseso/pen/ZJbEMe/)](https://bram.us/wordpress/wp-content/uploads/2017/08/grid-auto-flow-dense.png)  

::: info "#maCSSonry layout puro #CSS Grid" *from EsCss* 💁‍♂️ (<code>escss.blogspot.com</code>)

Do note that the result isn’t 100% masonry, but *masonry-like*. As Rachel Andrew – who else – [<VPIcon icon="fas fa-globe"/>notes](https://rachelandrew.co.uk/archives/2017/01/18/css-grid-one-layout-method-not-the-only-layout-method/):

> At first glance this looks a bit like masonry, however as you can see the items are all in strict rows and columns, some are just spanning multiple tracks.
>
> For Masonry what you actually would need is for auto-placement to look at both height and width and be able to create ‘rows’ that also push items up into the area of the row above to fill in gaps.

There’s [an active issue for this (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/945) listed in the CCSWG Issues

<SiteInfo
  name="#maCSSonry layout puro #CSS Grid"
  desc="Jugando a emular el conocido como layout masonry pero en puro CSS. Y una segunda versión con el lazy-load images de Furoya."
  url="https://escss.blogspot.com/2017/07/css-grid-layout-as-masonry.html/"
  logo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhNu20x-sKJy5mnwoAoMe-n1AAJxIUKZDqvWeixvmMs-zbfi84wQbi38a1Sco7Tfede8S2fCDfp2mIVL2no5y11w9m1P-yENtrHtFybWF_OrPQWU0hf-X6vawl42BaII_Rm7oehfrhzdGI/s800/favicon.ico"
  preview="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgv7_T5rs448YBpxjuH2noXQfvgNbG5TaftHx6jeWQybdSPdYi_aP1IHbYlTLgGmSeHU4mMTioTcVj4YxwsisTvSP0T_uBjbZtch5TDs2RQeWzpheSMgBxFdpnr4oDCFti79g_HnaBIc0Y/s1600/capt.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Masonry Layout with CSS Grid and grid-auto-flow: dense;",
  "desc": "By setting grid-auto-flow: dense;, the Grid auto-placement algorithm will attempt to fill in holes earlier in the grid if smaller items come up later, resulting in a Masonry-like layout. (click for demo) (via) 💁‍♂️ Do note that the result isn’t 100% masonry, but masonry-like. As Rachel Andrew – who else – notes: At first glance … Continue reading ”Masonry Layout with CSS Grid and grid-auto-flow: dense;”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/masonry-layout-with-css-grid-and-grid-auto-flow-dense.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
