---
lang: en-US
title: "A decent custom checkbox pattern for until ::checkmark is ready"
description: "Article(s) > A decent custom checkbox pattern for until ::checkmark is ready"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A decent custom checkbox pattern for until ::checkmark is ready"
    - property: og:description
      content: "A decent custom checkbox pattern for until ::checkmark is ready"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-decent-custom-checkbox-for-until-checkmark-is-ready.html
prev: /programming/css/articles/README.md
date: 2026-09-17
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=a-decent-custom-checkbox-for-until-checkmark-is-ready/
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
  name="A decent custom checkbox pattern for until ::checkmark is ready"
  desc="We're a while off from being able to leverage ::checkmark with checkbox styling, but here's a decent way to get the styling control you want, while preserving the useful parts of the native input element."
  url="https://piccalil.li/blog/a-decent-custom-checkbox-for-until-checkmark-is-ready"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=a-decent-custom-checkbox-for-until-checkmark-is-ready/"/>

Now that we can better customise `<select>` elements, it’s only natural to side-eye other form `<input>` types that have caused us visual headaches.

Sure, we should be applying the *lightest* of touches to form elements, especially, but even with a bit of visual-massaging, checkboxes are limited, aside from a bit of `accent-color`.

<CodePen
  user="piccalilli"
  slug-hash="pvebLwo/01786b2d24fcc35066571a56df54c09f"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

There is a brighter future incoming, if you’re to read the [<VPIcon icon="iconfont icon-w3c"/>spec](https://w3.org/TR/css-forms-1/#checkmark):

::: "4.3. Styling Checkmarks: the ::checkmark pseudo-element" *From W3C* (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> The ::checkmark pseudo-element represents an indicator of whether the item is checked, and is present on checkboxes, radios, and option elements.

```component VPCard
{
  "title": "4.3. Styling Checkmarks: the ::checkmark pseudo-element | CSS Form Control Styling Level 1",
  "desc": "The ::checkmark pseudo-element represents an indicator of whether the item is checked, and is present on checkboxes, radios, and option elements. It is only generated whe...",
  "link": "https://w3.org/TR/css-forms-1/#checkmark",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

Match that with [<VPIcon icon="fa-brands fa-firefox"/>`appearance: base`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/appearance#formal_syntax), which is also incoming, and we’re looking at this sort of CSS:

```css
input[type="checkbox"] {
  appearance: base;
}

input[type="checkbox"]::checkmark {
  content: url("data:image/svg+xml,%3Csvg aria-hidden='true' focusable='false' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m5 12l5 5L20 7' /%3E %3C/svg%3E");
}
```

We’re miles off from that capability yet — it doesn’t look like any browser is working on it — so allow me to show you how to build a nice custom checkbox pattern for until we have the browser capabilities we’re after.

---

## HTML first, always

It’s always right to start with some good quality markup:

```xml
<label for="custom-checkbox" class="checkbox">
  <span class="checkbox__box">
    <input type="checkbox" name="custom-checkbox" id="custom-checkbox" value="Some value that this control toggles">
    <svg aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 12l5 5L20 7" />
    </svg>
  </span>
  <span>A long label for this checkbox to make sure we get a nice wrapping behaviour</span>
</label>
```

The markup is pretty straightforward here. Inside the parent `<label>` — which is linked to the input both by being a parent *and* the `for`/`id` attributes — we have a container for the input and icon, along with a text label.

The reason I’m using `<span>` elements here is because aside from the input/SVG only [<VPIcon icon="fa-brands fa-firefox"/>phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#phrasing_content) is permitted. I don’t think a `<div>` would do any harm here, but it’s best to do things right.

On the SVG checkmark element, there’s an `aria-hidden="true"` attribute. This stops the SVG — a visual element — getting in the way for assistive technology. I’ve also added `focusable="false"`. This is actually a relic from the Internet Explorer ~days~ hell, but I keep it on visual only icons, just in case.

Right, we’re in good shape. Let’s make it look good.

---

## Some CSS

The first thing to do is layout:

```css
.checkbox {
  display: flex;
  align-items: baseline;
  gap: 1em;
  text-wrap: balance;
}
```

Flex is more than capable here. I like to align on the baseline in this sort of context because as the viewport gets small and the text wraps, we don’t want a vertically centered layout. It looks rubbish!

Speaking of balance, I’m using `text-wrap: balance` here for the same compressed viewport context and dealing with wrapping text. Keeping a consistent edge (rag) is extra important for small microcopy, such as labels.

Let’s tackle the input itself.

```css
.checkbox input {
  margin: 0;
  width: 100%;
  height: 100%;
  appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.2em; /* This is so the focus ring has a matching radius to the visual box */
}
```

We’ve got to be *really* careful here because we don’t want to mess up the focusability of our element. Combining `appearance: none` and absolute positioning, our element is still there, but its no longer in the way, *visually*. It can still receive focus and will present a focus ring, which is exactly what we need!

Let’s tackle the “box” part, which is also this `<input>`’s parent.

```css
.checkbox__box {
  position: relative;
  background: transparent;
  color: currentcolor;
  border: 1px solid;
  width: 1.4em;
  height: 1.4em;
  transform: translateY(0.75ex);
  flex-shrink: 0;
  border-radius: 0.2em;
}
```

A lot of this is self explanatory but I’ll pick up the key parts:

1. I’m using `position: relative` so the `<input>` stays inside this box
2. The `transform` rule is a *bit* of a magic-number but because it’s a relative [`ex` unit](https://every-layout.dev/rudiments/units/), it scales quite nicely, regardless of parent font size. Most importantly the `ex` enhances that `baseline` alignment *and* fixes the initial alignment of the `<input>`

::: note

I really like how [**Ahmad Shadeed approaches this**](/ishadeed.com/aligning-list-icons.md) too. That’s the beauty of CSS: there’s plenty of ways to do things well!

:::

Let’s deal with the SVG checkmark next:

```css
.checkbox__box svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  display: none;
  width: 1em;
  height: 1em;
}
```

::: note

I guess I could use [**logical properties**](/piccalil.li/getting-started-with-css-custom-properties.md) here, but we’re positioning an icon in a box, so the “old” way works perfectly well.

:::

The idea here is to visually hide the checkmark when the checkbox isn’t checked and show it when it is. We’ll deal with that CSS next.

What about intermediate states?

---

This is a situation that very few people will likely find themselves in. What I’d recommend is having a couple of SVG elements that get toggled in that context.

```css
.checkbox__box:has(input:checked) {
  background: white;
}

.checkbox__box input:checked + svg {
  display: block;
}
```

We’re in checked state territory here. I’m setting a white background using `:has()` which is *yet another* [**useful use-case**](/piccalil.li/some-little-ways-im-using-css-has-in-the-real-world.md) for this endlessly handy addition to CSS.

The following block of CSS uses a traditional next sibling selector to show the SVG element when the input is checked. You could use `:has()` here too, if you’re feeling fancy.

With all of that CSS in place, we’re looking good.

<CodePen
  link="https://codepen.io/piccalilli/pen/MYpeyGd/f1c611739fe7d2308ca6102877c53711"
  title="Custom checkbox"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## This approach could also work for radio buttons

There’s nothing stopping you using this approach for radio buttons. Check out this demo where I’m using a circle icon instead of a checkmark. It works well!

<CodePen
  link="https://codepen.io/piccalilli/pen/XJMKKep/edef02c55d0d972b66682ee3443858bb"
  title="Custom radios"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The em units usage allows this whole component to scale

The eagle eyed amongst us will have noticed that aside from the `transform` rules, I’ve consistently use `em` units. The reason for this is so our checkbox can scale with no other intervention.

<CodePen
  link="https://codepen.io/piccalilli/pen/QwpEmZw/df33cad21fa4c40a91912bb559886c1b"
  title="Custom checkbox - massive edition"
  :default-tab="['css','result']"
  :theme="dark"/>

The only change here, versus the first demo is a `font-size` declaration on the `.checkbox` component.

A handy pattern, right?

::: note

A big thanks to [<VPIcon icon="fas fa-globe"/>Jake Archibald](https://jakearchibald.com/) and [<VPIcon icon="fas fa-globe"/>Heydon Pickering](https://heydonworks.com/) for checking my homework.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A decent custom checkbox pattern for until ::checkmark is ready",
  "desc": "We're a while off from being able to leverage ::checkmark with checkbox styling, but here's a decent way to get the styling control you want, while preserving the useful parts of the native input element.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-decent-custom-checkbox-for-until-checkmark-is-ready.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
