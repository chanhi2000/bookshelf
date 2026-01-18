---
lang: en-US
title: "A Deep CSS Dive Into Radial And Conic Gradients"
description: "Article(s) > A Deep CSS Dive Into Radial And Conic Gradients"
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
      content: "Article(s) > A Deep CSS Dive Into Radial And Conic Gradients"
    - property: og:description
      content: "A Deep CSS Dive Into Radial And Conic Gradients"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-radial-conic-gradient.html
prev: /programming/css/articles/README.md
date: 2022-01-10
isOriginal: false
author:
  - name: Ahmad Shadeed
    url : https://smashingmagazine.com/author/ahmad-shadeed/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8b1eea9e-877a-4da7-b531-537a97a44613/css-radial-conic-gradient.jpg
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
  name="A Deep CSS Dive Into Radial And Conic Gradients"
  desc="CSS gradients are a useful CSS feature that can be used to create interesting UI effects or even help us in drawing something without the need to create HTML elements for it. In this article, we’ll be taking a closer look at two gradients: `conic-gradient` and `radial-gradient`. You’ll see how each one of them works in detail, what the differences and similarities are between them, how and where to use them, and some use cases for each."
  url="https://smashingmagazine.com/2022/01/css-radial-conic-gradient/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8b1eea9e-877a-4da7-b531-537a97a44613/css-radial-conic-gradient.jpg"/>

CSS gradients are a useful CSS feature that can be used to create interesting UI effects or even help us in drawing something without the need to create HTML elements for it. In this article, we’ll be taking a closer look at two gradients: `conic-gradient` and `radial-gradient`. You’ll see how each one of them works in detail, what the differences and similarities are between them, how and where to use them, and some use cases for each.

CSS gradients are a useful CSS feature that can be used to create interesting UI effects or even help us in drawing something without the need to create HTML elements for it. Two gradients that I would like to focus on in this article are `conic-gradient` and `radial-gradient`. Each one works differently (conic gradients are curved, while radial gradients are a straight line).

To follow along, you don’t need to know about either `radial-gradient` or `conic-gradient`. I will try my best to explain them in a good manner.

Let’s dive in!

---

## What Is A Radial Gradient?

From their name, `radial-gradient`s provide us with the ability to draw radial elements like a circle or an ellipse.

Let’s look at the most basic syntax.

### The Most Basic Example

In this example, we have a `radial-gradient` with two color stops. This resulted in an ellipse-shaped gradient.

```css
.element {
  background: radial-gradient(#9c27b0, #ff9800);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4d46b1c0-78ad-4cdc-8341-213df49b5464/1-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4d46b1c0-78ad-4cdc-8341-213df49b5464/1-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

The above is the most basic `radial-gradient` we can do in CSS. You might be wondering, why it defaulted to an ellipse? Well, let me explain.

If there is no shape name defined in the gradient (circle or ellipse), it will default to an ellipse in case:

- There is no size determined;
- Or, there are two values (for the width and height).

### How Does A Radial Gradient Work?

I will go through a series of visuals that will show how a gradient works by incrementing different keywords and additions.

First, let’s get back to the initial example.

```css
.element {
  background: radial-gradient(#9c27b0, #ff9800);
}
```

When there are two colors without identifying the shape, the gradient will default to an ellipse, like so:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a01c8959-6e9a-4d88-a308-761e10dea712/2-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a01c8959-6e9a-4d88-a308-761e10dea712/2-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

The ellipse is filling the width and height of its container. It looks blurred because the browser assumed that the start and stop points are `0%` and `100%`, respectively.

Here is how the browser sees the gradient:

```css
.element {
  background: radial-gradient(#9c27b0 0%, #ff9800 100%);
}
```

If we append `circle` before the first color stop, then this is how it looks:

```css
.element {
  background: radial-gradient(circle, #9c27b0, #ff9800);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e116977c-ae61-4ca5-b4d5-b54ce021cb7a/3-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e116977c-ae61-4ca5-b4d5-b54ce021cb7a/3-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Now that you have an idea about how the circle and the ellipse look like by default, let’s get into **positioning**.

By default, both of them are centered horizontally and vertically in their container. In other words, at `50% 50%`:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/97d9707e-7fe6-4bf0-9dd1-a0303d6d7408/4-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/97d9707e-7fe6-4bf0-9dd1-a0303d6d7408/4-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

The important thing to notice here is that the positioning happens from the center of the circle or ellipse, so we position a circle at the `top left`, **what will be positioned is the center point**.

Let’s take a closer look at a few examples.

```css
.element {
  background: radial-gradient(circle at top left, #9c27b0, #ff9800);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/359e5216-94e1-4c08-9ed3-298647be077d/5-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/359e5216-94e1-4c08-9ed3-298647be077d/5-de-conic-gradient.jpeg)

We could also center it on the right side. Adding only `right` will center the circle on the `right 50%`:

```css
.element {
  background: radial-gradient(circle at right, #9c27b0, #ff9800);
}
```

Here is how it looks:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a13d194d-d89b-4fc1-9549-100f2df1d704/6-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a13d194d-d89b-4fc1-9549-100f2df1d704/6-de-conic-gradient.jpeg)

---

## What Is A Conic Gradient?

The `conic-gradient()` CSS function creates a gradient that is rotated around the center of the element. Let’s see a basic example.

```css
.element {
  background: conic-gradient(#9c27b0, #ff9800);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/365acdbb-bfe5-4804-87bd-93179286be55/7-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/365acdbb-bfe5-4804-87bd-93179286be55/7-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Look at how the gradient starts from the center point of the element. It rotates from `0deg` to `360` by default.

Let’s see what happens when we add a hard stop value for the first color.

```css
.element {
  background: conic-gradient(#9c27b0 50%, #ff9800);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ac39eb65-5d1b-4019-9da2-a65fb5489965/8-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ac39eb65-5d1b-4019-9da2-a65fb5489965/8-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Now the first color fills `50%` of the element, while the second one will gradually be shown till `100%`.

What happens if we apply a hard stop on the second color, too? In the snippet below, the first color will fill `50%` of the element, the second one will start from `50%` to the end (`100%`).

```css
.element {
  background: conic-gradient(#9c27b0 50%, #ff9800 0);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/49dd5464-8362-4d4b-bf31-795331b6dab2/9-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/49dd5464-8362-4d4b-bf31-795331b6dab2/9-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Increasing the first color stop value will create an angled fill:

```css
.element {
  background: conic-gradient(#9c27b0 65%, #ff9800 0);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b69ebcc0-bff0-4506-8bd5-f5a50b3f22da/10-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b69ebcc0-bff0-4506-8bd5-f5a50b3f22da/10-det-conic-gradient.jpeg)

Not only that, but we can also create a repeating gradient using the CSS function `repeating-conic-gradient()` as shown below.

```css
.element {
  background: repeating-conic-gradient(
  #9c27b0 0 15deg,
  #ff9800 15deg 30deg
  );
}
```

The above snippets fill the first color from `0deg` to `15deg`, then the second color is filled from `15deg` to `30deg`. With repetition, it will look like the figure below:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7122e1d5-cb63-49b6-82a9-aa9af037aba6/11-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7122e1d5-cb63-49b6-82a9-aa9af037aba6/11-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

---

## Use Cases For Radial Gradients

Oftentimes, we need to add an illustration or a pattern as a background. In case there is a headline and/or secondary text, it might be difficult to read them, of course.

### `radial-gradient` In A Hero Section

Using an ellipse gradient with the same color as the background can help make the content stand out. In the following example, notice how the content is overlapped with the background. It makes it a bit hard to focus on reading than looking at the pattern:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2dc708f5-07e9-4e1d-abd7-af2c56e1b633/12-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2dc708f5-07e9-4e1d-abd7-af2c56e1b633/12-det-conic-gradient.jpeg)

A common fix for that is to add an ellipse with the same color as the background underneath (to make it blend with it).

Here is the hero section with the ellipse (colored in grey, just for demo purposes):

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a6a3875a-245a-4478-a9b7-d4d1a0dd91b6/13-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a6a3875a-245a-4478-a9b7-d4d1a0dd91b6/13-det-conic-gradient.jpeg)

Here is how to reflect that in CSS:

```css
.hero {
  background-color: #fbfafa;
  background-image: radial-gradient(#fbfafa, rgba(0,0,0,0) center/70% 70% no-repeat, url("hero-bg.svg");
  background-position: center;
  background-size: 70% 70%, cover;
  background-repeat: no-repeat;
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/15942354-bea0-4a74-a817-b3aaeec05661/14-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/15942354-bea0-4a74-a817-b3aaeec05661/14-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

That way, we covered the pattern under the content, it’s much easier to read it now.

### Dotted Pattern Effect

In order to create an effect of a dotted pattern, we can use `radial-gradient`. Here is how it looks:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/24a08e53-10fe-4c19-87b4-3e37b4c4eb1d/15-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/24a08e53-10fe-4c19-87b4-3e37b4c4eb1d/15-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

To achieve that, we can create a tiny circle and the rest of the gradient will be transparent.

Here is how it looks on its own:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c0fbaf99-b4b7-47d7-8f65-34c0e62571d3/16-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c0fbaf99-b4b7-47d7-8f65-34c0e62571d3/16-det-conic-gradient.jpeg)

When this pattern is repeated, here is how it looks:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/23a5e68a-dfcd-48cd-ada6-f96cd5ae3c66/17-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/23a5e68a-dfcd-48cd-ada6-f96cd5ae3c66/17-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

To reflect that in CSS, we need to add a width and height for the gradient. Since gradients repeat by default, it will result in the above pattern.

```css
.dot-pattern {
  --color-1: #9c27b0;
  --color-2: rgba(0,0,0,0);
  background-image: radial-gradient(circle at 2px 2px, var(--color-1) 1px, var(--color-2) 0);
  background-size: 15px 15px;
}
```

### Image Effects

Combined with `mix-blend-mode`, radial gradients can create some interesting UI effects for images. In the following example, notice how the circle is positioned at the top-left corner. We can take benefit from that by playing with blend modes to achieve a specific effect.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0ebcc6cb-ef15-4871-a7a9-f2d653d04ff9/18-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0ebcc6cb-ef15-4871-a7a9-f2d653d04ff9/18-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

```css
.thumb:after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, #9c27b0, #ff9800);
    mix-blend-mode: hard-light;
    opacity: 0.4;
}
```

---

## Use Cases For Conic Gradients

### Pie Charts

The first use case that I can think of for conic gradients is simple pie charts. It’s been a thing that we want to do in CSS a while ago, and now it’s possible with ease.

![A simple pie chart ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1fd602f0-7e30-463f-a168-ab7e6e666861/19-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1fd602f0-7e30-463f-a168-ab7e6e666861/19-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

```css
.pie-chart {
  width: 100px;
  height: 100px;
  background: conic-gradient(from 0deg, #b2daf9 128deg, #2096f3 0);
  border-radius: 50%;
}
```

### Backgrounds And Patterns

There are tons of possibilities to create a pattern with conic gradients. For this example, I will focus on the checkerboard pattern.

![A 2×2 checkerboard pattern achieved with `conic-gradient()`. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d37b8645-92db-4386-913f-bc18f9c0d818/20-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d37b8645-92db-4386-913f-bc18f9c0d818/20-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Here is what happens in the following gradient:

- The `#fff` color is covering `90deg` of the element;
- Then it’s followed by `#000` till `180deg`;
- Then it’s followed by `#fff` till `270deg`;
- Finally, the `#000` filled till the end angle (`360deg`).

```css
.checkerboard {
  --size: 25px;
  width: 200px;
  height: 100px;
  background-image: conic-gradient(#fff 90deg, #000 0 180deg, #fff 0 270deg, #000 0);
  background-size: var(--size) var(--size);
}
```

When repeated and controlled via `background-size`, it will look like this:

![A preview of the checkerboard pattern that has been repeated several times. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cdee3d05-ccd4-4e4d-a3c6-99007361badb/21-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cdee3d05-ccd4-4e4d-a3c6-99007361badb/21-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Not only that, but we can achieve really interesting effects by rotating some values in a different way. Here is an example:

```css
.element {
  background-image: conic-gradient(#fff 90deg, #000 0 136deg, #fff 0 313deg, #000 0);
}
```

![Same checkboard pattern, but different. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/969cd3de-e8e8-43ef-a01c-225bf1648541/22-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/969cd3de-e8e8-43ef-a01c-225bf1648541/22-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

### UI Patterns

Sometimes, we might need to generate a random UI pattern that takes different shapes. We can use `conic-gradient` to achieve that. The idea is that we control the gradient size via `background-size`, and then change the `conic-gradient` angle to achieve different effects.

We have an element with a width and height of `200px`. Within this element, we will repeat the background.

```css
.element {
  --size: 20px;
  width: 200px;
  height: 200px;
  background-size: var(--size) var(--size);
}
```

To imagine it better, each background will have a size of `20px` for both width and height, and it will be repeated horizontally and vertically.

![An element (200×200px) which has a repeated background with a size of 20px. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/33a1810d-d54b-4c4f-add6-67d7c0cddb0d/23-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/33a1810d-d54b-4c4f-add6-67d7c0cddb0d/23-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

Now, each square you see will contain a `conic-gradient`. For now, I will add two blue shades to demonstrate the concept better.

```css
.element {
  --size: 20px;
  width: 200px;
  height: 200px;
  background: conic-gradient(#2296F3 0.13turn, rgba(255,255,255,0) 0);
  background-size: var(--size) var(--size);
}
```

This is how the conic gradient looks without repeating it:

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5733d088-1ded-4508-9505-716cfe682033/use-case-6-2.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fd/use-case-6-2.jpg)

With repeating, it looks like this. Now, the point is to make the second color transparent, which will result in a triangle shape.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9d79f3d1-c2d6-4355-9484-87b95f54ee1a/25-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9d79f3d1-c2d6-4355-9484-87b95f54ee1a/25-det-conic-gradient.jpeg)

By having a different angle, we can randomize the pattern shape to get interesting effects.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f5dd4c15-e04d-46f8-a260-39e250156537/26-deep-dive-into-css-radial-gradient-conic-gradient.jpeg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f5dd4c15-e04d-46f8-a260-39e250156537/26-deep-dive-into-css-radial-gradient-conic-gradient.jpeg)

### Animating Conic Gradients With `@property`

We can create interesting animation effects with `conic-gradient`. However, this isn’t possible by default. We need to use the `@property` definition to define a custom property that we’ll use for the animation.

```css
@property --conic-mask {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.conic-mask {
  --conic-mask: 0%;
  -webkit-mask: conic-gradient(from 0deg at 50% 50%, #000 var(--conic-mask), #0000);
  transition: --conic-mask 1s ease-out;
}

.conic-mask: hover {
  --conic-mask: 100%;
}
```

<VidStack src="vimeo/662947655" />

### Cut Corners With Custom Shapes

This is a demo by [Temani Afif (<VPIcon icon="fa-brands fa-codepen" />`smashingmag`)](https://codepen.io/smashingmag/pen/jOGKjxQ?editors=0100). The idea is to use `conic-gradient` as a mask to create cut-corners effects:

<CodePen
  user="smashingmag"
  slug-hash="jOGKjxQ"
  title="Cut corners with custom shape [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Conic Gradients

We can use `conic-gradient` to create subtle gradient effects that have corners darker or lighter corners with other colors. [<VPIcon icon="fas fa-globe"/>Conic.css](https://conic.style/) is a tiny CSS library by Adam Argyle that features lots of lovely conic gradients.

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/af96f6fb-4a13-420c-ac45-e680d4899f8f/28-deep-dive-into-css-radial-gradient-conic-gradient.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/af96f6fb-4a13-420c-ac45-e680d4899f8f/28-det-conic-gradient.png)

### Using Conic Gradients For Section Backgrounds

I saw this on a demo shared by Scott Kellum. I really liked the way the technique works to add a partial color to a footer while at the same time it looks smooth.

```css
.footer {
  background: conic-gradient(from 0.25turn at 25% 0%, #FFD9CE, rgba(#FFD9CE, 0) 50%);
}
```

![([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/77aaeda4-3123-4f9b-9063-1407c4671588/29-deep-dive-into-css-radial-gradient-conic-gradient.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/77aaeda4-3123-4f9b-9063-1407c4671588/29-det-conic-gradient.png)

::: info Check out the demo

<CodePen
  link="https://codepen.io/scottkellum/pen/adc8eafa0392e252adcb5341f07d2458"
  title="Conic gradient test"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## Conclusion

As you’ve seen, using CSS `radial-gradient` and `conic-gradient` functions can result in very interesting (and useful) UIs. However, there is no black and white when it comes to when to use each. Most of the time, it depends on the use case at hand.

I hope you find the article useful. Thanks a lot for reading!

::: info Further Reading

- [**A Deep Dive Into `object-fit` And `background-size` In CSS**](/smashingmagazine.com/object-fit-background-size-css.md)
- [**Common CSS Issues For Front-End Projects**](/smashingmagazine.com/common-css-issues-front-end-projects.md)
- [**Using HSL Colors In CSS**](/smashingmagazine.com/hsl-colors-css.md)
- [**Overflow Issues In CSS**](/smashingmagazine.com/css-overflow-issues.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Deep CSS Dive Into Radial And Conic Gradients",
  "desc": "CSS gradients are a useful CSS feature that can be used to create interesting UI effects or even help us in drawing something without the need to create HTML elements for it. In this article, we’ll be taking a closer look at two gradients: `conic-gradient` and `radial-gradient`. You’ll see how each one of them works in detail, what the differences and similarities are between them, how and where to use them, and some use cases for each.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-radial-conic-gradient.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
