---
lang: en-US
title: "CSS Fan Out with Grid and @property"
description: "Article(s) > CSS Fan Out with Grid and @property"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - animation
  - custom-properties
  - grid
  - "@property"
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Fan Out with Grid and @property"
    - property: og:description
      content: "CSS Fan Out with Grid and @property"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-fan-out-with-grid-and-property.html
prev: /programming/css/articles/README.md
date: 2024-10-09
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4128
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
  name="CSS Fan Out with Grid and @property"
  desc="A “fan out” animation involves sequentially revealing items from a stack with bouncy effect. by using css grid, we save quite bit of fiddly positioning work."
  url="https://frontendmasters.com/blog/css-fan-out-with-grid-and-property/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4128"/>

A “fan out” is an expanding animation where a group of items appear one after another, next to each other, as though they were spread out from a stack. There's usually a subtle bounciness in the reveal.

The effect is customarily achieved by timing and positioning each of the items individually with very specific hard set values. That can be an awful lot of work though. We can make things a bit easier if we let the items' parent container do this for us. Here's a result of doing it this way:

::: note UPDATE

This article has been updated to now include the animation of the grid items' `height`, to produce an overall smoother transition effect. The previous version of this article didn't cover that.

:::

<CodePen
  user="rpsthecoder"
  slug-hash="xxvRrYQ"
  title="CSS Reveal (grid-template-rows + @property)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

For HTML, there's a group of items (plus an empty one — I will explain later why it's there), bookended by two radio controls to prompt the opening and closing of the items respectively.

```html
<section class="items-container">
  <p class="items"><!--empty--></p>
  <label class="items close">
    Close the messages<input type="radio" name="radio">
  </label>
  <p class="items">Alert from Project X</p>
  <p class="items">&#x1F429; Willow's appointment at <i>Scrubby's</i></p>
  <p class="items">Message from (-_-)</p>
  <p class="items">NYT Feed: <u>Weather In... (Read more)</u></p>
  <p class="items">6 more items to check in your vacation list!</p>
  <label class="items open">
    Show the messages<input type="radio" name="radio">
  </label>
</section>
```

We need a grid container for this to work, so let's turn the `<section>`, the items' container element, into one.You could use a list or anything you feel is semantically appropriate.

```css
.items-container {
  display: grid; 
}
```

Now create an *Integer* CSS custom property with a value same as the number of items inside the container (including the open and close controls, and the empty item). This is key to implement the revealing and hiding of the items, sequentially, from within the grid container's style rule.

Also, register another CSS custom property of data type *length* that'll be used to animate each item's height during the opening and closing of the control, for a smoother execution of the overall action.

```css
@property --int {
  syntax: "<integer>";
  inherits: false;
  initial-value: 7;
}

@property --hgt {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
```

Use the now created `--int` and `--hgt` properties to add that many grid rows of zero height in the grid container.

```css{3}
.items-container {
  display: grid;
  grid-template-rows: repeat(calc(var(--int)), var(--hgt));
}
```

When directly adding `--int` to `repeat()` it was producing a blotchy animation in Safari for me, so I fed it through `calc()` and the animation executed well (we'll look into the animation in a moment). However, `calc()` computation kept leaving out one item in the iteration, because of how it computed the value 0. Hence, I added the empty item to compensate the exclusion.

If Safari did not give me a blotchy result, I would've not needed an empty item, `--int`'s `initial-value` would've been 6, and `grid-template-rows`'s value would've been just `repeat(var(--int), 0px)`. In fact, with this set up, I got good animation results both in Firefox and Chrome.

In the end though, I went with the one that uses `calc()`, which provided the desired result in all the major browsers.

Let's get to animation now:

```css{1-2,8-9,13-15}
@keyframes open { to { --int: 0; --hgt: 60px; } }
@keyframes close { to { --int: 6; --hgt: 0px; } }
.item-container {
  display: grid;
  grid-template-rows: repeat(calc(var(--int)), var(--hgt));
  &:has(.open :checked) {
    /* open action */
    animation: open 0.3s ease-in-out forwards;
    .open { display: none; }
  }
  &:has(.close :checked) {
    /* close action */
    --int: 0;
    --hgt: 60px;
    animation: close 0.3s ease-in-out forwards;
  }
}
```

When the input is in the `checked` state, the `open` keyframe animation is executed, and the control itself is hidden with `display: none`.

The `open` class changes `--int`'s value from its `initial-value`, 7, to the one set within the `@keyframes` rule (`0`), over a set period (`.3s`). This decrement removes the zero height from each of the grid row, one by one, thus sequentially revealing all the items in `.3s` or `300ms`.Simultaneously, `--hgt`'s value is increased to 60px from its initial 0px value. This expands each item's height as it appears on the screen.

When the input to *hide* all the items is in the `checked` state, the `close` keyframe animation is executed, setting `--int`'s value to 0 and `--hgt`'s value to 60px.

The `close` class changes the now `0` value of `--int` to the value declared in its rule: `7`. This increment sets a zero height to each of the grid row, one by one, thus *sequentially hiding* all the items.Simultaneously, `--hgt`'s value is decreased to 0px. This shrinks each item's height as it disappears from the screen.

To perform the close action, instead of making a unique close animation, I tried using the open animation with `animation-direction: reverse`. Unfortunately, the result was jerky. So I kept unique animations for the open and close actions separately.

Additionally, to polish the UI, I'm adding transition animations to the row gaps and text colors as well. The row gaps set `cubic-bezier()` animation timing function to create a low-key springy effect.

```css{4,9-11,17-18}
.scroll-container {
  display: grid;
  grid-template-rows: repeat(calc(var(--int)), 0px); /* serves the open and close actions */
  transition: row-gap 0.3s 0.1s cubic-bezier(0.8, 0.5, 0.2, 1.4);
  &:has(.open :checked) {
    /* open action */
    animation: open 0.3s ease-in-out forwards;
    .open { display: none; } /* styling */
    row-gap: 10px;
    .items { color: rgb(113 124 158); transition: color 0.3s 0.1s; }
    .close { color: black; }
  }
  &:has(.close :checked) {
    /* close action */
    --int: 0;
    animation: close 0.3s ease-in-out forwards; /* styling */
    row-gap: 0;
    .items { color: transparent; transition: color 0.2s; }
  }
}
```

When expanded, the row `gap`s go up to `10px` and the text color comes in. When shrinking, the row `gap`s go down to `0` and the text color fades out to transparent. With that, the example is complete! Here's the Pen once more:

<CodePen
  user="rpsthecoder"
  slug-hash="xxvRrYQ"
  title="CSS Reveal (grid-template-rows + @property)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

::: note

You can try this method with any grid compositions — rows, columns, or both.

::::

---

::: info Further Reading

<SiteInfo
  name="grid-template-rows - CSS: Cascading Style Sheets | MDN"
  desc="The grid-template-rows CSS property defines the line names and track sizing functions of the grid rows."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<SiteInfo
  name="@property: Next-gen CSS variables now with universal browser support | Blog | web.dev"
  desc="Semantic custom properties with @property just reached Baseline Newly available."
  url="https://web.dev/blog/at-property-baseline/"
  logo="https://gstatic.com/devrel-devsite/prod/vdcd49b48a0f6579e36a0f52b513a1840db67522fa48e80a57742b4388044a7e9/web/images/favicon.png"
  preview="https://web.dev/static/blog/at-property-baseline/image/hero.jpg"/>

<SiteInfo
  name="<easing-function> - CSS: Cascading Style Sheets | MDN"
  desc="The <easing-function> CSS data type represents a mathematical function that describes the rate at which a value changes."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Fan Out with Grid and @property",
  "desc": "A “fan out” animation involves sequentially revealing items from a stack with bouncy effect. by using css grid, we save quite bit of fiddly positioning work.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-fan-out-with-grid-and-property.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
