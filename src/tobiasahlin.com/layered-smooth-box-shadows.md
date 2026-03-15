---
lang: en-US
title: "Smoother & sharper shadows with layered box-shadows"
description: "Article(s) > Smoother & sharper shadows with layered box-shadows"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - tobiasahlin.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Smoother & sharper shadows with layered box-shadows"
    - property: og:description
      content: "Smoother & sharper shadows with layered box-shadows"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/tobiasahlin.com/layered-smooth-box-shadows.html
prev: /programming/css/articles/README.md
date: 2019-09-19
isOriginal: false
author:
  - name: Tobias Ahlin
    url: https://x.com/tobiasahlin
cover: https://tobiasahlin.com/static/-social/og_blog-layered-smooth-box-shadows.jpg
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
  name="Smoother & sharper shadows with layered box-shadows"
  desc="With a simple CSS trick, we can get fine-tuned control over how shadows are rendered, and create richer and more realistic 3D effects"
  url="https://tobiasahlin.com/blog/layered-smooth-box-shadows/"
  logo="https://tobiasahlin.com/images/touch-icon-ipad-retina.png"
  preview="https://tobiasahlin.com/static/-social/og_blog-layered-smooth-box-shadows.jpg"/>

As light hits an object and a shadow is cast, the shadow can take on a myriad of unique characteristics. If you try to capture the subtleties of a real shadow with `box-shadow` then, well, you’re pretty much out of luck. The `box-shadow` CSS property isn’t exactly built to encourage expressiveness. It essentially produces a blurred silhouette of an object—you can change its offset, blur radius, spread, and color, but that’s it. We can’t get anywhere near to expressing the complexities and nuances of shadows in real life.

But with a simple CSS technique, we can expand our range of options. If we use layered `box-shadow`s we can get more fine-grained control over how shadows are rendered:

::: normal-demo

```html
<div class="post-content-wrapper center">
  <div class="blog-traditional-shadow-box blog-shadow-big blog-shadow-6">box-shadow
    <span class="blog-shadow-label">0 6px 6px rgba(0,0,0,0.2);</span>
  </div>
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-long">Layered box-shadows
    <span class="blog-shadow-label">gradually increasing offset/blur</span>
  </div>
</div>
```

```css{53-55,57-59} :collapsed-lines
.post-content-wrapper {
  padding: 20px;
  margin-bottom: 2em;
  position: relative;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f4f4f6;
  border-radius: var(--rounded);
  box-sizing: border-box
}
.center {
  text-align: center
}
.blog-traditional-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  color: #333;
  margin-right: 15px;
  display: inline-block;
  width: 100px;
  height: 80px;
  box-shadow: 0 6px 6px rgba(16,27,30,0.4);
}
.blog-realistic-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  margin-left: 15px;
  display: inline-block;
  color: #333;
  width: 100px;
  height: 80px;
  box-shadow: 0 1px 1px rgba(16,27,30,0.15), 
              0 2px 2px rgba(16,27,30,0.15), 
              0 4px 4px rgba(16,27,30,0.15), 
              0 8px 8px rgba(16,27,30,0.15), 
              0 16px 16px rgba(16,27,30,0.15);
}
.blog-shadow-big {
  width: 200px;
  height: 120px;
  padding-top: 40px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
}
.blog-shadow-label {
  font-size: 12px;
  color: #666;
  display: block;
}
.blog-shadow-6 {
  box-shadow: 0 6px 6px rgba(0,0,0,0.4);
}
.blog-shadow-long {
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12), 0 4px 4px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.12), 0 16px 16px rgba(0,0,0,0.12);
}
```

```json
```

:::

Look at how square and clumsy the default `box-shadow` effect (first box) looks compared to the layered `box-shadow` (second box). We can achieve this effect by creating multiple `box-shadows` (separating each shadow with a comma), and increasing the offset and blur for every shadow (the `box-shadow` syntax is `X-offset Y-offset blur color`):

```css
/* Default box-shadow */
.box {
  box-shadow: 0 3px 3px rgba(0,0,0,0.2);
}

/* Create smoother box-shadows by layering multiple
 * shadows with gradually increasing radius and offset */
.shadow-5 {
  box-shadow: 0 1px 1px rgba(0,0,0,0.12), 
              0 2px 2px rgba(0,0,0,0.12), 
              0 4px 4px rgba(0,0,0,0.12), 
              0 8px 8px rgba(0,0,0,0.12),
              0 16px 16px rgba(0,0,0,0.12);
}
```

This simple layering technique gives us more control over the rendering of shadows, and with it we can fine-tune sharpness, distance, and spread. You can for example increase or decrease the number of shadows to create a smaller or larger spread. (Note that if you increase the number of layers you’ll have to decrease the alpha value for each layer if you wish to keep the strength somewhat the same.)

::: normal-demo

```html
<div class="post-content-wrapper center">
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-medium">Layered box-shadows
    <span class="blog-shadow-label">4 shadows with 15% alpha</span>
  </div>
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-extra-long">Layered box-shadows
    <span class="blog-shadow-label">6 shadows with 11% alpha</span>
  </div>
</div>
```

```css{53-55,57-59} :collapsed-lines
.post-content-wrapper {
  padding: 20px;
  margin-bottom: 2em;
  position: relative;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f4f4f6;
  border-radius: var(--rounded);
  box-sizing: border-box
}
.center {
  text-align: center
}
.blog-traditional-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  color: #333;
  margin-right: 15px;
  display: inline-block;
  width: 100px;
  height: 80px;
  box-shadow: 0 6px 6px rgba(16,27,30,0.4);
}
.blog-realistic-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  margin-left: 15px;
  display: inline-block;
  color: #333;
  width: 100px;
  height: 80px;
  box-shadow: 0 1px 1px rgba(16,27,30,0.15), 
              0 2px 2px rgba(16,27,30,0.15), 
              0 4px 4px rgba(16,27,30,0.15), 
              0 8px 8px rgba(16,27,30,0.15), 
              0 16px 16px rgba(16,27,30,0.15);
}
.blog-shadow-big {
  width: 200px;
  height: 120px;
  padding-top: 40px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
}
.blog-shadow-label {
  font-size: 12px;
  color: #666;
  display: block;
}
.blog-shadow-medium {
  box-shadow: 0 1px 1px rgba(0,0,0,0.15), 0 2px 2px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.15), 0 8px 8px rgba(0,0,0,0.15);
}

.blog-shadow-extra-long {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 0 2px 2px rgba(0,0,0,0.11), 0 4px 4px rgba(0,0,0,0.11), 0 8px 8px rgba(0,0,0,0.11), 0 16px 16px rgba(0,0,0,0.11), 0 32px 32px rgba(0,0,0,0.11);
}
```

```json
```

:::

```css
.shadow-4 {
  box-shadow: 0 1px 1px rgba(0,0,0,0.15), 
              0 2px 2px rgba(0,0,0,0.15), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.15);
}

.shadow-6 {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 8px 8px rgba(0,0,0,0.11), 
              0 16px 16px rgba(0,0,0,0.11), 
              0 32px 32px rgba(0,0,0,0.11);
}
```

Controlling sharpness is as easy as controlling spread, but we can use both the alpha value and the blur value of each layer to change the *concentration of depth* and the *blur radius* of the shadow respectively.

The examples above use the same alpha value for all layers, but we can let the alpha value decrease or increase with every layer to create more or less diffuse shadows. For the more concentrated shadow below, the innermost shadow (with the least offset and blur) has the highest alpha value, and it decreases with every layer. The opposite is true for the more diffuse shadow of the second box, where the innermost layer has the lowest alpha value:

::: normal-demo

```html
<div class="post-content-wrapper center">
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-sharp">Sharp
    <span class="blog-shadow-label">Shadows with decreasing alpha</span>
  </div>
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-soft">Diffuse
    <span class="blog-shadow-label">Shadows with increasing alpha</span>
  </div>
</div>
```

```css{53-55,57-59} :collapsed-lines
.post-content-wrapper {
  padding: 20px;
  margin-bottom: 2em;
  position: relative;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f4f4f6;
  border-radius: var(--rounded);
  box-sizing: border-box
}
.center {
  text-align: center
}
.blog-traditional-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  color: #333;
  margin-right: 15px;
  display: inline-block;
  width: 100px;
  height: 80px;
  box-shadow: 0 6px 6px rgba(16,27,30,0.4);
}
.blog-realistic-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  margin-left: 15px;
  display: inline-block;
  color: #333;
  width: 100px;
  height: 80px;
  box-shadow: 0 1px 1px rgba(16,27,30,0.15), 
              0 2px 2px rgba(16,27,30,0.15), 
              0 4px 4px rgba(16,27,30,0.15), 
              0 8px 8px rgba(16,27,30,0.15), 
              0 16px 16px rgba(16,27,30,0.15);
}
.blog-shadow-big {
  width: 200px;
  height: 120px;
  padding-top: 40px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
}
.blog-shadow-label {
  font-size: 12px;
  color: #666;
  display: block;
}
.blog-shadow-sharp {
  box-shadow: 0 1px 1px rgba(0,0,0,0.25), 
              0 2px 2px rgba(0,0,0,0.20), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.10),
              0 16px 16px rgba(0,0,0,0.05);
}

.blog-shadow-soft {
  box-shadow: 0 1px 1px rgba(0,0,0,0.08), 
              0 2px 2px rgba(0,0,0,0.12), 
              0 4px 4px rgba(0,0,0,0.16), 
              0 8px 8px rgba(0,0,0,0.20);
}
```

```json
```

:::

```css
.blog-shadow-sharp {
  box-shadow: 0 1px 1px rgba(0,0,0,0.25), 
              0 2px 2px rgba(0,0,0,0.20), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.10),
              0 16px 16px rgba(0,0,0,0.05);
}

.blog-shadow-diffuse {
    box-shadow: 0 1px 1px rgba(0,0,0,0.08), 
                0 2px 2px rgba(0,0,0,0.12), 
                0 4px 4px rgba(0,0,0,0.16), 
                0 8px 8px rgba(0,0,0,0.20);
}
```

We can also increase the `blur` in higher incremenents, to increase the spread and create softer, almost dreamy, effects:

::: normal-demo

```html
<div class="post-content-wrapper center">
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-softer">Dreamy soft
    <span class="blog-shadow-label">Higher blur increase</span>
  </div>
</div>
```

```css{53-55,57-59} :collapsed-lines
.post-content-wrapper {
  padding: 20px;
  margin-bottom: 2em;
  position: relative;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f4f4f6;
  border-radius: var(--rounded);
  box-sizing: border-box
}
.center {
  text-align: center
}
.blog-traditional-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  color: #333;
  margin-right: 15px;
  display: inline-block;
  width: 100px;
  height: 80px;
  box-shadow: 0 6px 6px rgba(16,27,30,0.4);
}
.blog-realistic-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  margin-left: 15px;
  display: inline-block;
  color: #333;
  width: 100px;
  height: 80px;
  box-shadow: 0 1px 1px rgba(16,27,30,0.15), 
              0 2px 2px rgba(16,27,30,0.15), 
              0 4px 4px rgba(16,27,30,0.15), 
              0 8px 8px rgba(16,27,30,0.15), 
              0 16px 16px rgba(16,27,30,0.15);
}
.blog-shadow-big {
  width: 200px;
  height: 120px;
  padding-top: 40px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
}
.blog-shadow-label {
  font-size: 12px;
  color: #666;
  display: block;
}
.blog-shadow-softer {
  box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
              0 2px 4px rgba(0,0,0,0.07), 
              0 4px 8px rgba(0,0,0,0.07), 
              0 8px 16px rgba(0,0,0,0.07),
              0 16px 32px rgba(0,0,0,0.07), 
              0 32px 64px rgba(0,0,0,0.07);
}
```

```json
```

:::

```css
.blog-shadow-dreamy {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
}
```

Finally, we can control the distance by decoupling the blur radius and Y-offset, and increase the offset in bigger or smaller increments:

::: normal-demo

```html
<div class="post-content-wrapper center">
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-distance-short">Shorter
    <span class="blog-shadow-label">Shadows with smaller distances</span>
  </div>
  <div class="blog-realistic-shadow-box blog-shadow-big blog-shadow-distance-long">Longer
    <span class="blog-shadow-label">Shadows with larger distances</span>
  </div>
</div>
```

```css{53-55,57-59} :collapsed-lines
.post-content-wrapper {
  padding: 20px;
  margin-bottom: 2em;
  position: relative;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
  background-color: #f4f4f6;
  border-radius: var(--rounded);
  box-sizing: border-box
}
.center {
  text-align: center
}
.blog-traditional-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  color: #333;
  margin-right: 15px;
  display: inline-block;
  width: 100px;
  height: 80px;
  box-shadow: 0 6px 6px rgba(16,27,30,0.4);
}
.blog-realistic-shadow-box {
  background-color: #fff;
  line-height: 76px;
  border-radius: 3px;
  margin-left: 15px;
  display: inline-block;
  color: #333;
  width: 100px;
  height: 80px;
  box-shadow: 0 1px 1px rgba(16,27,30,0.15), 
              0 2px 2px rgba(16,27,30,0.15), 
              0 4px 4px rgba(16,27,30,0.15), 
              0 8px 8px rgba(16,27,30,0.15), 
              0 16px 16px rgba(16,27,30,0.15);
}
.blog-shadow-big {
  width: 200px;
  height: 120px;
  padding-top: 40px;
  line-height: 20px;
  margin-bottom: 30px;
  margin-top: 30px;
  box-sizing: border-box;
  margin-left: 15px;
  margin-right: 15px;
}
.blog-shadow-label {
  font-size: 12px;
  color: #666;
  display: block;
}
.blog-shadow-distance-short {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);
}
.blog-shadow-distance-long {
  box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);
}
```

```json
```

:::

```css
.shadow-shorter {
  box-shadow: 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);
}

.shadow-longer {
  box-shadow: 0 2px 1px rgba(0,0,0,0.09), 
              0 4px 2px rgba(0,0,0,0.09), 
              0 8px 4px rgba(0,0,0,0.09), 
              0 16px 8px rgba(0,0,0,0.09),
              0 32px 16px rgba(0,0,0,0.09);
}
```

Which combination of all of these techniques to use is of course highly dependent on the context that you’re working in, but with layered shadows we can at the very least gain some more control to help us achieve our desired look and feel.

::: info Further reading

```component VPCard
{
  "title": "How to animate box-shadow with silky smooth performance",
  "desc": "Spoiler-alert: you don't. You use a pseudo-element.",
  "link": "/tobiasahlin.com/how-to-animate-box-shadow.md",
  "logo": "https://tobiasahlin.com/images/touch-icon-ipad-retina.png",
  "background": "rgba(43,47,60,0.2)"
}
```

- ~~[Philipp Brumm (<VPIcon icon="fa-brands fa-x-twitter"/>`funkensturm`)](https://twitter.com/funkensturm) wrote a [smooth box shadow generator inspired by this article](https://brumm.af/shadows)~~

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Smoother & sharper shadows with layered box-shadows",
  "desc": "With a simple CSS trick, we can get fine-tuned control over how shadows are rendered, and create richer and more realistic 3D effects",
  "link": "https://chanhi2000.github.io/bookshelf/tobiasahlin.com/layered-smooth-box-shadows.html",
  "logo": "https://tobiasahlin.com/images/touch-icon-ipad-retina.png",
  "background": "rgba(43,47,60,0.2)"
}
```
