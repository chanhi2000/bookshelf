---
lang: en-US
title: "How SVG Shape Morphing Works"
description: "Article(s) > How SVG Shape Morphing Works"
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
      content: "Article(s) > How SVG Shape Morphing Works"
    - property: og:description
      content: "How SVG Shape Morphing Works"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/svg-shape-morphing-works.html
prev: /programming/css/articles/README.md
date: 2018-08-28
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/2014-10-24-at-3.25-PM.png
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
  name="How SVG Shape Morphing Works"
  desc="While animating SVG with CSS is easy and comfortable, CSS can't animate all the SVG properties that are possible to animate. For instance, all the properties"
  url="https://css-tricks.com/svg-shape-morphing-works"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/2014-10-24-at-3.25-PM.png"/>

While [**animating SVG with CSS**](/css-tricks.com/animating-svg-css.md) is easy and comfortable, CSS can’t animate all the SVG properties that are possible to animate. For instance, all the properties that define the *actual shape* of the elements aren’t possible to change or animate in CSS. You can animate them through SMIL though. Sara Soueidan covers this in her [**guide to SMIL**](/css-tricks.com/guide-svg-animations-smil.md) here on CSS-Tricks, but I thought I would shine a light on this particular ability.

::: note Update

This post is all about SVG shape morphing with SMIL. SMIL has an uncertain (likely not good) future. If you’re super interested in shape morphing (which you should be, it’s awesome!) I recommend checking out [<VPIcon icon="fas fa-globe"/>GreenSock’s MorphSVG plugin](https://greensock.com/morphSVG), which doesn’t require SMIL and is far more powerful as it can morph between shapes regardless of number of points, type of element, and cross-browser.

:::

::: note Another update

Chrome has started to allow shape morphing through CSS. [Here’s a Pen (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](http://codepen.io/chriscoyier/pen/NRwANp) that demonstrates that. It’s even more limiting than SMIL though, being limited to the one browser and requiring a path with an identical number of points. Also not hardware accelerated, like all SVG.

:::

---

## Most important fact: the shapes need to have the same number of points

Otherwise, the animation will just fail. The shape won’t disappear or anything, but it won’t animate.

It’s not extremely obvious how many points a shape has just by looking at the `d` (in the case of a `path`) or `points` attribute (in the case of a polygon) so you may just need to start in a vector editor program with a single shape and work from there.

---

## 1. Start with the most complicated shape

In this demo I’m going to morph from a star to a check. The star is more complex:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/2014-10-24-at-3.25-PM.png)

Save a copy of that SVG, then make a new copy for the next shape.

---

## 2. Make the next shape with those same points.

Drag the points around until you have your next shape.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/dfbbd.gif)

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/2014-10-24-at-3.54-PM.png)

---

## 3. Use the starting shape on the SVG shape element itself

```xml
<svg viewBox="0 0 194.6 185.1">
  <polygon fill="#FFD41D" points=" ... shape 1 points ... ">
  </polygon>
</svg>
```

---

## 4. Add an animation element that animates to the next shape

```xml
<svg viewBox="0 0 194.6 185.1">
  <polygon fill="#FFD41D" points=" ... shape 1 points ... ">
    <animate attributeName="points" dur="500ms" to=" ... shape 2 points ... " />
  </polygon>
</svg>
```

That animation will run immediately, so we’ll need to fix that up a bit.

---

## 5. Trigger the animations as needed

SMIL has the ability to handle interactions like clicks and hovers, so long as all that happens within the SVG itself. For instance, you could begin the animation when it’s clicked on, like:

```xml
<polygon id="shape" points=" ... shape 1 points ... ">
  <animate begin="shape.click" attributeName="points" dur="500ms" to=" ... shape 2 points ..." />
</polygon>
```

That’s pretty neat, but it’s a little limiting since you can only handle clicks from other elements right in that same SVG. Perhaps this SVG is just a part of a `<button>` and you want to run the animation on any click on that button.

First give the animation an ID so we can find it with JavaScript, and then prevent it from running with:

```xml
<animate id="animation-to-check" begin="indefinite" ... />
```

Now you can get a reference to that animation and kick if off how you like:

```js
animationToCheck = document.getElementById("animation-to-check");

// run this on a click or whenever you want
animationToCheck.beginElement();
```

---

## Demo

This demo actually has four animations. One to morph the star to a check, one to change the color, and then both those same animations in reverse. Clicking the button checks the state of the button and then runs the appropriate ones.

<CodePen
  user="chriscoyier"
  slug-hash="vYvqEX"
  title="Shape Morph Button"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Would be pretty cool for charts, like this [<VPIcon icon="fas fa-globe"/>old Raphael demo](http://raphaeljs.com/chart.html):

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/10/chart.gif)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How SVG Shape Morphing Works",
  "desc": "While animating SVG with CSS is easy and comfortable, CSS can't animate all the SVG properties that are possible to animate. For instance, all the properties",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/svg-shape-morphing-works.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
