---
lang: en-US
title: "Introducing JSON"
description: "Article(s) > (1/4) Working With JSON Data in Python"
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
      content: "Article(s) > (1/4) Working With JSON Data in Python"
    - property: og:description
      content: "Introducing JSON"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-json/introducing-json.html
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
  url="https://realpython.com/python-json#introducing-json"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

The acronym **JSON** stands for [<VPIcon icon="fas fa-globe"/>JavaScript Object Notation](https://json.org/). As the name suggests, JSON originated from [**JavaScript**](/realpython.com/python-vs-javascript.md). However, JSON has transcended its origins to become language-agnostic and is now recognized as the [<VPIcon icon="fas fa-globe"/>standard](https://tools.ietf.org/html/rfc8259) for **data interchange**.

The popularity of JSON can be attributed to native support by the JavaScript language, resulting in excellent parsing performance in web browsers. On top of that, JSON’s straightforward syntax allows both humans and computers to read and write JSON data effortlessly.

To get a first impression of JSON, have a look at this example code:

```json title="hello_world.json"
{
  "greeting": "Hello, world!"
}
```

You’ll learn more about the JSON syntax later in this tutorial. For now, recognize that the JSON format is **text-based**. In other words, you can create JSON files using the code editor of your choice. Once you set the file extension to `.json`, most code editors display your JSON data with syntax highlighting out of the box:

![Editor screenshot with code highlighting for a JSON file](https://files.realpython.com/media/json-syntax-highlighting.bf172e2b07bd.png)

The screenshot above shows how [**VS Code**](/realpython.com/python-development-visual-studio-code.md) displays JSON data using the [<VPIcon icon="iconfont icon-vscode"/>Bearded color theme](https://marketplace.visualstudio.com/items?itemName=BeardedBear.beardedtheme). You’ll have a closer look at the syntax of the JSON format next!

---

## Examining JSON Syntax

In the previous section, you got a first impression of how JSON data looks. And as a Python developer, the JSON structure probably reminds you of [**common Python data structures**](/realpython.com/python-data-structures.md), like a dictionary that contains a string as a key and a value. If you understand the syntax of a [**dictionary**](/realpython.com/python-dicts.md) in Python, you already know the general syntax of a **JSON object**.

::: note

Later in this tutorial, you’ll learn that you’re free to use lists and other data types at the top level of a JSON document.

:::

The similarity between Python dictionaries and JSON objects is no surprise. One idea behind establishing JSON as the go-to data interchange format was to make working with JSON as convenient as possible, independently of which programming language you use:

::: info (<code>json.org</code>)

> [A collection of key-value pairs and arrays] are universal data structures. Virtually all modern programming languages support them in one form or another. It makes sense that a data format that is interchangeable with programming languages is also based on these structures.

:::

To explore the JSON syntax further, create a new file named <VPIcon icon="iconfont icon-json"/>`hello_frieda.json` and add a more complex JSON structure as the content of the file:

```json title="hello_frieda.json"
{
  "name": "Frieda",
  "isDog": true,
  "hobbies": ["eating", "sleeping", "barking"],
  "age": 8,
  "address": {
    "work": null,
    "home": ["Berlin", "Germany"]
  },
  "friends": [
    {
      "name": "Philipp",
      "hobbies": ["eating", "sleeping", "reading"]
    }, {
      "name": "Mitch",
      "hobbies": ["running", "snacking"]
    }
  ]
}
```

In the code above, you see data about a dog named Frieda, which is formatted as JSON. The top-level value is a JSON object. Just like Python dictionaries, you wrap JSON objects inside curly braces (`{}`).

In line 1, you start the JSON object with an opening curly brace (`{`), and then you close the object at the end of line 20 with a closing curly brace (`}`).

::: note

Although whitespace doesn’t matter in JSON, it’s customary for JSON documents to be formatted with two or four spaces to indicate indentation. If the file size of the JSON document is important, then you may consider minifying the JSON file by removing the whitespace. You’ll learn more about minifying JSON data later in the tutorial.

:::

Inside the JSON object, you can define zero, one, or more key-value pairs. If you add multiple key-value pairs, then you must separate them with a comma (`,`).

A key-value pair in a JSON object is separated by a colon (`:`). On the left side of the colon, you define a key. A key is a string you must wrap in double quotes (`"`). Unlike Python, **JSON strings** don’t support single quotes (`'`).

The values in a JSON document are limited to the following data types:

| JSON Data Type | Description |
| ---: | --- |
| `object` | A collection of key-value pairs inside curly braces (`{}`) |
| `array` | A list of values wrapped in square brackets (`[]`) |
| `string` | Text wrapped in double quotes (`""`) |
| `number` | Integers or floating-point numbers |
| `boolean` | Either `true` or `false` without quotes |
| `null` | Represents a [**null value**](/realpython.com/null-in-python.md), written as `null` |

Just like in dictionaries and lists, you’re able to nest data in JSON objects and arrays. For example, you can include an object as the value of an object. Also, you’re free to use any other allowed value as an item in a JSON array.

As a Python developer, you may need to pay extra attention to the Boolean values. Instead of using `True` or `False` in title case, you must use the lowercase [<VPIcon icon="fa-brands fa-firefox"/>JavaScript-style Booleans](https://developer.mozilla.org/en-US/docs/Glossary/Boolean/JavaScript) `true` or `false`.

Unfortunately, there are some other details in the JSON syntax that you may stumble over as a developer. You’ll have a look at them next.

---

## Exploring JSON Syntax Pitfalls

The [<VPIcon icon="fas fa-globe"/>JSON standard](https://ecma-international.org/publications-and-standards/standards/ecma-404/) doesn’t allow any comments, trailing commas, or single quotes for strings. This can be confusing to developers who are used to Python dictionaries or JavaScript [<VPIcon icon="fa-brands fa-firefox"/>objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

Here’s a smaller version of the JSON file from before with invalid syntax:

```json{2,4-5,10} title="❌ Invalid JSON"
{
  "name": 'Frieda',
  "address": {
    "work": null, // Doesn't pay rent either 
    "home": "Berlin",
  },
  "friends": [
    {
      "name": "Philipp",
      "hobbies": ["eating", "sleeping", "reading",]
    }
  ]
}
```

The highlighted lines contain invalid JSON syntax:

- **Line 2** wraps the string in single quotes.
- **Line 4** uses an inline comment.
- **Line 5** has a trailing comma after the final key-value pair.
- **Line 10** contains a trailing comma in the array.

Using double quotes is something you can get used to as a Python developer. [**Comments**](/realpython.com/python-comments-guide.md) can be helpful in explaining your code, and trailing commas can make moving lines around in your code less fragile. This is why some developers like to use [<VPIcon icon="fas fa-globe"/>Human JSON (Hjson)](https://hjson.github.io/) or [JSON with comments (<VPIcon icon="iconfont icon-github"/>`Microsoft/node-jsonc-parser`)](https://github.com/Microsoft/node-jsonc-parser).

Hjson gives you the freedom to use comments, ditch commas between properties, or create quoteless strings. Apart from the curly braces (`{}`), the [<VPIcon icon="fas fa-globe"/>Hjson syntax](https://hjson.github.io/syntax.html) look like a mix of [**YAML**](/realpython.com/python-yaml/README.md) and JSON.

JSONC is a bit stricter than Hjson. Compared to regular JSON, JSONC allows you to use comments and trailing commas. You may have encountered JSONC when editing the [`settings.json`](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson) file of VS Code. Inside its configuration files, VS Code works in a JSONC mode. For common JSON files, VS Code is more strict and points out JSON syntax errors.

If you want to make sure you write valid JSON, then your coding editor can be of great help. The invalid JSON document above contains marks for each occurrence of incorrect JSON syntax:

When you don’t want to rely on your code editor, you can also use online tools to verify that the JSON syntax you write is correct. Popular online tools for validating JSON are [<VPIcon icon="fas fa-globe"/>JSON Lint](https://jsonlint.com/) and [<VPIcon icon="fas fa-globe"/>JSON Formatter](https://jsonformatter.org/).

[**Later**](/realpython.com/python-json/interacting-with-json.md##validate-json-in-the-terminal) in the tutorial, you’ll learn how to validate JSON documents from the comfort of your terminal. But before that, it’s time to find out how you can work with JSON data in Python.
