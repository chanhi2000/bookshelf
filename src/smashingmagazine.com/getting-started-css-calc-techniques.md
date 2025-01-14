---
lang: ko-KR
title: "Getting Started With CSS calc ()"
description: "Article(s) > Getting Started With CSS calc ()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started With CSS calc ()"
    - property: og:description
      content: "Getting Started With CSS calc ()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/getting-started-css-calc-techniques.html
prev: /programming/css/articles/README.md
date: 2015-12-03
isOriginal: false
author: 
  - name: Ana Tudor
    url: https://smashingmagazine.com/author/anatudor/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a610d33b-4d3d-4aec-9282-b109ed465015/08-rotated-simple-cubes.png
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
  name="Getting Started With CSS calc ()"
  desc="Have you used `calc()`? It’s a function that should work as a value in all places where a number value — with or without specified units — works. However, while basic support is really good, you might run into trouble depending on *where* you use it. In this article, Ana Tudor will look at a few examples of how to use `calc()` including what support problems they have (if any) and whether they’re ultimately the best solution."
  url="https://smashingmagazine.com/2015/12/getting-started-css-calc-techniques/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a610d33b-4d3d-4aec-9282-b109ed465015/08-rotated-simple-cubes.png"/>

Have you used `calc()`? It’s a function that should work as a value in all places where a number value — with or without specified units — works. However, while basic support is really good, you might run into trouble depending on *where* you use it. In this article, Ana Tudor will look at a few examples of how to use `calc()` including what support problems they have (if any) and whether they’re ultimately the best solution.

I first discovered the `calc()` function more than four years ago, thanks to [<FontIcon icon="fas fa-globe"/>CSS3 Click Chart](https://css3clickchart.com), and I was absolutely delighted to see that basic mathematical computations — addition, subtraction, multiplication and division — had found their way into CSS.

```component VPCard
{
  "title": "CSS Click Chart | CSS3 Browser Support and Information",
  "desc": "CSS3 Click Chart",
  "link": "https://css3clickchart.com/",
  "logo": "https://css3clickchart/favicon.ico",
  "background": "rgba(204,141,107,0.2)"
}
```

A lot of people think preprocessors fully cover the realm of logic and computation, but the `calc()` function can do something that no preprocessor can: **mix any kind of units**. Preprocessors can only mix units with a fixed relation between them, like angular units, time units, frequency units, resolution units and certain length units.

`1turn` is always `360deg`, `100grad` is always `90deg`, and `3.14rad` is always `180deg`. `1s` is always `1000ms`, and `1kHz` is always `1000Hz`. `1in` is always `2.54cm` or `25.4mm` or `96px`, and `1dppx` is always equivalent to `96dpi`. This is why [preprocessors are able to convert between them (<FontIcon icon="iconfont icon-github"/>`sass/sass`)](https://github.com/sass/sass/blob/a1e6302437dd967eac5288f0793e758e2b0ba5ee/lib/sass/script/value/number.rb#L470-L503) and mix them in computations. However, preprocessors cannot resolve how much `1em` or `1%` or `1vmin` or `1ch` is in pixels because they lack context.

Let’s look at a few basic examples:

```css
div {
  font-size: calc(3em + 5px);
  padding: calc(1vmax + -1vmin);
  transform: rotate(calc(1turn - 32deg));
  background: hsl(180, calc(2*25%), 65%);
  line-height: calc(8/3);
  width: calc(23vmin - 2*3rem);
}
```

On some occasions, we might want to use variables in the `calc()` function. This is totally possible with the most popular preprocessors.

First, [with Sass (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/hgFno), we have variable interpolation, just as with any other native CSS function:

<CodePen
  user="thebabydino"
  slug-hash="hgFno"
  title="Using a Sass variable inside `calc()`"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```scss
$a: 4em
height: calc(#{$a} + 7px)
```

Here [is LESS (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/JoXvyd):

<CodePen
  user="thebabydino"
  slug-hash="JoXvyd"
  title="Using a LESS variable inside `calc()`"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```scss
@a: 4em;
height: ~"calc(@{a} + 7px)";
```

And [here is Stylus (<FontIcon icon="fa-brands fa-codepen"/>`OPNZjO`)](https://codepen.io/thebabydino/pen/OPNZjO):

<CodePen
  user="thebabydino"
  slug-hash="OPNZjO"
  title="Use a Stylus variable inside `calc()`"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```scss
a = 4em
height: "calc(%s + 7px)" % a
```

We can also use [native CSS variables (<FontIcon icon="fa-brands fa-thebabydino"/>)](https://codepen.io/thebabydino/pen/WbwJyg), but note that this only works in Firefox 31+ for the moment, because no other browser supports CSS variables yet.

<CodePen
  user="thebabydino"
  slug-hash="WbwJyg"
  title="Using CSS variables inside `calc()`"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: note Update

[<FontIcon icon="fas fa-globe"/>Safari and Chrome/Opera now support CSS variables](https://caniuse.com) as well and they are [<FontIcon icon="fa-brands fa-microsoft"/>listed as “in development” for Edge](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/csscustompropertiesakacssvariables/).

:::

```css
--a: 4em;
height: calc(var(--a) + 7px);
```

We need to keep a few things in mind to ensure that the `calc()` function works. First, division by zero obviously won’t work. Having a space between the function name and the parenthesis is not allowed. And the plus and minus operators must be surrounded by white space. This means that the following are not valid:

```css
calc(50% / 0)
calc (1em + 7px)
calc(2rem+2vmin)
calc(2vw-2vh)
```

The `calc()` function should work as a value in all places where a number value, with or without specified units, works. However, while basic support is really good, we might run into trouble depending on *where* we use it. Let’s look at a few examples, including what support problems they have (if any) and whether they’re ultimately the best solution.

---

## Easier To Understand Computed Values

Let’s say we want a rainbow gradient. The CSS for this is [really simple (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/VLOWaX):

<CodePen
  user="thebabydino"
  slug-hash="VLOWaX"
  title="rainbow gradient"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
background: linear-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
```

But those HEX values don’t make much sense. Using `hsl()` and `calc()`, although more verbose, makes things a lot clearer:

```css
background: linear-gradient(hsl(calc(0*60), 100%, 50%),
                            hsl(calc(1*60), 100%, 50%),
                            hsl(calc(2*60), 100%, 50%),
                            hsl(calc(3*60), 100%, 50%),
                            hsl(calc(4*60), 100%, 50%),
                            hsl(calc(5*60), 100%, 50%),
                            hsl(calc(6*60), 100%, 50%));
```

Sadly, using `calc()` in `hsl()`, `rgb()`, `hsla()` or `rgba()` doesn’t work at the moment [in Firefox or Internet Explorer (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/wfraH) (IE), which means this version works [only in WebKit browsers (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/vNNjXG) for now. So, in practice, it’s still probably better to let a preprocessor handle it all at this point, including the computations. And the best thing about using a preprocessor is that it lets us [generate the list in a loop (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/BNeZQE):

```scss
$n: 6;
$l: ();

@for $i from 0 through $n {
   $l: append($l, hsl($i*360/$n, 100%, 50%), comma);
}

background: linear-gradient($l);
```

---

## More Efficient Gradient Backgrounds For Flexible Elements

Let’s say we want a background with a fixed `1em` stripe both at the top and at the bottom. The only problem is we don’t know the height of the element. One solution would be to [use two gradients (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/OVYgWq):

<CodePen
  user="thebabydino"
  slug-hash="OVYgWq"
  title="top and down red stripes using two gradients"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
background:
   linear-gradient(#e53b2c 1em, transparent 1em),
   linear-gradient(0deg, #e53b2c 1em, #f9f9f9 1em);
```

But we’d need only [one gradient if we use `calc()` (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/BNeZWe):

<CodePen
  user="thebabydino"
  slug-hash="BNeZWe"
  title="top and down red stripes using calc()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
background:
   linear-gradient(#e53b2c 1em, #f9f9f9 1em,
                   #f9f9f9 calc(100% - 1em),
                   #e53b2c calc(100% - 1em));
```

This should work fine in all browsers that support `calc()` and gradients, and because it involves mixing units, it isn’t something that preprocessors have an equivalent for. We can, however, make it more maintainable by [using variables (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/NGGMaY):

<CodePen
  user="thebabydino"
  slug-hash="NGGMaY"
  title="top and down red stripes using calc()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```scss
$s: 1em;
$c: #e53b2c;
$bg: #f9f9f9;

background:
   linear-gradient($c $s,
                   $bg $s,
                   $bg calc(100% - #{$s}),
                   $c calc(100% - #{$s}));
```

Note: For some reason, one of the stripes appears to be slightly blurry and narrower than the other in Chrome and Opera.

---

## Diagonal Gradient Stripes

Let’s say we want an element with a thick diagonal stripe extending on both sides of its actual diagonal. We could do it [using percentage-based stops (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/YyGPJo):

<CodePen
  user="thebabydino"
  slug-hash="YyGPJo"
  title="fixed width diagonal gradient stripe"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
background:
   linear-gradient(to right bottom,
                   transparent 42%, #000 0, #000 58%,
                   transparent 0);
```

In this case, the width of the stripe would depend on the element’s dimensions. Sometimes, that’s exactly what we want. For example, this is how we’d do things if we wanted to reproduce a flag in CSS. Adding a bit of green, yellow and blue to the gradient above [gives us a flag (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/zvKxeL) that fine-chocolate lovers probably recognize — the flag of Tanzania.

<CodePen
  user="thebabydino"
  slug-hash="zvKxeL"
  title="Flag of Tanzania (pure CSS)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
background:
   linear-gradient(to right bottom,
                   #1eb53a 38%, #fcd116 0,
                   #fcd116 42%, #000 0,
                   #000 58%, #fcd116 0,
                   #fcd116 62%, #00a3dd 0);
```

![Flag of Tanzania. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7c230704-a18e-47e2-aad8-eb06b58ceb86/01-flag-tanzania.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/00313810-eabe-4e6d-ac6d-3b8f7206cf18/01-flag-tanzania-preview.png)

But what if we want our diagonal stripe to have a fixed width that doesn’t depend on the element’s dimensions? Well, we’d use `calc()` and put the stops at `50%` minus half of the fixed stripe’s width and at `50%` plus half of the fixed stripe’s width. If we want the stripe’s width to be `4em`, then we’d have this:

```css
background:
   linear-gradient(to right bottom,
                   transparent calc(50% - 2em),
                   #000 0,
                   #000 calc(50% + 2em),
                   transparent 0);
```

You can [test this live (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/YyGPJo) by resizing the window. The element’s dimensions are expressed in viewport units and, therefore, change with the viewport, but the diagonal stripe always stays the same width.

<CodePen
  user="thebabydino"
  slug-hash="YyGPJo"
  title="fixed width diagonal gradient stripe"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Positioning Children Of Known Dimensions In The Middle

You’ve likely seen the [little trick (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/yYYEJB) of absolutely positioning an element dead in the middle of its parent:

<CodePen
  user="thebabydino"
  slug-hash="yYYEJB"
  title="absolute positioning child in the middle of parent"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
position: absolute;
top: 50%;
left: 50%;
margin: -2em -2.5em;
width: 5em;
height: 4em;
```

With `calc()`, we can [get rid of the `margin` rule (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/wKKXzQ):

<CodePen
  user="thebabydino"
  slug-hash="wKKXzQ"
  title="absolute positioning child in the middle of parent"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
position: absolute;
top: calc(50% - 2em);
left: calc(50% - 2.5em);
width: 5em;
height: 4em;
```

And we can make it more maintainable using [variables for width and height (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/LpprXQ):

<CodePen
  user="thebabydino"
  slug-hash="LpprXQ"
  title="absolute positioning child in the middle of parent"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```scss
$w: 5em;
$h: 4em;

position: absolute;
top: calc(50% - #{.5*$h});
left: calc(50% - #{.5*$w});
width: $w;
height: $h;
```

Note that, while using offsets (`top`, `left`) for initial positioning is safe, if you plan on animating the position of the element afterwards, you should use transforms instead. This is because changing transforms [<FontIcon icon="fas fa-globe"/>requires only compositing](https://csstriggers.com/), whereas changing offsets also triggers a relayout and repaint — thus, impairing performance.

---

## System Of Coordinates And Grid With Origin In The Middle

Since discovering the [<FontIcon icon="fas fa-globe"/>four-value `background-position`](https://css-tricks.com/almanac/properties/b/background-position/), I haven’t been too keen on using `calc()` to position backgrounds relative to the right or bottom side of the element. But `calc()` turned out to be a great solution for positioning a certain point of the background relative to the middle of the element.

A couple of years ago, I found myself wanting to create a background that represents a system of coordinates with a grid behind and whose origin would be dead in the middle of the screen.

![System of coordinates and grid. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d2f04359-1d43-4547-9d65-b7a81425dafb/02-coord-system.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5dea162e-6029-40b3-892f-be847c1dfe9f/02-coord-system-preview.png)

The [system of coordinates and the grid part (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/NqVgYP) were easy to achieve:

<CodePen
  user="thebabydino"
  slug-hash="NqVgYP"
  title="system of coordinates + grid #1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
background-image:
   linear-gradient(#e53b2c .5em, transparent .5em) /* horizontal axis */,
   linear-gradient(90deg, #e53b2c .5em, transparent .5em) /* vertical axis */,
   linear-gradient(#333 .25em, transparent .25em) /* major horizontal gridline */,
   linear-gradient(90deg, #333 .25em, transparent .25em) /* major vertical gridline */,
   linear-gradient(#777 .125em, transparent .125em) /* minor horizontal gridline */,
   linear-gradient(90deg, #777 .125em, transparent .125em) /* minor vertical gridline */;

background-size:
   100vw 100vh, 100vw 100vh,
   10em 10em, 10em 10em,
   1em 1em, 1em 1em;
```

But how do we make the origin of the background dead in the middle and not in the top-left corner? First, `background-position: 50% 50%` won’t work because it makes the `50% 50%` point of the gradient coincide with the `50% 50%` point of the element, but the lines are at the top and at the left of the gradients, respectively. The solution is to use `calc()` and position the gradients so that their top left is almost in the middle of the viewport, just offset to the top and left by half the axis or the grid line’s width:

```css
background-position:
    0 calc(50vh - .25em), calc(50vw - .25em),
    0 calc(50vh - .125em), calc(50vw - .125em),
    0 calc(50vh - .0625em), calc(50vw - .0625em);
```

Again, we can make it all more maintainable by using variables:

<CodePen
  user="thebabydino"
  slug-hash="PqvjBr"
  title="system of coordinates + grid #2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Maintaining Aspect Ratio And Covering A Viewport Dimension

One thing I’ve always wanted when creating HTML slides was for each slide to be a box of a certain fixed-aspect ratio that always covers at least one dimension of the viewport and that is, of course, in the middle along the other axis.

Proportional box animation

Let’s start by assuming that the desired aspect ratio for the slides is 4:3 and that I’m on a widescreen display. This means the slides cover the viewport vertically but still have some space on the left and the right.

![Proportional box: case 1. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1765d80f-06cc-4d1d-8e7b-bbb91f8e8c21/04-prob-box-case-1.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f6129301-8612-4a07-8f00-c3c99ee66ae2/04-prob-box-case-1-preview.png)

Covering the viewport vertically means a `height` of `100vh`. Knowing the height and the aspect ratio, we can get the width, which is `4/3*100vh`. And to get it in the middle, we need to offset it from the `left` by half the viewport’s width (`100vw/2`) minus half the slide’s width (`4/3*100vh/2`). This is where we need the `calc()` function because we have to mix units.

```css
.slide {
   position: absolute;
   left: calc(100vw/2 - 4/3*100vh/2);
   width: calc(4/3*100vh);
   height: 100vh;
}
```

Things change, however, for a display with an aspect ratio that’s less than 4:3. In this case, the slides cover the viewport horizontally, with some space left at the top and the bottom.

![Proportional box: case 2. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ab55a5fe-aec7-4de1-9a90-6e008d8436d1/05-prop-box-case-2.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/30d92dd1-72b3-4503-bd0b-94e5579b1345/05-prop-box-case-2-preview.png)

Covering the viewport horizontally means a `width` of `100vw`. Knowing this and the aspect ratio will give us the `height`, which is `3/4*100vw`. Finally, the `top` offset is half the viewport’s height minus half the slide’s height; so, `100vh/2 - 3/4*100vw/2`.

```css
@media (max-aspect-ratio: 4/3) {
   .slide {
      top: calc(100vh/2 - 3/4*100vw/2);
      left: auto; /* Undo style set outside media query  */
      width: 100vw;
      height: calc(3/4*100vh);
   }
}
```

We can, of course, make things more flexible by not hardcoding the aspect ratio and using two variables instead (one for width and one for height). Here is the Sass version, which you can also [test live (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/IwvlL/) by resizing the window:

<CodePen
  user="thebabydino"
  slug-hash="IwvlL"
  title="Proportional box covering viewport"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```scss
$a: 4;
$b: 3;

.slide {
   position: absolute;
   top: 0;
   left: calc(50vw - #{$a/$b/2*100vh});
   width: $a/$b*100vh;
   height: 100vh;

   @media (max-aspect-ratio: #{$a}/#{$b}) {
      top: calc(50vh - #{$b/$a/2*100vw});
      left: 0;
      width: 100vw;
      height: $b/$a*100vw;
   }
}
```

Even better, we could [turn this into a mixin (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/MajxzY), which is generally a better practice than using global variables:

<CodePen
  user="thebabydino"
  slug-hash="MajxzY"
  title="Proportional box covering viewport (mixinized)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```css
@mixin proportional-box($a: 1, $b: $a) {
   position: absolute;
   top: 0;
   left: calc(50vw - #{$a/$b/2*100vh});
   width: $a/$b*100vh;
   height: 100vh;

   @media (max-aspect-ratio: #{$a}/#{$b}) {
      top: calc(50vh - #{$b/$a/2*100vw}); left: 0;
      width: 100vw; height: $b/$a*100vw;
   }
}

.slide {
   @include proportional-box(4, 3);
}
```

Note that `$a` and `$b` [<FontIcon icon="fas fa-globe"/>must be integers](https://vasilis.nl/nerd/min-aspect-ratio-mean-look-like/) in order for the media query to work.

This is supported in all current versions of major browsers. However, WebKit browsers didn’t support the use of viewport units in the `calc()` function until recently. This has been fixed in Safari 8 and Chrome 34, respectively, with Opera trailing.

---

## Short Slide Title In The Middle

I wanted two more things for slide presentations.

The first was for the slides not to really cover the entire viewport because the edges might get cut off. This was an easy fix. I simply set their `box-sizing` to `border-box` and also set a border on them.

The second thing I wanted was to mark sections by starting each with a slide that had nothing but a short and memorable title right in the middle.

![Desired result. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2a7fcd8a-87c5-418f-aab4-5b1516f93b3b/06-title-slide.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a3d1b4e0-d509-465f-8981-161e3d1177ae/06-title-slide-preview.png)

I didn’t want to use absolute positioning, so I thought I’d go with setting an appropriate `line-height`.

In case the slide’s height, including the border, covers the entire height of the viewport, I would have a `line-height` of `100vh` minus twice the slide’s `border-width`:

```scss
$slide-border-width: 5vmin;

.slide {
   /* The other styles */
   box-sizing: border-box;
   border: solid $slide-border-width dimgrey;

   h1 {
      line-height: calc(100vh - #{2*$slide-border-width});
   }
}
```

In case the slide, including the borders, covers the viewport horizontally (and was vertically in the middle), its height would be `$b/$a*100vw`. So, the `line-height` for the title would be that minus twice the slide’s `border-width`:

```scss
line-height: calc(#{$b/$a*100vw} - #{2*$slide-border-width});
```

This was my initial idea, which, in theory, should work just fine. And it does [in WebKit browsers and IE (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/qObdVm). However, it turns out that `calc()` values ~don’t work for `line-height` (and some other properties) [<FontIcon icon="fa-brands fa-firefox"/>in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=594933)~ — [they work now (<FontIcon icon="fa-brands fa-x-twitter"/>`heycam`)](https://x.com/heycam/status/709679335402135552); so, `calc()` is not the best solution there. Luckily, there are a lot of other ways to solve this problem (flexbox, absolute positioning and more).

<CodePen
  user="thebabydino"
  slug-hash="qObdVm"
  title="title in middle for flexible slide (FF bug)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Fixed Point Of View

One thing I enjoy playing with a lot is CSS 3D — creating geometric 3D shapes with CSS in particular. If I create just one shape, then I’d normally position it in the middle of the scene it’s contained in. The scene is the element on which I set the `perspective` and also the parent of the shape element. The shape element will have its own descendants, which are the shape faces, but we won’t go into detail about them here; if you want to learn how they are positioned, then check out my [<FontIcon icon="fas fa-globe"/>guest article on CSS-Tricks](https://css-tricks.com/how-i-live-coded-my-most-hearted-codepen-demo/).

Setting a `perspective` on a scene ensures we’ll see everything that is closer as being bigger and everything that is further away as being smaller. The `perspective` property accepts length values, and the smaller these values are, the [greater the contrast (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/QbRmYN) between what’s closer to us and what’s further away.

<CodePen
  user="thebabydino"
  slug-hash="QbRmYN"
  title="what changing perspective on the scene does"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Now, let’s say we have a very simple 3D shape — a cube, for example — right in the middle of our scene. It doesn’t look very 3D: It’s way too symmetrical, and if the faces are fully opaque, we can only see the front one.

![Cube. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/54d4423a-2fcb-4a08-8586-2b3f1ee289b9/07-simple-cube.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/51680115-bd00-412b-83e0-6a6696e61d61/07-simple-cube-preview.png)

We could rotate it a bit, let’s say by `30°`, around its `y` axis (i.e. the vertical axis passing through the middle of the cube) or around its `x` axis. This looks better, but we can only see two faces. Plus, the cube is now visibly rotated, which was not the intention.

![Rotated cube. ([<FontIcon icon="fas fa-globe"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a610d33b-4d3d-4aec-9282-b109ed465015/08-rotated-simple-cubes.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5d66b0ca-bc40-4c34-8ba1-3823407bc651/08-rotated-simple-cubes-preview-2.png)

Something else we could do is change our point of view. We do this via a property called `perspective-origin`. Its initial value is `50% 50%`. This is relative to the scene, and we know that the `50% 50%` point of the scene is where the central point of the shape is positioned. Now, let’s say we want to move this up and to the right. The simplest way to do this is to set `perspective-origin: 100% 0`. But this creates a problem: How we now see the cube depends on the dimensions of the scene (you can [test this live (<FontIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/MaeOoa) by resizing the viewport).

<CodePen
  user="thebabydino"
  slug-hash="MaeOoa"
  title="simple cube, top right point of view"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Changing scene dimensions changes how we see the cube.

A `perspective-origin` of `100% 0` is measured from the top right corner of the scene, while the cube is always in the middle of the scene. Because of this, changing the scene’s dimensions will change the distance between the `50% 50%` point (where the cube is positioned) and the `100% 0` point (where we have set the `perspective-origin`).

A solution for this to use `calc()` for `perspective-origin`, of course, is simply to add or subtract a fixed value from the initial `50%`:

```css
perspective-origin: calc(50% + 15em) calc(50% - 10em);
```

<VidStack src="vimeo/140925020" />

---

## What About You?

Have you used `calc()`? If yes, what for?

::: info Further Reading

- [A Detailed Introduction To Custom Elements](https://smashingmagazine.com/2014/03/introduction-to-custom-elements/)
- [Houdini: Maybe The Most Exciting Development In CSS](https://smashingmagazine.com/2016/03/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of/)
- [It’s Time To Start Using CSS Custom Properties](https://smashingmagazine.com/2017/04/start-using-css-custom-properties/)
- [A Deep Look At The Model-View-Controller Pattern](https://smashingmagazine.com/2016/05/better-architecture-for-ios-apps-model-view-controller-pattern/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started With CSS calc ()",
  "desc": "Have you used `calc()`? It’s a function that should work as a value in all places where a number value — with or without specified units — works. However, while basic support is really good, you might run into trouble depending on *where* you use it. In this article, Ana Tudor will look at a few examples of how to use `calc()` including what support problems they have (if any) and whether they’re ultimately the best solution.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/getting-started-css-calc-techniques.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
