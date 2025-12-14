---
lang: en-US
title: "Rounded Corners"
description: "Article(s) > Rounded Corners"
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
      content: "Article(s) > Rounded Corners"
    - property: og:description
      content: "Rounded Corners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/snippetscssrounded-corners.html
prev: /programming/css/articles/README.md
date: 2009-09-05
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
  name="Rounded Corners"
  desc="-moz-border-radius:"
  url="https://css-tricks.com/snippetscssrounded-corners"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

**Standard**

```css
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
border-radius: 10px; /* future proofing */
-khtml-border-radius: 10px; /* for old Konqueror browsers */
```

**Individual Corners**

```css
-moz-border-radius-topleft: 10px;
-moz-border-radius-topright: 20px;
-moz-border-radius-bottomright: 30px;
-moz-border-radius-bottomleft: 0;

-webkit-border-top-left-radius: 10px;
-webkit-border-top-right-radius: 20px;
-webkit-border-bottom-right-radius: 30px;
-webkit-border-bottom-left-radius: 0;
```

**Shorthand:**

```css
/* -moz-border-radius: [top-left] [top-right] [bottom-right] [bottom-left] */
-moz-border-radius: 10px 20px 30px 0;
```

**Elliptical Rounding (Firefox 3.5+):**

```css
/* -moz-border-radius-topleft: [horizontal radius] [vertical radius]; */
-moz-border-radius-topleft: 10px 40px;
```

**Elliptical Rounding Shorthand (Firefox 3.5+):**

```css
/* -moz-border-radius: [horizontal radius] / [vertical radius]; */
-moz-border-radius: 10px / 40px;

-moz-border-radius: 10px 20px 30px 40px / 15px 30px 45px 60px;
```

Above is the same as:

```css
-moz-border-radius-topleft: 10px 15px;
-moz-border-radius-topright: 20px 30px;
-moz-border-radius-bottomright: 30px 45px;
-moz-border-radius-bottomleft: 40px 60px;
```

**WebKit Elliptical Rounding**

All corners:

```css
-webkit-border-radius: 36px 12px;
```

Right corners only:

```css
-webkit-border-top-right-radius: 50px 30px; 
-webkit-border-bottom-right-radius: 50px 30px;
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Rounded Corners",
  "desc": "-moz-border-radius:",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/snippetscssrounded-corners.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
