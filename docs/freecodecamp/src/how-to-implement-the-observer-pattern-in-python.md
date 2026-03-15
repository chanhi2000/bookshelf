---
lang: en-US
title: "How to Implement the Observer Pattern in Python"
description: "Article(s) > How to Implement the Observer Pattern in Python"
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
      content: "Article(s) > How to Implement the Observer Pattern in Python"
    - property: og:description
      content: "How to Implement the Observer Pattern in Python"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-the-observer-pattern-in-python.html
prev: /programming/py/articles/README.md
date: 2026-02-18
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1771357332246/45dc3900-04d9-474e-91a8-bac2fec86c2c.png
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
  name="How to Implement the Observer Pattern in Python"
  desc="Have you ever wondered how YouTube notifies you when your favorite channel uploads a new video? Or how your email client alerts you when new messages arrive? These are perfect examples of the observer pattern in action. The observer pattern is a desi..."
  url="https://freecodecamp.org/news/how-to-implement-the-observer-pattern-in-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1771357332246/45dc3900-04d9-474e-91a8-bac2fec86c2c.png"/>

Have you ever wondered how YouTube notifies you when your favorite channel uploads a new video? Or how your email client alerts you when new messages arrive? These are perfect examples of the observer pattern in action.

The observer pattern is a design pattern where an object (called the subject) maintains a list of dependents (called observers) and notifies them automatically when its state changes. It's like having a newsletter subscription: when new content is published, all subscribers get notified.

In this tutorial, you'll learn what the observer pattern is, why it's useful, and how to implement it in Python with practical examples.

You can find the code [on GitHub (<VPIcon icon="iconfont icon-github"/>`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/design-patterns/observer).

::: note Prerequisites

Before we start, make sure you have:

- Python 3.10 or higher installed
- Understanding of how Python classes and methods work
- Familiarity with object-oriented programming (OOP) concepts

Let's get started!

:::

---

## What Is the Observer Pattern?

The observer pattern defines a [<VPIcon icon="fa-brands fa-wikipedia-w"/>one-to-many relationship](https://en.wikipedia.org/wiki/One-to-many_\(data_model\)) between objects. **When one object changes state, all its dependents are notified and updated automatically**.

Think of it like a news agency and reporters. When breaking news happens (the subject), the agency notifies all subscribed reporters (observers) immediately. Each reporter can then handle the news in their own way – some might tweet it, others might write articles, and some might broadcast it on TV.

The pattern is useful when:

- You need to notify multiple objects about state changes
- You want loose coupling between objects
- You don't know how many objects need to be notified in advance
- Objects should be able to subscribe and unsubscribe dynamically

---

## A Simple Observer Pattern Example

Let's start with a basic example: a blog that notifies readers when a new article is published.

We'll create a blog (subject) and email subscribers (observers) who get notified automatically when new content is posted.

First, let's build the `Blog` class that will manage subscribers and send notifications:

```py :collapsed-lines
class Blog:
    def __init__(self, name):
        self.name = name
        self._subscribers = []
        self._latest_post = None

    def subscribe(self, subscriber):
        """Add a subscriber to the blog"""
        if subscriber not in self._subscribers:
            self._subscribers.append(subscriber)
            print(f"✓ {subscriber.email} subscribed to {self.name}")

    def unsubscribe(self, subscriber):
        """Remove a subscriber from the blog"""
        if subscriber in self._subscribers:
            self._subscribers.remove(subscriber)
            print(f"✗ {subscriber.email} unsubscribed from {self.name}")

    def notify_all(self):
        """Send notifications to all subscribers"""
        print(f"\nNotifying {len(self._subscribers)} subscribers...")
        for subscriber in self._subscribers:
            subscriber.receive_notification(self.name, self._latest_post)

    def publish_post(self, title):
        """Publish a new post and notify subscribers"""
        print(f"\n📝 {self.name} published: '{title}'")
        self._latest_post = title
        self.notify_all()
```

The `Blog` class is our subject. It maintains a list of subscribers in `_subscribers` and stores the latest post title in `_latest_post`. The `subscribe` method adds subscribers to the list, checking for duplicates. The `notify_all` method loops through all subscribers and calls their `receive_notification` method. When we call `publish_post`, it updates the latest post and automatically notifies all subscribers.

Now let's create the observer class that receives notifications:

```py
class EmailSubscriber:
    def __init__(self, email):
        self.email = email

    def receive_notification(self, blog_name, post_title):
        print(f"📧 Email sent to {self.email}: New post on {blog_name} - '{post_title}'")
```

The `EmailSubscriber` class is our observer. It has one method, `receive_notification`, which handles incoming notifications from the blog.

Now let's use these classes together:

```py
# Create a blog
tech_blog = Blog("DevDaily")

# Create subscribers
reader1 = EmailSubscriber("anna@example.com")
reader2 = EmailSubscriber("betty@example.com")
reader3 = EmailSubscriber("cathy@example.com")

# Subscribe to the blog
tech_blog.subscribe(reader1)
tech_blog.subscribe(reader2)
tech_blog.subscribe(reader3)

# Publish posts
tech_blog.publish_post("10 Python Tips for Beginners")
tech_blog.publish_post("Understanding Design Patterns")
```

```plaintext title="output"
✓ anna@example.com subscribed to DevDaily
✓ betty@example.com subscribed to DevDaily
✓ cathy@example.com subscribed to DevDaily

📝 DevDaily published: '10 Python Tips for Beginners'

Notifying 3 subscribers...
📧 Email sent to anna@example.com: New post on DevDaily - '10 Python Tips for Beginners'
📧 Email sent to betty@example.com: New post on DevDaily - '10 Python Tips for Beginners'
📧 Email sent to cathy@example.com: New post on DevDaily - '10 Python Tips for Beginners'

📝 DevDaily published: 'Understanding Design Patterns'

Notifying 3 subscribers...
📧 Email sent to anna@example.com: New post on DevDaily - 'Understanding Design Patterns'
📧 Email sent to betty@example.com: New post on DevDaily - 'Understanding Design Patterns'
📧 Email sent to cathy@example.com: New post on DevDaily - 'Understanding Design Patterns'
```

Notice how the `Blog` class doesn't need to know the details of how each subscriber handles the notification. It just calls their `receive_notification` method.

::: note

Think of all the examples here as placeholder functions that explain how the observer pattern works. In your projects, you’ll have functions that connect to email and other services.

:::

---

## Handling Unsubscribes

In real applications, users need to be able to unsubscribe. Here's how that works:

```py
blog = Blog("CodeMaster")

user1 = EmailSubscriber("john@example.com")
user2 = EmailSubscriber("jane@example.com")

# Subscribe users
blog.subscribe(user1)
blog.subscribe(user2)

# Publish a post
blog.publish_post("Getting Started with Python")

# User1 unsubscribes
blog.unsubscribe(user1)

# Publish another post - only user2 gets notified
blog.publish_post("Advanced Python Techniques")
```

```plaintext title="output"
✓ john@example.com subscribed to CodeMaster
✓ jane@example.com subscribed to CodeMaster

📝 CodeMaster published: 'Getting Started with Python'

Notifying 2 subscribers...
📧 Email sent to john@example.com: New post on CodeMaster - 'Getting Started with Python'
📧 Email sent to jane@example.com: New post on CodeMaster - 'Getting Started with Python'
✗ john@example.com unsubscribed from CodeMaster

📝 CodeMaster published: 'Advanced Python Techniques'

Notifying 1 subscribers...
📧 Email sent to jane@example.com: New post on CodeMaster - 'Advanced Python Techniques'
```

After `user1` unsubscribes, only `user2` receives the notification for the second post. The observer pattern makes it easy to add and remove observers dynamically.

---

## Different Types of Observers

One super useful aspect of the observer pattern is that different observers can react differently to the same event. Let's create a stock price tracker where multiple observer types respond to price changes.

First, let's create the `Stock` class that will notify observers when the price changes:

```py
class Stock:
    def __init__(self, symbol, price):
        self.symbol = symbol
        self._price = price
        self._observers = []

    def add_observer(self, observer):
        self._observers.append(observer)
        print(f"Observer added: {observer.__class__.__name__}")

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def notify_observers(self):
        for observer in self._observers:
            observer.update(self.symbol, self._price)

    def set_price(self, price):
        print(f"\n {self.symbol} price changed: ${self._price} → ${price}")
        self._price = price
        self.notify_observers()
```

The `Stock` class maintains the current price and notifies all observers whenever `set_price` is called.

Now let's create three different observer types that respond differently to price updates:

```py
class EmailAlert:
    def __init__(self, email):
        self.email = email

    def update(self, symbol, price):
        print(f"📧 Sending email to {self.email}: {symbol} is now ${price}")

class SMSAlert:
    def __init__(self, phone):
        self.phone = phone

    def update(self, symbol, price):
        print(f"📱 Sending SMS to {self.phone}: {symbol} price update ${price}")

class Logger:
    def update(self, symbol, price):
        print(f"📝 Logging: {symbol} = ${price} at system time")
```

Each observer has a different implementation of the update method. `EmailAlert` sends emails, `SMSAlert` sends text messages, and `Logger` records the change.

Now let's use them together:

```py
# Create a stock
apple_stock = Stock("AAPL", 150.00)

# Create different types of observers
email_notifier = EmailAlert("investor@example.com")
sms_notifier = SMSAlert("+1234567890")
price_logger = Logger()

# Add all observers
apple_stock.add_observer(email_notifier)
apple_stock.add_observer(sms_notifier)
apple_stock.add_observer(price_logger)

# Update the stock price
apple_stock.set_price(155.50)
apple_stock.set_price(152.25)
```

```plaintext title="output"
Observer added: EmailAlert
Observer added: SMSAlert
Observer added: Logger

 AAPL price changed: $150.0 → $155.5
📧 Sending email to investor@example.com: AAPL is now $155.5
📱 Sending SMS to +1234567890: AAPL price update $155.5
📝 Logging: AAPL = $155.5 at system time

 AAPL price changed: $155.5 → $152.25
📧 Sending email to investor@example.com: AAPL is now $152.25
📱 Sending SMS to +1234567890: AAPL price update $152.25
📝 Logging: AAPL = $152.25 at system time
```

The `Stock` class doesn't care what each observer does. It simply calls `update` on each one and passes the necessary data. You can mix and match observers however you want.

---

## Using Abstract Base Classes

To enforce a consistent interface across all observers, we can use Python's [<VPIcon icon="fa-brands fa-python"/>Abstract Base Classes](https://docs.python.org/3/library/abc.html). This guarantees type safety.

First, let's create the base classes that define our interface:

```py
from abc import ABC, abstractmethod

class Subject(ABC):
    def __init__(self):
        self._observers = []

    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def notify(self, data):
        for observer in self._observers:
            observer.update(data)

class Observer(ABC):
    @abstractmethod
    def update(self, data):
        pass
```

The `Subject` class provides standard observer management methods. The `Observer` class defines the interface with the `@abstractmethod` decorator ensuring all observers implement update.

Now let's create an order system that uses these base classes:

```py
class OrderSystem(Subject):
    def __init__(self):
        super().__init__()
        self._order_id = None

    def place_order(self, order_id, items):
        print(f"\n🛒 Order #{order_id} placed with {len(items)} items")
        self._order_id = order_id
        self.notify({"order_id": order_id, "items": items})
```

The `OrderSystem` inherits from `Subject` and can manage observers without implementing that logic itself.

Next, let's create concrete observers for different departments:

```py
class InventoryObserver(Observer):
    def update(self, data):
        print(f"📦 Inventory: Updating stock for order #{data['order_id']}")

class ShippingObserver(Observer):
    def update(self, data):
        print(f"🚚 Shipping: Preparing shipment for order #{data['order_id']}")

class BillingObserver(Observer):
    def update(self, data):
        print(f"💳 Billing: Processing payment for order #{data['order_id']}")
```

Each observer *must* implement the `update` method. Now let's put it all together:

```py
# Create the order system
order_system = OrderSystem()

# Create observers
inventory = InventoryObserver()
shipping = ShippingObserver()
billing = BillingObserver()

# Attach observers
order_system.attach(inventory)
order_system.attach(shipping)
order_system.attach(billing)

# Place an order
order_system.place_order("ORD-12345", ["Laptop", "Mouse", "Keyboard"])
```

```plaintext title="output"
🛒 Order #ORD-12345 placed with 3 items
📦 Inventory: Updating stock for order #ORD-12345
🚚 Shipping: Preparing shipment for order #ORD-12345
💳 Billing: Processing payment for order #ORD-12345
```

Using abstract base classes provides type safety and ensures all observers follow the same interface.

---

## When to Use the Observer Pattern

The observer pattern is suiatble for:

- Event-driven systems – GUI frameworks, game engines, or any system where actions trigger updates elsewhere.
- Real-time notifications – Chat apps, social media feeds, stock tickers, or push notification systems.
- Decoupled architecture – When you want the subject independent of its observers for flexibility.
- Multiple listeners – When multiple objects need to react to the same event differently.

Avoid the Observer Pattern when you have simple one-to-one relationships, or when performance is critical with many observers (because notification overhead can be significant).

---

## Conclusion

The observer pattern creates a clean separation between objects that produce events and objects that respond to them. It promotes loose coupling – the subject doesn't need to know anything about its observers except that they have an update method.

We've covered the basic implementation, handling subscriptions, using different observer types, and abstract base classes. Start simple with the basic subject-observer relationship and add complexity only when needed.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement the Observer Pattern in Python",
  "desc": "Have you ever wondered how YouTube notifies you when your favorite channel uploads a new video? Or how your email client alerts you when new messages arrive? These are perfect examples of the observer pattern in action. The observer pattern is a desi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-implement-the-observer-pattern-in-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
