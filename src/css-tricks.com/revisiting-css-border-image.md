---
lang: en-US
title: "Revisiting CSS border-image"
description: "Article(s) > Revisiting CSS border-image"
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
      content: "Article(s) > Revisiting CSS border-image"
    - property: og:description
      content: "Revisiting CSS border-image"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/revisiting-css-border-image.html
prev: /programming/css/articles/README.md
date: 2025-03-21
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/border-image-menu.png
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
  name="Revisiting CSS border-image"
  desc="I’ve used border-image regularly. Yet, it remains one of the most underused CSS tools, and I can’t, for the life of me, figure out why. Is it possible that people steer clear of border-image because its syntax is awkward and unintuitive? Perhaps it’s because most explanations don’t solve the type of creative implementation problems that most people need to solve. Most likely, it’s both."
  url="https://css-tricks.com/revisiting-css-border-image"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/border-image-menu.png"/>

In my last article on [**“Revisiting CSS Multi-Column Layout”**](/css-tricks.com/revisiting-css-multi-column-layout.md), I mentioned that almost twenty years have flown by since I wrote my first book, *Transcending CSS*. In it, I explained how and why to use what were, at the time, an emerging CSS property.

Ten years later, I wrote the [<VPIcon icon="fas fa-globe"/>*Hardboiled Web Design Fifth Anniversary Edition*](https://stuffandnonsense.co.uk/hardboiled-web-design), covering similar ground and introducing the new CSS `border-image` property.

::: tip Hint

I published an updated version, *[<VPIcon icon="fas fa-globe"/>Transcending CSS Revisited](https://stuffandnonsense.co.uk/transcending-css-revisited/index.html)* which is free to read online. Hardboiled Web Design is available from [<VPIcon icon="fas fa-globe"/>my bookshop](https://stuffandnonsense.co.uk/books).

:::

I was very excited about the possibilities this new property would offer. After all, we could now add images to the borders of any element, even table cells and rows (unless their borders had been set to collapse).

Since then, I’ve used `border-image` regularly. Yet, it remains one of the most underused CSS tools, and I can’t, for the life of me, figure out why. Is it possible that people steer clear of `border-image` because its syntax is awkward and unintuitive? Perhaps it’s because most explanations don’t solve the type of creative implementation problems that most people need to solve. Most likely, it’s both.

I’ve recently been working on a new website for Emmy-award-winning game composer Mike Worth. He hired me to create a highly graphical design that showcases his work, and I used `border-image` throughout.

![Design by [<VPIcon icon="fas fa-globe"/>Andy Clarke, Stuff & Nonsense](https://stuffandnonsense.co.uk). Mike Worth’s website will launch in April 2025, but you can [<VPIcon icon="fa-brands fa-codepen"/>see examples from this article on CodePen](https://codepen.io/collection/QbWmYL).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741264165055_2025-03-1-scaled.webp?resize=2560%2C1758&ssl=1)

---

## A brief overview of properties and values

First, here’s a short refresher. Most `border-image` explanations begin with this highly illuminating code snippet:

```css
border-image: [source] [slice]/[width]/[outset] [repeat]
```

This is shorthand for a set of `border-image` properties, but it’s best to deal with properties individually to grasp the concept more easily.

---

## A `border-image`’s source

I’ll start with the source of the bitmap or vector format image or CSS gradient to be inserted into the border space:

```css
border-image-source: url('/img/scroll.png');
```

When I insert SVG images into a border, I have several choices as to how. I could use an external SVG file:

```css
border-image-source: url('/img/scroll.svg');
```

Or I might convert my SVG to data URI using a tool like [<VPIcon icon="fas fa-globe"/>Base64.Guru](https://base64.guru/converter/encode/image/svg) although, as both SVG and HTML are XML-based, [**this isn’t recommended**](/css-tricks.com/probably-dont-base64-svg.md):

```css
border-image-source: url('data:image/svg+xml;base64,…');
```

Instead, I can add the SVG code directly into the source URL value and save one unnecessary HTTP request:

```css
border-image-source: url('data:image/svg+xml;utf8,…');
```

Finally, I could insert an entirely CSS-generated conical, linear, or radial gradient into my border:

```css
border-image-source: conical-gradient(…);
```

::: tip

It’s useful to remember that a browser renders a `border-image` above an element’s background and `box-shadow` but below its content. More on that a little later.

:::

---

## Slicing up a `border-image`

Now that I’ve specified the source of a border image, I can apply it to a border by slicing it up and using the parts in different positions around an element. This can be the most baffling aspect for people new to `border-image`.

Most `border-image` explanations show an example where the pieces will simply be equally-sized, like this:

![Showing nine star shapes in the same images displayed as a three-by-three grid.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741264637220_2025-03-2-1024x293.webp?resize=1024%2C293&ssl=1)

However, a `border-image` can be developed from any shape, no matter how complex or irregular.

Instead of simply inserting an image into a border and watching it repeat around an element, invisible cut-lines slice up a `border-image` into nine parts. These lines are similar to the slice guides found in graphics applications. The pieces are, in turn, inserted into the nine regions of an element’s border.

![Dissecting the top, right, bottom, and left slices of a border image.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741264662803_2025-03-3-scaled.webp?resize=2560%2C768&ssl=1)

The `border-image-slice` property defines the size of each slice by specifying the distance from each edge of the image. I could use the same distance from every edge:

```css
border-image-slice: 65
```

I can combine top/bottom and left/right values:

```css
border-image-slice: 115 65;
```

Or, I can specify distance values for all four cut-lines, running clockwise: top, right, bottom, left:

```css
border-image-slice: 65 65 115 125;
```

The top-left of an image will be used on the top-left corner of an element’s border. The bottom-right will be used on the bottom-right, and so on.

![Diagram of the nine border image slices.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741264758550_2025-03-4-scaled.webp?resize=2560%2C1273&ssl=1)

I don’t need to add units to `border-image-slice` values when using a bitmap image as the browser correctly assumes bitmaps use pixels. The SVG `viewBox` makes using them a little different, so I also prefer to specify their `height` and `width`:

```xml
<svg height="600px" width="600px">…</svg>
```

Don’t forget to set the widths of these borders, as without them, there will be nowhere for a border’s image to display:

```css
border-image-width: 65px 65px 115px 125px;
```

---

## Filling in the center

So far, I’ve used all four corners and sides of my image, but what about the center? By default, the browser will ignore the center of an image after it’s been sliced. But I can put it to use by adding the `fill` keyword to my `border-image-slice` value:

```css
border-image-slice: 65px 65px 115px 125px fill;
```

---

## Setting up repeats

With the corners of my border images in place, I can turn my attention to the edges between them. As you might imagine, the slice at the top of an image will be placed on the top edge. The same is true of the right, bottom, and left edges. In a flexible design, we never know how wide or tall these edges will be, so I can fine-tune how images will repeat or stretch when they fill an edge.

![Showing the same image four times, once per type of repeat, including stretch, repeat, round, and space.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741264943610_2025-03-5-scaled.webp?resize=2560%2C869&ssl=1)

### `stretch`

When a sliced image is flat or smooth, it can stretch to fill any height or width. Even a tiny `65px` slice can stretch to hundreds or thousands of pixels without degrading.

```css
border-image-repeat: stretch;
```

### `repeat`

If an image has texture, stretching it isn’t an option, so it can repeat to fill any height or width.

```css
border-image-repeat: repeat;
```

### `round`

If an image has a pattern or shape that can’t be stretched and I need to match the edges of the repeat, I can specify that the repeat be `round`. A browser will resize the image so that only whole pieces display inside an edge.

```css
border-image-repeat: round;
```

### `sace`

Similar to `round`, when using the space property, only whole pieces will display inside an edge. But instead of resizing the image, a browser will add spaces into the repeat.

```css
border-image-repeat: space;
```

When I need to specify a separate `stretch`, `repeat`, `round`, or `space` value for each edge, I can use multiple keywords:

```css
border-image-repeat: stretch round;
```

---

## Outsetting a `border-image`

There can be times when I need an image to extend beyond an element’s `border-box`. Using the `border-image-outset` property, I can do just that. The simplest syntax extends the border image evenly on all sides by `10px`:

```css
border-image-outset: 10px;
```

Of course, there being four borders on every element, I could also specify each outset individually:

```css
border-image-outset: 20px 10px; 
/* or */
border-image-outset: 20px 10px 0;
```

---

## `border-image` in action

Mike Worth is a video game composer who’s won an Emmy for his work. He loves ’90s animation — especially Disney’s *Duck Tales* — and he asked me to create custom artwork and develop a bold, retro-style design.

![Four examples of page layouts, including the main menu, a default page, message received confirmation, and a 404 page, all featuring bold cartoon illustrations reminiscent of nineties Disney cartoons.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741265156777_2025-03-6-scaled.webp?resize=2560%2C1758&ssl=1)

My challenge when developing for Mike was implementing my highly graphical design without compromising performance, especially on mobile devices. While it’s normal in CSS to accomplish the same goal in several ways, here, `border-image` often proved to be the most efficient.

---

## Decorative buttons

The easiest and most obvious place to start was creating buttons reminiscent of stone tablets with chipped and uneven edges.

![Illustration of chipped and zagged edges spliced up for border-image.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741265262847_2025-03-7-scaled.webp?resize=2560%2C549&ssl=1)

I created an SVG of the tablet shape and added it to my buttons using `border-image`:

```css
button {
  border-image-repeat: stretch;
  border-image-slice: 10 10 10 10 fill;
  border-image-source: url('data:image/svg+xml;utf8,…');
  border-image-width: 20px;
}
```

I set the `border-image-repeat` on all edges to `stretch` and the center slice to `fill` so these stone tablet-style buttons expand along with their content to any height or width.

<CodePen
  user="malarkey"
  slug-hash="xbxdoBO"
  title="Button with SVG border-image"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Article scroll

I want every aspect of Mike’s website design to express his brand. That means continuing the ’90s cartoon theme in his long-form content by turning it into a paper scroll.

![Page layout of a paper scroll with jagged edges on the sides and rolled paper on the top and bottom.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741270707387_2025-03-8.webp?resize=1600%2C1080&ssl=1)

The markup is straightforward with just a single `article` element:

```html
<article>
  <!-- ... -->
</article>
```

But, I struggled to decide how to implement the paper effect. My first thought was to divide my scroll into three separate SVG files (top, middle, and bottom) and use pseudo-elements to add the rolled up top and bottom parts of the scroll. I started by applying a vertically repeating graphic to the middle of my article:

```css
article {
  padding: 10rem 8rem;
  box-sizing: border-box;
  /* Scroll middle */
  background-image: url('data:image/svg+xml;utf8,…');
  background-position: center;
  background-repeat: repeat-y;
  background-size: contain;
}
```

Then, I added two pseudo-elements, each containing its own SVG content:

```css
article:before {
  display: block;
  position: relative;
  top: -30px;
  /* Scroll top */
  content: url('data:image/svg+xml;utf8,…');
}

article:after {
  display: block;
  position: relative;
  top: 50px;
  /* Scroll bottom */
  content: url('data:image/svg+xml;utf8,…');
}
```

While this implementation worked as expected, using two pseudo-elements and three separate SVG files felt clumsy. However, using `border-image`, one SVG, and no pseudo-elements feels more elegant and significantly reduces the amount of code needed to implement the effect.

I started by creating an SVG of the complete tablet shape:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741270415707_2025-03-9-scaled.webp?resize=2560%2C1099&ssl=1)

And I worked out the position of the four cut-lines:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741270432341_2025-03-10-scaled.webp?resize=2560%2C1371&ssl=1)

Then, I inserted this single SVG into my article’s border by first selecting the source, slicing the image, and setting the top and bottom edges to `stretch` and the left and right edges to `round`:

```css
article {
  border-image-slice: 150 95 150 95 fill;
  border-image-width: 150px 95px 150px 95px;
  border-image-repeat: stretch round;
  border-image-source: url('data:image/svg+xml;utf8,…');
}
```

The result is a flexible paper scroll effect which adapts to both the viewport width and any amount or type of content.

<CodePen
  user="malarkey"
  slug-hash="GgRmVpG"
  title="Article scroll with border-image"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Home page overlay

My final challenge was implementing the action-packed graphic I’d designed for Mike Worth’s home page. This contains a foreground SVG featuring Mike’s orangutan mascot and a zooming background graphic:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/03/s_377CE240D976C6DDFB6EFE1CAF71CAFBFAB7A0478263FF31ED4E15630F1E0AE6_1741270949769_2025-03-11.webp?resize=1600%2C1080&ssl=1)

```html
<section>
  <!-- content -->
  <div>...</div>

  <!-- ape -->
  <div>
    <svg>…</svg>
  </div>
</section>
```

I defined the `section` as a positioning context for its children:

```css
section {
  position: relative;
}
```

Then, I absolutely positioned a pseudo-element and added the zooming graphic to its background:

```css
section:before {
  content: "";
  position: absolute;
  z-index: -1;
  background-image: url('data:image/svg+xml;utf8,…');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
}
```

I wanted this graphic to spin and add subtle movement to the panel, so I applied a simple CSS animation to the pseudo-element:

```css
@keyframes spin-bg {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

section:before {
  animation: spin-bg 240s linear infinite;
}
```

Next, I added a CSS mask to fade the edges of the zooming graphic into the background. The CSS `mask-image` property specifies a mask layer image, which can be a PNG image, an SVG image or mask, or a CSS gradient:

```css
section:before {
  mask-image: radial-gradient(circle, rgb(0 0 0) 0%, rgb(0 0 0 / 0) 60%);
  mask-repeat: no-repeat;
}
```

At this point, you might wonder where a border image could be used in this design. To add more interactivity to the graphic, I wanted to reduce its `opacity` and change its color — by adding a colored gradient overlay — when someone interacts with it. One of the simplest, but rarely-used, methods for applying an overlay to an element is using `border-image`. First, I added a default `opacity` and added a brief `transition`:

```css
section:before {
  opacity: 1;
  transition: opacity .25s ease-in-out;
}
```

Then, on hover, I reduced the `opacity` to `.5` and added a `border-image`:

```css
section:hover::before {
  opacity: .5;
  border-image: fill 0 linear-gradient(rgba(0,0,255,.25),rgba(255,0,0,1));
}
```

You may ponder why I’ve not used the other `border-image` values I explained earlier, so I’ll dissect that declaration. First is the `border-image-slice` value, where zero pixels ensures that the eight corners and edges stay empty. The `fill` keyword ensures the middle section is filled with the linear gradient. Second, the `border-image-source` is a CSS linear gradient that blends blue into red. A browser renders this `border-image` above the background but behind the content.

<CodePen
  user="malarkey"
  slug-hash="bNGWXqJ"
  title="Illustration with border-image overlay"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Conclusion: You should take a fresh look at `border-image`

The `border-image` property is a powerful, yet often overlooked, CSS tool that offers incredible flexibility. By slicing, repeating, and outsetting images, you can create intricate borders, decorative elements, and even dynamic overlays with minimal code.

In my work for Mike Worth’s website, `border-image` proved invaluable, improving performance while maintaining a highly graphical aesthetic. Whether used for buttons, interactive overlays, or larger graphic elements, `border-image` can create visually striking designs without relying on extra markup or multiple assets.

If you’ve yet to experiment with `border-image`, now’s the time to revisit its potential and add it to your design toolkit.

::: tip Hint

Mike Worth’s website will launch in April 2025, but you can see [<VPIcon icon="fa-brands fa-codepen"/>examples from this article on CodePen](https://codepen.io/collection/QbWmYL).

:::

::: info About Andy Clarke

Often referred to as one of the pioneers of web design, [<VPIcon icon="fas fa-globe"/>Andy Clarke](https://stuffandnonsense.co.uk/) has been instrumental in pushing the boundaries of web design and is known for his creative and visually stunning designs. His work has inspired countless designers to explore the full potential of product and website design.

Andy’s written several industry-leading books, including *Transcending CSS*, *Hardboiled Web Design*, and *Art Direction for the Web*. He’s also worked with businesses of all sizes and industries to achieve their goals through design.

Visit Andy’s studio, [<VPIcon icon="fas fa-globe"/>Stuff & Nonsense](https://stuffandnonsense.co.uk/), and check out his [<VPIcon icon="fas fa-globe"/>Contract Killer](https://stuffandnonsense.co.uk/projects/contract-killer), the popular web design contract template trusted by thousands of web designers and developers.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Revisiting CSS border-image",
  "desc": "I’ve used border-image regularly. Yet, it remains one of the most underused CSS tools, and I can’t, for the life of me, figure out why. Is it possible that people steer clear of border-image because its syntax is awkward and unintuitive? Perhaps it’s because most explanations don’t solve the type of creative implementation problems that most people need to solve. Most likely, it’s both.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/revisiting-css-border-image.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
