---
lang: en-US
title: "Gradients, Blend Modes, And A Really Cool Hover Effect"
description: "Article(s) > Gradients, Blend Modes, And A Really Cool Hover Effect"
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
      content: "Article(s) > Gradients, Blend Modes, And A Really Cool Hover Effect"
    - property: og:description
      content: "Gradients, Blend Modes, And A Really Cool Hover Effect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/gradients-blend-modes-hover-effect.html
prev: /programming/css/articles/README.md
date: 2023-09-11
isOriginal: false
author:
  - name: Preethi Sam
    url : https://smashingmagazine.com/author/preethi-sam/
cover: https://files.smashing.media/articles/gradients-blend-modes-hover-effect/gradients-blend-modes-hover-effect.jpg
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
  name="Gradients, Blend Modes, And A Really Cool Hover Effect"
  desc="Gradients are a powerful CSS feature. We use them for texture, depth, and even to hide parts of elements with CSS masking. This article covers another interesting way to use gradients — as a hover effect that affects the appearance of other elements around the hovered element."
  url="https://smashingmagazine.com/2023/09/gradients-blend-modes-hover-effect/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/gradients-blend-modes-hover-effect/gradients-blend-modes-hover-effect.jpg"/>

Gradients are a powerful CSS feature. We use them for texture, depth, and even to hide parts of elements with CSS masking. This article covers another interesting way to use gradients — as a hover effect that affects the appearance of other elements around the hovered element. In other words, we will look at a hover effect where hovering one item triggers visual changes to other items using CSS gradients.

Do you know how `box-shadow` is sometimes used as a hover effect? It adds depth to something, like a button, and can create the impression that it is being pressed into the page.

smashingmag
eYbmovv
Untitled [forked] 
) by [Geoff Graham](https://codepen.io/geoffgraham).

Gradients are also capable of adding depth. They are often used to make something appear as if it’s popping off the page.

smashingmag
yLGyrvg
Untitled [forked] 
) by [Geoff Graham](https://codepen.io/geoffgraham).

I wanted to see if a gradient could make for an interesting hover effect. Not exactly like a button with a box shadow, but maybe it can be done in a way that changes an element’s state in addition to other elements around it.

Here’s what I’m thinking:

<CodePen
  user="smashingmag"
  slug-hash="JjwoVpZ"
  title="Gradient Hover [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

See that? The hover state is on one of the items, but all items are affected by the change. The hovered element has the darkest, boldest background, while a gradient covers the rest of the items and de-emphasizes them with lighter shades of the same color.

Now, I’ll immediately point out that hover states [<VPIcon icon="iconfont icon-w3c"/>should rely on more than changing colors to indicate a change](https://w3.org/TR/WCAG21/#use-of-color). That demo is purely meant to showcase the effect, but I would consider additional visual cues if I were using this in production.

But let’s break this apart to see how it works. I think it’s interesting because we will get into `:nth-of-type()` recipes and sibling selectors to pull this off.

Here’s the HTML:

```html
<section>
  <div></div>
  <div></div>
  <div</div>
  <div></div>
  <div></div>
  <div><!-- backdrop --></div>
</section>
```

We have six divs in a `<section>` container. The first five divs are the interactive elements, and the last one will hold the gradient that covers them. I’m going to start by setting up the container:

```css
section {
  position: relative;
  width: min(90vw, 400px);
}
```

I know I will have to use absolute positioning on the gradient later, so I’m preemptively setting the container to relative positioning. Hence, the gradient stays scoped to the section’s boundaries. Otherwise, the gradient would be entirely out of the document flow and wind up in some unexpected place. The width? Purely subjective.

Those first five divs share the same general appearance. We can select and style all of them at once without selecting the last div using the `:not()` pseudo-selector:

```css
div:not(:last-of-type) {
  height: 40px;   
  background-color: rgb(0 128 0);
  border-block: 5px #fff solid;
}
```

There are a couple of things to note here. One is that we can make this a little more maintainable by **storing some of the values as CSS variables**:

```css
section {
  --c1: hsl(0 0% 0%); /* Black base color */
  --bg-color: rgb(0 128 0); /* Green */
  --height: 40px;
  --border: 5px white solid;
}

/* Style all divs but the last one */
div:not(:last-of-type) {
  height: var(--height);   
  background-color: var(--bg-color);
  border-block: var(--border);
  mix-blend-mode: screen;
}
```

The other is that I’ve added **white top and bottom borders** to the divs. That’s how I’m faking space between them, which is essential for how the background color blends with the gradient later (which is what [**`mix-blend-mode`**](https://css-tricks.com/almanac-properties/mix-blend-mode.md) handles). I really only need those white borders on the middle three divs since the first and fifth divs are sort of like borders that start and end the container.

```css
div:nth-of-type(1) {
  border-block-start: 0;
}
div:nth-of-type(5) {
  border-block-end: 0;
}
```

Now we can turn to the last div with the gradient:

```css
div:last-of-type {
  background: lightgrey;
  inset-block-start: 0;
  height: 100%;
  position: absolute;
  width: inherit;
  z-index: -1;
}
```

Wait, what? There’s the absolute positioning I mentioned earlier, but you’re probably wondering why there’s no gradient. We’ll get there. Initially, we want a solid background color because the gradient only comes into play when a hover occurs. And when it does, it will be a linear gradient that goes from black to near-white that will blend with the background color of the first five divs.

Here’s what we have so far:

<CodePen
  user="smashingmag"
  slug-hash="JjwoqBP"
  title="–i-m-Gradient Hover [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

The arrangement of the colors and the gradient height will be based on the height and spacing between the divs and the location of the hovered div. Since there will be some repeating values, we’ll use more CSS variables to store them.

```css
section {
  --c1: hsl(0 0% 0%); /* Black base color */
  --c2: hsl(0deg 0% 20%); /* This and the rest are grays */
  --c3: hsl(0deg 0% 40%);
  --c4: hsl(0deg 0% 60%);
  --c5: hsl(0deg 0% 80%);
  --bars: 5;
  --color-stop: calc(100% / var(--bars));
  --bg-color: rgb(0, 128, 0); /* Green */
  --height: 40px;
  --border: 5px white solid;

  /* etc. */
}
```

Those are the colors we want to apply to the gradient. You don’t *have* to have all of these same colors. You could, for example, use the same black variable we set up earlier for all the colors, [**then apply a different alpha transparency to each instance**](/css-tricks.com/color-alpha-anywhere.md). But notice how I’ve also created two other variables:

- `--bars`: This is the number of divs in the container minus the last one.
- `--color-stop`: This divides the full height of the gradient by the number of `--bars`. I plan on multiplying this calculation by the order of each color stop (e.g., `2` for the second color stop). This way, there’s no need for hardcoded magic numbers because the calculation is based on the number of divs in the container.

Here’s where the rubber meets the road. We need to define the gradient, then apply it when a particular div is hovered. Here’s how it looks when the first div is in a hovered state:

```css
div:nth-of-type(1):hover ~ div:last-of-type {
  background: linear-gradient(
    var(--c1) var(--color-stop), 
    var(--c2) var(--color-stop), 
    var(--c2) calc(var(--color-stop) * 2), 
    var(--c3) calc(var(--color-stop) * 2), 
    var(--c3) calc(var(--color-stop) * 3), 
    var(--c4) calc(var(--color-stop) * 3), 
    var(--c4) calc(var(--color-stop) * 4), 
    var(--c4) calc(var(--color-stop) * 4));
}
```

That selector might look slightly confusing initially, but it’s essentially saying: *“Hey, when the first div is hovered, apply these styles to the last div.”*

Go ahead and hover the first div to see how this plays out:

smashingmag
qBLEGJB
Gradient Hover: First Div [forked] 
) by [Geoff Graham](https://codepen.io/geoffgraham).

All that’s left is to **wash, rinse, and repeat**. We need to do the same thing for the next four divs in the container. The tricky part is that we need to adjust the color stops so that the darkest shades of the gradient overlay the hovered div. Let’s look at the second div for an example:

```css
div:nth-of-type(2):hover ~ div:last-of-type {
  background: linear-gradient(
    var(--c2) var(--color-stop), 
    var(--c1) var(--color-stop), 
    var(--c1) calc(var(--color-stop) * 2), 
    var(--c2) calc(var(--color-stop) * 2), 
    var(--c2) calc(var(--color-stop) * 3), 
    var(--c3) calc(var(--color-stop) * 3), 
    var(--c3) calc(var(--color-stop) * 4), 
    var(--c4) calc(var(--color-stop) * 4));
}
```

All we’re really doing is **changing the order of color variables**! The `--c1` color variable merely shifts down a level, allowing the lighter shades of the gradient to surround it.

![Showing two different color stop positions side-by-side. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://files.smashing.media/articles/gradients-blend-modes-hover-effect/gradient-hover-illustration.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/gradients-blend-modes-hover-effect/gradient-hover-illustration.png)

Let’s pull it all together:

<CodePen
  user="smashingmag"
  slug-hash="JjwoVpZ"
  title="Gradient Hover [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Have fun with this! Try different colors and different gradations. Here’s another example where the gradient is applied to text elements:

<CodePen
  user="smashingmag"
  slug-hash="abPzrQe"
  title="Gradient Hover 2 [forked]"
  :default-tab="['css','result']"
  :theme="dark"/>

Aesthetics aside, remember to use designs, layouts, and colors that make it clear to users that they are interacting with the element and what that interaction does.

::: info Further Reading On SmashingMag

- “[**Inspired Design Decisions With Neville Brody: Design Cannot Remain Neutral**](/smashingmagazine.com/inspired-design-decisions-neville-brody.md),” Andrew Clarke
- “[**A Deep CSS Dive Into Radial And Conic Gradients**](/smashingmagazine.com/css-radial-conic-gradient.md),” Ahmad Shadeed
- “[**Create Responsive Image Effects With CSS Gradients And `aspect-ratio`**](/smashingmagazine.com/2021/02/responsive-image-effects-css-gradients-aspect-ratio.md),” Stephanie Eckles
- “[**A Guide To Hover And Pointer Media Queries**](/smashingmagazine.com/guide-hover-pointer-media-queries.md),” Cristian Díaz

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Gradients, Blend Modes, And A Really Cool Hover Effect",
  "desc": "Gradients are a powerful CSS feature. We use them for texture, depth, and even to hide parts of elements with CSS masking. This article covers another interesting way to use gradients — as a hover effect that affects the appearance of other elements around the hovered element.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/gradients-blend-modes-hover-effect.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
