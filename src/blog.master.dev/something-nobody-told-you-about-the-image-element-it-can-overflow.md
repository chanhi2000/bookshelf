---
lang: en-US
title: "Something Nobody Told You About The Image Element (It Can Overflow!)"
description: "Article(s) > Something Nobody Told You About The Image Element (It Can Overflow!)"
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
      content: "Article(s) > Something Nobody Told You About The Image Element (It Can Overflow!)"
    - property: og:description
      content: "Something Nobody Told You About The Image Element (It Can Overflow!)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/something-nobody-told-you-about-the-image-element-it-can-overflow.html
prev: /programming/css/articles/README.md
date: 2026-08-03
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10580
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
  name="Something Nobody Told You About The Image Element (It Can Overflow!)"
  desc="You normally don't think of images as overflowing themselves, nor can you put anything else inside to make it overflow, but actually..."
  url="https://blog.master.dev/something-nobody-told-you-about-the-image-element-it-can-overflow/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10580"/>

Adding images to a website is a pretty straightforward task. You grab your link, and you summon the image element like below:

```xml
<img src="your_link" alt="image content">
```

Then, you add your favorite CSS, and you have a nice-looking image!

What if I tell you that the most common element is hiding some secrets? You have been working with images for too long, but you have probably never noticed the little quirks I will show you here.

Think I am exaggerating? Follow along, and you will see!

---

## An Image Can Overflow

If you inspect the CSS code of an image element, you will notice default styles applied by the browsers, and one of them is `overflow: clip`.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/1RTape8R.png?resize=885%2C261&ssl=1)

It means that any overflow is clipped/hidden by default. We can, of course, change that and make the overflow visible:

```css
ìmg {
  overflow: visible;
}
```

*But what could overflow an image?* We are dealing with a single element that cannot contain any other element. There is no container-content relation to talk about overflowing!

Actually, an image element has content, and its content is the image resource. It’s confusing, right? Let’s make a figure to better understand:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/geP_asdr.png?resize=599%2C408&ssl=1)

The `<img>` element (the HTML element) is the “container”, and the image resource (the actual image) is loaded inside that “container” and becomes the “content”. We have our container-content relation so we can talk about overflow.

Even with this clarification, it’s hard to imagine how the content of the image can overflow, but there is a very common situation where this can happen. One CSS line that you know for sure:

```css
img {
  object-fit: cover;
}
```

Here is a demo where you can **hover** the image to show/hide the overflow:

<CodePen
  link="https://codepen.io/t_afif/pen/xbgydXM/22b48d72cecc0e4cb01c625c66707065"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Surprising, right? The `object-fit: cover;` declaration tries to maintain the intrinsic ratio of the image to avoid any distortion. This generally means that some parts of the image get clipped. To be more precise, the image “content” is bigger than the image “container,” leading to some overflow. That overflow is, by default, clipped, but we can change that.

An image can overflow… itself!

What if I tell you there is another well-known property that can make an image overflow?

Think about it.

Yes, you know it very well!

You got it?

It’s `border-radius`! The image, which is a rectangle, can overflow its rounded corners.

<CodePen
  link="https://codepen.io/t_afif/pen/bNgmvQQ/c2675c2a45e6c6c172a75707a3d218c1"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Another less common situation where an image can overflow is when using `object-position`.

```css
img {
  object-position: 50px 0;
}
```

The above will translate the image content by `50px` from the left without affecting the image element (the container), which will logically create an overflow.

<CodePen
  user="https://codepen.io/t_afif/pen/XJpxRZx/df78c3597680d45f5c2af2739cf9960f"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Yet another overflow! We will see a bit later how this feature can be used to create some cool demos.

---

## `object-fit: none`

When talking about the `object-fit` property, everyone thinks of the `cover` and `contain` values, but if you check [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/css-images-3/#the-object-fit), you will find more values, and one of them is interesting: the `none` value.

::: info <code>none</code>

The replaced content is not resized to fit inside the element’s content box

:::

It has quite a strange definition, and **no**, it’s not the default value. To better understand what it does, let’s consider the following configuration:

```css
img {
  width: 80vw;
  height: 80vh;
  object-fit: none;
}
```

<CodePen
  link="https://codepen.io/t_afif/pen/XJpxREy/895fe2e56b3cacadccad180911a15715"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Do you see what is happening?

The image element (the container) is sized using the viewport dimension (it has a variable size), but the image resource (the content) keeps a fixed dimension, which is the intrinsic size of the image resource (300 x 300 in our case).

As the definition states, the content is not resized. Regardless of the image dimension you set using CSS, the content will remain fixed. This means we can also have overflow when using `object-fit: none` if the image element is smaller than its content.

::: note

But what is the default value of `object-fit`?

:::

It’s the `fill` value, and it has the exact opposite effect to the `none` value.

::: info <code>fill</code>

The replaced content is sized to fill the element’s content box

:::

Whatever the size of the image resource (its intrinsic size), it will always get sized to fit the size of the image element set using CSS.

Here is the previous demo with the ability to change the `object-fit` value. Open the demo in full screen and resize the page to better understand the effect of each value.

<CodePen
  link="https://codepen.io/t_afif/pen/RNKeMaK/d47d68b7fc433788fad7b12bf51c9021"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

If you are a bit lost and confused, don’t worry. You were used to considering the `<img>` element as a simple element that shows an image, but it’s more complex than that. It’s both a container and its content at the same time, with two sizes that can be controlled separately. Not to mention the ability to make its own content overflow.

If we want to be accurate, an image is a [<VPIcon icon="iconfont icon-w3c"/>“replaced element”](https://w3.org/TR/css-display-3/#replaced-element). You have surely heard about that strange term without understanding what it means, but with what we saw, it should be clearer.

::: info *replaced element*

An element whose content is outside the scope of the CSS formatting model, such as an image or embedded document. For example, the content of the HTML `img` element is often replaced by the image that its `src` attribute designates.

Replaced elements often have natural dimensions. For example, a bitmap image has a natural width and a natural height specified in absolute units (from which the natural ratio can obviously be determined)

The content of replaced elements is not considered in the CSS formatting model; however, their natural dimensions are used in various layout calculations

:::

Enough theory. Let’s see some cool demos.

---

## Show Me The Demos!

Here is a fancy hover effect that places the image inside its frame with a nice transition.

<CodePen
  user="anon"
  slug-hash="azpRWrg"
  title="Frame hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

Another idea with a 3D effect:

<CodePen
  user="anon"
  slug-hash="bNgmRGa"
  title="3D hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

Where is the image? Hover to reveal it!

<CodePen
  user="anon"
  slug-hash="YPNJajx"
  title="Reveal hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

An effect that we can combine with `@starting-style` to create a nice entry animation:

<CodePen
  user="anon"
  slug-hash="vEgVRZm"
  title="Entry effect"
  :default-tab="['css','result']"
  :theme="dark"/>

And why not that famous screen loader with a single image element:

<CodePen
  user="anon"
  slug-hash="ogBawYL"
  title="Screen saver codepen version"
  :default-tab="['css','result']"
  :theme="dark"/>

You make sure the intrinsic dimension of the image is smaller than the CSS dimension, you set `object-fit: none`, then you animate `object-position`.

```css
img {
  object-fit: none;
  object-position: 0% 0%;  
  animation: 
    x 2.1s infinite linear alternate,
    y 3.3s infinite linear alternate;
  animation-composition: add;
}
@keyframes x {
  to {object-position: 100% 0}
}
@keyframes y {
  to {object-position: 0 100%}
}
```

The `animation-composition: add` allows me to animate each axis individually and have an additive effect of both. You can learn more about it here: “[**How to Control Infinite CSS Animations**](/blog.master.dev/how-to-control-infinite-css-animations-part-1-of-2.md)”

Let’s end with some fancy decoration [**powered by `corner-shape`**](/blog.master.dev/drawing-css-shapes-using-corner-shape.md) (Chrome-only for now).

<CodePen
  user="anon"
  slug-hash="WbRazPP"
  title="Fancy decoration using corner-shape"
  :default-tab="['css','result']"
  :theme="dark"/>

Worth noting that all the demos can be created with common techniques that are more intuitive. I am not here to push to use those obscure techniques, but the main advantage is that I don’t have to rely on additional elements or pseudo-elements. If you are in a situation where you cannot control the HTML structure, then those tricks can be handy.

---

## Conclusion

Do you still think the image is a simple element? Even old, well-known stuff can hide strange mechanisms we can turn into fancy CSS tricks. Now go impress your colleagues and friends with this: “Hey, do you know that an image can overflow itself? Let me show you!”

Want a last trick before we end? Check this: [**How to style a broken image**](/css-tip.com/broken-image.md). It’s probably another feature you don’t know about images!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Something Nobody Told You About The Image Element (It Can Overflow!)",
  "desc": "You normally don't think of images as overflowing themselves, nor can you put anything else inside to make it overflow, but actually...",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/something-nobody-told-you-about-the-image-element-it-can-overflow.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
