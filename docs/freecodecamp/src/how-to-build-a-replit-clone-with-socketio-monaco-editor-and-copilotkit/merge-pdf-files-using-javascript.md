---
lang: en-US
title: "How to Merge PDF Files in the Browser Using JavaScript (Step-by-Step)"
description: "Article(s) > How to Merge PDF Files in the Browser Using JavaScript (Step-by-Step)"
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
      content: "Article(s) > How to Merge PDF Files in the Browser Using JavaScript (Step-by-Step)"
    - property: og:description
      content: "How to Merge PDF Files in the Browser Using JavaScript (Step-by-Step)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/merge-pdf-files-using-javascript.html
prev: /programming/js/articles/README.md
date: 2026-04-23
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/abc987c9-4748-45ac-89da-2bce035c830f.png
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
  name="How to Merge PDF Files in the Browser Using JavaScript (Step-by-Step)"
  desc="Working with PDFs is something almost every developer needs to know how to do. Sometimes you need to combine reports or invoices, or simply merge multiple documents into a single clean file. Most tool"
  url="https://freecodecamp.org/news/merge-pdf-files-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/abc987c9-4748-45ac-89da-2bce035c830f.png"/>

Working with PDFs is something almost every developer needs to know how to do.

Sometimes you need to combine reports or invoices, or simply merge multiple documents into a single clean file.

Most tools that handle this either require installing software or uploading files to a server, which can be slow and not always ideal – especially when dealing with private documents.

But what if you could merge PDFs directly in the browser, without any backend?

That’s exactly what we’ll build in this tutorial.

By the end, you’ll have a fully working browser-based PDF merger. It will allow users to upload files, preview them, reorder documents using drag-and-drop, select specific pages, and download the final merged PDF instantly.

![Browser-based PDF merger tool with drag-and-drop upload interface](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/63f94f41-07a3-4c70-b30d-cd60756efba1.png)

---

## How PDF Merging Works in the Browser

At a high level, merging PDFs means loading multiple PDF files, extracting pages from each, and combining them into a single document.

Traditionally, this process happens on a server. Files are uploaded, processed, and then returned to the user.

But modern JavaScript libraries make it possible to do all of this directly in the browser. Instead of sending files anywhere, the entire process runs locally on the user’s device.

This approach has a few practical advantages. It makes the process faster because there’s no upload time involved. It also improves privacy, since files never leave the user’s system. And from a development perspective, it removes the need for backend processing altogether.

::: note Project Setup

We’ll keep this project simple.

You only need:

- an HTML file
- JavaScript
- a few libraries

No backend required.

:::

---

## What Library Are We Using?

We’ll use two important libraries:

```html
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>
```

- We'll use **pdf-lib** to merge and modify PDFs
- We'll use **pdf.js** to render previews in the browser

This combination is very powerful and commonly used in real projects.

---

## Creating the Upload Interface

Start with a simple drag-and-drop area:

```html
<div id="upload-area">
  <input type="file" id="file-input" multiple accept="application/pdf">
</div>
```

Users can either drag files or click to select.

Once files are selected, we read them using:

```js
const arrayBuffer = await file.arrayBuffer();
```

This allows us to pass the file into our PDF libraries.

---

## Rendering PDF Previews

To improve usability, we'll show a preview of each uploaded PDF.

Using <VPIcon icon="fa-brands fa-js"/>`pdf.js`, we can render pages like this:

```js title="pdf.js"
const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
const page = await pdf.getPage(1);

const viewport = page.getViewport({ scale: 1.5 });
canvas.height = viewport.height;
canvas.width = viewport.width;

page.render({
  canvasContext: context,
  viewport: viewport
});
```

This gives users visual feedback before merging.

---

## Reordering Files (Drag and Drop)

Order matters when merging PDFs.

Instead of forcing users to upload in sequence, we'll allow reordering.

We can use a library like <VPIcon icon="fa-brands fa-js"/>`Sortable.js` for this:

```js Sortable.js"
new Sortable(document.getElementById('pdf-grid'), {
  animation: 150
});
```

This enables drag-and-drop sorting and instant visual updates.

---

## Sorting and Reordering PDFs (Important)

This is where the tool becomes more practical in real-world use.

Instead of forcing users to upload files in a specific order, the tool allows them to rearrange PDFs before merging.

Users can manually drag and drop files to adjust the sequence, or use built-in sorting options such as arranging files alphabetically or by file size. This makes it easy to quickly organize multiple documents without re-uploading them.

This flexibility ensures that the final merged document follows the exact order the user needs. In real-world scenarios, this is especially useful when combining reports, invoices, or other documents where sequence is important.

Here’s a simple example of how you might sort uploaded files:

```js
function sortFiles(files, type) {
  return files.sort((a, b) => {
    if (type === "name-asc") {
      return a.name.localeCompare(b.name);
    }

    if (type === "name-desc") {
      return b.name.localeCompare(a.name);
    }

    if (type === "size-asc") {
      return a.size - b.size;
    }

    if (type === "size-desc") {
      return b.size - a.size;
    }

    return 0;
  });
}
```

This allows precise control over what gets merged.

---

## Merging PDFs Using JavaScript

Now comes the core logic. We'll use **pdf-lib** to combine pages:

```js
const { PDFDocument } = PDFLib;

const mergedPdf = await PDFDocument.create();

for (const file of files) {
  const pdf = await PDFDocument.load(file.arrayBuffer);
  const pages = await mergedPdf.copyPages(pdf, selectedPages);

  pages.forEach(page => mergedPdf.addPage(page));
}

const pdfBytes = await mergedPdf.save();
```

Finally, we'll create a downloadable file:

```js
const blob = new Blob([pdfBytes], { type: 'application/pdf' });
```

---

## Improving User Experience

A simple merge tool works, but a good tool feels smooth.

Small improvements make a big difference.

For example:

- showing previews before merging
- allowing users to remove files
- enabling page navigation
- providing instant feedback

These details turn a basic feature into a real product.

---

## Demo: How the PDF Merger Works

Here’s how the full flow looks in practice:

### Step 1: Upload PDFs

![PDF merger tool interface showing drag and drop upload area with select files button](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f7b544ed-e1df-40c2-a2bd-c9245850d7b5.png)

Users can drag and drop PDF files into the upload area or select them manually.

### Step 2: Preview Files

![Preview of uploaded PDF files showing document thumbnails and file details before merging](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a60a38b9-d535-4856-afbf-3a9ccb427d2d.png)

Each uploaded file is displayed with a preview as well as pdf files details (name, size, nos of page, and so on), so users can verify the content before merging.

### Step 3: Reorder Files

![PDF sorting options interface showing manual order and sorting by name or file size](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6c93b3da-3857-4760-a64b-87edc739178e.png)

Users can arrange the order of PDFs using drag-and-drop or sorting options as well as manual options. This ensures the final merged document follows the correct sequence.

### Step 4: Merge PDFs

![Merge PDFs button used to combine multiple PDF files into a single document](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/5b8f22ab-ca44-4686-9c3a-647983e6ae08.png)

Once everything is arranged, users can click the merge button to combine all selected PDFs into a single file.

### Step 5: Download the Final PDF

![Merged PDF preview with file details and download button after combining documents](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d55d61d9-ac46-4c22-8f64-885a87d693cc.png)

The merged PDF is generated instantly in the browser, and users can preview , rename, and download it without any server interaction.

---

## Important Notes from Real-World Use

When building tools like a PDF merger, handling large files efficiently becomes important.

If multiple large PDFs are loaded at once, it can slow down the browser or consume too much memory. Instead of processing everything at once, it’s better to handle files step by step.

For example, instead of loading all PDFs together, you can process them one by one:

```js
const { PDFDocument } = PDFLib;

const mergedPdf = await PDFDocument.create();

for (const file of files) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

  pages.forEach(page => mergedPdf.addPage(page));
}
```

This approach keeps memory usage lower and avoids freezing the browser when working with larger files.

You can also improve performance by limiting file size or the number of files users can upload at once. This helps keep the tool responsive even on lower-powered devices.

Another important aspect is privacy. Since everything runs directly in the browser, files are never uploaded to a server. This means sensitive documents stay on the user’s device.

But it’s still important to be transparent about this. In real-world tools, you should clearly mention that all processing happens locally and no files are stored or transmitted.

This client-side approach improves both performance and user trust, especially when working with private or confidential documents.

---

## Common Mistakes to Avoid

A common mistake is skipping validation. If users upload invalid files or empty inputs, the merge process can fail.

Another issue is ignoring page ranges. If parsing is incorrect, users may get unexpected results.

Also, relying on fixed layouts or assumptions can break the experience across different files. Testing with different PDF types is important.

---

## Conclusion

In this tutorial, you built a browser-based PDF merger using JavaScript.

More importantly, you learned how to process files locally in the browser, render previews for better usability, handle user input safely, and manage dynamic document structures when working with PDFs.

This approach removes the need for a backend and keeps everything fast, private, and efficient.

Once you understand this pattern, you can extend it to build more advanced tools. For example, you could create features like PDF splitting, compression, editing, or other document-based utilities using the same core ideas.

And that’s where things start getting really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Merge PDF Files in the Browser Using JavaScript (Step-by-Step)",
  "desc": "Working with PDFs is something almost every developer needs to know how to do. Sometimes you need to combine reports or invoices, or simply merge multiple documents into a single clean file. Most tool",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/merge-pdf-files-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
