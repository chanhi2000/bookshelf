---
lang: en-US
title: "How to Build a PDF Storyboard Generator Using JavaScript"
description: "Article(s) > How to Build a PDF Storyboard Generator Using JavaScript"
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
      content: "Article(s) > How to Build a PDF Storyboard Generator Using JavaScript"
    - property: og:description
      content: "How to Build a PDF Storyboard Generator Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-storyboard-generator-javascript/
prev: /programming/js/articles/README.md
date: 2026-11-07
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e8109e42-db7b-4690-9d2b-2be82ab57943.png
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
  name="How to Build a PDF Storyboard Generator Using JavaScript"
  desc="PDF files are commonly used to share presentations, scripts, reports, lesson materials, comic pages, and other visual documents. But reviewing a long PDF page by page can take time, especially when so"
  url="https://freecodecamp.org/news/build-pdf-storyboard-generator-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e8109e42-db7b-4690-9d2b-2be82ab57943.png"/>

PDF files are commonly used to share presentations, scripts, reports, lesson materials, comic pages, and other visual documents. But reviewing a long PDF page by page can take time, especially when someone needs to understand the overall sequence of scenes, slides, or visual content.

A storyboard provides a more organized way to review this information. Instead of opening every page individually, users can arrange selected PDF pages into a single sheet containing multiple panels. Each panel can include a page number, a caption, and a visual preview of the original page.

In this tutorial, we'll explore how to build a browser-based PDF Storyboard Generator using JavaScript, PDF.js, and PDF-lib.

The application takes pages from an existing PDF and arranges them into printable storyboard sheets. Users can choose different layouts, select the pages they want to include, add captions, customize the appearance, preview the result, and download the finished storyboard.

The application runs directly in the browser. The uploaded PDF is processed locally rather than uploaded to the website's server.

We'll examine the implementation step by step, including PDF rendering, page selection, caption handling, layout calculations, preview generation, and file export.

---

## What Is a PDF Storyboard Generator?

A PDF Storyboard Generator converts selected pages from an existing PDF into a structured visual sheet.

For example, imagine that you have a PDF containing 20 presentation slides. Instead of sharing all 20 slides separately, you can arrange them into a storyboard containing three columns and two rows per sheet.

Each panel displays a scaled version of its original PDF page. You can also add a number or label and write a short description underneath.

The same approach can be useful for:

- Reviewing presentation slides.
- Organizing comic pages.
- Planning video scenes.
- Preparing visual scripts.
- Reviewing scanned documents.
- Creating printable teaching materials.
- Organizing page sequences for creative projects.

The application doesn't create new scenes or draw illustrations. It arranges existing PDF pages into a storyboard layout.

---

## Main Features of the Application

Before writing the code, let's understand the features we're going to implement.

### 1. PDF Upload

Users can select a PDF from their device or drag and drop it into the upload area.

### 2. Multiple Storyboard Layouts

The application supports three layouts:

- Grid: Arranges pages in rows and columns.
- Panels with notes: Provides space for written notes alongside the page panels.
- Film strip: Arranges pages in a film-strip style.

### 3. Page Selection and Ordering

Users can choose which PDF pages should appear in the storyboard. They can also specify a custom order rather than following the original PDF sequence.

### 4. Captions

Users can type captions manually, fill empty captions using extracted PDF page text, or use OCR to read text from scanned pages.

### 5. Customization

Users can customize the paper size, orientation, number of columns and rows, panel labels, sheet colors, caption font, text size, spacing, and panel frames.

### 6. Live Preview

The application generates a preview of the storyboard sheets. Users can review the arrangement before downloading the final output.

### 7. Multiple Export Formats

Users can export their work as:

- A PDF storyboard.
- PNG storyboard sheets.
- A ZIP file containing individual page pictures.

The PDF export preserves original page content as vectors when possible, helping maintain sharp text and graphics.

---

## Understanding the Browser-Based Workflow

The application follows a straightforward process.

1. The user selects or drops a PDF file into the upload area.
2. PDF.js loads the document and renders its pages.
3. The application displays page previews and caption fields.
4. The user selects pages, changes their order, and enters captions.
5. The user configures the storyboard layout and appearance.
6. JavaScript calculates the position and dimensions of every panel.
7. The preview is updated to reflect the selected settings.
8. PDF-lib and browser canvas functionality are used to generate the requested output.
9. The browser downloads the finished file.

![PDF Upload Workspace](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1d23ecf5-1677-4549-84e1-03a08e8943eb.png)

![Panels and Captions](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/996d2382-8020-4ddc-b1b8-5956ec86bbdd.png)

![Board Settings and Preview](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/882dbe78-4c8c-4d21-aa64-6519fea5a4bf.png)

![Final Storyboard Preview](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/74d7c855-7a6f-44f0-83c2-09efe38a5c3c.png)

![Downloaded PDF](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/64397878-ad42-46eb-b5b6-d39fbf104335.png)

---

## Project Setup

Before writing the JavaScript functionality, we need to understand how the application is organized.

The PDF Storyboard Generator combines HTML, CSS, and JavaScript. HTML provides the interface, CSS controls the appearance of the workspace and storyboard sheets, and JavaScript handles PDF processing, page previews, captions, layout calculations, and downloads.

For a standalone development project, we can organize the files like this:

```sh title="file structure"
pdf-storyboard-generator/
├── index.html
├── style.css
├── script.js
└── assets/
```

The <VPIcon icon="fa-brands fa-html5"/>`index.html` file contains the application structure, including the upload area, page panels, caption fields, board settings, and preview.

The <VPIcon icon="fa-brands fa-css3-alt"/>`style.css` file controls the appearance of the application. It defines the workspace, panel grid, form controls, buttons, preview area, and responsive layout.

The <VPIcon icon="fa-brands fa-js"/>`script.js` file contains the main application logic. It loads PDF documents, renders their pages, manages captions, processes OCR requests, calculates storyboard layouts, and generates downloadable files.

The <VPIcon icon="fas fa-folder-open"/>`assets` directory can hold any additional local resources required by the project.

In the existing AllInOneTools implementation, these components are integrated into the website's tool page rather than being deployed as four separate files. The same separation of responsibilities still applies.

---

## Libraries Used

The application uses three main JavaScript libraries or browser technologies for its PDF and image-processing workflow.

### 1. PDF.js

We'll use PDF.js to open PDF documents and render their pages inside the browser.

It allows JavaScript to access individual pages, retrieve their dimensions, create viewports, and draw page content onto an HTML canvas.

For this project, PDF.js is responsible for the original PDF page previews.

The application uses the PDF.js document API to retrieve pages and render them at the required dimensions. This is important because the storyboard must display a visual representation of each selected page before the user downloads the finished sheet.

### 2. PDF-lib

We'll use PDF-lib used when generating the final PDF document.

PDF.js and PDF-lib have different responsibilities. PDF.js reads and renders the source document, while PDF-lib creates the new storyboard PDF.

The application uses PDF-lib to create output pages, embed the original PDF pages when possible, and place the finished storyboard elements onto those pages.

Keeping the original PDF pages as vector content helps preserve text and line quality when users zoom in or print the exported document. The implementation also uses a raster-based fallback for password-protected PDFs that can't be loaded through the regular PDF embedding path.

### 3. Tesseract.js

This library provides optional Optical Character Recognition (OCR).

Not every PDF contains selectable text. A scanned document, for example, may contain photographs of printed pages instead of actual text data.

When the user selects the OCR option, the application loads Tesseract.js and its English language data. It then processes eligible scanned pages and attempts to extract their text for captions.

OCR is optional, so users don't need to load the OCR engine when they only want to arrange PDF pages and write captions manually.

The following example illustrates how a standalone project could include the libraries through CDN scripts:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js"></script>
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
<script src="script.js"></script>
```

For a production application, use library versions that you've tested and configure the matching PDF.js worker file as required by your chosen PDF.js build.

### Why These Libraries Work Together

Each library has a separate responsibility.

PDF.js reads the source PDF and renders its pages. Tesseract.js optionally extracts text from scanned pages. PDF-lib creates the final storyboard PDF.

JavaScript connects these operations and manages the user interface.

This separation makes the application easier to understand and maintain. It also avoids using one library for tasks that are better handled by another.

### What We'll Cover:

- [Preparing the HTML Workspace](#heading-preparing-the-html-workspace)
- [Selecting the Main DOM Elements](#heading-selecting-the-main-dom-elements)
- [Defining Important Configuration Values](#heading-defining-important-configuration-values)
- [Understanding the Application State](#heading-understanding-the-application-state)
- [Uploading a PDF](#heading-uploading-a-pdf)
- [Loading the PDF with PDF.js](#heading-loading-the-pdf-with-pdfjs)
- [Measuring PDF Pages](#heading-measuring-pdf-pages)
- [Rendering PDF Pages on Canvas](#heading-rendering-pdf-pages-on-canvas)
- [Reusing Rendered Page Previews](#heading-reusing-rendered-page-previews)
- [Reading Text from PDF Pages](#heading-reading-text-from-pdf-pages)
- [Filling Empty Captions Automatically](#heading-filling-empty-captions-automatically)
- [Updating the Preview](#heading-updating-the-preview)
- [Choosing the Storyboard Layout](#heading-choosing-the-storyboard-layout)
- [Controlling Rows, Columns, and Paper Size](#heading-controlling-rows-columns-and-paper-size)
- [Selecting PDF Pages and Their Order](#heading-selecting-pdf-pages-and-their-order)
- [Adding Panel Labels](#heading-adding-panel-labels)
- [Drawing the Storyboard Sheet](#heading-drawing-the-storyboard-sheet)
- [Updating the Live Preview](#heading-updating-the-live-preview)
- [Adjusting Caption Appearance](#heading-adjusting-caption-appearance)
- [Navigating Between Storyboard Sheets](#heading-navigating-between-storyboard-sheets)
- [Reading Scanned Pages with OCR](#heading-reading-scanned-pages-with-ocr)
- [Generating the Final Storyboard PDF](#heading-generating-the-final-storyboard-pdf)
- [Downloading PNG Storyboard Sheets](#heading-downloading-png-storyboard-sheets)
- [Downloading Individual Page Pictures](#heading-downloading-individual-page-pictures)
- [Performance and Important Considerations](#heading-performance-and-important-considerations)
- [Demo: PDF Storyboard Generator](#heading-demo-pdf-storyboard-generator)

---

## Preparing the HTML Workspace

The interface needs several areas to support the complete storyboard workflow.

The upload area accepts the source PDF. The panel area displays rendered pages and caption fields. The board settings area contains layout and appearance controls. Finally, the preview area displays the generated storyboard sheets.

A simplified HTML structure looks like this:

```html title="index.html"
<section id="aiot-sb">
  <div id="aiot-sb-drop">
    <input type="file" id="aiot-sb-file-input"
      accept="application/pdf,.pdf"
    >
    <button type="button" data-act="browse">Select a PDF</button>
  </div>
  <div id="aiot-sb-grid"></div>
  <div id="aiot-sb-settings"></div>
  <div id="aiot-sb-preview"></div>
</section>

```

This is an illustrative structure showing the main interface areas. The actual application contains additional controls, accessibility attributes, and elements for its different operations.

The `aiot-sb` container provides a common root for the application. JavaScript can use this root to find the relevant interface elements without searching the entire website.

---

## Selecting the Main DOM Elements

JavaScript needs references to the interface elements before it can respond to user actions.

The application starts by finding its root container and checking whether initialization has already taken place:

```js title="script.js"
var root = document.getElementById("aiot-sb");
if (!root || root.getAttribute("data-aiot-sb-ready")) {
  return;
}
root.setAttribute("data-aiot-sb-ready", "1");
```

This prevents the application from initializing again if the script is executed more than once.

The implementation uses a small helper to find elements inside the application:

```js title="script.js"
function q(selector) {
  return root.querySelector(selector);
}
```

For example, `q('[data-act="browse"]')` finds the button used to open the PDF file picker.

Using a root-specific helper also helps keep the application code organized when the website contains other tools or interface components.

---

## Defining Important Configuration Values

The application needs a few shared configuration values for its layouts and output settings.

For example, it defines supported paper dimensions and font families:

```js title="script.js"
var MM = 72 / 25.4;
var PAPERS = {
  a4: [595.28, 841.89],
  letter: [612, 792],
  a3: [841.89, 1190.55],
  slide: [405, 720]
};
var PAPER_NAMES = {
  a4: "A4",
  letter: "Letter",
  a3: "A3",
  slide: "16:9 slide"
};
```

PDF page dimensions are commonly expressed in points, while some of the storyboard spacing settings are easier to understand in millimeters. The `MM` conversion value helps translate between these units.

The `PAPERS` object stores the available page dimensions. The application can use these values when calculating the size of each storyboard sheet.

The `PAPER_NAMES` object provides readable labels for the corresponding settings.

The application also defines font families for captions and other text:

```js title="script.js"
var FONTS = {
  sans: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'Courier New', Courier, monospace",
  hand: "'Segoe Print', 'Bradley Hand', cursive"
};
```

These values allow the storyboard renderer to use different text styles without repeating font definitions throughout the code.

---

## Understanding the Application State

The application needs to remember information about the currently loaded PDF, its pages, captions, selected layout, and export process.

Instead of relying on individual variables scattered throughout the application, the implementation groups related information into a shared state object.

For example, the application tracks information such as:

- The loaded PDF document.
- The original PDF bytes.
- The current filename.
- Page captions.
- Page preview data.
- Loading and export status.
- The OCR worker when OCR is active.
- Cancellation and loading tokens.

The actual implementation manages these values within its application state and uses them throughout the rendering and export functions.

This becomes especially important when the user changes a caption or layout setting. The application needs to know which values have changed so it can update the storyboard preview without unnecessarily reopening the source document.

---

## Uploading a PDF

The first step is allowing users to select a PDF from their device. The PDF Storyboard Generator supports two methods: selecting a file through the file picker or dragging and dropping it into the upload area.

The file input uses the following HTML:

```html title="index.html"
<input type="file" id="aiot-sb-file-input"
  accept="application/pdf,.pdf"
>
```

Let's understand the `accept` attribute:

- `application/pdf` is the MIME type for PDF files.
- `.pdf` is the file extension.

A MIME type (Multipurpose Internet Mail Extensions type) identifies the format of a file. Browsers use MIME types to describe the kind of content a file contains. For example, `application/pdf` identifies a PDF document.

The application checks both the MIME type and the filename extension. This is useful because some browsers or operating systems may provide an empty or incorrect MIME type for a selected file.

The actual application uses this helper:

```js title="script.js"
function isPdf(file) {
  return file.type === 'application/pdf' ||
    /.pdf$/i.test(file.name || '');
}
```

The first condition checks the file's MIME type. The second checks whether its filename ends with `.pdf`. The `i` flag makes the extension check case-insensitive, so filenames such as `document.PDF` are also accepted.

After validation, both upload methods use the same `handleFiles()` function. Its initial steps are:

```js title="script.js"
function handleFiles(list, password) {
  var all = Array.prototype.slice.call(list || []);
  ui.input.value = '';

  if (!all.length) {
    return Promise.resolve();
  }

  var file = all.filter(isPdf)[0];

  if (!file) {
    toast("That isn't a PDF. Choose a PDF file.", 'error');
    return Promise.resolve();
  }

  var note = all.length > 1
    ? ' Only ' + file.name + ' was opened; a storyboard uses one PDF.'
    : '';

  var token = ++state.loadToken;
  var hadDoc = !!state.doc;
  var task, bytes;

  if (hadDoc) {
    ui.fileMeta.textContent = 'Opening ' + file.name + '…';
  }

  setStatus('Opening ' + file.name + '…', true);
  // The remaining function loads and processes the selected PDF.
}
```

The function converts the supplied file list into an array and selects the first valid PDF. If no valid PDF is found, it displays an error message and stops.

The `loadToken` value helps the application distinguish the current loading operation from an older one. This matters when a user selects another document while a previous document is still being processed.

Next, the application waits for the PDF libraries to become available and reads the selected file:

```js title="script.js"
return engine().then(function () {
  return file.arrayBuffer();
}).then(function (buf) {
  bytes = buf;

  var opts = {
    data: new Uint8Array(buf.slice(0))
  };

  if (password) {
      opts.password = password;
  }

  task = window.pdfjsLib.getDocument(pdfjsOptions(opts));
  return task.promise;
});
```

The `file.arrayBuffer()` method reads the PDF into browser memory. The application converts the data into a `Uint8Array` and passes it to PDF.js through `getDocument()`.

If a password was supplied, it's added to the PDF.js options before the document is opened.

The complete function continues by measuring the PDF pages, checking whether the original pages can be embedded as vectors, updating the application state, and displaying the workspace.

This means the selected PDF is processed in the browser. It isn't uploaded to the website's server.

---

## Loading the PDF with PDF.js

Once a file has been selected, the application reads its contents and passes the data to PDF.js.

The PDF.js loading process returns a document object. This object provides access to the document's pages and metadata.

In the actual application, PDF.js is initialized inside the file-loading process. The application first waits for the PDF libraries to load, reads the selected file, and then passes its data to PDF.js.

```js title="script.js"
return engine().then(function () {
  return file.arrayBuffer();
}).then(function (buf) {
  bytes = buf;

  var opts = {
    data: new Uint8Array(buf.slice(0))
  };

  if (password) {
    opts.password = password;
  }

  task = window.pdfjsLib.getDocument(pdfjsOptions(opts));
  return task.promise;
});
```

The `engine()` function ensures that the required PDF libraries are available before processing begins. The application then uses `file.arrayBuffer()` to read the selected PDF into browser memory.

The `Uint8Array` constructor converts the file data into a format that PDF.js can process. If the user has supplied a password, it's added to the PDF.js options before the document is opened.

The `getDocument()` method starts the PDF loading process, and `task.promise` resolves when PDF.js has successfully opened the document.

The resulting document object provides access to the PDF's pages and metadata. The application stores this document for later operations, including measuring pages, extracting text, rendering previews, and generating the storyboard.

---

## Measuring PDF Pages

Before arranging pages into storyboard panels, the application needs to know their dimensions.

PDF documents can contain pages with different sizes and orientations. Measuring each page helps the layout engine fit it correctly inside its panel.

The actual application uses the `pageFacts()` function to measure every page and periodically update the interface while processing large PDFs.

```js title="script.js"
async function pageFacts(doc, token) {
  var sizes = [];

  for (var n = 1; n <= doc.numPages; n++) {
    if (token !== state.loadToken) {
      return null;
    }

    if (n % 25 === 0) {
      setStatus(
        'Measuring pages: ' + n + ' of ' + doc.numPages + '…',
        true
      );
      await nextFrame();
    }

    var p = await doc.getPage(n);
    var vp = p.getViewport({ scale: 1 });

    sizes.push([vp.width, vp.height]);
  }

  return sizes;
}
```

The function starts by creating an empty `sizes` array. It then loops through all pages using `doc.numPages` and retrieves each page with `doc.getPage(n)`.

The `getViewport({ scale: 1 })` method measures the page at its original scale. The function stores the resulting width and height in the `sizes` array.

The `token` parameter helps prevent an outdated loading operation from continuing. If the current token no longer matches `state.loadToken`, the function stops and returns `null`.

For larger PDFs, the application updates the loading status after every 25 pages and calls `nextFrame()` to give the browser an opportunity to update the interface.

Finally, the function returns the array containing the dimensions of all measured pages. These measurements are used later by the storyboard layout calculations.

---

## Rendering PDF Pages on Canvas

The next task is displaying the PDF pages in the workspace.

PDF.js can render an individual page onto an HTML canvas. The canvas provides a visual representation that can be used in the page cards and storyboard preview.

The core rendering function looks like this:

```js title="script.js"
async function renderPage(n, w, h) {
  var page = await state.doc.getPage(n);
  var b = page.getViewport({ scale: 1 });

  var vp = page.getViewport({
    scale: Math.min(w / b.width, h / b.height)
  });

  var c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(vp.width));
  c.height = Math.max(1, Math.round(vp.height));

  var g = c.getContext('2d');
  g.fillStyle = '#FFFFFF';
  g.fillRect(0, 0, c.width, c.height);

  await page.render({
    canvas: c,
    canvasContext: g,
    viewport: vp
  }).promise;

  return c;
}
```

The function accepts three parameters: `n` is the PDF page number, while `w` and `h` define the available width and height for the preview.

First, `state.doc.getPage(n)` retrieves the requested PDF page. The function then creates a viewport at scale 1 to obtain the page's original dimensions.

Next, `Math.min(w / b.width, h / b.height)` calculates a scale that fits the page inside the available space without changing its proportions.

The function creates an HTML canvas and sets its width and height using the calculated viewport dimensions. It fills the canvas with white before rendering the PDF page.

Finally, `page.render()` draws the page onto the canvas. The function waits for rendering to finish and returns the completed canvas for use in the page previews and storyboard.

![PDF Storyboard Generator displaying three PDF page previews rendered on canvas, including text and graphics from the original document.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/fb6abec4-c11f-44e7-b91e-730afd066723.png)

---

## Reusing Rendered Page Previews

Rendering the same PDF page repeatedly can consume unnecessary processing time. For example, a page might be rendered once for its card preview and again when the storyboard preview is updated.

The application uses a page-picture cache to reuse previously rendered canvases.

```js title="script.js"
var picCache = new Map();

// For the preview: reuse a page picture when one at least as big is already made.
async function cachedPic(n, w, h) {
  var got = picCache.get(n);

  if (got && got.w >= w * 0.92) {
    picCache.delete(n);
    picCache.set(n, got);
    return got.c;
  }

  var c = await renderPage(
    n,
    Math.ceil(w * 1.15),
    Math.ceil(h * 1.15)
  );

  picCache.set(n, { c: c, w: c.width });

  while (picCache.size > 60) {
    var old = picCache.keys().next().value;
    picCache.get(old).c.width = 1;
    picCache.delete(old);
  }

  return c;
}
```

The application stores rendered page previews in a JavaScript `Map` called `picCache`. Each entry contains the rendered canvas and its width.

When `cachedPic()` is called, it first checks whether a cached image exists for the requested page. If the cached image is at least 92% of the requested width, the application reuses it instead of rendering the page again.

The function moves a reused entry to the end of the Map. This helps the application keep recently used previews available.

If a suitable cached image isn't available, the function calls `renderPage()` to create a new canvas. It renders the page at 1.15 times the requested width and height, providing some extra resolution for the preview.

To control memory usage, the cache is limited to 60 entries. When that limit is exceeded, the oldest entry is removed, and its canvas width is reduced to 1 to release its drawing resources.

This caching approach avoids unnecessary PDF rendering while keeping memory usage under control, especially when users work with longer documents.

---

## Reading Text from PDF Pages

The storyboard generator can create captions in three ways:

1. The user writes captions manually.
2. The application extracts text from the PDF.
3. OCR reads text from scanned pages.

For PDFs containing selectable text, PDF.js provides the `getTextContent()` method.

The actual application uses the `readTexts()` function to extract and store text from every page in the loaded PDF.

```js title="script.js"
async function readTexts(token) {
  var doc = state.doc, out = [];

  for (var n = 1; n <= doc.numPages; n++) {
    if (token !== state.loadToken) {
      return;
    }

    try {
      var tc = await (await doc.getPage(n)).getTextContent();

      out.push(tc.items.map(function (it) {
        return (it.str || '') + (it.hasEOL ? '\n' : '');
      }).join(''));
    } catch (e) {
      out.push('');
    }

    if (n % 20 === 0) {
      await nextFrame();
    }
  }

  if (token !== state.loadToken) {
    return;
  }

  state.texts = out;
  refreshTags(board());
}
```

The function starts by accessing the loaded PDF document through `state.doc` and creating an empty array called `out` to store the extracted text.

It then loops through every page and calls `getTextContent()` to retrieve its text items. The `map()` method combines each item's text into a single string. It also adds a newline when the PDF.js item indicates the end of a line through `hasEOL`.

If text extraction fails for a page, the function adds an empty string to the results instead of stopping the entire process.

The `token` check prevents an older PDF-loading operation from updating the current application state. The function also calls `nextFrame()` after every 20 pages to give the browser an opportunity to update the interface.

After processing all pages, the extracted text is stored in `state.texts`. The application then calls `refreshTags(board())` to update the page information displayed in the workspace.

This stored text is used later when users choose to fill empty captions automatically.

---

## Filling Empty Captions Automatically

Once the application has extracted text from the PDF pages, it can use that text to create captions.

The important behaviour is that the application fills only empty caption fields. It doesn't overwrite captions that users have already entered.

The application uses the `captionFromText()` helper to clean and shorten the extracted text:

```js title="script.js"
function captionFromText(t) {
  var s = String(t || '')
    .replace(/\s+/g, ' ')
    .trim();

  if (letters(s) < 3) {
    return '';
  }

  if (s.length <= 200) {
    return s;
  }

  var cut = s.slice(0, 200);
  var end = Math.max(
    cut.lastIndexOf('. '),
    cut.lastIndexOf('? '),
    cut.lastIndexOf('! '),
    cut.lastIndexOf('। ')
  );

  return end > 60
    ? cut.slice(0, end + 1)
    : cut.replace(/\s+\S*$/, '') + '…';
}
```

::: info Here's what this function does

1. Converts the supplied value into a string.
2. Replaces repeated whitespace with single spaces and removes whitespace from the beginning and end.
3. Checks whether the text contains enough letters to be useful as a caption.
4. Returns the complete text if it contains no more than 200 characters.
5. For longer text, tries to end the caption at a sentence boundary. If there isn't a suitable boundary, it removes the incomplete final word and adds an ellipsis.

:::

The application then uses `fillFromText()` to apply the generated captions to the selected storyboard pages.

```js :collapsed-lines title="script.js"
function fillFromText() {
  var bd = board(), list = bd.error ? [] : unique(bd.list), filled = 0, scans = 0;

  list.forEach(function (n) {
    if (captionFor(n)) { return; }

    var c = captionFromText(state.texts[n - 1]);

    if (c) {
      state.captions[n] = c;
      filled++;

      var ta = ui.grid.querySelector('[data-cap="' + n + '"]');
      if (ta) { ta.value = c; }
    } else if (isScan(n)) {
      scans++;
    }
  });

  if (!state.opts.captions && filled) {
    state.opts.captions = true;
    savePrefs();
  }

  redrawSoon(0);

  if (!list.length) {
    toast(bd.error || 'No pages on the board.', 'error');
    return;
  }

  toast(
    filled
      ? plural(filled, 'caption', 'captions') +
      ' filled from the page text. Edit them in the cards below.' +
      (scans
        ? ' ' + plural(scans, 'scanned page has', 'scanned pages have') +
        ' no text; use OCR for ' + (scans === 1 ? 'it' : 'them') + '.'
        : '')
      : scans
        ? 'The empty pages are scans with no text. Use Read with OCR.'
        : 'Every panel already has a caption.'
  );
}
```

The `fillFromText()` function starts by calling `board()` to get the currently selected storyboard pages. It uses `unique()` to avoid processing the same page more than once.

For each selected page, `captionFor(n)` checks whether a caption already exists. If one is present, the function skips that page so the user's existing caption isn't overwritten.

If the caption is empty, the function retrieves the extracted text from `state.texts` and passes it to `captionFromText()`. When useful text is available, it saves the generated caption in `state.captions` and updates the corresponding textarea in the page card.

If a page has no extractable text and is identified as a scan, the function increases the scanned-page counter. Users can process these pages separately using OCR.

Finally, the application enables captions if necessary, saves the updated preferences, and schedules a preview refresh. It also displays a message showing how many captions were filled or whether OCR is needed.

This allows users to generate starting captions automatically while keeping their manually written descriptions intact.

![PDF Storyboard Generator showing automatically generated captions below PDF page previews.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/ded521e8-6e44-42c4-b02f-115683f40ea3.png)

---

## Updating the Preview

Whenever a caption or relevant setting changes, the storyboard preview needs to be refreshed.

The application uses a small scheduling function to avoid redrawing the preview immediately after every individual change:

```js title="script.js"
function redrawSoon(ms) {
  clearTimeout(drawTimer);
  drawTimer = setTimeout(
    drawPreview,
    ms === undefined ? 120 : ms
  );
}
```

The `redrawSoon()` function first cancels any previously scheduled preview update using `clearTimeout()`. It then schedules `drawPreview()` using `setTimeout()`.

By default, the application waits 120 milliseconds before refreshing the preview. If another change happens during that time, the previous scheduled redraw is cancelled and a new one is scheduled.

This helps prevent unnecessary repeated rendering when users are typing captions or adjusting settings.

### Drawing the Updated Preview

Once the redraw is scheduled, the `drawPreview()` function calculates the current storyboard configuration and updates the visible preview canvas.

The following is the actual implementation from the application:

```js :collapsed-lines title="script.js"
async function drawPreview() {
  if (!state.doc) { return; }

  var my = ++drawToken, bd = board();
  refreshTags(bd);
  syncPanel();

  if (bd.error) {
    ui.boardMsg.textContent = bd.error;
    ui.sheetPos.textContent = 'No sheets';
    ui.sheetCount.textContent = '';
    root.querySelectorAll('[data-needs-board]').forEach(function (b) {
      b.disabled = true;
    });
    return;
  }

  root.querySelectorAll('[data-needs-board]').forEach(function (b) {
    b.disabled = state.busy;
  });

  var L = bd.L, o = state.opts;
  state.sheet = clamp(state.sheet, 0, L.sheets - 1);

  ui.boardMsg.textContent = L.tight
    ? 'Captions leave little room for the pages. Use fewer caption lines, fewer rows or a smaller text size.'
    : '';

  ui.sheetPos.textContent = 'Sheet ' + (state.sheet + 1) + ' of ' + L.sheets;
  ui.sheetCount.textContent =
    plural(bd.list.length, 'panel', 'panels') + ' on ' +
    plural(L.sheets, 'sheet', 'sheets') + ', ' +
    PAPER_NAMES[o.paper] + ' ' + o.orient;

  q('[data-act="sheet-prev"]').disabled = state.sheet <= 0;
  q('[data-act="sheet-next"]').disabled = state.sheet >= L.sheets - 1;

  ui.sheetWrap.style.aspectRatio = L.W + ' / ' + L.H;

  var cssW = ui.sheetWrap.clientWidth || 600;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var k = cssW * dpr / L.W;

  var off = document.createElement('canvas');
  off.width = Math.round(L.W * k);
  off.height = Math.round(L.H * k);

  var done = await drawSheet(
    off.getContext('2d'),
    o,
    bd.list,
    L,
    state.sheet,
    k,
    'full',
    function (n, w, h) {
      return my === drawToken
        ? cachedPic(n, w, h)
        : Promise.resolve(null);
    }
  );

  if (!done || my !== drawToken) { return; }

  ui.sheet.width = off.width;
  ui.sheet.height = off.height;
  ui.sheet.getContext('2d').drawImage(off, 0, 0);

  off.width = 1;

  var start = state.sheet * L.per;
  var on = bd.list.slice(start, start + L.per);

  ui.sheet.setAttribute(
    'aria-label',
    'Sheet ' + (state.sheet + 1) + ' of ' + L.sheets + ': ' +
    (on.length === 1 ? 'page ' + on[0] : 'pages ' + on.join(', '))
  );

  ui.sheet.setAttribute('data-drawn', String(state.sheet + 1));
}
```

The function first checks whether a PDF document is loaded. It then calls `board()` to retrieve the selected pages and calculate the storyboard layout.

The `drawToken` value helps prevent an older preview-rendering operation from replacing a newer one. The function also calls `refreshTags()` and `syncPanel()` to update the page information and settings panel.

Next, it checks whether the selected board has any errors. If the selection is valid, it calculates the current sheet position and updates the sheet counter, panel count, paper information, and Previous and Next buttons.

The function then calculates the canvas scale using the available preview width and the device pixel ratio. The device pixel ratio is capped at 2 to limit the amount of rendering work.

The `drawSheet()` function draws the selected storyboard sheet onto a temporary canvas. It receives `cachedPic()` as a callback so previously rendered PDF page previews can be reused.

After drawing finishes, the function checks whether the operation is still current. If it is, the completed temporary canvas is copied onto the visible preview canvas.

Finally, the temporary canvas is released by reducing its width to 1. The application also updates the preview's accessibility label and records which sheet has been drawn.

This process allows users to see their storyboard changes without downloading a new PDF every time they adjust a caption or setting.

---

## Choosing the Storyboard Layout

The tool supports three layout styles: Grid, Panels with notes, and Film strip. Each layout is designed for a different type of project.

Grid layout arranges PDF pages in rows and columns. It works well for reviewing presentation slides, comic pages, and documents.

Panels with notes provides additional writing space below each page. It's useful for lecture notes, planning, and reviewing visual material.

Film strip arranges pages as a sequence of frames. It's useful for planning videos, reels, and scenes.

The selected layout is stored in the application's state. When users choose a different layout, the application updates the number of columns and rows to provide suitable default settings.

The following excerpt from the actual `onField()` function handles layout changes:

```js title="script.js"
if (f === 'layout' && e.type === 'change') {
  // sensible panel counts for each layout
  if (o.layout === 'notes') {
    o.cols = o.orient === 'landscape' ? 2 : 1;
    o.rows = o.orient === 'landscape' ? 3 : 4;
  }

  if (o.layout === 'strip') {
    o.cols = 4;
    o.rows = o.orient === 'landscape' ? 2 : 4;
  }

  if (o.layout === 'grid') {
    o.cols = o.orient === 'landscape' ? 3 : 2;
    o.rows = o.orient === 'landscape' ? 2 : 3;
  }
}

savePrefs();

if (f === 'cols' || f === 'rows' || f === 'layout') {
  state.sheet = 0;
}

redrawSoon(f === 'gap' ? 60 : 0);
```

This code checks which layout the user has selected and adjusts the default column and row counts according to the layout and paper orientation.

For example:

- **Panels with notes:** Uses 2 columns and 3 rows in landscape orientation, or 1 column and 4 rows in portrait orientation.
- **Film strip:** Uses 4 columns, with 2 rows in landscape orientation or 4 rows in portrait orientation.
- **Grid:** Uses 3 columns and 2 rows in landscape orientation, or 2 columns and 3 rows in portrait orientation.

After updating these values, `savePrefs()` saves the settings. The application resets the current sheet to the first sheet when the layout changes and calls `redrawSoon()` to refresh the preview.

Users can still adjust the number of rows and columns manually using the board settings.

---

## Controlling Rows, Columns, and Paper Size

Users can choose between 1 and 6 columns and rows per sheet. This gives them control over how many PDF pages appear together.

The application also supports different paper sizes, including A4, Letter, A3, and a 16:9 slide format. Each format can be displayed in portrait or landscape orientation.

For example, a 3-column and 2-row layout can display six PDF pages on one sheet. A 4-column and 3-row layout can display twelve pages.

The application calculates the number of panels that fit on each sheet by multiplying the selected columns by the selected rows. It then determines how many sheets are needed for all selected pages.

The following function from the actual application calculates the sheet dimensions based on the selected paper size and orientation:

```js title="script.js"
function sheetSize(o) {
  var p = PAPERS[o.paper] || PAPERS.a4;
  var a = Math.min(p[0], p[1]);
  var b = Math.max(p[0], p[1]);

  return o.orient === 'portrait' ? [a, b] : [b, a];
}
```

The `PAPERS` object contains the dimensions for each supported paper format. The function retrieves the selected dimensions and arranges them according to the chosen orientation.

For portrait orientation, the shorter dimension becomes the width and the longer dimension becomes the height. For landscape orientation, these dimensions are reversed.

The layout calculation then uses the selected rows and columns to determine the number of panels per sheet:

```js title="script.js"
var per = o.cols * o.rows;
var sheets = Math.max(1, Math.ceil(list.length / per));
```

Here, `per` represents the number of panels on one sheet. The `Math.ceil()` function rounds up the total number of required sheets so that any remaining pages are placed on an additional sheet.

The layout engine also calculates the available space and positions each panel so that the pages fit within the selected sheet dimensions.

When more pages are selected than can fit on one sheet, the remaining panels are placed on additional sheets.

![PDF Storyboard Generator board settings for choosing layout, columns, rows, paper size, and orientation.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6f6ef0dd-5d4b-40db-adfb-265687c4c576.png)

---

## Selecting PDF Pages and Their Order

Users don't always need every page in the original PDF.

The tool supports using all pages, selecting a page range, or entering a custom page sequence.

For example, a user could enter:

```plaintext
1-4, 9, 6
```

This creates a storyboard using pages 1, 2, 3, 4, 9, and 6 in that exact order.

The application uses the `parseList()` function to process the custom page selection and check whether the requested page numbers are valid.

Here is the actual implementation from the application:

```js :collapsed-lines title="script.js"
function parseList(text) {
  var t = String(text || '').trim();

  if (!t) {
    return { error: 'Type the pages, for example 1-4, 7, 5.' };
  }

  var out = [], parts = t.split(/[,;\s]+/).filter(Boolean);

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i],
      m = /^(\d+)(?:\s*[-–]\s*(\d*))?$/.exec(part);

    if (!m) {
      return { error: '"' + part + '" isn\'t a page number or range.' };
    }

    var a = parseInt(m[1], 10),
      b = m[2] === undefined
        ? a
        : (m[2] === '' ? state.count : parseInt(m[2], 10));

    if (a < 1) {
      return { error: 'Pages start at 1, so "' + part + '" doesn\'t work.' };
    }

    if (b < a) {
      return { error: '"' + part + '" is backwards. Did you mean ' + b + '-' + a + '?' };
    }

    if (a > state.count) {
      return {
        error: 'Page ' + a + ' is past the end; this PDF has ' +
          plural(state.count, 'page', 'pages') + '.'
      };
    }

    if (b > state.count) {
      return {
        error: 'Page ' + b + ' is past the end. Type ' + a +
          '- to go to the last page.'
      };
    }

    for (var n = a; n <= b; n++) {
      out.push(n);
    }
  }

  if (out.length > 500) {
    return { error: 'That\'s ' + out.length + ' panels. Use 500 or fewer.' };
  }

  return { pages: out };
}
```

The function first converts the input into a trimmed string. It then splits the selection using commas, semicolons, or spaces.

The regular expression checks whether each entry is a single page number or a page range. For example, `3` represents page 3, while `2-5` represents pages 2 through 5. The function also supports an open-ended range such as `4-`. In this case, the application uses `state.count` as the final page number.

Before adding pages to the result, it checks that page numbers start at 1, ranges are in ascending order, and no requested page exceeds the total number of pages in the PDF.

The application also limits custom selections to 500 panels. If the input is valid, the function returns an array of page numbers in the exact order entered by the user.

The `panels()` function then uses this result when building the storyboard. If the user selects all pages instead of entering a custom list, it returns every page in the original order.

This feature is helpful when creating a storyboard from selected scenes or important slides without including the entire PDF.

---

## Adding Panel Labels

Panel labels help users identify individual pages when reviewing or discussing a storyboard.

The application supports different label styles, including numbers, scene labels, original PDF page numbers, and no labels.

For example, a storyboard could display:

- 1, 2, 3, 4
- Scene 1, Scene 2, Scene 3
- Page 5, Page 6, Page 7

Users can select their preferred label style from the Panel label setting.

The application uses the `labelFor()` function to generate the appropriate label for each panel:

```js title="script.js"
function labelFor(o, idx, n) {
  if (o.label === 'panel') {
    return String(idx + 1);
  }

  if (o.label === 'page') {
    return 'Page ' + n;
  }

  if (o.label === 'scene') {
    return 'Scene ' + (idx + 1);
  }

  return '';
}
```

The function accepts three parameters:

- `o` contains the storyboard settings, including the selected label style.
- `idx` represents the panel's position in the selected storyboard sequence. It starts at 0.
- `n` represents the original PDF page number.

When the user selects the panel number option, `idx + 1` generates labels such as 1, 2, and 3. When the user selects the page number option, the function uses `n` to display the original PDF page number. This is useful when the storyboard contains selected pages in a custom order.

For the scene label option, the function generates labels such as Scene 1, Scene 2, and Scene 3. If the user selects No label, it returns an empty string.

The drawing function uses this result when rendering each panel on the storyboard sheet. This helps users identify individual panels without changing the original PDF pages.

---

## Drawing the Storyboard Sheet

Once the layout has been calculated, the application draws the storyboard sheet on an HTML canvas.

The drawing process places each selected PDF page inside its calculated panel area. It then adds panel labels and captions according to the user's settings.

The actual application uses the asynchronous `drawSheet()` function for this process. The following excerpt shows how it prepares the sheet and selects the pages that belong on it:

```js title="script.js"
async function drawSheet(ctx, o, list, L, sheetIdx, k, mode, getPic) {
  var C = COLORS[o.colors] || COLORS.paper;
  var W = L.W * k;
  var H = L.H * k;
  var token = state.loadToken;
  var drawn = [];

  ctx.save();
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
  ctx.textBaseline = 'alphabetic';

  var start = sheetIdx * L.per;
  var items = list.slice(start, start + L.per);
  // ...
}
```

The function receives the canvas context, storyboard settings, selected page list, calculated layout, sheet index, and rendering scale.

It first selects the sheet colors and paints the background. The `start` variable determines the first panel on the current sheet, while `items` contains the PDF pages assigned to that sheet.

The following excerpt shows how the application fits each PDF page inside its panel and retrieves its rendered image:

```js :collapsed-lines title="script.js"
for (var i = 0; i < items.length; i++) {
  var cell = L.cells[i], n = items[i], idx = start + i;
  var area = cell.img;
  var strip = o.layout === 'strip';

  if (strip) {
    ctx.fillStyle = C.bandMat;
    ctx.fillRect(
      area.x * k, area.y * k,
      area.w * k, area.h * k
    );
  } else if (o.frame) {
    ctx.fillStyle = C.mat;
    ctx.fillRect(
      area.x * k, area.y * k,
      area.w * k, area.h * k
    );
  }

  var inset = strip ? 0 :
    o.frame ? Math.min(area.w, area.h) * 0.04 : 0;

  var pr = fitPage(n, area, inset);

  var px = {
    x: Math.round(pr.x * k),
    y: Math.round(pr.y * k),
    w: Math.max(1, Math.round(pr.w * k)),
    h: Math.max(1, Math.round(pr.h * k))
  };

  drawn.push({ n: n, rect: pr });

  if (mode === 'overlay') {
    ctx.clearRect(px.x, px.y, px.w, px.h);
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(px.x, px.y, px.w, px.h);

    var pic = getPic ? await getPic(n, px.w, px.h) : null;

    if (token !== state.loadToken) {
      ctx.restore();
      return null;
    }

    if (pic) {
      ctx.drawImage(pic, px.x, px.y, px.w, px.h);
    }
  }
}
```

The `fitPage()` function calculates the position and dimensions needed to fit the original PDF page inside the panel without changing its proportions.

The application then uses `getPic()` to retrieve the rendered page image. If the image is available, `drawImage()` places it on the storyboard canvas.

The function also supports an overlay mode, which leaves the page picture areas transparent. This is useful when exporting PDFs while preserving the original PDF page content.

### Drawing Panel Labels and Captions

After positioning the page previews, the application draws the panel labels and captions.

The following excerpt from the actual `drawSheet()` function shows how panel labels and captions are drawn on the canvas:

```js :collapsed-lines title="script.js"
var t = cell.text;
var fs = cell.fs * k;
var lh = cell.lh * k;
var y = t.y * k + fs;

var label = labelFor(o, idx, n);
ctx.textAlign = 'left';

if (label) {
  ctx.font = '700 ' + fs + 'px ' + FONTS.mono;
  ctx.fillStyle = C.ink;
  ctx.fillText(label, t.x * k, y);
  y += lh * 1.05;
}

var lines = [];

if (o.captions && captionFor(n)) {
  ctx.font = '400 ' + fs + 'px ' + FONTS[o.font];
  ctx.fillStyle = C.ink;

  var maxL = cell.notes
    ? Math.max(1, Math.floor(
      (t.y * k + t.h * k - y + lh - fs) / lh
    ))
    : o.lines;

  lines = wrap(
    ctx,
    captionFor(n),
    t.w * k,
    Math.min(maxL, cell.notes ? 40 : o.lines)
  );

  lines.forEach(function (ln, j) {
    ctx.fillText(ln, t.x * k, y + j * lh);
  });
}
```

The `labelFor()` function generates the selected panel label. The application then uses `fillText()` to draw it on the canvas.

If captions are enabled and a caption exists, the application uses `captionFor()` to retrieve it. The `wrap()` function breaks the caption into lines that fit within the available panel space.

For the Panels with notes layout, the application also draws ruled lines below the caption area. This provides additional writing space for users.

The drawing process combines the original PDF page previews with the labels, captions, frames, and other selected settings to create the completed storyboard sheet.

![Live PDF storyboard preview showing multiple page panels arranged on an A4 landscape sheet.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/4acf38c9-c401-4e11-86d9-cdf62bb67912.png)

---

## Updating the Live Preview

One of the most useful features is the live preview. Users can change the layout, paper size, orientation, captions, font, spacing, and other settings without creating a new PDF every time.

The application uses the `board()` function to calculate the current storyboard configuration before drawing the preview.

Here's the actual implementation:

```js title="script.js"
function board() {
  var sel = panels();

  if (sel.error) {
    return { error: sel.error };
  }

  var L = layout(state.opts, sel.pages);

  return {
    list: sel.pages,
    L: L
  };
}
```

The function first calls `panels()` to retrieve the selected PDF pages. If the selection contains an error, it returns that error instead of continuing.

Next, it calls `layout()` with the current storyboard settings and selected pages. The layout function calculates how the pages should be arranged on the storyboard sheets.

Finally, `board()` returns an object containing the selected page list and the calculated layout. The `drawPreview()` function uses this information to render the selected sheet onto a temporary canvas.

Once drawing is complete, the result is copied to the visible preview canvas. The application also updates the sheet counter, such as `Sheet 1 of 3`, and enables or disables the Previous and Next buttons depending on the current position.

This allows users to move between storyboard sheets and review their changes before downloading the result.

---

## Adjusting Caption Appearance

Captions help explain what's happening on each page.

The application provides options for enabling captions, selecting a font, changing text size, and controlling the number of caption lines.

Users can also choose whether to display panel frames and sheet numbers.

These settings are stored in `state.opts`. The `syncPanel()` function updates the settings controls to match the current application state.

Here's the actual implementation:

```js title="script.js"
function syncPanel() {
  var o = state.opts;

  ['layout', 'cols', 'rows', 'paper', 'orient', 'label',
    'lines', 'tsize', 'font', 'colors'].forEach(function (f) {
      q('[data-field="' + f + '"]').value = String(o[f]);
    });

  q('[data-field="captions"]').checked = o.captions;
  q('[data-field="frame"]').checked = o.frame;
  q('[data-field="numbers"]').checked = o.numbers;

  q('[data-field="gap"]').value = String(o.gap);
  q('[data-out="gap-val"]').textContent = o.gap + ' mm';

  q('[data-field="pages"]').value = state.pages;

  if (document.activeElement !== q('[data-field="title"]')) {
    q('[data-field="title"]').value = state.title;
  }

  var strip = o.layout === 'strip';

  q('[data-out="cols-label"]').textContent =
    strip ? 'Frames per strip' : 'Columns';

  q('[data-out="rows-label"]').textContent =
    strip ? 'Strips per sheet' : 'Rows';

  q('[data-field="lines"]').disabled =
    !o.captions || o.layout === 'notes';

  q('[data-field="frame"]').disabled = strip;

  ui.listWrap.hidden = state.pages !== 'list';
}
```

The function reads the current options from `state.opts` and updates the corresponding controls. For example, it sets the selected font, text size, caption line count, and paper settings.

It also handles layout-specific controls. In Film strip mode, the columns and rows labels change to Frames per strip and Strips per sheet. The caption-line control is disabled when captions are turned off or when the Panels with notes layout is selected.

### Fitting Captions Inside Panels

Long captions need to fit inside the available panel space. The application uses a `wrap()` helper to divide text into lines based on the available canvas width.

Here's how the actual drawing code uses that helper:

```js title="script.js"
if (o.captions && captionFor(n)) {
  ctx.font = '400 ' + fs + 'px ' + FONTS[o.font];
  ctx.fillStyle = C.ink;

  var maxL = cell.notes
    ? Math.max(1, Math.floor(
      (t.y * k + t.h * k - y + lh - fs) / lh
    ))
    : o.lines;

  lines = wrap(
    ctx,
    captionFor(n),
    t.w * k,
    Math.min(maxL, cell.notes ? 40 : o.lines)
  );

  lines.forEach(function (ln, j) {
    ctx.fillText(ln, t.x * k, y + j * lh);
  });
}
```

The application selects the font using `FONTS[o.font]` and calculates the available number of caption lines based on the panel layout.

For regular layouts, the selected `o.lines` setting controls the maximum number of lines. For Panels with notes, the available space determines how many lines can be displayed.

The `wrap()` function breaks the caption into lines that fit the available width. The `fillText()` method then draws each line onto the canvas.

When there isn't enough space for the selected caption settings, the preview displays a warning suggesting fewer caption lines, fewer rows, or a smaller text size.

The application also supports panel frames and sheet numbers. These options are stored in the application state and applied when the storyboard is drawn.

This gives users control over the appearance and readability of their storyboard captions without changing the original PDF.

---

## Navigating Between Storyboard Sheets

A large PDF may require several storyboard sheets.

The application provides Previous and Next controls so users can review each sheet individually. It also displays the current sheet number and the total number of sheets.

The selected sheet is stored in `state.sheet`. The application uses this value to determine which storyboard sheet should be displayed.

### Handling the Previous and Next Buttons

The application handles sheet navigation inside its main click event listener. Here's the actual implementation:

```js title="script.js"
case 'sheet-prev':
  if (state.sheet > 0) {
    state.sheet--;
    drawPreview();
  }
  break;

case 'sheet-next':
  state.sheet++;
  drawPreview();
  break;
```

When the user clicks Previous, the application checks whether the current sheet number is greater than zero. If it is, `state.sheet` is decreased by one and `drawPreview()` refreshes the displayed sheet.

When the user clicks Next, the sheet number is increased and the preview is refreshed.

The application also prevents users from moving beyond the available sheets. Inside `drawPreview()`, it checks the current sheet position and disables the navigation buttons when necessary:

```js title="script.js"
state.sheet = clamp(state.sheet, 0, L.sheets - 1);

ui.sheetPos.textContent =
  'Sheet ' + (state.sheet + 1) + ' of ' + L.sheets;

q('[data-act="sheet-prev"]').disabled = state.sheet <= 0;
q('[data-act="sheet-next"]').disabled =
  state.sheet >= L.sheets - 1;
```

The `clamp()` function keeps the selected sheet within the valid range. The sheet counter displays the current position, starting from 1, and the total number of sheets.

The Previous button is disabled on the first sheet, while the Next button is disabled on the last sheet. This makes it easier to review large documents without displaying every storyboard sheet at once.

---

## Reading Scanned Pages with OCR

Some PDF documents contain selectable text, while others contain scanned images of printed pages.

PDF.js can extract text from pages containing actual text data. But it can't directly extract words from a scanned page that contains only an image.

To handle these pages, the application provides an optional OCR feature using Tesseract.js.

When users select Read scanned pages with OCR, the application identifies scanned pages that don't already have captions and processes them using the OCR engine.

### Loading Tesseract.js When Needed

The application loads Tesseract.js only when the user requests OCR. It first checks whether the library is already available and reuses an existing loading promise if the script is still being loaded.

Here's the actual `loadTesseract()` implementation:

```js title="script.js"
var tessPromise = null;

function loadTesseract() {
  if (window.Tesseract) {
    return Promise.resolve(window.Tesseract);
  }

  if (tessPromise) {
    return tessPromise;
  }

  tessPromise = new Promise(function (resolve, reject) {
    var s = document.createElement('script');
    s.src = TESS + 'tesseract.min.js';
    s.async = true;

    s.onload = function () {
      if (window.Tesseract) {
        resolve(window.Tesseract);
      } else {
        tessPromise = null;
        reject(new Error('engine'));
      }
    };

    s.onerror = function () {
      tessPromise = null;
      reject(new Error('engine'));
    };

    document.head.appendChild(s);

    setTimeout(function () {
      reject(new Error('engine'));
    }, 45000);
  });

  return tessPromise;
}
```

The function checks `window.Tesseract` to see whether the OCR library is already available. If it is, the function returns it immediately.

If the library is still loading, the existing `tessPromise` is returned instead of creating another script request.

Otherwise, the application creates a script element, sets its source to the Tesseract.js library, and adds it to the document. The `onload` and `onerror` handlers detect whether loading succeeds or fails.

### Creating the OCR Worker

After the library loads, the application creates a Tesseract worker configured for English text recognition.

The following excerpt comes from the actual `runOcr()` function:

```js title="script.js"
var T = await loadTesseract();
checkCancel();

var w = await T.createWorker('eng', 1, {
  workerPath: TESS + 'worker.min.js',
  corePath: TESS_CORE,
  logger: function (m) {
    if (!m || token !== state.loadToken || !state.busy) {
      return;
    }

    if (/loading language/i.test(m.status)) {
      setProgress(
        m.progress || 0,
        'Getting the English language data (first time only)…'
      );
    } else if (/recogniz/i.test(m.status)) {
      setProgress(
        (done + (m.progress || 0)) / list.length,
        'Reading page ' + list[done] +
        ' (' + (done + 1) + ' of ' + list.length + ')…'
      );
    }
  }
});

state.worker = w;
checkCancel();

await w.setParameters({ debug_file: '/dev/null' });
```

The `createWorker()` method initializes the OCR engine with the English language data. The worker and core paths tell Tesseract.js where to load its supporting files.

The logger reports language-loading and text-recognition progress. The application uses this information to update its progress indicator while OCR is running.

### Recognizing Text from Scanned Pages

The application processes each eligible scanned page individually. It renders the page at a higher resolution before sending it to Tesseract.js.

Here's the actual page-processing excerpt from `runOcr()`:

```js title="script.js"
for (; done < list.length; done++) {
  checkCancel();

  var n = list[done],
    page = await state.doc.getPage(n),
    b = page.getViewport({ scale: 1 });

  var c = await renderPage(
    n,
    Math.min(b.width * 300 / 72, 2600),
    Math.min(b.height * 300 / 72, 2600)
  );

  checkCancel();

  var png = await pngBytes(c);
  c.width = 1;

  var res = await w.recognize(png);

  checkCancel();

  if (token !== state.loadToken) {
    return;
  }

  var cap = captionFromText(res.data && res.data.text);

  if (cap && !captionFor(n)) {
    state.captions[n] = cap;

    var ta = ui.grid.querySelector('[data-cap="' + n + '"]');

    if (ta) {
      ta.value = cap;
    }
  }
}
```

The function retrieves each scanned PDF page and calculates its original dimensions. It then renders the page at approximately 300 DPI, with a maximum dimension of 2,600 pixels.

The `pngBytes()` helper converts the rendered canvas into PNG image data. Tesseract.js receives this data through `w.recognize(png)` and returns the recognized text.

The application passes the recognized text to `captionFromText()` to clean and shorten it. If the result is useful and the page still has no caption, the application saves it in `state.captions` and updates the corresponding caption field.

The application also checks for cancellation and verifies that the PDF-loading operation is still current before updating the results.

After processing, the application displays a message asking users to review the generated captions. OCR isn't guaranteed to recognize every word correctly. Image quality, handwriting, unusual fonts, and page orientation can affect the result.

Users should review generated captions before downloading the storyboard.

![PDF Storyboard Generator showing the OCR option for extracting text from scanned PDF pages.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/100aaec2-33a2-440a-956e-79d078692589.png)

---

## Generating the Final Storyboard PDF

Once the user is satisfied with the layout and captions, the application can generate the final PDF.

This process uses PDF-lib to create a new PDF document. The application creates one output page for each storyboard sheet. It then places the original PDF pages inside their calculated panel positions and adds the storyboard's titles, labels, and captions.

### Creating the PDF Document

The actual application uses the `exportPdf()` function to generate the storyboard. It first creates a new PDF document and checks whether the original PDF pages can be embedded as vector content.

Here's the first part of the actual implementation:

```js :collapsed-lines title="script.js"
async function exportPdf(snap, token) {
  await engine();

  var PL = window.PDFLib,
    L = snap.L,
    o = snap.o,
    list = snap.list;

  var out = await PL.PDFDocument.create(),
    src = null,
    embedded = {};

  if (state.vector) {
    try {
      src = await PL.PDFDocument.load(
        state.bytes.slice(0),
        { updateMetadata: false }
      );
    } catch (e) {
      src = null;
    }
  }

  var k = exportScale(L, 300, 14e6);

  for (var s = 0; s < L.sheets; s++) {
    checkCancel();

    if (token !== state.loadToken) {
      return;
    }

    setProgress(
      s / L.sheets,
      'Making sheet ' + (s + 1) + ' of ' + L.sheets + '…'
    );

    var page = out.addPage([L.W, L.H]);
    var c = document.createElement('canvas');

    c.width = Math.round(L.W * k);
    c.height = Math.round(L.H * k);

    var drawn = await drawSheet(
      c.getContext('2d'),
      o,
      list,
      L,
      s,
      k,
      'overlay',
      null
    );

    if (!drawn) {
      return;
    }
    // ...
  }
  // ...
}
```

The function first waits for the required PDF libraries using `engine()`. It then creates a new PDF document with `PDFDocument.create()`.

The `snap` parameter contains a snapshot of the selected layout, options, and page list. The application uses these values so the export follows the settings selected by the user.

The `state.vector` check determines whether the original PDF can be loaded through PDF-lib for vector embedding. The application also calculates a rendering scale targeting 300 DPI, subject to a maximum pixel limit.

The loop creates one output PDF page for every storyboard sheet. It also calls `drawSheet()` in `overlay` mode to prepare the titles, panel labels, and captions that will be placed over the original PDF pages.

### Preserving Original PDF Pages

When vector embedding is available, the application embeds the original PDF pages rather than converting them into ordinary images.

The following excerpt shows how it handles each selected panel:

```js :collapsed-lines title="script.js"
for (var i = 0; i < drawn.length; i++) {
  checkCancel();

  var d = drawn[i],
    r = d.rect,
    yb = L.H - r.y - r.h;

  page.drawRectangle({
    x: r.x,
    y: yb,
    width: r.w,
    height: r.h,
    color: PL.rgb(1, 1, 1)
  });

  if (src) {
    var sp = src.getPage(d.n - 1);

    if (!embedded[d.n]) {
      var cb = sp.getCropBox();

      embedded[d.n] = await out.embedPage(sp, {
        left: cb.x,
        bottom: cb.y,
        right: cb.x + cb.width,
        top: cb.y + cb.height
      });
    }

    var em = embedded[d.n],
      rot = ((sp.getRotation().angle % 360) + 360) % 360;

    var turned = rot === 90 || rot === 270,
      sx = r.w / (turned ? em.height : em.width);

    var ew = em.width * sx,
      eh = em.height * sx,
      at = { x: r.x, y: yb };

    if (rot === 90) {
      at = { x: r.x, y: yb + ew };
    } else if (rot === 180) {
      at = { x: r.x + ew, y: yb + eh };
    } else if (rot === 270) {
      at = { x: r.x + eh, y: yb };
    }

    page.drawPage(em, {
      x: at.x,
      y: at.y,
      width: ew,
      height: eh,
      rotate: PL.degrees(-rot)
    });
  }
  // ...
}
```

The application retrieves the original PDF page using its page number. It then uses `embedPage()` to embed that page into the new PDF document.

The `embedded` object caches embedded pages so the same original page doesn't need to be embedded repeatedly.

The code also checks the original page rotation and adjusts its position and dimensions before drawing it. This helps preserve the correct orientation when placing pages inside storyboard panels.

### Handling Protected PDFs

If the original PDF can't be embedded as vector content, the application uses a raster fallback.

Here's the actual fallback code:

```js title="script.js"
for (var i = 0; i < drawn.length; i++) {
  // ...
  if (src) {
    // ...
  } else {
    var pic = await renderPage(
      d.n,
      r.w * k,
      r.h * k
    );

    var jpg = await new Promise(function (res) {
      pic.toBlob(function (b) {
        b.arrayBuffer().then(function (a) {
          res(new Uint8Array(a));
        });
      }, 'image/jpeg', 0.92);
    });

    pic.width = 1;

    page.drawImage(
      await out.embedJpg(jpg),
      {
        x: r.x,
        y: yb,
        width: r.w,
        height: r.h
      }
    );
  }
}
```

In this case, the application renders the original PDF page onto a canvas and converts it into JPEG image data. PDF-lib then embeds the image inside the corresponding storyboard panel.

This fallback is used when vector embedding is unavailable, including protected PDFs that can't follow the normal vector workflow.

### Adding Captions and Saving the PDF

After the original page images or vector content have been placed, the application adds the storyboard's titles, labels, captions, and other drawing elements as an overlay.

The following excerpt shows how the overlay is added and the final PDF is saved:

```js title="script.js"
var over = await out.embedPng(await pngBytes(c));
c.width = 1;

page.drawImage(over, {
  x: 0,
  y: 0,
  width: L.W,
  height: L.H
});

await nextFrame();
```

After all sheets have been processed, the application checks for cancellation and prepares the final PDF:

```js title="script.js"
checkCancel();

setProgress(1, 'Saving the PDF…');

out.setTitle(state.title || state.base + ' storyboard');
out.setCreator('AllInOneTools PDF Storyboard');
out.setProducer('AllInOneTools (pdf-lib)');

var bytes = await out.save();

if (token !== state.loadToken) {
  return;
}

save(
  new Blob([bytes], { type: 'application/pdf' }),
  state.base + '-storyboard.pdf'
);

toast(
  'Saved ' + plural(L.sheets, 'sheet', 'sheets') +
  ' as ' + state.base + '-storyboard.pdf.'
);
```

The `embedPng()` method adds the storyboard overlay to the PDF page. This overlay contains the titles, panel labels, captions, and other visual elements.

The application then sets the PDF metadata, saves the document as bytes, and creates a downloadable PDF file.

Progress updates and cancellation checks are used throughout the export process, which is particularly helpful when generating storyboards with multiple sheets.

The final PDF combines the original PDF pages with the storyboard layout and captions, ready to download, share, or print.

---

## Downloading PNG Storyboard Sheets

Users who don't need a PDF can choose PNG sheets.

The application renders each complete storyboard sheet as a PNG image at 200 DPI. If the storyboard contains only one sheet, the browser downloads a single PNG file. If it contains multiple sheets, the application packages them into a ZIP archive.

### Exporting the Storyboard as PNG

The application handles PNG exports inside the `exportJob()` function. It first calculates the rendering scale and then processes each storyboard sheet.

The following excerpt shows the actual PNG export implementation:

```js :collapsed-lines title="script.js"
var k = exportScale(L, 200, 16e6),
  files = [];

for (var s = 0; s < L.sheets; s++) {
  checkCancel();

  setProgress(
    s / L.sheets,
    'Drawing sheet ' + (s + 1) + ' of ' + L.sheets + '…'
  );

  var c = document.createElement('canvas');

  c.width = Math.round(L.W * k);
  c.height = Math.round(L.H * k);

  var ok = await drawSheet(
    c.getContext('2d'),
    o,
    list,
    L,
    s,
    k,
    'full',
    function (n, w, h) {
      checkCancel();
      return renderPage(n, w, h);
    }
  );

  if (!ok) { return; }

  files.push({
    name: state.base + '-storyboard-sheet-' +
      pad2(s + 1) + '.png',
    data: await pngBytes(c)
  });

  c.width = 1;
}

if (files.length === 1) {
  save(
    new Blob([files[0].data], { type: 'image/png' }),
    state.base + '-storyboard.png'
  );
} else {
  save(makeZip(files), state.base + '-storyboard-sheets.zip');
}

toast(
  files.length === 1
    ? 'Saved the storyboard as a PNG.'
    : 'Saved ' + files.length + ' sheets as PNG files in a ZIP.'
);
```

The application uses `exportScale()` to calculate a suitable rendering scale for 200 DPI while keeping the canvas within a maximum pixel limit of 16 million pixels.

For every sheet, it creates a canvas and calls `drawSheet()` in `full` mode. This draws the PDF page previews together with the storyboard titles, labels, captions, and other selected settings.

The `pngBytes()` helper converts the completed canvas into PNG data. Each image is added to the `files` array with a filename containing its sheet number.

After processing all sheets, the application checks how many PNG files were generated. A single sheet is downloaded directly as a PNG. Multiple sheets are packaged into a ZIP archive using `makeZip()`.

This format is useful for sharing storyboard previews in presentations, messages, and other applications.

---

## Downloading Individual Page Pictures

The third export option is Page pictures (ZIP).

Unlike the PNG sheets option, this export contains individual pictures of the PDF pages selected for the storyboard.

The application renders each selected page separately and places the resulting PNG files into a ZIP archive.

### Exporting Individual PDF Pages

The actual application handles this option inside the `exportJob()` function. It first creates a unique list of selected pages and then renders each page individually.

Here's the actual implementation:

```js :collapsed-lines title="script.js"
var pages = unique(list),
  out = [];

for (var i = 0; i < pages.length; i++) {
  checkCancel();

  setProgress(
    i / pages.length,
    'Saving page ' + pages[i] +
    ' (' + (i + 1) + ' of ' + pages.length + ')…'
  );

  var pg = await state.doc.getPage(pages[i]),
    vb = pg.getViewport({ scale: 1 }),
    sc = Math.min(
      2,
      Math.sqrt(12e6 / (vb.width * vb.height))
    );

  var pc = await renderPage(
    pages[i],
    vb.width * sc,
    vb.height * sc
  );

  out.push({
    name: 'panel-' +
      pad2(list.indexOf(pages[i]) + 1) +
      '-page-' + pad2(pages[i]) + '.png',
    data: await pngBytes(pc)
  });

  pc.width = 1;
}

save(makeZip(out), state.base + '-panels.zip');

toast(
  'Saved ' +
  plural(out.length, 'page picture', 'page pictures') +
  ' in a ZIP.'
);
```

The function first calls `unique()` to remove duplicate page numbers from the selected list.

It then processes each page individually. The `getPage()` method retrieves the original PDF page, and `getViewport()` obtains its dimensions.

The scale calculation limits the rendering scale to 2 while keeping the rendered page within approximately 12 million pixels. This helps control memory usage when processing large pages.

The `renderPage()` function creates the page image, while `pngBytes()` converts the canvas into PNG data.

Each image is added to the `out` array with a filename containing both its panel position and original PDF page number. This makes it easier to identify the pictures and maintain their storyboard order.

Finally, `makeZip()` packages all the generated PNG images into a ZIP archive, which the browser downloads.

This option is useful when users want to work with individual PDF page pictures rather than complete storyboard sheets.

![Board settings and preview, including the PDF, PNG sheets, and Page pictures download buttons.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/895e4a25-0a30-4402-a728-d4a51fb97b38.png)

![Exported storyboard PDF opened in a PDF viewer.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/bacaaf21-ffb9-476d-abca-9b0a0d8dc537.png)

---

## Performance and Important Considerations

Rendering large PDFs and generating high-resolution images can consume significant browser memory.

The application uses page-preview caching, temporary canvases, progress reporting, and cancellation controls to manage this work.

For better results, use fewer panels per sheet when working with large documents. A3 paper can also provide more room when a storyboard contains many panels.

Remember that layout preferences are remembered on the device, but the PDF and captions remain in the current browser tab. Download your work before closing the tab.

::: info Demo: PDF Storyboard Generator

You can try the finished application here:

[PDF Storyboard Generator – AllInOneTools](https://allinonetools.net/pdf-storyboard-generator/?utm_source=chatgpt.com)

Upload a PDF, arrange its pages, add captions, customize the storyboard, and download the finished result.

:::

---

## Conclusion

Building a PDF Storyboard Generator combines several useful browser technologies into one application.

PDF.js handles PDF loading and page rendering. Tesseract.js provides optional text recognition for scanned pages. PDF-lib creates the final storyboard PDF, while HTML canvas handles previews and image exports.

By connecting these components with JavaScript, we can create a practical tool for organizing presentation slides, comic pages, scripts, and other PDF documents.

The project also demonstrates how browser-based applications can process documents locally without requiring users to upload their files to a server.

With the complete workflow in place, users can turn ordinary PDF pages into organized storyboard sheets that are easier to review, print, and share.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a PDF Storyboard Generator Using JavaScript",
  "desc": "PDF files are commonly used to share presentations, scripts, reports, lesson materials, comic pages, and other visual documents. But reviewing a long PDF page by page can take time, especially when so",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-pdf-storyboard-generator-javascript/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
