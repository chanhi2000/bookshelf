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
  name="YAML: Python's Missing Battery - Real Python"
  desc="In this video course, you'll learn about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML."
  url="https://realpython.com/courses/yaml-python/"
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

```component VPCard
{
  "title": "Taking a Crash Course in YAML",
  "desc": "(1/5) YAML: The Missing Battery in Python",
  "link": "/realpython.com/python-yaml/taking-a-crash-course-in-yaml.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Getting Started With YAML in Python",
  "desc": "(2/5) YAML: The Missing Battery in Python",
  "link": "/realpython.com/python-yaml/getting-started-with-yaml-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Loading YAML Documents in Python",
  "desc": "(3/5) YAML: The Missing Battery in Python",
  "link": "/realpython.com/python-yaml/loading-yaml-documents-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Dumping Python Objects to YAML Documents",
  "desc": "(4/5) YAML: The Missing Battery in Python",
  "link": "/realpython.com/python-yaml/dumping-python-objects-to-yaml-documents.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Parsing YAML Documents at a Low Level",
  "desc": "(5/5) YAML: The Missing Battery in Python",
  "link": "/realpython.com/python-yaml/parsing-yaml-documents-at-a-low-level.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

You now know where to find the missing battery in Python to read and write YAML documents. You’ve created a YAML syntax highlighter and an interactive YAML preview in HTML. Along the way, you learned about the powerful and dangerous features found in this popular data format and how to take advantage of them with Python.

::: info In this tutorial, you learned how to

- **Read** and **write** YAML documents in Python
- **Serialize** Python’s **built-in** and **custom** data types to YAML
- **Safely** read YAML documents from **untrusted sources**
- Take control of **parsing YAML** documents at a lower-level

:::

To get the source code for the examples in this tutorial, follow the link below:

---

## Frequently Asked Questions

Now that you have some experience with YAML in Python, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details How do you use YAML with Python?

You can use YAML with Python by installing a third-party library like PyYAML, which allows you to read and write YAML documents, as well as serialize Python data types to YAML.

:::

::: details Does Python support the YAML format?

Python doesn’t support YAML natively, but you can work with YAML using third-party libraries such as PyYAML, which provides the necessary functionality to parse and serialize YAML data.

:::

::: details What's the best YAML library for Python?

PyYAML is a popular choice for working with YAML in Python due to its comprehensive features and performance, but alternatives like ruamel.yaml and StrictYAML offer additional features like YAML 1.2 support and type safety.

:::

::: details How can I use YAML to serialize custom Python objects?

You can serialize custom Python objects to YAML by using PyYAML’s Python-specific tags or by making your classes inherit from `yaml.YAMLObject` and specifying a custom tag and loader.

:::

::: details What are common pitfalls when working with YAML in Python?

Common pitfalls when working with YAML in Python include the handling of implicit typing, which can lead to the misinterpretation of data types. It’s also important to ensure security when loading YAML from untrusted sources to prevent arbitrary code execution.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="YAML: Python's Missing Battery - Real Python"
  desc="In this video course, you'll learn about working with YAML in Python. By the end of it, you'll know about the available libraries, their strengths and weaknesses, and the advanced and potentially dangerous features of YAML."
  url="https://realpython.com/courses/yaml-python/"
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
