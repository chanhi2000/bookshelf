---
lang: en-US
title: "Background Image Refraction in CSS"
description: "Article(s) > Background Image Refraction in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Background Image Refraction in CSS"
    - property: og:description
      content: "Background Image Refraction in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/background-image-refraction-in-css.html
prev: /programming/css/articles/README.md
date: 2026-08-28
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10687
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
  name="Background Image Refraction in CSS"
  desc=""
  url="https://blog.master.dev/blog.master.dev/background-image-refraction-in-css/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10687"/>

The soul of a “liquid glass” design is a good illusion of light refraction. That is, to see parts of the screen through a metaphorical lens. This article shows you how to get that for the backgrounds of elements.

This is the type of design I’m talking about, taken directly from the demo we’ll build:

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/08/drCxUiNQ.png?resize=1024%2C696&ssl=1)

---

## Why are fixed backgrounds limiting?

Typically, to achieve the refracted effect, we set the same fixed background to the refraction backdrop element and the elements displaying the refracted look inside. This way, the overlapping elements show the same part of the image. A slight shift in the background of one of these elements causes that refracted appearance.

```html
<div id=card-container>
  <div id=card></div>
<div>
```

```css
#card-container {
  background: center/cover url("image.jpg");
  background-attachment: fixed;
}
#card {
  border: 2px red solid;
  background: inherit;
  background-position: -20px -20px;
  margin-left: auto;
}
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a01e69-8f2b-705e-af8b-7431c19d54ef"
  title="Background Refraction in CSS (with fixed bg)"
  :default-tab="['css','result']"
  :theme="dark"/>

**The downside of this method is that the background image sits relative to the screen (viewport),** **not the backdrop element.** To make sure the image fits nicely into the backdrop, we’ll need to adjust its position and size. This means we need to know the backdrop element’s dimensions and, most importantly, its position on the screen in CSS. Figuring this out for a random element in a responsive layout can be tricky.

---

## How does CSS view() resolve this?

There *is* an easy way to track the positions of even random elements in CSS, under the right circumstances. **CSS `view()` tracks the position, visibility to be precise, of an element inside a scroll container.**

So if we **use a scroll container as a refraction backdrop**, the backgrounds of the elements inside it can easily align with the corresponding parts of the backdrop by repositioning themselves based on their positions within the container.

No need for fixed backgrounds and complex calculations. Interestingly, actual scrolling is not required for this technique either.

Let’s see how it’s done.

---

## The Setup

We got a container with a background image for the refraction backdrop and a child element that’ll be showing the refraction effect.

```html
<div id="card-container">
  <div id="card"></div>
<div>
```

---

## The Container (Refraction Backdrop)

In CSS, we first explicitly set the container’s background image size to ensure consistent dimensions.

```css
#card-container {
  --w: 380px;
  --h: 420px;
  width: var(--w);
  height: var(--h);
  background: url("image.jpg") 0 0 / var(--w) var(--h) no-repeat;
}
```

Then we [**convert the container**](/blog.master.dev/boundary-aware-styling-in-css.md#:~:text=How%20does%20an%20element%20become%20a%20scroll%20container?) to a [**scroll container**](/blog.master.dev/boundary-aware-styling-in-css.md#:~:text=How%20does%20an%20element%20become%20a%20scroll%20container?) with `overflow:hidden`. I’ll tell you why in a moment.

```css
#card-container {
  /* ... */
  overflow: hidden;
}
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019fe0e2-2a50-7247-82de-52aad7a14622"
  title="Background Refraction in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Card (Refraction Foreground)

Moving onto the card, the element that’ll be showing the refracted look, we set the card’s background image to inherit from the container so they are the same.

```css
#card {
  background: inherit;
}
```

Let’s then add two keyframe animations on the card that meet the following criteria:

1. Both animations have [<VPIcon icon="fa-brands fa-firefox"/>linear *timing function*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function#:~:text=Creates%20transitions%20that%20progress%20at%20a%20constant%20rate.) (constant animation progression). This avoids any discrepenacy when we try to align the refracted elements’ backgrounds to the backdrop.
2. [<VPIcon icon="fa-brands fa-firefox"/>contain *animation range*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/timeline-range-name#contain) is set (animates within the viewport’s bounds). So that the backrop’s edges strictly remain the reference point for the inner elements’ refracted effects.
3. The animation timelines are [<VPIcon icon="fa-brands fa-firefox"/>*view timelines*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline/view#:~:text=A%20view%20progress%20timeline%20progresses%20based%20on%20changes%20in%20the%20visibility%20of%20a%20subject%20element%20inside%20its%20nearest%20scroll%20container.), one for the x-axis and the other for the y-axis. CSS view() handles only one direction at a time, so we set one for the horizontal direction and one for the vertical.

```css
#card {
  /* ... */
  animation: pos-x linear, pos-y linear;
  animation-timeline: view(x), view(y);
  animation-range: contain;
}
```

::: note

Since we’d turned the container into a scroll container earlier, we can now apply view timeline to the card to animate based on its visibility within the container.

:::

What will we be animating? The card’s background position.

```css
@keyframes pos-x {
 from { background-position-x: 100%; }
}
@keyframes pos-y {
  from { background-position-y: 100%; }
}
```

The keyframe `pos-x` positions the background image horizontally, depending on the card’s horizontal position within the container (`view(x)`). Similarly, `pos-y` positions it vertically, based on the card’s vertical position within the container (`view(y)`)

**We’ve now set the exact portion of the container’s background that the card is placed on as the card’s background.** (The card has a red border)

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019fe0e6-ea73-745a-97a8-feb1bfbc777d"
  title="Background Refraction in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Refraction

Let’s **introduce a little refraction** by resizing the card’s background.

```css
#card {
  background: inherit;
  background-size: calc(var(--w) - 100px) calc(var(--h) - 100px);
  /* ... */
}
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019fe0ee-a144-704d-9ffc-59b688744886"
  title="Background Refraction in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Alternatively, we could move the background position for a different refraction look.

```css
@keyframes pos-x {
  from { background-position-x: 85%; }
}
@keyframes pos-y {
  from { background-position-y: 85%; }
}
```

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019fe0f0-89cb-7610-b2e9-0d4e767c426c"
  title="Background Refraction in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Basically, we **offset the background image** slightly in the card.

With the refraction covered, it should be easy to layer effects like blur, shadow, skew and such for a more advanced glassmorphism. **Since we’re using scroll based `view()` for this effect, if the card can be scrolled around, the background image will update automatically.**

Here’s the demo for the example from the beginning of the article:

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/019fa47e-713b-75f3-aada-824836b78aba"
  title="Background Refraction in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s another example where the elements can be scrolled:

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a01e66-ca06-749e-81c8-d4c025549948"
  title="Background Refraction in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/07/Liquid-Glass-on-the-Web.jpg?fit=1140%2C676&ssl=1&resize=350%2C200)](https://blog.master.dev/liquid-glass-on-the-web/ "Liquid Glass on the Web")

#### [Liquid Glass on the Web](https://blog.master.dev/liquid-glass-on-the-web/ "Liquid Glass on the Web")

It's a complicated look! There may or may not be blurring, light refracts in tricky ways, the highlights are quite bright, and you've got to be very careful about text contrast accessibility.
<!-- TODO: /master.dev/liquid-glass-on-the-web.md -->

```component VPCard
{
  "title": "Backgrounds for the Box Model (and why it can be useful)",
  "desc": "You can limit how far the background-image of an element applies by using background-clip. That means you can apply *different* backgrounds to, say, the padding and border.",
  "link": "/blog.master.dev/backgrounds-for-the-box-model-and-why-it-can-be-useful.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

You can limit how far the background-image of an element applies by using background-clip. That means you can apply *different* backgrounds to, say, the padding and border.

```component VPCard
{
  "title": "Background Patterns with CSS `corner-radius`",
  "desc": "You might need to know this someday: you can style a div, put the div into SVG, then put the SVG in to CSS and use it as a repeating background.",
  "link": "/blog.master.dev/background-patterns-with-css-corner-radius.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

You might need to know this someday: you can style a div, put the div into SVG, then put the SVG in to CSS and use it as a repeating background.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Background Image Refraction in CSS",
  "desc": "",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/background-image-refraction-in-css.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
