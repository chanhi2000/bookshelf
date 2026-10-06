---
lang: en-US
title: "Demystifying the View Transition Pseudo Tree"
description: "Article(s) > Demystifying the View Transition Pseudo Tree"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Demystifying the View Transition Pseudo Tree"
    - property: og:description
      content: "Demystifying the View Transition Pseudo Tree"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/demystifying-the-view-transition-pseudo-tree.html
prev: /programming/css/articles/README.md
date: 2026-06-10
isOriginal: false
author:
  - name: Cyd Stumpel
    url: https://blog.master.dev/author/cydstumpel/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10055
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
  name="Demystifying the View Transition Pseudo Tree"
  desc="Each pseudo element plays a distinct role in how the view transition animates. The browser does most of the heavy lifting though, which makes it a little hard to see what’s actually happening under the hood. "
  url="https://blog.master.dev/demystifying-the-view-transition-pseudo-tree/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10055"/>

Every time a view transition is initiated, a pseudo-element is added to the HTML element for the duration of the view transition. This acts as a snapshot overlay across your entire page.

Each pseudo-element plays a distinct role in how the view transition animates. The browser does most of the heavy lifting, which makes it a little hard to see what’s actually happening under the hood. This article breaks down each pseudo-element in the tree so you know exactly what to target when you need to customize things.

---

## The View Transition Pseudo Tree

All elements with a `view-transition-name` CSS property will be added to the view transition pseudo tree every time a view transition is [<VPIcon icon="fa-brands fa-firefox"/>called](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using). By default, only the HTML tag gets a `view-transition-name`, the `root` view transition group is the same size as the HTML element and covers all interactive elements.

::: note

This is why your website may not be interactive during a view transition!

:::

```plaintext
::view-transition  
└─ ::view-transition-group(root)  
  └─ ::view-transition-image-pair(root)  
      ├─ ::view-transition-old(root)  
      └─ ::view-transition-new(root)
```

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/Screenshot-2026-06-09-at-6.41.24-PM-1.png?resize=645%2C290&ssl=1)

You can see the pseudo-element tree in DevTools during a View Transition.

The pseudo tree will get a `view-transition-group` for every named element, those elements are separated from the `root` view transition and put on top of it. The value of the `view-transition-name` will be used in the view transition group and its children. See the screenshot above where the active view transition had `view-transition-name: blob;`.

```css
/* 
  Adding a view-transition-name separates the element 
  from the root view transition and puts it on top
  in the view transition pseudo tree
*/
.header-image {
  view-transition-name: header-image;
}
```

```plaintext
::view-transition  
└─ ::view-transition-group(root)  
  └─ ::view-transition-image-pair(root)  
      ├─ ::view-transition-old(root)  
      └─ ::view-transition-new(root)  
└─ ::view-transition-group(header-image)  
  └─ ::view-transition-image-pair(header-image)  
      ├─ ::view-transition-old(header-image)  
      └─ ::view-transition-new(header-image)
```

### `::view-transition-group`

The `view-transition-group` pseudo-element is responsible for the animation of the position, size, and rotation, this is all generated and applied automatically.

<CodePen
  user="anon"
  slug-hash="KwNoKEV"
  title="The view transition group"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The browser positions all view transition groups absolutely at the top-left corner.

```css
/* user agent stylesheet */
::view-transition-group(*) {
  position: absolute;
  top: 0px;
  left: 0px;
  animation-duration: 0.25s;
  animation-fill-mode: both;
}
```

The keyframe then moves the element to the position where it was when the view transition was called using a matrix animation:

```css
/* user agent stylesheet */
@keyframes -ua-view-transition-group-anim-box {
  0% {
    transform: matrix(1, 0, 0, 1, 8, 8);
    width: 100px;
    height: 100px;
    backdrop-filter: none;
  }
}
```

Only a start keyframe is added to the animation; it will then animate to the end state that’s set by the browser on the view transition group:

```css
/* user agent stylesheet */
::view-transition-group(box) {
  transform: matrix(1, 0, 0, 1, 108, 108);
  width: 200px;
  height: 200px;
  /* [...] */	
}
```

To simplify: this matrix animation animates the `translateX` and `translateY` from 8px to 108px.

The same thing is applied in reverse if you click the button again:

```css
/* user agent stylesheet */
@keyframes -ua-view-transition-group-anim-box {
  0% {
    transform: matrix(1, 0, 0, 1, 108, 108);
    width: 200px;
    height: 200px;
    backdrop-filter: none;
  }
}

::view-transition-group(box) {
  transform: matrix(1, 0, 0, 1, 8, 8);
  width: 100px;
  height: 100px;
  /* [...] */	
}
```

All this is handled by the browser, using the user agent stylesheet, often you don’t need to change anything about this animation, you can make it fit your website better using a custom duration, delay and ease. It’s good practice to add all changes to the animation property as individual properties (not using the animation shorthand) so you don’t inadvertently overwrite any of the default values or animations.

It’s also important to understand that many of the animation properties that you set on view transition pseudo-elements are inherited by their children. If you change the duration, fill-mode, delay, timing-function, iteration-count, direction or play-state of the `view-transition-group` , for example, it will also be applied to the `view-transition-image-pair` and `view-transition-old` and `view-transition-new` pseudo-elements.

### `::view-transition-image-pair`

The sole purpose of `view-transition-image-pair` is to apply this rule:

```css
/* user agent stylesheet */
::view-transition-image-pair(box) {
  isolation: isolate;
}
```

[<VPIcon icon="fa-brands fa-firefox"/>Isolation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/isolation) is a CSS property that creates a new stacking context, meaning mix-blend modes set on children remain isolated and won’t mix with anything but themselves.

### `::view-transition-old` and `::view-transition-new`

The `view-transition-old` and `view-transition-new` pseudo-elements represent what the element looks like at the start and end of the animation.

By default, a blend mode animation and opacity change is added by the user agent:

```css
/* user agent stylesheet */
::view-transition-old(box) {
  animation-name: -ua-view-transition-fade-out, -ua-mix-blend-mode-plus-lighter;
}
::view-transition-new(box) {
  animation-name: -ua-view-transition-fade-in, -ua-mix-blend-mode-plus-lighter;
}

@keyframes -ua-mix-blend-mode-plus-lighter {
  from {
    mix-blend-mode: plus-lighter;
  }
  to {
    mix-blend-mode: plus-lighter;
  }
}

@keyframes -ua-view-transition-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes -ua-view-transition-fade-out {
  to {
    opacity: 0;
  }
}
```

If all you’re changing is the position, size (without changing the ratio), and/or rotation of an element during the view transition, then this animation does basically nothing visually.

When the old and new states aren’t exactly the same, you **will** see the animation:

<CodePen
  user="anon"
  slug-hash="bNBvwVd"
  title="View transition old and -new"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

However, if you change the aspect ratio or the content of the element you’ve set the view transition on, the animation starts to look a little weird:

<CodePen
  user="anon"
  slug-hash="myOxraJ"
  title="View transition old and -new aspect-ratio change"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

That’s because the `view-transition-old` and `-new` aren’t the same size. We can fix this by adding some extra code (see what happens if you check the input), but for a deep dive into aspect ratio changes, you should definitely check out [<VPIcon icon="fas fa-globe"/>Jake Archibald’s writeup](https://jakearchibald.com/2024/view-transitions-handling-aspect-ratio-changes/).

Understanding the pseudo tree will help you create better view transitions. Once you know which layer controls what, you can better target what you need and start using browser defaults to your advantage.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Demystifying the View Transition Pseudo Tree",
  "desc": "Each pseudo element plays a distinct role in how the view transition animates. The browser does most of the heavy lifting though, which makes it a little hard to see what’s actually happening under the hood. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/demystifying-the-view-transition-pseudo-tree.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
