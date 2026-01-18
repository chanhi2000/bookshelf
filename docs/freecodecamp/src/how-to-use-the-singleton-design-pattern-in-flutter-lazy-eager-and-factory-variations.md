---
lang: en-US
title: "How to Use the Singleton Design Pattern in Flutter: Lazy, Eager, and Factory Variations"
description: "Article(s) > How to Use the Singleton Design Pattern in Flutter: Lazy, Eager, and Factory Variations"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - fluttr
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use the Singleton Design Pattern in Flutter: Lazy, Eager, and Factory Variations"
    - property: og:description
      content: "How to Use the Singleton Design Pattern in Flutter: Lazy, Eager, and Factory Variations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-singleton-design-pattern-in-flutter-lazy-eager-and-factory-variations.html
prev: /programming/dart/articles/README.md
date: 2026-01-24
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url : https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769212761076/11d41d2a-8efa-4ddb-9ee2-218f5be00d9f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use the Singleton Design Pattern in Flutter: Lazy, Eager, and Factory Variations"
  desc="In software engineering, sometimes you need only one instance of a class across your entire application. Creating multiple instances in such cases can lead to inconsistent behavior, wasted memory, or resource conflicts. The Singleton Design Pattern i..."
  url="https://freecodecamp.org/news/how-to-use-the-singleton-design-pattern-in-flutter-lazy-eager-and-factory-variations"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769212761076/11d41d2a-8efa-4ddb-9ee2-218f5be00d9f.png"/>

In software engineering, sometimes you need only one instance of a class across your entire application. Creating multiple instances in such cases can lead to inconsistent behavior, wasted memory, or resource conflicts.

The Singleton Design Pattern is a creational design pattern that solves this problem by ensuring that a class has exactly one instance and provides a global point of access to it.

This pattern is widely used in mobile apps, backend systems, and Flutter applications for managing shared resources such as:

- Database connections
- API clients
- Logging services
- Application configuration
- Security checks during app bootstrap

In this article, we'll explore what the Singleton pattern is, how to implement it in Flutter/Dart, its variations (eager, lazy, and factory), and physical examples. By the end, you'll understand the proper way to use this pattern effectively and avoid common pitfalls.

::: note Prerequisites

Before diving into this tutorial, you should have:

1. Basic understanding of the Dart programming language
2. Familiarity with Object-Oriented Programming (OOP) concepts, particularly classes and constructors
3. Basic knowledge of Flutter development (helpful but not required)
4. Understanding of static variables and methods in Dart
5. Familiarity with the concept of class instantiation

:::

---

## What is the Singleton Pattern?

The Singleton pattern is a creational design pattern that ensures a class has only one instance and that there is a global point of access to the instance.

Again, this is especially powerful when managing shared resources across an application.

### When to Use the Singleton Pattern

You should use a Singleton when you are designing parts of your system that must exist once, such as:

1. Global app state (user session, auth token, app config)
2. Shared services (logger, API client, database connection)
3. Resource heavy logic (encryption handlers, ML models, cache manager)
4. Application boot security (run platform-specific root/jailbreak checks)

For example, in a Flutter app, Android may check developer mode or root status, while iOS checks jailbroken device state. A Singleton security class is a perfect way to enforce that these checks run once globally during app startup.

---

## How to Create a Singleton Class

We have two major ways of creating a singleton class:

1. Eager Instantiation
2. Lazy Instantiation

### Eager Singleton

This is where the Singleton is created at load time, whether it's used or not.

In this case, the instance of the singleton class as well as any initialization logic runs at load time, regardless of when this class is actually needed or used. Here's how it works:

```dart
class EagerSingleton {
  EagerSingleton._internal();
  static final EagerSingleton _instance = EagerSingleton._internal();

  static EagerSingleton get instance => _instance;

  void sayHello() => print("Hello from Eager Singleton");
}

//usage
void main() {
  // Accessing the singleton globally
  EagerSingleton.instance.sayHello();
}
```

#### How the Eager Singleton Works

Let's break down what's happening in this implementation:

First, `EagerSingleton._internal()` is a private named constructor (notice the underscore prefix). This prevents external code from creating new instances using `EagerSingleton()`. The only way to get an instance is through the controlled mechanism we're about to define.

Next, `static final EagerSingleton _instance = EagerSingleton._internal();` is the key line. This creates the single instance immediately when the class is first loaded into memory. Because it's `static final`, it belongs to the class itself (not any particular instance) and can only be assigned once. The instance is created right here, at declaration time.

The `static EagerSingleton get instance => _instance;` getter provides global access to that single instance. Whenever you call `EagerSingleton.instance` anywhere in your code, you're getting the exact same object that was created when the class loaded.

Finally, `sayHello()` is just a regular method to demonstrate that the singleton works. You could replace this with any business logic your singleton needs to perform.

When you run the code in `main()`, the class loads, the instance is created immediately, and `EagerSingleton.instance.sayHello()` accesses that pre-created instance to call the method.

::: tabs

@tab Pros

1. This is simple and thread safe, meaning it's not affected by concurrency, especially when your app runs on multithreads.
2. It's ideal if the instance is lightweight and may be accessed frequently.

@tab Cons

1. If this instance is never used through the runtime, it results in wasted memory and could impact application performance.

:::

### Lazy Singleton

In this case, the singleton instance is only created when the class is called or needed in runtime. Here, a trigger needs to happen before the instance is created. Let's see an example:

```dart
class LazySingleton {
  LazySingleton._internal(); 
  static LazySingleton? _instance;

  static LazySingleton get instance {
    _instance ??= LazySingleton._internal();
    return _instance!;
  }

  void sayHello() => print("Hello from LazySingleton");
}

//usage 
void main() {
  // Accessing the singleton globally
  LazySingleton.instance.sayHello();
}
```

#### How the Lazy Singleton Works

The lazy implementation differs from eager in one crucial way: timing.

Again, `LazySingleton._internal()` is a private constructor that prevents external instantiation.

But notice that `static LazySingleton? _instance;` is declared as nullable and not initialized. Unlike the eager version, no instance is created at load time. The variable simply exists as `null` until it's needed.

The magic happens in the getter: `_instance ??= LazySingleton._internal();` uses Dart's null-aware assignment operator. This line says "if `_instance` is null, create a new instance and assign it. Otherwise, keep the existing one." This is the lazy initialization: the instance is only created the first time someone accesses it.

The first time you call `LazySingleton.instance`, `_instance` is null, so a new instance is created. Every subsequent call finds that `_instance` already exists, so it just returns that same instance.

The `return _instance!;` uses the null assertion operator because we know `_instance` will never be null at this point (we just ensured it's not null in the previous line).

This approach saves memory because if you never call `LazySingleton.instance` in your app, the instance never gets created.

::: tabs

@tab:active Pros

1. Saves application memory, as it only creates what is needed in runtime.
2. Avoids memory leaks.
3. Is ideal for resource heavy objects while considering application performance.

@tab Cons:

1. Could be difficult to manage in multithreaded environments, as you have to ensure thread safety while following this pattern.

:::

### Choosing Between Eager and Lazy

Now that we've broken down these two major types of singleton instantiation, it's worthy of note that you'll need to be intentional while deciding whether to create a singleton the eager or lazy way. Your use case/context should help you determine what singleton pattern you need to apply during object creation.

As an engineer, you need to ask yourself these questions when using a singleton for object creation:

1. Do I need this class instantiated when the app loads?
2. Based on the user journey, will this class always be needed during every session?
3. Can a user journey be completed without needing to call any logic in this class?

These three questions will determine what pattern (eager or lazy) you should use to fulfill best practices while maintaining scalability and high performance in your application.

---

## Factory Constructors in the Singleton Pattern

Applying factory constructors in the Singleton pattern can be powerful if you use them properly. But first, let's understand what factory constructors are.

### What Are Factory Constructors?

A factory constructor in Dart is a special type of constructor that doesn't always create a new instance of its class. Unlike regular constructors that must return a new instance, factory constructors can:

1. Return an existing instance (perfect for singletons)
2. Return a subclass instance
3. Apply logic before deciding what to return
4. Perform validation or initialization before returning an object

The `factory` keyword tells Dart that this constructor has the flexibility to return any instance of the class (or its subtypes), not necessarily a fresh one.

### Implementing Singleton with Factory Constructor

This allows you to apply initialization logic while your class instance is being created before returning the instance.

```dart
class FactoryLazySingleton {
  FactoryLazySingleton._internal();
  static final FactoryLazySingleton _instance = FactoryLazySingleton._internal();

  static FactoryLazySingleton get instance => _instance;

  factory FactoryLazySingleton() {
    // Your logic runs here
    print("Factory constructor called");
    return _instance;
  }
}
```

#### How the Factory Constructor Singleton Works

This implementation combines aspects of both eager and lazy patterns with additional control.

The `FactoryLazySingleton._internal()` private constructor and `static final _instance` create an eager singleton. The instance is created immediately when the class loads.

The `static get instance` provides the traditional singleton access pattern we've seen before.

But the interesting part is the `factory FactoryLazySingleton()` constructor. This is a public constructor that looks like a normal constructor call, but behaves differently. When you call `FactoryLazySingleton()`, instead of creating a new instance, it runs whatever logic you've placed inside (in this case, a print statement), then returns the existing `_instance`.

This pattern is powerful because:

1. You can log when someone tries to create an instance
2. You can validate conditions before returning the instance
3. You can apply configuration based on parameters passed to the factory
4. You can choose to return different singleton instances based on conditions

For example, you might have different configuration singletons for development vs production:

```dart
factory FactoryLazySingleton({bool isProduction = false}) {
  if (isProduction) {
    // Apply production configuration
    _instance.configure(productionSettings);
  } else {
    // Apply development configuration
    _instance.configure(devSettings);
  }
  return _instance;
}
```

::: tabs

@tab:active Pros

1. You can add logic before returning an instance
2. You can cache or reuse the same object
3. You can dynamically return a subtype if needed
4. You avoid unnecessary instantiation
5. You can inject configuration or environment logic

@tab Cons

1. Adds slight complexity compared to simple getter access
2. The factory constructor syntax might confuse developers unfamiliar with the pattern
3. If overused with complex logic, it can make debugging harder
4. Can create misleading code where `FactoryLazySingleton()` looks like it creates a new instance but doesn't

:::

---

## When Not to Use a Singleton

While singletons are powerful, they're not always the right solution. Understanding when to avoid them is just as important as knowing when to use them.

### Why Singletons Can Be Problematic

Singletons create global state, which can make your application harder to reason about and test. They introduce tight coupling between components that shouldn't necessarily know about each other, and they can make it difficult to isolate components for unit testing.

### Scenarios Where You Should Avoid Singletons

Avoid using the Singleton pattern if:

#### You need multiple independent instances

If different parts of your app need their own separate configurations or states, singletons force you into a one-size-fits-all approach.

For example, if you're building a multi-tenant application where each tenant needs isolated data, a singleton would cause data to bleed between tenants.

::: note Alternative

Use dependency injection to pass different instances to different parts of your app. Each component receives the specific instance it needs through its constructor or a service locator.

```dart
// Instead of singleton
class UserRepository {
  final DatabaseConnection db;
  UserRepository(this.db); 
}

// Usage
final dbForTenantA = DatabaseConnection(tenantId: 'A');
final dbForTenantB = DatabaseConnection(tenantId: 'B');
final repoA = UserRepository(dbForTenantA);
final repoB = UserRepository(dbForTenantB);
```

:::

#### Your architecture avoids shared global state

Modern architectural patterns like BLoC, Provider, or Riverpod in Flutter specifically aim to avoid global mutable state. Singletons work against these patterns by reintroducing global state.

::: noteAlternative

Use state management solutions designed for Flutter. Provider, Riverpod, BLoC, or GetX offer better ways to share data across your app while maintaining testability and avoiding tight coupling.

```dart
// Using Provider instead of singleton
class AppConfig {
  final String apiUrl;
  AppConfig(this.apiUrl);
}

// Provide it at the top level
void main() {
  runApp(
    Provider<AppConfig>(
      create: (_) => AppConfig('https://api.example.com'),
      child: MyApp(),
    ),
  );
}

// Access it anywhere in the widget tree
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final config = Provider.of<AppConfig>(context);

  }
}
```

:::

#### It forces tight coupling between unrelated classes

When multiple unrelated classes depend on the same singleton, they become indirectly coupled. Changes to the singleton affect all these classes, making the codebase fragile and hard to refactor.

::: note Alternative

Use interfaces and dependency injection. Define what behavior you need through an interface, then inject implementations. This way, classes depend on abstractions, not concrete singletons.

```dart :collapsed-lines
// Define an interface
abstract class Logger {
  void log(String message);
}

// Implementation
class ConsoleLogger implements Logger {
  @override
  void log(String message) => print(message);
}

// Classes depend on the interface, not a singleton
class PaymentService {
  final Logger logger;
  PaymentService(this.logger);

  void processPayment() {
    logger.log('Processing payment');
  }
}

// Easy to test with mock
class MockLogger implements Logger {
  List<String> logs = [];
  @override
  void log(String message) => logs.add(message);
}
```

:::

#### You need clean, isolated testing

Singletons maintain state between tests, causing test pollution where one test affects another. This makes tests unreliable and order-dependent.

::: note Alternative

Use dependency injection and create fresh instances for each test. Most testing frameworks support this pattern, allowing you to inject mocks or fakes easily.

```dart :collapsed-lines
// Testable code
class OrderService {
  final PaymentProcessor processor;
  OrderService(this.processor);
}

// In tests
void main() {
  test('processes order successfully', () {
    final mockProcessor = MockPaymentProcessor();
    final service = OrderService(mockProcessor); 

  });
}
```

:::

### General Guidelines

Use singletons sparingly and only when you truly need exactly one instance of something for the entire application lifecycle. Good candidates include logging systems, application-level configuration, and hardware interface managers.

For most other cases, prefer dependency injection, state management solutions, or simply passing instances where needed. These approaches make your code more flexible, testable, and maintainable.

---

## Conclusion

The Singleton pattern is a powerful creational tool, but like every tool, you should use it strategically.

Overusing singletons can make apps tightly coupled, hard to test, and less maintainable.

But when used correctly, the Singleton pattern helps you save memory, enforce consistency, and control object lifecycle beautifully.

The key is understanding your specific use case and choosing the right implementation approach – whether eager, lazy, or factory-based – that best serves your application's needs while maintaining clean, testable code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use the Singleton Design Pattern in Flutter: Lazy, Eager, and Factory Variations",
  "desc": "In software engineering, sometimes you need only one instance of a class across your entire application. Creating multiple instances in such cases can lead to inconsistent behavior, wasted memory, or resource conflicts. The Singleton Design Pattern i...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-the-singleton-design-pattern-in-flutter-lazy-eager-and-factory-variations.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
