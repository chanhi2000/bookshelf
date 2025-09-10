---
lang: en-US
title: "View Transition List Reordering (with a Kick Flip)"
description: "Article(s) > View Transition List Reordering (with a Kick Flip)"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > View Transition List Reordering (with a Kick Flip)"
    - property: og:description
      content: "View Transition List Reordering (with a Kick Flip)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/view-transition-list-reordering-with-a-kick-flip.html
prev: /programming/css/articles/README.md
date: 2025-07-08
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6471
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
  name="View Transition List Reordering (with a Kick Flip)"
  desc="It's pretty straightforward to animate list items into new positions, but there is a few tricks when the specific one you've chosen to move needs a *different* transition."
  url="https://frontendmasters.com/blog/view-transition-list-reordering-with-a-kick-flip/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6471"/>

I remember when we first got animations and transitions in CSS on the web (ok grandpa), the talk around it was balanced between *oooo! fun! shiny!* and *actually, movement is more than aesthetics; it can help people understand what is happening in user interfaces.*

The example that got stuck in my head was reordering lists. Imagine a single list item being plucked off and moved to the top. If that *instantly* happens, it can be hard to catch what even happened. But if you animate the movement, it can be extremely obvious what is happening.

**Works, but it is not particularly easy to understand what is happening**:

<VidStack src="https://videopress.com/265e9f90-c797-45aa-b1ce-109b4e8a6f7e" />

**More fun _and_ easier to understand what is happening**:

<VidStack src="https://videopress.com/dae6135c-caca-4fc9-8b05-7719e282772b  " />

---

## The List

We’re talking a regular ol list. Perhaps ironic that we’re*ordering*and*unordered*lists, but I’ll leave that as a semantic thoughtworm for the reader.

Each list item has text, then a button which the intended action is that, when clicked, will move the list item to the top.

```html
<ul class="list">
  <li>
    Apples
    <button hidden disabled aria-label="Move to Top">
      <svg ...></svg>
    </button>
  </li>
  <li>
    Oranges
    <button hidden disabled aria-label="Move to Top">
      <svg ...></svg>
    </button>
  </li>
  <li>
    <button hidden disabled aria-label="Move to Top">
      <svg ...></svg>
    </button>
    Mangos
  </li>
  <li>
    <button hidden disabled aria-label="Move to Top">
      <svg ...></svg>
    </button>
    Bananas
  </li>
</ul>
```

Note that each button has a text label (as we’re not using text inside the button), and a `hidden` attribute we’ll use to make sure the button isn’t there at all when JavaScript is disabled.

---

## Scaffolding the Interactive JavaScript

This will get us references to the elements we need, as well as do a loop and un-hide the buttons as well as attach an event listener to them:

```js
const button = document.querySelector("button");
const list = document.querySelector(".list");
let listItems = list.querySelectorAll("li");
const listItemButtons = list.querySelectorAll("li > button");

listItemButtons.forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", async () => {
    // do stuff
  });
});
```

---

## Moving the List Item to the Top

When the button is clicked, we’ll need the list item, not the button itself, so we reach up a level to the parent. Then we freshly figure out what the *first* list item is, and `insertBefore` it, making the clicked one the first one.

```js
const button = document.querySelector("button");
const list = document.querySelector(".list");
let listItems = list.querySelectorAll("li");
const listItemButtons = list.querySelectorAll("li > button");

listItemButtons.forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", async () => {
    const item = button.parentElement;
    const firstListItem = list.querySelector(".list :first-child");
    list.insertBefore(item, firstListItem);

    // This is probably the better API to use, but less supported...
    // list.moveBefore(item, firstListItem);
  });
});
```

I only recently [<VPIcon icon="fa-brands fa-chrome"/>learned about `moveBefore`](https://developer.chrome.com/blog/movebefore-api) which is probably a better API to use, but we can wait a bit for better support.

---

## (Progressively Enhanced) Movement via View Transitions

One type of View Transitions are “same page” View Transitions, where we essentially call `document.startViewTransition` and **change the DOM inside the callback**.

```js{6-9,15-21}
const button = document.querySelector("button");
const list = document.querySelector(".list");
let listItems = list.querySelectorAll("li");
const listItemButtons = list.querySelectorAll("li > button");

function moveListItemFirst(item) {
  const firstListItem = list.querySelector(".list :first-child");
  list.insertBefore(item, firstListItem);
}

listItemButtons.forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", async () => {
    const item = button.parentElement;
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        moveListItemFirst(item);
      });
    } else {
      moveListItemFirst(item);
    }
  });
});
```

Because we need to move the list item whether the browser supports View Transitions or not, we abstract that to a function, and call it on either branch of logic testing that support.

This will immediately do a fade transition for the list items, which honestly isn’t much of an improvement in this case (it still can be nice for the other type of View Transitions: page transitions). Fortunately, we’ve got a pretty decent one-line fix in CSS:

```scss
ul {
  li {
    view-transition-name: match-element;
  }
}
```

If you’ve played with View Transitions before, it’s likely you’ve got in your head that every single element needs a *unique* `view-transition-name`. And that’s still true in Firefox for now, as only Chrome and Safari are supporting `match-element` as I write. But as we’re just playing here, this is such a nice improvement and reduces so much fiddliness, I think it’s worth it.

---

## Special View Transitions Only For the “Main Moving Element”

The deal here is really that *all* the elements are moving. It’s either the element you clicked on moving to the first position, or the rest of the list items moving out of the way.

So the goal here is to apply a unique `view-transition-name` to the element that is the “main moving element”, then remove it once it’s done. To make matters a bit more difficult, we’ve got *two* animations we want to apply, one of the list item, and one *just* for the icon within the button. That’s slightly tricky!

```js{16-17,24-30} :collapsed-lines
const button = document.querySelector("button");
const list = document.querySelector(".list");
let listItems = list.querySelectorAll("li");
const listItemButtons = list.querySelectorAll("li > button");

function moveListItemFirst(item) {
  const firstListItem = list.querySelector(".list :first-child");
  list.insertBefore(item, firstListItem);
}

listItemButtons.forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", async () => {
    const item = button.parentElement;

    item.style.viewTransitionName = "woosh";
    item.querySelector("svg").style.viewTransitionName = "tony-hawk";

    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        moveListItemFirst(item);
      });

      try {
        await transition.finished;
      } finally {
        item.style.viewTransitionName = "";
        item.querySelector("svg").style.viewTransitionName = "";
        makeFirstListItemsButtonDisabled();
      }
    } else {
      moveListItemFirst(item);
    }
  });
});
```

Now we’ve got “woosh” and “tony-hawk” view transition names we can use to apply animation control in CSS.

```css :collapsed-lines
::view-transition-group(*) {
  animation-duration: 1s;
}

::view-transition-old(woosh),
::view-transition-new(woosh) {
  animation: woosh 1s ease-in-out;
}

@keyframes woosh {
  50% {
    translate: -100px 0;
    scale: 1.5;
    box-shadow: 0 30px 15px lch(0% 0 0 / 50%);
  }
}

::view-transition-old(tony-hawk),
::view-transition-new(tony-hawk) {
  animation: tony-hawk 1s ease-in-out;
}

@keyframes tony-hawk {
  /* sick kick flip */
  50% {
    rotate: 20deg;
    scale: 2.5;
  }
}
```

So for the “non-main” elements, they just move up and down over 1s. But for the “main” moving element, we’ve got these unique `@keyframe` animations we apply while the re-ordering is happening. Note that the keyframes are only applying the `50%` keyframe, so they animate from wherever they were to wherever they are going still, just in the middle they do something special, like the sick kick flip.

<CodePen
  user="chriscoyier"
  slug-hash="vEOaJXy"
  title="List Movement with View Transition Kickflip"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Video

I’m playing with streaming and this idea started as a loose idea for a stream, then I lightly edited it for a regular YouTube video, so maybe you’d enjoy that:

<VidStack src="youtube/8vFRqReS-TE" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "View Transition List Reordering (with a Kick Flip)",
  "desc": "It's pretty straightforward to animate list items into new positions, but there is a few tricks when the specific one you've chosen to move needs a *different* transition.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/view-transition-list-reordering-with-a-kick-flip.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
