---
lang: en-US
title: "How to manipulate CSS colors with JavaScript"
description: "Article(s) > How to manipulate CSS colors with JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - javascript
  - js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to manipulate CSS colors with JavaScript"
    - property: og:description
      content: "How to manipulate CSS colors with JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-manipulate-css-colors-with-javascript.html
prev: /programming/js/articles/README.md
date: 2019-03-12
isOriginal: false
author:
  - name: Adam Giese
    url : https://blog.logrocket.com/author/adamgiese/
cover: /assets/image/blog.logrocket.com/how-to-manipulate-css-colors-with-javascript/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to manipulate CSS colors with JavaScript"
  desc="Colors are an integral part of creating rich webpages. This tutorial covers how CSS notates colors and how you can manipulate them with JavaScript."
  url="https://blog.logrocket.com/how-to-manipulate-css-colors-with-javascript-fb547113a1b8"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-manipulate-css-colors-with-javascript/banner.png"/>

## Color models101

I know you’re here to learn about manipulating colors  —  and we’ll get there. But before we do, we need a baseline understanding of how CSS notates colors. CSS uses two different color models: RGB and HSL. Let’s take a quick look at both.

### RGB

![How To Manipulate CSS Colors With JavaScript](/assets/image/blog.logrocket.com/how-to-manipulate-css-colors-with-javascript/banner.png)

An initialism for “red, green, blue,” [RGB (<VPIcon icon="fa-brands fa-codepen"/>`AdamGiese`)](https://codepen.io/AdamGiese/full/5783951de51e0db0f569d5abbd9cb2f7) consists of three numbers that each signify how much light of its respective color is included in the resulting end color. In CSS, each of these numbers is in the range of 0-255 and would be written as comma-separated parameters of the CSS `rgb` function. For example, `rgb(50,100,0)`.

RGB is an “additive” color system, which means that the higher each number is, the brighter the end color will be. If all values are equal, the color will be grayscale; if all values are zero, the result will be black; and if all values are 255, the result will be white.

Alternatively, you can notate RGB colors using the hexadecimal notation, in which each color’s integer is converted from base 10 to base 16. For example, `rgb(50,100,0)` would be `#326400`.

Although I usually find myself reaching for RGB (particularly hexadecimal) out of habit, I often find that it is hard to read and especially hard to manipulate. Enter HSL.

### HSL

An initialism for “hue, saturation, light,” [HSL (<VPIcon icon="fa-brands fa-codepen"/>`AdamGiese`)](https://codepen.io/AdamGiese/full/989988044f3b8cf6403e3c60f56dd612) also consists of three values. The hue value corresponds to the position on the color wheel and is represented by a CSS angle value; most commonly, deg units are used.

Saturation, represented by a percentage, refers to the intensity of the color. When saturation is 100 percent, it is fully colored; the less saturation, the less color, until it reaches grayscale at 0 percent.

Lightness, also represented by a percentage, refers to how bright a color is. “Regular” brightness is 50 percent. A lightness of 100 percent will be pure white, and 0 percent lightness will be pure black, regardless of the hue and saturation values.

I find HSL to be a more intuitive model. Relations between colors are more immediately evident, and manipulation of colors tends to be as simple as tweaking just one of the numbers.

---

## Conversion between colormodels

Both the RGB and HSL color models break down a color into various attributes. To convert between the syntaxes, we first need to calculate these attributes.

With the exception of hue, each value we have discussed can be represented as a percentage. Even the RGB values are byte-sized representations of percentages. In the formulas and functions below, these percentages will be represented by decimals between 0 and 1. I would like to note that I will not cover the math for these in depth; rather, I will briefly go over the original mathematical formula and then convert it into a JavaScript formula.

### Calculating lightness fromRGB

Lightness is the easiest of the three HSL values to calculate. Mathematically, the formula is displayed as follows, where `M` is the maximum of the RGB values and `m` is the minimum:

$$
L=\frac{1}{2}\left(M+m\right)
$$
<!-- ![](https://storage.googleapis.com/blog-images-backup/0*mZxFLQvMNraVQWQS.png) -->

> The mathematic formula for lightness

Here is the same formula as a JavaScript function:

```js
const rgbToLightness = (r,g,b) => 
    1/2 * (Math.max(r,g,b) + Math.min(r,g,b));
```

### Calculating saturation fromRGB

Saturation is only slightly more complicated than lightness. If the lightness is either 0 or 1, then the saturation value will be 0. Otherwise, it follows the mathematical formula below, where `L` represents lightness:

$$
S=\frac{M-m}{1-\lvert{2L-1}\rvert}
$$
<!-- ![](https://storage.googleapis.com/blog-images-backup/0*xZf55x3WTTJUIAG3.png) -->

> The mathematical formula for saturation

As JavaScript:

```js
const rgbToSaturation = (r,g,b) => {
  const L = rgbToLightness(r,g,b);
  const max = Math.max(r,g,b);
  const min = Math.min(r,g,b);
  return (L === 0 || L === 1)
    ? 0
    : (max - min)/(1 - Math.abs(2 * L - 1));
};
```

### Calculating hue fromRGB

The formula for calculating the hue angle from RGB coordinates is a bit more complex:

$$
h=\text{atan2}\left(\sqrt{3}\cdot\left(G-B\right),2\cdot{R-G-B}\right)
$$
<!-- ![](https://storage.googleapis.com/blog-images-backup/0*oLI0PhBJhkE8BK_e.png) -->

> The mathematical formula forhue

```js
const rgbToHue = (r,g,b) => Math.round(
  Math.atan2(
    Math.sqrt(3) * (g - b),
    2 * r - g - b,
  ) * 180 / Math.PI
);
```

The multiplication of `180 / Math.PI` at the end is to convert the result from radians to degrees.

### Calculating HSL

All of these functions can be wrapped into a single utility function:

```js
const rgbToHsl = (r,g,b) => {
  const lightness = rgbToLightness(r,g,b);
  const saturation = rgbToSaturation(r,g,b);
  const hue = rgbToHue(r,g,b);
  return [hue, saturation, lightness];
}
```

### Calculating RGB fromHSL

Before jumping into calculating RGB, we need a few prerequisite values.

First is the “chroma” value:

$$
C=\left(1-\lvert2L-1\rvert\right)\cdot{S}
$$
<!-- ![](https://storage.googleapis.com/blog-images-backup/0*Noxj7Gk7KGYqGfvx.png) -->

> The mathematical formula forchroma

We also have a temporary hue value, whose range we will use to decide which “segment” of the hue circle we belong on:

$$
H'=\frac{H}{60}
$$

<!-- ![](https://storage.googleapis.com/blog-images-backup/0*DgjQEdahvhEjn60j.png) -->

> The mathematical formula for hueprime

Next, we have an $x$ value, which will be used as the middle (second-largest) component value:

$$
X=C\cdot{\left(1-\lvert{H}'\:\text{mod}\:2-1\rvert\right)}
$$

<!-- ![](https://storage.googleapis.com/blog-images-backup/0*rmrqPF1miT7a-O-O.png) -->

> The mathematical formula for a temporary “x”value

We have an $m$ value, which is used to adjust each of the values for lightness:

$$
m=L-\frac{C}{2}
$$

<!-- ![](https://storage.googleapis.com/blog-images-backup/0*TwM-2sYH0uEJhu35.png) -->

> The mathematical formula for lightness match

Depending on the hue prime value, the `r`, `g`, and `b` values will map to `C`, `X`, and `0`:

$$
\left(R_{1},G_{1},B_{1}\right)=\begin{cases}\left(C,X,0\right)&\text{if}\:0\ge{H'}\ge{1}\\\left(X,C,0\right)&\text{if}\:1\ge{H'}\ge{2}\\\left(0,C,X\right)&\text{if}\:2\ge{H'}\ge{3}\\\left(0,X,C\right)&\text{if}\:3\ge{H'}\ge{4}\\\left(X,0,C\right)&\text{if}\:4\ge{H'}\ge{5}\\\left(C,0,X\right)&\text{if}\:5\ge{H'}\ge{6}\end{cases}
$$
<!-- ![](https://storage.googleapis.com/blog-images-backup/0*k1pxEnWMU-rDQYIG.png) -->

> The mathematical formula for RGB values without accounting for lightness

Lastly, we need to map each value to adjust for lightness:

$$
\left(R,G,B\right)=\left(R_{1}+m,G_{1}+m,B_{1}+m\right)
$$

<!-- ![](https://storage.googleapis.com/blog-images-backup/0*Vlii9C8Cum3apLK-.png) -->

The mathematical formula to account for lightness withRGB

Putting all of this together into a JavaScript function:

```js
const hslToRgb = (h,s,l) => {
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const hPrime = h / 60;
  const X = C * (1 - Math.abs(hPrime % 2 - 1));
  const m = l - C/2;
  const withLight = (r,g,b) => [r+m, g+m, b+m];
  if (hPrime <= 1) {
    return withLight(C,X,0); 
  } else if (hPrime <= 2) {
    return withLight(X,C,0); 
  } else if (hPrime <= 3) {
    return withLight(0,C,X); 
  } else if (hPrime <= 4) {
    return withLight(0,X,C);
  } else if (hPrime <= 5) {
    return withLight(X,0,C);
  } else if (hPrime <= 6) {
    return withLight(C,0,X);
  }
}
```

### Creating a colorobject

For ease of access when manipulating their attributes, we will be dealing with a JavaScript object. This can be created by wrapping the previously written functions:

```js
const rgbToObject = (red,green,blue) => {
  const [hue, saturation, lightness] = rgbToHsl(red, green, blue);
  return {red, green, blue, hue, saturation, lightness};
}
const hslToObject = (hue, saturation, lightness) => {
  const [red, green, blue] = hslToRgb(hue, saturation, lightness);
  return {red, green, blue, hue, saturation, lightness};
}
```

### Example

I highly encourage you to spend some time [playing with this example (<VPIcon icon="fa-brands fa-codepen"/>`AdamGiese`)](https://codepen.io/AdamGiese/full/86b353c35a8bfe0868a8b48683faf668). Seeing how each of the attributes interacts when you adjust the others can give you a deeper understanding of how the two color models fit together.

---

## Color manipulation

Now that we have the ability to convert between color models, let’s look at how we can manipulate these colors!

### Update attributes

Each of the color attributes we have covered can be manipulated individually, returning a new color object. For example, we can write a function that rotates the hue angle:

```js
const rotateHue = rotation => ({hue, ...rest}) => {
  const modulo = (x, n) => (x % n + n) % n;
  const newHue = modulo(hue + rotation, 360);
  return { ...rest, hue: newHue };
}
```

The `rotateHue` function accepts a `rotation` parameter and returns a new function, which accepts and returns a color object. This allows for the easy creation of new “rotation” functions:

```js
const rotate30 = rotateHue(30);
const getComplementary = rotateHue(180);
const getTriadic = color => {
  const first = rotateHue(120);
  const second = rotateHue(-120);
  return [first(color), second(color)];
}
```

Along the same lines, you can write functions to `saturate` or `lighten` a color  —  or, inversely, `desaturate` or `darken`.

```js
const saturate = x => ({saturation, ...rest}) => ({
  ...rest,
  saturation: Math.min(1, saturation + x),
});
const desaturate = x => ({saturation, ...rest}) => ({
  ...rest,
  saturation: Math.max(0, saturation - x),
});
const lighten = x => ({lightness, ...rest}) => ({
  ...rest,
  lightness: Math.min(1, lightness + x)
});
const darken = x => ({lightness, ...rest}) => ({
  ...rest,
  lightness: Math.max(0, lightness - x)
});
```

### Color predicates

In addition to color manipulation, you can write “predicates”  —  that is, functions that return a Boolean value.

```js
const isGrayscale = ({saturation}) => saturation === 0;
const isDark = ({lightness}) => lightness < .5;
```

---

## Dealing with colorarrays

### Filters

The JavaScript `[].filter` method accepts a predicate and returns a new array with all the elements that “pass.” The predicates we wrote in the previous section can be used here:

```js
const colors = [/* ... an array of color objects ... */];
const isLight = ({lightness}) => lightness > .5;
const lightColors = colors.filter(isLight);
```

### Sorting

To sort an array of colors, you first need to write a “comparator” function. This function takes two elements of an array and returns a number to denote the “winner.” A positive number indicates that the first element should be sorted first, and a negative indicates the second should be sorted first. A zero value indicates a tie.

For example, here is a function for comparing the lightness of two colors:

```js
const compareLightness = (a,b) => a.lightness - b.lightness;
```

Here is a function that compares saturation:

```js
const compareSaturation = (a,b) => a.saturation - b.saturation;
```

In an effort to prevent duplication in our code, we can write a higher-order function to return a comparison function to compare any attribute:

```js
const compareAttribute = attribute =>
  (a,b) => a[attribute] - b[attribute];
const compareLightness = compareAttribute('lightness');
const compareSaturation = compareAttribute('saturation');
const compareHue = compareAttribute('hue');
```

### Averaging attributes

You can average the specific attributes of an array of colors by composing various JavaScript array methods. First, you can calculate the average of an attribute by summing with reduce and dividing by the array length:

```js
const colors = [/* ... an array of color objects ... */];
const toSum = (a,b) => a + b;
const toAttribute = attribute => element => element[attribute];
const averageOfAttribute = attribute => array =>
  array.map(toAttribute(attribute)).reduce(toSum) / array.length;
```

You can use this to “normalize” an array of colors:

```js
/* ... continuing */
const normalizeAttribute = attribute => array => {
  const averageValue = averageOfAttribute(attribute)(array);
  const normalize = overwriteAttribute(attribute)(averageValue);
  return normalize(array);
}
const normalizeSaturation = normalizeAttribute('saturation');
const normalizeLightness = normalizeAttribute('lightness');
const normalizeHue = normalizeAttribute('hue');
```

---

## Conclusion

Colors are an integral part of the web. Breaking down colors into their attributes allows for the smart manipulation of colors and opens the door to all sorts of possibilities.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to manipulate CSS colors with JavaScript",
  "desc": "Colors are an integral part of creating rich webpages. This tutorial covers how CSS notates colors and how you can manipulate them with JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-manipulate-css-colors-with-javascript-fb547113a1b8.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
