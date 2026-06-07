---
lang: en-US
title: "Managing Anchor Associations With Data Attributes and Advanced attr()"
description: "Article(s) > Managing Anchor Associations With Data Attributes and Advanced attr()"
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
      content: "Article(s) > Managing Anchor Associations With Data Attributes and Advanced attr()"
    - property: og:description
      content: "Managing Anchor Associations With Data Attributes and Advanced attr()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/managing-anchor-associations-with-data-attributes-and-advanced-attr.html
prev: /programming/css/articles/README.md
date: 2026-05-27
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://master.dev/blog/author/danielschwarz/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9712
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
  name="Managing Anchor Associations With Data Attributes and Advanced attr()"
  desc="There is no `anchor` attribute in HTML, it was decided CSS `anchor-name` / `position-anchor` was the way to go. But modern CSS functions can get us there anyway."
  url="https://master.dev/blog/managing-anchor-associations-with-data-attributes-and-advanced-attr/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9712"/>

When Chrome Canary implemented the `anchor` attribute, which enabled us to establish anchor relationships using HTML instead of CSS, I thought that it was an awesome idea. However, it seems that it won’t be standardized, and that Chrome has removed it along with Firefox, which, it appears, was working on it. It sounds like [the reason is that invokers are implicitly anchored already (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/pull/9144#issuecomment-3893938838), *but*, what about other elements?

In this article, I’ll show you an alternative method that leverages the new, more advanced syntax for the `attr()` CSS function.

*But first…*

---

## How the `anchor` attribute *would’ve* worked

Instead of anchoring an element with `position-anchor` to another element with `anchor-name` and both of them having the same value, we’d anchor an element with the `anchor` attribute to another element with the `id` attribute (and also the same value).

Like this:

```html
<!-- Anchor this... (not real, anymore) -->
<div anchor="anchorA"></div>

<!-- ...to this -->
<div id="anchorA"></div>
```

Instead of this:

```css
/* Anchor this... (now real) */
#boatA {
  position-anchor: --anchorA;
}

/* ...to this */
#anchorA {
  anchor-name: --anchorA;
}
```

It wouldn’t have been a better solution (more like an alternative for those that wanted it), but semantic HTML has always been about how elements relate to other elements, so the `anchor` attribute made a lot of sense to me. Think: `popovertarget` and `id` (for popovers), `commandfor` and `id` (for the new invoker commands), `interestfor` and `id` (for the future interest invokers), or even the classic `for` and `id` (for labels). Without the `anchor` attribute, anchoring a bunch of boats to a bunch of anchors looks a bit verbose, like this:

```css
#boatA {
  position-anchor: --anchorA;
}

#anchorA {
  anchor-name: --anchorA;
}

#boatB {
  position-anchor: --anchorB;
}

#anchorB {
  anchor-name: --anchorB;
}

#boatC {
  position-anchor: --anchorC;
}

#anchorC {
  anchor-name: --anchorC;
}
```

To be clear, I mean that every boat looks the same and every anchor looks the same, but each boat needs to be anchored to a specific anchor (think: some kind of reusable, decorative motif that can be anchored to anything). I know, I know, anchors can be [**scoped using `anchor-scope`**](/master.dev/anchored-menus-and-a-lesson-in-scoping.md), but that’d only work in certain circumstances.

The `anchor` attribute wouldn’t have been a magic bullet, because we still would’ve needed to anchor each `anchor` to its corresponding `id`, but it would’ve been shorter and cleaner. My advanced `attr()` idea isn’t as elegant as the `anchor` attribute would’ve been, but that ship has sailed (*ba dum tish!*), so let’s move on.

---

## Setting up anchors using advanced `attr()`

My advanced `attr()` idea combines both concepts. I would’ve moaned about the `anchor` attribute regardless, but knowing how it works *is* important.

First, instead of using the `anchor` and `id` attributes, use data attributes. In addition, make sure that the matching values are formatted as dashed idents (e.g., `--anchorA`), since that’s what `position-anchor` and `anchor-name` accepts.

```html
<div data-boat="--anchorA">Boat A</div>
<div data-anchor="--anchorA">Anchor A</div>

<div data-boat="--anchorB">Boat B</div>
<div data-anchor="--anchorB">Anchor B</div>

<div data-boat="--anchorC">Boat C</div>
<div data-anchor="--anchorC">Anchor C</div>
```

That’s right, we’ll still be using `position-anchor` and `anchor-name`, but only once, eliminating any verbosity. In the CSS below, the `position` property is basically the prerequisite for `position-anchor`, whereas the `inset` declaration defines where the boats are positioned relative to their anchor. Anchor positioning stuff, you know?

Now for the magic.

Instead of choosing a specific value for `position-anchor`, we use the `attr()` function to copy over the value from the `data-boat` attribute. The `position-anchor` syntax demands a dashed ident, which is cool because that’s what we’ve used (`--anchorA`, `--anchorB`, `--anchorC`, and so on). Now every element with the `data-boat` attribute has `position-anchor` set to a unique value, even though we’ve only written one CSS rule.

We’ve had the CSS delegate the logic to the HTML.

However, by default, `attr()` values are `<string>`s, so the declaration resolves to something like this: `position-anchor: "--anchorA"`. That’s why we use the `type()` function to specify the value’s data type, like this: `position-anchor: attr(data-boat type(<custom-ident>))` (`<custom-ident>` is the appropriate data type for dashed idents). The reason for this is that the `attr()` function can now be used with any CSS property, whereas it could only be used with the `content` property before, which only accepted `<string>`s. And that, by the way, is one of the things that makes [**advanced `attr()`**](/una.im/advanced-attr.md) more advanced.

Advanced `attr()` is supported by Chrome, and Firefox 152 will ship it on June 16, 2026. Safari Technology Preview supports it too, but I don’t know when *stable* Safari will support it. My estimation is Safari 27 in September 2026, but it could drop at any moment to be honest, making it “Baseline: Newly Available.”

After that, we simply do the same thing with `anchor-name` (`anchor-name: attr(data-anchor type(<custom-ident>))`) so that we can link the boats to the anchors. Here’s the full CSS code:

```css
[data-boat] {
  position: fixed;
  inset: anchor(top) auto auto anchor(right);
  position-anchor: attr(data-boat type(<custom-ident>));
}

[data-anchor] {
  anchor-name: attr(data-anchor type(<custom-ident>));
}
```

<CodePen
  user="anon"
  slug-hash="yyVYGyr"
  title="HTML anchor associations using attr()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Using advanced `attr()` for other types of associations

We can totally use advanced `attr()` to manage other types of associations, but I found it most useful for anchor associations (as above) and maybe animation timelines, like this:

```html
<div data-scroller="--animationA">Scroller A</div>
<div data-animation="--animationA">Animation A</div>

<div data-scroller="--animationB">Scroller B</div>
<div data-animation="--animationB">Animation B</div>

<div data-scroller="--animationC">Scroller C</div>
<div data-animation="--animationC">Animation C</div>
```

```css
/* Associate each scroller... */
[data-scroller] {
  scroll-timeline-name: attr(data-scroller type(<custom-ident>));
}

/* ...with its linked animation timeline */
[data-animation] {
  animation-timeline: attr(data-animation type(<custom-ident>));
}
```

But as more CSS features leverage dashed idents (and custom idents overall), this advanced `attr()` trick could turn out to be useful in more ways later on.

---

## `ident()` could make the code cleaner, too

I came across the [<VPIcon icon="iconfont icon-w3c"/>`ident()` CSS function](https://drafts.csswg.org/css-values-5/#ident) in CSS Values and Units Module Level 5. It’s not supported by any web browser yet, but it sounds like it would make working with custom idents even easier:

```html
<!-- Use a simple string value -->
<div data-something="something"></div>
```

```css
[data-something] {
  /* Convert the string to a custom ident */
  property: ident(attr(data-something));

  /* Convert the string to a dashed ident */
  property: ident("--" attr(data-something));
}
```

I think that looks cleaner?

Here’s what our anchor association code would look like:

```html
<div data-boat="anchorA">Boat A</div>
<div data-anchor="anchorA">Anchor A</div>

<div data-boat="anchorB">Boat B</div>
<div data-anchor="anchorB">Anchor B</div>

<div data-boat="anchorC">Boat C</div>
<div data-anchor="anchorC">Anchor C</div>
```

```css
[data-boat] {
  position: fixed;
  inset: anchor(top) auto auto anchor(right);
  position-anchor: ident("--" attr(data-boat));
}

[data-anchor] {
  anchor-name: ident("--" attr(data-anchor));
}
```

::: info Further reading

```component VPCard
{
  "title": "New capabilities for attr()",
  "desc": "Advanced attr() is landing in Chrome 133, and I'm really excited for this feature! Here's a bit about it and how you can use it.",
  "link": "/una.im/advanced-attr.md",
  "logo": "https://una.im/favicon.svg",
  "background": "rgba(156,90,242,0.2)"
}
```

```component VPCard
{
  "title": "Dashed Idents for Everything",
  "desc": "What do you think when you see --foo in CSS? Is this a custom CSS property? Maybe, but not necessary. It is a “dashed ident”, which is a variation of a “custom ident” (an author-defined identifier). In this post, I would explain why I’ve decided to always use one, but not the other, and would recommend you to do so as well.",
  "link": "https://blog.kizu.dev/dashed-idents-for-everything/",
  "logo": "https://blog.kizu.dev/favicon.svg",
  "background": "rgba(68,189,254,0.2)"
}
```

<SiteInfo
  name="anchor HTML global attribute - HTML | MDN"
  desc="The anchor global attribute is used to associate a positioned element with an anchor element. The attribute's value is the id value of the element you want to anchor the positioned element to. The element can then be positioned using CSS anchor positioning."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/anchor/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

```component VPCard
{
  "title": "CSS Values and Units Module Level 5",
  "desc": "The ident() function represents an <ident>, and can be used to manually construct <custom-ident> values from several parts.",
  "link": "https://drafts.csswg.org/css-values-5/#ident",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Managing Anchor Associations With Data Attributes and Advanced attr()",
  "desc": "There is no `anchor` attribute in HTML, it was decided CSS `anchor-name` / `position-anchor` was the way to go. But modern CSS functions can get us there anyway.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/managing-anchor-associations-with-data-attributes-and-advanced-attr.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
