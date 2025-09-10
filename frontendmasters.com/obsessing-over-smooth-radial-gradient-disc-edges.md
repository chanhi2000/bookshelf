---
lang: en-US
title: "Obsessing Over Smooth radial-gradient() Disc Edges"
description: "Article(s) > Obsessing Over Smooth radial-gradient() Disc Edges"
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
      content: "Article(s) > Obsessing Over Smooth radial-gradient() Disc Edges"
    - property: og:description
      content: "Obsessing Over Smooth radial-gradient() Disc Edges"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/obsessing-over-smooth-radial-gradient-disc-edges.html
prev: /programming/css/articles/README.md
date: 2025-08-20
isOriginal: false
author:
  - name: Ana Tudor
    url : https://frontendmasters.com/blog/author/anatudor/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6737
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
  name="Obsessing Over Smooth radial-gradient() Disc Edges"
  desc="An underdog media query, resolution queries, comes to the rescue here in defining radial gradients that don't blur or get the jaggies."
  url="https://frontendmasters.com/blog/obsessing-over-smooth-radial-gradient-disc-edges/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6737"/>

(… and how that lead me to a very underused CSS feature, resolution media queries.)

You may have come across this situation: you want to create a disc (oval) shape contained within your element’s boundaries, and you want it to have smooth edges. Not jagged; not blurry.

If you want to avoid using a pseudo-element or, even worse, children just for decorative purposes, then `radial-gradient()` seems to be the best solution. Especially in the case where you might need a bunch of such discs, more than the two pseudos available on an element.

---

## The jaggies problem

However, if we do something like this:

```css
radial-gradient(var(--r), var(--c) 100%, #0000)
```

Where `r` is the gradient disc radius, then we get [<VPIcon icon="fa-brands fa-wikipedia-w"/>jaggies](https://en.wikipedia.org/wiki/Jaggies), a step-like effect along the `radial-gradient()` disc, whereas one created with a pseudo-element has smooth-looking edges!

Note that we aren’t setting a stop position explicitly for the final stop because the stop position of the final stop defaults to `100%` (of the `radial-gradient()` radius, which is `r` here), which is what we want in this case anyway. If you need a refresher on `radial-gradient()`, check out this [<VPIcon icon="fas fa-globe"/>detailed explainer](https://patrickbrosset.com/articles/2022-10-24-do-you-really-understand-CSS-radial-gradients/) by Patrick Brosset.

You can see the difference between a pseudo-element disc (smooth edges) and a `radial-gradient()` one (jaggies) in this live demo:

<CodePen
  user="thebabydino"
  slug-hash="wBKeYBK"
  title="Discs: pseudo vs. radial-gradient()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The smooth-looking edges of the pseudo-element version are a result of anti-aliasing, as it can be seen from the screen recording below:

![Animated GIF. Shows the pseudo disc at the top and the radial-gradient() one at the bottom. Zooming in at pixel level in the edge area for both shows us we have a sharp transition from our brick red to transparent in the radial-gradient() case. However, in the pseudo case, anti-aliasing means we have semi-transparent pixels smoothing the transition from brick red to transparent.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/antialiasing.gif?resize=800%2C646&ssl=1)

recording of zooming in at the disc edges for the two cases

---

## A popular, yet too imperfect fix

A solution I often see used to try to fix `radial-gradient()` discs is introducing a `1%` distance between the positions of the two stops, something like this.

```css
radial-gradient(var(--r), var(--c) 99%, #0000)
```

As I mentioned before, unless another value is explicitly specified, the final stop position defaults to `100%`, so there’s never any need to explicitly set it to that value since it’s the default.

However, a `1%` distance means blurry edges for big discs…

![Screenshot. Shows a big reddish disc with slightly blurry edges.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/base_perc_big_blur_aspect_ratio_2.png?resize=960%2C480&ssl=1)

a big disc with a 1% distance between the red and transparent stop positions has blurry edges

… while we still get jaggies for small discs!

![Screenshot. Shows a small reddish disc with slightly jagged edges.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/base_perc_small_jagged.png?resize=966%2C160&ssl=1)

a small disc with a 1% distance between the red and transparent stop positions has jagged edges

---

## A solution I thought was bulletproof

So my solution, which, up until recently, I thought would never fail, was to have a `1px` distance between the positions of our two stops:

```css
radial-gradient(var(--r), var(--c) calc(100% - 1px), #0000)
```

This works well regardless of disc size… until it doesn’t!

---

## A pixel is not always a pixel

So there are situations when my “bulletproof” solution fails. For example, in two cases I’ve never really considered before, since my main laptop is almost two decades old: with a hi-DPI display or with “those pesky users doing their nasty zooms” ([credit for this gem (<VPIcon icon="fa-brands fa-x-twitter"/>`myfonj`)](https://x.com/myfonj/status/1939739313903710299)).

In this case, when we **_zoom in_** up to a zoom level of `500%`, we get again blurry edges…

![Screenshot. Shows a big red disc with slightly blurry edges. The zoom level of 500% is also shown in the top right corner.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/base_px_zoom_in_aspect_ratio_2.png?resize=960%2C480&ssl=1)

*a zoomed in page with a fully contained disc with a `1px` distance between the red and transparent stop positions - this disc has blurry edges due to the zoom*

… and when we **_zoom out_** up to a zoom level of `25%`, we get jagged edges!

![Screenshot. Shows a big red disc with slightly jagged edges. The zoom level of 25% is also shown in the top right corner.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/base_px_zoom_out_aspect_ratio_2.png?resize=960%2C480&ssl=1)

a zoomed out page with a fully contained disc with a `1px` distance between the red and transparent stop positions - this disc has jagged edges due to the zoom

Boo!

So what can we do in this case?

---

## Underrated CSS feature: resolution!

Up until this summer, when I got fixated on this zoom problem, I had no idea that CSS provides [<VPIcon icon="fa-brands fa-firefox"/>resolution](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution) media queries! These allow us to style things differently based on the device pixel density or zoom level.

I don’t think I have access to any device with a higher pixel ratio display, but I can certainly test zoom. For zoom, this thing really works! For example, if we’re zoomed in to `500%`, we’re in the `5x` case:

```css
@media (resolution: 5x) {}
```

This means we can divide that `1px` difference by a factor `f` which we set in the media query.

```css
div {
  background: 
    radial-gradient(var(--r), 
    var(--c) calc(100% - 1px/var(--f, 1)), #0000)
}

@media (resolution: 5x) { div { --f: 5 } }
```

Note that the `x` unit is an alias for the `dppx` unit, an alias that was only added in [<VPIcon icon="fas fa-globe"/>Level 4](https://drafts.csswg.org/css-values-4/#resolution-value) of the CSS Values and Units Module ([Level 3](https://drafts.csswg.org/css-values-3/#resolution-value) did not include x). However, at this point, I’d say it’s safe to use since all major current desktop and mobile browsers have been supporting it for over half a decade.

I prefer using `x` as it’s shorter and it feels more intuitive and consistent with `picture` sources.

We can do the same for all other zoom levels Chromium browsers provide using Sass looping:

```scss
$f: .25 .33 .5 .67 .75 .8 .9 1.1 1.25 1.33 1.4 1.5 1.75 2 2.5 3 4 5;

$n: length($f);

@for $i from 0 to $n {
  @media (resolution: nth($f, $i + 1)*1x) {
    div { --f: #{nth($f, $i + 1)} }
  }
}
```

This gives us a nice pure CSS way of ensuring we have smooth disc edges, not jagged, not blurry, regardless of display resolution or zoom level.

![Animated GIF. Shows how zooming from 25% to 500% doesn't affect the radial-gradient() disc edges anymore.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/smoo_zoom_test.gif?resize=800%2C800&ssl=1)

zooming doesn’t mess up the edges of our `radial-gradient()` disc anymore

::: note Side note

for anyone wondering why the disc starts getting smaller once we’ve increased the zoom above a certain level, this is due to the way we’ve defined the disc radius:

```css
--r: min(50vmin - 2em, 9em);
```

For large screens/ low zoom levels, the second value in the `min()` (`9em`) is the one that’s used, as it’s smaller. Since the default `font-size` and, consequently, any `em` value always increases with zoom, the second `min()` value becomes bigger than the first after a certain level of zoom, so then it’s the first value that gets used. For `50vmin - 2em`, `50vmin` is always constant, doesn’t depend on the zoom level, but `2em` increases with zoom. This means our difference `50vmin - 2em` decreases with zoom.

:::

Cool, but that’s quite a lot of media queries and what do we do when other browsers have other zoom levels available instead of the ones in our list above, which is Chromium specific?

For example, Firefox goes from a `50%` zoom level to a `30%` one, which is the smallest value. It also uses `120%`, `170%` and `240%` zoom values instead of `125%`, `175%` and `250%` respectively in Chrome.

![Animated GIF. Same as before, only in Firefox this time, where zoom levels are different.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/zoom_levels_firefox.gif?resize=800%2C800&ssl=1)

zoom levels in Firefox are different

This means that since we have no match for a zoom level of `30%`, `--f` remains `1` there, just like in the default case, which means the zoomed out `1px` difference is seen as less than a third of that, resulting in jaggies at this smallest Firefox zoom level.

When zooming in, the blur problem is pretty much undetectable for the `120%` zoom level (which again has no match among our resolution media queries), but it starts being noticeable for the bigger no match zoom levels at `170%` and `240%`.

We could add those Firefox zoom levels to the list… or we could do something better! That is, use max and min resolution depending on whether we’re in the subunitary case or not, and also reverse the order of the subunitary zooms. The second part is because if we were to have the same order, with `.9` being after `.8`, then the `(max-resolution: .9x)` case would override the `(max-resolution: .8x)` one.

```scss
$f: .9 .8 .75 .67 .5 .33 .25 
    1.1 1.2 1.33 1.4 1.5 1.7 2 2.4 3 4 5;

$n: length($f);

@for $i from 0 to $n {
  $c: nth($f, $i + 1);

  @media (#{if($c < 1, 'max', 'min')}-resolution: $c*1x) {
    div { --f: #{$c} }
  }
}
```

A more subtle change from before is that, when the zoom levels are above `1`, we are using the slightly smaller of two zoom values that are close enough in Chrome and Firefox, but not quite the same. For example, between `1.25` in Chrome and `1.2` in Firefox we use `1.2`, between `2.5` in Chrome and `2.4` in Firefox, we use `2.4`. This is because the `(min-resolution: 1.2x)` case also catches the entire `(min-resolution: 1.25x)` case, but not the other way around. And the same thing goes for the other close, but not quite the same zoom level pairs from the two browsers.

<CodePen
  user="thebabydino"
  slug-hash="bNVgrdp"
  title="Nice edge at every resolution - pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Much better! But what if we really hate having so many media queries?

---

## The less code and more flexible JS solution

In this case, we’d set `f` from the JS as follows:

```js
function zoom() {
  document.body.style.setProperty('--f', window.devicePixelRatio);
  matchMedia(`(resolution: ${window.devicePixelRatio}x)`)
    .addEventListener('change', zoom, { once: true });
}

zoom();`
```

This works for any place where we may want to have `radial-gradient()` created discs - not just for `background` values, but also for `mask` or `border-image` values.

<CodePen
  user="thebabydino"
  slug-hash="bNVrjdR"
  title="Nice edge at every resolution - flexible JS version"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Conclusion

Is this overkill? Something only a psycho would do? It depends.

In some cases, having smooth edges may be worth obsessing about. For example, if we use a `mask` as a fallback for `shape()` in the case of a component (like a `header`) with both convex and concave roundings.

![screenshot of a header component with both convex and concave roundings ([live demo (<VPIcon icon="fa-brands fa-codepen"/>`thebabydino`)](https://codepen.io/thebabydino/pen/azOgOKE/09e91c7726a4d5340e38735298ef7bd0))](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/header.png?resize=1024%2C303&ssl=1)

While newer Chrome and Safari versions have supported `shape()` for a few months now, Firefox support isn’t there yet. We could set the `layout.css.basic-shape-shape.enabled` flag to true in `about:config` to play with it there too, but remember, most people won’t have it enabled, and there is a reason why it’s still behind the flag in Firefox: not all commands work. We can use the lines and arcs we need for this particular shape, but Bézier curves don’t work yet. Furthermore, some people may be stuck on older hardware/ operating systems and may be unable to update Chrome or Safari to the latest version. So having a fallback for `shape()` is very much necessary.

Without the zoom/device pixel ratio factor, we get ugly blurry edges for the concave rounding (the convex one is created via `border-radius`, so it doesn’t have this problem) at a zoom level of `500%` when `shape()` isn’t supported and the `mask` fallback is used (for example, in Firefox without the flag enabled).

![the problem when using the fallback without the zoom/ device pixel ratio factor correction](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/zoom_mask_problem_no_fix_strip.png?resize=1024%2C318&ssl=1)

There are, however, other cases where we could embrace (and maybe even enhance) the blurry edges instead of doing anything about them. For example, when the discs are a part of a faded background.

<CodePen
  user="thebabydino"
  slug-hash="zxvExxx"
  title="Pastel discs background"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Obsessing Over Smooth radial-gradient() Disc Edges",
  "desc": "An underdog media query, resolution queries, comes to the rescue here in defining radial gradients that don't blur or get the jaggies.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/obsessing-over-smooth-radial-gradient-disc-edges.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
