---
lang: en-US
title: "Responsive List of Avatars Using Modern CSS (Part 1)"
description: "Article(s) > Responsive List of Avatars Using Modern CSS (Part 1)"
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
      content: "Article(s) > Responsive List of Avatars Using Modern CSS (Part 1)"
    - property: og:description
      content: "Responsive List of Avatars Using Modern CSS (Part 1)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1.html
prev: /programming/css/articles/README.md
date: 2025-12-15
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-9.32.20-AM.png
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
  name="Responsive List of Avatars Using Modern CSS (Part 1)"
  desc="A list of rounded images that slightly overlap each other is a classic web design pattern. The main idea is not complex, but the new thing is the responsive part. that dynamically adjusts the overlap between the images so they fit inside the container."
  url="https://css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/Screenshot-2025-11-24-at-9.32.20-AM.png"/>

A list of rounded images that slightly overlap each other is a classic web design pattern.

![Two rows of circular avatar images. The images overlap with one another. The first row has eight images; the second row has six images.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/x9Wvyg6Oz6-1009.png?resize=1009%2C324)

You are for sure wondering what the novelty we are bringing here is, right? It has been done countless times.

You are right. The main idea is not complex, but the new thing is the responsive part. We will see how to dynamically adjust the overlap between the images so they can fit inside their container. And we will make some cool animations for it along the way!

Here is a demo of what we are creating. You can resize the window and hover the images to see how they behave. And yes, the gap between the images is transparent!

::: note

The following demo is currently limited to Chrome and Edge, but will work in other browsers as the [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-count()`](https://css-tricks.com/almanac/functions/s/sibling-count/) functions gain broader support. You can track Firefox support in [<VPIcon icon="fa-brands fa-firefox"/>Ticket #1953973](https://bugzilla.mozilla.org/show_bug.cgi?id=1953973) and WebKit’s position in [Issue #471 (<VPIcon icon="iconfont icon-github"/>`WebKit/standards-positions`)](https://github.com/WebKit/standards-positions/issues/471).

:::

<CodePen
  user="anon"
  slug-hash="VYavBwN"
  title="Responsive Stacked/Overlapping images with hover"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="http://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-10.mov" />

We’ll get even deeper into things in a second article. For now, let’s re-create this demo!

::: info Responsive List of Avatars Using Modern CSS

```component VPCard
{
  "title": "Responsive List of Avatars Using Modern CSS (Part 1)",
  "desc": "A list of rounded images that slightly overlap each other is a classic web design pattern. The main idea is not complex, but the new thing is the responsive part. that dynamically adjusts the overlap between the images so they fit inside the container.",
  "link": "/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Responsive List of Avatars Using Modern CSS (Part 2)",
  "desc": "In this article, we follow up the work we did to create responsive rows of circular images in a previous article by arranging the images around a circle with a clean hover effect.",
  "link": "/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-2.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## The initial setup

We start with the HTML, which is a set of image elements in a parent container:

```html
<div class="container">
  <img src="" alt="">
  <img src="" alt="">
  <img src="" alt="">
  <img src="" alt="">
  <!-- etc. -->
</div>
```

Declaring flexbox on the container is all we need to line the images up in a single row:

```css
.container {
  display: flex;
}
```

We can make the images circles with `border-radius` and squish them close together with a little negative `margin`:

```css
.container img {
  border-radius: 50%;
  margin-right: -20px;
}
.container img:last-child {
  margin: 0;
}
```

Nothing fancy so far. I am using an arbitrary value for the margin to create an overlap:

<CodePen
  user="anon"
  slug-hash="vEGZKby"
  title="Initial configuration"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## The cut-out effect

We’ll need the [<VPIcon icon="iconfont icon-css-tricks"/>`mask`](https://css-tricks.com/almanac/properties/m/mask/) property to cut the images and create the transparent gap between them. Making the gap transparent is very important here as it makes the component look better — but it’s also more challenging to code since the cut-out needs to consider the next (or previous) element in a way that prevents one image from obscuring the other.

```css
mask: radial-gradient(50% 50% at calc(150% - 20px), #0000 100%, #000);
```

This `mask` creates a circular shape with the same dimensions as one of the images — a radius equal to `50%` in both directions — and its center point will be the midpoint of the next element (`calc(150% - 20px)`). Without the overlap, the center of the next element is at `50% (center of the actual element) + 100%`. But due to the overlap, the next image is closer, so we reduce the distance by `20px`, which is the value used by the margin. This cut the image from the right side.

If we want the cut-out on the left side, we move the circle in the other direction: `50% - 100% + 20px`.

Drag the slider in the next demo for a visualization of how this works in both directions. I am removing the `border-radius` from the center image to illustrate the circular shape.

<CodePen
  user="anon"
  slug-hash="myPwrxx"
  title="The mask effect"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We apply this to all the images, and we are good to go. Notice that I am using a couple of CSS variables to control the image size and gap between the images.

```css
.container {
  --s: 120px; /* image size*/
  --g: 10px;  /* the gap */

  display: flex;
}
.container img {
  width: var(--s);
  border-radius: 50%;
  margin-right: -20px;
  /* Cut-out on the right side */
  mask: radial-gradient(50% 50% at calc(150% - 20px),
        #0000 calc(100% + var(--g)),#000);
}
/* Cut-out on the left side */
.container.reverse img {
  mask: radial-gradient(50% 50% at calc(-50% + 20px),
        #0000 calc(100% + var(--g)),#000);
}
.container img:last-child {
  margin: 0;
}
.container.reverse img:first-child,
.container:not(.reverse) img:last-child {
  mask: none;
}
```

Pay additional attention to the `.reverse` class. It switches the direction of the cut-out from right (the default) to left instead.

<CodePen
  user="anon"
  slug-hash="myPwrjL"
  title="Both cutout effect"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

What we have is already good. It works fine and you can use it, but it could be more interactive. The overlap look nice but wouldn’t be better if we could enlarge it on smaller screens to help conserve space, or perhaps even remove it altogether on larger screens where there’s plenty of room to show the full images?

Let’s make this more interactive and responsive.

---

## The responsive part

Let’s imagine the total size of the images exceeds the size of the `.container`. That results in an overflow, so we need to assign a negative margin to each image to absorb that space and ensure all the images fit in the container.

It looks like we need some JavaScript to calculate the excess of space and then divide it by the number of images to get the margin value. And probably put this logic inside a resize listener in case the container change its size.

I am kidding, of course! We can solve this using modern CSS that is small and maintainable.

If we were to express what we need mathematically, the formula of the margin should be equal to:

```css
margin-right: (size_of_container - N x size_of_image)/(N - 1);
```

…where `N` is the number of images, and we are dividing by `N - 1` because the last image doesn’t need a margin. We already have a variable for the image size (`--s`) and we know that the width of the container is `100%`:

```css
margin-right: (100% - N x var(--s))/(N - 1);
```

What need to solve for is `N`, the number of images. We could use a rigid magic number here, say 10, but what if we want fewer or more images in the container? We’d have to update the CSS each time. We want a solution that adapts to whatever number of images we throw at it.

That’s where the new `sibling-count()` function comes in real handy. It’s going to be the best approach moving forward since it automatically calculates the number of child elements within the container. So, if there are 10 images in the `.container`, the `sibling-count()` is 10.

```css
margin-right: calc((100% - sibling-count() * var(--s))/(sibling-count() - 1));
```

Resize the container in the demo below and see how the images behave. Again, `sibling-count()` support is limited at the moment, but you can check it out in the latest Chrome or Safari Technology Preview.

<CodePen
  user="anon"
  slug-hash="RNagoOX"
  title="The responsive part"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-margin.mov" />

It’s quite good! The images automatically adjust to fit in the container, but we can still improve this slightly. When the container size is large enough, the calculated value of margin will be positive and we get big spaces between the images. You probably want to keep that behavior, but in my case, I want the image to remain as close as possible.

To do this, we can set a maximum boundary to the `margin` value and make sure it doesn’t get any bigger than `0`:

```css
margin-right: min((100% - sibling-count() * var(--s))/(sibling-count() - 1), 0px);
```

We can also re-use the the gap variable (`--g`) to maintain a space between items:

```css
margin-right: min((100% - sibling-count() * var(--s))/(sibling-count() - 1), var(--g));
```

If you’re wondering why I am using the [<VPIcon icon="iconfont icon-css-tricks"/>`min()`](https://css-tricks.com/almanac/functions/m/min/) function to define a max boundary, [**read this**](/css-tip.com/min-max.md) for a detailed explanation. In short: you’re effectively setting a maximum with `min()` and a minimum with [<VPIcon icon="iconfont icon-css-tricks"/>`max()`](https://css-tricks.com/almanac/functions/m/max/).

The responsive part is perfect now!!

<CodePen
  user="anon"
  slug-hash="YPqQpoo"
  title="Fixing the responsive"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-margin-gap.mov" />

What we’re missing is the cut-out effect we made with `mask`. For that, we can re-use the same `margin` value inside the `mask`.

<CodePen
  user="anon"
  slug-hash="preview/PwNjWYP/87072327c8b87d1170074504cb933cac"
  title="N/A"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

![Two images on separate rows on opposite ends of each row. The top row image is aligned right and the bottom row image is aligned left.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/s_41EFA1AE88F415639215FA483E2B77FE19BC46EAF1A51F2EDCE0708967CEA6E0_1763744205734_stacked-image-list-missing-images.png?resize=1382%2C546&ssl=1)

Oops, the images disappeared! We have the same code as the previous section, but instead of the arbitrary `20px` value, we used the last formula.

```css
.container img {
  --_m: min((100% - sibling-count() * var(--s))/(sibling-count() - 1), var(--g));

  margin-right: var(--_m);
  mask: radial-gradient(50% 50% at calc(150% + var(--_m)),
        #0000 calc(100% + var(--g)),#000);
}
```

Can you guess what the issue is? Think a moment about it because it’s something you may face in other situations.

**It’s related to percentages.** With `margin`, the percentage refers to the container size, but inside mask, it considers another reference, which means the values aren’t equal. We need to retrieve the container size differently, using container query units instead.

First, we register the `.container` as a CSS “container”:

```css
.container {
  container-type: inline-size;
}
```

Then, we can say that the container’s width is `100cqi` (or `100cqw`) instead of `100%`, which fixes the layout issue:

<CodePen
  user="anon"
  slug-hash="EaKXZbM"
  title="Fixing the mask"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

*Tada!* The position and the mask adjust perfectly when the container is resized.

---

## The animation part

The idea of the animation is to fully reveal an image on hover if there is an overlap between items, like this:

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-margin-animation.mov" />

How do we remove the overlap? All we do is update the variable (`--_m`) we defined earlier to zero when an image is hovered:

```css
.container img:hover {
  --_m: 0px;
}
```

That takes out the `margin` and removes the cut-out effect as well. We actually might want a *little* bit of margin between images, so let’s make `--_m` equal to the gap (`--g`) instead:

```css
.container img:hover {
  --_m: var(--g);
}
```

<CodePen
  user="anon"
  slug-hash="ByKZpvw"
  title="animlation first try"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Not bad! But we can do better. Notice how pushing one image away from another causes an image at the end to overflow the container. The bottom list (the row with the cut-out on the left) is not as good as the top list because the mask is a bit off on hover.

Let’s first fix the mask before tackling the overflow.

The issue is that I am using `margin-right` for the spacing while the cut-out effect is on the left. It works fine when we don’t need any animation but as you can see, it’s not quite good in the last demo. We need switch to a `margin-left` instead on the bottom row. In other words, we use `margin-right` when the cut-out is on the right, and `margin-left` when the cut-out is on the left.

```css{5,10,15}
.container:not(.reverse) img {
  mask: radial-gradient(50% 50% at calc(150% + var(--_m)),
        #0000 calc(100% + var(--g)), #000);
  margin-right: var(--_m);
}
.container.reverse img {
  mask: radial-gradient(50% 50% at calc(-50% - var(--_m)),
        #0000 calc(100% + var(--g)), #000);
  margin-left: var(--_m);
}
.container:not(.reverse) img:last-child,
.container.reverse img:first-child {
  mask: none;
  margin: 0;
}
```

Great, now the cut-out effect is much better and respects both the left and right sides:

<CodePen
  user="anon"
  slug-hash="zxqzNbV"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-margin-animation-step-1.mov" />

Let’s fix the overflow now. Remember the previous formula where we split the excess of space across `N - 1` elements?

```plaintext
(size_of_container - N x size_of_image)/(N - 1)
```

Now we need to exclude one more element in the equation, which means we replace the `N` with `N - 1` and replace the `N - 1` with `N - 2`:

```plaintext
(size_of_container - (N - 1) x size_of_image)/(N - 2)
```

However, that extra excluded element still takes up space inside the container. We need to account for its size and subtract it from the container size:

```plaintext
((size_of_container - (size_of_image + gap)) - (N - 1) x size_of_image)/(N - 2)
```

I am considering the size plus a gap because a `margin` that is equal to the gap is set on a hovered image, which is additional spacing we need to remove.

We simplify a bit:

```plaintext
(size_of_container - gap -  N x size_of_image)/(N - 2)
```

We know how to translate this into CSS, but where should we apply it?

It should be applied on all the images when one image is hovered (except the hovered image). This is a great opportunity to write a fancy selector using `:has()` and `:not()`!

```css
/* Select images that are not hovered when the container contains a hovered image */
.container:has(:hover) img:not(:hover) {
  /**/
}
```

And we plug the formula into that:

```css
.container:has(:hover) img:not(:hover) {
  --_m: min((100cqw - var(--g) - sibling-count()*var(--s))/(sibling-count() - 2), var(--g));
}
```

<CodePen
  user="anon"
  slug-hash="ZYWyezZ"
  title="Fixing the animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Check that out — no more overflow on hover in both directions! All we are missing now is the actual animation that smoothly transitions the spacing rather than snapping things into place. All we need is to add a little `transition` on the `--_m` variable:

```css
transition: --_m .3s linear;
```

If we do that, however, the `transition` doesn’t happen. It’s because CSS doesn’t recognize the calculated value as a proper [**CSS length unit**](/css-tricks.com/css-length-units.md). For that, we need to formally register `--_m` as a custom property using the [<VPIcon icon="iconfont icon-css-tricks"/>`@property`](https://css-tricks.com/almanac/rules/p/property/) at-rule:

```css
@property --_m {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px
}
```

There we go:

<CodePen
  user="anon"
  slug-hash="xbVrqxG"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-01.mov" />

Cool, right? Having a smooth change for the mask and the position is quite satisfying. We still need to fix a small edge case. The last element in the top list and the first one in the bottom list don’t have any margin, and they are always fully visible, so we need to exclude them from the effect.

When hovering them, nothing should happen, so we can adjust the previous selector like below:

```css
.container:not(.reverse):has(:not(:last-child):hover) img:not(:hover),
.container.reverse:has(:not(:first-child):hover) img:not(:hover) {
  --_m: min((100cqw - var(--g) - sibling-count()*var(--s))/(sibling-count() - 2),var(--g));
}
```

Instead of simply checking if the container has a hovered element, we restrict the selection to the elements that are not `:last-child` for the first list and not `:first-child` for the second list. Another cool selector using modern CSS!

Here is the final demo with all the adjustments made:

<CodePen
  user="anon"
  slug-hash="VYavBwN"
  title="Responsive Stacked/Overlapping images with hover"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/11/stacked-images-responsive-10.mov" />

---

## Conclusion

I hope you enjoyed this little exploration of some modern CSS features. We re-created a classic component, but the real goal was to learn a few CSS tricks and rely on new features that you will definitely need in other situations.

In the next article, we’ll add more complexity and cover even more modern CSS for an even *more* satisfying pattern! Stay tuned.

::: info Responsive List of Avatars Using Modern CSS

```component VPCard
{
  "title": "Responsive List of Avatars Using Modern CSS (Part 1)",
  "desc": "A list of rounded images that slightly overlap each other is a classic web design pattern. The main idea is not complex, but the new thing is the responsive part. that dynamically adjusts the overlap between the images so they fit inside the container.",
  "link": "/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Responsive List of Avatars Using Modern CSS (Part 2)",
  "desc": "In this article, we follow up the work we did to create responsive rows of circular images in a previous article by arranging the images around a circle with a clean hover effect.",
  "link": "/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-2.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive List of Avatars Using Modern CSS (Part 1)",
  "desc": "A list of rounded images that slightly overlap each other is a classic web design pattern. The main idea is not complex, but the new thing is the responsive part. that dynamically adjusts the overlap between the images so they fit inside the container.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
