---
lang: en-US
title: "Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)"
description: "Article(s) > Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)"
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
      content: "Article(s) > Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)"
    - property: og:description
      content: "Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-borders-using-masks.html
prev: /programming/css/articles/README.md
date: 2022-01-26
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/01/fancy-borders.png
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
  name="Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)"
  desc="In this article, we look at modern CSS mask techniques to create three fancy CSS borders without having to use a background image."
  url="https://css-tricks.com/css-borders-using-masks"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/01/fancy-borders.png"/>

Have you ever tried to make CSS borders in a repeating zig-zag pattern? Like where a colored section of a website ends and another differently colored section begins — not with a straight line, but angled zig zags, rounded humps, or waves. There are a number of ways you could do this sort of CSS border, dating all the way back to using a `background-image`. But we can get more modern and programmatic with it. In this article, we’ll look at some modern CSS mask techniques to achieve the look.

Before we dig into the technical parts, though, let’s take a look at what we are building. I have made a [<VPIcon icon="fas fa-globe"/>CSS border generator](https://css-generators.com/custom-borders/) where you can easily generate any kind of border within a few seconds and get the CSS code.

Did you see that? With the [**CSS `mask` property**](/css-tricks.com/almanac-properties/mask.md) and a few [**CSS gradients**](/css-tricks.com/a-complete-guide-to-css-gradients.md), we get a responsive and cool-looking border — all with CSS by itself. Not only this, but such effect can be applied to any element where we can have any kind of coloration (e.g. image, gradient, etc). We get all this without extra elements, pseudo elements, or magic numbers coming from nowhere!

> Oh great! All I have to do is to copy/paste code and it’s done!

True, but it’s good to understand the logic to be able to manually adjust the code if you need to.

---

## Masking things

Since all our effects rely on the CSS `mask` property, let’s take a quick refresh on how it works. Straight from [~~<VPIcon icon="fas fa-gobe"/>the spec~~](https://drafts.fxtf.org/css-masking/#masking):

::: info (<VPIcon icon="fas fa-globe"/><code>drafts.fxtf.org</code>)

> The effect of applying a mask to a graphical object is as if the graphical object will be painted onto the background through a mask, thus completely or partially masking out parts of the graphical object.

:::

If we check the [<VPIcon icon="fas fa-globe"/>formal syntax](https://drafts.fxtf.org/css-masking/#the-mask-image) of the `mask` property we can see it accepts an `<image>` as a value, meaning either a URL of an image or a color gradient. Gradients are what we’ll be using here. Let’s start with basic examples:

<CodePen
  user="anon"
  slug-hash="eYGMjmO"
  title="overview mask"
  :default-tab="['css','result']"
  :theme="dark"/>

In the first example of this demo, a gradient is used to make it appear as though the image is fading away. The second example, meanwhile, also uses a gradient, but rather than a soft transition between colors, a [<VPIcon icon="iconfont icon-css-tricks"/>hard color stop](https://css-tricks.com/books/greatest-css-tricks/hard-stop-gradients/) is used to hide (or mask) half of the image. That second example illustrates the technique we will be using to create our fancy borders.

Oh, and the CSS `mask` property can take multiple gradients as long as they are comma-separated. That means we have even more control to mask additional parts of the image.

<CodePen
  user="anon"
  slug-hash="OJxvwVZ"
  title="mask overview II"
  :default-tab="['css','result']"
  :theme="dark"/>

That example showing multiple masking gradients may look a bit tricky at first glance, but what’s happening is the same as applying the multiple gradients on the `background` property. But instead of using a color that blends in with the page background, we use a “transparent” black value (`#0000`) for the hidden parts of the image and full black (`#000`) for the visible parts.

That’s it! Now we can tackle our fancy borders.

---

## Zig-Zag CSS borders

As we saw at the start of this article, [<VPIcon icon="fas fa-globe"/>the generator](https://css-generators.com/custom-borders/) can apply borders on one side, two sides, or all sides. Let’s start with the bottom side using a step-by-step illustration:

<CodePen
  user="anon"
  slug-hash="oNGqMQE"
  title="Bottom zig-zag step-by-step"
  :default-tab="['css','result']"
  :theme="dark"/>

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/01/Screenshot-from-2025-01-30-12-46-50.png?resize=883%2C443&ssl=1)

1. We start by adding a `conic-gradient()` with a specific dimension placed in the middle.
2. Next, we repeat that gradient (by removing `no-repeat` ) and we already see the zig-zag shape!
3. Gradients are known to have anti-aliasing issues creating jagged edges (especially on Chrome). To avoid this, we add a slight transition between the colors, changing `blue 90deg, green 0` to `green, blue 1deg 89deg, green 90deg`.
4. Last, we use everything inside the `mask` property!

We can extract two variables from those steps to define our shape: size (`80px`) and angle (`90deg`). Here’s how we can express that using placeholders for those variables. I will be using JavaScript to replace those variables with their final values.

```css
mask:
  conic-gradient(
    from {-angle/2} at bottom,
    #0000, #000 1deg {angle - 1} ,#0000 {angle}
  ) 50%/{size} 100%;
```

We can also use CSS custom properties for the size and the angle:

```css
--size: 80px;
--angle: 90deg;

mask:
  conic-gradient(
    from calc(var(--angle)/-2) at bottom,
    #0000, #000 1deg calc(var(--angle) - 1deg), #0000 var(--angle)
  ) 50%/var(--size) 100%;
```

Similar to the bottom border, the top one will have almost the same code with a few adjustments:

```css{3}
mask:
  conic-gradient(
    from {180deg - angle/2} at top,
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) 50%/{size} 100%; 
```

We changed `bottom` with `top`, then updated the rotation of the gradient to `180deg - angle/2` instead of `-angle/2`. As simple as that!

That’s the pattern we can use for the rest of the sides, like the left:

```css
mask:
  conic-gradient(
    from {90deg - angle/2} at left,
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) 50%/100% {size};
```

…and the right:

```css
mask:
  conic-gradient(
    from {-90deg - angle/2} at right,
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) 50%/100% {size};
```

Let’s make the borders for when they’re applied to two sides at once. We can actually reuse the same code. To get both the top and bottom borders, we simply combine the code of both the top and bottom border.

```css
mask:
  conic-gradient(
    from {-angle/2} at bottom,
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) bottom/{size} 51% repeat-x;
  conic-gradient(
    from {180deg - angle/2} at top, 
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) top   /{size} 51% repeat-x;
```

<CodePen
  user="anon"
  slug-hash="NWaYOOM"
  title="top+bottom overview"
  :default-tab="['css','result']"
  :theme="dark"/>

The same goes when applying borders to the left and right sides together:

```css
mask:
  conic-gradient(
    from {90deg - angle/2} at left,
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) left /51% {size} repeat-y,
  conic-gradient(
    from {-90deg - angle/2} at right,
    #0000, #000 1deg {angle - 1}, #0000 {angle}
  ) right/51% {size} repeat-y;
```

<CodePen
  user="anon"
  slug-hash="MWEVPxx"
  title="left + right overview"
  :default-tab="['css','result']"
  :theme="dark"/>

Applying Zig-Zag borders to all of the sides is a bit tricky but it’s doable if we consider fixed angles. You can find those particular cases within [<VPIcon icon="fas fa-globe"/>my online CSS Shapes collection](https://css-shape.com). I am calling them [<VPIcon icon="fas fa-globe"/>Zig-Zag boxes](https://css-shape.com/zig-zag-box/).

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/01/image.png?resize=863%2C390&ssl=1)

---

## Scooped CSS borders

Now let’s tackle scooped borders!

> Oh no! another long explanation with a lot of calculation?!

Not at all! There is nothing to explain here. We take everything from the zig-zag example and update the `conic-gradient()` with a `radial-gradient()`. It’s even easier because we don’t have any angles to deal with — only the size variable.

Here is an illustration for one side to see how little we need to do to switch from the zig-zag border to the scooped border:

<CodePen
  user="anon"
  slug-hash="BawxaKV"
  title="overview scooped corner"
  :default-tab="['css','result']"
  :theme="dark"/>

Again, all I did there was replace the `conic-gradient()` with this (using placeholders for size):

```css
mask: radial-gradient({size} at bottom,#0000 98%,#000) 50% / {1.85*size} 100%;
```

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/08/overview-of-scooped-border.png?resize=790%2C471&ssl=1)

> What is the logic behind the magic numbers 1.85 and 98%?

Logically, we should use `100%` instead of `98%` to have a circle that touches the edges of the background area; but again, it’s the anti-aliasing issue and those jagged edges. We use a slightly smaller value to prevent weird overlapping.

The `1.85` value is more of a personal preference than anything. I initially used `2` which is the logical value to get a perfect circle, but the result doesn’t look quite as nice, so the smaller value creates a more seamless overlap between the circles.

Here’s the difference:

<CodePen
  user="anon"
  slug-hash="rNGvNzO"
  title="Good vs Bad"
  :default-tab="['css','result']"
  :theme="dark"/>

Now we need to replicate this for the rest of the sides, just as we did with the zig-zag CSS border, and guess what? We also need one gradient even for the case where we want to have the top/bottom or left/right version.

<CodePen
  user="anon"
  slug-hash="wvmxgNa"
  title="Scooped borders"
  :default-tab="['css','result']"
  :theme="dark"/>

The only case where we need more than one gradient is the [<VPIcon icon="fas fa-globe"/>all sides configuration (Pointy box)](https://css-shape.com/pointy-box/).

<CodePen
  user="anon"
  slug-hash="PoJewpM"
  title="clip-path vs no clip-path"
  :default-tab="['css','result']"
  :theme="dark"/>

Note the use of the `round()` function to make sure the width is a multiplier of the size variable.

---

## Scalloped CSS borders

For this border, we always need two gradients whatever the sides configuration. We use a radial gradient to create a repeated pattern of circles and a linear gradient to cover them and show only the sides we want.

Here is a demo to illustrate some of the cases:

<CodePen
  user="anon"
  slug-hash="ZEXoEVW"
  title="overview scalloped corner"
  :default-tab="['css','result']"
  :theme="dark"/>

Note how I’m using the `space` value. That’s to make sure we don’t cut off any of the circles and also avoid relying on more gradients. And, again, that `1.85` value is a personal preference value.

---

## Wavy CSS borders

The wavy border is a kind of combination of the two previous borders. Here is an illustration to understand how we build the bottom wave.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/08/wavy-border-illustration.png?resize=947%2C545&ssl=1)

We repeat that shape at the bottom and we are done.

<CodePen
  user="anon"
  slug-hash="rNYNdqv"
  title="Wavy border"
  :default-tab="['css','result']"
  :theme="dark"/>

```css
mask: 
  radial-gradient({size} at 75% 100%,#0000 98%,#000) 50% calc(100% - {size})/{4*size} 100% repeat-x,
  radial-gradient({size} at 25% 50% ,#000 99%,#0000 101%) bottom/{4*size} {2*size} repeat-x;
```

We do the same process for the other sides as we did with the zig-zag and rounded CSS borders. All we need is to update a few variables to have a different wave for each side.

![Showing part of the CSS for each side. You can find the full code over at [<VPIcon icon="fas fa-globe"/>the generator](https://css-generators.com/custom-borders/).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/08/all-sides-wavy-border.png?resize=1003%2C547&ssl=1)

As for the all sides configuration, it’s available within [my CSS Shapes collection](https://css-shape.com/wiggly-box/).

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/01/image-1.png?resize=447%2C429&ssl=1)

What we have done here is a simple case of a wavy border. I have [**another article**](/css-tricks.com/how-to-create-wavy-shapes-patterns-in-css.md) where I go into fine detail about creating complex wavy shapes.

---

## That’s *border*line great stuff!

So, you know the ins and outs of [<VPIcon icon="fas fa-globe"/>my cool little online CSS border generator](https://css-generators.com/custom-borders/)! Sure, you can use the code it spits out and do just fine — but now you have the secret sauce recipe that makes it work.

Specifically, we saw how gradients can be used to mask portions of an element. Then we went to work on *multiple* gradients to make certain shapes from those gradient CSS masks. And the result is a pattern that can be used along the edges of an element, creating the appearance of fancy borders that you might otherwise result to `background-image` for. Only this way, all it takes is swapping out some values to change the appearance rather than replace an entire raster image file or something.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)",
  "desc": "In this article, we look at modern CSS mask techniques to create three fancy CSS borders without having to use a background image.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-borders-using-masks.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
