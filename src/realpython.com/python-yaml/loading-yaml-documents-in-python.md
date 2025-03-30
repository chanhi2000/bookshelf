---
lang: en-US
title: "Loading YAML Documents in Python"
description: "Article(s) > (3/5) YAML: The Missing Battery in Python"
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
      content: "Article(s) > (3/5) YAML: The Missing Battery in Python"
    - property: og:description
      content: "Loading YAML Documents in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml/loading-yaml-documents-in-python.html
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
  url="https://realpython.com/python-yaml#loading-yaml-documents-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>



## Loading YAML Documents in Python

Loading YAML boils down to reading a piece of text and parsing it according to the data format’s grammar. PyYAML can make this confusing due to the plethora of functions and classes to choose from. Plus, the library’s documentation doesn’t reliably clearly explain their differences and valid use cases. To save you from debugging the underlying code, you’ll find the most important facts about loading documents with PyYAML in this section.

### Choose the Loader Class

If you want the best possible parsing performance, then you’ll need to manually import the suitable loader class and pass it to the generic `yaml.load()` function, as shown before. But which one should you choose?

To find out, take a look at this high-level overview of the loaders at your disposal. The brief descriptions should give you a general idea about the available choices:

| Loader Class | Function | Description |
| :---: | :---: | --- |
| `BaseLoader` | - | Doesn’t resolve or support any tags and constructs only basic Python objects (`str`, `list`, `dict`) |
| `Loader` | - | Kept for backward compatibility but otherwise the same as `UnsafeLoader` |
| `UnsafeLoader` | `unsafe_load()` | Supports all standard, library, and custom tags and may construct an arbitrary Python object |
| `SafeLoader` | `safe_load()` | Supports only standard YAML tags like `!!str` and doesn’t construct class instances |
| `FullLoader` | `full_load()` | Should be able to load almost all YAML safely |

The three loaders that you’re most likely to use have corresponding shorthand functions, which you can call instead of passing a loader class to the generic `yaml.load()` function. Remember, these are all written in Python, so for improved performance, you’ll need to import a suitable loader class prefixed with the letter *C*, such as `CSafeLoader`, and call `yaml.load()` anyway.

For a more detailed breakdown of the features supported by the individual loader classes, check out the table below:

| Loader Class | Anchors, Aliases | YAML Tags | PyYAML Tags | Auxilliary Types | Custom Types | Code Execution |
| ---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `UnsafeLoader` (`Loader`) | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| `FullLoader` | ✔️ | ✔️ | ✔️ | ✔️ | error | error |
| `SafeLoader` | ✔️ | ✔️ | error | ✔️ | error | error |
| `BaseLoader` | ✔️ | ignore | ignore | ignore | ignore | ignore |

`UnsafeLoader` supports all available features and allows arbitrary code execution. `FullLoader` is similar except for the code execution and the ability to deserialize custom Python classes, which cause a parsing error. `SafeLoader` additionally errors out on Python-specific tags provided by PyYAML, such as `!!python/tuple`. On the other hand, `BaseLoader` remains agnostic about most features by ignoring them.

### Compare Loaders’ Features

Below, you’ll get a quick demonstration of the features mentioned above. First, import the `yaml` module and check out an **anchors and aliases** example:

```py
import yaml

yaml.safe_load("""
Shipping Address: &shipping |
    1111 College Ave
    Palo Alto
    CA 94306
    USA
Invoice Address: *shipping
""")
# 
# {
#   'Shipping Address': '1111 College Ave\nPalo Alto\nCA 94306\nUSA\n',
#   'Invoice Address': '1111 College Ave\nPalo Alto\nCA 94306\nUSA\n'
# }
```

You define an anchor, `&shipping`, near the shipping address and then reuse the same address for the invoice with the help of an alias, `*shipping`. As a result, you only had to specify the address once. This feature works with all loader types.

The next example shows one of the standard **YAML tags** in action:

```py
yaml.safe_load("""
number: 3.14
string: !!str 3.14
""")
# 
# {'number': 3.14, 'string': '3.14'}

from yaml import BaseLoader
yaml.load("""
number: 3.14
string: !!str 3.14
""", BaseLoader)
# 
# {'number': '3.14', 'string': '3.14'}
```

Numeric literals such as `3.14` are treated as floats by default, but you can request a type conversion to string with the `!!str` tag. Almost all loaders respect standard YAML tags. The only exception is the `BaseLoader` class, which represents scalars with strings whether you tag them or not.

To leverage **PyYAML tags**, which are provided by the library, use either `FullLoader` or `UnsafeLoader` because they’re the only loaders that can handle Python-specific tags:

```py
yaml.full_load("""
list: [1, 2]
tuple: !!python/tuple [1, 2]
""")
# 
# {'list': [1, 2], 'tuple': (1, 2)}
```

The `!!python/tuple` tag in the example above converts an inline list into a Python tuple. Head over to PyYAML documentation for a complete [<FontIcon icon="fas fa-globe"/>list of supported tags](https://pyyaml.org/wiki/PyYAMLDocumentation#yaml-tags-and-python-types), but be sure to cross-check with the [source code on GitHub (<FontIcon icon="iconfont icon-github"/>`yaml/pyyaml`)](https://github.com/yaml/pyyaml/blob/8cdff2c80573b8be8e8ad28929264a913a63aa33/lib/yaml/constructor.py#L662), as the documentation might not be up to date.

Most loaders are smart about deserializing scalars into **auxiliary types**, which are more specific than a basic string, list, or dictionary:

```py
yaml.safe_load("""
married: false
spouse: null
date_of_birth: 1980-01-01
age: 42
kilograms: 80.7
""")
#
# {
#   'married': False,
#   'spouse': None,
#   'date_of_birth': datetime.date(1980, 1, 1),
#   'age': 42,
#   'kilograms': 80.7
# }
```

Here, you have a mix of types, including a `bool`, a `None`, a `datetime.date` instance, an `int`, and a `float`. Again, `BaseLoader` is the only loader class that treats all scalars as strings at all times.

Suppose you’d like to deserialize a **custom class** from YAML, make a **function call** in your Python code, or even execute a **shell command** while parsing YAML. In that case, your only option is the `UnsafeLoader`, which accepts a few special library tags. The other loaders either raise an exception or ignore those tags. You’ll learn more about the PyYAML tags now.

### Explore Loaders’ Insecure Features

PyYAML lets you serialize and deserialize any [**picklable**](/realpython.com/python-pickle-module.md) Python object by tapping into its interface. Bear in mind that this allows for arbitrary code execution, as you’ll soon find out. However, if you don’t care about compromising your application’s security, then this capability can be pretty convenient.

The library provides a couple of YAML tags recognized by `UnsafeLoader` to accomplish object creation:

- `!!python/object`
- `!!python/object/new`
- `!!python/object/apply`

They all must be followed by a [<FontIcon icon="fa-brands fa-wikipedia-w"/>fully qualified name](https://en.wikipedia.org/wiki/Fully_qualified_name) of the class to instantiate, which includes the [**package and module**](/realpython.com/python-modules-packages.md) names. The first tag expects a mapping of key-value pairs, in either the flow or block style. Here’s an example:

```yaml
# Flow style:
!!python/object:models.Person {first_name: John, last_name: Doe}

# Block style:
!!python/object:models.Person
  first_name: John
  last_name: Doe
```

The other two tags are more complicated, as each one comes in two flavors. However, the two tags are almost identical because `!!python/object/new` delegates processing to `!!python/object/apply`. The only difference is that `!!python/object/new` calls a [**special method**](/realpython.com/python-classes.md#special-methods-and-protocols), [**`.__new__()`**](/realpython.com/python-class-constructor.md#object-creation-with-__new__), on the specified class without calling [**`.__init__()`**](/realpython.com/python-class-constructor.md#object-initialization-with-__init__), while `!!python/object/apply` invokes the class itself, which is what you’ll want in most cases.

One flavor of the syntax allows for setting the object’s initial state through a list of [**positional arguments**](/realpython.com/defining-your-own-python-function.md#positional-arguments), like so:

```yaml
# Flow style:
!!python/object/apply:models.Person [John, Doe]

# Block style:
!!python/object/apply:models.Person
  - John
  - Doe
```

Both styles achieve a similar effect by calling the `.__init__()` method in the `Person` class with the two values passed as positional arguments. Alternatively, you can use a slightly more verbose syntax that allows you to mix positional and [**keyword arguments**](/realpython.com/defining-your-own-python-function.md#keyword-arguments), among a few more advanced tricks glossed over for brevity:

```yaml
!!python/object/apply:models.Person
args: [John]
kwds: {last_name: Doe}
```

This would still call `.__init__()` on your class, but one of the arguments would be passed as a keyword argument. In any case, you could define the `Person` class manually or by taking advantage of [**data classes**](/realpython.com/python-data-classes.md) in Python:

```py title="models.py"
from dataclasses import dataclass

@dataclass
class Person:
   first_name: str
   last_name: str
```

This concise syntax will make Python generate the class initializer as well as a few other methods that you’d have to code yourself.

Note that you can use `!!python/object/apply` against any **callable object**, including regular functions, and specify the arguments to pass. This lets you execute one of the built-in functions, a custom function, or even a module-level function, which PyYAML will happily import for you. That’s a *huge* security hole! Imagine using the `os` or `subprocess` module to run a shell command that retrieves your private SSH key if you’ve defined one:

```py
import yaml
yaml.unsafe_load("""
!!python/object/apply:subprocess.getoutput
    - cat ~/.ssh/id_rsa
""")
#
# '-----BEGIN RSA PRIVATE KEY-----\njC7PbMIIEow...
```

It’s not hard to make an HTTP request with the stolen data through the network when the object gets created. A bad actor could use this information to access sensitive resources using your identity.

Sometimes, these tags bypass the normal object creation path, which is typical of object serialization mechanisms in general. Say you wanted to load a user object from YAML and make it an instance of the following class:

```py title="models.py"
class User:
    def __init__(self, name):
        self.name = name
```

You place the `User` class in a separate source file named `models.py` to keep things organized. User objects have only one attribute—the name. By using just one attribute and implementing the initializer explicitly, you’ll be able to observe the way PyYAML calls the individual methods.

When you decide to use the `!!python/object` tag in YAML, then the library calls `.__new__()` without any arguments and never calls `.__init__()`. Instead, it directly manipulates the `.__dict__` attribute of your newly created object, which can have some undesired effects:

```py
import yaml

user = yaml.unsafe_load("""
!!python/object:models.User
no_such_attribute: 42
""")

user
#
# <models.User object at 0x7fe8adb12050>

user.no_such_attribute
#
# 42

user.name
# 
# Traceback (most recent call last):
#  ...
# AttributeError: 'User' object has no attribute 'name'
```

While you’ve undoubtedly created a new `User` instance, it wasn’t initialized properly, because the `.name` attribute was missing. However, it does have an unexpected `.no_such_attribute`, which is nowhere to be found in the class body.

You can fix this by adding a [**`__slots__`**](/realpython.com/python-data-classes.md#optimizing-data-classes) declaration to your class, which forbids adding or removing attributes dynamically once the object exists in memory:

```py{2} title="models.py"
class User:
 __slots__ = ["name"] 
    def __init__(self, name):
        self.name = name
```

Now, your user objects won’t have the [<FontIcon icon="fa-brands fa-python"/>`.__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__) attribute at all. Because there’s no inherent `.__dict__`, the library falls back to calling [<FontIcon icon="fa-brands fa-python"/>`setattr()`](https://docs.python.org/3/library/functions.html#setattr) for each key-value pair on the blank object. This ensures that only attributes listed in `__slots__` will pass through.

This is all great, but what if the `User` class accepted a password argument? To mitigate data leaks, you most definitely don’t want to serialize passwords in plaintext. And how about [<FontIcon icon="fa-brands fa-python"/>serializing stateful attributes](https://docs.python.org/3/library/pickle.html#pickle-state), such as file descriptors or database connections? Well, if restoring your object’s state requires some code to run, then you can customize the serialization process with the special [<FontIcon icon="fa-brands fa-python"/>`.__setstate__()`](https://docs.python.org/3/library/pickle.html#object.__setstate__) method in your class:

```py title="models.py"
import codecs

class User:
    __slots__ = ["name"]

    def __init__(self, name):
        self.name = name

    def __setstate__(self, state):
        self.name = codecs.decode(state["name"], "rot13")
```

You decode the persisted username using a primitive [<FontIcon icon="fa-brands fa-wikipedia-w"/>ROT-13](https://en.wikipedia.org/wiki/ROT13) cipher, which rotates characters by thirteen places in the alphabet. For serious encryption, though, you’ll have to look beyond the standard library. Note that you could also use a [**hashing algorithm**](/realpython.com/python-hash-table.md#understand-the-hash-function) from the built-in [<FontIcon icon="fa-brands fa-python"/>`hashlib`](https://docs.python.org/3/library/hashlib.html#module-hashlib) module if you wanted to store a password securely.

Here’s one way of loading your encoded state from YAML:

```py
user = yaml.unsafe_load("""
!!python/object:models.User
name: Wbua Qbr
""")

user.name
#
# 'John Doe'
```

As long as you’ve defined the `.__setstate__()` method, it’ll always take precedence and give you control over setting an object’s state. That’s why you’re able to restore the original name, `'John Doe'`, from the encoded text above.

Before moving on, it’s worth noting that PyYAML provides two more insecure tags:

- `!!python/name`
- `!!python/module`

The first one lets you load a reference to a Python object, such as a class, a function, or a variable, in your code. The second tag allows for referencing a given Python module. In the next section, you’ll take a look at different data sources that PyYAML lets you load documents from.

### Load a Document From a String, a File, or a Stream

Once you choose the loader class or use one of the shorthand functions, you’re not limited to parsing only strings. The `safe_load()` and other functions exposed by PyYAML accept a single argument, which is a universal stream of characters or bytes. The most common examples of such streams are strings and Python `bytes` objects:

```py
import yaml

yaml.safe_load("name: Иван")
#
# {'name': 'Иван'}

yaml.safe_load(b"name: \xd0\x98\xd0\xb2\xd0\xb0\xd0\xbd")
#
# {'name': 'Иван'}
```

According to the YAML 1.2 specification, parsers should support [**Unicode**](/realpython.com/python-encodings-guide.md) encoded with [<FontIcon icon="fa-brands fa-wikipedia-w"/>UTF-8](https://en.wikipedia.org/wiki/UTF-8), [<FontIcon icon="fa-brands fa-wikipedia-w"/>UTF-16](https://en.wikipedia.org/wiki/UTF-16), or [<FontIcon icon="fa-brands fa-wikipedia-w"/>UTF-32](https://en.wikipedia.org/wiki/UTF-32) for compatibility with JSON. However, because the PyYAML library supports only YAML 1.1, your only options are UTF-8 and UTF-16:

```py
yaml.safe_load("name: Иван".encode("utf-8"))
#
# {'name': 'Иван'}

yaml.safe_load("name: Иван".encode("utf-16"))
#
# {'name': 'Иван'}

yaml.safe_load("name: Иван".encode("utf-32"))
#
# Traceback (most recent call last):
#  ...
# yaml.reader.ReaderError: unacceptable character #x0000:
# special characters are not allowed
#  in "<byte string>", position 1
```

If you try loading YAML from a text encoded with UTF-32, then you’ll get an error. However, that’s hardly a problem in practice because UTF-32 isn’t a common encoding. In any case, you can always do the appropriate transcoding yourself using Python’s [**`str.encode()` and `str.decode()`**](/realpython.com/python-encodings-guide.md#encoding-and-decoding-in-python-3) methods before loading YAML. Alternatively, you could try one of the other YAML parsing libraries mentioned earlier.

You can also read YAML content straight from a file. Go ahead and [create a file](https://realpython.com/working-with-files-in-python/) with sample YAML content in it and load it into Python using PyYAML:

```py
with open("sample.yaml", mode="wb") as file:
    file.write(b"name: \xd0\x98\xd0\xb2\xd0\xb0\xd0\xbd")
#
# 14

with open("sample.yaml", mode="rt", encoding="utf-8") as file:
    print(yaml.safe_load(file))
#
# {'name': 'Иван'}

with open("sample.yaml", mode="rb") as file:
    print(yaml.safe_load(file))
#
# {'name': 'Иван'}
```

You create a local file named `sample.yaml` in your current working directory and write fourteen bytes representing a sample YAML document. Next, you open that file for reading and use `safe_load()` to get a corresponding dictionary. The file can be open in either text or binary mode. In fact, you may pass any file-like stream of characters or bytes such as the in-memory [<FontIcon icon="fa-brands fa-python"/>io.StringIO](https://docs.python.org/3/library/io.html#io.StringIO) text buffer or the binary [<FontIcon icon="fa-brands fa-python"/>io.BytesIO](https://docs.python.org/3/library/io.html#io.BytesIO) stream:

```py
import io

yaml.safe_load(io.StringIO("name: Иван"))
#
# {'name': 'Иван'}

yaml.safe_load(io.BytesIO(b"name: \xd0\x98\xd0\xb2\xd0\xb0\xd0\xbd"))
#
# {'name': 'Иван'}
```

As you can see, the loading functions in PyYAML are quite versatile. Compare this with the `json` module, which provides different functions depending on the type of your input argument. However, PyYAML bundles yet another set of functions that may help you read more than one document from a stream. You’ll learn about those functions now.

### Load Multiple Documents

All four loading functions in PyYAML have their iterable counterparts, which can read multiple YAML documents from a single stream. They still expect exactly one argument, but instead of immediately parsing it into a Python object, they wrap it with a [<FontIcon icon="fa-brands fa-python"/>generator iterator](https://docs.python.org/3/glossary.html#term-generator-iterator) that you can iterate over:

```py
import yaml

stream = """\
---
3.14
---
name: John Doe
age: 53
---
- apple
- banana
- orange
"""

for document in yaml.safe_load_all(stream):
    print(document)
# 
# 3.14
# {'name': 'John Doe', 'age': 53}
# ['apple', 'banana', 'orange']
```

The individual documents must start with a triple dash (`---`) and can optionally end with three dots (`...`).

In this section, you learned about the high-level functions available in PyYAML to load documents with. Unfortunately, they try to read the entire stream eagerly in one go, which isn’t always feasible. Reading huge files in such a way can take too long or even fail due to limited memory. If you’d like to process YAML in a streaming fashion similar to the SAX interface in XML, then you have to use the [low-level API](/realpython.com/python-yaml/parsing-yaml-documents-at-a-low-level.md#parsing-yaml-documents-at-a-low-level) provided by PyYAML.
