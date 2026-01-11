---
lang: en-US
title: "A pragmatic guide to modern CSS colours - part two"
description: "Article(s) > A pragmatic guide to modern CSS colours - part two"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A pragmatic guide to modern CSS colours - part two"
    - property: og:description
      content: "A pragmatic guide to modern CSS colours - part two"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-pragmatic-guide-to-modern-css-colours-part-two.html
prev: /programming/css/articles/README.md
date: 2025-12-02
isOriginal: false
author:
  - name: Kevin Powell
    url : https://piccalil.li/author/kevin-powell
cover: https://piccalil.b-cdn.net/api/og-image?slug=a-pragmatic-guide-to-modern-css-colours-part-two/
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
  name="A pragmatic guide to modern CSS colours - part two"
  desc="Kevin is back with the follow up to part one of this series. This time, Kevin goes deep on how functional the newer colour capabilities are in practice to hopefully, encourage more designers to use their browser more often."
  url="https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-two"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=a-pragmatic-guide-to-modern-css-colours-part-two/"/>

In my [**previous article on colours**](/piccalil.li/a-pragmatic-guide-to-modern-css-colours-part-one.md), I dove into the practical side of the new colour features for developers who primarily copy and paste values from a design file into their editor.

With all the new colour features that we have in CSS now, we can do more with colours in the browser than designers can do in their design apps, and it opens up a whole world of possibilities.

---

## Manipulating colours

In the previous article, we looked at some basic use cases of relative colours. As a quick recap, the syntax looks something like this:

```css
:root {
  --primary: #ff0000;
}

.primary-bg-50-opacity: {
  background: hsl(from var(--primary) h s l / .5);
}
```

The most important part of the above example is that the `h s l` letters aren’t just letters, they are variables which contain the hue, saturation, and lightness values of the original colour.

We can replace those letters with a value. For example, `#00ff00` has no blue in it, so we could add some by replacing the `b` (which in this case is `0`), with a number to add some blue in:

```css
.green-with-a-touch-of-blue {
  color: rgb(from #00ff00 r g 25);
}
```

This works, but only if you know how much blue the original colour had to start with. Hard-coding `25` in there might increase the blue, but say we had `#00ff55`, it would decrease the value instead.

The real power comes when we use `calc()`.

```css
.green-with-a-touch-of-blue {
  color: rgb(from #00ff00 r g calc(b + 25));
}
```

While I’m using `rgb()` above, in general I find it hard to work with. Instead, I tend to stick with `hsl()` and `oklch()`, where it can be a lot more useful.

With both of those colour functions, the hue value goes from 0 to 360, but if you go larger than 360, it simply loops around, so if you add 180 to the hue, you’ll always get the colour from the other side of the colour wheel.

```css
:root {
  --color-primary: #2563eb;
  
  --color-secondary:
    hsl(from var(--color-primary) 
        calc(h + 120) s l);
        
  --color-tertiary: 
    hsl(from var(--color-primary) 
        calc(h - 120) s l);
}
```

Or if you’re after more of a tertiary colour scheme:

```css
:root {
  --color-primary: #2563eb;
  
  --color-secondary:
    hsl(from var(--color-primary) 
        calc(h + 120) s l);
        
  --color-tertiary: 
    hsl(from var(--color-primary) 
        calc(h - 120) s l);
}
```

<CodePen
  user="piccalilli"
  slug-hash="KwVLwdo"
  title="Tertiary color scheme with relative colors"
  :default-tab="['css','result']"
  :theme="dark"/>

This approach also makes it easy to create lighter/darker colours without much work:

```css
:root {
  --primary-base: hsl(221 83% 50%);
  
  --primary-100: 
    hsl(from var(--primary-base) 
        h s 10%);
  --primary-200: 
    hsl(from var(--primary-base) 
        h s 20%);
  --primary-300: 
    hsl(from var(--primary-base) 
        h s 30%);
  /* etc */
}
```

This *can* work, but you might not want to have a base colour and modify the lightness values to specific stops, but instead get a little lighter or darker, regardless of what the base colours lightness value is.

Once again, we can use a `calc()` to help with that.

```css
:root {
  --color-primary-base: #2563eb;
  --color-primary-lighter: hsl(from var(--color-primary-base) h s calc(l + 25));
  --color-primary-darker: hsl(from var(--color-primary-base) h s calc(l - 25));
}
```

<CodePen
  user="piccalilli"
  slug-hash="vELwYoO"
  title="Tertiary color scheme with relative colors - with tints/shades"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Surface levels

One nice use case for this approach is to create surface levels. In light themes, we can rely solely on shadows to help distinguish the surface levels, but shadows on dark backgrounds don’t do very much. Instead, we want to get slightly lighter on each surface level in a dark theme, which we can do with a little help of `light-dark()` and custom properties.

```css
:root {
  --surface-base-light: hsl(240 67% 97%);
  --surface-base-dark: hsl(252 21% 9%);
  /* shadows are in the codepen below */
}

.surface-1 {
  background: 
    light-dark(
      var(--surface-base-light), 
      var(--surface-base-dark));
}

.surface-2 {
  background: 
    light-dark(
      var(--surface-base-light),
      hsl(from var(--surface-base-dark) h s calc(l + 4))
    );
}

.surface-3 {
  background: light-dark(
      var(--surface-base-light),
      hsl(from var(--surface-base-dark) h s calc(l + 8))
    );
}
```

<CodePen
  user="piccalilli"
  slug-hash="VYeOKQj"
  title="light/dark surface levels"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Creating a full colour scheme

While adjusting lightness values can come in handy for simple tasks, when creating a colour scheme, it’s common to use what the design world calls **perceptual colour scaling**, where the hue and saturation also shift by small amounts.

In general, as you increase the lightness, you also want to slightly increase the saturation, while moving the hue to slightly cooler values, and reduce the saturation as you get darker. To do that, we can make small tweaks to the hue and saturation using calc() as we create our tints and shades.

```css
:root {
  --primary-base: hsl(221 83% 50%);
  
  --primary-400: 
    hsl(from var(--primary-base) 
        calc(h - 3) 
        calc(s + 5) 
        60%);
  --primary-300: 
    hsl(from var(--primary-base) 
        calc(h - 6) 
        calc(s + 10) 
        70%);
  /* etc */
}
```

Here’s an example of that in action, along with a version where there are no hue or saturation shifts under it. The most obvious differences are in the 100, 200, and 300 swatches where, when only shifting the lightness value, the colour appears to loose a bit of its vibrancy.

<CodePen
  link="https://codepen.io/kevinpowell/pen/JoYaoGW/5407077415578757498bf930eb55f8d4"
  title="color scale comparison"
  :default-tab="['css','result']"
  :theme="dark"/>

It is a bit of setup, but once you have one you are happy with, it should work great for all your colours.

<CodePen
  user="piccalilli"
  slug-hash="ogxxyjB"
  title="color scales"
  :default-tab="['css','result']"
  :theme="dark"/>

You can take this a step further with some more advanced math, as [<VPIcon icon="fa-brands fa-youtube"/>Matthias Ott has showed at CSS Day 2024](https://youtu.be/su6WA0kUUJE?si=DuIGK1IvUmE3lWaS&t=1932) (timestamped to the relevant part of the talk).

---

## Speaking of perceptual colours

One of the benefits of using `hsl()` is that it’s so easy to predict what a colour will look like. The downside of it is that even if you maintain the saturation and lightness consistent, as you shift through the different hue values, **perceptually some colours will appear brighter than others**.

Below, the saturation and lightness of both of the green and blue are the same, yet the text on the blue is easy to read, with a contrast ratio of over 5, while the text on the green background is very hard to even see, with a contrast ratio barely over 1.

<CodePen
  user="kevinpowell"
  slug-hash="myegNOY"
  title="the problem with hsl"
  :default-tab="['css','result']"
  :theme="dark"/>

This is where `oklch()` comes in.

`oklch()` works very similarly to `hsl()`, and is based on the LCH colour space (also known as the [<VPIcon icon="fa-brands fa-wikipedia-w"/>HCL colour space](https://en.wikipedia.org/wiki/HCL_color_space)), which was created to help with perception of colours as we shift through the hues. Here, I’ve once again, started with a blue and only changed the hue valued for the green and the result: we *don’t* run into the same issue.

<CodePen
  user="piccalilli"
  slug-hash="PwZvwGp"
  title="lch to the rescue"
  :default-tab="['css','result']"
  :theme="dark"/>

With the LCH colour model, the first value is the lightness, which works on a scale of 0 to 1. The way it’s calculated is a bit different from HSL, as it’s based on the perceptual lightness, but the concept is the same, with `0` being black, and `1` being white. You can also use percentages if you’d prefer.

The hue, which is the last value, works the same way as it does in `hsl()`, with the important difference that `0` in `hsl()` is red, while `0` in `lch()` is magenta.

In this CodePen, both swatches are using the same angle for their colour, and as you can see, they’re quite different:

<CodePen
  user="piccalilli"
  slug-hash="NPxVPwY"
  title="lch vs hsl hues"
  :default-tab="['css','result']"
  :theme="dark"/>

Lastly, we have the biggest difference between the two, which is the *Chroma value*. It’s similar to the saturation of `hsl()`, with `0` being grey, and the higher the number, the more “pure” it becomes.

The scale for the Chroma is `0` to… well, **this is where things get strange**.

Theoretically, there is no upper bound on the Chroma value because colours are strange. In practice, the largest value is around `0.4`, which is what `100%` maps to if you use percentage instead of a unit-less value.

Sticking with a percentage sounds like the best solution but **the big problem with Chroma is the upper bound of it changes depending on the hue and lightness values**. This can make for some pretty unexpected results…

<CodePen
  user="piccalilli"
  slug-hash="KwVLwoG"
  title="chroma is a bit strange"
  :default-tab="['css','result']"
  :theme="dark"/>

I was *very* excited about LCH coming to CSS, but I’ve found myself sticking to `hsl()` for a lot of things because of the variable upper limit of the Chroma value, and the strange shifts that can happen like we can see above.

**As awkward as the Chroma values can be, there are still benefits to using it**. The wider gamut is nice, but knowing the perceived brightness is the same across the hues really does come in handy.

<CodePen
  user="piccalilli"
  slug-hash="QwyRKPZ"
  title="lch has some benefits"
  :default-tab="['css','result']"
  :theme="dark"/>

The hardest part is getting the initial colour. One option is to use a colour picker. [<VPIcon icon="fas fa-globe"/>This colour picker](https://oklch.com/#0.54,0.08,87.6,100) has a nice visualisation of the limits on Chroma as you change the lightness and hue.

**However, there’s another option thanks to relative colours!** In [**part one**](/piccalil.li/a-pragmatic-guide-to-modern-css-colours-part-one.md), I looked at an example of how relative colours can be useful for a toast notification, and we can improve upon that version by using `oklch()`, with the advantage of the base colours still using `hsl()`!

```css
.toast {
  --base-color: hsl(225, 87%, 56%);
}

[data-toast="info"] {
  --toast-color: oklch(from var(--base-toast-color) l c 275);
}

[data-toast="warning"] {
  --toast-color: oklch(from var(--base-toast-color) l c 80);
}

[data-toast="error"] {
  --toast-color: oklch(from var(--base-toast-color) l c 35);
}
```

As you can see here, the `oklch()` version is more consistent in its styling from one to the next. It’s most noticeable in the borders, where the contrast between the border and background changes by quite a lot in the `hsl()` versions, but there’s also a general inconsistency with the perceived saturation between each one as well.

<CodePen
  user="kevinpowell"
  slug-hash="wBMbozY"
  title="toasts with relative colors - oklch vs. hsl"
  :default-tab="['css','result']"
  :theme="dark"/>

### `oklch()` vs `lch()`

I need to mention that we have both `oklch()` and `lch()` in CSS (as well as `oklab()` and `lab()`). The purpose of the LCH colour space was to match human perception across hues as closely as possible.

It was created in 1976, and had some flaws in it, mostly with the blues and purple ranges, so in 2020, they created OKLCH as a new version of LCH, which fixes the issues with it.

If you’d like more information on the two of them, I’d suggest checking out [<VPIcon icon="fas fa-globe"/>this article](https://atmos.style/blog/lch-vs-oklch), but really you can keep it simple and simply use `oklch()`.

---

## Mixing two different colours

Relative colours are great when we want to modify a channel (or multiple channels) of a specific colour, but you might have instances where you have two different colours that you want to mix together.

For that, we have the `color-mix()` function, which allows us to mix two colours together.

```css
.purple {
  color: color-mix(in srgb, red, blue);
}
```

<CodePen
  link="https://codepen.io/kevinpowell/pen/jEbvOpX/514300329dd9a7b7c7412d9ab349a528"
  title="color-mix"
  :default-tab="['css','result']"
  :theme="dark"/>

### We have to define a colour space (for now)

You might have noticed that there is an `in srgb` as the first argument in the example above. For now, we have to define what colour space you want to use, and they can all give you some pretty different results.

<CodePen
  user="kevinpowell"
  slug-hash="MYKdwVK"
  title="color-mix"
  :default-tab="['css','result']"
  :theme="dark"/>

I generally try `oklab`, then `oklch` to start, and most of the time I’m happy with one of them, but I’ll sometimes experiment to see what the others give me.

Additionally, the CSS Working Group has recently resolved to make `oklab` the default value, so once browsers implement that change, you’ll no longer have to provide a colour space (but you will be able to if you want).

### Controlling the amount of each colour

When we use `color-mix()`, it will use 50% of each colour by default. We can control how much of a given one that that we want as well though.

```css
.red-with-a-touch-of-blue {
  background: color-mix(in oklab, red 90%, blue);
}

.or-like-this {
  background: color-mix(in oklab, red, blue 10%);
}
```

<CodePen
  user="piccalilli"
  slug-hash="xxQMvKR"
  title="Mixing 10 colours"
  :default-tab="['css','result']"
  :theme="dark"/>

### Transparency with `color-mix()`

There are two ways that you can get values that are transparent. The first one is if you have a total that is less than 100%.

```css
.semi-opaque {
  background: color-mix(in oklab, red 60%, blue 20%);
}
```

Whatever the total is, is what the alpha value will be set to, so for the code example above, the alpha value would be 80% (if the total is above 100%, the numbers are normalised to a total of 100).

<CodePen
  user="piccalilli"
  slug-hash="gbPJamY"
  title="color-mixing below 100%"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also mix with `transparent`.

```css
.thiry-percent-opacity-red {
  background: color-mix(in oklch, red 30%, transparent);
}
```

This works, but if that’s what I wanted to do, I’d probably use relative colours instead.

One thing we can use `color-mix()` for is banded gradient effects without having to figure out all the values along the way, which might be a bit of a niche use case, but it’s pretty handy how easy it is.

<CodePen
  user="piccalilli"
  slug-hash="VYeOvYE"
  title="Banded gradient"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Some of this will be easier in the future

One of the problems with a lot of these new features is the repetition involved in using them. Luckily, custom functions are coming to CSS, which will help with this.

```css
@function --lower-opacity(--color, --opacity) {
  result: oklch(from var(--color) l c h / var(--opacity);
} 

.lower-opacity-primary {
  background: --lower-opacity(var(--primary), .5); 
}
```

```css
@function --shade-100(--color) returns <color> {
  result: hsl(from var(--color) calc(h - 12) calc(s + 15) 95%);
}
@function --shade-200(--color) returns <color> {
  result: hsl(from var(--color) calc(h - 10) calc(s + 12) 85%);
}
/* etc. */

.call-to-action {
  background: --shade-200(var(--accent));
}

.hero {
  background: --shade-800(var(--primary));
  color: --shade-100(var(--primary));
}
```

---

## Things have changed a lot

While a lot of developers copy and paste values from design files, we can actually do more that what’s possible in most design apps, from colour mixing to relative colours, larger colour gamuts, and more.

While some of what we looked at does require some setup — once it’s in place, we can create very robust systems, and, along with the static world of design software, it does beg the question if more design should be [**done directly in the browser**](/piccalil.li/the-time-for-designers-to-learn-to-code-is-now.md).

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A pragmatic guide to modern CSS colours - part two",
  "desc": "Kevin is back with the follow up to part one of this series. This time, Kevin goes deep on how functional the newer colour capabilities are in practice to hopefully, encourage more designers to use their browser more often.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-pragmatic-guide-to-modern-css-colours-part-two.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
