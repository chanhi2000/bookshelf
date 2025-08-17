---
lang: en-US
title: "Custom Property Fallbacks"
description: "Article(s) > Custom Property Fallbacks"
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
      content: "Article(s) > Custom Property Fallbacks"
    - property: og:description
      content: "Custom Property Fallbacks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-property-fallbacks.html
prev: /programming/css/articles/README.md
date: 2025-02-28
isOriginal: false
author:
  - name: Matthew Morete
    url : https://frontendmasters.com/blog/author/matthewmorete/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5257
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
  name="Custom Property Fallbacks"
  desc="This post starts with quite a tricky little quiz about what a color value resolves to be."
  url="https://frontendmasters.com/blog/custom-property-fallbacks/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5257"/>

Look at this CSS and take a guess what color our text will be. No tricks, this is the only relevant code:

```css
:root {
  --color: green;
  --color: notacolor;
  color: red;
  color: var(--color, blue);
}
```

Perhaps surprisingly, the answer is the default text color, usually black. Let’s figure out why that’s the case and how to write a fallback that works.

---

## `var()` Fallbacks

The value `blue` seems a likely candidate to be our color, doesn’t it? After all, we often call the 2nd parameter of `var()` its “fallback” value. However, this type of fallback is only used in the following circumstances:

- The custom property isn’t defined.
- The custom property’s value is the `initial` keyword.
- The custom property is [<FontIcon icon="iconfont icon-w3c"/>animation-tainted](https://w3.org/TR/css-variables/#animation-tainted) and is used in an animation property.

*and*…

- The custom property isn’t registered with `@property`.

Since a registered custom property *must* be given an initial value, it’ll always have a valid value and will *never* use its fallback.

Our custom property is defined, not animated tainted, and its value isn’t a keyword, so we can throw away `blue` and keep looking.

---

## Fallback Declarations

Usually in CSS, we can rely on the cascade to fallback to a previous valid value, leading to a common pattern where we declare the property twice:

```css
overflow: hidden;
overflow: clip;
```

Browsers that don’t support the `clip` keyword will discard the entire declaration and use `hidden` instead.

Unfortunately, custom properties don’t work like this.

When parsing a custom property or its matching `var()` function, the browser doesn’t know if it’s valid until it comes time to compute its value. So instead they are treated as *always* valid, and any previous declarations get discarded.

::: note

If you want to prevent a custom property from being overwritten, you’ll have to [<FontIcon icon="fas fa-globe"/>mark it as important](https://css-tricks.com/the-surprising-behavior-of-important-in-css-custom-property-values/).

:::

That means `--color: green;` gets discarded immediately upon discovering `--color: notacolor;`, and `color: red;` is discarded when we get to `color: var(--notacolor, blue);`.

In the end, our CSS computes to:

```css
color: notacolor;
```

Unsurprisingly, this isn’t valid, and that’s why we get black as our color.

<CodePen
  user="matthewmorete"
  slug-hash="wBvzxab"
  title="Custom Property Broken Fallbacks"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## What We Can Do Instead

That all sounds bad but we actually have several options for writing fallbacks that work.

### `@property`

As mentioned before, if a registered custom property is invalid, it’ll always use its initial-value, which means we can use that as our fallback:

```css
@property --color {
  syntax: '<color>';
  inherits: true;
  initial-value: purple;
}

:root {
  --color: notacolor;
  color: var(--color); 
}
```

Exactly what we want, though:

- We can only define a single fallback for the entire document (which can be good enough depending on how your custom properties are organised).
- The intent isn’t very obvious, registering a property is a roundabout way of setting a fallback.

If that’s not a problem for you and/or you’re registering your properties anyway, this is a great option.

### `@supports`

Using `@supports` lets us check our value is valid before declaring it and that gives us even more flexibility in how we define our fallbacks. Let’s look at two ways to use it:

Set a safe value first, and then inside an `@supports` block we can redeclare the property:

```scss
:root {
  --color: red;
}

@supports (color: notacolor) {
  :root {
    --color: notacolor;
  }
}
```

Then we can just use it anywhere we like, without having to think about the fallback:

```css
p {
  color: var(--color);
}
```

We can set it and forget it, confident that when our value isn’t supported we’ll still have our previous declaration to fall back on. 9 out of 10 times this is what I reach for.

Alternatively, let’s skip setting a safe value, and only define the property inside `@supports`:

```css
@supports (color: notacolor) {
  :root {
    --color: notacolor;
  }
}
```

Where’s our fallback? Well, since our property only gets declared when it’s supported, we can use the 2nd parameter of `var()` to write our fallback inline:

```css
p {
  color: var(--color, red);
}
```

If you find yourself wanting to use different fallbacks for the same custom property, this could be a better option.

---

## The Future

Eventually, we’ll have even more options for dealing with invalid values.

New CSS goodies like like the keyword `revert-rule` and the `first-valid()` function will let us do away with `@supports` and write our fallbacks wherever we want:

```css
:root {
  /* Multiple inline fallbacks when declaring the property */
  --color: first-valid(notacolor, maybeacolor, red);
}

p {
  /* Fallback to a different rule when using the variable */
  color: first-valid(var(--color), revert-rule);
}
```

You can follow their progress on GitHub:

- [Discussion (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10443) resulting in the `revert-rule` keyword resolution.
- [Discussion (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5055) resulting in `first-valid()` resolution.

::: info Further Learning

<SiteInfo
  name="Master CSS Custom Properties (CSS Variables)"
  desc="Create reusable components without any JavaScript dependencies needed - with only vanilla CSS! Master CSS custom properties AKA CSS variables. "
  url="https://frontendmasters.com/courses/css-variables/"
  logo="https://frontendmasters.com/favicon-16x16.png"
  preview="https://static.frontendmasters.com/assets/courses/2021-11-09-css-variables/posterframe.jpg"/>

<SiteInfo
  name="CSS Custom Properties Fail Without Fallback · Matthias Ott"
  desc="Matthias Ott is an independent user experience designer and developer from Stuttgart, Germany. Besides design practice he teaches Interface Prototyping at the Muthesius Academy of Fine Arts and Design, Kiel."
  url="https://matthiasott.com/notes/css-custom-properties-fail-without-fallback/"
  logo="https://matthiasott.com//favicon.ico?v=00rKnA7O762"
  preview="https://matthiasott.com//android-chrome-384x384.png?v=00rKnA7O762"/>

<SiteInfo
  name="CSS Custom Properties Guide | CSS-Tricks"
  desc="Everything important and useful to know about CSS Custom Properties. Like that they are often referred to as ”CSS Variables” but that's not their real name."
  url="https://css-tricks.com/a-complete-guide-to-custom-properties/"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/09/custom-properties-code.png"/>

<SiteInfo
  name="Josh W. Comeau (@joshwcomeau.com)"
  desc="🌠 The linear() timing function allows us to embed lush spring physics inside vanilla CSS. It’s one of my favourite modern features. But: providing a fallback for older browsers has been pretty painful. I just discovered a lovely pattern for this. ✨Here’s the code. Description in thread. 🧵"
  url="https://bsky.app/profile/joshwcomeau.com/post/3li3r6i7dac2w/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:zivbusxwcsom5o6mf7kljzms/bafkreibrhjiu6ufbtj33o26kscopineht7l5cmmpuczysmr5fipfkycktu@jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom Property Fallbacks",
  "desc": "This post starts with quite a tricky little quiz about what a color value resolves to be.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-property-fallbacks.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
