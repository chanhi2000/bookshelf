---
lang: en-US
title: "How to Use attr() in CSS for Columns, Colors, and Font-Size"
description: "Article(s) > How to Use attr() in CSS for Columns, Colors, and Font-Size"
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
      content: "Article(s) > How to Use attr() in CSS for Columns, Colors, and Font-Size"
    - property: og:description
      content: "How to Use attr() in CSS for Columns, Colors, and Font-Size"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-use-attr-in-css-for-columns-colors-and-font-size.html
prev: /programming/css/articles/README.md
date: 2025-02-25
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5224
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
  name="How to Use attr() in CSS for Columns, Colors, and Font-Size"
  desc="You can pluck off values from HTML attributes that actually have types now, so if you put data-font-size="
  url="https://frontendmasters.com/blog/how-to-use-attr-in-css-for-columns-colors-and-font-size/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5224"/>

I’ve personally put “advanced `attr()` usage” on my CSS wishlists for years and years. All the sudden we’re seeing support for it start to drop! Props to the Chrome gang and others for shipping and highlighting this wonderfulness. I’m avoiding being entirely comprehensive about this feature in this post, so it’s worth perusing other coverage:

- Una Kravets: [<VPIcon icon="fas fa-globe"/>New capabilities for `attr()`](https://una.im/advanced-attr/#attr-irl-product-card-demo)
- Bramus Van Damme: [<VPIcon icon="fa-brands fa-chrome"/>CSS`attr()` gets an upgrade](https://developer.chrome.com/blog/advanced-attr)
- [<VPIcon icon="fa-brands fa-firefox"/>MDN `attr()` docs](https://developer.mozilla.org/en-US/docs/Web/CSS/attr) are updated.
- Amit Merchant: [<VPIcon icon="fas fa-globe"/>The `attr()` function in CSS now supports types](https://amitmerchant.com/attr-function-types-css/)

I thought I would chime in with my own examples so help smash it into my brain and to create an easy reference for soon to be *classic* use cases.

---

## The Deal

The value of `attr()`used to be *always* a string, which made the value pretty much *only* useful for the `content` property and certain niche text effects.

```css
div::after {
  content: attr(data-title); 
}
```

Even if you put something like `data-number="10"`, you could never get a proper number 10 to use in CSS. The same with like `data-size="3rem"`, no chance of actually getting `3rem` to actually *use.*

Now you can! You just have to *declare* what type it will be.

```css
div {
  font-size: attr(data-font-size type(<length>));
  grid-column-start: attr(data-column-start type(<integer>));

  /* example with a "fallback" */
  color: attr(data-color type(<color>), black);
}
```

::: note

This usage is Chrome-only as I write/publish here, but that [<VPIcon icon="fas fa-globe"/>will change over time](https://caniuse.com/css3-attr).

:::

---

## Types

```html
<string>  
<angle>  
<color>  
<custom-ident>  
<integer>  
<length>  
<length-percentage>  
<number>  
<percentage>  
<resolution>  
<time>  
<transform-function>
```

---

## Using `attr()` for Grid Control

Here’s an example where:

- `data-row` explicitly sets what row an element is on
- `data-columns` explicitly sets how many columns an element should span
- `data-column-start` and `data-column-end` set on where a column should start or end

That’s just one possible implementation where you essentially define your own API for what you want to allow and how you want to apply it.

<CodePen
  user="chriscoyier"
  slug-hash="LEYRzMz"
  title="attr() with columns"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Using `attr()` for Colors

Just naming a color you want to use is nice!

<CodePen
  user="chriscoyier"
  slug-hash="VYwKyGe"
  title="Using attr() for Colors"
  :default-tab="['css','result']"
  :theme="dark"/>

This example highlights a nicety of having the additional “layer” of CSS to handle things, as opposed to very direct inline styles. Here I’m not just setting *one* color, but I’m using the color given for the actual `color`, then taking that same color and `color-mix()`ing in some black to use as the background color.

To highlight the control you have even more, we could use `min()` and `max()` values within the relative color syntax to ensure, for example, the color has a minimum level of brightness that we might think is best for readability.

<CodePen
  user="chriscoyier"
  slug-hash="MYWjGzz"
  title="Using attr() and limiting colors"
  :default-tab="['css','result']"
  :theme="dark"/>

Above the dot before each line is the actual color being set as an attribute, but then when we use it to color a word in the line, we’re converting the color to `oklch()` and ensure the “l” part (lightness) has a minimum value of `0.9` (with `max(l, 0.9)`) to ensure that.

---

## Using `attr()` for Font Sizes

Setting a `data-font-size` is easy peasy. But here I’ll jump forward to the “extra control” part right away. Perhaps your design system has strong rules about font sizing and you only allow increments of 5px. Using CSS `round()` we could make that happen with this approach.

<CodePen
  user="chriscoyier"
  slug-hash="zxYKaxO"
  title="Using attr() for font-size"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Others?

- How about `data-gap` as a utility to just change the gap, but be able to round it to particular values in a design system?
- How about [<VPIcon icon="fas fa-globe"/>automatic `view-transition-name`s](https://bram.us/2025/01/20/css-attr-gets-an-upgrade/) like Bramus did up.
- One-off borders with a `data-border` seems like nice control to offer. Or even individual borders. Or individual parts of individual borders like `data-border-bottom-width`.
- It occurs to me that setting the value of a custom property to the attribute value is a way of passing the value lower in the DOM tree, which doesn’t seem possible otherwise, like…

```scss
[data-button-color] {
  --button-color: attr(data-button-color type(<color>));

  button {
    color: var(--button-color);
  }
}
```

With that it seems like you could do stuff like `data-size-of-close-button` on a `<dialog>` and then access that informaton wherever you implement the close button within there.

---

## Why always use `data-*`?

You don’t have to. I just like the idea of not polluting attribute names. If the web platform one day really really wanted to support a `gap` attribute for whatever reason, but found through analyzing websites that too many websites rawdogged it already because of this feature, that would be a bummer to me. The `data-*` namespace was created just for this reason, so we might as well use it. Plus you get [<VPIcon icon="fa-brands fa-firefox"/>the JavaScript `dataset` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) to use for free if you do.

ok bye and please shower me with more ideas for this.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use attr() in CSS for Columns, Colors, and Font-Size",
  "desc": "You can pluck off values from HTML attributes that actually have types now, so if you put data-font-size=",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/how-to-use-attr-in-css-for-columns-colors-and-font-size.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
