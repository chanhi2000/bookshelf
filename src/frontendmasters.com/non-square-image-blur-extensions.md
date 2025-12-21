---
lang: en-US
title: "Non-Square Image Blur Extensions"
description: "Article(s) > Non-Square Image Blur Extensions"
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
      content: "Article(s) > Non-Square Image Blur Extensions"
    - property: og:description
      content: "Non-Square Image Blur Extensions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/non-square-image-blur-extensions.html
prev: /programming/css/articles/README.md
date: 2025-12-01
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7855
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
  name="Non-Square Image Blur Extensions"
  desc="I recently came across this CodePen demo by Vivi Tseng, which creates the blur extension effect by placing a square div with a blur() beneath the img element and I couldn’t help but think a simpler solution should be possible with a single img element and minimal CSS. So let’s first take a look at […]"
  url="https://frontendmasters.com/blog/non-square-image-blur-extensions/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7855"/>

I recently came across [this CodePen demo (<VPIcon icon="fa-brands fa-codepen"/>`vii120`)](https://codepen.io/vii120/pen/raxYedQ?editors=0100) by Vivi Tseng, which creates the blur extension effect by placing a square `div` with a `blur()` beneath the `img` element and I couldn’t help but think a simpler solution *should* be possible with a single `img` element and minimal CSS.

![the result we’re aiming for](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/article_target_result.png?resize=1024%2C575&ssl=1)

So let’s first take a look at how to approach things for a simple, four CSS declarations solution. And then we’ll be going through how to tackle extra constraints, such as better support, an extra touch like fading the image into its blur extension and not knowing what orientation an image might have.

---

## The Simple Solution, Dissected

We have an `img` element:

```html
<img src='my-image.jpg' alt='image description' />
```

### The 1st Declaration

We start out by setting either a `width` or a `height` for our `img`. In theory, it doesn’t matter. In practice, other layout constraints often make using `width` more convenient.

```css
width: min(100%, 23em)
```

This is like setting both a `width` and a `max-width` in one declaration thanks to the `min()`. It doesn’t allow the image to get bigger than `23em`, nor does it allow it to overflow.

Note that setting the `width` this way is making some assumptions about the overall layout that may not always be true. For example, if the `width` of the `img` is constrained by that of a `grid` column, then it’s probably better to use the `min()` to size the column and then set the `width` or `max-width` of the `img` to `100%`. But since the page layout isn’t central to the technique covered in this article, we’re leaving that discussion aside.

So far, this is what have for four example images arranged in a `2×2` grid.

![result after setting the `width`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_0_size.png?resize=1024%2C740&ssl=1)

### The 2nd Declaration

Next, we make our `img` occupy a square box:

```css
aspect-ratio: 1
```

Since this technique refers to non-square images, an `aspect-ratio` of `1` stretches our `img`.

![result after setting the `aspect-ratio`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_1_ratio.png?resize=1024%2C575&ssl=1)

The stretching doesn’t look good, which leads us to the next step.

### The 3rd Declaration

The fix for the distortion problem is to use [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit):

```css
object-fit: contain
```

The `contain` value scales the actual image until its longer side exactly fits the square box of the `img`, leaving empty space around the shorter side. By contrast, `cover` scales the actual image until its shorter side exactly fits the square box of the `img`, cropping the ends of the longer side.

<CodePen
  user="anon"
  slug-hash="KwVYjzN/1f8e53f79e207072d845b85f25cc1eb9"
  title="contain vs. cover interactive explainer demo"
  :default-tab="['css','result']"
  :theme="dark"/>

In both cases, the image is middle aligned with its square box along both axes by default, though we can change that via [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-position).

![where we are at this point](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_2_alignment.png?resize=1024%2C575&ssl=1)

Background images can also use the `contain` and `cover` values for `background-size` – we’ll get to that in a moment.

### The 4th Declaration

Finally, we set the `background` of the square `img` element to a a blurred, slightly darkened and desaturated copy of the image. Using a `cover` value for `background-size` ensures the shorter side of the `background-image` exactly fits the square box of the `img` element, while the ends of the longer side are cropped.

This filtered `background` is mostly hidden under the actual image, but can be seen around its shorter side, filling out the remaining space to the boundary of the square `img` box.

```css
background: 
  filter(
    src(attr(src)), 
    blur(8px) brightness(.8) contrast(.7)
  ) 
  50% / cover
```

There’s a lot in that one declaration, so let’s go through it step by step.

The [<VPIcon icon="iconfont icon-w3c"/>`filter()`](https://w3.org/TR/filter-effects-1/#FilterCSSImageValue) *function* is a lesser known CSS feature, but it has been around for over a decade. Unlike the widely used `filter` *property*, which applies visual effects to an element, `filter()` takes an image and a filter chain as arguments and returns the filtered image. Because it produces an image value, we can feed it to any CSS property that accepts an image: `background-image`, `border-image-source`, `mask-image` and so on.

It’s a CSS feature I’ve [**talked about before**](/frontendmasters.com/grainy-gradients.md) as it allows us to apply a filter *only* to the `background` of an element, for example making a card’s gradient `background` grainy without affecting its text content.

![a card with a grainy gradient background](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/grainy_gradient.png?resize=1024%2C575&ssl=1)

The [<VPIcon icon="iconfont icon-w3c"/>`src()`](https://w3.org/TR/css-values/#funcdef-src) function is even more obscure. Like `url()`, it represents a URL, but unlike `url()`, it allows other CSS functions inside, such as `var()` or `attr()`.

The [<VPIcon icon="fa-brands fa-chrome"/>revamped `attr()`](https://developer.chrome.com/blog/advanced-attr) can now be used for more than just `content` values. In our case, we use it to supply the `src()` function with the actual `src` attribute of the `img` element. Extracting the image URL from the `src` attribute allows us to have the filtered `background` of the `img` stay in sync with the actual image while avoiding duplication.

::: note

Note the `background-position`, which we must set to `50%` here.

:::
First, this is because when the `background-size` is specified *in the shorthand*, then the `background-position` must be provided there too.

Second, it’s because the default `background-position` is `0 0`, which pins the top left corner of the `background-image` to the top left corner of the box. So we must explicitly override that in order to middle align the blurred `background-image` along both axes, just like the actual image with `object-fit: contain` is.

When specifying a single `background-position` value, this applies to the *x* axis, while the *y* axis value defaults to `50%`, *regardless* of the *x* axis value. In our case, the *x* axis value *happens* to be `50%` too, but if it was `0`, the *y* axis value would still default to `50%`.

So in the end, our CSS is:

```css
img {
  width: min(100%, 23em) /* 1 */;
  aspect-ratio: 1 /* 2 */;
  object-fit: contain /* 3 */;
  background: 
    filter(
      src(attr(src)), 
      url(#blur) brightness(0.8) contrast(0.7)
    )
    50% / cover; /* 4 */
}
```

This approach doesn’t require any duplication or knowing anything about the image.

---

## Support Sadness

The problem with the final declaration and the reason why you aren’t seeing any live demo here yet is, as you may have guessed, support!

While `filter()` has been available in Safari for over a decade, Chrome ([<VPIcon icon="fa-brands fa-chrome"/>541698](https://issues.chromium.org/issues/41208242)) and Firefox ([<VPIcon icon="fa-brands fa-firefox"/>1191043](https://bugzilla.mozilla.org/show_bug.cgi?id=1191043)) *still* haven’t followed.

The improved `attr()` only works in Chromium browsers for now. It isn’t yet supported by Firefox ([<VPIcon icon="fa-brands fa-firefox"/>435426](https://bugzilla.mozilla.org/show_bug.cgi?id=435426)) or Safari ([<VPIcon icon="fa-brands fa-safari"/>26609](https://bugs.webkit.org/show_bug.cgi?id=26609)), though the Firefox bug has seen quite a bit of activity lately.

Consequently, no single browser currently supports both `filter()` and the enhanced `attr()`.

On top of that, no browser currently implements `src()`. There are issues open in Firefox ([<VPIcon icon="fa-brands fa-firefox"/>1707923](https://bugzilla.mozilla.org/show_bug.cgi?id=1707923)) and Safari ([<VPIcon icon="fa-brands fa-safari"/>296953](https://bugs.webkit.org/show_bug.cgi?id=296953)) and I’ve also opened one for Chrome ([<VPIcon icon="fa-brands fa-chrome"/>457465864](https://issues.chromium.org/issues/457465864)) since search didn’t bring up one there.

![current support situation](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_3_support.png?resize=1024%2C576&ssl=1)

---

## Current Options

Browser support won’t improve overnight, so today let’s focus on what solutions we can find that work at least in one current browser.

### Using a CSS Variable for the `filter()` Image

Duplicating the image URL in a CSS variable isn’t ideal, but it’s the best we currently have. Even in this scenario, using an HTML preprocessor like Pug lets us keep things DRY (the rest of the HTML blocks in this article will be in Pug):

```pug
- let src = 'my-image.jpg'

img(src=src alt='image description' style=`--img: url(${src})`)`
```

The compiled HTML with the duplicated URL looks as follows:

```html
<img src='my-image.jpg' alt='image description' style='--img: url(my-image.jpg)' />
```

In the CSS, we replace the unsupported `src(attr(src))` with the CSS variable we’ve set in the `style` attribute if our `img`:

```css
background: 
  filter(var(--img), blur(8px) brightness(.8) contrast(.7)) 
  50% / cover
```

Since only Safari supports the `filter()` function for now, we cannot test this out in Chrome or Firefox. Linux users may still experiment with Safari’s WebKit engine via the [<VPIcon icon="iconfont icon-gnome"/>Epiphany](https://flathub.org/en/apps/org.gnome.Epiphany) (GNOME Web) browser.

When actually testing, the result doesn’t seem quite right. The problem becomes obvious if the page backdrop is a small size pattern, for example [a checkerboard one](/css-tricks.com/background-patterns-simplified-by-conic-gradients.md#checkerboard).

![the result we have so far in Safari](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_edge_issue.png?resize=1024%2C575&ssl=1)

This happens because of how the CSS `blur()` filter works and, in particular, the effect it has on the pixels close to the image edge.

![illustrating the mechanism of our problem](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_edge_issue_cause.png?resize=1024%2C575&ssl=1)

Blurring operates on each pixel’s RGBA channels individually. Taking the alpha channel in particular, the result is a combination of the current pixel’s alpha value with the alphas of the surrounding pixels.

Near the image boundary, things get trickier. Some of the pixels around our current one lie *outside* the image. The CSS `blur()` filter treats the out‑of‑bounds pixels as fully transparent. Consequently, the resulting alpha becomes subunitary, which makes the pixels close to the edge semi‑transparent. This is most obvious when we have a patterned backdrop showing through the semi-transparent pixels.

![how blurring works, illustrated with a `4px×4px` element and a `3×3` weight grid; the weights are multiplied with the alphas of the corresponding pixels and the linear combination is divided by the sum of all weights](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_edge_issue_blur_process.png?resize=1024%2C575&ssl=1)

In this case, we only have semi-transparent pixels along two opposing edges because the image is *first* blurred within the `filter()` function, *then* used as a `background-image` that gets cropped by `background-size: cover`.

The solution is to switch from a pure CSS `blur()` to an SVG `filter`. This is pretty straightforward. The SVG `filter` contains a single `feGaussianBlur` primitive, which provides an [<VPIcon icon="fa-brands fa-firefox"/>`edgeMode`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/edgeMode) attribute to control what happens at the image edges. The default value of `none` produces the same result as the CSS `blur()`. By contrast, a value of `duplicate` prevents the unwanted edge semi-transparency.

```pug
svg(width='0' he~ight='0' aria-hidden='true')
  filter#blur(color-interpolation-filters='sRGB')
    feGaussianBlur(stdDeviation='8' edgeMode='duplicate')
```

The `svg` element exists solely to host the `filter`. It is functionally the same as a `style` element, so we zero its dimensions, hide it from screen readers and, in the CSS, remove it from the document flow with `position: fixed`.

When an SVG `filter` modifies RGB values, we must set its `color-interpolation-filters` attribute to `sRGB`. This is the case here, since the `feGaussianBlur` combines the RGBA channels of every pixel with those of the pixels around it and, in the case of images, adjacent pixels normally have different RGB values.

![the correct simple blur extension (Safari only [live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/gbPZyKZ))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_edge_issue_corrected.png?resize=1024%2C575&ssl=1)

Remember this approach works only in Safari, since both the `filter()` function and the `edgeMode` attribute are still unsupported in Chrome and Firefox.

### Getting Around Poor `filter()` Support for a Cross-Browser Solution

The lack of `filter()` support prevents us from blurring just the `background-image`. Consequently, a single `img` element is not enough for us to have two layers of the same image, an unaltered one on top and a blurred one at the bottom.

Therefore, we need to wrap the `img` in a `.wrap` element and move the CSS variable holding the image URL onto this wrapper.

```pug{3}

- let src = 'my-image.jpg'
  .wrap(style=`--img: url(${src})`)
    img(src=src alt='image description')
```

Moving on to the CSS, we first size the wrapper instead of the `img`, which we now force to take its parent’s `width`.

```css{2,5}
.wrap {
  width: min(100%, 23em);
  
  img {
    width: 100%; aspect-ratio: 1; object-fit: contain; 
  }
}
```

![square `img` elements with `object-fit: contain`, tightly fit within their wrapper](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_made_cross_browser_outlines.png?resize=1024%2C575&ssl=1)

Next, we set the wrapper’s `background` to the CSS variable copy of the `src`. This `background` is sized using `cover` so it completely fills the square box of the `.wrap` without distortion.

```css
background: var(--img) 50% / cover
```

Finally, the `img` gets a `backdrop-filter()` to blur the `background` of its wrapper set at the previous step.

```css
backdrop-filter: blur(8px) brightness(.8) contrast(.7)
```

We have just one problem: under each square image, there’s [<VPIcon icon="fa-brands fa-stack-overflow"/>a bit of unwanted space](https://stackoverflow.com/a/7774854/1397351) that causes its wrapper to extend a few pixels further. And if we look carefully at the previous screenshot, we can see we had the same problem there too, it’s just more obvious now, especially when zooming in on it.

![a close look at the problem](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/base_tiny_problem.png?resize=1024%2C575&ssl=1)

The fix is to set a `display` property. It can be `block` on the `img` itself, or `grid` on its `.wrap` parent. I often prefer the `grid` approach nowadays for other benefits, but strictly when it comes to solving this particular problem at this particular point, it makes no difference which we use.

Consequently, the final CSS for the base version of a cross‑browser blur extension is:

```css{2}
.wrap {
  display: grid;
  width: min(100%, 23em);
  background: var(--img) 50% / cover;
  
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    backdrop-filter: blur(8px) brightness(0.8) contrast(0.7);
  }
}
```

<CodePen
  user="anon"
  slug-hash="ZYWEggJ"
  title="Non-square img blur extension/ padding to square (cross-browser)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Extra Fade Touch

The demo that inspired this deep dive also fades the image at the edges where it meets its blurred copy.

In this case, the `img` element can’t be a square box with `object-fit: contain` for the actual image content. That would cause the edge fade to happen at the edges of the square `img` box, not at the edges of the actual non-square image contained within.

However, when the `img` element isn’t square anymore, it doesn’t have those transparent bands on the sides of the actual image and doesn’t cover the entire area of its parent anymore. That means we cannot set the `backdrop-filter` on the `img` to blur its wrapper’s `background` anymore.

The solution is to add an extra layer in between the `img` and its parent and set the `backdrop-filter` there. This can be the `::before` pseudo-element of the wrapper, which we stack in the same `grid-area` as the `img`.

Doing so illustrates one of the advantages of a `grid` on the wrapper to prevent that extra space below the `img`: the use of `grid` [<VPIcon icon="fas fa-globe"/>simplifies stacking](https://bsky.app/profile/anatudor.bsky.social/post/3ley64k4zsc2q) elements and pseudo‑elements.

```css
.wrap {
  /* same styles as before _for now_ */

  &::before,
  img {
    grid-area: 1/ 1;
  }

  &::before {
    backdrop-filter:
      blur(8px) brightness(0.8) contrast(0.7);
    content: "";
  }
}
```

Setting the `backdrop-filter` moves the `::before` pseudo-element on top of the `img` and applies the blur to it as well. So we need to we move the `img` back on top with a positive `z-index`. A value of `1` suffices, no need to forget the finger on the `9` key for eternity.

The stacking order is not the only problem we need to solve after these changes to the code. While the wrapper must remain square, setting `aspect‑ratio` on it can’t guarantee that anymore once we have a non-square `img` within. The image’s intrinsic dimensions interfere with the wrapper’s sizing, so we need a different approach to keep the wrapper square.

That is, the following CSS fails to limit the `height` in the case of portrait images:

```css
.wrap {
  display: grid;
  width: min(100%, 23em);
  aspect-ratio: 1;

  img {
    max-width: 100%;
    max-height: 100%;
  }
}
```

The screenshot below, where we’ve removed the wrapper `background` and the pseudo `backdrop-filter` for simplicity, illustrates this: a portrait image will stretch its wrapper vertically and, consequently, the grid cell the wrapper is contained in.

![when `aspect-ratio` fails](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_base_layout_issue_an.png?resize=1024%2C575&ssl=1)

We can fix this problem by explicitly setting both the `width` and the `height` of the `.wrap` to the same value. However, if we want to avoid that repetition, we can make the wrapper an inline `container` and set the `max-width` and `max-height` of the `img` to the wrapper’s `width`, now known as `100cqw`.

```css{3,8-9}
.wrap {
  display: grid;
  container-type: inline-size;
  width: min(100%, 23em);
  aspect-ratio: 1;

  img {
    max-width: 100cqw;
    max-height: 100cqw;
  }
}
```

![the container fix](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_base_layout_issue_workaround_an.png?resize=1024%2C575&ssl=1)

Next, we set `place-self: center` on the `img` to middle align it along the axis of its shorter side.

Reintroducing the wrapper `background` and the `backdrop-filter` of the `::before` pseudo-element, the CSS we have so far looks as follows:

```css
.wrap {
  display: grid;
  container-type: inline-size;
  width: min(100%, 23em);
  aspect-ratio: 1;
  background: var(--img) 50% / cover;

  &::before,
  img {
    grid-area: 1/ 1;
  }

  &::before {
    backdrop-filter: blur(8px) brightness(0.8) contrast(0.7);
    content: "";
  }

  img {
    place-self: center;
    z-index: 1;
    max-width: 100cqw;
    max-height: 100cqw;
  }
}
```

At this point, it produces the same result as before, without the fade effect.

![where we are: same visual result as before](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_before_fade.png?resize=1024%2C575&ssl=1)

You might wonder why we still use `backdrop-filter` instead of setting the image `background` on the `::before` and blurring it, like the original demo does with a `div` sibling of the `img`. The problem with applying a CSS `blur()` on an element is the same one we previously encountered when applying it on an image background: the pixels close to the edges become semi‑transparent, which is especially noticeable against a patterned page backdrop. The original demo suffers from this as well.

![the problem with blurring elements, illustrated by the original demo](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_edge_issue_original_an.png?resize=1024%2C575&ssl=1)

Finally, we use a linear gradient `mask` to fade the edges of the image found within the square. The question is: how do we know along which axis this `linear-gradient()` needs to go?

### Known Aspect Ratio

The original demo gives portrait images a `.vertical` class and uses it to set a different `mask` gradient. This is an option, though I’d rather use a `data-orientation` attribute instead of a class and only set another direction of the `linear-gradient()` for portrait images instead of setting the entire `mask` again.

```css
[data-orientation] {
  --prc: 20%;
  mask: linear-gradient(
    var(--dir,) #0000,
    red var(--prc) calc(100% - var(--prc)),
    #0000
  );
}

[data-orientation="portrait"] {
  --dir: 90deg;
}
```

You might wonder whether those CSS variable values are valid. They are, it’s not a case of typos sneaking into the code. Using an empty string as a value (or fallback) for a custom property is perfectly fine. A value that ends with a comma is also valid — the comma simply separates the direction (`90deg`) from the list of gradient stops.

<CodePen
  link="https://codepen.io/anon/QwNwWOJ/491f2da43ccfdc5f4d15bde2dae57f06"
  title="Non-square img blur extension/ padding to square (cross-browser, extra fade)"
  :default-tab="['css','result']"
  :theme="dark"/>

Alternatively, we may be given an `img` aspect ratio, either as a CSS variable or as an attribute. Thanks to the updated `attr()` function, we can now use attribute values in calculations, though, as previously mentioned, this is not yet supported cross-browser.

An aspect ratio is a `width/height` ratio. If the first number, the width, is smaller (for example in the case of a `2/3` aspect ratio), we have a portrait image. If the second number, the height, is smaller (for example in the case of a `3/2` aspect ratio), we have a landscape image. You can see this illustrated by the interactive demo below:

<CodePen
  user="anon"
  slug-hash="XWpyowX"
  title="Variable ratio cards"
  :default-tab="['css','result']"
  :theme="dark"/>

Coming back to our demo, we can determine whether our image is a portrait or landscape one by using the `sign()` function.

```css
--sgn: sign(1 - var(--img-r))
```

Subtracting the given aspect ratio from `1` gives us a negative number for landscape images (aspect ratio greater than `1`) and a positive number for portrait images (aspect ratio less than `1`). The `sign()` function therefore returns `-1` for landscape images and `1` for portrait ones.

This allows us to calculate the `mask` gradient angle as:

```css
calc((1 + var(--sgn))*45deg)
```

If the sign is `-1` (landscape), the expression inside the parentheses evaluates to `0`, giving us an angle of `0·45° = 0°`. If the sign is `1` (portrait), the expression inside the parentheses evaluates to `2`, giving us an angle of `2·45° = 90°`.

So the CSS to fade the image edges along the needed axis based on its given aspect ratio looks as follows:

```css{3,5}
img {
  --p: 20%;
  --sgn: sign(1 - var(--img-r));
  /* same as before */
  mask: linear-gradient(
    calc((1 + var(--sgn)) * 45deg),
    #0000,
    red var(--p) calc(100% - var(--p)),
    #0000
  );
}

```

Square images are a special case. Their aspect ratio is exactly  `1`, so the sign of the difference evaluates to `0` and the gradient angle becomes `45°`. If we don’t want a diagonal fade for square images, we can make the gradient’s outer stops opaque instead of transparent.

To do this, we introduce a binary flag:

```css
--bit: calc(1 - abs(var(--sgn)))
```

If the sign is `±1` (not a square image), then its absolute value is `1` and subtracting that from `1` gives us `0` for our bit flag. If the sign is `0` (square image), then it’s still `0` in absolute value and subtracting that from `1` gives us `1` for our bit flag.

Finally, we use this flag as the alpha channel of the `mask` gradient’s end stops:

```css
--end: rgb(0 0 0/ var(--bit))
```

So our final CSS for the fade effect when given the aspect ratio, including square image guardrails, looks as follows:

```css{4,8,10}
img {
  --p: 20%;
  --sgn: sign(1 - var(--img-r));
  --end: rgb(0 0 0 / calc(1 - abs(var(--sgn))));
  /* same as before */
  mask: linear-gradient(
    calc((1 + var(--sgn)) * 45deg),
    var(--end),
    red var(--p) calc(100% - var(--p)),
    var(--end)
  );
}

```

<CodePen
  link="https://codepen.io/anon/KwzwOJV/2ddedd28e3c841f156876f12cb1f427d"
  title="Non-square img blur extension/ padding to square (cross-browser, extra fade #2)"
  :default-tab="['css','result']"
  :theme="dark"/>

### Unknown Aspect Ratio

I can think of two solutions when also having this constraint:

- an SVG `filter` one, using the result of a `feGaussianBlur` with `edgeMode` set to `duplicate` as a kind of mask for the image; it only works in Safari and even there, depending on the viewport size, it may behave oddly
- a pure CSS one, duplicating the `img` inside yet another `div` which we also make a `container` so we can compute the aspect ratio of the `img` within by dividing the `container` dimensions (`100cqw/100cqh`); it can be made to work cross-browser, but requires two extra elements in addition to the previous `.wrap` around the original `img`

Neither solution is ideal, though I would prefer the SVG `filter` “mask” *if* it worked properly cross-browser. However, exploring both was an interesting exercise, so let’s take a quick look at each option.

#### Direction-Agnostic Masking via an SVG filter (Safari Only)

We’re rolling back the changes we’ve made for the image fade so far: removing the `container` specific styles, restoring the square `aspect‑ratio` of our `img` and setting `object-fit` on it again. The `img` also receives a semi-transparent `background` with an alpha of `.5`; the actual RGB values are irrelevant.

```css
.wrap {
  display: grid;
  width: min(100%, 23em);
  /* removed the blurred image copy on parent _for now_ */

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    background: rgb(var(--rgb) / 0.5);
  }
}
```

For now, we’ve also removed the parent `background` and the `::before` pseudo to make it easier to understand what’s going on. We’ll be adding them back later.

We now have our `filter` input: a square `img` element with the fully opaque actual image contained in the middle and semi-transparent `background` bands around it’s shorter side filling out the square

![our pre-filter setup](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_base_setup_an.png?resize=1024%2C575&ssl=1)

Keep this in mind: the `filter` input is the square box of the `img` as highlighted above. This is why these screenshots highlight the square boundaries.

The base setup for the `filter` is the same as before, we just set `primitiveUnits` to `objectBoundingBox` in addition to that. This makes all length values inside relative to the size of the `filter` input – in our case, that’s the edge length of the `img` square.

```pug
svg(width='0' height='0' aria-hidden='true')
  filter#fade(color-interpolation-filters='sRGB' primitiveUnits='objectBoundingBox')
```

First, we extract just the opaque image contained within the `img` square and save this `result` as `image`. We do this with a [<VPIcon icon="fas fa-globe"/>`feComponentTransfer`](https://webplatform.github.io/docs/svg/elements/feComponentTransfer/) that zeroes the alpha of all input pixels with an alpha of `.5` – in our case, the semi-transparent `background` pixels on the sides of the image. We only need those to force our `filter` input into a square — we’ll see in a moment why that’s important. But they don’t matter otherwise, so we promptly discard them inside the `filter`.

```pug{3-4}
svg(width='0' height='0' aria-hidden='true')
  filter#fade(color-interpolation-filters='sRGB'  primitiveUnits='objectBoundingBox')
    feComponentTransfer(result='image') 
      feFuncA(type='table' tableValues='0 0 1')
```

`feComponentTransfer` allows us to modify the channels of its input individually. We only need to modify the alpha here, so we use `feFuncA`.

With 3 space-separated numbers for `tableValues`, the `[0, 1]` alpha interval is divided into `2 = 3 - 1` equal sub-intervals (`[0, .5)` and `[.5, 1]`). The three sub-interval ends (`0`, `.5` and `1`) are then mapped to the `tableValues`.

The mapping for our `filter` is as follows:

- an input alpha of `0` is mapped to `0`; this means the empty transparent space around the `filter` input square, reserved so we don’t cut out things like box shadows remains transparent
- an input alpha of `.5` is mapped to `0`; this means the semi-transparent strips filling up the square on the sides of the image become fully transparent
- an input alpha of `1` is mapped to `1`; the fully opaque image in the middle of the input square remains fully opaque

Consequently, all the alphas from the first sub-interval `[0, .5)` get mapped to `0`, while the second sub-interval `[.5, 1]` linearly maps to `[0, 1]`. For example, an alpha of `.25` is mapped to `0`, an alpha of `.6` is mapped to `.2`, an alpha of `.8` is mapped to `.6` and so on.

Here, we only encounter the three endpoint alphas (`0`, `.5`, `1`), never any intermediate values. However, it’s still useful to understand how this mapping works, should other opacity levels ever arise.

![graphing how this `feComponentTransfer` works](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_graph.png?resize=1024%2C576&ssl=1)

Now that we have extracted just the actual image, we blur it. As we have `primitiveUnits` set to `objectBoundingBox`, the blur radius, set via the `stdDeviation` attribute, is relative to the edge length of the `filter` input square. Having the `edgeMode` of `duplicate` prevents pixels close to the edges from becoming semi-transparent.

```pug{5}
svg(width='0' height='0' aria-hidden='true')
  filter#fade(color-interpolation-filters='sRGB' primitiveUnits='objectBoundingBox')
    feComponentTransfer(result='image')
      feFuncA(type='table' tableValues='0 0 1')
    feGaussianBlur(stdDeviation='.1' edgeMode='duplicate')
```

The blur is why we need the `filter` input to be square and for more than one reason.

First, when `primitiveUnits` is set to `objectBoundingBox` and the `filter` input is not square, browsers may compute length values differently, leading to inconsistent results. This matters less here, given setting `edgeMode` to `duplicate` only works in Safari, so getting consistent results cross-browser is already off the table.

Second and most important is that `edgeMode` applies to the edges of the `filter` input, the square box in our case, *not* the edges of a shape within it, such as the edges of the rectangular image that don’t coincide with the edges of the containing square. Consequently, having `edgeMode` set to `duplicate` means the blur doesn’t affect the alpha of pixels if they’re close to the input square edge, but it does affect their alpha if they are close to the longer edges of the image inside the `filter` input square.

Without `edgeMode='duplicate'`, this is the result we get:

![result without `edgeMode='duplicate'`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_blur_no_edge_mode_an.png?resize=1024%2C575&ssl=1)

With it, our result looks like below – it gives us an alpha fade of our image along the axis of its shorter side, but not along the axis of its longer side as well.

![result with `edgeMode='duplicate'`](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_blur_with_edge_mode_an.png?resize=1024%2C575&ssl=1)

The blur result looks like something we could use as an alpha mask. The problem is the blur result extends beyond the original image boundary. That is, blurring produces semitransparent pixels on both sides of the original boundary, with those at the boundary having an alpha in the middle of the `[0, 1]` interval, far from fully transparent.

Let’s say we were to use this blur result as an alpha mask for the previously extracted image.

We do this via a `feComposite` with an `operator` value of `in`. The `in` operator works similarly to [`mask` compositing](https://css-tricks.com/mask-compositing-the-crash-course/) using `intersect`: it multiplies the alphas of its two inputs, `in` and `in2`, then uses the result together with the RGB channel of its first input `in`.

```pug{6}
svg(width='0' height='0' aria-hidden='true')
  filter#fade(color-interpolation-filters='sRGB' primitiveUnits='objectBoundingBox')
    feComponentTransfer(result='image')
      feFuncA(type='table' tableValues='0 0 1')
    feGaussianBlur(stdDeviation='.1' edgeMode='duplicate')
    feComposite(in='image' operator='in')
```

Since the alpha of the image layer sharply goes from `1` inside to `0` outside when we cross the boundary, the result of multiplying it with the alpha of its blurred version sharply goes from the middle of the `[0, 1]` interval right before we cross the boundary to `0` as soon as we’ve crossed it. This means we get an awkward-looking cutoff instead of the image smoothly fading to transparency at the edges.

![not quite the edge fade we wanted](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_cut_abruptly_an.png?resize=1024%2C575&ssl=1)

So before the compositing step, we need to adjust the blur result alpha such that it goes to `0` at the longer edges of the image (found inside the square), where it’s currently in the middle of the `[0, 1]` interval. So we need to re-map the alpha range: any value up to `.5` is zeroed, while values in the `[.5, 1]` sub-interval are stretched linearly to the full `[0, 1]` range.

We achieve this by inserting a second `feComponentTransfer` with a `feFuncA` whose `tableValues` attribute is set to `0 0 1` – just like before, this maps `0` to `0`, `.5` to `0` and `1` to `1`.

```pug{6-7}
svg(width='0' height='0' aria-hidden='true')
  filter#fade(color-interpolation-filters='sRGB' primitiveUnits='objectBoundingBox')
    feComponentTransfer(result='image')
      feFuncA(type='table' tableValues='0 0 1')
    feGaussianBlur(stdDeviation='.1' edgeMode='duplicate')
    feComponentTransfer
      feFuncA(type='table' tableValues='0 0 1')
    feComposite(in='image' operator='in')
```

The subsequent `feComposite` then gives us a nice fade effect along the axis of the shorter image edge: from fully transparent to fully opaque and back.

![just the masked image result](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_smooth_fade_an.png?resize=1024%2C575&ssl=1)

A neat trick here is to use of out‑of‑range values in `tableValues` since output alphas are clamped to the `[0, 1]` interval anyway.

Using `-1 1` creates a linear mapping that stretches the input interval `[0, 1]` to `[-1, 1]`. Clamping this output interval to `[0, 1]` results in the first half of it (corresponding to the input sub-interval `[0, .5)`) being zeroed and the second half remaining `[0, 1]`.

The following graph shows the relationship:

![graphing our `feComponentTransfer` options](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_graph_2.png?resize=1024%2C717&ssl=1)

While the gain is modest here, saving a single character, the same technique can make a dramatic difference in other cases. For example, `-9 1` replaces `10` separate zeros followed by a `1`.

The final step for this solution is to reintroduce the parent `background` blurred by the `backdrop-filter` of the `::before` pseudo.

![the final result ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/NPNqdLM/f6969d0428ca34f6812334de78a61fee), Safari only and may be buggy at certain viewport sizes)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_1_smooth_overlay_an.png?resize=1024%2C575&ssl=1)

There are two key differences between this result and the `mask`‑based fade from the previous section.

First, the blur radius and, therefore, the fading distance is relative to the square edge, not to the smaller image edge. This provides more consistency, but it can also erode narrow images too much, not leaving them any opaque part in the middle.

Second, unlike a `linear-gradient()` mask, blurring produces a non‑linear fade. This feels more natural, but it is also more difficult to understand and, consequently, to control.

#### Getting mask angle from aspect ratio of container for image copy (cross-browser)

In this case, we need to make a couple of additions to our HTML:

```pug{4-6}
- let src = 'my-image.jpg'

  .wrap(style=`--img: url(${src})`)
    img(src=src aria-hidden='true')
      .rect
        img(src=src alt='image description')
```

The markup may look verbose, but every element serves a purpose. The outer `img` passes its relative intrinsic dimensions to its sibling `.rect` via the `grid` cell they’re both stacked in. That is, their containing `grid` cell is sized after the outer `img` and in turn sizes the `.rect`. The `.rect` is a container, which allows its inner `img` to know its dimensions as `100cqw` and `100cqh` in order to compute its aspect ratio. This is then used to compute the `mask` gradient angle just like before.

Moving on to the CSS, several adjustments are needed here too.

First, we make the wrapper a `container` again so its children can reference its width as `100cqw`.

```css
.wrap {
  display: grid;
  container-type: inline-size;
  width: min(100%, 23em);
  aspect-ratio: 1;
  background: var(--img) 50%/ cover
}
```

In contrast to the scenario when we knew the intrinsic aspect ratio of the image or at least its orientation, we don’t use `place-self: center` on the `img` to middle align it along the axis of its smallest side within the one cell of its parent’s `grid`. Instead, using `place-content: center` on the `.wrap`, we middle align its entire single-cell `grid`, which now takes the dimensions of the outer `img`, along the axis of the image’s shorter side.

This is highlighted by the DevTools overlay in the screenshot below. The dotted purple line marks the boundary of the `.wrap` element, which we’ve made a `container`, while the solid orange line marks the boundary of its one cell `grid`, middle aligned within along the smaller axis of the image it contains.

![our boxes](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_2_boxes.png?resize=1024%2C575&ssl=1)

The screenshot also shows that the `::before` pseudo-element, which we use to blur the wrapper `background`, still needs to cover its entire parent in order to achieve the blur effect, breaking out of the middle aligned `grid` instead of staying confined to it.

Our only option here is to absolutely position the `::before` pseudo-element and give it `inset: 0` to make it cover its entire parent.

```css{4,10-11,17}
.wrap {
  display: grid;
  container-type: inline-size;
  position: relative;
  width: min(100%, 23em);
  aspect-ratio: 1;
  background: var(--img) 50% / cover;

  &::before {
    position: absolute; 
    inset: 0;
    backdrop-filter: blur(8px) brightness(0.8) contrast(0.7);
    content: "";
  }

  > * {
    grid-area: 1/ 1;
  }
}
```

With the `::before` pseudo‑element absolutely positioned, only the `.wrap` children remain in the single‑cell `grid`. Consequently, the `::before` no longer requires a `grid-area` declaration.

We previously middle aligned the `grid` within its `.wrap` container. Now we’re looking at how the `grid` gets sized: it stretches to fit the first `img`, which is now hidden, both from from screen readers and visually.

We’re hiding the first `img` from screen readers so it’s not announced twice. We’re also hiding it visually as we don’t want it to show underneath the masked second image. This can be done in multiple ways that don’t interfere with the layout, for example setting `opacity` or `scale` to `0`. Setting `visibility: hidden` or `z-index: -1` works as well.

Both `img` elements have their `max-width` restricted to that of their nearest container, which they know as `100cqw`. However, only the first one, the direct child of the `.wrap`, also has its `max-height` restricted to `100cqw`. Both the `width` and the `height` of the first `img` remain `auto`, so it always keeps its intrinsic aspect ratio in addition to never overflowing its square container.

```css{20-27}
.wrap {
  display: grid;
  container-type: inline-size;
  place-content: center;
  position: relative;
  aspect-ratio: 1;
  background: var(--img) 50% / cover;

  &::before {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(8px) brightness(0.8) contrast(0.7);
    content: "";
  }

  > * {
    grid-area: 1/ 1;
  }

  img {
    max-width: 100cqw;
  }

  [aria-hidden="true"] {
    max-height: 100cqw;
    opacity: 0;
  }
}
```

The core logic behind is as follows.

The size of the square `.wrap` determines the longer edge of the first `img`, the one we hide both visually and from screen readers. Since the `.wrap` is a `container`, the first `img` knows its edge length as `100cqw` and uses this to set both its `max-width` and `max-height`. Since the `width` and `height` are not set for this `img`, they remain `auto`. Consequently, while the longer side of the first `img` is always equal to the edge length of its square `container` parent (the `.wrap` element), the shorter side is determined by the intrinsic aspect ratio of the image.

Having `place-content: center` on the `.wrap` not only middle aligns its `grid` along both axes, but, since the `grid` has no explicit column or row sizing, it shrinks to its non-shrinkable content. That is, its one cell adopts the dimensions of the first `img`.

But why doesn’t the `.rect` play a part in sizing the `grid` cell too?

In this case, where it holds the second image, it’s because we don’t let it do that by making it a `container`. This means its size computation ignores its content. This is why its descendants can use its `width` and `height` (as `100cqw` and `100cqh` respectively) to set their own dimensions without leading to an infinite loop.

Since the `.rect` is a `grid` child and its size does not depend on its content, the default is for it to stretch to fill its `grid-are`a. In this case, this is the one cell of the `grid`, the one whose dimensions are given by the first `img`. So our `.rect` takes on the dimensions of its `img` sibling and, therefore, has the same aspect ratio.

The `img` child of the `.rect` would normally overflow, but in this case, it has its `max-width` limited by the `width` of the `.rect` via `100cqw`. This means its `width` is the same as that of its `.rect` parent. Since both `img` elements have the same `src`, they share the same intrinsic aspect ratio. But we’ve determined the `.rect` has the same aspect ratio too, and putting that together with its `img` child having the same `width`, it results it has the same `height` too.

![the sizing computation sequence, illustrated on the HTML structure as seen in DevTools](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/xtra_method_2_computation_sequence.png?resize=1024%2C575&ssl=1)

Consequently, the `.rect`, both `img` elements and the single-cell `grid` of the `.wrap` all occupy the same area on the page.

This all serves one purpose: to compute the image intrinsic aspect ratio. Since the inner `img` knows the dimensions of its `.rect` parent and this has the same aspect ratio, the one we’re looking for, we can get our desired result by dividing the `.rect` dimensions, known by its child `img` as `100cqw` and `100cqh`.

```css{30,35-37} :collapsed-lines
.wrap {
  display: grid;
  container-type: inline-size;
  place-content: center;
  position: relative;
  aspect-ratio: 1;
  background: var(--img) 50% / cover;

  &::before {
    position: absolute;
    inset: 0;
    backdrop-filter: blur(8px) brightness(0.8) contrast(0.7);
    content: "";
  }

  > * {
    grid-area: 1/ 1;
  }

  img {
    max-width: 100cqw;
  }

  [aria-hidden="true"] {
    max-height: 100cqw;
    opacity: 0;
  }

  .rect {
    container-type: size;
  }

  [alt] {
    --p: 20%;
    --w: 100cqw;
    --h: 100cqh;
    --img-r: var(--w) / var(--h);
    --sgn: sign(1 - var(--img-r));
    --end: rgb(0 0 0 / calc(1 - abs(var(--sgn))));
    mask: linear-gradient(
      calc((1 + var(--sgn)) * 45deg),
      var(--end),
      red var(--p) calc(100% - var(--p)),
      var(--end)
    );
  }
}
```

This should work as such and it does in Safari (tested via Epiphany). However, Chrome seems to want either `--sgn` or `--img-r` to be registered in order for this solution to work. Firefox doesn’t yet support dividing lengths. However, we can [**work around this limitation**](/frontendmasters.com/count-auto-fill-columns.md#extending-support) using the [`tan(atan2())` trick (<VPIcon icon="fa-brands fa-dev"/>`janeori`)](https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j) we also employed in the case of computing the number of `auto-fit` columns.

So, at the end of the day, we can still have a cross-browser solution.

<CodePen
  link="https://codepen.io/anon/bNpdZVq/adf3e41d46e68268b67cdc9be8db04f8"
  title="Non-square img blur extension/ padding to square (cross-browser, extra fade unknown ratio)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Taking it Further

We don’t have to stop here. Our `backdrop-filter` also chains `brightness()` and `contrast()` after the `blur()`, but we could have other filters there on top of these or instead of these, for example `sepia()` or `hue-rotate()` or even an SVG filter. The possibilities are endless, so… what would you experiment with starting from here?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Non-Square Image Blur Extensions",
  "desc": "I recently came across this CodePen demo by Vivi Tseng, which creates the blur extension effect by placing a square div with a blur() beneath the img element and I couldn’t help but think a simpler solution should be possible with a single img element and minimal CSS. So let’s first take a look at […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/non-square-image-blur-extensions.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
