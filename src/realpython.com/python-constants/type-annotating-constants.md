---
lang: en-US
title: "Type-Annotating Constants"
description: "Article(s) > (6/7) Python Constants: Improve Your Code's Maintainability"
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
      content: "Article(s) > (6/7) Python Constants: Improve Your Code's Maintainability"
    - property: og:description
      content: "Type-Annotating Constants"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-constants/type-annotating-constants.html
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
  url="https://realpython.com/python-constants#type-annotating-constants"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-Constants_Watermarked.4cc3aa373268.jpg"/>

Since Python [**3.8**](/realpython.com/python38-new-features.md), the [**`typing`**](/realpython.com/python-type-checking.md) module includes a [<FontIcon icon="fa-brands fa-python"/>`Final`](https://docs.python.org/3/library/typing.html#typing.Final) class that allows you to type-annotate constants. If you use this class when defining your constants, then you’ll tell static type checkers like [<FontIcon icon="fas fa-globe"/>mypy](https://mypy.readthedocs.io/en/latest/index.html) that your constants shouldn’t be reassigned. This way, the type checker can help you detect unauthorized assignments on your constants.

Here are some examples of using `Final` to define your constants:

```py{8}
from typing import Final

MAX_SPEED: Final[int] = 300
DEFAULT_COLOR: Final[str] = "\033[1;34m"
ALLOWED_BUILTINS: Final[tuple[str, ...]] = ("sum", "max", "min", "abs")

# Later in your code...
MAX_SPEED = 450  # Cannot assign to final name "MAX_SPEED" mypy(error)
```

The `Final` class represents a special typing construct that indicates type checkers to report an error if the name at hand is reassigned at some point in your code. Note that even though you get a type checker’s error report, Python does change the value of `MAX_SPEED`. So, `Final` doesn’t prevent accidental constant reassignments at runtime.
