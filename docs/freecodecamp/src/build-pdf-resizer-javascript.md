---
lang: en-US
title: "How to Build a Browser-Based PDF Resizer Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF Resizer Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF Resizer Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF Resizer Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-resizer-javascript.html
prev: /programming/js/articles/README.md
date: 2026-06-30
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1b1d6bca-dec7-4b4c-8983-0b2a94ba8f8e.png
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
  name="How to Build a Browser-Based PDF Resizer Using JavaScript"
  desc="PDF documents come in many different page sizes. Some are designed for A4 paper, while others use Letter, Legal, Tabloid, or custom dimensions. This can create problems when printing, sharing, archivi"
  url="https://freecodecamp.org/news/build-pdf-resizer-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1b1d6bca-dec7-4b4c-8983-0b2a94ba8f8e.png"/>

PDF documents come in many different page sizes. Some are designed for A4 paper, while others use Letter, Legal, Tabloid, or custom dimensions. This can create problems when printing, sharing, archiving, or submitting documents to organizations that require a specific page format.

A PDF resizing tool solves this problem by allowing users to change the page dimensions of an existing PDF without recreating the document from scratch.

Whether you're preparing business reports, invoices, scanned documents, eBooks, presentations, or government forms, resizing pages helps ensure documents fit the required paper size while maintaining a professional appearance.

In this tutorial, you'll build a browser-based PDF Resizer using JavaScript. Users will be able to upload PDF files, preview document pages, choose preset or custom page sizes, configure scaling behavior, add page margins, and generate a resized PDF directly inside the browser.

Everything happens locally using JavaScript, so uploaded documents never leave the user's device. This improves privacy, eliminates server-side processing, and provides a faster experience.

By the end of this guide, you'll understand how browser-based PDF resizing works and how to build a practical tool that can be extended with additional document editing features.

![allinonetools pdf tools kit pdf resize tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b895666f-44f2-461f-8f10-7ad1443b35a1.png)

---

## Why PDF Resizing Is Useful

PDF files are created for many different purposes, and not every document uses the same page dimensions. A presentation might be designed for widescreen viewing, an invoice could use Letter size, a government application may require A4 paper, and engineering drawings often use Legal or Tabloid formats.

When documents don't match the required page size, they can be difficult to print correctly. Content may appear cut off, excessive white space may be introduced, or the document may scale incorrectly during printing.

A PDF resizing tool helps solve these problems by allowing users to convert pages into standardized sizes without rebuilding the document.

This is especially useful in everyday situations. Businesses often receive invoices and contracts from different organizations that use different paper standards. Before storing or printing these documents, employees frequently resize them to a consistent format.

Students regularly download lecture notes, assignments, research papers, and ebooks from different sources. Converting these files to a common page size makes printing and reading much easier.

Graphic designers and publishers also resize PDFs before sending artwork for commercial printing, ensuring that documents match the required dimensions of the printing service.

One practical example comes from e-commerce businesses. Imagine a seller who receives hundreds of shipping labels every day from platforms like Amazon, Flipkart, or Meesho. Different marketplaces may generate labels using different paper sizes. Before printing them in bulk, the seller can resize every PDF to A4 so all labels print consistently without manual adjustments.

Government offices, banks, educational institutions, and legal firms also work with PDFs from multiple sources. Standardizing page sizes simplifies document management, digital archiving, scanning, and future editing.

Instead of recreating an entire document, resizing allows users to adapt existing PDFs quickly while preserving their original content.

---

## How PDF Resizing Works

A PDF resizing tool changes the dimensions of one or more pages inside an existing PDF document while preserving the page content.

When a user uploads a PDF, the browser first reads the document and extracts information such as page count, page dimensions, and page objects. Instead of editing the original file directly, a new PDF is created with the selected page size, and each page is copied into the new document using the chosen scaling method.

Depending on the resize settings, the page content can be scaled to fill the page, stretched to match the new dimensions, centered without scaling, or cropped to fit the selected paper size.

Users can also choose whether the resize operation should apply to every page or only a specific page range. This is useful when only part of a document needs to be converted to another paper size.

Because all processing happens inside the browser, uploaded files remain on the user's device throughout the entire workflow. No documents are sent to external servers, making the tool suitable for confidential reports, contracts, invoices, educational documents, business records, and other sensitive files.

---

## Project Setup

Create a new project folder for the PDF resizer.

A simple project structure looks like this:

```sh title="file structure"
pdf-resizer/
├── index.html
├── style.css
├── script.js
├── assets/
```

The HTML file contains the upload area, page preview, resize settings, and download section.

The CSS file handles the overall layout and responsive design.

The JavaScript file manages PDF loading, page previews, resize operations, and exporting the updated document.

Keeping the project organized makes it easier to add new features later, such as cropping, page rotation, watermarking, metadata editing, or PDF merging.

---

## What Library Are We Using?

This project uses **pdf-lib**, one of the most popular JavaScript libraries for creating and editing PDF documents directly in the browser.

It allows developers to:

- Read existing PDF files.
- Create new PDF documents.
- Copy pages between PDFs.
- Resize pages.
- Rotate pages.
- Add text, images, and shapes.
- Modify document metadata.
- Export updated PDFs.

Unlike many online PDF services, **pdf-lib** works entirely in the browser and doesn't require a backend server.

Install the library using npm:

```sh
npm i pdf-lib
```

Or include it directly from a CDN:

```html
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
```

Once loaded, the library exposes the `PDFDocument` object that is used throughout the application.

Example:

```js
const { PDFDocument } = PDFLib;
```

---

## Creating the Upload Interface

The first step is allowing users to upload a PDF document.

The interface includes a drag-and-drop area together with a traditional file picker so users can choose whichever method they prefer.

When a file is selected, JavaScript validates that it is a PDF before loading it into memory.

Here's a simple upload input:

```html
<input type="file"
  id="pdfUpload"
  accept="application/pdf"
/>
```

Next, listen for file selection:

```js
const upload = document.getElementById("pdfUpload");
upload.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  console.log(file.name);
});
```

Read the uploaded file:

```js
const bytes = await file.arrayBuffer();
const pdfDoc = await PDFLib.PDFDocument.load(bytes);
```

At this point, the uploaded PDF is loaded into memory and is ready for preview generation and resizing.

![PDF upload interface with drag-and-drop area for selecting a PDF file to resize.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a8630362-557c-4cd5-9f9a-3805134884e5.png)

---

## Previewing Uploaded PDF Pages

After the document has been uploaded, the next step is generating page previews.

Displaying page thumbnails helps users confirm that the correct file has been selected before changing its size.

For multi-page PDFs, previewing every page also makes it easier to understand how the resize operation will affect the document.

Your tool displays thumbnails for every page, allowing users to visually inspect the PDF before making any modifications.

Developers can retrieve the total number of pages using **pdf-lib**:

```js
const totalPages = pdfDoc.getPageCount();
console.log(totalPages);
```

Retrieve individual pages:

```js
const pages = pdfDoc.getPages();
pages.forEach((page, index) => {
  console.log(`Page ${index + 1}`);
});
```

Once the pages are available, the application can generate preview thumbnails and display them inside the browser.

Users can then decide whether to resize the entire document or only selected pages.

![Uploaded PDF page thumbnails displayed before resizing the document](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/76fbd44e-c359-4239-9add-56c44356adf9.png)

---

## Configuring Resize Settings

Once the PDF pages have been loaded, users need to configure how the document should be resized.

A flexible PDF resizing tool should support both standard paper sizes and custom dimensions while allowing users to control how the existing content fits inside the new page.

In this project, users can choose whether the resize operation should be applied to every page or only a specific page range.

For page dimensions, the tool supports popular paper formats such as A4, A5, Letter, Legal, Tabloid, and Square. If none of these meet the user's requirements, custom width and height values can also be entered.

Another important setting is content scaling. Depending on the document, users may want to fit the existing content inside the page, stretch it to fill the available space, keep the original size centered on the page, or crop the content to match the selected paper size.

The resize panel also includes margin controls so users can add additional spacing around the document if required.

Together, these settings provide complete control over the final page layout before generating the resized PDF.

### Choosing Preset Paper Sizes

Many users simply want to convert documents into common paper formats.

Instead of entering page dimensions manually, the tool provides several predefined page sizes that can be selected with a single click.

These presets are especially useful when preparing PDFs for printing, business reports, contracts, government forms, books, or educational documents.

![Preset paper size options including A4, A5, Letter, Legal, Tabloid, and Square.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c1548fd3-d401-4714-87cc-eceffc9a3c6f.png)

### Using Custom Page Sizes

If a standard paper size isn't suitable, users can enter custom page dimensions.

The width and height can be specified using supported measurement units, allowing documents to match exact printing or publishing requirements.

The **Lock Aspect Ratio** option ensures that the document maintains its original proportions while resizing.

### Selecting Content Scaling

Different documents require different scaling behavior.

The tool offers several scaling modes so users can choose the most appropriate layout for their document.

For example, **Fit to Page** scales content while preserving proportions, **Stretch to Fit** expands the content to fill the page completely, **Keep Original Size (Center)** places the original page in the center without scaling, and **Crop to Fit** trims overflowing content to match the selected page dimensions.

![Content scaling options including Fit to Page, Stretch to Fit, Keep Original Size, and Crop to Fit.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c66fde6a-6a3e-4e36-af4a-b9c508358f34.png)

### Example Resize Settings

Here's a simplified configuration object that stores the selected resize options.

```js
const resizeOptions = {
  width: 210,
  height: 297,
  unit: "mm",
  scaleMode: "fit",
  applyTo: "all"
};
```

The selected values are then used while generating the resized PDF.

![Resize settings panel showing page selection, custom dimensions, content scaling, and margin controls.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/bc1f16f4-4f38-4fd5-b553-51da4fc03ee3.png)

---

## Applying the Resize

After the resize settings have been configured, the application creates a new PDF document and copies each page into it using the selected dimensions.

Each page is resized according to the chosen paper size and scaling mode before being added to the new document.

A simplified example looks like this:

```js
const newPdf = await PDFLib.PDFDocument.create();

const copiedPages = await newPdf.copyPages(
  pdfDoc,
  pdfDoc.getPageIndices()
);

copiedPages.forEach(page => {
  page.setSize(595, 842);
  newPdf.addPage(page);
});
```

The dimensions shown above represent an A4 page measured in PDF points.

Developers can replace these values with custom dimensions depending on the selected paper size.

After every page has been resized, the new document is ready for export.

---

## Generating the Resized PDF

Once all pages have been processed, the updated document is converted into a downloadable PDF.

The browser creates a binary PDF file and generates a temporary download link without sending the document to a server.

Saving the resized document is straightforward.

```js
const pdfBytes = await newPdf.save();

const blob = new Blob([pdfBytes], {
  type: "application/pdf"
});

const url = URL.createObjectURL(blob);
```

The generated URL can then be attached to a download button.

```js
const link = document.createElement("a");

link.href = url;
link.download = "resized-document.pdf";
link.click();
```

The user immediately receives the updated document with the newly selected page dimensions.

![Resize PDF button used to generate the resized document.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6f390adc-e404-4381-a6de-b0b5b424f2fe.png)

---

## Demo: How the PDF Resize Tool Works

### Step 1: Upload Your PDF File

The process begins by uploading a PDF document into the browser.

Users can either drag and drop a file into the upload area or choose a document using the file picker.

Once selected, the browser validates the file type and loads the document locally without uploading it to a server. This keeps the entire resizing process private and ensures sensitive documents remain on the user's device.

![PDF upload interface with drag-and-drop area for resizing PDF pages](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6711451f-2b38-4215-b0f2-f2f9d53c6914.png)

### Step 2: Preview Uploaded PDF Pages

After the PDF has been loaded, the tool generates page previews for the entire document.

Displaying thumbnails allows users to verify that the correct document has been selected before making any modifications.

Users can also select individual pages if they only want to resize certain parts of the document.

This preview step helps avoid mistakes before generating the final PDF.

![Uploaded PDF page thumbnails displayed before resizing.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b50a41d0-cea3-44b9-bcc0-934a64b367ee.png)

### Step 3: Configure Resize Settings

Next, users configure how the document should be resized.

The tool supports standard paper sizes such as A4, A5, Letter, Legal, Tabloid, and Square, while also allowing completely custom dimensions.

Users can specify whether the resize operation should apply to all pages or only selected page ranges.

Additional options include locking the aspect ratio, choosing page orientation, selecting a content scaling mode, and adding page margins when necessary.

These settings provide complete control over the final document layout before processing begins.

![PDF resize settings showing paper size selection, page range, scaling options, and custom dimensions.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d01f0c31-135e-4997-8b22-23e866d17e63.png)

### Step 4: Generate the Resized PDF

After reviewing the selected options, users simply click the **Resize PDF** button.

The browser processes every selected page according to the configured paper size and scaling method.

Because the entire operation runs locally, even large documents can usually be processed within a few seconds depending on the number of pages.

If users want to process another document, the **Start Over** button clears the current session and returns the tool to its initial state.

![Resize PDF button with Start Over option.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a3da0b1d-6655-433c-802f-81af05787a1f.png)

### Step 5: Preview the Resized PDF

Once processing is complete, the newly generated PDF is displayed inside the browser.

Users can review the resized pages before downloading the document.

The preview section includes page navigation controls, making it easy to move through multi-page PDFs and confirm that every page has been resized correctly.

Reviewing the output before download helps catch formatting issues and ensures the selected page size and scaling options produced the expected results.

### Step 6: Download the Final PDF

After confirming the resized document, users can download the updated PDF.

The final output section displays useful information such as the output filename, total number of pages, and file size.

Users may also rename the document before downloading it, making it easier to organize files after processing.

The **Download PDF** button saves the resized document, while the **Start Over** button allows users to upload another PDF without refreshing the page.

![Alt text: Resized PDF ready for download showing filename, page count, file size, and download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/12d5074e-d534-4b91-b3af-79d846e35041.png)

---

## Important Notes from Real-World Use

Resizing PDF pages can significantly improve document compatibility, but it's important to validate uploaded files before processing.

For example:

```js
if (file.type !== "application/pdf") {
  alert("Please upload a valid PDF file.");
  return;
}
```

Very large PDF files may require additional processing time depending on the number of pages and embedded images.

When resizing documents containing hundreds of pages, processing them page by page can help reduce memory usage.

Before generating the final PDF, it's also a good idea to verify the selected page size.

For example:

```js
console.log(`Selected Size: ${pageSize}`);
console.log(`Scale Mode: ${scaleMode}`);
```

Previewing the resized document before downloading helps ensure that text, images, and page layouts appear correctly.

Because everything happens inside the browser, uploaded documents remain on the user's device throughout the entire resizing process.

---

## Common Mistakes to Avoid

One common mistake is selecting a page size that doesn't match the intended output.

For example, resizing a wide presentation directly to A4 portrait may cause content to become too small or appear compressed.

Always verify the selected paper size before processing.

```js
if (pageWidth <= 0 || pageHeight <= 0) {
  alert("Invalid page dimensions.");
}
```

Another common mistake is choosing the wrong content scaling mode.

Stretching content may distort images and text, while cropping may remove important information from the page.

Users should preview different scaling modes before generating the final PDF.

It's also important to check whether the resize operation should apply to every page or only selected pages.

```js
const applyMode = "all";

console.log(`Resize Mode: ${applyMode}`);
```

Finally, always review the generated PDF before downloading it.

Taking a few seconds to inspect page layouts, margins, and scaling can prevent unnecessary reprocessing later.

---

## Conclusion

In this tutorial, you built a browser-based PDF Resizer using JavaScript.

You learned how to upload PDF files, preview document pages, configure page sizes, adjust scaling behavior, resize pages, and generate downloadable PDF files directly inside the browser.

More importantly, you saw how modern browsers can perform PDF page resizing locally without requiring a backend server.

This approach keeps document processing fast, private, and easy to use while giving users complete control over the final document layout.

::: info

If you'd like to see a working example, try the [<VPIcon icon="fas fa-globe"/>PDF Resize Tool](https://allinonetools.net/resize-pdf/) and explore how PDF pages can be resized directly in your browser.

<SiteInfo
  name="Resize PDF Online - Adjust PDF Page Size - PDF Resizing Tool"
  desc="Easily resize PDF documents online for free. Choose from presets like A4, Letter, or set custom dimensions. Fast, secure, free to use, and no signup required."
  url="https://allinonetools.net/resize-pdf/"
  logo="https://allinonetools.net/wp-content/uploads/2025/05/cropped-yellow-icon-removebg-preview-192x192.png"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0-e1764822756169.webp"/>

:::

Once you understand this workflow, you can extend it further with features like page cropping, rotation, watermarking, metadata editing, page numbering, document organization, and other advanced PDF editing capabilities.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF Resizer Using JavaScript",
  "desc": "PDF documents come in many different page sizes. Some are designed for A4 paper, while others use Letter, Legal, Tabloid, or custom dimensions. This can create problems when printing, sharing, archivi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-resizer-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
