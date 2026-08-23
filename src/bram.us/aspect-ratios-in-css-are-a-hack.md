---
lang: en-US
title: "Aspect Ratios in CSS are a Hack"
description: "Article(s) > Aspect Ratios in CSS are a Hack"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Aspect Ratios in CSS are a Hack"
    - property: og:description
      content: "Aspect Ratios in CSS are a Hack"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/aspect-ratios-in-css-are-a-hack.html
prev: /programming/css/articles/README.md
date: 2017-06-16
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2017/06/film-aspect-ratio-2-combined.gif
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
  name="Aspect Ratios in CSS are a Hack"
  desc="UPDATE 2020.11.30: Aspect Ratios in CSS are no longer a hack, thanks to the new aspect-ratio CSS property! Right now I’m in Amsterdam attending CSS Day (my fourth time already!). Earlier this morning Bert Bos and Håkon Wium Lie – yes, the inventors of CSS – were on stage reflecting on the first days of … Continue reading Aspect Ratios in CSS are a Hack”"
  url="https://bram.us/2017/06/16/aspect-ratios-in-css-are-a-hack/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2017/06/film-aspect-ratio-2-combined.gif"/>

::: note UPDATE 2020.11.30

Aspect Ratios in CSS are no longer a hack, thanks to [**the new `aspect-ratio` CSS property**](/bram.us/native-aspect-ratio-boxes-in-css-thanks-to-aspect-ratio.md)!

:::

![](https://bram.us/wordpress/wp-content/uploads/2017/06/film-aspect-ratio-2-combined.gif)

Right now I’m in Amsterdam attending [<VPIcon icon="fas fa-globe"/>CSS Day](https://cssday.nl/) *(my fourth time already!)*. Earlier this morning Bert Bos and Håkon Wium Lie – yes, the inventors of CSS – were on stage reflecting on the first days of CSS and things they’d’ve done differently or turned out differently than they expected.

**At the end of the talk the question came up if we, the audience, found if things were missing in CSS.** Immediately aspect ratios came to my mind, as it’s something that has been bothering me for a few years by now, [over (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://x.com/bramus/status/482547142243135488), and [over (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://x.com/bramus/status/658550081004654592) again *(my first public musing about this [dates back to 2012 (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://x.com/bramus/status/229489411333705730))*.

At last years’ [<VPIcon icon="fas fa-globe"/>Fronteers Conference](http://fronteers.nl/congres) it – for a short period of time – even became a hot topic after a demo using a spacer gif to creating aspect ratios was shown on stage. It created some outrage, yet my response to it was more nuanced:

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>bramus</code>)

> Don’t bash the spacer gif or react, but bash the actual problem: there is no non-hacky way to work with aspect ratios on the web. #fronteers

<SiteInfo
  name="X에서 Bramus(@bramus) 님"
  desc="Don’t bash the spacer gif or react, but bash the actual problem: there is no non-hacky way to work with aspect ratios on the web. #fronteers"
  url="https://x.com/bramus/status/783967137853505537/"
  logo="https://x.com/favicon.ico"
  preview="https://pbs.twimg.com/profile_images/1276240813333401600/brd0hSfW_400x400.jpg"/>

:::

Before going any further, let’s first take a look at the current hacks that exist to creating aspect ratios on the web.

---

## Current Techniques

### Technique #0: Spacer gifs

No. Just no. 1999 called. They want their IE5 back.

Here, a dancing baby if you’re feeling nostalgic:

![](https://bram.us/wordpress/wp-content/uploads/2017/06/Baby.gif)

### Technique #1: Vertical Padding

A [**_(hopefully)_ well known and longstanding hack**](/alistapart.com/creating-intrinsic-ratios-for-video.md) to faking aspect ratios on the web is to abuse the vertical padding. By setting the `height` of an element to `0` and the `padding-top` or `padding-bottom` to a percentage based value one can force a box to have a fixed aspect ratio.

The reason to why this hack works is that the padding of an element is calculated against the width of that element [^1].

::: info "8.4 Padding properties: 'padding-top', 'padd..." *From W3C* (VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)
> The percentage is calculated with respect to the width of the generated box’s containing block, even for ‘`padding-top`‘ and ‘`padding-bottom`‘. If the containing block’s `width` depends on this element, then the resulting layout is `undefined` in CSS 2.1.

```component VPCard
{
  "title": "Box model",
  "desc": "he padding properties specify the width of the padding area of a box. The 'padding' shorthand property sets the padding for all four sides while the other padding properties only set their respective side...",
  "link": "https://w3.org/TR/CSS2/box.html#padding-properties",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

[^1]: The vertical padding isn’t always calculated against the width though, there is an exception … ~but that’s food for another blogpost~ [**which you can read about here**](/bram.us/vertical-marginspaddings-and-flexbox-a-quirky-combination.md) 😉

Say you need a box with an aspect ratio of `16:9`. The resulting percentage to apply as a vertical padding can then be calculated via the formula `100% * 9 / 16`, resulting in `56.25%`. Say you want a `4:3` box, use `75%` instead (`100% / 4 * 3`).

A generic implementation in CSS would be something like this:

```html
<div class="aspectratio" data-ratio="16/9">
  <div>
    <p>16:9</p>
  </div>
</div>
```

```css
.aspectratio {
  position: relative;
  height: 0;
  width: 100%;
}

.aspectratio[data-ratio="16:9"] {
  padding-top: 56.25%;
}

.aspectratio[data-ratio="4:3"] {
  padding-top: 75%;
}
```

You’ll need to wrap the content of `.aspectratio` in an extra element – a simple `<div>` will do – though, and sprinkle some extra CSS on top to position said element it properly inside `.aspectratio`:

```css
.aspectratio > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

<CodePen
  user="bramus"
  slug-hash="PjbyaR"
  title="CSS Aspect Ratios, Technique #1"
  :default-tab="['css','result']"
  :theme="dark"/>

Works fine in all browsers – even good old IE2 will do – but one must admit: it’s a hack, right?

### Technique #1b: Vertical Padding (using CSS variables)

If you’re familiar with [**CSS variables**](/bram.us/why-you-should-be-excited-about-native-css-variables.md) you can exchange the introduced `data-ratio` attribute from above with a CSS variable to define the aspect ratio to use:

```html
<div class="aspectratio" style="--aspect-ratio: 16/9;">
  <div>
    <p>16:9</p>
  </div>
</div>
```

```css
.aspectratio {
  position: relative;
  height: 0;
  width: 100%;
  padding-top: calc(100% / (var(--aspect-ratio)));
}

.aspectratio > * {
  …
}
```

<CodePen
  user="bramus"
  slug-hash="QgGPPa"
  title="CSS Aspect Ratios, Technique #1b"
  :default-tab="['css','result']"
  :theme="dark"/>

Same core technique, yet a tad more modern implementation 🙂

### Technique #2: Vertical Padding with Generated Content

A similar yet somewhat different approach to the first technique is to dynamically inject some content using `:after` or `:before`, and then stretch that out:

```css
.aspectratio {
  position: relative;
}

.aspectratio:after {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
}

.aspectratio[data-ratio="16:9"]:after {
  padding-top: 56.25%;
}

.aspectratio[data-ratio="4:3"]:after {
  padding-top: 75%;
}
```

<CodePen
  user="bramus"
  slug-hash="gRLBjv"
  title="CSS Aspect Ratios, Technique #2"
  :default-tab="['css','result']"
  :theme="dark"/>

Unlike the first technique, this technique doesn’t stretch out the `.aspectratio` element itself though. Only the generated content box is stretched out. This can make it quite nasty to style and rather impossible to center the contents both horizontally and vertically.

### Technique #3: Viewport based units

A technique I’m very fond of is to use viewport based units to hack together aspect ratios. It’s really great when you’re implementing full-width layouts, independent of the size of viewport *(most typical designs for, say, blogs eventually limit the width of the main column)*.

An element that is `100vw` can be given a height of `100vw / 16 * 9` = `56.25vw` to give it an aspect ratio of `16:9`

<CodePen
  user="bramus"
  slug-hash="XgNGjj"
  title="CSS Aspect Ratios, Technique #3"
  :default-tab="['css','result']"
  :theme="dark"/>

On the upside you don’t need extra elements to wrap your content in, nor do you need to alter its position. On the downside however is the fact it isn’t very usable nor portable when things start shifting around or have different widths. Because this technique relies on explicit widths (eg. `vw`) instead of dynamic ones (eg. `%`), you’ll need to explicitly define the `width`/`height` per breakpoint and element.

::: note

Huh? An element that has a width of `33vw` will need to a height of `33vw / 16 * 9` = `18.5625vw` to give it an aspect ratio of `16:9`. An element with a width of `40vw` will need a different height, even though they have the same aspect ratio.

:::

### Technique #4: Viewport based units + CSS Grid

In [<VPIcon icon="fas fa-globe"/>Experiments in fixed aspect ratios](http://ramenhog.com/blog/2017/05/09/experiments-in-fixed-aspect-ratios) Stephanie Liu experimented a bit further with fixed aspect ratios involving the grid spec. By defining square grid cells – using viewport based units – she’s then able to span elements over it:

```css
.aspectratio {
  display: grid;
  grid-template-columns: repeat(16, 6.25vw);
  grid-auto-rows: 6.25vw;
}

.aspectratio[data-ratio="16:9"] .content {
  grid-column: span 16;
  grid-row: span 9;
  background: hotpink;
}
```

<CodePen
  user="bramus"
  slug-hash="Rgowxv"
  title="CSS Aspect Ratios, Technique #4"
  :default-tab="['css','result']"
  :theme="dark"/>

This technique inherits the upsides and downsides of technique 3, but also re-introduces the extra element required to wrap around the content.

---

## What now?

As already hinted in the title and introduction I find these techniques hacks and would like to see a proper, non-hacky, way to implementing aspect ratios on the web.

The ideal technique would involve best parts of all ones mentioned above:

1. Work with elements that have dynamic widths
2. Don’t require an extra element wrapping the content

A to me ideal syntax would be something along these lines:

```css
.aspectratio[data-ratio="16:9"] {
  width: 100%;
  aspect-ratio: 16/9;
}
```

Researching upon this topic it came to my attention that [Tab Atkins (<VPIcon icon="fa-brands fa-x-twitter"/>`tabatkins`)](https://x.com/tabatkins) [<VPIcon icon="fas fa-globe"/>started writing a proposal for this back in 2012](https://xanthir.com/blog/b4810), suggesting a likewise syntax. In it he highlighted a case where things would start to become fuzzy. What if you were to specify both the `width`, `height`, and `aspect-ratio` but with a wrong `aspect-ratio` for that `width`/`height` combination?

> For example, given an element with `width:auto; height:auto; aspect-ratio: 2/1; max-height: 200px;` in a `500px` wide container, the element would first be set to `500px` wide, then `aspect-ratio` would naively set the height to `250px`, which is in violation of the `max-height` constraint. Instead, the element’s height becomes `200px` and the width is set to `400px`. If the element additionally had `min-width: 450px`, `aspect-ratio` would be completely ignored, as there’s no way to satisfy it.

::: note

Given the issue above, another syntax that would please me (and bypass the issue along with that) is this:

```css
.aspectratio[data-ratio="16:9"] {
  width: 100%;
  height: aspect-ratio(16/9);
}
```

Since you can’t set the `height` to a fixed unit, no extra calculations would need to be done. Of course you’d run into problems when setting both the `width` and the `height` to `aspect-ratio(…)`, but that can be specced out: only the last one defined will be used, the previous ones will revert to `auto`.

:::

On Twitter it was also pointed out to me that there’s [a WICG repo on the issue (<VPIcon icon="iconfont icon-github"/>`WICG/aspect-ratio`)](https://github.com/WICG/aspect-ratio). Greg Whitworth from Microsoft participates in the repo. The repo contains a link to a spec entitled [<VPIcon icon="fas fa-globe"/>Logical sizing properties](https://jonathankingston.github.io/logical-sizing-properties/) which is also edited by Tab.

![](https://bram.us/wordpress/wp-content/uploads/2017/06/logical-sizing-aspect-ratio.png)

The proposed syntax is currently leaning towards this *(`aspect-ratio` needing to be a number)*:

```css
.aspectratio[data-ratio="16:9"] {
  width: 100%;
  aspect-ratio: calc(16/9);
}
```

---

## So, can we use this “Logical Sizing” thing then? And when?

Given the fact that Tab is present here at CSSDay I’ll be asking him about it later *(I’m actually sitting next to him right now, yet he’s currently busy finishing up his slidedeck on Houdini – which he’s about to present later today – so I won’t be bothering him right now 😉)*.

::: note

Speaking of [**Houdini**](/smashingmagazine.com/houdini-maybe-the-most-exciting-development-in-css-youve-never-heard-of.md): I’m not sure this can be fixed with Houdini but perhaps it could … another thing I’ll be asking Tab about.

:::

A follow-up post will definitely land, once I’ve picked Tab his brain on this. To stay in the loop on this I’d recommend one to subscribe to [<VPIcon icon="fas fa-globe"/>the bram.us RSS feed](https://bram.us/feed/), or follow bram.us on [on X (<VPIcon icon="fa-brands fa-x-twitter"/>`bramurss`)](https://x.com/bramurss/) or [Facebook (<VPIcon icon="fa-brands fa-meta"/>`bramusblog`)](https://facebook.com/bramusblog/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Aspect Ratios in CSS are a Hack",
  "desc": "UPDATE 2020.11.30: Aspect Ratios in CSS are no longer a hack, thanks to the new aspect-ratio CSS property! Right now I’m in Amsterdam attending CSS Day (my fourth time already!). Earlier this morning Bert Bos and Håkon Wium Lie – yes, the inventors of CSS – were on stage reflecting on the first days of … Continue reading ”Aspect Ratios in CSS are a Hack”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/aspect-ratios-in-css-are-a-hack.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
