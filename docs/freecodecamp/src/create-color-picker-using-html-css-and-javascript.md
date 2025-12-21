---
lang: en-US
title: "How to Create A Color Picker Tool Using HTML, CSS, and JavaScript"
description: "Article(s) > How to Create A Color Picker Tool Using HTML, CSS, and JavaScript"
icon: fa-brands fa-js
category: 
  - JavaScript
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create A Color Picker Tool Using HTML, CSS, and JavaScript"
    - property: og:description
      content: "How to Create A Color Picker Tool Using HTML, CSS, and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/create-color-picker-using-html-css-and-javascript.html
prev: /programming/js/articles/README.md
date: 2024-08-15
isOriginal: false
author:
  - name: Fanny Nyayic
    url : https://freecodecamp.org/news/author/nyayicfanny/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723709466316/80aae148-6211-4070-ba33-eb4290408912.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create A Color Picker Tool Using HTML, CSS, and JavaScript"
  desc="Have you ever wanted to create your own interactive tools using just HTML, CSS, and JavaScript? In this article, we'll create a fun and straightforward project: a color picker tool. This handy little tool will let users select any color they like and..."
  url="https://freecodecamp.org/news/create-color-picker-using-html-css-and-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1723709466316/80aae148-6211-4070-ba33-eb4290408912.png"/>

Have you ever wanted to create your own interactive tools using just HTML, CSS, and JavaScript? In this article, we'll create a fun and straightforward project: a color picker tool.

This handy little tool will let users select any color they like and instantly see its HEX and RGB values.

So, grab your favorite code editor, and let's get started!

---

## Step 1: Set Up Your Project

1. **Create a New Folder**: Start by creating a new folder on your computer for this project. You can name it **color-picker-tool**.
2. **Create Files**: Inside the folder, create three files:
    - <VPIcon icon="fa-brands fa-html5"/>`index.html`
    - <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css`
    - <VPIcon icon="fa-brands fa-js"/>`script.js`

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1723707100431/55c7cc93-7b0d-4d67-abb1-8104dbeda18d.png)

---

## Step 2: Build the HTML Structure

### 1. Open the <VPIcon icon="fa-brands fa-html5"/>`index.html` file in your code editor.

**Add Basic HTML Structure**

Add the following code into <VPIcon icon="fa-brands fa-html5"/>`index.html`: or press <kbd>Shift</kbd>+<kbd>!</kbd> then press <kbd>Enter</kbd> to set the Emmet structure, then change the document title to `"Color Picker Tool".`

### 2. Link your <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` and <VPIcon icon="fa-brands fa-js"/>`script.js` files too.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Picker Tool</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <script src="script.js"></script>
</body>
</html>
```

::: info Explanation

- `<!DOCTYPE html>`: This tells the browser that the document is an HTML5 document.
- `<html lang="en">`: The root element of the HTML document, with the language set to English.
- `<head>`: Contains meta-information about the document, like character set and title.
- `<title>`: Sets the title of the webpage, which appears in the browser tab.
- `<link rel="stylesheet" href="styles.css">`: Links to the CSS file that styles the page.
- `<body>`: Contains the content of the webpage.
- `<script src="script.js"></script>`: Links to the JavaScript file that adds interactivity to the page.

:::

### 3. Add the body content:

```html title="index.html"
<div class="color-picker">
  <input type="color" id="colorInput" value="#ff0000">
  <div class="color-info">
    <p>HEX: <span id="hexValue">#ff0000</span></p>
    <p>RGB: <span id="rgbValue">rgb(255, 0, 0)</span></p>
  </div>
</div>
```

::: info Explanation:

- `<div class="color-picker">`: A container for the color picker elements.
- `<input type="color" id="colorInput" value="#ff0000">`: An input element that lets users pick a color. The `value` attribute sets the default color.
- `<div class="color-info">`: A container for displaying color information.
- `<p>HEX: <span id="hexValue">#ff0000</span></p>`: Displays the HEX value of the selected color.
- `<p>RGB: <span id="rgbValue">rgb(255, 0, 0)</span></p>`: Displays the RGB value of the selected color.

:::

![Here is what we'll have](https://cdn.hashnode.com/res/hashnode/image/upload/v1723708023384/8a3b4b0f-39a3-4cc6-9550-64b593cd5662.png)

---

## Step 3: Style with CSS

### 1. Open the <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` file in your code editor.

**Add CSS Styles**

Copy and paste the following code into <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css`:

```css title="styles.css"
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
}
.color-picker {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.color-info {
  margin-top: 20px;
}
p {
  margin: 5px 0;
  font-size: 16px;
}
```

::: info Explanation:

- `body`: Styles the body of the page. It centers the content both vertically and horizontally and sets a light gray background.
- `font-family: Arial, sans-serif;`: Sets the font for the text on the page.
- `display: flex;`: Uses Flexbox to layout the page.
- `justify-content: center;` and `align-items: center;`: Centers the content.
- `height: 100vh;`: Sets the height to 100% of the viewport height.
- `margin: 0;`: Removes default margin.
- `background-color: #f0f0f0;`: Sets the background color of the page.
- `.color-picker`: Styles the color picker container with a white background, padding, rounded corners, and a shadow for a card-like appearance.
- `.color-info`: Adds a margin at the top to separate it from the color input.
- `p`: Styles the paragraphs within the color info, setting margin and font size.

:::

![Here is what we will have](https://cdn.hashnode.com/res/hashnode/image/upload/v1723708068790/0b16e350-d292-4076-b5ee-29016970f762.png)

At this point, we can pick a color but the color codes won't be displayed. To have the color codes displayed, we'll have to add some JavaScript.

---

## Step 4: Add JavaScript Functionality

### 1. Open the <VPIcon icon="fa-brands fa-js"/>`script.js` file in your code editor.

**Add JavaScript Code**

Add the following code into <VPIcon icon="fa-brands fa-js"/>`script.js`:

```js
document.getElementById('colorInput').addEventListener('input', function() {
  const color = this.value;
  document.getElementById('hexValue').textContent = color;
  document.getElementById('rgbValue').textContent = hexToRgb(color);
});
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
```

::: info Explanation:

- `document.getElementById('colorInput')`: Selects the color input element by its `ID`.
- `.addEventListener('input', function() {...})`: Adds an event listener that triggers whenever the user selects a new color.
- `const color = this.value;`: Gets the current value of the color input, which is in HEX format.
- `document.getElementById('hexValue').textContent = color;`: Updates the text content of the HEX value display with the selected color.
- `document.getElementById('rgbValue').textContent = hexToRgb(color);`: Converts the HEX color to RGB and updates the RGB value display.
- `function hexToRgb(hex) {...}`: A function that converts a HEX color string to an RGB string.
  - `parseInt(hex.slice(1, 3), 16)`: Converts the first two characters of the HEX color (after the `#`) to a decimal number, representing the red component.
  - `parseInt(hex.slice(3, 5), 16)`: Converts the next two characters to the green component.
  - `parseInt(hex.slice(5, 7), 16)`: Converts the last two characters to the blue component.
  - `return` rgb(${r}, ${g}, ${b})`;`: Returns the RGB color as a string.

:::

---

## Step 5: Test Your Color Picker Tool

### 1. Open the Project in a Browser

Open the <VPIcon icon="fa-brands fa-html5"/>`index.html` file in a web browser to view your color picker tool.

**Interact with the Tool**

Use the color input to select different colors. The HEX and RGB values should update automatically as you select new colors.

### Final Thoughts

Congratulations! You've successfully created a color picker tool using HTML, CSS, and JavaScript.

This project is a great way to practice working with user input and manipulating the DOM. You can further enhance this tool by adding features like copying color values to the clipboard or saving favorite colors.

Enjoy experimenting and learning!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create A Color Picker Tool Using HTML, CSS, and JavaScript",
  "desc": "Have you ever wanted to create your own interactive tools using just HTML, CSS, and JavaScript? In this article, we'll create a fun and straightforward project: a color picker tool. This handy little tool will let users select any color they like and...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/create-color-picker-using-html-css-and-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
