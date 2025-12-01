---
lang: en-US
title: "Getting Creative With Quotes"
description: "Article(s) > Getting Creative With Quotes"
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
      content: "Article(s) > Getting Creative With Quotes"
    - property: og:description
      content: "Getting Creative With Quotes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-quotes.html
prev: /programming/css/articles/README.md
date: 2025-08-11
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019872672_2025-07-09-9.webp
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
  name="Getting Creative With Quotes"
  desc="How do you design block quotes and pull quotes to reflect a brand’s visual identity and help tell its story? Here’s how I do it by styling the HTML blockquote element using borders, decorative quote marks, custom shapes, and a few unexpected properties."
  url="https://css-tricks.com/getting-creative-with-quotes"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019872672_2025-07-09-9.webp"/>

Block quotes and pull quotes are useful for punctuating solid blocks of running text. They’re also two of the best typographic elements for acting as visual landmarks to catch someone’s eye. There are no rules about how long a quote should be, how big it should look, or even how it’s styled.

So, how do you design block quotes and pull quotes to reflect a brand’s visual identity and help tell its story? Here’s how I do it by styling the HTML `blockquote` element using borders, decorative quote marks, custom shapes, and a few unexpected properties.

![Patty Meltt is an up-and-coming country music sensation.](https://css-tricks.com/wp-content/uploads/2025/07/patty-melt.svg)

::: info My brief

Patty Meltt is an up-and-coming country music sensation, and she needed a website to launch her new album. She wanted it to be distinctive-looking and memorable, so she called [<VPIcon icon="fas fa-globe"/>Stuff & Nonsense](https://stuffandnonsense.co.uk). Patty’s not real, but the challenges of designing and developing sites like hers are.

:::

First, a quote-unquote “recap.”

There are no limitations on how quotations can be styled. Block and pull quotes can both be eye-catching design elements, but they convey different messages. While a block quote is typically inside the content flow, a pull quote (sometimes called a callout) is extracted from the text to form a separate element.

![Pull quotes extracted from the text](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019727719_2025-07-09-8.webp?resize=1920%2C1080&ssl=1)

The proper HTML for marking up a block quote [**depends on its contents**](/css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes.md). My design for Patty Meltt includes concert reviews, which contain the reviewer’s name:

```html
<blockquote>
  <p>"Patty Meltt’s powerful ballads and toe-tapping anthems had the audience singing along all night."</p>
  <footer>— Waylon Bootscuffer</footer>
</blockquote>
```

Here, the `footer` contains information about the source or author of the parent element. This makes it a good fit for attributions inside a `blockquote`, where it indicates who wrote it. But what about `cite`?

For years, I used the `cite` element to mark up attributions. It’s one of those sneaky bits of HTML that felt intuitive until I read [<VPIcon icon="fas fa-globe"/>the spec](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-cite-element) and went, “Dagnabbit!” because `cite` isn’t meant to label people. Instead, it should be used for:

> “The title of a creative work (e.g. book, website, song, painting, etc.)”

```html
<blockquote>
  <p>"Patty Meltt’s powerful ballads and toe-tapping anthems had the audience singing along all night."</p>
  <footer>— Waylon Bootscuffer, <cite>Country Music Magazine</cite></footer>
</blockquote>
```

So, in that example, `footer` marks up the attribution, and `cite` points to the title of the publication, not the person writing it. This gives the markup a semantic boost and helps people who use screen readers.

---

## Styling with personality

Out-of-the-box, browsers do [<VPIcon icon="fas fa-globe"/>very little](https://stuffandnonsense.co.uk/lab/quotes.html#demo-1) to style blockquotes, except for adding inline margins. You could add some [**simple blockquote styling**](/css-tricks.com/snippets/css/simple-and-nice-blockquote-styling.md), but with just a little more style, you can transform them into expressive design elements that reflect a brand’s personality and voice.

![Quotation designs to reflect a brand’s personality and voice](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019872672_2025-07-09-9.webp?resize=1920%2C1080&ssl=1)

For Patty Meltt’s design, I wanted her quotes to feel confident, loud, and a little over the top.

::: tip

Interactive examples from this article are [<VPIcon icon="fas fa-globe"/>available in my lab](https://stuffandnonsense.co.uk/lab/quotes.html).

:::

---

## Borders

A simple border, used well, can make block and pull quotes stand out and anchor them into a layout. A border on the left or top separates a block quote from surrounding content, helping a reader recognise it as a different voice from the main narrative.

In magazines and newspapers, block quotes punctuate content blocks and are frequently styled to contrast with the surrounding text. A [<VPIcon icon="fas fa-globe"/>full-width, bordered block quote](https://stuffandnonsense.co.uk/lab/quotes.html#example-1) encourages a reader to pause for a moment.

![Block quote with left border (left) and a block quote with top border (right)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752018783844_2025-07-09-2.webp?resize=1920%2C1080&ssl=1)

It’s a simple, yet effective, way to focus someone’s attention on a message. A [<VPIcon icon="fas fa-globe"/>thin border](https://stuffandnonsense.co.uk/lab/quotes.html#demo-2) feels quiet and understated:

```css
blockquote {
  padding-inline: 1.5rem;
  border-inline-start: 1px solid #98838e;
  border-inline-end: 1px solid #98838e;
}
```

![Pull quotes with thin borders](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019059729_2025-07-09-3.webp?resize=1920%2C400&ssl=1)

This may suit some brands, but that’s not a style which reflects Patty’s personality. Whereas a bolder, [<VPIcon icon="fas fa-globe"/>thicker border](https://stuffandnonsense.co.uk/lab/quotes.html#demo-4) feels more confident, like it has something important to say:

```css
blockquote {
  padding-inline: 1.5rem;
  border-inline-start: 5px solid #98838e;
  border-inline-end: 5px solid #98838e;
}
```

![Pull quotes with thick borders](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019128106_2025-07-09-4.webp?resize=1920%2C400&ssl=1)

Those borders needn’t always fill the full height or width of a `blockquote`, so instead of using the `border` property, use `::before` and `::after` pseudo-elements to add [<VPIcon icon="fas fa-globe"/>faux borders](https://stuffandnonsense.co.uk/lab/quotes.html#demo-6) at any size:

```css
blockquote {
  display: flex;
  flex-direction: column;
  align-items: center;
}
 
blockquote::before,
blockquote::after {
  content: "";
  display: block;
  width: 80px;
  height: 5px;
  background-color: #98838e;
}
```

![Pull quote with faux borders](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019217003_2025-07-09-5.webp?resize=1920%2C400&ssl=1)

You could even animate those faux borders using keyframe animations or [<VPIcon icon="fas fa-globe"/>simple transitions](https://stuffandnonsense.co.uk/lab/quotes.html#demo-16) to increase their width when someone interacts with the quotation:

```css
blockquote::before,
blockquote::after {
  content: "";
  display: block;
  width: 80px;
  height: 5px;
  background-color: #98838e;
  transition: 300ms width ease-in-out;
}

blockquote:hover::before,
blockquote:hover::after {
  width: 100%;
}
```

---

## Quote marks

Before choosing how to style your quote marks, consider whether you need them at all. Technically, an HTML `blockquote` implies its content is a quotation. So, from an accessibility and semantic standpoint, quote marks aren’t required because screen readers and search engines will recognise a `blockquote`. However, quote marks can visually emphasise quoted content and add interest and personality to a design.

![Quote marks add interest and personality](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019355456_2025-07-09-6.webp?resize=1920%2C400&ssl=1)

Are both opening and closing marks always needed? Possibly, when a design needs [<VPIcon icon="fas fa-globe"/>a traditional feel](https://stuffandnonsense.co.uk/lab/quotes.html#demo-7), or a quotation appears in a passage of running text:

```css
blockquote {
  position: relative;
  padding-inline: 64px;
}
  
blockquote img:first-of-type,
blockquote img:last-of-type {
  position: absolute;
}

blockquote img:first-of-type {
  top: 0;
  left: 0;
}

blockquote img:last-of-type {
  right: 0;
  bottom: 0;
}
```

![Decorative oversized opening mark](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019548059_2025-07-09-7-1-1024x213.webp?resize=1024%2C213&ssl=1)

Or, to give a design an editorial feel, you might use only a decorative [<VPIcon icon="fas fa-globe"/>oversized opening mark](https://stuffandnonsense.co.uk/lab/quotes.html#demo-9) for a pull quote, which is separate from the normal flow of text:

```css
blockquote {
  display: flex;
  flex-direction: column;
  align-items: center;
}

blockquote::after {
  content: "";
  display: block;
  width: 80px;
  height: 5px;
  background-color: #98838e;
}
```

---

## Quote marks library

Block quotes don’t necessarily need quote marks, but when you use them with purpose, they become more than punctuation. They become part of the design personality. Decorative marks are ideal when a brand wants to infuse its character into a design.

![Poppins quote mark (left) and a Punch 3D quote mark (right)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752019995135_2025-07-09-10.webp?resize=1920%2C1080&ssl=1)

Sadly, even the nicest designed typefaces can include dull and uninspiring quote marks. So, it’s important to remember that you can choose marks from an altogether different font if they better suit a design.

![Part of my quote marks library](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752020119862_2025-07-09-11.webp?resize=1920%2C1080&ssl=1)

That’s why, whenever I audition a new typeface, I check its quote marks. If they’re memorable or noteworthy, I add them as SVGs to my quote marks library so I can easily find them later.

---

## Shapes

Quotation design needn’t stop at borders and quote marks. Block and pull quotes can be any shape. You might style an album or concert review as a [<VPIcon icon="fas fa-globe"/>speech](https://stuffandnonsense.co.uk/lab/quotes.html#demo-19) or [<VPIcon icon="fas fa-globe"/>thought](https://stuffandnonsense.co.uk/lab/quotes.html#demo-20) bubble, and include an avatar for the author. Or, you could use a [<VPIcon icon="iconfont icon-css-tricks"/>`clip-path`](https://css-tricks.com/almanac/properties/c/clip-path/) or [<VPIcon icon="iconfont icon-css-tricks"/>`mask`](https://css-tricks.com/almanac/properties/m/mask/) to transform a quotation into [<VPIcon icon="fas fa-globe"/>any shape](https://stuffandnonsense.co.uk/lab/quotes.html#demo-21) you can imagine.

![Speech bubble, thought bubble, and blob](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752020299075_2025-07-09-12.webp?resize=1920%2C400&ssl=1)

---

## Designing for Patty Meltt

Patty Meltt wanted a website packed with design details. Every element added to a design is an opportunity to be expressive, and that includes her quotations. From the selection of designs I showed her, she felt a mixture of quote marks, avatar images, and borders — with type set in a flowing script — best suited her style.

![Design for Patty Meltt’s block quote (left) and pull quote (right)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/07/s_790F7B84CC43EDAACAC230BA09FDB2B94DE343C5FDA5C4802B33DF9B607B71C2_1752020632418_2025-07-09-13-1024x576.webp?resize=1024%2C576&ssl=1)

To implement [<VPIcon icon="fas fa-globe"/>her pull quote](https://stuffandnonsense.co.uk/lab/quotes.html#demo-21), I used a cursive typeface, which contrasts with the rest of her typographic design:

```css
blockquote p {
  font-family: "Lobster Two", cursive;
  font-size: 1.5rem;
  font-weight: 700;
  font-style: italic;
  text-transform: unset;
}
```

Then I added an SVG quote mark from the [<VPIcon icon="fas fa-globe"/>Ohno type foundry’s Blazeface](https://ohnotype.co/fonts/blazeface) type family.

```html
<div>
  <img src="img/blazeface-start.svg" alt="" width="48">
</div>
```

I turned its parent division into a flex container and aligned the contents vertically:

```css
blockquote div {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
```

…and used generated content to add a flexible-width horizontal line to fill any remaining space:

```css
blockquote div:first-of-type::after {
  content: "";
  display: block;
  flex: 1;
  height: 5px;
  background-color: #98838e;
}
```

---

## Conclusion

With a little care and creativity, block quotes can become expressive, brand-building elements, as distinctive as a logo or headline. Whether you’re working with quiet, thoughtful quotes or loud, in-your-face testimonials, styling them is an opportunity to reinforce a client’s personality and voice.

Patty Meltt’s quotations became mini design statements. But the same principles apply no matter the brand: get the semantics right, choose styling that fits the tone, and don’t be afraid to experiment with borders, quote marks, and even shapes.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Creative With Quotes",
  "desc": "How do you design block quotes and pull quotes to reflect a brand’s visual identity and help tell its story? Here’s how I do it by styling the HTML blockquote element using borders, decorative quote marks, custom shapes, and a few unexpected properties.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/getting-creative-with-quotes.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
