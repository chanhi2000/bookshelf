---
lang: en-US
title: "CSS Logical Properties and Values, the next Step of CSS Evolution"
description: "Article(s) > CSS Logical Properties and Values, the next Step of CSS Evolution"
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
      content: "Article(s) > CSS Logical Properties and Values, the next Step of CSS Evolution"
    - property: og:description
      content: "CSS Logical Properties and Values, the next Step of CSS Evolution"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-logical-properties-and-values-the-next-step-of-css-evolution.html
prev: /programming/css/articles/README.md
date: 2019-09-20
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2019/09/css-logical-properties.png
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
  name="CSS Logical Properties and Values, the next Step of CSS Evolution"
  desc="Still in draft, yet already thoroughly supported, is the CSS Logical Properties and Values Level 1 Specification, a CSS module which gets me excited. CSS Logical Properties and Values is a module of CSS introducing logical properties and values that provide the ability to control layout through logical, rather than physical, direction and dimension mappings. … Continue reading ”CSS Logical Properties and Values, the next Step of CSS Evolution”"
  url="https://bram.us/bram.us/2019/09/19/css-logical-properties-and-values-the-next-step-of-css-evolution/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2019/09/css-logical-properties.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2019/09/css-logical-properties.png)

Still in draft, yet already [<VPIcon icon="iconfont icon-caniuse"/>thoroughly supported](https://caniuse.com/#search=Logical%20Properties), is the [<VPIcon icon="fas fa-globe"/>CSS Logical Properties and Values Level 1 Specification](https://drafts.csswg.org/css-logical/), a CSS module which gets me excited.

> CSS Logical Properties and Values is a module of CSS introducing logical properties and values that provide the ability to control layout through logical, rather than physical, direction and dimension mappings.
> 
> These properties are `writing-mode` relative equivalents of their corresponding physical properties.

Think of a simple property like `padding-left` for example. In a left-to-right language such as English you actually mean the left hand side of the box. But in a right-to-left language such as Arabic you want that padding to appear at the right hand side of the box. This is where CSS Logical Properties come into action: instead of using the physical `padding-left`, you use the logical `padding-inline-start` which denominates “the padding at the start of the inline axis”.

The post [New CSS Logical Properties! (<VPIcon icon="fa-brands fa-medium"/>`@elad`)](https://medium.com/@elad/new-css-logical-properties-bc6945311ce7) covers the topic in detail, along with some issues that are still present at the moment.

> Before you start using the new logical properties, you need to stop thinking in terms of `left`/`right` or `top`/`bottom`, and replace them with `inline-start`/`inline-end` and `block-start`/`block-end`.

Exciting stuff. This will have a huge impact on how we write CSS. 🤩

<SiteInfo
  name="New CSS Logical Properties!"
  desc="The Next Step of CSS Evolution"
  url="https://elad.medium.com/new-css-logical-properties-bc6945311ce7/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:880/1*hqumXaLjidnm_AKK5bdVxg.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Logical Properties and Values, the next Step of CSS Evolution",
  "desc": "Still in draft, yet already thoroughly supported, is the CSS Logical Properties and Values Level 1 Specification, a CSS module which gets me excited. CSS Logical Properties and Values is a module of CSS introducing logical properties and values that provide the ability to control layout through logical, rather than physical, direction and dimension mappings. … Continue reading ”CSS Logical Properties and Values, the next Step of CSS Evolution”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-logical-properties-and-values-the-next-step-of-css-evolution.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
