---
lang: en-US
title: "Infinite Marquee Animation using Modern CSS"
description: "Article(s) > Infinite Marquee Animation using Modern CSS"
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
      content: "Article(s) > Infinite Marquee Animation using Modern CSS"
    - property: og:description
      content: "Infinite Marquee Animation using Modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/infinite-marquee-animation-using-modern-css.html
prev: /programming/css/articles/README.md
date: 2025-08-04
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6673
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
  name="Infinite Marquee Animation using Modern CSS"
  desc="A row of logos that animate forever perfectly and don't have any duplicated HTML or JavaScript at all is quite a trick. Thanks modern CSS! "
  url="https://frontendmasters.com/blog/infinite-marquee-animation-using-modern-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6673"/>

A set of logos with an infinite repeating slide animation is a classic component in web development. We can find countless examples and implementations starting from the old (and now deprecated) [<VPIcon icon="fa-brands fa-firefox"/>`<marquee>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/marquee). I’ve written [<VPIcon icon="fas fa-globe"/>an article](https://verpex.com/blog/website-tips/how-to-create-a-css-only-infinite-scroll-animation) about it myself a few years ago.

*“Why another article?”* you ask. CSS keeps evolving with new and powerful features, so I always try to find room for improvement and optimization. We’ll do that now with some new CSS features.

::: note

At the time of writing, only Chrome-based browsers have the full support of the features we will be using, which include features like `shape()`, `sibling-index()`, and `sibling-count()`.

:::

<CodePen
  user="t_afif"
  slug-hash="QwjGqEJ"
  title="Responsive infinite logo marquee"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In the demo above, we have an infinite marquee animation that works with **any number** of images. Simply add as many elements as you want in the HTML. There is no need to touch the CSS. You can easily control the number of visible images by adjusting one variable, and it’s responsive. Resize the screen and see how things adjust smoothly.

You might think the code is lengthy and full of complex calculations, but it’s less than 10 lines of CSS with no JavaScript.

```css
.container {
  --s: 150px; /* size of the images */
  --d: 8s; /* animation duration */
  --n: 4; /* number of visible images */
  
  display: flex;
  overflow: hidden;
}
img {
  width: var(--s);
  offset: shape(from calc(var(--s) / -2) 50%, hline by calc(sibling-count() * max(100%/var(--n),var(--s))));
  animation: x var(--d) linear infinite calc(-1 * sibling-index() * var(--d) / sibling-count());
}
@keyframes x { 
  to { offset-distance: 100%; }
}
```

Perhaps this looks complex at first glance, especially that strange `offset` property! Don’t stare too much at it; we will dissect it together, and by the end of the article, it will look quite easy.

---

## The Idea

The tricky part when creating a marquee is to have that cyclic animation where each element needs to “jump” to the beginning to slide again. Earlier implementations will duplicate the elements to simulate the infinite animation, but that’s not a good approach as it requires you to manipulate the HTML, and you may have accessibility/performance issues.

Some modern implementations rely on a complex translate animation to create the “jump” of the element outside the visible area (the user doesn’t see it) while having a continuous movement inside the visible area. This approach is perfect but requires some complex calculation and may depend on the number of elements you have in your HTML.

It would be perfect if we could have a native way to create a continuous animation with the “jump” and, at the same time, make it work with any number of elements. The first part is doable and we don’t need modern CSS for it. We can use `offset` combined with `path()` where the path will be a straight line.

<CodePen
  user="t_afif"
  slug-hash="JoYEPaE"
  title="Using path()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Inside path, I am using the SVG syntax to define a line, and I simply move the image along that line by animating `offset-distance` between 0% and 100%. This looks perfect at first glance since we have the animation we want but it’s not a flexible approach because `path()` accepts only hard-coded pixel values.

To overcome the limitation of `path()`, we are going to use [**the new `shape()` function**](/frontendmasters.com/shape-a-new-powerful-drawing-syntax-in-css.md)! Here is a quote from [<VPIcon icon="fas fa-globe"/>the specification](https://drafts.csswg.org/css-shapes-1/#shape-function):

> The `shape()` function uses a set of commands roughly equivalent to the ones used by `path()`, but does so with more standard CSS syntax, and allows the full range of CSS functionality, such as additional units and math functions … In that sense, `shape()` is a superset of `path()`.

Instead of drawing a line using `path()`, we are going to use `shape()` to have the ability to rely on CSS and control the line based on the number of elements.

Here is the previous demo using `shape()`:

<CodePen
  user="t_afif"
  slug-hash="jEbyEJx"
  title="using shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you are unfamiliar with `shape()`, don’t worry. Our use case is pretty basic as we are going to simply draw a horizontal line using the following syntax:

```css
offset: shape(from X Y, hline by length);
```

The goal is to find the `X Y` values (the coordinates of the starting point) and the `length` value (the length of the line).

---

## The Implementation

Let’s start with the HTML structure, which is a set of images inside a container:

```html
<div class="container">
  <img src="">
  <img src="">
  <!-- as many images as you want -->
</div>
```

We make the container flexbox to remove the default space between the image and make sure they don’t wrap even if the container is smaller (remember that `flex-wrap` is by default `nowrap`).

<CodePen
  user="t_afif"
  slug-hash="RNWKPNK"
  title="initial structure"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Now, let’s suppose we want to see only N images at a time. For this, we need to define the width of the container to be equal to `N x size_of_image`.

```css
.container {
  --s: 100px; /* size of the image */
  --n: 4; /* number of visible images */

  display: flex;
  width: calc(var(--n) * var(--s));
  overflow: hidden;
}
img {
  width: var(--s);
}
```

<CodePen
  user="t_afif"
  slug-hash="qEORdbO"
  title="fixing the width"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Nothing complex so far. We introduced some variables to control the size and the number of visible images. Now let’s move to the animation.

To have a continuous animation, the length of the line needs to be equal to the total number of images multiplied by the size of one image. In other words, we should have a line that can contain all the images side by side. The `offset` property is defined on the image elements, and thanks to modern CSS, we can rely on the new `sibling-count()` to get the total number of images.

```css
offset: shape(from X Y, hline by calc(sibling-count() * var(--s)));
```

What about the `X Y` values? Let’s try `0 0` and see what happens:

<CodePen
  user="t_afif"
  slug-hash="azvpOBO"
  title="adding the animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Hmm, not quite good. All the images are above each other, and their position is a bit off. The first issue is logical since they share the same animation. We will fix it later by introducing a delay.

The trickiest part when working with `offset` is defining the position. The property is applied on the child elements (the images in our case), but the reference is the parent container. By specifying `0 0`, we are considering the top-left corner of the parent as the starting point of the line.

What about the images? How are they placed? If you remove the animation and keep the `offset-distance` equal to 0% (the default value), you will see the following.

![An animated marquee with text that moves horizontally across a container, showcasing a modern CSS implementation for infinite scrolling images or text.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/GsbSeQsh.png?resize=577%2C258&ssl=1)

The center of the images is placed at the `0 0`, and starting from there, they move horizontally until the end of the line. Let’s update the `X Y` values to rectify the position of the line and bring the images inside the container. For this, the line needs to be in the middle `0 50%`.

```css
offset: shape(from 0 50%, hline by calc(sibling-count() * var(--s)));
```

<CodePen
  user="t_afif"
  slug-hash="YPyNXEQ"
  title="fixing the position"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It’s better, and we can already see the continuous animation. It’s still not perfect because we can see the “jump” of the image on the left. We need to update the position of the line so it starts outside the container and we don’t see the “jump” of the images. The `X` value should be equal to `-S/2` instead of 0. 

```css
offset: shape(from calc(var(--s)/-2) 50%, hline by calc(sibling-count() * var(--s)));
```

<CodePen
  user="t_afif"
  slug-hash="RNWKPQj"
  title="fixing the jump"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

No more visible jump, the animation is perfect!

To fix the overlap between the images, we need to consider a different delay for each image. We can use `nth-child()` to select each image individually and define the delay following the logic below:

```css
img:nth-child(1) {animation-delay: -1 *  duration/total_image }
img:nth-child(2) {animation-delay: -2 *  duration/total_image }
/* and so on */
```

Tedious work, right? And we need as many selectors as the number of images in the HTML code, which is not good. What we want is a generic CSS code that doesn’t depend on the HTML structure (the number of images).

Similar to the `sibling-count()`that gives us the total number of images, we also have [<VPIcon icon="fas fa-globe"/>`sibling-index()`](https://css-tip.com/element-index/)` [<VPIcon icon="fas fa-globe"/>that gives us the index of each image within the container](https://css-tip.com/element-index/). All we have to do is to update the animation property and include the delay using the index value that will be different for each image, hence a different delay for each image!

```css
animation: 
  x var(--d) linear infinite 
  calc(-1*sibling-index()*var(--d)/sibling-count());
```

<CodePen
  user="t_afif"
  slug-hash="PwPWqda"
  title="The final animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Everything is perfect! The final code is as follows:

```css
.container {
  --s: 100px; /* size of the image */
  --d: 4s; /* animation duration */
  --n: 4; /* number of visible images */
  
  display: flex;
  width: calc(var(--n) * var(--s));
  overflow: hidden;
}
img {
  width: var(--s);
  offset: shape(from calc(var(--s)/-2) 50%, hline by calc(sibling-count() * var(--s)));
  animation: x var(--d) linear infinite calc(-1*sibling-index()*var(--d)/sibling-count());
}
@keyframes x { 
  to {offset-distance: 100%}
}
```

We barely have 10 lines of CSS with no hardcoded values or magic numbers!

---

## Let’s Make it Responsive

In the previous example, we fixed the width of the container to accommodate the number of images we want to show but what about a responsive behavior where the container width is unknown? We want to show only N images at a time within a container that doesn’t have a fixed width.

The observation we can make is that if the container width is bigger than `NxS`, we will have space between images, which means that the line defined by `shape()` needs to be longer as it should contain the extra space. The goal is to find the new length of the line.

Having N images visible at a time means that we can express the width of the container as follows:

```css
width = N x (image_size + space_around_image)
```

We know the size of the image and N (Defined by `--s` and `--n`), so the space will depend on the container width. The bigger the container is, the more space we have. That space needs to be included in the length of the line.

Instead of:

```css
hline by calc(sibling-count() * var(--s))
```

We need to use:

```css
hline by calc(sibling-count() * (var(--s) + space_around_image))
```

We use the formula of the container width and replace `(var(--s) + space_around_image)` with `width / var(--n)` and get the following:

```css
hline by calc(sibling-count() * width / var(--n) )
```

Hmm, what about the width value? It’s unknown, so how do we find it?

The width is nothing but `100%`! Remember that `offset` considers the parent container as the reference for its calculation so `100%` is relative to the parent dimension. We are drawing a horizontal line thus `100%` will resolve to the container width.

The new offset value will be equal to:

```css
shape(from calc(var(--s)/-2) 50%, hline by calc(sibling-count() * 100% / var(--n)));
```

And our animation is now responsive.

Resize the container (or the screen) in the below demo and see the magic in play:

<CodePen
  user="t_afif"
  slug-hash="zxvNvrN"
  title="responsive animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We have the responsive part but it’s still not perfect because if the container is too small, the images will overlap each other.

We can fix this by combining the new code with the previous one. The idea is to make sure the length of the line is at least equal to the total number of images multiplied by the size of one image. Remember, it’s the length that allows all the images to be contained within the line without overlap.

So we update the following part:

```css
calc(sibling-count() * 100% / var(--n))
```

With:

```css
max(sibling-count() * 100% / var(--n), sibling-count() * var(--s))
```

The first argument of `max()` is the responsive length, and the second one is the fixed length. If the first value is smaller than the second, we will use the latter and the images will not overlap.

We can still optimize the code a little as follows:

```css
calc(sibling-count() * max(100% / var(--n),var(--s)))
```

We can also add a small amount to the fixed length that will play the role of the minimum gap between images and prevent them from touching each other:

```css
calc(sibling-count() * max(100% / var(--n), var(--s) + 10px))
```

We are done! A fully responsive marquee animation using modern CSS.

Here is again the demo I shared at the beginning of the article with all the adjustments made:

<CodePen
  user="t_afif"
  slug-hash="QwjGqEJ"
  title="Responsive infinite logo marquee"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Do you still see the code as a complex one? I hope not!

::: note

The use of `min()` or `max()` is not always intuitive, but [<VPIcon icon="fas fa-globe"/>I have a small tutorial that can help you identify which one to use](https://css-tip.com/min-max/).

:::

---

## More Examples

I used images to explain the technique, but we can easily extend it to any kind of content. The only requirement/limitation is to have equal-width items.

We can have some text animations:

<CodePen
  user="t_afif"
  slug-hash="vENyewr"
  title="Responsive Infinite marquee animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Or more complex elements with image + text:

<CodePen
  user="t_afif"
  slug-hash="vENyead"
  title="Responsive Infinite marquee animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In both examples, I am using `flex-shrink: 0` to avoid the default shrinking effect of the flex items when the container gets smaller. We didn’t have this issue with images as they won’t shrink past their defined size.

---

## Conclusion

Some of you will probably never need a marquee animation, but it was a good opportunity to explore modern features that can be useful such as the `shape()` and the `sibling-*()` functions. Not to mention the use of CSS variables, `calc()`, `max()`, etc., which I still consider part of modern CSS even if they are more common.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Infinite Marquee Animation using Modern CSS",
  "desc": "A row of logos that animate forever perfectly and don't have any duplicated HTML or JavaScript at all is quite a trick. Thanks modern CSS! ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/infinite-marquee-animation-using-modern-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
