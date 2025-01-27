---
lang: en-US
title: "Python Constants: Improve Your Code's Maintainability"
description: "Article(s) > Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Python Constants: Improve Your Code's Maintainability"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/
prev: /programming/py/articles/README.md
date: 2025-01-19
isOriginal: false
author:
  - name: Leodanis Pozo Ramos
    url : https://realpython.com/team/lpozoramos/
cover: https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg
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
  name="Python Constants: Improve Your Code's Maintainability"
  desc="In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability."
  url="https://realpython.com/python-constants"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

[**Defining Python Constants for Code Maintainability**](/courses/defining-constants-code-maintainability/)

:::

In Python, constants are identifiers for values that don’t change during a program’s execution. Unlike some other languages, Python lacks built-in syntax for constants, treating them as variables that should remain unchanged. You define constants by following a naming convention: use all uppercase letters with underscores separating words. This signals to other developers that these variables should not be reassigned.

::: info By the end of this tutorial, you’ll understand that

- **Constants in Python** are variables that should remain unchanged throughout execution.
- **Python lacks built-in syntax** for constants, relying on conventions to signal immutability.
- **Defining a constant** involves using uppercase letters with underscores for clarity.
- **Best practices** include defining constants at the top of a file and using descriptive names.
- **Built-in constants like `math.pi`** offer predefined, reliable values, unlike user-defined ones.

:::

To learn the most from this tutorial, you’ll need basic knowledge of Python [**variables**](/realpython.com/python-variables.md), [**functions**](/realpython.com/defining-your-own-python-function.md), [**modules, packages**](/realpython.com/python-modules-packages.md), and [**namespaces**](/realpython.com/python-namespaces-scope.md). You’ll also need to know the basics of [**object-oriented programming**](/realpython.com/python3-object-oriented-programming.md) in Python.

```component VPCard
{
  "title": "Understanding Constants and Variables",
  "desc": "(1/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/understanding-constants-and-variables.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Defining Your Own Constants in Python",
  "desc": "(2/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/defining-your-own-constants-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Putting Constants Into Action",
  "desc": "(3/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/putting-constants-into-action.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Handling Your Constants in a Real-World Project",
  "desc": "(4/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/handling-your-constants-in-a-real-world-project.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Exploring Other Constants in Python",
  "desc": "(5/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/exploring-other-constants-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Type-Annotating Constants",
  "desc": "(6/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/type-annotating-constants.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Defining Strict Constants in Python",
  "desc": "(7/7) Python Constants: Improve Your Code's Maintainability",
  "link": "/realpython.com/python-constants/defining-strict-constants-in-python.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

Now you know what **constants** are, as well as why and when to use them in your code. You also know that Python doesn’t have strict constants. The Python community uses *uppercase letters* as a naming convention to communicate that a variable should be used as a constant. This naming convention helps to prevent other developers from changing variables that are meant to be constant.

Constants are everywhere in programming, and Python developers also use them. So, learning to define and use constants in Python is an important skill for you to master.

::: info In this tutorial, you learned how to

- Define **Python constants** in your code
- Identify and understand some **built-in constants**
- Improve you code’s **readability**, **reusability**, and **maintainability** with constants
- Use different strategies to **organize and manage constants** in a real-world project
- Apply various techniques to make your Python constants **strictly constant**

:::

With this knowledge about what constants are, why they’re important, and when to use them, you’re ready to start improving your code’s readability, maintainability, and reusability immediately. Go ahead and give it a try!

---

## Frequently Asked Questions

Now that you have some experience with Python constants, you can use the questions and answers below to check your understanding and recap what you’ve learned.

These FAQs are related to the most important concepts you’ve covered in this tutorial.

::: details How do you define a constant in Python?

You define a constant in Python by creating a variable with an uppercase name to indicate that its value shouldn’t change. This is a convention, as Python doesn’t enforce immutability.

:::

::: details What naming conventions should you follow for constants in Python?

You should use all uppercase letters with underscores separating words, following the PEP 8 style guide. This helps communicate to other programmers that the variable is intended to be a constant.

:::

::: details What are the best practices for using constants in Python projects?

Use descriptive names and define them at the top of your modules. Keep them in the same module as the related code, or in a dedicated module if they’re used across multiple modules.

:::

::: details How do built-in constants like `math.pi` differ from user-defined constants?

Built-in constants are predefined and available in Python’s standard library, providing precise values like `math.pi` for mathematical operations. User-defined constants are created by you to represent values that should remain unchanged.

:::

::: details Does Python have built-in support for constants?

Python doesn’t have built-in support for constants like it does for variables. However, it uses conventions such as uppercase naming to indicate that a variable should be treated as a constant.

:::

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

[**Defining Python Constants for Code Maintainability**](/courses/defining-constants-code-maintainability/)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python Constants: Improve Your Code's Maintainability",
  "desc": "In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-constants.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
