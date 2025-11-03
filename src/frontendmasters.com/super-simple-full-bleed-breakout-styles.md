---
lang: en-US
title: "Super Simple Full-Bleed & Breakout Styles"
description: "Article(s) > Super Simple Full-Bleed & Breakout Styles"
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
      content: "Article(s) > Super Simple Full-Bleed & Breakout Styles"
    - property: og:description
      content: "Super Simple Full-Bleed & Breakout Styles"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/super-simple-full-bleed-breakout-styles.html
prev: /programming/css/articles/README.md
date: 2025-10-31
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7560
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
  name="Super Simple Full-Bleed & Breakout Styles"
  desc="Having a width-limited centered column of content is common and good, but what do you do when you need to break out? It's not hard these days, but it does depend on the situation."
  url="https://frontendmasters.com/blog/super-simple-full-bleed-breakout-styles/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7560"/>

Recently, I saw someone [asked on Reddit (<VPIcon icon="fa-brands fa-reddit"/>`css`)](https://reddit.com/r/css/comments/1o3j0cl/comment/niwx1pj/) what others are using these days for full-bleed and breakout elements. This refers to having a main content area of limited width (usually centered), but having the ability for some elements to be wider, either all the way to the browser edges or somewhere in-between.

<VidStack src="https://videopress.com/6ed15c7b-24cd-49dc-a1d5-be06bbb05395" />

desired layout at various viewports — notice the image is a full-bleed element, the warning is a breakout element and the header is a  breakout element with a full-bleed background

Is it still the [**old method**](/css-tricks.com/full-width-containers-limited-width-parents.md) that involves stretching elements to `100vw` and then moving them in the negative direction of the *x* axis via an offset, margin, or translation?

Or is it the [<VPIcon icon="fa-brands fa-youtube"/>newer method](https://youtu.be/c13gpBrnGEw) that involves a grid with a limited width main column in the middle then symmetrical columns on the sides, with elements spanning an odd number of columns that depends on whether we want them to have the normal width of the main column or we want them a bit wider, breaking out of that or we even want them to be full-bleed?

There is no perfectly right answer. It depends on use case and how you look at it. We’re going to look at modified and combined versions and essentially achieve what we need to depending on the situation with modern CSS.

The old method described in [**the 2016 CSS-Tricks article**](/css-tricks.com/full-width-containers-limited-width-parents.md) has the disadvantage of relying on a Firefox bug (that has been fixed since 2017) to work well in all situations. The problem is that `100vw` doesn’t take into account any vertical scrollbars we might have (and no, the new viewport units [**don’t solve**](https://smashingmagazine.com/2023/12/new-css-viewport-units-not-solve-classic-scrollbar-problem/) that problem either). This leads to the `100vw` width elements being wider than the available horizontal space if there is a vertical scrollbar, overflowing and causing a horizontal scrollbar, something I also often see with the bizarre practice of setting the `width` of the `body` to `100vw`. Now, considering the elements we normally want to be full-bleed are likely images, we can hide the problem with `overflow-x: hidden` on the `html`. But it still doesn’t feel quite right.

Maybe it’s because I’m a tech, not a designer who thinks in terms of design grids, but I prefer to keep my grids minimal and when I look at the desired result, my first thought is: that’s a single column grid with the items that are wider than the column, and everything is center-aligned.

So let’s take a look at the approach I most commonly use (or at least start from), which doesn’t involve a scary-looking grid column setup, and, for the simple base cases, doesn’t involve any containers or even any `calc()`, which some people find confusing.

---

## The Base Grid

We’re starting off with a `grid`, of course! We set a one limited width column `grid` on the `body` and we middle align this `grid` horizontally within the the `content-box` of the `body`:

```css
body {
  display: grid;
  grid-template-columns: min(100%, 60em);
  justify-content: center
}
```

By default, `display: grid` creates a one column grid that stretches horizontally across the entire `content-box` width of the element it’s set on. This makes all the children of the element getting `display: grid` be distributed in that one column, one on each row. The first on the first row, the second on the second row and so on.

The `grid-template-columns` property is used here to max out the width of this one column at `60em` by setting its width to be the minimum between `100%` of the `content-box` width and `60em`. If the `content-box` of the element we’ve set the `grid` on has a width of up to `60em`, then the one column of the `grid` stretches horizontally across the entire `content-box`. If the `content-box` of the element we’ve set the `grid` on has a width above `60em`, then our one grid column doesn’t stretch horizontally across the entire `content-box` anymore, but instead stays `60em` wide, the maximum width it can take. Of course, this maximum width can be any other value we want.

The `justify-content` property is used to align the `grid` horizontally within the `content-box` of the element it’s set on. In this case, our one grid column is center aligned.

Note that I keep talking about the `content-box` here. This is because, even at really narrow viewports, we normally want a bit of space in between the text edge and the lateral edge of the available area (the viewport minus any scrollbars we might have). Initially, this space is the [<VPIcon icon="fas fa-globe"/>default `margin`](https://miriam.codes/2022/07/04/body-margin-8px/) of `8px` on the `body`, though I also often do something similar to the approach Chris [**wrote about**](/frontendmasters.com/the-coyier-css-starter.md#body-spacing) recently and zero the default `margin` to replace it with a clamped font-relative `padding`. But whichever of them is used still gets subtracted from the available space (viewport width minus any vertical scrollbar we might have) to give us the `content-box` width of the `body`.

Now whatever children the `body` may have (headings, paragraphs, images and so on), they’re all in the limited width grid cells of our one column, something that’s highlighted by the DevTools grid overlay in the screenshot below.

![the one limited width column grid layout with the DevTools grid lines overlay ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/ZYQJWRd))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_00_layout_an_s.png?resize=1024%2C512&ssl=1)

---

## Full-Bleed Elements

Let’s say we want to make an element full-bleed (edge to edge). For example, an image or an image gallery, because that’s what makes the most sense to have stretching all across the entire available page width. This means we want the full viewport width minus any scrollbars we might have.

Nowadays we can get that by making the `html` a `container` so that its descendants know its available width (not including scrollbars) as `100cqw` (**c**ontainer **q**uery **w**idth).

```css
html { container-type: inline-size }
```

Having this, we can create our full-bleed elements:

```css
.full-bleed-elem {
  justify-self: center;
  width: 100cqw
}
```

Setting `width: 100cqw` on our full-bleed elements means they get the full available `content-box` width of the nearest container, which is the `html` in this case.

The `justify-self` aligns the element horizontally within its `grid-area` (which is limited to one grid cell in our case here). We need to set it here because the default is `start`, which means the left edge of the element starts from the left edge of its containing `grid-area`. The left edge of the containing `grid-area` is the same as the left edge of our one column `grid` here.

![one column grid with full-bleed elements and a DevTools grid overlay highlighting the grid lines](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_01_fullbleed_elem_an_s.png?resize=1024%2C512&ssl=1)

Just like before, we still have a single column grid, center aligned.

One thing to note here is this means we cannot have any `margin`, `border` or `padding` on the `html` element as any of these would reduce its `content-box`, whose size is what the container query units are based on. In practice, the `margin`, `border`, and `padding` on the `html` are all zero by default and I don’t think I’ve seen them set to anything else anywhere outside of some mind-bending [CSS Battle solutions (<VPIcon icon="fa-brands fa-reddit"/>`css`)](https://reddit.com/r/css/comments/1gif7ew/comment/lv551jx/).

Another thing to note is that there may be cases where we need another container somewhere in between. In that case, we can still access the `content-box` width of the `html` as detailed in [**a previous article**](/frontendmasters.com/using-container-query-units-relative-to-an-outer-container.md):

```css
@property --full-w {
  syntax: '<length>';
  initial-value: 0px;
  inherits: true;
}

html { container-type: inline-size }

body { --full-w: 100cqw }

.full-bleed-elem {
  justify-self: center;
  width: var(--full-w);
}
```

Often times, we probably also want some padding on the full-bleed element if it is, for example, an image gallery, but not if it is a single `img` element.

For `img` elements, the actual image always occupies just the `content-box`. Any padding we set on it is *empty space* around the `content-box`. This is not generally  desirable in our case. Unless we want to add some kind of decorations around it via the background property (by layering CSS gradients to create some kind of [cool pattern (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/JjZNXoQ), for example), we want the image to stretch all across the available viewport space after accounting for any vertical scrollbar we might have and not be left with empty space on the lateral sides.

Furthermore, if the `img` uses a `box-sizing` of `content-box`, that empty padding space gets *added* to the `100cqw` width of its `content-box`, making the `padding-box` width exceed the available space and causing a horizontal scrollbar on the page.

When setting a padding on full-bleed elements, it’s probably best to exclude `img` elements:

```css
.full-bleed-elem:not(img) { padding: .5em }
```

Note that in this case, the full-bleed elements getting the `padding` need to also have `box-sizing` set to `border-box`. This is done so that the `padding` gets subtracted out of the set `width` and not added as it would happen in the default `content-box` case.

```css
.full-bleed-elem:not(img) {
  box-sizing: border-box;
  padding: .5em
}
```

You can see it in action and play with it in the following live demo:

<CodePen
  user="thebabydino"
  slug-hash="VYezjay"
  title="full-bleed elements in a 1 column grid"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: note

You might be wondering… is it even necessary to set `border-box` since setting *everything* to `border-box` is a pretty popular reset style?

:::

Personally, I don’t set that in resets anymore because I find that with the the new layout options we have, the number of cases where I still need to explicitly set dimensions in general and widths in particular has declined. Drastically. Most of the time, I just size columns, rows, set the `flex` property instead and let the `grid` or `flex` children get sized by those without explicitly setting any dimensions. And when I don’t have to set dimensions explicitly, the `box-sizing` becomes irrelevant and even problematic in [<VPIcon icon="fa-brands fa-youtub"/>some situations](https://youtu.be/PtAcpV6TAGM). So I just don’t bother with including `box-sizing: border-box` in the reset these days anymore and instead only set it in the cases where it’s needed.

Like here, for the non-`img` full bleed elements.

::: note

Another thing you may be wondering about… how about just setting a negative lateral `margin`?

:::

We know the viewport width minus any scrollbars as `100cqw`, we know the column width as `100%`, so the difference between the two `100cqw - 100%` is the space on the left side of the column plus the space on the right side of the column. This means half the difference `.5*(100cqw - 100%)`, which we can also write as `50cqw - 50%`, is the space on just one side. And then we put a minus in front and get our lateral margin. Like this:

```css
.full-bleed-elem {
  margin: .5rem calc(50% - 50cqw);
}
```

Or, if we want to avoid overriding the vertical margin:

```css
.full-bleed-elem {
  margin-inline: calc(50% - 50cqw);
}
```

This seems like a good option. It’s just one `margin` property instead of a `justify-self` and a `width` one. And it also avoids having to set `box-sizing` to `border-box` if we want a `padding` on our full-bleed element. But we should also take into account what exactly we are most likely to make full-bleed.

One case we considered here was that of full-bleed images. The thing with `img` elements is that, by default, they don’t size themselves to fit the grid areas containing them, they just use their own intrinsic size. For full-bleed images this means they are either going to not fill the entire available viewport space if their intrinsic width is smaller than the viewport or overflow the viewport if their intrinsic width is bigger than the available viewport space (the viewport width minus any vertical scrollbar we might have). So we need to set their `width` anyway.

For the other case, that of the scrolling image gallery, the negative `margin` can be an option.

---

## Breakout Elements

These are wider than our main content, so they break out of our grid column, but are not full-bleed.

So we would give them a width that’s smaller than the `content-box` width of the `html`, which we know as `100cqw`, but still bigger than the width of our only `grid` column, which we know as `100%`. Assuming we want breakout elements to extend out on each side by `4em`, this means:

```css
.break-elem {
  justify-self: center;
  width: min(100cqw, 100% + 2*4em)
}
```

Again, we might use a negative lateral `margin` instead. For breakout elements, which are a lot more likely to be text content elements, the negative `margin` approach makes more sense than for the full-bleed ones. Note that just like the width, the lateral `margin` also needs to be capped in case the lateral space on the sides of our column drops under `4em`.

```css
.break-elem { margin: 0 max(-4em, 50% - 50cqw) }
```

Note that we use the `max()` because for negative values like the `margin` here, the smaller (minimum) one in absolute value (closer to 0) is the one that’s bigger when looking at the full axis going from minus to plus infinity.

But then again, we might want to be consistent and set full-bleed and breakout styles the same way, maybe grouping them together:

```css
.full-bleed-elem, .break-elem {
  justify-self: center;
  width: min(100cqw var(--comp-w, ));
}

/* This is valid! */
.break-elem { --comp-w: , 100% + 2*4em  }

:is(.full-bleed-elem, .break-elem):not(img) {
  box-sizing: border-box;
  padding: .5em;
}
```

Some people prefer `:where()` instead of `:is()` for [**specificity reasons**](/css-tricks.com/quick-reminder-that-is-and-where-are-basically-the-same-with-one-key-difference.md), as `:where()` always has `0` specificity, while `:is()` has the specificity of the most specific selector in its arguments. But that is precisely one of my main reasons for using `:is()` here.

And yes, both having an empty default for a CSS variable and its value starting with a comma is valid. Replacing `--comp-w` with its value gives us a `width` of `min(100cqw)` (which is the same as `100cqw`) for full-bleed elements and one of `min(100cqw, 100% + 2*4em)` for breakout elements.

![one column grid with full-bleed and breakout elements, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/YPwrbry))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_02_fullbleed_break_elem_an_s.png?resize=1024%2C512&ssl=1)

If we want to have different types of breakout elements that extend out more or less, not all exactly by the same fixed value, we make that value a custom property `--dx`, which we can change based on the type of breakout element:

```css
.break-elem { --comp-w: , 100% + 2*var(--dx, 4em) }
```

The `--dx` value could also be negative and, in this case, the element doesn’t really break out of the main column, it shrinks so it’s narrower.

```css
.break-elem--mini { --dx: -2em }
.break-elem--maxi { --dx: 8em }` Code language: CSS (css)
```

![one column grid with a full-bleed image and various sizes of breakout elements, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/JoGORNp))](https://gist.github.com/user-attachments/assets/8a19d473-6b3f-4273-a2f8-1a74efaea708)

---

## Full-Bleed Backgrounds for Limited Width Elements

Sometimes we may want only the background of the element to be full-bleed, but not the element content. In the simplest case, we can do with a `border-image` and if you want to better understand this property, check out [**this article**](https://smashingmagazine.com/2024/01/css-border-image-property/) by Temani Afif detailing a lot of use cases.

```css
.full-bleed-back {
  border-image: var(--img) fill 0/ / 0 50cqw;
}
```

This works for mono backgrounds (like the one created for the full-bleed `header` and `footer` below with a single stop gradient), for most gradients and even for actual images in some cases.

![one column grid that has a tightly fit limited width header with a full-bleed mono background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/jEWaRaP))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_04_lim_elem_fullbleed_back_an_s-1.png?resize=1024%2C512&ssl=1)

The mono background above is created as follows (all these demos adapt to user theme preferences):

```css
--img: conic-gradient(light-dark(#ededed, #121212) 0 0)
```

This method is perfect for such mono backgrounds, but if we want gradient or image ones, there are some aspects we need to consider.

The thing about the `0 50cqw` [<VPIcon icon="fa-brands fa-firefox"/>outset](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset) value is that it tells the browser to extend the area where the `border-image` is painted by `50cqw` outwards from the `padding-box` boundary on the lateral sides. This means it extends outside the vewport, but since this is just the `border-image`, not the `border` reserving space, it doesn’t cause overflow/ a horizontal scrollbar, so we can keep it simple and use it like this for gradients.

That is, if we can avoid percentage position trouble. While this is not an issue in linear top to bottom gradients, if we want to use percentages in linear left to right gradients or to position radial or conic ones, we need to scale the `[0%, 100%]` interval to the `[50% - 50cqw, 50% + 50cqw]` interval along the *x* axis.

```css :collapsed-lines
.linear-horizontal {
  --img: 
    linear-gradient(
      90deg, 
      var(--c0) calc(50% - 50cqw), 
      var(--c1) 50%
    );
}

.radial {
  --img: 
    radial-gradient(
      15cqw at calc(50% - 25cqw) 0, 
      var(--c0), 
      var(--c1)
    );
}

.conic {
  --img: 
    conic-gradient(
      at calc(50% + 15cqw), 
      var(--c1) 30%, 
      var(--c0), 
      var(--c1) 70%
    );
}
```

<CodePen
  user="thebabydino"
  slug-hash="RNrjXLe"
  title="Single limited width elems + full-bleed CSS grad backgrounds"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

However, this scaling is not enough for linear gradients at an angle that’s not a multiple of `90°`. And it may be overly complicated even for the types of gradients where it works well.

So another option is compute how much the `border-image` needs to expand laterally out of the available horizontal space `100cqw` and the maximum `grid` column width `--grid-w`. This then allows us to use percentages normally inside any kind of gradient, including linear ones at an angle that’s not a multiple of `90°`.

```css
body {
  --grid-w: 60em;
  display: grid;
  grid-template-columns: min(100%, var(--grid-w));
  justify-content: center;
}

.full-bleed-back {
  border-image: 
    var(--img) fill 0/ / 
    0 calc(50cqw - .5*var(--grid-w));
}
```

![one column grid that has a tightly fit limited width header with a full-bleed angled gradient background (at an angle that’s not a multiple of 90°); it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/JoGMjxb))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_an_s-1.png?resize=1024%2C512&ssl=1)

This has a tiny problem that other styling decisions we’re likely to take (and which we’ll discuss in a moment) prevent from happening, but, assuming we don’t make those choices, let’s take a look at it and how we can solve it.

<VidStack src="https://videopress.com/37978024-9643-44f6-bb45-aeb7aa1f1a33" />

full-bleed background issue on narrow viewports

On narrow viewports, our background isn’t full-bleed anymore, it stops a tiny distance away from the lateral sides. That tiny distance is at most the size of the lateral `margin` or `padding` on the `body`. As mentioned before, I prefer to zero the default `margin` and use a `font-size`-relative `padding`, but in a lot of cases, it doesn’t make any difference whatsoever.

![the problem in the narrow viewport case, highlighted for both the dark and the light themes](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_05_lim_elem_fullbleed_grad_back_issue_mark_s-1.png?resize=1024%2C512&ssl=1)

This happens when the maximum `grid` column width `--grid-w` doesn’t fit anymore in the available viewport space (not including the scrollbar) minus the lateral spacing on the sides of our one column grid (set as a `margin` or `padding`).

The solution is to use a `max()` instead of the `calc()` to ensure that the `border-image` expands laterally at the very least as much as that lateral spacing `--grid-s`.

```css
body {
  --grid-w: 60em;
  --grid-s: .5em;
  display: grid;
  grid-template-columns: min(100%, var(--grid-w));
  justify-content: center;
  padding: 0 var(--grid-s);
}

.full-bleed-back {
  border-image: 
    var(--img) fill 0/ / 
    0 max(var(--grid-s), 50cqw - .5*var(--grid-w));
}
```

<VidStack src="https://videopress.com/594373dc-c506-45e1-9a67-7a0493fa9dd1" />

fix for full-bleed background issue on narrow viewports ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/bNEaEON))

For actual images however, we have an even bigger problem: `border-image` doesn’t offer the `cover` option we have for backgrounds or images and we don’t really have a reliable way of getting around this. One of the [<VPIcon icon="fa-brands fa-firefox"/>repeat options](https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat) might work for us in some scenarios, but I find that’s rarely the case for the results I want in such situations.

You can see the problem in [this demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/qEOjaaV) when resizing the viewport — for an element whose `height` is unknown as it depends on its content, the `border-image` option (the second one) means that if we want to avoid the image getting distorted, then its size needs to be intrinsic size. Always. It never scales, which means it repeats for large viewports and its sides get clipped off for small viewports.

So if we want more control over an image background or multiple background layers, it’s probably better to use an absolutely positioned pseudo-element. This also avoids the earlier problem of the full-bleed background not going all the way to the edges without taking into account the lateral spacing on the grid container (in this case, the `body`).

```css
.full-bleed-back-xtra {
  position: relative;
  z-index: 1
}

.full-bleed-back-xtra::before {
  position: absolute;
  inset: 0 calc(50% - 50cqw);
  z-index: -1;
  content: ''
}
```

The `inset` makes our pseudo to stretch across the entire `padding-box` of its parent vertically and outside of it (minus sign) by half the available viewport space (viewport width minus any scrollbars) minus half the pseudo parent’s width.

The negative `z-index` on the pseudo ensures it’s behind the element’s text content. The positive `z-index` on the element itself ensures the pseudo doesn’t end up behind the grid container’s `background` too.

The pseudo `background` can now be a `cover` image:

```css
background: var(--img-pos, var(--img) 50%)/ cover
```

I’m taking this approach here to allow easily overriding the `background-position` together with each image if necessary. In such a case, we set `--img-pos`:

```css
--img-pos: url(my-back-img.jpg) 35% 65%
```

Otherwise, we only set `--img` and the default of `50%` gets used:

```css
--img-pos: url(my-back-img.jpg)
```

In the particular case of our demos so far, which use a light or dark theme to respect user preferences, we’ve also set a `light-dark()` value for the `background-color`, as well as an `overlay` blend mode to either brighten or darken our full-bleed background depending on the theme. This ensures the header text  remains readable in both scenarios.

![one column grid that has a tightly fit limited width header with a full-bleed image background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/ByjJZOx))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_06_lim_elem_fullbleed_img_back_an_s.png?resize=1024%2C512&ssl=1)

We can also have multiple layers of gradients, maybe even blended, maybe even with a `filter` making them [**grainy**](/frontendmasters.com/grainy-gradients.md) (something that would help with the visible banding noticed in the `border-image` method examples) or creating a [**halftone pattern**](/frontendmasters.com/pure-css-halftone-effect-in-3-declarations.md).

![one column grid that has a tightly fit limited width header with a filtered full-bleed multi-layer background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/dPGJZyP))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_07_lim_elem_fullbleed_filtered_back_an_s.png?resize=1024%2C512&ssl=1)

---

## Combining options

We can of course also have a breakout element with a full-bleed background – in this case, we give it both classes, `break-elem` and `full-bleed-back`.

Our recipe page header for example, probably looks better as a breakout element in addition to having a full-bleed background.

If the breakout elements in general have a `border` or their own specific `background`, we should ensure these don’t apply if they also have full-bleed backgrounds:

```css
.break-elem:not([class*='full-bleed-back']) {
  border: solid 1px;
  background: var(--break-back)
}
```

Or we can opt to separate these visual prettifying styles from the layout ones. For example, in the Halloween example demos, I’ve opted to set the `border` and `background` styles via a separate class `.box`:

```css
.box {
  border: solid 1px var(--c);
  background: lch(from var(--c) l c h/ .15)
}
```

And then set `--c` (as well as the warning icon in front) via a `.box--warn` class.

![one column grid that has a breakout header with a filtered full-bleed multi-layer background; it also has a full-bleed image and a breakout element, as well as a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/VYeyGwz))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_08_break_elem_fullbleed_back_an_s.png?resize=1024%2C512&ssl=1)

Another thing to note here is that when having a full-bleed background for a breakout element and we use the `border-image` tactic, we don’t have to adapt our formula to take into account the lateral spacing, as that’s set as a `padding` on the breakout element and not on its grid parent.

The most important of these techniques can also be seen in the meta demo below, which has the relevant CSS in style elements that got `display: block`.

<CodePen
  user="thebabydino"
  slug-hash="GgoEeqY"
  title="Super simple full-bleed + breakout tactic"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Nesting

We may also have a `figure` whose `img` is full-bleed, while the `figcaption` uses the normal column width (or maybe it’s a breakout element).

```html
<figure>
  <img src='full-bleed-img.jpg' alt='image description' class='full-bleed-elem'>
  <figcaption>image caption</figcaption>
</figure>
```

Not much extra code is required here.

The simple modern solution is to make the `img` a `block` element so that the `justify-self` property set via the `.full-bleed-elem` middle aligns it even if it’s not a `grid` or `flex` item.

```css
img.full-bleed-elem { display: block }
```

However, support for `justify-self` applying to `block` elements as per the [<VPIcon icon="fas fa-globe"/>current spec](https://drafts.csswg.org/css-align/#overview) is still limited to only Chromium browsers at the moment. And while the [<VPIcon icon="fa-brands fa-firefox"/>Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1930584) seems to have had some activity lately, the [<VPIcon icon="iconfont icon-webkit"/>Safari one](https://bugs.webkit.org/show_bug.cgi?id=277022) looks like it’s dormant.

So the easy cross-browser way to get around that without any further computations is to make the `figure` a `grid` too in this case.

```css
figure:has(.full-bleed-elem, .break-elem) {
  display: grid;
  grid-template-columns: 100%;
  width: 100%;
}
```

![one column grid that has a figure, tightly fit horizontally within its containing column, but with a full-bleed image; there’s also a DevTools grid overlay highlighting the grid lines ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/PwZELQJ))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_09_nested_fullbleed_elem_an_s.png?resize=1024%2C512&ssl=1)

---

## Floating Problems

This is a problem that [<VPIcon icon="fas fa-globe"/>got mentioned](https://nitter.net/hybrid_alex/status/1580173843267989506) for the three column `grid` technique and I really didn’t understand it at first.

I started playing with CSS to change the look of a blog and for some reason, maybe because that was what the first example I saw looked like, I got into the habit of putting any floated thumbnail and the text next to it into a wrapper. And it never occurred to me that the wrapper wasn’t necessary until I started writing this article and looked into it.

Mostly because… *I almost never need to float things*. I did it for those blog post thumbnails fifteen years ago, for [`shape-outside` (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/eYwjjWL) demos, for [drop caps (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/oggaZaQ), but that was about it. As far as layouts go, I just used `position: absolute` for years before going straight to `flex` and `grid`.

This was why I didn’t understand this problem at first. I thought that if you want to float something, you have to put it in a wrapper anyway. And at the end of the day, this is the easiest solution: put the entire content of our one column in a wrapper. In which case, until `justify-self` applying on `block` elements works cross-browser, we need to replace that declaration on full-bleed and breakout elements with our old friend `margin-left`:

```css
margin-left: calc(50% -50cqw)
```

This allows us to have floated elements inside the wrapper.

![one column grid that has a single grid child, tightly fit horizontally within its containing column and acting as a wrapper for the entire page content; since this wrapper has no flex or grid layout, its children can be floated ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/yyevybL))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/example_10_floaties_an_s.png?resize=1024%2C512&ssl=1)

---

## Final Thoughts: Do we even really need grid?

At this point, getting to this floats solution begs the question: do we even really need grid?

It depends.

We could just set lateral `padding` or `margin` on the `body` instead.

I’d normally prefer `padding` in this case, as `padding` doesn’t restrict the `background` and sometimes we want some full viewport backdrop effects involving both the `body` and the `html` background.

Other times, we may want a `background` just for the limited `width` of the content in the middle, in which case `margin` on the `body` makes more sense.

If we want to be ready for both situations, then we’re better off with not setting any `margin` or `padding` on the `body` and just wrapping all content in a limited width, middle aligned (good old `max-width` plus `auto` margins) `main` that also gets a `background`.

At the same time, my uses cases for something like this have never involved using floats and have benefitted from other `grid` features like gaps, which make handling spacing easier than via margins or paddings.

So at the end of the day, the best solution is going to depend on the context.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Super Simple Full-Bleed & Breakout Styles",
  "desc": "Having a width-limited centered column of content is common and good, but what do you do when you need to break out? It's not hard these days, but it does depend on the situation.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/super-simple-full-bleed-breakout-styles.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
