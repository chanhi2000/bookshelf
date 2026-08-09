---
lang: en-US
title: "Animating CSS border-image"
description: "Article(s) > Animating CSS border-image"
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
      content: "Article(s) > Animating CSS border-image"
    - property: og:description
      content: "Animating CSS border-image"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/animating-css-border-image.html
prev: /programming/css/articles/README.md
date: 2026-08-10
isOriginal: false
author:
  - name: Preethi
    url: https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/css-border-image-animations.jpg
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
  name="Animating CSS border-image"
  desc="Border images are an overlooked feature. One neat fact is that border image slices can run across entire borders on an element, and animating it creates beautiful effects."
  url="https://css-tricks.com/animating-css-border-image"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/css-border-image-animations.jpg"/>

The CSS `border-image` property is one of those features we take for granted. And it’s not new at all! In fact, [**Andy Clarke has a fairly recent article**](/css-tricks.com/revisiting-css-border-image.md) that “revisits” the property and shows just how creative we can get with it. Go read that article — it’s worth it.

The TL;DR is that we can use an image or gradient as a border instead of standard (*ahem*, boring) styles, say, solid or dashed border lines. What I want to do is take them a little further to show how we can animate border images for even more interesting user interfaces!

Like this:

<CodePen
  user="anon"
  slug-hash="ByQQJQj"
  title="Border image animations"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Why border images at all?

There’s a pretty big caveat to border images: **they** **don’t curve to border shapes.** That’s a big limitation for an animation that travels around an element like we’re doing here. But we can work around that for this example.

But that also begs the question: *“Why work around that if there are other approaches?”* Just look at Temani Afif’s approach that uses a CSS mask (he has a [**great write-up**](/css-tip.com/speed-control.md) on it):

<CodePen
  user="anon"
  slug-hash="RNoNJLW"
  title="Glowing border Animation with hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

I like `border-image` because it’s super efficient, especially when it comes to animating border images and gradients. Mainly because it’s easy to replicate the designs across all the borders — it’s automatic — and also because we can “slice” the images using the `border-image-slice` property. It’s similar to `background-size` and `background-position` where a single slice of the image can be used. However the border image slices can run across the entire borders, and animating it creates beautiful effects, as you’ll see.

---

## The HTML

We’re doing nothing crazy here. Just a `div` that contains a bit of formatted text in it:

```html
<div class=card><strong>Bruce Wayne</strong></div>
```

What about the image? That’s set up as a CSS background, so let’s jump right in that.

---

## Base styles

We’re giving the `.card` set dimensions then dropping in a background image on it:

```css
.card {
  width: 150px;
  aspect-ratio: 0.69;
  position: relative;
  background: center/90% no-repeat;
  background-image: url("batman.jpg");
}
```

Cool, cool. I’m also adding a little styling to the text to make sure it’s not right on top of the background:

<CodePen
  user="anon"
  slug-hash="azBJOKg"
  title="Border image animation 1"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The border image

I’ll be using a single-color CSS gradient because (1) it’s a type of background image and (2) it’s a little easier to demonstrate the animation.

I’ll also set all the values of `border-image` separately in their own longhand properties, so it’s clearer for you to know which value affects the gradient in which way.

Let’s start with the effect of a simple `linear-gradient`:

```css
.card {
  /* ... */

  /* Creates a linear color */
  border-image-source: linear-gradient(-45deg, red 0%, transparent 0%);
  
  /* Controls how the gradient is carved */
  border-image-slice: 1;

  /* Sets the physical thickness of the border */
  border-image-width: 5px;
} 
```

You may have noticed in the demo that there is a little gap between the animated border and the image. We can push the border away from the `.card` using the `border-image-outset` property:

```css
.card {
  /* ... */

  border-image-source: linear-gradient(-45deg, red 0%, transparent 0%);
  border-image-slice: 1;
  border-image-width: 5px;

  /* Pushes the border away from the div */
  border-image-outset: 5px;
} 
```

We need `border-image-source` and `border-image-width` to render the border. Initially, the image source — the gradient — is fully transparent. Because both the `red` and `transparent` colors are set to start at `0%`, the browser doesn’t have any space to blend the colors, and since `transparent` comes second in the code, it gets the starting position at `0%` and fills the rest of the gradient. We’re using `border-image-slice: 1` to create `1px` slices of the gradient, which creates a smooth fill of the gradient across the whole border.

---

## Animating the border image

There’s something else to remember about gradients, specifically about animating them: we can’t by default. [**Transitioning (or interpolating) from one color to another**](/css-tricks.com/interpolating-numeric-css-variables.md) is difficult because we’re essentially transitioning the starting and ending points of a gradient, which are percentages.

That’s where registering our own custom property comes into play because we can indeed animate CSS variables:

```css
@property --p {
  syntax: "<percentage>";
  initial-value: 0%;
  inherits: false;
}
```

And we can use that in our gradient:

```css
.card {
  /* ... */
  border-image-source: linear-gradient(-45deg, red var(--p), transparent 0%);
}
```

Now let’s say that we want `--p` to transition from its default value of `0%` to `100%` when the `.card` is hovered:

```css
.card {
  /* ... */
  border-image-source: linear-gradient(-45deg, red var(--p), transparent 0%);
  /* ... */

  &:hover {
    --p: 100%;
  }
}
```

This tells the browser that red should finish its transition at the 100% mark (the very end). The gradient will grow to be a solid red color, like the border is drawing itself:

<CodePen
  user="anon"
  slug-hash="EaNZaWL"
  title="Border image animation 1"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Variations

We could have stopped with that last example, but there’s so much else we can do here! We can change direction, make it faster or slower, stop in other positions, or even use different types of gradients. Seriously, it’s a lot of fun.

Let’s try using a `conic-gradient` instead of a linear one. We can animate the `border-image-slice` value, and use `border-image-repeat: round` to tile the slices within the borders. The `round` tiling tries to fit a whole number of tiles in the border and if it couldn’t, the image slightly stretches or squeezes until the fit occurs.

```css
.card {
  /* Creates a sharp, expanding color wheel using the custom angle variable */
  border-image-source: conic-gradient(from 0deg, red 0deg, transparent 0%);

  /* Repeats the sliced regions smoothly without clipping */
  border-image-repeat: round;

  border-image-width: 5px;
  border-image-slice: 1;
}
```

We still need to register custom properties to move the gradient around, this time to transition the `border-image-slice` value (we’ll call it `--n`) and the conic-gradient’s angle (which we’ll call `--a`):

::: note

You can also animate `border-image-slice` directly and not through a registered custom property. The result will slightly vary based on how the browser handles those changes.

:::

```css
/* Registers a custom property for the border-image-slice */
@property --n {
  syntax: "<number>";
  initial-value: 1;
  inherits: false;
}

/* Registers a custom property for the gradient angle */
@property --a {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
```

Let’s drop those into our original CSS:

```css
.card {
  border-image-source: conic-gradient(from var(--a), red var(--a), transparent 0%);
  border-image-width: 5px;
  border-image-slice: var(--n);
  border-image-repeat: round;
} 
```

…and tell the CSS exactly which properties we’re transitioning, which is good for performance:

```css
.card {
  border-image-source: conic-gradient(from var(--a), red var(--a), transparent 0%);
  border-image-width: 5px;
  border-image-slice: var(--n);
  border-image-repeat: round;
  transition-property: --n, --a;
  transition-duration: 0.6s;
} 
```

…and then make the properties transition on hover:

```css
.card {
  border-image-source: conic-gradient(from var(--a), red var(--a), transparent 0%);
  border-image-width: 5px;
  border-image-slice: var(--n);
  border-image-repeat: round;
  transition-property: --n,--a;
  transition-duration: 0.6s;

  &:hover {
    /* Increases slicing depth to repeat/tile the border pattern */
    --n: 20;
    /* Rotates the gradient full circle to draw the border in */
    --a: 360deg;
  }
}
```

The slice value (`--n`) is initially `1`. It goes up to `20` on hover. That means the slice gets bigger (up to `20px` thick). You’ll notice this when you see the breaks in the borders.

<CodePen
  user="anon"
  slug-hash="myOWbzR"
  title="Border image animation"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More examples!

Like I said earlier, there’s so much we can do with animated border images. We can animate multiple colors, use repeating gradients. Here are the examples I pulled together.

<CodePen
  user="anon"
  slug-hash="ByQQJQj"
  title="Border image animation 2"
  :default-tab="['css','result']"
  :theme="dark"/>

Your homework: pick these apart — and please let me know if you make any other effects! I’d love to see them.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Animating CSS border-image",
  "desc": "Border images are an overlooked feature. One neat fact is that border image slices can run across entire borders on an element, and animating it creates beautiful effects.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/animating-css-border-image.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
