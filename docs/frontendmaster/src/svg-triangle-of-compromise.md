---
lang: en-US
title: "SVG triangle of compromise"
description: "Article(s) > SVG triangle of compromise"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > SVG triangle of compromise"
    - property: og:description
      content: "SVG triangle of compromise"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/svg-triangle-of-compromise.html
prev: /programming/css/articles/README.md
date: 2024-07-30
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/3290
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
  name="SVG triangle of compromise"
  desc="I enjoyed Micah R Ledbetter's SVG triangle of compromise and generally think it's a fair analysis of how any-which-way you use SVG on a page, you're giving up some kind of nice ability it could have. For instance, if you use SVG through an <img> tag, it's cached nicely, but you give up on CSS…"
  url="https://blog.master.dev/svg-triangle-of-compromise/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/3290"/>

I enjoyed Micah R Ledbetter’s [<VPIcon icon="fas fa-globe"/>SVG triangle of compromise](https://me.micahrl.com/blog/svg-triangle-of-compromise/) and generally think it’s a fair analysis of how any-which-way you use SVG on a page, you’re giving up some kind of nice ability it could have. For instance, if you use SVG through an `<img>` tag, it’s cached nicely, but you give up on CSS reaching in there to style things. If you drop it in as `<svg>`, you can style, but then it’s not cached well for repeated uses.

Then [<VPIcon icon="fas fa-globe"/>Scott Jehl chimed in](https://scottjehl.com/posts/svgtopia/) with a way to “have it all”. The crux of it is using the SVG `<use>` element to reference an SVG file (so you get caching and sizing) and you can set CSS `--custom-properties` that “pierce” the shadow DOM that `<use>` creates (that’s right, SVG can have a shadow DOM just like web components) and allow for styling.

This does solve all three angles, the caveats being 

1. you can’t cache the SVG (“sprite”, it’s usually called when you combine icons into a single file) on a different domain.
2. it’s a manual pain to set up SVGs to be entirely styled in this way. [<VPIcon icon="fas fa-globe"/>Scott’s tool](https://filamentgroup.github.io/iconoclash/demo/output/icons.html) might help with 2, but browsers need to help with 1.

```component VPCard
{
  "title": "Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits",
  "desc": "I'm a fan of just chucking SVG icons right into the HTML where you need them: <svg class=”icon icon-eye-dropper” width=”16” height=”16” viewBox=”0 0 16 16”> <path d=”...” /> <path d=”...” /> </svg> This has lots of benefits, like instant loading with no additional requests, and is 100% styleable, including all the internal parts (i.e. multicolor…",
  "link": "/blog.master.dev/mask-your-icons.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Unlocking SVG Styling Control with CSS Linked Parameters",
  "desc": "Discover how CSS Linked Parameters transform SVG usage for icons, enhancing styling control while maintaining efficient caching and accessibility.",
  "link": "/blog.master.dev/svg-linked-parameters-will-change-how-we-do-icon-systems.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Background Patterns with CSS `corner-radius`",
  "desc": "You might need to know this someday: you can style a div, put the div into SVG, then put the SVG in to CSS and use it as a repeating background.",
  "link": "/blog.master.dev/background-patterns-with-css-corner-radius.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SVG triangle of compromise",
  "desc": "I enjoyed Micah R Ledbetter's SVG triangle of compromise and generally think it's a fair analysis of how any-which-way you use SVG on a page, you're giving up some kind of nice ability it could have. For instance, if you use SVG through an <img> tag, it's cached nicely, but you give up on CSS…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/svg-triangle-of-compromise.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
