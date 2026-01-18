---
lang: en-US
title: "Open Props @custom-media Recipes"
description: "Article(s) > Open Props @custom-media Recipes"
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
      content: "Article(s) > Open Props @custom-media Recipes"
    - property: og:description
      content: "Open Props @custom-media Recipes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/open-props-custom-media-recipes.html
prev: /programming/css/articles/README.md
date: 2026-01-23
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/open-props-custom-media-queries.jpg
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
  name="Open Props @custom-media Recipes"
  desc="The @custom-media at-rule has landed in Firefox Nightly! I couldn't find it in the release notes but Adam Argyle's on the beat noting that it's behind a flag"
  url="https://css-tricks.com/open-props-custom-media-recipes"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/open-props-custom-media-queries.jpg"/>

The `@custom-media` at-rule has landed in Firefox Nightly! I couldn’t find it in the [<VPIcon icon="fa-brands fa-firefox"/>release notes](https://firefox.com/en-US/firefox/149.0a1/releasenotes/) but [**Adam Argyle’s on the beat**](/nerdy.dev/custom-media.md) noting that it’s behind a flag for now.

![Look for `layout.css.custom-media.enabled`](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/custom-media-queries-firefox-nightly-flag.png?resize=1808%2C1334)

I often forget the exact name of an `@media` query or simply get tired writing something like `@media screen and (prefers-reduced-motion: no-preference)` over and over again. `@custom-media` will be a nice bit of relief to the ol’ muscle memory because it allows us to create aliases for queries.

In fact, Adam’s Open Props project has [more than 45 of them (<VPIcon icon="iconfont icon-github" />`argyleink/open-props`)](https://github.com/argyleink/open-props/blob/main/src/props.media.css) that make for excellent recipes:

```css
@custom-media --motionOK (prefers-reduced-motion: no-preference);

@media (--motionOK) {
  /* animations and transitions */
}
```

::: info Direct Link

<SiteInfo
  name="open-props/src/props.media.css at main · argyleink/open-props"
  desc="CSS custom properties to help accelerate adaptive and consistent design. - argyleink/open-props"
  url="https://github.com/argyleink/open-props/blob/main/src/props.media.css/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/402643958/641eff02-6323-4414-8f16-a579dd497e0f"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Open Props @custom-media Recipes",
  "desc": "The @custom-media at-rule has landed in Firefox Nightly! I couldn't find it in the release notes but Adam Argyle's on the beat noting that it's behind a flag",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/open-props-custom-media-recipes.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
