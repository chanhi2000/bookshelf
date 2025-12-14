---
lang: en-US
title: "Toon Title Text Generator"
description: "Article(s) > Toon Title Text Generator"
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
      content: "Article(s) > Toon Title Text Generator"
    - property: og:description
      content: "Toon Title Text Generator"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/toon-title-text-generator.html
prev: /programming/css/articles/README.md
date: 2025-12-15
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/Screenshot-2025-12-15-at-10.45.29-AM.png
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
  name="Toon Title Text Generator"
  desc="Andy Clarke with a brand-new resource. It generates the sort of fun typography that Andy commonly uses in his own work that's geared towards cartoon headings."
  url="https://css-tricks.com/toon-title-text-generator"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/Screenshot-2025-12-15-at-10.45.29-AM.png"/>

Andy Clarke with a brand-new resource. It generates the sort of fun typography that Andy commonly uses in his own work that’s geared towards cartoon headings.

There are a number of configurable options for font, color, stroke, letter spacing, and shadows.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/Screenshot-2025-12-15-at-10.37.00-AM.png?resize=2394%2C1228&ssl=1)

And it spits out the CSS for you to copy-paste.

What if you want to individually style each letter? Well, there’s no such thing as `:nth-letter` in CSS at the moment. There are, however, tools that will wrap each character in a separate `<span>`, the most tradition one being [<VPIcon icon="iconfont icon-github"/>`s0wcy/split-text-js`](https://github.com/s0wcy/split-text-js/). But Andy decided to make a tool for that — called [<VPIcon icon="fas fa-globe"/>Splinter.js](https://stuffandnonsense.co.uk/blog/splinter-js-i-made-a-more-accessible-text-splitting-tool) — as well because he saw opportunities to enhance the accessibility of the generated markup to help prevent some assistive tech from choking on the spans. ([<VPIcon icon="fas fa-globe"/>GSAP’s version](https://gsap.com/docs/v3/Plugins/SplitText/) also does a good job of this.)

Som instead of:

```html
<h2>
  <span>H</span>
  <span>u</span>
  <span>m</span>
  <!-- etc. -->
</h2>
```

…we get ARIA-spiced markup:

```html
<h2 data-split="toon" aria-label="Hum Sweet Hum">
  <span class="toon-char" aria-hidden="true">H</span>
  <span class="toon-char" aria-hidden="true">u</span>
  <span class="toon-char" aria-hidden="true">m</span>
</h2>
```

And it supports line breaks!

```component VPCard
{
  "title": "Andy Clarke’s Toon Text",
  "desc": "Classic Cartoon Title Cards Brought to the Web Using Modern CSS, Javascript, and SVG",
  "link": "https://stuffandnonsense.co.uk/toon-text/tool.html/",
  "logo": "https://stuffandnonsense.co.uk/favicon.ico",
  "background": "rgba(255,107,107,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Toon Title Text Generator",
  "desc": "Andy Clarke with a brand-new resource. It generates the sort of fun typography that Andy commonly uses in his own work that's geared towards cartoon headings.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/toon-title-text-generator.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
