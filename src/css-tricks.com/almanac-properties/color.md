---
lang: en-US
title: "color"
description: "Article(s) > color"
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
      content: "Article(s) > color"
    - property: og:description
      content: "color"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/almanac-properties/color.html
prev: /programming/css/articles/README.md
date: 2011-09-05
isOriginal: false
author:
  - name: Sara Cope
    url : https://css-tricks.com/author/saracope/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="color"
  desc="The color property in CSS sets the color of text and text decorations."
  url="https://css-tricks.com/almanac-properties/color"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

The `color` property in CSS sets the color of text and text decorations.

```css
p {
  color: blue;
}
```

---

## Values

The `color` property can accept any CSS color value.

- Named colors: for example, “aqua”.
- Hex colors: for example, #00FFFF or #0FF.
- RGB and RGBa colors: for example, rgb(0, 255, 255) and rgba(0, 255, 255, .5).
- HSL and HSLa colors: for example, hsl(180, 100%, 50%) and hsla(180, 100%, 50%, .5).

### Named Colors

```css
p {
  color: aqua;
}
```

Named colors are also known as keyword colors, X11 colors, or SVG colors. All named colors are opaque by default *except* `transparent`, which is fully transparent or “clear”. See our [**Named Colors and Hex Equivalents**](/css-tricks.com/snippets-css/named-colors-and-hex-equivalents.md) snippet for a list of the named colors.

### Hex Colors

Hex colors, or hexidecimal colors, are specified with alphanumeric values. The first pair of characters represents the red value, the second pair represents the green value, and the third pair represents the blue value, all in a range from 00 to FF.

```css
p {
  color: #00FFFF;
}
```

If the pairs of red, blue, and green values are all doubles, you can abbreviate the hex value to 3-character shorthand — for example, #00FFFF can be abbreviated to #0FF.

```css
.full-hex {
  color: #00FFFF; /* aqua */
}
.abbreviated-hex {
  color: #0FF; /* also aqua */
}
```

### RGB and RGBa Colors

RGB colors are specified with a comma-separated list of three numeric values (ranging from 0 to 255) or percentage values (ranging from 0% to 100%). The first value represents the red value, the second represents the green value, and the third represents the blue value. RGB colors are opaque by default.

```css
p {
  color: rgb(0, 255, 255);
}
```

RGBa adds a fourth value for the alpha channel, which sets the opacity of the color. The alpha value is a number within a range from 0.0 (fully transparent) to 1 (fully opaque).

```css
p {
  color: rgba(0, 255, 255, .5);
}
```

### HSL and HSLa Colors

HSL colors are specified with a comma-separated list of three values: the degree of **Hue** (a number ranging from 0 to 360), a **Saturation** percentage (ranging from 0% to 100%), and a **Lightness** percentage (ranging from 0% to 100%). HSL colors are opaque by default.

```css
p {
  color: hsl(180, 100%, 50%);
}
```

HSLa adds a fourth value for the alpha channel to control the color’s opacity. The alpha value is a number within a range from 0.0 (fully transparent) to 1 (fully opaque).

```css
p {
  color: hsla(180, 100%, 50%, .5);
}
```

---

## Demo

<!-- <CodePen
  link="https://codepen.io/team/css-tricks/pen/ZYgjjq/41e4ddd98fd0c8e06e4d75b5027854fc"
  title="color values"
  :default-tab="['css','result']"
  :theme="dark"/> -->

---

## Usage Notes

The `color` property cascades. If you set it on the body, all descendant elements will inherit that color, unless they have their own color set in the user agent stylesheet.

Borders inherit `color` unless a color value is specified in the [**`border`**](/css-tricks.com/almanac-properties/border.md) declaration.

The `color` property applies to [**`text-decoration`**](/css-tricks.com/almanac-properties/text-decoration.md)` lines. In browsers that support the `[**text-decoration-color**](/css-tricks.com/almanac-properties/text-decoration-color.md)` property, you can specify different colors for text and its decoration lines.

`color` also applies to list item markers (like bullet points and numbers). You can’t set a separate color for a list item marker, but you can replace it with an image with the [**`list-style`**](/css-tricks.com/almanac-properties/list-style.md) property.

Though named colors and hex colors don’t have alpha channels, you can set their opacity with the [**`opacity`**](/css-tricks.com/almanac-properties/opacity.md)` property in all current browsers and IE9+.

::: info Related

<!-- TODO: /css-tricks.com/almanac-properties/font.md -->
<!-- TODO: /css-tricks.com/almanac-properties/text-decoration-color.md -->
<!-- TODO: /css-tricks.com/almanac-properties/opacity.md -->

:::

::: info More Information

```component VPCard
{
  "title": "3.1. Foreground color: the ‘color’ property - CSS Color Module Level 3",
  "desc": "This property describes the foreground color of an element's text content. In addition it is used to provide a potential indirect value (currentColor) for any other properties that accept color values. If the ‘currentColor’ keyword is set on the ‘color’ property itself, it is treated as ‘color: inherit’.",
  "link": "https://w3.org/TR/css-color-3/#foreground/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

<SiteInfo
  name="color - CSS | MDN"
  desc="The color CSS property sets the foreground color value of an element's text and text decorations, and sets the currentColor value. currentColor may be used as an indirect value on other properties and is the default for other color properties, such as border-color."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<!-- TODO: /css-tricks.com/yay-for-hsla.md -->

::: info Browser Support

<BaselineStatus featureid="color" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "color",
  "desc": "The color property in CSS sets the color of text and text decorations.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/almanac-properties/color.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
