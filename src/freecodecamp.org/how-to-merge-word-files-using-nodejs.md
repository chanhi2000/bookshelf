---
lang: en-US
title: "How to Merge Word Files Using NodeJS"
description: "Article(s) > How to Merge Word Files Using NodeJS"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Merge Word Files Using NodeJS"
    - property: og:description
      content: "How to Merge Word Files Using NodeJS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-merge-word-files-using-nodejs.html
prev: /programming/js-node/articles/README.md
date: 2024-10-16
isOriginal: false
author: Vikram Aruchamy
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728997884597/9eb261f8-b299-4f43-bd0d-e2122b2c0c7b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Merge Word Files Using NodeJS"
  desc="Merging Word files is essential for applications like document automation, where multiple reports, proposals, or forms need to be consolidated into a single document. Content management systems also rely on this functionality to combine documents for..."
  url="https://freecodecamp.org/news/how-to-merge-word-files-using-nodejs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728997884597/9eb261f8-b299-4f43-bd0d-e2122b2c0c7b.png"/>

Merging Word files is essential for applications like document automation, where multiple reports, proposals, or forms need to be consolidated into a single document.

Content management systems also rely on this functionality to combine documents for collaborative editing or archival.

[<FontIcon icon="fa-brands fa-node"/>Node.js](https://nodejs.org/en) is a good choice for such tasks because it supports both server-side and client-side operations, allowing for efficient document handling in various environments.

In this tutorial, I'll explain how to [<FontIcon icon="fas fa-globe"/>merge Word documents](https://mergedocs.pro/merge-word-documents) using [web applications developed in Node.js](/freecodecamp.org/how-to-build-an-event-app-with-node-js.md).

::: note Prerequisites

1. <FontIcon icon="fa-brands fa-node"/>Node.js and <FontIcon icon="fa-brands fa-npm"/>npm – Ensure both are installed to manage dependencies.
2. **Libraries** – The following libraries are required:
    - [<FontIcon icon="fa-brands fa-npm"/>`docx-merger`](https://npmjs.com/package/docx-merger) for server-side merging of Word files.
    - [<FontIcon icon="fa-brands fa-npm"/>`mammoth`](https://npmjs.com/package/mammoth) for converting `.docx` to HTML, useful for client-side merging.
    - `html-docx-js` (or a similar library) for converting HTML back to `.docx`.

:::

---

## Method 1: Server-Side Merging Using `docx-merger`

[<FontIcon icon="fa-brands fa-npm"/>`docx-merger`](https://npmjs.com/package/docx-merger) is a specialized [Node.js](/freecodecamp.org/node-js-basics.md) library designed to merge multiple `.docx` files by directly combining their content, including text, tables, and other common elements, into a single cohesive document. It’s particularly useful when you need to retain the original structure and formatting across merged documents.

Here’s how the docx-merger works and why it’s effective for server side merging:

- **Direct Merging of** `.docx` Elements: `docx-merger` reads the underlying XML structure of each `.docx` file and combines them at the document level. This preserves the layout, styles, headers, footers, and even complex structures like tables and images, so the output maintains the appearance of the original files.
- **Configurable Merging Options**: The library offers flexibility in merging. You can specify whether to combine entire documents or selectively merge specific sections. This is particularly useful for use cases where only parts of the documents need to be merged, such as appending summaries, adding title pages, or combining sections from multiple reports.
- **Handling Embedded Objects**: `docx-merger` supports embedded elements such as images, shapes, and other media. When merging, it retains these objects, ensuring that visual elements aren’t lost or distorted in the output. This is crucial for reports, presentations, and other documents where graphics play a significant role.
- **Simplified API for Integration**: The API for `docx-merger` is straightforward, making it easy to incorporate into Node.js applications. You initialize the library with the documents you want to merge, configure any merging options, and then output the result as a `.docx` file. This ease of use makes it simple to add document merging to existing workflows, whether as a standalone script or as part of a larger document processing pipeline.

Using `docx-merger`, you can efficiently merge large volumes of documents with confidence that their original formatting and content will be preserved, making it an ideal choice for server-side document processing in Node.js.

### Setting Up `docx-merger`

To start, install `docx-merger` via npm:

```sh
npm install docx-merger
```

This library requires no additional setup beyond installation. Once installed, you can import it and initialize a new instance to start merging files.

It works by reading each `.docx` file as a buffer, and then combining them into one output file.

### Merging Files with `docx-merger`:

Follow the below steps to merge docx files using `docx-merge`:

1. First, import `fs` to handle file reading and `docx-merger` for merging.
2. Initialize `docx-merger` with an empty configuration object and an array of file buffers to merge.
3. Use the `.save()` method to merge and [save the resulting file as a buffer](/freecodecamp.org/how-to-read-and-write-files-with-nodejs.md), then write it to disk using `fs.writeFileSync()`.

::: tips Example

```js
const fs = require('fs');

const DocxMerger = require('docx-merger');

const files = [fs.readFileSync('file1.docx'), fs.readFileSync('file2.docx')];

const docxMerger = new DocxMerger({}, files);

docxMerger.save('nodebuffer', (data) => {
  fs.writeFileSync('merged.docx', data);
});
```

:::

This example reads `file1.docx` and `file2.docx` as buffers, merges them, and saves the merged document as `merged.docx`.

### **Use Cases for Server-side Merging:**

Server-side merging with `docx-merger` is ideal for scenarios that require high-volume processing or automation. For example:

1. **Batch Document Processing**: Automating the merging of invoices, reports, or records for large data sets.
2. **Automated Document Workflows**: Consolidating different sections of a document from various sources for workflows like report generation or archival.
3. **Backend Services**: Running in server environments where the user interacts indirectly, such as merging documents through an API or a scheduled backend task.

---

## Method 2: Client-Side Merging with `mammoth` and HTML Conversion

[<FontIcon icon="fa-brands fa-npm"/>`mammoth`](https://npmjs.com/package/mammoth) is a Node.js library that [<FontIcon icon="fas fa-globe"/>converts word files into HTML](https://docstomarkdown.pro/convert-word-to-html/), making it ideal for client-side applications that require real-time document manipulation. This approach is particularly useful for scenarios where users need to edit or combine documents directly in the browser before exporting them.

Here’s what makes `mammoth` a powerful tool for client-side document handling:

- **High-Fidelity** – `.docx` to HTML Conversion: `mammoth` translates `.docx` content into clean, semantic HTML, preserving essential formatting like headings, paragraphs, and lists. This ensures that the converted documents retain their original structure and are easy to manipulate in a web environment.
- **Embedded Image Handling with Base64** – When `mammoth` encounters embedded images in a `.docx` file, it encodes them as Base64 and includes them in `<img>` tags within the HTML output. This allows images to be seamlessly displayed, merged, or manipulated alongside text, making the final document more cohesive and visually accurate when re-exported to `.docx`.
- **Dynamic Document Editing** – Because `mammoth` outputs HTML, it’s easy to add or adjust document content on the client side using JavaScript or client-side frameworks. Users can combine multiple HTML snippets from different `.docx` files, rearrange sections, or even inject new content dynamically, which is valuable for applications that require real-time content customization.
- **Conversion Back to** `.docx` with `html-docx-js` – After creating or editing a document in HTML, you can convert it back into `.docx` format using libraries like `html-docx-js`. This library takes the merged HTML content and generates a downloadable `.docx` file, making it straightforward to return the final document to the user in the original format.

Using `mammoth` for client-side merging offers a flexible, interactive way to manage document content in the browser, with features that support both text and images. Combined with `html-docx-js` or a similar tool, you can build powerful applications that allow users to customize and merge documents on the fly, then export their work as `.docx` files.

### Converting `.docx` to HTML with `mammoth`

First, install `mammoth`:

```sh
npm install mammoth
```

After installation, `mammoth` can be used to convert `.docx` files to HTML, which allows for easy merging of document content, including images, by manipulating the HTML output.

::: tips Example code to convert `.docx` files to HTML:

```js
import mammoth from 'mammoth';

import fs from 'fs';

async function convertDocxToHtml(filePath) {
  const result = await mammoth.convertToHtml({ path: filePath });
  return result.value;
}

async function mergeHtmlFiles() {
  const html1 = await convertDocxToHtml('file1.docx');
  const html2 = await convertDocxToHtml('file2.docx');
  const mergedHtml = html1 + html2;
  return mergedHtml;
}

const mergedHtmlContent = await mergeHtmlFiles();
```

In this example, `convertDocxToHtml` reads a `.docx` file and converts it into HTML format. `mammoth` automatically converts any images in the document into Base64-encoded data URLs, so they can be merged and displayed alongside text.

:::

### Merging HTML with Images and Converting Back to `.docx`:

Once the HTML content is merged, including any Base64-encoded images, you can use [<FontIcon icon="fa-brands fa-npm"/>`html-docx-js`](https://npmjs.com/package/html-docx-js) to convert it back into `.docx` format. This process ensures that both text and images are preserved in the final output.

**Install `html-docx-js`**

```sh
npm install html-docx-js
```

Then, use the library to wrap the merged HTML and convert it back to `.docx`:

```js
import htmlDocx from 'html-docx-js';

import fs from 'fs';

const wrappedHtmlContent = <html><body>${mergedHtmlContent}</body></html>;

const docxBuffer = htmlDocx.asBlob(wrappedHtmlContent);

fs.writeFileSync('merged_with_images.docx', docxBuffer);
```

In this code, the merged HTML content, which contains text and images, is wrapped in a basic HTML structure and then passed to `htmlDocx.asBlob()`. This function generates a `.docx` buffer, retaining both text and images, which is then saved as a `.docx` file on disk.

### Use Cases for Image Handling in Client-Side Merging:

Client-side merging with `mammoth` and `html-docx-js` is useful for:

1. **Real-Time Document Editing**: Interactive applications where users can upload, merge, and download `.docx` files directly within the browser, complete with embedded images.
2. **Collaborative Platforms**: Tools for collaborative document creation, where users need to merge `.docx` files and keep images intact.
3. **Custom Document Generators**: Applications generating documents with both text and images from multiple `.docx` files, such as customized reports, ensuring that all elements are retained in the final output.

This method provides a comprehensive solution for client-side document merging, allowing for flexible handling of rich content in various use cases.

---

## Error Handling and Best Practices

Merging Word files can present several challenges, particularly with formatting and error management. Here are key issues, along with [error handling](/freecodecamp.org/effective-error-handling-in-react-applications.md) tips:

### Common Issues and Error Handling

1. **Layout Inconsistencies**: HTML conversion may lead to unexpected formatting differences when converting back to `.docx`.
2. **Styling Differences**: Custom styles in `.docx` may not translate correctly to HTML, resulting in font and margin discrepancies. Always validate that each file is converted properly, and apply a consistent style sheet to minimize inconsistencies.
3. **Image Formatting**: Base64-encoded images might not render correctly in the final `.docx`, similar to challenges in [<FontIcon icon="fas fa-globe"/>merging PDF files](https://mergedocs.pro/merge-pdf-files). Ensure that all images are properly formatted before the merge, and check for issues during the conversion.

### Best Practices

1. **Consistent Formatting**: Normalize styles across documents using a predefined stylesheet to minimize inconsistencies.
2. **Data Integrity**: Validate that each file is read and converted correctly by checking the output of each conversion.
3. **Encoding and Format Checks**: Confirm all files are in the expected `.docx` format and that Base64 images are correctly formatted to ensure successful conversions.

---

## Conclusion

The two methods for merging Word files with Node.js—using `docx-merger` for server-side merging and `mammoth` with HTML conversion for client-side merging—provide flexibility for various use cases:

**Server-Side Merging (docx-merger):**

- Ideal for batch processing and automated workflows.
- Suitable for high-volume document merging without user interaction.
- Works effectively with frameworks like Express.js and NestJS, allowing seamless integration into backend services for processing multiple files.

**Client-Side Merging (mammoth and HTML Conversion):**

- Best for interactive, real-time applications where users manipulate documents directly.
- Supports dynamic editing and combining of documents in the browser.
- Works well with frameworks like Astro.js, React, or Vue.js, facilitating smooth integration into modern web applications.

To extend this functionality, consider the following steps:

- Integrate these methods into a larger application or web service where users can upload and merge documents directly.
- Optimize performance for high-usage environments by exploring:
  - File caching to reduce redundant processing.
  - Optimizing the conversion process for speed and efficiency.
  - Load balancing for server-side implementations to handle multiple requests.

By following best practices and ensuring robust error handling, you can create a reliable and scalable solution for merging `.docx` files with Node.js.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Merge Word Files Using NodeJS",
  "desc": "Merging Word files is essential for applications like document automation, where multiple reports, proposals, or forms need to be consolidated into a single document. Content management systems also rely on this functionality to combine documents for...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-merge-word-files-using-nodejs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
