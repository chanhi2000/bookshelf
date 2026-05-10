---
lang: en-US
title: "Common CSS Issues For Front-End Projects"
description: "Article(s) > Common CSS Issues For Front-End Projects"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Common CSS Issues For Front-End Projects"
    - property: og:description
      content: "Common CSS Issues For Front-End Projects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/common-css-issues-front-end-projects.html
prev: /programming/css/articles/README.md
date: 2018-12-27
isOriginal: false
author:
  - name: Ahmad Shadeed
    url: https://smashingmagazine.com/author/ahmad-shadeed/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f56e4f79-6a5a-4eba-9f86-c91ed5fa509c/outline-page-800w.png
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
  name="Common CSS Issues For Front-End Projects"
  desc="Rendering and interaction have become a lot more consistent across browsers in recent years. It’s still not perfectly uniform, however, and a lot of small issues can trip you up. Add on top of these issues the variables of different screen sizes, language preferences and plain human error, and we find a lot of small things to trip up a developer. When implementing a user interface in a browser, it’s good to minimize those differences and issues wherever you can, so that the UI is predictable. In this article, Ahmad Shadeed has put together a list of common issues, with their solutions, as a handy reference guide for when you’re working on a new project. Let’s begin."
  url="https://smashingmagazine.com/2018/12/common-css-issues-front-end-projects/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f56e4f79-6a5a-4eba-9f86-c91ed5fa509c/outline-page-800w.png"/>

Rendering and interaction have become a lot more consistent across browsers in recent years. It’s still not perfectly uniform, however, and a lot of small issues can trip you up. Add on top of these issues the variables of different screen sizes, language preferences and plain human error, and we find a lot of small things to trip up a developer. When implementing a user interface in a browser, it’s good to minimize those differences and issues wherever you can, so that the UI is predictable. In this article, Ahmad Shadeed has put together a list of common issues, with their solutions, as a handy reference guide for when you’re working on a new project. Let’s begin.

When implementing a user interface in a browser, it’s good to minimize those differences and issues wherever you can, so that the UI is predictable. Keeping track of all of those differences is hard, so I’ve put together a list of common issues, with their solutions, as a handy reference guide for when you’re working on a new project.

Let’s begin.

---

## 1. Reset The Backgrounds Of `button` And `input` Elements

When adding a button, reset its background, or else it will look different across browsers. In the example below, the same button is shown in Chrome and in Safari. The latter adds a default gray background.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f61d43c4-6a6e-4d9f-8cdc-be1a519b9ee3/button-and-inputs.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f61d43c4-6a6e-4d9f-8cdc-be1a519b9ee3/button-and-inputs.png)

Resetting the background will solve this issue:

```css
button {
  appearance: none;
  background: transparent;
  /* Other styles */
}
```

<CodePen
  user="shadeed"
  slug-hash="MzWBYv"
  title="Button and Inputs"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 2. Overflow: `scroll` Vs. `auto`

To limit the height of an element and allow the user to scroll within it, add `overflow: scroll-y`. This will look good in Chrome on macOS. However, on Chrome Windows, the scroll bar is always there (even if the content is short). This is because `scroll-y` will show a scroll bar regardless of the content, whereas `overflow: auto` will show a scroll bar only when needed.

![Left: Chrome on macOS. Right: Chrome on Windows. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/424ab30e-eac3-45c0-b9d0-04763ec6e6cf/overflow-y.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/424ab30e-eac3-45c0-b9d0-04763ec6e6cf/overflow-y.png)

```css
.element {
  height: 300px;
  overflow-y: auto;
}
```

<CodePen
  user="shadeed"
  slug-hash="vQYwXj"
  title="overflow-y"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 3. Add `flex-wrap`

Make an element behave as a flex container simply by adding `display: flex`. However, when the screen size shrinks, the browser will display a horizontal scroll bar in case `flex-wrap` is not added.

```html
<div class="wrapper">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

```css
.wrapper {
  display: flex;
}

.item {
  flex: 0 0 120px;
  height: 100px;
}
```

The example above will work great on big screens. On mobile, the browser will show a horizontal scroll bar.

![Left: A horizontal scroll bar is shown, and the items aren’t wrapped. Right: The items are wrapped onto two rows. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6d093ace-fe0a-4e1d-9731-4167b43dc5ff/flex-wrap.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6d093ace-fe0a-4e1d-9731-4167b43dc5ff/flex-wrap.jpg)

The solution is quite easy. The wrapper should know that when space is not available, it should wrap the items.

```css
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
```

<CodePen
  user="shadeed"
  slug-hash="JejVLG"
  title="flex-wrap"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 4. Don’t Use `justify-content: space-between` When The Number Of Flex Items Is Dynamic

When `justify-content: space-between` is applied to a flex container, it will distribute the elements and leave an equal amount of space between them. Our example has eight card items, and they look good. What if, for some reason, the number of items was seven? The second row of elements would look different than the first one.

![The wrapper with eight items. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c36764b1-db7b-4b62-9e54-1265b8058ebf/justify-content.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c36764b1-db7b-4b62-9e54-1265b8058ebf/justify-content.png)

![The wrapper with seven items. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9f194fe2-73f1-4815-983a-6a8953da7e43/justify-content-less-items.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9f194fe2-73f1-4815-983a-6a8953da7e43/justify-content-less-items.png)

<CodePen
  user="shadeed"
  slug-hash="XyWLLo"
  title="justify-content"
  :default-tab="['css','result']"
  :theme="dark"/>

In this case, using CSS grid would be more suitable.

---

## 5. Long Words And Links

When an article is being viewed on a mobile screen, a long word or inline link might cause a horizontal scroll bar to appear. Using CSS’ `word-break` will prevent that from happening.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c6030181-179d-4f28-86cd-d95c11323012/long-words.gif)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c6030181-179d-4f28-86cd-d95c11323012/long-words.gif)

```css
.article-content p {
    word-break: break-all;
}   
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/965443c4-3be5-4ba9-ba7c-9376da152f6b/long-words-solved.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/965443c4-3be5-4ba9-ba7c-9376da152f6b/long-words-solved.png)

::: note

[**Check out CSS-Tricks**](/css-tricks.com/snippets-css/prevent-long-urls-from-breaking-out-of-container.md) for the details.

:::

---

## 6. Transparent Gradients

When adding gradient with a transparent start and end point, it will look black-ish in Safari. That’s because Safari doesn’t recognize the keyword `transparent`. By substituting it with `rgba(0, 0, 0, 0)`, it will work as expected. Note the below screenshot:

![Top: Chrome 70. Bottom: Safari 12. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/756d8b47-21c4-4b75-8b99-8805ea880b24/transparent-gradient.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/756d8b47-21c4-4b75-8b99-8805ea880b24/transparent-gradient.png)

```css
.section-hero {
  background: linear-gradient(transparent, #d7e0ef), #527ee0;
  /*Other styles*/
}
```

This should instead be:

```css
.section-hero {
  background: linear-gradient(rgba(0, 0, 0,0), #d7e0ef), #527ee0;
  /*Other styles*/
}
```

---

## 7. The Misconception About The Difference Between `auto-fit` And `auto-fill` In CSS Grid

In CSS grid, the `repeat` function can create a responsive column layout without requiring the use of media queries. To achieve that, use either `auto-fill` or `auto-fit`.

```css
.wrapper {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/72b6190c-a54e-4ab3-97fa-a83c1bd96527/auto-fill-vs-auto-fit.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/72b6190c-a54e-4ab3-97fa-a83c1bd96527/auto-fill-vs-auto-fit.png)

In short, `auto-fill` will arrange the columns without expanding their widths, whereas `auto-fit` will collapse them to zero width but only if you have empty columns. Sara Soueidan has written an [**excellent article**](/css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit.md) on the topic.

---

## 8. Fixing Elements To The Top Of The Screen When The Viewport Is Not Tall Enough

If you fix an element to the top of the screen, what happens if the viewport is not tall enough? Simple: It will take up screen space, and, as a result, the vertical area available for the user to browse the website will be small and uncomfortable, which will detract from the experience.

```css
@media (min-height: 500px) {
  .site-header {
    position: sticky;
    top: 0;
    /*other styles*/
  }
}
```

In the snippet above, we’re telling the browser to fix the header to the top only if the viewport’s height is equal to or greater than 500 pixels.

Also important: When you use `position: sticky`, it won’t work unless you specify the `top` property.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ebf1d848-4f96-4dc6-999c-5b06d06237d6/fixed-header.gif)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/43418ab5-a5a7-403d-88a8-4753a0df3cbb/fixed-header-800w.gif)

<CodePen
  user="shadeed"
  slug-hash="oQLYmg"
  title="Vertical media queries: Fixed Header"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 9. Setting `max-width` For Images

When adding an image, define `max-width: 100%`, so that the image resizes when the screen is small. Otherwise, the browser will show a horizontal scroll bar.

```css
img {
  max-width: 100%;
}
```

---

## 10. Using CSS Grid To Define `main` And `aside` Elements

CSS grid can be used to define the `main` and `aside` sections of a layout, which is a perfect use for grid. As a result, the `aside` section’s height will be equal to that of the `main` element, even if it’s empty.

To fix this, align the `aside` element to the start of its parent, so that its height doesn’t expand.

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-gap: 20px;
}

/* align-self will tell the aside element to align itself with the start of its parent. */
aside {
  grid-column: 1 / 4;
  grid-row: 1;
  align-self: start;
}

main {
  grid-column: 4 / 13;
}
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/80f4372d-8642-4865-913d-2df7634405a9/main-and-aside.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/80f4372d-8642-4865-913d-2df7634405a9/main-and-aside.png)

<CodePen
  user="shadeed"
  slug-hash="yQJgXr"
  title="main and aside"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 11. Adding `fill` To An SVG

Sometimes, while working with SVGs, `fill` won’t work as expected if the `fill` attribute has been added inline in the SVG. To solve this, either to remove the `fill` attribute from the SVG itself or override `fill: color`.

Take this example:

```css
.some-icon {
  fill: #137cbf;
}
```

This won’t work if the SVG has an inline fill. It should be this instead:

```css
.some-icon path {
  fill: #137cbf;
}
```

---

## 12. Working With Pseudo-Elements

I love to use pseudo-elements whenever I can. They provide us with a way to create fake elements, mostly for decorative purposes, without adding them to the HTML.

When working with them, the author might forget to do one of the following:

- add the `content: ""` property,
- set the `width` and `height` without defining the `display` property for it.

In the example below, we have a title with a badge as a pseudo-element. The `content: ""` property should be added. Also, the element should have `display: inline-block` set in order for the `width` and `height` to work as expected.

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2d68e677-dd33-4714-9576-8e6031bb63f0/hiding-pseudo-element.gif)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/aa9e47b3-3eb9-40ae-8953-84e7f26e27b7/hiding-pseudo-element-800w.gif)

---

## 13. The Weird Space When Using `display: inline-block`

Setting two or more elements to `display: inline-block` or `display: inline` will create a tiny space between each one. The space is added because the browser is interpreting the elements as words, and so it’s adding a character space between each one.

In the example below, each item has a space of `8px` on the right side, but the tiny space caused by using `display: inline-block` is making it `12px`, which is not the desired result.

```css
li:not(:last-child) {
  margin-right: 8px;
}
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a9c8f61f-75b9-4c63-8f7a-b4a95b472e14/inline-block-before.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a9c8f61f-75b9-4c63-8f7a-b4a95b472e14/inline-block-before.jpg)

A simple fix for this is to set `font-size: 0` on the parent element.

```css
ul {
  font-size: 0;
}

li {
  font-size: 16px; /*The font size should be reassigned here because it will inherit `font-size: 0` from its parent.*/
}
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f94d53ad-2aaf-4960-bd66-30b0abbaefeb/inline-block-after.jpg)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f94d53ad-2aaf-4960-bd66-30b0abbaefeb/inline-block-after.jpg)

<CodePen
  user="shadeed"
  slug-hash="qQYPxV"
  title="Inline Block Spacing"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## 14. Add `for="ID"` When Assigning A Label Element To An Input

When working with form elements, make sure that all `label` elements have an ID assigned to them. This will make them more accessible, and when they’re clicked, the associated input will get focus.

```html
<label for="emailAddress">Email address:</label>
<input type="email" id="emailAddress">
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/15bc8dc7-2aec-48e7-abc1-49c9a56e3a0c/label-focus.gif)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/15bc8dc7-2aec-48e7-abc1-49c9a56e3a0c/label-focus.gif)

---

## 15. Fonts Not Working With Interactive HTML Elements

When assigning fonts to the whole document, they won’t be applied to elements such as `input`, `button`, `select` and `textarea`. They don’t inherit by default because the browser applies the default system font to them.

To fix this, assign the font property manually:

```css
input, button, select, textarea {
  font-family: your-awesome-font-name;
}
```

---

## 16. Horizontal Scroll Bar

Some elements will cause a horizontal scroll bar to appear, due to the width of those elements.

The easiest way to find the cause of this issue is to use CSS outline. Addy Osmani has shared a very handy [script (<VPIcon icon="iconfont icon-github"/>`addyosmani`)](https://gist.github.com/addyosmani/fd3999ea7fce242756b1) that can be added to the browser console to outline every element on the page.

```js
[].forEach.call($$("*"), function(a) {
  a.style.outline =
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7da947a3-15ef-4685-a4d0-a7f60959108c/outline-page.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7da947a3-15ef-4685-a4d0-a7f60959108c/outline-page.png)

---

## 17. Compressed Or Stretched Images

When you resize an image in CSS, it could be compressed or stretched if the aspect ratio is not consistent with the width and height of the image.

The solution is simple: Use CSS’ `object-fit`. Its functionality is similar to that of `background-size: cover` for background images.

```css
img {
  object-fit: cover;
}
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f0f0f149-327b-4b7a-a440-31a451c6bd84/css-object-fit.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f0f0f149-327b-4b7a-a440-31a451c6bd84/css-object-fit.png)

Using `object-fit` won’t be the perfect solution in all cases. Some images need to appear without cropping or resizing, and some platforms force the user to upload or crop an image at a defined size. For example, Dribbble accepts thumbnails uploads at 800 by 600 pixels.

---

## 18. Add The Correct `type` For `input`.

Use the correct `type` for an `input` field. This will enhance the user experience in mobile browsers and make it more accessible to users.

Here is some HTML:

```html
<form action="">
  <p>
    <label for="name">Full name</label>
    <input type="text" id="name">
  </p>
  <p>
    <label for="email">Email</label>
    <input type="email" id="email">
  </p>
  <p>
    <label for="phone">Phone</label>
    <input type="tel" id="phone">
  </p>
</form>
```

This is how each input will look once it’s focused:

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7d3404c2-b73c-4e85-af46-968223da8393/input-mobile.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7d3404c2-b73c-4e85-af46-968223da8393/input-mobile.png)

---

## 19. Phone Numbers In RTL Layouts

When adding a phone number like `+ 972-123555777` in a right-to-left layout, the plus symbol will be positioned at the end of the number. To fix that, reassign the direction of the phone number.

```css
p {
  direction: ltr;
}
```

![[<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3564b48a-3b11-4dfc-9676-dc7f6175d9be/phone-number-rtl.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3564b48a-3b11-4dfc-9676-dc7f6175d9be/phone-number-rtl.png)

---

## Conclusion

All of the issues mentioned here are among the most common ones I’ve faced in my front-end development work. My goal is to keep a list to check regularly while working on a web project.

Do you have an issue that you always face in CSS? Let us know in the comments!

::: info Further Reading

- [**Sliding 3D Image Frames In CSS**](/smashingmagazine.com/sliding-3d-image-frames-css.md)
- [**Infinite-Scrolling Logos In Flat HTML And Pure CSS**](/smashingmagazine.com/infinite-scrolling-logos-html-css.md)

```component VPCard
{
  "title": "Useful DevTools Tips and Tricks",
  "desc": "Let’s discover the most popular DevTools tips that can boost your productivity and revolutionize your debugging workflow.",
  "link": "/smashingmagazine.com/popular-devtools-tips.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Level Up Your CSS Skills With The :has() Selector",
  "desc": "The CSS relational selector :has() offers what was previously impossible without JavaScript. Let’s explore some magical powers that :has brings.",
  "link": "/smashingmagazine.com/level-up-css-skills-has-selector.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Common CSS Issues For Front-End Projects",
  "desc": "Rendering and interaction have become a lot more consistent across browsers in recent years. It’s still not perfectly uniform, however, and a lot of small issues can trip you up. Add on top of these issues the variables of different screen sizes, language preferences and plain human error, and we find a lot of small things to trip up a developer. When implementing a user interface in a browser, it’s good to minimize those differences and issues wherever you can, so that the UI is predictable. In this article, Ahmad Shadeed has put together a list of common issues, with their solutions, as a handy reference guide for when you’re working on a new project. Let’s begin.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/common-css-issues-front-end-projects.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
