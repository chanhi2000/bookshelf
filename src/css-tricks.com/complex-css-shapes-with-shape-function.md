---
lang: en-US
title: "Making Complex CSS Shapes Using shape()"
description: "Article(s) > Making Complex CSS Shapes Using shape()"
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
      content: "Article(s) > Making Complex CSS Shapes Using shape()"
    - property: og:description
      content: "Making Complex CSS Shapes Using shape()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/complex-css-shapes-with-shape-function.html
prev: /programming/css/articles/README.md
date: 2026-04-02
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/complex-css-shapes-shape-function.webp
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
  name="Making Complex CSS Shapes Using shape()"
  desc="Creating rectangles, circles, and rounded rectangles is the basic of CSS. Creating more complex CSS shapes such as triangles, hexagons, stars, hearts, etc. is more challenging but still a simple task if we rely on modern features."
  url="https://css-tricks.com/complex-css-shapes-with-shape-function"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/complex-css-shapes-shape-function.webp"/>

Creating rectangles, circles, and rounded rectangles is the basic of CSS. Creating more complex [<VPIcon icon="fas fa-globe"/>CSS shapes](https://css-shape.com/) such as triangles, hexagons, stars, hearts, etc. is more challenging but still a simple task if we rely on modern features.

But what about those shapes having a bit of randomness and many curves?

![Three rectangular shapes with jagged, non-creating edges. the first is blue, then orange, then green.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773225348617_image.png?resize=1141%2C325)

A lot of names may apply here: random wavy, wiggly, blob, squiggly, ragged, torn, etc. Whatever you call them, we all agree that they are not trivial to create, and they generally belong to the SVG world or are created with tools and used as images. Thanks to the new [**`shape()`**](/css-tricks.com/almanac-functions/shape.md) function, we can now build them using CSS.

I won’t tell you they are easy to create. They are indeed a bit tricky as they require a lot of math and calculation. For this reason, I built a few generators from which you can easily grab the code for the different shapes.

<SiteInfo
  name="CSS Generator for Wavy Dividers"
  desc="Add a nice wavy shape to the top or the bottom of your element. Get an optimized & modern code using the shape() function."
  url="https://css-generators.com/wavy-divider/"
  logo="https://css-generators.com/fav.png"
  preview="https://css-generators.com/wavy-divider/wavy-divider.jpg"/>

<SiteInfo
  name="CSS Generator for Fancy Frames (Squiggly, Ragged, Wavy, Torn, etc.)"
  desc="Use clip-path: shape() to create a lot of CSS-only fancy frames. Get an optimized & modern code in no time."
  url="https://css-generators.com/fancy-frame//"
  logo="https://css-generators.com/fav.png"
  preview="https://css-generators.com/fancy-frame/fancy-frame.jpg"/>

<SiteInfo
  name="CSS Generator for Blob shapes"
  desc="Generate a fancy blob shape using the shape() function. Get an optimized & modern code in no time."
  url="https://css-generators.com/blob//"
  logo="https://css-generators.com/fav.png"
  preview="https://css-generators.com/blob/blob.jpg"/>

All you have to do is adjust the settings and get the code in no time. As simple as that!

While most of you may be tempted to bookmark the CSS generators and leave this article, I advise you to continue reading. Having the generators is good, but understanding the logic behind them is even better. You may want to manually tweak the code to create more shape variations. We will also see a few interesting examples, so stay until the end!

::: note Notice

If you are new to `shape()`, I highly recommend reading [**my four-part series**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md) where I explain the basics. It will help you better understand what we are doing here.

:::

---

## How does it work?

While many of the shapes you can create with my generators look different, all of them rely on the same technique: a lot of `curve` commands. The main trick is to ensure two adjacent `curve` create a smooth curvature so that the full shape appears as one continuous curve.

Here is a figure of what one curve command can draw. I will be using only one control point:

![A normal curve with a control point in the very center. The second shows another curve with control point veering towards the left, contorting the curve.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773222807669_image.png?resize=919%2C279)

Now, let’s put two curves next to each other:

![A wavy curve with two control points, one point up and the other down forming a wave along three points.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773223335364_image.png?resize=770%2C404)

The ending point of the first curve, E1, is the starting point of the second curve, S2. That point is placed within the segment formed by both the control points C1 and C2. That’s the criterion for having an overall smooth curve. If we don’t have that, we get a discontinued “bad” curve.

![A wavy curve with two control points. The second point is moved down and toward the right, bending the curves second wav in an undesired way.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773223685809_image.png?resize=733%2C398)

All we have to do is to randomly generate different curves while respecting the previous criterion between two consecutive curves. For the sake of simplicity, I will consider the common point between two curves to be the midpoint of the control points to have less randomness to deal with.

---

## Creating the shapes

Let’s start with the easiest shape, a random wavy divider. A random curve on one side.

![A long blue rectangle with a jagged bottom edge.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773225933449_image.png?resize=1418%2C432&ssl=1)

Two variables will control the shape: the granularity and the size. The granularity defines how many curves we will have (it will be an integer). The size defines the space where the curves will be drawn.

![The same blue renctangle in two versions with two different jagged bottom edges, marked in red to show the shape. The first is labeled Granularity 8 and the second, with more and deeper jags, is labeled Granularity 18.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773226919188_image.png?resize=1129%2C342)

The first step is to create N points and evenly place them at the bottom of the element (N is the granularity).

![A white rectangle with a black border and seven control points evenly spaced along the bottom edge.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773227352470_image.png?resize=665%2C244)

Then, we randomly offset the vertical position of the points using the size variable. Each point will have an offset equal to a random value within the range `[0 size]`.

![A white rectangle with a black border and seven control points evenly spaced in a wavy formation along the bottom edge. A red label saying Size indicates the vertical height between the highest point and lowest point.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773228225993_image.png?resize=713%2C226)

From there, we take two adjacent points and define their midpoint. We get more points.

![A white rectangle with a black border and thirteen control points evenly spaced in a wavy formation along the bottom edge. A red label saying Size indicates the vertical height between the highest point and lowest point. Every even point is marked in blue.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773228252968_image.png?resize=715%2C226&ssl=1)

Do you start to see the idea? A first set of points is randomly placed while a second set is placed in a way that meets the criterion we defined previously. From there, we draw all the curves, and we get our shape.

The CSS code will look like this:

```css
.shape {
  clip-path: shape(from Px1 Py1,
    curve to Px2 Py2 with Cx1 Cy1,
    curve to Px3 Py3 with Cx2 Cy2,
    /* ... */
    curve to Pxi Pyi with Cx(i-1) Cy(i-1)
    /* ... */
  )
}
```

The `Ci` are the points we randomly place (the control points) and `Pi` are the midpoints.

From there, we apply the same logic to the different sides to get different variation (bottom, top, bottom-top, all sides, etc.).

![A two-by-two grid of the same blue rectangle with different configurations of wavy edges. The first on the bottom, the second on the top, the third on the top and bottom, and the fourth all along the shape.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773229121842_image.png?resize=726%2C525)

As for [<VPIcon icon="fas fa-globe"/>the blob](https://css-generators.com/blob/), the logic is slightly different. Instead of considering a rectangular shape and straight lines, we use a circle.

![Two white circles with black borders that contain a smaller circle with a dashed border. The first circle has eight black control points around the outer circle evenly spaced. The second has 15 control points around it, even other one in blue and positioned between the outer and inner circles to form a wavy shape.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773229324543_image.png?resize=1138%2C463&ssl=1)

We evenly place the points around the circle (the one formed by the element if it has `border-radius: 50%`). Then, we randomly offset them closer to the center. Finally, we add the midpoints and draw the shape.

![A large green blob shape.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773229605074_image.png?resize=549%2C341)

We can still go fancier and combine the first technique with the circular one to consider a rectangle with rounded corners.

![A blue rounded rectangle next to another version of itself with a large number of jagged edges all around it.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773230703420_image.png?resize=1114%2C348)

This was the trickiest one to implement as I had to deal with each corner, each side, and work with different granularities. However, the result was quite satisfying as it allows us to create a lot [<VPIcon icon="fas fa-globe"/>of fancy frames](https://css-generators.com/fancy-frame/)!

---

## Show me the cool demos!

Enough theory, let’s see some cool examples and how to simply use the generators to create complex-looking shapes and animations.

We start with a classic layout featuring numerous wavy dividers!

<CodePen
  user="anon"
  slug-hash="EayNMgo"
  title="Random Wavy Dividers"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We have four shapes in that demo, and all of them are a simple copy/paste from [the wavy divider generator](https://css-generators.com/wavy-divider/). The header uses the bottom configuration, the footer uses the top configuration and the other elements use the top + bottom configuration.

Let’s get fancy and add some animation.

<CodePen
  link="https://codepen.io/t_afif/pen/yyaVpMy/180506c933b34c7113fc26650622b300"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Each element will have the following code:

```css
@media screen and (prefers-reduced-motion: no-preference) {
  .element {
    --s1: shape( ... );
    --s2: shape( ... );
    animation: dance linear 1.6s infinite alternate;
  }

  @keyframes dance {
    0% {clip-path: var(--s1)}
    to {clip-path: var(--s2)}
  }
}
```

From the generator, you fix the granularity and size, then you generate two different shapes for each one of the variables (`--s1` and `--s2`). The number of curves will be the same, which means the browser can have an interpolation between both shapes, hence we get a nice animation!

And what about introducing scroll-driven animation to have the animation based on the scroll? All you have to do is add [**`animation-timeline: scroll()`**](/css-tricks.com/almanac-functions/scroll.md) and it’s done.

<CodePen
  link="https://codepen.io/t_afif/pen/yyaVpxO/b326aeaf99c07d19f05bac209aa49d5a"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Here is the same effect with a sticky header.

<CodePen
  link="https://codepen.io/t_afif/pen/RNRKjBm/ebcd464305e40a043f4390705afe541d"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

For this one, you play with the size. You fix the granularity and the shape ID then you consider a size equal to `0` for the initial shape (a rectangle) and a size different from `0` for the wavy one. Then you let the browser animate between both.

Do you see all the possibilities we have? You can either use the shapes as static decorations or create fancy animations between two (or more) by using the same granularity and adjusting the other settings (size and shape ID).

What cool demo can you create using those tricks? Share it in the comment section.

I will leave you with more examples you can use as inspiration.

A bouncing hover effect with blob shapes:

<CodePen
  user="anon"
  slug-hash="PwwJgyr"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<CodePen
  user="anon"
  slug-hash="yyyPONb"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

A [**squishy button**](/css-tip.com/squishy-button.md) with a hover and click effect:

<CodePen
  user="anon"
  slug-hash="ZYpLGvX"
  title="Squishy button using shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

A [**wobbling frame animation**](/css-tip.com/wobbling-animation.md):

<CodePen
  user="anon"
  slug-hash="zxKzrKe"
  title="Wobbling image animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

A [**liquid reveal effect**](/css-tip.com/sliding-liquid.md):

<CodePen
  user="anon"
  slug-hash="OPRZBxY"
  title="Sliding “Liquid Oozing” effect"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And a set of [<VPIcon icon="fas fa-globe"/>fancy CSS loaders](https://css-loaders.com/squishy/) you can find at my site.

---

## Conclusion

Do you see all the potential of the new `shape()` function? We now have the opportunity to create complex-looking shapes without resorting to SVG or images. In addition to that, we can easily have nice transition/animation.

Don’t forget to bookmark my [<VPIcon icon="fas fa-globe"/>CSS Generators](https://css-generators.com/) website, from where you can get the code of the shapes we studied and more. I also have the [<VPIcon icon="fas fa-globe"/>CSS Shape](https://css-shape.com/) website which I will soon update to utilize the new `shape()` for most of the shapes and optimize a lot of old code!

What about you? Can you think about a complex shape we can create using `shape()`? Perhaps you can give me the idea for my next generator!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Making Complex CSS Shapes Using shape()",
  "desc": "Creating rectangles, circles, and rounded rectangles is the basic of CSS. Creating more complex CSS shapes such as triangles, hexagons, stars, hearts, etc. is more challenging but still a simple task if we rely on modern features.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/complex-css-shapes-with-shape-function.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
