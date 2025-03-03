---
lang: en-US
title: "Fanout with Grid and View Transitions"
description: "Article(s) > Fanout with Grid and View Transitions"
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
      content: "Article(s) > Fanout with Grid and View Transitions"
    - property: og:description
      content: "Fanout with Grid and View Transitions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/fanout-with-grid-and-view-transitions.html
prev: /programming/css/articles/README.md
date: 2024-10-14
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4184
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
  name="Fanout with Grid and View Transitions"
  desc="Imagine transitioning a bunch of items all set into ONE cell of a grid, then each having a unique animation when they move from that cell into where they would naturally fall on that same grid."
  url="https://frontendmasters.com/blog/fanout-with-grid-and-view-transitions/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4184"/>

I got a little nerdsniped by Preethi’s post [**CSS Fan Out with Grid and `@property`**](/frontendmasters.com/css-fan-out-with-grid-and-property.md) the other day. I like the idea of a opening a menu of items where the layout is powered by CSS grid. Then it collapses back into just one cell of the grid. You can even animate the grid columns/rows themselves to pull this off, as Preethi demonstrated. If you know how many columns/rows you want, you can animate that number up and down.

I found the animations just a *bit* less smooth than I’d like to see, generally. The smoothness depends on lots of factors, like how many columns/rows there are, how long the duration is, and how big those columns/rows are. But imagine 3 rows collapsing to 1 over a full second. Since what is being animated is an *integer.* The best that can do is have two keyframes (3 to 2, 2 to 1) at 500ms each. It will not feel smooth. Preethi smoothed it over by animating the heights of items too, but the column/rows changes can’t be smoothed over (there can never be 1.5 rows, for example).

My mind went right to View Transitions. Particularly the “same page” style of View Transitions you can call with the JavaScript API `document.startViewTransition`. With it, we actually don’t even need CSS transitions/animations *at all.* Weird right?! We just alter the DOM (by changing a class and letting CSS do it’s thing) *inside* a `startViewTransition` function, and the browser will automatically tween any elements with unique `view-transition-name` values.

Here’s me re-creating a similar layout to the fan out navigation in Preethi’s article:

<CodePen
  user="chriscoyier"
  slug-hash="ExqZPNJ"
  title="Fan Out 2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Above, the `#grid` uses CSS grid to make an 1-column 7-row grid. By default *all* items are placed in the 4th grid row, making a “closed” state. When the `open` class is applied to the grid, the `grid-row` is replaced with `auto` letting them fall to where they normally would in the grid (the “fan out”). The item in the middle position is just styled differently to look and act as a toggle.

Here’s a video if you’re on a device that doesn’t support View Transitions

In that above example, the space the grid occupies is the same in both states, but that wouldn’t need to be the case. If you want to alter the grid columns/rows, thus changing the dimensions and nature of the grid, then view transition between those states, you can absolutely do that too.

There really is no limit to what you want to do with the grid in the open and closed state. You don’t even have to think of the “states” in that way, although I do find it satisfying myself. Here’s many *more* items laid out on a grid with both columns and rows:

<CodePen
  user="chriscoyier"
  slug-hash="PoMbmGy"
  title="Fan Out"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

When I was poking around with that demo, it felt it was just *begging* for “staggered transitions”, that is, animations that occur with a slight time delay between each element. I’m eyeing up future CSS that looks like it’s going to help with this, but we can actually do it now even using the view transitions we already have.

I used Pug to create the HTML because it’s so repetitive and a processor can help abstract that and make it easier to update, but ultimately the HTML is like this:

```html
<div id="grid">
  <div class="item" style="view-transition-name: item-0"><a>0</a>
  </div>
  <div class="item" style="view-transition-name: item-1"><a>1</a>
  </div>
  <div class="item" style="view-transition-name: item-2"><a>2</a>
  </div>

  <!-- ... -->
```

We can target each one of those items with unique view-transition-specific CSS and apply the `animation-delay` there. I used a Sass loop for the same reason as above, but ultimately the CSS looks like:

```css
::view-transition-group(item-0) {
  animation-delay: 0s;
}
::view-transition-group(item-1) {
  animation-delay: 0.01s;
}
::view-transition-group(item-2) {
  animation-delay: 0.02s;
}
/* ... */
```

That ends up like this:

<CodePen
  user="chriscoyier"
  slug-hash="JjgEVgd"
  title="Fan Out with Staggering"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I find that terribly pleasing.

Again I’m leaving the entire grid in place here rather than changing the amount or size of any of the columns/rows. But you could, and it wouldn’t be terribly different. It might actually be smart so the “closed” state isn’t taking up as much space in the flow.

Again if a browser doesn’t [<FontIcon icon="fas fa-globe"/>support](https://caniuse.com/view-transitions) this kind of view transition (Firefox, at the time of writing), it doesn’t matter, it will still toggle open and closed just fine, just without animation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fanout with Grid and View Transitions",
  "desc": "Imagine transitioning a bunch of items all set into ONE cell of a grid, then each having a unique animation when they move from that cell into where they would naturally fall on that same grid.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/fanout-with-grid-and-view-transitions.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
