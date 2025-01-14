---
lang: ko-KR
title: "An Introduction To CSS Scroll-Driven Animations: Scroll And View Progress Timelines"
description: "Article(s) > An Introduction To CSS Scroll-Driven Animations: Scroll And View Progress Timelines"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > An Introduction To CSS Scroll-Driven Animations: Scroll And View Progress Timelines"
    - property: og:description
      content: "An Introduction To CSS Scroll-Driven Animations: Scroll And View Progress Timelines"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/introduction-css-scroll-driven-animations.html
prev: /programming/css/articles/README.md
date: 2024-12-11
isOriginal: false
author:
  - name: Mariana Beldi
    url: https://smashingmagazine.com/author/mariana-beldi/
cover: https://files.smashing.media/articles/introduction-css-scroll-driven-animations/introduction-css-scroll-driven-animations.jpg
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
  name="An Introduction To CSS Scroll-Driven Animations: Scroll And View Progress Timelines"
  desc="10 years after scroll-driven animations were first proposed, they’re finally here — no JavaScript, no dependencies, no libraries, just pure CSS."
  url="https://smashingmagazine.com/2024/12/introduction-css-scroll-driven-animations/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/introduction-css-scroll-driven-animations/introduction-css-scroll-driven-animations.jpg"/>

It’s been 10 years since scroll-driven animations were introduced in a spec proposal, and after five years in development, we’re finally beginning to see pop up in websites. There are [<FontIcon icon="fa-brands fa-codepen"/>scrolly-telling](https://codepen.io/andrewrock/pen/NWoRavN) and [<FontIcon icon="fa-brands fa-codepen"/>maze games](https://codepen.io/amit_sheen/pen/ZENNgMw) as well as [<FontIcon icon="fa-brands fa-codepen"/>cover flow animations](https://codepen.io/bramus/pen/GRdGoKy) and [<FontIcon icon="fa-brands fa-codepen"/>3D rotation with scroll](https://codepen.io/leemeyer/pen/XWvrMBr)… but what exactly is new here? It’s not like we haven’t seen scroll animations before, **but what we have now requires no JavaScript, no dependencies, no libraries — just pure CSS**. And if that’s not exciting enough, these animations run off the [**main thread**](/smashingmagazine.com/speedcurve-fight-main-thread.md), delivering smooth, high-performance, GPU-accelerated experiences.

You can safely use scroll-driven animations in Chrome as of December 2024. Firefox supports them, too, though you’ll need to enable a flag. Safari? Not yet, but don’t worry — you can still offer a seamless experience across all browsers with a [<FontIcon icon="iconfont icon-github"/>`flackr/scroll-timeline`](https://github.com/flackr/scroll-timeline). Just keep in mind that adding a polyfill involves a JavaScript library, so you won’t get the same performance boost.

There are plenty of valuable resources to dive into scroll-driven animations, which I’ll be linking throughout the article. My starting point was [<FontIcon icon="fa-brands fa-youtube"/>Bramus’ video tutorial](https://youtube.com/playlist?list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn), which pairs nicely with [<FontIcon icon="fas fa-globe"/>Geoff’s in-depth notes](https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/) [<FontIcon icon="fas fa-globe"/>Graham](https://css-tricks.com/unleash-the-power-of-scroll-driven-animations/) that build on the tutorial.

In this article, we’ll walk through the [<FontIcon icon="iconfont icon-w3c"/>latest published version by the W3C](https://w3.org/TR/scroll-animations-1/) and explore the two types of scroll-driven timelines — **scroll progress timelines** and **view progress timelines**. By the end, I hope that you are familiar with both timelines, not only being able to tell them apart but also feeling confident enough to use them in your work.

::: note

All demos in this article only work in Chrome 116 or later at the time of writing.

:::

---

## Scroll Progress Timelines

The scroll progress timeline links an animation’s timeline to the scroll position of a scroll container along a specific axis. So, the animation is tied directly to scrolling. As you scroll forward, so does the animation. You’ll see me refer to them as `scroll-timeline` animations in addition to calling them scroll progress timelines.

Just as we have two types of scroll-driven animations, we have two types of `scroll-timeline` animations: **anonymous timelines** and **named timelines**.

### Anonymous `scroll-timeline`

Let’s start with a classic example: creating a scroll progress bar at the top of a blog post to track your reading progress.

<CodePen
  user="smashingmag"
  slug-hash="RNbRqoj"
  title="Scroll Progress Timeline example - before animation-timeline scroll()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepne"/>Scroll Progress Timeline example - before animation-timeline scroll() \[forked\]](https://codepen.io/smashingmag/pen/RNbRqoj) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

In this example, there’s a `<div>` with the ID “progress.” At the end of the CSS file, you’ll see it has a background color, a defined width and height, and it’s fixed at the top of the page. There’s also an animation that scales it from `0` to `1` along the x-axis — pretty standard if you’re familiar with CSS animations!

Here’s the relevant part of the styles:

```css
#progress {
  /* ... */
  animation: progressBar 1s linear;
}


@keyframes progressBar {
  from { transform: scaleX(0); }
}
```

The `progressBar` animation runs once and lasts one second with a linear timing function. Linking this animation scrolling is just a single line in CSS:

```css
animation-timeline: scroll();
```

No need to specify seconds for the duration — the scrolling behavior itself will dictate the timing. And that’s it! You’ve just created your first scroll-driven animation! Notice how the animation’s direction is directly tied to the scrolling direction — scroll down, and the progress indicator grows wider; scroll up, and it becomes narrower.

<CodePen
  user="smashingmag"
  slug-hash="ByBzGpO"
  title="Scroll Progress Timeline example - animation-timeline scroll()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepen"/>Scroll Progress Timeline example - animation-timeline scroll() \[forked\]](https://codepen.io/smashingmag/pen/ByBzGpO) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

### `scroll-timeline` Property Parameters

In a `scroll-timeline` animation, the `scroll()` function is used inside the `animation-timeline` property. It only takes two parameters: `<scroller>` and `<axis>`.

- `<scroller>` refers to the scroll container, which can be set as `nearest` (the default), `root`, or `self`.
- `<axis>` refers to the scroll axis, which can be `block` (the default), `inline`, `x`, or `y`.

In the reading progress example above, we didn’t declare any of these because we used the defaults. But we could achieve the same result with:

```css
animation-timeline: scroll(nearest block);
```

Here, the `nearest` scroll container is the root scroll of the HTML element. So, we could also write it this way instead:

```css
animation-timeline: scroll(root block);
```

The `block` axis confirms that the scroll moves top to bottom in a left-to-right writing mode. If the page has a wide horizontal scroll, and we want to animate along that axis, we could use the `inline` or `x` values (depending on whether we want the scrolling direction to always be left-to-right or adapt based on the writing mode).

We’ll dive into `self` and `inline` in more examples later, but the best way to learn is to play around with all the combinations, and [<FontIcon icon="fas fa-globe"/>this tool by Bramus](https://scroll-driven-animations.style/tools/scroll-timeline/params/) lets you do exactly that. Spend a few minutes before we jump into the next property associated with scroll timelines.

### The `animation-range` Property

The `animation-range` for `scroll-timeline` defines which part of the scrollable content controls the start and end of an animation’s progress based on the scroll position. It allows you to decide when the animation starts or ends while scrolling through the container.

By default, the `animation-range` is set to `normal`, which is shorthand for the following:

```css
animation-range-start: normal;
animation-range-end: normal;
```

This translates to `0%` (`start`) and `100%` (`end`) in a `scroll-timeline` animation:

```css
animation-range: normal normal;
```

…which is the same as:

```css
animation-range: 0% 100%;
```

You can declare any [<FontIcon icon="fas fa-globe"/>CSS length units](https://css-tricks.com/css-length-units/) or even [**calculations**](/smashingmagazine.com/getting-started-css-calc-techniques.md). For example, let’s say I have a footer that’s `500px` tall. It’s filled with banners, ads, and related posts. I don’t want the scroll progress bar to include any of that as part of the reading progress. What I want is for the animation to start at the top and end `500px` before the bottom. Here we go:

```css
animation-range: 0% calc(100% - 500px);
```

<CodePen
  user="smashingmag"
  slug-hash="azoZQym"
  title="Scroll Progress Timeline example - animation-timeline, animation-range"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepen"/>Scroll Progress Timeline example - animation-timeline, animation-range \[forked\]](https://codepen.io/smashingmag/pen/azoZQym) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

Just like that, we’ve covered the key properties of `scroll-timeline` animations. Ready to take it a step further?

### Named `scroll-timeline`

Let’s say I want to use the scroll position of a different scroll container for the same animation. The `scroll-timeline-name` property allows you to specify which scroll container the scroll animation should be linked to. You give it a name (a dashed-ident, e.g., `--my-scroll-timeline`) that maps to the scroll container you want to use. This container will then control the animation’s progress as the user scrolls through it.

Next, we need to define the scroll axis for this new container by using the `scroll-timeline-axis`, which tells the animation which axis will trigger the motion. Here’s how it looks in the code:

```css
.my-class { 
  /* This is my new scroll-container */
  scroll-timeline-name: --my-custom-name;
  scroll-timeline-axis: inline;
}
```

If you omit the axis, then the default `block` value will be used. However, you can also use the shorthand `scroll-timeline` property to combine both the name and axis in a single declaration:

```css
.my-class { 
  /* Shorthand for scroll-container with axis */
  scroll-timeline: --my-custom-name inline;
}
```

I think it’s easier to understand all this with a practical example. Here’s the same progress indicator we’ve been working with, but with inline scrolling (i.e., along the x-axis):

<CodePen
  user="smashingmag"
  slug-hash="pvzbQrM"
  title="Named Scroll Progress Timeline"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepen"/>Named Scroll Progress Timeline \[forked\]](https://codepen.io/smashingmag/pen/pvzbQrM) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

We have two animations running:

1. A progress bar grows wider when scrolling in an inline direction.
2. The container’s background color changes the further you scroll.

The HTML structure looks like the following:

```html
<div class="gallery">
  <div class="gallery-scroll-container">
    <div class="gallery-progress" role="progressbar" aria-label="progress"></div>
    <img src="image1.svg" alt="Alt text" draggable="false" width="500">
    <img src="image2.svg" alt="Alt text" draggable="false" width="500">
    <img src="image3.svg" alt="Alt text" draggable="false" width="500">
  </div>
</div>
```

In this case, the `gallery-scroll-container` has horizontal scrolling and changes its background color as you scroll. Normally, we could just use `animation-timeline: scroll(self inline)` to achieve this. However, we also want the `gallery-progress` element to use the same scroll for its animation.

The `gallery-progress` element is the first inside `gallery-scroll-container`, and we will lose it when scrolling unless it’s absolutely positioned. But when we do this, the element no longer occupies space in the normal document flow, and that affects how the element behaves with its parent and siblings. We need to specify which scroll container we want it to listen to.

That’s where naming the scroll container comes in handy. By giving `gallery-scroll-container` a `scroll-timeline-name` and `scroll-timeline-axis`, we can ensure both animations sync to the same scroll:

```css
.gallery-scroll-container {
  /* ... */
  animation: bg steps(1);
  scroll-timeline: --scroller inline;
}
```

And is using that scrolling to define its own `animation-timeline`:

```css
.gallery-scroll-container {
  /* ... */
  animation: bg steps(1);
  scroll-timeline: --scroller inline;
  animation-timeline: --scroller;
}
```

Now we can scale this name to the progress bar that is using a different animation but listening to the same scroll:

```css
.gallery-progress {
  /* ... */
  animation: progressBar linear;
  animation-timeline: --scroller;
}
```

This allows both animations (the growing progress bar and changing background color) to follow the same scroll behavior, even though they are separate elements and animations.

### The `timeline-scope` Property

What happens if we want to animate something based on the scroll position of a sibling or even a higher ancestor? This is where the `timeline-scope` property comes into play. It allows us to extend the scope of a `scroll-timeline` beyond the current element’s subtree. The value of `timeline-scope` must be a custom identifier, which again is a dashed-ident.

Let’s illustrate this with a new example. This time, scrolling in one container runs an animation inside another container:

<CodePen
  user="smashingmag"
  slug-hash="jENrQGo"
  title="Scroll Driven Animations - timeline-scope"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [Scroll Driven Animations - timeline-scope \[forked\]](https://codepen.io/smashingmag/pen/jENrQGo) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

We can play the animation on the image when scrolling the text container because they are siblings in the HTML structure:

```html
<div class="main-container">
  <div class="sardinas-container">
    <img ...>
  </div>

  <div class="scroll-container">
    <p>Long text...</p>
  </div>
</div>
```

Here, only the `.scroll-container` has scrollable content, so let’s start by naming this:

```css
.scroll-container {
  /* ... */
  overflow-y: scroll;
  scroll-timeline: --containerText;
}
```

Notice that I haven’t specified the scroll axis, as it defaults to `block` (vertical scrolling), and that’s the value I want.

Let’s move on to the image inside the `sardinas-container`. We want this image to animate as we scroll through the `scroll-container`. I’ve added a `scroll-timeline-name` to its `animation-timeline` property:

```css
.sardinas-container img {
  /* ... */
  animation: moveUp steps(6) both;
  animation-timeline: --containerText;
}
```

At this point, however, the animation still won’t work because the `scroll-container` is not directly related to the images. To make this work, we need to extend the `scroll-timeline-name` so it becomes reachable. This is done by adding the `timeline-scope` to the parent element (or a higher ancestor) shared by both elements:

```css
.main-container {
  /* ... */
  timeline-scope: --containerText;
}
```

With this setup, the scroll of the `scroll-container` will now control the animation of the image inside the `sardinas-container`!

Now that we’ve covered how to use `timeline-scope`, we’re ready to move on to the next type of scroll-driven animations, where the same properties will apply but with slight differences in how they behave.

---

## View Progress Timelines

We just looked at **scroll progress animations**. That’s the first type of scroll-driven animation of the two. Next, we’re turning our attention to **view progress animations**. There’s a lot of similarities between the two! But they’re different enough to warrant their own section for us to explore how they work. You’ll see me refer to these as `view-timeline` animations in addition to calling them view progress animations, as they revolve around a `view()` function.

The **view progress timeline** is the second type of type of scroll-driven animation that we’re looking at. It tracks an element as it enters or exits the scrollport (the visible area of the scrollable content). This behavior is quite similar to [<FontIcon icon="fas fa-globe"/>how an `IntersectionObserver` works in JavaScript](https://css-tricks.com/an-explanation-of-how-the-intersection-observer-watches/?ref=csslayout.news) but can be done entirely in CSS.

We have anonymous and named view progress timelines, just as we have anonymous and named scroll progress animations. Let’s unpack those.

### Anonymous View Timeline

Here’s a simple example to help us see the basic idea of anonymous view timelines. Notice how the image fades into view when you scroll down to a certain point on the page:

<CodePen
  user="smashingmag"
  slug-hash="KwPMrQO"
  title="View Timeline Animation - view()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepen"/>View Timeline Animation - view() \[forked\]](https://codepen.io/smashingmag/pen/KwPMrQO) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

Let’s say we want to animate an image that fades in as it appears in the scrollport. The image’s opacity will go from `0` to `1`. This is how you might write that same animation in classic CSS using `@keyframes`:

```css
img {
  /* ... */
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

That’s great, but we want the image to `fadeIn` when it’s in view. Otherwise, the animation is sort of like a tree that falls in a forest with no one there to witness it… did the animation ever happen? We’ll never know!

We have a `view()` function that makes this a view progress animation with a single line of CSS:

```css
img {
  /* ... */
  animation: fadeIn;
  animation-timeline: view();
}
```

And notice how we no longer need to declare an `animation-duration` like we did in classic CSS. The animation is no longer tied by time but by space. The animation is triggered as the image becomes visible in the scrollport.

### View Timeline Parameters

Just like the `scroll-timeline` property, the `view-timeline` property accepts parameters that allow for more customization:

```css
animation-timeline: view( );
```

- `<inset>`<br/>Controls when the animation starts and ends relative to the element’s visibility within the scrollport. It defines the margin between the edges of the scrollport and the element being tracked. The default value is `auto`, but it can also take length percentages as well as start and end values.
- `<axis>`<br/>This is similar to the scroll-timeline’s axis parameter. It defines which axis (horizontal or vertical) the animation is tied to. The default is `block`, which means it tracks the vertical movement. You can also use `inline` to track horizontal movement or simple `x` or `y`.

Here’s an example that uses both `inset` and `axis` to customize when and how the animation starts:

```css
img {
  animation-timeline: view(20% block);
}
```

In this case:

1. The animation starts when the image is 20% visible in the scrollport.
2. The animation is triggered by vertical scrolling (`block` axis).

### Parallax Effect

With the `view()` function, it’s also easy to create parallax effects by simply adjusting the animation properties. For example, you can have an element move or scale as it enters the scrollport without any JavaScript:

```css
img {
  animation: parallaxMove 1s;
  animation-timeline: view();
}

@keyframes parallaxMove {
  to { transform: translateY(-50px); }
}
```

This makes it incredibly simple to create dynamic and engaging scroll animations with just a few lines of CSS.

<CodePen
  user="smashingmag"
  slug-hash="mybEQLK"
  title="Parallax effect with CSS Scroll driven animations - view()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

See the Pen [<FontIcon icon="fa-brands fa-codepen"/>Parallax effect with CSS Scroll driven animations - view() \[forked\]](https://codepen.io/smashingmag/pen/mybEQLK) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

### The `animation-range` Property

Using the CSS `animation-range` property with view timelines defines how much of an element’s visibility within the scrollport controls the start and end points of the animation’s progress. This can be used to fine-tune when the animation begins and ends based on the element’s visibility in the viewport.

While the default value is `normal`, in view timelines, it translates to tracking the full visibility of the element from the moment it starts entering the scrollport until it fully leaves. This is represented by the following:

```css
animation-range: normal normal;
/* Equivalent to */
animation-range: cover 0% cover 100%;
```

Or, more simply:

```css
animation-range: cover;
```

There are six possible values or `timeline-range-names`:

1. `cover`<br/>Tracks the full visibility of the element, from when it starts entering the scrollport to when it completely leaves it.
2. `contain`<br/>Tracks when the element is fully visible inside the scrollport, from the moment it’s fully contained until it no longer is.
3. `entry`<br/>Tracks the element from the point it starts entering the scrollport until it’s fully inside.
4. `exit`<br/>Tracks the element from the point it starts, leaving the scrollport until it’s fully outside.
5. `entry-crossing`<br/>Tracks the element as it crosses the starting edge of the scrollport, from start to full crossing.
6. `exit-crossing`<br/>Tracks the element as it crosses the end edge of the scrollport, from start to full crossing.

You can mix different `timeline-range-names` to control the start and end points of the animation range. For example, you could make the animation start when the element enters the scrollport and end when it exits:

```css
animation-range: entry exit;
```

You can also combine these values with percentages to define more custom behavior, such as starting the animation halfway through the element’s entry and ending it halfway through its exit:

```css
animation-range: entry 50% exit 50%;
```

Exploring all these values and combinations is best done interactively. Tools like Bramus’ [<FontIcon icon="fas fa-globe"/>view-timeline range visualizer](https://scroll-driven-animations.style/tools/view-timeline/ranges/) make it easier to understand.

### Target Range Inside `@keyframes`

One of the powerful features of `timeline-range-names` is their ability to be used inside `@keyframes`:

<CodePen
  user="smashingmag"
  slug-hash="KwPMrQO"
  title="target range inside @keyframes - view-timeline, timeline-range-name"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepen"/>target range inside @keyframes - view-timeline, timeline-range-name \[forked\]](https://codepen.io/smashingmag/pen/zxOBMaK) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

Two different animations are happening in that demo:

1. `slideIn`<br/>When the element enters the scrollport, it scales up and becomes visible.
2. `slideOut`<br/>When the element leaves, it scales down and fades out.

```css
@keyframes slideIn {
  from {
    transform: scale(.8) translateY(100px); 
    opacity: 0;
  }
  to { 
    transform: scale(1) translateY(0); 
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: scale(1) translateY(0); 
    opacity: 1;    
  }
  to { 
    transform: scale(.8) translateY(-100px); 
    opacity: 0 
  }
}
```

The new thing is that now we can merge these two animations using the `entry` and `exit` `timeline-range-names`, simplifying it into one animation that handles both cases:

```css
@keyframes slideInOut {
  /* Animation for when the element enters the scrollport */
  entry 0% {
    transform: scale(.8) translateY(100px); 
    opacity: 0;
  }
  entry 100% { 
    transform: scale(1) translateY(0); 
    opacity: 1;
  }
  /* Animation for when the element exits the scrollport */
  exit 0% {
    transform: scale(1) translateY(0); 
    opacity: 1;    
  }
  exit 100% { 
    transform: scale(.8) translateY(-100px); 
    opacity: 0;
  }
}
```

- `entry 0%`<br/>Defines the state of the element at the beginning of its entry into the scrollport (scaled down and transparent).
- `entry 100%`<br/>Defines the state when the element has fully entered the scrollport (fully visible and scaled up).
- `exit 0%`<br/>Starts tracking the element as it begins to leave the scrollport (visible and scaled up).
- `exit 100%`<br/>Defines the state when the element has fully left the scrollport (scaled down and transparent).

This approach allows us to animate the element’s behavior smoothly as it both enters and leaves the scrollport, all within a single `@keyframes` block.

### Named `view-timeline` And `timeline-scope`

The concept of using `view-timeline` with named timelines and linking them across different elements can truly expand the possibilities for scroll-driven animations. In this case, we are linking the scroll-driven animation of images with the animations of unrelated paragraphs in the DOM structure by using **a named `view-timeline` and `timeline-scope`**.

The `view-timeline` property works similarly to the `scroll-timeline` property. It’s the shorthand for declaring the `view-timeline-name` and `view-timeline-axis` properties in one line. However, the difference from `scroll-timeline` is that we can link the animation of an element when the linked elements enter the scrollport. I took the previous demo and added an animation to the paragraphs so you can see how the opacity of the text is animated when scrolling the images on the left:

<CodePen
  user="smashingmag"
  slug-hash="KwPMrBP"
  title="View-timeline, timeline-scope"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

> See the Pen [<FontIcon icon="fa-brands fa-codepen"/>View-timeline, timeline-scope \[forked\]](https://codepen.io/smashingmag/pen/KwPMrBP) by [Mariana Beldi (<FontIcon icon="fa-brands fa-codepen"/>`marianab`)](https://codepen.io/marianab).

This one looks a bit verbose, but I found it hard to come up with a better example to show the power of it. Each image in the vertical scroll container is assigned a named `view-timeline` with a unique identifier:

```css
.vertical-scroll-container img:nth-of-type(1) { view-timeline: --one; }
.vertical-scroll-container img:nth-of-type(2) { view-timeline: --two; }
.vertical-scroll-container img:nth-of-type(3) { view-timeline: --three; }
.vertical-scroll-container img:nth-of-type(4) { view-timeline: --four; }
```

This makes the scroll timeline of each image have its own custom name, such as `--one` for the first image, `--two` for the second, and so on.

Next, we connect the animations of the paragraphs to the named timelines of the images. The corresponding paragraph should animate when the images enter the scrollport:

```css
.vertical-text p:nth-of-type(1) { animation-timeline: --one; }
.vertical-text p:nth-of-type(2) { animation-timeline: --two; }
.vertical-text p:nth-of-type(3) { animation-timeline: --three; }
.vertical-text p:nth-of-type(4) { animation-timeline: --four; }
```

However, since the images and paragraphs are not directly related in the DOM, we need to declare a `timeline-scope` on their common ancestor. This ensures that the named timelines (`--one`, `--two`, and so on) can be referenced and shared between the elements:

```css
.porto {
  /* ... */
  timeline-scope: --one, --two, --three, --four;
}
```

By declaring the `timeline-scope` with all the named timelines (`--one`, `—two`, `--three`, `--four`), both the images and the paragraphs can participate in the same scroll-timeline logic, despite being in separate parts of the DOM tree.

---

## Final Notes

We’ve covered the vast majority of what’s currently defined in the [<FontIcon icon="fas fa-globe"/>CSS Scroll-Driven Animations Module Leve 1 specification](https://drafts.csswg.org/scroll-animations-1/) today in December 2024. But I want to highlight a few key takeaways that helped me better understand these new rules that you may not get directly from the spec:

### Scroll container essentials

It may seem obvious, but a scroll container is necessary for scroll-driven animations to work. Issues often arise when elements like text or containers are resized or when animations are tested on larger screens, causing the scrollable area to disappear.

### Impact of `position: absolute`

Using absolute positioning can sometimes interfere with the intended behavior of scroll-driven animations. The relationship between elements and their parent elements gets tricky when `position: absolute` is applied.

### Tracking an element’s initial state

The browser evaluates the element’s state *before* any transformations (like `translate`) are applied. This affects when animations, particularly view timelines, begin. Your animation might trigger earlier or later than expected due to the initial state.

### Avoid hiding overflow

Using `overflow: hidden` can disrupt the scroll-seeking mechanism in scroll-driven animations. The recommended solution is to switch to `overflow: clip`. Bramus has [<FontIcon icon="fas fa-globe"/>a great article about this](https://bram.us/2024/02/14/scroll-driven-animations-you-want-overflow-clip-not-overflow-hidden/) and [<FontIcon icon="fa-brands fa-youtube"/>a video from Kevin Powell](https://youtu.be/72pUm4tQesw) also suggests that we may no longer need `overflow: hidden`.

### Performance

For the best results, stick to animating GPU-friendly properties like transforms, opacity, and some filters. These skip the heavy lifting of recalculating layout and repainting. On the other hand, animating things like `width`, `height`, or `box-shadow` can slow things down since they require re-rendering. Bramus [<FontIcon icon="fas fa-globe"/>mentioned](https://bram.us/2024/05/30/scroll-driven-animations-with-css-webexpo/) that soon, more properties — like `background-color`, `clip-path`, `width`, and `height` — will be animatable on the compositor, making the performance even better.

### Use `will-change` wisely

Leverage this property to promote elements to the GPU, but use it sparingly. Overusing `will-change` can lead to excessive memory usage since the browser reserves resources even if the animations don’t frequently change.

### The order matters

If you are using the `animation` shorthand, always place the `animation-timeline` after it.

### Progressive enhancement and accessibility

Combine media queries for reduced motion preferences with the `@supports` rule to ensure animations only apply when the user has no motion restrictions, and the browser supports them.

::: tip For example:

```css
@media screen and (prefers-reduce-motion: no-preference) {
  @supports ((animation-timeline: scroll()) and (animation-range: 0% 100%)) { 
    .my-class {
      animation: moveCard linear both;    
      animation-timeline: view(); 
    }
  } 
}
```

My main struggle while trying to build the demos was more about CSS itself than the scroll animations. Sometimes, building the layout and generating the scroll was more difficult than applying the scroll animation. Also, some things that confused me at the beginning as the spec keeps evolving, and some of these are not there anymore (remember, it has been under development for more than five years now!):

- **x and y axes**<br/>These used to be called the “horizontal” and “vertical” axes, and while Firefox may still support the old terminology, it has been updated.
- **Old `@scroll-timeline` syntax**<br/>In the past, `@scroll-timeline` was used to declare scroll timelines, but this has changed in the most recent version of the spec.
- **Scroll-driven vs. scroll-linked animations**<br/>Scroll-*driven* animations were originally called scroll-*linked* animations. If you come across this older term in articles, double-check whether the content has been updated to reflect the latest spec, particularly with features like `timeline-scope`.

:::

### Resources

- All demos from this article can be found [<FontIcon icon="fa-brands fa-codepen"/>in this collection](https://codepen.io/collection/WvVpQR), and I might include [<FontIcon icon="fa-brands fa-codepen"/>more](https://codepen.io/marianab/pen/bGXdEoB) as I experiment further.
- A collection of [<FontIcon icon="fa-brands fa-codepen"/>demos from CodePen](https://codepen.io/collection/aMgBZp) that I find interesting (send me yours, and I’ll include it!)
- This [GitHub repo (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/labels/scroll-animations-1) is where you can report issues or join discussions about scroll-driven animations.
- [<FontIcon icon="fas fa-globe"/>Demos, tools, videos](https://scroll-driven-animations.style/), and (even) more information from Bramus
- Google Chrome [<FontIcon icon="fa-brands fa-youtube"/>video tutorial](https://youtube.com/playlist?list=PLNYkxOF6rcICM3ttukz9x5LCNOHfWBVnn)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Introduction To CSS Scroll-Driven Animations: Scroll And View Progress Timelines",
  "desc": "10 years after scroll-driven animations were first proposed, they’re finally here — no JavaScript, no dependencies, no libraries, just pure CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/introduction-css-scroll-driven-animations.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
