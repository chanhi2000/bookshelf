---
lang: en-US
title: "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)"
description: "Article(s) > The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)"
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
      content: "Article(s) > The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)"
    - property: og:description
      content: "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-scroll-linked-animations-part-2.html
prev: /programming/css/articles/README.md
date: 2021-03-04
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/03/css-scroll-timeline-element-based-offsets-coverflow-bramus.gif
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
  name="The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)"
  desc="Let's take a look at how we can create Scroll-Linked Animations that use Element-based Offsets using @scroll-timeline from the “Scroll-linked Animations“ CSS Specification."
  url="https://bram.us/2021/03/04/the-future-of-css-scroll-linked-animations-part-2/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/03/css-scroll-timeline-element-based-offsets-coverflow-bramus.gif"/>

::: warning 🚨UPDATE

The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes.

Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please refer to [<VPIcon icon="fa-brands fa-chrome"/>https://developer.chrome.com/articles/scroll-driven-animations/](https://developer.chrome.com/articles/scroll-driven-animations/) for an article with examples that use the updated syntax.

:::

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-coverflow.mp4?_=1" />

<!-- Example Scroll-Linked Animation with Element-Based Offsets, CSS FTW! 🤩 -->

The [<VPIcon icon="iconfont icon-w3c"/>Scroll-linked Animations Specification](https://drafts.csswg.org/scroll-animations-1/) is an upcoming addition to CSS that defines a way for creating animations that are linked to a scroll offset of a scroll container. Even though the specification is still in draft, and in no way finalized nor official, it already has experimental support in Chromium.

In [**the first part of this series**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) we covered how to create Scroll-Linked Animations between two absolute scroll-offsets using the `@scroll-timeline` at-rule and `animation-timeline` CSS property.

**In this second part we dial it up a notch and dig into creating Scroll-Linked Animations based on the location of an element within its scroller.**

::: note 👨‍🔬

The CSS features described in this post are still experimental and not finalized at all! If you’re feeling adventurous you can play with these new features today, but you’ll need at least Chromium 89 with the `#experimental-web-platform-features` flag enabled through `chrome://flags`.

💥 To keep your primary Chrome install clean, I recommend you do not set this in Chrome Stable, but resort to Beta / Canary builds.

👀 If you don’t understand how to do this, or don’t feel safe doing this, fear not: This post also includes recordings and/or fallback versions using JavaScript for most of the demos.

:::

::: info 💄

While the [<VPIcon icon="iconfont icon-w3c"/>Scroll-Linked Animations Specification](https://drafts.csswg.org/scroll-animations-1/) also describes a JavaScript interface, the main focus of this post will be its CSS counterpart. The JS alternatives won’t be covered in detail.

:::

---

## Scroll-Linked Animations *(Part 1)*, a Recap

In [**the first part of this series**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) we took a look at `@scroll-timeline` and its descriptors. If I explained it all properly, the code snippet below should make sense:

```css
@keyframes resize-progressbar {
  to {
    transform: scaleX(1);
  }
}

@scroll-timeline scroll-in-gallery {
  source: selector(#gallery__scrollcontainer);
  scroll-offsets: 0%, 100%;
  orientation: horizontal;
  time-range: 1s;
}

#gallery__progressbar {
  transform: scaleX(0.5);
  animation: 1s linear forwards resize-progressbar;
  animation-timeline: scroll-in-gallery;
}
```

::: important 🚨

It’s very important to understand the contents of [**the first part of this series**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) as this post builds further upon that knowledge. If you haven’t read it, you most likely won’t understand all that much of this second part. You can [**read the first part here**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md).

:::

---

## Element-based Offsets?

Besides setting absolute values as `scroll-offsets`, the Scroll-Linked Animations Specification also allows you to set Element-based Scroll Offsets. With this type of Scroll Offsets the animation is based on the location of an element within the scroll-container.

Typically this is used to animate an element as it comes into the scrollport until it has left the scrollport; e.g. while it is intersecting:

<CodePen
  user="bramus"
  slug-hash="yLVpgWJ"
  title="Scroll-Linked Animations Visualization: Element-Based Offsets"
  :default-tab="['css','result']"
  :theme="dark"/>

When scrolling down in the visualization *(using the ⏭ button)* you’ll see the box switch colors:

1. as it slides into the scrollport from the bottom
2. after it has just left the scrollport at the top

::: info 🔄

When scrolling back up again you’ll see the same happening in reverse.

:::

Both these turning points can be used as offsets for a Scroll-Linked Animations. Because they are described from the perspective of the box itself *(which is an HTML Element)*, we call these “Element-based Offsets”.

In pseudo-code, our `@scroll-timeline` would look like this:

```css
@scroll-timeline element-enters-and-leaves-the-scrollport {
  scroll-offsets:
    “the box is positioned underneath the bottom edge of the scrollport”,
    “the box is positioned above the top edge of the scrollport”
  ;
  time-range: 1s;
}
```

As with “regular” Scroll-Linked Animations we can drive an animation while scrolling between these two Element-based Offsets.

::: note ☝️ Relevant Chromium Bug: 1094014 (<VPIcon icon="fa-brands fa-chrome"/><code>bugs.chromium.org</code>)

In an earlier version of the spec one had to define the Scroll Offsets using `start` and `end` descriptors.

```css
@scroll-timeline element-enters-and-leaves-the-scrollport {
  start: “the box is positioned underneath the bottom edge of the scrollport”;
  end: “the box is positioned above the top edge of the scrollport”;
  time-range: 1s;
}
```

This is no longer the case, and one should now use the `scroll-offsets` descriptor instead.

**However, you might still see this older syntax in the demos as Chromium has this older version implemented and is in the process of migrating to the new `scroll-offsets` syntax**

```component VPCard
{
  "title": "[ScrollTimeline] Support multiple scroll offset ranges [40699228] - Chromium",
  "desc": "",
  "link": "https://issues.chromium.org/issues/40699228/",
  "logo": "https://gstatic.com/chrome-tracker/img/chromium.svg",
  "background": "rgba(26,115,232,0.2)"
}
```

:::

---

## Element-based Offsets in CSS

To create a Scroll-Linked Animation that uses Element-based Offsets, we first need two Element-based Offsets:

1. A *from offset* which defines when the animation will begin.
2. A *to offset* which defines by when the animation will be done.

In CSS, these Element-based Offsets are represented by the `<element-offset>` Data Type.

### The `<element-offset>` Data Type

Let’s take the example below and dissect it:

```css
selector(#element) end 0
```

1. `selector(#element)` defines the DOM Element we want keep an eye on. We call this the **target**.
2. `end` indicates at which **edge** of the `source`‘s scrollport the algorithm should look for the `target` intersecting.
    - Allowed values are `start`/`end`.
    - Depending on the timeline’s `orientation` this translates to the *top*/*bottom* or *left*/*right* edge.
3. The **threshold** is a number — ranging from `0.0` to `1.0` — that indicates how much of the *target* is visible in the scrollport at the given edge.
    - `0` = not in the scrollport
    - `1` = entirely in the scrollport

You might already know this value from [<VPIcon icon="fa-brands fa-firefox"/>creating an `IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#creating_an_intersection_observer).

::: info

Looking back at our example of `selector(#element) end 0`, it basically translates to:

1. Keep an eye on `#element` …
2. … and track if it intersects at the `end` edge of `source`.
3. If the element’s intersecting threshold is `0` then activate.

E.g. the `#element` is touching the scrollport at its bottom edge; which happens to be the starting point from the visualization [before](#element-based-offsets)!

:::

### Making it visual

If you cannot follow with that **threshold** there, don’t worry: it’s easier to understand if you make it visual.

<CodePen
  user="bramus"
  slug-hash="OJbZbaX"
  title="Scroll-Linked Animations Visualization: Element-Based Offsets Visualizer"
  :default-tab="['css','result']"
  :theme="dark"/>

In the visualization above try changing the values, keeping in mind that the **threshold** is a number that indicates how much of the **target** is intersecting with the scrollport at the given **edge**.

If, after playing with it, you understand that a edge+threshold combo of `start 0.5` means that the target is halfway across the top edge of a vertical scrollport, you get it 😎

::: info 🐛

I’ve noticed that it’s also possible to — for example — define `end 1.2`, which translates to “the target is 1/5th over the bottom edge”. This is not allowed per spec, as the threshold should be in the range of `0.0` and `1.0`.

However, as the algorithm never checks whether this value is inside its assigned range, it passes through and will work. I kinda like this quirk, as it allows you to add some breathing room to all of your animations.

Could be in the future that this will no longer be allowed — Relevant CSS WG Issue: [5203 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5203)

:::

---

## Element-based Offsets and `@scroll-timeline` *(Revealing Image Demo)*

To create a Scroll-Linked Animation that uses Element-based Offsets, you need to pass a pair of `<element-offset>` Data Types into the `@scroll-timeline`‘s `scroll-offsets` descriptor.

```css{3-4}
@scroll-timeline element-enters-and-leaves-the-scrollport {
  scroll-offsets:
    selector(#element) end 0,
    selector(#element) start 0
  ;
  time-range: 1s;
} 
 
```

1. `selector(#element) end 0` here is our *from offset*, and defines when the animation will begin.
2. `selector(#element) start 0` here is our *to offset*, and defines by when the animation will be done.

Here the offsets for our `@scroll-timeline` are set so that the animation will begin when `#element` is about to enter the scrollport from the bottom *(= `end` edge, `0`% in view)*, and will be done animating after the `#element` has entirely left the scrollport at the top *(= `start` edge, `0`% in view)*.

::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="KKNozxQ"
  title="Scroll-Linked Animation with Element-Based Offset (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab JS WAAPI + <code>ScrollTimeline</code> Version

<CodePen
  user="bramus"
  slug-hash="WNoyajb"
  title="Scroll-Linked Animation with Element-Based Offset (JS WAAPI Version)"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

In this demo you’ll see an image be revealed as it intersects with the scrollport. The reveal itself is done using a `clip-path` that animates from `inset(0% 50% 0% 50%);` to no clipping at all, which looks like a curtain opening.

```css
@keyframes reveal {
  to {
    clip-path: inset(0% 0% 0% 0%);
  }
}
.revealing-image {
  clip-path: inset(0% 50% 0% 50%);
  animation: reveal 2s linear;
  animation-fill-mode: forwards;
}

@scroll-timeline revealing-image-timeline {
  source: selector(body);
  scroll-offsets:
    selector(#revealing-image) end 0,
    selector(#revealing-image) start 0
  ;
  time-range: 2s;
}
#revealing-image {
  animation-timeline: revealing-image-timeline;
}
```

::: note 🤕

In this demo we have a loss of (visual) data though. As our animation reaches 100% only when the image has already slid out of scrollport *(at the top)*, we can never see the image as a whole — it’s always clipped while inside the scrollport. Thankfully we can tweak the used `<element-offset>`s to prevent this loss of visual data.

:::

---

## Typical from/to `<element-offset>` Combinations

There are 4 typical `edge` + `threshold` combinations to use with Scroll-Linked Animations:

- `start 0`
- `start 1`
- `end 1`
- `end 0`

::: info ☝️

As a reminder, here’s what they look like, individually:

<CodePen
  user="bramus"
  slug-hash="ZEBvVxX"
  title="Scroll-Linked Animations Visualization: Element-Based Offsets Visualizer"
  :default-tab="['css','result']"
  :theme="dark"/>

Other values for threshold of course still possible; I’m only taking a look at these extremes here.

:::

Depending on how you combine these as to/from offsets, we can control when exactly the animation will run:

- `#element` is intersecting scrollport, even for the tiniest bit
- `#element` is in between scrollport edges
- `#element` is entering from bottom into scrollport
- `#element` is exiting at top from scrollport

In the demo below I’ve created several boxes that each have a different pair of `<element-offset>`s applied. Scroll down to see the elements appear in the viewport and take a good look at each box separately, specifically when one of its edges enters or leaves the viewport.

Color codes are applied to indicate when the element is being animated:

- Red = the Scroll Timeline is not animating the element
- Green = the Scroll Timeline is animating the element

:::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="RwojjbM"
  title="Scroll-Linked Animations: Element-Based Offsets Comparison (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab Recording

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/03/css-scroll-timeline-offsets-combinations-demo.mp4" />

@tab JS WAAPI + <code>ScrollTimeline</code> Version

::: critical

Unfortunately there’s an issue with the used ScrollTimeline polyfill used, and the timelines are calculated wrongly. Showing this *(broken)* demo would only confuse you more, so it’s not included. Please check the recording tab to see how it behaves.

:::

::::

Did you see? Hit the checkbox at the top to have the demo show the findings. Perhaps you’ll see it now 😉

Interpreting the results from the demo, I’ve forged this small list of typical from-to offset combinations and what they look like:

- `end 0` → `start 0` = intersecting scrollport, even for the tiniest bit
- `end 1` → `start 1` = in between scrollport edges
- `end 0` → `end 1` = enter from bottom into scrollport
- `start 1` → `start 0` = exit at top from scrollport

In this extra visualization below you can see how these different combinations affect the timeline *(drawn in the center)*. The same colors as in the demo are used.

<CodePen
  user="bramus"
  slug-hash="vYypmON"
  title="Scroll-Linked Animations Visualization: Element-Based Offsets Timeline Visualizer"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info 🥵

Don’t sweat it if you don’t understand this all immediately; it also took me quite some time before I did. And perhaps there’s no need to, as you can go a long way with this little cheat sheet:

- `end 0` → `start 0` = intersecting scrollport, even for the tiniest bit
- `end 1` → `start 1` = in between scrollport edges
- `end 0` → `end 1` = enter from bottom into scrollport
- `start 1` → `start 0` = exit at top from scrollport

:::

::: info 💁‍♂️ Like what you see so far? Happen to be conference or meetup organiser? Feel free to [<VPIcon icon="fas fa-globe"/>contact me to come speak at your event](https://bram.us/speaking-training/), with a talk covering the contents of this post.

:::

---

## Demos

As I have been playing with CSS `@scroll-timeline` for nearly a month by now, I’ve whipped up quite a lot of extra demos. Ready to have your socks blown off?

::: note ☝️

Know that all these demos here are technical demos. On a real website you might want to go easy with these types of animations in case visitors request so, by respecting their [**`prefers-reduced-motion`**](/css-tricks.com/introduction-reduced-motion-media-query.md) setting.

:::

### Revealing Images Demo, Revisited

This demo is similar to the first Revealing Image one, yet the offsets were tweaked in such a way that the revealing animation should only start when the image is already halfway in view *(read: threshold of `0.5`)* and be finished by the time the image has entered the scrollport completely.

::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="vYXQGXo"
  title="Scroll-Linked Animation: Image Reveal as it scrolls into view (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab JS WAAPI + <code>ScrollTimeline</code> Version

<CodePen
  user="bramus"
  slug-hash="JjbLXwg"
  title="Scroll-Linked Animation: Image Reveal as it scrolls into view (JS WAAPI + ScrollTimeline Version)"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

In `@scroll-timeline` speak that becomes:

```css
@scroll-timeline revealing-image-timeline-1 {
  source: selector(body);
  scroll-offsets:
    selector(#revealing-image-1) end 0.5,
    selector(#revealing-image-1) end 1
  ;
  time-range: 2s;
}
```

Above that the start `clip-path` was set to `inset(45% 20% 45% 20%);` — making it look like a revealing box — and the `opacity` is also animated.

```css
.revealing-image {
  opacity: 0;
  clip-path: inset(45% 20% 45% 20%);
  …
}
```

~

### Contact List Demo

In this demo I’ve created a contact list where new items slide in when they enter the scrollport. I think it makes a neat effect 🙂

::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="bGwJVzg"
  title="Fly-in Contact List (CSS @scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab JS WAAPI + <code>ScrollTimeline</code> Version

<CodePen
  user="bramus"
  slug-hash="ExgJPjM"
  title="Fly-in Contact List (JS WAAPI + JS ScrollTimeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

The list itself is a regular `<ul>` which acts as the `@scroll-timeline`‘s source. Each `<li>` has it’s own `scroll-offset` set to go from `end 0` *(= bottom edge, out of view)* to `end 1` *(= bottom edge, in view)*.

```css
@keyframes slide-in {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

li {
  opacity: 0;
  transform: translateX(-100%);
  animation: 1s slide-in ease-in forwards;
}

@scroll-timeline list-item-15 {
  source: selector(#list-view);
  scroll-offsets:
    selector(#list-item-15) end 0,
    selector(#list-item-15) end 1
  ;
  time-range: 1s;
}
#list-item-15 {
  animation-timeline: list-item-15;
}
```

::: details 😳 ICYWW: No, I didn’t manually type out all those <code>scroll-timeline</code>s

As also mentioned in [**the first part of this series**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) it’s pretty annoying when it comes to creating `scroll-timeline`s for many individual items as the `selector()` function requires you to pass an `id` into it. This is a shortcoming of the spec, and is something what will be tackled. Relevant CSS WG Issue: [5884 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5884)

Until this issue is resolved — and to save myself from typing all those `scroll-timeline`s out manually — I use a little piece of JavaScript to generate the timelines. These generated timelines can then be either copy-pasted into the CSS, or dynamically injected from the script.

```js :collapsed-lines
const generateCSS = () => {
  const css = [];
  document.querySelectorAll('li').forEach((li, i) => {
    const id = li.getAttribute('id');

    css.push(`
      @scroll-timeline list-item-${id} {
        source: selector(#list-view);
        scroll-offsets:
          selector(#${id}) end 0,
          selector(#${id}) end 1
        ;
        time-range: 1s;
      }
      #${id} {
        animation-timeline: list-item-${id};
      }   

    `);
  });
  return css.join("\n");
}

const injectCSS = (css) => {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}

injectCSS(generateCSS());
```

In some demos you might notice that the `generateCSS()` code is still present, but not called. And even if it were: those demos still are pure CSS 😉

:::

The animation on the `<li>`s in this demo was carefully chosen to be a horizontal one, so that the dimensions of the of the wrapping `<ul>`‘s scrollport don’t change. If the `<li>` elements would be translated in a vertical direction, that would also adjust the scrollport. You can work around this by animating not the `<li>` itself, but by animating its contents.

::: tip 🔥

Beware with animations that alter the dimensions of the `source`‘s scrollbox. Work around it by not animating the target, but by animating the target’s contents.

:::

::: note 💡

By flipping the animation and adjusting the `scroll-offsets` so that they are triggered at the `start` edge, you can easily create a version where items slide-out as they scroll out of the scrollport.

```css
@keyframes slide-out {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

li {
  opacity: 1;
  transform: translateX(0);
  animation: 1s slide-out ease-in forwards;
}

@scroll-timeline list-item-1 {
  source: selector(#list-view);
  scroll-offsets:
    selector(#list-item-1) start 1,
    selector(#list-item-1) start 0
  ;
  time-range: 1s;
}
#list-item-1 {
  animation-timeline: list-item-1;
}
```

:::

### Contact List Demo, Revisited

Combining both the fly-in and fly-out effect is possible by creating 2 animations, each with their own individual *(non-overlapping)* `@scroll-timeline`

```css
/* Element scrolls into the scroll-container (from the bottom) */
@scroll-timeline tl-list-item-12-appear {
  source: selector(#list-view);
  scroll-offsets:
    selector(#list-item-12) end 0,
    selector(#list-item-12) end 1
  ;
  time-range: 1s;
}

/* Element scrolls out of the scroll-container (at the top) */
@scroll-timeline tl-list-item-12-disappear {
  source: selector(#list-view);
  scroll-offsets:
    selector(#list-item-12) start 1,
    selector(#list-item-12) start 0
  ;
  time-range: 1s;
}

#list-item-12 > * {
  animation:
    1s li-appear linear tl-list-item-12-appear,
    1s li-disappear linear tl-list-item-12-disappear
  ;
}
```

:::

:::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="oNYEgEQ"
  title="Scroll-Linked Animations: Fly-In Contact List (Fly-In + Fly-Out)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab Recording

@tab JS WAAPI + <code>ScrollTimeline</code> Version

::: critical

Unfortunately there’s an issue with the used ScrollTimeline polyfill used, disallowing the combination of two animations. Please check the recording tab to see how this demo behaves.

:::

::::

What’s very crucial here — apart from having non-overlapping Scroll Timelines — is the attaching of the animations. Whereas in the previous demos it had `animation-fill-mode: both;` set, this has now been removed. **This is a very important thing to do.** If you don’t you’ll notice that only the last animation will be applied and might think this is an implementation bug [<VPIcon icon="fa-brands fa-chrome"/>as I did](https://bugs.chromium.org/p/chromium/issues/detail?id=1181750). Thankfully it’s not a bug and was a classic case of PEBKAC.

### Horizontal Scroll Section Demo

This demo is based upon this “[GSAP ScrollTrigger & Locomotive Scroll (<VPIcon icon="fa-brands fa-codepen" />`cameronknight`)](https://codepen.io/cameronknight/pen/qBNvrRQ)” demo by Cameron Knight, which features a horizontal scroll section. I’ve basically left the HTML intact, removed all JS, and added a few CSS Animations + Scroll Timelines to get this working.

::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="QWGbOBQ"
  title="Scroll-Linked Animations: Horizontal scroll section (@scroll-timeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab Recording

@tab JS WAAPI + <code>ScrollTimeline</code> Version

<CodePen
  user="bramus"
  slug-hash="jOVWpyr"
  title="Scroll-Linked Animations: Horizontal scroll section (WAAPI / ScrollTimeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

The tricky part was the horizontal section of course:

1. Stretch out the wrapping `#sectionPin` to `500vh` so that we create extra room to scroll.
2. Set up a `@scroll-timeline` for `#sectionPin` while it’s inside entirely covering the scrollport, using the mind-flipping `start 1` → `end 1` offset combination.

```css
@scroll-timeline horizontal-section-scrolling-into-view {
  source: selector(body);
  scroll-offsets:
    selector(#sectionPin) start 1, /* Start when #sectionPin touches the top edge of the scrollport and is visible inside the scrollport */
    selector(#sectionPin) end 1 /* End when #sectionPin touches the bottom edge of the scrollport and is visible inside the scrollport */
  :
  time-range: 1s;
}
```

This weird offset combination only works because `#sectionPin` is bigger than the scrollport. I’ll leave it to you, the reader, to dig into it further 😉

3. On `.pin-wrap` use `position: sticky;` *(so that it remains in view)* and translate it horizontally while scrolling.

```css
@keyframes move-horizontal-scrolling-section {
  to {
    transform: translateX(calc(-100% + 100vw)); /* Move horizontally so that right edge is aligned against the viewport */
  }
}
      
.pin-wrap {
  position: sticky;
  top: 0;
  animation: 1s linear move-horizontal-scrolling-section forwards;
  animation-timeline: horizontal-section-scrolling-into-view;
}
```

::: note ☝️

What’s remarkable here is that the `@scroll-timeline` is tracking `#sectionPin`, but the animation is applied to it’s child element `.pin-wrap`. This is truly one of the powers of `@scroll-timeline`.

:::

::: details 🐛 Want to dig deeper? Here’s a rendering glitch you might notice:

Upon reversing the animation when scrolling back up, it glitches.

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-horizontal-glitch.mp4" />

This is a confirmed bug which will hopefully be fixed soon. — Relevant Chromium Bug: [<VPIcon icon="fa-brands fa-chrome"/>1175289](https://bugs.chromium.org/p/chromium/issues/detail?id=1175289)

:::

### CoverFlow Demo

Remember [<VPIcon icon="fa-brands fa-wikipedia-w"/>CoverFlow from iTunes](https://en.wikipedia.org/wiki/Cover_Flow)? Well, here’s a CSS-only version built with `@scroll-timeline`! 🎉

::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="xxRZZdK"
  title="Pure CSS Coverflow with CSS ScrollTimeline (+ Scroll Snapping)"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab Recording

@tab JS WAAPI + <code>ScrollTimeline</code> Version

<CodePen
  user="bramus"
  slug-hash="PobZbBV"
  title="Scroll-Linked Animations: Coverflow (JS WAAPI + ScrollTimeline version)"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

Looking under hood, here’s how it’s structured:

1. The `<ul>` element is the scroll container, and the `<li>` elements inside scroll.
2. The `<li>` elements themselves switch z-index, and their contained `<img />` elements are transformed.

That 2nd thing is quite key here: If we were to transform the `<li>` elements the scroll-container’s width would change. This would make the scroll-linked animation recalculate at every change, resulting in a flickering animation. We don’t want that of course.

💿 Album covers in this demo come from the wonderful [<VPIcon icon="fas fa-globe"/>Loci Records](https://locirecords.com/) label. You should definitely check them out.

::: details 🐛 In this demo you’ll notice the native ScrollTimeline implementation in Chromium being buggy. Click for more details/info.

If you have “Experimental Web Platform Features” enabled you’ll notice two bugs in this demo:

1. The `z-index` is not always applied correctly *(slight flicker)*.
2. (Not shown in video above) Elements at the very start over very end animate “too late”/”too soon”

You can see this second issue in the recording below:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-bug-whatitdoes-1.mp4" />

On load `card_0` and its siblings start at `0%` animation progress, no matter what their position inside the scroll-container. When scrolling horizontally you see the first few items “catch up” with their animation state. By hitting `card_5` the animation renders as expected: the item shown in the middle is at animation progress `50%`. You can this very same wrong behavior again when closing in on the right edge: the last 5 items have the same issue (but in reverse). By the time the last card is in the center, its animation progress is `100%`, whereas it should be at `50%`.

This debug session shows best:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-bug-whatitdoes-2.mp4" />

For reference, in a non-buggy implementation the initial rendering would show `card_0` at `50%` animation progress, as it’s positioned halfway the scrollport:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-bug-whatiexpected.mp4" />

Relevant Chromium Bug: [<VPIcon icon="fa-brands fa-chrome"/>1174838](https://bugs.chromium.org/p/chromium/issues/detail?id=1174838)

:::

### Stacking Cards Demo

In this demo I tried recreating [<VPIcon icon="fas fa-globe"/>this Stacking Cards demo from CodyHouse](https://codyhouse.co/tutorials/how-stacking-cards), initially by [Claudia Romano (<VPIcon icon="fa-brands fa-x-twitter"/>`romano_cla`)](https://x.com/romano_cla).

::: tabs

@tab:active CSS <code>@scroll-timeline</code> Version

<CodePen
  user="bramus"
  slug-hash="PobmGme"
  title="🌟 Stacking Cards, Final Version"
  :default-tab="['css','result']"
  :theme="dark"/>

@tab Recording

:::

Thanks to playing with `animation-delay` I’m able to use one shared `@scroll-timeline` for each card

```css :collapsed-liens
:root {
  --numcards: 4;
}

#card_1 { --index: 1; }
#card_2 { --index: 2; }
#card_3 { --index: 3; }
#card_4 { --index: 4; }

@scroll-timeline cards-element-scrolls-in-body {
  source: selector(body);
  scroll-offsets:
    selector(#cards) start 1, /* Start when the start edge touches the top of the scrollport */
    selector(#cards) start 0 /* End when the start edge touches the start of the scrollport */
  ;
  time-range: 4s;
}

.card {
  --index0: calc(var(--index) - 1); /* 0-based index */
  --reverse-index: calc(var(--numcards) - var(--index0)); /* reverse index */
  --reverse-index0: calc(var(--reverse-index) - 1); /* 0-based reverse index */
}

@keyframes scale {
  to {
    transform: scale(calc(1.1 - calc(0.1 * var(--reverse-index))));
  }
}
	
.card__content {
  transform-origin: 50% 0%;
  will-change: transform;

  --duration: calc(var(--reverse-index0) * 1s);
  --delay: calc(var(--index0) * 1s);
  
  animation: var(--duration) linear scale var(--delay) forwards;
  animation-timeline: cards-element-scrolls-in-body;
}
```

At first I struggled a lot with getting the sticky part right, as my `position: sticky;` would work as expected, but not as I wanted: the last card slid over the preceding ones:

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2021/02/css-scroll-timeline-stacking-cards-1.mp4" />

After doing a detour with manually trying to translate the cards, I eventually found how to get my `position: sticky;` to work as I wanted.

1. Don’t vary `top` by an extra `1em` per sticky item, but fixate `top: 0;` and adjust the `padding-top` to achieve the offset.
2. Lay out all cards in their wrapper using CSS Grid with fixated rows. Their padding simply bleeds out *(huh? 🤯)*, and therefore they will be evenly spaced using `gap`.

Cool part is: browsers that don’t understand `@​scroll-timeline` but do speak `position: sticky;` will also see the effect, but simply without the scaling.

---

## In Closing

With those fine demos we conclude this second part of this series! We’ve covered how to create Scroll-Linked Animations based on the location of an element within the scroller, and how we can tweak their offsets. I think it’s pretty amazing what we can do with them … the amount of JavaScript that can be replaced with it will be huge.

I hope I’ve been able to get you excited for this possible future addition to CSS throughout this post. Although it still is in its very early stages, I’m confident this will become a CSS WG Recommendation one day 🙂

I’m glad to see that the Chromium engineers are actively working on this experimental implementation, taking the time to respond to newly reported bugs. I hope that other browser vendors will follow suit soon. Relevant tracking bugs to flag/star/follow:

- [<VPIcon icon="fa-brands fa-chrome"/>Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1023424)
- [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1676780)
- [<VPIcon icon="fa-brands fa-safari"/>Safari](https://bugs.webkit.org/show_bug.cgi?id=222295)

::: info 🗃

You can find all demos shown in this post over at CodePen, in a Collection [<VPIcon icon="fa-brands fa-codepen"/>Scroll-Linked Animations: Part 2](https://codepen.io/collection/DEBZva?grid_type=grid). It’d be great if you could ❤️ the collection and/or the demos you like.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 2)",
  "desc": "Let's take a look at how we can create Scroll-Linked Animations that use Element-based Offsets using @scroll-timeline from the “Scroll-linked Animations“ CSS Specification.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-scroll-linked-animations-part-2.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
