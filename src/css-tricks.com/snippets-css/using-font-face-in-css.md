---
lang: en-US
title: "How to use @font-face in CSS"
description: "Article(s) > How to use @font-face in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to use @font-face in CSS"
    - property: og:description
      content: "How to use @font-face in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/snippets/using-font-face-in-css.html
prev: /programming/css/articles/README.md
date: 2009-08-10
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="How to use @font-face in CSS"
  desc="The @font-face rule allows custom fonts to be loaded on a webpage. Once added to a stylesheet, the rule instructs the browser to download the font from where"
  url="https://css-tricks.com/snippets/using-font-face-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

The `@font-face` rule allows custom fonts to be loaded on a webpage. Once added to a stylesheet, the rule instructs the browser to download the font from where it is hosted, then display it as specified in the CSS.

Without the rule, our designs are limited to the fonts that are already loaded on a user’s computer, which vary depending on the system being used. Here’s a nice [<VPIcon icon="fas fa-globe"/>breakdown of existing system fonts](https://cssfontstack.com/).

---

## General browser support

This browser support data is from [<VPIcon icon="iconfont icon-caniuse"/>Caniuse](http://caniuse.com/#feat=fontface), which has more detail. A number indicates that browser supports the feature at that version and up.

### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 4 | 3.5 | 9 | 12 | 3.1 |

### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 143 | 146 | 4 | 4.2-4.3 |

---

## Practical level of browser support

Things are [<VPIcon icon="iconfont icon-caniuse"/>shifting heavily toward WOFF](http://caniuse.com/#feat=woff) and [<VPIcon icon="iconfont icon-caniuse"/>WOFF 2](http://caniuse.com/#feat=woff2), so we can probably get away with:

```css
@font-face {
  font-family: 'MyWebFont';
  src:  url('myfont.woff2') format('woff2'),
        url('myfont.woff') format('woff');
}
```

You could probably even get away with *just* WOFF2 these days.

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2');
}
```

This browser support data is from [<VPIcon icon="iconfont icon-caniuse"/>Caniuse](http://caniuse.com/#feat=woff2), which has more detail. A number indicates that browser supports the feature at that version and up.

### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 36 | 39 | No | 14 | 12 |

### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 143 | 146 | 143 | 10.0-10.2 |

The only practical thing also using WOFF buys you is Internet Explorer 11 support.

---

## Deepest possible browser support

This is the method with the deepest support possible right now. The `@font-face` rule should be added to the stylesheet before any styles.

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('webfont.eot'); /* IE9 Compat Modes */
  src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('webfont.woff2') format('woff2'), /* Super Modern Browsers */
       url('webfont.woff') format('woff'), /* Pretty Modern Browsers */
       url('webfont.ttf')  format('truetype'), /* Safari, Android, iOS */
       url('webfont.svg#svgFontName') format('svg'); /* Legacy iOS */
}
```

Then use it to style elements like this:

```css
body {
  font-family: 'MyWebFont', Fallback, sans-serif;
}
```

---

## Slightly deeper browser upport

If you need a sort of a happy medium between full support and practical support, adding a `.ttf` will cover a few more bases:

```css
@font-face {
  font-family: 'MyWebFont';
  src: url('myfont.woff2') format('woff2'),
       url('myfont.woff') format('woff'),
       url('myfont.ttf') format('truetype');
}
```

| Chrome | Safari | Firefox | Opera | IE | Android | iOS |
| --- | --- | --- | --- | --- | --- | --- |
| 3.5+ | 3+ | 3.5+ | 10.1+ | 9+ | 2.2+ | 4.3+ |

---

## Alternative techniques

### `@import`

While `@font-face` is excellent for fonts that are hosted on our own servers, there may be situations where a hosted font solution is better. [<VPIcon icon="fa-brands fa-google"/>Google Fonts](https://google.com/fonts) offers this as a way to use their fonts. The following is an example of using `@import` to load the Open Sans font from [<VPIcon icon="fa-brands fa-google"/>Google Fonts](https://google.com/fonts):

```css
@import url(//fonts.googleapis.com/css?family=Open+Sans);
```

Then we can use it to style elements:

```css
body {
  font-family: 'Open Sans', sans-serif;
}
```

If you [<VPIcon icon="fa-brands fa-google"/>open the URL for the font](http://fonts.googleapis.com/css?family=Open+Sans), you can actually see all the `@font-face` work being done behind the scenes.

A benefit of using a hosted service is that it is likely to include all the font file variations, which ensures deep cross-browser compatibility without having to host all those files ourselves.

<CodePen
  user="anon"
  slug-hash="OPdaNB"
  title="Using @import for custom fonts"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### `<link>` a stylesheet

Similarly, you could link to the same asset as you would any other CSS file, in the of the HTML document rather than in the CSS. Using the same example from Google Fonts, this is what we would use:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
```

Then, we can style our elements like the other methods:

```css
body {
  font-family: 'Open Sans', sans-serif;
}
```

Again, this is importing the `@font-face` rules but, instead of injecting them to our stylesheet, they are added to our HTML instead.

<CodePen
  user="anon"
  slug-hash="YPBRqY"
  title="Using <link> for custom fonts"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

It’s about the same thing… both techniques download the assets needed.

---

## Understanding font file types

The original snippet at the top of this post references a lot of files with strange extensions. Let’s go over each one and get a better understanding of what they mean.

### WOFF / WOFF2

**Stands for:** Web Open Font Format.

Created for use on the web, and [<VPIcon icon="fa-brands fa-firefox"/>developed by Mozilla](https://developer.mozilla.org/en-US/docs/Web/Guide/WOFF) in conjunction with other organizations, WOFF fonts often load faster than other formats because they use a compressed version of the structure used by OpenType (OTF) and TrueType (TTF) fonts. This format can also include metadata and license info within the font file. This format seems to be the winner and where all browsers are headed.

[<VPIcon icon="iconfont icon-w3c"/>WOFF2](http://dev.w3.org/webfonts/WOFF2/spec/) is the next generation of WOFF and boasts better compression than the original.

### SVG / SVGZ

**Stands for:** Scalable Vector Graphics (Font)

SVG is a vector re-creation of the font, which makes it much lighter in file size, and also makes it ideal for mobile use. This format is the only one allowed by version 4.1 and below of Safari for iOS. SVG fonts are not currently supported by Firefox, IE or IE Mobile. [<VPIcon icon="fa-brands fa-firefox"/>Firefox has postponed implementation](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_fonts) indefinitely to focus on WOFF.

SVGZ is the zipped version of SVG.

### EOT

**Stands for:** Embedded Open Type.

This format was created by Microsoft (the original innovators of `@font-face`) and is a proprietary file standard supported only by IE. In fact, it’s the only format that IE8 and below will recognize when using `@font-face`.

### OTF / TTF

**Stands for:** OpenType Font and TrueType Font.

The WOFF format was initially created as a reaction to OTF and TTF, in part, because these formats could easily (and illegally) be copied, However, OpenType has capabilities that many designers might be interested in ([<VPIcon icon="fas fa-globe"/>ligatures and such](https://magnetstudio.com/words/2010/opentype-guide)).

---

## A note on performance

Web fonts are great for design but it’s important to also understand their impact on web performance. Custom fonts often cause sites to take a performance hit because the font must be downloaded before it’s displayed.

A common symptom *used to be* a brief moment where fonts first load as the fallback, then blink to the downloaded font. [<VPIcon icon="fas fa-globe"/>Paul Irish has an older post on this](https://paulirish.com/2009/fighting-the-font-face-fout/) (dubbed “FOUT”: Flash Of Unstyled Text).

*These days*, browsers are generally hiding the text before the custom font loads by default. Better or worse? You decide. You can exert some control over this through various techniques. A little out-of-scope for this article, but here’s a trifecta of articles by Zach Leatherman to get you started down the rabbit hole:

<SiteInfo
  name="How we use web fonts responsibly, or, avoiding a @font-face-palm | Filament Group, Inc., Boston, MA"
  desc="Read this page on the Filament Group website"
  url="https://filamentgroup.com/lab/font-loading.html/"
  logo="https://filamentgroup.com/images/icons/favicon-32x32.png"
  preview="https://filamentgroup.com/images/icons/twittercard.png"/>

<SiteInfo
  name="Flash of Faux Text—still more on Font Loading—zachleat.com"
  desc="A post by Zach Leatherman (zachleat)"
  url="https://zachleat.com/web/foft/"
  logo="https://zachleat.com/img/built/eeKNB-2F7b-192.jpeg"
  preview="https://screenshot.11ty.app/https%3A%2F%2Fzachleat.com%2Fopengraph%2Fweb%2Ffoft%2F%3Fcache%3D_20251031/opengraph/"/>

Here are some more considerations when implementing custom fonts:

### Watch the file size

Fonts can be surprisingly heavy, so lean towards options that offer lighter versions. For example, favor a font set that is 50KB versus one that weighs 400KB.

### Limit the character set, if possible

Do you really need the bold and black weights for one font? Limiting your font sets to load only what is used is a good idea and there are some [<VPIcon icon="fas fa-globe"/>good tips on that here](http://thenewcode.com/878/Slash-Page-Load-Times-With-CSS-Font-Subsetting).

### Consider system fonts for small screens

Many devices are stuck on crappy connections. One trick might be to target larger screens when loading the custom font using `@media`.

In this example, screens smaller than 1000px will be served a system font instead and screens that wide and above will be served the custom font.

```css
@media (min-width: 1000px) { 
  body {
    font-family: 'FontName', Fallback, sans-serif; 
  }
}
```

---

## Font services

There are a number of services that will host fonts and provide access to commercially-licensed fonts as well. The benefits of using a service often boil down to having a large selection of legal fonts delivered efficiently (e.g. serving them on a speedy CDN).

Here are a few hosted font services:

<SiteInfo
  name="Fonts by Hoefler&Co."
  desc="H&Co designs fonts for print, web, and mobile environments."
  url="https://typography.com"
  logo="https://typography.com/favicon.ico"
  preview="https://d31td5fkd89rr1.cloudfront.net/social/global.png"/>

<SiteInfo
  name="Adobe Fonts"
  desc="Adobe Fonts partners with the world’s leading type foundries to bring thousands of beautiful fonts to designers every day. No need to worry about licensing, and you can use fonts from Adobe Fonts on the web or in desktop applications."
  url="https://fonts.adobe.com"
  logo="https://fonts.adobe.com/favicon.ico"
  preview="https://fonts.adobe.com/adobe-fonts-social.jpg"/>

<SiteInfo
  name="Fontspring. Worry-Free fonts for everyone."
  desc="A better way to buy fonts online. Fontspring offers Worry-Free, perpetual licensing, and top-notch customer support."
  url="https://fontspring.com"
  logo="https://fontspring.com/icon.svg?v=6"
  preview="https://fontspring.com/presentation/images/social_media_2022.jpg"/>

<SiteInfo
  name="Typotheque type foundry - unique, high quality fonts for print and screens"
  desc="Typotheque type foundry, get unique, high quality fonts for print and screens directly from the designers. We also create custom (bespoke) fonts for most world's languages."
  url="https://typotheque.com"
  logo="https://typotheque.com/icon.svg"
  preview="https://typotheque.com/api/og"/>

```component VPCard
{
  "title": "Fonts.com | Find, Buy & Download Best Fonts",
  "desc": "Browse and find the best selection of high-quality desktop and web fonts. Try, buy and download classics, new releases, and best selling fonts.",
  "link": "https://fonts.com/",
  "logo": "https://fast.fonts.net/FontsCom/Live/static/2.15.1011.0/img/favicon-32x32.png",
  "background": "rgba(64,64,64,0.2)"
}
```

<SiteInfo
  name="Free Fonts! Legit Free & Quality | Font Squirrel"
  desc="Handpicked free fonts for graphic designers with commercial-use licenses."
  url="https://fontsquirrel.com"
  logo="https://fontsquirrel.com/favicon.ico?v=2"
  preview="https://fontsquirrel.com/presentation/theme_site/images/social_media_default.jpg"/>

---

## What about icon fonts?

It’s true, `@font-face` can load a font file full of icons that can be used for an icon system. However, I think you’re far better off using SVG as an icon system. [**Here’s a comparison**](/css-tricks.com/icon-fonts-vs-svg.md) of the two methods.

::: details Next steps with <code>@font-face</code>

<!-- TODO: /css-tricks.com/a-new-responsive-font-format-for-the-web.md -->
<!-- TODO: /css-tricks.com/snippets-css/basics-of-google-font-api.md -->
<!-- TODO: /css-tricks.com/custom-fonts-in-emails.md -->
<!-- TODO: /css-tricks.com/google-font-api-interview.md -->
<!-- TODO: /css-tricks.com/hey-hey-font-display.md -->
<!-- TODO: /css-tricks.com/the-font-face-dilemma.md -->

```component VPCard
{
  "title": "The At-Rules of CSS",
  "desc": "The at-rule is a statement that provides CSS with instructions to perform or how to behave. Each statement begins with an @ followed directly by one of",
  "link": "/css-tricks.com/the-at-rules-of-css.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/the-making-and-potential-benefits-of-a-css-font.md -->
<!-- TODO: /css-tricks.com/the-new-bulletproof-font-face-syntax.md -->
<!-- TODO: /css-tricks.com/typography-for-developers.md -->
<!-- TODO: /css-tricks.com/understanding-web-fonts-getting.md -->
<!-- TODO: /css-tricks.com/whats-deal-declaring-font-properties-font-face.md -->

:::

::: details More on <code>@font-face</code> performance

<!-- TODO: /css-trick.com/dont-just-copy-the-font-face-out-of-google-fonts-urls.md -->
<!-- TODO: /css-trick.com/fout-foit-foft.md -->
<!-- TODO: /css-trick.com/getting-the-most-out-of-variable-fonts-on-google-fonts.md -->
<!-- TODO: /css-trick.com/how-to-load-fonts-in-a-way-that-fights-fout-and-makes-lighthouse-happy.md -->
<!-- TODO: /css-trick.com/really-dislike-fout-font-display-optional-might-jam.md -->
<!-- TODO: /css-trick.com/learnings-from-a-webpagetest-session-on-css-tricks.md -->
<!-- TODO: /css-trick.com/loading-web-fonts-with-the-web-font-loader.md -->
<!-- TODO: /css-trick.com/watch-your-font-weight.md -->
<!-- TODO: /css-trick.com/three-techniques-performant-custom-font-usage.md -->

:::

::: details Related CSS properties

<!-- TODO: /css-tricks.com/almanac-properties/font-display.md -->
<!-- TODO: /css-tricks.com/a-font-display-setting-for-slow-connections.md -->
<!-- TODO: /css-tricks.com/a-new-responsive-font-format-for-the-web.md -->
<!-- TODO: /css-tricks.com/almanac-properties/font.md -->
<!-- TODO: /css-tricks.com/almanac-properties/font-feature-settings.md -->
<!-- TODO: /css-tricks.com/almanac-properties/font-family.md -->
<!-- TODO: /css-tricks.com/almanac-properties/font-size.md -->
<!-- TODO: /css-tricks.com/almanac-properties/font-style.md -->
<!-- TODO: /css-tricks.com/snippets-css/font-stacks.md -->

:::

::: info More <code>@font-face</code> resources

```component VPCard
{
  "title": "4.1. The @font-face rule - CSS Fonts Module Level 4",
  "desc": "The @font-face rule allows for linking to fonts that are automatically fetched and activated when needed. This allows authors to select a font that closely matches the design goals for a given page rather than limiting the font choice to a set of fonts available on a given platform. A set of font descriptors define the location of a font resource, either locally or externally, along with the style characteristics of an individual face. Multiple @font-face rules can be used to construct font families with a variety of faces. Using CSS font matching rules, a user agent can selectively download only those faces that are needed for a given piece of text.",
  "link": "https://w3c.github.io/csswg-drafts/css-fonts-4/#font-face-rule/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

<SiteInfo
  name="How To Use The url Thingy In The @font-face Rule | DigitalOcean"
  desc="I become so very lost when I try to put my mind around what value to use when specifying the url attribute of the @font-face Rule. Please, I would like to kn… "
  url="https://digitalocean.com/community/questions/how-to-use-the-url-thingy-in-the-font-face-rule/"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/social-share-default.e8530e9e.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use @font-face in CSS",
  "desc": "The @font-face rule allows custom fonts to be loaded on a webpage. Once added to a stylesheet, the rule instructs the browser to download the font from where",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/snippets/using-font-face-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
