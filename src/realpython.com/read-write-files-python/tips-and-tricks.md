---
lang: en-US
title: "Tips and Tricks"
description: "Article(s) > (4/4) Reading and Writing Files in Python (Guide)"
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
      content: "Article(s) > (4/4) Reading and Writing Files in Python (Guide)"
    - property: og:description
      content: "Tips and Tricks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/read-write-files-python/tips-and-tricks.html
next: /realpython.com/read-write-files-python/README.md#dont-re-invent-the-snake
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
  url="https://realpython.com/read-write-files-python#tips-and-tricks"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Reading-and-Writing-Files-in-Python_Watermarked.0d394921fd90.jpg"/>

Now that you’ve mastered the basics of reading and writing files, here are some tips and tricks to help you grow your skills.

---

## `__file__`

The `__file__` attribute is a [<VPIcon icon="fa-brands fa-python"/>special attribute](https://docs.python.org/3/reference/datamodel.html) of modules, similar to `__name__`. It is:

::: info 3. Data model — Python 3.13.2 documentation (<code>docs.python.org</code>)

> “the pathname of the file from which the module was loaded, if it was loaded from a file.”

<SiteInfo
  name="3. Data model"
  desc="Objects, values and types: Objects are Python’s abstraction for data. All data in a Python program is represented by objects or by relations between objects. (In a sense, and in conformance to Von ..."
  url="https://docs.python.org/3/reference/datamodel.html/"
  logo="https://docs.python.org/_static/py.svg"
  preview="https://docs.python.org/3/_static/og-image.png"/>

:::

::: note

To re-iterate, `__file__` returns the path *relative* to where the initial Python script was called. If you need the full system path, you can use `os.getcwd()` to get the current working directory of your executing code.

:::

Here’s a real world example. In one of my past jobs, I did multiple tests for a hardware device. Each test was written using a Python script with the test script file name used as a title. These scripts would then be executed and could print their status using the `__file__` special attribute. Here’s an example folder structure:

```plaintext title="file structure"
project/
|
├── tests/
|   ├── test_commanding.py
|   ├── test_power.py
|   ├── test_wireHousing.py
|   └── test_leds.py
|
└── main.py
```

Running <VPIcon icon="fa-brands fa-python"/>`main.py` produces the following:

```sh
python main.py
# 
# tests/test_commanding.py Started:
# tests/test_commanding.py Passed!
# tests/test_power.py Started:
# tests/test_power.py Passed!
# tests/test_wireHousing.py Started:
# tests/test_wireHousing.py Failed!
# tests/test_leds.py Started:
# tests/test_leds.py Passed!
```

I was able to run and get the status of all my tests dynamically through use of the `__file__` special attribute.

---

## Appending to a File

Sometimes, you may want to append to a file or start writing at the end of an already populated file. This is easily done by using the `'a'` character for the `mode` argument:

```py
with open('dog_breeds.txt', 'a') as a_writer:
    a_writer.write('\nBeagle')
```

When you examine <VPIcon icon="fas fa-file-lines"/>`dog_breeds.txt` again, you’ll see that the beginning of the file is unchanged and `Beagle` is now added to the end of the file:

```py
with open('dog_breeds.txt', 'r') as reader:
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
# Beagle
```

---

## Working With Two Files at the Same Time

There are times when you may want to read a file and write to another file at the same time. If you use the example that was shown when you were learning how to write to a file, it can actually be combined into the following:

```py
d_path = 'dog_breeds.txt'
d_r_path = 'dog_breeds_reversed.txt'
with open(d_path, 'r') as reader, open(d_r_path, 'w') as writer:
    dog_breeds = reader.readlines()
    writer.writelines(reversed(dog_breeds))
```

---

## Creating Your Own Context Manager

There may come a time when you’ll need finer control of the file object by placing it inside a custom class. When you do this, using the `with` statement can no longer be used unless you add a few magic methods: `__enter__` and `__exit__`. By adding these, you’ll have created what’s called a [<VPIcon icon="fa-brands fa-python"/>context manager](https://docs.python.org/3/library/stdtypes.html#typecontextmanager).

`__enter__()` is invoked when calling the `with` statement. `__exit__()` is called upon exiting from the `with` statement block.

Here’s a template that you can use to make your custom class:

```py
class my_file_reader():
    def __init__(self, file_path):
        self.__path = file_path
        self.__file_object = None

    def __enter__(self):
        self.__file_object = open(self.__path)
        return self

    def __exit__(self, type, val, tb):
        self.__file_object.close()

    # Additional methods implemented below
```

Now that you’ve got your custom class that is now a context manager, you can use it similarly to the `open()` built-in:

```py
with my_file_reader('dog_breeds.txt') as reader:
    # Perform custom class operations
    pass
```

Here’s a good example. Remember the cute Jack Russell image we had? Perhaps you want to open other `.png` files but don’t want to parse the header file each time. Here’s an example of how to do this. This example also uses custom iterators. If you’re not familiar with them, check out [<VPIcon icon="fas fa-globe"/>Python Iterators](https://dbader.org/blog/python-iterators):

```py :collapsed-lines
class PngReader():
    # Every .png file contains this in the header.  Use it to verify
    # the file is indeed a .png.
    _expected_magic = b'\x89PNG\r\n\x1a\n'

    def __init__(self, file_path):
        # Ensure the file has the right extension
        if not file_path.endswith('.png'):
            raise NameError("File must be a '.png' extension")
        self.__path = file_path
        self.__file_object = None

    def __enter__(self):
        self.__file_object = open(self.__path, 'rb')

        magic = self.__file_object.read(8)
        if magic != self._expected_magic:
            raise TypeError("The File is not a properly formatted .png file!")

        return self

    def __exit__(self, type, val, tb):
        self.__file_object.close()

    def __iter__(self):
        # This and __next__() are used to create a custom iterator
        # See https://dbader.org/blog/python-iterators
        return self

    def __next__(self):
        # Read the file in "Chunks"
        # See https://en.wikipedia.org/wiki/Portable_Network_Graphics#%22Chunks%22_within_the_file

        initial_data = self.__file_object.read(4)

        # The file hasn't been opened or reached EOF.  This means we
        # can't go any further so stop the iteration by raising the
        # StopIteration.
        if self.__file_object is None or initial_data == b'':
            raise StopIteration
        else:
            # Each chunk has a len, type, data (based on len) and crc
            # Grab these values and return them as a tuple
            chunk_len = int.from_bytes(initial_data, byteorder='big')
            chunk_type = self.__file_object.read(4)
            chunk_data = self.__file_object.read(chunk_len)
            chunk_crc = self.__file_object.read(4)
            return chunk_len, chunk_type, chunk_data, chunk_crc
```

You can now open `.png` files and properly parse them using your custom context manager:

```py
with PngReader('jack_russell.png') as reader:
    for l, t, d, c in reader:
        print(f"{l:05}, {t}, {c}")
# 
# 00013, b'IHDR', b'v\x121k'
# 00001, b'sRGB', b'\xae\xce\x1c\xe9'
# 00009, b'pHYs', b'(<]\x19'
# 00345, b'iTXt', b"L\xc2'Y"
# 16384, b'IDAT', b'i\x99\x0c('
# 16384, b'IDAT', b'\xb3\xfa\x9a$'
# 16384, b'IDAT', b'\xff\xbf\xd1\n'
# 16384, b'IDAT', b'\xc3\x9c\xb1}'
# 16384, b'IDAT', b'\xe3\x02\xba\x91'
# 16384, b'IDAT', b'\xa0\xa99='
# 16384, b'IDAT', b'\xf4\x8b.\x92'
# 16384, b'IDAT', b'\x17i\xfc\xde'
# 16384, b'IDAT', b'\x8fb\x0e\xe4'
# 16384, b'IDAT', b')3={'
# 01040, b'IDAT', b'\xd6\xb8\xc1\x9f'
# 00000, b'IEND', b'\xaeB`\x82'`
```
