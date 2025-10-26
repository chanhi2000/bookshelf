---
lang: en-US
title: "HSL and HSLA vs. RGB and RGBA in CSS"
description: "Article(s) > HSL and HSLA vs. RGB and RGBA in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > HSL and HSLA vs. RGB and RGBA in CSS"
    - property: og:description
      content: "HSL and HSLA vs. RGB and RGBA in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css.html
prev: /programming/css/articles/README.md
date: 2022-09-16
isOriginal: false
author:
  - name: Rahul Chhodde
    url: https://blog.logrocket.com/author/rahulchhodde/
cover: /assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/banner.png
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
  name="HSL and HSLA vs. RGB and RGBA in CSS"
  desc="This article explains the differences between HSL and RGB in CSS and how to use the CSS HSL functions to create flexible color systems."
  url="https://blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/banner.png"/>

HSL colors in CSS have been around for over ten years, but I’ve found that they’re still often underutilized. Despite its great utility, many developers avoided the HSL CSS function due to its limited browser support.

As browser support for the HSL color model has grown strong, it’s becoming increasingly popular among developers and designers alike. Frontend developers may find it helpful to be familiar with HSL, particularly for creating quick and flexible color variations in Figma and CSS.

This article explains the differences between HSL and RGB in CSS and how to use the CSS HSL functions to create flexible color systems.

---

## Overview of colors in CSS

If you know how CSS works, you likely also know about named colors, hexadecimal colors, and RGB colors. [**All three of them represent colors and their usage in CSS**](/blog.logrocket.com/advanced-guide-setting-colors-css.md).

Named colors are predefined color values like `black`, `white`, `red`, `green`, etc. The problem with named colors is that they are limited, and there is no way to tweak them to get a variety of colors.

The hexadecimal model is free from that obligation and allows you to pick colors using hex codes. However, the model lacks flexibility for color manipulation on its own. That’s where RGB and HSL step in.

---

## The difference between RGB and HSL

Named colors are easily readable but are not flexible enough to create variations. Colors with hexadecimal values are even worse and have poor readability, making color variation nearly impossible.

The example below illustrates a quick comparison between named and hex colors. It also shows how difficult it is to predict a color by reading its corresponding hex color code.

<CodePen
  user="_rahul"
  slug-hash="OJvqJvp"
  title="Named and Hex Colors in CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

These problems are easy to fix with RGB and HSL functions in CSS, but before we start implementing them, let’s look at what they offer.

---

## RGB and RGBA

[**The RGB color function in CSS**](/blog.logrocket.com/exploring-css-color-module-level-5.md) allows you to specify red, green, and blue parametric values to generate colors. The outcome will be a mix of all three of these values.

All three of the values may vary from 0-255, and it’s tricky to contemplate the outcome without referencing a color wheel tool.

The RGB function in CSS also takes an optional fourth parameter, responsible for the opaqueness of the final color. It is often specified using the RGBA function, but modern browsers allow you to add an alpha value in the RGB function itself.

```css
.selector {
  color: rgb(255, 0, 0); /* Red or #ff0000 */
  color: rgba(255, 0, 0, .75); /* Red with a 75% fill */
  color: rgb(255 0 0 / 75%); /* A shorthand to the `rgba()` function
}
```

Frontend developers often use RGBA hurriedly to create borders and lighter variations of colors. This is to avoid the tedious task of calculating red, green, and blue values to get a particular shade or tint.

The below example demonstrates this by implementing transparent versions of white over dark colors. The problem here is that the colors are not pure, as we have to rely on the fill opacity to generate them.

<CodePen
  user="_rahul"
  slug-hash="oNqVWVQ"
  title="Color variations with RGB Alpha"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

There are use cases where opaque color versions may not meet accessibility requirements and don’t look great in general. For instance, the layering of elements easily becomes messy with opaque colors.

Another such use case could be a change in the background color, demanding many other adjustments, such as opaque foreground and text colors.

Apart from all that, you would still need to use the color wheel tool to grab the correct RGB values for suitable darker variations.

```css
#podrocket-plug {
  border-radius: 12px;
  width: 75%;
  height: 352px;
  margin: 1rem auto;
  display: block;
}
```

---

## HSL and HSLA

Instead of dealing with different color values like RGB, the HSL color function allows you to control the saturation and lightness of a specified color hue.

HSL stands for Hue, Saturation, and Lightness. Let’s take a closer look at it by examining its three main components.

Hue is simply a synonym for color and saturation refers to the intensity or purity of the hue. Lightness measures how much black or white mixes with a given hue.

With HSL, you can specify the hue by angle, i.e. in degrees, and saturation and lightness with percentages. A `0°` hue with `100%` saturation and lightness will give us the red color. Similarly, a `240°` hue with `50%` saturation and lightness will result in a violet-bluish shade.

![HSL Color Wheel Graphic](/assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/hsl-color-wheel.jpeg)

With the help of the chart above, you can remember the six different color zones of the HSL color model and effortlessly create color variations by adjusting the hue, saturation, and lightness accordingly. We’ll cover that in an upcoming section.

Here’s how the HSL color model is used in CSS with `hsl` and `hsla` functions:

```css
.selector {
  color: hsl(120, 50, 50); /* A shade of green */
  color: hsla(120, 50, 50, .45); /* Green with a 75% fill */
  color: hsl(120 50% 20% / 45%); /* A shorthand to the `hsla()` function
}
```

---

## Why use HSL in CSS?

As discussed in the above segments, colors are commonly represented on the web using hex and RGB, but neither of these is the best way to do so.

It’s hard to predict a color by looking at hex or RGB code, making it difficult to create color variations with them. HSL solves this problem by representing colors as hue, saturation, and lightness. All three of them are the attributes humans intuitively perceive.

The best part is that you can use HSL in any modern design tool like Figma, Adobe XD, and Sketch. In the next segment, we’ll work with CSS and a bit of Figma to experience the ease of creating and adjusting color values with the HSL color model.

---

## Flexible color systems with HSL

We only need one value with HSL, with which we can create numerous shades or tints. The trick lies in adjusting the saturation and lightness values for a given hue.

Let’s pick three color swatches in Figma and call them primary, secondary, and accent colors.

![Figma Color Swatches](/assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/figma-color-swatches.jpeg)

The primary color is the one that takes a majority (60 percent) of net color usage in our UI. The secondary one takes up 30 percent of the net area, usually text. The remaining 10 percent could be the highlighted sections that utilize the accent color.

I’ve chosen colors that I see fit well with my UI needs. You can also use a ready-made color scheme from the web.

Let’s take the primary color, create its copies, and modify its saturation and lightness values while keeping the hue constant.

![Modifying Saturation And Lightness While Keeping Hue The Same In Figma](/assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/figma-modifying-saturation.jpeg)

Similarly, you can create more variations like that; the below image depicts the same with five different shades and tints. As an exercise, you can try both darker and lighter variations for a given color hue.

![Figma Color System](/assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/figma-color-system.webp)

Quick tip: always check your colors for contrast and accessibility standards with [<VPIcon icon="fa-brands fa-figma"/>the Color Contrast Checker Plugin](https://figma.com/community/plugin/733159460536249875/A11y---Color-Contrast-Checker).

### Color variations with the CSS HSL function

After determining the HSL value for a color swatch, we can use the CSS custom properties to constantly maintain and repeat the selected hue, even as we modify the saturation and lightness to obtain different shades and tints.

From our Figma example above, let’s pick the accent color’s hue and create some color swatches with it using the CSS HSL function.

![Css Hsl Function](/assets/image/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css/figma-css-hsl-function.jpeg)

With a hue value of `217`, our accent color has a saturation of `50%` and a lightness of `40%`. Here’s how we can use this information in CSS and create our main primary color swatch:

```css
:root {
  --accent-color-hue: 217;
  --accent-color-900: hsl(var(--accent-color-hue) 50% 40%);
}
```

Similarly, we can add more variations like we did in the Figma example by adding appropriate saturation and lightness values:

```css
:root {
  --accent-color-hue: 217;
  --accent-color-900: hsl(var(--accent-color-hue) 50% 40%);
  --accent-color-800: hsl(var(--accent-color-hue) 40% 50%);
  --accent-color-700: hsl(var(--accent-color-hue) 30% 60%);
}
```

If you are not into design, you still can easily modify the saturation and lightness parameters and come up with new color palettes. You can get better at remembering color hue zones by referring to the HSL color wheel chart shared in a previous section.

All of these variations are pure, solid colors. For opaque colors, you can always specify the fourth parameter of the CSS HSL function. Below is a simple implementation of creating and using color palettes with CSS HSL function and custom properties:

GRxLgax
Timless Color Palettes with CSS HSL function and Custom properties

A great eye for color automatically picks great colors. The only way to achieve that is to observe and work with colors frequently. If you don’t have an art or design background, I recommend you read more about [<VPIcon icon="fa-brands fa-wikipedia-w"/>the basics of color theory](https://en.wikipedia.org/wiki/Color_theory) before working with color professionally.

---

## Conclusion

And that’s it! We started with a brief introduction and then discussed hexadecimal, RGB, and named colors. We also learned about caveats with each one of them. Following that, we discuss the benefits of HSL over the other three color models.

We discussed how HSL is used in Figma to create color variations and learned how to use them with CSS. We can now generate timeless color palettes and incorporate them into UIs!

I hope you learned something new through this tutorial. Should you get stuck, let me know in the comments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HSL and HSLA vs. RGB and RGBA in CSS",
  "desc": "This article explains the differences between HSL and RGB in CSS and how to use the CSS HSL functions to create flexible color systems.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/hsl-hsla-vs-rgb-rgba-css.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
