---
lang: en-US
title: "Object Representation"
description: "Article(s) > (2/10) How Python Magic Methods Work: A Practical Guide" 
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Object Representation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-magic-methods-practical-guide/object-representation.html
date: 2025-03-21
isOriginal: false
author:
  - name: Vivek Sahu
    url : https://freecodecamp.org/news/author/viv1/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How Python Magic Methods Work: A Practical Guide",
  "desc": "Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe...",
  "link": "/freecodecamp.org/python-magic-methods-practical-guide/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Python Magic Methods Work: A Practical Guide"
  desc="Have you ever wondered how Python makes objects work with operators like + or -? Or how it knows how to display objects when you print them? The answer lies in Python's magic methods, also known as dunder (double under) methods. Magic methods are spe..."
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-object-representation"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

When you work with objects in Python, you often need to convert them to strings. This happens when you print an object or try to display it in the interactive console. Python provides two magic methods for this purpose: `__str__` and `__repr__`.

---

## `__str__` vs `__repr__`

The `__str__` and `__repr__` methods serve different purposes:

- `__str__`: Called by the `str()` function and by the `print()` function. It should return a string that is readable for end-users.
- `__repr__`: Called by the `repr()` function and used in the interactive console. It should return a string that, ideally, could be used to recreate the object.

Here's an example that shows the difference:

```py
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    def __str__(self):
        return f"{self.celsius}°C"

    def __repr__(self):
        return f"Temperature({self.celsius})"

temp = Temperature(25)
print(str(temp))      # Output: 25°C
print(repr(temp))     # Output: Temperature(25)
```

In this example:

- `__str__` returns a user-friendly string showing the temperature with a degree symbol
- `__repr__` returns a string that shows how to create the object, which is useful for debugging

The difference becomes clear when you use these objects in different contexts:

- When you print the temperature, you see the user-friendly version: `25°C`
- When you inspect the object in the Python console, you see the detailed version: `Temperature(25)`

---

## Practical Example: Custom Error Class

Let's create a custom error class that provides better debugging information. This example shows how you can use `__str__` and `__repr__` to make your error messages more helpful:

```py
class ValidationError(Exception):
    def __init__(self, field, message, value=None):
        self.field = field
        self.message = message
        self.value = value
        super().__init__(self.message)

    def __str__(self):
        if self.value is not None:
            return f"Error in field '{self.field}': {self.message} (got: {repr(self.value)})"
        return f"Error in field '{self.field}': {self.message}"

    def __repr__(self):
        if self.value is not None:
            return f"ValidationError(field='{self.field}', message='{self.message}', value={repr(self.value)})"
        return f"ValidationError(field='{self.field}', message='{self.message}')"

# Usage
try:
    age = -5
    if age < 0:
        raise ValidationError("age", "Age must be positive", age)
except ValidationError as e:
    print(e)  # Output: Error in field 'age': Age must be positive (got: -5)
```

This custom error class provides several benefits:

1. It includes the field name where the error occurred
2. It shows the actual value that caused the error
3. It provides both user-friendly and detailed error messages
4. It makes debugging easier by including all relevant information
