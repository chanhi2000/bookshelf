---
lang: en-US
title: "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)"
description: "Article(s) > The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)"
    - property: og:description
      content: "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-scroll-linked-animations-part-1.html
prev: /programming/css/articles/README.md
date: 2021-02-23
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-parallax-cover-to-sticky-header-short-10fps.gif
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
  name="The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)"
  desc="The “Scroll-linked Animations Specification” is an upcoming addition to CSS that defines a way for creating animations that are linked to a scroll offset of a scroll container. Let's take a look at how it works and what results we can achieve with it."
  url="https://bram.us/2021/02/23/the-future-of-css-scroll-linked-animations-part-1/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-parallax-cover-to-sticky-header-short-10fps.gif"/>

::: critical 🚨 UPDATE

The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes.**

Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please refer to [<VPIcon icon="fa-brands fa-chrome"/>developer.chrome.com/articles/scroll-driven-animations/](https://developer.chrome.com/articles/scroll-driven-animations/) for an article with examples that use the updated syntax.

:::

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-parallax-cover-to-sticky-header.mp4" />

The [<VPIcon icon="fas fa-globe"/>Scroll-linked Animations Specification](https://drafts.csswg.org/scroll-animations-1/) is an upcoming addition to CSS that defines a way for creating animations that are linked to a scroll offset of a scroll container. Even though the specification is still in draft, and in no way finalized nor official, it already has experimental support in Chromium.

The past few weeks I’ve been playing with the CSS `@scroll-timeline` at-rule and the `animation-timeline` CSS property this specification provides. By combining these two features with regular CSS Animations we can create Scroll-Linked Animations using only CSS — not a single line of JavaScript in sight!

In this first part of this series we’ll take a look at Scroll-Linked Animations between two absolute scroll-offsets, and how we can tweak them. In the second part of this series ([**published here**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md)) we’ll cover how to create Scroll-Linked Animations based on the location of an element within the scroller.

::: info

💥 To keep your primary Chrome install clean, I recommend you do not set this in Chrome Stable, but resort to Beta / Canary builds.

👀 If you don’t understand how to do this, or don’t feel safe doing this, fear not: This post also includes recordings and/or fallback versions using JavaScript for most of the demos.

💄 While the [<VPIcon icon="fas fa-globe"/>Scroll-Linked Animations Specification](https://drafts.csswg.org/scroll-animations-1/) also describes a JavaScript interface, the main focus of this post will be its CSS counterpart. The JS alternatives won’t be covered in detail.

:::

### Primer: Scroll-Linked Animations vs. Scroll-Triggered Animations

Before we jump into the CSS code, there’s this difference that we need to make between Scroll-Linked Animations and Scroll-Triggered Animations

**Scroll-Linked Animations are animations are linked to the scroll offset of a scroll container.** As you scroll back and forth the scroll container, you will see the animation timeline advance or rewind as you do so. If you stop scrolling, the animation will also stop.

Think of a progress bar shown on top of a page, where there is a direct link between the scroll progress and size of the progress bar. Hit the ⏮ and ⏭ buttons in the visualization below to see how it behaves.

<CodePen
  user="bramus"
  slug-hash="wvodbeV"
  title="Scroll-Linked Animations Visualization: Progressbar"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

**Scroll-Triggered Animations are animations that are triggered when scrolling past a certain position.** Once triggered, these animations start and finish on their own, independent of whether you keep scrolling or not.

Think of those typical “content flies in as it enters the viewport” animations. Hit the ⏮ and ⏭ buttons in the visualization below to see how it behaves.

<CodePen
  user="bramus"
  slug-hash="WNojqop"
  title="Scroll-Triggered Animations Visualization: Fly-In Content"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Your first Scroll-Linked Animation *(Progress Bar Demo)*

Instead of getting technical straight away, let’s take a look at a Progress Bar that is implemented using Scroll-Linked Animations, and dissect it from there.

::: tabs

@tab:active CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="WNGLpyV"
  title="Scroll-Linked Animations: Progress Bar (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

@tab JS WAAPI + `ScrollTimeline` Version

<CodePen
  user="bramus"
  slug-hash="wvoqoxb"
  title="Scroll-Linked Animations: Progress Bar (WAAPI version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

What you see there — if your browser supports it — is a scrollbar that progresses from 0 to 100% as you scroll down the page. **All this is done using only CSS, and running in a non-blocking way on the compositor thread (e.g. “off main thread”)!** 🤩

Apart from positioning and what not, the code that drives this demo is this little piece of CSS:

```css
/* (1) Define Keyframes */
@keyframes adjust-progressbar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* (2) Define a ScrollTimeline */
@scroll-timeline progressbar-timeline {
}

/* (3) Attach the Animation + set the ScrollTimeline as the driver for the Animation */
#progressbar {
  animation: 1s linear forwards adjust-progressbar;
  animation-timeline: progressbar-timeline; /* 👈 THIS! */
}
```

We recognise 3 key components that we need to make it all work:

1. [An Animation](#an-animation)
2. [A Scroll Timeline](#the-scroll-timeline)
3. [A way to link both](#linking-up-both)

#### The Animation

This is a **a regular CSS Animation**. In case of our progress bar it’s an animation that goes from zero width to full width.

```css
@keyframes adjust-progressbar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

#progressbar {
  width: 100vw;
  transform: scaleX(0);
  transform-origin: 0 50%;
  animation: 1s linear forwards adjust-progressbar;
}
```

There’s a few things to note about this animation:

- To optimize this animation for the browser we don’t animate the `width` property, but fixate the `width` to `100vw` and animate `transform: scaleX(…);` instead. To make that work properly we have to set the `transform-origin` to the left edge of the element.
- To prevent a FOUC we apply the start `scaleX(0);` transform directly onto the `#progressbar` element.
- To make sure this animation remains in its end state when it has finished, we set `animation-fill-mode` to `forwards`.
- The values for `animation-duration` (`1s`) and `animation-timing-function` (`linear`) look like they are chosen arbitrarily here, but they’re not. We’ll dig into these further down.

Now, if you implement this piece of CSS as-is, you’ll see this animation run all by itself. This is because we have not created nor linked a Scroll Timeline yet, which follow next.

#### The Scroll Timeline

As we scroll through the document from top to bottom we want our animation to also go from start *(no visible progress bar)* to finish *(full-width progress bar)*. For this we need a **Scroll Timeline**. It is a type of timeline that can map scroll-progression of a scroll container to animation-progress of linked animation.

To define a ScrollTimeline in CSS, we can use the new `@scroll-timeline` at-rule, give it name, and configure it using *descriptors*:

1. `source`
2. `orientation`
3. `scroll-offsets`

For our Progress Bar our Scroll Timeline looks like this:

```css
@scroll-timeline progress-timeline {
}
```

The created Scroll Timeline here has been given the name of `progress-timeline`, but it hasn’t been tweaked/configured. That’s not necessary either, as it will fall back to default values for `source`, `orientation`, and `scroll-offsets`.

By default a Scroll Timeline behaves as follows: as you scroll the document from top to bottom *(e.g. from `0%` to `100%` Scroll Progress)*, the linked animation will also advance from `0%` to `100%` Animation Progress … which is exactly what we need for a progress bar 🙂

As our `animation-duration` is set to `1s` in step 1, our scroll-distance-to-animation-progress mapping will automatically look like this:

- `0%` Scroll Progress equals `0s` Animation Progress.
- `100%` Scroll Progress equals `1s` Animation Progress.

*(All values in between are interpolated, so `50%` Scroll Progress will equal `0.5s` Animation Progress)*

::: note Update 2021.06.25

An earlier version of the Scroll-Linked Animations specification required you to define a `time-range` here. This descriptor has been scrapped, and the contents of this post have been updated to reflect that. You can still find traces of it in the demos though, but you can simply ignore it.

:::

::: details 🤔 If you’re curious about `time-range`, you can click open this box to know what it did and how it worked …

The `time-range` descriptor is of the CSS `<time>` Data Type. It does not represent the time of a clock, but it is a number that maps Scroll Progress (or Scroll Distance) to Animation Progress. It gives an answer to the question *“How much animation time should pass when we scroll from start to finish in the scroll container?”*

As we have defined our `animation-duration` to be `1s` from start to finish, **we want our `time-range` to reflect that same duration**, namely `1s`: Scrolling from top to bottom *(e.g. from `0%` to `100%`)* should advance the animation by `1s`.

You can play with several combinations in this visualzation/tool:

<CodePen
  user="bramus"
  slug-hash="jOyaYPp"
  title="Scroll-Linked Animations: time-range helper"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

::: tip 🔥

Always set `time-range` to the exact same time as the `animation-duration`, unless you have a very good reason not to.

:::

#### Linking up both

To associate our `@scroll-timeline` with our CSS Animation we use the new `animation-timeline` CSS property, and have it refer to the timeline’s name.

```css
#progressbar {
  animation: 1s linear forwards adjust-progressbar;
  animation-timeline: progressbar-timeline; /* 👈 THIS! */
}
```

This is the part where our `animation-timing` value of `linear` comes into play: it enforces a 1-on-1 mapping between Scroll Progress and Animation Progress. If we were to set our timing to something like `ease-in` instead, we’d see our progress bar be too slow at the beginning and speed up towards the end as we scroll. This feels really weird to be honest.

::: tip 🔥

Always set `animation-timing-function` to `linear` when working with `@scroll-timeline`.

:::

### Tweaking the Offsets *(Parallax Cover Demo)*

By default a `@scroll-timeline` will be linked to scrolling vertically from top to bottom across the document. But what if we our animation to start/stop when having scrolled for a specific *(~ fixed)* distance? This is where the `scroll-offsets` descriptor comes into play.

::: note Update

😵 As reader Patrick H Lauke [points out](https://twitter.com/patrick_h_lauke/status/1364171258305409027) you might want to go easy with the type of animation shown below in case visitors request so, by respecting the setting of [`prefers-reduced-motion`](https://css-tricks.com/introduction-reduced-motion-media-query/).

:::

::: tabs

@tab:active CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="oNzQbZE"
  title="Scroll-Linked Animations: Parallax Cover (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

@tab JS WAAPI + `ScrollTimeline` Version

<CodePen
  user="bramus"
  slug-hash="ExNwzJg"
  title="Scroll-Linked Animations: Parallax Cover (JS WAAPI + ScrollTimeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

In this example we have a full-page (`100vh`) parallax cover. For it to work correctly we want our animation to begin at the start of the document and to be finished after scrolling `100vh` into the document (instead of the default “`100%` of the document”).

To make this happen we set our Scroll Offsets to `0` *(start)* and `100vh` *(end)*. The resulting `@scroll-timeline` definition looks like this:

```css
@scroll-timeline parallax-header-timeline {
    scroll-offsets: 0%, 100vh;
}
```

You can put any `<length>` or `<percentage>` Data Type in there.

::: info ☝️

In an earlier version of the spec one had to define the Scroll Offsets using `start` and `end` descriptors.

```css
@scroll-timeline parallax-header-timeline {
  start: 0%;
  end: 100vh;
}
```

This is no longer the case, and one should now use the `scroll-offsets` descriptor instead.

**However, you might still see this older syntax in the demos as Chromium has this older version implemented and is in the process of migrating to the new `scroll-offsets` syntax**

```component VPCard
{
  "title": "[ScrollTimeline] Support multiple scroll offset ranges [40699228] - Chromium",
  "desc": "40699228",
  "link": "https://issues.chromium.org/issues/40699228/",
  "logo": "https://gstatic.com/chrome-tracker/img/chromium.svg",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

If you want, you can also put in more than two values, but note that your scroll to time mapping might become wonky. That’s because the set `animation-duration` will be chunked evenly across the number of `scroll-offsets`.

For example, with `scroll-offsets: 0vh, 80vh, 100vh;` and a `animation-duration` of `1s` for example, your scroll-time map will become this:

- At `0vh` your `animation-duration` will have advanced to `0s`
- At `80vh` your `animation-duration` will have advanced to `0.5s`, as that `80vh` is defined *“halfway the array of values”*
- At `100vh` your `animation-duration` will have advanced to `1s`

::: tip 🔥

Always set two values for `scroll-offsets`, unless you have a specific reason not to.

:::

::: info ☝️

The `scroll-offsets` can accept more types of values, which we will cover further down this post.

:::

### Changing the Scroll Orientation

By default a `@scroll-timeline` will be linked to scrolling vertically from top to bottom across the document. Using the `orientation` descriptor we can change this to — for example — `horizontal`.

```css
@scroll-timeline example {
  orientation: horizontal;
}
```

Use of the [**logical values**](/bram.us/css-logical-properties-and-values-the-next-step-of-css-evolution.md) `inline` and `block` is also allowed. Finally, there’s also `auto`.

### Changing the Scroll Container *(In-Page Gallery Demo)*

By default a `@scroll-timeline` will be linked to scrolling vertically from top to bottom across the document. But what if we don’t want across the document, but inside a specific element? This is where the `source` descriptor comes into play.

Below is an example that contains two in-page image galleries/carousels, [**implemented using scroll-snapping**](/bram.us/simple-scroll-snapping-carousel-flexbox-layout-grid-layout.md). Each of those have a progress bar attached. To drive these progress bars we need not want to respond to scroll progress in the document, but to scrolling in their own scroll container.

::: tabs

@tab:active CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="dyOVXoe"
  title="Scroll-Linked Animations: In-Page Gallery (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

@tab JS WAAPI + `ScrollTimeline` Version

<CodePen
  user="bramus"
  slug-hash="MWbEeEp"
  title="Scroll-Linked Animations: In-Page Gallery (WAAPI version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

To define which scroll container a `@scroll-timeline` responds to, you need set the `source` descriptor, and have it target said element. To do so you can use the `selector()` function as its value. That function requires an `<id-selector>`, so you’ll need to give your targeted element an `id` attribute value.

```css
@scroll-timeline example {
  source: selector(#foo);
}
```

As we have two galleries, we need to define two `@scroll-timeline` instances and connect them to their proper progress bar. And since they are horizontally scrolling ones, we also need to set the `orientation` descriptor correctly. Our code eventually looks like this:

```html
<div class="gallery" id="gallery1">
  <div class="gallery__progress" id="gallery1__progress"></div>
  <div class="gallery__scrollcontainer" id="gallery1__scrollcontainer">
    <div class="gallery__entry">…</div>
    <div class="gallery__entry">…</div>
  </div>
</div>
```

```css :collapsed-lines
@keyframes progress {
  to {
    transform: scaleX(1);
  }
}

/* #gallery1 */
@scroll-timeline gallery1__timeline {
  source: selector(#gallery1__scrollcontainer);
  orientation: horizontal;
}
#gallery1__progress {
  /* We have 2 photos, with the 1st visible, so we start at 1/2 */
  transform: scaleX(0.5);
  animation: 1s linear forwards progress;
  animation-timeline: gallery1__timeline;
}

/* #gallery2 */
@scroll-timeline gallery2__timeline {
  source: selector(#gallery2__scrollcontainer);
  orientation: horizontal;
}
#gallery2__progress {
  /* We have 3 photos, with the 1st visible, so we start at 1/3 */
  transform: scaleX(0.333);
  animation: 1s linear forwards progress;
  animation-timeline: gallery2__timeline;
}
```

::: note 😖

One thing I find pretty annoying when it comes to this `selector()` function is that you **must** pass an `id` into it. This can become pretty cumbersome: with 10 galleries on a page, you need to define 10 almost identical `@scroll-timeline`s in your code. Only difference between them: the `id` passed into `selector()`.

I consider this to be shortcoming of the specification, and have raised [an issue (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5884) with the CSSWG: it would be handy if `selector()` could point to the current element being animated or would accept any selector. That way you can reuse one single `@scroll-timeline` on multiple elements.

Relevant CSS WG Issue: [5884 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5884)

:::

::: info 💡

If you think you would be able to dynamically set the `<id-selector>` in `source` by means of CSS Custom Property, don’t bother: [CSS Variables cannot be used within descriptors](https://bugs.chromium.org/p/chromium/issues/detail?id=1175284#c4).

:::

### In-Between Summary

::: info 📝

Before we continue with the really cool stuff that’s coming up, let’s summarize what we know so far.

:::

A Scroll Timeline is an interface that lets us map Scroll Progress to Animation Progress. You can define it in CSS using `@scroll-timeline` with the following descriptors:

#### `source`

The scrollable element whose scrolling triggers the activation and drives the progress of the timeline.

#### `orientation`

The direction of scrolling which triggers the activation and drives the progress of the timeline.

#### `scroll-offsets`

An array of two or more scroll offsets that constitute the in-progress intervals in which the timeline is active.

Allowed values for the descriptors:

- By default the `source` is the document’s scrolling element *(value: `auto`)*, but you can also target an element using `selector(<id-selector>)`
- The `orientation` is `vertical` or `horizontal`. Using logical units `inline` and `block` is also possible. The initial value is `auto`.
- Typically the entries in `scroll-offsets` are lengths or percentages, but we’ll cover an extra variation in the next part

To attach a `@scroll-timeline` to an animation, use the `animation-timeline` property.

::: info 💁‍♂️

Like what you see so far? Happen to be conference or meetup organiser? Feel free to [**contact me to come speak at your event**](/bram.us/talks/README.md), with a talk covering the contents of this post.

:::

### More Demos

As I have been playing with CSS `@scroll-timeline` for nearly a month by now, I’ve been making quite a lot of demos. Here’s a fine selection relevant for this first part of this series:

1. [Parallax Cover to Sticky Header Demo](#more-demos--parallax-cover-to-sticky-header)
2. [Full Screen Panels with Snap Points Demo](#more-demos--full-screen-panels-with-snap-points)
3. [Full Screen Panels with Snap Points Demo, With Navigation Controls](#more-demos--full-screen-panels-with-snap-points--revisited)

#### Parallax Cover to Sticky Header Demo

Building further upon the Parallax Cover from earlier on, here’s a demo that converts a full page Cover Image to a Sticky Header.

::: tabs

@tab:active CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="ExgOPRw"
  title="Scroll-Linked Animations: Parallax Cover to Sticky Header (@scroll-timeline Version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

@tab JS WAAPI + `ScrollTimeline` Version

<CodePen
  user="bramus"
  slug-hash="GRjPggQ"
  title="Scroll-Linked Animations: Parallax Cover to Sticky Header (WAAPI + ScrollTimeline Version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

The `@scroll-timeline` is exactly the same as the Parallax Cover demo, only the animation is a bit different: the `color`, `font-size`, and `height` are also adjusted upon scrolling.

I couldn’t use `position: sticky;` here though, as resizing the cover would shrink down the entire height of the document, and therefore the animation would flicker. Instead I resorted to `position: fixed;` and added a `margin-top` of `100vh` to the text content so that it remains visually below the cover.

#### Full Screen Panels with Snap Points Demo

This is a small demo forked from [this demo (<VPIcon icon="fa-brands fa-codepen"/>`argyleink`)](https://codepen.io/argyleink/pen/XWdNYaY) by [Adam Argyle (<VPIcon icon="fa-brands fa-x-twitter"/>`argyleink`)](https://twitter.com/argyleink), which put CSS `@scroll-timeline` on my radar *(thanks, Adam!)*. The page features a 4-panel full-page carousel with numbers that slide into view.

The demo has been adjusted to use CSS `@scroll-timeline` and [mix-blend-mode: difference;](https://bram.us/2021/01/14/css-mix-blend-mode-not-working-set-a-background-color/).

::: tabs

@tab:active CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="QWKzpQe"
  title="Scroll-Linked Animations: Counter and Snap Points (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

@tab JS WAAPI + `ScrollTimeline` Version

<CodePen
  user="bramus"
  slug-hash="PobKXRj"
  title="Scroll-Linked Animations: Counter and Snap Points (JS WAAPI + ScrollTimeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

The `/ 4` suffix is `position: fixed;` on the page, and the `/` character inside spins around `1turn` per panel that you scroll. As there are 4 panels in total, we spin for a total of `3turn` from top to bottom of the scroll container.

```css
@scroll-timeline spin-slash {
  source: selector(#main);
}

@keyframes rotato {
  to {
    transform: rotateZ(3turn);
  }
}

.slash {
  animation: rotato 1s linear;
  animation-timeline: spin-slash;
}
```

#### Full Screen Panels with Snap Points Demo, With Navigation Controls

This demo builds further upon the previous one and adds a navigation bar to it. The active indicator is powered by `@scroll-timeline`: as you scroll through `#main`, the active indicator moves to the correct navigation item.

There are two variants for you to check:

1. There is one single active indicator shared amongst all navigation items.
2. Each navigation item has its own active indicator.

I like how in this second example these indicators reflect the percentage each section is in view (or not).

::: tabs

@tab:active v1, CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="eYdxZoy"
  title="Scroll-Linked Animations: Counter and Snap Points with Navigation Controls [variant 1] (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

@tab v2, CSS `@scroll-timeline` Version

<CodePen
  user="bramus"
  slug-hash="yLaZJOp"
  title="Scroll-Linked Animations: Counter and Snap Points with Navigation Controls [variant 2] (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

In the first version a line is injected underneath the navigation and its `left` position is adjusted using the same `@scroll-timeline` as the panels use.

In the second version each navigation item gets a line injected. The animation to show/hide the line is one shared animation for all items that does both the showing and the hiding:

```css
@keyframes reveal-indicator {
  1% { /* We use 1% instead of 0% to prevent rounding/rendering glitches */
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(1);
  }
  99% {  /* We use 99% instead of 100% to prevent rounding/rendering glitches */
    transform: scaleX(0);
  }
}
```

Now it gets tricky though: for each navigation item we create a different `@scroll-timeline` whose `scroll-offsets` and `time-range` vary.

- The default `time-range` is `4s`
- The first and last items only need half an animation though *(as you can’t scroll past them)* so their `time-range` is set to `2s`
- To fix the first item’s animation we use a negative `animation-delay` of `-2s` on the element itself. That way it’s animation will start “too soon”, and will already be at 50% (thus at `scaleX(1)`) on page load.

### In Closing

That’s it for the first part of this series! We’ve covered how to create Scroll-Linked Animations between two absolute scroll-offsets, and how we can tweak our defined `@scroll-timeline`s.

![](https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-linked-animations.png)

I hope I’ve been able to get you excited for this possible future addition to CSS throughout this post. Although it still is in its very early stages, I’m confident this will become a CSS WG Recommendation one day 🙂

I’m glad to see that the Chromium engineers are actively working on this experimental implementation, taking the time to respond to newly reported bugs. I hope that other browser vendors will follow suit soon. Relevant tracking bugs to flag/star/follow:

- [<VPIcon icon="fa-brands fa-chrome"/>Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1023424)
- [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1676780)
- [<VPIcon icon="fa-brands fa-safari"/>Safari](https://bugs.webkit.org/show_bug.cgi?id=222295)

::: note Update 2021.03.04

[**Part 2 of this series got published. You can read it here.**](/bram.us/the-future-of-css-scroll-linked-animations-part-2.md)

In part 2 we cover how to create Scroll-Linked Animations based on the location of an element within the scroller, as used in this demo:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-coverflow.mp4" />
Video Player

:::

::: info 🗃

You can find all demos shown in this post over at CodePen, in a Collection [<VPIcon icon="fa-brands fa-codepen"/>Scroll-Linked Animations: Part 1](https://codepen.io/collection/DkdaQK?grid_type=grid). It’d be great if you could ❤️ the collection and/or the demos you like.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 1)",
  "desc": "The “Scroll-linked Animations Specification” is an upcoming addition to CSS that defines a way for creating animations that are linked to a scroll offset of a scroll container. Let's take a look at how it works and what results we can achieve with it.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-scroll-linked-animations-part-1.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
