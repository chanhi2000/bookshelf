---
lang: en-US
title: "Full-Bleed Layout with Modern CSS"
description: "Article(s) > Full-Bleed Layout with Modern CSS"
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
      content: "Article(s) > Full-Bleed Layout with Modern CSS"
    - property: og:description
      content: "Full-Bleed Layout with Modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/full-bleed-layout-with-modern-css.html
prev: /programming/css/articles/README.md
date: 2025-01-27
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5032
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
  name="Full-Bleed Layout with Modern CSS"
  desc="Just four declarations in CSS can handle this nicely, while avoiding the vertical scrollbar issue. "
  url="https://frontendmasters.com/blog/full-bleed-layout-with-modern-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5032"/>

I recently shared a trick on [**how to create a Full-bleed layout**](/css-tip.com/full-bleed-layout.md) using a few lines of modern CSS code. If you are unfamiliar with such layout see the demo below. In this article we'll dig deeper into the idea and explain things as we go.

<CodePen
  user="t_afif"
  slug-hash="vEBBoWj"
  title="Full-bleed layout with modern CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The main content area is limited to a certain width and centered but a few elements “bleed” to the outside edges, filling the entire page width. There are already a lot of techniques to create such a layout but the one I came up with relies on modern features and *only 4 lines of code.*

```css
html {
  container-type: inline-size;
}
main {
  --_m: max(1em, 50cqw - 400px/2);
  margin-inline: var(--_m);
}
.full-bleed {
  margin-inline: calc(-1 * var(--_m));
}
```

You might look at that code and think it's unreadable and hacky. If so, after we dissect it together, I hope to change your mind. You will soon understand the logic behind it and see it's actually a rather efficient way of handling this situation.

---

## Why make `<html>` a container?

You might be familiar with viewport units such as `vw`. The use of `100vw` essentially means “the width of the browser window” a.k.a the viewport. It's common to rely on such a metric, but it comes with a drawback: whether or not you have a scrollbar `width: 100vw` will always give the same result. This is a bit frustrating and sometimes we wind up with unwanted overflow.

Here is a quick demo to illustrate the issue:

<CodePen
  user="t_afif"
  slug-hash="dPbdrzX"
  title="Scrollbar issue with 100vw"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The container has a height equal to 500px. If the page is tall enough to show the whole container, everything is fine but once the height gets smaller and we need to scroll the page, *another* scroll appears at the bottom!

Ideally, we want `100vw` to behave differently, but it won't, so we have to find something else. You'd think the advent of the `dvw` unit would have been an opportunity to fix this, [<VPIcon icon="fas fa-globe"/>but it does not](https://web.dev/blog/viewport-units#:~:text=None%20of%20the%20viewport%20units%20take%20the%20size%20of%20scrollbars%20into%20account.).

Making the `<html>` element a container is one solution because it will unlock the ability to query the width of the html (instead of the whole page) by using `100cqw`. Since the `<html>` element is the uppermost element of the page and it is a block-level element it will always (unless you override this behavior) have the width of the page while considering the scrollbar. In other words, `100cqw` will get smaller when a scrollbar appears on the page — which is perfect!

Here is the previous demo using `100cqw` instead of `100vw`. No more issue this time!

<CodePen
  user="t_afif"
  slug-hash="LEPQazG"
  title="Fixing scrollbar issue using 100cqw"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Instead of relying on `100vw` like most of the techniques, I will use `100cqw` which is slightly better and for this, I have to make the `<html>` element a container.

I am deliberately skipping the explanation of what “container” means to avoid making this article too long. If you are unfamiliar with this, it refers to the relatively recent ability in CSS to do “container queries”. [**Check out this article.**](/frontendmasters.com/container-queries-and-units.md)

---

## What about `margin`?

If I told you we need a container with a `max-width` which is centered horizontally, you will like intuitively do this:

```css
main {
  max-width: 400px;
  margin-inline: auto; /* or: margin: 0 auto; */
}
```

This is fairly simple, efficient, and people with basic CSS experience will understand it. I'd advise you to keep doing this, but we can also do the same using *only* margin like I detail in my post [**max-width + centering with one instruction**](/css-tip.com/center-max-width.md).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/MwCcy4QIP0-746.png?resize=746%2C387&ssl=1)

If the container needs to have a `max-width` equal to `w`, then the remaining space on both sides is equal to `50% - w/2` where `50%` refers to the parent width. If we define the `margin` using that space, we have what we want.

It may be a bit counter-intuitive, but it's logical. We either define the `width` and tell the browser to calculate the margin for us (using `auto`), or we do the opposite and define the `margin` then the browser will calculate the width for us. Unlike `margin`, the default value of width is already `auto` so defining the `margin` is enough.

```css
main {
  margin-inline: max(0px, 50% - 600px/2);
}
```

I am using `max()` to avoid getting negative values on small screens. In other words, I am clamping the value to `0`.

Let's suppose that the `margin` is equal to `100px` at some points. If an element inside the container has a margin equal to the opposite (i.e. `-100px`) it will negate the previous margin and extend to the full width of the container.

<CodePen
  user="t_afif"
  slug-hash="gbYKXMb"
  title="Negate margin"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Do you see the trick now? The same margin used to set the `max-width` and center the main container is also used (with a negative sign) on the “full-bleed” elements to make them “bleed” outside the container and extend to the edge of the screen!

```css
main {
  --_m: max(0px, 50% - 600px/2);
  margin-inline: var(--_m);
}
.full-bleed {
  margin-inline: calc(-1 * var(--_m));
}
```

The margin is defined as a custom property and is used twice: on the main container, and with a negative sign on the “full-bleed” class.

It looks perfect but the above code won't work! Be careful — I've tricked you!

We are using *percentage* values which means the reference for the calculation is not the same for both elements so both margins will never be equal (I know: percentages are always frustrating).

I think you know what will be the solution, right? We rely on the `cqw` unit we detailed previously to make sure the reference is always the same (the width of the page while considering the scrollbar).

With that our puzzle is complete! A full-bleed layout with a simple code:

```css
html {
  container-type: inline-size;
}
main {
  --_m: max(0px, 50cqw - 600px/2);
  margin-inline: var(--_m);
}
.full-bleed {
  margin-inline: calc(-1 * var(--_m));
}
```

As a bonus, you can replace the `0px` inside the `max()` function with any value and it act as a “minimum margin”. That is, the `margin` that your main container will have on small screens.

---

## Another way to write the code

Now that we know how it works, let's re-write the code in a bit more friendly-to-read way:

```css
html {
  container-type: inline-size;
}
main {
  --w: 600px; /* the max-width */
  --m: 1em;   /* margin on small screen */
  margin-inline: max(   var(--m),50cqw - var(--w)/2);
}
.full-bleed {
  margin-inline: min(-1*var(--m),var(--w)/2 - 50cqw);
  /* same as
  margin-inline: calc(-1*max(var(--m),50cqw - var(--w)/2))  
  */
}
```

This is *slightly* better because all you have to do is update a few custom property values. With this syntax, we can also create more variations where we can update the margin behavior of the “full-bleed” elements.

If, for example, we replace `-1*var(--m)` with `0px`

```css
.full-bleed {
  margin-inline: min(0px, var(--w)/2 - 50cqw);
}
```

The elements will have a `margin` equal to `--m` on small screens. In other words, the elements lose their “bleed-out” behavior on small screens.

I came up with a total of four variations (including the default one):

```css
.full-bleed-1 {
  margin-inline: min(-1*var(--m),var(--w)/2 - 50cqw);
}
.full-bleed-2 {
  margin-inline: min(-1*var(--m),var(--w)/2 - 50cqw + var(--m));
}
.full-bleed-3 {
  margin-inline: min(        0px,var(--w)/2 - 50cqw);
}
.full-bleed-4 {
  margin-inline: min(        0px,var(--w)/2 - 50cqw + var(--m));
}
```

Here is a demo to illustrate the behavior of each one. [Make it full screen (<VPIcon icon="fa-brands fa-codepen"/>`t_afif`)](https://codepen.io/t_afif/full/PwYYMRX) and resize it to understand each variation.

<CodePen
  user="t_afif"
  slug-hash="PwYYMRX"
  title="Full-bleed layout variations"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Restricting the Content of the Full Bleed Section to the Same Width as the Rest of the Main Content

Let's end with one last demo where it's only [**the background color that extends to the edge of the screen**](/css-tip.com/overflowing-background.md). The content is still restricted to the same maximum width as everything else. This is a particular case of full-bleed layout where we don't need to mess with margin and complex calculation, and has an entirely different trick up it's sleeve. I'll leave it to you to poke at the code and see it.

<CodePen
  user="t_afif"
  slug-hash="oNEaqQX"
  title="Full screen background color"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

This demo relies on a single line of code where I'm using the outset feature of `border-image` to have overflowing coloration on both sides. The `border-image` property is a bit tricky to grasp, but I have a detailed article if you want to learn more about it: “[**The Complex but Awesome CSS border-image Property**](/smashingmagazine.com/css-border-image-property.md)“.

---

## Conclusion

Cool, right? Not only have we created a full-bleed layout with compact code but we can easily adjust it to control the margin behavior of the elements. Can you think of other variations? I am sure we could tweak the formulas to have other useful and interesting behaviors. The comment section is down below if you have some good ideas.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Full-Bleed Layout with Modern CSS",
  "desc": "Just four declarations in CSS can handle this nicely, while avoiding the vertical scrollbar issue. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/full-bleed-layout-with-modern-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
