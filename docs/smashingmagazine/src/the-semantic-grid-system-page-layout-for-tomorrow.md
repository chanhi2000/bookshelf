---
lang: en-US
title: "The Semantic Grid System: Page Layout For Tomorrow"
description: "Article(s) > The Semantic Grid System: Page Layout For Tomorrow"
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
      content: "Article(s) > The Semantic Grid System: Page Layout For Tomorrow"
    - property: og:description
      content: "The Semantic Grid System: Page Layout For Tomorrow"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/the-semantic-grid-system-page-layout-for-tomorrow.html
prev: /programming/css/articles/README.md
date: 2011-08-23
isOriginal: false
author:
  - name: Tyler Tate
    url : https://smashingmagazine.com/author/tyler-tate/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/21fab4e4-9ae6-4111-b4dc-b0def16805b1/semantic-grid1.jpg
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
  name="The Semantic Grid System: Page Layout For Tomorrow"
  desc="Understand the three seemingly insurmountable flaws currently affecting CSS grids and then have a look at what you can do with LESS: use variables, perform operations, and develop reusable mixins."
  url="https://smashingmagazine.com/2011/08/the-semantic-grid-system-page-layout-for-tomorrow/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/21fab4e4-9ae6-4111-b4dc-b0def16805b1/semantic-grid1.jpg"/>

Understand the three seemingly insurmountable flaws currently affecting CSS grids and then have a look at what you can do with LESS: use variables, perform operations, and develop reusable mixins.

CSS grid frameworks can make your life easier, but they’re not without their faults. Fortunately for us, modern techniques offer a new approach to constructing page layouts. But before getting to the solution, we must first understand the three seemingly insurmountable flaws currently affecting CSS grids.

---

## Problems

### Problem #1: They’re Not Semantic

The biggest complaint I’ve heard from purists since I created [<VPIcon icon="fas fa-globe"/>The 1KB CSS Grid](https://1kbgrid.com/) two years ago is that CSS grid systems don’t allow for a proper separation of mark-up and presentation. Grid systems require that Web designers add `.grid_x` CSS classes to HTML elements, mixing presentational information with otherwise semantic mark-up.

Floated elements must also be cleared, often requiring unnecessary elements to be added to the page. This is illustrated by the “clearing” div that ships with [<VPIcon icon="fas fa-globe"/>960.gs](https://960.gs/):

```html
<div class="grid_3">
  220
</div>
<div class="grid_9">
  700
</div>
<div class="clear"></div>
```

### Problem #2: They’re Not Fluid

While CSS grids work well for fixed-width layouts, dealing with fluid percentages is trickier. While most grid systems do provide a fluid option, they break down when nested columns are introduced. In the 1KB CSS Grid example below, `.grid_6` would normally be set to a width of 50%, while `.grid_3` would typically be set to 25%.

But when `.grid_3` appears inside of a `.grid_6` cell, the percentages must be recalculated. While a typical grid system needs just 12 CSS rules to specify the widths of all 12 columns, a fluid grid would need 144 rules to allow for just one level of nesting: possible, but not very convenient.

```html
<div class="column grid_6">
  <div class="row">
    <div class="column grid_3"> </div>
    <div class="column grid_3"> </div>
  </div>
</div>
```

### Problem #3: They’re Not Responsive

Responsive Web design is the buzzword of the year. While new tools such as 1140 CSS Grid and [<VPIcon icon="fas fa-globe"/>Adapt.js](https://adapt.960.gs/) are springing up that enable you to alter a page’s layout based on screen size or device type, an optimal solution has yet to arrive.

---

## Blame It On The Tools

All three of these problems directly result from the limitations of our existing tools. CSS leaves us with the ultimatum of either compromising our principles by adding presentational classes to mark-up, or sticking to our guns and forgoing a grid system altogether. But, hey, we can’t do anything about it, right?

Well, not so fast. While we wait for browsers to add native CSS support for this flawed grid layout module, a futuristic version of CSS is available *today* that’s already supported by every CSS-enabled browser: [<VPIcon icon="fas fa-globe"/>LESS CSS](https://lesscss.org/).

![less-css](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0e9c0c1e-1e0b-4674-b0ad-877b825df537/less-css.jpg)

LESS brings powerful new features to CSS.

---

## LESS What?

You’ve probably heard of LESS but perhaps have never given it a try. Similar to [<VPIcon icon="fa-brands fa-sass"/>SASS](https://sass-lang.com/docs/yardoc/file.INDENTED_SYNTAX.html), LESS is *extends* CSS by giving you the ability to use variables, perform operations and develop reusable mixins. Below are a few examples of what it can do.

### Variables

Specify a value once, and then reuse it throughout the style sheet by defining variables.

```css
/* LESS */
@color: #4D926F;

#header {
  color: @color;
}
```

The above example would compile as follows:

```css
/* Compiled CSS */
#header {
  color: #4D926F;
}
```

### Operations

Multiply, divide, add and subtract values and colors using operations.

```css
/* LESS */
@border-width: 1px;

#header {
  border-left: @border-width * 3;
}
```

In this example, `1px` is multiplied by `3` to yield the following:

```css
/* Compiled CSS */
#header {
  border-left: 3px;
}
```

### Mixins

Most powerful of all, mixins enable entire snippets of CSS to be reused. Simply include the class name of a mixin within another class. What’s more, LESS allows parameters to be passed into the mixin.

```css
/* LESS */
.rounded(@radius) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    border-radius: @radius;
}

#header {
  .rounded(5px);
}
```

Verbose, browser-specific CSS3 properties demonstrate the benefit that mixins bring:

```css
/* Compiled CSS */
#header {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

### Downsides To LESS

Having been skeptical of LESS at first, I’m now a strong advocate. LESS style sheets are concise and readable, and they encourage code to be reused. However, there are some potential downsides to be aware of:

1. It has to be compiled. This is one extra step that you don’t have to worry about with vanilla CSS.
2. Depending on how LESS documents are structured, the compiled CSS file might be slightly larger than the equivalent hand-crafted CSS file.

### A Note On Compiling LESS

There are three approaches to compiling LESS style sheets into CSS:

- **Let the browser do the compiling.**<br/>As its name suggests, [<VPIcon icon="fas fa-globe"/>LESS.js](https://lesscss.org/) is written in JavaScript and can compile LESS into CSS directly in the user’s browser. While this method is convenient for development, using one of the next two methods before going into production would be best (because compiling in the browser can take a few hundred milliseconds).
- **Use a server-side compiler.**<br/>LESS.js can also compile server-side with [<VPIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/), and it has been ported to several other sever-side languages.
- **Use a desktop app.**<br/>[<VPIcon icon="fas fa-globe"/>LESS.app](https://incident57.com/less/) is a Mac app that compiles local files as they’re saved on your computer.

---

## Introducing The Semantic Grid System

The innovations that LESS brings to CSS are the foundation for a powerful new approach to constructing page layouts. That approach is the [<VPIcon icon="fas fa-globe"/>The Semantic Grid System](https://semantic.gs/). This new breed of CSS grid shines where the others fall short:

1. It’s semantic;
2. It can be either fixed or fluid;
3. It’s responsive;
4. It allows the number of columns, column widths and gutter widths to be modified instantly, directly in the style sheet.

![semantic-grid](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/79d7e821-eae1-4beb-ad15-58ad58d1f3bf/semantic-grid.jpg)

The Semantic Grid System uses LESS CSS to offer a new approach to page layout.

### Configuring The Grid

Sounds too good to be true? Here’s how it works.

First, import the semantic grid into your working LESS style sheet.

```css
@import 'grid.less';
```

Next, define variables for the number of columns, and set the desired widths for the column and gutter. The values entered here will result in a 960-pixel grid system.

```css
@columns: 12;
@column-width: 60;
@gutter-width: 20;
```

The grid is now configured and ready to be used for page layout.

### Using The Grid

Now that the grid has been configured, consider two elements on an HTML page that you would like to lay out side by side.

```html
<body>
  <article>Main</article>
  <section>Sidebar</section>
</body>
```

The side-by-side layout can be achieved by passing the desired number of grid units to the `.column()` mixin (which is defined in the *grid.less* file).

```css
/* LESS */
@import 'grid.less';

@columns: 12;
@column-width: 60;
@gutter-width: 20;

article {
  .column(9);
}
section {
  .column(3);
}
```

The above LESS would be compiled to CSS as the following:

```css
/* Compiled CSS */
article {
  display: inline;
  float: left;
  margin: 0px 10px;
  width: 700px;
}
section {
  display: inline;
  float: left;
  margin: 0px 10px;
  width: 220px;
}
```

[<VPIcon icon="fas fa-globe"/>This page](https://semantic.gs/examples/fixed/fixed.html) demonstrates the result. What makes this approach so different is that it does away with ugly `.grid_x` classes in the mark-up. Instead, column widths are set directly in the style sheet, enabling a clean separation between declarative mark-up and presentational style sheets. (It’s called the *semantic* grid for a reason, after all.)

### So, What’s Behind The Curtain?

For the curious among you, below are the mixins at the center of it all. Fortunately, these functions are hidden away in the *grid.less* file and need not ever be edited.

```css
/* Utility variable — you will never need to modify this */
@_gridsystem-width: (@column-width*@columns) + (@gutter-width*@columns) * 1px;

/* Set @total-width to 100% for a fluid layout */
@total-width: @_gridsystem-width;

/* The mixins */
.row(@columns:@columns) {
   display: inline-block;
   overflow: hidden;
   width: @total-width*((@gutter-width + @_gridsystem-width)/@_gridsystem-width);
   margin: 0 @total-width*(((@gutter-width*.5)/@_gridsystem-width)*-1);
}
.column(@x,@columns:@columns) {
   display: inline;
   float: left;
   width: @total-width*((((@gutter-width+@column-width)*@x)-@gutter-width) / @_gridsystem-width);
   margin: 0 @total-width*((@gutter-width*.5)/@_gridsystem-width);
}
```

---

## Fluid Layouts

The example above demonstrates a fixed pixel-based layout. But fluid percentage-based layouts are just as easy. To switch from pixels to percentages, simply add one variable:

```css
/* LESS */
@total-width: 100%;
```

With no other changes, the compiled CSS then becomes this:

```css
/* Compiled CSS */
article {
  display: inline;
  float: left;
  margin: 0px 1.04167%;
  width: 72.9167%;
}
section {
  display: inline;
  float: left;
  margin: 0px 1.04167%;
  width: 22.9167%;
}
```

[<VPIcon icon="fas fa-globe"/>This example](https://semantic.gs/examples/fluid/fluid.html) shows how the percentages are dynamically calculated using LESS operations, which also applies to nested columns.

---

## Responsive Layouts

No modern grid system would be complete unless we had the ability to adapt the layout of the page to the size of the user’s screen or device. With Semantic.gs, manipulating the grid using media queries [<VPIcon icon="fas fa-globe"/>couldn’t be any easier](https://semantic.gs/examples/responsive/responsive.html):

```css
article { .column(9); }
section { .column(3); }

@media screen and (max-width: 720px) {
  article { .column(12); }
  section { .column(12); }
}
```

---

## Try It For Yourself

Just a couple of days ago Twitter released a project called Bootstrap which provides similar (but more limited) grid system built using LESS variable and mixins. The future of the CSS grid seems to be taking shape before us.

The Semantic Grid System delivers the best of both worlds: the power and convenience of a CSS grid and the ideal separation of mark-up and presentation. ~~[<VPIcon icon="fas fa-globe"/>Download the grid](https://semantic.gs)~~ for yourself, fork it on [GitHub (<VPIcon icon="iconfont icon-github" />`twigkit/semantic.gs`)](https://github.com/twigkit/semantic.gs), and let us know what you think!

![semanticgs](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/695e0ccb-8f2c-48bd-a377-f8376b9eb27b/semanticgs.jpg)

Download the grid from Semantic.gs.

::: info Other Resources

```component VPCard
{
  "title": "Getting started | Less.js",
  "desc": "Less extends CSS with dynamic behavior such as variables, mixins, operations and functions. Less runs on both the server-side (with Node.js and Rhino) or client-side (modern browsers only).",
  "link": "https://lesscss.org/",
  "logo": "https://lesscss.org/public/ico/favicon.ico",
  "background": "rgba(29,54,93,0.2)"
}
```

<SiteInfo
  name="Responsive Web Design"
  desc="Designers have coveted print for its precision layouts, lamenting the varying user contexts on the web that compromise their designs. Ethan Marcotte advocates we shift our design thinking to approp…"
  url="https://alistapart.com/article/responsive-web-design//"
  logo="https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1"
  preview="https://i0.wp.com/alistapart.com/wp-content/uploads/2013/01/ALA306_respdesign_300.png?fit=1200%2C549&ssl=1"/>

```component VPCard
{
  "title": "Adapt.js - Adaptive CSS",
  "desc": "Adapt.js serves CSS based on screen width.",
  "link": "https://adapt.960.gs//",
  "logo": "https://adapt.960.gs/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

<SiteInfo
  name="LukeW | An Event Apart: CSS Best Practices"
  desc="In her Our Best Practices Are Killing Us presentation at An Event Apart in Minneapolis MN, Nicole Sullivan walked through common CSS best practices that have ou..."
  url="http://lukew.com/ff/entry.asp?1379/"
  logo="http://lukew.com//static.lukew.com/lukew.ico"
  preview="https://static.lukew.com/lukew_og_img7.png"/>

:::

::: info Further Reading

- [**Grid-Based Web Design, Simplified**](/smashingmagazine.com/2010grid-based-web-design-simplified.md)
- [**Designing With Grid-Based Approach**](/smashingmagazine.com/2007designing-with-grid-based-approach.md)

```component VPCard
{
  "title": "Semantic CSS With Intelligent Selectors",
  "desc": "In this article, we will explore an alternative approach to styling Web documents. With the use of “intelligent” selectors, we’ll cover how to query the extant, functional nature of semantic HTML in such a way as to reward well-formed markup. If you code it right, you’ll get the design you were hoping for. Heydon Pickering hopes that employing some of these ideas will make your workflow simpler and more transferable between projects.",
  "link": "/smashingmagazine.com/semantic-css-with-intelligent-selectors.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Semantic Grid System: Page Layout For Tomorrow",
  "desc": "Understand the three seemingly insurmountable flaws currently affecting CSS grids and then have a look at what you can do with LESS: use variables, perform operations, and develop reusable mixins.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/the-semantic-grid-system-page-layout-for-tomorrow.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
