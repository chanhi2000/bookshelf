---
lang: en-US
title: "Cross-Document View Transitions: Scaling Across Hundreds of Elements"
description: "Article(s) > Cross-Document View Transitions: Scaling Across Hundreds of Elements"
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
      content: "Article(s) > Cross-Document View Transitions: Scaling Across Hundreds of Elements"
    - property: og:description
      content: "Cross-Document View Transitions: Scaling Across Hundreds of Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/cross-document-view-transitions-part-2.html
prev: /programming/css/articles/README.md
date: 2026-05-25
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://css-tricks.com/author/durgeshpawar/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/dots-loader.jpg
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
  name="Cross-Document View Transitions: Scaling Across Hundreds of Elements"
  desc="Every view-transition-name on a page must be unique. The problem is that every pseudo-element selector in your CSS targets a specific name, so your animation styles explode into an unmanageable wall of selectors."
  url="https://css-tricks.com/cross-document-view-transitions-part-2"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/dots-loader.jpg"/>

In [**Part 1**](/css-tricks.com/cross-document-view-transitions-part-1.md), we covered the gotchas that bite you first: the deprecated meta tag that silently does nothing, the 4-second timeout that kills transitions without telling you, the image distortion that turns every aspect ratio change into silly putty, and the `pagereveal`/`pageswap` events that give you hooks into the transition lifecycle.

All of that gets you from “nothing works” to “one element transitioning nicely between two pages.” Which feels great. For about five minutes. Then you try to build a product listing page with 48 cards that each need to morph into a detail view, and you realize the tutorials left out the hard part.

This is where it gets real. Let’s scale this thing.

::: info Cross-Document View Transitions Series

```component VPCard
{
  "title": "Cross-Document View Transitions: The Gotchas Nobody Mentions",
  "desc": "This is Part 1 of a two-part series about cross-document view transitions, going over all the gotchas, from ditching the deprecated way to opt into them to a little-known 4-second timeout.",
  "link": "/css-tricks.com/cross-document-view-transitions-part-1.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Cross-Document View Transitions: Scaling Across Hundreds of Elements",
  "desc": "Every view-transition-name on a page must be unique. The problem is that every pseudo-element selector in your CSS targets a specific name, so your animation styles explode into an unmanageable wall of selectors.",
  "link": "/css-tricks.com/cross-document-view-transitions-part-2.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## The Dream: One Line, Infinite Names

In a perfect world, you’d solve the scaling problem with pure CSS. No JavaScript. No server-side loops. Just this:

```css
.card {
  /* Generates card-1, card-2, card-3, etc. automatically */
  view-transition-name: ident("card-" sibling-index());
}
```

That’s [**`ident()`**](/bram.us/the-future-of-css-construct-custom-idents-and-dashed-idents-with-ident.md) — a CSS function [proposed by Bramus (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9141) (who works on Chrome) to the CSS Working Group. It takes strings, integers, or other identifiers, concatenates them, and spits out a valid CSS name. Pair it with `sibling-index()`, which returns an element’s position among its siblings (1, 2, 3…), and you get auto-generated unique names for every element in a list. One rule. Works for 10 cards or 10,000. The CSS doesn’t care.

And it’s not just view transitions. The same pattern works for `scroll-timeline-name`, `container-name`, `view-timeline-name` — anywhere you need unique identifiers at scale. You could even pull names from HTML attributes with `attr()` instead of `sibling-index()`, constructing identifiers like `ident("--item-" attr(id) "-tl")`. The flexibility is real.

Here’s the thing: half of this equation already exists. `sibling-index()` shipped in Chrome 138 — you can use it today for things like staggered animations and calculated styles. The missing piece is `ident()`. There’s a [<VPIcon icon="fa-brands fa-chrome"/>Chrome Intent to Prototype](https://chromestatus.com/feature/6230159413477376) from May 2025, which means it’s on the radar. But “on the radar” and “in your browser” are very different things. No browser ships `ident()` yet, and there’s no timeline for when it’ll land.

So we can’t use it yet. But it’s worth knowing about because once `ident()` ships, a huge chunk of the complexity you’re about to see just… evaporates. Until then, here’s how you solve the same problem efficiently today — with the tools that actually exist in browsers right now.

---

## 100 Products, 100 Names, 1 Nightmare

Here’s what happens when you follow a tutorial that shows one hero image transitioning between two pages and try to apply that pattern to a grid:

```css
/*  THE NIGHTMARE - one rule per item, forever */
::view-transition-group(card-1),
::view-transition-group(card-2),
::view-transition-group(card-3),
::view-transition-group(card-4),
::view-transition-group(card-5),
::view-transition-group(card-6),
::view-transition-group(card-7),
::view-transition-group(card-8)
/* ... imagine 92 more of these */ {

  animation-duration: 0.35s;
  animation-timing-function: ease-out;
}

::view-transition-old(card-1),
::view-transition-old(card-2),
::view-transition-old(card-3)
/* kill me */ {
  object-fit: cover;
}
```

That’s what you end up with if you follow the tutorials that only show one or two named elements. They assign `view-transition-name: hero` to one image and call it a day. Cool. Now try building a product grid.

Every `view-transition-name` on a page must be unique. That’s a hard rule — if two elements share a name, the browser doesn’t know which one maps to which on the next page, so it throws the whole transition out. On a listing page with 48 products, you need 48 unique names. On a photo gallery with 200 thumbnails, you need 200. The names aren’t the problem — you can generate those. The problem is that every pseudo-element selector in your CSS targets a *specific name*, so your animation styles explode into an unmanageable wall of selectors.

This is where you need to understand the difference between two properties that sound like they do the same thing but absolutely do not.

---

## Name vs. Class: The Distinction That Changes Everything

And yeah, the naming here is confusing. I’ll be honest: the first time I saw [**`view-transition-name`**](/css-tricks.com/almanac-properties/view-transition-name.md) and [**`view-transition-class`**](/css-tricks.com/almanac-properties/view-transition-class.md) next to each other, I thought they were interchangeable. They’re not, and the difference matters.

**Name = identity.** It answers: “Which element on Page A is the *same element* on Page B?” When you give a thumbnail `view-transition-name: card-7` on the grid page and give the hero image `view-transition-name: card-7` on the detail page, you’re telling the browser those are the same thing and to animate between them. Names must be unique per page. Two elements can’t both be `card-7` or the whole thing breaks.

**Class = styling hook.** It answers: “How should the animation *look*?” When fifty elements all have `view-transition-class: card`, you can write one CSS rule that controls the duration, easing, and `object-fit` for all of them. It’s the same mental model as CSS classes on regular elements — `.btn` doesn’t identify a specific button, it says “style me like a button.”

Think of it like a database. The `name` is the primary key — unique, identifies one specific row. The `class` is a category column — groups rows together so you can run a query across all of them at once.

Here’s what that looks like in practice:

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019d6d66-12e8-7bcd-9484-6c2b4020ff38"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

There it is. Six cards, six unique names, but exactly *three* CSS rules handling all the animation behavior. Could be sixty cards. Could be six hundred. The CSS doesn’t change.

The key line is that selector: `::view-transition-group(*.card)`. The asterisk is a wildcard for the name, and `.card` matches the `view-transition-class`. It reads as “any view transition group whose element has `view-transition-class: card`, regardless of what its specific name is.”

For cross-document multi-page application (MPA) transitions, the pattern is the same but you generate the names on the server:

```html
<!-- Page A -->
<div class="grid">

  <!-- ... -->

  <a
    href="/product/42"
    class="card"
    style="view-transition-name: product-42; view-transition-class: card"
  >
    <img src="/images/42-thumb.jpg" alt="Widget" />
  </a>
  <a
    href="/product/43"
    class="card"
    style="view-transition-name: product-43; view-transition-class: card"
  >
    <img src="/images/43-thumb.jpg" alt="Gadget" />
  </a>
</div>
```

```html
<!-- Page B -->
<div
  class="product-hero"
  style="view-transition-name: product-42; view-transition-class: card"
>
  <img src="/images/42-hero.jpg" alt="Widget" />
</div>
```

```css
/* ONE stylesheet, shared by all pages, handles every product */
@view-transition {
  navigation: auto;
}

::view-transition-group(*.card) {
  animation-duration: 0.35s;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

::view-transition-old(*.card),
::view-transition-new(*.card) {
  object-fit: cover;
}
```

That’s the entire animation stylesheet for a site with thousands of products. Three rules. No matter how many items you have in the database, you never add another line of transition CSS.

Before `view-transition-class` existed, people were doing horrifying things — looping through items in JavaScript to generate `<style>` blocks with hundreds of selectors, or using CSS preprocessors to spit out every possible name permutation at build time. It worked, technically, the same way duct-taping a car bumper works technically.

`view-transition-class` is the spec authors acknowledging that the original API just didn’t scale, and fixing it the right way.

One gotcha: `view-transition-class` was added to the spec later to fix these exact scaling issues. The property landed in Chrome 125 and is now in Chrome, Edge, and Safari 18.2+. Older Chromium versions and Firefox won’t recognize it yet. The transitions will still *work*, they’ll just use the default fade animation instead of your custom timing. Not the worst fallback.

<BaselineStatus featureid="view-transition-class" />

You can also assign multiple classes to a single element, just like regular CSS classes. Something like `view-transition-class: card featured` is valid, and you can target it with either `::view-transition-group(*.card)` or `::view-transition-group(*.featured)`. Handy when you want most products to transition the same way but need a few to stand out with a different animation style.

---

## Don’t Name Everything Upfront

Everything so far has had `view-transition-name` sitting right there in the HTML or CSS from the moment the page loads. That works. But it has a cost that’s not obvious until you hit real-world scale.

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019d6873-fe02-7118-ab51-1d132912c3ca"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Look at the CSS for both pages. Zero `view-transition-name` declarations. None. Every card in the grid is anonymous until the exact moment the user clicks one.

Here’s why that matters. When you put `view-transition-name` on an element in your stylesheet — just sitting there in CSS, assigned from page load — you’re telling the browser, “This element participates in every transition that happens on this page.” Every single navigation. The browser has to snapshot it, calculate its position, and set up the pseudo-element tree for it. For one hero image, who cares? For a grid of 48 product cards, that’s 48 elements being individually captured, diffed, and animated when the user only clicked *one* of them. The other 47 snapshots are pure waste.

On a fast machine you might not notice. On a mid-range Android phone loading a grid of product images over LTE? You’ll feel it. The transition stutters or the browser just skips it entirely because it can’t set everything up fast enough.

The fix is to treat `view-transition-name` like a just-in-time thing. Assign it at the moment of interaction, not at page load.

The lifecycle goes like this:

1. User clicks a card on the listing page.
2. Browser starts navigating — `pageswap` fires on the old page.
3. Your `pageswap` handler looks at `event.activation.entry.url` to figure out *where* the user is going, finds the clicked card, slaps `view-transition-name: product-42` on it.
4. Browser snapshots that one named element (plus the default `root` transition).
5. Navigation happens, new page loads.
6. `pagereveal` fires on the incoming page.
7. Your `pagereveal` handler reads the URL, finds the hero element, assigns the matching `view-transition-name: product-42`.
8. Browser sees matching names on old and new snapshots — morphs between them.
9. Transition finishes, your `.finished` promise resolves, you clear the names.

That’s it. One element named, one element transitioned, zero waste.

The `event.activation` object is your best friend here. On the outgoing page, `event.activation.entry.url` tells you where the navigation is headed. On the incoming page, you just read `window.location`. Between the two, you have everything you need to figure out which element to name without any global state, no `sessionStorage` tricks, no query parameter gymnastics beyond what your app already uses.

And about that cleanup step, removing the name after `.finished` resolves? It’s not just tidiness. If the user navigates back to the listing page and clicks a *different* card, you don’t want the old card still carrying a name from the previous transition. Stale names cause duplicate-name conflicts (instant transition death) or wrong-element matching (the new page morphs from the wrong card). Clean up after yourself.

This pattern is basically what [<VPIcon icon="iconfont icon-astro"/>Astro’s `transition:name`](https://docs.astro.build/en/guides/view-transitions/#naming-a-transition) directive does under the hood. Same with [<VPIcon icon="iconfont icon-nuxt"/>Nuxt’s view transition support](https://nuxt.com/docs/3.x/getting-started/transitions). They dynamically assign and remove names around the navigation lifecycle. The frameworks just hide the `pageswap`/`pagereveal` wiring behind a component attribute. You’re doing the same thing, just without the abstraction layer. Fewer moving parts, same result.

---

## Practical Patterns for Real Content

The product grid example covers the most common case, but let’s run through a couple of other patterns you’ll hit in the wild.

### Photo Galleries with Mixed Aspect Ratios

Galleries are tricky because every thumbnail might have a different aspect ratio, and the full-size view definitely will. The taffy fix from the Part 1 article is essential here, but you also want the transition to feel intentional rather than chaotic.

```css
/* Gallery items get their own class for targeted animation */
::view-transition-group(*.gallery-item) {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
}

::view-transition-old(*.gallery-item),
::view-transition-new(*.gallery-item) {
  object-fit: cover;
  overflow: hidden;
}

/* Lightbox-style overlay - fade the background separately */
::view-transition-group(*.lightbox-bg) {
  animation-duration: 0.3s;
}
```

The trick with galleries is assigning the `view-transition-name` to the `<img>` itself rather than the surrounding card or container. You want the browser to morph the image from thumbnail size to lightbox size, not the card’s background, padding, and caption along with it. Name the image. Style the card. Keep them separate.

For the lightbox background (that dark overlay), give it its own `view-transition-name` and `view-transition-class`. It’ll fade in independently while the image morphs. Two transitions running in parallel, each with their own timing. Looks polished, and it’s just two names.

### Tab or Section Transitions Within a Page

Not everything is a grid-to-detail pattern. Sometimes you’re transitioning between sections on the same page, e.g., dashboard tabs, multi-step forms, content panels. Same-document view transitions work great here, and the `view-transition-class` approach scales the same way.

```css
/* Shared header that persists across tabs */
::view-transition-group(*.persistent) {
  animation-duration: 0s; /* don't animate - it should feel anchored */
}

/* Tab content that swaps */
::view-transition-group(*.tab-content) {
  animation-duration: 0.25s;
}

::view-transition-old(*.tab-content) {
  animation: slide-out-left 0.25s ease-in;
}

::view-transition-new(*.tab-content) {
  animation: slide-in-right 0.25s ease-out;
}

@keyframes slide-out-left {
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
}
```

The `animation-duration: 0s` on persistent elements is worth calling out. If your site header has a `view-transition-name` (so it stays in place instead of participating in the default root cross-fade), you probably don’t want it animating at all. Zero-duration makes it snap to its new position instantly, which feels like it never moved. That’s the point — stable landmarks make the transitioning content feel grounded.

### Dynamic Content and Infinite Scroll

Here’s a pattern that catches people off guard. You’ve got a product grid with infinite scroll, loading new items as the user scrolls down. Each new batch arrives via `fetch()` and gets appended to the DOM. Do those new items need `view-transition-name`?

No. Not until someone clicks one.

With the just-in-time pattern, it doesn’t matter whether an element existed at page load or was added dynamically five minutes later. The `pageswap` handler queries the DOM at the moment of navigation. If the element is there, it finds it, names it, done. Your infinite scroll items work identically to your initial page load items without any extra setup.

The one thing to watch out for: make sure your `data-id` attributes (or whatever you’re using to match elements) are unique across all loaded batches. If your API returns items with IDs and you’re using those for the `view-transition-name`, you’re already fine. If you’re generating IDs client-side, make sure they don’t collide when new batches load.

---

## Don’t Make People Sick

```css :collapsed-lines
/* The responsible way to set up view transitions */
@view-transition {
  navigation: auto;
}

/* All your animation customizations go INSIDE this media query */
@media (prefers-reduced-motion: no-preference) {
  ::view-transition-group(*.card) {
    animation-duration: 0.35s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  ::view-transition-old(*.card),
  ::view-transition-new(*.card) {
    object-fit: cover;
  }

  /* Custom keyframes, staggered delays, the fun stuff - all in here */
  ::view-transition-old(root) {
    animation: fade-out 0.2s ease-in;
  }

  ::view-transition-new(root) {
    animation: fade-in 0.3s ease-out;
  }
}

/* If the user HAS requested reduced motion: instant cut, no animation */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 0s !important;
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}
```

This isn’t a nice-to-have. I need to be blunt about that.

People with vestibular disorders — and there are a lot more of them than most developers realize — can get physically nauseous from unexpected motion on screen. Not “mildly annoyed.” Nauseous. Dizzy. Migraines that last hours. The [**`prefers-reduced-motion`**](/css-tricks.com/almanac-rules/media.md#prefers-reduced-motion/) media query exists because real people checked a box in their OS settings that says “please stop making me sick.” Ignoring it is the accessibility equivalent of removing a wheelchair ramp because stairs look cleaner.

The [**`@view-transition`**](/css-tricks.com/almanac-rules/view-transition.md) opt-in can stay outside the media query. That’s fine, it just tells the browser, “I want cross-document transitions enabled.” The browser will still do an instant cut between pages, which is visually identical to a normal navigation. It’s the animation customizations that need to be gated: the durations, the easing curves, the custom keyframes. Wrap all of that in `prefers-reduced-motion: no-preference` and you’re covered.

That `prefers-reduced-motion: reduce` block at the bottom is a belt-and-suspenders thing. Even if you miss wrapping some animation rule, forcing `animation-duration: 0s` on all the transition pseudo-elements ensures nothing actually moves. [**The `!important` is ugly but justified here.**](/css-tricks.com/alternatives-to-the-important-keyword.md##when-using-important-does-make-sense) you genuinely want this to override everything, no exceptions.

You already saw the conditional opt-in pattern back in Part 1:

```css
/* You can also just disable transitions entirely for reduced-motion users */
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

Either approach works. Wrapping the whole `@view-transition` rule means the browser won’t even attempt the transition – it’s a normal navigation, full stop. Keeping `@view-transition` active but killing the animation durations means the transition technically fires but completes instantly, which can matter if you have `pagereveal` logic that depends on `event.viewTransition` existing. Pick whichever fits your setup. Just don’t ship animated transitions without checking.

A thing worth considering here: [**“reduced motion” doesn’t necessarily mean “no motion.”**](/css-tricks.com/nuking-motion-with-prefers-reduced-motion.md) Some users with vestibular sensitivities are fine with fades but not with sliding or zooming. You could offer a gentler alternative instead of killing all animation entirely.

```css
@media (prefers-reduced-motion: reduce) {
  /* Instead of zero duration, use a quick crossfade only */
  ::view-transition-group(*) {
    animation-duration: 0.15s !important;
    animation-timing-function: linear !important;
  }

  ::view-transition-old(*) {
    animation: fade-out 0.15s linear !important;
  }

  ::view-transition-new(*) {
    animation: fade-in 0.15s linear !important;
  }
}
```

This is a judgment call. A fast, subtle cross-fade is less likely to trigger symptoms than a `400ms` morphing animation with easing curves. But the safest option is always zero motion, and if you’re not sure, go with `animation-duration: 0s`. You can always add a gentler alternative later once you’ve tested it with actual users who rely on the setting.

---

## Handle Old Browsers (By Doing Basically Nothing)

```css
/* Feature detection, if you need it */
@supports (view-transition-name: none) {
  .card {
    /* maybe you want contain: paint for better snapshotting */
    contain: paint;
  }
}
```

```js
// JS-side feature detection
if (document.startViewTransition) {
  // same-document transition API exists
}

// For cross-document transitions, there's no direct JS check -
// the browser either supports @view-transition in CSS or ignores it.
// That's... actually fine.
```

Here’s the thing though: you probably don’t even need that `@supports` check.

View transitions are progressive enhancement in the purest sense of the term. If a browser doesn’t understand `@view-transition { navigation: auto; }`, it ignores the rule. That’s how CSS works. The user clicks a link, the browser navigates normally, the new page loads. No animation, no morphing, no cross-fade. Just a regular page load. Which is exactly what every website on the internet did for the first 25 years of the web. It’s fine.

Nothing breaks. No JavaScript errors. No layout shifts. No fallback code to write. The `view-transition-name` properties get ignored. The `::view-transition-*` pseudo-element selectors match nothing. Your `pageswap` and `pagereveal` event listeners either don’t fire or `event.viewTransition` is `null` and your guard clause returns early. The whole feature is designed to be invisible when it’s absent.

That’s the beauty of this API, honestly. It’s one of the rare web platform features where you don’t have to write a single line of fallback code. Firefox doesn’t support it yet? Fine — Firefox users get normal navigation. Safari’s working on it but hasn’t shipped? Cool, Safari users click links and pages load. Nobody gets an error. Nobody gets a broken layout. Nobody loses anything. They just don’t get the fancy animation, and most of them will never notice it was supposed to be there.

Worth noting where things actually stand today: Chrome and Edge have full support for cross-document view transitions, including view-transition-class. Safari also ships full cross-document support as of Safari 18.2. The momentum is clearly toward universal support, even though Firefox still holds it behind a flag for now.

The only time `@supports` matters is if you’re adding styles that *only* make sense in the context of view transitions — like `contain: paint` on elements to improve snapshot quality, or hiding some loading state that the transition would normally cover. Gate those behind `@supports (view-transition-name: none)` so non-supporting browsers don’t get the side effects without the payoff.

Failure is invisible. That’s the whole point.

---

## Ship It

Look, I’ve been building websites for a long time, and there’s always been this unspoken trade-off: you want smooth, app-like transitions, you adopt a framework and a client-side router and a build step and a hydration strategy and suddenly you’re maintaining a small aircraft carrier just so a card can animate into a hero image.

That trade-off is dissolving.

Cross-document view transitions let an `<a href>` feel like a native app navigation. Two HTML files. Some CSS. Maybe a little JavaScript for the fancy stuff. The browser does the rest. That’s not a small thing – it changes which projects *need* a framework and which ones just *assumed* they did.

The spec is young. It’s Chromium-only right now. The rough edges are real – you’ve seen them across both parts of this series. But the API is designed so well that when it’s not supported, nothing breaks. Your site just works the way sites have always worked. And when it *is* supported, it feels like magic that came free.

Here’s a quick cheat sheet to take with you:

- **Opt in with CSS**, not the deprecated meta tag: `@view-transition { navigation: auto; }`.
- **Both pages** must opt in or no transition happens.
- **4-second timeout** starts at navigation, not at render – use `pagereveal` to catch `TimeoutError`.
- **Images stretch** during transitions because pseudo-elements default to `object-fit: fill` – fix it with `object-fit: cover` on `::view-transition-old` and `::view-transition-new`.
- **`view-transition-name`** = identity (unique per page), **`view-transition-class`** = styling hook (shared across elements).
- **Don’t name elements upfront** – use `pageswap` and `pagereveal` to assign names just-in-time. But keep your `pageswap` logic fast — the browser gives you a narrow window (10-50ms) before snapshots.
- **Clean up names** after `viewTransition.finished` resolves to avoid stale conflicts.
- **Gate animations** behind `prefers-reduced-motion: no-preference` — this is not optional.
- **Progressive enhancement** is built in — unsupported browsers just get normal page loads

The best animations are the ones you don’t have to maintain a framework to get.

::: info Cross-Document View Transitions Series

```component VPCard
{
  "title": "Cross-Document View Transitions: The Gotchas Nobody Mentions",
  "desc": "This is Part 1 of a two-part series about cross-document view transitions, going over all the gotchas, from ditching the deprecated way to opt into them to a little-known 4-second timeout.",
  "link": "/css-tricks.com/cross-document-view-transitions-part-1.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Cross-Document View Transitions: Scaling Across Hundreds of Elements",
  "desc": "Every view-transition-name on a page must be unique. The problem is that every pseudo-element selector in your CSS targets a specific name, so your animation styles explode into an unmanageable wall of selectors.",
  "link": "/css-tricks.com/cross-document-view-transitions-part-2.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cross-Document View Transitions: Scaling Across Hundreds of Elements",
  "desc": "Every view-transition-name on a page must be unique. The problem is that every pseudo-element selector in your CSS targets a specific name, so your animation styles explode into an unmanageable wall of selectors.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/cross-document-view-transitions-part-2.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
