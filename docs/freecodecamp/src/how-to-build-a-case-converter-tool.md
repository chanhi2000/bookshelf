---
lang: en-US
title: "How to Build a Case Converter Tool Using HTML, CSS, and JavaScript"
description: "Article(s) > How to Build a Case Converter Tool Using HTML, CSS, and JavaScript"
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
      content: "Article(s) > How to Build a Case Converter Tool Using HTML, CSS, and JavaScript"
    - property: og:description
      content: "How to Build a Case Converter Tool Using HTML, CSS, and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-case-converter-tool.html
prev: /programming/js/articles/README.md
date: 2026-06-12
isOriginal: false
author:
  - name: Bansidhar Kadiya
    url: https://freecodecamp.org/news/author/99tools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/72153c4c-a59f-4cc8-a6c5-2bd457c729ab.png
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
  name="How to Build a Case Converter Tool Using HTML, CSS, and JavaScript"
  desc="If you're looking to level up your front-end development skills by building a practical web utility, this is the guide for you. We'll code a fully functional Case Converter Tool from scratch using onl"
  url="https://freecodecamp.org/news/how-to-build-a-case-converter-tool"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/72153c4c-a59f-4cc8-a6c5-2bd457c729ab.png"/>

If you're looking to level up your front-end development skills by building a practical web utility, this is the guide for you.

We'll code a fully functional Case Converter Tool from scratch using only HTML, CSS, and vanilla JavaScript.

This lightweight application allows users to paste their content and immediately transform it into standard formats like UPPERCASE, lowercase, Title Case, and Sentence case.

Alongside the text formatting, we'll integrate a live character counter and set up functionality to export the final text as a PDF or Word document.

Grab your favorite code editor, and let's dive in.

::: note Prerequisites

Before you begin, you should have a basic familiarity with the following tools and concepts:

- **Core Web Technologies:** A fundamental understanding of HTML structure, basic CSS styling, and JavaScript concepts like functions, array methods, and string manipulation.
- **Development Environment:** A code editor installed on your computer (for example, Visual Studio Code) and a modern web browser to test your application locally.

:::

---

## Step 1: Set Up Your Project

Before writing any code, you need to establish a clean directory structure for your application files.

First, you'll need to initialize a workspace. Open your file manager and create a brand new directory to keep your work organized. Let's name this directory `case-converter-app`.

Then you'll generate the required files. Inside your newly created directory, set up the following three blank files:

- .<VPIcon icon="fa-brands fa-html5"/>`index.html`
- .<VPIcon icon="fa-brands fa-css3-alt"/>`styles.css`
- .<VPIcon icon="fa-brands fa-js"/>`script.js`

---

## Step 2: Build the HTML Structure

Open the <VPIcon icon="fa-brands fa-html5"/>`index.html` file in your code editor. You'll add the structural foundation of the tool here.

Add the following code into your <VPIcon icon="fa-brands fa-html5"/>`index.html` file:

```html :collapsed-lines title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Case Converter Tool</title>
    <link rel="stylesheet" href="styles.css" />

    <!-- jsPDF library for generating PDF files -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- Google Fonts for a modern look -->
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="app-container">
      <div class="editor-section">
        <div class="textarea-header">
          <span class="tip-badge"
            >💡 Tip: Use Download buttons to save results</span
          >
        </div>
        <textarea
          id="inputText"
          placeholder="Type or paste your content here..."
        ></textarea>
      </div>

      <!-- Case Conversion Buttons -->
      <div class="button-grid case-buttons">
        <button class="case-btn" onclick="convertCase(event, 'upper')">
          UPPER CASE
        </button>
        <button class="case-btn" onclick="convertCase(event, 'lower')">
          lower case
        </button>
        <button class="case-btn" onclick="convertCase(event, 'capitalized')">
          Capitalized Case
        </button>
        <button class="case-btn" onclick="convertCase(event, 'title')">
          Title Case
        </button>
        <button class="case-btn" onclick="convertCase(event, 'sentence')">
          Sentence case
        </button>
        <button class="case-btn" onclick="convertCase(event, 'inverse')">
          iNvErSe CaSe
        </button>
        <button class="case-btn" onclick="convertCase(event, 'alternate')">
          aLtErNaTiNg cAsE
        </button>
      </div>

      <div class="divider"></div>

      <!-- Action Buttons -->
      <div class="button-grid action-buttons">
        <button
          class="action-btn primary-action copy-btn"
          onclick="copyToClipboard()"
        >
          Copy To Clipboard
        </button>
        <button class="action-btn" onclick="downloadPDF()">Download PDF</button>
        <button class="action-btn" onclick="downloadWord()">
          Download Word
        </button>
        <button class="action-btn danger-action" onclick="clearText()">
          Clear Text
        </button>
      </div>

      <!-- Real-time Statistics -->
      <div class="stats-panel">
        <div class="stat-box">
          <span class="stat-value" id="charCount">0</span>
          <span class="stat-label">Characters</span>
        </div>
        <div class="stat-box">
          <span class="stat-value" id="wordCount">0</span>
          <span class="stat-label">Words</span>
        </div>
        <div class="stat-box">
          <span class="stat-value" id="paragraphCount">0</span>
          <span class="stat-label">Paragraphs</span>
        </div>
        <div class="stat-box">
          <span class="stat-value" id="sentenceCount">0</span>
          <span class="stat-label">Sentences</span>
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

::: info Understanding this HTML

- `<script src="...jspdf..."></script>`: This links to an external library that allows JavaScript to generate PDF files directly in the user's browser.
- `<textarea id="inputText">`: This creates the main text box where users will paste their content.
- `<div class="stats-panel">`: This section contains `span` elements with unique IDs. You'll target these IDs with JavaScript to update the text statistics in real-time.

:::

---

## Step 3: Style the Tool with CSS

Next, you'll give the tool a clean, professional design. Open your <VPIcon icon="fa-brands fa-css3-alt"/>`styles.css` file and add the following code:

```css :collapsed-lines title="styles.css"
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  color: #1e293b;
}

.app-container {
  background: #ffffff;
  width: 100%;
  max-width: 900px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  padding: 2.5rem;
}

.textarea-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.tip-badge {
  background: #fef08a;
  color: #854d0e;
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

textarea {
  width: 100%;
  height: 220px;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  transition: all 0.3s ease;
  background: #f8fafc;
}

textarea:focus {
  border-color: #007bff;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

button {
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.case-btn {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.case-btn:hover {
  background: #e2e8f0;
}

/* The active class highlights the selected button */
.case-btn.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.25);
}

.divider {
  height: 1px;
  background: #e2e8f0;
  margin: 1.5rem 0;
}

.action-btn {
  background: #fff;
  border: 1px solid #cbd5e1;
}

.action-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.primary-action {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.primary-action:hover {
  background: #0056b3;
  border-color: #0056b3;
}

.danger-action {
  color: #ef4444;
  border-color: #fca5a5;
  background: #fef2f2;
}

.danger-action:hover {
  background: #fee2e2;
  border-color: #f87171;
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
}
```

::: info Understanding this CSS

- `body`: You use Flexbox to center the tool perfectly on the screen and apply a soft gradient background.
- `.app-container`: This creates a white, rounded card with a soft shadow to hold the user interface.
- `.case-btn.active`: You define an active state here. You'll use JavaScript to apply this class to the specific button the user clicks.

:::

At this stage, we've completely structured and styled the user interface. The tool will look like this:

![Case Converter Tool screenshot](https://cdn.hashnode.com/uploads/covers/699c7b22cf5def0f6aaf982b/53e128aa-fb0d-47f3-8dca-9e3e0aa130c1.png)

Right now, the front-end is visible, but the buttons are entirely static. To make the transformations actually work, we have to write the logic in JavaScript.

---

## Step 4: Add JavaScript Functionality

Now you need to make the tool interactive. Open the <VPIcon icon="fa-brands fa-js"/>`script.js` file and add this code:

```js title="script.js"
const textArea = document.getElementById('inputText');

// Listen for typing to update statistics in real-time
textArea.addEventListener('input', updateStats);

function updateStats() {
  const text = textArea.value;

  document.getElementById('charCount').textContent = text.length;

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  document.getElementById('wordCount').textContent = words.length;

  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  document.getElementById('sentenceCount').textContent = sentences.length;

  const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0);
  document.getElementById('paragraphCount').textContent = paragraphs.length;
}

function convertCase(event, type) {
  let text = textArea.value;
  if (!text) return;

  // Highlight the active button
  const buttons = document.querySelectorAll('.case-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (event) {
    event.target.classList.add('active');
  }

  // Process the text
  switch (type) {
    case 'upper':
      text = text.toUpperCase();
      break;
    case 'lower':
      text = text.toLowerCase();
      break;
    case 'capitalized':
      text = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      break;
    case 'title':
      const minorWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by'];
      text = text.toLowerCase().split(' ').map((word, index) => {
        if (index !== 0 && minorWords.includes(word)) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
      break;
    case 'sentence':
      text = text.toLowerCase().replace(/(^\s*\w|[.\!\?]\n*\s*\w)/g, c => c.toUpperCase());
      break;
    case 'inverse':
      text = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('');
      break;
    case 'alternate':
      text = text.toLowerCase().split('').map((c, i) => i % 2 === 0 ? c : c.toUpperCase()).join('');
      break;
  }

  textArea.value = text;
  updateStats();
}

function copyToClipboard() {
  if (!textArea.value) return;
  textArea.select();
  document.execCommand('copy');

  const copyBtn = document.querySelector('.copy-btn');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => copyBtn.textContent = 'Copy To Clipboard', 1500);
}

function clearText() {
  textArea.value = '';
  updateStats();
  document.querySelectorAll('.case-btn').forEach(btn => btn.classList.remove('active'));
}

function downloadWord() {
  if (!textArea.value) return;
  const blob = new Blob([textArea.value], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'converted_text.doc';
  a.click();
  URL.revokeObjectURL(url);
}

function downloadPDF() {
  if (!textArea.value) return;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const splitText = doc.splitTextToSize(textArea.value, 180);
  doc.text(splitText, 15, 15);
  doc.save('converted_text.pdf');
}
```

::: info Understanding this JavaScript

- `addEventListener('input', ...)`: This listens to every single keystroke. Every time you type, it instantly recalculates the words, characters, and sentences.
- `convertCase(event, type)`: This function takes the selected style (like `upper` or `sentence`) and applies Regular Expressions (Regex) or array mapping to format the string. It also dynamically adds the `.active` CSS class to the specific button you clicked.
- `document.execCommand('copy')`: This is a browser command that copies the selected text directly to the user's clipboard.
- `new Blob()`: You use a Blob (Binary Large Object) to construct a file out of the text on the fly. This allows users to download a `.doc` file without needing a backend server.

:::

---

## Step 5: Test Your Tool

You're now ready to evaluate your code in a real browser environment.

1. Open the <VPIcon icon="fas fa-folder-open"/>`case-converter-app` folder on your computer.
2. Double-click the <VPIcon icon="fa-brands fa-html5"/>`index.html` file to launch the application.
3. Paste a long paragraph into the text area to verify that the live statistics update accurately.
4. Switch between the formatting options to observe the immediate DOM manipulation, and test the export buttons to ensure files are downloading correctly.

---

## Conclusion

In this tutorial, you successfully engineered a browser-based Case Converter Tool using vanilla JavaScript.

You learned how to handle continuous user inputs, manipulate string data using Regular Expressions, and trigger local file downloads directly from the front end.

Most importantly, you learned that modern web browsers are highly capable of handling complex document modifications locally, removing the strict need for external backend servers. This method guarantees fast processing speeds and keeps user data completely private.

For a live demonstration of these concepts in a production environment, feel free to test out this [<VPIcon icon="fas fa-globe"/>Case Converter](https://99tools.net/case-converter/) and experience how seamlessly these text transformations operate.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Case Converter Tool Using HTML, CSS, and JavaScript",
  "desc": "If you're looking to level up your front-end development skills by building a practical web utility, this is the guide for you. We'll code a fully functional Case Converter Tool from scratch using onl",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-case-converter-tool.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
