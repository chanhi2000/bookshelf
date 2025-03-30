---
lang: en-US
title: "Taking a Crash Course in YAML"
description: "Article(s) > (1/5) YAML: The Missing Battery in Python"
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
      content: "Article(s) > (1/5) YAML: The Missing Battery in Python"
    - property: og:description
      content: "Taking a Crash Course in YAML"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml/taking-a-crash-course-in-yaml.html
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
  url="https://realpython.com/python-yaml#taking-a-crash-course-in-yaml"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>



## Taking a Crash Course in YAML

In this section, you’re going to learn the basic facts about YAML, including its uses, syntax, and some of its unique and powerful features. If you’ve worked with YAML before, then you can skip ahead and continue reading from the [next section](/realpython.com/python-yaml/getting-started-with-yaml-in-python.md), which covers using YAML in Python.

### Historical Context

YAML, which rhymes with *camel*, is a [<FontIcon icon="fa-brands fa-wikipeida-w"/>recursive acronym](https://en.wikipedia.org/wiki/Recursive_acronym) that stands for **YAML Ain’t Markup Language** because it’s *not* a markup language! Interestingly enough, the [<FontIcon icon="iconfont icon-yaml"/>original draft](https://yaml.org/spec/history/2001-05-26.html) for the YAML specification defined the language as *Yet Another Markup Language*, but later the current [<FontIcon icon="fa-brands fa-wikipeida-w"/>backronym](https://en.wikipedia.org/wiki/Backronym) was adopted to more accurately describe the language’s purpose.

An actual [<FontIcon icon="fa-brands fa-wikipeida-w"/>markup language](https://en.wikipedia.org/wiki/Markup_language), such as Markdown or HTML, lets you annotate text with formatting or processing instructions intermixed with your content. Markup languages are, therefore, primarily concerned with text documents, whereas YAML is a [**<FontIcon icon="fa-brands fa-wikipeida-w"/>data serialization format**](https://en.wikipedia.org/wiki/Comparison_of_data-serialization_formats) that integrates well with common data types native to many programming languages. There’s no inherent text in YAML, only data to represent.

YAML was originally meant to simplify [<FontIcon icon="fa-brands fa-wikipeida-w"/>Extensible Markup Language (XML)](https://en.wikipedia.org/wiki/XML), but in reality, it has a lot more in common with [<FontIcon icon="fa-brands fa-wikipeida-w"/>JavaScript Object Notation (JSON)](https://en.wikipedia.org/wiki/JSON). In fact, it’s a superset of JSON.

Even though XML was initially designed to be a metalanguage for creating markup languages for documents, people quickly adopted it as the standard data serialization format. The HTML-like syntax of angle brackets made XML look familiar. Suddenly, everyone wanted to use XML as their configuration, persistence, or messaging format.

As the first kid on the block, XML dominated the scene for many years. It became a mature and trusted **data interchange format** and helped shape new concepts like building interactive web applications. After all, the letter *X* in [<FontIcon icon="fa-brands fa-wikipeida-w"/>AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)), a technique for getting data from the server without reloading the page, stands for none other than XML.

Ironically, it was AJAX that ultimately led to XML’s decline in popularity. The verbose, complex, and redundant XML syntax wasted a lot of bandwidth when data was sent over the network. Parsing XML documents in JavaScript was slow and tedious because of XML’s fixed [**document object model (DOM)**](/realpython.com/python-xml-parser.md#document-object-model-dom), which wouldn’t match the application’s data model. The community finally acknowledged that they’d been using the wrong tool for the job.

That’s when [**JSON**](/realpython.com/python-json/README.md) entered the picture. It was built from the ground up with data serialization in mind. Web browsers could parse it effortlessly because JSON is a subset of JavaScript, which they already supported. Not only was JSON’s minimalistic syntax appealing to developers, but it also made porting to other platforms easier than XML did. To this day, JSON remains the slimmest, fastest, and most versatile textual data interchange format on the Internet.

[<FontIcon icon="iconfont icon-yaml"/>YAML](https://yaml.org/) came into existence the same year as JSON, and by pure coincidence, it was almost a complete superset of JSON on the syntactical and semantic levels. Starting from YAML 1.2, the format officially became a strict **superset of JSON**, meaning that every valid JSON document also happens to be a YAML document.

In practice, however, the two formats look different, as the [<FontIcon icon="iconfont icon-yaml"/>YAML specification](https://yaml.org/spec/1.2.2/) puts more emphasis on human readability by adding a lot more [<FontIcon icon="fa-brands fa-wikipeida-w"/>syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) and features on top of JSON. As a result, YAML is more applicable to configuration files edited by hand rather than as a [<FontIcon icon="fa-brands fa-wikipeida-w"/>transport layer](https://en.wikipedia.org/wiki/Transport_layer).

### Comparison With XML and JSON

If you’re familiar with [**XML**](/realpython.com/python-xml-parser.md) or [**JSON**](/realpython.com/python-json/README.md), then you might be wondering what YAML brings to the table. All three are major data interchange formats, which share some overlapping features. For example, they’re all **text based** and more or less human readable. At the same time, they differ in many respects, which you’ll find out next.

::: note

There are other, popular textual data formats like [**TOML**](/realpython.com/python-toml.md), which the new build system in Python is based on. Currently, only external packaging and dependency management tools like [**Poetry**](/realpython.com/dependency-management-python-poetry.md) can read TOML, but since Python 3.11 there’s a [**TOML parser in the standard library**](/realpython.com/python311-tomllib/).

Common binary data serialization formats you’d find in the wild include Google’s [<FontIcon icon="fa-brands fa-wikipedia-w"/>Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) and Apache’s [<FontIcon icon="fa-brands fa-wikipedia-w"/>Avro](https://en.wikipedia.org/wiki/Apache_Avro).

Now have a look at a sample document expressed in all three data formats but representing the same person. You can click to expand the collapsible sections and reveal data serialized in those formats:

::: tabs

@tab:active <FontIcon icon="iconfont icon-code"/>XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<person firstName="John" lastName="Doe">
  <dateOfBirth>1969-12-31</dateOfBirth>
  <married>true</married>
  <spouse>
    <person firstName="Jane" lastName="Doe">
      <dateOfBirth />
      <!- This is a comment -->
    </person>
  </spouse>
</person>
```

@tab <FontIcon icon="iconfont icon-json"/>JSON

```json
{
  "person": {
    "dateOfBirth": "1969-12-31",
    "firstName": "John",
    "lastName": "Doe",
    "married": true,
    "spouse": {
      "dateOfBirth": null,
      "firstName": "Jane",
      "lastName": "Doe"
    }
  }
}
```

@tab <FontIcon icon="iconfont icon-yaml"/>YAML

```yaml
---
person:
  dateOfBirth: 1969-12-31
  firstName: John
  lastName: Doe
  married: true
  spouse:
    dateOfBirth: null # This is a comment
    firstName: Jane
    lastName: Doe
```

:::

At first glance, XML appears to have the most intimidating syntax, which adds a lot of noise. JSON greatly improves the situation in terms of simplicity, but it still buries information beneath mandatory delimiters. On the other hand, YAML uses Python-style **block indentation** to define the structure, making it look clean and straightforward. The downside is that you can’t collapse whitespace to reduce size when transferring messages over the wire.

::: note

JSON is the only data format that doesn’t support comments. They were removed from the specification on purpose to simplify the parsers and prevent people from abusing them for custom processing instructions.

:::

Here’s a somewhat subjective comparison of XML, JSON, and YAML to give you an idea of how they stack up against each other as today’s data interchange formats:

|  | XML | JSON | YAML |
| ---: | :--- | :--- | :--- |
| **Adoption and support** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Readability** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Read and Write Speed** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| **File Size** | ⭐ | ⭐⭐⭐ | ⭐⭐ |

When you look at [<FontIcon icon="fa-brands fa-google"/>Google Trends](https://trends.google.com/trends/explore?date=all&q=XML,JSON,YAML) to track interest in the three search phrases, then you’ll conclude that JSON is the current winner. However, XML isn’t far behind, with YAML attracting the *least interest*. Also, it looks like XML’s popularity has been on a steady decline ever since Google started collecting data.

::: note

Of these three formats, XML and JSON are the only ones that Python supports out of the box, whereas if you wish to work with YAML, then you must find and install a corresponding third-party library. Python isn’t the only language that has better support for XML and JSON than YAML, though. You’re likely to find this tendency across programming languages.

YAML is arguably the *easiest on the eyes*, as readability has always been one of its core principles, but JSON isn’t bad either. Some might even find JSON less cluttered and noisy due to its minimalistic syntax and resemblance to Python lists and dictionaries. XML is the most verbose, as it requires wrapping every piece of information in a pair of opening and closing tags.

In Python, performance when working with these data formats will vary, and it’ll be highly sensitive to the implementation you choose. A pure Python implementation will always lose to a compiled C library. In addition to this, using different XML processing models—([**DOM**](/realpython.com/python-xml-parser.md#document-object-model-dom), [**SAX**](/realpython.com/python-xml-parser.md#simple-api-for-xml-sax), or [**StAX**](/realpython.com/python-xml-parser.md#streaming-api-for-xml-stax))—will also impact performance.

Implementations aside, YAML’s versatile, liberal, and complex syntax makes it by far the *slowest* to parse and serialize. On the other side of the spectrum, you’ll find JSON, whose grammar [can fit on a business card (<FontIcon icon="fa-brands fa-x-twtiter"/>`jeresig`)](https://x.com/jeresig/status/2875994605). In contrast, YAML’s own [grammar documentation (<FontIcon icon="iconfont icon-github"/>`yaml/yaml-grammar`)](https://github.com/yaml/yaml-grammar) claims that creating a fully compliant parser has proven almost impossible.

::: info Fun Fact

The official [<FontIcon icon="iconfont icon-yaml"/>yaml.org](https://yaml.org/) website is written as a valid YAML document.

:::

When it comes to document size, JSON is a clear winner again. While the extra quotation marks, commas, and curly brackets take up valuable space, you can remove all the whitespace between the individual elements. You can do the same with XML documents, but it won’t overcome the overhead of the opening and closing tags. YAML sits somewhere in the middle by having a comparatively *medium size*.

Historically, XML has had the best support across a wide range of technologies. JSON is an unbeatable all-around interchange format for transferring data on the Internet. So, who uses YAML and why?

### Practical Uses of YAML

As noted earlier, YAML is mostly praised for its readability, which makes it perfect for storing all kinds of configuration data in a human-readable format. It became especially popular among [<FontIcon icon="fas fa-globe"/>DevOps](https://realpython.com/learning-paths/python-devops/) engineers, who’ve built automation tools around it. A few examples of such tools include:

- [**<FontIcon icon="iconfont icon-ansible"/>Ansible**](https://ansible.com/): Uses YAML to describe the desired state of the remote infrastructure, manage the configuration, and orchestrate IT processes
- [**<FontIcon icon="fa-brands fa-docker"/>Docker Compose**](https://docs.docker.com/compose/): Uses YAML to describe the microservices comprising your Dockerized application
- [**<FontIcon icon="iconfont icon-k8s"/>Kubernetes**](https://kubernetes.io/): Uses YAML to define various objects in a computer cluster to orchestrate and manage

Apart from that, some general-purpose tools, libraries, and services give you the option to configure them through YAML, which you may find more convenient than other data formats. For example, platforms like [<FontIcon icon="fas fa-globe"/>CircleCI](https://circleci.com/) and [<FontIcon icon="iconfont icon-github"/>GitHub](https://github.com/features/actions) frequently turn to YAML to define [<FontIcon icon="fa-brands fa-wikipedia-w"/>continuous integration, deployment, and delivery (CI/CD)](https://en.wikipedia.org/wiki/CI/CD) pipelines. The [<FontIcon icon="iconfont icon-swagger"/>OpenAPI Specification](https://swagger.io/specification/) allows for code stub generation based on a YAML description of [**RESTful APIs**](/realpython.com/api-integration-in-python.md).

::: note

The documentation for Python’s [**logging**](/realpython.com/python-logging.md) framework mentions YAML despite the fact that the language doesn’t support YAML natively.

:::

Maybe you’ll decide to adopt YAML in your future project after completing this tutorial!

### YAML Syntax

YAML draws heavy inspiration from other data formats and languages that you might have heard of before. Perhaps the most striking and familiar element of YAML’s syntax is its **block indentation**, which resembles Python code. The leading whitespace on each line defines the scope of a block, eliminating the need for any special characters or tags to denote where it begins or ends:

```yaml
grandparent:
  parent:
    child:
    name: Bobby
  sibling:
    name: Molly
```

This sample document defines a family tree with `grandparent` as the root element, whose immediate child is the `parent` element, which has two children with the `name` attribute on the lowest level in the tree. You can think of each element as an opening statement followed by a colon (`:`) in Python.

::: note

The YAML specification forbids using [<FontIcon icon="fa-brands fa-wikipedia-w"/>tabs](https://en.wikipedia.org/wiki/Tab_key) for indentation and considers their use a syntax error. This coincides with Python’s [**PEP 8**](/realpython.com/python-pep8.md) recommendation about preferring spaces over tabs.

:::

At the same time, YAML lets you leverage an alternative **inline-block** syntax borrowed from JSON. You can rewrite the same document in the following way:

```yaml
grandparent:
  parent:
    child: {name: Bobby}
    sibling: {'name': "Molly"}
```

Notice how you can mix the indented and inline blocks in one document. Also, you’re free to enclose both the attributes and their values in single quotes (`'`) or double quotes (`"`) if you want to. Doing so enables one of two interpolation methods of the [**special character sequences**](/realpython.com/python-data-types.md#escape-sequences-in-strings), which are otherwise escaped with another backslash (``) for you. Below, you’ll find Python equivalents alongside the YAML:

| YAML | Python | Description |
| :---: | :---: | --- |
| `Don''t\n` | `Don''t\\n` | Unquoted strings are parsed literally so that escape sequences like `\n` become `\\n`. |
| `'Don''t\n'` | `Don't\\n` | Single-quoted strings only interpolate the double apostrophe (`''`), but not the traditional escape sequences like `\n`. |
| `"Don''t\n"` | `Don''t\n` | Double-quoted (`"`) strings interpolate escape sequences like `\n`, `\r`, or `\t`, known from the C programming language, but not the double apostrophe (`''`). |

Don’t worry if that looks confusing. You’ll want to specify unquoted string literals in YAML for the most part, anyway. One notable exception would be declaring a string that the parser could misinterpret as the wrong data type. For example, `True` written without any quotation marks might be treated as a [**Python Boolean**](/realpython.com/python-boolean.md).

The three fundamental **data structures** in YAML are essentially the same as in [<FontIcon icon="fas fa-globe"/>Perl](https://perl.org/), which was once a popular scripting language. They’re the following:

1. **Scalars:** Simple values like numbers, strings, or Booleans
2. **Arrays:** Sequences of scalars or other collections
3. **Hashes:** Associative arrays, also known as maps, dictionaries, objects, or records comprised of key-value pairs

You can define a YAML scalar similarly to a corresponding [<FontIcon icon="fa-brands fa-python"/>Python literal](https://docs.python.org/3/reference/lexical_analysis.html#literals). Here are a few examples:

| Data Type | YAML |
| --- | --- |
| Null | `null`, `~` |
| Boolean | `true`, `false` (**Before YAML 1.2:** `yes`, `no`, `on`, `off`) |
| Integer | `10`, `0b10`, `0x10`, `0o10` (**Before YAML 1.2:** `010`) |
| Floating-Point | `3.14`, `12.5e-9`, `.inf`, `.nan` |
| String | `Lorem ipsum` |
| Date and Time | `2022-01-16`, `23:59`, `2022-01-16 23:59:59` |

You can write reserved words in YAML in lowercase (`null`), uppercase (`NULL`), or title case (`Null`) to parse them into the desired data type. Any other case variant of such words will be treated as plain text. The `null` constant or its tilde (`~`) alias lets you explicitly state the lack of a value, but you can also leave the value blank for the same effect.

::: note

This implicit typing in YAML seems convenient, but it’s like playing with fire, and it can cause [<FontIcon icon="fas fa-globe"/>serious problems](https://hitchdev.com/strictyaml/why/implicit-typing-removed/) in edge cases. As a result, the YAML 1.2 specification dropped support for some built-in literals like `yes` and `no`.

:::

Sequences in YAML are just like Python [**lists**](/realpython.com/python-list.md) or JSON arrays. They use the standard square bracket syntax (`[]`) in the inline-block mode or the leading dashes (`-`) at the start of each line when they’re block indented:

```yaml
fruits: [apple, banana, orange]
veggies:
  - tomato
  - cucumber
  - onion
mushrooms:
  - champignon
  - truffle
```

You can keep your list items at the same indentation level as their property name or add more indentation if that improves readability for you.

Finally, YAML has hashes analogous to [**Python dicts**](/realpython.com/python-dicts.md) or JavaScript objects. They’re made of keys, also known as attribute or **property** names, followed by a colon (`:`) and a value. You’ve seen a few examples of YAML hashes in this section already, but here’s a more involved one:

```yaml
person:
  firstName: John
  lastName: Doe
  dateOfBirth: 1969-12-31
  married: true
  spouse:
    firstName: Jane
    lastName: Smith
  children:
    - firstName: Bobby
      dateOfBirth: 1995-01-17
    - firstName: Molly
      dateOfBirth: 2001-05-14
```

You’ve just defined a person, John Doe, who’s married to Jane Smith and has two children, Bobby and Molly. Notice how the list of children contains **anonymous objects**, unlike, for example, the spouse defined under a property named `"spouse"`. When anonymous or unnamed objects appear as list items, you can recognize them by their properties, which are aligned with an opening dash character (`-`).

::: note

Property names in YAML are pretty flexible, as they can contain whitespace characters and span multiple lines. What’s more, you’re not limited to using only strings. Unlike JSON, but similar to Python dictionaries, a YAML hash allows you to use almost any data type for a key!

:::

Naturally, you’ve only scratched the surface here, as YAML has plenty of *much* more advanced features to offer. You’ll learn about some of them now.

### Unique Features

In this section, you’ll check out some of YAML’s most unique features, including:

- Data types
- Tags
- Anchors and aliases
- Merged attributes
- Flow and block styles
- Multiple-document streams

While XML is all about text, and JSON inherits JavaScript’s few data types, YAML’s defining feature is tight integration with the **type systems** of modern programming languages. For example, you can use YAML to serialize and deserialize data types built into Python, such as date and time:

| YAML | Python |
| --- | --- |
| `2022-01-16 23:59:59` | `datetime.datetime(2022, 1, 16, 23, 59, 59)` |
| `2022-01-16` | `datetime.date(2022, 1, 16)` |
| `23:59:59` | `86399` |
| `59:59` | `3599` |

YAML understands various date and time formats, including the [<FontIcon icon="fa-brands fa-wikipedia-w"/>ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard, and can work with optional time zones. Timestamps such as 23:59:59 get deserialized into the number of seconds elapsed since midnight.

::: note

The PyYAML library used in this tutorial is based on the older YAML 1.1 specification, which supports [<FontIcon icon="fa-brands fa-wikipedia-w"/>base-60 numbers](https://en.wikipedia.org/wiki/Sexagesimal) through the colon (`:`) notation. This means that a literal like `59:59` gets interpreted as an integer value of $3,599$ because $59\times{601}+59\times{600}$ adds up to it.

On the surface, this looks like a convenient way of converting timestamps to the number of elapsed seconds. Unfortunately, the rules governing the parsing process of such literals in YAML 1.1 can be confusing and potentially error-prone. When your literal starts with a leading zero (`05:59`), a YAML 1.1 parser will interpret it as a string instead of a Python `datetime` object!

Therefore, you might consider using a different library than PyYAML in your production code for peace of mind.

:::

To resolve potential ambiguities, you can cast values to specific data types by using **YAML tags**, which start with the double exclamation point (`!!`). There are a few [<FontIcon icon="iconfont icon-yaml"/>language-independent tags](https://yaml.org/type/index.html), but different parsers might provide additional extensions only relevant to your programming language. For example, the library that you’ll be using later lets you convert values to native Python types and even serialize your custom classes:

```yaml
text: !!str 2022-01-16

numbers: !!set
  ? 5
  ? 8
  ? 13

image: !!binary
  R0lGODdhCAAIAPAAAAIGAfr4+SwAA
  AAACAAIAAACDIyPeWCsClxDMsZ3CgA7

pair: !!python/tuple
  - black
  - white

center_at: !!python/complex 3.14+2.72j

person: !!python/object:package_name.module_name.ClassName
  age: 42
  first_name: John
  last_name: Doe
```

The use of the `!!str` tag next to a date object makes YAML treat it as a regular string. Question marks (`?`) denote a mapping key in YAML. They’re usually unnecessary but can help you define a compound key from another collection or a key that contains reserved characters. In this case, you want to define blank keys to create a [**set data structure**](/realpython.com/python-sets.md), which is equivalent to a mapping without the keys.

Moreover, you can use the `!!binary` tag to embed [<FontIcon icon="fa-brands fa-wikipedia-w"/>Base64-encoded](https://en.wikipedia.org/wiki/Base64) binary files such as images or other resources, which will become instances of [**`bytes`**](/realpython.com/python-strings.md#bytes-objects) in Python. The tags prefixed with `!!python/` are provided by PyYAML.

The YAML document above would translate into the following Python dictionary:

```py
{
    "text": "2022-01-16",
    "numbers": {8, 13, 5},
    "image": b"GIF87a\x08\x00\x08\x00\xf0\x00…",
    "pair": ("black", "white"),
    "center_at": (3.14+2.72j),
    "person": <package_name.module_name.ClassName object at 0x7f08bf528fd0>
}
```

Notice how, with the help of YAML tags, the parser turned property values into various Python data types, including a string, a set, a bytes object, a tuple, a complex number, and even a custom class instance.

Other powerful features of YAML are **anchors and aliases**, which let you define an element once and then refer to it many times within the same document. Potential use cases include:

- Reusing the shipping address for invoicing
- Rotating meals in a meal plan
- Referencing exercises in a training program

To declare an anchor, which you can think of as a named variable, you’d use the [<FontIcon icon="fa-brands fa-wikipedia-w"/>ampersand (`&`)](https://en.wikipedia.org/wiki/Ampersand) symbol, while to dereference that anchor later on, you’d use the [<FontIcon icon="fa-brands fa-wikipedia-w"/>asterisk (`*`)](https://en.wikipedia.org/wiki/Asterisk) symbol:

```yaml
recursive: &cycle [*cycle]

exercises:
  - muscles: &push-up
    - pectoral
    - triceps
    - biceps
  - muscles: &squat
    - glutes
    - quadriceps
    - hamstrings
  - muscles: &plank
    - abs
    - core
    - shoulders

schedule:
  monday:
    - *push-up
    - *squat
  tuesday:
    - *plank
  wednesday:
    - *push-up
    - *plank
```

Here, you’ve created a workout plan from the exercises that you defined earlier, repeating them across various daily routines. Additionally, the `recursive` property demonstrates an example of a [<FontIcon icon="fa-brands fa-wikipedia-w"/>circular reference](https://en.wikipedia.org/wiki/Circular_reference). This property is a sequence whose only element is the sequence itself. In other words, `recursive[0]` is the same as `recursive`.

::: note

Unlike plain XML and JSON, which can only represent [<FontIcon icon="fa-brands fa-wikipedia-w"/>tree-like hierarchies](https://en.wikipedia.org/wiki/Tree_structure) with a single root element, YAML also makes it possible to describe [<FontIcon icon="fa-brands fa-wikipedia-w"/>directed graph](https://en.wikipedia.org/wiki/Directed_graph) structures with [**recursive**](/realpython.com/python-recursion.md) cycles. Cross-referencing in XML and JSON can be possible, though, with the help of custom extensions or dialects.

:::

You can also **merge** (`<<`) or override attributes defined elsewhere by combining two or more objects:

```yaml
shape: &shape
  color: blue

square: &square
  a: 5

rectangle:
  << : *shape
  << : *square
  b: 3
  color: green
```

The `rectangle` object inherits properties of `shape` and `square` while adding a new attribute, `b`, and changing the value of `color`.

Scalars in YAML support either a **flow style** or a **block style**, which give you different levels of control over the newline handling in multiline strings. Flow scalars can start on the same line as their property name and may span multiple lines:

```yaml
text: Lorem ipsum
  dolor sit amet

  Lorem ipsum
  dolor sit amet
```

In such a case, each line’s leading and trailing whitespace will always be folded into a single space, turning paragraphs into lines. This works a bit like HTML or Markdown, resulting in the following piece of text:

```plaintext
Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet
```

And, in case you were wondering, [<FontIcon icon="fa-brands fa-wikipeida-w"/>*Lorem ipsum*](https://en.wikipedia.org/wiki/Lorem_ipsum) is a common placeholder text used in writing and web design to fill up the available space. It doesn’t carry any meaning, as it’s deliberately nonsensical and written in improper Latin to let you focus on the form rather than the content.

In contrast to flow scalars, block scalars allow for changing how to deal with the [<FontIcon icon="iconfont icon-yaml"/>newlines](https://yaml.org/spec/1.2-old/spec.html#id2795688), [<FontIcon icon="iconfont icon-yaml"/>trailing newlines](https://yaml.org/spec/1.2-old/spec.html#id2794534), or [<FontIcon icon="iconfont icon-yaml"/>indentation](https://yaml.org/spec/1.2-old/spec.html#id2793979). For example, the pipe (`|`) indicator placed right after the property name preserves the newlines literally, which can be handy for embedding [<FontIcon icon="fa-brands fa-wikipedia-w"/>shell scripts](https://en.wikipedia.org/wiki/Shell_script) in your YAML file:

```yaml
script: |
  #!/usr/bin/env python

  def main():
      print("Hello world")

  if __name__ == "__main__":
      main()
```

The YAML document above defines a property named `script`, which holds a short Python script consisting of a few lines of code. Without the pipe indicator, a YAML parser would’ve treated the following lines as nested elements rather than as a whole. Ansible is a [<FontIcon icon="iconfont icon-ansible"/>notable example](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html#examples) that takes advantage of this feature of YAML.

If you’d like to only fold lines with indentation determined by the first line in a paragraph, then use the greater than sign (`>`) indicator:

```yaml
text: >
  Lorem
    ipsum
  dolor
  sit
  amet
 
  Lorem ipsum
  dolor sit amet
```

This will produce the following output:

```plaintext
Lorem
  ipsum
dolor sit amet
Lorem ipsum dolor sit amet
```

Finally, you can have multiple YAML documents stored in a single file separated with the triple dash (`---`). You can optionally use the triple dot (`...`) to mark the end of each document.
