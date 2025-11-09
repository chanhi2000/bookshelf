---
lang: en-US
title: "More CSS random() Learning Through Experiments"
description: "Article(s) > More CSS random() Learning Through Experiments"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > More CSS random() Learning Through Experiments"
    - property: og:description
      content: "More CSS random() Learning Through Experiments"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/more-css-random-learning-through-experiments.html
prev: /programming/css/articles/README.md
date: 2025-11-18
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7764
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
  name="More CSS random() Learning Through Experiments"
  desc="There is quite a bit of interesting design possibility with `random()` coming to CSS. It pairs nicely with animation, particularly animation-composition for agumenting those generated values."
  url="https://frontendmasters.com/blog/more-css-random-learning-through-experiments/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7764"/>
  
The `random()` function in CSS [<VPIcon icon="fa-brands fa-safari"/>is well-specced](https://webkit.org/blog/17285/rolling-the-dice-with-css-random/) and just so [**damn fun**](/frontendmasters.com/very-early-playing-with-random-in-css.md). I had some, ahem, random ideas lately I figured I’d write up.

::: note

As I write, you can *only* see `random()` work in [<VPIcon icon="fa-brands fa-safari"/>Safari Technical Preview](https://developer.apple.com/safari/technology-preview/). I’ve mostly used videos to show the visual output, as well as linked up the demos in case you have STP.

:::

---

## Rotating Star Field

I was playing this game [<VPIcon icon="fas fa-globe"/>BALL x PIT](https://devolverdigital.com/games/ball-x-pit) which makes use of this rotating background star field motif. See the video, snipped from one of the games promo videos.

I like how the star field is random, but rotates around the center, and in rings where the direction reverses.

<VidStack src="https://videopress.com/f5ef9e7a-daa6-4325-a927-4c7a6a6f6869" />

My idea for attempting to reproduce it was to make a big stack of `<div>` containers where the top center of them are all in the exact center of the screen. Then apply:

1. A `random()` height
2. A `random()` rotation

Then if I put the “star” at the *end* (bottom center) of each `<div>`, I’ll have a random star field where I can later rotate the container around the center of the screen to get the look I was after.

Making a ton of divs is easy in Pug:

```pug
- let n = 0;  
- let numberOfStars = 1000;  
while n < numberOfStars  
  - ++n  
  div.starContainer  
    div.star
```

Then the setup CSS is:

```css
.starContainer {  
  position: absolute;
  left: 50%;
  top: 50%;
   
  rotate: random(0deg, 360deg);
  transform-origin: top center;
  display: grid;

  width: 4px;
  height: calc(1dvh * var(--c));

  &:nth-child(-n+500) {
    /* Inside Stars */
    --rand: random(--distAwayFromCenter, 0, 35);
  }

  &:nth-child(n+501) {
    /* Outside Stars */
    --rand: random(--distAwayFromCenter2, 35, 70);
  }

}

.star {
  place-self: end;
  background: red;
  height: calc(1dvh * var(--rand));
  width: random(2px, 6px);
  aspect-ratio: 1;
  border-radius: 50%;
}
```

If I chuck a low-opacity white border on each container so you can see how it works, we’ve got a star field going!

![with border on container](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/Screenshot-2025-11-18-at-10.04.53-AM.png?resize=952%2C998&ssl=1)

![border removed](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/Screenshot-2025-11-18-at-10.05.49-AM.png?resize=1024%2C992&ssl=1)

Then if we apply some animated rotation to those containers like:

```css
/* ... */
transform-origin: top center;
animation: r 20s infinite linear;

&:nth-child(-n+500) {
  /* ... */
  --rotation: 360deg;
}

&:nth-child(n+501) {
  /* ... */
  --rotation: -360deg;
}

@keyframes r {
  100% {
    rotate: var(--rotation);
  }
}
```

We get the inside stars rotating one way and the outside stars going the other way:

<VidStack src="https://videopress.com/dec6eba9-0913-45e1-9318-3181efae2f05" />

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a795f-93a6-71a4-bc05-76795c97c161"
  title="StarRotator2001"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I don’t think I got it nearly as cool as the BALL x PIT design, but perhaps the foundation is there.

I found this particular setup really fun to play with, as flipping on and off what CSS you apply to the stars and the containers can yield some really beautiful randomized stuff.

<VidStack src="https://videopress.com/93953d48-a462-48d4-91c2-f71e083afda9" />

Imagine what you could do playing with colors, shadows, size transitions, etc!

---

## Parallax Stars

While I had the star field thing on my mind, it occurred to me to attach them to a scroll-driven animation rather than just a timed one. I figured if I selected a *random* selection of 1/3 of them into three groups, I could animate them at different speeds and get a parallax thing going on.

<VidStack src="https://videopress.com/6d319a70-1695-4ed9-a383-b2923d081f96" />

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a82f5-7fde-72f5-90ab-d23632dd9ca6"
  title="Parallax Stars with random() + scroll-driven animations + animation-composition"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This one is maybe easier conceptually as we just make a bunch of star `<div>`s (I won’t paste the code as it’s largely the same as the Pug example above, just no containers) then place their top and left values randomly.

```css
.star {
  width: random(2px, 5px);
  aspect-ratio: 1;
  background: white;
  position: fixed;
  top: calc(random(0dvh, 150dvh) - 25dvh);
  left: random(0dvh, 100dvw);

  opacity: 0.5;
  &:nth-child(-n + 800) {
    opacity: 0.7;
  }
  &:nth-child(-n + 400) {
    opacity: 0.6;
  }
}
```

Then attach the stars to a scroll-driven animation off the root.

```css
.star {
  /* ... */

  animation: move-y;
  animation-timeline: scroll(root);
  animation-composition: accumulate;
  --move-distance: 100px;

  opacity: 0.5;
  &:nth-child(-n + 800) {
    --move-distance: 300px;
    opacity: 0.7;
  }
  &:nth-child(-n + 400) {
    --move-distance: 200px;
    opacity: 0.6;
  }
}

@keyframes move-y {
  100% {
    top: var(--move-distance);
  }
}
```

So each group of stars either moves their `top` position 100px, 200px or 300px over the course of scrolling the page.

The real trick here is the `animation-composition: accumulate;` which is saying not to animate the `top` position to the new value but to take the position they already have and “accumulate” the new value it was given. Leading me to think:

---

## Horizontal Rules of Gridded Dots

Intrigued by combining `random()` and different animation controlling things, I had the thought to toss `steps()` into the mix. Like what if a scroll-driven animation wasn’t smooth along with the scrolling, it kinda stuttered the movement of things only on a few “frames”. I considered trying to `round()` values at first, which is maybe still a possibility somehow, but landed on `steps()` instead.

The idea here is a “random” grid of dots that then “step” into alignment as the page scrolls. Hopefully creating a satisfying sense of alignment when it gets there, half way through the page.

Again Pug is useful for creating a bunch of repetitive elements[^1] (but could be JSX or whatever other templating language):

[^1]: Styling grid cells would be a sweet improvement to CSS in this case! Here where we’re creating hundreds or thousands of divs just to be styleable chunks on a grid, that’s a lot of extra DOM weight that is really just content-free decoration.

```pug
- var numberOfCells = 100;  
- var n = 0;  
  
.hr(role="separator")  
  - n = 0;  
  while n < numberOfCells  
    - ++n;  
    .cell
```

We can make that `<div class="hr" role="seperator">` a flex parent and then randomize some top positions of the cells to look like:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/Screenshot-2025-11-18-at-10.40.21-AM.png?resize=898%2C516&ssl=1)

```css
.hr {
  view-timeline-name: --hr-timeline;
  view-timeline-axis: block;

  display: flex;
  gap: 1px;

  > .cell {
    width: 4px;
    height: 4px;
    flex-shrink: 0;
    background: black;

    position: relative;
    top: calc(random(0px, 60px));

    animation-name: center;
    animation-timeline: --hr-timeline;
    animation-timing-function: steps(5);
    animation-range: entry 50% contain 50%;
    animation-fill-mode: both;
  }
}
```

Rather than using a *scroll* scroll-driven animation (lol) we’ll name a `view-timeline` meaning that each one of our separators triggers the animation based on it’s page visibility. Here, it starts when it’s at least half-visible on the bottom of the screen, and finished when it’s exactly half-way across the screen.

I’ll scoot those top positions to a shared value this time, and wait until the last “frame” to change colors:

```css
@keyframes center {
  99% {
    background: black;
  }
  100% {
    top: 30px;
    background: greenyellow;
  }
}
```

And we get:

<VidStack src="https://videopress.com/8b51d51f-68de-4f3a-bfec-43d673075428" />

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a8385-66ea-748e-a104-d1e2ae011ed4"
  title="hr grids"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Just playing around here. I think `random()` is an awfully nice addition to CSS, adding a bit of texture to the dynamic web, as it were.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "More CSS random() Learning Through Experiments",
  "desc": "There is quite a bit of interesting design possibility with `random()` coming to CSS. It pairs nicely with animation, particularly animation-composition for agumenting those generated values.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/more-css-random-learning-through-experiments.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
