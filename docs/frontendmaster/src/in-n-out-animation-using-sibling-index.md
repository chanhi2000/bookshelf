---
lang: en-US
title: "In-N-Out Animation using sibling-index()"
description: "Article(s) > In-N-Out Animation using sibling-index()"
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
      content: "Article(s) > In-N-Out Animation using sibling-index()"
    - property: og:description
      content: "In-N-Out Animation using sibling-index()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/in-n-out-animation-using-sibling-index.html
prev: /programming/css/articles/README.md
date: 2026-07-13
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10379
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
  name="In-N-Out Animation using sibling-index()"
  desc="Temani mimics a View Transition by placing items using their index and translations. The placement calculation change when the index changes, which is an animation opportunity! "
  url="https://blog.master.dev/in-n-out-animation-using-sibling-index/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10379"/>

Chris shared a [**nice series of articles**](/blog.master.dev/in-n-out-animations-dialogs-part-1-3.md) focused on animating elements in and out of view. The first two articles were about popups & dialogs that required no JavaScript. CSS gives us native ways to open/close those elements while having cool animations. The third article was about view transitions, and while it’s a powerful CSS feature, some JavaScript code is still required to make it work.

Here is the original demo where you can add/remove items and everything adjusts smoothly:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019d175c-474f-7b41-a28f-77396e88ef21"
  title="Opening & Closing #3: View Transitions\"
  :default-tab="['css','result']"
  :theme="dark"/>

All the effects are managed with CSS, and the JavaScript is just the basic code to trigger the view transitions. Compared to some heavy JS libraries, it’s pretty minimal, and that’s cool.

In this article, I will explore another CSS-only idea that doesn’t require JavaScript (except for the one to add/remove DOM elements).

::: note

At the time of writing, only Chrome and Edge fully [<VPIcon icon="iconfont icon-caniuse"/>support the features](https://caniuse.com/wf-sibling-count) we will be using.

:::

Here is my version of the same demo:

<CodePen
  link="https://codepen.io/t_afif/pen/GgryErq/5e77a90eaf535e1eb04d68a9c0968728"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s not exactly the same as the original demo, but the CSS code required to achieve that effect is pretty small and relies mainly on one feature: `sibling-index()`.

I suppose you are curious to know how it works, right? Let’s get started!

---

## The Technique

The `sibling-index()` function in CSS returns the index of an element among its siblings. We generally consider the index to be static/fixed, which is the case in most situations, but what if we add/remove elements? The index gets updated to match the new HTML structure.

Take the following example:

```xml
<div class="container">
  <div>red</div>    <!-- index = 1 -->
  <div>green</div>  <!-- index = 2 -->
  <div>blue</div>   <!-- index = 3 -->
  <div>yellow</div> <!-- index = 4 -->
</div>
```

If we remove the “green” element, the structure becomes:

```xml
<div class="container">
  <div>red</div>    <!-- index = 1 -->
  <div>blue</div>   <!-- index = 2 -->
  <div>yellow</div> <!-- index = 3 -->
</div>
```

The index of “blue” and “yellow” have changed. If I use the index within a property and I apply a transition to that property, I will get an animation.

Here is a basic demo. Click **remove** and see what happens:

<CodePen
  link="https://codepen.io/t_afif/pen/rajpJQp/370122f4a74e23105eb537b7cc33d6a3"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

The CSS code is as simple as:

```css
.container {
  display: grid;
}
.container div {
  grid-area: 1/1;
  width: 150px;
  translate: calc((sibling-index() - 1)*160px);
  transition: .4s;
}
```

All the elements are placed on top of each other (using `grid-area: 1/1`), then translated using their indexes.

If an element is removed/added, the indexes are updated, and the translate values are recalculated, creating a nice animation thanks to the transition. With that simple trick, we can create in-and-out animations!

---

## The Demo

Let’s get back to our demo and understand what’s going on. Here is the main CSS code:

```css
ul {
  display: grid;
}
ul > li {
  --g: .5rem; /* gap between items */
  
  grid-area: 1/1;
  translate: 0 calc((sibling-index() - 1)*(100% + var(--g)));
  transition: .5s;

  @starting-style {
    opacity: 0;
    transform: translatex(-80%);
  }
}
```

I simply added a `@starting-style` declaration. That’s what controls the entry effect when a new element is added to the DOM. I am using opacity combined with a left translation to match the demo created by Chris, but it can be anything.

Here is a different entry effect using scale and opacity:

<CodePen
  user="https://codepen.io/t_afif/pen/NPdXOXG/7634f4b9270d492af0d0ce3ebe706640"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s all. With less than 10 lines of CSS, I managed to get a cool effect.

---

## The Drawbacks

Now, let’s talk about the drawbacks of this method. I am using `translate` to place the elements, which means we are working with out-of-flow content. In our case, the width of the list is good, but the height is not, and the items are overflowing their container. In some situations, it’s fine, but in others, we may need to find some workarounds to avoid this overflow.

About the `height`, all the items need to have the same height, otherwise we cannot apply this technique. Even if the items don’t have the same height, I am forcing that by using `grid-area: 1/1`. By placing all the items in the same grid area, I will get an area with a height equal to the tallest item and all items will, by default, get stretched inside that area.

Here is the previous demo where I made the second item bigger:

<CodePen
  link="https://codepen.io/t_afif/pen/GgryxJp/27943d53882ad010d20efc2457526c69"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

All the items will follow that height (unless you change the alignment). It’s still a drawback, but at least the layout is not broken, and everything works fine.

In our demo, it was about height, but in other demos, it can be width, so let’s say there is a fixed size to respect (either the height, the width, or both).

The last drawback is that we don’t really have an out animation. Removing an element will adjust all the others perfectly, but the removed element has no animation. It’s not really a drawback because we don’t have a native CSS mechanism to do this like `@starting-style` (maybe an `@ending-style` in the future?). For this reason, Chris explored [**the view transition method**](/blog.master.dev/in-n-out-animations-view-transitions-part-3-3.md) that allows us to achieve a real out animation.

::: note

That’s a lot of drawbacks!

:::

Yes, but given the code we used (barely 6 lines of CSS), it’s still a great CSS trick that can create many cool demos. Speaking about demos, let’s have a look at some of them!

---

## More Examples

Here is a list of avatars within a container. For this one, we don’t have any sizing drawbacks. The container height is good (it follows the image height), and we have a full-width configuration.

<CodePen
  link="https://codepen.io/t_afif/pen/myRpOdQ/387d810b28a94f36fb7a3c5cf0181e22"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Since the width of the container doesn’t depend on its content, I made it a container and used `cqw` to create a responsive behavior where the image may overlap to always fit within the container, regardless of the total number.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/u9xZHtrI.png?resize=659%2C377&ssl=1)

For that, I defined a slightly complex translate value that depends on the container size (`100cqw`) and the number of items (`sibling-count()`)

```css
translate: calc((sibling-index() - 1)*min(100% + var(--g),100cqw/sibling-count() - (100% - 100cqw/sibling-count())/(sibling-count() - 1))) 0;
```

Here is another idea with [**a circular list of avatars**](/css-tip.com/images-circle.md). This time, I am not using `translate` but `offset` combined with `circle()`. For this demo, the circle expands to prevent the images from overlapping.

<CodePen
  user="anon"
  slug-hash="jEbbLZb"
  title="Images around a circle"
  :default-tab="['css','result']"
  :theme="dark"/>

And if you don’t want the circle to get bigger, you can use a fixed radius value. Doing this gives us a similar behavior to the first example: an overlap between the images.

<CodePen
  link="https://codepen.io/t_afif/pen/OPWzEZJ/ce7914363ab89072e9d861e16efc7ab8"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s try with a grid of items. By knowing the container width (using `cqw`), and the item size, we can calculate the coordinate of each item within the grid and place them using translate:

```css
.container {
  --g: 10px; /*gap */
  --s: 130px; /* image size */
  
  display: grid;
  container-type: inline-size;
}
.container img {
  grid-area: 1/1;
  width: var(--s);
  /* the number of items that can fit inside one row */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* the item coordiantes */
  --i: round(down,(sibling-index() - 1)/var(--n));
  --j: mod(sibling-index() - 1,var(--n));
  translate: 
      calc(var(--j)*(100% + var(--g))) 
      calc(var(--i)*(100% + var(--g)));
}
```

In addition to the nice effect we get when adding/removing items, we also get a nice transition when you resize the screen. Try it!

<CodePen
  user="anon"
  slug-hash="bNgamKV"
  title="Animated grid layout on resize"
  :default-tab="['css','result']"
  :theme="dark"/>

I was also able to overcome the height drawback by using a hidden `<div>` inside the grid as a last child. By placing it in the correct row, I ensure the container grows to accommodate all the elements. I won’t get into the fine details of this hack, but it illustrates that, depending on the use case, we can find workarounds to address some of the drawbacks we listed previously.

---

## Conclusion

Respect to `sibling-index()`! Now, you know the superpower of this feature. Getting the index of an element? Nah, making cool demos featuring in-and-out animations!

Don’t forget to check [**the article series by Chris**](/blog.master.dev/in-n-out-animations-dialogs-part-1-3.md), especially the third one. It would be a good exercise to implement my demos using the view transition technique and compare both methods.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "In-N-Out Animation using sibling-index()",
  "desc": "Temani mimics a View Transition by placing items using their index and translations. The placement calculation change when the index changes, which is an animation opportunity! ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/in-n-out-animation-using-sibling-index.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
