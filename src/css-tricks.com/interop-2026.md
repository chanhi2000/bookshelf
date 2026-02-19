---
lang: en-US
title: "Interop 2026"
description: "Article(s) > Interop 2026"
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
      content: "Article(s) > Interop 2026"
    - property: og:description
      content: "Interop 2026"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/interop-2026.html
prev: /programming/css/articles/README.md
date: 2026-02-17
isOriginal: false
author:
  - name: Geoff Graham
    url: https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/interop-2026.webp
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
  name="Interop 2026"
  desc="Interop 2026 is officially a thing and there's plenty of new (and even old) CSS features that we can look forward to being cross-browser compatible and consistent!"
  url="https://css-tricks.com/interop-2026"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/interop-2026.webp"/>

Interop 2026 is formally a thing. So, you know all of those wild, new CSS features we’re always poking at but always putting under a “lack of browser support” caveat? The Big Three — Blink (Chrome/Edge), WebKit (Safari), and Mozilla (Firefox) — are working together to bring full and consistent support to them!

You can read the blog posts yourself:

<SiteInfo
  name="Interop 2026: Continuing to improve the web for developers  |  Blog  |  web.dev"
  desc="Learn about the features included in Interop 2026."
  url="https://web.dev/blog/interop-2026/"
  logo="https://gstatic.com/devrel-devsite/prod/v42d9052331253c5e46fac91d63485bcb64958677ac05742343a67967833ba5d8/web/images/favicon.png"
  preview="https://web.dev/static/blog/interop-2026/image/hero.png"/>

<SiteInfo
  name="Launching Interop 2026 – Mozilla Hacks - the Web developer blog"
  desc="Interop 2025 brought a bunch of new web platform features & fixes, but here's what's coming in 2026…"
  url="https://hacks.mozilla.org/2026/02/launching-interop-2026/"
  logo="https://hacks.mozilla.org/favicon.ico"
  preview="https://hacks.mozilla.org/wp-content/uploads/2026/02/interop-scores.png"/>

An, yes, there’s *plenty* to get excited about specifically for CSS:

---

## Anchor positioning

From [**our guide**](/css-tricks.com/css-anchor-positioning-guide.md):

::: info Article on Apr 28, 2025 (<VPIcon icon="iconfont icon-css-tricks"/><code>css-tricks.com</code>)

> CSS Anchor Positioning gives us a simple interface to attach elements next to others just by saying which sides to connect — directly in CSS. It also lets us set a fallback position so that we can avoid the overflow issues we just described.

:::

<!-- TODO: /css-tricks.com/anchor-positioning-just-dont-care-about-source-order.md -->
<!-- TODO: /css-tricks.com/anchor-positioning-quirks.md -->
<!-- TODO: /css-tricks.com/css-anchor-positioning-guide.md -->

```component VPCard
{
  "title": "A First Look at the Interest Invoker API (for Hover-Triggered Popovers)",
  "desc": "Chrome 139 is experimenting with Open UI’s proposed Interest Invoker API, which would be used to create tooltips, hover menus, hover cards, quick actions, and other types of UIs for showing more information with hover interactions.",
  "link": "/css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/fancy-menu-navigation-using-anchor-positioning.md -->

---

## Advanced `attr()`

We’ve actually had the `attr()` function for something like 15 years. But now we’re gonna be able to pass variables in there… *with type conversion!*

<!-- TODO: /css-tricks.com/almanac-functions/attr.md -->

```component VPCard
{
  "title": "CSS Bar Charts Using Modern Functions",
  "desc": "CSS-only bar charts are one of those things we've tackled a bunch of times in different ways. But how can modern CSS features finally make it not only trivial, but fun?",
  "link": "/css-tricks.com/css-bar-charts-using-modern-functions.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/css-attr-function-got-nothin-custom-properties.md -->

---

## Container style queries

We can already [**query containers by “type”**](/css-tricks.com/almanac-properties/container-type.md) but only by size. It’ll be so much cooler when we can apply styles based on other styles. Say:

```css
@container style((font-style: italic) and (--color-mode: light)) {
  em, i, q {
    background: lightpink;
  }
}
```

<!-- TODO: /css-tricks.com/a-cornucopia-of-container-queries.md -->
<!-- TODO: /css-tricks.com/early-days-of-container-style-queries.md -->
<!-- TODO: /css-tricks.com/digging-deeper-into-container-style-queries.md -->
<!-- TODO: /css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md -->

```component VPCard
{
  "title": "CSS Container Queries",
  "desc": "The main idea of CSS Container Queries is to register an element as a “container” and apply styles to other elements when the container element meets certain conditions.",
  "link": "/css-tricks.com/css-container-queries.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

---

## The `contrast-color()` function

Getting the right color contrast between foreground text and background can be easy enough, but it’s been more of a manual type thing that we might switch with a media query based on the current color scheme. With `contrast-color()` (I always want to write that as `color-contrast()`, maybe because [**that was the original name**](/css-tricks.com/exploring-color-contrast-for-the-first-time.md)) we can dynamically toggle the `color` between white and black.

```css
button {
  --background-color: darkblue;
  background-color: var(--background-color);
  color: contrast-color(var(--background-color));
}
```

<!-- TODO: /css-tricks.com/exploring-color-contrast-for-the-first-time.md -->
<!-- TODO: /css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md -->
<!-- TODO: /css-tricks.com/the-thing-about-contrast-color.md -->

```component VPCard
{
  "title": "Approximating contrast-color() With Other CSS Features",
  "desc": "The new contrast-color() function is not fully supported yet. But can we still implement it in a cross-browser friendly way using other new CSS features?",
  "link": "/css-tricks.com/approximating-contrast-color-with-other-css-features.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

---

## Custom Highlights

*Highlight all the things!* We’ve had `::selection` forever, but now we’ll have a bunch of others:

| Pseudo-selector | Selects… | Notes |
| --- | --- | --- |
| `::search-text` | Find-in-page matches | `::search-text:current`selects the current target |
| [**`::target-text`**](/css-tricks.com/almanac-pseudo-selectors/target-text.md) | Text fragments | Text fragments allow for programmatic highlighting using URL parameters. If you’re referred to a website by a search engine, it might use text fragments, which is why `::target-text` is easily confused with `::search-text`. |
| [`::selection`](/css-tricks.com/almanac-pseudo-selectors/selection.md) | Text highlighted using the pointer |  |
| [**`::highlight()`**](/css-tricks.com/css-custom-highlight-api-early-look.md) | Custom highlights as defined by JavaScript’s [**Custom Highlight API**](/css-tricks.com/css-custom-highlight-api-early-look.md) |  |
| [<VPIcon icon="fa-brands fa-firefox"/>`::spelling-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::spelling-error) | Incorrectly spelled words | Pretty much applies to editable content only |
| [<VPIcon icon="fa-brands fa-firefox"/>`::grammar-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::grammar-error) | Incorrect grammar | Pretty much applies to editable content only |

<!-- TODO: /css-tricks.com/css-custom-highlight-api-early-look.md -->

```component VPCard
{
  "title": "How to Style the New ::search-text and Other Highlight-y Pseudo-Elements",
  "desc": "Chrome 144 recently shipped ::search-text, which is now one of several highlight-related pseudo-elements. This one selects find-in-page text, which is the text that gets highlighted when you do a Ctrl/Command + F-type search for something on a page and matches are found.",
  "link": "/css-tricks.com/how-to-style-the-new-search-text-and-other-highlight-pseudo-elements.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

---

## Dialogs and popovers

Finally, a JavaScript-less (and declarative) way to set elements on the top layer! We’ve really dug into these over the years.

<!-- TODO: /css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md -->
<!-- TODO: /css-tricks.com/poppin-in.m/ -->

```component VPCard
{
  "title": "There is No Need to Trap Focus on a Dialog Element",
  "desc": "Accessibility advice around modals have commonly taught us to trap focus within the modal. Upon further research, it seems like we no longer need to trap focus within the <dialog> (even in modal mode).",
  "link": "/css-tricks.com/there-is-no-need-to-trap-focus-on-a-dialog-element.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/popover-the-balloons.md -->
<!-- TODO: /css-tricks.com/working-with-multiple-css-anchors-and-popovers-inside-the-wordpress-loop.md -->
<!-- TODO: /css-tricks.com/creating-an-auto-closing-notification-with-an-html-popover.md -->

```component VPCard
{
  "title": "A First Look at the Interest Invoker API (for Hover-Triggered Popovers)",
  "desc": "Chrome 139 is experimenting with Open UI’s proposed Interest Invoker API, which would be used to create tooltips, hover menus, hover cards, quick actions, and other types of UIs for showing more information with hover interactions.",
  "link": "/css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Getting Creative With HTML Dialog",
  "desc": "So, how can you take dialogue box design beyond the generic look of frameworks and templates? How can you style them to reflect a brand’s visual identity and help to tell its stories? Here’s how I do it in CSS using ::backdrop, backdrop-filter, and animations.",
  "link": "/css-tricks.com/getting-creative-with-html-dialog.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/meet-new-dialog-element.md -->

```component VPCard
{
  "title": "Prevent a page from scrolling while a dialog is open",
  "desc": "Bramus:",
  "link": "/css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md -->
<!-- TODO: /css-tricks.com/some-hands-on-with-the-html-dialog-element.md -->

---

## Media pseudo-classes

How often have you wanted to style an `<audio>` or `<video>` element based on its state? Perhaps with, JavaScript, right? We’ll have several states in CSS to work off:

- `:playing`
- `:paused`
- `:seeking`
- `:buffering`
- `:stalled`
- `:muted`
- `:volume-locked`

I love this example [<VPIcon icon="iconfont icon-webdev"/>from the WebKit announcement](https://webkit.org/blog/17818/announcing-interop-2026/#media-pseudo-classes):

```css
video:buffering::after {
  content: "Loading...";
}
```

---

## Scroll-driven animations

OK, we all want this one. We’re talking specifically about animation that responds to scrolling. In other words, there’s a direct link between scrolling progress and the animation’s progress.

```css
#progress {
  animation: grow-progress linear forwards;
  animation-timeline: scroll();
}
```

<!-- TODO: /css-tricks.com/scroll-driven-animations-inside-a-css-carousel.md -->
<!-- TODO: /css-tricks.com/scroll-driven-sticky-heading.md -->

```component VPCard
{
  "title": "Bringing Back Parallax With Scroll-Driven CSS Animations",
  "desc": "Parallax is a pattern in which different elements of a webpage move at varying speeds as the user scrolls, creating a three-dimensional, layered appearance. It once required JavaScript. Now we have scroll-driven animations in CSS, which is free from the main-thread blocking that can plague JavaScript animations.",
  "link": "/css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/modern-scroll-shadows-using-scroll-driven-animations.md -->
<!-- TODO: /css-tricks.com/scroll-driven-animations-notebook.md -->
<!-- TODO: /css-tricks.com/unleash-the-power-of-scroll-driven-animations.md -->
<!-- TODO: /css-tricks.com/slide-through-unlimited-dimensions-with-css-scroll-timelines.md -->
<!-- TODO: /css-tricks.com/web-slinger-css-like-wow-js-but-with-css-y-scroll-animations.md -->

---

## Scroll snapping

Nothing new here, but bringing everyone in line with how the specs have changed over the years!

<!-- TODO: /css-tricks.com/almanac-properties/scroll-margin.md -->
<!-- TODO: /css-tricks.com/almanac-properties/scroll-padding.md -->
<!-- TODO: /css-tricks.com/almanac-properties/scroll-snap-align.md -->
<!-- TODO: /css-tricks.com/almanac-properties/scroll-snap-stop.md -->
<!-- TODO: /css-tricks.com/almanac-properties/scroll-snap-type.md -->
<!-- TODO: /css-tricks.com/css-scroll-snap-slide-deck.md -->
<!-- TODO: /css-tricks.com/how-i-added-scroll-snapping-to-my-twitter-timeline.md -->
<!-- TODO: /css-tricks.com/how-to-use-css-scroll-snap.md -->

```component VPCard
{
  "title": "Introducing CSS Scroll Snap Points",
  "desc": "Before this new CSS I'm about to introduce existed, locking an element into the viewport on scroll required rigging up some JavaScript. As you may know,",
  "link": "/css-tricks.com/introducing-css-scroll-snap-points.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Practical CSS Scroll Snapping",
  "desc": "CSS scroll snapping allows you to lock the viewport to certain elements or locations after a user has finished scrolling. It’s great for building interactions",
  "link": "/css-tricks.com/practical-css-scroll-snapping.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

---

## The `shape()` function

This is one that Temani has been all over lately and his [<VPIcon icon="fas fa-globe"/>SVG Path to Shape Converter](https://css-generators.com/svg-to-css/) is a must-bookmark. The `shape()` can draw complex shapes when clipping elements with the [**`clip-path`**](/css-tricks.com/almanac-properties/clip-path.md) property. We’ve had the ability to draw basic shapes for years — think `circle`, `ellipse()`, and `polygon()` — but no “easy” way to draw more complex shapes. And now we have something less SVG-y that accepts CSS-y units, calculations, and whatnot.

```css
.clipped {
  width: 250px;
  height: 100px;
  box-sizing: border-box;
  background-color: blue;
  clip-path: shape(
    from top left,
    hline to 100%,
    vline to 100%,
    curve to 0% 100% with 50% 0%,
  );
}
```

TODO: /css-tricks.com/css-shape-commands.md

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 2: More on Arcs",
  "desc": "This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 3: Curves",
  "desc": "This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-3-curves.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 4: Close and Move",
  "desc": "The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TOOD: /css-tricks.com/svg-to-css-shape-converter.md -->

---

## View transitions

There are two types of view transitions: same-document (transitions on the same page) and cross-document (or what we often call multi-page transitions). Same-page transitions went Baseline in 2025 and now browsers are working to be cross-compatible implementations of cross-document transitions.

```component VPCard
{
  "title": "Toe Dipping Into View Transitions",
  "desc": "The View Transitions API is more a set of features than it is about any one particular thing. And it gets complex fast. But in this post, we’ll cover a couple ways to dip your toes into the waters without having to dive in head-first.",
  "link": "/css-tricks.com/toe-dipping-into-view-transitions.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/what-on-earth-is-the-types-descriptor-in-view-transitions.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition-group.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition-image-new.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition-image-old.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition-image-pair.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition-new.md -->
<!-- TODO: /css-tricks.com/almanac-pseudo-selectors/view-transition-old.md -->
<!-- TODO: /css-tricks.com/almanac-rules/view-transition.md -->
<!-- TODO: /css-tricks.com/almanac-functions/view.md -->
<!-- TODO: /css-tricks.com/almanac-properties/view-transition-class.md -->
<!-- TODO: /css-tricks.com/almanac-properties/view-transition-name.md -->

---

## CSS `zoom` property

Oh, I wasn’t expecting this! I mean, we’ve had `zoom` for years — our [**Almanac page**](/css-tricks.com/almanac-properties/zoom.md) was published back in 2011 — but as a non-standard property. I must have overlooked that it was Baseline 2024 newly available and worked on as part of Interop 2025. It’s carrying over into this year.

`zoom` is sorta like the [**`scale()` function**](/css-tricks.com/almanac-properties/transform.md#values), but it actually affects the layout whereas `scale()` it’s merely visual and will run over anything in its way.

That’s a wrap! Bookmark the [<VPIcon icon="fas fa-globe"/>Interop 2026 Dashboard](https://wpt.fyi/interop-2026) to keep tabs on how things are progressing along.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Interop 2026",
  "desc": "Interop 2026 is officially a thing and there's plenty of new (and even old) CSS features that we can look forward to being cross-browser compatible and consistent!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/interop-2026.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
