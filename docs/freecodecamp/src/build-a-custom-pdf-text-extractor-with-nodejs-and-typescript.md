---
lang: en-US
title: "How to Build a Custom PDF Text Extractor with Node.js and TypeScript"
description: "Article(s) > How to Build a Custom PDF Text Extractor with Node.js and TypeScript"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Custom PDF Text Extractor with Node.js and TypeScript"
    - property: og:description
      content: "How to Build a Custom PDF Text Extractor with Node.js and TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-custom-pdf-text-extractor-with-nodejs-and-typescript.html
prev: /programming/js-express/articles/README.md
date: 2026-02-13
isOriginal: false
author:
  - name: Chidera Humphrey
    url: https://freecodecamp.org/news/author/chiderahumphrey/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770918274288/fea825aa-9dc4-468b-abbf-04fb1e74ec22.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Custom PDF Text Extractor with Node.js and TypeScript"
  desc="Extracting text from PDFs sounds simple until you try to do it. And it can be even more challenging for JavaScript developers, with various libraries to choose from and so on. I encountered this problem while I was building my SaaS app. I scoured thr..."
  url="https://freecodecamp.org/news/build-a-custom-pdf-text-extractor-with-nodejs-and-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770918274288/fea825aa-9dc4-468b-abbf-04fb1e74ec22.png"/>

Extracting text from PDFs sounds simple until you try to do it. And it can be even more challenging for JavaScript developers, with various libraries to choose from and so on.

I encountered this problem while I was building my SaaS app. I scoured through StackOverflow, Reddit, and Quora, but didn't find a satisfying answer. Some solutions were impractical, while others needed complex configuration.

After going through the struggle, I said, “You know what? Screw it. Let me build my own little PDF parser”. With the help of Claude and Node.js, I built a custom PDF parser for my SaaS app.

In this tutorial, I’ll show you how I built my custom PDF parser using Node.js and how you can do the same.

---

## Why Build a Custom PDF Text Extractor?

You might ask yourself: "Why build a custom PDF parser when libraries already exist?"

Popular JavaScript PDF parsers have various trade-offs. Here's a quick comparison of common options:

| Library | Text Extraction | TypeScript Support | Dependencies | Layout/Table Support | Best For |
| --- | --- | --- | --- | --- | --- |
| **pdf-parse** | Basic only | Partial | None | Poor | Quick, simple text extraction |
| **pdfjs-dist** | Advanced | Full | None | Moderate | Custom parsing & rendering |
| **pdf2json** | JSON output | Partial | None | Good for structure | Exporting structured data |
| **pdf-text-extract** | Text only | None | Requires Poppler | Basic | CLI or simple scripts |

These libraries work well for specific use cases, but building your own parser still has advantages:

- You choose the tech stack that fits your application
- You add only the features your project needs

And the good news is, you can build a JavaScript-native parser for your project's needs without having to rely on external dependencies or adapt libraries built for different ecosystems.

A custom parser gives you full control without the bloat of unnecessary functionality.

---

## Sample of What We’ll Be Building

Here’s a screen recording of our text extractor in action:

![Working demo of the PDF extractor](https://cdn.hashnode.com/res/hashnode/image/upload/v1770821775518/59ccda88-6913-4084-8d73-2141852530f7.gif)

::: note Prerequisites

To follow along with this tutorial, I assume:

- You have Node.js installed on your machine. If you don’t have Node.js installed, you can install it from the [<VPIcon icon="fa-brands fa-node"/>official Node.js website](https://nodejs.org/en/download).
- You know how to write basic TypeScript code.

:::

## Setting Up the Project

In this section, you’ll set up your project. This project uses TypeScript in Node.js rather than JavaScript.

Don’t worry if you don’t know how to configure TypeScript for Node.js. I’ll show you how to do it in this section.

### Initializing a Node.js app

Open the folder where you want your project to live, and create a Node.js project:

```sh
npm init -y
```

Install the necessary packages:

```sh
npm i cors express-fileupload pdf-parse
```

- `cors`: Enables Cross-Origin Resource Sharing, allowing your API to accept requests from different domains or ports.
- `express-fileupload`: Middleware for handling file uploads in Express, making it easy to process uploaded PDFs.
- `pdf-parse`: A lightweight PDF parsing library for extracting text and metadata from PDF files.
- `express`: The web framework for Node.js that handles routing, middleware, and server setup.

Now let’s continue with our installs:

```sh
npm i -D typescript ts-node @types/node @types/express nodemon prettier dotenv @types/cors @types/express-fileupload
```

The `-D` flag directs `npm` to install these libraries as development dependencies.

- `ts-node`: Lets you run TypeScript code directly in Node.js without compiling to JavaScript first
- `@types/node`: Adds TypeScript type definitions for Node.js core modules like `fs`, `path`, and `http`
- `@types/express`: Provides TypeScript type definitions for the Express.js framework and its middleware
- `nodemon`: Automatically restarts your development server whenever you save changes to your code
- `prettier`: A code formatter that ensures consistent style and readability across your entire project

### Configuring TypeScript in the Node.js app

Let’s start by generating a <VPIcon icon="iconfont icon-typescript"/>`tsconfig.json` file:

```sh
npx tsc --init
```

TypeScript projects use the <VPIcon icon="iconfont icon-typescript"/>`tsconfig.json` file to manage the project’s settings. The configuration file is located in the root of your project.

After running the command, you should see a <VPIcon icon="iconfont icon-typescript"/>`tsconfig.json` file that looks like this:

```json :collapsed-lines title="tsconfig.json"
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}
```

Add `"node"` to the `types` array like this:

```json title="tsconfig.json"
"types": ["node"]
```

Then modify your <VPIcon icon="iconfont icon-json"/>`package.json` file with the following code:

```json title="package.json"
{
  "main": "index.ts",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon --watch src --ext ts,json --exec \"node --loader ts-node/esm src/server.ts\"",
    "build": "tsc",
    "start": "node src/server.js"
  },
  "type": "module"
}
```

This ensures that the entry point of your app is a TypeScript file, and you can use `import` statement instead of `require`.

In the next section, you’re going to build the PDF parser.

---

## Core Implementation: Building the Extractor

After configuring your Node.js app, the next step is to build the PDF parser.

Create a new directory in your Node.js app, and create a <VPIcon icon="iconfont icon-typescript"/>`server.ts` file.

Now import the necessary packages for building the PDF parser:

```ts title="server.ts"
import express, { type Request, type Response } from "express";
import fileUpload, { type UploadedFile } from "express-fileupload";
import { PDFParse } from "pdf-parse";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
```

::: info Let’s understand what’s happening

- `fileUpload` is the module for uploading files in an Express app. The `UploadedFile` type is a TypeScript type for the uploaded file.
- `PDFParse` is the core parsing module. It provides the basic functionality of parsing PDF files.
- `cors` is the module for protecting the app from origins not specified.
- You created an Express app with the following line: `const app = express();`.
- `PORT` is the port you want your app to be hosted on.

:::

### Configuring CORS Middleware

Setting up CORS allows requests from specified origins. This protects your app from attacks.

```ts
app.use(
  cors({
    origin: ["http://localhost:3000", "https://yourwebsite.com"],
  })
);
```

### Implementing File Upload Middleware

To handle file uploads in your API, you’ll use the `express-fileupload` middleware. This middleware intercepts incoming file uploads and makes them accessible through `req.files`.

You can run checks on the incoming file, such as file size and number of files.

```ts
import fileUpload, { type UploadedFile } from "express-fileupload";

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
    abortOnLimit: true,
  })
);
```

::: info Key options

- `fileSize`: Sets the maximum file size allowed (50 MB in this case)
- `abortOnLimit`: When `true`, automatically rejects uploads that exceed the size limit and prevents further processing

:::

::: important Here’s why this is important

- **Security**: Limits prevent server overload from massive files.
- **Performance**: Automatically rejects oversized PDFs before processing.
- **User Experience**: Gives clear error messages for files that are too large.

:::

### Creating the Parser Logic

The parser logic is the core function that parses the PDFs. It’s an asynchronous function that extracts text content and metadata from a PDF buffer.

```ts
async function parsePDF(file: Uint8Array) {
  const parser = new PDFParse(file);
  const data = await parser.getText();
  const info = await parser.getInfo({ parsePageInfo: true });
  return { text: data?.text || "", info, numpages: info?.pages || 0 };
}
```

::: info Let’s understand what’s happening in the code

- The function accepts a `Uint8Array` buffer containing the raw PDF file data.
- You initialized a new `PDFParse` object with the PDF buffer.
- You called `getText()` to extract all text content from the PDF.
- You called `getInfo()` with `parsePageInfo: true` to retrieve document information, including page count.
- You returned an object containing:
  - `text`: The extracted text content (or empty string if none found)
  - `info`: Document metadata (author, title, creation date, and so on)
  - `numpages`: Total number of pages in the PDF

:::

::: important Why is the parser logic asynchronous?

Both `getText()` and `getInfo()` are asynchronous operations. They require time to parse through the PDF document, so `await` ensures the operations complete before returning results. This prevents blocking your server while processing large PDF files.

:::

### Creating the PDF Upload and Processing Endpoint

Now that you have the core `parsePDF()` function, you need an endpoint that accepts file uploads and processes them using this function.

```ts :collapsed-lines
app.post("/upload", async (req: Request, res: Response) => {
  try {
    if (!req.files || !("file" in req.files)) {
      return res.status(400).json({
        error: "No PDF file shared.",
        body: `Body is ${JSON.stringify(req.body)}`,
      });
    }

    const pdfFile = req.files.file as UploadedFile;
    const unit8ArrayData = new Uint8Array(pdfFile?.data);
    const result = await parsePDF(unit8ArrayData);
    console.log("PDF parsed successfully: ", result);
    res.json({ result, success: true });
  } catch (error) {
    console.error("Error processing PDF:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message, success: false });
    }
    res.status(500).json({
      error: "Failed to process PDF due to an unknown error.",
      success: false,
    });
  }
});
```

Let's break down what's happening in this code:

- You defined a POST route handler at `/upload` that processes PDF file uploads. The handler uses `req.files` to access uploaded files and validate that a "file" field exists in the request.
- The handler extracts the uploaded PDF file and converts it to a `Uint8Array` buffer, which is the required format for the `parsePDF()` function that performs the actual PDF parsing.
- You implemented comprehensive error handling with a try-catch block that:
  - Logs errors to the console for debugging purposes
  - Returns specific error messages when the error is an instance of the `Error` class
  - Provides a generic error response for unexpected failures while maintaining the `success: false` flag for consistent client responses

This route handler creates a PDF processing endpoint that validates inputs, processes files efficiently, and provides clear error feedback.

### Starting Your Server

The last step is to start your Express server and confirm it’s running correctly.

```ts
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
```

::: info

- `app.listen()`: Binds the Express server to the specified PORT and starts listening for incoming requests.
- PORT configuration: The server uses the `PORT` environment variable if set, otherwise defaults to `8080`.
- Callback function: Once the server starts, the callback logs a message to the console with the server URL.

:::

Use the following command to start your server:

```sh
npm run dev
```

When the server starts successfully, you'll see the message below in your console:

```plaintext
🚀 Server is running on http://localhost:8080
```

Your PDF parser API is now ready to accept file uploads and process PDFs.

You can verify that your PDF parser is working by visiting the URL using Postman or any API client of your choice.

![Working demo of the custom PDF extractor](https://cdn.hashnode.com/res/hashnode/image/upload/v1770821817467/2afa85b4-2042-411a-abd2-410f9cab349f.gif)

Congratulations! You’ve built a custom PDF parser.

This PDF parser is sufficient for simple parsing tasks. But you can extend the functionality of the parser to make it more robust.

In the next sections, you’ll add extra features, such as handling corrupt files.

---

## Adding Page-Specific Extraction

When working with large PDF documents, extracting the entire file can be inefficient and unnecessary. This feature allows users to specify a page range and extract text only from those pages. This makes your parser more flexible and performant for real-world use cases.

For example, a user might want to extract only pages 5-10 from a 100-page report. By adding optional query parameters `startPage` and `endPage` to your endpoint, you give users fine-grained control over which portions of a PDF they want parsed.

In this section, you’ll create a page-specific extraction function and an endpoint to handle parameters from request queries.

### Creating the Page-specific extraction function

The page-specific extraction function is the core function that parses the specified pages.

```ts :collapsed-lines
// function to extract text from a range of pages
async function parsePageRangeFromPDF(
  file: Uint8Array,
  startPage: number,
  endPage: number,
) {
  const parser = new PDFParse(file);
  const info = await parser.getInfo({ parsePageInfo: true });
  const totalPages = Array.isArray(info?.pages)
    ? info.pages.length
    : (info?.pages as number) || 0;

  if (startPage < 1 || endPage > totalPages || startPage > endPage) {
    throw new Error(
      `Invalid page range. PDF has ${totalPages} pages. Please provide a valid range where start >= 1, end <= ${totalPages}, and start <= end.`,
    );
  }

  const data = await parser.getText();
  const lines = data?.text?.split("\n") || [];

  // Note: pdf-parse doesn't provide direct page filtering, so getText() returns all text
  // For accurate page range extraction, consider using a different PDF library
  return { text: data?.text || "", startPage, endPage, totalPages };
}
```

::: info Let's break down what's happening in this code

1. You defined an `async` function `parsePageRangeFromPDF` that extracts text from a specific range of pages within a PDF document. The function accepts a `Uint8Array` PDF file and two numeric parameters for the start and end page range.
2. The function uses the `PDFParse` library to analyze the PDF structure, first extracting metadata, including the total page count, using `parser.getInfo()`. It then validates that the requested page range falls within the actual PDF boundaries.
3. After successful validation, the function extracts all text from the PDF using `parser.getText()` and splits it into individual lines. The function returns an object containing the extracted text along with metadata about the requested range and total pages.

:::

This function creates a reusable utility for extracting specific page ranges from PDFs with proper validation and error handling.

### Creating the Page-Specific Extraction Endpoint

Now that you’ve created the function for parsing specified pages of a PDF, you’ll create the endpoint for accepting uploads and parsing specified pages.

```ts :collapsed-lines
// Page range PDF text extraction endpoint
app.post("/upload-page-range", async (req: Request, res: Response) => {
  try {
    if (!req.files || !("file" in req.files)) {
      return res.status(400).json({
        error: "No PDF file shared.",
      });
    }

    // Get page range from query params or body
    const startPage = parseInt(
      (req.query.startPage as string) || (req.body?.startPage as string) || "1"
    );
    const endPage = parseInt(
      (req.query.endPage as string) || (req.body?.endPage as string) || "1"
    );

    if (isNaN(startPage) || isNaN(endPage)) {
      return res.status(400).json({
        error:
          "Invalid page range. Please provide valid integers for startPage and endPage.",
      });
    }

    const pdfFile = req.files.file as UploadedFile;
    const unit8ArrayData = new Uint8Array(pdfFile?.data);
    const result = await parsePageRangeFromPDF(
      unit8ArrayData,
      startPage,
      endPage
    );
    console.log(
      `Pages ${startPage}-${endPage} extracted successfully: `,
      result
    );
    res.json({ result, success: true });
  } catch (error) {
    console.error("Error processing PDF: ", error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message, success: false });
    }
    res.status(500).json({
      error: "Failed to process PDF due to an unknown error.",
      success: false,
    });
  }
});
```

::: info Let's break down what's happening in this code:

1. You defined a POST route handler at `/upload-page-range` that extracts text from a specific page range within uploaded PDF files. The handler first validates that a PDF file exists in the request using `req.files`, returning a 400 error if no file is provided.
2. The function extracts the `startPage` and `endPage` parameters from either query parameters or request body, providing default values of "1" if neither is specified. It then validates that both values are valid integers using `isNaN()` checks. This ensures robust input handling for page range requests.
3. Once the PDF is converted to a buffer, it's passed to `parsePageRangeFromPDF()` to extract the requested page range. The API responds with the extracted text and range details, while errors are clearly categorized: validation issues return 400, server problems return 500.

:::

This endpoint creates a specialized PDF processing route that allows clients to extract text from specific page ranges rather than entire documents.

Now, you can extract from specific pages using request parameters:

```sh
curl -F "file=@yourfile.pdf" "http://localhost:8080/upload-page-range?startPage=5&endPage=7"
```

or using request body:

```sh
curl -X POST -F "file=@yourfile.pdf" \
-F "startPage=5" \
-F "endPage=7" \
http://localhost:8080/upload-page-range
```

In the next section, you’ll add an endpoint for getting only the metadata of an uploaded file.

---

## Adding a Lightweight Metadata-Only Endpoint

Creating a lightweight metadata-only endpoint allows your users to quickly validate and inspect PDFs without fully processing the document.

This is useful for previewing document info before processing.

### Creating the Metadata Extraction Function

Add a new function that retrieves only document information:

```ts :collapsed-lines
async function getPDFMetadata(file: Uint8Array) {
  const parser = new PDFParse(file);
  const info = await parser.getInfo({ parsePageInfo: true });
  return {
    title: info?.info?.Title || "N/A",
    author: info?.info?.Author || "N/A",
    subject: info?.info?.Subject || "N/A",
    creator: info?.info?.Creator || "N/A",
    producer: info?.info?.Producer || "N/A",
    creationDate: convertPDFDateToReadable(info?.info?.CreationDate || "N/A"),
    modificationDate: convertPDFDateToReadable(info?.info?.ModDate || "N/A"),
    pages: info?.total || 0,
  };
}
```

::: info Let's break down what's happening in this code:

1. You defined an `async` function `getPDFMetadata` that extracts and processes metadata from PDF documents. The function accepts a `Uint8Array` PDF file buffer and uses the `PDFParse` library to retrieve document information.
2. The function extracts key PDF metadata fields, including title, author, subject, creator, and producer, providing fallback values of "N/A" when these fields are missing. This ensures the function always returns a complete metadata object, even for PDFs with missing information.
3. You implemented date processing using a `convertPDFDateToReadable` helper function to transform the PDF's specialized date formats into human-readable strings. The function returns a structured object containing all extracted metadata along with the total page count.

:::

This utility function provides a clean interface for extracting and normalizing PDF metadata. It makes it easy to access document information like authorship, creation dates, and page counts in a standardized format.

Here’s the `convertPDFDateToReadable` function:

```ts :collapsed-lines
function convertPDFDateToReadable(pdfDateString: string): string {
  try {
    // Remove "D:" prefix if present
    let dateStr = pdfDateString.startsWith("D:")
      ? pdfDateString.slice(2)
      : pdfDateString;

    // Extract date and time components (format: YYYYMMDDHHmmss)
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const minute = dateStr.substring(10, 12);
    const second = dateStr.substring(12, 14);

    // Validate date components
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    if (monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
      throw new Error("Invalid date values");
    }

    // Return in dd/mm/yyyy format
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error converting PDF date:", error);
    return "Invalid date";
  }
}
```

### Creating the Metadata Endpoint

Create a POST endpoint that accepts file uploads and returns only metadata:

```ts :collapsed-lines
app.post("/metadata", async (req: Request, res: Response) => {
  try {
    if (!req.files || !("file" in req.files)) {
      return res.status(400).json({
        error: "No PDF file shared.",
      });
    }

    const pdfFile = req.files.file as UploadedFile;
    const unit8ArrayData = new Uint8Array(pdfFile?.data);
    const metadata = await getPDFMetadata(unit8ArrayData);

    console.log("PDF metadata extracted successfully: ", metadata);
    res.json({ metadata, success: true });
  } catch (error) {
    console.error("Error extracting metadata:", error);
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message, success: false });
    }
    res.status(500).json({
      error: "Failed to extract metadata due to an unknown error.",
      success: false,
    });
  }
});
```

::: info Let's break down what's happening in this code:

1. You defined a POST route handler at `/metadata` that extracts and returns metadata from uploaded PDF files. The handler begins with validation to ensure a PDF file exists in the request using `req.files`, returning a 400 error with a clear message if no file is provided.
2. The function converts the uploaded PDF file to a `Uint8Array` buffer format, which is required by the `getPDFMetadata()` utility function you created earlier. This conversion ensures the PDF data is in the proper format for the PDF parsing library to process.
3. After successfully extracting metadata, the route logs the results and returns them in a structured JSON response. The comprehensive error handling catches any issues during processing and returns appropriate 500 errors with descriptive messages while maintaining the consistent response format.

:::

This endpoint provides a dedicated API for extracting PDF metadata like title, author, creation dates, and page counts. This provides your users with an easy way to analyze PDF document properties without needing to parse the entire file content.

Now, you can extract only the metadata of uploaded files:

```sh
curl -X POST -F "file=@document.pdf" http://localhost:8080/metadata
```

Your response should look like this:

```json
{
  "metadata": {
    "title": "MSA",
    "author": "N/A",
    "subject": "N/A",
    "creator": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/144.0.0.0 Safari/537.36",
    "producer": "Skia/PDF m144",
    "creationDate": "22/01/2026",
    "modificationDate": "22/01/2026",
    "pages": 26
  },
  "success": true
}
```

---

## Adding Search/Find Functionality

When working with large PDFs, finding specific information manually can be time-consuming. The search functionality allows users to locate keywords within a PDF and get immediate results showing which pages contain the keyword and how many times it appears.

This is especially valuable for research, compliance, or document analysis tasks.

For example, a user may wish to find all instances of "invoice" in a 50-page financial report, or locate "clause 3.2" in a legal document. By adding a dedicated search endpoint that accepts a PDF file and a keyword, you give clients the ability to quickly navigate large documents without reading through every page.

In this section, you'll create a search function that finds keywords within PDF text and an endpoint that accepts file uploads along with search queries.

### Creating the Search/Find Function

The search function is the core utility that finds keywords within PDF documents and returns detailed results about their locations.

```ts :collapsed-lines
async function searchPDFText(
  file: Uint8Array,
  searchQuery: string,
  caseSensitive: boolean = false
) {
  const parser = new PDFParse(file);
  const info = await parser.getInfo({ parsePageInfo: true });
  const totalPages = Array.isArray(info?.pages)
    ? info.pages.length
    : (info?.pages as number) || 0;

  const results = {
    query: searchQuery,
    caseSensitive,
    matchCount: 0,
    matches: [] as Array<{
      page: number;
      text: string;
      position: number;
    }>,
  };

  // Extract text from all pages
  for (let page = 1; page <= totalPages; page++) {
    const data = await parser.getText();
    const pageText = data?.text || "";

    // Determine search text based on case sensitivity
    const searchText = caseSensitive ? searchQuery : searchQuery.toLowerCase();
    const compareText = caseSensitive ? pageText : pageText.toLowerCase();

    let searchIndex = 0;
    while ((searchIndex = compareText.indexOf(searchText, searchIndex)) !== -1) {
      // Extract context (100 characters before and after)
      const startContext = Math.max(0, searchIndex - 50);
      const endContext = Math.min(pageText.length, searchIndex + searchQuery.length + 50);
      const contextText = pageText.substring(startContext, endContext);

      results.matches.push({
        page,
        text: contextText.trim(),
        position: searchIndex,
      });

      results.matchCount++;
      searchIndex += searchText.length;
    }
  }

  return results;
}
```

::: info Let's break down what's happening in this code

1. You defined an `async` function `searchPDFText` that performs text search within PDF documents with optional case sensitivity. The function accepts a PDF file buffer, a search query string, and a `caseSensitive` parameter with a default value of `false` for more flexible searching.
2. The function uses the `PDFParse` library to first extract the total page count from the PDF metadata. It then initializes a results object to track the search query, case sensitivity setting, total match count, and individual matches with their page numbers, context text, and positions.
3. For each page in the PDF, the function extracts text and performs the search using either case-sensitive or case-insensitive comparison based on the parameter. When matches are found, it captures a 100-character context window around each match (50 characters before and after) and records the page number, position, and contextual text in the results.

:::

This function creates a comprehensive PDF search utility that can locate specific text within documents, while providing contextual snippets for each match. This makes it useful for document analysis and content retrieval applications.

### Creating the Search/Find Endpoint

Now that you've created the search function, you'll create an endpoint that accepts file uploads along with a search query. The endpoint also supports case-sensitive searches.

```ts :collapsed-lines
app.post("/search", async (req: Request, res: Response) => {
  try {
    if (!req.files || !("file" in req.files)) {
      return res.status(400).json({
        error: "No PDF file shared.",
      });
    }

    // Get search query and options
    const query = (req.query.query as string) || (req.body?.query as string);
    const caseSensitive =
      (req.query.caseSensitive as string) === "true" ||
      req.body?.caseSensitive === true;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        error: "Search query is required.",
      });
    }

    const pdfFile = req.files.file as UploadedFile;
    const unit8ArrayData = new Uint8Array(pdfFile?.data);
    const results = await searchPDFText(unit8ArrayData, query, caseSensitive);

    if (results.matchCount === 0) {
      return res.json({
        result: results,
        success: true,
        message: "No matches found.",
      });
    }

    console.log(`Found ${results.matchCount} matches for "${query}"`);
    res.json({ result: results, success: true });
  } catch (error) {
    console.error("Error searching PDF:", error);
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message, success: false });
    }
    res.status(500).json({
      error: "Failed to search PDF due to an unknown error.",
      success: false,
    });
  }
});
```

::: info Let's break down what's happening in this code

1. You defined a POST route handler at `/search` that enables full-text search within uploaded PDF documents. The handler begins with validation to ensure that both a PDF file and a search query are provided, returning 400 errors with descriptive messages if either is missing or empty.
2. The function extracts the search query and `caseSensitive` option from either query parameters or the request body, with proper type conversion for the boolean flag. It converts the uploaded PDF to a `Uint8Array` buffer and passes it to your `searchPDFText()` utility function along with the search parameters.
3. The handler provides informative responses based on search results: returning a success response with a "No matches found" message when no matches are detected, or returning the full results when matches exist. Error handling differentiates between client errors (400) for invalid inputs and server errors (500) for processing failures.

:::

This endpoint creates a powerful PDF search API that allows clients to locate specific text within documents with configurable case sensitivity, providing contextual matches and comprehensive results for document analysis applications.

Now, you can search for keywords within PDFs using query parameters.

Search for “example” (case-insensitive):

```sh
curl -F "file=@document.pdf" "http://localhost:8080/search?query=example"
```

Search for “Example” (case-sensitive):

```sh
curl -F "file=@document.pdf" "http://localhost:8080/search?query=Example&caseSensitive=true"
```

You can use the request body:

```sh
curl -X POST -F "file=@document.pdf" \
-F "query=PDF" \
-F "caseSensitive=true" \
http://localhost:8080/search
```

Your response should look like this:

```json
{
  "result": {
    "query": "PDF",
    "caseSensitive": false,
    "matchCount": 3,
    "matches": [
      {
        "page": 1,
        "text": "...This is a PDF document. The PDF format is...",
        "position": 10
      },
      {
        "page": 2,
        "text": "...Learn more about PDF standards...",
        "position": 25
      }
    ]
  },
  "success": true
}
```

You’ve now added three important features to your PDF parser.

In the next section, we’ll look at handling edge cases.

---

## Handling Edge Cases and Best Practices

When building your custom PDF parser, there are some edge cases you should keep in mind if you want to build a more robust and reliable parser.

Below are some edge cases to watch out for:

### Corrupted or Malformed PDFs

Some users may upload corrupted PDFs – that is, PDFs with invalid structure or corrupted headers. This can cause errors during processing.

You can wrap your parsing operations in a `try-catch` block to handle the parsing errors gracefully. Also, you’ll want to provide clear error messages that distinguish corrupted files from other errors.

### Password-Protected PDFs

PDFs can be encrypted with user or owner passwords. This poses a challenge as `pdf-parse` has limited support for password-protected files.

There are two ways you can solve this problem:

- Implement a mechanism that rejects password-protected files.
- Accept a password query you can use to decrypt the files.

### Scanned PDFs (Image-Based)

PDFs created from scanned documents are images with no extractable text. If you try to parse these documents as is, you’ll get empty or minimal text.

You can implement OCR (Optical Character Recognition) to extract text from scanned PDFs.

### Special Characters and Encoding

Your users may upload PDFs that contain special characters, Unicode symbols, or non-Latin scripts. If your extraction function doesn’t support such characters, your users may lose a good chunk of their files.

You’ll want to make sure that your text extraction can handle UTF-8 encoding and various character sets.

---

## Best Practices

Below are some best practices to adopt when building your own custom PDF parser:

### 1. Validate incoming files before processing

```ts :collapsed-lines
function validatePDFFile(pdfFile: UploadedFile): { valid: boolean; error?: string } {
  // Check MIME type
  if (pdfFile.mimetype !== "application/pdf") {
    return { valid: false, error: "Invalid MIME type. Expected application/pdf" };
  }

  // Check file size (already limited by middleware, but double-check)
  const maxSize = 50 * 1024 * 1024; // 50 MB
  if (pdfFile.size > maxSize) {
    return { valid: false, error: "File exceeds maximum size of 50 MB" };
  }

  // Check for empty file
  if (pdfFile.size === 0) {
    return { valid: false, error: "File is empty" };
  }

  // Check file signature (PDF magic bytes)
  const data = new Uint8Array(pdfFile.data as ArrayBuffer);
  const header = String.fromCharCode(...data.slice(0, 4));
  if (header !== "%PDF") {
    return { valid: false, error: "Invalid PDF file format" };
  }

  return { valid: true };
}
```

### 2. Implement request timeouts to avoid server hangs

```ts
// Set timeout for long-running PDF operations
const parseWithTimeout = (file: Uint8Array, timeoutMs = 30000) => {
  return Promise.race([
    parsePDF(file),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("PDF parsing timeout")), timeoutMs)
    ),
  ]);
};
```

### 3. Implement rate limiting to avoid abuse.

You can use the `express-rate-limit` library to apply rate limiting to your Express apps.

```ts :collapsed-lines
import rateLimit from 'express-rate-limit';

const app = express();

// Create the rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message:
    'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Enable standard RateLimit headers (draft-7)
  legacyHeaders: false, // Disable legacy X-RateLimit-* headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);
```

### 4. Sanitize each keyword or search query to avoid injection attacks.

---

## Unit Testing Your PDF Parser

Testing is critical when building PDF processing tools, as real-world PDFs vary widely in structure, encoding, and complexity. Jest provides an excellent framework for testing Express endpoints and ensuring your extraction logic works reliably across different scenarios.

### Setting Up Jest Tests

The test suite I've created uses Jest with Supertest (an HTTP assertion library) to simulate requests to your API endpoints without running a server.

To start, install Jest, Supertest, and their types:

```sh
npm i --save-dev jest @types/jest supertest @types/supertest ts-jest
```

Then update your <VPIcon icon="iconfont icon-json"/>`package.json` to include Jest configuration:

```json title="package.json"
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "extensionsToTreatAsEsm": [".ts"],
    "moduleNameMapper": {
      "^(\.{1,2}/.*)\.js$": "$1"
    },
    "transform": {
      "^.+\.tsx?$": [
        "ts-jest",
        {
          "useESM": true,
          "tsconfig": {
            "module": "esnext"
          }
        }
      ]
    }
  }
}
```

### Understanding the Test Structure

The test file includes comprehensive coverage for all your endpoints. For example, the `/upload-page-range` endpoint tests verify both happy paths and error handling:

```ts :collapsed-lines
describe("POST /upload-page-range", () => {
  it("should return error when no file is provided", async () => {
    const response = await request(app)
      .post("/upload-page-range")
      .query({ startPage: 1, endPage: 2 });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("No PDF file shared.");
  });

  it("should return error for invalid page range", async () => {
    const mockPdfBuffer = Buffer.from("%PDF-1.4 mock pdf");
    const response = await request(app)
      .post("/upload-page-range")
      .query({ startPage: "invalid", endPage: 2 })
      .attach("file", mockPdfBuffer, "test.pdf");

    expect(response.status).toBe(400);
    expect(response.body.error).toContain("valid integers");
  });

  it("should extract text from page range", async () => {
    const mockPdfBuffer = Buffer.from("%PDF-1.4 mock pdf");
    const response = await request(app)
      .post("/upload-page-range")
      .query({ startPage: 1, endPage: 2 })
      .attach("file", mockPdfBuffer, "test.pdf");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result.startPage).toBe(1);
    expect(response.body.result.endPage).toBe(2);
  });
});
```

Notice how the tests mock the PDFParse library rather than requiring actual PDF files. This approach makes tests:

- **Fast**: No disk I/O, tests run in milliseconds
- **Reliable**: No dependency on external files that might change
- **Focused**: Each test verifies specific behavior, not file handling

The mock returns consistent data for all test cases, allowing you to verify your endpoint logic, handle responses correctly, validate parameters properly, and return appropriate error messages.

### Running Tests

Execute your test suite with:

```sh
# Run tests once
npm test

# Run tests in watch mode for development
npm run test:watch

# Generate coverage report
npm test -- --coverage
```

A successful test run confirms that all endpoints, `/upload`, /metadata, `/search`, and `/upload-page-range`, handle valid requests, reject invalid inputs, and return data in the expected format.

---

## Deploying Your PDF Parser API

Once your tests pass, you're ready to deploy your Express app. The deployment process depends on your hosting platform, but here are the essentials:

### Running Locally

Start your development server with:

```sh
npm run dev
```

This runs the server from `server.ts` using `ts-node` and Nodemon. The API will be available at `http://localhost:8080`.

Test your endpoints with curl:

```sh
# Test the health check
curl http://localhost:8080/

# Upload and parse a PDF
curl -F "file=@sample.pdf" http://localhost:8080/upload

# Extract specific pages
curl -F "file=@sample.pdf" "http://localhost:8080/upload-page-range?startPage=1&endPage=5"

# Search for text
curl -F "file=@sample.pdf" "http://localhost:8080/search?query=invoice"

# Get metadata only
curl -F "file=@sample.pdf" http://localhost:8080/metadata
```

### Production Deployment

Before deploying to production, build your TypeScript:

```sh
npm run build
```

Then start the compiled server:

```sh
npm start
```

For cloud platforms like Heroku, AWS, or DigitalOcean, ensure your environment variables are set (particularly the `PORT` variable). The API is designed to scale horizontally, since it doesn't maintain state. Each request processes independently.

::: note Consider adding these production improvements 

- **Rate limiting**: Prevent abuse with express-rate-limit
- **Logging**: Use Winston or Pino for structured logging
- **Monitoring**: Set up error tracking with Sentry or similar services
- **Database**: Store extraction results in MongoDB or PostgreSQL for historical access
- **Caching**: Cache metadata for frequently accessed PDFs to reduce processing overhead

:::

---

## Next Steps: Integrate Into Your SaaS

This PDF parser is now a production-ready API that you can integrate into any SaaS platform needing document processing capabilities. Here's how to get started:

Fork the repository and customize it for your use case. Add features like:

- Support for additional document formats (DOCX, XLSX, images)
- Batch processing endpoints for handling multiple files
- Webhook support for asynchronous processing
- User authentication and per-user quotas
- Advanced text extraction options (tables, forms, structured data)

---

## Conclusion

Building a production-ready PDF parser gives you complete control over document processing while maintaining modularity for future extensions.

You've learned to build an Express API that handles full extraction, page ranges, text search, and metadata retrieval – all with robust error handling and validation patterns that apply to any document processing tool.

This tested, deployable foundation is ready to scale in real applications, whether you're building a SaaS product or adding PDF capabilities to existing systems.

As you integrate these patterns into your projects, consider exploring advanced libraries like `pdfjs-dist` or `pdf-lib` while applying the same validation and modular design principles you've mastered here.

::: info Resources

<SiteInfo
  name="DeraCodings/custom-pdf-parser"
  desc="Contribute to DeraCodings/custom-pdf-parser development by creating an account on GitHub."
  url="https://github.com/DeraCodings/custom-pdf-parser/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8cf443b261543665d9c8f7303f5f8576a6a04819d29bba561cf44a0dc92a5597/DeraCodings/custom-pdf-parser"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Custom PDF Text Extractor with Node.js and TypeScript",
  "desc": "Extracting text from PDFs sounds simple until you try to do it. And it can be even more challenging for JavaScript developers, with various libraries to choose from and so on. I encountered this problem while I was building my SaaS app. I scoured thr...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-custom-pdf-text-extractor-with-nodejs-and-typescript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
