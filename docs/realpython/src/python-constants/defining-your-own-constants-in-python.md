---
lang: en-US
title: "Defining Your Own Constants in Python"
description: "Article(s) > (2/7) Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > (2/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Defining Your Own Constants in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/defining-your-own-constants-in-python.html
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
  "title": "Python Constants: Improve Your Code's Maintainability",
  "desc": "In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability.",
  "link": "/realpython.com/python-constants/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Constants: Improve Your Code's Maintainability"
  desc="In this tutorial, you'll learn how to properly define constants in Python. By coding a bunch of practical example, you'll also learn how Python constants can improve your code's readability, reusability, and maintainability."
  url="https://realpython.com/python-constants#defining-your-own-constants-in-python"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

Up to this point, you’ve learned about constants as a general concept in life, science, and programming. Now it’s time to learn how Python deals with constants. First, you should know that Python doesn’t have a dedicated syntax for defining constants.

In other words, Python doesn’t have constants in the strict sense of the word. It only has variables, primarily because of its dynamic nature. Therefore, to have a constant in Python, you need to define a *variable that never changes* and stick to that behavior by avoiding assignment operations on the variable itself.

::: note

In this section, you’ll focus on *defining* your own constants. However, there are a few constants that are built into Python. You’ll learn about them [later on](/realpython.com/python-constants/exploring-other-constants-in-python.md#exploring-other-constants-in-python).

:::

Then, how would Python developers know that a given variable represents a constant? The Python community has decided to use a strong **naming convention** to distinguish between variables and constants. Keep reading to learn more!

---

## User-Defined Constants

To tell other programmers that a given value should be *treated as a constant*, you must use a widely accepted naming convention for the constant’s identifier or name. You should write the name in capital letters with underscores separating words, as stated in the [<VPIcon icon="fa-brands fa-python"/>Constants](https://peps.python.org/pep-0008/#constants) section of [**PEP 8**](/realpython.com/python-pep8.md).

Here are a few example of user-defined Python constants:

```py
PI = 3.14
MAX_SPEED = 300
DEFAULT_COLOR = "\033[1;34m"
WIDTH = 20
API_TOKEN = "593086396372"
BASE_URL = "https://api.example.com"
DEFAULT_TIMEOUT = 5
ALLOWED_BUILTINS = ("sum", "max", "min", "abs")
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    ...
]
```

Note that you’ve created these constants exactly as you’d create variables. You’ve used a descriptive name, the assignment [**operator**](/realpython.com/python-operators-expressions.md) (`=`), and the constant’s specific value.

By using capital letters only, you’re communicating that the current name is intended to be treated as a constant—or more precisely, as a variable that never changes. So, other Python developers will know that and hopefully won’t perform any assignment operation on the variable at hand.

::: note

Again, Python doesn’t support constants or non-reassignable names. Using uppercase letters is just a convention, and it doesn’t prevent developers from assigning new values to your constant. So, any programmer working on your code needs to be careful and never write code that changes the values of constants. Remember this rule because you also need to follow it.

:::

Because Python constants are just variables, both follow similar naming rules, with the only distinction being that constants use uppercase letters only. Following this idea, constants’ names can:

- Be of any length
- Consist of uppercase letters (`A`-`Z`)
- Include digits (`0`-`9`) but not as their first character
- Use underscore characters (`_`) to separate words or as their first character

Using uppercase letters makes your constants stand out from your variables. This way, other developers will unambiguously recognize their purpose.

As a general naming recommendation, avoid abbreviated names when defining constants. The purpose of a constant’s name is to *clarify the meaning* of the constant’s value so that you can reuse it later. This goal demands descriptive names. Avoid using single-letter names, uncommon abbreviations, and generic names like `NUMBER` or `MAGNITUDE`.

The recommended practice is to define constants at the top of any `.py` file right after any [**`import`**](/realpython.com/python-import.md) statements. This way, people reading your code will immediately know the constants’ purpose and expected treatment.

---

## Module-Level Dunder Constants

[<VPIcon icon="fa-brands fa-python"/>Module-level dunder names](https://peps.python.org/pep-0008/#module-level-dunder-names) are special names that start and end with a [**double underscore**](/realpython.com/python-double-underscore.md). Some examples include names such as `__all__`, `__author__`, and `__version__`. These names are typically treated as constants in Python projects.

::: note

In Python, a **dunder name** is a name with special meaning. It starts and ends in double underscores, and the word *dunder* is a [<VPIcon icon="fa-brands fa-wikipedia-w"/>portmanteau](https://en.wikipedia.org/wiki/Portmanteau) of **d**ouble **under**score.

:::

According to Python’s coding style guide, [<VPIcon icon="fa-brands fa-python"/>PEP 8](https://peps.python.org/pep-0008/), module-level dunder names should appear after the module’s [**docstring**](/realpython.com/documenting-python-code.md) and before any `import` statement except for `__future__` imports.

Here’s a sample module that includes a bunch of dunder names:

```py :collapsed-lines title="greeting.py"
"""This module defines some module-level dunder names."""

from __future__ import barry_as_FLUFL

__all__ = ["greet"]
__author__ = "Real Python"
__version__ = "0.1.0"

import sys

def greet(name="World"):
    print(f"Hello, {name}!")
    print(f"Greetings from version: {__version__}!")
    print(f"Yours, {__author__}!")
```

In this example, `__all__` defines up front the list of names that Python will import when you use the `from module import *` import construct in your code. In this case, someone importing `greeting` with a wildcard import will just get the `greet()` function back. They won’t have access to `__author__`, `__version__`, and other names not listed on `__all__`.

::: note

The `from module import *` construct allows you to import all the names defined in a given module in one go. The `__all__` attribute restricts the imported names to only those in the underlying list.

The Python community strongly [<VPIcon icon="fa-brands fa-python"/>discourages](https://peps.python.org/pep-0008/#imports) this `import` construct, commonly known as **wildcard imports**, because it tends to clutter your current [**namespace**](/realpython.com/python-namespaces-scope.md) with names that you probably won’t use in your code.

:::

In contrast, `__author__` and `__version__` have meaning only for the code’s authors and users rather than for the code’s logic itself. These names should be treated as constants since no code should be allowed to change the author or version during the program’s execution.

Note that the `greet()` function does access the dunder names but doesn’t change them. Here’s how `greet()` works in practice:

```py
from greeting import *

greet()
# 
# Hello, World!
# Greetings from version: 0.1.0!
# Yours, Real Python!
```

In general, there are no hard rules that prevent you from defining your own module-level dunder names. However, the Python documentation strongly [<VPIcon icon="fa-brands fa-python"/>warns](https://docs.python.org/3/reference/lexical_analysis.html#reserved-classes-of-identifiers) against using dunder names other than those generally accepted and used by the community. The core developers may introduce new dunder names to the language in the future without any warning.
