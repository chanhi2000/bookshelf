---
lang: en-US
title: "Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators"
description: "Article(s) > Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators"
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
      content: "Article(s) > Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators"
    - property: og:description
      content: "Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators.html
prev: /programming/css/articles/README.md
date: 2024-05-10
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/2134
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators"
  desc="A scroll progress indicator is a pretty straightforward thing to build with a scroll()-style scroll-driven animation. But here, we'll build indicators for each section of a page using the view() style."
  url="https://blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/2134"/>

[<VPIcon icon="fa-brands fa-firefox"/>Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations) allow you to control animations based on the scroll progress of any particular element (often the whole document), or, a particular element’s visibility progress within the document. These are `view()` and `scroll()` animations, respectively. Both useful! It can be useful to apply the animation directly to the element itself, for instance, a `<section>` sliding into place as it enters the viewport. That kind of thing is cool and useful, but have you thought about extending the effects of these animations beyond the elements triggering them?

In CSS, the scroll-driven animations are effectuated using a couple of `animation-timeline` functions: `scroll()` and `view()`. You can learn more about them [<VPIcon icon="fa-brands fa-firefox"/>here](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline).

In this article, we’ll use a [<VPIcon icon="fa-brands fa-firefox"/>`view()`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view) animation, combined with a CSS custom property declared with [<VPIcon icon="fa-brands fa-firefox"/>`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) to create a “currently-viewing” and section-based progress indicator for each `section` of a page. This kind of thing can be useful, for example, for a long documentation page so a user can see where they are in it, and how far through their current section they are. Kind of like a reading-progress bar, but smarter, as it is aware of individual page sections.

Here’s a demo:

<CodePen
  user="anon"
  slug-hash="wvZbmXO"
  title="Extending CSS view()"
  :default-tab="['css','result']"
  :theme="dark"/>

The `view()` timeline will end up keeping track of each section’s position throughout scrolling, and `@property` helps pass down an animate-able result of each section’s scroll progress to its indicator element.

---

## The HTML Foundation

To get started, let’s begin by laying down the HTML elements. We’re going to need:

1. Page `<section>`s
2. Scroll progress indicator bars

Here are both:

```xml
<section id="one">
  Section number one
  <span>First</span>
</section>
<section id="two">
  Second section
  <span>Second</span>
</section>
<section id="three">
  Third section
  <span>Third</span>
</section>
<section id="four">
  Final section
  <span>Fourth</span>
</section>
```

The `<span>`s above are the indicator elements, soon to be moved to the top-right corner of the viewport where they will remain fixed as a user scrolls through the page.

---

## The CSS for the Sections and Indicators

```css :collapsed-lines
section {
  width: 400px;
  aspect-ratio: 1 / 2;
  /* ... */
}
span {
  position: fixed;
  height: 1lh;
  line-height: 40px;
  width: 100px;
  right: 60px;
  --t: 60px; /* top variable */
  --h: calc(1lh + 10px); /* for the gap between spans */
  section:nth-of-type(1) &{
    top: var(--t);
  }
  section:nth-of-type(2) &{
    top: calc(var(--t) + var(--h));
  }
  section:nth-of-type(3) &{
    top: calc(var(--t) + 2 * var(--h));
  }
  section:nth-of-type(4) &{
    top: calc(var(--t) + 3 * var(--h));
  }
  &::before { /* the blue bar */
    display: block;
    position: absolute;
    content: '';
    width: 4px;
    height: inherit;
    background: rgb(55,126,245);
    /* ... */
  }
}
```

The `span`s are given [<VPIcon icon="fa-brands fa-firefox"/>`position: fixed`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed), and a `right` value, to fix them to the side of the screen. The `top` value of each `span` is measured (using [<VPIcon icon="fa-brands fa-firefox"/>`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc)) based on their height and the gap in-between them. You may want to consider logical property alternatives to these values if it’s reasonable the page you’re working on could be translated.

A pseudo-element on the span is used as the actual progress indicator bar, a darker blue line that grows/shrinks on each indicator box.

Here’s a demo of that (with no animations yet, we’ll get there!)

<CodePen
  user="anon"
  slug-hash="zYXgpbE"
  title="Sections"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s proceed to the fun part — the animation!

---

## The Scroll-Driven Animation

We’ll show the scroll progress of each section by animating the `height` of each bar indicator as the user scrolls through it. Well, perhaps not the `height`, the CSS property itself, but the visual height. We’ll actually use [<VPIcon icon="fa-brands fa-firefox"/>`scaleY()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scaleY) on the bar, as that’s generally considered more performant to animate. This `scaleY()` function takes a `number` data type value, hence our need to declare that with `@property`. So, let’s register a custom property that takes a number value and set up a [<VPIcon icon="fa-brands fa-firefox"/>`@keyframes`](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) animation that actually does the work:

```css
@property --n {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@keyframes slide {
  from { --n: 0; }
  to { --n: 1; }
}
```

It’s important that the `inherits` attribute is `true` when declaring the custom property. This ensures the value is accessible by the `spans` even though the `animation-` properties are added to the `sections`. The span *inherits* the value, as it were.

```css
section {
  animation-timeline: view(block 98% 2%);
  animation-name: slide;
  animation-fill-mode: both;
  /* remaining code from the 1st css snippet goes here */
}
span {
  /* remaining code from the 1st css snippet goes here */
  &::before { /* the blue bar */
    /* remaining code from the 1st css snippet goes here */
    transform: scaleY(var(--n)); /* animation takes place here */
    transform-origin: top;
  }
}
```

I prefer the scroll progress be measured against a (conceptual) horizontal line that’s close to the bottom of the screen. Each time a section passes through this line, its animation timeline moves forward or backward based on the scrolling direction (up or down). The area I’d chosen for this is 2% from the bottom of the screen. Here’s the breakdown of the `view()` function’s values.

1. `block` — the area is defined across the block axis. The block axis is the vertical axis for left to right text direction
2. `98%` — the area being defined begins at 98% from the top of the screen (or 98% from the start of the block axis)
3. `2%` — the area ends at 2% from the bottom of the screen (or 2% from the end of the block axis)

Since I wanted the defined area to be a line, I didn’t leave any space between the beginning and end of the area. You can, however, broaden the area if you wish. For instance, `70% 20%` gives you a 10% long area on the screen for the scroll progress to be measured against. Or you can even move the area to the top of the screen. `0 100%` will assign the very top of the viewport as the marker to help track the scroll progress.

The progress timeline then moves along the keyframe animation that we named `slide`, updating the custom variable `--n` with a corresponding value between 0 and 1. We’re using 0 and 1 here because 0 means “scale this bar all the way down to 0% tall” and 1 means “scale this bar all the way up to 100% tall”.

The `transform-origin: top` sets up the scaling to take place from the top of the bar element, meaning the bar will look like it “grows” from top to bottom which mimics how scrolling happens.

Here’s the final outcome:

<CodePen
  user="anon"
  slug-hash="wvZbmXO"
  title="Extending CSS view()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## A Variation

If you prefer that there be no bar for the first section initially, at least until after you’ve scrolled down a bit, limit the first `section`‘s [<VPIcon icon="fa-brands fa-firefox"/>animation range](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-range) to a desirable potion. This might feel better to you (and/or users) because if they haven’t scrolled *at all* it might be weird to visually show a section as partially complete. Here’s that aleration:

```css
section:nth-of-type(1) {
  animation-range: contain 70%;
}
```

The animation won’t begin until the 70% mark of the first section crosses the area on the screen defined by `view()`. The effect is observed when the viewport is shorter than the first section. Adjust as needed.

<CodePen
  user="anon"
  slug-hash="LYvoojP"
  title="Extending CSS view() V2"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

That’s it! Hopefully the article gives you an idea on how we can cascade the scroll position value and animation progress beyond a directly-assigned element, allowing us to build more dynamic scroll-based designs with just CSS. Knowing that you can pass a custom property value down to other elements, you might think about how [<VPIcon icon="fa-brands fa-chrome"/>style queries](https://developer.chrome.com/docs/css-ui/style-queries) could play into that idea 🤔.

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/01/scroll-thumb.jpg?fit=1000%2C500&ssl=1&resize=350%2C200)](https://blog.master.dev/background-size-zooming-with-scroll-driven-animations/ "Background Size Zooming with Scroll Driven Animations")

#### [Background Size Zooming with Scroll Driven Animations](https://blog.master.dev/background-size-zooming-with-scroll-driven-animations/ "Background Size Zooming with Scroll Driven Animations")

I've seen all the excitement about scroll-driven animations. I'm excited too. Animations that use scroll position as a timeline rather than a time-based duration is just a clever idea. It's something that websites have been using probably-too-much JavaScript for for a long time and it's nice to see that kind…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/01/scroll-driven-toggle-thumb.jpg?fit=1000%2C500&ssl=1&resize=350%2C200)](https://blog.master.dev/a-scroll-driven-animation-with-a-duration/ "A Scroll-Driven Animation&#8230; with a Duration")

#### [A Scroll-Driven Animation… with a Duration](https://blog.master.dev/a-scroll-driven-animation-with-a-duration/ "A Scroll-Driven Animation&#8230; with a Duration")

Ryan Mulligan digs into a Jhey Tompkins Pen and discovers a neat little trick involving two @keyframe animations. The first is a "trigger" animation that triggers when a certain element comes into view, and flips a --trigger custom property. Via a Style Query, that triggers the actual animation. Why bother?…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/02/avatar-growing-thumb.jpg?fit=1000%2C500&ssl=1&resize=350%2C200)](https://blog.master.dev/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/ "A Practical Introduction to Scroll-Driven Animations with CSS scroll() and view()")

#### [A Practical Introduction to Scroll-Driven Animations with CSS scroll() and view()](https://blog.master.dev/a-practical-introduction-to-scroll-driven-animations-with-css-scroll-and-view/ "A Practical Introduction to Scroll-Driven Animations with CSS scroll() and view()")

If you were going to read one article to get you going with Scroll-Driven Animations from scratch, I think Adam Argyle has the one so far.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators",
  "desc": "A scroll progress indicator is a pretty straightforward thing to build with a scroll()-style scroll-driven animation. But here, we'll build indicators for each section of a page using the view() style.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

