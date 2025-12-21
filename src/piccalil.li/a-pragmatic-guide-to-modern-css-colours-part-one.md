---
lang: en-US
title: "A pragmatic guide to modern CSS colours - part one"
description: "Article(s) > A pragmatic guide to modern CSS colours - part one"
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
      content: "Article(s) > A pragmatic guide to modern CSS colours - part one"
    - property: og:description
      content: "A pragmatic guide to modern CSS colours - part one"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-pragmatic-guide-to-modern-css-colours-part-one.html
prev: /programming/css/articles/README.md
date: 2025-10-07
isOriginal: false
author:
  - name: Kevin Powell
    url : https://piccalil.li/author/kevin-powell
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/5f65c4d7705a364580800c0b75f3f74be37fc7800765c3ae88d2a0c60e667a83/png?url=https://piccalil.li/og/a-pragmatic-guide-to-modern-css-colours-part-one/&width=1024&height=526&retina=true
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
  name="A pragmatic guide to modern CSS colours - part one"
  desc="Whether you've got a firm grasp on modern CSS colour capabilities, or you're thinking 'I struggle to understand why I should use modern CSS colours at all', then the first part of this article series, by Kevin Powell, is for you."
  url="https://piccalil.li/blog/a-pragmatic-guide-to-modern-css-colours-part-one"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/5f65c4d7705a364580800c0b75f3f74be37fc7800765c3ae88d2a0c60e667a83/png?url=https://piccalil.li/og/a-pragmatic-guide-to-modern-css-colours-part-one/&width=1024&height=526&retina=true"/>

For most developers, the only time they touch colour values is when they copy them from a design file and paste them into their editor. We are developers and not designers, after all.

However, there have been a lot changes to colours in CSS over the last few years — from updates to the syntax of familiar features to all new ways of working with colours — that even copy/pasters can take advantage of.

If you’re creating your own colour schemes, or are looking to dive into ways you can apply what you know about colour theory directly inside of CSS, I’ll be exploring a lot more about that side of things in part two, but for this one I’m focusing on how the new colour features can help developers who don’t necessarily focus on design.

---

## Write colours the modern way

The way we write CSS colours has evolved, and not just from web safe hex codes to `hsl()` functions, but even the `rgb()` and `hsl()` functions you know are a little different now than they used to be.

For this section, we’re going to look at how those old features have evolved with a new syntax, because we’ll have to use that syntax with some of the features we’ll be exploring.

### You don’t need to add the “a”

In the old days, we had `rgb()` for a regular rgb colour, and when we wanted to change the opacity of it, we had to use the `rgba()` function instead. This allowed us to add the fourth value needed to control the alpha channel for the colour.

```css
/* full red */
.red {
  color: rgb(255, 0, 0);
}

/* red, 50% opacity */
.red-50 {
  color: rgba(255, 0, 0, 0.5);
}
```

These days, you can add the fourth channel without bothering with the extra character:

```css
/* full red */
.red {
  color: rgb(255, 0, 0);
}

/* red, 50% opacity - this works*/
.red-50 {
  color: rgb(255, 0, 0, 0.5);
}
```

You also don’t have to worry about browser support on this at all. When I say “these days”, I mean “[as long as you don’t have to support IE](https://caniuse.com/mdn-css_types_color_rgb_alpha_parameter)”, which you almost certainly don’t *have* to do.

Beyond that, the use of commas is now considered the “legacy syntax”, and it only works on those older colour functions. For the newer ones (some of which we’ll be looking at soon), we can’t use commas like that; we have to use the new syntax.

### The space-separated syntax

For those of you who write things out and want to save a few keystrokes, you’ll probably like the new space-separated syntax.

```css
/* this works */
.red {
  color: rgb(255 0 0);
}

.blue {
  color: hsl(226 100% 50%);
}
```

There is one very big difference with the space-separated syntax though: you can’t add a fourth value for the alpha channel. In other words, this `color: rgb(255 0 0 0.5)` won’t work.

If you opt to use the space-separated syntax, you need to use a forward slash before the alpha value:

```css
/* full red */
.red {
  color: rgb(255 0 0);
}

/* red, 50% opacity */
.red-50 {
  color: rgb(255 0 0 / 0.5);
}

.hsl-red-50 {
  color: hsl(0 100% 50% / 0.5);
}
```

I know a lot of people are looking at this and throwing up their hands in frustration as CSS *once again* throws in some random change, but this new space-separated syntax was added when more CSS colour functions were added to the spec, including `color()`, `oklch()`, and `hwb()` as a few examples, along with relative colours.

The idea was to create something to simplify authoring and allow for more consistency as new colour features were being added — some of which, like `color()` might have more values before the alpha value — and the `/` helps to quickly separate the colour values from the alpha value so you can spot it quickly while skimming.

### `hsl()` has changed a bit too

Just like with `rgb()`, when using `hsl()` you do not need the extra “a” anymore.

```css
/* full red */
.red {
  color: hsl(0deg 100% 50%);
}

/* red, 50% opacity */
.red-50 {
  color: hsl(0deg 100% 50% / .5);
}
```

Another change the CSS spec-writers made with `hsl()` is that units are now optional when we’re using the space separated syntax.

```css
.red {
  color: hsl(0deg 100% 50%);
}

.also-red {
  color: hsl(0deg 100 50);
}

.another-red {
  color: hsl(0 100% 50%);
}

.this-is-red-too {
  color: hsl(0 100 50);
}
```

So, if you’re the type who likes saving keystrokes, you can skip them if you want, but I would say it might be worth keeping the `%`, because VS Code only shows the colour swatch previews if they are used.

![A screenshot of CSS code showing different ways to write an HSL color value inside a class selector named .kind-of-annoying. The lines demonstrate using percentage signs versus unitless numbers and commas versus spaces to separate the values.](https://piccalilli.imgix.net/images/blog/vs-code-colours.png?auto=format&w=1500)

If you are using `rgb()`, however, and if you go unitless, you’re working from 0 → 255, but you can optionally use `%` instead.

```css
.green {
  color: rgb(0 255 0);
}

.also-green {
  color: rgb(0 100% 0);
}
```

I find that this can make it a bit easier to estimate the colour you are getting with `rgb()`, if you do like working with it.

If all you are doing is copying and pasting in values, none of this might seem relevant, but as I said, some of the new features only use the new space-separated syntax along with the `/`, so starting now, it starts to become important.

---

## Relative colours

Relative colours are where things start to get more interesting, even if we already have most of our colour values supplied for us.

The idea behind relative colours is that we can **make a new colour based on an existing value**.

At first, the syntax looks strange, so we’ll start with an overly simple example to start:

```css
.rgb-red {
  color: rgb(from #ff0000 r g b);
}
```

Here, we have an `rgb()` colour function, but I’m telling it that the colour is going to be based on the `#ff0000` hex (which happens to be red).

Next, we write out `r g b`. These three letters contain the red, green, and blue values from `#ff0000`, so we’ve essentially ended up with `rgb(255 0 0)`.

You’ll also notice that we’re adding spaces between each one. This is because we’re using the space separated syntax. The `r g b` aren’t just letters, those are variables that contain the values of the red, green, and blue channels from the base colour we are working from.

One of my favourite use cases with relative colours is that we can modify the alpha value as well.

```css
.rgb-red {
  color: rgb(from #ff0000 r g b);
}

.rgb-red-50 {
  color: rgb(from #ff0000 r g b / 0.5);
}
```

One of the best parts of relative colours is it doesn’t matter how your colour is defined. In the above example, I’m using an `rgb()` function, but my value is a hex value. You might be thinking hex is just a different way to write `rgb`, and you’d be correct, but I could also do this:

```css
.hsl-red {
  color: hsl(from #ff0000 h s l);
}

.hsl-red-50 {
  color: hsl(from #ff0000 h s l / 0.5);
}
```

Once again, the `h s l` part of that isn’t just some letters; those are variables that contain the hue, saturation, and lightness values from the base hex value.

Now, that example was a simple one, but since we can plug any colour in there, think of all those times you’ve had a custom property that you wanted to lower the opacity of. Using relative colours, it’s incredibly simple now:

```css
:root {
  --color-primary: #2563eb;
}

.semi-transparent-primary-background {
  background-color:
    hsl(from var(--color-primary) h s l / 0.75);
}
```

### Quick wins using relative colours

I know I said this article is mainly for people copying and pasting in values, but if there are a few inconsistencies within a design, you can get some very quick wins with the help of relative colours.

We can do this, because we can replace any of the variables we’ve pulled with a new value, so, we can create lighter and darker versions of a base colour.

```css
:root {
  --base: hsl(217 73% 50%);

  --base-light: hsl(from var(--base) h s 75%);
  --base-dark: hsl(from var(--base) h s 25%);
}
```

One of my favourite examples is something like a toast notification that might use a base colour, a darker version of it for the text, a lighter version of that same colour for the background, and a lower opacity version of that colour for a shadow.

We can easily handle that, like this:

```css
.toast {
  --toast-color: #222;

  color: hsl(from var(--toast-color) h s 15%);
  border: 2px solid var(--toast-color);
  background: hsl(from var(--toast-color) h s 90%);
  box-shadow: 0 12px 12px -8px hsl(from var(--toast-color) h s l / 0.325);
}
```

And then change the base colour as needed:

```css
[data-toast="info"] {
  --toast-color: #0362fc;
}

[data-toast="error"] {
  --toast-color: hsl(0 100% 50%);
}
```

And that would give us something like this:

<CodePen
  link="https://codepen.io/piccalilli/pen/XJXMgEB/64c4f56702893dc64d9cd4dc564f5e0e"
  title="toasts with relative colors"
  :default-tab="['css','result']"
  :theme="dark"/>

### There is *a lot* more to relative colours

We can do *a lot* more with relative colours, such as modifying the values with `calc()`. If we’re working with a design file, though, so I’m saving those for part two.

---

## Light and dark theming is *much* better now

There are a number of challenges to dealing with a site that has a light and dark theme.

Custom properties already help a lot, where we can update the custom property values depending on the theme:

```css
:root {
  /* default light theme */
  --text-heading: #000;
  --text-body: #212121;
  --surface: #efefef;
}

.dark-theme {
  --text-heading: #fff;
  --text-body: #efefef;
  --surface: #212121;
}
```

This works great, but it can be annoying if you’re updating the colour scheme both with a media query and a toggle switch (which you should have both of), because then you end up with something like this, where you have them first defined one time for the media query, and then a second time for a class which applies the theme when you use the toggle.

```css
:root {
  /* default dark theme */
  --text-heading: #000;
  --text-body: #212121;
  --surface: #efefef;

  @media (prefers-color-scheme: dark) {
    --text-heading: #fff;
    --text-body: #efefef;
    --surface: #212121;
  }
}

.light-theme {
  --text-heading: #000;
  --text-body: #212121;
  --surface: #efefef;
}

.dark-theme {
  --text-heading: #fff;
  --text-body: #efefef;
  --surface: #212121;
}
```

If we do this, then we’re either maintaining the same scheme in two places, or you define all the colours once as custom properties and then use those as the values in the parts below, which again is more work than we’d really want.

Now, we have `light-dark()` which solves this problem by allowing us to define both a light and dark colour in one declaration:

```css
:root {
  --text-heading: light-dark(#000, #fff);
  --text-body: light-dark(#212121, #efefef);
  --surface: light-dark(#efefef, #212121);
}
```

**If we only declare this, we would only have a light-theme** because `light-dark()` relies on the `color-scheme` property.

To ensure that my theme is changing based on the user’s system preferences, we would declare `color-scheme: light dark`.

```css
:root {
  /* follow the user preferences */
  color-scheme: light dark;

  --text-heading: light-dark(#000, #fff);
  --text-body: light-dark(#212121, #efefef);
  --surface: light-dark(#efefef, #212121);
}
```

And then, if we have a theme toggle, we could do something like this to lock in to either the light or dark if a user picks a theme:

```css
:root {
  /* follow the user preferences */
  color-scheme: light dark;

  --text-heading: light-dark(#000, #fff);
  --text-body: light-dark(#212121, #efefef);
  --surface: light-dark(#efefef, #212121);
}

/* if user picks a light theme */
html[data-theme="light"] {
  color-scheme: light;
}
/* if user picks a dark theme */
html[data-theme="dark"] {
  color-scheme: dark;
}
```

### We also get granular control for individual components

Maybe the nicest thing with the combination of `light-dark()` is if you have a component that should always stay with a single colour-scheme, like say, a hero section with a background image where the text has to stay white, or a call to action where the colour scheme should never change.

```css
:root {
  /* follow the user preferences */
  color-scheme: light dark;

  --text-heading: light-dark(#000, #fff);
  --text-body: light-dark(#212121, #efefef);
  --surface: light-dark(#efefef, #212121);
}

/* if user picks a light theme */
html[data-theme="light"] {
  color-scheme: light;
}
/* if user picks a dark theme */
html[data-theme="dark"] {
  color-scheme: dark;
}

.hero {
  /* won't be impacted by theme changes */
  color-scheme: light;

  background: url('a-light-image-that-needs-dark-text-on-it.webp');
}
```

---

## Colour spaces

Colour spaces are a big and complex topic, but in essence, a colour space is a **mathematical formula to figure out what any given colour looks like**. Knowing how they work isn’t important, but there are two things to keep in mind:

- There are a lot of different colour spaces out there
- All of them do their math a bit differently

The math part is the important aspect here, especially when things like gradients are involved, because a lot of math is involved in figuring out how to transition from one colour to another.

I’m sure that math is interesting for people who like that sort of thing, but for me the only part I care about is that the browser does a good job of filling in those in-between colours, and sometimes, it falls flat a little.

Or, well it used to fall flat a little because the browser only used one colour space. Now we can tell the browser which colour space to use when creating a gradient if we feel like the default isn’t good enough.

This has been particularly useful for me. My personal brand features a vibrant blue-to-red gradient. If I use a `linear-gradient()` with only the blue and red values, I get a washed out middle, which I didn’t particularly like. I used to have have to declare a 3rd colour to keep things looking vibrant throughout.

```css
.gradient {
  --color-1: hsl(219 76 41);
  --color-2: hsl(357 68 53);

  background: linear-gradient(90deg, var(--color-1), var(--color-2));
  height: 45vh;
  margin-block: 12px;
}

.better {
  --middle: hsl(271 52 41);
  background: linear-gradient(
    90deg,
    var(--color-1),
    var(--middle),
    var(--color-2)
  );
}
```

<CodePen
  link="https://codepen.io/piccalilli/pen/ZYbMGox/edca3a509152b91aea5cafc9d0b87ab9/"
  title="mushy middle"
  :default-tab="['css','result']"
  :theme="dark"/>

I’ve also had designs that I’m trying to copy where I might have to add two or three extra stops to ensure that it matches the design correctly. Now, instead of doing that, we can tell the browser which colour space to use to interpolate the colours in between the stops we have defined with a `linear-gradient(in <color-space>, <color>, <color>)`.

Here, I’ve removed the middle value, and instead changed the colour space to `oklch`:

```css
.gradient {
  --color-1: hsl(219 76 41);
  --color-2: hsl(357 68 53);

  background: linear-gradient(90deg, var(--color-1), var(--color-2));
  height: 30vh;
  margin-block: 12px;
}

.better {
  background: linear-gradient(in oklch 90deg, var(--color-1), var(--color-2));
}
```

<CodePen
  link="https://codepen.io/piccalilli/pen/NPGLqzp/377eab6e7fbcf83e5af8716462899364/"
  title="mushy middle 2"
  :default-tab="['css','result']"
  :theme="dark"/>

The only real problem with this is that different colour spaces might work better for different gradients, so it sometimes does take a bit of poking around.

Options include `lch` and `oklch`, `lab` and `oklab`, `hwb`, `xyz`. When we don’t define a colour space, the default is `srgb`.

I find that `oklch` gets me what I’m looking for most of the time, but I’ll often try a few of them to see which looks best.

While it’ll probably be quite rare that you need a full rainbow gradient, we can do that type of thing with only two colour stops now as well. Normally, the browser looks at the two colours you’ve given it, and it finds the shortest path between the two of them and fills in the middle for you.

If you want a rainbow, it used to mean specifying each stop so that it wouldn’t take any shortcuts.

Now, we can tell it to take the long way around instead by saying `longer hue` like I have done here.

```css
.gradient {
  --color-1: red;
  --color-2: red;
}

.gradient.default {
  background: linear-gradient(in oklch 90deg, var(--color-1), var(--color-2));
}

.gradient.long-way {
  background: linear-gradient(
    in hsl longer hue 90deg,
    var(--color-1),
    var(--color-2)
  );
}

```

<CodePen
  link="https://codepen.io/piccalilli/pen/bNVxvra/9458448c0ff6889821292a3fe58dcd9e/"
  title="Rainbow"
  :default-tab="['css','result']"
  :theme="dark"/>

For this to work, you do need to specify what colour space you’re using, and as far as I can tell, it has to be one that has a hue value, so any of `hsl()`, `lch()`, or `oklch()`.

The default is `shorter` so there’s no need to define that, and there is also `increasing` and `decreasing`, but in my experience it’s much harder to predict what will happen with those because it looks at the actual number of the hue and whether it’s increasing or decreasing between the two stops. I find switching to `longer` is what I do 99% of the time I use this.

---

## When someone needs a specific colour

You might have a client who has a logo that uses a bright [<VPIcon icon="fa-brands fa-wikipedia-w"/>Pantone](https://en.wikipedia.org/wiki/Pantone) green, or some other colour that is impossible to match.

That’s because hex, `rbg()` and `hsl()` all use the sRGB colour space.

I mentioned that each colour space does the math a little differently, and what that also means is the range of colours for each one is different. `sRGB` was fine for a long time because our monitors were limited to the `sRGB` colour range, or if you’re old enough, you may even remember the days of web-safe colours.

As a quick aside, the range of colours in a given space is called its *gamut*, so you may hear someone say one colour space has a larger colour gamut than another space, meaning it can create more colours, or it has a wide gamut, meaning that it supports a wide range of colours, usually compared to `sRGB`.

Today, a lot of devices have screens that support much wider colour gamuts, with phones having particularly wide colour gamuts.

One way that we can explore these new colour spaces is the `color()` function. I don’t normally use it, but if I had someone asking for a very specific colour, I might open up a [<VPIcon icon="fas fa-globe"/>a colour picker](https://p3colorpicker.cool/) for it and do my best to match it.

The nice thing with this is that if a browser doesn’t support the wider colour space, it will render whatever it can. We can even visualise this using Chrome’s DevTools, where if you have a display-p3 colour and you click on the colour swatch, it will show you your colour, but it will also show the limit of a monitor that uses sRGB.

![A colour picker shows a curved line, representing the available colours to the sRGB colour space](https://piccalilli.imgix.net/images/blog/srgb-colour-space-picker.png?auto=format&w=1500)

I don’t find myself using display-p3 often, but it can help in a pinch.

---

## There is a lot more

There are *so* many more things we can do with colours in CSS today, including new features like `color-mix()`, as well as the creative ways we can use relative colours, and even new colour functions like `oklch()`… but I think what we went over in this article are the most useful features for developers who aren’t trying to pick their own colours or do any colour manipulation.

If you’re curious about what some of those features can do, keep an eye out for part two where I’ll be diving into them a lot more.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A pragmatic guide to modern CSS colours - part one",
  "desc": "Whether you've got a firm grasp on modern CSS colour capabilities, or you're thinking 'I struggle to understand why I should use modern CSS colours at all', then the first part of this article series, by Kevin Powell, is for you.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-pragmatic-guide-to-modern-css-colours-part-one.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
