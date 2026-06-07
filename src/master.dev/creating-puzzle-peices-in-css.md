---
lang: en-US
title: "Let’s Get Puzzled!"
description: "Article(s) > Let’s Get Puzzled!"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Let’s Get Puzzled!"
    - property: og:description
      content: "Let’s Get Puzzled!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/creating-puzzle-peices-in-css.html
prev: /programming/css/articles/README.md
date: 2026-04-06
isOriginal: false
author:
  - name: Amit Sheen
    url: https://master.dev/blog/author/amitsheen/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9168
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
  name="Let’s Get Puzzled!"
  desc="We can make puzzle pieces in CSS thanks to the amazing clip-path: shape(). Here, Amit takes it further by making a whole grid of them with matched edges and content inside."
  url="https://master.dev/blog/creating-puzzle-peices-in-css/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9168"/>

There are plenty of situations where a regular rectangular card feels a little too regular. A puzzle-piece shape instantly changes the tone: it can make a gallery feel more playful, turn a loading state into a reveal, give a hero section a tactile feel, or let you break an image into interactive fragments that look like they belong together.

The fun part is that we can build the whole thing with modern CSS and a small amount of JavaScript. We’ll start with a single piece, make that shape configurable, then generate a whole puzzle where neighboring pieces share matching tabs and sockets. Finally, we’ll place real content inside the pieces so the effect becomes usable, not just decorative.

<CodePen
  link="https://codepen.io/amit_sheen/pen/RNGjrad/10e6d7ce74db8bf486230ebd5bede814"
  title="Puzzle - Demo 07"
  :default-tab="['css','result']"
  :theme="dark"/>

We’ll build this in three steps:

1. Draw a single puzzle piece with `clip-path: shape()`.
2. Generate a dynamic grid of connected pieces, with matching edges.
3. Add real content inside each piece, and position it appropriately.

---

## Step 1: Draw *One* Puzzle Piece

The first goal is simple: define the silhouette of a puzzle piece using CSS alone. And to get there, we need to break down the shape into its geometric components. A puzzle piece is basically a square with four edges, and each edge can either be flat, bulge out, or cave in. The bulges and caves are what we call “tabs” and “sockets”, and they can be positioned anywhere along the edge.

![Image of a puzzle piece with labeled edges and tabs/sockets](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/e6vSkxqi-1.png?resize=800%2C487&ssl=1)

In the image above, the outer square with the dashed pink outline represents the overall piece size, and I’ve sized the tabs to be 20% of the piece size. This sets the inner square to be 60% of the piece size, and helps keep the math simple. Now let’s translate that into code.

```html
<div class="puzzle-piece"></div>
```

We’ll start with a single `.puzzle-piece` element, and to create the shape, we’ll use `clip-path: shape()`. The `shape` function lets us define a path with a mix of straight lines and curves, which is perfect for this kind of organic shape, and lets us use relative coordinates with custom properties for the flexibility we need later on.

We’ll apply the shape to a pseudo-element so we can keep the base element simple and easy to style and position. That way, we can focus on getting the geometry right without worrying about content or layout just yet.

```css
.puzzle-piece {
  position: relative;
  width: 160px;
  aspect-ratio: 1;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: white;
    clip-path: shape(/* shape definition goes here */);
  }
}
```

### Defining the Inner Square

The shape definition is a bit of a puzzle in itself. We need to define a path that starts at one point, then travels around the edges of the piece, adding tabs and sockets as we go. Let’s start with the four edges without any tabs or sockets:

```css{2,5,10}
clip-path: shape(
  /* Start at the top-left corner of the inner square */
  from 20% 20%,
  
  /* draw a line through the three other corners of the inner square */
  line to 80% 20%,
  line to 80% 80%,
  line to 20% 80%,
  
  /* close the path */ close
);

```

![GIF showing the basic square shape defined by the above path](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/bFQQP-QP.gif?resize=800%2C450&ssl=1)

Remember that the inner square is 60% of the piece size, so the corners are at 20% and 80%. This gives us a simple square shape. Now we can add tabs and sockets by inserting curves along the edges.

::: info

If you want to take a deep dive into how the `shape()` syntax works, I’ve written a separate article series that breaks down the path definition in detail.

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 1)",
  "desc": "A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`.",
  "link": "/master.dev/the-path-of-least-resistance-part-1.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 2)",
  "desc": "This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path.",
  "link": "/master.dev/the-path-of-least-resistance-part-2.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

### Starting at the Top

We’ll start with the top edge. Let’s say we want to add a tab that bulges out in the middle. We can use a `curve` definition to create that shape:

```css
clip-path: shape(
  from 20% 20%,

  /* draw the top edge with a tab in the middle */
  line to 40% 20%,
  curve to 50% 0%
      with 50% 20%
      / 30% 0%,
  curve to 60% 20%
      with 70% 0%
      / 50% 20%,
  line to 80% 20%,

  line to 80% 80%,
  line to 20% 80%,
  close
);
```

![GIF showing the curve definition for the top edge with control points](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/pBardfj4.gif?resize=800%2C450&ssl=1)

::: info Let’s break down those new definitions:

1. We start with a `line to 40% 20%`, the **white** part of the path in the diagram, which is the point where the tab begins.
2. Then we define a `curve to 50% 0%`, which is the tip of the tab. This is the **yellow** part of the path. The control points for this curve are `50% 20%` (the red point at the base of the tab) and `30% 0%` (the green point that controls how much the tab bulges sideways).
3. And we define another `curve` back to `60% 20%`, which is the point where the tab ends. This is the **magenta** part of the path. The control points for this curve are `70% 0%` (the blue point that controls how much the tab bulges sideways) and `50% 20%` (the red point at the base of the tab).
4. After the curves, we continue with a straight line to `80% 20%`, this is the **aqua** part of the path and this is the point where the path starts its journey on the next edge.

:::

### Adding Flexibility with Custom Properties

Before moving on to the other edges, let’s make these curves more flexible. Hard-coded coordinates are fine for a prototype, but the whole point of a puzzle piece is variation.

We want to control two things on every edge:

1. The size, which decides whether the connector bulges out or caves in, and by how much.
2. The offset, which moves the connector along the edge.

So instead of fixed values, we can replace the hard-coded coordinates with calculations based on `--top-size` and `--top-offset`. By using custom properties, we can easily adjust the shape without rewriting the path definition.

#### Size

The `--top-size` value controls how far the connector extends and how the nearby control points are positioned. Since the connector depth is based on the 20% edge inset, we can use that as the reference: negative values create tabs, and positive values create sockets.

```css
clip-path: shape(
  from 20% 20%,

  line to 40% 20%,
  curve to 50% calc(20% + var(--top-size))
      with 50% 20%
      / calc(50% - abs(var(--top-size))) calc(20% + var(--top-size)),
  curve to 60% 20%
      with calc(50% + abs(var(--top-size)) ) calc(20% + var(--top-size))
      / 50% 20%,
  line to 80% 20%,

  line to 80% 80%,
  line to 20% 80%,
  close
);
```

Let’s break down the changes we made to the curve definition:

1. As for the **Y axis**, the tip of the tab is now defined as `calc(20% + var(--top-size))`, which means it will move up or down based on the value of `--top-size`.
2. The control points are also adjusted by the same calculation to ensure they move in sync with the tip of the tab.
3. On the **X axis**, the control points are adjusted using the `--top-size` value, to ensure that the tab bulges out or caves in smoothly.
4. We use `abs()` to ensure that the control points adjust correctly, whether the tab is bulging out (negative size) or caving in (positive size). This way, we can create both tabs and sockets with the same logic.

#### Offset

The offset will shift the entire tab along the edge, so we need to adjust the x-coordinates of all relevant points in the path definition.

```css
clip-path: shape(
  from 20% 20%,

  line to calc(40% + var(--top-offset)) 20%,
  curve to calc(50% + var(--top-offset)) calc(20% + var(--top-size))
      with calc(50% + var(--top-offset)) 20%
      / calc(50% + var(--top-offset) - abs(var(--top-size))) calc(20% + var(--top-size)),
  curve to calc(60% + var(--top-offset)) 20%
      with calc(50% + var(--top-offset) + abs(var(--top-size))) calc(20% + var(--top-size))
      / calc(50% + var(--top-offset)) 20%,
  line to 80% 20%,

  line to 80% 80%,
  line to 20% 80%,
  close
);
```

::: note

To avoid the tabs and sockets from overlapping the corners, we’ll set the `--top-offset` property to a range of -8% to 8%. This ensures that the tabs and sockets are always positioned to maintain the integrity of the piece’s shape.

:::

Here is a working demo of the single piece with adjustable tab size and offset:

<CodePen
  link="https://codepen.io/amit_sheen/pen/zxKEJdj/d707ebff106e613fc4ed96500d21b66c"
  title="Puzzle - Demo 01"
  :default-tab="['css','result']"
  :theme="dark"/>

### Adding the Other Edges

Now that we have one edge that can be customized with CSS variables, we can apply the same logic to the other three edges, creating a fully customizable puzzle piece. Each edge will have its own `--offset` and `--size` properties, allowing for a wide variety of shapes from a single base definition.

And just like for the top edge, each edge will follow the same pattern:

- A `line` to the start of the tab or socket.
- A `curve` to the tip of the tab or socket, with one control point at the base of the tab, and one that adjusts based on the size.
- Another `curve` back to the edge, now with the first control point relative to the tip, and the second control point at the base.
- A `line` to the next corner.

```css{5,15,25,35,44}
clip-path: shape(
  /* Start at the top-left corner of the inner square */
  from 20% 20%,

  /* Top edge */
  line to calc(40% + var(--top-offset)) 20%,
  curve to calc(50% + var(--top-offset)) calc(20% + var(--top-size))
      with calc(50% + var(--top-offset)) 20%
      / calc(50% + var(--top-offset) - abs(var(--top-size))) calc(20% + var(--top-size)),
  curve to calc(60% + var(--top-offset)) 20%
      with calc(50% + var(--top-offset) + abs(var(--top-size))) calc(20% + var(--top-size))
      / calc(50% + var(--top-offset)) 20%,
  line to 80% 20%,

  /* Right edge */
  line to 80% calc(40% + var(--right-offset)),
  curve to calc(80% - var(--right-size)) calc(50% + var(--right-offset))
      with 80% calc(50% + var(--right-offset))
      / calc(80% - var(--right-size)) calc(50% + var(--right-offset) - abs(var(--right-size))),
  curve to 80% calc(60% + var(--right-offset))
      with calc(80% - var(--right-size)) calc(50% + var(--right-offset) + abs(var(--right-size)))
      / 80% calc(50% + var(--right-offset)),
  line to 80% 80%,

  /* Bottom edge */
  line to calc(60% + var(--bottom-offset)) 80%,
  curve to calc(50% + var(--bottom-offset)) calc(80% - var(--bottom-size))
      with calc(50% + var(--bottom-offset)) 80%
      / calc(50% + var(--bottom-offset) + abs(var(--bottom-size))) calc(80% - var(--bottom-size)),
  curve to calc(40% + var(--bottom-offset)) 80%
      with calc(50% + var(--bottom-offset) - abs(var(--bottom-size))) calc(80% - var(--bottom-size))
      / calc(50% + var(--bottom-offset)) 80%,
  line to 20% 80%,

  /* Left edge */
  line to 20% calc(60% + var(--left-offset)),
  curve to calc(20% + var(--left-size)) calc(50% + var(--left-offset))
      with 20% calc(50% + var(--left-offset))
      / calc(20% + var(--left-size)) calc(50% + var(--left-offset) + abs(var(--left-size))),
  curve to 20% calc(40% + var(--left-offset))
      with calc(20% + var(--left-size)) calc(50% + var(--left-offset) - abs(var(--left-size)))
      / 20% calc(50% + var(--left-offset)),

  /* Close the path */
  close
);
```

This consistent structure makes it easier to reason about the shape and to create a system where each edge can be independently controlled.

<CodePen
  link="https://codepen.io/amit_sheen/pen/bNwoxYe/4749738d82c1816f2225fdad9d8dd5a1"
  title="Puzzle - Demo 02"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s take a moment to appreciate how `shape()` allows us to define this complex shape with a mix of lines and curves. The syntax is a bit verbose, but it gives us precise control over the geometry of the piece.

---

## Step 2: Generate Multiple Pieces that Actually Fit Together

Once a single piece works, the next step is to have a bunch of them working together. The key rule is that neighboring pieces need to have matching connectors. If one piece has a tab on its right edge, the piece immediately to its right needs to have a socket in the same position, and vice versa.

You could create each piece and set the values in advance, but that would be tedious and error-prone. Instead, we can build a generator that produces a dynamic number of pieces, generates the necessary values for each piece, with controlled randomness, and ensures they fit together.

```html
<div class="puzzle"></div>
```

We’ll start with an empty container for the puzzle pieces, and use JavaScript to fill it with the right number of pieces and assign the appropriate values to each one. We’ll define how many pieces we want in each row and column, and then create a loop to generate each piece with the correct properties.

```js
// Get the container element where the pieces will be placed
const puzzleContainer = document.querySelector('.puzzle');

// Define the number of pieces per row and column
const pieceCount = {
  rows: 4, 
  columns: 6,
}

// Set the piece count as a CSS variable on the container for use in styling
puzzleContainer.style.setProperty('--piece-count-rows', pieceCount.rows);
puzzleContainer.style.setProperty('--piece-count-columns', pieceCount.columns);

// Loop through each row and column
for (let y = 0; y < pieceCount.rows; y++) {
  for (let x = 0; x < pieceCount.columns; x++) {
              
    // Create a new div element for the puzzle piece
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');

    // Assign a random hue to each piece to make them visually distinct
    piece.style.setProperty('--hue', `${Math.round(Math.random() * 360)}`);

    // Append the piece into the container
    puzzleContainer.appendChild(piece)
  }
}`
```

::: note

We’re only using JavaScript to generate the pieces and set some initial properties. The actual shape, layout, and interactions will be handled by CSS. You could just as easily use a CSS preprocessor or a CSS-in-JS solution, and keep the same logic.

:::

Now that we have the pieces generated and the custom properties set, we can use that to style our pieces in CSS.

```css
.puzzle {
  /* set up a grid layout based on the number of pieces */
  display: grid;
  grid-template-columns: repeat(var(--piece-count-columns), 1fr);
  grid-template-rows: repeat(var(--piece-count-rows), 1fr);
        
  /* Keep the puzzle responsive by setting a max width and using aspect ratio to maintain the shape */
  width: min(100%, 500px);
  aspect-ratio: var(--piece-count-columns) / var(--piece-count-rows);
}

.puzzle-piece {
  position: relative;
  /* Each piece should take up the full size of its grid cell */
  width: 100%;
  aspect-ratio: 1;

  &::after {
    content: '';
    position: absolute;
    inset: 0%;
    /* Use the hue variable to give each piece a different color for better visibility */
    background-color: hsl(var(--hue, 0) 75% 75%);
    clip-path: shape(
      /* shape definition goes here, using the custom properties for offsets and sizes */
    );
  }
}
```

Now we have a grid of pieces, but no tabs or sockets yet.

<CodePen
  link="https://codepen.io/amit_sheen/pen/MYjEqPQ/19bbc5090e8ef08acf5852adebca3b56"
  title="Puzzle - Demo 03"
  :default-tab="['css','result']"
  :theme="dark"/>

### Generate Matching Tabs and Sockets

Let’s add the logic to generate matching tabs and sockets. Given how our loop is structured, we create pieces row by row, and within each row, from left to right. This means that when we create a piece, the only neighbors that have already been created are the piece above it (if it’s not in the first row) and the piece to the left of it (if it’s not in the first column).

So we need to ‘copy’ the relevant edge properties from those neighbors to ensure that the connectors match up, and generate new random values for the right and bottom edges, which will be copied by the next pieces in the row and column.

We’ll break down the logic for setting the properties for each edge, but first, let’s set a `pieces` array to keep track of all the pieces we create, so we can easily access the neighbors when needed, and a couple of helper functions to generate random offsets and sizes for the tabs and sockets:

```js
const pieces = [];

/* get a random offset between -8 and 8 */
const randomOffset = () => Math.random() * 16 - 8;

/* get a random size between 10 and 20, with a random direction */
const randomSize = () => {
  const size = Math.random() * 10 + 10;
  const direction = Math.random() < 0.5 ? -1 : 1;
  return size * direction;
}
```

### Top and Left Edges

For the top edge of the piece, we need to check if there is a piece above it. If there is, we copy the bottom edge properties of that piece to the top edge properties of the current piece. If there isn’t (i.e., it’s the first row), we set the top edge properties to 0, which means a flat edge.

```js
const above = pieces[(y - 1) * pieceCount.columns + x];
piece.dataset.topOffset = above ? above.dataset.bottomOffset : 0;
piece.dataset.topSize = above ? (above.dataset.bottomSize * -1) : 0;
```

The left edge follows the same logic, but we check for the piece to the left instead. If there is a piece to the left, we copy the right-edge properties of that piece to the left edge of the current piece. If there isn’t (i.e., it’s the first column), we set the left edge properties to 0.  

```js
const left = pieces[y * pieceCount.columns + (x - 1)];
piece.dataset.leftOffset = left ? left.dataset.rightOffset : 0;
piece.dataset.leftSize = left ? (left.dataset.rightSize * -1) : 0;
```

Note that we multiply the size by `-1` when copying it, because if one piece has a tab (negative size), the adjacent piece needs to have a socket (positive size), and vice versa. But the offset is the same for both pieces, because the tab and socket need to align along the shared edge.

### Right and Bottom Edges

For the right and bottom edges, we need to generate new random values for the offset and size, but only if the piece is not on the last column or last row, respectively. If it is on the last column or last row, we set those properties to 0 to create a flat edge.

```js
piece.dataset.bottomOffset = (y === pieceCount.rows - 1) ? 0 : randomOffset();
piece.dataset.bottomSize = (y === pieceCount.rows - 1) ? 0 : randomSize();

piece.dataset.rightOffset = (x === pieceCount.columns - 1) ? 0 : randomOffset();
piece.dataset.rightSize = (x === pieceCount.columns - 1) ? 0 : randomSize();
```

Don’t forget to push the piece into the `pieces` array after setting the top and left edge properties, so that it can be accessed by the next pieces in the loop.

```js
pieces.push(piece);
```

### Pass the Generated Values into CSS

One approach would be setting the custom properties directly from JavaScript, just like we’ve seen with the `--hue` property. That works fine. But there is another option that’s way cooler: since we already store the values as data attributes, we can read them directly in CSS with `attr()`.

```css
--top-offset: calc(attr(data-top-offset type(<number>)) * 1%);
--top-size: calc(attr(data-top-size type(<number>)) * 1%);

--right-offset: calc(attr(data-right-offset type(<number>)) * 1%);
--right-size: calc(attr(data-right-size type(<number>)) * 1%);

--bottom-offset: calc(attr(data-bottom-offset type(<number>)) * 1%);
--bottom-size: calc(attr(data-bottom-size type(<number>)) * 1%);

--left-offset: calc(attr(data-left-offset type(<number>)) * 1%);
--left-size: calc(attr(data-left-size type(<number>)) * 1%);
```

All we need to do is to set the `type` to `<number>` and multiply by `1%` to convert the values into the right units for our `clip-path` definition. This way, we can keep our CSS clean and maintain a clear separation of concerns between JavaScript and CSS.

And that is it!

<CodePen
  link="https://codepen.io/amit_sheen/pen/yyazxZv/f10deb6b871f36edff1c2a225f974676"
  title="Puzzle - Demo 04"
  :default-tab="['css','result']"
  :theme="dark"/>

Oh, but wait, those pieces are just floating around, not even touching each other.

Remember, in the very beginning, we said that the inner squares are actually 60% of the piece size, as there is a 20% inset on each side for the tabs and sockets. So we need to make up the 40% total (20% on each side) by making the pieces larger than their grid cells.

This can be done easily with a negative `inset` on the pseudo-element, which will oversize the piece and allow the tabs and sockets to extend beyond the nominal square size without getting clipped.

As 20% is a third of 60%, we can use -33.333% to compensate for the extra space needed, or use a simple calculation to get the exact value:

```css
&::after {
  position: absolute;
  /* inset: -33.333%; */
  inset: calc(-100% / 3);
}
```

I’ve also added a simple `:hover` effect to make it easier to see the individual pieces.

```css
&:hover {
  filter: drop-shadow(0 0 16px #000);
  transform: translateZ(30px);
}
```

Here is the final demo with the pieces fitting together perfectly:

<CodePen
  link="https://codepen.io/amit_sheen/pen/dPpVgKp/ccf524e3c72715553836203610c88bff"
  title="Puzzle - Demo 05"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Step 3: Put Content Inside the Pieces

A puzzle effect is useful when it reveals something real. Images are the most natural fit, so instead of giving each piece a random hue, we can make them all share the same background image, and then shift the background position for each piece to show a different slice of that image.

First, we need to pass the coordinates of each piece into CSS, so we can calculate the correct background position. We can do this easily by setting custom properties for the x and y coordinates of each piece in the grid:

```js
piece.style.setProperty('--x', x);
piece.style.setProperty('--y', y);
```

Then CSS can use those coordinates to line up the shared image:

```css
&::after {
  background-image: url('path/to/your/image.jpg');
  background-size:
    calc(var(--piece-count-columns) * 60%)
    calc(var(--piece-count-rows) * 60%);
  background-position:
    calc(100% * (var(--x) - 1 / 3) / (var(--piece-count-columns) - 5 / 3))
    calc(100% * (var(--y) - 1 / 3) / (var(--piece-count-rows) - 5 / 3));
}
```

Let’s break down those calculations for the background size and position, because they can be a bit tricky to wrap your head around at first.

The `background-size` is based on the number of pieces in each row and column, multiplied by `60%` because the inner square of each piece takes up 60% of the total piece size. That scales the image to the full puzzle size, and each piece can display the correct slice once the background is positioned.

To understand the `background-position` calculation, let’s break it down into three parts:

1. We use `100%` to scale the position to the full size of the background image.
2. The `var(--x)` and `var(--y)` represent the coordinates of each piece in the grid, while the `- 1 / 3` part is there to adjust for the fact that the tabs and sockets extend beyond the inner square, so we need to shift the background position accordingly to keep everything aligned.
3. The denominator is a bit more complex because it represents the distance the background must travel from one piece to the next. We start with the number of pieces, subtract 1 because background positions are measured between pieces, and then subtract another 2/3 to account for the extra overhang on the outer edges. That is how we end up with the `- 5 / 3` term in the formula.

Together, these calculations keep the full image seamlessly aligned across all pieces while remaining fully dynamic and responsive. Each piece becomes a window into the larger image, while the tabs and sockets create a playful, tactile feel that makes the whole thing more engaging.

<CodePen
  link="https://codepen.io/amit_sheen/pen/bNwomPx/1fdce018f3ef20e11299b9dd00ab6660"
  title="Puzzle - Demo 06"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Next Step is Yours

This technique isn’t limited to images. You could use it with any kind of content, including text, patterns, or even interactive elements. See the first demo in this article for an example of how it can work with text content, where each piece reveals a different part of a message.

Of course, the same foundation can power several kinds of UI, like a hover-based reveal, a draggable puzzle game, a loader or transition effect, or a card layout where modules feel physically connected.

<CodePen
  link="https://codepen.io/amit_sheen/pen/myrqwmx/cc6b2d267a276b73e6510d1169769062"
  title="Puzzle - Demo 08"
  :default-tab="['css','result']"
  :theme="dark"/>

The key is that the geometry lives in CSS, the variability lives in custom properties, and the relationships between pieces live in JavaScript. This separation of concerns allows for a lot of flexibility and creativity in how you use this pattern.

The only limit is your imagination!

::: note

Even if you never turn it into a literal puzzle, the core idea is valuable on its own: `shape()` plus custom properties gives you a reusable geometric component instead of a one-off decoration.

:::

---

## Wrapping Up

We started with a single clipped shape, turned it into a parametric puzzle piece, taught JavaScript to generate matching neighbors, and then used the result to display real content.

What I like about this progression is that a single piece is a neat CSS trick, but the full system is a pattern. And once you have that pattern, you can push it in a lot of directions: random puzzles, animated reveals, image mosaics, interactive cards, maybe even text layouts that feel assembled instead of merely placed.

What makes this useful is not just the puzzle look, but the logic behind it: CSS defines the geometry, custom properties make it flexible, and JavaScript coordinates how the pieces relate to each other. Once those parts are in place, the same idea can power anything from decorative layouts to interactive UI. It turns a one-off visual trick into something you can reuse, adapt, and build on.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let’s Get Puzzled!",
  "desc": "We can make puzzle pieces in CSS thanks to the amazing clip-path: shape(). Here, Amit takes it further by making a whole grid of them with matched edges and content inside.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/creating-puzzle-peices-in-css.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
