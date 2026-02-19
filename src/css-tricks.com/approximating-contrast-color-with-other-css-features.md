---
lang: en-US
title: "Approximating contrast-color() With Other CSS Features"
description: "Article(s) > Approximating contrast-color() With Other CSS Features"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Approximating contrast-color() With Other CSS Features"
    - property: og:description
      content: "Approximating contrast-color() With Other CSS Features"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/approximating-contrast-color-with-other-css-features.html
prev: /programming/css/articles/README.md
date: 2026-02-11
isOriginal: false
author:
  - name: Kevin Hamer
    url: https://css-tricks.com/author/kevinhamer/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/apca-wcg-color-contrast.png
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
  name="Approximating contrast-color() With Other CSS Features"
  desc="The new contrast-color() function is not fully supported yet. But can we still implement it in a cross-browser friendly way using other new CSS features?"
  url="https://css-tricks.com/approximating-contrast-color-with-other-css-features"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/apca-wcg-color-contrast.png"/>

You have an element with a configurable background color, and you’d like to calculate whether the foreground text should be light or dark. Seems easy enough, especially knowing how mindful we ought to be with accessibility.

There have been a few drafts of a specification function for this functionality, most recently, [**`contrast-color()`**](/css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md) (formerly `color-contrast()`) in the [<VPIcon icon="iconfont icon-w3c"/>CSS Color Module Level 5 draft](https://drafts.csswg.org/css-color-5/#contrast-color). But with Safari and Firefox being the only browsers that have implemented it so far, the final version of this functionality is likely still a ways off. There has been a lot of functionality added to CSS in the meantime; enough that I wanted to see whether we could implement it in a cross-browser friendly way today. Here’s what I have:

```css
color: oklch(from <your color> round(1.21 - L) 0 0);
```

Let me explain how I got here.

---

## WCAG 2.2

WCAG provides the formulas it uses for calculating the contrast between two RGB colors and [**Stacie Arellano has described in great detail**](/css-tricks.com/understanding-web-accessibility-color-contrast-guidelines-and-ratios.md#what-does-the-ratio-mean). It’s based on older methods, calculating the *luminance* of colors (how perceptually bright they appear) and even tries to clamp for the limitations of monitors and screen flare:

```plaintext
L1 + 0.05 / L2 + 0.05
```

…where the lighter color (`L1`) is on the top. Luminance ranges from 0 to 1, and this fraction is responsible for contrast ratios going from 1 (1.05/1.05) to 21 (1.05/.05).

The formulas for calculating the luminance of RGB colors are even messier, but I’m only trying to determine whether white or black will have higher contrast with a given color, and can get away with simplifying a little bit. We end up with something like this:

```plaintext
L = 0.1910(R/255+0.055)^2.4 + 0.6426(G/255+0.055)^2.4 + 0.0649(B/255+0.055)^2.4
```

Which we *can* convert into CSS like this:

```css
calc(.1910*pow(r/255 + .055,2.4)+.6426*pow(g/255 + .055,2.4)+.0649*pow(b/255 + .055,2.4))
```

We can make this whole thing round to 1 or 0 using [**`round()`**](/css-tricks.com/almanac-functions/round.md), 1 for white and 0 for black:

```css
round(.67913 - .1910*pow(r/255 + .055, 2.4) - .6426*pow(g/255 + .055, 2.4) - .0649*pow(b/255 + .055, 2.4))
```

Let’s multiply that by 255 and use it for all three channels with [**the relative color syntax**](/css-tricks.com/css-color-functions.md#the-relative-color-syntax). We end up with this:

```css
color: rgb(from <your color>  
  round(173.178 - 48.705*pow(r/255 + .055, 2.4) - 163.863*pow(g/255 + .055, 2.4) - 16.5495*pow(b/255 + .055, 2.4), 255)  
  round(173.178 - 48.705*pow(r/255 + .055, 2.4) - 163.863*pow(g/255 + .055, 2.4) - 16.5495*pow(b/255 + .055, 2.4), 255)  
  round(173.178 - 48.705*pow(r/255 + .055, 2.4) - 163.863*pow(g/255 + .055, 2.4) - 16.5495*pow(b/255 + .055, 2.4), 255)  
);
```

<CodePen
  user="anon"
  slug-hash="xbOqZoK"
  title="Approximating WCAG with CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

A formula that, given a color, returns white or black based on WCAG 2. It’s not easy to read, but it works… except [<VPIcon icon="fas fa-globe"/>APCA](https://git.myndex.com/) is [**poised to replace it as a newer, better formula in future WCAG guidelines**](/smashingmagazine.com/wcag-3-proposed-scoring-model-shift-accessibility-evaluation.md). We can do the math again, though APCA is an even more complicated formula. We could leverage CSS functions to clean it up a little, but ultimately this implementation is going to be inaccessible, hard to read, and difficult to maintain.

---

## New Approach

I took a step back and thought about what else we have available. We do have another new feature we can try out: [**color spaces**](/css-tricks.com/color-everything-in-css.md#color-spaces). The “`L*`” value in the CIELAB color space represents *perceptual lightness*. It is meant to reflect what our eyes can see. It’s not the same as luminance, but it’s close. Maybe we could guess whether to use black or white for better contrast based on perceptual lightness; let’s see if we can find a number where any color with lower lightness we use black, and higher lightness we use white.

You might instinctively think it should be 50% or .5, but it isn’t. A lot of colors, even when they’re bright, still contrast better with white than black. Here’s some examples using [**`lch()`**](/css-tricks.com/almanac-functions/lch.md), slowly increasing the lightness while keeping the hue the same:

<CodePen
  user="anon"
  slug-hash="xbOEPYM"
  title="White Vs Black LCH 50 to 75"
  :default-tab="['css','result']"
  :theme="dark"/>

The transition point where it’s easier to read the black text than white usually happens between 60-65. So, I put together a quick Node app using [<VPIcon icon="fas fa-globe"/>Colorjs.io](http://Colorjs.io) to calculate where the cut off should be, using APCA for calculating contrast.

For [**`oklch()`**](/css-tricks.com/almanac-functions/oklch.md), I found the threshold to be between .65 and .72, with an average of .69. In other words:

- When the OKLCH lightness is .72 or above, black will always contrast better than white.
- Below .65, white will always contrast better than black.
- Between .65 and .72, typically both black and white have contrasts between 45-60. So, just using `round()` and the upper bound of .72, we can make a new, shorter implementation:

```css
color: oklch(from <your color> round(1.21 - L) 0 0);
```

<CodePen
  user="anon"
  slug-hash="VYjKyJM"
  title="Approximating APCA with OKLCH"
  :default-tab="['css','result']"
  :theme="dark"/>

If you’re wondering where 1.21 came from, it’s so that .72 rounds down and .71 rounds up: `1.21 - .72 = .49` rounds down, and `1.21 - .71 = .5` rounds up.

This formula works pretty well, having put a couple iterations of this formula into production. It’s easier to read and maintain. That said, this formula more closely matches APCA than WCAG, so sometimes it disagrees with WCAG. For example, WCAG says black has a higher contrast (4.70 than white at 4.3) when placed on `#407ac2`, whereas APCA says the opposite: black has a contrast of 33.9, and white has a contrast of 75.7. The new CSS formula matches APCA and shows white:

![A blue rectangle with white and black text compared on top. White says APCA and black says WCAG.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/blue-bg-white-black-text.png?resize=400%2C184&ssl=1)

Arguably, this formula may do a better job than WCAG 2.0 because it more closely matches APCA. That said, you’ll still need to check accessibility, and if you’re held legally to WCAG instead of APCA, then maybe this newer simpler formula is less helpful to you.

---

## LCH vs. OKLCH

I did run the numbers for both, and aside from OKLCH being designed to be a better replacement for LCH, I also found that the numbers support that OKLCH is a better choice.

With LCH, the gap between too dark for black and too light for white is often bigger, and the gap moves around more. For example, `#e862e5` through `#fd76f9` are too dark for black and too light for white. With LCH, that runs between lightness 63 through 70; for OKLCH, it’s .7 through .77. The scaling of OKLCH lightness just better matches APCA.

---

## One Step Further

While “most-contrast” will certainly be better, we can implement one more trick. Our current logic simply gives us white or black (which is what [**the `color-contrast()` function is currently limited to**](/css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md#the-shortcomings-of-contrast-color)), but we can change this to give us white or another given color. So, for example, white or the base text color. Starting with this:

```css
color: oklch(from <your color> round(1.21 - L) 0 0);  

/* becomes: */

--white-or-black: oklch(from <your color> round(1.21 - L) 0 0);  
color: rgb(  
  from color-mix(in srgb, var(--white-or-black), <base color>)  
  calc(2*r) calc(2*g) calc(2*b)  
);
```

<CodePen
  user="anon"
  slug-hash="KwMWVjB"
  title="Approximating APCA with OKLCH with a base text color."
  :default-tab="['css','result']"
  :theme="dark"/>

It’s some clever math, but it isn’t pleasant to read:

- **If `--white-or-black` is white**, [**`color-mix()`**](/css-tricks.com/almanac-functions/color-mix.md) results in `rgb(127.5, 127.5, 127.5)` or brighter; doubled we’re at `rgb(255, 255, 255)` or higher, which is just white.
- **If `--white-or-black` is black**, `color-mix()` cuts the value of each RGB channel by 50%; doubled we’re back to the original value of the `<base color>`.

Unfortunately, this formula doesn’t work in Safari 18 and below, so you need to target Chrome, Safari 18+ and Firefox. However, it does give us a way with pure CSS to switch between white and a base text color, instead of white and black alone, and we can fallback to white and black in Safari <18. You can also rewrite these both using [**CSS Custom Functions**](/css-tricks.com/css-functions-and-mixins-module-notes.md), but those aren’t supported everywhere yet either:

```css
@function --white-black(--color) {  
  result: oklch(from var(--color) round(1.21 - l) 0 0);  
}

@function --white-or-base(--color, --base) {  
  result: rgb(from color-mix(in srgb, --white-black(var(--color)), var(--base)) calc(2*r) calc(2*g) calc(2*b));  
}
```

<CodePen
  user="anon"
  slug-hash="xbOqVKK"
  title="Approximating APCA with OKLCH CSS @functions"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

I hope this technique works well for you, and I’d like to reiterate that the point of this approach — looking for a threshold and a simple formula — is to make the implementation flexible and easy to adapt to your needs. You can easily adjust the threshold to whatever works best for you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Approximating contrast-color() With Other CSS Features",
  "desc": "The new contrast-color() function is not fully supported yet. But can we still implement it in a cross-browser friendly way using other new CSS features?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/approximating-contrast-color-with-other-css-features.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
