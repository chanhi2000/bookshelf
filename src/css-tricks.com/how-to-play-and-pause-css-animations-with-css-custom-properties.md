---
lang: en-US
title: "How to Play and Pause CSS Animations with CSS Custom Properties"
description: "Article(s) > How to Play and Pause CSS Animations with CSS Custom Properties"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Play and Pause CSS Animations with CSS Custom Properties"
    - property: og:description
      content: "How to Play and Pause CSS Animations with CSS Custom Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/how-to-play-and-pause-css-animations-with-css-custom-properties.html
prev: /programming/css/articles/README.md
date: 2021-01-21
isOriginal: false
author:
  - name: Mads Stoumann
    url: https://css-tricks.com/author/madsstoumann/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/01/circles-colors.jpg
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
  name="How to Play and Pause CSS Animations with CSS Custom Properties"
  desc="Let’s have a look CSS @keyframes animations, and specifically about how you can pause and otherwise control them. There is a CSS property specifically for it,"
  url="https://css-tricks.com/how-to-play-and-pause-css-animations-with-css-custom-properties"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/01/circles-colors.jpg"/>

Let’s have a look CSS `@keyframes` animations, and specifically about how you can **pause** and otherwise control them. There is a CSS property specifically for it, that can be controlled with JavaScript, but there is plenty of nuance to get into in the details. We’ll also look at my preferred way of setting this up which gives lots of control. Hint: it involves CSS custom properties.

---

## The importance of pausing animations

Recently, while working on the CSS-powered slideshow you’ll see later in this article, I was inspecting the animations in the **Layers** panel of DevTools. I noticed something interesting I’d never thought about before: animations *not currently in the viewport* were still running!

Maybe it’s not *that* unexpected. We know videos do that. Videos just go on until you pause them. But it made me wonder if these *playing animations* still use the CPU/GPU? Do they consume unnecessary processing power, slowing down other parts of the page?

Inspecting frames in the **Performance** panel in DevTools didn’t shed any more light on this since I couldn’t see “offscreen”-frames. But, when I scrolled *away* from my “CSS Only Slideshow” at the first slide, then waited and scrolled back, it was at slide five. The animation hadn’t paused. Animations just run and run, until you pause them.

So I began to look into *how*, *why* and *when* animations should pause. Performance is an obvious reason, given the findings above. Another reason is control. Users not only love to have control, but they *should* have control. A couple of years ago, my wife had a really bad concussion. Since then, she has avoided webpages with too many animations, as they make her dizzy. As a result, I consider accessibility perhaps the *most* important reason for allowing animations to pause.

All together, this is important stuff. We’re talking specifically about CSS keyframe animations, but broadly, that means we’re talking about:

1. Performance
2. Control
3. Accessibility

---

## The basics of pausing an animation

The only way to truly pause an animation in CSS is to use the `animation-play-state` property with a `paused` value.

```css
.paused {
  animation-play-state: paused;
}
```

In JavaScript, the property is “camelCased” as `animationPlayState` and set like this:

```js
element.style.animationPlayState = 'paused';
```

We can create a toggle that plays and pauses the animation by reading the current value of `animationPlayState`:

```js
const running = element.style.animationPlayState === 'running';
```

…and then setting it to the opposite value:

```js
element.style.animationPlayState = running ? 'paused' : 'running';
```

<CodePen
  user="anon"
  slug-hash="rNMprwo"
  title="Play/pause CSS animations with JavaScript animationPlayState"
  :default-tab="['css','result']"
  :theme="dark"/>

### Setting the duration

Another way to pause animations is to set `animation-duration` to `0s`. The animation is actually *running*, but since it has no duration, you won’t see any action.

But if we change the value to `3s` instead:

<CodePen
  user="anon"
  slug-hash="poEpZrK"
  title="Play/pause CSS animations toggle animationDuration"
  :default-tab="['css','result']"
  :theme="dark"/>

It works, but has a major caveat: the animations are technically still running. The animation is merely toggling between its initial position, and where it is next in the sequence.

### Straight up removing the animation

We can *remove* the animation entirely and add it back via classes, but like `animation-duration`, this doesn’t actually pause the animation.

```css
.remove-animation {
  animation: none !important;
}
```

Since true pausing is really what we’re after here, let’s stick with `animation-play-state` and look into other ways of using it.

---

## Using data attributes and CSS custom properties

Let’s use a [**data-attribute**](/css-tricks.com/a-complete-guide-to-data-attributes.md) as a selector in our CSS. We can call those whatever we want, so I’m going to use a `[data-animation]`-attribute on all the elements where I’d like to play/pause animations. That way, it can be distinguished from other animations:

```html
<div data-animation></div>
```

That attribute is the selector, and the `animation` shorthand is the property where we’re setting everything. We’ll toss in a bunch of CSS custom properties (using [<VPIcon icon="fas fa-globe"/>Emmet](https://docs.emmet.io/cheat-sheet/)-abbreviations) as values:

```css
[data-animation] {
  animation:
    var(--animn, none)
    var(--animdur, 1s)
    var(--animtf, linear)
    var(--animdel, 0s)
    var(--animic, infinite)
    var(--animdir, alternate)
    var(--animfm, none)
    var(--animps, running);
}
```

With that in place, any animation with this data-attribute will be perfectly ready to accept animations, and we can [**control individual aspects**](/css-tricks.com/now-css-custom-properties-thing-value-parts-can-changed-individually.md) of the animation with custom properties. Some animations are going to have something in common (like duration, easing-type, etc.), so fallback values are set on the custom properties as well.

Why CSS custom properties? First of all, they can be read and set in both CSS and JavaScript. Secondly, they help significantly reduce the amount of CSS we need to write. And, since we can set them within `@keyframes` (at least in Chrome at the time of writing), they offer new and exiting ways to work with animations!

For the animations themselves, I’m using class selectors and updating the variables from the `[data-animation]`-selector:

```html
<div class="circle a-slide" data-animation></div>
```

Why a class *and* a data-attribute? At this stage, the `data-animation` attribute might as well be a regular class, but we’re going to use it in more advanced ways later. Note that the `.circle` class name actually has nothing to do with the animation — it’s just a class for styling the element.

```css
/* Animation classes */
.a-pulse {
  --animn: pulse;
}
.a-slide {
  --animdur: 3s;
  --animn: slide;
}

/* Keyframes */
@keyframes pulse {
  0% { transform: scale(1); }
  25% { transform: scale(.9); }
  50% { transform: scale(1); }
  75% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
@keyframes slide {
  from { margin-left: 0%; }
  to { margin-left: 150px; }
}
```

We only need to update the values that will change, so if we use some common values in the fallback values for the `data-animation` selector, we only need to update the name of the animation’s custom property, `--animn`.

### Example: Pausing with the checkbox hack

To pause all the animations using the ol’ [**checkbox hack**](/css-tricks.com/the-checkbox-hack.md), let’s create a checkbox before the animations:

```html
<input type="checkbox" data-animation-pause />
```

And update the `--animps` property when `checked`:

```css
[data-animation-pause]:checked ~ [data-animation] {
  --animps: paused;
}
```

<CodePen
  user="anon"
  slug-hash="WNGEJWp"
  title="Play/pause CSS animations with “checkbox hack”"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s it! The animations toggle between played and paused when clicking the checkbox — no JavaScript required.

---

## CSS-only slideshow

Let’s put some of these ideas to work!

I‘ve played with the `<details>`-tag a lot recently. It’s the obvious candidate for [**accordions**](/css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion.md), but it can also be used for [**tooltips**](/css-tricks.com/exploring-what-the-details-and-summary-elements-can-do.md), [<VPIcon icon="fa-brands fa-firefox"/>toggle-tips (<VPIcon icon="fa-brands fa-codepen"/>`stoumann`)](https://codepen.io/stoumann/pen/abZXxPx), drop-downs (styled `<select>`-look-a-likes), mega-menus… you name it. It is the official [<VPIcon icon="fa-brands fa-firefox"/>HTML disclosure element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details), after all. Apart from the global attributes and global events that all HTML elements accept, `<details>` has a single `open` attribute, and a single `toggle` event. So, like the checkbox hack, it’s *perfect* for toggling state — but even simpler:

```css
details[open] {
  --state: 1;
}
details:not([open]) {
  --state: 0;
}
```

I decided to do a slideshow, where the slides change automatically via a primary animation called `autoplay`*,* and each individual slide has its own unique secondary animation. The `animation-play-state` is controlled by the `--animps`-property. Each individual slide can have it’s own, unique animation, defined in a `--animn`-property:

```html
<figure style="--animn:kenburns-top;--index:0;">
  <img src="some-slide-image.jpg" />
  <figcaption>Caption</figcaption>
</figure>
```

The `animation-play-state` of the secondary animations are controlled by the `--img-animps`-property. I found a bunch of nice Ken Burns-esque animations at [<VPIcon icon="fas fa-globe"/>Animista](https://animista.net) and switched between them in the `--animn`-properties of the slides.

### Pausing an animation from another animation

In order to prevent GPU overload, it would be ideal for the primary animation to pause any secondary animations. We noted it briefly earlier, but only Chrome (at the time of writing, and it *is* a bit shaky) can update a CSS Custom Property from an `@keyframe` animation — which you can see in the following example where the `--bgc`-property and `--counter`-properties are modified at different frames:

<CodePen
  user="anon"
  slug-hash="WNGMoeV"
  title="Chrome Only: Update Custom Props with @keyframes"
  :default-tab="['css','result']"
  :theme="dark"/>

The initial state of the secondary animation, the `--img-animps` -property, needs to be `paused`, even if the primary animation is running:

```css
details[open] ~ .c-mm__inner .c-mm__frame {
  --animps: running;
  --img-animps: paused;
}
```

Then, in the main animation `@keyframes`, the property is updated to `running`:

```css
@keyframes autoplay {
  0.1% {
    --img-animps: running; /* START */
    opacity: 0;
    z-index: calc(var(--z) + var(--slides))
  }
  5% { opacity: 1 }
  50% { opacity: 1 }
  51% { --img-animps: paused } /* STOP! */
  100% {
    opacity: 0;
    z-index: var(--z)
  }
}
```

To make this work in browsers other than Chrome, the initial value needs to be `running`, as they cannot update a CSS custom property from a `@keyframe`.

Here’s the slideshow, with a “details hack” play/pause-button — no JavaScript required:

<CodePen
  user="anon"
  slug-hash="NWRGavM"
  title="<details> Play/Pause Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Enabling `prefers-reduced-motion`

Some people prefer no animations, or at least *reduced motion*. It might just be a personal preference, but can also be because of a [**medical condition**](/css-tricks.com/introduction-reduced-motion-media-query.md). We talked about the importance of accessibility with animations at the very top of this post.

Both macOS and Windows have options that allow users to inform browsers that they prefer reduced motion on websites. This enables us to reach for the `prefers-reduced-motion` feature query, [**which Eric Bailey has written all about**](/css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query.md).

```scss
@media (prefers-reduced-motion) { ... }
```

Let’s use the `[data-animation]`-selector for reduced motion by giving it different values that are applied when `prefers-reduced-motion` is enabled:

- `alternate` = run a different animation
- `once` = set the `animation-iteration-count` to 1
- `slow` = change the `animation-duration`-property
- `stop` = set `animation-play-state` to `paused`

These are just suggestions and they can be anything you want, really.

```html
<div class="circle a-slide" data-animation="alternate"></div>
<div class="circle a-slide" data-animation="once"></div>
<div class="circle a-slide" data-animation="slow"></div>
<div class="circle a-slide" data-animation="stop"></div>
```

And the updated media query:

```css
@media (prefers-reduced-motion) {
  [data-animation="alternate"] {
   /* Change animation duration AND name */
    --animdur: 4s;
    --animn: opacity;
  }
  [data-animation="slow"] {
    /* Change animation duration */
    --animdur: 10s;
  }
  [data-animation="stop"] {
    /* Stop the animation */
    --animps: paused;
  }
}
```

If this is too generic, and you prefer having unique, alternate animations per animation class, group the selectors like this:

```css
.a-slide[data-animation="alternate"] { /* etc. */ }
```

Here’s a Pen with a checkbox simulating `prefers-reduced-motion`. Scroll down within the Pen to see the behavior change for each circle:

<CodePen
  user="anon"
  slug-hash="BaLdxgz"
  title="Simulate `prefers-reduced-motion` with “checkbox hack”"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Pausing with JavaScript

To re-create the “Pause all animations”-checkbox in JavaScript, iterate all the `[data-animation]`-elements and toggle the same `--animps` custom property:

```html
<button id="js-toggle" type="button">Toggle Animations</button>
```

```js
const animations = document.querySelectorAll('[data-animation');
const jstoggle = document.getElementById('js-toggle');

jstoggle.addEventListener('click', () => {
  animations.forEach(animation => {
    const running = getComputedStyle(animation).getPropertyValue("--animps") || 'running';
    animation.style.setProperty('--animps', running === 'running' ? 'paused' : 'running');
  })
});
```

It’s exactly the same concept as the checkbox hack, using the same custom property: `--animps`, only set by JavaScript instead of CSS. If we want to support older browsers, we can toggle a class, that will update the `animation-play-state`.

<CodePen
  user="anon"
  slug-hash="xxELjvm"
  title="Play/pause CSS animations with JavaScript and CSS Custom props"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Using `IntersectionObserver`

To play and pause all `[data-animation]`-animations *automatically* — and thus not unnecessarily overloading the GPU — we can use an `IntersectionObserver`.

First, we need to make sure that no animations are running at all:

```css
[data-animation] {
  /* Change 'running' to 'paused' */
  animation: var(--animps, paused); 
}
```

Then, we’ll create the observer and trigger it when an element is 25% or 75% in viewport. If the latter is matched, the animation starts playing; otherwise it pauses.

By default, all elements with a `[data-animation]`-attribute will be observed, but if `prefers-reduced-motion` is enabled (set to “reduce”), the elements with `[data-animation="stop"]` will be ignored.

```js
const IO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const state = (entry.intersectionRatio >= 0.75) ? 'running' : 'paused';
      entry.target.style.setProperty('--animps', state);
    }
  });
}, {
  threshold: [0.25, 0.75]
});

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const elements = mediaQuery?.matches ? document.querySelectorAll(`[data-animation]:not([data-animation="stop"]`) : document.querySelectorAll('[data-animation]');

elements.forEach(animation => {
  IO.observe(animation);
});
```

You have to play around with the `threshold`-values, and/or whether you need to `unobserve` some animations after they’ve triggered, etc. If you load new content or animations dynamically, you might need to re-write parts of the observer as well. It’s impossible to cover all scenarios, but using this as a foundation should get you started with auto-playing and pausing CSS animations!

<CodePen
  user="anon"
  slug-hash="WNGEybO"
  title="Play/pause CSS animations with IntersectionObserver"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Bonus: Adding `<audio>` to the slideshow with minimal JavaScript

Here’s an idea to add music to the slideshow we built. First, add an `audio`-tag:

```html
<audio src="/asset/audio/slideshow.mp3" hidden loop></audio>
```

Then, in Javascript:

```js
const audio = document.querySelector('your-audio-selector');
const details = document.querySelector('your-details-selector');
details.addEventListener('toggle', () => {
  details.open ? audio.play() : audio.pause();
})
```

Pretty simple, huh?

I did a “Silent Movie” (with audio)-demo here, where you get to know my geeky past. 🙂

<CodePen
  user="anon"
  slug-hash="poEbxyR"
  title="Silent Movie (enable audio!)"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Play and Pause CSS Animations with CSS Custom Properties",
  "desc": "Let’s have a look CSS @keyframes animations, and specifically about how you can pause and otherwise control them. There is a CSS property specifically for it,",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/how-to-play-and-pause-css-animations-with-css-custom-properties.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
