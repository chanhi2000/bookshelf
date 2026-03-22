---
lang: en-US
title: "CSS Generators"
description: "Article(s) > CSS Generators"
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
      content: "Article(s) > CSS Generators"
    - property: og:description
      content: "CSS Generators"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-generators.html
prev: /programming/css/articles/README.md
date: 2021-06-24
isOriginal: false
author:
  - name: Iris Lješnjanin
    url: https://smashingmagazine.com/author/iris-ljesnjanin/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/af649c50-abf1-4214-9e6c-493c3c4ad872/4-css-generators.png
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
  name="CSS Generators"
  desc="In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers. This time Iris Lješnjanin brings you CSS Generators: from CSS shadows to easing gradients to CSS overlays to CSS doodles."
  url="https://smashingmagazine.com/2021/03/css-generators/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/af649c50-abf1-4214-9e6c-493c3c4ad872/4-css-generators.png"/>

In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers. This time Iris Lješnjanin brings you CSS Generators: from CSS shadows to easing gradients to CSS overlays to CSS doodles.

Last week, we looked at [**CSS Auditing tools**](/smashingmagazine.com/css-auditing-tools.md), and this week around we’ll be looking at useful generators for everything CSS: from gradients to drop-shadows and bezier curves to triangles and type scales. Just a few useful tools for your toolbelt, to keep close.

::: info More On CSS

```component VPCard
{
  "title": "CSS Auditing Tools",
  "desc": "Ideally, a CSS auditing tool would provide some insights about how heavily CSS implact rendering performance, and which operations lead to expensive layout recalculations. It could also highlight what properties don’t affect the rendering at all (like Firefox DevTools does it), and perhaps even suggest how to write slightly more efficient CSS selectors. In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers to get their work done better and faster. Starting out with a few tools for getting to the bottom of CSS.",
  "link": "/smashingmagazine.com/css-auditing-tools.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Things You Can Do With CSS Today",
  "desc": "The present and future of CSS are very bright indeed and if you take a pragmatic, progressive approach to your CSS, then things will continue to get better and better on your projects, too. Some of the really handy powers CSS gives you might have slipped you by, so in this article, Andy Bell will take a look into masonry layout, :is selector, clamp(), ch and ex units, updated text decoration, and a few other useful CSS properties. ",
  "link": "/smashingmagazine.com/things-you-can-do-with-css-today.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Useful DevTools Tips and Shortcuts**](/smashingmagazine.com/useful-chrome-firefox-devtools-tips-shortcuts.md)

:::

---

## CSS Generators Collection

We’re going to look at a bunch of different generators in this roundup, so it only seems appropriate to kick it off with [<VPIcon icon="fas fa-globe"/>this collection of 10 generators built by Temani Afif](https://css-generators.com). Known for his penchant for flat markup and reusable styles, Temani has integrated his modern CSS techniques into this collection that includes generators for tooltips, ribbon shapes, waves, starbursts, gradients, and clipped corners, among several others. The fun thing about this collection is that Temani has shared the techniques he uses to generate the code [<VPIcon icon="iconfont icon-smashingmagazine"/>in a number of articles he’s written here at Smashing Magazine](https://smashingmagazine.com/author/temani-afif/)!

![CSS Generators Collection ([<VPIcon icon="fas fa-file-image"/>Large preview]("https://files.smashing.media/css-generators-temani.png"))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/css-challenges-generators.webp)

---

## CSS Shadows Generator

Looking for a tool that’ll automatically generate CSS code for really **smooth, layered box-shadows**? Well, you’re going to love SmoothShadow. Inspired by an article written by [**Tobias Ahlin Bjerrome**](/tobiasahlin.com/layered-smooth-box-shadows.md), this nifty tool was created to help anyone generate the code they need on the spot.

![SmoothShadow Figma plugin by Philipp Brumm ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/29c59032-7213-4d9a-b5d4-6653c2d7c456/1-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/29c59032-7213-4d9a-b5d4-6653c2d7c456/1-css-generators.png)

Once you’ve given it a try, it will be difficult to not use it. The little tool allows you to visually design a layered smooth box-shadow, but also tweak alpha, offset and blur with individual easing curves. And it gets even better: The creator of the tool, [Philipp Brumm (<VPIcon icon="fa-brands fa-x-twitter"/>`funkensturm`)](https://x.com/funkensturm), has also released SmoothShadow as a [<VPIcon icon="fa-brands fa-figma"/>Figma plugin](https://figma.com/community/plugin/788830704169694737/SmoothShadow), so you can optimize your workflow just like you’ve always wanted to.

---

## CSS Border-Radius Generator

When we think about `border-radius`, we usually think about a few straightforward values — perhaps 8px or 11px, or maybe 16px. However, `border-radius` can be quite [**fancy**](/9elements.com/css-border-radius-can-do-that.md), and [<VPIcon icon="iconfont icon-9elements"/>fancy-border-radius](https://9elements.github.io/fancy-border-radius/#30.30.30.33--.) generator allows you to generate them easily. The tool provides a visualization of not only plain round shapes, but also organic shapes, by using eight values combined. Essentially, what we are creating are overlapping ellipses that build the final shape. The tool is also available as [CLI tool (<VPIcon icon="iconfont icon-github"/>`9elements/fancy-border-radius`)](https://github.com/9elements/fancy-border-radius), so you can run it locally as well.

![Border Radius organic cell ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/67998e7d-f168-4b4e-9b3c-aea3c7bffe2b/2-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/67998e7d-f168-4b4e-9b3c-aea3c7bffe2b/2-css-generators.png)

---

## Cubic-Bezier Curves Generator

Sometimes an animation just doesn’t feel right, does it? Perhaps the duration is off, or the easing is quirky, and figuring it out might take quite some time. With Lea Verou’s [<VPIcon icon="fas fa-globe"/>cubic-bezier](https://cubic-bezier.com/), you can **preview and compare animations**, slow them down and even adjust them visually. And then copy-paste the CSS snippet to plug into your project right away.

![Perfect Cubic-Bezier Curves](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3b04b7c5-9cb5-4bb9-be2d-f9273e31871c/3-css-generators.png)

And if you need basic or complex CSS @keyframe animations, [<VPIcon icon="fas fa-globe"/>eyframes.app](https://keyframes.app/) provides a **visual timeline editor** similar to video-editing software. You can add steps, change sizing and position, apply transforms and color changes and get the CSS to copy-paste as well. Ah and not to forget the [<VPIcon icon="fa-brands fa-google"/>Animation panel in Chrome](https://developers.google.com/web/tools/chrome-devtools/inspect-styles/animations) and [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Work_with_animations) for debugging as well.

---

## Easing Gradients

With gradients, we often rely on linear gradients, transitioning from one color to another. However, linear gradients have hard edges where they start or end. There is a way to make the gradients slightly better, with easing functions. So Andreas Larsen has built a little editor, [<VPIcon icon="fas fa-globe"/>Easing Gradients Editor](https://larsenwork.com/easing-gradients/), that allows us to create and preview easing gradients in CSS. The tool is also available as a [Sketch plugin (<VPIcon icon="iconfont icon-github"/>`larsenwork/sketch-easing-gradient`)](https://github.com/larsenwork/sketch-easing-gradient) and a [PostCSS plugin (<VPIcon icon="iconfont icon-github"/>`larsenwork/postcss-easing-gradients`)](https://github.com/larsenwork/postcss-easing-gradients). You can use a color picker, but unfortunately can’t add an actual HEX color value yet.

![Linear gradients have hard edges where they start or end, and we can fix it with easing functions. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9ae9e757-68f6-4ea4-a75f-a8f2d6533a72/c0zoib50.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/9ae9e757-68f6-4ea4-a75f-a8f2d6533a72/c0zoib50.png)

---

## Data Visualization Color Palettes

Sometimes you need very specific type of color for a very specific task. For example, if you are working on a data visualization project — e.g. pie charts, grouped bar charts, maps — you probably need a series of colors that are *visually equidistant*. That’s when [<VPIcon icon="fas fa-globe"/>LearnUI Data Color Picker](https://learnui.design/tools/data-color-picker.html#palette) can become very useful. In such cases, it’s better to use a **range of hues,** so users can identify the differences faster. It’s indeed easier to distinguish *yellow from orange* than *blue from blue-but-15%-lighter*.

![An accessible and vibrant color scheme, using a range of hues to identify differences faster. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/af649c50-abf1-4214-9e6c-493c3c4ad872/4-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/af649c50-abf1-4214-9e6c-493c3c4ad872/4-css-generators.png)

With the tool, you choose how many colors you need and whether you need a light or a dark background color, and choose whether you want a default palette, a single hue palette, or a divergent color scale. Once you have it, you can copy hex values and export them as SVG to use in Sketch, Figma or Adobe XD.

![An accessibility check for headings and body copy. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7b268276-9d44-4aa5-bc13-3d376cc1f60a/4b-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7b268276-9d44-4aa5-bc13-3d376cc1f60a/4b-css-generators.png)

LearnUI also provides an [<VPIcon icon="fas fa-globe"/>accessible color generator](https://learnui.design/tools/accessible-color-generator.html) and a quite [fancy gradient generator](https://learnui.design/tools/gradient-generator.html), with different gradient types, interpolation, angle, easing and how smooth you’d like the gradient to be.

---

## From CSS Color Shades To Triangles And Fake Data

Imagine that you just need to find CSS triangle styles for elements and pseudo-elements. Or perhaps refine the color palette a bit by exploring **tints and shades** of a given color. Or perhaps generate a linear and radial CSS gradient for a section of the page. There is no need to do it all manually or try to find those CSS snippets all over the web. You can always find them on [<VPIcon icon="fas fa-globe"/>Omatsuri](https://omatsuri.app/).

![From CSS Gradients To Fake Data ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/27d30187-536e-4944-882a-2651fa5f33a6/5-css-generators.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/27d30187-536e-4944-882a-2651fa5f33a6/5-css-generators.jpg)

Omatsuri means *festival* in Japanese, and the site is a lovely little festival of open-source browser tools for everyday use. On the site, you’ll find a [<VPIcon icon="fas fa-globe"/>triangle generator](https://omatsuri.app/triangle-generator), a color shades generator, a gradient generator, page dividers, SVG compressor, **SVG → JSX converter**, a fake data generator, CSS cursors, and keyboard event codes. Designed and built by Vitaly Rtishchev and Vlad Shilov. The [source code of the site (<VPIcon icon="iconfont icon-github"/>`rtivital/omatsuri`)](https://github.com/rtivital/omatsuri) is available as well.

---

## CSS Overlay With High Contrast Generator

If you want to make text better stand out against a background image, there’s a little trick: You can use a CSS `linear-gradient` overlay with a certain opacity on top of the image to improve color contrast. [Spotify (<VPIcon icon="fa-brands fa-x-twitter"/>`addyosmani`)](https://x.com/addyosmani/status/1365735686838493187), for example, uses the technique.

![CSS linear gradient overlay ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4a813689-6e6e-4444-805a-8ae2830273f9/6-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4a813689-6e6e-4444-805a-8ae2830273f9/6-css-generators.png)

<CodePen
  user="yaphi1"
  slug-hash="oNbEqGV"
  title="Optimal Overlay Finder - Readable Text on a Background Image"
  :default-tab="['css','result']"
  :theme="dark"/>

While all of this only requires one line of code, there’s still one question left to be answered: How to determine the opacity to use for the overlay? The [Optimal Overlay Finder (<VPIcon icon="fa-brands fa-codepen" />`yaphi1`)](https://codepen.io/yaphi1/pen/oNbEqGV) helps you find out. You upload an image, enter your text and choose your overlay and text colors, and the tool shows you a preview of what the overlay looks like when applied to your image, as well as the optimal overlay opacity. A small detail that goes a long way.

---

## OKLCH Color Picker & Converter

The `oklch()` color function traverses the P3 color space and offers a number of advantages over other CSS color functions, like `rgb()` and `hsl()`. And even though the notation is striking similar to HSL, the “chroma” value (the “C” in OKLCH) may throw you off, as it’s not as intuitive as, say, “lightness” or “hue” which are measured in predictable percentages and degrees.

That makes the [<VPIcon icon="fas fa-globe"/>OKLCH Color Picker & Converter](https://oklch.com) a handy tool to keep in your back pocket. Made by the Evil Martians team, it’s just plain fun to use this and play with the visualizations that clearly illustrate the shape and boundaries of the color space.

![OKLCH COLOR Picker & Converter controls ([<VPIcon icon="fas fa-file-image"/>Large preview]("https://files.smashing.media/oklch-color-generator.png"))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/oklch-color-generator.png)

---

## CSS Color Palette Generator

There are plenty of fantastic tools to generate your color palette, but [<VPIcon icon="fas fa-globe"/>Coolors.co](https://coolors.co/) is a little nifty tool that does just enough to generate palettes and explore different shades of a color. You can create a palette from the photo or a collage of photos, test for color blindness and quickly adjust hue, saturation, brightness and temperature. Obviously, it also features [<VPIcon icon="fas fa-globe"/>trending color palettes](https://coolors.co/palettes/trending).

![CSS Color Palette Generator for finding just the right gradients. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ae2e3c82-3484-4581-88cd-2ecc52282573/7-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/ae2e3c82-3484-4581-88cd-2ecc52282573/7-css-generators.png)

You can also produce a gradient palette between two colors and [<VPIcon icon="fas fa-globe"/>create and export your own gradient](https://coolors.co/gradient-maker/fcf3c4-f962a0-aa96f9) as CSS. The tool is available as an iOS app, Adobe add-on and Chrome extension.

![Another color generator, also available as iOS app, Adobe add-on and Chrome extension. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0c142156-9777-4fdb-9902-5f918c3bc485/8-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0c142156-9777-4fdb-9902-5f918c3bc485/8-css-generators.png)

And if you need something slightly more sophisticated for gradients in your toolbox, [<VPIcon icon="fas fa-globe"/>CSSGradient.io](https://cssgradient.io/) is another tool for all your gradient needs — be it lineal or radial gradients, [<VPIcon icon="fas fa-globe"/>color shades](https://cssgradient.io/color-shades/) or gradient backgrounds.

Also, [<VPIcon icon="fas fa-globe"/>Gradient Generator](https://colordesigner.io/gradient-generator) generates 1 to 40 stepped gradients from two colors of your choice. Each gradient is automatically presented in HEX, HSL, and RGB formats — all you need to do is simply click on the value, and it will be copied to your clipboard right away.

---

## CSS Color Gradients Generator

Hand-picking colors to make a color gradient requires design experience and a good understanding of color harmony. If you need a gradient for a background or for UI elements but don’t feel confident enough to tackle the task yourself (or if you’re in a hurry), the [<VPIcon icon="fas fa-globe"/>color gradient generator](https://mybrandnewlogo.com/color-gradient-generator) which the folks at My Brand New Logo have created has got your back.

![Color gradient generator ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3f1e06d9-0162-4a6d-ae11-56a07295f12b/9-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/3f1e06d9-0162-4a6d-ae11-56a07295f12b/9-css-generators.png)

Powered by color gradient algorithms, the generator creates well-balanced gradients based on a color you select. There are four different styles of gradients that go from subtle to a mother-of-pearl effect and an intense, deep color gradient. You can adjust the gradient with sliders and, once you’re happy with the result, copy-paste the generated CSS code to use it in your project.

---

## CSS Type Scale Generator

So what if you want to create a reliable typographic system that works well both on mobile and on desktop? Usually you would rely on established typographic scales, that provide a typographic hierarchy for everything from paragraphs to captions and headings. [<VPIcon icon="fas fa-globe"/>Type-Scale](https://type-scale.com/) by Jeremy Church is a fantastic little tool that helps you build a typographic scale and export it in CSS. Small scales are usually a good fit for mobile views, medium scales could work well for the desktop view, and large scales could work well for marketing sites.

![A a fantastic little tool that helps you build a typographic scale and export it in CSS. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0216afda-fc55-4d57-9928-885a89d01f7b/10-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0216afda-fc55-4d57-9928-885a89d01f7b/10-css-generators.png)

The tool provides 8 pre-defined harmonious type scales (but you can define a custom one as well), from Major Third to Perfect Fifth and generate a sequence of font sizes with a particular geometric incrementation ratio. You can adjust the settings such as `line-height` and body weight, refine the preview text and get the generated CSS — or edit it with a type specimen on CodePen. Alternatively, you can check Tim Brown’s good ol’ [<VPIcon icon="fas fa-globe"/>ModularScale.com](https://modularscale.com/) as well.

![Modular scale, using similar structures like the musical scale. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68f9f6c6-8ece-49a0-b283-efc4ad7332d6/11-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68f9f6c6-8ece-49a0-b283-efc4ad7332d6/11-css-generators.png)

Another lovely tool is a [<VPIcon icon="fas fa-globe"/>Typographic Scale Calculator](https://layoutgridcalculator.com/typographic-scale/) by [<VPIcon icon="fas fa-globe"/>Jean-Lou Desire](https://jeanlou.net/) which, unlike Tim’s and Jeremy’s tools, generates a [**modular scale**](/alistapart.com/more-meaningful-typography.md) using three defining properties (the initial term, the increment ratio, and the number of sizes in the scale) similar to the musical scale. The result is a smoother sizing for designers, with a few more options to compose more values from — e.g. for smaller side notes or large blockquotes.

---

## Line Height Calculator

If you’re building a type scale based on a baseline grid, there’s a tricky question to be answered: What’s the right line height for every text size on your scale? Fran Pérez’s [Good Line-Height calculator](https://thegoodlineheight.com/) does the maths for you.

![Calculate the perfect line height for your baseline grid. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/11e08b27-cf30-4f4e-bc03-5853edea2407/good-line-height-opt.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/11e08b27-cf30-4f4e-bc03-5853edea2407/good-line-height-opt.png)

To calculate the results, you only need to enter three parameters: font size, multiplier, and grid row height. Font size is the key to ensure your text sits nicely on the baseline grid, no matter the text size, the multiplier gives you control over the distance between lines, and grid row height defines the height of each row in your baseline grid.

---

## Fluid Heading Generator

Thanks to `clamp()`, you can set a font size that grows with the viewport but doesn’t go below or above the minimum and maximum font size that you define. To help you find the perfect CSS values for your fluid heading and control how it scales across different viewports, Erik André Jakobsen built the [<VPIcon icon="fas fa-globe"/>Fluid Typography](https://fluid-typography.netlify.app/) tool.

![Calculate a `clamp()` rule to make your headings fluid. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8181cf45-8438-4f48-abb4-66631a15dd81/fluid-typography-opt.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8181cf45-8438-4f48-abb4-66631a15dd81/fluid-typography-opt.png)

You enter the minimum and maximum font size as well as the minimum and maximum viewport width, and the tool calculates not only the `clamp()` rule for you but also shows you a demo of what the specifications look like when applied to an actual heading.

Another helpful generator to help you figure out the `clamp()` rule for your project comes from Maxime Roudier. It works similarly to Erik’s tool but also lets you select a font family and a range that you adjust with a slider instead of entering concrete minimum and maximum values.

---

## CSS Capsize Generator

To minimize disorienting and expensive layout shifts during loading, we need to match the fallback font against the web font. Monica Dinculescu’s [<VPIcon icon="fas fa-globe"/>font-style-matcher](https://meowni.ca/font-style-matcher/) allows us to minimize the jarring shift by matching the fallback font and the intended webfont’s x-heights and widths and we could make use of [<VPIcon icon="fas fa-globe"/>f-mods](https://simonhearne.com/2021/layout-shifts-webfonts/) to do the same thing with new CSS properties.

![A little tool that adjusts the font-size, so that the height of capital letters is a multiple of your grid. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b66dd29c-4998-47b4-a8fa-aa4c3a114ae6/12-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b66dd29c-4998-47b4-a8fa-aa4c3a114ae6/12-css-generators.png)

By default, many fonts come with pre-defined margins and leadings, so if a fallback font and a web font are different, the entire layout will change significantly. [<VPIcon icon="fas fa-globe"/>Capsize](https://seek-oss.github.io/capsize/) adjusts the font-size, so that the height of capital letters is a multiple of your grid. It does so by trimming the space above capital letters and below the baseline. So by keeping the same line-height in a fallback font and a web font, the tool generates “magic numbers” to make sure that the switch is seamless.

---

## CSS Complex Selectors Generator

Imagine that you need to create a table of items. You might want to keep them on the same row if there are 3 or fewer items, but then spanning two full lines for 6 and 8 items, while being just a list of cards with 10 items and more. How would you build it? While many of these situations can be fixed with CSS Grid and Flexbox, sometimes you might end up with a quite complex situation which would need a quite complex CSS selector.

![For building complex selectors that heavily rely on the exact number of children or siblings in a container. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e94e9f0d-2808-4e40-ae62-50d4d23ee991/13-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e94e9f0d-2808-4e40-ae62-50d4d23ee991/13-css-generators.png)

For this purpose, Drew Minns has built a generator for [<VPIcon icon="fas fa-globe"/>Quantity Selectors](https://quantityqueries.com/) — complex CSS selectors that allow styles to be applied to elements based on the number of siblings. For example, when you want to apply styles to all elements when there are **at least** 5 items and siblings, or at most 10, or perhaps between 3 to 5 items.

The final selector might not be easy to understand though, so it’s worth making sure that you provide a proper explanation in the code of what it’s supposed to target.

---

## CSS `clip-path` Generator

Thanks to the `clip-path` property, we can create [complex shapes in CSS (<VPIcon icon="fa-brands fa-x-twitter"/>`mikaelainalem`)](https://x.com/mikaelainalem/status/1358492344602025985) by clipping an element to a basic shape, be it a simple circle, a fancy polygon, or even an SVG source. The CSS `clip-path` maker [<VPIcon icon="fas fa-globe"/>Clippy](https://bennettfeely.com/clippy/) is a visual tool that helps you **create and customize clip-paths** right in your browser.

![Clip-path generator for complex shapes in CSS. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1eeb51d6-4a17-4774-ac1c-fbfe6def32cb/14-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/1eeb51d6-4a17-4774-ac1c-fbfe6def32cb/14-css-generators.png)

To start off, you select a shape and a demo background from Clippy’s menu. You can then drag the shape’s points to create any shape you like — the color-coded CSS will not only reflect your changes instantly but also highlight them to help you understand how your choices influence the code.

If the whole `clip-path` thing still feels a bit abstract to you or if you’re looking for a cool example of how to use it in an actual project, be sure to check out the [pop-out effect (<VPIcon icon="fa-brands fa-codepen" />`ainalem`)](https://codepen.io/ainalem/pen/QWGNzYm) that Mikael Ainalem created with `clip-path`.

---

## CSS Grid Layout Generator

CSS Grid Layout can be [**quite straightforward**](/smashingmagazine.com/understanding-css-grid-lines.md), but sometimes you might want to play with the Grid properties to figure out what just the right behavior would be for your layout. To get started, we can use Sarah Drasner’s [<VPIcon icon="fas fa-globe"/>CSS Grid Generator](https://cssgrid-generator.netlify.app/), Drew Minns’ [<VPIcon icon="fas fa-globe"/>Griddy](https://griddy.io/), Ali Alaa’s [<VPIcon icon="fas fa-globe"/>CSS Grid Cheat Sheet Generator](https://alialaa.github.io/css-grid-cheat-sheet/) and LenioLabs’ [<VPIcon icon="fas fa-globe"/>LayoutIt](https://grid.layoutit.com/) — they all allow you to define the grid and containers on the grid, as well as gaps, and it generates the CSS right away. If you need more guidance around Flexbox, [<VPIcon icon="fas fa-globe"/>Flexbox Patterns](https://flexboxpatterns.com/) contains plenty of examples to play with.

![CSS Grid Layout generator: a great little tool to experiment with your CSS Grid Layout. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7c43d0fd-5a77-49db-a031-4f2f7cafe81d/15-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7c43d0fd-5a77-49db-a031-4f2f7cafe81d/15-css-generators.png)

Or you could use single line of CSS solutions. Una Kravets has built [<VPIcon icon="fas fa-globe"/>1-Line Layouts](https://1linelayouts.glitch.me/), a collection of ten modern CSS layout and sizing techniques. Starting out with the biggest mystery of all (centering) and covering everything from the **classic Holy Grail Layout** and the “Deconstructed Pancake” to applying `clamp()` and respecting aspect ratio, Una’s collection is full of little tidbits that are bound to make your life as a developer easier.

Each technique comes with a demo, a CodePen to tinker with, and information on browser support. Una also recorded a **video** in which she explains every one-line wonder in greater detail. No matter if you’re a beginner or a pro, this resource will sure come in handy.

---

## CSS Compound Grids Generator

[Compound grids](https://smashingmagazine.com/2019/07/inspired-design-decisions-pressing-matters/) offer enormous flexibility and a lot of room for creativity. Made up of two or more grids of any type (column, modular, symmetrical, and asymmetrical) on one page, they can occupy separate areas or overlap.

![Compound Grid Generator ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/52c2464c-e8ed-4291-a06f-e9b95497b1b7/16-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/52c2464c-e8ed-4291-a06f-e9b95497b1b7/16-css-generators.png)

A little tool to help you generate compound grids and save time drawing endless variations now comes from Michelle Barker: the [compound grid generator (<VPIcon icon="fa-brands fa-codepen"/>`michellebarker`)](https://codepen.io/michellebarker/full/zYOMYWv). All you need to do is enter the number of columns for each of your grids, and they’ll be merged into a compound grid. A great addition to your digital toolbox. And if you need to create a modular grid, multicolumn grid or manuscript grid for your print project, [<VPIcon icon="fas fa-globe"/>Modular Grid Calculator](https://layoutgridcalculator.com/online/) provides a thorough explanation on achieve it in InDesign.

---

## CSS Filters and Blend Modes Generator

The CSS `drop-shadow` filter has excellent support but is rather underrated — a real shame given the fact that it could save you a lot of time hacking around with `box-shadow`.

![Box-shadow vs. drop-shadow ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/dfe67708-fdba-49a3-9ce2-ddb20c92d600/17-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/dfe67708-fdba-49a3-9ce2-ddb20c92d600/17-css-generators.png)

As Michelle Barker explains in a [**blog post**](/css-irl.info/drop-shadow-the-underrated-css-filter.md), `drop-shadow` lets you use values for x-offset, y-offset, blur radius, and color — just like its more prominent sibling `box-shadow`. However, there’s one big advantage: the shadow does not correspond to the bounding box of an element (which is often where the hacking begins when using `box-shadow`) but to the non-transparent parts of an image. Perfect if you want to apply a drop shadow to a transparent PNG or SVG logo, for example, or even a clipped shape.

There are [**plenty of CSS filters**](/css-tricks.com/almanac-properties/filter.md) out there, so if you need to find just the right set of filters for your project, Mads Stoumann’s [CSS Filter Editor (<VPIcon icon="fa-brands fa-codepen" />`stoumann`)](https://codepen.io/stoumann/pen/MWeNmyb) for testing out all **supported filters**, along with some presents that Mads has provided as well. Obviously, the CSS is generated on the fly as well.

Beyond filters, there are also plenty of options for [**CSS blend modes**](/css-tricks.com/basics-css-blend-modes.md). If you’d like to preview how some of the visual effects could work together, you can use Rick Metzger’s [<VPIcon icon="fas fa-globe"/>CSS Duotone Generator](https://cssduotone.com/). The tool includes options for zooming, spacing, blur and image opacity, but also all blend modes for foreground and background images. Of course, the tool also generates HTML and CSS.

---

## Blurred Image Placeholders Generator

An image placeholder is an efficient way to improve a site’s perceived performance when an image is loading. On his quest to find the fastest and best-looking image placholders for the web, Joe Bell decided to come up with a solution himself. The result: [<VPIcon icon="fas fa-globe"/>Plaiceholder](https://plaiceholder.co/).

![A generator of blurred image placeholders. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f05aea7c-a0b2-4193-93f9-5dbde46ea3ff/18-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f05aea7c-a0b2-4193-93f9-5dbde46ea3ff/18-css-generators.png)

Powered by a collection of Node.js helpers, Plaiceholder turns your images into lightweight, blurred placeholder images. There are several approaches to choose from: CSS (which is recommended), SVG, Base 64, [<VPIcon icon="fas fa-globe"/>Blurhash](https://blurha.sh/), and the experimental Blurhash to CSS.

---

## Hero Generator

Are you tired of implementing the same hero over and over again? Sarah Drasner’s [<VPIcon icon="fas fa-globe"/>Hero Generator](https://hero-generator.netlify.app/) is here to help. It lets you generate responsive heros with just a few clicks, based on your preferences.

![Generate heros with ease. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/39a034f5-4c05-47d2-bf66-ba4a31bbe15d/hero-generator-opt.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/39a034f5-4c05-47d2-bf66-ba4a31bbe15d/hero-generator-opt.png)

You decide what kind of gradient you’d like to apply to your hero image, the gradient reduction, and title spacing. And if you wish to include a button, the generator has got you covered, too, with options to customize the button’s colors (including hover and gradient color) and button radius. Once you’re happy with the result, you can copy and paste the code and use it in your project right away. A real timesaver!

---

## Image Maps Generator

Image maps let you create clickable areas on an image. If you’d like to create an image map but don’t want to fiddle with coordinates to define the clickable regions, imagemaps.net is here to help.

![Create annotated, interactive images. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0fbc931e-c47f-4ccb-80cd-1905368e508f/imagemaps-opt.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0fbc931e-c47f-4ccb-80cd-1905368e508f/imagemaps-opt.png)

The site features a graphical user interface to make the process more straightforward. Once you’ve uploaded your image, you can use the Pen, Rectangle, and Polygon tools to draw your clickable regions. To customize them and, most importantly, give them their functionality, you can then name each region, assign a link to it, and adjust its color, height and width. A click on the “Export” button provides you with the HTML map and React code that you can copy and paste into your project.

---

## CSS Animations Generator

It’s quite easy to tell a difference between an animation that seems to be a bit off, and an animation that is done just well. But adjusting the keyframes animations or transitions manually can be quite time-consuming. [<VPIcon icon="fas fa-globe"/>Animista](https://animista.net/) provides a **library of animations and transitions** that you can use out of the box. There are plenty of presets for entrances and exits, text highlights, button actions and background effects. Once you’ve defined an animation you can copy-paste the CSS snippet of the animation, along with the code generated by Autoprefixer.

![A comprehensive library of animations and transitions. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4fe272ca-8cbc-41ec-9b35-9076f70a98ad/19-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4fe272ca-8cbc-41ec-9b35-9076f70a98ad/19-css-generators.png)

[<VPIcon icon="fas fa-globe"/>CSS Wand](https://csswand.dev/) provides **hover and loading animations**, but you can also use [Ladda animations (<VPIcon icon="iconfont icon-github"/>`hakimel/Ladda`)](https://github.com/hakimel/Ladda) (buttons with built-in loading indicators) and [<VPIcon icon="fas fa-globe"/>Eric Spinners](https://epic-spinners.epicmax.co/) (with Vue.js integration). And perhaps you’d like to add a whimsical twist on hover transitions with [<VPIcon icon="fas fa-globe"/>Boop!](https://joshwcomeau.com/react/boop/) — just keep in mind to [<VPIcon icon="fas fa-globe"/>scale with pseudo-elements](https://joshwcomeau.com/snippets/html/scale-with-pseudoelements/) and respect motion preferences for users who opt-in for reduced motion.

---

## 3D CSS Cuboid Generator

[Jhey Tompkins (<VPIcon icon="fa-brands fa-x-twitter"/>`jh3yy`)](https://twitter.com/jh3yy/) is known for his fun 3D CSS creations. Maybe you’ve already seen his [helicopter (<VPIcon icon="fa-brands fa-codepen" />`jh3y`)](https://codepen.io/jh3y/pen/WNRjxjP) that magically shifts as you move the mouse? The basis for the helicopter and other experiments like these are responsive CSS cuboids that are controllable with scoped CSS custom properties.

![A generator to create animated 3D cuboids with ease. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b999788b-8fc5-4c63-be77-b5738b1b4175/3d-cuboid-generator-opt.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/b999788b-8fc5-4c63-be77-b5738b1b4175/3d-cuboid-generator-opt.png)

<CodePen
  user="jh3y"
  slug-hash="MWJdqBo"
  title="CSS Cuboid Generator w/ React && Prism 😎"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, if you want to bring your 3D ideas to life, too, Jhey’s [3D CSS Cuboid Generator (<VPIcon icon="fa-brands fa-codepen" />`jh3y`)](https://codepen.io/jh3y/pen/MWJdqBo) is here to help. Just adjust the sliders to determine height, width, depth, and hue of your cuboid, and you’ve already got the code you need to get things rolling, twisting, sliding, or whatever else you’re planning. Have fun!

---

## CSS Doodles Generator

We can bring the most sophisticated layouts to life with CSS, but we can also generate playful artworks and doodles. Yuan Chuan has built , a web component for **drawing patterns with CSS**. The component includes plenty of utility functions and shorthand properties to play with. As a result, the component generates a grid of `div`s along with the plain CSS. The source code is also [available on GitHub (<VPIcon icon="iconfont icon-github"/>`css-doodle/css-doodle`)](https://github.com/css-doodle/css-doodle).

![Drawing doodles with CSS? Sure thing, thanks to Yuan Chuan. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6c7c8607-7e04-4007-bd6b-6c1325492500/21-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/6c7c8607-7e04-4007-bd6b-6c1325492500/21-css-generators.png)

---

## Useful Little Web Dev Helpers

If you need a few more tools in your life, luckily, there are a lot of good ’ol web developers collecting their favorite **useful tools all in one place** named [<VPIcon icon="fas fa-globe"/>Tiny Helpers](https://tiny-helpers.dev/). Maintained by Stefan Judis, you’re sure to find all sorts of tools: from APIs, accessibility and color, to fonts, performance, regular expressions, SVG, and Unicode.

![A growing repository of friendly and tiny helpers for web developers. ([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a70059a2-74cd-4cf6-a8a5-701e777154b2/20-css-generators.png))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a70059a2-74cd-4cf6-a8a5-701e777154b2/20-css-generators.png)

Of course, there are many more shared on other platforms, such as the very useful [Twitter thread by Josh W. Comeau (<VPIcon icon="fa-brands fa-x-twitter"/>`JoshWComeau`)](https://x.com/JoshWComeau/status/1212416797254832130) but also by [Stefan Judis (<VPIcon icon="fa-brands fa-x-twitter"/>`stefanjudis`)](https://x.com/stefanjudis/status/1216788482972168193) himself. Whatever it is that you’ve been eager to find that will help you get work done better and faster, you’re bound to find it there!

---

## Wrapping Up

There are *literally* [<VPIcon icon="fas fa-globe"/>hundreds](https://uitest.com/) of resources out there, and we hope that some of the ones listed here will prove to be useful in your day-to-day work — and most importantly help you avoid some time-consuming, routine tasks. Happy generating!

::: info More On CSS

```component VPCard
{
  "title": "CSS Auditing Tools",
  "desc": "Ideally, a CSS auditing tool would provide some insights about how heavily CSS implact rendering performance, and which operations lead to expensive layout recalculations. It could also highlight what properties don’t affect the rendering at all (like Firefox DevTools does it), and perhaps even suggest how to write slightly more efficient CSS selectors. In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers to get their work done better and faster. Starting out with a few tools for getting to the bottom of CSS.",
  "link": "/smashingmagazine.com/css-auditing-tools.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

```component VPCard
{
  "title": "Things You Can Do With CSS Today",
  "desc": "The present and future of CSS are very bright indeed and if you take a pragmatic, progressive approach to your CSS, then things will continue to get better and better on your projects, too. Some of the really handy powers CSS gives you might have slipped you by, so in this article, Andy Bell will take a look into masonry layout, :is selector, clamp(), ch and ex units, updated text decoration, and a few other useful CSS properties. ",
  "link": "/smashingmagazine.com/things-you-can-do-with-css-today.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Useful DevTools Tips and Shortcuts**](/smashingmagazine.com/useful-chrome-firefox-devtools-tips-shortcuts.md)

:::

::: info Further Reading

- [**Building The SSG I’ve Always Wanted: An 11ty, Vite And JAM Sandwich**](/smashingmagazine.com/building-ssg-11ty-vite-jam-sandwich.md)

```component VPCard
{
  "title": "Modern CSS Layouts: You Might Not Need A Framework For That",
  "desc": "It’s easy to get lost in a sea of CSS frameworks and libraries, each promising easier styling and smoother layouts. Brecht De Ruyte demonstrates four CSS utility classes (plus a bonus) using techniques that allow them to be used practically anywhere you need a particular layout — be it Grid or Flexbox — with configurable options.",
  "link": "/smashingmagazine.com/modern-css-layouts-no-framework-needed.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**Best Of Pro Scheduler Libraries**](/smashingmagazine.com/best-pro-scheduler-libraries.md)
- [**Sustainable Design Toolkits And Frameworks**](/smashingmagazine.com/sustainable-design-toolkits-and-resources.md)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Generators",
  "desc": "In a new short series of posts, we highlight some of the useful tools and techniques for developers and designers. This time Iris Lješnjanin brings you CSS Generators: from CSS shadows to easing gradients to CSS overlays to CSS doodles.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/css-generators.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
