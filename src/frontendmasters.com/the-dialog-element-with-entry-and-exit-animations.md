---
lang: en-US
title: "The Dialog Element with Entry *and* Exit Animations"
description: "Article(s) > The Dialog Element with Entry *and* Exit Animations"
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
      content: "Article(s) > The Dialog Element with Entry *and* Exit Animations"
    - property: og:description
      content: "The Dialog Element with Entry *and* Exit Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-dialog-element-with-entry-and-exit-animations.html
prev: /programming/css/articles/README.md
date: 2024-08-28
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3559
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
  name="The Dialog Element with Entry *and* Exit Animations"
  desc="Now that we're starting to see better support for @starting-style and the allow-discrete keyword, we've got a pretty straightforward way for defining *different* entry and exit states."
  url="https://frontendmasters.com/blog/the-dialog-element-with-entry-and-exit-animations/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3559"/>

Una Kravets blogged the other day that [<VPIcon icon="fas fa-globe"/>animating entry effects are now supported](https://web.dev/blog/baseline-entry-animations?hl=en#enabling_discrete_animations_with_allow-discrete) in the latest stable version of all major browsers. The *new cool* way to do it, that is. We’ve long had trickery like applying a `@keyframe` animation with a `to` frame that would behave like an “entry effect”, but it was a bit awkward and didn’t work in all situations. Specifically one like using the new and very useful `<dialog>` element.

This bit of code says a lot:

```css
dialog[open] {
  transition: 
    translate 0.7s ease-out, 
    display 0.7s ease-out allow-discrete;

  /* Post-Entry (Normal) State */
  translate: 0 0;

  /* Pre-Entry State */
  @starting-style {
    translate: 0 100vh;
  }
}
```

There are two big things at work there:

1. The `display` property is listed in the transitions, with the keyword `allow-discrete`. The code for it is hidden in User-Agent stylesheets, but when a `<dialog>` moves from close (default) to open, the `display` goes from `none` to `block`. Using this keyword means that the `display` property is changed *after* the animation timing, so animations can actually happen.
2. The `@starting-style` gives us an opportunity to apply styling to the element *just as it’s entering it’s current state*, meaning the transition will happen between the styles declared inside and outside that block.

Golf clap. Everything is awesome.

What Una *didn’t* cover, on purpose surely, was *exit* animations (because they aren’t in “Baseline” yet, meaning not supported across browsers). But they *are* supported in Chrome-n-friends land, so I thought it was worth looking at. To me, they are just as interesting, cool, and useful as the entry kind.

---

## Both Entry and Exit

The trick isn’t terribly different than the code above, it’s just to have very specific styles for both the open and closed (*i.e.* `:not([open]`) states. Like this:

```css{7} :collapsed-lines
dialog {
  --duration: 0.34s;
  transition: 
    translate var(--duration) ease-in-out, 
    scale var(--duration) ease-in-out, 
    filter var(--duration) ease-in-out, 
    display var(--duration) ease-in-out allow-discrete;

  &[open] {
    /* Post-Entry (Normal) State */
    translate: 0 0;
    scale: 1;
    filter: blur(0);

    /* Pre-Entry State */
    @starting-style {
      translate: 0 8vh;
      scale: 1.15;
      filter: blur(8px);
    }
  }

  /* Exiting State */
  &:not([open]) {
    translate: 0 -8vh;
    scale: 1.15;
    filter: blur(8px);
  }
}
```

Check it out:

<CodePen
  user="chriscoyier"
  slug-hash="xxoPzEZ"
  title="Dialog Animate In — Fly from Above"
  :default-tab="['css','result']"
  :theme="dark"/>

And a video in case you’re in a browser that doesn’t support it yet:

<VidStack src="https://videos.files.wordpress.com/puie9YCG/cleanshot-2024-08-28-at-09.34.50_mp4_hd_1080p.mp4" />

Note that not only does it *have* entry and exit animations, but those states are *different* —which is very cool! Emphasizing that, here’s one where I move the dialog along an `offset-path` so the exit is really a continuation of the path:

<CodePen
  user="chriscoyier"
  slug-hash="rNErmmz"
  title="Dialog Entry and Exit along a Path"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Usage with Popovers

This isn’t exclusively for dialogs, you can make it work with whatever. But naturally open-closable things make the most sense. Like native popovers! Nils Riedemann has a nice demo here:

<CodePen
  user="chriscoyier"
  slug-hash="jOjLjYw"
  title="Popover and Backdrop with Enter and Leave Transition using only CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Dialog Element with Entry *and* Exit Animations",
  "desc": "Now that we're starting to see better support for @starting-style and the allow-discrete keyword, we've got a pretty straightforward way for defining *different* entry and exit states.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-dialog-element-with-entry-and-exit-animations.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
