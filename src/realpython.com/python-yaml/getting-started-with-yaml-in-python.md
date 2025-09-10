---
lang: en-US
title: "Getting Started With YAML in Python"
description: "Article(s) > (2/5) YAML: The Missing Battery in Python"
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
      content: "Article(s) > (2/5) YAML: The Missing Battery in Python"
    - property: og:description
      content: "Getting Started With YAML in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml/getting-started-with-yaml-in-python.html
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
  url="https://realpython.com/python-yaml#getting-started-with-yaml-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>



## Getting Started With YAML in Python

As you learned in the introduction, working with YAML in Python requires a few extra steps because the language doesn’t support this data format out of the box. You’re going to need a third-party library to serialize Python objects into YAML and the other way around.

In addition to this, you might find it useful to install these command-line tools with [**pip**](/realpython.com/what-is-pip.md) into your [**virtual environment**](/realpython.com/python-virtual-environments-a-primer.md) to help with debugging:

- [<VPIcon icon="iconfont icon-pypi"/>`yamllint`](https://pypi.org/project/yamllint/): A linter for YAML, which can check the syntax and more
- [<VPIcon icon="iconfont icon-pypi"/>`yq`](https://pypi.org/project/yq/): A command-line YAML processor based on [<VPIcon icon="fas fa-globe"/>jq](https://stedolan.github.io/jq/), for filtering data
- [<VPIcon icon="iconfont icon-pypi"/>`shyaml`](https://pypi.org/project/shyaml/): An alternative command-line YAML processor

These are all Python tools, but there’s also a widespread [Go implementation of yq (<VPIcon icon="iconfont icon-github"/>`mikefarah/yq`)](https://github.com/mikefarah/yq), which has a slightly different command-line interface. If you can’t or don’t want to install those programs, then you can always use one of the tools available online, such as:

- [<VPIcon icon="fas fa-globe"/>YAML Parser](https://jsonformatter.org/yaml-parser)
- [<VPIcon icon="fas fa-globe"/>YAML Formatter](https://jsonformatter.org/yaml-formatter)
- [<VPIcon icon="fas fa-globe"/>YAML Validator](https://jsonformatter.org/yaml-validator)

Note that you’ll need some of those tools in the following subsection only, while you’ll get your feet wet with YAML in pure Python for the rest of this tutorial.

### Serialize YAML Documents as JSON

Even though Python doesn’t provide a dedicated YAML parser or serializer, you can sidestep this problem to some extent with the help of the built-in `json` module. After all, you’ve learned that YAML is a superset of JSON, so you could dump your data to a regular JSON format in Python and expect external YAML parsers to accept it.

First, make a sample Python script to [**print out**](/realpython.com/python-print/README.md) JSON on the standard output:

```py title="print_json.py"
import datetime
import json

person = {
    "firstName": "John",
    "dateOfBirth": datetime.date(1969, 12, 31),
    "married": False,
    "spouse": None,
    "children": ["Bobby", "Molly"],
}

print(json.dumps(person, indent=4, default=str))
```

You create a dictionary and then call `json.dumps()` on it to dump a string. The parameter `default` specifies a function to call when Python can’t serialize an object to JSON, which is the case with the date of birth in this example. The built-in `str()` function will convert a `datetime.date` object to an ISO 8601 string.

Now, [**run your script**](/realpython.com/run-python-scripts.md) and feed its output to one of the command-line YAML parsers mentioned before, such as `yq` or `shyaml`, through a Unix pipeline (`|`):

```sh{8-9,18-19}
python print_json.py | yq -y .
# 
# firstName: John
# dateOfBirth: '1969-12-31'
# married: false
# spouse: null
# children:
#  - Bobby
#  - Molly

python print_json.py | shyaml get-value
# 
# firstName: John
# dateOfBirth: '1969-12-31'
# married: false
# spouse: null
# children:
# - Bobby
# - Molly
```

Nice! Both parsers formatted your data in a more canonical YAML format without complaining. However, because `yq` is a thin wrapper around JSON’s `jq`, you must request that it do the transcoding with the `-y` option and a trailing dot as a filtering expression. Also, notice a slight difference in the resulting indentation between `yq` and `shyaml`.

::: note

To use `yq`, you must first install `jq` in your operating system if it’s not already available.

:::

Okay, that felt like cheating, and it works only one way, as you can’t read a YAML file back into Python using the `json` module. Thankfully, there are ways to do that.

### Install the PyYAML Library

Python’s most popular third-party YAML library by far is [<VPIcon icon="iconfont icon-pypi"/>`PyYAML`](https://pypi.org/project/PyYAML/), which is consistently one of the [<VPIcon icon="fas fa-globe"/>top packages](https://pypistats.org/top) downloaded from [<VPIcon icon="iconfont icon-pypi"/>PyPI](https://pypi.org/). It has an interface that looks somewhat similar to the built-in JSON module, it’s actively maintained, and it has the blessing of the official YAML website, which lists it alongside a few less popular contenders.

To install PyYAML into your active virtual environment, type the following command in your terminal:

```sh
python -m pip install pyyaml
```

The library is self-contained and doesn’t require any further dependencies because it’s written in pure Python. However, most distributions bundle a compiled [**C binding**](/realpython.com/python-bindings-overview.md) for the [LibYAML (<VPIcon icon="iconfont icon-github"/>`yaml/libyaml`)](https://github.com/yaml/libyaml) library, which makes PyYAML run much faster. To confirm if your PyYAML installation comes with a C binding, open the interactive Python interpreter and run this code snippet:

```py
import yaml
yaml.__with_libyaml__
# 
# True
```

Even though PyYAML is the name of the library you’ve installed, you’ll be importing the `yaml` package in Python code. Also, note that you need to explicitly request that PyYAML take advantage of the noticeably faster shared C library, or else it’ll fall back to its default of pure Python. Read on to find out how to change this default behavior.

Despite its popularity, PyYAML has some drawbacks. For example, if you need to use features introduced in YAML 1.2, such as full JSON compliance or safer literals, then you’re better off using the [<VPIcon icon="iconfont icon-pypi"/>`ruamel.yaml`](https://pypi.org/project/ruamel.yaml/) library, which is derived from an older PyYAML version. As a bonus, it can do **round-trip parsing** to preserve the comments and original formatting when needed.

On the other hand, if **type safety** is your main concern or you’d like to validate YAML documents against a **schema**, then have a look at [<VPIcon icon="iconfont icon-pypi"/>`strictyaml`](https://pypi.org/project/strictyaml/), which intentionally restricts the YAML specification by disregarding its most risky features. Just keep in mind that it won’t run as quickly as the other two libraries.

For now, you’re going to stick with PyYAML for the rest of this tutorial because it’s the standard choice for most Python projects. Note that the tools listed earlier—yamllint, yq, and shyaml—use PyYAML under the surface!

### Read and Write Your First YAML Document

Suppose you want to read and parse a hypothetical email message that’s been serialized to the YAML format and stored in a [**string**](/realpython.com/python-strings.md) variable in Python:

```py
email_message = """\
message:
  date: 2022-01-16 12:46:17Z
  from: john.doe@domain.com
  to:
    - bobby@domain.com
    - molly@domain.com
  cc:
    - jane.doe@domain.com
  subject: Friendly reminder
  content: |
    Dear XYZ,

    Lorem ipsum dolor sit amet...
  attachments:
    image1.gif: !!binary
        R0lGODdhCAAIAPAAAAIGAfr4+SwAA
        AAACAAIAAACDIyPeWCsClxDMsZ3CgA7
"""
```

The quickest way of deserializing such a piece of YAML into a Python dictionary would be through the `yaml.safe_load()` function:

```py
import yaml
yaml.safe_load(email_message)
# 
# {
#   'message': {
#     'date': datetime.datetime(2022, 1, 16, 12, 46, 17, tzinfo=(...)),
#     'from': 'john.doe@domain.com',
#     'to': ['bobby@domain.com', 'molly@domain.com'],
#     'cc': ['jane.doe@domain.com'],
#     'subject': 'Friendly reminder',
#     'content': 'Dear XYZ,\n\nLorem ipsum dolor sit amet...\n',
#     'attachments': {
#       'image1.gif': b'GIF87a\x08\x00\x08\x00\xf0\x00\x00\x02...'
#     }
#   }
# }
```

Calling `safe_load()` is currently the recommended way of handling content received from **untrusted sources**, which could contain malicious code. YAML has an expressive syntax full of convenient features, which unfortunately open the door to a host of vulnerabilities. You’ll learn more about [exploiting YAML’s weaknesses](/realpython.com/python-yaml/loading-yaml-documents-in-python.md#explore-loaders-insecure-features) later.

::: note

Before version 6.0 of the PyYAML library, the default way of parsing YAML documents had always been the `yaml.load()` function, which defaulted to using an unsafe parser. With the latest release, you can still use this function, but it requires you to explicitly specify a particular loader class as a second parameter.

Introducing this additional parameter was a **breaking change** that resulted in many complaints from people maintaining software dependent on PyYAML. There’s still a [pinned issue (<VPIcon icon="iconfont icon-github"/>`yaml/pyyaml`)](https://github.com/yaml/pyyaml/issues/576) on the library’s GitHub repository about this backward incompatibility.

At the time of writing this tutorial, the official [<VPIcon icon="fas fa-globe"/>PyYAML documentation](https://pyyaml.org/wiki/PyYAMLDocumentation) as well as the bundled [**docstrings**](/realpython.com/documenting-python-code.md#documenting-your-python-code-base-using-docstrings) haven’t been updated to reflect the current code base, and they contain examples that don’t work anymore.

:::

The `safe_load()` function is one of several **shorthand functions** that encapsulate the use of various YAML loader classes under the hood. In this case, that single function call translates to the following more explicit yet equivalent code snippet:

```py
from yaml import load, SafeLoader
load(email_message, SafeLoader)
# 
# {
#   'message': {
#     'date': datetime.datetime(2022, 1, 16, 12, 46, 17, tzinfo=(...)),
#     'from': 'john.doe@domain.com',
#     'to': ['bobby@domain.com', 'molly@domain.com'],
#     'cc': ['jane.doe@domain.com'],
#     'subject': 'Friendly reminder',
#     'content': 'Dear XYZ,\n\nLorem ipsum dolor sit amet...\n',
#     'attachments': {
#       'image1.gif': b'GIF87a\x08\x00\x08\x00\xf0\x00\x00\x02...'
#     }
#   }
# }
```

One thing to remember when using the shorthand functions is that they hard-code the pure Python implementation. If you’d like to use the faster **C implementation**, then you must write a little bit of [<VPIcon icon="fa-brands fa-wikipedia-w"/>boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code) yourself:

```py
try:
    from yaml import CSafeLoader as SafeLoader
except ImportError:
    from yaml import SafeLoader

SafeLoader
# 
# <class 'yaml.cyaml.CSafeLoader'>
```

First, you try importing one of the loader classes prefixed with the letter *C* to denote the use of the C library binding. If that fails, then you import a corresponding class implemented in Python. Unfortunately, this makes your code look more verbose and prevents you from using the mentioned shortcut functions.

::: note

Had your YAML contained multiple documents, then `load()` or its wrappers would raise an [**exception**](/realpython.com/python-exceptions.md).

:::

You’ve already serialized a Python object to YAML before by abusing the built-in `json` module, but the result wasn’t a canonical form of YAML. Now, you’ll take advantage of the installed third-party PyYAML library to fix this. There’s a corresponding `yaml.safe_dump()` function, which takes a Python object and turns it into a string. You can feed it the output of `yaml.safe_load()` in order to reverse the parsing process:

```py
>>> yaml.safe_dump(yaml.safe_load(email_message))
#
# "message:\n  attachments:\n    image1.gif: !!binary |\n  (...)

print(yaml.safe_dump(yaml.safe_load(email_message)))
#
# message:
#   attachments:
#     image1.gif: !!binary |
#       R0lGODdhCAAIAPAAAAIGAfr4+SwAAAAACAAIAAACDIyPeWCsClxDMsZ3CgA7
#     cc:
#     - jane.doe@domain.com
#     content: 'Dear XYZ,
#  
#       Lorem ipsum dolor sit amet...
#  
#       '
#   date: 2022-01-16 12:46:17+00:00
#   from: john.doe@domain.com
#   subject: Friendly reminder
#   to:
#   - bobby@domain.com
#   - molly@domain.com
```

The result is a string object with your email message serialized to YAML again. However, it’s not quite the same YAML that you originally started with. As you can see, `safe_dump()` sorted the dictionary keys for you, quoted the multiline strings, and used a slightly different indentation. You can change some of this and apply more tweaks to the formatting through several keyword arguments that you’ll explore in [one of the upcoming sections](/realpython.com/python-yaml/dumping-python-objects-to-yaml-documents.md#tweak-the-formatting-with-optional-parameters).