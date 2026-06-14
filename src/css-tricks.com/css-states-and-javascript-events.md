---
lang: en-US
title: "The Shifting Line Between CSS States and JavaScript Events"
description: "Article(s) > The Shifting Line Between CSS States and JavaScript Events"
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
      content: "Article(s) > The Shifting Line Between CSS States and JavaScript Events"
    - property: og:description
      content: "The Shifting Line Between CSS States and JavaScript Events"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-states-and-javascript-events.html
prev: /programming/css/articles/README.md
date: 2026-06-29
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/state-management.jpg
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
  name="The Shifting Line Between CSS States and JavaScript Events"
  desc="CSS has always had pseudo-classes that style things when baed on user interactions. Recent features, however, are blurring the line between what CSS ”listens” for and how they are alternatives to what Javascript typically listens for."
  url="https://css-tricks.com/css-states-and-javascript-events"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/state-management.jpg"/>

CSS is listening to us. [<VPIcon icon="fas fa-globe"/>No, not like *that*](https://snopes.com/fact-check/is-amazons-alexa-emitting-unprompted-creepy-laughing/). Rather, CSS is accumulating more and more pseudo-classes to help us respond to JavaScript events so that we don’t have to do so with JavaScript itself. But while pseudo-classes track states, not events, they sure can feel like event listeners sometimes (not that it really matters in the context of CSS).

Then again, what *is* CSS these days? For example, there’s a [<VPIcon icon="iconfont icon-w3c"/>proposal for `event-trigger`](https://drafts.csswg.org/animation-triggers-1//#event-triggers) in the Animation Triggers spec, which would basically listen for events and trigger animations. If you ask me though, the syntax is capable of a lot more than that (think: [**invoker commands**](/css-tricks.com/invoker-commands-additional-ways-to-work-with-dialog-popover-and-more.md) but for CSS).

But to stay in today’s reality, I’ll walk you through the different CSS pseudo-classes out there that are kind of like event listeners, before doing the same for `event-trigger`, where I’ll show you how (I think) this currently unsupported feature would work.

---

## “Event listening” pseudo-classes

### `:hover` and `:active`

The [**`:hover`**](/css-tricks.com/almanac-pseudo-selectors/hover.md) state captures the moment from when the `pointerenter` event fires to when the `pointerleave` event fires, which perfectly illustrates why pseudo-classes are states, not events.

[**`:active`**](/css-tricks.com/almanac-pseudo-selectors/active.md) matches the target (e.g., a link or button) that’s currently being pressed with a mouse, finger, or stylus, which makes it akin to `pointerdown` and `pointerup`/`pointercancel`.

By the way, the [**`pointer-events: none`**](/css-tricks.com/almanac-properties/pointer-events.md) CSS declaration prevents pointer events from firing on the selected element!

### `:focus` and `:focus-visible`

The [**`:focus`**](/css-tricks.com/almanac-pseudo-selectors/focus.md) pseudo-class is akin to the `focus` and `blur` (unfocus) JavaScript events, but [**`:focus-visible`**](/css-tricks.com/almanac-pseudo-selectors/focus-visible.md) is a bit more complex. `:focus-visible` triggers when `:focus` does, but in addition, the browser uses a variety of heuristics to determine whether or not a focus indicator should be shown. Is the user operating with a keyboard? Is the element a form control? This really makes me appreciate what CSS offers. In fact, the best way to handle this using JavaScript is to query the CSS pseudo-class:

```js
element.addEventListener("focus", (event) => {
  if (event.target.matches(":focus-visible")) {
    /* Do something */
  }
});
```

### `:focus-within` (and `:has()`)

JavaScript excels at the “if A is Y, then do Z to B” kind of stuff. We can traverse the DOM, leverage event propagation, and much more. In that regard, CSS can feel a bit limited. However, CSS is evolving quickly. It has many new if-this-do-that features such as [**scroll-driven animations**](/css-tricks.com/unleash-the-power-of-scroll-driven-animations.md), and it’ll have more in the future. HTML is doing the same with dedicated components such as [**`<details>`**](/css-tricks.com/more-details-on-details.md), which all have accompanying CSS features.

I’ll mention some of that later, actually. In a more holistic sense, what we have is [**`:focus-within`**](/css-tricks.com/almanac-pseudo-selectors/focus-within.md), which matches if a child has focus, and [**`:has()`**](/css-tricks.com/almanac-pseudo-selectors/has.md), which accepts any valid selector and matches if such a relationship exists between the two selectors.

For example, these two selectors do the exact same thing:

```css
form:focus-within {
  /* Style the form when something within has focus */
}

form:has(:focus) {
  /* Style the form when something within has focus */
}
```

### `:checked`

It’s fairly obvious what [**`:checked`**](/css-tricks.com/almanac-pseudo-selectors/checked.md) does. The JavaScript event that’s most synonymous with it is `change`, which fires when the value of an `<input>`, `<select>`, or `<textarea>` changes (although, in this context, the `input` event is quite similar).

To listen for a check, we’d do something like this:

```js
checkbox.addEventListener("change", (event) => {
  if (event.target.checked) {
    /* Checked */
  } else {
    /* Not checked */
  }
});
```

CSS pseudo-classes often capture the moment between two JavaScript events (e.g., `pointerenter` and `pointerleave`), but when they’re not doing that, they’re handling logic instead, as above.

Let’s look at some more examples of hidden logic handling.

### `:valid`/`:invalid`/`:user-valid`/`:user-invalid`/`:autofill`

We don’t need the [**`:not()`**](/css-tricks.com/almanac-pseudo-selectors/not.md) pseudo-class function here, as validity can be checked using both the [**`:valid`**](/css-tricks.com/almanac-pseudo-selectors/valid.md) and [**`:invalid`**](/css-tricks.com/almanac-pseudo-selectors/invalid.md) pseudo-classes, but on the JavaScript side of things, there’s no `valid` event (only `invalid`). That being said, if using JavaScript, you’ll likely want to call the `checkValidity()` method (which actually fires the `invalid` event if it returns `false`) within the callback of the event listener for `input`, `change`, `blur` (to check validity when unfocusing from an element), or `submit` (to check validity of the entire form when submitting it, as below).

```js
form.addEventListener("submit", () => {
  if (form.checkValidity()) {
    /* All form controls are valid */
  } else {
    /* A form control is invalid (the invalid event fires) */
  }
});
```

We can also do this with the [<VPIcon icon="fa-brands fa-firefox"/>`ValidityState`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object, which doesn’t fire the `invalid` event, but does tell us why a form control is valid or invalid in the same way that HTML form validation does:

```js
input.addEventListener("input", () => {
  if (input.validity.valid) {
    /* Input is valid */
  } else {
    /* Input is invalid (the invalid event doesn’t fire) */
  }
});
```

The thing about HTML form validation is that it takes care of the entire front end, but if there’s a non-default behavior that you need, `checkValidity()` or `ValidityState` is what you’re looking for.

The pseudo-classes will work either way. A little too well, in fact! An easy thing to miss is that form controls trigger either `:valid` or `:invalid` immediately. However, `:user-valid` and `:user-invalid` wait for users to supply a value and unfocus before triggering. This is actually what the `change` event does (unless the element is a checkbox, radio button, dropdown list, color picker, or range slider), and what makes it different from the `input` event.

There isn’t a JavaScript event for auto-filling or even a clean way to detect it using JavaScript, but there *is* an `:autofill` pseudo-class.

---

## Media element pseudo-classes

Media element pseudo-classes are still new. They aren’t supported by Chrome yet and only landed in Firefox recently, but they are a part of [**Interop 2026**](/css-tricks.com/interop-2026.md) and soon we’ll be able to style `<audio>` and `<video>` elements based on their state without listening to JavaScript events. I’m sure you understand how this works by now, so here’s a quick rundown:

| Pseudo-class | JavaScript event equivalent |
| --- | --- |
| `:buffering` | `waiting` |
| `:muted` | `volumechange` (but see below) |
| `:paused` | `pause` |
| `:playing` | `playing` (not `play`) |
| `:seeking` | `seeking` |
| `:stalled` | `stalled` |
| `:volume-locked` | N/A, see below |

Use the `volumechange` event to detect mute:

```js
audio.addEventListener("volumechange", () => {
  if (audio.muted) {
    // Muted
  } else {
    // Not muted
  }
});
```

Detecting volume lock means trying to change the volume and checking for success. The best approach is to create an entirely new element so that we don’t trigger `volumechange` on the real one:

```js
// Create video
const video = document.createElement("video");

// Change volume
video.volume = 0.5;

if (video.volume !== 0.5) {
  // Volume locked
} else {
  // Volume not locked
}
```

(Or to use the `:volume-locked` pseudo-class, if writing CSS.)

### `:popover-open / :open / :modal`

As we might expect, there’s no JavaScript event for when a popover, `<dialog>`, or `<details>` opens or closes, but we can listen for the `toggle` event and then check the state:

```js
element.addEventListener("toggle", () => {
  if (element.open) {
    /* Popover/dialog/details open */
  } else {
    /* Popover/dialog/details not open */
  }
});
```

However, CSS offers these pseudo-classes right out of the box:

- `[**:popover-open**](/css-tricks.com/almanac-pseudo-selectors/popover-open/))` (for popovers)
- [**`:open`**](/css-tricks.com/almanac-pseudo-selectors/open.md) (for `<dialog>` and `<details>` elements)
- `:modal` (for modal `<dialog>`s and fullscreen elements)

Speaking of fullscreen elements…

### `:fullscreen`

The [**`:fullscreen`**](/css-tricks.com/almanac-pseudo-selectors/fullscreen.md) pseudo-class is synonymous with the `fullscreenchange` JavaScript event with a conditional baked in:

```js
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    /* fullscreenElement is fullscreen */
  } else {
    /* Nothing is fullscreen (fullscreenElement is null) */
  }
});
```

### `:target`

When a URL hash (e.g., `#contact`) matches an element’s ID (e.g., `<div id="contact">`), that element matches the [**`:target`**](/css-tricks.com/almanac-pseudo-selectors/target.md) pseudo-class. When using JavaScript, we have to listen for the `hashchange` event and then see if a matching element is found:

```js
window.addEventListener("hashchange", () => {
  const target = document.getElementById(window.location.hash.substring(1));

  if (target) {
    /* Matching element found */
  } else {
    /* Matching element not found */
  }
});
```

---

## Conclusion (but not really)

This isn’t a “JavaScript bad” rant but rather an appreciation for what CSS simplifies without forgetting the surgical control that JavaScript offers. More ways to do things is never a bad thing.

And on that note, I want to quickly mention `event-trigger`.

---

## Actual event listeners (`event-trigger`)

I came across [<VPIcon icon="iconfont icon-w3c"/>event triggers](https://drafts.csswg.org/animation-triggers-1/#event-triggers) when Chrome implemented scroll-triggered animations, as they’re in the same module, but they’re not supported by any web browser yet, so if I make any mistakes, I apologize. Let’s dive in.

`event-trigger-name` will accept a simple dashed ident:

```css
button {
  event-trigger-name: --event;
}
```

`event-trigger-source` will be the event listener, essentially.

It’ll accept the following keywords:

- `activate`
- `interest`
- `click`
- `touch`
- `dblclick`
- `keypress(<string>)`

```css
button {
  event-trigger-source: click;
}
```

I believe the `interest` keyword refers to the upcoming [**Interest Invoker API**](/css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers.md) whereas the `activate` keyword could depend on the element. For `<details>` for example, activation could mean *when opened*, but I’m not sure. Subsequent drafts of the spec should tell us more, and reveal more events.

Anyway, the events will trigger animations. First we’d create a `@keyframes` animation, then we’d attach it to the element to be animated, but the animation wouldn’t run until triggered by the event (whereas normally they’d run immediately).

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

div {
  animation: fade-in 300ms both;
}
```

Then we ensure that when the event fires, the animation triggers. We do this by setting `animation-trigger` alongside `animation`, referencing the dashed ident (`--event`). This has the optional benefit of allowing the event of one element to trigger the animation of another. Here’s a quick example, using the `event-trigger` shorthand this time:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

button {    
  /* On click, trigger --event animation */
  event-trigger: --event click;
}

div {
  /* When --event fires, play animation forwards */
  animation-trigger: --event play-forwards;

  /* Animation */
  animation: fade-in 300ms both;
}
```

This is what’s called a state*less* event trigger. Think about it — you can’t unclick a click, right? But we can lose interest, so here’s what a state*full* event-triggered animation would look like (notice the syntax for *two* events separated by a `/` and *two* animation actions, one for each state):

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

button {    
  /* interest (entry) / interest (exit) */
  event-trigger: --event interest / interest;
}

div {
  /* Play forward with interest, backward when losing it */
  animation-trigger: --event play-forwards play-backwards;

  /* Animation */
  animation: fade-in 300ms both;
}
```

Acceptable animation actions include:

- `none`
- `play`
- `play-once`
- `play-forwards`
- `play-backwards`
- `pause`
- `reset`
- `replay`

There are many combinations of events and animation actions that wouldn’t work, but these would be easy to sidestep because it wouldn’t make sense to use them. We could, however, trigger multiple different animations because `animation-trigger` is a reset-only sub-property `animation`. Here’s a rough example:

```css
animation-name: animationA, animationB;
animation-trigger: --eventA play, --eventB replay;
```

The possibilities are endless depending on how the W3C move forward with this feature (the spec mentions allowing for event bubbling!), but I kinda wish we could invoke JavaScript methods with event triggers like how HTML can with the Invoker Commands API.

What do you think? A step in the right direction, or does CSS need to stay in its lane?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Shifting Line Between CSS States and JavaScript Events",
  "desc": "CSS has always had pseudo-classes that style things when baed on user interactions. Recent features, however, are blurring the line between what CSS ”listens” for and how they are alternatives to what Javascript typically listens for.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-states-and-javascript-events.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
