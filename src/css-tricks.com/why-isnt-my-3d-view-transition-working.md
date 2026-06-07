---
lang: en-US
title: "Why Isn't My 3D View Transition Working?"
description: "Article(s) > Why Isn't My 3D View Transition Working?"
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
      content: "Article(s) > Why Isn't My 3D View Transition Working?"
    - property: og:description
      content: "Why Isn't My 3D View Transition Working?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/why-isnt-my-3d-view-transition-working.html
prev: /programming/css/articles/README.md
date: 2026-06-12
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url: https://css-tricks.com/author/sunkanmifafowora/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/cover.webp
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
  name="Why Isn't My 3D View Transition Working?"
  desc="Why isn't my 3D view transition working?! Sunkanmi tackles this frustration and offers an elegant fix for it."
  url="https://css-tricks.com/why-isnt-my-3d-view-transition-working"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/cover.webp"/>

If you have played around with view transition a bunch, you may have noticed that 3D transitions between two pages (i.e., cross-document view transitions) don’t seem to work. That is, at least not without the browsers flattening things first.

Image elements are the best example to demonstrate this because, like the snapshots a browser takes of the before-after states in a view transition, images are [<VPIcon icon="fa-brands fa-firefox"/>replaced elements](https://developer.mozilla.org/en-US/docs/Glossary/Replaced_elements) so, in theory, we should be able to use them as a sort of reduced test case for 3D animations. For example, flipping one image to reveal another on click looks like this:

<CodePen
  link="https://codepen.io/editor/sunkanmii-the-styleful/pen/019ce239-f88b-7c5c-8d0c-1dd74c0499d4"
  title="image 3D page-flip animation"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s important to note that, for the animation to work properly, we need to set the [**`perspective`**](/css-tricks.com/almanac-properties/perspective.md) property on the image’s parent container (in our case, it’s the `.scene` element). Otherwise, the 3D transformation is merely flat. It sort of *angles* the element’s appearance:

<CodePen
  user="anon"
  slug-hash="bNBYqxM"
  title="view transition problem: with/without perspective example"
  :default-tab="['css','result']"
  :theme="dark"/>

In CSS, the parent’s `persepective` is [**applied to all its children**](/css-tricks.com/almanac-properties/perspective.md#:~:text=it%20simply%20enables%20a%203D%2Dspace%20for%20children%20elements), excluding itself:

```css
.scene {
  perspective: 1200px;

  .card { /* gets perspective */ }
}
```

What’s important here is the HTML structure. Specifically how the `.scene` container sits on top of the child `.card` elements, making the 3D effect come to life so the flip looks how it should:

```html
<div class="scene">
  <div class="card">
    <!-- Card Content Here -->
  </div>
</div>
```

Perhaps our keyframe animation to flip the `.cards` is something like this:

```css
@keyframes flipOut {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-90deg);
  }
}
```

Which we apply to the `.cards` like this:

```css
.card.flip-out {
  animation: flipOut 5.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.card.flip-in {
  animation: flipOut 5.2s cubic-bezier(0.4, 0, 0.2, 1) forwards reverse;
}
```

…where the animates runs `forwards` when the `.flip-out` class is appended to the `.card` (courtesy of JavaScript watching for a click) and runs in `reverse` when the `.flip-in` class is appended.

That’s the setup for how a cross-document view transition ought to work, too, right? If an image supports a 3D animation, then a view transitions snapshot should do the same. Let’s poke at that.

---

## Setting up the view transition

First things first, we have to opt into view transitions on both pages with the [**`@view-transition`**](/css-tricks.com/almanac-rules/view-transition.md) at-rule by setting the `navigation` descriptor to `auto`:

```css
@view-transition {
  navigation: auto;
}
```

If we were to do nothing else, then one page fades into another when navigating between the two. It’s [**the most basic**](/css-tricks.com/snippets-css/basic-view-transition.md) of all cross-document view transitions.

How do we customize things? We use the `::view-transition-old()` and `::view-transition-new()` pseudo-classes, where the former is the “old” snapshot and the latter is the “new” one. Like the `.card` elements we used in the last example, that’s where we set the keyframe animation:

```css
::view-transition-old(root) {
  /* animation goes here */
}

::view-transition-new(root) {
  /* animation goes here */
}
```

::: note

The `root` parameter tells the view transition to target the whole page and all the elements created (and not created) by the view transition’s default snapshot group.

:::

---

## Here’s the problem

Let’s say we want to apply that same 3D flip to the entire webpage, where the snapshot of the “old” page flips into the “new” page. Again, a 3D animation asks us for two things:

1. The `perspective` property on the parent element so its children get that 3D effect
2. An animation on the page for when the view transition happens

But: What exactly do we set the perspective on, as in, what is the parent element here?

Since [<VPIcon icon="iconfont icon-w3c"/>view transitions take snapshots of the entire webpage](https://w3.org/TR/css-view-transitions-1/#view-transition-pseudos), we might assume (logically) it would be the `<html>` element (or the `:root`), right? I mean, the DOM tree looks like this when a view transition is present:

```plaintext
html
  ├─ ::view-transition
  │  ├─ ::view-transition-group(card)
  │  │  └─ ::view-transition-image-pair(card)
  │  │     ├─ ::view-transition-old(card)
  │  │     └─ ::view-transition-new(card)
  │  └─ ::view-transition-group(name)
  │     └─ ::view-transition-image-pair(name)
  │        ├─ ::view-transition-old(name)
  │        └─ ::view-transition-new(name)
  ├─ head
  └─ body
        └─ …
```

So, the entire snapshot should be where we put the `perspective`. Right? Turns out, no.

In fact, does nothing at all! You’re left with this instead of the beautiful 3D flip we were able to use on the cards earlier:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/06/video_1.mp4" />

> [GitHub Source (<VPIcon icon="iconfont icon-github"/>`sunkanmii/perspective-demo-on-root-and-body`)](https://github.com/sunkanmii/perspective-demo-on-root-and-body) and [<VPIcon icon="fas fa-globe"/>Live Demo](https://sunkanmii.github.io/perspective-demo-on-root-and-body/)

Here’s the code I was working with:

```css :collapsed-lines
/* Cross-document View Transition opt-in */
@view-transition {
  navigation: auto;
}

/* 3D flip: Old page flips away, new page flips in */
@keyframes flip-out {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateY(-90deg);
    opacity: 0;
  }
}

@keyframes flip-in {
  0% {
    transform: rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(0deg);
    opacity: 1;
  }
}

::view-transition-old(root) {
  animation: flip-out 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
  transform-origin: center center;
}

::view-transition-new(root) {
  animation: flip-in 0.3s cubic-bezier(0, 0, 0.6, 1) 0.3s backwards;
  transform-origin: center center;
}
```

::: note

I didn’t reverse the animation here since we flip to `-90deg` and then from `90deg`. Not exactly the same!

:::

And it doesn’t work, no matter if `perspective` is on `html` or `:root`:

```css
/* 👎 */
html {
  perspective: 1100px;
}

/* 👎 */
:root {
  perspective: 1100px;
}
```

I did some digging and discovered that `perspective` (and 3D transformations in general) is one of several [<VPIcon icon="fa-brands fa-chrome"/>CSS properties that would produce an unusual effect](https://developer.chrome.com/docs/css-ui/view-transitions/nested-view-transition-groups#:~:text=This%20flat%20tree%20approach%20is%20sufficient%20for%20many%20use%2Dcases%2C%20but%20there%20are%20some%20styling%20use%2Dcases%20that%20cannot%20be%20achieved%20with%20it). (Leave it to Bramus to have the answer!)

So… What do we do? Some ideas came to mind, but sadly failed:

- I tried setting the `perspective` property on the `body`.
- I tried setting `perspective` inside `::view-transition-group(root)`.
- I tried setting `perspective` inside the [**`::view-transition`**](/css-tricks.com/almanac-pseudo-selectors/view-transition.md) pseudo.

There’s actually a super simple workaround to this, and I can’t believe it took me this long to figure it out — don’t use `perspective` at all!

---

## The solution

Short story: we have to use the [**`perspective()`**](/css-tricks.com/almanac-functions/perspective.md) function instead of the `perspective` property. And not inside any of the `::view-transition-*` pseudos as you might expect, but inside the `@keyframes` animation:

```css{3,7,13,17} :collapsed-lines
@keyframes flip-out {
  0% {
    transform: perspective(1100px) rotateY(0deg);
    opacity: 1;
  }
  100% {
    transform: perspective(1100px) rotateY(-90deg);
    opacity: 0;
  }
}
@keyframes flip-in {
  0% {
    transform: perspective(1100px) rotateY(90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(1100px) rotateY(0deg);
    opacity: 1;
  }
} 
```

This simple, but big change moves the scene from a flat *meh* to a beautiful *ah yeah*:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/06/video_2.mp4" />

> [GitHub Source (<VPIcon icon="iconfont icon-github"/>`sunkanmii/persepective-inside-animation`)](https://github.com/sunkanmii/persepective-inside-animation) and [<VPIcon icon="fas fa-globe"/>Live Demo](https://sunkanmii.github.io/persepective-inside-animation/)

Here’s why, apparently. The view transition pseudo-element tree is rendered *outside* the normal HTML flow. More specifically, the entire view transition tree is [<VPIcon icon="iconfont icon-w3c"/>rendered above the DOM in its own layer](https://w3.org/TR/css-view-transitions-1/#view-transition-rendering). However, particularly for `::view-transition`, I’m not too sure why this is the case, but my best guess would be that each [<VPIcon icon="iconfont icon-w3c"/>view transition group automatically has its position and transform values overridden by the browser](https://w3.org/TR/css-view-transitions-1/#ua-styles); hence, interfering with the `perspective`.

The difference between `perspective` and `perspective()`? The `perspective` property is applied to the parent element, while `perspective()` is a `transform` property function applied directly to the element itself. And since the view transition pseudo tree does not have a true parent, we’ve gotta use `perspective()` since it doesn’t require a parent. *Phew.*

---

## To recap…

Setting `perspective` on the `html`, `:root`, or any of the view transition pseudo-class won’t work. And if you have been struggling to find the solution, like I was, I think this little, but big `perspective()` change will solve that issue if you ever come across it. Take it from me, I battled with this for weeks till I came back today to rant about it and discovered a solution to it. A perk of writing!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Isn't My 3D View Transition Working?",
  "desc": "Why isn't my 3D view transition working?! Sunkanmi tackles this frustration and offers an elegant fix for it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/why-isnt-my-3d-view-transition-working.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
