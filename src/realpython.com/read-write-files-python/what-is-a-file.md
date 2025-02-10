---
lang: en-US
title: "What Is a File?"
description: "Article(s) > (1/4) Reading and Writing Files in Python (Guide)"
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
      content: "Article(s) > (1/4) Reading and Writing Files in Python (Guide)"
    - property: og:description
      content: "What Is a File?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/read-write-files-python/what-is-a-file.html
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
  "title": "Reading and Writing Files in Python (Guide)",
  "desc": "In this tutorial, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques.",
  "link": "/realpython.com/read-write-files-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Reading and Writing Files in Python (Guide)"
  desc="In this tutorial, you'll learn about reading and writing files in Python. You'll cover everything from what a file is made up of to which libraries can help you along that way. You'll also take a look at some basic scenarios of file usage as well as some advanced techniques."
  url="https://realpython.com/read-write-files-python#what-is-a-file"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

Before we can go into how to work with files in Python, it’s important to understand what exactly a file is and how modern operating systems handle some of their aspects.

At its core, a file is a contiguous set of bytes [<FontIcon icon="fa-brands fa-wikipedia-w"/>used to store data](https://en.wikipedia.org/wiki/Computer_file). This data is organized in a specific format and can be anything as simple as a text file or as complicated as a program executable. In the end, these byte files are then translated into binary `1` and `0` for easier processing by the computer.

Files on most modern file systems are composed of three main parts:

1. **Header:** metadata about the contents of the file (file name, size, type, and so on)
2. **Data:** contents of the file as written by the creator or editor
3. **End of file (EOF):** special character that indicates the end of the file

![The file format with the header on top, data contents in the middle and the footer on the bottom.](https://files.realpython.com/media/FileFormat.02335d06829d.png)

What this data represents depends on the format specification used, which is typically represented by an extension. For example, a file that has an extension of `.gif` most likely conforms to the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Graphics Interchange Format](https://en.wikipedia.org/wiki/GIF) specification. There are hundreds, if not thousands, of [<FontIcon icon="fa-brands fa-wikipedia-w"/>file extensions](https://en.wikipedia.org/wiki/List_of_filename_extensions) out there. For this tutorial, you’ll only deal with `.txt` or `.csv` file extensions.

---

## File Paths

When you access a file on an operating system, a file path is required. The file path is a string that represents the location of a file. It’s broken up into three major parts:

1. **Folder Path:** the file folder location on the file system where subsequent folders are separated by a forward slash `/` (Unix) or backslash `` (Windows)
2. **File Name:** the actual name of the file
3. **Extension:** the end of the file path pre-pended with a period (`.`) used to indicate the file type

Here’s a quick example. Let’s say you have a file located within a file structure like this:

```plaintext title="file structure"
/
│
├── path/
|   │
│   ├── to/
│   │   └── cats.gif
│   │
│   └── dog_breeds.txt
|
└── animals.csv
```

Let’s say you wanted to access the <FontIcon icon="fas fa-file-image"/>`cats.gif` file, and your current location was in the same folder as <FontIcon icon="fas fa-folder-opne"/>`path`. In order to access the file, you need to go through the <FontIcon icon="fas fa-folder-opne"/>`path` folder and then the <FontIcon icon="fas fa-folder-opne"/>`to` folder, finally arriving at the <FontIcon icon="fas fa-file-image"/>`cats.gif` file. The Folder Path is <FontIcon icon="fas fa-folder-open"/>`path/to/`. The File Name is `cats`. The File Extension is <FontIcon icon="fas fa-file-image"/>`.gif`. So the full path is <FontIcon icon="fas fa-folder-open"/>`path/to/`<FontIcon icon="fas fa-file-image"/>`cats.gif`.

Now let’s say that your current location or current working directory (cwd) is in the <FontIcon icon="fas fa-folder-open"/>`to` folder of our example folder structure. Instead of referring to the <FontIcon icon="fas fa-file-image"/>`cats.gif` by the full path of <FontIcon icon="fas fa-folder-open"/>`path/to/`<FontIcon icon="fas fa-file-mage"/>`cats.gif`, the file can be simply referenced by the file name and extension <FontIcon icon="fas fa-file-image"/>`cats.gif`.

```plaintext title="file structure"
/
│
├── path/
|   │
|   ├── to/  ← Your current working directory (cwd) is here
|   │   └── cats.gif  ← Accessing this file
|   │
|   └── dog_breeds.txt
|
└── animals.csv
```

But what about <FontIcon icon="fas fa-file-lines"/>`dog_breeds.txt`? How would you access that without using the full path? You can use the special characters double-dot (`..`) to move one directory up. This means that `../dog_breeds.txt` will reference the <FontIcon icon="fas fa-file-lines"/>`dog_breeds.txt` file from the directory of `to`:

```plaintext title="file structure"
/
│
├── path/  ← Referencing this parent folder
|   │
|   ├── to/  ← Current working directory (cwd)
|   │   └── cats.gif
|   │
|   └── dog_breeds.txt  ← Accessing this file
|
└── animals.csv
```

The double-dot (`..`) can be chained together to traverse multiple directories above the current directory. For example, to access <FontIcon icon="fas fa-file-csv"/>`animals.csv` from the <FontIcon icon="fas fa-folder-open"/>`to` folder, you would use `../../animals.csv`.

---

## Line Endings

One problem often encountered when [**working with file data**](/realpython.com/working-with-files-in-python.md) is the representation of a new line or line ending. The line ending has its roots from back in the Morse Code era, [<FontIcon icon="fa-brands fa-wikipedia-w"/>when a specific pro-sign was used to communicate the end of a transmission or the end of a line](https://en.wikipedia.org/wiki/Prosigns_for_Morse_code#Official_International_Morse_code_procedure_signs).

Later, this [<FontIcon icon="fa-brands fa-wikipedia-w"/>was standardized for teleprinters](https://en.wikipedia.org/wiki/Newline#History) by both the International Organization for Standardization (ISO) and the American Standards Association (ASA). ASA standard states that line endings should use the sequence of the Carriage Return (`CR` or `\r`) *and* the Line Feed (`LF` or `\n`) characters (`CR+LF` or `\r\n`). The ISO standard however allowed for either the `CR+LF` characters or just the `LF` character.

[<FontIcon icon="fa-brands fa-stack-exchange"/>Windows uses the `CR+LF` characters](https://unix.stackexchange.com/a/411830) to indicate a new line, while Unix and the newer Mac versions use just the `LF` character. This can cause some complications when you’re processing files on an operating system that is different than the file’s source. Here’s a quick example. Let’s say that we examine the file <FontIcon icon="fas fa-file-lines"/>`dog_breeds.txt` that was created on a Windows system:

```plaintext title="dog_breeds.txt"
Pug\r\n
Jack Russell Terrier\r\n
English Springer Spaniel\r\n
German Shepherd\r\n
Staffordshire Bull Terrier\r\n
Cavalier King Charles Spaniel\r\n
Golden Retriever\r\n
West Highland White Terrier\r\n
Boxer\r\n
Border Terrier\r\n
```

This same output will be interpreted on a Unix device differently:

```plaintext title="dog_breeds.txt"
Pug\r
\n
Jack Russell Terrier\r
\n
English Springer Spaniel\r
\n
German Shepherd\r
\n
Staffordshire Bull Terrier\r
\n
Cavalier King Charles Spaniel\r
\n
Golden Retriever\r
\n
West Highland White Terrier\r
\n
Boxer\r
\n
Border Terrier\r
\n
```

This can make iterating over each line problematic, and you may need to account for situations like this.

---

## Character Encodings

Another common problem that you may face is the encoding of the byte data. An encoding is a translation from byte data to human readable characters. This is typically done by assigning a numerical value to represent a character. The two most common encodings are the [<FontIcon icon="fas fa-globe"/>ASCII](https://ascii-code.com/) and [<FontIcon icon="fas fa-globe"/>UNICODE](https://unicode.org/) Formats. [<FontIcon icon="fa-brands fa-wikipedia-w"/>ASCII can only store 128 characters](https://en.wikipedia.org/wiki/ASCII), while [<FontIcon icon="fa-brands fa-wikipedia-w"/>Unicode can contain up to 1,114,112 characters](https://en.wikipedia.org/wiki/Unicode).

ASCII is actually a subset of [**Unicode**](/realpython.com/python-encodings-guide.md) (UTF-8), meaning that ASCII and Unicode share the same numerical to character values. It’s important to note that parsing a file with the incorrect character encoding can lead to failures or misrepresentation of the character. For example, if a file was created using the UTF-8 encoding, and you try to parse it using the ASCII encoding, if there is a character that is outside of those 128 values, then an error will be thrown.
