---
lang: en-US
title: "Analyzing PDFs with ChatGPT Using OpenAI's Vision API"
description: "Article(s) > Analyzing PDFs with ChatGPT Using OpenAI's Vision API"
icon: iconfont icon-typescript
category:
  - TypeScript
  - AI
  - LLM
  - OpenAI
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - openai
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Analyzing PDFs with ChatGPT Using OpenAI's Vision API"
    - property: og:description
      content: "Analyzing PDFs with ChatGPT Using OpenAI's Vision API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/analyzing-pdfs-with-chatgpt-using-openais-vision-api.html
prev: /programming/ts/articles/README.md
date: 2024-08-20
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

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
  name="Analyzing PDFs with ChatGPT Using OpenAI's Vision API"
  desc="Learn how to convert PDFs to images using Node.js and analyze them with OpenAI's Vision API. This process ensures privacy as images are deleted after analysis."
  url="https://typescript.tv/hands-on/analyzing-pdfs-with-chatgpt-using-openais-vision-api"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to convert PDFs to images using Node.js and analyze them with OpenAI's Vision API. This process ensures privacy as images are deleted after analysis.

ChatGPT's web interface enables users to upload files from their computer, Google Drive, or Microsoft's OneDrive. This functionality allows you to upload PDFs and ask questions related to these documents. For instance, you can upload your insurance documents and inquire if you are covered in specific situations. Using the OpenAI API, you can [<VPIcon icon="iconfont icon-openai"/>upload files](https://platform.openai.com/docs/api-reference/files) but you'll need to manage file retrieval and deletion.

In this tutorial, I will present an alternative approach: converting a PDF to an image that can be analyzed using [<VPIcon icon="iconfont icon-openai"/>OpenAI's Vision API](https://platform.openai.com/docs/guides/vision?lang=node). The main advantage is that once the image is processed by the model, it is deleted from OpenAI servers and not retained.

---

## Convert PDFs to Images with Node.js

While ChatGPT can handle PDFs directly in its web interface, using the API requires a bit of extra work. By converting a PDF into an image, you can take advantage of the Vision API to extract information from the document. After the image has been processed, it is deleted from OpenAI's servers, ensuring privacy and security.

To start, we'll convert a PDF (Portable Document Format) into a PNG (Portable Network Graphics) using the [<VPIcon icon="fa-brands fa-npm"/>`pdf-img-convert`](https://npmjs.com/package/pdf-img-convert) library, which is based on [Mozilla's PDF.js (<VPIcon icon="iconfont icon-github"/>`mozilla/pdf.js`)](https://github.com/mozilla/pdf.js):

```ts
import fs from 'node:fs';
import pdf2img from 'pdf-img-convert';
 
const pdfPages = await pdf2img.convert('./document.pdf');
 
for (let i = 0; i < pdfPages.length; i++) {
  const page = pdfPages[i];
  if (page) {
    // We increment the file name during output to not start with page number 0
    fs.writeFileSync(`./pdf-page-${i + 1}.png`, page);
  }
}
```

This code snippet converts each page of a PDF document into a separate PNG image, saved locally.

---

## Analyzing Images with ChatGPT

OpenAI offers vision capabilities to understand images. By using the Vision API, you can send image URLs or Base64-encoded images to ChatGPT. In return, you'll receive answers to your questions about the image:

```ts
import OpenAI from 'openai';
 
const openai = new OpenAI({
  apiKey: 'top-secret',
});
 
// https://platform.openai.com/docs/guides/vision/quickstart
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: `What is the name of the company in this image?` },
        {
          type: 'image_url',
          image_url: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/1024px-Coca-Cola_logo.svg.png',
          },
        },
      ],
    },
  ],
});
 
// The name of the company from the logo is Coca-Cola.
console.log(response.choices[0]?.message.content);
```

Be sure to phrase your questions to inquire about the image's content. According to the "[<VPIcon icon="iconfont icon-openai"/>Managing images](https://platform.openai.com/docs/guides/vision/managing-images)" documentation, images uploaded via the OpenAI API are not used to train global models. Once an image has been processed, it is deleted from OpenAI servers.

---

## Combine PDF Conversion and Image Analysis

Let's combine the previous steps to create a tool that converts PDFs to images and then uses the [<VPIcon icon="iconfont icon-openai"/>chat completion functionality](https://platform.openai.com/docs/api-reference/chat/create) to analyze them. Since we don't have public URLs for our images, we'll encode them into Base64. We'll also ensure the images are [<VPIcon icon="iconfont icon-openai"/>high-resolution](https://platform.openai.com/docs/guides/vision/low-or-high-fidelity-image-understanding) to improve analysis accuracy.

::: info Game Plan

1. Convert the PDF to PNG images
2. Encode the images to Base64
3. Send the Base64-encoded images to OpenAI for analysis

:::

### PDF Conversion

The OpenAI documentation states that for high-resolution mode (`detail: 'high'` in chat config), the image's short side should be less than 768px and the long side should be less than 2,000px. Since paper documents are taller than they are wide, we'll limit the height to 1998px. This keeps it under 2000px and divisible by 2, avoiding [<VPIcon icon="fas fa-globe"/>power-of-two limitations](https://khronos.org/opengl/wiki/NPOT_Texture#Older_hardware).

Additionally, we'll command `pdf-img-convert` to return a Base64-encoded version of our converted images:

```ts
import pdf2img from 'pdf-img-convert';
 
const pdfPages = (await pdf2img.convert('./document.pdf', {
  height: 1998,
  base64: true,
  // Unfortunately, we need to use type assertions here due to the lack of proper TypeScript typings in "pdf-img-convert".
})) as string[];
```

### Base64 Conversion

With the Base64-encoded images ready, we can now map them into OpenAI chat messages. To supply Base64-encoded data, we use the schema `data:image/png;base64,OURBASE64IMAGE`. This is the syntax for inline images using [<VPIcon icon="fa-brands fa-firefox"/>Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#syntax):

```ts
const imagePrompts = pdfPages.map(
  (encodedImage) =>
    ({
      type: 'image_url',
      image_url: {
        url: `data:image/png;base64,${encodedImage}`,
        detail: 'high',
      },
      // We use a "const assertion" to lock in the "type" property.
    }) as const
);
```

### PDF Analysis

With our prompts ready, we can now put everything together. Remember, our text message should inquire about image analysis. Instead of asking, "What do you see in this PDF?" ask, "What do you see in these images?":

```ts :collapsed-lines
import pdf2img from 'pdf-img-convert';
import OpenAI from 'openai';
 
const pdfPages = (await pdf2img.convert('./document.pdf', {
  height: 1998,
  base64: true,
})) as string[];
 
const imagePrompts = pdfPages.map(
  (encodedImage) =>
    ({
      type: 'image_url',
      image_url: {
        url: `data:image/png;base64,${encodedImage}`,
        detail: 'high',
      },
    }) as const
);
 
const openai = new OpenAI({
  apiKey: 'top-secret',
});
 
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'user',
      content: [{ type: 'text', text: 'What are the titles on the images?' }, ...imagePrompts],
    },
  ],
});
 
console.log(response.choices[0]?.message.content);
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Analyzing PDFs with ChatGPT Using OpenAI's Vision API",
  "desc": "Learn how to convert PDFs to images using Node.js and analyze them with OpenAI's Vision API. This process ensures privacy as images are deleted after analysis.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/analyzing-pdfs-with-chatgpt-using-openais-vision-api.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
