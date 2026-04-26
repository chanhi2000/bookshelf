---
lang: en-US
title: "CSS Grid Layout Module Level 2: Masonry Layout"
description: "Article(s) > CSS Grid Layout Module Level 2: Masonry Layout"
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
      content: "Article(s) > CSS Grid Layout Module Level 2: Masonry Layout"
    - property: og:description
      content: "CSS Grid Layout Module Level 2: Masonry Layout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-grid-layout-module-level-2-masonry-layout.html
prev: /programming/css/articles/README.md
date: 2020-05-05
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/05/css-grid-level-2-masonry-layout-demo.png
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
  name="CSS Grid Layout Module Level 2: Masonry Layout"
  desc="UPDATE 2020.10.22: Masonry Layout founds its home in the CSS Grid Module Level 3 Draft Spec! A long requested CSS feature is to be able to create a “Masonry Layout” using pure CSS. Today we can already create a Masonry-like layout using grid-auto-flow: dense;, but unfortunately that’s not the real deal. 🤔 Masonry Layout? Masonry … Continue reading ”CSS Grid Layout Module Level 2: Masonry Layout”"
  url="https://bram.us/2020/05/04/css-grid-layout-module-level-2-masonry-layout/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/05/css-grid-level-2-masonry-layout-demo.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2020/05/css-grid-level-2-masonry-layout-demo.png)

::: note UPDATE 2020.10.22

Masonry Layout founds its home in [<VPIcon icon="iconfont icon-w3c"/>the CSS Grid Module Level **3** Draft Spec](https://drafts.csswg.org/css-grid-3/)!

:::

A long requested CSS feature is to be able to create a “Masonry Layout” using pure CSS. Today we can already [**create a Masonry-like layout using `grid-auto-flow: dense;`**](/bram.us/masonry-layout-with-css-grid-and-grid-auto-flow-dense.md), but unfortunately that’s not the real deal.

::: details 🤔 Masonry Layout?

Masonry is a grid layout based on columns, as popularized by Pinterest. Unlike other grid layouts, it doesn’t have fixed height rows. It works by placing elements in optimal position based on available vertical space, sort of like a mason fitting stones in a wall.

![](https://bram.us/wordpress/wp-content/uploads/2020/05/left-to-right-vs-masonry.png)

It became easy to implement thanks to [<VPIcon icon="fas fa-globe"/>the Masonry JavaScript Library](https://masonry.desandro.com/).

:::

Thankfully discussions to natively implement Masonry in CSS haven’t stopped and [back in January (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/4650) it kinda settled on this syntax:

```css
.masonry {
  display: grid;
  grid-gap: 1em;
  grid: masonry / repeat(auto-fit, minmax(20em, 1fr));
}
```

::: note ☝️

That’s `grid-template-rows` being set to `masonry` there, and `grid-template-columns` to the already familiar `repeat(auto-fit, minmax(20em, 1fr))`

:::

Knowing that Tab Atkins – author of [<VPIcon icon="iconfont icon-w3c"/>CSS Grid Layout Level 1](https://w3.org/TR/css-grid-1/) – responded with I’m liking this quite a bit! was a good sign. What’s even better is that Firefox Nightly *(version 77a1)* has implemented it by now, behind a flag.

::: note 👨‍🔬

Do note that this Masonry addition is still a proposal and is considered to be highly experimental at the time of writing. The syntax is still being discussed upon and is NOT final at all. Heck, you can’t even find a mention of Masonry in the [<VPIcon icon="iconfont icon-w3c"/>CSS Grid Module Level 2](https://drafts.csswg.org/css-grid-2/) Draft!

:::

To enable the experimental Masonry implementation in Firefox Nightly go to `about:config` and set `layout.css.grid-template-masonry-value.enabled` to `true`.

Once enabled the following pen should show a nice Masonry Layout:

<CodePen
  user="mirisuzanne"
  slug-hash="pojrrMz"
  title="CSS Masonry Layout (FF Nightly - Feature Flag)"
  :default-tab="['css','result']"
  :theme="dark"/>

Yes, I’m really excited about this one … let’s hope it sticks!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Grid Layout Module Level 2: Masonry Layout",
  "desc": "UPDATE 2020.10.22: Masonry Layout founds its home in the CSS Grid Module Level 3 Draft Spec! A long requested CSS feature is to be able to create a “Masonry Layout” using pure CSS. Today we can already create a Masonry-like layout using grid-auto-flow: dense;, but unfortunately that’s not the real deal. 🤔 Masonry Layout? Masonry … Continue reading ”CSS Grid Layout Module Level 2: Masonry Layout”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-grid-layout-module-level-2-masonry-layout.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
