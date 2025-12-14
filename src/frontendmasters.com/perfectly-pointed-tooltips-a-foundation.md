---
lang: en-US
title: "Perfectly Pointed Tooltips: A Foundation"
description: "Article(s) > Perfectly Pointed Tooltips: A Foundation"
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
      content: "Article(s) > Perfectly Pointed Tooltips: A Foundation"
    - property: og:description
      content: "Perfectly Pointed Tooltips: A Foundation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/perfectly-pointed-tooltips-a-foundation.html
prev: /programming/css/articles/README.md
date: 2025-10-28
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7514
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
  name="Perfectly Pointed Tooltips: A Foundation"
  desc="The Anchor Positioning API in CSS is very powerful. This is the beginning of a series where we understand it through the perfect use-case: tooltips."
  url="https://frontendmasters.com/blog/perfectly-pointed-tooltips-a-foundation/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7514"/>

::: info Article Series

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: A Foundation",
  "desc": "The Anchor Positioning API in CSS is very powerful. This is the beginning of a series where we understand it through the perfect use-case: tooltips.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-a-foundation.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: All Four Sides",
  "desc": "Tooltips are a natural fit for the abilities of Anchor Positioning, which can help place them on *any* side or corner. It does make dealing with the pointer extra tricky though.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-all-four-sides.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: To The Corners",
  "desc": "With our foundation in positioning and flipping tooltips with anchors, and making pointer tails, we're going to get extra tricky and point them diagonally.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-to-the-corners.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

Tooltips are a classic in web development. You click on an element, and a small bubble appears to display additional details. Behind that simple click, there tends to be JavaScript performing calculations to determine the correct position for the tooltip. Let’s try to place it at the top. Nope, not enough space. Let’s try the bottom instead. It’s also touching the right edge so let’s shift it a bit to the left. There is a lot that can go into making sure a tooltip is placed well without any cutoffs losing information.

In this article, I will show you how to write good JavaScript that covers all the possibilities…

Kidding! We’ll be using CSS and I will show how the modern [<VPIcon icon="fa-brands fa-firefox"/>anchor positioning API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) can help us with all this. None of the weight and performance concerns of JavaScript here.

::: note

At the time of writing, only Chrome and Edge have full support of the features we will be using.

:::

Let’s start with a demo:

<CodePen
  user="t_afif"
  slug-hash="RNrKmpY"
  title="Follow me if you can! (drag the anchor)"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Click-and-drag the anchor and see how the tooltip behaves. It will try to position itself in a way to remain visible and avoid any overflow. Cool, right? No JavaScript is used to position the tooltip (except the one for dragging the anchor, which is irrelevant to the trick).

This is made possible thanks to the new [<VPIcon icon="fa-brands fa-firefox"/>Anchor Positioning API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) and a few other tricks we will dissect together. We will also study more examples, so if you are new to anchor positioning, you are in the right place.

---

## The Initial Configuration

Let’s start with the markup: An anchor element and its tooltip:

```html
<div id='anchor'></div>
<div id='tooltip'></div>
```

This isn’t interesting HTML, but it does showcase how the anchor and the tooltip are different elements that don’t need to be parent/child. They can be anywhere in the DOM and the CSS can handle that (though, for practical and accessibility reasons, you may want to keep them close together and associate them).

The HTML structure you use will depend on your use case and your type of content, so choose it carefully. In all cases, it’s mainly one element for the anchor and another one for the tooltip.

Here is a demo taken from another [**article**](/frontendmasters.com/custom-range-slider-using-anchor-positioning-scroll-driven-animations.md) where the anchor is the thumb of a slider and the tooltip is an `<output>` element:

<CodePen
  user="t_afif"
  slug-hash="dPGVXyv"
  title="Initial configuration"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

The CSS:

```css
#anchor {
  anchor-name: --anchor;
}
#tooltip {
  position: absolute; 
  position-anchor: --anchor;
  position-area: top;
}
```

We define the anchor using `anchor-name`, link the tooltip to the anchor using `position-anchor` (and a custom ident, the `--anchor` bit that looks like a custom property but is really just a unique name), and then we place it at the top using `position-area`. The tooltip needs to be absolutely positioned (which includes fixed position as well).

<CodePen
  user="t_afif"
  slug-hash="dPGVXyv"
  title="Initial configuration"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Nothing fancy so far. The tooltip is “always” placed at the top, whatever the anchor’s position. You can drag the anchor to see the result.

In this article we’ll use simple values for `position-area`, but this property can be very tricky.

![I’ve created [**an interactive demo**](/css-tip.com/position-area.md) if you want to explore all the different values and understand how alignment works in the context of Anchor Positioning.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/1hmIC9A1.png?resize=833%2C622&ssl=1)

Now that our tooltip is placed, let’s add a small offset at the bottom to prepare the space for the tail. Using `bottom` will do the job.

```css
#anchor {
  anchor-name: --anchor;
}
#tooltip {
  --d: 1em; /* distance between tooltip and anchor */

  position: absolute; 
  position-anchor: --anchor;
  position-area: top;
  bottom: var(--d);
}
```

<CodePen
  user="t_afif"
  slug-hash="YPwEVqm"
  title="adding gap"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Making the Position Dynamic

Let’s move to the interesting part, where we will adjust the position of the tooltip to make it always visible and avoid any overflow. Anchor Positioning has native mechanisms to do this, and all we need to do is understand how to use them correctly.

The first thing is to identify the containing block of the absolutely positioned element. We may intuitively think that the logic is to avoid a screen overflow, but that’s not the case. It’s related to the containing block. This can be very confusing if you don’t understand this part, so let’s look closely.

::: info The specification (<VPIcon icon="fas fa-globe"/><code>w3.org</code>)

> Anchor positioning, while powerful, can also be unpredictable. The anchor box might be anywhere on the page, so positioning a box in any particular fashion might result in the positioned box **overflowing its containing block** or being positioned partially off screen.
> 
> To ameliorate this, an absolutely positioned box can use the position-try-fallbacks property to refer to several variant sets of positioning/alignment properties that the UA can try if the box overflows its initial position. Each is applied to the box, one by one, and the first **that doesn’t cause the box to overflow its containing block** is taken as the winner.

```component VPCard
{
  "title": "CSS Anchor Positioning",
  "desc": "Anchor positioning, while powerful, can also be unpredictable. The anchor box might be anywhere on the page, so positioning a box in any particular fashion (such as above the anchor, or the right of the anchor) might result in the positioned box overflowing its containing block or being positioned partially off screen.",
  "link": "https://w3.org/TR/css-anchor-position-1/#fallback/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```
:::

As you can read, it’s all about the containing block, and the containing block of an absolutely positioned element is the first ancestor with a position different from `static` (the default). If such element doesn’t exist we consider [**the initial containing block**](/css-tip.com/initial-containing-block.md).

In our example, I am going to use the body as the containing block, and I will add a border and an offset from each side to better illustrate:

<CodePen
  user="t_afif"
  slug-hash="OPMOwNO"
  title="the containing block"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Drag the anchor to the left or the right and see what happens. When the tooltip touches the edges, it stops, even if you can still move the anchor. It overflows the body only when the anchor is getting outside.

The browser will initially place the tooltip at the top and centered. The priority is to remain withing the containing block, so if there isn’t enough space to keep the center behavior, the tooltip is shifted. The second priority is to keep the anchor behavior, and in this case, the browser will allow the overflow if the anchor element is outside.

![A three-part interactive demo showing a tooltip following an anchor element as it is dragged. The tooltip displays the message 'Drag the anchor and I should follow...' with an anchor icon below.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/SW5hUi3K.png?resize=1024%2C228&ssl=1)

Assuming the anchor will remain within the body area, we already have what we want without too much effort. The tooltip will never overflow from the right, left, or bottom side. What remains is the top.

By default, the browser can shift the element within the area defined by `position-area`, but cannot do more than that. We need to instruct the browser on how to handle the other cases. For this, we use `position-try-fallbacks` where we define different positions for the browser to “try” in case the element doesn’t fit its containing block.

Let’s define a bottom position:

```css
position-try-fallbacks: bottom;
```

Drag the anchor to the top and see what happens:

<CodePen
  user="t_afif"
  slug-hash="PwZOyZq"
  title="adding a fallback position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Now, when the tooltip overflows the body from the top, the position becomes “bottom”. It will also remain bottom until the tooltip overflows again from the bottom. In other words, when the browser picks a position after an overflow, it keeps it until a new overflow happens.

That’s all, we are done! Now our tooltip is perfectly placed, whatever the anchor position.

::: note

But we no longer have the gap when the position is at the bottom (for the future arrow). How do we fix that?

:::

We told the browser to only change the value of `position-area` to `bottom`, but we can do better by using:

```css
position-try-fallbacks: flip-block;
```

“Block” refers to the block axis (the vertical axis in our default writing mode), and this instruction means flip the position across the vertical axis. The logic is to mirror the initial position on the other side. To do this the browser needs to update different properties in addition to `position-area`.

In the example we’ve defined `position-area: top` and `bottom: var(--d)`. With `position-try-fallbacks: flip-block` in place, when that flip happens, it’s as if we defined `position-area: bottom` and `top: var(--d)`. We keep the gap!

<CodePen
  user="t_afif"
  slug-hash="wBMPYoz"
  title="flip-block"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

If you are a bit lost and confused, don’t worry. We are dealing with new mechanisms not common to the CSS world so it may take time to click for you.

To sum up, we can either instruct the browser to update only the `position-area` by defining a new position or to “flip” the actual position across one axis which will update different properties.

---

## Adding The Tail

Adding a tail to a tooltip is pretty straightforward (I even have a [<VPIcon icon="fas fa-globe"/>collection of 100 different designs](https://css-generators.com/tooltip-speech-bubble/)), but changing the direction of the tail based on the position is a bit tricky.

![Three tooltip examples illustrating text that says 'Drag the anchor and I should follow...' with an anchor icon, showcasing dynamic positioning.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/aAotEaeC.png?resize=940%2C230&ssl=1)

For now, Anchor Positioning doesn’t offer a way to update the CSS based on the position, but we can still use the existing features to “hack” it. Hacking with CSS can be fun!

I am going to rely on the “flip” feature and the fact that it can update the margin to achieve the final result.

First, I will consider a pseudo-element to create the tail shape:

```css
#tooltip {
  --d: 1em; /* distance between tooltip and anchor */
  --s: 1.2em; /* tail size */
}
#tooltip::before {
  content: "";
  position: absolute;
  z-index: -1;
  width: var(--s);
  background: inherit;
  inset: calc(-1*var(--d)) 0;
  left: calc(50% - var(--s)/2);
  clip-path: polygon(50% .2em,100% var(--d),100% calc(100% - var(--d)),50% calc(100% - .2em),0 calc(100% - var(--d)),0 var(--d));
}
```

<CodePen
  user="t_afif"
  slug-hash="NPxyqed"
  title="adding the tail"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Both tails are visible by default. Click “debug mode” to better understand the shape and how it’s placed.

When the tooltip is at the top, we need to hide the top part. For this, we can use a `margin-top` on the pseudo-element equal to variable `--d`. And when the tooltip is at the bottom, we need `margin-bottom`.

I am going to define the `margin` on the tooltip element and then inherit it on pseudo-element:

```css
#tooltip {
  --d: 1em; /* distance between tooltip and anchor */
  --s: 1.2em; /* tail size */

  margin-top: var(--d);
}
#tooltip::before {
  margin: inherit;
}
```

<CodePen
  user="t_afif"
  slug-hash="wBMyaZo"
  title="fixing the vertical position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Tada. Our tooltip is now perfect! The use of margin will hide one side keeping one tail visible at a time.

::: note

But we didn’t define `margin-bottom`. How does it work for the bottom position?

:::

That’s the “flip” feature. Remember what we did with the gap where we only defined `top` and `flip-block` changed it to `bottom`? The same logic applies here with margin: the `margin-top` automatically becomes a `margin-bottom` when the position is flipped! Cool, right?

Note that using margin will cause the tooltip to flip a bit earlier since margin is part of the element, and the logic is to prevent the overflow of the “margin box”. It’s not a big deal in our example; it’s nicer to flip the position before it touches the edges.

---

## Moving The Tail

The top and bottom parts are good, but we still need to fix the cases where the tooltip shifts when it’s close to the left and right edges. The tail needs to follow the anchor. For this, we have to update the left value and make it follow the anchor position.

Instead of:

```css
left: calc(50% - var(--s));
```

We use:

```css
left: calc(anchor(--anchor center) - var(--s)/2);
```

I replace `50%`, which refers to the center of the tooltip element, with `anchor(--anchor center)`, which is the center of the anchor element.

The `anchor()` function is another cool feature of Anchor Positioning. It allows us to query a position from any anchor element and use it to place an absolutely positioned element.

<CodePen
  user="t_afif"
  slug-hash="JoGpKqG"
  title="adding anchor()"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

*Uh oh — that doesn’t work.* I’ve left this in though, as it’s a educational moment we need to look at.

We hit one of the trickiest issues of Anchor Positioning. In theory, any element on the page can be an anchor using `anchor-name` and any other element can position itself relative to that anchor. That’s the main purpose of the feature but there are exceptions where an element cannot reference an anchor.

I won’t detail all the cases, but in our example, the pseudo-element (the tail) is a child of the tooltip, which is an absolutely positioned element. This makes the tooltip the containing block of the pseudo-element and prevents it from seeing any anchor defined outside it. (If you think z-index and stacking context are hard, get ready for this)

To overcome this, I will update the position of the pseudo-element to fixed. This changes its containing block (the viewport at the moment) and makes it able to see the anchor element.

<CodePen
  user="t_afif"
  slug-hash="WbrMGea"
  title="using fixed position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Yes, the demo is broken, but drag the anchor close to the edges and see how the tail is correctly placed horizontally as it’s now able to “see” the anchor element. However, the pseudo-element now has a fixed position so it can no longer be placed relatively to its parent element, the tooltip. To fix this we can make the tooltip an anchor element as well, so the pseudo-element can reference it.

In the end we need *two* anchors: `#anchor` and `#tooltip`. The tooltip is positioned relatively to the anchor, and the tail is positioned relatively to both the anchor and the tooltip.

```css
#anchor {
  position: absolute;
  anchor-name: --anchor;
}
#tooltip {
  --d: 1em;  /* distance between anchor and tooltip  */
  --s: 1.2em; /* tail size */
  
  position: absolute; 
  position-anchor: --anchor;
  anchor-name: --tooltip;
}
/* the tail */
#tooltip:before {
  content: "";
  position: fixed;
  z-index: -1;
  width: var(--s);
  /* vertical position from tooltip  */
  top:    calc(anchor(--tooltip top   ) - var(--d));
  bottom: calc(anchor(--tooltip bottom) - var(--d));
  /* horizontal position from anchor */
  left: calc(anchor(--anchor center) - var(--s)/2);
}
```

Thanks to `anchor()`, I can retrieve the top and bottom edges of the tooltip element and the center of the anchor element to correctly position the pseudo-element.

<CodePen
  user="t_afif"
  slug-hash="bNELwpm"
  title="Final demo"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

Our tooltip is now perfect! As I mentioned in the introduction, this CSS is not particularly complex. We barely used 20 declarations.

::: note

What if we want to start with the bottom position?

:::

Easy! You simply change the initial configuration to consider the bottom position and `flip-block` will switch to the top one when there is an overflow.

```css
#tooltip {
  position-area: bottom; /* instead of position-area: top; */
  top: var(--d); /* instead of bottom: var(--d); */
  margin-bottom: var(--d); /* margin-top: var(--d) */
}
```

<CodePen
  user="t_afif"
  slug-hash="WbrzJKP"
  title="changing to bottom position"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Conclusion

That’s all for this first part. We learned how to place a tooltip using `position-area` and how to defined a fallback position when an overflow occurs. Not to mention the flip feature and the use of the `anchor()` function.

In the second part (coming soon!), we will increase the difficulty by working with more than two positions. Take the time to digest this first part before moving to the next one I also invite you to spend a few minutes on [**my interactive demo of `position-area`**](/css-tip.com/position-area.md) to familiarize yourself with it.

::: info Article Series

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: A Foundation",
  "desc": "The Anchor Positioning API in CSS is very powerful. This is the beginning of a series where we understand it through the perfect use-case: tooltips.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-a-foundation.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: All Four Sides",
  "desc": "Tooltips are a natural fit for the abilities of Anchor Positioning, which can help place them on *any* side or corner. It does make dealing with the pointer extra tricky though.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-all-four-sides.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Perfectly Pointed Tooltips: To The Corners",
  "desc": "With our foundation in positioning and flipping tooltips with anchors, and making pointer tails, we're going to get extra tricky and point them diagonally.",
  "link": "/frontendmasters.com/perfectly-pointed-tooltips-to-the-corners.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Perfectly Pointed Tooltips: A Foundation",
  "desc": "The Anchor Positioning API in CSS is very powerful. This is the beginning of a series where we understand it through the perfect use-case: tooltips.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/perfectly-pointed-tooltips-a-foundation.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
