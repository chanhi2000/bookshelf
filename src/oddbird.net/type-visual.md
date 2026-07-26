---
lang: en-US
title: "Visualizing Responsive Typography"
description: "Article(s) > Visualizing Responsive Typography"
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
      content: "Article(s) > Visualizing Responsive Typography"
    - property: og:description
      content: "Visualizing Responsive Typography"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/oddbird.net/type-visual.html
prev: /programming/css/articles/README.md
date: 2025-08-26
isOriginal: false
author:
  - name: Miriam Suzanne
    url: https://oddbird.net/authors/miriam/
cover: https://oddbird.net/assets/images/blog/2025/tips-tricks-04-1600w.jpeg
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
  name="Visualizing Responsive Typography"
  desc="What do all the numbers in our clamp() do?"
  url="https://oddbird.net/2025/08/26/type-visual/"
  logo="https://oddbird.net/safari-pinned-tab.svg"
  preview="https://oddbird.net/assets/images/blog/2025/tips-tricks-04-1600w.jpeg"/>

There are multiple tools that can help create a fluid font-size calculation for CSS – generally expressed as a `clamp()` function combining `em` (or `rem`) with `vw` (or `vi`) units. But the results are difficult to understand at a glance, so I wanted to visualize what’s going on, and how the various units interact.

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

<VidStack src="youtube/a59ui2j8WU4" />

The simplest interaction between font-size and viewport width would be a 1-to-1 relationship – keeping the values equal at all times. We can express that in CSS as a font-size of `100vw`.

```css
html { font-size: 100vw; }
```

That’s very direct and simple, but a terrible idea. When the viewport width is `0px`, the font-size is also `0px`. If the viewport grows to be `3250px`, the font-size will also be `3250px`. The viewport can’t go below `0px`, but ([<VPIcon icon="fas fa-globe"/>in theory](https://meyerweb.com/eric/thoughts/2025/08/07/infinite-pixels/)) there’s no upper limit here.

Tools like [<VPIcon icon="fas fa-globe"/>Utopia.fyi](https://utopia.fyi/type/calculator/) will give you a more complex output with several parts:

```css
:root {
  --step-0: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem);
}
```

I built a Codepen visualization to see how things change as I adjust the different values:

<CodePen
  link="https://codepen.io/editor/miriamsuzanne/pen/0198be16-c4b8-71e7-9b81-15c2589c463f"
  title="Responsive Type Visualization"
  :default-tab="['css','result']"
  :theme="dark"/>

We could start by setting a more leisurely rate of change – adjusting the slope (or *rate*) of growth. To do that, we need to adjust the `vw` value. At `50vw` we would get a font that scales at half the rate of the viewport, but even that seems too dramatic. The [<VPIcon icon="fas fa-globe"/>default scale from Utopia.fyi](https://utopia.fyi/type/calculator/) uses `0.2273vw` for the primary font size. That’s a `1px` font-size change for every `440px` of viewport resizing! Even the largest font in that scale uses less than a `2vw` response rate. Let’s round it off for the sake of our demo:

```css
html { font-size: 0.25vw; }
```

Now we’re growing at a more reasonable rate, but now our font is way too small. It still starts at `0px` for a `0px` viewport – and would only be `1px` tall on a `400px` screen. At that rate, we won’t get to a standard `16px` font size until the browser hits `6400px` – a very wide screen. This subtle slope only makes sense if we start with an offset. We can do that by adding two values together:

```css
html { font-size: calc(17px + 0.25vw); }
```

That offset value moves our slope up and down in the visualization, without impacting the slope that we set earlier. Now a `400px` browser will give us `18px` font-size, and a `1200px` browser will result in a `20px` font. That’s much more appropriate!

But we still have infinite scaling, and we don’t really need that. We could improve our algorithm even more by providing boundaries with a `clamp()` function:

```css
html { font-size: clamp(18px, 17px + 0.25vw, 20px); }
```

That establishes a fixed *range* for our font-size change, which we can think about in two ways. On the surface we can see the font-size range from `18px` to `20px`. But when we combine that with the slope and offset, we also have a range of viewport sizes where the font is in transition between those two sizes. In this case, the font begins to grow once the viewport is larger than `400px`, and stops growing when we reach `1200px`.

As a tool, Utopia starts from these four inputs – min font-size, min viewport, max font-size, and max viewport – and works backwards to determine the proper offset and slope.

---

## Accessibility Issues

I think this is a useful pattern. I like somewhat smaller fonts in tight spaces, and larger fonts when there’s more room. But that comes with caveats – and it’s important for users to get final say with the ability to zoom in or out. If we’re not careful, viewport units and clamp functions can make fonts unable to zoom. I show a few examples of that in my video above, and there are more [**situations to watch out for**](/smashingmagazine.com/addressing-accessibility-concerns-fluid-type.md), but a simple rule you can follow:

::: info "Addressing Accessibility Concerns With Using Fluid Type
" *From Smashing Magazine* (<VPIcon icon="fas fa-globe"/><code>smashingmagazine.com</code>)

> If the maximum font size is less than or equal to 2.5 times the minimum font size, then the text will always pass WCAG SC 1.4.4, at least on all modern browsers.
> 
> —[**Maxwell Barvian**](/smashingmagazine.com/addressing-accessibility-concerns-fluid-type.md)

:::

Utopia helpfully provides a warning when we create scales that are inaccessible. Maybe I can add that to my demo as well. In the meantime, play with that ‘page zoom’ slider to test different values and see how they interact.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Visualizing Responsive Typography",
  "desc": "What do all the numbers in our clamp() do?",
  "link": "https://chanhi2000.github.io/bookshelf/oddbird.net/type-visual.html",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```
