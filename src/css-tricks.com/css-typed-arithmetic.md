---
lang: en-US
title: "CSS Typed Arithmetic"
description: "Article(s) > CSS Typed Arithmetic"
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
      content: "Article(s) > CSS Typed Arithmetic"
    - property: og:description
      content: "CSS Typed Arithmetic"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-typed-arithmetic.html
prev: /programming/css/articles/README.md
date: 2025-09-30
isOriginal: false
author:
  - name: Amit Sheen
    url : https://css-tricks.com/author/amitsheen/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/css-types-arithmetic.png
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
  name="CSS Typed Arithmetic"
  desc="Starting in Chrome 140, we'll be able to calculate numeric values with mixed data types. Sounds small, but Amit demonstrates how big a deal this is, calling it Computational CSS."
  url="https://css-tricks.com/css-typed-arithmetic"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/css-types-arithmetic.png"/>

CSS typed arithmetic is genuinely exciting! It opens the door to new kinds of layout composition and animation logic we could only hack before. The first time I published something that leaned on typed arithmetic was in this animation:

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/09/swirl.mp4" />

CodePen Embed Fallback
https://codepen.io/amit_sheen/pen/PwZoLBG
CSS Swirl

But before we dive into what is happening in there, let’s pause and get clear on what **typed arithmetic** actually is and why it matters for CSS.

::: note Browser Support

The CSS feature discussed in this article, typed arithmetic, is on the cutting edge. As of the time of writing, browser support is very limited and experimental. To ensure all readers can understand the concepts, the examples throughout this article are accompanied by videos and images, demonstrating the results for those whose browsers do not yet support this functionality. Please check resources like MDN or Can I Use for the latest support status.

:::

---

## The Types

If you really want to get what a “type” is in CSS, think about TypeScript. Now forget about TypeScript. This is a CSS article, where semantics actually matter.

In CSS, a **type** describes the unit space a value lives in, and is called a `data-type`. Every CSS value belongs to a specific type, and each CSS property and function only accepts the data type (or types) it expects.

- Properties like `opacity` or `scale` use a plain `<number>` with no units.
- `width`, `height`, other box metrics, and many additional properties use `<length>` units like `px`, `rem`, `cm`, etc.
- Functions like `rotate()` or `conic-gradient()` use an `<angle>` with `deg`, `rad`, or `turn`.
- `animation` and `transition` use `<time>` for their duration in seconds (`s`) or milliseconds (`ms`).

::: note

You can identify CSS data types in the specs, on MDN, and other official references by their angle brackets: `<data-type>`.

:::

There are many more data types like `<percentage>`, `<frequency>`, and `<resolution>`, but the types mentioned above cover most of our daily use cases and are all we will need for our discussion today. The mathematical concept remains the same for (almost) all types.

I say “almost” all types for one reason: not every data type is calculable. For instance, types like `<color>`, `<string>`, or `<image>` cannot be used in mathematical operations. An expression like `"foo" * red` would be meaningless. So, when we discuss mathematics in general, and typed arithmetic in particular, it is crucial to use types that are inherently calculable, like `<length>`, `<angle>`, or `<number>`.

---

## The Rules of Typed Arithmetic

Even when we use calculable data types, there are still limitations and important rules to keep in mind when performing mathematical operations on them.

### Addition and Subtraction

Sadly, a mix-and-match approach doesn’t really work here. Expressions like `calc(3em + 45deg)` or `calc(6s - 3px)` will not produce a logical result. When adding or subtracting, you must stick to the same data type.

Of course, you can add and subtract different units within the same type, like `calc(4em + 20px)` or `calc(300deg - 1rad)`.

### Multiplication

With multiplication, you can only multiply by a plain `<number>` type. For example: `calc(3px * 7)`, `calc(10deg * 6)`, or `calc(40ms * 4)`. The result will always adopt the type and unit of the first value, with the new value being the product of the multiplication.

But why can you only multiply by a number? If we tried something like `calc(10px * 10px)` and assumed it followed “regular” math, we would expect a result of `100px²`. However, there are no squared pixels in CSS, and certainly no square degrees (though that could be interesting…). Because such a result is invalid, CSS only permits multiplying typed values by unitless numbers.

### Division

Here, too, mixing and matching incompatible types is not allowed, and you can divide by a number just as you can multiply a number. But what happens when you divide a type by the same type?

**Hint:** this is where things get interesting.

Again, if we were thinking in terms of regular math, we would expect the units to cancel each other out, leaving only the calculated value. For example, `90x / 6x = 15`. In CSS, however, this isn’t the case. Sorry, it *wasn’t* the case.

Previously, an expression like `calc(70px / 10px)` would have been invalid. But starting with [Safari 18.2](https://webkit.org/blog/16301/webkit-features-in-safari-18-2/) and [Chrome 140](https://developer.chrome.com/release-notes/140#css_typed_arithmetic) (and hopefully soon in all other browsers), **this expression now returns a valid number**, which winds up being `7` in this case. This is the major change that typed arithmetic enables.

---

## Is that all?!

That little division? Is that the big thing I called “genuinely exciting”? Yes! Because this one little feature opens the door to a world of creative possibilities. Case in point: we can convert values from one data type to another and mathematically condition values of one type based on another, just like in the swirl example I demoed at the top.

So, to understand what is happening there, let’s look at a more simplified swirl:

![A long series of white dots forming a spiral against a stark black background. The dots get closer together as they swirl.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758506945721_image.png?resize=540%2C540&ssl=1)

CodePen Embed Fallback
https://codepen.io/amit_sheen/pen/xbZbgbj/ef457fca2413ccd44a557c5a68bd5516
Typed Arithmetic - Demo 1

I have a container`<div>` with 36 `<i>` elements in the markup that are arranged in a spiral with CSS. Each element has an angle relative to the center point, `rotate(var(--angle))`, and a distance from that center point, `translateX(var(--distance))`.

The angle calculation is quite direct. I take the index of each `<i>` element using [`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and multiply it by `10deg`. So, the first element with an index of `1` will be rotated by 10 degrees (`1 * 10deg`), the second by 20 degrees (`2 * 10deg`), the third by 30 degrees (`3 * 10deg`), and so on.

```css
i { --angle: calc(sibling-index() * 10deg); }
```

As for the distance, I want it to be directly proportional to the angle. I first use typed arithmetic to divide the angle by 360 degrees: `var(--angle) / 360deg`.

This returns the angle’s value, but as a unitless number, which I can then use anywhere. In this case, I can multiply it by a `<length>` value (e.g. `180px`) that determines the element’s distance from the center point.

```css
i {
  --angle: calc(sibling-index() * 10deg);
  --distance: calc(var(--angle) / 360deg * 180px);
}
```

This way, the ratio between the angle and the distance remains constant. Even if we set the angle of each element differently, or to a new value, the elements will still align on the same spiral.

---

## The Importance of the Divisor’s Unit

It’s important to clarify that when using typed arithmetic this way, you get a unitless number, but its value is **relative to the unit of the divisor**.

In our simplified spiral, we divided the angle by `360deg`. The resulting unitless number, therefore, represents the value in degrees. If we had divided by `1turn` instead, the result would be completely different — even though `1turn` is equivalent to `360deg`, the resulting unitless number would represent the value in turns.

A clearer example can be seen with [**`<length>` values**](/css-tricks.com/css-length-units.md).

Let’s say we are working with a screen width of `1080px`. If we divide the screen width (`100vw`) by `1px`, we get the number of pixels that fit into the screen width, which is, of course, `1080`.

```css
calc(100vw / 1px) /* 1080 */
```

However, if we divide that same width by `1em` (and assume a font size of `16px`), we get the number of `em` units that fit across the screen.

```css
calc(100vw / 1em) /* 67.5 */
```

The resulting number is unitless in both cases, but its meaning is entirely dependent on the unit of the value we divided by.

---

## From Length to Angle

Of course, this conversion doesn’t have to be from a type `<angle>` to a type `<length>`. Here is an example that calculates an element’s angle based on the screen width (`100vw`), creating a new and unusual kind of responsiveness.

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/09/demo-02.mp4" />

CodePen Embed Fallback
https://codepen.io/amit_sheen/pen/ZYQYBKQ/40ee7e5010d521a2f0aa247126af2090
Typed Arithmetic - Demo 2

And get this: **There are no media queries in here!** it’s all happening in a single line of CSS doing the calculations.

To determine the angle, I first define the width range I want to work within. `clamp(300px, 100vw, 700px)` gives me a closed range of `400px`, from `300px` to `700px`. I then subtract `700px` from this range, which gives me a new range, from `-400px` to `0px`.

Using typed arithmetic, I then divide this range by `400px`, which gives me a normalized, unitless number between `-1` and `0`. And finally, I convert this number into an `<angle>` by multiplying it by `-90deg`.

Here’s what that looks like in CSS when we put it all together:

```css
p {
  rotate: calc(((clamp(300px, 100vw, 700px) - 700px) / 400px) * -90deg);
}
```

---

## From Length to Opacity

Of course, the resulting unitless number can be used as-is in any property that accepts a `<number>` data type, such as `opacity`. What if I want to determine the font’s opacity based on its size, making smaller fonts more opaque and therefore clearer? Is it possible? Absolutely.

![Five sentences stacked vertically, each getting larger and more opaque from top to bottom.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/s_E6C8CBB10A180F0ED5B0539230839B9D2F2BA2F61936EC29516626927C49E146_1758507750089_image.png?resize=540%2C540&ssl=1)

CodePen Embed Fallback
https://codepen.io/amit_sheen/pen/zxrxoaw/44a20f0f4b182b91760f889a9bb92734
Typed Arithmetic - Demo 3

In this example, I am setting a different `font-size` value for each `<p>` element using a `--font-size` custom property. and since the range of this variable is from `0.8rem` to `2rem`, I first subtract `0.8rem` from it to create a new range of `0` to `1.2rem`.

I could divide this range by `1.2rem` to get a normalized, unitless value between `0` and `1`. However, because I don’t want the text to become fully transparent, I divide it by twice that amount (`2.4rem`). This gives me a result between `0` and `0.5`, which I then subtract from the maximum opacity of `1`.

```css
p {
  font-size: var(--font-size, 1rem);
  opacity: calc(1 - (var(--font-size, 1rem) - 0.8rem) / 2.4rem);
}
```

Notice that I am displaying the font size in pixel units even though the size is defined in `rem` units. I simply use typed arithmetic to divide the font size by `1px`, which gives me the size in pixels as a unitless value. I then inject this value into the `content` of the the paragraph’s `::after` pseudo-element.

```css
p::after {
  counter-reset: px calc(var(--font-size, 1rem) / 1px);
  content: counter(px) 'px';
}
```

---

## Dynamic Width Colors

Of course, the real beauty of using native CSS math functions, compared to other approaches, is that everything happens dynamically at runtime. Here, for example, is a small demo where I color the element’s background relative to its rendered width.

```css
p {
  --hue: calc(100cqi / 1px);
  background-color: hsl(var(--hue, 0) 75% 25%);
}
```

You can drag the bottom-right corner of the element to see how the color changes in real-time.

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/09/demo-4.mp4" />

CodePen Embed Fallback
https://codepen.io/amit_sheen/pen/LEGEbBd/2c2d0d1d7b5b43703b22b838741fc542
Typed Arithmetic - Demo 4

Here’s something neat about this demo: because the element’s default width is 50% of the screen width and the color is directly proportional to that width, it’s possible that the element will initially appear in completely different colors on different devices with different screens. **Again, this is all happening without any media queries or JavaScript.**

---

## An Extreme Example: Chaining Conversions

OK, so we’ve established that typed arithmetic is cool and opens up new and exciting possibilities. Before we put a bow on this, I wanted to pit this concept against a more *extreme* example. I tried to imagine what would happen if we took a `<length>` type, converted it to a `<number>` type, then to an `<angle>` type, back to a `<number>` type, *and*, from there, back to a `<length>` type.

Phew!

I couldn’t find a real-world use case for such a chain, but I did wonder what would happen if we were to animate an element’s width and use that width to determine the height of something else. All the calculations might not be necessary (maybe?), but I think I found something that looks pretty cool.

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/09/demo-5.mp4" />

CodePen Embed Fallback
https://codepen.io/amit_sheen/pen/OPMPWLL/e5b33d8639cd8b288beebfa8bfb4bbc9
Typed Arithmetic - Demo 5

In this demo, the animation is on the solid line along the bottom. The vertical position of the ball, i.e. its height, relative to the line, is proportional to the line’s width. So, as the line expands and contracts, so does the path of the bouncing ball.

To create the parabolic arc that the ball moves along, I take the element’s width (`100cqi`) and, using typed arithmetic, divide it by `300px` to get a unitless number between `0` and `1`. I multiply that by `180deg` to get an angle that I use in a `sin()` function (Juan Diego has a [**great article on this**](/css-tricks.com/the-most-hated-css-feature-cos-and-sin.md)), which returns another unitless number between `0` and `1`, but with a parabolic distribution of values.

Finally, I multiply this number by `-200px`, which outputs the ball’s vertical position relative to the line.

```css
.ball {
  --translateY: calc(sin(calc(100cqi / 300px) * 180deg) * -200px) ;
  translate: -50% var(--translateY, 0);
}
```

And again, because the ball’s position is relative to the line’s width, the ball’s position will remain on the same arc, no matter how we define that width.

---

## Wrapping Up: The Dawn of Computational CSS

The ability to divide one typed value by another to produce a unitless number might seem like no big deal; more like a minor footnote in [<VPIcon icon="iconfont icon-css-tricks"/>the grand history of CSS](https://css-tricks.com/category/history/).

But as we’ve seen, this single feature is a quiet revolution. It dismantles the long-standing walls between different CSS data types, transforming them from isolated silos into a connected, interoperable system. We’ve moved beyond simple calculations, and entered the era of true **Computational CSS**.

This isn’t just about finding new ways to style a button or animate a loading spinner. **It represents a fundamental shift in our mental model.** We are no longer merely *declaring* static styles, but rather defining dynamic, mathematical *relationships* between properties. The width of an element can now intrinsically know about its color, an angle can dictate a distance, and a font’s size can determine its own visibility.

This is CSS becoming self-aware, capable of creating complex behaviors and responsive designs that adapt with a precision and elegance that previously required JavaScript.

So, the next time you find yourself reaching for JavaScript to bridge a gap between two CSS properties, pause for a moment. Ask yourself if there’s a mathematical relationship you can define instead. You might be surprised at how far you can go with just a few lines of CSS.

### The Future is Calculable

The examples in this article are just the first steps into a much larger world. What happens when we start mixing these techniques with scroll-driven animations, view transitions, and other modern CSS features? The potential for creating intricate data visualizations, generative art, and truly fluid user interfaces, all natively in CSS, is immense. We are being handed a new set of creative tools, and the instruction manual is still being written.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Typed Arithmetic",
  "desc": "Starting in Chrome 140, we'll be able to calculate numeric values with mixed data types. Sounds small, but Amit demonstrates how big a deal this is, calling it Computational CSS.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-typed-arithmetic.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
