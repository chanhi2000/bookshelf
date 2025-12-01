---
lang: en-US
title: "Feature Detection in CSS (CSS @supports)"
description: "Article(s) > Feature Detection in CSS (CSS @supports)"
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
      content: "Article(s) > Feature Detection in CSS (CSS @supports)"
    - property: og:description
      content: "Feature Detection in CSS (CSS @supports)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/using-feature-queries-in-css.html
prev: /programming/ts/articles/README.md
date: 2016-08-28
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: 
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Feature Detection in CSS (CSS @supports)"
  desc="There’s a good introduction to @supports on Mozilla Hacks: With @supports, you can write a small test in your CSS to see whether or not a particular “feature” (CSS property or value) is supported, and apply a block of code (or not) based on the answer. Progressive enhancement in it’s finest form: /* fallback code … Continue reading ”Feature Detection in CSS (CSS @supports)”"
  url="https://bram.us/2016/08/27/using-feature-queries-in-css/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2016/08/Can-I-Use-Feature-Queries.gif"/>

![](https://bram.us/wordpress/wp-content/uploads/2016/08/Can-I-Use-Feature-Queries.gif)

There’s a good introduction to `@supports` on Mozilla Hacks:

> With `@supports`, you can write a small test in your CSS to see whether or not a particular “feature” (CSS property or value) is supported, and apply a block of code (or not) based on the answer.

Progressive enhancement in it’s finest form:

```css
/* fallback code for older browsers */

@supports (display: grid) {
  /* code for newer browsers */
  /* including overrides of the code above, if needed */
}
```

Apart from enhancing your styles, you could also use to show/hide warnings. The trick is to show a warning by default, and then hide it

```css
.warning {
  /* style for warning box here …*/
}

@supports (display: grid) {
  /* hide warning box */
  .warning {
    display: none;
  }

  /* extra styles here … */
}
```

Handy when making tech-demos.

What about browser support?

> Feature Queries have been around since mid–2013. With the imminent release of Safari 10, I believe it’s past time for us to add @supports to our toolbox.

<SiteInfo
  name="Using Feature Queries in CSS – Mozilla Hacks - the Web developer blog"
  desc="There’s a tool in CSS that you might not have heard of yet. It’s powerful. It’s been there for a while. And it’ll likely become one of your favorite new ..."
  url="https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/"
  logo=""
  preview="https://hacks.mozilla.org/wp-content/themes/Hax/img/hacks-meta-image.jpg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Feature Detection in CSS (CSS @supports)",
  "desc": "There’s a good introduction to @supports on Mozilla Hacks: With @supports, you can write a small test in your CSS to see whether or not a particular “feature” (CSS property or value) is supported, and apply a block of code (or not) based on the answer. Progressive enhancement in it’s finest form: /* fallback code … Continue reading ”Feature Detection in CSS (CSS @supports)”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/using-feature-queries-in-css.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
