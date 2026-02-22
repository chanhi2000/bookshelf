---
lang: en-US
title: "CSS Blurry Shimmer Effect"
description: "Article(s) > CSS Blurry Shimmer Effect"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Blurry Shimmer Effect"
    - property: og:description
      content: "CSS Blurry Shimmer Effect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-blurry-shimmer-effect.html
prev: /programming/css/articles/README.md
date: 2024-01-25
isOriginal: false
author:
  - name: Yair Even Or
    url: https://smashingmagazine.com/author/yair-even-or/
cover: https://files.smashing.media/articles/css-blurry-shimmer-effect/css-blurry-shimmer-effect.jpg
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
  name="CSS Blurry Shimmer Effect"
  desc="Taking inspiration from shadows, author Yair Even Or creates the same sort of thing, only with a blurring effect in place of the shadow. Read along for a step-by-step explanation of how it comes together using a combination of masks, gradients, and the good ol’ `backdrop-filter` property."
  url="https://smashingmagazine.com/2024/01/css-blurry-shimmer-effect/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/css-blurry-shimmer-effect/css-blurry-shimmer-effect.jpg"/>

Box shadows are fairly straightforward in CSS: declare the `box-shadow` property, set the shadow offsets, define the spread, and give it a color. It’s a great way to add depth to what might be an otherwise flat design! Taking inspiration from shadows, author Yair Even Or creates the same sort of thing, only with a blurring effect in place of the shadow. Read along for a step-by-step explanation of how it comes together using a combination of masks, gradients, and the good ol’ `backdrop-filter` property.

Imagine `box-shadow` but for a blur effect, where the backdrop of an element is blurred around that element, gradually decreasing the blur’s strength. I came up with the idea while trying to improve the contrast of a popup over a dark area where a `box-shadow` for the popup won’t make much sense, design-wise. I then thought, well, what other ways might create a good contrast effect? And so suddenly, the idea of a gradual blur effect around the object came to me.

<CodePen
  user="smashingmag"
  slug-hash="QWoMvge"
  title="Faded Outer Box Backdrop Blur [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

It would be awesome if we had a `box-blur` property or perhaps some sort of `blur` keyword we could set on `box-shadow` the way we do for `inset` shadows. Unfortunately, CSS has no such property. But because CSS is awesome and flexible, we can still get the effect by combining a few CSS features and hack it through.

What I’m going to show you from here on out is the thought process I took to create the effect. Sometimes, I find it easier to know what’s coming up rather than meandering through a narrative of twists and turns. So, for those of you who are like me and want to jump straight into the process, this was my approach.

---

## Start With The Markup

The effect is approached in a way that it is applied to the `::before` pseudo-element of some element, say some popup/dialog/popover/tooltip. Those are the common “targets” for this sort of effect. I think using a pseudo-element is a good approach here because it means we could technically scope the styles to the pseudo-element and re-purpose the effect on other elements without any HTML changes.

```html
<!-- This is literally it for this demo -->
<div></div>
```

You can give the element a class, whatever dimensions you like, insert content and other child elements within it, or use a completely different element. The HTML isn’t the main ingredient for the secret sauce we’re making.

---

## Position The Pseudo-Element

We want the `::before` pseudo-element to occupy the entire area of the `<div>` element we’re using for this specific demo. Not only do we want it to cover the entire area, but even *overflow* it because that establishes the visible area, which holds the blur effect, so it will extend outwards.

```css
::before {  
  content: '';

  /* Make sure the parent element is at least relatively positioned to contain the pseudo-element. */
  position: absolute;
  
  /* The blur size should be anything below `0` so it will extend to the outside. */
  inset: -100px;

  /* This layer is positioned between the parent element and page background. */
  /* Make sure this value is one below the `z-index` of the parent element. */
  z-index: -1;
}
```

The code comments spell out the key pieces. An empty string has to be set for the `content` property so the [<VPIcon icon="fa-brands fa-firefox"/>`::before`](https://developer.mozilla.org/en-US/docs/Web/CSS/::before#syntax) will be rendered, then we take it out of the document flow by giving it absolute positioning. This allows us to `inset` the element’s position and is ultimately setting the blur effect directions as we would on the `box-shadow` property — only we’re using `inset` to control its size. We want a *negative* `inset` value, where the effect extends further the lower the value gets.

Until now, we’ve set the foundation for the effect. There’s nothing really to see just yet. Now, the fun begins!

---

## Masking With Transparent Gradients

Gradients are technically *images* — generated by the browser — which can be used as CSS masks to hide parts of an element to create various shapes. You may have seen a few related Smashing Magazine articles where CSS masking has been showcased, such as [**this one by Temani Afif**](/smashingmagazine.com/revealing-images-css-mask-animations.md).

::: info From Smashing Magazine by Temani Afif (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>)

> [Transparency is the key thing when it comes to masking with gradients. Transparency allows us to gradually hide portions of an element in a way that creates the illusion of fading in or out.](https://x.com/share?text=%0aTransparency%20is%20the%20key%20thing%20when%20it%20comes%20to%20masking%20with%20gradients.%20Transparency%20allows%20us%20to%20gradually%20hide%20portions%20of%20an%20element%20in%20a%20way%20that%20creates%20the%20illusion%20of%20fading%20in%20or%20out.%0a&url=https://smashingmagazine.com%2f2024%2f01%2fcss-blurry-shimmer-effect%2f)

:::

That’s perfect in this case because we want the effect to be stronger, closer to the object, and fade in intensity as it gets further away.

We’ll use two gradients: one that goes horizontally and another that goes vertically. I chose this route because it mimics a rough rectangle shape that fades out towards the edges.

As I said, transparency is key. Both gradients start `transparent`, then transition to `black` until just before the end, where they go back to `transparent` to fade things out. Remember, these gradients are *masks* rather than background images, so they are declared on the `mask` property, which controls which pixels should be rendered and their opacity.

```css
mask:
  linear-gradient(to top, transparent 0%, black 25% 75%, transparent 100%),
  linear-gradient(to left, transparent 0%, black 25% 75%, transparent 100%);
```

<CodePen
  user="smashingmag"
  slug-hash="qBvXmpP"
  title="Basic Gradient Mask [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

- The vertical gradient (**`to top`**) creates a fade from transparent at the bottom to black in the middle, then back to transparent at the top.
- The horizontal gradient (**`to left`**) produces a fade from transparent on the right to black in the middle, then back to transparent on the left.

This dual-gradient approach positions the black regions, so they merge, creating the rough baseline of a rectangular shape that will be refined in the next step. The `mask` property is best declared as first prefixed and then un-prefixed to cover more browsers’ support:

```css
-webkit-mask:
  linear-gradient(to top, transparent 0%, black 25% 75%, transparent 100%),
  linear-gradient(to left, transparent 0%, black 25% 75%, transparent 100%);
mask:
  linear-gradient(to top, transparent 0%, black 25% 75%, transparent 100%),
  linear-gradient(to left, transparent 0%, black 25% 75%, transparent 100%);
```

---

## Refining Using The `mask-composite` Property

The **`mask-composite`** property is part of the CSS Masking Module and enables pixel-wise control over the blending of masked content, allowing for intricate compositions.

The **`source-in`** value of this property is very useful for the effect we are after because it tells the browser to only retain the overlapping areas of the mask, so only pixels that contain both (mentioned above) gradients will get rendered. This locks in a rectangle shape, which can then be applied on any DOM element that has none-to-moderately curved corners (`border-radius`).

<VidStack src="vimeo/905918328" />

---

## Gradually Blurring The Backdrop

Now that we have a mask to work with, all we need to do is use it. The `backdrop-filter` CSS property can blur anything that is rendered “behind” an element using the `blur()` function:

```css
::before {
  /* etc. */

  backdrop-filter: blur(10px);
}
```

The larger the value, the more intense the blur. I’m using `10px` arbitrarily. In fact, we can variablize this stuff later to make the implementation even more flexible and easily configurable.

But wait! As it turns out, Safari requires a vendor-prefixed version of `backdrop-filter` to get it working there:

```css
::before {
  /* etc. */

  -webkit-backdrop-filter: blur(10px); /* Required for Safari */
  backdrop-filter: blur(10px);
}
```

::: note

It’s preferred to declare prefixed properties* **before** the unprefixed variant so they serve as a fallback for browsers that don’t (yet) support them or their implementation is different.

:::

---

## A Touch of Synergistic Shadow

I think adding a slight semi-opaque black `box-shadow` that covers the blur area gives the effect a little extra depth. The only thing is that you’ll want to add it to the element itself rather than it’s `::before` pseudo:

```css
div {
  box-shadow: 0 0 40px #00000099;
}
```

That’s totally optional, though.

---

## Bringing Everything Together

Here’s how the CSS comes out when we combine everything together.

```css :collapsed-lines
/* This can be set on the ::before pseudo of the element it is applied to. */
::before {
  content: "";

  /* This layer is positioned between some element and its background. */
  position: absolute;

  /* This should not affect the contents of the container. */
  z-index: -1;

  /* The blur size should be anything below `0` so it will extend to the outside. */
  inset: -100px;

  /* The blur effect */
  -webkit-backdrop-filter: blur(10px); /* Required for safari */
  backdrop-filter: blur(10px);

  /* A mask fades the blur effect, so it gets weaker. */
  /* towards the edges, further from the container box. */
  /* (The fill color is irrelevant, so "red" is used as it's the shortest color name.) */
  mask:
    linear-gradient(
      to top,
      transparent 0%,
      red 100px calc(100% - 100px),
      transparent 100%
    ),
    linear-gradient(
      to left,
      transparent 0%,
      red 100px calc(100% - 100px),
      transparent 100%
    );

  /* This merges the masks above so only the overlapping pixels are rendered. */
  /* This creates the illusion of a fade-out mask. */
  mask-composite: intersect;
  -webkit-mask-composite: source-in; /* Required for Safari */
}
```

---

## The Final Demo, One More Time

<CodePen
  user="smashingmag"
  slug-hash="ZEPJKRO"
  title="Faded Outer Box Backdrop Blur [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

I’ve also prepared a [simplified version (<VPIcon icon="fa-brands fa-codepen" />`vsync`)](https://codepen.io/vsync/pen/YzgGvRN?editors=1100) with minimal code and no CSS variables that’s easier to read and re-purpose.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Blurry Shimmer Effect",
  "desc": "Taking inspiration from shadows, author Yair Even Or creates the same sort of thing, only with a blurring effect in place of the shadow. Read along for a step-by-step explanation of how it comes together using a combination of masks, gradients, and the good ol’ `backdrop-filter` property.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-blurry-shimmer-effect.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
