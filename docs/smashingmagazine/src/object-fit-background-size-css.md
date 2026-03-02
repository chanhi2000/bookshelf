---
lang: en-US
title: "A Deep Dive Into object-fit And background-size In CSS"
description: "Article(s) > A Deep Dive Into object-fit And background-size In CSS"
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
      content: "Article(s) > A Deep Dive Into object-fit And background-size In CSS"
    - property: og:description
      content: "A Deep Dive Into object-fit And background-size In CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/object-fit-background-size-css.html
prev: /programming/css/articles/README.md
date: 2021-10-25
isOriginal: false
author:
  - name: Ahmad Shadeed
    url: https://smashingmagazine.com/author/ahmad-shadeed/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/19e7f717-46d5-4949-96f4-671f4744d0e1/object-fit-background-size-css.jpg
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
  name="A Deep Dive Into object-fit And background-size In CSS"
  desc="If we use a width and height that isn’t proportional to the image’s aspect ratio, the image might either be compressed or stretched. That isn’t good, and it can be solved either with object-fit for an img element or by using background-size. In this article, Ahmad Shadeed will go through how `object-fit` and `background-size` work, when you can use them, and why, along with some practical use cases and recommendations. Let’s dive in."
  url="https://smashingmagazine.com/2021/10/object-fit-background-size-css/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/19e7f717-46d5-4949-96f4-671f4744d0e1/object-fit-background-size-css.jpg"/>

If we use a width and height that isn’t proportional to the image’s aspect ratio, the image might either be compressed or stretched. That isn’t good, and it can be solved either with object-fit for an img element or by using background-size. In this article, Ahmad Shadeed will go through how `object-fit` and `background-size` work, when you can use them, and why, along with some practical use cases and recommendations. Let’s dive in.

We’re not always able to load different-sized images for an HTML element. If we use a width and height that isn’t proportional to the image’s aspect ratio, the image might either be compressed or stretched. That isn’t good, and it can be solved either with `object-fit` for an `img` element or by using `background-size`.

First, let’s define the problem. Consider the following figure:

![A good-looking photo that gets squeezed when used in a card component.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fb4530e2-8132-4b2c-8571-5c17403b691c/1-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fb4530e2-8132-4b2c-8571-5c17403b691c/1-object-fit-vs-css-background-size.jpg)

Why is this happening?

An image will have an aspect ratio, and the browser will fill the containing box with that image. If the image’s aspect ratio is different than the width and height specified for it, then the result will be either a squeezed or stretched image.

We see this in the following figure:

![The image’s aspect ratio is different than the containing box, and the image gets stretched.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ce9612f8-1aaf-48a1-ab7e-8602cffa254f/2-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ce9612f8-1aaf-48a1-ab7e-8602cffa254f/2-object-fit-vs-css-background-size.jpg)

---

## The Solution

We don’t always need to add a different-sized image when the aspect ratio of the image doesn’t align with the containing element’s width and height. Before diving into CSS solutions, I want to show you how we used to do this in photo-editing apps:

![First, we would center the image vertically, and then clip in a mask. This retains the image’s aspect ratio and prevents it from being squeezed.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2592a2fd-4af4-463c-a923-36c7400d016a/3-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2592a2fd-4af4-463c-a923-36c7400d016a/3-object-fit-vs-css-background-size.jpg)

Now that we understand how that works, let’s get into how this works in the browser. (*Spoiler alert: It’s easier!*)

---

## CSS `object-fit`

The `object-fit` property defines how the content of a replaced element such as `img` or `video` should be resized to fit its container. The default value for `object-fit` is `fill`, which can result in an image being squeezed or stretched.

Let’s go over the possible values.

---

## Possible Values For `object-fit`

### `object-fit: contain`

In this case, the image will be resized to fit the aspect ratio of its container. If the image’s aspect ratio doesn’t match the container’s, it will be letterboxed.

![When using `object-fit: contain`, the image will be either letterboxed or resized accordingly.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b89f31a5-2331-4e8b-83b6-1e4236ab9c3f/4-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b89f31a5-2331-4e8b-83b6-1e4236ab9c3f/4-object-fit-vs-css-background-size.jpg)

### `object-fit: cover`

Here, the image will also be resized to fit the aspect ratio of its container, and if the image’s aspect ratio doesn’t match the container’s, then it will be clipped to fit.

![When using `object-fit: cover`, the image will be either clipped to fit or resized accordingly.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2014cca8-1d63-4ba4-972a-8df125d95ff1/5-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2014cca8-1d63-4ba4-972a-8df125d95ff1/5-object-fit-vs-css-background-size.jpg)

### `object-fit: fill`

With this, the image will be resized to fit the aspect ratio of its container, and if the image’s aspect ratio doesn’t match the container’s, it will be either squeezed or stretched. We don’t want that.

![When using `object-fit: fill`, the image will be squeezed, stretched, or resized accordingly.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/25952e19-9887-4c23-a82e-c99526abbc99/6-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/25952e19-9887-4c23-a82e-c99526abbc99/6-object-fit-vs-css-background-size.jpg)

### `object-fit: none`

In this case, the image won’t be resized at all, neither stretched nor squeezed. It works like the `cover` value, but it doesn’t respect its container’s aspect ratio.

![When using `object-fit: none`, the image won’t be resized if the its dimensions are not the same.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/26496e78-d65c-4adb-a181-9f018552f3e9/7-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/26496e78-d65c-4adb-a181-9f018552f3e9/7-object-fit-vs-css-background-size.jpg)

Aside from `object-fit`, we also have the `object-position` property, which is responsible for positioning an image within its container.

---

## Possible Values For `object-position`

The `object-position` property works similar to CSS’ `background-position` property:

![Most of the time, the default value is used (i.e. `center` or `50% 50%`).<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c59111ec-674f-40b0-9291-e33a51b5c595/8-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c59111ec-674f-40b0-9291-e33a51b5c595/8-object-fit-vs-css-background-size.jpg)

The `top` and `bottom` keywords also work when the aspect ratio of the containing box is vertically larger:

![Comparing `object-position: top` (left) and `object-position: bottom` (right).<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/46e538d2-7f9e-464f-9859-3e8b9da4b8e7/9-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/46e538d2-7f9e-464f-9859-3e8b9da4b8e7/9-object-fit-vs-css-background-size.jpg)

---

## CSS `background-size`

With `background-size`, the first difference is that we’re dealing with the background, not an HTML (`img`) element.

### Possible Values For `background-size`

The possible values for `background-size` are `auto`, `contain`, and `cover`.

### `background-size: auto`

With `auto`, the image will stay at its default size:

![Keep in mind that the default size may sometimes result in a blurry image (if it’s too small).<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/96a07dc6-3ae3-4cfe-859f-87c3b75037fb/10-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/96a07dc6-3ae3-4cfe-859f-87c3b75037fb/10-object-fit-vs-css-background-size.jpg)

### `background-size: cover`

Here, the image will be resized to fit in the container. If the aspect ratios are not the same, then the image will be masked to fit.

![When using `background-size: cover`, make sure to consider the aspect ratios of an image.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6a91ed8b-23f0-4e90-9b47-187fe742cfed/11-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6a91ed8b-23f0-4e90-9b47-187fe742cfed/11-object-fit-vs-css-background-size.jpg)

### `background-size: contain`

In this case, the image will be resized to fit in the container. If the aspect ratios are off, then the image will be letterboxed as shown in the next example:

![`background-size: contain` resizes the image to fit in the container.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3cdcccbf-88ae-46ac-98d9-7596fa160535/12-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3cdcccbf-88ae-46ac-98d9-7596fa160535/12-object-fit-vs-css-background-size.jpg)

As for `background-position`, it’s similar to how `object-position` works. The only difference is that the default position of `object-position` is different than that of `background-position`.

---

## When Not To Use `object-fit` Or `background-size`

If the element or the image is given a fixed height and has either `background-size: cover` or `object-fit: cover` applied to it, there will be a point where the image will be too wide, thus losing important detail that might affect how the user perceives the image.

Consider the following example in which the image is given a fixed height:

```css
.card__thumb {
  height: 220px;
}
```

![The image shown on the right is too wide because it has a fixed height while the card’s container is too wide.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6fad9813-b8a6-4b98-9f05-514c2100bfe4/13-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6fad9813-b8a6-4b98-9f05-514c2100bfe4/13-object-fit-vs-css-background-size.jpg)

If the card’s container is too wide, it will result in what we see on the right (an image that is too wide). That is because we are not specifying an aspect ratio.

There is only one of two fixes for this. The first is to use the [**padding hack**](/alistapart.com/creating-intrinsic-ratios-for-video.md) to create an intrinsic ratio.

```css
.card__thumb {
  position: relative;
  padding-bottom: 75%;
  height: 0;
}

.card__thumb img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

The second fix is to use the new `aspect-ratio` CSS property. Using it, we can do the following:

```css
.card__thumb img {
  aspect-ratio: 4 / 3;
}
```

::: note

I’ve already written about the `aspect-ratio` property in detail in case you want to learn about it: “[**Let’s Learn About Aspect Ratio In CSS**](/ishadeed.com/css-aspect-ratio.md)”.

:::

---

## Use Cases And Examples

### User Avatars

A perfect use case for `object-fit: cover` is user avatars. The aspect ratio allowed for an avatar is often square. Placing an image in a square container could distort the image.

![A comparison of a user avatar without `object-fit` and with `object-fit: cover`.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c6370423-39f5-4ae9-b3c1-ea92a6492a91/14-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c6370423-39f5-4ae9-b3c1-ea92a6492a91/14-object-fit-vs-css-background-size.jpg)

```css
.c-avatar {
  object-fit: cover;
}
```

### Logos List

Listing the clients of a business is important. We will often use logos for this purpose. Because the logos will have different sizes, we need a way to resize them without distorting them.

Thankfully, `object-fit: contain` is a good solution for that.

```css
.logo__img {
  width: 150px;
  height: 80px;
  object-fit: contain;
}
```

![Using `object-fit: contain` can help us resize clients’ logos without distorting them.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/29bc3a9c-e2d7-4c8b-8a41-d12200edd257/15-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/29bc3a9c-e2d7-4c8b-8a41-d12200edd257/15-object-fit-vs-css-background-size.jpg)

### Article Thumbnail

This is a very common use case. The container for an article thumbnail might not always have an image with the same aspect ratio. This issue should be fixed by the content management system (CMS) in the first place, but it isn’t always.

```css
.article__thumb {
  object-fit: cover;
}
```

![Adjusting article thumbnails with a bit of help from `object-fit: cover`.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a5a9bc9d-2446-4014-9a2a-9eb21cd5cd48/16-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a5a9bc9d-2446-4014-9a2a-9eb21cd5cd48/16-object-fit-vs-css-background-size.jpg)

### Hero Background

In this use case, the decision of whether to use an `img` element or a CSS background will depend on the following:

- Is the image important? If CSS is disabled for some reason, would we want the user to see the image?
- Or is the image’s purpose merely decorative?

Based on our answer, we can decide which feature to use. If the image is **important**:

![Let’s suppose that the image is important, because it’s a food-related website. 😉<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b6ed2e85-f185-4387-9ebf-33a148bcf911/17-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b6ed2e85-f185-4387-9ebf-33a148bcf911/17-object-fit-vs-css-background-size.jpg)

```html
<section class="hero">
  <img class="hero__thumb" src="thumb.jpg" alt="" />
</section>
```

```css
.hero {
  position: relative;
}

.hero__thumb {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;    
}
```

If the image is **decorative**, we can go with `background-image`:

```css
.hero {
  position: relative;
  background-image: linear-gradient(to top, #a34242, rgba(0,0,0,0), url("thumb.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
```

The CSS is shorter in this case. Make sure that any [**text placed over the image**](/ishadeed.com/handling-text-over-image-css.md) is readable and accessible.

### Adding A Background To An Image With `object-fit: contain`

Did you know that you can add a background color to `img`? We would benefit from that when also using `object-fit: contain`.

In the example below, we have a grid of images. When the aspect ratios of the image and the container are different, the background color will appear.

```css
img {
  object-fit: contain;
  background-color: #def4fd;
}
```

![We can use `object-fit: contain` to add a background color to an image.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c7f0ee22-0621-4329-aa03-2ac78f55bbd5/18-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c7f0ee22-0621-4329-aa03-2ac78f55bbd5/18-object-fit-vs-css-background-size.jpg)

### Video Element

Have you ever needed a `video` as a background? If so, then you probably wanted it to take up the full width and height of its parent.

```css
.hero {
  position: relative;
  background-color: #def4fd;
}

.hero__video {
  position: aboslute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
```

![The default `object-fit` value for the `video` element is `contain`. As you can see here, the video doesn’t cover the hero background, even though it has `position: absolute`, `width: 100%`, and `height: 100%`.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6e3bb7a1-b82c-4459-849f-a0dbb81fbbee/19-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6e3bb7a1-b82c-4459-849f-a0dbb81fbbee/19-object-fit-vs-css-background-size.jpg)

To make it fully cover the width and height of its parent, we need to override the default `object-fit` value:

```css
.hero__video {
  /* other styles */
  object-fit: cover;
}
```

![Now the video covers the full width and height of its parent.<br/>([<VPIcon icon="fa-brands fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b524670a-5a57-44f7-a0b8-53c5b0d00108/20-object-fit-vs-css-background-size.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b524670a-5a57-44f7-a0b8-53c5b0d00108/20-object-fit-vs-css-background-size.jpg)

---

## Conclusion

As we’ve seen, both `object-fit` and `background-size` are very useful for handling different image aspect ratios. We won’t always have control over setting the perfect dimensions for each image, and that’s where these two CSS features shine.

A friendly reminder on the accessibility implications of choosing between an `img` element and a CSS background: If the image is purely decorative, then go for a CSS background. Otherwise, an `img` is more suitable.

I hope you’ve found this article useful. Thank you for reading.

::: info Further Reading

- [**Open-Source Meets Design Tooling With Penpot**](/smashingmagazine.com/open-source-meets-design-tooling-penpot.md)
- [**Sticky Headers And Full-Height Elements: A Tricky Combination**](/smashingmagazine.com/sticky-headers-full-height-elements-tricky-combination.md)

```component VPCard
{
  "title": "Useful DevTools Tips and Tricks",
  "desc": "Let’s discover the most popular DevTools tips that can boost your productivity and revolutionize your debugging workflow.",
  "link": "/smashingmagazine.com/popular-devtools-tips.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Lesser Known Uses Of Better Known Attributes**](/smashingmagazine.com/lesser-known-uses-better-known-attributes.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Deep Dive Into object-fit And background-size In CSS",
  "desc": "If we use a width and height that isn’t proportional to the image’s aspect ratio, the image might either be compressed or stretched. That isn’t good, and it can be solved either with object-fit for an img element or by using background-size. In this article, Ahmad Shadeed will go through how `object-fit` and `background-size` work, when you can use them, and why, along with some practical use cases and recommendations. Let’s dive in.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/object-fit-background-size-css.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
