---
lang: en-US
title: "How to declare and use CSS variables"
description: "Article(s) > (1/9) How to use CSS variables like a pro" 
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/9) How to use CSS variables like a pro"
    - property: og:description
      content: "How to declare and use CSS variables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/how-to-use-css-variables/how-to-declare-and-use-css-variables.html
date: 2025-03-20
isOriginal: false
author:
  - name: Idorenyin Obong
    url : https://blog.logrocket.com/author/idorenyinobong/
cover: /assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to use CSS variables like a pro",
  "desc": "Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites.",
  "link": "/blog.logrocket.com/how-to-use-css-variables/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to use CSS variables like a pro"
  desc="Build four simple projects to learn how CSS variables can help you write reusable, elegant code and streamline the way you build websites."
  url="https://blog.logrocket.com/how-to-use-css-variables#how-to-declare-and-use-css-variables"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/how-to-use-css-variables/banner.png"/>

CSS variables can be declared in two ways (`--` prefix and `@property` at-rule).

---

## `--` prefix

The `--` prefix declares variables in two ways (globally and locally). The former uses the `:root` selector to define global variables:

```css
:root {
  --primary-color: blue;
  --font-size: 16px;
}
```

While the latter defines a variable inside specific elements:

```css
.card {
  --card-bg: lightgray;
  background-color: var(--card-bg);
}
```

Here, `--card-bg` is only accessible inside `.card`. Global variables are accessible everywhere in the stylesheet.

---

## `@property` at-rule

The `@property` at-rule allows you to be more expressive with the definition of CSS variables by allowing you to define their type, control inheritance, and set default values which act as fallback. Using the `@property` at-rule ensures more predictable behavior.

```css
@property --card-color {
  syntax: "<color>";
  inherits: false;
  initial-value: #FFFFFF;
}
```

Here, `--card-color` is declared as a CSS variable that expects `<color>` value. The `inherits:false;` property prevents it from being inherited by child elements, and `initial-value:#FFFFFF;` sets a default color when no `<color>` value is assigned.

---

## How to use variables in CSS

CSS variables can be applied to elements using the `var()` function:

```css
button {
  background-color: var(--primary-color);
  font-size: var(--font-size);
}
```

If the value of `--primary-color` is updated, all the elements using it will automatically change.

---

## CSS variables inheritance

Like traditional CSS properties, CSS variables follow standard property rules — i.e., they inherit, can be overridden, and adhere to the [**CSS specificity algorithm**](/blog.logrocket.com/deep-dive-css-specificity.md). The value of an element is inherited from its parent elements if no custom property is defined in a specific child element, as shown in the following example.

The HTML:

```html
<div class="container">
  <article class="post">
    <h1 class="post-title">Heading text</h1>
    <p class="post-content">Paragraph text</p>
  </article>
</div>
```

The CSS:

```css
.container {
  --padding: 1rem;
}

.post {
  --padding: 1.5rem;
}

.post-content {
  padding: var(--padding);
}
```

In this case, the `.post-content` selector inherits padding value from its direct parent, `.post`, with the value of `1.5rem` rather than `1rem`. You can use Chrome DevTools to see from where the specific CSS variable value gets inherited, as shown in the following preview:

![Screenshot Of Chrome Devtools Showing How The Padding Value Was Inherited From The Article Post Selector](/assets/image/blog.logrocket.com/how-to-use-css-variables/img1-Chrome-DevTools-showing-padding-value-inheritance-behavior.png)

You can use [CSS variable inheritance](https://blog.logrocket.com/css-inheritance-inherit-initial-unset-and-revert/) to pass variable values from parent elements to child elements without re-declaring them in selectors. Also, overriding variable values is possible as traditional CSS properties.

---

## CSS variables cascading

CSS cascade rules handle the precedence of CSS definitions that come from various sources. CSS variables also follow the [standard cascade](https://blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8/) rules as any other standard properties. For example, if you use two selectors with the same specificity score, the variable assignment order will decide the value of a specific CSS variable.
<!-- TODO: /blog.logrocket.com/how-css-works-understanding-the-cascade.md -->

A variable assignment in a new CSS block typically overrides the existing precedence and re-assigns values to variables.

Let’s understand variable cascading rules with a simple example.

The HTML:

```html
<span class="lbl lbl-ok">OK</span>
```

The CSS:

```css
.lbl {
  --lbl-color: #ddd;
  background-color: var(--lbl-color);
  padding: 6px;
}

.lbl-ok { --lbl-color: green }

/* --- more CSS code ---- */
/* ---- */

.lbl-ok { --lbl-color: lightgreen }
```

The above CSS selectors have the same specificity, so CSS uses cascading precedence to select the right `lbl-color` value for elements. Here, we’ll get the `lightgreen` color for the `span` element since `lightgreen` is in the last variable assignment. The color of the label may change based on the order of the above selectors.

CSS variables also work with developer-defined [**cascade layers that use the `@layer` at-rule**](/blog.logrocket.com/control-css-cascade-with-cascade-layers.md). To demonstrate this, we can add some cascade layers to the above CSS snippet:

```css
@layer base, mods;

@layer base {
  .lbl {
    --lbl-color: #ddd;
    background-color: var(--lbl-color);
    padding: 6px;
  }
}

@layer mods {
  .lbl-ok { --lbl-color: lightgreen }
}
```

You can check how cascading rules overwrite variable values with Chrome DevTools:

![Screenshot Of Chrome Devtools Showing How Cascade Rules Affect Css Variables](/assets/image/blog.logrocket.com/how-to-use-css-variables/img2-Chrome-DevTools-showing-cascade-rules-affect-CSS-variables.png)

---

## Fallback and invalid values

When using custom properties, you might reference a custom property that isn’t defined in the document. You can specify a fallback value to be used in place of that value.

The syntax for providing a fallback value is still the `var()` function. Send the fallback value as the second parameter of the `var()` function:

```css
:root {
  --light-gray: #ccc;
}

p {
  color: var(--light-grey, #f0f0f0); /* No --light-grey, so #f0f0f0 is 
  used as a fallback value */
}
```

Did you notice that I misspelled the value `--light-gray`? This should cause the value to be undefined, so the browser loads the fallback value, `#f0f0f0` for the `color` property.

A comma-separated list is also accepted as a valid fallback value. For example, the following CSS definition loads `red, blue` as the fallback value for the gradient function:

```css
background-image: linear-gradient(90deg, var(--colors, red, blue));
```

You can also use variables as fallback values with nested `var()` functions. For example, the following definition loads `#ccc` from `--light-gray` if it’s defined:

```css
color: var(--light-grey, var(--light-gray, #f0f0f0));
```

Note that it’s generally not recommended to nest so many CSS functions due to performance issues caused by nested function parsing. Instead, try to use one fallback value with a readable variable name.

If your web app should work on older web browsers that don’t support custom properties, you can define fallback values outside of the `var()` function as follows:

```css
p {
  color: #f0f0f0; /* fallback value for older browsers */
  color: var(--light-grey); 
}
```

If the browser doesn’t support CSS variables, the first `color` property sets a fallback value. We’ll discuss browser compatibility in the upcoming section about browser support for the CSS variables feature.

Meanwhile, custom properties can get invalid values due to developer mistakes. Let’s learn how the browser handles invalid variable assignments and how to override the default invalid assignment handling behavior:

```css
:root { 
  --text-danger: #ff9500; 
} 

body { 
  --text-danger: 16px;
  color: var(--text-danger); 
} 
```

In this snippet, the `--text-danger` custom property was defined with a value of `#ff9500`. Later, it was overridden with `16px`, which isn’t technically wrong. But when the browser substitutes the value of `--text-danger` in place of `var(--text-danger)`, it tries to use a value of `16px`, which is not a valid property value for color in CSS.

The browser treats it as an invalid value and checks whether the color property is inheritable by a parent element. If it is, it uses it. Otherwise, it falls back to a default color (black in most browsers).

This process doesn’t bring the correct initial value defined in the `:root` selector block, so we have to define custom properties with the accepted type and initial value using the `@property` at-rule, as shown in the following code snippet:

```css
@property --text-danger {
  syntax: "<color>";
  inherits: true;
  initial-value: #ff9500;
}

body { 
  --text-danger: 16px;
  color: var(--text-danger); 
} 
```

Now, the browser renders the expected text color even if we assign an invalid value within the `body` selector.

---

## Creating scoped CSS variables

As discussed in previous examples, it’s possible to create global CSS variables using either `:root` or `@property` at-rule. Also, creating local variables is possible by defining variables inside child element selectors. For example, a variable defined inside `header` won’t be exposed to `body`.

However, if you define a variable inside a specific `<style>` tag, it gets exposed to all elements that match the particular selector. What if you need to create a scoped variable that is only available for a targeted HTML segment?

By default, browsers won’t scope style tags even if we wrap them with elements like `<div>` for creating scoped variables. The `@scope` at-rule helps us implement scoped CSS variables with scoped style tags, as shown in the following HTML snippet:

```html
<style>
  button {
    padding: 6px 18px;
    border: none;
    border-radius: 4px;
    margin: 12px;
    background-color: var(--accent-color, #4cc2e6);
  }
</style>

<div>
  <style>
    @scope {
      button {
        --accent-color: #f2ba2c;
      }
    }
  </style>
  <button>Sample button #1</button>
</div>

<button>Sample button #2</button>
```

Here, the second style tag becomes scoped for the wrapped `<div>` element because of the `@scope` at-rule. So, the `button` selector in the second style tag selects only buttons inside the parent `<div>` element. As a result, `--accent-color` is only available for the first button.

The first button gets the `#f2ba2c` color for the background since the scoped style tag’s `button` selector sets the `--accent-color` variable. The second button gets the `#4cc2e6` fallback background color since the `--accent-color` scoped variable is not available in the global scope:

![Two Sample Html Button Elements Styled In Different Ways With Css: One Using A Scoped Variable, The Other Using A Fallback Value In The Global Css](/assets/image/blog.logrocket.com/how-to-use-css-variables/img3-Two-sample-buttons-styled-scoped-variable-fallback-value.png)

Learn more about the `@scope` at rule from the [<VPIcon icon="fa-brands fa-firefox" />official MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope). `@scope` is still an experimental feature, so you can use the minimal [**`css-scope-inline` library**](/blog.logrocket.com/simplifying-inline-css-scoping-css-scope-inline.md) to create scoped CSS variables in production.

---

## Best practices for structuring CSS variables in projects

### Variables should be grouped logically as follows:

```css
:root {
  /* Colors */
  --primary-color: #3498db;
  --secondary-color: #2ecc71;

  /* Typography */
  --font-size-base: 16px;
  --font-weight-bold: 700;
}
```

### Fallback values should be used to ensure compatibility:

```css
color: var(--text-color, black);
```

If `--text-color` is not defined, `black` will be used as a default.

### Use meaningful names (avoid `--color1`, `--sizeA`)
