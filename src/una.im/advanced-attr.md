---
lang: en-US
title: "New capabilities for attr()"
description: "Article(s) > New capabilities for attr()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - una.im
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > New capabilities for attr()"
    - property: og:description
      content: "New capabilities for attr()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/una.im/advanced-attr.html
prev: /programming/css/articles/README.md
date: 2025-01-21
isOriginal: false
author:
  - name: Una Kravets
    url: https://una.im/about
cover: https://una.im/posts/advanced-attr/social-cover.jpg
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
  name="New capabilities for attr()"
  desc="Advanced attr() is landing in Chrome 133, and I'm really excited for this feature! Here's a bit about it and how you can use it."
  url="https://una.im/advanced-attr/"
  logo="https://una.im/favicon.svg"
  preview="https://una.im/posts/advanced-attr/social-cover.jpg"/>

The ability to use `attr()` references in CSS is getting more powerful. [<VPIcon icon="fa-brands fa-chrome"/>Shipping](https://chromestatus.com/feature/4680129030651904) in Chrome 133 (stable rollout beginning next week!), this highly-requested feature gives you ability to supercharge attributes and use them in CSS beyond simple strings! You can reference colors, numbers, percentages, named values as custom identifiers, and more.

> Semantic use of attributes in `attr()` is a feature I’ve wanted for a very long time and I’m stoked it’s finally landing[^1]

[^1]: with some limitations for security purposes

---

## Basic usage

Attributes, including but not limited to data attributes, can be referenced in css using the `attr()` function. For example, `attr(data-color)` references a data attribute `data-color`. The catch is, `attr(data-color)` is always parsed as a string, and could only ever be referenced as a string value and used in the `content` property of a pseudo element *until now*.

To rewind, currently in CSS with very wide browser support, you can access the `data-name` and use it in the `content` property of a pseudo element, like so:

```css
.something::after {
  content: attr(data-name);
}
```

With this new functionality, you can add another argument to give this data attribute a *type*. `attr(data-color type(<color>));` can now be used as a color value.

Given `<div data-color="red"></div>`, you can create a red background on this element with:

```css
div {
  background-color: attr(data-color type(<color>));
}
```

You can take that a step further and add a fallback value, like so:

```css
/* gray fallback value */
div {
  color: attr(data-color type(<color>), gray);
}
```

::: note

In addition to a string, you can use the following types:

- `<angle>`: angle (i.e. `deg` or `turn`)
- `<color>`: color (i.e. named color, `rgb`, `hsl`, `oklch`, etc.)
- `<custom-ident>`: custom identifier, used for naming things like view transition names
- `<integer>`: discrete, whole step number
- `<length>`: number + unit ([<VPIcon icon="fa-brands fa-firefox"/>see more](https://developer.mozilla.org/en-US/docs/Web/CSS/length))
- `<length-percentage>`: a value that can either be a length or percentage
- `<number>`: extends integer with .‘s for fractional values
- `<percentage>`: percentage (`%`), often relative to a parent object
- `<resolution>`: used in media queries (i.e. `dpi`)
- `<time>`: used in animation (i.e. `s` or `ms`)
- `<transform-function>`: function to change appearance of an element (i.e. `rotate()`)

:::

::: note

can’t use advanced `attr()` for images and with the url syntax type. All of the following are invalid at computed-value time, as per the [<VPIcon icon="iconfont icon-w3c"/>spec](https://w3.org/TR/css-values-5/#attr-security):

- `background-image: src(attr(foo));` - can’t use it directly.
- `background-image: image(attr(foo))` - can’t use it in other url-taking functions.
- `background-image: src(string("http://ex.com/?token=" attr(foo)))` - can’t “launder” it thru another function.
- `--foo: attr(foo); background-image(src(var(--foo)))` - can’t launder the value thru another property.

So you can’t use this technique, unfortunately, for images or icons.

:::

---

## `attr()` IRL: product card demo

![product card demo](https://una.im/posts/advanced-attr/demo-product.png)

Expanded capabilities with `attr()` are extremely powerful and work so much better with the way we’re already building front-end systems, i.e. with properties that you pass down as you construct components.

Say you have a product card that shows a variety of colors for that one product. You might have a list of colors that you’re looping through, which you’re pulling from some database. You might have a list item to represent each available color:

```jsx
return (
  <ul className="color-list">
    {colors.map((colorVal, colorName) => (
      <li color={props.colorVal} color-name={props.colorName}>...</li>
    ))}
  </ul>
);
```

This becomes:

```jsx
<ul class="color-list">
  <li color="rgb(255, 255, 255)" color-name="Snow">white</li>
  <li color="rgb(145, 60, 50)" color-name="Tree Bark">brown</li>
  ...
</ul>
```

Previously, to use this color attribute as a background, you would have to either write inline styles like `<li style={{backgroundColor={props.colorVal}}} ...</li>` or write some JavaScript to apply the styles like I do in [this example (<VPIcon icon="fa-brands fa-codepen"/>`una`)](https://codepen.io/una/pen/zYaYxXg/250bd23e9ce63c22ec4a37d61ed31b3a).

```jsx
const colors = [...document.querySelectorAll('.color-list li')]

colors.forEach((color) => {
  const colorValue = color.getAttribute('color');
  color.style.backgroundColor = colorValue;
})
```

This is fine, but it’s not ideal. Inline styles affect specificity and reduce flexibility, and I don’t love using JavaScript for purely style-related matters. I prefer to keep a better separation of concerns.

But now, with this new capability, you can directly access attributes and cast them to a type:

```css
background-color: attr(color type(<color>));
```

<CodePen
  user="una"
  slug-hash="emOyeqz"
  title="attr() color demo"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Again, since you can't use it for images, you wouldn't be able to use this for pattern backgrounds

:::

---

## To `data-*` or not to `data-*`

The `attr()` function works for both regular, custom attributes and `data-*` attributes. But using data attributes does have a few distinct benefits, and is a more intentional way to use this feature. Benefits of `data-*` include:

1. No risk of namespace collision with existing attributes.
2. `data-*` gives you access to the data list in JavaScript, meaning you can update it with `element.dataset`

Google AI overview says: *“data attributes are for storing additional information that can be accessed by JavaScript, while normal attributes are for defining the element’s inherent properties”*. So I suppose for CSS, it’s up to you and your needs.

> What about custom properties?

Sure, you can use custom properties to access values from your elements, but again that would require you to write inline styles. If you are using data attributes, you can shorten the work.

Instead of:

```html
<div style="--color: red"></div>
```

or

```js
element.style.setProperty("--color", "red")
```

You write:

```html
<div data-color="red"></div>
```

or

```js
element.dataset.color = "red"
```

---

## Star rating demo

![star demo](https://una.im/posts/advanced-attr/demo-stars.png)

Another neat thing about using attributes here is that they can be repurposed for multiple needs. Say you have a star-rating component:

```html
<div class="star-rating" data-rating="4.5"> ...
```

We know the rating (4.5 above), so in a view with 5 stars, this 4.5 would need to be multiplied by 2 to 9.0/10. That translates to 90%, which aligns with how we want to visually represent the “fill” behind the stars. The final step would be to convert the 9/10 to a percentage out of 100%, so we multiply it by 10% to convert this properly. To shorten the value \* 2 \* 10%, we can multiply by 20%:

```css
--percent-fill: calc(attr(data-rating type(<number>)) * 20%);
```

We then use a linear-gradient as a background to cover the space by 90%, with hard starts and stops at this percentage:

```css
background: linear-gradient(to right, gold var(--percent-fill), transparent var(--percent-fill));
```

<CodePen
  user="una"
  slug-hash="JoPZRrG"
  title="attr() star rating demo"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Grid placement demo

![grid demo](https://una.im/posts/advanced-attr/demo-grid.png)

Another example of how to use advanced `attr()` is placing items in a grid. You can leverage values from the data attributes to do this as well:

```html
<div class="item" place-col="2">column 2</div>
```

```css
.item {
  display: grid;
  grid-column: attr(place-col type(<number>));
}
```

<CodePen
  user="una"
  slug-hash="RNbyKGP"
  title="attr() grid placement"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Anchored popovers

Finally, you can skip a step for anchored popovers and directly use the popover name with advanced `attr()`.

Take this example with multiple popover menus that are attached to different buttons.

<VidStack src="https://una.im/posts/advanced-attr/demo-menus.mp4" />

Previously, you would need to write styles for each menu button to anchor the menu items popover. It makes the most sense currently to do this inline, like so:

```html
<div class="menu">
  <button popovertarget="menu-items-01" style="anchor-name: --menu-01">
    ...
  </button>
  <ul id="menu-items-01" popover style="position-anchor: --menu-01" role="menu">
    ...
  </ul>
</div>
```

<CodePen
  user="una"
  slug-hash="BaGVopL"
  title="Radial menu everywhere"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, you can forgo these repetitive individual styles, put a data attribute on the parent one time, like so:

```html
<div class="menu" data-anchor="--menu-01">
  <button popovertarget="menu-items-01">
    ...
  </button>
  <ul id="menu-items-01" popover role="menu">
    ...
  </ul>
</div>
```

And write CSS once that will enable every `button` and `popover` menu to leverage their unique `data-anchor` to set the `anchor-name` and `position-anchor`.

```css
.menu {
  --anchor-id: attr(data-anchor type(<custom-ident>));
    
  button {
    anchor-name: var(--anchor-id);
  }
  
  [popover] {
    position-anchor: var(--anchor-id);
  }
}
```

<CodePen
  user="una"
  slug-hash="bNbxXzo"
  title="Radial menu everywhere"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

You do still need a unique identifier for the `popovertarget` to connect to the `id` of the menu for the `popover` behavior to work. If popover relationships were enabled via CSS, you would be able to reuse the parent attribute here and not require this.

:::

---

## Conclusion and further resources

There are so many more great usecases and examples, including the [view transitions demo (<VPIcon icon="fa-brands fa-codepen"/>`web-dot-dev`)](https://codepen.io/web-dot-dev/pen/yyBKLmd) in [<VPIcon icon="fa-brands fa-chrome"/>this article](https://developer.chrome.com/blog/advanced-attr) by Bramus Van Damme. I am so happy to see this feature land in Chrome and hope to see other browsers follow suit!

::: info Learn more:

<SiteInfo
  name="CSS attr() gets an upgrade  |  Blog  |  Chrome for Developers"
  desc="You can now use attr() with any CSS property, including custom properties. It can parse values into data types other than strings."
  url="https://developer.chrome.com/blog/advanced-attr/"
  logo="https://gstatic.com/devrel-devsite/prod/v6ae673272608590539f8a06b3f3271c0f5688cde07499d1c9e644aeb66c8c060/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/advanced-attr/image/advanced-attr-thumbnail.png"/>

<SiteInfo
  name="attr() CSS function - CSS | MDN"
  desc="The attr() CSS function is used to retrieve the value of an attribute of the selected element and use it in a property value, similar to how the var() function substitutes a custom property value. It can also be used with pseudo-elements, in which case the attribute's value on the pseudo-element's originating element is returned."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

  ```component VPCard
{
  "title": "CSS Values and Units Module Level 5",
  "desc": "",
  "link": "https://drafts.csswg.org/css-values-5/#attr-notation/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "New capabilities for attr()",
  "desc": "Advanced attr() is landing in Chrome 133, and I'm really excited for this feature! Here's a bit about it and how you can use it.",
  "link": "https://chanhi2000.github.io/bookshelf/una.im/advanced-attr.html",
  "logo": "https://una.im/favicon.svg",
  "background": "rgba(156,90,242,0.2)"
}
```
