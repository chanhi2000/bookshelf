---
lang: en-US
title: "Animating Focus with View Transitions"
description: "Article(s) > Animating Focus with View Transitions"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Animating Focus with View Transitions"
    - property: og:description
      content: "Animating Focus with View Transitions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/animating-focus-with-view-transitions.html
prev: /programming/css/articles/README.md
date: 2026-05-06
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9551
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
  name="Animating Focus with View Transitions"
  desc="Let's try a fresh take on animating focus rings around a page. Flying focus, as it were. Only instead of measuring where elements are ourselves, we'll let View Transitions figure it out."
  url="https://blog.master.dev/animating-focus-with-view-transitions/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9551"/>

The big idea here is animating the focus ring around literally-focused elements on web pages. Like the `:focus` (or `:focus-visible`) styles, either the default or your own.

**I’m just going to go ahead and say this idea I’m about to play with probably isn’t a good idea.** It’s a bunch of probably-unnecessary motion. Nobody is asking for it.

Although I *say* that, and [<VPIcon icon="fas fa-globe"/>the WebAIM website](https://webaim.org/blog/new-webaim-website/), a site literally all about web accessibility, does it.

<VidStack src="videopress/2RXL6BF0" />

If you can’t see the video, imagine blue focus outlines around things like navigation links and breadcrumb nav links that have a “flying” animation between them as you tab through the page.

Jared says:

> To help ensure high accessibility for sighted keyboard users, we’ve added some nifty keyboard focus indicators for links and form controls. A distinctive color change and slight transition draw visual attention to focused links. Additionally, **scripting provides a focus ‘trace’ or ‘flying focus’ to help the user follow the visual focus. Tab through the links on this page to see it in action.**

Emphasis mine. They certainly know more about web accessibility than I do! I also note their implementation respects `prefers-reduced-motion`, which seems highly relevant.

Me, I just find all this a fun and interesting challenge, especially since there is a long line of people doing it over the years, and now there is new tech to add to the party.

I thought of this after recently reading Ben Nadel’s [<VPIcon icon="fas fa-globe"/>“Animating DOM Rectangles Over Focused Elements In JavaScript.”](https://bennadel.com/blog/4864-animating-dom-rectangles-over-focused-elements-in-javascript.htm) Ben’s implementation, along with several others I looked at, involves having a reference in JavaScript to the focused element, measuring its location and dimensions with things like `getBoundingClientRect` and/or `getClientRects` (in case the lines of text break) then animating/transitioning between the new numbers you get.

That’s fine, I suppose. But in my experience, measuring things in JavaScript isn’t particularly performant, nor is animating values like `top` and `left`. Maybe we could use [<VPIcon icon="fas fa-globe"/>FLIP](https://aerotwist.com/blog/flip-your-animations/) somehow? Maybe we could make the focused elements *anchors* then use [**AIM**](/nerdy.dev/anchor-interpolated-morphing.md)? That all sounds kind of fun, but what came to mind first for me was View Transitions.

---

## Let’s Do View Transitions

View Transitions can do *tweening*, which should work nicely for us here. Short story, if an element has a unique `view-transition-name` on it, and you call `startViewTransition()` and mess around with the DOM (in our case, moving focus from one element to another), then that same element (or another) has that same `view-transition-name`, it will literally animate from one state to the next. Even “fly” to the next position, which is exactly what we’re after.

So we’re doing JavaScript here. There is a thing called multi-page View Transitions, and they are great, but we’re not dealing with multiple pages; we’re just dealing with moving focus around a single page.

Our job is to *do something that changes the DOM* inside the View Transition, and it will just magically animate. I swear, it’s weird. So what we’ll do is: we will manually move the focus ourselves, like with a `.focus()` call. That’s the DOM change, and it’s enough to animate from the old element with focus and focus styles to the new element with focus and focus styles.

It’s surprising to me that this actually works.

<VidStack src="https://videopress.com/b88d2830-9ec8-46c4-a313-4374a3815999" />

What kinda sucks is that we’re hijacking the Tab key presses to do this:

```js
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  if (!document.startViewTransition) return; // graceful fallback

  const focusables = [...document.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(el => el.offsetParent !== null); // skip hidden

  const i = focusables.indexOf(document.activeElement);
  if (i === -1) return; // focus is somewhere weird, let browser handle it

  e.preventDefault();
  const dir = e.shiftKey ? -1 : 1;
  const next = focusables[(i + dir + focusables.length) % focusables.length];

  document.startViewTransition(() => next.focus());
});
```

Sucky, meaning the Tab key certainly isn’t the only way elements receive focus, but that’s all we’re dealing with here. In Ben’s demo, he’s doing the work on a `focusin` event, which will work no matter how an element gets focus. But if I did that here, the DOM change has already happened, and it’s too late for a View Transition. I’m sure there are ways to make this approach more comprehensive, it’s just too silly a project for me to dig that deep.

Here are things so far:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019df561-075c-7315-b61a-8d6e58493e7e"
  title="View Transition Focus Movement (1)"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s also kinda sucky we’re in charge of deciding what elements can be focusable. My list is excluding `<summary>`, for example, which is a foul. I’m leaving it off on purpose to emphsize the suck.

---

## Cross-Fade Weirdness

If we slow down our demo above, we’ll see some extra funky behavior. We can do that like:

```css
::view-transition-group(focus-ring) {
  animation-duration: 5s;
  animation-timing-function: cubic-bezier(.4, 0, .2, 1);
}
```

<VidStack src="https://videopress.com/3fe42c3e-b29d-4d6f-b8df-bae615a5bbe3" />

I don’t exactly know how to fix that. There are all sorts of fancy View Transitions pseudo-elements to control parts of the animation, but I don’t think any of them do quite what I want here. What I’d like to see is only that pink rectangle moving around, nothing inside it. That pink rectangle is on the element itself. I don’t think there is any CSS thing for “make myself transparent but my outline still visible”. We could fake it, and we’ll get to that next, but otherwise, I don’t think there is a way.

Could we kinda “black out” the middle, though?

If we add a class to the document during the View Transition, we could “cover” the element with a background color while it’s transitioning.

```css
.focus-transitioning :focus-visible::after {
  content: "";
  position: absolute;
  inset: 0;
  background: Canvas;
  border-radius: inherit;
}
```

<VidStack src="https://videopress.com/905ac1ea-eef4-4906-ac54-b66aae8c7878" />

Nahhh, still be pretty gross. But here it is anyway:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019dfafc-3f0f-75d8-8584-ccb63e221132"
  title="View Transition Focus Movement (2)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Using a Child Element

I think the trick is going to be using a `<span>` (some meaningless child element) to behave like the `:focus-visible` styling would. So essentially we don’t have any `:focus-visible` styling directly, we use the `<span>` to replicate it. This is because the `<span>` doesn’t have any children that will move around. It can be an empty ring that flies around.

```html
<button>
  Actual Button Text
  <span class="focus-ring" aria-hidden="true"></span>
</button>
```

But there is a funky trick…

The actual `<span>` doesn’t move. Every focusable element has it’s own `<span>` that behaves as a focus ring. It’s just that different `<span>`s becomes visible when the focus changes.

```css
a, button {
  position: relative;
}

a:focus-visible,
button:focus-visible {
  outline: none; /* the span is the ring now */
}

span.focus-ring {
  position: absolute;
  inset: -6px;
  border: 2px solid deeppink;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
}

/* Visible + named only when the parent is focused */
:is(a, button):focus-visible > span.focus-ring {
  opacity: 1;
  view-transition-name: focus-ring;
}
```

So when one ring disappears and another appears, that’s the DOM change that is relevant and that the View Transition will take care of tweening.

How about them apples?

<VidStack src="https://videopress.com/2d4df082-106a-4455-80c9-8281ff2b4edf" />

That’s just the kind of look we were shooting for all along. Still don’t love binding to the Tab key and all, but overall I think this is an interesting addition to the grand history of flying focus.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019dff8d-6d05-725b-beba-10710e805dab"
  title="View Transition Focus Movement (3)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Two Little Bonus Things

### 1. Aspect Ratio During Transitons Is A Thing

If you’re ever transitioning elements that might change in aspect ratio, like we are definitely doing here as it’s totally random focused elements, then read Jake’s [<VPIcon icon="fas fa-globe"/>View transitions: Handling aspect ratio changes](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/). Essentially you fiddle with things like `object-fit` to ensure the changes in size between the two elements don’t render too weird while tweening.

### 2. Honor Reduced Motion

Easy enough. Default cross-fades *might* be OK and not impart too much motion, but automatic movement might still happen, so in my opinion, best to just nuke the animation entirely.

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none;
  }
}
```

::: info Other Prior Art

- [https://n12v.com/focus-transition/](https://n12v.com/focus-transition/)

```component VPCard
{
  "title": "Focus transition",
  "desc": "Keyboard navigation has a major downside: it’s not clear where the focus moves upon pressing the Tab key. Animation makes the transition more apparent.",
  "link": "https://n12v.com/focus-transition//",
  "logo": "https://n12v.com/favicon.ico",
  "background": "rgba(14,114,206,0.2)"
}
```

```component VPCard
{
  "title": "Focus Overlay",
  "desc": "Library for creating overlays on focused elements. Use the tab key to focus elements around the page.",
  "link": "https://focusoverlay.js.org/",
  "logo": "https://focusoverlay.js.org/icons/icon-48x48.png?v=f93f67ae3ac714e2b0f02be4b5e02bcd",
  "background": "rgba(95,77,147,0.2)"
}
```

```component VPCard
{
  "title": "flying-focus documentation",
  "desc": "Polymer component to adds a transition to the focus outline when you tab around inputs, buttons, and links. Based on Focus Transition and examples inside WebAIM.org.",
  "link": "https://felixzapata.github.io/flying-focus-element/components/flying-focus-element/",
  "logo": "https://felixzapata.github.io/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

<CodePen
  user="hchiam"
  slug-hash="MWKKxdW"
  title="Animated position “flying focus ring” - modularized CDN code"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Animating Focus with View Transitions",
  "desc": "Let's try a fresh take on animating focus rings around a page. Flying focus, as it were. Only instead of measuring where elements are ourselves, we'll let View Transitions figure it out.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/animating-focus-with-view-transitions.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
