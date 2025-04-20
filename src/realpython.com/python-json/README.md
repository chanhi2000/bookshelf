---
lang: en-US
title: "Working With JSON Data in Python"
description: "Article(s) > Working With JSON Data in Python"
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
      content: "Article(s) > Working With JSON Data in Python"
    - property: og:description
      content: "Working With JSON Data in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-json/
prev: /programming/py/articles/README.md
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
  name="Working With JSON Data in Python"
  desc="In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data."
  url="https://realpython.com/python-json"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Working With JSON in Python – Real Python"
  desc="Learn how to work with Python's built-in json module to serialize the data in your programs into JSON format. Then, you'll deserialize some JSON from an online API and convert it into Python objects."
  url="https://realpython.com/courses/working-json-data-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

:::

Python’s `json` module provides you with the tools you need to effectively handle JSON data. You can convert Python data types to a JSON-formatted string with `json.dumps()` or write them to files using `json.dump()`. Similarly, you can read JSON data from files with `json.load()` and parse JSON strings with `json.loads()`.

JSON, or JavaScript Object Notation, is a widely-used text-based format for data interchange. Its syntax resembles Python dictionaries but with some differences, such as using only double quotes for strings and lowercase for Boolean values. With built-in tools for validating syntax and manipulating JSON files, Python makes it straightforward to work with JSON data.

::: info By the end of this tutorial, you’ll understand that:

- JSON in Python is handled using the **standard-library `json` module**, which allows for **data interchange** between JSON and Python data types.
- JSON is a good data format to use with Python as it’s **human-readable** and straightforward to **serialize and deserialize**, which makes it ideal for use in **APIs and data storage**.
- You write JSON with Python using `json.dump()` to serialize data to a file.
- You can **minify and prettify JSON** using Python’s `json.tool` module.

:::

Since its introduction, [<FontIcon icon="fa-brands fa-wikipedia-w"/>JSON](https://en.wikipedia.org/wiki/JSON) has rapidly emerged as the predominant standard for the exchange of information. Whether you want to transfer data with an [**API**](/realpython.com/api-integration-in-python.md) or store information in a [**document database**](/realpython.com/introduction-to-mongodb-and-python.md), it’s likely you’ll encounter JSON. Fortunately, Python provides robust tools to facilitate this process and help you manage JSON data efficiently.

While JSON is the most common format for data distribution, it’s not the only option for such tasks. Both [**XML**](/realpython.com/python-xml-parser.md) and [**YAML**](/realpython.com/python-yaml/README.md) serve similar purposes. If you’re interested in how the formats differ, then you can check out the tutorial on how to [**serialize your data with Python**](/realpython.com/python-serialize-data.md).

::: info Interactive Quiz

<SiteInfo
  name="Working With JSON Data in Python Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of working with JSON in Python. By working through this quiz, you'll revisit key concepts related to JSON data manipulation and handling in Python."
  url="https://realpython.com/quizzes/python-json/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

In this quiz, you'll test your understanding of working with JSON in Python. By working through this quiz, you'll revisit key concepts related to JSON data manipulation and handling in Python.

:::

```component VPCard
{
  "title": "Introducing JSON",
  "desc": "(1/4) Working With JSON Data in Python",
  "link": "/realpython.com/python-json/introducing-json.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Writing JSON With Python",
  "desc": "(2/4) Working With JSON Data in Python",
  "link": "/realpython.com/python-json/writing-json-with-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Reading JSON With Python",
  "desc": "(3/4) Working With JSON Data in Python",
  "link": "/realpython.com/python-json/reading-json-with-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Interacting With JSON",
  "desc": "(4/4) Working With JSON Data in Python",
  "link": "/realpython.com/python-json/interacting-with-json.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

Whether you want to transfer data with an API or store information in a document database, it’s likely that you’ll encounter JSON. Python provides robust tools to facilitate this process and help you manage JSON data efficiently. You need to be a bit careful when you do data roundtrips between Python and JSON because they don’t share the same set of data types. Still, the JSON format is a great way to save and exchange data.

::: info In this tutorial, you learned how to:

- **Understand** the JSON syntax
- **Convert** Python data to JSON
- **Deserialize** JSON to Python
- **Write and read** JSON files
- **Validate** JSON syntax

:::

Additionally, you learned how to prettify JSON data in the terminal and minify JSON data to reduce its file size. Now, you have enough knowledge to start using JSON in your projects. If you want to revisit the code you wrote in this tutorial or test your knowledge about JSON, then click the link to download the materials or take the quiz below. Have fun!

::: info Interactive Quiz

<SiteInfo
  name="Working With JSON Data in Python Quiz – Real Python"
  desc="In this quiz, you'll test your understanding of working with JSON in Python. By working through this quiz, you'll revisit key concepts related to JSON data manipulation and handling in Python."
  url="https://realpython.com/quizzes/python-json/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

In this quiz, you'll test your understanding of working with JSON in Python. By working through this quiz, you'll revisit key concepts related to JSON data manipulation and handling in Python.

:::

---

## Frequently Asked Questions

Now that you have some experience with working with JSON in Python, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details What is JSON?

JSON stands for JavaScript Object Notation, a text-based format for data interchange that you can work with in Python using the standard-library `json` module.

:::

::: details Is JSON good for Python?

Yes, JSON is widely used for data interchange in Python because it’s lightweight, language-independent, and easy to parse with Python’s built-in `json` module.

:::

::: details How do you write JSON with Python?

You can write JSON with Python by using the `json.dump()` function to serialize Python objects into a JSON file.

:::

::: details How do you connect JSON with Python?

You connect JSON with Python by using the `json` module to serialize Python objects into JSON and deserialize JSON data into Python objects.

:::

::: details How do you convert a Python dictionary to a JSON-formatted string?

You can use the `json.dumps()` function from Python’s `json` module to convert a Python dictionary to a JSON-formatted string.

:::

::: details What's the difference between `json.dump()` and `json.dumps()` in Python?

`json.dump()` writes JSON data to a file, while `json.dumps()` returns a JSON-formatted string.

:::

::: details How can you read JSON data from a file into a Python program?

You can use the `json.load()` function to deserialize JSON data from a file into a Python object.

:::

::: details Why might you use the `indent` parameter in `json.dumps()` or `json.dump()`?

You can use the `indent` parameter to format the JSON output with specified indentation, making it more readable.

:::

::: details How can you validate JSON syntax using the command line?

You can use Python’s `json.tool` module in the command line to validate JSON syntax by running `python -m json.tool <filename>`.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Working With JSON in Python – Real Python"
  desc="Learn how to work with Python's built-in json module to serialize the data in your programs into JSON format. Then, you'll deserialize some JSON from an online API and convert it into Python objects."
  url="https://realpython.com/courses/working-json-data-python/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Working-With-JSON-Data-in-Python_Watermarked.66a8fdcb8859.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Working With JSON Data in Python",
  "desc": "In this tutorial, you'll learn how to read and write JSON-encoded data in Python. You'll begin with practical examples that show how to use Python's built-in ”json” module and then move on to learn how to serialize and deserialize custom data.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-json.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
