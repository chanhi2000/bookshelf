---
lang: en-US
title: "How to Use the Fullscreen API in JavaScript (and Keep the Screen Awake with the Wake Lock API)"
description: "Article(s) > How to Use the Fullscreen API in JavaScript (and Keep the Screen Awake with the Wake Lock API)"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Fullscreen API in JavaScript (and Keep the Screen Awake with the Wake Lock API)"
    - property: og:description
      content: "How to Use the Fullscreen API in JavaScript (and Keep the Screen Awake with the Wake Lock API)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/fullscreen-api-javascript-wake-lock.html
prev: /programming/js/articles/README.md
date: 2026-09-29
isOriginal: false
author:
  - name: Alex Oliinyk
    url: https://freecodecamp.org/news/author/alexov/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/32fd0d68-ea3d-40c2-8653-449de3d514f1.png
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
  name="How to Use the Fullscreen API in JavaScript (and Keep the Screen Awake with the Wake Lock API)"
  desc="Sooner or later, most front-end developers hit the same request: ”Can this take up the whole screen?” A slide deck, a video player, kiosk dashboard, game, drawing canvas, or timer on a classroom proje"
  url="https://freecodecamp.org/news/fullscreen-api-javascript-wake-lock"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/32fd0d68-ea3d-40c2-8653-449de3d514f1.png"/>

Sooner or later, most front-end developers hit the same request: *"Can this take up the whole screen?"*

A slide deck, a video player, kiosk dashboard, game, drawing canvas, or timer on a classroom projector all feel half-finished while the browser's tabs and address bar are still hanging around the edges.

The good news is that the browser has a built-in answer: the **Fullscreen API**. The less good news is that it comes with a handful of quirks that will bite you the first time you ship it: user gestures, Safari prefixes, iPhones that simply refuse, and a screen that goes to sleep two minutes into your beautiful fullscreen experience.

In this tutorial, you'll learn how to:

- Put any element (or the whole page) into fullscreen and back out again
- Keep your UI in sync when the user presses <kbd>Esc</kbd>
- Style fullscreen content with the `:fullscreen` pseudo-class
- Handle the cross-browser gotchas, including the one platform that still doesn't support it
- Stop the screen from dimming with the **Screen Wake Lock API**
- Combine all of it into one small, reusable pattern

Everything here is vanilla JavaScript with no libraries or build step. You should be comfortable with DOM events and `async/await`. If you need a refresher on the latter, freeCodeCamp has a solid [**async/await tutorial**](/freecodecamp.org/javascript-async-await.md#) that covers everything we'll rely on.

---

## How the Fullscreen API Works

The Fullscreen API is small. It gives you three things you'll use every day:

- `element.requestFullscreen()`: asks the browser to display that element (and its descendants) using the entire screen. It returns a Promise.
- `document.exitFullscreen()`: leaves fullscreen. Also returns a Promise.
- `document.fullscreenElement`: the element currently in fullscreen, or `null` if there isn't one. This is your single source of truth for "are we fullscreen right now?"

Plus two events on `document`: `fullscreenchange` (fires when fullscreen is entered *or* exited) and `fullscreenerror` (fires if a request fails).

One thing that surprises people: you can make *any* element fullscreen, not just the page. If you fullscreen a `<div>`, only that `<div>` fills the screen. Everything else in the document is hidden behind it.

To fullscreen the whole page, you call the method on `document.documentElement` (the `<html>` element).

The full reference lives on [<VPIcon icon="fa-brands fa-firefox"/>MDN's Fullscreen API page](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API), but you won't need much beyond what's above.

---

## Entering and Exiting Fullscreen

Let's start with the simplest useful thing: a button that toggles the page in and out of fullscreen.

```html
<button id="fs-toggle">Fullscreen</button>
```

```js
const toggleBtn = document.getElementById('fs-toggle');

async function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Nothing is fullscreen yet – enter it.
    await document.documentElement.requestFullscreen();
  } else {
    // Something is fullscreen – leave it.
    await document.exitFullscreen();
  }
}

toggleBtn.addEventListener('click', toggleFullscreen);
```

That's genuinely it for the happy path. Because both methods return Promises, you can `await` them and know that the transition is finished before running any follow-up code.

Both calls can reject, though. For example, if the document isn't allowed to go fullscreen (we'll get to why below), or if you call `exitFullscreen()` when nothing is fullscreen. So in real code, wrap them in `try/catch` rather than letting an unhandled rejection land in the console:

```js
async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (err) {
    console.warn(`Fullscreen failed: ${err.name} – ${err.message}`);
  }
}
```

---

## The User Gesture Rule

Here's the first gotcha, and it's the one that generates the most confused questions on Stack Overflow: **you can't enter fullscreen automatically**. Not on page load, after a timer, or in response to a network event.

`requestFullscreen()` only works while the page has what the spec calls *transient activation*: a short window right after the user genuinely interacts with the page (like with a click, tap, or key press). Outside that window the Promise rejects, and in most browsers you'll see a message like *"API can only be initiated by a user gesture."*

This is deliberate. Without it, any page could hijack your whole screen the moment it loaded, which is exactly the kind of thing phishing pages would love to do.

In practice, this means two things for your code:

1. Always trigger fullscreen from an event handler tied to user input: `click`, `keydown`, `pointerup`, and so on.
2. Don't put an `await` for something slow *before* the `requestFullscreen()` call. If you `await fetch(...)` first, the activation window may have expired by the time you ask for fullscreen.

![Diagram of the user gesture rule: calling `requestFullscreen()` directly inside a click handler succeeds, while awaiting a slow fetch first lets the activation window expire and the call is rejected.](https://cdn.hashnode.com/uploads/covers/6a60e4e5f99e7bbad25386f1/f635bd25-b6ac-44f4-9de2-e06a8fe5fe19.png)

Call `requestFullscreen()` first and do the slow work after, or the activation window closes before you ask.

A common and very natural pattern is to let a keyboard shortcut do the same job as the button:

```js
document.addEventListener('keydown', (e) => {
  // Ignore shortcuts while the user is typing in a field.
  if (e.target.matches('input, textarea, [contenteditable]')) return;

  if (e.key === 'f' || e.key === 'F') {
    e.preventDefault();
    toggleFullscreen();
  }
});
```

Two small things I got wrong the first time around are worth passing on.

First, make the fullscreen surface itself keyboard-reachable: give it `tabindex="0"` and treat `Enter` and `Space` on it exactly like a click, otherwise keyboard users have a button nobody told them about.

Second, think about whether your shortcut key collides with what the page actually does. I have a "hacker typer" page where any key spits out fake terminal output, including `F`. For the first few days, users typing furiously would drop out of fullscreen mid-"hack" every time they hit that letter. The fix was a one-liner: on that page `F` only ever *enters* fullscreen, and leaving is <kbd>Esc</kbd>'s job alone.

Which brings up <kbd>Esc</kbd>: you don't handle it yourself. Every browser exits fullscreen on <kbd>Esc</kbd>, and you can't prevent that. It's a safety escape hatch. What you *can* do is react to it, which is the next section.

---

## Keeping Your UI in Sync with `fullscreenchange`

Because the user can leave fullscreen in ways your code doesn't control (like by pressing <kbd>Esc</kbd>, using the browser's own exit button, or switching apps on mobile), you should never track fullscreen state in your own variable. It will drift out of sync.

Instead, treat `document.fullscreenElement` as the truth and update your UI whenever `fullscreenchange` fires:

```js
function syncFullscreenUI() {
  const isFullscreen = Boolean(document.fullscreenElement);
  toggleBtn.textContent = isFullscreen ? 'Exit fullscreen' : 'Fullscreen';
  toggleBtn.setAttribute('aria-pressed', String(isFullscreen));
  document.body.classList.toggle('is-fullscreen', isFullscreen);
}

document.addEventListener('fullscreenchange', syncFullscreenUI);
document.addEventListener('fullscreenerror', () => {
  console.warn('Could not enter fullscreen.');
});
```

This single listener covers every path in and out of fullscreen, including the ones you didn't initiate. It's also the right place to pause an animation, resume a game loop, or (as you'll see later) release a wake lock.

---

## Styling Fullscreen Content

CSS gives you two hooks for fullscreen state.

The `:fullscreen` pseudo-class matches the element that's currently fullscreen. Browsers apply a default stylesheet that stretches the element to the full viewport, but you'll usually want to control things like background and overflow yourself:

```css
:fullscreen {
  background: #000;
  overflow: hidden;
  cursor: none; /* hide the pointer on an idle fullscreen surface */
}
```

That `cursor: none` line looks cosmetic until you put a pure black page on an OLED display: every pixel is off, and the mouse pointer is quite literally the only thing lit on the panel. Hiding it once the page is fullscreen is the difference between "the screen is off" and "the screen has a tiny white arrow in the middle of it."

The `::backdrop` pseudo-element is the layer painted *behind* the fullscreen element. It only matters when your fullscreen element doesn't cover the whole screen (for example, an element with a fixed aspect ratio), and it's how you control the letterboxing colour:

```css
:fullscreen::backdrop {
  background: #000;
}
```

One practical tip: if you're fullscreening the whole page, set your background colour on `html`, not `body`. In fullscreen, `html` is the element being displayed, and on some browsers a `body`-only background leaves a thin strip of the wrong colour at the edges during the transition.

---

## Cross-Browser Gotchas

The Fullscreen API has been standard in Chrome, Edge and Firefox for years. Safari is where the work is.

### Older Safari Needs the `webkit` Prefix

Safari only shipped the unprefixed API in version 16.4 (spring 2023) on macOS and iPadOS. Before that it used `webkitRequestFullscreen()`, `webkitExitFullscreen()`, `webkitFullscreenElement`, and a `webkitfullscreenchange` event. Unless you can ignore three-year-old Safari installs, a tiny compatibility layer is worth having:

```js
const fs = {
  get element() {
    return document.fullscreenElement ?? document.webkitFullscreenElement ?? null;
  },
  get enabled() {
    return Boolean(document.fullscreenEnabled ?? document.webkitFullscreenEnabled);
  },
  request(el = document.documentElement) {
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return Promise.resolve(el.webkitRequestFullscreen());
    return Promise.reject(new Error('Fullscreen not supported'));
  },
  exit() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return Promise.resolve(document.webkitExitFullscreen());
    return Promise.reject(new Error('Fullscreen not supported'));
  },
};

// Listen to both event names so old Safari stays in sync too.
['fullscreenchange', 'webkitfullscreenchange'].forEach((evt) =>
  document.addEventListener(evt, syncFullscreenUI)
);
```

Now `fs.request()` and `fs.exit()` both return a Promise in every browser, and the rest of your code doesn't care which one it's running in. (You'll see `screenfull.js` recommended for this. It's a fine library, but it's been declared feature-complete and frozen, and the fifteen lines above are all it was ever doing for you.)

### iPhone Safari Doesn't Support Element Fullscreen at All

This is the gotcha that catches everyone. As of the time of writing, **Safari on iPhone doesn't support the Fullscreen API for arbitrary elements** – only for `<video>`. It works on iPad and on the Mac, but on the phone `document.fullscreenEnabled` is `false` and `requestFullscreen` doesn't exist on a `<div>`. Chrome and Firefox on iOS inherit the same limitation because they're required to use Safari's engine.

You have two realistic options:

1. **A "pseudo-fullscreen" fallback:** Position your element with `position: fixed; inset: 0` and hide your own chrome. You won't get rid of Safari's address bar, but it collapses on scroll, and for most tools this is good enough.
2. **Suggest "Add to Home Screen":** A web app launched from the home screen with `"display": "standalone"` in its manifest runs without any browser UI. This is the only way to get truly edge-to-edge content on an iPhone today.

Whichever you choose, don't rely on feature detection alone. `document.fullscreenEnabled` tells you whether the API *exists*, but the request can still be rejected at runtime (inside an iframe without the `allowfullscreen` attribute, on a page a browser policy has locked down, or simply because a browser you haven't tested has its own opinion).

The pattern that has held up for me is to try the real API and treat a rejection as the trigger for the CSS fallback:

```js
function enterFullscreen(el) {
  if (fs.enabled) {
    return fs.request(el).catch(() => {
      // The API exists but refused – degrade to a fixed overlay.
      document.body.classList.add('pseudo-fullscreen');
    });
  }
  document.body.classList.add('pseudo-fullscreen');
  return Promise.resolve();
}
```

On phones, I go one step further and don't call the API at all, even on Android where it technically works. Between the address bar reappearing on scroll and the system's swipe gestures, a fixed overlay behaves more predictably than real fullscreen on a small touch screen. It's also the same code path that iPhone Safari forces you into anyway. One less branch to test.

::: info

You can check the current support table on [<VPIcon icon="iconfont icon-caniuse"/>Can I use](https://caniuse.com/fullscreen) before deciding how much of this you need.

:::

---

## Keeping the Screen Awake with the Wake Lock API

You've built a beautiful fullscreen experience. The user leans back to watch it… and ninety seconds later the screen dims and locks, because the operating system saw no input and assumed nobody was there.

For a video element, the browser handles this for you. For anything else (like a countdown, slideshow, canvas animation, recipe, or sheet-music page), you need the [<VPIcon icon="fa-brands fa-firefox"/>Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API). It landed in every major browser in 2024 (Chrome 84+, Safari 16.4+, Firefox 126+) and became part of [**Baseline**](/web.dev/screen-wake-lock-supported-in-all-browsers.md) in 2025, so you can use it today without a polyfill.

The API is a single call, and it's Promise-based:

```js
let wakeLock = null;

async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return; // unsupported – fail silently

  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => {
      // The OS or browser released it (tab hidden, battery saver, etc.)
      wakeLock = null;
    });
  } catch (err) {
    // Rejected – most often because the device is in a power-saving mode.
    console.warn(`Wake lock failed: ${err.name} – ${err.message}`);
  }
}

async function releaseWakeLock() {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
  }
}
```

Three rules to know:

1. **It requires a secure context.** The API is only exposed over HTTPS (and `localhost`).
2. **The browser releases the lock automatically when the page is hidden**. If the user switches tabs, minimises the window, or locks the phone, when the page becomes visible again, the lock does *not* come back on its own. You have to re-request it:

```js
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && shouldStayAwake()) {
    requestWakeLock();
  }
});
```

1. **Be a good citizen.** A wake lock drains batteries. Only hold it while it's actually useful, like while something is playing, running, or being displayed. Release it the moment that stops.

The nice part is that the Fullscreen API already gives you a perfect signal for "something is being displayed": `fullscreenchange`. When the user enters fullscreen, then request the lock. When they leave fullscreen, release it.

Fullscreen isn't the only good signal, though, and it helps to think of the wake lock as attached to *an activity* rather than to a display mode. On a countdown timer, I request the lock when the countdown starts and release it when it reaches zero or is paused (whether or not the page is fullscreen), because nobody wants a timer that goes dark at the 90-second mark. On a rain-sounds player, the lock follows the audio: it's acquired on play and released on pause or when the sleep timer fades the sound out.

The mechanics are identical: only the "should the screen stay awake right now?" question changes.

---

## Putting It All Together

Here's the whole pattern in one place: a fullscreen toggle with a keyboard shortcut, a wake lock that follows fullscreen state, UI that stays in sync no matter how the user leaves, and a fallback for browsers that can't do it.

```js :collapsed-lines
const toggleBtn = document.getElementById('fs-toggle');
let wakeLock = null;

/* ---------- Fullscreen compatibility layer ---------- */
const fs = {
  get element() {
    return document.fullscreenElement ?? document.webkitFullscreenElement ?? null;
  },
  get enabled() {
    return Boolean(document.fullscreenEnabled ?? document.webkitFullscreenEnabled);
  },
  request(el = document.documentElement) {
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullscreen) return Promise.resolve(el.webkitRequestFullscreen());
    return Promise.reject(new Error('Fullscreen not supported'));
  },
  exit() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return Promise.resolve(document.webkitExitFullscreen());
    return Promise.reject(new Error('Fullscreen not supported'));
  },
};

/* ---------- Wake lock ---------- */
async function requestWakeLock() {
  if (!('wakeLock' in navigator) || wakeLock) return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => { wakeLock = null; });
  } catch (err) {
    console.warn(`Wake lock failed: ${err.name}`);
  }
}

async function releaseWakeLock() {
  if (!wakeLock) return;
  await wakeLock.release();
  wakeLock = null;
}

/* ---------- Toggle ---------- */
async function toggleFullscreen() {
  const pseudo = document.body.classList.contains('pseudo-fullscreen');
  try {
    if (pseudo) {
      document.body.classList.remove('pseudo-fullscreen');
      onFullscreenChange();
    } else if (!fs.element) {
      await fs.request();
    } else {
      await fs.exit();
    }
  } catch (err) {
    // The API refused (iframe policy, unsupported platform, etc.) – degrade gracefully.
    document.body.classList.add('pseudo-fullscreen');
    onFullscreenChange();
  }
}

/* ---------- Keep everything in sync ---------- */
function onFullscreenChange() {
  const active = Boolean(fs.element) || document.body.classList.contains('pseudo-fullscreen');
  toggleBtn.textContent = active ? 'Exit fullscreen' : 'Fullscreen';
  toggleBtn.setAttribute('aria-pressed', String(active));
  document.body.classList.toggle('is-fullscreen', active);

  // The screen should stay awake exactly as long as we're fullscreen.
  if (active) requestWakeLock(); else releaseWakeLock();
}

['fullscreenchange', 'webkitfullscreenchange'].forEach((evt) =>
  document.addEventListener(evt, onFullscreenChange)
);

// Re-acquire the lock if the tab was hidden and came back while fullscreen.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && fs.element) requestWakeLock();
});

/* ---------- Wiring ---------- */
toggleBtn.addEventListener('click', toggleFullscreen);
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, [contenteditable]')) return;
  if (e.key === 'f' || e.key === 'F') { e.preventDefault(); toggleFullscreen(); }
});
// Unsupported platforms (iPhone Safari) simply take the catch branch above
// on the first click and land in pseudo-fullscreen – no user-agent sniffing needed.
// One more mobile quirk: rotating the device changes the viewport *after*
// the event fires, so re-measure your canvas or layout a beat later.
const resizeStage = () => { /* re-measure whatever fills the screen */ };
window.addEventListener('orientationchange', () => setTimeout(resizeStage, 100));
```

And the matching CSS:

```css
html { background: #000; }

:fullscreen { overflow: hidden; cursor: none; }
:fullscreen::backdrop { background: #000; }

/* Fallback for browsers without element fullscreen */
body.pseudo-fullscreen .app { position: fixed; inset: 0; }
body.pseudo-fullscreen .chrome { display: none; }
```

Roughly sixty lines, and it's the same core I run in production: I log every fullscreen entry as an analytics event, because on a screen-tool site that transition *is* the conversion, and this exact code is what fires it.

It powers, for instance, the [black screen page on blankscreen.io](https://blankscreen.io/black-screen) – a page whose entire job is to turn a display pure black, go fullscreen on a click or an <kbd>F</kbd> key, hide the pointer, stay awake for as long as it's on screen, and get out of the way cleanly on <kbd>Esc</kbd>. If you open it on an iPhone, you'll see the pseudo-fullscreen fallback from above doing its thing instead.

![A pure black web page showing a 'Click for fullscreen' prompt with hints to press <kbd>F</kbd> to enter and <kbd>Esc</kbd> to exit fullscreen](https://cdn.hashnode.com/uploads/covers/6a60e4e5f99e7bbad25386f1/dea1eb4a-7862-46f8-a746-86550515820a.png)

The same pattern in the wild: one click or the <kbd>F</kbd> key, the whole display goes black, and the screen stays awake for as long as it's showing. <kbd>Esc</kbd> brings the browser back.

Once you have this pattern, adding it to a timer, a slideshow, or a canvas experiment is a matter of dropping in the element you want to fill the screen.

::: note A Quick Gotcha Checklist

Before you ship, run through this list. Every item is something I've been bitten by at least once:

- **User gesture required:** No fullscreen on load, on timer or after an `await` that takes a while.
- **Don't track state yourself:** Read `document.fullscreenElement` and listen for `fullscreenchange`.
- **You can't block <kbd>Esc</kbd>:** Design for the user leaving at any moment.
- **Old Safari wants `webkit` prefixes** for the methods *and* the event name.
- **iPhone Safari has no element fullscreen:** Feature-detect with `document.fullscreenEnabled`, and treat a runtime rejection as a fallback trigger, not just a console warning.
- **Check your shortcut against the page's own keys:** If the app consumes letters, let the shortcut only *enter* fullscreen and leave exiting to <kbd>Esc</kbd>.
- **Make the fullscreen surface keyboard-reachable** (`tabindex="0"`, `Enter`/`Space`).
- **Wake locks need HTTPS:** Can be rejected in battery-saver mode, and they're dropped when the page is hidden. Re-request on `visibilitychange`.
- **Release the wake lock** as soon as the reason for it is gone.
- **Put the background on** `html`, not just `body`, when fullscreening the page.

:::

---

## Conclusion

The Fullscreen API is one of those browser features that looks like a one-liner and turns out to have a personality.

The core (`requestFullscreen()`, `exitFullscreen()`, `fullscreenElement`, and the `fullscreenchange` event) really is simple. The craft is in respecting the user-gesture rule, keeping your UI honest about the real state, handling Safari's history, and remembering that "fullscreen" is only half of the job if the screen goes dark two minutes later. The Wake Lock API closes that gap, and pairing the two through `fullscreenchange` keeps both of them tidy.

Take the sixty-line pattern above, drop your own element into it, and you have a production-ready fullscreen experience for anything from a presentation to a game.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Fullscreen API in JavaScript (and Keep the Screen Awake with the Wake Lock API)",
  "desc": "Sooner or later, most front-end developers hit the same request: ”Can this take up the whole screen?” A slide deck, a video player, kiosk dashboard, game, drawing canvas, or timer on a classroom proje",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/fullscreen-api-javascript-wake-lock.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
