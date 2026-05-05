---
lang: en-US
title: "Using CSS corner-shape For Folded Corners"
description: "Article(s) > Using CSS corner-shape For Folded Corners"
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
      content: "Article(s) > Using CSS corner-shape For Folded Corners"
    - property: og:description
      content: "Using CSS corner-shape For Folded Corners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/using-css-corner-shape-for-folded-corners.html
prev: /programming/css/articles/README.md
date: 2026-05-08
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775704329444_6.png
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
  name="Using CSS corner-shape For Folded Corners"
  desc="I came across Kitty Giraudel’s folded corners technique. I’ve been on a bit of a corner-shape kick lately, so I figured that corner-shape could be used to create folded corners as well."
  url="https://css-tricks.com/using-css-corner-shape-for-folded-corners"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775704329444_6.png"/>

I came across [<VPIcon icon="fas fa-globe"/>Kitty Giraudel’s folded corners technique](https://kittygiraudel.com/2026/03/05/folded-corner-with-css/). It leverages CSS `clip-path`, and I thought that that was such a cool way to do it. `clip-path` has been trending lately, most likely because web browsers support the [**`shape()`**](/css-tricks.com/almanac-functions/shape.md) function now.

However, I’ve been on a bit of a `corner-shape` kick lately (have a look at my [**introduction to `corner-shape`**](/css-tricks.com/what-can-we-actually-do-with-corner-shape.md) as well as these [**scroll-driven `corner-shape` animations**](/css-tricks.com/experimenting-with-scroll-driven-corner-shape-animations.md)), so I figured that `corner-shape` could be used to create folded corners as well, and this is what I came up with:

<CodePen
  user="anon"
  slug-hash="EagyxrX"
  title="Folded corners using corner-shape (step 5)"
  :default-tab="['css','result']"
  :theme="dark"/>

![White paper with the top-right corner folded in.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775704329444_6.png?resize=1768%2C916&ssl=1)

<BaselineStatus featureid="corner-shape" />

<BaselineStatus featureid="container-style-queries" />

So open Chrome, which supports `corner-shape`, and let’s dig in (if you’re looking at this in other browsers, it basically falls back to a rounded corner).

---

## Step 1: Set some CSS variables

Elements have four corners, but when we use `border-radius`, each corner is split into two coordinates. The x-axis coordinate moves along the x-axis, away from its associated corner, while the y-axis coordinate does the same thing along the y-axis. It’s from these coordinates that `border-radius` draws the curvature of the rounded corners.

![Diagramming the shape showing border-radius applied to the bottom-left corner. The rounded corner is 50% on the y-axis and 50% on the x-axis.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_4A82C1A16CF8BD3E78A39757A7700A0B223569FCA13B21C3FBDA9426FB071038_1771786781751_3-scaled.png?resize=2560%2C1665&ssl=1)

First, store the coordinates as CSS variables. We’ll need the values that they hold more than once, so this simplifies things, makes the fold animatable, and maintains some degree of realism.

```css
:root {
  /* x-axis coordinate */
  --x-coord: 9rem;

  /* y-axis coordinate */
  --y-coord: 5rem;
}
```

---

## Step 2: Establishing the fold

Given what we now know about `border-radius`, it should be obvious what `border-top-right-radius` does. As for `corner-top-right-shape: bevel`, that ensures that a straight line is drawn between the coordinates instead of rounded corners (`corner-top-right-shape: round`). That’s right, `border-radius` *includes* `corner-shape: round` by default (behind the scenes, of course).

```css
/* Square */
div {
  /* Place coordinates */
  border-top-right-radius: var(--x-coord) var(--y-coord);

  /* Draw line between coordinates */
  corner-top-right-shape: bevel;
}
```

<CodePen
  user="anon"
  slug-hash="xbEjoEy"
  title="Folded corners using corner-shape (step 2)"
  :default-tab="['css','result']"
  :theme="dark"/>

![White paper with a diagonal cut in the top-right corner.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775703905116_2-1.png?resize=1768%2C916)

---

## Step 3: Creating the flip side

Now that we’ve established the fold, it’s time to create the flip side. Start by selecting `::before`, then declare `content: ""` to create the element without content. The `background` can be inherited from the square, and the dimensions should leverage the coordinates that we saved. As you can see, I’ve also added a `box-shadow` where the blur radius scales with `--x-coord` and `--y-coord`, but you’re welcome to adapt the formula as you see fit.

```css
/* Square */
div {
  /* Place coordinates */
  border-top-right-radius: var(--x-coord) var(--y-coord);

  /* Draw line between coordinates */
  corner-top-right-shape: bevel;

  /* Flip side */
  &::before {
    /* Generate empty element */
    content: "";

    /* Inherit background */
    background: inherit;

    /* Same as coordinates */
    width: var(--x-coord);
    height: var(--y-coord);

    /* Scale blur radius with --x-coord and --y-coord */
    box-shadow: 0 0 calc((var(--x-coord) + var(--y-coord)) / 3) #00000050;
  }
}
```

<CodePen
  user="anon"
  slug-hash="GgjdbpK"
  title="Folded corners using corner-shape (step 3)"
  :default-tab="['css','result']"
  :theme="dark"/>

![White paper with s white rectangle in the top-left corner and a diagonal cut in the top-right corner.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775703996642_3.png?resize=1768%2C916)

---

## Step 4: Positioning the flip side (`::before`)

Next, we need to shift `::before` to the (top-)right corner. We’re avoiding [**anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md), because there’s no need for modern features if more supported features work well using the same amount of code. So, declare `position: relative` on the square and `position: absolute` on `::before`. This makes `::before` position relative to the square, and is a trick that only works for parent-child relationships. Actually, this shortcoming is why anchor positioning was invented, but we just don’t need it in this case.

In addition, declare `inset: 0 0 auto auto` on `::before` to align it to the top-right corner of the square, and `overflow: clip` *on the square* to clip the half of `::before` that overflows it.

```css :collapsed-lines
/* Square */
div {
  /* Place coordinates */
  border-top-right-radius: var(--x-coord) var(--y-coord);

  /* Draw line between coordinates */
  corner-top-right-shape: bevel;

  /* Clip any overflow */
  overflow: clip;

  /* For alignment */
  position: relative;

  /* Flip side */
  &::before {
    /* Generate empty element */
    content: "";

    /* Inherit background */
    background: inherit;

    /* Same as coordinates */
    width: var(--x-coord);
    height: var(--y-coord);

    /* Scale blur radius with --x-coord and --y-coord */
    box-shadow: 0 0 calc((var(--x-coord) + var(--y-coord)) / 3) #00000050;

    /* For alignment */
    position: absolute;

    /* Align to top-right */
    inset: 0 0 auto auto;
  }
}
```

<CodePen
  user="anon"
  slug-hash="pvEZvax"
  title="Folded corners using corner-shape (step 4)"
  :default-tab="['css','result']"
  :theme="dark"/>

![White paper with the top-right corner folded in.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775704182876_4.png?resize=1768%2C916&ssl=1)

You can stop here if you want, but there’s room for improvement…

---

## Step 5: Sculpting the flip side

To make the outcome look a bit more realistic, we’ll use `corner-bottom-left-shape: bevel` to make one more straight cut, this time to `::before`. There are, most likely, many ways to tackle this depending on how sharply we want to crease the fold, how elevated we want the flip side to be, and the angle from which we want to view the square, but I don’t think it matters as long as the effect looks decent, so we’re aiming for a sharp crease, the flip side sticking up, and an aerial view. If you’d rather something different, keep in mind that the shadow also impacts the outcome, and that you’d be facing a trickier implementation.

The only degree of complexity that I suggest is this:

```css
/* Ensure realistic fold */
@container style(--x-coord < --y-coord) {
  border-bottom-left-radius: 100% calc(100% - var(--x-coord));
}

@container style(--x-coord >= --y-coord) {
  border-bottom-left-radius: calc(100% - var(--y-coord)) 100%;
}
```

These are [**container style queries using the range syntax**](/css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if.md), where if the value of `--x-coord` is less than the value of `--y-coord`, we subtract the value of `--x-coord` from `100%` and use it as the y-axis coordinate for the relevant border radius (`border-bottom-left-radius`, in this case). The other axis is set to `100%`. Adversely, if the value of `--x-coord` is *more* than (or equal to) the value of `--y-coord`, we subtract the value of `--y-coord` from `100%` and use it as the x-axis coordinate. Once again, the other axis is set to `100%`.

The result is that the crease, shadow, and now *perspective* of the fold is calculated using only `--x-coord` and `--y-coord` to look realistic (or realistic enough, anyway). Using the [**slideVars**](/css-tricks.com/playing-with-codepen-slidevars.md) toggles in the top-right corner of the demo, you can see for yourself by testing various combinations of coordinates:

<CodePen
  user="anon"
  slug-hash="EagyxrX"
  title="Folded corners using corner-shape (step 5)"
  :default-tab="['css','result']"
  :theme="dark"/>

If you want to implement a failsafe to ensure that the coordinates don’t exceed the dimensions of the square, breaking the effect, you can use [**`min()`**](/css-tricks.com/almanac-functions/min.md). The modified coordinate variables below set `--y-coord` to an impossible `999999999rem`, but caps it at the height of the square (although I can’t imagine that you’d actually need this, to be completely honest):

```css
--x-coord: min(--square-width, 9rem);
--y-coord: min(--square-height, 999999999rem);
```

<CodePen
  user="anon"
  slug-hash="VYKGYWY"
  title="Folded corners using corner-shape (capped --y-coord)"
  :default-tab="['css','result']"
  :theme="dark"/>

![White paper with the top-right corner folded in.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/s_4309AEC000A3E54B3EAE7D9665BB7D541E09DE1556E769AE721013146BE52BD2_1775704329444_6.png?resize=1768%2C916&ssl=1)

All in all, we have not only a folded corner effect but a utility that builds the effect based on only two coordinates.

The full code:

```css :collapsed-lines
:root {
  /* x-axis coordinate */
  --x-coord: 9rem;

  /* y-axis coordinate */
  --y-coord: 5rem;

  /* Square */
  div {
    /* Place coordinates */
    border-top-right-radius: var(--x-coord) var(--y-coord);

    /* Draw line between coordinates */
    corner-top-right-shape: bevel;

    /* Clip any overflow */
    overflow: clip;

    /* For alignment */
    position: relative;

    /* Flip side */
    &::before {
      /* Generate empty element */
      content: "";

      /* Inherit background */
      background: inherit;

      /* Same as coordinates */
      width: var(--x-coord);
      height: var(--y-coord);

      /* Scale blur radius with --x-coord and --y-coord */
      box-shadow: 0 0 calc((var(--x-coord) + var(--y-coord)) / 3) #00000050;

      /* For alignment */
      position: absolute;

      /* Align to top-right */
      inset: 0 0 auto auto;

      /* Draw line between coordinates */
      corner-bottom-left-shape: bevel;

      /* Ensure realistic fold */
      @container style(--x-coord < --y-coord) {
        border-bottom-left-radius: 100% calc(100% - var(--x-coord));
      }

      @container style(--x-coord >= --y-coord) {
        border-bottom-left-radius: calc(100% - var(--y-coord)) 100%;
      }
    }
  }
}
```

::: note

We could [**swap container style queries for `if()` functions**](/css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if.md), which are shorter but less readable.

:::

---

## Folded corners using `clip-path` vs. `corner-shape`

[Kitty’s Giraudel’s folded corners (<VPIcon icon="fa-brands fa-codepen"/>`KittyGiraudel`)](https://codepen.io/KittyGiraudel/pen/raNoZLr) work in all browsers, and because `clip-path` is used, which is a more versatile shaping feature, there are more ways to customize the shape. It’s also the more correct approach, for whatever that’s worth. However, my `corner-shape` approach is cleaner and likely wouldn’t require any further customization anyway, but lacks Safari and Firefox support for now. So unless you need folded corners today, I’d bookmark both:

<CodePen
  user="KittyGiraudel"
  slug-hash="raNoZLr"
  title="Folded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="mrdanielschwarz"
  slug-hash="EagyxrX"
  title="Folded corners using corner-shape (step 5)"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using CSS corner-shape For Folded Corners",
  "desc": "I came across Kitty Giraudel’s folded corners technique. I’ve been on a bit of a corner-shape kick lately, so I figured that corner-shape could be used to create folded corners as well.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/using-css-corner-shape-for-folded-corners.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
