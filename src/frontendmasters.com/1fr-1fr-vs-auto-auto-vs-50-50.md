---
lang: en-US
title: "1fr 1fr vs auto auto vs 50% 50%"
description: "Article(s) > 1fr 1fr vs auto auto vs 50% 50%"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > 1fr 1fr vs auto auto vs 50% 50%"
    - property: og:description
      content: "1fr 1fr vs auto auto vs 50% 50%"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/1fr-1fr-vs-auto-auto-vs-50-50.html
prev: /programming/css/articles/README.md
date: 2025-06-11
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6058
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
  name="1fr 1fr vs auto auto vs 50% 50%"
  desc="There are several different ways to do equal width columns. But some are, uh, more equal than others."
  url="https://frontendmasters.com/blog/1fr-1fr-vs-auto-auto-vs-50-50/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6058"/>

Are these columns the same?

```css
.grid {
  display: grid;

  grid-template-columns: 1fr  1fr;
  grid-template-columns: 50%  50%;
  grid-template-columns: auto auto;
}
```

I mean, obviously they aren’t literally the same, but you also probably won’t be surprised that they have different behavior as well. And yet…. they *do* kinda basically do the same thing. Two equal width columns.

![A grid layout showcasing three different configurations: two columns with '50% 50%' width, two columns with 'auto auto', and two columns with '1fr 1fr', each containing minimal text.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.26.35%E2%80%AFAM.png?resize=1004%2C686&ssl=1)

Above is a screenshot of three different grids, using each of those different `grid-template-columns` I showed above. And indeed, they all seem to do the same thing: two equal width columns. I’ve put a red line down the middle and right edge of the container for illustration purposes.

But things start to change as we do different things. For instance, if we apply some `gap` between the columns. Here’s the examples with `16px` of `gap` applied:

![Screenshot showing three grid layouts side by side: the first has two equal width columns labeled '50% 50%', the second uses 'auto auto', and the third shows '1fr 1fr'. Each column contains a short text saying 'Very little text.' with a red line marking the division between columns. Gap is applied, so the first of them extends past the parent width.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.29.11%E2%80%AFAM.png?resize=1024%2C754&ssl=1)

Now the grid with `grid-template-columns: 50% 50%;` is busting outside of the container element. Sometimes we think of % units as being quite flexible, but here we’re rather forcefully saying each columns needs to be 50% as wide as it’s parent element, so the width of the whole grid is actually `50% + 16px + 50%` which is *wider than 100%.*

This is pretty awkward and largely why you don’t see columns set up using % values all that much. But it still can be valuable! The “sturdiness” of setting a column that way can be desirable, as we’ll see. If we wanted to prevent the “blowout”, we could account for the gap ourselves.

```css
.grid {
  display: grid;

  /* Make each column smaller equally by half the gap */
  grid-template-columns: repeat(2, 50% - calc(16px / 2));
}
```

Another unusual situation can be with `auto`. That keyword has some rather special behavior, and it may be worth reading [<VPIcon icon="fa-brands fa-firefox" />the whole bit that MDN has to say](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#auto). What’s helpful to me though is to think about the “intrinsic size” of the content inside that `auto` column. That can be easy to know. If a column contains only an image that is 200px wide, the intrinsic size is 200px, and the auto column will be 200px. It’s tricky though when the content is text and there are multiple `auto` columns with *different* text.

![A comparison of three grid layouts, showcasing the use of different CSS properties for column widths: 50% 50%, auto auto, and 1fr 1fr, with sample text dimensions. The extra text in the first column has forced the auto column to be a bit wider than the 2nd column.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.35.04%E2%80%AFAM.png?resize=701%2C1024&ssl=1)

See above how the `auto` column with more text is larger than the `auto` column with less text. I have no idea how to explain how that works, but it does make some intuitive sense after a while, even if it feels a bit dangerous to use since it’s hard to know exactly what it’s going to do with arbitrary text.

Let’s consider an `<img>` within the columns that is a bit wider than the current width of the columns. Each of the column setups we have behaves a bit differently here.

![Screenshot comparing three grid layouts: '50% 50%', 'auto auto', and '1fr 1fr', each displaying an image of a daisy with minimal text on the right.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.42.29%E2%80%AFAM.png?resize=726%2C1024&ssl=1)

The sturdy `50%` column remain in place, and the image overflows it. The `auto` column grows, but not only to contain the image but a bit wider, as if it’s balancing the intrinsic weights across both columns (or something?).

The column using `fr` units (which essentially mean “fractions of the remaining space”) grows to contain the image, but then no more, and it’s sibling `fr` columns takes up the remaining space.

Interestingly, if we do the common thing and constrain the width of the image to a `max-width: 100%`, the `50%` and `1fr` columns come back down to half width.

![Screenshot showcasing three different grid layouts with two equal width columns labeled '50% 50%', 'auto auto', and '1fr 1fr'. Each layout includes an image of a flower and text indicating 'Very little text'.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.45.51%E2%80%AFAM.png?resize=786%2C1024&ssl=1)

Generally, I’d say that `fr` units for columns behave the most intuitively and predictably and that’s why you see more grid setups using them.

But `fr` units are subject to “blowouts” which can be surprising. A way to think about it is that, however you’ve sized a column, the minimum width of that column is essentially `auto`, and that can prevent it from staying sized how you want it to when there is content that pushes it wider. For instance, putting a long URL (no dashes and no spaces in a URL means it can’t “break” or wrap naturally).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.56.49%E2%80%AFAM.png?resize=1024%2C603&ssl=1)

You can see the columns blowing out in the `auto` and `1fr` columns above. Trying to apply `overflow` will not work here alone. We need to essentially give the column permission to be smaller. I typically do that like this:

```css
.grid {
  display: grid;
 
  /* prevent blowouts */
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
```

That `minmax(0, 1fr)` still sizes the columns at `1fr`, but allows it to shrink in width below what `auto` would be, meaning using `overflow` will actually work.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/Screenshot-2025-06-11-at-4.59.44%E2%80%AFAM.png?resize=1024%2C250&ssl=1)

There is more to know here, for sure. For instance, all your columns don’t need to be equal. You can mix and match as makes sense.

```css
.grid {
  display: grid;

  grid-template-columns: 20% 1fr;
  grid-template-columns: 2fr 5fr 50px;
  grid-template-columns: auto 1fr;
  grid-template-columns: 50ch auto 2fr 1fr;
}
```

And there are more keywords that are worth knowing about, namely `min-content`, `max-content`, and `fit-content()`. They are worth playing with particularly if you’ve found yourself in a bind where you can’t quite see to get columns to do what you want. Perhaps we can cover them in more detail later, if you’d find it interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "1fr 1fr vs auto auto vs 50% 50%",
  "desc": "There are several different ways to do equal width columns. But some are, uh, more equal than others.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/1fr-1fr-vs-auto-auto-vs-50-50.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
