---
lang: en-US
title: "How to Build a Browser-Based PDF Blur Tool Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF Blur Tool Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF Blur Tool Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF Blur Tool Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-blur-tool-javascript.html
prev: /programming/js/articles/README.md
date: 2026-07-25
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ca664176-3589-4e16-b95e-506fa53bcfce.png
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
  name="How to Build a Browser-Based PDF Blur Tool Using JavaScript"
  desc="Many PDF documents contain information that shouldn't be shared publicly. Personal details, financial figures, signatures, addresses, account numbers, employee information, or confidential business da"
  url="https://freecodecamp.org/news/build-pdf-blur-tool-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ca664176-3589-4e16-b95e-506fa53bcfce.png"/>

Many PDF documents contain information that shouldn't be shared publicly. Personal details, financial figures, signatures, addresses, account numbers, employee information, or confidential business data often need to be hidden before a file is sent to someone else.

A PDF Blur Tool makes this process simple. Instead of permanently removing content, it places a blur effect over selected areas of a PDF so sensitive information becomes difficult to read while the rest of the document remains unchanged.

In this tutorial, you'll build a browser-based PDF Blur Tool using JavaScript. Users will be able to upload a PDF, preview every page, draw blur boxes over sensitive content, adjust the blur intensity, apply the blur to selected pages, preview the final result, and download the processed PDF, all without uploading files to a server.

We'll use PDF.js to render PDF pages inside the browser, HTML Canvas to create and manage blur regions, and PDF-lib to generate the final blurred PDF.

By the end of this tutorial, you'll have a fully functional client-side PDF editing tool similar to the one available on my site, AllInOneTools.

![allinonetools - pdf tools- blur pdf documents](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/76925a1f-2b94-4b5b-923c-0252d1703b22.png)

---

## What This PDF Blur Tool Does and How It Works

A PDF Blur Tool helps protect sensitive information before a document is shared. Instead of editing or deleting the original content, it applies a visual blur effect over selected areas so confidential information becomes unreadable while the rest of the document remains unchanged.

This approach is useful for hiding personal details, financial information, account numbers, signatures, addresses, faces, or any other private content that shouldn't be visible in the final document.

In this project, users can upload a PDF directly from their browser, preview every page, and draw one or more blur regions over the areas they want to hide. The tool also allows users to adjust the blur intensity, blur either selected areas or entire pages, apply the effect to the current page, all pages, or specific page ranges, preview the completed document, rename the output file, and download the final PDF.

Because everything runs inside the browser, no files are uploaded to a server, helping maintain document privacy.

Behind the scenes, the application first renders each PDF page onto an HTML canvas using PDF.js. Rather than modifying the original PDF immediately, it records the position, size, page number, and blur intensity for every blur region that the user creates.

When the user clicks Apply & Finalize, those stored regions are converted from browser coordinates into actual PDF page coordinates. The selected blur effect is then applied to the rendered page, and PDF-lib generates a new PDF containing the blurred content while preserving the rest of the document.

This workflow provides an interactive editing experience while keeping the original PDF unchanged until the final document is generated.

For example, each blur region can be represented as an object like this:

```js
const blurRegion = {
  page: 2,
  x: 180,
  y: 240,
  width: 260,
  height: 90,
  intensity: 6
};
```

Each object stores all the information required to recreate the blur effect during the final PDF generation process.

---

## Project Setup

Before writing any code, let's create a simple project structure for our PDF Blur Tool.

We'll use plain HTML, CSS, and JavaScript, along with two libraries:

- **PDF.js** for rendering PDF pages inside the browser.
- **PDF-lib** for generating the final blurred PDF.

Our project structure looks like this:

```sh title="file structure"
📂pdf-blur-tool/
├── index.html
├── style.css
├── script.js
├── pdf.worker.min.js
└── 📂assets/
```

Keeping the project simple makes it easier to understand how each part works.

Add PDF.js and PDF-lib before loading your own JavaScript.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js"></script>
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
<script src="script.js"></script>
```

Configure the PDF worker.

```js
pdfjsLib.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";
```

The worker processes PDF rendering in a background thread, helping keep the interface responsive while pages are rendered.

---

## Creating the HTML Layout

The application consists of four main sections:

- Upload area
- PDF preview
- Blur settings panel
- Final download section

Create the basic layout:

```html
<div id="uploadSection"></div>

<div id="editorSection" hidden>
  <div id="pdfPreview"></div>
  <aside id="blurSettings"></aside>
</div>
<div id="resultSection" hidden></div>
```

Initially, only the upload section is visible.

After a PDF is selected, the editor becomes visible.

### Selecting DOM Elements

Create references to the elements used throughout the application.

```js
const uploadSection = document.getElementById("uploadSection");
const editorSection = document.getElementById("editorSection");
const resultSection = document.getElementById("resultSection");
const fileInput = document.getElementById("pdfInput");
const pdfCanvas = document.getElementById("pdfCanvas");
const canvasContext = pdfCanvas.getContext("2d");
```

These references allow the application to switch between the upload, editing, and download stages.

---

## Uploading and Previewing PDFs

The upload section accepts both drag-and-drop and traditional file selection.

When a PDF is chosen, verify that it's actually a PDF before continuing.

```js
async function handlePdfUpload(file) {
  if (!file || file.type !== "application/pdf") {
    alert("Please select a PDF file.");
    return;
  }
  await loadPdf(file);
}
```

If validation succeeds, the document is loaded into memory.

### Reading the PDF

Use the File API to convert the uploaded file into an ArrayBuffer.

```js
async function loadPdf(file) {
  const bytes = await file.arrayBuffer();
  pdfDocument = await pdfjsLib.getDocument({
    data: bytes
  })
  .promise;
  currentPage = 1;
  await renderPage(currentPage);
}
```

The uploaded bytes will also be reused later when generating the blurred PDF.

### Rendering the First Page

PDF.js renders each page onto an HTML canvas.

Start by retrieving the requested page.

```js
async function renderPage(pageNumber) {
  const page = await pdfDocument.getPage(pageNumber);
  const viewport = page.getViewport({
    scale: 1.5
  });
  // ...
}
```

Resize the canvas to match the page dimensions.

```js
pdfCanvas.width = viewport.width;
pdfCanvas.height = viewport.height;
```

Render the page.

```js
await page.render({
  canvasContext,
  viewport
}).promise;
```

After rendering finishes, the PDF page becomes visible inside the editor.

![Uploaded PDF displayed in the preview area with page navigation controls.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/0dbda32b-6bfa-4403-97bd-288dfe808239.png)

### Creating Page Navigation

Most PDF documents contain multiple pages.

Allow users to move between pages using Previous and Next buttons.

```js
let currentPage = 1;
let pdfDocument = null;
```

Move to the previous page.

```js
previousButton.addEventListener("click", async () => {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  await renderPage(currentPage);
});
```

Move to the next page.

```js
nextButton.addEventListener("click", async () => {
  if (currentPage === pdfDocument.numPages) {
    return;
  }
  currentPage++;
  await renderPage(currentPage);
});
```

Update the page counter whenever the current page changes.

```js
pageIndicator.textContent = `Page ${currentPage} of ${pdfDocument.numPages}`;
```

This provides users with clear feedback while navigating large PDF documents.

![PDF preview with Previous and Next buttons for navigating between pages.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c99410bc-7d7c-411f-a8f1-8fd9b1aaf3b8.png)

### Preparing for Blur Editing

Once the current page is rendered, the application prepares a transparent layer above the PDF canvas.

This overlay captures mouse interactions without modifying the original page preview.

Create the overlay.

```html
<canvas id="overlayCanvas">
</canvas>
```

Match its size to the PDF preview.

```js
overlayCanvas.width = pdfCanvas.width;
overlayCanvas.height = pdfCanvas.height;
```

Later in the tutorial, this overlay will allow users to draw blur regions while keeping the underlying PDF page untouched.

### Showing the Editor

After the first page finishes rendering, switch from the upload screen to the editor interface.

```js
uploadSection.hidden = true;
editorSection.hidden = false;
```

Users can now preview the document, navigate between pages, and begin selecting areas that should be blurred.

---

## Creating Blur Regions

Now that the PDF preview is working, we can build the most important feature of the application: allowing users to blur sensitive information.

Instead of editing the PDF immediately, users first draw one or more blur regions over the page preview.

Each region stores its own position, size, and blur intensity. These regions are later converted into actual PDF coordinates during final processing.

### Creating the Blur Area Object

Every blur region is represented as a JavaScript object.

For example:

```js
const blurArea = {
  page: currentPage,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  intensity: 6
};
```

Rather than modifying the PDF immediately, the application simply keeps track of these objects until the user clicks **Apply & Finalize**.

### Storing Multiple Blur Regions

Users often need to hide more than one piece of information.

Store all blur areas inside an array.

```js
const blurAreas = [];
```

Whenever a new blur box is created, push it into the array.

```js
blurAreas.push({
  page: currentPage,
  x,
  y,
  width,
  height,
  intensity: blurIntensity
});
```

This makes it easy to redraw, edit, or remove individual blur regions later.

### Starting a Blur Selection

The transparent overlay canvas captures mouse interactions.

When the user presses the mouse button, record the starting position.

```js
let isDrawing = false;
let startX = 0;
let startY = 0;
overlayCanvas.addEventListener("mousedown", event => {
  isDrawing = true;
  startX = event.offsetX;
  startY = event.offsetY;
});
```

The blur rectangle begins at this point.

### Drawing the Blur Rectangle

As the mouse moves, update the rectangle dimensions.

```js
overlayCanvas.addEventListener("mousemove", event => {
  if (!isDrawing) {
    return;
  }

  drawPreviewBox(
    startX, startY,
    event.offsetX, event.offsetY
  );
});
```

The preview updates continuously while the user drags the mouse.

### Finishing the Selection

When the mouse button is released, save the completed blur region.

```js
overlayCanvas.addEventListener("mouseup", event => {
  isDrawing = false;
  blurAreas.push({
    page: currentPage,
    x: startX,
    y: startY,
    width: event.offsetX - startX,
    height: event.offsetY - startY,
    intensity: blurIntensity
  });
  redrawBlurAreas();
  updateBlurList();
});
```

Each blur region becomes part of the current editing session.

![User dragging a blur rectangle over sensitive information in the PDF preview.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/31655d91-dcb6-412c-8762-c6aedc732b81.png)

### Drawing Existing Blur Areas

Whenever the page changes or a blur region is added, redraw every blur box.

```js
function redrawBlurAreas() {
  overlayContext.clearRect(
    0, 0,
    overlayCanvas.width,
    overlayCanvas.height
  );

  blurAreas.filter(area => area.page === currentPage)
    .forEach(drawBlurArea);
}
```

This ensures that previously created blur regions remain visible while editing.

### Displaying Blur Boxes

Render every stored region with a dashed outline.

```js
function drawBlurArea(area) {
  overlayContext.setLineDash([6, 4]);
  overlayContext.strokeStyle = "#4f6cff";
  overlayContext.strokeRect(
    area.x, area.y,
    area.width, area.height
  );
}
```

The outline acts as a guide and doesn't become part of the final PDF.

### Blur Options

Users can choose how the blur should be applied.

The tool supports two modes:

- Blur selected areas
- Blur entire page(s)

The selected option controls the editing behavior.

```js
const blurMode = document.querySelector(
  'input[name="blurMode"]:checked'
).value;
```

If **Blur selected areas** is chosen, users draw blur rectangles manually.

If **Blur entire page(s)** is selected, the application skips manual selection and prepares to blur the entire page during final processing.

![Blur options showing choices for blurring selected regions or entire PDF pages.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/54004f00-c974-4d77-b385-fe3136acaf04.png)

### Adjusting Blur Intensity

Different documents require different levels of blur.

A slider lets users control the blur strength before applying the effect.

```js
const blurSlider = document.getElementById(
  "blurIntensity"
);
let blurIntensity = 6;
blurSlider.addEventListener("input", event => {
  blurIntensity = Number(
    event.target.value
  );
});
```

The selected value is stored with every newly created blur region.

```js
blurArea.intensity = blurIntensity;
```

Higher values produce a stronger blur effect.

![Blur intensity slider allowing users to adjust the strength of the blur effect.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/097cba2c-a441-401c-9f1c-f8ce0b5a26a1.png)

---

## Managing Multiple Blur Areas

Many documents contain several pieces of confidential information.

Instead of limiting users to a single blur rectangle, the application displays every saved region.

For example:

```text
Blur Area #1
Blur Area #2
Blur Area #3
```

Each entry includes a remove button.

```js
function removeBlurArea(index) {
  blurAreas.splice(index, 1);
  redrawBlurAreas();
  updateBlurList();
}
```

This allows users to delete only the blur region they no longer need.

To remove all blur regions from the current page:

```js
function clearCurrentPage() {
  const remaining = blurAreas.filter(area =>
    area.page !== currentPage
  );
  blurAreas.length = 0;
  blurAreas.push(...remaining);
  redrawBlurAreas();
}
```

![Blur area manager displaying multiple blur regions with delete controls and a Clear All on This Page button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/ef44e87e-7c39-4e2b-8e67-7e354853501d.png)

---

## Applying Blur to Pages

Users may want to blur only one page or several pages within a document.

The editor provides three options:

- Current page only
- All pages
- Specific pages

```js
const pageOption = document.querySelector('input[name="pageOption"]:checked').value;
```

If the user selects **Specific pages**, they can enter values such as:

```text
1, 3-5, 8
```

These values will later be converted into an array of page numbers before the final PDF is generated.

![Apply to Pages section with Current Page, All Pages, and Specific Pages options.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f3e1a72c-690d-4454-8b7a-50920817cd13.png)

### Applying the Blur Effect

So far, users have uploaded a PDF, selected one or more blur regions, adjusted the blur intensity, and chosen which pages should be processed.

The final step is converting those blur regions into actual blurred content inside the generated PDF.

Rather than modifying the original document directly, the application creates a new PDF while preserving the original file.

### Loading the Original PDF

Start by loading the uploaded PDF into PDF-lib.

```js
async function applyBlur() {
  const pdfDoc = await PDFLib.PDFDocument.load(
    originalPdfBytes.slice()
  );

  const pages = pdfDoc.getPages();
}
```

Using a copy of the original bytes ensures that the uploaded document remains unchanged.

### Processing the Selected Pages

Determine which pages should receive the blur effect.

```js
const selectedPages = parsePageSelection(
  pageSelection, pdfDoc.getPageCount()
);
```

For example:

```text
Current Page
↓
[2]

All Pages
↓
[1,2,3,4]

Specific Pages
↓
[1,3,5]
```

Only these pages will be modified during processing.

### Rendering Each Page as an Image

Since blur is a pixel-based effect, each selected PDF page is rendered into an off-screen canvas.

```js
const page = await pdfDocument.getPage(
  pageNumber
);

const viewport = page.getViewport({
  scale: 2
});

const canvas = document.createElement("canvas");
canvas.width = viewport.width;
canvas.height = viewport.height;
```

Render the page.

```js
await page.render({
  canvasContext: canvas.getContext("2d"),
  viewport
}).promise;
```

The canvas now contains a bitmap version of the PDF page that can be edited.

### Applying Blur to Selected Regions

Retrieve all blur regions that belong to the current page.

```js
const pageRegions = blurAreas.filter(area =>
  area.page === pageNumber
);
```

Loop through every blur region.

```js
pageRegions.forEach(area => {
  blurCanvasRegion(canvas, area);
});
```

Each region is blurred independently.

### Blurring the Canvas Region

The browser's Canvas API allows filters to be applied while drawing.

Set the blur filter based on the selected intensity.

```js
context.filter = `blur(${area.intensity}px)`;
```

Redraw only the selected region.

```js
context.drawImage(
  canvas,
  area.x, area.y,
  area.width, area.height,
  area.x, area.y,
  area.width, area.height
);
```

After drawing, reset the filter.

```js
context.filter = "none";
```

Only the selected rectangle becomes blurred while the rest of the page remains unchanged.

### Blurring an Entire Page

If the user chooses **Blur entire page(s)**, the process is much simpler.

Apply the filter to the full canvas.

```js
context.filter = `blur(${blurIntensity}px)`;
context.drawImage(
  canvas,
  0, 0
);
context.filter = "none";
```

The entire rendered page receives the selected blur effect.

### Converting the Canvas Back into a PDF Image

After editing the canvas, convert it into an image.

```js
const imageData = canvas.toDataURL(
  "image/png"
);
```

Convert the image into bytes.

```js
const bytes = await fetch(imageData)
  .then(response =>
    response.arrayBuffer()
  );
```

Embed the image inside PDF-lib.

```js
const image = await pdfDoc.embedPng(bytes);
```

Replace the page contents.

```js
const pdfPage = pages[pageNumber - 1];
const size = pdfPage.getSize();
pdfPage.drawImage(image, {
  x: 0, y: 0,
  width: size.width,
  height: size.height
});
```

Repeat the same process for every selected page.

### Showing the Processing State

Generating large PDF files may take a few seconds.

Display a loading state while processing.

```js
applyButton.disabled = true;
applyButton.textContent = "Applying...";
```

After processing finishes:

```js
applyButton.disabled = false;
applyButton.textContent = "Apply & Finalize";
```

This gives users clear feedback that the application is working.

![Apply & Finalize button used to generate the blurred PDF.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/75e1e622-9769-4c17-8f39-49376de81041.png)

During processing:

![Applying state displayed while the PDF blur operation is being completed.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/68ae927f-aa3f-4e8c-8b37-2ef89ba0ad40.png)

---

## Generating the Final PDF

After every page has been processed, save the completed document.

```js
const pdfBytes = await pdfDoc.save();
const outputBlob = new Blob([pdfBytes], {
  type: "application/pdf"
});
```

Store the result so it can be previewed and downloaded later.

```js
generatedPdfBlob = outputBlob;
```

At this point, the blurred PDF has been successfully generated.

---

## Previewing the Result

Hide the editing interface and display the completed document.

```js
editorSection.hidden = true;
resultSection.hidden = false;
```

The result screen displays:

- Final PDF preview
- Editable filename
- Total pages
- File size
- Download button

![Final PDF preview showing multiple blurred regions with download options displayed beside the document.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1e96e1ec-b114-4ebb-955e-1e277d7f98da.png)

The user can review the processed document before downloading it.

---

## Renaming and Downloading

Before downloading, users may want to rename the generated file.

Create a filename field.

```html
<input
  type="text"
  id="outputFilename"
  value="blurred-document.pdf">
```

Validate the filename.

```js
function getFilename() {
  let filename = outputFilename.value.trim();
  if (!filename) {
    filename = "blurred-document.pdf";
  }
  if (!filename.toLowerCase().endsWith(".pdf")) {
    filename += ".pdf";
  }
  return filename;
}
```

Display additional file information.

```js
pageCount.textContent = `Pages: ${finalPdfDocument.numPages}`;
fileSize.textContent = formatFileSize(generatedPdfBlob.size);
```

Download the processed document.

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

The browser downloads the completed PDF without sending any files to a remote server.

![Download section showing editable filename, page count, file size, and Download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1cd1538e-7a90-4994-bbd0-da84365e1d34.png)

---

## Demo: How the PDF Blur Tool Works

Let's walk through the complete workflow.

### Step 1: Upload the PDF

Users upload a PDF using drag-and-drop or the **Select PDF** button.

The browser validates the file and prepares it for rendering.

![Upload screen for selecting a PDF file.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/9a08c61c-814a-4c44-9a74-6f4eef7ddefc.png)

### Step 2: Preview the Document

The uploaded PDF appears inside the preview window.

Users can move through the document using the page navigation controls.

![PDF preview with Previous and Next page navigation.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/27024335-d786-476c-9c34-e050ca4162e7.png)

### Step 3: Configure Blur Settings

Users choose whether to blur selected areas or entire pages.

They can also configure the blur intensity before creating any blur regions.

![Blur settings panel showing available blur options.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6fdcce22-b42d-48ca-94cd-c99bc679b7f5.png)

### Step 4: Draw Blur Areas

Users click and drag directly on the PDF preview to create blur rectangles over sensitive content.

Multiple blur regions can be created on the same page.

![User creating blur rectangles over confidential information.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c5404708-118c-4f7f-a768-c20ea66626a7.png)

### Step 5: Adjust Blur Intensity

The blur intensity slider controls how strong the blur effect should appear.

Higher values produce a stronger blur.

![blur seleted option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b485fa69-8952-4e4a-b91c-945c9879838a.png)

![Blur intensity slider controlling the strength of the blur effect.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d0ece3b0-2c75-45a2-9286-8a38a0ef706a.png)

### Step 6: Manage Blur Regions

Individual blur areas can be removed, or all blur regions on the current page can be cleared.

This makes editing much easier before generating the final PDF.

![Blur area management panel with multiple blur regions.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c90a4b21-9cfe-4c99-9b11-29b862621ca1.png)

### Step 7: Choose the Pages

Users decide whether the blur should be applied to:

- Current page
- All pages
- Specific pages

For example:

```text
1,3-5,8
```

![Apply to Pages section with Current Page, All Pages, and Specific Pages options.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/663facb2-f312-43a0-b4c8-4a029da0ed81.png)

### Step 8: Apply the Blur

After reviewing the settings, users click **Apply & Finalize**.

The application generates a new PDF containing the selected blur effects.

![Apply & Finalize button generating the blurred PDF.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/53eb6910-25ec-4b66-aaf1-a0c11363a3f8.png)

### Step 9: Review the Final Document

The completed PDF appears in the preview window.

Users can verify every blurred region before downloading.

![ Final blurred PDF preview before downloading.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/834a4f6d-e12a-45ae-b977-e761f624bb34.png)

### Step 10: Rename and Download

Finally, users rename the output file if needed and click **Download**.

The browser saves the completed PDF locally.

![ Download section showing filename editing and Download button.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/573a6966-d0af-47af-a4d3-2c99b9a79622.png)

---

## Performance Tips

Large PDF files can take longer to render and process, but a few simple optimizations can keep the editor responsive.

Render only the page the user is currently viewing instead of loading the entire document.

```js
await renderPage(currentPage);
```

Reuse the same canvas and redraw only the blur regions when changes are made.

```js
overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
redrawBlurAreas();
```

During final processing, generate only the pages selected by the user.

```js
for (const page of selectedPages) {
  await processPage(page);
}
```

Finally, release temporary resources after the download completes.

```js
URL.revokeObjectURL(downloadUrl);
```

These optimizations reduce memory usage and help the PDF Blur Tool perform smoothly, even with large multi-page documents.

---

## Common Mistakes

One common issue is storing blur coordinates before accounting for the current zoom level.

Always convert preview coordinates into the PDF's coordinate system before generating the final document.

```js
const scaleX = pdfWidth / canvas.width;
const scaleY = pdfHeight / canvas.height;
```

Another mistake is allowing blur regions to extend beyond the page boundaries.

Clamp the values before processing.

```js
blurArea.x = Math.max(0, blurArea.x);
blurArea.y = Math.max(0, blurArea.y);
```

Users should also verify the final preview before downloading, especially when multiple blur regions exist across different pages.

Finally, remember that this project applies a **visual blur effect** to the rendered PDF pages. If your application requires permanent removal of sensitive content rather than visual obscuring, additional document-redaction techniques are needed.

---

## Conclusion

In this tutorial, you built a browser-based PDF Blur Tool using JavaScript.

You learned how to upload and preview PDF documents, navigate between pages, create and manage multiple blur regions, adjust blur intensity, apply blur to selected pages, generate a new PDF with PDF-lib, preview the processed document, and download the final file – all without uploading data to a server.

By combining PDF.js, the HTML Canvas API, and PDF-lib, you created a privacy-focused PDF editing tool that runs entirely inside the browser.

::: info

You can explore the complete workflow using the [<VPIcon icon="fas fa-globe"/>PDF Blur Tool](https://allinonetools.net/blur-pdf/).

<SiteInfo
  name="Blur PDF Online - Free Secure PDF Blurring Tool"
  desc="Easily blur PDF documents online for free. Obscure sensitive text, faces, and images with an adjustable blur effect. Secure, fast, and simple PDF blurring tool"
  url="https://allinonetools.net/blur-pdf//"
  logo="https://allinonetools.net/wp-content/uploads/2025/05/cropped-yellow-icon-removebg-preview-192x192.png"
  preview="https://allinonetools.net/wp-content/uploads/2025/08/assets_task_01k3h138w0er0rks9vqt688kft_1756139596_img_1-e1765191581150.webp"/>

:::

From here, you could extend the project with features such as movable and resizable blur regions, undo and redo support, reusable blur presets, keyboard shortcuts, touch-device editing, or additional annotation tools for even more advanced browser-based PDF editing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF Blur Tool Using JavaScript",
  "desc": "Many PDF documents contain information that shouldn't be shared publicly. Personal details, financial figures, signatures, addresses, account numbers, employee information, or confidential business da",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-blur-tool-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
