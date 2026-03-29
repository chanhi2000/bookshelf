---
lang: en-US
title: "How to Generate PDF Files in the Browser Using JavaScript (With a Real Invoice Example)"
description: "Article(s) > How to Generate PDF Files in the Browser Using JavaScript (With a Real Invoice Example)"
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
      content: "Article(s) > How to Generate PDF Files in the Browser Using JavaScript (With a Real Invoice Example)"
    - property: og:description
      content: "How to Generate PDF Files in the Browser Using JavaScript (With a Real Invoice Example)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-generate-pdf-files-in-the-browser-using-javascript.html
prev: /programming/js/articles/README.md
date: 2026-04-16
isOriginal: false
author:
  - name: Bhavin Sheth
    url: https://freecodecamp.org/news/author/allinonetools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/04433524-106f-4b86-b59d-3436a4a42761.png
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
  name="How to Generate PDF Files in the Browser Using JavaScript (With a Real Invoice Example)"
  desc="Generating PDF files is something most developers eventually need to do. Whether it’s invoices, reports, or downloadable documents, PDFs are still one of the most widely used formats. The usual approa"
  url="https://freecodecamp.org/news/how-to-generate-pdf-files-in-the-browser-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/04433524-106f-4b86-b59d-3436a4a42761.png"/>

Generating PDF files is something most developers eventually need to do. Whether it’s invoices, reports, or downloadable documents, PDFs are still one of the most widely used formats.

The usual approach involves backend services. You send data to a server, generate the file there, and return it to the user. It works, but it adds complexity, latency, and maintenance overhead.

Modern browsers make this much simpler.

In this tutorial, you’ll learn how to generate PDF files directly in the browser using JavaScript. There’s no server involved, no file uploads, and everything happens instantly on the client side.

To make things practical, we’ll build a simple invoice-style PDF generator so you can see how this works in a real-world scenario.

---

## How PDF Generation Works in the Browser

A PDF is essentially a structured document that defines how text and elements are positioned on a page.

Instead of manually constructing that structure, we use a JavaScript library that handles it for us. You pass content into the library, and it generates a downloadable file.

The key advantage here is that everything runs locally. This makes the process faster and avoids sending any data to a server.

::: info Project Setup

This project is intentionally simple.

You only need an HTML file and a JavaScript file. There’s no backend, no API, and no database involved. This keeps the focus on understanding how PDF generation works inside the browser.

:::

---

## What Library Are We Using?

We’ll use **jsPDF**, a lightweight library that allows you to create PDF files directly in JavaScript.

Add it using a CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

---

## Creating the HTML Structure

We’ll start with a simple interface where users can enter invoice data and generate a PDF.

```html
<input type="text" id="title" placeholder="Invoice Title">
<textarea id="content" placeholder="Enter invoice details"></textarea>
<button onclick="generatePDF()">Generate PDF</button>
```

This creates a basic input flow where users can provide the title and content for the PDF.

In real-world applications, this input could include more structured data like customer details, item lists, and pricing. But for this tutorial, we’ll keep things simple and focus on how the PDF generation works.

---

## Adding JavaScript to Generate the PDF

Now we connect the inputs to the PDF logic.

```js :collapsed-lines
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title.trim() && !content.trim()) {
    alert("Please enter valid content before generating the PDF.");
    return;
  }

  const margin = 10;
  let y = 20;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;

  doc.setFontSize(18);

  // ✅ Wrap title
  const titleLines = doc.splitTextToSize(title, maxWidth);
  doc.text(titleLines, margin, y);

  const titleLineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
  y += titleLines.length * titleLineHeight + 5;

  doc.setFontSize(12);

  // ✅ Wrap content
  const lines = doc.splitTextToSize(content, maxWidth);

  const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;

  lines.forEach((line) => {
    // ✅ Page break
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }

    doc.text(line, margin, y);
    y += lineHeight;
  });

  doc.save("invoice.pdf");
}
```

This creates a PDF directly in the browser. It handles long text, maintains proper spacing, and automatically adds new pages if the content exceeds the page height.

---

## How the PDF Is Created

When you initialize jsPDF, it creates a blank document.

Each `text()` call places content at a specific coordinate. This gives you full control over layout, but it also means you need to manage spacing carefully.

Finally, calling `save()` converts everything into a downloadable file.

---

## Handling Dynamic Content (Important)

In real-world use cases like invoices, content length is rarely fixed. If a user enters multiple lines or longer text, it can overflow or go outside the page.

To handle this, you should wrap text based on the page width instead of using fixed values.

```js
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 10;
const maxWidth = pageWidth - margin * 2;

const lines = doc.splitTextToSize(content, maxWidth);
doc.text(lines, margin, 40);
```

This ensures your content wraps properly and fits within the page.

If the content is long, you should also update spacing dynamically:

```js
const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
let y = 40;

lines.forEach((line) => {
  doc.text(line, margin, y);
  y += lineHeight;
});
```

This keeps the layout readable and prevents overlapping when working with dynamic input.

---

## Improving Layout and Spacing

Good layout makes a big difference in how your PDF looks and feels.

Instead of placing everything at fixed positions, you can gradually adjust the Y position as content grows. This helps prevent overlapping and keeps the document visually structured.

For example, instead of hardcoding positions, you can do something like this:

```js
const margin = 10;
let y = 20;

const pageWidth = doc.internal.pageSize.getWidth();
const maxWidth = pageWidth - margin * 2;

doc.setFontSize(18);

// Wrap title
const titleLines = doc.splitTextToSize(title, maxWidth);
doc.text(titleLines, margin, y);

const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
y += titleLines.length * lineHeight + 5;

doc.setFontSize(12);

// Wrap content
const lines = doc.splitTextToSize(content, maxWidth);
doc.text(lines, margin, y);

y += lines.length * lineHeight;
```

Here, the `y` value increases based on actual content height instead of fixed spacing. This ensures consistent spacing between elements and avoids overlapping.

Another important issue is handling long text. If content is too long, it can go outside the page width or overlap with other elements. Instead of using fixed values, you should always calculate width dynamically:

```js
const pageWidth = doc.internal.pageSize.getWidth();
const maxWidth = pageWidth - margin * 2;

const lines = doc.splitTextToSize(content, maxWidth);
doc.text(lines, margin, y);
```

This automatically breaks the text into multiple lines so it fits properly within the page.

Using dynamic spacing and text wrapping together ensures that your layout remains clean and readable, even when the content size changes. This becomes especially important when generating documents like invoices, where multiple sections need consistent alignment.

---

## How to Download the PDF

The download process is handled using the `save()` method:

```js
doc.save("invoice.pdf");
```

This tells the browser to generate the PDF and download it instantly.

You can also customize the file name dynamically based on user input:

```js
const fileName = (title || "document").trim() + ".pdf";
doc.save(fileName);
```

This makes the downloaded file more meaningful instead of always using a fixed name.

Since everything runs in the browser, no server is involved and no data is uploaded. This makes the process fast and keeps user data private.

---

## Important Notes from Real-World Use

When building tools like invoice generators, layout control becomes more important than the logic itself.

In a browser, layouts are flexible. But in a PDF, everything is fixed. That means you need to carefully control spacing, positioning, and readability.

For example, if you add multiple sections without adjusting spacing, content can easily overlap. Instead of using fixed positions, it’s better to update the Y position dynamically as content grows:

```js
let y = 20;

doc.text("Invoice Title", 10, y);
y += 10;

doc.text("Customer Name", 10, y);
y += 10;
```

This ensures each section appears below the previous one without overlapping.

Another common issue is long content. If text is too long, it won’t automatically wrap like it does in HTML. You need to handle this manually using dynamic width:

```js
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 10;
const maxWidth = pageWidth - margin * 2;

const lines = doc.splitTextToSize(content, maxWidth);
doc.text(lines, margin, y);

const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
y += lines.length * lineHeight;
```

This keeps the text readable and ensures it fits within the page.

You also need to think about how screen inputs translate into a fixed-size document. For example, a long description in a textarea may look fine on screen, but in a PDF it needs proper spacing, wrapping, and sometimes even pagination.

### Optimizing PDF Generation Performance

Performance is another important factor. Generating large PDFs with a lot of content can slow down rendering in the browser.

One simple approach is to limit input size:

```js
if (content.length > 2000) {
  alert("Content is too large. Consider splitting it into multiple sections.");
  return;
}
```

Another approach is to split content across multiple pages instead of forcing everything onto one page:

```js
const pageHeight = doc.internal.pageSize.getHeight();
const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;

lines.forEach((line) => {
  if (y > pageHeight - margin) {
    doc.addPage();
    y = margin;
  }

  doc.text(line, margin, y);
  y += lineHeight;
});
```

This ensures large content is handled efficiently without breaking layout or performance.

In real-world tools, small decisions like spacing, wrapping, pagination, and content limits make a big difference in how usable and professional your generated PDFs feel.

---

## Common Mistakes to Avoid

One common issue is skipping validation. If users generate a PDF with empty fields, the result won’t be useful.

To avoid this, always validate input properly and handle whitespace:

```js
if (!title.trim() && !content.trim()) {
  alert("Please enter valid content before generating the PDF.");
  return;
}
```

This ensures users don’t download empty or broken PDFs.

Another mistake is ignoring text overflow. In a browser, text wraps automatically, but in a PDF it does not. Without handling this, long content can overlap or go outside the page.

You can fix this using dynamic text wrapping:

```js
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 10;
const maxWidth = pageWidth - margin * 2;

const lines = doc.splitTextToSize(content, maxWidth);
doc.text(lines, margin, 40);
```

This keeps the content inside the page and improves readability.

A related issue is overlapping content caused by fixed positioning. If you place everything at static coordinates, sections can stack on top of each other.

Instead, update positions dynamically:

```js
let y = 20;

doc.text(title, 10, y);
y += 10;

const lines = doc.splitTextToSize(content, maxWidth);
doc.text(lines, 10, y);

const lineHeight = doc.getLineHeight() / doc.internal.scaleFactor;
y += lines.length * lineHeight;
```

This keeps spacing consistent and prevents layout issues.

Finally, forgetting to load the jsPDF library properly will break the entire feature. If the script is missing or incorrect, the PDF won’t generate at all.

Always make sure the CDN is included correctly:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
```

In practice, most issues come down to proper validation, dynamic spacing, and handling content size correctly. Fixing these early makes your PDF generator much more reliable.

---

## Demo: How the PDF Generator Works

For this example, we’ll generate a simple invoice PDF to demonstrate how this works in a real-world scenario.

### Step 1: Enter Company Details

![Invoice generator form showing company information fields like company name, address, email, phone, and GST details](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/d2c80d01-5632-41b6-a178-0236d5b78ab6.png)

Start by entering your company details such as name, address, contact information, and other identifiers. This data will appear at the top of the generated invoice.

### Step 2: Add Customer Information

![Customer information section with fields for customer name, billing address, shipping address, and contact details](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e5b1ecbc-2a93-41cb-a2e2-fd8841ce972a.png)

Next, fill in the customer details including billing and shipping addresses. This ensures the invoice is correctly assigned.

### Step 3: Enter Invoice Details

![Invoice details form showing invoice number, invoice date, due date, and additional notes fields](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/e3adf212-d1e4-44bc-a629-2ab6cdd68ba4.png)

Provide invoice-specific details such as invoice number, dates, and any additional notes. These values help structure the document properly.

### Step 4: Add Items to the Invoice

![Invoice items section with multiple items, quantity, rate, tax, discount, and total calculation fields](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/1acb5bad-70c3-40bb-95ed-6abb5eec89be.png)

Add the items or services included in the invoice. Each item can include quantity, pricing, tax, and discounts, which are automatically calculated.

### Step 5: Configure Payment and Terms

![Payment and terms section showing payment instructions, QR code option, terms and conditions, and signature fields](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/ca4a893d-9131-4e8d-9dbf-aeaa70a68285.png)

Define payment instructions, terms, and any additional conditions. This section ensures the invoice is complete and ready for real use.

### Step 6: Preview the Generated Invoice

![Live invoice preview displaying company details, customer info, item table, totals, and final invoice layout](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/aa31817f-9e1d-4c74-b719-9e4149da821e.png)

The interface provides a live preview of the invoice so you can review everything before generating the PDF.

### Step 7: Generate and Download the PDF

![Quick stats and action buttons showing total amount, total tax, and generate PDF button](https://cdn.hashnode.com/uploads/covers/6979d22f93bc273cc33971b1/05e56924-f6c1-4033-adf4-3b8ce0070e8d.png)

Finally, click the generate button to create and download the PDF instantly. The file is generated directly in the browser without any server interaction.

---

## Conclusion

In this tutorial, you built a PDF generator using JavaScript that runs entirely in the browser.

More importantly, you learned how to think about building real tools using client-side capabilities. This approach reduces complexity, improves performance, and keeps user data private.

Once you understand this pattern, you can extend it to build more advanced tools like invoice systems, report generators, and document exporters.

And that’s where things start to get really interesting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Generate PDF Files in the Browser Using JavaScript (With a Real Invoice Example)",
  "desc": "Generating PDF files is something most developers eventually need to do. Whether it’s invoices, reports, or downloadable documents, PDFs are still one of the most widely used formats. The usual approa",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-generate-pdf-files-in-the-browser-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
