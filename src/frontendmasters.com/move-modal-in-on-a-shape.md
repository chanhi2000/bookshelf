---
lang: en-US
title: "Move Modal in on a… shape()"
description: "Article(s) > Move Modal in on a… shape()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Move Modal in on a… shape()"
    - property: og:description
      content: "Move Modal in on a… shape()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/move-modal-in-on-a-shape.html
prev: /programming/css/articles/README.md
date: 2025-05-22
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5917
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
  name="Move Modal in on a… shape()"
  desc="Years ago I did a demo where a modal was triggered open and it came flying in on a curved path. I always thought that was kinda cool. Time has chugged on, and I thought I’d revisit that with a variety of improved web platform technology."
  url="https://frontendmasters.com/blog/move-modal-in-on-a-shape/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5917"/>

[<VPIcon icon="fas fa-globe"/>Years ago](https://css-tricks.com/move-modal-path/) I did [a demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/NgNymx) where a modal was triggered open and it came flying in on a curved path. I always thought that was kinda cool. Time has chugged on, and I thought I’d revisit that with a variety of improved web platform technology.

1. Instead of a `<div>` it’ll be a proper `<dialog>`.
2. We’ll set it up to work with no JavaScript at all. But we’ll fall back to using the JavaScript methods `.showModal()` and `.close()` to support browsers that don’t support the [**invoker**](/oddbird.net/winging-it-18.md) command stuff.
3. We’ll use `@starting-style`, which is arguably more verbose, but allows for opening and closing animations while allowing the `<dialog>` to be `display: none;` when closed which is better than it was before where the dialog was always in the accessibility tree.
4. Instead of `path()` for the `offset-path`, which forced us into pixels, we’ll use `shape()` which allows us to use the viewport better. But we’ll still fall back to `path()`.
5. We’ll continue accounting for `prefers-reduced-motion` however we need to.

Here’s where the refactor ends up:

<CodePen
  user="chriscoyier"
  slug-hash="GggQrQq"
  title="Move Modal In on Path (Next Gen!)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 1. Use a Dialog

The `<dialog>` element is the correct semantic choice for this kind of UI, generally. But particularly if you are wanting to force the user to interact with the dialog before doing anything else (i.e. a “modal”) then `<dialog>` is particularly good as it moves then traps focus within the dialog.

---

## 2. Progressively Enhanced Dialog Open and Close

[**I only just learned**](/frontendmasters.com/lessons-learned-from-recreating-a-styled-dialog.md#no-invokers-yes-invokers) you can open a modal (in the proper “modal” state) without any JavaScript using invokers.

So you can do an “open” button like this, where `command` is the literal command you have to call to open the modal and the `commandfor` matches the `id` of the dialog.

```html
<button
  command="show-modal"
  commandfor="my-dialog"
>
  Open Modal
</button>
```

You may want to include `popovertarget="my-dialog"` as well, which is a still-no-JS fallback that will open the modal in a non-modal state (no focus trap) in browsers that don’t support invokers yet. Buttttttttt, we’re going to need a JavaScript fallback anyway, so let’s skip it.

Here’s how a close button can be:

```html
<button
  command="close"
  commandfor="my-dialog"
>
  Close
</button>
```

For browsers that don’t support that, we’ll use the `<dialog>` element’s JavaScript API to do the job instead (use whatever selectors you need):

```js
// For browsers that don't support the command/invokes/popup anything yet.
if (document.createElement("button").commandForElement === undefined) {
  const dialog = document.querySelector("#my-dialog");
  const openButton = document.querySelector("#open-button");
  const closeButton = document.querySelector("#close-button");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });
}
```

At this point, we’ve got a proper dialog that opens and closes.

---

## 3. Open & Close Animation while still using `display: none;`

One thing about `<dialog>` is that when it’s not open, it’s `display: none;` automatically, without you having to add any additional styles to do that. Then when you open it (via invoker, method, or adding an `open` attribute), it becomes `display: block;` automatically.

For the past forever in CSS, it hasn’t been possible to run animations on elements between `display: none` and other display values. The element instantly disappears, so when would that animation happen anyway? Well now you can. If you `transition` the `display` property and use the `allow-discrete` keyword, it will ensure that property “flips” when appropriate. That is, it will immediately appear when transitioning *away* from being hidden and delay flipping until the end of the transition when transitioning into being hidden.

```css
dialog {
  transition: display 1.1s allow-discrete;
}
```

But we’ll be adding to that transition, which is fine! For instance, to animate opacity **on the way both in and out**, we can do it like this:

```css
dialog {
  transition:
    display 1.1s allow-discrete,
    opacity 1.1s ease-out;
  opacity: 0;

  &[open] {
    opacity: 1;
    @starting-style {
      opacity: 0;
    }
  }
}
```

I find that kinda [<VPIcon icon="fas fa-globe"/>awkward and repetitive](https://zellwk.com/blog/making-sense-of-starting-style/#:~:text=Since%20DRY%20(Don’t%20Repeat%20Yourself)%20is%20one%20of%20the%20major%20programming%20principles%2C%20it%20can%20feel%20like%20we’re%20going%20against%20everything%20we%20know%20to%20be%20right%20and%20good), but that’s what it takes and the effect is worth it.

---

## [](#4-using-shape-for-the-movement)4. Using `shape()` for the movement

The cool curved movement in the original movement was thanks to animating along an `offset-path`. But I used `offset-path: path()` which was the only practical thing available at the time. Now, `path()` is all but replaced by [**the way-better-for-CSS `shape()` function**](/frontendmasters.com/shape-a-new-powerful-drawing-syntax-in-css.md). There is no way with `path()` to express something like “animate from the top left corner of the window to the middle”, because `path()` deals in pixels which just can’t know how to do that on an arbitrary screen.

I’ll leave the `path()` stuff in the to accommodate browsers not supporting `shape()` yet, so it’ll end up like:

```css
dialog {
  ...

  @supports (offset-rotate: 0deg) {
    offset-rotate: 0deg;
    offset-path: path("M 250,100 S -300,500 -700,-200");
  }
  @supports (
    offset-path: shape(from top left, curve to 50% 50% with 25% 100%)
  ) {
    offset-path: shape(from top left, curve to 50% 50% with 25% 100%);
    offset-distance: 0;
  }
}
```

That `shape()` syntax expresses this movement:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/shape-movement.png?resize=1024%2C773&ssl=1)

Those points flex to whatever is going on in the viewport, unlike the pixel values in `path()`. Fun!

This stuff is so new from a browser support perspective, I’m finding that Chrome 126, which is the stable version as I write, does support `clip-path: shape()`, but doesn’t support `offset-path: shape()`. Chrome Canary is at 128, and does support `offset-path: shape()`. But the demo is coded such that it falls back to the original `path()` by using `@supports` tests.

Here’s a video of it working responsively:

<VidStack src="https://videopress.com/embed/uujYoeLh?cover=1&autoPlay=0&controls=1&loop=0&muted=0&persistVolume=1&playsinline=0&preloadContent=metadata&useAverageColor=1&hd=0" />
<!-- TODO: videopress -->

---

## 5. Preferring Less Motion

I think this is kind of a good example of honoring the intention.

```css
@media (prefers-reduced-motion) {
  offset-path: none;
  transition: display 0.25s allow-discrete, opacity 0.25s ease-out;
}
```

With that, there is far less movement. But you still see the modal fade in (a bit quicker) which still might be a helpful animation emphasizing “this is leaving” or “this is entering”.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Move Modal in on a… shape()",
  "desc": "Got an old ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/move-modal-in-on-a-shape.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
