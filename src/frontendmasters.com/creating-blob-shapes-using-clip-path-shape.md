---
lang: en-US
title: "Creating Blob Shapes using clip-path: shape()"
description: "Article(s) > Creating Blob Shapes using clip-path: shape()"
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
      content: "Article(s) > Creating Blob Shapes using clip-path: shape()"
    - property: og:description
      content: "Creating Blob Shapes using clip-path: shape()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-blob-shapes-using-clip-path-shape.html
prev: /programming/css/articles/README.md
date: 2025-05-19
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5861
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
  name="Creating Blob Shapes using clip-path: shape()"
  desc="Blobs! Gooey weird shapes you can fill with any background and even animate. "
  url="https://frontendmasters.com/blog/creating-blob-shapes-using-clip-path-shape/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5861"/>

After [**the flower shapes**](/frontendmasters.com/creating-flower-shapes-using-clip-path-shape.md), let’s move to one of the coolest shapes: the **Blob**! Those distorted wiggly circles that were almost impossible to achieve using CSS. But now, they are possible using the new `shape()` function.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/blobs1.jpg?resize=808%2C361&ssl=1)

::: info Article Series

```component VPCard
{
  "title": "Creating Flower Shapes using clip-path: shape()",
  "desc": "Use the `arc` command within the `shape()` function we can draw a line that follows a circle from one point to the next, controlling the direction.",
  "link": "/frontendmasters.com/creating-flower-shapes-using-clip-path-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

1. [Creating Wavy Circles with Fancy Animations in CSS](https://frontendmasters.com/blog/creating-wavy-circles-with-fancy-animations/)
<!-- TODO: /frontendmasters.com/creating-wavy-circles-with-fancy-animations.md  -->

```component VPCard
{
  "title": "Creating Flower Shapes using CSS Mask & Trigonometric Functions",
  "desc": "Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will […]",
  "link": "/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Creating Blob Shapes using clip-path: shape()",
  "desc": "Blobs! Gooey weird shapes you can fill with any background and even animate. ",
  "link": "/frontendmasters.com/creating-blob-shapes-using-clip-path-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

Before we start, take a look at [<FontIcon icon="fas fa-globe"/>my blob shape generator](https://css-generators.com/blob/). Unlike the flower shapes, blobs have the random factor so having a generator to get the code is a lifesaver. This said, stay with me to understand the logic behind creating them, maybe you will want to make your own generator of blobs.

For this shape, we are going to rely on the `curve` command, so let’s start by understanding how it works.

::: note

At the time of writing, only Chrome, Edge, and Safari have the full support of the features we will be using.

:::

---

## The `curve` Command

This command allows you to draw Bézier curves between two points. With the arc command, we needed a radius, but here we need control points. We can either have one control point and create a Quadratic curve or two control points and create a Cubic curve.

Here is a figure to illustrate a few examples. The black dots illustrate the control points, and the blue ones the starting and ending points.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/points.png?resize=790%2C483&ssl=1)

And a demo:

<CodePen
  user="t_afif"
  slug-hash="NPPEOej"
  title="curve command overview"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I won’t detail the exact geometry behind the curves, but notice their behavior close to the starting and ending points. The curve is tangent to the lines that link the starting and ending points with the control points. This will be the key to create our blob shape.

[<FontIcon icon="fas fa-globe"/>Here is an online demo](https://desmos.com/calculator/ebdtbxgbq0) where you can drag the different points to see how the curve behaves.

The code of this command is:

```css
clip-path: shape(from Xa Ya, curve to Xb Yb with Xc1 Yc1 / Xc2 Yc2) 
```

And I will be using one control point, so we can omit the second control point:

```css
clip-path: shape(from Xa Ya, curve to Xb Yb with Xc1 Yc1) 
```

By combining many curves, we can create a blob. We have to understand how to correctly combine them, so it’s time for a small geometry course.

---

## The Geometry of The Blob

Mathematically speaking, there is no specific geometry for a blob because it’s not a shape we can formally define. We can implement a blob using different methods and calculations, so what I am going to share is my own implementation. It’s probably not the best one, but it gives a good result.

We first start by placing N points around a circle. The number of points is the first parameter of the blob that I am calling “granularity” in my generator. Then I define a distance D I call the depth.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/d.png?resize=624%2C359&ssl=1)

Now, we randomly move the points within the area defined by the distance D. For each point, we pick a random value in the range [0 D] and we make it closer to the center using that value.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/random.png?resize=624%2C359&ssl=1)

For the next step, we take two consecutive points, draw a line between them, and then place a new point at the center. This will double the number of points.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/line.png?resize=812%2C399&ssl=1)

The last step is to draw the Bézier curves. The new points (the blue ones) are the starting and ending points, and the initial points (the black ones) are the control points.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/bezier.png?resize=903%2C440&ssl=1)

The fact that two adjacent curves share the same tangent is what gives us a continuous and smooth shape, a perfect blob!

That’s it. Now let’s translate this into code.

---

## The Code of The Blob

Similar to the flower shape, the code will be a bunch of curve commands like below:

```css
.blob { 
  clip-path: shape(from X0 Y0, 
     curve to X1 Y1 with Xc1 Yc1,
     curve to X2 Y2 with Xc2 Yc2,
     curve to X3 Y3 with Xc3 Yc3,
     curve to X4 Y4 with Xc4 Yc4,
     ...
     curve to Xn Yn with Ycn Ycn
  )
}
```

`[Xi, Yi]` are the starting/ending points (the blue ones), and `[Xci, Yci]` are the control points (the black ones). For the sake of simplicity, I will use pseudo-code to illustrate the calculation. The real implementation can be done using JavaScript like in [<FontIcon icon="fas fa-globe"/>my generator](https://css-generators.com/blob/), or using Sass (I will share a demo using Sass later).

We first start by defining the control points:

```js
N = 15  /* number of points (granularity) */  
D = 20% /* depth */  
  
for i in [1 N] {  
  R = 50% - random(D);  
  Xci = 50% + R*math.cos(360deg \* i/N));  
  Yci = 50% + R*math.sin(360deg \* i/N));  
}
```

R will define the distance of the points from the center, and it will have a random value between `50%` and `50% - D`.

Then we define the main points where each one is placed at the center of two consecutive control points:

```js
for i in [1 N] {  
  Xi = (Xci + Xci+1)/2;  
  Yi = (Yci + Yci+1)/2;  
}

Finally, the shape function will be as follows:

```js
clip-path: shape(from X0 Y0,   
  for i in [1 N] {  
    curve to Xi Yi with Xci Yci,  
  }  
)
```

Here is a Sass implementation:

<CodePen
  user="t_afif"
  slug-hash="emmjoZE"
  title="Blob shape"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

One observation we can make is that the shape is responsive. It’s designed to work with square elements (`aspect-ratio: 1`), but the result is not bad for rectangular elements as well. Resize the element in the demo below and see how the shape behaves:

<CodePen
  user="t_afif"
  slug-hash="NPPOWzJ"
  title="Resizing the blob"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The code can also be tweaked to create more variations. We can, for example, have a kind of wavy circle by removing the random part and applying a fixed distance to half the points.

<CodePen
  user="t_afif"
  slug-hash="emmLdVy"
  title="Regular blob"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Can you think of other variations?

---

## Animating The Blob

Having the blob shape in CSS is already a cool feature. It’s one line of code that can be applied to any element, including images, and it’s responsive! In addition to this, we can easily animate them. The only requirement is to have the same structure inside `shape()`. So if we take two blobs having the same number of curve commands, then we can animate one into another!

Here is an example where we keep the same number of points and only adjust the depth:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/generator.png?resize=1024%2C390&ssl=1)

You copy both codes from the generator, apply a transition, and you have a cool hover effect that transforms a circle into a blob!

<CodePen
  user="t_afif"
  slug-hash="PwwJgyr"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The bouncing effect you get is made with the `linear()` function which is another cool feature for custom easing. I am [<FontIcon icon="fas fa-globe"/>getting the code from here](https://linear-easing-generator.netlify.app/).

Now, if you update the Shape ID and still keep the same number of points, you can have a transition between two different blobs.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/two.png?resize=1024%2C354&ssl=1)

<CodePen
  user="t_afif"
  slug-hash="yyyPONb"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Cool, right? The code may look complex but in the end everything is generated for you, so it’s nothing but a few clicks to get a fancy shape with a nice animation! Speaking about animation, let’s end with a demo using a keyframes instead of a transition.

<CodePen
  user="t_afif"
  slug-hash="xbbyxqV"
  title="blob animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Conclusion

I hope you enjoyed this `shape()` exploration through this series of articles. Once this feature becomes widely supported, it will be a game changer and we can forget about all the hacky workarounds to create CSS shapes.

Don’t forget to keep an eye on my [<FontIcon icon="fas fa-globe"/>CSS Shapes](https://css-shape.com/) and [<FontIcon icon="fas fa-globe"/>CSS Generators](https://css-generators.com/) websites from where you can easily copy the code of any CSS shape.

::: info Article Series

1. [Creating Wavy Circles with Fancy Animations in CSS](https://frontendmasters.com/blog/creating-wavy-circles-with-fancy-animations/)
<!-- TODO: /frontendmasters.com/creating-wavy-circles-with-fancy-animations.md  -->

```component VPCard
{
  "title": "Creating Flower Shapes using CSS Mask & Trigonometric Functions",
  "desc": "Creating unusual shapes is always a fun exercise and a good way to practice your CSS skills. One might argue that SVG is better for this job, but nowadays we have a lot of new CSS tricks that allow us to create shapes with a clean and optimized code. Through this two-article series, we will […]",
  "link": "/frontendmasters.com/creating-flower-shapes-using-css-mask-trigonometric-functions.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Creating Blob Shapes using clip-path: shape()",
  "desc": "Blobs! Gooey weird shapes you can fill with any background and even animate. ",
  "link": "/frontendmasters.com/creating-blob-shapes-using-clip-path-shape.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Blob Shapes using clip-path: shape()",
  "desc": "Blobs! Gooey weird shapes you can fill with any background and even animate. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-blob-shapes-using-clip-path-shape.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
