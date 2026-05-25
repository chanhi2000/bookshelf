---
lang: en-US
title: "The Fundamentals and Dev Experience of CSS @function"
description: "Article(s) > The Fundamentals and Dev Experience of CSS @function"
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
      content: "Article(s) > The Fundamentals and Dev Experience of CSS @function"
    - property: og:description
      content: "The Fundamentals and Dev Experience of CSS @function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-fundamentals-and-dev-experience-of-css-function.html
prev: /programming/css/articles/README.md
date: 2026-05-29
isOriginal: false
author:
  - name: Jane Ori
    url: https://frontendmasters.com/blog/author/janeori/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9750
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
  name="The Fundamentals and Dev Experience of CSS @function"
  desc="There are quite a few "
  url="https://frontendmasters.com/blog/the-fundamentals-and-dev-experience-of-css-function/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/9750"/>

CSS has introduced [<VPIcon icon="fa-brands fa-firefox"/>functions](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@function) so authors can encapsulate and reuse property behaviors across their style sheets without duplicating the code or polluting the DOM with single-use intermediate `--_variables`[^1].

[^1]: CSS Library and Component Authors have long used the convention of underscores before or after a prefix on CSS variables to distinguish private/internal behavior vs dev-user exposed API variables. Now, we have an official lane for private variables! 🎉

There are a lot of really cool and useful things we can do with functions. In this fundamentals article, we will go over several CSS gotchas that form the bumpers on our bowling lane for the strike we’ll hit in the follow-up, and get a good sense of what they are and what they aren’t.

![Image of a bowling lane with bumpers and a bowling ball edited on top of it with arrows bouncing in a zig-zag off of the rails 3 times before hitting the center of the pins likely for a strike](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/05/ZlIhRzHQ.png?resize=686%2C386&ssl=1)

This is a custom CSS function:

```css
@function --hello-world() {
  result: "Hello World";
}
```

And this is how you call it:

```css
body::after {
  content: --hello-world() "!";
}
```

<CodePen
  link="https://codepen.io/propjockey/pen/yyVgvvR/3cdffc9dc28eada507e521f31efda2af"
  title="CSS Custom Functions - Hello World"
  :default-tab="['css','result']"
  :theme="dark"/>

Soon, but not yet, we will be able to set multiple different properties with distinct values from a single function call by returning a comma-separated result and splitting it into multiple properties.

::: note Gotcha

For now, functions can only return a **single property value** (or just *part* of one).

:::

If you set the value of a `--variable` by calling a custom function, you can reference that `--variable` any number of times and copy the same singular result wherever you need it.

---

## Function Encapsulation

You can set intermediate variables inside the function to help with the final result:

```css
@function --the-answer() {
  --a: 4px;
  --b: 10;
  --c: 2px;
  result: calc(var(--a) * var(--b) + var(--c));
}
```

Those intermediate variables do not leak onto the element; they are internal, private variables:

```css
body {
  padding: --the-answer();
  /* --a, --b, and --c are NOT defined here! */
}
```

::: note Gotcha

Custom properties within functions are so private that not even the global registration can type them.

:::

```css
@property --a {
  syntax: "<color>";
  initial-value: hotpink;
  inherits: true;
}

@function --the-answer() {
  --a: 4px; /* uses the value 4px and doesn't break */
  --b: 10;
  --c: 2px;
  result: calc(var(--a) * var(--b) + var(--c));
}

body {
  padding: --the-answer();
  --a: 4px;
  background: var(--a);
}
```

The body’s `padding` is `42px` and the background is `hotpink`.

---

## Function Arguments

You can call functions with arguments:

```css
body {
  padding: --the-answer(99);
}
```

::: note Gotcha

The function above fails silently instead of a more friendly DX that leaves you with *something* to debug. **You cannot call a function with more parameters than the `@function` defined.**

:::

They might, hopefully, improve the DX here and instead just ignore extra parameters in the future! 🤞👽

Fortunately, defining any number of arguments is easy:

```css
@function --the-answer(--arg1, --arg2, --arg3) {
  --a: 4px;
  --b: calc(var(--arg1) - var(--arg1) + 10);
  --c: 2px;
  result: calc(var(--a) * var(--b) + var(--c));
}
```

::: note Gotcha

If you call a function with *too few* arguments, it also fails silently instead of leaving you with *something* to debug.

:::

But, you can give the arguments default values, *and then they become optional*:

```css
@function --the-answer(--required, --arg2: 0px, --arg3: initial) {
  --a: 4px;
  --b: calc(var(--required) - var(--required) + 10);
  --c: calc(clamp(1px, round(var(--arg2)), 1px) * 2);

  result: calc(var(--a) * var(--b) + var(--c));
}

body {
  padding: --the-answer(99);
}
```

The body’s `padding` is a resilient `42px`.

The `initial` value is particularly useful as a default because it allows you to use `var(--arg3, fallbacks)` in the implementation and branch the behavior.

*It would be great if* `initial` *became the default argument instead of the silent-failure DX.*

You could also branch by using `if(style())` on the arguments [**with several more gotchas**](/css-tip.com/if-trick.md).

---

## Argument Typing and Fake Arguments for Typed Encapsulation

You can specify argument types, and as a hack before official alternatives, intentionally add superfluous, undocumented, unused, typed parameters (with defaults) to have pseudo-registered var behavior inside the function (since the global registration doesn’t reach inside):

```css
@function --divide-by-3(--a <number>, --_pi-ish <integer>: -1) {
  --_pi-ish: calc(3.14);
  /* ^ becomes 3 because it's an integer type */

  result: calc(var(--a) / var(--_pi-ish));
}
```

Typed vars inside a function have a critically fantastic benefit over the usual registered var – they become `initial` if the value doesn’t compute into the specified type, **which means you can use computed fallbacks**!

::: note Gotcha

In the global behavior, a registered variable referenced with the `var()` function causes the `var()` fallback to become *unreachable*. 😵‍💫🪦

```css
@property --a {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

body {
  --a: pizza;
  --divide-by: 3;

  opacity: var(--a,
    calc(
      1 / var(--divide-by)
    )
  );
}
```

Opacity resolved to 0 because the `calc()` in the fallback is unreachable.

Compare this to a custom function implementation:

```css
@function --opacity(--a <number>, --divide-by <integer>: -1) {
  --divide-by: calc(3.14);
  result: var(--a, calc(1 / var(--divide-by)));
}
body {
  opacity: --opacity(pizza);
}
```

Opacity resolves to `0.3333` because `pizza` isn’t a number so `--a` became `initial` and the fallback `calc()` was executed instead.

::: note Gotcha

Without that `calc()` wrapping `3.14`, an `integer`-typed argument will fail to `initial` *because the decimal syntax is rejected as non-integer* before computed value time.

```css
@function --opacity(--a <number>, --divide-by <integer>: -1) {
  --divide-by: 3.14;

  result: var(--a, calc(1 / var(--divide-by, 2)));
}
body {
  opacity: --opacity(pizza);
}
```

Opacity resolves to `0.5` because `pizza` isn’t a number so `--a` became `initial`, the fallback `calc()` was executed, and `--divide-by` also used its fallback of `2` because the `3.14` assignment failed.

---

## Comma-Separated Arguments

::: note Gotcha

The only place in all of CSS where a variable doesn’t effectively expand in place is in the parameters when calling a **custom** function.

```css
body {
  --rgb: 0, 255, 0;
  background: rgb(var(--rgb));
}
```

The background is bright green.

```css
@function --rgbFn(--r, --g, --b) {
  result: rgb(var(--r), var(--g), var(--b));
}

body {
  --rgb: 0, 255, 0;
  background: --rgbFn(var(--rgb));
}
```

The function call failed because all 3 parameters were stuffed into the –r argument. [I am very hopeful this will be fixed (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/13927#issue-4449327153).

::: note Gotcha

There is an implemented syntax to deliberately cause anti-spreading by wrapping them in curly braces.

```css
@function --rgbFn(--rgbArg) {
  result: rgb(var(--rgbArg));
}

body {
  --r: 0;
  --g: 255;
  --b: 0;
  background: --rgbFn({ var(--r), var(--g), var(--b) });
}
```

The background is bright green. For consistency, it was originally planned *and briefly even implemented by Anders of the Chrome team* (who has implemented almost every awesome feature I’ve played with over the years!) that comma-separated `var()` values auto-spread just like normal, so you would wrap `var()` with the braces intentionally for the same anti-spread effect.

```css
@function --rgbFn(--rgbArg) {
  result: rgb(var(--rgbArg));
}
body {
  --rgb: 0, 255, 0;
  background: --rgbFn({ var(--rgb) });
}
```

The background is bright green.

This anti-spread around variables *is* still implemented, so it would be a great idea to wrap your comma-separated `var()` arguments (csvarguments) in curly braces ahead of the restoration/fix if they move forward with it. Though apart from [<VPIcon icon="fas fa-globe"/>a custom repeat function](https://propjockey.github.io/doubledash.css/#repeat) and a [<VPIcon icon="fas fa-globe"/>custom loop function](https://propjockey.github.io/doubledash.css/#loop), there are currently no use — because there is no processing possible yet — and so it must be used as-is. That is, there is no functionality a standard `--var` can’t already do to a csvargument, making it pointless to pass to a custom function. So you probably haven’t done that yet.

Once csvarguments spread for calling custom functions like they do for calling standard functions (and like they do for *everything else in CSS*), we will have ***hundreds*** of new possibilities available to us, including returning multiple values from a single function call since we could trivially make an `--nth-item()` function to pick each piece returned from a list.

```css
@function --nth-item(--nth, --p0, --p1) {
  result: if(
    style(--nth: 0): var(--p0);
    style(--nth: 1): var(--p1);
    else: black;
  );
}

body {
  --x: 1;
  --arrayOfArgs: skyblue, lime;
  --bg: --nth-item(var(--x), var(--arrayOfArgs));
  background-color: var(--bg);
}
```

---

That’s the majority of our lane! We’re a bit in the weeds of the CaveatSandStorm but if you have followed this and can navigate these behaviors, you’re *far, far* along the path to mastering CSS variables *and scraping the potential of custom CSS functions*.

---

## Function Results

Here are a few more notes for the foundation of custom CSS functions. We can also specify the type of the `result` with a `returns` directive after the arguments:

```css
@function --opacity(--a <number>, --divide-by <integer>: -1) returns <number> {
  --divide-by: calc(3.14);
  result: var(--a, calc(1 / var(--divide-by, 2)));
}
body {
  opacity: --opacity(pizza); /* 0.3333 */
}
```

::: note Gotcha

Like the arguments, if your `result` doesn’t match the `return` type, your function will return `initial`.

:::

Functions can call other functions.

::: note Gotcha

Functions can’t currently call themselves. No recursion is allowed because CSS treats it as cyclic and fails to `initial`.

:::

::: note Gotcha

Functions can return a value **and you** **_can’t_** **pass that value back into the same function** elsewhere. This [<VPIcon icon="fas fa-globe"/>feels like a bug](https://issues.chromium.org/issues/514021797) and is alarming. Until that’s fixed, most math-based custom functions that aren’t trivial calc()s are DOA along with anything empowering dynamic composition. Pre-publish edit: Tab has chimed in on the Chrome technically-not-a-bug that I filed and identified it as a spec-level-bug and [they will fix it soon (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/13943)!

:::

```css
@function --add-a-quarter(--a <number>) returns <number> {
  result: calc(var(--a) + 0.25);
}
body {
  --quarter: --add-a-quarter(0);
  --half: --add-a-quarter(var(--quarter));
  opacity: var(--half);
}
```

`--half` is `initial` 😵‍💫🪦💔 (this will work correctly at a later date!)

---

## The Gotcha Cascade

To review the developer experience of CSS Custom Functions, here are all the gotchas we ran into just covering the basics.

- Soon, but not yet, we will be able to set multiple different values from a single function call.
- Variables internal to a function are so private that not even the global registration can type them.
- Calling a function with too many parameters fails silently instead of returning *something* for you to debug.
- If you call a function with too few arguments and those arguments don’t have default values, it also fails silently instead of leaving you with *something* to debug.
- In the global behavior, a registered variable referenced with the `var()` function causes the `var()` fallback to become *unreachable*.
- Without `calc()` wrapping `3.14` on hardcoded assignment to an `integer` typed argument, it will fail to `initial` *because the decimal syntax is rejected as non-integer* before computed value time.
- [For the moment (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/13927#issue-4449327153), the only place in all of CSS where a variable doesn’t effectively expand in place is in the parameters when calling a **custom** function.
- There is an implemented syntax to deliberately cause anti-spreading of csvarguments by wrapping them in curly braces.
- Like the arguments, if your function `result` doesn’t match its `return` type, your function will return `initial`.
- Functions can’t currently call themselves. No recursion is allowed. CSS treats it as cyclic and fails to `initial`.
- Functions can return a value **and you** **_can’t_** **pass that value back into the same function** elsewhere. This is a spec bug, and is [being fixed by Tab (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/13943)! 🙏

---

## Just the Beginning

Overall, the DX for CSS custom functions, as they are now, is … not good. But there’s a [<VPIcon icon="fas fa-globe"/>ton of potential](https://propjockey.github.io/doubledash.css) and a lot you *can* do now, even if it’s mostly shallow.

That’s the foundation, next time I will dive into what I’m most excited to share with you; **The Scope of CSS @‍function**. Until then, [I invite Open Contact (<VPIcon icon="fa-brands fa-bluesky"/>`janeori.propjockey.io`)](https://bsky.app/profile/janeori.propjockey.io) 💚👽.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Fundamentals and Dev Experience of CSS @function",
  "desc": "There are quite a few ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-fundamentals-and-dev-experience-of-css-function.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
