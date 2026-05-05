---
lang: en-US
title: "How to Convert Images to PDF in the Browser Using JavaScript – A Step-by-Step Guide"
description: "Article(s) > How to Convert Images to PDF in the Browser Using JavaScript – A Step-by-Step Guide"
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
      content: "Article(s) > How to Convert Images to PDF in the Browser Using JavaScript – A Step-by-Step Guide"
    - property: og:description
      content: "How to Convert Images to PDF in the Browser Using JavaScript – A Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-convert-images-to-pdf-using-javascript.html
prev: /programming/js/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8902fd4f-fcfa-4f7b-8baf-9b595239254f.png
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
  name="How to Convert Images to PDF in the Browser Using JavaScript – A Step-by-Step Guide"
  desc="Whether it’s scanned documents, screenshots, receipts, notes, certificates, or multiple photos, users often need a quick way to combine images into a downloadable PDF. Modern browsers make this much e"
  url="https://freecodecamp.org/news/how-to-convert-images-to-pdf-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8902fd4f-fcfa-4f7b-8baf-9b595239254f.png"/>

Whether it’s scanned documents, screenshots, receipts, notes, certificates, or multiple photos, users often need a quick way to combine images into a downloadable PDF.

Modern browsers make this much easier than before.

Instead of uploading files to a server, we can now process images directly in the browser using JavaScript. This keeps the tool fast, private, and easy to use.

In this tutorial, you’ll build a browser-based Image to PDF converter using JavaScript.

The tool will support uploading multiple images, sorting files, choosing orientation and page size, configuring margins, and merging images into either a single PDF or separate PDF files. Users will also be able to preview and download the generated document directly in the browser.

Everything runs entirely client-side without any backend.

![Convert Images to PDF](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b3742c45-abef-44a6-9703-ee1538fa4c68.png)

---

## How Image to PDF Conversion Works

The browser can't directly combine images into a PDF by itself.

Instead, we'll use a JavaScript PDF library that creates pages, inserts images, and exports everything as a downloadable PDF document.

The process starts when users upload one or multiple images into the browser. JavaScript then reads the image data and prepares it for PDF generation. After that, the tool creates PDF pages, inserts the uploaded images into those pages, and finally exports everything as a downloadable PDF document.

Everything happens locally inside the browser.

This means users don’t need to upload private files to a server, which makes the process faster and more privacy-friendly.

::: note Project Setup

This project is intentionally simple.

You only need:

- an HTML file
- a JavaScript file
- a PDF library

No backend or database is required.

:::

---

## What Library Are We Using?

We’ll use the jsPDF library. It allows us to generate PDF files directly in JavaScript.

Add it using a CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

Once loaded, we can create and export PDF files directly from the browser.

---

## Creating the Upload Interface

Start with a basic upload area:

```html
<input type="file" id="upload" multiple accept="image/*">

<button onclick="convertToPDF()">
  Convert to PDF
</button>
```

This allows users to upload multiple image files and generate the PDF.

Here’s what the upload section looks like inside the tool:

![Image upload interface for browser-based image to PDF converter tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/0d9e3a68-26cd-4b5e-83ed-93149fcffdd1.png)

You can also expand the interface with additional controls for sorting, page settings, margins, and merge modes.

---

## Reading Uploaded Images

After users select files, we need to read them in JavaScript.

We can use `FileReader` for this:

```js
const fileInput = document.getElementById("upload");

const files = fileInput.files;

for (const file of files) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const imageData = e.target.result;

    console.log(imageData);
  };

  reader.readAsDataURL(file);
}
```

This converts uploaded images into readable Base64 data that can later be inserted into the PDF.

---

## Generating the PDF

Now we can create the PDF document.

```js
const { jsPDF } = window.jspdf;

const pdf = new jsPDF();
```

Once the PDF is created, images can be inserted into pages:

```js
pdf.addImage(imageData, "JPEG", 10, 10, 180, 120);
```

This inserts the uploaded image into the PDF page at a specific position and size.

Finally, export the document:

```js
pdf.save("images.pdf");
```

This downloads the generated PDF instantly.

---

## Handling Multiple Images

If users upload multiple files, each image can be added to its own PDF page automatically.

For example:

```js
files.forEach((file, index) => {

  if (index !== 0) {
    pdf.addPage();
  }

});
```

This creates a new page before inserting the next image into the document.

In some situations, users may also want multiple images on the same page instead of one image per page.

For example:

```js
pdf.addImage(img1, "JPEG", 10, 20, 80, 80);

pdf.addImage(img2, "JPEG", 110, 20, 80, 80);
```

This allows more flexible layouts for galleries, reports, or grouped documents.

---

## Configuring PDF Settings

Before generating the final PDF, users can customize several layout and output settings.

These settings improve document quality and give users more control over the generated file.

Here’s what the configuration panel looks like inside the tool:

![allinonetools - image to pdf convertion setting](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c13b5ba4-054b-4698-9ea8-48d932926c91.png)

### Sorting Images

When multiple images are uploaded, organizing them properly becomes important before generating the PDF.

Users may want to sort images alphabetically, reverse the order, or arrange them based on file size.

For example, images can be sorted alphabetically like this:

```js
files.sort((a, b) => a.name.localeCompare(b.name));
```

You can also sort files by size:

```js
files.sort((a, b) => a.size - b.size);
```

Here’s an example of sorting options inside the tool:

![image to pdf convertion image sorting option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/bd834efc-6a70-41be-8597-9cddbb20c5ae.png)

This helps users organize documents more efficiently before converting them into a PDF.

### Choosing Orientation

Different images work better in different page orientations.

Portrait orientation works well for vertical images, while landscape orientation is better for wider images.

For example:

```js
const pdf = new jsPDF({
  orientation: "portrait"
});
```

You can also switch to `"landscape"` when needed.

Here’s an example of orientation options inside the tool:

![image to pdf convertion image orientation option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1c9edb6b-3c15-4246-a060-0834a05493bf.png)

### Selecting Page Size

PDF page size controls the dimensions of the generated document.

For example:

```js
const pdf = new jsPDF({
  unit: "mm",
  format: "a4"
});
```

This creates an A4-sized PDF document using millimeter units.

Other formats like letter, legal, or custom page sizes can also be supported.

Here’s an example of selecting page size options inside the tool:

![image to pdf convertion page size selection option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/72c06be9-12e5-4c55-937a-93420072ae04.png)

### Adding Margins

Margins create spacing between the image and the edges of the page.

Without margins, images may touch the borders and appear cramped.

For example:

```js
const margin = 10;

pdf.addImage(imageData, "JPEG", margin, margin, 180, 120);
```

Here’s an example of margins options inside the tool:

![image to pdf convertion margin selection option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/bd36e4aa-d65c-486f-970e-fdfc283235b7.png)

This creates cleaner spacing around the inserted image.

### Automatic Image Fitting

One common issue when generating PDFs from images is incorrect sizing.

If images are inserted with fixed dimensions, they may stretch, overflow outside the page, or appear distorted.

Instead, it’s better to calculate image dimensions dynamically.

For example:

```js
const pageWidth = pdf.internal.pageSize.getWidth();

const imgWidth = pageWidth - 20;

const imgHeight = (image.height * imgWidth) / image.width;

pdf.addImage(imageData, "JPEG", 10, 10, imgWidth, imgHeight);
```

This automatically scales images proportionally while maintaining margins and layout consistency.

### Merge Options

One useful feature is allowing different output modes.

For example, users may want to merge all uploaded images into a single PDF document when creating reports, notes, or combined files.

In some cases, users may prefer generating separate PDFs for each image instead of combining everything together. This can be useful when exporting individual documents or scanned pages.

Custom grouping is another helpful option because it allows users to combine selected images into multiple PDFs based on their own arrangement or categories.

These different output modes make the tool much more flexible for different real-world use cases.

A simple selection dropdown works well:

```html
<select id="mergeMode">
  <option>Merge all into Single PDF</option>
  <option>Create Separate PDFs</option>
  <option>Custom Grouping</option>
</select>
```

Once selected, JavaScript can apply different generation logic based on the chosen mode.

Here’s an example of merge mode options inside the tool:

![image to pdf convertion image merge option](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/84dfc427-6037-4520-b3e3-accb3d0837db.png)

This makes the tool more flexible for handling different document workflows.

---

## Renaming and Downloading the PDF

After generating the document, users may want to rename the file before downloading.

You can prompt for a filename like this:

```js
const fileName = prompt("Enter PDF name:", "images");

pdf.save(`${fileName}.pdf`);
```

This gives users more control over the exported file.

Here’s an example of the rename popup inside the tool:

![image to pdf convertion rename popup](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6409dfec-8ee5-4437-b7ca-2f78b27323ec.png)

---

## Demo: How the Image to PDF Tool Works

### Step 1: Upload Images

Users upload one or multiple image files into the browser-based tool.

![Image upload interface for browser-based image to PDF converter tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/0d9e3a68-26cd-4b5e-83ed-93149fcffdd1.png)

The tool supports common formats like JPG, PNG, and WEBP.

### Step 2: Configure PDF Settings

Users can customize layout settings before generating the PDF.

![Image to PDF converter settings showing sorting, orientation, page size, margins, and uploaded image previews](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/4cab41c0-ffe7-4f07-9846-649d538628a9.png)

This includes:

- sorting images
- orientation
- page size
- margins
- merge mode

These settings help create cleaner PDF output.

### Step 3: Generate the PDF

Once settings are configured, users click the convert button.

![Convert to PDF button in browser-based image to PDF tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1323e37f-5947-415b-a747-e471b3b5ac53.png)

The browser processes all uploaded images locally and generates the PDF instantly.

### Step 4: Rename the Generated File

Before downloading, users can rename the generated PDF.

![Rename generated PDF popup before downloading the converted file](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/620bfe32-903f-4fce-9228-2afc7f8940eb.png)

This improves organization when exporting multiple documents.

### Step 5: Download the PDF

Finally, the generated PDF becomes available for download directly in the browser.

![PDF preview and download section showing generated image PDF file](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/a1c808d1-4af6-4ca8-9bfc-a6df158e7777.png)

The entire process works without uploading files to any server.

---

## Important Notes from Real-World Use

When working with large images, performance and memory usage become important.

Large images can slow down PDF generation and create unnecessarily large output files.

For example, you can limit upload size before processing:

```js
const MAX_SIZE = 10 * 1024 * 1024;

if (file.size > MAX_SIZE) {
  alert("Image is too large.");
  return;
}
```

Another useful optimization is resizing images before inserting them into the PDF.

For example:

```js
const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");

canvas.width = image.width * 0.5;
canvas.height = image.height * 0.5;

ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

const resizedImage = canvas.toDataURL("image/jpeg", 0.7);
```

This reduces image dimensions and compression quality before generating the PDF.

It also helps reduce memory usage and improves PDF generation speed for large files.

Since everything runs directly inside the browser, uploaded images never leave the user’s device, which improves privacy.

---

## Common Mistakes to Avoid

One common mistake is not validating uploaded files before processing them.

For example, users may upload unsupported formats or attempt to generate a PDF without selecting images.

Always validate input before processing:

```js
if (!fileInput.files.length) {
  alert("Please upload images first.");
  return;
}
```

Another issue is inserting very large images without resizing them first.

Large images can create oversized PDFs and reduce performance significantly.

Incorrect image positioning is also common.

If dimensions are hardcoded incorrectly, images may overflow outside the page or become distorted.

Using dynamic image sizing and margins helps prevent these layout issues.

---

## Conclusion

In this tutorial, you built a browser-based image to PDF converter using JavaScript.

You learned how to upload images, generate PDF documents, configure layout settings, and export files directly inside the browser.

More importantly, you saw how modern browsers can handle document generation locally without relying on a backend server.

This approach keeps the tool fast, private, and easy to use.

Once you understand this workflow, you can extend it further with features like compression, drag-and-drop sorting, watermarking, batch exports, or advanced PDF editing tools.

::: info

You can also try a full working version here:

<SiteInfo
  name="Image to PDF Converter – Convert JPG to PDF | Online & Free"
  desc="Convert JPG to PDF online in seconds. Free image to PDF Converter tool with margin, size, and orientation options. No signup. Fast, secure & private."
  url="https://allinonetools.net/image-to-pdf-converter/"
  logo="https://allinonetools.net"
  preview="https://allinonetools.net/wp-content/uploads/2025/07/assets_task_01k0vjsjjvfv8aa1ts7be64kb1_1753272635_img_0-e1765191892612.webp"/>

:::

And that’s where things start getting really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Convert Images to PDF in the Browser Using JavaScript – A Step-by-Step Guide",
  "desc": "Whether it’s scanned documents, screenshots, receipts, notes, certificates, or multiple photos, users often need a quick way to combine images into a downloadable PDF. Modern browsers make this much e",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-convert-images-to-pdf-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
