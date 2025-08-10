---
lang: en-US
title: "Getting Creative With Versal Letters"
description: "Article(s) > Getting Creative With Versal Letters"
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
      content: "Article(s) > Getting Creative With Versal Letters"
    - property: og:description
      content: "Getting Creative With Versal Letters"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-versal-letters.html
prev: /programming/css/articles/README.md
date: 2025-07-18
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-featured.webp
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
  name="Getting Creative With Versal Letters"
  desc="A versal letters is a typographic flourish found in illuminated manuscripts and traditional book design, where it adds visual interest and helps guide a reader’s eye to where they should begin."
  url="https://css-tricks.com/getting-creative-with-versal-letters"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-featured.webp"/>

A while back, our man [<FontIcon icon="iconfont icon-css-tricks"/>Geoff Graham](https://css-tricks.com/author/geoffgraham/) treated us to a refresher on the CSS [<FontIcon icon="iconfont icon-css-tricks"/>`initial-letter`](https://css-tricks.com/almanac/properties/i/initial-letter/) property, but how can you style drop and initial caps to reflect a brand’s visual identity and help to tell its stories?

Here’s how I do it in CSS by combining [<FontIcon icon="iconfont icon-css-tricks"/>`::first-letter`](https://css-tricks.com/almanac/pseudo-selectors/f/first-letter/) and `initial-letter` with other unexpected properties, including [<FontIcon icon="iconfont icon-css-tricks"/>`border-image`](https://css-tricks.com/almanac/properties/b/border-image/), and [<FontIcon icon="iconfont icon-css-tricks"/>`clip-path`](https://css-tricks.com/almanac/properties/c/clip-path/).

![Patty Meltt is an up-and-coming country music sensation.](https://css-tricks.com/wp-content/uploads/2025/07/versal-01.svg)

::: note My brief

Patty Meltt is an up-and-coming country music sensation, and she needed a website to launch her new album. She wanted it to be distinctive-looking and memorable, so she called [<FontIcon icon="fas fa-globe"/>Stuff & Nonsense](https://stuffandnonsense.co.uk). Patty’s not real, but the challenges of designing and developing sites like hers are.

:::

First, a drop cap recap. [<FontIcon icon="iconfont icon-css-tricks"/>Chris Coyier wrote about drop caps](https://css-tricks.com/snippets/css/drop-caps/) several years ago. They are a decorative letter at the beginning of a paragraph, often spanning several lines of text. It’s a typographic flourish found in illuminated manuscripts and traditional book design, where it adds visual interest and helps guide a reader’s eye to where they should begin.

Study manuscripts from the Middle Ages onwards, and you’ll find hand-decorated illuminated capitals. The artists who made these initial letters were fabulously called “illuminators.” These medieval versals went beyond showing someone where to start reading; historiated letters also illustrated the stories, which was especially useful since most people in the Middle Ages couldn’t read.

![A basic drop cap](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-02.webp?resize=1200%2C250&ssl=1)

On the web, drop caps can improve readability and reflect a brand’s visual identity.

---

## A brief refresher on properties and values

In CSS, drop caps are created using the `::first-letter` pseudo-element in combination with `initial-letter`. As you might expect, `::first-letter` targets the very first letter of a block of text, enabling you to style it independently from the rest of a paragraph. The first number sets how many lines tall the letter appears, and the second controls its baseline alignment — that is, which line of text the bottom of the cap sits on.

```css
p::first-letter {
  -webkit-initial-letter: 3 3;
  initial-letter: 3 3;
}
```

Because browser support still varies, it’s common to include both the unprefixed and `-webkit-` prefixed properties for maximum compatibility. And speaking of browser support, it’s also sensible to wrap the `initial-letter` property inside an [<FontIcon icon="iconfont icon-css-tricks"/>`@supports`](https://css-tricks.com/almanac/rules/s/supports/) CSS at-rule so we can check for browser support and provide a fallback, if needed:

```css
@supports (initial-letter:2) or (-webkit-initial-letter:2) {
  p::first-letter {
    -webkit-initial-letter: 3 3;
    initial-letter: 3 3;
  }
}
```

The `initial-letter` property automatically calculates the font size to match the number of lines a drop cap spans. On its own, this can make for quite a first impression. However, drop caps really start to come to life when you combine `initial-letter` with other CSS properties.

::: tip

Interactive examples from this article are [<FontIcon icon="fas fa-globe"/>available in my lab](https://stuffandnonsense.co.uk/lab/caps.html).

:::

---

## Shadows

![Text shadows applied to first letters ([<FontIcon icon="fas fa-globe"/>live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-2))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-03.webp?resize=1200%2C250&ssl=1)

When I want to lift a drop cap off the page, I can add a single [`text-shadow`](https://css-tricks.com/almanac/properties/t/text-shadow/). Shadows can be colourful and don’t have to be black. I created a [<FontIcon icon="fas fa-globe"/>full live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-2) you can check out.

```css
p::first-letter {
  /* ... *//
  text-shadow: 6px 6px 0 #e6d5b3;
}
```

But why use just one shadow when two hard-edged shadows will turn a cap into a classic graphic typographic element?

```css
p::first-letter {
  /* ... */
  text-shadow: 
    -6px -6px 0 #7d6975, 
    6px 6px 0 #e6d5b3;
}
```

![Examples showing unstyled, single text shadow, and two text shadows ([<FontIcon icon="fas fa-globe"/>live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-3))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-04.webp?resize=2326%2C652&ssl=1)

---

## Strokes

![A text shadow applied to a first letter ([<FontIcon icon="fas fa-globe"/>live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-4))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-05.webp?resize=1200%2C250&ssl=1)

The [<FontIcon icon="iconfont icon-css-tricks"/>`text-stroke`](https://css-tricks.com/almanac/properties/t/text-stroke/) property — shorthand for `text-stroke-width` and `text-stroke-color` — adds an outline to the centre of the text shape. It’s a [<FontIcon icon="fas fa-globe"/>Baseline](https://webstatus.dev/features/text-stroke-fill?q=text-stroke) feature and is now widely available. I can make the cap text transparent or colour it to match the page background.

```css
p::first-letter {
  /* ... */
  text-stroke: 5px #e6d5b3;
}
```

---

## Backgrounds

![Solid and gradient backgrounds applied to first letters ([<FontIcon icon="fas fa-globe"/>live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-5))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-06.webp?resize=1200%2C250&ssl=1)

Adding a background is a simple way to start making a cap more decorative. I could start by adding a solid [<FontIcon icon="iconfont icon-css-tricks"/>`background-color`](https://css-tricks.com/almanac/properties/b/background-color/).

```css
p::first-letter {
  /* ... */
  background-color: #97838f;
}
```

To add a lighting effect, I could apply a conical, linear, or radial [**gradient background image**](/css-tricks.com/a-complete-guide-to-css-gradients.md) (here’s a [<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-6)):

```css
p::first-letter {
  /* ... */
  background-color: #e6d5b3;
  background-image: linear-gradient(135deg,#c8b9c2 0%, #7d6975 50%);
}
```

And even an image URL to use a bitmap or vector image as a background (and here’s [<FontIcon icon="fas fa-globe"/>that demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-7)):

```css
p::first-letter {
  /* ... */
  background-color: #e6d5b3;
  background-image: url(...);
  background-size: cover;
}
```

![Background images and a background clipped to text](https://css-tricks.com/wp-content/uploads/2025/07/versal-07.svg)

Things become even more interesting by [<FontIcon icon="iconfont icon-css-tricks"/>clipping](https://css-tricks.com/almanac/properties/b/background-clip/) a bitmap, gradient, or vector background image to the text while setting its colour to `transparent`. Now, the image will only appear inside the text space ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-8)).

```css
p::first-letter {
  /* ... */
  background-clip: text;
  color: transparent;
}
```

---

## Borders

![Two examples of borders applied to first letters, one square and one rounded](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-08.webp?resize=1200%2C250&ssl=1)

You might think borders are boring, but there’s plenty you can do to make them look interesting. I could start by applying a solid [<FontIcon icon="iconfont icon-css-tricks"/>`border`](https://css-tricks.com/almanac/properties/b/border/) to surround the cap box ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-9)).

```css
p::first-letter {
  /* ... */
  border: 5px solid #e6d5b3;
}
```

Then, I could apply [<FontIcon icon="iconfont icon-css-tricks"/>`border-radius`](https://css-tricks.com/almanac/properties/b/border-radius/) to slightly round all its corners ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-10)).

```css
p::first-letter {
  /* ... */
  border-radius: 1rem;
}
```

Or, I might round individual corners for a more interesting look ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-11)):

```css
p::first-letter {
  /* ... */
  border-top-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
}
```

![A border radius applied to the first letter, where the top-left and bottom-right edges are rounded ([<FontIcon icon="fas fa-globe"/>live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-11))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-09.webp?resize=1200%2C250&ssl=1)

And then there’s the [<FontIcon icon="iconfont icon-css-tricks"/>`border-image`](https://css-tricks.com/almanac/properties/b/border-image/) property, a powerful, yet often [**overlooked CSS tool**](/css-tricks.com/revisiting-css-border-image.md). By slicing, repeating, and outsetting images, you can create intricate borders and decorative drop caps with minimal code.

![A CSS border image applied to a first letter ([<FontIcon icon="fas fa-globe"/>live demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-12))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_56E34CC562FF29CF4636A37359C805B2C8BD4869C3745A14E50DCA49B828F693_1751638531059_2025-07-04-9.png?resize=1200%2C300&ssl=1)

You can insert a bitmap or vector format image, or drop a CSS gradient into the border space:

```css
p::first-letter {
  /* ... */
  border-style: solid;
  border-width: 10px;
  border-image: conic-gradient(...) 1;
}
```

---

## Clipping

![Clipping first letters](https://css-tricks.com/wp-content/uploads/2025/07/versal-17.svg)

The [<FontIcon icon="iconfont icon-css-tricks"/>`clip-path`](https://css-tricks.com/almanac/properties/c/clip-path/) property lets you define a custom shape that controls which parts of an element are visible and which are hidden. Instead of always showing a rectangular box, you can use `clip-path` to crop elements into circles, polygons, or even [<FontIcon icon="iconfont icon-css-tricks"/>complex shapes defined with SVG paths](https://css-tricks.com/almanac/functions/p/path/). It’s an effective way to create visual effects like this right-facing arrow. Clipping the drop cap into an arrow shape isn’t just decorative — it reinforces direction and hierarchy, literally pointing readers to where the story begins. [<FontIcon icon="fas fa-globe"/>Here’s a demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-13) of the following example.

```css
p::first-letter {
  /* ... */
  padding-inline: 1rem 2rem;
  background-color: #e6d5b3;
  clip-path: polygon(...);
}
```

Or a glossy sticker shape cap, made by combining `clip-path` with a gradient background image and a text shadow ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-14)).

---

## Transforms

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-12.webp?resize=1200%2C250&ssl=1)

Two examples of transforming first letters, one rotated ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-15)) and one scaled ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-16))

You can [<FontIcon icon="iconfont icon-css-tricks"/>`transform`](https://css-tricks.com/almanac/properties/t/transform/) a drop cap independently from the rest of a paragraph by rotating, scaling, skewing, or translating it to make it feel more dynamic:

```css
p::first-letter {
  /* ... */
  margin-inline-end: 2.5em;
  transform: skew(20deg, 0deg);
}
```

![Two examples of skewed first letters, angling each one so that they are slanted backward towards the left.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-12.webp?resize=1200%2C250&ssl=1)

And with a little trial and error to arrive at the correct values, you could even flow the remaining paragraph text around the cap using the [<FontIcon icon="iconfont icon-css-tricks"/>`shape-outside`](https://css-tricks.com/almanac/properties/s/shape-outside/) property ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-16)):

```css
p::first-letter {
  /* ... */
  display: block;
  float: left;
  shape-outside: polygon(0 0, 0 200px, 250px 600px);
  shape-margin: 50px;
  transform: skew(20deg, 0deg) translateX(-60px);
}
```

Drop caps don’t just help guide a reader’s eye to where they should begin; they also set the tone for what follows. A well-designed drop cap adds visual interest at the start of a block of text, drawing attention in a way that feels intentional and designed. Because it’s often the first element the reader sees, caps can carry a lot of visual weight, making them powerful tools for expressing a brand’s identity.

---

## Designing for Patty Meltt

[<FontIcon icon="fas fa-globe"/>Patty Meltt](https://inspired-design-feitler.squarespace.com/?password=demo) wanted a website packed with design details. Every element added to a design is an opportunity to be expressive, and that includes her drop caps.

Her biography page is presentable, but we felt a focus on where someone should start reading was lacking.

![Patty Meltt’s biography without a drop cap](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-14.webp?resize=1600%2C1200&ssl=1)

From the selection of designs I showed her, she felt the sticker-style cap best suited her brand.

![Showing all letters of the alphabet styled in the artist’s preferred way, with a circular background shaped like a sun with sharp angles.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-15.webp?resize=1920%2C454&ssl=1)

To implement it, first, I added a cursive typeface which matches her branding and contrasts with the rest of her typographic design:

```css
p::first-letter {
  font-family: "Lobster Two", sans-serif;
  font-weight: 700;
}
```

I changed the cap colour to match the page background and added a semi-transparent text shadow:

```css
p::first-letter {
  /* ... */
  color: #140F0A;
  text-shadow: 6px 6px 0 rgba(163,148, 117, .8);
}
```

Next, I clipped the cap box to a visible area shaped like a sticker:

```css
p::first-letter {
  /* ... */
  clip-path: polygon(...);
}
```

…before applying two background images — a noise-filled SVG and a radial gradient — that I blended using a [<FontIcon icon="iconfont icon-css-tricks"/>`background-blend-mode`](https://css-tricks.com/almanac/properties/b/background-blend-mode/):

```css
p::first-letter {
  /* ... */
  background-image: url(img/cap-noise.svg), 
  radial-gradient(circle, #e6d5b3 0%, #cdaa65 100%);
  background-blend-mode: soft-light, normal;
}
```

![Patty Meltt’s biography with a stylsh new drop cap ([<FontIcon icon="fas fa-globe"/>demo](https://stuffandnonsense.co.uk/lab/caps.html#demo-19))](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/versal-16.webp?resize=1600%2C1200&ssl=1)

The result is a drop cap that’s as stylish as cut-off jeans and a pair of gator-skinned boots.

---

## Conclusion

Styling drop caps isn’t just about decoration — it’s about setting a tone, drawing readers in, and using every detail to express a brand’s voice. CSS has the tools to go beyond the default: gradients, textures, borders, and even complex shapes all help transform first letters into statements. So don’t waste the opportunities that drop caps give you. Make ’em sing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Creative With Versal Letters",
  "desc": "A versal letters is a typographic flourish found in illuminated manuscripts and traditional book design, where it adds visual interest and helps guide a reader’s eye to where they should begin.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-versal-letters.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
