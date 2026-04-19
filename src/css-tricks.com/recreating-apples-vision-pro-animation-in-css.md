---
lang: en-US
title: "Recreating Apple’s Vision Pro Animation in CSS"
description: "Article(s) > Recreating Apple’s Vision Pro Animation in CSS"
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
      content: "Article(s) > Recreating Apple’s Vision Pro Animation in CSS"
    - property: og:description
      content: "Recreating Apple’s Vision Pro Animation in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/recreating-apples-vision-pro-animation-in-css.html
prev: /programming/css/articles/README.md
date: 2026-04-23
isOriginal: false
author:
  - name: John Rhea
    url: https://css-tricks.com/author/johnrhea/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/apple-vision-pro.webp
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
  name="Recreating Apple’s Vision Pro Animation in CSS"
  desc="Putting CSS’s more recent scrolling animation capabilities to the test to recreate a complex animation of the Apple Vision Pro headset from Apple's website."
  url="https://css-tricks.com/recreating-apples-vision-pro-animation-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/apple-vision-pro.webp"/>

Apple’s product animations, particularly the scrolly teardowns (technical term), have always been inspiring. But these bleeding-edge animations have always used JavaScript and other technologies. Plus, they aren’t always responsive (or, at least, Apple switches to a static image at a certain width).

I’ve been wowed by CSS’s more recent scrolling animation capabilities and wondered if I could rebuild one of these animations in just CSS *and* make it responsive. (In fact, CSS sure has come a long way since [**the last attempt in this publication**](/css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages.md).) The one I’ll be attempting is from the [<VPIcon icon="fa-brands fa-apple"/>Vision Pro site](https://apple.com/apple-vision-pro/) and to see it you’ll need to scroll down until you hit a black background, a little more than halfway down the page. If you’re too ~lazy~ errr… efficient to go look yourself, and/or they decide to change the animation after this article goes live, you can watch this video:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/03/AppleSite.mov" />

::: note

While Apple’s version works in all major browsers, the CSS-only version, at the time of this writing, will not work in Firefox.

:::

---

## Apple’s Animation

The first thing we have to do is identify what’s going on in the original animation. There are two major stages.

### Stage 1: “Exploding” Hardware

Three electronic components rise in sequence from the Vision Pro device at the bottom of the page. Each of the three components is a set of two images that go both in front of and behind other components like a sub roll around a hot dog bun around a bread stick. (Yes, that’s a weird analogy, but you get it, don’t you?)

The first, outermost component (the sub roll) comprises the frontmost and the hindmost images allowing it to appear as if it’s both in front of and behind the other components.

The next component (the hot dog bun) wraps the third component (the bread stick) similarly. This provides depth, visual interest, and a 3D effect, as transparent areas in each image allow the images behind it to show through.

### Stage 2: Flip-Up to Eyepieces

The final piece of the Vision Pro animation flips the device up in a smooth motion to show the eyepieces. Apple does this portion with a video, using JavaScript to advance the video as the user scrolls.

Let’s recreate these, one stage at a time.

---

## “Exploding” Hardware

Since Apple already created the six images for the components, we can borrow them. Initially, I started with a stack of `img` tags in a `div` and used `position: fixed` to keep the images at the bottom of the page and `position: absolute` to have them overlap each other. However, when I did this, I ran into two issues: (1) It wasn’t responsive — shrinking the width of the viewport made the images go off screen, and (2) the Vision Pro couldn’t scroll into view or scroll out of view as it does on the Apple site.

After banging my head against this for a bit, I went back and looked at how Apple constructed it. They had made each image a background image that was at `background-position: bottom center`, and used `background-size: cover` to keep it a consistent aspect ratio. I still needed them to be able to overlap though, but I didn’t want to pull them out of flow the way `position: absolute` does so I set `display:` `grid` on their parent element and assigned them all to the same grid area.

```css
.visionpro { /* the overarching div that holds all the images */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.part { /* each of the images has a part class */
  grid-area: 1 / 1 / 2 / 2;
}
```

As my logic professor used to say in the early aughts, *“Now we’re cooking with gas!”* (I don’t really know how that applies here, but it seemed appropriate. Somewhat illogical, I know.)

I then began animating the components. I started with a [**scroll timeline**](/css-tricks.com/almanac-properties/scroll-timeline-name.md) that would have allowed me to pin the animation timeline to scrolling the entire `html` element, but realized that if the Vision Pro (meaning the elements holding all of the images) was going to scroll both into and out of the viewport, then I should switch to a [**view timeline**](/css-tricks.com/almanac-functions/view.md) so that scrolling the element into view would start the animation rather than trying to estimate a keyframe percentage to start on where the elements would be in view (a rather brittle and non-responsive way to handle it).

Scrolling the Vision Pro into view, pausing while it’s animating, and then scrolling it out of view is a textbook use of `position: sticky`. So I created a container `div` that fully encapsulated the Vision Pro `div` and set it to `position: relative`. I pushed the container `div` down past the viewport with a top margin, and set `top` on the vision pro `div` to 0. You could then scroll up till the `position: sticky` held the vision pro in place, the animation executed and then, when the container had been entirely scrolled through, it would carry the Vision Pro `div` up and out of the viewport.

Now, to tackle the component moves. When I first used a `translate` to move the images up, I had hoped to use the natural order of the elements to keep everything nicely stacked in my bread-based turducken. Alas, the browser’s sneaky optimization engine placed my sub roll entirely on top of my hot dog bun, which was entirely on top of my breadstick. Luckily, using `z-index` allowed me to separate the layers and get the overlap that is part of why Apple’s version looks so awesome.

Another problem I ran into was that, at sizes smaller than the 960-pixel width of the images, I couldn’t reliably and responsively move the components up. They needed to be far enough away that they didn’t interfere with Stage 2, but not so far away that they went fully out of the viewport. (Where’s a bear family and a blonde girl when you need them?) Thankfully, as it so often does, algebra saved my tuchus. Since I have the dimensions of the full-size image (960px by 608px), and the full width of the image is equal to the width of the viewport, I could write an equation like below to get the height and use that in my translation calculations for how far to move each component.

```css
--stage2-height: calc(min(100vw, 960px) * 608 / 960);
```

However, this calculation breaks down when the viewport is shorter than `608px` and wider than `960px` because the width of the image is no longer equal to `100vw`. I initially wrote a similar equation to calculate the width:

```css
--stage2-width: calc(min(100vh, 608px) * 960 / 608);
```

But it also only works if the height is `608px` or less, and they both won’t work while the other one applies. This would be a simple fix using an “if” statement. [**While CSS does have an `if()` function**](/css-tricks.com/if-css-gets-inline-conditionals.md) as I’m writing this, it doesn’t work in Safari. While I know this whole thing won’t work in Firefox, I didn’t want to knock out a whole other browser if I could help it. So, I fixed it with a media query:

```css
:root {
  --stage2-height: calc(min(100vw, 960px) * 608 / 960);
  --stage2-width: calc(min(100vh, 608px) * 960 / 608);
}

@media screen and (max-height: 608px) {
  :root {
    --stage2-height: calc(var(--vid-width) * 608 / 960);
  }
}
```

I patted myself on the back for my mathematical genius and problem-solving skills until I realized (as you smarty pants people have probably already figured out) that if the height is less than `608px`, then it’s equal to `100vh`. (Yes, [**`vh` is a complicated unit**](/css-tricks.com/the-large-small-and-dynamic-viewports.md), particularly on iOS, but for this proof of concept I’m ignoring its downsides).

So, really all I needed was:

```css
:root {
  --stage2-height: calc(min(100vw, 960px) * 608 / 960);
}

@media screen and (max-height: 608px) {
  :root {
    --stage2-height: 100vh;
  }
}
```

But whatever my mathematical tangents (Ha! Terrible math pun!), this allowed me to base my vertical translations on the height of the Stage 2 graphics, e.g.:

```css
translate: 0 calc(var(--stage2-height) * -1 - 25vh);
```

…and thus get them out of the way for the Stage 2 animation. That said, it wasn’t perfect, and at viewports narrower than `410px`, I still had to make an adjustment to the heights using a media query.

---

## Flip-Up to Eyepieces

Unfortunately, there’s no way to either start a video with just CSS or modify the frame rate with just CSS. However, we can create a set of keyframes that changes the background image over time, such as:

```css
/* ... */

50% {
  background-image: url(imgs/video/00037.jpg);
  z-index: -1;
}

51% {
  background-image: url(imgs/video/00039.jpg);
  z-index: -1;
}

52% {
  background-image: url(imgs/video/00041.jpg);
  z-index: -1;
}

/* ... */
```

(Since there’s, like, 60-some images involved in this one, I’m not giving you the full set of keyframes, but you can go look at the `cssvideo` keyframes in the complete [CodePen (<VPIcon icon="fa-brands fa-codepen"/>`undeadinstitute`)](https://codepen.io/undeadinstitute/pen/bNweEOB?editors=1100) for the full Monty.)

The downside of this, however, is that instead of one video file, we’re downloading 60+ files for the same effect. You’ll notice that the file numbers skip a number between each iteration. This was me halving the number of frames so that we didn’t have 120+ images to download. (You might be able to speed things up with a sprite, but since this is more proof-of-concept than a production-ready solution, I didn’t have the patience to stitch 60+ images together).

The animation was a bit choppy on the initial scroll, even when running the demo locally.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/03/stutter.mov" />

So I added:

```html
<link rel="preload" as="image" href="imgs/video/00011.jpg">
```

…for every image, including the component images. That helped a lot because the server didn’t have to parse the CSS before downloading all the images.

Using the same view timeline as we do for Stage 1, we run an animation moving it into place and the `cssvideo` animation and the eyepieces appear to “flip up.”

```css
animation: vpsf-move forwards, cssvideo forwards;
animation-timeline: --apple-vp, --apple-vp;
```

---

## Fine Tuning

While a view timeline was great, the animation didn’t always begin or end exactly when I wanted it to. Enter [**`animation-range`**](/css-tricks.com/almanac-properties/a/animation-range/). While there’s a lot of options what I used on all of the `.part`s was

```css
animation-range: contain cover;
```

This made sure that the Vision Pro element was inside the viewport before it started (`contain`) and that it didn’t fully finish the animation until it was out of view (`cover`). This worked well for the parts because I wanted them fully in view before the components started rising and since their endpoint isn’t important they can keep moving until they’re off screen.

However, for Stage 2, I wanted to be sure the flip up animation had ended before it went off screen so for this one I used:

```css
animation-range: cover 10% contain;
```

Both `cover` and `10%` refer to the start of the animation, using the `cover` keyword, but pushing its start 10% later. The `contain` ensures that the animation ends before it starts going off screen.

Here’s everything together:

<CodePen
  user="anon"
  slug-hash="bNweEOB"
  title="CSS Only Apple Vision Pro Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And here’s a video in case your browser doesn’t support it yet:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/03/Codepenrecording.mov" />

---

## Conclusion

CSS sure has come a long way and while I definitely used some cutting edge features there were also a lot of relatively recent additions that made this possible too.

With scroll timelines, we can attach an animation to the scroll either of an entire element or just when an element is in view. The `animation-range` property let us fine-tune when the animation happened. `position: sticky` lets us easily hold something on screen while we animate it even as its scrolling. Grid layout allowed overlap elements without pulling them out of flow. Even `calc()`, viewport units, custom properties, and media queries all had their roles in making this possible. And that doesn’t even count the HTML innovations like preload. *Incredible!*

Maybe we should add a W to WWW: The World Wide *Wondrous* Web. Okay, okay you can stop groaning, but I’m not wrong…

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Recreating Apple’s Vision Pro Animation in CSS",
  "desc": "Putting CSS’s more recent scrolling animation capabilities to the test to recreate a complex animation of the Apple Vision Pro headset from Apple's website.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/recreating-apples-vision-pro-animation-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
