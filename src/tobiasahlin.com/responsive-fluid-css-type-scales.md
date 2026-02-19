---
lang: en-US
title: "Responsive type scales with composable CSS utilities"
description: "Article(s) > Responsive type scales with composable CSS utilities"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - tobiasahlin.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Responsive type scales with composable CSS utilities"
    - property: og:description
      content: "Responsive type scales with composable CSS utilities"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tobiasahlin.com/responsive-fluid-css-type-scales.html
prev: /programming/css/articles/README.md
date: 2023-09-22
isOriginal: false
author:
  - name: Tobias Ahlin
    url: https://x.com/tobiasahlin
cover: https://tobiasahlin.com/static/-social/og_blog-responsive-fluid-css-type-scales.jpg
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
  name="Responsive type scales with composable CSS utilities"
  desc="With the help of calc(), clamp() and CSS vars, we can create composable, responsive, and fluid type scales that smoothly adapts to viewport and container widths."
  url="https://tobiasahlin.com/blog/responsive-fluid-css-type-scales/"
  logo="https://tobiasahlin.com/images/touch-icon-ipad-retina.png"
  preview="https://tobiasahlin.com/static/-social/og_blog-responsive-fluid-css-type-scales.jpg"/>

If you’ve ever attempted to create responsive type that seamlessly adapts and scales between pre-determined sizes within a type scale based on viewport or container widths, you may have wrestled with JavaScript or wrangled with CSS calculators. But with the help of [<VPIcon icon="fa-brands fa-firefox"/>`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc), [<VPIcon icon="fa-brands fa-firefox"/>`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), and a somewhat wonky use of [<VPIcon icon="fa-brands fa-firefox"/>CSS vars](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), we can simplify this process and tap into the dynamism that modern CSS affords. We can create truly fluid type scales, with composable and responsive type utilities that let your type resize and adapt to the viewport or container width.

Here’s a demo of what we’ll set up (resize the browser window to preview the effect—it works in the latest version of all major browsers):

::: normal-demo

```html
<div class="post-demo-content">
  <div class="subheader">32px - 124px</div>
  <div class="h1">Whereas recognition of the inherent&nbsp;dignity</div>
  <div class="subheader">24px - 80px</div>
  <div class="h2">Whereas recognition of the inherent&nbsp;dignity</div>
  <div class="subheader">16px - 64px</div>
  <div class="h3">Whereas recognition of the inherent&nbsp;dignity</div>
  <div class="subheader">12px - 48px</div>
  <div class="h4">Whereas recognition of the inherent&nbsp;dignity</div>
</div>
```

```css
* {
/* :root { */
  --min-size: 16;
  --max-size: 16;
  --viewport-min: 320;
  --viewport-max: 2400;

  --container-min: 320;
  --container-max: 2400;
}

.h1, .h2, .h3, .h4 {
  --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100vw - var(--viewport-min) * 1px) / (var(--viewport-max) - var(--viewport-min)));
  --font-size-container: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
  font-size: clamp(var(--min-size) * 1px, var(--font-size-container), var(--max-size) * 1px);
  line-height: 1.1em;
  text-wrap: balance;
}

.h1 { --min-size: 32;--max-size: 128; }
.h2 { --min-size: 24;--max-size: 96; }
.h3 { --min-size: 16;--max-size: 64; }
.h4 { --min-size: 12;--max-size: 48; }
.f4min { --min-size: var(--h4); }
.fmin-s { --viewport-min: var(--breakpoint-s); }
.fmax-xl { --viewport-max: var(--breakpoint-xl); }
.post-demo-content {
  text-align: left;
  padding-top: 60px;
  padding-bottom: 120px;
}
.subheader {
  letter-spacing: 0.1em;
  font-weight: 500;
  font-size: 12px;
  margin-top: 40px;
}
```

```json
```

:::

What follows is an in-depth exploration of how to achieve this effect. If you simply whish to drop this functionality into a project, I’ve collected a range of type scale CSS utilities—with breakpoint classes and other methods of achieveing higher granularity of type control—in a small type scale library called [bendable (<VPIcon icon="iconfont icon-github"/>`tobiasahlin/bendable`)](https://github.com/tobiasahlin/bendable).

---

## Jumping through hoops

Creating this calculation should, in theory, be reasonably straightforward, but the rigidity of CSS `calc()` can make the process feel like you’re navigating a semantic minefield. Unfortunately, CSS `calc()` does currently not allow for implicit conversions between unitless numbers and pixel values, so getting the syntax exactly right can be tricky. These restrictions [<VPIcon icon="iconfont icon-w3c"/>have been relaxed in the css-values-4 spec](https://w3.org/TR/css-values-4/#calc-type-checking), but until those changes are implemented and widely supported in browsers, we’ll have to work around the current limitations.

One method of bypassing the current limitations is to, whenever possible, pass around values as unitless numbers, not as pixel values, and then convert them to pixels when we need them as pixels (by multiplying them with `1px`). With this strategy, we can achieve adaptive type that stays true to a pre-determined type scale. Here’s a breakdown of the calculation (line breaks and comments for clarity):

```css
.container-adaptive {
  --font-size: calc(
    /* Minimum size in pixels -> the starting point */
    var(--min-size) * 1px +
    /* Diff between min and max -> how much should we add in total? */
    ((var(--max-size) - var(--min-size)) *
      /* Container size minus starting point -> how far are we? */
    (100cqw - var(--container-min) * 1px) /
    /* Diff between min and max container width -> the range */
    (var(--container-max) - var(--container-min))
  );

  /* Clamp between min and max, to avoid overshooting */
  font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
}
```

---

## Unpacking the calculation

In plain English, the formula to calculate the `font-size` is minimum font size + diff between min and max font size \* current container width relative to its min and max values. In its enterity, it reads `calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)))`. Again, the calculation is a bit tricky to get right with CSS `calc()`, and looks a bit wonky, because we:

- Can’t add a unitless number to a pixel value (`calc(5px + 5)` is invalid)
- Can’t divide a pixel value by a pixel value (`calc(10px / 2px)` is invalid)
- Can’t multiply a pixel value with a pixel value (`calc(5px * 2px)` is invalid)

In other words, when performing addition and subtraction, both values need to be of the same format. When conducting division and multiplication, at least one of the arguments must be a unitless number. To ensure the calculation works within these constraints, we initially set all values as unitless numbers and convert them to pixels when needed.

When it all comes together, our variable and calculation setup can then look like something like this (notice the variables’ lack of `px` units—pixels are implied in all of these variables):

```css
:root {
  --min-size: 12;
  --max-size: 18;
  --container-min: 320;
  --container-max: 2400;
  --viewport-min: 320;
  --viewport-max: 2400;
}

.container-adaptive {
  --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
  font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
}

.viewport-adaptive {
  --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100vw - var(--viewport-min) * 1px) / (var(--viewport-max) - var(--viewport-min)));
  font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
}
```

Finally, we use `clamp()` to avoid overshooting our min and max values. With this specific setup, the font size will be set to `12px` when the container or viewport is `320px` or smaller, scale linearly from `12px` to `18px` between a container/viewport size of `320px` and `2400px`, and then stop at `18px` when the container or viewport width reaches `2400px`. To set the size relative to the viewport size, we use the [<VPIcon icon="fa-brands fa-firefox"/>`vw`](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units) unit, and to set it relative to the container, we use the [<VPIcon icon="fa-brands fa-firefox"/>`cqw`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries) unit.

---

## Setting up utilities

With that as our starting point, we can set up a few utilities to independently set the maximum and minimum values, to easily scale between two points in a type scale:

```css
:root {
  --min-size: 12;
  --max-size: 18;
  --container-min: 320;
  --container-max: 2400;
}

/* Setup size calculation for all max utilities */
.h1-max, .h2-max, .h3-max, .h4-max, .h5-max, .h6-max, .h7-max, .h8-max {
  --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
  font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
}

.h1-max { --max-size: 128; }
.h2-max { --max-size: 96; }
.h3-max { --max-size: 64; }
.h4-max { --max-size: 48; }
.h5-max { --max-size: 32; }
.h6-max { --max-size: 24; }
.h7-max { --max-size: 16; }
.h8-max { --max-size: 12; }

.h1-min { --min-size: 128; }
.h2-min { --min-size: 96; }
.h3-min { --min-size: 64; }
.h4-min { --min-size: 48; }
.h5-min { --min-size: 32; }
.h6-min { --min-size: 24; }
.h7-min { --min-size: 16; }
.h8-min { --min-size: 12; }
```

With those utilities, this markup effectively reproduces the demo in the beginning of the post:

```html
<!-- Mix and match as you wish -->
<h1 class="h5-min h1-max">...</h1>
<h2 class="h6-min h2-max">...</h2>
<h3 class="h7-min h3-max">...</h3>
<h4 class="h8-min h4-max">...</h4>
```

…but you can use any combination of max and min utilities to easily change the start and end sizes, and it’ll all smoothly scale between those two sizes.

The versatility of fluid and adaptive typography presents a range of exciting possibilities. I’ve explored this concept further in a small type scale library called [bendable (<VPIcon icon="iconfont icon-github"/>`tobiasahlin/bendable`)](https://github.com/tobiasahlin/bendable), which captures these techniques in the form of a responsive type scale, with some extra sugar on top.

::: warning Limitations

An important and significant limitation of this technique, because of the existing CSS `calc()` restrictions, is that you currently can’t use `rem`s to set your type. This limitation will be resolved as browsers add support for [<VPIcon icon="iconfont icon-w3c"/>the relaxed `calc()` restrictions](https://w3.org/TR/css-values-4/#calc-type-checking), but until then, this technique is limited to use `px` units.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive type scales with composable CSS utilities",
  "desc": "With the help of calc(), clamp() and CSS vars, we can create composable, responsive, and fluid type scales that smoothly adapts to viewport and container widths.",
  "link": "https://chanhi2000.github.io/bookshelf/tobiasahlin.com/responsive-fluid-css-type-scales.html",
  "logo": "https://tobiasahlin.com/images/touch-icon-ipad-retina.png",
  "background": "rgba(43,47,60,0.2)"
}
```
