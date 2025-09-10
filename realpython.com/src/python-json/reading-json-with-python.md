---
lang: en-US
title: "Reading JSON With Python"
description: "Article(s) > (3/4) Working With JSON Data in Python"
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
      content: "Article(s) > (3/4) Working With JSON Data in Python"
    - property: og:description
      content: "Reading JSON With Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-json/reading-json-with-python.html
date: 2024-12-22
isOriginal: false
author:
  - name: Philipp Acsany
    url : https://realpython.com/team/pacsany/
cover: https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Working With JSON Data in Python",
  "desc": "In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data.",
  "link": "/realpython.com/python-json/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Working With JSON Data in Python"
  desc="In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data."
  url="https://realpython.com/python-json#reading-json-with-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

In the former sections, you learned how to serialize Python data into JSON-formatted strings and JSON files. Now, you’ll see what happens when you load JSON data back into your Python program.

In parallel to `json.dumps()` and `json.dump()`, the `json` library provides two functions to deserialize JSON data into a Python object:

1. `json.loads()`: To deserialize a string, bytes, or [**byte array**](/realpython.com/python-mutable-vs-immutable-types.md#byte-arrays) instances
2. `json.load()`: To deserialize a text file or a binary file

As a rule of thumb, you work with `json.loads()` when your data is already present in your Python program. You use `json.load()` with external files that are saved on your disk.

The conversion from JSON data types and values to Python follows a similar mapping as before when you converted Python objects into the JSON format:

| JSON | Python |
| ---: | --- |
| `object` | `dict` |
| `array` | `list` |
| `string` | `str` |
| `number` | `int` |
| `number` | `float` |
| `true` | `True` |
| `false` | `False` |
| `null` | `None` |

When you compare this table to the one in the previous section, you may recognize that Python offers a matching data type for all JSON types. That’s very convenient because this way, you can be sure you won’t lose any information when deserializing JSON data to Python.

::: note

Deserialization is not the exact reverse of the serialization process. The reason for this is that JSON keys are always strings, and not all Python data types can be converted to JSON data types. This discrepancy means that certain Python objects may not retain their original type when serialized and then deserialized.

:::

To get a better feeling for the conversion of data types, you’ll start with serializing a Python object to JSON and then convert the JSON data back to Python. That way, you can spot differences between the Python object you serialize and the Python object you end up with after deserializing the JSON data.

---

## Convert JSON Objects to a Python Dictionary

To investigate how to load a Python dictionary from a JSON object, revisit the example from before. Start by creating a `dog_registry` dictionary and then serialize the Python dictionary to a JSON string using `json.dumps()`:

```py
import json
dog_registry = {1: {"name": "Frieda"}}
dog_json = json.dumps(dog_registry)
dog_json
# 
# '{"1": {"name": "Frieda"}}'
```

By passing `dog_registry` into `json.dumps()`, you’re creating a string with a JSON object that you save in `dog_json`. If you want to convert `dog_json` back to a Python dictionary, then you can use `json.loads()`:

```py
new_dog_registry = json.loads(dog_json)
```

By using `json.loads()`, you can convert JSON data back into Python objects. With the knowledge about JSON that you’ve gained so far, you may already suspect that the content of the `new_dog_registry` dictionary is not identical to the content of `dog_registry`:

```py
new_dog_registry == dog_registry
#
# False

new_dog_registry
#
# {'1': {'name': 'Frieda'}}

dog_registry
#
# {1: {'name': 'Frieda'}}
```

The difference between `new_dog_registry` and `dog_registry` is subtle but can be impactful in your Python programs. In JSON, the keys must always be strings. When you converted `dog_registry` to `dog_json` using `json.dumps()`, the integer key `1` became the string `"1"`. When you used `json.loads()`, there was no way for Python to know that the string key should be an integer again. That’s why your dictionary key remained a string after deserialization.

You’ll investigate a similar behavior by doing another conversion roundtrip with other Python data types!

---

## Deserialize JSON Data Types

To explore how different data types behave in a roundtrip from Python to JSON and back, take a portion of the `dog_data` dictionary from a former section. Note how the dictionary contains different data types as values:

```py
dog_data = {
  "name": "Frieda",
  "is_dog": True,
  "hobbies": ["eating", "sleeping", "barking",],
  "age": 8,
  "address": {
    "work": None,
    "home": ("Berlin", "Germany",),
  },
}
```

The `dog_data` dictionary contains a bunch of common Python data types as values. For example, a string in line 2, a Boolean in line 3, a `NoneType` in line 7, and a tuple in line 8, just to name a few.

Next, convert `dog_data` to a JSON-formatted string and back to Python again. Afterward, have a look at the newly created dictionary:

```py
dog_data_json = json.dumps(dog_data)
dog_data_json
# 
# '{"name": "Frieda", "is_dog": true, "hobbies": ["eating", "sleeping", "barking"], "age": 8, "address": {"work": null, "home": ["Berlin", "Germany"]}}'

new_dog_data = json.loads(dog_data_json)
new_dog_data
# {'name': 'Frieda', 'is_dog': True, 'hobbies': ['eating', 'sleeping', 'barking'], 'age': 8, 'address': {'work': None, 'home': ['Berlin', 'Germany']}}
```

You can convert every JSON data type perfectly into a matching Python data type. The JSON Boolean `true` deserializes into `True`, `null` converts back into `None`, and objects and arrays become dictionaries and lists. Still, there’s one exception that you may encounter in roundtrips:

```py
type(dog_data["address"]["home"])
# 
# <class 'tuple'>

type(new_dog_data["address"]["home"])
# 
# <class 'list'>
```

When you serialize a Python tuple, it becomes a JSON array. When you load JSON, a JSON array correctly deserializes into a list because Python has no way of knowing that you want the array to be a tuple.

Problems like the one described above can always be an issue when you’re doing data roundtrips. When the roundtrip happens in the same program, you may be more aware of the expected data types. Data type conversions may be even more obfuscated when you’re dealing with external JSON files that originated in another program. You’ll investigate a situation like this next!

---

## Open an External JSON File With Python

In a previous section, you created a <VPIcon icon="fa-brands fa-python"/>`hello_frieda.py` file that saved a <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` file. If you need to refresh your memory, you can expand the collapsible section below that shows the code again:

```py title="hello_frieda.py"
import json

dog_data = {
  "name": "Frieda",
  "is_dog": True,
  "hobbies": ["eating", "sleeping", "barking",],
  "age": 8,
  "address": {
    "work": None,
    "home": ("Berlin", "Germany",),
  },
  "friends": [
    {
      "name": "Philipp",
      "hobbies": ["eating", "sleeping", "reading",],
    },
    {
      "name": "Mitch",
      "hobbies": ["running", "snacking",],
    },
  ],
}

with open("hello_frieda.json", mode="w", , encoding="utf-8") as write_file:
    json.dump(dog_data, write_file)
```

Take a look at the data types of the `dog_data` dictionary. Is there a data type in a value that the JSON format doesn’t support?

When you want to write content to a JSON file, you use `json.dump()`. The counterpart to `json.dump()` is `json.load()`. As the name suggests, you can use `json.load()` to load a JSON file into your Python program.

Jump back into the Python REPL and load the <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` JSON file from before:

```py
import json
with open("hello_frieda.json", mode="r", encoding="utf-8") as read_file:
    frie_data = json.load(read_file)

type(frie_data)
#
# <class 'dict'>

frie_data["name"]
#
# 'Frieda'
```

Just like when writing files, it’s a good idea to use a context manager when reading a file in Python. That way, you don’t need to bother with [**closing the file**](/realpython.com/why-close-file-python.md) again. When you want to read a JSON file, then you use `json.load()` inside the `with` statement’s block.

The argument for the `load()` function must be either a text file or a binary file. The Python object that you get from `json.load()` depends on the top-level data type of your JSON file. In this case, the JSON file contains an object at the top level, which deserializes into a dictionary.

When you deserialize a JSON file as a Python object, then you can interact with it natively—for example, by accessing the value of the `"name"` key with square bracket notation (`[]`). Still, there’s a word of caution here. Import the original `dog_data` dictionary from before and compare it to `frie_data`:

```py
from hello_frieda import dog_data
frie_data == dog_data
#
# False

type(frie_data["address"]["home"])
#
# <class 'list'>

type(dog_data["address"]["home"])
#
# <class 'tuple'>
```

When you load a JSON file as a Python object, then any JSON data type happily deserializes into Python. That’s because Python knows about all data types that the JSON format supports. Unfortunately, it’s not the same the other way around.

As you learned before, there are Python data types like `tuple` that you can convert into JSON, but you’ll end up with an `array` data type in the JSON file. Once you convert the JSON data back to Python, then an array deserializes into the Python `list` data type.

Generally, being cautious about data type conversions should be the concern of the Python program that writes the JSON. With the knowledge you have about JSON files, you can always anticipate which Python data types you’ll end up with as long as the JSON file is valid.

If you use `json.load()`, then the content of the file you load must contain valid JSON syntax. Otherwise, you’ll receive a [<VPIcon icon="fa-brands fa-python"/>`JSONDecodeError`](https://docs.python.org/3/library/json.html#json.JSONDecodeError). Luckily, Python caters to you with more tools you can use to interact with JSON. For example, it allows you to check a JSON file’s validity from the convenience of the terminal.
