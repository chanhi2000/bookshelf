---
lang: en-US
title: "Operator Overloading"
description: "Article(s) > (3/10) How Python Magic Methods Work: A Practical Guide" 
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
      content: "Article(s) > (3/10) How Python Magic Methods Work: A Practical Guide"
    - property: og:description
      content: "Operator Overloading"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/python-magic-methods-practical-guide/operator-overloading.html
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
  url="https://freecodecamp.org/news/python-magic-methods-practical-guide#heading-operator-overloading"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742482738702/0b357de2-855d-47c2-960f-453e0bfd9a3d.png"/>

Operator overloading is one of the most powerful features of Python's magic methods. It lets you define how your objects behave when used with operators like `+`, `-`, `*`, and `==`. This makes your code more intuitive and readable.

---

## Arithmetic Operators

Python provides magic methods for all basic arithmetic operations. Here's a table showing which method corresponds to which operator:

| Operator | Magic Method | Description |
| ---: | --- | --- |
| `+` | `__add__` | Addition |
| `-` | `__sub__` | Subtraction |
| `*` | `__mul__` | Multiplication |
| `/` | `__truediv__` | Division |
| `//` | `__floordiv__` | Floor division |
| `%` | `__mod__` | Modulo |
| `**` | `__pow__` | Exponentiation |

---

## Comparison Operators

Similarly, you can define how your objects are compared using these magic methods:

| Operator | Magic Method | Description |
| --- | --- | --- |
| `==` | `__eq__` | Equal to |
| `!=` | `__ne__` | Not equal to |
| `<` | `__lt__` | Less than |
| `>` | `__gt__` | Greater than |
| `<=` | `__le__` | Less than or equal to |
| `>=` | `__ge__` | Greater than or equal to |

---

## Practical Example: Money Class

Let's create a `Money` class that handles currency operations correctly. This example shows how to implement multiple operators and handle edge cases:

```py :collapsed-lines
from functools import total_ordering
from decimal import Decimal

@total_ordering  # Implements all comparison methods based on __eq__ and __lt__
class Money:
    def __init__(self, amount, currency="USD"):
        self.amount = Decimal(str(amount))
        self.currency = currency

    def __add__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError(f"Cannot add different currencies: {self.currency} and {other.currency}")
        return Money(self.amount + other.amount, self.currency)

    def __sub__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError(f"Cannot subtract different currencies: {self.currency} and {other.currency}")
        return Money(self.amount - other.amount, self.currency)

    def __mul__(self, other):
        if isinstance(other, (int, float, Decimal)):
            return Money(self.amount * Decimal(str(other)), self.currency)
        return NotImplemented

    def __truediv__(self, other):
        if isinstance(other, (int, float, Decimal)):
            return Money(self.amount / Decimal(str(other)), self.currency)
        return NotImplemented

    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return self.currency == other.currency and self.amount == other.amount

    def __lt__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        if self.currency != other.currency:
            raise ValueError(f"Cannot compare different currencies: {self.currency} and {other.currency}")
        return self.amount < other.amount

    def __str__(self):
        return f"{self.currency} {self.amount:.2f}"

    def __repr__(self):
        return f"Money({repr(float(self.amount))}, {repr(self.currency)})"
```

Let's break down the key features of this `Money` class:

1. **Precision handling**: We use `Decimal` instead of `float` to avoid floating-point precision issues with money calculations.
2. **Currency safety**: The class prevents operations between different currencies to avoid errors.
3. **Type checking**: Each method checks if the other operand is of the correct type using `isinstance()`.
4. **NotImplemented**: When an operation doesn't make sense, we return `NotImplemented` to let Python try the reverse operation.
5. `@total_ordering`: This decorator automatically implements all comparison methods based on `__eq__` and `__lt__`.

Here's how to use the `Money` class:

```py :collapsed-lines
# Basic arithmetic
wallet = Money(100, "USD")
expense = Money(20, "USD")
remaining = wallet - expense
print(remaining)  # Output: USD 80.00

# Working with different currencies
salary = Money(5000, "USD")
bonus = Money(1000, "USD")
total = salary + bonus
print(total)  # Output: USD 6000.00

# Division by scalar
weekly_pay = salary / 4
print(weekly_pay)  # Output: USD 1250.00

# Comparisons
print(Money(100, "USD") > Money(50, "USD"))  # Output: True
print(Money(100, "USD") == Money(100, "USD"))  # Output: True

# Error handling
try:
    Money(100, "USD") + Money(100, "EUR")
except ValueError as e:
    print(e)  # Output: Cannot add different currencies: USD and EUR
```

This `Money` class demonstrates several important concepts:

1. How to handle different types of operands
2. How to implement proper error handling
3. How to use the `@total_ordering` decorator
4. How to maintain precision in financial calculations
5. How to provide both string and representation methods
