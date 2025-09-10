---
lang: en-US
title: "The `-path` of Least Resistance (Part 1)"
description: "Article(s) > The `-path` of Least Resistance (Part 1)"
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
      content: "Article(s) > The `-path` of Least Resistance (Part 1)"
    - property: og:description
      content: "The `-path` of Least Resistance (Part 1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-path-of-least-resistance-part-1.html
prev: /programming/css/articles/README.md
date: 2025-08-27
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6758
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
  name="The `-path` of Least Resistance (Part 1)"
  desc="A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`."
  url="https://frontendmasters.com/blog/the-path-of-least-resistance-part-1/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6758"/>

There’s a whole layer of CSS that lives just below the surface of most interfaces. It’s not about layout, spacing, or typography. It’s about shape. About cutting through the default boxes and letting your UI move in new directions. This series is all about one such family of features, the kind that doesn’t just style your layout but gives you entirely new ways to shape, animate, and express your interface.

In this first part, we’ll explore `clip-path`. We’ll start simple, move through the functions and syntax, and work our way up to powerful shape logic that goes way beyond the basic polygons you might be used to. And just when you think things can’t get any more dynamic, part two will kick in with `offset-path`, where things really start to move.

::: info Article Series

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 1)",
  "desc": "A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-1.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 2)",
  "desc": "This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-2.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## What is `clip-path` in CSS?

At its core, `clip-path` lets us control which parts of an element are visible. It’s like a stencil or cookie cutter for HTML elements. Instead of displaying a rectangular box, you can show just a circle, a triangle, a star, or any complex shape you define. And you can do it with a single line of CSS.

This opens the door to more expressive designs without relying on images, SVG wrappers, or external tools. Want to crop a profile picture into a fancy blob shape? Easy. Want to reveal content through a custom cutout as a hover effect? Done. That’s exactly where `clip-path` shines. But to use it effectively, we need to understand what it’s made of.

---

## Before the syntax

To really get `clip-path`, let’s break it into two basic concepts: **clip** and **path**. No joke, each one of those carries an important lesson of its own.

### This is not the “clip” you know

We’ve all seen clipping in CSS before, usually through the `overflow` property, set to `hidden` or `clip`. By doing so, anything that spills out of the element’s box just vanishes.

But here’s the key difference. While the `overflow` property clips the *content* of the element (on the padding box for `hidden`, and on the overflow clip edge for `clip`), the `clip-path` property clips the *element itself*.

This means that even the simplest clip-path, which visually mimics overflow clipping, will still hide parts of the element itself. That includes things like a `box-shadow` you were expecting to see, or an `outline` on a button that suddenly disappears and breaks accessibility.

<CodePen
  link="https://codepen.io/amit_sheen/pen/raOMbgX/ce7dc33318784cefd665ea50d91f78ed"
  title="clip-path - clip vs overflow"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Also worth noting: just like `overflow`, `clip-path` lives entirely in two dimensions. No depth, no perspective. It flattens everything. That means `transform-style: preserve-3d` is ignored, and any 3D motion will stay locked to the element’s plane.

### The “path” to success

This one trips people up. Especially when you’re working with functions like `polygon()`, it’s tempting to think of the shape as just a bunch of points. But it’s not just the points that matter, it’s the order they come in. You’re not dumping coordinates into a bucket, you’re connecting them, one by one, like a game of “connect the dots.”

![A connect-the-dots illustration of a dinosaur character, featuring numbered dots in a sequence, set against a black background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/NovYlZq-.png?resize=1024%2C754&ssl=1)

The path is the journey from one point to the next. The way you sequence them defines the outline, the curves, and eventually the clipped shape. If the points are out of order, your shape won’t behave the way you expect.

---

## Values and Coordinates

You can set the coordinates for your shapes in **absolute units** like pixels, which stay fixed regardless of the element’s size, or in **relative units** like percentages, which adapt based on the element’s dimensions. Absolute values give you precision, while relative values make your shapes more responsive. In practice, you’ll often mix the two to balance consistency and flexibility.

By default, every shape you define with `clip-path` is calculated relative to the element’s **border-box**. This means the point `0 0` sits at the top-left corner of that box, and all coordinates extend from there. Positive X values move to the right, and positive Y values move down.

::: note

Note that you’re not limited to the border-box; the `clip-path` property also accepts an optional [<VPIcon icon="fa-brands fa-firefox"/>`<geometry-box>`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path#geometry-box) value, which lets you choose the reference box for your shape, giving you more control over how the clip is applied.

:::

---

## Basic Shapes

Let’s begin with the simplest shape of all. The `circle()` function creates a circular clipping path that allows you to cut content into a perfect circle shape. This function accepts two main parameters: the radius of the circle and its center position.

The basic syntax follows this pattern:

```css
clip-path: circle(radius at position);
```

The radius can be specified in various units, like pixels (`px`), percentages (`%`), or viewport units (`vw`, `vh`). The position defines where the center of the circle should be placed, using coordinates relative to the element’s dimensions.

This demo shows a live preview of the `circle()` function in action. You can drag the control nodes to adjust both the center position and radius of the circular clip path. As you manipulate these controls, you’ll see the clipped area update in real time, and the corresponding CSS values will be displayed below the preview.

<CodePen
  link="https://codepen.io/amit_sheen/pen/xbwEevZ/79b4ff8ccbd9fce6ea4a6f4634afc6c8"
  title="clip-path - circle()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Use the checkbox to toggle between pixel and percentage values to see how the result can be expressed in different units. This is particularly useful when you need responsive clipping that adapts to different screen sizes.

### Using Keywords

Beyond specific coordinate values, CSS also supports several convenient keywords for positioning the circle’s center. You can use keywords like `center`, `top`, `bottom`, `left`, and `right`, or combine them for more precise placement, such as `top left` or `bottom right`. These keywords provide a quick way to achieve common positioning without calculating exact pixel or percentage values.

You can also use special keywords for the radius: `closest-side` and `farthest-side`. The `closest-side` keyword sets the radius to the distance from the center to the closest edge of the element, while `farthest-side` extends the radius to the farthest edge.

For example:

```css
clip-path: circle(50px at left);
clip-path: circle(30% at top right);
clip-path: circle(closest-side at top 25%);
clip-path: circle(farthest-side at center);
```

---

## Slightly stretched: `ellipse()`

Now let’s take that circle and give it two radii instead of one. The `ellipse()` function works similarly to `circle()`, but instead of creating a perfect circle, it produces an oval shape by accepting two separate radius values. This gives you independent control over both the horizontal and vertical dimensions of the clipping shape.

The syntax extends the circle pattern with an additional radius parameter:

```css
clip-path: ellipse(radiusX radiusY at position);
```

This demo shows the `ellipse()` function with three control nodes, that allow you to independently adjust the horizontal and vertical radii. Notice how you can create anything from a wide, flat oval to a tall, narrow shape by manipulating these controls separately.

<CodePen
  link="https://codepen.io/amit_sheen/pen/RNWGzmN/eda58b030b859497588eb14cbd2ba478"
  title="clip-path - ellipse()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Rectangular Shapes

While `circle()` and `ellipse()` create curved clipping paths, CSS also provides several functions for creating rectangular clips. These functions offer different approaches to defining the same basic shape: a rectangle with straight edges.

---

## `inset()`, `rect()`, and `xywh()`

These three are all about boxes, but each one approaches it differently.

- `inset()` defines distances to clip inward from each edge. Its like padding in reverse, instead of adding space inside the box, you remove it.
- `rect()` uses absolute coordinates from the top-left corner to define the rectangle’s edges. A legacy function from the old `clip` property, but still valid and supported in CSS.
- `xywh()` defines a rectangle by position and size. The first two values set the X and Y coordinates for the top-left corner, and the next two define the width and height. Clean and straightforward.

This demo lets you compare all three rectangular functions using the same visual controls. Drag the red control lines to adjust the clipping boundaries, and use the dropdown to switch between the different function syntaxes. Notice how the same visual result produces different coordinate values depending on which function you choose.

<CodePen
  link="https://codepen.io/amit_sheen/pen/bNVBLGM/e5304185d2ec86869e36d27e4116f9c4"
  title="clip-path - inset() vs rect() vs xywh()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The `inset()` function is generally the most intuitive since it works similarly to CSS padding, while `rect()` follows the traditional clipping rectangle approach. The newer `xywh()` function uses a more familiar x, y, width, height pattern commonly found in graphics programming.

---

## Now for the fun part: `polygon()`

Here’s where things get interesting. While circles, ellipses, and rectangles are useful, they’re also predictable. The `polygon()` function is where you start building custom shapes, point by point, corner by corner.

At its heart, `polygon()` is wonderfully straightforward. You define a series of coordinate pairs, and CSS connects them in order to create your shape:

```css
clip-path: polygon(x1 y1, x2 y2, x3 y3, ...);
```

Remember when we talked about the “path” concept earlier? This is where it really shows. Each coordinate pair is a waypoint, and CSS draws straight lines between them in the exact sequence you provide. Here’s a perfect example of why order matters. Take these five points:

```css
/* Pentagon-like shape */
clip-path: polygon(50% 0%, 98% 35%, 79% 91%, 21% 91%, 2% 35%);

/* Same points, different order - creates a star */
clip-path: polygon(50% 0%, 79% 91%, 2% 35%, 98% 35%, 21% 91%);
```

Same coordinates, completely different shapes. The first creates a neat pentagon-like outline, while the second forms a classic five-pointed star. It’s that simple connection from point to point that builds your final shape.

<CodePen
  link="https://codepen.io/amit_sheen/pen/VYvMPeZ/a8b51dbc3eb711ccb5a38fd79eff356d"
  title="clip Path - Pentagram vs. Star"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Polygon Builder

Here’s a demo that lets you create and modify polygons in real time. You can drag the red control nodes to reshape your polygon, add or remove points, and see the resulting CSS code update instantly. Toggle the checkbox to switch between pixel and percentage values for responsive design.

<CodePen
  link="https://codepen.io/amit_sheen/pen/yyYVvdY/f6d9e4d6efaba4304e21e95294efa05a"
  title="clip-path - polygon()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Use the “Add Node” button to introduce new points along your polygon’s edges, or “Remove Node” to simplify the shape. Notice how each modification creates a completely new path—and how the order of your points defines the final appearance.

---

## When Straight Lines Aren’t Enough

Polygons are powerful, but they have one fundamental limitation: they’re made entirely of straight lines. Sometimes your design calls for curves, smooth transitions, or complex shapes that can’t be achieved by connecting points with straight edges. That’s where `path()` and `shape()` step in.

### `path()`: Raw Power, Borrowed from SVG

The `path()` function brings the full power of SVG path syntax directly into CSS. If you’ve ever worked with vector graphics, this will feel familiar. The syntax is identical to SVG’s `<path>` element:

```css
clip-path: path("M 10,10 L 50,10 L 50,50 Z");
```

You can use any SVG path command: `M` for move, `L` for line, `C` for cubic curves, `Q` for quadratic curves, and so on. This gives you incredible precision and the ability to create complex shapes with smooth curves and sharp angles exactly where you want them.

If you’re not comfortable writing path commands by hand, there are plenty of free online SVG path editors like [<VPIcon icon="fas fa-globe"/>SVG Path Editor](https://yqnn.github.io/svg-path-editor/) or [<VPIcon icon="fas fa-globe"/>Boxy SVG](https://boxy-svg.com/) that can generate the path string for you.

Here’s a simple heart shape as an example:

```css
clip-path: path("M100,178 L87.9,167 C45,128 16.7,102 16.7,71 C16.7,45 37,25 62.5,25 C77,25 90.9,32 100,42 C109.1,32 123,25 137.5,25 C163,25 183.3,45 183.3,71 C183.3,102 155,128 112.1,167 Z");
```

But here’s the catch: because `path()` comes from the SVG world, it only works with absolute values. There are no percentages, no responsive units. If your element changes size, your clipping path stays exactly the same. For truly flexible, responsive shapes, we need something more modern.

### `shape()`: The Modern Approach

Enter `shape()` - CSS’s answer to the limitations of `path()`. It provides the same curve capabilities as `path()` but with a more CSS-friendly syntax and support for relative units like percentages.

Here’s the same heart shape, but using `shape()` with relative coordinates:

```css
clip-path: shape(
  from 50% 89%,
  line to 43.95% 83.5%,
  curve to 8.35% 35.5% with 22.5% 64% / 8.35% 51%,
  curve to 31.25% 12.5% with 8.35% 22.5% / 18.5% 12.5%,
  curve to 50% 21% with 38.5% 12.5% / 45.45% 16%,
  curve to 68.75% 12.5% with 54.55% 16% / 61.5% 12.5%,
  curve to 91.65% 35.5% with 81.5% 12.5% / 91.65% 22.5%,
  curve to 56.05% 83.5% with 91.65% 51% / 77.5% 64%,      
  close);
```

This demo shows the same heart shape created with both methods. The key difference becomes apparent when you resize the containers. Grab the bottom-right corner of each shape and drag to change its size.

<CodePen
  link="https://codepen.io/amit_sheen/pen/empGgRP/7d0e614618e7291a5c521467fbf803bc"
  title="clip Path - path vs. shape"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Notice how the `path()` version maintains its fixed pixel dimensions regardless of the container size, while the `shape()` version scales proportionally thanks to its percentage-based coordinates. This responsiveness is what makes `shape()` particularly powerful for modern web design and represents the future of CSS clipping paths.

---

## Syntax Table

If you’re coming from an SVG background, you’ll find the transition to `shape()` remarkably intuitive. The syntax translates beautifully from SVG path commands, maintaining the same logic while embracing CSS’s flexible unit system.

Just as SVG paths distinguish between absolute (uppercase) and relative (lowercase) commands, `shape()` uses the keywords `to` and `by`. Commands with `to` are positioned relative to the element’s origin, while commands with `by` are positioned relative to the previous point in the path.

| **SVG Path** | **Shape Equivalent** | **Description** |
| --- | --- | --- |
| `M`/`m` | `from` | Set first point |
| `M 10 20`<br/>`m 10 20` | `move to 10px 20px`<br/>`move by 10px 20px` | Move point |
| `L 30 40`<br/>`l 30 40` | `line to 30px 40px`<br/>`line by 30px 40px` | Draw line |
| `H 50`<br/>`h 50` | `hline to 50px`<br/>`hline by 50px` | Horizontal line |
| `V 60`<br/>`v 60` | `vline to 60px`<br/>`vline by 60px` | Vertical line |
| `C x1 y1 x2 y2 x y`<br/>`c x1 y1 x2 y2 x y` | `curve to x y with x1 y1 / x2 y2`<br/>`curve by x y with x1 y1 / x2 y2` | Cubic curve with two control points |
| `S x1 y1 x y`<br/>`s x1 y1 x y` | `curve to x y with x1 y1`<br/>`curve by x y with x1 y1` | Cubic curve with one control point |
| `Q x1 y1 x y`<br/>`q x1 y1 x y` | `smooth to x y with x1 y1`<br>`smooth by x y with x1 y1` | smooth curve with one control point |
| `T x y`<br/>`t x y` | `smooth to x y`<br/>`smooth by x y` | smooth curve with no control point |
| `A rx ry angle la sw x y`<br/>`a rx ry angle la sw x y` | `arc to x y of rx ry sw la angle`<br/>`arc by x y of rx ry sw la angle` | Arc with radii, rotation, and flags |
| `Z`/`z` | `close` | Close the path |

---

## Self-Intersecting Polygons and Fill Rules

Here’s where things get mathematically interesting. When you create shapes where lines cross over each other, CSS has to decide which areas should be visible and which should remain transparent. This is controlled by **fill rules**, and understanding them unlocks some powerful creative possibilities.

CSS supports two fill rules: `evenodd` and `nonzero`. The difference becomes clear when you see them in action. Here’s a simple rounded star with both fill rules:

<CodePen
  link="https://codepen.io/amit_sheen/pen/azvBQoW/20da0834588a5f2149422bd7264cf78e"
  title="clip-path - nonzero vs evenodd"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

- **Even-odd rule:** (on the left) Think of it as a simple counting game. Draw an imaginary line from any point to the edge of your element. Every time that line crosses a path edge, count it. If you end up with an odd number, that area gets filled. Even number? It stays transparent. This is why star centers appear hollow, the crossing lines create even-numbered intersections there.
- **Nonzero rule**: (default value, on the right) This one’s about direction and flow. As your path travels around the shape, it creates a “winding” effect. Areas that get wound in one direction stay filled, while areas where clockwise and counter-clockwise paths cancel each other out become transparent. In most simple shapes like our star, everything winds the same way, so everything stays filled.

This gives you precise control over complex self-intersecting shapes, letting you create intricate patterns with internal cutouts or solid fills, all depending on which fill rule you choose.

---

## Wrapping up

We’ve covered a lot of ground here. From simple circles to complex self-intersecting stars, `clip-path` gives you an entirely new vocabulary for shaping your interface. We started with basic geometry, built up to custom polygons, and finally broke free from straight lines with curves and precision.

But here’s the thing: everything we’ve explored so far has been about containment. About cutting away, hiding, cropping. We’ve been thinking inside the box, even when we’re changing its shape.

What if I told you there’s another way to think about paths in CSS? What if, instead of using them to constrain and contain, you could use them to guide and direct? What if your elements could follow curves, travel along custom routes, and move through space in ways that feel natural and intentional?

That’s exactly where we’re heading in part two. We’re going to shift from static shapes to dynamic motion, from `clip-path` to `offset-path`. Your elements won’t just be differently shaped—they’ll be dancing along curves you design, following trajectories that bring your interface to life.

The path of least resistance is about to get a whole lot more interesting.

::: info Article Series

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 1)",
  "desc": "A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-1.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 2)",
  "desc": "This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-2.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 1)",
  "desc": "A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-path-of-least-resistance-part-1.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
