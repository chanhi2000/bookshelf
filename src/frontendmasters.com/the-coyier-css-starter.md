---
lang: en-US
title: "The Coyier CSS Starter"
description: "Article(s) > The Coyier CSS Starter"
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
      content: "Article(s) > The Coyier CSS Starter"
    - property: og:description
      content: "The Coyier CSS Starter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-coyier-css-starter.html
prev: /programming/css/articles/README.md
date: 2025-09-24
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7245
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
  name="The Coyier CSS Starter"
  desc="A fairly opinionated CSS starter by Chris, following a set of personal principals to guide what is in there and what isn't.  "
  url="https://frontendmasters.com/blog/the-coyier-css-starter/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7245"/>

I felt called out by Mike Mai’s *[<VPIcon icon="fas fa-globe"/>You are not a CSS dev if you have not made a CSS reset](https://mikemai.net/blog/2024/11/01/you-are-not-a-css-dev-if-you-have-not-made-a-css-reset.html).*

I hadn’t! I mean, I’ve used `* { box-sizing: border-box; }` a ton and, way back, I used to use that same universal selector to wipe away margins and padding, which was the inspiration behind the [<VPIcon icon="iconfont icon-css-tricks"/>CSS-Tricks](https://css-tricks.com/) logo, believe it or not.

But I never made or published anything and planted a stake in the ground and said *“This one. This one is mine.”*

So I’m going to do that.

First, I think it’s important to lay some ground rules. Some principles, really. There are a lot of directions a thing like this can go, and without what it’s for (and not for) it’s fairly useless.

---

## Principles

1. **This is for me.** The styles in here are useful to me. They are things I find myself doing very often (or forgetting to do.) I’d like to be using this in *most* demos I make and dipping into it for any future project. I do hope y’all will find some value in it too of course, hence blogging about it, but as a guiding principal it’s for me.
2. **This is not a *reset*, it’s an opinionated *starter*.** I’m not trying to wipe out *all* existing styles from user-agent stylesheets. I wipe out the ones that are useful for me to remove. It’s more about *adding* useful styles, *improving* UX broadly, and *fixing* common issues.
3. **Use only logical properties.** It’s a [**net gain**](/frontendmasters.com/should-we-never-use-non-logical-properties.md).
4. **Don’t use `--custom-properties`.** Setting those up is a step too far for this starter. Use [<VPIcon icon="fas fa-globe"/>Open Props](https://open-props.style/) for that sort of thing.
5. **Use `@layer`** [<VPIcon icon="fas fa-globe"/>because](https://mayank.co/blog/css-reset-layer/) “you’ll need to do it anyway if you ever want to use layers anywhere else.”
6. **Do accessibility things that are easy to forget about**, but nothing so niche it doesn’t come up for me often/ever.
7. **Don’t do too much.** None of this is strictly necessary so if it feels too weighty I’d probably find myself not using it. This whole thing is pointless if I don’t use it. [<VPIcon icon="fas fa-globe"/>Doing nothing](https://snook.ca/archives/html_and_css/still-no-css-reset) is totally an option, so if this doesn’t feel more useful than just [<VPIcon icon="fas fa-globe"/>defining styles as you go](https://aaadaaam.com/notes/useful-defaults/), it’s a fail.
8. **This isn’t a thing anybody is going to `npm install`**. It’s not versioned nor meant to be *always* used wholesale. Copying out useful bits is fine usage.
9. **This is a list of things I *almost* wish were the browser defaults** (i.e. in the user agent stylesheet) if I ruled the world and didn’t have to care about backwards compatibility.

---

## The Whole Thing

You can see it [on this Pen (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/0198772a-a759-7dc4-b8fc-1dfdbed39fdb), or [<VPIcon icon="fas fa-globe"/>directly as a file here](https://0198772a-a759-7dc4-b8fc-1dfdbed39fdb.codepenusercontent.com/style.css).

```css :collapsed-lines
@layer reset {
  html {
    color-scheme: light dark;
    font:
      clamp(1rem, 1rem + 0.5vw, 2rem) / 1.4 system-ui,
      sans-serif;
    tab-size: 2;
    hanging-punctuation: first allow-end last;
    word-break: break-word;
  }

  body {
    margin: 0;
    padding: 2rem;
    @media (width < 500px) {
      padding: 1rem;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1,
  h2 {
    font-weight: 900;
    letter-spacing: -0.02rem;
  }
  h1,
  h2,
  h3 {
    line-height: 1.1;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 /* FUTURE :heading */ {
    text-wrap: balance;
    margin-block-start: 0;
  }

  p,
  li,
  dd {
    text-wrap: pretty;
    max-inline-size: 88ch;
  }

  a {
    color: oklch(0.68 0.17 228);
    text-underline-offset: 2px;
    &:not(:is(:hover, :focus)) {
      text-decoration-color: color-mix(in srgb, currentColor, transparent 50%);
    }
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    inset-block-end: -0.25em;
  }
  sup {
    inset-block-start: -0.5em;
  }

  ul,
  ol,
  dl {
    margin: 0;
    padding: 0;
    list-style-position: inside;
    ul,
    ol,
    dl {
      padding-inline-start: 2ch;
    }
  }

  img,
  video,
  iframe {
    display: block;
    max-inline-size: 100%;
    block-size: auto;
    border-style: none;
  }

  figure {
    inline-size: fit-content;
    margin-inline: auto;
  }
  figcaption {
    contain: inline-size;
    font-size: 90%;
  }

  input,
  select,
  textarea,
  button {
    font: inherit;
    /* FUTURE: appearance: base; */
  }
  label {
    display: block;
  }
  input:not(
    :where(
      [type="submit"],
      [type="checkbox"],
      [type="radio"],
      [type="button"],
      [type="reset"]
    )
  ) {
    inline-size: 100%;
  }
  button,
  input:where(
    [type="submit"],
    [type="reset"],
    [type="button"]
  ) {
    background: CanvasText;
    color: Canvas;
    border: 1px solid transparent;
  }
  textarea {
    field-sizing: content;
    min-block-size: 5lh;
    inline-size: 100%;
    max-inline-size: 100%;
  }

  pre,
  code,
  kbd,
  samp {
    font-family: ui-monospace, SFMono-Regular, monospace;
  }

  svg {
    fill: currentColor;
  }

  [aria-disabled="true" i],
  [disabled] {
    cursor: not-allowed;
  }
  [hidden] {
    display: none !important;
  }
  [disabled],
  label:has(input[disabled]) {
    opacity: 0.5;

    [disabled] {
      opacity: 1;
    }
  }

  pre {
    white-space: pre-wrap;
    background: CanvasText;
    color: Canvas;
    padding: 1.5rem;
  }

  hr {
    border-style: solid;
    border-width: 1px 0 0;
    color: inherit;
    height: 0;
    overflow: visible;
    margin-block: 2.5rem;
  }

  :target {
    scroll-margin: 3rlh;
  }

  table {
    caption-side: bottom;
    border-collapse: collapse;
    td {
      font-size: 90%;
    }
    td,
    th {
      word-break: normal;
      border: 1px solid gray;
      padding: 0.5rem;
    }
  }
  [role="region"][aria-labelledby][tabindex] {
    overflow: auto;
  }
  caption {
    font-size: 90%;
  }

  .screenreader-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  :focus-visible {
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    @view-transition {
      navigation: auto;
    }
    
    html {
      interpolate-size: allow-keywords;
      &:focus-within {
        scroll-behavior: smooth;
      }
    }
  }
}
```

---

## Notes about the Choices

### Layering

```css
@layer reset {

}
```

There is no usage of `:where()` in here *just* to lower specificity. The usage of `:where()` is only to write selectors that are less repetitive and easier to read. Specificity is already bottomed out due to the `@layer`, and people who choose to use this can position the layer where they want to.

I was convinved this was a good idea from Mayank’s [<VPIcon icon="fas fa-globe"/>Your CSS reset should be layered.](https://mayank.co/blog/css-reset-layer/)

### Color Scheme

```css
html {
  color-scheme: light dark;
}
```

Putting `color-scheme: light dark;` in there is a relatively big choice, because it opts you into needing to deal with both themes for nearly all color/background-color usage. But that’s good. People like it when at least their operating system choice is honored. Just this basic thing alone buys dark-mode scrollbars and checkboxes and inputs and stuff, so it’s worth doing. Now `light-dark()` will work so implementing scheme-specific colors isn’t so bad.

### Clamped Root Font Size

```css
html {
  font: clamp(1rem, 1rem + 0.5dvw, 2rem) / 1.4 system-ui, sans-serif;
}
```

Controversial?! Maybe. But because `clamp(1rem, 1rem + 0.5dvw, 2rem)` involves relative units, it should still scale properly with users adjusting their base font size. I feel like setting a fluid font size here (and nowhere else) percolates pretty nicely throughout the document and feels like visually.

That’s a juiced up `line-height` and `system-ui` as the font which tends to look nice everywhere. Just this alone speeds up demo-making where I just can’t look at the default Times New Roman very long. Nothing against that typeface, it just makes demos look un-cared for.

### Tab Size

```css
html {
  tab-size: 2;
}
```

The fact that the default `tab-size` is 8 is whackadoo and needs to get tamped down. I get that taking advantage of wider screens can feel good but narrow screens are so much more common. Maybe I should use a `dvi` unit??

### Body Spacing

The body has an `8px` margin which is just awkward. I feel good about a more generous `2rem` padding kicking down to `1rem` at smaller screens. 500px is a heck of a magic number there, but feels generally right to me — it doesn’t *have* to sync up with other layout changes.

```css
body {
  margin: 0;
  padding: 2rem;
  @media (width < 500px) {
    padding: 1rem;
  }
}
```

### Box Sizing

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

The ultimate classic thing for a reset. When I don’t do it up-front, I very regularly find myself needing to circle back and add it. I originally went with the [**inheritance model**](/css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice.md), but Miriam [**convinced me not to**](/oddbird.net/box-model.md), basically by saying it “solves a problem that doesn’t really exist.”

### Hanging Punctuation

```css
html {
  hanging-punctuation: first allow-end last;
}
```

It’s just a little nicer looking so I’m [<VPIcon icon="fas fa-globe"/>taking my own advice](https://chriscoyier.net/2023/11/27/the-hanging-punctuation-property-in-css/).

### Preventing Breakouts

```css
html {
  word-break: break-word;
}

pre {
  white-space: pre-wrap;
}
```

These two are protective bits that essentially prevent long text (whether it wouldn’t naturally break or would be otherwise told not to break) from pushing a container wider than its parent would naturally be.

### Headers

```css
h1,
h2 {
  font-weight: 900;
  letter-spacing: -0.02rem;
}
h1,
h2,
h3 {
  line-height: 1.1;
}
h1,
h2,
h3,
h4,
h5,
h6 /* FUTURE :heading */ {
  text-wrap: balance;
  margin-block-start: 0;
}
```

The biggest two headers have a juiced up weight and are tucked in a little bit. The biggest three reduce their `line-height` (1.4, like the rest of the document, is too much for large headers). All the headers (which can be selected with `:heading` in the future) have wrapped balancing and have the margin *above* them knocked out. I tried leaving *most* of the user-agent stylesheet styles for stuff like this alone, but this one always annoys me.

### Pretty Type

```css
p,
li,
dd {
  text-wrap: pretty;
  max-inline-size: 88ch;
}

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  inset-block-end: -0.25em;
}
sup {
  inset-block-start: -0.5em;
}

pre,
code,
kbd,
samp {
  font-family: ui-monospace, SFMono-Regular, monospace;
}
```

We balanced the headings above, but we can use `pretty` on paragraph-y text for [<VPIcon icon="iconfont icon-webkit"/>better typography](https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/). I’m also limiting the line length by limiting size in the direction of the flow. That `88ch` still probably *too* wide for most text. I just picked the Back to the Future number, but it’s [<VPIcon icon="fas fa-globe"/>not without merit](https://blog.glyph.im/2025/08/the-best-line-length.html)). I’m not trying to be ultra-opinionated in this case, just protective.

Those `sub` and `sup` styles date all the way back to the original [Normalize (<VPIcon icon="iconfont icon-github"/>`necolas/normalize.css`)](https://github.com/necolas/normalize.css). I’m a fan because otherwise those elements can cause an extra-thick line-height in the middle of a paragraph and it’s quite unsightly.

### Chilled Out Underlines

```css
a {
  color: oklch(0.68 0.17 228);
  text-underline-offset: 2px;
  &:not(:is(:hover, :focus)) {
    text-decoration-color: color-mix(in srgb, currentColor, transparent 50%);
  }
}
```

[**You know I had to**.](/frontendmasters.com/chilled-out-text-underlines.md)

### Lists

```css
ul,
ol,
dl {
  margin: 0;
  padding: 0;
  list-style: inside;
  ul,
  ol,
  dl {
    padding-inline-start: 2ch;
  }
}
```

I like my list bullets inside the container and nested lists indented just a bit, matching the `tab-size`.

### Media

```css
img,
video,
iframe {
  display: block;
  max-inline-size: 100%;
  block-size: auto;
  border-style: none;
}

figure {
  inline-size: fit-content;
  margin-inline: auto;
}
figcaption {
  contain: inline-size;
  font-size: 90%;
}
```

I’m being protective here with my media elements, making sure they don’t break out of a container. Then if you are potentially limiting the width (inline-size), you need to let the height be free (block-size) so you don’t get squishing.

The figure/figcaption stuff is [**from this whole journey**](/frontendmasters.com/the-figcaption-problem.md) and I think it makes sense broadly.

### Forms

```css :collapsed-lines
input,
select,
textarea,
button {
  font: inherit;
  /* FUTURE: apperance: base; */
}
label {
  display: block;
}
input:not(
  :where(
    [type="submit"],
    [type="checkbox"],
    [type="radio"],
    [type="button"],
    [type="reset"]
  )
) {
  inline-size: 100%;
}
button,
input:where(
  [type="submit"],
  [type="reset"],
  [type="button"]
) {
  background: CanvasText;
  color: Canvas;
  border: 1px solid transparent;
}
textarea {
  field-sizing: content;
  min-block-size: 5lh;
  inline-size: 100%;
  max-inline-size: 100%;
}
```

The first bit has form elements use the same basic typography as the rest of the site, which is a big improvement for consistency in a UI if you ask me. This is opinionated toward single-column full-width forms [<VPIcon icon="fas fa-globe"/>where research convinced me](https://lukew.com/resources/web_form_design.asp) is just better for users. Buttons flop out light/dark colors and have an (invisible) border (which becomes visible in Windows High Contrast mode, so it’s an accessibility thing).

Using `field-sizing` on textareas is just correct, but you need a little extra there to make sure it doesn’t collapse.

### SVG

```css
svg {
  fill: currentColor;
}
```

I’m not doing much for SVG. That could evolve. But for now I do like it when SVG icons color comes along for the ride and dare-I-say *most* icons use `fill` rather than `stroke` for their main coloring.

### Hidden (is a lie)

```css
[hidden] {
  display: none !important;
}
.screenreader-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
:focus-visible {
  outline-offset: 2px;
}
```

[<VPIcon icon="fas fa-globe"/>Monica Dinculescu classic.](https://meowni.ca/hidden.is.a.lie.html) I think it’s worth being able to use (and trust) this attribute.

Plus, you gotta have an [<VPIcon icon="fas fa-globe"/>accessible hiding class](https://scottohara.me/blog/2017/04/14/inclusively-hidden.html). As a little bonus I think it looks a little nicer to push the default outlines away from elements a bit when they are tabbed to (with the keyboard).

### Horizontal Rules

```css
hr {
  border-style: solid;
  border-width: 1px 0 0;
  color: inherit;
  height: 0;
  overflow: visible;
  margin-block: 2.5rem;
}
```

I hate the default weird beveled look. I just want a line with lots of space above and below it.

### No Headbutting

```css
:target {
  scroll-margin: 3rlh;
}
```

I also hate it when you #hash-link to something and it’s smashed to the edge of the browser window, potentially even hurting the context of why you’re linking to it. This is a magic number, but it feels good usually.

### Tables

```css
table {
  caption-side: bottom;
  border-collapse: collapse;
  td {
    font-size: 90%;
  }
  td,
  th {
    word-break: normal;
    border: 1px solid gray;
    padding: 0.5rem;
  }
}
[role="region"][aria-labelledby][tabindex] {
  overflow: auto;
}
caption {
  font-size: 90%;
}
```

This kicks the `<caption>` to the bottom of the table, where you’d normally put a `<figcaption>` so it just looks/feels better. Then it smashes the `border` of table cells together which just feels correct. Then it sets you up for [<VPIcon icon="fas fa-globe"/>proper very basic responsive tables](https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html). Again, protective stuff.

### Motion

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
  }
    
  html {
    interpolate-size: allow-keywords;
    &:focus-within {
      scroll-behavior: smooth;
    }
  }
}
```

This opt-in’s to multi-page view transitions which you probably almost always want, but only does it if the user hasn’t said they prefer reduced motion through their operating system. I think that’s highly appropriate here because it can make the *whole screen move* which is the riskiest of all motion-sickness stuff in my experience.

This also opts-in to [**`animate-to-auto`**](/frontendmasters.com/what-you-need-to-know-about-modern-css-2025-edition.md#animate-to-auto) which just rules and allows for smooth-scrolling, but only when the page is focused (so doesn’t do that when you’re using “find” in the browser itself to search the page.

---

## Critique?

What do you like and dislike? What would you do differently? I *love* scrutinizing other people’s starters/resets, so I’m certainly open to the same on mine.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Coyier CSS Starter",
  "desc": "A fairly opinionated CSS starter by Chris, following a set of personal principals to guide what is in there and what isn't.  ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-coyier-css-starter.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
