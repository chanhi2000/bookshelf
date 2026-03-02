---
lang: en-US
title: "More Meaningful Typography"
description: "Article(s) > More Meaningful Typography"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Design
  - System
  - Article(s)
tag:
  - blog
  - alistapart.com
  - css
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > More Meaningful Typography"
    - property: og:description
      content: "More Meaningful Typography"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alistapart.com/more-meaningful-typography.html
prev: /programming/css/articles/README.md
date: 2011-05-03
isOriginal: false
author:
  - name: Tim Brown
    url: https://alistapart.com/author/timbrown/
cover: https://i0.wp.com/alistapart.com/wp-content/uploads/2013/01/ALA327_modularscales_300.png?fit=1200%2C563&ssl=1
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="More Meaningful Typography"
  desc="Designing with modular scales is one way to make more conscious, meaningful choices about measurement on the web. Modular scales work with—not against—responsive design and grids, provi…"
  url="https://alistapart.com/article/more-meaningful-typography/"
  logo="https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1"
  preview="https://i0.wp.com/alistapart.com/wp-content/uploads/2013/01/ALA327_modularscales_300.png?fit=1200%2C563&ssl=1"/>

We have all heard of the golden mean (also known as the [<VPIcon icon="fa-brands fa-wikipedia"/>golden ratio](https://en.wikipedia.org/wiki/Golden_ratio) or golden section): the self-replicating page with a proportion of 1:1.618 that is said to be found in everything from the design of ancient Greek architecture to the growth patterns of plants.

This and other meaningful ratios rooted in geometry, music, nature, and history can be expressed as modular scales and put to work on the web.

![Fig 1: A simple modular scale: 10@1:1.618](https://i0.wp.com/alistapart.com/wp-content/uploads/2012/07/scale.png?w=960&ssl=1)

![Fig 2: Our example page, designed using a modular scale.](https://i0.wp.com/alistapart.com/wp-content/uploads/2012/07/example-page-third.png?w=960&ssl=1)

A modular scale is a sequence of numbers that relate to one another in a meaningful way. Using the golden ratio, for example, we can produce values for a modular scale by multiplying by 1.618 to arrive at the next highest number, or dividing by 1.618 to arrive at the next number down.

By using culturally relevant, historically pleasing ratios to create modular scales and basing the measurements in our compositions on values from those scales, we can achieve a visual harmony not found in layouts that use arbitrary, conventional, or easily divisible numbers.

Let’s start by looking at what modular scales are, and how they apply to web design. Next, we’ll dive into [<VPIcon icon="fas fa-globe"/>this example](http://nicewebtype.com/fonts/minion-with-myriad-condensed) and go over my reasons for starting with certain numbers, choosing particular proportions, and and applying my scale’s numbers to specific CSS measurements. Finally, we’ll think about how designing with modular scales fits into current workflows, and where we might go from here.

---

## Modular scales and how they apply to web design

> A modular scale, like a musical scale, is a prearranged set of harmonious proportions.
>
> —Robert Bringhurst

Making a modular scale is easy. You start with a ratio (for example, 1:1.618) and a number (like 10), then multiply and divide to get many resonant numbers:

- $10.000\times{1.618}=16.180$
- $16.180\times{1.618}=26.179$
- $26.179\times{1.618}=42.358$
- $42.358\times{\text{etc}}$

- $\tfrac{10.000}{1.618}=6.180$
- $\tfrac{6.180}{1.618}=3.819$
- $\tfrac{3.819}{1.618}=2.360$
- $2.360\times{\text{etc}}$

I made a [<VPIcon icon="fas fa-globe"/>calculator](http://modularscale.com) to help us do this math. It has options for creating double-stranded modular scales like the one below, which require at least two starting ratios or two starting numbers to generate what amounts to two separate modular scales mashed together in sequence. Double-stranded scales tend to provide more measurement options (they include more numbers, and usually fill one another’s gaps).

![Fig 3: A double-stranded modular scale: 10@1:1.618, 20@1:1.618](https://i0.wp.com/alistapart.com/wp-content/uploads/2012/07/double-stranded-scale.png?w=960&ssl=1)

Using a modular scale on the web means choosing numbers from the scale for type sizes, line height, line length, margins, column widths, and more. So it makes sense that modular scales are most effective when the inputs—the starting ratios and starting numbers that beget the entire scale—are meaningful to a project’s design, content, or both.

One way to ensure this effectiveness is to start with type. By choosing a text face at the beginning of a project—before making decisions about layout or typesetting—we can use the size at which body text looks most crisp as the basis for a project’s modular scale. If 16px Adobe Caslon is readable and renders well, we’ll multiply and divide from 16 to create our scale. Thus, an entire system of harmonious measurement can be grounded in a visual decision—body text size—that designers routinely make with confidence, and that resonates throughout the experience.

But of course, this starting number is only one element in a multi-stranded modular scale. In the next section, as we look at our example in detail, I’ll explain not only how I chose a starting type size, but also how I decided on a ratio and a second “important” number for this project’s modular scale.

---

## Creating a modular scale for web design

Our example began as an exploration in pairing [<VPIcon icon="fas fa-globe"/>Minion](http://typekit.com/fonts/minion-pro) with [<VPIcon icon="fas fa-globe"/>Myriad Condensed](http://typekit.com/fonts/myriad-pro-condensed), so my typeface choices were established. I had a text ready (a few thoughts on typesetting I’d been meaning to share), and I made a [<VPIcon icon="fas fa-globe"/>quick sketch](http://nicewebtype.com/fonts/minion-with-myriad-condensed/sketch.jpg) to plan the composition. In a nutshell, I had the ingredients for web typesetting. Now, for the recipe.

Minion was to be my text face, so I looked carefully at its [<VPIcon icon="fas fa-globe"/>Web Font Specimen](http://webfontspecimen.com/) to find a size that would work for my design goals and look crisp. Sizing type on the web is tricky because of the limited resolution involved. One pixel of font-size up or down can [<VPIcon icon="fas fa-globe"/>completely change](http://blog.typekit.com/2011/01/26/css-properties-that-affect-type-rendering/) how a typeface—and thus a whole text—looks. But once I found the size I liked, `18px`, I had a number upon which to base my modular scale. Next, I needed a ratio.

I chose the golden mean (1:1.618). It is a beautiful proportion with historical and cultural connections that make sense for the typefaces I’ve chosen and the text I’m setting. Although it is a contemporary design, Minion draws upon Renaissance ideals, in everything from its humanist structure to the ways in which parts of letters reveal a history in pen and ink.

Page and textblock proportions in Renaissance works were based on the golden mean, too, and because the subject of my text is about the craft of typesetting and looking to tradition for guidance, it made sense to use a proportion meaningful to our typographic roots.

Next, I took my text size (18) and ratio (1:1.618) and plugged them into the calculator at [<VPIcon icon="fas fa-globe"/>modularscale.com](http://modularscale.com). I also decided to include a second, “important” number, because I wanted the flexibility of a double-stranded modular scale.

I’ve found that a variety of things can serve as an important number. The size at which caption text looks best, for instance, or a large number like the width of a piece of media—if the project at hand mandates ads or embedded videos, for instance—ensures that something about those elements resonates with the layout as a whole.

To find my important number, I marked up the `h2` (“Typesetting”) and applied some basic styles according to my sketch. I knew I wanted this headline to be large and have enough presence to anchor the composition, but I didn’t want it to be overpowering. So I played with the text a bit, and the resulting font-size, `190px`, became my important number. Here’s the [<VPIcon icon="fas fa-globe"/>finished scale](http://modularscale.com/scale/?px1=18&px2=190&ra1=1.618).

Now let’s look at the CSS I wrote to apply this scale’s numbers to actual measurements in my composition.

---

## Applying a modular scale in web design

Having marked up my text, and with my scale at my side, I applied CSS rules to our example,  grabbing an exact number from my scale for each decision. Throughout the process, I made educated guesses that built a harmonious composition, one measurement at a time.

Let’s walk through the CSS. The declarations below have been streamlined so we can study modular scale math more easily; these rules all appear in the [<VPIcon icon="fas fa-globe"/>full CSS](http://nicewebtype.com/fonts/minion-with-myriad-condensed/css/style.css), but are organized differently (for reasons I explain at the end of this section).

```css
/* -----------------------------------------------
Typesetting for ALA
Author:   Tim Brown
Date:     21 Apr 2011http://modularscale.com/scale/?px1=18&px2=190&ra1=1.618
18px @ 1:1.618
190px @ 1:1.618http://alistapart.com/articles/more-meaningful-typography/
----------------------------------------------- */
```

The first thing you’ll notice is a comment up top, where I’ve left a note about my scale. This serves two purposes: first, it lets people know I’m using a modular scale; and second, it provides a means of recreating the scale, so that my decisions can be studied and my measurements can be accurately changed and built upon. Just visit the URL to see the exact modular scale I used while working.

```css
body {
  font-family: "Minion-Pro-1", "Minion-Pro-2";
  font-size: 18px; /* Scale origin */
}
```

Here I applied a base font-size (the text size from which my scale originated) to the body element.

```css
.main {
  float: right;
  width: 497.406px;
}p {
  margin: 1em 0;
  line-height: 1.54;
}
```

Next I chose a number from my scale for the width of the main column of text. I often think of this as my paragraphs’ *measure* (another term for line length), rather than width. Years ago, when designers sent written instructions to typesetters, their shorthand went something like this: size/leading — measure. Today, CSS font property shorthand reflects only two-thirds of that traditional notation; yet, measure is still critical to achieving a balanced text block.

So, having previously determined my font size, I tried many different numbers for measure and line-height before settling on 497.406 pixels and 1.54, respectively.

For me, balancing a text block always involves lots of trial and error. I alternate between CSS editor and browser, checking to see how each value looks. I keep an eye on the overall density of my paragraphs ([<VPIcon icon="fas fa-globe"/>typographic color](http://typesites.com/typographica/)) and the readability of the text as a whole. I am especially wary of line spacing that feels too tight or too loose. Tight line spacing is extremely distracting to readers, pulling their attention to pieces of text above and below the line they’re trying to read. Loose line spacing is wasteful, ugly, and dilutes negative space such that margins and pauses elsewhere in a composition are less effective.

```css
body {
  font-family: "Minion-Pro-1", "Minion-Pro-2";
  font-size: 18px; /* Scale origin */
  color: #031634;
}
```

Continuing to think about a balanced text block, I tried a few different colors for my text. Silly as it may sound, color can have an effect on how smooth the text looks: pixels are made of color, so [<VPIcon icon="fas fa-globe"/>color can change type rendering](http://blog.typekit.com/2011/01/26/css-properties-that-affect-type-rendering/). I decided on a dark blue to keep the contrast high—useful for getting the most fidelity out of Minion’s details, especially because the background color isn’t bright white.

```css
h1, h2, h3, p.intro { 
  text-rendering: optimizeLegibility; 
}
```

Next, I worked on the headings. The first thing usually I do with headings is apply [<VPIcon icon="iconfont icon-w3c"/>text-rendering: optimizeLegibility](https://w3.org/TR/SVG11/painting.html#TextRenderingProperty). In Firefox 3, Safari 5+, and Chrome 4+, this property-value pair enables a font’s native kerning instructions, which means that letters will be spaced exactly as the type designer intended. Use this with care: `optimizeLegibility` may have performance drawbacks, but I’ve found them to be negligible. Your mileage may vary.

```css
h2 {
  margin-left: 20px; /* Optical alignment of T stem to left edge of »
  .side */ 
  font-family: "Myriad-Pro-Condensed-1", "Myriad-Pro-Condensed-2";
  font-size: 190px; /* Scale origin */
  line-height: 1;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: -2px;
  color: #033649;
}
```

As you’ll recall, the font-size of my `h2` (`190px`) was one of the starting values on which my modular scale is based. Setting the text in all caps strengthens and helps anchor the composition, and because it’s so large I tightened up the letter-spacing (note: this is different than kerning, because all letters are tightened or loosened at the same time, in the same way). The left margin was added later, to align the stem of the “T” with the left edge of my sidebar; this value does not come from my scale, but rather emerged from the lay of the letterforms as I worked. It’s okay to improvise, as we’ll discuss below.

’Typesetting’ uses the semibold weight of Myriad Pro Condensed (`font-weight: 600`). I tried other weights, but this one felt best. I chose a dark blue for the color, then decided to use different colors for individual letters with [<VPIcon icon="fas fa-globe"/>Lettering.js](http://letteringjs.com/).

```css
h1 {
  margin: 44.856px 0 0 307.420px;
  font-size: 29.124px;
  line-height: 1;
  font-weight: 300;
  font-style: italic;
}
```

The `h1`, “Markup & Style,” is sized and spaced using numbers from my scale. Again, I tried a few different numbers before landing on the right one. While my first instinct was to `center-align` this heading, I found the off-center placement more engaging.

```css
.group {
  width: 845.479px;
  margin: 0 auto 18px;
}.side {
  float: right;
  width: 274px; /* horizontal photos in this col are 190px high » uncropped */
  margin: 27.723px 29.124px 0 0;
}
```

Before tackling sidebar specifics, I worked out my container, floats, and clearfix.

I sought a number from the scale for the width of my container, `.group`, making sure it was wide enough for my `h2` to fit, and then I chose a width for my sidebar. After trying a few different numbers from the scale, I wasn’t happy with the way things looked. `199.603px` was too narrow, and `307.420px` was too wide.

So I went about it a different way: I resized the image of my notebook and pen, trying various numbers from the scale for its height. At `190px` tall (a number from which my scale originated) and `274px` wide, this key visual in my sidebar seemed to resonate in the composition—and that size gave me a column width (`274px`) that looked great.

```css{3}
.side p {
  font-family: "Minion-Pro-Caption-1", "Minion-Pro-Caption-2";
  font-size: 15px; /* Improvisation! It's okay! */
  line-height: 1.54;
}
```

I wanted the type in my sidebar to be smaller than that of the main text, for two reasons: I wanted it to recede visually because it’s less important than the main text, and I wanted to make sure I could set lines of a comfortable length. Having predefined a fairly narrow measure by basing my column width on the dimensions of my image, I had to make the font-size a bit smaller to get more characters per line. The big question was, how much smaller?

After trying a few numbers from my scale for sidebar font-size and not liking the results, I remembered that Minion Pro has an optical version made for smaller sizes, called Caption. [<VPIcon icon="fas fa-globe"/>Minion Pro Caption](http://typekit.com/fonts/minion-pro-caption) is slightly beefier than normal Minion Pro, so it was exactly what I needed. I kept trying different font-size values to find one I liked, and ended up improvising. The number 15 isn’t in my modular scale, but `15px` Minion Pro Caption sure looks good next to `18px` Minion Pro.

That’s right, I improvised.

Modular scales are a tool, they’re not magic. They’re not going to work for every measurement, and that’s okay. Math is no substitute for an experienced designer’s eye, but it can provide both hints and constraints for decision making. Consider the scale’s numbers educated suggestions. Round them if you like (22.162 becomes 22). Combine them (3.56 + 16 = 19.56). Or as we saw me do here, break from the scale entirely.

```css
/* Intro ----------------------------------------------- */
/*p.intro {
  margin: 0.809em 0;
  font-size: 22.250px;
  line-height: 1.309;
}*/
p.intro {
  margin: 0.952em 1.54em 0.952em 0;
  font-size: 21.178px; /* 27.723 - 6.545 */
  line-height: 1.394; /* 1.54 - 0.146 */
}
```

The decisions I made in setting the two `p.intro` paragraphs are further evidence of improvisation, and also touch on what I’m calling “comment math,” something I feel is important for sharing our work with clarity and efficiency.

Here I had a whole set of measurements I liked (these are now commented out). But at some point, I realized I had no idea where they came from. They’re not numbers from my scale. I suspect that one late night when I sat down to work on this (before the modular scale calculator made bookmarkable URLs), I plugged the wrong numbers into the calculator and kept on working. But it looked good! In the spirit of improvisation, I could have kept the numbers as they were. But I wanted to explain another technique I use.

To get numbers close to the ones I liked while still using the correct scale, I combined scale numbers. The font-size of these intro paragraphs, 21.178, is not from my scale; but, it’s the result of combining two numbers that are. Whenever I add or subtract to arrive at values that did not originate from my scale, I do some comment math. That helps me remember, and it helps other people see what I did.

One final thing of note: because I’ve based my layout on a modular scale derived partly from a specific size of a specific typeface, my measurements are not meaningful unless that typeface is used. So when my ideal fonts are not present, which can happen for any number of reasons (a slow connection, an old browser/OS, a user preference that disables web fonts, etc.), generic fonts—*and generic measurements* take over. In fact, for the sake of progressive enhancement, I specify baseline fonts and generic measurements first, followed by preferred fonts and ideal, scale-based measurements. View our example’s stylesheet in full for the details. You can read more about this technique in [<VPIcon icon="fas fa-globe"/>this series of articles](http://blog.typekit.com/category/font-events/) by Sean McBride. (Also note: I arrived at these particular baseline fonts with help from Josh Brewer’s [<VPIcon icon="fas fa-globe"/>Ffffallback](http://ffffallback.com/).)

---

## Where does this fit with how we already work?

In some ways it’s different from how we already work, but it feels more natural. Going from content out, rather than canvas in, [<VPIcon icon="fas fa-globe"/>to paraphrase Mark Boulton](https://markboulton.co.uk/journal/comments/a-richer-canvas), is a more web native way of designing. Folks like Mr. Boulton, Andy Clarke, and Luke Wroblewski have for years prophesied an inversion in how we approach designing for the web, and now is the time to make it happen.

Using modular scales to build an experience outward from type can be a bit disorienting if you normally design websites (as I used to) by drawing boxes and filling them with content. The arbitrary dimensional choices I used to make had nothing to do with my intended designs’ underlying meaning. At best, I chose ballpark measurements in CSS, command-tabbed over to my browser, and eyeballed the results. If what I ended up with looked decent and the page was still functional, it was good enough for me.

Recognizing type as the atomic element in web design affords us the opportunity to make better design decisions that resonate upward and outward into the experience. But it also challenges us to eschew conventions like the use of prefabricated frameworks and reusable templates, and to accept a new balance in our schedules—that we put forth greater investment and effort for the sake of more meaningful typography.

Viewport sizes are good to know, but setting a composition’s width to one of these exact values and pouring in text is not ideal. Easily divisible numbers are only good for being easily divisible—fine for sketching—but as professionals we should aim higher. Let’s instead choose numbers because they fit, because they look good, and because they serve the meaning of the design.

Reset stylesheets like the one found in [<VPIcon icon="fas fa-globe"/>HTML5 Boilerplate](http://html5boilerplate.com) matter a lot when designing with modular scales. We need to make sure the mathematic decisions we’re making are reflected accurately in the browser, and as consistently as possible across different browsers.

In fact, many popular practices dovetail nicely with modular-scale-based measurement. Designing with modular scales does not preclude grid-based or responsive design. Smaller numbers from a scale can be used as a grid’s column width; or, a large number from a scale can be divided into columns (rounding the numbers first helps). When building toward a responsive design [<VPIcon icon="fas fa-globe"/>reference point](http://unstoppablerobotninja.com/entry/with-good-references)—a carefully measured layout for one particular setting—we can use numbers from a modular scale and then convert to percentages as we normally would.

---

## Conclusion

Designing with modular scales is one way to make more conscious, meaningful choices about measurement on the web. Modular scales work with—not against—responsive design and grids, provide a sensible alternative to basing our compositions on viewport limitations du jour, and help us achieve a visual harmony not found in compositions that use arbitrary, conventional, or easily divisible numbers.

As we’ve seen in this article, though, modular scales are tools—not dogma. The important thing for our readers, our craft, and our culture is that we take responsibility for our design decisions. Because in so doing, we’ll make better ones.

::: info Further Reading

- [<VPIcon icon="fa-brands fa-amazon"/>The Elements of Typographic Style](https://amazon.com/Elements-Typographic-Style-Robert-Bringhurst/dp/0881792063/): I cannot recommend highly enough Robert Bringhurst’s *The Elements of Typographic Style*—particularly the section called “Shaping the Page.” This is where I learned about the power of modular scales, how to build them, how they differ from grids, and how their flexibility can help us to strike a natural balance between typographic exactitude and educated improvisation.
- [<VPIcon icon="fa-brands fa-vimeo"/>More Perfect Typography](http://vimeo.com/17079380): Starting with type and using modular scales were the subjects of a half-hour talk I gave at Build in November of 2010. You can watch the whole talk online, if you like. It’s a good supplement to this article—more inspiration than information. I talk about Aldus Manutius, explain my method of evaluating type for body text, and share another [<VPIcon icon="fas fa-globe"/>layout](http://nicewebtype.com/fonts/ambroise-with-le-monde-sans/) like the example in this article.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "More Meaningful Typography",
  "desc": "Designing with modular scales is one way to make more conscious, meaningful choices about measurement on the web. Modular scales work with—not against—responsive design and grids, provi…",
  "link": "https://chanhi2000.github.io/bookshelf/alistapart.com/more-meaningful-typography.html",
  "logo": "https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1",
  "background": "rgba(34,34,34,0.2)"
}
```
