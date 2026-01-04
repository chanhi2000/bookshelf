---
lang: en-US
title: "The trick to viewport units on mobile"
description: "Article(s) > The trick to viewport units on mobile"
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
      content: "Article(s) > The trick to viewport units on mobile"
    - property: og:description
      content: "The trick to viewport units on mobile"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-trick-to-viewport-units-on-mobile.html
prev: /programming/css/articles/README.md
date: 2018-07-31
isOriginal: false
author:
  - name: Louis Hoebregts
    url : https://css-tricks.com/author/louishoebregts/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/viewport-units-mobile-crop-featured.jpg
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
  name="The trick to viewport units on mobile"
  desc="Viewport units have always been controversial and some of that is because of how mobile browsers have made things more complicated by having their own"
  url="https://css-tricks.com/the-trick-to-viewport-units-on-mobile"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/viewport-units-mobile-crop-featured.jpg"/>

Viewport units have always been controversial and some of that is because of how mobile browsers have made things more complicated by having their own opinions about how to implement them.

Case in point: should the scrollbar be taken into account for the `vw` unit? What about a site’s navigation or page controls — should those count in the calculation? Then there are physical attributes of the devices themselves (hello, [**notch**](/css-tricks.com/the-notch-and-css.md)!) that can’t be overlooked.

---

## First, a little context

The [<VPIcon icon="iconfont icon-w3c"/>spec is pretty vague](https://w3.org/TR/css-values-3/#viewport-relative-lengths) about how viewport units should be calculated. With mobile devices, we’re often concerned with the vertical height, so let’s look specifically at viewport height (`vh`):

::: info vh unit

> Equal to 1% of the height of the initial containing block.

:::

So yeah, no clear guidance there when it comes to handling device and browser-specific differentiations.

`vh` was initially calculated by the current viewport of your browser. If you opened your browser and started to load a website, `1vh` was equal to 1% of your screen height, minus the browser interface.

But! If you start scrolling, it’s a different story. Once you get past a piece of the browser interface, like the address bar, the `vh` value would update and the result was an awkward jump in the content.

Safari for iOS was one of the first mobile browsers to update their implementation by choosing to define a fixed value for the `vh` based on the maximum height of the screen. By doing so, the user would not experience jumps on the page once the address bar went out of view. Chrome’s mobile browser [<VPIcon icon="fa-brands fa-google"/>followed suit around a year ago](https://developers.google.com/web/updates/2016/12/url-bar-resizing).

::: note

As of this writing, there is a [<VPIcon icon="fa-brands fa-firefox" />ticket to address this in Firefox Android](https://bugzilla.mozilla.org/show_bug.cgi?id=1007286).

:::

While using a fixed value is nice, it also means that you cannot have a full-height element if the address bar is in view. The bottom of your element will be cropped.

![An element gets cropped at the bottom when the address bar is in view (left) but what we want is the full thing (right).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/07/viewport-units-mobile-crop.jpg?ssl=1)

---

## CSS Custom Properties: The trick to correct sizing

The idea struck me that CSS Custom Properties and a few lines of `JavaScript` might be the perfect way to get the consistent and correct sizing I needed.

In JavaScript, you can always get the value of the current viewport by using the global variable `window.innerHeight`. This value takes the browser’s interface into account and is updated when its visibility changes. The trick is to store the viewport value in a CSS variable and apply that to the element *instead* of the `vh` unit.

Let’s say our CSS custom variable is `--vh` for this example. That means we will want to apply it in our CSS like this:

```css
.my-element {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
```

OK, that sets us up. Now let’s get the inner height of the viewport in JavaScript:

```js
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
```

We told JavaScript to grab the height of the viewport and then drilled it down into 1/100th of that total so we have a value to assign as our viewport height unit value. Then we politely asked JS to create the CSS variable (`--vh`) at the `:root`.

As a result, we can now use `--vh` as our height value like we would any other `vh` unit, multiply it by 100 and we have the full height we want.

<CodePen
  user="anon"
  slug-hash="vapjge"
  title="Viewport Height on Mobile (no resize on update)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

There is another fix for this that has come along more recently. [<VPIcon icon="fas fa-globe"/>Matt Smith documents it here](https://allthingssmitty.com/2020/05/11/css-fix-for-100vh-in-mobile-webkit/). The trick is `min-height: -webkit-fill-available;` on the body as a progressive enhancement over `100vh`, which should work on iOS devices.

:::

---

## Whoa, there! One more little detail

While our work might look done at this point, those of you with an astute eye for detail may have caught that the JavaScript fires but never updates the size of our element when the viewport’s height changes. Go ahead and try resizing the demo above.

We can update the value of `--vh` by listening to the window `resize` event. This is handy in case the user rotates the device screen, like from landscape to portrait, or the navigation moves out of view on scroll.

```js
// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
```

::: warning

Updating the value of `--vh` will trigger a repaint of the page and the user may experience a jump as a result. Because of this, *I’m not advising that this trick should be used for every project or to replace all usage of the vh unit* but only when you may need your users to have an exact viewport unit value.

::: 

Also, you may want to implement a debounce method for the resize event to avoid triggering to many events while the user is resizing their browser’s window. You can learn more about it with this article: [**Debouncing and Throttling Explained Through Examples**](/css-tricks.com/debouncing-throttling-explained-examples.md)

<CodePen
  user="anon"
  slug-hash="WKdJaB"
  title="Correct Viewport Height on Mobile"
  :default-tab="['css','result']"
  :theme="dark"/>

You can now resize the demo above and notice that the CSS variable is updated accordingly.

While I recently used this technique on a project and it really helped, you should always think twice when replacing the browser’s default behaviors. (For example, [**this comes up a lot**](/css-tricks.com/focusing-on-focus-styles.md) with `::focus`.) Also, browsers tend to update very fast these days, so beware that today’s solution may not work tomorrow.

In the meantime, I hope this article helps! 👋

::: info

[Here’s a proposal (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/4329) for `vhc` and `vwc` units that may be a savior in all this.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The trick to viewport units on mobile",
  "desc": "Viewport units have always been controversial and some of that is because of how mobile browsers have made things more complicated by having their own",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-trick-to-viewport-units-on-mobile.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
