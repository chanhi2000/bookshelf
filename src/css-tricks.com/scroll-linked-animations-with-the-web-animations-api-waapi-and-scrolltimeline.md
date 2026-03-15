---
lang: en-US
title: "Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline"
description: "Article(s) > Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline"
    - property: og:description
      content: "Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.html
prev: /programming/js/articles/README.md
date: 2021-11-04
isOriginal: false
author:
  - name: Bramus
    url: https://css-tricks.com/author/bramus/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/03/scroll-position.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline"
  desc="The Scroll-linked Animations specification is an upcoming and experimental addition that allows us to link animation-progress to scroll-progress: as you"
  url="https://css-tricks.com/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/03/scroll-position.png"/>

[<VPIcon icon="iconfont icon-w3c"/>The Scroll-linked Animations specification](https://drafts.csswg.org/scroll-animations-1/) is an upcoming and experimental addition that allows us to link animation-progress to scroll-progress: as you scroll up and down a scroll container, a linked animation also advances or rewinds accordingly.

We covered some use cases [**in a previous piece here on CSS-Tricks**](/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.md), all driven by the CSS `@scroll-timeline` at-rule and `animation-timeline` property the specification provides — yes, that’s correct: all those use cases were built using only HTML and CSS. No JavaScript.

Apart from the CSS interface we get with the Scroll-linked Animations specification, it also describes a JavaScript interface to implement scroll-linked animations. Let’s take a look at the `ScrollTimeline` class and how to use it with the Web Animations API.

---

## Web Animations API: A quick recap

The Web Animations API (WAAPI) [**has been covered here on CSS-Tricks before**](/css-tricks.com/css-animations-vs-web-animations-api.md). As a small recap, the API lets us construct animations and control their playback with JavaScript.

Take the following CSS animation, for example, where a bar sits at the top of the page, and:

1. animates from `red` to `darkred`, then
2. animates from zero width to full-width (by scaling the x-axis).

<CodePen
  link="https://codepen.io/bramus/pen/GREQjrW/836b16ccb95203c93563c9429f42ef49"
  title="CSS Animation"
  :default-tab="['css','result']"
  :theme="dark"/>

Translating the CSS animation to its WAAPI counterpart, the code becomes this:

```js
new Animation(
  new KeyframeEffect(
    document.querySelector('.progressbar'),
    {
      backgroundColor: ['red', 'darkred'],
      transform: ['scaleX(0)', 'scaleX(1)'],
    },
    {
      duration: 2500,
      fill: 'forwards',
      easing: 'linear',
    }
  )
).play();
```

<CodePen
  link="https://codepen.io/bramus/pen/abWYxQY/59b6e165fbda86388e5cc11903a66fe6"
  title="WAAPI Animation (Syntax 1)"
  :default-tab="['css','result']"
  :theme="dark"/>

Or alternatively, using a shorter syntax with [<VPIcon icon="fa-brands fa-firefox"/>`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate):

```js
document.querySelector('.progressbar').animate(
  {
    backgroundColor: ['red', 'darkred'],
    transform: ['scaleX(0)', 'scaleX(1)'],
  },
  {
    duration: 2500,
    fill: 'forwards',
    easing: 'linear',
   }
);
```

<CodePen
  user="https://codepen.io/bramus/pen/LYLQRVY/30c993597b29230c881a407cf154b042"
  title="WAAPI Animation (Syntax 2)"
  :default-tab="['css','result']"
  :theme="dark"/>

In those last two JavaScript examples, we can distinguish two things. First, a `keyframes` object that describes which properties to animate:

```js
{
  backgroundColor: ['red', 'darkred'],
  transform: ['scaleX(0)', 'scaleX(1)'],
}
```

Second is an `options` Object that configures the animation duration, easing, etc.:

```js
{
  duration: 2500,
  fill: 'forwards',
  easing: 'linear',
}
```

---

## Creating and attaching a scroll timeline

To have our animation be driven by scroll — instead of the monotonic tick of a clock — we can keep our existing WAAPI code, but need to extend it by attaching a `ScrollTimeline` instance to it.

This `ScrollTimeline` class allows us to describe an `AnimationTimeline` whose time values are determined not by wall-clock time, but by the scrolling progress in a scroll container. It can be configured with a few options:

- **`source`:** The scrollable element whose scrolling triggers the activation and drives the progress of the timeline. By default, this is `document.scrollingElement` (i.e. the scroll container that scrolls the entire document).
- **`orientation`:** Determines the direction of scrolling, which triggers the activation and drives the progress of the timeline. By default, this is `vertical` (or `block` as a logical value).
- **`scrollOffsets`:** These determine the effective scroll offsets, moving in the direction specified by the `orientation` value. They constitute equally-distanced in progress intervals in which the timeline is active.

These options get passed into the constructor. For example:

```js
const myScrollTimeline = new ScrollTimeline({
  source: document.scrollingElement,
  orientation: 'block',
  scrollOffsets: [
    new CSSUnitValue(0, 'percent'),
    new CSSUnitValue(100, 'percent'),
  ],
});
```

::: note

It’s not a coincidence that these options are exactly the same as [**the CSS `@scroll-timeline` descriptors**](/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.md#scroll-timeline). Both approaches let you achieve the same result with the only difference being the language you use to define them.

:::

To attach our newly-created `ScrollTimeline` instance to an animation, we pass it as the second argument into the `Animation` constructor:

```js{7}
new Animation(
  new KeyframeEffect(
    document.querySelector('#progress'),
    { transform: ['scaleX(0)', 'scaleX(1)'], },
    { duration: 1, fill: 'forwards' }
  ),
  myScrollTimeline
).play(); 
```

<CodePen
  user="anon"
  slug-hash="wvoqoxb"
  title="Scroll-Linked Animations: Progress Bar (WAAPI ScrollTimeline Version)"
  :default-tab="['css','result']"
  :theme="dark"/>

When using the `Element.animate()` syntax, set it as the `timeline` option in the `options` object:

```js{8}
document.querySelector("#progress").animate(
  {
    transform: ["scaleX(0)", "scaleX(1)"]
  },
  { 
    duration: 1, 
    fill: "forwards", 
    timeline: myScrollTimeline
  }
); 
```

<CodePen
  user="anon"
  slug-hash="xxrYgjm"
  title="Scroll-Linked Animations: Progress Bar (WAAPI Version, Alternative Syntax)"
  :default-tab="['css','result']"
  :theme="dark"/>

With this code in place, the animation is driven by our `ScrollTimeline` instance instead of [<VPIcon icon="fa-brands fa-firefox"/>the default `DocumentTimeline`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentTimeline).

::: note

The current experimental implementation in Chromium uses `scrollSource` instead of `source`. That’s the reason you see both `source` and `scrollSource` in the code examples.

:::

---

## A word on browser compatibility

At the time of writing, only Chromium browsers support the `ScrollTimeline` class, behind a feature flag. Thankfully there’s [the Scroll-Timeline Polyfill by Robert Flack (<VPIcon icon="iconfont icon-github"/>`flackr/scroll-timeline`)](https://github.com/flackr/scroll-timeline) that we can use to fill the unsupported gaps in all other browsers. In fact, all of the demos embedded in this article include it.

The polyfill is available as a module and registers itself if no support is detected. To include it, add the following `import` statement to your JavaScript code:

```js
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
```

The polyfill also registers the required [<VPIcon icon="fa-brands fa-firefox"/>CSS Typed Object Model](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Typed_OM_API) classes, should the browser not support it. *(👀 Looking at you, Safari.)*

---

## Advanced scroll timelines

Apart from absolute offsets, scroll-linked animations [**can also work with element-based offsets**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md#element-based-offsets):

> With this type of Scroll Offsets the animation is based on the location of an element within the scroll-container.
> 
> Typically this is used to animate an element as it comes into the scrollport until it has left the scrollport; e.g. while it is intersecting.

An element-based offset consists of three parts that describe it:

1. **`target`:** The tracked DOM element.
2. **`edge`:** This is what the `ScrollTimeline`’s `source` watches for the `target` to cross.
3. **`threshold`:** A number ranging from `0.0` to `1.0` that indicates how much of the `target` is visible in the scroll port at the `edge`. (You might know this from [**`IntersectionObserver`**](/css-tricks.com/an-explanation-of-how-the-intersection-observer-watches.md).)

Here’s a visualization:

<CodePen
  user="anon"
  slug-hash="OJbZbaX"
  title="Scroll-Linked Animations Visualization: Element-Based Offsets Visualizer"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

If you want to know more about element-based offsets, including how they work, and examples of commonly used offsets, check out [**this article**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md).

:::

Element-based offsets are also supported by the JS `ScrollTimeline` interface. To define one, use a regular object:

```js
{
  target: document.querySelector('#targetEl'),
  edge: 'end',
  threshold: 0.5,
}
```

Typically, you pass two of these objects into the `scrollOffsets` property.

```js{16-17}
const $image = document.querySelector('#myImage');

$image.animate(
  {
    opacity: [0, 1],
    clipPath: ['inset(45% 20% 45% 20%)', 'inset(0% 0% 0% 0%)'],
  },
  {
    duration: 1,
    fill: "both",
    timeline: new ScrollTimeline({
      scrollSource: document.scrollingElement,
      timeRange: 1,
      fill: "both",
      scrollOffsets: [
        { target: $image, edge: 'end', threshold: 0.5 },
        { target: $image, edge: 'end', threshold: 1 },
      ],
    }),
  }
); 
```

This code is used in the following demo below. It’s a JavaScript-remake of [**the effect I covered last time**](/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.md##image-reveal-hide): as an image scrolls into the viewport, it fades-in and becomes unmasked.

<CodePen
  user="anon"
  slug-hash="JjbLXwg"
  title="Scroll-Linked Animation: Image Reveal as it scrolls into view (JS WAAPI + ScrollTimeline Version)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More examples

Here are a few more examples I cooked up.

### Horizontal scroll section

This is based on [a demo by Cameron Knight (<VPIcon icon="fa-brands fa-codepen" />`cameronknight`)](https://codepen.io/cameronknight/pen/qBNvrRQ), which features a horizontal scroll section. It behaves similarly, but uses `ScrollTimeline` instead of GSAP’s `ScrollTrigger`.

<CodePen
  user="anon"
  slug-hash="jOVWpyr"
  title="Scroll-Linked Animations: Horizontal scroll section (WAAPI + ScrollTimeline 2021 version)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

For more on how this code works and to see a pure CSS version, please refer to [**this write-up**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md#demos--horizontal-scroll-section).

:::

### CoverFlow

Remember [<VPIcon icon="fa-brands fa-wikipedia-w"/>CoverFlow from iTunes](https://en.wikipedia.org/wiki/Cover_Flow)? Well, here’s a version built with `ScrollTimeline`:

<CodePen
  user="anon"
  slug-hash="PobZbBV"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

This demo does not behave 100% as expected in Chromium [due to a bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1174838). The problem is that the start and end positions are incorrectly calculated. You can find an explanation (with videos) in [this Twitter thread](https://twitter.com/bramus/status/1357610873133666305).

::: note

More information on this demo [**can be found in this article**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md#demos--coverflow).

:::

---

## CSS or JavaScript?

There’s no real difference using either CSS or JavaScript for the Scroll-linked Animations, except for the language used: both use the same concepts and constructs. In the true spirit of progressive enhancement, I would grab to CSS for these kind of effects.

However, as we covered earlier, support for the CSS-based implementation is fairly poor at the time of writing:

- Chromium supports it behind a feature flag.
- Firefox is preparing some work for it. ([<VPIcon icon="fa-brands fa-firefox"/>Mozilla Ticket #1676780](https://bugzilla.mozilla.org/show_bug.cgi?id=1676780))
- No word from Safari just yet. ([<VPIcon icon="fa-brands fa-safari"/>WebKit Ticket #222295](https://bugs.webkit.org/show_bug.cgi?id=222295))

Because of that poor support, you’ll certainly get further with JavaScript at this very moment. Just make sure your site can also be viewed and consumed when JavaScript is disabled. 😉

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scroll-Linked Animations With the Web Animations API (WAAPI) and ScrollTimeline",
  "desc": "The Scroll-linked Animations specification is an upcoming and experimental addition that allows us to link animation-progress to scroll-progress: as you",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
