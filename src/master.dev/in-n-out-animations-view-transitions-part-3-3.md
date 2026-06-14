---
lang: en-US
title: "In-N-Out Animations: View Transitions (Part 3/3)"
description: "Article(s) > In-N-Out Animations: View Transitions (Part 3/3)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > In-N-Out Animations: View Transitions (Part 3/3)"
    - property: og:description
      content: "In-N-Out Animations: View Transitions (Part 3/3)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/in-n-out-animations-view-transitions-part-3-3.html
prev: /programming/css/articles/README.md
date: 2026-06-19
isOriginal: false
author:
  - name: Chris Coyier
    url: https://master.dev/blog/author/chriscoyier/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10088
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

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="In-N-Out Animations: View Transitions (Part 3/3)"
  desc="View Transitions are of unique help in applying an animation to an element even when you are literally removing it from the DOM. "
  url="https://master.dev/blog/in-n-out-animations-view-transitions-part-3-3/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10088"/>

The point of this series is animating elements in and out of view, particularly on Hard Mode™️. That is, when those elements transition from `display: none;` to `display: block;` (or another display time, or visibility changes, etc) that was traditionally territory where animating was *hard.*

Just as hard is animating an element when the element is entering the DOM for the very first time, and even harder, when it’s *leaving* the DOM. But now we’ve got View Transitions in our toolbox and it’s going to help us do just this.

::: info Article Series

```component VPCard
{
  "title": "In-N-Out Animations: Dialogs (Part 1/3)",
  "desc": "You can style the ",
  "link": "/master.dev/in-n-out-animations-dialogs-part-1-3.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: Popovers (Part 2/3)",
  "desc": "Using our 3, 2, 1 state system, we can make popovers animate on ",
  "link": "/master.dev/in-n-out-animations-popovers-part-2-3.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: View Transitions (Part 3/3)",
  "desc": "View Transitions are of unique help in applying an animation to an element even when you are literally removing it from the DOM. ",
  "link": "/master.dev/in-n-out-animations-view-transitions-part-3-3.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## View Transitions

We’re going to look at “same page” view transitions which is most relevant here. But there are also “multi page” view transitions which are arguably more broadly amazing.

The core API we’re dealing with for same-page view transitions is like this:

```js
addButton.addEventListener("click", () => {
  document.startViewTransition(() => {
    addItemToDOM();
  });
});

removeButton.addEventListener("click", () => {
  document.startViewTransition(() => {
    removeItemToDOM();
  });
});
```

But we probably wanna add a little resiliency there for browsers who may not support them, and give ourselves a little cleanup function if we need it too:

```js
addButton.addEventListener("click", () => {
  if (!document.startViewTransition) {
    addItemToDOM();
    cleanupIncomingItems();
    return;
  }

  const transition = document.startViewTransition(() => {
    addItemToDOM();
  });
  transition.finished.then(cleanupIncomingItems);
});
```

Notice that not all these functions are defined yet. Here’s a pretty bare-bones example:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ed79c-71fa-718c-8f42-d24872c3dfc2"
  title="Basic “Add” View Transition"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

These are just empty `<div>`s here, but the point is: **they could be anything**.

:::

See that “fade in/out” effect? We wrote zero code to get that. That’s just the natural automatic thing that happens with a View Transition. Even, like in our case, when these elements are literally entering *and leaving* the DOM entirely. Little 🤯y to me.

So with just this, we already have “in” and “out” animations, the namesake of this blog article series. But let’s *control* them as well.

---

## The “In”

If we want to specifically animate the incoming items (the point of this series, ha), then we’ve got *options!*

One way is to add `@keyframes` animation specifically to any “new” elements, that is, `::view-transition-new(*)`.

```css{1}
::view-transition-new(*) {
  animation-duration: 320ms;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-name: incoming-slide-fade;
}

@keyframes incoming-slide-fade {
  from {
    opacity: 0;
    transform: translateY(64px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ee02c-9e83-732d-8a79-3fe181f4ff45"
  title="Basic “Add” View Transition (add Incoming #1)"
  :default-tab="['css','result']"
  :theme="dark"/>

See how that `@keyframe` alone defines the “on the way in” styles and the “open” styles, as it were.

But we could be a bit more specific with the `view-transition-name` naming, which allows us just to be a bit more targeted and then ultimately apply an “out” translation later. If we use a class name to apply the `view-transition-name`, it just makes it a little easier to query and remove the class after the animation is over.

```css{2,5}
.incoming {
  view-transition-name: incoming;
}

::view-transition-new(incoming) {
  animation-duration: 320ms;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-name: incoming-slide-fade;
}
```

<CodePen
  user="https://codepen.io/editor/chriscoyier/pen/019ee029-dfe3-71bc-94f5-eee9561fa3b5"
  title="Basic “Add” View Transition (add Incoming #2)"
  :default-tab="['css','result']"
  :theme="dark"/>

See how I’m using the `transition.finished` event to fire a callback function and remove the class (and thus `view-transition-name`).

---

## The “Out”

The trick with “on the way out” styles is to apply a `view-transition-name` to the outgoing item *before* we call `startViewTransition`.

In our basic setup, we just snag the one of the `<div>`s and call `.remove()` on it. But because we specifically apply `view-transition-name: outgoing;` to it, we can latch onto that in CSS with `::view-transition-old(outgoing)` and have a unique “on the way out” `@keyframes` to apply to it.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ee047-2494-7386-b3f3-1b3f9851743b"
  title="Basic “Add” View Transition (Incoming/Outgoing)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Note that if every *other* element either has a unique `view-transition-name` or `view-transition-name: match-element`, than we get a cool scooting effect where the element move into their new position automatically.

:::

This is all very magical to me. These elements are literally *leaving the DOM* which has long been an impossible-to-animate situation, and we now have a very straightforward way to do it. Huge.

---

## Final Demo

Here’s a slightly more fleshed out example of a “list”. This has long been one of my favorite demonstrations of animation on the web, full stop, because of it’s connection to UX. A user adding to this list is able to clearly and obviously understand what was added *because of the motion.* Likewise, it’s obvious to confirm the removal of an item *because of the motion.*

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019d175c-474f-7b41-a28f-77396e88ef21"
  title="Opening & Closing #3: View Transitions"
  :default-tab="['css','result']"
  :theme="dark"/>

That does it for this series! I hope it can be a useful reference.

::: info Article Series

```component VPCard
{
  "title": "In-N-Out Animations: Dialogs (Part 1/3)",
  "desc": "You can style the ",
  "link": "/master.dev/in-n-out-animations-dialogs-part-1-3.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: Popovers (Part 2/3)",
  "desc": "Using our 3, 2, 1 state system, we can make popovers animate on ",
  "link": "/master.dev/in-n-out-animations-popovers-part-2-3.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "In-N-Out Animations: View Transitions (Part 3/3)",
  "desc": "View Transitions are of unique help in applying an animation to an element even when you are literally removing it from the DOM. ",
  "link": "/master.dev/in-n-out-animations-view-transitions-part-3-3.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "In-N-Out Animations: View Transitions (Part 3/3)",
  "desc": "View Transitions are of unique help in applying an animation to an element even when you are literally removing it from the DOM. ",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/in-n-out-animations-view-transitions-part-3-3.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
