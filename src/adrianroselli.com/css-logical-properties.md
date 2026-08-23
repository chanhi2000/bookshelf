---
lang: en-US
title: "CSS Logical Properties"
description: "Article(s) > CSS Logical Properties"
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
      content: "Article(s) > CSS Logical Properties"
    - property: og:description
      content: "CSS Logical Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/css-logical-properties.html
prev: /programming/css/articles/README.md
date: 2019-11-13
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2019/11/styles-logical_visualization-300x300.png
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
  name="CSS Logical Properties"
  desc="I have often remarked that my blog is little more than a place for me to offload my memory. I need not remember the syntax, logic, test results, etc. of every control, widget, style, browser, and so on. I can just write a post and refer to it later. This…"
  url="https://adrianroselli.com/2019/11/css-logical-properties.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2019/11/styles-logical_visualization-300x300.png"/>

I have often remarked that my blog is little more than a place for me to offload my memory. I need not remember the syntax, logic, test results, etc. of every control, widget, style, browser, and so on. I can just write a post and refer to it later.

This post on CSS logical properties is just that. I don’t need to know it all *yet*, but when browser support is common I need to be able to support it out of the gate. I need to be able to implement it, test it, debug it, and understand the accessibility impact. Since my work straddles accessibility and internationalization, those are critical skills.

Whether or not you know it, dear reader, this probably applies to you too.

---

## The Syntax

Logical properties mostly do away with positional naming. Positions can become meaningless when text is rendered in a different language. For example, making list items by padding on the left and dropping a bullet in the gap will look a bit weird when translated to Hebrew, which is read right-to-left. The visual indent will be consumed by end-of-line spacing (since it is read from the right) and the bullet will look like a really aggressive period.

Keywords that are based on content flow are a key aspect of logical properties (and values). While `text-align: left` may be your standard style for a ragged-right block of text, a logical style would be `text-align: start`.

I made a thing to try to illustrate the mapping change. It is really for native English speakers (me). Yes, it leans on the colors from the Firefox dev tools.

<CodePen
  user="aardrian"
  slug-hash="bGGxrvM"
  title="Logical Properties Mapping"
  :default-tab="['css','result']"
  :theme="dark"/>

![Visualization showing typical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles-typical_visualization.png)

![Visualization showing logical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles-logical_visualization.png)

Screen shots of the two views in the visualization, in case you find it easier to look at them next to one another.

For those (me on Thursdays) who want a chart instead of a visualization to compare, the following table might help. It also includes a few mappings not in the preceding visualization.

<table class="noRWD"><caption>Logical Property and Value Mappings</caption><tbody><tr><th>Typical</th><th>Logical</th></tr><tr><td><code>border-top</code></td><td><code>border-block-start</code></td></tr><tr><td><code>border-right</code></td><td><code>border-inline-end</code></td></tr><tr><td><code>border-bottom</code></td><td><code>border-block-end</code></td></tr><tr><td><code>border-left</code></td><td><code>border-inline-start</code></td></tr><tr><td><code>border-top: X</code><br><code>border-bottom: Y</code></td><td><code>border-block: X Y</code></td></tr><tr><td><code>border-left: X;</code><br><code>border-right: Y;</code></td><td><code>border-inline: X Y;</code></td></tr><tr><td><code>border-top-left-radius</code></td><td><code>border-start-start-radius</code></td></tr><tr><td><code>border-top-right-radius</code></td><td><code>border-start-end-radius</code></td></tr><tr><td><code>border-bottom-left-radius</code></td><td><code>border-end-start-radius</code></td></tr><tr><td><code>border-bottom-right-radius</code></td><td><code>border-end-end-radius</code></td></tr><tr><td><code>margin-top</code></td><td><code>margin-block-start</code></td></tr><tr><td><code>margin-right</code></td><td><code>margin-inline-end</code></td></tr><tr><td><code>margin-bottom</code></td><td><code>margin-block-end</code></td></tr><tr><td><code>margin-left</code></td><td><code>margin-inline-start</code></td></tr><tr><td><code>margin: X Y;</code></td><td><code>margin-block: X;</code><br><code>margin-inline: Y;</code></td></tr><tr><td><code>padding-top</code></td><td><code>padding-block-start</code></td></tr><tr><td><code>padding-right</code></td><td><code>padding-inline-end</code></td></tr><tr><td><code>padding-bottom</code></td><td><code>padding-block-end</code></td></tr><tr><td><code>padding-left</code></td><td><code>padding-inline-start</code></td></tr><tr><td><code>padding: X Y;</code></td><td><code>padding-block: X;</code><br><code>padding-inline: Y;</code></td></tr><tr><td><code>min-width</code></td><td><code>min-inline-size</code></td></tr><tr><td><code>min-height</code></td><td><code>min-block-size</code></td></tr><tr><td><code>text-align: left;</code></td><td><code>text-align: start;</code></td></tr><tr><td><code>text-align: right;</code></td><td><code>text-align: end;</code></td></tr></tbody></table>

### Block vs. Inline

By now you should have noticed a lot of *block* and *inline* in those properties. Once you get your head around the general meaning it might be easier (it was for me).

::: tabs

@tab:active Inline

This corresponds to the axis of the text flow. English, for example, has a left-to-right text flow, so the inline axis is horizontal. For Japanese it would be vertical (since it has a top-to-bottom text flow).

@tab Block

This is the axis perpendicular to the text flow axis. For English, the block axis is vertical. For Chinese it would be horizontal.

:::

### Start vs. End

You probably also noticed *start* and *end* used throughout as well. Once you know the text direction this might be easier.

::: tabs

@tab:active Start

This corresponds to the text direction and reflects the side of the text from which you would start reading. For English, this corresponds to left. For Hebrew this would be right. For Chinese this would be the top.

@tab End

This also corresponds to the text direction and reflects the side of the text at which you would end reading. For English, this corresponds to right. For Hebrew this would be left. For Chinese this would be the bottom.

:::

---

## An Example

For this example I use a quote originally in English. I machine-translated it into Urdu, Japanese, and Chinese, representing horizontal left-to-right, horizontal right-to-left, vertical left-to-right, and vertical right-to-left.

It uses margin, padding, borders, border radius, CSS generated content, quotes, widths, and text alignment. Seeing them in action makes it a bit easier to understand the effects of logical properties.

I want to stress — *I do not speak any of these languages*. I am using them for demonstration purposes only. If you understand these languages and find my translations (and mark-up) lacking, then please share. After all, I am just a guy from Buffalo who has the ego to assert he knows how to make [<VPIcon icon="fas fa-globe"/>kaya](https://adrianroselli.com/recipes/kaya-coconut-jam), but the humility to know that is not true.

<CodePen
  user="aardrian"
  slug-hash="eYYjXzy"
  title="Logical Properties Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

View the [debug version of this pen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://cdpn.io/aardrian/debug/eYYjXzy).

As of this writing, if you are using any browser other than Firefox you should be unimpressed. Toggling between typical styles and the new logical styles will likely make each example look broken, *including* the English one (the first one).

### Screen Shots

I collected screen shots in Firefox to show how these should look. A before and after, showing how one looks with typical styles and then how it should look with logical styles.

![Urdu with typical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles_urdu_typical.png)

![Urdu with logical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles_urdu_logical.png)

The Urdu samples as seen in Firefox 71.0b6. Most obviously the border changes sides to correspond with the text direction. The `<dd>`s now indent from the right.

![Japanese with typical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles_japanese_typical.png)

![Japanese with logical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles_japanese_logical.png)

The Japanese samples as seen in Firefox 71.0b6. The maximum width of the `<blockquote>` is now applied on the correct axis (vertical) and the border on the `<footer>` shifts to the correct orientation.

![Chinese with typical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles_chinese_typical.png)

![Chinese with logical styles.](https://adrianroselli.com/wp-content/uploads/2019/11/styles_chinese_logical.png)

The Chinese samples as seen in Firefox 71.0b6. The border on the `<footer>` shifts to the correct orientation and the overall border changes sides to correspond with the text direction.

---

## A Cheatsheet

I am not going to remember all the syntax every time. I can, however, refer to my own cheat sheet to refresh my memory.

I built this for me, so it may not work well for your way of learning. For example, I use `<button>`s as my containers because I wanted to be able to use my keyboard to quickly jump around (and do some scripting that I have since removed).

Note that at the top of the page I have radio buttons to flip between writing modes and text directions, making it easier for me to confirm a style adapts, the browser does not support it, or remind myself that not everyone consumes content the same way.

You can also visit a [debug version of this cheatsheet pen (<VPIcon icon="fa-brands fa-codepen" />`aardrian`)](https://cdpn.io/aardrian/debug/QXKpxG).

<CodePen
  user="aardrian"
  slug-hash="QXKpxG"
  title="Playing with CSS Logical Properties Support"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Wrap-up

If it’s not obvious, I tried a few different approaches to get my head around logical properties. Maybe one of these will help you. If not, links follow.

::: info References

```component VPCard
{
  "title": "CSS Logical Properties and Values Module Level 1",
  "desc": "This module introduces logical properties and values that provide the author with the ability to control layout through logical, rather than physical, direction and dimension mappings. The module defines logical properties and values for the features defined in [CSS2]. These properties are writing-mode relative equivalents of their corresponding physical properties.",
  "link": "https://w3.org/TR/css-logical-1/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

<SiteInfo
  name="CSS logical properties and values - CSS | MDN"
  desc="The CSS logical properties and values module defines logical properties and values that can control layout through logical rather than physical direction and dimension mappings. Logical properties define direction‐relative equivalents to their corresponding physical properties."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

```component VPCard
{
  "title": "“CSS Logical Properties” | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "Logical properties and values provide control of layout through logical, rather than physical, direction and dimension mappings. These properties are writing-mode relative equivalents of their corresponding physical properties.",
  "link": "https://caniuse.com/?search=CSS+Logical+Properties/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

- [<VPIcon icon="fas fa-globe"/>Vertical typesetting with writing-mode revisited](https://chenhuijing.com/blog/vertical-typesetting-revisited/), Chen Hui Jing’s 2017 post exploring support, along with an [<VPIcon icon="fas fa-globe"/>amazing demo in Chinese](https://huijing.github.io/zh-type/).

<SiteInfo
  name="CSS Writing Modes"
  desc="Jen Simmons points us in the direction of a useful but less well known CSS feature that becomes increasingly important when designing page layouts for a global audience. Like the wise men following the Star of Bethlehem, sometimes the best direction is given to us, not chosen."
  url="https://24ways.org/2016/css-writing-modes/"
  logo="https://24ways.org/assets/icons/icon.ico"
  preview="https://cloud.24ways.org/authors/jensimmons280.jpg"/>

:::

::: note Update: 10 December 2019

> The CSS Working Group has published CSS Writing Modes Level 3 as a W3C Recommendation [<VPIcon icon="iconfont icon-w3c"/>w3.org/TR/2019/REC-css-writing-modes-3-20191210](https://w3.org/TR/2019/REC-css-writing-modes-3-20191210/).  
> Defines support for various international writing modes & their combinations, including left-to-right and right-to-left text ordering as well as vertical orientations. [pic.twitter.com/hi80XdombH](https://pic.twitter.com/hi80XdombH)
>
> [W3C I18n Activity, December 10, 2019 (<VPIcon icon="fa-brands fa-x-twitter"/>`@webi18n`)](https://twitter.com/webi18n/status/1204400393435992067)

:::

::: note Update: 31 December 2019

[<VPIcon icon="fas fa-globe"/>RTLStyling.com](https://rtlstyling.com/) looks to be a resource for styling right-to-left text in CSS. It contains a [<VPIcon icon="fas fa-globe"/>general guide](https://rtlstyling.com/posts/rtl-styling/) and, unlike my post, was written by someone who understands and reads/writes an RTL language.

:::

::: note Update: 14 December 2020

Over at CSS Tricks, Adam Argyle has written an overview of logical properties that has some images and metaphors that may click with some folks better than mine (note that the images do not have alternative text, so you need to see them to grok them). He also has a switcher so you can see the impact on a piece of content. Read [**Late to Logical**](/css-tricks.com/late-to-logical.md).

:::

::: note Update: 9 October 2021

Good news, everybody! [<VPIcon icon="iconfont icon-caniuse"/>Safari 15 support for CSS logical properties](https://caniuse.com/css-logical-props) is good! We don’t need to let Safari or IE hold back a multilingual web anymore!

Obviously, be certain the audience for the project where you want to use these features is running the appropriate browsers.

Bear in mind that in some communities, non-native speakers may be under-employed and therefore running on older hardware. This matters if you decide to implement these styles on, say, a municipality site in the U.S. where the Urdu-speaking population may not have the same access to jobs to be able to afford an iPhone 6S or later (the oldest handset which can run iOS 15). We may not be able to end systemic racism, but we can try to ensure we do not encode it in our work.

:::

::: note Update: 11 August 2025

Chris Coyier asks, [**Should we NEVER use non-logical properties?**](/blog.master.dev/should-we-never-use-non-logical-properties.md) He outlines the places where we can’t yet, but broadly agrees we should use them everywhere we can.

:::

::: info Other Posts

[**Earlier post: aria-label Does Not Translate**](/adrianroselli.com/aria-label-does-not-translate.md)

[**More recent post: Web Development Advent Calendars for 2019**](/adrianroselli.com/web-development-advent-calendars-for-2019.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Logical Properties",
  "desc": "I have often remarked that my blog is little more than a place for me to offload my memory. I need not remember the syntax, logic, test results, etc. of every control, widget, style, browser, and so on. I can just write a post and refer to it later. This…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/css-logical-properties.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
