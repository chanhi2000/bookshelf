---
lang: en-US
title: "Simple and Nice Blockquote Styling"
description: "Article(s) > Simple and Nice Blockquote Styling"
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
      content: "Article(s) > Simple and Nice Blockquote Styling"
    - property: og:description
      content: "Simple and Nice Blockquote Styling"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/snippetscsssimple-and-nice-blockquote-styling.html
prev: /programming/css/articles/README.md
date: 2009-09-04
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="Simple and Nice Blockquote Styling"
  desc="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor"
  url="https://css-tricks.com/snippetscsssimple-and-nice-blockquote-styling"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

The blockquote displays in standards-compliant browsers with the “big quotes before” effect, and in IE with a thick left border and a light grey background.  
Unlike other blockquote techniques, this style does not require a nested block-level element (like p). As such, it turns a paragraph into an inline-styled element to keep the content from dropping below the quote.

```css
blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}
blockquote:before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
blockquote p {
  display: inline;
}
```

::: tip Example

> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Simple and Nice Blockquote Styling",
  "desc": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/snippetscsssimple-and-nice-blockquote-styling.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
