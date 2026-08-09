---
lang: en-US
title: "How to Build a Browser-Based PDF Color Inverter Tool Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF Color Inverter Tool Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF Color Inverter Tool Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF Color Inverter Tool Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-color-inverter-tool-javascript.html
prev: /programming/js/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e4b5fb66-d353-4c78-adb3-ddc1f3d5594d.png
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
  name="How to Build a Browser-Based PDF Color Inverter Tool Using JavaScript"
  desc="Reading PDF documents for long periods can become tiring, especially when the document contains bright backgrounds or when you're working in a low-light environment. In other situations, designers, de"
  url="https://freecodecamp.org/news/build-pdf-color-inverter-tool-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e4b5fb66-d353-4c78-adb3-ddc1f3d5594d.png"/>

Reading PDF documents for long periods can become tiring, especially when the document contains bright backgrounds or when you're working in a low-light environment.

In other situations, designers, developers, and print professionals may want to inspect how a document looks with inverted colors or prepare alternative versions for accessibility and review.

A PDF Color Inverter Tool makes this possible by transforming the colors of PDF pages while keeping the document structure intact. Instead of editing every image or graphic manually, users can upload a PDF, invert its colors, preview the results, and download a newly generated document in just a few clicks.

In this tutorial, you'll build a browser-based PDF Color Inverter Tool using JavaScript. Users will be able to upload a PDF, preview its pages, choose an inversion mode, specify the page range to process, adjust the output quality, enable live preview, generate the inverted PDF, review the result, rename the output file, and download it, all without uploading the document to a server.

We'll use PDF.js to render PDF pages inside the browser, the HTML Canvas API to manipulate pixel colors, and PDF-lib to generate the final PDF.

By the end of this tutorial, you'll have a fully functional client-side PDF color inversion tool similar to the one available on my site All In One Tools.

---

## What This PDF Color Inverter Tool Does and How It Works

A PDF Color Inverter Tool changes the appearance of a PDF by reversing the colors of its pages. Light colors become dark, dark colors become light, and every pixel is recalculated to create an inverted version of the original document. This can improve readability in certain environments, help preview designs in dark mode, or simply provide an alternative way to view a document.

In this project, users can upload a PDF, browse through every page, choose how the colors should be inverted, define the page range to process, select the output quality, enable a live preview, generate the inverted document, rename the output file, and download the finished PDF. Since all processing happens locally inside the browser, the original document never leaves the user's device.

Behind the scenes, **PDF.js** renders each PDF page onto an HTML canvas. Once a page is rendered, JavaScript accesses the pixel data using the Canvas API. Every pixel's red, green, and blue values are recalculated to create the inverted version of the page.

After processing all selected pages, **PDF-lib** assembles the modified pages into a new PDF that users can preview and download.

A single pixel is represented by four values:

```js
const pixel = {
  red: 120,
  green: 85,
  blue: 200,
  alpha: 255
};
```

During color inversion, each color channel is transformed by subtracting its value from **255**.

```js
red = 255 - red;
green = 255 - green;
blue = 255 - blue;
```

Repeating this calculation for every pixel on every selected page produces the final inverted PDF while preserving the document's layout, page order, and dimensions.

---

## Project Setup

Before writing any image-processing code, let's create a simple project structure for our PDF Color Inverter Tool.

We'll build the application using plain HTML, CSS, and JavaScript together with two libraries:

- PDF.js for rendering PDF pages inside the browser.
- PDF-lib for generating the final inverted PDF.

Our project structure looks like this:

```sh title="file structure"
📂pdf-color-inverter/
├── index.html
├── style.css
├── script.js
├── pdf.worker.min.js
└── 📂assets/
```

Keeping everything separated makes the application easier to understand and maintain.

Include the required libraries before loading your own JavaScript.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js"></script>
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
<script src="script.js"></script>
```

Configure the PDF.js worker.

```js
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
```

Running PDF.js inside a worker keeps the browser responsive while rendering large PDF files.

---

## Creating the HTML Layout

The application contains four primary sections:

- Upload area
- Settings panel
- PDF preview
- Result section

Create the basic structure.

```html
<section id="uploadSection"></section>
<section id="settingsSection" hidden></section>
<section id="previewSection" hidden></section>
<section id="resultSection" hidden></section>
```

Only the upload area is visible when the page first loads.

After a PDF has been selected, the remaining sections become available.

---

## Selecting the Main Elements

Store references to the elements used throughout the application.

```js
const uploadSection = document.getElementById("uploadSection");
const settingsSection = document.getElementById("settingsSection");
const previewSection = document.getElementById("previewSection");
const resultSection = document.getElementById("resultSection");
const pdfCanvas = document.getElementById("pdfCanvas");
```

These references make it easy to switch between different stages of the workflow.

---

## Uploading and Previewing PDFs

The upload area accepts drag-and-drop as well as manual file selection.

When a file is selected, verify that it's actually a PDF.

```js
async function handleUpload(file) {
  if (!file || file.type !== "application/pdf") {
    alert("Please select a PDF file.");
    return;
  }

  await loadPdf(file);
}
```

If the file passes validation, the browser loads it into memory.

### Supporting Password-Protected PDFs

Some documents are protected with a password.

The upload screen provides an optional password field before processing begins.

![Upload area showing an optional password field for protected PDF documents.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a5c65e5d-290e-4a8d-b60a-70bd8e88e35f.png)

Retrieve the entered password.

```js
const password = document.getElementById("pdfPassword").value.trim();
```

Pass the password to PDF.js while loading the document.

```js
const loadingTask = pdfjsLib.getDocument({
  data: pdfBytes,
  password
});

pdfDocument = await loadingTask.promise;
```

If the document isn't password protected, the password field can simply remain empty.

### Loading the PDF

Convert the uploaded file into an ArrayBuffer.

```js
async function loadPdf(file) {
  originalPdfBytes = await file.arrayBuffer();
  pdfDocument = await pdfjsLib.getDocument({
    data: originalPdfBytes
  }).promise;

  currentPage = 1;
  await renderPage(currentPage);
}
```

The original bytes are preserved because they'll later be used to generate the inverted PDF.

### Rendering PDF Pages

PDF.js renders one page at a time.

Retrieve the requested page.

```js
async function renderPage(pageNumber) {
  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({
    scale: 1.5
  });
}
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

After rendering completes, the selected page becomes visible inside the preview area.

![Page-by-page PDF preview displayed after the document has been uploaded.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6fb70ed3-70ae-489b-99ba-7f822cff3579.png)

### Navigating Between Pages

Most documents contain multiple pages, so the preview includes Previous and Next buttons.

Create the page state.

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
pageNumber.textContent = `Page ${currentPage} of ${pdfDocument.numPages}`;
```

This allows users to browse through the document before choosing which pages should have their colors inverted.

---

## Building the Color Inversion Settings

Before processing the PDF, users should be able to control how the colors are inverted. The settings panel lets users choose the inversion mode, specify which pages should be processed, select the output quality, enable a live preview, or reset everything and start over.

![PDF Color Inverter settings panel showing inversion mode, page range, output quality, live preview, and reset options.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d98128ce-5c68-4eda-a10c-c0297aed3b41.png)

### Choosing the Inversion Mode

The first option allows users to choose how the document colors should be inverted.

Create the dropdown.

```html
<select id="invertMode" >
  <option value="full" >Full Invert</option>
</select>
```

Read the selected mode.

```js
const inversionMode = document.getElementById("invertMode").value;
```

The selected value determines which color transformation is applied during processing.

### Selecting the Page Range

Sometimes users only need to invert a few pages instead of the entire document.

Create two input fields.

```html
<input type="number" id="startPage" min="1">
<input type="number" id="endPage" min="1">
```

Retrieve the selected pages.

```js
const startPage = Number(startPageInput.value);
const endPage = Number(endPageInput.value);
```

Only the pages inside this range will be processed when generating the final PDF.

### Choosing the Output Quality

The tool provides multiple quality levels so users can balance image quality and file size.

Create the quality selector.

```html
<select id="outputQuality">
  <option value="low">Low (Smaller Size)</option>
  <option value="medium">Medium</option>
  <option value="high">High (Best Quality)</option>
</select>
```

![Output Quality dropdown showing Low, Medium, and High options.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/006be0e0-82a9-4b9e-8376-c6d9bb604a12.png)

Read the selected quality.

```js
const quality = document.getElementById("outputQuality").value;
```

The selected value will later determine the image quality used while generating the new PDF.

### Enabling Live Preview

The Live Preview switch lets users instantly see the inverted colors without generating a new PDF.

Create the toggle.

```html
<input type="checkbox" id="livePreview">
```

Read its state.

```js
const livePreview = document.getElementById("livePreview").checked;
```

Whenever the setting changes, refresh the preview.

```js
livePreviewToggle.addEventListener("change", updatePreview);
```

When enabled, the preview canvas updates automatically as users change the inversion settings.

![Live Preview enabled showing inverted PDF page thumbnails.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/ec38d1d9-02a9-4ecb-b29d-8451232def9e.png)

### Resetting the Settings

The Reset button clears the current configuration so users can begin again without reloading the page.

Create the button.

```html
<button id="resetButton">Reset / Clear</button>
```

Restore the default values.

```js
function resetSettings() {
  invertMode.value = "full";
  outputQuality.value = "high";
  livePreview.checked = false;
}
```

Attach the event listener.

```js
resetButton.addEventListener("click", resetSettings);
```

This returns the settings panel to its initial state.

### Starting the Color Inversion

Once the settings have been reviewed, users can begin processing the document.

Create the action button.

```html
<button id="invertPdf">Invert PDF Colors</button>
```

Start the inversion process.

```js
invertButton.addEventListener("click", async () => {
  await invertPdf();
});
```

![Invert PDF Colors button below the page previews.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d779889d-5c5e-462a-94d6-f33234b15426.png)

---

## Inverting PDF Colors

Now we'll build the core feature of the application: reversing the colors of each PDF page.

The workflow is straightforward. First, PDF.js renders a page onto an HTML canvas. Next, JavaScript reads every pixel from the canvas, inverts its red, green, and blue values, and writes the updated pixels back. Finally, the processed page is added to a new PDF using PDF-lib.

### Reading Canvas Pixel Data

Once a page has been rendered, retrieve its pixel information.

```js
const imageData =

context.getImageData(
  0, 0,
  canvas.width, canvas.height
);
```

Each pixel consists of four values:

- Red
- Green
- Blue
- Alpha (Transparency)

The pixel data is stored inside an array.

```js
const pixels = imageData.data;
```

We'll modify this array directly.

### Inverting Every Pixel

To invert a color, subtract each RGB value from 255.

Loop through every pixel.

```js
for (let i = 0; i < pixels.length; i += 4) {
  pixels[i] = 255 - pixels[i];
  pixels[i + 1] = 255 - pixels[i + 1];
  pixels[i + 2] = 255 - pixels[i + 2];
}
```

The alpha channel remains unchanged so transparent elements continue to render correctly.

After updating every pixel, write the modified image back onto the canvas.

```js
context.putImageData(imageData, 0, 0);
```

The page preview now displays the inverted colors.

### Updating the Live Preview

If **Live Preview** is enabled, users should immediately see the changes without generating a new PDF.

Check whether the feature is active.

```js
if (livePreview.checked) {
  await invertCurrentPage();
}
```

Whenever users change the inversion mode, page range, or quality settings, refresh the preview.

```js
async function updatePreview() {
  await renderPage(currentPage);
  await invertCurrentPage();
}
```

![Live Preview enabled showing PDF pages with inverted colors.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/dbb6058b-207d-4f42-a958-cc31b386a03f.png)

### Processing the Selected Pages

Instead of processing the entire document every time, only invert the pages selected by the user.

Loop through the chosen page range.

```js
for (let page=startPage;page <= endPage;page++) {
  await processPage(page);
}
```

Each processed page is temporarily stored before generating the final PDF.

### Generating the Final PDF

Create a new PDF document.

```js
const outputPdf = await PDFLib.PDFDocument.create();
```

Convert the processed canvas into an image.

```js
const imageBytes = await canvasToBytes(pdfCanvas);
```

Embed the image.

```js
const image = await outputPdf.embedPng(imageBytes);
```

Create a page.

```js
const page = outputPdf.addPage([
  image.width,
  image.height
]);
```

Draw the processed image.

```js
page.drawImage(image, {
  x: 0, y: 0,
  width: image.width, height: image.height
});
```

Repeat these steps for every selected page.

### Saving the Finished PDF

Once all pages have been processed, save the completed document.

```js
const pdfBytes = await outputPdf.save();
```

Convert the generated bytes into a downloadable file.

```js
generatedPdfBlob = new Blob([pdfBytes], {
  type: "application/pdf"
});
```

The generated PDF is now ready for preview and download.

---

## Previewing the Result

Before downloading the processed document, it's useful to let users review the final output. This allows them to verify that the selected pages have been inverted correctly and that the document appears as expected.

Load the generated PDF into PDF.js.

```js
async function showPreview() {

  const bytes = await generatedPdfBlob.arrayBuffer();

  finalPdf = await pdfjsLib.getDocument({
    data: bytes
  }).promise;
  renderFinalPage(1);
}
```

Render the selected page.

```js
async function renderFinalPage(pageNumber) {
  const page = await finalPdf.getPage(pageNumber);
  const viewport = page.getViewport({
    scale: 1.5
  });

  finalCanvas.width = viewport.width;
  finalCanvas.height = viewport.height;
  await page.render({
    canvasContext: finalCanvas.getContext("2d"),
    viewport
  }).promise;
}
```

Users can browse through the processed document before downloading it.

![Final PDF preview showing inverted colors before downloading.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/234e0566-0622-44bc-9509-39df2b9fb584.png)

---

## Renaming and Downloading

Before saving the PDF, users can provide a custom filename.

Create the filename field.

```html
<input
  type="text"
  id="outputFilename"
  value="inverted-document.pdf">
```

Retrieve the filename.

```js
function getFilename() {
  let filename = outputFilename.value.trim();
  if (!filename) {
    filename = "inverted-document.pdf";
  }

  if (!filename.endsWith(".pdf")) {
    filename += ".pdf";
  }
  return filename;
}
```

Display additional file information.

```js
pageCount.textContent = `${finalPdf.numPages} Pages`;
fileSize.textContent = formatFileSize(
  generatedPdfBlob.size
);
```

Download the generated PDF.

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

Everything happens locally inside the browser, so users can download the processed PDF immediately after reviewing it.

![Download section showing the renamed PDF filename, page count, file size, and Download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1d72201e-4c1e-4efe-8c64-dae32bd9c731.png)

---

## Demo: How the PDF Color Inverter Tool Works

Let's walk through the complete workflow.

### Step 1: Upload the PDF

Users begin by dragging a PDF into the upload area or clicking **Select PDF**. If the document is password protected, the password can be entered before loading.

![Upload screen with drag-and-drop support, Select PDF button, and password field.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/89ffe01f-6aa2-4174-88f4-73151e5c8baf.png)

### Step 2: Preview the Document

The uploaded PDF is rendered page by page, allowing users to browse the document before making any changes.

![Page-by-page PDF preview before applying color inversion.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f263b6d4-141e-443f-8939-57f10c6bff46.png)

### Step 3: Configure the Settings

Users choose the page range, output quality, and whether Live Preview should be enabled.

![Settings panel showing inversion options, page range, output quality, and live preview.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/7f90aa16-988d-49e1-a292-ca4938007765.png)

### Step 4: Preview the Inverted Colors

When Live Preview is enabled, the current page updates immediately so users can review the inverted appearance before processing the complete document.

![Live Preview displaying the current page with inverted colors.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e1790ba0-2c89-4632-b84e-53bed26481fa.png)

### Step 5: Generate the PDF

Clicking **Invert PDF Colors** processes the selected pages and creates a new PDF containing the inverted pages.

### Step 6: Review and Download

The generated PDF appears in the final preview. Users can rename the output file, review the page count and file size, and download the completed document.

![Final PDF preview with rename field, page count, file size, and Download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/20685eba-4e6a-4601-992a-f23e384740f1.png)

---

## Performance Tips

Large PDF files can require additional processing time. Rendering only the current page, updating the preview instead of reloading the entire document, and processing only the selected page range can significantly improve performance.

```js
for (let page = startPage; page <= endPage; page++) {
  await processPage(page);
}
```

After the download completes, release temporary resources.

```js
URL.revokeObjectURL(downloadUrl);
```

These small optimizations help keep the application responsive, even when processing large PDF files.

---

## Common Mistakes

A common mistake is modifying the original canvas repeatedly without first rendering a fresh copy of the PDF page. This can cause colors to be inverted multiple times.

Always render the original page before applying another inversion.

```js
await renderPage(currentPage);
```

Another issue is processing page numbers outside the valid range.

```js
if (pageNumber < 1 || pageNumber > pdfDocument.numPages) {
  return;
}
```

Finally, remember that higher output quality generally produces larger PDF files. Users should choose a quality level that balances image clarity and file size for their specific needs.

---

## Conclusion

In this tutorial, you built a browser-based PDF Color Inverter Tool using JavaScript.

You learned how to upload PDF documents, support password-protected files, render pages with PDF.js, manipulate pixel colors using the HTML Canvas API, generate a new PDF with PDF-lib, preview the completed document, rename the output file, and download it directly from the browser.

Because all processing takes place locally, users can invert PDF colors without uploading sensitive documents to an external server.

::: info

You can explore the complete workflow using the [<VPIcon icon="fas fa-globe"/>PDF Color Inverter Tool.](https://allinonetools.net/pdf-color-inverter/)

<SiteInfo
  name="PDF Color Inverter - Free Online Tool for Dark Mode PDFs"
  desc="Invert PDF colors online for free. Quickly switch black to white or dark to light in your PDFs. Fast, secure, and no sign-up required."
  url="https://allinonetools.net/pdf-color-inverter//"
  logo="https://allinonetools.net/wp-content/uploads/2025/05/cropped-yellow-icon-removebg-preview-192x192.png"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0-e1764822756169.webp"/>

:::

This project can be extended further by adding custom color filters, selective page previews, brightness and contrast adjustments, grayscale conversion, sepia effects, batch processing, or additional document enhancement tools.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF Color Inverter Tool Using JavaScript",
  "desc": "Reading PDF documents for long periods can become tiring, especially when the document contains bright backgrounds or when you're working in a low-light environment. In other situations, designers, de",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-color-inverter-tool-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
