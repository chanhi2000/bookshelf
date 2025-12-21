---
lang: en-US
title: "How much do you really know about media queries?"
description: "Article(s) > How much do you really know about media queries?"
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
      content: "Article(s) > How much do you really know about media queries?"
    - property: og:description
      content: "How much do you really know about media queries?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/learn-media-queries.html
prev: /programming/css/articles/README.md
date: 2025-09-29
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://frontendmasters.com/blog/author/danielschwarz/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7267
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
  name="How much do you really know about media queries?"
  desc="There are a ton more @media queries than "
  url="https://frontendmasters.com/blog/learn-media-queries/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7267"/>

Earlier this year, I realized that I knew very little about possibly *most* of the media queries.

Maybe that’s not surprising — since I never hear about them.

Beyond the classics like `@media(min-width: 400px)` and the user-preference media queries such as `@media (prefers-reduced-motion: reduce)`, and *maaaybe* orientation, I can’t say that I was using media queries a whole lot. Especially since flexbox, grid layout, and `calc()` became fairly normalized, in addition to newer sizing values such as `min-content`, `max-content`, `fit-content`, and more recently, `stretch`.

But there are *so* many descriptors! Most of these I’ve never used:

- `any-hover`
- `any-pointer`
- `aspect-ratio`
- `color`
- `color-gamut`
- `color-index`
- `display-mode`
- `dynamic-range`
- `environment-blending`
- `forced-colors`
- `grid`
- `height`
- `horizontal-viewport-segments`
- `hover`
- `inverted-colors`
- `monochrome`
- `nav-controls`
- `orientation`
- `overflow-block`
- `overflow-inline`
- `pointer`
- `prefers-color-scheme`
- `prefers-contrast`
- `prefers-reduced-data`
- `prefers-reduced-motion`
- `prefers-reduced-transparency`
- `resolution`
- `scan`
- `scripting`
- `update`
- `vertical-viewport-segments`
- `video-color-gamut`
- `video-dynamic-range`
- `width`

It’s not that I thought media queries were *only* for responsive design, but out of sight, out of mind, right? Nobody talks about them. Granted, some of them have few use-cases, but after being more mindful of them for a few months, I’ve come to the conclusion that many of them *definitely* deserve more attention.

Plus, there are more ways to write media queries now. This includes an `@custom-media` at-rule for saving media queries as custom properties, which is super cool.

Let’s dig in.

---

## `hover`/`pointer`/`any-hover`/`any-pointer`

Modern devices can be used in many different ways. For example, it’s not uncommon to hook a mouse up to a tablet, which is why we shouldn’t think of tablets as touchscreen devices anymore. In fact, it’s now unwise to use media queries to query for what specific device they “are”, which is why the media types `tty`, `tv`, `projection`, `handheld`, `braille`, `embossed`, `aural`, and `speech` were deprecated (`all`, `print`, and `screen` are the only types now, but all of them will likely be deprecated eventually).

These days it’s more prudent to query the device’s capabilities and how the user has set it up, and that’s where the `hover`, `pointer`, `any-hover`, and `any-pointer` media query descriptors come into it. At first glance, `hover` and `pointer` sound like the same thing, and while you could use them interchangeably for a high-level use-case, using them *together* is what truly enables us to target capabilities:

```css
/* Primary input mechanism is a mouse */
@media (hover: hover) and (pointer: fine) {
  ...
}

/* Primary input mechanism is a joystick */
@media (hover: hover) and (pointer: coarse) {
  ...
}

/* Primary input mechanism is touch */
/* (also targets joystick-less controllers) */
@media (hover: none) and (pointer: coarse) {
  ...
}

/* Primary input mechanism is a stylus */
@media (hover: none) and (pointer: fine) {
  ...
}
```

As you might’ve guessed from `@media (hover: none) and (pointer: coarse)` targeting joystick-less controllers (e.g., the D-pad-only controllers that come with old-ish TVs and game consoles) in addition to touchscreen devices. It’s not a fool-proof method, but it doesn’t make any *overly* bold assumptions about input mechanisms.

Here’s a simple use-case:

```css
button:hover {

  /* Default hover styles */

  @media (hover: none) and (pointer: coarse) {
    /* High-visibility hover styles when obscured by fingers */
  }

}
```

The possibilities are endless, and you can of course query just one descriptor (e.g., `@media (hover: none)`), but they’re rarely useful individually. A more powerful usage is in the combinative way demonstrated above, but instead of declaring alternative hover styles for touchscreen devices, providing a more touch-friendly UI, perhaps by using the `display` property to show/hide different components altogether.

It’s also worth mentioning that `hover` and `pointer` query the *primary* input mechanism, whereas their `any-hover` and `any-pointer` counterparts query *all* input mechanisms. For example, the following code targets touchscreen devices with a mouse or stylus hooked up as an additional input mechanism, which might be a more accurate representation of the user’s setup:

```css
@media (hover: none) and (pointer: coarse) and (any-pointer: fine) {
  ...
}
```

---

## forced-colors`

Users can choose color schemes at the OS or browser level, or create their own. As an example, Firefox allows us to change the color of text, backgrounds, and links, whereas High Contrast Mode in Windows offers more customization options and has themes to choose from. In an ideal world we wouldn’t need to do anything here, but if something turns out to be inaccessible or just looks odd, we can use the `forced-colors` media query descriptor to correct it:

```css
@media (forced-colors: active) {
  /* Corrective styles, like applying borders to controls that might not otherwise have them. */
}
```

If something must be a certain color, simply apply `forced-color-adjust: none` along with the necessary property and value:

```css
#this-must-be-blue {
  color: blue;
  forced-color-adjust: none;
}
```

It’s also worth noting that when `forced-colors` is set to `active`, the user’s preferred color scheme will be set to either `light` or `dark` depending on their chosen theme. You can query the assigned color scheme using `@media (prefers-color-scheme: light)` and `@media (prefers-color-scheme: dark)`. In addition, `prefers-contrast` will be set to `more`, `less`, or `custom`.

You can [<VPIcon icon="fa-brands fa-firefox"/>learn more about `forced-colors` at MDN.](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)

---

## `width`/`height`

“`width` and `height`? I already know about those!”

Yes, these are certainly the most commonly used media queries, but did you know that a new syntax with comparison operators was introduced about three years ago? I like the operators because they can be inclusive or exclusive of the value in question. For example, we can express “more than” using `>` or “more than or equal to” using `>=`, which enables us to drop the `min-`/`max-` prefixes (which are only inclusive) and standardize the `width` and `height` keywords across the board:

```css
@media (width: 900px) {
  /* Styles when viewport width is 900px */
}

@media (width < 900px) {
  /* Styles when viewport width is less than 900px */
}

@media (width > 900px) {
  /* Styles when viewport width is more than 900px */
}

@media (width <= 900px) {
  /* Styles when viewport width is less than or equal to 900px */
}

@media (width >= 900px) {
  /* Styles when viewport width is more than or equal to 900px */
}
```

There’s also a between-this-and-that syntax, which oddly requires ‘lessy’ operators but is otherwise easy to remember:

```css
@media (900px < width < 1200px) {
  /* Styles when viewport width is 901-1199px (exclusive) */
}

@media (900px <= width <= 1200px) {
  /* Styles when viewport width is 900-1200px (inclusive) */
}
```

If you’re not keen on this syntax (yeah, it’s a little weird), you can still use the old syntax. Or, even better, use a little of both:

```css
@media (width > 900px) and (width < 1200px) {
  /* Styles when viewport width is 901-1199px (exclusive) */
}

@media (width >= 900px) and (width <= 1200px) {
  /* Styles when viewport width is 900-1200px (inclusive) */
}
```

It’s worth noting that logical properties like `inline-size` and `block-size` also work, but it often makes more sense in @media queries to deal with physical properties since the browser window itself doesn’t change when the flow changes.

---

## `inverted-colors`

Since there are a variety of viewing modes (light, dark, high-contrast, etc.) already, having a mode that inverts colors might seem unnecessary, but it’s useful when light or dark mode isn’t available (because inverting the colors somewhat toggles the mode) and when the user has a Color Vision Deficiency (because inverting the colors creates new colors). While the former issue can be fixed by respecting light-dark mode preferences and implementing light-dark mode toggling, the latter issue requires color inversion.

We can query this mode using the `inverted-colors` media query descriptor, and what we want to do with it is revert shadows and non-UI media back to ‘normal,’ otherwise the non-UI media will look extremely odd and the shadows will appear as highlights. To invert a shadow color (or any color), convert it to HSL format using the relative color syntax, and add `180` to the Hue (`h`):

For media, `filter: invert(1)` will do the trick:

```css :collapsed-lines
.box-shadow {

  /* When not inverted, normal box shadow */
  @media (inverted-colors: none) {
    box-shadow: 0 0 8px limegreen;
  }

  /* When inverted, add 180 to Hue/h to revert */
  @media (inverted-colors: inverted) {
    box-shadow: 0 0 8px hsl(from limegreen calc(h + 180) s l);
  }

}

/* Same thing for text shadows */
.text-shadow {
  @media (inverted-colors: none) {
    text-shadow: 0 0 8px limegreen;
  }
  @media (inverted-colors: inverted) {
    text-shadow: 0 0 8px hsl(from limegreen calc(h + 180) s l);
  }
}

/* Same thing for drop shadows */
.drop-shadow {
  @media (inverted-colors: none) {
    filter: drop-shadow(0 0 8px limegreen);
  }
  @media (inverted-colors: inverted) {
    filter: drop-shadow(0 0 8px hsl(from limegreen calc(h + 180) s l));
  }
}

.non-ui:is(img, svg, video, ...) {

  box-shadow: 0 0 8px black;

  @media (inverted-colors: inverted) {
    /* Reverts the media and shadow at the same time */
    filter: invert(1);
  }

}
```

You can see it in action here (make sure to toggle inverted colors to see the UI change but images/shadows stay the same):

<CodePen
  user="mrdanielschwarz"
  slug-hash="gbaZJLK"
  title="@media (inverted-colors: inverted) demo"
  :default-tab="['css','result']"
  :theme="dark"/>

While forced colors are better as long as users can choose themes, some operating systems don’t support it (macOS doesn’t).

As of September 2025, only Safari supports the inverted-colors media query descriptor `prefers-reduced-motion`.

---

## `orientation`

An `orientation` query is a rather simple media query descriptor that resolves to `portrait` if the viewport is larger vertically or `landscape` if it’s larger horizontally.

The thing with orientation is that users hold their handheld device differently based on it, which could mean having to code a slightly different layout for each orientation. Even if you’re lucky enough to avoid that issue, you’re still likely to run into issues with aspect ratios or relative units (e.g., viewport or percentage units) where something looks proportionate in one orientation but very exaggerated or de-exaggerated in the other.

Targeting a specific orientation is easy enough:

```css
@media (orientation: portrait) {
  ...
}

@media (orientation: landscape) {
  ...
}
```

As for optimizing layouts for certain orientations on touchscreen devices, you’ll want to combine the `orientation` descriptor with the ‘touchscreen descriptors’ mentioned earlier:

```css
@media (orientation: landscape) and (hover: none) and (pointer: coarse) {
  /* Landscape touchscreen styles */
}
```

Generally speaking, due to the diversity of devices and media queries available today, avoid using `orientation` to detect the device type. For example, vertical monitors do exist (you’ll see them at airports, for instance), so don’t assume that `portrait` means handheld.

---

## `overflow-inline`/`overflow-block`

The `overflow-inline` and `overflow-block` media query descriptors with the `scroll` value match vendors that support overflow content on their respective axes. We’re basically talking about web browsers here, as well as windows that display HTML content and have a scrolling mechanisms.

```css
/* Vendor supports inline-axis scrolling */
@media (overflow-inline: scroll) {
  ...
}

/* Vendor supports block-axis scrolling */
@media (overflow-block: scroll) {
  ...
}
```

The `overflow-inline` and `overflow-block` media query descriptors with the `none` value match vendors that *don’t* support overflow content on their respective axes. To be clear, this doesn’t mean that the document has `overflow: hidden` declared, it means that scrolling isn’t supported at all (e.g., a HTML document that’s rendered as an OS-level widget or on a digital billboard).

```css
/* Vendor doesn’t support inline-axis scrolling */
@media (overflow-inline: none) {
  ...
}

/* Vendor doesn’t support block-axis scrolling */
@media (overflow-block: none) {
  ...
}
```

A more common use-case exists for `overflow-block`, which accepts another value: `paged`. Naturally, `paged` refers to printed documents and HTML-based ebooks such as EPUBs, with printed documents obviously being the most common of the two.

```css
/* Vendor supports block-axis scrolling, but is paged media */
@media (overflow-block: paged) {
  ...
}
```

The spec alludes to [<VPIcon icon="iconfont icon-w3c"/>all media types being deprecated eventually](https://w3.org/TR/mediaqueries-5/#media-types), so this is somewhat designed to replaced the `print` media type.

---

## The `prefers-` family

The `prefers-` family of media query descriptors should be used to cater to users with preferences and comply with the WCAG (Web Content Accessibility Guidelines).

### `prefers-color-scheme`

```css
/* User prefers light mode */
@media (prefers-color-scheme: light) {
  ...
}

/* User prefers dark mode */
@media (prefers-color-scheme: dark) {
  ...
}
```

I like to query this using JavaScript, check a ‘dark mode’ checkbox accordingly, and then use CSS’s `light-dark()` function to style according to the inferred (or user-specified) mode:

```css
/* If dark mode is inferred, check dark mode box */
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.querySelector("#dark-mode").checked = true;
}
```

```html
/* But users can change at will */
<input type="checkbox" id="dark-mode">
```

```css
/* If dark mode isn’t checked */
:root:has(#dark-mode:indeterminate) {
  color-scheme: light;
}

/* If dark mode is checked */
:root:has(#dark-mode:checked) {
  color-scheme: dark;
}

body {
  /* Then set values conditionally */
  background: light-dark(white, black);
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="jEWObrL"
  title="prefers-color-scheme demo"
  :default-tab="['css','result']"
  :theme="dark"/>

### `prefers-contrast`

There are four possible values for `prefers-contrast`:

```css
/* User has no contrast preference */
@media (prefers-contrast: no-preference) {
  ...
}

/* User prefers more contrast */
@media (prefers-contrast: more) {
  ...
}

/* User prefers less contrast */
@media (prefers-contrast: less) {
  ...
}

/* User has forced a color theme */
@media (prefers-contrast: custom) {
  ...
}
```

You’re unlikely to use `no-preference` or `more` because the WCAG has defined a minimum level of color contrast that websites must adhere to. In addition, `prefers-contrast: custom` means that the user has specified a color theme preference via forced colors mode that’s neither a low or high contrast theme. It’s a matter of semantics that again has no practical use, so simply use `low` for the minority of users that prefer low contrast due to migraines, Dyslexia, and so on. This doesn’t violate WCAG as long as there’s a mechanism for switching low-contrast mode off.

### `prefers-reduced-data`

`prefers-reduced-data: reduce` targets users that prefer to consume less data when browsing while connected to their cellular network, whereas `prefers-reduced-data: no-preference` naturally targets those who have no preference. Personally, I’d love to see more websites reduce their size for those with slower connections and/or smaller data allowances, perhaps by swapping heavy decorative background images for something else:

```css
div {
  @media (prefers-reduced-data: no-preference) {
    /* Heavy decorative image */
    background-image: url(<url>);
  }

  @media (prefers-reduced-data: reduce) {
    /* Literally anything else */
    background: <value>;
  }
}
```

Or loading fonts conditionally:

```css
@media (prefers-reduced-data: no-preference) {
  @font-face {
    font-family: lexend;
    src: <value>;
  }
}

body {
  /* If user prefers reduced data, fallback font sans-serif will be used */
  font-family: lexend, sans-serif;
}
```

As of October 2025, no web browser supports this.

### `prefers-reduced-motion*`

The key to `prefers-reduced-motion`, which accepts the same values as `prefers-reduced-data` (`no-preference` and `reduce`), is simply to reduce (or remove, in extreme cases) transitions and animations for those with vestibular disorders, which interestingly [<VPIcon icon="iconfont icon-webdev"/>affect 35% of adults by aged 40](https://web.dev/learn/accessibility/motion):

```css
button {
  @media (prefers-reduced-motion: no-preference) {
    /* Continuously pulsate */
    animation: pulse 1s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    /* Pulsate once and not so intensely */
    animation: scaleUpDown 1s;
  }
}
```

### `prefers-reduced-transparency`

Same here — your options are `no-preference` and `reduce`.

I’d normally consider this one to be an edge case, but with Apple’s new Liquid Glass aesthetic being available to everybody now, I expect it to surge in popularity. If you must implement it, at least reduce transparency for those that don’t like it or find it to be inaccessible:

```css
div {
  @media (prefers-reduced-transparency: no-preference) {
    background: hsl(0 0 0 / 60%);
  }

  @media (prefers-reduced-transparency: reduce) {
    background: hsl(0 0 0 / 80%);
  }
}
```

As of September 2025, only Chrome and Edge support this.

---

## `resolution`

`resolution`, `min-resolution`, and `max-resolution` accept values of the `<resolution>` data type (`dpi`, `dpcm`, `dppx`/`x`). A fantastic use-case for this is to serve higher-resolution images to higher-resolution devices, as you would when using the `srcset` and `sizes` HTML attributes. And remember, we can use the new range syntax here, so `resolution > 1x` instead of `min-resolution: 1.01x`:

```css
div {
  background-image: url("/image-1x.jpg");

  @media (resolution > 1x) {
    background-image: url("/image-2x.jpg");
  }

  @media (resolution > 2x) {
    background-image: url("/image-3x.jpg");
  }

  @media (resolution > 3x) {
    background-image: url("/image-4x.jpg");
  }
}
```

---

## Nesting media queries

CSS nesting has had full browser support since August 2023, enabling us to nest CSS rules inside other CSS rules, and that includes at-rules such as media queries. If you’ve been using a CSS preprocessor such as LESS, Scss, or Sass for this, well…you don’t need to anymore. Instead, to use an earlier example, you can nest media queries like this:

```css
.box-shadow {
  @media (inverted-colors: none) {
    box-shadow: 0 0 8px limegreen;
  }
  @media (inverted-colors: inverted) {
    box-shadow: 0 0 8px hsl(from limegreen calc(h + 180) s l);
  }
}
```

This enables you to write media queries more contextually.

---

## All in all

If you were anxious about exploring the now-many different types of media queries and their syntaxes, I’d say that’s fair. However, while catering to today’s diversity of devices and user preferences is without a doubt getting more complex, these media queries are actually pretty easy to use once you know how.

Besides, WCAG 3.0, which could set the standard for the design of even more inclusive patterns, will be here eventually. This’d mean having the legal requirement of catering for more user preferences regardless of how edge case-y they are, and as we’ve seen in recent years, new and amended accessibility laws (and similar laws such as GDPR) tend to cause a last-minute frenzy as the deadline for compliance draws closer. My advice? Get ahead of the curve and start putting those media queries to use!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How much do you really know about media queries?",
  "desc": "There are a ton more @media queries than ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/learn-media-queries.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
