---
lang: en-US
title: "What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More"
description: "Article(s) > What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More"
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
      content: "Article(s) > What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More"
    - property: og:description
      content: "What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-17.html
prev: /programming/css/articles/README.md
date: 2026-08-14
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/wi17.png
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
  name="What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More"
  desc="Plus, how to style skeleton UIs, how to enable diagonal scrolling, how images can overflow themselves, and yet, still more. Basically, how to do a lot of really cool (CSS) stuff."
  url="https://css-tricks.com/whats-important-17"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/wi17.png"/>

Plus, how to style skeleton UIs, how to enable diagonal scrolling, how images can overflow themselves, and yet, still more. Basically, how to do a lot of really cool (CSS) stuff.

---

## How to use the CSS Custom Highlight API

[<VPIcon icon="iconfont icon-css-tricks"/>Sunkanmi Fafowora](https://css-tricks.com/author/sunkanmifafowora/) demonstrated [**how to use the CSS Custom Highlight API**](/piccalil.li/working-with-highlight-using-progressive-enhancement.md), which is now supported by all major web browsers. Despite “CSS” being in the name (the styling is handled by the `::highlight()` pseudo-element function), it’s actually JavaScript that makes the wheels go round for this one.

Both syntaxes are quite fun to work with, though.

<CodePen
  user="anon"
  slug-hash="XJjwNap"
  title="::highlight() demo: pure `text-shadow`s"
  :default-tab="['css','result']"
  :theme="dark"/>

If you’re curious as to [**how `::highlight()` works alongside other highlight pseudo-elements**](/css-tricks.com/how-to-style-the-new-search-text-and-other-highlight-pseudo-elements.md) (there are actually quite a few of them), I wrote something up not too long ago.

---

## How images can overflow themselves

[<VPIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author/afiftemani/) explained [**how images can sort of overflow themselves**](/blog.master.dev/something-nobody-told-you-about-the-image-element-it-can-overflow.md), because the `<img>` element is like a container that the ‘replaced content’ (the image resource) can overflow.

I suppose that explains why [**we can swap the `src` using CSS**](/css-tricks.com/whats-important-10.md#replacing-img-srcs-using-content), like this:

```html
<img src="image.avif" alt="Alt text">
```

```css
img {
  content: url(new-image.avif) / "New alt text";
}
```

Or even this:

```css
img {
  content: image-set(
    url("image.avif") 1x,
    url("image-2x.avif") 2x,
    url("image-3x.avif") 3x
  );
}
```

Temani also showed us what we can do with this information:

<CodePen
  link="https://codepen.io/t_afif/pen/RNKeMaK/d47d68b7fc433788fad7b12bf51c9021"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="bNgmRGa"
  title="3D hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="YPNJajx"
  title="Reveal hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="ogBawYL"
  title="Screen saver codepen version"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="WbRazPP"
  title="Fancy decoration using corner-shape"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How to fix `text-stroke`

Tyler Sticka reminded us (*well, I’m learning about it for the first time…*) [<VPIcon icon="fas fa-globe"/>how to fix `text-stroke` with `paint-order`](https://tylersticka.com/journal/improved-css-text-stroke/). For those who don’t know, `text-stroke`s are center-aligned, so half of the stroke appears on the outside while the other half appears on the inside, and the inside half often looks terrible.

![The words Bleh and Neat written in blue stylized fonts with white outlines against a salmon background, demonstrating the text-stroke CSS property without and then with paint-order.<br/>Source: [<VPIcon icon="fas fa-globe"/>Tyler Sticka](https://tylersticka.com/journal/improved-css-text-stroke/).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/1.png?resize=1441%2C1223&ssl=1)

The `paint-order` property doesn’t fix the alignment, but it does ensure that the text fill is painted over the inside half of the stroke.

Also, the prefixed version of `text-stroke` (`-webkit-text-stroke`) is still necessary for all browser vendors. Overall, an upgrade for `text-stroke` is *long* overdue, and hopefully we see that soon.

---

## How to style skeleton UIs

Lea Verou contemplated [how to style skeleton UIs using only CSS (<VPIcon icon="fa-brands fa-bluesky"/>`lea.verou.me`)](https://bsky.app/profile/lea.verou.me/post/3mrzvtnaiak2n), and the wonderful CSS community chimed in with more than a few awesome solutions too. It was so nice to see [**`box-decoration-break: clone`**](/css-tricks.com/almanac-properties/box-decoration-break.md) in there ([suggested by Agustin Capeletto (<VPIcon icon="fa-brands fa-bluesky"/>`lowpoly.gg`)](https://bsky.app/profile/lowpoly.gg/post/3ms25ve7ye22n)), although different elements need different solutions, it seems.

---

## Different ways to use the `lh` unit

Ahmad Shadeed showcased [**different ways to use the `lh` unit**](/ishadeed.com/lh-unit.md), which, as it turns out, has a range of uses. If you’re not familiar, `1lh` is equal to the computed `line-height`.

![A screenshot of an interactive web demo showing an image floated to the left of some text. The ‘use lh [units]’ checkbox is selected, causing the image’s height to be equal to that of 6 lines of text.<br/>Source: [**Ahmad Shadeed**](/ishadeed.com/lh-unit.md).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/2.png?resize=1696%2C1016&ssl=1)

---

## How to enable diagonal scrolling

Bramus explained [**how the new `scroll-axis-lock` property facilitates diagonal scrolling**](/bram.us/unlock-diagonal-scrolling-with-css-scroll-axis-lock-none.md) (the default behavior only allows for scrolling one axis at a time).

---

## An introduction to CSS navigation matching

Bramus also unveiled [**CSS navigation matching**](/bram.us/styling-the-navigation-declarative-route-and-navigation-matching-in-css.md), which basically enables us to style elements based on where the user is navigating to or from.

It’s kind of mind-blowing, to be honest. Bramus actually published this right after I wrote [**What’s !important #16**](/css-tricks.com/whats-important-16.md) (the *last* issue), but I just couldn’t let this one fly under the radar…

Since neither Chrome, Safari, nor Firefox has shipped a new stable version since **What’s !important #16** (and because it’s Friday), let’s wrap this one up early. Instead, I’ll leave you with an interesting question — what’s the *worst* HTML element?

See ya in a couple of weeks!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #17: Custom Highlight API, CSS Navigation Matching, Fixing text-stroke, and More",
  "desc": "Plus, how to style skeleton UIs, how to enable diagonal scrolling, how images can overflow themselves, and yet, still more. Basically, how to do a lot of really cool (CSS) stuff.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-17.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
