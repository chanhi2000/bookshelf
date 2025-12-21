---
lang: en-US
title: "Revisiting CSS Multi-Column Layout"
description: "Article(s) > Revisiting CSS Multi-Column Layout"
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
      content: "Article(s) > Revisiting CSS Multi-Column Layout"
    - property: og:description
      content: "Revisiting CSS Multi-Column Layout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/revisiting-css-multi-column-layout.html
prev: /programming/css/articles/README.md
date: 2025-01-27
isOriginal: false
author:
  - name: Andy Clarke
    url : https://css-tricks.com/author/andyclarke/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/01/2025-01-15-4.webp
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
  name="Revisiting CSS Multi-Column Layout"
  desc="After 20 years since Andy Clarke first published his book about Multi-Column Layout in CSS, he's back to encourage a fresh look at CSS columns for enhanced readability and design flexibility."
  url="https://css-tricks.com/revisiting-css-multi-column-layout"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/01/2025-01-15-4.webp"/>

Honestly, it’s difficult for me to come to terms with, but almost 20 years have passed since I wrote my first book, *Transcending CSS*. In it, I explained how and why to use what was the then-emerging [<VPIcon icon="iconfont icon-w3c"/>Multi-Column Layout](https://w3.org/TR/css-multicol-1/) [<VPIcon icon="iconfont icon-w3c"/>module](https://w3.org/TR/css-multicol-1/).

::: tip Hint

I published an updated version, *[Transcending CSS Revisited](https://stuffandnonsense.co.uk/transcending-css-revisited/index.html)*, which is free to read online.

:::

Perhaps because, before the web, I’d worked in print, I was over-excited at the prospect of dividing content into columns without needing extra markup purely there for presentation. I’ve used Multi-Column Layout regularly ever since. Yet, CSS Columns remains one of the most underused CSS layout tools. I wonder why that is?

---

## Holes in the specification

For a long time, there were, and still are, plenty of holes in Multi-Column Layout. As Rachel Andrew — now a specification editor — [**noted in her article**](https://smashingmagazine.com/2019/01/css-multiple-column-layout-multicol/) five years ago:
<!-- TODO: /smashingmagazine.com/css-multiple-column-layout-multicol.md -->

::: info When And How To Use CSS Multi-Column Layout <VPIcon icon="fas fa-globe"/><code>smashingmagazine.com</code>

> “The column boxes created when you use one of the column properties can’t be targeted. You can’t address them with JavaScript, nor can you style an individual box to give it a background colour or adjust the padding and margins. All of the column boxes will be the same size. The only thing you can do is add a rule between columns.”

:::

She’s right. And that’s *still* true. You can’t style columns, for example, by alternating background colours using some sort of `:nth-column()` pseudo-class selector. You can add a [<VPIcon icon="iconfont icon-css-tricks"/>`column-rule`](https://css-tricks.com/almanac/properties/c/column-rule/) between columns using [<VPIcon icon="iconfont icon-css-tricks"/>`border-style`](https://css-tricks.com/almanac/properties/b/border/) values like `dashed`, `dotted`, and `solid`, and who can forget those evergreen `groove` and `ridge` styles? But you can’t apply [<VPIcon icon="iconfont icon-css-tricks"/>`border-image`](https://css-tricks.com/almanac/properties/b/border-image/) values to a `column-rule`, which seems odd as they were introduced at roughly the same time. The Multi-Column Layout is imperfect, and there’s plenty I wish it could do in the future, but that doesn’t explain why most people ignore what it can do today.

---

## Patchy browser implementation for a long time

Legacy browsers simply ignored the column properties they couldn’t process. But, when Multi-Column Layout was first launched, most designers and developers had yet to accept that websites needn’t look the same in every browser.

Early on, support for Multi-Column Layout was patchy. However, browsers caught up over time, and although there are still discrepancies — especially in controlling content breaks — Multi-Column Layout has now been implemented widely. Yet, for some reason, many designers and developers I speak to feel that CSS Columns remain broken. Yes, there’s plenty that browser makers should do to improve their implementations, but that shouldn’t prevent people from using the solid parts today.

---

## Readability and usability with scrolling

Maybe the main reason designers and developers haven’t embraced Multi-Column Layout as they have CSS Grid and Flexbox isn’t in the specification or its implementation but in its usability. Rachel pointed this out in [**her article**](https://smashingmagazine.com/2019/01/css-multiple-column-layout-multicol):

::: info When And How To Use CSS Multi-Column Layout <VPIcon icon="fas fa-globe"/><code>smashingmagazine.com</code>

> “One reason we don’t see multicol used much on the web is that it would be very easy to end up with a reading experience which made the reader scroll in the block dimension. That would mean scrolling up and down vertically for those of us using English or another vertical writing mode. This is not a good reading experience!”

:::

That’s true. No one would enjoy repeatedly scrolling up and down to read a long passage of content set in columns. She [**went on**](https://smashingmagazine.com/2019/01/css-multiple-column-layout-multicol):

::: info When And How To Use CSS Multi-Column Layout <VPIcon icon="fas fa-globe"/><code>smashingmagazine.com</code>

> “Neither of these things is ideal, and using multicol on the web is something we need to think about very carefully in terms of the amount of content we might be aiming to flow into our columns.”

:::

But, let’s face it, thinking very carefully is what designers and developers should always be doing.

Sure, if you’re dumb enough to dump a large amount of content into columns without thinking about its design, you’ll end up serving readers a poor experience. But why would you do that when headlines, images, and quotes can span columns and reset the column flow, instantly improving readability? Add to that container queries and newer unit values for text sizing, and there really isn’t a reason to avoid using Multi-Column Layout any longer.

---

## A brief refresher on properties and values

Let’s run through a refresher. There are two ways to flow content into multiple columns; first, by defining the number of columns you need using the [`column-count` (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/c/column-count/) property:

<CodePen
  user="malarkey"
  slug-hash="zxOaogR"
  title="Multi-column Layout example 1"
  :default-tab="['css','result']"
  :theme="dark"/>

Second, and often best, is specifying the column width, leaving a browser to decide how many columns will fit along the inline axis. For example, I’m using [`column-width` (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/c/column-width/) to specify that my columns are over `18rem`. A browser creates as many `18rem` columns as possible to fit and then shares any remaining space between them.

<CodePen
  user="malarkey"
  slug-hash="PwYaWqw"
  title="Multi-column Layout example 2"
  :default-tab="['css','result']"
  :theme="dark"/>

Then, there is the gutter (or [`column-gap` (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/c/column-gap/)) between columns, which you can specify using any length unit. I prefer using rem units to maintain the gutters’ relationship to the text size, but if your gutters need to be `1em`, you can leave this out, as that’s a browser’s default gap.

<CodePen
  user="malarkey"
  slug-hash="EaYRZjL"
  title="Multi-column Layout example 3"
  :default-tab="['css','result']"
  :theme="dark"/>

The final column property is that divider (or [`column-rule` (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/c/column-rule/)) to the gutters, which adds visual separation between columns. Again, you can set a thickness and use `border-style` values like `dashed`, `dotted`, and `solid`.

<CodePen
  user="malarkey"
  slug-hash="wBwXgKM"
  title="Multi-column Layout example 4"
  :default-tab="['css','result']"
  :theme="dark"/>

These examples will be seen whenever you encounter a Multi-Column Layout tutorial, [including CSS-Tricks’ own Almanac (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/c/columns/). The Multi-Column Layout syntax is one of the simplest in the suite of CSS layout tools, which is another reason why there are few reasons not to use it.

---

## Multi-Column Layout is even more relevant today

When I wrote *Transcending CSS* and first explained the emerging Multi-Column Layout, there were no rem or viewport units, no [`:has()`](https://css-tricks.com/almanac/pseudo-selectors/h/has/) or other advanced selectors, no [container queries,](https://css-tricks.com/css-container-queries/) and no routine use of [media queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/) because responsive design hadn’t been invented.

We didn’t have `calc()` or `clamp()` for adjusting text sizes, and there was no CSS Grid or Flexible Box Layout for precise control over a layout. Now we do, and all these properties help to make Multi-Column Layout even more relevant today.

Now, you can use rem or viewport units combined with `calc()` and `clamp()` to adapt the text size inside CSS Columns. You can use `:has()` to specify when columns are created, depending on the type of content they contain. Or you might use container queries to implement several columns only when a container is large enough to display them. Of course, you can also combine a Multi-Column Layout with CSS Grid or Flexible Box Layout for even more imaginative layout designs.

---

## Using Multi-Column Layout today

![Patty Meltt is an up-and-coming country music sensation. She’s not real, but the challenges of designing and developing websites like hers are.](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_10BD6DD78E1560F01EE83A8FD0F91ED836542257C0117DD8A20FDBB79DE2400F_1736973374924_2025-01-15-1.webp?ssl=1)

My challenge was to implement a flexible article layout without media queries which adapts not only to screen size but also whether or not a `<figure>` is present. To improve the readability of running text in what would potentially be too-long lines, it should be set in columns to narrow the measure. And, as a final touch, the text size should adapt to the width of the container, not the viewport.

![Article with no `<figure>` element. What would potentially be too-long lines of text are set in columns to improve readability by narrowing the measure.](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_10BD6DD78E1560F01EE83A8FD0F91ED836542257C0117DD8A20FDBB79DE2400F_1736973401564_2025-01-15-3.webp?ssl=1)

![Article containing a `<figure>` element. No column text is needed for this narrower measure.](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_10BD6DD78E1560F01EE83A8FD0F91ED836542257C0117DD8A20FDBB79DE2400F_1736973362450_2025-01-15-2.webp?ssl=1)

The HTML for this layout is rudimentary. One `<section>`, one `<main>`, and one `<figure>` (or not:)

```html
<section>
  <main>
    <h1>About Patty</h1>
    <p>…</p>
  </main>

  <figure>
    <img>
  </figure>
</section>
```

I started by adding Multi-Column Layout styles to the `<main>` element using the `column-width` property to set the width of each column to `40ch` (characters). The `max-width` and automatic inline margins reduce the content width and center it in the viewport:

```css
main {
  margin-inline: auto;
  max-width: 100ch;
  column-width: 40ch;
  column-gap: 3rem;
  column-rule: .5px solid #98838F;
}
```

Next, I applied a flexible box layout to the `<section>` only if it `:has()` a direct descendant which is a `<figure>`:

```css
section:has(> figure) {
  display: flex;
  flex-wrap: wrap;
  gap: 0 3rem;
}
```

This next `min-width: min(100%, 30rem)` — applied to both the `<main>` and `<figure>` — is a combination of the `min-width` property and the `min()` CSS function. The `min()` function allows you to specify two or more values, and a browser will choose the smallest value from them. This is incredibly useful for responsive layouts where you want to control the size of an element based on different conditions:

```css
section:has(> figure) main {
  flex: 1;
  margin-inline: 0;
  min-width: min(100%, 30rem);
}

section:has(> figure) figure {
  flex: 4;
  min-width: min(100%, 30rem);
}
```

What’s efficient about this implementation is that Multi-Column Layout styles are applied throughout, with no need for media queries to switch them on or off.

Adjusting text size in relation to column width helps improve readability. This has only recently become easy to implement with the introduction of container queries, their associated values including `cqi`, `cqw`, `cqmin`, and `cqmax`. And the `clamp()` function. Fortunately, you don’t have to work out these text sizes manually as ClearLeft’s [Utopia](https://utopia.fyi/type/) will do the job for you.

My headlines and paragraph sizes are clamped to their minimum and maximum rem sizes and between them text is fluid depending on their container’s inline size:

```css
h1 { font-size: clamp(5.6526rem, 5.4068rem + 1.2288cqi, 6.3592rem); }

h2 { font-size: clamp(1.9994rem, 1.9125rem + 0.4347cqi, 2.2493rem); }

p { font-size: clamp(1rem, 0.9565rem + 0.2174cqi, 1.125rem); }
```

So, to specify the `<main>` as the container on which those text sizes are based, I applied a container query for its inline size:

```css
main {
  container-type: inline-size;
}
```

Open the final result in a desktop browser, when you’re in front of one. It’s a flexible article layout without media queries which adapts to screen size and the presence of a `<figure>`. Multi-Column Layout sets text in columns to narrow the measure and the text size adapts to the width of its container, not the viewport.

<CodePen
  user="malarkey"
  slug-hash="PwYaWWP"
  title="Multi-column Layout example 5"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Modern CSS is solving many prior problems

![Structure content with spanning elements which will restart the flow of columns and prevent people from scrolling long distances.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/01/s_10BD6DD78E1560F01EE83A8FD0F91ED836542257C0117DD8A20FDBB79DE2400F_1736982223430_2025-01-15-4-1024x576.webp?resize=1024%2C576&ssl=1)

![Prevent figures from dividing their images and captions between columns.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/01/s_10BD6DD78E1560F01EE83A8FD0F91ED836542257C0117DD8A20FDBB79DE2400F_1736982242379_2025-01-15-5-1024x576.webp?resize=1024%2C576&ssl=1)

Almost every article I’ve ever read about Multi-Column Layout focuses on its flaws, especially usability. CSS-Tricks’ own Geoff Graham even mentioned the scrolling up and down issue when he asked, [**“When Do You Use CSS Columns?”**](/css-tricks.com/when-do-you-use-css-columns.md)

::: info When Do You Use CSS Columns? (<VPIcon icon="iconfont icon-css-tricks"/><code>css-tricks.com</code>)

> “But an entire long-form article split into columns? I love it in newspapers but am hesitant to scroll down a webpage to read one column, only to scroll back up to do it again.”

:::

Fortunately, the `column-span` property — which enables headlines, images, and quotes to span columns, resets the column flow, and instantly improves readability — now has solid support in browsers:

```css
h1, h2, blockquote {
  column-span: all; 
}
```

But the solution to the scrolling up and down issue isn’t purely technical. It also requires content design. This means that content creators and designers must think carefully about the frequency and type of spanning elements, dividing a Multi-Column Layout into shallower sections, reducing the need to scroll and improving someone’s reading experience.

Another prior problem was preventing headlines from becoming detached from their content and figures, dividing their images and captions between columns. Thankfully, the [`break-after` (<VPIcon icon="iconfont icon-css-tricks"/>`almanac`)](https://css-tricks.com/almanac/properties/b/break-after/)` property now also has widespread support, so orphaned images and captions are now a thing of the past:

```css
figure {
  break-after: column;
}
```

Open this final example in a desktop browser:

<CodePen
  user="malarkey"
  slug-hash="azoKJRN"
  title="Multi-column Layout example 6"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## You should take a fresh look at Multi-Column Layout

Multi-Column Layout isn’t a shiny new tool. In fact, it remains one of the most underused layout tools in CSS. It’s had, and still has, plenty of problems, but they haven’t reduced its usefulness or its ability to add an extra level of refinement to a product or website’s design. Whether you haven’t used Multi-Column Layout in a while or maybe have never tried it, now’s the time to take a fresh look at Multi-Column Layout.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Revisiting CSS Multi-Column Layout",
  "desc": "After 20 years since Andy Clarke first published his book about Multi-Column Layout in CSS, he's back to encourage a fresh look at CSS columns for enhanced readability and design flexibility.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/revisiting-css-multi-column-layout.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
