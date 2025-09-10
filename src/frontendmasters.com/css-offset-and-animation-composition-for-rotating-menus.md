---
lang: en-US
title: "CSS offset and animation-composition for Rotating Menus"
description: "Article(s) > CSS offset and animation-composition for Rotating Menus"
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
      content: "Article(s) > CSS offset and animation-composition for Rotating Menus"
    - property: og:description
      content: "CSS offset and animation-composition for Rotating Menus"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-offset-and-animation-composition-for-rotating-menus.html
prev: /programming/css/articles/README.md
date: 2025-09-17
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7147
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
  name="CSS offset and animation-composition for Rotating Menus"
  desc="The article explains how to design and animate a *circular* menu (that rotates in a circle!) in CSS using offset and animation-composition."
  url="https://frontendmasters.com/blog/css-offset-and-animation-composition-for-rotating-menus/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7147"/>

Circular menu design exists as a space-saver or choice, and there’s an easy and efficient way to create and animate it in CSS using `offset` and `animation-composition`. Here are some examples (click the button in the center of the choices):

<CodePen
  user="rpsthecoder"
  slug-hash="JoYeQEe"
  title="Revolving Menu (Quad)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<CodePen
  user="rpsthecoder"
  slug-hash="jEbQjBm"
  title="Revolving Menu (Semi)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<CodePen
  user="rpsthecoder"
  slug-hash="WbQmdxR"
  title="Revolving Menu (Semi)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I’ll take you through the second example to cover the basics.

---

## The Layout

Just some semantic HTML here. Since we’re offering a menu of options, a `<menu>` seems appropriate (yes, [<VPIcon icon="fa-brands fa-firefox"/>`<li>` is correct as a child](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu)!) and each button is focusable.

```html
<main>
  <div class="menu-wrapper">
    <menu>
      <li><button>Poland</button></li>
      <li><button>Brazil</button></li>
      <li><button>Qatar</button></li>
      <!-- etc. -->
    </menu>
    <button class="menu-button" onclick="revolve()">See More</button>
  </div>
</main>
```

Other important bits:

The menu and the menu button (`<button id="menu-button">`) are the same size and shape and stacked on top of each other.

Half of the menu is hidden via `overflow: clip;` and the menu wrapper being pulled upwards.

```css{2,7}
main { 
  overflow: clip;
}
.menu-wrapper { 
  display: grid;
  place-items: center;
  transform: translateY(-129px);
  menu, .menu-button {
    width: 259px;
    height: 129px;
    grid-area: 1 / 1;
    border-radius: 50%;
  }
}
```

Set the menu items (`<li>`s) around the `<menu>`’s center using `offset`.

```css{7}
menu {
    padding: 30px;
    --gap: 10%; /* The in-between gap for the 10 items */
}
li {
  offset: padding-box 0deg;
  offset-distance: calc((sibling-index() - 1) * var(--gap)); 
  /* or 
    &:nth-of-type(2) { offset-distance: calc(1 * var(--gap)); }
    &:nth-of-type(3) { offset-distance: calc(2 * var(--gap)); }
    etc...
  */
}
```

The `offset` (a longhand property) positions all the `<li>` elements along the `<menu>`’s `padding-box` that has been set as the *offset path*.

:: info MDN Web Docs (<VPIcon icon="fa-brands fa-firefox"/>`developer.mozilla.org`)

The **offset** CSS shorthand property sets all the properties required for animating an element along a defined path. The offset properties together help to define an offset transform, a transform that aligns a point in an element ([<VPIcon icon="fa-brands fa-firefox"/>offset-anchor](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-anchor)) to an offset position ([<VPIcon icon="fa-brands fa-firefox"/>offset-position](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position)) on a path ([<VPIcon icon="fa-brands fa-firefox"/>offset-path](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path)) at various points along the path ([<VPIcon icon="fa-brands fa-firefox"/>offset-distance](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance)) and optionally rotates the element ([<VPIcon icon="fa-brands fa-firefox"/>offset-rotate](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate)) to follow the direction of the path.

<SiteInfo
  name="offset - CSS | MDN"
  desc="The offset CSS shorthand property sets all the properties required for animating an element along a defined path. The offset properties together help to define an offset transform, a transform that aligns a point in an element (offset-anchor) to an offset position (offset-position) on a path (offset-path) at various points along the path (offset-distance) and optionally rotates the element (offset-rotate) to follow the direction of the path."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/offset/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

The `offset-distance` is set to spread the menu items along the path based on the given gap between them (`--gap: 10%`).

| Items | Initial value of `offset-distance` |
| --- | --- |
| 1 | 0% |
| 2 | 10% |
| 3 | 20% |

---

## The Animation

```css
@keyframes rev1 { 
  to {
    offset-distance: 50%;
  } 
}

@keyframes rev2 { 
  from {
    offset-distance: 50%;
  } 
  to {
    offset-distance: 0%;
  } 
}
```

Set two `@keyframes` animations to move the menu items halfway to the left, clockwise, (`rev1`), and then from that position back to the right (`rev2`)

```css{4}
li {
  /* ... */
  animation: 1s forwards;
  animation-composition: add; 
}
```

Set `animation-time` (`1s`) and `animation-direction` (`forwards`), and `animation-composition` (`add`) for the `<li>` elements

Even though animations can be triggered in CSS — for example, within a `:checked` state — since we’re using a `<button>`, the names of the animations will be set in the `<button>`’s click handler to trigger the animations.

By using `animation-composition`, the animations are made to *add*, not replace by default, the `offset-distance` values inside the `@keyframes` rulesets to the initial `offset-distance` values of each of the `<li>`.

| Items | Initial Value | to |
| --- | --- | --- |
| 1 | 0% | (0% + 50%) **50%** |
| 2 | 10% | (10% + 50%) **60%** |
| 3 | 20% | (20% + 50%) **70%** |

rev1 animation w/ `animation-composition: add`

| Items | from | back to Initial Value |
| --- | --- | --- |
| 1 | (0% + 50%) **50%** | (0% + 0%) **0%** |
| 2 | (10% + 50%) **60%** | (10% + 0%) **10%** |
| 3 | (20% + 50%) **70%** | (20% + 0%) **20%** |

rev2 animation w/ `animation-composition: add`

Here’s how it *would’ve been* without `animation-composition: add`:

| Items | Initial Value | to |
| --- | --- | --- |
| 1 | 0% | 50% |
| 2 | 10% | 50% |
| 3 | 20% | 50% |

::: info MDN Web Docs (<VPIcon icon="fa-brands fa-firefox"/>`developer.mozilla.org`)

> The **animation-composition** CSS property specifies the [<VPIcon icon="fa-brands fa-firefox"/>composite operation](https://developer.mozilla.org/en-US/docs/Glossary/Composite_operation) to use when multiple animations affect the same property simultaneously.

:::

---

## The Trigger

```js
const LI = document.querySelectorAll('li');
let flag = true;
function revolve() {
  LI.forEach(li => li.style.animationName = flag ? "rev1" : "rev2");
  flag = !flag;
}
```

In the menu button’s click handler, `revolve()`, set the `<li>` elements’ `animationName` to `rev1` and `rev2`, alternatively.

Assigning the animation name triggers the corresponding keyframes animation each time the `<button>` is clicked.

Using the method covered in this post, it’s possible to control how much along a revolution the elements are to move (demo one), and which direction. You can also experiment with different offset path shapes. You can declare (`@keyframes`) and trigger (`:checked`, `:hover`, etc.) the animations in CSS, or using JavaScript’s [<VPIcon icon="fa-brands fa-firefox"/>Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect) that includes the animation composition property.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS offset and animation-composition for Rotating Menus",
  "desc": "The article explains how to design and animate a *circular* menu (that rotates in a circle!) in CSS using offset and animation-composition.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-offset-and-animation-composition-for-rotating-menus.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
