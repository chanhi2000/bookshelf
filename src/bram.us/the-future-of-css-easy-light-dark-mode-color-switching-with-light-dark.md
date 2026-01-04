---
lang: en-US
title: "The Future of CSS: Easy Light-Dark Mode Color Switching with light-dark()"
description: "Article(s) > The Future of CSS: Easy Light-Dark Mode Color Switching with light-dark()"
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
      content: "Article(s) > The Future of CSS: Easy Light-Dark Mode Color Switching with light-dark()"
    - property: og:description
      content: "The Future of CSS: Easy Light-Dark Mode Color Switching with light-dark()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark.html
prev: /programming/css/articles/README.md
date: 2023-10-10
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/10/css-light-dark.png
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
  name="The Future of CSS: Easy Light-Dark Mode Color Switching with light-dark()"
  desc="A function that computes to the first color if the used color scheme is light or unknown, or to the second color if the used color scheme is dark."
  url="https://bram.us/2023/10/09/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/10/css-light-dark.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2023/10/css-light-dark.png)

To change a color based on whether Light Mode or Dark Mode used, you’d typically use a `prefers-color-scheme` Media Query. To make things easier, CSS now comes with a utility function named `light-dark()`. The function accepts two color values as its arguments. Based on which color scheme you are actively using, it will output the first or the second argument.

---

## Responding to Light or Dark Mode

To change a color value – or any other value for that matter – based on Light Mode or Dark Mode being used, you’d typically use a `prefers-color-scheme` Media Query to change the value of a Custom Property:

```css
:root {
  --text-color: #333; /* Value for Light Mode */
}

@media (prefers-color-scheme: dark) {
  :root {
    --text-color: #ccc; /* Value for Dark Mode */
  }
}
```

When [**implementing Dark Mode**](/bram.us/how-to-add-dark-mode-to-a-javascript-app-react-angular-vue-etc.md), you typically end up with a bunch of duplicated CSS variables that set the values for each mode. The rest of your CSS then uses these custom properties for the actual declarations.

```css
body {
  color: var(--text-color);
}
```

---

## Responding to Light or Dark Mode with `light-dark()`

A new addition to the [<VPIcon icon="fas fa-globe"/>CSS Color Module Level 5 Specification](https://drafts.csswg.org/css-color-5/) is the `light-dark()` function. The function accepts two color values as its arguments. Based on which color scheme you are actively using, it will output the first or the second color argument.

```css
light-dark(<color>, <color>);
```

As [<VPIcon icon="fas fa-globe"/>per spec](https://drafts.csswg.org/css-color-5/#light-dark):

::: info 7. Reacting to the used color-scheme (<VPIcon icon="fas fa-globe"/><code>drafts.csswg.org</code>)

> This function computes to the computed value of the first color, if the used color scheme is `light` or unknown, or to the computed value of the second color, if the used color scheme is `dark`.

```component VPCard
{
  "title": "7. Reacting to the used color-scheme: the light-dark() Function - CSS Color Module Level 5",
  "desc": "System colors have the ability to react to the current used color-scheme value. The light-dark() function exposes the same capability to authors.",
  "link": "https://drafts.csswg.org/css-color-5/#light-dark/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

The used color scheme is not only based on the user’s Light/Dark Mode setting, but also on the value of the `color-scheme` property. This similar to how [<VPIcon icon="fas fa-globe"/>System Colors](https://blog.jim-nielsen.com/2021/css-system-colors/) get computed.

::: info  (<VPIcon icon="fas fa-globe"/><code>blog.jim-nielsen.com</code>)

> The `color-scheme` property allows an element to indicate which color schemes it is designed to be rendered with. These values are negotiated with the user’s preferences, resulting in a used color scheme […].

```component VPCard
{
  "title": "CSS System Colors",
  "desc": "Writing about the big beautiful mess that is making things for the world wide web.",
  "link": "https://blog.jim-nielsen.com/2021/css-system-colors//",
  "logo": "https://blog.jim-nielsen.com/favicon.ico",
  "background": "rgba(255,106,97,0.2)"
}
```

:::

That means, for `light-dark()` to work, you **must** also include a `color-scheme` declaration.

```css
:root {
  color-scheme: light dark;
}

:root {
  --text-color: light-dark(#333, #ccc); /* In Light Mode = return 1st value. In Dark Mode = return 2nd value. */
}
```

Because `color-scheme` is taken into account, that also means that you can override its value per element, to force it into a certain mode:

```css
.dark {
  color-scheme: dark; /* light-dark() on this element and its children will always return dark */
}
```

::: note

🤔 If this `light-dark()` seems familiar: Chromium internally sports a `-internal-light-dark()` which [**I wrote about before**](/bram.us/customize-the-password-hide-reveal-button-in-microsoft-edge.md#light-dark). Based on this functionality, [the proposal was made within the CSS Working Group (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7561) to expose a similar function to authors. The result is `light-dark()`.

Unlike `-internal-light-dark()` which is for any type of value, `light-dark()` can only be used for colors.

---

## What about other non-`<color>` values and responding to other color schemes?

A common type of feedback on `light-dark()` I get is that it is fairly limited in what it can do: it can only do light/dark and only works with `<color>` values. That’s correct and is also very much intentional, because it is an intermediary step towards a final solution.

As proposed in [the CSS Working Group issue (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7561), the end goal is to have a function *(tentatively)* named `schemed-value()` in the future. That function can:

- Respond to any value of `color-scheme`.
- Return more than `<color>` values

It *could* look something like this:

```css
:root {
  color-scheme: dark light custom;
}

body {
  color: schemed-value(
    light hotpink,           /* Value to use when the light color-scheme is used */
    dark lime,               /* Value to use when the dark color-scheme is used */
    --custom rebeccapurple   /* Value to use when the --custom color-scheme is used */
  );
}
```

But, for now, we “only” have `light-dark()` and I personally think that’s fine, as it rhymes with today’s reality of what browsers can do:

- `light-dark()` only works with `light` or `dark` because right now `color-scheme` only accepts `light` or `dark` (or `normal`) as keywords. Custom values are currently ignored, so it is of no use to build a generic function today.
- It can only do `<color>` values because [<VPIcon icon="iconfont icon-w3c"/>the parser needs to know the value type of what it is parsing](https://w3.org/TR/css-syntax-3/#parse-grammar) ahead of time. To cater for this, `light-dark()` is [<VPIcon icon="fas fa-globe"/>explicitly defined to be a `<color>`](https://drafts.csswg.org/css-color-5/#color-syntax), allowing it be used anywhere a `<color>` is expected – e.g. the `background-color` and `color` properties.

Narrowing things down in feature scope – from the very broad `schemed-value()` to the slimmed down `light-dark()` – allowed the function as it is to be defined today, instead of putting the whole thing on the long track.

The name and syntax of `light-dark()` is very memorable, easy to use, and – most importantly – offers a solution to a common use-case authors are having today.

### Looking ahead

::: note

Once the day comes when authors are able to [create their own custom `color-scheme`s (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9660), only then the much broader `schemed-value()` would become useful.

:::

It’s still only a proposal, but as it stands right now you would register a custom color scheme using a name, a base-scheme to start from, and then specifying the values for the [<VPIcon icon="fas fa-globe"/>System Colors](https://drafts.csswg.org/css-color/#css-system-colors):

```css
/* Fully fledged custom color scheme */
@color-scheme --solarized-dark {
  base-scheme: dark;
  AccentColor: …;
  AccentColorText: …;
  …
}
```

Once registered, this custom scheme becomes a valid value for `color-scheme`, `schemed-value()` and – thanks to the [<VPIcon icon="fas fa-globe"/>Web Preferences API](https://wicg.github.io/web-preferences-api/) – in `prefers-color-scheme` Media Query Conditions.

```css
.code-editor {
  color-scheme: --solarized-dark;
}
```

The reason that `color-scheme` property will be able to accept these custom values, is because the CSS Working Group has [<VPIcon icon="fa-brands fa-wikipedia-w"/>future-proofed](https://en.wikipedia.org/wiki/Future-proof) it. Today, the syntax already accepts `<custom-ident>`s but currently [<VPIcon icon="fas fa-globe"/>ignores them](https://drafts.csswg.org/css-color-adjust/#color-scheme-prop:~:text=%3Ccustom%2Dident%3E%20values%20are%20meaningless%2C%20and%20exist%20only%20for%20future%20compatibility%2C%20so%20that%20future%20added%20color%20schemes%20do%20not%20invalidate%20the%20color%2Dscheme%20declaration%20in%20legacy%20user%20agents):

::: info

> `<custom-ident>` values are meaningless, and exist only for future compatibility, so that future added color schemes do not invalidate the `color-scheme` declaration in legacy user agents. User agents must not interpret any `<custom-ident>` values as having a meaning; any additional recognized color schemes must be explicitly added to this property’s grammar.

```component VPCard
{
  "title": "CSS Color Adjustment Module Level 1",
  "desc": "While the prefers-color-scheme media feature allows an author to adapt the page’s colors to the user’s preferred color scheme, many parts of the page are not under the author’s control (such as form controls, scrollbars, etc). The color-scheme property allows an element to indicate which color schemes it is designed to be rendered with. These values are negotiated with the user’s preferences, resulting in a used color scheme that affects things such as the default colors of form controls and scrollbars.",
  "link": "https://drafts.csswg.org/css-color-adjust/#color-scheme-prop:~:text=%3Ccustom-ident%3E%20values%20are%20meaningless,%20and%20exist%20only%20for%20future%20compatibility,%20so%20that%20future%20added%20color%20schemes%20do%20not%20invalidate%20the%20color-scheme%20declaration%20in%20legacy%20user%20agents/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

Also, when `schemed-value()` ever becomes a thing, `light-dark()` would become [<VPIcon icon="fa-brands fa-wikipedia-w"/>syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) for it:

```css
light-dark(<color>, <color>); = schemed-value(light <color>, dark <color>);
```

Pretty sweet, right?

---

## Browser Support

::: note 💡

Although this post was originally published in October 2023, the section below is constantly being updated. *Last update: Feb 1, 2024*.

:::

Here is an [<VPIcon icon="iconfont icon-caniuse"/>up-to-date list of browser support for CSS `light-dark()`](https://caniuse.com/mdn-css_types_color_light-dark):

### Chromium *(Blink)*

✅ Included in Chrome 123.0.6273.0, which goes stable on Mar 13, 2024

### Firefox *(Gecko)*

✅ Supported in Firefox 120. Safari *(WebKit)*

⏳ Feature [landed in WebKit on main (<VPIcon icon="iconfont icon-github" />`WebKit/WebKit`)](https://github.com/WebKit/WebKit/pull/23364). Expected to be included in Safari TP 188. The pen embedded below will indicate if the browser you are currently using supports CSS `light-dark()` or not:

<CodePen
  user="bramus"
  slug-hash="ExGrNVx"
  title="CSS light-dark() Support test"
  :default-tab="['css','result']"
  :theme="dark"/>

To stay up-to-date regarding browser support, you can follow these tracking issues:

- Chromium/Blink: [<VPIcon icon="fa-brands fa-chrome"/>Issue #1490618](https://bugs.chromium.org/p/chromium/issues/detail?id=1490618) — Fixed (Closed)
- Firefox/Gecko: [<VPIcon icon="fa-brands fa-firefox" />Issue #1856999](https://bugzilla.mozilla.org/show_bug.cgi?id=1856999) — RESOLVED FIXED
- Safari/WebKit: [<VPIcon icon="fa-brands fa-safari"/>Issue #262914](https://bugs.webkit.org/show_bug.cgi?id=262914) — RESOLVED FIXED

---

## Demo

If your browser supports `light-dark()`, the demo below will show a few `<div>`s labeled `.auto` that respond to Light/Dark mode being toggled. The `<div>`s with the class `.light` or `.dark` are forced into their proper mode.

<CodePen
  user="bramus"
  slug-hash="LYMqRqV"
  title="CSS light-dark() Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Spread the word

To help spread the contents of this post, feel free to retweet its announcement:

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Easy Light-Dark Mode Color Switching with light-dark()",
  "desc": "A function that computes to the first color if the used color scheme is light or unknown, or to the second color if the used color scheme is dark.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
