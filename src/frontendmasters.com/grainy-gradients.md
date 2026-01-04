---
lang: en-US
title: "Grainy Gradients"
description: "Article(s) > Grainy Gradients"
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
      content: "Article(s) > Grainy Gradients"
    - property: og:description
      content: "Grainy Gradients"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/grainy-gradients.html
prev: /programming/css/articles/README.md
date: 2025-06-13
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6066
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
  name="Grainy Gradients"
  desc="This is about reducing banding effects in gradients by introducing noise. A nice approach is a displacement map using SVG filters."
  url="https://frontendmasters.com/blog/grainy-gradients/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6066"/>

You know when you set a `background` gradient or a gradient `mask` and you get an ugly[<VPIcon icon="fa-brands fa-wikipedia-w"/>banding](https://en.wikipedia.org/wiki/Colour_banding) effect? If you can’t picture what I mean, here’s an example:

![A left to right pinkinsh orange to dark grey gradient exhibiting banding.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/451853285-2c07e7e7-53b6-4cc7-b7fe-2b251e7c8fd0.png?resize=900%2C450&ssl=1)

example gradient with banding

---

## Previous Solutions

<SiteInfo
  name="Previous Solutions"
  desc="Previous solutions | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#previous-solutions"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

Over time, I’ve seen a couple of approaches commonly recommended for solving this. The first is to[<VPIcon icon="fas fa-globe"/>simply introduce more stops](https://css-tricks.com/easing-linear-gradients/)(gradient “easing”), which I’m not really keen on doing, even if I can just generate them in a Sass loop and never need to know about them. The second one is to[<VPIcon icon="fas fa-globe"/>make the gradient noisy](https://graphicdesign.stackexchange.com/a/36045). Let’s do that.

The way I first went about making gradients grainy was to have a gradient layer and a noise layer (using pseudo-elements for the layers) and then blend them together. I first did this[<VPIcon icon="fa-brands fa-youtube"/>in response to a question](https://youtu.be/xmrfj5qrXAw)asked on X. That video became one of my most watched ones ever, which isn’t something I’m happy about anymore because I’ve come to find that technique to be overly complicated, like scratching behind the right ear with the left foot.

<VidStack src="youtube/xmrfj5qrXAw" />

A few months later, I saw[<VPIcon icon="fas fa-globe"/>an article](https://css-tricks.com/grainy-gradients/)that was doing something similar: placing a gradient layer and a noise layer one on top of the other. Unlike my approach, it wasn’t blending the two layers and instead was relying on one end of the gradient being transparent to allow the noise to show through. For the other end to be something other than transparent, it would layer an overlay and blend it. Just like my layered pseudos approach… too complicated! Not to mention that the `contrast()` and `brightness()` tampering (meant to highlight the grain) make this only work for certain gradient inputs and they greatly alter the saturation and luminosity of the original gradient palette.

In time, I would improve upon my initial idea and, almost half a decade later, I would make[<VPIcon icon="fa-brands fa-youtube"/>a second video](https://youtu.be/cA39j6p3Yho)on the topic, presenting a much simplified technique. Basically, the gradient would get fed into an SVG`filter`, which would generate a noise layer, desaturate it and then place it on top of the input gradient. No external files, no base64-ing anything, no separate (pseudo)element layers for the noise and the gradient.

Still, it didn’t take long before I wasn’t happy with this solution anymore, either.

<VidStack src="youtube/cA39j6p3Yho" />

---

## The big problem with layering the noise and the gradient

<SiteInfo
  name="The big problem with layering the noise and the gradient"
  desc="The big problem with layering the noise and the gradient | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#the-big-problem-with-layering-the-noise-and-the-gradient"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

The problem with all of these solutions so far is that they’re changing the gradient. Depending on the particular technique we use, we always end up with a gradient that’s either darker, brighter, or more saturated than our original one.

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/qEdbEQZ
Noise layering problem

We can reduce the noise opacity, but in doing so, our gradient becomes less grainy and the efficiency of fixing banding this way decreases.

---

## A better solution

<SiteInfo
  name="A better solution"
  desc="A better solution | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#a-better-solution"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

How about not layering the the noise layer and instead using it as a[**displacement map**](https://smashingmagazine.com/2021/09/deep-dive-wonderful-world-svg-displacement-filtering/)?

What this does is use two of the four RGBA channels of the noise layer to determine how the individual pixels of the input gradient are shifted along the*x*and*y*axes.

Both the`filter`input (our gradient) and the noise layer can be taken to be 2D grids of pixels. Each pixel of our input gradient gets displaced based on the two selected channel values of its corresponding pixel in the noise layer (used as a displacement map).

A channel value below`50%`means moving in the positive direction of the axis, a channel value above`50%`means moving in the negative direction of the axis and a channel value of exactly`50%`means not moving at all.

The displacement formula for a generic channel value of`C`and a displacement `scale` of `S` is the following:

```plaintext
(.5 - C)*S
```

If we use the red channel`R`for displacement along the*x*axis and the alpha channe `A` for displacement along the*y*axis, then we have:

```plaintext
dx = (.5 - R)*S  
dy = (.5 - A)*S
```

Note that the values for both`R`and`A`are in the`[0, 1]`interval (meaning channel values are zeroed at `0` and maxed out at`1`), so the difference between the parenthesis is in the`[-.5, .5]`interval.

The bigger the`scale`value`S`is, the more the gradient pixels mix along the gradient axis depending on the red`R`and alpha `A` channel values of the displacement map generated by `feTurbulence`.

Let’s see our code!

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='grain' color-interpolation-filters='sRGB'>
    <feTurbulence type='fractalNoise' baseFrequency='.9713' numOctaves='4'/>
    <feDisplacementMap in='SourceGraphic' scale='150' xChannelSelector='R'/>
  </filter>
</svg>
```

Since the`<svg>`element is only used to hold our`filter`(and the only thing a `filter` does is apply a graphical effect on an already existing element), it is functionally the same as a `<style>` element, so we zero its dimensions and hide it from screen readers using`aria-hidden`. And, in the CSS, we also take it out of the document flow (via `absolute` or `fixed` positioning) so it doesn’t affect our layout in any way (which could happen otherwise, even if its dimensions are zeroed).

```css
svg[height='0'][aria-hidden='true'] {
  position: fixed
}
```

The`<filter>`element also has a second attribute beside its`id`. We aren’t going into it here because I don’t really understand it myself. Just know that, in order to get our desired result cross-browser, we always need to set this attribute to`sRGB`whenever we’re doing anything with the RGB channels in the`filter`. The`sRGB`value isn’t the default one (`linearRGB`is), but it’s the one we likely want most of the time and the only one that works properly cross-browser.

The[<VPIcon icon="fas fa-globe"/>`feTurbulence`](https://drafts.fxtf.org/filter-effects/#feTurbulenceElement)primitive creates a fine-grained noise layer. Again, we aren’t going into how this works in the back because I haven’t been able to really understand any of the explanations I’ve found or I’ve been recommended for the life of me.

Just know that the`baseFrequency`values (which you can think of as being the number of waves per pixel) need to be positive, that integer values produce just blank and that bigger values mean a finer grained noise. And that`numOctaves`values above the default `1` allow us to get a better-looking noise without having to layer the results of multiple `feTurbulence` primitives with different`baseFrequency`values. In practice, I pretty much never use `numOctaves` values bigger than`3`or at most`4`as I find above that, the visual gain really can’t justify the performance cost.

We also switch here from the default `type` of `turbulence` to `fractalNoise`, which is what’s suited for creating a noise layer.

This noise is then used as a displacement map (the second input,`in2`, which is by default the result of the previous primitive, `feTurbulence` here, so we don’t need to set it explicitly) for the`filter`input (`SourceGraphic`). We use a`scale`value of`150`, which means that the maximum an input pixel can be displaced by in either direction of the`x`or`y`axis is half of that (`75px`) in the event the channel used for *x* or *y* axis displacement is either zeroed (`0`) or maxed out (`1`) there. The channel used for the *y* axis displacement is the default alpha`A`, so we don’t need to set it explicitly, we only set it for the*x*axis displacement.

We’re using absolute pixel displacement here, as relative displacement (which requires the `primitiveUnits`attribute to be set to`objectBoundingBox` on the `<filter>` element) is not explicitly defined in the spec, so Chrome, Firefox and Safari each[implement it in a different way (<VPIcon icon="iconfont icon-github"/>`w3c/fxtf-drafts`)](https://github.com/w3c/fxtf-drafts/issues/596)from the other two for non-square`filter`inputs. I wish that could be a joke, but it’s not. This is why nobody really uses SVG filters much — a lot about them just doesn’t work. Not consistently across browsers anyway.

At this point, our result looks like this:

![Grainy gradient with dithered edges. A bright pink outline shows us the boundary of the filter input. Within this boundary, we have transparent pixels. Outside it, we have opaque pixels.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/451859318-728b1207-4225-473e-a773-70511b3f1552.png?resize=900%2C450&ssl=1)

Not quite what we want. The dashed bright pink line shows us where the boundary of the `filter`input gradient box was. Along the edges, we have both transparent pixels *inside*the initial gradient box*and*opaque pixels*outside*the initial gradient box. Two different problems, each needing to get fixed in a different way.

To cover up the transparent pixels*inside*the initial gradient box, we layer the initial gradient underneath the one scrambled by `feDisplacementMap`. We do this using [<VPIcon icon="fa-brands fa-firefox" />`feBlend`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feBlend) with the default`mode`of`normal`(so we don’t need to set it explicitly), which meands no blending, just put one layer on top of the other. The bottom layer is specified by the second input (`in2`) and in our case, we want it to be the `SourceGraphic`. The top layer is specified by the first input (`in`) and we don’t need to set it explicitly because, by default, it’s the result of the previous primitive (`feDisplacementMap` here), which is exactly what we need in this case.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='grain' color-interpolation-filters='sRGB'>
    <feTurbulence type='fractalNoise' baseFrequency='.9713' numOctaves='4'/>
    <feDisplacementMap in='SourceGraphic' scale='150' xChannelSelector='R'/>
    <feBlend in2='SourceGraphic'/>
  </filter>
</svg>
```

I’ve seen a lot of tutorials using[<VPIcon icon="fa-brands fa-firefox" />`feComposite`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feComposite)with the default `operator` of`over` or[<VPIcon icon="fa-brands fa-firefox" />`feMerge`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feMerge)to place layers one on top of another, but `feBlend` with the default `mode` of `normal` produces the exact same result, I find it to be simpler than `feMerge` in the case of just two layers and it’s fewer characters than `feComposite`.

To get rid of the opaque pixels*outside*the initial gradient box, we restrict the [<VPIcon icon="fas fa-globe"/>`filter`region](https://drafts.fxtf.org/filter-effects/#FilterEffectsRegion) to its exact input box — starting from the`0,0`point of this input and covering`100%`of it along both the*x*and*y*axis (by default, the`filter`region starts from `-10%,-10%` and covers`120%`of the input box along each of the two axes). This means explicitly setting the `x`,`y`,`width` and `height` attributes:

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='grain' color-interpolation-filters='sRGB' 
      x='0' y='0' width='1' height='1'>
    <feTurbulence type='fractalNoise' baseFrequency='.9713' numOctaves='4'/>
    <feDisplacementMap in='SourceGraphic' scale='150' xChannelSelector='R'/>
    <feBlend in2='SourceGraphic'/>
  </filter>
</svg>
```

Another option to get rid of this second problem would be to use`clip-path: inset(0)` on the element we apply this grainy`filter`on. This is one situation where it’s convenient that `clip-path`[<VPIcon icon="fas fa-globe"/>gets applied*after*](https://bsky.app/profile/anatudor.bsky.social/post/3lmgrfcnbsc2k)`filter`(the order in the CSS doesn’t matter here).

```css
.grad-box {
  background: linear-gradient(90deg, #a9613a, #1e1816);
  clip-path: inset(0);
  filter: url(#grain)
}
```

![Grainy gradient with sharp edges, no tansparent pixels within, no opaque pixels outside.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/451866616-3fc25f74-226d-4067-bf74-2cf8c446cbe5.png?resize=900%2C450&ssl=1)

the desired result

### A problem with this solution

<SiteInfo
  name="A problem with this solution"
  desc="A problem with this solution | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#a-problem-with-this-solution"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

The inconvenient part about this`filter`is that it applies to the entire element, not just its gradient`background`. And maybe we want this element to *also* have text content and a `box-shadow`. Consider the case when before applying the`filter`we set a`box-shadow`and add text content:

![Card with a banded gradient, text and box-shadow.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/451867920-1d51206d-fdea-4473-b84f-173467951fc7.png?resize=900%2C450&ssl=1)

the case when we also have a shadow and text

In this case, applying the`filter`to the entire element causes all kinds of problems. The text “dissolves” into the gradient, the black`box-shadow`outside the box has some pixels displaced *inside* the box over the gradient - this is really noticeable in the brighter parts of this gradient. Furthermore, if we were to use the`clip-path`fix for the gradient pixels displaced*outside*the initial gradient box, this would also cut away the outer shadow.

![Previous card with a banded gradient, text and box-shadow, now with a filter pplied on it too. This has unpleasant side effects as dscribed above.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/451869235-fc980f9a-2ad7-4f45-9d15-8a575205a83d.png?resize=900%2C450&ssl=1)

problems arising when we apply the grainy filter on the entire element

The current solution would be to put this gradient in an absolutely positioned pseudo behind the text content (`z-index: -1`), covering the entire `padding-box` of its parent ([<VPIcon icon="fas fa-globe"/>`inset: 0`](https://bsky.app/profile/anatudor.bsky.social/post/3lfesl2dpj22u)). This separates the parent’s`box-shadow`and text from the gradient on the pseudo, so applying the`filter`on the pseudo doesn’t affect the parent’s `box-shadow`and text.

```css
.grad-box { /* relevant styles */
  positon: relative; /* needed for absolutely positioned pseudo */
  box-shadow: -2px 2px 8px #000;

  &::before {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(90deg, #a9613a, #1e1816);
    filter: url(#grain);
    clip-path: inset(0);
    content: '' /* pseudo won't show up without it */
  }
}
```

![Previous card with a gradient, text and box-shadow, except now the gradient is grain, which fixes the banding issue.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/451873184-d4a8b150-73ac-4166-bbea-7250387a0a2b.png?resize=900%2C450&ssl=1)

the desired result when having a shadow and text content ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/gbbBWzL))

<CodePen
  user="thebabydino"
  slug-hash="gbbBWzL"
  title="Grainy background card + shadow & text - cross-browser"
  :default-tab="['css','result']"
  :theme="dark"/>

### Improving things for the future

<SiteInfo
  name="Improving things for the future"
  desc="Improving things for the future | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#improving-things-for-the-future"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

While this works fine, it doesn’t feel ideal to have to use up a pseudo we might need for something else and, ugh, also have to add all the styles for positioning it along all three axes (the*z*axis is included here too because we need to place the pseudo *behind* the text content).

And we do have a better option! We can apply the filter*only* on the gradient `background` layer using the`filter()`*function*.

This is not the same as the`filter`*property*! It’s a*function*that outputs an image and takes as arguments an image (which can be a CSS gradient too) and a filter chain. And it can be used anywhere we can use an image in CSS — as a `background-image`,`border-image`,`mask-image`… even`shape-outside`!

In our particular case, this would simplify the code as follows:

```css
.grad-box { /* relevant styles */
  box-shadow: -2px 2px 8px #000;
  background: filter(linear-gradient(90deg, #a9613a, #1e1816), url(#grain));
}
```

Note that in this case we must restrict the`filter`region from the`<filter>`element attributes, otherwise we run into[<VPIcon icon="fas fa-globe"/>a really weird bug](https://bugs.webkit.org/show_bug.cgi?id=291190)in the one browser supporting this, Safari.

![Safari problem: it's trying to fit the filter output, including what goes outside the input image box, into the input image box, basically scaling down the image to make room for its pixels displaced outside its initial boundary by the filter.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/452022538-bf4ed7b8-ccc9-43cd-96e1-771a5cac899b.png?resize=900%2C450&ssl=1)

the Safari problem when we don’t restrict the`filter`region

Because, while Safari has supported the `filter()` function since 2015, for about a decade, sadly[no other browser has followed (<VPIcon icon="iconfont icon-github"/>`web-platform-tests/interop`)](https://github.com/web-platform-tests/interop/issues/717). There are bugs open for both[<VPIcon icon="fa-brands fa-chrome"/>Chrome](https://issues.chromium.org/issues/41208242)and[<VPIcon icon="fa-brands fa-firefox" />Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1191043)in case anyone wants to show interest in them implementing this.

Here is the[live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/LEVxYoL), but keep in mind it only works in Safari.

<CodePen
  user="thebabydino"
  slug-hash="LEVxYoL"
  title="Grainy background card + shadow & text- Safari only"
  :default-tab="['css','result']"
  :theme="dark"/>

This would come in really handy not just for the cases when we want to have text content or visual touches (like`box-shadow`) that remain unaffected by the noise `filter`, but especially for masking. Banding is always a problem when using `radial-gradient()` for a`mask`and, while we can layer multiple (pseudo)elements instead of`background`layers and/ or borders, masking is a trickier problem.

For example, consider a conic spotlight. That is, a`conic-gradient()`masked by a radial one. In this case, it would really help us to be able to apply a grain `filter` directly to the`mask`gradient.

```css
.conic-spotlight {
  background: 
    conic-gradient(from 180deg - .5*$a at 50% 0%, 
                   $side-c, #342443, $side-c $a);
  mask: 
    filter(
      radial-gradient(circle closest-side, red, 65%, #0000), 
      url(#grain))
}
```

In this particular case, the grain`filter`is even simpler, as we don’t need to layer the non-grainy input gradient underneath the grainy one (so we ditch that final `feBlend` primitive). Again, remember we need to restrict the `filter`region from the `<filter>` element attributes.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='grain' color-interpolation-filters='sRGB' x='0' y='0' width='1' height='1'>
    <feTurbulence type='fractalNoise' baseFrequency='.9713'/>
    <feDisplacementMap in='SourceGraphic' scale='40' xChannelSelector='R'/>
  </filter>
</svg>
```

Here is the[live demo (<VPIcon icon="fa-brands fa-codepen"/>)](https://codepen.io/thebabydino/pen/dPoNXWp). Keep in mind it only works in Safari.

<CodePen
  user="thebabydino"
  slug-hash="dPoNXWp"
  title="Spotlight in a circle: banding (1st) vs. filter graininess (2nd) v2. Safari only"
  :default-tab="['css','result']"
  :theme="dark"/>

Since we can’t yet do this cross-browser, our options depend today on our constraints, the exact result we’re going for.

Do we need an image backdrop behind the spotlight? In this case, we apply the radial `mask`on the `.conic-spotlight` element and, since, just like `clip-path`, `mask` gets applied *after* `filter`, we add a wrapper around this element to set the`filter`on it. Alternatively, we could set the conic spotlight`background`and the radial`mask`on a pseudo of our`.conic-spotlight`and set the`filter`on the actual element.

```css
.conic-spotlight {
  display: grid;
  filter: url(#grain);

  &::before {
    background: 
      conic-gradient(from 180deg - .5*$a at 50% 0%, 
                     $side-c, #342443, $side-c $a);
    mask: radial-gradient(circle closest-side, red, 65%, #0000);
    content: ''
  }
}
```

If however we only need a solid backdrop (a black one for example), then we could use a second gradient layer as a radial cover on top of the`conic-gradient()`:

```css
body { background: $back-c }

.conic-spotlight {
  background:
    radial-gradient(circle closest-side, #0000, 65%, $back-c), 
    conic-gradient(from 180deg - .5*$a at 50% 0%, 
                   $side-c, #342443, $side-c $a);
  filter: url(#grain)
}
```

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/xxMvLWy
Spotlight in a circle: banding (1st) vs. filter graininess (2nd)

Note that neither of these two emulate the Safari-only demo exactly because they apply the grain `filter` on the whole thing, not just on the`radial-gradient()` (which allows us to get rid of the`mask`banding, but preserve it for the `conic-gradient()` to give the radiating rays effect). We could tweak the second approach to make the cover a separate pseudo-element instead of a`background`layer and apply the grain`filter`just on that pseudo, but it’s still more complicated than the`filter()` approach. Which is why it would be very good to have it cross-browser.

---

## Some more examples

<SiteInfo
  name="Some more examples"
  desc="Some more examples | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#some-more-examples"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

Let’s see a few more interesting demos where we’ve made visuals grainy!

### Grainy image shadows

![a grid of square images, each with a grainy shadow that's a blurred copy of itself](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/452726618-e0586989-c1cc-491e-b2b2-e0b8b602f393.png?resize=988%2C555&ssl=1)

Shadows or blurred elements can also exhibit banding issues where their edges fade. In this demo, we’re using a slightly more complex `filter` to first[<VPIcon icon="fa-brands fa-firefox" />blur](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feGaussianBlur)and[<VPIcon icon="fa-brands fa-firefox" />offset](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feOffset)the input image, then using the `feTurbulence` and `feDisplacementMap` combination to make this blurred and offset input copy grainy. We also decrease its alpha a tiny little bit (basically multiplying it with`.9`). Finally, we’re placing the original `filter` input image on top of this blurred, offset, grainy and slightly faded copy.

```
- let d = .1;

svg(width='0' height='0' aria-hidden='true')
  filter#shadow(x='-100%' y='-100%' width='300%' height='300%'
                color-interpolation-filters='sRGB'
                primitiveUnits='objectBoundingBox')
    //- blur image
    feGaussianBlur(stdDeviation=d)
    //- then offset it and save it as 'in'
    feOffset(dx=d dy=d result='in')
    //- generate noise
    feTurbulence(type='fractalNoise' baseFrequency='.9713')
    //- use noise as displacement map to scramble a bit the blurred & offset image
    feDisplacementMap(in='in' scale=2\*d xChannelSelector='R')
    //- decrease alpha a little bit
    feComponentTransfer
      feFuncA(type='linear' slope='.9')
    //- add original image on top
    feBlend(in='SourceGraphic')
```

Since our input images are square here, we can use relative length values (by setting `primitiveUnits` to `ObjectBoundingBox`) and still get the same result cross-browser. A relative offset of`1`is equal to the square image edge length, both for the `dx`and `dy` attributes of`feOffset`and for the `scale` attribute of `feDisplacementMap`.

In our case, the`dx`and`dy`offsets being set to`.1`means we offset the blurred square image copy by`10%`of its edge length along each of the two axes. And the displacement `scale` being set to`.2`means any pixel of the blurred and offset copy may be displaced by at most half of that (half being`10%`of the square image edge), with plus or with minus, along both the`x`and`y`axes. And it gets displaced by that much when the selected channel (given by `xChannelSelector` and `yChannelSelector`) of the corresponding map pixel is either zeroed (in which case it’s displaced in the positive direction) or maxed out (negative displacement).

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/OJYwgpe
Realistic grainy shadows with no image duplication

The shadow doesn’t need to be a copy of the input image, it can also be a plain rectangle:

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='shadow' x='-50%' y='-50%' width='200%' height='200%'
          color-interpolation-filters='sRGB'
          primitiveUnits='objectBoundingBox'>
    <!-- flood entire filter region with orangered -->
    <feFlood flood-color='orangered'/>
    <!-- restrict to rectangle of filter input (our image)  -->
    <feComposite in2='SourceAlpha' operator='in'/>
    <!-- blur and everything else just like before  -->
  </filter>
</svg>
```

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/MWPZNMw
Grainy shadow

### Grainy image fade

<SiteInfo
  name="Grainy image fade"
  desc="Grainy image fade | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#grainy-image-fade"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

This is pretty similar to the previous demo, except what we displace are the semi-transparent fading edge pixels obtained using a blur. And we obviously don’t layer the original image on top.

There are a couple more little tricks used here to get things just right, but they’re outside the scope of this article, so we’re not going into them here.

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/LYgqPbQ
Grainy edge fade

### Noisy gradient discs

<SiteInfo
  name="Noisy gradient discs"
  desc="Noisy gradient discs | Better grainy gradients to fix the gradient banding problem in 2025"
  url="ttps://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#noisy-gradient-discs"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

These are created with SVG`<circle>`elements just so we can use SVG radial gradients for them. Compared to CSS `radial-grdient()`, SVG `radialGradient` has the advantage of allowing us to[<VPIcon icon="fas fa-globe"/>specify a focal point](https://svgwg.org/svg2-draft/pservers.html#RadialGradientAttributes)(via`fx`and `fy`), which allows us to create radial gradients not possible with pure CSS.

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/bGJvajr
Noisy gradient discs

The`filter`is a bit more complex here because the aim was to create a specific type of noise, but the main idea is the same.

### Animated single`img`gradient glow border

<SiteInfo
  name="Animated singleimg gradient glow border"
  desc="Animated singleimg gradient glow border | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#animated-single-img-gradient-glow-border"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

![a grid of images with total or partial gradient borders, each having a glow, which is a grainy glow for every second image<br/>[live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/bGPMOpJ)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/452727808-37f47164-c7f2-4340-a9bc-f07f81973d7c-2.png?resize=1024%2C576&ssl=1)

Animated gradient glow borders seem to be all the rage nowadays, which is something I never imagined woukd happen when I first started playing with them almost a decade ago. But wherever there’s a fade effect like a glow, we may get banding. It’s pretty subtle in this case, but the grainy glow looks better than the no grain version.

### Grainy CSS backgrounds

<SiteInfo
  name="Grainy CSS backgrounds"
  desc="Grainy CSS backgrounds | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#grainy-css-backgrounds"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

Another example would be this one, where I’m layering a bunch of linear gradients along the circumradii to the corners of a regular polygon in order to emulate a mesh gradient. Even when blending these gradients, subtle banding is still noticeable. Applying our standard grain`filter`discussed earlier fixes this problem.

CodePen Embed Fallback
https://codepen.io/thebabydino/pen/abxpmMe
Mesh gradient polygon: banding vs. grain

Also, since we’re using`clip-path`to get the polygon shape and this is applied *after* the `filter`, we don’t need to worry about opaque pixels displaced*outside*the polygon shape by our grain`filter`. This means we don’t need to bother with setting the`filter` region via the `<filter>` element attributes.

### Grainy SVG backgrounds

<SiteInfo
  name="Grainy SVG backgrounds"
  desc="Grainy SVG backgrounds | Better grainy gradients to fix the gradient banding problem in 2025"
  url="https://gist.github.com/thebabydino/effda894a4a80060d25639f54058a3ad#grainy-svg-backgrounds"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://github.githubassets.com/assets/gist-og-image-54fd7dc0713e.png"/>

The idea here is we layer a bunch of different SVG shapes, give them various fills (plain, `linearGradient` or `radialGradient` ones), blur them and then finally apply a grain`filter`.

![a 3⨯3 grid of grainy abstract backgrounds<br/>[live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/azONXNb/)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/06/450825545-32a13512-1b71-47bf-86eb-ddc424e6e6bb.png?resize=1024%2C616&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Grainy Gradients",
  "desc": "This is about reducing banding effects in gradients by introducing noise. A nice approach is a displacement map using SVG filters.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/grainy-gradients.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
