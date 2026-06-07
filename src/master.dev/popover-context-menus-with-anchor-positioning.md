---
lang: en-US
title: "Popover Context Menus with Anchor Positioning"
description: "Article(s) > Popover Context Menus with Anchor Positioning"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Popover Context Menus with Anchor Positioning"
    - property: og:description
      content: "Popover Context Menus with Anchor Positioning"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/popover-context-menus-with-anchor-positioning.html
prev: /programming/css/articles/README.md
date: 2026-01-08
isOriginal: false
author:
  - name: Chris Coyier
    url: https://master.dev/blog/author/chriscoyier/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/8194
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
  name="Popover Context Menus with Anchor Positioning"
  desc="A context menu is like a tooltip in that it opens right next to the the thing that opened it. Here, we animate the opening and ensure it opens somewhere where it doesn't get cut off."
  url="https://master.dev/blog/popover-context-menus-with-anchor-positioning/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/8194"/>

Tooltips are the classic use case for anchor positioning in CSS. You click a thing, and *right next to it* another thing opens up. That *other thing* could also be a menu. I mean — what’s a context menu aside from a tooltip with links, right?

I’ll illustrate this with some appropriately common and vague components, like a “Kebab” menu button within a “Card” component:

<VidStack src="https://videopress.com/73c4c42a-e27d-4e9e-8ada-3495ddad1b35" />

This video comes from [the complete demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019ad6ff-0e99-739c-9ddf-f1d3c311f288) for this post.


The positioning of that menu happens via the magic of anchor positioning. Lemme show you all the HTML first, as that is interesting in it’s own right.

---

## The HTML for the Menu Button & Menu

We’ll use a `<button>` to toggle the menu (duh!) and put the attributes on it to set up an [**invoker**](/master.dev/menus-toasts-and-more.md). Invokers are super cool, allowing us to open/close the menu without any JavaScript at all. Just these declarative instructions will do. The `interestfor` attribute is extra-new, allowing [**`popover="hint"`**](/master.dev/what-is-popoverhint.md) to work meaning we can even open the popover on hover/focus (which is kinda amazing that it can be done in HTML alone).

```html
<button
  class="menu-toggle"

  <!-- interest invoker! -->
  command="toggle-popover"
  <!-- connect to id of the popover menu -->
  commandfor="card-menu"
  <!-- for "hint" type (open menu on hover) -->
  interestfor="card-menu"

  style="anchor-name: --card;"
>
  <span class="screenreader-only">Open Menu</span>
  <span class="aria-hidden">•••</span>
</button>

<!-- 
  These two things ⬆️⬇️ could be anywhere 
  in DOM, thanks to anchor positioning,
  but it's still probably smart to keep 
  them nearby for tabbing accessibility.
-->

<menu 
  popover="hint" 
  id="card-menu" 
  style="position-anchor: --card;"
>
  <li><button>This</button></li>
  <li><button>Little</button></li>
  <li><button>Piggy</button></li>
  <li><button>Went</button></li>
  <li><button>to Market</button></li>
</menu>
```

Did you know [<VPIcon icon="fa-brands fa-firefox" />the `<menu>` tag is just an `<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu)? I love that.

I put the `style` tag on both of those elements, naming an anchor and styling against that named anchor, because “in the real world” I think that will be extremely common. The rest of the CSS can happen in a CSS file, but those things will likely be in the HTML because a page is likely to have lots of context menus and they will all need –unique-names.

![The typical/ideal situation.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/01/Screenshot-2026-01-08-at-10.26.40-AM.png?resize=642%2C782&ssl=1)

---

## The CSS for the Menu

The CSS for the *button* isn’t terribly interesting aside from the named anchor we already gave it, so we’ll skip over that (just make sure it has nice hover/focus styles).

The CSS for the menu is much more interesting because…

- We get to use anchor positioning to put it right where we want, including fallbacks.
- We can animate the opening and closing.

The menu is going to be properly closed to start, with `display: none;`. Normally this means we can’t animate it, but with modern CSS these days, we can!

```css
menu {
  /* Already has this from the HTML */
  /* position-anchor: --card; */

  /* Put it in place */
  position-area: block-start span-inline-start;

  transition-property: translate, opacity, display, overlay;
  transition-duration: 0.45s;
  /* Important for swapping timing of when the display properly flips */
  transition-behavior: allow-discrete;

  /* OUTGOING style */
  opacity: 0;
  display: none;
  translate: 10px 0;

  &:popover-open {
    /* MENU OPEN style */
    opacity: 1;
    display: block;
    translate: 0 0;

    /* INCOMING style */
    @starting-style {
      opacity: 0;
      translate: 0 -20px;
    }
  }
```

That `position-area` is decently complex all in itself. You might think there are basically *eight* places to put it (four sides and four corners) but there is really *sixteen* as the direction it “spans” can be sort of reversed from the natural flow. Ours does!

![[<VPIcon icon="fa-brands fa-chrome"/>https://chrome.dev/anchor-tool/](https://chrome.dev/anchor-tool/)](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/01/Screenshot-2026-01-08-at-10.28.45-AM.png?resize=1024%2C698&ssl=1)

---

## The Positioning Fallbacks

This is actually why I originally made this demo and why I’m writing this article. I found the anchor positioning fallbacks to be very mind-bending. Now that I have the right solution in place, it seems more obvious, but it’s been a mental journey for me getting here 😵‍💫.

Why fallbacks? If we didn’t have them, we’d risk opening our menus in into areas where they are unusable. Like if the menu button was toward the top of the screen, our initial `position-area` has the menu opening upwards, and we’d be hosed:

![The top edge here is the top of the browser window, and the menu options are cut off. We can’t read them or click them.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/01/Screenshot-2026-01-08-at-10.24.35-AM-1.png?resize=902%2C772&ssl=1)

In this situation, what we *want* to happen is for the menu to open *downwards* instead. That’s pretty straightforward, we add:

```css
menu {
  ...

  position-try: flip-block;
}
```

This is basically saying: *if you need to and there is space, go ahead and flip the position in the block direction.* So from top to bottom for us. So if we had that situation where it’s cutting off on top, it’ll flip to the bottom if it can. That works great:

<VidStack src="https://videopress.com/6f368cdc-5828-485e-913b-cba09facfad9" />

But top and bottom aren’t the only places a menu like this could get cut off. The left and right edges of the browser window are just as plausible. So in my mind, we’d just do this:

```css
position-try: flip-inline flip-block;
```

My mind: OK you have everything you need now, if you need to flip in the block direction, you’ve been given permission, and if you need to flip in the inline direction, you’ve also been given permission:

Spoiler: This is now how it works.

What I’ve written above *actually* says: If you’re getting cut off with your initial positioning, try flipping in *both* the inline and block directions and if and only if that is better, do it.

That’s not really what I want.

What I want is: If the initial positioning is cut off, try flipping in the block direction, if that doesn’t work, try flipping in the inline direction, if that doesn’t work, then try flipping in both directions. What we need to that is this:

```css
position-try: flip-block, flip-inline, flip-block flip-inline;
```

---

## The Most Useful `position-try` Incantation

I’m going to say this again, because I’ve always thought this is just how it should work naturally without even having to ask for it (but it doesn’t). If you want positioning fallbacks that attempt to flip *all the different directions* to best fit, do this:

```css
.good-positioning-fallbacks {
  position-try: flip-block, flip-inline, flip-block flip-inline;
}
```

Behold, a menu that works no matter where it shows up in a browser window:

<VidStack src="https://videopress.com/fbce1a0a-0629-4ed0-ba02-43f2bf2e05ed" />

---

## We Could Write it Longhand

There is also a special `@position-try` syntax which we could use to do the exact same thing, like…

```css
position-try-fallbacks: 
  --flip-block, 
  --flip-inline, 
  --flip-both;

@position-try --flip-block {
  position-area: block-end span-inline-start;
}

@position-try --flip-inline {
  position-area: block-start span-inline-end;
}

@position-try --flip-both {
  position-area: block-end span-inline-end;
}
```

The advantage to doing it this way is those @rule blocks allow us to do more stuff when they “hit”, for example adjust the `margin` differently or change alignment. That’s certainly nice if you need it!

---

## Demo

Here’s the demo page. Feel free to see [<VPIcon icon="fas fa-globe"/>a full page preview](https://witty-bonus-lemur.codepen.app/).

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ad6ff-0e99-739c-9ddf-f1d3c311f288"
  title="Menu Popover / Anchor"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Popover Context Menus with Anchor Positioning",
  "desc": "A context menu is like a tooltip in that it opens right next to the the thing that opened it. Here, we animate the opening and ensure it opens somewhere where it doesn't get cut off.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/popover-context-menus-with-anchor-positioning.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
