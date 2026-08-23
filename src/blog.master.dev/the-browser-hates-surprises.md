---
lang: en-US
title: "The Browser Hates Surprises"
description: "Article(s) > The Browser Hates Surprises"
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
      content: "Article(s) > The Browser Hates Surprises"
    - property: og:description
      content: "The Browser Hates Surprises"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/the-browser-hates-surprises.html
prev: /programming/css/articles/README.md
date: 2026-02-06
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://blog.master.dev/author/durgesh/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8469
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
  name="The Browser Hates Surprises"
  desc="To avoid page loading jank, there are things we can do to avoid content from shifting around, even if repainting is still necessary."
  url="https://blog.master.dev/the-browser-hates-surprises/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8469"/>

We often treat the browser like a canvas — a blank slate waiting for us to paint pixels. But this mental model is flawed. The browser isn’t really a painter; it’s a **constraint solver**.

Every time you load a page, you enter a high-speed negotiation. You provide the rules (HTML & CSS), and the browser calculates the geometry. When you give it all the math upfront, the result feels magical: a stable, buttery-smooth experience.

But when we force the browser to recalculate that geometry mid-stream — because an image loaded late, a scrollbar popped in, or a font swapped — we break the spell.

We know this phenomenon as “Cumulative Layout Shift” (CLS), but really, it’s just **jank**. And jank doesn’t happen by accident. It happens because we *surprised* the browser.

To fix this, we need to stop fighting the rendering engine and start orchestrating it. But first, seeing is believing. Let’s look at exactly what it looks like when we get it wrong.

---

## A “Hostile” Web Site

I call what we’re doing in the demo below “hostile” because the code is indifferent to the browser’s needs. It treats the rendering engine like a bucket we can dump data into whenever it arrives.

In the code below, you will see four distinct “surprises” that break the user experience:

1. **The Sticky Header Collision:** When you click “Jump to Section 2,” the browser scrolls correctly to the top of the element, but the title gets buried behind the fixed header.
2. **Popcorn Loading:** The text and images load independently. The layout jumps once for the text, and again for the image.
3. **The Image Shift:** The image isn’t reserved space. It pushes the text down when it finally arrives.
4. **The Scrollbar Shift:** When the content grows long enough, a physical scrollbar pops in (on Windows/Linux), shifting the entire UI to the left.

### 🛠 The “Before” Demo

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c2a0f-26c2-74f7-b94b-e176611e231b"
  title="“Hostile” Web Site"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Note that we’re just **faking** this hostile behavior with `setTimeout`, but it’s entirely plausible that real world websites experience these conditions naturally. Data can take time to arrive from APIs. Media can be slow to load. The amount of content can push a page to needing to scroll when it didn’t before.

:::

---

## 

Why did that feel so broken? It wasn’t just “slow internet.” It was a failure of negotiation.

To fix this, we need to understand how the browser thinks. The browser rendering engine has a strict pipeline:

1. **Parse** (Read HTML/CSS)
2. **Layout** (Calculate the geometry of every box)
3. **Paint** (Fill in the pixels)

### The “Streaming Buffer” Mistake

In the code above, we threw the text at the browser, *then* the image, *then* the scrollbar.

Every time we did that, we forced the browser to stop **Painting**, go back to **Layout**, recalculate the math for the page, and then **Paint** again. This is called a **Reflow**. Reflows are expensive for the CPU, but they are disastrous for the user experience because they physically move pixels that the user is currently looking at.

We need to move from **Reactive Rendering** (reacting to data arrival) to **Orchestrated Rendering** (planning for data arrival).

---

## Solutions

We are going to make four specific negotiations with the browser to ensure stability.

### 1. The Coordinate Negotiation

The browser isn’t “wrong” when it scrolls your title behind the sticky header. It is scrolling to the exact mathematical top of the element. The problem is that our header exists *outside* the normal document flow.

We need to update the browser’s metadata regarding that element’s landing zone.

```css
:target {
  /* "Hey browser, when you scroll here, leave 6rem of space against the top" */
  scroll-margin-top: 6rem;
}
```

### 2. The Space Negotiation

On Windows and Linux, standard scrollbars take up physical space (usually ~17px). This happens on macOS too, but only when users have the [<VPIcon icon="fas fa-globe"/>Show scroll bars: Always](https://macrumors.com/how-to/make-scroll-bars-always-visible/) option selected, which is not the default. When a scrollbar appears, the available width of the viewport changes, forcing a global recalculation that shifts centered content to the left.

We have two ways to solve this layout mutation.

#### Option A: The Classic Fix (Maximum Compatibility)

The most reliable method is to force the scrollbar track to be visible at all times, even on short pages.

```css
html {
  overflow-y: scroll;
}
```

#### Option B: The Modern Fix (Cleaner UI)

Modern CSS gives us a dedicated property that tells the browser: *“If a scrollbar might exist later, reserve that 17px slot now, but don’t show an ugly disabled track.”*

```css
html {
  scrollbar-gutter: stable;
}
```

### 3. The Layout Reservation

Normally, the browser assumes an image is 0x0 until the file header downloads. By setting an `aspect-ratio` in CSS, we issue a “reservation ticket.” We allow the browser to calculate the final bounding box during the **CSS Parse** phase — before the network request is even sent.

```css{4}
img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

### 4. The Orchestration (`Promise.all`)

Instead of firing three separate state updates (three separate reflows), we wait for the entire “scene” to be ready. We trade a few milliseconds of “First Paint” for a UI that arrives fully formed.

```js
// Don't just fetch. Orchestrate.
async function loadScene() {
  // Wait for critical actors to be ready
  const results = await Promise.all([
    fetch('/api/text'),
    fetch('/api/image')
  ]);

  // Update the state ONCE. 
  // One reflow. One paint.
  setFullScene(results);
}
```

---

## Phase 4: The “Stable” Application

Here is the exact same application, but negotiated correctly.

Notice how “calm” the loading feels. The layout never jumps. The scroll lands exactly where you expect. It feels like a native application because we gave the browser the constraints it needed *before* painting.

### 🛠 The “After” Demo

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c2a5c-efd5-751a-974c-d29113e9c0a7"
  title="Fixed Hostile Website"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

Optimization is not about making things load faster; it is about making them load **calmer**.

Every scroll bug, every jumpy image, and every layout shift is a sign that we failed to give the browser the information it needed at the time it needed it.

Stop surprising the browser. Start reserving space.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Browser Hates Surprises",
  "desc": "To avoid page loading jank, there are things we can do to avoid content from shifting around, even if repainting is still necessary.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/the-browser-hates-surprises.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
