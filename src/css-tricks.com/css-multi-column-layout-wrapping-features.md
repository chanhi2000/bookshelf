---
lang: en-US
title: "New CSS Multi-Column Layout Features in Chrome"
description: "Article(s) > New CSS Multi-Column Layout Features in Chrome"
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
      content: "Article(s) > New CSS Multi-Column Layout Features in Chrome"
    - property: og:description
      content: "New CSS Multi-Column Layout Features in Chrome"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-multi-column-layout-wrapping-features.html
prev: /programming/css/articles/README.md
date: 2026-04-06
isOriginal: false
author:
  - name: Abhishek Pratap Singh
    url: https://css-tricks.com/author/abhishek/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/chrome-layout.webp
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
  name="New CSS Multi-Column Layout Features in Chrome"
  desc="Chrome 145 introduces the column-height and column-wrap CSS multi-column layout properties, enabling us to wrap the additional content into a new row."
  url="https://css-tricks.com/css-multi-column-layout-wrapping-features"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/chrome-layout.webp"/>

Multi-column layouts have not been used to their full potential, mostly because once content exceeded a limit, multi-column would force a horizontal scroll. It’s unintuitive and a UX no-no, especially on the modern web where the default scroll is vertical.

Take the following case for example:

<CodePen
  user="anon"
  slug-hash="ogLadmd"
  title="newspaper layout"
  :default-tab="['css','result']"
  :theme="dark"/>

The CSS code for that might look something like this:

```css
body {
  max-width: 700px;
}

.article {
  column-gap: 10px;
  column-count: 3;
  height: 350px;
}
```

When the content size exceeds the body container, multi-column creates additional columns and a horizontal scroll. However, we finally have the tools that have recently landed in Chrome that “fix” this without having to resort to trickier solutions.

[<VPIcon icon="fa-brands fa-chrome"/>Chrome 145](https://developer.chrome.com/blog/chrome-145-beta) introduces the `column-height` and `column-wrap` properties, enabling us to wrap the additional content into a new row below, creating a vertical scroll instead of a horizontal scroll. 

So, now we can do something like this in Chrome 145+:

```css
body {
  max-width: 700px;
}

.article {
  column-gap: 10px;
  column-count: 3;
  column-wrap: wrap;
  height: 350px;
}
```

And we get this nice multi-column layout that maintains the `column-count`:

![Multi-column layout example showing three columns from left to right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/multicolumn-04.png?resize=927%2C531)

This effectively transforms Multi-Column layouts into 2D Flows, helping us create a more web-appropriate scroll.

::: warning Browser Support

As of April 2026, [<VPIcon icon="iconfont icon-caniuse"/>`column-wrap`](https://caniuse.com/mdn-css_properties_column-wrap) and [<VPIcon icon="iconfont icon-caniuse"/>`column-height`](https://caniuse.com/mdn-css_properties_column-height) are available in Chrome 145+. Firefox, Safari, and Edge do not yet support these properties.

:::

---

## What this actually solves

The new properties can be genuinely useful in several cases:

### Fixed-height content blocks

This is probably one of the most useful use cases for these properties. If you’re working with content that has predictable or capped heights, like card grids where each card has a max-height, then this works beautifully. 

Toggle between `column-wrap: wrap` and `column-wrap: nowrap` in the following demo (Chrome 145+ needed) to check the difference.

<CodePen
  user="anon"
  slug-hash="RNRegrR"
  title="card grids with capped heights"
  :default-tab="['css','result']"
  :theme="dark"/>

In case you’re checking this in an unsupported browser, this is the `nowrap` layout:

![Multi-column layout example of four cards components in a row with horizontal scrolling.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-1.png?resize=1247%2C562)

And this is the `wrap` layout:

![Multi-column layout example of five cards components in a row that wraps to a second row.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-3.png?resize=1108%2C537)

Wrapping creates a much more seamless flow. 

However, in case the content-per-card is unbalanced, then even with wrapping, it can lead to unbalanced layouts:

<CodePen
  user="anon"
  slug-hash="gbMZjer"
  title="card grids with unbalanced heights"
  :default-tab="['css','result']"
  :theme="dark"/>

![A broken multi-column layout of card components. Some cards are split into multiple cards because the content is unbalanced.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image-5.png?resize=1153%2C568)

### Newspaper-style and Magazine-style layouts

Another real life use case is when designing newspaper-style layouts or sections where you’re willing to set explicit container and column heights. As can be seen in the earlier example, the combination of column-height and column-wrap helps make the layout responsive for different screen sizes, while retaining a more intuitive flow of information. 

### Block-direction carousels

This is my personal favorite use case of the `column-wrap` feature! By setting the column height to match the viewport (e.g., `100dvh`), you can essentially treat the multi-column flow as a pagination system, where your content fills the height of the screen and then “wraps” vertically. When combined with [**`scroll-snap-type`**](/css-tricks.com/almanac-properties/scroll-snap-type.md): y mandatory`, you get a fluid, vertical page-flipping experience that handles content fragmentation without any manual clipping or JavaScript calculation.

Play around with the following demo and check it out for yourself. Unless you’re on Chrome 145+ you’ll get a horizontal scroll instead of the intended vertical.

<CodePen
  user="anon"
  slug-hash="myEaGEW"
  title="vertical carousel"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/Screen-Recording-2026-02-17-at-9.41.27-AM.mov" />

There is a bit of a drawback to this though: If the content on a slide is too long, `column-wrap` will make it flow vertically, but the flow feels interrupted by that imbalance. 

---

## What they don’t solve

While these properties are genuinely helpful, they are not one-stop solutions for all multi-column designs. Here are a few situations where they might not be the “right” approach.

### Truly dynamic content

If the content height is unknown or unpredictable in advance (e.g., user-generated content, CMS-driven pages), then these properties are of little use. The design can still be wrapped vertically with the `column-wrap` property, however, the layout would remain unpredictable without a fixed column height.

It can lead to over-estimating the column height, leaving awkward gaps in the layout. Similarly, it can lead you to under-estimate the height, resulting in unbalanced columns. The fix here is then to use JS to calculate heights, which defeats the idea of a CSS-native solution.

### Media-query-free responsiveness

For a truly “responsive” layout, we still need to use media queries to adjust `column-count` and `column-height` for different viewport sizes. While the wrapping helps and creates incremental benefits for a CSS-native solution, it can only help adjust the overflow behavior. Hence, the dependency on media query persists when supporting varying screen sizes.

### Complex alignment needs

If you need precise control over where items sit in relation to each other, [**CSS Grid**](/css-tricks.com/complete-guide-css-grid-layout.md) is still a better option. While multi-column with wrapping gives you flow, it still lacks positioning control.

---

## Comparing alternatives

Let’s see how the multi-column approach compares with existing alternatives like CSS Grid, [**CSS Flexbox**](/css-tricks.com/snippets-css/a-guide-to-flexbox.md), and the [**evolving CSS Masonry**](/css-tricks.com/masonry-watching-a-css-feature-evolve.md), that offer similar layouts.

One key difference is that while grid and flexbox manage distinct containers, multi-column is the only system that can fragment a single continuous stream of content across multiple columns and rows. This makes it the best fit for presenting long-form content, like we saw in the newspaper layout example.

CSS Grid lets us control placement via the grid structure, making it great for [**complex layouts requiring precise positioning**](/css-tricks.com/snippets-css/css-grid-starter-layouts.md) or following asymmetric designs, like dashboards or responsive image galleries that need to [**`auto-fit`**](/css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit.md) according to the screen size.

Flexbox with wrapping is great for creating standard UI components like navigation bars and tag clouds that should wrap around on smaller screen sizes.

![Multi-column layout showing a navigation of eight items where a second row wraps starting at the fifth items.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/image.png?resize=778%2C183)

::: note

Chrome is also [experimenting (<VPIcon icon="fa-brands fa-bluesky"/>`did:plc:kesmfbtx2loscqj7ktw5shtt`)](https://bsky.app/profile/did:plc:kesmfbtx2loscqj7ktw5shtt/post/3lpcjcjn4w22r?ref_src=embed&ref_url=https%253A%252F%252Fjeffbridgforth.com%252Fnotes%252Fflex-wrap-balance%252F) with a new `flex-wrap: balance` keyword that could provide more wrapping control as well.

:::

CSS Grid and Flexbox with wrapping are both good fits for layouts where each item is independent. They work well with content of dynamic heights and provide better alignment control compared to a multi-column approach. However, multi-column with the updated properties has an edge when it comes to fragmentation-aware layouts as we’ve seen.

CSS Masonry, on the other hand, will be useful for interlocking items with varying heights. This makes it perfect for creating style boards (like Pinterest) that pack items with varying heights in an efficient and aesthetic manner. Another good use case is e-commerce websites that use a masonry grid for product displays because descriptions and images can lead to differing card heights.

---

## Conclusion

The new `column-wrap` and `column-height` properties supported in Chrome 145 could significantly increase the usability of multi-column layouts. By enabling 2D flows, we have a way to fragment content without losing the vertical scrolling experience.

That said, these features will not be a replacement for the structural precision of CSS Grid or the item-based flexibility of Flexbox. But they will fill a unique niche. As browser support continues to expand, the best way to approach multi-column layout is with an understanding of both its advantages and limitations. They won’t solve dynamic height issues or eliminate the need for media queries, but will allow flowing continuous content in a 2D space.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "New CSS Multi-Column Layout Features in Chrome",
  "desc": "Chrome 145 introduces the column-height and column-wrap CSS multi-column layout properties, enabling us to wrap the additional content into a new row.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-multi-column-layout-wrapping-features.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
