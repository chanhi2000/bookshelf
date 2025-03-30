---
lang: en-US
title: "YAML: The Missing Battery in Python"
description: "Article(s) > YAML: The Missing Battery in Python"
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
      content: "Article(s) > YAML: The Missing Battery in Python"
    - property: og:description
      content: "YAML: The Missing Battery in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml/
prev: /programming/py/articles/README.md
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
  name="YAML: The Missing Battery in Python"
  desc="In this tutorial, you'll learn all about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML. You'll also serialize Python objects and create a YAML syntax highlighter."
  url="https://realpython.com/python-yaml"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="YAML: Python's Missing Battery – Real Python"
  desc="In this video course, you'll learn about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML."
  url="https://realpython.com/courses/yaml-python//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>

:::

YAML is a portable and widely used data serialization format. Unlike the more compact JSON or verbose XML formats, YAML emphasizes human readability with block indentation, which should be familiar to most Python programmers.

While Python comes with *batteries included*, it lacks built-in support for YAML. Still, you can read and write YAML documents in Python by installing a third-party library, such as **PyYAML**.

::: info By the end of this tutorial, you’ll understand that:

- YAML stands for **YAML Ain’t Markup Language**, emphasizing its focus on data representation rather than document markup.
- YAML is often used for **configuration** and **serialization** due to its human-readable syntax.
- **Python doesn’t support YAML natively**, unlike the JSON and XML formats. You need to install a **third-party library** to work with YAML in Python programs.
- **PyYAML** is arguably the most popular YAML library for Python due to its simplicity.
- Alternatives to PyYAML include **ruamel.yaml** and **StrictYAML**, which offer more features.

:::

To get the most out of this tutorial, you should be familiar with [**object-oriented programming**](/realpython.com/python3-object-oriented-programming.md) in Python and know how to create a [**class**](/realpython.com/python-classes.md). If you’re ready to jump in, then you can follow the link below to get the source code for the examples that you’ll code in this tutorial:

---

## Taking a Crash Course in YAML

In this section, you’re going to learn the basic facts about YAML, including its uses, syntax, and some of its unique and powerful features. If you’ve worked with YAML before, then you can skip ahead and continue reading from the [next section](#getting-started-with-yaml-in-python), which covers using YAML in Python.

### Historical Context

YAML, which rhymes with *camel*, is a [<FontIcon icon="fa-brands fa-wikipeida-w"/>recursive acronym](https://en.wikipedia.org/wiki/Recursive_acronym) that stands for **YAML Ain’t Markup Language** because it’s *not* a markup language! Interestingly enough, the [original draft](https://yaml.org/spec/history/2001-05-26.html) for the YAML specification defined the language as *Yet Another Markup Language*, but later the current [<FontIcon icon="fa-brands fa-wikipeida-w"/>backronym](https://en.wikipedia.org/wiki/Backronym) was adopted to more accurately describe the language’s purpose.

An actual [<FontIcon icon="fa-brands fa-wikipeida-w"/>markup language](https://en.wikipedia.org/wiki/Markup_language), such as Markdown or HTML, lets you annotate text with formatting or processing instructions intermixed with your content. Markup languages are, therefore, primarily concerned with text documents, whereas YAML is a **[<FontIcon icon="fa-brands fa-wikipeida-w"/>data serialization format](https://en.wikipedia.org/wiki/Comparison_of_data-serialization_formats)** that integrates well with common data types native to many programming languages. There’s no inherent text in YAML, only data to represent.

YAML was originally meant to simplify [<FontIcon icon="fa-brands fa-wikipeida-w"/>Extensible Markup Language (XML)](https://en.wikipedia.org/wiki/XML), but in reality, it has a lot more in common with [<FontIcon icon="fa-brands fa-wikipeida-w"/>JavaScript Object Notation (JSON)](https://en.wikipedia.org/wiki/JSON). In fact, it’s a superset of JSON.

Even though XML was initially designed to be a metalanguage for creating markup languages for documents, people quickly adopted it as the standard data serialization format. The HTML-like syntax of angle brackets made XML look familiar. Suddenly, everyone wanted to use XML as their configuration, persistence, or messaging format.

As the first kid on the block, XML dominated the scene for many years. It became a mature and trusted **data interchange format** and helped shape new concepts like building interactive web applications. After all, the letter *X* in [<FontIcon icon="fa-brands fa-wikipeida-w"/>AJAX](https://en.wikipedia.org/wiki/Ajax_(programming)), a technique for getting data from the server without reloading the page, stands for none other than XML.

Ironically, it was AJAX that ultimately led to XML’s decline in popularity. The verbose, complex, and redundant XML syntax wasted a lot of bandwidth when data was sent over the network. Parsing XML documents in JavaScript was slow and tedious because of XML’s fixed [document object model (DOM)](https://realpython.com/python-xml-parser/#document-object-model-dom), which wouldn’t match the application’s data model. The community finally acknowledged that they’d been using the wrong tool for the job.

That’s when [JSON](/realpython.com/python-json/README.md) entered the picture. It was built from the ground up with data serialization in mind. Web browsers could parse it effortlessly because JSON is a subset of JavaScript, which they already supported. Not only was JSON’s minimalistic syntax appealing to developers, but it also made porting to other platforms easier than XML did. To this day, JSON remains the slimmest, fastest, and most versatile textual data interchange format on the Internet.

[YAML](https://yaml.org/) came into existence the same year as JSON, and by pure coincidence, it was almost a complete superset of JSON on the syntactical and semantic levels. Starting from YAML 1.2, the format officially became a strict **superset of JSON**, meaning that every valid JSON document also happens to be a YAML document.

In practice, however, the two formats look different, as the [YAML specification](https://yaml.org/spec/1.2.2/) puts more emphasis on human readability by adding a lot more [<FontIcon icon="fa-brands fa-wikipeida-w"/>syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) and features on top of JSON. As a result, YAML is more applicable to configuration files edited by hand rather than as a [<FontIcon icon="fa-brands fa-wikipeida-w"/>transport layer](https://en.wikipedia.org/wiki/Transport_layer).

### Comparison With XML and JSON

If you’re familiar with [XML](https://realpython.com/python-xml-parser/) or [**JSON**](/realpython.com/python-json/README.md), then you might be wondering what YAML brings to the table. All three are major data interchange formats, which share some overlapping features. For example, they’re all **text based** and more or less human readable. At the same time, they differ in many respects, which you’ll find out next.

**Note:** There are other, popular textual data formats like [TOML](https://realpython.com/python-toml/), which the new build system in Python is based on. Currently, only external packaging and dependency management tools like [Poetry](https://realpython.com/dependency-management-python-poetry/) can read TOML, but since Python 3.11 there’s a [TOML parser in the standard library](https://realpython.com/python311-tomllib/).

Common binary data serialization formats you’d find in the wild include Google’s [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) and Apache’s [Avro](https://en.wikipedia.org/wiki/Apache_Avro).

Now have a look at a sample document expressed in all three data formats but representing the same person. You can click to expand the collapsible sections and reveal data serialized in those formats:

XMLShow/Hide

XML

`<?xml version="1.0" encoding="UTF-8" ?>
<person firstName="John" lastName="Doe">
 <dateOfBirth>1969-12-31</dateOfBirth>
 <married>true</married>
 <spouse>
 <person firstName="Jane" lastName="Doe">
 <dateOfBirth/> <!- This is a comment -->
 </person>
 </spouse>
</person>
```

JSONShow/Hide

JSON

`{
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

YAMLShow/Hide

YAML

`%YAML 1.2
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

At first glance, XML appears to have the most intimidating syntax, which adds a lot of noise. JSON greatly improves the situation in terms of simplicity, but it still buries information beneath mandatory delimiters. On the other hand, YAML uses Python-style **block indentation** to define the structure, making it look clean and straightforward. The downside is that you can’t collapse whitespace to reduce size when transferring messages over the wire.

**Note:** JSON is the only data format that doesn’t support comments. They were removed from the specification on purpose to simplify the parsers and prevent people from abusing them for custom processing instructions.

Here’s a somewhat subjective comparison of XML, JSON, and YAML to give you an idea of how they stack up against each other as today’s data interchange formats:

|  | XML | JSON | YAML |
| --- | --- | --- | --- |
| Adoption and support | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| Readability | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Read and Write Speed | ⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| File Size | ⭐ | ⭐⭐⭐ | ⭐⭐ |

When you look at [Google Trends](https://trends.google.com/trends/explore?date=all&q=XML,JSON,YAML) to track interest in the three search phrases, then you’ll conclude that JSON is the current winner. However, XML isn’t far behind, with YAML attracting the *least interest*. Also, it looks like XML’s popularity has been on a steady decline ever since Google started collecting data.

**Note:** Of these three formats, XML and JSON are the only ones that Python supports out of the box, whereas if you wish to work with YAML, then you must find and install a corresponding third-party library. Python isn’t the only language that has better support for XML and JSON than YAML, though. You’re likely to find this tendency across programming languages.

YAML is arguably the *easiest on the eyes*, as readability has always been one of its core principles, but JSON isn’t bad either. Some might even find JSON less cluttered and noisy due to its minimalistic syntax and resemblance to Python lists and dictionaries. XML is the most verbose, as it requires wrapping every piece of information in a pair of opening and closing tags.

In Python, performance when working with these data formats will vary, and it’ll be highly sensitive to the implementation you choose. A pure Python implementation will always lose to a compiled C library. In addition to this, using different XML processing models—([DOM](https://realpython.com/python-xml-parser/#document-object-model-dom), [SAX](https://realpython.com/python-xml-parser/#simple-api-for-xml-sax), or [StAX](https://realpython.com/python-xml-parser/#streaming-api-for-xml-stax))—will also impact performance.

Implementations aside, YAML’s versatile, liberal, and complex syntax makes it by far the *slowest* to parse and serialize. On the other side of the spectrum, you’ll find JSON, whose grammar [can fit on a business card](https://twitter.com/jeresig/status/2875994605). In contrast, YAML’s own [grammar documentation](https://github.com/yaml/yaml-grammar) claims that creating a fully compliant parser has proven almost impossible.

**Fun Fact:** The official [yaml.org](https://yaml.org/) website is written as a valid YAML document.

When it comes to document size, JSON is a clear winner again. While the extra quotation marks, commas, and curly brackets take up valuable space, you can remove all the whitespace between the individual elements. You can do the same with XML documents, but it won’t overcome the overhead of the opening and closing tags. YAML sits somewhere in the middle by having a comparatively *medium size*.

Historically, XML has had the best support across a wide range of technologies. JSON is an unbeatable all-around interchange format for transferring data on the Internet. So, who uses YAML and why?

### Practical Uses of YAML

As noted earlier, YAML is mostly praised for its readability, which makes it perfect for storing all kinds of configuration data in a human-readable format. It became especially popular among [DevOps](https://realpython.com/learning-paths/python-devops/) engineers, who’ve built automation tools around it. A few examples of such tools include:

- **[Ansible](https://ansible.com/):** Uses YAML to describe the desired state of the remote infrastructure, manage the configuration, and orchestrate IT processes
- **[Docker Compose](https://docs.docker.com/compose/):** Uses YAML to describe the microservices comprising your Dockerized application
- **[Kubernetes](https://kubernetes.io/):** Uses YAML to define various objects in a computer cluster to orchestrate and manage

Apart from that, some general-purpose tools, libraries, and services give you the option to configure them through YAML, which you may find more convenient than other data formats. For example, platforms like [CircleCI](https://circleci.com/) and [GitHub](https://github.com/features/actions) frequently turn to YAML to define [continuous integration, deployment, and delivery (CI/CD)](https://en.wikipedia.org/wiki/CI/CD) pipelines. The [OpenAPI Specification](https://swagger.io/specification/) allows for code stub generation based on a YAML description of [RESTful APIs](https://realpython.com/api-integration-in-python/).

**Note:** The documentation for Python’s [logging](https://realpython.com/python-logging/) framework mentions YAML despite the fact that the language doesn’t support YAML natively.

Maybe you’ll decide to adopt YAML in your future project after completing this tutorial!

### YAML Syntax

YAML draws heavy inspiration from other data formats and languages that you might have heard of before. Perhaps the most striking and familiar element of YAML’s syntax is its **block indentation**, which resembles Python code. The leading whitespace on each line defines the scope of a block, eliminating the need for any special characters or tags to denote where it begins or ends:

YAML

`grandparent:
 parent:
 child:
 name: Bobby
 sibling:
 name: Molly
```

This sample document defines a family tree with `grandparent` as the root element, whose immediate child is the `parent` element, which has two children with the `name` attribute on the lowest level in the tree. You can think of each element as an opening statement followed by a colon (`:`) in Python.

**Note:** The YAML specification forbids using [tabs](https://en.wikipedia.org/wiki/Tab_key) for indentation and considers their use a syntax error. This coincides with Python’s [PEP 8](https://realpython.com/python-pep8/) recommendation about preferring spaces over tabs.

At the same time, YAML lets you leverage an alternative **inline-block** syntax borrowed from JSON. You can rewrite the same document in the following way:

YAML

`grandparent:
 parent:
 child: {name: Bobby}
 sibling: {'name': "Molly"}
```

Notice how you can mix the indented and inline blocks in one document. Also, you’re free to enclose both the attributes and their values in single quotes (`'`) or double quotes (`"`) if you want to. Doing so enables one of two interpolation methods of the [special character sequences](https://realpython.com/python-data-types/#escape-sequences-in-strings), which are otherwise escaped with another backslash (``) for you. Below, you’ll find Python equivalents alongside the YAML:

| YAML | Python | Description |
| --- | --- | --- |
| `Don''t\n` | `Don''t\\n` | Unquoted strings are parsed literally so that escape sequences like `\n` become `\\n`. |
| `'Don''t\n'` | `Don't\\n` | Single-quoted strings only interpolate the double apostrophe (`''`), but not the traditional escape sequences like `\n`. |
| `"Don''t\n"` | `Don''t\n` | Double-quoted (`"`) strings interpolate escape sequences like `\n`, `\r`, or `\t`, known from the C programming language, but not the double apostrophe (`''`). |

Don’t worry if that looks confusing. You’ll want to specify unquoted string literals in YAML for the most part, anyway. One notable exception would be declaring a string that the parser could misinterpret as the wrong data type. For example, `True` written without any quotation marks might be treated as a [Python Boolean](https://realpython.com/python-boolean/).

The three fundamental **data structures** in YAML are essentially the same as in [Perl](https://perl.org/), which was once a popular scripting language. They’re the following:

1. **Scalars:** Simple values like numbers, strings, or Booleans
2. **Arrays:** Sequences of scalars or other collections
3. **Hashes:** Associative arrays, also known as maps, dictionaries, objects, or records comprised of key-value pairs

You can define a YAML scalar similarly to a corresponding [Python literal](https://docs.python.org/3/reference/lexical_analysis.html#literals). Here are a few examples:

| Data Type | YAML |
| --- | --- |
| Null | `null`, `~` |
| Boolean | `true`, `false` (**Before YAML 1.2:** `yes`, `no`, `on`, `off`) |
| Integer | `10`, `0b10`, `0x10`, `0o10` (**Before YAML 1.2:** `010`) |
| Floating-Point | `3.14`, `12.5e-9`, `.inf`, `.nan` |
| String | `Lorem ipsum` |
| Date and Time | `2022-01-16`, `23:59`, `2022-01-16 23:59:59` |

You can write reserved words in YAML in lowercase (`null`), uppercase (`NULL`), or title case (`Null`) to parse them into the desired data type. Any other case variant of such words will be treated as plain text. The `null` constant or its tilde (`~`) alias lets you explicitly state the lack of a value, but you can also leave the value blank for the same effect.

**Note:** This implicit typing in YAML seems convenient, but it’s like playing with fire, and it can cause [serious problems](https://hitchdev.com/strictyaml/why/implicit-typing-removed/) in edge cases. As a result, the YAML 1.2 specification dropped support for some built-in literals like `yes` and `no`.

Sequences in YAML are just like Python [lists](https://realpython.com/python-list/) or JSON arrays. They use the standard square bracket syntax (`[]`) in the inline-block mode or the leading dashes (`-`) at the start of each line when they’re block indented:

YAML

`fruits: [apple, banana, orange]
veggies:
 - tomato
 - cucumber
 - onion
mushrooms:
- champignon
- truffle
```

You can keep your list items at the same indentation level as their property name or add more indentation if that improves readability for you.

Finally, YAML has hashes analogous to [Python dicts](https://realpython.com/python-dicts/) or JavaScript objects. They’re made of keys, also known as attribute or **property** names, followed by a colon (`:`) and a value. You’ve seen a few examples of YAML hashes in this section already, but here’s a more involved one:

YAML

`person:
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

**Note:** Property names in YAML are pretty flexible, as they can contain whitespace characters and span multiple lines. What’s more, you’re not limited to using only strings. Unlike JSON, but similar to Python dictionaries, a YAML hash allows you to use almost any data type for a key!

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

YAML understands various date and time formats, including the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard, and can work with optional time zones. Timestamps such as 23:59:59 get deserialized into the number of seconds elapsed since midnight.

**Note:** The PyYAML library used in this tutorial is based on the older YAML 1.1 specification, which supports [base-60 numbers](https://en.wikipedia.org/wiki/Sexagesimal) through the colon (`:`) notation. This means that a literal like `59:59` gets interpreted as an integer value of 3,599 because 59 × 601 + 59 × 600 adds up to it.

On the surface, this looks like a convenient way of converting timestamps to the number of elapsed seconds. Unfortunately, the rules governing the parsing process of such literals in YAML 1.1 can be confusing and potentially error-prone. When your literal starts with a leading zero (`05:59`), a YAML 1.1 parser will interpret it as a string instead of a Python `datetime` object!

Therefore, you might consider using a different library than PyYAML in your production code for peace of mind.

To resolve potential ambiguities, you can cast values to specific data types by using **YAML tags**, which start with the double exclamation point (`!!`). There are a few [language-independent tags](https://yaml.org/type/index.html), but different parsers might provide additional extensions only relevant to your programming language. For example, the library that you’ll be using later lets you convert values to native Python types and even serialize your custom classes:

YAML

`text: !!str 2022-01-16

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

The use of the `!!str` tag next to a date object makes YAML treat it as a regular string. Question marks (`?`) denote a mapping key in YAML. They’re usually unnecessary but can help you define a compound key from another collection or a key that contains reserved characters. In this case, you want to define blank keys to create a [set data structure](https://realpython.com/python-sets/), which is equivalent to a mapping without the keys.

Moreover, you can use the `!!binary` tag to embed [Base64-encoded](https://en.wikipedia.org/wiki/Base64) binary files such as images or other resources, which will become instances of [`bytes`](https://realpython.com/python-strings/#bytes-objects) in Python. The tags prefixed with `!!python/` are provided by PyYAML.

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

To declare an anchor, which you can think of as a named variable, you’d use the [ampersand (`&`)](https://en.wikipedia.org/wiki/Ampersand) symbol, while to dereference that anchor later on, you’d use the [asterisk (`*`)](https://en.wikipedia.org/wiki/Asterisk) symbol:

YAML

`recursive: &cycle [*cycle]

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

Here, you’ve created a workout plan from the exercises that you defined earlier, repeating them across various daily routines. Additionally, the `recursive` property demonstrates an example of a [circular reference](https://en.wikipedia.org/wiki/Circular_reference). This property is a sequence whose only element is the sequence itself. In other words, `recursive[0]` is the same as `recursive`.

**Note:** Unlike plain XML and JSON, which can only represent [tree-like hierarchies](https://en.wikipedia.org/wiki/Tree_structure) with a single root element, YAML also makes it possible to describe [directed graph](https://en.wikipedia.org/wiki/Directed_graph) structures with [recursive](https://realpython.com/python-recursion/) cycles. Cross-referencing in XML and JSON can be possible, though, with the help of custom extensions or dialects.

You can also **merge** (`<<`) or override attributes defined elsewhere by combining two or more objects:

YAML

`shape: &shape
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

YAML

`text: Lorem ipsum
 dolor sit amet

 Lorem ipsum
 dolor sit amet
```

In such a case, each line’s leading and trailing whitespace will always be folded into a single space, turning paragraphs into lines. This works a bit like HTML or Markdown, resulting in the following piece of text:

Text

`Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet
```

And, in case you were wondering, *[Lorem ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum)* is a common placeholder text used in writing and web design to fill up the available space. It doesn’t carry any meaning, as it’s deliberately nonsensical and written in improper Latin to let you focus on the form rather than the content.

In contrast to flow scalars, block scalars allow for changing how to deal with the [newlines](https://yaml.org/spec/1.2-old/spec.html#id2795688), [trailing newlines](https://yaml.org/spec/1.2-old/spec.html#id2794534), or [indentation](https://yaml.org/spec/1.2-old/spec.html#id2793979). For example, the pipe (`|`) indicator placed right after the property name preserves the newlines literally, which can be handy for embedding [shell scripts](https://en.wikipedia.org/wiki/Shell_script) in your YAML file:

YAML

`script: |
 #!/usr/bin/env python

 def main():
 print("Hello world")

 if __name__ == "__main__":
 main()
```

The YAML document above defines a property named `script`, which holds a short Python script consisting of a few lines of code. Without the pipe indicator, a YAML parser would’ve treated the following lines as nested elements rather than as a whole. Ansible is a [notable example](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html#examples) that takes advantage of this feature of YAML.

If you’d like to only fold lines with indentation determined by the first line in a paragraph, then use the greater than sign (`>`) indicator:

YAML

`text: >
 Lorem
 ipsum
 dolor
 sit
 amet

 Lorem ipsum
 dolor sit amet
```

This will produce the following output:

Text

`Lorem
  ipsum
dolor sit amet
Lorem ipsum dolor sit amet
```

Finally, you can have multiple YAML documents stored in a single file separated with the triple dash (`---`). You can optionally use the triple dot (`...`) to mark the end of each document.

---

## Getting Started With YAML in Python

As you learned in the introduction, working with YAML in Python requires a few extra steps because the language doesn’t support this data format out of the box. You’re going to need a third-party library to serialize Python objects into YAML and the other way around.

In addition to this, you might find it useful to install these command-line tools with [pip](https://realpython.com/what-is-pip/) into your [virtual environment](https://realpython.com/python-virtual-environments-a-primer/) to help with debugging:

- **[yamllint](https://pypi.org/project/yamllint/):** A linter for YAML, which can check the syntax and more
- **[yq](https://pypi.org/project/yq/):** A command-line YAML processor based on [jq](https://stedolan.github.io/jq/), for filtering data
- **[shyaml](https://pypi.org/project/shyaml/)**: An alternative command-line YAML processor

These are all Python tools, but there’s also a widespread [Go implementation of yq](https://github.com/mikefarah/yq), which has a slightly different command-line interface. If you can’t or don’t want to install those programs, then you can always use one of the tools available online, such as:

- [YAML Parser](https://jsonformatter.org/yaml-parser)
- [YAML Formatter](https://jsonformatter.org/yaml-formatter)
- [YAML Validator](https://jsonformatter.org/yaml-validator)

Note that you’ll need some of those tools in the following subsection only, while you’ll get your feet wet with YAML in pure Python for the rest of this tutorial.

### Serialize YAML Documents as JSON

Even though Python doesn’t provide a dedicated YAML parser or serializer, you can sidestep this problem to some extent with the help of the built-in `json` module. After all, you’ve learned that YAML is a superset of JSON, so you could dump your data to a regular JSON format in Python and expect external YAML parsers to accept it.

First, make a sample Python script to [print out](https://realpython.com/python-print/) JSON on the standard output:

Python `print_json.py`

`import datetime
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

Now, [run your script](https://realpython.com/run-python-scripts/) and feed its output to one of the command-line YAML parsers mentioned before, such as `yq` or `shyaml`, through a Unix pipeline (`|`):

```sh
$ python print_json.py | yq -y .
firstName: John
dateOfBirth: '1969-12-31'
married: false
spouse: null
children:
 - Bobby
 - Molly

$ python print_json.py | shyaml get-value
firstName: John
dateOfBirth: '1969-12-31'
married: false
spouse: null
children:
- Bobby
- Molly
```

Nice! Both parsers formatted your data in a more canonical YAML format without complaining. However, because `yq` is a thin wrapper around JSON’s `jq`, you must request that it do the transcoding with the `-y` option and a trailing dot as a filtering expression. Also, notice a slight difference in the resulting indentation between `yq` and `shyaml`.

**Note:** To use `yq`, you must first install `jq` in your operating system if it’s not already available.

Okay, that felt like cheating, and it works only one way, as you can’t read a YAML file back into Python using the `json` module. Thankfully, there are ways to do that.

### Install the PyYAML Library

Python’s most popular third-party YAML library by far is [PyYAML](https://pypi.org/project/PyYAML/), which is consistently one of the [top packages](https://pypistats.org/top) downloaded from [PyPI](https://pypi.org/). It has an interface that looks somewhat similar to the built-in JSON module, it’s actively maintained, and it has the blessing of the official YAML website, which lists it alongside a few less popular contenders.

To install PyYAML into your active virtual environment, type the following command in your terminal:

```sh
(venv) $ python -m pip install pyyaml
```

The library is self-contained and doesn’t require any further dependencies because it’s written in pure Python. However, most distributions bundle a compiled [C binding](https://realpython.com/python-bindings-overview/) for the [LibYAML](https://github.com/yaml/libyaml) library, which makes PyYAML run much faster. To confirm if your PyYAML installation comes with a C binding, open the interactive Python interpreter and run this code snippet:

```py
>>> import yaml
>>> yaml.__with_libyaml__
True
```

Even though PyYAML is the name of the library you’ve installed, you’ll be importing the `yaml` package in Python code. Also, note that you need to explicitly request that PyYAML take advantage of the noticeably faster shared C library, or else it’ll fall back to its default of pure Python. Read on to find out how to change this default behavior.

Despite its popularity, PyYAML has some drawbacks. For example, if you need to use features introduced in YAML 1.2, such as full JSON compliance or safer literals, then you’re better off using the [ruamel.yaml](https://pypi.org/project/ruamel.yaml/) library, which is derived from an older PyYAML version. As a bonus, it can do **round-trip parsing** to preserve the comments and original formatting when needed.

On the other hand, if **type safety** is your main concern or you’d like to validate YAML documents against a **schema**, then have a look at [StrictYAML](https://pypi.org/project/strictyaml/), which intentionally restricts the YAML specification by disregarding its most risky features. Just keep in mind that it won’t run as quickly as the other two libraries.

For now, you’re going to stick with PyYAML for the rest of this tutorial because it’s the standard choice for most Python projects. Note that the tools listed earlier—yamllint, yq, and shyaml—use PyYAML under the surface!

### Read and Write Your First YAML Document

Suppose you want to read and parse a hypothetical email message that’s been serialized to the YAML format and stored in a [string](https://realpython.com/python-strings/) variable in Python:

```py
>>> email_message = """\
... message:
...   date: 2022-01-16 12:46:17Z
...   from: john.doe@domain.com
...   to:
...     - bobby@domain.com
...     - molly@domain.com
...   cc:
...     - jane.doe@domain.com
...   subject: Friendly reminder
...   content: |
...     Dear XYZ,
...
...     Lorem ipsum dolor sit amet...
...   attachments:
...     image1.gif: !!binary
...         R0lGODdhCAAIAPAAAAIGAfr4+SwAA
...         AAACAAIAAACDIyPeWCsClxDMsZ3CgA7
... """
```

The quickest way of deserializing such a piece of YAML into a Python dictionary would be through the `yaml.safe_load()` function:

```py
>>> import yaml
>>> yaml.safe_load(email_message)
{
 'message': {
 'date': datetime.datetime(2022, 1, 16, 12, 46, 17, tzinfo=(...)),
 'from': 'john.doe@domain.com',
 'to': ['bobby@domain.com', 'molly@domain.com'],
 'cc': ['jane.doe@domain.com'],
 'subject': 'Friendly reminder',
 'content': 'Dear XYZ,\n\nLorem ipsum dolor sit amet...\n',
 'attachments': {
 'image1.gif': b'GIF87a\x08\x00\x08\x00\xf0\x00\x00\x02...'
 }
 }
}
```

Calling `safe_load()` is currently the recommended way of handling content received from **untrusted sources**, which could contain malicious code. YAML has an expressive syntax full of convenient features, which unfortunately open the door to a host of vulnerabilities. You’ll learn more about [exploiting YAML’s weaknesses](#explore-loaders-insecure-features) later.

**Note:** Before version 6.0 of the PyYAML library, the default way of parsing YAML documents had always been the `yaml.load()` function, which defaulted to using an unsafe parser. With the latest release, you can still use this function, but it requires you to explicitly specify a particular loader class as a second parameter.

Introducing this additional parameter was a **breaking change** that resulted in many complaints from people maintaining software dependent on PyYAML. There’s still a [pinned issue](https://github.com/yaml/pyyaml/issues/576) on the library’s GitHub repository about this backward incompatibility.

At the time of writing this tutorial, the official [PyYAML documentation](https://pyyaml.org/wiki/PyYAMLDocumentation) as well as the bundled [docstrings](https://realpython.com/documenting-python-code/#documenting-your-python-code-base-using-docstrings) haven’t been updated to reflect the current code base, and they contain examples that don’t work anymore.

The `safe_load()` function is one of several **shorthand functions** that encapsulate the use of various YAML loader classes under the hood. In this case, that single function call translates to the following more explicit yet equivalent code snippet:

```py
>>> from yaml import load, SafeLoader
>>> load(email_message, SafeLoader)
{
 'message': {
 'date': datetime.datetime(2022, 1, 16, 12, 46, 17, tzinfo=(...)),
 'from': 'john.doe@domain.com',
 'to': ['bobby@domain.com', 'molly@domain.com'],
 'cc': ['jane.doe@domain.com'],
 'subject': 'Friendly reminder',
 'content': 'Dear XYZ,\n\nLorem ipsum dolor sit amet...\n',
 'attachments': {
 'image1.gif': b'GIF87a\x08\x00\x08\x00\xf0\x00\x00\x02...'
 }
 }
}
```

One thing to remember when using the shorthand functions is that they hard-code the pure Python implementation. If you’d like to use the faster **C implementation**, then you must write a little bit of [boilerplate code](https://en.wikipedia.org/wiki/Boilerplate_code) yourself:

```py
>>> try:
...     from yaml import CSafeLoader as SafeLoader
... except ImportError:
...     from yaml import SafeLoader

>>> SafeLoader
<class 'yaml.cyaml.CSafeLoader'>
```

First, you try importing one of the loader classes prefixed with the letter *C* to denote the use of the C library binding. If that fails, then you import a corresponding class implemented in Python. Unfortunately, this makes your code look more verbose and prevents you from using the mentioned shortcut functions.

**Note:** Had your YAML contained multiple documents, then `load()` or its wrappers would raise an [exception](https://realpython.com/python-exceptions/).

You’ve already serialized a Python object to YAML before by abusing the built-in `json` module, but the result wasn’t a canonical form of YAML. Now, you’ll take advantage of the installed third-party PyYAML library to fix this. There’s a corresponding `yaml.safe_dump()` function, which takes a Python object and turns it into a string. You can feed it the output of `yaml.safe_load()` in order to reverse the parsing process:

```py
>>> yaml.safe_dump(yaml.safe_load(email_message))
"message:\n  attachments:\n    image1.gif: !!binary |\n  (...)

>>> print(yaml.safe_dump(yaml.safe_load(email_message)))
message:
 attachments:
 image1.gif: !!binary |
 R0lGODdhCAAIAPAAAAIGAfr4+SwAAAAACAAIAAACDIyPeWCsClxDMsZ3CgA7
 cc:
 - jane.doe@domain.com
 content: 'Dear XYZ,

 Lorem ipsum dolor sit amet...

 '
 date: 2022-01-16 12:46:17+00:00
 from: john.doe@domain.com
 subject: Friendly reminder
 to:
 - bobby@domain.com
 - molly@domain.com
```

The result is a string object with your email message serialized to YAML again. However, it’s not quite the same YAML that you originally started with. As you can see, `safe_dump()` sorted the dictionary keys for you, quoted the multiline strings, and used a slightly different indentation. You can change some of this and apply more tweaks to the formatting through several keyword arguments that you’ll explore in [one of the upcoming sections](#tweak-the-formatting-with-optional-parameters).

---

## Loading YAML Documents in Python

Loading YAML boils down to reading a piece of text and parsing it according to the data format’s grammar. PyYAML can make this confusing due to the plethora of functions and classes to choose from. Plus, the library’s documentation doesn’t reliably clearly explain their differences and valid use cases. To save you from debugging the underlying code, you’ll find the most important facts about loading documents with PyYAML in this section.

### Choose the Loader Class

If you want the best possible parsing performance, then you’ll need to manually import the suitable loader class and pass it to the generic `yaml.load()` function, as shown before. But which one should you choose?

To find out, take a look at this high-level overview of the loaders at your disposal. The brief descriptions should give you a general idea about the available choices:

| Loader Class | Function | Description |
| --- | --- | --- |
| `BaseLoader` | - | Doesn’t resolve or support any tags and constructs only basic Python objects (`str`, `list`, `dict`) |
| `Loader` | - | Kept for backward compatibility but otherwise the same as `UnsafeLoader` |
| `UnsafeLoader` | `unsafe_load()` | Supports all standard, library, and custom tags and may construct an arbitrary Python object |
| `SafeLoader` | `safe_load()` | Supports only standard YAML tags like `!!str` and doesn’t construct class instances |
| `FullLoader` | `full_load()` | Should be able to load almost all YAML safely |

The three loaders that you’re most likely to use have corresponding shorthand functions, which you can call instead of passing a loader class to the generic `yaml.load()` function. Remember, these are all written in Python, so for improved performance, you’ll need to import a suitable loader class prefixed with the letter *C*, such as `CSafeLoader`, and call `yaml.load()` anyway.

For a more detailed breakdown of the features supported by the individual loader classes, check out the table below:

| Loader Class | Anchors, Aliases | YAML Tags | PyYAML Tags | Auxilliary Types | Custom Types | Code Execution |
| --- | --- | --- | --- | --- | --- | --- |
| `UnsafeLoader` (`Loader`) | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ | ✔️ |
| `FullLoader` | ✔️ | ✔️ | ✔️ | ✔️ | error | error |
| `SafeLoader` | ✔️ | ✔️ | error | ✔️ | error | error |
| `BaseLoader` | ✔️ | ignore | ignore | ignore | ignore | ignore |

`UnsafeLoader` supports all available features and allows arbitrary code execution. `FullLoader` is similar except for the code execution and the ability to deserialize custom Python classes, which cause a parsing error. `SafeLoader` additionally errors out on Python-specific tags provided by PyYAML, such as `!!python/tuple`. On the other hand, `BaseLoader` remains agnostic about most features by ignoring them.

### Compare Loaders’ Features

Below, you’ll get a quick demonstration of the features mentioned above. First, import the `yaml` module and check out an **anchors and aliases** example:

```py
>>> import yaml

>>> yaml.safe_load("""
... Shipping Address: &shipping |
...     1111 College Ave
...     Palo Alto
...     CA 94306
...     USA
... Invoice Address: *shipping
... """)
{
 'Shipping Address': '1111 College Ave\nPalo Alto\nCA 94306\nUSA\n',
 'Invoice Address': '1111 College Ave\nPalo Alto\nCA 94306\nUSA\n'
}
```

You define an anchor, `&shipping`, near the shipping address and then reuse the same address for the invoice with the help of an alias, `*shipping`. As a result, you only had to specify the address once. This feature works with all loader types.

The next example shows one of the standard **YAML tags** in action:

```py
>>> yaml.safe_load("""
... number: 3.14
... string: !!str 3.14
... """)
{'number': 3.14, 'string': '3.14'}

>>> from yaml import BaseLoader
>>> yaml.load("""
... number: 3.14
... string: !!str 3.14
... """, BaseLoader)
{'number': '3.14', 'string': '3.14'}
```

Numeric literals such as `3.14` are treated as floats by default, but you can request a type conversion to string with the `!!str` tag. Almost all loaders respect standard YAML tags. The only exception is the `BaseLoader` class, which represents scalars with strings whether you tag them or not.

To leverage **PyYAML tags**, which are provided by the library, use either `FullLoader` or `UnsafeLoader` because they’re the only loaders that can handle Python-specific tags:

```py
>>> yaml.full_load("""
... list: [1, 2]
... tuple: !!python/tuple [1, 2]
... """)
{'list': [1, 2], 'tuple': (1, 2)}
```

The `!!python/tuple` tag in the example above converts an inline list into a Python tuple. Head over to PyYAML documentation for a complete [list of supported tags](https://pyyaml.org/wiki/PyYAMLDocumentation#yaml-tags-and-python-types), but be sure to cross-check with the [source code on GitHub](https://github.com/yaml/pyyaml/blob/8cdff2c80573b8be8e8ad28929264a913a63aa33/lib/yaml/constructor.py#L662), as the documentation might not be up to date.

Most loaders are smart about deserializing scalars into **auxiliary types**, which are more specific than a basic string, list, or dictionary:

```py
>>> yaml.safe_load("""
... married: false
... spouse: null
... date_of_birth: 1980-01-01
... age: 42
... kilograms: 80.7
... """)
{
 'married': False,
 'spouse': None,
 'date_of_birth': datetime.date(1980, 1, 1),
 'age': 42,
 'kilograms': 80.7
}
```

Here, you have a mix of types, including a `bool`, a `None`, a `datetime.date` instance, an `int`, and a `float`. Again, `BaseLoader` is the only loader class that treats all scalars as strings at all times.

Suppose you’d like to deserialize a **custom class** from YAML, make a **function call** in your Python code, or even execute a **shell command** while parsing YAML. In that case, your only option is the `UnsafeLoader`, which accepts a few special library tags. The other loaders either raise an exception or ignore those tags. You’ll learn more about the PyYAML tags now.

### Explore Loaders’ Insecure Features

PyYAML lets you serialize and deserialize any [picklable](https://realpython.com/python-pickle-module/) Python object by tapping into its interface. Bear in mind that this allows for arbitrary code execution, as you’ll soon find out. However, if you don’t care about compromising your application’s security, then this capability can be pretty convenient.

The library provides a couple of YAML tags recognized by `UnsafeLoader` to accomplish object creation:

- `!!python/object`
- `!!python/object/new`
- `!!python/object/apply`

They all must be followed by a [fully qualified name](https://en.wikipedia.org/wiki/Fully_qualified_name) of the class to instantiate, which includes the [package and module](https://realpython.com/python-modules-packages/) names. The first tag expects a mapping of key-value pairs, in either the flow or block style. Here’s an example:

YAML

`# Flow style:
!!python/object:models.Person {first_name: John, last_name: Doe}

# Block style:
!!python/object:models.Person
 first_name: John
 last_name: Doe
```

The other two tags are more complicated, as each one comes in two flavors. However, the two tags are almost identical because `!!python/object/new` delegates processing to `!!python/object/apply`. The only difference is that `!!python/object/new` calls a [special method](https://realpython.com/python-classes/#special-methods-and-protocols), [`.__new__()`](https://realpython.com/python-class-constructor/#object-creation-with-__new__), on the specified class without calling [`.__init__()`](https://realpython.com/python-class-constructor/#object-initialization-with-__init__), while `!!python/object/apply` invokes the class itself, which is what you’ll want in most cases.

One flavor of the syntax allows for setting the object’s initial state through a list of [positional arguments](https://realpython.com/defining-your-own-python-function/#positional-arguments), like so:

YAML

`# Flow style:
!!python/object/apply:models.Person [John, Doe]

# Block style:
!!python/object/apply:models.Person
 - John
 - Doe
```

Both styles achieve a similar effect by calling the `.__init__()` method in the `Person` class with the two values passed as positional arguments. Alternatively, you can use a slightly more verbose syntax that allows you to mix positional and [keyword arguments](https://realpython.com/defining-your-own-python-function/#keyword-arguments), among a few more advanced tricks glossed over for brevity:

YAML

`!!python/object/apply:models.Person
args: [John]
kwds: {last_name: Doe}
```

This would still call `.__init__()` on your class, but one of the arguments would be passed as a keyword argument. In any case, you could define the `Person` class manually or by taking advantage of [data classes](https://realpython.com/python-data-classes/) in Python:

Python `models.py`

`from dataclasses import dataclass

@dataclass
class Person:
   first_name: str
   last_name: str
```

This concise syntax will make Python generate the class initializer as well as a few other methods that you’d have to code yourself.

Note that you can use `!!python/object/apply` against any **callable object**, including regular functions, and specify the arguments to pass. This lets you execute one of the built-in functions, a custom function, or even a module-level function, which PyYAML will happily import for you. That’s a *huge* security hole! Imagine using the `os` or `subprocess` module to run a shell command that retrieves your private SSH key if you’ve defined one:

```py
>>> import yaml
>>> yaml.unsafe_load("""
... !!python/object/apply:subprocess.getoutput
...     - cat ~/.ssh/id_rsa
... """)
'-----BEGIN RSA PRIVATE KEY-----\njC7PbMIIEow...
```

It’s not hard to make an HTTP request with the stolen data through the network when the object gets created. A bad actor could use this information to access sensitive resources using your identity.

Sometimes, these tags bypass the normal object creation path, which is typical of object serialization mechanisms in general. Say you wanted to load a user object from YAML and make it an instance of the following class:

Python `models.py`

`class User:
    def __init__(self, name):
        self.name = name
```

You place the `User` class in a separate source file named `models.py` to keep things organized. User objects have only one attribute—the name. By using just one attribute and implementing the initializer explicitly, you’ll be able to observe the way PyYAML calls the individual methods.

When you decide to use the `!!python/object` tag in YAML, then the library calls `.__new__()` without any arguments and never calls `.__init__()`. Instead, it directly manipulates the `.__dict__` attribute of your newly created object, which can have some undesired effects:

```py
>>> import yaml

>>> user = yaml.unsafe_load("""
... !!python/object:models.User
... no_such_attribute: 42
... """)

>>> user
<models.User object at 0x7fe8adb12050>

>>> user.no_such_attribute
42

>>> user.name
Traceback (most recent call last):
 ...
AttributeError: 'User' object has no attribute 'name'
```

While you’ve undoubtedly created a new `User` instance, it wasn’t initialized properly, because the `.name` attribute was missing. However, it does have an unexpected `.no_such_attribute`, which is nowhere to be found in the class body.

You can fix this by adding a [`__slots__`](https://realpython.com/python-data-classes/#optimizing-data-classes) declaration to your class, which forbids adding or removing attributes dynamically once the object exists in memory:

Python `models.py`

`class User:
 __slots__ = ["name"] 
    def __init__(self, name):
        self.name = name
```

Now, your user objects won’t have the [`.__dict__`](https://docs.python.org/3/library/stdtypes.html#object.__dict__) attribute at all. Because there’s no inherent `.__dict__`, the library falls back to calling [`setattr()`](https://docs.python.org/3/library/functions.html#setattr) for each key-value pair on the blank object. This ensures that only attributes listed in `__slots__` will pass through.

This is all great, but what if the `User` class accepted a password argument? To mitigate data leaks, you most definitely don’t want to serialize passwords in plaintext. And how about [serializing stateful attributes](https://docs.python.org/3/library/pickle.html#pickle-state), such as file descriptors or database connections? Well, if restoring your object’s state requires some code to run, then you can customize the serialization process with the special [`.__setstate__()`](https://docs.python.org/3/library/pickle.html#object.__setstate__) method in your class:

Python `models.py`

`import codecs

class User:
    __slots__ = ["name"]

    def __init__(self, name):
        self.name = name

    def __setstate__(self, state):
        self.name = codecs.decode(state["name"], "rot13")
```

You decode the persisted username using a primitive [ROT-13](https://en.wikipedia.org/wiki/ROT13) cipher, which rotates characters by thirteen places in the alphabet. For serious encryption, though, you’ll have to look beyond the standard library. Note that you could also use a [hashing algorithm](https://realpython.com/python-hash-table/#understand-the-hash-function) from the built-in [`hashlib`](https://docs.python.org/3/library/hashlib.html#module-hashlib) module if you wanted to store a password securely.

Here’s one way of loading your encoded state from YAML:

```py
>>> user = yaml.unsafe_load("""
... !!python/object:models.User
... name: Wbua Qbr
... """)

>>> user.name
'John Doe'
```

As long as you’ve defined the `.__setstate__()` method, it’ll always take precedence and give you control over setting an object’s state. That’s why you’re able to restore the original name, `'John Doe'`, from the encoded text above.

Before moving on, it’s worth noting that PyYAML provides two more insecure tags:

- `!!python/name`
- `!!python/module`

The first one lets you load a reference to a Python object, such as a class, a function, or a variable, in your code. The second tag allows for referencing a given Python module. In the next section, you’ll take a look at different data sources that PyYAML lets you load documents from.

### Load a Document From a String, a File, or a Stream

Once you choose the loader class or use one of the shorthand functions, you’re not limited to parsing only strings. The `safe_load()` and other functions exposed by PyYAML accept a single argument, which is a universal stream of characters or bytes. The most common examples of such streams are strings and Python `bytes` objects:

```py
>>> import yaml

>>> yaml.safe_load("name: Иван")
{'name': 'Иван'}

>>> yaml.safe_load(b"name: \xd0\x98\xd0\xb2\xd0\xb0\xd0\xbd")
{'name': 'Иван'}
```

According to the YAML 1.2 specification, parsers should support [Unicode](https://realpython.com/python-encodings-guide/) encoded with [UTF-8](https://en.wikipedia.org/wiki/UTF-8), [UTF-16](https://en.wikipedia.org/wiki/UTF-16), or [UTF-32](https://en.wikipedia.org/wiki/UTF-32) for compatibility with JSON. However, because the PyYAML library supports only YAML 1.1, your only options are UTF-8 and UTF-16:

```py
>>> yaml.safe_load("name: Иван".encode("utf-8"))
{'name': 'Иван'}

>>> yaml.safe_load("name: Иван".encode("utf-16"))
{'name': 'Иван'}

>>> yaml.safe_load("name: Иван".encode("utf-32"))
Traceback (most recent call last):
 ...
yaml.reader.ReaderError: unacceptable character #x0000:
special characters are not allowed
 in "<byte string>", position 1
```

If you try loading YAML from a text encoded with UTF-32, then you’ll get an error. However, that’s hardly a problem in practice because UTF-32 isn’t a common encoding. In any case, you can always do the appropriate transcoding yourself using Python’s [`str.encode()` and `str.decode()`](https://realpython.com/python-encodings-guide/#encoding-and-decoding-in-python-3) methods before loading YAML. Alternatively, you could try one of the other YAML parsing libraries mentioned earlier.

You can also read YAML content straight from a file. Go ahead and [create a file](https://realpython.com/working-with-files-in-python/) with sample YAML content in it and load it into Python using PyYAML:

```py
>>> with open("sample.yaml", mode="wb") as file:
...     file.write(b"name: \xd0\x98\xd0\xb2\xd0\xb0\xd0\xbd")
...
14

>>> with open("sample.yaml", mode="rt", encoding="utf-8") as file:
...     print(yaml.safe_load(file))
...
{'name': 'Иван'}

>>> with open("sample.yaml", mode="rb") as file:
...     print(yaml.safe_load(file))
...
{'name': 'Иван'}
```

You create a local file named `sample.yaml` in your current working directory and write fourteen bytes representing a sample YAML document. Next, you open that file for reading and use `safe_load()` to get a corresponding dictionary. The file can be open in either text or binary mode. In fact, you may pass any file-like stream of characters or bytes such as the in-memory [io.StringIO](https://docs.python.org/3/library/io.html#io.StringIO) text buffer or the binary [io.BytesIO](https://docs.python.org/3/library/io.html#io.BytesIO) stream:

```py
>>> import io

>>> yaml.safe_load(io.StringIO("name: Иван"))
{'name': 'Иван'}

>>> yaml.safe_load(io.BytesIO(b"name: \xd0\x98\xd0\xb2\xd0\xb0\xd0\xbd"))
{'name': 'Иван'}
```

As you can see, the loading functions in PyYAML are quite versatile. Compare this with the `json` module, which provides different functions depending on the type of your input argument. However, PyYAML bundles yet another set of functions that may help you read more than one document from a stream. You’ll learn about those functions now.

### Load Multiple Documents

All four loading functions in PyYAML have their iterable counterparts, which can read multiple YAML documents from a single stream. They still expect exactly one argument, but instead of immediately parsing it into a Python object, they wrap it with a [generator iterator](https://docs.python.org/3/glossary.html#term-generator-iterator) that you can iterate over:

```py
>>> import yaml

>>> stream = """\
... ---
... 3.14
... ---
... name: John Doe
... age: 53
... ---
... - apple
... - banana
... - orange
... """

>>> for document in yaml.safe_load_all(stream):
...     print(document)
...
3.14
{'name': 'John Doe', 'age': 53}
['apple', 'banana', 'orange']
```

The individual documents must start with a triple dash (`---`) and can optionally end with three dots (`...`).

In this section, you learned about the high-level functions available in PyYAML to load documents with. Unfortunately, they try to read the entire stream eagerly in one go, which isn’t always feasible. Reading huge files in such a way can take too long or even fail due to limited memory. If you’d like to process YAML in a streaming fashion similar to the SAX interface in XML, then you have to use the [low-level API](#parsing-yaml-documents-at-a-low-level) provided by PyYAML.

---

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
>>> import yaml
>>> print(yaml.dump(3.14, Dumper=yaml.Dumper))
3.14
...

>>> print(yaml.dump(3.14, Dumper=yaml.CDumper))
3.14
```

For example, the pure Python dumper appends optional dots at the end of a YAML document, while a similar wrapper class for the LibYAML library doesn’t. However, these are cosmetic differences that have no real impact on serialized or deserialized data.

### Dump to a String, a File, or a Stream

Serializing JSON in Python requires you to choose between calling `json.dump()` or `json.dumps()` depending on where you want the content to be dumped. On the other hand, PyYAML provides a two-in-one dumping function, which behaves differently depending on how you call it:

```py
>>> data = {"name": "John"}

>>> import yaml
>>> yaml.dump(data)
'name: John\n'

>>> import io
>>> stream = io.StringIO()
>>> print(yaml.dump(data, stream))
None

>>> stream.getvalue()
'name: John\n'
```

When called with a single argument, the function returns a string representing the serialized object. However, you can optionally pass a second argument to specify the target stream to write to. It can be a file or any [file-like object](https://docs.python.org/3/glossary.html#term-file-like-object). When you pass this optional argument, the function returns [`None`](https://realpython.com/null-in-python/), and you need to extract data from the stream as necessary.

If you want to dump your YAML into a file, then be sure to open the file in **write mode**. Additionally, you must specify the character encoding through an optional keyword argument to the `yaml.dump()` function when the file is open in binary mode:

```py
>>> with open("/path/to/file.yaml", mode="wt", encoding="utf-8") as file:
...     yaml.dump(data, file)

>>> with open("/path/to/file.yaml", mode="wb") as file:
...     yaml.dump(data, file, encoding="utf-8")
```

When you open a file in text mode, then it’s always a good practice to [explicitly set the character encoding](https://realpython.com/python310-new-features/#default-text-encodings). Otherwise, Python will assume your platform’s default encoding, which might be less portable. Character encoding has no meaning in binary mode, which deals with bytes that are already encoded. Still, you should set the encoding through the `yaml.dump()` function, which accepts many more optional parameters, which you’ll learn about soon.

### Dump Multiple Documents

The two YAML-dumping functions in PyYAML, `dump()` and `safe_dump()`, have no way of knowing whether you mean to serialize multiple separate documents or a single document comprising an element sequence:

```py
>>> import yaml
>>> print(yaml.dump([
...     {"title": "Document #1"},
...     {"title": "Document #2"},
...     {"title": "Document #3"},
... ]))
- title: 'Document #1'
- title: 'Document #2'
- title: 'Document #3'
```

They always assume the latter, dumping a single YAML document with a list of elements. To dump multiple documents, use either `dump_all()` or `safe_dump_all()`:

```py
>>> print(yaml.dump_all([
...     {"title": "Document #1"},
...     {"title": "Document #2"},
...     {"title": "Document #3"},
... ]))
title: 'Document #1'
---
title: 'Document #2'
---
title: 'Document #3'
```

Now you get a string containing more than one YAML document separated with the triple dash (`---`).

Note that `dump_all()` is the only function used under the hood because all the other ones, including `dump()` and `safe_dump()`, delegate processing to it. So, regardless of which function you call, they will all have the same list of formal parameters.

### Tweak the Formatting With Optional Parameters

The dumping functions in PyYAML accept a few positional arguments and a number of optional keyword arguments, which let you control the output’s formatting. The only required parameter is the Python object or a sequence of objects to serialize, passed as the first argument in all dumping functions. You’ll take a closer look at the available parameters in this section.

The three wrappers that delegate to `yaml.dump_all()` have the following [function signatures](https://en.wikipedia.org/wiki/Type_signature#Signature), which reveal their positional arguments:

```py
def dump(data, stream=None, Dumper=Dumper, **kwargs): ...
def safe_dump(data, stream=None, **kwargs): ...
def safe_dump_all(documents, stream=None, **kwargs): ...
```

The first function expects between one and three positional arguments since two of them have [optional values](https://realpython.com/python-optional-arguments/). On the other hand, the second and the third function listed above expect only two positional arguments because they both use a predefined `SafeDumper`. To find the available keyword arguments, you have to look at the `yaml.dump_all()` function’s signature.

You can use the same keyword arguments across all four dumping functions. They’re all optional because they have default values equal to either `None` or `False`, except for the `sort_keys` argument, which has a default value of `True`. In total, there are six Boolean flags that you can turn on and off to change the look of the resulting YAML:

| Boolean Flag | Meaning |
| --- | --- |
| `allow_unicode` | Don’t escape Unicode and don’t double-quote. |
| `canonical` | Output YAML in the canonical form. |
| `default_flow_style` | Prefer flow style over block style. |
| `explicit_end` | End each document with the triple dot (`...`). |
| `explicit_start` | Start each document with the triple dash (`---`). |
| `sort_keys` | Sort the output of dictionaries by key. |

There are also several parameters of other data types that give you more freedom:

| Parameter | Type | Meaning |
| --- | --- | --- |
| `indent` | `int` | Block indent level, which must be greater than 1 and less than 10 |
| `width` | `int` | Line width, which must be bigger than twice the indent |
| `default_style` | `str` | Scalar quotation style, which must be one of the following: `None`, `"'"`, or `'"'` |
| `encoding` | `str` | Character encoding, which produces `bytes` instead of `str` when set |
| `line_break` | `str` | Newline character, which must be one of the following: `'\r'`, `'\n'`, or `'\r\n'` |
| `tags` | `dict` | Additional tag directives comprised of tag handles |
| `version` | `tuple` | Major and minor YAML version, such as `(1, 2)` for version 1.2 |

Most of them are self-explanatory. However, the `tags` argument must be a dictionary that maps custom **tag handles** to valid [URI prefixes](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) recognized by a YAML parser:

```py
{"!model!": "tag:yaml.org,2002:python/object:models."}
```

Specifying such a mapping will add a relevant tag directive into your dumped document. Tag handles always begin and end with an exclamation point. They’re a shorthand notation for full tag names. For example, these are all equivalent ways of using the same tag in a YAML document:

YAML

`%TAG !model! tag:yaml.org,2002:python/object:models.
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

It’s a dynamic web page that uses [JavaScript](https://realpython.com/python-vs-javascript/) to communicate over the network with a minimal HTTP server written in [FastAPI](https://realpython.com/fastapi-python-web-apis/). The server expects a JSON object with all but the `tags` keyword argument and calls `yaml.dump()` against the following test object:

```py
{
    "person": {
        "name_latin": "Ivan",
        "name": "Иван",
        "age": 42,
    }
}
```

The sample object above is a dictionary comprising integer and string fields, which contain Unicode characters. To run the server, you must first install the FastAPI library and an [ASGI](https://en.wikipedia.org/wiki/Asynchronous_Server_Gateway_Interface) web server such as [uvicorn](https://pypi.org/project/uvicorn/) into your virtual environment, where you had installed PyYAML before:

```sh
(venv) $ python -m pip install fastapi uvicorn
(venv) $ uvicorn server:app
```

To run the server, you must provide the module name followed by a colon and the name of the ASGI-compatible callable in that module. The details of implementing such a server and a client are far beyond the scope of this tutorial, but feel free to download the sample materials to study on your own:

**Get Your Code:** [Click here to download the free sample code you’ll use](https://realpython.com/bonus/python-yaml-project-code/) to work with YAML in Python.

Next up, you’ll learn more about dumping custom classes with PyYAML.

### Dump Custom Data Types

As you already know, at this point, you can use one of the Python-specific tags provided by PyYAML to serialize and deserialize objects of your custom data types, such as classes. You also know that those tags are only recognized by the unsafe loaders and dumpers, which explicitly allow potentially dangerous code execution. The library will refuse to serialize a Python-specific type like a [complex number](https://realpython.com/python-complex-numbers/) unless you choose the unsafe dumper class:

```py
>>> import yaml
>>> yaml.safe_dump(complex(3, 2))
Traceback (most recent call last):
 ...
yaml.representer.RepresenterError: ('cannot represent an object', (3+2j))

>>> yaml.dump(complex(3, 2))
"!!python/complex '3.0+2.0j'\n"
```

In the first case, the safe dumper doesn’t know how to represent your complex number in YAML. On the other hand, calling `yaml.dump()` implicitly uses the unsafe `Dump` class behind the scenes, which takes advantage of the `!!python/complex` tag. It’s a similar story when you try to dump a custom class:

```py
>>> class Person:
...     def __init__(self, first_name, last_name):
...         self.first_name = first_name
...         self.last_name = last_name
...
>>> yaml.safe_dump(Person("John", "Doe"))
Traceback (most recent call last):
 ...
yaml.representer.RepresenterError: ('cannot represent an object',
 <__main__.Person object at 0x7f55a671e8f0>)

>>> yaml.dump(Person("John", "Doe"))
!!python/object:__main__.Person
first_name: John
last_name: Doe
```

Your only option is the unsafe `yaml.dump()`. However, it’s possible to mark your classes as safe to parse so that even the safe loader will be able to handle them later. To do that, you must make a few changes to your class:

```py
>>> class Person(yaml.YAMLObject): ...     yaml_tag = "!Person" ...     yaml_loader = yaml.SafeLoader ...     def __init__(self, first_name, last_name):
...         self.first_name = first_name
...         self.last_name = last_name
```

First, let the class inherit from `yaml.YAMLObject`. Then specify two class attributes. One attribute will represent a custom YAML tag tied to your class, while the second one will be the loader class to use. Now, when you dump a `Person` object to YAML, you’ll be able to load it back with `yaml.safe_load()`:

```py
>>> print(jdoe := yaml.dump(Person("John", "Doe")))
!Person
first_name: John
last_name: Doe

>>> yaml.safe_load(jdoe)
<__main__.Person object at 0x7f6fb7ba9ab0>
```

The [Walrus operator (`:=`)](https://realpython.com/python-walrus-operator/) lets you define a variable and use it as an argument to the `print()` function in one step. Marking classes as safe is a nice compromise, allowing you to make exceptions to some of your classes by shrugging off security and letting them in. Naturally, you must be absolutely sure that there’s nothing suspicious about them before you try loading the associated YAML.

---

## Parsing YAML Documents at a Low Level

The classes and a few wrapper functions that you’ve used so far constitute a high-level PyYAML interface, which hides the implementation details of working with YAML documents. This covers most of the use cases and allows you to focus on the data rather than its presentation. However, sometimes you might want more control over the parsing and serialization processes.

In those rare cases, the library exposes its inner workings to you through several low-level functions. There are four ways to read a YAML stream:

| Reading Function | Return Value | Lazy? |
| --- | --- | --- |
| `yaml.scan()` | Tokens | ✔️ |
| `yaml.parse()` | Events | ✔️ |
| `yaml.compose()` | Node |  |
| `yaml.compose_all()` | Nodes | ✔️ |

All of these functions accept a stream and an optional loader class, which defaults to `yaml.Loader`. In addition to this, most of them return a generator object, letting you process YAML in a **streaming fashion**, which wasn’t possible up to this point. You’ll learn about the differences between tokens, events, and nodes a bit later.

There are also a few counterpart functions for writing YAML to a stream:

| Writing Function | Input | Example |
| --- | --- | --- |
| `yaml.emit()` | Events | `yaml.emit(yaml.parse(data))` |
| `yaml.serialize()` | Node | `yaml.serialize(yaml.compose(data))` |
| `yaml.serialize_all()` | Nodes | `yaml.serialize_all(yaml.compose_all(data))` |

Note that whatever function you choose, you’ll probably have more work to do than before. For example, handling YAML tags or interpreting string values as the correct native data type will be in your court now. Some of these steps may be unnecessary, though, depending on your use case.

In this section, you’ll implement three hands-on examples of these low-level functions in PyYAML. Remember that you can download their source code by following the link below:

**Get Your Code:** [Click here to download the free sample code you’ll use](https://realpython.com/bonus/python-yaml-project-code/) to work with YAML in Python.

### Tokenize a YAML Document

You’ll get the most granular control by scanning a YAML document to obtain a stream of [tokens](https://en.wikipedia.org/wiki/Lexical_analysis#Token). Each token has a unique meaning and tells you where it starts and where it ends, including the exact line and column number, as well as the offset from the beginning of the document:

```py
>>> import yaml
>>> for token in yaml.scan("Lorem ipsum", yaml.SafeLoader):
...     print(token)
...     print(token.start_mark)
...     print(token.end_mark)
...
StreamStartToken(encoding=None)
 in "<unicode string>", line 1, column 1:
 Lorem ipsum
 ^
 in "<unicode string>", line 1, column 1:
 Lorem ipsum
 ^
ScalarToken(plain=True, style=None, value='Lorem ipsum')
 in "<unicode string>", line 1, column 1:
 Lorem ipsum
 ^
 in "<unicode string>", line 1, column 12:
 Lorem ipsum
 ^
StreamEndToken()
 in "<unicode string>", line 1, column 12:
 Lorem ipsum
 ^
 in "<unicode string>", line 1, column 12:
 Lorem ipsum
 ^
```

The token’s `.start_mark` and `.end_mark` attributes contain all the relevant information. That’s perfect if you want to implement a YAML syntax highlighter plugin for your favorite [code editor](https://realpython.com/python-ides-code-editors-guide/), for example. In fact, why don’t you go ahead and build a bare-bones command-line tool for printing YAML content in color?

First, you need to narrow down the token types, as you’ll only be interested in coloring scalar values, mapping keys, and YAML tags. Create a new file named `colorize.py` and place the following function in it:

Python `colorize.py`

 `1import yaml
 2
 3def tokenize(text, loader=yaml.SafeLoader):
 4    last_token = yaml.ValueToken(None, None)
 5    for token in yaml.scan(text, loader):
 6        start = token.start_mark.index
 7        end = token.end_mark.index
 8        if isinstance(token, yaml.TagToken):
 9            yield start, end, token
10        elif isinstance(token, yaml.ScalarToken):
11            yield start, end, last_token
12        elif isinstance(token, (yaml.KeyToken, yaml.ValueToken)):
13            last_token = token
```

It’s a thin wrapper around PyYAML’s `yaml.scan()` function, which generates tuples comprising the start index, the end index, and a token instance. Here’s a more detailed breakdown:

- **Line 4** defines a variable to hold the last token instance. Only the scalar and tag tokens contain a value, so you must remember their context somewhere to choose the right color later. The initial value accounts for when the document contains only a scalar without any context.
- **Line 5** loops over the scanned tokens.
- **Lines 6 and 7** extract the token’s position within the text from the index markers available on all tokens. The token’s position is delimited with `start` and `end`.
- **Lines 8 to 11** check the current token type and yield the indices and a token instance. If the token is a tag, then it gets yielded. If the token is a scalar, then `last_token` is yielded because scalars can appear in different contexts, and you need to know what the current context is to select the appropriate color.
- **Lines 12 and 13** update the context if the current token is either a mapping key or a value. Other token types get ignored, as they don’t have a meaningful visual representation.

When you import your function into an interactive Python interpreter session, then you should be able to start iterating over the subset of tokens with their relevant indices:

```py
>>> from colorize import tokenize
>>> for token in tokenize("key: !!str value"):
...     print(token)
...
(0, 3, KeyToken())
(5, 10, TagToken(value=('!!', 'str')))
(11, 16, ValueToken())
```

Neat! You can take advantage of these tuples to annotate tokens in the original text using a third-party library or [ANSI escape sequences](https://realpython.com/python-print/#adding-colors-with-ansi-escape-sequences) as long as your terminal supports them. Here are a few sample colors with their escape sequences:

| Color | Font Weight | Escape Sequence |
| --- | --- | --- |
| Blue | Bold | `ESC[34;1m` |
| Cyan | Regular | `ESC[36m` |
| Red | Regular | `ESC[31m` |

For example, keys could become blue, values might be cyan, and YAML tags could turn red. Remember that you can’t modify a sequence of elements while iterating over them, because that would shift their indices. What you can do, however, is start the iteration from the other end. That way, inserting the escape sequences won’t affect the remaining part of the text.

Return to your code editor now and add another function to the Python source file:

Python `colorize.py`

`import yaml

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

This new function iterates over a tokenized text in [reverse](https://realpython.com/python-reverse-list/) and inserts escape code sequences where indicated by `start` and `end`. Note that it’s not the most efficient way of doing this, because you essentially end up making lots of text copies due to slicing and concatenating.

The final piece of the puzzle is taking YAML from the [standard input](https://en.wikipedia.org/wiki/Standard_streams#Standard_input_(stdin)) and presenting it onto the standard output stream:

Python `colorize.py`

`import sys import yaml

# ...

if __name__ == "__main__":
 print(colorize("".join(sys.stdin.readlines())))
```

You import the `sys` module from Python’s standard library and pass the `sys.stdin` reference to the `colorize()` function that you just created. Now, you may run your script in the terminal and enjoy color-coded YAML tokens:

Note that the `cat` command isn’t available on Windows. If that’s your operating system, then use its [`type`](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/type) counterpart, and make sure to run the command through the [Terminal](https://en.wikipedia.org/wiki/Terminal_(Windows)) application instead of the [Command Prompt (`cmd.exe`)](https://en.wikipedia.org/wiki/Cmd.exe) or [Windows PowerShell](https://en.wikipedia.org/wiki/PowerShell) to have the ANSI escape code support enabled by default.

Expand the collapsible section below for the complete source code of your script:

Complete Source CodeShow/Hide

Python `colorize.py`

`import sys
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
>>> import yaml
>>> for event in yaml.parse("[42, {pi: 3.14, e: 2.72}]", yaml.SafeLoader):
...     print(event)
...
StreamStartEvent()
DocumentStartEvent()
SequenceStartEvent(anchor=None, tag=None, implicit=True)
ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='42')
MappingStartEvent(anchor=None, tag=None, implicit=True)
ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='pi')
ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='3.14')
ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='e')
ScalarEvent(anchor=None, tag=None, implicit=(True, False), value='2.72')
MappingEndEvent()
SequenceEndEvent()
DocumentEndEvent()
StreamEndEvent()
```

As you can see, there are various types of events that correspond to different elements in a YAML document. Some of those events expose additional attributes, which you can inspect to learn more about the element at hand.

You can imagine how these events could naturally translate to opening and closing tags in a hierarchical markup language like HTML. For example, you might represent the structure above with the following markup snippet:

HTML

`<ul>
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

A single list item gets wrapped between the `<li>` and `</li>` tags, while a key-value mapping takes advantage of the [description list (`<dl>`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl), which contains alternating [terms (`<dt>`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt) and [definitions (`<dd>`)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd). This is the tricky part because it requires counting the subsequent YAML events on a given nesting level to determine whether an event should become a term or a definition in HTML.

Ultimately, you want to design an `HTMLBuilder` class to help you with parsing multiple YAML documents from a stream in a lazy manner. Assuming you’ve already defined such a class, you can create the following helper function in a file named `yaml2html.py`:

Python `yaml2html.py`

`import yaml

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
>>> from yaml2html import yaml2html
>>> for document in yaml2html("""
... ---
... title: "Document #1"
... ---
... title: "Document #2"
... ---
... title: "Document #3"
... """):
...     print(document)
...
<dl><dt>title</dt><dd>Document #1</dd></dl>
<dl><dt>title</dt><dd>Document #2</dd></dl>
<dl><dt>title</dt><dd>Document #3</dd></dl>
```

The example above demonstrates a stream consisting of three YAML documents, which the helper function turns into separate HTML fragments. Now that you understand the expected behavior, it’s time to implement the `HTMLBuilder` class.

The initializer method in your builder class will define two private fields to keep track of the current context and the HTML content built so far:

Python `yaml2html.py`

`import yaml

class HTMLBuilder:
    def __init__(self):
        self._context = []
        self._html = []

    @property
    def html(self):
        return "".join(self._html)

# ...
```

The context is a [stack](https://realpython.com/how-to-implement-python-stack/) implemented as a Python list, which stores the number of key-value pairs on the given level processed so far. The stack can also contain list markers that indicate a state between `SequenceStartEvent` and `SequenceEndEvent`. The other field is a list of HTML tags and their content, joined by a public class property.

There’s a handful of YAML events that you’ll want to process:

Python `yaml2html.py`

 `1import yaml
 2
 3from yaml import (
 4    ScalarEvent,
 5    SequenceStartEvent,
 6    SequenceEndEvent,
 7    MappingStartEvent,
 8    MappingEndEvent,
 9)
10
11OPEN_TAG_EVENTS = (ScalarEvent, SequenceStartEvent, MappingStartEvent)
12CLOSE_TAG_EVENTS = (ScalarEvent, SequenceEndEvent, MappingEndEvent)
13
14class HTMLBuilder:
15    # ...
16
17    def process(self, event):
18
19        if isinstance(event, OPEN_TAG_EVENTS):
20            self._handle_tag()
21
22        if isinstance(event, ScalarEvent):
23            self._html.append(event.value)
24        elif isinstance(event, SequenceStartEvent):
25            self._html.append("<ul>")
26            self._context.append(list)
27        elif isinstance(event, SequenceEndEvent):
28            self._html.append("</ul>")
29            self._context.pop()
30        elif isinstance(event, MappingStartEvent):
31            self._html.append("<dl>")
32            self._context.append(0)
33        elif isinstance(event, MappingEndEvent):
34            self._html.append("</dl>")
35            self._context.pop()
36
37        if isinstance(event, CLOSE_TAG_EVENTS):
38            self._handle_tag(close=True)
39# ...
```

You start processing an event by checking if there are any open tags on the stack pending some action. You delegate this check to another helper method, `._handle_tag()`, which you’ll add later. Then, you append the HTML tag corresponding to the current event and again update the context.

Here’s a quick line-by-line rundown of the snippet above:

- **Lines 3 to 9** import the needed event types from PyYAML.
- **Lines 11 and 12** specify the event types corresponding to HTML opening and closing tags.
- **Lines 22 to 35** append the corresponding HTML tag and update the stack as necessary.
- **Lines 19, 20, 37, and 38** open or close pending tags on the stack and optionally update the number of key-value pairs processed.

The missing part is the helper method responsible for opening and closing matching tags when necessary:

Python `yaml2html.py`

`import yaml

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

If there’s something on the stack already, then you check the last item pushed onto it. If it was a list, then you open or close a list item. Otherwise, depending on the [parity of the number](https://en.wikipedia.org/wiki/Parity_(mathematics)) of key-value mappings, it’s time to open or close a term or definition from a description list.

You can optionally turn your Python module into an executable script by adding the [`if __name__` idiom](https://docs.python.org/3/library/__main__.html#idiomatic-usage) at the bottom:

Python `yaml2html.py`

`import sys

# ...

if __name__ == "__main__":
    print("".join(yaml2html("".join(sys.stdin.readlines()))))
```

It’ll let you preview the visual representation of YAML in your terminal when you pipe the HTML output to a [text-based web browser](https://en.wikipedia.org/wiki/Text-based_web_browser) like [Lynx](https://en.wikipedia.org/wiki/Lynx_(web_browser)) or the [html2text](https://github.com/grobian/html2text) converter:

```sh
$ echo '[42, {pi: 3.14, e: 2.72}]' | python yaml2html.py | html2text
 * 42
 *   pi
 3.14
 e
 2.72
```

The `echo` command should work on all major operating systems. It prints a piece of text in the terminal, which you can hook up to another command [pipeline](https://en.wikipedia.org/wiki/Pipeline_(Unix)) using the vertical bar character (`|`). In this case, you process a short YAML document with your `yaml2html.py` script and then convert the resulting HTML to a simplified textual form that you can preview in the terminal without starting a full-fledged web browser.

Click the collapsible section below to reveal the complete source code:

Complete Source CodeShow/Hide

Python `yaml2html.py`

`import sys
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
>>> import yaml
>>> root = yaml.compose("[42, {pi: 3.14, e: 2.72}]", yaml.SafeLoader)
>>> root
SequenceNode(
 tag='tag:yaml.org,2002:seq',
 value=[
 ScalarNode(tag='tag:yaml.org,2002:int', value='42'),
 MappingNode(
 tag='tag:yaml.org,2002:map',
 value=[
 (
 ScalarNode(tag='tag:yaml.org,2002:str', value='pi'),
 ScalarNode(tag='tag:yaml.org,2002:float', value='3.14')
 ),
 (
 ScalarNode(tag='tag:yaml.org,2002:str', value='e'),
 ScalarNode(tag='tag:yaml.org,2002:float', value='2.72')
 )
 ]
 )
 ]
)
```

The root is traversable through the square brackets syntax. You can reach for any descendant element in the tree using node’s `.value` attribute and subscripts:

```py
>>> key, value = root.value[1].value[0]

>>> key
ScalarNode(tag='tag:yaml.org,2002:str', value='pi')

>>> value
ScalarNode(tag='tag:yaml.org,2002:float', value='3.14')
```

Because there are only three kinds of nodes (`ScalarNode`, `SequenceNode`, and `MappingNode`), you might automate their traversal with a recursive function:

Python `tree.py`

`import yaml

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
>>> from tree import visit
>>> visit(root)
['42', {'pi': '3.14', 'e': '2.72'}]
```

You get a Python list as a result, but the individual scalar values contained in it are all strings. PyYAML detects the data type associated with a scalar value and stores it in the node’s `.tag` attribute, but you have to do the typecasting yourself. The types are encoded using **YAML global tags**, such as `"tag:yaml.org,2002:float"`, so you may extract the last bit after the second colon (`:`).

Modify your function by wrapping the return value of a scalar with a call to a new `cast()` function:

Python `tree.py`

`import base64 import datetime import yaml

def visit(node):
    if isinstance(node, yaml.ScalarNode):
 return cast(node.value, node.tag)    elif isinstance(node, yaml.SequenceNode):
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

You can leverage the new `match` and `case` keywords introduced in Python 3.10 with the [structural pattern matching](https://realpython.com/python310-new-features/#structural-pattern-matching) syntax, or you can rewrite this example using a plain old `if` statement. The bottom line is that you should now be getting values of native Python types when you [reload the module](https://docs.python.org/3/library/importlib.html#importlib.reload) in your interactive interpreter session:

```py
>>> import importlib, tree
>>> importlib.reload(tree)
<module 'tree' from '/home/realpython/tree.py'>

>>> visit(root)
[42, {'pi': 3.14, 'e': 2.72}]

>>> visit(yaml.compose("when: 2022-01-16 23:59:59"))
{'when': datetime.datetime(2022, 1, 16, 23, 59, 59)}
```

You’re all set to generate an HTML string instead of a Python object. Replace the return values in `visit()` with calls to even more helper functions:

Python `tree.py`

`import base64
import datetime
import yaml

def visit(node):
    if isinstance(node, yaml.ScalarNode):
        return cast(node.value, node.tag)
    elif isinstance(node, yaml.SequenceNode):
 return html_list(node)    elif isinstance(node, yaml.MappingNode):
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

Both helper functions take a node instance and return a piece of HTML string. The `html_list()` function expects a `SequenceNode` iterated over with a [generator expression](https://realpython.com/introduction-to-python-generators/#building-generators-with-generator-expressions), while `html_map()` iterates over keys and values of a `MappingNode`. This is where knowing the entire tree structure in advance helps. If the mapping value is a `ScalarNode`, then you replace it with a `<span>` element. Other node types get wrapped in a collapsible [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) tag.

Because you’ll produce HTML output, you may streamline the typecasting function by returning only plain strings. At the same time, you can return an HTML `<img>` element for the Base64-encoded data and display that element instead of showing raw bytes. Other than that, regular scalars could be wrapped in either a `<span>` or an appropriately styled `<div>` element depending on if they contain single or multiline content:

Python `tree.py`

`import yaml

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

Python `tree.py`

`import sys import yaml

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

This HTML uses an embedded [Google Font](https://fonts.google.com/) for a more pleasant look. The inline [CSS styling](https://en.wikipedia.org/wiki/CSS) removes bullet points from regular unordered lists because you use bullet points for key-value mappings. However, lists explicitly marked as sequences use a dash in front of every item. Mapping keys are displayed in bold font, and multiline strings preserve the whitespace.

When you run the script against some test data, then it’ll output a piece of HTML code that you can redirect to a local file, which you can open with your default web browser:

- [Windows](#windows-1)
- [Linux](#linux-1)
- [macOS](#macos-1)

Windows Command Prompt

`C:> type data.yaml | python tree.py > index.html
C:> start index.html
```

```sh
$ cat data.yaml | python tree.py > index.html
$ xdg-open index.html
```

```sh
$ cat data.yaml | python tree.py > index.html
$ open index.html
```

The resulting page will let you expand and collapse the individual key-value pairs interactively when previewed in a web browser:

Interactive HTML Tree of YAML Nodes

Notice how the web browser renders the Base64-encoded image depicting a smiley face. You’ll find the final code in the collapsible section below:

Complete Source CodeShow/Hide

Python `tree.py`

`import sys
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

---

## Conclusion

You now know where to find the missing battery in Python to read and write YAML documents. You’ve created a YAML syntax highlighter and an interactive YAML preview in HTML. Along the way, you learned about the powerful and dangerous features found in this popular data format and how to take advantage of them with Python.

**In this tutorial, you learned how to:**

- **Read** and **write** YAML documents in Python
- **Serialize** Python’s **built-in** and **custom** data types to YAML
- **Safely** read YAML documents from **untrusted sources**
- Take control of **parsing YAML** documents at a lower-level

To get the source code for the examples in this tutorial, follow the link below:

---

## Frequently Asked Questions

Now that you have some experience with YAML in Python, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial. Click the *Show/Hide* toggle beside each question to reveal the answer.

**How do you use YAML with Python?**Show/Hide

You can use YAML with Python by installing a third-party library like PyYAML, which allows you to read and write YAML documents, as well as serialize Python data types to YAML.

**Does Python support the YAML format?**Show/Hide

Python doesn’t support YAML natively, but you can work with YAML using third-party libraries such as PyYAML, which provides the necessary functionality to parse and serialize YAML data.

**What's the best YAML library for Python?**Show/Hide

PyYAML is a popular choice for working with YAML in Python due to its comprehensive features and performance, but alternatives like ruamel.yaml and StrictYAML offer additional features like YAML 1.2 support and type safety.

**How can I use YAML to serialize custom Python objects?**Show/Hide

You can serialize custom Python objects to YAML by using PyYAML’s Python-specific tags or by making your classes inherit from `yaml.YAMLObject` and specifying a custom tag and loader.

**What are common pitfalls when working with YAML in Python?**Show/Hide

Common pitfalls when working with YAML in Python include the handling of implicit typing, which can lead to the misinterpretation of data types. It’s also important to ensure security when loading YAML from untrusted sources to prevent arbitrary code execution.

**Get Your Code:** [Click here to download the free sample code you’ll use](https://realpython.com/bonus/python-yaml-project-code/) to work with YAML in Python.

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="YAML: Python's Missing Battery – Real Python"
  desc="In this video course, you'll learn about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML."
  url="https://realpython.com/courses/yaml-python//"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/YAML-in-Python_Watermarked.9dec9dfe8fd1.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "YAML: The Missing Battery in Python",
  "desc": "In this tutorial, you'll learn all about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML. You'll also serialize Python objects and create a YAML syntax highlighter.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-yaml.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
