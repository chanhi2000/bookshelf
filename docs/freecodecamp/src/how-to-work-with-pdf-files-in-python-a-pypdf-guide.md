---
lang: en-US
title: "How to Work with PDF Files in Python: A PyPDF Guide"
description: "Article(s) > How to Work with PDF Files in Python: A PyPDF Guide"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Work with PDF Files in Python: A PyPDF Guide"
    - property: og:description
      content: "How to Work with PDF Files in Python: A PyPDF Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-pdf-files-in-python-a-pypdf-guide.html
prev: /programming/py/articles/README.md
date: 2026-01-24
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769195226088/fd3080df-67b9-4366-9432-304fdf438f39.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Work with PDF Files in Python: A PyPDF Guide"
  desc="PDF files are everywhere. They’re used for reports, invoices, bank statements, research papers, and legal documents. While PDFs are easy to read for humans, they’re not easy to work with in code. Extracting text, splitting pages, or merging files oft..."
  url="https://freecodecamp.org/news/how-to-work-with-pdf-files-in-python-a-pypdf-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769195226088/fd3080df-67b9-4366-9432-304fdf438f39.png"/>

PDF files are everywhere. They’re used for reports, invoices, bank statements, research papers, and legal documents. While PDFs are easy to read for humans, they’re not easy to work with in code. Extracting text, splitting pages, or merging files often feels harder than it should be.

This is where [PyPDF (<VPIcon icon="iconfont icon-github" />`py-pdf/pypdf`)](https://github.com/py-pdf/pypdf) helps. PyPDF is a popular Python library that lets you read, modify, and write PDF files. It’s lightweight, easy to learn, and works well for most common PDF tasks. If you have ever needed to extract text from a PDF, merge multiple PDFs, or protect a file with a password, PyPDF is a good place to start.

In this article, you’ll learn what PyPDF is, how it works, and how to use it through simple and practical examples. You’ll also learn how tools like [<VPIcon icon="fas fa-globe"/>PDFBoom](https://pdfboom.com/) handle PDF operations. This tutorial requires a basic understanding of [**Python**](/freecodecamp.org/learning-python-from-zero-to-hero-120ea540b567/).

---

## What Is PyPDF?

PyPDF is a pure Python library for working with PDF files. It allows you to open existing PDFs, read their structure, extract content, and create new PDF files. Since it’s written in Python, it doesn’t require external tools or system-level dependencies.

The library understands the internal layout of a PDF, such as pages, text streams, metadata, and encryption. You don’t need to know how PDFs work internally to use PyPDF, but it helps to understand that a PDF is not just text. It’s a structured document with objects and references.

PyPDF is often used in automation scripts, data pipelines, compliance systems, and document processing tools. It’s a common choice when you need a reliable and simple solution without heavy dependencies.

---

## Installing PyPDF

Installing PyPDF is straightforward. You can install it using pip, which is the standard package manager for Python.

```sh
pip install pypdf
```

Once installed, you can import it in your Python code. The main class you’ll use is PdfReader for reading files and PdfWriter for creating or modifying them.

```py
from pypdf import PdfReader, PdfWriter
```

With this setup, you’re ready to start working with PDFs.

---

## Reading a PDF File

The first step in most tasks is opening a PDF file. PyPDF makes this simple using the PdfReader class.

```py
from pypdf import PdfReader

reader = PdfReader("sample.pdf")
print(len(reader.pages))
```

This code opens a PDF file and prints the number of pages. Each page in the document is represented as an object that you can access and work with.

You can also inspect basic metadata such as the title or author if it’s available.

```py
metadata = reader.metadata
print(metadata)
```

Metadata is optional in PDFs, so not all files will contain meaningful values.

---

## Extracting Text from a PDF

One of the most common use cases is text extraction. PyPDF allows you to extract text page by page.

```py
from pypdf import PdfReader
reader = PdfReader("sample.pdf")

page = reader.pages[0]
text = page.extract_text()

print(text)
```

This code extracts text from the first page of the PDF. For many documents like reports or articles, this works well.

It’s important to understand that text extraction isn’t perfect. PDFs store text based on layout, not reading order. This means extracted text may appear out of order or missing spaces in some cases. Still, for most structured documents, PyPDF provides usable results.

If you want to extract text from all pages, you can loop through them.

```py
full_text = ""

for page in reader.pages:
    full_text += page.extract_text() + "\n"

print(full_text)
```

This approach is common when building search indexes or document analysis pipelines.

---

## Splitting a PDF into Multiple Files

Another practical task is splitting a PDF into smaller files. This is useful when dealing with large reports or scanned documents.

```py
from pypdf import PdfReader, PdfWriter

reader = PdfReader("sample.pdf")

for i, page in enumerate(reader.pages):
    writer = PdfWriter()
    writer.add_page(page)

with open(f"page_{i + 1}.pdf", "wb") as f:
        writer.write(f)
```

This code creates one PDF file per page. Each new file contains exactly one page from the original document.

You can also split a PDF into chunks, such as every five pages, by controlling how many pages you add before writing the file.

---

## Merging Multiple PDFs

Merging PDFs is another common requirement. PyPDF allows you to combine several PDF files into one.

```py
from pypdf import PdfReader, PdfWriter

writer = PdfWriter()

files = ["file1.pdf", "file2.pdf", "file3.pdf"]

for file in files:
    reader = PdfReader(file)
    for page in reader.pages:
        writer.add_page(page)

with open("merged.pdf", "wb") as f:
    writer.write(f)
```

This script reads each input file and appends all pages to a single output PDF. The order of files in the list defines the order in the merged document.

This approach is often used in reporting systems where multiple outputs are combined into one final document.

---

## Rotating and Modifying Pages

Sometimes you need to rotate pages, especially when working with scanned documents. PyPDF makes this easy.

```py
from pypdf import PdfReader, PdfWriter

reader = PdfReader("sample.pdf")
writer = PdfWriter()

page = reader.pages[0]
page.rotate(90)

writer.add_page(page)

with open("rotated.pdf", "wb") as f:
    writer.write(f)
```

This code rotates the first page by 90 degrees clockwise. You can apply similar logic to all pages or selected pages.

You can also crop pages by adjusting their media box, which controls page dimensions. This is useful when removing margins or focusing on a specific area.

---

## Encrypting and Decrypting PDFs

Security is important when handling sensitive documents. PyPDF supports PDF encryption and password protection.

```py
from pypdf import PdfReader, PdfWriter

reader = PdfReader("sample.pdf")
writer = PdfWriter()

for page in reader.pages:
    writer.add_page(page)

writer.encrypt("strongpassword")

with open("protected.pdf", "wb") as f:
    writer.write(f)
```

The resulting PDF requires a password to open. This is commonly used for sharing confidential reports or financial documents.

If you need to read an encrypted PDF, you can provide the password when opening it.

```py
reader = PdfReader("protected.pdf")
reader.decrypt("strongpassword")
```

After decryption, you can work with the file like any other PDF.

---

## Adding Metadata to a PDF

Metadata helps describe a document. You can add or update metadata using PyPDF.

```py
from pypdf import PdfWriter

writer = PdfWriter()
writer.add_metadata({
    "/Title": "Monthly Report",
    "/Author": "Finance Team",
    "/Subject": "Revenue Analysis"
})

with open("metadata.pdf", "wb") as f:
    writer.write(f)
```

This metadata becomes part of the PDF file and can be viewed in most PDF readers. It is useful for document management and search systems.

---

## Common Limitations of PyPDF

While PyPDF is powerful, it has limitations. It doesn’t perform [optical character recognition](https://freecodecamp.org/news/how-to-create-an-optical-character-reader-using-angular-and-azure-computer-vision/) (OCR), so it can’t extract text from scanned images. For scanned PDFs, you need OCR tools like Tesseract.

Complex layouts such as multi-column text or tables may not extract cleanly. In such cases, post-processing or layout-aware tools are needed.

Despite these limits, PyPDF is reliable for a large range of everyday PDF tasks.

---

## When to Use PyPDF

PyPDF is best suited for automation, backend services, and scripts where you need simple and fast PDF processing. It works well in data pipelines, compliance systems, and internal tools.

If you need advanced layout understanding or visual analysis, you may need heavier tools. But for most developers, PyPDF covers the core needs with minimal effort.

---

## Conclusion

PyPDF is a practical and easy-to-use library for working with PDF files in Python. It allows you to read documents, extract text, merge and split files, rotate pages, and add security with just a few lines of code.

Its simple API and lightweight design make it a strong choice for developers who want to automate PDF workflows without extra complexity. While it doesn’t solve every PDF problem, it handles the most common ones very well.

If you work with PDFs regularly, learning PyPDF is a valuable skill that can save time and reduce manual work across many projects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with PDF Files in Python: A PyPDF Guide",
  "desc": "PDF files are everywhere. They’re used for reports, invoices, bank statements, research papers, and legal documents. While PDFs are easy to read for humans, they’re not easy to work with in code. Extracting text, splitting pages, or merging files oft...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-pdf-files-in-python-a-pypdf-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
