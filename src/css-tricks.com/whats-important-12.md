---
lang: en-US
title: "What’s !important #12: Safari Testing, ::checkmark, HTML Anchor Positioning, and More"
description: "Article(s) > What’s !important #12: Safari Testing, ::checkmark, HTML Anchor Positioning, and More"
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
      content: "Article(s) > What’s !important #12: Safari Testing, ::checkmark, HTML Anchor Positioning, and More"
    - property: og:description
      content: "What’s !important #12: Safari Testing, ::checkmark, HTML Anchor Positioning, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-12.html
prev: /programming/css/articles/README.md
date: 2026-05-29
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/Screenshot-2026-05-28-at-2.31.26-PM.png
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
  name="What’s !important #12: Safari Testing, ::checkmark, HTML Anchor Positioning, and More"
  desc="The old (testing in Safari when you don’t have Safari), the new (::checkmark), the in-between (anchor positioning but with HTML), and more."
  url="https://css-tricks.com/whats-important-12"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/Screenshot-2026-05-28-at-2.31.26-PM.png"/>

**What’s !important #12** talks about the old (testing in Safari when you don’t have Safari), the new (`::checkmark`), the in-between (anchor positioning but with HTML), and more.

Buckle up!

---

## Testing in Safari when you don’t have Safari

![A Safari browser window on macOS showing an About Safari dialogue box with a translucent red and orange noise filter.<br/>Source: [**Frontend Masters**](/frontendmasters.com/blog/testing-safari-on-a-budget.md)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/safari.jpg-e1780000053378-1024x452.webp?resize=1024%2C452&ssl=1)

Safari is the second most popular web browser, but is only available to Apple users. Fair enough. I mean, Apple are heavily invested in making Safari a proprietary browser that’s deeply integrated with Apple’s software and hardware. However, this makes testing websites in Safari a bit of a pain. [<VPIcon icon="iconfont icon-css-tricks"/>Declan Chidlow](https://css-tricks.com/author/declanchidlow) explained what our options are in regards to [**testing in Safari when you don’t have Safari**](/frontendmasters.com/testing-safari-on-a-budget.md).

---

## A first look at `::checkmark`

[<VPIcon icon="iconfont icon-css-tricks"/>Sunkanmi Fafowora](https://css-tricks.com/author/sunkanmifafowora/) gave us our [**first look at the `::checkmark` pseudo-element**](/piccalil.li/navigating-the-age-old-problem-of-checkmarks-in-ui-with-progressive-enhancement.md), which solves the age-old problem of not (really) being able to style checkmarks. Note that this also targets the checked state indicator of radios and selects, not just checkboxes!

---

## Different shape styles with `border-shape` + `shape()`

[<VPIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author/afiftemani/) pointed out that we can [**create more shape styles when combining `border-shape` with the `shape()` function**](/css-tip.com/shape-variation.md) (compared to `clip-path`), and, easily switch between them.

![Three variations of a wavy shape rendered in red, showing an outline version, a solid filled version, and a cutout version inside a solid red square.<br/>Source: [**CSS Tip**](/css-tip.com/shape-variation.md)](https://css-tricks.com/wp-content/uploads/2026/05/border-shape-styles.avif)

---

## A concise guide to `sibling-index()` and `sibling-count()`

[<VPIcon icon="iconfont icon-css-tricks"/>Durgesh Pawar](https:/css-tricks.com/author/durgeshpawar/) did a [**deep dive on `sibling-index()` and `sibling-count()`**](/smashingmagazine.com/mathematical-layouts-sibling-index-sibling-count.md), showing us all of the cool things that we can do with these almost-Baseline CSS functions.

<CodePen
  user="anon"
  slug-hash="myOEJPx"
  title="Dynamic Staggered Animations with CSS sibling-index()"
  :default-tab="['css','result']"
  :theme="dark"/>

Also, don’t miss Durgesh’s [**two-part series about View Transition gotchas**](/css-tricks.com/cross-document-view-transitions-part-1.md) right here on CSS-Tricks.

---

## Managing anchor associations with data attributes and advanced `attr()`

This one’s actually from me! Disappointed to hear that the `anchor` attribute has been dropped, which would’ve provided a way of managing anchor associations using HTML, I demonstrated my alternative technique that involves [**managing anchor associations with data attributes and advanced `attr()`**](/frontendmasters.com/managing-anchor-associations-with-data-attributes-and-advanced-attr.md).

I won’t spoiler the CSS, but here are the different HTML syntaxes that I explored:

```html
<!-- anchor attribute -->
<div anchor="anchorA">Boat A</div>
<div id="anchorA">Anchor A</div>

<!-- Data attributes with custom ident (requires attr()) -->
<div data-boat="--anchorA">Boat A</div>
<div data-anchor="--anchorA">Anchor A</div>

<!-- Data attributes (requires attr() and ident()) -->
<div data-boat="anchorA">Boat A</div>
<div data-anchor="anchorA">Anchor A</div>
```

---

## Take the State of CSS 2026 survey

![The official graphic for the State of CSS 2026 survey, featuring a stylized CSS logo inside a pink and purple diamond emblem against a dark background.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/Screenshot-2026-05-28-at-2.31.26-PM.png?resize=1488%2C790&ssl=1)

It’s that time of the year again!

I love these “state of” surveys (especially the [<VPIcon icon="fas fa-globe"/>State of CSS 2026](https://survey.devographics.com/en-US/survey/state-of-css/2026) survey, but I’m sure you know that already). This year feels different though, and I’m not the only one that’s noticed.

From the opening crawl:

> > Take a deep breath. Calm down. It’s ok if you don’t know every single new CSS property. The truth is, very few of us do.
> > 
> > Look, one of this survey’s goals has always been to help keep developers up to date on the latest and greatest CSS improvements. But the downside is that all this progress can sometimes feel overwhelming.
> > 
> > That’s why this year we made a conscious effort to reduce the number of features covered in the survey, focusing instead on the ones that matter most.

I totally get it. It’s becoming more and more difficult to keep up with CSS. My “things to check out” list just keeps getting longer! That being said, there’s never been a more exciting time to be a fan of CSS. That feeling when you learn a new feature and then two more get shipped, is overwhelming but in the best way possible.

But still, time doesn’t grow on trees, so we have to figure out which features to invest in, and that’s what these “state of” surveys are all about. And they’re going hard this year, really zeroing in on the most important ones.

But, if you have an appetite for *all* things CSS, I hear there’s a [<VPIcon icon="iconfont icon-css-tricks"/>great blog](https://css-tricks.com/) for that!

---

## New web platform features

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 151](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/151)
  - [**Container style queries**](/css-tricks.com/css-container-queries.md#container-style-queries) (now Baseline)
  - [<VPIcon icon="fa-brands fa-firefox"/>*Document* Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API) (desktop only, no Safari support)

Quality over quantity, I guess!

Until next time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #12: Safari Testing, ::checkmark, HTML Anchor Positioning, and More",
  "desc": "The old (testing in Safari when you don’t have Safari), the new (::checkmark), the in-between (anchor positioning but with HTML), and more.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-12.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
