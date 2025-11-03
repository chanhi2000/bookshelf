---
lang: en-US
title: "Perfectly Pointed Tooltips: All Four Sides"
description: "Article(s) > Perfectly Pointed Tooltips: All Four Sides"
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
      content: "Article(s) > Perfectly Pointed Tooltips: All Four Sides"
    - property: og:description
      content: "Perfectly Pointed Tooltips: All Four Sides"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/perfectly-pointed-tooltips-all-four-sides.html
prev: /programming/css/articles/README.md
date: 2025-11-03
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7543
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
  name="Perfectly Pointed Tooltips: All Four Sides"
  desc="Tooltips are a natural fit for the abilities of Anchor Positioning, which can help place them on *any* side or corner. It does make dealing with the pointer extra tricky though."
  url="https://frontendmasters.com/blog/perfectly-pointed-tooltips-all-four-sides/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7543"/>

Time for part two! We’ve got really nice functional positioned tooltips already, but they were mostly concerned with “pointing” up or down and shifting at the edges to avoid overflow. Now we’re going to take it further, considering **_four_** positions without shifts.

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

:::

::: note

At the time of writing, only Chrome and Edge have full support of the features we will be using.

:::

Here is a demo of what we are making:

CodePen Embed Fallback
https://codepen.io/t_afif/pen/QwyMrvG
Follow me if you can! (drag the anchor)

Drag the anchor and see how the tooltip switches between the four positions and how it remains centered relatively to the anchor.

---

## The Initial Configuration

We are going to use the same code structure as in the first part. We start with the tooltip placed above the anchor (the “top”).

```html
<div id='anchor'></div>
<div id='tooltip'></div>
```

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

CodePen Embed Fallback
https://codepen.io/t_afif/pen/YPwEVqm
adding gap

From here on, things will be different from the previous example.

---

## Defining Multiple Positions

The `position-try-fallbacks` property allows us to define multiple positions. Let’s try the following:

```css
position-try-fallbacks: bottom, left, right;
```

Let’s not forget that the placement is related to the containing block, which is the body in our example (illustrated with the dashed border):

CodePen Embed Fallback
https://codepen.io/t_afif/pen/LEGQXoG/f008b8ee74788eef7c17daf4851cbb4c
Untitled

We *almost* have the same behavior as the first example; however if you are close to the right or left edges, you get the new positions. Instead of overflowing, the browser will swap to the right or left position.

![Illustration showing a tooltip following an anchor, with a crossed-out example on the left and a correct behavior on the right, displaying the text 'Drag the anchor and I should follow...'](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/7h4aIKLl.png?resize=868%2C245&ssl=1)

Similar to the first example, the gap disappears when switching to the fallback positions. We know how to fix it! Instead of explicitly defining the positions, we can rely on the “flip” feature.

To move from top to bottom, we use `flip-block`:

```css
position-try-fallbacks: flip-block, left, right;
```

From top to left, we use `flip-start`:

```css
position-try-fallbacks: flip-block, flip-start, right;
```

The `flip-block` value mirrors the position across the horizontal axis, and `flip-start` does the same across the diagonal. With this value, we can move from top to left and from bottom to right. And logically, we also have a `flip-inline` that considers the vertical axis to move from left to right.

::: note

But how do we move from top to right? We are missing another value, right?

:::

No, we have all the necessary values. To move from top to right, we *combine* two flips: `flip-block` to move to the bottom, then `flip-start` to move to the right:

```css
position-try-fallbacks: flip-block, flip-start, flip-block flip-start;
```

Or `flip-start` to move to the left, and then `flip-inline` to move to the right:

```css
position-try-fallbacks: flip-block, flip-start, flip-start flip-inline;
```

CodePen Embed Fallback
https://codepen.io/t_afif/pen/ZYQxKjy/d9b8e34dd58a044957b40a251b0fc415
Untitled

It should be noted that all the flips consider the initial position defined on the element and not the previous position defined on `position-try-fallbacks` or the current position. If we first perform a `flip-block` to move to the bottom, the `flip-start` of the second position will not consider the bottom position but the top position (the initial one). This can be confusing, especially when you have many positions.

Said differently, the browser will first transform all the flips into positions (considering the initial position) and then pick the suitable one when needed.

---

## Disabling the Shift Behavior

What we have is actually good and might work perfectly for some use-cases, but we’re aiming for slightly more advanced functionality. What we want is to flip to the left or right position as soon as the tooltip touches the edges. We don’t want to have the “shift” behavior. I want the tooltip to remain always centered relatively to the anchor.

![Image showing four tooltip positions in relation to an anchor, with text indicating interaction.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/SSD0LZHO.png?resize=897%2C320&ssl=1)

For this, we can use:

```css
justify-self: unsafe anchor-center;
```

::: note

What is this strange value!?

:::

After defining the position of an element using `position-area` we can also control its alignment using `justify-self` and `align-self` (or the shorthand `place-self`). However, we get a default alignment that you rarely need to change.

For `position-area: top`, the default alignment is equivalent to `justify-self: anchor-center` and `align-self: end`.

::: note

Don’t we have a `center` value? Why is it called `anchor-center`?

:::

The `center` value exists, but its behavior is different from `anchor-center`. The `center` value considers the center of the area, while `anchor-center` considers the center of the anchor in the relevant axis.

Here is a screenshot taken from [**my interactive demo**](/css-tip.com/position-area.md), where you can see the difference:

![Comparison of element alignment in CSS, showing the difference between centering in the top area versus centering at the anchor point.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/nrJHmtpZ-1.png?resize=975%2C489&ssl=1)

In addition to that, `anchor-center` follows the logic of [**safe alignment**](/css-tip.com/safe-align.md) which cause the shift behavior. When there is not enough room for centering, the element will shift to remain within the containing block area. To disable this, we tell the browser to consider an “unsafe” behavior hence the use of:

```css
justify-self: unsafe anchor-center;
```

Here is a demo with only the top and bottom positions. Notice how the tooltip will overflow from the left and right sides instead of shifting.

CodePen Embed Fallback
https://codepen.io/t_afif/pen/Wbrzjjb/159e2f67a7a6e2b14bacec4fc4f45591
Untitled

And if we add back the left and right positions to the fallbacks, the browser will use them instead of overflowing!

CodePen Embed Fallback
https://codepen.io/t_afif/pen/VYeXbVg/02b211bba024d28a17e5ea15846080bc
Untitled

It should be noted that `justify-self` is also included in the flip. It’s one of those properties that the browser changes when flipping. When the position is top or bottom, it remains `justify-self`, but when the position is left or right, it becomes `align-self`. Another reason why it’s better to consider the flip feature instead of explicitly defining a position.

---

## Adding `min-width`

The position of the tooltip is now good, but in some particular cases, it’s too narrow.

![A tooltip with a blue background displaying the text 'Drag the anchor and I should follow...' is positioned above a gray anchor icon.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/avEUiDCW.png?resize=295%2C234&ssl=1)

That’s a logical behavior since the text inside can wrap to make the tooltip fit that position. You probably want to keep that behavior, but in our case, we’d like to add `min-width` to force it to flip to another position before shrinking too much. It can also be a `max-height` as well.

CodePen Embed Fallback
https://codepen.io/t_afif/pen/vELRZKB/d7845171d64b9390b7a6af08af748512
Untitled

Oops, `min-width` is not preventing wrapping, but it is increasing the height! What?!

Can you guess what the issue is? Think a moment about it.

It’s the flip behavior.

The `min-width` and all the sizing properties are also affected by the flip. The initial configuration is top, so defining `min-width` means that when we perform a flip-start to move to the left or the right position, the `min-width` becomes `min-height`, which is not good.

::: note

So we define `min-height` instead, when flipped it becomes `min-width`!

:::

Yes, but the `min-height` will apply to the top and bottom positions, which is not ideal either.

We can fix this by using custom positions where we define all the properties manually.

```css
#tooltip {
  min-width: 10em;

  position-area: top;
  justify-self: unsafe anchor-center;
  bottom: var(--d);
  position-try-fallbacks: flip-block,--left,--right;
}
@position-try --left {
  position-area: left;
  justify-self: normal;
  align-self: unsafe anchor-center;
  right: var(--d);
}
@position-try --right {
  position-area: right;
  justify-self: normal;
  align-self: unsafe anchor-center;
  left: var(--d);
}
```

We use `@position-try` to create a custom position with a given name, and inside it we define all the properties. Instead of using `flip-start` to set the left position, I define a custom `--left` position with all the necessary properties to correctly place the tooltip on the left. Same for the right position. In this situation, `min-width` is preserved for all positions, as we are no longer using `flip-start`.

It is worth noting that when using a custom position, you need to ensure that you override all the properties of the initial position defined on the element otherwise they still apply. For this reason, I am defining `justify-self: normal` to override `justify-self: unsafe anchor-center`. `normal` being the default value of `justify-self`.

CodePen Embed Fallback
https://codepen.io/t_afif/pen/MYKGWZX/38a52cdc861f42c2304930dd7edea196
Untitled

While this solution works fine, it’s a bit verbose, so I was wondering if we can do better. It turns out we can!

We can combine the flip feature and custom positions to get a shorter code:

```css
#tooltip {
  position-area: top;
  justify-self: unsafe anchor-center;
  bottom: var(--d);
  position-try: flip-block,--size flip-start,--size flip-start flip-inline;
}
@position-try --size {
  min-height: 12em; /* this is min-width! */
}
```

When we define a custom position with a flip, the browser selects the properties within the custom position, as well as the properties already defined on the element, and then performs the flip. So `--size flip-start` will flip the properties defined on the element and the one defined in the custom position `--size`. `min-height` becomes a `min-width`! Clever, right?

::: note

But you said we cannot use `min-height`?

:::

We cannot use it on the main element as it will apply to the top and bottom positions. However, within a custom position, I can select where it applies, and I want it to apply only to the left and right positions. Plus, I don’t need any `min-width` or `min-height` constraint when the position is top or bottom.

CodePen Embed Fallback
https://codepen.io/t_afif/pen/qEbYBge/3c340988dad465c415beb2f57778f6bb
Untitled

Now our tooltip position is perfect! Let’s add the tail.

---

## Adding The Tail

First, we create a shape that contains the 4 tails.

![Comparison of tooltip shapes demonstrating the transition from a red diamond shape to a blue rounded shape with the text 'Drag the anchor and I should follow...'](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/LisUyvsg.png?resize=711%2C219&ssl=1)

```css
#tooltip:before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: calc(-1*var(--d));
  clip-path: polygon(
    calc(50% - var(--s)) var(--d),50% .2em,calc(50% + var(--s)) var(--d),
    calc(100% - var(--d)) calc(50% - var(--s)), calc(100% - .2em) 50%,calc(100% - var(--d)) calc(50% + var(--s)),
    calc(50% + var(--s)) calc(100% - var(--d)),50% calc(100% - .2em),calc(50% - var(--s)) calc(100% - var(--d)),
    var(--d) calc(50% + var(--s)), .2em 50%,var(--d) calc(50% - var(--s))
  );
}
```

Then we control it using margin on the tooltip element, just as we did in the first part. When the position is top, we add a margin to all the sides except for the bottom one:

```css
margin: var(--d);
margin-bottom: 0;
```

![Comparison of tooltip designs showing a red diamond-shaped tooltip on the left and a blue rectangular tooltip on the right, both displaying the text 'Drag the anchor and I should follow...'.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/RZRmCs40.png?resize=681%2C193&ssl=1)

And for the other sides, we do nothing! The flip will do the job for us.

CodePen Embed Fallback
https://codepen.io/t_afif/pen/QwyMrvG
Follow me if you can! (drag the anchor)

Toggle the “debug mode” to see how the shape behaves in each position.

---

## Conclusion

We have completed the second part. Now, you should be comfortable working with fallbacks, the flip feature, and custom positions. If you are still struggling, give the article another read. We still have one final challenge, so make sure everything is clear before moving to the next article.

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

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Perfectly Pointed Tooltips: All Four Sides",
  "desc": "Tooltips are a natural fit for the abilities of Anchor Positioning, which can help place them on *any* side or corner. It does make dealing with the pointer extra tricky though.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/perfectly-pointed-tooltips-all-four-sides.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
