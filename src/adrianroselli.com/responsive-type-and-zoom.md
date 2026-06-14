---
lang: en-US
title: "Responsive Type and Zoom"
description: "Article(s) > Responsive Type and Zoom"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Responsive Type and Zoom"
    - property: og:description
      content: "Responsive Type and Zoom"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/responsive-type-and-zoom.html
prev: /programming/css/articles/README.md
date: 2019-12-07
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2019/12/type_responsive-static_thumb-300x300.png
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
  name="Responsive Type and Zoom"
  desc="Typography that responds to viewport width (‘fluid’ or ‘responsive’ typography) can be useful when you want to ensure text does not get clipped or spill out of some design elements. Carousels, widget controls, or my Venn diagram are some examples. I say viewport width because I rarely see responsive type…"
  url="https://adrianroselli.com/2019/12/responsive-type-and-zoom.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2019/12/type_responsive-static_thumb-300x300.png"/>

Typography that responds to viewport width (‘fluid’ or ‘responsive’ typography) can be useful when you want to ensure text does not get clipped or spill out of some design elements. [<VPIcon icon="fas fa-globe"/>Carousels](http://shouldiuseacarousel.com/), widget controls, or my [**Venn diagram**](/adrianroselli.com/a-css-venn-diagram.md) are some examples.

I say viewport *width* because I rarely see responsive type consider the viewport height or the printed page. Not considering height can bw problematic for users holding their phone in landscape mode while trying to navigate pages with cookie consents and email form sign-ups. Not considering print can make for reams of [**wasted paper**](/adrianroselli.com/print-styles-are-media-queries.md).

---

## Responsive vs. Static

The alternative approach is to just use static text sizing, ignoring the size of the viewport.

To demonstrate the difference I forked a five-year-old Codepen that had just been updated last week, [Precision responsive typography (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://codepen.io/aardrian/pen/XWJmjrN) and started zooming the page, capturing screen shots along the way.

Then [I duplicated the pen (<VPIcon icon="fa-brands fa-codepen"/>`aardrian`)](https://codepen.io/aardrian/pen/NWPPJRo), removing all the responsive sizing styles, ensuring the text started at the same size in an un-zoomed window. Then I zoomed and screen-shat it.

### Screens

All screen shots were captured in Windows 10 / Firefox 72.0b1, but the effect is the same across browsers.


![The text in the screen shot is the same as the following image.](https://adrianroselli.com/wp-content/uploads/2019/12/type_responsive_no-zoom_firefox-scaled.png)

![The text in the screen shot is the same as the previous image.](https://adrianroselli.com/wp-content/uploads/2019/12/type_static_no-zoom_firefox-scaled.png)

The first/left image is the responsive type example with no zoom. The second image is the same HTML, but no responsive type, with no zoom. The text is the same size in both.

![The text in this screen shot is smaller than the following image.](https://adrianroselli.com/wp-content/uploads/2019/12/type_responsive_200-zoom_firefox-scaled.png)

![The text in the screen shot is larger than the previous image.](https://adrianroselli.com/wp-content/uploads/2019/12/type_static_200-zoom_firefox-scaled.png)

The first/left image is the responsive type example at 200% zoom. The second image is the same HTML, but no responsive type, at 200% zoom. The size difference is apparent, but not overwhelming.

![The text in this screen shot is significantly smaller than the following image.](https://adrianroselli.com/wp-content/uploads/2019/12/type_responsive_300-zoom_firefox-scaled.png)

![The text in the screen shot is significantly larger than the previous image.](https://adrianroselli.com/wp-content/uploads/2019/12/type_static_300-zoom_firefox-scaled.png)

The first/left image is the responsive type example at 300% zoom. The second image is the same HTML, but no responsive type, at 300% zoom. Firefox users cannot zoom any more, which means the text cannot get any larger for them. The text cannot get to truly 200% its original size.

While Firefox limits zoom to 300%, Chrome goes higher and at 400% zoom the user of the responsive type page can finally get the text to almost 200% of its original size.

### Code

::: details For comparison, I have embedded the two different CSS blocks within this poorly-styled `details`/`summary` thinger…

The original SCSS (comments stripped):

```css
$min_width: 400;
$max_width: 800;
$min_font: 12;
$max_font: 24; 

:root { font-size: #{$min_font}px; }

@media (min-width: #{$min_width}px) and (max-width: #{$max_width}px){
  :root { 
    font-size: calc( #{$min_font}px + (#{$max_font} - #{$min_font}) * ( (100vw - #{$min_width}px) / ( #{$max_width} - #{$min_width}) ));
  }
}
@media (min-width: #{$max_width}px){
   :root { 
     font-size: #{$max_font}px;
   }
}
```

The entirety of the text sizing CSS in my pen:

```css
:root {
  font-size: 150%;
}
```

:::

---

## Why It Matters

I have worked with users who scale text to this large. Some of them do it because they surf on their TV from their couch. Some do it when reading a recipe off their phone in the kitchen. Some do it when they need to present on a wall to a room full of a people. Some of them just have poor vision.

When people zoom a page, it is typically because they want the text to be bigger. When we anchor the text to the viewport size, even with a (fractional) multiplier, we can take away their ability to do that. It can be as much a [**barrier as disabling zoom**](/adrianroselli.com/dont-disable-zoom.md). If a user cannot get the text to 200% of the original size, you may also be looking at a [<VPIcon icon="iconfont icon-w3c"/>WCAG 1.4.4 Resize text (AA)](https://w3.org/WAI/WCAG21/quickref/?showtechniques=144#resize-text) problem — check out [<VPIcon icon="iconfont icon-w3c"/>Failure of Success Criterion 1.4.4 due to incorrect use of viewport units to resize text](https://w3.org/WAI/WCAG21/Techniques/failures/F94.html).

I want to be clear — I am not picking on the specific example above. That example is only demonstrating what developers *can* do, not what they *should* do. There may be completely valid reasons to use these techniques and the example I borrowed shows one method to do that.

---

## What to Do

Identify *why* you want responsive type. Is it based on user request? Surveys? Research? Or is it just that you or your team think it looks better? Or you want to try out this technique? The answers may tell you if you should even move ahead with responsive type.

Consider not setting a base font size. Maybe use the following rule (or similar or nothing) to inherit the font size from the browser, which may have been explicitly chosen by the user:

```css
:root {
   font-size: 100%;
}
```

Then only set subsequent text size values using `%`, `em`, or `rem` units, avoiding values below `100%`, `1em`, or `1rem` (unless scaling down in something already scaled up).

Be careful when using `vw` or `vh` units. Then be careful if using `calc()`. Be even more careful when using [<VPIcon icon="fa-brands fa-firefox"/>`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min), [<VPIcon icon="fa-brands fa-firefox"/>`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max), or [<VPIcon icon="fa-brands fa-firefox"/>`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) (see [<VPIcon icon="iconfont icon-w3c"/>CSS Values and Units Module Level 4](https://w3.org/TR/css-values-4/#calc-notation) for the Working Draft spec language).

If you are going to use responsive typography techniques anyway, you must test it by zooming. Zoom across devices, across browsers, across viewport sizes ([**not everyone surfs full-screen**](/adrianroselli.com/real-world-browser-size-stats-part-ii.md)), and across viewport orientations.

Also, don’t forget print styles. Consider print units in `pt`, and print to PDF to confirm it works without wasting paper.

::: note Update: 7 January 2020

New York Times has an [<VPIcon icon="fas fa-globe"/>experimental interactive piece](https://nytimes.com/interactive/2019/12/23/style/y2k-bug-millennials.html) that demonstrates some of what I discuss above. Zooming out from a page should not make the text larger than zooming in.

![At 80% zoom; about five words fit per line.](https://adrianroselli.com/wp-content/uploads/2019/12/nyt-y2k_text-size-80.jpg)

![At 110% zoom; about seven words fit per line.](https://adrianroselli.com/wp-content/uploads/2019/12/nyt-y2k_text-size-110.jpg)

![At 133% zoom; about six words fit per line.](https://adrianroselli.com/wp-content/uploads/2019/12/nyt-y2k_text-size-133.jpg)

The text is largest when at 80% zoom (first image), then much smaller at 110% zoom (middle image), then a bit larger at 133% zoom (last image).

:::

::: note Update: 20 May 2020

Scaling text by using the browser preferences to change the default text size will not affect any text on a page that is set in `px` units.

To say it a different way, if you set your text in `px`, then it will not scale when a user explicitly chooses a larger or smaller default size. You `px`-based text will stay the same size, laughing at your user.

Obviously full-page zoom overrides it, but many users still opt for a larger default size to avoid having to scale every site. So don’t set your text in `px`.

:::

::: note Update: 26 September 2020

Apparently I need to keep saying this. The following is becoming my default comment on articles that [**keep**](/css-tricks.com/how-do-you-do-max-font-size-in-css.md) [**appearing**](/css-tricks.com/accessible-font-sizing-explained.md) [**without**](/css-tricks.com/simplified-fluid-typography.md) [**cautions**](/css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport.md).

Please be careful with maximum text size, particularly on sites/pages that face the general public or employees. If you prevent the text from scaling up 200%, then that is a [<VPIcon icon="iconfont icon-w3c"/>WCAG SC 1.4.4](https://w3.org/WAI/WCAG21/Understanding/resize-text.html) failure at Level AA. [<VPIcon icon="iconfont icon-w3c"/>Viewport units have their own call-out](https://w3.org/WAI/WCAG21/Techniques/failures/F94.html) as a major risk in WCAG.

No matter what technique you use, be sure that the page text can be zoomed at least 200%. And yes, I have written about [**responsive type and zoom**](/adrianroselli.com/responsive-type-and-zoom.md), and have cautioned against `min()`, `max()`, and `clamp()`.

:::

::: note Update: 29 September 2020

This in response to a [**specific request**](/css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport.md#comment-1763312) on the post [**Linearly Scale font-size with CSS clamp() Based on the Viewport**](/css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport.md). I referenced a [simpler example (<VPIcon icon="fa-brands fa-codepen"/>`pprg1996`)](https://codepen.io/pprg1996/pen/yLONLPv/) from the post [**in my comment**](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport.md#comment-1763339), but figured I would use the final example here to be sure I caught all the affordances in the code.

<CodePen
  user="pprg1996"
  slug-hash="xxVVKPZ"
  title="Fluid typography example"
  :default-tab="['css','result']"
  :theme="dark"/>

I made a video showing that as I zoom to 200%, the text stops scaling at about the 150% point.

<VidStack src="youtube/https://adrianroselli.com/wp-content/uploads/2019/12/responsive-type-example.mp4" />

Here I compare the original text, the page scaled to 200%, and then how the text should look if it was actually made it to 200%.

![Unzoomed, about 7 lines of text fit in the window.](https://adrianroselli.com/wp-content/uploads/2019/12/responsive-type-example_100.jpg)

![At 200% zoom, about 4 lines of text fit in the window.](https://adrianroselli.com/wp-content/uploads/2019/12/responsive-type-example_200-zoom.jpg)

![When the text is actually scaled to 200%, maybe one line would fit in the window.](https://adrianroselli.com/wp-content/uploads/2019/12/responsive-type-example_200-actual.jpg)

Here I show the `<h1>` at its initial size, when the page is zoomed to 200%, and when the text is actually 200% the size of the initial text. I aligned them on the baseline to make the difference between them more obvious.

![The zoomed text is maybe 25% taller, with the actual 200% take showing how much different they are.](https://adrianroselli.com/wp-content/uploads/2019/12/responsive-type-example_comparison.jpg)

Similarly, even a [simple demo (<VPIcon icon="fa-brands fa-codepen"/>`pprg1996`)](https://cdpn.io/pprg1996/debug/yLONLPv/bZrQWERpdGak) taken out of context can be a problem. Your text should never get smaller when the user zooms, and it certainly should not be smaller at 300% zoom.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2019/12/responsive-type-example_02.mp4" />

::: note Update: 17 October 2020

Over at dev.to, Google’s developer support blog, Una Kravets posted [**`min()`, `max()`, and `clamp()`: three logical CSS functions to use today**](/web.dev/min-max-clamp.md) where she walks through how each of those CSS functions works and shows some examples.

There is a [**fluid typography example**](/web.dev/min-max-clamp.md#fluid-typography) she borrowed from elsewhere that shows how text can scale and adjust to the viewport, using only the style declaration `font-size: clamp(1.5rem, 5vw, 3rem)`. A video shows it in action.

If you have read this far, you may have spotted something that can cause a problem here. It’s not the use of `clamp()`, since the upper limit, `3rem`, is twice the size of the starting `1.5rem`. It’s the use of `vw` units. For some users, the text can never get large enough to bump up against the `3rem`.

I made a video to demonstrate it in action, but you can [visit the original demo (<VPIcon icon="fa-brands fa-codepen"/>`una`)](https://codepen.io/una/pen/ExyYXaN) to try it yourself. Remember that Firefox can only zoom to 300%.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2019/12/una-dev-clamp.mp4" />

This is a 1,024 pixel window in width, though I kept the height short and it has no impact on the demo. The text starts at 64px tall, at 200% zoom has only increased to 68px in height (a 6.25% increase), and at 300% zoom has only increased to 96px in height (a 150% increase).

If you use this code as-is, you have guaranteed a WCAG failure.

I [filed a pull request (<VPIcon icon="iconfont icon-github"/>`GoogleChrome/web.dev`)](https://github.com/GoogleChrome/web.dev/pull/4080) (which they merged on 21-Oct) with a brief explanation:

> When you use `vw` units or limit how large text can get with `clamp()`, there is a chance a user may be unable to scale the text to 200% of its original size. If that happens, it is WCAG failure under [<VPIcon icon="iconfont icon-w3c"/>1.4.4 Resize text (AA)](https://w3.org/WAI/WCAG21/quickref/?showtechniques=144#resize-text) so be certain to [test the results with zoom](https://adrianroselli.com/2019/12/responsive-type-and-zoom.html).

…before [merging another PR (<VPIcon icon="iconfont icon-github"/>`GoogleChrome/web.dev`)](https://github.com/GoogleChrome/web.dev/pull/4112/files) that removed the links. So, shrug emoji?

:::

::: note Update: 27 September 2022

I completely failed to link to W3C issues that may or may not have some impacts here:

- [#1671 Can large headings be exempt from Success Criterion 1.4.4 Resize text? (<VPIcon icon="iconfont icon-github"/>`w3c/wcag#1671`)](https://github.com/w3c/wcag/issues/1671), filed against WCAG by Šime Vidas on 8 March 2021;
- [#6869 Browser zoom unit for accessibility [css-values-and-units] (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#6869`)](https://github.com/w3c/csswg-drafts/issues/6869), filed against CSS by Scott Kellum on 8 December 2021. Not a lot of movement recently, but it is instructional to see the challenges and goals outlined by all parties.

:::

:::: note Update: 17 November 2023

I kinda like this:

::: info "Addressing Accessibility Concerns With Using Fluid Type" *From Smashing Magazine* (<VPIcon icon="fas fa-globe"/><code>smashingmagazine.com</code>)

> Mudford cites Adrian Roselli, who appears to be [**the core source**](/adrianroselli.com/responsive-type-and-zoom.md) of the other warnings:
> 
> [**Addressing Accessibility Concerns With Using Fluid Type**](/smashingmagazine.com/addressing-accessibility-concerns-fluid-type.md) by Maxwell Barvian at Smashing Magazine

:::

That may very well be true. I did not find others citing the very real (and easy to prove) WCAG failures developers were suddenly pushing into their projects. That was a little depressing, frankly (considering how easy it is to prove). I spent a lot of time grumping about this online, too. So yay me.

Anyway, Maxwell does the thing I did not — he tried to plot the curves and do the math to give developers guidance on how to write their CSS functions to create WCAG-conformant fluid type. I have not tested the assertions, but I definitely appreciate the effort.

It only took four years!

::::

::: note Update: 3 April 2025

This video may look familiar:

<VidStack src="https://adrianroselli.com/wp-content/uploads/2019/12/CSSWG-issue-2528_text-fit-space-zoom.mp4" />

A string of text in a browser window reads “This text fits to the available space.” It does not wrap to a second line. The user zooms the page and surrounding text gets larger, but not this text. It never changes size, becoming smaller and smaller relative to surrounding text.

I have videos in this post showing the same behavior with other responsive type techniques. But this technique is new. It’s meant to ensure a piece of text always fits the width of its parent. Wrapping does not seem to be an option.

Patrick Lauke posted this video as a [comment on [css-fonts-4] Feature for making text always fit the width of its parent #2528 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#2528`)](https://github.com/w3c/csswg-drafts/issues/2528#issuecomment-2770261671). He demonstrated that encoding this behavior into the CSS specification will create an almost guaranteed WCAG failure every time it is used. Unfortunately, the first response by a W3C CSS Working Group member was to say that WCAG should revise this SC which, unfortunately, seems to ignore the [<VPIcon icon="iconfont icon-w3c"/>W3C Priority of Constituencies](https://w3.org/TR/html-design-principles/#priority-of-constituencies) at the very minimum.

:::

::: note Update: 20 October 2025

Miriam Suzanne has been running at responsive type for a few months now, with a series of five posts (and a sixth about units in general) ending with [**Visualizing Responsive Typography**](/oddbird.net/type-visual.md). None of them gives a definitive, absolute, copy-pasta-ready set of styles for responsive type that’s guaranteed not to trigger a 1.4.4 violation. Because this stuff is hard, as that series demonstrates.

Meanwhile, last week Matthias Ott posted [<VPIcon icon="fas fa-globe"/>Com­pressed Flu­id Typography](https://matthiasott.com/notes/compressed-fluid-typography), which is another effort at trying to solve this and *not* fail WCAG. He acknowledges that in the post. What we are seeing is that there are many ways to detonate a cat but so far none leave the cat alive.

::: info Other Posts

```component VPCard
{
  "title": "Web Development Advent Calendars for 2019",
  "desc": "Web developers around the world have celebrated Saturnalia solstice Isaac Newton’s birthday Christmas with advent calendars covering web-related topics. As a result, you may recognize some of the ones listed below. Every year I miss a few on day one, so add a comment or tweet me if you have…",
  "link": "/adrianroselli.com/web-development-advent-calendars-for-2019.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

[**More recent post: Showing File Types in Links**](/adrianroselli.com/showing-file-types-in-links.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive Type and Zoom",
  "desc": "Typography that responds to viewport width (‘fluid’ or ‘responsive’ typography) can be useful when you want to ensure text does not get clipped or spill out of some design elements. Carousels, widget controls, or my Venn diagram are some examples. I say viewport width because I rarely see responsive type…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/responsive-type-and-zoom.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
