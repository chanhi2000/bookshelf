---
lang: en-US
title: "Understanding CSScorner-shapeand the Power of the Superellipse"
description: "Article(s) > Understanding CSScorner-shapeand the Power of the Superellipse"
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
      content: "Article(s) > Understanding CSScorner-shapeand the Power of the Superellipse"
    - property: og:description
      content: "Understanding CSScorner-shapeand the Power of the Superellipse"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/understanding-css-corner-shape-and-the-power-of-the-superellipse.html
prev: /programming/css/articles/README.md
date: 2025-06-23
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6270
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
  name="Understanding CSScorner-shapeand the Power of the Superellipse"
  desc="The CSS corner-shape property (very new! only in Chrome Canary!) is useful in basic use cases, for advanced shape making, and the superellipse() function is *extra* powerful."
  url="https://frontendmasters.com/blog/understanding-css-corner-shape-and-the-power-of-the-superellipse/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6270"/>

The CSS`corner-shape`property represents one of the most exciting additions to web design’s geometric toolkit in recent years. Extending our ability to control the appearance of corners beyond the simple rounded edges we’ve become accustomed to with`border-radius`, this seemingly small addition unlocks a world of new possibilities that previously required complex SVG implementations or image-based solutions.

<!-- <VidStack src="https://videos.files.wordpress.com/ngdUKVsV/cleanshot-2025-06-22-at-10.54.03_mp4.adaptive_6.m3u8" /> -->
<!-- TODO: m3u8을 파싱할 수 있는 컴포넌트 생성 -->

::: note

As of this writing (June 2025),`corner-shape`is **a very new feature** with limited browser support, currently only available in Chrome (version M139 and above). The specification may still undergo changes. Try [<VPIcon icon="fa-brands fa-chrome"/>Chrome Canary](https://google.com/chrome/canary/) right now to view these demos.

:::

Before we dive into the advanced capabilities of this property, let’s first understand the foundation it builds upon: the familiar`border-radius`property that has shaped our corners for over a decade.

---

## The Foundation

The`border-radius`property gave us the ability to easily create rounded corners on elements. At the max value, using absolute values (like pixels) creates pill shapes, while percentage values create consistent rounded corners. However, any non-zero radius would always create an elliptical curve.

<CodePen
  user="amit_sheen"
  slug-hash="JodvZww"
  title="border-radius (Demo 01)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="JodvZww/837098643a428351a0b0d2455713cf55"
  title="border-radius (Demo 01)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

While it is a powerful and useful tool, sometimes we need something… different. This is where the new`corner-shape`property comes in, expanding our geometric vocabulary beyond just rounded corners.

---

## Introducing `corner-shape`

The`corner-shape` property works as a companion to `border-radius`, where `border-radius` determines the ‘size’ of the curve, and `corner-shape` defines how that curve looks.

CSS provides several predefined keywords for corner shapes:

- `round` (default): Creates the traditional circular or elliptical corners
- `squircle`: A smooth blend between a square and circle
- `scoop`: Concave quarters of an ellipse
- `bevel`: Straight lines connecting the corner points
- `notch`: Creating an inward corner
- `square`: Maintains right angles regardless of border-radius (why is this a thing?!)

<CodePen
  user="amit_sheen"
  slug-hash="XJbqPOp"
  title="corner-shape (Demo 02)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="XJbqPOp/9b856108dde46db8b02244980b69016e"
  title="corner-shape (Demo 02)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

These keywords enable us to create diverse and visually interesting borders, without resorting to complex implementations, and allow us to easily produce simple geometric shapes like rhombuses, octagons, or plus signs (+).

```css
.rhombus {
  aspect-ratio: 2 / 3;
  border-radius: 50%;
  corner-shape: bevel;
}

.octagon {
  aspect-ratio: 1;
  border-radius: calc(100% / (2 + sqrt(2))); /* ~29% */
  corner-shape: bevel;
}

.plus {
  aspect-ratio: 1;
  border-radius: calc(100% / 3);
  corner-shape: notch;
}

.plus-alt {
  /* rotate to get a X sign */
  rotate: 45deg;
}
```

<CodePen
  user="amit_sheen"
  slug-hash="VYLdZZd"
  title="corner-shape (Demo 03)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="VYLdZZd/bbd001c77bfbebb24e63bbfc4b825b66"
  title="corner-shape (Demo 03)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

::: note

In the not-so-distant future, we will also be able to use the `corners` shorthand to write things more conveniently. Like this:

```css
.rhombus { 
  corners: 50% bevel;
}
```

:::

We can create even more shapes with `squircle` and `scoop`, but we’ll explore those in depth when we discuss Superellipses. For now, let’s talk about using multiple values…

---

## Working with Multiple Values

So far, we’ve used a single value for `border-radius`, but we can get much more creative. As you may know,`border-radius` can accept up to eight different values (horizontal and vertical radii for each of the four corners).

This becomes particularly interesting when combined with `corner-shape`. The interaction between different radius values and corner shapes creates a rich playground for design experimentation.

<CodePen
  user="amit_sheen"
  slug-hash="XJbYrzz"
  title="corner-shape (Demo 04)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="XJbYrzz/15f16f64904524d05a35339a16094ac7"
  title="corner-shape (Demo 04)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

By using multiple values, we can create additional designs and shapes, like my all time favorite shape - hexagons. Now we can generate perfect hexagons with just a few simple lines of CSS. Using a `bevel` shape for the corners, and giving different values to the horizontal and vertical radii (50% and 25%).

```css
.hexagon {
  aspect-ratio: cos(30deg);
  border-radius: 50% / 25%;
  corner-shape: bevel;
}

.hexagon-alt {
  aspect-ratio: 1 / cos(30deg);
  border-radius: 25% / 50%;
}
```

<CodePen
  user="amit_sheen"
  slug-hash="ZYGREvm"
  title="corner-shape (Demo 05)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="ZYGREvm/de2c08a57d5718e849f23ce4014b3a6f"
  title="corner-shape (Demo 05)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

But `border-radius` is not the only one that can accept multiple values, `corner-shape` is a shorthand too, and can take up to 4 values, one for each corner. In this way, we can create even more unique shapes.

```css
.shapeA {
  aspect-ratio: 1 / 2;
  border-radius: 40% / 50%;
  corner-shape: bevel squircle squircle bevel;
}
.shapeB {
  aspect-ratio: 1;
  border-radius: 10% 50% 50%;
  corner-shape: round scoop bevel;
  rotate: 45deg;
}
.shapeC {
  aspect-ratio: 1;
  border-radius: 10% 10% 50% 50%;
  corner-shape: round round scoop scoop ;
}
```

<CodePen
  user="amit_sheen"
  slug-hash="EajRNeL"
  title="corner-shape (Demo 06)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="EajRNeL/92167390cfccf21b7a6e3e1624ef21de"
  title="corner-shape (Demo 06)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

One of these shapes made me think of speech bubbles. We always needed a little help from pseudo-elements (and some hacking) to create an ‘arrow’ at the bottom of the element. Now, we can do it with a simple `border-radius`.

<CodePen
  user="amit_sheen"
  slug-hash="LEVJGNY"
  title="Corner-shape speech bubble"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="LEVJGNY/584cd2b4880cb44a259b94709a02ebf5"
  title="Corner-shape speech bubble"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

We can also declare just one specific corner, which can be particularly useful when we want to style just one corner differently, for example, to create space for a counter or a button at the corner of an element.

```css
.container {
  border-radius: 40px;
  corner-top-right-shape: scoop;
}
```

<CodePen
  user="amit_sheen"
  slug-hash="OPVERed"
  title="corner-shape (Demo 07)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="OPVERed/e3894bfcee953823e4f3f957570d8a9e"
  title="corner-shape (Demo 07)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

---

## Animation and Transition of corner-shape

If you clicked the red button in the previous example (good!), you might have noticed that the closing and opening of the element occurs through a transition of the `corner-shape`. I take advantage of the fact that a `notch` with a radius of `50%` essentially clip the element completely.

Just like the `border-radius`, you can also animate the `corner-shape` property or smoothly transition from one shape to another.

<CodePen
  user="amit_sheen"
  slug-hash="emNKKQG"
  title="corner-shape (Demo 08)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="emNKKQG/02d09eef94a14fccca933d82865ce881"
  title="corner-shape (Demo 08)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

<CodePen
  user="amit_sheen"
  slug-hash="wBaXXab"
  title="corner-shape (Demo 09)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="wBaXXab/fa315e386c81e2802de18d99c3f70c3c"
  title="corner-shape (Demo 09)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

::: note

The`square`value, which might seem useless at first glance, is actually very useful in animations and transitions when we want to animate the border to a square shape.

:::

---

## The Power of Superellipse

So far, we’ve explored the predefined keywords of `corner-shape`, which are great, but there’s an even more powerful option we haven’t discussed yet: the Superellipse! This is arguably more impressive than all the previous options combined, as those keywords are essentially just specific points along the superellipse spectrum. So let’s understand what are superellipses, what is the superellipse function, and how we can use it to fine-tune our borders.

![A colorful geometric design featuring lines and curves arranged in a symmetrical pattern, resembling a superellipse with a vibrant gradient from black to neon colors.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/vihaX6Fo.png?resize=820%2C620&ssl=1)

As a mathematical concept, the superellipse has existed for about a hundred years, and I love it because someone took something that had existed for centuries (the ellipse formula) and said, “let’s do this differently”.[<VPIcon icon="fa-brands fa-wikipedia-w"/>Gabriel Lamé](https://en.wikipedia.org/wiki/Gabriel_Lam%C3%A9)took the formula for an ellipse $\left[x^{2}+y^{2}=1\right]$ and asked, what happens if we replace the $^2$ with something else?! The result: hundred years goes by, his formula is embedded in browsers, making thousands of web developers happier.

::: note

Math dudes will comment the actual formula for an ellipse is $\left[\frac{x^{2}}{a^{2}}+\frac{y^{2}}{b^{2}}=1\right]$ but since the $\left[a\right]$ and $\left[b\right]$ are the axis set by the element’s width and height, we can set $\left[a=b=1\right]$ and get the simplified formula $\left[x^{2}+y^{2}=1\right]$

:::

When we replace the $^2$ with a variable ($n$), this variable would now represent the “squareness” of the shape. If $^2$ represents a regular circle, then with values greater than $^2$, the curve approaches a rectangle, and with values less than $^2$, the line starts to straighten. When $\left[n=1\right]$, it means $\left[x^{1}+y^{1}=1\right]$, which is exactly the same as $\left[x+y=1\right]$, which is actually the formula of a straight line, resulting in a diamond shape. And any number between zero and one gives us a concave shape.

---

## The CSS Superellipse function

But if all this sounds a bit complicated, don’t worry, the CSS folks took care of us, making this function much simpler and way more intuitive. Unlike Lamé’s formula, the CSS `superellipse()` function takes an argument (let’s call it $k$) that can be any value, positive or negative. And the way the function works is like this:

- Zero is the ‘mid-point’, so if we pass 0 to the function, i.e. `superellipse(0)`, we get a straight line, just like the `bevel` we saw earlier.
- Any positive number will give us an outward-curved arc, where `superellipse(1)` is the regular circle, `superellipse(2)` is our squircle, and as the number increases, the shape will look more like a square, with `infinity` giving us the`square`shape.
- And the same happens with negative numbers. `superellipse(-1)` gives us a star-like shape, which is the`scoop`we saw earlier, and the lower the number, the more deeply concave the corner becomes.

<CodePen
  user="amit_sheen"
  slug-hash="qEdKoNv"
  title="corner-shape (Demo 10)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  user="amit_sheen"
  slug-hash="qEdKoNv/182bf68a571bffc491c1209e2b0ae75a"
  title="corner-shape (Demo 10)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

Simple, right? But how?!

The CSS function `superellipse(k)` uses the exponent $2^k$ to map the value to $n$. So $\left[n=2^{k}\right]$, and the complete formula looks like this:

$$
x^{(2^{k})}+y^{(2^{k})}
$$

This calculation format is much more logical and makes the feature more intuitive.

When $\left[k=0\right]$ it means that $\left[n=2^{0}\right]$ or $\left[n=1\right]$, hence the straight line. If $\left[k=1\right]$ then $\left[n=2\right]$, which is the regular round curve. And if $\left[k>1\right]$ we get $\left[n>2\right]$, resulting in more ‘squircle’ shape. On the other side, when we give the function a negative number, $\left[k<0\right]$, $n$ will always be a number between zero and one, resulting in a concave curve towards the center of the element.

---

## Different Exponents

One limitation of the current `superellipse()` function is that we can’t pass two variables to it, like `superellipse(k, l)`, to use different exponents for the $x$ and $y$ axes. That would give us the formula $\left[x^{(2^{k})}+y^{(2^{l})}=1\right]$.

If this were possible, we could create some really interesting shapes like this:

![A mathematical illustration of a superellipse, depicted with a pink outline on a black background.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/tmLuDN5Q.png?resize=300%2C233&ssl=1)

---

## Beyond Two Dimensions

While it’s completely outside the scope of this article, if you’ve made it this far, you might be interested to know that the superellipse concept extends to higher dimensions as well. There’s the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Superellipsoid](https://en.wikipedia.org/wiki/Superellipsoid) that exists in three dimensions, and you can represent a hyperellipsoid in $d$ dimensions using the following formula:

$$
x_{1}^{n}+x_{2}^{n}+\cdots+x_{d}^{n}=1
$$

---

## Wrapping up

This article walked us through the evolution from a simple rounded edges to a full geometric vocabulary with the new CSS`corner‑shape`property. We explored the predefined shapes, and discover how they map directly to points on the superellipse spectrum, and dive into the true power of the superellipse function. We saw how we can mix multiple values to craft wild shapes, how to animate and transition the corners, and how to exploit even the weird edge case to our advantage.

Now it’s your turn: bring these ideas into your own work. [<VPIcon icon="fa-brands fa-codepen"/>Open a new Pen](https://pen.new), add a`corner‑shape`to a simple box or button, and watch how a tiny tweak changes the whole feel of your design. Don’t forget to share your experiments with the community, inspire others with unexpected curves and help drive this bold new CSS feature into everyday use.

::: note

I’d like to give special thanks to Noam Rosenthal for reviewing the code and examples, helping refine the ideas, and of course, for authoring the[<VPIcon icon="fas fa-globe"/>spec for `corner-shape`](https://drafts.csswg.org/css-borders-4/#corner-shaping)and implementing it in chromium.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding CSScorner-shapeand the Power of the Superellipse",
  "desc": "The CSS corner-shape property (very new! only in Chrome Canary!) is useful in basic use cases, for advanced shape making, and the superellipse() function is *extra* powerful.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/understanding-css-corner-shape-and-the-power-of-the-superellipse.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
