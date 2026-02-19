---
lang: en-US
title: "CSS @function + CSS if() = 🤯"
description: "Article(s) > CSS @function + CSS if() = 🤯"
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
      content: "Article(s) > CSS @function + CSS if() = 🤯"
    - property: og:description
      content: "CSS @function + CSS if() = 🤯"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-at-function-and-css-if.html
prev: /programming/css/articles/README.md
date: 2025-02-19
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-with-if.png
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
  name="CSS @function + CSS if() = 🤯"
  desc="Support for Nested Container Queries and the CSS if() function inside CSS Custom Functions make @function very powerful."
  url="https://bram.us/2025/02/18/css-at-function-and-css-if/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-with-if.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-with-if.png)

In [**"CSS Custom Functions are coming … and they are going to be a game changer!"**](/bram.us/css-custom-functions-teaser.md) I took a first look at Chrome’s prototype of Custom Functions (CSS `@function`). Since then the prototype in Chrome got updated with nested container queries support and CSS `if()` also got added … and like I said: it’s a game changer

::: note ⚠️ This post is about an upcoming CSS feature. You can’t use it … yet.

This feature is currently being prototyped in Chrome Canary and can be tested in Chrome Canary with the Experimental Web Platform Features flag enabled.

:::

::: note UPDATE 2025.09.30

In the future, the code shared in this post can be reduced even further, to only 3 lines of code. Check out below for the details.

[**css-custom-light-dark**](/bram.us/css-custom-light-dark.md)

:::

---

## The quest for a `light-dark()` that works with *any* value.

The function I built in [**"CSS Custom Functions are coming … and they are going to be a game changer!"**](/bram.us/css-custom-functions-teaser.md) is a custom `--light-dark()` that can be used to return values depending on whether light or dark mode is being used.

```css
@function --light-dark(--light, --dark) {
  result: var(--light);
  
  @media (prefers-color-scheme: dark) {
    result: var(--dark);
  }
}
```

Unlike [**the built-in `light-dark()`**](/bram.us/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark.md), this custom function is not limited to `<color>` values and works with *any* type of value. But also unlike `light-dark()` it cannot respond to the local `color-scheme` value and can only respond to the light/dark media preference.

<CodePen
  user="bramus"
  slug-hash="EaYBJJx"
  title="Custom CSS Custom Functions: --light-dark()"
  :default-tab="['css','result']"
  :theme="dark"/>

As hinted at the end of the post, this limitation can be removed once support for nested container queries and/or CSS `if()` got added to Chrome … and that day has come!

---

## A custom `--light-dark()` using Container Queries

::: info ℹ️

Because this code uses container queries you always need a wrapper element. [The next section that uses `if()`](#a-custom-light-dark-using-inline-if) does not need this extra wrapper element.

:::

Since my previous post the prototype in Chrome got expanded to also support nested container queries inside custom functions. This opens the path to allowing a per-element light/dark preference, like so:

- Set a preferred color-scheme on an element using a custom property named `--scheme`
- Rework the `--light-dark()` to use a style query to respond to the value of `--scheme`

The possible values for `--scheme` are `light`, `dark`, and `system`. When `--scheme` is set to one of the first two, the `color-scheme` is forced to that value.

The function looks like this:

```css
@function --light-dark(--light, --dark) {
  /* Default to the --light value */
  result: var(--light);
  
  /* If the container is set to "dark", use the --dark value */
  @container style(--scheme: dark) {
    result: var(--dark);
  }
}
```

Inside the `@function`, the `--light` and `--dark` values are passed in as arguments to the function. The `--scheme` custom property however is read from the element on which the function is invoked.

To ensure that there is some value for `--scheme`, I set it on the `:root` depending on the `prefers-color-scheme` value. The `prefers-color-scheme` value is also duplicated into a `--root-scheme` to enable support for a `--scheme` value of `system`, but more on that later.

```css
:root {
  --root-scheme: light;
  --scheme: light;

  @media (prefers-color-scheme: dark) {
    --root-scheme: dark;
    --scheme: dark;
  }
}
```

To allow setting a preferred color scheme on a per-element basis, I resorted to using a `data-scheme` HTML attribute which I parse to a value in CSS using `attr()`. When the value is `light` or `dark` I use the value directly. When the value is `system`, the code uses the `--root-scheme` property value. To play nice with nested light/dark contexts the code uses `@scope`.

```css
/* Allow overriding the --scheme from the data-scheme HTML attribute */
@scope ([data-scheme]) {
  /* Get the value from the attribute */
  :scope {
    --scheme: attr(data-scheme type(<custom-ident>));
  }
  
  /* When set to system, use the --root-scheme value (which is determined by the MQ) */
  :scope[data-scheme="system"] {
    --scheme: var(--root-scheme);
  }
  
  /* This allows the native light-dark() to work as well */
  :scope > * {  
    color-scheme: var(--scheme);
  }
  
  /* Because the elements with the attribute are extra wrapper elements, we can just display its contents */
  display: contents;
}
```

To learn about this `attr()`, go read [**CSS `attr()` gets an upgrade**](/bram.us/css-attr-gets-an-upgrade.md). As for `@scope`, it’s sufficient to read [**the quick intro on `@scope`**](/bram.us/a-quick-introduction-to-css-scope.md).

With all pieces in place it’s time to use it.

In CSS:

```css
[data-scheme] > * {
  color: light-dark(#333, #e4e4e4);
  background-color: light-dark(aliceblue, #333);
  
  border: 4px --light-dark(dashed, dotted) currentcolor;
  font-weight: --light-dark(500, 300);
  font-size: --light-dark(16px, 18px);
  
  transition: all 0.25s ease, border-style 0.25s allow-discrete;
}
```

In HTML:

```html
<div data-scheme="light">
  <div class="stylable-thing">
    …
  </div>
</div>
```

Here’s a live demo. Remember that you need Chrome Canary with the Experimental Web Platform Features Flag to see the code in action.

<CodePen
  user="bramus"
  slug-hash="xbxGOdw"
  title="Custom CSS Custom Functions + Nested Style Queries (+ attr()): --light-dark()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## A custom `--light-dark()` using Inline `if()`

As of Chrome Canary 135.0.7022.0 the [<VPIcon icon="iconfont icon-w3c"/>inline `if()`](https://drafts.csswg.org/css-values-5/#if-notation) is also available behind the Experimental Web Platform Features flag. Thanks to this function you can omit the extra container element that the container queries approach needs, as you can conditionally select a value directly in a declaration.

Because the `if()` function also accepts style queries as one of the conditions, the overall approach remains the same: use a custom property and respond to its value. The resulting code however is much much shorter:

```css
@function --light-dark(--light, --dark) {
  result: if(
    style(--scheme: dark): var(--dark);
    else: var(--light)
  );
}
```

Side note: Did you know inline `if()` can accept multiple conditions? Like so:

```css
color: if(
  style(--scheme: dark): var(--dark-color);
  style(--scheme: dim): var(--dim-color);
  else: var(--light)
);
```

That type of usage is beyond the scope of this post, though.

The code to set `--scheme` to `light` or `dark` also is shorter, as it’s more easy to fall back to the `--root-scheme` value.

```css
:root {
  --root-scheme: light;
  --scheme: light;

  @media (prefers-color-scheme: dark) {
    --root-scheme: dark;
    --scheme: dark;
  }
}  

@scope ([data-scheme]) {
  :scope {
    --scheme-from-attr: attr(data-scheme type(<custom-ident>));
    --scheme: if(
      style(--scheme-from-attr: system): var(--root-scheme);
      else: var(--scheme-from-attr)
    );
    color-scheme: var(--scheme); /* To make the native light-dark() work */
  }
}
```

Usage remains the same as before, with the difference that you can set the color-scheme dependent styles directly on the `[data-scheme]` element.

```css
[data-scheme] {
  color: light-dark(#333, #e4e4e4);
  background-color: light-dark(aliceblue, #333);
  
  border: 4px --light-dark(dashed, dotted) currentcolor;
  font-weight: --light-dark(500, 300);
  font-size: --light-dark(16px, 18px);
  
  transition: all 0.25s ease, border-style 0.25s allow-discrete;
}
```

```html
<div class="stylable-thing" data-scheme="light">
  …
</div>
```

Here’s a live demo to check out:

<CodePen
  user="bramus"
  slug-hash="wBvKVpR"
  title="Custom CSS Custom Functions + Nested inline if() (+ attr()): --light-dark() "
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Conclusion

I was already very much excited about CSS Custom Functions by itself. Combining it with inline `if()` takes that to even a higher level.

Expressed through the [<VPIcon icon="fas fa-globe"/>Galaxy Brain *(aka Expanding Brain)* meme](https://knowyourmeme.com/memes/galaxy-brain), this is how I feel about this:

![The The Galaxy Brain *(aka Expanding Brain)* meme applied to CSS Functions](https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-expanding-brain-meme.jpg)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS @function + CSS if() = 🤯",
  "desc": "Support for Nested Container Queries and the CSS if() function inside CSS Custom Functions make @function very powerful.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-at-function-and-css-if.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
