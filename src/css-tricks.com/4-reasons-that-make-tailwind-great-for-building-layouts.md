---
lang: en-US
title: "4 Reasons That Make Tailwind Great for Building Layouts"
description: "Article(s) > 4 Reasons That Make Tailwind Great for Building Layouts"
icon: iconfont icon-tailwindcss
category:
  - CSS
  - TailwindCSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - tailwindcss
  - tailwind-css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 4 Reasons That Make Tailwind Great for Building Layouts"
    - property: og:description
      content: "4 Reasons That Make Tailwind Great for Building Layouts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/4-reasons-that-make-tailwind-great-for-building-layouts.html
prev: /programming/css-tailwind/articles/README.md
date: 2026-03-16
isOriginal: false
author:
  - name: Zell Liew
    url: https://css-tricks.com/author/zellwk/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/tailwind-paint.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="4 Reasons That Make Tailwind Great for Building Layouts"
  desc="Tailwind is really great for making layouts and there are many reasons why. Zell Liew looks at four specific examples of common use cases."
  url="https://css-tricks.com/4-reasons-that-make-tailwind-great-for-building-layouts"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/02/tailwind-paint.jpg"/>

When I talk about layouts, I’m referring to how you place items on a page. The CSS properties that are widely used here include:

- `display` — often `grid` or `flex` nowadays
- `margin`
- `padding`
- `width`
- `height`
- `position`
- `top`, `left`, `bottom`, `right`

I often include `border-width` as a minor item in this list as well.

At this point, there’s only one thing I’d like to say.

**Tailwind is really great for making layouts.**

There are many reasons why.

---

## First: Layout styles are highly dependent on the HTML structure

When we shift layouts into CSS, we lose the mental structure and it takes effort to re-establish them. Imagine the following three-column grid in HTML and CSS:

```html
<div class="grid">
  <div class="grid-item"></div>
  <div class="grid-item"></div>
</div>
```

```scss
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;

  .grid-item:first-child {
    grid-column: span 2
  }

  .grid-item:last-child {
    grid-column: span 1
  }
}
```

![Two blue rectangles side-by-side illustrating a two-column layout where the left column is twice the width of the right column.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/content-sidebar.png?resize=739%2C90)

Now cover the HTML structure and just read the CSS. As you do that, notice you need to exert effort to imagine the HTML structure that this applies to.

Now imagine the same, but built with [<VPIcon icon="iconfont icon-tailwindcss"/>Tailwind utilities](https://tailwindcss.com/docs/styling-with-utility-classes):

```html
<div class="grid grid-cols-3">
  <div class="col-span-2"></div>
  <div class="col-span-1"></div>
</div>
```

You might almost begin to see the layout manifest in your eyes without seeing the actual output. It’s pretty clear: A three-column grid, first item spans two columns while the second one spans one column.

But `grid-cols-3` and `col-span-2` are kinda weird and foreign-looking because we’re trying to parse Tailwind’s method of writing CSS.

Now, watch what happens when we shift the syntax out of the way and use CSS variables to define the layout instead. The layout becomes crystal clear immediately:

```html
<div class="grid-simple [--cols:3]">
  <div class="[--span:2]"> ... </div>
  <div class="[--span:1]"> ... </div>
</div>
```

![Two blue rectangles side-by-side illustrating a two-column layout where the left column is twice the width of the right column.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/content-sidebar.png?resize=739%2C90)

Same three-column layout.

But it makes the layout much easier to write, read, and visualize. It also has other benefits, but [I’ll let you explore its documentation](https://splendidlabz.com/docs/layouts/macro-layouts/grid-simple/#features) instead of explaining it here.

For now, let’s move on.

### Why not use `2fr 1fr`?

It makes sense to write `2fr 1fr` for a three-column grid, doesn’t it?

```css
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
```

Unfortunately, it won’t work. This is because `fr` is calculated based on the available space after subtracting away the grid’s gutters (or gap).

Since `2fr 1fr` only contains two columns, the output from `2fr 1fr` will be different from a standard three-column grid.

![Three examples of multi-column layouts stacked. The first is an equal three-column layout, the second and third are two columns where the left column is double the width of the right column.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/2fr-1fr-comparison.png?resize=739%2C397)

Alright. Let’s continue with the reasons that make Tailwind great for building layouts.

---

## Second: No need to name layouts

I think layouts are the hardest things to name. I rarely come up with better names than:

- Number + Columns, e.g. `.two-columns`
- Semantic names, e.g. `.content-sidebar`

But these names don’t do the layout justice. You can’t really tell what’s going on, even if you see `.two-columns`, because `.two-columns` can mean a variety of things:

- Two equal columns
- Two columns with `1fr auto`
- Two columns with `auto 1fr`
- Two columns that spans total of 7 “columns” and the first object takes up 4 columns while the second takes up 3…

You can already see me tripping up when I try to explain that last one there…

Instead of forcing ourselves to name the layout, we can let the numbers do the talking — then the whole structure becomes very clear.

```html
<div class="grid-simple [--cols:7]">
  <div class="[--span:4]"> ... </div>
  <div class="[--span:3]"> ... </div>
</div>
```

The variables paint a picture.

![Example of a seven-column layout above a two-column layout with equally-sized columns.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/4-3.png?resize=739%2C213)

---

## Third: Layout requirements can change depending on context

A “two-column” layout might have different properties when used in different contexts. Here’s an example.

![Two two-by-two layouts next to each other. In both cases, the third item wraps to the second line, followed by the fourth item.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/proximity-gap.png?resize=735%2C156&ssl=1)

In this example, you can see that:

- A *larger* `gap` is used *between* the I and J groups.
- A *smaller* `gap` is used *within* the I and J groups.

The difference in `gap` sizes is subtle, but used to show that the items are of separate groups.

Here’s an example where this concept is used in a real project. You can see the difference between the gap used within the newsletter container and the gap used between the newsletter and quote containers.

![A two-column layout for a newsletter signup component with the form as the left column that is wider than the width of the right column, containing content.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/different-gap.png?resize=1301%2C703)

If this sort of layout is only used in one place, we don’t have to create a modifier class just to change the `gap` value. We can change it directly.

```html
<div class="grid-simple [--cols:2] gap-8">
  <div class="grid-simple gap-4 [--cols:2]"> ... </div>
  <div class="grid-simple gap-4 [--cols:2]"> ... </div>
</div>
```

### Another common example

Let’s say you have a heading for a marketing section. The heading would look nicer if you are able to vary its `max-width` so the text isn’t orphaned.

`text-balance` might work here, but this is often nicer with manual positioning.

Without Tailwind, you might write an inline style for it.

```html
<h2 class="h2" style="max-width: 12em;">
  Your subscription has been confirmed
</h2>
```

With Tailwind, you can specify the `max-width` in a more terse way:

```html
<h2 class="h2 max-w-[12em]">
  Your subscription has been confirmed
</h2>
```

![A centered heading in black that says Your subscription has been confirmed.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/heading.png?resize=734%2C103&ssl=1)

---

## Fourth: Responsive variants can be created on the fly

*“At which breakpoint would you change your layouts?”* is another factor you’d want to consider when designing your layouts. I shall term this the **responsive factor** for this section.

Most likely, similar layouts should have the same responsive factor. In that case, it makes sense to group the layouts together into a named layout.

```scss
.two-column {
  @apply grid-simple;
  /* --cols: 1 is the default */

  @media (width >= 800px) {
    --cols:2;
  }
}
```

However, you may have layouts where you want two-column grids on a mobile and a much larger column count on tablets and desktops. This layout style is commonly used in a site footer component.

Since the footer grid is unique, we can add Tailwind’s responsive variants and change the layout on the fly.

```html
<div class="grid-simple [--cols:2] md:[--cols:5]">
  <!-- span set to 1 by default so there's no need to specify them -->
  <div> ... </div>
  <div> ... </div>
  <div> ... </div>
  <div> ... </div>
  <div> ... </div>
  <div> ... </div>
</div>
```

![Example of a footer that adapts to the screen size. It goes from a two-column layout on small screens to a five-column layout on wider screens.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/footer.png?resize=769%2C339)

Again, we get to create a new layout on the fly without creating an additional modifier class — this keeps our CSS clean and focused.

---

## How to best use Tailwind

This article is a sample lesson from my course, [<VPIcon icon="fas fa-globe"/>Unorthodox Tailwind](https://magicaldevschool.com/courses/unorthodox-tailwind/), where I show you how to use Tailwind and CSS synergistically.

Personally, I think the best way to use Tailwind is not to litter your HTML with Tailwind utilities, but to create utilities that let you create layouts and styles easily.

I cover much more of that in the course if you’re interested to find out more!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "4 Reasons That Make Tailwind Great for Building Layouts",
  "desc": "Tailwind is really great for making layouts and there are many reasons why. Zell Liew looks at four specific examples of common use cases.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/4-reasons-that-make-tailwind-great-for-building-layouts.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
