---
lang: en-US
title: "How to animate box-shadow with silky smooth performance"
description: "Article(s) > How to animate box-shadow with silky smooth performance"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - tobiasahlin.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to animate box-shadow with silky smooth performance"
    - property: og:description
      content: "How to animate box-shadow with silky smooth performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tobiasahlin.com/how-to-animate-box-shadow.html
prev: /programming/css/articles/README.md
date: 2015-11-18
isOriginal: false
author:
  - name: Tobias Ahlin
    url: https://x.com/tobiasahlin
cover: https://tobiasahlin.com/static/-social/og_blog-how-to-animate-box-shadow.jpg
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
  name="How to animate box-shadow with silky smooth performance"
  desc="Spoiler-alert: you don't. You use a pseudo-element."
  url="https://tobiasahlin.com/blog/how-to-animate-box-shadow/"
  logo="https://tobiasahlin.com/images/touch-icon-ipad-retina.png"
  preview="https://tobiasahlin.com/static/-social/og_blog-how-to-animate-box-shadow.jpg"/>

::: normal-demo

```html
<div class="blog-banner-content" style="height: 90px;">
  <div class="box-shadow-demo"></div>
</div>
```

```css
.box-shadow-demo {
  display: inline-block;
  background-color: #fff;
  width: 90px;
  height: 90px;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  position: relative;
  border-radius: 5px;
  -webkit-animation: scaleAnimation 3.5s infinite cubic-bezier(0.165, 0.84, 0.44, 1);
  animation: scaleAnimation 3.5s infinite cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box-shadow-demo::after {
  content: "";
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  opacity: 0;
  -webkit-animation: fadeAnimation 3.5s infinite cubic-bezier(0.165, 0.84, 0.44, 1);
  animation: fadeAnimation 3.5s infinite cubic-bezier(0.165, 0.84, 0.44, 1);
}

@-webkit-keyframes fadeAnimation {
  0%, 80%, 100% {  opacity: 0; } 
  30%, 50% {  opacity: 1; }
}

@-webkit-keyframes scaleAnimation {
  0%, 80%, 100% {
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  } 30%, 50% {
    -webkit-transform: scale(1.3, 1.3);
    transform: scale(1.3, 1.3);
  }
}

@keyframes fadeAnimation {
  0%, 80%, 100% {  opacity: 0; } 
  30%, 50% {  opacity: 1; }
}

@keyframes scaleAnimation {
  0%, 80%, 100% { 
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  } 30%, 50% {
    -webkit-transform: scale(1.3, 1.3);
    transform: scale(1.3, 1.3);
  }
}
```

```json
```

:::

How do you animate the `box-shadow` property in CSS without causing re-paints on every frame, and heavily impacting the performance of your page? Short answer: you don’t. Animating a change of `box-shadow` *will* hurt performance.

There’s an easy way of mimicking the same effect, however, with minimal re-paints, that should let your animations run at a solid 60 FPS: animate the `opacity` of a pseudo-element.

---

## Demo

[![Recording of box-shadow demo in action](https://tobiasahlin.com/static/animate-box-shadow/demo.gif)](/tobiasahlin.com/demo/animate-box-shadow.md)

[**Have a look at the demo**](/tobiasahlin.com/demo/animate-box-shadow.md) and compare the two different techniques we’ll be exploring. If the two examples look the same to you, that’s the point. The only difference is how we apply and animate the shadow. On the left we’re animating `box-shadow` on `hover`, and on the right we’re adding a pseudo-element with `:after`, applying the shadow to that, and animating the `opacity` of that element.

If you bring up your developer tools and hover one of these items, you should see something similar to this (green bars are paints; less is better):

[![Animation performance when hovering the different boxes](https://tobiasahlin.com/static/animate-box-shadow/animation-performance.png)](/tobiasahlin.com/demo/animate-box-shadow.md)

There are clearly more re-paints when hovering the cards on the left side (animating `box-shadow`), compared to hovering the cards on the right side (which animate the `opacity` of their pseudo-element).

Why are we seeing this effect? There are [<VPIcon icon="fas fa-globe"/>very few CSS properties](https://csstriggers.com) that can be animated without constantly triggering repaints for every frame, namely `opacity` and `transform`. We minimize the amount of repaints (and work that your browser has to do) by sticking to only changing these two properties during the animation.

This is the **critical difference** between the two techniques, stripping out all of the other layout styles:

```css :collapsed-lines
/* The slow way */
.make-it-slow {
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: box-shadow 0.3s ease-in-out;
}

/* Transition to a bigger shadow on hover */
.make-it-slow:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* The fast way */
.make-it-fast {
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
}

/* Pre-render the bigger shadow, but hide it */
.make-it-fast::after {
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* Transition to showing the bigger shadow on hover */
.make-it-fast:hover::after {
  opacity: 1;
}
```

In the example that performs better we have two layers: one for the box, and one for the shadow, and only animate the `opacity` property of the shadow layer.

---

## Breaking it down

With the fundamentals in place, let’s look at how to create [**the 3D card effect showcased in the demo**](/tobiasahlin.com/demo/animate-box-shadow.md). The first step is to move the shadow to a pseudo-element, like we did above. Let’s also add all of the layout code to create the card:

```css :collapsed-lines
/* All HTML you need is <div class="box"></div> */

/* Create a simple white box, and add the shadow for the initial state */
.box {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.15);
  transition: all 0.3s ease-in-out;
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.box::after {
  content: '';
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  opacity: 0;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  transition: opacity 0.3s ease-in-out;
}

```

Note that we’re adding a `transition` to both the `.box`, and `.box::after`, since we’re going to animate both of these elements: `transform` for `.box`, and `opacity` for `.box::after`.

These styles give us a white box with a subtle `box-shadow`. The stronger shadow from `.box::after` is completely hidden at this point, and you can’t interact with the box:

::: normal-demo

```html
<div class="post-demo-content">
  <div class="box"></div>
</div>
```

```css
.post-demo-content {
  background-color: #f4f4f6;
  padding: 2em;
  margin-bottom: 3em;
  margin-top: 3em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-align: center
}
.box {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transition: all 0.3s ease-in-out;
}
```

```json
```

:::

To create the same effect as in the [**demo**](/tobiasahlin.com/demo/animate-box-shadow.md), now all we need to do is to scale up the `.box` on hover, and fade in the pseudo-element and its shadow:

```css
/* Scale up the box */
.box:hover {
  transform: scale(1.2, 1.2);
}

/* Fade in the pseudo-element with the bigger shadow */
.box:hover::after {
  opacity: 1;
}
```

That’s it! Hover the box to preview the effect:

::: normal-demo

```html
<div class="post-demo-content">
  <div class="box2"></div>
</div>
```

```css
.post-demo-content {
  background-color: #f4f4f6;
  padding: 2em;
  margin-bottom: 3em;
  margin-top: 3em;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-align: center
}
.box2 {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Create the hidden pseudo-element */
/* include the shadow for the end state */
.box2::after {
  content: '';
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  left: 0;
  top: 0;
  opacity: 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
}

.box2:hover {
  -webkit-transform: scale(1.25, 1.25);
  transform: scale(1.25, 1.25);
}

.box2:hover::after {
    opacity: 1;
}
```

```json
```

:::

To summarize, here’s all the CSS, with all vendor prefixes, and some custom easing for additional ✨👌:

```css :collapsed-lines
.box {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box::after {
  content: "";
  border-radius: 5px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 0;
  -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.box:hover {
  -webkit-transform: scale(1.25, 1.25);
  transform: scale(1.25, 1.25);
}

.box:hover::after {
  opacity: 1;
}
```

That’s certainly a lot of CSS to achieve the same effect as simply animating `box-shadow`, just with improved performance. Why bother?

Even if your desktop likely handles animating `box-shadow` without any issues, your phone may not, and even your desktop may start to stutter when animating a more complex layout.

Keep transitions and animations to only `transform` and `opacity`, and you’re certain to achieve the best possible performance, and with that, the best possible user experience.

::: info Further reading

```component VPCard
{
  "title": "Smoother & sharper shadows with layered box-shadows",
  "desc": "With a simple CSS trick, we can get fine-tuned control over how shadows are rendered, and create richer and more realistic 3D effects",
  "link": "/layered-smooth-box-shadows.md",
  "logo": "https://tobiasahlin.com/images/touch-icon-ipad-retina.png",
  "background": "rgba(43,47,60,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to animate box-shadow with silky smooth performance",
  "desc": "Spoiler-alert: you don't. You use a pseudo-element.",
  "link": "https://chanhi2000.github.io/bookshelf/tobiasahlin.com/how-to-animate-box-shadow.html",
  "logo": "https://tobiasahlin.com/images/touch-icon-ipad-retina.png",
  "background": "rgba(43,47,60,0.2)"
}
```
