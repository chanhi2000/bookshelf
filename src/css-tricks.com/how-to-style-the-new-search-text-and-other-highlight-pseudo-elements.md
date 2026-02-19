---
lang: en-US
title: "How to Style the New ::search-text and Other Highlight-y Pseudo-Elements"
description: "Article(s) > How to Style the New ::search-text and Other Highlight-y Pseudo-Elements"
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
      content: "Article(s) > How to Style the New ::search-text and Other Highlight-y Pseudo-Elements"
    - property: og:description
      content: "How to Style the New ::search-text and Other Highlight-y Pseudo-Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/how-to-style-the-new-search-text-and-other-highlight-pseudo-elements.html
prev: /programming/css/articles/README.md
date: 2026-01-28
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/search-text-pseudo-example.webp
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
  name="How to Style the New ::search-text and Other Highlight-y Pseudo-Elements"
  desc="Chrome 144 recently shipped ::search-text, which is now one of several highlight-related pseudo-elements. This one selects find-in-page text, which is the text that gets highlighted when you do a Ctrl/Command + F-type search for something on a page and matches are found."
  url="https://css-tricks.com/how-to-style-the-new-search-text-and-other-highlight-pseudo-elements"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/search-text-pseudo-example.webp"/>

[<VPIcon icon="fa-brands fa-chrome"/>Chrome 144](https://developer.chrome.com/blog/new-in-chrome-144) recently shipped `::search-text`, which is now one of several highlight-related pseudo-elements. This one selects find-in-page text, which is the text that gets highlighted when you do a Ctrl/Command + F-type search for something on a page and matches are found.

By default, `::search-text` matches are yellow while the current target (`::search-text:current`) is orange, but `::search-text` enables us to change that.

I’ll admit, I hadn’t really been following these highlight pseudo-elements. Up until now, I didn’t even know that there was a name for them, but I’m glad there is because that makes it easier to round them all up and compare them, which is exactly what I’m going to do here today, as it’s not super obvious what they do based on the name of the pseudo-element. I’ll also explain why we’re able to customize them, and suggest how.

---

## The different types of highlight pseudo-elements

| Pseudo-selector | Selects… | Notes |
| --- | --- | --- |
| `::search-text` | Find-in-page matches | `::search-text:current` selects the current target |
| [**`::target-text`**](/css-tricks.com/almanac-pseudo-selectors/target-text.md) | Text fragments | Text fragments allow for programmatic highlighting using URL parameters. If you’re referred to a website by a search engine, it might use text fragments, which is why `::target-text` is easily confused with `::search-text`. |
| [**`::selection`**](/css-tricks.com/almanac-pseudo-selectors/selection.md) | Text highlighted using the pointer |  |
| [**`::highlight()`**](/css-tricks.com/css-custom-highlight-api-early-look.md) | Custom highlights as defined by JavaScript’s [**Custom Highlight API**](/css-tricks.com/css-custom-highlight-api-early-look.md) |  |
| [<VPIcon icon="fa-brands fa-firefox"/>`::spelling-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::spelling-error) | Incorrectly spelled words | Pretty much applies to editable content only |
| [<VPIcon icon="fa-brands fa-firefox"/>`::grammar-error`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::grammar-error) | Incorrect grammar | Pretty much applies to editable content only |

And let’s not forget about the [<VPIcon icon="fa-brands fa-firefox"/>`<mark>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/mark) HTML element either, which is what I’m using in the demos below.

---

## What should highlight pseudo-elements look like?

The question is, if they all (besides `::highlight()`) have default styling, why would we need to select them with pseudo-elements? The reason is accessibility (color contrast, specifically) and usability (emphasis). For example, if the default yellow background of `::search-text` doesn’t contrast well enough with the text color, or if it doesn’t stand out against the background of the container, then you’ll want to change that.

I’m sure there are many ways to solve this (I want to hear *“challenge accepted”* in the comments), but the best solution that I’ve come up with uses [**relative color syntax**](/css-tricks.com/css-color-functions.md#the-relative-color-syntax). I took wrong turns with both `background-clip: text` and `backdrop-filter: invert(1)` before realizing that many CSS properties are off-limits when it comes to highlight pseudo-elements:

```css
body {
  --background: #38003c;
  background: var(--background);

  mark,
  ::selection,
  ::target-text,
  ::search-text {
    /* Match color to background */
    color: var(--background);

    /* Convert to RGB then subtract channel value from channel maximum (255) */
    background: rgb(from var(--background) calc(255 - r) calc(255 - g) calc(255 - b));
  }
}
```

<CodePen
  user="anon"
  slug-hash="ogLZeQN"
  title="Forever-inverse highlights"
  :default-tab="['css','result']"
  :theme="dark"/>

Your browser might not support that yet, so here’s a video that shows how the highlighted text adapts to background color changes.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/01/Screen-Recording-2026-01-21-at-10.28.07-AM.mov" />

What’s happening here is that I’m converting the container’s background color to RGB format and then subtracting the value of each channel (`r`, `g`, and `b`) from the maximum channel value of `255`, inverting each channel and the overall color. This color is then set as the background color of the highlighting, ensuring that it stands out no matter what, and thanks to the new [**CodePen slideVars**](/css-tricks.com/playing-with-codepen-slidevars.md), you can mess around with the demo to see this in action. You might be able to do this with color formats besides RGB, but RGB is the easiest.

So that covers the usability, but what about the accessibility?

Well, the highlighting’s text color is the same as the container’s background color because we know that it’s the inverse of the *highlighting’s* background color. While this doesn’t mean that the two colors will have accessible contrast, it seems as though they will most of the time (you should always check color contrast using [**color contrast tools**](/css-tricks.com/color-contrast-accessibility-tools.md), regardless).

If you don’t like the randomness of inverting colors, that’s understandable. You can totally pick colors and write conditional CSS for them manually instead, but finding accessible colors that stand out against the different backdrops of your design for all of the different types of highlight pseudo-elements, while accounting for alternative viewing modes such as dark mode, is a headache. Besides, I think certain UI elements (e.g., highlights, errors, focus indicators) *should* be ugly. They *should* stand out in a brutalist sort of way and feel disconnected from the design’s color palette. They should demand maximum attention by intentionally not fitting in.

Keep in mind that the different types of highlight pseudo-elements should be visually distinctive too, for obvious reasons, but also in case two different types overlap each other (e.g., the user selects text currently matched by find-in-page). Therefore, in the amended code snippet below, `mark`, `::selection`, `::target-text`, and `::search-text` all have slightly different backgrounds.

I’ve left `mark` unchanged, the `r` value of `::selection` as it was, the `g` value of `::target-text` as it was, and the `b` value of `::search-text` as it was, so those last three only have two channels inverted instead of all three. They’re varied in color now (but still look inverted), and with the addition of an alpha value at `70%` (`100%` for `::search-text:current`), they also blend into each other so that we can see where each highlight begins and ends:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/01/highlights.mov" />

```css :collapsed-lines
body {
  --background: #38003c;
  background: var(--background);

  mark,
  ::selection,
  ::target-text,
  ::search-text {
    color: var(--background);
  }

  mark {
    /* Invert all channels */
    background: rgb(from var(--background) calc(255 - r) calc(255 - g) calc(255 - b) / 70%);
  }

  ::selection {
    /* Invert all channels but R */
    background: rgb(from var(--background) r calc(255 - g) calc(255 - b) / 70%);
  }

  ::target-text {
    /* Invert all channels but G */
    background: rgb(from var(--background) calc(255 - r) g calc(255 - b) / 70%);
  }

  ::search-text {
    /* Invert all channels but B */
    background: rgb(from var(--background) calc(255 - r) calc(255 - g) b / 70%);
    
    &:current {
      /* Invert all channels but B, but without transparency */
      background: rgb(from var(--background) calc(255 - r) calc(255 - g) b / 100%);
    }
  }
}
```

<CodePen
  user="anon"
  slug-hash="GgqWzax"
  title="Forever-inverse highlights (with differentiation)"
  :default-tab="['css','result']"
  :theme="dark"/>

`::spelling-error` and `::grammar-error` are excluded from all this because they have their own visual affordances (red underlines and green underlines respectively, typically contrasted against the neutral background of an editable element such as `<textarea>`).

But `mark`, `::selection`, `::target-text`, and new-to-Chrome `::search-text`? Well, they can appear anywhere (even on top of each other), so I think it’s important that they’re visually distinctive from each other while being accessible at all times. Again though, even fully-inverted colors can be inaccessible. In fact, the inverse of `#808080` is `#808080`, so test, test, test! Although, maybe [<VPIcon icon="iconfont icon-w3c"/>`contrast-color()`](https://css-tricks.com/exploring-the-css-contrast-color-function-a-second-time/) could come to the rescue once the [<VPIcon icon="iconfont icon-w3c"/>CSS Color Module Level 5](https://w3.org/TR/css-color-5/#funcdef-contrast-color) version of it ships.

In the meantime, *please*, no more highlight-y elements!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Style the New ::search-text and Other Highlight-y Pseudo-Elements",
  "desc": "Chrome 144 recently shipped ::search-text, which is now one of several highlight-related pseudo-elements. This one selects find-in-page text, which is the text that gets highlighted when you do a Ctrl/Command + F-type search for something on a page and matches are found.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/how-to-style-the-new-search-text-and-other-highlight-pseudo-elements.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
