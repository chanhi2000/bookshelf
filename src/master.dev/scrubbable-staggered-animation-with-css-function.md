---
lang: en-US
title: "Scrubbable Staggered Animation with CSS @function"
description: "Article(s) > Scrubbable Staggered Animation with CSS @function"
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
      content: "Article(s) > Scrubbable Staggered Animation with CSS @function"
    - property: og:description
      content: "Scrubbable Staggered Animation with CSS @function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/scrubbable-staggered-animation-with-css-function.html
prev: /programming/css/articles/README.md
date: 2026-06-08
isOriginal: false
author:
  - name: Ashutosh Biswas
    url: https://master.dev/blog/author/ashutoshbiswas/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9759
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
  name="Scrubbable Staggered Animation with CSS @function"
  desc="Here's a brand new approach to creating staggered animations in CSS using a single progress value, allowing for smooth linkage to various inputs like scrolling. By utilizing a mathematical formula, it enhances control over animated elements without isolating their timelines, making animations more versatile and scrubbable."
  url="https://master.dev/blog/scrubbable-staggered-animation-with-css-function/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9759"/>

Everyone who has spent time creating staggered effects with CSS has reached for `animation-delay` or `transition-delay` at some point. Vary the delay slightly for each item, and you get that satisfying cascading effect. It works. But it’s not transferable. You can’t scrub through it, tie it to scroll, or link it to any external progress value. Each element lives in its own isolated timeline.

There’s a different way to think about staggered animation — not as a collection of independently timed objects, but as a single predictable, holistic effect driven by one progress value. You can then easily connect that progress value to an animation, scroll progress, or any other input to drive the staggering.

In this article, we will learn how this can be done using a mathematical formula, which I’ll call the *stagger formul*a. We’ll build it step by step, understand exactly how it works, and implement it in CSS using the new `@function` rule. Plus, have some fun.

::: note A Quick Note on Browser Support

Examples in this article use newer CSS features like `@function` rule and `if()`, `sibling-index()`, `sibling-count()` functions. These currently work best in the latest Chrome/Edge (as of May 2026), while support in Firefox and Safari is still limited or missing.

:::

---

## A Brief Intro to the Stagger Formula

Imagine $m$ as the animation progress of the staggered animation. It’s not the animation progress of an individual object. It’s the progress of the whole animation. And you can update $m$‘s value to drive the animation in a particular direction, somewhat like scrubbing the timeline in a video editor. You can link $m$ to `@keyframes`, transition, scroll-driven animations, or any other kind of motion. It opens up a lot of possibilities that are not possible with thinking in terms of individual objects separately.

The stagger formula makes it possible. You give it $m$ and a few more bits of data, it gives you back the animation progress of an individual object you are interested in. It looks like this:

$$
p_i=\text{clamp}\left(0,\:\text{lerp}\left(x+\tfrac{u}{k},y+\tfrac{v}{k},m\right)−\tfrac{i}{k},1\right)
$$

In the following CodePen, you can play with different parameters to get a feel for them.

<CodePen
  user="anon"
  slug-hash="PwbGEgj"
  title="Stagger Formula Visualized"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/bb6459e8-cf0b-4250-883e-68051732242e" />

Notice the objects with muted colors on both sides and how the staggered animation can exist there. Also note that there is no slider for ii. It comes from the individual objects and is shown below them.  The dashed-gray-bordered box highlights the elements that will animate as you move any slider.

It’s indeed a huge formula and can look intimidating, but it’s easier to understand than it may seem. We’ll build the formula later in this article. First, we need to understand how the animation actually works.

---

## How Our Staggered Animation Works

The kind of staggered animation we are going to achieve is different from traditional ones because we don’t include time in our considerations. We figure out the relationship of the progress of the objects we are animating. It’s important to understand this relationship first to understand the formula.

First, I want you to know a few terms and conventions that I’ll use throughout this article.

- **Animation order** is an integer associated with an object that defines when it starts animation relative to other objects. Objects with a higher animation order start later, while objects with the same animation order start simultaneously. Each object under a staggered animation has an animation order. In most cases, the indices of the objects(retrieved via `sibling-index()`) are exactly what we want as their animation orders.
- **Infinite ordered objects** is an infinite sequence of objects with animation orders from low to high (left to right), corresponding to the integers on the number line.

Our real objects are only a very small part of it. Although it is not possible to have truly infinite objects in a computer, they provide a robust mathematical foundation for running staggered animations and reasoning about the process. The stagger effect will most likely originate in these imaginary objects, pass through our real objects (the middle part in our demo), and continue into the imaginary objects on the other side.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/iKxLvBVg.gif?resize=1024%2C615&ssl=1)

Flow of stagger effect

We use the convention of representing **animation progress** from start to finish within the $[0,\:1]$ range, both for individual objects and for the staggered animation as a whole.

Alright! Now we are ready to start defining the staggered animation. Suppose we have a sequence of infinite ordered objects where:

- At any time, exactly $k4 consecutive objects are animating (i.e., changing their animation progress).
- These $k$ objects have decreasing progress from left to right, with a constant gap $d$, and all of their progress values increase at the same rate.
- All objects to the left of these $k$ objects have progress 11, and all objects to the right have progress $0$. Let the infinite ordered sequence of objects be:

$$
\cdots,\:O_{-3},\:O_{-2},\:O_{-1},\:O_0,\:O_1,\:O_2,\:O_3,\:\cdots
$$

Let us assume that the $k$ objects currently animating start at $O_1$. Then at start time $O_i$ with $i\le0$ have progress $1$, and all $O_i$ with $i>k$ have progress $0$. When $O_1$ reaches progress $1$, the progress of $O_1$ to $O_k$ objects look like:

| $O_1$ | $O_2$ | $O_3$ | … | $O_k$ |
| --- | --- | --- | --- | --- |
| $1$ | $1-d$ | $1-2d$ | … | $1-(k-1)d$ |

We assume all of these are in the valid animation progress range, that is, $[0,\:1]$.

::: note

This configuration is the maximal valid configuration under the constraints (constant gap and equal rate), because increasing all progresses further would push $O_1$ beyond $1$, which is not allowed.

:::

Currently, we do not know the progress gap between $O_k$ and $O_{k+1}$ (which has progress $0$). However, if this gap is $d$, we can shift our focus to the $k$ objects starting from $O_2$ and ending at $O_{k+1}$, because they will all have a gap of $d$ between their progress values.

::: note

Since $O_{k+1}=0$, this set of $k$ objects is already at its minimal valid configuration. Any decrease would push $O_{k+1}$ below $0$, which is not allowed.

:::

So we define $d$ to be equal to the gap between OkO_k and $O_{k+1}$, which is:

$$
d=\left(1–\left(k-1\right)d\right)–0
$$

We can now easily find dd‘s actual value:

$$
\begin{align*}
d&=1–kd+d\\
kd&=1\\
d&=\frac{1}{k}
\end{align*}
$$

Knowing the exact value of $d$ will later help us in building the stagger formula.

Thus, this new group can now evolve in the same way until $O_2$ reaches $1$, and the process repeats. This creates a staggered animation that propagates smoothly across the sequence.

---

## Building the Formula

Our foundation is now mathematically solid. We are ready to build the formula.

Let $i$ represent the animation order of the objects in *infinite ordered objects* sequence.

Let $p_i$ represent the animation progress of $i$th object. This is what we want to find out for a given $m$ (the overall staggered animation progress).

We know that the difference between the animation progress of any two adjacent objects in the currently animating $k$ objects is $\frac{1}{k}$. So let’s create a new sequence p’_i:

$$
\cdots,\:p’_{-2},\:p’_{-1},\:p’_{0},\:p’_{1},\:p’_{2},\:\cdots
$$

where $p’_{i + 1}–p’_i=\frac{1}{k}$. We can get that by multiplying $i$ by $\tfrac{1}{k}$:

$$
p’_{i}=\frac{i}{k}
$$

Which is:

$$
\cdots,\:\frac{-2}{k},\:\frac{-1}{k},\:\frac{0}{k},\:\frac{1}{k},\:\frac{2}{k},\:\cdots
$$

We have also seen that the objects in the currently animating $k$ objects are in descending order. Our pi′p’_i sequence is ascending. So let them descend in a new sequence pi′′p”_i by subtracting pi′p’_i from some unknown number $q$ which we will figure out soon:

$$
p”_i=q–p’_i
$$

::: note

This is simple trick that you can use to turn an ascending sequence to a descending sequence. For example let’s you have:

$$
1,2,3,4,5
$$

If you subtract each of the above number from $10$, you get:

$$
9,8,7,6,5
$$

Note that the numbers can be different from original set of numbers.

:::

Now, if we replace pi′p’_i with its value, we get

$$
p”_i=q–\frac{i}{k}
$$

So $p”_i$ looks like this for each of $i$th object in our infinite ordered objects:

\cdots,\:q-\frac{-2}{k},\:q-\frac{-1}{k},\:q-\frac{0}{k},\:q-\frac{1}{k},\:q-\frac{2}{k},\:\cdots

Note that the difference between two adjacent $p”_i$ is still $\tfrac{1}{k}$.

::: note

Can you see that somewhere among our infinitely ordered objects, there are progress values within the valid range $[0,1]$, each separated by a gap of $\frac{1}{k}$, in this sea of out of range animation progress values?

Let’s look at a concrete example with real values. Let $k=3$ and $q=1$. Then a subset of the values of $p”_i$ become:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/ex2g0RZ1.jpeg?resize=894%2C1024&ssl=1)

> A table highlighting $p”_i$ values that intersect with $p_i$ values

We can see that the progress values within the $[0,1]$ range start at $i=0$ and end at $i=3$. We can also see that objects to the left of this range have $p”_i>1$, while objects to the right have $p”_i<0$. We can eliminate this issue using `clamp()` to flatten the values on each of these two sides to $1$ and $0$ respectively.

:::

To figure out $q$ we need to know to exactly where to start and end our animation. Let’s introduce some more variables for pointing these positions:

- $u$: The animation order of an object where the staggering animation starts.
  - $x$: The animation progress of uuth object at that time.
- $v$: The animation order of an object where the staggering animation ends.
  - $y$: The animation progress of vvth object at that time.

Now, when $m=0$, the following must hold:

$$
p”_u=x
$$

Now we can easily figure out $q$ by replacing $p”_u$ with its value:

$$
\begin{align*}
q–\frac{u}{k}&=x\\
q&=x+\frac{u}{k}\\
\end{align*}
$$

Similarly when $m=1$, $q=y+\frac{v}{k}$ because $p”_v=y$.

::: note

Now for $[0,1]$ range of the $m$, the range of $q$ becomes $\left[x+\frac{u}{k},y+\frac{v}{k}\right]$. We need to do a linear mapping from one range of values to the other so that their ends match together.

:::

We can easily find the value for $q$ for any value of $m$ in its range using the linear interpolation function $\text{lerp}()$:

$$
q=\text{lerp}(x+\frac{u}{k},\:y+\frac{v}{k},\:m)
$$

We will later define $\text{lerp()}$ using the CSS `@function` rule. What it does can be visualized like this: it uniformly stretches or squeezes the $0$ to 11 scale of $m$ onto another scale whose lower bound is $x+\tfrac{u}{k}$ and upper bound is $y+\tfrac{v}{k}$ so that the two scales align. It then returns the corresponding value of $m$ on the other scale.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/lgeyz2RN.jpeg?resize=1024%2C668&ssl=1)

How $q$ is found using $\text{lerp()}$

So for any $m$ in its range, $p”_i$ becomes

$$
kp”_i=\text{lerp}(x+\frac{u}{k},\:y+\frac{v}{k},\:m)–\frac{i}{k}
$$

But since we do not want the out of range animation progress values on either side, we will apply $\text{clamp}()$ (the same [<VPIcon icon="fa-brands fa-firefox"/>`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp) function from CSS) to the $p”_i$ values and obtain our final formula!

$$
p_i=\text{clamp}(0,\:\text{lerp}(x+\frac{u}{k},\:y+\frac{v}{k},\:m)–\frac{i}{k},\:1)
$$

---

## Finally, it’s Time to Animate with CSS

By now, you not only know the stagger formula, but also have a deep understanding of how it works. We can easily port it to CSS in a reusable way using the awesome new `@function` feature:

```css
@function --stagger(
  --m,
  --k: 5,
  --i: sibling-index(),
  --u: 1,
  --x: 0,
  --v: sibling-count(),
  --y: 1
) {
  --q1: calc(var(--x) + var(--u) / var(--k));
  --q2: calc(var(--y) + var(--v) / var(--k));
  result: clamp(
    0,
    --lerp(var(--q1), var(--q2), var(--m)) - var(--i) / var(--k),
    1
  );
}
```

Note that we can use function calls for default values. These functions will be evaluated when `--stagger()` is called.

Implementing `--lerp()` is easy. For our purposes, we can define it like below:

```css
@function --lerp(--a, --b, --x) {
  result: calc(var(--a) + (var(--b) - var(--a)) * var(--x));
}
```

Above, we assume `--x` is in $[0,1]$ range.

Now we can animate a custom property `--m` to scrub our animation in an automated way:

```css
@property --m {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@keyframes stagger-frames {
  to {
    --m: 1;
  }
}

.parent {
  animation: stagger-frames 2s linear alternate infinite;
}

.child {
  --p: --stagger(
    var(--m),
    var(--k),
    sibling-index(),
    var(--u),
    var(--x),
    var(--v),
    var(--y)
  );
  height: calc(var(--p) * 100%);
}
```

Note that we also set `--k`, `--u`, `--x`, `--v`, and `--y` without declaring them in CSS. We do this so we can define them on the parent `<div>` via [<VPIcon icon="fas fa-globe"/>slideVars](https://codepen.github.io/slideVars/) and easily experiment with their values.

<CodePen
  user="anon"
  slug-hash="LEbReWo"
  title="Plain Staggered Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/5ba52306-19d4-4a11-85dd-5657ff5520f3" />

It’s working, but it feels a bit mechanical. To add more life to the animation, we can apply an easing function on top of `--p`. Unfortunately, we can’t use easing keywords or `cubic-bezier()` or `linear()` functions here. We are left on our own to create easing functions. I’m not sure if it’s possible to implement `cubic-bezier()` or `linear()` using `@function`. But we can recreate the ones from [<VPIcon icon="fas fa-globe"/>easings.net](https://easings.net/). For example, here is the CSS version of *easeInOutQuad* using `@function` and `if()`:

```css
@function --easeInOutQuad(--x <number>) returns <number> {
  result: if(
    style(--x: max(var(--x), 0.5)): calc(1 - (pow(-2 * var(--x) + 2, 2) / 2));
    else: calc(2 * var(--x) * var(--x));
  );
}
```

Note the type of `--x` is needed here for `if()` to work correctly. While it works fine without specifying the return type, I’m writing it out because we’re in the process of specifying types. Also note the clever use of `max`. It’s not yet possible to use comparison operators there. Here is a comparison with and without this easing function:

```css
.child {
  --p: --stagger(
    var(--m),
    var(--k),
    sibling-index(),
    var(--u),
    var(--x),
    var(--v),
    var(--y)
  );
}

.parent.one .child {
  height: calc(var(--p) * 100%);
}

.parent.two .child {
  height: calc(--easeInOutQuad(var(--p)) * 100%);
}
```

<CodePen
  user="anon"
  slug-hash="XJNjVey"
  title="Staggered Animation with easeInOutQuad"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/7379672f-c097-4c31-a0c2-b8b5e82152d4" />

You can even take it further by applying a non-linear `animation-timing-function` to the entire animation. For example, using `steps()` lets you create a stop-motion effect:

```css
.parent.three {
  animation: stagger-frames 2s steps(15, jump-none) alternate infinite;
}

.child {
  --p: --stagger(
    var(--m),
    var(--k),
    sibling-index(),
    var(--u),
    var(--x),
    var(--v),
    var(--y)
  );
}

.parent.one .child {
  height: calc(var(--p) * 100%);
}

.parent.two .child,
.parent.three .child {
  height: calc(--easeInOutQuad(var(--p)) * 100%);
}
```

<CodePen
  user="anon"
  slug-hash="ByQLJJW"
  title="Stepped Staggered Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/d700cb76-78cc-4294-970b-948ef854a16c" />

With the following function, we can tweak the output of `--stagger()` or even `--easeInOutQuad()` to create a smooth bump (I found it with the help of AI. AI can be really helpful in figuring out such functions):

```css
@function --smoothBump(--x <number>) returns <number> {
  result: calc((1 - cos(2 * pi * var(--x))) / 2);
}

.parent.four .child {
  height: calc(--smoothBump(--easeInOutQuad(var(--p))) * 100%);
}
```

<CodePen
  user="anon"
  slug-hash="wBozpme"
  title="Staggered Animation with Smooth Bump"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/4444adf2-6b62-4503-b256-cedcbff0e9fd" />

For some more fun, let’s connect our animation to scroll. It’s now easier than ever. With just two lines of code, you can link the animation directly to the user’s scroll position.

```css
.parent {
  animation: stagger-frames;
  animation-timeline: scroll();
}

.parent.three {
  animation: stagger-frames steps(15, jump-none);
  animation-timeline: scroll();
}
```

<CodePen
  user="anon"
  slug-hash="azBmEjr"
  title="Scroll Driven Staggered Animation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/d681122b-8724-4350-98e4-1c73b0394e94" />

---

Let’s finish with a more interesting example. If you scroll all the way down this page, you’ll see a cool animation of a number appearing that represents the donation amount from Frontend Masters to open source projects.

<VidStack src="https://videopress.com/322f698e-2b37-4741-b260-b0c9b597d7c5" />

This is one of those ideal scenarios where the stagger formula shines. It allows you to make effects like below:

<CodePen
  user="anon"
  slug-hash="KwNQpBY"
  title="Frontend Masters donation animation rework"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<VidStack src="https://videopress.com/d5c25c24-3940-4428-ae2d-9136a0fff41d" />

---

## Conclusion

That’s it for this article. By taking time out of the equation and thinking in terms of progress-value relationships, we made scrubbable staggered animation possible. I found this core idea in a [<VPIcon icon="fa-brands fa-youtube"/>Blender tutorial](https://youtu.be/CrsAfgfmgzY) and fell in love with the technique. Thanks to Filip, the creator of the tutorial. Finally thanks to CSS `@function` and modern CSS features for making it happen painlessly on the web without any JavaScript.

I’d love to see what you’ll build with it. If you make something, share it in the comments below.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scrubbable Staggered Animation with CSS @function",
  "desc": "Here's a brand new approach to creating staggered animations in CSS using a single progress value, allowing for smooth linkage to various inputs like scrolling. By utilizing a mathematical formula, it enhances control over animated elements without isolating their timelines, making animations more versatile and scrubbable.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/scrubbable-staggered-animation-with-css-function.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
