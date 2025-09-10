---
lang: en-US
title: "Step Gradients with a Given Number of Steps"
description: "Article(s) > Step Gradients with a Given Number of Steps"
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
      content: "Article(s) > Step Gradients with a Given Number of Steps"
    - property: og:description
      content: "Step Gradients with a Given Number of Steps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/step-gradients-with-a-given-number-of-steps.html
prev: /programming/css/articles/README.md
date: 2025-06-30
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6338
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
  name="Step Gradients with a Given Number of Steps"
  desc="A deep dive into producing an interpolated "
  url="https://frontendmasters.com/blog/step-gradients-with-a-given-number-of-steps/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6338"/>

Let’s say we want some stepped gradients like the ones below, with a certain number of steps.

![Desired_linear_result screenshot. Shows a bunch of linear gradients in 10 steps from left to right.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455796945-49b0fd56-3360-4508-a35c-f28bd195b4b0.png?resize=1024%2C767&ssl=1)

the desired result

Before reading further, try thinking about this. You are only given the start and end steps and the rest should be obtained via linear interpolation. How would you create them? Maybe put together a quick demo.

Note that this is a different problem from stepped gradients with[<VPIcon icon="fa-brands fa-stack-overflow"/>a certain step size](https://stackoverflow.com/q/22052984/1397351). The given step size problem is way more complex and it’s impossible to solve with CSS alone as long as we don’t have native looping. SVG filters [provide a solution (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/gbpENPm), though they limit us to using just pixel values for the step size; having`em` or`calc()` values there isn’t possible without JS.

---

## The Classic CSS Approach

This means computing the intermediate step values and specifying a stop and positions for each step. Something like this:

```scss
.step {
  background: linear-gradient(
    90deg,
    #00272b 10%,
    #193f2f 0 20%,
    #325833 0 30%,
    #4b6f36 0 40%,
    #64873b 0 50%,
    #7c9f3f 0 60%,
    #95b743 0 70%,
    #aecf47 0 80%,
    #c7e74b 0 90%,
    #e0ff4f 0
  );
}
```

Tedious!

And this is the simplified version, the one that [<VPIcon icon="fas fa-globe"/>avoids repeating stops and stop positions](https://css-tricks.com/while-you-werent-looking-css-gradients-got-better/), something that has been well-supported cross-browser for over half a decade, by the way. Because I often see the ancient, inefficient version that duplicates everything:

```scss
.step {
  background: linear-gradient(
    90deg,
    #00272b 0%,  #00272b 10%,
    #193f2f 10%, #193f2f 20%,
    #325833 20%, #325833 30%,
    #4b6f36 30%, #4b6f36 40%,
    #64873b 40%, #64873b 50%,
    #7c9f3f 50%, #7c9f3f 60%,
    #95b743 60%, #95b743 70%,
    #aecf47 70%, #aecf47 80%,
    #c7e74b 80%, #c7e74b 90%,
    #e0ff4f 90%, #e0ff4f 100%
  );
}
```

We could generate the stop list using Sass with looping and the [<VPIcon icon="fas fa-globe"/>`mix()`](https://sass-lang.com/documentation/modules/color/#mix) function.

```scss
// $c0: gradient start
// $c1: gradient end
// $n: number of steps
@function stop-list($c0, $c1, $n) {
  $l: (); // list of stops, initially empty

  @for $i from 0 to $n {
    $l: $l, mix($c1, $c0, $i * 100%/ ($n - 1)) 0 ($i + 1) * 100% / $n;
  }

  @return $l;
}

.step {
  background: linear-gradient(90deg, stop-list(#00272b, #e0ff4f, 10));
}
```

This produces the following compiled result:

```scss
.step {
  background: linear-gradient(
    90deg,
    #00272b 0 10%,
    #193f2f 0 20%,
    #325833 0 30%,
    #4b6f36 0 40%,
    #64873b 0 50%,
    #7c9f3f 0 60%,
    #95b743 0 70%,
    #aecf47 0 80%,
    #c7e74b 0 90%,
    #e0ff4f 0 100%
  );
}
```

Not bad — but we should probably tweak that generating function a bit so we get rid of the unnecessary `0` and `100%` stop positions at the very start and at the very end and to add rounding in case `100` is not a multiple of `$n`.

```scss{12,15}
// $c0: gradient start 
// $c1: gradient end
// $n: number of steps
@function stop-list($c0, $c1, $n) {
  $l: (); // list of stops, initially empty
  
  @for $i from 0 to $n {
    $l: $l,
    mix($c1, $c0, $i * 100%/ ($n - 1))
    // 1st stop position for each stop
    // not set (empty '') for very first stop
    if($i > 0, 0, unquote(""))
    // 2nd stop position for each stop
    // not set (empty '')for very last stop
    if($i < $n, round(($i + 1) * 100% / $n), unquote(""));
  }
  @return $l;
}
```

Much better — but the Sass function doesn’t look pretty and it gets even more complex if we need to round those percentages to a certain precision `$p`, a certain number of decimals, not just to integer percentage values:

```scss{18-22}
@use "sass:math";

// $c0: gradient start 
// $c1: gradient end
// $n: number of steps
// $p: rounding precision, how many decimals to keep
@function stop-list($c0, $c1, $n, $p: 2) {  
  $l: (); // list of stops, initially empty
  
  @for $i from 0 to $n {
    $l: $l,
    mix($c1, $c0, $i * 100%/ ($n - 1))
    // 1st stop position for each stop
    // not set (empty '') for very first stop
    if($i > 0, 0, unquote(""))
    // 2nd stop position for each stop
    // not set (empty '')for very last stop
    if(
      $i < $n - 1,
      round(($i + 1) * 100% / $n * math.pow(10, $p)) * math.pow(10, -$p),
      unquote("")
    );
  }
  @return $l;
}
```

<CodePen
  user="thebabydino"
  slug-hash="xbxeyOM"
  title="Pure CSS stepped gradient with Sass"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We still have that long list of values in the compiled CSS and, if we have 7 elements like this with stepped gradients, each is going to get its own long list.

Another problem with this is we cannot tweak the stepped gradient from DevTools. Not in a non-tedious way that doesn’t involve changing almost every step manually. If we want to change one of the end steps from DevTools, we have to also change all the Sass-computed intermediate steps.

![what happens when we change one end step from DevTools](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/458248325-2acac3da-a0e4-49b5-a1e8-02da911521c3.png?resize=1024%2C543&ssl=1)

Using CSS variables can get around both these problems, but we cannot use CSS variable values inside the Sass `mix()` function. In order to use CSS variables, we have to use CSS `color-mix()` function:

```scss{18}
@use "sass:math";

// $n: number to round to a certain precision
// $p: rounding precision, how many decimals to keep
@function round-to($n, $p: 2) {
  @return round($n * math.pow(10, $p)) * math.pow(10, -$p);
}

// $c0: gradient start
// $c1: gradient end
// $n: number of steps
// $p: rounding precision, how many decimals to keep
@function stop-list($c0, $c1, $n, $p: 2) {
  $l: (); // list of stops, initially empty

  @for $i from 0 to $n {
    $l: $l,
      color-mix(in srgb, $c1 round-to($i * 100%/ ($n - 1), $p), $c0)
        // 1st stop position for each stop
      // not set (empty '') for very first stop
      if($i > 0, 0, unquote(""))
        // 2nd stop position for each stop
      // not set (empty '') for very last stop
      if($i < $n - 1, round-to(($i + 1) * 100% / $n, $p), unquote(""));
  }

  @return $l;
}
```

Which produces the following ugly compiled CSS:

```scss
.step {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--c1) 0%, var(--c0)) 10%,
    color-mix(in srgb, var(--c1) 11.11%, var(--c0)) 0 20%,
    color-mix(in srgb, var(--c1) 22.22%, var(--c0)) 0 30%,
    color-mix(in srgb, var(--c1) 33.33%, var(--c0)) 0 40%,
    color-mix(in srgb, var(--c1) 44.44%, var(--c0)) 0 50%,
    color-mix(in srgb, var(--c1) 55.56%, var(--c0)) 0 60%,
    color-mix(in srgb, var(--c1) 66.67%, var(--c0)) 0 70%,
    color-mix(in srgb, var(--c1) 77.78%, var(--c0)) 0 80%,
    color-mix(in srgb, var(--c1) 88.89%, var(--c0)) 0 90%,
    color-mix(in srgb, var(--c1) 100%, var(--c0)) 0
  );
}
```

We can tweak the Sass to get rid of the first and last `color-mix()` and use the given ends `--c0` and `--c1` instead ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/bNdjKwJ)):

```scss{18-26}
@use "sass:math";

// $n: number to round to a certain precision
// $p: rounding precision, how many decimals to keep
@function round-to($n, $p: 2) {
  @return round($n * math.pow(10, $p)) * math.pow(10, -$p);
}

// $c0: gradient start
// $c1: gradient end
// $n: number of steps
// $p: rounding precision, how many decimals to keep
@function stop-list($c0, $c1, $n, $p: 2) {
  $l: (); // list of stops, initially empty

  @for $i from 0 to $n {
    $l: $l,
      if(
          $i > 0,
          if(
            $i < $n - 1,
            color-mix(in srgb, $c1 round-to($i * 100%/ ($n - 1), $p), $c0),
            $c1
          ),
          $c0
        )
      // 1st stop position for each stop
      // not set (empty '') for very first stop
      if($i > 0, 0, unquote(""))
      // 2nd stop position for each stop
      // not set (empty '') for very last stop
      if($i < $n - 1, round-to(($i + 1) * 100% / $n, $p), unquote(""));
  }

  @return $l;
}
```

But the generated CSS still looks ugly and difficult to read:

```scss
.step {
  background: linear-gradient(
    90deg,
    var(--c0) 10%,
    color-mix(in srgb, var(--c1) 11.11%, var(--c0)) 0 20%,
    color-mix(in srgb, var(--c1) 22.22%, var(--c0)) 0 30%,
    color-mix(in srgb, var(--c1) 33.33%, var(--c0)) 0 40%,
    color-mix(in srgb, var(--c1) 44.44%, var(--c0)) 0 50%,
    color-mix(in srgb, var(--c1) 55.56%, var(--c0)) 0 60%,
    color-mix(in srgb, var(--c1) 66.67%, var(--c0)) 0 70%,
    color-mix(in srgb, var(--c1) 77.78%, var(--c0)) 0 80%,
    color-mix(in srgb, var(--c1) 88.89%, var(--c0)) 0 90%,
    var(--c1) 0
  );
}
```

So… isn’t there another way?

---

## The No-Support Ideas

The spec defines a [<VPIcon icon="iconfont icon-w3c"/>`stripes()` image function](https://w3.org/TR/css-images-4/#stripes) and my first thought was it should allow us to do this, though it was not clear to me in which direction the stripes would go, if we have a way of specifying that:

```scss
.step {
  background: stripes(
    #00272b,
    #193f2f,
    #325833,
    #4b6f36,
    #64873b,
    #7c9f3f,
    #95b743,
    #aecf47,
    #c7e74b,
    #e0ff4f
  );
}
```

But the more I read the first paragraph in the spec definition, the more it sounds like this wasn’t meant for backgrounds, but for stripes going along the direction of things like borders (including roundings) and text strokes. In this case, the line direction would be the “missing” direction.

There’s also [a proposal (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/1332) to add animation-like gradient easing, including a `steps()` function, though, just like in the case of the `stripes()` function, there’s a lot about this I don’t understand and the proposal doesn’t seem to have moved much lately.

Since neither of these can be used today, what other solutions that we can currently use do we have?

---

## Enter the SVG `filter` Enhancement

Wait, don’t run away screaming! I promise that, leaving aside small browser issues, the technique is actually simple and even has better support than the CSS gradient double stop position syntax!

Let’s say we have a plain `black` to `red` gradient on an element that also gets an SVG `filter`:

```scss
.step {
  background: linear-gradient(90deg, #000, #f00);
  filter: url(#step)
}
```

We’ve picked this gradient in particular because it’s a gradient from `0%` to `100%` one one of the RGBA channels (in this case, the red channel `R`) while all other channel values stay constant. It could also be written as:

```css{2}
.step {
  background: linear-gradient(90deg, rgb(0% 0% 0% / 1), rgb(100% 0% 0% / 1));
  filter: url(#step);
}

```

Writing it like this makes it even more obvious that the green and blue channels (the second and third values in the `rgb()`) are zeroed everywhere all the time (before applying the `filter` and *after* too, as the SVG `filter`, which we’ll see in a second, doesn’t affect any channel other than the red one), while the alpha (the final value, the one after the slash in the `rgb()`) is maxed out everywhere all the time.

So basically, we go from a `0%` red (which is equivalent to `black`) at the start on the left to a `100%` red (which is the same as the `red` keyword value) at the end on the right.

![our initial gradient](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455271022-11851c25-7c8b-40e3-b088-a648afcc10a8-1.png?resize=1024%2C137&ssl=1)

This SVG `filter` needs to live inside an `svg` element. Since this `svg` element only exists to contain the `filter`, we don’t have any graphics that are going to be visible on the screen within it, it is functionally the same as a `style` element. So we zero its dimensions (`width` and `height` attributes), hide it from screen readers (`aria-hidden`) and take it out of the document flow (from the CSS).

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='step' color-interpolation-filters='sRGB'>
  </filter>
</svg>
```

```css
svg[height='0'][aria-hidden='true'] { position: fixed }
```

The `filter` element also gets another attribute other than the `id`. We aren’t going into it, just know we need to set it to `sRGB` for cross-browser compatibility ***if*** we mess with the RGB channels, as the [<VPIcon icon="fa-brands fa-firefox"/>spec default](https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-filters#formal_definition) and the one used by all browsers nowadays is `linearRGB`, but `sRGB` is likely what we want in most cases, plus it used to be the *only* value that worked in Safari, though that has recently changed.

In our particular case, if we don’t set the `color-interpolation-filters` attribute to `sRGB`, we won’t get equally sized steps in any browser other than older Safari versions which use `sRGB` anyway.

Inside this `filter`, we have a [<VPIcon icon="fas fa-globe"/>`feComponentTransfer`](https://webplatform.github.io/docs/svg/elements/feComponentTransfer/#Table-and-Discrete-Component-Transfers) primitive. This allows us to manipulate the RGBA channels individually (via the suggestively named `feFuncR`, `feFuncG`, `feFuncB` and `feFuncA`) in various ways. In this case, we have a gradient from`black (0%red)` to `red (100% red)` so we manipulate the red channel using `feFuncR`.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='step' color-interpolation-filters='sRGB'>
    <feComponentTransfer>
      <feFuncR type='discrete' tableValues='0 1'/>
    </feComponentTransfer>
  </filter>
</svg>
```

We’ve set the `type` of `feFuncR` to `discrete`, meaning the output red channel only has discrete values and these values are those specified by the `tableValues` attribute, so in our case here, `0` and `1` (`1` being the decimal representation of `100%`).

What does this mean? Where the input value for the red channel is below `50%` (`.5`), so on the left half of the initial gradient, the `filter` output value for the red channel is `0` (zeroed). And where the input value for the red channel is at least `50%` (`.5`), so on the right half of the initial gradient, the `filter` output for the red channel is `1` (maxed out). Since the green and blue channels are zero everyehere, this makes the left half of our gradient a `black` step and the right half a `red` step.

![a black to red stepped gradient with 2 steps, before and after applying the step `filter`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455810629-f253f4f3-6564-407c-89f8-722340e50c0d.png?resize=840%2C604&ssl=1)

Basically, when we have two values for `tableValues`, the `[0, 1]` interval of possible red input values gets split into two: `[0, .5)` and `[.5, 1]`. The first interval `[0, .5)` gets mapped to the first of the two `tableValues` and the second interval `[.5 1]` gets mapped to the second of the two `tableValues`.

Now let’s say we add a `.5` value in between:

```xml
<feFuncR type='discrete' tableValues='0 .5 1'/>
```

This gives us three steps from left to right: a `0%` red (`black`), a `50%` red (`maroon`) and a `100%` red (`red`).

Now that we have three values for `tableValues`, the `[0, 1]` interval of possible red input values gets split into three: `[0, .(3))`, `[.(3),.(6))` and `[.(6), 1]`. The first one, in our case being the left third of the gradient, gets mapped to `0`, so we have `0%` red (`black`) there. The second one, in our case being the middle third of the gradient, gets mapped to `.5`, so we have `50%` red (`marron`) there. The third one, in our case being the right third of the gradient, gets mapped to `1`, so we have `100%` red (`red`) there.

![a black to red stepped gradient with 3 steps, before and after applying the step `filter`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455810668-c93bd651-e9d5-4381-842f-1b2bc09c955a.png?resize=840%2C604&ssl=1)

We can also have four equally spaced values for `tableValues`:

```xml
<feFuncR type='discrete' tableValues='0 .333 .667 1'/>
```

This gives us 4 steps from left to right:

![a black to red stepped gradient with 4 steps, before and after applying the step `filter`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455811396-c37b7633-eab8-4dc9-957b-0642d60b0410.png?resize=840%2C604&ssl=1)

In general, `n` equally spaced values for `tableValues` produce `n` equal steps for our `black` to `red` gradient:

<VidStack src="https://videopress.com/125d5472-caa4-459c-9c68-756c17d02e71" />

adjusting the number of steps adjusts tableValues and the visual result ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/NPWmorj/) - note that if you’re on a wide gamut display, you’re likely to see this [<VPIcon icon="fa-brands fa-chrome"/>broken in Chrome](https://issues.chromium.org/issues/373410239))

If we use Pug, we can easily generate these values within a loop:

```pug
- let a = new Array(n).fill(0).map((_, i) => +(i/(n - 1)).toFixed(2));  
  
svg(width='0' height='0' aria-hidden='true')  
  filter#step(color-interpolation-filters='sRGB')  
    feComponentTransfer  
      feFuncR(type='discrete' tableValues=`${a.join(' ')}`)
```

Great, but this is a simple `black` to `red` gradient. How can we create a stepped orange to purple gradient, for example?

---

## Extending the Technique: Different Palettes

This technique works for gradients where we vary any of the four RGBA channels from `0%` to `100%` along the gradient line while keeping all other three channels constant along the entire gradient line, though not necessarily zeroed or maxed out like in the `black` to `red` gradient example.

For example, we could make the green channel `G` go from `0%` to `100%` along the gradient line, while the red channel is fixed at `26%` for the entire gradient, the blue channel is fixed at `91%` for the entire gradient and the alpha channel is fixed at `83%` for the entire gradient. This means we go from a slightly faded blue first step (`rgb(26% 0% 91%/ 83%)`) to a somewhat desaturated aqua (`rgb(26% 100% 91%/ 83%)`) for the final step.

![our example gradient, initial and with a 5 step filter applied](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455822110-9fe8edc0-7b78-4e50-a190-b0dc7254d08e.png?resize=840%2C427&ssl=1)

Below you can see how you can play with an interactive demo that allows to create a custom 5 step gradient that has steps along one of the four channels while the others have a fixed value, custom set by us, but fixed for the entire gradient.

<VidStack src="https://videopress.com/a9dc491f-d20a-4ab4-ae6b-dd774c3f6f42" />

picking the gradient channel and adjusting values for the fixed ones ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/ByNVrKL/) - note that this demo may also suffer from the Chrome wide gamut bug)

Out of all these cases, the most interesting one is the one varying the alpha.

First off, using the alpha channel allows us to avoid both the wide gamut bug and another [<VPIcon icon="fa-brands fa-chrome"/>Chrome bug](https://issues.chromium.org/issues/425059618) we hit when using one of the RGB channels, *but not the alpha channel*.

![the step edges are jagged in Chrome for the steps created on the RGB channels, but not on the alpha channel ([live test (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/dPojqGY))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/455843768-66471c4c-7bb3-42aa-bb2c-1ad6b52073ab.png?resize=900%2C725&ssl=1)

Secondly, what this allows us to do is to fade *any* RGB value in steps along the entire alpha interval. And if we place this stepped fade on top of another solid RGB background, we get our desired stepped gradient where we only need to know the start (the layer underneath, seen exactly as set for the first step where the alpha of the stepped gradient above is `0`) and end step (used for the stepped gradient on top).

<CodePen
  user="thebabydino"
  slug-hash="JodZwBb"
  title="3D layers"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is exactly how the gradients in the image at the start of the article were created. We have a `.step` element with a solid background set to the start step `--c0` and a pseudo fully covering it with a gradient where we vary the alpha of the end step `--c1`.

```css
.step {
  position: relative;
  background: var(--c0);

  &::before {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #0000, var(--c1));
    filter: url(#step);
    content: "";
  }
}
```

This pseudo has the alpha step `filter` applied.

```pug
//- change this to change number of steps  
- let n = 10;  
- let a = new Array(n).fill(0).map((_, i) => +(i/(n - 1)).toFixed(3));  
  
svg(width='0' height='0' aria-hidden='true')  
  filter#step  
    feComponentTransfer  
      feFuncA(type='discrete' tableValues=a.join(' '))
```

Note that in this case when we’re creating the steps on the alpha channel and we’re not touching the RGB channels, we don’t even need the `color-interpolation-filters` attribute anymore.

You can check out the live demo for various `--c0` and `--c1` combinations below:

<CodePen
  user="thebabydino"
  slug-hash="jOoLmBv"
  title="Stepped gradients"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

And yes, in case anyone is wondering, the pure CSS and the SVG `filter` results are identical - you can check it out in this demo.

<CodePen
  user="thebabydino"
  slug-hash="OJaOxwz"
  title="stepped gradients CSS vs. SVG"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Simplifying the Technique for the Future

It feels a bit inconvenient to use pseudo-elements for this instead of just having a `background`. The `filter()` *function* solves this problem. It takes an image (which can also be a CSS gradient) and a filter chain as inputs, then outputs the filtered image. This output can be used anywhere an image can be used in CSS — as a `background-image`, `mask-image`, `border-image`, even `shape-outside`!

This way, our CSS can become:

```css
.step {
  background: 
    filter(linear-gradient(90deg, #0000, var(--c1)), url(#step)) 
    var(--c0)
}
```

Much simpler!

The catch? While Safari has supported this for a decade (I first learned about this function and the Safari implementation in [<VPIcon icon="fas fa-globe"/>the summer of 2015](https://iamvdo.me/en/blog/advanced-css-filters#filter)!), [no other browser has followed (<VPIcon icon="iconfont icon-github"/>`web-platform-tests/interop`)](https://github.com/web-platform-tests/interop/issues/717) since. Here are the [<VPIcon icon="fa-brands fa-chrome"/>Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=541698) and [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1191043) bugs for anyone who wants to show interest and add to the use cases.

Here is [the `filter()` version (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/gbpZRBZ) of the stepped gradients demo, but keep in mind it only works in Safari.

---

## Extending the Technique: Back and Forth Steps

Now let’s say we wanted to modify our gradient to go back to `black` from `red` in the middle (we’re using the red and black gradient example here because of the contrast):

```css
.step {
  background: linear-gradient(90deg, #000, #f00, #000);
  filter: url(#step)
}
```

The `filter` is generated exactly the same as before:

```pug
- let n = 5;  
- let a = new Array(n).fill(0).map((_, i) => +(i/(n - 1)).toFixed(3));  
  
svg(width='0' height='0' aria-hidden='true')  
  filter#step(color-interpolation-filters='sRGB')  
    feComponentTransfer  
      feFuncR(type='discrete' tableValues=`${a.join(' ')}`)
```

This Pug is producing the following HTML:

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='step' color-interpolation-filters='sRGB'>
    <feComponentTransfer>
      <feFuncR id='func' type='discrete' tableValues='0 .25 .5 .75 1'/>
    </feComponentTransfer>
  </filter>
</svg>
```

In this case of a gradient going back, basically being reflected with respect to the middle, the middle red step is doubled when using the exact same red channel step gradient as before.

![Screenshot of a 2·5 = 10 step gradient. Shows the filter input (the initial left to right, black to red and then back to black gradient) and output (the filtered gradient, in 5 + 5 steps). On top of these gradients, we also have the boundary lines for the intervals the [0%, 100%] interval of the red channel progression (which coincides with the first half of the input gradient) is split into. This simple linear gradient reflection results in a doubling of the middle red step.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/456574288-af19cbac-fafd-4334-ae07-ff0fbd9acf29.png?resize=1024%2C364&ssl=1)

This makes perfect sense. We’re reflecting the gradient and this repeats the `100%` red step in the middle. We don’t have `n` steps across the gradient line anymore, we have `2·n` of them, with the two in the middle having the same RGBA value (`100%` red).

What we need to do is make it look like we only have `2·n - 1` steps by making the two steps in the middle half the size of the other ones. This means moving the cutoff to `100%` red (`(n - 1)/n·100%` red, which is `80%` red in the `n = 5` example case here) at half a `100%/(2·n - 1)` interval from the middle, both before and after. So our CSS becomes:

```scss
.step {
  /* cutoff to 100% red */
  --r: rgb(calc((var(--n) - 1) / var(--n) * 100%), 0%, 0%);
  /* distance from the middle of gradient line */
  --d: 0.5 * 100%/ (2 * var(--n) - 1);
  background: linear-gradient(
    90deg,
    #000,
    var(--r) calc(50% - var(--d)),
    #f00,
    var(--r) calc(50% + var(--d)),
    #000
  );
}
```

This does the trick!

![Screenshot of a 2·5 = 10 step gradient. Shows the filter input (the initial left to right, black to red and then back to black gradient) and output (the filtered gradient, in 5 + 5 steps). On top of these gradients, we also have the boundary lines for the intervals the [0%, 100%] interval of the red channel progression (which coincides with the first half of the input gradient) is split into. The trick here is that the two middle intervals aren't equal to all the others, but half of them. This way, the middle red step is still doubled, but it's also half the size of all other steps, so it doesn't look like it's repeated twice.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/456591236-3e9def57-7efe-4d8d-808b-49a6feef6b63.png?resize=1024%2C364&ssl=1)

The stops we’re specifying in the CSS in the particular case of `n = 5` are the `0%` red (implicitly at the `0%` point of the gradient line), the `80%` red at the `44.(4)%` point of the gradient line (set explicitly), the `100%` red (implicitly at the `50%` point of the gradient line), the `80%` red at the `55.(5)%` point of the gradient line (also set explicitly) and the `0%` red (implicitly at the `100%` point of the gradient line).

If we wanted to fine tune things, we could also simplify the middle offset computations:

```pug
50% - d =   
50% - .5·100%/(2·n - 1) =   
50% - 50%/(2·n -1) =   
50%·(1 - 1/(2·n - 1)) =   
50%·(1 - f)
```

So our CSS would become:

```css
.step {
  /* cutoff to 100% red */
  --r: rgb(calc((var(--n) - 1) / var(--n) * 100%), 0%, 0%);
  /* fraction of distance from middle of gradient line */
  --f: 1/ (2 * var(--n) - 1);
  background: linear-gradient(
    90deg,
    #000,
    var(--r) calc(50% * (1 - var(--f))),
    #f00,
    var(--r) calc(50% * (1 + var(--f))),
    #000
  );
}
```

Note that the SVG `filter` remains the exact same as before, we just pass the number of steps `n` to the CSS as a custom property:

```pug
- let n = 5;  
  
// exact same SVG filter as before  
.step(style=`--n: ${n}`)
```

If we want our gradient to repeat and we don’t want a doubled end/start step, we need to do something similar at the other end of the red scale (channel scale in general) and make it look as if the start/end step is `100%/(2·(n - 1))` of the gradient line (not `100%/(2·n - 1)` like in the case of no gradient repetition reflection).

```scss
.step {
  /* cutoff to 0% red */
  --r0: rgb(calc(1 / var(--n) * 100%), 0%, 0%);
  /* cutoff to 100% red */
  --r1: rgb(calc((var(--n) - 1) / var(--n) * 100%), 0%, 0%);
  /* fraction of distance from middle/ end of gradient line */
  --f: 1/ (2 * (var(--n) - 1));
  background: linear-gradient(
      90deg,
      #000,
      var(--r0) calc(50% * var(--f)),
      var(--r1) calc(50% * (1 - var(--f))),
      #f00,
      var(--r1) calc(50% * (1 + var(--f))),
      var(--r0) calc(50% * (2 - var(--f))),
      #000
    )
    0/ 50%;
}
```

Note that we’ve used a `background-size` of `50%`, which means `2` repetitions. For a generic number of repetitions `q`, our `background-size` is `100%/q`.

For the alpha channel variation that allows us to get any gradient from any `--c0` to any `--c1`, it’s very similar:

```scss :collapsed-lines
.step {
  /* cutoff to 0% alpha */
  --a0: rgb(from var(--c1) r g b/ calc(1 / var(--n)));
  /* cutoff to 100% alpha */
  --a1: rgb(from var(--c1) r g b/ calc((var(--n) - 1) / var(--n)));
  /* fraction of distance from middle/ end of gradient line */
  --f: 1/ (2 * (var(--n) - 1));
  position: relative;
  background: var(--c0);

  &::before {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        #0000,
        var(--a0) calc(50% * var(--f)),
        var(--a1) calc(50% * (1 - var(--f))),
        var(--c1),
        var(--a1) calc(50% * (1 + var(--f))),
        var(--a0) calc(50% * (2 - var(--f))),
        #0000
      )
      0 / calc(100% / var(--q));
    filter: url(#step);
    content: "";
  }
}
```

You can play with the demo below by changing the number of repetitions `q` to see how the result changes without needing to modify anything else.

<CodePen
  user="thebabydino"
  slug-hash="pvJOKOJ"
  title="Stepped gradients, reflect/ repeat - interactive"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

What if we wanted to have full steps at the start of the first repetition and at the end of last repetition? Well, in that case, given a number `q` of repetitions, we can compute the width of the lateral borders to be equal to half a step size on each side. A step size is `1/(2·q·(n - 1) + 1)` of the pseudo parent’s `content-box` width, so the `border-width` on the pseudo needs to be half of that.

```css :collapsed-lines
.step {
  /* cutoff to 0% alpha */
  --a0: rgb(from var(--c1) r g b/ calc(1 / var(--n)));
  /* cutoff to 100% alpha */
  --a1: rgb(from var(--c1) r g b/ calc((var(--n) - 1) / var(--n)));
  /* fraction of distance from middle/ end of gradient line */
  --f: 1/ (2 * (var(--n) - 1));
  container-type: inline-size;
  position: relative;
  background: var(--c0);

  &::before {
    position: absolute;
    inset: 0;
    border: solid 0 #0000;
    border-width: 0 calc(50cqw / (2 * var(--q) * (var(--n) - 1) + 1));
    background: linear-gradient(
        90deg,
        #0000,
        var(--a0) calc(50% * var(--f)),
        var(--a1) calc(50% * (1 - var(--f))),
        var(--c1),
        var(--a1) calc(50% * (1 + var(--f))),
        var(--a0) calc(50% * (2 - var(--f))),
        #0000
      )
      0 / calc(100% / var(--q));
    filter: url(#step);
    content: "";
  }
}
```

Modified interactive demo:

<CodePen
  user="thebabydino"
  slug-hash="NPqLBNq"
  title="Stepped gradients, reflect/ repeat #2 full end steps"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

What makes this possible and easy is the fact that, by default, `background-size` and `background-position` are relative to the `padding-box` (their position is relative to the top left corner of the `padding-box`, so that `0` position is relative to the `padding-box` left edge and their size is relative to the `padding-box` dimensions, so that `100%` in `calc(100%/var(--q))` is relative to the `padding-box` width), but extra `background` repetitions are painted in all directions under the `border` too.

![by default, backgrounds cover the entire `border-box`, but start from the top left corner of the `padding-box`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/456658499-d7fd70ab-3c68-453f-a5fd-a17d380546cb.png?resize=626%2C562&ssl=1)

Note that the whole reflect and repeat could be very much simplified on the CSS side if CSS gradients also allowed reflecting repetition [<VPIcon icon="fa-brands fa-firefox"/>like SVG ones do](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/spreadMethod).

---

## Extending the Technique: Different Gradients

We’ve only used a left to right `linear-gradient()` so far, but the direction of the gradient may vary and we may well use a `radial-gradient()` or a `conic-gradient()` instead. Nothing changes about the `filter` in this case. The gradients below all use the exact same `filter`.

<CodePen
  user="thebabydino"
  slug-hash="raVrZQN"
  title="Same step filter, different gradients"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Regardless of the gradient type, the `filter()` function is going to simplify things if Chrome and Firefox implement it too. The relevant code for the demo above would become:

```css
.step {
  --c0: #00272b;
  --c1: #e0ff4f;
  --s: #0000, var(--c1);
  background: filter(var(--img, conic-gradient(var(--s))), url(#step)) var(--c0);
}

.linear {
  --img: linear-gradient(to right bottom, var(--s));
}
.radial {
  --img: radial-gradient(circle, var(--s));
}
```

You can check out [the live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/XJbBPGb), but remember it only works in Safari.

---

## Refining Things

The results aren’t perfect. When using radial or conic gradients or even linear ones at weird angles, we get jagged edges in between the steps. I guess it doesn’t look that bad in between steps that may be reasonably similar, but if we wanted to do something about it, what could we do?

When creating the steps from the CSS, we can always use the [<VPIcon icon="fas fa-globe"/>`1px` difference trick](https://mastodon.social/@anatudor/112553357846316566) (avoid using a `1%` difference for this, it [<VPIcon icon="fas fa-globe"/>can be unreliable](https://mastodon.social/@anatudor/112965908316021981)) to smoothen things for radial and linear ones (the conic gradient case is a lot more complicated though and I haven’t been able to find a pure CSS solution that doesn’t involve emulating the conic gradient with a linear one).

But what can we do about it in the case of steps created via an SVG `filter`?

Given the introduction of the `1px` difference produces an effect similar to a tiny blur, the first instinct would be to try to blur the whole thing. However, the result looks terrible, even when we correct the edge alpha decrease, so the blur idea goes out the window!

<CodePen
  user="thebabydino"
  slug-hash="YPXOObZ"
  title="Same step filter, different gradients: blur + edge correct for smoother steps"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We could also smoothen the edges of each step using a technique similar to the [<VPIcon icon="fas fa-globe"/>no matrix filter gooey effect](https://mastodon.social/@anatudor/112523336154596358). That mostly works, save for a bit of weird rounding at the edges for all gradients and in the middle of the conic one. But that’s a lot of `filter` primitives, a lot for such a tiny visual gain.

<CodePen
  user="thebabydino"
  slug-hash="MYwBxZG"
  title="Same step filter, different gradients (gooey filter smoothen each step edge)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Another option would be to try to simplify this technique and smoothen the edges of even steps - this avoids increasing the number of primitives with the number of steps, but also comes with other technical challenges. So at the end of the day, it’s another path I’m not fully convinced it’s worth taking for such a small visual gain. Not to mention the weird edge rounding and the even more obvious clump in the middle of the `conic-gradient()`.

<CodePen
  user="thebabydino"
  slug-hash="OPVooKv"
  title="Same step filter, different gradients (gooey filter smoothen even step edges)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Finally, we could make the gradients grainy. But the approach discussed in [**a previous article**](/frontendmasters.com/grainy-gradients.md) is likely not what we’re going for.

<CodePen
  user="thebabydino"
  slug-hash="bNdOrXW"
  title="Same step filter, different gradients: dither"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

There may be cases where it is what we want, for example when it comes to such dithered band cards:

<CodePen
  user="thebabydino"
  slug-hash="WNVzBRY"
  title="Simple dithering backgrounds, SVG filter magic version"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Most of the time, this is probably not the desired result. So maybe try another approach to grainy gradients, one that doesn’t use displacement maps and also doesn’t alter the gradient palette?

We could use the old approach of layering and blending with a desaturated noise layer whose alpha we also reduce to a certain extent before blending:

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='grain' x='0' y='0' width='1' height='1' 
          color-interpolation-filters='sRGB'>
    <feTurbulence type='fractalNoise' baseFrequency='.713' numOctaves='3'/>
    <feColorMatrix type='saturate' values='0'/>
    <feComponentTransfer>
      <feFuncA type='linear' slope='.6'/>
    </feComponentTransfer>
    <feBlend in2='SourceGraphic' mode='overlay'/>
  </filter>
</svg>
```

Here, we fully desaturate the noise produced by `feTurbulence` and then scale down its alpha (to `.6` of what it would be otherwise).

<CodePen
  user="thebabydino"
  slug-hash="PwqyjVw"
  title="Same step filter, different gradients: dither #1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is the path taken by the sunburst demo below, which was created taking inspiration from the heading image of [**an earlier post here**](/frontendmasters.com/css-bursts-with-conic-gradients.md):

<CodePen
  user="thebabydino"
  slug-hash="pvoBeZP"
  title="grainy sunburst"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This comes with the disadvantage of altering the original palette, but if that’s not as much of an issue, it could work.

Finally, another option would be XOR-ing the alpha of the desaturated and reduced alpha noise layer and the alpha of the steps:

<CodePen
  user="thebabydino"
  slug-hash="MYwPvPP"
  title="Same step filter, different gradients: dither #2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Step Gradients with a Given Number of Steps",
  "desc": "A deep dive into producing an interpolated ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/step-gradients-with-a-given-number-of-steps.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
