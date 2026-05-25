---
lang: en-US
title: "How to Build a Browser-Based PDF Rotator Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF Rotator Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF Rotator Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF Rotator Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-rotate-pdf-pages.html
prev: /programming/js/articles/README.md
date: 2026-05-28
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b548434f-958d-438e-9294-b751a4a591be.png
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
  name="How to Build a Browser-Based PDF Rotator Using JavaScript"
  desc="Sometimes PDF pages appear upside down, sideways, or in the wrong orientation after scanning or exporting documents. Instead of re-creating the document manually, users usually just need a quick way t"
  url="https://freecodecamp.org/news/how-to-rotate-pdf-pages"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/b548434f-958d-438e-9294-b751a4a591be.png"/>

Sometimes PDF pages appear upside down, sideways, or in the wrong orientation after scanning or exporting documents.

Instead of re-creating the document manually, users usually just need a quick way to rotate pages and save the corrected version.

Modern browsers make this possible directly with JavaScript.

In this tutorial, you’ll build a browser-based PDF rotator using JavaScript.

The tool will allow users to upload PDF files, preview pages, rotate selected pages, change orientation, generate an updated PDF, preview the final result, rename the file, and download everything directly from the browser.

Everything works entirely client-side without a backend server.

![allinonetools allinone pdf tools kit rotate pdf tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/05e2fd55-8d94-475d-86ed-92ad37e30031.png)

---

## How PDF Rotation Works

PDF rotation works by updating the orientation data of PDF pages.

Instead of modifying the actual content manually, JavaScript libraries can rotate pages programmatically and export an updated version of the document.

The browser loads the PDF file, reads page information, applies rotation values like 90°, 180°, or landscape orientation, and then generates a new downloadable PDF.

Everything happens directly inside the browser.

This keeps the process fast, private, and easy to use without uploading files to external servers.

---

## Project Setup

This project is intentionally simple.

You only need an HTML file, a JavaScript file, and a PDF processing library.

Everything runs entirely inside the browser using JavaScript. No backend server or database is required.

---

## What Library Are We Using?

We’ll use the PDF-lib library for editing PDF files directly in the browser.

Add it using a CDN:

```html
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
```

This library allows us to:

- load PDF documents
- rotate pages
- modify orientation
- export updated PDFs

---

## Creating the Upload Interface

Start with a basic upload input:

```html
<input type="file" id="pdfUpload" accept="application/pdf">

<button onclick="rotatePDF()">
  Rotate PDF
</button>
```

This allows users to upload PDF files directly from the browser.

Here’s what the upload section looks like inside the tool:

![PDF rotator upload interface for browser-based PDF page rotation tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/8e15c027-0c76-46f1-b498-2c5550a1fdfc.png)

---

## Previewing Uploaded PDF Pages

After uploading a PDF file, users can preview pages directly inside the browser before applying rotations.

The preview section also includes rotation controls so users can rotate pages individually as needed before generating the final PDF.

To render previews, we first load the uploaded PDF document:

```js
const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

const totalPages = pdfDoc.getPageCount();
```

Next, we render page previews dynamically:

```js
for (let i = 0; i < totalPages; i++) {
  const page = pdfDoc.getPage(i);

  console.log("Rendering page:", i + 1);
}
```

Users can then move between pages using left and right navigation buttons.

Rotation buttons can also be attached to each preview card:

```js
rotateLeftBtn.addEventListener("click", () => {
  rotatePage(currentPage, -90);
});

rotateRightBtn.addEventListener("click", () => {
  rotatePage(currentPage, 90);
});
```

This makes it easier to verify page orientation before generating the updated PDF.

Here’s what the page preview section looks like:

![PDF preview interface with left and right page navigation controls](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/307f1621-98b4-4110-a37f-7e79095aec4a.png)

---

## Selecting Pages to Rotate

Not every document needs all pages rotated.

Some users may only want to rotate even-numbered pages, odd-numbered pages, or specific pages within the document.

The tool allows users to select which pages should receive the rotation changes before generating the final PDF.

For example, users can choose the rotation scope like this:

```js
const selectedMode = document.querySelector(
  'input[name="pageMode"]:checked'
).value;
```

Specific page ranges can also be supported:

```js
const customPages = document
  .getElementById("customPages")
  .value;
```

This gives users more control over which document pages are modified.

Here’s how the page selection controls look inside the tool:

![PDF page selection options including all pages even pages odd pages and specific pages](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d43b9a7d-f7a0-4d67-b2b8-648d106f9949.png)

---

## Applying Rotation Options

Once the pages are selected, users can apply different rotation actions directly inside the browser.

Pages can be rotated left by 90 degrees, rotated right by 90 degrees, flipped by 180 degrees, or converted into portrait or landscape orientation.

Here’s a simple example using PDF-lib:

```js
const page = pdfDoc.getPage(pageIndex);

page.setRotation(
  PDFLib.degrees(90)
);
```

To rotate pages left:

```js
page.setRotation(
  PDFLib.degrees(-90)
);
```

You can also apply orientation presets dynamically:

```js
if (orientation === "landscape") {
  page.setRotation(PDFLib.degrees(90));
}
```

These controls allow users to fix scanned documents and incorrect page layouts directly inside the browser.

Here’s what the rotation controls look like inside the tool:

![PDF rotation controls with left rotate right rotate flip and orientation options](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/2a5346ed-dc51-4260-9e2d-1364d8cf70d8.png)

---

## Generating the Rotated PDF

After the rotation settings are configured, users can generate the updated PDF directly inside the browser.

The tool processes selected pages, applies rotation changes, and exports a new downloadable PDF file instantly.

For example:

```js
const pdfBytes = await pdfDoc.save();
```

Next, create a downloadable file:

```js
const blob = new Blob(
  [pdfBytes],
  { type: "application/pdf" }
);

const url = URL.createObjectURL(blob);
```

Finally, trigger the download:

```js
const link = document.createElement("a");

link.href = url;
link.download = "rotated-document.pdf";

link.click();
```

This entire workflow runs locally inside the browser without requiring a backend server.

Here’s what the generate button looks like inside the tool:

![Generate rotated PDF button inside browser-based PDF rotator tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b89c8f0d-a398-4753-9def-f91e4a397001.png)

---

## Previewing and Downloading the Final PDF

Once processing is complete, the tool displays a live preview of the rotated document.

Users can review updated pages before downloading the final file.

The interface also shows additional document details such as total pages and file size.

A rename option is available before downloading the generated PDF.

For example, users can rename the file like this:

```js
const fileName = prompt(
  "Enter PDF name:",
  "rotated-document"
);
```

The preview section also includes left and right navigation controls so users can browse through rotated pages directly inside the browser.

Document details can also be displayed dynamically:

```js
fileSizeElement.textContent =
  formatFileSize(blob.size);

pageCountElement.textContent =
  pdfDoc.getPageCount();
```

This improves usability and helps users verify the final output before downloading.

Here’s what the final output section looks like:

![Rotated PDF preview with file size page count rename option and download button](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/8a654f8d-c63f-4534-8d9a-70916079bd82.png)

---

## Why PDF Rotation Is Useful in Real-World Documents

PDF rotation may seem like a small feature, but it solves a very common problem in everyday document handling.

Many scanned documents, mobile scans, invoices, certificates, and office files are saved with incorrect orientation. Some pages appear sideways, upside down, or mixed between portrait and landscape layouts.

Instead of reopening and rescanning those files, users can quickly fix page orientation directly inside the browser.

For example, PDF rotation is commonly used for:

- scanned agreements
- invoices and bills
- government forms
- academic documents
- construction drawings
- landscape reports
- mobile camera scans

This becomes especially useful when working with multi-page PDFs where only certain pages need correction.

Some users may only want to rotate:

- even-numbered pages
- odd-numbered pages
- specific pages
- landscape pages only

That’s why page-based rotation controls are important in modern PDF tools.

Browser-based PDF rotation also improves privacy because uploaded documents stay on the user’s device instead of being sent to external servers.

---

## Demo: How the PDF Rotator Tool Works

### Step 1: Upload the PDF

Users first upload a PDF document directly into the browser-based tool.

The upload section supports drag-and-drop along with manual file selection.

Here’s what the upload interface looks like:

![PDF upload interface for browser-based PDF rotator tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/4ddeb1ad-fd76-4e16-b21b-94799346b183.png)

### Step 2: Preview PDF Pages

After uploading the document, the tool generates page previews automatically.

The preview section also includes a rotation option so users can rotate document pages as per required.

Here’s the preview section inside the tool:

![PDF page preview with left and right navigation controls](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e0e18eae-d66f-49d6-829f-55207dd80167.png)

### Step 3: Configure Rotation Settings

Users can now choose how the PDF pages should rotate.

The tool supports:

- rotate left
- rotate right
- flip 180 degrees
- portrait orientation
- landscape orientation

Users can also choose whether rotations apply to all pages or just certain pages.

Here’s what the rotation settings panel looks like:

![PDF rotation settings with page selection and orientation controls](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e05b790e-3cc2-4beb-aec9-c4b0b0a70212.png)

### Step 4: Generate the Rotated PDF

Once everything is configured, users click the generate button to apply the rotations.

The browser processes the document locally and creates the updated PDF instantly.

Here’s the generate button inside the tool:

![Apply rotations and create PDF button inside browser-based PDF rotator tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/151bb909-7812-4360-97b4-4fbac5b43375.png)

### Step 5: Preview the Final Output

After processing is complete, the tool displays the rotated PDF preview directly inside the browser.

Users can navigate page-by-page using the left and right controls to verify the final output.

The interface also shows:

- total pages
- file size
- output filename

Here’s the final preview section:

![Rotated PDF preview with page navigation file size and total page information .Rename and download interface for rotated PDF document](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/41a72868-6723-489b-ba18-0ae72d3ed432.png)

### Step 6: Rename and Download the PDF

Before downloading, users can rename the generated PDF file directly inside the browser.

Once renamed, the updated document can be downloaded instantly.

Here’s the rename and download section:

---

## Important Notes from Real-World Use

When working with scanned PDFs, page orientation issues are very common.

Some documents may contain mixed orientations where certain pages are portrait while others are landscape.

Applying rotation changes page-by-page usually gives better results than rotating the entire document blindly.

Large PDF files can also increase processing time inside the browser.

For example:

```js
if (file.size > 50 * 1024 * 1024) {
  alert("Large PDF files may process slowly.");
}
```

Another useful optimization is previewing pages before applying permanent changes.

This helps users verify page orientation and reduces mistakes before downloading the updated document.

Since everything runs locally in the browser, uploaded documents never leave the user’s device, which improves privacy and security.

---

## Common Mistakes to Avoid

One common mistake is rotating pages multiple times accidentally.

For example, applying two consecutive 90-degree rotations may result in unexpected orientation changes.

Another issue is ignoring page selection before applying rotations.

Users may accidentally rotate all pages instead of specific sections of the document.

Large scanned PDFs can also slow down rendering and preview generation.

Validating uploaded files before processing helps avoid broken workflows:

```js
if (!file || file.type !== "application/pdf") {
  alert("Please upload a valid PDF file.");
  return;
}
```

Incorrect preview synchronization is another common issue.

If page previews aren't refreshed after rotation, users may think the rotation failed even though the exported PDF is correct.

Updating previews dynamically after each rotation improves the overall experience.

---

## Conclusion

In this tutorial, you built a browser-based PDF rotator using JavaScript.

You learned how to upload PDF files, preview document pages, rotate selected pages, change page orientation, generate updated PDFs, and download the final document directly inside the browser.

More importantly, you saw how modern browsers can handle practical PDF editing tasks locally without relying on a backend server.

This approach keeps the tool fast, private, and easy to use.

::: info

You can also try the live tool here:

<SiteInfo
  name="Rotate PDF Online Free – Flip & Adjust PDF Pages Easily"
  desc="Rotate PDF pages online for free at AllInOneTools. Quickly rotate single or multiple pages in your PDF files. Fast, secure, and simple PDF rotation tool."
  url="https://allinonetools.net/rotate-pdf/"
  logo="https://allinonetools.net/favicon.ico"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0.webp"/>

:::

Once you understand this workflow, you can extend it further with features like PDF page extraction, annotations, document organization, digital signatures, or advanced editing tools.

And that’s where things start getting really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF Rotator Using JavaScript",
  "desc": "Sometimes PDF pages appear upside down, sideways, or in the wrong orientation after scanning or exporting documents. Instead of re-creating the document manually, users usually just need a quick way t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-rotate-pdf-pages.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
