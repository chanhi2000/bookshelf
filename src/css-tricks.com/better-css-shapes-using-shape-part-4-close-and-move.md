---
lang: en-US
title: "Better CSS Shapes Using shape() — Part 4: Close and Move"
description: "Article(s) > Better CSS Shapes Using shape() — Part 4: Close and Move"
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
      content: "Article(s) > Better CSS Shapes Using shape() — Part 4: Close and Move"
    - property: og:description
      content: "Better CSS Shapes Using shape() — Part 4: Close and Move"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.html
prev: /programming/css/articles/README.md
date: 2025-07-07
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/css-shapes-function-csstricks-logo.webp
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
  name="Better CSS Shapes Using shape() — Part 4: Close and Move"
  desc="The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes."
  url="https://css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/css-shapes-function-csstricks-logo.webp"/>

This is the fourth post in a series about the new CSS [**`shape()`**](/css-tricks.com/almanac-functions/shape.md) function. So far, we’ve covered the most common commands you will use to draw various shapes, including lines, arcs, and curves. This time, I want to introduce you to two more commands: `close` and `move`. They’re fairly simple in practice, and I think you will rarely use them, but they are incredibly useful when you need them.

::: info Series: Better CSS Shapes Using <code>shape()</code>

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 2: More on Arcs",
  "desc": "This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 3: Curves",
  "desc": "This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-3-curves.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 4: Close and Move",
  "desc": "The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## The `close` command

In [**the first part**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md), we said that `shape()` always starts with a `from` command to define the first starting point but what about the end? It should end with a `close` command.

> But you never used any `close` command in the previous articles!?

That’s true. I never did because I either “close” the shape myself or rely on the browser to “close” it for me. Said like that, it’s a bit confusing, but let’s take a simple example to better understand:

```css
clip-path: shape(from 0 0, line to 100% 0, line to 100% 100%) 
```

If you try this code, you will get a triangle shape, but if you look closely, you will notice that we have only two line commands whereas, to draw a triangle, we need a total of three lines. The last line between `100% 100%` and `0 0` is implicit, and that’s the part where the browser is closing the shape for me without having to explicitly use a `close` command.

I could have written the following:

```css
clip-path: shape(from 0 0, line to 100% 0, line to 100% 100%, close)
```

Or instead, define the last line by myself:

```css
clip-path: shape(from 0 0, line to 100% 0, line to 100% 100%, line to 0 0)
```

But since the browser is able to close the shape alone, there is no need to add that last `line` command nor do we need to explicitly add the `close` command.

This might lead you to think that the `close` command is useless, right? It’s true in most cases (after all, I have written three articles about `shape()` without using it), but it’s important to know about it and what it does. In some particular cases, it can be useful, especially if used in the middle of a shape.

<CodePen
  user="anon"
  slug-hash="KwpxGEp"
  title="Four triangles shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

In this example, my starting point is the center and the logic of the shape is to draw four triangles. In the process, I need to get back to the center each time. So, instead of writing `line to center`, I simply write `close` and the browser will automatically get back to the initial point!

Intuitively, we should write the following:

```css
clip-path: shape( 
  from center, 
  line to 20%  0,   hline by 60%, line to center, /* triangle 1 */
  line to 100% 20%, vline by 60%, line to center, /* triangle 2 */
  line to 20% 100%, hline by 60%, line to center, /* triangle 3 */
  line to 0   20%,  vline by 60% /* triangle 4 */
)
```

But we can optimize it a little and simply do this instead:

```css
clip-path: shape( 
  from center, 
  line to 20%  0,   hline by 60%, close,
  line to 100% 20%, vline by 60%, close,
  line to 20% 100%, hline by 60%, close,
  line to 0    20%, vline by 60%
)
```

We write less code, sure, but another important thing is that if I update the `center` value with another position, **the** `close` **command will follow that position**.

<CodePen
  user="anon"
  slug-hash="Kwpbvma"
  title="Four triangles shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

Don’t forget about this trick. It can help you optimize a lot of shapes by writing less code.

---

## The `move` command

Let’s turn our attention to another `shape()` command you may rarely use, but can be incredibly useful in certain situations: the `move` command.

Most times when we need to draw a shape, it’s actually *one continuous shape*. But it may happen that our shape is composed of different parts not linked together. In these situations, the `move` command is what you will need.

Let’s take an example, similar to the previous one, but this time the triangles don’t touch each other:

<CodePen
  user="anon"
  slug-hash="WbvgYeb"
  title="Four triangles shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

Intuitively, we may think we need four separate elements, with its own `shape()` definition. But the that example is a single shape!

The trick is to draw the first triangle, then “move” somewhere else to draw the next one, and so on. The `move` command is similar to the `from` command but we use it in the middle of `shape()`.

```css
clip-path: shape(
  from    50% 40%, line to 20%  0,   hline by 60%, close, /* triangle 1 */
  move to 60% 50%, line to 100% 20%, vline by 60%, close, /* triangle 2 */
  move to 50% 60%, line to 20% 100%, hline by 60%, close, /* triangle 3 */
  move to 40% 50%, line to 0   20%,  vline by 60% /* triangle 4 */
)
```

After drawing the first triangle, we “close” it and “move” to a new point to draw the next triangle. We can have multiple shapes using a single `shape()` definition. A more generic code will look like the below:

```css
clip-path: shape(
  from    X1 Y1, ..., close, /* shape 1 */
  move to X2 Y2, ..., close, /* shape 2 */
  ...
  move to Xn Yn, ... /* shape N */
)
```

The `close` commands before the `move` commands aren’t mandatory, so the code can be simplified to this:

```css
clip-path: shape(
  from    X1 Y1, ..., /* shape 1 */
  move to X2 Y2, ..., /* shape 2 */
  ...
  move to Xn Yn, ... /* shape N */
)
```

<CodePen
  user="anon"
  slug-hash="WbvYPBL"
  title="Four triangles shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s look at a few interesting use cases where this technique can be helpful.

### Cut-out shapes

Previously, I shared a trick on [**how to create cut-out shapes**](/css-tip.com/cut-out-shapes.md) using `clip-path: polygon()`. Starting from any kind of polygon, we can easily invert it to get its cut-out version:

<CodePen
  user="anon"
  slug-hash="gOJvdav"
  title="Cut-out shapes using clip-path"
  :default-tab="['css','result']"
  :theme="dark"/>

We can do the same using `shape()`. The idea is to have an intersection between the main shape and the rectangle shape that fits the element boundaries. We need two shapes, hence the need for the `move` command.

The code is as follows:

```css
.shape {
  clip-path: shape(from ...., move to 0 0, hline to 100%, vline to 100%, hline to 0);
}
```

You start by creating your main shape and then you “move” to `0 0` and you create the rectangle shape (Remember, It’s the first shape we create in [**the first part of this series**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md#rectangle)). We can even go further and introduce a CSS variable to easily switch between the normal shape and the inverted one.

```css
.shape {
  clip-path: shape(from .... var(--i,));
}
.invert {
  --i:,move to 0 0, hline to 100%, vline to 100%, hline to 0;
}
```

By default, `--i` is not defined so `var(--i,)`will be empty and we get the main shape. If we define the variable with the rectangle shape, we get the inverted version.

Here is an example using a rounded hexagon shape:

<CodePen
  user="anon"
  slug-hash="WbvYWNr"
  title="rounded hexagon shape (inverted)"
  :default-tab="['css','result']"
  :theme="dark"/>

In reality, the code should be as follows:

```css
.shape {
  clip-path: shape(evenodd from .... var(--i,));
}
.invert {
  --i:,move to 0 0, hline to 100%, vline to 100%, hline to 0;
}
```

Notice the `evenodd` I am adding at the beginning of `shape()`. I won’t bother you with a detailed explanation on what it does but in some cases, the inverted shape is not visible and the fix is to add `evenodd` at the beginning. You can check [<VPIcon icon="fa-brands fa-firefox"/>the MDN page for more details](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/fill-rule).

Another improvement we can do is to add a variable to control the space around the shape. Let’s suppose you want to make the hexagon shape of the previous example smaller. It‘s tedious to update the code of the hexagon but it’s easier to update the code of the rectangle shape.

```css
.shape {
  clip-path: shape(evenodd from ... var(--i,)) content-box;
}
.invert {
  --d: 20px;
  padding: var(--d);
  --i: ,move to calc(-1*var(--d)) calc(-1*var(--d)),
        hline to calc(100% + var(--d)),
        vline to calc(100% + var(--d)),
        hline to calc(-1*var(--d));
}
```

We first update the reference box of the shape to be `content-box`. Then we add some padding which will logically reduce the area of the shape since it will no longer include the padding (nor the border). The padding is excluded (invisible) by default and here comes the trick where we update the rectangle shape to re-include the padding.

That is why the `--i` variable is so verbose. It uses the value of the padding to extend the rectangle area and cover the whole element as if we didn’t have `content-box`.

<CodePen
  user="anon"
  slug-hash="WbvYWRG"
  title="Control the space"
  :default-tab="['css','result']"
  :theme="dark"/>

Not only you can easily invert any kind of shape, but you can also control the space around it! Here is another demo using the CSS-Tricks logo to illustrate how easy the method is:

<CodePen
  user="anon"
  slug-hash="PwqxMaN"
  title="inverting the CSS Tricks logo"
  :default-tab="['css','result']"
  :theme="dark"/>

This exact same example is available in my [<VPIcon icon="fas fa-globe"/>SVG-to-CSS converter](https://css-generators.com/svg-to-css/), providing you with the `shape()` code without having to do all of the math.

### Repetitive shapes

Another interesting use case of the `move` command is when we need to repeat the same shape multiple times. Do you remember the difference between the `by` and the `to` directives? The `by` directive allows us to define relative coordinates considering the previous point. So, if we create our shape using only `by`, we can easily reuse the same code as many times as we want.

Let’s start with a simple example of a circle shape:

```css
clip-path: shape(from X Y, arc by 0 -50px of 1%, arc by 0 50px of 1%)
```

Starting from `X Y`, I draw a first arc moving upward by `50px`, then I get back to `X Y` with another arc using the same offset, but downward. If you are a bit lost with the syntax, try reviewing [**Part 1**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md) to refresh your memory about the `arc` command.

How I drew the shape is not important. What is important is that whatever the value of `X Y` is, I will always get the same circle but in a different position. Do you see where I am going with this idea? If I want to add another circle, I simply repeat the same code with a different `X Y`.

```css
clip-path: shape(
  from    X1 Y1, arc by 0 -50px of 1%, arc by 0 50px of 1%,
  move to X2 Y2, arc by 0 -50px of 1%, arc by 0 50px of 1%
)
```

And since the code is the same, I can store the circle shape into a CSS variable and draw as many circles as I want:

```css
.shape {
  --sh:, arc by 0 -50px of 1%, arc by 0 50px of 1%;
  
  clip-path: shape(
    from    X1 Y1 var(--sh),
    move to X2 Y2 var(--sh),
    ... 
    move to Xn Yn var(--sh)
  ) 
}
```

You don’t want a circle? Easy, you can update the `--sh` variable with any shape you want. Here is an example with three different shapes:

<CodePen
  user="anon"
  slug-hash="MYwZgEL"
  title="Different shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

And guess what? You can invert the whole thing using the cut-out technique by adding the rectangle shape at the end:

<CodePen
  user="anon"
  slug-hash="ByNEgVw"
  title="Inverting the shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

This code is a perfect example of the `shape()` function’s power. We don’t have any code duplication and we can simply adjust the shape with CSS variables. This is something we are unable to achieve with the `path()` function because it doesn’t support variables.

---

## Conclusion

That’s all for this fourth installment of our series on the CSS `shape()` function! We didn’t make any super complex shapes, but we learned how two simple commands can open a lot of possibilities of what can be done using `shape()`.

Just for fun, here is one more demo recreating a classic [**three-dot loader**](/css-tip.com/dots-loader.md) using the last technique we covered. Notice how much further we could go, adding things like animation to the mix:

<CodePen
  user="anon"
  slug-hash="azOPoaO"
  title="Dots loader using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>
  
::: info Series: Better CSS Shapes Using <code>shape()</code>

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 2: More on Arcs",
  "desc": "This is the second part of a series that dives deep into the CSS shape() command, continuing with a more detailed look at the arc command.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 3: Curves",
  "desc": "This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-3-curves.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 4: Close and Move",
  "desc": "The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 4: Close and Move",
  "desc": "The shape() function's close and move commands may not be ones you reach for often, but are incredibly useful for certain shapes.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
