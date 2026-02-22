---
lang: en-US
title: "Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines"
description: "Article(s) > Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines"
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
      content: "Article(s) > Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines"
    - property: og:description
      content: "Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.html
prev: /programming/css/articles/README.md
date: 2021-07-19
isOriginal: false
author:
  - name: Bramus
    url: https://css-tricks.com/author/bramus/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/css-scroll-timeline-parallax.gif
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
  name="Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines"
  desc="The Scroll-Linked Animations specification is an upcoming and experimental addition to CSS. Thanks to the @scroll-timeline at-rule and animation-timeline"
  url="https://css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/css-scroll-timeline-parallax.gif"/>

[<VPIcon icon="iconfont icon-w3c"/>The Scroll-Linked Animations specification](https://drafts.csswg.org/scroll-animations-1/) is an upcoming and experimental addition to CSS. Thanks to the `@scroll-timeline` at-rule and `animation-timeline` property this specification provides, you can control the time position of regular CSS Animations by scrolling.

In this post, we’ll take a look at some practical use cases where scroll-linked animations come in handy, and how they can enrich your visitor’s browsing experience.

::: note 👨‍🔬

The CSS features described in this post are still experimental and not finalized at all. They are not supported by any browser at the time of writing, except for Chromium ≥ 89 with the “Experimental Web Platform Features” flag enabled.

:::

---

## CSS Scroll-Linked Animations, a quick primer

With the features described in the Scroll-Linked Animations specification you can drive a CSS animation by scroll: as you scroll down or up a scroll container, the linked CSS animation will advance or rewind accordingly. These scroll-linked animations can add a very nice touch to your pages.

While several JavaScript libraries to implement these Scroll-Linked Animations already do exist, the Scroll-Linked Animations specification distinguishes itself from them by:

1. providing both a JS and CSS interface to implement these effects
2. keeping things performant, as the animations will run on the compositor _(e.g. [**“off main thread”**](/css-tricks.com/off-the-main-thread.md))_
While the Scroll-Linked Animations specification also describes a JavaScript interface that integrates nicely with [**the Web Animations API**](/css-tricks.com/css-animations-vs-web-animations-api.md), **the focus of this post will be on its CSS counterpart only**.

To implement a basic scroll-linked animation in CSS you need three key parts:

1. a CSS animation
2. a scroll timeline
3. a link between both

### CSS animation

This is a regular CSS Animation like we already know:

```css
@keyframes adjust-progressbar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
```

As you normally do, attach it to an element using [**the `animation` property**](/css-tricks.com/almanac-properties/animation.md):

```css
#progressbar {
  animation: 1s linear forwards adjust-progressbar;
}
```

### Scroll timeline

The scroll timeline allows us to map the scroll distance to the animation progress. In CSS, we describe this with the CSS `@scroll-timeline` at-rule.

```css
@scroll-timeline scroll-in-document-timeline {
  source: auto;
  orientation: vertical;
  scroll-offsets: 0%, 100%;
}
```

Besides giving the scroll timeline a name, it can be configured using several descriptors:

1. The `source` describes the scrollable element whose scrolling triggers the activation and drives the progress of the timeline. By default, this is the entire document (value: `auto`)
2. The `orientation` determines the scrolling direction that should trigger the animation. By default, this is `vertical`.
3. The `scroll-offsets` property is an array of key points that describe the range in which the animation should be active. Those offsets can be relative/absolute values (e.g. percentages and lengths) or element-based offsets.

A previous version of the specification required you to also set a `time-range` descriptor. This descriptor has been removed and will automatically take over the `animation-duration` from the linked animation. You may still see traces of this descriptor in the demos, but you can safely ignore it.

### A link between both

To associate our `@scroll-timeline` with our CSS animation, we use the new `animation-timeline` CSS property, and have it refer to the timeline’s name.

```css
#progressbar {
  animation: 1s linear forwards adjust-progressbar;
  animation-timeline: scroll-in-document-timeline;
}
```

With that set up the `adjust-progressbar` animation won’t run by itself on page load, but will only advance as we scroll down the page.

<CodePen
  user="anon"
  slug-hash="WNGLpyV"
  title="Scroll-Linked Animations: Progress Bar (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

For a more in-depth introduction to `@scroll-timeline` please refer to [**Part 1**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) and [**Part 2**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md) of my series on Scroll-Linked Animations.

The [**first post**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) looks at each descriptor in more detail, explaining them with an example to go along with them, before covering many more interesting demos.

The [**second post**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md) digs even deeper, looking into Element-Based Offsets, which allow us to drive an animation as an element appears into and disappears from the scrollport as we scroll.

<VidStack src="https://css-tricks.com/wp-content/uploads/2021/07/css-scroll-timeline-coverflow.mp4" />
<!-- An example of what you can achieve with CSS Scroll-Linked Animations using Element-Based Offsets. -->

:::

---

## Practical use cases

Apart from the progress bar demo above, there are a few more use cases or scenarios for these Scroll-Linked Animations.

1. parallax header
2. image reveal/hide
3. typing animation
4. carousel indicators
5. scrollspy

### Parallax header

The most classic use case for Scroll-Linked Animations is a parallax effect, where several sections of a page seem to have a different scrolling speed. There’s a way to create these type of effects using only CSS, but that requires [**mind-bending `transform` hacks involving `translate-z()` and `scale()`**](/css-tricks.com/an-overview-of-scroll-technologies.md##css-parallax).

Inspired upon [the Firewatch Header (<VPIcon icon="fa-brands fa-codepen" />`samdbeckham`)](https://codepen.io/samdbeckham/pen/OPXPNp)—which uses the mentioned `transform` hack—I created this version that uses a CSS scroll timeline:

<CodePen
  user="anon"
  slug-hash="WNoPXKW"
  title="Firewatch Parallax in CSS (Scroll-Linked Animations / @scroll-timeline)"
  :default-tab="['css','result']"
  :theme="dark"/>

Compared to the original demo:

- The markup was kept, except for that extra `.parallax__cover` that’s no longer needed.
- The `<body>` was given a `min-height` to create some scroll-estate.
- The positioning of the `.parallax` element and its `.parallax_layer` child elements was tweaked.
- The `transform`/`perspective`-hack was replaced with a scroll timeline.

Each different layer uses the same scroll timeline: scroll over a distance of `100vh`.

```css
@scroll-timeline scroll-for-100vh {
  scroll-offsets: 0, 100vh;
}

.parallax__layer {
  animation: 1s parallax linear;
  animation-timeline: scroll-for-100vh;
}
```

What’s different between layers is the distance that they move as we scroll down:

- The layer at the back should stay in place, eg. move for `0vh`.
- The foremost layer should should move the fastest, e.g. `100vh`.
- All layers in between are interpolated.

```css :collapsed-lines
@keyframes parallax {
  to {
    transform: translateY(var(--offset));
  }
}

.parallax__layer__0 {
  --offset: 100vh;
}

.parallax__layer__1 {
  --offset: 83vh;
}

.parallax__layer__2 {
  --offset: 67vh;
}

.parallax__layer__3 {
  --offset: 50vh;
}

.parallax__layer__4 {
  --offset: 34vh;
}

.parallax__layer__5 {
  --offset: 17vh;
}

.parallax__layer__6 {
  --offset: 0vh;
}
```

As the foremost layers move over a greater distance, they appear to move faster than the lower layers, achieving the parallax effect.

### Image reveal/hide

Another great use-case for scroll-linked animations is an image reveal: as an image slides into view, it will reveal itself.

<CodePen
  user="anon"
  slug-hash="vYXQGXo"
  title="Scroll-Linked Animation: Image Reveal as it scrolls into view (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

By default, the image is given an opacity of 0 and is masked using a [**`clip-path`**](/css-tricks.com/clipping-masking-css.md##the-new-clip-path):

```css
#revealing-image {
  opacity: 0;
  clip-path: inset(45% 20% 45% 20%);
}
```

In the end-state we want the image to be fully visible, so we sent the end-frame of our animation to reflect that:

```css
@keyframes reveal {
  to {
    clip-path: inset(0% 0% 0% 0%);
    opacity: 1;
  }
}
```

By using [**element-based offsets**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md#element-based-offsets) as the offsets for our scroll timeline, we can have our reveal animation only start when the image itself slides into view.

```css
@scroll-timeline revealing-image-timeline {
  scroll-offsets:
    selector(#revealing-image) end 0.5,
    selector(#revealing-image) end 1
  ;
}

#revealing-image {
  animation: reveal 1s linear forwards;
  animation-timeline: revealing-image-timeline;
}
```

::: note 😵

Can’t follow with those element-based offsets? [This visualization/tool (<VPIcon icon="fa-brands fa-codepen" />`bramus`)](https://codepen.io/bramus/pen/vYypmON) has got you covered.

:::

### Typing animation

As CSS scroll timelines can be linked to any existing CSS animation, you can take any CSS Animation demo and transform it. Take this typing animation for example:

<CodePen
  user="anon"
  slug-hash="GRoOxbM"
  title="CSS Typing Effect"
  :default-tab="['css','result']"
  :theme="dark"/>

With the addition of a scroll timeline and the `animation-timeline` property, it can be adjusted to “type on scroll”:

<CodePen
  user="anon"
  slug-hash="zYKyevz"
  title="CSS Typing Effect + @scroll-timeline"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Note that to create some scroll-estate the `<body>`was also given a height of `300vh`.

:::

Using a different animation, the code above can easily be adjusted to create a zoom on scroll effect:

<CodePen
  user="anon"
  slug-hash="abpQENb"
  title="CSS Zoom Effect + @scroll-timeline"
  :default-tab="['css','result']"
  :theme="dark"/>

I can see these two working great for article intros.

### Carousel/Slider indicators

One of the components of a carousel (aka slider) is an indicator that exposes how many slides it contains, as well as which slide is currently active. This is typically done using bullets.

This again is something we will be able to achieve using a CSS scroll timeline, as shown in this demo created by Fabrizio Calderan:

<CodePen
  user="anon"
  slug-hash="KKmKpaZ"
  title="A CSS slider with scroll snapping, scroll-timeline and navigation"
  :default-tab="['css','result']"
  :theme="dark"/>

The active state bullet is injected via `.slider nav::before` and has an animation set that moves it over the other bullets

```css :collapsed-lines
/* Styling of the dots */
.slider nav::before, .slider a {
  inline-size: 1rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #9bc;
}

/* Positioning of the active dot */
.slider nav::before {
  content: "";
  position: absolute;
  z-index: 1;
  display: block;
  cursor: not-allowed;
  transform: translateX(0);
  animation: dot 1s steps(1, end) 0s forwards;
}

/* Position over time of the active dot */
@keyframes dot {
  0% 
    { transform: translateX(0); }
  33% 
    { transform: translateX(calc((100% + var(--gap)) * 1)); }
  66% 
    { transform: translateX(calc((100% + var(--gap)) * 2)); } 
  100% 
    { transform: translateX(calc((100% + var(--gap)) * 3)); }
}
```

By attaching a `@scroll-timeline` onto the slider, the dot that indicates the active state can move as you scroll:

```css
@scroll-timeline slide {
  source: selector(#s);
  orientation: inline; 
}

.slider nav::before {
  /* etc. */
  animation-timeline: slide;
}
```

The dot only moves after the slide has snapped to its position thanks to the inclusion of [**a `steps()` function in the animation**](/css-tricks.com/using-multi-step-animations-transitions.md). When removing it, it becomes more clear how the dot moves as you scroll

<CodePen
  user="anon"
  slug-hash="mdmyqgX"
  title="A CSS slider with scroll snapping, scroll-timeline and navigation"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

This feels like the final missing piece to [**Christian Shaefer’s CSS-only carousel**](/css-tricks.com/css-only-carousel.md).

:::

### ScrollSpy

Back in early 2020, I created a [**sticky table of contents with scrolling active states**](/css-tricks.com/sticky-table-of-contents-with-scrolling-active-states.md). The final part to creating the demo was to use `IntersectionObserver` to set the active states in the table of contents (ToC) as you scroll up/down the document.

<CodePen
  user="anon"
  slug-hash="LYbBoRj"
  title="Pure CSS Smooth Scrolling Sticky ScrollSpy Navigation (CSS @scroll-timeline Version)"
  :default-tab="['css','result']"
  :theme="dark"/>

Unlike the carousel indicators demo from above we can’t simply get there by moving a single dot around, as it’s the texts in the ToC that get adjusted. To approach this situation, we need to attach two animations onto each element in the ToC:

1. The first animation is to visually activate the ToC item when the proper section comes into view at the bottom edge of the document.
2. The second animation is to visually deactivate the ToC item when the proper section slides out of view at the top edge of the document.

```css
.section-nav li > a {
  animation:
    1s activate-on-enter linear forwards,
    1s deactivate-on-leave linear forwards;
}
```

As we have two animations, we also need to create two scroll timelines, and this for each section of the content. Take the `#introduction` section for example:

```css
@scroll-timeline section-introduction-enter {
  scroll-offsets:
    selector(#introduction) end 0,
    selector(#introduction) end 1;
}

@scroll-timeline section-introduction-leave {
  scroll-offsets:
    selector(#introduction) start 1,
    selector(#introduction) start 0;
}
```

Once both of these timelines are linked to both animations, everything will work as expected:

```css
.section-nav li > a[href"#introduction"] {
  animation-timeline:
    section-introduction-enter,
    section-introduction-leave;
}
```

---

## In closing

I hope I have convinced you of the potential offered by the Scroll-linked Animations specification.

Unfortunately, it’s only supported in Chromium-based browsers right now, hidden behind a flag. Given this potential, I personally hope that—once the specification settles onto a final syntax—other browser vendors will follow suit.

::: info

If you too would like to see Scroll-Linked Animations land in other browsers, you can actively star/follow the relevant browser issues.

- [<VPIcon icon="fa-brands fa-chrome"/>Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1023424)
- [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1676780)
- [<VPIcon icon="fa-brands fa-safari"/>Safari](https://bugs.webkit.org/show_bug.cgi?id=222295)

By actively starring issues, us developers can signal our interest into these features to browser vendors.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Practical Use Cases for Scroll-Linked Animations in CSS with Scroll Timelines",
  "desc": "The Scroll-Linked Animations specification is an upcoming and experimental addition to CSS. Thanks to the @scroll-timeline at-rule and animation-timeline",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
