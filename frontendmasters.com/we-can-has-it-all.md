---
lang: en-US
title: "We can :has it all"
description: "Article(s) > We can :has it all"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > We can :has it all"
    - property: og:description
      content: "We can :has it all"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/we-can-has-it-all.html
prev: /programming/css/articles/README.md
date: 2024-01-10
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/442
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
  name="We can :has it all"
  desc="I’m still obsessed with how awesome and powerful :has() is in CSS. Ryan Mulligan really drives it home in We can :has it all with a single Pen that offers simple, realistic UI controls for: These are things you can easily imagine on any website, and now handled here entirely without JavaScript at all. Declarations […]"
  url="https://frontendmasters.com/blog/we-can-has-it-all/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/442"/>

I’m still obsessed with how awesome and powerful [<VPIcon icon="fa-brands fa-firefox"/>`:has()` is in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/:has). Ryan Mulligan really drives it home in [<VPIcon icon="fas fa-globe"/>We can `:has` it all](https://ryanmulligan.dev/blog/we-can-has-it-all/) with [a single Pen (<VPIcon icon="fa-brands fa-codepen"/>`hexagoncircle`)](https://codepen.io/hexagoncircle/pen/KKBBXQO) that offers simple, realistic UI controls for:

1. Changing color theme
2. Offering alternate layouts
3. Filtering by category

These are things you can easily imagine on any website, and now handled here entirely without JavaScript at all.

Declarations like this bring me joy:

```css
body:has([name="filter"][value="bakery"]:checked)
  .card:not([data-category="bakery"]) {
  display: none;
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "We can :has it all",
  "desc": "I’m still obsessed with how awesome and powerful :has() is in CSS. Ryan Mulligan really drives it home in We can :has it all with a single Pen that offers simple, realistic UI controls for: These are things you can easily imagine on any website, and now handled here entirely without JavaScript at all. Declarations […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/we-can-has-it-all.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
