---
lang: en-US
title: "Use Transform and Opacity Properties to Implement Animations"
description: "Article(s) > (23/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (23/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use Transform and Opacity Properties to Implement Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/use-transform-and-opacity-properties-to-implement-animations.html
date: 2025-05-07
isOriginal: false
author:
  - name: Gordan Tan
    url : https://freecodecamp.org/news/author/woai3c/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Front-End Performance Optimization Handbook - Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-transform-and-opacity-properties-to-implement-animations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

In CSS, transforms and opacity property changes don't trigger reflow and repaint. They’re properties that can be processed by the compositor alone.

[![Diagram showing how transform and opacity properties bypass layout and paint processes](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3ae64ihgp1781wrtfci8.png)](https://camo.githubusercontent.com/00e5e11d0b2837e91e8118284520b5969ae69670c8607d791e2053599fee0b4e/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f66626436333931363533376336623531373733633266623134343263663130632e706e67)

---

## Example: Inefficient vs. Efficient Animation

::: tabs

@tab:active ❌

❌Inefficient animation using properties that trigger reflow and repaint:

```css
.box-inefficient {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  background-color: #3498db;
  animation: move-inefficient 2s infinite alternate;
}

@keyframes move-inefficient {
  to {
    left: 300px;
    top: 200px;
    width: 150px;
    height: 150px;
  }
}
```

This animation constantly triggers layout recalculations (reflow) because it animates position (`left`/`top`) and size (`width`/`height`) properties.

@tab ✅

✅ Efficient animation using transform and opacity:

```css
.box-efficient {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #3498db;
  animation: move-efficient 2s infinite alternate;
}

@keyframes move-efficient {
  to {
    transform: translate(300px, 200px) scale(1.5);
    opacity: 0.7;
  }
}
```

**Why this is better:**

1. `transform: translate(300px, 200px)` replaces `left: 300px; top: 200px`
2. `transform: scale(1.5)` replaces `width: 150px; height: 150px`
3. These transform operations and opacity changes can be handled directly by the GPU without triggering layout or paint operations

:::

### Performance comparison:

1. The inefficient version may drop frames on lower-end devices because each frame requires:
    - JavaScript → Style calculations → Layout → Paint → Composite
2. The efficient version typically maintains 60fps because it only requires:
    - JavaScript → Style calculations → Composite

### HTML implementation:

```tsx
<div class="box-inefficient">Inefficient</div>
<div class="box-efficient">Efficient</div>
```

For complex animations, you can use the Chrome DevTools Performance panel to visualize the difference. The inefficient animation will show many more layout and paint events compared to the efficient one.

::: info Reference

```component VPCard
{
  "title": "Stick to Compositor-Only Properties and Manage Layer Count | Articles | web.dev",
  "desc": "Compositing is where the painted parts of the page are put together for displaying on screen.",
  "link": "https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v31bf0d5ece3babea9777b807f088a03e9bb2225d007f11b8410e9c896eb213a6/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

:::
