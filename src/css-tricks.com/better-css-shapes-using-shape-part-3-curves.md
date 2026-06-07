---
lang: en-US
title: "Better CSS Shapes Using shape() — Part 3: Curves"
description: "Article(s) > Better CSS Shapes Using shape() — Part 3: Curves"
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
      content: "Article(s) > Better CSS Shapes Using shape() — Part 3: Curves"
    - property: og:description
      content: "Better CSS Shapes Using shape() — Part 3: Curves"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-3-curves.html
prev: /programming/css/articles/README.md
date: 2025-06-06
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/css-shape-curve-diagram.webp
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
  name="Better CSS Shapes Using shape() — Part 3: Curves"
  desc="This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes."
  url="https://css-tricks.com/better-css-shapes-using-shape-part-3-curves"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/css-shape-curve-diagram.webp"/>

If you’re following along, this is the third post in a series about the new CSS `shape()` function. We’ve learned how to draw lines and arcs and, in this third part, I will introduce the `curve` command — the missing command you need to know to have full control over the `shape()` function. In reality, there are more commands, but you will rarely need them and you can easily learn about them later by checking the documentation.

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

## The `curve` command

This command adds a Bézier curve between two points by specifying control points. We can either have one control point and create a Quadratic curve or two control points and create a Cubic curve.

> Bézier, Quadratic, Cubic, control points? What?!

For many of you, that definition is simply unclear, or even useless! You can spend a few minutes reading about Bézier curves but is it really worth it? Probably not, unless your job is to create shapes all the day and you have a solid background in geometry.

We already have [**`cubic-bezier()`**](https://css-tricks.com/almanac-functions/cubic-bezier.md)` as an easing function for animations but, honestly, who really understands how it works? We either rely on a generator to get the code or we read a “boring” explanation that we forget in two minutes. ([**I have one right here by the way!**](/css-tricks.com/advanced-css-animation-using-cubic-bezier.md))

Don’t worry, this article will not be boring as I will mostly focus on practical examples and more precisely the use case of rounding the corners of irregular shapes. Here is a figure to illustrate a few examples of Bézier curves.

![Comparing two curved lines, one with one control point and one with two control points.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_CA5FF42D54A3B2DEF87A93172940512B207A6EA57FD63EDD21AFC86A6AB687D3_1748026970288_image.png.webp?resize=767%2C469&ssl=1)

The blue dots are the starting and ending points (let’s call them A and B) and the black dots are the control points. And notice how the curve is tangent to the dashed lines illustrated in red.

In this article, I will consider only one control point. The syntax will follow this pattern:

```css
clip-path: shape(
  from Xa Ya, 
  curve to Xb Yb with Xc Yc
);
```

---

## `arc` command vs. `curve` command

We already saw in Part 1 and Part 2 that the `arc` command is useful establishing rounded edges and corners, but it will not cover all the cases. That’s why you will need the `curve` command. The tricky part is to know when to use each one and the answer is “it depends.” There is no generic rule but my advice is to first see if it’s possible (and easy) using `arc`. If not, then you have to use `curve`.

For some shapes, we can have the same result using both commands and this is a good starting point for us to understand the `curve` command and compare it with `arc`.

Take the following example:

<CodePen
  user="anon"
  slug-hash="emmqJOv"
  title="arc vs curve"
  :default-tab="['css','result']"
  :theme="dark"/>

This is the code for the first shape:

```css
.shape {
  clip-path: shape(from 0 0,
    arc to 100% 100% of 100% cw,
    line to 0 100%)
}
```

And for the second one, we have this:

```css
.shape {
  clip-path: shape(from 0 0,
    curve to 100% 100% with 100% 0,
    line to 0 100%)
}
```

The `arc` command needs a radius (`100%` in this case), but the `curve` command needs a control point (which is `100% 0` in this example).

![Two rounded shapes that appear to have similar curves, one using an arc and another using a curve.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_CA5FF42D54A3B2DEF87A93172940512B207A6EA57FD63EDD21AFC86A6AB687D3_1747829152319_image.png.webp?resize=835%2C430&ssl=1)

Now, if you look closely, you will notice that both results aren’t exactly the same. The first shape using the `arc` command is creating a quarter of a circle, whereas the shape using the `curve` command is slightly different. If you place both of them above each other, you can clearly see the difference.

<CodePen
  user="anon"
  slug-hash="RNNXrLz"
  title="arc vs curve"
  :default-tab="['css','result']"
  :theme="dark"/>

This is interesting because it means we can round some corners using either an `arc` or a `curve`, but with slightly different results. Which one is better, you ask? I would say it depends on your visual preference and the shape you are creating.

In [**Part 1**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md), we created rounded tabs using the `arc` command, but we can also create them with `curve`.

<CodePen
  user="anon"
  slug-hash="LEEwGJa"
  title="rounded tab (arc vs curve)"
  :default-tab="['css','result']"
  :theme="dark"/>

Can you spot the difference? It’s barely visible but it’s there.

Notice how I am using the `by` directive the same way I am doing with `arc`, but this time we have the control point, which is also relative. This part can be confusing, so pay close attention to this next bit.

Consider the following:

```css
shape(from Xa Ya, curve by Xb Yb with Xc Yc)
```

It means that both `(Xb,Yb)` and `(Xc,Yc)` are relative coordinates calculated from the coordinate of the starting point. The equivalent of the above using a `to` directive is this:

```css
shape(from Xa Ya, curve to (Xa + Xb) (Ya + Yb) with (Xa + Xc) (Yb + Yc))
```

We can change the reference of the control point by adding a `from` directive. We can either use `start` (the default value), `end`, or `origin`.

```css
shape(from Xa Ya, curve by Xb Yb with Xc Yc from end)
```

The above means that the control point will now consider the ending point instead of the starting point. The result is similar to:

```css
shape(from Xa Ya, curve to (Xa + Xb) (Ya + Yb) with (Xa + Xb + Xc) (Ya + Yb + Yc))
```

If you use `origin`, the reference will be the origin, hence the coordinate of the control point becomes absolute instead of relative.

The `from` directive may add some complexity to the code and the calculation, so don’t bother yourself with it. Simply know it exists in case you face it, but keep using the default value.

I think it’s time for your first homework! Similar to the rounded tab exercise, try to create the [**inverted radius shape we covered in the Part 1**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md#inverted-radius) using `curve` instead of `arc`. Here are both versions for you to reference, but try to do it without peeking first, if you can.

<CodePen
  user="anon"
  slug-hash="bNNXoBr"
  title="inverted radius (arc vs curve)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Let’s draw more shapes!

Now that we have a good overview of the `curve` command, let’s consider more complex shapes where `arc` won’t help us round the corners and the only solution is to draw curves instead. Considering that each shape is unique, so I will focus on the technique rather than the code itself.

### Slanted edge

Let’s start with a rectangular shape with a slanted edge.

![A slanted rectangle shape in two stages, first with sharp edges, then with curved edges.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_CA5FF42D54A3B2DEF87A93172940512B207A6EA57FD63EDD21AFC86A6AB687D3_1747907121098_image.png.webp?resize=777%2C268&ssl=1)

Getting the shape on the left is quite simple, but the shape on the right is a bit tricky. We can round two corners with a simple `border-radius`, but for the slanted edge, we will use `shape()` and two `curve` commands.

The first step is to write the code of the shape without rounded corners (the left one) which is pretty straightforward since we’re only working with the `line` command:

```css
.shape {
  --s: 90px;  /* slant size */

  clip-path: 
    shape(from 0 0,
    line to calc(100% - var(--s)) 0,
    line to 100% 100%,
    line to 0 100%
    );
}
```

Then we take each corner and try to round it by modifying the code. Here is a figure to illustrate the technique I am going to use for each corner.

![Diagrammiong a rounded rectangular shape in three stages, first with sharp edges, then with points indicating where the curve control points are, then the completed shape.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_CA5FF42D54A3B2DEF87A93172940512B207A6EA57FD63EDD21AFC86A6AB687D3_1747908378803_image.png-1024x330.webp?resize=1024%2C330&ssl=1)

We define a distance, `R`, that controls the radius. From each side of the corner point, I move by that distance to create two new points, which are illustrated above in red. Then, I draw my `curve` using the new points as starting and ending points. The corner point will be the control point.

The code becomes:

```css{6-7}
.shape {
  --s: 90px;  /* slant size */

  clip-path: 
    shape(from 0 0,
    Line  to Xa Ya,
    curve to Xb Yb with calc(100% - var(--s)) 0,
    line to 100% 100%,
    line to 0 100%
    );
}
```

Notice how the `curve` is using the coordinates of the corner point in the `with` directive, and we have two new points, A and B.

Until now, the technique is not that complex. For each corner point, you replace the `line` command with `line` + `curve` commands where the `curve` command reuses the old point in its `with` directive.

If we apply the same logic to the other corner, we get the following:

```css{8-9}
.shape {
  --s: 90px;  /* slant size */

  clip-path: 
    shape(from 0 0,
    line  to Xa Ya, 
    curve to Xb Yb with calc(100% - var(--s)) 0,
    line  to Xc Yc,
    curve to Xd Yd with 100% 100%,
    line to 0 100%
    );
}
```

Now we need to calculate the coordinates of the new points. And here comes the tricky part because it’s not always simple and it may require some complex calculation. Even if I detail this case, the logic won’t be the same for the other shapes we’re making, so I will skip the math part and give you the final code:

```css
.box {
  --h: 200px; /* element height */
  --s: 90px;  /* slant size */
  --r: 20px;  /* radius */
  
  height: var(--h);
  border-radius: var(--r) 0 0 var(--r);
  --_a: atan2(var(--s), var(--h));
  clip-path: 
    shape(from 0 0,
    line  to calc(100% - var(--s) - var(--r)) 0,
    curve by calc(var(--r) * (1 + sin(var(--_a)))) 
              calc(var(--r) * cos(var(--_a)))
    with var(--r) 0,
    line  to calc(100% - var(--r) * sin(var(--_a))) 
              calc(100% - var(--r) * cos(var(--_a))),
    curve to calc(100% - var(--r)) 100%  with 100% 100%,
    line to 0 100%
    );
}
```

I know the code looks a bit scary, but the good news is that the code is also really easy to control using CSS variables. So, even if the math is not easy to grasp, you don’t have to deal with it. It should be noted that I need to know the height to be able to calculate the coordinates which means the solution isn’t perfect because the height is a fixed value.

<CodePen
  user="anon"
  slug-hash="bNNXooY"
  title="Slanted edge with round corners"
  :default-tab="['css','result']"
  :theme="dark"/>

### Arrow-shaped box

Here’s a similar shape, but this time we have three corners to round using the `curve` command.

<CodePen
  user="anon"
  slug-hash="LEENyEq"
  title="Arrow-like Box with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

The final code is still complex but I followed the same steps. I started with this:

```css
.shape {
  --s: 90px; 

  clip-path: 
    shape(from 0 0,
    /* corner #1 */
    line to calc(100% - var(--s)) 0,
    /* corner #2 */
    line to 100% 50%,
    /* corner #3 */
    line to calc(100% - var(--s)) 100%,

    line to 0 100%
    );
}
```

Then, I modified it into this:

```css
.shape {
  --s: 90px; 

  clip-path: 
    shape(from 0 0,
    /* corner #1 */
    line  to Xa Ya
    curve to Xb Yb with calc(100% - var(--s)) 0,
    /* corner #2 */
    line  to Xa Ya
    curve to Xb Yb with 100% 50%,
    /* corner #3 */
    line  to Xa Yb
    curve to Xb Yb with calc(100% - var(--s)) 100%,

    line to 0 100%
    );
}
```

Lastly, I use a pen and paper to do all the calculations.

You might think this technique is useless if you are not good with math and geometry, right? Not really, because you can still grab the code and use it easily since it’s optimized using CSS variables. Plus, you aren’t obligated to be super accurate and precise. You can rely on the above technique and use trial and error to approximate the coordinates. It will probably take you less time than doing all the math.

### Rounded polygons

I know you are waiting for this, right? Thanks to the new `shape()` and the `curve` command, we can now have [**rounded polygon shapes**](/css-tip.com/rounded-polygon.md)!

![Three rounded polygon shapes, first a pentagon, second a triangle, and third an octagon.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/XOAYt9t8ba-785.png.webp?resize=785%2C283&ssl=1)

Here is my implementation using Sass where you can control the radius, number of sides and the rotation of the shape:

<CodePen
  user="anon"
  slug-hash="xbbxMdg"
  title="Polygon shapes with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

If we omit the complex geometry part, the loop is quite simple as it relies on the same technique with a `line` + `curve` per corner.

```scss
$n: 9; /* number of sides*/
$r: .2; /* control the radius [0 1] */
$a: 15deg; /* control the rotation */

.poly {
  aspect-ratio: 1;
  $m: ();
  @for $i from 0 through ($n - 1) {
    $m: append($m, line  to Xai Yai, comma);
    $m: append($m, curve to Xbi Ybi with Xci Yci, comma);
  } 
  clip-path: shape(#{$m});
}
```

Here is another implementation where I define the variables in CSS instead of Sass:

<CodePen
  user="anon"
  slug-hash="KwwKVZr"
  title="Polygon shapes with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

Having the variables in CSS is pretty handy especially if you want to have some animations. Here is an example of a cool hover effect applied to hexagon shapes:

<CodePen
  user="anon"
  slug-hash="myydVbr"
  title="Rounded hexagon shapes with hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

I have also updated [<VPIcon icon="fas fa-globe"/>my online generator](https://css-generators.com/polygon-shape/) to add the radius parameter. If you are not familiar with Sass, you can easily copy the CSS code from there. You will also find the border-only and cut-out versions!

![A rounded shape with six sides next to a cutout of a rounded shape with six edges.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_CA5FF42D54A3B2DEF87A93172940512B207A6EA57FD63EDD21AFC86A6AB687D3_1747913994712_image.png.webp?resize=707%2C335&ssl=1)

---

## Conclusion

Are we done with the `curve` command? Probably not, but we have a good overview of its potential and all the complex shapes we can build with it. As for the code, I know that we have reached a level that is not easy for everyone. I could have extended the explanation by explicitly breaking down the math, but then this article would be overly complex and make it seem like using `shape()` is harder than it is.

This said, most of the shapes I code are available within [<VPIcon icon="fas fa-globe"/>my online collection](https://css-shape.com/) that I constantly update and optimize so you can easily grab the code of any shape!

::: info

If you want a good follow-up to this article, [**I wrote an article for Frontend Masters**](/master.dev/creating-blob-shapes-using-clip-path-shape.md) where you can create blob shapes using the `curve` command.

:::

![Three blob shapes in a single row, each colored with a gradient that goes left to right from dark orange to light orange.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/blobs1.jpg.webp?resize=808%2C361&ssl=1)

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
  "title": "Better CSS Shapes Using shape() — Part 3: Curves",
  "desc": "This is the third article in a series about the CSS shape() function. We've covered drawing lines and arcs in previous articles and, this time, we look specifically at the curve command and how to use it for drawing complex shapes.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-3-curves.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
