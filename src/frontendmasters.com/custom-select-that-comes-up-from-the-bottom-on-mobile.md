---
lang: en-US
title: "Custom Select (that comes up from the bottom on mobile)"
description: "Article(s) > Custom Select (that comes up from the bottom on mobile)"
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
      content: "Article(s) > Custom Select (that comes up from the bottom on mobile)"
    - property: og:description
      content: "Custom Select (that comes up from the bottom on mobile)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-select-that-comes-up-from-the-bottom-on-mobile.html
prev: /programming/css/articles/README.md
date: 2025-07-01
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6293
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
  name="Custom Select (that comes up from the bottom on mobile)"
  desc="You've got A LOT of control over the design of select menus now, and it can be done as a progressive enhancement."
  url="https://frontendmasters.com/blog/custom-select-that-comes-up-from-the-bottom-on-mobile/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6293"/>

[<VPIcon icon="fa-brands fa-firefox"/>Custom `<select>` menus are a thing now](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select), especially because they can be progressively enhanced into. Una has [<VPIcon icon="fa-brands fa-codepen"/>some great examples](https://codepen.io/collection/BNZjPe).

![[Demo (<VPIcon icon="fa-brands fa-codepen"/>`una`)](https://codepen.io/una/pen/eYojgZw), which falls back to entirely default styling.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-20-at-6.58.11%E2%80%AFAM.png?resize=1024%2C669&ssl=1)

I was recently at [<VPIcon icon="fas fa-globe"/>CSS Day](https://cssday.nl/) and got to see [<VPIcon icon="fas fa-globe"/>Brecht De Ruyte](https://utilitybend.com/) do a whole talk on it. He’s also go a ~~three~~four-part series on it ([<VPIcon icon="fas fa-globe"/>starting here](https://utilitybend.com/blog/the-customizable-select-part-one-history-trickery-and-styling-the-select-with-css)). My brain was full of CSS stuff while there, I had a weird hankering to work on a custom select that combined a bunch of it. I roped Brecht into collabing on my idea.

See, we were on the heals of the whole [<VPIcon icon="fa-brands fa-apple"/>liquid glass thing from Apple](https://apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) and it seemed fun to make the selects kinda glassy with borders and blur. I also wanted to if *animating the select in* was possible (and maybe stagger them in?!). Plus, I was reminiscing about the [<VPIcon icon="fas fa-file-image"/>original weird iOS select UI](https://frontendmasters.com/blog/wp-content/uploads/2025/06/iphoneselect.png) where it had a special UI that came up from the bottom. Is that maybe… *better?* for thumb-reach? So let’s try that.

---

## The Base

I like Brecht’s snippet that sets the stage nicely:

```scss
select {
  appearance: none;
  @supports (appearance: base-select) {
    &,
    &::picker(select) {
      appearance: base-select;
    }
  }
}
```

That’s saying:

1. We’re going to wipe out the base styling anyway. Even browsers that don’t support the entire suite of custom styles for selects support styling the basic element itself, just not the “picker” part.
2. In browsers that support it, we need to set `appearance: base-select;` to opt-in to the custom styleabtlity, and we need to do it both on the select itself and the picker, which uses this newfangled pseudo element.

Minor aside: it’s interesting that the `appearance` value is `base-select` for now. In the hopefully-not-too-distant future, we’ll be opt-in “resetting” not just selects but [<VPIcon icon="fa-brands fa-youtube"/>all the form elements with `appearance: base`.](https://youtu.be/WgSiqSqxTxw) But I guess that isn’t far enough along and may have been a slightly dangerous breaking change scenario, so it’s isolated to `base-select` for now. So be it.

---

## The Glassy Look

We’ve got the ability now to style the `select` directly and a good amount of lienency to style it however we want. Here, a blurry background is applied and the dropdown arrow is applied with a background SVG. (This is Brecht’s cool idea and implementation, as a reminder.)

```css
select {
  display: flex;
  justify-content: space-between;
  min-width: 300px;
  align-items: center;
  color: white;
  padding-block: 10px;
  padding-inline: 10px 30px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
  backdrop-filter: blur(5px);
  background: oklch(0.4764 0.2094 259.13 / 0.3)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23FFF' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E%0A")
    right 10px center / 20px no-repeat;
}
```

Even in Firefox, which doesn’t support `appearance: base-select`, we’ve got the look we’re after:

![Custom select menu with a blurred background, showing the option 'One' and a dropdown arrow.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-11.09.44%E2%80%AFAM.png?resize=832%2C338&ssl=1)

We have no ability to style the picker in Firefox or Safari (yet!) but *that’s totally fine.* We just get the default experience:

![A custom select menu with a blurred glassy background featuring options: 'One' (selected), 'Two', 'Three', and 'Four'.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-11.10.46%E2%80%AFAM.png?resize=878%2C426&ssl=1)

Our goal is to change up this experience on small screens, so it’s a little unfortunate this stuff isn’t in iOS yet (it is in Android!) but again, we just get the default experience which is fine:

![A close-up view of a customizable select dropdown menu on an iPhone 15, displaying options 'One', 'Two', 'Three', and 'Four' with a blue gradient background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-30-at-11.13.43%E2%80%AFAM.png?resize=542%2C1024&ssl=1)

---

## The Picker Icon

We can start playing with, in a progressive enhancement friendly way, styling the custom “picker” now. Let’s do the icon first.

```scss
select {
  ...

  @supports (appearance: base-select) {
    background: oklch(0.4764 0.2094 259.13 / 0.3);

    &:focus,
    &:hover {
      background-color: oklch(0.4764 0.2094 259.13 / 0.6);
    }
    
    &::picker-icon {
      content: "";
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%23FFF' class='size-6'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' /%3E%3C/svg%3E%0A");
      transition: rotate 0.2s ease-out;
    }

    &:open::picker-icon {
      rotate: 180deg;
    }
  }
}
```

When the browser supports it, we’ll rip off the SVG background we were using for the dropdown arrow and apply it as the `::picker-icon` instead. That alone isn’t terribly useful, but now because we can target it individually, we can animate a rotation on it. That’s nice.

---

## The Picker

Styling the part that opens up when you active a select we’re calling the “picker”, and this is the part that’s completely new to be able to style. You get your hands on it with the somewhat unusual `select::picker(select)` selector. You have to put `select` in the pseudo function thing — it’s the [<VPIcon icon="fa-brands fa-firefox"/>only valid value](https://developer.mozilla.org/en-US/docs/Web/CSS/::picker#parameters). For now? Maybe it’s because in the future they’ll want to use `::picker` for date inputs or the like? Not sure but whatever.

```scss
select {
  ... 
 
  @supports (appearance: base-select) {
    ...

    &::picker(select) {

    }
  }
}
```

We don’t really need much styling of the picker itself. That is, we want to *remove* the base styling by making the background transparent. The `option` elements themselves will have the *look*.

This is where we’re going to do some interesting positioning, though. The way the `::picker` positions itself next to the select is: anchor positioning! Of course it is, might as well use the layout primitives baked into the browser. It does feel weird/interesting to see at work though, as **we need to be aware of it to change it.** We’re going to wait for small screens, then attach the picker to the bottom of the screen.

```scss :collapsed-lines
select {
  ... 
 
  @supports (appearance: base-select) {
    ...

    &::picker(select) {
      background: transparent;

      @media (width < 400px) {
        position-anchor: --html;
        bottom: 0;
        width: 100%;
      }
    }

    option {
      backdrop-filter: blur(12px);
    }
  }
}
```

<VidStack src="https://videopress.com/bbdb9576-6264-4bab-b953-14408f7cb3c9" />

Again the theory there is small screens are often phones and we’re moving the picker down to make it more thumb-reachable. It’s an assumption. Maybe we should be thinking in terms of `@media (pointer: coarse)` or something, but I’ll leave that to you, we’re just playing.

---

## Animating

I’d rate this stuff as decently complicated to animate. Here’s some reasons:

- The Shadow Root is at play here, making using DevTools to poke around in there while you’re working is a little extra cumbersome.
- The `::picker` is a display `none` to `block` change when it becomes visible, which means to animate it you need to remember `transition-behavior: allow-discrete` and how all that works.
- We’re also going to need `@starting-style` to get incoming animations, which can be repetitive. Plus some bonus staggering.
- We’ve got an `:open` state to mix in, `@media` queries to mix in, a `:checked` state for the options with a `::checkmark`, and other pseudos.

All together, it just feels like *a lot*. It’s a lot of different nested state spread out. Even trying to organize it as nicely as possible, it’s hard to keep straight. The nesting is handy, but you can’t nest quite everything. Like the `:open` state is on the `select`, so you can’t style the `::picker` and then the open state within it, which would be handy for `@starting-style`, because you really need to write `select:open::picker(select)` not `select::picker(select):open` It’s fine it’s just a little bah humbug.

Lemme just put the basics for the stagged in/out animations for the `option` elements here for a taste:

```scss :collapsed-lines
select {
  ... 
 
  @supports (appearance: base-select) {
    ...

    option {
      ... 

      transition-property: opacity, scale;
      transition-duration: 0.2s;
      transition-delay: calc((sibling-count() - sibling-index()) * 100ms);
      scale: 0.25;
      opacity: 0;
    }

    &:open {
      option {
        scale: 1;
        opacity: 1;
        transition-delay: calc(sibling-index() * 100ms);

        @starting-style {
          scale: 0.25;
          opacity: 0;
        }
      }
    }
  }
}
```

See above it was necessary to repeat the `option` selector. Not a huge deal, but you usually expect to avoid that with nesting. Plus the `@starting-style` thing can feel repetitive, but that’s offering the possibility of different in-and-out styling so it’s ultimately a good thing.

The staggered / scale / fade-in thing feels nice to me, and particularly nice when they skoosh up from the bottom anchored position.

<VidStack src="https://videopress.com/2db8bc8a-69a3-4fac-9189-1fcd64e02185" />

---

## Demo

There’s a bunch more CSS tucked in there to make it all happen, so you might as well have the whole thing here:

<CodePen
  user="chriscoyier"
  slug-hash="dPovqzz"
  title="Custom Select"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom Select (that comes up from the bottom on mobile)",
  "desc": "You've got A LOT of control over the design of select menus now, and it can be done as a progressive enhancement.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-select-that-comes-up-from-the-bottom-on-mobile.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
