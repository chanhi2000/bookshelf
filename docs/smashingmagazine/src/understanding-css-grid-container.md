---
lang: en-US
title: "Understanding CSS Grid: Creating A Grid Container"
description: "Article(s) > Understanding CSS Grid: Creating A Grid Container"
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
      content: "Article(s) > Understanding CSS Grid: Creating A Grid Container"
    - property: og:description
      content: "Understanding CSS Grid: Creating A Grid Container"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/understanding-css-grid-container.html
prev: /programming/css/articles/README.md
date: 2020-01-03
isOriginal: false
author:
  - name: Rachel Andrew
    url : https://smashingmagazine.com/author/rachel-andrew/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bee8e40-2d2e-457c-a0e1-a78ced1c08e5/understanding-css-grid-container.png
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
  name="Understanding CSS Grid: Creating A Grid Container"
  desc="In a new series, Rachel Andrew breaks down the CSS Grid Layout specification. This time, we take a detailed look at what happens when you create a grid container and the various properties that can be applied to the container to shape your grid.
"
  url="https://smashingmagazine.com/2020/01/understanding-css-grid-container/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6bee8e40-2d2e-457c-a0e1-a78ced1c08e5/understanding-css-grid-container.png"/>

In a new series, Rachel Andrew breaks down the CSS Grid Layout specification. This time, we take a detailed look at what happens when you create a grid container and the various properties that can be applied to the container to shape your grid.

This is the start of a new series here at Smashing Magazine concentrating on CSS Grid Layout. While Grid has been available in browsers since 2017, many developers won’t have had a chance to use it on a project yet. There seem to be a lot of new properties and values associated with CSS Grid Layout. This can make it seem overwhelming. However, quite a lot of the specification details alternate ways to do things, meaning that you don’t have to learn the entire spec to get started. This series aims to take you from grid novice to expert — with lots of practical usage tips along the way.

This initial article will cover what happens when you create a grid container and the various properties that you can use on the parent element to control that grid. You will discover that there are several use cases that are fulfilled only with the properties that you apply to the grid container.

In this article, we will cover:

- Creating a grid container with `display: grid` or `display: inline-grid`,
- Setting up columns and rows with `grid-template-columns` and `grid-template-rows`,
- Controlling the size of implicit tracks with `grid-auto-columns` and `grid-auto-rows`.
- **Part 1: Creating A Grid Container**
- Part 2: [**Grid Lines**](/smashingmagazine.com/understanding-css-grid-lines.md)
- Part 3: [**Grid Template Areas**](/smashingmagazine.com/understanding-css-grid-template-areas.md)  


---

## Creating A Grid Container

Grid, like Flexbox, is a value of the CSS `display` property. Therefore to tell the browser that you want to use grid layout you use `display: grid`. Having done this, the browser will give you a block-level box on the element with `display: grid` and any direct children will start to participate in a **grid formatting context**. This means they behave like grid items, rather than normal block and inline elements.

However, you may not immediately see a difference on your page. As you haven’t created any rows or columns, you have a one-column grid. Enough rows are being generated to hold all of your direct children, and they are displaying one after the other in that single column. Visually they look just like block elements.

You will see a difference if you had any string of text, not wrapped in an element, and a direct child of the grid container, as the string will be wrapped in an anonymous element and become a grid item. Any element which is normally an inline element, such as a span, will also become a grid item once its parent is a grid container.

The example below has two block-level elements, plus a string of text with a span in the middle of the string. We end up with five grid items:

- The two `div` elements,
- The string of text before the span,
- The span,
- The string of text after the span.

rachelandrew
VwYrwBe
Grid Container: Direct children and strings of text become grid items
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

If you inspect the grid using the Firefox Grid Inspector, you can see the five-row tracks that have been created for the items.

![The Grid Inspector is useful to help you see how many rows have been created](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/93c3f6d1-afed-4759-ac8a-46290df5b4de/grid-container1.png)

You can also create an inline grid by using `display: inline-grid`; in this case, your grid container becomes an inline-level box. However, the direct children are still grid items and behave in the same way as grid items inside a block-level box (it is only the outer display type). That is why the grid container behaves the way it does above when it is alongside other boxes on the page.

This next example has a grid followed by a string of text, as this is an inline-level grid, the text can display alongside it. Inline-level things do not stretch to take up all the space in the inline dimension in that way that block-level things do.

rachelandrew
Exabxpz
Grid Container: inline-grid
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

::: note

In the future, we will be able to better describe our layout by using* `display: block grid` in order to create our block-level container, and `display: inline grid` *to create an inline-level container. You can read about this change to the display specification in my article, “[**Digging Into The DIsplay Property: The Two Values Of Display**](/smashingmagazine.com/display-two-value.md)”.

:::

---

## Columns And Rows

To get something that looks like a grid, we will need to add columns and rows. These are created using the `grid-template-columns` and `grid-template-rows` properties. These properties are defined in the spec as accepting a value called a *[<VPIcon icon="iconfont icon-w3c"/>track-list](https://w3.org/TR/css-grid-1/#track-list)*.

::: info 7.2. Explicit Track Sizing (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> "These properties specify, as a space-separated track list, the line names and track sizing functions of the grid. The grid-template-columns property specifies the track list for the grid’s columns, while grid-template-rows specifies the track list for the grid’s rows."

```component VPCard
{
  "title": "CSS Grid Layout Module Level 1",
  "desc": "These properties specify, as a space-separated track list, the line names and track sizing functions of the grid. The grid-template-columns property specifies the track list for the grid’s columns, while grid-template-rows specifies the track list for the grid’s rows.",
  "link": "https://w3.org/TR/css-grid-1/#track-list/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

Some valid track-list values are as follows:

### `grid-template-columns: 100px 100px 200px;`

Creates a three-column grid: The first column is 100px, the second 100px, the third 200px.

### `grid-template-columns: min-content max-content fit-content(10em)`

Creates a three-column grid: The first column is the `min-content` size for that track, the second the `max-content` size. The third is either `max-content` *unless* the content is larger than 10em, in which case it is clamped to 10em.

### `grid-template-columns: 1fr 1fr 1fr;`

Creates a three-column grid using the `fr` unit. The available space in the grid container is divided into three and shared between the three columns.

### `grid-template-columns: repeat(2, 10em 1fr);`

Creates a four-column grid with a repeating pattern of `10em 1fr 10em 1fr` as the track-list in the repeat statement is repeated twice.

### `grid-template-columns: repeat(auto-fill, 200px);`

Fills the container with as many 200px columns as will fit leaving a gap at the end if there is spare space.

### `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`

Fills the container with as many 200px columns as will fit then distributes the remaining space equally between the created columns.

### `grid-template-columns: [full-start] 1fr [content-start] 3fr [content-end] 1fr [full-end];`

Creates a three-column grid: The first and third columns have 1 part each of the available space while the middle column has 3 parts. The lines are named by putting line names in square brackets.

As you can see there are many ways to create a track listing! Let’s have a look at exactly how these all work, with a few tips in terms of why you might use each one.

### Using Length Units

You can use any length units, or a percentage to create your tracks. If the size of the tracks adds up to less than is available in the grid container, then by default the tracks will line up at the start of the container and the spare space will go to the end. This is because the default value of `align-content` and `justify-content` is `start`. You can space out the grid tracks, or move them to the end of the container using the alignment properties, which I explain in detail in my article “[**How To Align Things In CSS**](/smashingmagazine.com/css-alignment.md)”.

rachelandrew
eYmeYbX
Grid Container: length units
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

You can also use the keywords `min-content`, `max-content` and `fit-content()`. Using `min-content` will give you a track that is as small as it can be without causing overflow. Therefore, when used as a column size, the content will softly wrap wherever possible. The track becoming the size of the longest word in the column or largest fixed-size element.

Using `max-content` will cause the content to not do any soft-wrapping at all. In a column, any string of text will unwrap which may cause overflow.

The `fit-content` keyword can only be used by passing in a value. That value becomes the max that this track will grow to. Therefore, the track will act like `max-content` with the content unwrapping and stretching out until it hits the value you passed in. At that point, it will start wrapping as normal. So your track may be smaller than the value you pass in, but never larger.

rachelandrew
rNaYNob
Grid Container: min-content, max-content, fit-content()
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

You can find out more about sizing in Grid and other layout methods in my article “[**How Big Is That Box? Understanding Sizing In CSS Layout**](/smashingmagazine.com/understanding-sizing-css-layout.md)”.

If you end up with tracks that take up more space than you have in your container, they will overflow. If you use percentages then, as with percentage-based float or flex layouts, you will need to take care that the total percentage is not more than 100% if you want to avoid overflow.

### The `fr` Unit

Grid Layout includes a method that can save you calculating percentages for yourself — track sizing with the `fr` unit. This unit isn’t a length, and therefore can’t be combined with `calc()`; it is a flex unit and represents the available space in the grid container.

This means that with a track-list of `1fr 1fr 1fr`; the available space is divided into three and shared evenly between the tracks. With a track-list of `2fr 1fr 1fr`, the available space is divided into four and two parts are given to track one — one part each to tracks two and three.

rachelandrew
QWwOWYx
Grid Container: fr
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

Something to watch out for is that what is being shared out by default is *available space* which is not the total space in the container. If any of your tracks contain a fixed-size element or a long word that can’t be wrapped, this will be laid out before the space is shared out.

In the next example, I removed the spaces between the words of `ItemThree`. This made a long unbreakable string so space distribution happens after the layout of that item has been accounted for.

rachelandrew
JjoOjzo
Grid Container: fr with larger content
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

You can mix the `fr` unit with fixed length tracks, and this is where it becomes very useful. For example, you could have a component with two fixed-sized columns and a center area that stretches:

rachelandrew
JjoOjqd
Grid Container: mixing fr units and fixed-size tracks
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

You can have a component with one track set to `fit-content(300px)` and the other to 1fr. This makes for a component that can have something smaller than 300px in the first track, in which case it only takes the space it needs and the `fr` unit expands to take up the rest of the space.

If you add something larger (such as an image with `max-width: 100%`), the first track will stop growing at 300px and the `fr` unit takes the rest of the space. Mixing the `fr` unit with fit-content is a way to make some very flexible components for your site.

rachelandrew
abzVbgb
See the Pen [ (<VPIcon icon="fa-brands fa-codepen" />`rachelandrew`)](https://codepen.io/
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

### The `repeat()` Function

Using `repeat()` in your track-list can save typing out the same value or values over and over again. For example the following two lines are the same:

```css
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
grid-template-columns: repeat(12, 1fr);
```

When using `repeat()`the value before the comma is the number of times to repeat the track-list that comes after the comma. That track-list can be multiple values. This means you can repeat a pattern of tracks.

You can use the `repeat()` function for part of a track-list. For example, the following line would give you a 1fr track, 3 200px tracks, and a final 1fr track.

```css
grid-template-columns: 1fr repeat(3,200px) 1fr
```

In addition to a number before the comma to indicate a fixed number of times to repeat the pattern, you can also use the keywords `auto-fill` or `auto-fit`. Using one of these keywords means that instead of a fixed number of tracks, your grid container will be filled with as many tracks as will fit.

rachelandrew
oNgoggL
See the Pen [ (<VPIcon icon="fa-brands fa-codepen" />`rachelandrew`)](https://codepen.io/
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

Using a fixed-length unit means that, unless the container is able to be exactly divided by that size, you will end up with some spare space remaining. In the example above my container is 500px wide, so I get two 200px tracks plus space at the end.

We can use another grid function to make the value a minimum, with any spare space distributed across all of the tracks. The `minmax()` function takes a minimum and a maximum size. With a minimum of 200px and a max of 1fr, we get as many 200px tracks as will fit and because the max is 1fr, which we already know will share out the space evenly, the extra is distributed across the tracks.

rachelandrew
eYmemNw
Grid Container: auto-fill and minmax()
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

I mentioned there are two possible keywords: `auto-fill` and `auto-fit`. If you have enough content to fill the first row of cells, then these will behave in exactly the same way. If, however, you do not (e.g. if we remove all but one item inside the container above), then they behave differently.

Using `auto-fill` will maintain the available track sizing even if there is no content to go into it.

rachelandrew
XWJzJXr
Grid Container: auto-fill and minmax() with one item
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

If, instead, you use `auto-fit`, the empty tracks will be collapsed:

rachelandrew
XWJzJdW
Grid Container: auto-fit and minmax() with one item
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

By using the Firefox Grid Inspector, you can see that the tracks are still there, but have been collapsed to zero. The end line of our grid is still line 3 as we can fit two tracks.

![The track is still there but collapsed](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8859be77-32de-44ef-b906-ca085b0a64be/grid-container2.png)

### Named Lines

My final example above used the named lines approach. When using Grid. you always have line numbers, however, you can also name the lines. Lines are named inside square brackets. You can have multiple names for one line; in that case, a space separates them. For example, in the following track-list, all of my lines have two names.

```css
grid-template-columns: [main-start sidebar-start] 1fr [sidebar-end content-start] 4fr [content-end main-end]
```

You can name your lines anything that you like, except the word `span` as that is a reserved word due to being used when placing items on the grid.

::: note

In the next article in this series, I’ll be talking more about line-based placement and how named lines are used. In the meantime, read my article on “[**Naming Things in CSS Grid Layout**](/smashingmagazine.com/naming-things-css-grid-layout.md)” to help you learn more on the topic.*

:::

---

## The Explicit Vs The Implicit Grid

When creating a grid using `grid-template-columns` and `grid-template-rows` with a track-list, you are creating what is referred to as the **explicit grid**. This is the grid you have defined which has the sizing you have chosen for each track.

If you have more items than will fit, or place an item so it falls outside of the bounds of the grid you have created, Grid will create tracks in the **implicit grid**. These implicit tracks will be auto-sized by default. We saw this implicit grid in action when I declared `display: grid` on the parent element and grid created rows, one for each item. I didn’t define these rows, but as there were grid items, the row tracks were created to give them somewhere to go.

You can set a size for implicit rows or columns by using the `grid-auto-rows` or `grid-auto-columns` properties. These properties take a track-listing, so if you want all implicit columns to be at least 200 pixels tall but grow if there is more content, you could use the following:

```css
grid-auto-rows: minmax(200px, auto)
```

If you want the first implicit row to be auto-sized, and the second to be `min-content` sized, and so on (until all of the grid items have been accommodated), you can pass in multiple values:

`grid-auto-rows: auto 100px`

rachelandrew
xxbPxyK
Grid Container: grid-auto-rows
) by Rachel Andrew ([@rachelandrew](https://codepen.io/rachelandrew)) on [CodePen](https://codepen.io).

---

## Using A Grid With Auto-Placement

Creating a grid (and allowing the browser to auto-place items) gets you a long way in terms of the useful patterns you can achieve. We have not yet looked at placing items on the grid, but many layouts that make use of Grid don’t do any placement. They simply rely on placing the items in source order — one in each grid cell.

If you are new to CSS Grid, then playing with different track sizes and seeing how the items place themselves into the cells you create is a great way to start.

- **Part 1: Creating A Grid Container**
- Part 2: [**Grid Lines**](/smashingmagazine.com/understanding-css-grid-lines.md)
- Part 3: [**Grid Template Areas**](/smashingmagazine.com/understanding-css-grid-template-areas.md)

::: info Further Reading

```component VPCard
{
  "title": "In Praise Of The Basics",
  "desc": "What does it mean to learn the “basics”, or fundamentals, of front-end web development? Is starting with HTML and CSS still the best entry point to learn how to make websites and apps when we have a seemingly endless supply of frameworks? Geoff Graham thinks so and discusses why you might consider going “back to basics” to start or move forward in your career.",
  "link": "/smashingmagazine.com/in-praise-of-the-basics.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "How To Build A Magazine Layout With CSS Grid Areas",
  "desc": "Web development, especially what you can do with CSS, has become increasingly complex. With the added capabilities of CSS Grid, it is now possible to achieve layouts that look like they were laid out by hand. Let’s tackle a practical example of how to do something like that.",
  "link": "/smashingmagazine.com/build-magazine-layout-css-grid-areas.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Useful DevTools Tips and Tricks**](/smashingmagazine.com/popular-devtools-tips.md)
- [**How To Design Effective Conversational AI Experiences: A Comprehensive Guide**](/smashingmagazine.com/how-design-effective-conversational-ai-experiences-guide.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding CSS Grid: Creating A Grid Container",
  "desc": "In a new series, Rachel Andrew breaks down the CSS Grid Layout specification. This time, we take a detailed look at what happens when you create a grid container and the various properties that can be applied to the container to shape your grid.
",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/understanding-css-grid-container.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
