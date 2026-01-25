---
lang: en-US
title: "Overflow Issues In CSS"
description: "Article(s) > Overflow Issues In CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Overflow Issues In CSS"
    - property: og:description
      content: "Overflow Issues In CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-overflow-issues.html
prev: /programming/css/articles/README.md
date: 2021-04-14
isOriginal: false
author:
  - name: Ahmad Shadeed
    url : https://smashingmagazine.com/author/ahmad-shadeed/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/df403b29-1a96-4c11-a6ea-8175e2fe673f/css-overflow-issues.jpg
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
  name="Overflow Issues In CSS"
  desc="You may have come across horizontal scrollbar issues, especially on mobile, if you’re a front-end developer. Because there are many causes of scrollbar problems, there is no straightforward solution. Some issues can be fixed quickly, and some need a little debugging skill. In this article, Ahmad Shadeed will explore the causes of overflow issues and how to solve them. We will also explore how modern features in the developer tools (DevTools) can make the process of fixing and debugging easier."
  url="https://smashingmagazine.com/2021/04/css-overflow-issues/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/df403b29-1a96-4c11-a6ea-8175e2fe673f/css-overflow-issues.jpg"/>

You may have come across horizontal scrollbar issues, especially on mobile, if you’re a front-end developer. Because there are many causes of scrollbar problems, there is no straightforward solution. Some issues can be fixed quickly, and some need a little debugging skill. In this article, Ahmad Shadeed will explore the causes of overflow issues and how to solve them. We will also explore how modern features in the developer tools (DevTools) can make the process of fixing and debugging easier.

If you’re a front-end developer, you may have come across horizontal scrollbar issues, especially on mobile. Because there are many causes of scrollbar problems, there is no straightforward solution. Some issues can be fixed quickly, and some need a little debugging skill.

---

## What Is An Overflow Issue?

Before discussing overflow issues, we should ascertain what one is. An overflow issue occurs when a horizontal scrollbar unintentionally appears on a web page, allowing the user to scroll horizontally. It can be caused by different factors.

![Overflow with a fixed-width element that is wider than the viewport. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a4846411-468f-4afe-9f11-0b4a0b80bea6/overflow-intro.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a4846411-468f-4afe-9f11-0b4a0b80bea6/overflow-intro.jpg)

It could occur because of unexpectedly wide content or a fixed-width element that is wider than the viewport. We will explore all of the causes in this article.

---

## How To Spot Overflow

An important part of solving this issue is noticing it in the first place. If we know when and where it happens, we can home in on that part of a web page. There are different ways to detect overflow, from manually scrolling to the left or right or by using JavaScript.

Let’s explore the ways to detect overflow.

### Scrolling To The Left Or Right

The first way to discover an overflow issue is by scrolling the page horizontally. If you’re able to scroll, this is a warning that something is wrong with the page.

![Whenever you can scroll, there is an overflow in play. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68f6caf4-c973-4674-8949-4bf0545479c6/overflow-notice-1.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68f6caf4-c973-4674-8949-4bf0545479c6/overflow-notice-1.jpg)

### Using JavaScript To Find Elements Wider Than The Body

We can add a [**snippet to the browser**](/css-tricks.com/findingfixing-unintended-body-overflow.md) console to show any elements wider than the body. This is handy for pages with a lot of elements.

```js
var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
```

### CSS Outline To The Rescue

Applying CSS’ `outline` to all elements on the page gives us a hint about elements that go beyond the page’s `body`.

```css
* {
  outline: solid 1px red;
}
```

![A scrollbar appear when an element is outside the viewport. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d8e3b1f6-773a-401f-89a7-4a591e783c87/overflow-notice-outline.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d8e3b1f6-773a-401f-89a7-4a591e783c87/overflow-notice-outline.jpg)

Even better, Addy Osmani [has a script (<VPIcon icon="iconfont icon-github"/>`addyosmani`)](https://gist.github.com/addyosmani/fd3999ea7fce242756b1) that adds an outline to each element on the page with a random color.

```js
[].forEach.call($$("*"),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
```

### Overflow Label In Firefox

Firefox has a helpful feature that tells you which elements are causing overflow. Hopefully, other browsers will add this!

![An overflow badge displayed in the Firefox DevTools. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a7704c6c-0662-4c10-944d-10c0a16fe168/overflow-notice-firefox-label.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a7704c6c-0662-4c10-944d-10c0a16fe168/overflow-notice-firefox-label.jpg)

### Deleting Page Elements

Another common way is to open the browser’s DevTools and start deleting elements one by one. Once the issue disappears, then the section you’ve just deleted is probably the cause. I found this method useful in cases where you’ve identified the issue but don’t know why it’s happening.

Once you’ve found where the overflow is happening, then it will be easier to make a [**reduced test case**](/css-tricks.com/reduced-test-cases.md) for further debugging.

---

## Common Overflow Issues

---

## Fixed-Width Elements

One of the most common causes of overflow is fixed-width elements. Generally speaking, don’t fix the width of any element that should work at multiple viewport sizes.

```css
.element {
    /* Don’t do this */
    width: 400px;
}
```

![Mobile wireframe example showing fixed-width elements outside of the viewport. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/48a82f58-9002-4c4d-b3aa-e63580035895/common-fixed-width.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/48a82f58-9002-4c4d-b3aa-e63580035895/common-fixed-width.jpg)

### Using Flexbox Without Wrapping

As useful as Flexbox is, not allowing items to wrap to a new line when no space is available is risky.

```css
.parent {
  display: flex;
}
```

Here, flex items might cause horizontal overflow in case the space isn’t enough to fit them all in one line:

![Flex items causing horizontal overflow by appearing outside the viewport. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/72120f2f-1674-439d-bb1e-7b16cbd929c2/common-flexbox.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/72120f2f-1674-439d-bb1e-7b16cbd929c2/common-flexbox.jpg)

Make sure to use `flex-wrap: wrap` when the flex parent is supposed to work at different viewport sizes.

```css
.parent {
  display: flex;
  /* Do this */
  flex-wrap: wrap;
}
```

### CSS Grid

When you’re using CSS grid, designing responsively is important. Take the following grid:

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr 300px 1fr;
  grid-gap: 1rem;
}
```

The example above will work great unless the viewport is narrower than 300 pixels. If it is, then overflow will occur.

![Overflow showing while the grid item has a width of `300px`. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2e6ce014-0b09-4ad2-9bf0-0ebb2a06a008/common-grid.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2e6ce014-0b09-4ad2-9bf0-0ebb2a06a008/common-grid.jpg)

To avoid such an issue, use grid only when enough space is available. We can use a CSS media query like so:

```css
.wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

@media (min-width: 400px) {
  .wrapper {
    grid-template-columns: 1fr 300px 1fr;
  }
}
```

### Long Words

Another common reason for overflow is a long word that doesn’t fit in the viewport. This happens more on mobile because of the viewport’s width.

![An example of using long words that do not and cannot fit within the viewport’s width. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0bfe982a-87ba-4418-a781-e40275853a64/common-long-word.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0bfe982a-87ba-4418-a781-e40275853a64/common-long-word.)

To fix this, we need to use the `overflow-wrap` property.

```css
.article-content p {
  overflow-wrap: break-word;
}
```

I’ve written a detailed article on [**handling both short and long content**](/ishadeed.com/css-short-long-content.md) with CSS.

This fix is particularly useful with user-generated content. A perfect example of this is a comments thread. A user might paste a long URL in their comment, and this should be handled with the `overflow-wrap` property.

### Minimum Content Size In CSS Flexbox

Another interesting cause of overflow is the minimum content size in Flexbox. What does this mean?

![Another example of using words that are too long to fit in. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5e625ca3-f71e-4c0b-b22c-7a6c6d276bff/common-min-content-size-flex.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5e625ca3-f71e-4c0b-b22c-7a6c6d276bff/common-min-content-size-flex.png)

According to the [<VPIcon icon="iconfont icon-w3c"/>specification](https://w3.org/TR/css-flexbox-1/):

::: info (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> “By default, flex items won’t shrink below their minimum content size (the length of the longest word or fixed-size element). To change this, set the `min-width` or `min-height` property.”

```component VPCard
{
  "title": "CSS Flexible Box Layout Module Level 1",
  "desc": "The specification describes a CSS box model optimized for user interface design. In the flex layout model, the children of a flex container can be laid out in any direction, and can “flex” their sizes, either growing to fill unused space or shrinking to avoid overflowing the parent. Both horizontal and vertical alignment of the children can be easily manipulated. Nesting of these boxes (horizontal inside vertical, or vertical inside horizontal) can be used to build layouts in two dimensions.",
  "link": "https://w3.org/TR/css-flexbox-1/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

This means that a flex item with a long word won’t shrink below its minimum content size.

To fix this, we can either use an `overflow` value other than `visible`, or we can set `min-width: 0` on the flex item.

```css
.card__name {
  min-width: 0;
  overflow-wrap: break-word;
}
```

![A before and after comparison or breaking long words to fit in on the next line and stay within the viewport. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/40adc1f1-96b6-4147-b4fb-bebcbeb547a3/common-min-content-size-flex-2.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/40adc1f1-96b6-4147-b4fb-bebcbeb547a3/common-min-content-size-flex-2.png)

### Minimum Content Size In CSS Grid

As with Flexbox, we have the same concept of minimum content size with CSS Grid. However, the solution is a bit different. CSS-Tricks refers to it as “[**grid blowout**](/css-tricks.com/preventing-a-grid-blowout.md)”.

![An example of a grid blowout in which content does not fit into the given size or width. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1238c3e5-9c1a-44f2-8837-8db9df348d86/common-min-content-size-grid.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1238c3e5-9c1a-44f2-8837-8db9df348d86/common-min-content-size-grid.jpg)

Let’s explore the issue. Suppose we have a wrapper with an aside and a main section laid out with CSS grid.

```css
.wrapper {
  display: grid;
  grid-template-columns: 248px 1fr;
  grid-gap: 40px;
}
```

Also, we have a scrolling section in the main section, for which I’ve used flexbox.

```css
.section {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}
```

Notice that I didn’t add `flex-wrap`, because I want the flex items to be on the same line. This didn’t work, however, and it’s causing horizontal overflow.

To fix this, we need to use `minmax()` instead of `1fr`. This way, the main element’s minimum content size won’t be `auto`.

```css
.wrapper {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  grid-gap: 40px;
}
```

### Negative Margins

An element positioned off screen can cause overflow. Usually, that is because the element has a negative margin.

In the following example, we have an element with a negative margin, and the document’s language is English (i.e. left to right).

```css
.element {
  position: absolute;
  right: -100px;
}
```

![An element that is positioned off-screen shown on the right. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f6767fed-9691-4e42-b5c6-b825e79c98f9/element-off-screen.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f6767fed-9691-4e42-b5c6-b825e79c98f9/element-off-screen.jpg)

Interestingly, when the element is positioned on the opposite side, there is no overflow. Why is that?

![An element that is positioned off-screen shown on the left. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d9645a40-9791-4074-ade6-e2df8bea6f57/element-off-screen-2.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d9645a40-9791-4074-ade6-e2df8bea6f57/element-off-screen-2.jpg)

I faced this issue lately and [**wrote about it**](/ishadeed.com/clip-scrollable-areas-inline-start.md). It turns out that this behavior is intentional. According to the [<VPIcon icon="iconfont icon-w3c"/>CSS specification](https://w3.org/TR/css-overflow-3/#scrolling-direction):

> “UAs must clip the scrollable overflow area of scroll containers on the block-start and inline-start sides of the box (thereby behaving as if they had no scrollable overflow on that side).”

For an English document, the inline-start side is the **left** side, so any element positioned off-screen on the left will be clipped, and thus there will be no overflow.

If positioning an element off screen is really necessary, make sure to apply `overflow: hidden` to the parent to avoid any overflow.

### Images Without `max-width`

If you don’t take care of large images ahead of time, you will see overflow. Make sure to set `max-width: 100%` on all images.

```css
img {
  max-width: 100%;
}
```

### Viewport Units

Using `100vw` does have a downside, which is that it can cause overflow when the scrollbar is visible. On macOS, `100vw` is fine and won’t cause horizontal scroll.

![On Mac OS, scrollbars are hidden. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3a9ee944-57d6-4e6e-9c3d-b674020dfe5d/body-100vw.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3a9ee944-57d6-4e6e-9c3d-b674020dfe5d/body-100vw.png)

On Windows, scrollbars are always visible by default, so overflow will occur.

![On Windows, there is a horizontal overflow when scrolling. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1ce6aff7-5396-486b-993d-f3f9936790de/body-100vw-1.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1ce6aff7-5396-486b-993d-f3f9936790de/body-100vw-1.png)

The reason for this is that with the value `100vw`, there is no awareness of the **width of the browser’s vertical scrollbar**. As a result, the `width` will be equal to `100vw` plus the scrollbar’s width. Unfortunately, there is no CSS fix to that.

![An example of a page with a viewport of 100vw and 14px on the right being used for the scrollbar. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/88cb7412-3c3b-468e-bfe5-2757f395d2ec/body-100vw-2.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/88cb7412-3c3b-468e-bfe5-2757f395d2ec/body-100vw-2.png)

However, we can [<VPIcon icon="fas fa-globe"/>use JavaScript](https://jaketrent.com/post/100vw-not-scrollbar-aware) to measure the viewport’s width excluding the scrollbar.

```js
function handleFullWidthSizing() {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth

  document.querySelector('myElement').style.width = `calc(100vw - ${scrollbarWidth}px)`
}
```

### Injected Ads

Ads injected on page load can cause overflow if they’re wider than their parent. Add `overflow-x: hidden` to the parent element to prevent this.

![Mobile viewport with an overflow caused by an ad that is wider than the viewport. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/da0ac033-0cc5-458a-b6cc-4700777871bf/common-ad.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/da0ac033-0cc5-458a-b6cc-4700777871bf/common-ad.jpg)

Double-check every ad on the website to ensure that it’s not causing overflow.

---

## Is Applying `overflow-x: hidden` To `body` A Good Idea?

Opting for `overflow-x: hidden` is like putting on a bandage without addressing the problem. If you have overflow, then it’s better to solve the root issue.

Moreover, applying `overflow-x: hidden` to the `body` element is not a good idea because `position: sticky` won’t work if a parent has `overflow-x: hidden`.

---

## How To Avoid Overflow In CSS

Below are things to check to reduce overflow issues in CSS. I hope you find it useful!

### Test With Real Content

Nothing beats testing with real content on a website. In doing so, you ensure that the layout can handle different varieties of content.

### Account For User-Generated Content

For a component like a comments thread, account for cases in which the user will paste a long URL or type a long word, as explained above.

### Use CSS Grid And Flexbox Carefully

As useful as CSS grid and flexbox are, they can easily cause overflow if used incorrectly. As we discussed, not using `flex-wrap: wrap` can cause overflow, as can `grid-template-columns: 1fr 350px` when the screen is narrower than 350 pixels.

::: info Further Reading

- [**Things You Can Do With CSS Today**](/smashingmagazine.com/things-you-can-do-with-css-today.md)
- [**Accessible Front-End Components**](/smashingmagazine.com/complete-guide-accessible-front-end-components.md)
- [**CSS Auditing Tools**](/smashingmagazine.com/css-auditing-tools.md)
- [**CSS Generators**](/smashingmagazine.com/css-generators.md)
- ...and more in our [<VPIcon icon="iconfont icon-smashingmagazine"/>CSS Layout Guide](https://smashingmagazine.com/guides/css-layout/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Overflow Issues In CSS",
  "desc": "You may have come across horizontal scrollbar issues, especially on mobile, if you’re a front-end developer. Because there are many causes of scrollbar problems, there is no straightforward solution. Some issues can be fixed quickly, and some need a little debugging skill. In this article, Ahmad Shadeed will explore the causes of overflow issues and how to solve them. We will also explore how modern features in the developer tools (DevTools) can make the process of fixing and debugging easier.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-overflow-issues.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
