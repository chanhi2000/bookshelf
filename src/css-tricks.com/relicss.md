---
lang: en-US
title: "ReliCSS"
description: "Article(s) > ReliCSS"
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
      content: "Article(s) > ReliCSS"
    - property: og:description
      content: "ReliCSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/relicss.html
prev: /programming/css/articles/README.md
date: 2026-01-28
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/relicss-audit.webp
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
  name="ReliCSS"
  desc="Stu Robson's ReliCSS (clever name!) tool can excavate outdated CSS in your codebase that have modern CSS solutions."
  url="https://css-tricks.com/relicss"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/relicss-audit.webp"/>

We all have a few skeletons in our CSS closets. There’s probably that one-off `!important` where you can now manage that more effectively with cascade layers. Or maybe a dated Checkbox Hack that `:has()` has solved. Perhaps it’s been a long while since your last site redesign and it’s chock-full of vendor-prefixed properties from 2012. *Thar be demons!*

Stu Robson’s [<VPIcon icon="fas fa-globe"/>ReliCSS](https://alwaystwisted.com/relicss/) (clever name!) tool can excavate outdated CSS in your codebase that have modern CSS solutions.

Each relic is assigned a level of severity. As Stu explains it:

> - **High Severity:** True “fossils”. Hacks for (now) unsupported browsers (IE6/7) or “dangerous” techniques. High-risk, obsolete, should be first targets for removal.
> - **Medium Severity:** The middle ground. Hacks for older unsupported browsers (IE8-10). They work but they’re fragile. Hacks to review to see if they’re still relevant for your actual users.
> - **Low Severity:** Modern artifacts. Usually vendor prefixes (-webkit-, -moz-). Safe mostly, but better handled by automated tools like Autoprefixer. They’re an opportunity to improve your build process.

It’s been a little while since my personal site got an overhaul. Not to toot my own horn, but heyyyyyy!

![Screenshot of a CSS audit using Stu Robson's ReliCSS tool. No issues are found.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-28-at-9.54.42-AM.png?resize=1724%2C868)

Seriously, though. I know there are things in there I’m embarrassed to admit.

But what if we do archeological dig on CSS-Tricks? I mean, it’s been [**at _least_ five years**](/css-tricks.com/design-v18.md) since this place has gotten the love it deserves. I’m almost afraid to look. Here goes…

![🫣](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-28-at-10.11.46-AM-1024x663.png?resize=1024%2C663&ssl=1)

OK, not as bad as I imagined. It’s largely vendor prefixing, which I’m sure comes courtesy of an older Autoprefixer configuration.

::: info

```component VPCard
{
  "title": "ReliCSS - Detect CSS Hacks & Modernise Your Code",
  "desc": "ReliCSS is a client-side CSS analyser that detects outdated CSS hacks, IE6-9 patterns, and deprecated vendor prefixes. Get instant modernisation suggestions with our free CSS scanner.",
  "link": "https://alwaystwisted.com/relicss",
  "logo": "https://www.alwaystwisted.com/relicss/logo.svg",
  "background": "rgba(255,127,0,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "ReliCSS",
  "desc": "Stu Robson's ReliCSS (clever name!) tool can excavate outdated CSS in your codebase that have modern CSS solutions.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/relicss.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
