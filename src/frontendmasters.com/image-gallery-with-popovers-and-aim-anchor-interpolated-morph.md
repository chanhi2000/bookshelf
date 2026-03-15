---
lang: en-US
title: "Image Gallery with Popovers and AIM (Anchor-Interpolated Morph)"
description: "Article(s) > Image Gallery with Popovers and AIM (Anchor-Interpolated Morph)"
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
      content: "Article(s) > Image Gallery with Popovers and AIM (Anchor-Interpolated Morph)"
    - property: og:description
      content: "Image Gallery with Popovers and AIM (Anchor-Interpolated Morph)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/image-gallery-with-popovers-and-aim-anchor-interpolated-morph.html
prev: /programming/css/articles/README.md
date: 2026-03-19
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8857
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
  name="Image Gallery with Popovers and AIM (Anchor-Interpolated Morph)"
  desc="An image gallery is a nice example of AIM, where the larger version of an image can "
  url="https://frontendmasters.com/blog/image-gallery-with-popovers-and-aim-anchor-interpolated-morph/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8857"/>

While I was learning about [<VPIcon icon="fas fa-globe"/>Adam’s AIM technique](https://argyle.ink/anchor-interpolated-morphing) the other day, it occurred to me that a cool use case would be a **photo gallery**. See what AIM (Anchor-Interpolated Morph) can do is animate the entrance and exit of elements *from other elements.* As in, use those other elements as literal CSS anchors.

In this case, the “thumbnails” in a photo gallery could be the anchors, and we’d animate in the larger versions of those photos *from* those thumbnail anchors. And back out to them too.

It’s a kind of animation that not only looks cool, but is literally helpful, reminding you where an element came from and where it went. Imagine you’re proofing some images from a magazine photo shoot one by one, it would be a helpful reminder as you’re clicking through them which one you just looked at.

Here’s the demo:

<CodePen
  link="https://codepen.io/editor/team/CodePenTemplates/pen/019cb5ec-807e-727a-b18a-5eb41b0fc901"
  title="Photo Grid"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: details Here’s a video in case you’re on a browser that doesn’t support this particular cocktail of technology.


:::

---

## HTML and CSS Setup (No JavaScript by Default)

A (rather amazing) bonus of all this is how you can make a photo-grid like this, with the “open larger” ability, **without any JavaScript**. It’s really as simple as this:

```html
<button popovertarget="img-1">
  <img
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=400&fit=crop&auto=format"
    alt="Mountain landscape"
    loading="lazy"
  />
</button>
<img
  popover
  id="img-1"
  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&auto=format"
  alt="Mountain landscape"
  loading="lazy"
/>
```

That’s a `<button>` that points to a `popover`, so the default behavior is to toggle the popover open and closed when clicked. The “popover” is: *the larger image!* Notice I can slap the `popover` attribute right on the `<img>` that comes right after the button.

That accomplishes the functionality we’re after.

---

## The Three States

The deal with AIM (or any animation technique you’re dealing with that has entry and exit animations) is that there are really **three states**.

### State 1: Before Open / On Way In

We’ll need to specifically make entry styles. Like the styles before the element (the “popover” in our case) enters the page. This can be done with `@keyframes`, but I prefer the explicitness (and [<VPIcon icon="fas fa-globe"/>interruptibility](https://joshwcomeau.com/css/starting-style/#aside-update-new-benefit-discovered)) of `@starting-style`.

```css{4-6}
/* The large image */
[popover] {
  ...
  /* Before Open / On Way In Styles */
  @starting-style {
  }
}
```

But there is more to deal with here, as this along isn’t going to cut it. We’re going to need to consider our open styles first, because these starting styles need to have at least the same specificity as those, otherwise it won’t work. So let’s do those next.

### State 2: Open

We can be really specific with open state styles by using `:popover-open`. We could change a class in JavaScript or something too, but why? This is literally what popovers are for.

```css{5-7,9-13}
/* The Large Image */
[popover] {
  ...

  /* Open Styles */
  &:popover-open {
  }
  
  /* Before Open / On Way In Styles */
  @starting-style {
    &:popover-open {
    }
  }
}
```

Note that I’m putting the starting styles *after* the open styles. To me that’s a smidge unintuitive, but `@starting-style` doesn’t have any specificity on it’s own, and we need to make sure the styles “beat” the open styles. We can win here by using the same selector and putting them later in the source order.

### State 3: After Closed / On Way Out

Interestingly, these styles are the styles just directly on the element without any special extra selectors needed. But me, I kinda like putting them into a special selector just for the explicit-ness of it.

```css{15-17}
/* The Large Image */
[popover] {
  ...
  
  /* Open Styles */
  &:popover-open {
  }
  
  /* Before Open Styles */
  @starting-style {
    &:popover-open {
    }
  }
  
  /* After Closed / On Way Out Styles */
  &:not(:popover-open) {
  }
}
```

### Make sure it actually animates

Big ol’ caveat here! One style that changes when a popover opens and closes is that it’s `display` value changes from `none` to `block`. This is going to pretty much totally nuke these entry and exit styles.

There is a little trick in CSS to ensure that, even though that `display` value is changing, our animations still work. See, *normally,* the `display` value changes *immediately*, but if we specifically give it a `transition-behavior: allow-discrete` then it will change perfectly in time for entry and exist animations to run.

So let’s do that, and apply the actual transitions.

```css{5}
/* The Large Image */
[popover] {
  @media (prefers-reduced-motion: no-preference) {
    transition:
      display 1s allow-discrete,
      translate 1s;
  }
  
  /* Open Styles */
  &:popover-open {
    translate: 0 0;
  }
  
  /* Before Open Styles */
  @starting-style {
    &:popover-open {
      translate: -100px 0;
    }
  }
  
  /* After Closed / On Way Out Styles */
  &:not(:popover-open) {
    translate: 100px 0;
  }
}
```

::: note

1. The transitions are applied with a `@media (prefers-reduced-motion: no-preference)` media query. This just removes them. You could also just tone them down. Lots of control here.
2. The exit styles are *different* than the entry styles. Fun!

:::

---

## The AIM Part

Those styles above just set the stage for entry and exit styles on popovers. As written, they open a popover by sliding in from the left and sliding out to the right. But with AIM, we want to be animating **from the specific coordinates of another element.** That’s the “anchor” part of AIM.

To do AIM, we make the **entry styles** based on the top/left/width/height of the anchor (a photo thumbnail) and we make the **open styles** whatever else we wanna do (open it larger and centered).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/03/Screenshot-2026-03-19-at-9.13.24-AM.png?resize=1024%2C878&ssl=1)

That looks like this:

```css
[popover] {
  ...

  position-anchor: --⚓︎-morph;

  --speed: 0.5s;
  @media (prefers-reduced-motion: no-preference) {
    transition:
      display var(--speed) allow-discrete,
      height var(--speed) ease,
      width var(--speed) ease,
      top var(--speed) ease,
      left var(--speed) ease;
  }

  &:popover-open {
    height: auto; /* or fit-content */
    max-height: 70dvb;
    width: 70dvi;
    left: 15dvi;
    top: 15dvb;
  }

  @starting-style {
    &:popover-open {
      left: anchor(left);
      top: anchor(top);
      width: anchor-size(width);
      height: anchor-size(height);
    }
  }

  &:not(:popover-open) {
    left: anchor(left);
    top: anchor(top);
    width: anchor-size(width);
    height: anchor-size(height);
  }
}
```

Note that our entry and exit styles are *the same* here, which is actually nice. It shows where a photo came from and where it goes back to. Here’s that final demo again.

<CodePen
  link="https://codepen.io/editor/team/CodePenTemplates/pen/019cb5ec-807e-727a-b18a-5eb41b0fc901"
  title="Photo Grid"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Note that the animation starts before the larger image is necessarily all the way loaded, which is a smidge awkward. You could remove the lazy loading, or figure out some JavaScript that will delay the action until it’s loaded or something.

And here’s an example where an AIM exit style goes to a totally different anchor!

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c9184-da1d-76bf-b87b-2cb41fdff184"
  title="AIM with Different Start/End"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Image Gallery with Popovers and AIM (Anchor-Interpolated Morph)",
  "desc": "An image gallery is a nice example of AIM, where the larger version of an image can ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/image-gallery-with-popovers-and-aim-anchor-interpolated-morph.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
