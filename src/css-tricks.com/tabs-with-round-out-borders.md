---
lang: en-US
title: "Tabs with Round Out Borders"
description: "Article(s) > Tabs with Round Out Borders"
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
      content: "Article(s) > Tabs with Round Out Borders"
    - property: og:description
      content: "Tabs with Round Out Borders"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/tabs-with-round-out-borders.html
prev: /programming/css/articles/README.md
date: 2011-09-04
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/roundouttabs.png
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
  name="Tabs with Round Out Borders"
  desc="A technique for a rounded tabs where the top corners are rounded, but also the bottom corners are rounded where they attach to the content area. ”Round out” or ”flared” borders, if you will."
  url="https://css-tricks.com/tabs-with-round-out-borders"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/roundouttabs.png"/>

Rounded corners are now trivially easy to achieve via `border-radius`. But that only allows us to *cut into* the shape. What if we want to connect a shape to another with a rounded *outward* corner. Much easier to explain with a graphic:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/roundouttabs.png?resize=565%2C140 "roundouttabs")

The top corners are easy, just `border-radius`. The bottom corners, less easy.

::: info View Demo

<SiteInfo
  name="Round Out Tabs"
  desc="..."
  url="https://css-tricks.com/examples/RoundOutTabs"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

> [<VPIcon icon="fas fa-file-zipper"/>Download Files](https://css-tricks.com/examples/RoundOutTabs.zip)

:::

---

## Clean HTML

Of course, on the web, just about anything visual is possible. Worst-case-scenario you can use images. Our goal here, as ever, is to use no images (quick! accessible! easy to update!) and use completely clean semantic HTML (quick! accessible! easy to update!). So here’s the markup:

```html
<ul class="tabs group">
  <li class="active"><a href="#one">One</a></li> 
  <li><a href="#two">Two</a></li> 
  <li><a href="#three">Three</a></li>
  <li><a href="#three">Four</a></li> 
</ul>
```

A class of `active` indicates which tab reflects the current page.

---

## How this is going down

The reason this is tricky is that we need a shape to stick out of the tab element. To get this done while keeping our markup clean, we’ll use pseudo elements. If you need a refresher, you can learn about them [<VPIcon icon="iconfont icon-css-tricks"/>here](https://css-tricks.com/video-screencasts/94-intro-to-pseudo-elements/) and [**here**](css-tricks.com/pseudo-element-roundup.md). Essentially, they can add extra elements to the page that we can style, directly through CSS. Every element can have two – `:before` and `:after`. Ultimately we’ll be using four per tab, which is possible because each tab is make from two elements, the list item and the anchor link.

Let’s visualize this step by step, without looking out any code just yet.

::: tabs

@tab:active 1. Natural State

![List items are naturally block level and anchor links are inline, so the layout is like this.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.071.png?resize=1024%2C768)

@tab 2.Float

![By floating the list items to the left, the list items will line up next to each other and shrink to the size of the anchor links inside them.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.072.png?resize=1024%2C768)

@tab 3. Same Size

![The list items themselves have no margin or padding, so really the list items and anchor links are the exact same size, directly on top of each other.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.073.png?resize=1024%2C768)

@tab 4. Just one

![Let’s focus on just one of them…](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.074.png?resize=1024%2C768)

@tab 5. Circles

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.075.png?resize=1024%2C768)

@tab 6. Squares

![With the other two pseudo elements we’ll make smaller squares.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.076.png?resize=1024%2C768)

@tab 7. Colorize the tab and content

![The “active” tab and the content will share the same background color.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.077.png?resize=1024%2C768)

@tab 8. Colorize the pseudo elements

![The squares match the color of the active tab, the circles match the background behind them.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.078.png?resize=1024%2C768)

@tab 9. Stacking

![With z-index, we’ll make sure the circle sits on top and cuts off the color of the square.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.079.png?resize=1024%2C768)

@tab 10. No borders

![The borders were just for illustration, really it would look more like this.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.080.png?resize=1024%2C768)

@tab 11. Finishing

![Add the same concept to the outer tabs and round the tops with `border-radius` and it’s done!](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/Pseudos.081.png?resize=1024%2C768)

---

## CSS

This is a big ass block of CSS, but I’ve tried to comment it up so that each part makes sense.

```css :collapsed-lines
.tabs li { 
  /* Makes a horizontal row */
  float: left; 
  /* So the psueudo elements can be
     abs. positioned inside */
  position: relative; 
}
.tabs a { 
  /* Make them block level
     and only as wide as they need */
  float: left; 
  padding: 10px 40px; 
  text-decoration: none;
  
  /* Default colors */ 
  color: black;
  background: #ddc385; 
  
  /* Only round the top corners */
  -webkit-border-top-left-radius: 15px;
  -webkit-border-top-right-radius: 15px;
  -moz-border-radius-topleft: 15px;
  -moz-border-radius-topright: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px; 
}
.tabs .active {
  /* Highest, active tab is on top */
  z-index: 3;
}
.tabs .active a { 
  /* Colors when tab is active */
  background: white; 
  color: black; 
}
.tabs li:before, .tabs li:after, 
.tabs li a:before, .tabs li a:after {
  /* All pseudo elements are 
     abs. positioned and on bottom */
  position: absolute;
  bottom: 0;
}
/* Only the first, last, and active
   tabs need pseudo elements at all */
.tabs li:last-child:after,   .tabs li:last-child a:after,
.tabs li:first-child:before, .tabs li:first-child a:before,
.tabs .active:after,   .tabs .active:before, 
.tabs .active a:after, .tabs .active a:before {
  content: "";
}
.tabs .active:before, .tabs .active:after {
  background: white; 
  
  /* Squares below circles */
  z-index: 1;
}
/* Squares */
.tabs li:before, .tabs li:after {
  background: #ddc385;
  width: 10px;
  height: 10px;
}
.tabs li:before {
  left: -10px;      
}
.tabs li:after { 
  right: -10px;
}
/* Circles */
.tabs li a:after, .tabs li a:before {
  width: 20px; 
  height: 20px;
  /* Circles are circular */
  -webkit-border-radius: 10px;
  -moz-border-radius:    10px;
  border-radius:         10px;
  background: #222;
  
  /* Circles over squares */
  z-index: 2;
}
.tabs .active a:after, .tabs .active a:before {
  background: #ddc385;
}
/* First and last tabs have different
   outside color needs */
.tabs li:first-child.active a:before,
.tabs li:last-child.active a:after {
  background: #222;
}
.tabs li a:before {
  left: -20px;
}
.tabs li a:after {
  right: -20px;
}
```

That’s that!

::: info View Demo

<SiteInfo
  name="Round Out Tabs"
  desc="..."
  url="https://css-tricks.com/examples/RoundOutTabs"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

> [<VPIcon icon="fas fa-file-zipper"/>Download Files](https://css-tricks.com/examples/RoundOutTabs.zip)

:::

Should work in just about any decent browser and also IE 9 and up. Should also fall back fine (just no round-outs) in older browsers.

---

## Steve Smith Method

About the exact time as I was creating this to include in a talk I was doing about pseudo elements. Steve Smith of Ordered List published a [<VPIcon icon="fas fa-globe"/>very similar method](http://orderedlist.com/blog/articles/flared-borders-with-css/). Steve’s method has borders around the tabs, mine has tabs butted up against each other. Both cool if you ask me.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Tabs with Round Out Borders",
  "desc": "A technique for a rounded tabs where the top corners are rounded, but also the bottom corners are rounded where they attach to the content area. ”Round out” or ”flared” borders, if you will.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/tabs-with-round-out-borders.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
