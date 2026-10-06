---
lang: en-US
title: "How to Control Infinite CSS Animations (Part 2 of 2)"
description: "Article(s) > How to Control Infinite CSS Animations (Part 2 of 2)"
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
      content: "Article(s) > How to Control Infinite CSS Animations (Part 2 of 2)"
    - property: og:description
      content: "How to Control Infinite CSS Animations (Part 2 of 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-control-infinite-css-animations-part-2-of-2.html
prev: /programming/css/articles/README.md
date: 2026-05-15
isOriginal: false
author:
  - name: Temani Afif
    url: https://blog.master.dev/author/temaniafif/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9604
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
  name="How to Control Infinite CSS Animations (Part 2 of 2)"
  desc="This time we get into very smooth starts and stops for infinite animations using CSS. One of the tricks is layering on a transition on top of an animation."
  url="https://blog.master.dev/how-to-control-infinite-css-animations-part-2-of-2/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9604"/>

Time for part 2! This time, we will see how to start/stop infinite animations *smoothly*. The goal is to make the effect look natural and realistic. As in the previous article, we will study the effects using rotation and then explore additional examples.

::: info Article Series

```component VPCard
{
  "title": "How to Control Infinite CSS Animations (Part 1 of 2)",
  "desc": "Something like manipulating the speed of an animation isn't a big deal, but it's harder when the animation is *already running*. We got tricks. ",
  "link": "/blog.master.dev/how-to-control-infinite-css-animations-part-1-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "How to Control Infinite CSS Animations (Part 2 of 2)",
  "desc": "This time we get into very smooth starts and stops for infinite animations using CSS. One of the tricks is layering on a transition on top of an animation.",
  "link": "/blog.master.dev/how-to-control-infinite-css-animations-part-2-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## Smooth Starts

Hover the element in the demo below:

<CodePen
  user="anon"
  slug-hash="JjVNXxY"
  title="Smoothly start the rotation on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

The element starts rotating slowly, then reaches a constant speed. And when you unhover, it will slowly stop as well. Cool, right? It’s even more satisfying if you keep hovering/un-hovering.

That effect is made possible like this:

```css
.box {
  animation: rotate 2s linear infinite paused;
  transition: transform 1s ease-out;
}
.box:hover {
  animation-play-state: running;
  transform: rotate(-.2turn);
}
@keyframes rotate {
  to { rotate: 1turn; }
}
```

I am still using the same technique I used in the first article, where I consider two rotations with an additive effect, but this time, we don’t have two animations. We have an animation and a transition.

On hover, two things happen at the same time:

1. The infinite linear animation starts to play (it’s paused initially): The element rotates from `0turn` to `1turn` with a duration of 2s
2. A transition is triggered: The element rotates from `0turn` to `-.2turn` with a duration of `1s`.

During the first second, the transition will rotate the element in the opposite direction, creating a “brake” effect on the first animation. After that, the linear behavior of the first animation takes the lead, and we get a rotation at constant speed.

When you unhover, the animation pauses and the transition is triggered in the opposite direction, rotating the element from `-.2turn` to `0turn`. This gives us a smooth stop.

Choosing the right values is very important for the illusion to work. If the transition is too fast or too slow compared to the animation, the effect will be bad. Even the easing is crucial to have a realistic effect.

Here are a few bad examples:

<CodePen
  link="https://codepen.io/t_afif/pen/xbRGKov/4d24cb9ef8d17634f13a3a2a30331fae"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I don’t have a formula to share for this effect because I simply did some trial & error. It was quite easy to find values that performed well.

The same code can be adjusted slightly to have the animation running initially and smoothly stop it on hover:

```css
.box {
  animation: rotate 2s linear infinite paused;
  transition: transform 1s ease-out;
}
.box:not(:hover) {
  animation-play-state: running;
  transform: rotate(-.2turn);
}
@keyframes rotate {
  to { rotate: 1turn; }
}
```

I simply changed `:hover` with `:not(:hover)`!

<CodePen
  user="anon"
  slug-hash="qEqdBEE"
  title="Smooth stop on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

You can also write it this way:

```css
.box {
  animation: rotate 2s linear infinite;
  transition: transform 1s ease-out;
}
.box:hover {
  animation-play-state: paused;
  transform: rotate(.2turn);
}
@keyframes rotate {
  to { rotate: 1turn; }
}
```

We start with the animation running, then pause it on hover. We also remove the negative sign from the rotation used with the transition.

<CodePen
  user="anon"
  slug-hash="XWQMPqY"
  title="Smoothly stop the rotation on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More Examples

The main trick relies on the fact that we can express rotation using two different properties (transform and rotate), but this won’t be possible for other properties because, as far as I know, only rotate and translate can be defined using two different properties.

That said, we can still find other alternatives to achieve the same effect. Here is an example using [**the infinite marquee animation**](/blog.master.dev/infinite-marquee-animation-using-modern-css.md). Hover to start the animation

<CodePen
  link="https://codepen.io/t_afif/pen/LEbVPNq/e493e4cb959447c1d7c942a965f7c201"
  title="Smooth start infinite marqee"
  :default-tab="['css','result']"
  :theme="dark"/>

The main animation uses `offset-distance` to move the elements from left to right, and to have the opposite movement, I used a negative `translate`.

```css
img {
  animation: 
    x linear infinite var(--d) 
    calc(-1*sibling-index()*var(--d)/sibling-count()) paused;
  transition: translate .8s ease-out;
}
.container:hover img {
  animation-play-state: running;
  translate: -50px;
}
@keyframes x { 
  to { offset-distance: 100%; }
}
```

Let’s take the example of the glowing border:

<CodePen
  user="anon"
  slug-hash="raWVxbG"
  title="Glowing border effect on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

For this one, I am using CSS variables:

```css
img {
  mask: 
    conic-gradient(#000 0 0) content-box,
    linear-gradient(calc(45deg + var(--a) + var(--b)), 
      #0000 30%,#000 40% 60%,#0000 70%) subtract,
    conic-gradient(#000 0 0) padding-box;
  
  animation: rotation 2s linear infinite paused;
  transition: --b .8s ease-out;
}
img:hover {
  animation-play-state: running;
  --b: -.2turn;
}
@keyframes rotation {
  to {--a: 1turn}
}
```

The angle of the gradient is defined as the sum of two variables `--a` and `--b`. The first variable will have the linear infinite animation, and the second variable will have the transition effect. Since I am adding them, I get the “additive effect”!

This code can be considered generic because any value can be expressed as a sum of two variables, and as long as you register both variables using `@property`, you can animate them.

Here is the initial code written using variables:

```css
.box {
  rotate: calc(var(--a) + var(--b));
  animation: rotate 2s linear infinite paused;
  transition: --b 1s ease-out;
}
.box:hover {
  animation-play-state: running;
  --b: -.2turn;
}
@keyframes rotate {
  to { --a: 1turn; }
}
```

And it works the same way:

<CodePen
  link="https://codepen.io/t_afif/pen/LEbVGwg/6122620ba936a6a9631f2247ed81f36a"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

In this case, I would use the first version as it is less verbose, but if you are unable to express a movement and its opposite using properties, you can rely on CSS variables, which work in all cases.

---

## Stop There!

We can control the speed of infinite animations and smooth out their stopping and starting, but what about controlling the stop position? It would be interesting to hover an infinite animation and smoothly stop it at the same position.

A demo worth a thousand words:

<CodePen
  user="anon"
  slug-hash="bNBdpee"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

On hover, the element will always return to the same position. And when you unhover, the animation runs again.

For this effect, I am going to ditch animations and keyframes and rely on something else. I will define [**an infinite animation using `@starting-style`**](/css-tip.com/animation-without-keyframes.md).

```css
@property --a {
  syntax: "<angle>";
  inherits: false;
  initial-value: -100turn; 
}
.box {
  rotate: var(--a);
  transition: --a 200s linear;
  @starting-style {
    --a: 0turn;
  }
}
```

The code looks strange, but the logic is pretty simple. I am registering the variable `--a` with an initial value equal to `-100turn`. The `@starting-style` block will define a “starting” value equal to `0turn`. This means that on page load, the element will “start” with a value equal to `0turn` that updates to the value `-100turn` and since we are applying a transition, we get a smooth change.

The use of large values creates the illusion of an infinite animation. The value will animate from `0turn` to `-100turn` in `200s` which is equivalent to 1 turn every 2 seconds for more than 3 minutes. You can go even bigger if 3 minutes aren’t enough.

<CodePen
  user="anon"
  slug-hash="zxoGWrX"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, we introduce a new variable and update the code as follows:

```css
@property --a {
  syntax: "<angle>";
  inherits: false;
  initial-value: -100turn; 
}
@property --i {
  syntax: "<number>";
  inherits: false;
  initial-value: 1; 
}
.box {
  rotate: calc(mod(var(--a),1turn)*var(--i));
  transition: --i 0s,--a 200s linear;
  @starting-style {
    --a: 0turn;
  }
}
.box:hover {
  --i: 0;
  --a: 0turn;
  transition: --i .8s ease-out,--a 0s .8s;
}
```

The rotation formula is very important. I am using `mod()`to make sure the value gets clamped to the range `[0 1turn]` then I multiply that value by the variable `--i` which is set to `1` initially.

Until now, we still have our infinite rotation. The only change is the `rotate` value, but it won’t affect the visual result. Instead of going from `0turn` to `-100turn`, we will go from `0turn` to `1turn` 100 times.

Now let’s see what happens on hover. Let’s suppose our element is at `.3turn` when we hover it. The transition on hover will update the value of `--i` with a duration equal to `.8s` and the value of `--a` instantly after a delay equal to `.8s`. In other words, we first update the value of `--i` to make it equal to `0` then we update the value of `--a` to make it `0` as well.

The first update of `--i` will make the rotation value equal to `0turn` hence we get a transition from `.3turn` to `0turn`; the element is back to its initial position! Updating the value of `--a` will do nothing; it will be useful when you unhover.

When you unhover, the value of `--i` updates instantly from `0` to `1`. Nothing will happen since `--a` is still equal to `0`, which means the rotation is equal to `0` as well. Then, the transition of `--a` is triggered, moving it from `0turn` to `-100turn`. We restart the “infinite” animation.

Do you get the trick? On hover, the variable `--i` will force the element to return to its initial position regardless of the actual rotation, and when you unhover, the animation starts again because we have set `--a` equal to 0, triggering the transition that simulates the infinite rotation.

You can also adjust the modulo based on your use case. We used `1turn` since the element needs to make `1turn` to get back to the initial position, but we can have more examples with different moduli.

<CodePen
  user="anon"
  slug-hash="NPbGvaJ"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

And what about the opposite effect? You activate the animation on hover, and when you unhover, the element gets back to its initial position.

<CodePen
  user="anon"
  slug-hash="yyVNEOb"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is the relevant code:

```css
@property --a {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0turn; 
}
@property --i {
  syntax: "<number>";
  inherits: false;
  initial-value: 0; 
}
.box {
  rotate: calc(mod(var(--a),1turn)*var(--i));
  transition: --i .5s ease-out,--a 0s .5s;
}
.box:hover {
  --i: 1;
  --a: 10turn;
  transition: --i 0s,--a 10s linear;
}
```

Try to dissect the code as homework. Compare it with the previous implementation, and you will notice that I mainly switched a few values. We also don’t need to rely on `@starting-style` since we don’t need the infinite animation to run on page load.

Here is the effect applied to the glowing border:

<CodePen
  user="anon"
  slug-hash="dPbomxP"
  title="Glowing border animation on hover with a smooth stop"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Follow the Shortest Path!

Ready for a last effect? This time, when you unhover, the element will follow the shortest path to get back to the initial position.

<CodePen
  user="anon"
  slug-hash="EaNjpyB"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

The direction of the rotation will be different depending on the current position of the element when you un-hover.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/s_C6AA43C3C1B478B9638AC2829B138248E95A7DEAE36E24FA8C99B3A572BF120C_1778024165331_image.png?resize=769%2C299&ssl=1)

To achieve this effect, we update the rotation formula from this:

```css
rotate: calc(mod(var(--a),1turn)*var(--i));
```

to this:

```css
rotate: calc((mod(var(--a),1turn) - (1 + sign(mod(var(--a),1turn) - .5turn))*.5turn)*var(--i));
```

If we omit the multiplication with the variable `--i`, here is the new addition to the formula:

```plaintext
(1 + sign(mod(var(--a),1turn) - .5turn))*.5turn
```

The `mod()` function gives us a value in the range `[0turn 1turn]` and the goal is to get back to `0turn` on hover following the shortest path. To follow the shortest path, we have only two options: clockwise and counterclockwise.

Two options mean that we have two different ranges of values: `[0turn .5turn]` and `[.5turn 1turn]`. To make it easy to understand, let’s pick one value of each range and apply the formula.

For `--a: .3turn` we get:

```css
rotate: calc((.3turn - (1 + sign(.3turn - .5turn))*.5turn)*var(--i));
rotate: calc((.3turn - (1 + sign(-.2turn))*.5turn)*var(--i));
rotate: calc((.3turn - (1 + -1)*.5turn)*var(--i));
rotate: calc(.3turn*var(--i));
```

When `--i` is set to 0, we get a transition from `.3turn` to `0turn`.

For `--a: .7turn` we get:

```css
rotate: calc((.7turn - (1 + sign(.7turn - .5turn))*.5turn)*var(--i));
rotate: calc((.7turn - (1 + sign(.2turn))*.5turn)*var(--i));
rotate: calc((.7turn - (1 + 1)*.5turn)*var(--i));
rotate: calc((.7turn - 1turn)*var(--i));
rotate: calc(-.3turn*var(--i));
```

When `--i` is set to 0, we get a transition from `-.3turn` to `0turn`.

::: note

But the angle is no longer the same. How does it work?

:::

It’s actually the same angle! `-.3turn` is equivalent to `.7turn` since the difference between them is `1turn`. Instead of having a transition from `.7turn` to `0turn`, which is the long path. I transform it to another angle closer to `0turn` and in this case it’s `-.3turn`. That negative sign is what makes the element rotate in the opposite direction.

The formula looks a bit complex, but at the end it will subtract `1turn` from all the angles in the range `[.5turn 1turn]` to place them in the range `[-.5turn 0turn]`, which is closer to `0turn`. The range `[0turn .5turn]` is not affected.

This last example is probably overkill, but it’s still a cool effect to implement with some modern CSS features. At the end, you don’t need to bother yourself with the formula. All you have to do is adjust the modulo variable to suit your use case.

```css
.box {
  --t: 1turn; /* control the modulo */
  --d: .5s;   /* the transition */
  
  rotate: calc((mod(var(--a),var(--t)) - (1 + sign(mod(var(--a),var(--t)) - var(--t)/2))*var(--t)/2)*var(--i));
  transition: --i var(--d) ease-out,--a 0s var(--d);
}
.box:hover {
  --i: 1;
  --a: 10turn;
  transition: --i 0s,--a 10s linear;
}
```

<CodePen
  user="anon"
  slug-hash="emBNMjq"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

And here is the effect applied to the glowing border:

<CodePen
  user="anon"
  slug-hash="YPKXoEo"
  title="Glowing border animation on hover with a smooth stop II"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

That’s all for this second part. Now you have a lot of handy CSS tricks to control infinite animations. You probably won’t use them all, but it was a good opportunity to study some cool features, such as `animation-composition`, `@starting-style`, and many math functions.

I leave you with a last demo to study. On hover, an infinite animation starts. On click, it gets faster. On unhover, the element snaps back to its initial position following the shortest path:

<CodePen
  user="anon"
  slug-hash="azoVpzN"
  title="Hover to rotate, click to accelerate, unhover for a smooth stop!"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Article Series

```component VPCard
{
  "title": "How to Control Infinite CSS Animations (Part 1 of 2)",
  "desc": "Something like manipulating the speed of an animation isn't a big deal, but it's harder when the animation is *already running*. We got tricks. ",
  "link": "/blog.master.dev/how-to-control-infinite-css-animations-part-1-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "How to Control Infinite CSS Animations (Part 2 of 2)",
  "desc": "This time we get into very smooth starts and stops for infinite animations using CSS. One of the tricks is layering on a transition on top of an animation.",
  "link": "/blog.master.dev/how-to-control-infinite-css-animations-part-2-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Control Infinite CSS Animations (Part 2 of 2)",
  "desc": "This time we get into very smooth starts and stops for infinite animations using CSS. One of the tricks is layering on a transition on top of an animation.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/how-to-control-infinite-css-animations-part-2-of-2.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
