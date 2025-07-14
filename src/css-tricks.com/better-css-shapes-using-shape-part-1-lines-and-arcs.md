---
lang: en-US
title: "Better CSS Shapes Using shape() — Part 1: Lines and Arcs"
description: "Article(s) > Better CSS Shapes Using shape() — Part 1: Lines and Arcs"
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
      content: "Article(s) > Better CSS Shapes Using shape() — Part 1: Lines and Arcs"
    - property: og:description
      content: "Better CSS Shapes Using shape() — Part 1: Lines and Arcs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.html
prev: /programming/css/articles/README.md
date: 2025-07-07
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/09/css-shapes.jpg
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
  name="Better CSS Shapes Using shape() — Part 1: Lines and Arcs"
  desc="This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs."
  url="https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/09/css-shapes.jpg"/>

Creating CSS Shapes is a classic and one of my favorite exercise. Indeed, I have [<FontIcon icon="fas fa-globe"/>one of the biggest collections of CSS Shapes](https://css-shape.com/) from where you can easily copy the code of any shape. I also wrote an extensive guide on how to create them: **[The Modern Guide For Making CSS Shapes](https://smashingmagazine.com/2024/05/modern-guide-making-css-shapes/)**.

<!-- TODO: /smashingmagazine.com/modern-guide-making-css-shapes.md -->

Even if I have detailed most of the modern techniques and tricks, CSS keeps evolving, and new stuff always emerges to simplify our developer life. Recently, `clip-path` was upgraded to have a new `shape()` value. A real game changer!

::: info Series: Better CSS Shapes Using `shape()`

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
2. [More on Arcs](https://css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs/)
3. [Curves](https://css-tricks.com/better-css-shapes-using-shape-part-3-curves/)
4. [Close and Move](https://css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move/)

:::

Before we jump in, it’s worth calling out that the `shape()` function is currently only supported in Chrome 137+ and Safari 18.4+ as I’m writing this in May 2025. ### `?

Let me quote the description from [the official specification](https://drafts.csswg.org/css-shapes-2/#shape-function):

::: info CSS Shapes Module Level 2 (<FontIcon icon="fas fa-globe"/><code>drafts.csswg.org></code>)

> While the `path()` function allows reuse of the SVG path syntax to define more arbitrary shapes than allowed by more specialized shape functions, it requires writing a path as a single string (which is not compatible with, for example, building a path piecemeal with var()), and inherits a number of limitations from SVG, such as implicitly only allowing the px unit.
> 
> The `shape()` function uses a set of commands roughly equivalent to the ones used by `path()`, but does so with more standard CSS syntax, and allows the full range of CSS functionality, such as additional units and math functions.

```component VPCard
{
  "title": "CSS Shapes Module Level 2",
  "desc": "This draft contains the features of CSS relating to wrapping content around and inside shapes. It (implicitly for now) includes and extends the functionality of CSS Shapes Level 1 [CSS-SHAPES]. The main points of extension compared to level 1 include additional ways of defining shapes, defining an exclusion area using a shape, and restricting an element’s content area using a shape.",
  "link": "https://drafts.csswg.org/css-shapes-2/#shape-function/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

In other words, we have the SVG features in the CSS side that we can combine with existing features such as `var()`, `calc()`, different units, etc. SVG is already good at drawing complex shapes, so imagine what is possible with something more powerful.

If you keep reading the spec, you will find:

> In that sense, `shape()` is a superset of `path()`. A `path()` can be easily converted to a `shape()`, but to convert a `shape()` back to a `path()` or to SVG requires information about the CSS environment.

And guess what? I already created [<FontIcon icon="fas fa-globe"/>an online converter from SVG to CSS](https://css-generators.com/svg-to-css/). Save this tool because it will be very handy. If you are already good at creating SVG shapes or you have existing codes, no need to reinvent the wheel. You paste your code in the generator, and you get the CSS code that you can easily tweak later.

Let’s try with the CSS-Tricks logo. Here is the SVG I picked from the website:

```xml
<svg width="35px" height="35px" viewBox="0 0 362.62 388.52" >
  <path d="M156.58,239l-88.3,64.75c-10.59,7.06-18.84,11.77-29.43,11.77-21.19,0-38.85-18.84-38.85-40C0,257.83,14.13,244.88,27.08,239l103.6-44.74L27.08,148.34C13,142.46,0,129.51,0,111.85,0,90.66,18.84,73,40,73c10.6,0,17.66,3.53,28.25,11.77l88.3,64.75L144.81,44.74C141.28,20,157.76,0,181.31,0s40,18.84,36.5,43.56L206,149.52l88.3-64.75C304.93,76.53,313.17,73,323.77,73a39.2,39.2,0,0,1,38.85,38.85c0,18.84-12.95,30.61-27.08,36.5L231.93,194.26,335.54,239c14.13,5.88,27.08,18.83,27.08,37.67,0,21.19-18.84,38.85-40,38.85-9.42,0-17.66-4.71-28.26-11.77L206,239l11.77,104.78c3.53,24.72-12.95,44.74-36.5,44.74s-40-18.84-36.5-43.56Z"></path>
</svg>
```

You take the value inside the `d` attribute, paste it in the converter, and *boom*! You have the following CSS:

```css
.shape {
  aspect-ratio: 0.933;
  clip-path: shape(from 43.18% 61.52%,line by -24.35% 16.67%,curve by -8.12% 3.03% with -2.92% 1.82%/-5.2% 3.03%,curve by -10.71% -10.3% with -5.84% 0%/-10.71% -4.85%,curve to 7.47% 61.52% with 0% 66.36%/3.9% 63.03%,line by 28.57% -11.52%,line to 7.47% 38.18%,curve to 0% 28.79% with 3.59% 36.67%/0% 33.33%,curve to 11.03% 18.79% with 0% 23.33%/5.2% 18.79%,curve by 7.79% 3.03% with 2.92% 0%/4.87% 0.91%,line by 24.35% 16.67%,line to 39.93% 11.52%,curve to 50% 0% with 38.96% 5.15%/43.51% 0%,smooth by 10.07% 11.21% with 11.03% 4.85%,line to 56.81% 38.48%,line by 24.35% -16.67%,curve to 89.29% 18.79% with 84.09% 19.7%/86.36% 18.79%,arc by 10.71% 10% of 10.81% 10.09% small cw,curve by -7.47% 9.39% with 0% 4.85%/-3.57% 7.88%,line to 63.96% 50%,line to 92.53% 61.52%,curve by 7.47% 9.7% with 3.9% 1.51%/7.47% 4.85%,curve by -11.03% 10% with 0% 5.45%/-5.2% 10%,curve by -7.79% -3.03% with -2.6% 0%/-4.87% -1.21%,line to 56.81% 61.52%,line by 3.25% 26.97%,curve by -10.07% 11.52% with 0.97% 6.36%/-3.57% 11.52%,smooth by -10.07% -11.21% with -11.03% -4.85%,close);
}
```

Note that you don’t need to provide any `viewBox` data. The converter will automatically find the smallest rectangle for the shape and will calculate the coordinates of the points accordingly. No more `viewBox` headaches and no need to fight with overflow or extra spacing!

<CodePen
  user="t_afif"
  slug-hash="xbbMbEZ"
  title="CSS Tricks logo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Here is another example where I am applying the shape to an image element. I am keeping the original SVG so you can compare both shapes.

<CodePen
  user="t_afif"
  slug-hash="ZYYmNGK"
  title="SVG path vs clip-path: shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### When to use `shape()`

I would be tempted to say “all the time” but in reality, not. In [**my guide**](/smashingmagazine.com/modern-guide-making-css-shapes.md), I distinguish between two types of shapes: The ones with only straight lines and the ones with curves. Each type can either have repetition or not. In the end, we have four categories of shapes.

![Two by two grid of shapes comparing those with and without curves and those with and without repetition.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_14F1BA2F9AB60876292CC2D9A2BDC7A08F0D5E88097DD218BC30C43D4B6F401D_1747051877090_image.png.webp?resize=641%2C480&ssl=1)

If we don’t have curves and we don’t have repetition (the easiest case), then `clip-path: polygon()` should do the job. If we have a repetition (with or without curves), then `mask` is the way to go. With `mask`, we can rely on gradients that can have a specific size and repeat, but with `clip-path` we don’t have such options.

If you have curves and don’t have a repetition, the new `shape()` is the best option. Previously, we had to rely on `mask` since `clip-path` is very limited, but that’s no longer the case. Of course, these are not universal rules, but my own way to identify which option is the most suitable. At the end of the day, it’s always a case-by-case basis as we may have other things to consider, such as the complexity of the code, the flexibility of the method, browser support, etc.

### Let’s draw some shapes!

Enough talking, let’s move to the interesting part: drawing shapes. I will not write a tutorial to explain the “complex” syntax of `shape()`. It will be boring and not interesting. Instead, we will draw some common shapes and learn by practice!

#### Rectangle

Take the following polygon:

```css
clip-path: polygon(
  0 0,
  100% 0,
  100% 100%,
  0 100%
);
```

Technically, this will do nothing since it will draw a rectangle that already follows the element shape which is a rectangle, but it’s still the perfect starting point for us.

Now, let’s write it using `shape()`.

```css
clip-path: shape(
  from 0 0,
  line to 100% 0,
  line to 100% 100%,
  line to 0 100%
);
```

The code should be self-explanatory and we already have two commands. The `from` command is always the first command and is used only once. It simply specifies the starting point. Then we have the `line` command that draws a line to the next point. Nothing complex so far.

We can still write it differently like below:

```css
clip-path: shape(
  from 0 0,
  hline to 100%,
  vline to 100%,
  hline to 0
);
```

Between the points `0 0` and `100% 0`, only the first value is changing which means we are drawing a horizontal line from `0 0` to `100% 0`, hence the use of `hline to 100%` where you only need to specify the horizontal offset. It’s the same logic using `vline` where we draw a vertical line between `100% 0` and `100% 100%`.

I won’t advise you to draw your shape using `hline` and `vline` because they can be tricky and are a bit difficult to read. Always start by using `line` and then if you want to optimize your code you can replace them with `hline` or `vline` when applicable.

We have our first shape and we know the commands to draw straight lines:

<CodePen
  user="t_afif"
  slug-hash="EaaGmLR"
  title="Rectangle with shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

#### Circular Cut-Out

Now, let’s try to add a circular cut-out at the top of our shape:

![A square shape with a scalloped half circle cut out of the top.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_14F1BA2F9AB60876292CC2D9A2BDC7A08F0D5E88097DD218BC30C43D4B6F401D_1747135001211_image.png.webp?resize=362%2C265&ssl=1)

For this, we are going to rely on the `arc` command, so let’s understand how it works.

![Diagram showing two intersecting circles with points indicating where they cross and arrows indicating the large and small clockwise and counterclockwise directions.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/cxmPje61.png.webp?resize=869%2C379&ssl=1)

If we have two points, A and B, there are exactly two circles with a given radius that intersect with both points like shown in the figure. The intersection gives us four possible arcs we can draw between points A and B. Each arc is defined by a size and a direction.

There is also the particular case where the radius is equal to half the distance between A and B. In this case, only two arcs can be drawn and the direction will decide which one.

![A circle with two points at the top and bottom highlighted to show movement in the clockwise and counterclockwise directions.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/Bd23aq9Z.png.webp?resize=699%2C397&ssl=1)

The syntax will look like this:

```css
clip-path: shape(
  from Xa Ya, 
  arc to Xb Yb of R [large or small] [cw or ccw]
);
```

Let’s add this to our previous shape. No need to think about the values. Instead, let’s use random ones and see what happens:

```css
clip-path: shape(
  from 0 0,
  arc to 40% 0 of 50px,
  line to 100% 0,
  line to 100% 100%,
  line to 0 100%
);
```

<CodePen
  user="t_afif"
  slug-hash="PwwXxPz"
  title="arc command"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Not bad, we can already see the arc between `0 0` and `40% 0`. Notice how I didn’t define the size and direction of the arc. By default, the browser will use `small` and `ccw`.

Let’s explicitly define the size and direction to see the four different cases:

<CodePen
  user="t_afif"
  slug-hash="zxxyMBM"
  title="arc commands"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Hmm, it’s working for the first two blocks but not the other ones. Quite strange, right?

Actually, everything is working fine. The arcs are drawn outside the element area so nothing is visible. If you add some `box-shadow`, you can see them:

<CodePen
  user="t_afif"
  slug-hash="azzPQLr"
  title="adding box-shadow"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Arcs can be tricky due to the size and direction thing, so get ready to be confused. If that happens, remember that you have four different cases, and trying all of them will help you find which one you need.

Now let’s try to be accurate and draw half a circle with a specific radius placed at the center:

![A rectangular shape with a scalloped half circle cut out of the top. Arrows indicate the circle's radius.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_14F1BA2F9AB60876292CC2D9A2BDC7A08F0D5E88097DD218BC30C43D4B6F401D_1747137898705_image.png-1024x409.webp?resize=1024%2C409&ssl=1)

We can define the radius as a variable and use what we have learned so far:

```css
.shape {
  --r: 50px;

  clip-path: shape(
    from 0 0, 
    line to calc(50% - var(--r)) 0, 
    arc to calc(50% + var(--r)) 0 of var(--r), 
    line to 100% 0, 
    line to 100% 100%, 
    line to 0 100%
  );
}
```

<CodePen
  user="t_afif"
  slug-hash="jEEXQdv"
  title="Circle cut-out"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It’s working fine, but the code can still be optimized. We can replace all the `line` commands with `hline` and `vline` like below:

```css
.shape {
  --r: 50px;

  clip-path: shape(from 0 0, 
    hline to calc(50% - var(--r)), 
    arc to calc(50% + var(--r)) 0 of var(--r), 
    hline to 100%, 
    vline to 100%, 
    hline to 0
  );
}
```

We can also replace the radius with `1%`:

```css
.shape {
  --r: 50px;

  clip-path: shape(from 0 0, 
    hline to calc(50% - var(--r)), 
    arc to calc(50% + var(--r)) 0 of 1%,
    hline to 100%, 
    vline to 100%, 
    hline to 0
  );
}
```

When you define a small radius (smaller than half the distance between both points), no circle can meet the condition we explained earlier (an intersection with both points), so we cannot draw an arc. This case falls within an error handling where the browser will scale the radius until we can have a circle that meets the condition. Instead of considering this case as invalid, the browser will fix “our mistake” and draw an arc.

This error handling is pretty cool as it allows us to simplify our `shape()` function. Instead of specifying the exact radius, I simply put a small value and the browser will do the job for me. This trick only works when the arc we want to draw is half a circle. Don’t try to apply it with any `arc` command because it won’t always work.

Another optimization is to update the following:

```css
arc to calc(50% + var(--r)) 0 of 1%,
```

…with this:

```css
arc by calc(2 * var(--r)) 0 of 1%,
```

Almost all the commands can either use a `to` directive or a `by` directive. The first one defines absolute coordinates like the one we use with `polygon()`. It’s the exact position of the point we are moving to. The second defines relative coordinates which means we need to consider the previous point to identify the coordinates of the next point.

In our case, we are telling the arc to consider the previous point `(50% - R) 0` and move by `2*R 0`, so the final point will be `(50% - R + 2R) (0 + 0)`, which is the same as `(50% + R) 0`.

```css
.shape {
  --r: 50px;

  clip-path: shape(from 0 0, 
    hline to calc(50% - var(--r)), 
    arc by calc(2 * var(--r)) 0 of 1px, 
    hline to 100%, 
    vline to 100%, 
    hline to 0
  );
}
```

This last optimization is great because if we want to move the cutout from the center, we only need to update one value: the `50%`.

```css{7}
.shape {
  --r: 50px;
  --p: 40%;

  clip-path: shape(
    from 0 0, 
    hline to calc(var(--p) - var(--r)),
    arc by calc(2 * var(--r)) 0 of 1px, 
    hline to 100%, 
    vline to 100%, 
    hline to 0
  );
} 
```

<CodePen
  user="t_afif"
  slug-hash="myyavGN"
  title="Optimizing the code"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

How would you adjust the above to have the cut-out at the bottom, left, or right? That’s your first homework assignment! Try to do it before moving to the next part.

I will give my implementation so that you can compare with yours, but don’t cheat! If you can do this without referring to my work, you will be able to do more complex shapes more easily.

<CodePen
  user="t_afif"
  slug-hash="ZYYVwgr"
  title="Different cut-out variations"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

#### Rounded Tab

Enough cut-out, let’s try to create a rounded tab:

![A rectangular tab shape with rounded corners on the top and a flat, hard edge across the bottom. The words 'Rounded tab' are in white inside the rectangle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_14F1BA2F9AB60876292CC2D9A2BDC7A08F0D5E88097DD218BC30C43D4B6F401D_1747144895054_image.png.webp?resize=459%2C176&ssl=1)

Can you see the puzzle of this one? Similar to the previous shape, it’s a bunch of `arc` and `line` commands. Here is the code:

```css
.shape {
  --r: 26px;
  
  clip-path: shape(
    /* left part */
    from 0 100%,
    arc by var(--r) calc(-1 * var(--r)) of var(--r),
    vline to var(--r),
    arc by var(--r) calc(-1 * var(--r)) of var(--r) cw,
    /* right part */
    hline to calc(100% - 2 * var(--r)),
    arc by var(--r) var(--r) of var(--r) cw,
    vline to calc(100% - var(--r)),
    arc by var(--r) var(--r) of var(--r)
  );
}
```

It looks a bit scary, but if you follow it command by command, it becomes a lot clearer to see what’s happening. Here is a figure to help you visualize the left part of it.

![Diagram of the left side of a rounded rectangular tab, showing the rounded edge's radius and the arcs that are used to make it.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/05/s_14F1BA2F9AB60876292CC2D9A2BDC7A08F0D5E88097DD218BC30C43D4B6F401D_1747147187601_image.png.webp?resize=803%2C455&ssl=1)

All the `arc` commands are using the `by` directive because, in all the cases, I always need to move by an offset equal to R, meaning I don’t have to calculate the coordinates of the points. And don’t try to replace the radius by `1%` because it won’t work since we are drawing a quarter of a circle rather than half of a circle.

<CodePen
  user="t_afif"
  slug-hash="YPPdgdG"
  title="Rounded tab"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

From this, we can easily achieve the left and right variations:

<CodePen
  user="t_afif"
  slug-hash="vEEvMwr"
  title="More rounded tabs"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Notice how I am only using two `arc` commands instead of three. One rounded corner can be done with a classic border radius, so this can help us simplify the shape.

#### Inverted Radius

One last shape, the classic inner curve at the corner also called an inverted radius. How many `arc` commands do we need for this one? Check the figure below and think about it.

![A square with rounded edges and a a circlular arc cut out of the top-right corner of the shape.](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_14F1BA2F9AB60876292CC2D9A2BDC7A08F0D5E88097DD218BC30C43D4B6F401D_1747150169480_image.png?ssl=1)

If your answer is six, you have chosen the difficult way to do it. It’s logical to think about six arcs since we have six curves, but three of them can be done with a simple border radius, so only three arcs are needed. Always take the time to analyze the shape you are creating. Sometimes, basic CSS properties can help with creating the shape.

What are you waiting for? This is your next homework and I won’t help you with a figure this time. You have all that you need to easily create it. If you are struggling, give the article another read and try to study the previous shapes more in depth.

Here is my implementation of the four variations:

<CodePen
  user="t_afif"
  slug-hash="raaPNqR"
  title="Inverted radius"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Conclusion

That’s all for this first part. You should have a good overview of the `shape()` function. We focused on the `line` and `arc` commands which are enough to create most of the common shapes.

Don’t forget to bookmark the [<FontIcon icon="fas fa-globe"/>SVG to CSS converter](https://css-generators.com/svg-to-css/) and keep an eye on my [<FontIcon icon="fas fa-globe"/>CSS Shape collection](https://css-shape.com/) where you can find the code of all the shapes I create. And here is a last shape to end this article.

<CodePen
  user="t_afif"
  slug-hash="LEEbdrw"
  title="Heart shape using shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info Series: Better CSS Shapes Using `shape()`

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
2. [More on Arcs](https://css-tricks.com/better-css-shapes-using-shape-part-2-more-on-arcs/)
3. [Curves](https://css-tricks.com/better-css-shapes-using-shape-part-3-curves/)
4. [Close and Move](https://css-tricks.com/better-css-shapes-using-shape-part-4-close-and-move/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
