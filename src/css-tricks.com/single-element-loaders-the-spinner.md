---
lang: en-US
title: "Single Element Loaders: The Spinner"
description: "Article(s) > Single Element Loaders: The Spinner"
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
      content: "Article(s) > Single Element Loaders: The Spinner"
    - property: og:description
      content: "Single Element Loaders: The Spinner"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/single-element-loaders-the-spinner.html
prev: /programming/css/articles/README.md
date: 2022-06-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/loaders-spinners.jpg
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
  name="Single Element Loaders: The Spinner"
  desc="This four-part series covers how to create single element loaders with minimal code while using modern CSS techniques."
  url="https://css-tricks.com/single-element-loaders-the-spinner"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/loaders-spinners.jpg"/>

Making CSS-only loaders is one of my favorite tasks. It’s always satisfying to look at those infinite animations. And, of course, there are *lots* of techniques and approaches to make them — no need to [<VPIcon icon="fa-brands fa-codepen"/>look further than CodePen](https://codepen.io/collection/KLDEaD) to see just how many. In this article, though, we will see how to make a single element loader writing as little code as possible.

I have [<VPIcon icon="fas fa-globe"/>made a collection of more than 500 single div loaders](https://css-loaders.com/) and in this four-part series, I am going to share the tricks I used to create many of them. We will cover a huge number of examples, showing how small adjustments can lead to fun variations, and how little code we need to write to make it all happen!

::: info Single-Element Loaders series:

```component VPCard
{
  "title": "Single Element Loaders: The Spinner",
  "desc": "This four-part series covers how to create single element loaders with minimal code while using modern CSS techniques.",
  "link": "/css-tricks.com/single-element-loaders-the-spinner.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Dots",
  "desc": "In this second part of our four-part series, we will make a dot loader with only a single div element using CSS backgrounds and masks.",
  "link": "/css-tricks.com/single-element-loaders-the-dots.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Bars",
  "desc": "We’ve looked at spinners. We’ve looked at dots. Now we’re going to tackle another common pattern for loaders: bars. And we’re going to do the same thing in",
  "link": "/css-tricks.com/single-element-loaders-the-bars.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: Going 3D!",
  "desc": "For this fourth and final article of our little series on single-element loaders, we are going to explore 3D patterns. When creating",
  "link": "/css-tricks.com/single-element-loaders-going-3d.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

For this first article, we are going to create a one of the more common loader patterns: spinning bars:

<CodePen
  user="anon"
  slug-hash="rNpbMvM"
  title="Simple spinner CSS loader"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Here’s the approach

A trivial implementation for this loader is to create one element for each bar wrapped inside a parent element (for nine total elements), then play with `opacity` and `transform` to get the spinning effect.

My implementation, though, requires only one element:

```html
<div class="loader"></div>
```

…and 10 CSS declarations:

```css
.loader {
  width: 150px; /* control the size */
  aspect-ratio: 1;
  display: grid;
  mask: conic-gradient(from 22deg, #0003, #000);
  animation: load 1s steps(8) infinite;
}
.loader,
.loader:before {
  --_g: linear-gradient(#17177c 0 0) 50%; /* update the color here */
  background: 
    var(--_g)/34% 8%  space no-repeat,
    var(--_g)/8%  34% no-repeat space;
}
.loader:before {
  content: "";
  transform: rotate(45deg);
}
@keyframes load {
  to { transform: rotate(1turn); }
}
```

---

## Let’s break that down

At first glance, the code may look strange but you will see that it’s more simple than what you might think. The first step is to define the dimension of the element. In our case, it’s a `150px` square. We can put [**`aspect-ratio`**](/css-tricks.com/almanac-properties/aspect-ratio.md) to use so the element stays square no matter what.

```css
.loader {
  width: 150px; /* control the size */
  aspect-ratio: 1; /* make height equal to width */
}
```

When building CSS loaders, I always try to have one value for controlling the overall size. In this case, it’s the `width` and all the calculations we cover will refer to that value. This allows me to change a single value to control the loader. It’s always important to be able to easily adjust the size of our loaders without the need to adjust a lot of additional values.

Next, we will use gradients to create the bars. This is the trickiest part! Let’s use *one* gradient to create *two* bars like the below:

```css
background: linear-gradient(#17177c 0 0) 50%/34% 8% space no-repeat;
```

![Showing a space between two gradient lines for a single element loader.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/s_98F21CD3C1C7899779F98C6C3E6075E37A8E660CF4703968B4D3A7A973FF0FA6_1651414613507_image.png?resize=577%2C340&ssl=1)

Our gradient is defined with one color and two color stops. The result is a solid color with no fading or transitions. The size is equal to `34%` wide and `8%` tall. It’s also placed in the center (`50%`). The trick is the use of the keyword value `space` — this duplicates the gradient, giving us two total bars.

::: info <VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>

From [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/css-backgrounds-3/#valdef-background-repeat-space):

> The image is repeated as often as will fit within the background positioning area without being clipped and then the images are spaced out to fill the area. The first and last images touch the edges of the area.

```component VPCard
{
  "title": "CSS Backgrounds and Borders Module Level 3",
  "desc": "This property specifies how background images are tiled after they have been sized and positioned. The property’s value is given as a comma-separated list of <repeat-style> values where...",
  "link": "https://w3.org/TR/css-backgrounds-3/#valdef-background-repeat-space/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

:::

I am using a width equal to `34%` which means we cannot have more than two bars (`3*34%` is greater than `100%`) but with two bars we will have empty spaces (`100% - 2 * 34% = 32%`). That space is placed in the center between the two bars. In other words, we use a width for the gradient that is between `33%` and `50%` to make sure we have at least two bars with a little bit of space between them. The value `space` is what correctly places them for us.

We do the same and make a second similar gradient to get two more bars at the top and bottom, which give us a `background` property value of:

```css
background: 
 linear-gradient(#17177c 0 0) 50%/34% 8%  space no-repeat,
 linear-gradient(#17177c 0 0) 50%/8%  34% no-repeat space;
```

We can optimize that using a CSS variable to avoid repetition:

```css
--_g: linear-gradient(#17177c 0 0) 50%; /* update the color here */
background: 
 var(--_g)/34% 8%  space no-repeat,
 var(--_g)/8%  34% no-repeat space;
```

So, now we have four bars and, thanks to CSS variables, we can write the color value once which makes it easy to update later (like we did with the size of the loader).

To create the remaining bars, let’s tap into the `.loader` element and its `::before` pseudo-element to get four more bars for a grand total of eight in all.

```css
.loader {
  width: 150px; /* control the size */
  aspect-ratio: 1;
  display: grid;
}
.loader,
.loader::before {
  --_g: linear-gradient(#17177c 0 0) 50%; /* update the color here */
  background: 
    var(--_g)/34% 8%  space no-repeat,
    var(--_g)/8%  34% no-repeat space;
}
.loader::before {
  content: "";
  transform: rotate(45deg);
}
```

Note the use of `display: grid`. This allows us to rely on the grid’s default `stretch` alignment to make the pseudo-element cover the whole area of its parent; thus there’s no need to specify a dimension on it — another trick that reduces the code and avoid us to deal with a lot of values!

Now let’s rotate the pseudo-element by `45deg` to position the remaining bars. Hover the following demo to see the trick:

<CodePen
  user="anon"
  slug-hash="QWQWQOV"
  title="rotate the bars"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Setting opacity

What we’re trying to do is create the impression that there is one bar that leaves a trail of fading bars behind it as it travels a circular path. What we need now is to play with the transparency of our bars to make that trail, which we are going to do with CSS `mask` combined with a conic-gradient as follows:

```css
mask: conic-gradient(from 22deg,#0003,#000);
```

To better see the trick, let’s apply this to a full-colored box:

<CodePen
  user="anon"
  slug-hash="LYQYQdZ"
  title="conic-gradient with mask"
  :default-tab="['css','result']"
  :theme="dark"/>

The transparency of the red color is gradually increasing clockwise. We apply this to our loader and we have the bars with different opacity:

![Radial gradient plus, spinner bars equals spinner bars with gradients.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/s_98F21CD3C1C7899779F98C6C3E6075E37A8E660CF4703968B4D3A7A973FF0FA6_1651416594508_image.png?resize=827%2C278&ssl=1)

In reality, each bar appears to fade because it’s masked by a gradient and falls between two semi-transparent colors. It’s hardly noticeable when this runs, so it’s sort of like being able to say that all the bars have the same color with a different level of opacity.

---

## The rotation

Let’s apply a rotation animation to get our loader. Note, that we need a stepped animation and not a continuous one that’s why I am using `steps(8)`. `8` is nothing but the number of the bars, so that value can be changed depending on how many bars are in use.

```css
.loader {
  animation: load 3s steps(8) infinite;
}

/* Same as before: */
@keyframes load {
  to { transform: rotate(1turn) }
}
```

<CodePen
  user="anon"
  slug-hash="Yzezemr"
  title="Linear vs stepped animation"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s it! We have our loader with only one element and a few lines of CSS. We can easily control its size and color by adjusting one value.

<CodePen
  user="anon"
  slug-hash="zYRYWOq"
  title="Final spinner loader"
  :default-tab="['css','result']"
  :theme="dark"/>

Since we only used the `::before` pseudo-element, we can add four more bars by using `::after` to end with 12 bars in total and almost the same code:

<CodePen
  user="anon"
  slug-hash="QWQWmWP"
  title="More bars"
  :default-tab="['css','result']"
  :theme="dark"/>

We update the rotation of our pseudo-elements to consider `30deg` and `60deg` instead of `45deg` while using an twelve-step animation, rather than eight. I also decreased the height to `5%` instead of `8%` to make the bars a little thinner.

Notice, too, that we have `grid-area: 1/1` on the pseudo-elements. This allows us to place them in the same area as one another, stacked on top of each other.

Guess what? We can reach for the same loader using another implementation:

<CodePen
  user="anon"
  slug-hash="OJQzbzr"
  title="Another implementation"
  :default-tab="['css','result']"
  :theme="dark"/>

Can you figure out the logic behind the code? Here is a hint: the opacity is no longer handled with a CSS `mask` but inside the gradient and is also using the `opacity` property.

---

## Why not dots instead?

We can totally do that:

<CodePen
  user="anon"
  slug-hash="RwQyzmY"
  title="CSS only spinner loader"
  :default-tab="['css','result']"
  :theme="dark"/>

If you check the code, you will see that we’re now working with a radial gradient instead of a linear one. Otherwise, the concept is exactly the same where the mask creates the impression of opacity, but we made the shapes as circles instead of lines.

Below is a figure to illustrate the new gradient configuration:

![Showing placement of dots in the single-element loader.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/s_B3DCAAF1BD4EF695C8E8E4733CA6E3BD909E614220F68B297B62285B12C652E5_1654551247592_image.png?resize=693%2C293&ssl=1)

If you’re using Safari, note that the demo may be buggy. That’s because Safari currently lacks support for the `at` syntax in radial gradients. But we can reconfigure the gradient a bit to overcome that:

```css{6,12}
.loader,
.loader:before,
.loader:after {
  background:
    radial-gradient(
      circle closest-side,
      currentColor 90%,
      #0000 98%
    ) 
    50% -150%/20% 80% repeat-y,
    radial-gradient(
      circle closest-side,
      currentColor 90%,
      #0000 98%
    ) 
    -150% 50%/80% 20% repeat-x;
} 
```

<CodePen
  user="anon"
  slug-hash="eYVLKOv"
  title="Demo without (at)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More loader examples

Here is another idea for a spinner loader similar to the previous one.

<CodePen
  user="anon"
  slug-hash="PoJyaNy"
  title="CSS Spinner loader"
  :default-tab="['css','result']"
  :theme="dark"/>

For this one, I am only relying on `background` and `mask` to create the shape (no pseudo-elements needed). I am also defining the configuration with CSS variables to be able to create a lot of variations from the same code — another example of just the powers of CSS variables. [**I wrote another article about this technique**](/freecodecamp.org/how-to-create-a-css-only-loader.md) if you want to more details.

::: note

Note that some browsers still rely on a `-webkit-` prefix for `mask-composite` with its own set of values, and will not display the spinner in the demo. [Here is a way to do it (<VPIcon icon="fa-brands fa-codepen" />`t_afif`)](https://codepen.io/t_afif/pen/wvyYLpJ) without `mast-composite` for more browser support.

:::

I have another one for you:

<CodePen
  user="anon"
  slug-hash="zYPqMgq"
  title="Spinner loader"
  :default-tab="['css','result']"
  :theme="dark"/>

For this one, I am using a `background-color` to control the color, and use `mask` and `mask-composite` to create the final shape:

![Different steps for applying a master to a element in the shape of a circle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/06/s_B3DCAAF1BD4EF695C8E8E4733CA6E3BD909E614220F68B297B62285B12C652E5_1653920041342_image.png?resize=858%2C312&ssl=1)

Before we end, here are some more spinning loaders I made a while back. I am relying on different techniques but still using gradients, masks, pseudo-element, etc. It could be a good exercise to figure out the logic of each one and learn new tricks at the same time. This said, if you have any question about them, the comment section is down below.

<CodePen
  user="anon"
  slug-hash="poegNEO"
  title="The Spinner"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="yLMXBRL"
  title="The Spinner II"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="ZEevvXW"
  title="The Spinner III"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping up

See, there’s so much we can do in CSS with nothing but a single div, a couple of gradients, pseudo-elements, variables. It seems like we created a whole bunch of different spinning loaders, but they’re all basically the same thing with slight modifications.

This is only the beginning. In this series, we will be looking at more ideas and advanced concepts for creating [<VPIcon icon="fas fa-globe"/>CSS loaders](https://css-loaders.com/).

::: info Single-Element Loaders series:

```component VPCard
{
  "title": "Single Element Loaders: The Spinner",
  "desc": "This four-part series covers how to create single element loaders with minimal code while using modern CSS techniques.",
  "link": "/css-tricks.com/single-element-loaders-the-spinner.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Dots",
  "desc": "In this second part of our four-part series, we will make a dot loader with only a single div element using CSS backgrounds and masks.",
  "link": "/css-tricks.com/single-element-loaders-the-dots.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: The Bars",
  "desc": "We’ve looked at spinners. We’ve looked at dots. Now we’re going to tackle another common pattern for loaders: bars. And we’re going to do the same thing in",
  "link": "/css-tricks.com/single-element-loaders-the-bars.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Single Element Loaders: Going 3D!",
  "desc": "For this fourth and final article of our little series on single-element loaders, we are going to explore 3D patterns. When creating",
  "link": "/css-tricks.com/single-element-loaders-going-3d.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Single Element Loaders: The Spinner",
  "desc": "This four-part series covers how to create single element loaders with minimal code while using modern CSS techniques.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/single-element-loaders-the-spinner.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
