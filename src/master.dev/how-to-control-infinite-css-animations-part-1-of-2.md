---
lang: en-US
title: "How to Control Infinite CSS Animations (Part 1 of 2)"
description: "Article(s) > How to Control Infinite CSS Animations (Part 1 of 2)"
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
      content: "Article(s) > How to Control Infinite CSS Animations (Part 1 of 2)"
    - property: og:description
      content: "How to Control Infinite CSS Animations (Part 1 of 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/how-to-control-infinite-css-animations-part-1-of-2.html
prev: /programming/css/articles/README.md
date: 2026-05-08
isOriginal: false
author:
  - name: Temani Afif
    url: https://master.dev/blog/author/temaniafif/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9584
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
  name="How to Control Infinite CSS Animations (Part 1 of 2)"
  desc="Something like manipulating the speed of an animation isn't a big deal, but it's harder when the animation is *already running*. We got tricks. "
  url="https://master.dev/blog/how-to-control-infinite-css-animations-part-1-of-2/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9584"/>

Applying an infinite animation to an element is a simple task. For example, to make an element rotate indefinitely, you add the code below, and it’s done.

```css
.box {
  animation: rotate 5s infinite linear;
}
@keyframes rotate {
  to { rotate: 1turn; }
}
```

Now, what if I ask you to *interact* with that rotation? Accelerate it, slow it down, stop it smoothly, etc. It would be tricky, right? The only thing we can easily do is to pause the animation using:

```css
animation-play-state: paused;
```

In this series of articles, we will learn much more than just how to pause an infinite animation.

Let’s jump straight into the first example.

---

## More Speed!

Consider the following code:

```css{5,8}
.box {
  animation: 
   rotate 5s linear infinite,
   rotate 5s linear infinite paused;
  animation-composition: add;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotate {
  to { rotate: 1turn; }
}
```

I am defining the same animation twice, with the second one paused. On hover, both are running, resulting in faster rotation!

<CodePen
  user="anon"
  slug-hash="ZEZLRXd"
  title="Accelerate a rotation on hover"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? This trick was made possible using `animation-composition: add`. A quick look at [<VPIcon icon="fa-brands fa-firefox"/>the MDN page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-composition) explains everything:

> The `animation-composition` CSS property specifies the composite operation to use when multiple animations affect the same property simultaneously.

Then

> `add`
> 
> The effect value builds on the underlying value of the property. This operation produces an additive effect

We are applying the same animation twice, so they add up. Initially, only one rotation runs, and on hover, the second starts, making the overall rotation faster.

The result is similar to dividing the duration by 2.  `animation: rotate 2.5s linear infinite;
```

Or, multiplying the rotation by 2.  `@keyframes rotate {
  to { rotate: 2turn; }
}
```

In the demo below, if you hover the first box, it will have the same speed as the second box (where I am using a duration equal to `2.5s`) and the third box (where I am using `rotate: 2turn`).

<CodePen
  link="https://codepen.io/t_afif/pen/XJNJaBz/ce301a5550a31d4aa61e49370a044828"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Now the question is: Why not simply adjust the duration on hover?

```css
.box {
  animation: rotate 5s linear infinite;
}
.box:hover {
  animation-duration: 2.5s;
}
@keyframes rotate {
  to { rotate: 1turn; }
}
```

Simple, and no need to duplicate the animation or use `animation-composition`.

<CodePen
  link="https://codepen.io/t_afif/pen/WbobEaw/d8052fd6a62b56d2c5ec41b63f0d46c9"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Well, it doesn’t work. The rotation is indeed faster on hover, but the element “jumps” to a random position before it accelerates. You will get a similar behavior if you keep the same duration and update the keyframes.

<CodePen
  link="https://codepen.io/t_afif/pen/xbRGqZq/77241b662d2a29186c3844a7e1c90fde"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

No need to waste time explaining why it behaves that way, but it’s by design. Keep in mind that messing with the animation values when it’s running is never a good idea. For this reason, we are here to learn a few tricks to avoid those strange behaviors.

---

## Controlling the Speed

Now, let’s update the code and make it more flexible:

```css
.box {
  --d: 5s; /* animation duration */
  --s: 2;  /* speed factor */
  
  --_a: rotation linear infinite;
  animation: 
    var(--_a) var(--d),
    var(--_a) calc(var(--d)/(var(--s) - 1)) paused;
  animation-composition: add;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotation {
  to {rotate: 1turn}
}
```

We make the duration and the speed factor CSS variables to easily control the animation. A speed factor of `1` means there is no acceleration (the duration of the second animation will be equal to 0). A higher value will cause acceleration; the higher the value, the faster the element will be.

The speed factor is given by the following formula. It’s a multiplier for the initial speed.

```plaintext
speed_on_hover = var(--s) \* initial_speed
```

By simply changing one variable, you get a different speed on hover without touching the CSS code:

```html
<div class="box" style="--s: 1"></div> <!-- no acceleration -->
<div class="box" style="--s: 2"></div> <!-- 2 times faster -->
<div class="box" style="--s: 8"></div> <!-- 8 times faster !! -->
```

<CodePen
  link="https://codepen.io/t_afif/pen/raWazgJ/0c69147c6ac17fe4f532fa877c182704"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Slow Down!

To decelerate, we use the same technique, but the second rotation needs to play in reverse. Running two rotations in the same direction will always make the overall rotation faster, but running a second rotation in the opposite direction will make it slower!

```css
.box {
  --d: 5s; /* animation duration */
  --s: .5; /* speed factor */
  
  --_a: rotation linear infinite;
  animation: 
    var(--_a) var(--d),
    var(--_a) calc(var(--d)/(1 - var(--s))) paused reverse;
  animation-composition: add;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotation {
  to { rotate: 1turn; }
}
```

I added `reverse` to the second animation, and the formula is the negation of the previous one. Following the same logic, using 1 as a speed factor will do nothing, and a smaller speed factor will reduce the speed, so we are still following the same formula:

speed_on_hover = var(--s) \* initial_speed

This also means we can stop the animation by setting the speed factor to 0.

```html
<div class="box" style="--s: 1"></div> <!-- nothing will happen -->
<div class="box" style="--s: .5"></div> <!-- 2 times slower -->
<div class="box" style="--s: 0"></div> <!-- stop the animation -->
```

<CodePen
  link="https://codepen.io/t_afif/pen/VYmYMeJ/be79f554e1e01437686162f4de3da5f6"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

The first code uses a speed factor in the range `[1 +infinity[` to accelerate, while the second code uses a speed factor in the range `[0 1]` to decelerate.

---

## What about negative values?

When adding two rotations that move in opposite directions, the final direction will be the one of the faster rotation. If we use values in the range `[0 1]`, the first rotation is always faster than the second, so we get a deceleration while keeping the same direction.

If we use negative values, the second rotation is faster than the first one, and the direction changes. This also explains why 0 stops the elements; both rotations will have the same duration (same speed) and will negate each other (no more movement).

```html
<div class="box" style="--s: -.5"></div>
<div class="box" style="--s: -1"></div>
<div class="box" style="--s: -4"></div>
```

<CodePen
  link="https://codepen.io/t_afif/pen/KwNwXQQ/ef28423d60b9a27743162131d7df1350"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Not only are the three boxes moving in opposite directions, but they also have different speeds. The speed factor still follows the same formula.

```plaintext
speed_on_hover = var(--s) \* initial_speed
```

Using `-1` means the same initial speed in reverse. `-4` means four times the initial speed in reverse, and so on. The absolute value controls the speed, and the sign controls the direction!

---

## The Generic Code

Let’s sum up what we have until now. Both codes have everything in common except the duration of the second animation and the `reverse` keyword.

For the first code, we have the following duration:

```css
calc(var(--d)/(var(--s) - 1))
```

Where `--s` is a value in the range `[1 +infinity[`.

And for the second code, we have

```css
calc(var(--d)/(1 - var(--s)))
```

Where `--s` is a value in the range `]-infinity 1]`.

It would be good if we could merge the two codes into a single generic one where the `--s` variable can take any value.

The second duration can also be written as follows:

```css
calc(-1*var(--d)/(var(--s) - 1))
```

That negative sign is needed because the value `var(--s) - 1` is negative, and the duration needs to be a positive value. But instead of using that negative sign, we can rely on the absolute value using `abs()`:

```css
abs(var(--d)/(var(--s) - 1))
```

If the value of `--s` is bigger than one, we get a positive value and `abs()` will do nothing (that’s the first code), and if `--s` is smaller than one, we get a negative value and `abs()` will transform it into a positive value (that’s the second code).

We have our generic code that can handle all the values of `--s` (acceleration, deceleration, stop, moving in the opposite direction)

```css
.box {
  --d: 5s; /* animation duration */
  --s: 2; /* speed factor */
  
  --_a: rotation linear infinite;
  animation: 
    var(--_a) var(--d),
    var(--_a) abs(var(--d)/(var(--s) - 1)) paused;
  animation-composition: add;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotation {
  to {rotate: 1turn}
}
```

Wait, you forgot about the `reverse` keywords!

I won’t rely on it! Instead of using `reverse`, I will “reverse” the angle of rotation inside the animation. For this, I will use the `sign()` function like below:

```css
@keyframes rotation {
  to {rotate: calc(sign(var(--s) - 1)*1turn)}
}
```

When `--s` is bigger than 1, the sign is positive (same direction), and when `--s` is smaller than 1, the sign is negative (reverse direction). The only drawback is that I need to define a new animation since the initial one must remain the same.

```css
.box {
  --d: 5s; /* animation duration */
  --s: 2;  /* speed factor */
  
  animation: 
    init    linear infinite var(--d),
    control linear infinite abs(var(--d)/(var(--s) - 1)) paused;
  animation-composition: add;
}
.box:hover {
  animation-play-state: running;
}
@keyframes init {
  to {rotate: 1turn}
}
@keyframes control {
  to {rotate: calc(sign(var(--s) - 1)*1turn)}
}
```

We are done! A few lines of code and we can easily control the speed and direction of an infinite rotation using one variable.

::: note

But you told us not to mess with the animation when it’s running. Why are you updating the keyframes?

:::

I am not “updating” the keyframes. I am “setting” them. The `--s` variable is fixed per element, so all the animation values are fixed and only the state changes on hover. We get a different animation for each element (based on the value of `--s`), but it’s not changing for the concerned element.

Here is the final code with different elements having different speed factors:

<CodePen
  user="anon"
  slug-hash="pvNvdVX"
  title="Infinite Animation Speed Control"
  :default-tab="['css','result']"
  :theme="dark"/>

In the near future, we can keep working with one animation and reintroduce the `reverse` keyword using an `if()` condition.

```css
.box {
  --d: 5s; /* animation duration */
  --s: 2; /* speed factor */
  
  --_a: rotation linear infinite;
  animation: 
    var(--_a) var(--d),
    var(--_a) abs(var(--d)/(var(--s) - 1)) paused
    if(style(--s < 1):reverse;else: ;);
  animation-composition: add;
}
.box:hover {
  animation-play-state: running;
}
@keyframes rotation {
  to { rotate: 1turn; }
}
```

You can test it using the latest version of Chrome:

<CodePen
  link="https://codepen.io/t_afif/pen/OPbPOwo/55b0c3134460046f861243f4d63560cc"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

If you are new to `if()`, check this small article to understand how to correctly use it: “[**The Hidden Trick of Style Queries and `if()`**](/css-tip.com/if-trick.md)”

---

## More Examples

We studied the entire logic with rotation in mind, but the trick works with any kind of infinite animation!

Here is an example from a previous article: “[**Infinite Marquee Animation using Modern CSS**](/master.dev/infinite-marquee-animation-using-modern-css.md)” where I am animating `offset-distance`. Hover to adjust the speed/direction of the animation:

<CodePen
  user="anon"
  slug-hash="QwGjxPv"
  title="Infinite Marquee Speed Control (hover to see the result)"
  :default-tab="['css','result']"
  :theme="dark"/>

Another example with a glowing border animation. For this one, I am animating a CSS variable, which is interesting because variables can be used almost everywhere, which means you can apply this technique to any CSS value.

<CodePen
  user="anon"
  slug-hash="RNoNJLW"
  title="Glowing border Animation with hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

We can even consider two interactions like the animated gallery below. A faster animation if you click the right arrow and a faster animation with a direction change if you click the left arrow.

<CodePen
  link="https://codepen.io/t_afif/pen/wBoKLOy/643d1c704de6e6eb275bbcacbe445e37"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

This time, I am considering three animations. Initially, only one is running, and each button click will run a different animation.

```css
.container:has(+ button:active) img {
  animation-play-state: running, paused, running; /* 1st and 3rd */
}
.container:has(+ * + button:active) img {
  animation-play-state: running, running, paused; /* 1st and 2nd */
}
```

---

## The Math Behind The Formula

Now that we have our working code, let’s dissect the logic behind the formula I used to define the duration. I should have started with this, but I decided it wasn’t useful for understanding the overall idea, so I made this section last. Feel free to skip it if you are not interested in the math.

I wanted to have a speed factor that allows me to have the following relation between the initial speed and the speed on hover:

```plaintext
speed_on_hover = var(--s) \* initial_speed
```

This makes the control intuitive as the number makes sense from a user perspective.

The `initial_speed` is the speed of the first animation (since the second one is paused), and the `speed_on_hover` is the sum of the speed of both animations (since we have an add composition). It means we have the following formula as well:

```plaintext
speed_on_hover = initial_speed + speed_of_second_animation
```

Merging both formulas, we get the following:

```plaintext
var(--s) \* initial_speed = initial_speed + speed_of_second_animation
initial_speed \* (var(--s) - 1) = speed_of_second_animation
speed_of_first_animation \* (var(--s) - 1) = speed_of_second_animation
```

A speed can be expressed as a `distance/duration`, and in our case, we have two animations that animate the same way but with different durations, which leads us to:

```plaintext
(var(--s) - 1)/duration_of_first_animation = 1/duration_of_second_animation
duration_of_second_animation = duration_of_first_animation/(var(--s) - 1)
```

That translates to the CSS we used:

```css
.box {
  --d: 5s; /* animation duration */
  --s: 2; /* speed factor */
  
  --_a: rotation linear infinite;
  animation: 
    var(--_a)      var(--d),
    var(--_a) calc(var(--d)/(var(--s) - 1)) paused
  animation-composition: add;
}
```

And when using the `reverse` keyword, the second animation will run in the opposite direction, so we consider the same math with a `-1` in the formula.

```css
.box {
  --d: 5s; /* animation duration */
  --s: 2; /* speed factor */
  
  --_a: rotation linear infinite;
  animation: 
    var(--_a)      var(--d),
    var(--_a) calc(var(--d)/(1 - var(--s))) reverse paused
  animation-composition: add;
}
```

---

## Conclusion

That’s all for this first part. Thanks to the mechanism behind `animation-composition`, we were able to create a code that lets us easily control the speed and direction of any infinite animation. Can you think about a good use case for this technique? If so, share your demo in the comments section.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Control Infinite CSS Animations (Part 1 of 2)",
  "desc": "Something like manipulating the speed of an animation isn't a big deal, but it's harder when the animation is *already running*. We got tricks. ",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/how-to-control-infinite-css-animations-part-1-of-2.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
