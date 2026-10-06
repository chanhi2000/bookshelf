---
lang: en-US
title: "Custom Scrollbar Component In 2026"
description: "Article(s) > Custom Scrollbar Component In 2026"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Custom Scrollbar Component In 2026"
    - property: og:description
      content: "Custom Scrollbar Component In 2026"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/custom-scrollbar-component-in-2026.html
prev: /programming/css/articles/README.md
date: 2026-09-07
isOriginal: false
author:
  - name: Alexander Inkin
    url: https://blog.master.dev/author/alexanderinkin/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10882
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
  name="Custom Scrollbar Component In 2026"
  desc="Thanks to some very modern CSS, we can visually replicate the logic of scrollbars. Then make them actually functional. "
  url="https://blog.master.dev/custom-scrollbar-component-in-2026/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10882"/>

Your design system might require a specific visual aesthetic for the scrollbars.

Maybe you want them to **disappear** when the container is not hovered, or maybe you need custom colors, shapes, and hover effects. Unfortunately, the native ability to style scrollbars is very limited, so if you face any of those requirements, your only option is to create a custom component. To do so, you would need to handle the following tasks:

1. You need to know when to show scrollbars
2. You need to know how large a bar should be
3. You need to know where to position the bar
4. You need to be able to drag a bar to scroll the container
5. The bar needs to respond to scrolling that happens in other ways

We can implement that 4th one with a somewhat trivial drag-and-drop interaction. And for the rest, you would typically use a combination of [<VPIcon icon="fa-brands fa-firefox"/>ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) and a [<VPIcon icon="fa-brands fa-firefox"/>scroll](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event) event listener to do some JavaScript arithmetic and compute all the values you need. However, that might cause reflows when reading `offsetHeight`/`scrollHeight`; scroll events fire multiple times per second, and manually updating DOM values is a costly operation required to keep the scrollbar accurately positioned and sized.

**But what if I told you that in 2026 you no longer need JavaScript to do those _at all_?** Let’s explore how [<VPIcon icon="fa-brands fa-firefox"/>scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) (available on Chrome, Safari and Firefox Nightly) can do all the work for us.

::: warning Accessibility Disclaimer

I’m not an accessibility expert, and as with all things custom, there might be some caveats I’ve missed. But since this technique doesn’t interfere with native scrolling mechanics and focuses solely on bar customization, it should be fine for most users.

:::

---

## Placing The Scrollbars

Before we get to the task at hand, we need to figure out how to position the bars inside our scroll container. We want them fixed to the container frame, but if we use absolute positioning, they will scroll out of view with the rest of the content. Previously, I [wrote about this situation (<VPIcon icon="fa-brands fa-dev"/>`waterplea`)](https://dev.to/waterplea/css-challenges-for-200-iq-ghl) and how `position: sticky`, with clever margin/floating hacks, can help us achieve what we are looking for. You should definitely check that article out if you like styling puzzles to scratch your head about. But here we are focusing on cutting-edge CSS of 2026, and therefore we can rely on a modern solution – [<VPIcon icon="fa-brands fa-firefox"/>anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Anchor_positioning). Here’s the general outlook of how our component would look:

```jsx
<scrollbar>
  …
  <bars>
    <bar />
    <bar />
  </bars>
</scrollbar>
```

While the scrollbar obviously has two axes, we will only focus on the vertical one for simplicity. Everything I explain here is equally applicable to the horizontal axis. To place our bars, we will define an anchor on the scrollbar and use it in the bars element:

```css
.scrollbar {
  anchor-scope: --scrollbar;
  anchor-name: --scrollbar;
}

.bars {
  pointer-events: none;
  position: absolute;
  position-anchor: --scrollbar;
  inset: anchor(top) anchor(right) anchor(bottom) anchor(left);
}
```

Now our bars container is perfectly positioned on top of the scroll container regardless of scrolling, and we can use absolute positioning inside it to place the actual bars. We also add an anchor-scope rule — we do not want the bars to snap to any other scrollbar on the page.

---

## Setting Up Animations

Our animations would rely on the scroll progress. First, we will hide native scrollbars, define [<VPIcon icon="fa-brands fa-firefox"/>`timeline-scope`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/timeline-scope) and [<VPIcon icon="fa-brands fa-firefox"/>`scroll-timeline`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-timeline) (default axis is vertical) as well as default variable values:

```css
.scrollbar {
  scrollbar-width: none;
  scroll-timeline: --scrollbar;
  timeline-scope: --scrollbar;
  
  --opacity: 0;
  --events: none;
}
```

To set the bar’s position using variables, we first need to define them as numbers so they can be animated. And then set basic animations to track progress:

```css
@property --start {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}

@property --end {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}

@keyframes top {
  from { --start: 1 }
  to   { --start: 0 }
}

@keyframes bottom {
  from { --end: 0 }
  to   { --end: 1 }
}
```

We also need another animation that shows our scrollbar when the content overflows the container. We will use the same values for both from and to, since it only triggers when there is enough content to scroll.

```css
@keyframes bar { 
  from, to { 
    --opacity: 1;
    --events: auto;
  }
}
```

---

## Applying Styles

Now let’s apply all those animations with a linear timing function:

```css
.bar {
  animation-name: top, bottom, bar;
  animation-timing-function: linear;
  animation-timeline: --scrollbar;
}
```

Transitioning CSS variables based on scroll position can help us move the bar from top to bottom. But we also need the bar size to reflect the container’s total scroll amount. This means the top end of the bar starts at 0 but finishes **before** it reaches 100%. We can achieve this effect using [<VPIcon icon="fa-brands fa-firefox"/>`animation-range`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-range). If we “pretend” there is one more `offsetHeight` to scroll through, then our animation progress will stop at the right spot when we scroll our container all the way to the bottom.

But how can we tell the animation range to extend to this exact amount? Another cool CSS feature called [<VPIcon icon="fa-brands fa-firefox"/>Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) will help us this time! Our bars container matches the dimensions of the scroll container thanks to anchor positioning, so we can mark it as a `size` container:

```css
.bars {
  container-type: size;
}
```

Now its children have access to its size, and we can define `animation-range` to change from `0%` to `100% + 100cqb`. The same, but in reverse, from `0% - 100cqb` to 100% will move the bottom end of the bar in sync, giving the bar proper height that reflects `offsetHeight` by `scrollHeight` ratio. We also need `animation-fill-mode` to hold on to the values at the very edges of the scroll.

```css
.bar {
  animation-range: 0% calc(100% + 100cqb), calc(0% - 100cqb) 100%;
  animation-fill-mode: both;
}
```

The final step is to apply the resulting styles to the bar. We also need to be mindful of super-long scrolls – we do not want our bar to become too small for the user to see and interact with. We can use a combination of `min-block-size` and [<VPIcon icon="fa-brands fa-firefox"/>`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/min) CSS function to keep positioning from squishing our bar under extreme conditions.

```css
.bar {
  min-block-size: 1rem;
  inset-block-start: min(calc(100% - var(--start) * 100%), calc(100% - 1rem));
  inset-block-end: calc(100% - var(--end) * 100%);
  opacity: var(--opacity);
  pointer-events: var(--events);
}
```

---

## Implementing User Interaction

Since our scrollbar component is just a scroll container with a native scrollbar hidden, most user interactions work out of the box: the container becomes keyboard-focusable when it overflows, arrow keys and page up/down can scroll it as usual, the same for the mouse wheel or touchpad, and for mobile touch scrolling. The only remaining interaction we need to worry about is pointer drag. JavaScript implementation is pretty straightforward. Upon the `pointerdown` event we need to query a few things, namely `pageX`/`pageY` of an event and our scrollbar state, so we know the starting values. One thing we need to keep in mind here is `scrollLeft` becomes negative in right-to-left languages, so we need to check for a multiplier as well:

```js
bar.addEventListener('pointerdown', ({ pageX, pageY }) => {
  const { scrollTop, scrollLeft, offsetHeight, offsetWidth, scrollHeight, scrollWidth } = scrollbar;
  const rtl = scrollbar.matches('[dir="rtl"] :scope') ? -1 : 1;

  // …
```

Next, we need a `pointermove` event listener that would call `scrollTo` with `behavior: 'instant'` to override any `scroll-behavior` CSS rule that might exist up the DOM hierarchy:

```js
const move = e => {
  const top = vertical ? scrollTop + (e.pageY - pageY) / offsetHeight * scrollHeight : scrollTop;
  const left = vertical ? scrollLeft : scrollLeft + rtl * (e.pageX - pageX) / offsetWidth * scrollWidth;

  scrollbar.scrollTo({ top, left, behavior: 'instant' });
};
```

Then we need to wire up those events and make sure we remove event listeners once the drag action ends:

```js
const end = () => {
  document.removeEventListener('pointermove', move);
  document.removeEventListener('pointerup', end);
  document.removeEventListener('pointercancel', end);
  document.removeEventListener('contextmenu', end);
}

document.addEventListener('pointermove', move);
document.addEventListener('pointerup', end);
document.addEventListener('pointercancel', end);
document.addEventListener('contextmenu', end);
```

---

## Conclusion

That’s it! Now our scrollbar can be interacted with thanks to a few lines of basic JavaScript, and the rest is handled by CSS. You can check out the complete demo in the Pen below:

<CodePen
  user="anon"
  slug-hash="zxNRZKO"
  title="view-timeline scrollbar"
  :default-tab="['css','result']"
  :theme="dark"/>

Practical reasons for considering this approach include:

- Design system uniformity across browsers and OS.
- Desire to keep scrollbars overlaid on all platforms (since [<VPIcon icon="iconfont icon-caniuse"/>`overflow: overlay`](https://caniuse.com/css-overflow-overlay) removal, it’s practically unattainable with native scrollbars on Windows). Or the other way around, if you have clearly defined edges inside the container and do not want scrollbars to overlay those on macOS.
- Reducing visual noise with many scrollable containers at once
- Elaborate custom designs for a *wow* effect that your designers came up with, and now it’s upon you to implement.

That’s why we see custom scrollbars all over the web, from giants like Facebook, Discord, and Spotify to WYSIWYG editors like VS Code for the web or CodePen. Check out some more demos below to see examples of such behaviors:

<CodePen
  user="anon"
  slug-hash="rajEjbw"
  title="Custom Scrollbar designs"
  :default-tab="['css','result']"
  :theme="dark"/>

```component VPCard
{
  "title": "Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements",
  "desc": "There was quite a long period of time (say 2011-2024) where if you wanted to style scrollbars in CSS, your best bet was using the pseudo elements ::-webkit-scrollbar and friends (there were about 7 of them). That got you custom scrollbars in Safari and Chrome and offshoots. Firefox never supported those. They were never really […]",
  "link": "/blog.master.dev/heads-up-on-custom-scrollbars-chrome-is-supporting-the-standard-now-which-overrides-the-old-pseudo-elements.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Scroll-Locked Dialogs",
  "desc": "I just wrote about the <dialog> element, with some basic usage and things to watch for. It’s a great addition to the web platform. Here’s another interesting thing we can do, connecting it to another one of my favorite new things on the web platform: :has(). (You can see I’ve been pretty into it lately.) […]",
  "link": "/blog.master.dev/scroll-locked-dialogs.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Downsides of scrollbar-gutter: stable; (and one weird trick)",
  "desc": "It maintains space for where a scrollbar would be, whether there actually is one or not. But do you always want that?",
  "link": "/blog.master.dev/the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom Scrollbar Component In 2026",
  "desc": "Thanks to some very modern CSS, we can visually replicate the logic of scrollbars. Then make them actually functional. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/custom-scrollbar-component-in-2026.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
