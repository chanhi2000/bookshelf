---
lang: en-US
title: "Tweaking One Set of Colors for Light/Dark Modes"
description: "Article(s) > Tweaking One Set of Colors for Light/Dark Modes"
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
      content: "Article(s) > Tweaking One Set of Colors for Light/Dark Modes"
    - property: og:description
      content: "Tweaking One Set of Colors for Light/Dark Modes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/tweaking-one-set-of-colors-for-light-dark-modes.html
prev: /programming/css/articles/README.md
date: 2024-11-25
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4579
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
  name="Tweaking One Set of Colors for Light/Dark Modes"
  desc="A CSS Custom Property can be used to tweak colors darker when shown on light and lighter when shown on dark, making them pop in both cases. "
  url="https://frontendmasters.com/blog/tweaking-one-set-of-colors-for-light-dark-modes/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4579"/>

Often when dealing light/dark modes, you’re thinking about *entirely changing* colors. A light color becomes a dark color and vice versa. That’s the nature of the situation!

But think about the oranges. The pinks. The greens and blues. Those are colors that have a decent chance of working OK in both a dark and light theme.

Here’s the thing:

- If you’ve got a pink that looks great on light, it probably should be brightened a bit on dark.
- Or, if you’ve got a pink that looks great on dark, it probably should be darkened a bit on light.

An example of something like this is syntax highlighting colors so that’s what we’ll do here. But it could be anything: illustration parts, your `<hr />` elment, buttons, whatever.

Here’s a pink:

```css
.some-tag {
  /* pink! */
  color: oklch(0.75 0.2 328);
}
```

Which looks fine on white (and has accessible contrast):

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/Screenshot-2024-11-23-at-9.54.49%E2%80%AFAM.png?resize=772%2C282&ssl=1)

Set it on black, and it still has accessible contrast, and looks… also fine.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/Screenshot-2024-11-23-at-9.56.08%E2%80%AFAM.png?resize=714%2C302&ssl=1)

But I think we could do better. We certainly could have picked a color that *didn’t* meet accessible contrast requirements. But also, I think it would look a bit nicer if that pink was darkened up a smidge on light and lightened up a bit dark.

Fortunately we’ve set the color in OKLCH which has perceptually uniform brightness. Meaning if we have a bunch of colors, and we notch them all up in brightness by the same number, they will all appear *about the same amount brighter* to our human eyes.

A way to approach this is to pick a number of how much we want to bright, darken (or both). Like:

```css
html {
  color-scheme: light dark;

  --colorAdjuster: -0.1;
  @media (prefers-color-scheme: light) {
    --colorAdjuster: 0.133;
  }
}
```

Then use this number to adjust our color(s):

```css
.some-tag {
  color: oklch(calc(0.75 - var(--colorAdjuster)) 0.2 328);
}
```

Here’s an example doing that with syntax highlighting. You’ll need to adjust your color mode preference to see the colors change.

<CodePen
  user="chriscoyier"
  slug-hash="yLmQoed"
  title="Colors for Light and Dark Mode Automatically"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Here’s both modes as images:

<ImageGallery paths="
  https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/Screenshot-2024-11-23-at-10.19.53%E2%80%AFAM.png?resize=842%2C312&ssl=1
  https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/Screenshot-2024-11-23-at-10.19.37%E2%80%AFAM.png?resize=834%2C302&ssl=1
"/>

In my opinion, these colors have a very similar feel, but each color, from a base, was darkened a bit in light mode and lightened a bit in dark mode.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Tweaking One Set of Colors for Light/Dark Modes",
  "desc": "A CSS Custom Property can be used to tweak colors darker when shown on light and lighter when shown on dark, making them pop in both cases. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/tweaking-one-set-of-colors-for-light-dark-modes.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
