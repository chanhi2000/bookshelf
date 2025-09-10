---
lang: en-US
title: "Animating SVG with CSS"
description: "Article(s) > Animating SVG with CSS"
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
      content: "Article(s) > Animating SVG with CSS"
    - property: og:description
      content: "Animating SVG with CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/animating-svg-css.html
prev: /programming/css/articles/README.md
date: 2017-01-07
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/04/illustrator-parts.jpg
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
  name="Animating SVG with CSS"
  desc="There isn't just one way to animate SVG. There is the tag that goes right into the SVG code. There are libraries that help with it like Snap.svg or SVG.js."
  url="https://css-tricks.com/animating-svg-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/04/illustrator-parts.jpg"/>

There isn’t just one way to animate SVG. There is the `<animate>` tag that goes right into the SVG code. There are libraries that help with it like [<VPIcon icon="fas fa-globe"/>Snap.svg](https://snapsvg.io/) or [<VPIcon icon="fas fa-globe"/>SVG.js](https://svgdotjs.github.io/). We’re going to look at another way: using inline SVG (SVG code right inside HTML) and animating the parts right through CSS.

I played with this personally recently as my Alma mater [<VPIcon icon="fas fa-globe"/>Wufoo](https://ad.doubleclick.net/ddm/clk/270735259;104033101;o?https://www.wufoo.com/landing/1/) was looking to freshen up the advertising graphic we’re running here. My latest design around here uses SVG quite a bit and I thought this would be another perfect opportunity to use it some more.

The finished product is pretty simple. Here’s it is:

https://codepen.io/chriscoyier/pen/xxZgNJ
Wufoo SVG Ad

Let’s check out how it’s done.

---

## 1. Design the Ad / Have a Plan

This might seem like an [<VPIcon icon="fas fa-file-images"/>how to draw an owl](https://css-tricks.com/wp-content/uploads/2014/04/How_to_Draw_Owl.jpg) moment, but this article is about animation so let’s get there as quickly we can.

My plan for this ad was to make a super simple Wufoo ad with their classic logo, colors, and general branding. Then add a little flair.

1. Make the letters kind hop off the page a little. Wufoo is a fun word, let the letters have some fun.
2. Back in the day we made a T-Shirt with dinosaurs on the front and on the back it said “Fast. Smart. Formidable.” Which are traits of both dinosaurs and Wufoo, not to mention the fun little play on words with FORMidble. Let’s make those fade in and out.
3. To make the connection with the dinosaur thing complete, we’ll have a T-Rex head pop up from the bottom curiously, then zoom away. The word “Fast.” will come in as he zooms away which is another nice little connection.

I put all the parts together in Illustrator.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/04/illustrator-parts.jpg)

Notice how the logo and tagline text are outlines. That means they are just vector shapes and will render just perfectly as-is in the SVG, as `<path>`s. The text you see there “Fast.” is left as text in Illustrator.

When I save this out from Illustrator, that will be left as a `<text>` element.

---

## 2. Save as SVG

Illustrator can save this directly as SVG:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/04/save-as-svg.png)

You can open that SVG file in a code editor and see the SVG code:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/04/inline-svg.png)

---

## 3. Clean Up the SVG, Give Shapes Classes

You might wanna run it through [SVGO](https://github.com/svg/svgo) to optimize it and remove the DOCTYPE and stuff. But more importantly for this post, you’ll want to give the the different shapes class names, that way we can select them in CSS and do stuff!

```xml
<svg version="1.1" id="wufoo-ad" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" viewBox="0 0 400 400" enable-background="new 0 0 400 400" xml:space="preserve">

  <!-- background -->
  <rect class="wufoo-background" fill="#D03E27" width="400" height="400" />

  <!-- logo letters -->
  <path class="wufoo-letter" fill="#F4F4F4" d="M60.858,129...." />
  <path class="wufoo-letter" fill="#F4F4F4" d="..." />
     <!-- etc -->

  <!-- dinosaur -->
  <g class="trex">
     <path ... />
     <path ... />
  </g>

</svg>
```

---

## 4. Insert the SVG

You can copy-and-paste that SVG right into the HTML where you want the ad. But that’ll just slop up the template probably. In all likelihood you’ll just do something like:

```html
<aside class="sidebar">
  
   <div class="module module-ad">
      
       <?php include("ads/wufoo.svg"); ?>

   </div>

   ...
```

---

## 5. Animate!

Now we have these shapes in the DOM that we can target and style like any other HTML element, let’s do that.

Let’s say we want to do this as a **10 second timeline**.

### Words Fade In/Out First

The first thing we want to happen is the Fast. Smart. Formidable. thing. Each word will show for one second. So we’ll make an animation where the word shows for 10% of the time:

```css
@keyframes hideshow {
  0% { opacity: 1; }
  10% { opacity: 1; }
  15% { opacity: 0; }
  100% { opacity: 0; }
} 
```

Then target that first word and have the animation last for 10 seconds (10% of that is 1 second):

```css
.text-1 {
  animation: hideshow 10s ease infinite;
}
```

The next two letters will start out hidden (`opacity: 0;`) and then use the exact same animation, only delayed to start a bit later:

```css
.text-2 {
  opacity: 0;
  animation: hideshow 10s 1.5s ease infinite;
}
.text-3 {
  opacity: 0;
  animation: hideshow 10s 3s ease infinite;
}
```

The extra 0.5s on each is to accommodate the fading out time period of the word before it.

### Letter Pops

As soon as those letters are done animating, we’ll have the letters in WUFOO do their jiggle jump thing, like this:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2014/04/wufoo-letters.gif)

The trick here is that we’ll make the animation only 5 seconds long, but run it once forwards and once backwards. That way it matches our 10 second timeline, is placed right in the middle where we want it, and we only need to scale in one direction, because when it reverses it will scale back.

Each letter has a slight bit of delay so they happen off-kilter a bit:

```css
.wufoo-letter {
  animation: kaboom 5s ease alternate infinite;
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
  &:nth-child(5) {
    animation-delay: 0.4s;
  }
}
@keyframes kaboom {
  90% {
    transform: scale(1.0);
  }
  100% {
    transform: scale(1.1);
  }
}
```

The above is in SCSS just for brevity, and does not include any prefixing (as you would need in production).

I feel like `animation-delay` is a property that would benefit from native randomization in CSS. Would be neat to see the letters be randomly delayed just a bit each time.

### Dinosaur Last

As soon as the words are done, the dinosaur will peak its head up. Even though the dinosaur is made up of lots of `<path>`s, we can target them all together by targeting the `<g>` (group) tag that wraps them all.

Because using translate to animate position [**is better**](/css-tricks.com/tale-of-animation-performance.md), we’ll do that in the keyframes:

```css
@keyframes popup {
  0% {
    transform: translateY(150px);
  }
  34% {
    transform: translateY(20px);
  }
  37% {
    transform: translateY(150px);
  }
  100% {
    transform: translateY(150px);
  }
}
```

We wanted this animation to “last” about 3 seconds. It actually runs in 10 second loops, but you’ll only see it do stuff for 3 seconds. When the translateY(150px) is in effect, the dinosaur is moved so far below, you don’t see anything. By 37% of that animation (around 3 seconds) you’ll have seen it move slowly up, then quickly back down).

When we apply this animation, we’ll make sure that:

The dinosaur is hidden at first  
The animation is delayed so it starts right after the words are done with their fade in/out dance.

```css
.trex {
  transform: translateY(150px);
  animation: popup 10s 6.5s ease infinite;
}
```

The dinosaur pops down right at the last second, which is when the word “Fast.” pops back onto the screen (because all the animations are set to `infinite`, which re-runs them forever). That’s a bit of fun synergy there.

---

## 6. Making it a responsive / clickable ad

One of the beautiful things about SVG is that it’s scaleable to any size without losing quality. To make an inline SVG like this scale while maintaining its aspect ratio, we can use the ol’ padded box technique.

```html
<div class="wufoo-ad-wrap">
  <svg class="wufoo-ad">
     ...
  </svg>
</div>
```

```css
.wufoo-ad-wrap {
  height: 0;
  padding-top: 100%;
  position: relative;
}
.wufoo-ad {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

The idea here is that the “wrap” will always be a perfect square, relative to its width. Then we absolutely position the SVG within that perfect square, which will happily resize itself.

Since this is an ad (which of course should be clickable), rather than using a `<div>` for the wrap, you could use an `<a href="">`, just make sure you set that to be `display: block;`.

[Final thing (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/dvjhn/), for reference.

I think there is a future for this kind of thing in display advertising, particularly because of the CSS control and easy, sharp resizing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Animating SVG with CSS",
  "desc": "There isn't just one way to animate SVG. There is the tag that goes right into the SVG code. There are libraries that help with it like Snap.svg or SVG.js.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/animating-svg-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
