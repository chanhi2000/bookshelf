---
lang: en-US
title: "Creating Memorable Web Experiences: A Modern CSS Toolkit"
description: "Article(s) > Creating Memorable Web Experiences: A Modern CSS Toolkit"
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
      content: "Article(s) > Creating Memorable Web Experiences: A Modern CSS Toolkit"
    - property: og:description
      content: "Creating Memorable Web Experiences: A Modern CSS Toolkit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/creating-memorable-web-experiences-a-modern-css-toolkit.html
prev: /programming/css/articles/README.md
date: 2026-06-10
isOriginal: false
author:
  - name: Mariana Beldi
    url: https://css-tricks.com/author/marianabeldi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/psychedlic-event.webp
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
  name="Creating Memorable Web Experiences: A Modern CSS Toolkit"
  desc="There are many ways to create memorable experiences. Sometimes it's as simple as a form that completes smoothly. But here I'm interested in sharing techniques I reach for when I want a site to feel alive and be remembered."
  url="https://css-tricks.com/creating-memorable-web-experiences-a-modern-css-toolkit"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/psychedlic-event.webp"/>

I love the fact that CSS is finally reclaiming control over visual interactions, taking charge of the styling, the animation, and the accessibility exactly as it should. Today, native browser capabilities allow us to move the heavy lifting away from the JavaScript main thread and closer to the GPU. By letting the browser’s engine optimize performance under the hood, we save energy and processing power while building code that is robust, accessible, and independent of external libraries that might deprecate tomorrow.

We have 3D, modern layout techniques, clip-paths, transforms, custom properties, scroll-driven animations, view-transitions, [**`@property`**](/css-tricks.com/almanac-rules/property.md) — and we can animate almost anything, [**even to auto-height**](/css-tricks.com/transitioning-to-auto-height.md)!

And, of course, there’s SVG, which isn’t new, but allows us to build entire websites through illustrations and animations. Take the example below: it’s responsive, lightweight, accessible, and powered primarily by CSS Grid + SVG.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/nerd2-f.mp4" />

We can even build an [<VPIcon icon="fa-brands fa-youtube"/>entire video game](https://youtu.be/tga0DzSCKt0) including the UI using only SVG:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/do-14.mp4" />

What follows is not a complete guide to modern CSS, but an opinionated selection of techniques I reach for when I want a site to feel alive and be remembered. There are many ways to create memorable experiences. Sometimes it’s as simple as a form that completes smoothly. But here I’m interested in the expressive end of the spectrum.

---

## Motion as Communication: Defining Your Intent

Before we dive into the technical side, I want to clarify something: **we shouldn’t move things just because we can.**

Everything communicates, and our animations are no exception. We must take the time to design movements that support the message we want to convey in order to keep our intents tightly scoped without overdoing it.

Here’s a methodology I use when planning the design and animation of a site.

Imagine we’re working on a project for a **nature event focused on mushrooms**. The design language changes completely depending on the “vibe”: selling a “Psychedelic Mushroom Rave” is worlds apart from a “Spiritual Mushroom Retreat” focused on ancestral medicine.

Every design decision communicates. I like to create what I call **keyword lists** to define my intent and scope. For example, I might break things down into different options:

::: tabs

@tab:active Option A

The Psychedelic Event

- **Visuals:** Colorful, saturated, high-contrast, illustrations, distortions
- **Movement:** Fast, frantic, unpredictable, morphing, rhythmic, synced loops, hypnotic
- **Feeling:** Fun, chaotic, energetic, stimulating, surprising
- **Typography:** Funk, “psych-rock”
- **Style References:** Pop Art, 60s/70s op art, rave flyers
- **Actions:** Dancing
- **Extras:** Emojis, films (e.g., *Fear and Loathing in Las Vegas*)

@tab Option B

The Spiritual Retreat

- **Visuals:** Earth tones, neutral tones, de-saturated, photograph-heavy, nature, whitespace
- **Movement:** Slow, fluid, organic, breathing, subtle parallax, smooth scrolling.
- **Feeling:** Calm, serene, introspective, contemplative, safe
- **Typography:** Elegant Serif, minimalist sans-serif, wide spacing, legible
- **Style References:** Scandinavian design, Japanese *Wabi-sabi*, wellness/spa aesthetics, botanical books
- **Actions:** Breathing
- **Extras:** Healing sounds, film (e.g., *Eat Pray Love*)

:::

This is the kind of exercise I do to guide my design and animation decisions. The lists will help me select everything from which CSS properties I plan to use and how to use them. I even share them with the client and, together, we choose a direction.

Let’s say we go with Option A and look at a few examples of what I think are essential ingredients for creating memorable user experiences.

---

## Split Text Animations

These animations became popular thanks to the [GSAP SplitText plugin](https://gsap.com/docs/v3/Plugins/SplitText/). It splits text by character (or words, or lines if you like) so we can create interesting text effects, like staggered animations.

```html
<h1 class="reveal-text">
  <span style="--i:0">H</span>
  <span style="--i:1">O</span>
  <span style="--i:2">L</span>
  <span style="--i:3">A</span>
</h1>
```

This approach wraps each letter in “Hola” in a span. From there, each span is inline-styled with a custom property indexing the spans in order. Which is something that will get a lot easier when the [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) function gains broad browser support.

But for now, each custom property value acts as a multiplier that increases an `animation-delay`, staggering each span. In this case we fade in each character as it moves up.

```css
.reveal-text span {
  animation: slideUp 0.6s ease-out forwards;
  animation-delay: calc(var(--i) * 0.1s);
  display: inline-block;
  opacity: 0;
  transform: translateY(3rem);
}

@keyframes slideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Accessibility is the tricky part here. The instinct is to hide all the individual spans from assistive technology with `aria-hidden="true"` and add a visually hidden version of the full word for screen readers:

```html
<h1>
  <span class="sr-only">HOLA</span>
  <span aria-hidden="true" class="reveal-text">
    <span style="--i:0">H</span>
    <span style="--i:1">O</span>
    <span style="--i:2">L</span>
    <span style="--i:3">A</span>
  </span>
</h1>
```

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

But be warned: this pattern doesn’t guarantee a good experience across all screen readers. [**Adrian Roselli tested GSAP’s SplitText**](/adrianroselli.com/you-know-what-just-dont-split-words-into-letters.md) across eight screen reader and browser combinations and found it only worked correctly in two of them. If you ship this technique, test it with real assistive technology.

If that risk feels too high, there’s a very [**clever alternative from Preethi**](/css-tricks.com/revealing-text-css-letter-spacing.md) worth knowing that uses the [**`letter-spacing`**](/css-tricks.com/almanac-properties/letter-spacing.md) property. It accepts negative values that collapse characters on top of each other, hiding them without touching the DOM at all. Animate it back to `0` and you get a similar reveal effect without accessibility overhead.

What would be great is [**a pseudo-selector like `::nth-letter`**](/css-tricks.com/using-nonexistent-nth-letter-selector-now.md) to target individual glyphs directly from CSS the way [**`::first-letter`**](/css-tricks.com/almanac-pseudo-selectors/first-letter.md) selects the first character. But unfortunately, there’s no `::nth-letter`… at least yet.

Remember to [**respect the user’s motion preferences**](/css-tricks.com/revisiting-prefers-reduced-motion.md) on every animation:

```css
@media (prefers-reduced-motion: reduce) {
  .reveal-text span {
    animation: none; /* or a softer animation */
  }
}
```

And here we go:

<CodePen
  user="anon"
  slug-hash="EaPqxjN"
  title="Split Text CSS only (simple)"
  :default-tab="['css','result']"
  :theme="dark"/>

It might not scale too much when we have a lot of text and different animations we want to apply. For the psychedelic event, I wanted to try splitting text with [SMIL](https://smashingmagazine.com/2025/05/smashing-animations-part-3-smil-not-dead/), but it was verbose. This is the code for animating two letters alone:

```xml
<svg role="img" aria-label="TODOS LOS HONGOS" viewBox="0 0 1366 938.96">
  <title>TODOS LOS HONGOS</title>
  <g aria-hidden="true">
    <text transform="rotate(-9.87 2181.107 -1635.1)" opacity="0">T
      <animate attributeName="dy" values="100; -20; 0" keyTimes="0; 0.8; 1" dur="0.4s" begin="0s" fill="freeze"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.01s" begin="0s" fill="freeze"/>
    </text>
    <text transform="rotate(-8.92 2372.854 -2084.755)" opacity="0">O
      <animate attributeName="dy" values="100; -20; 0" keyTimes="0; 0.8; 1" dur="0.4s" begin="0.1s" fill="freeze"/>
      <animate attributeName="opacity" from="0" to="1" dur="0.01s" begin="0.1s" fill="freeze"/>
    </text>
    <!-- rest of letters... -->
  </g>
</svg>
```

Add `role="img"` and a `<title>` to the `<svg>`, and wrap the individual letters in `<g aria-hidden="true">`. That gives screen readers one clean label to read. It works well in some combinations and badly in others, so if the text is critical, don’t animate it.

Here is the complete code. It’s easier to write it when you have an AI to do it for you:

<CodePen
  user="anon"
  slug-hash="preview/EaPqxEw"
  title="SVG + SMIL Split Text"
  :default-tab="['css','result']"
  :theme="dark"/>

For longer text, a library like GSAP gives you more control, but the same accessibility risks we discussed earlier apply, and the results across screen readers are inconsistent:

```html
<h1>
  <span class="splitfirst">Todos los hongos son</span>
  <span class="splitlast">mágicos</span>
</h1>
```

```js
const splitFirst = SplitText.create('.splitfirst', {
  type: "chars",
});
const splitLast = SplitText.create('.splitlast', {
  type: "chars, lines",
  mask: "lines"
});

const tween = gsap.timeline()
.from(splitFirst.chars, {
  xPercent: 100,
  stagger: 0.1,
  opacity: 0,
  duration: 1, 
})
.from(splitLast.chars, {
  yPercent: 100,
  stagger: 0.1,
  opacity: 0,
  duration: 1,
});
```

This would be a nice approach for Option B if we had gone that route. See how “serene” things feel as the text fades in.

<CodePen
  user="anon"
  slug-hash="preview/JoGQpVN"
  title="Split text GSAP"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Masking & Clipping

The [**`clip-path`**](/css-tricks.com/almanac-properties/clip-path.md) and [**`mask`**](/css-tricks.com/almanac-properties/mask.md) properties allow us to hide portions of an element, but they work on fundamentally different principles. **Clipping** is a binary decision: pixels are either fully visible or completely gone,  making it the right choice for clean geometric shapes, like polygons, circles, or SVG paths, where the browser can also optimize rendering more efficiently. **Masking**, on the other hand, uses luminance or alpha channel values: white reveals, black hides, and everything in between produces partial transparency. This makes it the tool for soft edges, gradient fades, and irregular textures. Keep in mind that if you have a very complex vector shape, it might be more performant to use a `mask` than a vector `clip-path`. [**Sarah Drasner has a nice write-up on when it makes sense to use one over the other.**](/css-tricks.com/masking-vs-clipping-use.md)

Our project is a very clear use case for `clip-path`. We have a circle shape that starts with `clip-path: circle(0%)`, which makes the element invisible (the clipping circle has zero radius). Over the duration of the animation it expands to `circle(100%)`, which fully reveals the element as the circle grows outward from its center. Meanwhile, we fade things in with the help of `opacity`.

```css
#rainbow, #floor, #mushroom, #flores {
  opacity: 0;
  animation: maskAnim 2s ease-in forwards;
}

@keyframes maskAnim {
  0%, 1% { 
    clip-path: circle(0%);
    opacity: 1; 
  }
  100% { 
    clip-path: circle(100%); 
    opacity: 1; 
  }
}
```

::: note

The `1%` keyframe is there to make sure the browser starts the `clip-path` interpolation from `circle(0%)` rather than from whatever value the element might already have. Without it, some browsers will unexpectedly jump at the very start. A cleaner alternative is to use `animation-fill-mode: both` because it locks the element in its `from` state before the animation begins.

:::

From there, we apply the same animation to the different SVG groups in our illustration:

```xml
<g id="rainbow">...</g>
<g id="floor">...</g>
<g id="mushroom">...</g>
<g id="flowers">...</g>
```

How psychedelic is this?!

<CodePen
  user="anon"
  slug-hash="MYKNYjO"
  title="Animate Clip- path CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Scroll-Driven Animations

Scroll-driven animations are great because we can connect an animation’s progress to the user’s scrolling instead of a typical timeline that runs and stops.

<BaselineStatus featureid="scroll-driven-animations" />

We can use it for subtle and somewhat “trippy” movement, like a light parallax effect. In this case, we can make things that appear closer to the user move faster than the ones that are more distant.

<CodePen
  user="anon"
  slug-hash="RNGqQgR"
  title="Parallax effect CSS only - Scroll driven animations - view()"
  :default-tab="['css','result']"
  :theme="dark"/>

This is the full CSS:

```css
#estrellas, #arcoiris, .text-line, #fecha, #arco, #flores, #dir, #piso, #barras {
  animation: moveUp both;
  animation-timeline: view();
}

@keyframes moveUp {
  from { transform: translateY(var(--offset)); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

#estrellas { --offset: 10vh; }
#arcoiris { --offset: 20vh; }
#fecha { --offset: 45vh; }
#arco { --offset: 50vh; }
#dir { --offset: 50vh; }
#flores { --offset: 65vh; }
#piso { --offset: 85vh; }
#barras { --offset: 90vh; }
```

The `animation-timeline: view()` says that things should start the animation as soon as an element enters the scrollport when the user scrolls into it, and fully completes when it scrolls out of view. To make things move at different velocities, we place them at different offsets using an indexed `--offset` custom property like we did earlier for splitting text.

---

## 3D Transforms

This one is trickier and we need to keep an eye on performance. A tool like [<VPIcon icon="fas fa-globe"/>Layoutit](https://layoutit.com) [](https://layoutit.com)can help carry the lift because it has a [<VPIcon icon="fas fa-globe"/>voxels](https://voxels.layoutit.com/) and [<VPIcon icon="fas fa-globe"/>terrain generator](http://terra.layoutit.com) built entirely with CSS 3D. It can go even further when it’s complemented with [<VPIcon icon="fas fa-globe"/>VoxCSS](https://voxcss.com/), a full voxel engine that renders 3D cuboids using only CSS Grid layers and transforms without the complexity of Canvas or WebGL.

Let’s put together some combination scrolling and 3D effects. It’s the sort of thing that supports the “hypnotic” and “dancing” ideas in the Option A keyword list. Check this out:

<CodePen
  user="anon"
  slug-hash="bNwQLEW"
  title="CSS 3D gallery carousel 2"
  :default-tab="['css','result']"
  :theme="dark"/>

Here, I’ve set up a scene with depth using the [**`perspective`**](/css-tricks.com/almanac-properties/perspective.md) property and then wrap all the child elements inside the scene in a 3D space with `transform-style: preserve-3d`. This way, all the child image elements rotate and translate along the depth axis (or z-axis).

Let’s connect that to a scroll-driven animation that uses `transform: rotateY`:

```css
.scene {
  perspective: 1200px;
}

.img-wrapper { 
  transform-style: preserve-3d; 
  animation: rotateImg linear;
  animation-timeline: scroll();

  > img {
    transform: rotateY(270deg) translate3d(0, 50px, var(--distance));
  }

  > img:nth-child(2) {
    transform: rotateY(180deg) translate3d(0, 50px, var(--distance));
  }
}

/* etc. */

@keyframes rotateImg {
  to { transform: rotateY(360deg); }
}
```

---

## Custom Cursors

`cursor` might be one of the most unused CSS properties. There are [**many cursor types**](/css-tricks.com/almanac-properties/cursor.md) we can use, although there are [**definitely opinions on just how far to go with this**](/dbushell.com/custom-cursor-accessibility.md).

And we can use it to play around with the images, displaying different cursors on different containers when the user hovers them. I would personally use an SVG and PNG image for transparency support, though the property supports any raster image.

It’s worth noting that cursor sizes vary by browser: Firefox caps custom cursors at 32×32px, while Chrome supports up to 128×128px. Most browsers refuse to display — or will downscale — cursors that are larger than 32×32px on high-DPI (retina) screens. Keeping your cursor at 32×32px is the safest choice to ensure consistency.

For example:

```css
.box1 {
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAZCAMAAAD63NUrAAAACVBMVEX///8AAAD///9+749PAAAAAXRSTlMAQObYZgAAAFZJREFUeNqdzksKwDAIAFHH+x+6lIYOVPOhs5OHJnES/5UkYKEkU7xjijSIm50iFh4fAXgYDd/yumVVRSwsqq/nRA3xVK0oo06d5U6DpQZ7PV7lMxH7LkaQAbYFwryzAAAAAElFTkSuQmCC),auto; 
}
```

We can even set multiple fallbacks to ensure the widest level of browser support:

```css
body {
  cursor: url('path-to-image.png'), url('path-to-image-2.svg'), url('path-to-image-3.jpeg'), auto;
}
```

While this is cool and all, we have to keep accessibility in mind for something that changes default web behavior like this. Custom cursors could be fun to apply to very specific elements rather than wholesale across the board.

<CodePen
  user="anon"
  slug-hash="yyYKxBb"
  title="Cursors"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Bonus: Anchor Positioning

One more thing before we wrap up. I’ve been playing with [**CSS Anchor Positioning**](/css-tricks.com/css-anchor-positioning-guide.md), inspired by a [<VPIcon icon="fa-brands fa-youtube"/>Kevin Powell demo](https://youtu.be/8_NQ7ARXz8c). We can use it to attach a single pseudo-element to a currently-hovered item instead of attaching a pseudo-element for each and every item. In other words, we create a single element and anchor it to a hovered element, like highlighting cards:

<CodePen
  user="anon"
  slug-hash="myrgRgR"
  title="Anchor-name + transitions - CSS only"
  :default-tab="['css','result']"
  :theme="dark"/>

That opens up interesting possibilities, like being able to transition the hover state between cards. In this case, I’m using the [**`linear()`**](/css-tricks.com/almanac-functions/l/linear/) function to get that natural bounce with help from [<VPIcon icon="fas fa-globe"/>Easing Wizard](https://easingwizard.com).

---

## Conclusion

The technical barriers for creating memorable web experiences are mostly gone now. I hope everything we’ve covered here gives you an idea of just how far we can go with modern CSS features that completely remove the need for additional JavaScript. We have more possibilities than ever before, all without the need for complex technical overhead like days past.

So, instead of asking, *is this possible?*, the most important question becomes, *does this movement tell a better story?* If yes, ship it. Use these tools not because you can, but because they help you tell a better story, one that is also accessible and performant.

And, of course, everything in here is just a handful of ways to do that. But what sort of memorable experiences have you used in your work? Or what have you seen on other sites?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Memorable Web Experiences: A Modern CSS Toolkit",
  "desc": "There are many ways to create memorable experiences. Sometimes it's as simple as a form that completes smoothly. But here I'm interested in sharing techniques I reach for when I want a site to feel alive and be remembered.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/creating-memorable-web-experiences-a-modern-css-toolkit.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
