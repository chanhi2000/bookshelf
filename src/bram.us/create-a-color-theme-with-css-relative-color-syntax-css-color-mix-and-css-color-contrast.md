---
lang: en-US
title: "Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()"
description: "Article(s) > Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()"
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
      content: "Article(s) > Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()"
    - property: og:description
      content: "Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/create-a-color-theme-with-css-relative-color-syntax-css-color-mix-and-css-color-contrast.html
prev: /programming/css/articles/README.md
date: 2021-04-28
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/04/css-color-level-5.png
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
  name="Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()"
  desc="Fabio Giolito explores three new CSS color features that landed in Safari Technology Preview: Relative color syntax, e.g. .bg-primary-100 { background-color: hsl(from var(--theme-primary) h s 90%); } .bg-primary-200 { background-color: hsl(from var(--theme-primary) h s 80%); } .bg-primary-300 { background-color: hsl(from var(--theme-primary) h s 70%); } ... CSS color-contrast, e.g. .text-contrast-primary { color: color-contrast(var(--theme-primary) vs white, … Continue reading ”Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()”"
  url="https://bram.us/2021/04/28/create-a-color-theme-with-css-relative-color-syntax-css-color-mix-and-css-color-contrast/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/04/css-color-level-5.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/04/css-color-level-5.png)

[Fabio Giolito (<VPIcon icon="fa-brands fa-x-twitter"/>`fabiogiolito`)](https://x.com/fabiogiolito) explores three new CSS color features that landed in Safari Technology Preview:

1. Relative color syntax, e.g.

```css
.bg-primary-100 {
  background-color: hsl(from var(--theme-primary) h s 90%);
}
.bg-primary-200 {
  background-color: hsl(from var(--theme-primary) h s 80%);
}
.bg-primary-300 {
  background-color: hsl(from var(--theme-primary) h s 70%);
}
...
```

2. CSS color-contrast, e.g.

```css
.text-contrast-primary {
  color: color-contrast(var(--theme-primary) vs white, black);
}
```

3. CSS color-mix, e.g.

```css
.text-primary-dark {
  color: color-mix(var(--theme-primary), black 10%);
}
.text-primary-darker {
  color: color-mix(var(--theme-primary), black 20%);
}
```

All three features are part of the [<VPIcon icon="iconfont icon-w3c"/>the CSS Color Module Level 5 spec](https://w3.org/TR/css-color-5/) and are a very welcome addition.

::: info

<SiteInfo
  name="Create a color theme with these upcoming CSS features"
  desc="Safari Technology Preview added support to three new CSS color features that are coming soon to other..."
  url="https://dev.to/fabiogiolito/create-a-color-theme-with-these-upcoming-css-features-4o83/"
  logo="https://media2.dev.to/dynamic/image/width=128,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png"
  preview="https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzrd49qke5gi4b4jvelii.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()",
  "desc": "Fabio Giolito explores three new CSS color features that landed in Safari Technology Preview: Relative color syntax, e.g. .bg-primary-100 { background-color: hsl(from var(--theme-primary) h s 90%); } .bg-primary-200 { background-color: hsl(from var(--theme-primary) h s 80%); } .bg-primary-300 { background-color: hsl(from var(--theme-primary) h s 70%); } ... CSS color-contrast, e.g. .text-contrast-primary { color: color-contrast(var(--theme-primary) vs white, … Continue reading ”Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/create-a-color-theme-with-css-relative-color-syntax-css-color-mix-and-css-color-contrast.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
