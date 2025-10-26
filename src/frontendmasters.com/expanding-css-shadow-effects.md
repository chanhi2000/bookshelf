---
lang: en-US
title: "Expanding CSS Shadow Effects - Frontend Masters Blog"
description: "Article(s) > Expanding CSS Shadow Effects - Frontend Masters Blog"
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
      content: "Article(s) > Expanding CSS Shadow Effects - Frontend Masters Blog"
    - property: og:description
      content: "Expanding CSS Shadow Effects - Frontend Masters Blog"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/expanding-css-shadow-effects.html
prev: /programming/css/articles/README.md
date: 2025-03-28
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5467
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
  name="Expanding CSS Shadow Effects - Frontend Masters Blog"
  desc="Shadows don't have to be used for... shadows. Inset shadows can layer over backgrounds and because they are animatable, it's just another tool for drawing what we want to the page."
  url="https://frontendmasters.com/blog/expanding-css-shadow-effects/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5467"/>

Design principles tell us a shadow is conveys that light is hiding an object, which casts the shadow behind it, giving us a sense of depth. However, if that’s *all* a shadow is ever used for, then it has not been utilized to its full potential.

---

## The Power of Shadows

Shadows in CSS can be multi-directional, layered, and are animate-able. On top of being all that, they don’t affect the layout and computed size of an element even though they can make it *appear* bigger or smaller, which makes them an efficient tool for making visual changes.

---

## Types of Shadows

There are different types of shadows based on the type of component they affect.

- `box-shadow`
- `filter: drop-shadow()`
- `text-shadow`

The difference between box-shadow and drop-shadow() is worth knowing!

<CodePen
  user="rpsthecoder"
  slug-hash="zxYLrJz"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

All of this is proof that you’ll benefit from understanding CSS shadows and learning ways to expand their uses beyond simply creating a proverbial shadow.

---

## Focus on Inset Box Shadows

In this article, for the purpose of simplicity, my examples will focus on *box shadows*, specifically, *inset box shadows*. However, the principles we’ll be working with are same for all types of CSS shadows.

Below is an example of what could be possible with the things I’ll be covering in this article. I’ll show you more examples and design variants as we proceed further.

<CodePen
  user="let’s"
  slug-hash="go ahead and animate a group of inset box shadows, via a `transition: box-shadow ... ;`, and see what we get."
  title=""
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>```html
<div class="pokemon golduck">
 <div class="text">Golduck</div>
</div>
```

```css{10-11}
.pokemon {
  box-shadow: 0 0 10px #eee,
    inset 3px 3px 10px white,
    inset -160px -160px 0 royalblue,
    inset 160px -160px 0 green,
    inset -160px 160px 0 blue,
    inset 160px 160px 0 yellow;
    /* etc. */
  &:hover {
    box-shadow: none;
    transition: box-shadow linear 0.6s;
    .text {
      opacity: 0;
    }
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="mydjVza"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The above shows off the `inset` keyword that `box-shadow` can use in a couple of different ways. Inward shadows make for terrific overlays, since it’s painted on *top* of an element’s background and originates from the edges of the element’s *padding box*. The other thing we got to confirm is that the `box-shadow` is indeed animate-able.

---

## Changing the Shadow’s Shape

CSS shadows, by default, follow the shape of the component they are applied to — a box, text, or the opaque area of an element, depending on which shadow is used. By playing around with the shadows’ vertical and horizontal offsets, you can reshape them to a degree. Here’s an example:

```css
.selected {
  /* etc. */
  box-shadow: 
    inset -30px 30px 0 white, 
    inset 30px -30px 0 white,
    inset 0 0 80px lime;
  transform: rotatez(360deg);
  transition: transform 1s linear;
}
```

The element we’ll apply this to is already a circle, and this will make the shadow somewhat football (🏈) shaped.

<CodePen
  user="rpsthecoder"
  slug-hash="ZYEjQmL"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

In similar ways you can play around with a shadow’s *blur radius*, *spread distance* (in `box-shadow`), and *color*.

::: tip

Add a thin border matching the page’s background to the element if there’s any inset shadow bleeding outside the box

:::

---

## Animating Only Parts of a Shadow

We can take this a step further. So far we’ve been animating the `box-shadow` property as a whole, but how about [<VPIcon icon="fas fa-globe"/>pin-pointing the animation to individual values](https://css-tricks.com/now-css-custom-properties-thing-value-parts-can-changed-individually/) of a shadow? That will not only produce a different result, but you can also assign different animation times for different aspects of a shadow:

```css
@property --l {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --c {
  syntax: "<color>";
  inherits: false;
  initial-value: red;
}
.selected {
  /* etc. */
  --l: 160px;
  --c: black;
  box-shadow: inset 0 0 0 var(--l) var(--c);
  transition: --l 1s linear, --c 0.5s linear;
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="vEYaLQQ"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

You can also use `@keyframes`, instead of `transition`, for the animations to keep frame stops. For instance, in the following example, there’s multiple color changes throughout the animation sequence as defined by the `@keyframes` ruleset, `colorChange`:

```css
@property --c {
  syntax: "<color>";
  inherits: false;
  initial-value: dodgerblue;
}
@keyframes colorChange {
  40% { --c: yellow }
  80% { --c: red }
}
.selected {
  /* etc. */
  box-shadow: inset 0 0 0 var(--l) var(--c);
  animation: 1s linear colorChange;
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="mydGZLE"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>


For our main demo, let’s keep `transition`, and then combine the things we’ve seen so far as well as include a few more colors.

```css
@property --l {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
.selected {
  /* etc. */
  --l: 100px;
  box-shadow: 
    inset var(--l) calc(-1 * var(--l)) 60px azure,
    inset calc(-1 * var(--l)) var(--l) 60px white,
    inset calc(-1 * var(--l)) calc(-1 * var(--l)) 60px white,
    inset var(--l) var(--l) 60px white,
    inset calc(-1 * var(--l)) calc(-1 * var(--l)) 5px fuchsia,
    inset var(--l) var(--l) 5px lime, inset var(--l) calc(-1 * var(--l)) 5px red,
    inset calc(-1 * var(--l)) var(--l) 5px green;
  transition: --l 1s linear;
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="emYjJbv"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

```css
.selected {
  /* etc. */
  box-shadow: 
    inset 0 0 10px 30px white, 
    inset -40px 0px 0 white,
    inset 40px 0px 0 white, 
    inset 0 0 100px red, 
    inset 0 -60px 0 white, 
    inset 60px 30px 0 white, 
    inset 0 0 100px blue;
  transform: rotatez(360deg);
  transition: box-shadow 1s linear, transform 1s linear;
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="zxYLrJz"
  title="Box Shadow Effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

This is where you can really see how layering can be helpful.

---

## Other Examples

Here’s a collection of a few on-hover animation designs using CSS shadows to help you get started:

<CodePen
  user="rpsthecoder"
  slug-hash="KwKyoKM"
  title="Crafting shadow effects"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

If you want to keep exploring shadow animations further, I recommend combining them with other possible visual effects from CSS properties like *filter* and *blend modes*. Also, make sure to see how the animations work out both when individual values are animated and when the shadow as a whole property is animated.

::: info Further Reference

<SiteInfo
  name="Learn CSS - Box shadow playground"
  desc="..."
  url="https://codepen.io/web-dot-dev/details/rNjGevp/"
  logo="https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico"
  preview="https://shots.codepen.io/username/pen/rNjGevp-800.jpg?version=1619799341"/>

- “[A Few Interesting Ways To Use CSS Shadows For More Than Depth](/smashingmagazine.com/interesting-ways-use-css-shadows.md)” by me on Smashing Magazine
<!-- TODO: vpcard추가 -->

<SiteInfo
  name="@property - CSS: Cascading Style Sheets | MDN"
  desc="The @property CSS at-rule is part of the CSS Houdini set of APIs. It allows developers to explicitly define CSS custom properties, allowing for property type checking and constraining, setting default values, and defining whether a custom property can inherit values or not."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/@property/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Expanding CSS Shadow Effects - Frontend Masters Blog",
  "desc": "Shadows don't have to be used for... shadows. Inset shadows can layer over backgrounds and because they are animatable, it's just another tool for drawing what we want to the page.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/expanding-css-shadow-effects.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
