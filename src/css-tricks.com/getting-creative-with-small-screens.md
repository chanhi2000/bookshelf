---
lang: en-US
title: "Getting Creative With Small Screens"
description: "Article(s) > Getting Creative With Small Screens"
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
      content: "Article(s) > Getting Creative With Small Screens"
    - property: og:description
      content: "Getting Creative With Small Screens"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-small-screens.html
prev: /programming/css/articles/README.md
date: 2025-10-29
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761081109189_2025-10-21-8.webp
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
  name="Getting Creative With Small Screens"
  desc="On mobile, people can lose their sense of context and can’t easily tell where a section begins or ends. Good small-screen design can help orient them using a variety of techniques."
  url="https://css-tricks.com/getting-creative-with-small-screens"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761081109189_2025-10-21-8.webp"/>

Over the [past few months](https://css-tricks.com/author/andyclarke/), I’ve explored how we can get creative using well-supported CSS properties. Each article is intended to nudge web design away from uniformity, toward designs that are more distinctive and memorable. One bit of [feedback from Phillip Bagleg](https://css-tricks.com/getting-creative-with-shape-outside/#comment-1883412) deserves a follow up:

> Andy’s guides are all very interesting, but mostly impractical in real life. Very little guidance on how magazine style design, works when thrown into a responsive environment.

Fair point well made, Phillip. So, let’s bust the myth that editorial-style web design is impractical on small screens.

![A series of three desktop-sized screenshots from Patty Meltt's website.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761080396747_2025-10-21-1.webp?resize=1920%2C880&ssl=1)

::: note My brief

Patty Meltt is an up-and-coming country music sensation, and she needed a website to launch her new album and tour. She wanted it to be distinctive-looking and memorable, so she called [<VPIcon icon="fas fa-globe"/>Stuff & Nonsense](https://stuffandnonsense.co.uk). Patty’s not real, but the challenges of designing and developing sites like hers are.

:::

---

## The problem with endless columns

On mobile, people can lose their sense of context and can’t easily tell where a section begins or ends. Good small-screen design can help orient them using a variety of techniques.

When screen space is tight, most designers collapse their layouts into a single long column. That’s fine for readability, but it can negatively impact the user experience when hierarchy disappears; rhythm becomes monotonous, and content scrolls endlessly until it blurs. Then, nothing stands out, and pages turn from being designed experiences into content feeds.

Like a magazine, layout delivers visual cues in a desktop environment, letting people know where they are and suggesting where to go next. This rhythm and structure can be as much a part of visual storytelling as colour and typography.

But those cues frequently disappear on small screens. Since we can’t rely on complex columns, how can we design visual cues that help readers feel oriented within the content flow and stay engaged? One answer is to stop thinking in terms of one long column of content altogether. Instead, treat each section as a distinct composition, a designed moment that guides readers through the story.

---

## Designing moments instead of columns

Even within a narrow column, you can add variety and reduce monotony by thinking of content as a series of meaningfully designed moments, each with distinctive behaviours and styles. We might use alternative compositions and sizes, arrange elements using different patterns, or use horizontal and vertical scrolling to create experiences and tell stories, even when space is limited. And fortunately, we have the tools we need to do that at our disposal:

- [**`@media`**](/css-tricks.com/a-complete-guide-to-css-media-queries.md) and [**`@container queries`**](/css-tricks.com/css-container-queries.md)
- [<VPIcon icon="iconfont icon-css-tricks"/>CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and [<VPIcon icon="iconfont icon-css-tricks"/>Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [**Scroll Snap**](/css-tricks.com/practical-css-scroll-snapping.md)
- [<VPIcon icon="iconfont icon-css-tricks"/>Orientation media features](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/)
- [**Logical properties**](/css-tricks.com/css-logical-properties-and-values.md)

These moments might move horizontally, breaking the monotony of vertical scrolling, giving a section its own rhythm, and keeping related content together.

---

## Make use of horizontal scrolling

My desktop design for Patty’s discography includes her album covers arranged in a modular grid. Layouts like these are easy to achieve using my [<VPIcon icon="fas fa-globe"/>modular grid generator](https://stuffandnonsense.co.uk/layoutlove/modular.html).

![Six album covers arranged in a three-by-two grid next to a column of text on the left. Four columns total.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761080486505_2025-10-21-2.webp?resize=1920%2C1080&ssl=1)

But that arrangement isn’t necessarily going to work for small screens, where a practical solution is to transform the modular grid into a horizontal scrolling element. Scrolling horizontally is a familiar behaviour and a way to give grouped content its own stage, the way a magazine spread might.

I started by defining the modular grid’s parent — in this case, the imaginatively named `modular-wrap` — as a container:

```css
.modular-wrap {
  container-type: inline-size;
  width: 100%;
}
```

Then, I added grid styles to create the modular layout:

```css
.modular {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  overflow-x: visible;
  width: 100%;
}
```

It would be tempting to collapse those grid modules on small screens into a single column, but that would simply stack one album on top of another.

![Album covers arranged in a single column.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/patty-meltt-2025-10-21-3.png?resize=1920%2C1080&ssl=1)

Collapsing grid modules on small screens into a single column

So instead, I used a [**container query**](/css-tricks.com/css-container-queries.md) to arrange the album covers horizontally and enable someone to scroll across them:

```css
@container (max-width: 30rem) {
  #example-1 .modular {
    display: grid;
    gap: 1.5rem;
    grid-auto-columns: minmax(70%, 1fr);
    grid-auto-flow: column;
    grid-template-columns: none;
    grid-template-rows: 1fr;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
```

![A paragraph of text above a series of albums covers arranged in a single row, overflowing the screen for scrolling.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761080679465_2025-10-21-4.webp?resize=1920%2C1080&ssl=1)

Album covers are arranged horizontally rather than vertically. [<VPIcon icon="fas fa-globe"/>See this example in my lab.](https://stuffandnonsense.co.uk/lab/small-screens.html#example-1)

Now, Patty’s album covers are arranged horizontally rather than vertically, which forms a cohesive component while preventing people from losing their place within the overall flow of content.

---

## Push elements off-canvas

[Last time](https://css-tricks.com/getting-creative-with-shape-outside/#aa-shape-outside-with-a-faux-centred-image), I explained how to use [`shape-outside`](https://css-tricks.com/almanac/properties/s/shape-outside/) and create the illusion of text flowing around both sides of an image. You’ll often see this effect in magazines, but hardly ever online.

![Patty Meltt staring straight into the camera in between two columns of text.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761080764189_2025-10-21-5.webp?resize=1920%2C1080&ssl=1)

The illusion of text flowing around both sides of an image

Desktop displays have plenty of space available, but what about smaller ones? Well, I could remove `shape-outside` altogether, but if I did, I’d also lose much of this design’s personality and its effect on visual storytelling. Instead, I can retain `shape-outside` and place it inside a horizontally scrolling component where some of its content is off-canvas and outside the viewport.

My content is split between two divisions: the first with half the image floating right, and the second with the other half floating left. The two images join to create the illusion of a single image at the centre of the design:

```html
<div class="content">
  <div>
  <img src="img-left.webp" alt="">
  <p><!-- ... --></p>
  </div>

<div>
  <img src="img-right.webp" alt="">
  <p><!-- ... --></p>
  </div>
</div>
```

I knew this implementation would require a container query because I needed a parent element whose width determines when the layout should switch from static to scrolling. So, I added a `section` outside that content so that I could reference its width for determining when its contents should change:

```html
<section>
  <div class="content">
    <!-- ... -->
  </div>
</section>
```

```css
section {
  container-type: inline-size;
  overflow-x: auto;
  position: relative;
  width: 100%;
}
```

My technique involves spreading content across two equal-width divisions, and these grid column properties will apply to every screen size:

```css
.content {
  display: grid;
  gap: 0;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
```

Then, when the section’s width is below `48rem`, I altered the width of my two columns:

```css
@container (max-width: 48rem) {
  .content {
    grid-template-columns: 85vw 85vw;
  }
}
```

Setting the width of each column to 85% — a little under viewport width — makes some of the right-hand column’s content visible, which hints that there’s more to see and encourages someone to scroll across to look at it.

![Showing the left and right halves of a layout that supports horizontal scrolling.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761080909098_2025-10-21-6.webp?resize=1920%2C1080&ssl=1)

Some of the right-hand column’s content is visible. [<VPIcon icon="fas fa-globe"/>See this example in my lab.](https://stuffandnonsense.co.uk/lab/small-screens.html#example-2)

The same principle works at a larger scale, too. Instead of making small adjustments, we can turn an entire section into a miniature magazine spread that scrolls like a story in print.

---

## Build scrollable mini-spreads

When designing for a responsive environment, there’s no reason to lose the expressiveness of a magazine-inspired layout. Instead of flattening everything into one long column, sections can behave like self-contained mini magazine spreads.

![A desktop layout showing a column of text in between two columns of differently-sized and shaped images.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761081046744_2025-10-21-7.webp?resize=1920%2C1080&ssl=1)

Sections can behave like self-contained mini magazine spreads.

My final `shape-outside` example flowed text between two photomontages. Parts of those images escaped their containers, creating depth and a layout with a distinctly editorial feel. My content contained the two images and several paragraphs:

```html
<div class="content">
  <img src="left.webp" alt="">
  <img src="right.webp" alt="">
  <p><!-- ... --></p>
  <p><!-- ... --></p>
  <p><!-- ... --></p>
</div>
```

Two images float either left or right, each with `shape-outside` applied so text flows between them:

```css
.content img:nth-of-type(1) {
  float: left;
  width: 45%;
  shape-outside: url("left.webp");
}

.spread-wrap .content img:nth-of-type(2) {
  float: right;
  width: 35%;
  shape-outside: url("right.webp");
}
```

That behaves beautifully at large screen sizes, but on smaller ones it feels cramped. To preserve the design’s essence, I used a container query to transform its layout into something different altogether.

First, I needed another parent element whose width would determine when the layout should change. So, I added a `section` outside so that I could reference its width and gave it a little `padding` and a border to help differentiate it from nearby content:

```html
<section>
  <div class="content">
    <!-- ... -->
  </div>
</section>
```

```css
section {
  border: 1px solid var(--border-stroke-color);
  box-sizing: border-box;
  container-type: inline-size;
  overflow-x: auto;
  padding: 1.5rem;
  width: 100%;
}
```

When the section’s width is below `48rem`, I introduced a horizontal Flexbox layout:

```css
@container (max-width: 48rem) {
  .content {
    align-items: center;
    display: flex;
    flex-wrap: nowrap;
    gap: 1.5rem;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
}
```

And because this layout depends on a container query, I used [**container query units**](/css-tricks.com/container-query-units-cqi-and-cqb.md) (`cqi`) for the width of my flexible columns:

```css
.content > * {
  flex: 0 0 85cqi;
  min-width: 85cqi;
  scroll-snap-align: start;
}
```

![Showing a three-column layout split between three screenshots to demonstrate horizontally scrolling through the layout.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761081109189_2025-10-21-8.webp?resize=1920%2C1080&ssl=1)

On small screens, the layout flows from image to paragraphs to image. [<VPIcon icon="fas fa-globe"/>See this example in my lab.](https://stuffandnonsense.co.uk/lab/small-screens.html#example-3)

Now, on small screens, the layout flows from image to paragraphs to image, with each element snapping into place as someone swipes sideways. This approach rearranges elements and, in doing so, slows someone’s reading speed by making each swipe an intentional action.

To prevent my images from distorting when flexed, I applied auto-height combined with [<VPIcon icon="iconfont icon-css-tricks"/>`object-fit`](https://css-tricks.com/almanac/properties/o/object-fit/):

```css
.content img {
  display: block;
  flex-shrink: 0;
  float: none;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}
```

Before calling on the Flexbox `order` property to place the second image at the end of my small screen sequence:

```css
.content img:nth-of-type(2) {
  order: 100;
}
```

Mini-spreads like this add movement and rhythm, but orientation offers another way to shift perspective without scrolling. A simple rotation can become a cue for an entirely new composition.

---

## Make orientation-responsive layouts

When someone rotates their phone, that shift in orientation can become a cue for a new layout. Instead of stretching a single-column design wider, we can recompose it entirely, making a landscape orientation feel like a fresh new spread.

![A desktop layout showing a picture of Patty Meltt sitting and playing an acoustic guitar as text flows around the shape of the image on the right.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761081198424_2025-10-21-9.webp?resize=1920%2C1080&ssl=1)

Turning a phone sideways is an opportunity to recompose a layout.

Turning a phone sideways is an opportunity to recompose a layout, not just reflow it. When Patty’s fans rotate their phones to landscape, I don’t want the same stacked layout to simply stretch wider. Instead, I want to use that additional width to provide a different experience. This could be as easy as adding extra columns to a composition in a media query that’s applied when the device’s `orientation` is detected in `landscape`:

```css
@media (orientation: landscape) {
  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

For the long-form content on Patty Meltt’s biography page, text flows around a polygon [<VPIcon icon="iconfont icon-css-tricks"/>`clip-path`](https://css-tricks.com/almanac/properties/c/clip-path/) placed over a large [**faux background image**](/css-tricks.com/getting-creative-with-shape-outside.md#faux-background-image). This image is inline, floated, and has its width set to 100%:

```html
<div class="content">
  <img src="patty.webp" alt="">
  <!-- ... -->
</div>
```

```css
.content > img {
  float: left;
  width: 100%;
  max-width: 100%;
}
```

Then, I added `shape-outside` using the polygon coordinates and added a `shape-margin`:

```css
.content > img {
  shape-outside: polygon(...);
  shape-margin: 1.5rem;
}
```

I only want the text to flow around the polygon and for the image to appear in the background when a device is held in landscape, so I wrapped that rule in a query which detects the screen orientation:

```css
@media (orientation: landscape) {
  .content > img {
    float: left;
    width: 100%;
    max-width: 100%;
    shape-outside: polygon(...);
    shape-margin: 1.5rem;
  }
}
```

![Image of Patty Meltt sitting and playing an acoustic guitar above a column of text.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/s_E63F027435C482D5813799164A830B3E060276A78A7A02CCD5EC79D53323A5B8_1761081252845_2025-10-21-10.webp?resize=1920%2C1080&ssl=1)

::: info See this example in my lab.

```component VPCard
{
  "title": "Stuff & Nonsense Lab • Small screens",
  "desc": "Getting creative with small screens",
  "link": "https://stuffandnonsense.co.uk/lab/small-screens.html#example-4/",
  "logo": "https://stuffandnonsense.co.uk/favicon.ico",
  "background": "rgba(0,0,0,0.2)"
}
```

:::

Those properties won’t apply when the viewport is in portrait mode.

---

## Design stories that adapt, not layouts that collapse

Small screens don’t make design more difficult; they make it more deliberate, requiring designers to consider how to preserve a design’s personality when space is limited.

Phillip was right to ask how editorial-style design can work in a responsive environment. It does, but not by shrinking a print layout. It works when we think differently about how content flexes, shifts, and scrolls, and when a design responds not just to a device, but to how someone holds it.

The goal isn’t to mimic miniature magazines on mobile, but to capture their energy, rhythm, and sense of discovery that print does so well. Design is storytelling, and just because there’s less space to tell one, it shouldn’t mean it should make any less impact.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Creative With Small Screens",
  "desc": "On mobile, people can lose their sense of context and can’t easily tell where a section begins or ends. Good small-screen design can help orient them using a variety of techniques.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-small-screens.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
