---
lang: en-US
title: "CSS Blob Recipes"
description: "Article(s) > CSS Blob Recipes"
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
      content: "Article(s) > CSS Blob Recipes"
    - property: og:description
      content: "CSS Blob Recipes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-blob-recipes.html
prev: /programming/css/articles/README.md
date: 2025-06-27
isOriginal: false
author:
  - name: Juan Diego Rodríguez
    url : https://css-tricks.com/author/monknow/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/06/blobs-cover.webp
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
  name="CSS Blob Recipes"
  desc="Blob, Blob, Blob. What's the most effective way to create blob shapes in CSS? Turns out, as always, there are many. Let's compare them together!"
  url="https://css-tricks.com/css-blob-recipes"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/06/blobs-cover.webp"/>

*Blob, Blob, Blob*. You hate them. You love them. Personally, as a design illiterate, I like to overuse them… a lot. And when you repeat the same process over and over again, it’s only a question of how much you can optimize it, or in this case, what’s the easiest way to create blobs in CSS? Turns out, as always, there are many approaches.

To know if our following blobs are worth using, we’ll need them to pass three tests:

1. They can be with just a single element (and preferably without pseudos).
2. They can be easily designed (ideally through an online tool).
3. We can use gradient backgrounds, borders, shadows, and other CSS effects on them.

Without further ado, let’s *Blob, Blob, Blob* right in.

---

## Just generate them online

I know it’s disenchanting to click on an article about making blobs in CSS just for me to say you can generate them outside CSS. Still, it’s probably the most common way to create blobs on the web, so to be thorough, these are some online tools I’ve used before to create **SVG** blobs.

- [<FontIcon icon="fas fa-globe"/>Haikei](https://app.haikei.app/). Probably the one I have used the most since, besides blobs, it can also generate lots of SVG backgrounds.
- [<FontIcon icon="fas fa-globe"/>Blobmaker](https://blobmaker.app/). A dedicated tool for making blobs. It’s apparently part of Haikei now, so you can use both.
- Lastly, almost all graphic programs let you hand-draw blobs and export them as SVGs.

For example, this is one I generated just now. Keep it around, as it will come in handy later.

![Randomly shaped blob in bright red.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/06/image-3.png?resize=829%2C766&ssl=1)

```xml
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path
    fill="#FA4D56"
    d="M65.4,-37.9C79.2,-13.9,81,17,68.1,38C55.2,59.1,27.6,70.5,1.5,69.6C-24.6,68.8,-49.3,55.7,-56,38.2C-62.6,20.7,-51.3,-1.2,-39,-24.4C-26.7,-47.6,-13.3,-72,6.2,-75.6C25.8,-79.2,51.6,-62,65.4,-37.9Z"
    transform="translate(100 100)"
  />
</svg>
```

---

## Using `border-radius`

While counterintuitive, we can use the [<FontIcon icon="iconfont icon-css-tricks"/>`border-radius`](https://css-tricks.com/almanac/properties/b/border-radius/)` property to create blobs. This technique isn’t new by any means; it was [<FontIcon icon="fas fa-globe"/>first described by Nils Binder](https://9elements.com/blog/css-border-radius-can-do-that/) in 2018, but it is still fairly unknown. Even for those who use it, the inner workings are not entirely clear.

To start, you may know the `border-radius` is a shorthand to each individual corner’s radius, going from the top left corner clockwise. For example, we can set each corner’s `border-radius` to get a bubbly square shape:

```html
<div class="blob"></div>
```

```css
.blob {
  border-radius: 25% 50% 75% 100%;
}
```

<CodePen
  user="monknow"
  slug-hash="gbpRwZz"
  title="Recipes for Blobs in CSS - border-radius"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

However, what `border-radius` does — and also why it’s called “radius” — is to shape each corner following a circle of the given radius. For example, if we set the top left corner to `25%`, it will follow a circle with a radius `25%` the size of the shape.

```css
.blob {
  border-top-left-radius: 25%;
}
```

<CodePen
  user="monknow"
  slug-hash="VYLWGve"
  title="Recipes for Blobs in CSS - border-radius Explanation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

What’s less known is that each corner property is still a *shortcut* towards its horizontal and vertical radii. Normally, you set both radii to the same value, getting a circle, but you can set them individually to create an ellipse. For example, the following sets the horizontal radius to `25%` of the element’s width and the vertical to `50%` of its height:

```css
.blob {
  border-top-left-radius: 25% 50%;
}
```

<CodePen
  user="monknow"
  slug-hash="WbvOYOo"
  title="Recipes for Blobs in CSS - border-radius Individual"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We can now shape each corner like an ellipse, and it is the combination of all four ellipses that creates the illusion of a blob! Just take into consideration that to use the horizontal and vertical radii syntax through the `border-radius` property, we’ll need to separate the horizontal from the vertical radii using a forward slash (`/`).

```css
.blob {
  border-radius:
    /* horizontal */
    100% 30% 60% 70% /
    /* vertical */
    50% 40% 70% 70%;
}
```

<CodePen
  user="monknow"
  slug-hash="dPoWMym"
  title="Recipes for Blobs in CSS - border-radius Blob"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The syntax isn’t too intuitive, so designing a blob from scratch will likely be a headache. Luckily, [<FontIcon icon="fas fa-globe"/>Nils Binder made a tool](https://9elements.github.io/fancy-border-radius/) exactly for that!

### Blobbing blobs together

This hack is awesome. We aren’t supposed to use `border-radius` like that, but we still do. Admittedly, we are limited to boring blobs. Due to the nature of `border-radius`, no matter how hard we try, we will only get convex shapes.

![Concave and convex shapes](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/06/convex_concave_i8a0vu.webp?resize=1024%2C576)

Just going off `border-radius`, we can try to minimize it a little by sticking more than one blob together:

<CodePen
  user="monknow"
  slug-hash="gbpxJKd"
  title="Recipes for Blobs in CSS - Blobbing Blobs Together"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

However, I don’t want to spend too much time on this technique since it is too impractical to be worth it. To name a few drawbacks:

1. We are using more than one element or, at the very least, an extra pseudo-element. Ideally, we want to keep it to one element.
2. We don’t have a tool to prototype our blobby amalgamations, so making one is a process of trial and error.
3. We can’t use borders, gradients, or box shadows since they would reveal the element’s outlines.

---

## Multiple backgrounds and SVG filters

This one is an improvement in the Gooey Effect, [**described here by Lucas Bebber**](/css-tricks.com/gooey-effect.md), although I don’t know who first came up with it. In the original effect, several elements can be morphed together like drops of liquid sticking to and flowing out of each other:

<CodePen
  user="lbebber"
  slug-hash="LELBEo"
  title="Gooey Menu"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It works by first blurring shapes nearby, creating some connected shadows. Then we crank up the contrast, forcing the blur out and smoothly connecting them in the process. Take, for example, this demo by Chris Coyer (It’s from 2014, so more than 10 years ago!):

<CodePen
  user="chriscoyier"
  slug-hash="poXpNL"
  title="Blur vs Contrast"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you look at the code, you’ll notice Chris uses the [<FontIcon icon="iconfont icon-css-tricks"/>`filter`](https://css-tricks.com/almanac/properties/f/filter/) property along the `blur()` and `contrast()` functions, which I’ve also seen in other blob demos. To be specific, it applies `blur()` on each individual circle and then `contrast()` on the parent element. So, if we have the following HTML:

```html
<div class="blob">
  <div class="subblob"></div>
  <div class="subblob"></div>
  <div class="subblob"></div>
</div>
```

…we would need to apply filters and background colors as such:

```css
.blob {
  filter: contrast(50);
  background: white; /* Solid colors are necessary */
}

.subblob {
  filter: blur(15px);
  background: black; /* Solid colors are necessary */
}
```

However, there is a good reason why those demos stick to white shapes and black backgrounds (or vice versa) since things get unpredictable once colors aren’t contrast-y enough. See it for yourself in the following demo by changing the color. Just be wary: *shades get ugly*.

<CodePen
  user="monknow"
  slug-hash="yyNomvx"
  title="Recipes for Blobs in CSS - Ugly Blobs"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

To solve this, we will use an SVG filter instead. I don’t want to get too technical on SVG (if you want to, read Luca’s post!). In a nutshell, we can apply blurring and contrast filters using SVGs, but now, we can also pick which color channel we apply the contrast to, unlike normal `contrast()`, which modifies all colors.

Since we want to leave color channels (`R`, `G` and `B`) untouched, we will only crank the contrast up for the alpha channel. That translates to the next SVG filter, which can be embedded in the HTML:

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="position: absolute;">
  <defs>
    <filter id="blob">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6" result="goo" />
      <feBlend in="SourceGraphic" in2="blob" />
    </filter>
  </defs>
</svg>
```

To apply it, we will use again `filter`, but this time we’ll set it to `url("#blob")`, so that it pulls the SVG from the HTML.

```css
.blob {
  filter: url("#blob");
}
```

And now we can even use it with gradient backgrounds!

<CodePen
  user="monknow"
  slug-hash="MYwvNZL"
  title="Recipes for Blobs in CSS - Better Blobs"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

That being said, this approach comes with two small, but important, changes to common CSS filters:

1. The filter is applied to the parent element, not the individual shapes.
2. The parent element must be transparent (which is a huge advantage). To change the background color, we can instead change the body or other ancestors’ background, and it will work with no issues.

What’s left is to place the `.subblob` elements together such that they make a blobby enough shape, then apply the SVG filters to morph them:

<CodePen
  user="monknow"
  slug-hash="bNdrXZv"
  title="Recipes for Blobs in CSS - Better Blobs"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Making it one element

This works well, but it has a similar issue to the blob we made by morphing several `border-radius` instances: too many elements for a simple blob. Luckily, we can take advantage of the [<FontIcon icon="iconfont icon-css-tricks"/>`background`](https://css-tricks.com/almanac/properties/b/background/) property to create multiple shapes and morph them together using SVG filters, all in a single element. Since we are keeping it to one element, we will go back to just one empty `.blob` div:

```html
<div class="blob"></div>
```

To recap, the `background` shorthand can set all background properties and also set multiple backgrounds at once. Of all the properties, we only care about the [`background-image`](https://css-tricks.com/almanac/properties/b/background-image/), [`background-position`](https://css-tricks.com/almanac/properties/b/background-position/) and [`background-size`](https://css-tricks.com/almanac/properties/b/background-size/).

First, we will use `background-image` along with `radial-gradient()` to create a circle inside the element:

```css
body {
  background: radial-gradient(farthest-side, var(--blob-color) 100%, #0000);
  background-repeat: no-repeat; /* Important! */
}
```

<CodePen
  user="monknow"
  slug-hash="PwqJYZQ"
  title="Recipes for Blobs in CSS - Circle created using radial-gradient"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Here is what each parameter does:

- **`farthest-side`:** Confines the shape to the element’s box farthest from its center. This way, it is kept as a circle.
- **`var(--blob-color) 100%`:** Fills the background shape from 0 to 100% with the same color, so it ends up as a solid color.
- **`#0000`:** After the shape is done, it makes a full stop to transparency, so the color ends.

The next part is moving and resizing the circle using the `background-position` and `background-size` properties. Luckily, both can be set on `background` after the gradient, separated from each other by a forward slash (`/`).

```css
body {
  background: radial-gradient(...) 20% 30% / 30% 40%;
  background-repeat: no-repeat; /* Important! */
}
```

<CodePen
  user="monknow"
  slug-hash="PwqJYzR"
  title="Recipes for Blobs in CSS - Circle created using radial-gradient and moved around"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The first pair of percentages sets the shape’s horizontal and vertical position (taking as a reference the top-left corner), while the second pair sets the shape’s width and height (taking as a reference the element’s size).

As I mentioned, we can stack up different backgrounds together, which means we can create as many circles/ellipses as we want! For example, we can create three ellipses on the same element:

```css
.blob {
  background:
    radial-gradient(farthest-side, var(--blob-color) 100%, #0000) 20% 30% / 30% 40%, 
    radial-gradient(farthest-side, var(--blob-color) 100%, #0000) 80% 50% / 40% 60%, 
    radial-gradient(farthest-side, var(--blob-color) 100%, #0000) 50% 70% / 50% 50%;
  background-repeat: no-repeat;
}
```

What’s even better is that SVG filters don’t care whether shapes are made of elements or backgrounds, so we can also morph them together using the last `url(#blob)` filter!

<CodePen
  user="monknow"
  slug-hash="vEOJqLQ"
  title="Recipes for Blobs in CSS - background and SVG filters"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

While this method may be a little too much for blobs, it unlocks squishing, stretching, dividing, and merging blobs [in seamless animations](/css-tricks.com/gooey-effect.md#making-things-stick).

Again, all these tricks are awesome, but not enough for what we want! We accomplished reducing the blob to a single element, but we still can’t use gradients, borders, or shadows on them, and also, they are tedious to design and model. Then, that brings us to the ultimate blob approach…

---

## Using the `shape()` function

Fortunately, there is a new way to make blobs that just dropped to CSS: the `shape()` function!

I’ll explain `shape()`‘s syntax briefly, but for an in-depth explanation, you’ll want to check out both [<FontIcon icon="iconfont icon-css-tricks"/>this explainer from the CSS-Tricks Almanac](https://css-tricks.com/almanac/functions/s/shape/) as well as [<FontIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author/afiftemani/)‘s three-part [**series on the `shape()` function**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md), as well as [**his recent article about blobs**](/frontendmasters.com/creating-blob-shapes-using-clip-path-shape.md).

First off, the CSS `shape()` function is used alongside the [<FontIcon icon="iconfont icon-css-tricks"/>`clip-path`](https://css-tricks.com/almanac/properties/c/clip-path/) property to cut elements into any shape we want. More specifically, it uses a verbal version of SVG’s `path` syntax. The syntax has lots of commands for lots of types of lines, but when blobbing with `shape()`, we’ll define curves using the `curve` command:

```css
.blob {
  clip-path: shape(
    from X0 Y0, 
    curve to X1 Y1 with Xc1 Yc1, 
    curve to X2 Y2 with Xc21 Yc21 / Xc22 Yc22
    /* ... */
  );
}
```

Let’s break down each parameter:

- `X0 Y0` defines the starting point of the shape.
- `curve` starts the curve where `X1 Y1` is the next point of the shape, while `Xc1 Yc1` defines a control point used in Bézier curves.
- The next parameter is similar, but we used `Xc21 Yc21 / Xc22 Yc22` instead to define two control points on the Bézier curve.

I honestly don’t understand Bézier curves and control points completely, but luckily, we don’t need them to use `shape()` and blobs! Again, `shape()` uses a verbal version of SVG’s `path` syntax, so it can draw any shape an SVG can, which means that we can translate the SVG blobs we generated earlier… and CSS-ify them. To do so, we’ll grab the `d` attribute (which defines the `path`) from our SVG and paste it into Temani’s [<FontIcon icon="fas fa-globe"/>SVG to `shape()` generator](https://css-generators.com/svg-to-css/).

This is the exact code the tool generated for me:

```css
.blob {
  aspect-ratio: 0.925; /* Generated too! */

  clip-path: shape(
    from 91.52% 26.2%,
    curve to 93.52% 78.28% with 101.76% 42.67%/103.09% 63.87%,
    curve to 44.11% 99.97% with 83.95% 92.76%/63.47% 100.58%,
    curve to 1.45% 78.42% with 24.74% 99.42%/6.42% 90.43%,
    curve to 14.06% 35.46% with -3.45% 66.41%/4.93% 51.38%,
    curve to 47.59% 0.33% with 23.18% 19.54%/33.13% 2.8%,
    curve to 91.52% 26.2% with 62.14% -2.14%/81.28% 9.66%
  );
}
```

As you might have guessed, it returns our beautiful blob:

<CodePen
  user="monknow"
  slug-hash="MYwEjoX"
  title="Recipes for Blobs in CSS - shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Let’s check if it passes our requirements:

1. Yes, they can be made of a single element.
2. Yes, they can also be created in a generator and then translated into CSS.
3. Yes, we can use gradient backgrounds, but due to the nature of `clip-path()`, borders and shadows get cut out.

Two out of three? Maybe two and a half of three? That’s a big improvement over the other approaches, even if it’s not perfect.

---

## Conclusion

So, alas, we failed to find what I believe is the perfect CSS approach to blobs. I am, however, amazed how something so trivial designing blobs can teach us about so many tricks and new CSS features, many of which I didn’t know myself.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Blob Recipes",
  "desc": "Blob, Blob, Blob. What's the most effective way to create blob shapes in CSS? Turns out, as always, there are many. Let's compare them together!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-blob-recipes.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
