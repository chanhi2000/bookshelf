---
lang: en-US
title: Beyond CSS Media Queries
description: Article(s) > Beyond CSS Media Queries
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
      content: Article(s) > Beyond CSS Media Queries
    - property: og:description
      content: Beyond CSS Media Queries
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/beyond-css-media-queries.html
prev: /programming/css/articles/README.md
date: 2024-05-16
isOriginal: false
author:
  - name: Juan Diego Rodríguez
    url : https://smashingmagazine.com/author/juan-diego-rodriguez/
cover: https://files.smashing.media/articles/beyond-css-media-queries/beyond-css-media-queries.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Beyond CSS Media Queries"
  desc="Juan Diego Rodriguez explains why media queries still occupy a vital role in responsive layouts; only they are now one tool in a larger toolbox with modern techniques that are best when used together."
  url="https://smashingmagazine.com/2024/05/beyond-css-media-queries/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/beyond-css-media-queries/beyond-css-media-queries.jpg"/>

Many of the latest CSS features released in the past several years are designed to write “smarter” styles that apply when they meet certain conditions, many of which are directly related to responsive design. What does this mean for media queries? Juan Diego Rodriguez explains why media queries still occupy a vital role in responsive layouts; only they are now one tool in a larger toolbox with modern techniques that are best when used together.

Media queries have been around almost as long as CSS itself — and with no flex, no grid, no responsive units, and no math functions, media queries were **the most pragmatic choice** available to make a somewhat responsive website.

In the early 2010s, with the proliferation of mobile devices and the timely publication of [<VPIcon icon="fas fa-globe"/>Ethan Marcotte’s classic article “Responsive Web Design”](https://alistapart.com/article/responsive-web-design/), media queries became much needed for crafting layouts that could morph across screens and devices. Even when the CSS Flexbox and Grid specifications rolled out, media queries for resizing never left.

[<VPIcon icon="fas fa-globe"/>While data on the actual usage of media queries is elusive](https://chromestatus.com/features), the fact that they have *grown over time* with additional features that go well beyond the viewport and into things like user preferences continues to make them a **bellwether ingredient for responsive design**.

Today, there are more options and tools in CSS for establishing layouts that allow page elements to adapt to many different conditions besides the size of the viewport. Some are more widely used — Flexbox and Grid for certain — but also things like responsive length units and, most notably, [**container queries**](/smashingmagazine.com/complete-guide-css-container-queries.md), a concept we will come back to in a bit.

But media queries are still often the *de facto* tool that developers reach for. Maybe it’s muscle memory, inconsistent browser support, or that we’re stuck in our ways, but adoption of the modern approaches we have for responsive interfaces seems slow to take off.

To be clear, **I am all for media queries**. They play a significant role in the work we do above and beyond watching the viewport size to make better and more accessible user experiences based on a user’s OS preferences, the type of input device they’re using, and more.

But should media queries continue to be the gold standard for responsive layouts? As always, it depends, but

> [It is undeniable that media queries have evolved toward accessibility solutions, making space for other CSS features to take responsibility for responsiveness.](https://twitter.com/share?text=%0aIt%20is%20undeniable%20that%20media%20queries%20have%20evolved%20toward%20accessibility%20solutions,%20making%20space%20for%20other%20CSS%20features%20to%20take%20responsibility%20for%20responsiveness.%0a)

---

## The Problem With Media Queries

Media queries seemed like a great solution for most responsive-related problems, but as the web has grown towards bigger and more complex layouts, **the limits of media queries are more prevalent than ever**.

### Problem #1: They Are Viewport-Focused

When writing media query breakpoints where we want the layout to adapt, we only have access to the viewport’s properties, like `width` or `orientation`. Sometimes, all we need is to tweak a font size, and the viewport is our best bud for that, but most times, **context is important**.

Components on a page share space with others and are positioned *relative* to each other according to normal document flow. If all we have access to is the viewport width, knowing exactly where to establish a particular breakpoint becomes a task of compromises where some components will respond well to the adapted layout while others will need additional adjustments at that specific breakpoint.

So, there we are, resizing our browser and looking for the correct breakpoint where our content becomes too squished.

The following example probably has the worst CSS you will see in a while, but it helps to understand one of the problems with media queries.

See the Pen [Old Media Queries [forked] (<VPIcon icon="fa-brands fa-codepen"/>`smashingmag`)](https://codepen.io/smashingmag/pen/xxNwbob) by [Monknow (<VPIcon icon="fa-brands fa-codepen"/>`monknow`)](https://codepen.io/monknow).
https://codepen.io/smashingmag/pen/xxNwbob
Old Media Queries

It’s a pretty embarrassing example, but why exactly is it bad?

If we try to convert the CSS verbatim, it would say, *When the page width is smaller than `600px`, these elements will grow and collapse.* This statement is completely agnostic to the element’s contents or its siblings. What happens if there are more siblings or just one? Or what happens if the element is inside a smaller container? The media query simply lacks the information we need to account for these things, which leads us to a second problem with media queries.

### Problem #2: They Are Difficult To Manage

Nowadays everything is a component. Like nomads, components wander from place to place, sharing space with other components and bringing along their ever-changing content. Again, media queries are completely unaware of the context surrounding a component, and the burden lies on the developer to find that sweet spot for each and every case.

This is cumbersome work because the ideal breakpoint in a media query is [**kind of a hardcoded _magic number**](/css-tricks.com/magic-numbers-in-css.md) that we find by resizing our page, and also because it will differ depending on the context surrounding each component, necessitating multiple media queries. If we want to change an element’s content or container, then the media query needs to change, too.

And where do you manage media queries in your stylesheet? Some developers will plop them in at the end, while others may manage them in partial files and rely on a preprocessor to compile them.

The recent CSS Nesting feature makes things cleaner now that we can attach a media query to a component in the same style rule, but now we have to do that for each and every component in the system, which makes for more and more instances to account for when editing styles. This leads to the next problem with media queries as a responsive silver bullet.

### Problem #3: They Aren’t That Responsive

Most times, we want an element to resize itself fluidly with the screen, but writing a new media query each time a component “breaks” at a specific breakpoint is a lot to manage. If a component becomes too tall on a narrow screen when the viewport is between `960px` and `970px`, do we really need to write a new set of styles that we now have to look after?

I wouldn’t exactly call that *responsive* design but rather some form of adaptive design based on hard numbers for a super-specific situation. There’s no fluidity in that.

---

## You Don’t Need Media Queries (For Resizing)

Fortunately, we’re no longer living in 2012, and there are far better options than media queries, most of them largely adopted and widely supported, led by the likes of [**Flexbox**](/css-tricks.com/snippets-css/a-guide-to-flexbox.md) and [**Grid**](/css-tricks.com/snippets-css/complete-guide-grid.md), [<VPIcon icon="fa-brands fa-firefox"/>responsive units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units#numbers_lengths_and_percentages) and [<VPIcon icon="fa-brands fa-firefox"/>math functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions/Using_CSS_math_functions), while others like [<VPIcon icon="fa-brands fa-firefox"/>container queries](https://developer.mozilla.org/es/docs/Web/CSS/CSS_containment/Container_queries) are on the cusp, but still in relatively early days.

I am not going to act like I discovered hot water by pointing out that these modern CSS features exist and are now commonplace tools used by nearly every CSS developer. However, media queries still find their way into CSS for resizing, particularly in situations where a `clamp()` function or a bit of creative thinking with responsive units would not only accomplish the task but do it better than a media query because they are designed for this purpose.

So rather than me trying to teach all these not-entirely-new CSS features (you are awesome, and I am confident you are already aware of them), my focus is on swapping your existing media queries for modern responsive techniques.

### Flexbox

Flexbox and media queries are often paired together so that Flexbox establishes a layout in a certain direction, and media queries are used to change direction at certain viewport widths.

See the Pen [Using Media Queries with Flex Items [forked]](https://codepen.io/smashingmag/pen/MWdaYNx) by [Monknow](https://codepen.io/monknow).
https://codepen.io/smashingmag/pen/MWdaYNx
Using Media Queries with Flex Items

This very simple — but common — pattern runs into each of the three problems we discussed earlier:

#### 1. It’s viewport-focused

We are only considering the viewport width when choosing where the container changes direction. I found the magic breakpoint number is `700px` after testing, so that is where we would need to establish a new media query.

#### 2. It’s hard to reuse and manage

Since we are only considering the viewport width, the element can’t be used inside a smaller container or may look awkward if the element has different content within it or around it.

#### 3. It isn’t that responsive

We have a breakpoint at `700px`, so devices with narrow screens beyond the threshold may squish the content too much while others get the optimal experience.

If we try to fix it by adding more media queries, we’ll be back at Problem #2. The best solution for this case is to avoid media queries altogether. I would replace them with the `flex` shorthand property that allows the `<article>` elements to grow and shrink based on the available space up to a certain point that’s set to `400px`.

```css
main {
  display: flex;
  flex-flow: row wrap;
}

main article {
  flex: 1 1 400px;
}
```

If we translated the CSS, the former example with the media query says, *When the viewport is smaller than `700px`, I will make the elements wrap. Why? I don’t really know.* Again, the query is aloof to an article’s context. If we translate the updated example, it says something along the lines of, *No matter where the element is, I will try my best to make it `400px` but will adjust it if the available space changes.*

Resize the following demo. See how much nicer the articles flow as the screen changes size?

See the Pen [Flex Items without Media Queries [forked]](https://codepen.io/smashingmag/pen/jOobPNe) by [Monknow](https://codepen.io/monknow).
https://codepen.io/smashingmag/pen/jOobPNe
Flex Items without Media Queries

And we pulled it off with less code and zero magic numbers.

### Grid

The last example is nice, but you may notice that the last flexible item is able to take all the available space in the last row instead of remaining the same size as its siblings. If you want all flexible items to be the same size, you would have to mess with their width and maybe again with media queries. In most cases **where you find yourself slapping a `width` on a flexible item, it’s a sign that you are better off switching to Grid instead**, as we can establish specific tracks for columns and rows.

Fortunately, we can make it happen with just two lines of CSS:

```css
main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}
```

To briefly break down what happened:

- **`auto-fit`** fits as many columns as it can and also expands them if there is any leftover space.
- **`minmax`** specifies a minimum width for the columns, `500px` in this case.

See the Pen [Grid without Media Queries [forked]](https://codepen.io/smashingmag/pen/RwmWPwV) by [Monknow](https://codepen.io/monknow).
https://codepen.io/smashingmag/pen/RwmWPwV
Grid without Media Queries

::: note

Sara Soueidan has what may be [**the best explanation of this approach**](/css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit.md), and it is definitely worth a read. It may just be your new favorite CSS snippet.

:::

### Math Functions & Responsive Units

Math functions and responsive units cover most problems related to resizing elements. They set responsive limits without having to painstakingly define specific breakpoints. They are fully supported in modern browsers and already in widespread use, so we’ll simply summarize the *what* and *why* of what’s available.

Using the **`min()` function**, we can make elements resize depending on a responsive unit like **viewport width (`vw`)** or a relative unit like a percentage to establish an upper limit so they don’t grow too much. This element will try to cover its parent full width but won’t grow past `300px`:

```css
.min {
  height: 400px;
  width: min(100%, 300px);
}
```

We can make the height resize along the width using the `aspect-ratio` property:

```css
.min-and-aspect-ratio {
  aspect-ratio: 1/1; /* or 1 */
  width: min(100%, 300px);
}
```

Using the **`max()` function**, we can apply a lower limit. The following CSS allows the element to increase its size to cover up to half of its parent element but won’t ever shrink below `300px`;

```css
.max {
  height: 400px;
  width: max(50%, 300px);
}
```

It’s a bit of a mind-bender, right? We use `min()` to establish a maximum width and `max()` to establish a minimum.

Then there is the very popular **`clamp()` function** that establishes both maximum and minimum limits — but with the added bonus of setting an “ideal” size as the middle argument. We’re “clamping” values with a range it adheres to while attempting to hit that ideal target.

The element in the following demo tries to cover the full available width of its parent element but will not go above `300px` or below `200px`.

See the Pen [math functions [forked]](https://codepen.io/smashingmag/pen/wvbKaBj) by [Monknow](https://codepen.io/monknow).
https://codepen.io/smashingmag/pen/wvbKaBj
math functions


### It Is A Combination

Making a website that looks great no matter the device relies on more than responsive units or math functions alone. We need the combination of all techniques to create a seamless responsive experience. You can sort of think of it like the [**Performance API in JavaScript**](/smashingmagazine.com/reporting-core-web-vitals-performance-api.md) that is a group of standards that work together for performance-related work.

**What we have is a group of CSS specifications built around responsive design. They aren’t necessarily** **_replacing_** **CSS media queries but are additive and designed to work together for the best possible coverage.**

For example, we may want a `font-size` value to increase or decrease depending on the width of the viewport. Easy enough with media queries, but now we have additional ways to approach this that could be more efficient or maintainable depending on your project.

We certainly could use **media queries** to update the `font-size` value at specific browser widths. We’d likely need to write more than one to get the right size at each breakpoint, but it is possible and valid.

See the Pen [Resizing text using media queries [forked]](https://codepen.io/smashingmag/pen/oNRjXXz) by [Monknow](https://codepen.io/monknow).
Resizing text using media queries
https://codepen.io/smashingmag/pen/oNRjXXz

Instead of updating the `font-size` with fixed pixels at multiple breakpoints, we can reach for responsive length units instead. For example, the `vw` unit is relative to the viewport width, where each unit represents 1% of the current browser width.

But we can go further than that because viewport units alone will not save us from font sizes that are far too small and large for their contexts. Let’s combine them with the `clamp()` function to establish minimum and maximum limits with our ideal size defined.

See the Pen [Resizing text individually using clamp() and vw [forked]](https://codepen.io/smashingmag/pen/yLWYNNw) by [Monknow](https://codepen.io/monknow).

But wait! We can improve this even more by declaring this directly on the `<html>` element’s `font-size`, making all other fonts resize by the same factor. Then, using the `rem` unit, we can write how big or small each element `font-size` should be or opt out and use `clamp(),` or even fixed pixel units in specific elements.

> It’s worth noting that the difference between `rem` and `em` units is that the former is relative to the “root” element, i.e., `<html>`, while the latter is relative to the selector’s parent element.

See the Pen [Resizing text by the same factor [forked]](https://codepen.io/smashingmag/pen/YzbyXyZ) by [Monknow](https://codepen.io/monknow).

So, yes, none of this is meant to be used in isolation or as a one-to-one replacement for media queries. **Building responsive interfaces takes a village**, so to speak, and we have a knapsack of hammers, wrenches, nails, and screws we can use to put it all together.

---

## Hello, Container Queries

Media queries are adept at modifying layouts on a page-wide basis. Take, for example, a shopping cart. When the viewport width is wide enough to accommodate it, we can display the included products in a wide `<table>` where they can breathe comfortably.

[![Cart UI on desktop](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/beyond-css-media-queries/cart-desktop.png)](https://files.smashing.media/articles/beyond-css-media-queries/cart-desktop.png)

Cart UI on desktop. ([Large preview](https://files.smashing.media/articles/beyond-css-media-queries/cart-desktop.png))

That same layout in mobile simply does not work. Tables have their own set of responsive challenges as it is, and while there is [no shortage of solutions](https://css-tricks.com/responsive-data-table-roundup/), we may be able to consider another layout using modern techniques that are way less engineered.

[![Cart UI on mobile](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/beyond-css-media-queries/cart-mobile.png)](https://files.smashing.media/articles/beyond-css-media-queries/cart-mobile.png)

Cart UI on mobile. ([Large preview](https://files.smashing.media/articles/beyond-css-media-queries/cart-mobile.png))

We are doing much more than simply changing the width or height of elements! Border colors, element visibility, and flex directions need to be changed, and it can only be done through a media query, right? Well, even in cases where we have to completely switch a layout depending on the viewport size, we can better achieve it with *container queries*.

> [Again, Problem #1 of media queries is that they only consider the viewport size when making decisions and are completely ignorant of an element’s surrounding context.](https://twitter.com/share?text=%0aAgain,%20Problem%20#1%20of%20media%20queries%20is%20that%20they%20only%20consider%20the%20viewport%20size%20when%20making%20decisions%20and%20are%20completely%20ignorant%20of%20an%20element%e2%80%99s%20surrounding%20context.%0a&url=https://smashingmagazine.com%2f2024%2f05%2fbeyond-css-media-queries%2f)
> 
> “

That may not be a big concern if all we’re talking about is a series of elements that are allowed to take up the full page width because the full page width is very much related to the viewport size, making media queries a perfectly fine choice for making adjustments.

See the Pen [Responsive Cards Using Media Queries [forked]](https://codepen.io/smashingmag/pen/ExzVjPj) by [Monknow](https://codepen.io/monknow).

But say we want to display those same elements as part of a multi-column layout where they are included in a narrow column as an `<aside>` next to a larger column containing a `<main>` element. Now we’re in trouble.

A more traditional solution is to write a series of media queries depending on where the element is used and where its content breaks. But media queries completely miss the relationship between the `<main>` and `<aside>` elements, which is a big deal since the size of one influences the size of the other according to normal document flow.

See the Pen [Responsive Cards Using Media Queries Inside Container [forked]](https://codepen.io/smashingmag/pen/gOJapPo) by [Monknow](https://codepen.io/monknow).

The `.cards` element is in the context of the `<aside>` element and is squished as a result of being in a narrow column. What would be great is to change the layout of each `.card` component when the `.cards` element that contains them reaches a certain size rather than when the viewport is a certain size.

That’s where **container queries** come into play, allowing us to conditionally apply styles based on an element’s size. We register an element as a “container,” which, in our current example, is the unordered list containing the series of `.card` components. We’re essentially giving the parent selector a great deal of power to influence the current layout.

```css
.cards {
  container-name: cards;
}
```

Container queries monitor an element by its size, and we need to tell the browser exactly how to interpret that size by giving `.cards` a `container-type`, which can be the container’s `size` (i.e., in the block and inline directions) or its `inline-size` (i.e., the total length in the inline direction). There’s a `normal` value that removes sizing considerations but allows the element to be queried by its styles.

```css
.cards {
  container-name: cards;
  container-type: inline-size;
}
```

We can simplify things down a bit using the `container` shorthand property.

```css
.cards {
  container: cards / inline-size;
}
```

Now, we can adjust the layout of the `.card` components when the `.cards` container is a certain inline size. Container queries use the same syntax as media queries but use the `@container` at-rule instead of `@media`.

```css
.cards {
  container: cards / inline-size;
}

@container cards (width < 700px) {
  .cards li {
    flex-flow: column;
  }
}
```

Now, each `.card` is a flexible container that flows in the `column` direction when the width of the `.cards` container is less than `700px`. Any wider than that, we have the same to lay them out in a `row` direction instead.

See the Pen [Responsive Cards Using Container Queries [forked]](https://codepen.io/smashingmag/pen/VwOvLap) by [Monknow](https://codepen.io/monknow).

**Style queries** are a cousin to container queries in the sense that we can query the container’s styles and conditionally apply style changes to its children, say changing a child element’s `color` to white when the container’s `background-color` is set to a dark color. We’re still in the early days, and support for style queries and [browser support is still evolving](https://caniuse.com/css-container-queries-style).

I hope this gives you a sense of how amazing it is that we have this **context-aware way of establishing responsive layouts**. Containers are a completely new idea in CSS (although we’ve used the term synonymously with “parent element” for ages) that is novel and elegant.

---

## So, Are Media Queries Useless?

*NO!* While media queries have been the go-to solution for responsive design, their limitations are glaringly obvious now that we have more robust tools in CSS that are designed to solve those limits.

That doesn’t make media queries obsolete — merely a different tool that’s part of a larger toolset for building responsive interfaces. Besides, media queries still address vital accessibility concerns thanks to their ability to recognize a user’s visual and motion preferences — among other settings — at the operating system level.

So, yes, *keep using media queries!* But maybe reach for them sparingly since CSS has a lot more to offer us.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Beyond CSS Media Queries",
  "desc": "Juan Diego Rodriguez explains why media queries still occupy a vital role in responsive layouts; only they are now one tool in a larger toolbox with modern techniques that are best when used together.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/beyond-css-media-queries.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

