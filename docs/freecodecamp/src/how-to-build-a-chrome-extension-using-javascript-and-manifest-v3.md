---
lang: en-US
title: "How to Build a Chrome Extension That Analyzes Any Web Page Using JavaScript and Manifest V3"
description: "Article(s) > How to Build a Chrome Extension That Analyzes Any Web Page Using JavaScript and Manifest V3"
icon: fa-brands fa-chrome
category:
  - Google
  - Chrome
  - Chrome Extensions
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - google
  - chrome
  - google-chrome
  - chrome-extensions
  - google-chrome-extensions
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Chrome Extension That Analyzes Any Web Page Using JavaScript and Manifest V3"
    - property: og:description
      content: "How to Build a Chrome Extension That Analyzes Any Web Page Using JavaScript and Manifest V3"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-chrome-extension-using-javascript-and-manifest-v3.html
prev: /programming/js/articles/README.md
date: 2025-10-29
isOriginal: false
author:
  - name: Hitesh Chauhan
    url : https://freecodecamp.org/news/author/hiteshchauhan2023/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761670419000/13ac96ca-6e28-413f-a0e0-56ed353a007c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Chrome > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/chrome/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Chrome Extension That Analyzes Any Web Page Using JavaScript and Manifest V3"
  desc="Have you ever visited a website and wondered how well is this page structured? Does it have a meta description? How many links or headings does it use? Usually, you’d open DevTools or an SEO auditing tool to find answers to these questions. But what ..."
  url="https://freecodecamp.org/news/how-to-build-a-chrome-extension-using-javascript-and-manifest-v3"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761670419000/13ac96ca-6e28-413f-a0e0-56ed353a007c.png"/>

Have you ever visited a website and wondered how well is this page structured? Does it have a meta description? How many links or headings does it use?

Usually, you’d open DevTools or an SEO auditing tool to find answers to these questions. But what if you could analyze any web page instantly, without leaving your browser?

In this tutorial, you’ll learn how to build a Chrome extension that scans and analyzes any webpage for titles, meta descriptions, headings, and links.

By the end of this article, you’ll:

- Understand how Manifest V3 works in Chrome Extensions
- Learn how to inject content scripts into web pages
- Build a popup UI that fetches and displays structured data
- Explore how this same foundation can be extended with AI-powered insights

💡 This guide focuses on learning and education – no frameworks or build tools required. Just HTML, CSS, and vanilla JavaScript.

::: note 🧰 Prerequisites

Before starting this tutorial, make sure you have:

- A basic understanding of HTML, CSS, and JavaScript
- A recent version of Google Chrome installed on your system
- Familiarity with using Chrome DevTools (optional but helpful)
- A code editor like VS Code or Sublime Text
- A local folder where you can create and organize your extension files

💡 Again, no frameworks or build tools are required. We’ll use only vanilla JavaScript and simple web technologies throughout this guide.

:::

---

## 🧩 Step 1: Understanding How Chrome Extensions Work

A Chrome extension is just a bundle of web technologies – HTML, CSS, and JS – that extends browser functionality.

Extensions can have multiple parts:

- **Manifest file** (<VPIcon icon="iconfont icon-json"/>`manifest.json`): defines permissions, icons, and structure.
- **Content scripts**: run inside web pages and access the DOM.
- **Background scripts**: handle long-running or event-driven logic.
- **Popup UI**: what users see when they click your extension icon.

Here’s a high-level flow of what we’ll build:

```plaintext
[Popup UI] <—> [Content Script] <—> [Web Page DOM]
```
<!-- TODO: mermaid화 -->

When the user clicks “Analyze,” the popup will send a message to the content script. The script will then read the DOM and send back results like page title, description, headings, and links.

---

## 🧠 Step 2: Set Up the Project Structure

Create a new folder called <VPIcon icon="fas fa-folder-open"/>`page-analyzer-extension`. Inside it, create these files:

```sh title="file structure"
page-analyzer-extension/
│
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── styles.css
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

Icons are optional, but they make the extension look professional. You can use placeholders or generate them from [<VPIcon icon="fas fa-globe"/>favicon.io](https://favicon.io/).

---

## ⚙️ Step 3: Define the Manifest File

Create <VPIcon icon="iconfont icon-json"/>`manifest.json` and paste this in:

```json title="manifest.json"
{
  "manifest_version": 3,
  "name": "Page Analyzer",
  "version": "1.0",
  "description": "Analyze any web page for its title, description, headings, and links.",
  "permissions": ["activeTab", "scripting"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```

Let’s break this down:

- `manifest_version: 3`: the latest version with security and performance improvements
- `permissions`: allow the extension to access the active tab and run scripts
- `content_scripts`: define which JS files should automatically run in web pages

---

## 🧩 Step 4: Create the Popup UI

The popup appears when users click the extension icon.

```html title="popup.html"
<!DOCTYPE html>
<html>
  <head>
    <title>Page Analyzer</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h2>Page Analyzer</h2>
    <p>Click below to analyze the current page:</p>
    <button id="analyze">Analyze Page</button>
    <div id="results"></div>

    <script src="popup.js"></script>
  </body>
</html>
```

```css :collapsed-lines title="styles.css"
body {
  font-family: system-ui, sans-serif;
  padding: 12px;
  width: 280px;
}
button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
#results {
  margin-top: 12px;
  font-size: 13px;
  line-height: 1.4;
  word-wrap: break-word;
}
```

---

## 🧠 Step 5: Write the Content Script (<VPIcon icon="fa-brands fa-js"/>`content.js`)

This script will analyze the web page.

```js title="content.js"
function analyzePage() {
  const title = document.title || "No title found";
  const description =
    document.querySelector('meta[name="description"]')?.content || "No description found";
  const headings = Array.from(document.querySelectorAll("h1, h2, h3")).map((h) =>
    h.innerText.trim()
  );
  const links = document.querySelectorAll("a").length;

  return {
    title,
    description,
    headings,
    linkCount: links,
    domain: location.hostname,
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "analyze") {
    sendResponse(analyzePage());
  }
});
```

::: info What’s happening here:

- We extract the title, description, headings, and total link count
- We return this data as a structured object
- The script listens for messages from the popup and responds with the analysis

:::

---

## ⚡ Step 6: Connect the Popup and Content Script

In <VPIcon icon="fa-brands fa-js"/>`popup.js`, add the logic that triggers page analysis.

```js title="popup.js"
document.getElementById("analyze").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { action: "analyze" }, (response) => {
    const resultContainer = document.getElementById("results");

    if (!response) {
      resultContainer.innerText = "Unable to analyze this page.";
      return;
    }

    const { title, description, headings, linkCount, domain } = response;
    resultContainer.innerHTML = `
      <strong>Domain:</strong> ${domain}<br/>
      <strong>Title:</strong> ${title}<br/>
      <strong>Description:</strong> ${description}<br/>
      <strong>Headings:</strong> ${
        headings.length ? headings.join(", ") : "No headings found"
      }<br/>
      <strong>Links:</strong> ${linkCount}
    `;
  });
});
```

This uses the **Chrome Tabs API** to find the current tab and send a message to the content script. When the script responds, we update the popup with the results.

---

## 🧪 Step 7: Load and Test Your Extension

1. Open chrome://extensions/
2. Enable Developer Mode
3. Click Load Unpacked
4. Select your project folder

Now, pin your extension to the toolbar, open any website, and click “Analyze Page.”

You’ll instantly see:

- The page’s title
- Meta description
- Extracted headings (H1–H3)
- Link count
- Domain name

🎉 Congratulations! You’ve built a working web page analyzer.

---

## 🧩 Step 8: Add Optional Enhancements

Now that the basics work, here are some ways to level up your project.

### 🧠 1. Add AI Insights

You can connect to an AI API (like OpenAI or Gemini) to summarize the page or evaluate SEO structure.

```js
// Example: pseudo-code for calling an AI API
const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${API_KEY}` },
  body: JSON.stringify({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an SEO assistant." },
      { role: "user", content: `Analyze the following page info: ${JSON.stringify(pageData)}` }
    ]
  })
});
```

For example, after building this basic analyzer, I expanded it into a full-featured [<VPIcon icon="fas fa-globe"/>RankingsFactor AI SEO Extension](https://rankingsfactor.com/extension) which combines this same foundation with:

- AI-generated keyword suggestions
- Metadata improvement recommendations
- Automatic screenshot capture
- Page freshness detection

This demonstrates how a simple developer project can evolve into a powerful, production-ready tool.

### 🔍 2. Detect Missing SEO Tags

You can check for missing tags like this:

```js
const missingTags = [];
if (!document.querySelector('meta[name="description"]')) missingTags.push("description");
if (!document.querySelector('meta[property="og:title"]')) missingTags.push("og:title");
```

### 🖼️ 3. Add Screenshot or Report Export

Use the `chrome.tabs.captureVisibleTab()` API to take a screenshot, or generate a downloadable HTML/JSON report.

---

## 🧭 Step 9: Publish to the Chrome Web Store

Once you’ve tested your extension, visit [<VPIcon icon="fa-brands fa-chrome"/>`chrome.google.com/webstore/devconsole`](https://chrome.google.com/webstore/devconsole). You’ll need to pay a one-time $5 developer registration fee, then you can upload your extension as a ZIP file. Make sure you write a clear, helpful description before submitting your extension for review.

---

## ✅ Final Thoughts

In this tutorial, you learned:

- How Chrome extensions communicate between scripts and web pages
- How to safely extract DOM data
- How to display structured information in a popup UI
- How to extend browser tools with AI for smarter analysis

Browser extensions are an incredible way to bring web automation, analysis, and creativity directly into your workflow. Whether you’re analyzing pages, improving accessibility, or experimenting with AI, you now have the foundation to build anything you imagine.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Chrome Extension That Analyzes Any Web Page Using JavaScript and Manifest V3",
  "desc": "Have you ever visited a website and wondered how well is this page structured? Does it have a meta description? How many links or headings does it use? Usually, you’d open DevTools or an SEO auditing tool to find answers to these questions. But what ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-chrome-extension-using-javascript-and-manifest-v3.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
