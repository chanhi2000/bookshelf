---
lang: en-US
title: "How the Factory and Abstract Factory Design Patterns Work in Flutter"
description: "Article(s) > How the Factory and Abstract Factory Design Patterns Work in Flutter"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How the Factory and Abstract Factory Design Patterns Work in Flutter"
    - property: og:description
      content: "How the Factory and Abstract Factory Design Patterns Work in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-the-factory-and-abstract-factory-design-patterns-work-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2026-01-28
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url : https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769533734673/8b5ad88a-13d2-4fec-969b-55fd854df5c1.png
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
  name="How the Factory and Abstract Factory Design Patterns Work in Flutter"
  desc="In software development, particularly object-oriented programming and design, object creation is a common task. And how you manage this process can impact your app's flexibility, scalability, and maintainability. Creational design patterns govern how..."
  url="https://freecodecamp.org/news/how-the-factory-and-abstract-factory-design-patterns-work-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769533734673/8b5ad88a-13d2-4fec-969b-55fd854df5c1.png"/>

In software development, particularly object-oriented programming and design, object creation is a common task. And how you manage this process can impact your app's flexibility, scalability, and maintainability.

Creational design patterns govern how classes and objects are created in a systematic and scalable way. They provide blueprints for creating objects so you don't repeat code. They also keep your system consistent and makes your app easy to extend.

There are five major Creational Design patterns:

1. **Singleton:** Ensures a class has only one instance and provides a global point of access to it.
2. **Factory Method**: Provides an interface for creating objects but lets subclasses decide which class to instantiate.
3. **Abstract Factory**: Creates families of related objects without specifying their concrete classes.
4. **Builder**: Allows you to construct complex objects step by step, separating construction from representation.
5. **Prototype**: Creates new objects by cloning existing ones, rather than creating from scratch.

Each of these patterns solves specific problems around object creation, depending on the complexity and scale of your application.

In this tutorial, I'll explain what Creational Design Patterns are and how they work. We'll focus on two primary patterns: the Factory and Abstract Factory patterns.

Many people mix these two up, so here we'll explore:

1. How each pattern works
2. Practical examples in Flutter
3. Applications, best practices, and usage

By the end, you'll understand when to use Factory, when to switch to Abstract Factory, and how to structure your Flutter apps for scalability and maintainability.

::: note Prerequisites

Before diving into this tutorial, you should have:

- a basic understanding of the Dart programming language
- familiarity with Object-Oriented Programming (OOP) concepts (particularly classes, inheritance, and abstract classes)
- basic knowledge of Flutter development (helpful but not required)
- an understanding of interfaces and polymorphism
- and experience creating and instantiating classes in Dart.

:::

---

## How the Factory Pattern Works in Flutter

You'll typically use the Factory Pattern when you want to manage data sets that might be related, but only for a single type of object.

Let's say you want to manage themes for Android and iOS. Using the Factory Pattern allows you to encapsulate object creation and keep your app modular. We'll build this step by step so you can see how the pattern works.

### Step 1: Define the Product and Abstract Creator

```dart
class AppTheme {
  String? data;
  AppTheme({this.data});
}

abstract class ApplicationThemeData {
  Future<AppTheme> getApplicationTheme();
}
```

Here, `AppTheme` is a simple data class that holds theme information. This represents the product our factory will create. `ApplicationThemeData` serves as an abstract base class. This abstraction is crucial because it defines a contract that all concrete theme implementations must follow.

By requiring a `getApplicationTheme()` method, we ensure consistency across different platforms.

### Step 2: Implement Concrete Products

Now we create platform-specific implementations that provide actual theme data.

```dart
class AndroidAppTheme extends ApplicationThemeData {
  @override
  Future<AppTheme> getApplicationTheme() async {
    return AppTheme(data: "Here is android theme");
  }
}

class IOSThemeData extends ApplicationThemeData {
  @override
  Future<AppTheme> getApplicationTheme() async {
    return AppTheme(data: "This is IOS theme data");
  }
}
```

The concrete implementations, `AndroidAppTheme` and `IOSThemeData`, extend the abstract class and provide platform-specific theme data. Each returns an `AppTheme` object with content tailored to its respective platform.

### Step 3: Create the Factory

The factory encapsulates the object creation logic, so client code doesn't need to know which specific theme class it's working with.

```dart
class ThemeFactory {
  ThemeFactory({required this.theme});
  ApplicationThemeData theme;

  loadTheme() async {
    return await theme.getApplicationTheme();
  }
}
```

`ThemeFactory` acts as the factory itself. It accepts any `ApplicationThemeData` implementation and provides a unified `loadTheme()` method. This encapsulates the object creation logic cleanly.

### Step 4: Use the Factory

Finally, we use the factory in our application code.

```dart
ThemeFactory(
  theme: Platform.isAndroid ? AndroidAppTheme() : IOSThemeData()
).loadTheme();
```

Here, you choose a theme (Android or iOS) and get the corresponding `AppTheme`. This approach is simple and effective when you only care about one functionality, like loading a theme.

The beauty of this pattern is that the client code remains clean and doesn't need to change if you add new platforms later.

---

## Factory Pattern for Security Checks

Another excellent use case for the Factory Pattern is when implementing security checks during your application bootstrap.

For instance, Android and iOS require different logic for internal security. Android might check for developer mode or rooted devices, while iOS checks for jailbroken devices. This scenario is a perfect example of when to apply the Factory Pattern, as it allows you to encapsulate platform-specific security logic cleanly and maintainably. Let's implement this step by step.

### Step 1: Define Security Check Result and Abstract Checker

First, we need a standardized way to communicate security check outcomes and a contract for performing security checks.

```dart
// Base security check result class
class SecurityCheckResult {
  final bool isSecure;
  final String message;

  SecurityCheckResult({required this.isSecure, required this.message});
}

// Abstract security checker
abstract class SecurityChecker {
  Future<SecurityCheckResult> performSecurityCheck();
}
```

The `SecurityCheckResult` class provides a standardized way to communicate security check outcomes across platforms.

It contains a boolean flag indicating security status and a descriptive message for the user. The abstract `SecurityChecker` class defines the contract that all platform-specific security implementations must follow.

This ensures that, regardless of the platform, we can always call `performSecurityCheck()` and receive a consistent result type.

### Step 2: Implement Platform-Specific Security Checkers

Now we create the actual security checking implementations for each platform.

```dart :Collapsed-lines
// Android-specific security implementation
class AndroidSecurityChecker extends SecurityChecker {
  @override
  Future<SecurityCheckResult> performSecurityCheck() async {
    bool isRooted = await checkIfDeviceIsRooted();
    if (isRooted) {
      return SecurityCheckResult(
        isSecure: false,
        message: "Device is rooted. App cannot run on rooted devices."
      );
    }

    bool isDeveloperMode = await checkDeveloperMode();
    if (isDeveloperMode) {
      return SecurityCheckResult(
        isSecure: false,
        message: "Developer mode is enabled. Please disable it to continue."
      );
    }

    return SecurityCheckResult(
      isSecure: true,
      message: "Device security check passed."
    );
  }

  Future<bool> checkIfDeviceIsRooted() async {
    return false; 
  }

  Future<bool> checkDeveloperMode() async {
    return false; // Placeholder
  }
}

// iOS-specific security implementation
class IOSSecurityChecker extends SecurityChecker {
  @override
  Future<SecurityCheckResult> performSecurityCheck() async {
    bool isJailbroken = await checkIfDeviceIsJailbroken();

    if (isJailbroken) {
      return SecurityCheckResult(
        isSecure: false,
        message: "Device is jailbroken. App cannot run on jailbroken devices."
      );
    }

    return SecurityCheckResult(
      isSecure: true,
      message: "Device security check passed."
    );
  }

  Future<bool> checkIfDeviceIsJailbroken() async {
    return false; 
  }
}
```

The Android implementation focuses on detecting rooted devices and developer mode, which are common security concerns on Android.

A rooted device has elevated permissions that could allow malicious apps to access sensitive data, while developer mode can expose debugging interfaces.

The iOS implementation checks for jailbroken devices, which is the iOS equivalent of rooting. Jailbroken devices bypass Apple's security restrictions and can pose similar security risks.

### Step 3: Create the Security Factory

The factory wraps the chosen security checker and provides a clean interface for running checks.

```dart
// Security Factory
class SecurityCheckFactory {
  SecurityCheckFactory({required this.checker});
  SecurityChecker checker;

  Future<SecurityCheckResult> runSecurityCheck() async {
    return await checker.performSecurityCheck();
  }
}
```

The `SecurityCheckFactory` provides a simple interface that accepts any `SecurityChecker` implementation. This means your app initialization code doesn't need to know about platform-specific security details – it just calls `runSecurityCheck()` and handles the result.

### Step 4: Use the Security Factory in App Bootstrap

Finally, we integrate the security factory into our app's initialization process.

```dart
// In your app's bootstrap/initialization
Future<void> initializeApp() async {
  final securityFactory = SecurityCheckFactory(
    checker: Platform.isAndroid 
      ? AndroidSecurityChecker() 
      : IOSSecurityChecker()
  );

  final result = await securityFactory.runSecurityCheck();

  if (!result.isSecure) {
    // Show error dialog and prevent app from continuing
    showSecurityErrorDialog(result.message);
    return;
  }

  // Continue with normal app initialization
  runApp(MyApp());
}
```

This usage example demonstrates how the Factory Pattern makes your app initialization code clean and maintainable.

The platform detection happens in one place, the factory handles the creation of the appropriate checker, and your code simply deals with the standardized result.

::: important Key takeaway

Factory is great when you need one type of object, but you want to abstract away the creation logic.

:::

---

## How the Abstract Factory Pattern Works in Flutter

The Abstract Factory Pattern comes into play when you have more than two data sets for comparison, and each set includes multiple functionalities.

For example, imagine you now want to manage themes, widgets, and architecture for Android, iOS, and Linux. Managing this with just a Factory becomes messy, so Abstract Factory provides a structured way to handle multiple related objects for different platforms.

So let's see how you can handle this using the abstract factory method.

### Step 1: Define Abstract Product Interfaces

Before we dive into this implementation, it's important to understand what abstract product interfaces are. An abstract product interface is essentially a contract that defines what methods a product must implement, without specifying how they're implemented.

Think of it as a blueprint that ensures all related products share a common structure. In our case, we're defining three core functionalities that every platform must provide:

1. Theme management
2. Widget handling
3. Architecture configuration.

By creating these abstract interfaces first, we establish a consistent API that all platform-specific implementations will follow.

```dart
abstract class ThemeManager {
  Future<String> getTheme();
}

abstract class WidgetHandler {
  Future<bool> getWidget();
}

abstract class ArchitechtureHandler {
  Future<String> getArchitechture();
}
```

Here, we’re defining three base functionalities that every platform will implement: theme, widgets, and architecture.

Each interface declares a single method that returns platform-specific information.

The `ThemeManager` retrieves theme data, `WidgetHandler` determines widget compatibility, and `ArchitechtureHandler` provides architecture details.

### Step 2: Implement Platform-Specific Products

Now that we have our abstract interfaces defined, we need to create concrete implementations for each platform. This step is where we provide the actual, platform-specific behavior for each product type. Think of this as filling in the blueprint with real details.

While the abstract interfaces told us what methods we need, these concrete classes tell us how those methods behave on each specific platform. Each platform (Android, iOS, Linux) will have its own unique implementation of themes, widgets, and architecture.

#### Android:

```dart
class AndroidThemeManager extends ThemeManager {
  @override
  Future<String> getTheme() async {
    return "Android Theme";
  }
}

class AndroidWidgetHandler extends WidgetHandler {
  @override
  Future<bool> getWidget() async {
    return true;
  }
}

class AndroidArchitechtureHandler extends ArchitechtureHandler {
  @override
  Future<String> getArchitechture() async {
    return "Android Architecture";
  }
}
```

For Android, we're creating three specific product classes. The `AndroidThemeManager` returns Material Design theme data, the `AndroidWidgetHandler` returns true to indicate that Android supports home screen widgets, and the `AndroidArchitechtureHandler` provides information about Android's architecture (which could include details about ARM, x86, or other processor architectures).

#### iOS:

```dart
class IOSThemeManager extends ThemeManager {
  @override
  Future<String> getTheme() async {
    return "IOS Theme";
  }
}

class IOSWidgetHandler extends WidgetHandler {
  @override
  Future<bool> getWidget() async {
    return false;
  }
}

class IOSArchitechtureHandler extends ArchitechtureHandler {
  @override
  Future<String> getArchitechture() async {
    return "iOS Architecture";
  }
}
```

The iOS implementations follow the same structure but provide iOS-specific values. Notice that `IOSWidgetHandler` returns false, this could represent a scenario where certain widget features aren't available or behave differently on iOS compared to Android.

#### Linux:

```dart
class LinuxThemeManager extends ThemeManager {
  @override
  Future<String> getTheme() async {
    return "Linux Theme";
  }
}

class LinuxWidgetHandler extends WidgetHandler {
  @override
  Future<bool> getWidget() async {
    return true;
  }
}

class LinuxArchitechtureHandler extends ArchitechtureHandler {
  @override
  Future<String> getArchitechture() async {
    return "Linux Architecture";
  }
}
```

Similarly, Linux gets its own set of implementations, providing Linux-specific theme data and architecture information.

### Step 3: Define the Abstract Factory Interface

With our product classes ready, we now need to create the factory that will produce them.

The abstract factory interface is the master blueprint that declares which products our factory must be able to create. This interface doesn't create anything itself, it simply declares that any concrete factory must provide methods to create all three product types (theme, widget, and architecture handlers). This ensures that, regardless of which platform factory we use, we can always access all three functionalities.

```dart
abstract class AppFactory {
  ThemeManager themeManager();
  WidgetHandler widgetManager();
  ArchitechtureHandler architechtureHandler();
}
```

Here, we define a factory blueprint. Any platform specific factory will have to implement all three functionalities. This guarantees consistency: every platform will have all three capabilities available.

### Step 4: Implement Platform Specific Factories

This is where everything comes together. We're now creating the actual factories that will produce the platform-specific products we defined earlier. Each factory is responsible for creating all the related products for its platform. The key advantage here is encapsulation: the factory knows how to create all the related objects for a platform, and it ensures they're compatible with each other. For example, `AndroidFactory` creates Android-specific theme managers, widget handlers, and architecture handlers that all work together seamlessly.

```dart :collapsed-lines
class AndroidFactory extends AppFactory {
  @override
  ThemeManager themeManager() => AndroidThemeManager();

  @override
  WidgetHandler widgetManager() => AndroidWidgetHandler();

  @override
  ArchitechtureHandler architechtureHandler() => AndroidArchitechtureHandler();
}

class IOSFactory extends AppFactory {
  @override
  ThemeManager themeManager() => IOSThemeManager();

  @override
  WidgetHandler widgetManager() => IOSWidgetHandler();

  @override
  ArchitechtureHandler architechtureHandler() => IOSArchitechtureHandler();
}

class LinuxFactory extends AppFactory {
  @override
  ThemeManager themeManager() => LinuxThemeManager();

  @override
  WidgetHandler widgetManager() => LinuxWidgetHandler();

  @override
  ArchitechtureHandler architechtureHandler() => LinuxArchitechtureHandler();
}
```

Each concrete factory (AndroidFactory, IOSFactory, LinuxFactory) implements all three methods from the `AppFactory` interface. When you call `themeManager()` on `AndroidFactory`, you get an `AndroidThemeManager`. When you call it on `IOSFactory`, you get an `IOSThemeManager`. The same pattern applies to all products.

### Step 5: Client Code Using Abstract Factory

Finally, we create the client code that uses our abstract factory. This is the layer that your application will actually interact with. The beauty of this pattern is that the client code doesn't need to know anything about the specific platform implementations, it just works with the abstract factory interface.

The `AppBaseFactory` class accepts any factory that implements `AppFactory` and provides a simple method to initialize all platform settings. The `CheckDevice` class determines which factory to use based on the current platform, completely abstracting this decision away from the rest of your application.

```dart
class AppBaseFactory {
  AppBaseFactory({required this.factory});
  AppFactory factory;

  getAppSettings() {
    factory
      ..architechtureHandler()
      ..themeManager()
      ..widgetManager();
  }
}

class CheckDevice {
  static get() {
    if (Platform.isAndroid) return AndroidFactory();
    if (Platform.isIOS) return IOSFactory();
    if (Platform.isLinux) return LinuxFactory();
    throw UnsupportedError("Platform not supported");
  }
}

// Usage
AppBaseFactory(factory: CheckDevice.get()).getAppSettings();
```

Here's what's happening in this code:

The `AppBaseFactory` class acts as a wrapper around any `AppFactory` implementation. It provides a convenient `getAppSettings()` method that initializes all three components (architecture handler, theme manager, and widget manager) using Dart's cascade notation.

The `CheckDevice` class contains the platform detection logic. Its static `get()` method checks the current platform and returns the appropriate factory. This centralizes all platform detection in one place. When you call `AppBaseFactory(factory: CheckDevice.get()).getAppSettings()`, the code automatically detects your platform, creates the right factory, and initializes all platform-specific components, all without the calling code needing to know any platform-specific details.

Each platform factory produces all related products. The client only interacts with `AppBaseFactory`, remaining unaware of the internal implementation. This ensures your code is scalable, maintainable, and consistent.

---

## Real-World Application: Payment Provider Management

Another good use case for abstract factory is when you need to switch between multiple payment providers in your application and you only want to expose the necessary functionality to the client (presentation layer).

The abstract factory design pattern properly helps you manage this scenario in terms of concrete implementation, encapsulation, clean code, separation of concerns, and proper code structure and management. For example, you might support Stripe, PayPal, and Flutterwave in your application.

Each provider requires different initialization, transaction processing, and webhook handling. By using the Abstract Factory pattern, you can create a consistent interface for all payment operations while keeping provider-specific details encapsulated within their respective factory implementations.

---

## Conclusion

You should now feel more comfortable deciding when to use the Factory design pattern vs the Abstract Factory design pattern.

Understanding the factory and abstract factory patterns and their usages properly will help with object creation based on the particular use case you are trying to implement.

The Factory Pattern is ideal when you need one product and want to encapsulate creation logic while the Abstract Factory Pattern works well when you have multiple related products across platforms, need consistency, and want scalability. Using these patterns will help you write clean, maintainable, and scalable Flutter apps.

They give you a systematic approach to object creation and prevent messy, hard-to-maintain code as your app grows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How the Factory and Abstract Factory Design Patterns Work in Flutter",
  "desc": "In software development, particularly object-oriented programming and design, object creation is a common task. And how you manage this process can impact your app's flexibility, scalability, and maintainability. Creational design patterns govern how...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-the-factory-and-abstract-factory-design-patterns-work-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
