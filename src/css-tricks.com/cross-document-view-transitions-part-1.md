---
lang: en-US
title: "Cross-Document View Transitions: The Gotchas Nobody Mentions"
description: "Article(s) > Cross-Document View Transitions: The Gotchas Nobody Mentions"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Cross-Document View Transitions: The Gotchas Nobody Mentions"
    - property: og:description
      content: "Cross-Document View Transitions: The Gotchas Nobody Mentions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/cross-document-view-transitions-part-1.html
prev: /programming/js/articles/README.md
date: 2026-05-18
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://css-tricks.com/author/durgeshpawar/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/loader-dots.jpg
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
  name="Cross-Document View Transitions: The Gotchas Nobody Mentions"
  desc="This is Part 1 of a two-part series about cross-document view transitions, going over all the gotchas, from ditching the deprecated way to opt into them to a little-known 4-second timeout."
  url="https://css-tricks.com/cross-document-view-transitions-part-1"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/loader-dots.jpg"/>

I wasted an entire Saturday on this.

Not a lazy Saturday either, but one of those rare, carved-out, “I’m finally going to build that thing” Saturdays. I’d seen [<VPIcon icon="fas fa-globe"/>Jake Archibald’s demos](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/). I’d watched the Chrome Dev Summit talk. I knew cross-document view transitions were real, that you could get those [**slick native-feeling page transitions on plain old multi-page sites**](/css-tricks.com/native-like-animations-for-page-transitions-on-the-web.md) without a single framework. No React. No Astro. No client-side router pretending your multi-page application (MPA) is single-page application (SPA). Just HTML pages linking to other HTML pages, with the browser handling the animation between them. Hell yes.

So I started building. And nothing worked.

The first tutorial I found had me dropping `<meta name="view-transition" content="same-origin">` into my `<head>`. Seemed simple enough. I added it to both pages, clicked my link, and… nothing. No transition. No error. Just a normal, instant page load like it was 2004. I opened DevTools, double-checked my syntax, restarted the server, tried Chrome Canary, cleared the cache. Nothing. I did what any self-respecting developer does at that point – I copied the code character by character from the blog post and pasted it in. Still nothing.

I spent two hours convinced I was an idiot.

Turns out that `<meta>` tag syntax? [**Deprecated**](/css-tricks.com/snippets-css/basic-view-transition.md). Gone. Chrome shipped it, then replaced it with a CSS-based opt-in, and half the internet’s tutorials still show the old way. Those older blog posts still rank well. They look authoritative. And they’re just wrong now. Not wrong because the authors were bad – wrong because the spec moved under everyone’s feet and nobody went back to update their posts.

The other half of the tutorials I found were about same-document view transitions. SPA stuff. `document.startViewTransition()` called in JavaScript when you swap DOM content yourself, which is cool and useful but a completely different feature when you actually sit down to implement it. The API surface is different. The mental model is different. The gotchas are *very* different. And yet, Google “view transitions tutorial” and good luck figuring out which flavor you’re reading about until you’re three paragraphs deep.

So if you’re here, I’m guessing you’ve been through some version of this. You tried the meta tag. It didn’t work. You tried the JavaScript API on a real multi-page site and realized it only fires within a single document. You maybe got something half-working in a demo but it fell apart the second you added real content â€” images stretching weird, transitions hanging for seconds with no explanation, or your CSS file turning into 200 lines of [**`view-transition-name`**](/css-tricks.com/almanac-properties/view-transition-name.md) declarations because you have a grid of 40 product cards. You blamed yourself. It wasn’t your fault. The documentation ecosystem around this feature is a mess right now, and the spec has been a moving target.

**This is Part 1 of a two-part series**, and it’s the article I wish existed on that Saturday. We’re going to cover the actual current way to opt in with [**`@view-transition`**](/css-tricks.com/almanac-rules/view-transition.md) in CSS (not the meta tag, not JavaScript), then dig into the 4-second timeout that will silently kill your transitions on slow pages and how to debug it, then fix the aspect ratio warping that makes every image-heavy transition look like a fun house mirror, and finally get a proper handle on the `pagereveal` and `pageswap` events that give you programmatic control over the whole lifecycle.

In Part 2, we’ll tackle the scaling problem – how to handle `view-transition-name` across dozens or hundreds of elements without your stylesheet becoming a disaster, the difference between `view-transition-name` and [**`view-transition-class`**](/css-tricks.com/almanac-properties/view-transition-class.md), just-in-time naming patterns, and doing [**`prefers-reduced-motion`**](/css-tricks.com/almanac-rules/media/prefers-reduced-motion.md) the right way.

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

2. **Scaling View Transitions Across Hundreds of Elements** *(Next Monday!)*

:::

Grab coffee. Maybe a refill. This one’s dense and I’m not going to waste your time, but there’s a lot of ground here and none of it is obvious.

---

## The Old Way is Dead

```html
<!-- THIS IS DEPRECATED - stop copying this from old tutorials -->
<meta name="view-transition" content="same-origin">
```

```css
/* THIS is the current opt-in - goes in your CSS */
@view-transition {
  navigation: auto;
}
```

Here’s the minimal setup. Two HTML files, one CSS rule on each. Note that, as of 2026, cross-document view transitions are supported in Chromium-based browsers and Safari 18.2+. Firefox support is in progress as I’m writing this.

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019d4ecf-457e-77cb-8b8b-6c1796a9099d"
  title="Cross-Document View Transition 01"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s it. Two HTML files. One CSS rule on each. Click a link between them in a supporting browser (like modern Chromium or Safari 18.2+) and you get a smooth cross-fade. No JavaScript. No meta tags. No build step. The browser snapshots the old page, snapshots the new page, and animates between them automatically.

Now, why did the spec move from a meta tag to a CSS at-rule? It wasn’t arbitrary.

The meta tag was a blunt instrument. It was on or off for the entire page. You couldn’t say “enable transitions on desktop but not on mobile where the animations feel janky on low-end hardware.” You couldn’t conditionally opt in based on user preferences. It was just… there, or not.

The CSS approach opens all of that up:

```css
/* Only enable transitions if the user hasn't asked for reduced motion */
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
}
```

```css
/* Only enable on viewports wide enough for the animation to feel good */
@media (min-width: 768px) {
  @view-transition {
    navigation: auto;
  }
}
```

That’s a real upgrade. You get the same conditional power you already have with every other CSS feature. Media queries, [**`@supports`**](/css-tricks.com/almanac-rules/supports.md), whatever scoping logic you want — it all just works because the opt-in lives where your styles live.

There’s also a subtlety that matters: the CSS rule can be different on the old page versus the new page. Both pages need to opt in for the transition to fire. If Page A has `@view-transition { navigation: auto; }` but Page B doesn’t, you get no transition. This is actually useful – it means your 404 page or your login redirect can skip transitions without any JavaScript coordination.

One more thing worth noting here: `navigation: auto` only kicks in for user-initiated, same-origin navigations. If the user clicks a regular link or hits the browser’s Back button, you get a transition. But `window.location.href = "/somewhere"` set programmatically, or a cross-origin link, or a form submission with a `POST`? No transition. The browser is intentionally conservative about when it fires, and honestly that’s the right call. You don’t want a fancy cross-fade on a `POST` request that’s creating a payment.

Look, if you’ve been following an outdated tutorial and your transitions just silently don’t work, this is almost certainly why. The meta tag [<VPIcon icon="fa-brands fa-chrome"/>shipped in Chrome 111](https://developer.chrome.com/blog/new-in-chrome-111?hl=en), got a few months of real-world use, and then the Chrome team deprecated it in favor of the CSS at-rule [<VPIcon icon="fa-brands fa-chrome"/>starting around Chrome 126](https://developer.chrome.com/release-notes/126). No console warning. No error. The old syntax just quietly does nothing now. Honestly, a deprecation warning in DevTools would’ve saved me (and probably you) a lot of grief, but here we are.

Swap the meta tag for the CSS rule. That’s step one. Everything else in this article builds on it.

---

## Your Transition Will Randomly Die, and Here’s Why

```js
// Drop this in your pages to see what's actually happening
window.addEventListener("pagereveal", (event) => {
  if (!event.viewTransition) {
    console.log(
      "No view transition - page didn't opt in or browser skipped it",
    );
    return;
  } // This is the one that'll save your sanity

  event.viewTransition.finished
    .then(() => console.log("Transition completed ✅"))
    .catch((err) => {
      // You'll see "TimeoutError" here and nowhere else
      console.error("Transition killed:", err.name, err.message);
    });
});
```

Here’s the thing nobody puts in their blog post: **cross-document view transitions have a hard 4-second timeout.** If the new page doesn’t reach a state the browser considers “renderable” within 4 seconds of the navigation starting, the transition just… dies. No animation. No cross-fade. The new page snaps in like view transitions don’t exist. And unless you’ve got that `pagereveal` listener wired up and your console open, you won’t get any indication that anything went wrong.

Four seconds sounds generous â€” until it isn’t.

Think about what happens on a real site. Your page loads. The HTML arrives, fine, that’s fast. But maybe you’ve got a big hero image that’s render-blocking. Maybe there’s a slow API call that your server waits on before sending the response – a product page hitting an inventory service, a dashboard waiting on analytics data, anything with server-side rendering that actually does work before responding. Maybe you’re on a decent connection but the page has three web fonts loading from Google Fonts with `font-display: block`. Any of these can push you past that 4-second window, and the timeout doesn’t care *why* you’re slow. It just cuts the transition.

The really maddening part? It works perfectly on localhost. Your dev server responds in 80ms. The transition is butter. You deploy to production, your server’s cold-starting a lambda or your CDN cache missed, and suddenly users get zero transitions on the first click. You can’t reproduce it locally. You start questioning everything.

```js
// You can also catch this on the OLD page using `pageswap`
// Useful for cleanup or logging which navigations fail
window.addEventListener("pageswap", (event) => {
  if (event.viewTransition) {
    event.viewTransition.finished.catch((err) => {
      // Log it, send it to your analytics, whatever
      console.warn("Outgoing transition aborted:", err.name);
    });
  }
});
```

So, what do you actually do about it?

**Option one: make your page faster.** I know, groundbreaking advice. But seriously – if your cross-document transition is dying, that’s a signal your page load is genuinely slow. The timeout is acting as a performance canary. Look at your Performance tab in DevTools, run a Lighthouse audit (which may [not be perfect](https://smashingmagazine.com/2024/11/why-optimizing-lighthouse-score-not-enough-fast-website/)), figure out what’s blocking first render. This isn’t view-transition-specific advice, but the timeout forces you to care about it.

**Option two is more interesting**, and it’s the thing I wish I’d known about immediately.

```html
<!-- Note: rel="expect" is newer and browser support is rolling out -->
<link rel="expect" href="#hero" blocking="render">
```

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019d53a7-12ee-7d43-bafe-1f7350e0998e"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

This:

```html
<link rel="expect" href="#hero" blocking="render">
```

…tells the browser: “Don’t consider this page renderable until an element matching `#hero` is in the DOM.” That sounds like it would make things *slower*, and in a way it does – it delays first paint. But for view transitions, that’s exactly what you want: you’re telling the browser to hold the snapshot until the important content is actually there, rather than snapping a screenshot of a half-loaded page or, worse, timing out because some image in the footer is still downloading and blocking something.

It’s a trade-off. You’re choosing a slightly delayed, but smooth, transition over a fast, but-broken, one.

Honestly, the 4-second limit is probably the right call from the browser’s perspective. You don’t want a user clicking a link and staring at a frozen page for 10 seconds while the browser waits to do a fancy animation. At some point, just showing the damn page is better than a pretty transition. But I wish Chrome would surface the timeout more visibly – a DevTools warning, a performance marker, *something*. Right now it fails silently and that’s the whole problem.

One more thing worth knowing: the timeout clock starts when navigation begins, not when the new page’s HTML starts arriving. Network latency counts. The Time to First Byte (TTFB) Core Web Vital counts. If your server takes 2 seconds to respond and your page takes 2.5 seconds to render after that, you’re over the limit even though neither half feels slow on its own.

A debugging tip that’s saved me more than once: Chrome’s DevTools has an Animations panel (it’s under “More tools” if you don’t see it) that can actually capture view transitions in action. You can slow them down to 10% speed, replay them, and inspect the pseudo-element tree mid-animation. It’s not obvious that it works for view transitions, but it does. Between that and the `pagereveal` listener above, you can diagnose most timeout issues pretty quickly.

Put that `pagereveal` listener in early. Watch your console during testing. You’ll thank yourself later.

---

## Why Your Images Look Like Taffy

This one’s easier to show with a same-document demo first (since you can actually run it in a single file), but the problem and the fix are identical for cross-document transitions.

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019d53aa-cf1e-745d-b2bf-a9c23b6f08a1"
  title="No Good Same-Page View Transition"
  :default-tab="['css','result']"
  :theme="dark"/>

Run that. Click the image. Watch the dog turn into silly putty.

The image itself has `object-fit: cover` on both sides. The thumbnail looks fine, the hero looks fine. But during the transition? The browser doesn’t transition your `<img>` element. It takes a *screenshot* of the old state, takes a screenshot of the new state, and morphs between them. Those screenshots are flat raster images. Your carefully applied [**`object-fit`**](/css-tricks.com/almanac-properties/object-fit.md)? Gone. The browser is just scaling a bitmap from one box size to another, and when a 150Ã—150 square gets stretched into a 600Ã—300 rectangle, you get taffy.

Here’s the fix:

```css
/* THE FIX - target the transition pseudo-elements directly */
::view-transition-old(hero-img),
::view-transition-new(hero-img) {
  /* Treat the snapshot like an image in a container - crop, don't stretch */
  object-fit: cover;
  overflow: hidden;
}
```

<CodePen
  link="https://codepen.io/editor/geoffgraham/pen/019d53ae-2869-7349-8767-19bda628ca21"
  title="Better Same-Page View Transition"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s the whole thing. Two properties on two pseudo-elements.

What’s actually happening: the browser generates a tree of pseudo-elements for every named transition. For an element with `view-transition-name: hero-img`, you get this structure during the animation:

```plaintext
::view-transition
└── ::view-transition-group(hero-img)
    ├── ::view-transition-old(hero-img)
    └── ::view-transition-new(hero-img)
```

The `::view-transition-group` smoothly animates its width and height from the old dimensions to the new ones. That’s the morphing rectangle you see. Inside it, the `old` and `new` pseudo-elements hold the actual bitmap snapshots, and by default they’re set to `object-fit: fill` – meaning “stretch to fill whatever box you’re in, aspect ratio be damned.”

Switching to `object-fit: cover` tells those snapshots to maintain their aspect ratio and crop the overflow instead. Same mental model as a background image with `background-size: cover`. The transition still animates the box from square to rectangle (or whatever your shapes are), but the image inside crops gracefully instead of warping.

You could also use `object-fit: contain` here if you’d rather see the full image with letterboxing instead of cropping. It depends on what looks right for your content. But `cover` is what you’ll want 90% of the time, especially for product images and hero shots.

For cross-document transitions, the CSS is identical – you just put it in both pages’ stylesheets:

```css
/* This works cross-document. Same selectors, same fix. */
/* Put it in your shared CSS file that both pages load. */
@view-transition {
  navigation: auto;
}

::view-transition-old(hero-img),
::view-transition-new(hero-img) {
  object-fit: cover;
}

/* You can also control the animation timing on the group */
::view-transition-group(hero-img) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Honestly, I think `object-fit: cover` should be the *default* on these pseudo-elements instead of `fill`. I get why the spec chose `fill` – it’s predictable, it matches what `object-fit` defaults to on replaced elements everywhere else in CSS – but in practice, how often do you actually *want* a stretched bitmap during a transition? Almost never. You’ll be adding this override on basically every image transition you build.

One more variant that’s useful when the aspect ratios are wildly different – say a tall portrait thumbnail transitioning into a cinematic widescreen hero:

```css
/* Fine-tune where the crop happens on each side of the transition */
::view-transition-group(hero-img) {
  overflow: hidden;
  border-radius: 8px; /* keep it pretty mid-flight */
}

::view-transition-old(hero-img) {
  object-fit: cover;
  object-position: center center;
}

::view-transition-new(hero-img) {
  object-fit: cover;
  object-position: center top; /* keep the top of the hero visible */
}
```

You can set different `object-position` values on old versus new, which lets you control where the crop happens on each side of the transition independently. The old thumbnail might look best cropped from center. The new hero might need to anchor to the top. Mix and match.

This took me an embarrassingly long time to figure out. The fix is two lines of CSS, but if you don’t know the pseudo-element tree exists, you don’t even know what to target. Now you do.

---

## The Two Events That Tie it All Together

You’ve already seen `pagereveal` and `pageswap` show up in the code above, but let’s take a step back and talk about what they actually are. Understanding these two events is going to be important, because in Part 2 we’ll lean on them heavily for the just-in-time naming pattern that makes view transitions actually scale.

Cross-document view transitions happen across two pages that have no JavaScript connection to each other. Page A doesn’t know about Page B’s DOM. Since the old and new pages have no way to communicate directly, these events are your only way to coordinate the transition on both sides. Page B didn’t exist when Page A was running. So how do you coordinate anything? How do you decide which elements to name, or customize the transition based on where the user is heading?

That’s what these two events are for. They’re your hooks into the transition lifecycle, one on each side of the navigation.

**`pageswap`** fires on the **outgoing page**, right before it gets replaced. This is your last chance to touch the old page’s DOM before the browser snapshots it. The event gives you two key properties:

- **`event.viewTransition`:** the ViewTransition object for this navigation, or `null` if no transition is happening.
- **`event.activation`:** a NavigationActivation object that tells you *where the user is going*.

That `activation` property is the really useful one. `event.activation.entry.url` gives you the destination URL, and `event.activation.navigationType` tells you whether it’s a `push`, `replace`, `traverse` (back/forward), or `reload`. This means you can customize the outgoing side of the transition based on the destination. On a product listing page, for example, you can check which product the user clicked, find the matching card, and assign a `view-transition-name` to just that element right before the snapshot happens.

**`pagereveal`** fires on the **incoming page**, right after the page becomes active but while the transition is still running. This is your chance to set up the new side. The event gives you:

- **`event.viewTransition`:** same deal, the ViewTransition object or `null`.

On the incoming page, you check where the user came *from* using `navigation.activation.from.url` (via the Navigation API), and you read the current URL from `window.location`. Between those two pieces of information, you know exactly what kind of navigation just happened and can set up the incoming page’s transition elements accordingly.

Here’s the full lifecycle in order:

1. User clicks a link on Page A.
2. `pageswap` fires on Page A. This is your window to name elements and customize outgoing state.
3. Browser snapshots the old page (capturing any named elements).
4. Navigation happens, new page loads.
5. `pagereveal` fires on Page B. You can name elements, customize incoming state.
6. Browser snapshots the new page.
7. Transition animates between the two snapshots.
8. `viewTransition.finished` resolves (or rejects) on both sides.

Three things to keep in mind with these events:

**First, always guard with `if (!event.viewTransition) return` at the top of your handlers.** `pagereveal` actually fires on *every* navigation – initial page load, back/forward, the works – not just view transitions. If there’s no transition happening, `event.viewTransition` will be `null`, and your handler should bail out gracefully. These handlers are transition sugar, not application logic. Never put side effects in them that you *need* for the page to work.

**Second, `pageswap` only fires if the old page opted into view transitions and the navigation is same-origin.** If the user middle-clicks to open in a new tab, or the navigation goes cross-origin, the event either won’t fire or `event.viewTransition` will be `null`. That’s fine, your guard clause handles it.

**Third, and this is easy to overlook:** both events give you access to `viewTransition.finished`, which is a promise that resolves when the transition completes or rejects if something goes wrong (like a timeout). Always use this for cleanup, as in removing `view-transition-name` values you set dynamically, resetting state, whatever. Stale names from a previous transition will ruin your next one.

We’ve been using these events lightly so far – a `pagereveal` listener to catch timeouts, a `pageswap` listener for logging. In Part 2 of this little series, they become the backbone of the whole scaling strategy. Stay tuned.

---

## What’s Next

That covers the three gotchas that’ll bite you first: the deprecated meta tag that silently does nothing, the 4-second timeout that kills transitions without telling you, and the image distortion that turns every aspect ratio change into a fun house mirror. Plus the two events that give you hooks into the whole lifecycle.

In Part 2, we’ll tackle the scaling problem. When you’ve got a grid of 48 product cards and each one needs a unique `view-transition-name`, how do you keep your CSS from exploding? The answer involves `view-transition-class` (which is different from `view-transition-name` in ways that aren’t obvious), a just-in-time naming pattern using the `pageswap` and `pagereveal` events we just covered. And one critical note: we’ll cover `prefers-reduced-motion` in Part 2, but if you take nothing else from this series, take this: animations can literally make people physically nauseous. Always check that preference and respect it.

The gotchas are behind you. Now it’s time to make it scale.

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

2. **Scaling View Transitions Across Hundreds of Elements** *(Next Monday!)*

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cross-Document View Transitions: The Gotchas Nobody Mentions",
  "desc": "This is Part 1 of a two-part series about cross-document view transitions, going over all the gotchas, from ditching the deprecated way to opt into them to a little-known 4-second timeout.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/cross-document-view-transitions-part-1.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
