---
lang: en-US
title: "How to Implement the Strategy Pattern in Python"
description: "Article(s) > How to Implement the Strategy Pattern in Python"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement the Strategy Pattern in Python"
    - property: og:description
      content: "How to Implement the Strategy Pattern in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-the-strategy-pattern-in-python.html
prev: /programming/py/articles/README.md
date: 2026-03-12
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8298ed99-c958-4b98-821e-ae43496b85af.png
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
  name="How to Implement the Strategy Pattern in Python"
  desc="Have you ever opened a food delivery app and chosen between ”fastest route”, ”cheapest option”, or ”fewest stops”? Or picked a payment method at checkout like credit card, PayPal, or wallet balance? B"
  url="https://freecodecamp.org/news/how-to-implement-the-strategy-pattern-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/8298ed99-c958-4b98-821e-ae43496b85af.png"/>

Have you ever opened a food delivery app and chosen between "fastest route", "cheapest option", or "fewest stops"? Or picked a payment method at checkout like credit card, PayPal, or wallet balance? Behind both of these, there's a good chance the **strategy pattern** is at work.

The strategy pattern lets you define a family of algorithms, put each one in its own class, and make them interchangeable at runtime. Instead of writing a giant `if/elif` chain every time behavior needs to change, you swap in the right strategy for the job.

In this tutorial, you'll learn what the strategy pattern is, why it's useful, and how to implement it in Python with practical examples.

::: info

You can get the code [on GitHub (<VPIcon icon="iconfont icon-github" />`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/design-patterns/strategy).

<SiteInfo
  name="python-basics/design-patterns/strategy at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/design-patterns/strategy/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/044c12811635a47e16be40ad858ff566cf69f8f18f8f004f80c0be0d01a8ea6a/balapriyac/python-basics"/>

:::

::: note Prerequisites

Before we start, make sure you have:

- Python 3.10 or higher installed
- Basic understanding of Python classes and methods
- Familiarity with object-oriented programming (OOP) concepts

Let's get started!

:::

---

## What Is the Strategy Pattern?

The **strategy pattern** defines a way to encapsulate a group of related algorithms so they can be used interchangeably. The object that uses the algorithm, called the **context**, doesn't need to know how it works. It just delegates the work to whichever strategy is currently set.

Think of it like a GPS app. The destination is the same, but you can switch between "avoid highways", "shortest distance", or "least traffic" without changing the destination or the app itself. Each routing option is a separate strategy.

The pattern is useful when:

- You have multiple variations of an algorithm or behavior
- You want to eliminate long `if/elif` conditionals based on type
- You want to swap behavior at runtime without changing the context class
- Different parts of your app need different variations of the same operation

Now let's look at examples to understand this better.

---

## A Simple Strategy Pattern Example

Let's build a simple e-commerce order system where different discount strategies can be applied at checkout.

First, let's create the three discount strategies:

```py
class RegularDiscount:
    def apply(self, price):
        return price * 0.95  # 5% off

class SeasonalDiscount:
    def apply(self, price):
        return price * 0.80  # 20% off

class NoDiscount:
    def apply(self, price):
        return price  # no change
```

Each class has a single `apply` method that takes a price and returns the discounted price. They **share the same interface but implement different logic**: that's the key concept in the strategy pattern.

Now let's create the `Order` class that uses one of these strategies:

```py
class Order:
    def __init__(self, product, price, discount_strategy):
        self.product = product
        self.price = price
        self.discount_strategy = discount_strategy

    def final_price(self):
        return self.discount_strategy.apply(self.price)

    def summary(self):
        print(f"Product : {self.product}")
        print(f"Original: ${self.price:.2f}")
        print(f"Final   : ${self.final_price():.2f}")
        print("-" * 30)
```

The `Order` class is our **context**. It doesn't contain any discount logic itself – it delegates that entirely to `discount_strategy.apply()`. Whichever strategy object you pass in, that's the one that runs.

Now let's place some orders. Running the above code should give you the following output:

```py
order1 = Order("Mechanical Keyboard", 120.00, NoDiscount())
order2 = Order("Laptop Stand", 45.00, RegularDiscount())
order3 = Order("USB-C Hub", 35.00, SeasonalDiscount())

order1.summary()
order2.summary()
order3.summary()
#
# Product : Mechanical Keyboard
# Original: $120.00
# Final   : $120.00
# ------------------------------
# Product : Laptop Stand
# Original: $45.00
# Final   : $42.75
# ------------------------------
# Product : USB-C Hub
# Original: $35.00
# Final   : $28.00
# ------------------------------
```

Notice how `Order` never checks `if discount_type == "seasonal"`. It just calls `apply()` and trusts the strategy to handle it. Adding a new discount type in the future means creating one new class and nothing else changes.

---

## Swapping Strategies at Runtime

One of the biggest advantages of the strategy pattern is that you can change the strategy while the program is running. Let's say a user upgrades to a premium membership mid-session:

```py
class ShoppingCart:
    def __init__(self):
        self.items = []
        self.discount_strategy = NoDiscount()  # default

    def add_item(self, name, price):
        self.items.append({"name": name, "price": price})

    def set_discount(self, strategy):
        self.discount_strategy = strategy
        print(f"Discount updated to: {strategy.__class__.__name__}")

    def checkout(self):
        print("\n--- Checkout Summary ---")
        total = 0
        for item in self.items:
            discounted = self.discount_strategy.apply(item["price"])
            print(f"{item['name']}: ${discounted:.2f}")
            total += discounted
        print(f"Total: ${total:.2f}\n")
```

The `set_discount` method lets us replace the strategy at any point. Let's see it in action:

```py
cart = ShoppingCart()
cart.add_item("Notebook", 15.00)
cart.add_item("Desk Lamp", 40.00)
cart.add_item("Monitor Riser", 25.00)

# Checkout as a regular customer
cart.checkout()

# User upgrades to seasonal sale membership
cart.set_discount(SeasonalDiscount())
cart.checkout()
#
# --- Checkout Summary ---
# Notebook: $15.00
# Desk Lamp: $40.00
# Monitor Riser: $25.00
# Total: $80.00
# 
# Discount updated to: SeasonalDiscount
# 
# --- Checkout Summary ---
# Notebook: $12.00
# Desk Lamp: $32.00
# Monitor Riser: $20.00
# Total: $64.00
```

The cart itself didn't change – only the strategy did. This is the advantage of keeping *behavior* separate from the *context* that uses it.

---

## Using Abstract Base Classes

So far, nothing enforces that every strategy has an `apply` method. If someone creates a strategy and forgets it, they'll get a cryptic `AttributeError` at runtime. We can prevent that using [<VPIcon icon="fa-brands fa-python"/>Python's Abstract Base Classes](https://docs.python.org/3/library/abc.html).

```py
from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
    @abstractmethod
    def apply(self, price: float) -> float:
        pass
```

Now let's rewrite our strategies to inherit from it:

```py
class RegularDiscount(DiscountStrategy):
    def apply(self, price):
        return price * 0.95

class SeasonalDiscount(DiscountStrategy):
    def apply(self, price):
        return price * 0.80

class NoDiscount(DiscountStrategy):
    def apply(self, price):
        return price
```

Now if someone creates a broken strategy without `apply`, Python will raise a `TypeError` immediately when they try to instantiate it — before any code runs. That's a much cleaner failure.

```py
class BrokenStrategy(DiscountStrategy):
    pass  # forgot to implement apply()

s = BrokenStrategy()  # raises TypeError right here
```

Using ABCs is especially helpful on larger teams or in shared codebases, where you want to make the contract explicit: every strategy *must* implement `apply`. Else, you run into an error as shown.

```plaintext
      2     pass  # forgot to implement apply()
      3 
----> 4 s = BrokenStrategy()  # raises TypeError right here

TypeError: Can't instantiate abstract class BrokenStrategy without an implementation for abstract method 'apply'
```

---

## When to Use the Strategy Pattern

The Strategy pattern is a good fit when:

- You have branching logic based on type — long `if/elif` blocks that check a "mode" or "type" variable are a signal that Strategy might help.
- Behavior needs to change at runtime — when users or config values should be able to switch algorithms without restarting.
- You're building extensible systems — new behavior can be added as a new class without touching existing code.
- You want to test algorithms independently — each strategy is its own class, making unit tests straightforward.

Avoid it when:

- You only have two variations that will never grow — a simple `if/else` is perfectly fine there.
- The strategies share so much state that separating them into classes adds complexity without benefit.

---

## Conclusion

I hope you found this tutorial useful. To sum up, the strategy pattern gives you a clean way to manage varying behavior without polluting your classes with conditional logic. The context stays simple and stable and the strategies handle the complexity.

We covered the basic pattern, runtime strategy swapping, and enforcing contracts with abstract base classes. As with most design patterns, start simple: even without ABCs, separating your algorithms into their own classes immediately makes your code easier to read, test, and extend.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement the Strategy Pattern in Python",
  "desc": "Have you ever opened a food delivery app and chosen between ”fastest route”, ”cheapest option”, or ”fewest stops”? Or picked a payment method at checkout like credit card, PayPal, or wallet balance? B",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-the-strategy-pattern-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
