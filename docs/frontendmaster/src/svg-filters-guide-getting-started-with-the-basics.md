---
lang: en-US
title: "SVG Filters Guide: Getting Started with the Basics"
description: "Article(s) > SVG Filters Guide: Getting Started with the Basics"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > SVG Filters Guide: Getting Started with the Basics"
    - property: og:description
      content: "SVG Filters Guide: Getting Started with the Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/svg-filters-guide-getting-started-with-the-basics.html
prev: /programming/css/articles/README.md
date: 2026-04-09
isOriginal: false
author:
  - name: Ana Tudor
    url: https://blog.master.dev/author/anatudor/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9094
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
  name="SVG Filters Guide: Getting Started with the Basics"
  desc="Let's take a look at what SVG filters are and the basics of how they work. "
  url="https://blog.master.dev/svg-filters-guide-getting-started-with-the-basics/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9094"/>

Visual effects like those produced by SVG `<filter>`s used to live in the *“here be dragons”* zone for me. I’m more of a tech, not an artist, so I usually steer clear of anything designery like UI, layout, typography, etc. My strength lies in building compact, logical solutions, not creating stunning aesthetics.

That is, until I accidentally fell into it. A problem popped up, and I thought SVG filters might do the trick. One thing led to another, and deeper and deeper down the rabbit hole I went. Luckily, there’s mathematics involved, which, up to a certain point at least, makes sense to me.

Since I’ve started posting SVG filter demos, people often ask me how to get started in this area. While I firmly believe the best way is to *just start using SVG filters*, I’d also like to provide this starter’s guide, the stuff I wish I had read while getting into all this.

---

## Introduction to SVG filters

All SVG filters must live inside an `<svg>` element. If we use that element *only* for defining filters (and not for rendering graphics as well), then it is functionally the same as a `<style>` element.

So we set its dimensions to 0 and hide it from screen readers.

```xml
<svg width='0' height='0' aria-hidden='true'></svg>
```

In CSS, we take it out of the document flow so it doesn’t affect the layout.

```css
svg[aria-hidden='true'][height='0'] { position: fixed }
```

We do this because collapsing its dimensions to zero via `width` and `height` attributes may not be enough.

Some scenarios may require, for example, setting `display: grid` on the parent of the `<svg>` element. In such a case, the `<svg>` element takes up a grid cell by default. This is less than ideal, but setting `position: fixed` (or any kind of positioning that removes the element from the document flow) on our `<svg>` solves the problem.

We may now drop any number of `<filter>` elements inside this `<svg>` and reference them from the CSS.

Every `<filter>` element needs to have an `id` attribute set.

```xml
<filter id="my-filter"></filter>
```

This is used to apply the `filter` on an element that becomes the filter input:

```css
.my-filtered-elem { filter: url(#my-filter) }
```

SVG filters may be chained just like CSS ones:

```css
.my-filtered-elem { filter: url(#my-1st-filter) url(#my-2nd-filter) }
```

They may also be chained with CSS ones:

```css
.my-filtered-elem { filter: url(#my-1st-filter) blur(.5rem) url(#my-2nd-filter) }
```

All SVG filters doing something with the RGB channels need to have the `color-interpolation-filters` attribute explicitly set in order to produce consistent results across browsers. This is because the default is inconsistent across browsers. Safari uses the `sRGB` value, while Chrome and Firefox use the `linearRGB` value.

[<VPIcon icon="fa-brands fa-firefox"/>In theory](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation-filters#usage_notes), the default is `linearRGB`, so this is a bug in Safari. In practice, what we need in order for our computations to work correctly is `sRGB`. We’re not going any further into this because I don’t fully get it myself, but for anyone curious, this is the only [<VPIcon icon="fas fa-globe"/>explanation](https://discuss.pixls.us/t/what-does-linear-rgb-mean/16584) I’ve ever read that ever made any sense at all to me. In any case, just know that this is an attribute that almost always needs to be set, together with the `id` attribute.

```xml
<svg width='0' height='0' aria-hidden='true'>
  <filter id='my-filter' color-interpolation-filters='sRGB'></filter>
</svg>
```

For anyone just starting out and unsure about whether it’s really needed, it’s probably best to add it just to be on the safe side. And remember, it’s best to add it [<VPIcon icon="fa-brands fa-stack-overflow"/>on the `filter` element itself](https://stackoverflow.com/questions/56029986/svg-filter-different-colouring-depending-on-browser), not on the individual elements inside it.

The `<filter>` element may also get attributes specifying the filter region, which is the area the filter effect is clipped to. Four attributes are used to define the filter region. First, we have the `x` and `y` attributes that give us the top-left corner coordinates of the filter region (where it starts) relative to the filter input’s bounding box. Then we have `width` and `height` attributes, which are the filter region dimensions.

If we don’t specify any of these attributes, the browser default is a filter region whose dimensions are `120%` of the filter input’s bounding box. The extra `20%` gives room for effects like blur or drop‑shadow, which often spill outside the bounding box of the filtered element.

![why the filter region needs to be bigger than the filter input’s bounding box](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/559669249-f5725d49-cd6c-4471-ae05-67931fd46ecf.png?resize=1024%2C591&ssl=1)

Also by default, this `120%` region is positioned symmetrically around the bounding box, so it starts at `-10%` along both axes. This means the filter region goes from `-10%` to `110%` of the input’s dimensions along both the *x* and *y* axes, so we have a `10%` buffer outside each of the four edges.

![the default filter region](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/562080818-ae3a9b93-d126-412f-afca-3c3342a93cc7.png?resize=1024%2C771&ssl=1)

Just like the values inside some CSS filters (for example `saturate()` or `opacity()`), these attributes can be set to either percentages or decimal values – `width='200%` and `width='2` produce the exact same result. So do `y='-50%` and `y='-.5`.

There are two common reasons why we may need need to override the default filter region:

- The effect spills outside the default bounds. Effects such as extrusion, displacement, blur or drop‑shadow may paint pixels beyond the default filter region. Without changing the default filter region, some of the outer pixels get clipped, giving us an awkward-looking result. In this case, we should expand the region to fully contain the effect. However, we should avoid expanding it too much, as that comes with a performance cost.
- We want to confine the effect to a smaller region. For example, when working with noise and/ or displacement like in the case of [**grainy gradients**](/blog.master.dev/grainy-gradients.md), we don’t want the effect to spill outside of the element we apply it on. Ensuring the filter region starts from the top left corner of our element (`x` and `y` are both `0`) and is restricted to its area (both the `width` and the `height` are `1`) prevents the effect from leaking outside.

Otherwise, in cases where the defaults are sufficient, we can safely omit these region-defining attributes altogether and keep our markup clean.

So far, we’ve only talked about *relative* values for the filter region position (specified by the `x` and `y` attributes) and dimensions (specified by the `width` and `height` attributes).

However, we may switch to *absolute* pixel values by changing the value of the `filterUnits` attribute from the `objectBoundingBox` default to `userSpaceOnUse`. In theory.

In practice, I don’t recall ever doing that given that we normally want things to be responsive on the web and a fixed pixel size filter region wouldn’t scale with the element the filter is applied on. This would lead to the filter output getting cropped once its responsive input grows above a certain fixed pixel size.

Still, I’ve made an interactive demo that allows playing with the attributes defining the filter region. When an attribute is greyed out and crossed off, it means it’s using its default value, so we could safely omit it. But at the same time, for the purpose of this interactive demo, it’s still present there, as clicking it brings up controls that allow changing its value.

<CodePen
  user="https://codepen.io/thebabydino/pen/RNGRVmV/e6f4f24ef82643f53936eece634aacbc"
  title="The SVG filter region"
  :default-tab="['css','result']"
  :theme="dark"/>

The content of the `<filter>` is intentionally very simple: it just fills the entire filter region with a bright green. The how behind is outside the scope of this introduction to SVG filters, so we’ll be unpacking it another time.

---

## Inside the `<filter>` element: primitives!

Inside the `<filter>` element is where we place the filter primitives – these are the elements that actually do the work when it comes to creating cool effects.

They are processed in the order they appear, so the output of one primitive is generally used as an input of the next by default. So if we want to see the result only up to a particular stage, we can can simply comment out or temporarily delete the primitives after that.

There are about twenty filter primitives, all prefixed with “fe”, which stands for “**_f_**ilter **_e_**ffect”. Not “fi”, which would stand for “filter”. Or “Fifi”.

![Fifi didn’t contribute to the naming of anything in the SVG spec… but an image of Fifi may get filter effects applied!](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/560779354-79c1aead-21d7-4c3d-8a31-5ff4727d8f79-1.png?resize=1024%2C607&ssl=1)

Every filter primitive produces an output, which may be given a name saved in its `result` attribute.

A primitive may take zero, one or two inputs, which we may set via the input attributes `in` (top layer, sometimes referred to as source layer) and `in2` (bottom layer, sometimes referred to as destination layer).

![SVG filter primitive types, classified based on number of inputs](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/562308674-70f0b576-4c93-4424-a8c4-b44a3aaa0ee1-2.png?resize=1024%2C261&ssl=1)

If we don’t explicitly specify the input atributes for primitives that do take inputs, then these inputs are by default set to either the `result` of the previous filter primitive (whether we’ve set the `result` attribute on the previous primitive or not, that’s irrelevant, it still produced an output), or to the filter input (in which case we use the `SourceGraphic` keyword) for the very first primitive, since in that case there is no previous primitive.

In addition to setting primitive inputs to the `result` of an earlier one or to the filter input (`SourceGraphic`) keyword, we may also set them to the filter input’s alpha map (in which case we use the `SourceAlpha` keyword).

Many tutorials and examples out there seem to imply we need to set the `result`, `in`, `in2` or `id` attributes on every primitive inside the SVG `filter`. We ***don’t***.

We only need to set the `result` attribute when we want to use that primitive’s output later in the `filter` and not just for the immediate next primitive.

For example, if we only need the output of the first primitive as an input for the second one, then the first primitive does not need a `result` attribute. However, if we also need to use the output of the first primitive seven primitives later, then the first primitive needs a `result` attribute we can reference later in the `filter`.

Similarly, we only need to set the `in` or `in2` attributes if they require a value different from the default.

![illustrating a multi-primitive SVG `filter` structure](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/562309068-da1516f5-d7ad-4b28-97cb-17f1dc5380f5-1.png?resize=1024%2C521&ssl=1)


As for the `id` attribute, the only time it makes sense to set it on a primitive is when we plan on manipulating that primitive from the JS.

A filter primitive may be limited to a rectangle called a primitive subregion. This is defined by the coordinates of its top left corner (set via the `x` and `y` attributes) and its dimensions (set via the `width` and `height` attributes).

![the result of an SVG filter that stacks a blurred version of the input, clipped to a given subregion, on top of a desaturated version of the same input](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/03/562447292-be3e22ea-f8e7-45e3-a432-21b6034e71f1-1.png?resize=1024%2C749&ssl=1)

Length values (offsets or sizes like those defining filter subregions) for all primitives inside an SVG `<filter>` element may be either *absolute* pixel values or *relative* to the filter input bounding box. By default, they are all absolute pixel values, not responsive. However, *if* we change the `primitiveUnits` attribute of the `<filter>` element to `objectBoundingBox`, then all length values of primitive attributes become relative to the filter input’s bounding box.

There are two things that are important to remember here.

First, the `primitiveUnits` attribute is only set on the `<filter>` element, not on the primitives themselves, and it affects *all* the primitives inside a `filter`.

If we need a primitive with relative units followed by one with absolute units, we need to put them into separate SVG `<filter>` elements and then chain the effects of those filters. In fact, needing different units is one of the two most common reasons for chaining filters, the other one being reusability: when we want the elements having the `filter` applied to get the same effect *only* up to a certain point.

Second, the `primitiveUnits` attribute is different from the `filterUnits` attribute.

The value of the `filterUnits` attribute affects the length-valued attributes set on the `<filter>` element itself (`x`, `y`, `width` and `height` defining the filter region), while the value of the `primitiveUnits` attribute affects the length-valued attributes set on the primitives inside the `<filter>` element.

They also have different defaults. The default value for `filterUnits` is `objectBoundingBox`, while the default value for `primitiveUnits` is `userSpaceOnUse`.

The `objectBoundingBox` and `userSpaceOnUse` are our only options and this feels limiting nowadays — we’re only given the choice between values relative to the dimensions of the filter input’s bounding box and fixed pixel values.

A lot of times, it would be a lot more convenient for these values to be relative to the `font-size` of the element we apply the `filter` on. This `font-size` may in turn depend on the container or viewport dimensions via container query units or viewport units. While there are hackarounds for some particular cases, in many others, this remains a big limitation of SVG filters that we cannot overcome.

::: important Key takeaways

Here are the most important things to remember:

- SVG filters must live inside an `<svg>` element.
- If the `<svg>` element only contains filters, then zero its dimensions, hide it from screen readers and take it out of the document flow.
- Inside the `<filter>` element, there are `fe`-prefixed elements (for example `<feTile>` or `<feBlend>`) called primitives. These are responsible for the magic.
- The `<filter>` element needs to have an `id` so we can reference it from the CSS.
- If the filter is doing something with the RGB channels, explicitly set the `color-interpolation-filters` attribute to `sRGB`.
- Other attributes we may want to set on the `<filter>` element:
  - `primitiveUnits` to `objectBoundingBox` if we want the length values specified by the primitives inside the `<filter>` to be relative to the filter input’s bounding box and not absolute pixel values.
  - One or more of the `x`, `y`, `width` and `height` attributes if we want to define a filter region different from the default one that extends `10%` in every direction outside the filter input’s bounding box; these are relative to the dimensions of the filter input’s bounding box by default.
  - In the rare case we want our filter effect to be restricted to a box whose position and dimensions are given in pixels, we may set `filterUnits` to `objectSpaceOnUse`.
- The primitives inside the `<filter>` element may take the following generic primitive attributes:
  - `x`, `y`, `width` and `height` specifying the primitive subregion via its top left corner coordinates and dimensions; whether these and other length-valued primitive attributes are absolute pixel lengths or relative to the filter input’s dimensions is determined by the value of the `primitiveUnits` attribute of their `<filter>` parent.
  - `in` and `in2` specifying the primitive inputs; these may reference the output of another primitive, the filter input (`SourceGraphic`) or the filter input’s alpha map (`SourceAlpha`).
  - `result`, whose value can be later used to reference the output of this primitive as an input for another primitive at a later time.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SVG Filters Guide: Getting Started with the Basics",
  "desc": "Let's take a look at what SVG filters are and the basics of how they work. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/svg-filters-guide-getting-started-with-the-basics.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
