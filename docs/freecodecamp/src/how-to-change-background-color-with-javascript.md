---
lang: en-US
title: How to Change Background Color with JavaScript - BG Color in JS and HTML
description: Article(s) > How to Change Background Color with JavaScript - BG Color in JS and HTML
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
      content: "Article(s) > How to Change Background Color with JavaScript – BG Color in JS and HTML"
    - property: og:description
      content: "How to Change Background Color with JavaScript – BG Color in JS and HTML"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-change-background-color-with-javascript.html
prev: /programming/js/articles/README.md
date: 2024-06-29
isOriginal: false
author:
  - name: Ihechikara Abba
    url : https://freecodecamp.org/news/author/Ihechikara/
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/_t-l5FFH8VA/upload/7dac186ffa0ba7f32d72ccf06d1d5baf.jpeg
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
  name="How to Change Background Color with JavaScript – BG Color in JS and HTML"
  desc="You can style elements with JavaScript using the element's style property. In this article, you'll learn how to change background color using JavaScript. Here's what the mini project you'll build looks like: In the image above, each button changes t..."
  url="https://freecodecamp.org/news/how-to-change-background-color-with-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/_t-l5FFH8VA/upload/7dac186ffa0ba7f32d72ccf06d1d5baf.jpeg"/>

You can style elements with JavaScript using the element's `style` property. In this article, you'll learn how to change background color using JavaScript.

Here's what the mini project you'll build looks like:

![image showing five buttons that each change the background color of a page](https://cdn.hashnode.com/res/hashnode/image/upload/v1719585559018/23123259-9540-40c6-8f1f-3f444c154b2c.png)

In the image above, each button changes the background color of the page to a specific color.

::: info

You can get the starter files for the project [here (<VPIcon icon="iconfont icon-github" />`ihechikara/change-bg-color-with-js`)](https://github.com/ihechikara/change-bg-color-with-js/tree/main).

<SiteInfo
  name="ihechikara/change-bg-color-with-js"
  desc="Contribute to ihechikara/change-bg-color-with-js development by creating an account on GitHub."
  url="https://github.com/ihechikara/change-bg-color-with-js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/68b41a7b35f5177438d56d74c61403108109ef349f63d94cbebf46302378ee39/ihechikara/change-bg-color-with-js"/>

:::

There are five buttons in the <VPIcon icon="fa-brands fa-html5"/>`index.html` file, and each of them changes the background color to a specific value:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Change BG Color With JS</title>
</head>
<body>
  <h1>Choose background color</h1>
  <button>Red</button>
  <button>Blue</button>
  <button>Green</button>
  <button>Yellow</button>
  <button>Reset</button>
​
  <script src="script.js"></script>
</body>
</html>
​
```

You won't be making any changes to the <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file. Its purpose is to center the elements on the page and style the buttons to have the same size.

At the moment, nothing happens when you click on the buttons. Let's write the logic for that in the <VPIcon icon="fa-brands fa-js"/>`script.js` file.

---

## How to Change Background Color with JavaScript

To change the background color of an element with JavaScript, you can use the element's `style` property:

Here's how:

```js title="script.js"
function setBgGreen() {
  document.body.style.backgroundColor = 'green';
}
​
function setBgRed() {
  document.body.style.backgroundColor = 'red';
}
​
function setBgBlue() {
  document.body.style.backgroundColor = 'blue';
}
​
function setBgYellow() {
  document.body.style.backgroundColor = 'yellow';
}
​
function defaultBgColor() {
  document.body.style.backgroundColor = 'white';
}
```

In the code above, we created five functions: `setBgGreen()`, `setBgRed()`, `setBgBlue()`, `setBgYellow()`, and `defaultBgColor()`.

Each function has one thing in common: they all target the `body`. Through the `body` element (which represents the webpage), we accessed the `style.backgroundColor` property. The property returns or sets the background color of an element.

So:

- `document.body.style.backgroundColor = 'green';` in the `setBgGreen()` function sets the background color of `body` to green.
- `document.body.style.backgroundColor = 'red';` in the `setBgRed()` function sets the background color of `body` to red.
- `document.body.style.backgroundColor = 'blue';` in the `setBgBlue()` function sets the background color of `body` to blue.
- `document.body.style.backgroundColor = 'yellow';` in the `setBgYellow()` function sets the background color of `body` to yellow.
- `document.body.style.backgroundColor = 'white';` in the `defaultBgColor()` function sets the background color of `body` to white.

Next, you'll assign each function to their respective button using the `onclick` attribute in your HTML file. This is what your <VPIcon icon="fa-brands fa-html5"/>`index.html` file should look like after that:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style.css">
  <title>Change BG Color With JS</title>
</head>
<body>
  <h1>Choose background color</h1>
  <button onclick="setBgRed()">Red</button>
  <button onclick="setBgBlue()">Blue</button>
  <button onclick="setBgGreen()">Green</button>
  <button onclick="setBgYellow()">Yellow</button>
  <button onclick="defaultBgColor()">Reset</button>
​
  <script src="script.js"></script>
</body>
</html>
```

When you click the buttons, you should see the background color of the page change to the color assigned to the button.

Note that this is not only applicable to the `body` element. You can do this for specific parts of your page as well.

For a example, the background color of a `div` with an `id` of `container` can be changed using `container.style.backgroundColor = "red"` .

---

## Conclusion

In this article, you learned how to change background color with JavaScript using an element's `style` property.

::: info

You can find the full project code [here (<VPIcon icon="iconfont icon-github" />`ihechikara/change-bg-color-with-js`)](https://github.com/ihechikara/change-bg-color-with-js/tree/feat/change-bg-color).

<SiteInfo
  name="ihechikara/change-bg-color-with-js at feat/change-bg-color"
  desc="Contribute to ihechikara/change-bg-color-with-js development by creating an account on GitHub."
  url="https://github.com/ihechikara/change-bg-color-with-js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/68b41a7b35f5177438d56d74c61403108109ef349f63d94cbebf46302378ee39/ihechikara/change-bg-color-with-js"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Change Background Color with JavaScript – BG Color in JS and HTML",
  "desc": "You can style elements with JavaScript using the element's style property. In this article, you'll learn how to change background color using JavaScript. Here's what the mini project you'll build looks like: In the image above, each button changes t...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-change-background-color-with-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
