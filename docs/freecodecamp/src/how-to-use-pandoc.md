---
lang: en-US
title: How to Use Pandoc - An Open Source Tool for Technical Writers
description: Article(s) > How to Use Pandoc - An Open Source Tool for Technical Writers
icon: fas fa-brain
category: 
  - Haskell
  - Pandoc
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - haskell
  - hs
  - pandoc
  - technical-writing
head:
  - - meta:
    - property: og:title
      content: Article(s) > How to Use Pandoc - An Open Source Tool for Technical Writers
    - property: og:description
      content: How to Use Pandoc - An Open Source Tool for Technical Writers
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-pandoc.html
prev: /programming/hs/articles/README.md
date: 2024-07-10
isOriginal: false
author:
  - name: Vikram Aruchamy
    url: https://freecodecamp.org/news/author/askvikram/
cover: https://freecodecamp.org/news/content/images/2024/07/pandoc-freecodecamp-1.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Haskell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/hs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Pandoc – An Open Source Tool for Technical Writers"
  desc="Technical writers frequently navigate the complexities of various document formats and revisions. Pandoc, a free and open-source tool, offers a powerful solution to streamline these processes. In this tutorial, I'll explain the Pandoc's functionaliti..."
  url="https://freecodecamp.org/news/how-to-use-pandoc"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/pandoc-freecodecamp-1.jpg"/>

Technical writers frequently navigate the complexities of various document formats and revisions. [<VPIcon icon="fas fa-globe"/>Pandoc](https://pandoc.org/), a free and open-source tool, offers a powerful solution to streamline these processes.

In this tutorial, I'll explain the Pandoc's functionalities, specifically focusing on two key areas that can significantly enhance the workflow for technical writers:

**Docs and Markdown Conversions**: If you write in Google Docs to leverage their collaborative writing, editing, and review features, Pandoc empowers you to [<VPIcon icon="fas fa-globe"/>convert Google Docs into markdown](https://docstomarkdown.pro/convert-google-docs-to-markdown/) for publishing needs, and if you write in markdown, it helps you convert markdown to Google Docs or Microsoft Word for creating deliverables.

**Merging of Multiple Docs into One**: If you work in the "content as component approach", Pandoc allows you to [<VPIcon icon="fa-brands fa-google"/>merge multiple Google Docs into a single document](https://workspace.google.com/marketplace/app/merge_docs_pro/61337277026) with a few commands for publishing needs.

You can also create scripts to automate these processes.

---

## Why Use Markdown for Technical Writing?

[**Markdown**](/freecodecamp.org/markdown-cheatsheet.md) is great for technical writers because it simplifies the writing process and improves collaboration. Here's why:

**Readability and Ease of Use**: Markdown uses plain text symbols for formatting, making it clear and easy to learn. This lets you concentrate on writing clear content without getting caught up in styling complexities.

**Platform Independence**: Markdown files are plain text, allowing you to write in any text editor on any device. This flexibility provides freedom in your writing environment and eliminates software compatibility concerns.

**Seamless Conversion with Free Tools**: Free tools such as Pandoc offer format flexibility for markdown users, such as [<VPIcon icon="fas fa-globe"/>converting markdown to Google Docs](https://docstomarkdown.pro/convert-markdown-to-google-docs/), Word documents, or HTML, ensuring compatibility with collaborative editing needs and final deliverables. This also extends to modern workflows, where large language models generate content in markdown. You can use ChatGPT or the Gemini API for creating initial drafts, integrate them with your writing, and then use Pandoc to convert the final document to Google Docs or Microsoft Word for team editing, feedback, and creating deliverables. This streamlined workflow empowers efficient and collaborative content creation.

**Version Control Friendly**: Markdown's plain text nature enables seamless integration with version control systems like Git. This facilitates tracking changes, reverting to previous versions. This is particularly valuable for technical writing projects that often undergo revisions and involve multiple team members working on different sections.

---

## Why Merge Multiple Documents into One?

Technical writing often involves creating complex documents from smaller, reusable pieces. We call these pieces "content components." These components can be individual chapters, user guides, reference articles, or any other modular unit that contributes to the final product. In other words, content components are building blocks for bigger projects.

However, writing tools such as [<VPIcon icon="fa-brands fa-google"/>Google Docs](https://google.com/docs/about/) lack the ability to merge these components into a one document. This can be a major hurdle for projects like:

1. **Technical Documentation:** Building a user guide by assembling and reordering pre-written topics rather than crafting the entire document from scratch.
2. **Reference Guides:** Consolidating multiple articles from a knowledge base into a single, printable reference manual.
3. **Book Authoring:** Constructing a book by compiling individual chapters and appendices, streamlining the writing and editing process.

In all these scenarios, the need to merge content components becomes crucial for creating well-structured and efficient documentation.

---

## How to Install Pandoc

You can install Pandoc on your system using the packages available in the [releases (<VPIcon icon="iconfont icon-github"/>`jgm/pandoc`)](https://github.com/jgm/pandoc/releases) list. The [<VPIcon icon="fas fa-globe"/>installation page](https://pandoc.org/installing.html) has a detailed tutorial on the steps to install it on different systems.

Once Pandoc is installed, you can use it in the command line to perform different document conversion operations as explained below.

---

## How to Convert Markdown to Word or Google Docs

To convert a markdown file to a Word document or Google Docs using Pandoc, follow these steps:

1. Open a terminal or command prompt and navigate to the directory where your markdown file is located.
2. Run the following Pandoc command to convert your markdown file to a Word document:

```sh
pandoc input.md -o output.docx
```

Replace <VPIcon icon="fa-brands fa-markdown"/>`input.md` with the name of your input markdown file, and <VPIcon icon="fas fa-file-lines"/>`output.docx` with the desired name of your Word document.

To convert the Docx format into Google Docs, you can upload it to Google Drive and open it in Google Docs.

With these steps, you can convert your markdown files to Word documents or Google Docs using Pandoc.

---

## How to Convert Google Docs or Word to Markdown

In this section, I'll explain how to convert a Google Docs or Microsoft Word document into arkdown format.

While the Docs format is accepted by Pandoc, you cannot use the Google Docs URL directly with Pandoc. Therefore, you need to export the Google Doc into Docx format.

Go to *File* > *Download* > *Microsoft Word (.docx)* in your Google Doc to download the document in the `.docx` format as shown in the following image:

![option to download document in .docx format](https://freecodecamp.org/content/images/2024/07/Screenshot-2024-07-08-at-3.05.41-PM.png)

Now you'll have the Word document equivalent of the Google Docs.

To [convert the Word document to markdown](https://docstomarkdown.pro/convert-word-to-markdown/) using Pandoc, run the following command in your terminal or command prompt:

```sh
pandoc input.docx -o output.md
```

Replace `input.docx` with the name of your Word document, and `output.md` with the desired name of your markdown file.

---

## How to Merge Multiple Documents into One

To [<VPIcon icon="fas fa-globe"/>merge multiple Google Docs or Word documents into a single file](https://mergedocs.pro/) using Pandoc, you can follow these two steps:

1. Convert individual documents to markdown using the Pandoc conversion command to convert each Google Doc or Word document into a separate markdown file (explained in the previous section).
2. Once you have individual markdown files, use the following Pandoc command to merge them into a single document.

```sh
pandoc file1.md file2.md -o merged_output.docx
```

Replace `file1.md` and `file2.md` with the names of your input markdown files. These files will be merged into one `merged_output.docx`.

You can use your desired output format instead of `merged_output.docx` based on your goals. For instance, you can create a single HTML file if you intend to publish it on the web, or use the markdown format if your publishing platform supports markdown.

This approach leverages Pandoc's strengths for format conversion and merging to achieve the desired outcome of a unified document.

For more information and helpful answers about using Pandoc, check out the [<VPIcon icon="fas fa-globe"/>Pandoc FAQs](https://pandoc.org/faqs.html).

---

## Conclusion

In conclusion, Pandoc is a powerful and versatile tool for technical writers, offering document conversion and merging capabilities.

With its ability to convert Google Docs into markdown and merge multiple documents into one, Pandoc streamlines the process of creating and publishing technical documentation.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Pandoc – An Open Source Tool for Technical Writers",
  "desc": "Technical writers frequently navigate the complexities of various document formats and revisions. Pandoc, a free and open-source tool, offers a powerful solution to streamline these processes. In this tutorial, I'll explain the Pandoc's functionaliti...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-pandoc.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
