---
lang: en-US
title: "In-N-Out Animations: Popovers (Part 2/3)"
description: "Article(s) > In-N-Out Animations: Popovers (Part 2/3)"
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
      content: "Article(s) > In-N-Out Animations: Popovers (Part 2/3)"
    - property: og:description
      content: "In-N-Out Animations: Popovers (Part 2/3)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/in-n-out-animations-popovers-part-2-3.html
prev: /programming/css/articles/README.md
date: 2026-06-12
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9974
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
  name="In-N-Out Animations: Popovers (Part 2/3)"
  desc="Using our 3, 2, 1 state system, we can make popovers animate on "
  url="https://blog.master.dev/in-n-out-animations-popovers-part-2-3/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9974"/>

We kicked this series off looking a animating in and out the `<dialog>` element. This time we’re going to look at popovers. That is, this modern beauty:

```html
<button popovertarget="my-popover">
  Toggle Popover
</button>

<aside popover id="my-popover">
  Content of popover
</aside>
```

That “popover” will open and close (i.e. change from `display: none;` to `display: block;`) automatically with the button press. But we want to animate that! In and out!

Admittedly, popovers are fairly similar to dialogs (but certainly [**have important differences**](/blog.master.dev/whats-the-difference-between-htmls-dialog-element-and-popovers.md)), and that is part of the point. We’re going to show off that our three-phase system we established in the first article transfers over to something else just fine.

::: info Article Series

```component VPCard
{
  "title": "In-N-Out Animations: Dialogs (Part 1/3)",
  "desc": "You can style the ",
  "link": "/blog.master.dev/in-n-out-animations-dialogs-part-1-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: Popovers (Part 2/3)",
  "desc": "Using our 3, 2, 1 state system, we can make popovers animate on ",
  "link": "/blog.master.dev/in-n-out-animations-popovers-part-2-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: View Transitions (Part 3/3)",
  "desc": "View Transitions are of unique help in applying an animation to an element even when you are literally removing it from the DOM. ",
  "link": "/blog.master.dev/in-n-out-animations-view-transitions-part-3-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

Demo so you an see what we’re doing:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019cfbce-0b8b-7fde-a8ee-14ca580475ff"
  title="Opening & Closing #2: Popovers"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Reminder: The 3-2-1 System

The important thing to remember about styling both the **in** and **out** of an element was styling all three states and in order such that the “on the way in” styles have enough specificity to win over the open styles.

It’s essentially like this

```css
.element {
  transition: ...;

  /* 3 */
  &:not(.open) {

  }

  /* 2 */
  &.open {
  
  }
  
  /* 1 */
  @starting-style {
    &.open {

    }
  }
}
```

---

## 3-2-1 with Popovers

Popovers have their own special pseudo-class for determining if they are open or not, so we can apply it like like below. This time, we’ll transition the `opacity` and `rotate` property. Anything is on the table! That’s just what we’re choosing this time.

```css
[popover] {
  --timing: .66s;
  
  transition:
    var(--timing) opacity,
    var(--timing) rotate,
    var(--timing) display allow-discrete,
    var(--timing) overlay allow-discrete;

  /* 3 */
  &:not(:popover-open) {
    opacity: 0;
    rotate: 10deg;
    transform-origin: top left;
  }

  /* 2 */
  &:popover-open {
    --timing: 0.2s;
    opacity: 1;
    rotate: 3deg;
  }

  /* 1 */
  @starting-style {
    &:popover-open {
      opacity: 0;
      rotate: -3deg;
    }
  }
}
```

---

## Handling Reduced Motion

We’re *introducing* movement on the page here. We should take care to *not* do that if the user doesn’t want it. But the opacity change is fine. So we’d do it like this.

```css
@media (prefers-reduced-motion: reduce) {
  [popover] {  
    transition:
      var(--timing) opacity,
      /* rotate is removed! */
      var(--timing) display allow-discrete,
      var(--timing) overlay allow-discrete;

    &, &:popover-open {
      rotate: 0deg;
    }
  }
}
```

Note that we’ve made the popover have *no* rotation. That’s not a requirement, you could leave it tilted if you want.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019cfbce-0b8b-7fde-a8ee-14ca580475ff"
  title="Opening & Closing #2: Popovers"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Noting a Safari Quirk

Positioning anchors for popovers are “implied” in most browsers. And that’s true of Safari as well. You can see when we open the popover, it’s positioned where the button that opened it is. But “on the way out” it loses that anchor for some reason. Bug? Unsure. So in the demo we’re just being specific about the anchor and that fixes it.

Also, in [**Part 1**](/blog.master.dev/in-n-out-animations-dialogs-part-1-3.md), the “on the way out” styles for the `<dialog>` have an issue with the `inset` property, so we set it explicitly to `inset: 0;` and that fixes Safari.

::: info Article Series

```component VPCard
{
  "title": "In-N-Out Animations: Dialogs (Part 1/3)",
  "desc": "You can style the ",
  "link": "/blog.master.dev/in-n-out-animations-dialogs-part-1-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: Popovers (Part 2/3)",
  "desc": "Using our 3, 2, 1 state system, we can make popovers animate on ",
  "link": "/blog.master.dev/in-n-out-animations-popovers-part-2-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: View Transitions (Part 3/3)",
  "desc": "View Transitions are of unique help in applying an animation to an element even when you are literally removing it from the DOM. ",
  "link": "/blog.master.dev/in-n-out-animations-view-transitions-part-3-3.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "In-N-Out Animations: Popovers (Part 2/3)",
  "desc": "Using our 3, 2, 1 state system, we can make popovers animate on ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/in-n-out-animations-popovers-part-2-3.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
