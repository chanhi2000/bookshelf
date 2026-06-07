---
lang: en-US
title: "How to Build a Browser-Based PDF Crop Tool Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF Crop Tool Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF Crop Tool Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF Crop Tool Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-crop-tool-javascript.html
prev: /programming/js/articles/README.md
date: 2026-06-13
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4849599a-a0bc-4cb7-9d14-86bb990d000d.png
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
  name="How to Build a Browser-Based PDF Crop Tool Using JavaScript"
  desc="PDF files often contain unwanted margins, blank spaces, scanner borders, page headers, page footers, or unnecessary content around the main document area. Cropping allows users to remove these unwante"
  url="https://freecodecamp.org/news/build-pdf-crop-tool-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/4849599a-a0bc-4cb7-9d14-86bb990d000d.png"/>

PDF files often contain unwanted margins, blank spaces, scanner borders, page headers, page footers, or unnecessary content around the main document area.

Cropping allows users to remove these unwanted areas and focus only on the important content.

In this tutorial, you'll build a browser-based PDF Crop Tool using JavaScript.

Users will be able to upload a PDF, preview pages, select a crop area visually, apply crop settings to specific pages, generate a cropped PDF, preview the final result, and download the updated document directly from the browser.

Everything runs locally without requiring a backend server.

---

## Why PDF Cropping Is Useful

PDF cropping is commonly used when working with scanned documents, invoices, reports, contracts, forms, ebooks, manuals, presentations, and academic documents.

Many PDFs contain unnecessary whitespace or scanning artifacts around the edges of the page. Cropping helps remove distractions and makes documents easier to read.

Businesses often crop invoices and reports before sharing them with clients. Students crop lecture notes and scanned study materials to focus on the important content. And designers frequently crop exported PDFs to remove unwanted margins before printing or publishing.

Cropping also reduces visual clutter and creates a cleaner, more professional document.

---

## How PDF Cropping Works

A PDF crop tool loads document pages inside the browser and allows users to define a rectangular crop area.

Once selected, the crop coordinates are applied to the chosen pages. The browser then generates a new PDF using only the selected content area.

Everything happens locally inside the browser. This means uploaded documents never leave the user's device, improving privacy and security.

---

## Project Setup

This project is intentionally simple: you'll only need an HTML file, a JavaScript file, and a PDF processing library.

No backend server or database is required, as everything runs directly inside the browser.

---

## What Library Are We Using?

We'll use PDF-lib for PDF processing.

PDF-lib allows us to load PDF documents, modify page boundaries, and export updated PDF files directly in JavaScript.

Add the library using a CDN:

```html
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
```

Once loaded, JavaScript can process PDF pages directly inside the browser.

---

## Creating the Upload Interface

Users first upload a PDF document into the browser.

A simple file input works well:

```html
<input type="file" id="pdfInput" accept=".pdf">
```

JavaScript can detect when a file is selected:

```js
document.getElementById("pdfInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log(file.name);
});
```

Here's what the upload section looks like:

![PDF upload interface for browser-based PDF crop tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/5e4c19dd-0946-4d94-959e-ca537a5d31d4.png)

---

## Previewing Uploaded PDF Pages

After uploading a document, users can preview PDF pages directly inside the browser.

The preview area includes page navigation controls that allow users to move between pages before cropping.

A default crop selection area is displayed on the preview page to help users begin selecting content immediately. This makes it easier to verify the document before applying crop settings.

Here's what the preview section looks like:

![PDF page preview with page navigation and crop selection area](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/0b1255e5-5616-4633-87fb-b4e8edcf3901.png)

---

## Configuring Crop Settings

After users select a crop area on the PDF preview, they often need more precise control over how the crop should be applied.

A practical PDF crop tool should allow users to manually adjust crop coordinates, choose predefined page ratios, and decide which pages should receive the crop operation.

This flexibility is especially useful when working with scanned documents, forms, reports, ebooks, presentations, and multi-page PDFs where different pages may require different crop settings.

In this project, users can adjust the crop position, control the crop dimensions, choose predefined crop ratios, and decide whether the crop should be applied to the current page, all pages, or a specific page range.

The crop settings panel provides complete control before generating the final PDF.

Here's what the crop settings section looks like:

![PDF crop settings with crop coordinates predefined ratios and page selection options](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e4754c1f-d82e-4404-853a-a585a9cdfc14.png)

### Reading Crop Coordinates

When users drag a selection area on the preview page, the application records the crop dimensions.

A crop object typically contains:

```js
const cropArea = {
  x: 173,
  y: 141,
  width: 452,
  height: 309
};
```

These values determine which portion of the page will remain visible after cropping.

### Applying Custom Coordinates

Users can manually modify crop coordinates for more accurate results.

For example:

```js
const left = parseInt(document.getElementById("cropX").value);
const top = parseInt(document.getElementById("cropY").value);
const width = parseInt(document.getElementById("cropWidth").value);
const height = parseInt(document.getElementById("cropHeight").value);
```

These values are later used when applying the crop to the PDF page.

### Supporting Predefined Crop Ratios

Many users don't want to manually enter crop coordinates every time they crop a document.

In real-world situations, documents often need to follow standard page dimensions. Instead of adjusting the crop area manually, users can quickly choose a predefined ratio and let the tool apply the appropriate crop settings automatically.

For example, a user preparing documents for printing may choose an A4 layout, while someone working with presentation slides may prefer a landscape format. Other users may simply want to remove margins while keeping the original page proportions intact.

A simple example looks like this:

```js
function applyA4Portrait() {
  cropArea = {
    x: 0,
    y: 0,
    width: 595,
    height: 842
  };
}
```

This allows users to instantly apply a standard page size.

### Selecting Pages to Crop

Not every page requires cropping. Some users may only want to crop a single page while leaving the rest of the document unchanged.

The tool supports three page selection modes:

Current page only:

```js
const applyMode = "current";
```

All pages:

```js
const applyMode = "all";
```

Specific page ranges:

```js
const applyMode = "specific";
const pageRange = "1,3-5,10";
```

This gives users full control over where the crop should be applied.

### Applying Crop Settings to PDF Pages

Once the crop values are finalized, the selected pages can be updated using PDF-lib.

A simplified example looks like this:

```js
const pages = pdfDoc.getPages();

pages.forEach((page) => {
  page.setCropBox(
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height
  );
});
```

The crop box defines the visible area that will remain in the generated PDF.

### Validating Crop Values

Before applying the crop, it's important to verify that users entered valid dimensions.

For example:

```js
if (
  cropArea.width <= 0 ||
  cropArea.height <= 0
) {
  alert("Invalid crop size");
  return;
}
```

Validation helps prevent errors and ensures the final PDF is generated correctly.

After the crop settings are configured, users can proceed to generate the updated PDF and review the results before downloading the final document.

---

## Applying the Crop

Once the crop settings are configured, users can apply the crop operation.

For example:

```js
page.setCropBox(x, y, width, height);
```

The selected crop area is applied to the chosen pages before generating the updated document.

Here's what the crop action section looks like:

![Crop PDF button and start over option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/0bcfb644-71b0-4f84-a08b-c0aed34ce420.png)

---

## Generating the Cropped PDF

After cropping is complete, the browser generates a new PDF document containing only the selected page areas.

For example:

```js
const pdfBytes = await pdfDoc.save();
```

The updated file can then be previewed and downloaded.

![GENERATED PDF CROP FILE SHOWING WITH ITS PREVIEW](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/ac18fcf4-d632-4b32-9767-70e69667c98a.png)

---

## Why PDF Cropping Is Useful in Real-World Documents

PDF cropping is one of those features that seems simple at first, but it becomes incredibly useful once you start working with real-world documents.

Many PDFs contain content that users don't actually need. Scanned documents often include large white borders created by scanners. Screenshots converted into PDFs may contain unnecessary background areas. Reports and presentations frequently have oversized margins that waste space and make documents harder to read.

By cropping unwanted areas, users can focus attention on the content that actually matters. The final document becomes cleaner, easier to read, more professional, and often more suitable for printing.

PDF cropping is especially valuable in business environments where documents are processed in large quantities.

For example, many e-commerce sellers on platforms such as Flipkart, Amazon, Meesho, and other marketplaces regularly download shipping labels, invoices, and packing slips in PDF format.

Imagine receiving a PDF containing 100 shipping labels for customer orders. The downloaded file may include unnecessary margins, extra whitespace, instructions, or content outside the area that needs to be printed.

Instead of manually editing every page, users can define a crop area once and apply the same crop settings to all pages in the document. This automatically removes unwanted content from all 100 labels in a single operation.

The result is a cleaner PDF that contains only the information required for printing and packaging.

The same workflow is useful for:

- E-commerce packing slips
- Warehouse barcode sheets
- Courier documentation
- Invoices and billing documents
- Scanned contracts and agreements
- Academic research papers
- Government forms
- Business reports and presentations
- Construction drawings and engineering documents
- Training manuals and internal company documentation

Cropping can also significantly improve printing efficiency. When unnecessary margins are removed, the important content occupies more of the printable area, making labels, invoices, diagrams, and reports easier to read.

Another common use case involves scanned paperwork. Many scanner applications automatically capture extra background around a document. Cropping removes these unwanted edges and produces a cleaner digital copy without requiring image-editing software.

Because the crop area can be applied to the current page, all pages, or specific page ranges, users can process large PDF documents in seconds rather than manually editing pages one by one.

For businesses that handle hundreds of PDF files every week, this can save a significant amount of time while producing cleaner, more professional documents ready for sharing, printing, or archiving.

---

## Demo: How the PDF Crop Tool Works

### Step 1: Upload a PDF File

Users begin by uploading a PDF document into the browser.

The upload area supports drag-and-drop functionality and manual file selection.

![Upload PDF file for cropping](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/2d5c10b2-d151-4194-a573-7137d3097e2e.png)

### Step 2: Preview the Uploaded PDF

After uploading the document, the browser displays a page preview.

Users can move between pages using the navigation controls.

A default crop selection area is displayed to simplify the cropping process.

![Uploaded PDF preview with crop selection and page navigation](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/06b0efe9-161b-484f-bd8f-034deef47d79.png)

### Step 3: Configure Crop Settings

Users can fine-tune crop coordinates, choose predefined ratios, and select which pages should receive the crop.

The crop can be applied to a single page, all pages, or specific page ranges.

![Configure crop coordinates ratios and page settings](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f5ed20db-b7de-4358-940f-b3d3ea2e7ac6.png)

### Step 4: Apply the Crop

Once everything is configured, users click the Crop PDF button.

The browser processes the selected pages and applies the crop settings.

![Apply crop operation to PDF pages](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d0f1d324-1445-47bf-9809-b2a8653dbf62.png)

### Step 5: Preview the Cropped PDF

After processing is complete, users can preview the cropped document.

Page navigation controls allow users to review every cropped page before downloading.

![Preview cropped PDF with page navigation controls](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/feee3a65-9896-4e27-8172-b0ff8bae5216.png)

### Step 6: Download the Cropped PDF

The final section displays the generated file.

Users can rename the document, review file details such as total pages and file size, and download the cropped PDF.

A Start Over button is also available for processing another file.

![Download cropped PDF with filename page count and file size details](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f0005bca-0e60-4ef7-862f-28f61f38fea8.png)

---

## Important Notes from Real-World Use

When working with large PDF files, processing may take longer depending on the number of pages.

Always validate uploaded files before loading them.

For example:

```js
if (!file.name.endsWith(".pdf")) {
  alert("Please upload a PDF file");
  return;
}
```

Previewing pages before downloading helps catch cropping mistakes early.

---

## Common Mistakes to Avoid

One common mistake is selecting crop coordinates that remove important document content.

Another mistake is applying a crop to all pages when only specific pages should be modified.

For example:

```js
if (!cropArea) {
  alert("Select a crop area first");
  return;
}
```

Always review the cropped preview before downloading the final document.

---

## Conclusion

In this tutorial, you built a browser-based PDF Crop Tool using JavaScript.

You learned how to upload PDF files, preview pages, define crop areas, configure crop settings, apply cropping operations, generate updated PDFs, and download the final document directly from the browser.

More importantly, you saw how modern browsers can handle PDF editing tasks locally without requiring a backend server. This approach keeps document processing fast, private, and easy to use.

::: info

If you'd like to see a working example, try the [<VPIcon icon="fas fa-globe"/>AllinoneTools-** **PDF Crop Tool](https://allinonetools.net/crop-pdf/) and explore how PDF pages can be cropped directly in the browser.

<SiteInfo
  name="Crop PDF Online - Free PDF Cropping Tool"
  desc="Easily crop PDF documents online for free. Select an area visually, use precise coordinates, or apply preset ratios. Secure, fast, & simple PDF cropping ."
  url="https://allinonetools.net/crop-pdf//"
  logo="https://allinonetools.net/wp-content/uploads/2025/05/cropped-yellow-icon-removebg-preview-192x192.png"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0.webp"/>

:::

Once you understand this workflow, you can extend it further with features like PDF rotation, page organization, watermarking, metadata editing, annotations, and advanced PDF editing tools.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF Crop Tool Using JavaScript",
  "desc": "PDF files often contain unwanted margins, blank spaces, scanner borders, page headers, page footers, or unnecessary content around the main document area. Cropping allows users to remove these unwante",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-crop-tool-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
