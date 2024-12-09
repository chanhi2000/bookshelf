---
lang: en-US
title: "How to Merge Multiple Google Docs into One"
description: "Article(s) > How to Merge Multiple Google Docs into One"
icon: iconfont icon-csharp
category:
  - Node.js
  - Google
  - Google Drive
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js-node
  - google
  - google-docs
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Merge Multiple Google Docs into One"
    - property: og:description
      content: "How to Merge Multiple Google Docs into One"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/merge-multiple-google-docs-with-apps-script-or-google-docs-api.html
prev: /programming/js-node/articles/README.md
date: 2024-10-30
isOriginal: false
author: Vikram Aruchamy
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1730115525086/d5d63d7d-a5c0-4e16-868c-50901aebb248.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Drive > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/google-drive/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Merge Multiple Google Docs into One"
  desc="Merging multiple Google Docs into a single document is often essential for compiling reports, gathering information from various sources, or creating unified documents for presentations or sharing. By combining multiple files into one, users can keep..."
  url="https://freecodecamp.org/news/merge-multiple-google-docs-with-apps-script-or-google-docs-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1730115525086/d5d63d7d-a5c0-4e16-868c-50901aebb248.jpeg"/>

Merging multiple Google Docs into a single document is often essential for compiling reports, gathering information from various sources, or creating unified documents for presentations or sharing.

By combining multiple files into one, users can keep information organized, streamline collaboration, and simplify document handling for larger projects or recurring tasks.

But Google Docs lacks a built-in feature for merging multiple documents. This can make this process time-consuming if you’re trying to do it manually.

While there are add-ons available for [<FontIcon icon="fa-brands fa-google"/>merging multiple Google Docs into one](https://workspace.google.com/marketplace/app/merge_docs_pro/61337277026), you can also create your own scripts using Google Apps Script or the Google Docs API for customized solutions. This approach gives you greater flexibility, letting you set up recurring document consolidation and manage high volumes of merges tailored to your specific needs.

In this tutorial, I’ll explain how to merge multiple Google Docs into one document using [<FontIcon icon="iconfont icon-google-apps-script"/>Apps Script](https://developers.google.com/apps-script) or the [<FontIcon icon="fa-brands fa-google-drive"/>Google Docs API](https://developers.google.com/docs/api/reference/rest).

---

## How to Merge Google Docs Using Google Apps Script

Using Google Apps Script to merge multiple Google Docs is a straightforward way to automate document merging directly within Google Workspace.

This approach should work well for you if you need a simple solution that doesn’t require complex setups or external APIs. You can run Apps Script within Google Drive, making it easy to set up and execute directly from the browser.

Below is a step-by-step guide on how to use Google Apps Script for merging documents.

### Step 1: Open Google Apps Script

In Google Drive, click on **New** > **Google Apps Script** to create a new script.

Then name the project something relevant, like “Document Merger.”

### Step 2: Write the Apps Script Code

Copy and paste the following code into the Apps Script editor. This script will create a new Google Doc and append content from each specified document.

```js
function mergeGoogleDocs(docIds) {
  const mergedDoc = DocumentApp.create("Merged Document"); // Creates a new document
  const body = mergedDoc.getBody();

  docIds.forEach(id => {
    const doc = DocumentApp.openById(id);
    const docBody = doc.getBody();

    // Append content of each document to the merged document
    for (let i = 0; i < docBody.getNumChildren(); i++) {
      const element = docBody.getChild(i).copy(); // Copy each element to preserve formatting
      body.appendParagraph(element.getText());
    }
    body.appendPageBreak(); // Add a page break after each document
  });

  Logger.log("Merged Document URL: " + mergedDoc.getUrl());
}

function runMerge() {
  const docIds = [
    'DOCUMENT_ID_1', 
    'DOCUMENT_ID_2', 
    'DOCUMENT_ID_3'
  ]; // Replace with your actual document IDs

  mergeGoogleDocs(docIds);
}
```

::: info Explanation of the Code:

- **Creating the Merged Document**: `DocumentApp.create("Merged Document")` creates a new Google Doc named "Merged Document," which will serve as the destination for all the content.
- **Retrieving and Copying Content**: `DocumentApp.openById(id)` opens each document in `docIds`, then retrieves its body content. The script copies each element, preserving its original formatting, and appends it to the new document.
- **Adding Page Breaks**: `body.appendPageBreak()` adds a page break after each document, helping maintain a clear separation between merged sections.
- **Logging the Merged Document URL**: The final URL of the merged document is logged, allowing you to access it directly from the Apps Script console.

:::

### Step 3: Run the Script

First, you’ll want to save the script and authorize any required permissions.

Then in the Apps Script editor, select `runMerge()` as the function to run. Enter an array of document IDs you want to merge, like `['DOCUMENT_ID_1', 'DOCUMENT_ID_2', 'DOCUMENT_ID_3']`.

Finally, run the script, and it will create a merged document in your Google Drive. The URL will display in the console log.

### How to Customize the Script

**Order of Documents**: The sequence in which documents are merged is controlled by the order of `docIds` in the array. Arrange these document IDs to define the exact order you want in the final document.

This approach is useful for structuring documents such as reports, books, or presentations, ensuring that chapters or sections appear in the intended flow.

**Adding Custom Formatting**: The script can be customized to add specific formatting to each section of the merged document. You can insert headers or footers to distinguish each document, include page breaks, or set up consistent styling for fonts, sizes, and colors.

For example, you can add headers programmatically at the start of each new document in the merge, helping create a cohesive structure.

**Handling Specific Elements**: Apps Script supports detailed customization to merge only certain types of content, like text, images, or tables, while skipping others. You can adjust the script to filter out elements by type or to prioritize specific formats.

For instance, to create a visually appealing document, you might choose to merge only text and images while excluding tables or unsupported elements. This approach provides a more polished final document by focusing on the content types you need most.

### When to Use Google Apps Script for Merging

Google Apps Script is ideal if you want a simple, in-drive solution without needing to set up external API access. It’s especially useful for quick merges or individual projects within Google Workspace, and it provides enough flexibility to handle most standard document formats and structures.

For more complex requirements, such as merging across other platforms or integrating with external tools, consider using the Google Docs API explained in the next section.

---

## How to Merge Google Docs Using the Google Docs API

Combining Google Docs using the Google Docs API allows you to programmatically combine content from multiple documents into one unified file. This is ideal for automating repetitive merges or creating customized documents on demand.

This approach is powerful for users who need precise control over document content, formatting, and layout, making it suitable for larger workflows or integrations within other applications.

Below is a detailed, step-by-step guide on how to use the Google Docs API to merge multiple Google Docs into one.

### Step 1: Enable the Google Docs API

First, go to the [<FontIcon icon="iconfont icon-gcp"/>Google Cloud Console](https://console.cloud.google.com/). Create a new project or select an existing one.

In the API Library, search for "Google Docs API" and enable it for your project.

Next, create OAuth 2.0 credentials by going to **APIs & Services** > **Credentials**. Choose **Create Credentials** > **OAuth client ID** and configure this for a Web Application if you plan to integrate it into Web services.

### Step 2: Install the `googleapis` Client Library

In a Node.js environment, you’ll need the `googleapis` package to interact with the Google Docs API. Install it by running:

```sh
npm install googleapis
```

### Step 3: Write the Script to Merge Google Docs

The following script uses the Google Docs API to create a new document, retrieve content from each source document, and then append this content to the new document.

```js
const { google } = require('googleapis');
const docs = google.docs('v1');

async function mergeGoogleDocs(auth, docIds) {
  // Step 3a: Create a new document that will serve as the merged document
  const newDoc = await docs.documents.create({
    auth,
    requestBody: { title: 'Merged Document' },
  });
  const newDocId = newDoc.data.documentId;

  // Step 3b: Loop through each document ID, retrieving content and appending it to the new document
  for (const docId of docIds) {
    // Retrieve the document's body content
    const doc = await docs.documents.get({
      auth,
      documentId: docId,
    });

    // Prepare each content element as a request for the new document
    const requests = doc.data.body.content.map((element) => ({
      insertText: {
        text: element.paragraph?.elements?.[0]?.textRun?.content || '',
        location: { index: 1 }, // Append to the start of the document, shift with each insertion
      },
    }));

    // Send a batch update request to insert all elements into the new document
    await docs.documents.batchUpdate({
      auth,
      documentId: newDocId,
      requestBody: { requests },
    });
  }

  console.log(`Merged Document URL: https://docs.google.com/document/d/${newDocId}`);
}
```

::: info Explanation of the Code:

1. **Creating the Merged Document**: `docs.documents.create()` creates a new Google Doc titled "Merged Document." This document ID (`newDocId`) will serve as the destination where content from each document is appended.
2. **Retrieving Content**: The `docs.documents.get()` method fetches each document’s content based on its ID. This retrieves all elements from the document body, such as paragraphs, images, and other supported elements.
3. **Preparing Insert Requests**: The `map()` function converts each document element into an `insertText` request. Each request specifies the text and the location in the new document where it should be added.
4. **Appending Text in Sequence**: The `batchUpdate` method takes a set of requests and applies them sequentially to the new document. Here, the location index starts at 1 (the beginning of the document) and shifts with each new insertion to prevent overwriting.

:::

### Step 4: Run the Script

Now you’ll initialize the `auth` variable with [<FontIcon icon="fa-brands fa-google"/>OAuth 2.0 credentials](https://developers.google.com/identity/protocols/oauth2), which authenticates access to the Docs API.

Then you’ll need to call the `mergeGoogleDocs` function, passing the `auth` object and an array of document IDs.

Once the script runs, it will output a URL for the merged document, which you can access directly in Google Docs.

### Customization and Additional Options

- **Order of Insertion**: Control the order in which document content is appended by arranging the document IDs in `docIds`.
- **Formatting**: The Google Docs API can support additional formatting, such as bold or italic text, by modifying the insert requests. This can be achieved with advanced requests using the `updateTextStyle` API method.
- **Element Types**: The script currently handles only text paragraphs. To merge other elements like images or tables, extend the script to support more element types by using conditional checks on the `element` structure.

### When to Use Google Docs API for Merging

The Google Docs API is ideal if you need precise control over document structure, element-specific formatting, and larger-scale automation for merging.

This approach is especially useful when handling complex formatting requirements, such as custom headers, lists, or tables, and allows for seamless integration with external applications or workflows outside Google Workspace.

If you have high-volume merge needs or you’re looking to incorporate merging into broader, automated processes, the Google Docs API provides advanced flexibility and customization options beyond what Google Apps Script can offer.

---

## Conclusion

In conclusion, merging Google Docs is crucial for organizing and streamlining document management. While Google Docs lacks a built-in feature for this, you can leverage Google Apps Script for straightforward automation or the Google Docs API for more advanced, large-scale merging.

For those seeking a user-friendly solution without the need for coding, [<FontIcon icon="fas fa-globe"/>**Merge Docs Pro**](https://mergedocs.pro/) provides an intuitive interface to combine multiple Google Docs into one document. It simplifies document consolidation, enhances collaboration, and saves time, making it an excellent choice if you’re looking to streamline your workflow within Google Workspace.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Merge Multiple Google Docs into One",
  "desc": "Merging multiple Google Docs into a single document is often essential for compiling reports, gathering information from various sources, or creating unified documents for presentations or sharing. By combining multiple files into one, users can keep...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/merge-multiple-google-docs-with-apps-script-or-google-docs-api.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
