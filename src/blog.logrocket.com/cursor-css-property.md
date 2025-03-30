---
lang: en-US
title: "A guide to the CSS cursor property"
description: "Article(s) > A guide to the CSS cursor property"
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
      content: "Article(s) > A guide to the CSS cursor property"
    - property: og:description
      content: "A guide to the CSS cursor property"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/cursor-css-property.html
prev: /programming/css/articles/README.md
date: 2025-03-03
isOriginal: false
author:
  - name: Samson Omojola
    url : https://blog.logrocket.com/author/samson-omojola/
cover: /assets/image/blog.logrocket.com/cursor-css-property/banner.png
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
  name="A guide to the CSS cursor property"
  desc="Learn about built-in CSS cursors, creating custom cursors with CSS, using multiple cursors, and adding animations with CSS and JavaScript."
  url="https://blog.logrocket.com/cursor-css-property"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/cursor-css-property/banner.png"/>

Cursors can either limit or greatly enhance the way your users experience your site.

![A guide to the CSS cursor property](/assets/image/blog.logrocket.com/cursor-css-property/banner.png)

In this tutorial, we’ll discuss built-in CSS cursors, and look at how to create custom cursors using CSS (and a bit of JavaScript) to make your website feel more fun and memorable.

We’ll also tackle the benefits and challenges of using CSS vs. JavaScript for custom cursors, the right scenarios to go beyond default options, and accessibility factors. Basic knowledge of HTML, CSS, and JavaScript will be helpful for following along.

---

## What is the `cursor` property?

The `cursor` property in CSS defines the type of mouse pointer displayed over an element. These predefined cursors are super handy for showing users what they can do in different parts of your site, such as clicking a link, selecting text, dragging an item, or resizing a window.

You can either use a predefined cursor type or even load a custom icon for a unique touch. In most cases, the built-in options are more than enough to cover common interactions, but custom cursors are a cool way to add your own touch to the site.

The basic syntax is as follows:

```css
selector {
  cursor: value;
}
```

The default value is `auto`, meaning the browser sets a cursor based on the context.

---

::: note Editor’s note

This article was last updated by [<FontIcon icon="fas fa-globe"/>Saleh Mubashar](https://blog.logrocket.com/author/salehmubashar/) in March 2025 to provide more comprehensive coverage of cursor references, include a full reference guide for all `cursor` values, and provide more targeted advice on building custom cursors.

:::

---

---

## List of all cursor values

Before we get into custom cursors, let’s have a look at all the available cursor options in CSS and their common uses:

| Cursor value | Description |
| ---: | --- |
| `alias` | An alias or shortcut can be created |
| `all-scroll` | Scroll in any direction |
| `auto` | Default value – the browser pick a cursor |
| `cell` | Select a table cell |
| `col-resize` | Resize columns |
| `context-menu` | Opens a menu |
| `copy` | Copy an item |
| `crosshair` | Cross cursor indicating precise selection |
| `default` | Standard cursor |
| `e-resize` / `w-resize` | Resize to the right / left |
| `grab` | Drag an item |
| `grabbing` | Item is being dragged |
| `help` | Help info is available |
| `move` | An item can be moved |
| `n-resize` / `s-resize` | Resize upwards/downwards |
| `ne-resize` / `nesw-resize` / `sw-resize` | Resize top right diagonally |
| `no-drop` | Can’t drop an item |
| `none` | Hidden cursor |
| `not-allowed` | Action not allowed |
| `nw-resize` / `nwse-resize` / `se-resize` | Resize top left diagonally |
| `pointer` | Clickable item |
| `progress` | Loading but interactive |
| `row-resize` | Resize rows |
| `text` | Select text |
| `vertical-text` | Select vertical text |
| `wait` | Loading, not interactive |
| `zoom-in`/ `zoom-out` | Zoom in / zoom out |

Hover over the boxes below to see the cursors in action:

Check out [<FontIcon icon="fa-brands fa-firefox"/>the complete list of CSS cursors here.](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#values)

While these cursors are useful and have some basic styling, we can certainly get more creative with custom cursors.

---

## How to create custom cursors

Creating a custom cursor with CSS is a pretty straightforward process. The first step is to find the image you want to use to replace the default cursor. You can either design one yourself or get a free PNG that suits your needs from [**an icon library such as FontAwesome**](/blog.logrocket.com/font-awesome-icons-vue-js-complete-guide.md).

Next, to create the custom cursor, use the `cursor` property with the `url()` function. We will pass the image location to the cursor using the `url` function:

```css
body {
  cursor: url('path-to-image.png'), auto;
}
```

To ensure that this cursor is used on all parts of your website, the best place to use the `cursor` property is in the `body` tag of your HTML. However, if you want, you can assign custom cursors to specific elements instead of the whole website.

You can also add a `fallback` value to your `cursor` property. When using [**custom CSS properties, this value ensures**](/blog.logrocket.com/how-to-use-css-variables/README.md) that if the image that serves as your custom property is missing or cannot be loaded, then your users will have another option.

In this case, `auto` is the `fallback` descriptor for your custom `cursor` property. Your users will see the regular cursor if the custom one is unavailable.

You can also provide more than one custom cursor (multiple fallbacks) for your website. All you have to do is add their paths to the `cursor` property:

```css
body {
  cursor: url('path-to-image.png'), url('path-to-image-2.svg'), url('path-to-image-3.jpeg'), auto;
}
```

There are three fallback cursors in the code above.

Because they draw attention to elements you want to highlight on your website, custom cursors are best used in specific scenarios, such as:

- Indication of special interactions
- Storytelling purposes
- Gaming interactions
- In hover-effects

### Best practices for custom cursors

A few tips to keep in mind while creating custom cursors include:

- Use `.png` or `.svg` images for transparency
- Keep the file size small for better performance
- Ensure the custom cursor is user-friendly and does not hinder usability

### Changing a mouse cursor to a pointer

Say you have a table and you’d like the mouse cursor to change to a pointer (i.e., the [<FontIcon icon="fas fa-globe"/>hand icon](https://blog.logrocket.com/ux-design/principles-icon-design/)) whenever a user hovers over a row in the table. You can use the CSS `cursor` property to achieve this.

Here’s an example:

```html :collapsed-lines
<style>
  /* Style the table */
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  /* Style the table cells */
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  /* Style the table rows */
  tr:hover {
    cursor: pointer;
  }
</style>

<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>City</th>
  </tr>
  <tr>
    <td>John</td>
    <td>30</td>
    <td>New York</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>25</td>
    <td>Chicago</td>
  </tr>
  <tr>
    <td>Bill</td>
    <td>35</td>
    <td>Los Angeles</td>
  </tr>
</table>
```

In the above code, we use the `tr:hover` selector to apply the `cursor` property to all table rows when the mouse hovers over them. The `cursor` property is set to `pointer`, which changes the mouse cursor to a hand icon.

### Hiding a mouse cursor with CSS

To hide the mouse cursor with CSS, you can use the `cursor` property and set its value to `none`.

Here’s an example:

```html
<style>
  /* Style the body element */
  body {
    cursor: none;
  }
</style>

<body>
  <!-- Your content goes here -->
</body>
```

This will hide the mouse cursor throughout the entire webpage. If you only want to hide the mouse cursor for a specific element, you can apply the `cursor` property to that individual element instead of the `body` element.

There are several situations in which hiding the mouse cursor might be useful, such as:

- **In a game or interactive application** — Hiding the mouse cursor could help create a more immersive experience for the user
- **In a presentation or slideshow** — Hiding the mouse cursor could reduce distractions and keep the focus on the content
- **In fullscreen video or media** — Hiding the mouse cursor could help prevent the user from accidentally clicking on controls or other elements

Remember that hiding the mouse cursor can be confusing or disorienting for some users, depending on the use case. This strategy should be used carefully and only when necessary.

---

## CSS vs. JavaScript cursors

While custom cursors can be created using CSS, JavaScript offers additional advantages. Before we discuss that, let’s look at the advantages and disadvantages of creating custom cursors with CSS and JavaScript.

There are numerous reasons why it is preferable to create cursors with CSS:

- **Simplicity** **—** With just a line of CSS, it is possible to toggle between a bunch of cursor types
- **Browser support** **—** CSS custom cursors are fully supported by all browsers, so you don’t need any extra configurations to operate your websites on multiple browsers

The primary drawback of using CSS for custom cursors is the limited ability to add animations or advanced customizations.

This is where JavaScript comes in. JavaScript allows for more advanced interactions when users engage with the cursor—for example, hovering, clicking, or moving over specific elements. By listening to specific events, the cursor’s movements can then be updated and also be easily animated.

---

## How to create a custom cursor with JavaScript

Creating a custom cursor with JavaScript [**involves manipulating DOM elements**](/blog.logrocket.com/custom-events-in-javascript-a-complete-guide.md). We’ll create some DOM elements, which will serve as our custom cursor, and then use JavaScript to manipulate them. Then, as we move our cursor around, those custom elements will move around as our cursor.

Instead of using or downloading an image, we’ll design an animated cursor using CSS to make it more engaging. Move your cursor around the box below to see an example:

As you can see, the cursor consists of two elements: a large circle and a small circle. We’ll create two `div` elements and assign them class names:

```html
<div class="cursor small"></div>
<div class="cursor big"><div>
```

Next, we’ll style the circles using CSS. The big circle will have a width and height of `50px` and will be shaped into a circle using `border-radius: 50%`.

The small circle will be hollow, so we’ll define a border with a `border-radius` of `50%` and set its width and height to `6px` each. We also disable the default cursor by setting `cursor: none` so that our custom cursor can take its place.

To animate the big circle, we’ll use `@keyframes`. The animation lasts `2s`, starting with a `background-color` of green and an opacity of `0.2`. At the midpoint, the color changes to orange, and by the end, it turns red. We set `animation-iteration-count` to `infinite` to make the animation loop continuously:

```css :collapsed-lines
body {
  background-color: #171717;
  cursor: none;
  height: 120vh;
}

.small {
  width: 6px;
  height: 6px;
  border: 2px solid #fff;
  border-radius: 50%;
}

.big {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation-name: stretch;
  animation-duration: 2s;
  animation-timing-function: ease-out;
  animation-direction: alternate;
  animation-iteration-count: infinite;
}

@keyframes stretch {
  0% {
    opacity: 0.2;
    background-color: green;
    border-radius: 100%;
  }
  50% {
    background-color: orange;
  }
  100% {
    background-color: red;
  }
}
```

Now, to make the elements follow the mouse movement, we’ll use JavaScript. The script below listens for [**mouse movement**](/blog.logrocket.com/detect-mouse-movement-input-unity.md) on the webpage. When the user moves their mouse, the function retrieves the `x` and `y` coordinates and updates the position of both `div` elements accordingly:

```js
const cursorSmall = document.querySelector('.small');
const cursorBig = document.querySelector('.big');

const positionElement = (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  cursorSmall.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  cursorBig.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener('mousemove', positionElement);
```

See the complete code alongside the interactive cursor in the below CodePen:

Here’s how it works:

- We use `querySelector` to access the two `div` elements
- An event listener is added to detect mouse movement
- When the cursor moves, the `positionElement` function retrieves the current mouse `x` and `y` coordinates
- These coordinates update the `transform: translate3d()` property for both cursor elements, moving them accordingly
- `transform` repositions elements in both horizontal and vertical directions, while `translate3d` adjusts their position in 3D space

---

## UX and browser compatibility when creating a custom cursor

Custom cursors can make a website feel unique, but they can also be annoying or distracting if overused. Many people find them frustrating, especially if they make navigation harder. A cursor should help users, not get in their way.

Before adding a custom cursor, ask yourself if it actually improves the experience or if it’s just for looks. Also, keep in mind that not all browsers support fancy cursor effects, especially older ones. Here’s the browser compatibility data for the `cursor` property from [<FontIcon icon="fas fa-globe"/>CanIUse](https://caniuse.bitsofco.de/):

![css cursor property browser compatibility](/assets/image/blog.logrocket.com/cursor-css-property/css-cursor-property-browser-compatibility.png)

To keep things user-friendly, use custom cursors sparingly and make sure they fit the design. If possible, give users the option to turn them off so they can stick with the default system cursor if they want.

---

## Creating a custom cursor with accessibility in mind

Custom cursors might seem like a fun way to personalize a website, but they can cause serious accessibility issues. Many people rely on built-in OS features to modify their cursors, such as increasing size or using high-contrast colors. These changes help users with low vision or motor impairments navigate their devices more easily.

When a website overrides these modifications with a custom CSS cursor, it can make the experience frustrating—or even unusable—for some users.

If you must use a custom cursor, make sure to:

- **Allow users to turn it off**: Some people prefer the default system cursor, and they should have the option to switch back
- **Respect accessibility preferences**: Use `prefers-reduced-motion` to disable custom cursors for users who find them distracting:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    cursor: auto; /* Reverts to the default cursor */
  }
}
```

- **Ensure compatibility with screen readers** — Custom cursors can interfere with assistive technologies, so add `aria-hidden="true"` to the cursor elements to prevent them from being picked up

At the end of the day, a cursor should enhance usability, not get in the way. If there’s any chance a custom cursor could make a website harder to use, it’s best to avoid it altogether. I would also suggest reading [<FontIcon icon="fas fa-globe"/>this excellent article](https://ericwbailey.design/published/dont-use-custom-css-mouse-cursors/) by Eric Bailey on the drawbacks of custom cursors. He makes a bunch of really good points.

---

## Conclusion

In this tutorial, we discussed built-in CSS cursors, creating custom cursors with CSS, using multiple cursors, and adding animations with CSS and JavaScript. We also covered the pros and cons of using CSS vs. JavaScript for custom cursors, when to go beyond default options and accessibility factors to keep in mind.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A guide to the CSS cursor property",
  "desc": "Learn about built-in CSS cursors, creating custom cursors with CSS, using multiple cursors, and adding animations with CSS and JavaScript.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/cursor-css-property.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
