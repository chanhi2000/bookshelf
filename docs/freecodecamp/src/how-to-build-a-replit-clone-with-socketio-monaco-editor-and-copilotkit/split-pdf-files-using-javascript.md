---
lang: en-US
title: "How to Split PDF Files in the Browser Using JavaScript (Step-by-Step)"
description: "Article(s) > How to Split PDF Files in the Browser Using JavaScript (Step-by-Step)"
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
      content: "Article(s) > How to Split PDF Files in the Browser Using JavaScript (Step-by-Step)"
    - property: og:description
      content: "How to Split PDF Files in the Browser Using JavaScript (Step-by-Step)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/split-pdf-files-using-javascript.html
prev: /programming/js/articles/README.md
date: 2026-04-27
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ff8ed4f5-a0f1-44cd-8703-a6dcd95e6b0f.png
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

[[toc]]

---

<SiteInfo
  name="How to Split PDF Files in the Browser Using JavaScript (Step-by-Step)"
  desc="Working with PDFs is part of everyday development. Sometimes you don’t need the entire document. You just need a few pages — maybe a specific section, a report summary, or selected invoice pages. Most"
  url="https://freecodecamp.org/news/split-pdf-files-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ff8ed4f5-a0f1-44cd-8703-a6dcd95e6b0f.png"/>

Working with PDFs is part of everyday development.

Sometimes you don’t need the entire document. You just need a few pages — maybe a specific section, a report summary, or selected invoice pages.

Most tools require uploading files or installing software. But modern browsers are powerful enough to handle this locally.

In this tutorial, you’ll learn how to build a browser-based PDF splitter using JavaScript, where everything runs directly in the user’s browser.

By the end, you’ll understand how to extract specific pages from a PDF, create a new document from those pages, and download the result instantly.

![split pdf files,extract pages](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1a0d3489-5034-4aed-add4-68bada614c8e.png)

---

## How PDF Splitting Works in the Browser

Splitting a PDF means taking a single document and extracting specific pages into a new file.

Traditionally, this kind of processing is handled on a server. But with modern JavaScript libraries like pdf-lib, we can do everything directly in the browser.

The process is straightforward. A user uploads a PDF file, the browser reads it, and we can display a preview of its pages to help users understand what they’re working with. Based on the selected split mode or page input, we then extract only the required pages and copy them into a new PDF document.

All of this happens locally in the browser, which makes the process faster and ensures that user files never leave their device.

::: info Project Setup

We’ll keep this project simple.

You only need:

- an HTML file
- JavaScript
- a PDF processing library

No backend or server is required.

:::

---

## What Library Are We Using?

We’ll use **pdf-lib**, a lightweight JavaScript library for working with PDFs.

Add it using a CDN:

```html
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
```

This library allows us to:

- load PDFs
- copy pages
- create new documents

---

## Creating the Upload Interface

Start with a simple file input:

```html
<input type="file" id="upload" accept="application/pdf">
<input type="text" id="pages" placeholder="Enter pages (e.g. 1-3,5)">
<button onclick="splitPDF()">Split PDF</button>

<a id="download" style="display:none;">Download Split PDF</a>
```

This interface allows users to upload a PDF file, specify which pages they want to extract, and trigger the splitting process with a single click. Once the process is complete, the download link becomes visible so they can save the new PDF.

---

## Reading the PDF File

Now let’s read the uploaded file:

```js
const fileInput = document.getElementById("upload");

if (!fileInput.files.length) {
  alert("Please upload a PDF file");
  return;
}

const file = fileInput.files[0];
const arrayBuffer = await file.arrayBuffer();
```

This converts the file into a format the library can use.

---

## Selecting Pages to Extract or Split

Users can control how the PDF is split in multiple ways.

They can manually enter page ranges like `1-3,5`, which allows precise selection of pages. For example, entering `1-3` extracts pages 1 to 3, while `5` selects only page 5. In addition to manual input, the tool also provides predefined options such as splitting all pages, extracting only even or odd pages, or splitting the document into fixed-size ranges. These options make it easier for users who don’t want to type page ranges manually.

To support manual input, we use a simple parser that converts the user’s input into valid page indexes:

```js
function parsePages(input, totalPages) {
  const pages = [];

  input.split(',').forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        if (i <= totalPages) pages.push(i - 1);
      }
    } else {
      const num = parseInt(part);
      if (num <= totalPages) pages.push(num - 1);
    }
  });

  return pages;
}
```

This approach gives flexibility, allowing both simple and advanced ways to select pages depending on the user’s needs.

---

## Splitting the PDF Using JavaScript

Now comes the main logic:

```js :collapsed-lines
async function splitPDF() {
  const fileInput = document.getElementById("upload");
  const pageInput = document.getElementById("pages").value;

  if (!fileInput.files.length || !pageInput.trim()) {
    alert("Please upload a PDF and enter page numbers");
    return;
  }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();

  const { PDFDocument } = PDFLib;

  const originalPdf = await PDFDocument.load(arrayBuffer);
  const totalPages = originalPdf.getPageCount();

  const selectedPages = parsePages(pageInput, totalPages);

  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(originalPdf, selectedPages);

  copiedPages.forEach(page => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();

  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  const link = document.getElementById("download");
  link.href = URL.createObjectURL(blob);
  link.download = "split.pdf";
  link.style.display = "inline";
  link.innerText = "Download Split PDF";
}
```

This:

- loads the original file
- extracts selected pages
- creates a new PDF
- prepares it for download

---

## Generating and Downloading the PDF

Once the PDF is created:

```js
link.href = URL.createObjectURL(blob);
link.download = "split.pdf";
```

The browser handles the download instantly — no server needed.

---

## Demo: How the PDF Split Tool Works

Here’s how the full flow looks in practice using the tool:

### Step 1: Upload Your PDF

![PDF splitter tool interface showing drag and drop upload area with select PDF button](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/59361d9e-1f64-428e-8098-49b0976bd3ae.png)

Start by dragging and dropping your PDF file into the upload area, or click the button to select a file from your device. Once uploaded, the tool instantly processes the document and prepares it for splitting.

### Step 2: Preview Pages

![PDF splitter preview showing multiple pages as thumbnails for visual selection](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b6cae555-6b9d-4ea9-afe5-877803574ceb.png)

After uploading, all pages of the PDF are displayed as thumbnails. This gives you a clear visual overview of the document so you can decide how you want to split it.

### Step 3: Choose Split Mode and Options

![PDF splitter settings with options for page range, all pages, fixed range, and odd or even page splitting](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e7ee8c00-8247-41ce-9459-4de7f5e8b1ef.png)

Next, choose how you want to split the PDF. You can select options like splitting by page range, extracting all pages, splitting odd or even pages, or dividing the document into fixed-size sections. This flexibility makes it easy to handle different use cases without manually selecting every page.

### Step 4: Split the PDF

![PDF splitter interface showing split PDF button and start over option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/185b297f-f16e-4269-a885-6dd48903db23.png)

Once your settings are ready, click the split button. The browser processes the file locally and generates the new PDFs based on your selected mode.

### Step 5: Download the Results

![PDF splitter result showing multiple generated files with download buttons and download all option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c3fdf474-9052-4661-9c82-c34515a4423c.png)

After processing, the split files are displayed with download options. You can download individual files or download all of them at once. Everything happens instantly in the browser without uploading your files anywhere.

---

## Important Notes from Real-World Use

When working with PDF splitting, input validation is important.

Users may enter invalid ranges or page numbers that don’t exist. Always validate and limit input to available pages.

Handling large PDFs can also affect performance. Instead of processing everything at once, you can handle operations step by step to keep the browser responsive.

Another key consideration is privacy. Since all processing happens in the browser, files never leave the user’s device. This makes the tool safer for sensitive documents.

In real-world applications, it’s important to clearly communicate that files are not uploaded or stored anywhere.

---

## Common Mistakes to Avoid

One common issue is not validating user input. If users enter incorrect page ranges, the tool may fail or produce unexpected results.

Another mistake is forgetting that page indexes start at zero internally. If you don’t adjust for this, you may extract the wrong pages.

Also, skipping edge cases like empty input or large files can make the tool unreliable.

---

## Conclusion

In this tutorial, you built a browser-based PDF splitter using JavaScript.

You learned how to read PDF files, extract specific pages, and generate a new document entirely in the browser.

This approach removes the need for a backend and keeps everything fast and private.

::: info

If you’d like to see a complete working version of this idea, you can try it here:

<SiteInfo
  name="Split PDF Online Free – Divide & Extract PDF Pages Easily"
  desc="Split PDF files online for free at AllInOneTools. Extract pages, split by range, or divide into multiple files. Fast, secure, and simple PDF splitter."
  url="https://allinonetools.net/split-pdf/"
  logo="https://allinonetools.net/favicon.ico"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0-e1764822756169.webp"/>

:::

Once you understand this pattern, you can extend it further to build more advanced PDF tools like merging, compression, or editing.

And that’s where things start getting really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Split PDF Files in the Browser Using JavaScript (Step-by-Step)",
  "desc": "Working with PDFs is part of everyday development. Sometimes you don’t need the entire document. You just need a few pages — maybe a specific section, a report summary, or selected invoice pages. Most",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/split-pdf-files-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
