---
lang: en-US
title: "How to Create a Masonry Layout Using HTML and CSS"
description: "Article(s) > How to Create a Masonry Layout Using HTML and CSS"
icon: fa-brands fa-css3-alt
category: 
  - CSS
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - html
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a Masonry Layout Using HTML and CSS"
    - property: og:description
      content: "How to Create a Masonry Layout Using HTML and CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-mansory-layout-using-html-and-css.html
prev: /programming/css/articles/README.md
date: 2024-06-18
isOriginal: false
author:
  - name: Fanny Nyayic
    url : https://freecodecamp.org/news/author/nyayicfanny/
cover: https://freecodecamp.org/news/content/images/2024/06/HTML---CSS-Only-Masonry-Layout.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Masonry Layout Using HTML and CSS"
  desc="A masonry layout is a grid-based design where items are arranged in a way that minimizes vertical gaps between them.  an example of a masonry layout Unlike traditional grids with fixed row heights, masonry layouts adjust the positioning of items dyn..."
  url="https://freecodecamp.org/news/how-to-create-a-mansory-layout-using-html-and-css"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/06/HTML---CSS-Only-Masonry-Layout.png"/>

A masonry layout is a grid-based design where items are arranged in a way that minimizes vertical gaps between them.

![an example of a masonry layout](https://freecodecamp.org/news/content/images/2024/06/masonry-layout.png)

Unlike traditional grids with fixed row heights, masonry layouts adjust the positioning of items dynamically based on their content height, creating a visually appealing and space-efficient arrangement.

---

## Key Characteristics of Masonry Layouts

- Items can have varying heights, which makes the layout look more organic and less uniform when compared to standard grids.
- Items are positioned to fill vertical gaps, creating a tightly packed layout without large spaces between items.
- Masonry layouts can adapt to different screen sizes, adjusting the number of columns and the positioning of items accordingly.
- The layout is often used for galleries, portfolios, and other visual content where an aesthetically pleasing presentation is important.

::: tip Common Uses

- Image Galleries: Displaying images of different sizes without cropping.
- Blog Layouts: Arranging posts of varying lengths.
- E-commerce Sites: Showcasing products with different dimensions.

:::

::: info How It Works

Masonry layouts are often implemented using CSS Grid or JavaScript libraries like Masonry.js. Here, we'll focus on the CSS Grid approach.

:::

---

## How to Create a Masonry Layout

### Step 1: Set Up Your Project

- Create a project folder: Create a folder for your project on your computer.
- Create HTML and CSS files: Inside the project folder, create two files: <VPIcon icon="fa-brands fa-html5"/>`index.html` and `styles.css`.

```folder
Masonry/
├── index.html
└── styles.css
```

### Step 2: Write the HTML

- Use a text editor like Visual Studio Code, Sublime Text, or any other editor you prefer.
- Add the basic structure of an HTML document by pressing <kbd>Shift</kbd>+<kbd>`</kbd>
- Change the title from Document to "CSS Masonry Layout"
- Below the title, link your <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` file as shown below:

```html{7} title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Masonry Layout</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

</body>
</html>
```

- After setting up your HTML structure, create the different divisions for your layout within the body area.

```html
<div class="masonry">
  <div class="item item1">Item 1</div>
  <div class="item item2">Item 2</div>
  <div class="item item3">Item 3</div>
  <div class="item item4">Item 4</div>
  <div class="item item5">Item 5</div>
  <div class="item item6">Item 6</div>
  <div class="item item7">Item 7</div>
  <div class="item item8">Item 8</div>
  <div class="item item9">Item 9</div>
  <div class="item item10">Item 10</div>
</div>
```

- `<div class="masonry">` is the container for our masonry layout. We'll use CSS Grid to create the masonry effect inside this container.
- `<div class="item item1">Item 1</div>` to `<div class="item item10">Item 10</div>` are the individual items (or boxes) inside our masonry layout. Each item has a class of `item` to style them uniformly and a specific class (for example: `item1`, `item2`, and so on) to apply unique styles—like different heights and colors—to each item.

Breakdown of the CSS classes:

- `item`: This class is used to style all items uniformly. It sets the background color, padding, box-sizing, box shadow, border-radius, and transitions for the items.
- `item1` to `item10`: These classes are used to set specific styles for each item. For example, `item1` might have a different height and background color than `item2`, and so on. These classes will be used in the CSS to apply specific styles.

#### Step 3: Style with CSS

- Open <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` in a text editor: Use the same text editor to open your CSS file.
- Add some basic styles for the `body` and the `masonry` container.

```css title="styles.css"
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 0;
}
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 10px;
  gap: 20px;
}
```

::: info What this means:

- `body` sets the font, background color, padding, and removes default margin.
- `.masonry` uses CSS Grid to create a responsive layout with columns that are at least `200px` wide and automatically fills the available space. The rows have a base height of `10px`, and there's a `20px` gap between items.

:::

Add styles for the items inside the masonry layout.

```css
.item {
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #fff;
}
.item:hover {
  transform: translateY(-10px);
}
```

::: info What the above means:

- `.item` sets a white background, padding, box shadow for elevation, rounded corners, and a hover effect to lift the item slightly. `display: flex` centers the content.
- `.item:hover` will add a transform effect when the item is hovered on.

:::

Set specific dimensions and colors by defining specific styles for each item to give them different heights and background colors.

```css
.item1 { grid-row: span 15; background-color: #ff6f61; }
.item2 { grid-row: span 20; background-color: #6b5b95; }
.item3 { grid-row: span 10; background-color: #88b04b; }
.item4 { grid-row: span 25; background-color: #d65076; }
.item5 { grid-row: span 30; background-color: #ffb347; }
.item6 { grid-row: span 15; background-color: #45b8ac; }
.item7 { grid-row: span 20; background-color: #e94b3c; }
.item8 { grid-row: span 10; background-color: #6c5b7b; }
.item9 { grid-row: span 25; background-color: #00a86b; }
.item10 { grid-row: span 30; background-color: #b565a7;}
```

- Each item class (.item1, .item2, and so on) sets the number of rows it spans (grid-row: span X;) and assigns a unique background color.

### Step 4: View Your Layout

Open <VPIcon icon="fa-brands fa-html5"/>`index.html` in a web browser to see the masonry layout.

You can add more items, change colors, or adjust sizes to fit your design needs. Below is the layout we created.

![](https://freecodecamp.org/news/content/images/2024/06/masonry-layout-1.png)

### Putting it all together

The <VPIcon icon="fa-brands fa-html5"/>`index.html` file should look like this:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Masonry Layout</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="masonry">
      <div class="item item1">Item 1</div>
      <div class="item item2">Item 2</div>
      <div class="item item3">Item 3</div>
      <div class="item item4">Item 4</div>
      <div class="item item5">Item 5</div>
      <div class="item item6">Item 6</div>
      <div class="item item7">Item 7</div>
      <div class="item item8">Item 8</div>
      <div class="item item9">Item 9</div>
      <div class="item item10">Item 10</div>
    </div>
  </body>
</html>
```

The <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` file will look like this:.

```css :collapsed-lines title="styles.css"
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  padding: 20px;
  margin: 0;
}
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 10px;
  gap: 20px;
}

.item {
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: #fff;
}

.item:hover {
  transform: translateY(-10px);
}

/* Specific dimensions and colors for each item */
.item1 { grid-row: span 15; background-color: #ff6f61; }
.item2 { grid-row: span 20; background-color: #6b5b95; }
.item3 { grid-row: span 10; background-color: #88b04b; }
.item4 { grid-row: span 25; background-color: #d65076; }
.item5 { grid-row: span 30; background-color: #ffb347; }
.item6 { grid-row: span 15; background-color: #45b8ac; }
.item7 { grid-row: span 20; background-color: #e94b3c; }
.item8 { grid-row: span 10; background-color: #6c5b7b; }
.item9 { grid-row: span 25; background-color: #00a86b; }
.item10 { grid-row: span 30; background-color: #b565a7; }
```

---

## Summary

A masonry layout is an effective way to display content with varying heights in a grid-like structure without large vertical gaps, making it ideal for image galleries, blogs, and portfolios.

Using CSS Grid, you can create a responsive and visually appealing masonry layout with minimal code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Masonry Layout Using HTML and CSS",
  "desc": "A masonry layout is a grid-based design where items are arranged in a way that minimizes vertical gaps between them.  an example of a masonry layout Unlike traditional grids with fixed row heights, masonry layouts adjust the positioning of items dyn...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-mansory-layout-using-html-and-css.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
