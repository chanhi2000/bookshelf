---
lang: en-US
title: "Hover Proximity Using Modern CSS"
description: "Article(s) > Hover Proximity Using Modern CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Hover Proximity Using Modern CSS"
    - property: og:description
      content: "Hover Proximity Using Modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/hover-proximity-using-modern-css.html
prev: /programming/css/articles/README.md
date: 2026-08-26
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10732
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
  name="Hover Proximity Using Modern CSS"
  desc="You can always easily style :hover, but what if you want the NEXT item to have styling too? Or, just a smidge harder, the PREVIOUS item. How about multiple in any direction?"
  url="https://blog.master.dev/hover-proximity-using-modern-css"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10732"/>

I am not sure whether you have heard this term before or if I am just coining it, so let’s start with a demo to understand what I mean by “hover proximity”.

<CodePen
  link="https://codepen.io/t_afif/pen/XJpGZXX/8cf206eaae89182f6ade060aa6c646a1"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

When hovering over an avatar, you get a scaling effect on the main element as well as the adjacent elements. There is a kind of proximity to the hover effect, where elements near the cursor are affected with different scaling factors. Well, you get the idea.

In a 1D configuration (horizontal or vertical), the code structure is pretty simple. It’s a combination of different selectors to target the hovered element and its adjacent elements.

```css
img:hover { /* the main element */
  scale: 1.5;
}
img:hover + *,      /* the 1st next element */
img:has(+ *:hover) { /* the 1st previous element */
  scale: 1.2;
}
img:hover + * + *,       /* the 2nd next element */
img:has(+ * + *:hover) {  /* the 2nd previous element */
  scale: 1.1;
}
```

The code is fairly self-explanatory, and hopefully those comments help. The `+` selects the “next” elements while `:has()` combined with `+` selects the “previous” elements. You can extend to any number of elements by simply adding more selectors.

Now, what about a 2D configuration? It would be good to achieve the same effect within a grid, where on hover we affect the elements around the main one. That’s what we are doing in this article!

::: note

At the time of writing, only Chrome and Edge fully support the features we will be using.

:::

Here is a demo of what we are making. Hover around and see what happens.

<CodePen
  user="anon"
  slug-hash="EaZJrEy"
  title="Hover Proximity with scroll-driven animations"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? Not only do we have the proximity hover effect, but the whole thing is responsive. You can resize the screen, and the hover works fine! We will also learn how to create more variations using the same technique.

---

## The Grid Configuration

We are going to use CSS grid and the classic responsive configuration:

```css
.container {
  --s: 50px; /* size */
  --g: 10px; /* gap */
  
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(var(--s),1fr));
  gap: var(--g);
}
```

You are not limited to this configuration. The main requirement is to have the same width for all columns and the same height for the rows (which can differ from the width).

You can, for example, consider the following:

```css
.container {
  --s: 50px; /* size */
  --g: 10px; /* gap */
  
  display: grid;
  grid-template-columns: repeat(10,var(--s));
  gap: var(--g);
}
```

Which is a static grid with 10 columns. Knowing that the grid has a fixed number of columns will make the work easy. It’s more challenging to work with the responsive configuration and get a generic solution that you can easily adapt to your specific (and probably simpler) case.

---

## The Idea

Selecting the previous or next element is simple, but how do you select elements in a 2D configuration? The element at the top, the bottom, the diagonal? Don’t search for specific selectors; there are none.

Even in a grid configuration, all the elements remain adjacent, so the element at the top is a previous, previous, .., previous sibling and the element at the bottom is a next, next, .., next sibling. If we add the index of each element, it becomes clearer.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/GwS6jg44.png?resize=987%2C416&ssl=1)

The above is an example of a 5-column grid. Let’s consider the yellow element the one we are hovering. We need to target the elements 7,8,9,12,14,17,18,19. Do you see the trick? We have 4 elements in the “next” group and 4 elements in the “previous” group. It’s all about calculating how many `+` you have to use within your selector. Here is element 7, and I let you think about the remaining:

```css
.item:has(+ * + * + * + * + * + *:hover) {

}
```

Not only is this ugly, but it works **only** if we know the number of columns. With a responsive configuration, this won’t work as we cannot create dynamic selectors. So no, we are not going to rely on selectors!

I knew the selector idea wouldn’t work, but I had to mention it because it’s the first idea most of you would think of. After all, it’s probably the only way to affect other elements based on a specific element, but thanks to modern CSS, we have new mechanisms to simulate the selection we want.

We are working in a 2D grid, so instead of considering the indexes, we can use coordinates. Each element is placed within a specific row and column, so it has an `[x, y]` coordinate. Now let’s suppose we also have the coordinates of the hovered element (let’s call them `[i, j]`) and make them available for all elements.

```css
.container > * {
  /* the actual element */
  --x: ;
  --y: ; 

  /* the hovered element */
  --i: ;
  --j: ;
}
```

Seen differently, the variables `--x` and `--y` have different values for each element but never change, while `--i` and `--j` change and store the coordinates of the hovered element.

I know it’s a bit confusing, so here is a figure to better understand:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/ellllcUO.png?resize=580%2C354&ssl=1)

Notice how each element has its own `[x, y]` coordinates but all of them share the same `[i, j]` coordinates of the hovered element (the one in red)

Based on this information, we do some testing to identify the elements we want to target. For example, the element at the top has `y = j` and `x = i - 1`. The element at the bottom has `y = j` and `x = i + 1`. And so on.

::: note

Can CSS really do that?!

:::

Yes, it can!

It may sound like we are going to rely on JavaScript to retrieve the coordinates, do the testing, then apply the styles, but no. It’s a CSS-only implementation and a good opportunity to explore modern features.

---

## The Implementation

To make it easy to follow, I am dividing the implementation section into three distinct parts. The first two parts (especially the second one) are the trickiest, but also the ones where we define the internal logic you won’t change. The third part is about the selection logic. It’s the easiest and most important part because you need to be able to tweak it to create different variations of the effect.

### Getting the Coordinates of All the Items

To calculate the coordinates of each element, we need to find the number of columns. At the same time, let’s also calculate the number of rows. We will need it later.

```css
.container {
  --s: 50px; /* size */
  --g: 10px; /* gap */

  container-type: inline-size;
}
.container > * {
  /* number of columns */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* number of rows */
  --m: round(up,sibling-count()/var(--n));
}
```

We make the container a “container” to rely on `100cqw` as the total available width, then we divide that width by the size of each element to know how many elements can fit within that width. The result will be a number that we round down to get an integer.

The formula also includes the gap, but since the gap is between the elements, we have `N - 1` gaps, that’s why we are not doing `100cqw/(s + g)` but `(100cqw + g)/(s + g)`. [**Ana Tudor did a good job explaining this calculation using clear figures**](/blog.master.dev/count-auto-fill-columns.md#mind-the-gap).

<CodePen
  user="anon"
  slug-hash="LEVqOpZ"
  title="Gaps for n columns"
  :default-tab="['css','result']"
  :theme="dark"/>

To get the number of rows, we divide the total number of children (using `sibling-count()`) by the number of columns. This time, we round the number up because the fraction means the last column is not fully filled. If, for example, we have 22 items and 6 columns, we get 3.67, hence we need 4 rows (3 rows filled with 6 items and the last row filled with only 4 items).

Now, we can calculate the `[x, y]` coordinates. To be more precise, we will convert the index of each element (obtained using `sibling-index()`) into coordinates.

Here is a figure showing the coordinates and the indexes.

![](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_45278D3D4BD493097E2BF7E124E5313758ECAE1564CE03B896FD7F1A802CC21D_1786314417070_image.png?ssl=1)

We have 5 columns and, for example, the element with the index 17 has the coordinates `[3, 1]`. If we consider the number of columns to be our variable `N`, we can write the following formula:

$$
\left(\text{index}-1\right)=x\times{N}+y
$$

All the values are integers; `x` is the quotient and `y` is the remainder. Don’t worry, I am not starting a boring math course, so here is how everything translates into CSS:

```css
.container {
  --s: 50px; /* size */
  --g: 10px; /* gap */

  container-type: inline-size;
}
.container > * {
  /* number of column */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* number of rows */
  --m: round(up,sibling-count()/var(--n));

  /* the element coordinates */
  --x: round(down,(sibling-index() - 1)/var(--n));
  --y: mod(sibling-index() - 1,var(--n)); 
}
```

We didn’t use the number of rows yet. It’s necessary to calculate the coordinates of the hovered item.

### Getting the Coordinates of the Hovered Item

If you dissect the code in the demo I shared in the introduction, you can easily understand the part that calculates the items’ coordinates, but calculating the hovered item’s coordinates is a bit tricky. There are animations, a `view-timeline` on hover, etc.

We are going to use Scroll-driven animations. We have nothing to animate or scroll, yet this is the feature we need. From [<VPIcon icon="iconfont icon-w3c"/>the specification](https://w3.org/TR/scroll-animations-1/#intro):

::: info "Scroll-driven Animations - 1. Introduction" *From W3C* (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> There are two types of scroll-driven timelines:
>
> [<VPIcon icon="iconfont icon-w3c"/>Scroll Progress Timelines](https://w3.org/TR/scroll-animations-1/#scroll-timelines), which are linked to the scroll progress of a particular scroll container
>
> [<VPIcon icon="iconfont icon-w3c"/>View Progress Timelines](https://w3.org/TR/scroll-animations-1/#view-timelines), which are linked to the view progress of a particular box through a scrollport

```component VPCard
{
  "title": "Scroll-driven Animations",
  "desc": "This specification defines mechanisms for driving the progress of an animation based on the scroll progress of a scroll container. These scroll-driven animations use a timeline based on scroll position, rather than one based on clock time. This module provides both an imperative API building on the Web Animations API as well as a declarative API building on CSS Ani...",
  "link": "https://w3.org/TR/scroll-animations-1/#intro",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

The second type is what we are seeking. The definition is a bit formal and not easy to grasp, but it means we can track an element’s position within a scrollable container. That position can control the progress of an animation.

::: note

A scrollable container? But you said we have nothing to scroll?!

:::

For this part, we only need to add `overflow: hidden` to the container. We don’t need to scroll anything, but for an element to be a “scroll container”, it needs to have an `overflow` value different from `visible` or `clip`. Well, you can see it as the `position: relative` you add to the container when using `position: absolute` with a child.

```css
.container {
  overflow: hidden:
}
```

Now let’s get back to our grid. Each element has a different position inside the container, so if all of them are used to control the same animation, they will give us different progress. I will use that difference to get the coordinates of the hovered item.

Still unclear? Let’s make a simple demo:

<CodePen
  link="https://codepen.io/t_afif/pen/QwdoXpE/bbee27d71fcc64d1fe5506bad09c804b"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

We have a container containing one element. When that element is on the left, the background is red, and when it’s on the right, the background is green. The position is controlling a background animation defined on the container.

```css
.container {
  overflow: hidden; /* make me a scroll container */
  
  timeline-scope: --_i; /* enlarge the scope of the custom timeline */
  animation: --_i linear both; /* define a basic animation */
  animation-timeline: --_i; /* use the custom timeline as the progress of the animation */
  animation-range: entry 100% exit 0%;
}
@keyframes --_i { 
  0%   {background: green} 
  100% {background: red  }
}
.container > * {
  view-timeline: --_i x; /* define a custom timeline linked to my position in the x axis */
}
```

The child element defines a custom timeline with `view-timeline`. That custom timeline is used by the parent with `animation-timeline`. Whenever the position of the child changes in the x-axis, the progress of the animation changes as well.

Two things to note. The first one is that I am using `--_i` everywhere to confuse you a bit. In reality, we have two `--_i`. The one used to define the custom timeline and the one used to define the animation name. Yes, animation can use the `<custom-ident>` notation, and no, the browser won’t get confused if the same name is used in different places.

The second thing is the use of `animation-range`. Its purpose is to calibrate the range based on our need. We need the left position to match the `100%` of the keyframes and the right position to match the `0%`.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/kFwwDYfT.png?resize=716%2C273&ssl=1)

If you are new to scroll-driven animations, you are probably a bit lost at this stage. Don’t worry, this won’t affect your understanding of what comes next, but I invite you to check [<VPIcon icon="fa-brands fa-firefox"/>the MDN Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations), which is a good starting point for learning about this feature.

Now let’s get back to the previous demo and, instead of one element, we add two (one on each side). Hover over each element and see what happens.

<CodePen
  link="https://codepen.io/t_afif/pen/yygwdzb/e5b77c47cb0eb7cde6c23d6454871b4d"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

See that? The hovered element defines the custom timeline, and we get a different color because each element has a different position!

```css
.container > *:hover {
  view-timeline: --_i x;
}
```

Let’s add more elements and fill the whole container.

<CodePen
  link="https://codepen.io/t_afif/pen/ZYLNOYW/86e3045dbf890450cddd6cb0a692f577"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Again, each element is linked to a different color. A color in the range `[green, red]` (not really a range but you get the idea)

Do you see where I am going with this trick? If, instead of background, I animate a variable from `0` to `1` and I consider two animations (one for each axis), then each element will give us two different values when hovered. We have our coordinates!

Here is the final code:

```css
.container {
  overflow: hidden;

  timeline-scope: --_i,--_j;
  animation: --_i linear both,--_j linear both;
  animation-timeline: --_i,--_j;
  animation-range: entry 100% exit 0%;
}
@keyframes --_i { 
  0%   {--_i: 1} 
  100% {--_i: 0}
}
@keyframes --_j { 
  0%   {--_j: 1} 
  100% {--_j: 0}
}

.container > * {
  /* number of column */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* number of rows */
  --m: round(up,sibling-count()/var(--n));
  
  /* coordinates of the hovered element */
  --i: round(var(--_i)*(var(--m) - 1));
  --j: round(var(--_j)*(var(--n) - 1));
}
.container > *:hover { 
  view-timeline: --_j x, --_i y;
}
```

We have two custom timelines (one for each axis), and two animations, each animating a different variable. I am again using the same naming to define distinct things: The custom timeline (defined with `view-timeline` and used by `animation-timeline`), the animation name, and the animated variable used to get the coordinates.

Let’s have a look at our grid again and try a few examples to understand how it works:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/R8XD-Bx7-1.png?resize=473%2C456&ssl=1)

The element 1 is placed at the top and the left, so its position triggers the `100%` of each keyframes hence we get `0`. The element 25 will do the opposite and triggers the `0%` of each keyframes to get `1`. But what about the other items?

The logic is simple. All the elements have the same size (it’s here where this constraint is mandatory), so we have a fixed step for each animation and this step is equal to `1/(N - 1)` for the columns and `1/(M - 1)` for the rows.

In this case, we have 5 columns (5 elements horizontally), so the step is `.25`. The animation gives us the following values: `0, 0.25, 0.5, 0.75, 1`. If we multiply those values by the opposite of the step (`N - 1`), we get the `x` coordinate. Same logic for the rows to get the `y` coordinate.

```css
.container > * {
  /* number of column */
  --n: round(down,(100cqw + var(--g))/(var(--s) + var(--g)));
  /* number of rows */
  --m: round(up,sibling-count()/var(--n));
  
  /* coordinates of the hovered item */
  --i: round(var(--_i)*(var(--m) - 1));
  --j: round(var(--_j)*(var(--n) - 1));
}
```

I am using `round()` to make sure the final result is always an integer.

Here is an interactive demo where each element shows all the values we just calculated (number of columns and rows, its coordinates, the coordinates of the hover element). Hover over different elements and see how the values update. Don’t forget that everything is responsive, so don’t hesitate to resize the demo as well.

<CodePen
  user="anon"
  slug-hash="XJpOwoa"
  title="Grid information (chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

It should be noted that you have to register the variables used within the animation with `@property`, and as an initial value, you can use any value outside the range `[0, 1]` to ensure the default values when no element is hovered don’t match any existing element. For this reason, I use `-1` and you get `1 - N` and `1 - M` as default values for `[i, j]`.

This part can be tricky to understand, so don’t hesitate to give it another read. It also helps to use pen and paper to dissect the different formulas. That said, the next part will assume we have all the coordinates, so even if you don’t fully grasp all the logic we did until now, it won’t block you from understanding the selection part.

### The Selection

For this part, we are going to rely on the new `if()` as we need to express conditions based on the coordinates, so let’s start with the simple case:

```css
background: if(
  style((--i = --x) and (--j = --y)): red;
  else: green;
);
```

<CodePen
  link="https://codepen.io/t_afif/pen/azprbLE/522e2d6df18362619dbb5f1c32e8e5ce"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Easy, right? If both coordinates are equal, we are selecting the hovered element. If you are unfamiliar with the `if()` syntax, here is a quick reading that I invite you to check before we continue: “[**The Hidden Trick of Style Queries and if()**](/css-tip.com/if-trick.md)”.

Let’s add another condition:

```css
background: if(
  style((--i = --x) and (--j = --y)): red;
  style((--i = calc(var(--x) - 1)) and (--j = --y)): yellow;
  else: green;
);
```

<CodePen
  link="https://codepen.io/t_afif/pen/qERGBVY/b5e0b159c35dfa62582750f5de5d91ca"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

A new selected element with a new color! Are you starting to get the trick? It’s nothing but a list of conditions where each condition selects an element and applies specific CSS to it.

::: note

So we need to have as many conditions as elements? That’s too much!

:::

No, because you can define a condition that selects multiple items at the same time. Take the following example:

```css
background: if(
 style((--x = --i) and (--y = --j)): red;
 style((abs(var(--x) - var(--i)) <= 1) and (abs(var(--y) - var(--j)) <= 1)): orange;
 style((abs(var(--x) - var(--i)) <= 2) and (abs(var(--y) - var(--j)) <= 2)): blue;
 else: green;
);
```

If the absolute difference between `x` and `i` is smaller or equal to 1 (same for `j` and `y`) we select the elements around the hovered one. If it’s smaller or equal to 2, we select … well, see it by yourself in the below demo:

<CodePen
  link="https://codepen.io/t_afif/pen/pvRmoaE/f902b8b85dbb17beb981e951f1d0c684"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? There are endless possibilities for what you can achieve with this technique. You can combine this with many properties to create satisfying demos.

In the demo below, I am changing the background, the border-radius, and the size using scale.

<CodePen
  link="https://codepen.io/t_afif/pen/ogBVjpO/90bf5aaa9712c7e64a6bcc4ae02db1a6"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Until now, we have been doing a precise selection. We are selecting specific elements and defining specific styles for them. We can do something different and, instead of conditions, we apply dynamic styles to all elements.

Let’s consider the following variable:

```css
--_d: hypot(var(--x) - var(--i),var(--y) - var(--j));
```

Without going into the math details, the `--_d` variable contains a unitless value of the distance between an element and the hovered element. A value we can use within different properties to create another cool effect!

```css
border-radius: calc(50% - 4%*var(--_d));
scale: max(.7,1.4 - .1*var(--_d));
opacity: max(.4,1 - .1*var(--_d));
```

<CodePen
  user="anon"
  slug-hash="EaZJrEy"
  title="Hover Proximity with scroll-driven animations"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s a real hover proximity! The distance from the hovered element (or the cursor) will define the values for border-radius, scale, and opacity.

What are you waiting for? It’s time for you to play with this technique and create fun demos. You have all the ingredients to do so.

---

## More Examples

The goal of the article was to create the hover proximity effect but the technique can be used to create other kinds of hover effects.

Like selecting the elements in the same column or the same row or both!

<CodePen
  user="anon"
  slug-hash="LExvqzx"
  title="highlight same row and column on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

And the code is pretty simple:

```css
if(
  style((--x = --i) or (--y = --j)): style_of_selected;
  else: style_of_non_selected;
);
```

You want the diagonal? Doable!

<CodePen
  user="anon"
  slug-hash="PwWvoXo"
  title="highlight diagonal on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

```css
if(
  style(abs(var(--x) - var(--i)) = abs(var(--y) - var(--j))): style_of_selected;
  else: style_of_non_selected;
);
```

Here are a few more examples for you to dissect. As I said, there are endless possibilities.

<CodePen
  user="anon"
  slug-hash="XJpwKXp"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="JoEqJmv"
  title="Hover Proximity with scroll-driven animations"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="MYJdQpR"
  title="Hover Proximity with scroll-driven animations"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

I hope you enjoyed this fun CSS experiment! It was a good opportunity to explore some of the new CSS capabilities. Within a responsive grid configuration, we were able to calculate the number of columns and rows, get the coordinates of each element, get the coordinates of the hovered element, and style specific elements based on conditions.

We are far from that styling language we use to simply set colors, margins, widths, etc. Now, we can perform complex calculations, define conditional behaviors, set dynamic styling, and much more! Is this what we call “programming”?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hover Proximity Using Modern CSS",
  "desc": "You can always easily style :hover, but what if you want the NEXT item to have styling too? Or, just a smidge harder, the PREVIOUS item. How about multiple in any direction?",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/hover-proximity-using-modern-css.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
