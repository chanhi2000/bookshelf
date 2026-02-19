---
lang: en-US
title: "It’s Time To Start Using CSS Custom Properties"
description: "Article(s) > It’s Time To Start Using CSS Custom Properties"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - met: - property: og:tit:   content: "Article(s) > It’s Time To Start Using CSS Custom Propertie: - property: og:descripti:   content: "It’s Time To Start Using CSS Custom Propertie: - property: og:u:   content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/start-using-css-custom-properties.html
prev: /programming/css/articles/README.md
date: 2017-04-19
isOriginal: false
author:
  - name: Serg Hospodare: url: https://smashingmagazine.com/author/serghospodarets/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/47f90569-ec87-43bf-91b1-460c5c539739/css-variables-780w-opt.png
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
  name="It’s Time To Start Using CSS Custom Properties"
  desc="In this article, Serg Hospodarets will teach you more about CSS custom properties, including their syntax, their advantages, good usage examples and how to interact with them from JavaScript. You will learn how to detect whether they are supported, how they are different from CSS preprocessor variables, and how to start using native CSS variables until they are supported across browsers. This is the right time to start using CSS custom properties and to prepare for their native support in browsers."
  url="https://smashingmagazine.com/2017/04/start-using-css-custom-properties/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/47f90569-ec87-43bf-91b1-460c5c539739/css-variables-780w-opt.png"/>

In this article, Serg Hospodarets will teach you more about CSS custom properties, including their syntax, their advantages, good usage examples and how to interact with them from JavaScript. You will learn how to detect whether they are supported, how they are different from CSS preprocessor variables, and how to start using native CSS variables until they are supported across browsers. This is the right time to start using CSS custom properties and to prepare for their native support in browsers.

Today, CSS preprocessors are a standard for web development. One of the main advantages of preprocessors is that they enable you to use variables. This helps you to avoid copying and pasting code, and it simplifies development and refactoring.

We use preprocessors to store colors, font preferences, layout details — mostly everything we use in CSS.

::: note A Detailed Introduction To Custom Elements

You’ve probably heard about Web Components and how they’re going to change Web development forever. The most transformative technology of is Custom Elements, a method of defining your own elements, with their own behavior and properties. [**Read the introduction →**](/smashingmagazine.com/introduction-to-custom-elements.md)

```component VPCard
{
  "title": "A Detailed Introduction To Custom Elements",
  "desc": "Web Components are a suite of connected technologies aimed at making elements reusable across the Web. The lion’s share of the conversation has been around Shadow DOM, but probably the most transformative technology of the suite is Custom Elements, **a method of defining your own elements**, with their own behavior and properties.",
  "link": "/smashingmagazine.com/introduction-to-custom-elements.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

But preprocessor variables have some limitations:

- You cannot change them dynamically.
- They are not aware of the DOM’s structure.
- They cannot be read or changed from JavaScript.

As a silver bullet for these and other problems, the community invented CSS custom properties. Essentially, these look and work like CSS variables, and the way they work is reflected in their name.

Custom properties are opening new horizons for web development.

:::

---

## Syntax To Declare And Use Custom Properties

The usual problem when you start with a new preprocessor or framework is that you have to learn a new syntax.

Each preprocessor requires a different way of declaring variables. Usually, it starts with a reserved symbol — for example, `$` in Sass and `@` in LESS.

CSS custom properties have gone the same way and use `-​-` to introduce a declaration. But the good thing here is that you can learn this syntax once and reuse it across browsers!

You may ask, “Why not reuse an existing syntax?”

[<VPIcon icon="fas fa-globe"/>There is a reason](https://xanthir.com/blog/b4KT0). In short, it’s to provide a way for custom properties to be used in any preprocessor. This way, we can provide and use custom properties, and our preprocessor will not compile them, so the properties will go directly to the outputted CSS. *And*, you can reuse preprocessor variables in the native ones, but I will describe that later.

(Regarding the name: Because their ideas and purposes are very similar, sometimes custom properties are called the CSS variables, although the correct name is CSS custom properties, and reading further, you will understand why this name describes them best.)

So, to declare a variable instead of a usual CSS property such as `color` or `padding`, just provide a custom-named property that starts with `-​-`:

```css
.box{
  --box-color: #4d4e53;
  --box-padding: 0 10px;
}
```

The value of a property may be any valid CSS value: a color, a string, a layout value, even an expression.

Here are examples of valid custom properties:

```css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);

  /* Valid CSS custom properties can be reused later in, say, JavaScript. */
  --foo: if(x > 5) this.width = 10;
}
```

In case you are not sure what [<VPIcon icon="fa-brands fa-firefox"/>`:root`](https://developer.mozilla.org/en-US/docs/Web/CSS/:root) matches, in HTML it’s the same as `html` but with a higher specificity.

As with other CSS properties, custom ones cascade in the same way and are dynamic. This means they can be changed at any moment and the change is processed accordingly by the browser.

To use a variable, you have to use the `var()` CSS function and provide the name of the property inside:

```css
.box {
  --box-color:#4d4e53;
  --box-padding: 0 10px;

  padding: var(--box-padding);
}

.box div {
  color: var(--box-color);
}
```

### Declaration And Use Cases

The `var()` function is a handy way to provide a default value. You might do this if you are not sure whether a custom property has been defined and want to provide a value to be used as a fallback. This can be done easily by passing the second parameter to the function:

```css
.box {
  --box-color:#4d4e53;
  --box-padding: 0 10px;

  /* 10px is used because --box-margin is not defined. */
  margin: var(--box-margin, 10px);
}
```

As you might expect, you can reuse other variables to declare new ones:

```css
.box {
  /* The --main-padding variable is used if --box-padding is not defined. */
  padding: var(--box-padding, var(--main-padding));
  --box-text: 'This is my box';
  /* Equal to --box-highlight-text:'This is my box with highlight'; */
  --box-highlight-text: var(--box-text)' with highlight';
}
```

---

## Operations: `+`, `-`, `*`, `/`

As we got accustomed to with preprocessors and other languages, we want to be able to use basic operators when working with variables. For this, CSS provides a `calc()` function, which makes the browser recalculate an expression after any change has been made to the value of a custom property:

```css
:root {
  --indent-size: 10px;

  --indent-xl: calc(2*var(--indent-size));
  --indent-l: calc(var(--indent-size) + 2px);
  --indent-s: calc(var(--indent-size) - 2px);
  --indent-xs: calc(var(--indent-size)/2);
}
```

A problem awaits if you try to use a unit-less value. Again, `calc()` is your friend, because without it, it won’t work:

```css
:root {
  --spacer: 10;
}

.box{
  padding: var(--spacer)px 0; /* DOESN'T work */
  padding: calc(var(--spacer)*1px) 0; /* WORKS */
}
```

---

## Scope And Inheritance

Before talking about CSS custom property scopes, let’s recall JavaScript and preprocessor scopes, to better understand the differences.

We know that with, for example, JavaScript variables (`var`), a scope is limited to the functions.

We have a similar situation with `let` and `const`, but they are block-scope local variables.

A `closure` in JavaScript is a function that has access to the outer (enclosing) function’s variables — the scope chain. The closure has three scope chains, and it has access to the following:

- its own scope (i.e. variables defined between its braces),
- the outer function’s variables,
- the global variables.

![[<VPIcon icon="fas fa-file-image"/>View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/03f35b18-9242-44ff-ad9c-9654f11ce4e1/closure-large-opt.png)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a5bce548-b21c-47d5-aa43-fb9494cb7984/closure-780w-opt.png)

The story with preprocessors is similar. Let’s use Sass as an example because it’s probably the most popular preprocessor today.

With Sass, we have two types of variables: local and global.

A global variable can be declared outside of any selector or construction (for example, as a mixin). Otherwise, the variable would be local.

Any nested blocks of code can access the enclosing variables (as in JavaScript).

![<VPIcon icon="fas fa-file-image"/>[View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/2834d9ac-ffa2-4f7c-974a-dcd90b5877d2/closure-scss-large-opt.png)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/840f3a8d-2ae9-43bc-af67-7d6ce28d1d3f/closure-scss-780w-opt.png)

This means that, in Sass, the variable’s scopes fully depend on the code’s structure.

However, CSS custom properties are inherited by default, and like other CSS properties, they cascade.

You also cannot have a global variable that declares a custom property outside of a selector — that’s not valid CSS. The global scope for CSS custom properties is actually the `:root` scope, whereupon the property is available globally.

Let’s use our syntax knowledge and adapt the Sass example to HTML and CSS. We’ll create a demo using native CSS custom properties. First, the HTML:

```xml
global
<div class="enclosing">
  enclosing
  <div class="closure: closure
  </div>
</div>
```

And here is the CSS:

```css
:root {
  --globalVar: 10px;
}

.enclosing {
  --enclosingVar: 20px;
}

.enclosing .closure {
  --closureVar: 30px;

  font-size: calc(var(--closureVar) + var(--enclosingVar) + var(--globalVar));
  /* 60px for now */
}
```

<CodePen
  user="malyw"
  slug-hash="MJmebz"
  title="css-custom-properties-time-to-start-using 1"
  :default-tab="['css','result']"
  :theme="dark"/>

### Changes To Custom Properties Are Immediately Applied To All Instances

So far, we haven’t seen how this is any different from Sass variables. However, let’s reassign the variable after its usage:

In the case of Sass, this has no effect:

```scss
.closure {
  $closureVar: 30px; // local variable
  font-size: $closureVar +$enclosingVar+ $globalVar;
  // 60px, $closureVar: 30px is used

  $closureVar: 50px; // local variable
}
```

<CodePen
  user="malyw"
  slug-hash="bgWerv"
  title="css-custom-properties-time-to-start-using 3"
  :default-tab="['css','result']"
  :theme="dark"/>

But in CSS, the calculated value is changed, because the `font-size` value is recalculated from the changed `–closureVar` value:

```css
.enclosing .closure {
  --closureVar: 30px;

  font-size: calc(var(--closureVar) + var(--enclosingVar) + var(--globalVar));
  /* 80px for now, --closureVar: 50px is used */

  --closureVar: 50px;
}
```

<CodePen
  user="malyw"
  slug-hash="WRjxOy"
  title="css-custom-properties-time-to-start-using 2"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s the first huge difference: If you reassign a custom property’s value, the browser will **recalculate all variables and `calc()` expressions** where it’s applied.

### Preprocessors Are Not Aware Of The DOM’s Structure

Suppose we wanted to use the default `font-size` for the block, except where the `highlighted` class is present.

Here is the HTML:

```xml
<div class="default">
  default
</div>

<div class="default highlighted">
  default highlighted
</div>
```

Let’s do this using CSS custom properties:

```css
.highlighted {
  --highlighted-size: 30px;
}

.default {
  --default-size: 10px;

  /* Use default-size, except when highlighted-size is provided. */
  font-size: var(--highlighted-size, var(--default-size));
}
```

Because the second HTML element with the `default` class carries the `highlighted` class, properties from the `highlighted` class will be applied to that element.

In this case, it means that `–highlighted-size: 30px;` will be applied, which in turn will make the `font-size` property being assigned use the `–highlighted-size`.

Everything is straightforward and works:

<CodePen
  user="malyw"
  slug-hash="ggWMvG"
  title="css-custom-properties-time-to-start-using 4"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, let’s try to achieve the same thing using Sass:

```scss
.highlighted {
  $highlighted-size: 30px;
}

.default {
  $default-size: 10px;

  /* Use default-size, except when highlighted-size is provided. */
  @if variable-exists(highlighted-size): font-size: $highlighted-size;
  }
  @else: font-size: $default-size;
  }
}
```

The result shows that the default size is applied to both:

<CodePen
  user="malyw"
  slug-hash="PWmzQO"
  title="css-custom-properties-time-to-start-using 5"
  :default-tab="['css','result']"
  :theme="dark"/>

This happens because all Sass calculations and processing happen at compilation time, and of course, it doesn’t know anything about the DOM’s structure, relying fully on the code’s structure.

As you can see, custom properties have the advantages of variables scoping and add the usual cascading of CSS properties, being aware of the DOM’s structure and following the same rules as other CSS properties.

The second takeaway is that CSS custom properties are **aware of the DOM’s structure and are dynamic**.

---

## CSS-Wide Keywords And The `all` Property

CSS custom properties are subject to the same rules as the usual CSS custom properties. This means you can assign any of the common CSS keywords to them:

- `inherit`: This CSS keyword applies the value of the element’s parent.
- `initial`: This applies the initial value as defined in the CSS specification (an empty value, or nothing in some cases of CSS custom properties).
- `unset`: This applies the inherited value if a property is normally inherited (as in the case of custom properties) or the initial value if the property is normally not inherited.
- `revert`: This resets the property to the default value established by the user agent’s style sheet (an empty value in the case of CSS custom properties).

Here is an example:

```css
.common-values{
  --border: inherit;
  --bgcolor: initial;
  --padding: unset;
  --animation: revert;
}
```

Let’s consider another case. Suppose you want to build a component and want to be sure that no other styles or custom properties are applied to it inadvertently (a modular CSS solution would usually be used for styles in such a case).

But now there is another way: to use the [<VPIcon icon="fa-brands fa-firefox"/>`all` CSS property](https://developer.mozilla.org/en/docs/Web/CSS/all). This shorthand resets all CSS properties.

Together with CSS keywords, we can do the following:

```css
.my-wonderful-clean-component{
  all: initial;
}
```

This reset all styles for our component.

Unfortunately, the `all` keyword [<VPIcon icon="iconfont icon-w3c"/>doesn’t reset custom properties](https://drafts.csswg.org/css-variables/#defining-variables). There is an ongoing [discussion about whether to add the `-​-` prefix (<VPIcon icon="iconfont icon-github"/>`w3c/webcomponents`)](https://github.com/w3c/webcomponents/issues/300#issuecomment-144551648), which would reset all CSS custom properties.

So, in future, a full reset might be done like this:

```css
.my-wonderful-clean-component{
  --: initial; /* reset all CSS custom properties */
  all: initial; /* reset all other CSS styles */
}
```

---

## CSS Custom Properties Use Cases

There are many uses of custom properties. I will show the most interesting of them.

### Emulate Non-Existent CSS Rules

The name of these CSS variables is “custom properties,” so why not to use them to emulate non-existent properties?

There are many of them: `translateX/Y/Z`, `background-repeat-x/y` (still not cross-browser compatible), `box-shadow-color`.

Let’s try to make the last one work. In our example, let’s change the box-shadow’s color on hover. We just want to follow the DRY rule (don’t repeat yourself), so instead of repeating `box-shadow`’s entire value in the `:hover` section, we’ll just change its color. Custom properties to the rescue:

```css
.test {
  --box-shadow-color: yellow;
  box-shadow: 0 0 30px var(--box-shadow-color);
}

.test:hover {
  --box-shadow-color: orange;
  /* Instead of: box-shadow: 0 0 30px orange; */
}
```

<CodePen
  user="malyw"
  slug-hash="KzZXRq"
  title="Emulating “box-shadow-color” CSS property using CSS Custom Properties"
  :default-tab="['css','result']"
  :theme="dark"/>

### Color Themes

One of the most common use cases of custom properties is for color themes in applications. Custom properties were created to solve just this kind of problem. So, let’s provide a simple color theme for a component (the same steps could be followed for an application).

Here is the [code for our button component (<VPIcon icon="fa-brands fa-codepen" />`malyw`)](https://codepen.io/malyw/pen/XpRjNK):

```css
.btn {
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  text-shadow: 1px 1px 3px #777;
  box-shadow: 0px 1px 3px #777;
  border-radius: 28px;
  color: #ffffff;
  padding: 10px 20px 10px 20px;
}
```

Let’s assume we want to invert the color theme.

The first step would be to extend all of the color variables to CSS custom properties and rewrite our component. So, the [result would be the same (<VPIcon icon="fa-brands fa-codepen" />`malyw`)](https://codepen.io/malyw/pen/EZmgmZ):

```css
.btn {
  --shadow-color: #777;
  --gradient-from-color: #3498db;
  --gradient-to-color: #2980b9;
  --color: #ffffff;

  background-image: linear-gradien: to botto: var(--gradient-from-color: var(--gradient-to-color)
  );
  text-shadow: 1px 1px 3px var(--shadow-color);
  box-shadow: 0px 1px 3px var(--shadow-color);
  border-radius: 28px;
  color: var(--color);
  padding: 10px 20px 10px 20px;
}
```

This has everything we need. With it, we can override the color variables to the inverted values and apply them when needed. We could, for example, add the global `inverted` HTML class (to, say, the `body` element) and change the colors when it’s applied:

```css
body.inverted .btn{
  --shadow-color: #888888;
  --gradient-from-color: #CB6724;
  --gradient-to-color: #D67F46;
  --color: #000000;
}
```

Below is a demo in which you can click a button to add and remove a global class:

<CodePen
  user="malyw"
  slug-hash="dNWpRd"
  title="css-custom-properties-time-to-start-using 9"
  :default-tab="['css','result']"
  :theme="dark"/>

This behavior cannot be achieved in a CSS preprocessor without the overhead of duplicating code. With a preprocessor, you would always need to override the actual values and rules, which always results in additional CSS.

With CSS custom properties, the solution is as clean as possible, and copying and pasting is avoided, because only the values of the variables are redefined.

---

## Using Custom Properties With JavaScript

Previously, to send data from CSS to JavaScript, we often had to [<VPIcon icon="fas fa-globe"/>resort to tricks](https://blog.hospodarets.com/passing_data_from_sass_to_js), writing CSS values via plain JSON in the CSS output and then reading it from the JavaScript.

Now, we can easily interact with CSS variables from JavaScript, reading and writing to them using the well-known `.getPropertyValue()` and `.setProperty()` methods, which are used for the usual CSS properties:

```js
/**
* Gives a CSS custom property value applied at the element
* element {Element}
* varName {String} without '--'
*
* For example:
* readCssVar(document.querySelector('.box'), 'color');
*/
function readCssVar(element, varName){
  const elementStyles = getComputedStyle(element);
  return elementStyles.getPropertyValue(`--${varName}`).trim();
}

/**
* Writes a CSS custom property value at the element
* element {Element}
* varName {String} without '--'
*
* For example:
* readCssVar(document.querySelector('.box'), 'color', 'white');
*/
function writeCssVar(element, varName, value){
  return element.style.setProperty(`--${varName}`, value);
}
```

Let’s assume we have a list of media-query values:

```css
.breakpoints-data {
  --phone: 480px;
  --tablet: 800px;
}
```

Because we only want to reuse them in JavaScript — for example, in [<VPIcon icon="fa-brands fa-firefox"/>`Window.matchMedia()`](https://developer.mozilla.org/en/docs/Web/API/Window/matchMedia) — we can easily get them from CSS:

```js
const breakpointsData = document.querySelector('.breakpoints-data');

// GET
const phoneBreakpoint = getComputedStyle(breakpointsData)
  .getPropertyValue('--phone');
```

To show how to assign custom properties from JavaScript, I’ve created an interactive 3D CSS cube demo that responds to user actions.

It’s not very hard. We just need to add a simple background, and then place five cube faces with the relevant values for the `transform` property: `translateZ()`, `translateY()`, `rotateX()` and `rotateY()`.

To provide the right perspective, I added the following to the page wrapper:

```css
#world{
  --translateZ: 0;
  --rotateX: 65;
  --rotateY: 0;

  transform-style:preserve-3d;
  transfor: translateZ(calc(var(--translateZ) * 1px: rotateX(calc(var(--rotateX) * 1deg: rotateY(calc(var(--rotateY) * 1deg));
}
```

The only thing missing is the interactivity. The demo should change the X and Y viewing angles (`–rotateX` and `–rotateY`) when the mouse moves and should zoom in and out when the mouse scrolls (`–translateZ`).

Here is the JavaScript that does the trick:

```js
// Events
onMouseMove(e) {
  this.worldXAngle = (.5 - (e.clientY / window.innerHeight)) * 180;
  this.worldYAngle = -(.5 - (e.clientX / window.innerWidth)) * 180;
  this.updateView();
};

onMouseWheel(e) {
  /*…*/

  this.worldZ += delta * 5;
  this.updateView();
};

// JavaScript -> CSS
updateView() {
  this.worldEl.style.setProperty('--translateZ', this.worldZ);
  this.worldEl.style.setProperty('--rotateX', this.worldXAngle);
  this.worldEl.style.setProperty('--rotateY', this.worldYAngle);
};
```

Now, when the user moves their mouse, the demo changes the view. You can check this by moving your mouse and using mouse wheel to zoom in and out:

<CodePen
  user="malyw"
  slug-hash="xgdEQp"
  title="css-custom-properties-time-to-start-using 10"
  :default-tab="['css','result']"
  :theme="dark"/>

Essentially, we’ve just changed the CSS custom properties’ values. Everything else (the rotating and zooming in and out) is done by CSS.

::: tip

One of the easiest ways to debug a CSS custom property value is just to show its contents in CSS generated content (which works in simple cases, such as with strings), so that the browser will automatically show the current applied value:

```css
body:after {
  content: '--screen-category : 'var(--screen-category);
}
```

You can check it in the plain CSS demo (no HTML or JavaScript). (Resize the window to see the browser reflect the changed CSS custom property value automatically.)

:::

---

## Browser Support

CSS custom properties are [<VPIcon icon="iconfont icon-caniuse"/>supported in all major browsers](https://caniuse.com/#feat=css-variables):

![<VPIcon icon="fas fa-file-image"/>[View large version](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/4a6fd2d9-ab90-4059-a355-d17f15c3d1ca/css-variables-large-opt.png)](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/47f90569-ec87-43bf-91b1-460c5c539739/css-variables-780w-opt.png)

This means that, you can start using them natively.

If you need to support older browsers, you can learn the syntax and usage examples and consider possible ways of switching or using CSS and preprocessor variables in parallel.

Of course, we need to be able to detect support in both CSS and JavaScript in order to provide fallbacks or enhancements.

This is quite easy. For CSS, you can use a [<VPIcon icon="fa-brands fa-firefox"/>`@supports` condition](https://developer.mozilla.org/en/docs/Web/CSS/@supports) with a dummy feature query:

```css
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```

In JavaScript, you can use the same dummy custom property with the `CSS.supports()` static method:

```js
const isSupported = window.CSS : window.CSS.supports && window.CSS.supports('--a', 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

As we saw, CSS custom properties are still not available in every browser. Knowing this, you can progressively enhance your application by checking if they are supported.

For instance, you could generate two main CSS files: one with CSS custom properties and a second without them, in which the properties are inlined (we will discuss ways to do this shortly).

Load the second one by default. Then, just do a check in JavaScript and switch to the enhanced version if custom properties are supported:

```xml
<!-- HTML -->
<link href="without-css-custom-properties.cs: rel="stylesheet" type="text/css" media="all" />
```

```js
// JavaScript
if(isSupported){
  removeCss('without-css-custom-properties.css');
  loadCss('css-custom-properties.css');
  // + conditionally apply some application enhancements
  // using the custom properties
}
```

This is just an example. As you’ll see below, there are better options.

---

## How To Start Using Them

According to a [<VPIcon icon="fas fa-globe"/>recent survey](https://ashleynolan.co.uk/blog/frontend-tooling-survey-2016-results), Sass continues to be the preprocessor of choice for the development community.

So, let’s consider ways to start using CSS custom properties or to prepare for them using Sass.

We have a few options.

### 1. Manually Check In The Code For Support

One advantage of this method of manually checking in the code whether custom properties are supported is that it works and we can do it right now (don’t forget that we have switched to Sass):

```scss
$color: red;
:root {
  --color: red;
}

.box {
  @supports ( (--a: 0)): color: var(--color);
  }
  @supports ( not (--a: 0)): color: $color;
  }
}
```

This method does have many cons, not least of which are that the code gets complicated, and copying and pasting become quite hard to maintain.

### 2. Use A Plugin That Automatically Processes The Resulting CSS

The PostCSS ecosystem provides dozens of plugins today. A couple of them process custom properties (inline values) in the resulting CSS output and make them work, assuming you provide only global variables (i.e. you only declare or change CSS custom properties inside the `:root` selector(s)), so their values can be easily inlined.

An example is [postcss-custom-properties (<VPIcon icon="iconfont icon-github"/>`postcss/postcss-custom-properties`)](https://github.com/postcss/postcss-custom-properties).

This plugin offers several pros: It makes the syntax work; it is compatible with all of PostCSS’ infrastructure; and it doesn’t require much configuration.

There are cons, however. The plugin requires you to use CSS custom properties, so you don’t have a path to prepare your project for a switch from Sass variables. Also, you won’t have much control over the transformation, because it’s done after the Sass is compiled to CSS. Finally, the plugin doesn’t provide much debugging information.

### 3. css-vars Mixin

<SiteInfo
  name="shospodarets/css-vars"
  desc="Sass mixin to use CSS Custom Properties with Sass."
  url="https://github.com/shospodarets/css-vars/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/42d55b2f27b70921407487d4b64f2ff26f4280730da928bdea041e49ee00c945/shospodarets/css-vars"/>

I started using CSS custom properties in most of my projects and have tried many strategies:

- Switch from Sass to PostCSS with [cssnext<VPIcon icon="fas fa-globe"/>](https://cssnext.io/).
- Switch from Sass variables to pure CSS custom properties.
- Use CSS variables in Sass to detect whether they are supported.

As a result of that experience, I started looking for a solution that would satisfy my criteria:

- It should be easy to start using with Sass.
- It should be straightforward to use, and the syntax must be as close to native CSS custom properties as possible.
- Switching the CSS output from the inlined values to the CSS variables should be easy.
- A team member who is familiar with CSS custom properties would be able to use the solution.
- There should be a way to have debugging information about edge cases in the usage of variables.

As a result, I created css-vars, a Sass mixin that you can [find on Github (<VPIcon icon="iconfont icon-github"/>`malyw/css-vars`)](https://github.com/malyw/css-vars). Using it, you can sort of start using CSS custom properties syntax.

---

## Using css-vars Mixin

To declare variable(s), use the mixin as follows:

```scss
$white-color: #fff;
$base-font-size: 10px;

@include css-vars((
  --main-color: #000,
  --main-bg: $white-color,
  --main-font-size: 1.5*$base-font-size,
  --padding-top: calc(2vh + 20px)
));
```

To use these variables, use the `var()` function:

```scss
body {
  color: var(--main-color);
  background: var(--main-bg, #f00);
  font-size: var(--main-font-size);
  padding: var(--padding-top) 0 10px;
}
```

This gives you a way to control all of the CSS output from one place (from Sass) and start getting familiar with the syntax. Plus, you can reuse Sass variables and logic with the mixin.

When all of the browsers you want to support work with CSS variables, then all you have to do is add this:

```scss
$css-vars-use-native: true;
```

Instead of aligning the variable properties in the resulting CSS, the mixin will start registering custom properties, and the `var()` instances will go to the resulting CSS without any transformations. This means you’ll have fully switched to CSS custom properties and will have all of the advantages we discussed.

If you want to turn on the useful debugging information, add the following:

```scss
$css-vars-debug-log: true;
```

This will give you:

- a log when a variable was not assigned but was used;
- a log when a variable is reassigned;
- information when a variable is not defined but a default value gets passed that is used instead.

---

## Conclusion

Now you know more about CSS custom properties, including their syntax, their advantages, good usage examples and how to interact with them from JavaScript.

You have learned how to detect whether they are supported, how they are different from CSS preprocessor variables, and how to start using native CSS variables until they are supported across browsers.

This is the right time to start using CSS custom properties and to prepare for their native support in browsers.

::: info Further Reading

- [55 Free High Quality Icon Sets](https://smashingmagazine.com/2008/07/55-free-high-quality-icon-sets/)
- [The Ultimate Guide To Cloning In Photoshop](https://smashingmagazine.com/2010/03/the-ultimate-guide-to-cloning-in-photoshop/)
- [Hand-Sketching: Things You Didn’t Know Your Doodles Could Accomplish](https://smashingmagazine.com/2013/10/things-you-can-accomplish-with-hand-sketching-doodling/)
- [Switching From Adobe Fireworks To Sketch: Ten Tips And Tricks](https://smashingmagazine.com/2015/10/switching-adobe-fireworks-sketch-10-tips-tricks/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "It’s Time To Start Using CSS Custom Properties",
  "desc": "In this article, Serg Hospodarets will teach you more about CSS custom properties, including their syntax, their advantages, good usage examples and how to interact with them from JavaScript. You will learn how to detect whether they are supported, how they are different from CSS preprocessor variables, and how to start using native CSS variables until they are supported across browsers. This is the right time to start using CSS custom properties and to prepare for their native support in browsers.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/start-using-css-custom-properties.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
