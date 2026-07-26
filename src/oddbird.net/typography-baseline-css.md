---
lang: en-US
title: "Responsive and Fluid Typography with Baseline CSS Features"
description: "Article(s) > Responsive and Fluid Typography with Baseline CSS Features"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - oddbird.net
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Responsive and Fluid Typography with Baseline CSS Features"
    - property: og:description
      content: "Responsive and Fluid Typography with Baseline CSS Features"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/oddbird.net/typography-baseline-css.html
prev: /programming/css/articles/README.md
date: 2026-01-08
isOriginal: false
author:
  - name: Miriam Suzanne
    url: https://oddbird.net/authors/miriam/
cover: https://oddbird.net/assets/images/blog/2026/type-zoom-1600w.jpeg
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
  name="Responsive and Fluid Typography with Baseline CSS Features"
  desc="As designers, it makes sense to think about what space is available in the browser, and adjust your typography accordingly. It's also important to remember that different users will have different font-size needs -- and the more a font size is responsive to the viewport, the less responsive it will be to user inputs."
  url="https://oddbird.net/2026/01/08/typography-baseline-css/"
  logo="https://oddbird.net/safari-pinned-tab.svg"
  preview="https://oddbird.net/assets/images/blog/2026/type-zoom-1600w.jpeg"/>

::: info This post is part of a series on revisiting fluid typography:

```component VPCard
{
  "title": "Relative Units & Typography",
  "desc": "With special guest Alan Stearns",
  "link": "/oddbird.net/winging-it/15.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

```component VPCard
{
  "title": "Reimagining Fluid Typography",
  "desc": "Are we responding to the right inputs?",
  "link": "/oddbird.net/fluid-type.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

```component VPCard
{
  "title": "Revisiting Fluid Type",
  "desc": "With special guest Richard Rutter",
  "link": "/oddbird.net/winging-it/17.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

```component VPCard
{
  "title": "Designing for User Font-size and Zoom",
  "desc": "Using modern CSS units and math functions",
  "link": "/oddbird.net/size-preferences.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

```component VPCard
{
  "title": "The Best CSS Unit Might Be a Combination",
  "desc": "We don't have to choose between px and rem for spacing",
  "link": "/oddbird.net/type-units.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

```component VPCard
{
  "title": "Visualizing Responsive Typography",
  "desc": "What do all the numbers in our clamp() do?",
  "link": "/oddbird.net/type-visual.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

```component VPCard
{
  "title": "Responsive and Fluid Typography with Baseline CSS Features",
  "desc": "As designers, it makes sense to think about what space is available in the browser, and adjust your typography accordingly. It's also important to remember that different users will have different font-size needs -- and the more a font size is responsive to the viewport, the less responsive it will be to user inputs.",
  "link": "/oddbird.net/typography-baseline-css.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

:::

I spent much of 2025 on this blog digging into font-sizing and responsive/fluid typography, and it has changed the way I approach sizing text on the web. Feel free to read (and watch the videos) back through my process if you’re interested in the details – but this article on the web.dev blog provides a quick summary of my current approach.

I found that graphing various relationships helped me understand better how all the parts interact. I may do a follow-up post here exploring and explaining this chart in more detail:

The default settings show `calc(16px + 2.5vw)`. You can adjust the values and add `clamp()` ranges to [<VPIcon icon="fas fa-globe"/>the graph on Desmos](https://desmos.com/calculator/xruperkze1).
<!-- TODO: desmos 그래프  -->

This is really two graphs overlaid, using the same horizontal axis (viewport width in pixels) but a different vertical axis. Near the bottom, in `px` units, the base and zoomed font-size at different viewport widths, and a line showing that `2×` font-size grows at a much steeper pace than `200%` zoom. Above, in `%` units, we can see the effectiveness of various zoom values, and the zoom required to achieve a `2×` font-size.

Hopefully I got the math right, but let me know if I’ve missed something.

::: info Article Contents

- Negotiate a base font-size based on user preferences (I prefer the `clamp()` approach)
- Add responsiveness
- Warning: Viewport changes don’t always mean the same thing!
- Typographic scales with `pow()`
- Respond to the size of in-page containers

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive and Fluid Typography with Baseline CSS Features",
  "desc": "As designers, it makes sense to think about what space is available in the browser, and adjust your typography accordingly. It's also important to remember that different users will have different font-size needs -- and the more a font size is responsive to the viewport, the less responsive it will be to user inputs.",
  "link": "https://chanhi2000.github.io/bookshelf/oddbird.net/web.typography-baseline-css.html",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```
