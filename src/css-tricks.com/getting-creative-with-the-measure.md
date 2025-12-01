---
lang: en-US
title: "Getting Creative With “The Measure”"
description: "Article(s) > Getting Creative With “The Measure”"
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
      content: "Article(s) > Getting Creative With “The Measure”"
    - property: og:description
      content: "Getting Creative With “The Measure”"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-the-measure.html
prev: /programming/css/articles/README.md
date: 2025-12-04
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763072955406_2025-11-13-1.webp
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
  name="Getting Creative With “The Measure”"
  desc="A good measure makes reading text comfortable, while a bad one makes it more difficult. So, rather than allowing layout to dictate the measure, doesn’t it make more sense for the measure to inform layout decisions?"
  url="https://css-tricks.com/getting-creative-with-the-measure"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763072955406_2025-11-13-1.webp"/>

I spend an unhealthy amount of time on the typography in my designs, and if you’ve read any traditional typography books, you might remember “the measure.” If not, it’s simply the length of a line of text. But *measure* means more than that, and once you understand what it represents, it can change how you think about layout entirely.

But why’s it called the *measure*?

![Photo: Wilhei, via [<VPIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://commons.wikimedia.org/w/index.php?curid=7698365) (CC BY 3.0)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763072955406_2025-11-13-1.webp?resize=1920%2C1080&ssl=1)

Before desktop publishing, typesetters worked with physical metal type. They set lines of text within a composing stick, and the width of the stick was called the measure. It was literally the space you could fit type into, and everything else on the page — from column widths to margins and gutters — was designed around it.

A good measure makes reading text comfortable, while a bad one makes it more difficult.

![An uncomfortable measure makes reading more difficult. [<VPIcon icon="fas fa-globe"/>See this example in my lab.](https://stuffandnonsense.co.uk/lab/measure.html#example-1)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763562852550_2025-11-19-1.webp?resize=1440%2C600&ssl=1)

And when the measure is correct, the rest of the layout falls into place. So, rather than allowing layout to dictate the measure, doesn’t it make more sense for the measure to inform layout decisions?

---

## Turning the measure into a custom property

In my CSS, I start by defining a custom property:

```css
:root {
  --measure: 60ch;
}
```

[**`ch` units**](/css-tricks.com/css-length-units.md) are ideal for this because they relate to the width of the zero (`0`) character in a chosen font. Somewhere between 60–70 characters per line is a comfortable reading length, so 65 characters feels natural.

`60ch` is a solid starting point, but it isn’t universal. Different typefaces produce different real-world line lengths, even when the character count stays the same. Typefaces with a large x-height appear visually larger, so `60ch` can feel longer than it really is. Condensed faces make `60ch` feel too short. Wider faces can make it feel too long. Even small tracking changes stretch or compress the perceived measure.

::: important The point is simple

treat `60ch` as a baseline, then adjust by eye. Once the measure becomes a variable, you can use it across your layout to keep everything connected.

:::

---

## Keeping text readable

I suspect most developers have used the [<VPIcon icon="iconfont icon-css-tricks"/>`max-width`](https://css-tricks.com/almanac/properties/m/max-width/) property. Although it took time to retrain my muscle memory, I now use [**CSS logical properties**](/css-tricks.com/css-logical-properties-and-values.md), replacing `max-width` with `max-inline-size`:

```css
article {
  max-inline-size: var(--measure);
  margin-inline: auto;
}
```

![Well considered measure makes reading more comfortable. [<VPIcon icon="fas fa-globe"/>See this example in my lab.](https://stuffandnonsense.co.uk/lab/measure.html#example-2)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763563139151_2025-11-19-2.webp?resize=1440%2C700&ssl=1)

That prevents long-line syndrome, which afflicts too many websites when viewed on large screens.

---

## Designing multi-column text

Multi-column layout is one of the [**most underrated CSS layout tools**](/css-tricks.com/revisiting-css-multi-column-layout.md). Instead of specifying the number of columns, defining the column width lets the browser decide how many columns fit along the inline axis. The measure can also define the widths of those columns:

```css
article {
  column-width: var(--measure);
}
```

![The measure can define multi columns widths. [<VPIcon icon="fas fa-globe"/>See this example in my lab](https://stuffandnonsense.co.uk/lab/measure.html#example-3).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763563177425_2025-11-19-3.webp?resize=1440%2C600&ssl=1)

When the columns’ parent container becomes wide enough, a browser flows text into as many readable columns as will fit. When there’s not enough space for multiple columns, the layout falls back to a single column, all without breakpoints and media queries.

---

## Letting the measure influence a grid

The measure also helps me design grids which feel connected to my content. For example, when I’m implementing a layout with a column containing long-form content, plus another flexible column, I can lock the text content to the measure:

```css
.layout {
  display: grid;
  grid-template-columns: minmax(0, var(--measure)) 1fr;
}
```

![The measure also creates grids which feel connected to content. [<VPIcon icon="fas fa-globe"/>See this example in my lab.](https://stuffandnonsense.co.uk/lab/measure.html#example-4)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763563641334_2025-11-19-4.webp?resize=1440%2C839&ssl=1)

That first column ensures that reading text remains comfortable, while the second adjusts to whatever horizontal space remains.

---

## Measure-driven container queries

For years, developers learned to think of screen sizes in terms of specific breakpoints (`320px`, `48em`, `64em`, and so on) and media queries. It’s a hard habit to break and one which, to be honest, I haven’t always managed myself.

Those numbers don’t come from content; [<VPIcon icon="iconfont icon-css-tricks"/>devices define them](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/). They really should be called “guesspoints” because we mostly never know which numbers work for most people. Instead of dictating that a layout switches at, say, `48em` and `64em`, I can let my content decide when a layout should change by using the measure.

![A heading and three paragraphs of text in white against a black background on the right. An image of a woman in cowgirl hat and denim shirt is staring straight ahead on the left.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_56AFCBE7DCEED351817E3696EEEE003B5BEE9737CDC6205474FB62E233A2CF20_1763563839704_2025-11-19-5.webp?resize=1440%2C839&ssl=1)

**Measure makes a better breakpoint**. A measure-driven breakpoint, combined with [**container queries**](/css-tricks.com/css-container-queries.md), responds to text content. So, when a column becomes narrower than a readable line length, a layout can collapse. But when it becomes wide enough to support more structure, the layout can expand.

A CSS container query checks the width of the component’s container instead of a screen or the viewport. For instance, when a component is narrower than 65 characters, I can apply specific styles:

```css
/* When the container is no wider than the --measure */
@container (max-width: var(--measure)) {
  /* Styles */
}
```

My design might include multiple columns, perhaps a wider column for the main content and a narrower one for supporting information:

```css
[data-layout="yogi"] {
  display: grid;
  grid-template-columns: 3fr 1fr;
}
```

If the container can’t support a text column equal to the measure, this query replaces the two columns with a single column layout:

```css
@container (max-width: var(--measure)) {
  [data-layout="yogi"] {
    grid-template-columns: 1fr;
  }
}
```

This feels more natural because the composition is connected to the content rather than the device’s width, creating a comfortable reading environment.

---

## Making a measure system

Depending on the variety of content I need to present, on certain projects, I define several variations of the measure:

```css
:root {
  --measure: 60ch;
  --measure-s: 55ch;
  --measure-l: 80ch;
}
```

This gives me a variety of line lengths for use in different situations:

- Small for captions and other shorter text blocks
- Regular for body copy
- Large for introductions, headings, and hero sections

When type, spacing, and layout all share the same underlying rhythm, the result can feel more coherent and more intentional.

---

## Considering the measure can change how you design

When you design with the measure in mind, layout stops being guesswork and becomes a conversation between content and composition. Reading becomes more comfortable, and the page feels more deliberate. It’s a small shift, but once you start anchoring your design decisions to the measure, it changes how you approach layout entirely.

::: info

## Further reading

```component VPCard
{
  "title": "Getting Creative With HTML Dialog",
  "desc": "So, how can you take dialogue box design beyond the generic look of frameworks and templates? How can you style them to reflect a brand’s visual identity and help to tell its stories? Here’s how I do it in CSS using ::backdrop, backdrop-filter, and animations.",
  "link": "/css-tricks.com/getting-creative-with-html-dialog.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Getting Creative With Images in Long-Form Content",
  "desc": "Images in long-form content can (and often should) do more than illustrate. They help set the pace, influence how readers feel, and add character that words alone can’t always convey.",
  "link": "/css-tricks.com/getting-creative-with-images-in-long-form-content.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Getting Creative With Quotes",
  "desc": "How do you design block quotes and pull quotes to reflect a brand’s visual identity and help tell its story? Here’s how I do it by styling the HTML blockquote element using borders, decorative quote marks, custom shapes, and a few unexpected properties.",
  "link": "/css-tricks.com/getting-creative-with-quotes.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Getting Creative With Small Screens",
  "desc": "On mobile, people can lose their sense of context and can’t easily tell where a section begins or ends. Good small-screen design can help orient them using a variety of techniques.",
  "link": "/css-tricks.com/getting-creative-with-small-screens.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Getting Creative With Versal Letters",
  "desc": "A versal letters is a typographic flourish found in illuminated manuscripts and traditional book design, where it adds visual interest and helps guide a reader’s eye to where they should begin.",
  "link": "/css-tricks.com/getting-creative-with-versal-letters.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Getting Creative With shape-outside",
  "desc": "There are so many creative opportunities for using shape-outside that I’m surprised I see it used so rarely. So, how can you use it to add personality to a design? Here’s how I do it.",
  "link": "/css-tricks.com/getting-creative-with-shape-outside.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Creative With “The Measure”",
  "desc": "A good measure makes reading text comfortable, while a bad one makes it more difficult. So, rather than allowing layout to dictate the measure, doesn’t it make more sense for the measure to inform layout decisions?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-the-measure.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
