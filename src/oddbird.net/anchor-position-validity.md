---
lang: en-US
title: "Here's Why Your Anchor Positioning Isn't Working"
description: "Article(s) > Here's Why Your Anchor Positioning Isn't Working"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - oddbird.net
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Here's Why Your Anchor Positioning Isn't Working"
    - property: og:description
      content: "Here's Why Your Anchor Positioning Isn't Working"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/oddbird.net/anchor-position-validity.html
prev: /programming/css/articles/README.md
date: 2025-01-29
isOriginal: false
author:
  - name: James Stuckey Weber
    url: https://oddbird.net/authors/james/
cover: https://oddbird.net/assets/images/blog/2025/anchor-valid-1600w.jpeg
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
  name="Here's Why Your Anchor Positioning Isn't Working"
  desc="How to find an anchor element"
  url="https://oddbird.net/2025/01/29/anchor-position-validity/"
  logo="https://oddbird.net/safari-pinned-tab.svg"
  preview="https://oddbird.net/assets/images/blog/2025/anchor-valid-1600w.jpeg"/>

::: info

Check out our [<VPIcon icon="iconfont icon-oddbird"/>Winging It](https://oddbird.net/wingingit/) conversations about design, frontend, and backend development.

**Winging It** episode 8: [CSS Anchor Positioning in Practice](https://oddbird.net/2024/05/30/winging-it-08/)  
<!-- TODO: oddbird.net/winging-it-08.md -->
**Winging It** episode 16: [Debugging CSS Anchor Positioning](https://oddbird.net/2025/02/20/winging-it-16/)
<!-- TODO: oddbird.net/winging-it-16.md -->

:::

---

## The problem

Anchor positioning has a [**ton of possibilities**](/oddbird.net/anchor-position-yearbook.md), and is fun to play around with. But sometimes things start to break. The positioned element can’t find the anchor, it isn’t positioned correctly, and Dev Tools just says `--anchor is not defined`.

Then you need to figure out why… Is it related to how you’ve structured your markup, a browser bug or partial implementation, or maybe it’s how you’re using Shadow DOM?

There are many reasons why it can fail, but they all fail in the same way. This makes it really hard to troubleshoot and recover from.

::: note TL;DR

For the best chance of having anchor positioning work, here’s my recommendation:

1. Make the anchor and the positioned element siblings.
2. Put the anchor first in the DOM.

Go give that a try, and then come back and find out what to check next if that didn’t work.

I’ll wait.

:::

---

## Troubleshooting checklist

Here’s how to check for some of the common reasons why an anchor isn’t found:

If your issue isn’t on this list, [<VPIcon icon="iconfont icon-oddbird"/>let us know](https://oddbird.net/contact/) how you fixed it! This list isn’t exhaustive, and omits some cases with hidden content, fixed position anchors, and other less likely edge cases.

We’re also [<VPIcon icon="iconfont icon-oddbird"/>available for office hours](https://oddbird.net/contact/) to help work through your specific case.

::: note

The examples in this article are best viewed in a Chromium browser, version 131 or later. In the examples that show that an anchor is not found, be aware of a [<VPIcon icon="fa-brands fa-chrome"/>bug](https://issues.chromium.org/issues/388575663) in Chromium that causes elements with a `position-area` rule that do not have a valid anchor to be positioned incorrectly. 🤷🏼‍♂️

:::

### Anchor as a parent to the positioned element

While a positioned element can be a child of the anchor, this is the primary place where I’ve seen anchor positioning fail.

::: note

This may be changing – in our [**Winging It episode**](/oddbird.net/winging-it-16.md) with Tab Atkins-Bittner, Tab identified that this restriction may not be necessary. [I opened a CSS Working Group issue (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/11769) proposing a change to the spec to allow this.

:::

The [<VPIcon icon="iconfont icon-w3c"/>spec](https://drafts.csswg.org/css-anchor-position/) has specific requirements regarding the relationship between the containing blocks of the anchor and the positioned element – and containing blocks are essentially invisible, except in their effects, to developers. This leads to unexpected and surprising behavior.

::: note

While containing blocks deserve an entire deep dive post, in the meantime there’s a [brief note](#containing-blocks) at the end of this article.

:::

The containing block for the positioned element cannot be a descendant of the containing block for the anchor. Put a different way, the space in which the positioned element can be positioned cannot be smaller than the space in which the anchor can be positioned. (Note: this is technically less accurate, but it helps me visualize the rule.)

::: info

Add this to your mental model:

*The space in which the positioned element can be positioned cannot be smaller than the space in which the anchor can be positioned.*

:::

Crucially, if the anchor element is a parent to the positioned element and creates a containing box for the positioned element, anchor positioning will not work. The positioned element’s containing box will be the anchor, and the anchor’s containing box will be one of its ancestors.

<CodePen
  user="jamessw"
  slug-hash="raBdLWP"
  title="Sibling vs Child"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There are many things that can cause the anchor element to create a containing block, and positioned elements that are children will not work:

- If you set a `position` besides `static` on the anchor and the positioned element is `position: absolute`
- If you transform the anchor element somehow, with `transform`, `translate`, `scale`, etc.
- If the anchor element is a query container for container size queries

This is not an exhaustive list. Because there are so many ways to get into this situation unexpectedly, I recommend not nesting positioned elements inside the anchor.

### Valid anchor pseudo-elements

Most anchors will be elements, but if you’re using a pseudo-element, not all qualify. The pseudo-element must be a “fully styleable tree-abiding pseudo-element.” Tree-abiding pseudo-elements behave like regular elements, unlike pseudo-elements like `::first-letter` or `::spelling-error`. Some, like `::marker` or `::placeholder`, are not fully styleable, as they only allow some CSS properties.

The valid pseudo-elements are `::before`, `::after` and `::file-selector-button`. `::-webkit-slider-thumb` currently works as an anchor in Chrome, but as it is experimental and not part of any CSS spec, it’s unclear whether it should.

<CodePen
  user="jamessw"
  slug-hash="GgKxNWV"
  title="Anchor Pseudos"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Anchor scope

Anchor scope is great for making reusable anchoring rules, especially if you are anchoring on a list item or reusing styles. If you’re using `anchor-scope`, verify that both the anchor and positioned element are descendants of the element with the `anchor-scope` rule, or if the anchor itself has the `anchor-scope` rule, that the positioned element is a descendant of the anchor.

<CodePen
  user="jamessw"
  slug-hash="QwLVGjZ"
  title="Anchor Scope"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Absolute anchor order

This is the motivation behind the recommended solution to have the anchor come before the positioned element in the DOM.

Generally, absolutely positioned elements are rendered after relatively positioned elements. If the anchor element is absolutely positioned, then the positioned element must come after the anchor in the DOM.

<CodePen
  user="jamessw"
  slug-hash="xbKpedP"
  title="Absolute Anchor Order"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: note

The “after the anchor in the DOM” check happens on the `flat tree`, which means that it happens after slotted content is placed and shadow hosts are filled with their children.

:::

### Top layer

If you are using dialogs as modals or popovers, you are creating top layers. If the anchor element is in a [<VPIcon icon="iconfont icon-w3c"/>higher top layer](https://drafts.csswg.org/css-position-4/#top-layer) than the positioned element, the positioned element will not be able to locate the anchor.

You can position the root popover or dialog directly using `position: absolute`.

<CodePen
  user="jamessw"
  slug-hash="OPLzjJq"
  title="Top layer"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

However, if you want to position an element that is inside the popover or dialog, you will need to use `position: fixed`. Note that the positioned elements are not inside their parents in this example – `position: fixed` moves the element’s containing block to the viewport and allows positioning to work.

<CodePen
  user="jamessw"
  slug-hash="vEBbVXq"
  title="Top layer - inside"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Anchoring across shadow trees

An element in one tree can anchor to an element in another tree, as long as the relevant styles are all defined in the same style tree. In other words, if `anchor-name` is defined in a shadow tree, the `position-anchor` or `anchor()` styles must also be defined in that shadow tree. If the `anchor-name` is defined outside a shadow tree using `::part()`, then the `position-anchor` or `anchor()` styles can be defined outside as well.

<CodePen
  user="jamessw"
  slug-hash="zxOWoOE"
  title="Anchor on Shadow Part"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Containing blocks

::: info CSS Display Module Level 4 spec (<VPIcon icon="iconfont icon-w3c"/><code>drafts.csswg.org</code>)

> Notably, a containing block is not a box (it is a rectangle)…

```component VPCard
{
  "title": "containing block - CSS Display Module Level 4",
  "desc": "A rectangle that forms the basis of sizing and positioning for the boxes associated with it. Notably, a containing block is not a box (it is a rectangle), however it is often derived from the dimensions of a box. Each box is given a position with respect to its containing block, but it is not confined by this containing block; it can overflow. The phrase “a box’s containing block” means “the containing block in which the box lives,” not the one it generates.",
  "link": "https://drafts.csswg.org/css-display-4/#containing-block/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Great, I totally understand…

You likely have run into containing blocks before. When you are positioning something with absolute positioning, it is positioned relative to its containing block.

<CodePen
  user="jamessw"
  slug-hash="NPKyRPm"
  title="Absolute containing box"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you use percentages to define widths and heights, these are calculated relative to the element’s containing block.

To figure out an element’s containing block, find the ancestor element that the element’s position and size are relative to. This is dependent on the element’s `position` value, so for example, if the element is fixed position, the containing block can be the viewport, or if the element is relative position, the containing block could be generated by an ancestor `<li>` element.

I’ve found MDN’s guide on [<VPIcon icon="fa-brands fa-firefox"/>Identifying the containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block) a helpful resource to unravel the containing block.

---

## Ways to make this easier

Troubleshooting why an anchor is not found is not fun or easy. Anchor Positioning is in its early days, but as adoption grows, I hope we can find ways to make this easier.

An important part will be to improve dev tooling when an anchor is not found. Perhaps next to a `--anchor is not found` message, there could be a crosshair selector to select the DOM element you thought would be the anchor. Then the Dev Tools could provide a specific message of why that particular combination would not work.

Another useful improvement would be a method to identify an element’s containing block. Perhaps there could be a new `:containing-block` pseudo-class that selects the element that creates the containing block, or a `HTMLElement.containingBlock` attribute. Because this is primarily useful while developing, it may be better to instead add a way of finding this in Dev Tools, instead of through browser APIs.

I think we also need to find better mental models to understand render order and containing blocks. Is there a way we could move this from a set of guidelines and a checklist of gotchas to avoid, to a place where these rules click and make sense to developers?

Interested in learning more about anchor positioning? Sign up for our free weekly [<VPIcon icon="iconfont icon-oddbird"/>CSS anchor positioning email course](https://oddbird.net/courses/anchor-positioning).

::: info Sponsor us

If you found this article helpful, please [<VPIcon icon="fas fa-globe"/>sponsor our work](https://opencollective.com/oddbird-open-source)! Deep dives like this take time and energy, and we want to keep them coming!

You can also [<VPIcon icon="iconfont icon-oddbird"/>hire us](https://oddbird.net/contact/) to develop the [<VPIcon icon="fas fa-globe"/>Anchor Positioning polyfill](https://anchor-positioning.oddbird.net/) or another OSS language/tool you rely on. Our client work also helps fund our educational work like this article, so get in touch with us if you have any web development needs.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Here's Why Your Anchor Positioning Isn't Working",
  "desc": "How to find an anchor element",
  "link": "https://chanhi2000.github.io/bookshelf/oddbird.net/anchor-position-validity.html",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```
