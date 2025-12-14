---
lang: en-US
title: "Drawing CSS Shapes using corner-shape"
description: "Article(s) > Drawing CSS Shapes using corner-shape"
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
      content: "Article(s) > Drawing CSS Shapes using corner-shape"
    - property: og:description
      content: "Drawing CSS Shapes using corner-shape"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/drawing-css-shapes-using-corner-shape.html
prev: /programming/css/articles/README.md
date: 2025-06-18
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6235
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
  name="Drawing CSS Shapes using corner-shape"
  desc="After you've got a `border-radius`, you can control the shape of the corner with `corner-shape`, which unlocks a simpler and more powerful way to make shapes compared to `clip-path()`."
  url="https://frontendmasters.com/blog/drawing-css-shapes-using-corner-shape/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6235"/>

We recently got [<VPIcon icon="fas fa-globe"/>the new`shape()`function](https://frontendmasters.com/blog/tag/shape/) for`clip-path`which is a game changer for creating CSS shape. Another cool feature is on the way and will soon be available: `corner-shape`.

I will not call it “new” because it’s something that has been around for quite a while and you can find countless GitHub discussions around it. There is even[an 11-year old Github Repo made by Lea Verou (<VPIcon icon="iconfont icon-github"/>`LeaVerou/corner-shape`)](https://github.com/LeaVerou/corner-shape)with an interactive demo showing a few examples! After all that time, It finally has[<VPIcon icon="fas fa-globe"/>its own specification](https://drafts.csswg.org/css-borders-4/#corner-shaping)and is ready to be implemented and shipped.

::: note

At the time of writing, `corner-shape` is [<VPIcon icon="fas fa-globe"/>available in Chrome v139](https://chromestatus.com/feature/5357329815699456) or 136+ with the experimental web features flag turned on, but no other browsers yet.

:::

---

## What is corner-shape?

When you define a`border-radius`you will get rounded corners.`corner-shape`allows you to change those rounded corners to something else. It’s in the name; it changes the “shape” of the “corner”.

![A graphic displaying different CSS corner shapes: 'round', 'scoop', 'bevel', 'notch', and 'squircle', each in a purple background with white text.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/IqSM2bQw.png?resize=890%2C195&ssl=1)

The value `round`is the default (the classic rounded corners). As you can see above, we have many cool variations. All of this with a simple syntax:

```css
.corner {
  border-radius: 30px;
  corner-shape: round | scoop | bevel | notch | squircle;
}
```

We can also use the`superellipse(K)`value that can define all the different variations and more by adjusting the`K`variable. I will not detail that part as it’s not important for the article but it’s good to know so I invite you to check[<VPIcon icon="fas fa-globe"/>the (draft) specification](https://drafts.csswg.org/css-borders-4/#corner-shaping)for more detail.

![Diagram illustrating various 'superellipse()' values for corner shapes with labeled corners and arrows indicating direction. Shows how the corner shape changes with different K values.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/6tnTLi91.png?resize=777%2C501&ssl=1)

---

## Let’s Draw Shapes

Changing the corner shape is good — but how can we draw *shapes*? The answer is to play with`border-radius`. Follow along to see all the magic we can do with`corner-shape`!

### Rhombus & Octagon

If you look closely at the example using the`bevel`value, you will see that we have 8 sides since the corners are diagonal straight lines so we almost have an octagon shape. We simply need to find the exact value for`border-radius`that gives us 8 equal sides.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/ZeCHx_ws.png?resize=793%2C348&ssl=1)

I will skip the boring math and give you the final value which is:

```css
border-radius: calc(100%/(2 + sqrt(2)));
```

Even without being precise, you can approximate the value using trial & error. You will get an octagon when you are close to`29%`. The usage of percentage is important because it means the shape is responsive and let’s not forget`aspect-ratio: 1`as well.

```css
.octagon {
  border-radius: calc(100%/(2 + sqrt(2)));
  corner-shape: bevel;
  aspect-ratio: 1;
}
```

Now what if we keep increasing the radius? We get a Rhombus shape at`50%`.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/RtLO8vP1.png?resize=845%2C344&ssl=1)

```css
.rhombus {
  border-radius: 50%;
  corner-shape: bevel;
  aspect-ratio: 1;
}
```

<CodePen
  user="t_afif"
  slug-hash="OPVZwxg"
  title="Octagon and rhombus shapes"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Some of you might ask if this method is better than what we already have. In[<VPIcon icon="fas fa-globe"/>my shape collection](https://css-shape.com/), you can easily find the code of the above shapes made using`clip-path`so why another method?

First of all, the syntax is a bit easier than the`clip-path`one so this can improve the readability of the code as we have fewer values to deal with. But the most important advantage is that we can add a border to the shape! Adding borders to custom shapes is always a nightmare but`corner-shape`made it easy.

This is logical since, by default, when we add`border-radius`, the border and other decorations such as`box-shadow`will follow the rounded corners. It’s still the case even if we change the shape of the corner.

![Five shapes with different corner styles labeled: round, scoop, bevel, notch, and squircle, all displayed on a purple background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/q8rLnLOp.png?resize=905%2C200&ssl=1)

Here are the rhombus and octagon shapes with borders:

<CodePen
  user="t_afif"
  slug-hash="PwqevXP"
  title="Adding border to octagon and rhombus"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Note how we can have a border-only version if we keep the background transparent and we can also apply the shape to an image as well. Cool, right?

### Hexagon

Do you see how can we achieve a hexagon shape? Try to think about it before reading my explanation.

The trick is to rely on the fact that`border-radius`accepts vertical and horizontal values, something we always forget about. Let’s take the rhombus shape and decrease the vertical or the horizontal radius.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/6nJJ3x5a.png?resize=737%2C502&ssl=1)

Do you see that? We have an “almost” hexagon shape. All that is missing is the correct `aspect-ratio`.

```css
.hexagon {
  border-radius: 50% / 25%; /* OR 25% / 50% */
  corner-shape: bevel;
  aspect-ratio: cos(30deg); /* OR 1/cos(30deg) */
}
```

We can definitely say that we have [**the easiest and simplest way to create hexagon shapes**](/css-tip.com/hexagon.md)!

<CodePen
  user="t_afif"
  slug-hash="yyNjgzR"
  title="Hexagon shapes (with border!)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Triangles

Following the same logic we can create most of the common shapes and triangles aren’t an exception. Again, we can use the Rhombus as a starting point and adjust either the horizontal or the vertical radius like below.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/1rHsNa2J.png?resize=771%2C343&ssl=1)

This one can be a bit tricky at first glance because we don’t have the 4 diagonal lines for each corner like the previous shapes but don’t forget that we can use`0`with`border-radius`which will disable the corresponding corner.

```css
.triangle {
  border-radius: 50% / 100% 100% 0 0; 
  corner-shape: bevel;
}
```

From there, we can easily get any kind of triangle by trying the different radius combinations and also playing with`aspect-ratio`.

Below is a demo with many examples. Try to create some of them before checking my code. It’s the perfect exercise to practice with corner-shape.

<CodePen
  user="t_afif"
  slug-hash="yyNjmLw"
  title="Triangle shapes using corner-shape"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The only caveat with triangle shapes is that the border is not perfect. It may sound like a bug but it’s not. I won’t detail the logic behind this but if you want to add a border, you may need a different thickness for one or many sides.

Here is an example with one of the triangle shapes where I am increasing the thickness of the top border a little to have a perfect-looking shape.

<CodePen
  user="t_afif"
  slug-hash="LEVmwNb"
  title="Adding border to triangles"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

As you can see in the code, there is a math formula to get the correct thickness but since it will be a different formula for each triangle shape, I won’t bother you with a boring explanation. Plus you can easily (and rapidly) get a good result with some trial & error. No need to be very precise.

### Slanted edge

All the shapes we created rely on percentage values but`border-radius`accepts length as well, which means we can have elements with variable size but the shape remains static.

Example with a slanted edge where the slant keeps the same size whatever the element width:

<CodePen
  user="t_afif"
  slug-hash="VYLxoPW"
  title="Slanted edge"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The code is a simple as:

```css
.slanted {
  border-top-right-radius: 80px 100%;
  corner-shape: bevel;
}
```

No need for the shorthand property in this case since only the top-right corner matters. As for the value, I think it’s self-explanatory. Simply notice that there is no`/`to separate the horizontal and vertical radius when using the longhand properties.

### Arrow-like box

Using the same logic we can have an arrow-like box:

```css
.arrow {
  border-radius: 80px / 0 50% 50% 0;
  corner-shape: bevel;
}
```

<CodePen
  user="t_afif"
  slug-hash="vEOjoWp"
  title="Arrow-like box"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

### Trapezoid & Parallelogram

Also trapezoid & parallelogram shapes:

```css
.trapezoid {
  border-radius: 80px / 100% 0 100% 0;
  corner-shape: bevel;
}
.parallelogram {
  border-radius: 80px / 100% 100% 0 0;
  corner-shape: bevel;
}
```

<CodePen
  user="t_afif"
  slug-hash="WbvJVdW"
  title="Trapezoid & Parallelogram"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Conclusion

Using only the`bevel`option of`corner-shape`we were able to create a lot of different shapes easily. All we had to do was to play with`border-radius`, a well-known property. Not to mention the fact that we can easily add borders and box shadows which is a real game changer compared to shapes created using`clip-path`or`mask`.

I will end the article with a last demo where I combine`bevel`and`notch`to create an arrow. Yes, you can have a different shape per corner!

<CodePen
  user="t_afif"
  slug-hash="WbvyNMM"
  title="Arrow shape"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

What about you? Can you think about a cool shape using`corner-shape`?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Drawing CSS Shapes using corner-shape",
  "desc": "After you've got a `border-radius`, you can control the shape of the corner with `corner-shape`, which unlocks a simpler and more powerful way to make shapes compared to `clip-path()`.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/drawing-css-shapes-using-corner-shape.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
