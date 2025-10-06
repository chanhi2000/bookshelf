---
lang: en-US
title: "What are Magic Methods?"
description: "Article(s) > (1/10) How Python Magic Methods Work: A Practical Guide" 
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
      content: "Article(s) > (1/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "What are Magic Methods?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/python-magic-methods-practical-guide/what-are-magic-methods.html
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
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-what-are-magic-methods"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

Magic methods in Python are special methods that start and end with double underscores (`__`). When you use certain operations or functions on your objects, Python automatically calls these methods.

For example, when you use the `+` operator on two objects, Python looks for the `__add__` method in the left operand. If it finds it, it calls that method with the right operand as an argument.

Here's a simple example that shows how this works:

```py
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

p1 = Point(1, 2)
p2 = Point(3, 4)
p3 = p1 + p2  # This calls p1.__add__(p2)
print(p3.x, p3.y)  # Output: 4 6
```

Let's break down what's happening here:

1. We create a `Point` class that represents a point in 2D space
2. The `__init__` method initializes the x and y coordinates
3. The `__add__` method defines what happens when we add two points
4. When we write `p1 + p2`, Python automatically calls `p1.__add__(p2)`
5. The result is a new `Point` with coordinates (4, 6)

This is just the beginning. Python has many magic methods that let you customize how your objects behave in different situations. Let's explore some of the most useful ones.
