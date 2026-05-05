---
lang: en-US
title: "SVG Coding Examples: Useful Recipes For Writing Vectors By Hand"
description: "Article(s) > SVG Coding Examples: Useful Recipes For Writing Vectors By Hand"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > SVG Coding Examples: Useful Recipes For Writing Vectors By Hand"
    - property: og:description
      content: "SVG Coding Examples: Useful Recipes For Writing Vectors By Hand"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/svg-coding-examples-recipes-writing-vectors-by-hand.html
prev: /programming/js/articles/README.md
date: 2024-09-18
isOriginal: false
author:
  - name: Myriam Frisano
    url: https://smashingmagazine.com/author/myriam-frisano/
cover: https://files.smashing.media/articles/svg-coding-examples-recipes-writing-vectors-by-hand/svg-coding-examples-recipes-writing-vectors-by-hand.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="SVG Coding Examples: Useful Recipes For Writing Vectors By Hand"
  desc="Myriam Frisano explores the basics of hand-coding SVGs with practical examples to demystify the inner workings of common SVG elements. In this guide, you’ll learn about asking the right questions to solve common positioning problems and how to leverage JavaScript so that, by the end, you can add “SVG coding” to your toolbox. You’ll also be able to declare proudly, “I know how to draw literal pictures with words!”"
  url="https://smashingmagazine.com/2024/09/svg-coding-examples-recipes-writing-vectors-by-hand/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/svg-coding-examples-recipes-writing-vectors-by-hand/svg-coding-examples-recipes-writing-vectors-by-hand.jpg"/>

Myriam Frisano explores the basics of hand-coding SVGs with practical examples to demystify the inner workings of common SVG elements. In this guide, you’ll learn about asking the right questions to solve common positioning problems and how to leverage JavaScript so that, by the end, you can add “SVG coding” to your toolbox. You’ll also be able to declare proudly, “I know how to draw literal pictures with words!”

Even though I am the kind of front-end engineer who manually cleans up SVG files when they are a mess, I never expected to become one of *those* people. You know, those crazy people that *draw with code.*

But here we are.

I dove deep into SVG specs last winter when I created a project to [<VPIcon icon="fas fa-globe"/>draw Calligraphy Grids](https://code.halfapx.com/guideline-generator/), and even though I knew the basic structures and rules of SVG, it was only then that I fully tried to figure out and understand what all of those numbers meant and how they interacted with each other.

And, once you get the hang of it, it is actually very interesting and quite fun to code SVG by hand.

::: note No `<path>` ahead from Smashing Magazine

> We won’t go into more complex SVG shapes like [<VPIcon icon="fa-brands fa-firefox"/>paths](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) in this article, this is more about practical information for simple SVGs. When it comes to drawing curves, I still recommend using a tool like Illustrator or Affinity. However, if you are super into compounding your lines, a path is useful. Maybe we’ll do that in Part 2. 
>
> Also, this guide focuses mostly on practical examples that illustrate some of the math involved when drawing SVGs. There is a wonderful article here that goes a bit deeper into the specs, which I recommend reading if you’re more interested in that: “[A Practical Guide To SVG And Design Tools](https://smashingmagazine.com/2019/05/svg-design-tools-practical-guide/#comments-svg-design-tools-practical-guide).”

<!-- TODO: /smashingmagazine.com/svg-design-tools-practical-guide.md -->

:::

---

## Drawing With Math. Remember Coordinate Systems?

Illustrator, Affinity, and all other vector programs are basically just helping you draw on a coordinate system, and then those paths and shapes are stored in SVG files.

If you open up these files in an editor, you’ll see that they are just a bunch of paths that contain lots of numbers, which are coordinates in that coordinate system that make up the lines.

But, there is a difference between the all-powerful `<path>` and the other, more semantic elements like `<rect>`, `<circle>`, `<line>`, `<ellipse>`, `<polygon>`, and `<polyline>`.

These elements are not that hard to read and write by hand, and they open up a lot of possibilities to add animation and other fun stuff. So, while most people might only think of SVGs as never-pixelated, infinitely scaling images, they can also be quite comprehensive pieces of code.

### How Does SVG Work? `unit != unit`

Before we get started on how SVG elements are drawn, let’s talk about the ways units work in SVG because they might be a bit confusing when you first get started.

The beauty of SVG is that it’s a vector format, which means that the units are somewhat detached from the browser and are instead just relative to the coordinate system you’re working in.

That means you would **not** use a unit within SVG but rather just use numbers and then define the size of the document you’re working with.

So, your `width` and `height` might be using CSS `rem` units, but in your `viewBox`, units become just a concept that helps you in establishing sizing relationships.

### What Is The `viewBox`?

The `viewBox` works a little bit like the CSS `aspect-ratio` property. It helps you establish a relationship between the width and the height of your coordinate system and sets up the box you’re working in. I tend to think of the `viewBox` as my “document” size.

Any element that is placed within the SVG with bigger dimensions than the `viewBox` will not be visible. So, the `viewBox` is the cutout of the coordinate system we’re looking through. The `width` and `height` attributes are unnecessary if there is a `viewBox` attribute.

So, in short, having an SVG with a `viewBox` makes it behave a lot like a regular image. And just like with images, it’s usually easiest to just set either a `width` or a `height` and let the other dimension be automatically sized based on the intrinsic aspect ratio dimensions.

So, if we were to create a function that draws an SVG, we might store three separate variables and fill them in like this:

```html
<svg 
  width="${svgWidth}" 
  viewBox="0 0 ${documentWidth} ${documentHeight}" 
  xmlns="http://www.w3.org/2000/svg"
>;
```

### SVG Things Of Note

There is a lot to know about SVG: When you want to reuse an image a lot, you may want to turn it into a `symbol` that can then be referenced with a `use` tag, you can create sprites, and there are some best practices when using them for icons, and so on.

Unfortunately, this is a bit out of the scope of this article. Here, we’re mainly focusing on designing SVG files and not on how we can optimize and use them.

However, one thing of note that is easier to implement from the start is **accessibility**.

SVGs can be used in an `<img>` tag, where `alt` tags are available, but then you lose the ability to interact with your SVG code, so inlining might be your preference.

When inlining, it’s easiest to declare `role="img"` and then add a `<title>` tag with your image title.

::: note

```component VPCard
{
  "title": "Accessible SVGs: Perfect Patterns For Screen Reader Users",
  "desc": "Discover which SVG patterns we should avoid and which patterns are the most inclusive when comparing different combinations of OSs, browsers, and screen readers. Carie will also be running an online workshop on Accessible Front-End Patterns all around front-end accessibility. ",
  "link": "/smashingmagazine.com/accessible-svg-patterns-comparison.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

You can check out [**this article for SVG and Accessibility recommendations**](/smashingmagazine.com/accessible-svg-patterns-comparison.md).

```jsx
<svg
  role="img"
  [...attr]
>
  <title>An accessible title</title>
  <!-- design code -->
</svg>
```

:::

---

## Drawing SVG With JavaScript

There is usually some mathematics involved when drawing SVGs. It’s usually fairly simple arithmetic (except, you know, in case you draw calligraphy grids and then have to dig out trigonometry…), but I think even for simple math, most people don’t write their SVGs in pure HTML and thus would like to use algebra.

At least for me, I find it much easier to understand SVG Code when giving meaning to numbers, so I always stick to JavaScript, and by giving my coordinates names, I like them immeasurable times more.

So, for the upcoming examples, we’ll look at the list of variables with the simple math and then JSX-style templates for interpolation, as that gives more legible syntax highlighting than string interpolations, and then each example will be available as a CodePen.

To keep this Guide framework-agnostic, I wanted to quickly go over drawing SVG elements with just good old vanilla JavaScript.

We’ll create a container element in HTML that we can put our SVG into and grab that element with JavaScript.

```html
<div data-svg-container></div>
<script src="template.js"></script>
```

To make it simple, we’ll draw a rectangle `<rect>` that covers the entire `viewBox` and uses a fill.

::: note

You can add all valid CSS values as fills, so a fixed color, or something like `currentColor` to access the site’s text color or a CSS variable would work here if you’re inlining your SVG and want it to interact with the page it’s placed in.*

:::

Let’s first start with our variable setup.

```js
// vars
const container = document.querySelector("[data-svg-container]");
const svgWidth = "30rem"; // use any value with units here
const documentWidth = 100;
const documentHeight = 100;
const rectWidth = documentWidth;
const rectHeight = documentHeight;
const rectFill = "currentColor"; // use any color value here
const title = "A simple square box";
```

### Method 1: Create Element and Set Attributes

This method is easier to keep type-safe (if using TypeScript) — uses proper SVG elements and attributes, and so on — but it is less performant and may take a long time if you have many elements.

```js
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
const titleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

svg.setAttribute("width", svgWidth);
svg.setAttribute("viewBox", `0 0 ${documentWidth} ${documentHeight}`);
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("role", "img");

titleElement.textContent = title;

rect.setAttribute("width", rectWidth);
rect.setAttribute("height", rectHeight);
rect.setAttribute("fill", rectFill);

svg.appendChild(titleElement);
svg.appendChild(rect);

container.appendChild(svg);
```

<CodePen
  user="smashingmag"
  slug-hash="LYKKVzg"
  title="SVG Rectangle (JS Method 1) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Method 2: Create An SVG String

Alternatively, you can create an SVG string and set the `innerHTML` of the container to that string. This is more performant, but you lose type safety, and the elements aren’t properly created in the DOM.

```js
container.innerHTML = `
<svg 
  width="${svgWidth}" 
  viewBox="0 0 ${documentWidth} ${documentHeight}" 
  xmlns="http://www.w3.org/2000/svg" 
  role="img"
>
  <title>${title}</title>
  <rect 
    width="${rectWidth}" 
    height="${rectHeight}" 
    fill="${rectFill}" 
  />
</svg>`;
```

<CodePen
  user="smashingmag"
  slug-hash="BaggNmN"
  title="SVG Rectangle (JS Method 2) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Method 3: Best Of Both Worlds

The best of both worlds is to just create the SVG itself as a DOM element and then set the content of the SVG via `innerHTML`.

We’re appending a proper SVG element to the container and can type-check that and have access to it properly. You aren’t typically going to be changing the content of the SVG that much, so I feel like this is probably the best way to do it.

```js
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

svg.setAttribute("width", svgWidth);
svg.setAttribute("viewBox", `0 0 ${documentWidth} ${documentHeight}`);
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("role", "img");

svg.innerHTML = `
  <title>${title}</title>
  <rect 
    width="${rectWidth}" 
    height="${rectHeight}" 
    fill="${rectFill}" 
  />
`;

container.appendChild(svg);
```

<CodePen
  user="smashingmag"
  slug-hash="RwzzPjz"
  title="SVG Rectangle (JS Method 3) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Drawing Basic Elements

Okay, so now that we have the basics of the SVG setup, let’s look into how the most common elements are drawn.

### Drawing Boxes

`<rect>` creates a box, as we’ve learned in the previous example. It has `y` and `x` attributes, which define the position of the top left corner. They are optional, and if not set, the box will be drawn at the origin `(0,0)` like in that previous example.

There are also `rx` and `ry` attributes. Those are radii. If you define `rx`, `ry` will automatically be set to the same value unless you redeclare it, then you’d use an elliptical corner-radius instead of a circular one.

Let’s draw four different rectangles in our next SVG, one in each quadrant:

1. Top left: This is just a rectangle with a top and left offset and a width and height.
2. Top right: We will make use of a small corner radius to make it a rounded rectangle.
3. Bottom left: It uses such a large corner radius that it turns into a circle. It has a bit of a weird box origin, but it’s an option.
4. Bottom right: It uses an elliptical corner radius for this squoval shape.

This is the implementation in JavaScript:

```js
const rectDocWidth = 200;
const rectDocHeight = 200;
const rectFill = "currentColor";
const docOffset = 15;
const rectSize = rectDocWidth / 2 - docOffset * 2;
const roundedCornerRadius = 10;
const circleLookRadius = rectSize / 2;
const ellipticalRy = roundedCornerRadius * 2;
```

And to then set up the SVG, we’ll apply these variables to the template:

```jsx
<svg
  width={svgWidth}
  viewBox={`0 0 ${rectDocWidth} ${rectDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Four Rectangles of different qualities placed in each quadrant</title>
  <rect
    x={docOffset}
    y={docOffset}
    width={rectSize}
    height={rectSize}
    fill={rectFill}
  />
  <rect
    x={rectDocWidth - rectSize - docOffset}
    rx={roundedCornerRadius}
    y={docOffset}
    width={rectSize}
    height={rectSize}
    fill={rectFill}
  />
  <rect
    x={docOffset}
    rx={circleLookRadius}
    y={rectDocHeight - rectSize - docOffset}
    width={rectSize}
    height={rectSize}
    fill={rectFill}
  />
  <rect
    x={rectDocWidth - rectSize - docOffset}
    rx={roundedCornerRadius}
    ry={ellipticalRy}
    y={rectDocHeight - rectSize - docOffset}
    width={rectSize}
    height={rectSize}
    fill={rectFill}
  />
</svg>
```

And this is the result:

<CodePen
  user="smashingmag"
  slug-hash="mdZZJpN"
  title="SVG Rect [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Drawing Lines

There is a `<line>` element in SVG that takes an `x1`, `y1`, `x2`, and `y2` attribute, which are the coordinates of the start and end points of the line.

For me, knowing how to draw straight horizontal or vertical lines was fairly important.

The rules for that are simple: **We’ll just have to make sure that the `y` values are the same for a horizontal line and the `x` values are the same for a vertical line.**

Let’s look at an example where we draw a horizontal and a vertical line through the center of our document. I purposefully used some weirder numbers here; you’ll see that the resulting SVG is still perfectly centered, though, since it’s totally fine to use floating point numbers in SVG, and we don’t really run into subpixel rendering issues as we do in some CSS cases, where we end up with fractional pixels.

These are the JavaScript variables we set up:

```js
const lineDocWidth = 421;
const lineDocHeight = 391;
const lineStroke = "currentColor";
const lineStrokeWidth = 5;
const horizontalLineStart = 0;
const horizontalLineEnd = lineDocWidth;
const horizontalLineY = lineDocHeight / 2;
const verticalLineStart = 0;
const verticalLineEnd = lineDocHeight;
const verticalLineX = lineDocWidth / 2;
```

And this is how we can integrate these variables into the SVG element:

```jsx
<svg
  width={svgWidth}
  viewBox={`0 0 ${lineDocWidth} ${lineDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Horizontal and Vertical Line through the middle of the document</title>
  <line
    x1={horizontalLineStart}
    x2={horizontalLineEnd}
    y1={horizontalLineY}
    y2={horizontalLineY}
    stroke={lineStroke}
    stroke-width={lineStrokeWidth}
  />
  <line
    x1={verticalLineX}
    x2={verticalLineX}
    y1={verticalLineStart}
    y2={verticalLineEnd}
    stroke={lineStroke}
    stroke-width={lineStrokeWidth}
  />
</svg>
```

And here’s our result:

<CodePen
  user="smashingmag"
  slug-hash="abggOqK"
  title="SVG Line [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Drawing Circles

`<circle>` elements have `cx`, `cy`, and `r` as coordinates. The `x` and `y` values are relative to the circle center, and `r` describes the radius of the circle.

This is where things are less intuitive in my head because there will be times when I want the edge of the circle to be placed at a certain point and not the center, and I’ll usually also think in terms of diameters, not radii.

So, let’s say we want to draw a circle whose outer edge is offset from the bottom left corner by a certain amount and whose diameter is a certain size. We’d have to do some math again to calculate our coordinates.

These are the variables in JavaScript that we’re working with:

```js
const circleDocWidth = 100;
const circleDocHeight = 100;
const circleOffset = 10;
const circleDiameter = 20;
const circleRadius = circleDiameter / 2;
const circleX = circleOffset + circleRadius;
const circleY = circleDocHeight - circleOffset - circleRadius;
```

And, just like before, this is how we might integrate them into the SVG element:

```jsx
<svg
  width={svgWidth}
  viewBox={`0 0 ${circleDocWidth} ${circleDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <circle
    cx={circleX}
    cy={circleY}
    r={circleRadius}
    fill="red"
  />
</svg>
```

And this is what it looks like:

<CodePen
  user="smashingmag"
  slug-hash="KKjjpoW"
  title="SVG Circle [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Drawing Ellipses

`<ellipse>` elements have `cx`, `cy`, `rx`, and `ry` as coordinates. The `x` and `y` values are relative to the ellipse center, and `rx` and `ry` describe the radius of the ellipse.

Let’s draw an ellipse that is offset from the top right corner by a certain amount, whose horizontal radius is a certain size, and whose vertical radius is half of that.

For that we need to define our variables in JavaScript:

```js
const ellipseSVGWidth = 100;
const ellipseDocWidth = 100;
const ellipseDocHeight = 100;
const ellipseOffset = 10;
const ellipseHorizontalRadius = ellipseDocWidth / 2 - ellipseOffset;
const ellipseVerticalRadius = ellipseHorizontalRadius / 2;
const ellipseX = ellipseDocWidth - ellipseOffset - ellipseHorizontalRadius;
const ellipseY = ellipseOffset + ellipseVerticalRadius;
```

…and integrate them into the SVG element:

```jsx
<svg
  width={svgWidth}
  viewBox={`0 0 ${ellipseDocWidth} ${ellipseDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Ellipse offset from the top right corner</title>
  <ellipse
    cx={ellipseX}
    cy={ellipseY}
    rx={ellipseHorizontalRadius}
    ry={ellipseVerticalRadius}
    fill="hotpink"
  />
</svg>
```

Here’s the result:

<CodePen
  user="smashingmag"
  slug-hash="NWZZqMR"
  title="SVG Ellipse [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Connecting Dots With `<polyline>` And `<polygon>`

Let’s say we want to have a line that has multiple points but doesn’t make a rectangle or a circle.

This is where we can use `polyline` and `polygon`, which share the same attributes and only differ in the way that a `polygon` will connect the first and last point, while a `polyline` won’t.

They take a `points` attribute, which is a list of `x` and `y` values separated by a space, and, by default, both of them have a `fill`, which can be a bit strange. That’s especially true for a `polyline`, so you might want to set that value to `none`.

Let’s say we have three circles, and we want to have lines connecting their centers. We can just take the `cx` and `cy` values of those circles and chain them together in the `points` attribute.

SVG is drawn from background to foreground, so the circles are drawn first, then the lines so they are stacked on top of each other.

To notice the differences between the polyline and the polygon, we’ll draw our composite four times, like we did before with the circles.

This time, we have more than one element, though. To make it quicker to scan which set belongs together, we can make use of the `g` element, which groups multiple elements together. It allows us to apply certain attributes to all children at the same time.

To see that in action and to save us a bit of time, in having to adjust `x` and `y` values for each separate element within the composite, we can apply a `transform` to that group element to push our composite into the different quadrants.

`transform="translate(x,y)`” is how we do that. The transform attribute works a lot like CSS transforms, with slight differences in syntax. But in most simple cases, we can assume the same thing to happen. The translate attribute will take the original position and then move the elements contained within the group along the `x` and `y` axis.

So, let’s have a look at our SVG:

![From left to right, bottom to top: Polyline with no fill applied, polyline with fill, polygon with no fill, polygon with fill. ([<VPIcon icon="fas fa-file-image"/>SVG preview](https://files.smashing.media/articles/svg-coding-examples-recipes-writing-vectors-by-hand/polygon-polyline-composite-fixed.svg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/svg-coding-examples-recipes-writing-vectors-by-hand/polygon-polyline-composite-fixed.png)

Here, you can see that with the same coordinates, a polyline won’t draw the line between the blue and the red dot, while a polygon will. However, when applying a fill, they take the exact same information as if the shape was closed, which is the right side of the graphic, where the polyline makes it look like a piece of a circle is missing.

This is the second time where we have dealt with quite a bit of repetition, and we can have a look at how we could leverage the power of JavaScript logic to render our template faster.

But first, we need a basic implementation like we’ve done before. We’re creating objects for the circles, and then we’re chaining the `cx` and `cy` values together to create the `points` attribute. We’re also storing our transforms in variables.

```js
const polyDocWidth = 200;
const polyDocHeight = 200;
const circleOne = { cx: 25, cy: 80, r: 10, fill: "red" };
const circleTwo = { cx: 40, cy: 20, r: 5, fill: "lime" };
const circleThree = { cx: 70, cy: 60, r: 8, fill: "cyan" };
const points = `${circleOne.cx},${circleOne.cy} ${circleTwo.cx},${circleTwo.cy} ${circleThree.cx},${circleThree.cy}`;
const moveToTopRight = `translate(${polyDocWidth / 2}, 0)`;
const moveToBottomRight = `translate(${polyDocWidth / 2}, ${polyDocHeight / 2})`;
const moveToBottomLeft = `translate(0, ${polyDocHeight / 2})`;
```

And then, we apply the variables to the template, using either a `polyline` or `polygon` element and a `fill` attribute that is either set to `none` or a color value.

```jsx :collapsed-lines
<svg
  width={svgWidth}
  viewBox={`0 0 ${polyDocWidth} ${polyDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <title>Composite shape comparison</title>
  <g>
    <circle
      cx={circleOne.cx}
      cy={circleOne.cy}
      r={circleOne.r}
      fill={circleOne.fill}
    />
    <circle
      cx={circleTwo.cx}
      cy={circleTwo.cy}
      r={circleTwo.r}
      fill={circleTwo.fill}
    />
    <circle
      cx={circleThree.cx}
      cy={circleThree.cy}
      r={circleThree.r}
      fill={circleThree.fill}
    />
    <polyline
      points={points}
      fill="none"
      stroke="black"
    />
  </g>
  <g transform={moveToTopRight}>
    <circle
      cx={circleOne.cx}
      cy={circleOne.cy}
      r={circleOne.r}
      fill={circleOne.fill}
    />
    <circle
      cx={circleTwo.cx}
      cy={circleTwo.cy}
      r={circleTwo.r}
      fill={circleTwo.fill}
    />
    <circle
      cx={circleThree.cx}
      cy={circleThree.cy}
      r={circleThree.r}
      fill={circleThree.fill}
    />
    <polyline
      points={points}
      fill="white"
      stroke="black"
    />
  </g>
  <g transform={moveToBottomLeft}>
    <circle
      cx={circleOne.cx}
      cy={circleOne.cy}
      r={circleOne.r}
      fill={circleOne.fill}
    />
    <circle
      cx={circleTwo.cx}
      cy={circleTwo.cy}
      r={circleTwo.r}
      fill={circleTwo.fill}
    />
    <circle
      cx={circleThree.cx}
      cy={circleThree.cy}
      r={circleThree.r}
      fill={circleThree.fill}
    />
    <polygon
      points={points}
      fill="none"
      stroke="black"
    />
  </g>
  <g transform={moveToBottomRight}>
    <circle
      cx={circleOne.cx}
      cy={circleOne.cy}
      r={circleOne.r}
      fill={circleOne.fill}
    />
    <circle
      cx={circleTwo.cx}
      cy={circleTwo.cy}
      r={circleTwo.r}
      fill={circleTwo.fill}
    />
    <circle
      cx={circleThree.cx}
      cy={circleThree.cy}
      r={circleThree.r}
      fill={circleThree.fill}
    />
    <polygon
      points={points}
      fill="white"
      stroke="black"
    />
  </g>
</svg>
```

And here’s a version of it to play with:

<CodePen
  user="smashingmag"
  slug-hash="OJeeVoM"
  title="SVG Polygon / Polyline (simple) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Dealing With Repetition

When it comes to drawing SVGs, you may find that you’ll be repeating a lot of the same code over and over again. This is where JavaScript can come in handy, so let’s look at the composite example again and see how we could optimize it so that there is less repetition.

::: note Observations:

- We have three circle elements, all following the same pattern.
- We create one repetition to change the `fill` style for the element.
- We repeat those two elements one more time, with either a `polyline` or a `polygon`.
- We have four different `transforms` (technically, no transform is a transform in this case).

:::

This tells us that we can create nested loops.

Let’s go back to just a vanilla implementation for this since the way loops are done is quite different across frameworks.

You could make this more generic and write separate generator functions for each type of element, but this is just to give you an idea of what you could do in terms of logic. There are certainly still ways to optimize this.

I’ve opted to have arrays for each type of variation that we have and wrote a helper function that goes through the data and builds out an array of objects with all the necessary information for each group. In such a short array, it would certainly be a viable option to just have the data stored in one element, where the values are repeated, but we’re taking the DRY thing seriously in this one.

The group array can then be looped over to build our SVG HTML.

```js :collapsed-lines
const container = document.querySelector("[data-svg-container]");
const svgWidth = 200;
const documentWidth = 200;
const documentHeight = 200;
const halfWidth = documentWidth / 2;
const halfHeight = documentHeight / 2;
const circles = [
  { cx: 25, cy: 80, r: 10, fill: "red" },
  { cx: 40, cy: 20, r: 5, fill: "lime" },
  { cx: 70, cy: 60, r: 8, fill: "cyan" },
];
const points = circles.map(({ cx, cy }) => `${cx},${cy}`).join(" ");
const elements = ["polyline", "polygon"];
const fillOptions = ["none", "white"];
const transforms = [
  undefined,
  `translate(${halfWidth}, 0)`,
  `translate(0, ${halfHeight})`,
  `translate(${halfWidth}, ${halfHeight})`,
];
const makeGroupsDataObject = () => {
  let counter = 0;
  const g = [];
  elements.forEach((element) => {
    fillOptions.forEach((fill) => {
      const transform = transforms[counter++];
      g.push({ element, fill, transform });
    });
  });
  return g;
};
const groups = makeGroupsDataObject();
// result:
// [
//   {
//     element: "polyline",
//     fill: "none",
//   },
//   {
//     element: "polyline",
//     fill: "white",
//     transform: "translate(100, 0)",
//   },
//   {
//     element: "polygon",
//     fill: "none",
//     transform: "translate(0, 100)",
//   },
//   {
//     element: "polygon",
//     fill: "white",
//     transform: "translate(100, 100)",
//   }
// ]

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", svgWidth);
svg.setAttribute("viewBox", `0 0 ${documentWidth} ${documentHeight}`);
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("role", "img");
svg.innerHTML = "<title>Composite shape comparison</title>";
groups.forEach((groupData) => {
  const circlesHTML = circles
    .map((circle) => {
      return `
        <circle 
          cx="${circle.cx}" 
          cy="${circle.cy}" 
          r="${circle.r}" 
          fill="${circle.fill}"
        />`;
    })
    .join("");
  const polyElementHTML = `
    <${groupData.element} 
      points="${points}" 
      fill="${groupData.fill}" 
      stroke="black" 
    />`;
  const group = `
      <g ${groupData.transform ? `transform="${groupData.transform}"` : ""}>
        ${circlesHTML}
        ${polyElementHTML}
      </g>
    `;
  svg.innerHTML += group;
});
container.appendChild(svg);
```

And here’s the Codepen of that:

<CodePen
  user="smashingmag"
  slug-hash="XWLLbPq"
  title="SVG Polygon / Polyline (JS loop version) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More Fun Stuff

Now, that’s all the basics I wanted to cover, but there is so much more you can do with SVG. There is more you can do with `transform`; you can use a `mask`, you can use a `marker`, and so on.

We don’t have time to dive into all of them today, but since this started for me when making Calligraphy Grids, I wanted to show you the two most satisfying ones, which I, unfortunately, can’t use in the generator since I wanted to be able to open my generated SVGs in Affinity and it doesn’t support `pattern`.

Okay, so `pattern` is part of the `defs` section within the SVG, which is where you can define reusable elements that you can then reference in your SVG.

### Graph Grid with `pattern`

If you think about it, a graph is just a bunch of horizontal and vertical lines that repeat across the x- and y-axis.

So, `pattern` can help us with that. We can create a `<rect>` and then reference a `pattern` in the `fill` attribute of the `rect`. The pattern then has its own `width`, `height`, and `viewBox`, which defines how the pattern is repeated.

So, let’s say we want to perfectly center our graph grid in any given width or height, and we want to be able to define the size of our resulting squares (cells).

Once again, let’s start with the JavaScipt variables:

```js
const graphDocWidth = 226;
const graphDocHeight = 101;
const cellSize = 5;
const strokeWidth = 0.3;
const strokeColor = "currentColor";
const patternHeight = (cellSize / graphDocHeight) * 100;
const patternWidth = (cellSize / graphDocWidth) * 100;
const gridYStart = (graphDocHeight % cellSize) / 2;
const gridXStart = (graphDocWidth % cellSize) / 2;
```

Now, we can apply them to the SVG element:

```jsx :collapsed-lines
<svg
  width={svgWidth}
  viewBox={`0 0 ${graphDocWidth} ${graphDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <defs>
    <pattern
      id="horizontal"
      viewBox={`0 0 ${graphDocWidth} ${strokeWidth}`}
      width="100%"
      height={`${patternHeight}%`}
    >
      <line
        x1="0"
        x2={graphDocWidth}
        y1={gridYStart}
        y2={gridYStart}
        stroke={strokeColor}
        stroke-width={strokeWidth}
      />
    </pattern>
    <pattern
      id="vertical"
      viewBox={`0 0 ${strokeWidth} ${graphDocHeight}`}
      width={`${patternWidth}%`}
      height="100%"
    >
      <line
        y1={0}
        y2={graphDocHeight}
        x1={gridXStart}
        x2={gridXStart}
        stroke={strokeColor}
        stroke-width={strokeWidth}
      />
    </pattern>
  </defs>
  <title>A graph grid</title>
  <rect
    width={graphDocWidth}
    height={graphDocHeight}
    fill="url(#horizontal)"
  />
  <rect
    width={graphDocWidth}
    height={graphDocHeight}
    fill="url(#vertical)"
  />
</svg>
```

And this is what that then looks like:

<CodePen
  user="smashingmag"
  slug-hash="XWLLbxq"
  title="SVG Graph Grid [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

### Dot Grid With `pattern`

If we wanted to draw a dot grid instead, we could simply repeat a circle. Or, we could alternatively use a line with a `stroke-dasharray` and `stroke-dashoffset` to create a dashed line. And we’d only need one line in this case.

Starting with our JavaScript variables:

```js
const dotDocWidth = 219;
const dotDocHeight = 100;
const cellSize = 4;
const strokeColor = "black";
const gridYStart = (dotDocHeight % cellSize) / 2;
const gridXStart = (dotDocWidth % cellSize) / 2;
const dotSize = 0.5;
const patternHeight = (cellSize / dotDocHeight) * 100;
```

And then adding them to the SVG element:

```jsx :collapsed-lines
<svg
  width={svgWidth}
  viewBox={`0 0 ${dotDocWidth} ${dotDocHeight}`}
  xmlns="http://www.w3.org/2000/svg"
  role="img"
>
  <defs>
    <pattern
      id="horizontal-dotted-line"
      viewBox={`0 0 ${dotDocWidth} ${dotSize}`}
      width="100%"
      height={`${patternHeight}%`}
    >
      <line
        x1={gridXStart}
        y1={gridYStart}
        x2={dotDocWidth}
        y2={gridYStart}
        stroke={strokeColor}
        stroke-width={dotSize}
        stroke-dasharray={`0,${cellSize}`}
        stroke-linecap="round"
      ></line>
    </pattern>
  </defs>
  <title>A Dot Grid</title>
  <rect
    x="0"
    y="0"
    width={dotDocWidth}
    height={dotDocHeight}
    fill="url(#horizontal-dotted-line)"
  ></rect>
</svg>
```

And this is what that looks like:

<CodePen
  user="smashingmag"
  slug-hash="eYwwNQM"
  title="SVG Dot Grid [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

This brings us to the end of our little introductory journey into SVG. As you can see, coding SVG by hand is not as scary as it seems. If you break it down into the basic elements, it becomes quite like any other coding task:

- We analyze the problem,
- Break it down into smaller parts,
- Examine each coordinate and its mathematical breakdown,
- And then put it all together.

I hope that this article has given you a starting point into the wonderful world of coded images and that it gives you the motivation to delve deeper into the specs and try drawing some yourself.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SVG Coding Examples: Useful Recipes For Writing Vectors By Hand",
  "desc": "Myriam Frisano explores the basics of hand-coding SVGs with practical examples to demystify the inner workings of common SVG elements. In this guide, you’ll learn about asking the right questions to solve common positioning problems and how to leverage JavaScript so that, by the end, you can add “SVG coding” to your toolbox. You’ll also be able to declare proudly, “I know how to draw literal pictures with words!”",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/svg-coding-examples-recipes-writing-vectors-by-hand.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
