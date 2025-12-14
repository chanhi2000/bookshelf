---
lang: en-US
title: "Responsive List of Avatars Using Modern CSS (Part 2)"
description: "Article(s) > Responsive List of Avatars Using Modern CSS (Part 2)"
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
      content: "Article(s) > Responsive List of Avatars Using Modern CSS (Part 2)"
    - property: og:description
      content: "Responsive List of Avatars Using Modern CSS (Part 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-2.html
prev: /programming/css/articles/README.md
date: 2025-12-17
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/luZQsrO2qg-1070.png
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
  name="Responsive List of Avatars Using Modern CSS (Part 2)"
  desc="In this article, we follow up the work we did to create responsive rows of circular images in a previous article by arranging the images around a circle with a clean hover effect."
  url="https://css-tricks.com/responsive-list-of-avatars-using-modern-css-part-2"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/luZQsrO2qg-1070.png"/>

Ready for the second part? If you recall, [**last time**](/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1.md) we worked on a responsive list of overlapping avatar images featuring a cut-out between them.

![Two rows of circular avatar images. The images overlap with one another. The first row has eight images; the second row has six images.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/x9Wvyg6Oz6-1009.png?resize=1009%2C324)

We are still creating a responsive list of avatars, but this time it will be a circular list.

![Showing two examples of circular avatar images arranged in a circle. The first example has eight images. The second example has six images.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/luZQsrO2qg-1070.png?resize=1070%2C476&ssl=1)

This design is less common than the horizontal list, but it’s still a good exercise to explore new CSS tricks.

Let’s start with a demo. You can resize it and see how the images behave, and also hover them to get a cool reveal effect.

::: note

The following demo is currently limited to Chrome and Edge, but will work in other browsers as the [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-count()`](https://css-tricks.com/almanac/functions/s/sibling-count/) functions gain broader support. You can track Firefox support in [<VPIcon icon="fa-brands fa-firefox"/>Ticket #1953973](https://bugzilla.mozilla.org/show_bug.cgi?id=1953973) and WebKit’s position in [Issue #471 (<VPIcon icon="iconfont icon-github"/>`WebKit/standards-positions`)](https://github.com/WebKit/standards-positions/issues/471).

:::

<CodePen
  user="anon"
  slug-hash="MYyobpb"
  title="Responsive Circular List of images with hover effect"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We will rely on the same HTML structure and CSS base as the example we covered in [**Part 1**](/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-1.md): a list of images inside a container with `mask`-ed cutouts. This time, however, the positions will be different.

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

## Placing Images Around a Circle

There are several techniques [**for placing images around a circle**](/css-tip.com/images-circle.md). I will start with my favorite one, which is less known but uses a simple code that relies on the CSS `offset` property.

```css
.container {
  display: grid;
}
.container img {
  grid-area: 1/1;
  offset: circle(180px) calc(100%*sibling-index()/sibling-count()) 0deg;
}
```

<CodePen
  user="anon"
  slug-hash="myeeMMQ"
  title="Images around a circle"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The code doesn’t look super intuitive, but its logic is fairly straightforward. The `offset` property is a shorthand, so let’s write it the longhand way to see how breaks down:

```css
offset-path: circle(180px);
offset-distance: calc(100%*sibling-index()/sibling-count());
offset-rotate: 0deg;
```

We define a path to be a circle with a radius of `180px`. All the images will “follow” that path, but will initially be on top of each other. We need to adjust their distance to change their position along the path (i.e., the circle). That’s where [<VPIcon icon="iconfont icon-css-tricks"/>`offset-distance`](https://css-tricks.com/almanac/properties/o/offset-distance/) comes into play, which we combine with the [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-count()`](https://css-tricks.com/almanac/functions/s/sibling-count/) functions to create code that works with any number of elements instead of working with exact numbers.

For six elements, the values will be as follows:

```plaintext
100% x 1/6 = 16.67%
100% x 2/6 = 33.33%
100% x 3/6 = 50%
100% x 4/6 = 66,67%
100% x 5/6 = 83.33%
100% x 6/6 = 100%
```

This will place the elements evenly around the circle. To this, we add a rotation equal to `0deg` using [<VPIcon icon="iconfont icon-css-tricks"/>`offset-rotate`](https://css-tricks.com/almanac/properties/o/offset-rotate/) to keep the elements straight so they don’t rotate as they follow the circular path. From there, all we have to do is update the circle’s radius with the value we want.

That’s my preferred approach, but there is a second one that uses the [<VPIcon icon="iconfont icon-css-tricks"/>`transform`](https://css-tricks.com/almanac/properties/t/transform/) property to combine two rotations with a translation:

```css
.container {
  display: grid;
}
.container img {
  grid-area: 1/1;
  --_i: calc(1turn*sibling-index()/sibling-count());
  transform: rotate(calc(-1*var(--_i))) translate(180px) rotate(var(--_i));
}
```

The translation contains the circle radius value and the rotations use generic code that relies on the `sibling-*` functions the same way we did with `offset-distance`.

<CodePen
  user="anon"
  slug-hash="bNpoYYp"
  title="Placing images around a circle"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Even though I prefer the first approach, I will rely on the second one because it allows me to reuse the rotation angle in more places.

---

## The Responsive Part

Similar to the horizontal responsive list from the last article, I will rely on container query units to define the radius of the circle and make the component responsive.

![Diagram of eight circular avatar images arranged around a circle. A red dashed line indicates the size and radius of the larger circle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_8EB8676D2975C0D299467954CBB131676699FF18C298A3FD9090F0DFBEACB674_1763724280412_image.png?resize=923%2C522&ssl=1)

```css
.container {
  --s: 120px; /* image size */

  aspect-ratio: 1;
  container-type: inline-size;
}
.container img {
  width: var(--s);
  --_r: calc(50cqw - var(--s)/2);
  --_i: calc(1turn*sibling-index()/sibling-count());
  transform: rotate(calc(-1*var(--_i))) translate(var(--_r)) rotate(var(--_i));
}
```

Resize the container in the demo below and see how the images behave:

<CodePen
  user="anon"
  slug-hash="raeGpMQ"
  title="The responsive part"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It’s responsive, but when the container gets bigger, the images are too spread out, and I don’t like that. It would be good to keep them as close as possible. In other words, we consider the smallest circle that contains all the images without overlap.

Remember what we did in the first part: we added a maximum boundary to the margin for a similar reason. We will do the same thing here:

```css
--_r: min(50cqw - var(--s)/2, R);
```

I know you don’t want a boring geometry lesson, so I will skip it and give you the value of `R`:

```plaintext
S/(2 x sin(.5turn/N))
```

Written in CSS:

```css
--_r: min(50cqw - var(--s)/2,var(--s)/(2*sin(.5turn/sibling-count())));
```

Now, when you make the container bigger, the images will stay close to each other, which is perfect:

<CodePen
  user="anon"
  slug-hash="zxqEpdX"
  title="Fixing the responsive"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Let’s introduce another variable for the gap between images (`--g`) and update the formula slightly to keep a small gap between the images.

```css
.container {
  --s: 120px; /* image size */
  --g: 10px;  /* the gap */

  aspect-ratio: 1;
  container-type: inline-size;
}
.container img {
  width: var(--s);
  --_r: min(50cqw - var(--s)/2,(var(--s) + var(--g))/(2*sin(.5turn/sibling-count())));
  --_i: calc(1turn*sibling-index()/sibling-count());
  transform: rotate(calc(-1*var(--_i))) translate(var(--_r)) rotate(var(--_i));
}
```

<CodePen
  user="anon"
  slug-hash="QwNqaOr"
  title="Adding the gap"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## The Cut-Out Effect

For this part, we will be using the same mask that we used in the last article:

```css
mask: radial-gradient(50% 50% at X Y, #0000 calc(100% + var(--g)), #000);
```

With the horizontal list, the values of `X` and `Y` were quite simple. We didn’t have to define `Y` since its default value did the job, and the `X` value was either `150% + M` or `-50% - M`, with `M` being the margin that controls the overlap. Seen differently, `X` and `Y` are the coordinates of the center point of the next or previous image in the list.

That’s still the case this time around, but the value is trickier to calculate:

![Diagram of eight circular avatar images arranged around a circle. Two line segments identify an A segment in red and a B segment in green. The first segment points to the current image represented by i. The second segment points to the next image represented by i plus 1.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_8EB8676D2975C0D299467954CBB131676699FF18C298A3FD9090F0DFBEACB674_1763729635507_image.png?resize=911%2C477&ssl=1)

The idea is to start from the center of the current image (`50% 50%`) and move to the center of the next image (`X` and `Y`). I will first follow segment A to reach the center of the big circle and then follow segment B to reach the center of the next image.

This is the formula:

```plaintext
X = 50% - Ax + Bx
Y = 50% - Ay + By
```

`Ax` and `Ay` are the projections of the segment A on the X-axis and the Y-axis. We can use trigonometric functions to get the values.

```plaintext
Ax = r x sin(i);
Ay = r x cos(i);
```

The `r` represents the circle’s radius defined by the CSS variable `--_r`, and `i` represents the angle of rotation defined by the CSS variable `--_i`.

Same logic with the B segment:

```plaintext
Bx = r x sin(j);
By = r x cos(j);
```

The `j` is similar to `i`, but for the *next* image in the sequence, meaning we increment the index by 1. That gives us the following CSS calculations for each variable:

```css
--_i: calc(1turn*sibling-index()/sibling-count());
--_j: calc(1turn*(sibling-index() + 1)/sibling-count());
```

And the final code with the mask:

```css
.container {
  --s: 120px; /* image size */
  --g: 14px;  /* the gap */

  aspect-ratio: 1;
  container-type: inline-size;
}
.container img {
  width: var(--s);
  --_r: min(50cqw - var(--s)/2,(var(--s) + var(--g))/(2*sin(.5turn/sibling-count())));
  --_i: calc(1turn*sibling-index()/sibling-count());
  --_j: calc(1turn*(sibling-index() + 1)/sibling-count());
  transform: rotate(calc(-1*var(--_i))) translate(var(--_r)) rotate(var(--_i));
  mask: radial-gradient(50% 50% at
    calc(50% + var(--_r)*(cos(var(--_j)) - cos(var(--_i))))
    calc(50% + var(--_r)*(sin(var(--_i)) - sin(var(--_j)))),
      #0000 calc(100% + var(--g)), #000);
}
```

<CodePen
  user="anon"
  slug-hash="EaKwEdp"
  title="Adding the cutout effect"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Cool, right? You might notice two different implementations for the cut-out. The formula I used previously considered the next image, but if we consider the *previous* image instead, the cut-out goes in another direction. So, rather than incrementing the index, we decrement instead and assign it to a `.reverse` class that we can use when we want the cut-out to go in the opposite direction:

```css
.container img {
  --_j: calc(1turn*(sibling-index() + 1)/sibling-count());
}
.container.reverse img {
  --_j: calc(1turn*(sibling-index() - 1)/sibling-count());
}
```

---

## The Animation Part

Similar to what we did in the last article, the goal of this animation is to remove the overlap when an image is hovered to fully reveal it. In the horizontal list, we simply set its `margin` property to `0`, and we adjust the margin of the other images to prevent overflow.

This time, the logic is different. We will rotate all of the images except the hovered one until the hovered image is fully visible. The direction of the rotation will depend on the cut-out direction, of course.

![Eight avatar images arranged around a circle. An arrow points to the same thing showing what happens when hovering over the avatar positioned at the top of the circle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_8EB8676D2975C0D299467954CBB131676699FF18C298A3FD9090F0DFBEACB674_1763736360335_image.png?resize=1026%2C390&ssl=1)

To rotate the image, we need to update the `--_i` variable, which is used as an argument for the rotate function. Let’s start with an arbitrary value for the rotation, say `20deg`.

```css
.container img {
  --_i: calc(1turn*sibling-index()/sibling-count());
}
.container:has(:hover) img {
  --_i: calc(1turn*sibling-index()/sibling-count() + 20deg);
}
.container.reverse:has(:hover) img {
  --_i: calc(1turn*sibling-index()/sibling-count() - 20deg);
}
```

Now, when an image is hovered, all of images rotate by `20deg`. Try it out in the following demo.

<CodePen
  user="anon"
  slug-hash="vEGejeK"
  title="animation first try"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Hmm, the images do indeed rotate, but the mask is not following along. Don’t forget that the mask considers the position of the next or previous image defined by `--_j` and the next/previous image is rotating — hence we need to also update the `--_j` variable when the hover happens.

```css{10,14}
.container img {
  --_i: calc(1turn*sibling-index()/sibling-count());
  --_j: calc(1turn*(sibling-index() + 1)/sibling-count());
}
.container.reverse img {
  --_j: calc(1turn*(sibling-index() - 1)/sibling-count());
}
.container:has(:hover) img {
  --_i: calc(1turn*sibling-index()/sibling-count() + 20deg);
  --_j: calc(1turn*(sibling-index() + 1)/sibling-count() + 20deg);
}
.container.reverse:has(:hover) img {
  --_i: calc(1turn*sibling-index()/sibling-count() - 20deg);
  --_j: calc(1turn*(sibling-index() - 1)/sibling-count() - 20deg);
}
```

That’s a lot of redundant code. Let’s optimize it a little by defining additional variables:

```css
.container img {
  --_a: 20deg;

  --_i: calc(1turn*sibling-index()/sibling-count() + var(--_ii, 0deg));
  --_j: calc(1turn*(sibling-index() + 1)/sibling-count() + var(--_jj, 0deg));
}
.container.reverse img {
  --_i: calc(1turn*sibling-index()/sibling-count() - var(--_ii, 0deg));
  --_j: calc(1turn*(sibling-index() - 1)/sibling-count() - var(--_jj, 0deg));
}
.container:has(:hover) img {
  --_ii: var(--_a);
  --_jj: var(--_a);
}
```

Now the angle (`--_a`) is defined in one place, and I consider two intermediate variables to add an offset to the `--_i` and `--_j` variables.

<CodePen
  user="anon"
  slug-hash="raeGvvb"
  title="animation second try"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The rotation of all the images is now perfect. Let’s disable the rotation of the hovered image:

```css
.container img:hover {
  --_ii: 0deg;
  --_jj: 0deg;
}
```

<CodePen
  user="anon"
  slug-hash="raeGvrg"
  title="hover on one element"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Oops, the mask is off again! Do you see the issue?

We want to stop the hovered image from rotating while allowing the rest of the images to rotate. Therefore, the `--_j` variable of the hovered image needs to update since it’s linked to the next or previous image. So we should remove `--_jj: 0deg` and keep only `--_ii: 0deg`.

```css
.container img:hover {
  --_ii: 0deg;
}
```

<CodePen
  user="anon"
  slug-hash="dPMVeQX"
  title="fixing the rotation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

That’s a little better. We fixed the cut-out effect on the hovered image, but the overall effect is still not perfect. Let’s not forget that the hovered image is either the next or previous image of another image, and since it’s not rotating, another `--_j` variable needs to remain unchanged.

For the first list, it’s the variable of the previous image that should remain unchanged. For the second list, it’s the variable of the next image:

```css
/* select previous element of hovered */
.container:not(.reverse) img:has(+ :hover),
/* select next element of hovered */
.container.reverse img:hover + * {
  --_jj: 0deg;
}
```

In case you are wondering how I knew to do this, well, I tried both ways and I picked the one that worked. It was either the code above or this:

```css
.container:not(.reverse) img:hover + *,
.container.reverse img:has(+ :hover) {
  --_jj: 0deg;
}
```

<CodePen
  user="anon"
  slug-hash="XJdeqQr"
  title="almost there!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We are getting closer! All the images behave correctly except for one in each list. Try hovering all of them to identify the culprit.

Can you figure out what we are missing? Think a moment about it.

Our list is circular, but the HTML code is not, so even if the first and last images are visually placed next to each other, in the code, they are not. We cannot link both of them using the [<VPIcon icon="iconfont icon-css-tricks"/>adjacent sibling selector](https://css-tricks.com/almanac/selectors/a/adjacent-sibling/) (`+`). We need two more selectors to cover those edge cases:

```css
.container.reverse:has(:last-child:hover) img:first-child,
.container:not(.reverse):has(:first-child:hover) img:last-child {
  --_jj: 0deg;
}
```

<CodePen
  user="anon"
  slug-hash="azNLKov"
  title="all issues fixed"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Oof! We have fixed all the issues, and now our hover effect is great, but it’s still not perfect. Now, instead of using an arbitrary value for the rotation, we need to be accurate. We have to find the smallest value that removes the overlap while keeping the images as close as possible.

![Showing the gap between two images at three different points. The first and third points are too close and too spaced out, respectively. The middle point is perfect with just enough space between the images.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_8EB8676D2975C0D299467954CBB131676699FF18C298A3FD9090F0DFBEACB674_1763740238957_image.png?resize=986%2C274&ssl=1)

We can get the value with some trigonometry. I’ll skip the geometry lesson again (we have enough headaches as it is!) and give you the value:

```css
--_a: calc(2*asin((var(--s) + var(--g))/(2*var(--_r))) - 1turn/sibling-count());
```

<CodePen
  user="anon"
  slug-hash="GgZMYPY"
  title="Final demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Now we can say everything is perfect!

---

## Conclusion

This one was a bit tough, right? Don’t worry if you got a bit lost with all the complex formulas. They are very specific to this example, so even if you have already forget about them, that’s fine. The goal was to explore some modern features and a few CSS tricks such as `offset`, `mask`, `sibling-*` functions, container query units, `min()`/`max()`, and more!

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
  "title": "Responsive List of Avatars Using Modern CSS (Part 2)",
  "desc": "In this article, we follow up the work we did to create responsive rows of circular images in a previous article by arranging the images around a circle with a clean hover effect.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/responsive-list-of-avatars-using-modern-css-part-2.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
