---
lang: en-US
title: "How to Build a Text Compare Tool with HTML, CSS, and JavaScript"
description: "Article(s) > How to Build a Text Compare Tool with HTML, CSS, and JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Text Compare Tool with HTML, CSS, and JavaScript"
    - property: og:description
      content: "How to Build a Text Compare Tool with HTML, CSS, and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-text-compare-tool-html-css-javascript.html
prev: /programming/js/articles/README.md
date: 2026-07-02
isOriginal: false
author:
  - name: Bansidhar Kadiya
    url: https://freecodecamp.org/news/author/99tools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/632b58c6-8930-421d-b17d-847b24bb0e9e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Build a Text Compare Tool with HTML, CSS, and JavaScript"
  desc="Have you ever tried to spot the differences between two long paragraphs of text? Reading line-by-line to find a missing word or a new sentence is a massive headache. In this tutorial, you'll build you"
  url="https://freecodecamp.org/news/how-to-build-text-compare-tool-html-css-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/632b58c6-8930-421d-b17d-847b24bb0e9e.png"/>

Have you ever tried to spot the differences between two long paragraphs of text? Reading line-by-line to find a missing word or a new sentence is a massive headache.

In this tutorial, you'll build your very own browser-based Text Compare Tool. It will take an original piece of text, compare it against a changed version, and instantly highlight exactly what was added or removed.

Building this project will help you level up your JavaScript skills. You'll also create a tool that's highly secure, because everything happens locally in the user's browser. No sensitive data is ever sent to a server.

Let’s get started.

::: note Prerequisites

To follow along easily, you should know:

- **Basic HTML and CSS knowledge:** How to structure a page and use Flexbox to put items side-by-side.
- **Basic JavaScript knowledge:** How to write functions, use arrays, and listen for button clicks.
- **Your Setup:** A code editor (like VS Code) and a web browser to view your work.

:::

---

## Step 1: Set Up Your Project Files

First, you need a place to store your code. Create a new folder on your computer and name it `text-compare-tool`.

Inside that folder, create three empty files:

- .<VPIcon icon="fa-brands fa-html5"/>`index.html` (This holds the structure of your app)
- .<VPIcon icon="fa-brands fa-css3-alt"/>`style.css` (This makes your app look good)
- .<VPIcon icon="fa-brands fa-js"/>`script.js` (This makes your app actually work)

---

## Step 2: Build the HTML Structure

Open your <VPIcon icon="fa-brands fa-html"/>`index.html` file. You need to create a simple layout with two large text boxes: one for the original text, and one for the updated text.

Copy and paste this code into your HTML file:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Text Compare Tool</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Text Compare Tool</h1>
    <p class="description">
      Quickly find every addition and deletion between two versions of your
      text. Just paste them into our tool, and we’ll show you exactly what’s
      been changed.
    </p>

    <div class="container">
      <div class="panels-wrapper">
        <!-- Left Side: Original Text -->
        <div class="panel">
          <textarea
            id="text1"
            placeholder="Paste your original text here..."
          ></textarea>
          <div id="result1" class="result-box"></div>
        </div>

        <!-- Right Side: Changed Text -->
        <div class="panel">
          <textarea
            id="text2"
            placeholder="Paste your changed text here..."
          ></textarea>
          <div id="result2" class="result-box"></div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="controls">
        <button class="btn-compare" onclick="compareText()">Compare</button>
        <button class="btn-clear" onclick="clearText()">Clear</button>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

::: info Understanding the HTML:

- **The two panels:** Inside the `.panels-wrapper`, you have a left side and a right side.
- **Textareas vs results:** Each side has a `<textarea>` where the user can type. Right below the text area is a `<div>` with the class `.result-box`. Right now, those result boxes are invisible. Later, JavaScript will hide the text areas and show the result boxes instead.
- **The buttons:** The "Compare" and "Clear" buttons are hooked up to JavaScript functions using `onclick`.

:::

---

## Step 3: Style the Tool with CSS

A good utility tool should be easy on the eyes. You'll use a clean white and blue design, and apply soft red and green colors to highlight the text changes.

Open your <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file and add this code:

```css :collapsed-lines title="style.css"
:root {
  --primary-blue: #007bff;
  --background-color: #f8f9fa;
  --text-color: #202124;
  --border-color: #dadce0;

  /* Highlight Colors */
  --red-bg: #fce8e6;
  --red-text: #c5221f;
  --green-bg: #e6f4ea;
  --green-text: #137333;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  margin: 0;
}

h1 {
  margin-bottom: 10px;
}

.description {
  text-align: center;
  max-width: 600px;
  color: #5f6368;
  margin-bottom: 30px;
  line-height: 1.5;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.panels-wrapper {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

textarea,
.result-box {
  width: 100%;
  height: 300px;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 16px;
  line-height: 1.5;
  box-sizing: border-box;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border-color: var(--primary-blue);
}

/* Hidden by default */
.result-box {
  display: none;
  background-color: #fafafa;
  overflow-y: auto;
  white-space: pre-wrap;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 10px 25px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-compare {
  background-color: var(--primary-blue);
  color: white;
}

.btn-clear {
  background-color: white;
  color: var(--primary-blue);
  border: 1px solid var(--border-color);
}

/* How the differences will look */
.deleted {
  background-color: var(--red-bg);
  color: var(--red-text);
  padding: 2px 4px;
  border-radius: 3px;
}

.added {
  background-color: var(--green-bg);
  color: var(--green-text);
  padding: 2px 4px;
  border-radius: 3px;
}
```

::: info Understanding the CSS:

- **Flexbox layout:** `display: flex;` inside `.panels-wrapper` is what places your two text boxes neatly side-by-side.
- **The highlighters:** The `.deleted` and `.added` classes are the most important part of the visual design. When a user deletes a word, we give it a soft red background. When they add a word, it gets a soft green background.

:::

This is what your tool will look like once it's finished:

![Text Compare Tool Preview](https://cdn.hashnode.com/uploads/covers/699c7b22cf5def0f6aaf982b/6676b86c-c0ea-4dec-b5b7-489e8e06f58b.png)

---

## Step 4: Write the JavaScript Engine

Now you need to make the tool actually work. How does your computer know if a word has changed?

We have to write logic that breaks paragraphs down into individual words. The code will look at the original list of words and compare it to the new list. If a word from the original text is missing, it gets marked as "deleted." If a brand new word appears, it gets marked as "added."

Open your <VPIcon icon="fa-brands fa-js"/>`script.js` file and paste in this complete, working code:

```js :collapsed-lines title="script.js"
function compareText() {
  // 1. Grab the text from the text boxes
  const text1 = document.getElementById('text1').value;
  const text2 = document.getElementById('text2').value;

  // 2. Chop the text up into an array of words (and keep the spaces)
  const words1 = text1.split(/(\s+)/);
  const words2 = text2.split(/(\s+)/);

  // 3. Find the differences
  const { diff1, diff2 } = calculateDifferences(words1, words2);

  const resultBox1 = document.getElementById('result1');
  const resultBox2 = document.getElementById('result2');

  // 4. Turn those differences into HTML with colors
  resultBox1.innerHTML = createColoredHTML(diff1, 'deleted');
  resultBox2.innerHTML = createColoredHTML(diff2, 'added');

  // 5. Hide the text boxes and show the final results
  document.getElementById('text1').style.display = 'none';
  document.getElementById('text2').style.display = 'none';
  resultBox1.style.display = 'block';
  resultBox2.style.display = 'block';
}

// The engine that compares the two lists of words
function calculateDifferences(arr1, arr2) {
  const n = arr1.length;
  const m = arr2.length;

  // Create a grid to keep track of matching words
  const grid = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (arr1[i - 1] === arr2[j - 1]) {
        grid[i][j] = grid[i - 1][j - 1] + 1;
      } else {
        grid[i][j] = Math.max(grid[i - 1][j], grid[i][j - 1]);
      }
    }
  }

  let i = n, j = m;
  const diff1 = [];
  const diff2 = [];

  // Walk backwards through the grid to mark what changed
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && arr1[i - 1] === arr2[j - 1]) {
      diff1.unshift({ value: arr1[i - 1], type: 'equal' });
      diff2.unshift({ value: arr2[j - 1], type: 'equal' });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || grid[i][j - 1] >= grid[i - 1][j])) {
      diff2.unshift({ value: arr2[j - 1], type: 'changed' });
      j--;
    } else if (i > 0 && (j === 0 || grid[i][j - 1] < grid[i - 1][j])) {
      diff1.unshift({ value: arr1[i - 1], type: 'changed' });
      i--;
    }
  }

  return { diff1, diff2 };
}

// Packages the text safely into HTML span elements
function createColoredHTML(diffArray, colorClass) {
  return diffArray.map(wordItem => {
    // Replace dangerous characters so the browser doesn't crash
    const safeText = wordItem.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // If the word was changed (and isn't just a blank space), wrap it in color
    if (wordItem.type === 'changed' && !/^\s+$/.test(wordItem.value)) {
      return `<span class="${colorClass}">${safeText}</span>`;
    }
    return safeText;
  }).join('');
}

// Puts the tool back to its default state
function clearText() {
  document.getElementById('text1').value = '';
  document.getElementById('text2').value = '';

  document.getElementById('text1').style.display = 'block';
  document.getElementById('text2').style.display = 'block';

  document.getElementById('result1').style.display = 'none';
  document.getElementById('result2').style.display = 'none';
}
```

::: info Understanding the JavaScript

1. **Keeping the formatting:** In the first function, you see `.split(/(\s+)/)`. This splits the text up by spaces, but *keeps* the spaces and line-breaks. If you don't do this, all of the user's paragraphs will mash into one giant block of text!
2. **The grid system:** The `calculateDifferences` function creates an invisible grid. It compares every word in the first box with every word in the second box. If it sees the same word in the same order, it leaves it alone. If it hits a snag, it marks the word as a change.
3. **Safety first:** The `createColoredHTML` function wraps our changed words in `<span class="added">` or `<span class="deleted">` so CSS can color them. But before it does that, it removes any `<` or `>` symbols using `.replace()`. This stops hackers from pasting malicious code into your app.

:::

---

## Step 5: Test Your Application

You're completely done coding! Now it’s time to see it in action.

1. Open your `text-compare-tool` folder.
2. Double-click the <VPIcon icon="fa-brands fa-html"/>`index.html` file. It will open in your default web browser.
3. Type a sentence into the left box: *"The quick brown fox jumps over the lazy dog."*
4. Type a slightly different sentence into the right box: *"The fast brown fox jumps over the sleepy dog."*
5. Click **Compare**.

You will instantly see the word "quick" highlight in red on the left, and the word "fast" highlight in green on the right. If you want to start over, just click **Clear**.

---

## Conclusion

Great job! You just built a highly practical, browser-based text comparison utility using nothing but pure HTML, CSS, and JavaScript.

You learned how to break text into arrays, compare them using a grid-based algorithm, and manipulate the DOM to show those differences to the user safely. Because this tool relies on local browser processing, it's incredibly fast and 100% private.

If you want to see this exact logic running in a live production environment, or if you need to bookmark a fast tool for your own writing tasks, check out the live [<VPIcon icon="fas fa-globe"/>Text Compare Tool](https://99tools.net/text-compare-tool/). Keep experimenting with the code, and happy building!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Text Compare Tool with HTML, CSS, and JavaScript",
  "desc": "Have you ever tried to spot the differences between two long paragraphs of text? Reading line-by-line to find a missing word or a new sentence is a massive headache. In this tutorial, you'll build you",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-text-compare-tool-html-css-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
