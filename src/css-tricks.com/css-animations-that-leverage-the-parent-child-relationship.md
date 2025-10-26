---
lang: en-US
title: "CSS Animations That Leverage the Parent-Child Relationship"
description: "Article(s) > CSS Animations That Leverage the Parent-Child Relationship"
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
      content: "Article(s) > CSS Animations That Leverage the Parent-Child Relationship"
    - property: og:description
      content: "CSS Animations That Leverage the Parent-Child Relationship"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-animations-that-leverage-the-parent-child-relationship.html
prev: /programming/css/articles/README.md
date: 2025-10-24
isOriginal: false
author:
  - name: Preethi
    url : https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/10/motion-blur.png
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
  name="CSS Animations That Leverage the Parent-Child Relationship"
  desc="When we change an element’s intrinsic sizing, its children are affected, too. This is something we can use to our advantage."
  url="https://css-tricks.com/css-animations-that-leverage-the-parent-child-relationship"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/10/motion-blur.png"/>

Modern CSS has great ways to position and move a group of elements relative to each other, such as [**anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md). That said, there are instances where it may be better to take up the old ways for a little animation, saving time and effort.

We’ve always been able to affect an element’s structure, like resizing and rotating it. And when we change an element’s intrinsic sizing, its children are affected, too. This is something we can use to our advantage.

Let’s say a few circles need to move towards and across one another. Something like this:

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/10/overlapping-circle-animation.mov" />

Our markup might be as simple as a `<main>` element that contains four child `.circle` elements:

```html
<main>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</main>
```

As far as rotating things, there are two options. We can (1) animate the `<main>` parent container, or (2) animate each `.circle` individually.

Tackling that first option is probably best because animating each `.circle` requires defining and setting several animations rather than a single animation. Before we do that, we ought to make sure that each `.circle` is contained in the `<main>` element and then absolutely position each one inside of it:

```scss
main {
  contain: layout;
}

.circle {
  position: absolute;

  &:nth-of-type(1){
    background-color: rgb(0, 76, 255);
  }
  &:nth-of-type(2){
    background-color: rgb(255, 60, 0);
    right: 0;
  }
  &:nth-of-type(3){
    background-color: rgb(0, 128, 111);
    bottom: 0;
  }
  &:nth-of-type(4){
    background-color: rgb(255, 238, 0);
    right: 0;
    bottom: 0;
  }
}
```

If we rotate the `<main>` element that contains the circles, then we might create a specific `.animate` class just for the rotation:

```css
/* Applied on <main> (the parent element) */
.animate {
  width: 0;
  transform: rotate(90deg);
  transition: width 1s, transform 1.3s;
}
```

…and then set it on the `<main>` element with JavaScript when the button is clicked:

```js
const MAIN = document.querySelector("main");
function play() {
  MAIN.className = "";
  MAIN.offsetWidth;
  MAIN.className = "animate";
}
```

It looks like we’re animating four circles, but what we’re really doing is rotating the parent container and changing its width, which rotates and squishes all the circles in it as well:

<CodePen
  user="rpsthecoder"
  slug-hash="OPMWvVy"
  title="Animation"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Each `.circle` is fixed to a respective corner of the `<main>` parent with absolute positioning. When the animation is triggered in the parent element — i.e. `<main>` gets the `.animate` class when the button is clicked — the `<main>` width shrinks and it rotates `90deg`. That shrinking pulls each `.circle` closer to the `<main>` element’s center, and the rotation causes the circles to switch places while passing through one another.

This approach makes for an easier animation to craft and manage for simple effects. You can even layer on the animations for each individual element for more variations, such as two squares that cross each other during the animation.

```css
/* Applied on <main> (the parent element) */
.animate {
  transform:  skewY(30deg) rotateY(180deg);
  transition: 1s transform .2s;
  
  .square {
    transform: skewY(30deg); 
    transition: inherit;
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="EaPZEjR"
  title="Animation"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

See that? The parent `<main>` element makes a `30deg` skew and flip along the Y-axis, while the two child `.square` elements counter that distortion with the same skew. The result is that you see the child squares flip positions while moving away from each other.

If we want the squares to form a separation without the flip, here’s a way to do that:

```css
/* Applied on <main> (the parent element) */
.animate {
  transform:  skewY(30deg);
  transition: 1s transform .2s;
  
  .square {
    transform: skewY(-30deg); 
    transition: inherit;
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="XJXpEmq"
  title="Animation"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

This time, the `<main>` element is skewed `30deg`, while the `.square` children cancel that with a `-30deg` skew.

Setting `skew()` on a parent element helps rearrange the children beyond what typical rectangular geometry allows. Any change in the parent can be complemented, countered, or cancelled by the children depending on what effect you’re looking for.

Here’s an example where scaling is involved. Notice how the `<main>` element’s `skewY()` is negated by its children and `scale()`s at a different value to offset it a bit.

```css
/* Applied on <main> (the parent element) */
.animate {
  transform: rotate(-180deg) scale(.5) skewY(45deg) ;
  transition: .6s .2s; 
  transition-property: transform, border-radius;
  
  .squares {
    transform: skewY(-45deg) scaleX(1.5); 
    border-radius: 10px;
    transition: inherit;
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="GgorxpR"
  title="Animation"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The parent element (`<main>`) rotates counter-clockwise (`rotate(-180deg)`), scales down (`scale(.5)`), and skews vertically (`skewY(45deg)`). The two children (`.square`) cancel the parent’s distortion by using the negative value of the parent’s skew angle (`skewY(-45deg)`), and scale up horizontally (`scaleX(1.5)`) to change from a square to a horizontal bar shape.

There are a lot of these combinations you can come up with. I’ve made a few more below where, instead of triggering the animation with a JavaScript interaction, I’ve used a `<details>` element that triggers the animation when it is in an `[open]` state once the `<summary>` element is clicked. And each `<summary>` contains an `.icon` child demonstrating a different animation when the `<details>` toggles between open and closed.

Click on a `<details>` to toggle it open and closed to see the animations in action.

<CodePen
  user="rpsthecoder"
  slug-hash="ByjQLbE"
  title="<details>"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

That’s all I wanted to share — it’s easy to forget that we get some affordances for writing efficient animations if we consider how transforming a parent element intrinsically affects the size, position, and orientation. That way, for example, there’s no need to write complex animations for each individual child element, but rather leverage what the parent can do, then adjust the behavior at the child level, as needed.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Animations That Leverage the Parent-Child Relationship",
  "desc": "When we change an element’s intrinsic sizing, its children are affected, too. This is something we can use to our advantage.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-animations-that-leverage-the-parent-child-relationship.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
