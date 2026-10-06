---
lang: en-US
title: "Counting Elements in CSS: Using Sibling-Count and Hacks"
description: "Article(s) > Counting Elements in CSS: Using Sibling-Count and Hacks"
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
      content: "Article(s) > Counting Elements in CSS: Using Sibling-Count and Hacks"
    - property: og:description
      content: "Counting Elements in CSS: Using Sibling-Count and Hacks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/transferring-sibling-count-to-a-parent-element.html
prev: /programming/css/articles/README.md
date: 2026-10-05
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11264
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
  name="Counting Elements in CSS: Using Sibling-Count and Hacks"
  desc="Discover how to count children in CSS using hacks with Scroll-Driven Animations. Learn techniques to transfer values effectively!"
  url="https://blog.master.dev/transferring-sibling-count-to-a-parent-element/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11264"/>

How many elements does your container have?

You might think you can answer that with `sibling-count()` until you find out that it counts *siblings* and not *children*. We can always rely on `:has()` to create quantity queries selectors (I have [**a nice tool**](/css-tip.com/quantity-queries.md) for that), but we cannot get the number of items as a value.

There is a [proposal for `children-count()` (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/11068), but it’s still in discussion, so we are far from any implementation. Until we get an official release, let’s do it!

We actually do have the information thanks to `sibling-count()`, but it’s not in the right place. The parent element cannot access it. For this reason, I am talking about a transfer in the title.

::: note

Transferring? What does that mean?

:::

In CSS, inheritance is a native mechanism for transferring values between an element and its descendants. In our case, we’ll do the reverse path: from an element to its parent. Of course, there is no native way to do this, so we are going to hack it. A hack made possible using Scroll-Driven Animations.

::: note

At the time of writing, only Chrome and Edge fully support the features we’ll use.

:::

---

## Previously

Since this isn’t the first time I am “hacking” with Scroll-Driven Animations, here’s a quick summary of some previous tricks I have used.

1. The first one is [**getting the width/height of any element using pure CSS**](/blog.master.dev/how-to-get-the-width-height-of-any-element-in-only-css.md). It was my first major experiment with [<VPIcon icon="fa-brands fa-firefox"/>Scroll-Driven Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), and I already talked about transferring sizes there. In addition to getting the dimensions with pure CSS, we can make them available anywhere on the page.
2. Then, I focused on range sliders where I was able [**to retrieve the current value and show it inside a tooltip**](/blog.master.dev/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md). I also used that same technique [**to update a CSS variable using a range slider**](/css-tip.com/css-variables-range-slider.md) without relying on JavaScript. I even [**played with the `<progress>` element**](/blog.master.dev/custom-progress-element-using-anchor-positioning-scroll-driven-animations.md).
3. Lately, I was able [**to extract various grid information**](/blog.master.dev/extracting-grid-information-using-css.md) such as the number of rows, the number of columns, and item positions.

[<VPIcon icon="fas fa-globe"/>Roman Komarov](https://kizu.dev/) also wrote about some elaborated techniques around Scroll-Driven Animations. He gave a solution to [<VPIcon icon="fas fa-globe"/>the shrinkwrap problem](https://kizu.dev/shrinkwrap-solution/), a way [<VPIcon icon="fas fa-globe"/>to transfer states between elements](https://kizu.dev/scroll-driven-state-transfer/), and [<VPIcon icon="fas fa-globe"/>many other tricks](https://kizu.dev/tags/scroll_driven_animations/).

Should I read all these articles?!

If they sound interesting, sure! Especially if you want to explore the hacky side of Scroll-Driven Animations. The main purpose of this feature is to animate stuff on scroll ([<VPIcon icon="fas fa-globe"/>Bramus has a lot of good content](https://scroll-driven-animations.style/) on it), but if we dig into it, we can see it can do a lot more.

All the articles I listed rely on a common technique: calculate a value and transfer it somewhere else. Two powerful things we all want in CSS: being able to get values like width, height, position, distance, etc., and being able to transfer them to any other element.

This article is not an exception; I am going to repeat the same logic to implement `children-count()`. You can easily follow this logic if you’ve read at least one of my previous articles. If not, it’s a good opportunity to learn a new CSS trick!

---

## The Implementation

The main structure is a container with various elements we want to count. To that structure, we add an extra element:

```xml
<div class="container">
  <!-- the real content with many elements -->
  <n></n>
</div>
```

I am using `<n>`, but it can be anything. I avoid using a div or span to make sure it doesn’t get styled accidentally.

I am usually not a fan of adding extra elements or changing the HTML structure, but for this trick I found no other way, so I am considering it a drawback of this method. And yes, adding that extra element will increase the number of children, but a `-1` in the formula will easily fix that.

Next, we style that element as follows:

```css
.container > n {
  position: absolute;
  width: calc((sibling-count() - 1)*1px); 
  /* -1 is used to exclude our extra element from the count */
}
```

Do you see where I am going with this?

The extra element has its width equal to `children-count() * 1px`, so the value we want to retrieve and transfer is a “width of an element”, and I already did that in my article: “[How to Get the Width/Height of Any Element in Only CSS](https://blog.master.dev/how-to-get-the-width-height-of-any-element-in-only-css/)”!

We are done; go read the article and apply that method here. Bye!

::: note

Wait? What?!

:::

No, I am joking!

My previous technique works fine here (I will share it later), but I am going to try a simpler approach for this particular case.

```css
.container {
  position: relative;
  overflow: auto; /* or hidden */
  timeline-scope: --n;
  animation: --n linear both;
  animation-timeline: --n;
  animation-range: exit calc(100% - 1000px) exit 100%;
}
.container > n {
  position: absolute;
  left: 0;
  width: calc((sibling-count() - 1)*1px);
  view-timeline: --n x;
}
@keyframes --n {
  0% {--n: 1000}
  to {--n: 0   }
}
```

First of all, we add `position: relative` to the container, and we place the custom element using `left: 0`. Then we need to use `overflow: auto` (or `hidden`) to transform our container into a scrollable container.

When working with scroll-driven animations, you always use a scrollable container as a reference, so don’t forget it. Even if you have nothing to scroll, you need to identify/set your scroll container. In our case, the extra element is setting a custom timeline using `view-timeline`, and if you check the [<VPIcon icon="fa-brands fa-firefox"/>MDN definition](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline), you can read:

::: info "<code>view-timeline</code> CSS property" *From MDN Web Docs* (<VPIcon icon="fa-brands fa-firefox"/><code>developer.mozilla.org</code>)

> The `view-timeline` shorthand property defines a named view progress timeline, which progresses based on changes to the visibility of **an element** (the subject) within a **scrollable element** (scroller).

<SiteInfo
  name="view-timeline CSS property - CSS | MDN"
  desc="The view-timeline CSS shorthand property defines a named view progress timeline's name, direction, and inset values."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/view-timeline/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

It’s a relation between two elements: the subject and the scrollable container.

Next, we have a strange animation setting on the container element where the variable `--n` contains the value of `children-count()`. Quite confusing code, right? The trick is within that `animation-range` declaration.

The element is placed on the left side of the container, and its width changes based on the number of children. In other words, the element’s right side has a variable position, and that position is the key. We can use it to control the animation progress.

![Bar graph showing values of N = 0, 30, 60, and 100 with corresponding height markers at 0px, 30px, 60px, and 100px.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/3G0kohjj.png?resize=618%2C443&quality=80&ssl=1)

If you check [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/scroll-animations-1/#view-timelines), you can find that `exit 100%` is the same as `cover 100%`, and the latter is defined as follows:

::: "3. View Progress Timelines" *From W3C* (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> 100% progress represents the earliest position at which **the end border edge** of the element’s principal box coincides with the **start edge** of its view progress visibility range.

```component VPCard
{
  "title": "3. View Progress Timelines | Scroll-driven Animations",
  "desc": "Often animations are desired to start and end during the portion of the scroll progress timeline that a particular box (the view progress subject) is in view within the scrollport. View progress timelines are segments of a scroll progress timeline that are scoped to the scroll positions in which any part of the subject element’s principal box interse...,
  "link": "https://w3.org/TR/scroll-animations-1/#view-timelines",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

When the container has `0` children, the custom element has a width of `0`, meaning its end border (the right side) coincides with the start edge of the container (the left side), so `exit 100%` is when we have `0` children.

Now, if the container has `1000` children, the element has a width of `1000px`, meaning its end border is at `1000px` from the start edge of the container. The latter is nothing but `exit calc(100% - 1000px)`.

So `exit calc(100% - Npx)` represents the position where we have `N` children, and since we use a linear animation, defining two points is enough to cover all the cases.

```css
.container {
  animation: --n linear both;
  animation-range: 
    exit calc(100% - 1000px) /* will match the "0%" of the animation */
    exit calc(100% - 0px  ); /* will match the "to" of the animation */
}
@keyframes --n {
  0% {--n: 1000}
  to {--n: 0   }
}
```

The bit `exit calc(100% - 0px)` is the same as `exit 100%`, which we can simplify to only `exit`. When the last value is omitted, it defaults to `100%`.

```css
animation-range: exit calc(100% - 1000px) exit;
```

`1000` is an arbitrary value I am using as a max value. If you have more than 1,000 elements, increase it.

That’s all! We transferred `sibling-count()` to the parent element.

---

## More Implementations

The previous implementation requires adding an extra element as well as using `position: relative` and `overflow: auto` on the container. Those two properties can be problematic because they affect the layout you are working with, so they’re another drawback.

That said, we can use another implementation and avoid them. We can rely on a more complex animation setup to calculate the width of the element without making the container scrollable and the extra element can be anywhere on the page.

```css
.container {
  timeline-scope: --n;
  animation: linear both;
  animation-name: --s,--e;
  animation-timeline: --n;
  animation-range: 
    exit calc(0%   - 10000px) exit 0%,
    exit calc(100% - 10000px) exit 100%;
  --n: round((var(--e) - var(--s)) * 10000);
}
@keyframes --s {
  0% {--s: 1}
  to {--s: 0}
}
@keyframes --e {
  0% {--e: 1}
  to {--e: 0}
}
.container > n {
  position: absolute;
  width: calc((sibling-count() - 1)*1px);
  view-timeline: --n x;
}
```

I won’t bother you with another long explanation (Roman Komarov is already working on an article explaining this technique), but the main idea is to use two animations, each tracking the progress of one side (left and right), then subtract to get the final value. The story has a scrollable container, but we don’t need to worry about it.

Want another implementation? Let’s go!

```css
.container {
  timeline-scope: --n;
  animation: --n linear both;
  animation-timeline: --n;
  animation-range: entry 100% exit 100%; 
  --n: round(1/(var(--_n)));
}
@keyframes --n {
  0% {--_n: 1}
  to {--_n: 0}
}
.container > n {
  position: absolute;
  overflow: auto;
  width: calc((sibling-count() - 1)*1px);
}
.container > n:before {
  content: ""; 
  display: block;
  width: 1px;
  view-timeline: --n x;
}
```

We are back to one animation, but this time I need to consider the pseudo-element of the extra element to do my calculation. Another way to extract the width without using `position: relative` or `overflow: auto` on the container. This method is taken from my article: “[**How to Get the Width/Height of Any Element in Only CSS**](/blog.master.dev/how-to-get-the-width-height-of-any-element-in-only-css.md)”

::: note

Which one to use?

:::

It’s up to you. Scroll-driven animations are so powerful that we can express the same thing in different ways, and that is the most important part of the article. Having ready-to-use code is good, but understanding different logic and implementations is better.

---

## A Few Use Cases

The first use case is to be able to display the value, and we can easily do that using a `counter()` and a pseudo-element:

```css
:before { /* or :after */
  content: counter(n);
  counter-reset: n var(--n);
}
```

It’s even more interesting when the content is initially hidden, so you can give a visual indicator of the number of items.

<CodePen
  link="https://codepen.io/editor/t_afif/pen/01a0e974-4336-7659-8587-fa4863c1f22a"
  title="children-count() using pure CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

I am using a basic `<details>` structure as follows:

```xml
<details>
  <summary>Show All The Replies </summary>
  <div class="container">
    <!-- a lot of items here -->
    <n></n>
  </div>
</details>
```

The cool part is that I count the items inside the container and transfer the value to the details element. Yes, you can transfer the value anywhere on the page. Then the summary inherits the value and shows it within its pseudo-element.

```css
details {
  /* this element gets all the animation stuff */
  --n: round(1/(var(--_n)));
}
/* we display the value inside summary */
details summary:after {
  content: "(" counter(n) ")";
  counter-reset: n var(--n);
}
```

Another use case is creating dynamic layouts (generally grid layouts) based on the number of children.

Here is an example where we try to have a balance between the number of rows and columns when you add/remove items (A [<VPIcon icon="fas fa-globe"/>square-ish layout called by Roman Komarov](https://kizu.dev/tree-counting-and-random/#square-ish-layout))

<CodePen
  link="https://codepen.io/editor/t_afif/pen/01a0e9ae-af7f-713a-a828-ab688aebc94e"
  title="Square-ish layout"
  :default-tab="['css','result']"
  :theme="dark"/>

All we had to do was calculate the square root of `children-count()`:

```css
grid-template-columns: repeat(round(up,sqrt(var(--n))), 100px);
```

If, for example, we have 15 children, the square root is 3,87. Rounded to an integer, we get 4, meaning 4 columns. Then we will need 4 rows as well to place all the items.

![A grid of diverse portrait photographs featuring individuals of various ages and expressions.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/mKwC3sgW.png?resize=480%2C445&quality=80&ssl=1)

Knowing the number of children can also help you handle out-of-flow content. In a [**previous article**](/blog.master.dev/in-n-out-animation-using-sibling-index.md), I had to place different items using translate to create a nice entry effect. One of the drawbacks was the overflowing content, and to fix it, we can use `children-count()` to adjust the parent height:

<CodePen
  link="https://codepen.io/editor/t_afif/pen/01a0eec9-165f-78a1-89b9-4ce6aa4b9a12/91903bfe4ac3637790ca8b0786389b46"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Another example with a circular layout

<CodePen
  link="https://codepen.io/editor/t_afif/pen/01a0eee6-0f37-75aa-8d27-84e1ec1fc26b/214fa7f177fc1926a21a7c3c08eb7aeb"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Do you have more use cases? Go share them in [the proposal (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/11068) so we can push the working group to adopt this feature as soon as possible.

---

## Conclusion

The whole article could have been one line of JavaScript, right? I agree, and that’s what you should use in your real project.

```js
document.querySelector(".container").childElementCount
```

This CSS-only implementation was more an exercise to explore some modern features and have some fun. It’s also a proof of concept to show that `children-count()` can be implemented, so let’s hope for an official release soon.

```component VPCard
{
  "title": "Infinite Marquee Animation using Modern CSS",
  "desc": "A row of logos that animate forever perfectly and don't have any duplicated HTML or JavaScript at all is quite a trick. Thanks modern CSS! ",
  "link": "/blog.master.dev/infinite-marquee-animation-using-modern-css.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Staggered Animation with CSS sibling-* Functions",
  "desc": "The new CSS sibling-index() (and -count()) functions are perfect for staggered timing affects. This goes a little step further staggering both before and after a selected element.",
  "link": "/blog.master.dev/staggered-animation-with-css-sibling-functions.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "(Up-) Scoped Scroll Timelines",
  "desc": "You can give a name (“custom ident”) to any scrolling element's “timeline”, have a parent element pick it up, then have any other element use it for their own animation timeline. It's a trip!",
  "link": "/blog.master.dev/scoped-scroll-timelines.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Counting Elements in CSS: Using Sibling-Count and Hacks",
  "desc": "Discover how to count children in CSS using hacks with Scroll-Driven Animations. Learn techniques to transfer values effectively!",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/transferring-sibling-count-to-a-parent-element.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
