---
lang: en-US
title: "CSS Responsive Multi-Line Ribbon Shapes (Part 1)"
description: "Article(s) > CSS Responsive Multi-Line Ribbon Shapes (Part 1)"
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
      content: "Article(s) > CSS Responsive Multi-Line Ribbon Shapes (Part 1)"
    - property: og:description
      content: "CSS Responsive Multi-Line Ribbon Shapes (Part 1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-responsive-multi-line-ribbon-shapes-part1.html
prev: /programming/css/articles/README.md
date: 2023-11-15
isOriginal: false
author:
  - name: Temani Afif
    url : https://smashingmagazine.com/author/temani-afif/
cover: https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/css-responsive-multi-line-ribbon-shapes-part1.jpg
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
  name="CSS Responsive Multi-Line Ribbon Shapes (Part 1)"
  desc="Ribbons have been used to accent designs for many years now. But, the way we approach them in CSS has evolved with the introduction of newer features. In this article, Temani Afif combines background and gradient tricks to create ribbon shapes in CSS that are not only responsive but support multi-line text and are easily adjustable with a few CSS variables."
  url="https://smashingmagazine.com/2023/11/css-responsive-multi-line-ribbon-shapes-part1/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/css-responsive-multi-line-ribbon-shapes-part1.jpg"/>

Ribbons have been used to accent designs for many years now. But the way we approach them in CSS has evolved with the introduction of newer features, like `calc()`, `color-mix()`, and trigonometric functions. In this article, Temani Afif combines background and gradient tricks to create ribbon shapes in CSS that are not only responsive but support multi-line text and are easily adjustable with a few CSS variables.

Back in the early 2010s, it was nearly impossible to avoid ribbon shapes in web designs. It was actually back in 2010 that [**Chris Coyier shared a CSS snippet**](/css-tricks.com/snippets-css/ribbon.md) that I am sure has been used thousands of times over.

And for good reason: ribbons are fun and interesting to look at. They’re often used for headings, but that’s not all, of course. You’ll find corner ribbons on product cards (“Sale!”), badges with trimmed ribbon ends (“First Place!”), or even ribbons as icons for bookmarks. Ribbons are playful, wrapping around elements, adding depth and visual anchors to catch the eye’s attention.

I have created [<VPIcon icon="fas fa-globe"/>a collection of more than 100 ribbon shapes](https://css-generators.com/ribbon-shapes/), and we are going to study a few of them in this little two-part series. The challenge is to rely on a single element to create different kinds of ribbon shapes. What we really want is to create a shape that accommodates as many lines of text as you throw at them. In other words, there is no fixed dimension or magic numbers — the **shape should adapt to its content**.

Here is a demo of what we are building in this first part:

<CodePen
  user="smashingmag"
  slug-hash="LYMjNoo"
  title="Responsive multi-line ribbon shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

You can play with the text, adjust the screen size, change the font properties, and the shape will always fit the content perfectly. Cool, right? Don’t look at the code just yet because we will build this together from scratch.

---

## How Does It Work?

We are going to rely on a single HTML element, an `<h1>` in this case, though you can use any element you’d like as long as it can contain text.

```html
<h1>Your text goes here</h1>
```

Now, if you look closely at the ribbon shapes, you can notice a general layout that is the same for both designs. There’s really one piece that repeats over and over.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/1-ribbon-shapes.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/1-ribbon-shapes.png)

Sure, this is not the exact ribbon shape we want, but all we are missing is the cutouts on the ends. The idea is to first start with this generic design and add the extra decoration as we go.

Both ribbons in the demo we looked at are built using pretty much the same exact CSS; the only differences are nuances that help differentiate them, like color and decoration. That’s my secret sauce! Most of [<VPIcon icon="fas fa-globe"/>the ribbons from my generator](https://css-generators.com/ribbon-shapes/) share a common code structure, and I merely adjust a few values to get different variations.

---

## Let’s Start With The Gradients

Any time I hear that a component’s design needs to be repeated, I instantly think of background gradients. They are perfect for creating repeatable patterns, and they are capable of drawing lines with hard stops between colors.

We’re essentially talking about applying a background behind a text element. Each line of text gets the background and repeats for as many lines of text as there happens to be. So, the gradient needs to be as tall as one line of text. If you didn’t know it, we recently got the new line height (`lh`) unit in CSS that allows us to get the computed value of the element’s `line-height`. In our case, `1lh` will always be equal to the height of one line of text, which is perfect for what we need.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/2-new-line-height-lh.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/2-new-line-height-lh.png)

::: note

It appears that Safari uses the computed line height of a parent element rather than basing the `lh` unit on the element itself. I’ve accounted for that in the code by explicitly setting a `line-height` on the `body` element, which is the parent in our specific case. But hopefully, that will be unnecessary at some point in the future.

:::

Let’s tackle our first gradient. It’s a rectangular shape behind the text that covers part of the line and leaves breathing space between the lines.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/3-gradient-color-space-between-lines.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/3-gradient-color-space-between-lines.png)

The gradient’s red color is set to `70%` of the height, which leaves `30%` of transparent color to account for the space between lines.

```css
h1 {
  --c: #d81a14;
  
  background-image: linear-gradient(var(--c) 70%, #0000 0);
  background-position: 0 .15lh;
  background-size: 100% 1lh;
}
```

Nothing too complex, right? We’ve established a background gradient on an `h1` element. The color is controlled with a CSS variable (`--c`), and we’ve sized it with the `lh` unit to align it with the text content.

Note that the offset (`.15lh`) is equal to half the space between lines. We could have used a gradient with three color values (e.g., `transparent`, `#d81a14`, and `transparent`), but it’s more efficient and readable to keep things to two colors and then apply an offset.

Next, we need a second gradient for the wrapped or slanted part of the ribbon. This gradient is positioned behind the first one. The following figure demonstrates this with a little opacity added to the front ribbon’s color to see the relationship better.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/4-gradient-wrapped-part-ribbon.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/4-gradient-wrapped-part-ribbon.png)


Here’s how I approached it:

```css
linear-gradient(to bottom right, #0000 50%, red 0 X, #0000 0);
```

This time, we’re using keywords to set the gradient’s direction (`to bottom right`). Meanwhile, the color starts at the diagonal (`50%`) instead of its default `0%` and should stop at a value that we’re indicating as `X` for a placeholder. This value is a bit tricky, so let’s get a visual that illustrates what we’re doing.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/5-gradient-direction.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/5-gradient-direction.png)

The green arrow illustrates the gradient direction, and we can see the different color stops: `50%`, `X`, and `100%`. We can apply some geometry rules to solve for `X`:

```css
(X - 50%) / (100% - 50%) = 70%/100%
X = 85%
```

This gives us the exact point for the end of the gradient’s hard color stop. We can apply the `85%` value to our gradient configuration in CSS:

```css
h1 {
  --c: #d81a14;

  background-image:
  linear-gradient(var(--c) 70%, #0000 0),
  linear-gradient(to bottom left, #0000 50%, color-mix(in srgb, var(--c), #000 40%) 0 85%, #0000 0);
  background-position: 0 .15lh;
  background-size: 100% 1lh;
} 
```

You’re probably noticing that I added the new [**`color-mix()` function**](/smashingmagazine.com/simplify-color-palette-css-color-mix.md) to the second gradient. Why introduce it now? Because we can use it to mix the main color (`#d81a14`) with white or black. This allows us [**to get darker or lighter values of the color**](/css-tip.com/color-shades-color-mix.md) without having to introduce more color values and variables to the mix. It helps keep things efficient!

<CodePen
  user="smashingmag"
  slug-hash="eYbwwyo"
  title="The gradient configuration"
  :default-tab="['css','result']"
  :theme="dark"/>

We have accomplished the main piece of the design! We can turn our attention to creating the ribbon shape. You will notice some unwanted repetition at the top and the bottom. Don’t worry about it; it will be fixed in the next section.

---

## Next, Let’s Make The Ribbons

Before we move in, let’s take a moment to remember that we’re making two ribbons. The demo at the beginning of this article provides two examples: a red one and a green one. They’re similar in structure but differ in the visual details.

For the first one, we’re taking the start and end of the ribbon and basically clipping a triangle out of it. We’ll do a similar thing with the second ribbon example with an extra fold step for the cutout part.

### The First Ribbon

The only thing we need to do for the first ribbon is apply a `clip-path` to cut the triangular shape out from the ribbon’s ends while trimming unwanted artifacts from the repeating gradient at the top and bottom of the ribbon.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/6-gradient-clip-path.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/6-gradient-clip-path.png)

We have all of the coordinates we need to make our cuts using the `polygon()` function on the `clip-path` property. Coordinates are not always intuitive, but I have expanded the code and added a few comments below to help you identify some of the points from the figure.

```css
h1 {
  --r: 10px; /* control the cutout */

  clip-path: polygon(
   0 .15lh, /* top-left corner */
   100% .15lh, /* top right corner */
   calc(100% - var(--r)) .5lh, /* top-right cutout */
   100% .85lh,
   100% calc(100% - .15lh), /* bottom-right corner  */
   0 calc(100% - .15lh), /* bottom-left corner */
   var(--r) calc(100% - .5lh), /* bottom-left cutout */
   0 calc(100% - .85lh)
  );
}
```

This completes the first ribbon! Now, we can wrap things up (pun intended) with the second ribbon.

### The Second Ribbon

We will use both pseudo-elements to complete the shape. The idea can be broken down like this:

1. We **create two rectangles** that are placed at the start and end of the ribbon.
2. We **rotate the two rectangles** with an angle that we define using a new variable, `--a`.
3. We **apply a `clip-path`** to create the triangle cutout and trim where the green gradient overflows the top and bottom of the shape.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/7-second-ribbon.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/7-second-ribbon.png)

First, the variables:

```css
h1 {
  --r: 10px;  /* controls the cutout */
  --a: 20deg; /* controls the rotation */
  --s: 6em;   /* controls the size */
}
```

Next, we’ll apply styles to the `:before` and `:after` pseudo-elements that they share in common:

```css
h1:before,
h1:after {
  content: "";
  position: absolute;
  height: .7lh;
  width: var(--s);
  background: color-mix(in srgb, var(--c), #000 40%);
  rotate: var(--a);
}
```

Then, we position each pseudo-element and make our clips:

```css
h1:before {
  top: .15lh;
  right: 0;
  transform-origin: top right;
  clip-path: polygon(0 0, 100% 0, calc(100% - .7lh / tan(var(--a))) 100%, 0 100%, var(--r) 50%);
}

h1:after {
  bottom: .15lh;
  left: 0;
  transform-origin: bottom left;
  clip-path: polygon(calc(.7lh / tan(var(--a))) 0, 100% 0, calc(100% - var(--r)) 50%, 100% 100%, 0 100%);
} 
```

We are almost done! We still have some unwanted overflow where the repeating gradient bleeds out of the top and bottom of the shape. Plus, we need small cutouts to match the pseudo-element’s shape.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/8-second-ribbon-clip-path.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/8-second-ribbon-clip-path.png)

It’s `clip-path` again to the rescue, this time on the main element:

```css
clip-path: polygon(
  0 .15lh,
  calc(100% - .7lh/sin(var(--a))) .15lh,
  calc(100% - .7lh/sin(var(--a)) - 999px) calc(.15lh - 999px*tan(var(--a))),
  100% -999px,
  100% .15lh,
  calc(100% - .7lh*tan(var(--a)/2)) .85lh,
  100% 1lh,
  100% calc(100% - .15lh),
  calc(.7lh/sin(var(--a))) calc(100% - .15lh),
  calc(.7lh/sin(var(--a)) + 999px) calc(100% - .15lh + 999px*tan(var(--a))),
  0 999px,
  0 calc(100% - .15lh),
  calc(.7lh*tan(var(--a)/2)) calc(100% - .85lh),
  0 calc(100% - 1lh)
);
```

Ugh, looks scary! I’m taking advantage of a new set of [<VPIcon icon="iconfont icon-webdev"/>trigonometric functions](https://web.dev/articles/css-trig-functions) that help a bunch with the calculations but probably look foreign and confusing if you’re seeing them for the first time. There is a mathematical explanation behind each value in the snippet that I’d love to explain, but it’s long-winded. That said, I’m more than happy to explain them in greater detail if you drop me a line in the comments.

Our second ribbon is completed! Here is the full demo again with both variations.

<CodePen
  user="smashingmag"
  slug-hash="LYMjNoo"
  title="CodePen Home Responsive multi-line ribbon shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrapping Up

We looked at two ribbon variations that use almost the same code structure, but we can make many, many more the same way. Your homework, if you accept it, will be to make the following variations using what you have learned so far.

![[<VPIcon icon="fas fa-globe"/>Large preview](https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/9-two-ribbon-variations-css.png)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/css-responsive-multi-line-ribbon-shapes-part1/9-two-ribbon-variations-css.png)
You can still find the code within [<VPIcon icon="fas fa-globe"/>my ribbons collection](https://css-generators.com/ribbon-shapes/), but it’s a good exercise to try writing code without. Maybe you will find a different implementation than mine and want to share it with me in the comments! In the [**next article**](/smashingmagazine.com/css-responsive-multi-line-ribbon-shapes-part2.md) of this two-part series, we will increase the complexity and produce two more interesting ribbon shapes.

::: info Further Reading On SmashingMag

- “[**Art Direction For The Web Using CSS Shapes**](/smashingmagazine.com/art-direction-for-the-web-using-css-shapes.md),” Andrew Clarke
- “[**Take A New Look At CSS Shapes**](/smashingmagazine.com/css-shapes.md),” Rachel Andrew
- “[**Creating Responsive Shapes With Clip-Path And Breaking Out Of The Box**](/smashingmagazine.com/creating-responsive-shapes-with-clip-path.md),” Karen Menezes
- “[**New CSS Features That Are Changing Web Design**](/smashingmagazine.com/future-of-web-design.md),” Zell Liew

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Responsive Multi-Line Ribbon Shapes (Part 1)",
  "desc": "Ribbons have been used to accent designs for many years now. But, the way we approach them in CSS has evolved with the introduction of newer features. In this article, Temani Afif combines background and gradient tricks to create ribbon shapes in CSS that are not only responsive but support multi-line text and are easily adjustable with a few CSS variables.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-responsive-multi-line-ribbon-shapes-part1.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
