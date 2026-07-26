---
lang: en-US
title: "CSS Variables and Reduced Motion"
description: "Article(s) > CSS Variables and Reduced Motion"
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
      content: "Article(s) > CSS Variables and Reduced Motion"
    - property: og:description
      content: "CSS Variables and Reduced Motion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-variables-and-reduced-motion.html
prev: /programming/css/articles/README.md
date: 2017-07-24
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

```component VPCard
{
  "title": "CSS Variables and Reduced Motion",
  "desc": "Great usage of CSS Custom Properties in combination with calc() by Steve Gardner to cater for users who have prefers-reduced-motion set to reduce: CSS variables (custom properties) makes supporting reduced motion settings super easy. There is little excuse to not too. — Steve Gardner (@steveg3003) July 21, 2017 By setting --duration to 0 it basically … Continue reading ”CSS Variables and Reduced Motion”",
  "link": "https://bram.us/2017/07/23/css-variables-and-reduced-motion/",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

Great usage of CSS Custom Properties in combination with `calc()` by Steve Gardner to cater for users who have `prefers-reduced-motion` set to `reduce`:

::: info *From X* (<VPIcon icon="fa-brands fa-x-twitter"/>`steeevg`)

CSS variables (custom properties) makes supporting reduced motion settings super easy. There is little excuse to not too.

![https://bram.us/wordpress/wp-content/uploads/2017/07/steveg3003_2017-Jul-21.jpg]

<SiteInfo
  name="X에서 Steve Gardner(@steeevg) 님"
  desc="CSS variables (custom properties) makes supporting reduced motion settings super easy. There is little excuse to not too."
  url="https://x.com/steeevg/status/888500276847562752/"
  logo="https://x.com/favicon.ico"
  preview="https://pbs.twimg.com/media/DFSWPRxU0AEiIbj.jpg:large"/>

:::

By setting `--duration` to `0` it basically behaves like [**a binary condition for a CSS calculation**](/bram.us/conditions-for-css-calculations.md). Simple and effective 🙂

*(Personally I’d set it to either `0` or `1` – and not `0.5`. That way the math is kept easy and it becomes a true binary toggle)*

::: info ⁉️

Not sure what `prefers-reduced-motion` is? Check out [**CSS-Tricks’ Introduction to the Reduced Motion Media Query**](/css-tricks.com/introduction-reduced-motion-media-query.md) to get up to speed.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Variables and Reduced Motion",
  "desc": "Great usage of CSS Custom Properties in combination with calc() by Steve Gardner to cater for users who have prefers-reduced-motion set to reduce: CSS variables (custom properties) makes supporting reduced motion settings super easy. There is little excuse to not too. — Steve Gardner (@steveg3003) July 21, 2017 By setting --duration to 0 it basically … Continue reading ”CSS Variables and Reduced Motion”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-variables-and-reduced-motion.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
