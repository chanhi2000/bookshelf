---
lang: en-US
title: "Virtual Scroll-Driven 3D Scenes"
description: "Article(s) > Virtual Scroll-Driven 3D Scenes"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Virtual Scroll-Driven 3D Scenes"
    - property: og:description
      content: "Virtual Scroll-Driven 3D Scenes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/virtual-scroll-driven-3d-scenes.html
prev: /programming/js/articles/README.md
date: 2026-02-23
isOriginal: false
author:
  - name: Gunnar Bachelor
    url: https://blog.master.dev/author/gunnarbachelor/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8661
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
  name="Virtual Scroll-Driven 3D Scenes"
  desc="You can capture scrolling events and do your own work with the information in them. It can do cool things, but you've got work to do.    "
  url="https://blog.master.dev/virtual-scroll-driven-3d-scenes/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8661"/>

Despite growing interest in 3D experiences online, real friction remains between traditional DOM-based animation standards and emerging 3D canvas options. Traditional scroll events tie animations directly to the DOM’s scroll position. This limits creative control when working with a 3D scene. Virtual scrolling breaks this dependency by directly controlling animation using scroll input data.

In this article, I will examine the limitations of traditional DOM-based scrolling options, demonstrate how virtual scrolling enables more controlled scroll-driven interactions, and show how to implement it responsibly.

Here’s a final example:

<CodePen
  user="anon"
  slug-hash="MYeRJPm"
  title="Virtual Scroll"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Problem with Traditional Approaches

[<VPIcon icon="fa-brands fa-firefox"/>Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) provides an elegant way to detect when elements enter the viewport. It works beautifully when you have DOM elements scattered throughout the page. You can observe each element and trigger animations as they enter the viewport.

This approach breaks down in the context of 3D scenes. Your canvas typically fills the viewport as a single element. There’s nothing available for Intersection Observer to track. The entire scene lives inside the canvas. A common workaround is to add DOM elements solely to trigger canvas animations. But introducing DOM elements only to signal state changes inside a canvas couples two rendering systems that operate on different abstractions. As scenes grow in complexity, this indirection becomes harder to reason about, debug, and maintain.

Intersection Observer also struggles with continuous animations. You get callbacks at specific threshold points, not frame-by-frame position data. Building smooth 3D transitions requires interpolated values at every render tick. The callback-based approach doesn’t provide the continuous data stream needed for fluid motion.

[<VPIcon icon="iconfont icon-gsap"/>GSAP’s ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) is a better solution. It offers precise control over scroll-linked timelines, including scrubbing, pinning, and coordinated sequences. However, it still assumes native page scrolling as the underlying driver, as does CSS’s [**scroll-driven animations**](/blog.master.dev/what-you-need-to-know-about-modern-css-spring-2024-edition.md#scroll-driven-animations). When a scene exists entirely inside a canvas, this means fabricating scroll height and adapting 3D motion to a system designed around document layout. In that context, the scroll architecture works against the scene’s structure rather than supporting it.

Virtual scrolling solves these problems by capturing scroll input and using this data to directly craft customized scroll interaction. The page doesn’t actually scroll in the traditional sense. Wheel or touch events update a target value. Your animation loop interpolates toward that target using whatever scene interactions you choose.

This approach unlocks creative possibilities that are difficult or impossible with traditional methods. You can drive any property with scroll data. Morph materials as users scroll. Trigger particle effects at specific positions. Coordinate multiple cameras or object hierarchies. Create parallax effects with different damping values for foreground and background elements. The scroll value becomes a timeline you control completely. You decide the physics, timing, and overall 3D experience for your users.

The challenge is doing this responsibly. When you prevent default scroll behavior, you take on the responsibility of providing everything users expect from scrolling, including progress indicators, keyboard navigation, screen reader context, and respect for motion preferences. The good news is that these requirements are well-defined and relatively straightforward to implement.

---

## Virtual Scrolling Fundamentals

The following example illustrates how virtual scrolling works. The core idea of virtual scrolling is to separate user input from the browser’s native scroll position.

The first step is to intercept wheel input and prevent the default scroll behavior:

```js
let scrollTarget = 0;
let scrollCurrent = 0;
const maxScroll = 88;

window.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollTarget += e.deltaY * 0.01;
  scrollTarget = Math.max(0, Math.min(maxScroll, scrollTarget));
}, { passive: false });
```

Here, `scrollTarget` represents the desired scroll position derived from user input. The `{ passive: false }` option is required so `preventDefault()` can cancel native scrolling.

The 0.01 multiplier scales wheel delta values into scene units. A typical mouse wheel tick generates a deltaY of around 100 pixels. Multiplying by 0.01 converts this to 1 scene unit per tick. This converts pixel measurements into values that better align with the 3D scene scale.

### Use Clamping to Prevent Overscroll

Without boundaries, the scroll target can grow without limit. Clamping the value ensures scrolling stays within a defined range.

```js
scrollTarget = Math.max(0, Math.min(maxScroll, scrollTarget));
```

This line enforces a hard lower and upper bound. `Math.min(maxScroll, scrollTarget)` caps the value at the maximum allowed scroll position. `Math.max(0, …)` then ensures it never drops below zero. Nested together, these operations restrict the scroll target to a fixed, predictable interval.

The maximum scroll value should be derived from the length of your scene content. This scene consists of a tunnel of toruses spaced at regular intervals.

```js
const objects = [];
const totalSections = 12;
const sectionHeight = 8;

for (let section = 0; section < totalSections; section++) {
  const y = -section * sectionHeight;
  const torusGeo = new THREE.TorusGeometry(6, 0.3, 16, 32);
  const torusMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL((section / totalSections), 0.8, 0.5),
    metalness: 0.7,
    roughness: 0.2
  });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.y = y;
  torus.rotation.x = Math.PI / 2;
  scene.add(torus);
  objects.push({ mesh: torus, baseY: y, section: section });
}

const maxScroll = (totalSections - 1) * sectionHeight; // 88
```

With 12 sections spaced 8 units apart, only the distance between sections determines the scroll range. The first section starts at position 0. Each subsequent section is offset by 8 units. Because the first section requires no offset, there are 11 gaps between 12 sections.

That produces a maximum scroll distance of 11 × 8 = 88. Section indices reflect this layout: section 0 sits at 0, section 1 at 8, and the final section, section 11, at 88. Clamping the scroll target to 88 ensures the camera can reach the last section but cannot move past it into empty space.

### Connecting Scroll to the Scene

Once scroll input is captured, the data can be mapped to scene transformations. The scroll value can be used to transform the scene through camera movement, object rotation, or other available properties.

In this example, the scroll value updates the camera position.

```js
function animate() {
  requestAnimationFrame(animate);
  scrollCurrent += (scrollTarget - scrollCurrent) * damping;
  camera.position.y = -scrollCurrent;
  renderer.render(scene, camera);
}
animate();
```

The camera’s Y position becomes the negative of the scroll value. Scrolling forward increases `scrollCurrent`, which moves the camera down the negative Y axis. This matches the convention where objects positioned at negative Y values appear below the origin.

```js
objects.forEach((obj) => {
  // Scale based on distance from camera
  const distanceFromCamera = Math.abs(obj.mesh.position.y - camera.position.y);
  const scale = Math.max(0.5, 1 - (distanceFromCamera / 15));
  obj.mesh.scale.setScalar(scale);
});
```

Each torus also scales based on its distance from the camera. Objects at the camera’s position have full scale. Objects 15 units away shrink to half size, creating the illusion of depth perception.

### Use Damping to Create Natural Motion

The next relevant piece to this example is damping. Damping smooths the transition between the current and target values. Here, the current value represents the rendered scroll position used to place the camera. The target value represents the desired scroll position derived from the user input.

On each frame, the current value moves a fixed fraction of the remaining distance toward the target value. This produces exponential easing, where movement starts faster and slows as the current value approaches the target.

```js
scrollCurrent += (scrollTarget - scrollCurrent) * damping;
```

Lower damping values cause the current value to approach the target more slowly, which creates heavier, delayed motion. Higher values reduce the gap more aggressively, making the response feel tighter.

---

## Accessibility Features

Virtual scrolling has earned itself the pejorative label “scroll-jacking” when developers override native behavior without replacing features that users expect. You can’t tell that something scrolls. You can’t see your progress. Keyboard navigation breaks. Screen readers provide no context. The experience feels broken for anyone who doesn’t interact exactly as the developer intended.

This doesn’t have to be the case. The accessibility requirements use standard DOM APIs and event handlers that most developers already know. And the modest implementation effort buys you complete creative control over scroll behavior.

### Respect Motion Preferences

Some users have enabled reduced motion preferences in their operating system due to vestibular disorders or motion sensitivity. When prefers-reduced-motion is detected, you should set damping to 1 for instant transitions:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const effectiveDamping = prefersReducedMotion ? 1 : 0.08;

scrollCurrent += (scrollTarget - scrollCurrent) * effectiveDamping;
```

This respects user preferences without requiring them to opt out of your experience entirely.

### Show Progress

The most common virtual scrolling mistake is eliminating progress feedback without replacing it. Native scrolling provides a scrollbar. Your virtual scroll implementation needs to provide something equivalent.

A simple progress indicator can be built with minimal markup:

```html
<div class="scroll-progress">
  <div class="scroll-progress-fill"></div>
</div>
```

Style it to appear on the side of the viewport:

```css
.scroll-progress {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 200px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.scroll-progress-fill {
  width: 100%;
  height: 0%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  transition: height 0.1s ease;
}
```

Update the fill height in your animation loop:

```js
const progress = (scrollCurrent / maxScroll) * 100;
document.querySelector('.scroll-progress-fill').style.height = `${progress}%`;`
```

This gives users the same spatial awareness they’d have with a native scrollbar. They can see at a glance how much content remains.

### Keyboard Navigation

Users who navigate with keyboards expect arrow keys to move through content. When you prevent default scroll behavior, you break that expectation unless you explicitly handle keyboard input:

```js
window.addEventListener('keydown', (e) => {
  const scrollSpeed = sectionHeight;
  const fastScrollSpeed = sectionHeight * 3;
 
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    scrollTarget = Math.min(maxScroll, scrollTarget + scrollSpeed);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    scrollTarget = Math.max(0, scrollTarget - scrollSpeed);
  } else if (e.key === 'PageDown') {
    e.preventDefault();
    scrollTarget = Math.min(maxScroll, scrollTarget + fastScrollSpeed);
  } else if (e.key === 'PageUp') {
    e.preventDefault();
    scrollTarget = Math.max(0, scrollTarget - fastScrollSpeed);
  } else if (e.key === 'Home') {
    e.preventDefault();
    scrollTarget = 0;
  } else if (e.key === 'End') {
    e.preventDefault();
    scrollTarget = maxScroll;
  }
});
```

This handler responds to standard navigation keys. Arrow keys move one section at a time. Page Up and Page Down move faster. Home and End jump to the beginning or end.

The implementation uses the same scrollTarget variable that wheel events modify. This means keyboard navigation gets the same damped motion as mouse scrolling. The experience feels consistent across input methods.

### Screen Reader Context

Users who rely on screen readers need to understand what they’re interacting with. A canvas element without context is just announced as “image” with no indication that it’s interactive or what interaction does.

Adding an ARIA label provides that context:

```js
renderer.domElement.setAttribute('role', 'img');
renderer.domElement.setAttribute('aria-label',
  'Interactive 3D tunnel visualization. Use arrow keys to navigate through 12 sections.');
```

This tells screen reader users what they’re looking at and how to interact with it.

A live region can announce position changes as users navigate:

```html
<div id="scroll-status" class="sr-only" aria-live="polite" aria-atomic="true">
  Viewing section 1 of 12
</div>
```

In this example, the `sr-only` class hides this element visually while keeping it available to screen readers. Update this element when the section changes:

```js
let lastAnnouncedSection = 1;

function updateScreenReaderStatus() {
  const currentSection = Math.round(scrollCurrent / sectionHeight) + 1;
  if (currentSection !== lastAnnouncedSection) {
    document.getElementById('scroll-status').textContent =
      `Viewing section ${currentSection} of ${totalSections}`;
    lastAnnouncedSection = currentSection;
  }
}`
```

Call this function in your animation loop. Screen readers will announce these position updates as users navigate through the scene.

### Mobile Touch Support

Virtual scrolling can be extended to touch devices by translating touch movements into updates for the scroll target. This is implemented by tracking the initial touch position and calculating a movement delta on each touchmove event:

```js
let lastTouchY = 0;

window.addEventListener('touchstart', (e) => {
  lastTouchY = e.touches[0].clientY;
});

window.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touchY = e.touches[0].clientY;
  const deltaY = lastTouchY - touchY;
  scrollTarget += deltaY * 0.05;
  scrollTarget = Math.max(0, Math.min(maxScroll, scrollTarget));
  lastTouchY = touchY;
}, { passive: false });
```

Here, `deltaY` represents the vertical movement of the user’s finger. Multiplying it by a small factor smooths the scroll increment and prevents overly aggressive jumps. The same mechanism can be extended to more advanced interactions: you can adjust sensitivity, invert scroll direction, or even apply momentum effects for flick gestures.

---

## Conclusion

With the foundation in place, the range of possible interactions becomes enormous. Consider a product showcase where each scroll increment reveals a different feature through material transitions. Or an architectural walkthrough where scroll position controls camera path, lighting conditions, and material detail levels simultaneously. Or a data visualization where scrolling updates the graph’s geometry.

The scroll value gives you precise control over timing and sequencing in a way that’s difficult or impossible to achieve with traditional scroll events. You’re not limited to triggering animations at discrete waypoints. You have continuous, frame-by-frame control over every property in your scene. The physics, the easing, and the coordination between elements all become programmable.

This level of control is particularly valuable for narrative-driven experiences. You can choreograph exactly how visual elements appear, transform, and interact as users progress through your content. The scroll becomes a timeline where every frame is under your control, enabling cinematic precision in web-based 3D experiences.

Virtual scrolling is an effective solution bridging the gap between DOM-based web standards and canvas-driven 3D experiences. When implemented with proper accessibility features, it delivers creative control without sacrificing usability.

The technique requires more initial setup than traditional scroll handling. But that upfront investment pays dividends in creative flexibility. You gain complete control over how scroll data drives your scene while maintaining the usability expectations that make the web accessible to everyone.

Here is the [code (<VPIcon icon="fa-brands fa-codepen" />`Gunnar-Bachelor`)](https://codepen.io/Gunnar-Bachelor/pen/MYeRJPm) for this example for easy experimentation. Happy animating!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Virtual Scroll-Driven 3D Scenes",
  "desc": "You can capture scrolling events and do your own work with the information in them. It can do cool things, but you've got work to do.    ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/virtual-scroll-driven-3d-scenes.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
