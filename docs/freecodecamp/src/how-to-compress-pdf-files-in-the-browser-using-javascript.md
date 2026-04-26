---
lang: en-US
title: "How to Compress PDF Files in the Browser Using JavaScript (Step-by-Step)"
description: "Article(s) > How to Compress PDF Files in the Browser Using JavaScript (Step-by-Step)"
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
      content: "Article(s) > How to Compress PDF Files in the Browser Using JavaScript (Step-by-Step)"
    - property: og:description
      content: "How to Compress PDF Files in the Browser Using JavaScript (Step-by-Step)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-compress-pdf-files-in-the-browser-using-javascript.html
prev: /programming/js/articles/README.md
date: 2026-05-04
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c46817cf-6587-42c5-b7c1-53b074e77d0a.png
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
  name="How to Compress PDF Files in the Browser Using JavaScript (Step-by-Step)"
  desc="PDF files are everywhere. From invoices and reports to résumés and documents, they’re one of the most common file formats we deal with. But there’s a common problem: PDFs can get large quickly. If you"
  url="https://freecodecamp.org/news/how-to-compress-pdf-files-in-the-browser-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c46817cf-6587-42c5-b7c1-53b074e77d0a.png"/>

PDF files are everywhere. From invoices and reports to résumés and documents, they’re one of the most common file formats we deal with. But there’s a common problem: PDFs can get large quickly.

If you’ve ever tried to upload a PDF and hit a file size limit, you’ve already seen why compression matters.

Most tools solve this by uploading your file to a server. That works, but it’s not always ideal, especially when dealing with private or sensitive documents.

The good news is that modern browsers are powerful enough to handle basic PDF compression locally.

In this tutorial, you’ll learn how to build a **browser-based PDF compression tool using JavaScript**, where everything runs directly in the browser.

![browser-based PDF compression tool allinonetool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/8f448f4a-980d-4792-8c2f-60f6a64f00d1.png)

---

## How PDF Compression Works

PDF compression is different from image compression.

A PDF isn't just a single image. It’s a structured document that can include text, images, fonts, and metadata. Because of this, reducing its size involves optimizing multiple parts of the file rather than applying a single compression method.

In most cases, compressing a PDF means lowering image quality where possible, removing unnecessary or unused data, and optimizing how the document is internally structured.

When working in the browser, we don’t have the same level of control as server-side tools. But we can still reduce file size by reprocessing the document and saving it in a more efficient format.

This approach may not achieve extreme compression, but it works well for creating lighter, more efficient files while keeping everything fast and private.

---

## Project Setup

This project is simple.

You only need:

- an HTML file
- JavaScript
- a PDF library

No backend is required. Everything runs locally in the browser.

---

## What Library Are We Using?

We’ll use **pdf-lib**, which allows us to load and recreate PDF files.

Add it using a CDN:

```html
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
```

---

## Creating the Upload Interface

Start with a simple interface:

```html
<input type="file" id="upload" accept="application/pdf">
<button onclick="compressPDF()">Compress PDF</button>

<a id="download" style="display:none;">Download Compressed PDF</a>
```

This allows users to upload a PDF, trigger compression, and download the result once ready.

---

## Reading the PDF File

Now read the uploaded file:

```js
const fileInput = document.getElementById("upload");

if (!fileInput.files.length) {
  alert("Please upload a PDF");
  return;
}

const file = fileInput.files[0];
const arrayBuffer = await file.arrayBuffer();
```

---

## Understanding Compression Strategy

Since we’re working in the browser, we don’t have full low-level control over PDF compression.

Instead, we focus on practical optimizations that help reduce file size without affecting usability too much. This includes recreating the document structure in a more efficient way, removing unnecessary metadata, and reducing image quality where possible.

The goal here isn’t perfect compression, but producing a lighter file while maintaining acceptable visual quality and readability.

---

## Compressing the PDF

Here’s the core logic:

```js :collapsed-lines
async function compressPDF() {
  const fileInput = document.getElementById("upload");

  if (!fileInput.files.length) {
    alert("Please upload a PDF");
    return;
  }

  const file = fileInput.files[0];
  const arrayBuffer = await file.arrayBuffer();

  const { PDFDocument } = PDFLib;

  const originalPdf = await PDFDocument.load(arrayBuffer);
  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(
    originalPdf,
    originalPdf.getPageIndices()
  );

  pages.forEach(page => newPdf.addPage(page));

  const pdfBytes = await newPdf.save({
    useObjectStreams: true
  });

  const blob = new Blob([pdfBytes], { type: "application/pdf" });

  const link = document.getElementById("download");
  link.href = URL.createObjectURL(blob);
  link.download = "compressed.pdf";
  link.style.display = "inline";
  link.innerText = "Download Compressed PDF";
}
```

This recreates the PDF using optimized object streams, which can reduce file size.

---

## Generating and Downloading the File

Once processed:

```js
link.href = URL.createObjectURL(blob);
link.download = "compressed.pdf";
```

The file is downloaded instantly, without any server interaction.

---

## Demo: How the PDF Compression Tool Works

Here’s how the full flow looks in a real-world scenario using the browser-based PDF compression tool.

### Step 1: Upload PDF

![PDF compression tool interface showing drag and drop upload area with select file button](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/7ae27903-73d3-4897-9214-bcb061ab256a.png)

Start by uploading your PDF file. You can either drag and drop the file into the upload area or click the “Select PDF” button to choose a file from your device.

### Step 2: Preview the PDF

![PDF file preview interface with page navigation controls in browser-based compression tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/8b713246-98cf-4533-8d39-a5dbd89ac181.png)

Once the file is loaded, the tool displays a preview of the document. You can navigate between pages to confirm that the correct file has been uploaded before applying compression.

### Step 3: Choose Compression Settings

![PDF compression settings showing levels like basic, recommended, high and advanced options](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e8612b77-502d-4b53-b7d1-835061fc8e37.png)

Next, select the compression level based on your needs. Lower compression keeps better quality, while higher compression reduces file size more aggressively. You can also explore advanced options like metadata handling.

### Step 4: Compress the PDF

![Compress PDF button with start over option in browser-based PDF compression tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/9450ece1-b064-4184-a267-f6e58b9cddf9.png)

Click the “Compress PDF” button to start the process. The tool processes everything directly in your browser, without uploading files to any server.

### Step 5: Download the Compressed File

![PDF compression result showing reduced file size and download button for optimized file](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a815b5c7-be0b-493d-b1be-6dc7d29b955e.png)

After compression is complete, you’ll see the final result along with the reduced file size. You can then rename and download the optimized PDF instantly.

---

## Important Notes from Real-World Use

When working with PDF compression in the browser, handling large files becomes important.

If a user uploads a very large PDF, processing everything at once can slow down the browser or even cause it to freeze. Instead of trying to process everything blindly, it’s better to add checks and handle files carefully.

For example, you can limit the file size before processing:

```js
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

if (file.size > MAX_SIZE) {
  alert("File is too large. Please upload a file under 10MB.");
  return;
}
```

This prevents performance issues and keeps the tool responsive.

Another useful approach is to process files step by step instead of doing everything at once:

```js
const { PDFDocument } = PDFLib;

const originalPdf = await PDFDocument.load(arrayBuffer);
const newPdf = await PDFDocument.create();

for (let i = 0; i < originalPdf.getPageCount(); i++) {
  const [page] = await newPdf.copyPages(originalPdf, [i]);
  newPdf.addPage(page);
}
```

This spreads the work across smaller steps and avoids blocking the browser.

It’s also important to remember that everything runs client-side. This means files never leave the user’s device, which is great for privacy. But it also means performance depends on the user’s device, so keeping processing efficient is important.

---

## Common Mistakes to Avoid

One common mistake is not validating user input properly before processing the file.

For example, users might try to upload an empty file, a non-PDF file, or even trigger the compression without selecting anything. It’s important to check these cases early to avoid errors later in the process:

```js
const fileInput = document.getElementById("upload");

if (!fileInput.files.length) {
  alert("Please upload a PDF file.");
  return;
}

const file = fileInput.files[0];

if (file.type !== "application/pdf") {
  alert("Only PDF files are supported.");
  return;
}
```

Another issue is allowing invalid or unexpected input to pass through. Even something as simple as an empty or corrupted file can cause the PDF processing to fail, so basic validation makes the tool much more reliable.

Handling large files without any checks is another common problem. If a very large PDF is processed without limits, it can slow down the browser or even make the page unresponsive. Adding a simple file size check helps prevent this:

```js
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

if (file.size > MAX_SIZE) {
  alert("File is too large. Please upload a file under 10MB.");
  return;
}
```

Another mistake is assuming that compression will always produce a significantly smaller file. In reality, browser-based compression is limited compared to dedicated server-side tools, so results can vary depending on the content of the PDF.

In practice, most issues come from missing validation and handling edge cases. Adding a few simple checks early makes the tool more stable and improves the overall user experience.

---

## Conclusion

In this tutorial, you built a browser-based PDF compression tool using JavaScript.

You learned how to read and recreate PDF files, apply basic optimizations, and generate a downloadable file entirely in the browser.

~~If you’d like to try a complete version of this idea, you can check it out here: [https://allinonetools.net/pdf-compressor/](https://allinonetools.net/pdf-compressor/)~~

This approach keeps everything fast, private, and simple to use.

Once you understand this pattern, you can extend it further to build more advanced document tools.

And that’s where things start getting really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Compress PDF Files in the Browser Using JavaScript (Step-by-Step)",
  "desc": "PDF files are everywhere. From invoices and reports to résumés and documents, they’re one of the most common file formats we deal with. But there’s a common problem: PDFs can get large quickly. If you",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-compress-pdf-files-in-the-browser-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
