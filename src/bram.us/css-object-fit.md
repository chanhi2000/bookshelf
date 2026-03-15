---
lang: en-US
title: "CSS object-fit"
description: "Article(s) > CSS object-fit"
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
      content: "Article(s) > CSS object-fit"
    - property: og:description
      content: "CSS object-fit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-object-fit.html
prev: /programming/css/articles/README.md
date: 2015-02-11
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: 
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
  name="CSS object-fit"
  desc="The `object-fit` CSS property specifies how the contents of a replaced element should be fitted to the box established by its used height and width."
  url="https://bram.us/2015/02/10/css-object-fit/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2015/02/css-object-fit.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2015/02/css-object-fit.png)

```css
img {
  width: 150px;
  height: 100px;
  border: 1px solid #000;
}

.fill {
  object-fit: fill;
}

.contain {
  object-fit: contain;
}

.cover {
  object-fit: cover;
}

.none {
  object-fit: none;
}

.scale-down {
  object-fit: scale-down;
}
```

> The `object-fit` CSS property specifies how the contents of a replaced element should be fitted to the box established by its used height and width.

<SiteInfo
  name="Exploring object-fit – Mozilla Hacks - the Web developer blog"
  desc="On web documents, a common problem concerns the display of different sized images (or videos) in the same place. Perhaps you are writing a dynamic gallery app that accepts user ..."
  url="https://hacks.mozilla.org/2015/02/exploring-object-fit/"
  logo="https://hacks.mozilla.org/favicon.ico"
  preview="https://hacks.mozilla.org/wp-content/themes/Hax/img/hacks-meta-image.jpg"/>

<SiteInfo
  name="object-fit - CSS | MDN"
  desc="The object-fit CSS property sets how the content of a replaced element, such as an <img> or <video>, should be resized to fit its container."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

I still want something like `aspect-ratio()` in CSS though, because setting aspect-ratios on elements right now is [<VPIcon icon="fas fa-globe"/>a nasty hack](https://goldenapplewebdesign.com/responsive-aspect-ratios-with-pure-css/). #pavethecowpaths

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS object-fit",
  "desc": "img { width: 150px; height: 100px; border: 1px solid #000; } .fill { object-fit: fill; } .contain { object-fit: contain; } .cover { object-fit: cover; } .none { object-fit: none; } .scale-down { object-fit: scale-down; } The object-fit CSS property specifies how the contents of a replaced element should be fitted to the box established … Continue reading ”CSS object-fit”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-object-fit.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
