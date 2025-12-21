---
lang: en-US
title: "What Can We Actually Do With corner-shape?"
description: "Article(s) > What Can We Actually Do With corner-shape?"
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
      content: "Article(s) > What Can We Actually Do With corner-shape?"
    - property: og:description
      content: "What Can We Actually Do With corner-shape?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/what-can-we-actually-do-with-corner-shape.html
prev: /programming/css/articles/README.md
date: 2025-09-12
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1757081374239_Screenshot2025-09-05at8.08.39AM.png
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
  name="What Can We Actually Do With corner-shape?"
  desc="When I first started messing around with code, rounded corners required five background images or an image sprite likely created in Photoshop, so when"
  url="https://css-tricks.com/what-can-we-actually-do-with-corner-shape"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1757081374239_Screenshot2025-09-05at8.08.39AM.png"/>

When I first started messing around with code, rounded corners required five background images or an [**image sprite**](/css-tricks.com/spriting-img.md) likely created in Photoshop, so when [<VPIcon icon="iconfont icon-css-tricks"/>`border-radius`](https://css-tricks.com/almanac/properties/b/border-radius/) came onto the scene, I remember everybody thinking that it was the best thing ever. Web designs were very square at the time, so to have `border-radius` was super cool, and it saved us a lot of time, too.

[**Chris’ `border-radius` article from 2009**](/css-tricks.com/snippets-css/rounded-corners.md), which at the time of writing is 16 years old (wait, how old am *I*?!), includes vendor prefixes for older web browsers, including “old Konqueror browsers” (`-khtml-border-radius`). What a time to be alive!

We’re much less excited about rounded corners nowadays. In fact, sharp corners have made a comeback and are just as popular now, as are squircles (square-ish circles or circle-y squares, take your pick), which is exactly what the `corner-shape` CSS property enables us to create (in addition to many other cool UI effects that I’ll be walking you through today).

At the time of writing, only [<VPIcon icon="fa-brands fa-chrome"/>Chrome 139 and above supports `corner-shape`](https://developer.chrome.com/release-notes/139#corner_shaping_corner-shape_superellipse_squircle), which must be used with the `border-radius` property or/and any of the related individual properties (i.e., `border-top-left-radius`, `border-top-right-radius`, `border-bottom-right-radius`, and `border-bottom-left-radius`):

<CodePen
  user="mrdanielschwarz"
  slug-hash="ByoQgXj"
  title="CSS corner-shape demo (basic)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Five vertically-stacked containers in purple comparing the effects of different corner-shape values.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1757081252810_Screenshot2025-09-05at8.07.10AM.png?resize=1514%2C698&ssl=1)

---

## Snipped corners using `corner-shape: bevel`

[<VPIcon icon="fas fa-globe"/>These snipped corners](https://thekernference.com/) are becoming more and more popular as UI designers embrace [**brutalist aesthetics**](/css-tricks.com/this-page-is-a-truly-naked-brutalist-html-quine.md).

![Black button with snipped corners at the upper-left and lower-right that reads ‘Grab your ticket.’](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756911883220_Screenshot2025-09-03at9.04.22AM.png?resize=712%2C236&ssl=1)

In the example above, it’s as easy as using `corner-shape: bevel` for the snipped corners effect and then `border-bottom-right-radius: 16px` for the size.

```css
corner-shape: bevel;
border-bottom-right-radius: 16px;
```

We can do the same thing and it really works with a cyberpunk aesthetic:

<CodePen
  user="mrdanielschwarz"
  slug-hash="ByooyQe"
  title="CSS corner-shape demo (Cyberpunk 2077 corners)"
  :default-tab="['css','result']"
  :theme="dark"/>

![A rectangular container with a medium bright red border flanked by two tab buttons above it with a beveled bottom-right corner.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1757081374239_Screenshot2025-09-05at8.08.39AM.png?resize=1766%2C972&ssl=1)

---

## Slanted sections using `corner-shape: bevel`

Slanted sections is a visual effect that’s even more popular, probably not going anywhere, and again, helps elements to look a lot less like the boxes that they are.

Before we dive in though, it’s important to keep in mind that each border radii has two semi-major axes, a horizontal axis and a vertical axis, with a ‘point’ (to use vector terminology) on each axis. In the example above, both are set to `16px`, so both points move along their respective axis by that amount, *away* from their corner of course, and then the beveled line is drawn between them. In the slanted section example below, however, we need to supply a different point value for each axis, like this:

```css
corner-shape: bevel;
border-bottom-right-radius: 100% 50px;
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="EaVVxwV"
  title="CSS corner-shape demo (slanted section)"
  :default-tab="['css','result']"
  :theme="dark"/>

![A large section heading against a solid purple background with white lettering. The container’s bottom-right corner is clipped, giving the container a slanted bottom edge.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1757081541424_Screenshot2025-09-05at8.12.04AM.png?resize=1310%2C614&ssl=1)

The first point moves along `100%` of the horizontal axis whereas the second point travels `50px` of the vertical axis, and then the beveled line is drawn between them, creating the slant that you see above.

By the way, having different values for each axis and border radius is exactly how those cool [**border radius blobs**](/css-tricks.com/css-blob-recipes.md#using-border-radius) are made.

---

## Sale tags using `corner-shape: round bevel bevel round`

You’ve see those sale tags on almost every e-commerce website, either as images or with rounded corners and not the pointy part (other techniques just aren’t worth the trouble). But now we can carve out the proper shape using two different types of `corner-shape` at once, as well as a whole set of border radius values:

<CodePen
  user="mrdanielschwarz"
  slug-hash="raOONWX"
  title="CSS corner-shape demo (sale tag)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Red rectangular box with rounded corners on the left and beveled corners on the right forming an arrow shape with the label ‘Sale’ in white.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756921169741_Screenshot2025-09-03at11.39.03AM.png?resize=1048%2C526&ssl=1)

You’ll need `corner-shape: round bevel bevel round` to start off. The order flows clockwise, starting from the top-left, as follows:

- top-left
- top-right
- bottom-right
- bottom-left

Just like with `border-radius`. You *can* omit some values, causing them to be inferred from other values, but both the inference logic and resulting value syntax lack clarity, so I’d just avoid this, especially since we’re about to explore a more complex `border-radius`:

```css
corner-shape: round bevel bevel round;
border-radius: 16px 48px 48px 16px / 16px 50% 50% 16px;
```

Left of the forward slash (`/`) we have the horizontal-axis values of each corner in the order mentioned above, and on the right of the `/`, the vertical-axis values. So, to be clear, the first and fifth values correspond to the same corner, as do the second and sixth, and so on. You can unpack the shorthand if it’s easier to read:

```css
border-top-left-radius: 16px;
border-top-right-radius: 48px 50%;
border-bottom-right-radius: 48px 50%;
border-bottom-left-radius: 16px;
```

Up until now, we’ve not really needed to fully understand the border radius syntax. But now that we have `corner-shape`, it’s definitely worth doing so.

As for the actual values, `16px` corresponds to the `round` corners (this one’s easy to understand) while the `48px 50%` values are for the `bevel` ones, meaning that the corners are ‘drawn’ from `48px` horizontally to `50%` vertically, which is why and how they head into a point.

Regarding borders — yes, the pointy parts would look nicer if they were *slightly* rounded, but using `border`s and `outline`s on these elements yields unpredictable (but I suspect intended) results due to how browsers draw the corners, which *sucks*.

---

## Arrow crumbs using the same method

Yep, same thing.

<CodePen
  user="mrdanielschwarz"
  slug-hash="GgpgQNN"
  title="CSS corner-shape demo (arrow crumbs)"
  :default-tab="['css','result']"
  :theme="dark"/>

![A rounded rectangular box in three purple arrow-shaped segments pointing towards the right. Each segment is a breadcrumb, labeled Step 1, Step 2, and Step 3 in white. The first segment is a darker shade of purple.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756921412654_Screenshot2025-09-03at11.43.19AM.png?resize=1446%2C390&ssl=1)

We essentially have a grid row with negative margins, but because we can’t create ‘inset’ arrows or use borders/outlines, we have to create an effect where the fake borders of certain arrows bleed into the next. This is done by nesting the exact same shape in the arrows and then applying something to the effect of `padding-right: 3px`, where `3px` is the value of the would-be border. The code comments below should explain it in more detail (the complete code in [the Pen (<VPIcon icon="fa-brands fa-codepen"/>`mrdanielschwarz`)](https://codepen.io/mrdanielschwarz/pen/GgpgQNN) is quite interesting, though):

```html
<nav>
  <ol>
    <li>
      <a>Step 1</a>
    </li>
    <li>
      <a>Step 2</a>
    </li>
    <li>
      <a>Step 3</a>
    </li>
  </ol>
</nav>
```

```css
ol {
  /* Clip n’ round */
  overflow: clip;
  border-radius: 16px;

  li {
    /* Arrow color */
    background: hsl(270 100% 30%);

    /* Reverses the z-indexes, making the arrows stack */
    /* Result: 2, 1, 0, ... (sibling-x requires Chrome 138+) */
    z-index: calc((sibling-index() * -1) + sibling-count());

    &:not(:last-child) {
      /* Arrow width */
      padding-right: 3px;

      /* Arrow shape */
      corner-shape: bevel;
      border-radius: 0 32px 32px 0 / 0 50% 50% 0;

      /* Pull the next one into this one */
      margin-right: -32px;

    }

    a {
      /* Same shape */
      corner-shape: inherit;
      border-radius: inherit;

      /* Overlay background */
      background: hsl(270 100% 50%);
    }
  }
}
```

---

## Tooltips using `corner-shape: scoop`

<CodePen
  user="mrdanielschwarz"
  slug-hash="LEpmMWg"
  title="CSS corner-shape demo (tooltip)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Small purple button with white text and a red outline next to a red tooltip with white text floated to the right and a styled caret tip on the left side making it connected to the button.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756921702744_Screenshot2025-09-03at11.47.59AM.png?resize=1420%2C574&ssl=1)

To create this tooltip style, I’ve used a [**popover**](/css-tricks.com/clarifying-the-relationship-between-popovers-and-dialogs.md), [**anchor positioning**](/css-tricks.com/css-anchor-positioning-guide.md) (to position the caret relative to the tooltip), and `corner-shape: scoop`. The caret shape is the same as the arrow shape used in the examples above, so feel free to switch `scoop` to `bevel` if you prefer the classic triangle tooltips.

A quick walkthrough:

```html
<!-- Connect button to tooltip -->
<button popovertarget="tooltip" id="button">Click for tip</button>

<!-- Anchor tooltip to button -->
<div anchor="button" id="tooltip" popover>Don’t eat yellow snow</div>
```

```css
#tooltip {
  /* Define anchor */
  anchor-name: --tooltip;

  /* Necessary reset */
  margin: 0;

  /* Center vertically */
  align-self: anchor-center;

  /* Pin to right side + 15 */
  left: calc(anchor(right) + 15px);

  &::after {
    /* Create caret */
    content: "";
    width: 5px;
    height: 10px;
    corner-shape: scoop;
    border-top-left-radius: 100% 50%;
    border-bottom-left-radius: 100% 50%;

    /* Anchor to tooltip */
    position-anchor: --tooltip;

    /* Center vertically */
    align-self: anchor-center;

    /* Pin to left side */
    right: anchor(left);

    /* Popovers have this already (required otherwise) */
    position: fixed;
  }
}
```

If you’d rather these were hover-triggered, the upcoming [**Interest Invoker API**](/css-tricks.com/a-first-look-at-the-interest-invoker-api-for-hover-triggered-popovers.md) is what you’re looking for.

---

## Realistic highlighting using `corner-shape: squircle bevel`

The `<mark>` element, used for semantic highlighting, defaults with a yellow background, but it doesn’t exactly create a highlighter effect. By adding the following two lines of CSS, which admittedly I discovered by experimenting with completely random values, we can make it look more like a hand-waved highlight:

```css
mark {
  /* A...squevel? */
  corner-shape: squircle bevel;
  border-radius: 50% / 1.1rem 0.5rem 0.9rem 0.7rem;

  /* Prevents background-break when wrapping */
  box-decoration-break: clone;
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="raOVOXj"
  title="CSS corner-shape demo (highlighted text)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Text reading ‘Highlighted text’ in black against a yellow background containing no sharp edges.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756921874103_Screenshot2025-09-03at11.50.58AM.png?resize=1222%2C474&ssl=1)

We can also use `squircle` by itself to create those fancy-rounded app icons, or use them on buttons/cards/form controls/etc. if you think the ‘old’ border radius is starting to look a bit stale:

<CodePen
  user="mrdanielschwarz"
  slug-hash="gbaYELq"
  title="CSS corner-shape demo (iOS app icon)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Squircle shaped box filled with a linear gradient that goes from orange to blue with white text on top that says ‘CSS’.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756921975678_Screenshot2025-09-03at11.52.40AM.png?resize=1404%2C586&ssl=1)

<CodePen
  user="mrdanielschwarz"
  slug-hash="zxvRaGY"
  title="CSS corner-shape demo (squircle button)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Squircle-shaped purple button with a white label that says ‘Button.’](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756922082526_Screenshot2025-09-03at11.54.28AM.png?resize=1110%2C428&ssl=1)

---

## Hand-drawn boxes using the same method

Same thing, only larger. Kind of looks like a hand-drawn box?

<CodePen
  user="mrdanielschwarz"
  slug-hash="azvzXjo"
  title="CSS corner-shape demo (hand-drawn box)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Solid white rectangular box with thick, black borders that look hand-drawn.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756922141714_Screenshot2025-09-03at11.55.29AM.png?resize=1794%2C768&ssl=1)

Admittedly, this effect doesn’t look as awesome on a larger scale, so if you’re really looking to wow and create something more akin to the [<VPIcon icon="fas fa-globe"/>Red Dead Redemption aesthetic](https://rockstargames.com/reddeadredemption2), [**this `border-image` approach**](/css-tricks.com/revisiting-css-border-image.md) would be better.

---

## Clip a background with `corner-shape: notch`

Notched border radii are ugly and I won’t hear otherwise. I don’t think you’ll want to use them to create a visual effect, but I’ve learned that they’re useful for background clipping if you set the irrelevant axis to `50%` and the axis of the side that you want to clip by the amount that you want to clip it by. So if you wanted to clip `30px` off the background from the left for example, you’d choose `30px` for the horizontal axes and `50%` for the vertical axes (for the `-left-radius` properties only, of course).

```css
corner-shape: notch;
border-top-left-radius: 30px 50%;
border-bottom-left-radius: 30px 50%;
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="jEbbONp"
  title="CSS corner-shape demo (clipped background)"
  :default-tab="['css','result']"
  :theme="dark"/>

![The words ‘Clipped background’ in bold black letters with a thinly-bordered rectangle that nearly covers the text.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756922213211_Screenshot2025-09-03at11.56.33AM.png?resize=1746%2C474&ssl=1)

---

## Conclusion

So, `corner-shape` is actually a helluva lot of fun. It certainly has more uses than I expected, and no doubt with some experimentation you’ll come up with some more. With that in mind, I’ll leave it to you CSS-Tricksters to mess around with (remember though, you’ll need to be using Chrome 139 or higher).

As a parting gift, I leave you with this very cool but completely useless CSS Tie Fighter, made with `corner-shape` and anchor positioning:

<CodePen
  user="mrdanielschwarz"
  slug-hash="wBKKweg"
  title="CSS corner-shape demo (hexagons and triangles)"
  :default-tab="['css','result']"
  :theme="dark"/>

![Hexagon shape with six black segments forming the shape, separated by gaps of gray space. The negative space in the middle forms another hexagon.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_B9520AAEB8E72143A2990CEB07209D80D9AD692AC1F43B71E4BC9C84D7184887_1756922381535_Screenshot2025-09-03at11.59.17AM.png?resize=1474%2C796&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Can We Actually Do With corner-shape?",
  "desc": "When I first started messing around with code, rounded corners required five background images or an image sprite likely created in Photoshop, so when",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/what-can-we-actually-do-with-corner-shape.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
