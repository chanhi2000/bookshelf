---
lang: en-US
title: "Dumping Python Objects to YAML Documents"
description: "Article(s) > (4/5) YAML: The Missing Battery in Python"
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
      content: "Article(s) > (4/5) YAML: The Missing Battery in Python"
    - property: og:description
      content: "Dumping Python Objects to YAML Documents"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml/dumping-python-objects-to-yaml-documents.html
date: 2024-12-14
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "YAML: The Missing Battery in Python",
  "desc": "In this tutorial, you'll learn all about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML. You'll also serialize Python objects and create a YAML syntax highlighter.",
  "link": "/realpython.com/python-yaml/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="YAML: The Missing Battery in Python"
  desc="In this tutorial, you'll learn all about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML. You'll also serialize Python objects and create a YAML syntax highlighter."
  url="https://realpython.com/python-yaml#dumping-python-objects-to-yaml-documents"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>



## Dumping Python Objects to YAML Documents

If you’ve worked with JSON in Python before, then serializing or “dumping” Python objects to YAML will look more familiar than loading them. The PyYAML library has an interface that’s somewhat similar to the built-in `json` module. It also provides fewer dumper classes and wrapper functions than loaders to choose from, so you don’t have to juggle that many options.

### Choose the Dumper Class

The all-around YAML serialization function in PyYAML is `yaml.dump()`, which takes an optional dumper class as an argument. If you don’t specify one during a function call, then it falls back to using the most feature-rich `yaml.Dumper`. Other choices are as follows:

| Dumper Class | Function | Description |
| --- | --- | --- |
| `BaseDumper` | `dump(Dumper=BaseDumper)` | Doesn’t support any tags and is useful only for subclassing |
| `SafeDumper` | `safe_dump()` | Produces only standard YAML tags like `!!str` and can’t represent class instances, making it more compatible with other YAML parsers |
| `Dumper` | `dump()` | Supports all standard, library, and custom tags and can serialize an arbitrary Python object, so it may produce a document that other YAML parsers won’t load |

In practice, the real choice you have is going to be between `Dumper` and `SafeDumper` since `BaseDumper` is only intended as a base class for subclasses to extend. Generally, you’ll want to stick with the default `yaml.Dumper` in most cases unless you need to produce portable YAML without Python-specific quirks.

Again, remember to import the corresponding dumper class prefixed with the letter *C* for the best serialization performance, and keep in mind that there might be slight differences between the Python and C implementations:

```py
import yaml
print(yaml.dump(3.14, Dumper=yaml.Dumper))
#
# 3.14
...

print(yaml.dump(3.14, Dumper=yaml.CDumper))
#
# 3.14
```

For example, the pure Python dumper appends optional dots at the end of a YAML document, while a similar wrapper class for the LibYAML library doesn’t. However, these are cosmetic differences that have no real impact on serialized or deserialized data.

### Dump to a String, a File, or a Stream

Serializing JSON in Python requires you to choose between calling `json.dump()` or `json.dumps()` depending on where you want the content to be dumped. On the other hand, PyYAML provides a two-in-one dumping function, which behaves differently depending on how you call it:

```py
data = {"name": "John"}

import yaml
yaml.dump(data)
#
# 'name: John\n'

import io
stream = io.StringIO()
print(yaml.dump(data, stream))
#
# None

stream.getvalue()
#
# 'name: John\n'
```

When called with a single argument, the function returns a string representing the serialized object. However, you can optionally pass a second argument to specify the target stream to write to. It can be a file or any [<VPIcon icon="fa-brands fa-python"/>file-like object](https://docs.python.org/3/glossary.html#term-file-like-object). When you pass this optional argument, the function returns [**`None`**](/realpython.com/null-in-python.md), and you need to extract data from the stream as necessary.

If you want to dump your YAML into a file, then be sure to open the file in **write mode**. Additionally, you must specify the character encoding through an optional keyword argument to the `yaml.dump()` function when the file is open in binary mode:

```py
with open("/path/to/file.yaml", mode="wt", encoding="utf-8") as file:
    yaml.dump(data, file)

with open("/path/to/file.yaml", mode="wb") as file:
    yaml.dump(data, file, encoding="utf-8")
```

When you open a file in text mode, then it’s always a good practice to [**explicitly set the character encoding**](/realpython.com/python310-new-features.md#default-text-encodings). Otherwise, Python will assume your platform’s default encoding, which might be less portable. Character encoding has no meaning in binary mode, which deals with bytes that are already encoded. Still, you should set the encoding through the `yaml.dump()` function, which accepts many more optional parameters, which you’ll learn about soon.

### Dump Multiple Documents

The two YAML-dumping functions in PyYAML, `dump()` and `safe_dump()`, have no way of knowing whether you mean to serialize multiple separate documents or a single document comprising an element sequence:

```py
import yaml
print(yaml.dump([
    {"title": "Document #1"},
    {"title": "Document #2"},
    {"title": "Document #3"},
]))
#
# - title: 'Document #1'
# - title: 'Document #2'
# - title: 'Document #3'
```

They always assume the latter, dumping a single YAML document with a list of elements. To dump multiple documents, use either `dump_all()` or `safe_dump_all()`:

```py
print(yaml.dump_all([
    {"title": "Document #1"},
    {"title": "Document #2"},
    {"title": "Document #3"},
]))
#
# title: 'Document #1'
# ---
# title: 'Document #2'
# ---
# title: 'Document #3'
```

Now you get a string containing more than one YAML document separated with the triple dash (`---`).

Note that `dump_all()` is the only function used under the hood because all the other ones, including `dump()` and `safe_dump()`, delegate processing to it. So, regardless of which function you call, they will all have the same list of formal parameters.

### Tweak the Formatting With Optional Parameters

The dumping functions in PyYAML accept a few positional arguments and a number of optional keyword arguments, which let you control the output’s formatting. The only required parameter is the Python object or a sequence of objects to serialize, passed as the first argument in all dumping functions. You’ll take a closer look at the available parameters in this section.

The three wrappers that delegate to `yaml.dump_all()` have the following [<VPIcon icon="fa-brands fa-wikipedia-w"/>function signatures](https://en.wikipedia.org/wiki/Type_signature#Signature), which reveal their positional arguments:

```py
def dump(data, stream=None, Dumper=Dumper, **kwargs): ...
def safe_dump(data, stream=None, **kwargs): ...
def safe_dump_all(documents, stream=None, **kwargs): ...
```

The first function expects between one and three positional arguments since two of them have [optional values](https://realpython.com/python-optional-arguments/). On the other hand, the second and the third function listed above expect only two positional arguments because they both use a predefined `SafeDumper`. To find the available keyword arguments, you have to look at the `yaml.dump_all()` function’s signature.

You can use the same keyword arguments across all four dumping functions. They’re all optional because they have default values equal to either `None` or `False`, except for the `sort_keys` argument, which has a default value of `True`. In total, there are six Boolean flags that you can turn on and off to change the look of the resulting YAML:

| Boolean Flag | Meaning |
| ---: | --- |
| `allow_unicode` | Don’t escape Unicode and don’t double-quote. |
| `canonical` | Output YAML in the canonical form. |
| `default_flow_style` | Prefer flow style over block style. |
| `explicit_end` | End each document with the triple dot (`...`). |
| `explicit_start` | Start each document with the triple dash (`---`). |
| `sort_keys` | Sort the output of dictionaries by key. |

There are also several parameters of other data types that give you more freedom:

| Parameter | Type | Meaning |
| ---: | :---: | --- |
| `indent` | `int` | Block indent level, which must be greater than 1 and less than 10 |
| `width` | `int` | Line width, which must be bigger than twice the indent |
| `default_style` | `str` | Scalar quotation style, which must be one of the following: `None`, `"'"`, or `'"'` |
| `encoding` | `str` | Character encoding, which produces `bytes` instead of `str` when set |
| `line_break` | `str` | Newline character, which must be one of the following: `'\r'`, `'\n'`, or `'\r\n'` |
| `tags` | `dict` | Additional tag directives comprised of tag handles |
| `version` | `tuple` | Major and minor YAML version, such as `(1, 2)` for version 1.2 |

Most of them are self-explanatory. However, the `tags` argument must be a dictionary that maps custom **tag handles** to valid [<VPIcon icon="fa-brands fa-wikipedia-w"/>URI prefixes](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) recognized by a YAML parser:

```py
{"!model!": "tag:yaml.org,2002:python/object:models."}
```

Specifying such a mapping will add a relevant tag directive into your dumped document. Tag handles always begin and end with an exclamation point. They’re a shorthand notation for full tag names. For example, these are all equivalent ways of using the same tag in a YAML document:

```yaml
%TAG !model! tag:yaml.org,2002:python/object:models.
---
- !model!Person
    first_name: John
    last_name: Doe

- !!python/object:models.Person
    first_name: John
    last_name: Doe

- !<tag:yaml.org,2002:python/object:models.Person>
    first_name: John
    last_name: Doe
```

By using a `%TAG` directive above the YAML document, you declare a custom tag handle called `!model!`, which gets expanded into the following prefix. The double exclamation point (`!!`) is a built-in shortcut for the default namespace corresponding to the `tag:yaml.org,2002:` prefix.

You can experiment with the available keyword arguments by changing their values and rerunning your code to see the result. However, this sounds like a tedious task. The supporting materials for this tutorial come with an interactive app that will let you test different combinations of arguments and their values in a web browser:

<VidStack src="vimeo/673144581" />

It’s a dynamic web page that uses [**JavaScript**](/realpython.com/python-vs-javascript.md) to communicate over the network with a minimal HTTP server written in [**FastAPI**](/realpython.com/fastapi-python-web-apis.md). The server expects a JSON object with all but the `tags` keyword argument and calls `yaml.dump()` against the following test object:

```py
{
    "person": {
        "name_latin": "Ivan",
        "name": "Иван",
        "age": 42,
    }
}
```

The sample object above is a dictionary comprising integer and string fields, which contain Unicode characters. To run the server, you must first install the FastAPI library and an [<VPIcon icon="fa-brands fa-wikipedia-w"/>ASGI](https://en.wikipedia.org/wiki/Asynchronous_Server_Gateway_Interface) web server such as [<VPIcon icon="iconfont icon-pypi"/>`uvicorn`](https://pypi.org/project/uvicorn/) into your virtual environment, where you had installed PyYAML before:

```sh
python -m pip install fastapi uvicorn
uvicorn server:app
```

To run the server, you must provide the module name followed by a colon and the name of the ASGI-compatible callable in that module.

Next up, you’ll learn more about dumping custom classes with PyYAML.

### Dump Custom Data Types

As you already know, at this point, you can use one of the Python-specific tags provided by PyYAML to serialize and deserialize objects of your custom data types, such as classes. You also know that those tags are only recognized by the unsafe loaders and dumpers, which explicitly allow potentially dangerous code execution. The library will refuse to serialize a Python-specific type like a [**complex number**](/realpython.com/python-complex-numbers.md) unless you choose the unsafe dumper class:

```py
import yaml
yaml.safe_dump(complex(3, 2))
#
# Traceback (most recent call last):
#  ...
# yaml.representer.RepresenterError: ('cannot represent an object', (3+2j))

yaml.dump(complex(3, 2))
#
# "!!python/complex '3.0+2.0j'\n"
```

In the first case, the safe dumper doesn’t know how to represent your complex number in YAML. On the other hand, calling `yaml.dump()` implicitly uses the unsafe `Dump` class behind the scenes, which takes advantage of the `!!python/complex` tag. It’s a similar story when you try to dump a custom class:

```py
class Person:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

yaml.safe_dump(Person("John", "Doe"))
#
# Traceback (most recent call last):
#  ...
# yaml.representer.RepresenterError: ('cannot represent an object',
#  <__main__.Person object at 0x7f55a671e8f0>)

yaml.dump(Person("John", "Doe"))
#
# !!python/object:__main__.Person
# first_name: John
# last_name: Doe
```

Your only option is the unsafe `yaml.dump()`. However, it’s possible to mark your classes as safe to parse so that even the safe loader will be able to handle them later. To do that, you must make a few changes to your class:

```py{1-3}
class Person(yaml.YAMLObject): 
    yaml_tag = "!Person"
    yaml_loader = yaml.SafeLoader
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name
```

First, let the class inherit from `yaml.YAMLObject`. Then specify two class attributes. One attribute will represent a custom YAML tag tied to your class, while the second one will be the loader class to use. Now, when you dump a `Person` object to YAML, you’ll be able to load it back with `yaml.safe_load()`:

```py
print(jdoe := yaml.dump(Person("John", "Doe")))
#
# !Person
# first_name: John
# last_name: Doe

yaml.safe_load(jdoe)
#
# <__main__.Person object at 0x7f6fb7ba9ab0>
```

The [**Walrus operator (`:=`)]**(/realpython.com/python-walrus-operator/) lets you define a variable and use it as an argument to the `print()` function in one step. Marking classes as safe is a nice compromise, allowing you to make exceptions to some of your classes by shrugging off security and letting them in. Naturally, you must be absolutely sure that there’s nothing suspicious about them before you try loading the associated YAML.
