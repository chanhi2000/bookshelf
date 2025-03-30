---
lang: en-US
title: "Parsing YAML Documents at a Low Level"
description: "Article(s) > (5/5) YAML: The Missing Battery in Python"
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
      content: "Article(s) > (5/5) YAML: The Missing Battery in Python"
    - property: og:description
      content: "Parsing YAML Documents at a Low Level"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml/parsing-yaml-documents-at-a-low-level.html
next: /realpython.com/python-yaml/README.md#conclusion
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
  url="https://realpython.com/python-yaml#parsing-yaml-documents-at-a-low-level"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>



## Parsing YAML Documents at a Low Level

The classes and a few wrapper functions that you’ve used so far constitute a high-level PyYAML interface, which hides the implementation details of working with YAML documents. This covers most of the use cases and allows you to focus on the data rather than its presentation. However, sometimes you might want more control over the parsing and serialization processes.

In those rare cases, the library exposes its inner workings to you through several low-level functions. There are four ways to read a YAML stream:

| Reading Function | Return Value | Lazy? |
| ---: | :---: | :---: |
| `yaml.scan()` | Tokens | ✔️ |
| `yaml.parse()` | Events | ✔️ |
| `yaml.compose()` | Node |  |
| `yaml.compose_all()` | Nodes | ✔️ |

All of these functions accept a stream and an optional loader class, which defaults to `yaml.Loader`. In addition to this, most of them return a generator object, letting you process YAML in a **streaming fashion**, which wasn’t possible up to this point. You’ll learn about the differences between tokens, events, and nodes a bit later.

There are also a few counterpart functions for writing YAML to a stream:

| Writing Function | Input | Example |
| ---: | :---: | --- |
| `yaml.emit()` | Events | `yaml.emit(yaml.parse(data))` |
| `yaml.serialize()` | Node | `yaml.serialize(yaml.compose(data))` |
| `yaml.serialize_all()` | Nodes | `yaml.serialize_all(yaml.compose_all(data))` |

Note that whatever function you choose, you’ll probably have more work to do than before. For example, handling YAML tags or interpreting string values as the correct native data type will be in your court now. Some of these steps may be unnecessary, though, depending on your use case.

In this section, you’ll implement three hands-on examples of these low-level functions in PyYAML.

### Tokenize a YAML Document

You’ll get the most granular control by scanning a YAML document to obtain a stream of [<FontIcon icon="fa-brands fa-wikipedia-w"/>tokens](https://en.wikipedia.org/wiki/Lexical_analysis#Token). Each token has a unique meaning and tells you where it starts and where it ends, including the exact line and column number, as well as the offset from the beginning of the document:

```py :collapsed-lines
import yaml
for token in yaml.scan("Lorem ipsum", yaml.SafeLoader):
    print(token)
    print(token.start_mark)
    print(token.end_mark)
#
# StreamStartToken(encoding=None)
#  in "<unicode string>", line 1, column 1:
#  Lorem ipsum
#  ^
#  in "<unicode string>", line 1, column 1:
#  Lorem ipsum
#  ^
# ScalarToken(plain=True, style=None, value='Lorem ipsum')
#  in "<unicode string>", line 1, column 1:
#  Lorem ipsum
#  ^
#  in "<unicode string>", line 1, column 12:
#  Lorem ipsum
#  ^
# StreamEndToken()
#  in "<unicode string>", line 1, column 12:
#  Lorem ipsum
#  ^
#  in "<unicode string>", line 1, column 12:
#  Lorem ipsum
#  ^
```

The token’s `.start_mark` and `.end_mark` attributes contain all the relevant information. That’s perfect if you want to implement a YAML syntax highlighter plugin for your favorite [**code editor**](/realpython.com/python-ides-code-editors-guide.md), for example. In fact, why don’t you go ahead and build a bare-bones command-line tool for printing YAML content in color?

First, you need to narrow down the token types, as you’ll only be interested in coloring scalar values, mapping keys, and YAML tags. Create a new file named `colorize.py` and place the following function in it:

```py title="colorize.py"
import yaml

def tokenize(text, loader=yaml.SafeLoader):
    last_token = yaml.ValueToken(None, None)
    for token in yaml.scan(text, loader):
        start = token.start_mark.index
        end = token.end_mark.index
        if isinstance(token, yaml.TagToken):
            yield start, end, token
        elif isinstance(token, yaml.ScalarToken):
            yield start, end, last_token
        elif isinstance(token, (yaml.KeyToken, yaml.ValueToken)):
            last_token = token
```

It’s a thin wrapper around PyYAML’s `yaml.scan()` function, which generates tuples comprising the start index, the end index, and a token instance. Here’s a more detailed breakdown:

- **Line 4** defines a variable to hold the last token instance. Only the scalar and tag tokens contain a value, so you must remember their context somewhere to choose the right color later. The initial value accounts for when the document contains only a scalar without any context.
- **Line 5** loops over the scanned tokens.
- **Lines 6 and 7** extract the token’s position within the text from the index markers available on all tokens. The token’s position is delimited with `start` and `end`.
- **Lines 8 to 11** check the current token type and yield the indices and a token instance. If the token is a tag, then it gets yielded. If the token is a scalar, then `last_token` is yielded because scalars can appear in different contexts, and you need to know what the current context is to select the appropriate color.
- **Lines 12 and 13** update the context if the current token is either a mapping key or a value. Other token types get ignored, as they don’t have a meaningful visual representation.

When you import your function into an interactive Python interpreter session, then you should be able to start iterating over the subset of tokens with their relevant indices:

```py
from colorize import tokenize
for token in tokenize("key: !!str value"):
    print(token)
#
# (0, 3, KeyToken())
# (5, 10, TagToken(value=('!!', 'str')))
# (11, 16, ValueToken())
```

Neat! You can take advantage of these tuples to annotate tokens in the original text using a third-party library or [**ANSI escape sequences**](/realpython.com/python-print/README.md#adding-colors-with-ansi-escape-sequences) as long as your terminal supports them. Here are a few sample colors with their escape sequences:

| Color | Font Weight | Escape Sequence |
| :---: | :---: | --- |
| Blue | Bold | `ESC[34;1m` |
| Cyan | Regular | `ESC[36m` |
| Red | Regular | `ESC[31m` |

For example, keys could become blue, values might be cyan, and YAML tags could turn red. Remember that you can’t modify a sequence of elements while iterating over them, because that would shift their indices. What you can do, however, is start the iteration from the other end. That way, inserting the escape sequences won’t affect the remaining part of the text.

Return to your code editor now and add another function to the Python source file:

```py title="colorize.py"
import yaml

def colorize(text):
    colors = {
        yaml.KeyToken: lambda x: f"\033[34;1m{x}\033[0m",
        yaml.ValueToken: lambda x: f"\033[36m{x}\033[0m",
        yaml.TagToken: lambda x: f"\033[31m{x}\033[0m",
    }

    for start, end, token in reversed(list(tokenize(text))):
        color = colors.get(type(token), lambda text: text)
        text = text[:start] + color(text[start:end]) + text[end:]

    return text
# ...
```

This new function iterates over a tokenized text in [**reverse**](/realpython.com/python-reverse-list.md) and inserts escape code sequences where indicated by `start` and `end`. Note that it’s not the most efficient way of doing this, because you essentially end up making lots of text copies due to slicing and concatenating.

The final piece of the puzzle is taking YAML from the [<FontIcon icon="fa-brands fa-wikipedia-w"/>standard input](https://en.wikipedia.org/wiki/Standard_streams#Standard_input_(stdin)) and presenting it onto the standard output stream:

```py{2,6-7} title="colorize.py"
import sys
import yaml

# ...

if __name__ == "__main__":
    print(colorize("".join(sys.stdin.readlines())))
```

You import the `sys` module from Python’s standard library and pass the `sys.stdin` reference to the `colorize()` function that you just created. Now, you may run your script in the terminal and enjoy color-coded YAML tokens:

<VidStack src="vimeo/673193047" />

Note that the `cat` command isn’t available on Windows. If that’s your operating system, then use its [<FontIcon icon="fa-brands fa-microsoft"/>`type`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/type) counterpart, and make sure to run the command through the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Terminal](https://en.wikipedia.org/wiki/Terminal_(Windows)) application instead of the [<FontIcon icon="fa-brands fa-wikipedia-w"/>Command Prompt (`cmd.exe`)](https://en.wikipedia.org/wiki/Cmd.exe) or [<FontIcon icon="fa-brands fa-wikipedia-w"/>Windows PowerShell](https://en.wikipedia.org/wiki/PowerShell) to have the ANSI escape code support enabled by default.

Expand the collapsible section below for the complete source code of your script:

```py :collapsed-lines title="colorize.py"
import sys
import yaml

def colorize(text):
    colors = {
        yaml.KeyToken: lambda x: f"\033[34;1m{x}\033[0m",
        yaml.ValueToken: lambda x: f"\033[36m{x}\033[0m",
        yaml.TagToken: lambda x: f"\033[31m{x}\033[0m",
    }

    for start, end, token in reversed(list(tokenize(text))):
        color = colors.get(type(token), lambda text: text)
        text = text[:start] + color(text[start:end]) + text[end:]

    return text

def tokenize(text, loader=yaml.SafeLoader):
    last_token = yaml.ValueToken(None, None)
    for token in yaml.scan(text, loader):
        start = token.start_mark.index
        end = token.end_mark.index
        if isinstance(token, yaml.TagToken):
            yield start, end, token
        elif isinstance(token, yaml.ScalarToken):
            yield start, end, last_token
        elif isinstance(token, (yaml.KeyToken, yaml.ValueToken)):
            last_token = token

if __name__ == "__main__":
    print(colorize("".join(sys.stdin.readlines())))
```

Tokenizing was great for implementing a syntax highlighter, which must be able to reference symbols in the source YAML file. However, it may be a little too low-level for other applications that don’t care about the exact layout of your input data. Next up, you’ll learn about an alternative way to process YAML, which also involves streaming.

### Parse a Stream of Events

Another low-level interface provided by PyYAML is an **event-driven streaming** API, which works similarly to SAX in XML. It translates YAML into a flat sequence of events triggered by the individual elements. The events are evaluated lazily without loading the entire document into memory. You can think of it as peeking through a moving window.

This can help bypass memory limitations that you might face when trying to read a huge file. It can also considerably speed up searching for a very specific piece of information in the ocean of noise. Apart from that, streaming makes it possible to incrementally build an alternative representation for your data. In this section, you’ll create an HTML builder to visualize YAML in a crude way.

When you parse a document with PyYAML, the library yields a sequence of events:

```py
import yaml
for event in yaml.parse("[42, {pi: 3.14, e: 2.72}]", yaml.SafeLoader):
    print(event)
#
# StreamStartEvent()
# DocumentStartEvent()
# SequenceStartEvent(anchor=None, tag=None, implicit=True)
# ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='42')
# MappingStartEvent(anchor=None, tag=None, implicit=True)
# ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='pi')
# ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='3.14')
# ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='e')
# ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='2.72')
# MappingEndEvent()
# SequenceEndEvent()
# DocumentEndEvent()
# StreamEndEvent()
```

As you can see, there are various types of events that correspond to different elements in a YAML document. Some of those events expose additional attributes, which you can inspect to learn more about the element at hand.

You can imagine how these events could naturally translate to opening and closing tags in a hierarchical markup language like HTML. For example, you might represent the structure above with the following markup snippet:

```html
<ul>
  <li>42</li>
  <li>
    <dl>
      <dt>pi</dt>
      <dd>3.14</dd>
      <dt>e</dt>
      <dd>2.72</dd>
    </dl>
  </li>
</ul>
```

A single list item gets wrapped between the `<li>` and `</li>` tags, while a key-value mapping takes advantage of the [<FontIcon icon="fa-brands fa-firefox"/>description list (`<dl>`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl), which contains alternating [<FontIcon icon="fa-brands fa-firefox"/>terms (`<dt>`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt) and [<FontIcon icon="fa-brands fa-firefox"/>definitions (`<dd>`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd). This is the tricky part because it requires counting the subsequent YAML events on a given nesting level to determine whether an event should become a term or a definition in HTML.

Ultimately, you want to design an `HTMLBuilder` class to help you with parsing multiple YAML documents from a stream in a lazy manner. Assuming you’ve already defined such a class, you can create the following helper function in a file named <FontIcon icon="fa-brands fa-python"/>`yaml2html.py`:

```py title="yaml2html.py"
import yaml

# ...

def yaml2html(stream, loader=yaml.SafeLoader):
    builder = HTMLBuilder()
    for event in yaml.parse(stream, loader):
        builder.process(event)
        if isinstance(event, yaml.DocumentEndEvent):
            yield builder.html
            builder = HTMLBuilder()
```

The code loops over a sequence of parser events and hands them over to your class, which translates YAML to HTML by incrementally building its representation. Once the function detects the end of a YAML document in a stream, it yields an HTML fragment and creates a new empty builder to start over. That avoids blocking during the processing of a potentially infinitely long stream of YAML documents, which might arrive over the wire:

```py
from yaml2html import yaml2html
for document in yaml2html("""
---
title: "Document #1"
---
title: "Document #2"
---
title: "Document #3"
"""):
    print(document)
#
# <dl><dt>title</dt><dd>Document #1</dd></dl>
# <dl><dt>title</dt><dd>Document #2</dd></dl>
# <dl><dt>title</dt><dd>Document #3</dd></dl>
```

The example above demonstrates a stream consisting of three YAML documents, which the helper function turns into separate HTML fragments. Now that you understand the expected behavior, it’s time to implement the `HTMLBuilder` class.

The initializer method in your builder class will define two private fields to keep track of the current context and the HTML content built so far:

```py title="yaml2html.py"
import yaml

class HTMLBuilder:
    def __init__(self):
        self._context = []
        self._html = []

    @property
    def html(self):
        return "".join(self._html)

# ...
```

The context is a [**stack**](/realpython.com/how-to-implement-python-stack.md) implemented as a Python list, which stores the number of key-value pairs on the given level processed so far. The stack can also contain list markers that indicate a state between `SequenceStartEvent` and `SequenceEndEvent`. The other field is a list of HTML tags and their content, joined by a public class property.

There’s a handful of YAML events that you’ll want to process:

```py :collapsed-lines title="yaml2html.py"
import yaml

from yaml import (
    ScalarEvent,
    SequenceStartEvent,
    SequenceEndEvent,
    MappingStartEvent,
    MappingEndEvent,
)

OPEN_TAG_EVENTS = (ScalarEvent, SequenceStartEvent, MappingStartEvent)
CLOSE_TAG_EVENTS = (ScalarEvent, SequenceEndEvent, MappingEndEvent)

class HTMLBuilder:
    # ...

    def process(self, event):

        if isinstance(event, OPEN_TAG_EVENTS):
            self._handle_tag()

        if isinstance(event, ScalarEvent):
            self._html.append(event.value)
        elif isinstance(event, SequenceStartEvent):
            self._html.append("<ul>")
            self._context.append(list)
        elif isinstance(event, SequenceEndEvent):
            self._html.append("</ul>")
            self._context.pop()
        elif isinstance(event, MappingStartEvent):
            self._html.append("<dl>")
            self._context.append(0)
        elif isinstance(event, MappingEndEvent):
            self._html.append("</dl>")
            self._context.pop()

        if isinstance(event, CLOSE_TAG_EVENTS):
            self._handle_tag(close=True)
# ...
```

You start processing an event by checking if there are any open tags on the stack pending some action. You delegate this check to another helper method, `._handle_tag()`, which you’ll add later. Then, you append the HTML tag corresponding to the current event and again update the context.

Here’s a quick line-by-line rundown of the snippet above:

- **Lines 3 to 9** import the needed event types from PyYAML.
- **Lines 11 and 12** specify the event types corresponding to HTML opening and closing tags.
- **Lines 22 to 35** append the corresponding HTML tag and update the stack as necessary.
- **Lines 19, 20, 37, and 38** open or close pending tags on the stack and optionally update the number of key-value pairs processed.

The missing part is the helper method responsible for opening and closing matching tags when necessary:

```py title="yaml2html.py"
import yaml

# ...

class HTMLBuilder:
    # ...

    def _handle_tag(self, close=False):
        if len(self._context) > 0:
            if self._context[-1] is list:
                self._html.append("</li>" if close else "<li>")
            else:
                if self._context[-1] % 2 == 0:
                    self._html.append("</dt>" if close else "<dt>")
                else:
                    self._html.append("</dd>" if close else "<dd>")
                if close:
                    self._context[-1] += 1
# ...
```

If there’s something on the stack already, then you check the last item pushed onto it. If it was a list, then you open or close a list item. Otherwise, depending on the [<FontIcon icon="fa-brands fa-wikipedia-w"/>parity of the number](https://en.wikipedia.org/wiki/Parity_(mathematics)) of key-value mappings, it’s time to open or close a term or definition from a description list.

You can optionally turn your Python module into an executable script by adding the [<FontIcon icon="fa-brands fa-python"/>`if __name__` idiom](https://docs.python.org/3/library/__main__.html#idiomatic-usage) at the bottom:

```py title="yaml2html.py"
import sys

# ...

if __name__ == "__main__":
    print("".join(yaml2html("".join(sys.stdin.readlines()))))
```

It’ll let you preview the visual representation of YAML in your terminal when you pipe the HTML output to a [<FontIcon icon="fa-brands fa-wikipedia-w"/>text-based web browser](https://en.wikipedia.org/wiki/Text-based_web_browser) like [<FontIcon icon="fa-brands fa-wikipedia-w"/>Lynx](https://en.wikipedia.org/wiki/Lynx_(web_browser)) or the [<FontIcon icon="iconfont icon-github"/>`grobian/html2text`](https://github.com/grobian/html2text) converter:

```sh
echo '[42, {pi: 3.14, e: 2.72}]' | python yaml2html.py | html2text
#
#  * 42
#  *   pi
#         3.14
#      e
#         2.72
```

The `echo` command should work on all major operating systems. It prints a piece of text in the terminal, which you can hook up to another command [<FontIcon icon="fa-brands fa-wikipedia-w"/>pipeline](https://en.wikipedia.org/wiki/Pipeline_(Unix)) using the vertical bar character (`|`). In this case, you process a short YAML document with your `yaml2html.py` script and then convert the resulting HTML to a simplified textual form that you can preview in the terminal without starting a full-fledged web browser.

Click the collapsible section below to reveal the complete source code:

```py :collapsed-lines title="yaml2html.py"
import sys
import yaml

from yaml import (
    ScalarEvent,
    SequenceStartEvent,
    SequenceEndEvent,
    MappingStartEvent,
    MappingEndEvent,
)

OPEN_TAG_EVENTS = (ScalarEvent, SequenceStartEvent, MappingStartEvent)
CLOSE_TAG_EVENTS = (ScalarEvent, SequenceEndEvent, MappingEndEvent)

class HTMLBuilder:
    def __init__(self):
        self._context = []
        self._html = []

    @property
    def html(self):
        return "".join(self._html)

    def process(self, event):

        if isinstance(event, OPEN_TAG_EVENTS):
            self._handle_tag()

        if isinstance(event, ScalarEvent):
            self._html.append(event.value)
        elif isinstance(event, SequenceStartEvent):
            self._html.append("<ul>")
            self._context.append(list)
        elif isinstance(event, SequenceEndEvent):
            self._html.append("</ul>")
            self._context.pop()
        elif isinstance(event, MappingStartEvent):
            self._html.append("<dl>")
            self._context.append(0)
        elif isinstance(event, MappingEndEvent):
            self._html.append("</dl>")
            self._context.pop()

        if isinstance(event, CLOSE_TAG_EVENTS):
            self._handle_tag(close=True)

    def _handle_tag(self, close=False):
        if len(self._context) > 0:
            if self._context[-1] is list:
                self._html.append("</li>" if close else "<li>")
            else:
                if self._context[-1] % 2 == 0:
                    self._html.append("</dt>" if close else "<dt>")
                else:
                    self._html.append("</dd>" if close else "<dd>")
                if close:
                    self._context[-1] += 1

def yaml2html(stream, loader=yaml.SafeLoader):
    builder = HTMLBuilder()
    for event in yaml.parse(stream, loader):
        builder.process(event)
        if isinstance(event, yaml.DocumentEndEvent):
            yield builder.html
            builder = HTMLBuilder()

if __name__ == "__main__":
    print("".join(yaml2html("".join(sys.stdin.readlines()))))
```

Great job! You can now visualize YAML in your web browser. However, the presentation is static. Wouldn’t it be nice to spice it up with a little bit of interactivity? Next up, you’ll use a different approach to parsing YAML, which will allow just that!

### Build a Tree of Nodes

Sometimes you do need to have the entire document held in memory to look ahead and make an informed decision based on what comes next. PyYAML can build an object representation of the YAML element hierarchy that resembles the DOM in XML. By calling `yaml.compose()`, you’ll get the root node of an element tree:

```py
import yaml
root = yaml.compose("[42, {pi: 3.14, e: 2.72}]", yaml.SafeLoader)
root
#
# SequenceNode(
#     tag='tag:yaml.org,2002:seq',
#     value=[
#         ScalarNode(tag='tag:yaml.org,2002:int', value='42'),
#         MappingNode(
#             tag='tag:yaml.org,2002:map',
#             value=[
#                 (
#                     ScalarNode(tag='tag:yaml.org,2002:str', value='pi'),
#                     ScalarNode(tag='tag:yaml.org,2002:float', value='3.14')
#                 ),
#                 (
#                     ScalarNode(tag='tag:yaml.org,2002:str', value='e'),
#                     ScalarNode(tag='tag:yaml.org,2002:float', value='2.72')
#                 )
#             ]
#         )
#     ]
# )
```

The root is traversable through the square brackets syntax. You can reach for any descendant element in the tree using node’s `.value` attribute and subscripts:

```py
key, value = root.value[1].value[0]

key
#
# ScalarNode(tag='tag:yaml.org,2002:str', value='pi')

value
#
# ScalarNode(tag='tag:yaml.org,2002:float', value='3.14')
```

Because there are only three kinds of nodes (`ScalarNode`, `SequenceNode`, and `MappingNode`), you might automate their traversal with a recursive function:

```py title="tree.py"
import yaml

def visit(node):
    if isinstance(node, yaml.ScalarNode):
        return node.value
    elif isinstance(node, yaml.SequenceNode):
        return [visit(child) for child in node.value]
    elif isinstance(node, yaml.MappingNode):
        return {visit(key): visit(value) for key, value in node.value}
```

Place this function in a Python script named `tree.py`, as you’ll be developing the code. The function takes a single node and, depending on its type, returns its value or enters a relevant subtree. Note that mapping keys must also be visited, because they can be non-scalar values in YAML.

Then, import your function in an interactive Python interpreter session and give it a test drive against the root element that you created before:

```py
from tree import visit
visit(root)
#
# ['42', {'pi': '3.14', 'e': '2.72'}]
```

You get a Python list as a result, but the individual scalar values contained in it are all strings. PyYAML detects the data type associated with a scalar value and stores it in the node’s `.tag` attribute, but you have to do the typecasting yourself. The types are encoded using **YAML global tags**, such as `"tag:yaml.org,2002:float"`, so you may extract the last bit after the second colon (`:`).

Modify your function by wrapping the return value of a scalar with a call to a new `cast()` function:

```py {1-2,7} :collapsed-lines title="tree.py"
import base64
import datetime
import yaml

def visit(node):
    if isinstance(node, yaml.ScalarNode):
        return cast(node.value, node.tag)
    elif isinstance(node, yaml.SequenceNode):
        return [visit(child) for child in node.value]
    elif isinstance(node, yaml.MappingNode):
        return {visit(key): visit(value) for key, value in node.value}

def cast(value, tag):
    match tag.split(":")[-1]:
        case "null":
            return None
        case "bool":
            return bool(value)
        case "int":
            return int(value)
        case "float":
            return float(value)
        case "timestamp":
            return datetime.datetime.fromisoformat(value)
        case "binary":
            return base64.decodebytes(value.encode("utf-8"))
        case _:
            return str(value)
```

You can leverage the new `match` and `case` keywords introduced in Python 3.10 with the [**structural pattern matching**](/realpython.com/python310-new-features.md#structural-pattern-matching) syntax, or you can rewrite this example using a plain old `if` statement. The bottom line is that you should now be getting values of native Python types when you [<FontIcon icon="fa-brands fa-python"/>reload the module](https://docs.python.org/3/library/importlib.html#importlib.reload) in your interactive interpreter session:

```py
import importlib, tree
importlib.reload(tree)
#
# <module 'tree' from '/home/realpython/tree.py'>

visit(root)
#
# [42, {'pi': 3.14, 'e': 2.72}]

visit(yaml.compose("when: 2022-01-16 23:59:59"))
#
# {'when': datetime.datetime(2022, 1, 16, 23, 59, 59)}
```

You’re all set to generate an HTML string instead of a Python object. Replace the return values in `visit()` with calls to even more helper functions:

```py{9,11} title="tree.py"
import base64
import datetime
import yaml

def visit(node):
    if isinstance(node, yaml.ScalarNode):
        return cast(node.value, node.tag)
    elif isinstance(node, yaml.SequenceNode):
        return html_list(node)    
    elif isinstance(node, yaml.MappingNode):
        return html_map(node) 

# ...

def html_list(node):
    items = "".join(f"<li>{visit(child)}</li>" for child in node.value)
    return f'<ul class="sequence">{items}</ul>'

def html_map(node):
    pairs = "".join(
        f'<li><span class="key">{visit(key)}:</span> {visit(value)}</li>'
        if isinstance(value, yaml.ScalarNode) else (
            "<li>"
            "<details>"
            f'<summary class="key">{visit(key)}</summary> {visit(value)}'
            "</details>"
            "</li>"
        )
        for key, value in node.value
    )
    return f"<ul>{pairs}</ul>"
```

Both helper functions take a node instance and return a piece of HTML string. The `html_list()` function expects a `SequenceNode` iterated over with a [**generator expression**](/realpython.com/introduction-to-python-generators.md#building-generators-with-generator-expressions), while `html_map()` iterates over keys and values of a `MappingNode`. This is where knowing the entire tree structure in advance helps. If the mapping value is a `ScalarNode`, then you replace it with a `<span>` element. Other node types get wrapped in a collapsible [<FontIcon icon="fa-brands fa-firefox"/>`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) tag.

Because you’ll produce HTML output, you may streamline the typecasting function by returning only plain strings. At the same time, you can return an HTML `<img>` element for the Base64-encoded data and display that element instead of showing raw bytes. Other than that, regular scalars could be wrapped in either a `<span>` or an appropriately styled `<div>` element depending on if they contain single or multiline content:

```py title="tree.py"
import yaml

# ...

def cast(value, tag):
    match tag.split(":")[-1]:
        case "binary":
            return f'<img src="data:image/png;base64, {value}" />'
        case _:
            if "\n" in value:
                return f'<div class="multiline">{value}</div>'
            else:
                return f"<span>{value}</span>"
```

The `src` attribute of an HTML `<img>` element recognizes the encoded data. Note that you don’t need the `base64` or the `datetime` imports anymore, so go ahead and remove them from the top of the file.

As always, you want to make your script runnable by reading content from the standard input. You also wrap the generated HTML body with some boilerplate in a new `html_tree()` function:

```py{1,27-28} title="tree.py"
import sys
import yaml

def html_tree(stream, loader=yaml.SafeLoader):
    body = visit(yaml.compose(stream, loader))
    return (
        "<!DOCTYPE html>"
        "<html>"
        "<head>"
        "  <meta charset=\"utf-8\">"
        "  <title>YAML Tree Preview</title>"
        "  <link href=\"https://fonts.googleapis.com/css2"
        "?family=Roboto+Condensed&display=swap\" rel=\"stylesheet\">"
        "  <style>"
        "    * { font-family: 'Roboto Condensed', sans-serif; }"
        "    ul { list-style: none; }"
        "    ul.sequence { list-style: '- '; }"
        "    .key { font-weight: bold; }"
        "    .multiline { white-space: pre; }"
        "  </style>"
        "</head>"
        f"<body>{body}</body></html>"
    )

# ...

if __name__ == "__main__":
    print(html_tree("".join(sys.stdin.readlines())))
```

This HTML uses an embedded [<FontIcon icon="fa-brands fa-google"/>Google Font](https://fonts.google.com/) for a more pleasant look. The inline [<FontIcon icon="fa-brands fa-wikipdia-w"/>CSS styling](https://en.wikipedia.org/wiki/CSS) removes bullet points from regular unordered lists because you use bullet points for key-value mappings. However, lists explicitly marked as sequences use a dash in front of every item. Mapping keys are displayed in bold font, and multiline strings preserve the whitespace.

When you run the script against some test data, then it’ll output a piece of HTML code that you can redirect to a local file, which you can open with your default web browser:

::: tabs

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```batchfile
type data.yaml | python tree.py > index.html
start index.html
```

@tab <FontIcon icon="fa-brands fa-linux"/>

```sh
cat data.yaml | python tree.py > index.html
xdg-open index.html
```

@tab <FontIcon icon="iconfont icon-macos"/>

```sh
cat data.yaml | python tree.py > index.html
open index.html
```

:::

The resulting page will let you expand and collapse the individual key-value pairs interactively when previewed in a web browser:

<VidStack src="vimeo/691778178" />
<!-- Interactive HTML Tree of YAML Nodes -->

Notice how the web browser renders the Base64-encoded image depicting a smiley face. You’ll find the final code in the collapsible section below:

```py :collapsed-lines title="tree.py"
import sys
import yaml

def html_tree(stream, loader=yaml.SafeLoader):
    body = visit(yaml.compose(stream, loader))
    return (
        "<!DOCTYPE html>"
        "<html>"
        "<head>"
        "  <meta charset=\"utf-8\">"
        "  <title>YAML Tree Preview</title>"
        "  <link href=\"https://fonts.googleapis.com/css2"
        "?family=Roboto+Condensed&display=swap\" rel=\"stylesheet\">"
        "  <style>"
        "    * { font-family: 'Roboto Condensed', sans-serif; }"
        "    ul { list-style: none; }"
        "    ul.sequence { list-style: '- '; }"
        "    .key { font-weight: bold; }"
        "    .multiline { white-space: pre; }"
        "  </style>"
        "</head>"
        f"<body>{body}</body></html>"
    )

def visit(node):
    if isinstance(node, yaml.ScalarNode):
        return cast(node.value, node.tag)
    elif isinstance(node, yaml.SequenceNode):
        return html_list(node)
    elif isinstance(node, yaml.MappingNode):
        return html_map(node)

def cast(value, tag):
    match tag.split(":")[-1]:
        case "binary":
            return f'<img src="data:image/png;base64, {value}" />'
        case _:
            if "\n" in value:
                return f'<div class="multiline">{value}</div>'
            else:
                return f"<span>{value}</span>"

def html_list(node):
    items = "".join(f"<li>{visit(child)}</li>" for child in node.value)
    return f'<ul class="sequence">{items}</ul>'

def html_map(node):
    pairs = "".join(
        f'<li><span class="key">{visit(key)}:</span> {visit(value)}</li>'
        if isinstance(value, yaml.ScalarNode) else (
            "<li>"
            "<details>"
            f'<summary class="key">{visit(key)}</summary> {visit(value)}'
            "</details>"
            "</li>"
        )
        for key, value in node.value
    )
    return f"<ul>{pairs}</ul>"

if __name__ == "__main__":
    print(html_tree("".join(sys.stdin.readlines())))
```

All right, that’s all when it comes to parsing YAML documents at a low level using the PyYAML library. The corresponding `yaml.emit()` and `yaml.serialize()` functions work the other way around by taking a sequence of events or the root node, respectively, and turning them into a YAML representation. But you’ll rarely need to use them.
