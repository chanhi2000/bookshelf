---
lang: en-US
title: "Extracting Grid Information Using CSS"
description: "Article(s) > Extracting Grid Information Using CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Extracting Grid Information Using CSS"
    - property: og:description
      content: "Extracting Grid Information Using CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/extracting-grid-information-using-css.html
prev: /programming/css/articles/README.md
date: 2026-09-16
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11001
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
  name="Extracting Grid Information Using CSS"
  desc="It's an interesting and potentially useful trick to have an element know where it is on a grid. That's tricky enough when the items are in one row/column, but what about when they span?"
  url="https://blog.master.dev/extracting-grid-information-using-css/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11001"/>

In a [**previous article**](/blog.master.dev/hover-proximity-using-modern-css.md), calculated a few values for a responsive grid such as the **number of columns, the number of rows, and the coordinates** of the grid items.

Knowing that each item is automatically placed and spans only one row and one column, the task can be done with a bit of math:

```css
.container {
  --s: 120px; /* column size */
  --g: 10px;  /* gap */
  
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--s),1fr));
  gap: var(--g);
  container-type: inline-size; /* to be able to use 100cqw */
}
.container > * {
  /* number of columns */
  --n: round(down, (100cqw + var(--g))/(var(--s) + var(--g)));
  
  /* number of rows */
  --m: round(up, sibling-count()/var(--n));
  
  /* item coordinates */
  --x: round(down,(sibling-index() - 1)/var(--n)); /* row index */
  --y: mod(sibling-index() - 1, var(--n)); /* column index */
}
```

And since all the values are integers, we can display them using a counter:

<CodePen
  user="anon"
  slug-hash="vEgqgob"
  title="Grid information (chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

What about a grid where the items are *randomly* placed? Each item can be anywhere in the grid and can span many columns and rows. Is it possible to extract the same values in such a situation?

We can still consider the number of columns and rows, but we can no longer talk about coordinates since the grid is not uniform. Instead, we need to identify each item’s position.

Here is a figure to better understand the goal:

![A grid layout displaying a table with 10 rows and 4 columns, showing data for various grid positions including row and column indices.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/RnK4CXEE-2.png?resize=796%2C730&quality=80&ssl=1)

What you see in pink are the grid lines (shown by the dev tools) and inside each item I show the row and column position and, as you can see, they match the grid values. For example, item 3 spans two columns from the 3rd to the 5th line and two rows from the 1st to the 3rd line.

::: note

Is this possible using only CSS?

:::

Yes, it is! Not as simple as with a basic grid where we needed 4 lines of code, but possible.

::: note

At the time of writing, only Chrome and Edge fully support the features we’ll use.

:::

Still not convinced? Here is a demo:

<CodePen
  user="anon"
  slug-hash="RNpWpaG"
  title="Grid information (chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

You can add/remove as many items as you want, change their positions, and resize the screen/grid. All the values will adjust accordingly. Again, it’s a pure CSS implementation.

Don’t stare at the code for too long; follow along and let’s decipher it together.

::: note

**But you didn’t explain the first code snippet?!**

:::

I did in [**the previous article**](/blog.master.dev/hover-proximity-using-modern-css.md), and Ana Tudor did something similar [**in another one**](/blog.master.dev/count-auto-fill-columns.md). If you have confidence in your CSS knowledge, you can skip reading them, but if you consider yourself a beginner or you missed some of the recent features, I highly recommend you check both articles to understand the code I shared and familiarize yourself with some of the math functions as well as other concepts such as container, the `sibling-*()` functions, etc.

---

## The Grid Configuration

We define a responsive grid with a few variables that control the size.

```css
.container {
  --c: 150px; /* column size */
  --r: 110px; /* row size */
  --g: 8px;   /* gap */
  
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(var(--c),1fr));
  grid-auto-rows: var(--r);
  gap: var(--g);
}
```

The main requirement is equal-width columns and equal-height rows. For the columns, it’s not a big deal because it’s a classic configuration, but for the rows, I know it can be a limitation. The technique only works if I define all the rows with a known height. That’s one drawback to consider.

The good news is that row and column information aren’t linked. The equal-height requirement applies only to the row position. We can get the column position without it. The technique can still be useful in a grid where the height of the rows is unknown or varies.

---

## The Idea

Let’s start by defining the values we are looking for as variables:

```css
.container > * {
  /* number of columns */
  --n: ... ;
  /* number of rows */
  --m: ... ;
  /* column start/end */
  --col-s: ... ;
  --col-e: ... ;
  /* row start/end */
  --row-s: ... ;
  --row-e: ... ;
}
```

Except for the number of columns, I will use Scroll-Driven Animations to identify all the values. I know you are surprised, and that’s ok but if you don’t know what Scroll-Driven Animations are, then go check [<VPIcon icon="fa-brands fa-firefox"/>the MDN guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines) before you keep reading. I will explain everything, but you should at least have an overview of the basics; otherwise, you may get a bit lost.

Each item can be placed randomly within the grid, so the idea is to track each side’s position; since we have four sides, we get four position values.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/TbhIhRuW.png?resize=820%2C586&quality=80&ssl=1)

But how to track the position of only one side? We generally track the position of the whole item within the container. From [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/scroll-animations-1/#intro):

::: info "Scroll-driven Animations" *From W3C* (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> There are two types of scroll-driven timelines:
> 
> [<VPIcon icon="iconfont icon-w3c"/>Scroll Progress Timelines](https://w3.org/TR/scroll-animations-1/#scroll-timelines), which are linked to the scroll progress of a particular scroll container
> 
> [<VPIcon icon="iconfont icon-w3c"/>View Progress Timelines](https://w3.org/TR/scroll-animations-1/#view-timelines), which are linked to the view progress of a particular box through a scrollport

```component VPCard
{
  "title": "Scroll-driven Animations",
  "desc": "This specification defines mechanisms for driving the progress of an animation based on the scroll progress of a scroll container. These scroll-driven animations use a timeline based on scroll position, rather than one based on clock time. This module pr...",
  "link": "https://w3.org/TR/scroll-animations-1/#intro/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

We are interested in the second type and, more precisely, “the view progress of a particular box through a scrollport,” which means that the position of a box within a scroll container can be used to control a specific animation.

If we keep digging into the Spec, we can find a configuration where the position of the “start border edge” or the “end border edge” controls the animation progress.

Progress, timeline, animation, start edge … what?!

It’s confusing, right? It’s hard to imagine how Scroll-Driven Animations (where we have nothing to scroll and nothing to animate) can calculate the position of each side. Don’t try to fully understand it; keep in mind the idea as something abstract, and let’s move to the implementation. Writing some code will make everything clear.

---

## The Implementation

Let’s first start by calculating the number of columns and rows. With the basic grid configuration, I used the following:

```css
.container {
  --s: 120px; /* column size */
  --g: 10px;  /* gap */
  
  container-type: inline-size; /* to be able to use 100cqw */
}
.container > * {
  /* number of columns */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* number of rows */
  --m: round(up,sibling-count()/var(--n));  
}
```

For the number of columns, I consider the width of the container (defined by `100cqw`), but for the number of rows, I will be using the total number of items and the number of columns (the details of the calculation can be found in [**the previous article**](/blog.master.dev/hover-proximity-using-modern-css.md#getting-the-coordinates-of-the-hovered-item))

The formula for the number of columns is still valid with our new grid, but the formula for the number of rows is not. Each item can span multiple rows/columns, so we can no longer rely on `sibling-count()` to identify the number of rows.

But why?

Take a simple example of a grid with 5 columns containing one item that spans all columns and 3 rows. Using the previous formula `--m` will be equal to 1, which is wrong since we have 3 rows.

We should instead consider the height of the container and use the same formula for the number of columns to get the following:

```css
.container {
  --c: 150px; /* column size */
  --r: 110px; /* row size */
  --g: 8px;   /* gap */
  
  container-type: inline-size; /* to be able to use 100cqw */
  --h: ???; /* container height */
}
.container > * {
  /* number of columns */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* number of rows */
  --m: round((var(--h) + var(--g))/(var(--r) + var(--g)));
}
```

We introduce a new variable that contains the height of the container, but don’t ask me about it right now. Calculating the container height is another tricky part of the technique that I will tackle later. For now, we have the container width (`100cqw`) and the container height (`--h`) that we use to calculate the number of columns and number of rows.

Let’s move to the interesting part: getting the item position.

Let’s start with a basic demo to illustrate the technique we will use:

<!-- <CodePen
  link="https://codepen.io/editor/t_afif/pen/01a08aea-08a7-735d-910b-b16a1b579f53/ed940cab9360b0f4d4a95ebd9deb3d29"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/> -->

```css
.container {
  overflow: hidden;
}
.container > * {
  view-timeline: --x x;
  timeline-scope: --x;
  animation: --x linear both;
  animation-timeline: --x;
}
@keyframes --x { 
  0% {background: green} 
  to {background: red  }
}
```

We define a custom timeline with `view-timeline` that tracks the position of the item on the x-axis, and we use it (with `animation-timeline`) to control the animation that updates the background color. The item’s color shifts between green and red depending on its position, as you can see in the demo.

Two things to note: using `overflow: hidden` on the grid container is mandatory because that’s what defines the scroll container. The item’s position needs a reference, and that reference is the nearest scroll container, which should be our grid container.

The second thing is `timeline-scope`. Each item will define its own timeline, and they’ll all have the same name, so we need to make sure each item can only access its own timeline by scoping it to the item.

When working with Scroll-Driven Animations, you will always run into scoping and overflow issues, so never forget about them. Always define the scroll container and check your scoping.

Let’s get back to the demo. If you look closely, you will notice the first item isn’t “red” and the second isn’t “green”. Neither of them reaches the extremities of the animation, and we need to fix that. We need to adjust the `animation-range` and here we need to consider the sides of the item.

Let’s start with the left side and see if we can use it to control the animation’s progress. From [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/scroll-animations-1/#view-timelines-ranges), we can find the following:

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/KL7ViyF6.png?resize=990%2C417&quality=80&ssl=1)

We have two values that consider the “start border edge” (the left side) of the element: `entry-crossing 0%` and `exit-crossing 0%`.

Here is a figure to understand both positions:

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/x6MBD3BE.png?resize=1023%2C336&quality=80&ssl=1)

`exit-crossing 0%` is good. It gives the position where the left edge is placed on the first grid line (the element starts at the first column), but `entry-crossing 0%` considers the last grid line, making the element outside. We need to adjust it and consider the grid line before the last one.

We can use `entry-crossing calc(0% + var(--c))` or simply `entry-crossing var(--c)`. Remember that `--c` is the size of one column.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/Yi-3qeyn.png?resize=947%2C363&quality=80&ssl=1)

Now, it’s perfect, and we can use the following:

```css
animation-range: entry-crossing var(--c) exit-crossing 0%;
```

Which gives us “red” and “green”:

<!-- <CodePen
  link="https://codepen.io/editor/t_afif/pen/01a08ba7-a12c-77de-8e97-78d6b7a71422/b619c974803ef4a3c95baea52cc72bef"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/> -->

Now, instead of a color, let’s animate a variable from `1` to `0`.

```css
@keyframes --x { 
  0% {--x: 1} 
  to {--x: 0}
}
```

If the left side of the grid item is on the first grid line, we get `0`, and if it’s placed at the before-the-last grid line, we get `1`. What about the other placement? Since the columns are equal width, the animation step is `1/(N -1)`, where `N` is the number of columns.

In our demo, we have 4 columns so the animation can give us the following values depending on the item position: `0`, `0,33`, `0,66`, `1`. If we multiply the values by 3 (`N - 1`), we get: `0`, `1`, `2`, `3`. We add `1`, and we have our first value; the column start position!

```css
--col-s: round(var(--x)*(var(--n) - 1) + 1);
```

I am using `round()` to make sure the final value is always an integer.

Let’s update the previous demo and show the value inside each item:

```css
.container > *:before {
  content: counter(x);
  counter-reset: x var(--col-s);
}
```

<!-- <CodePen
  link="https://codepen.io/editor/t_afif/pen/01a08bc4-a7f0-7032-8513-685c64019b8e/b9b7554f3bf48b7037cb41847a938965"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/> -->

You can add as many items as you want and span as many columns as you want. The value will always be equal to the column start:

<!-- <CodePen
  link="https://codepen.io/editor/t_afif/pen/01a08bc9-0fec-70a6-a62e-b1f1a0781a79/2531dd2cbebc63bbced02a323f768f83"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/> -->

Clever, right? The left side of the item controls an animation that animates a variable, and we use that variable to calculate the position.

Let’s try with the right side (the column end). We are still working in the x-axis, so we don’t need a new timeline. The only difference with the left side will be the `animation-range`. Can you guess the values? Go back to [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/scroll-animations-1/#view-timelines-ranges) and give it a try.

You got it?

The starting point will be:

```css
animation-range: entry-crossing 100% exit-crossing 100%;
```

It’s similar to what we used before, but instead of `0%` we use `100%`.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/REw4V1Fg.png?resize=1023%2C347&quality=80&ssl=1)

One position is outside, so we rectify it with a shift using the column size.

```css
animation-range: entry-crossing 100% exit-crossing calc(100% - var(--c))
```

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/Dss7pLZ4.png?resize=931%2C346&quality=80&ssl=1)

And you know the rest of the story: a new animation, a new variable, and the formula to get the column end:

```css
.container > * {
  view-timeline: --x x;
  timeline-scope: --x;
  animation: 
    --x-s linear both,
    --x-e linear both;
  animation-timeline: --x;
  animation-range: 
    entry-crossing var(--c) exit-crossing 0%,
    entry-crossing 100%     exit-crossing calc(100% - var(--c));
  /* column start/end */
  --col-s: round(var(--x-s)*(var(--n) - 1) + 1);
  --col-e: round(var(--x-e)*(var(--n) - 1) + 2);
}
@keyframes --x-s { 
  0% {--x-s: 1} 
  to {--x-s: 0}
}
@keyframes --x-e { 
  0% {--x-e: 1} 
  to {--x-e: 0}
}
```

Now, we have two values that we can display within the element.

<!-- <CodePen
  link="https://codepen.io/editor/t_afif/pen/01a08ccf-c0ef-70e9-8b15-23e97e49526e/8dab94b0f1f6dc7f2735d927c85d6df4"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/> -->

::: note

But why is there a +2 in the column end value?

:::

In a 4-column configuration, the grid lines go from 1 to 5, but the column start can be between 1 and 4, and the column end can be between 2 and 5. An element that starts at line 5 or ends at line 1 will overflow, so those values are respectively excluded.

In both cases, the animation gives us a value in the range `[0 1]` that we multiply by 3 to get into the range `[0 3]`. For the column start, we use `+1` to get into the range `[1 4]`, and logically we need a `+2` to bring the column end into the range `[2 5]`.

That’s all, we are done!

::: note

What about the row position? Did you forget it?

:::

We just did it! It’s exactly the same as for the column position except that we consider the y-axis instead of the x-axis, we use `--r` (row height) instead of `--c` (column height), and `--m` (the number of rows) instead of `--n` (the number of columns).

Combining everything will give us the following code:

```css
.container > * {
  /* number of columns */
  --n: round(down,(100cqw + var(--g))/(var(--c) + var(--g)));
  /* number of rows */
  --m: round((var(--h) + var(--g))/(var(--r) + var(--g)));
  /* column start/end */
  --col-s: round(var(--x-s)*(var(--n) - 1) + 1);
  --col-e: round(var(--x-e)*(var(--n) - 1) + 2);
  /* row start/end */
  --row-s: round(var(--y-s)*(var(--m) - 1) + 1);
  --row-e: round(var(--y-e)*(var(--m) - 1) + 2);
  
  timeline-scope  --x,--y;
  view-timeline: --x x,--y y;  

  animation: linear both;
  animation-name: --x-s,--x-e,--y-s,--y-e;
  animation-timeline: --x,--x,--y,--y;
  animation-range: 
    entry-crossing var(--c) exit-crossing 0%,
    entry-crossing 100%     exit-crossing calc(100% - var(--c)),
    entry-crossing var(--r) exit-crossing 0%,
    entry-crossing 100%     exit-crossing calc(100% - var(--r));
}
@keyframes --x-s {0% {--x-s: 1} to {--x-s: 0}}
@keyframes --x-e {0% {--x-e: 1} to {--x-e: 0}}
@keyframes --y-s {0% {--y-s: 1} to {--y-s: 0}}
@keyframes --y-e {0% {--y-e: 1} to {--y-e: 0}}
```

Four animations, each one animating a variable from `1` to `0`. Two are linked to the x-axis, and two are linked to the y-axis. A tricky `animation-range` adjustment to bring the values in the correct range, then a bit of math to convert the animated values into position values.

---

## What about the container height?

This may sound like a simple task, but it’s actually the most complicated one. We are in the classic situation of `height: auto`, where the content defines the height and there is no direct way to get the computed height.

You may intuitively think that `100cqh` can do the job like `100cqw`, but no. If we use container: size, the grid will collapse, and its height becomes 0. I won’t get into the details of why, but we all know that working with height is always tricky.

That said, there is a way … a very hacky way. A way that uses Scroll-Driven Animations.

::: note

Again?!

:::

Yes, again! Don’t worry, I am not starting another complex explanation because I already wrote a detailed article on it: “[**How to Get the Width/Height of Any Element in Only CSS**](/blog.master.dev/how-to-get-the-width-height-of-any-element-in-only-css.md)”. That article is probably as long as this one but is a good follow-up if you want to explore Scroll-Driven Animations even further.

Here is the relevant code I used:

```css
.container {
  --h: calc(1px/var(--_h)); /* container height */

  overflow: hidden;
  position: relative;
  timeline-scope: --_h;
  animation: --_h linear;
  animation-timeline: --_h;
  animation-range: entry 100% exit 100%; 
}
.container:before {
  content:"";
  position: absolute;
  height: 1px;
  top: 0;
  view-timeline: --_h y;
}
@keyframes --_h {0% {--_h:1} to {--_h:0}}
```

And here is the full demo with everything packed together:

<CodePen
  user="anon"
  slug-hash="RNpWpaG"
  title="Grid information (chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

Congrats on reaching the conclusion! I am pretty sure I have lost many readers somewhere in the Implementation section saying “What the heck is this?! That’s not the CSS I know! I am leaving …”. I understand that feeling, but CSS is evolving with new mechanisms that require us to adopt new mental models to solve problems.

If you really want to unlock the power of modern CSS, you should stop seeing CSS as a simple set of properties/values. We can have complex implementations, and this article is a proof of concept.

```component VPCard
{
  "title": "Hover Proximity Using Modern CSS",
  "desc": "You can always easily style :hover, but what if you want the NEXT item to have styling too? Or, just a smidge harder, the PREVIOUS item. How about multiple in any direction?",
  "link": "/blog.master.dev/hover-proximity-using-modern-css.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Get the number of auto-fit/auto-fill columns in CSS",
  "desc": "The whole point of auto-fit and auto-fill is that you aren't saying how many columns to use. But if you knew how many the browser chose, you can make nice design decisions.",
  "link": "/blog.master.dev/count-auto-fill-columns.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animation using sibling-index()",
  "desc": "Temani mimics a View Transition by placing items using their index and translations. The placement calculation change when the index changes, which is an animation opportunity! ",
  "link": "/blog.master.dev/in-n-out-animation-using-sibling-index.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Extracting Grid Information Using CSS",
  "desc": "It's an interesting and potentially useful trick to have an element know where it is on a grid. That's tricky enough when the items are in one row/column, but what about when they span?",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/extracting-grid-information-using-css.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
