---
lang: en-US
title: "How to Build a Browser-Based PDF to Grayscale Converter Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF to Grayscale Converter Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF to Grayscale Converter Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF to Grayscale Converter Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-to-grayscale-converter-javascript.html
prev: /programming/js/articles/README.md
date: 2026-08-15
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c167a675-fcdd-4f28-9489-e42c3fe98d9d.png
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
  name="How to Build a Browser-Based PDF to Grayscale Converter Using JavaScript"
  desc="Many PDF documents contain colorful charts, presentations, marketing materials, scanned pages, or graphics that aren't always ideal for printing or archiving. In some cases, converting a document to g"
  url="https://freecodecamp.org/news/build-pdf-to-grayscale-converter-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c167a675-fcdd-4f28-9489-e42c3fe98d9d.png"/>

Many PDF documents contain colorful charts, presentations, marketing materials, scanned pages, or graphics that aren't always ideal for printing or archiving.

In some cases, converting a document to grayscale reduces distractions, creates printer-friendly versions, lowers printing costs, or prepares files for black-and-white publishing.

A PDF to Grayscale Converter automates this process. Instead of editing every page manually, users can upload a PDF, choose how the grayscale conversion should be applied, preview the results, and download a newly generated document, all from within the browser.

In this tutorial, you'll build a browser-based PDF to Grayscale Converter using JavaScript. Users will be able to upload a PDF, preview every page, adjust the grayscale intensity, choose between multiple conversion modes, select which pages to process, generate a grayscale PDF, preview the final result, rename the output file, and download it without uploading their document to an external server.

We'll use PDF.js to render PDF pages, the HTML Canvas API to manipulate image pixels, and PDF-lib to generate the final downloadable PDF.

By the end of this tutorial, you'll have a complete client-side PDF processing application similar to the one available on All In One Tools.

---

## What This PDF to Grayscale Converter Does and How It Works

A PDF to Grayscale Converter transforms colorful PDF pages into shades of gray while preserving the document's layout, page dimensions, text placement, and images. Instead of removing content, it recalculates the color of every pixel so the entire page appears in grayscale.

This is useful for creating printer-friendly documents, reducing color distractions, preparing files for monochrome printing, improving consistency across scanned documents, or producing black-and-white versions for review and archival purposes.

In this project, users can upload a PDF, browse through every page, adjust the grayscale intensity, choose between different conversion modes, decide whether all pages or only selected pages should be converted, generate a new grayscale PDF, preview the completed document, rename the output file, and download it directly from the browser.

Behind the scenes, PDF.js renders each PDF page onto an HTML canvas. Once the page has been rendered, JavaScript reads the RGB values for every pixel and calculates a grayscale value using a luminance formula. The updated pixels are written back to the canvas before PDF-lib assembles all processed pages into a brand-new PDF.

A typical pixel contains four values:

```js
const pixel = {
  red: 180,
  green: 95,
  blue: 40,
  alpha: 255
};
```

To convert that pixel into grayscale, JavaScript calculates a single luminance value and applies it equally to the red, green, and blue channels.

```js
const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
```

The resulting pixel becomes:

```js
pixel.red = gray;
pixel.green = gray;
pixel.blue = gray;
```

Repeating this process for every pixel on every selected page creates a new grayscale version of the original PDF while preserving the overall structure of the document.

---

## Project Setup

Before writing the conversion logic, let's create a simple project structure.

We'll build everything using HTML, CSS, and JavaScript, together with PDF.js, the Canvas API, and PDF-lib.

Our project structure looks like this:

```sh title="file structue"
pdf-to-grayscale/
├── index.html
├── style.css
├── script.js
├── pdf.worker.min.js
├── assets/
```

Keeping the HTML, styling, and JavaScript separate makes the project easier to maintain as more PDF features are added.

---

## Libraries Used

The PDF to Grayscale Converter relies on three browser technologies that work together to render PDF pages, process image pixels, and generate a new downloadable document.

**PDF.js** renders PDF pages directly inside the browser.

The **HTML Canvas API** provides access to every pixel so JavaScript can convert colors into grayscale.

**PDF-lib** creates the final PDF after all selected pages have been processed.

Include the required libraries before loading your application.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js"></script>
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
<script src="script.js"></script>
```

Configure the PDF.js worker.

```js
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
```

Using a worker allows PDF rendering to happen in the background without freezing the browser interface.

---

## Creating the HTML Layout

The application is divided into four main sections:

- Upload area
- PDF preview
- Conversion settings
- Download section

Create the basic page structure.

```html
<section id="uploadSection"></section>
<section id="previewSection" hidden></section>
<section id="settingsSection" hidden></section>
<section id="downloadSection" hidden></section>
```

Only the upload area is visible when the page first loads. The remaining sections appear after a PDF has been successfully opened.

### Selecting the Main Elements

Store references to the elements that will be used throughout the application.

```js
const uploadSection = document.getElementById("uploadSection");
const previewSection = document.getElementById("previewSection");
const settingsSection = document.getElementById("settingsSection");
const pdfCanvas = document.getElementById("pdfCanvas");
```

Using these references makes it easier to update the interface as users move through the conversion process.

---

## Uploading and Previewing PDFs

The upload area accepts both drag-and-drop and manual file selection.

When a file is selected, first verify that it's a PDF.

```js
async function uploadPdf(file) {
  if (!file || file.type !== "application/pdf") {
    alert("Please select a PDF file.");
    return;
  }

  await loadPdf(file);
}
```

Once validation succeeds, the document is loaded into memory for processing.

![Upload area for selecting a PDF document.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/5f29ba44-afe7-4f2f-b685-2608b9b8ca55.png)

### Loading the PDF

Convert the uploaded file into an ArrayBuffer before opening it with PDF.js.

```js
async function loadPdf(file) {
  const bytes = await file.arrayBuffer();

  pdfDocument = await pdfjsLib.getDocument({
    data: bytes
  }).promise;

  currentPage = 1;
  renderPage(currentPage);
}
```

The loaded document is stored so every page can later be converted to grayscale.

### Rendering PDF Pages

PDF.js renders one page at a time onto an HTML canvas.

Retrieve the page.

```js
const page = await pdfDocument.getPage(currentPage);
```

Create the viewport.

```js
const viewport = page.getViewport({
  scale: 1.5
});
```

Resize the canvas.

```js
pdfCanvas.width = viewport.width;
pdfCanvas.height = viewport.height;
```

Render the page.

```js
await page.render({
  canvasContext: pdfCanvas.getContext("2d"),
  viewport
}).promise;
```

Once rendering finishes, the selected page appears inside the preview area.

![PDF page preview rendered with PDF.js.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f1e5d376-b101-4116-9be6-68c4303eb398.png)

### Navigating Between Pages

Most PDF documents contain multiple pages, so users need simple navigation controls.

Track the current page.

```js
let currentPage = 1;
let pdfDocument = null;
```

Move to the previous page.

```js
previousButton.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    await renderPage(currentPage);
  }
});
```

Move to the next page.

```js
nextButton.addEventListener("click", async () => {
  if (currentPage < pdfDocument.numPages) {
    currentPage++;
    await renderPage(currentPage);
  }
});
```

Update the page indicator.

```js
pageCounter.textContent = `Page ${currentPage} of ${pdfDocument.numPages}`;
```

Users can now browse through the document before deciding how the grayscale conversion should be applied.

---

## Building the Conversion Settings

After the PDF has been loaded and previewed, users can configure how the document should be converted to grayscale. The settings panel allows users to adjust the grayscale intensity, choose a conversion mode, decide which pages should be processed, and start the conversion.

![PDF to Grayscale Converter settings panel showing intensity slider, conversion modes, and page selection options.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/9fe91d30-e2b7-444d-8ada-f1606b172d1c.png)

### Adjusting Grayscale Intensity

The intensity slider controls how strongly the grayscale effect is applied.

Lower values retain more of the original color, while higher values produce a true grayscale appearance.

Create the slider.

```html
<input type="range" id="grayIntensity" min="0" max="100" value="100">
```

Read the selected value.

```js
const intensity = Number(document.getElementById("grayIntensity").value);
```

The selected intensity will later be used when calculating the final grayscale color.

### Choosing the Conversion Mode

The tool provides multiple grayscale modes for different use cases.

Create the radio buttons.

```html
<input type="radio" name="mode" value="standard" checked>
Standard Grayscale
<input type="radio" name="mode" value="threshold">
Black & White
<input type="radio" name="mode" value="soft">
Soft Gray
```

Retrieve the selected mode.

```js
const conversionMode = document.querySelector(
  'input[name="mode"]:checked'
).value;
```

Each mode uses a different algorithm when processing the canvas pixels.

### Selecting the Pages

Users can convert either the entire document or only selected pages.

Create the page selection controls.

```html
<input type="radio" name="pages" value="all" checked>
All Pages
<input type="radio" name="pages" value="custom">
Specific Pages
<input type="text" id="pageRange" placeholder="e.g., 1, 3-5, 10">
```

Read the selected option.

```js
const applyMode = document.querySelector(
    'input[name="pages"]:checked'
).value;
```

Retrieve the custom page range.

```js
const pageRange = document.getElementById("pageRange").value.trim();
```

When **All Pages** is selected, every page in the PDF is processed. Otherwise, only the pages specified by the user are converted.

---

## Converting PDF Pages to Grayscale

Once the settings have been configured, users can begin the conversion.

Create the action button.

```html
<button id="convertPdf">Convert to Grayscale</button>
```

Start the conversion.

```js
convertButton.addEventListener("click", async () => {
  await convertPdf();
});
```

![Convert to Grayscale button below the conversion settings.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/baede49d-a7e5-4ca5-9322-4b041bb6bfb4.png)

### Starting Over

Users can clear the current document and return the application to its initial state.

Create the reset button.

```html
<button id="resetTool">Start Over</button>
```

Reset the application.

```js
resetTool.addEventListener("click", () => {
  location.reload();
});
```

This removes the current PDF and restores the default settings so another document can be processed.

### Reading Canvas Pixels

After a page has been rendered, retrieve its pixel data.

```js
const imageData = context.getImageData(
  0, 0,
  canvas.width, canvas.height
);
```

The pixel information is stored in an array.

```js
const pixels = imageData.data;
```

Each pixel contains four values:

- Red
- Green
- Blue
- Alpha

We'll update the RGB values while leaving the alpha channel unchanged.

### Converting Colors to Grayscale

The standard grayscale algorithm calculates a luminance value using the red, green, and blue channels.

Loop through every pixel.

```js
for (let i = 0; i < pixels.length; i += 4) {
  const gray =
    0.299 * pixels[i] +
    0.587 * pixels[i + 1] +
    0.114 * pixels[i + 2];

  pixels[i] = gray;
  pixels[i + 1] = gray;
  pixels[i + 2] = gray;
}
```

This formula produces a natural-looking grayscale image because it reflects how the human eye perceives brightness.

### Applying the Selected Conversion Mode

Different conversion modes use different pixel calculations.

For example, the **Black & White (Threshold)** mode converts each pixel into either pure black or pure white.

```js
const threshold = 128;
const color = gray >= threshold ? 255 : 0;
pixels[i] = color;
pixels[i + 1] = color;
pixels[i + 2] = color;
```

The **Soft Gray** mode blends the original color with the grayscale value to create a less aggressive effect.

```js
const softGray =
  (gray * 0.6) +
  (pixels[i] * 0.4);

pixels[i] = softGray;
pixels[i + 1] = softGray;
pixels[i + 2] = softGray;
```

Once the selected mode has been applied, write the updated pixels back to the canvas.

```js
context.putImageData(imageData, 0, 0);
```

![PDF page preview after applying the grayscale conversion.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a9d004ac-c519-463e-91a7-d98abfdeec62.png)

### Processing the Selected Pages

Instead of processing the entire document every time, convert only the pages selected by the user.

Loop through the page range.

```js
for (let page = startPage; page <= endPage; page++) {
  await processPage(page);
}
```

Each processed page is temporarily stored before the final PDF is created.

---

## Generating the Final PDF

Create a new PDF document.

```js
const outputPdf = await PDFLib.PDFDocument.create();
```

Convert the processed canvas into an image.

```js
const imageBytes = await canvasToBytes(pdfCanvas);
```

Embed the image into the PDF.

```js
const image = await outputPdf.embedPng(imageBytes);
```

Create a new page.

```js
const page = outputPdf.addPage([
  image.width, image.height
]);
```

Draw the processed image.

```js
page.drawImage(image, {
  x: 0, y: 0,
  width: image.width, height: image.height
});
```

Repeat this process for every selected page until the new grayscale document is complete.

### Saving the Generated PDF

After all pages have been processed, save the completed document.

```js
const pdfBytes = await outputPdf.save();
```

Create a downloadable PDF file.

```js
generatedPdfBlob = new Blob([pdfBytes], {
  type: "application/pdf"
});
```

The grayscale PDF is now ready for preview, renaming, and downloading.

---

## Previewing the Result

Before downloading the converted document, it's useful to let users review the final output. This allows them to verify that the selected pages have been converted correctly and that the grayscale appearance meets their expectations.

Load the generated PDF using PDF.js.

```js
let finalPdf = null;

async function showResult() {
  const bytes = await generatedPdfBlob.arrayBuffer();

  finalPdf = await pdfjsLib.getDocument({
    data: bytes
  }).promise;

  renderResultPage(1);
}
```

Render the selected page.

```js
async function renderResultPage(pageNumber) {
  const page = await finalPdf.getPage(pageNumber);

  const viewport = page.getViewport({
    scale: 1.5
  });

  resultCanvas.width = viewport.width;
  resultCanvas.height = viewport.height;

  await page.render({
    canvasContext: resultCanvas.getContext("2d"),
    viewport
  }).promise;
}
```

Users can browse through every converted page before downloading the PDF.

---

## Renaming and Downloading

Before saving the converted PDF, users can provide a custom filename.

Create the filename input.

```html
<input type="text"
  id="outputFilename"
  value="grayscale-document.pdf"
>
```

Retrieve the filename.

```js
function getFilename() {
  let filename = outputFilename.value.trim();

  if (!filename) {
    filename = "grayscale-document.pdf";
  }

  if (!filename.toLowerCase().endsWith(".pdf")) {
    filename += ".pdf";
  }

  return filename;
}
```

Display information about the generated PDF.

```js
pageCount.textContent = `${finalPdf.numPages} Pages`;
fileSize.textContent = formatFileSize(generatedPdfBlob.size);
```

Download the completed PDF.

```js
downloadButton.addEventListener("click", () => {
  const url = URL.createObjectURL(generatedPdfBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = getFilename();
  link.click();

  URL.revokeObjectURL(url);
});
```

Everything happens locally inside the browser, allowing users to keep their documents private throughout the conversion process.

![Download section showing the output filename, page count, file size, and Download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/70faf03f-7d15-4c76-898d-088db8bb7448.png)

---

## Demo: How the PDF to Grayscale Converter Works

Let's walk through the complete workflow.

### Step 1: Upload the PDF

Users begin by dragging a PDF into the upload area or clicking **Select PDF**.

![Upload area for selecting a PDF document.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/9b6e9622-fe22-4e19-a6fd-23cb28defad9.png)

### Step 2: Preview the Document

PDF.js renders the uploaded document page by page, allowing users to review the file before conversion.

![PDF ready to be converted](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/93bd2249-88d1-4056-b3dd-c719e9853c70.png)

### Step 3: Configure the Conversion

Users adjust the grayscale intensity, choose a conversion mode, and decide whether to process all pages or only selected pages.

![Grayscale conversion settings panel.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/bcd8f197-ead0-4206-ac81-e03b85ff75c8.png)

### Step 4: Convert the PDF

Click **Convert to Grayscale** to begin processing the selected pages.

![Convert to Grayscale button with Start Over option.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d34647d8-6df4-468b-b6db-1b2c5ebb3dbb.png)

### Step 5: Review the Converted Document

After processing is complete, the application displays a preview of the generated grayscale PDF.

![Greyscale PDF preview after conversion](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8dbde4e8-447e-4704-bfd4-9a91244149e5.png)

### Step 6: Rename and Download

Finally, users can rename the output file, review the page count and file size, and download the converted PDF.

![Final download section with filename, page count, file size, and Download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/3703ca08-3df4-4fd9-afbc-9a75b1b369bb.png)

---

## Performance Tips

Large PDF files require more processing time because every page must be rendered and converted. Processing only the selected pages helps improve performance.

```js
for (let page = startPage; page <= endPage; page++) {
  await processPage(page);
}
```

After downloading the file, release temporary resources to reduce memory usage.

```js
URL.revokeObjectURL(downloadUrl);
```

These simple optimizations help keep the converter responsive when working with large multi-page PDF documents.

---

## Common Mistakes

One common mistake is converting the same page multiple times without first rendering the original page again. Always start with the original PDF page before applying another grayscale conversion.

```js
await renderPage(currentPage);
```

Another issue is allowing users to specify invalid page numbers.

```js
if (pageNumber < 1 || pageNumber > pdfDocument.numPages) {
  return;
}
```

Finally, remember that higher output quality usually produces larger PDF files. Choosing the appropriate quality setting helps balance image clarity and file size.

---

## Conclusion

In this tutorial, you built a browser-based PDF to Grayscale Converter using JavaScript.

You learned how to upload and preview PDF documents, render pages with PDF.js, convert colorful pages into grayscale using the Canvas API, process selected pages, generate a new PDF with PDF-lib, preview the completed document, rename the output file, and download it directly from the browser.

Because all processing happens locally, users can convert PDF documents to grayscale without uploading sensitive files to an external server.

::: info

You can explore the complete workflow using the [<VPIcon icon="fas fa-globe"/>PDF to Grayscale Converter](https://allinonetools.net/pdf-to-grayscale-converter/).

<SiteInfo
  name="PDF to Grayscale Converter - Free Online Tool"
  desc="Easily convert your PDF to grayscale online for free. Adjust intensity, choose conversion modes, and apply to all or specific pages. Secure, fast, and simple"
  url="https://allinonetools.net/pdf-to-grayscale-converter//"
  logo="https://allinonetools.net/wp-content/uploads/2025/05/cropped-yellow-icon-removebg-preview-192x192.png"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0-e1764822756169.webp"/>

:::

From here, you can extend the project with additional features such as sepia conversion, brightness and contrast controls, custom grayscale presets, batch PDF processing, or support for additional image filters.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF to Grayscale Converter Using JavaScript",
  "desc": "Many PDF documents contain colorful charts, presentations, marketing materials, scanned pages, or graphics that aren't always ideal for printing or archiving. In some cases, converting a document to g",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-to-grayscale-converter-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
