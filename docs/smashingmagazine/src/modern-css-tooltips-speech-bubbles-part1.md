---
lang: en-US
title: "Modern CSS Tooltips And Speech Bubbles (Part 1)"
description: "Article(s) > Modern CSS Tooltips And Speech Bubbles (Part 1)"
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
      content: "Article(s) > Modern CSS Tooltips And Speech Bubbles (Part 1)"
    - property: og:description
      content: "Modern CSS Tooltips And Speech Bubbles (Part 1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/modern-css-tooltips-speech-bubbles-part1.html
prev: /programming/css/articles/README.md
date: 2024-03-01
isOriginal: false
author:
  - name: Temani Afif
    url : https://smashingmagazine.com/author/temani-afif/
cover: https://files.smashing.media/articles/modern-css-tooltips-part1/modern-css-tooltips-speech-bubbles.jpg
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
  name="Modern CSS Tooltips And Speech Bubbles (Part 1)"
  desc="Tooltips are a very common pattern used in CSS for years. There are a lot of ways to approach tooltips in CSS, though some evoke headaches with all the magic numbers they require. In this article, Temani Afif presents modern techniques to create tooltips with the smallest amount of markup and the greatest amount of flexibility."
  url="https://smashingmagazine.com/2024/03/modern-css-tooltips-speech-bubbles-part1/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/modern-css-tooltips-part1/modern-css-tooltips-speech-bubbles.jpg"/>

Tooltips are a very common pattern used in CSS for years. There are a lot of ways to approach tooltips in CSS, though some evoke headaches with all the magic numbers they require. In this article, Temani Afif presents modern techniques to create tooltips with the smallest amount of markup and the greatest amount of flexibility.

In [**a previous article**](/smashingmagazine.com/css-responsive-multi-line-ribbon-shapes-part1.md), we explored ribbon shapes and different ways to approach them using clever combinations of CSS gradients and `clip-path()`. This time, I’d like to explore another shape, one that you’ve likely had to tackle at least once in your front-end life: **tooltips**. You know what we’re talking about, those little things that look like speech bubbles from comic books. They’re everywhere in the wild, from a [**hover effect for buttons**](/css-tricks.com/long-hover.md) to [**the text messaging app on your phone**](/css-tricks.com/introducing-trashy-css.md).

The shapes may look easy to make in CSS at first glance, but it always ends with a lot of struggles. For example, how do you adjust the position of the tail to indicate whether the tooltip is coming from a left, right, or center position? There are [**plenty of considerations to take into account**](/smashingmagazine.com/designing-tooltips-mobile-user-interfaces.md) when making tooltips — including [**overflowage**](/css-tricks.com/can-css-prevent-tooltips-from-overflowing.md), [**collision detection**](/css-tricks.com/collision-detection.md), and [**semantics**](/css-tricks.com/exploring-what-the-details-and-summary-elements-can-do.md) — but it’s the shape and direction of the tail that I want to focus on because I often see inflexible fixed units used to position them.

Forget what you already know about tooltips because in this article, we will start from zero, and you will learn how to build a tooltip with minimal markup powered by modern CSS that provides flexibility to configure the component by adjusting CSS variables. We are not going to build one or two shapes, but… *100 different shapes!*

That may sound like we’re getting into a super-long article, but actually, we can easily get there by adjusting a few values. In the end, you will have a back pocket full of CSS tricks that can be combined to create any shape you want.

And guess what? I’ve already created [<VPIcon icon="fas fa-globe"/>an online collection of 100 different tooltip shapes](https://css-generators.com/tooltip-speech-bubble/) where you can easily copy and paste the code for your own use, but stay with me. You’re going to want to know the secret to unlocking hundreds of possibilities with the least possible code.

We’ll start with the shapes themselves, discussing how we can cut out the bubble and tail by combining CSS gradients and clipping. Then, we’ll pick things back up in a second article dedicated to improving another common approach to tooltips using borders and custom shapes.

---

## The HTML

We’re only working with a single element:

```html
<div class="tooltip">Your text content goes here</div>
```

That’s the challenge: Create hundreds of tooltip variations in CSS with only a single element to hook into in the HTML.

---

## A Simple Tooltip Tail

I’m going to skip right over the basic rectangular shape; you know how to set a `width` and `height` (or `aspect-ratio`) on elements. Let’s start with [**the simplest shape**](/css-tip.com/simple-tooltip.md) for the tooltip’s tail, one that can be accomplished with only two CSS properties:

```css
.tooltip {
  /* tail dimension */
  --b: 2em; /* base */
  --h: 1em; /* height*/

  border-image: fill 0 // var(--h)
    conic-gradient(#CC333F 0 0); /* the color  */
  clip-path: 
    polygon(0 100%, 0 0, 100% 0, 100% 100%,
      calc(50% + var(--b) / 2) 100%,
      50% calc(100% + var(--h)),
      calc(50% - var(--b) / 2) 100%);
}
```

The `border-image` property creates an “overflowing color” while `clip-path` defines the shape of the tooltip with `polygon()` coordinates. (Speaking of `border-image`, [**I wrote a deep-dive on it**](/smashingmagazine.com/css-border-image-property.md) and explain how it might be the only CSS property that supports double slashes in the syntax!)

The tooltip’s tail is placed at the bottom center, and we have two variables to control its dimensions:

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/1-border-image-coloration-clip-path-polygon.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/1-border-image-coloration-clip-path-polygon.png)

We can do the exact same thing in more intuitive ways, like defining a background and then border (or padding) to create space for the tail:

```css
background: #CC333F;
border-bottom: var(--h) solid #0000;
```

…or using `box-shadow` (or `outline`) for the outside color:

```css
background: #CC333F;
box-shadow: 0 0 0 var(--h) #CC333F;
```

While these approaches are indeed easier, they require an extra declaration compared to the single `border-image` declaration we used. Plus, we’ll see later that `border-image` is really useful for accomplishing more complex shapes.

Here is a demo with the different directions so you can see how easy it is to adjust the above code to change the tail’s position.

<CodePen
  user="smashingmag"
  slug-hash="ExrEXoO"
  title="A simple Tooltip using 2 CSS properties"
  :default-tab="['css','result']"
  :theme="dark"/>

Next, we’re going to study shapes that include the tail at the bottom, but you can easily find the other variations in [<VPIcon icon="fas fa-globe"/>my online collection](https://css-generators.com/tooltip-speech-bubble/).

---

## Adjusting The Tail Position

Let’s add a third variable, `--p`, that we can use to control the tooltip’s tail position. In the last example, we used `50%` in the `clip-path`, which positions the tail directly in the horizontal center along the bottom of the tooltip’s rectangular shape. If we assign a variable to it, we can easily change the direction of the tooltip to face left or right by updating `50%` to a smaller or larger value, respectively.

```css
.tooltip {
  /* tail dimension */
  --b: 2em; /* base */
  --h: 1em; /* height*/
  --p: 50%; /* tail position */   

  border-image: fill 0 // var(--h)
    conic-gradient(#CC333F 0 0); /* the color  */
  clip-path: 
    polygon(0 100%, 0 0, 100% 0, 100% 100%,
      calc(var(--p) + var(--b) / 2) 100%,
      var(--p) calc(100% + var(--h)),
      calc(var(--p) - var(--b) / 2) 100%);
}
```

The `--p` variable can go from `0%` to `100%`, where `0%` is aligned with the left side of the tooltip and `100%` is aligned with the right side. Here is an interactive demo where you can update the variable using a range slider:

<CodePen
  user="smashingmag"
  slug-hash="mdoLOGJ"
  title="Updating the tail position"
  :default-tab="['css','result']"
  :theme="dark"/>

Nice, right?! It’s definitely cool, but there’s a glitch. When the tail’s position is set to the extremes, it appears to slide right off the edge of the bubble. Go ahead and toggle the range slider in the demo between `0%` and `100%` to see the issue.

![The tooltip's tail is allowed to overflow its container at the extremes. ([<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/2-rectangle-tooltip.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/2-rectangle-tooltip.png)

We can fix this by setting limits to some values so the tail never falls outside the container. Two points of the polygon are concerned with the fix.

This:

```css
calc(var(--p) + var(--b) / 2) 100%
```

…and this:

```css
calc(var(--p) - var(--b) / 2) 100%
```

The first `calc()` needs to be clamped to `100%` to avoid the overflow from the right side, and the second one needs to be clamped to `0%` to avoid the overflow from the left side. We can use the `min()` and `max()` functions to establish the range limits:

```css
clip-path: 
  polygon(0 100%, 0 0, 100% 0, 100% 100%,
```

<CodePen
  user="smashingmag"
  slug-hash="mdoLRVr"
  title="Fixing the overflow issue"
  :default-tab="['css','result']"
  :theme="dark"/>

*Tada!* We’ve fixed the edge cases, and now the tail gets a different shape instead of overflowing!

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/3-tail-left-right-edges-tooltip.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/3-tail-left-right-edges-tooltip.png)

---

## Adjusting The Tail Shape

Let’s integrate another variable, `--x`, into the `clip-path()` and use it to adjust the shape of the tail:

```css
.tooltip {
  /* tail dimension */
  --b: 2em; /* base */
  --h: 1em; /* height*/

  --p: 50%;  /* tail position */
```

The `--x` variable can be either positive or negative (using whatever unit you want, including percentages). What we’re doing is adding the variable that establishes the tail’s shape, `--x`, to the tail’s position, `--p`. In other words, we’ve updated this:

```css
var(--p) calc(100% + var(--h))
```

…to this:

```css
calc(var(--p) + var(--x)) calc(100% + var(--h))
```

And here is the outcome:

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/4-variations-same-red-rectangular-tooltip.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/4-variations-same-red-rectangular-tooltip.png)

The tooltip’s tail points in either the right or left direction, depending on whether `--x` is a positive or negative value. Go ahead and use the range sliders in the following demo to see how the tooltip’s tail is re-positioned (`--p`) and re-shaped (`--x`) when adjusting two variables.

<CodePen
  user="smashingmag"
  slug-hash="ExMLZZB"
  title="Updating the tail shape"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? If you’ve ever attempted tooltips on your own, I’m sure you will appreciate the way this approach eliminates the need to use magic numbers to tweak the tooltip’s appearance. That’s one significant headache we no longer have to worry about!

And did you notice how the tail, when stretched, is allowed to overflow the container? That’s perfect! Using `min()` and `max()`, we’re correctly fixing the overflow issue while allowing the tail to stretch further away from the container.

[![Two variations of the same red rectangular tooltip, one with a tail in the left direction and one with the tail in the right position.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/5-rectangular-tooltip-different-tale-positions.png)](https://files.smashing.media/articles/modern-css-tooltips-part1/5-rectangular-tooltip-different-tale-positions.png)

([Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/5-rectangular-tooltip-different-tale-positions.png))

Note that I have updated the `border-image` outset to an impractically large value (`9999px`) instead of using the `--h` variable. The shape of the tail can be any type of triangle and can take a bigger area. Since there’s no way for us to know the exact value of the outset, we use that big value to make sure we have enough room to fill the tail in with color, no matter its shape.

Does the outset concept look strange to you? I know that working with `border-image` isn’t something many of us do all that often, so if this approach is tough to wrap your head around, definitely go check out [**my `border-image` article**](/smashingmagazine.com/css-border-image-property.md) for a thorough demonstration of how it works.

---

## Working With Gradients

Most of the trouble starts when we want to color the tooltip with a gradient instead of a flat color. Applying one color is simple — even with older techniques — but when it comes to gradients, it’s not easy to make the tail color flow smoothly into the container’s color.

But guess what? That’s no problem for us because we are already using a gradient in our `border-image` declaration!

```css
border-image: fill 0 // var(--h)
  conic-gradient(#CC333F 0 0);
```

`border-image` only accepts gradients or images, so to produce a solid color, I had to use a gradient consisting of just one color. But if you change it into a “real” gradient that transitions between two or more colors, then you get your tooltip gradient. That’s all!

<CodePen
  user="smashingmag"
  slug-hash="GRedryE"
  title="Adding gradient coloration"
  :default-tab="['css','result']"
  :theme="dark"/>

The only thing we need to pay attention to is the outset value. When using one color, we don’t really care what the outset value is; it just needs to be as big as possible to cover the `clip-path` area, as we did when setting it to `9999px`. However, when working with multiple colors, we should not use too big of a value so that we avoid clipping the gradient by accident.

In the last demo, you will notice I am using a value equal to `0 0 var(--h) 0`, which means that we are setting only a bottom outset; the tail is at the bottom, and the gradient will not extend in all the directions as it did in the other examples. I don’t want to get into all of the various edge cases that could come up, but if you have trouble working with the gradient’s color, it’s usually the `border-image`’s outset value that you need to check.

---

## Working With Rounded Corners

If we try to add a `border-radius` to the previous examples, nothing happens. That’s because the `border-radius` and `border-image` properties aren’t really all that good of friends. We need to tweak `border-image` and combine it with `background` to get things working right.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/6-steps-create-rounded-tooltip-corners-sequential-order.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/6-steps-create-rounded-tooltip-corners-sequential-order.png)

We start by declaring a `background` and `border-radius` on the `.tooltip`. Nothing fancy. Then, we move to the `border-image` property so that we can add a bar (highlighted in red in the last figure) that slightly overflows the container from the bottom. This part is a bit tricky, and here I invite you to read [**my previous article about `border-image`**](/smashingmagazine.com/css-border-image-property.md) to understand this bit of CSS magic. From there, we add the `clip-path` and get our final shape.

```css
.tooltip {
  /* triangle dimension */
  --b: 2em; /* base */
  --h: 1em; /* height */

--p: 50%; /* position  */
--r: 1.2em; /* the radius */
--c: #4ECDC4;

border-radius: var(--r);
clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%,
min(100%, var(--p) + var(--b) / 2) 100%,
var(--p) calc(100% + var(--h)),
max(0%, var(--p) - var(--b) / 2) 100%);
background: var(--c);
border-image: conic-gradient(var(--c) 0 0) fill 0/
var(--r) calc(100% - var(--p) - var(--b) / 2) 0 calc(var(--p) - var(--b) / 2)/
0 0 var(--h) 0;
} 
```

<CodePen
  user="smashingmag"
  slug-hash="MWxGvYg"
  title="Adding border radius"
  :default-tab="['css','result']"
  :theme="dark"/>

We are good but still have a tiny issue when the tail gets close to the extreme edges.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/7-jagged-edge-tail-tooltip.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/7-jagged-edge-tail-tooltip.png)

This visual glitch happens when the `border-image` overlaps with the rounded corners. To fix this, we need to adjust the `border-radius` value based on the tail’s position (`--p`).

We are not going to update all the radii, only the bottom ones and, more precisely, the horizontal values. I want to remind you that `border-radius` accepts up to eight values — each corner takes two values that set the horizontal and vertical directions — and in our case, we will update the horizontal value of the bottom-left and bottom-right corners:

```css
border-radius:
  /* horizontal values */
  var(--r) 
  var(--r) 
  min(var(--r),100% - var(--p) - var(--b)/2) /* horizontal bottom-right */
  min(var(--r),var(--p) - var(--b)/2) /* horizontal bottom-left */
  /
  /* vertical values */
  var(--r)
  var(--r)
  var(--r)
  var(--r)
```

All the corner values are equal to `--r`, except for the bottom-left and bottom-right corners. Notice the forward slash (`/`), as it is part of the syntax that separates the horizontal and vertical radii values.

Now, let’s dig in and understand what is happening here. For the bottom-left corner, when the position of the tail is on the right, the position (`--p`) variable value will be big in order to keep the radius equal to the radius (`--r`), which serves as the minimum value. But when the position gets closer to the left, the value of `--p` decreases and, at some point, becomes smaller than the value of `--r`. The result is the value of the radius slowly decreasing until it reaches `0`. It adjusts as the position updates!

I know that’s a lot to process, and a visual aid usually helps. Try slowly updating the tail’s position in the following demo to get a clearer picture of what’s happening.

<CodePen
  user="smashingmag"
  slug-hash="ZEPoJpG"
  title="Fixing the edge cases"
  :default-tab="['css','result']"
  :theme="dark"/>

What about instances when we want a custom shape for the tail? The technique we just used will only work when the tail has two equal sides — you know, an isosceles triangle. We need to adjust the `border-image` value and consider another trick to get things working correctly again.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/8-steps-correcting-tooltip-overflow.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/8-steps-correcting-tooltip-overflow.png)

This time, the border image creates a horizontal bar along the bottom that is positioned directly under the element and extends outside of its boundary so that we have enough color for the tail when it’s closer to the edge.

```css
.tooltip {
  /* tail dimension */
  --b: 2em; /* base */
  --h: 1.5em; /* height */

  --p: 50%; /* position */
  --x: 1.8em; /* tail position */
  --r: 1.2em; /* the radius */
  --c: #4ECDC4;

  border-radius: var(--r) var(--r) min(var(--r), 100% - var(--p) - var(--b) / 2) min(var(--r), var(--p) - var(--b) / 2) / var(--r);
  clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%,
  min(100%, var(--p) + var(--b) / 2) 100%,
  calc(var(--p) + var(--x)) calc(100% + var(--h)),
  max(0%, var(--p) - var(--b) / 2) 100%);
  background: var(--c);
  border-image: conic-gradient(var(--c) 0 0) 0 0 1 0 / 0 0 var(--h) 0 / 0 999px var(--h) 999px;
} 
```

<CodePen
  user="smashingmag"
  slug-hash="MWxGEpv"
  title="Custom tail with border radius"
  :default-tab="['css','result']"
  :theme="dark"/>

Again, the `border-image` declaration looks strange and difficult because, well, it is! Please do yourself a favor and check [**my previous article**](/smashingmagazine.com/css-border-image-property.md) if you want to dig deeper into this approach — you definitely won’t regret it.

“Why not use this approach for the first example we looked at?” you might ask. You are right that we can use this same approach for the first example, even if we don’t have the `--x` variable. That said, the reason we’re not going in that direction is that there is a tiny drawback to it in some particular cases, as you can see in the figure below.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/9-visual-imperfections-tooltip.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/9-visual-imperfections-tooltip.png)

That’s why I do not use this approach when working with a simple isosceles triangle. This said, the method is perfectly fine, and in most cases, you may not see any visual glitches.

---

## Putting Everything Together

We’ve looked at tooltips with tails that have equal sides, ones with tails that change shape, ones where the tail changes position and direction, ones with rounded corners, and ones that are filled in with gradients. What would it look like if we combined all of these examples into one mega-demo?

We can do it, but not by combining the approaches we’ve covered. We need another method, this time using a pseudo-element. No `border-image` for this one, I promise!

```css
.tooltip {
  /* triangle dimension */
  --b: 2em; /* base */
  --h: 1em; /* height */

  --p: 50%; /* position */
  --r: 1.2em; /* the radius */

  border-radius: var(--r) var(--r) min(var(--r), 100% - var(--p) - var(--b) / 2) min(var(--r), var(--p) - var(--b) / 2) / var(--r);
  background: 0 0 / 100% calc(100% + var(--h))
  linear-gradient(60deg, #CC333F, #4ECDC4); /* the gradient */
  position: relative;
  z-index: 0;
}
.tooltip:before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0 0 calc(-1*var(--h));
  background-image: inherit;
  clip-path:
  polygon(50% 50%,
  min(100%, var(--p) + var(--b) / 2) calc(100% - var(--h)),
  var(--p) 100%,
  max(0%, var(--p) - var(--b) / 2) calc(100% - var(--h)));
} 
```

The pseudo-element is used to create the tail at the bottom and notice how it inherits the gradient from the main element to simulate a continuous gradient that covers the entire shape.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/10-continuous-gradient.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/10-continuous-gradient.png)

Another important thing to note is the `background-size` declared in the `.tooltip`. The pseudo-element is covering a bigger area due to the negative bottom value, so we have to increase the height of the gradient so it covers the same area.

<CodePen
  user="smashingmag"
  slug-hash="ZEPoayw"
  title="Gradient and border radius"
  :default-tab="['css','result']"
  :theme="dark"/>

For the custom tail shape, we have to update the code slightly to consider the overflow on the left and right sides of the tooltip. The idea is to increase the gradient’s area when the tail is about to leave the container.

```css
.tooltip {
  --p: 50%;  /* position  */
  --x: -2em; /* tail shape and direction */

  --_e: max(0%, -1 * var(--x) - var(--p), var(--x) + var(--p) - 100%);

  background: 50% 0 / calc(100% + 2*var(--_e)) calc(100% + var(--h))
  linear-gradient(60deg, #CC333F, #4ECDC4); /* the gradient */
}
.tooltip:before {
  inset: 0 calc(-1 * var(--_e)) calc(-1 * var(--h));
  padding-inline: var(--_e);
} 
```

Alongside the `--x` variable that controls the tail’s shape and direction, I have introduced a new variable, `--_e`, that defines the gradient’s width for covering the `.tooltip` as well as the pseudo-element’s inline padding and its left and right values. It may look like a complex configuration, but the idea is that `--_e` will, in most cases, be equal to `0`, which gives us the same code as the last example we made. But when the tail overflows the `.tooltip` container, the `--_e` value increases, which increases the area of the gradient as well in order to cover the overflow.

Play with the position and shape of the tail in the following demo and notice how the gradient changes when the tail overflows the sides.

<CodePen
  user="smashingmag"
  slug-hash="RwdyExJ"
  title="Custom tail with border radius and gradient"
  :default-tab="['css','result']"
  :theme="dark"/>

I know this last code may look complex (same for some of the previous ones), and for this reason, I created [<VPIcon icon="fas fa-globe"/>an online collection of tooltips](https://css-generators.com/tooltip-speech-bubble/) from where you can easily grab the code. I’ve tried to cover as many cases as possible, even the ones you will probably never need. That said, it’s good to have an idea of how to build various tooltip shapes.

---

## One Last Thought

If we do the count, we have made 32 different tooltip shapes. That’s two types of color (solid or gradient), two types of corners (sharp or rounded) that produce four more variations, and two types of tail shapes (isosceles triangle and custom) for two additional variations, and four different tail positions (top, bottom, left, and right) which brings the final tally to 32 tooltip variations.

The last example we studied can be used to produce all the shapes simply by adjusting the different variables.

I know what you’re thinking: Why didn’t I simply share the last snippet and call it a day? Did this article really have to be so long when we could have jumped straight into the solution?

Sure, we could have done that, but If you compare the first example with only two CSS properties with the last example, the code for the last example is far too complex to create what can otherwise be accomplished in fewer lines. We started with a basic tooltip shape and embarked on a journey to make it account for more complex types of tooltips. Plus, we have learned a lot of tricks that can be useful in other situations and not necessarily for creating tooltips.

---

## Conclusion

That’s all for Part 1 of this brief two-part series. We still have many more shapes to cover in [**Part 2**](/smashingmagazine.com/modern-css-tooltips-speech-bubbles-part2.md), so take the time to digest what we covered in Part 1 before jumping ahead. In fact, here’s a little homework to help prepare you for Part 2: try creating the following tooltips using the CSS tricks you learned from this article.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/modern-css-tooltips-part1/11-different-tooltip-shapes.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/modern-css-tooltips-part1/11-different-tooltip-shapes.png)

Can you figure it out? The code for all of them is included in [<VPIcon icon="fas fa-globe"/>my tooltip collection](https://css-generators.com/tooltip-speech-bubble/) if you need a reference, but do try to make them yourself — it’s good exercise! Maybe you will find a different (or perhaps better) approach than mine.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Modern CSS Tooltips And Speech Bubbles (Part 1)",
  "desc": "Tooltips are a very common pattern used in CSS for years. There are a lot of ways to approach tooltips in CSS, though some evoke headaches with all the magic numbers they require. In this article, Temani Afif presents modern techniques to create tooltips with the smallest amount of markup and the greatest amount of flexibility.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/modern-css-tooltips-speech-bubbles-part1.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
