---
lang: en-US
title: "Experimenting With Scroll-Driven corner-shape Animations"
description: "Article(s) > Experimenting With Scroll-Driven corner-shape Animations"
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
      content: "Article(s) > Experimenting With Scroll-Driven corner-shape Animations"
    - property: og:description
      content: "Experimenting With Scroll-Driven corner-shape Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/experimenting-with-scroll-driven-corner-shape-animations.html
prev: /programming/css/articles/README.md
date: 2026-03-23
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/corner-shape-animation.webp
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
  name="Experimenting With Scroll-Driven corner-shape Animations"
  desc="The new CSS corner-shape() property is mathematical, so it’s easily animated. Author Daniel Schwarz pokes at animating the property for interesting UI effects."
  url="https://css-tricks.com/experimenting-with-scroll-driven-corner-shape-animations"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/corner-shape-animation.webp"/>

Over the last few years, there’s been a lot of talk about and experimentation with [**scroll-driven animations**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.md). It’s a very shiny feature for sure, and as soon as it’s supported in Firefox (without a flag), it’ll be baseline. It’s part of [**Interop 2026**](/css-tricks.com/interop-2026.md), so that should be relatively soon. Essentially, scroll-driven animations tie an *animation timeline’s position* to a *scroll position*, so if you were 50% scrolled then you’d also be 50% into the animation, and they’re surprisingly easy to set up too.

I’ve been seeing significant interest in the new CSS [**`corner-shape`**](/css-tricks.com/almanac-properties/corner-shape.md) property as well, even though it only works in Chrome for now. This enables us to create corners that aren’t as rounded, or aren’t even rounded at all, allowing for some [**intriguing shapes**](/css-tricks.com/what-can-we-actually-do-with-corner-shape.md) that take little-to-no effort to create. What’s even more intriguing though is that `corner-shape` is mathematical, so it’s easily animated.

Hence, say hello to scroll-driven `corner-shape` animations (requires Chrome 139+ to work fully):

<CodePen
  user="anon"
  slug-hash="wBWXdKq"
  title="Scroll-driven corner-shape animation #1 (Chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/corner-shape-amimation-1.mp4" />

---

## `corner-shape` in a nutshell

Real quick — the different values for `corner-shape`:

| **`corner-shape` keyword** | **`superellipse()` equivalent** |
| --- | --- |
| `square` | `superellipse(infinity)` |
| `squircle` | `superellipse(2)` |
| `round` | `superellipse(1)` |
| `bevel` | `superellipse(0)` |
| `scoop` | `superellipse(-1)` |
| `notch` | `superellipse(-infinity)` |

<CodePen
  user="anon"
  slug-hash="EagYxLj"
  title="CSS corner-shape demo"
  :default-tab="['css','result']"
  :theme="dark"/>

![Showing the same magenta-colored rectangle with the six difference CSS corner-shape property values applied to it in a three-by-three grid.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_4A82C1A16CF8BD3E78A39757A7700A0B223569FCA13B21C3FBDA9426FB071038_1771786670629_1.5.png?resize=2474%2C1500&ssl=1)

But what’s this [**`superellipse()` function**](/css-tricks.com/almanac-functions/superellipse.md) all about? Well, basically, these keyword values are the result of this function. For example, `superellipse(2)` creates corners that aren’t quite squared but aren’t quite rounded either (the “`squircle`”). Whether you use a keyword or the `superellipse()` function directly, a mathematical equation is used either way, which is what makes it animatable. With that in mind, let’s dive into that demo above.

---

## Animating `corner-shape`

The demo isn’t too complicated, so I’ll start off by dropping the CSS here, and then I’ll explain how it works line-by-line:

```css :collapsed-lines
@keyframes bend-it-like-beckham {
  from {
    corner-shape: superellipse(notch);
    /* or */
    corner-shape: superellipse(-infinity);
  }

  to {
    corner-shape: superellipse(square);
    /* or */
    corner-shape: superellipse(infinity);
  }
}

body::before {
  /* Fill viewport */
  content: "";
  position: fixed;
  inset: 0;

  /* Enable click-through */
  pointer-events: none;

  /* Invert underlying layer */
  mix-blend-mode: difference;
  background: white;

  /* Don’t forget this! */
  border-bottom-left-radius: 100%;

  /* Animation settings */
  animation: bend-it-like-beckham;
  animation-timeline: scroll();
}

/* Added to cards */
.no-filter {
  isolation: isolate;
}
```

<CodePen
  user="anon"
  slug-hash="NPrVGOW"
  title="CRAPPY VERSION OF Scroll-driven corner-shape animation #1 (Chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

In the code snippet above, `body::before` combined with `content: ""` creates a pseudo-element of the `<body>` with no content that is then fixed to every edge of the viewport. Also, since this animating shape will be on top of the content, `pointer-events: none` ensures that we can still interact with said content.

For the shape’s color I’m using `mix-blend-mode: difference` with `background: white`, which inverts the underlying layer, a trendy effect that **to some degree only** maintains the same level of color contrast. You won’t want to apply this effect to everything, so here’s a utility class to exclude the effect as needed:

```css
/* Added to cards */
.no-filter {
  isolation: isolate;
}
```

A comparison:

![**Left:** Full application of blend mode. **Right:** Blend mode excluded from cards.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_4A82C1A16CF8BD3E78A39757A7700A0B223569FCA13B21C3FBDA9426FB071038_1771785916661_2.png?resize=1024%2C355)

You’ll need to combine `corner-shape` with `border-radius`, which uses `corner-shape: round` under the hood by default. Yes, that’s right, `border-radius` doesn’t actually round corners — `corner-shape: round` does that under the hood. Rather, `border-radius` handles the x-axis and y-axis coordinates to draw from:

```css
/* Syntax */
border-bottom-left-radius: <x-axis-coord> <y-axis-coord>;

/* Usage */
border-bottom-left-radius: 50% 50%;
/* Or */
border-bottom-left-radius: 50%;
```

![Diagramming the shape showing border-radius applied to the bottom-left corner. The rounded corner is 50% on the y-axis and 50% on the x-axis.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_4A82C1A16CF8BD3E78A39757A7700A0B223569FCA13B21C3FBDA9426FB071038_1771786781751_3-scaled.png?resize=2560%2C1665)

In our case, we’re using `border-bottom-left-radius: 100%` to slide those coordinates to the opposite end of their respective axes. However, we’ll be overwriting the implied `corner-shape: round` in our `@keyframe` animation, so we refer to that with `animation: bend-it-like-beckham`. There’s no need to specify a duration because it’s a scroll-driven animation, as defined by `animation-timeline: scroll()`.

In the `@keyframe` animation, we’re animating from `corner-shape: superellipse(notch)`, which is like an inset square. This is equivalent to `corner-shape: superellipse(-infinity)`, so it’s not actually squared but it’s so aggressively sharp that it looks squared. This animates to `corner-shape: superellipse(square)` (an *outset* square), or `corner-shape: superellipse(infinity)`.

---

## Animating `corner-shape`… *revisited*

The demo above is actually a bit different to the one that I originally shared in the intro. It has one minor flaw, and I’ll show you how to fix it, but more importantly, you’ll learn more about an intricate detail of `corner-shape`.

The flaw: at the beginning and end of the animation, the curvature looks quite harsh because we’re animating from `notch` and `square`, right? It also looks like the shape is being sucked into the corners. Finally, the shape being stuck to the sides of the viewport makes the whole thing feel too contained.

The solution is simple:

```css
/* Change this... */
inset: 0;

/* ...to this */
inset: -1rem;
```

This stretches the shape *beyond* the viewport, and even though this makes the animation appear to start late and finish early, we can fix that by not animating from/to `-infinity`/`infinity`:

```css
@keyframes bend-it-like-beckham {
  from {
    corner-shape: superellipse(-6);
  }

  to {
    corner-shape: superellipse(6);
  }
}
```

Sure, this means that part of the shape is always visible, but we can fiddle with the `superellipse()` value to ensure that it stays outside of the viewport. Here’s a side-by-side comparison:

![Two versions of the same magenta colored rectangle side-by-side. The left shows the top-right corner more rounded than the right which is equally rounded.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_4A82C1A16CF8BD3E78A39757A7700A0B223569FCA13B21C3FBDA9426FB071038_1771786883121_4-scaled.png?resize=2560%2C862)

And the original demo (which is where we’re at now):

<CodePen
  user="anon"
  slug-hash="wBWXdKq"
  title="Scroll-driven corner-shape animation #1 (Chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Adding more scroll features

Scroll-driven animations work very well with other scroll features, including [**scroll snapping**](/css-tricks.com/practical-css-scroll-snapping.md), [**scroll buttons**](/css-tricks.com/almanac-pseudo-selectors/scroll-button.md), [**scroll markers**](/css-tricks.com/almanac-pseudo-selectors/scroll-marker.md), simple [<VPIcon icon="fa-brands fa-firefox"/>text fragments](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Fragment/Text_fragments), and simple JavaScript methods such as `scrollTo()`/`scroll()`, `scrollBy()`, and `scrollIntoView()`.

For example, we only have to add the following CSS snippet to introduce scroll snapping that works right alongside the scroll-driven `corner-shape` animation that we’ve already set up:

```css
:root {
  /* Snap vertically */
  scroll-snap-type: y;

  section {
    /* Snap to section start */
    scroll-snap-align: start;
  }
}
```

<CodePen
  user="anon"
  slug-hash="pvbqvqz"
  title="Scroll-driven corner-shape animation #1, with scroll snapping (Chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/corner-shape-animation-5.mp4" />

---

## “Masking” with `corner-shape`

In the example below, I’ve essentially created a border around the viewport and then a notched shape (`corner-shape: notch`) on top of it that’s the same color as the background (`background: inherit`). This shape completely covers the border at first, but then animates to reveal it (or in this case, the four corners of it):

<CodePen
  user="anon"
  slug-hash="WbxqEMx"
  title="Scroll-driven corner-shape animation #2 (Chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/corner-shape-animation-6.mp4" />

If I make the shape a bit more visible, it’s easier to see what’s happening here, which is that I’m rotating this shape as well (`rotate: 5deg`), making the shape even more interesting.

![A large gray cross shape overlaid on top of a pinkish background. The shape is rotated slightly to the right and extends beyond the boundaries of the background.,](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/s_4A82C1A16CF8BD3E78A39757A7700A0B223569FCA13B21C3FBDA9426FB071038_1771787649530_7-scaled.png?resize=2560%2C1607)

This time around we’re animating `border-radius`, not `corner-shape`. When we animate to `border-radius: 20vw / 20vh`, `20vw` and `20vh` refers to the x-axis and y-axis of each corner, respectively, meaning that 20% of the border is revealed as we scroll.

The only other thing worth mentioning here is that we need to mess around with `z-index` to ensure that the content is higher up in the stacking context than the border and shape. Other than that, this example simply demonstrates another fun way to use `corner-shape`:

```css :collapsed-lines
@keyframes tech-corners {
  from {
    border-radius: 0;
  }

  to {
    border-radius: 20vw / 20vh;
  }
}

/* Border */
body::before {
  /* Fill (- 1rem) */
  content: "";
  position: fixed;
  inset: 1rem;
  border: 1rem solid black;
}

/* Notch */
body::after {
  /* Fill (+ 3rem) */
  content: "";
  position: fixed;
  inset: -3rem;

  /* Rotated shape */
  background: inherit;
  rotate: 5deg;
  corner-shape: notch;

  /* Animation settings */
  animation: tech-corners;
  animation-timeline: scroll();
}

main {
  /* Stacking fix */
  position: relative;
  z-index: 1;
}
```

---

## Animating multiple `corner-shape` elements

In this example, we have multiple nested diamond shapes thanks to `corner-shape: bevel`, all leveraging the same scroll-driven animation where the diamonds increase in size, using `padding`:

<CodePen
  user="anon"
  slug-hash="gbMVapx"
  title="Scroll-driven corner-shape animation #3 (Chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/corner-shape-animation-8.mp4" />

```html
<div id="diamonds">
  <div>
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<main>
  <!-- Content -->
</main>
```

```css
@keyframes diamonds-are-forever {
  from {
    padding: 7rem;
  }

  to {
    padding: 14rem;
  }
}

#diamonds {
  /* Center them */
  position: fixed;
  inset: 50% auto auto 50%;
  translate: -50% -50%;

  /* #diamonds, the <div>s within */
  &, div {
    corner-shape: bevel;
    border-radius: 100%;
    animation: diamonds-are-forever;
    animation-timeline: scroll();
    border: 0.0625rem solid #00000030;
  }
}

main {
  /* Stacking fix */
  position: relative;
  z-index: 1;
}
```

---

## That’s a wrap

We just explored animating from one custom `superellipse()` value to another, using `corner-shape` as a mask to create new shapes (again, while animating it), and animating multiple `corner-shape` elements at once. There are so many ways to animate `corner-shape` other than from one keyword to another, and if we make them scroll-driven animations, we can create some really interesting effects (although, they’d also look awesome if they were static).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Experimenting With Scroll-Driven corner-shape Animations",
  "desc": "The new CSS corner-shape() property is mathematical, so it’s easily animated. Author Daniel Schwarz pokes at animating the property for interesting UI effects.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/experimenting-with-scroll-driven-corner-shape-animations.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
