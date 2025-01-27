---
lang: en-US
title: "CSS Wishlist for 2025"
description: "Article(s) > CSS Wishlist for 2025"
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
      content: "Article(s) > CSS Wishlist for 2025"
    - property: og:description
      content: "CSS Wishlist for 2025"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-wishlist-for-2025.html
prev: /programming/css/articles/README.md
date: 2025-01-14
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4888
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
  name="CSS Wishlist for 2025"
  desc="Hey we might as well spill out all these wishes as the CSS feature train has been rolling and we oughta get while the getting is good."
  url="https://frontendmasters.com/blog/css-wishlist-for-2025/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4888"/>

The new year is bringing out plenty of folks blogging about their CSS wishlists. It’s fun! I love thinking about the future of CSS capability, particularly now when CSS seems to be moving so fast. I’m going to make my own list by listing some of my own wishes, then linking up other people’s ideas who I agree with (from any year).

---

## Stuff That Doesn’t Exist Yet

### [<FontIcon icon="fas fa-globe"/>Adam Argyle](https://nerdy.dev/css-wishlist-2025#pick-where-to-stick): Pick Where to Stick

Layout with `position: sticky;` doesn’t let you be as specific as you might want to be with what parent element it’s going to stick *against.* Aside from other issues where it’s weirdly easy to *break* the stickiness, I agree it would be nice to just say where you want it to stick:

::: info Adam Argyle (<FontIcon icon="fas fa-globe"/><code>nerdy.dev</code>)

<SiteInfo
  name="CSS Wishlist 2025 · December 17, 2024"
  desc="Holy crap I guess I want 15 more things!"
  url="https://nerdy.dev/css-wishlist-2025#pick-where-to-stick"
  logo="https://nerdy.dev/favicon.svg"
  preview="https://res.cloudinary.com/dnpmdb8r8/image/upload/f_auto,c_limit,q_auto,w_auto/argyleink/css-wishlist-2025.png"/>

> For that all too common moment when you want to pick which element position sticky will respect. What if we could use `container-name` [or something (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9868) and reference it from position sticky by making it a function?

:::

Personally, I’d want the same thing for `position: fixed;`. I think it’s a bit annoying that you can only use it relative to the viewport and not a specific parent container.

### [<FontIcon icon="fas fa-globe"/>Me](https://css-tricks.com/the-2013-css-wishlist/#aa-3-id-like-multiple-pseudo-elements): Unlimited Pseudo Elements with More Placement Options

Why do we only get `::before` and `::after`? I’m sure there are historical discussions you could dig up, but whatever happened, that’s how it was specced out. Feels a little arbitrary to me, like if someone decided functions in JavaScript could only have two arguments. What if it matched the great API that is `insertAdjacentHTML` and we had `::beforebegin`, `::afterbegin`, `::beforeend`, and `::afterend`? That would be nice. Even better, no particular limit to them, like `::afterbegin(n)` which would allow us to add as many of these as we like. After all, they help us keep non-content elements out of HTML, which is typically A Good Thing™.

### [<FontIcon icon="fas fa-globe"/>Ryan Trimble](https://css-tricks.com/a-css-wishlist-for-2025/#aa-6-promoting-elements-to-the-top-layer-without-popover): Promoting Elements to the Top Layout *without* Popover

A massive reason to use the `popover` attribute to create native popovers is that you don’t have to fiddle with `z-index` and stacking contexts and such. If it’s open, users will be able to see it, because it’s promoted to what’s called the “top layer”. This is an amazing feature! I can imagine how careful the specs need to be to prevent it from being just another thing that’s easy for authors to screw up, but I can also imagine opening up this superpower to more than the handful of things that happen to use it today.

### Me: An `extend()` Function

The concept of “extend” (in my mind) [<FontIcon icon="fa-brands fa-sass"/>comes from Sass](https://sass-lang.com/documentation/at-rules/extend/). It means: make this selector have the same styles as this other selector. Maybe it could remain an at-rule in CSS that looks like a function?

```css
/* somewhere in any loaded CSS */
.special-title-style {
  paint-order: stroke fill;
  -webkit-text-stroke: 6px #b39ddb;
  text-shadow: -1px -1px 0 white;
}

/* somewhere else in CSS */
#matching .what .the .CMS [gave-me] {
  @extend(.special-title-style); /* NOTE: not real yet */
}
```

This would be helpful when you have less control over the HTML. Like you *both* don’t want to wrestle control over what the CMS is outputting (because that’s technical debt) *and* you don’t want to bend your CSS system to the whims of the CMS either.

Sass has `@extend()` and it’s sometimes called an anti-pattern, but that’s largely because it can produce ultra-verbose CSS that you might not even be aware of, which would not be a problem in native CSS.

### [<FontIcon icon="fas fa-globe"/>Rachel Andrew](https://rachelandrew.co.uk/archives/2024/12/20/a-progress-update-on-reading-flow/): Regions & Reading Flow

With grid and flexbox we were given the power to easily reflow and [<FontIcon icon="fas fa-globe"/>reorder](https://css-tricks.com/almanac/properties/o/order/) elements in ways that very much do not match whatever the current languages natural flow is (e.g. left to right and top to bottom). This can be an accessibility issue where the source order, and thus typically the tabbing order, doesn’t match the visual order, which can confuse people and/or lead to awkward screen-jumping.

There is a draft for `reading-flow` that [<FontIcon icon="fas fa-globe"/>Rachel explains](https://rachelandrew.co.uk/archives/2024/12/20/a-progress-update-on-reading-flow/):

::: info Rachel Andrew (<FontIcon icon="fas fa-globe"/><code>rachelandrew.co.uk</code>)

```component VPCard
{
  "title": "A progress update on reading-flow – Rachel Andrew",
  "desc": "There’s a First Public Working Draft of CSS Display 4, which includes the work on the new reading-flow property. The property aims to solve the issue where the source (and therefore tab) order of a page gets disconnected from layout when using CSS grid layout or flexbox.",
  "link": "https://rachelandrew.co.uk/archives/2024/12/20/a-progress-update-on-reading-flow//",
  "logo": "https://rachelandrew.co.uk/wp-content/uploads/2022/07/favicon1.png",
  "background": "rgba(245,246,247,0.2)"
}
```

> The property aims to solve the issue where the source (and therefore tab) order of a page gets disconnected from layout when using CSS grid layout or flexbox. This is a problem I’ve been [<FontIcon icon="fas fa-globe"/>talking and writing about for a long time](https://rachelandrew.co.uk/archives/2019/06/04/grid-content-re-ordering-and-accessibility/). As soon as I realized this problem existed when using grid, I felt as if we were giving people potential with one hand but then removing it with the other. I’m very happy that we’re now fixing that problem.

:::

Yes please.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/Screenshot-2025-01-13-at-11.17.28%E2%80%AFAM.png?resize=1020%2C270&ssl=1)

The rule `reading-flow: grid-rows` [<FontIcon icon="fa-brands fa-chrome"/>in this demo](https://chrome.dev/reading-flow-examples/grid-placement-row.html) would make assistive tech read how it *looks* (4, 2, 3, 1) rather than what the source is (1, 2, 3, 4).

At the risk of sounding lazy, I’d want to do `html { reading-flow: make-it-all-correct; }` — that is — just not worry about moving around the order of things, make a browser heuristic in charge of making the tab ordering logical.

### Me: `image-set()` with Container Size Breakpoints

I just ran across this the other day so I figured I’d put it on my list. I had a container where I wanted to swap out the `background-image` at different container widths. Container queries can do this by writing a container queries that override the `background-image`, but it occurs to me that we could do it in a more concise [<FontIcon icon="fa-brands fa-firefox"/>`image-set()`](https://developer.mozilla.org/en-US/docs/Web/CSS/image/image-set) declaration if that were to be allowed.

```scss{5-8}
.card {
  container: card / inline-size;

  .card-banner {
    background-image: image-set(
      /* Not real... yet */
      "small.jpg" container(width < 500px)
      "large.jpg" container(width >= 500px)
    );
  }
}
```

### [<FontIcon icon="fas fa-globe"/>Sarah Gebauer](https://sarahgebauer.com/post/css-wishlist-2024/): `:local-link`

::: info Sarah Gebauer (<FontIcon icon="fas fa-globe"/><code>sarahgebauer.com</code>)

```component VPCard
{
  "title": "CSS Wishlist (2024)",
  "desc": "About a year ago at the end of CSSMas I wrote a post about my CSS wishes, as this is the last post in the series it's fitting to write another wish list. There won't be another one after this from me any time soon.",
  "link": "https://sarahgebauer.com/post/css-wishlist-2024/",
  "logo": "https://sarahgebauer.com/assets/favicon.ico",
  "background": "rgba(253,242,229,0.2)"
}
```

> The pseudo-class `:local-link` is a selector which targets links that point to the same web site. At the moment it’s not supported by any browser.

:::

That would be cool. I wonder if people had easier access to *style* same-website links differently easily, they would be less [<FontIcon icon="fas fa-globe"/>quick to `target="_blank"`](https://css-tricks.com/use-target_blank/), which I’m of the opinion you should only do in rare and specific circumstances.

### [<FontIcon icon="fas fa-globe"/>Roman Komarov](https://kizu.dev/shrinkwrap-problem/): Shrinkwrapping

::: info Roman Komarov (<FontIcon icon="fas fa-globe"/><code>kizu.dev</code>)

```component VPCard
{
  "title": "The Shrinkwrap Problem: Possible Future Solutions",
  "desc": "There is one old, yet unsolved, CSS problem: shrinking containers to fit the content when it automatically wraps. While not intentional, anchor positioning allows us to come closer to solving it, at least for a few cases. In this article, I’ll demonstrate how we can use anchor positioning to neatly decorate wrapping text or elements in flex or grid contexts.",
  "link": "https://kizu.dev/shrinkwrap-problem/",
  "logo": "https://kizu.dev/favicon.ico",
  "background": "rgba(4,7,3,0.2)"
}
```

> There is one old, yet unsolved, CSS problem: shrinking containers to fit the content when it automatically wraps.

:::

When an element wraps, the width becomes as wide as the container. But that feels/looks silly sometimes when the new now-wrapped content doesn’t occupy all that space.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/CleanShot-2025-01-14-at-10.49.41.gif?resize=764%2C800&ssl=1)

### [<FontIcon icon="fas fa-globe"/>Me](https://chriscoyier.net/2022/12/21/things-css-could-still-use-heading-into-2023/): Be able to style the handle on resizeable elements

See those little line nuggets in the bottom right? I think they are ugly and I want to style them.

Not to mention I might want to move or resize them, potentially bettering the UX.

### [<FontIcon icon="fas fa-globe"/>Geoff Graham](https://css-tricks.com/a-css-wishlist-for-2025/#aa-2-css-mixins): Mixins

A mixin is like a function, only the returned value is always style rules.

::: info Geoff Graham (<FontIcon icon="fas fa-globe"/><code>css-tricks.com</code>)

<SiteInfo
  name="A CSS Wishlist For 2025 | CSS-Tricks"
  desc="2024 has been one of the greatest years for CSS: cross-document view transitions, scroll-driven animations, anchor positioning, animate to height: auto, and"
  url="https://css-tricks.com/a-css-wishlist-for-2025/"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://css-tricks.com/wp-json/social-image-generator/v1/image/383249"/>

> The deal is that we can use utility classes almost as little CSS snippets to build out other style rules and maintain a clearer separation between markup and styles.

:::

```scss
@mixin --sr-text {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

header a:first-child {
  @apply --sr-text;
}
```

I’ll note that [**style queries are really close to mixins**](/frontendmasters.com/css-does-need-mixins.md) in my mind, which actually have some support already.

### Me: Trim Text from the Middle

Let’s say you want output:

```plaintext
/styles/setup/colors.scss
```

But you only have ~15 characters to do it in. We have `text-overflow` (‘n’ friends) now to truncate it to something like:

```plaintext
/styles/setup...
```

But that could be awful as the entire file name is being truncated away. There is [a wild CSS trick (<FontIcon icon="fa-brands fa-codepen"/>`jakob-e`)](https://codepen.io/jakob-e/pen/JoPpYqW) to truncate it from the other side, but I’d prefer something less hacky. And even better, we should be able to do that truncation *from the middle* instead of an edge. I think it would be nice to get something like:

```plaintext
/styl...lors.scss
```

### Styling Grid Gaps and Cells

It’s to hard to style the gaps *between* grid columns and rows. Just want a 1px line between all the columns? There are ways, but nothing just easy and side-effect-free. For that matter, it could be argued it shouldn’t be necessary to put an HTML element into a grid cell in order to style it. That would be nice to do in CSS alone.

---

## The “Want Better Support” List

### A `random()` Function

[<FontIcon icon="fas fa-globe"/>There is a working draft for this already done.](https://drafts.csswg.org/css-values-5/#randomness) So I suppose this is more of a waiting game.

There are plenty of design choices that benefit from a degree of randomness. Random dots on a grid, random movements, random timings…

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/CleanShot-2025-01-14-at-10.55.57.gif?resize=800%2C457&ssl=1)

Which of these animations runs first? What if you didn’t have to decide, you could just randomize it each run? Would it benefit from randomized delays, durations, or easings?

If we try generate the random number, with, say, [a CSS processor (<FontIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/nKZdBo), that randomness is only calculated once and won’t feel particularly random across users and page loads.

What’s less clear to me about this runtime version of randomness is how often it will be calculated. Like if you did `div { height: random(100px, 200px); }`, and that selector matched 50 `<div>`s, would each of them have a random height or would all 50 of them have the same height, even if that height is randomly calculated. Or if you used `random()` within a `@keyframe` animation that infinitely animates, would the value be re-calculated each iteration? I suspect it’s stuff like that which makes it something browsers don’t want to jump on implementing until they have very clear answers.

### [Eric Meyer](https://meyerweb.com/eric/thoughts/2025/01/08/css-wish-list-2025/): `margin-trim`

::: info Eric Meyer (<FontIcon icon="fas fa-globe"/><code>meyerweb.com</code>)

```component VPCard
{
  "title": "CSS Values and Units Module Level 5",
  "desc": "This CSS module describes the common values and units that CSS properties accept and the syntax used for describing them in CSS property definitions.",
  "link": "https://drafts.csswg.org/css-values-5/#randomness/",
  "logo": "",
  "background": "rgba(47,93,149,0.2)"
}
```

> Trim off the leading block margin on the first child in an element, or the trailing block margin of the last child, so they don’t stick out of the element and mess with margin collapsing. Same thing with block margins on the first and last line boxes in an element.  And then, be able to do similar things with the inline margins of elements and line boxes!  All these things could be ours.

:::

I really want this as it seems to come up for me *a lot*. That is, this kind of thing…

```scss
.card {
  padding: 1rem;
  
  :first-child {
    margin-block-start: 0;
  }
  :last-child {
    margin-block-end: 0;
  }
}
```

Those extra selectors are easy to forgot and feel a bit fragile to me. I’d rather write:

```scss
.card {
  padding: 1rem;
  margin-trim: block;
}
```

The [<FontIcon icon="fa-brands fa-firefox"/>`margin-trim` property is already in Safari](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim#browser_compatibility) so let’s go. My thinking on this boils down to **if you set padding in a direction on an element, `margin-trim` in that same direction.**

While we’re talking about trimming, Jason Bradberry’s [<FontIcon icon="fas fa-globe"/>Why I’m excited about text-box-trim as a designer](https://piccalil.li//blog/why-im-excited-about-text-box-trim-as-a-designer/) deserves a shout-out on this list.

### The “ui” font families everywhere

The most popular and well-supported of these is `system-ui` and I see plenty of that on the web already. It amounts to being able to use the San Francisco on modern Macs, Segoe on Windows, Roboto on Android, and the list goes on… generally matching what font the operating running the browser uses. I think that rules. But it doesn’t have to be the only one — and isn’t — [<FontIcon icon="fas fa-globe"/>in the spec](https://drafts.csswg.org/css-fonts-4/#generic-family-name-syntax). There are more like:

```plaintext
ui-serif
ui-sans-serif  
ui-monospace  
ui-rounded
```

Those don’t *have* to map to anything, but it’s sure nice if they do. They do in Safari on Mac and I kinda love it.

![Safari ([<FontIcon icon="fa-brands fa-codepen"/>Demo](https://codepen.io/chriscoyier/pen/GgKvOvL))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/Screenshot-2024-12-27-at-11.08.28%E2%80%AFAM.png?resize=1024%2C605&ssl=1)

This is a big wish as it’s not something that browser makers can just *do*. It requires, like, computer makers to agree and ship appropriate fonts that then map to these. I guess that’s why we call it a wishlist.

### [<FontIcon icon="fas fa-globe"/>Eric Meyer](https://meyerweb.com/eric/thoughts/2025/01/08/css-wish-list-2025/): Expanded `attr()` Support

::: tip Example from Eric (<FontIcon icon="fas fa-globe"/><code>meyerweb.com</code>)

<SiteInfo
  name="CSS Wish List 2025"
  desc="Back in 2023, I belatedly jumped on the bandwagon of people posting their CSS wish lists for the coming year.  This year I’m doing all that again, less belatedly! (I didn’t do it last year because I couldn’t even.  Get it?) I started this post by looking at what I wished for a couple of […]"
  url="https://meyerweb.com/eric/thoughts/2025/01/08/css-wish-list-2025//"
  logo="https://meyerweb.com/favicon.ico"
  preview="https://meyerweb.com/ui/i/hamonshu/fb-og-image.png"/>

```css
td {
  width: attr(data-size em, 1px)
}
```

```html
<td data-size="5">…</td>
```

:::

Yep. Love that. Part of what I like is that it moves *some* design information over to the HTML in a way that doesn’t need to be entirely prescribed right there. For example, setting `data-color="red"` gives you a lot more CSS opportunity to fiddle with than `style="color: red;"` does. Not to mention an easier way to back out of the support for it in the future which inline styles do not offer.

To be clear, `attr()` “works” now, the values you get out are just strings, not “typed”, so you can’t use them to set things like colors and sizes like you might expect you can.

### [<FontIcon icon="fas fa-globe"/>Ahmad Shadeed](https://ishadeed.com/article/css-wishlist-2023/#detect-when-sticky-is-active): State Queries

Ahmad has made good points over the years about being able to style things when in certain states. Like applying styles when a flexbox container has elements that are wrapping (vs when it’s not).

```css
.section-header {
  container-type: style flex-wrap;
  display: flex;
  flex-wrap: wrap;
}

@container style(wrap) {
  /* do the things you should do when the flex items are wrapped. */
}
```

[<FontIcon icon="fas fa-globe"/>Similarly](https://ishadeed.com/article/css-state-queries/), and this is a big one I’ve heard a million times, styling a sticky element *only when it is stuck.* I put this one in the “better support” section as there is [<FontIcon icon="fa-brands fa-google"/>actual movement on this](https://groups.google.com/a/chromium.org/g/blink-dev/c/C1D321h3OnA?pli=1).

```css
.page {
  container-name: sticky-header;
  container-type: sticky;
}

.site-header {
  position: sticky;
  top: 0;
}

@container state(stuck: top) {
  .site-header__bottom {
    display: none;
  }
}
```

### Custom Media Queries

There is [<FontIcon icon="fas fa-globe"/>a draft with this in it](https://drafts.csswg.org/mediaqueries-5/#custom-mq), but it’s never seem to come to be.

This doesn’t work:

```css
:root { --mobile: 35em; }

@media (min-width: var(--mobile)) {
  /* non-mobile styles go here */
}
```

The draft syntax was like this:

```css
@custom-media --narrow-window (max-width: 30em);

@media (--narrow-window) {
  /* narrow window styles */
}
```

But alas, nothing but [<FontIcon icon="fas fa-globe"/>this hack](https://stefanjudis.com/notes/the-death-of-custom-media-queries/).

### Style Queries that Support More Than Custom Properties

We actually have some support for style queries already, but all they can do is test custom properties. Example [<FontIcon icon="fa-brands fa-chrome"/>from Una](https://developer.chrome.com/docs/css-ui/style-queries):

```css
@container style(--theme: warm) {
  .card {
    background-color: wheat;
    border-color: brown; 
    /* ... */
  }
}
```

Above, if `--theme` matches the value `warm` (anywhere), then the nested styles will get applied to the relevant container. But we *don’t* have access to styling information generally to query against. Like this:

```css
@container style(background: black) {
  a {
    color: white;
  }
}
```

Perhaps that’s not an amazing example, but being able to write styles that apply themselves based on arbitrary other styles on a container would be powerful.

---

What’s on *your* CSS wishlist?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Wishlist for 2025",
  "desc": "Hey we might as well spill out all these wishes as the CSS feature train has been rolling and we oughta get while the getting is good.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/css-wishlist-for-2025.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
