---
lang: en-US
title: "Comparing Values With CSS progress()"
description: "Article(s) > Comparing Values With CSS progress()"
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
      content: "Article(s) > Comparing Values With CSS progress()"
    - property: og:description
      content: "Comparing Values With CSS progress()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/comparing-values-with-css-progress.html
prev: /programming/css/articles/README.md
date: 2026-09-14
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10978
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
  name="Comparing Values With CSS progress()"
  desc="The new CSS progress() function maps a given value to a range. Super useful for responsive layouts, responsive typography, and fun tricks. "
  url="https://blog.master.dev/comparing-values-with-css-progress/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10978"/>

There is [<VPIcon icon="fa-brands fa-firefox"/>a new `progress()` function in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/progress) that **maps a given value against a value range.** It can be used for layout scaling, but it can do more, as you’ll see in this article where `progress()` is used to work out a boolean-like logic to conditionally style elements.

Let’s start by covering the basics.

---

## How does `progress()` work?

The syntax:

```css
progress(current value, lower bound, upper bound)
```

The current value is the one we want to evaluate against the value range defined by what I call the lower bound (start value) and upper bound (end value).

The formula used in the evaluation is:

$$
\frac{\left(\text{current value}-\text{lower bound}\right)}{\left(\text{upper bound}-\text{lower bound}\right)}
(current value - lower bound) / (upper bound - lower bound)
$$

Here’s how it works.

When the value is less than or equal to the lower bound, the function returns 0. If the value is greater than or equal to the upper bound value, we get 1. And if the value falls between the lower and upper bound, the function returns a proportional number between 0 and 1. Some sample values to see how it works:

```plaintext
When current value <= lower bound  
progress(cv, lb, ub)  
progress(10, 20, 60)  
= 0 (clamped)  
  
When current value >= upper bound  
progress(cv,lb,  ub)  
progress(16px, 9px, 12px)  
= 1 (clamped)  
  
When current value is between lower and upper bounds  
progress(cv, lb, ub)  
progress(500px, 400px, 600px)  
= 0.5
```

---

## What are the merits of `progress()`?

1. `progress()` simplifies range bound computations.
2. It returns a number that can be computed with all calculable data types (angle, percentage, etc.), or set directly to properties like `opacity` that accept numbers.
3. By default it clamps out-of-bound evaluations to 0 or 1. This helps in executing some boolean-esque logic.

`progress()` can be useful in various use cases, including fluid typography, container or viewport size-based styling, and responsive animations.

::: info Fact

The default clamping by `progress()` can be overridden with the `no-clamp` keyword. For example, `progress(no-clamp 10, 20, 60)` returns `-0.25`, instead of `0` that’s returned when clamped. Currently, Firefox supports the `no-clamp` keyword.

:::

---

## The Partitions

Besides mapping the current value into a proportional score between 0 and 1, progress() does something else that’s very important. In fact, everything starts with that.

![Number line showing lower clamp region, interpolation region, and upper clamp region.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/s_38584E33B59D86CD2D3F1C93A3E3E6432198AB02D1216F093757A04CDE3A5E48_1789101317614_interpolation-range.jpeg?resize=1024%2C576&ssl=1)

It creates three partitions. An interpolation region, a lower clamped-by-default region, and an upper clamped-by-default region.

In CSS, sometimes we need to know when a set of values are above or below a threshold.

**Here’s an example:** users are asked to fill in the names of movies they have seen recently. There are badges to be awarded, celebrating different levels of movie appreciation. When they put down three movies, they earn the Casual Viewer badge. For six movies, they get Flick Fanatic, and for nine or more, they are a Film Buff.

Behind the screen, this involves **comparing the number of movies entered to each badge level**. If a match is found, that badge is shown, along with any badges already earned.

In other words, we pick **a subset of badges for levels matching and below the current one**. Although math can do this, it’s even easier to use a readymade function.

```css
.badge {
  --isLevelUnlocked: progress(var(--movieCount), 0, var(--badgeLevel));
}
```

Let’s flesh out that example.

---

## The Example

There’s a list of empty text boxes where users fill in the movie names. There are also the badges they will earn.

```xml
<ol id="movies">
  <li>
 <label for="movie-1">Movie 1</label>
 <input id="movie-1" type="text" placeholder="ex: Jaws">
  </li>
  <li>
 <label for="movie-2">Movie 1</label>
 <input id="movie-2" type="text">
  </li>
  <!-- more inputs -->
</ol>

<ul id="badges">
  <li class="badge" style="--badgeLevel: 3"><!-- Casual Viewer --></li>
  <li class="badge" style="--badgeLevel: 6"><!-- Flick Fanatic --></li>
  <li class="badge" style="--badgeLevel: 9"><!-- Film Buff --></li>
</ul>
```

The badge levels (`--badgeLevel`) have been set.

### The Count

If we were dealing with an example where items added to the page are siblings to the ones to be shown, we could easily use `sibling-count()` to get count of the movies added by the user. Since that’s not the case here, we’ll use JavaScript to get it.

```js
// All movie text boxes on the page
const MOVIES = Array.from(document.querySelectorAll('input[type="text"]'));
// Listen for changes on the wrapper of all movie boxes
document.getElementById('movies').addEventListener('change', e =>
  // Count how many movie boxes are not empty and update --movieCount with it
  document.body.style.setProperty('--movieCount', MOVIES.filter(el => el.value.trim() !== "").length)
);
```

### The Flag

```css
@property --isLevelUnlocked {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

.badge {
  --isLevelUnlocked: progress(var(--movieCount), 0, var(--badgeLevel));
}
```

The flag, `--isLevelUnlocked`, is set up as a **registered custom property** because later we’ll check its value in a container style query. 

::: note

Container style queries allow us to look at the computed value of a custom property on a parent element and conditionally apply styles to its descendants

:::

In `progress()`, the movie count is set as the current value, 0 is the lower bound, and badge level is the upper bound. What’s important to us is comparing the movie count against the badge level.

**If the movie count is equal to or greater than a badge level, `progress()` returns 1.** That means a movie count’s matching badge level and all the badges prior it are to be shown. Here’s what happens for the Flick Fanatic badge.

```plaintext
Flick Fanatic badge has badge level 6. If the user had typed in 6 or more movies, this badge will be shown.
  
--badgeLevel = 6  
--isLevelUnlocked = progress(var(--movieCount), 0, 6)  
  
If movie count is 2  
progress(cv, lb, ub)  
progress(2,  0,  6) = 0.33333 
Flick Fanatic badge will be hidden  
  
If movie count is 6  
progress(6, 0, 6) = 1
Flick Fanatic badge will be shown  
  
If movie count is 10  
progress(10, 0, 6) = 1 (clamped)
Flick Fanatic badge will be shown
```

### The Show

All the badges’ contents are initially hidden, to be shown at the relevant movie count.

```css
.badge > * {
  /* Initially badge not shown */
  visibility: hidden;

  @container style(--isLevelUnlocked: 1) { 
 /* Badge shown */
 visibility: visible; 
  } 
}
```

**A container style query checks if `--isLevelUnlocked: 1` is valid (the badge level matches the movie count or is lower than that)**. If it is, the badge is shown.

<CodePen
  link="https://codepen.io/editor/rpsthecoder/pen/01a06bba-a1db-72d0-bd41-b316ceafc5de"
  title="Progressive display with CSS progress()"
  :default-tab="['css','result']"
  :theme="dark"/>

By using `progress()` we didn’t have to make comparisons individually for different levels, or iterate through the badges and update their styles in JavaScript.

We can apply this logic to any criteria requiring such comparisons. In a nutshell, not just the proportional number, but also the fixed 0 and 1 returned by `progress()` can be used, either in a property (like `opacity`), or with the container style query as a flag to **style elements based on which partition they fall into**.

```component VPCard
{
  "title": "Fluid Typography with progress()",
  "desc": "With the `progress()` function in CSS we've got a new way to calculate the size for type based on the viewport without problems of the past.",
  "link": "/blog.master.dev/fluid-typography-with-progress.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/05/image.png?fit=1200%2C686&ssl=1&resize=350%2C200)](https://blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators/ "Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators")

#### [Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators](https://blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators/ "Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators")

A scroll progress indicator is a pretty straightforward thing to build with a scroll()-style scroll-driven animation. But here, we'll build indicators for each section of a page using the view() style.

```component VPCard
{
  "title": "Scrubbable Staggered Animation with CSS @function",
  "desc": "Here's a brand new approach to creating staggered animations in CSS using a single progress value, allowing for smooth linkage to various inputs like scrolling. By utilizing a mathematical formula, it enhances control over animated elements without isolating their timelines, making animations more versatile and scrubbable.",
  "link": "/blog.master.dev/scrubbable-staggered-animation-with-css-function.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Comparing Values With CSS progress()",
  "desc": "The new CSS progress() function maps a given value to a range. Super useful for responsive layouts, responsive typography, and fun tricks. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/comparing-values-with-css-progress.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
