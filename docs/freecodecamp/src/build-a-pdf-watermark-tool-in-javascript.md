---
lang: en-US
title: "How to Build a Browser-Based PDF Watermark Tool Using JavaScript"
description: "Article(s) > How to Build a Browser-Based PDF Watermark Tool Using JavaScript"
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
      content: "Article(s) > How to Build a Browser-Based PDF Watermark Tool Using JavaScript"
    - property: og:description
      content: "How to Build a Browser-Based PDF Watermark Tool Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-pdf-watermark-tool-in-javascript.html
prev: /programming/js/articles/README.md
date: 2026-05-20
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/7c8f47a5-8f4e-4404-97e8-bdc07a668816.png
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
  name="How to Build a Browser-Based PDF Watermark Tool Using JavaScript"
  desc="PDF watermarks are commonly used for branding, document protection, approvals, confidential files, and internal document tracking. Whether it’s adding a company logo, a “CONFIDENTIAL” label, or a draf"
  url="https://freecodecamp.org/news/build-a-pdf-watermark-tool-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/7c8f47a5-8f4e-4404-97e8-bdc07a668816.png"/>

PDF watermarks are commonly used for branding, document protection, approvals, confidential files, and internal document tracking.

Whether it’s adding a company logo, a “CONFIDENTIAL” label, or a draft watermark, users often need a quick way to modify PDFs without uploading files to external servers.

Modern browsers make this much easier than before. Instead of sending documents to a backend, we can process PDF files directly inside the browser using JavaScript. This keeps documents private while making the tool fast and easy to use.

In this tutorial, you’ll build a browser-based PDF watermark tool using JavaScript.

The tool will support both text and image watermarks, adjustable opacity, rotation, page selection, positioning controls, and downloadable PDF output directly from the browser.

Everything works entirely client-side without any backend.

---

## How PDF Watermarking Works

A PDF watermark is simply additional text or an image layered on top of an existing PDF page.

In the browser, JavaScript libraries can load PDF pages, modify them visually, and export a new downloadable version.

The process starts when the user uploads a PDF file into the tool. JavaScript then reads the document, loads each page, and applies watermark elements like text or logos on top of the existing content. After positioning and opacity settings are applied, the updated PDF is generated and downloaded directly from the browser.

Everything happens locally inside the browser. This means uploaded documents never leave the user’s device, which improves privacy and security.

::: note Project Setup

This project is intentionally simple. Everything runs directly inside the browser using JavaScript, so no backend server is required.

You only need:

- an HTML file
- a JavaScript file
- a PDF processing library

:::

---

## What Library Are We Using?

We’ll use the PDF-lib library for editing existing PDF documents inside the browser.

Add it using a CDN:

```html
<script src="https://unpkg.com/pdf-lib/dist/pdf-lib.min.js"></script>
```

This library allows us to load PDF files directly in the browser, modify existing pages, insert custom text or image watermarks, and finally export the updated document as a new downloadable PDF.

Because everything runs client-side with JavaScript, users can edit PDFs without uploading files to a server.

---

## How to Create the Upload Interface

Start with a basic upload input:

```html
<input type="file" id="pdfUpload" accept="application/pdf">

<button onclick="addWatermark()">
  Apply Watermark
</button>
```

This allows users to upload PDF files directly from the browser.

The tool also includes watermark settings like text input, image upload, opacity controls, positioning, and page selection.

Here’s what the watermark settings panel looks like inside the tool:

![PDF watermark settings panel with text watermark controls and page selection options](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/6caee349-fe68-436e-b64f-036e5a69920c.png)

---

## How to Add Text Watermarks

Text watermarks are commonly used for labels like “CONFIDENTIAL”, “DRAFT”, or “APPROVED”.

For example:

```js
page.drawText("CONFIDENTIAL", {
  x: 200,
  y: 300,
  size: 48,
  opacity: 0.5
});
```

This inserts watermark text directly onto the PDF page. Users can also customize the appearance of the watermark directly inside the tool.

For text watermarks, users can adjust the font size, change the text color, apply bold or italic styling, control opacity levels, and rotate the watermark at different angles for better visibility and protection.

Here’s an example of text watermark controls inside the tool:

![Text watermark configuration options with font size color opacity and rotation controls](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d67d3ee6-1abb-4c90-965d-a5e56a69468b.png)

---

## How to Add Image Watermarks

Some users may want to apply logos or branded graphics instead of plain text.

For example:

```js
const image = await pdfDoc.embedPng(imageBytes);

page.drawImage(image, {
  x: 180,
  y: 250,
  width: 120,
  height: 120,
  opacity: 0.5
});
```

This inserts an image watermark onto the PDF page.

The tool also supports image scaling controls so users can resize uploaded logos before applying them.

Here’s an example of image watermark settings inside the tool:

![Image watermark configuration panel with upload scale opacity and positioning controls](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c3a799aa-9c08-4cd0-aa0f-5e014838a335.png)

---

## Positioning and Opacity Controls

Watermark placement is important for readability and document appearance.

Users may want centered watermarks, corner positioning, or diagonal overlays depending on the document type.

For example:

```js
page.drawText("CONFIDENTIAL", {
  x: 220,
  y: 250,
  rotate: degrees(45),
  opacity: 0.5
});
```

This creates a rotated semi-transparent watermark.

The tool also allows users to adjust watermark positioning and appearance directly inside the browser.

Users can control the X and Y position, change opacity levels, rotate the watermark at different angles, and quickly move the watermark using directional placement controls.

This makes it easier to place watermarks correctly without manually editing the PDF in external software.

Here’s an example of positioning controls inside the tool:

![PDF watermark positioning controls with opacity rotation and directional placement options](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/376413e0-6876-433d-8370-d87d58dfb935.png)

---

## How to Select Pages to Apply

Not every watermark needs to appear on every page. Some users may only want watermarks on specific pages.

For example:

```js
const selectedPages = [1, 3, 5];
```

The tool allows users to control exactly where the watermark should appear.

For example, a watermark can be applied to every page in the document, only even-numbered pages, only odd-numbered pages, or specific custom page ranges like 1-3,5. This makes the tool more flexible for real-world use cases such as contracts, invoices, reports, certificates, and branded documents..

Here’s an example of page selection options inside the tool:

![Page selection options for applying PDF watermarks to specific pages](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/3dac54ad-8159-4767-8d7d-8336f37f5d2f.png)

---

## How to Generate and Download the Final PDF

Once watermark settings are configured, the browser generates the updated PDF directly inside the browser.

For example:

```js
const pdfBytes = await pdfDoc.save();
```

Then the updated file becomes downloadable:

```js
download(pdfBytes, "watermarked.pdf");
```

This process happens locally without uploading files to external servers.

---

## Demo: How the PDF Watermark Tool Works

For this example, we’ll apply a custom watermark directly inside the browser.

### Step 1: Upload the PDF

Users upload a PDF document into the watermark tool.

![allinonetools pdf tools hub pdf waternark pdf file uplaod](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/b8d163f5-cbe1-4988-be63-a48e9e10aacd.png)

### Step 2: Preview the Uploaded PDF

After uploading the PDF, the tool generates a live preview directly inside the browser.

Users can navigate through pages using the left and right arrow buttons to review the document before applying the watermark.

This page-by-page preview helps users verify the correct file, check page content, and decide where the watermark should appear.

Here’s how the PDF preview section looks inside the tool:

![PDF watermark tool showing uploaded PDF preview with left and right page navigation arrows for browsing document pages.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/4238034f-ef1a-4026-9c1c-41bf5563418c.png)

### Step 3: Configure Watermark Settings

Users can choose between text or image watermark mode.

For text watermarks, users can customize font size, color, opacity, and rotation.

![Custom text watermark settings inside browser-based PDF watermark tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/7c9dabb3-adef-415d-8635-9d5ad4804297.png)

For image watermarks, users can upload a logo and adjust image scale before applying it.

![Image watermark upload and scaling controls inside PDF watermark tool](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/5e2d6874-a9a9-438c-af56-6243c9eca2ac.png)

### Step 4: Position and Apply the Watermark

Users can reposition the watermark visually before generating the final file.

![PDF watermark positioning controls with opacity rotation and directional placement options](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/f47e5ce9-bbe7-44a0-89aa-c2ab41383329.png)

The tool also allows users to control where the watermark should be applied within the document. For example, the watermark can appear on all pages, only even-numbered pages, only odd-numbered pages, or specific custom page ranges.

![Page selection options for applying PDF watermarks to specific pages](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/c630700c-fbf4-4d29-8d84-f982cbc6d0b1.png)

Opacity and rotation controls help improve visibility without blocking important document content.

This gives users more flexibility when watermarking contracts, invoices, reports, certificates, or branded PDFs.

### Step 5: Generate the Watermarked PDF

Once the watermark settings are configured, users can click the generate button to process the document directly inside the browser.

The tool applies the watermark to the selected pages and prepares the updated PDF instantly.

Here’s how the generate PDF button looks inside the tool:

![Generate PDF watermark button inside browser-based PDF watermark tool.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/195433b4-fa2e-46c3-9835-009ec26910a9.png)

### Step 6: Preview and Download the Updated PDF

After processing is complete, the tool displays a live preview of the final watermarked PDF.

Users can review the updated document before downloading it. The interface also shows useful file details such as total pages and final file size.

A rename option is available before downloading the generated PDF.

Here’s an example of the final output preview section:

![Watermarked PDF preview with rename option, download button, total pages, and file size information.](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/ecbf1366-45f0-4262-9f0e-ec8e1df3ed2e.png)

---

## Important Notes from Real-World Use

When working with large PDF documents, performance and rendering speed become important.

Applying watermarks page-by-page is usually more stable than modifying everything simultaneously.

For example:

```js
for (const page of pdfDoc.getPages()) {
  // apply watermark
}
```

Another useful optimization is lowering image watermark size before embedding large logos. This reduces output file size and improves processing speed.

Opacity is also important. Very dark watermarks can make documents difficult to read, especially on printed pages. Keeping watermark opacity between `0.3` and `0.5` usually works well in real-world situations.

Since everything runs locally inside the browser, uploaded documents remain private and never leave the user’s device.

---

## Common Mistakes to Avoid

One common mistake is applying watermarks at full opacity. This can make the document difficult to read.

For example:

```js
opacity: 1
```

Instead, use lower opacity values:

```js
opacity: 0.4
```

Another issue is incorrect watermark positioning. If coordinates are hardcoded incorrectly, the watermark may appear outside the visible page area.

Dynamic positioning usually works better across different page sizes. Large image watermarks can also increase PDF file size significantly. Resizing images before embedding them helps improve performance.

Another common mistake is forgetting to validate uploaded files:

```js
if (!file || file.type !== "application/pdf") {
  alert("Please upload a valid PDF file.");
  return;
}
```

This prevents unsupported files from breaking the tool.

---

## Conclusion

In this tutorial, you built a browser-based PDF watermark tool using JavaScript.

You learned how to upload PDF files, apply text or image watermarks, control positioning and opacity, and generate downloadable PDFs directly inside the browser.

More importantly, you saw how modern browsers can handle document editing tasks locally without relying on a backend server.

This approach keeps the tool fast, private, and easy to use.

::: info

You can also try the live tool here:

<SiteInfo
  name="Add Watermark to PDF Online Free – Secure Your Files"
  desc="Add watermark to PDF files online for free. Protect and brand your PDF documents with text or image watermarks. Fast, secure, and easy watermark tool."
  url="https://allinonetools.net/add-watermark-pdf/"
  logo="https://allinonetools.net/favicon.ico"
  preview="https://allinonetools.net/wp-content/uploads/2025/09/assets_task_01k4chs6m6f6csnf1xbc6c6txr_1757062992_img_0-e1764822756169.webp"/>

:::

Once you understand this workflow, you can extend it further with features like digital signatures, PDF annotations, stamping tools, password protection, or advanced document editing.

And that’s where things start getting really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Browser-Based PDF Watermark Tool Using JavaScript",
  "desc": "PDF watermarks are commonly used for branding, document protection, approvals, confidential files, and internal document tracking. Whether it’s adding a company logo, a “CONFIDENTIAL” label, or a draf",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-pdf-watermark-tool-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
