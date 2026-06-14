---
lang: en-US
title: "Get Ready For the Powerful CSS border-shape Property!"
description: "Article(s) > Get Ready For the Powerful CSS border-shape Property!"
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
      content: "Article(s) > Get Ready For the Powerful CSS border-shape Property!"
    - property: og:description
      content: "Get Ready For the Powerful CSS border-shape Property!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/get-ready-for-the-powerful-css-border-shape-property.html
prev: /programming/css/articles/README.md
date: 2026-07-07
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/css-border-shape-examples.jpg
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
  name="Get Ready For the Powerful CSS border-shape Property!"
  desc="We recently got the shape() function and corner-shape property. What else could we possibly need as far as making shapes in CSS? Let me tell you: the border-shape property!"
  url="https://css-tricks.com/get-ready-for-the-powerful-css-border-shape-property"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/css-border-shape-examples.jpg"/>

So, we recently got the new [**`shape()`**](/css-tricks.com/almanac-functions/shape.md) function (now Baseline!) as well as the [**`corner-shape`**](/css-tricks.com/almanac-properties/corner-shape.md) property. What else could we possibly need as far as making shapes in CSS? Let me tell you: the `border-shape` property!

> `shape()`? `corner-shape`? `border-shape`?! Where did all these come from?

If you are not a CSS shape fanatic like me, you probably missed these features when they came out, so let’s give them brief, formal introductions, starting with…

---

## `shape()` and `corner-shape`

The `shape()` function is a new value for [**`clip-path`**](/css-tricks.com/almanac-properties/clip-path.md) and [**`offset-path`**](/css-tricks.com/almanac-properties/offset-path.md) that uses SVG syntax to create CSS shapes much more easily than, say, `path()`. I wrote a [**four-article series**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md) exploring this feature, and another article where I explore [**the creation of complex shapes**](/css-tricks.com/complex-css-shapes-with-shape-function.md).

![Three rectangular shapes with jagged, non-creating edges. the first is blue, then orange, then green.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_8249102E6BD5A7D94BC02F00D913B3B576539AF394F7402EF7DE7C968CBF8D3E_1773225348617_image.png?resize=1141%2C325&ssl=1)

Speaking about SVG, you can express any SVG shape using `shape()`. Said differently, you can *convert* any SVG shape into a CSS shape and, guess what, [<VPIcon icon="fas fa-globe"/>I made a converter that does exactly that](https://css-generators.com/svg-to-css/)!

As far as `corner-shape` goes, it’s a property that works in conjunction with [**`border-radius`**](/css-tricks.com/almanac-properties/border-radius.md). As its name suggests, it allows you to control the shape of an element’s corner using predefined keywords.

```css
.corner {
  border-radius: 20px;
  corner-shape: round | scoop | bevel | notch | squircle;
}
```

![A graphic displaying different CSS corner shapes: 'round', 'scoop', 'bevel', 'notch', and 'squircle', each in a purple background with white text.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/IqSM2bQw.png?resize=890%2C195&ssl=1)

It can also be used to create common CSS shapes, like I get into in another article, [**“CSS Shapes using `corner-shape`.”**](/css-tip.com/corner-shape.md)

![CSS-only shapes (triangle, rhombus, hexagon, etc.)`](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/41EU6bMTR-884.png?resize=884%2C382&ssl=1)

But is this the `corner-shape` property really useful or even needed? Except for the `squircle` value, most of the shapes can already be created using `clip-path` or `mask`. But what `corner-shape` does that these others can’t is easily add borders and other decorations to those shapes!

![Five shapes with different corner styles labeled: round, scoop, bevel, notch, and squircle, all displayed on a purple background.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/q8rLnLOp.png?resize=905%2C200&ssl=1)

`corner-shape` will not only shape the corners, but it also supports other properties like [**`border`**](/css-tricks.com/almanac-properties/border.md) and [**`box-shadow`**](/css-tricks.com/almanac-properties/box-shadow.md), allowing them to follow the shape rather than the element’s box. This is a game-changer because we all know that adding borders to shapes is a nightmare.

Support is still not great (Chromium-only as I’m writing this), but it’s a good time to explore it and get an overview of its potential.

<BaselineStatus featureid="corner-shape" />

---

## Enter `border-shape`!

Shaping corners is good, but it’s still fairly limited as far as what we can do with it. Like, what about shaping the whole element instead? That’s what `border-shape` will do. It accepts the same values as `clip-path`, including the new `shape()` function.

> So, it has the same job as `clip-path`? What’s new?

Like with `corner-shape`, most decorative properties such as `border`, `box-shadow`, and `outline` follow the shape.

![Showing the difference between clip-path and border-shape](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/UwwhSpo2xk-891.png?resize=891%2C331&ssl=1)

`clip-path` (and `mask`) will [**clip/mask**](/css-tricks.com/clipping-masking-css.md) the whole element, including the decorations, so having borders is a big *NO*. That’s a major problem for creating CSS shapes.

The `border-shape` property is here to solve this issue. Instead of clipping the element, it “shapes” the element, allowing its decorations to follow that shape. In other words, putting borders on CSS shapes will become child’s play!

Not to mention that `border-shape` is also very easy to use. If you are familiar with `clip-path`, then you practically have nothing new to learn. Simply replace one property with another, and you are done.

```css
.shape {
  /* Old code */
  clip-path: shape() | polygon() | ...;

  /* New code */
  border-shape: shape() | polygon() | ...;
}
```

I invite you again to learn more about the `shape()` function because it’s the value that makes `border-shape` really powerful. The two really go hand-in-hand.

Now that you know the basic use of the property, shall we start the fun stuff? I are here to push the limits and show you what is possible using `border-shape`.

::: note

Support is limited to Chrome-only for now so check out the next demos using Chrome.

:::

<BaselineStatus featureid="border-shape" />

---

## Border-Only Shapes

As I said, the first major advantage here is adding borders to shapes that follow the actual shape, which also means the ability to create border-only shapes. All you have to do is write the following code:

```css
.shape {
  border: 8px solid red;
  border-shape: /* your shape code */;
}
```

[**No more hacks**](/css-tricks.com/the-shapes-of-css.md) and no more headaches!

<CodePen
  user="anon"
  slug-hash="myOpBpX"
  title="border-only shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

![Four shapes with borders and no fill, including a red heart, yellow starburst, green flower, and blue jagged rectangle. ](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780500113996_Screenshot2026-06-03at9.21.27AM.png?resize=2154%2C476&ssl=1)

Most of the shapes are already available in my [<VPIcon icon="fas fa-globe"/>CSS Shapes collection](https://css-shape.com/), so really, making border-only shapes is something you can do with a simple copy/paste. Even some of [<VPIcon icon="fas fa-globe"/>my online generators](https://css-generators.com/) are already configured to provide border-only versions of complex shapes, like blobs, wavy lines, and fancy frames, among many, many others.

![border-only shapes using the CSS border-shape property, including a jagged red circle, a squiggly blue line, and a jagged blue rectangle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s5aX9SWN4Z-1136.png?resize=1136%2C308&ssl=1)

---

## Cutout Shapes

Let’s take the previous code and update it as follows:

```css
.shape {
  border: 8px solid red;
  border-shape: inset(0) /* you shape code */;
}
```

You keep the shape code you had, and you add [**`inset(0)`**](/css-tricks.com/almanac-functions/inset/) at the beginning. Yes, you can have two shape values inside `border-shape` and the result will be as follows:

<CodePen
  user="anon"
  slug-hash="QwGaqBP"
  title="cutout shapes"
  :default-tab="['css','result']"
  :theme="dark"/>

![Four shapes cut out from squares with filled colors, including a heart with red background, a stardust against yellow, a flower against green, and a jagged square against blue.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780500729455_Screenshot2026-06-03at9.31.50AM.png?resize=1968%2C484&ssl=1)

::: info "7.2. Syntax and Usage Modes" *From W3C Working Draft* (<VPIcon icon="iconfont icon-w3c"/><code>drafts.csswg.org</code>)

> The `border-shape` property accepts either a single `<basic-shape>` or two `<basic-shape>`s:
> 
> **Single [<VPIcon icon="iconfont icon-w3c"/>`<basic-shape>`](https://w3.org/TR/css-shapes-1/#typedef-basic-shape) (Stroke mode):** The border is rendered as a stroke along the shape’s path, with the stroke width determined by the relevant side’s computed border width. This mode is useful for creating outlined shapes.
> 
> **Two [<VPIcon icon="iconfont icon-w3c"/>`<basic-shape>`](https://w3.org/TR/css-shapes-1/#typedef-basic-shape)s (Fill mode)** The border is rendered as the area between the two paths. The first shape defines the outer boundary, and the second shape defines the inner boundary. This mode provides precise control over the border region’s geometry.

```component VPCard
{
  "title": "CSS Borders and Box Decorations Module Level 4",
  "desc": "The border-shape property accepts either a single <basic-shape> or two <basic-shape>s:",
  "link": "https://drafts.csswg.org/css-borders-4/#border-shape-syntax/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

Using a basic rectangle as the outer shape (`inset(0)`), I was able to easily transform the border-only version into a cutout version!

Do you want the shape inside a circle? Easy!

<CodePen
  user="anon"
  slug-hash="LEbezMj"
  title="Shape in circles"
  :default-tab="['css','result']"
  :theme="dark"/>

![Four shapes cut out from circles with filled colors, including a heart with red background, a stardust against yellow, a flower against green, and a jagged square against blue.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780500785441_Screenshot2026-06-03at9.32.47AM.png?resize=1024%2C320&ssl=1)

All I did is replace `inset(0)` (a rectangle) with `circle()` (a circle).

> But we can do this with a simple `border-radius: 50%`, right?

No! When working with `border-shape`, the `border-radius` is ignored, which is kind of logical since we no longer have corners to round — the element is now shaped. This is not a big deal since we can literally create any kind of shape that replaces the use of `border-radius`, as shown in the previous example.

::: note

If you are wondering why I am using `circle()`without any argument, check out my article [**“CSS Functions that work without arguments”.**](/css-tip.com/css-functions.md)

:::

Here are a few more examples with the two shapes value to look at before we move to the next part:

<CodePen
  user="anon"
  slug-hash="myOpqKY"
  title="Shape in Shape"
  :default-tab="['css','result']"
  :theme="dark"/>

![Four shapes cut out from polygons with filled colors, including a heart with red background, a stardust against yellow, a flower against green, and a jagged square against blue.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780500926571_Screenshot2026-06-03at9.35.04AM.png?resize=1592%2C486&ssl=1)

You can literally use any combination to get complex-looking shapes without a bunch of effort!

---

## Breakout Decorations

Now let’s take a block of text and apply the previous code with the two shape values:

```css
.box {
  border-shape: inset(0) circle();
  border-color: pink;
}
```

<CodePen
  link="https://codepen.io/t_afif/pen/JobMOaB/d7e5dcb366523a4e0484ef4a50b5aac8"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Perhaps this is nothing surprising considering what we have learned so far. We define two shapes and the border is drawn inside the area between them. What’s new here is that we are dealing with content and, as you can see, it overlaps the border.

`border-shape` shapes the *whole* element, including the element’s decoration, but any content inside remains unchanged and follows the initial rectangle shape. That’s not new behavior since the same happens even even with classic `border-radius`. And the content will overflow unless we decide to hide it using `overflow hidden`.

<CodePen
  link="https://codepen.io/t_afif/pen/vEydBQW/a19a3abf94277f25bc86cdb810859034"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

In this case, I won’t consider the `overflow` property as I want the content to overflow and be placed on top of the border decoration.

Now let’s update the code of the shape like this:

```css
.box {
  border-shape: inset(0 -100px) circle(50px);
  border-color: pink;
}
```

<CodePen
  link="https://codepen.io/t_afif/pen/ogYpoQQ/0a4234c433fd23d78fc07b9bf232f79b"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I made the circle smaller and the rectangle bigger. Do you see where I am going? By making the radius of the circle `0` and the rectangle bigger, I create a breakout background effect!

```css
.box {
  border-shape: inset(0 -100vw) circle(0);
  border-color: pink;
}
```

<CodePen
  link="https://codepen.io/t_afif/pen/jEVYaXV/de8cc0ac037c351f0d2c7bd358334380"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

![A paragraph of black text against a full-width pink rectangle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780502283260_Screenshot2026-06-03at9.57.38AM.png?resize=1790%2C684&ssl=1)

The element remains centered, but its background (that we are simulating using a border!) extends to the edge of the screen.

And this is not limited to using two shape values. Even with the one shape value, we can achieve a breakout decoration ([**which is typically difficult**](/css-tricks.com/breaking-css-grid-explained.md)) if you consider any value that gets you out of the element’s boundary.

Here is a demo with many examples that I’ll let you explore:

<CodePen
  user="anon"
  slug-hash="XJNJRLw"
  title="border-shape decorations"
  :default-tab="['css','result']"
  :theme="dark"/>

![Three examples of border text decorations, including an orange line through a main heading, heading against a blue caret-shaped background, and black text against a full-width pink background.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780502455729_Screenshot2026-06-03at10.00.29AM.png?resize=2118%2C1362&ssl=1)

---

## Partial Decorations

Let’s piggy-back off that last demo to try different decorations.

<CodePen
  user="anon"
  slug-hash="NPbXXWb"
  title="border-shape decorations"
  :default-tab="['css','result']"
  :theme="dark"/>

![Three examples of border text decorations, including a short orange underline for a mina heading, a heading with a partial blue background with a diagonal right edge, and a corner border in the top-left of a paragraph.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/s_41D9CEBA3456427DA5CBB280F83080BD1DFA1200838C0E38169BFC78A1CD67F7_1780502638128_Screenshot2026-06-03at10.03.27AM.png?resize=1792%2C1340&ssl=1)

This time, instead of extending outside the element boundary, I am staying within it to create partial decoration. In other words, we no longer have boundaries. `border-shape` has no limit. The only limit is your imagination!

I am mainly relying on the `shape()` function to create the decoration, so do yourself a favor and explore this feature by reading my [**four-article series**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md)! If you master `shape()`, you can easily produce complex decorations using `border-shape`.

---

## Shape Animation

Yes, `border-shape` can be animated, and we can have different kinds of animations. With the two-value syntax, we can animate the `border-width` value to create a reveal effect:

Hover the below and see the result:

<CodePen
  user="anon"
  slug-hash="qEqpYmG"
  title="Shape reveal effect"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? We can also apply this to image elements as well:

<CodePen
  user="anon"
  slug-hash="WbodJdZ"
  title="Image reveal effect"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also animate the shape values to create more complex animations. Here is a demo of a bouncing hover effect applied to blob shapes (from my article [**“Making Complex CSS Shapes Using `shape()`.”**](/css-tricks.com/complex-css-shapes-with-shape-function.md))

<CodePen
  user="anon"
  slug-hash="yyyPONb"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="dark"/>

I take the same code, replace `clip-path` with `border-shape`, and *tada*!

<CodePen
  user="anon"
  slug-hash="GgNyddj"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="dark"/>

And why not add a subtle animation to those previous decorations? Hover the titles and the text to see what happens:

<CodePen
  user="anon"
  slug-hash="GgNyBmz"
  title="border-shape decoration with hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Want More? Let’s Go!

Here is a [**hand-drawn underline**](/css-tip.com/hand-drawn-underline.md) that slides between the menu items on hover. Straight lines are boring!

<CodePen
  user="anon"
  slug-hash="emdoVae"
  title="Hand-Drawn Underline using border-shape"
  :default-tab="['css','result']"
  :theme="dark"/>

And why not an electric frame around your content? Don’t worry, it’s safe for touch screens.

<CodePen
  user="anon"
  slug-hash="LEbPJow"
  title="Electric frame"
  :default-tab="['css','result']"
  :theme="dark"/>

What about a fancy border-only loader? (code taken from [<VPIcon icon="fas fa-globe"/>my squishy loader collection](https://css-loaders.com/squishy/))

<CodePen
  user="anon"
  slug-hash="YPpYLvy"
  title="border-only loader"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s [**connect circles**](/css-tip.com/bending-line.md) with a straight line that bends when the circles get closer and stretches when they get farther. Drag the circles in the demo below and see the magic in play:

<CodePen
  user="anon"
  slug-hash="yyVPKzb"
  title="Bending a straight line using pure CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

I think it’s clear now why I am calling this new property “powerful.” In addition to making it easy to create CSS shapes, it lets us add fancy decorations, cool animations, and more!

I didn’t go into fine detail with most of the demos as I wanted to keep this a light article showing the potential of `border-shape`. Now that you know we can create crazy stuff with it, stay tuned for more elaborate articles!

Don’t forget to bookmark my [<VPIcon icon="fas fa-globe"/>CSS Shapes collection](https://css-shape.com/) and [<VPIcon icon="fas fa-globe"/>my online generators](https://css-generators.com/). I have already updated many of the shapes using `shape()`, and I am in the process of also including the `border-shape` version.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Get Ready For the Powerful CSS border-shape Property!",
  "desc": "We recently got the shape() function and corner-shape property. What else could we possibly need as far as making shapes in CSS? Let me tell you: the border-shape property!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/get-ready-for-the-powerful-css-border-shape-property.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
