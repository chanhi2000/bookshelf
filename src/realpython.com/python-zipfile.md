---
lang: en-US
title: "Python's zipfile: Manipulate Your ZIP Files Efficiently"
description: "Article(s) > Python's zipfile: Manipulate Your ZIP Files Efficiently"
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
      content: "Article(s) > Python's zipfile: Manipulate Your ZIP Files Efficiently"
    - property: og:description
      content: "Python's zipfile: Manipulate Your ZIP Files Efficiently"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-zipfile.html
prev: /programming/py/articles/README.md
date: 2022-02-14
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Using-ZIP-Files-With-Python_Watermarked.220b1d6e93a4.jpg
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
  name="Python's zipfile: Manipulate Your ZIP Files Efficiently"
  desc="In this guided tutorial, you'll learn how to manipulate ZIP files using Python's zipfile module from the standard library. Through hands-on examples, you'll learn how to read, write, compress, and extract files from your ZIP files quickly."
  url="https://realpython.com/python-zipfile"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Using-ZIP-Files-With-Python_Watermarked.220b1d6e93a4.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Manipulating ZIP Files With Python - Real Python"
  desc="In this video course, you'll learn how to manipulate ZIP files using Python's zipfile module from the standard library. Through hands-on examples, you'll learn how to read, write, compress, and extract files from your ZIP files quickly."
  url="https://realpython.com/courses/zipfile-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Using-ZIP-Files-With-Python_Watermarked.220b1d6e93a4.jpg"/>

:::

Python’s [<FontIcon icon="fa-brands fa-python"/>`zipfile`](https://docs.python.org/3/library/zipfile.html) is a standard library module intended to manipulate **ZIP files**. This file format is a widely adopted industry standard when it comes to archiving and compressing digital data. You can use it to package together several related files. It also allows you to reduce the size of your files and save disk space. Most importantly, it facilitates data exchange over computer networks.

Knowing how to create, read, write, populate, extract, and list ZIP files using the `zipfile` module is a useful skill to have as a Python developer or a DevOps engineer.

::: info In this tutorial, you’ll learn how to

- **Read, write, and extract** files from ZIP files with Python’s `zipfile`
- Read **metadata** about the content of ZIP files using `zipfile`
- Use `zipfile` to **manipulate member files** in existing ZIP files
- Create **new ZIP files** to archive and compress files

:::

If you commonly deal with ZIP files, then this knowledge can help to streamline your workflow to process your files confidently.

To get the most out of this tutorial, you should know the basics of [**working with files**](/realpython.com/working-with-files-in-python.md), using the [**`with` statement**](/realpython.com/python-with-statement/README.md), handling file system paths with [**`pathlib`**](/realpython.com/python-pathlib.md), and working with classes and [**object-oriented programming**](/realpython.com/python3-object-oriented-programming.md).

To get the files and archives that you’ll use to code the examples in this tutorial, click the link below:

---

## Getting Started With ZIP Files

**ZIP files** are a well-known and popular tool in today’s digital world. These files are fairly popular and widely used for cross-platform data exchange over computer networks, notably the Internet.

You can use ZIP files for bundling regular files together into a single archive, compressing your data to save some disk space, distributing your digital products, and more. In this tutorial, you’ll learn how to manipulate ZIP files using Python’s `zipfile` module.

Because the terminology around ZIP files can be confusing at times, this tutorial will stick to the following conventions regarding terminology:

| Term | Meaning |
| :--- | :--- |
| ZIP file, ZIP archive, or archive | A physical file that uses the [<FontIcon icon="fa-brands fa-wikipedia-w"/>ZIP file format](https://en.wikipedia.org/wiki/ZIP_(file_format)) |
| File | A regular [<FontIcon icon="fa-brands fa-wikipedia-w"/>computer file](https://en.wikipedia.org/wiki/Computer_file) |
| Member file | A file that is part of an existing ZIP file |

Having these terms clear in your mind will help you avoid confusion while you read through the upcoming sections. Now you’re ready to continue learning how to manipulate ZIP files efficiently in your Python code!

### What Is a ZIP File?

You’ve probably already encountered and worked with ZIP files. Yes, those with the<FontIcon icon="fas fa-file-zipper"/> `.zip` file extension are everywhere! ZIP files, also known as **ZIP archives**, are files that use the **ZIP file format**.

[<FontIcon icon="fa-brands fa-wikipedia-w"/>PKWARE](https://en.wikipedia.org/wiki/PKWARE,_Inc.) is the company that created and first implemented this file format. The company put together and maintains the current [<FontIcon icon="fas fa-globe"/>format specification](https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT), which is publicly available and allows the creation of products, programs, and processes that read and write files using the ZIP file format.

The ZIP file format is a cross-platform, interoperable file storage and transfer format. It combines [<FontIcon icon="fa-brands fa-wikipedia-w"/>lossless data compression](https://en.wikipedia.org/wiki/Lossless_compression), file management, and data [<FontIcon icon="fa-brands fa-wikipedia-w"/>encryption](https://en.wikipedia.org/wiki/Encryption).

Data compression isn’t a requirement for an archive to be considered a ZIP file. So you can have compressed or uncompressed member files in your ZIP archives. The ZIP file format supports several compression algorithms, though [<FontIcon icon="fa-brands fa-wikipedia-w"/>Deflate](https://en.wikipedia.org/wiki/Deflate) is the most common. The format also supports information integrity checks with [<FontIcon icon="fa-brands fa-wikipedia-w"/>CRC32](https://en.wikipedia.org/wiki/Cyclic_redundancy_check).

Even though there are other similar archiving formats, such as [<FontIcon icon="fa-brands fa-wikipedia-w"/>RAR](https://en.wikipedia.org/wiki/RAR_(file_format)) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>TAR](https://en.wikipedia.org/wiki/Tar_(computing)#File_format) files, the ZIP file format has quickly become a common standard for efficient data storage and for data exchange over computer networks.

ZIP files are everywhere. For example, office suites such as [<FontIcon icon="fa-brands fa-wikipedia-w"/>Microsoft Office](https://en.wikipedia.org/wiki/Microsoft_Office) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>Libre Office](https://en.wikipedia.org/wiki/LibreOffice) rely on the ZIP file format as their [<FontIcon icon="fas fa-globe"/>document container file](https://iso.org/standard/60101.html). This means that `.docx`, `.xlsx`, `.pptx`, `.odt`, `.ods`, and `.odp` files are actually ZIP archives containing several files and folders that make up each document. Other common files that use the ZIP format include [<FontIcon icon="fa-brands fa-wikipedia-w"/>`.jar`](https://en.wikipedia.org/wiki/JAR_(file_format)), [<FontIcon icon="fa-brands fa-wikipedia-w"/>`.war`](https://en.wikipedia.org/wiki/WAR_(file_format)), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>`.epub`](https://en.wikipedia.org/wiki/EPUB) files.

You may be familiar with [**GitHub**](/realpython.com/python-git-github-intro.md), which provides web hosting for software development and [<FontIcon icon="fa-brands fa-wikipedia-w"/>version control](https://en.wikipedia.org/wiki/Version_control) using [**Git**](/realpython.com/advanced-git-for-pythonistas.md). GitHub uses ZIP files to package software projects when you download them to your local computer. For example, you can download the [exercise solutions (<FontIcon icon="iconfont icon-github"/>`realpython/python-basics-exercises`)](https://github.com/realpython/python-basics-exercises/archive/refs/heads/master.zip) for [<FontIcon icon="fas fa-globe"/>*Python Basics: A Practical Introduction to Python 3*](https://realpython.com/products/python-basics-book/) book in a ZIP file, or you can download any other project of your choice.

ZIP files allow you to aggregate, compress, and encrypt files into a single interoperable and portable container. You can stream ZIP files, split them into segments, make them self-extracting, and more.

### Why Use ZIP Files?

Knowing how to create, read, write, and extract ZIP files can be a useful skill for developers and professionals who work with computers and digital information. Among other benefits, ZIP files allow you to:

- **Reduce the size of files** and their storage requirements without losing information
- **Improve transfer speed over the network** due to reduced size and single-file transfer
- **Pack several related files together** into a single archive for efficient management
- **Bundle your code into a single archive** for distribution purposes
- **Secure your data by using encryption**, which is a common requirement nowadays
- **Guarantee the integrity of your information** to avoid accidental and malicious changes to your data

These features make ZIP files a useful addition to your Python toolbox if you’re looking for a flexible, portable, and reliable way to archive your digital files.

### Can Python Manipulate ZIP Files?

Yes! Python has several tools that allow you to manipulate ZIP files. Some of these tools are available in the Python [<FontIcon icon="fa-brands fa-python"/>standard library](https://docs.python.org/3/library/index.html). They include low-level libraries for compressing and decompressing data using specific compression algorithms, such as [<FontIcon icon="fa-brands fa-python"/>`zlib`](https://docs.python.org/3/library/zlib.html#module-zlib), [`bz2`](https://docs.python.org/3/library/bz2.html#module-bz2), [<FontIcon icon="fa-brands fa-python"/>`lzma`](https://docs.python.org/3/library/lzma.html#module-lzma), and [others](#using-other-libraries-to-manage-zip-files).

Python also provides a high-level module called `zipfile` specifically designed to create, read, write, extract, and list the content of ZIP files. In this tutorial, you’ll learn about Python’s `zipfile` and how to use it effectively.

---

## Manipulating Existing ZIP Files With Python’s `zipfile`

Python’s `zipfile` provides convenient classes and functions that allow you to create, read, write, extract, and list the content of your ZIP files. Here are some additional features that `zipfile` supports:

- ZIP files greater than 4 GiB ([<FontIcon icon="fa-brands fa-wikipedia-w"/>ZIP64 files](https://en.wikipedia.org/wiki/ZIP_(file_format)#ZIP64))
- Data decryption
- Several compression algorithms, such as Deflate, [<FontIcon icon="fa-brands fa-wikipedia-w"/>Bzip2](https://en.wikipedia.org/wiki/Bzip2), and [<FontIcon icon="fa-brands fa-wikipedia-w"/>LZMA](https://en.wikipedia.org/wiki/Lempel%E2%80%93Ziv%E2%80%93Markov_chain_algorithm)
- Information integrity checks with CRC32

Be aware that `zipfile` does have a few limitations. For example, the current data decryption feature can be pretty slow because it uses pure Python code. The module can’t handle the creation of encrypted ZIP files. Finally, the use of multi-disk ZIP files isn’t supported either. Despite these limitations, `zipfile` is still a great and useful tool. Keep reading to explore its capabilities.

### Opening ZIP Files for Reading and Writing

In the `zipfile` module, you’ll find the [<FontIcon icon="fa-brands fa-python"/>`ZipFile`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile) class. This class works pretty much like Python’s built-in [**`open()`**](/realpython.com/read-write-files-python/opening-and-closing-a-file-in-python.md) function, allowing you to open your ZIP files using different modes. The read mode (`"r"`) is the default. You can also use the write (`"w"`), append (`"a"`), and exclusive (`"x"`) modes. You’ll learn more about each of these in a moment.

`ZipFile` implements the **context manager protocol** so that you can use the class in a [**`with` statement**](/realpython.com/python-with-statement/README.md). This feature allows you to quickly open and work with a ZIP file without worrying about [**closing the file**](/realpython.com/why-close-file-python.md) after you finish your work.

Before writing any code, make sure you have a copy of the files and archives that you’ll be using:

To get your working environment ready, place the downloaded resources into a directory called `python-zipfile/` in your home folder. Once you have the files in the right place, move to the newly created directory and fire up a Python interactive session there.

To warm up, you’ll start by reading the ZIP file called <FontIcon icon="fas fa-file-zipper"/>`sample.zip`. To do that, you can use `ZipFile` in reading mode:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    archive.printdir()
# 
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# realpython.md                             2021-09-07 19:50:10          428
```

The first argument to the initializer of `ZipFile` can be a [**string**](/realpython.com/python-strings.md) representing the path to the ZIP file that you need to open. This argument can accept [<FontIcon icon="fa-brands fa-python"/>file-like](https://docs.python.org/3/glossary.html#term-file-object) and [<FontIcon icon="fa-brands fa-python"/>path-like](https://docs.python.org/3/glossary.html#term-path-like-object) objects too. In this example, you use a string-based path.

The second argument to `ZipFile` is a single-letter string representing the mode that you’ll use to open the file. As you learned at the beginning of this section, `ZipFile` can accept four possible modes, depending on your needs. The `mode` [**positional argument**](/realpython.com/defining-your-own-python-function.md#positional-arguments) defaults to `"r"`, so you can get rid of it if you want to open the archive for reading only.

Inside the `with` statement, you call [<FontIcon icon="fa-brands fa-python"/>`.printdir()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.printdir) on `archive`. The `archive` [**variable**](/realpython.com/python-variables.md) now holds the instance of `ZipFile` itself. This function provides a quick way to display the content of the underlying ZIP file on your screen. The function’s output has a user-friendly tabular format with three informative columns:

- `File Name`
- `Modified`
- `Size`

If you want to make sure that you’re targeting a valid ZIP file before you try to open it, then you can wrap `ZipFile` in a [**`try` … `except`**](/realpython.com/python-exceptions.md#the-try-and-except-block-handling-exceptions) statement and catch any [<FontIcon icon="fa-brands fa-python"/>`BadZipFile`](https://docs.python.org/3/library/zipfile.html#zipfile.BadZipFile) exception:

```py
import zipfile

try:
    with zipfile.ZipFile("sample.zip") as archive:
        archive.printdir()
except zipfile.BadZipFile as error:
    print(error)
#
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# realpython.md                             2021-09-07 19:50:10          428

try:
    with zipfile.ZipFile("bad_sample.zip") as archive:
        archive.printdir()
except zipfile.BadZipFile as error:
    print(error)
# 
# File is not a zip file
```

The first example successfully opens <FontIcon icon="fas fa-file-zipper"/>`sample.zip` without raising a `BadZipFile` exception. That’s because <FontIcon icon="fas fa-file-zipper"/>`sample.zip` has a valid ZIP format. On the other hand, the second example doesn’t succeed in opening <FontIcon icon="fas fa-file-zipper"/>`bad_sample.zip`, because the file is not a valid ZIP file.

To check for a valid ZIP file, you can also use the [<FontIcon icon="fa-brands fa-python"/>`is_zipfile()`](https://docs.python.org/3/library/zipfile.html#zipfile.is_zipfile) function:

```py
import zipfile

if zipfile.is_zipfile("sample.zip"):
    with zipfile.ZipFile("sample.zip", "r") as archive:
        archive.printdir()
else:
    print("File is not a zip file")
# 
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# realpython.md                             2021-09-07 19:50:10          428

if zipfile.is_zipfile("bad_sample.zip"):
    with zipfile.ZipFile("bad_sample.zip", "r") as archive:
        archive.printdir()
else:
    print("File is not a zip file")
# 
# File is not a zip file
```

In these examples, you use a [**conditional statement**](/realpython.com/python-conditional-statements.md) with `is_zipfile()` as a condition. This function takes a `filename` argument that holds the path to a ZIP file in your file system. This argument can accept string, file-like, or path-like objects. The function returns `True` if `filename` is a valid ZIP file. Otherwise, it returns `False`.

Now say you want to add <FontIcon icon="fas fa-file-lines"/>`hello.txt` to a <FontIcon icon="fas fa-file-zipper"/>`hello.zip` archive using `ZipFile`. To do that, you can use the write mode (`"w"`). This mode opens a ZIP file for writing. If the target ZIP file exists, then the `"w"` mode truncates it and writes any new content you pass in.

::: note

If you’re using `ZipFile` with existing files, then you should be careful with the `"w"` mode. You can truncate your ZIP file and lose all the original content.

:::

If the target ZIP file doesn’t exist, then `ZipFile` creates it for you when you close the archive:

```py
import zipfile

with zipfile.ZipFile("hello.zip", mode="w") as archive:
    archive.write("hello.txt")
```

After running this code, you’ll have a <FontIcon icon="fas fa-file-zipper"/>`hello.zip` file in your <FontIcon icon="fas fa-folder-open"/>`python-zipfile/` directory. If you list the file content using `.printdir()`, then you’ll notice that <FontIcon icon="fas fa-file-lines"/>`hello.txt` will be there. In this example, you call [<FontIcon icon="fa-brands fa-python"/>`.write()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.write) on the `ZipFile` object. This method allows you to write member files into your ZIP archives. Note that the argument to `.write()` should be an existing file.

::: note

`ZipFile` is smart enough to create a new archive when you use the class in writing mode and the target archive doesn’t exist. However, the class doesn’t create new directories in the path to the target ZIP file if those directories don’t already exist.

That explains why the following code won’t work:

```py
import zipfile

with zipfile.ZipFile("missing/hello.zip", mode="w") as archive:
    archive.write("hello.txt")
# 
# Traceback (most recent call last):
#  ...
# FileNotFoundError: [Errno 2] No such file or directory: 'missing/hello.zip'
```

Because the <FontIcon icon="fas fa-folder-open"/>`missing/` directory in the path to the target <FontIcon icon="fas fa-file-zipper"/>`hello.zip` file doesn’t exist, you get a [<FontIcon icon="fa-brands fa-python"/>`FileNotFoundError`](https://docs.python.org/3/library/exceptions.html#FileNotFoundError) exception.

:::

The append mode (`"a"`) allows you to *append* new member files to an existing ZIP file. This mode doesn’t truncate the archive, so its original content is safe. If the target ZIP file doesn’t exist, then the `"a"` mode creates a new one for you and then appends any input files that you pass as an argument to `.write()`.

To try out the `"a"` mode, go ahead and add the <FontIcon icon="fas fa-file-lines"/>`new_hello.txt` file to your newly created <FontIcon icon="fas fa-file-zipper"/>`hello.zip` archive:

```py
import zipfile

with zipfile.ZipFile("hello.zip", mode="a") as archive:
    archive.write("new_hello.txt")

with zipfile.ZipFile("hello.zip") as archive:
    archive.printdir()
#
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# new_hello.txt                             2021-08-31 17:13:44           13
```

Here, you use the append mode to add <FontIcon icon="fas fa-file-lines"/>`new_hello.txt` to the <FontIcon icon="fas fa-file-zipper"/>`hello.zip` file. Then you run `.printdir()` to confirm that the new file is present in the ZIP file.

`ZipFile` also supports an exclusive mode (`"x"`). This mode allows you to *exclusively* create new ZIP files and write new member files into them. You’ll use the exclusive mode when you want to make a new ZIP file without overwriting an existing one. If the target file already exists, then you get [<FontIcon icon="fa-brands fa-python"/>`FileExistsError`](https://docs.python.org/3/library/exceptions.html#FileExistsError).

Finally, if you create a ZIP file using the `"w"`, `"a"`, or `"x"` mode and then close the archive without adding any member files, then `ZipFile` creates an empty archive with the appropriate ZIP format.

### Reading Metadata From ZIP Files

You’ve already put `.printdir()` into action. It’s a useful method that you can use to list the content of your ZIP files quickly. Along with `.printdir()`, the `ZipFile` class provides several handy methods for extracting metadata from existing ZIP files.

Here’s a summary of those methods:

| Method | Description |
| :--- | :--- |
| [<FontIcon icon="fa-brands fa-python"/>`.getinfo(filename)`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.getinfo) | Returns a [<FontIcon icon="fa-brands fa-python"/>`ZipInfo`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipInfo) object with information about the member file provided by `filename`. Note that `filename` must hold the path to the target file inside the underlying ZIP file. |
| [<FontIcon icon="fa-brands fa-python"/>`.infolist()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.infolist) | Returns a [**list**](/realpython.com/python-lists-tuples.md) of [<FontIcon icon="fa-brands fa-python"/>`ZipInfo`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipInfo) objects, one per member file. |
| [<FontIcon icon="fa-brands fa-python"/>`.namelist()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.namelist) | Returns a list holding the names of all the member files in the underlying archive. The names in this list are valid arguments to `.getinfo()`. |

With these three tools, you can retrieve a lot of useful information about the content of your ZIP files. For example, take a look at the following example, which uses `.getinfo()`:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    info = archive.getinfo("hello.txt")

info.file_size
#
# 83

info.compress_size
#
# 83

info.filename
# 
# 'hello.txt'

info.date_time
# 
# (2021, 9, 7, 19, 50, 10)
```

As you learned in the table above, `.getinfo()` takes a member file as an argument and returns a `ZipInfo` object with information about it.

::: note

`ZipInfo` isn’t intended to be instantiated directly. The `.getinfo()` and `.infolist()` methods return `ZipInfo` objects automatically when you call them. However, `ZipInfo` includes a [**class method**](/realpython.com/instance-class-and-static-methods-demystified.md) called [<FontIcon icon="fa-brands fa-python"/>`.from_file()`](https://docs.python.org/3/library/zipfile.html?highlight=zipfile#zipfile.ZipInfo.from_file), which allows you to instantiate the class explicitly if you ever need to do it.

:::

`ZipInfo` objects have several attributes that allow you to retrieve valuable information about the target member file. For example, [<FontIcon icon="fa-brands fa-python"/>`.file_size`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipInfo.file_size) and [<FontIcon icon="fa-brands fa-python"/>`.compress_size`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipInfo.compress_size) hold the size, in bytes, of the original and compressed files, respectively. The class also has some other useful attributes, such as [<FontIcon icon="fa-brands fa-python"/>`.filename`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipInfo.filename) and [<FontIcon icon="fa-brands fa-python"/>`.date_time`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipInfo.date_time), which return the filename and the last modification date.

::: note

By default, `ZipFile` doesn’t compress the input files to add them to the final archive. That’s why the size and the compressed size are the same in the above example. You’ll learn more about this topic in the [Compressing Files and Directories](#compressing-files-and-directories) section below.

:::

With `.infolist()`, you can extract information from all the files in a given archive. Here’s an example that uses this method to generate a minimal report with information about all the member files in your <FontIcon icon="fas fa-file-zipper"/>`sample.zip` archive:

```py
import datetime
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    for info in archive.infolist():
        print(f"Filename: {info.filename}")
        print(f"Modified: {datetime.datetime(*info.date_time)}")
        print(f"Normal size: {info.file_size} bytes")
        print(f"Compressed size: {info.compress_size} bytes")
        print("-" * 20)
# 
# Filename: hello.txt
# Modified: 2021-09-07 19:50:10
# Normal size: 83 bytes
# Compressed size: 83 bytes
# --------------------
# Filename: lorem.md
# Modified: 2021-09-07 19:50:10
# Normal size: 2609 bytes
# Compressed size: 2609 bytes
# --------------------
# Filename: realpython.md
# Modified: 2021-09-07 19:50:10
# Normal size: 428 bytes
# Compressed size: 428 bytes
# --------------------
```

The [**`for` loop**](/realpython.com/python-for-loop.md) iterates over the `ZipInfo` objects from `.infolist()`, retrieving the filename, the last modification date, the normal size, and the compressed size of each member file. In this example, you’ve used [**`datetime`**](/realpython.com/python-datetime/README.md) to format the date in a human-readable way.

::: note

The example above was adapted from [<FontIcon icon="fas fa-globe"/>zipfile — ZIP Archive Access](https://pymotw.com/3/zipfile/).

```component VPCard
{
  "title": "zipfile — ZIP Archive Access — PyMOTW 3",
  "desc": "The zipfile module can be used to manipulate ZIP archive files, the format popularized by the PC program PKZIP.",
  "link": "https://pymotw.com/3/zipfile/",
  "logo": "https://pymotw.com/_static/favicon.png",
  "background": "rgba(41,42,131,0.2)"
}
```

:::

If you just need to perform a quick check on a ZIP file and list the names of its member files, then you can use `.namelist()`:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    for filename in archive.namelist():
        print(filename)
# 
# hello.txt
# lorem.md
# realpython.md
```

Because the filenames in this output are valid arguments to `.getinfo()`, you can combine these two methods to retrieve information about selected member files only.

For example, you may have a ZIP file containing different types of member files (`.docx`, <FontIcon icon="iconfont icon-xls"/>`.xlsx`, <FontIcon icon="fas fa-file-lines"/> `.txt`, and so on). Instead of getting the complete information with `.infolist()`, you just need to get the information about the `.docx` files. Then you can filter the files by their extension and call `.getinfo()` on your `.docx` files only. Go ahead and give it a try!

### Reading From and Writing to Member Files

Sometimes you have a ZIP file and need to read the content of a given member file without extracting it. To do that, you can use [<FontIcon icon="fa-brands fa-python"/>`.read()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.read). This method takes a member file’s `name` and returns that file’s content as [**bytes**](/realpython.com/python-data-structures.md#bytes-immutable-arrays-of-single-bytes):

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    for line in archive.read("hello.txt").split(b"\n"):
        print(line)
# 
# b'Hello, Pythonista!'
# b''
# b'Welcome to Real Python!'
# b''
# b"Ready to try Python's zipfile module?"
# b''
```

To use `.read()`, you need to open the ZIP file for reading or appending. Note that `.read()` returns the content of the target file as a stream of bytes. In this example, you use `.split()` to split the stream into lines, using the [**line feed**](/realpython.com/python-data-types.md#applying-special-meaning-to-characters) character `"\n"` as a separator. Because `.split()` is operating on a byte object, you need to add a leading `b` to the string used as an argument.

`ZipFile.read()` also accepts a second positional argument called `pwd`. This argument allows you to provide a password for reading encrypted files. To try this feature, you can rely on the <FontIcon icon="fas fa-file-zipper"/>`sample_pwd.zip` file that you downloaded with the material for this tutorial:

```py :collapsed-lines
import zipfile

with zipfile.ZipFile("sample_pwd.zip", mode="r") as archive:
    for line in archive.read("hello.txt", pwd=b"secret").split(b"\n"):
        print(line)
# 
# b'Hello, Pythonista!'
# b''
# b'Welcome to Real Python!'
# b''
# b"Ready to try Python's zipfile module?"
# b''

with zipfile.ZipFile("sample_pwd.zip", mode="r") as archive:
    for line in archive.read("hello.txt").split(b"\n"):
        print(line)
# 
# Traceback (most recent call last):
#  ...
# RuntimeError: File 'hello.txt' is encrypted, password required for extraction
```

In the first example, you provide the password `secret` to read your encrypted file. The `pwd` argument accepts values of the bytes type. If you use `.read()` on an encrypted file without providing the required password, then you get a `RuntimeError`, as you can note in the second example.

::: note

Python’s `zipfile` supports decryption. However, it doesn’t support the creation of encrypted ZIP files. That’s why you would need to use an external file archiver to encrypt your files.

Some popular file archivers include [<FontIcon icon="fa-brands fa-wikipedia-w"/>7z](https://en.wikipedia.org/wiki/7-Zip) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>WinRAR](https://en.wikipedia.org/wiki/WinRAR) for Windows, [<FontIcon icon="fa-brands fa-wikipedia-w"/>Ark](https://en.wikipedia.org/wiki/Ark_(software)) and [<FontIcon icon="fa-brands fa-wikipedia-w"/>GNOME Archive Manager](https://en.wikipedia.org/wiki/GNOME_Archive_Manager) for Linux, and [<FontIcon icon="fas fa-globe"/>Archiver](https://archiverapp.com/) for macOS.

:::

For large encrypted ZIP files, keep in mind that the decryption operation can be extremely slow because it’s implemented in pure Python. In such cases, consider using a specialized program to handle your archives instead of using `zipfile`.

If you regularly work with encrypted files, then you may want to avoid providing the decryption password every time you call `.read()` or another method that accepts a `pwd` argument. If that’s the case, you can use [<FontIcon icon="fa-brands fa-python"/>`ZipFile.setpassword()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.setpassword) to set a global password:

```py :collapsed-lines
import zipfile

with zipfile.ZipFile("sample_pwd.zip", mode="r") as archive:
    archive.setpassword(b"secret")
    for file in archive.namelist():
        print(file)
        print("-" * 20)
        for line in archive.read(file).split(b"\n"):
            print(line)
# 
# hello.txt
# --------------------
# b'Hello, Pythonista!'
# b''
# b'Welcome to Real Python!'
# b''
# b"Ready to try Python's zipfile module?"
# b''
# lorem.md
# --------------------
# b'# Lorem Ipsum'
# b''
# b'Lorem ipsum dolor sit amet, consectetur adipiscing elit.
# ...
```

With `.setpassword()`, you just need to provide your password once. `ZipFile` uses that unique password for decrypting all the member files.

In contrast, if you have ZIP files with different passwords for individual member files, then you need to provide the specific password for each file using the `pwd` argument of `.read()`:

```py
import zipfile

with zipfile.ZipFile("sample_file_pwd.zip", mode="r") as archive:
    for line in archive.read("hello.txt", pwd=b"secret1").split(b"\n"):
        print(line)
# 
# b'Hello, Pythonista!'
# b''
# b'Welcome to Real Python!'
# b''
# b"Ready to try Python's zipfile module?"
# b''

with zipfile.ZipFile("sample_file_pwd.zip", mode="r") as archive:
    for line in archive.read("lorem.md", pwd=b"secret2").split(b"\n"):
        print(line)
# 
# b'# Lorem Ipsum'
# b''
# b'Lorem ipsum dolor sit amet, consectetur adipiscing elit.
#  ...
```

In this example, you use `secret1` as a password to read <FontIcon icon="fas fa-file-lines"/>`hello.txt` and `secret2` to read `lorem.md`. A final detail to consider is that when you use the `pwd` argument, you’re overriding whatever archive-level password you may have set with `.setpassword()`.

::: note

Calling `.read()` on a ZIP file that uses an unsupported compression method raises a [<FontIcon icon="fa-brands fa-python"/>`NotImplementedError`](https://docs.python.org/3/library/exceptions.html#NotImplementedError). You also get an error if the required compression module isn’t available in your Python installation.

:::

If you’re looking for a more flexible way to read from member files and create and add new member files to an archive, then [<FontIcon icon="fa-brands fa-python"/>`ZipFile.open()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.open) is for you. Like the built-in `open()` function, this method implements the context manager protocol, and therefore it supports the `with` statement:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    with archive.open("hello.txt", mode="r") as hello:
        for line in hello:
            print(line)
# 
# b'Hello, Pythonista!\n'
# b'\n'
# b'Welcome to Real Python!\n'
# b'\n'
# b"Ready to try Python's zipfile module?\n"
```

In this example, you open <FontIcon icon="fas fa-file-lines"/>`hello.txt` for reading. The first argument to `.open()` is `name`, indicating the member file that you want to open. The second argument is the mode, which defaults to `"r"` as usual. `ZipFile.open()` also accepts a `pwd` argument for opening encrypted files. This argument works the same as the equivalent `pwd` argument in `.read()`.

You can also use `.open()` with the `"w"` mode. This mode allows you to create a new member file, write content to it, and finally append the file to the underlying archive, which you should open in append mode:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="a") as archive:
    with archive.open("new_hello.txt", "w") as new_hello:
        new_hello.write(b"Hello, World!")
# 
# 13

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    archive.printdir()
    print("------")
    archive.read("new_hello.txt")
# 
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# realpython.md                             2021-09-07 19:50:10          428
# new_hello.txt                             1980-01-01 00:00:00           13
# ------
# b'Hello, World!'
```

In the first code snippet, you open <FontIcon icon="fas fa-file-zipper"/>`sample.zip` in append mode (`"a"`). Then you create <FontIcon icon="fas fa-file-lines"/>`new_hello.txt` by calling `.open()` with the `"w"` mode. This function returns a file-like object that supports [<FontIcon icon="fa-brands fa-python"/>`.write()`](https://docs.python.org/3.9/library/io.html#io.BufferedIOBase.write), which allows you to write bytes into the newly created file.

::: note

You need to supply a non-existing filename to `.open()`. If you use a filename that already exists in the underlying archive, then you’ll end up with a duplicated file and a [`UserWarning`](https://docs.python.org/3.9/library/exceptions.html#UserWarning) exception.

:::

In this example, you write `b'Hello, World!'` into <FontIcon icon="fas fa-file-lines"/>`new_hello.txt`. When the execution flow exits the inner `with` statement, Python writes the input bytes to the member file. When the outer `with` statement exits, Python writes <FontIcon icon="fas fa-file-lines"/>`new_hello.txt` to the underlying ZIP file, <FontIcon icon="fas fa-file-zipper"/>`sample.zip`.

The second code snippet confirms that <FontIcon icon="fas fa-file-lines"/>`new_hello.txt` is now a member file of <FontIcon icon="fas fa-file-zipper"/>`sample.zip`. A detail to notice in the output of this example is that `.write()` sets the `Modified` date of the newly added file to `1980-01-01 00:00:00`, which is a weird behavior that you should keep in mind when using this method.

### Reading the Content of Member Files as Text

As you learned in the above section, you can use the `.read()` and `.write()` methods to read from and write to member files without extracting them from the containing ZIP archive. Both of these methods work exclusively with bytes.

However, when you have a ZIP archive containing text files, you may want to read their content as text instead of as bytes. There are at least two way to do this. You can use:

1. [<FontIcon icon="fa-brands fa-python"/>`bytes.decode()`](https://docs.python.org/3/library/stdtypes.html#bytes.decode)
2. [<FontIcon icon="fa-brands fa-python"/>`io.TextIOWrapper`](https://docs.python.org/3/library/io.html#io.TextIOWrapper)

Because `ZipFile.read()` returns the content of the target member file as bytes, `.decode()` can operate on these bytes directly. The `.decode()` method decodes a `bytes` object into a string using a given [<FontIcon icon="fa-brands fa-wikipedia-w"/>character encoding](https://en.wikipedia.org/wiki/Character_encoding) format.

Here’s how you can use `.decode()` to read text from the <FontIcon icon="fas fa-file-lines"/>`hello.txt` file in your <FontIcon icon="fas fa-file-zipper"/>`sample.zip` archive:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    text = archive.read("hello.txt").decode(encoding="utf-8")

print(text)
# 
# Hello, Pythonista!
# 
# Welcome to Real Python!
# 
# Ready to try Python's zipfile module?
```

In this example, you read the content of <FontIcon icon="fas fa-file-lines"/>`hello.txt` as bytes. Then you call `.decode()` to decode the bytes into a string using [<FontIcon icon="fa-brands fa-wikipedia-w"/>UTF-8](https://en.wikipedia.org/wiki/UTF-8) as [**encoding**](/realpython.com/python-encodings-guide.md). To set the `encoding` argument, you use the `"utf-8"` string. However, you can use any other valid encoding, such as [<FontIcon icon="fa-brands fa-wikipedia-w"/>UTF-16](https://en.wikipedia.org/wiki/UTF-16) or [<FontIcon icon="fa-brands fa-wikipedia-w"/>cp1252](https://en.wikipedia.org/wiki/Windows-1252), which can be represented as case-insensitive strings. Note that `"utf-8"` is the default value of the `encoding` argument to `.decode()`.

It’s important to keep in mind that you need to know beforehand the character encoding format of any member file that you want to process using `.decode()`. If you use the wrong character encoding, then your code will fail to correctly decode the underlying bytes into text, and you can end up with a ton of indecipherable characters.

The second option for reading text out of a member file is to use an `io.TextIOWrapper` object, which provides a buffered text stream. This time you need to use `.open()` instead of `.read()`. Here’s an example of using `io.TextIOWrapper` to read the content of the <FontIcon icon="fas fa-file-lines"/>`hello.txt` member file as a stream of text:

```py
import io
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    with archive.open("hello.txt", mode="r") as hello:
        for line in io.TextIOWrapper(hello, encoding="utf-8"):
            print(line.strip())
# 
# Hello, Pythonista!
# 
# Welcome to Real Python!
# 
# Ready to try Python's zipfile module?
```

In the inner `with` statement in this example, you open the <FontIcon icon="fas fa-file-lines"/>`hello.txt` member file from your <FontIcon icon="fas fa-file-zipper"/>`sample.zip` archive. Then you pass the resulting binary file-like object, `hello`, as an argument to `io.TextIOWrapper`. This creates a buffered text stream by decoding the content of `hello` using the UTF-8 character encoding format. As a result, you get a stream of text directly from your target member file.

Just like with `.encode()`, the `io.TextIOWrapper` class takes an `encoding` argument. You should always specify a value for this argument because the [**default text encoding**](/realpython.com/python310-new-features.md#default-text-encodings) depends on the system running the code and may not be the right value for the file that you’re trying to decode.

### Extracting Member Files From Your ZIP Archives

Extracting the content of a given archive is one of the most common operations that you’ll do on ZIP files. Depending on your needs, you may want to extract a single file at a time or all the files in one go.

[<FontIcon icon="fa-brands fa-python"/>`ZipFile.extract()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.extract) allows you to accomplish the first task. This method takes the name of a `member` file and extracts it to a given directory signaled by `path`. The destination `path` defaults to the current directory:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    archive.extract("new_hello.txt", path="output_dir/")
# 
# 'output_dir/new_hello.txt'
```

Now <FontIcon icon="fas fa-file-lines"/>`new_hello.txt` will be in your <FontIcon icon="fas fa-folder-open"/>`output_dir/` directory. If the target filename already exists in the output directory, then `.extract()` overwrites it without asking for confirmation. If the output directory doesn’t exist, then `.extract()` creates it for you. Note that `.extract()` returns the path to the extracted file.

The name of the member file must be the file’s full name as returned by `.namelist()`. It can also be a `ZipInfo` object containing the file’s information.

You can also use `.extract()` with encrypted files. In that case, you need to provide the required `pwd` argument or set the archive-level password with `.setpassword()`.

When it comes to extracting all the member files from an archive, you can use [<FontIcon icon="fa-brands fa-python"/>`.extractall()`](https://docs.python.org/3/library/zipfile.html#zipfile.ZipFile.extractall). As its name implies, this method extracts all the member files to a destination path, which is the current directory by default:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    archive.extractall("output_dir/")
```

After running this code, all the current content of <FontIcon icon="fas fa-file-zipper"/>`sample.zip` will be in your <FontIcon icon="fas fa-folder-open"/>`output_dir/` directory. If you pass a non-existing directory to `.extractall()`, then this method automatically creates the directory. Finally, if any of the member files already exist in the destination directory, then `.extractall()` will overwrite them without asking for your confirmation, so be careful.

If you only need to extract some of the member files from a given archive, then you can use the `members` argument. This argument accepts a list of member files, which should be a subset of the whole list of files in the archive at hand. Finally, just like `.extract()`, the `.extractall()` method also accepts a `pwd` argument to extract encrypted files.

### Closing ZIP Files After Use

Sometimes, it’s convenient for you to open a given ZIP file without using a `with` statement. In those cases, you need to manually close the archive after use to complete any writing operations and to free the acquired resources.

To do that, you can call [<FontIcon icon="fa-brands fa-python"/>`.close()`](https://docs.python.org/3/library/zipfile.html?highlight=zipfile#zipfile.ZipFile.close) on your `ZipFile` object:

```py :collapsed-lines
import zipfile

archive = zipfile.ZipFile("sample.zip", mode="r")

# Use archive in different parts of your code
archive.printdir()
# 
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# realpython.md                             2021-09-07 19:50:10          428
# new_hello.txt                             1980-01-01 00:00:00           13

# Close the archive when you're done
archive.close()
archive
# 
# <zipfile.ZipFile [closed]>
```

The call to `.close()` closes `archive` for you. You must call `.close()` before exiting your program. Otherwise, some writing operations might not be executed. For example, if you open a ZIP file for appending (`"a"`) new member files, then you need to close the archive to write the files.

---

## Creating, Populating, and Extracting Your Own ZIP Files

So far, you’ve learned how to work with existing ZIP files. You’ve learned to read, write, and append member files to them by using the different modes of `ZipFile`. You’ve also learned how to read relevant metadata and how to extract the content of a given ZIP file.

In this section, you’ll code a few practical examples that’ll help you learn how to create ZIP files from several input files and from an entire directory using `zipfile` and other Python tools. You’ll also learn how to use `zipfile` for file compression and more.

### Creating a ZIP File From Multiple Regular Files

Sometimes you need to create a ZIP archive from several related files. This way, you can have all the files in a single container for distributing them over a computer network or sharing them with friends or colleagues. To this end, you can create a list of target files and write them into an archive using `ZipFile` and a loop:

```py
import zipfile

filenames = ["hello.txt", "lorem.md", "realpython.md"]

with zipfile.ZipFile("multiple_files.zip", mode="w") as archive:
    for filename in filenames:
        archive.write(filename)
```

Here, you create a `ZipFile` object with the desired archive name as its first argument. The `"w"` mode allows you to write member files into the final ZIP file.

The `for` loop iterates over your list of input files and writes them into the underlying ZIP file using `.write()`. Once the execution flow exits the `with` statement, `ZipFile` automatically closes the archive, saving the changes for you. Now you have a <FontIcon icon="fas fa-file-zipper"/>`multiple_files.zip` archive containing all the files from your original list of files.

### Building a ZIP File From a Directory

Bundling the content of a directory into a single archive is another everyday use case for ZIP files. Python has several tools that you can use with `zipfile` to approach this task. For example, you can use [**`pathlib`**](/realpython.com/python-pathlib.md) to [**read the content of a given directory**](/realpython.com/get-all-files-in-directory-python.md). With that information, you can create a container archive using `ZipFile`.

In the `python-zipfile/` directory, you have a subdirectory called <FontIcon icon="fas fa-folder-open"/>`source_dir/`, with the following content:

```plaintext title="folder structure"
source_dir/
│
├── hello.txt
├── lorem.md
└── realpython.md
```

In <FontIcon icon="fas fa-folder-open"/>`source_dir/`, you only have three regular files. Because the directory doesn’t contain subdirectories, you can use [<FontIcon icon="fa-brands fa-python"/>`pathlib.Path.iterdir()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.iterdir) to iterate over its content directly. With this idea in mind, here’s how you can build a ZIP file from the content of <FontIcon icon="fas fa-folder-open"/>`source_dir/`:

```py :collapsed-lines
import pathlib
import zipfile

directory = pathlib.Path("source_dir/")

with zipfile.ZipFile("directory.zip", mode="w") as archive:
    for file_path in directory.iterdir():
        archive.write(file_path, arcname=file_path.name)

with zipfile.ZipFile("directory.zip", mode="r") as archive:
    archive.printdir()
# 
# File Name                                        Modified             Size
# realpython.md                             2021-09-07 19:50:10          428
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
```

In this example, you create a [<FontIcon icon="fa-brands fa-python"/>`pathlib.Path`](https://docs.python.org/3/library/pathlib.html#pathlib.Path) object from your source directory. The first `with` statement creates a `ZipFile` object ready for writing. Then the call to `.iterdir()` returns an iterator over the entries in the underlying directory.

Because you don’t have any subdirectories in <FontIcon icon="fas fa-folder-open"/>`source_dir/`, the `.iterdir()` function yields only files. The `for` loop iterates over the files and writes them into the archive.

In this case, you pass `file_path.name` to the second argument of `.write()`. This argument is called `arcname` and holds the name of the member file inside the resulting archive. All the examples that you’ve seen so far rely on the default value of `arcname`, which is the same filename you pass as the first argument to `.write()`.

If you don’t pass `file_path.name` to `arcname`, then your source directory will be at the root of your ZIP file, which can also be a valid result depending on your needs.

Now check out the <FontIcon icon="fas fa-folder-open"/>`root_dir/` folder in your working directory. In this case, you’ll find the following structure:

```plaintext title="folder structure"
root_dir/
│
├── sub_dir/
│   └── new_hello.txt
│
├── hello.txt
├── lorem.md
└── realpython.md
```

You have the usual files and a subdirectory with a single file in it. If you want to create a ZIP file with this same internal structure, then you need a tool that [**recursively**](/realpython.com/python-recursion.md) iterates through the [**directory tree**](/realpython.com/directory-tree-generator-python.md) under `root_dir/`.

Here’s how to zip a complete directory tree, like the one above, using `zipfile` along with `Path.rglob()` from the `pathlib` module:

```py
import pathlib
import zipfile

directory = pathlib.Path("root_dir/")

with zipfile.ZipFile("directory_tree.zip", mode="w") as archive:
    for file_path in directory.rglob("*"):
        archive.write(
            file_path,
            arcname=file_path.relative_to(directory)
        )

with zipfile.ZipFile("directory_tree.zip", mode="r") as archive:
    archive.printdir()
# 
# File Name                                        Modified             Size
# sub_dir/                                  2021-09-09 20:52:14            0
# realpython.md                             2021-09-07 19:50:10          428
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# sub_dir/new_hello.txt                     2021-08-31 17:13:44           13
```

In this example, you use [<FontIcon icon="fa-brands fa-python"/>`Path.rglob()`](https://docs.python.org/3/library/pathlib.html#pathlib.Path.rglob) to recursively traverse the [**directory tree**](/realpython.com/directory-tree-generator-python.md) under <FontIcon icon="fas fa-folder-open"/>`root_dir/`. Then you write every file and subdirectory to the target ZIP archive.

This time, you use [<FontIcon icon="fa-brands fa-python"/>`Path.relative_to()`](https://docs.python.org/3/library/pathlib.html#pathlib.PurePath.is_relative_to) to get the relative path to each file and then pass the result to the second argument of `.write()`. This way, the resulting ZIP file ends up with the same internal structure as your original source directory. Again, you can get rid of this argument if you want your source directory to be at the root of your ZIP file.

### Compressing Files and Directories

If your files are taking up too much disk space, then you might consider compressing them. Python’s `zipfile` supports a few popular compression methods. However, the module doesn’t compress your files by default. If you want to make your files smaller, then you need to explicitly supply a compression method to `ZipFile`.

Typically, you’ll use the term **stored** to refer to member files written into a ZIP file without compression. That’s why the default compression method of `ZipFile` is called [<FontIcon icon="fa-brands fa-python"/>ZIP_STORED](https://docs.python.org/3/library/zipfile.html#zipfile.ZIP_STORED), which actually refers to *uncompressed* member files that are simply stored in the containing archive.

The `compression` method is the third argument to the initializer of `ZipFile`. If you want to compress your files while you write them into a ZIP archive, then you can set this argument to one of the following constants:

| Constant | Compression Method | Required Module |
| --- | --- | --- |
| `zipfile.ZIP_DEFLATED` | Deflate | `zlib` |
| `zipfile.ZIP_BZIP2` | Bzip2 | `bz2` |
| `zipfile.ZIP_LZMA` | LZMA | `lzma` |

These are the compression methods that you can currently use with `ZipFile`. A different method will raise a [<FontIcon icon="fa-brands fa-python"/>`NotImplementedError`](https://docs.python.org/3/library/exceptions.html#NotImplementedError). There are no additional compression methods available to `zipfile` as of Python 3.10. As an additional requirement, if you choose one of these methods, then the compression module that supports it must be available in your Python installation. Otherwise, you’ll get a [<FontIcon icon="fa-brands fa-python"/>`RuntimeError`](https://docs.python.org/3/library/exceptions.html#RuntimeError) exception, and your code will break.

Another relevant argument of `ZipFile` when it comes to compressing your files is `compresslevel`. This argument controls which compression level you use.

With the Deflate method, `compresslevel` can take integer [**numbers**](/realpython.com/python-numbers.md) from `0` through `9`. With the Bzip2 method, you can pass integers from `1` through `9`. In both cases, when the compression level increases, you get higher compression and lower compression speed.

::: note

Binary files, such as PNG, JPG, MP3, and the like, already use some kind of compression. As a result, adding them to a ZIP file may not make the data any smaller, because it’s already compressed to some level.

:::

Now say you want to archive and compress the content of a given directory using the Deflate method, which is the most commonly used method in ZIP files. To do that, you can run the following code:

```py
import pathlib
from zipfile import ZipFile, ZIP_DEFLATED

directory = pathlib.Path("source_dir/")

with ZipFile("comp_dir.zip", "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for file_path in directory.rglob("*"):
        archive.write(file_path, arcname=file_path.relative_to(directory))

```

In this example, you pass `9` to `compresslevel` to get maximum compression. To provide this argument, you use a [**keyword argument**](/realpython.com/defining-your-own-python-function.md#keyword-arguments). You need to do this because `compresslevel` isn’t the fourth [**positional argument**](/realpython.com/defining-your-own-python-function.md#positional-arguments) to the `ZipFile` initializer.

::: note

The initializer of `ZipFile` takes a fourth argument called `allowZip64`. It’s a [**Boolean**](/realpython.com/python-boolean.md) argument that tells `ZipFile` to create ZIP files with the `.zip64` extension for files larger than 4 GB.

:::

After running this code, you’ll have a <FontIcon icon="fas fa-file-zipper"/>`comp_dir.zip` file in your current directory. If you compare the size of that file with the size of your original <FontIcon icon="fas fa-file-zipper"/>`sample.zip` file, then you’ll note a significant size reduction.

### Creating ZIP Files Sequentially

Creating ZIP files sequentially can be another common requirement in your day-to-day programming. For example, you may need to create an initial ZIP file with or without content and then append new member files as soon as they become available. In this situation, you need to open and close the target ZIP file multiple times.

To solve this problem, you can use `ZipFile` in append mode (`"a"`), as you have already done. This mode allows you to safely append new member files to a ZIP archive without truncating its current content:

```py :collapsed-lines
import zipfile

def append_member(zip_file, member):
    with zipfile.ZipFile(zip_file, mode="a") as archive:
        archive.write(member)


def get_file_from_stream():
    """Simulate a stream of files."""
    for file in ["hello.txt", "lorem.md", "realpython.md"]:
        yield file


for filename in get_file_from_stream():
    append_member("incremental.zip", filename)


with zipfile.ZipFile("incremental.zip", mode="r") as archive:
    archive.printdir()
# 
# File Name                                        Modified             Size
# hello.txt                                 2021-09-07 19:50:10           83
# lorem.md                                  2021-09-07 19:50:10         2609
# realpython.md                             2021-09-07 19:50:10          428
```

In this example, `append_member()` is a [**function**](/realpython.com/defining-your-own-python-function.md) that appends a file (`member`) to the input ZIP archive (`zip_file`). To perform this action, the function opens and closes the target archive every time you call it. Using a function to perform this task allows you to reuse the code as many times as you need.

The `get_file_from_stream()` function is a [**generator function**](/realpython.com/introduction-to-python-generators.md) simulating a stream of files to process. Meanwhile, the `for` loop sequentially adds member files to <FontIcon icon="fas fa-file-zipper"/>`incremental.zip` using `append_member()`. If you check your working directory after running this code, then you’ll find an <FontIcon icon="fas fa-file-zipper"/>`incremental.zip` archive containing the three files that you passed into the loop.

### Extracting Files and Directories

One of the most common operations you’ll ever perform on ZIP files is to extract their content to a given directory in your file system. You already learned the basics of using `.extract()` and `.extractall()` to extract one or all the files from an archive.

As an additional example, get back to your <FontIcon icon="fas fa-file-zipper"/>`sample.zip` file. At this point, the archive contains four files of different types. You have two<FontIcon icon="fas fa-file-lines"/> `.txt` files and two <FontIcon icon="fa-brands fa-markdown"/>`.md` files. Now say you want to extract only the <FontIcon icon="fa-brands fa-markdown"/>`.md` files. To do so, you can run the following code:

```py
import zipfile

with zipfile.ZipFile("sample.zip", mode="r") as archive:
    for file in archive.namelist():
        if file.endswith(".md"):
            archive.extract(file, "output_dir/")
# 
# 'output_dir/lorem.md'
# 'output_dir/realpython.md'
```

The `with` statement opens <FontIcon icon="fas fa-file-zipper"/>`sample.zip` for reading. The loop iterates over each file in the archive using `namelist()`, while the conditional statement checks if the filename ends with the `.md` extension. If it does, then you extract the file at hand to a target directory, <FontIcon icon="fas fa-folder-open"/>`output_dir/`, using `.extract()`.

---

## Exploring Additional Classes From `zipfile`

So far, you’ve learned about `ZipFile` and `ZipInfo`, which are two of the classes available in `zipfile`. This module also provides two more classes that can be handy in some situations. Those classes are [<FontIcon icon="fa-brands fa-python"/>`zipfile.Path`](https://docs.python.org/3/library/zipfile.html#zipfile.Path) and [<FontIcon icon="fa-brands fa-python"/>`zipfile.PyZipFile`](https://docs.python.org/3/library/zipfile.html#zipfile.PyZipFile). In the following two sections, you’ll learn the basics of these classes and their main features.

### Finding `Path` in a ZIP File

When you open a ZIP file with your favorite archiver application, you see the archive’s internal structure. You may have files at the root of the archive. You may also have subdirectories with more files. The archive looks like a normal directory on your file system, with each file located at a specific path.

The `zipfile.Path` class allows you to construct path objects to quickly create and manage paths to member files and directories inside a given ZIP file. The class takes two arguments:

- **`root`** accepts a ZIP file, either as a `ZipFile` object or a string-based path to a physical ZIP file.
- **`at`** holds the location of a specific member file or directory inside the archive. It defaults to the empty string, representing the root of the archive.

With your old friend <FontIcon icon="fas fa-file-zipper"/>`sample.zip` as the target, run the following code:

```py
import zipfile

hello_txt = zipfile.Path("sample.zip", "hello.txt")

hello_txt
# 
# Path('sample.zip', 'hello.txt')

hello_txt.name
# 
# 'hello.txt'

hello_txt.is_file()
#
# True

hello_txt.exists()
#
# True

print(hello_txt.read_text())
# 
# Hello, Pythonista!
# 
# Welcome to Real Python!
# 
# Ready to try Python's zipfile module?
```

This code shows that `zipfile.Path` implements several features that are common to a `pathlib.Path` object. You can get the name of the file with `.name`. You can check if the path points to a regular file with `.is_file()`. You can check if a given file exists inside a particular ZIP file, and more.

`Path` also provides an `.open()` method to open a member file using different modes. For example, the code below opens <FontIcon icon="fas fa-file-lines"/>`hello.txt` for reading:

```py
import zipfile

hello_txt = zipfile.Path("sample.zip", "hello.txt")

with hello_txt.open(mode="r") as hello:
    for line in hello:
        print(line)
# 
# Hello, Pythonista!
# 
# Welcome to Real Python!
# 
# Ready to try Python's zipfile module?
```

With `Path`, you can quickly create a path object pointing to a specific member file in a given ZIP file and access its content immediately using `.open()`.

Just like with a `pathlib.Path` object, you can list the content of a ZIP file by calling [<FontIcon icon="fa-brands fa-python"/>`.iterdir()`](https://docs.python.org/3/library/zipfile.html#zipfile.Path.iterdir) on a `zipfile.Path` object:

```py
import zipfile

root = zipfile.Path("sample.zip")
root
# 
# Path('sample.zip', '')

root.is_dir()
#
# True

list(root.iterdir())
# 
# [
#  Path('sample.zip', 'hello.txt'),
#  Path('sample.zip', 'lorem.md'),
#  Path('sample.zip', 'realpython.md')
# ]
```

It’s clear that `zipfile.Path` provides many useful features that you can use to manage member files in your ZIP archives in almost no time.

### Building Importable ZIP Files With `PyZipFile`

Another useful class in `zipfile` is [<FontIcon icon="fa-brands fa-python"/>`PyZipFile`](https://docs.python.org/3.9/library/zipfile.html#zipfile.PyZipFile). This class is pretty similar to `ZipFile`, and it’s especially handy when you need to bundle Python modules and packages into ZIP files. The main difference from `ZipFile` is that the initializer of `PyZipFile` takes an optional argument called `optimize`, which allows you to optimize the Python code by compiling it to [<FontIcon icon="fa-brands fa-python"/>bytecode](https://docs.python.org/3/glossary.html#term-bytecode) before archiving it.

`PyZipFile` provides the same interface as `ZipFile`, with the addition of [<FontIcon icon="fa-brands fa-python"/>`.writepy()`](https://docs.python.org/3/library/zipfile.html#pyzipfile-objects). This method can take a Python file (`.py`) as an argument and add it to the underlying ZIP file. If `optimize` is `-1` (the default), then the `.py` file is automatically compiled to a `.pyc` file and then added to the target archive. Why does this happen?

Since version 2.3, the Python interpreter has supported [<FontIcon icon="fa-brands fa-python"/>importing Python code from ZIP files](https://docs.python.org/3/whatsnew/2.3.html#pep-273-importing-modules-from-zip-archives), a capability known as [**Zip imports**](/realpython.com/python-zip-import.md). This feature is quite convenient. It allows you to create **importable ZIP files** to distribute your [**modules and packages**](/realpython.com/python-modules-packages.md) as a single archive.

::: note

You can also use the ZIP file format to create and distribute Python executable applications, which are commonly known as Python Zip applications. To learn how to create them, check out [**z**](/realpython.com/python-zipapp.md).

:::

`PyZipFile` is helpful when you need to generate importable ZIP files. Packaging the `.pyc` file rather than the `.py` file makes the importing process way more efficient because it skips the compilation step.

Inside the <FontIcon icon="fas fa-folder-open"/>`python-zipfile/` directory, you have a <FontIcon icon="fa-brands fa-python"/>`hello.py` module with the following content:

```py title="hello.py"
def greet(name="World"):
    """Print a greeting message."""
    print(f"Hello, {name}! Welcome to Real Python!")
```

This code defines a function called `greet()`, which takes `name` as an argument and [**prints**](/realpython.com/python-print/README.md) a greeting message to the screen. Now say you want to package this module into a ZIP file for distribution purposes. To do that, you can run the following code:

```py
import zipfile

with zipfile.PyZipFile("hello.zip", mode="w") as zip_module:
    zip_module.writepy("hello.py")

with zipfile.PyZipFile("hello.zip", mode="r") as zip_module:
    zip_module.printdir()
# 
# File Name                                        Modified             Size
# hello.pyc                                 2021-09-13 13:25:56          311
```

In this example, the call to `.writepy()` automatically compiles <FontIcon icon="fa-brands fa-python"/>`hello.py` to `hello.pyc` and stores it in <FontIcon icon="fas fa-file-zipper"/>`hello.zip`. This becomes clear when you list the archive’s content using `.printdir()`.

Once you have <FontIcon icon="fa-brands fa-python"/>`hello.py` bundled into a ZIP file, then you can use Python’s [**import**](/realpython.com/python-import.md) system to import this module from its containing archive:

```py
import sys

# Insert the archive into sys.path
sys.path.insert(0, "/home/user/python-zipfile/hello.zip")
sys.path[0]
# 
# '/home/user/python-zipfile/hello.zip'

# Import and use the code
import hello

hello.greet("Pythonista")
# 
# Hello, Pythonista! Welcome to Real Python!
```

The first step to import code from a ZIP file is to make that file available in [<FontIcon icon="fa-brands fa-python"/>`sys.path`](https://docs.python.org/3/library/sys.html#sys.path). This [**variable**](/realpython.com/python-variables.md) holds a list of strings that specifies Python’s **search path** for modules. To add a new item to `sys.path`, you can use `.insert()`.

For this example to work, you need to change the placeholder path and pass the path to <FontIcon icon="fas fa-file-zipper"/>`hello.zip` on your file system. Once your importable ZIP file is in this list, then you can import your code just like you’d do with a regular module.

Finally, consider the <FontIcon icon="fas fa-folder-open"/>`hello/` subdirectory in your working folder. It contains a small Python package with the following structure:

```plaintext title="folder structure"
hello/
|
├── __init__.py
└── hello.py
```

The <FontIcon icon="fa-brands fa-python"/>`__init__.py` module turns the <FontIcon icon="fas fa-folder-open"/>`hello/` directory into a Python package. The <FontIcon icon="fa-brands fa-python"/>`hello.py` module is the same one that you used in the example above. Now suppose you want to bundle this package into a ZIP file. If that’s the case, then you can do the following:

```py
import zipfile

with zipfile.PyZipFile("hello.zip", mode="w") as zip_pkg:
    zip_pkg.writepy("hello")


with zipfile.PyZipFile("hello.zip", mode="r") as zip_pkg:
    zip_pkg.printdir()
# 
# File Name                                        Modified             Size
# hello/__init__.pyc                        2021-09-13 13:39:30          108
# hello/hello.pyc                           2021-09-13 13:39:30          317
```

The call to `.writepy()` takes the `hello` package as an argument, searches for `.py` files inside it, compiles them to `.pyc` files, and finally adds them to the target ZIP file, <FontIcon icon="fas fa-file-zipper"/>`hello.zip`. Again, you can import your code from this archive by following the steps that you learned before:

```py
import sys

sys.path.insert(0, "/home/user/python-zipfile/hello.zip")

from hello import hello

hello.greet("Pythonista")
#
# Hello, Pythonista! Welcome to Real Python!
```

Because your code is in a package now, you first need to import the `hello` module from the `hello` package. Then you can access your `greet()` function normally.

---

## Running `zipfile` From Your Command Line

Python’s `zipfile` also offers a minimal [**command-line interface**](//realpython.com/command-line-interfaces-python-argparse.md) that allows you to access the module’s main functionality quickly. For example, you can use the `-l` or `--list` option to list the content of an existing ZIP file:

```sh
python -m zipfile --list sample.zip
# 
# File Name                                         Modified             Size
# hello.txt                                  2021-09-07 19:50:10           83
# lorem.md                                   2021-09-07 19:50:10         2609
# realpython.md                              2021-09-07 19:50:10          428
# new_hello.txt                              1980-01-01 00:00:00           13
```

This command shows the same output as an equivalent call to `.printdir()` on the <FontIcon icon="fas fa-file-zipper"/>`sample.zip` archive.

Now say you want to create a new ZIP file containing several input files. In that case, you can use the `-c` or `--create` option:

```sh
python -m zipfile --create new_sample.zip hello.txt lorem.md realpython.md

python -m zipfile -l new_sample.zip
# 
# File Name                                         Modified             Size
# hello.txt                                  2021-09-07 19:50:10           83
# lorem.md                                   2021-09-07 19:50:10         2609
# realpython.md                              2021-09-07 19:50:10          428
```

This command creates a <FontIcon icon="fas fa-file-zipper"/>`new_sample.zip` file containing your <FontIcon icon="fas fa-file-lines"/>`hello.txt`, <FontIcon icon="fa-brands fa-markdown"/>`lorem.md`, <FontIcon icon="fa-brands fa-markdown"/>`realpython.md` files.

What if you need to create a ZIP file to archive an entire directory? For example, you may have your own <FontIcon icon="fas fa-foler-open"/>`source_dir/` with the same three files as the example above. You can create a ZIP file from that directory by using the following command:

```sh
python -m zipfile -c source_dir.zip source_dir/

python -m zipfile -l source_dir.zip
# 
# File Name                                         Modified             Size
# source_dir/                                2021-08-31 08:55:58            0
# source_dir/hello.txt                       2021-08-31 08:55:58           83
# source_dir/lorem.md                        2021-08-31 09:01:08         2609
# source_dir/realpython.md                   2021-08-31 09:31:22          428
```

With this command, `zipfile` places <FontIcon icon="fas fa-folder-open"/>`source_dir/` at the root of the resulting <FontIcon icon="fas fa-file-zipper"/>`source_dir.zip` file. As usual, you can list the archive content by running `zipfile` with the `-l` option.

::: note

When you use `zipfile` to create an archive from your command line, the library [implicitly uses (<FontIcon icon="iconfont icon-github"/>`python/cpython`)](https://github.com/python/cpython/blob/5c65834d801d6b4313eef0684a30e12c22ccfedd/Lib/zipfile.py#L2408) the Deflate compression algorithm when archiving your files.

:::

You can also extract all the content of a given ZIP file using the `-e` or `--extract` option from your command line:

```sh
python -m zipfile --extract sample.zip sample/
```

After running this command, you’ll have a new <FontIcon icon="fas fa-folder-open"/>`sample/` folder in your working directory. The new folder will contain the current files in your <FontIcon icon="fas fa-file-zipper"/>`sample.zip` archive.

The final option that you can use with `zipfile` from the command line is `-t` or `--test`. This option allows you to test if a given file is a valid ZIP file. Go ahead and give it a try!

---

## Using Other Libraries to Manage ZIP Files

There are a few other tools in the Python standard library that you can use to archive, compress, and decompress your files at a lower level. Python’s `zipfile` uses some of these internally, mainly for compression purposes. Here’s a summary of some of these tools:

| Module | Description |
| --- | --- |
| [<FontIcon icon="fa-brands fa-python"/>`zlib`](https://docs.python.org/3/library/zlib.html) | Allows compression and decompression using the [<FontIcon icon="fas fa-globe"/>zlib](https://zlib.net/) library |
| [<FontIcon icon="fa-brands fa-python"/>`bz2`](https://docs.python.org/3/library/bz2.html) | Provides an interface for compressing and decompressing data using the Bzip2 compression algorithm |
| [<FontIcon icon="fa-brands fa-python"/>`lzma`](https://docs.python.org/3/library/lzma.html) | Provides classes and functions for compressing and decompressing data using the LZMA compression algorithm |

Unlike `zipfile`, some of these modules allow you to compress and decompress data from memory and data streams other than regular files and archives.

In the Python standard library, you’ll also find [<FontIcon icon="fa-brands fa-python"/>`tarfile`](https://docs.python.org/3/library/tarfile.html), which supports the [<FontIcon icon="fa-brands fa-wikipedia-w"/>TAR](https://en.wikipedia.org/wiki/Tar_(computing)) archiving format. There’s also a module called [<FontIcon icon="fa-brands fa-python"/>`gzip`](https://docs.python.org/3/library/gzip.html), which provides an interface to compress and decompress data, similar to how the [<FontIcon icon="fas fa-globe"/>GNU Gzip](https://gnu.org/software/gzip/) program does it.

For example, you can use `gzip` to create a compressed file containing some text:

```py
import gzip

with gzip.open("hello.txt.gz", mode="wt") as gz_file:
    gz_file.write("Hello, World!")
# 
# 13
```

Once you run this code, you’ll have a `hello.txt.gz` archive containing a compressed version of <FontIcon icon="fas fa-file-lines"/>`hello.txt` in your current directory. Inside <FontIcon icon="fas fa-file-lines"/>`hello.txt`, you’ll find the text `Hello, World!`.

A quick and high-level way to create a ZIP file without using `zipfile` is to use [`shutil`](https://docs.python.org/3/library/shutil.html). This module allows you to perform several high-level operations on files and collections of files. When it comes to [<FontIcon icon="fa-brands fa-python"/>archiving operations](https://docs.python.org/3/library/shutil.html#archiving-operations), you have [<FontIcon icon="fa-brands fa-python"/>`make_archive()`](https://docs.python.org/3/library/shutil.html#shutil.make_archive), which can create archives, such as ZIP or TAR files:

```py
import shutil

shutil.make_archive("shutil_sample", format="zip", root_dir="source_dir/")
# 
# '/home/user/sample.zip'
```

This code creates a compressed file called <FontIcon icon="fas fa-file-zipper"/>`sample.zip` in your working directory. This ZIP file will contain all the files in the input directory, <FontIcon icon="fas fa-folder-open"/>`source_dir/`. The `make_archive()` function is convenient when you need a quick and high-level way to create your ZIP files in Python.

---

## Conclusion

Python’s `zipfile` is a handy tool when you need to read, write, compress, decompress, and extract files from **ZIP archives**. The [<FontIcon icon="fa-brands fa-wikipedia-w"/>ZIP file format](https://en.wikipedia.org/wiki/ZIP_(file_format)) has become an industry standard, allowing you to package and optionally compress your digital data.

The benefits of using ZIP files include archiving related files together, saving disk space, making it easy to transfer data over computer networks, bundling Python code for distribution purposes, and more.

::: info In this tutorial, you learned how to

- Use Python’s `zipfile` to **read, write, and extract** existing ZIP files
- Read **metadata** about the content of your ZIP files with `zipfile`
- Use `zipfile` to **manipulate member files** in existing ZIP files
- Create **your own ZIP files** to archive and compress your digital data

:::

You also learned how to use `zipfile` from your command line to list, create, and extract your ZIP files. With this knowledge, you’re ready to efficiently archive, compress, and manipulate your digital data using the ZIP file format.

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="[COURSE] Manipulating ZIP Files With Python - Real Python"
  desc="In this video course, you'll learn how to manipulate ZIP files using Python's zipfile module from the standard library. Through hands-on examples, you'll learn how to read, write, compress, and extract files from your ZIP files quickly."
  url="https://realpython.com/courses/zipfile-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Using-ZIP-Files-With-Python_Watermarked.220b1d6e93a4.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python's zipfile: Manipulate Your ZIP Files Efficiently",
  "desc": "In this guided tutorial, you'll learn how to manipulate ZIP files using Python's zipfile module from the standard library. Through hands-on examples, you'll learn how to read, write, compress, and extract files from your ZIP files quickly.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-zipfile.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
