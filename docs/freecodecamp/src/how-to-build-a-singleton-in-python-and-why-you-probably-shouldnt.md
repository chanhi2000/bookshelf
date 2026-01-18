---
lang: en-US
title: "How to Build a Singleton in Python (and Why You Probably Shouldn't)"
description: "Article(s) > How to Build a Singleton in Python (and Why You Probably Shouldn't)"
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
      content: "Article(s) > How to Build a Singleton in Python (and Why You Probably Shouldn't)"
    - property: og:description
      content: "How to Build a Singleton in Python (and Why You Probably Shouldn't)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-singleton-in-python-and-why-you-probably-shouldnt.html
prev: /programming/py/articles/README.md
date: 2026-01-23
isOriginal: false
author:
  - name: Bala Priya C
    url : https://freecodecamp.org/news/author/balapriyac/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769105598620/fad4c5d3-1633-44be-bd40-246f3eb14a97.png
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
  name="How to Build a Singleton in Python (and Why You Probably Shouldn't)"
  desc="The singleton pattern ensures that a class has exactly one instance throughout your application. You've probably seen it in configuration managers, database connections, or logging systems. While singletons seem useful, they often create more problem..."
  url="https://freecodecamp.org/news/how-to-build-a-singleton-in-python-and-why-you-probably-shouldnt"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769105598620/fad4c5d3-1633-44be-bd40-246f3eb14a97.png"/>

The [<VPIcon icon="fas fa-globe"/>singleton pattern](https://refactoring.guru/design-patterns/singleton) ensures that a class has exactly one instance throughout your application. You've probably seen it in configuration managers, database connections, or logging systems. While singletons seem useful, they often create more problems than they solve.

In this tutorial, I'll show you how to implement singletons in Python, explain when they might be appropriate, and discuss better alternatives for most use cases.

You can find the code [on GitHub (<VPIcon icon="iconfont icon-github" />`balapriyac/python-basics`)](https://github.com/balapriyac/python-basics/tree/main/design-patterns/singleton).

::: note Prerequisites

Before we start, make sure you have:

- **Python 3.10 or higher** installed
- Understanding of Python classes and decorators
- Familiarity with object-oriented programming concepts

:::

No external libraries needed as we'll use only Python's standard library.

---

## What Is a Singleton?

**A singleton is a design pattern that restricts a class to a single instance**. No matter how many times you try to create an object from that class, you always get the same instance back.

The classic use case is a configuration object. You want all parts of your application to share the same configuration, not create separate copies. Instead of passing the config object everywhere, the singleton pattern lets you access it globally.

Here's the problem: global state is problematic. When any part of your code can modify shared state, debugging becomes difficult. You lose the ability to reason about code in isolation. Tests become harder because they share state between runs.

Despite these issues, there are a few genuine use cases. Let's explore how to build singletons properly, then discuss when you actually need them.

---

## The Classic Singleton Pattern

The traditional approach uses a class variable to store the single instance. When you try to create a new instance, the class checks if one already exists.

```py :collapsed-lines
class DatabaseConnection:
    """
    Classic Singleton pattern using __new__
    """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            print("Creating new database connection")
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        # Only initialize once
        if not self._initialized:
            print("Initializing database connection")
            self.connection_string = "postgresql://localhost/mydb"
            self.pool_size = 10
            self._initialized = True

    def query(self, sql):
        return f"Executing: {sql}"
```

Let’s now test the singleton behavior:

```py
db1 = DatabaseConnection()
print(f"db1 connection: {db1.connection_string}")

print("\nCreating second instance:")
db2 = DatabaseConnection()
print(f"db2 connection: {db2.connection_string}")

print(f"\nAre they the same object? {db1 is db2}")
#
# Creating new database connection
# Initializing database connection
# db1 connection: postgresql://localhost/mydb
# 
# Creating second instance:
# Are they the same object? True
```

The `__new__` method controls object creation in Python. By overriding it, we intercept instance creation and return our stored instance if it exists. The `__init__` method still runs each time, so we add an `_initialized` flag to prevent re-initialization.

This pattern works, but it's verbose and easy to mess up. The `_initialized` flag feels like a hack. Let's look at cleaner approaches.

---

## The Decorator Pattern

A more Pythonic approach uses a decorator to handle the singleton logic. This keeps the class clean and moves the singleton behavior to a reusable decorator.

```py
def singleton(cls):
    """
    Decorator that converts a class into a singleton
    """
    instances = {}

    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance

@singleton
class AppConfig:
    """
    Application configuration as a singleton
    """
    def __init__(self):
        print("Loading configuration...")
        self.debug_mode = True
        self.api_key = "secret-key-12345"
        self.max_connections = 100
        self.timeout = 30

    def update_setting(self, key, value):
        setattr(self, key, value)
        print(f"Updated {key} = {value}")
```

As with the earlier approach, let’s test the decorator approach:

```py
# First access
config1 = AppConfig()
print(f"Debug mode: {config1.debug_mode}")

# Second access - no re-initialization
print("\nAccessing config again:")
config2 = AppConfig()
config2.update_setting("timeout", 60)

print(f"\nconfig1 timeout: {config1.timeout}")
print(f"Same instance? {config1 is config2}")
#
# Loading configuration...
# Debug mode: True
# 
# Accessing config again:
# Updated timeout = 60
# 
# config1 timeout: 60
# Same instance? True
```

The decorator pattern is cleaner. The `@singleton` decorator wraps the class and maintains instances in a closure. This keeps singleton logic separate from the class implementation. The class itself remains simple and testable.

Notice how modifying `config2` affects `config1` as they're the same object. This shared state can be useful but also dangerous. Any code that gets the config can modify it, potentially breaking other parts of your application.

---

## The Metaclass Approach

For more control, you can use a metaclass. Metaclasses control class creation itself, making them a natural fit for singletons.

```py
class SingletonMeta(type):
    """
    Metaclass that creates singleton instances
    """
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class Logger(metaclass=SingletonMeta):
    """
    Simple logging singleton using metaclass
    """
    def __init__(self):
        self.logs = []

    def log(self, message):
        self.logs.append(message)
        print(f"[LOG] {message}")

    def get_logs(self):
        return self.logs
```

Let’s test the above metaclass approach to building a singleton:

```py
# Use the logger from different parts of code
logger1 = Logger()
logger1.log("Application started")
logger1.log("User logged in")

# Another part of code gets the same logger
logger2 = Logger()
logger2.log("Processing request")

print(f"\nTotal logs in logger1: {len(logger1.get_logs())}")
print(f"Total logs in logger2: {len(logger2.get_logs())}")
print(f"Same logger? {logger1 is logger2}")
#
# [LOG] Application started
# [LOG] User logged in
# [LOG] Processing request
# 
# Total logs in logger1: 3
# Total logs in logger2: 3
# Same logger? True
```

The metaclass approach is elegant if you're comfortable with metaclasses. The `__call__` method intercepts class instantiation, allowing us to return the existing instance. This happens at a deeper level than `__new__`, making it more robust.

However, metaclasses add complexity. Most Python developers don't work with them regularly, making code harder to understand. Use this approach only if you need the additional control metaclasses provide.

---

## Thread-Safe Singleton

The previous implementations aren't thread-safe. In multi-threaded applications, two threads might create instances simultaneously. Let's fix that.

```py
import threading

class ThreadSafeSingleton:
    """
    Thread-safe singleton using a lock
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                # Double-check pattern
                if cls._instance is None:
                    print(f"Thread {threading.current_thread().name}: Creating instance")
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if not self._initialized:
            with self._lock:
                if not self._initialized:
                    print(f"Thread {threading.current_thread().name}: Initializing")
                    self.data = {}
                    self._initialized = True
```

Now let’s test the above singleton with multiple threads and verify that it’s a singleton with only one instance:

```py
# Test with multiple threads
def create_singleton(thread_id):
    instance = ThreadSafeSingleton()
    instance.data[thread_id] = f"Data from thread {thread_id}"

threads = []
for i in range(5):
    t = threading.Thread(target=create_singleton, args=(i,), name=f"Thread-{i}")
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# Verify it's a singleton
final = ThreadSafeSingleton()
print(f"\nShared data across all threads: {final.data}")

#
# Thread Thread-0: Creating instance
# Thread Thread-0: Initializing
# 
# Shared data across all threads: 
# {0: 'Data from thread 0', 
# 1: 'Data from thread 1', 
# 2: 'Data from thread 2', 
# 3: 'Data from thread 3', 
# 4: 'Data from thread 4'}
```

The lock ensures that only one thread creates the instance. The double-check pattern avoids acquiring the lock on every access. We only lock when the instance might be None. This is more efficient than locking every time.

::: note Note on Python 3.13+

Python 3.13 introduced a [<VPIcon icon="fa-brands fa-python"/>build option for a free-threaded mode](https://docs.python.org/3/glossary.html#term-free-threading), and this has become more [<VPIcon icon="fa-brands fa-python"/>mainstream in Python 3.14](https://docs.python.org/3/howto/free-threading-python.html). With true parallelism, thread safety becomes even more essential. The [<VPIcon icon="fa-brands fa-python"/>global interpreter lock (GIL)](https://docs.python.org/3/glossary.html#term-global-interpreter-lock) previously masked some race conditions by preventing true parallel execution. In free-threaded Python, explicit locking like this becomes essential for correctness, not just good practice. If you're writing code for Python 3.13+ with free-threading enabled, always use proper synchronization primitives like locks for shared mutable state.

:::

---

## Why You Probably Shouldn't Use Singletons

Now that you know how to build singletons, let me explain why you often shouldn't.

### Singletons are global state in disguise

Global state makes code harder to understand, test, and maintain. When any code can access and modify a singleton, you lose the ability to reason about your code locally. Changes in one module can break another through shared state.

### Singletons make testing difficult

Tests should be independent, but Singletons carry state between tests. You need to reset the singleton before each test, which is error-prone. Worse, you can't easily mock a singleton for testing.

### Singletons violate the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle).

The class handles both its core logic and the singleton mechanism. This mixing of concerns makes code harder to maintain.

### Python has better alternatives

Module-level objects are natural singletons. Dependency injection provides better control. Context managers handle resource lifetime cleanly.

---

## Better Alternatives to the Singleton Pattern

Instead of singletons, consider these patterns.

### Module-level Instances

**Module-level instances** are Python's natural singleton. Import a module, and you get the same instance every time. Here’s how you can do it:

```py title="config.py"
class Config:
    def __init__(self):
        self.debug = True
        self.api_key = "secret-key"

    def update(self, key, value):
        setattr(self, key, value)

# Create a single instance at module level
config = Config()
```

This is simpler and more Pythonic. The module system ensures you get the same instance. No special patterns needed. You can use it like so:

```py title="main.py"
from config import config

config.update("debug", False)
print(f"Debug mode: {config.debug}")
```

Let’s now take a closer look at how and why this works. Python's module system is itself a singleton mechanism: when you import a module, Python executes it once and caches the result in `sys.modules`. Every subsequent import returns the cached module object, not a new one.

When <VPIcon icon="fa-brands fa-python"/>`config.py` runs for the first time, it creates the `Config` instance and assigns it to the module-level variable `config`. This happens only once, during the initial import. Any other file that imports `config` from this module gets a reference to that same object, not a new instance. So `from config import config` in multiple files will always give you the exact same `Config` instance, achieving singleton behavior without any special patterns, metaclasses, or decorators.

### Dependency Injection

**Dependency injection** gives you control without global state. It solves the singleton problem by making dependencies explicit parameters instead of hidden global state. Here’s an example:

```py
class DatabaseConnection:
    def __init__(self, connection_string):
        self.connection_string = connection_string

    def query(self, sql):
        return f"Executing {sql}"

class UserRepository:
    def __init__(self, db):
        self.db = db

    def get_user(self, user_id):
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")
```

Instead of `UserRepository` creating or accessing a global database singleton internally, it receives the database connection through its constructor (`__init__`). This means you control exactly which database instance gets used. In production you pass a real `DatabaseConnection`, but in tests you can pass a mock object that doesn't actually connect to a database.

The key here is that `UserRepository` doesn't know or care whether it's getting a singleton, a mock, or a fresh instance each time. It just knows it received something that has a `query` method.

```py
# Create dependencies explicitly
db = DatabaseConnection("postgresql://localhost/mydb")
user_repo = UserRepository(db)

result = user_repo.get_user(123)
```

This makes the code's dependencies visible in the function signature, eliminates hidden global state, makes testing trivial (just pass different objects), and gives you complete control over object lifecycles without needing any singleton patterns at all.

---

## When Singletons Are Acceptable

Despite the drawbacks, some cases justify the use of singletons. Here are some of them:

**Hardware interfaces** that represent unique physical resources. You might have one camera, one printer, or one GPIO interface. A singleton models this accurately.

**Caching layers** where you want a single shared cache across your application. Though even here, dependency injection might be cleaner.

**Thread pools or connection pools** where you want to limit and share expensive resources. The pool itself might be a singleton, though the resources it manages aren't.

Even in these cases, ask yourself: could I use dependency injection instead? Could I make this a module-level instance? The answer is often yes.

---

## Conclusion

I hope you found this tutorial helpful. You've learned several ways to implement singletons in Python: the classic pattern, decorators, metaclasses, and thread-safe variants. Each approach has trade-offs in complexity, readability, and thread safety.

More importantly, you've learned why singletons often aren't the best solution. Global state, testing difficulties, and violation of design principles make Singletons problematic. Module-level instances and dependency injection usually provide better alternatives.

When you reach for a Singleton, pause and ask: do I really need shared global state? Often the answer is no. But when you do need it, now you know how to implement it properly.

Use singletons sparingly, if at all.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Singleton in Python (and Why You Probably Shouldn't)",
  "desc": "The singleton pattern ensures that a class has exactly one instance throughout your application. You've probably seen it in configuration managers, database connections, or logging systems. While singletons seem useful, they often create more problem...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-singleton-in-python-and-why-you-probably-shouldnt.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
