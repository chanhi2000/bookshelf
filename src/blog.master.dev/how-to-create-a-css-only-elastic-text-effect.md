---
lang: en-US
title: "How to Create a CSS-only Elastic Text Effect"
description: "Article(s) > How to Create a CSS-only Elastic Text Effect"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a CSS-only Elastic Text Effect"
    - property: og:description
      content: "How to Create a CSS-only Elastic Text Effect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-create-a-css-only-elastic-text-effect.html
prev: /programming/css/articles/README.md
date: 2026-02-11
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8537
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
  name="How to Create a CSS-only Elastic Text Effect"
  desc="What can we say except BOINNNGGG BOINNGGGGGG. "
  url="https://blog.master.dev/how-to-create-a-css-only-elastic-text-effect/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8537"/>

Text effects where each letter animates separately are always cool and eye-catching. Such staggered animations are often achieved with JavaScript libraries, making their code a bit heavy for the relatively small design effect we’re usually shooting for. In this article, we will explore tricks to achieve a fancy text effect with just CSS and without the need of JavaScript (meaning will do the character-splitting by hand).

::: note

At the time of writing, only Chrome and Edge have full support of the features we will be using.

:::

Hover the text in the demo below and see the magic in play:

<CodePen
  user="anon"
  slug-hash="xbOzxyp"
  title="Direction-aware Elastic hover effect (Chrome only)"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? We have a realistic elastic effect with nothing but CSS. It’s also flexible and easy to adjust. Before we dig into the code, let me start with an important warning. It’s a nice effect but it comes with several drawbacks.

---

## Important Disclaimer About Accessibility

The effect we are making relies on splitting words into letters, which, in general, is a very bad idea.

A simple link with a word in it is normally like this:

```html
<a href="#">About</a>
```

But we need to target and style individual letters, so we’ll be doing this:

```html
<a href="#">
  <span>A</span><span>b</span><span>o</span><span>u</span><span>t</span>
</a>
```

This has accessibility drawbacks.

There is a strong temptation to use `aria-*` attributes to fix that up. Or that’s what I thought, anyway. I found a few online resources that recommend using a structure similar to this one:

```html
<a href="#" aria-label="About">
  <span aria-hidden="true">
    <span>A</span><span>b</span><span>o</span><span>u</span><span>t</span>
  </span>
</a>
```

Looks good, right? No! That structure is still terrible. Actually, most of the structures you will find online are bad. I am not an expert in the field, so I asked around, and two blog posts by [<VPIcon icon="fas fa-globe"/>Adrian Roselli](https://adrianroselli.com/) emerged:

<SiteInfo
  name="Barriers from Links with ARIA"
  desc="Today Temani Afif asked a question: Are the below codes equivalent if we consider all the aspects? (a11y, semantic, something else maybe?) If not, what is missing (or should be changed) in the second code CSS by T. Afif (@css@front-end.social) 22 January 2026, 2:52pm I have my canned response that…"
  url="https://adrianroselli.com/2026/01/barriers-from-links-with-aria.html/"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2026/01/chrome-reader-view_aria-hidden-links-300x300.jpg"/>

<SiteInfo
  name="You Know What? Just Don’t Split Words into Letters"
  desc="This is an unplanned part two for Barriers from Links with ARIA. The title reflects my exasperation because this isn’t new, I’ve simply failed to be explicit about it over the last decade or so. In 2012 I vented about TypeButter using <kern style=”letter-spacing: -0.01em;”> for each letter. In 2020…"
  url="https://adrianroselli.com/2026/02/you-know-what-just-dont-split-words-into-letters.html/"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2026/02/SplitText-Narr_poster-300x169.jpg"/>

I highly recommend you read them to understand why splitting words is a bad idea (and what the potential solutions might be).

So why am I making this demo anyway?

I consider it more of a CSS experiment to explore modern features. That effect probably contains many properties that you are not aware of so it’s a good opportunity to discover them. Use it for fun or within a side project, but think twice before including it anywhere in widespread use or mission critical.

Now that you are warned, let’s get started.

---

## How Does It Work?

The idea is to use the `offset()` property and define a path that the letters should follow. That path will be a curve that we animate along. The `offset()` property is an underrated feature, but it has a lot of potential, especially when combined with modern features. I used it to create [**an infinite marquee animation**](/blog.master.dev/infinite-marquee-animation-using-modern-css.md), to perfectly [**position elements around a circle**](/css-tip.com/images-circle.md), to create a [**fancy gallery of images**](/css-tip.com/circular-gallery.md), and so on.

Here is a simplified example to understand the trick we will be using:

<CodePen
  user="anon"
  slug-hash="NPrBVGd"
  title="Overview of the technique"
  :default-tab="['css','result']"
  :theme="dark"/>

The demo above uses `path()` values, which comes from SVG. The three letters initially follow the first one. On hover, I switch to the second path. Thanks to the transition, we have a nice effect.

Unfortunately, using SVG is not ideal because you can only create static pixel-based paths that cannot be controlled with CSS. Instead, we are going to rely on [**the new `shape()` function**](/blog.master.dev/shape-a-new-powerful-drawing-syntax-in-css.md), which allows us to define complex shapes (including curves) that we can easily control using CSS.

In this article, I will consider a simple usage for `shape()` as we only need one curve, but if you want to explore this powerful function, here are some of my previous articles:


```component VPCard
{
  "title": "Creating Flower Shapes using clip-path: shape()",
  "desc": "Use the `arc` command within the `shape()` function we can draw a line that follows a circle from one point to the next, controlling the direction.",
  "link": "/blog.master.dev/creating-flower-shapes-using-clip-path-shape.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Creating Blob Shapes using clip-path: shape()",
  "desc": "Blobs! Gooey weird shapes you can fill with any background and even animate. ",
  "link": "/blog.master.dev/creating-blob-shapes-using-clip-path-shape.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Better CSS Shapes Using shape() — Part 1: Lines and Arcs",
  "desc": "This is the first part of a series that dives deep into the shape function, starting with shapes that use lines and arcs.",
  "link": "/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

---

## Let’s write some code

The HTML I will work with:

```html
<ul>
  <li>
    <a href="#"><span>A</span><span>b</span><span>o</span><span>u</span><span>t</span></a>
  </li>
  <!-- more li elements -->
</ul>
```

The CSS:

```css
ul li a {
  display: flex;
  font-family: monospace;
}
ul li a span {
  offset-path: shape(???);
  offset-distance: ???;
}
ul li a:hover {
  offset-path: shape(???);
}
```

::: details Nothing fancy so far

<CodePen
  link="https://codepen.io/t_afif/pen/emzjazr/2a630d418787b3bd41a2bd25faba0ae8"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

A flexbox configuration to place the letters side-by-side and a monospace font because we need all the letters to have the same width.

Next, we define the path using the following code:

```css
offset-path: shape(from Xa Ya, curve to Xb Yb with Xc Yc / Xd Yd );
```

I am using the curve command to draw a Bezier curve from A to B, with two control points, C and D.

![A diagram illustrating a curve with points labeled A, B, C, and D. Points A and B are endpoints of the curve, while C and D are control points affecting the shape of the curve.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/DU1tNgpr.png?resize=693%2C352&ssl=1)

Then I will animate the curve by adjusting the coordinates of the control points, specifically their Y value. When it is equal to the Y value of A and B, we get a straight line. When it’s bigger, we get a curve.

![Illustration comparing two shapes: a curved path on the left and a straight line on the right, demonstrating the transition between the two forms.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/LFV3iqIt.png?resize=1024%2C228&ssl=1)

The code of the curve will look like this:

```plaintext
offset-path: shape(from Xa Y, curve to Xb Y with Xc Y1 / Xd Y1);
```

And the one of the line will look like this:

```plaintext
offset-path: shape(from Xa Y, curve to Xb Y with Xc Y / Xd Y);
```

Notice how we are only changing the coordinate of the control points while everything else remains static.

Now let’s identify the different values. Two things to consider when working with offset:

1. It’s defined on the child elements, but the reference box is the parent container.
2. By default, we consider the center of the element when placing it on the path.

![Illustration showing the word 'PORTFOLIO' with red arrows pointing to points A and B, indicating the horizontal center along a dashed red line.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/WSTDsr-l.png?resize=772%2C263&ssl=1)

The first letter should be at the beginning of the path, and the last one at the end, so A is at the center of the first letter and B at the center of the last one

```plaintext
Y = 50%
Xa = .5ch
Xb = 100% - Xa = 100% - .5ch
```

For C and D, we don’t have any particular rules to follow, so you can specify any value for the X coordinate. I will pick `30%` for `Xc`, and `Xd` will be `100% - Xc = 70%`. Feel free to adjust the values to test different variations of the curve.

Our path is now ready:

```plaintext
offset-path: shape(from .5ch 50%, curve to calc(100% - .5ch) 50% with 30% Y / 70% Y);
```

The `Y` value is our variable, and it will be either `50%` (same as A and B) or another value, let’s define it as `50% - H`. The bigger `H` will be, the more elasticity we will have.

Let’s try it:

<CodePen
  user="anon"
  slug-hash="GgqBaLW"
  title="First try"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s a mess! We didn’t define the `offset-distance`, which makes all the letters overlap.

::: note

Should we define a position for each letter? Nah, that’s too much work.

:::

We are obliged to define a different position for each letter, but the good thing is that we can do it with one formula using the `sibling-index()`and `sibling-count()` functions.

The first letter should be at `0%` and the last one at `100%`. We have N letters, which means we need a step equal to `100%/(N - 1)` to place all the letters from `0%` to `100%`, hence the following formula:

```plaintext
offset-distance: (100% \* i)/(N - 1)
```

Where `i` is 0-indexed.

Written in CSS, we get:

```css
offset-distance: calc(100%*(sibling-index() - 1)/(sibling-count() - 1))
```

<CodePen
  user="anon"
  slug-hash="emzjwOo"
  title="adding offset-distance"
  :default-tab="['css','result']"
  :theme="dark"/>

Almost perfect. All the letters are correctly placed except the last one. For some reason, the `0%` and `100%` value are the same. `offset-distance` is not limited to values between `0%` and `100%` but can take any value (including negative ones) and there is a modulo ting that creates a kind of loop. You can travel the entire path from `0%` to `100%`, and starting from `100%`, you return to the initial point, and you can repeat the same from `100%` to `200%`, and so on.

Well, it’s a bit strange and not intuitive, but the fix is simple: we change `100%` with `99.9%`. Hacky, but it works!

<CodePen
  user="anon"
  slug-hash="gbMjNpG"
  title="Fixing the position"
  :default-tab="['css','result']"
  :theme="dark"/>

Now the placement is perfect, and on hover, you can see how the straight line becomes a curve.

The last step is to add a transition, and we are done!

<CodePen
  user="anon"
  slug-hash="zxBLVvO"
  title="The full animation"
  :default-tab="['css','result']"
  :theme="dark"/>

Maybe not quite done, as the animation seems broken. It’s probably a bug (that I have filled [<VPIcon icon="fa-brands fa-chrome"/>here](https://issues.chromium.org/issues/482074624)), but it’s not a big deal because I was going to refactor the code to avoid writing the same shape twice and instead animate a variable.

```css :collapsed-lines
@property --_s {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}
ul li a {
  --h: 20px; /* control the effect */
 
  display: flex;
  font: bold 40px monospace;
  transition: --_s .3s;
}
ul li a:hover {
  --_s: 1;
}
ul li a span {
  offset-path: 
    shape(
      from .5ch 50%, curve to calc(100% - .5ch) 50% 
      with 30% calc(50% - var(--_s)*var(--h)) / 70% calc(50% - var(--_s)*var(--h))
    );
  offset-distance: calc(99.9%*(sibling-index() - 1)/(sibling-count() - 1));
}
```

Now you have the `--h` variable you can adjust the control the curvature of the path and another internal variable that we animate from 0 to 1 to move from a straight line to a curve.

<CodePen
  user="anon"
  slug-hash="LEZJpGN"
  title="The full animation fixed"
  :default-tab="['css','result']"
  :theme="dark"/>

Tada! The animation is now perfect! *But where is the elastic effect?*

To get the elastic effect, we need to update the easing and rely on `linear()`. That’s the simplest part because I am going to use a [<VPIcon icon="fas fa-globe"/>generator](https://linear-easing-generator.netlify.app/) to get the value.

Play with the config until you get what looks good to you. Here’s where I landed:

<CodePen
  user="anon"
  slug-hash="xbOawOG"
  title="Adding the elastic effect"
  :default-tab="['css','result']"
  :theme="dark"/>

Now it’s good, but it can be improved if we adjust the curve slightly. Right now, the “height” of the curve is the same for all the words, but it would be ideal to have it based on the length of the word. For this, I will include `sibling-count()`within the formula so that the height gets bigger when the word gets wider.

<CodePen
  user="anon"
  slug-hash="xbOjoKR"
  title="Elastic hover effect (Chrome only)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Making the effect direction-aware

Our effect is good, but while we’re here, let’s go the extra mile. Let’s upgrade it and make it direction-aware. The idea is to have either a bottom curvature or a top one based on the direction of the mouse.

We already have the top curve making the variable `--_s` equal to 1:

```css
ul li a:hover {
  --_s: 1;
}
```

If you change the value to `-1`, you get a bottom curve:

<CodePen
  user="anon"
  slug-hash="pvbObWB"
  title="The bottom curve"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, we need to combine both somehow. When hovering from the top, we should get the bottom curve `--_s: -1`, and when hovering from the bottom, we should get the top curve `--_s: 1`.

First, I will add a pseudo-element of the `li` that fills the upper half of the element and is placed above the link:

```css
ul li {
  position: relative;
}
ul li:after {
  content: "";
  position: absolute;
  inset: 0 0 50%;
  cursor: pointer;
}
```

<CodePen
  user="anon"
  slug-hash="vEKzKPd"
  title="Adding the pseudo-element"
  :default-tab="['css','result']"
  :theme="dark"/>

From there, we can define two different selectors. When we hover the pseudo-element, it means we are also hovering the `li` element, so we can use:

```css
ul li:hover a {
  --_s: -1;
}
```

When we hover the `a` element, we are also hovering the `li` element, so the above will also get triggered. but if we are hovering the pseudo-element, we are not hovering `a`, so we can use the following:

```css
ul li:has(a:hover) a {
  --_s: 1;
}
```

Are you a bit lost? Don’t worry, let’s place both selectors together and see what is happening:

```css
ul li:hover a {
  --_s: -1;
}
ul li:has(a:hover) a {
  --_s: 1;
}
```

We can either hover our element from the top (through the pseudo-element) or from the bottom (through the `a` element). The first case will trigger the first selector because we are also hovering `li`, BUT will not trigger the second one because the `li` “is not having its `a` hovered”. Now, when hovering the `a` element, both selectors will get triggered, and the last one will win.

We have our direction-aware feature!

<CodePen
  user="anon"
  slug-hash="NPrLRvW"
  title="Adding the direction-aware feature"
  :default-tab="['css','result']"
  :theme="dark"/>

It works, but it’s not as fluid as the demo I shared in the introduction. When the mouse moves the whole element, it abruptly stops one animation and triggers the other one.

To fix this, we can play with the size of the pseudo-element. When we hover it, we increase its size so it fills the entire element. This will prevent the second animation from getting triggered as we can no longer hover the `a` element below it. And when hovering the `a` element, we make the size of the pseudo-element equal to 0 hence we cannot hover it and trigger the first animation.

<CodePen
  user="anon"
  slug-hash="ogLPYdv"
  title="Better direction-aware"
  :default-tab="['css','result']"
  :theme="dark"/>

Much better! We make the pseudo-element transparent, and the illusion is perfect.

<CodePen
  user="anon"
  slug-hash="xbOzxyp"
  title="Direction-aware Elastic hover effect (Chrome only)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

I hope you enjoyed this fun CSS experiment. I will repeat it again: think twice before using it in your project. It was a great demo to explore some modern features such as `shape()`, `linear()`, `sibling-index()`, etc., but it’s not a good idea to break accessibility for such an effect.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a CSS-only Elastic Text Effect",
  "desc": "What can we say except BOINNNGGG BOINNGGGGGG. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-create-a-css-only-elastic-text-effect.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
