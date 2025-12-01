---
lang: en-US
title: "Creating Scroll-Based Animations in Full view()"
description: "Article(s) > Creating Scroll-Based Animations in Full view()"
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
      content: "Article(s) > Creating Scroll-Based Animations in Full view()"
    - property: og:description
      content: "Creating Scroll-Based Animations in Full view()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/creating-scroll-based-animations-in-full-view.html
prev: /programming/css/articles/README.md
date: 2025-12-10
isOriginal: false
author:
  - name: Preethi
    url : https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/scroll-animations-range-not-set.png
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
  name="Creating Scroll-Based Animations in Full view()"
  desc="It’s not that hard to do! Preethi shows you how it's really the same old animation you’re used to writing in CSS, only applied on a view timeline instead of a normal timeline."
  url="https://css-tricks.com/creating-scroll-based-animations-in-full-view"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/scroll-animations-range-not-set.png"/>

The CSS [<VPIcon icon="iconfont icon-css-tricks"/>`animation-timeline`](https://css-tricks.com/almanac/properties/a/animation-timeline/) property accepts a `view()` function which, in turn, returns a timeline of how much of an element is visible in the part of a scroll container that’s viewable (formally known as a *scrollport*). In other words, rather than letting an animation run a linear progression based on how much time has elapsed, `view()` runs animations based on the visibility of the animated element within a scrollport.

I like to equate it as the CSS version of JavaScript’s [**Intersection Observer**](/css-tricks.com/an-explanation-of-how-the-intersection-observer-watches.md). We can run an animation on an element as that element enters and exits the scrollport.

Here’s an example:

<CodePen
  user="anon"
  slug-hash="emZmBwQ"
  title="CSS view() for Carousel"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/scroll-animation-carousel.mov" />

Pretty neat, right? Depending on *where* an image is in the scrollable carousel, it goes from small and blurry at the far sides while getting larger and clearer when it hits the center. We have a little [**scroll snapping**](/css-tricks.com/practical-css-scroll-snapping.md) in there as well to make sure each image item makes a stop.

It’s not that hard to do! I’ll show you how it’s really the same old animation you’re used to writing in CSS, only applied on a view timeline instead of a normal timeline.

---

## But first, the general layout

All I’m making here is an element I’m calling `.carousel`:

```html
<main class="carousel">
  <!-- scroll items -->
</main>
```

The elements in `.carousel` will lay out in a single row, which is a one-liner with flexbox. We’ll also make sure that any content overflowing its space is scrollable:

```css
.carousel {
  display: flex;
  width: max(480px, 50vw);
  overflow-x: auto;
}
```

And, of course, we need items in it that we can scroll around. A set of image slides.

```html
<main class="carousel">
  <div class="carousel-slide">
    <!-- (optional) empty bookend slide -->
  </div>
  <div class="carousel-slide">
      <img src="image-1.jpeg" alt="alt text for image 1">
  </div>
  <div class="carousel-slide">
      <img src="image-2.jpeg" alt="alt text for image 2">
  </div>
  <!-- etc -->
  <div class="carousel-slide">
    <!-- (optional) empty bookend slide -->
  </div>
</main>
```

As far as styling those items, each one will be one-third the size of the available space so that we see three items at a time when scrolling:

```css
.carousel {
  /* same as before */

  .carousel-slide {
    flex-shrink: 0;
    width: calc(100% / 3); /* show three at a time */
    aspect-ratio: .8;
    img {
      width: 100%;
    }
  }
}
```

---

## Then the scrolling

We’ve already set `overflow-x` on the `.carousel`, officially making it our scroll container. We can drop in a little scroll snapping to make sure we’re only scrolling one item at a time.

```css
.carousel {
  /* same as before */

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth; /* optional for smooth scrolling */
  scrollbar-width: none; /* optional to hide the scrollbar */
}
```

We want to make sure that the slides are aligned to the center of the scroll container when snapping into place:

```css
.carousel-slide {
  /* etc. */
  scroll-snap-align: center;
}
```

Here’s what we have so far:

<CodePen
  user="anon"
  slug-hash="yyOXZPa"
  title="CSS view() for Carousel, step 1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Next, the animation

Here’s the really cool thing I mentioned at the very start: a view timeline animation is really the same thing as any other CSS animation you write with keyframes. In this case, we want keyframes where the carousel items are small and blurry at the start and end, but become larger and clearer right smack dab in the middle of the animation.

```css
@keyframes slide {
  /* from start to 45%, and to the end (100%) */
  45%, 100% {
    transform: scale(0.5);
    border-radius: 20px;
    filter: blur(6px) brightness(.8);
  }
  /* middle */
  50% {
    transform: scale(1);
    border-radius: 4px;
    filter: none;
  }
}
```

Looks familiar, right? This is the sort of CSS you’ve been writing forever! And guess what? We set the animation on the element we’re animating just as you normally would as well:

```css
.carousel-slide {
  /* etc. */
  animation: slide; 
}
```

The only difference is that we want the animation to run on a timeline based on the element’s current `view()` instead of the regular timeline. That’s where the `animation-timeline` property comes into play:

```css
.carousel-slide {
  /* etc. */
  animation: slide; 
  animation-timeline: view(inline);
}
```

Now, *technically* speaking, we could slap that timeline directly in the `animation` shorthand property like any other constituent animation property, e.g., `animation-name`, `animation-delay`, `animation-duration`, etc. But assigning a timeline function this way is not supported by any browsers yet. So, for now, your best bet is to declare it on its own. Just be sure to declare it *after* the `animation` shorthand, or else you may find yourself inadvertently overriding your view timeline with `auto` (the default property value) instead of `view()`.

That completes our demo:

<CodePen
  user="anon"
  slug-hash="emZmBwQ"
  title="CSS view() for Carousel"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="http://css-tricks.com/wp-content/uploads/2025/11/scroll-animation-carousel.mov" />

See that? All we’ve really done is set a CSS animation that runs on elements. However, instead of running on the default timeline, the animation runs when an element scrolls in and out of view. That’s the difference between standard and view timelines.

---

## `view()` vs. `scroll()`

*But wait!* You may or may not know that `view()` timelines are part of a larger feature set called [**CSS Scroll-Driven Animations**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.md). And `view()` is not the only function supported by the `animation-timeline` property. We also have the `scroll()` function.

The `scroll()` function creates a *scroll progress timeline* that’s tied to the scroll position of a container, whereas `view()` creates a *view progress timeline* that’s based on the visibility of an element within its container.

Both functions are useful in their own ways! I generally think `view()` is better for item-specific reveal effects. So, for example, if we want to animate a slide *only as that specific slide scrolls into the scrollport*, then the `view()` function is the perfect fit. That’s why I’ve focused on it for our carousel example — we want to track an element’s position in the scrollport and run the animation accordingly.

---

## Inset parameter and `animation-range`

You might also be wondering what the heck goes in the parentheses of the `view()` function. It’s a function, after all, so it must accept something in there, right?

CSS `view()` takes two arguments: **axis** (`block`, `inline`, `x`, and `y`) and the **inset**. The inset parameter defines an offset from the scrollport’s edges within which the animated element is tracked. The official syntax looks like this:

```css
animation-timeline: view(<axis> <view-timeline-inset>);
```

…which is merely a fancy way of getting specific with exactly what areas of the scrollport we want to trigger the animation. For some animations, starting and ending the timeline when element fully enters and exits the scrollport may cut things off.

<CodePen
  user="anon"
  slug-hash="OPNjXem"
  title="Scroll List Animations : No Range Defined"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

![Two columns of list items. The width of the first item is 100% and each subsequent item in the list gets progressively shorter, creating an effect like a reversed staircase.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/scroll-animations-range-not-set-1024x459.png?resize=1024%2C459&ssl=1)

That’s no good! We want each item to fully slide in when it fully enters the scrollport, not when it fully exits. That’s why all the items look so staggered — they’re all at different points in the view timeline.

That’s where the inset parameter makes a big difference. We can be more specific about saying we want each element to start animation when it comes up from the bottom of the scrollport.

```css
animation: slide-in linear both;
animation-timeline: view(100% 0%);
```

Ah, much much better:

<CodePen
  user="anon"
  slug-hash="MYyvjWP"
  title="Scroll List Animations: Inset Parameter"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/scroll-animations-view-slide-in.mov" />

The [**`animation-range`**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.mdtimeline-ranges-demystified) property works along similar lines.

```css
animation-range: entry; /* same as: entry 0 entry 100%; */
```

<CodePen
  user="anon"
  slug-hash="GgZvjwQ"
  title="Scroll List Animations: Animation Range"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The `animation-range` property accepts a slew of other keywords, including `exit` (when the element leaves the scrollport), `cover` (when the element begins to enter begins to leave the scrollport), and `contain` (when the element fully enters then fully leaves the scrollport), among others. [**Geoff has published a bunch of notes and examples**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.md#timeline-ranges-demystified) looking specifically at each one.

---

## One last carousel example

Generally, carousels use effects like fade in-and-out, scaling, and parallax. However, since most CSS properties are animate-able, and even those who aren’t can be tricked into being so using registered CSS properties (like in the case of gradient lines), you have the option to explore more creative ways of using `view()` for carousels.

Here’s an example where an animation of just the background position creates a nice movement in a carousel.

<CodePen
  user="anon"
  slug-hash="preview/JoXbNbg"
  title="CSS view() for carousel"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/scroll-animation-carousel-parallax.mov" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Scroll-Based Animations in Full view()",
  "desc": "It’s not that hard to do! Preethi shows you how it's really the same old animation you’re used to writing in CSS, only applied on a view timeline instead of a normal timeline.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/creating-scroll-based-animations-in-full-view.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
