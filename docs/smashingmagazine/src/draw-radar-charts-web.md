---
lang: en-US
title: "How To Draw Radar Charts In Web"
description: "Article(s) > How To Draw Radar Charts In Web"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How To Draw Radar Charts In Web"
    - property: og:description
      content: "How To Draw Radar Charts In Web"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/draw-radar-charts-web.html
prev: /programming/css/articles/README.md
date: 2024-02-09
isOriginal: false
author:
  - name: Preethi Sam
    url: https://smashingmagazine.com/author/preethi-sam/
cover: https://files.smashing.media/articles/draw-radar-charts-web/draw-radar-charts-web.jpg
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
  name="How To Draw Radar Charts In Web"
  desc="A radar chart — also commonly called a spider chart — is yet another way to visualize data and make connections. Radar charts are inherently geometric, making them both a perfect fit and fun to make with CSS, thanks to the `polygon()` function. Read along as Preethi Sam demonstrates the process and sprinkles it with a pinch of JavaScript to make a handy, reusable component."
  url="https://smashingmagazine.com/2024/02/draw-radar-charts-web/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/draw-radar-charts-web/draw-radar-charts-web.jpg"/>

A radar chart — also commonly called a spider chart — is yet another way to visualize data and make connections. Radar charts are inherently geometric, making them both a perfect fit and fun to make with CSS, thanks to the `polygon()` function. Read along as Preethi Sam demonstrates the process and sprinkles it with a pinch of JavaScript to make a handy, reusable component.

I got to work with a new type of chart for data visualization called a **radar chart** when a project asked for it. It was new to me, but the idea is that there is a circular, two-dimensional circle with plots going around the chart. Rather than simple X and Y axes, each plot on a radar chart is its own axis, marking a spot between the outer edge of the circle and the very center of it. The plots represent some sort of category, and when connecting them together, they are like vertices that form shapes to help see the relationship of category values, not totally unlike the vectors in an SVG.

![Supercapacitor comparison chart. (Image source: [<VPIcon icon="fas fa-globe"/>NASA](https://nasa.gov/wp-content/uploads/2021/10/figure3.7-soa2022.png)) ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/draw-radar-charts-web/1-supercapacitor-comparison-chart.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/draw-radar-charts-web/1-supercapacitor-comparison-chart.png)

Sometimes, the radar chart is called a **spider chart**, and it’s easy to see why. The axes that flow outward intersect with the connected plots and form a web-like appearance. So, if your [<VPIcon icon="fas fa-globe"/>Spidey senses](https://urbandictionary.com/define.php?term=Spidey%20sense) were tingling at first glance, you know why.

You already know where we’re going with this: **We’re going to build a radar chart together!** We’ll work from scratch with nothing but HTML, CSS, and JavaScript. But before we go there, it’s worth noting a couple of things about radar charts.

First, you don’t *have* to build them from scratch. [<VPIcon icon="fas fa-globe"/>Chart.js](https://chartjs.org/docs/latest/samples/other-charts/radar.html) and [<VPIcon icon="fas fa-globe"/>D3.js](https://d3-graph-gallery.com/spider) are readily available with convenient approaches that greatly simplify the process. Seeing as I needed just one chart for the project, I decided against using a library and took on the challenge of making it myself. I learned something new, and hopefully, you do as well!

Second, there are [<VPIcon icon="fas fa-globe"/>caveats to using radar charts](https://data-to-viz.com/caveat/spider.html) for data visualization. While they are indeed effective, they can also be difficult to read when multiple series stack up. The relationships between plots are not nearly as decipherable as, say, bar charts. The order of the categories around the circle affects the overall shape, and the scale between series has to be consistent for drawing conclusions.

That all said, let’s dive in and get our hands sticky with data plots.

---

## The Components

The thing I like immediately about radar charts is that they are inherently geometrical. Connecting plots produces a series of angles that form polygon shapes. The sides are straight lines. And CSS is absolutely wonderful for working with polygons given that we have the [**CSS `polygon()` function**](/web.dev/hapes-getting-started.md#the_polygon_function) for drawing them by declaring as many points as we need in the function’s arguments.

We will start with a pentagonal-shaped chart with five data categories.

<CodePen
  user="smashingmag"
  slug-hash="abMaEyo"
  title="Radar chart (Pentagon) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

There are **three components** we need to establish in HTML before we work on styling. Those would be:

1. **Grids**: These provide the axes over which the diagrams are drawn. It’s the spider web of the bunch.
2. **Graphs**: These are the polygons we draw with the coordinates of each data plot before coloring them in.
3. **Labels**: The text that identifies the categories along the graphs’ axes.

Here’s how I decided to stub that out in HTML:

```html
<!-- GRIDS -->
<div class="wrapper">
  <div class="grids polygons">
    <div></div>
  </div>
  <div class="grids polygons">
    <div></div>
  </div>
  <div class="grids polygons">
    <div></div>
  </div>
</div>

<!-- GRAPHS -->
<div class="wrapper">
  <div class="graphs polygons">
    <div><!-- Set 1 --></div>
  </div>
  <div class="graphs polygons">
    <div><!-- Set 2 --></div>
  </div>
  <div class="graphs polygons">
    <div><!-- Set 3 --></div>
  </div>
  <!-- etc. -->
</div>

<!-- LABELS -->
<div class="wrapper">
  <div class="labels">Data A</div>
  <div class="labels">Data B</div>
  <div class="labels">Data C</div>
  <div class="labels">Data D</div>
  <div class="labels">Data E</div>
  <!-- etc. -->
</div>
```

I’m sure you can read the markup and see what’s going on, but we’ve got three parent elements (`.wrapper`) that each holds one of the main components. The first parent contains the `.grids`, the second parent contains the `.graphs`, and the third parent contains the `.labels`.

---

## Base Styles

We’ll start by setting up a few color variables we can use to fill things in as we go:

```css
:root {
  --color1: rgba(78, 36, 221, 0.6); /* graph set 1 */
  --color2: rgba(236, 19, 154, 0.6); /* graph set 2 */
  --color3: rgba(156, 4, 223, 0.6); /* graph set 3 */
  --colorS: rgba(255, 0, 95, 0.1); /* graph shadow */
}
```

Our next order of business is to establish the layout. CSS Grid is a solid approach for this because we can place all three grid items together on the grid in just a couple of lines:

```css
/* Parent container */
.wrapper { display: grid; }

/* Placing elements on the grid */
.wrapper > div {
  grid-area: 1 / 1; /* There's only one grid area to cover */
}
```

Let’s go ahead and set a size on the grid items. I’m using a fixed length value of `300px`, but you can use any value you need and variablize it if you plan on using it in other places. And rather than declaring an explicit height, let’s put the burden of calculating a height on CSS using `aspect-ratio` to form perfect squares.

```css
/* Placing elements on the grid */
.wrapper div {
  aspect-ratio: 1 / 1;
  grid-area: 1 / 1;
  width: 300px;
}
```

We can’t see anything just yet. We’ll need to color things in:

```css :collapsed-lines
/* ----------
Graphs
---------- */
.graphs:nth-of-type(1) > div { background: var(--color1); }
.graphs:nth-of-type(2) > div { background: var(--color2); }
.graphs:nth-of-type(3) > div { background: var(--color3); }

.graphs {
  filter: 
    drop-shadow(1px 1px 10px var(--colorS))
    drop-shadow(-1px -1px 10px var(--colorS))
    drop-shadow(-1px 1px 10px var(--colorS))
    drop-shadow(1px -1px 10px var(--colorS));
}

/* --------------
Grids 
-------------- */
.grids {
  filter: 
    drop-shadow(1px 1px 1px #ddd)
    drop-shadow(-1px -1px 1px #ddd)
    drop-shadow(-1px 1px 1px #ddd)
    drop-shadow(1px -1px 1px #ddd);
    mix-blend-mode: multiply;
}

.grids > div { background: white; }
```

Oh, wait! We need to set widths on the grids and polygons for them to take shape:

```css
.grids:nth-of-type(2) { width: 66%; }
.grids:nth-of-type(3) { width: 33%; }

/* --------------
Polygons 
-------------- */
.polygons { place-self: center; }
.polygons > div { width: 100%; }
```

Since we’re already here, I’m going to position the labels a smidge and give them width:

```css
/* --------------
Labels
-------------- */
.labels:first-of-type { inset-block-sptart: -10%; }

.labels {
  height: 1lh;
  position: relative;
  width: max-content;
}
```

We still can’t see what’s going on, but we can if we temporarily draw borders around elements.

<CodePen
  user="smashingmag"
  slug-hash="QWoVamB"
  title="Radar chart layout [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

All combined, it doesn’t look all that great so far. Basically, we have a series of overlapping grids followed by perfectly square graphs stacked right on top of one another. The labels are off in the corner as well. We haven’t drawn anything yet, so this doesn’t bother me for now because we have the HTML elements we need, and CSS is technically establishing a layout that should come together as we start plotting points and drawing polygons.

More specifically:

- The `.wrapper` elements are displayed as CSS Grid containers.
- The direct children of the `.wrapper` elements are `div`s placed in the exact same `grid-area`. This is causing them to stack one right on top of the other.
- The `.polygons` are centered (`place-self: center`).
- The child `div`s in the `.polygons` take up the full width (`width:100%`).
- Every single `div` is `300px` wide and squared off with a one-to-one `aspect-ratio`.
- We’re explicitly declaring a relative position on the `.labels`. This way, they can be automatically positioned when we start working in JavaScript.

The rest? Simply apply some colors as backgrounds and drop shadows.

---

## Calculating Plot Coordinates

Don’t worry. We are not getting into a deep dive about polygon geometry. Instead, let’s take a quick look at the equations we’re using to calculate the coordinates of each polygon’s vertices. You don’t have to know these equations to use the code we’re going to write, but it never hurts to peek under the hood to see how it comes together.

```plaintext
x1 = x + cosθ1 = cosθ1 if x=0
y1 = y + sinθ1 = sinθ1 if y=0
x2 = x + cosθ2 = cosθ2 if x=0
y2 = y + sinθ2 = sinθ2 if y=0
etc.

x, y = center of the polygon (assigned (0, 0) in our examples)

x1, x2… = x coordinates of each vertex (vertex 1, 2, and so on)
y1, y2… = y coordinates of each vertex
θ1, θ2… = angle each vertex makes to the x-axis
```

We can assume that 𝜃 **is** `90deg` (i.e., `𝜋/2`) since a vertex can always be placed right above or below the center (i.e., *Data A* in this example). The rest of the angles can be calculated like this:

```plaintext
n = number of sides of the polygon

𝜃1 = 𝜃0 + 2𝜋/𝑛 = 𝜋/2 + 2𝜋/𝑛
𝜃2 = 𝜃0 + 4𝜋/𝑛 = 𝜋/2 + 4𝜋/𝑛
𝜃3 = 𝜃0 + 6𝜋/𝑛 = 𝜋/2 + 6𝜋/𝑛
𝜃3 = 𝜃0 + 8𝜋/𝑛 = 𝜋/2 + 8𝜋/𝑛
𝜃3 = 𝜃0 + 10𝜋/𝑛 = 𝜋/2 + 10𝜋/𝑛
```

Armed with this context, we can solve for our `x` and `y` values:

```plaintext
x1 = cos(𝜋/2 + 2𝜋/# sides)
y1 = sin(𝜋/2 + 2𝜋/# sides)
x2 = cos(𝜋/2 + 4𝜋/# sides)
y2 = sin(𝜋/2 + 4𝜋/# sides)
etc.
```

The number of sides depends on the number of plots we need. We said up-front that this is a pentagonal shape, so we’re working with five sides in this particular example.

```plaintext
x1 = cos(𝜋/2 + 2𝜋/5)
y1 = sin(𝜋/2 + 2𝜋/5)
x2 = cos(𝜋/2 + 4𝜋/5)
y2 = sin(𝜋/2 + 4𝜋/5)
etc.
```

---

## Drawing Polygons With JavaScript

Now that the math is accounted for, we have what we need to start working in JavaScript for the sake of plotting the coordinates, connecting them together, and painting in the resulting polygons.

For simplicity’s sake, we will leave the [<VPIcon icon="fa-brands fa-firefox"/>Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) out of this and instead use regular HTML elements to draw the chart. You can, however, use the math outlined above and the following logic as the foundation for drawing polygons in whichever language, framework, or API you prefer.

OK, so we have three types of components to work on: grids, graphs, and labels. We start with the grid and work up from there. In each case, I’ll simply drop in the code and explain what’s happening.

### Drawing The Grid

```js
// Variables
let sides = 5; // # of data points
let units = 1; // # of graphs + 1
let vertices = (new Array(units)).fill(""); 
let percents = new Array(units);
percents[0] = (new Array(sides)).fill(100); // for the polygon's grid component
let gradient = "conic-gradient(";
let angle = 360/sides;

// Calculate vertices
with(Math) { 
  for(i=0, n = 2 * PI; i < sides; i++, n += 2 * PI) {
    for(j=0; j < units; j++) {
      let x = ( round(cos(-1 * PI/2 + n/sides) * percents[j][i]) + 100 ) / 2; 
      let y = ( round(sin(-1 * PI/2 + n/sides) * percents[j][i]) + 100 ) / 2; 
      vertices[j] += `${x}% ${y} ${i == sides - 1 ? '%':'%, '}`;
  }
  gradient += `white ${
    (angle * (i+1)) - 1}deg,
    #ddd ${ (angle * (i+1)) - 1 }deg,
    #ddd ${ (angle * (i+1)) + 1 }deg,
    white ${ (angle * (i+1)) + 1 }deg,
  `;}
}

// Draw the grids
document.querySelectorAll('.grids>div').forEach((grid,i) => {
  grid.style.clipPath =`polygon(${ vertices[0] })`;
});
document.querySelector('.grids:nth-of-type(1) > div').style.background =`${gradient.slice(0, -1)} )`;
```

Check it out! We already have a spider web.

<CodePen
  user="smashingmag"
  slug-hash="poYOpOG"
  title="Radar chart (Grid) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s what’s happening in the code:

1. `sides` is the number of sides of the chart. Again, we’re working with five sides.
2. `vertices` is an array that stores the coordinates of each vertex.
3. Since we are not constructing any graphs yet — only the grid — the number of `units` is set to `1`, and only one item is added to the `percents` array at `percents[0]`. For grid polygons, the data values are `100`.
4. `gradient` is a string to construct the `conic-gradient()` that establishes the grid lines.
5. `angle` is a calculation of `360deg` divided by the total number of `sides`.

From there, we calculate the vertices:

1. `i` is an iterator that cycles through the total number of `sides` (i.e., `5`).
2. `j` is an iterator that cycles through the total number of `units` (i.e., `1`).
3. `n` is a counter that counts in increments of `2*PI` (i.e., `2𝜋`, `4𝜋`, `6𝜋`, and so on).

The `x` and `y` values of each vertex are calculated as follows, based on the geometric equations we discussed earlier. Note that we multiply `𝜋` by `-1` to steer the rotation.

```js
cos(-1 * PI/2 + n/sides) // cos(𝜋/2 + 2𝜋/sides), cos(𝜋/2 + 4𝜋/sides)...
sin(-1 * PI/2 + n/sides) // sin(𝜋/2 + 2𝜋/sides), sin(𝜋/2 + 4𝜋/sides)...
```

We convert the `x` and `y` values into percentages (since that is how the data points are formatted) and then place them on the chart.

```js
let x = (round(cos(-1 * PI/2 + n/sides) * percents[j][i]) + 100) / 2;
let y = (round(sin(-1 * PI/2 + n/sides) * percents[j][i]) + 100) / 2;
```

We also construct the `conic-gradient(),` which is part of the grid. Each color stop corresponds to each vertex’s angle — at each of the angle increments, a grey (`#ddd`) line is drawn.

```js
gradient += 
  `white ${ (angle * (i+1)) - 1 }deg,
   #ddd ${ (angle * (i+1)) - 1 }deg,
   #ddd ${ (angle * (i+1)) + 1 }deg,
   white ${ (angle * (i+1)) + 1 }deg,`
```

If we print out the computed variables after the `for` loop, these will be the results for the grid’s `vertices` and `gradient`:

```js
console.log(`polygon( ${vertices[0]} )`); /* grid’s polygon */
// polygon(97.5% 34.5%, 79.5% 90.5%, 20.5% 90.5%, 2.5% 34.5%, 50% 0%)

console.log(gradient.slice(0, -1)); /* grid’s gradient */
// conic-gradient(white 71deg, #ddd 71deg,# ddd 73deg, white 73deg, white 143deg, #ddd 143deg, #ddd 145deg, white 145deg, white 215deg, #ddd 215deg, #ddd 217deg, white 217deg, white 287deg, #ddd 287deg, #ddd 289deg, white 289deg, white 359deg, #ddd 359deg, #ddd 361deg, white 361deg
```

These values are assigned to the grid’s `clipPath` and `background`, respectively, and thus the grid appears on the page.

### The Graph

```js
// Following the other variable declarations 
// Each graph's data points in the order [B, C, D... A] 
percents[1] = [100, 50, 60, 50, 90]; 
percents[2] = [100, 80, 30, 90, 40];
percents[3] = [100, 10, 60, 60, 80];

// Next to drawing grids
document.querySelectorAll('.graphs > div').forEach((graph,i) => {
  graph.style.clipPath =`polygon( ${vertices[i+1]} )`;
});
```

<CodePen
  user="smashingmag"
  slug-hash="KKExZYE"
  title="Radar chart (Graph) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Now it looks like we’re getting somewhere! For each graph, we add its set of data points to the `percents` array after incrementing the value of `units` to match the number of graphs. And that’s all we need to draw graphs on the chart. Let’s turn our attention to the labels for the moment.

### The Labels

```js
// Positioning labels

// First label is always set in the top middle
let firstLabel = document.querySelector('.labels:first-of-type');
firstLabel.style.insetInlineStart =`calc(50% - ${firstLabel.offsetWidth / 2}px)`;

// Setting labels for the rest of the vertices (data points). 
let v = Array.from(vertices[0].split(' ').splice(0, (2 * sides) - 2), (n)=> parseInt(n)); 

document.querySelectorAll('.labels:not(:first-of-type)').forEach((label, i) => {
  let width = label.offsetWidth / 2; 
  let height = label.offsetHeight;
  label.style.insetInlineStart = `calc( ${ v[i*2] }% + ${ v[i*2] < 50 ? - 3*width : v[i*2] == 50 ? - width: width}px )`;
  label.style.insetBlockStart = `calc( ${ v[(i*2) + 1] }% - ${ v[(i * 2) + 1] == 100 ? - height: height / 2 }px )`;
});
```

The positioning of the labels is determined by three things:

1. The coordinates of the vertices (i.e., data points) they should be next to,
2. The width and height of their text, and
3. Any blank space needed around the labels so they don’t overlap the chart.

All the labels are positioned `relative` in CSS. By adding the `inset-inline-start` and `inset-block-start` values in the script, we can reposition the labels using the values as coordinates. The first label is always set to the top-middle position. The coordinates for the rest of the labels are the same as their respective vertices, plus an offset. The offset is determined like this:

#### 1. x-axis/horizontal

If the label is at the left (i.e., `x` is less than `50%`), then it’s moved towards the left based on its `width.` Otherwise, it’s moved towards the right side. As such, the right or left edges of the labels, depending on which side of the chart they are on, are uniformly aligned to their vertices.

#### 2. y-axis/vertical

The height of each label is fixed. There’s not much offset to add except maybe moving them down half their height. Any label at the bottom (i.e., when `y` is 100%), however, could use additional space above it for breathing room.

And guess what…

---

## We’re Done!

<CodePen
  user="smashingmag"
  slug-hash="XWGPVLJ"
  title="Radar chart (Pentagon) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Not too shabby, right? The most complicated part, I think, is the math. But since we have that figured out, we can practically plug it into any other situation where a radar chart is needed. Need a four-point chart instead? Update the number of vertices in the script and account for fewer elements in the markup and styles.

In fact, here are two more examples showing different configurations. In each case, I’m merely increasing or decreasing the number of vertices, which the script uses to produce different sets of coordinates that help position points along the grid.

Need just three sides? All that means is two fewer coordinate sets:

<CodePen
  user="smashingmag"
  slug-hash="vYPzpqJ"
  title="Radar chart (Triangle) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Need seven sides? We’ll produce more coordinate sets instead:

<CodePen
  user="smashingmag"
  slug-hash="WNmgdqY"
  title="Radar chart (Heptagon) [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How To Draw Radar Charts In Web",
  "desc": "A radar chart — also commonly called a spider chart — is yet another way to visualize data and make connections. Radar charts are inherently geometric, making them both a perfect fit and fun to make with CSS, thanks to the `polygon()` function. Read along as Preethi Sam demonstrates the process and sprinkles it with a pinch of JavaScript to make a handy, reusable component.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/draw-radar-charts-web.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
