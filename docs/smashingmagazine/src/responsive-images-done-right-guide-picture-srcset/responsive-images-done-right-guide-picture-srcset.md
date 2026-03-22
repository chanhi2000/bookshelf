---
lang: en-US
title: "Responsive Images Done Right: A Guide To And srcset"
description: "Article(s) > Responsive Images Done Right: A Guide To And srcset"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Responsive Images Done Right: A Guide To And srcset"
    - property: og:description
      content: "Responsive Images Done Right: A Guide To And srcset"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/responsive-images-done-right-guide-picture-srcset.html
prev: /programming/css/articles/README.md
date: 2014-05-14
isOriginal: false
author:
  - name: Eric Portis
    url: https://smashingmagazine.com/author/ericportis/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8c9d339a-b604-4684-9460-a2f871327c8c/rwd-images-opt-1.png
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
  name="Responsive Images Done Right: A Guide To And srcset"
  desc="A few days ago, we published an article on Picturefill 2.0, a perfect polyfill for responsive images. Today’s article complements Tim Wright’s article and explains exactly how we can use the upcoming  element and srcset, with simple fallbacks for legacy browsers. There is no reason to wait for responsive images; we can actually have them very soon..."
  url="https://smashingmagazine.com/2014/05/responsive-images-done-right-guide-picture-srcset/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8c9d339a-b604-4684-9460-a2f871327c8c/rwd-images-opt-1.png"/>

A few days ago, we published an [**article on Picturefill 2.0**](/smashingmagazine.com/picturefill-2-0-responsive-images-and-the-perfect-polyfill.md), a perfect polyfill for responsive images. Today’s article complements Tim Wright’s article and explains exactly how we can use the upcoming `<picture>` element and srcset, with simple fallbacks for legacy browsers. There is no reason to wait for responsive images; we can actually have them very soon.

Images are some of the most important pieces of information on the web, but over the web’s 25-year history, they haven’t been very adaptable at all. Everything about them has been stubbornly fixed: their size, format and crop, all set in stone by a single `src`.

::: info John Allsopp, A Dao of Web Design (<VPIcon icon="fas fa-globe"/><code>alistapart.com</code>)

> "Everything I’ve said so far could be summarized as: make pages which are adaptable.… Designing adaptable pages is designing accessible pages. And perhaps the great promise of the web, far from fulfilled as yet, is accessibility, regardless of difficulties, to information."  
>
<SiteInfo
  name="A Dao of Web Design"
  desc="Web designers often bemoan the malleable nature of the web, which seems to defy our efforts at strict control over layout and typography. But maybe the problem is not the web. Maybe the problem is …"
  url="https://alistapart.com/article/dao"
  logo="https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1"
  preview="https://s0.wp.com/_si/?t=eyJpbWciOiJodHRwczpcL1wvaTAud3AuY29tXC9hbGlzdGFwYXJ0LmNvbVwvd3AtY29udGVudFwvdXBsb2Fkc1wvMjAxOVwvMDNcL2Nyb3BwZWQtaWNvbl9uYXZpZ2F0aW9uLWxhdXJlbC01MTIuanBnP2ZpdD01MTIlMkM1MTImc3NsPTEiLCJ0eHQiOiJBIExpc3QgQXBhcnQiLCJ0ZW1wbGF0ZSI6ImVkZ2UiLCJmb250IjoiIiwiYmxvZ19pZCI6MTU4MDk0NzI2fQ.newTojEDtdGzV9hV6wY9Zx7WZCMjPNGV0-ORSKXaGUYMQ"/>

:::

HTML authors began to really feel these limitations when high-resolution screens and responsive layouts hit the web like a one-two punch. Authors — wanting their images to look crisp in huge layouts and on high-resolution screens — began sending larger and larger sources to everyone; the average size of an image file [<VPIcon icon="fas fa-globe"/>ballooned](https://httparchive.org/trends.php?s=All&minlabel=Nov+15+2010&maxlabel=Apr+1+2014#bytesImg&reqImg); very smart people called responsive web design “[<VPIcon icon="fas fa-globe"/>unworkably slow](https://cloudfour.com/thinks/css-media-query-for-mobile-is-fools-gold/)”.

**Images have been the number one obstacle** to implementing truly adaptable and performant responsive pages — pages that scale both up and down, efficiently tailoring themselves to both the constraints and the affordances of the browsing context at hand.

That is about to change.

The latest [**specification of the `<picture>` element**](/smashingmagazine.com/picturefill-2-0-responsive-images-and-the-perfect-polyfill.md) is the result of years of debate on how to make images adapt. It gives authors semantic ways to group multiple versions of the same image, each version having technical characteristics that make it more or less suitable for a particular user. The new specification has achieved broad consensus and is being implemented in Chrome, Opera and Firefox and Edge ([<VPIcon icon="iconfont icon-caniuse"/>link](https://caniuse.com/#search=srcset)) as I type.

The time to start learning this stuff is *now*!

Before we get to any of the (*shiny! new!*) markup, let’s look at the relevant ways in which browsing environments vary, i.e. the ways in which we want our images to adapt.

1. Our images need to be able to render crisply at different `device-pixel-ratio`s. We want high-resolution screens to get high-resolution images, but we don’t want to send those images to users who wouldn’t see all of those extra pixels. Let’s call this the `device-pixel-ratio` use case.
2. If our layout is fluid (i.e. responsive), then our images will need to squish and stretch to fit it. We’ll call this fluid-image use case.
3. Note that these two use cases are closely related: To solve both, we’ll want our images to be available in multiple resolutions so that they scale efficiently. We’ll call tackling both problems simultaneously the variable-sized-image use case
4. Sometimes we’ll want to adapt our images in ways that go beyond simple scaling. We might want to crop the images or even subtly alter their content. We’ll call this the art-direction use case.
5. Finally, different browsers support different image formats. We might want to send a fancy new format such as [**WebP**](/smashingmagazine.com/webp-images-and-performance.md) to browsers that can render it, and fall back to trusty old JPEGs in browsers that don’t. We’ll call this the type-switching use case.

The new `<picture>` specification includes features for all of these cases. Let’s look at them one by one.

![Rearranging images across various resolutions is relatively easy, however, loading different images (and only them) depending on the user’s resolution is quite difficult. Well, not any more. ([<VPIcon icon="fas fa-file-image"/>Image credit](https://picture.responsiveimages.org/images/viewport_selection_mob_first.jpg))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2f318118-0105-4c76-9e6a-3390cdb3d8dd/viewport-selection-opt.jpg)

---

## The `device-pixel-ratio` Use Case

Let’s start simply, with a fixed-width image that we want to adapt to varying `device-pixel-ratio`s. To do this, we’ll use the first tool that the new specification gives us for grouping and describing image sources: the `srcset` attribute.

Say we have two versions of an image:

- <VPIcon icon="fas fa-file-image"/>`small.jpg` (320 × 240 pixels)
- <VPIcon icon="fas fa-file-image"/>`large.jpg` (640 × 480 pixels)

We want to send <VPIcon icon="fas fa-file-image"/>`large.jpg` only to users with high-resolution screens. Using `srcset`, we’d mark up our image like so:

```html
<img srcset="small.jpg 1x, large.jpg 2x"
   src="small.jpg"
   alt="A rad wolf" />
```

The `srcset` attribute takes a comma-separated list of image URLs, each with an `x` descriptor stating the `device-pixel-ratio` that that file is intended for.

The `src` is there for browsers that don’t understand `srcset`. The `alt`, of course, is included for browsers that don’t render images at all. One element and three attributes gets us an image that looks crisp on high-resolution devices and efficiently degrades all the way down to text. Not too shabby!

---

## The Fluid- And Variable-Sized-Image Use Cases

What that markup won’t do is efficiently squish and stretch our image in a fluid layout. Before addressing this fluid-image use case, we need a little background on how browsers work.

Image preloading is, according to Steve Souders, “[<VPIcon icon="fas fa-globe"/>the single biggest performance improvement browsers have ever made](https://stevesouders.com/blog/2013/04/26/i/).” Images are often the heaviest elements on a page; loading them ASAP is in everyone’s best interest. Thus, the first thing a browser will do with a page is scan the HTML for image URLs and begin loading them. The browser does this long before it has constructed a DOM, loaded external CSS or painted a layout. Solving the fluid-image use case is tricky, then; we need the browser to pick a source before it knows the image’s rendered size.

**What a browser does know at all times is the environment it’s rendering in**: the size of the viewport, the resolution of the user’s screen, that sort of thing. We use this information when we use media queries, which tailor our layouts to fit particular browsing environments.

Thus, to get around the preloading problem, the first [<VPIcon icon="fas fa-globe"/>proposals](https://lists.whatwg.org/htdig.cgi/whatwg-whatwg.org/2012-May/035855.html) for fluid-image [**features**](/alistapart.com/responsive-images-how-they-almost-worked-and-what-we-need.md) suggested attaching media queries to sources. We would base our source-picking mechanism on the size of the viewport, which the browser knows at picking-time, not on the final rendered size of the image, which it doesn’t.

![Dealing with responsive images turned out to be quite a nightmare. A better way to provide the browser with details about its environment is by simply telling the browser the rendered size of the image. Kind of obvious, really. ([<VPIcon icon="fas fa-file-image"/>Image credit](https://ericportis.com/posts/2014/srcset-sizes/))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/06c96887-9e01-4289-ab81-cdd4ea38183c/measuring-image-size.png)

As it [<VPIcon icon="fas fa-globe"/>turns out](https://ericportis.com/posts/2014/srcset-sizes/), that’s a bad idea. While it’s technically workable, calculating the media queries needed is tedious and error-prone. A better idea is to **simply tell the browser the rendered size of the image**!

Once we tell the browser how many pixels it *needs* (via a new attribute, `sizes`) and how many pixels each of the sources *has* (via `w` descriptors in `srcset`), picking a source becomes trivial. The browser picks the smallest source that will still look reasonably crisp within its container.

Let’s make this concrete by developing our previous example. Suppose we now have three versions of our image:

- <VPIcon icon="fas fa-file-image"/>`large.jpg` (1024 × 768 pixels)
- <VPIcon icon="fas fa-file-image"/>`medium.jpg` (640 × 480 pixels)
- <VPIcon icon="fas fa-file-image"/>`small.jpg` (320 × 240 pixels)

And we want to place these in a flexible grid — a grid that starts out as a single column but switches to three columns in larger viewports, [<VPIcon icon="fas fa-globe"/>like this](https://ericportis.com/etc/smashing-mag-picture-examples/variable-size.html):

![A responsive grid example. ([<VPIcon icon="fas fa-globe"/>See the demo](https://ericportis.com/etc/smashing-mag-picture-examples/variable-size.html))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d3d8bc28-d761-4ed9-aab6-aaa0ce57e5d8/wolves-picture-examples-opt.png)

Here’s how we’d mark it up:

```html
<img srcset="large.jpg  1024w,
      medium.jpg 640w,
      small.jpg  320w"
   sizes="(min-width: 36em) 33.3vw,
      100vw"
   src="small.jpg"
   alt="A rad wolf" />
```

We’re using `srcset` again, but instead of `x` descriptors, we’re attaching `w` descriptors to our sources. These describe the actual width, in pixels, of the referenced file. So, if you “Save for Web…” at 1024 × 768 pixels, then mark up that source in `srcset` as `1024w`.

You’ll note that **we’re specifying only image widths**. Why not heights, too? The images in our layout are width-constrained; their widths are set explicitly by the CSS, but their heights are not. The vast majority of responsive images in the wild are width-constrained, too, so the specification keeps things simple by dealing only in widths. There are some [good (<VPIcon icon="iconfont icon-github"/>`ResponsiveImagesCG/picture-element`)](https://github.com/ResponsiveImagesCG/picture-element/issues/85) [reasons (<VPIcon icon="iconfont icon-github"/>`ResponsiveImagesCG/picture-element`)](https://github.com/ResponsiveImagesCG/picture-element/issues/86) for including heights, too — but not yet.

So, that’s `w` in `srcset`, which describes how many pixels each of our sources *has*. Next up, the `sizes` attribute. The `sizes` attribute tells the browser how many pixels it *needs* by describing the final rendered width of our image. Think of `sizes` as a way to give the browser a bit of information about the page’s layout a little ahead of time, so that it can pick a source before it has parsed or rendered any of the page’s CSS.

We do this by passing the browser a [<VPIcon icon="iconfont icon-w3c"/>CSS length](https://w3.org/TR/css3-values/#lengths) that describes the image’s rendered width. CSS lengths can be either absolute (for example, `99px` or `16em`) or [<VPIcon icon="iconfont icon-w3c"/>relative to the viewport](https://w3.org/TR/css3-values/#viewport-relative-lengths) (`33.3vw`, as in our example). That “relative to the viewport” part is what enables images to flex.

If our image occupies a third of the viewport, then our `sizes` attribute should look like this:

```css
sizes="33.3vw"
```

Our example isn’t quite so simple. Our layout has a breakpoint at 36 ems. When the viewport is narrower than 36 ems, the layout changes. Below that breakpoint, the image will fill 100% of the viewport’s width. How do we encode that information in our `sizes` attribute?

We do it by pairing media queries with lengths:

```css
sizes="(min-width: 36em) 33.3vw,
   100vw"
```

This is its format:

```css
sizes="[media query] [length],
   [media query] [length],
   etc…
   [default length]"
```

The browser goes over each media query until it finds one that matches and then uses the matching query’s paired length. If no media queries match, then the browser uses the “default” length, i.e. any length it comes across that doesn’t have a paired query.

With both a `sizes` length and a set of sources with `w` descriptors in `srcset` to choose from, the browser has everything it needs to efficiently load an image in a fluid, responsive layout.

Wonderfully, `sizes` and `w` in `srcset` also give the browser enough information to adapt the image to varying `device-pixel-ratio`s. Converting the CSS length, we give it in `sizes` to CSS pixels; and, multiplying that by the user’s `device-pixel-ratio`, the browser knows the number of device pixels it needs to fill — no matter what the user’s `device-pixel-ratio` is.

So, while the example in our `device-pixel-ratio` use case works only for fixed-width images and covers only 1x and 2x screens, this `srcset` and `sizes` example not only covers the fluid-image use case, but also adapts to arbitrary screen densities.

We’ve solved both problems at once. In the parlance set out at the beginning of this article, `w` in `srcset` and `sizes` covers the variable-sized-image use case.

Even more wonderfully, **this markup also gives the browser some wiggle room**. Attaching specific browsing conditions to sources means that the browser does its picking based on a strict set of conditions. “If the screen is high-resolution,” we say to the browser, “then you must use this source.” By simply describing the resources’ dimensions with `w` in `srcset` and the area they’ll be occupying with `sizes`, we enable the browser to apply its wealth of additional knowledge about a given user’s environment to the source-picking problem. The specification allows browsers to, say, optionally load smaller sources when bandwidth is slow or expensive.

One more thing. In our example, the size of the image is always a simple percentage of the viewport’s width. What if our layout combined both absolute and relative lengths by, say, adding a fixed 12-em sidebar to the three-column layout, [<VPIcon icon="fas fa-globe"/>like this](https://ericportis.com/etc/smashing-mag-picture-examples/absolute-and-fixed.html)?

![A layout combines absolute and relative lengths. ([<VPIcon icon="fas fa-globe"/>See the demo](https://ericportis.com/etc/smashing-mag-picture-examples/absolute-and-fixed.html))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f86f5d84-b0b4-4a96-8d43-6c24381aa7f4/absolute-relative-lengths-opt.png)

We’d use the [<VPIcon icon="iconfont icon-caniuse"/>surprisingly well-supported](https://caniuse.com/calc) [<VPIcon icon="iconfont icon-w3c"/>`calc()` function](https://dev.w3.org/csswg/css-values/#calc-notation) in our `sizes` attribute.

```css
sizes="(min-width: 36em) calc(.333 * (100vw - 12em)),
   100vw"
```

And… done!

---

## The Art-Direction Use Case

Now we’re cooking with gas! We’ve learned how to mark up varible-sized images that scale up and down efficiently, rendering crisply on any and all layouts, viewports and screens.

But what if we wanted to go further? What if we wanted to adapt more?

When Apple introduced the iPad Air last year, its website featured a [<VPIcon icon="fas fa-file-image"/>huge image of the device](https://ericportis.com/etc/ipad-air-art-direction/ipadair_hero_a.jpg). This might sound rather unremarkable, unless you — as web design geeks are wont to do — compulsively resized your browser window. When the viewport was short enough, the iPad did a remarkable thing: it [<VPIcon icon="fas fa-file-image"/>rotated to better fit the viewport](https://ericportis.com/etc/ipad-air-art-direction/ipadair_hero_b.jpg)!

We call this sort of thing “art direction.”

Apple art-directed its image by abusing HTML and CSS: marking up its image — which was clearly content — as an empty `div` and switching its `background-image` with CSS. The new `<picture>` specification allows authors to do this sort of breakpoint-based art direction entirely in HTML.

The specification facilitates this by layering another method of source grouping on top of `srcset`: `<picture>` and `source`.

Let’s get back to our example. Suppose that instead of letting our image fill the full width of the viewport on small screens, we crop the image square, zooming in on the most important part of the subject, and present that small square crop at a fixed size floated off to the left, leaving a lot of space for descriptive text, [<VPIcon icon="fas fa-globe"/>like this](https://ericportis.com/etc/smashing-mag-picture-examples/art-direction.html):

![An example with images combined with descriptive text. ([<VPIcon icon="fas fa-globe"/>See the demo](https://ericportis.com/etc/smashing-mag-picture-examples/art-direction.html))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/50f3bd30-9d93-4cdc-a27f-74dd820ea712/wolves-descriptive-text-opt.jpg)

To achieve this, we’ll need a couple of additional image sources:

- `cropped-small.jpg` (96 × 96 pixels)
- `cropped-large.jpg` (192 × 192 pixels)
- <VPIcon icon="fas fa-file-image"/>`small.jpg` (320 × 240 pixels)
- <VPIcon icon="fas fa-file-image"/>`medium.jpg` (640 × 480 pixels)
- <VPIcon icon="fas fa-file-image"/>`large.jpg` (1024 × 768 pixels)

How do we mark them up? Like so:

```html
<picture>
   <source media="(min-width: 36em)"
      srcset="large.jpg  1024w,
         medium.jpg 640w,
         small.jpg  320w"
      sizes="33.3vw" />
   <source srcset="cropped-large.jpg 2x,
         cropped-small.jpg 1x" />
   <img src="small.jpg" alt="A rad wolf" />
</picture>
```

This example is as complex as it gets, using every feature that we’ve covered so far. Let’s break it down.

The `<picture>` element contains two `source`s and an `img`. The `source`s represent the two separate art-directed versions of the image (the square crop and the full crop). The (required) `img` serves as our fallback. As we’ll soon discover, it does much of the actual work behind the scenes.

First, let’s take a close look at that first `source`:

```html
<source media="(min-width: 36em)"
   srcset="large.jpg  1024w,
      medium.jpg 640w,
      small.jpg  320w"
   sizes="33.3vw" />
```

This `source` represents the full uncropped version of our image. We want to show the full image only in the three-column layout — that is, when the viewport is wider than 36 ems. The first attribute here, `media=“(min-width: 36em)”`, makes that happen. If a query in a `media` attribute evaluates to `true`, then the browser must use that `source`; otherwise, it’s skipped.

The `source`’s other two attributes — `srcset` and `sizes` — are mostly copied from our previous variable-sized-image example. One difference: Because this `source` will be chosen only for the three-column layout, our `sizes` attribute only needs a single length, `33.3vw`.

When the viewport is narrower than 36 ems, the first `source`’s media query will evaluate to `false`, and we’d proceed to the second:

```html
<source srcset="square-large.jpg 2x,
                square-small.jpg 1x" />
```

This represents our small square crop. This version is displayed at a fixed width, but we still want it to render crisply on high-resolution screens. Thus, we’ve supplied both 1x and 2x versions and marked them up with simple `x` descriptors.

Lastly, we come to the surprisingly important (*indeed, required!*) `img`.

Any child of an `audio` or `video` element that isn’t a `source` is treated as fallback content and hidden in supporting browsers. You might, therefore, assume the same thing about the `img` here. Wrong! Users actually see the `img` element when we use `<picture>`. Without `img`, there’s no image; `<picture>` and all of its `source`s are just there to feed it a source.

Why? One of the main complaints about the first `<picture>` specification was that it reinvented the wheel, propsing an entirely new HTML media element, along the lines of `audio` and `video`, that mostly duplicated the functionality of `img`. Duplicated functionality means duplicated implementation and maintenance work — work that browser vendors weren’t keen to undertake.

Thus, the new specification’s reuse of `img`. The `<picture>` itself is invisible, a bit like a magical `span`. Its `source`s are just there for the browser to draw alternate versions of the image from. Once a source URL is chosen, that URL is fed to the `img`. Practically speaking, this means that any styles that you want to apply to your rendered image (like, say, `max-width: 100%`) need to be applied to `img`, not to `<picture>`.

OK, on to our last feature.

---

## The Type-Switching Use Case

Let’s say that, instead of doing all of this squishing, stretching and adapting to myriad viewport conditions, we simply want to give a new file format a spin and provide a fallback for non-supporting browsers. For this, we follow the pattern established by `audio` and `video`: `source type`.

```html
<picture>
   <source type="image/svg" src="logo.svg" />
   <source type="image/png" src="logo.png" />
   <img src="logo.gif" alt="RadWolf, Inc." />
</picture>
```

If the browser doesn’t understand the `image/svg` [<VPIcon icon="fa-brands fa-wikipedia-w"/>media type](https://en.wikipedia.org/wiki/Internet_media_type), then it skips the first `source`; if it can’t make heads or tails of `image/png`, then it falls back to `img` and the GIF.

During the [**extremely painful GIF-to-PNG transition**](/alistapart.com/pngopacity.md) period, web designers would have killed for such a feature. The `<picture>` element gives it to us, setting the stage for new image formats to be easily adopted in the years to come.

---

## That’s It!

That’s everything: every feature in the new `<picture>` specification and the rationale behind each. All in all, `srcset`, `x`, `w`, `sizes`, `<picture>`, `source`, `media` and `type` give us a rich set of tools with which to make images truly adaptable — images that can (*finally!*) flow efficiently in flexible layouts and a wide range of devices.

**The specification is not yet final**. The first implementations are in progress and are being staged behind experimental flags; its implementors and authors are working together to hash out the specification’s finer details on a daily basis. All of this is happening under the umbrella of the [<VPIcon icon="fas fa-globe"/>Responsive Images Community Group](http://ricg.io/). If you’re interested in following along, [<VPIcon icon="iconfont icon-w3c"/>join](https://w3.org/community/respimg/) the group, drop in on the IRC channel, weigh in on a [GitHub issue (<VPIcon icon="iconfont icon-github"/>`ResponsiveImagesCG/picture-element`)](https://github.com/ResponsiveImagesCG/picture-element/issues) or file a new one, sign up for the [<VPIcon icon="fas fa-globe"/>newsletter](http://ricg.io/), or follow the RICG [on Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`respimg`)](https://twitter.com/respimg).

::: info Further Reading

- [**Choosing A Responsive Image Solution**](/smashingmagazine.com/choosing-a-responsive-image-solution.md)
- [**One Solution To Responsive Images**](/smashingmagazine.com/one-solution-to-responsive-images.md)

```component VPCard
{
  "title": "WordPress Responsive Images With Art Direction",
  "desc": "With a few additions, WordPress websites can accommodate a responsive image use case known as art direction. Art direction gives us the ability to design with images whose crop or composition changes at certain breakpoints. In this article, Laurie Laforest will show you how to set up a WordPress theme to support art direction in a simple manner. This method relies on WordPress’ standard administration interface as much as possible, and it requires only a single image to be uploaded.",
  "link": "/smashingmagazine.com/responsive-images-in-wordpress-with-art-direction.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "53 s You Couldn’t Live Without",
  "desc": "CSS is important. And it is being used more and more often. Cascading Style Sheets offer many advantages you don't have in table-layouts - and first of all a strict separation between layout, or design of the page, and the information, presented on the page. Thus the design of pages can be easily changed, just replacing a css-file with another one. Isn't it great? Well, actualy, it is...",
  "link": "/smashingmagazine.com/53-css-techniques-you-couldnt-live-without.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive Images Done Right: A Guide To And srcset",
  "desc": "A few days ago, we published an article on Picturefill 2.0, a perfect polyfill for responsive images. Today’s article complements Tim Wright’s article and explains exactly how we can use the upcoming  element and srcset, with simple fallbacks for legacy browsers. There is no reason to wait for responsive images; we can actually have them very soon...",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/responsive-images-done-right-guide-picture-srcset.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
