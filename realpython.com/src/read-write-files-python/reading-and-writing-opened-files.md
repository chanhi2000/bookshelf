---
lang: en-US
title: "Reading and Writing Opened Files"
description: "Article(s) > (3/4) Reading and Writing Files in Python (Guide)"
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
      content: "Article(s) > (3/4) Reading and Writing Files in Python (Guide)"
    - property: og:description
      content: "Reading and Writing Opened Files"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/read-write-files-python/reading-and-writing-opened-files.html
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
  url="https://realpython.com/read-write-files-python#reading-and-writing-opened-files"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

Once you’ve opened up a file, you’ll want to read or write to the file. First off, let’s cover reading a file. There are multiple methods that can be called on a file object to help you out:

| Method | What It Does |
| ---: | :--- |
| [`.read(size=-1)`](https://docs.python.org/3.7/library/io.html#io.RawIOBase.read) | This reads from the file based on the number of `size` bytes. If no argument is passed or `None` or `-1` is passed, then the entire file is read. |
| [`.readline(size=-1)`](https://docs.python.org/3.7/library/io.html#io.IOBase.readline) | This reads at most `size` number of characters from the line. This continues to the end of the line and then wraps back around. If no argument is passed or `None` or `-1` is passed, then the entire line (or rest of the line) is read. |
| [`.readlines()`](https://docs.python.org/3.7/library/io.html#io.IOBase.readlines) | This reads the remaining lines from the file object and returns them as a list. |

Using the same <VPIcon icon="fas fa-file-lines"/>`dog_breeds.txt` file you used above, let’s go through some examples of how to use these methods. Here’s an example of how to open and read the entire file using `.read()`:

```py
with open('dog_breeds.txt', 'r') as reader:
    # Read & print the entire file
    print(reader.read())
# 
# Pug
# Jack Russell Terrier
# English Springer Spaniel
# German Shepherd
# Staffordshire Bull Terrier
# Cavalier King Charles Spaniel
# Golden Retriever
# West Highland White Terrier
# Boxer
# Border Terrier
```

Here’s an example of how to read 5 bytes of a line each time using the Python `.readline()` method:

```py
with open('dog_breeds.txt', 'r') as reader:
    # Read & print the first 5 characters of the line 5 times
    print(reader.readline(5))
    # Notice that line is greater than the 5 chars and continues
    # down the line, reading 5 chars each time until the end of the
    # line and then "wraps" around
    print(reader.readline(5))
    print(reader.readline(5))
    print(reader.readline(5))
    print(reader.readline(5))
# 
# Pug
# 
# Jack
# Russe
# ll Te
# rrier
```

Here’s an example of how to read the entire file as a list using the Python `.readlines()` method:

```py
f = open('dog_breeds.txt')
f.readlines()  # Returns a list object
# 
# ['Pug\n', 'Jack Russell Terrier\n', 'English Springer Spaniel\n', 'German Shepherd\n', 'Staffordshire Bull Terrier\n', 'Cavalier King Charles Spaniel\n', 'Golden Retriever\n', 'West Highland White Terrier\n', 'Boxer\n', 'Border Terrier\n']
```

The above example can also be done by using `list()` to create a list out of the file object:

```py
f = open('dog_breeds.txt')
list(f)
# 
# ['Pug\n', 'Jack Russell Terrier\n', 'English Springer Spaniel\n', 'German Shepherd\n', 'Staffordshire Bull Terrier\n', 'Cavalier King Charles Spaniel\n', 'Golden Retriever\n', 'West Highland White Terrier\n', 'Boxer\n', 'Border Terrier\n']
```

### Iterating Over Each Line in the File

A common thing to do while reading a file is to iterate over each line. Here’s an example of how to use the Python `.readline()` method to perform that iteration:

```py
with open('dog_breeds.txt', 'r') as reader:
    # Read and print the entire file line by line
    line = reader.readline()
    while line != '':  # The EOF char is an empty string
        print(line, end='')
        line = reader.readline()
# 
# Pug
# Jack Russell Terrier
# English Springer Spaniel
# German Shepherd
# Staffordshire Bull Terrier
# Cavalier King Charles Spaniel
# Golden Retriever
# West Highland White Terrier
# Boxer
# Border Terrier
```

Another way you could iterate over each line in the file is to use the Python `.readlines()` method of the file object. Remember, `.readlines()` returns a list where each element in the list represents a line in the file:

```py
with open('dog_breeds.txt', 'r') as reader:
    for line in reader.readlines():
        print(line, end='')
# 
# Pug
# Jack Russell Terrier
# English Springer Spaniel
# German Shepherd
# Staffordshire Bull Terrier
# Cavalier King Charles Spaniel
# Golden Retriever
# West Highland White Terrier
# Boxer
# Border Terrier
```

However, the above examples can be further simplified by iterating over the file object itself:

```py
with open('dog_breeds.txt', 'r') as reader:
    # Read and print the entire file line by line
    for line in reader:
        print(line, end='')
# 
# Pug
# Jack Russell Terrier
# English Springer Spaniel
# German Shepherd
# Staffordshire Bull Terrier
# Cavalier King Charles Spaniel
# Golden Retriever
# West Highland White Terrier
# Boxer
# Border Terrier
```

This final approach is more Pythonic and can be quicker and more memory efficient. Therefore, it is suggested you use this instead.

::: note

Some of the above examples contain `print('some text', end='')`. The `end=''` is to prevent Python from adding an additional newline to the text that is being printed and only [<VPIcon icon="fas fa-globe"/>print](https://realpython.com/courses/python-print/) what is being read from the file.

:::

Now let’s dive into writing files. As with reading files, file objects have multiple methods that are useful for writing to a file:

| Method | What It Does |
| ---: | :--- |
| `.write(string)` | This writes the string to the file. |
| `.writelines(seq)` | This writes the sequence to the file. No line endings are appended to each sequence item. It’s up to you to add the appropriate line ending(s). |

Here’s a quick example of using `.write()` and `.writelines()`:

```py
with open('dog_breeds.txt', 'r') as reader:
    # Note: readlines doesn't trim the line endings
    dog_breeds = reader.readlines()

with open('dog_breeds_reversed.txt', 'w') as writer:
    # Alternatively you could use
    # writer.writelines(reversed(dog_breeds))

    # Write the dog breeds to the file in reversed order
    for breed in reversed(dog_breeds):
        writer.write(breed)
```

### Working With Bytes

Sometimes, you may need to work with files using [<VPIcon icon="fa-brands fa-python"/>byte strings](https://docs.python.org/3.7/glossary.html#term-bytes-like-object). This is done by adding the `'b'` character to the `mode` argument. All of the same methods for the file object apply. However, each of the methods expect and return a `bytes` object instead:

```py
with open('dog_breeds.txt', 'rb') as reader:
    print(reader.readline())
# 
# b'Pug\n'
```

Opening a text file using the `b` flag isn’t that interesting. Let’s say we have this cute picture of a Jack Russell Terrier (<VPIcon icon="fas fa-file-image"/>`jack_russell.png`):

![Image: [<VPIcon icon="fas fa-globe"/>CC BY 3.0 (https://creativecommons.org/licenses/by/3.0) from Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jack_Russell_Terrier_1.jpg)](https://files.realpython.com/media/jack_russell.92348cb14537.png)

You can actually open that file in Python and examine the contents! Since the [<VPIcon icon="fa-brands fa-wikipedia-w"/>`.png` file format](https://en.wikipedia.org/wiki/Portable_Network_Graphics) is well defined, the header of the file is 8 bytes broken up like this:

| Value | Interpretation |
| ---: | :--- |
| `0x89` | A “magic” number to indicate that this is the start of a `PNG` |
| `0x50 0x4E 0x47` | `PNG` in ASCII |
| `0x0D 0x0A` | A DOS style line ending `\r\n` |
| `0x1A` | A DOS style EOF character |
| `0x0A` | A Unix style line ending `\n` |

Sure enough, when you open the file and read these bytes individually, you can see that this is indeed a `.png` header file:

```py
with open('jack_russell.png', 'rb') as byte_reader:
    print(byte_reader.read(1))
    print(byte_reader.read(3))
    print(byte_reader.read(2))
    print(byte_reader.read(1))
    print(byte_reader.read(1))
#
# b'\x89'
# b'PNG'
# b'\r\n'
# b'\x1a'
# b'\n'
```

### A Full Example: <VPIcon icon="fa-brands fa-python"/>`dos2unix.py`

Let’s bring this whole thing home and look at a full example of how to read and write to a file. The following is a [<VPIcon icon="fa-brands fa-wikipedia-w"/>`dos2unix`](https://en.wikipedia.org/wiki/Unix2dos) like tool that will convert a file that contains line endings of `\r\n` to `\n`.

This tool is broken up into three major sections. The first is `str2unix()`, which converts a string from `\r\n` line endings to `\n`. The second is `dos2unix()`, which converts a string that contains `\r\n` characters into `\n`. `dos2unix()` calls `str2unix()` internally. Finally, there’s the [**`__main__`**](/realpython.com/if-name-main-python.md) block, which is called only when the file is executed as a script. Think of it as the `main` function found in other programming languages.

```py :collapsed-lines
"""
A simple script and library to convert files or strings from dos like
line endings with Unix like line endings.
"""

import argparse
import os

def str2unix(input_str: str) -> str:
 r"""
 Converts the string from \r\n line endings to \n

 Parameters
 ----------
 input_str
 The string whose line endings will be converted

 Returns
 -------
 The converted string
 """
    r_str = input_str.replace('\r\n', '\n')
    return r_str

def dos2unix(source_file: str, dest_file: str):
 """
 Converts a file that contains Dos like line endings into Unix like

 Parameters
 ----------
 source_file
 The path to the source file to be converted
 dest_file
 The path to the converted file for output
 """
    # NOTE: Could add file existence checking and file overwriting
    # protection
    with open(source_file, 'r') as reader:
        dos_content = reader.read()

    unix_content = str2unix(dos_content)

    with open(dest_file, 'w') as writer:
        writer.write(unix_content)

if __name__ == "__main__":
    # Create our Argument parser and set its description
    parser = argparse.ArgumentParser(
        description="Script that converts a DOS like file to an Unix like file",
    )

    # Add the arguments:
    #   - source_file: the source file we want to convert
    #   - dest_file: the destination where the output should go

    # Note: the use of the argument type of argparse.FileType could
    # streamline some things
    parser.add_argument(
        'source_file',
        help='The location of the source '
    )

    parser.add_argument(
        '--dest_file',
        help='Location of dest file (default: source_file appended with `_unix`',
        default=None
    )

    # Parse the args (argparse automatically grabs the values from
    # sys.argv)
    args = parser.parse_args()

    s_file = args.source_file
    d_file = args.dest_file

    # If the destination file wasn't passed, then assume we want to
    # create a new file based on the old one
    if d_file is None:
        file_path, file_extension = os.path.splitext(s_file)
        d_file = f'{file_path}_unix{file_extension}'

    dos2unix(s_file, d_file)
```
