---
lang: en-US
title: "Masonry (with Animation) in CSS"
description: "Article(s) > Masonry (with Animation) in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Masonry (with Animation) in CSS"
    - property: og:description
      content: "Masonry (with Animation) in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/masonry-with-animation-in-css.html
prev: /programming/css/articles/README.md
date: 2026-07-17
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10445
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
  name="Masonry (with Animation) in CSS"
  desc="Masonry.js was famous for creating, uh, Masonry layouts. But it did something else, too: animate fluid grids. Here's a way to get that in native CSS as well as the layout."
  url="https://blog.master.dev/masonry-with-animation-in-css/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10445"/>

Perhaps you’ve seen the good news that [<VPIcon icon="fa-brands fa-firefox"/>`display: grid-lanes;`](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout) is [<VPIcon icon="iconfont icon-caniuse"/>starting to arrive](https://caniuse.com/css-grid-lanes) in browsers which replicates what we generally call “masonry” layout in CSS. It’s in Safari and feature-flagged in Chrome and Firefox. It gives this staggered grid item layout (with [<VPIcon icon="fas fa-globe"/>lots of possibilities](https://gridlanes.webkit.org/)) reminiscent of a brick wall, hence the name.

The name *really* comes from David DeSandro’s original library [<VPIcon icon="fas fa-globe"/>Masonry.js](https://masonry.desandro.com/) (and also [<VPIcon icon="fas fa-globe"/>Packery](https://packery.metafizzy.co/) and [<VPIcon icon="fas fa-globe"/>Isotope](https://isotope.metafizzy.co/layout-modes/masonry)). Those libraries accomplished the staggered layout well. But the foundation of them was a bunch of elements `float`ed. Here’s an original demo of Masonry.js:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f6ce7-1839-7816-95f9-544934543120"
  title="Masonry (Using Masonry.js)"
  :default-tab="['css','result']"
  :theme="dark"/>

If you *resize* that, you’ll see that Masonry.js **had another trick up its sleeve**: animation!

See, Masonry.js supported fluidity, such that if the number of items (based on an ideal width) that could “fit” on a horizontal row had to change, it would redo its calculation magic and animate the elements into new positions. Here’s a video of that.

<VidStack src="https://videopress.com/9a737db7-9939-48da-a2dd-63f4c3370b25" />

I thought about this when I saw a mind-blowing [demo from Bramus (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/ogBYjgm) in which grid items would animate to new positions under the same conditions. But Bramus’ demo uses actual grid layout! And the re-calculating grid was by virtue of `repeat`/`auto-fill` magic that grid has always been good at, like `grid-template-columns: repeat(auto-fill, 6rem);`

The trick in Bramus’ demo is that it’s not actual the grid items themselves that animate into new positions. It’s actually a *child element* of the grid items, which is set to cover the entire grid area by virtue of anchor positioning and an `inset` value that tracks the parent cell’s position. *Super cool.*

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, /* ... */);
  
  .cell {
    anchor-scope: --grid-cell;
    anchor-name: --grid-cell;

    .cell-content {
      transition: inset 0.2s ease;
      position: absolute;
      position-anchor: --grid-cell;
      inset: anchor(inside);
    }
  }
}
```

You don’t have to nest it like that; I just did it to make the structure clearer.

That feels pretty darn magical to me. I don’t know I would have thought of it, as it feels like to cover the cell you’d do `inset: 0;` and then there is nothing really to animate as that never changes. But apparently the `anchor(inside)` is dynamic enough that it animates even if the end result it essentially the same as `inset: 0;`

So here’s David’s original demo, with the JavaScript and floating ripped out, and a grid layout put in place instead, with the magical CSS from above:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f6d4c-2831-73d7-9d53-521369dcf6f6"
  title="Masonry (Using Animated Anchors)"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s a video of that, which is pretty darn close to the same as the JavaScript version.

<VidStack src="https://videopress.com/c70789f5-5745-4232-9790-3f40549501eb" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Masonry (with Animation) in CSS",
  "desc": "Masonry.js was famous for creating, uh, Masonry layouts. But it did something else, too: animate fluid grids. Here's a way to get that in native CSS as well as the layout.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/masonry-with-animation-in-css.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
