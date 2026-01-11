---
lang: en-US
title: "CSS Reference Guide: Button styling"
description: "Article(s) > CSS Reference Guide: Button styling"
icon: fa-brands fa-css3-alt
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
      content: "Article(s) > CSS Reference Guide: Button styling"
    - property: og:description
      content: "CSS Reference Guide: Button styling"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/css-reference-guide-button-styling.html
prev: /programming/css/articles/README.md
date: 2020-09-30
isOriginal: false
author:
  - name: Chidume Nnamdi
    url : https://blog.logrocket.com/author/chidumennamdi/
cover: /assets/image/blog.logrocket.com/css-reference-guide-button-styling/banner.png
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
  name="CSS Reference Guide: Button styling"
  desc="Learn how to create and style button classes using CSS, including a detailed look at style properties and animated effects."
  url="https://blog.logrocket.com/css-reference-guide-button-styling"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/css-reference-guide-button-styling/banner.png"/>

Normal buttons are rendered using the default browser styling. We can override this default styling using CSS.

![CSS Reference Guide: Button Styling](/assets/image/blog.logrocket.com/css-reference-guide-button-styling/banner.png)

---

The basic CSS properties for styling buttons are: `padding`, `margin`, `border-radius`, and `background`. CSS frameworks like Material Design, Bootstrap, Tailwind CSS, and others use these to style their buttons to produce their own style classes.

In this guide, we will create our own button style classes from pure CSS. The following demo shows the results of our implementation:

<CodePen
  user="philipsz-davido"
  slug-hash="qBZoMXm"
  title="buttons examples"
  :default-tab="['css','result']"
  :theme="dark"/>

function registerNinjaFormsCallback() { if (!(window.nfRadio && window.lr_analytics)) { return; } window.nfRadio.channel("forms").on("submit:response", function(submission) { console.log(submission); if (submission.data.form_id !== "48") { return; } window.lr_analytics.track("blog-replay-newsletter-signup", { post: window.location.pathname, email: submission.data.fields_by_key?.email?.value, }); }); } registerNinjaFormsCallback();

---

## Basic buttons

Let’s create a base button style class with basic styling:

```css
.button {
  padding: 6px 12px;
  margin-bottom: 0;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  display: inline-block;
  background-image: none;

  border-radius: 3px;
  box-shadow: none;
  border: 1px solid transparent;
}
```

All buttons in this guide will take the above styling by default. Let’s break down the styling properties:

- `padding`: Pads the content of the button to 6px on the top and bottom, 12px on the left and right
- `margin-bottom`: Declares no margin at the bottom of the button
- `font-weight`: Here, we’ve set the text content to be slightly bolder
- `cursor`: The system cursor will convert to a hand icon on hover
- `text-align`: Center-aligns the button text
- `white-space`: The button text will remain on the same line; it does not break on limited space
- `display`: Sets the button to wrap around its siblings, while making its height and width adjustable
- `background-image`: Toggles off any image set in the background
- `border-radius`: Set to be 3px
- `box-shadow`: Set to be removed around the button
- `border`: Set to be 1px wide, solid, and transparent

This forms the base of our class and allows us to create child buttons from it. Simply set the `.button` to a button class attribute and our styling takes over:

```html
<button class="button">Button</button>
```

---

## Button colors

We can then create variations of buttons from the `.button` base class. These variations will be buttons with different colors.

To create CSS buttons with different colors, we use the `color`, `background-color`, and `border-color` properties to create the variations.

### Red button

```css
.button .buttonRed {
  color: #fff;
  background-color: red;
  border-color: #ac2925;            
}
```

The `color` prop in hex is `#fff`; the `background-color` prop makes the button appear `red` in color. The `border-color` is set to be slightly darker than `red` to better define the button borders.

We can now set the `.buttonRed` class to `.button` buttons to create buttons with a tomato-red color.

```html
<button class="button buttonRed">Red Button</button>
```

### Green button

```css
.button .buttonGreen {
  color: #fff;
  background-color: green;
  border-color: #4cae4c;
}
```

The `background-color` prop here is set to `green`. Applying `.buttonGreen` to a button:

```html
<button class="button buttonGreen">Green Button</button>
```

### Blue button

```css
.button .buttonBlue {
  color: #fff;
  background-color: blue;
  border-color: #2e6da4;    
}
```

This will make any button with the `.buttonBlue` class appear blue in color. Applying `.buttonBlue` to a button:

```html
<button class="button buttonBlue">Blue Button</button>
```

---

## Button sizes

We can use the `padding` and `font-size` properties to increase the button sizes.

### Large button

```css
.buttonLarge {
  padding: 10px 16px;
  font-size: 18px;
}
```

### Small button

```css
.buttonSmall {
  padding: 5px 10px;
  font-size: 12px;
}
```

### Extra-small button

```css
.buttonXSmall {
  padding: 1px 5px;
  font-size: 12px;    
}
```

Notice how the `padding` and `font-size` values decreased from `.buttonLarge` to `.buttonXSmall` — especially the `font-size` because it sets the element’s text size.

---

## Block buttons

Block buttons expand to fill the width of their parent container. This is done using the `width` property.

```css
.buttonBlock {
  width: 100%;
}
```

The `width` is set to `100%`, so that it stretches to fill the entire length of its parent.

We can also use `width` to define our button length; it can be set to any percentage or to any unit.

```css
.buttonBlock {
    width: 50%;
}
```

```css
.buttonBlock {
    width: 10px;
}
```

```css
.buttonBlock {
    width: 10em;
}
```

---

## Disabled buttons

We can simulate a disabled button by using the `cursor` and `opacity` properties.

```css
.button.disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
```

The system cursor will become a stop icon on hover based on the `not-allowed` value in the `cursor` property. This disables any clicking event or any other mouse-associated events on the button.

`opacity` defines the button visibility. Here, the value `0.65` makes it slightly dimmer to signify that the button is disabled.

---

## Round buttons

We create round buttons in CSS by using the `border-radius`, `height`, and `width` properties.

```css
.buttonRound {
  border-radius: 50%;
  height: 44px;
  width: 44px;
}
```

To make a button round, we set the `border-radius` to `50%`. `height` and `width` ultimately determine the size of the button. If they were not the same value, the button would appear oval; to make it a circle, they share the same value of `44px`.

#podrocket-plug { border-radius: 12px; width: 75%; height: 352px; margin: 1rem auto; display: block; }

---

## Elevated buttons

Creating elevated or raised buttons is accomplished with the `box-shadow` property. This property casts a shadow around an element’s border.

```css
.buttonRaised {
    box-shadow: 0 3px 8px 0 black;
}
```

This will give the button a 3D look. The first value of the `box-shadow` property sets the top part shadow to `0`, the right side to `3px`, the bottom to `8px`, and the left to `0`. We’ve also defined a `black` color. With these values, we will see black shadows cast on the bottom more than on the right sides.

---

## Animated buttons

We can add animated effects to buttons using CSS as well.

In particular, we’d like animated effects when a button is hovered over, when the mouse hovers way from the button, and when the button is clicked.

### Hover effect

We use the `:hover` pseudo-class selector to set styling to a button when the mouse moves over it.

Let’s add a hover effect for each of our different button colors:

```css
/* red button */
.buttonRed:hover {
  color: #fff;
  background-color: red;
  border-color: #ac2925;
  box-shadow: 1px 1px 1px 3px grey;
}

/* green button */
.buttonGreen:hover {
  color: #fff;
  background-color: green;
  border-color: #398439;
  box-shadow: 1px 1px 1px 3px grey;
}

/* blue button */
.buttonBlue:hover {
  color: #fff;
  background-color: blue;
  border-color: #269abc;
  box-shadow: 1px 1px 1px 3px grey;
}
```

The colors we’ve selected for the `color`, `border-color`, and `background-color` properties of our buttons have a respectively lighter opacity than their original state. The shadow cast by the elements is also set to be more defined using the `box-shadow` property on hover.

This provides a visual cue for the user when they hover the button. They will see a dim in the button’s color, background color, and a deeper shadow cast on hover.

### Click effect

To create a click effect, we use the `:active` pseudo-class selector.

```css
/* red button */
.buttonRed:active {
  color: #fff;
  background-color: #3b0404;
  border-color: #ac2925;
}

/* green button */
.buttonGreen:active {
  color: #fff;
  background-color: #022c02;
  border-color: #398439;
}

/* blue button */
.buttonBlue:active {
  color: #fff;
  background-color: #020221;
  border-color: #269abc;
}
```

Just like in the hover effect, we changed the color of the border, text, background when the button is clicked. In CSS, when the button is clicked the `:active` pseudo-selector is triggered.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Reference Guide: Button styling",
  "desc": "Learn how to create and style button classes using CSS, including a detailed look at style properties and animated effects.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/css-reference-guide-button-styling.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
