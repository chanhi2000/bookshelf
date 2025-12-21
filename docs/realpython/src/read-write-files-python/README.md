---
lang: en-US
title: "Reading and Writing Files in Python (Guide)"
description: "Article(s) > Reading and Writing Files in Python (Guide)"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Reading and Writing Files in Python (Guide)"
    - property: og:description
      content: "Reading and Writing Files in Python (Guide)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/read-write-files-python/
prev: /programming/py/articles/README.md
date: 2019-02-20
isOriginal: false
author:
  - name: James Mertz
    url : https://realpython.com/team/jmertz/
cover: https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg
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
  name="Reading and Writing Files in Python (Guide)"
  desc="In this tutorial, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques."
  url="https://realpython.com/read-write-files-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: 

<SiteInfo
  name="Reading and Writing Files in Python - Real Python"
  desc="In this course, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques."
  url="https://realpython.com/courses/reading-and-writing-files-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

:::

One of the most common tasks that you can do with Python is reading and writing files. Whether it’s writing to a simple text file, reading a complicated server log, or even analyzing raw byte data, all of these situations require reading or writing a file.

::: info In this tutorial, you’ll learn

- What makes up a file and why that’s important in Python
- The basics of reading and writing files in Python
- Some basic scenarios of reading and writing files

:::

This tutorial is mainly for beginner to intermediate Pythonistas, but there are some tips in here that more advanced programmers may appreciate as well.

::: info Quiz - Reading and Writing Files in Python

<SiteInfo
  name="Reading and Writing Files in Python Quiz - Real Python"
  desc="A quiz used for testing the user's knowledge of the topics covered in the Reading and Writing Files in Python article."
  url="https://realpython.com/quizzes/read-write-files-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

A quiz used for testing the user's knowledge of the topics covered in the Reading and Writing Files in Python article.

:::

```component VPCard
{
  "title": "What Is a File?",
  "desc": "(1/4) Reading and Writing Files in Python (Guide)",
  "link": "/realpython.com/read-write-files-python/what-is-a-file.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Opening and Closing a File in Python",
  "desc": "(2/4) Reading and Writing Files in Python (Guide)",
  "link": "/realpython.com/read-write-files-python/opening-and-closing-a-file-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Reading and Writing Opened Files",
  "desc": "(3/4) Reading and Writing Files in Python (Guide)",
  "link": "/realpython.com/read-write-files-python/reading-and-writing-opened-files.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Tips and Tricks",
  "desc": "(4/4) Reading and Writing Files in Python (Guide)",
  "link": "/realpython.com/read-write-files-python/tips-and-tricks.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Don’t Re-Invent the Snake

There are common situations that you may encounter while working with files. Most of these cases can be handled using other modules. Two common file types you may need to work with are `.csv` and `.json`. *Real Python* has already put together some great articles on how to handle these:

- [**Reading and Writing CSV Files in Python**](/realpython.com/python-csv.md)
- [**Working With JSON Data in Python**](/realpython.com/python-json/README.md)

Additionally, there are built-in libraries out there that you can use to help you:

- [<VPIcon icon="fa-brands fa-python"/>`wave`](https://docs.python.org/3.7/library/wave.html): read and write WAV files (audio)
- [<VPIcon icon="fa-brands fa-python"/>`aifc`](https://docs.python.org/3/library/aifc.html): read and write AIFF and AIFC files (audio)
- [<VPIcon icon="fa-brands fa-python"/>`sunau`](https://docs.python.org/3/library/sunau.html): read and write Sun AU files
- [<VPIcon icon="fa-brands fa-python"/>`tarfile`](https://docs.python.org/3/library/tarfile.html): read and write tar archive files
- [<VPIcon icon="fa-brands fa-python"/>`zipfile`](https://docs.python.org/3/library/zipfile.html): work with ZIP archives
- [<VPIcon icon="fa-brands fa-python"/>`configparser`](https://docs.python.org/3/library/configparser.html): easily create and parse configuration files
- [<VPIcon icon="fa-brands fa-python"/>`xml.etree.ElementTree`](https://docs.python.org/3/library/xml.etree.elementtree.html): create or read XML based files
- [<VPIcon icon="fa-brands fa-python"/>`msilib`](https://docs.python.org/3/library/msilib.html): read and write Microsoft Installer files
- [<VPIcon icon="fa-brands fa-python"/>`plistlib`](https://docs.python.org/3/library/plistlib.html): generate and parse Mac OS X `.plist` files

There are plenty more out there. Additionally there are even more third party tools available on PyPI. Some popular ones are the following:

- [<VPIcon icon="iconfont icon-pypi"/>`PyPDF2`](https://pypi.org/project/PyPDF2/): PDF toolkit
- [<VPIcon icon="iconfont icon-pypi"/>`xlwings`](https://pypi.org/project/xlwings/): read and write Excel files
- [**`Pillow`**](/realpython.com/image-processing-with-the-python-pillow-library.md): image reading and manipulation

---

## You’re a File Wizard Harry!

You did it! You now know how to work with files with Python, including some advanced techniques. Working with files in Python should now be easier than ever and is a rewarding feeling when you start doing it.

In this tutorial you’ve learned:

- What a file is
- How to open and close files properly
- How to read and write files
- Some advanced techniques when working with files
- Some libraries to work with common file types

If you have any questions, hit us up in the comments.

::: info Quiz - Reading and Writing Files in Python

<SiteInfo
  name="Reading and Writing Files in Python Quiz - Real Python"
  desc="A quiz used for testing the user's knowledge of the topics covered in the Reading and Writing Files in Python article."
  url="https://realpython.com/quizzes/read-write-files-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

A quiz used for testing the user's knowledge of the topics covered in the Reading and Writing Files in Python article.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding: 

<SiteInfo
  name="Reading and Writing Files in Python - Real Python"
  desc="In this course, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques."
  url="https://realpython.com/courses/reading-and-writing-files-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Reading and Writing Files in Python (Guide)",
  "desc": "In this tutorial, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/read-write-files-python.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
