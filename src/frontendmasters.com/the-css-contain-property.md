---
lang: en-US
title: "The CSS contain property"
description: "Article(s) > The CSS contain property"
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
      content: "Article(s) > The CSS contain property"
    - property: og:description
      content: "The CSS contain property"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-css-contain-property.html
prev: /programming/css/articles/README.md
date: 2024-08-19
isOriginal: false
author: Preethi Sam
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3519
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
  name="The CSS contain property"
  desc="CSS containment is used for optimization and opening styling possibilities by isolating elements from the rest of the page. Different contain values (size, paint, layout, etc.) provide various benefits and tradeoffs."
  url="https://frontendmasters.com/blog/the-css-contain-property"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3519"/>

The *purpose* of CSS’ `contain` property (“CSS containment”) is twofold:

1. Optimization
2. Styling possibilities

When we apply `contain` to an element we’re isolating it (and it’s descendents) from the rest of the page, and this isolation what opens those possibilities. There are different types of containment which all do different things, and we’ll be getting into each of them.

```css
.element {
  contain: size;
  contain: paint;
  contain: layout;
  
  /* they can also be combined, e.g. */
  contain: size layout;
}
```

First, **optimization**. When something *changes* an element after the page has rendered, the browser rethinks the entire page in case that element affects the rest of the page (visible or not). But with a contained element, we let the browser know that the change we made is restricted to *only* the contained element and its children, and the browser needn’t bother with the rest of the page because there won’t be any impact on that.

Second, **relative styling**. Meaning positioning, visibility, stacking, sizing, etc, and by “relative” I mean styling an element in comparison to that of the viewport or the parent element — *relative positioning* and *relative sizing* are two good examples of this that we’ve had for a long time.

Since the introduction of CSS Containment, a lot more relative styling can be done in the scope the contained element and its descendants. You’ll see examples as we proceed.

::: note

In this article, CSS Containment refers to the CSS `contain` property. [<FontIcon icon="iconfont icon-w3c"/>Its namesake W3C Standard](https://w3.org/TR/css-contain-3/), however, covers a few more specifications, like container units.

:::

---

## Size Containment

Although “size containment” sounds highly useful, in practice you might not use this much.

When an element’s size is *contained*, **the browser does not allow anything that happens inside the contained element (to the content or the descendant elements) to affect its size**. In other words, you have a way to achieve truly fixed sizing.

But fixed sizing is not in trend. These days we have a lot of options for for dynamic sizing. For instance, CSS units relative to the root font size (`rem`, `rex`, etc.), units responsive to the viewport size (`vw`, `dvh`, etc.), units relative to the current font size (`em`, `lh`, etc.), you name it. Which means we usually do a pretty good job of sizing the different elements on a page for different screen sizes and content.

What if, for example, a user is interacting with a page and caused new dynamic information to appear on the page? This new information takes up space. Now have options and can make a choice.

- Is it better to allow the element, and potentially the entire page, to reflow and change?
- Or is it better to contain the element so that the changes *prevent* the reflow?

If it feels like the latter, size containment can be the solution (or part of the solution) for you.

::: note

Be sure to set the desired dimensions, width and height (or logical properties), or aspect ratios when using size containment, because the browser initially renders a contained element as if it’s empty, and without the right dimensions set, elements might end up having a zero dimension.

:::

```css
.box {
  width: 100px;
  min-height: 100px;
  img {
    width: 200%;
    ...
  }
  &:nth-of-type(2) { /* the second box */
    contain: size; 
    ...
  }
  ...
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="GRbEQva"
  title="contain: size"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Setting an element’s dimensions yourself may feel like size containment already, and typically that is all you need, which is why I said you may not need this much. But if you’re entirely sure you don’t want this element to change size or affect any other elements, protecting against unforseen changes, size containment may be a good idea.

---

## Paint Containment

If you’re familiar with the `overflow` property, that’s a good place to start understanding paint containment. However, they are not quite the same.

Outside a paint-contained element’s box, **the browser neither displays any content, nor it makes the concealed content scrollable to by any means at all**. In this aspect, paint containment’s behavior is similar to `overflow: clip` rather than `overflow: hidden` (which allows scrolling to the concealed content or elements through methods like the JavaScript `scroll` event).

So if you want to **trim the overflowed content** of an element while also ensuring that content is not at all scrollable to, a paint-containment can be used. A browser might also **save computational effort by not rendering an off screen paint-contained element**.

I also have another good reason for why you might need paint containment.

As I mentioned at the beginning of the article, containment is the isolation of an element in all factors. That’s worth repeating here. Paint containment is not just about clipping what’s fallen out of a container box, but also **isolating that box itself from the rest of the rendered page by creating new stacking and formatting contexts** for that element. Paint containment also generates a separate absolute and fixed positioning container box (I’ll explain this in Layout Containment).

Below, there are two examples: the first one is a sample of paint containment (`contain: paint`), and the second is a comparison between the behavior of `overflow: clip` `and` `contain: paint`. You’ll notice the paint containment’s isolating effect clearly in the second example, where the contained element is unaffected by the CSS blending applied to its sibling element.

```css
.box {
  width: 100px;
  img {
    width: 200%;
    ...
  }
  &:nth-of-type(2) { /* second box */
    contain: paint; 
    ...
  }
  ...
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="WNqOMdr"
  title="contain: paint"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
section {
  div {
  width: 100px; 
  aspect-ratio: 1/1;
  }
  .box {
    background: red; 
  }   
  &:nth-of-type(2) .box { 
    overflow: clip;
  }
  &:nth-of-type(3) .box { 
    contain: paint;
  }
  .box-sibling {
    background: blue; 
    mix-blend-mode: hue;
    ...
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="eYwRVME"
  title="overflow: clip and contain: paint"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Layout Containment

Layout is essentially the *flow* of elements and content. Over the years, more than sizing, more than painting, the most work we have delegated to the browsers is in the scope of layout. There are CSS properties, like `float`, `vertical-align`, and such, for us to communicate to the browsers where we prefer an element to be a little re-positioned to from its natural place on the page.

And then there are full scale layouts, like Grid Layout, Page Layout (used for the print medium), Column Layout, etc., to tell the browser to place everything on the page in a particular fashion we fancy.

The modern browsers do all that with incredible speed and efficiency, however, we can still make it easier on them by adding layout containments to elements, so that **any layout changes in the contained elements and its descendants can be handled independently**, and **if they are off screen, laying out their contents can be put off until needed**. If you are considering **optimizing your pages**, layout containment is a good candidate to consider.

And that’s not all. More often than not, position of all the boxes in a page are based on each other — One box moves, the other follows suit. Which is not we always want to happen. With the help of layout containment, **you can have multiple layouts in a page with the assurance that their contents are not going to flow into each other**, by forming layout islands that are unaffected by whatever’s happening in the nearby islands.

Just as in the case of paint containment, layout containment also creates a separate formatting, and stacking, contexts for the contained elements. They also generate their own **absolute** and **fixed positioning containing boxes**, meaning they become the reference box to position any absolute — or fixed — positioned child elements.

```css
.box {
  width: 100px;
  aspect-ratio: 1/1;
  .fixed-element {
    background: lime;
    position: fixed;
    left: 0px;
    bottom: 0px;
    ...
  }
  &:nth-of-type(2) { /* Box B */
    contain: layout; 
    ...
  }
  ...
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="VwJWQxg"
  title="contain: layout"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Inline-Size and Style Containments

Although not yet a W3C recommendation, both `contain: inline-size` and `contain: style` are valid values, that are well supported in browsers, and are included in the W3C Working Drafts of CSS Containment Module Level 2 and 3. I didn’t mention them at the top only because they haven’t yet reached that recommendation status.

The functions of a Style Containment is also a bit tentative at the moment, and might grow before it hits the W3C recommendation status.

I’ll briefly explain them both, however. **Inline Size Containment** is same as the Size Containment, but **for inline sizes only** (the horizontal/width direction in any left-to-right or right-to-left horizontal writing mode). This gives you a size restraint for elements along their inline axes. This is particularly common for container queries. I haven’t mentioned container queries here, but these things are conceptually linked. When you set a `container-type: inline-size` as is required for typical container queries, you are effectively also setting `contain: inline-size` implicitly.

When an element has **Style Containment**, the tallying of CSS Counters and the `quote` values of the `content` property inside the contained element are unaffected by any counter or quote values mentioned outside. Essentially, **the counters and quotes are scoped within a style-contained element**. Pretty niche!

---

## The `strict` and `content` Values

As I mentioned at the top, you can combine the different `contain` values (by space-separating them). There are also keywords for pre-combined values.

When `contain` has the value `strict`, **all the containment types are applied** to an element. Probably not something you’d use unless you are working with an element or module on your page that’s prone to a lot of changes during the page’s existence on screen, like the display of live sports data or the like.

Then there’s the `content` value, which is a **combination** of `paint`, `layout`**,** and `style`. You are more likely to want to use this if your goal is to simply ensure nothing spills outside an element’s boundary at all cost, or to keep the browser from rendering or laying out the contained elements and its children when they are off screen or hidden, for the sake of optimization.

Those are my recommendations for the CSS `contain` property. It’s a property that’s just as worthwhile to learn about for the sake of programming techniques, as it is for the sake of optimizing web pages.

---

## References

<SiteInfo
  name="contain - CSS: Cascading Style Sheets | MDN"
  desc="The contain CSS property indicates that an element and its contents are, as much as possible, independent from the rest of the document tree. Containment enables isolating a subsection of the DOM, providing performance benefits by limiting calculations of layout, style, paint, size, or any combination to a DOM subtree rather than the entire page. Containment can also be used to scope CSS counters and quotes."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/contain/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```component VPCard
{
  "title": "CSS Containment Module Level 1",
  "desc": "This CSS module describes the contain property, which indicates that the element’s subtree is independent of the rest of the page. This enables heavy optimizations by user agents when used well.",
  "link": "https://w3.org/TR/css-contain-1//",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

```component VPCard
{
  "title": "CSS property: contain | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "Can I use provides up-to-date browser support tables for support of front-end web technologies on desktop and mobile web browsers.",
  "link": "https://caniuse.com/mdn-css_properties_contain/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,25,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The CSS contain property",
  "desc": "CSS containment is used for optimization and opening styling possibilities by isolating elements from the rest of the page. Different contain values (size, paint, layout, etc.) provide various benefits and tradeoffs.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-css-contain-property.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
