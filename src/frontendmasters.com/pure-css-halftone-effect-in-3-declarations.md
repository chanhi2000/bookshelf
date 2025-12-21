---
lang: en-US
title: "Pure CSS Halftone Effect in 3 Declarations"
description: "Article(s) > Pure CSS Halftone Effect in 3 Declarations"
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
      content: "Article(s) > Pure CSS Halftone Effect in 3 Declarations"
    - property: og:description
      content: "Pure CSS Halftone Effect in 3 Declarations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/pure-css-halftone-effect-in-3-declarations.html
prev: /programming/css/articles/README.md
date: 2024-12-03
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4594
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
  name="Pure CSS Halftone Effect in 3 Declarations"
  desc="A halftone is a pattern of dots that vary in size and spacing. It's a printing technique that you normally don't see, but blown up in size, is a cool aesthetic. This is a deep dive on how it can be done in CSS alone, starting quite simply! "
  url="https://frontendmasters.com/blog/pure-css-halftone-effect-in-3-declarations/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4594"/>

About half a decade ago, I got an idea about how to create a halftone effect with pure CSS. My original idea (which Michelle Barker[<VPIcon icon="fas fa-globe"/>wrote about](https://css-irl.info/css-halftone-patterns/)a couple of years ago) was a bit inefficient, but in the years that followed, I’ve managed to polish it and reduce it to a single `<div>`, no pseudos and just three CSS properties.

---

## What’s a halftone effect?

If you don’t know what a[<VPIcon icon="fa-brands fa-wikipedia-w"/>halftone](https://en.wikipedia.org/wiki/Halftone)effect is, a very basic pattern looks like this:

![The simplest possible halftone pattern](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/1c35b289ba9c002b.png?resize=900%2C368&ssl=1)

This is what we’ll be creating with a single `<div>` (no pseudo-elements) and only three CSS declarations. Afterwards, we’ll go through a bunch of variations and see some cooler-looking demos.

---

## The 3 CSS Declarations

The**first declaration**is a`background` and it consists of two layers. One is the**pattern**- the dots in our most basic case. The other is the**map**- this decides where the dots are bigger and where they are smaller. In the most simple case, it’s a linear gradient. So what we have so far in terms of code looks like this:

```css
background: 
  radial-gradient(closest-side, #000, #fff) 0/ 1em 1em space, 
  linear-gradient(90deg, #000, #fff);
```

We’ve made sure we have an integer number of dots along both axes by using the[<VPIcon icon="fas fa-globe"/>`space`](https://mastodon.social/@anatudor/113470617581654218)value for`background-repeat`.

Taken separately, the two layers look like this:

![the pattern and the map](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/8c3b7923f2d3f881.png?resize=720%2C440&ssl=1)

Before we move any further, let’s take a closer look at these gradients. Each of the two layers goes from`black`, which can also be written as`rgb(0%, 0%, 0%)`or`hsl(0, 0%, 0%)`to`white`, which can also be written as`rgb(100%, 100%, 100%)`or`hsl(0, 0%, 100%)`.

Dead in the middle we have`grey`, which is`rgb(50%, 50%, 50%)`or`hsl(0, 0%, 50%)`. This is the`50%`lightness grey or, in short, as we’ll be calling it from now on, the`50%`grey.

Note that in the case of*any*grey, wherever it may be situated in between black and white, the saturation (the ‘S’ in HSL) is always`0%`, while the hue (the ‘H’ in HSL) is irrelevant, so we just use`0`. The only value that changes is the lightness (the ‘L’ in HSL), which goes from`0%`for`black`to`100%`for`white`.

Basically, going from`0%`to`100%`along the gradient line means going from`0%`to`100%`along the lightness axis of the[HSL bicone (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/NvKEpd).

![HSL bicone slice showing the lightness axis<br/>([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/ZELeqVN))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/76247481aa23bfc8.png?resize=720%2C620&ssl=1)

So in general, any`p%`grey can be written as`rgb(p%, p%, p%)`or`hsl(0, 0%, p%)`.

This can be seen in the interactive demo below where you can drag the bar along the entire lightness range.

<CodePen
  user="thebabydino"
  slug-hash="BaXNORo"
  title="lightness axis"
  :default-tab="['css','result']"
  :theme="dark"/>

Going back to our`background`with the pattern dots layer on top of the`linear-gradient()`map layer, we cannot see the map layer because it’s fully covered by the pattern layer. So the next step is to blend these two`background`layers using the`multiply`blend mode.

This means the**second declaration**is:

```css
background-blend-mode: multiply
```

This works on a per pixel, per channel basis. We consider each layer to be a grid of pixels, we take every pair of corresponding pixels from the two layers and, for each of the three RGB channels, we multiply the corresponding channel values.

![blending two layers at a pixel level](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/blend_pixels.png?resize=999%2C561&ssl=1)

So for each pair of pixels, the result of this blending operation is an RGB value where each channel value is the result of multiplying the corresponding channel values from the two layers.

$$
\begin{align*}
\text{R}&=\text{R}_{0}\cdot\text{R}_{1}
\text{G}&=\text{G}_{0}\cdot\text{G}_{1}
\text{B}&=\text{B}_{0}\cdot\text{G}_{1}
\end{align*}
$$

Note that what we’re multiplying is the decimal representation of percentage RGB values - that is, numbers in the`[0, 1]`interval. And when multiplying values in this interval, the result is always smaller or equal to the smallest of the two values multiplied.

In our case, both gradients go from black to white, all we have in between are greys, which have all three RGB channels equal. So if at some point, both pixels in the pair of corresponding ones from the two layers have`rgb(50%, 50%, 50%)`, then the result of the`multiply`blend mode is`.25 = .5·.5`for each channel.

We can see that the result of the`multiply`blend mode is always*at least as dark*as the darker of the two pixels whose RGB values we multiply. This is because the two RGB values are in the`[0, 1]`interval and, as mentioned before, multiplying such values always gives us a result that’s at most as big as the smallest of the two numbers multiplied. The smaller the channel values are, the darker the grey they represent is.

After blending our pattern and map layers, we can see how overall, the pattern dots are now darker on the left where the map is closer to`black.`

![our two gradient layers, blended](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/fec92f6bed95ff66.png?resize=720%2C240&ssl=1)

Below, you can see two scaled up dots from different points along the gradient line of the map. The second dot is further to the right (lighter) than the first one. The dark red circles mark the`50%`grey limit for each.

![darker dot vs. lighter dot](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/acf9b33d53e9759e.png?resize=720%2C358&ssl=1)

For the darker dot, the`50%`grey limit is a bigger circle than in the case of the lighter dot. Inside each dark red circle, we have greys darker than a`50%`one. Outside, we have greys lighter than a`50%`one. Keep this in mind for later.

The third and**final declaration**is a`filter`using a large`contrast()`value.

For those not familiar with how`contrast()`works, it does one of two things, depending on whether its argument is subunitary or not.

If its argument is subunitary, then it pushes every channel value towards`.5`, the middle of the`[0, 1]`interval. A value of`1`means no change, while a value of`0`means the channel has been pushed all the way to`.5`.

This means that`contrast(0)`always gives us a`50%`grey, regardless of the`filter`input.

You can see this in the interactive demo below - regardless of whether we apply our`filter`on a plain solid`background`box, opaque or semitransparent, a gradient or an image one, dragging the contrast down to`0`always turns it into a`50%`grey with the same alpha as the input.

<CodePen
  user="thebabydino"
  slug-hash="eYqpjOw"
  title="contrast() with subunitary value"
  :default-tab="['css','result']"
  :theme="dark"/>

Note that`contrast(100%)`is the same as`contrast(1)`,`contrast(50%)`is the same as`contrast(.5)`and so on.

If the argument of the`contrast()`function is greater than`1`however, then each channel value gets pushed towards either`0`or`1`, whichever is closer. A contrast large enough can push the channel values all the way to`0`or`1`.

<CodePen
  user="thebabydino"
  slug-hash="jOgbeQK"
  title="contrast() with superunitary value"
  :default-tab="['css','result']"
  :theme="dark"/>

If we have a large enough contrast, all channel values are either zeroed (`0%`) or maxed out (`100%`) meaning we can only get one of eight possible results.

![8 possible RGB values where all channels are either zeroed or maxed out](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/0f7000a3388819f3.png?resize=1024%2C202&ssl=1)

Coming back to our halftone pattern, we use:

```css
filter: contrast(16)
```

Here, all greys darker than a`50%`one (`grey`or`rgb(50%, 50%, 50%)`or`hsl(0, 0%, 50%)`) get pushed to`black`and all the others to`white`.

Now remember how the`50%`grey limit was a bigger circle if the dot was darker? That’s our limit for the contrast.

Inside that circle, we have greys darker than a`50%`one, so they get pushed to`black`by large contrast vales. Outside it, the greys are lighter than a`50%`one, so they get pushed to`white`by large contrast values.

Since the darker the dot, the bigger the`50%`limit circle, this means the halftone dots in the darker area of the map are bigger.

So here’s the result we get after the third and final declaration:

![the result so far](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/509305e81f382281.png?resize=901%2C368&ssl=1)

We’re starting to get somewhere, but what we have so far is not ideal. And it makes sense we aren’t there yet.

Since the left half of the map is darker than a`50%`grey (the RGB channel values are below`50%`or`.5`in decimal representation of the percentage), blending any other layer with it using the`multiply`blend mode gives us a result that’s at least as dark.

This means the result of blending across the entire left half is a grey darker than a`50%`one, so that large value contrast pushes everything in the left half to`black`.

The fix for this is pretty straightforward: we don’t make our gradients go all the way from black to white, but rather from mid greys to white. Furthermore, for best results, the map at its darkest should be a little bit brighter than a`50%`grey, while the pattern can be a bit darker.

```css
background: 
  radial-gradient(closest-side, #777, #fff) 0/ 1em 1em space, 
  linear-gradient(90deg, #888, #fff);
```

Much better!

<CodePen
  user="thebabydino"
  slug-hash="dyoPdqj"
  title="Pure CSS halftone pattern, 1 elem, 3 declarations"
  :default-tab="['css','result']"
  :theme="dark"/>

Now one thing to note here is that the contrast value needs to be enough to compensate for the blur radius of our dots. So if we increase the pattern size (the`background-size`for the pattern layer), then we also need to increase the contrast value accordingly.

Let’s say we increase the`background-size`from`1em`to `9em`.

![bigger dots, blurry edges](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/68e49afffb168fbf.png?resize=900%2C368&ssl=1)

The dot edges are now blurry, so we also increase the contrast value from`16`to let’s say`80`.

![increased contrast, jagged edges](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/ae3db55090272760.png?resize=900%2C368&ssl=1)

Unfortunately, this results in ugly edges.

A fix for this would be to then chain a slight blur and a contrast that’s enough to offset it. Generally, a contrast value that’s 2-3 times the blur value in pixels works pretty well.

```css
filter: contrast(80) blur(2px) contrast(5)
```

![tiny blur + contrast smoothing fix](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/13512b65def103c7.png?resize=900%2C368&ssl=1)

An[<VPIcon icon="fas fa-globe"/>even better fix](https://mastodon.social/@anatudor/112523336154596358)would involve using a custom SVG`filter`, but SVG filters are outside the scope of this article, so we’re not going there.

---

## Variations

Now that we’ve gone through the basics, we can start making things more interesting in order to get a lot of cool results by varying at least one of the pattern or map layers.

```css
background: 
  var(--pattern, radial-gradient(closest-side, #777, #fff) 0/ 1em 1em space)),
  var(--map, linear-gradient(90deg, #888, #fff));
  background-blend-mode: multiply;
  filter: contrast(16)
```

### Pattern variations

In this part, we’re keeping the map gradient unchanged and keeping the same hex values for the pattern gradients, though the pattern gradients themselves change. Depending on the pattern, we might also adjust the contrast.

If you search for halftone patterns online, you’ll see that most of them don’t show a straight grid like we had above. So let’s fix that with a pattern made up of two layers.

```css
--dot: radial-gradient(closest-side, #777, #fff calc(100%/sqrt(2)));
--pattern: var(--dot) 0 0/ 2em 2em, var(--dot) 1em 1em/ 2em 2em
```

In practice, I’d probably use a variable instead of`2em`and compute the offsets for the second layer of dots to be half of that.

![real halftone dots pattern](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/ede0f7f9f78f8a37.png?resize=800%2C542&ssl=1)

Also, since we’ve increased the size of the dots, we’ve also bumped up the contrast value from`16`to`24`.

Another option would be to use a`repeating-radial-gradient()`.

```css
--pattern: repeating-radial-gradient(circle, #777, #fff, #777 1em)
```

![halftone ripples](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/77e86cea5d4e399c.png?resize=800%2C542&ssl=1)

Something like this can even be animated or made interactive. We can place these halftone ripples`at var(--x) var(--y)`and change these custom properties on`mousemove`.

<CodePen
  user="thebabydino"
  slug-hash="GRVzeRa"
  title="Cursor following halftone rings (move fast)"
  :default-tab="['css','result']"
  :theme="dark"/>

We don’t have to limit ourselves to radial gradients. Linear ones work just as well. We can use a`repeating-linear-gradient()`, for example:

```css
--pattern: repeating-linear-gradient(#777, #fff, #777 1em)
```

![thinning lines](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/ff734f29576a22b2.png?resize=800%2C542&ssl=1)

We can also animate the gradient angle (like in the demo below on hover) or make it change as we move the cursor over the pattern.

<CodePen
  user="thebabydino"
  slug-hash="MWNLMwp"
  title="Animated halftone lines (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also restrict the`background-size`of a`linear-gradient()`:

```css
--pattern: linear-gradient(45deg, #fff, #777) 0 / 1em 1em
```

![triangles](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/0b652054e1566c02.png?resize=800%2C542&ssl=1)

Just like for the first dots pattern variation, here we’ve also bumped up the contrast.

We can also add one extra stop:

```css
--pattern: linear-gradient(45deg, #fff, #777, #fff) 0 / 1em 1em
```

![fragments](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/67445d9e99cfbf3e.png?resize=800%2C542&ssl=1)

For both of the previous ones, the gradient angle can also be animated. This can be seen on hovering the panels in the demo below.

<CodePen
  user="thebabydino"
  slug-hash="WNVmGqa"
  title="Halftone triangles/ fragments (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also play with conic gradients here. A simple repeating one produces rays that are thicker on the left than on the right.

```css
--pattern: repeating-conic-gradient(#777, #fff, #777 2.5%)
```

Without any`filter`adjustment however, the edges of these rays look bad, and so does the middle.

![rays, but with ugly edges](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/9a13d610e3cf9b1e.png?resize=800%2C542&ssl=1)

Using the tiny blur plus a contrast value that’s 2-3 times the blur tactic fixes the ray edges:

![smooth ray edges, but faded pattern edges](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/72904c5f8bde7582.png?resize=900%2C368&ssl=1)

… but the pattern’s edges are now faded! We have two possible fixes here.

The first would be to remove the`filter`from the element itself and apply it on another element stacked on top of it as a`backdrop-filter`.

<CodePen
  user="thebabydino"
  slug-hash="poMYWdz"
  title="smooth rays without fading edges #1"
  :default-tab="['css','result']"
  :theme="dark"/>

The second would be to make the element extend outwards a bit using a negative`margin`and then clip its edges by the same amount using`inset()`.

<CodePen
  user="thebabydino"
  slug-hash="mdNopBO"
  title="smooth rays without fading edges #2"
  :default-tab="['css','result']"
  :theme="dark"/>

Things get a lot more fun if we limit the`background-size`of such a`conic-gradient()`pattern and then play with the start angle`--a`and the end percentage`--p`.

```css
--pattern: 
  repeating-conic-gradient(var(--a), 
    #fff, #777, #fff var(--p)) 0/ 3em 3em
```

<CodePen
  user="thebabydino"
  slug-hash="bGXZvaE"
  title="conic-gradient halftone pattern variations"
  :default-tab="['css','result']"
  :theme="dark"/>

### Map variations

In this part, we’re keeping the pattern constant and trying out different maps.

Our`linear-gradient()`map doesn’t necessarily need to go along thexaxis - it can of course have a variable angle:

```css
--map: linear-gradient(var(--a), #888, #fff)
```

The demo below shows this angle being animated on hover:

<CodePen
  user="thebabydino"
  slug-hash="PoMvave"
  title="Animated halftone direction (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also add an extra stop:

```css
--map: linear-gradient(var(--a), #fff, #888, #fff)
```

Again, hovering the demo below animates the map direction.

<CodePen
  user="thebabydino"
  slug-hash="aberjzm"
  title="Animated halftone direction #2 (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also make our gradient a repeating one:

```css
--map: 
  repeating-linear-gradient(var(--a), #fff, #888, #fff var(--p))
```

<CodePen
  user="thebabydino"
  slug-hash="bGXyKjK"
  title="Animated halftone direction #3 (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

Or we can switch to a`radial-gradient()`:

```css
--map: 
  radial-gradient(circle at var(--x) var(--y), #888, #fff)
```

In the demo below, the radial gradient’s position follows the cursor:

<CodePen
  user="thebabydino"
  slug-hash="NWQVBjV"
  title="Animated halftone position (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

The radial gradient can be a repeating one too:

```css
--map: 
  repeating-radial-gradient(circle at var(--x) var(--y), 
    #fff, #888, #fff var(--p))
```

<CodePen
  user="thebabydino"
  slug-hash="MWNdxNJ"
  title="Animated halftone position #2"
  :default-tab="['css','result']"
  :theme="dark"/>

Same thing goes for conic gradients.

```css
--map: 
  conic-gradient(from var(--a) at var(--x) var(--y), 
    #fff, #888, #fff)
```

<CodePen
  user="thebabydino"
  slug-hash="vYoqKBJ"
  title="Animated halftone sweep (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

We can use a repeating one and control the number of repetitions as well.

```css
--map: 
  repeating-conic-gradient(from var(--a) at var(--x) var(--y), 
    #fff, #888, #fff var(--p))
```

<CodePen
  user="thebabydino"
  slug-hash="JjgQKbE"
  title="Animated halftone rays (hover)"
  :default-tab="['css','result']"
  :theme="dark"/>

One thing that bugs me about some of the map variation demos, particularly about this last one, is the dot distortion. We can make it look less bad by sizing the element with the halftone`background`such that both its dimensions are multiples of the dot size and change the position in increments of the same dot size.

```css
--d: 1em;
--pattern: 
  radial-gradient(closest-side, #777, #fff) 
    0/ var(--d) var(--d);
--map: 
  repeating-conic-gradient(from var(--a) 
    at round(var(--x), var(--d)) round(var(--y), var(--d)), 
    #fff, #888, #fff var(--p));
width: round(down, 100vw, var(--d));
height: round(down, 100vh, var(--d));
```

But it’s[not enough (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/dyxBXgm). In order for our dots to always be perfectly round, we need an SVG`filter`[solution (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/rNXjzLq). However, that’s outside the scope of this article, so we’re not discussing it here.

Even more interestingly, our map can be an image too. Taking any random image as it is won’t work well.

![using a random image as it is for the map doesn’t work well](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/6d4acb5fd5471079.png?resize=800%2C542&ssl=1)

We need to bring its saturation down to zero and, for this particular technique, we need to make sure the lightness of its pixels is pretty much in the`[50%, 100%]`interval.

The[`filter()` (<VPIcon icon="iconfont icon-github"/>`web-platform-tests/interop`)](https://github.com/web-platform-tests/interop/issues/717)function[could help (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/rNgBqNy)here, but, sadly, for[<VPIcon icon="fas fa-globe"/>almost a decade now](https://iamvdo.me/en/blog/advanced-css-filters#filter), Safari has remained the only browser implementing it. We could make the pattern and the map layer each be a pseudo of an element, blend them together and apply the contrast`filter`on the pseudo-elements’ parent. This way, the map pseudo could have a`filter`applied on it too. However, here we’re looking for solutions that don’t involve extra elements or pseudo-elements.

Something we can do is make the map be the result of multiple blended background layers. Making the`background-color`*any*grey and blending it with the map image using the`luminosity`blend mode gives us a result that has the luminosity of the map image on top, the saturation of the`background-color`below and, since this is a grey (its saturation is`0%`), the hue becomes irrelevant.

Note that luminosity is[not the same as lightness (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/full/RwoOMOZ)(which is the ‘L’ in HSL), though in a lot of cases, they’re close enough.

```css
--pattern: 
  radial-gradient(closest-side, #777, #fff) 0/ 1em 1em space;
--map: url(my-image.jpg) 50%/ cover grey;
background: var(--pattern), var(--map);
background-blend-mode: 
  multiply /* between pattern & map */, 
  luminosity /* between map layers */;
filter: contrast(16)
```

We seem to be going in the right direction.

![using a fully desaturated map obtained via blending](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/43f69454ed0b1b46.png?resize=800%2C542&ssl=1)

But it’s still not what we want, as this desaturated map is too dark, just like the first`black`to`white`map gradient we tried.

We can brighten our map using the`screen`blend mode. Think of this blend mode as being the same as`multiply`, only with the ends of the lightness interval reversed.`multiply`always produces a result that’s at least as dark as the darkest of its two inputs,`screen`always produces a result that’s at least as bright as the brightest of its two inputs.

In our case, if we use`screen`to blend the desaturated image we got at the previous step with a midway grey like`#888`, then the result is always at least as bright as`#888`. And it is`#888`only where we blend it with pure black pixels. Wherever we blend it with pixels brighter than pure black, the result is brighter than`#888`. So basically, we get a map that’s`#888`at its darkest, just like our base map gradient.

```css
--pattern: 
  radial-gradient(closest-side, #777, #fff) 0/ 1em 1em space;
--map: 
  conic-gradient(#888 0 0), 
  url(my-image.jpg) 50%/ cover
  grey;
background: var(--pattern), var(--map);
background-blend-mode: 
  multiply /* between pattern & map */, 
  screen /* between map layers */, 
  luminosity /* between map layers */;
filter: contrast(16)
```

Much better!

![using a fully desaturared and brightened map via blending<br/>([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/MWNMjGO))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/e26625a9ee83b58f.png?resize=800%2C542&ssl=1)

Again, some of the dots aren’t fully round, but in order to get fully round dots, we’d need an SVG`filter`and that’s a way too big of a topic to discuss here.

### Palette variations

The simplest possible variation would be having white halftone dots on a black background. To do this, we can simply chain`invert(1)`to our`filter`.

Or… we can do something else! We can use the`screen`blend mode we’ve used before to brighten the image map. As mentioned, this works like`multiply`, but with the ends of the lightness interval reversed. So let’s reverse them for both the pattern and the map.

```css
background: 
  var(--pattern, 
    radial-gradient(closest-side, #888, #000) 0/ 1em 1em space), 
  var(--map, 
    linear-gradient(90deg, #777, #000));
background-blend-mode: screen;
filter: contrast(16)
```

![inverted halftone dots pattern<br/>([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/YzmmaXp))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/da3b0c684bccb94d.png?resize=800%2C600&ssl=1)

But we’re not limited to just black and white.

Remember the part about how contrast works? Large contrast values push all pixels of the`filter`input to one of 8 possible RGB values. So far, our`filter`input has been just greys, so they got pushed to either black or white. But we don’t necessarily need to have just greys there. We could tweak those values to either zero or max out a channel or two everywhere.

For example, if we max out one of the channels, then our black dots get that channel added to them. Maxing out the red channel gives us red dots, maxing out the blue channel gives us blue dots, maxing out both the red and blue channels gives us magenta dots.

Going the other way, if we zero one of the channels, then it gets subtracted out of the white background. Zeroing the blue channel gives us a yellow background (the red and green channels are still maxed out for the background and combined, they give yellow). Zeroing the red channel gives us a cyan background. Zeroing both the blue and green channels gives us a red background.

You can play with various scenarios in the interactive demo below:

<CodePen
  user="thebabydino"
  slug-hash="RwXmQYZ"
  title="palette variations"
  :default-tab="['css','result']"
  :theme="dark"/>

We can of course also have more interesting palettes and we can even have halftone dots on top of image backgrounds using the pure CSS[blending technique (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/qBGWXNR)I detailed in[a talk on the topic (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/project/full/ZjwjBe)I used to give in 2020 or by using[SVG (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/abMvzoo)[filters (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/bGXeGoa). Both of these approaches however require more than just one element with no pseudos and three CSS properties, so we won’t be going into details about them here.

### Combining these variations (and more!)

Varying more than one of the above can help with interesting results.

By using top to bottom linear gradients for both the pattern and the map, with the pattern one having its size limited to`10%`of the element, we can get the effect below without needing to use a`mask`gradient with many irregulrly placed stops. Blending with some extra layers helps us with a nicer palette for the final result.

<CodePen
  user="thebabydino"
  slug-hash="jOvMQMO"
  title="Pure CSS retro wave"
  :default-tab="['css','result']"
  :theme="dark"/>

We can also animate a map’s`background-position`to get a blinds effect like below:

<CodePen
  user="thebabydino"
  slug-hash="MWPWXXw"
  title="1 div pure CSS blinds staggered animation in 13 declarations"
  :default-tab="['css','result']"
  :theme="dark"/>

In the demo above, we’ve also blended the halftone pattern with an image. Here’s another such example (note that this doesn’t work in Firefox due to[<VPIcon icon="fa-brands fa-firefox"/>bug 1481498](https://bugzilla.mozilla.org/show_bug.cgi?id=1481498), which has everything to do with the text on the right side and nothing to do with the halftone part):

![card with halftone effect<br/>([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/GRNKqRv))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/6f1546f3d6c887ad.png?resize=800%2C540&ssl=1)

Note that the code for all these demos so far is heavily commented, explaining the purpose of pretty much every CSS declaration in there.

The example below uses a`repeating-radial-gradient()` pattern and a`conic-gradient()` map, which funny enough, also creates a tiny heart in the middle.

<CodePen
  user="thebabydino"
  slug-hash="oNWjoqN"
  title="Heart in ripples pattern - 1 div, 5 CSS declarations"
  :default-tab="['css','result']"
  :theme="dark"/>

For a bit of a different effect, here’s a rhombic halftone one created by using two blended layers for the map - two otherwise identical linear gradients going in different directions:

<CodePen
  user="thebabydino"
  slug-hash="xxYMOoQ"
  title="Varying stripes on rhombic tiling pattern"
  :default-tab="['css','result']"
  :theme="dark"/>

The demo below is a combination of two halftone patterns stacked one on top of the other, the top one being masked using a`conic-gradient()`[<VPIcon icon="fas fa-globe"/>checkerboard](https://css-tricks.com/background-patterns-simplified-by-conic-gradients/#aa-checkerboard)`mask`.

<CodePen
  user="thebabydino"
  slug-hash="LYyNVJQ"
  title="1 div, pure CSS halftone dash dot pattern"
  :default-tab="['css','result']"
  :theme="dark"/>

Here are a few more halftone samples as card backgrounds:

<CodePen
  user="thebabydino"
  slug-hash="QWMRWRQ"
  title="#codeVember #22/2021: 1 div halftone patterns"
  :default-tab="['css','result']"
  :theme="dark"/>

Even more such halftone samples can be found in this gallery:

<CodePen
  user="thebabydino"
  slug-hash="NWxBzRv"
  title="Pure CSS 1 div card patterns (no SVG, no images other than CSS gradients)"
  :default-tab="['css','result']"
  :theme="dark"/>

We aren’t limited to 2D. We can also use such paterns in 3D and even animate them.

<VidStack src="https://videos.files.wordpress.com/eeDElcKd/6256426a4cb6efcf-1_mp4_hd.mp4" />
<!-- excavated cube with animated halftone<br/>([live demo (<VPIcon icon="fa-brands fa-codepen"/>)](https://codepen.io/thebabydino/pen/RwQjpmQ)) -->

Finally, even more demos showcasing halftone patterns can be found in[<VPIcon icon="fa-brands fa-codepen"/>this CodePen collection](https://codepen.io/collection/JYoLNJ):

![the CodePen collection](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/14cc30f5f74044f0.png?resize=1024%2C781&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Pure CSS Halftone Effect in 3 Declarations",
  "desc": "A halftone is a pattern of dots that vary in size and spacing. It's a printing technique that you normally don't see, but blown up in size, is a cool aesthetic. This is a deep dive on how it can be done in CSS alone, starting quite simply! ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/pure-css-halftone-effect-in-3-declarations.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
