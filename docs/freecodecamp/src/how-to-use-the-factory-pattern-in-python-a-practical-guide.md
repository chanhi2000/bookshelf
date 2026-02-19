---
lang: en-US
title: "How to Use the Factory Pattern in Python - A Practical Guide"
description: "Article(s) > How to Use the Factory Pattern in Python - A Practical Guide"
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
      content: "Article(s) > How to Use the Factory Pattern in Python - A Practical Guide"
    - property: og:description
      content: "How to Use the Factory Pattern in Python - A Practical Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-factory-pattern-in-python-a-practical-guide.html
prev: /programming/py/articles/README.md
date: 2026-02-10
isOriginal: false
author:
  - name: Bala Priya C
    url: https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770649418899/f26d3d70-a909-4d8f-92f5-7f263c64f9fe.png
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
  name="How to Use the Factory Pattern in Python - A Practical Guide"
  desc="Design patterns are proven solutions to common problems in software development. If you've ever found yourself writing repetitive object creation code or struggling to manage different types of objects, the factory pattern might be exactly what you n..."
  url="https://freecodecamp.org/news/how-to-use-the-factory-pattern-in-python-a-practical-guide"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770649418899/f26d3d70-a909-4d8f-92f5-7f263c64f9fe.png"/>

Design patterns are proven solutions to common problems in software development. If you've ever found yourself writing repetitive object creation code or struggling to manage different types of objects, the **factory pattern** might be exactly what you need.

In this tutorial, you'll learn what the factory pattern is, why it's useful, and how to implement it in Python. We'll build practical examples that show you when and how to use this pattern in real-world applications.

::: info

You can find the code [on GitHub (<VPIcon icon="iconfont icon-github"/>`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/design-patterns/factory).

<SiteInfo
  name="python-basics/design-patterns/factory at main · balapriyac/python-basics"
  desc="If you're coming from one of my Python tutorials, you'll find the code here. This repo is quite useless otherwise. :) - balapriyac/python-basics"
  url="https://github.com/balapriyac/python-basics/tree/main/design-patterns/factory/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/54b187f47f398e65f3747508f1133a742740c9cb6a68d4b4e1e4031b806fcdae/balapriyac/python-basics"/>

:::

::: note Prerequisites

Before we start, make sure you have:

- Python 3.10 or higher installed
- Understanding of Python classes and methods
- Familiarity with [<VPIcon icon="fa-brands fa-youtube"/>object-oriented programming](https://youtu.be/Ej_02ICOIgs) (OOP) concepts

<VidStack src="youtube/Ej_02ICOIgs" />

:::

Let’s get started!

---

## What Is the Factory Pattern?

The factory pattern is a creational design pattern that **provides an interface for creating objects without specifying their exact classes**. Instead of calling a constructor directly, you call a factory method that decides which class to instantiate.

Think of it like ordering food at a restaurant. You don't go into the kitchen and make the food yourself. You tell the waiter what you want, and the kitchen (the factory) creates it for you. You get your meal without worrying about the recipe or cooking process.

The factory pattern is useful when:

- You have multiple related classes and need to decide which one to instantiate at runtime
- Object creation logic is complex and you want to encapsulate it
- You want to make your code more maintainable and testable

---

## A Simple Factory Example

Let's start with a basic example. Say you're building a notification system that can send messages via email, SMS, or push notifications.

Without a factory, you might write code like this everywhere in your application:

```py
# Bad approach - tight coupling
if notification_type == "email":
    notifier = EmailNotifier()
elif notification_type == "sms":
    notifier = SMSNotifier()
elif notification_type == "push":
    notifier = PushNotifier()
```

This gets messy quickly. Let's use a factory instead:

```py
class EmailNotifier:
    def send(self, message):
        return f"Sending email: {message}"

class SMSNotifier:
    def send(self, message):
        return f"Sending SMS: {message}"

class PushNotifier:
    def send(self, message):
        return f"Sending push notification: {message}"

class NotificationFactory:
    @staticmethod
    def create_notifier(notifier_type):
        if notifier_type == "email":
            return EmailNotifier()
        elif notifier_type == "sms":
            return SMSNotifier()
        elif notifier_type == "push":
            return PushNotifier()
        else:
            raise ValueError(f"Unknown notifier type: {notifier_type}")
```

In this code, we define three notifier classes, each with a send method.

::: note

In a real application, these would have different implementations for sending notifications.

:::

The `NotificationFactory` class has a [<VPIcon icon="fa-brands fa-python"/>static method](https://docs.python.org/3/library/functions.html#staticmethod) called `create_notifier`. This is our factory method. It takes a string parameter and returns the appropriate notifier object.

The `@staticmethod` decorator means we can call this method without creating an instance of the factory. We just use `NotificationFactory.create_notifier()`.

```py
# Using the factory
notifier = NotificationFactory.create_notifier("email")
result = notifier.send("Hello, World!")
```

Now, whenever we need a notifier, we call the factory instead of instantiating classes directly. This centralizes our object creation logic in one place.

---

## Using a Dictionary for Cleaner Code

The if-elif chain in our factory can get unwieldy as we add more notifier types. Let's refactor using a dictionary:

```py
class NotificationFactory:
    notifier_types = {
        "email": EmailNotifier,
        "sms": SMSNotifier,
        "push": PushNotifier
    }

    @staticmethod
    def create_notifier(notifier_type):
        notifier_class = NotificationFactory.notifier_types.get(notifier_type)
        if notifier_class:
            return notifier_class()
        else:
            raise ValueError(f"Unknown notifier type: {notifier_type}")
```

This approach is much cleaner. We store a dictionary that maps strings to class objects and *not* instances. The keys are notifier type names, and the values are the actual class references.

The `get` method retrieves the class from the dictionary. If the key doesn't exist, it returns `None`. We then instantiate the class by calling it with parentheses: `notifier_class()`.

```py
# Test with different types
email_notifier = NotificationFactory.create_notifier("email")
sms_notifier = NotificationFactory.create_notifier("sms")
push_notifier = NotificationFactory.create_notifier("push")
```

This makes adding new notifier types easier. You just add another entry to the dictionary.

---

## Factory Pattern with Parameters

Real-world objects often need configuration. Let's extend our factory to handle notifiers that require initialization parameters.

We'll create a document generator that produces different file formats with custom settings:

```py :collapsed-lines
class PDFDocument:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.format = "PDF"

    def generate(self):
        return f"Generating {self.format}: '{self.title}' by {self.author}"

class WordDocument:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.format = "DOCX"

    def generate(self):
        return f"Generating {self.format}: '{self.title}' by {self.author}"

class MarkdownDocument:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.format = "MD"

    def generate(self):
        return f"Generating {self.format}: '{self.title}' by {self.author}"

class DocumentFactory:
    document_types = {
        "pdf": PDFDocument,
        "word": WordDocument,
        "markdown": MarkdownDocument
    }

    @staticmethod
    def create_document(doc_type, title, author):
        document_class = DocumentFactory.document_types.get(doc_type)
        if document_class:
            return document_class(title, author)
        else:
            raise ValueError(f"Unknown document type: {doc_type}")
```

The key difference here is that our factory method now accepts additional parameters.

The `create_document` method takes `doc_type`, `title`, and `author` as arguments. When we instantiate the class, we pass the `title` and `author` to the `create_document` constructor: `document_class(title, author)`.

```py
# Create different documents with parameters
pdf = DocumentFactory.create_document("pdf", "Python Guide", "Tutorial Team")
word = DocumentFactory.create_document("word", "Meeting Notes", "Grace Dev")
markdown = DocumentFactory.create_document("markdown", "README", "DevTeam")
```

This lets us create fully configured objects through the factory while keeping the creation logic centralized.

---

## Using Abstract Base Classes

To make our factory more robust, we can use Python's [<VPIcon icon="fa-brands fa-python"/>Abstract Base Classes (ABC)](https://docs.python.org/3/library/abc.html) to enforce a common interface.

Let's create a super simple payment processing system:

```py :collapsed-lines
from abc import ABC, abstractmethod

class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

    @abstractmethod
    def refund(self, transaction_id):
        pass

class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount):
        return f"Processing ${amount} via Credit Card"

    def refund(self, transaction_id):
        return f"Refunding credit card transaction {transaction_id}"

class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount):
        return f"Processing ${amount} via PayPal"

    def refund(self, transaction_id):
        return f"Refunding PayPal transaction {transaction_id}"

class PaymentFactory:
    processors = {
        "credit_card": CreditCardProcessor,
        "paypal": PayPalProcessor
    }

    @staticmethod
    def create_processor(processor_type):
        processor_class = PaymentFactory.processors.get(processor_type)
        if processor_class:
            return processor_class()
        else:
            raise ValueError(f"Unknown processor type: {processor_type}")
```

Here, the `PaymentProcessor` class defines an interface that *all* payment processors must implement. The `@abstractmethod` decorator marks methods that subclasses must override.

You cannot instantiate `PaymentProcessor` directly. It only serves as a blueprint. All concrete processors (`CreditCardProcessor`, `PayPalProcessor`) must implement both `process_payment` and `refund` methods. If they don't, Python will raise an error. This guarantees that any object created by our factory will have the expected methods, making our code more predictable and safer.

You can use the factory like so:

```py
processor = PaymentFactory.create_processor("paypal")
```

---

## A More Helpful Example: Database Connection Factory

Let's build something practical: a factory that creates different database connection objects based on configuration.

```py :collapsed-lines
class MySQLConnection:
    def __init__(self, host, database):
        self.host = host
        self.database = database
        self.connection_type = "MySQL"

    def connect(self):
        return f"Connected to {self.connection_type} at {self.host}/{self.database}"

    def execute_query(self, query):
        return f"Executing on MySQL: {query}"

class PostgreSQLConnection:
    def __init__(self, host, database):
        self.host = host
        self.database = database
        self.connection_type = "PostgreSQL"

    def connect(self):
        return f"Connected to {self.connection_type} at {self.host}/{self.database}"

    def execute_query(self, query):
        return f"Executing on PostgreSQL: {query}"

class SQLiteConnection:
    def __init__(self, host, database):
        self.host = host
        self.database = database
        self.connection_type = "SQLite"

    def connect(self):
        return f"Connected to {self.connection_type} at {self.host}/{self.database}"

    def execute_query(self, query):
        return f"Executing on SQLite: {query}"

class DatabaseFactory:
    db_types = {
        "mysql": MySQLConnection,
        "postgresql": PostgreSQLConnection,
        "sqlite": SQLiteConnection
    }

    @staticmethod
    def create_connection(db_type, host, database):
        db_class = DatabaseFactory.db_types.get(db_type)
        if db_class:
            return db_class(host, database)
        else:
            raise ValueError(f"Unknown database type: {db_type}")

    @staticmethod
    def create_from_config(config):
        """Create a database connection from a configuration dictionary"""
        return DatabaseFactory.create_connection(
            config["type"],
            config["host"],
            config["database"]
        )
```

This example shows a more realistic use case. We have multiple database connection classes, each with the same interface but different implementations.

The factory has two creation methods: `create_connection` for direct parameters and `create_from_config` for configuration dictionaries.

The `create_from_config` method is particularly useful because it lets you load database settings from a config file or environment variables and create the appropriate connection object.

This pattern makes it easy to switch between different databases without changing your application code. You just change the configuration as shown:

```py
# Use with direct parameters
db1 = DatabaseFactory.create_connection("mysql", "localhost", "myapp_db")
print(db1.connect())
print(db1.execute_query("SELECT * FROM users"))

# Use with configuration dictionary
config = {
    "type": "postgresql",
    "host": "db.example.com",
    "database": "production_db"
}
db2 = DatabaseFactory.create_from_config(config)
```

---

## When to Use the Factory Pattern

The factory pattern is useful when you have the following:

1. **Multiple related classes**: When you have several classes that share a common interface but have different implementations (like the payment processors or database connections we had in the examples).
2. **Runtime decisions**: When you need to decide which class to instantiate based on user input, configuration, or other runtime conditions.
3. **Complex object creation**: When creating an object involves multiple steps or requires specific logic that you want to encapsulate.

However, don't use the factory pattern when:

- You only have one or two simple classes
- Object creation is straightforward with no special logic
- The added abstraction makes your code harder to understand

---

## Wrapping Up

The factory pattern is a useful tool for managing object creation in Python. It helps you write cleaner, more maintainable code by centralizing creation logic and decoupling your code from specific class implementations. We've covered:

- Basic factory implementation with simple examples
- Using dictionaries for cleaner factory code
- Passing parameters to factory-created objects
- Using abstract base classes for cleaner interfaces

The key takeaway is this: **whenever you find yourself writing repetitive object creation code or need to decide which class to instantiate at runtime, consider using the factory pattern**. Start simple and add complexity only when needed. The basic dictionary-based factory is often all you need for most applications.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Factory Pattern in Python - A Practical Guide",
  "desc": "Design patterns are proven solutions to common problems in software development. If you've ever found yourself writing repetitive object creation code or struggling to manage different types of objects, the factory pattern might be exactly what you n...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-factory-pattern-in-python-a-practical-guide.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
