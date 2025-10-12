---
lang: en-US
title: "How to Use Freezed in Flutter"
description: "Article(s) > How to Use Freezed in Flutter"
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
      content: "Article(s) > How to Use Freezed in Flutter"
    - property: og:description
      content: "How to Use Freezed in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-freezed-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-10-06
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759758218094/78645767-b4be-4210-9adb-a137ea605c9c.png
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
  name="How to Use Freezed in Flutter"
  desc="Flutter is a UI toolkit developed by Google. It’s gained immense popularity for its ability to create beautiful and natively compiled applications for mobile, web, and desktop from a single codebase. While Dart, the language behind Flutter, is powerf..."
  url="https://freecodecamp.org/news/how-to-use-freezed-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759758218094/78645767-b4be-4210-9adb-a137ea605c9c.png"/>

Flutter is a UI toolkit developed by Google. It’s gained immense popularity for its ability to create beautiful and natively compiled applications for mobile, web, and desktop from a single codebase.

While Dart, the language behind Flutter, is powerful, writing data models often involves repetitive and error-prone tasks. A typical model may require:

- Defining a constructor and properties
- Overriding `toString`, `==` operator, and `hashCode`
- Implementing a `copyWith` method
- Writing serialization (`toJson`) and deserialization (`fromJson`) methods

Doing all this by hand can quickly bloat your code and reduce readability.

This is where Freezed comes in. Freezed is a Dart code generator that creates boilerplate for immutable data classes, unions, pattern matching, cloning, and JSON serialization. With Freezed, you can write concise and safe models while the package handles the repetitive parts.

In this tutorial, you will learn how to use Freezed to create immutable data classes, generate JSON serialization, and implement powerful unions for handling multiple states in a type-safe way. By the end, you’ll know how to reduce boilerplate and make your Flutter code cleaner, safer, and easier to maintain.

::: note Prerequisites

Before starting, you should be comfortable with:

1. **Flutter basics**: Be able to create a new Flutter project and run it on an emulator or device.
2. **Dart language fundamentals**: Understand how classes, constructors, and methods work.
3. **Command-line tools**: Be able to run commands like `flutter pub get` or `flutter pub run`.
4. **JSON concepts**: Know what JSON is and how it is commonly used for API data exchange.

:::

If you are already comfortable with these topics, you are ready to dive into Freezed.

---

## Why Freezed?

When building Flutter applications, two challenges often arise when working with data models: **immutability** and **serialization**. Freezed helps solve both in a clear and automated way.

### 1. Immutability

In Dart, objects are mutable by default. This means that once you create an object, its fields can be changed anywhere in your code. While convenient, this can lead to unintended side effects, like accidentally modifying a user object in one part of your app and breaking logic elsewhere.

Ensuring immutability manually requires a lot of boilerplate: you have to declare all fields as `final`, implement `copyWith` methods to create modified copies, and correctly override `==` and `hashCode` to maintain object equality. This can be repetitive and error-prone.

#### How Freezed helps:

Freezed automatically generates immutable classes. All fields are `final`, and a `copyWith` method is provided so you can safely create modified copies without mutating the original object. Also, Freezed handles `==` and `hashCode` for you, which make sure that your objects behave correctly when compared or used in collections. This drastically reduces boilerplate while enforcing immutability.

### 2. Serialization

When interacting with APIs, converting Dart objects to and from JSON is a common task. Without automation, you have to write `toJson` and `fromJson` methods for every class, carefully mapping each field. This is repetitive and easy to get wrong, especially when your models change over time.

#### How Freezed helps:

Freezed integrates with the `json_serializable` package to automatically generate serialization and deserialization logic. You just annotate your class and run the code generator, and then Freezed creates fully working `toJson` and `fromJson` methods for you. This not only saves time but also reduces the chance of errors and keeps your code clean and maintainable.

---

## Without Freezed: A Manual Example

Here’s what a basic `User` class looks like without Freezed:

```dart :collapsed-lines
class User {
  final String name;
  final int age;
  final String email;

  const User({
    required this.name,
    required this.age,
    required this.email,
  });

  User copyWith({
    String? name,
    int? age,
    String? email,
  }) {
    return User(
      name: name ?? this.name,
      age: age ?? this.age,
      email: email ?? this.email,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'age': age,
      'email': email,
    };
  }

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] as String,
      age: json['age'] as int,
      email: json['email'] as String,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is User &&
          runtimeType == other.runtimeType &&
          name == other.name &&
          age == other.age &&
          email == other.email;

  @override
  int get hashCode => name.hashCode ^ age.hashCode ^ email.hashCode;

  @override
  String toString() {
    return 'User{name: $name, age: $age, email: $email}';
  }
}
```

This is verbose, and it’s easy to miss details like updating `hashCode` when adding new fields.

---

## With Freezed: A Cleaner Alternative

Now that you understand the challenges Freezed solves, let's see how it makes working with data models simpler and cleaner. In this section, you’ll install the necessary packages, set up a Freezed class, and generate boilerplate code. Once that setup is complete, we’ll dive into examples showing how to use the Freezed class, including copying objects and JSON serialization.

First, install Freezed and its related packages. Add this to your <FontIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file:

```yaml title="pubspec.yaml"
dependencies:
  freezed_annotation: ^2.4.1
  json_annotation: ^4.8.1

dev_dependencies:
  flutter_lints: ^2.0.0
  build_runner: ^2.0.0
  freezed: ^2.4.7
  json_serializable: ^6.7.1
```

Then run:

```sh
flutter pub get
```

For pure Dart projects, use:

```sh
dart pub get
```

### Defining a Freezed Class

Create a file named <FontIcon icon="fa-brands fa-dart-lang"/>`user.dart` and add the following:

```dart title="user.dart"
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';

@freezed
class User with _$User {
  factory User({required String name, required int age}) = _User;
}
```

Here’s what’s going on in this code:

- `import 'package:freezed_annotation/freezed_annotation.dart';`: Imports annotations required by Freezed.
- `part 'user.freezed.dart';`: Indicates that Freezed will generate code in this file.
- `@freezed`: Tells Freezed to process the following class.
- `class User with _$User`: Declares the `User` class. The `with _$User` part connects the class to generated code.
- `factory User({required String name, required int age}) = _User;`: Defines a factory constructor. Freezed generates the implementation class (`_User`) behind the scenes.

### Running Code Generation

Run the following command to generate code:

```sh
flutter pub run build_runner watch --delete-conflicting-outputs
```

For Dart projects:

```sh
dart pub run build_runner watch --delete-conflicting-outputs
```

This creates the `user.freezed.dart` file, containing boilerplate like `copyWith`, `==`, `hashCode`, and `toString`.

### Using the Freezed Class

Let’s see Freezed in action:

```dart
void main() {
  final user = User(name: 'John Doe', age: 25);
  final user2 = user.copyWith(name: 'Jane Doe');
  final user3 = user2;

  print(user);
  print(user2);
  print(user2 == user3);
  print('Name: ${user.name}');
  print('Age: ${user.age}');
}
```

Here’s what’s happening:

- `final user = User(name: 'John Doe', age: 25);`: Creates a new immutable `User`.
- `final user2 = user.copyWith(name: 'Jane Doe');`: Creates a copy of `user` with a new name but keeps the same age.
- `final user3 = user2;`: Points `user3` to the same object as `user2`.
- `print(user);`: Displays a readable string, thanks to the generated `toString`.
- `print(user2 == user3);`: Compares objects using generated `==`.

### Adding JSON Serialization

Update <FontIcon icon="fa-brands fa-dart-lang"/>`user.dart` to support JSON:

```dart title="user.dart"
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
class User with _$User {
  factory User({required String name, required int age}) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}
```

In the new parts of the code:

- `part 'user.g.dart';`: Adds another generated file for JSON support.
- `factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);`: Enables deserialization from JSON.

Next, run the generator again:

```sh
flutter pub run build_runner build --delete-conflicting-outputs
```

### Using JSON Serialization

Example usage:

```dart
void main() {
  final userJson = {'name': 'Alice', 'age': 30};
  final user = User.fromJson(userJson);

  print('Name: ${user.name}');
  print('Age: ${user.age}');

  final userBackToJson = user.toJson();
  print('Back to JSON: $userBackToJson');
}
```

In this code:

- `final user = User.fromJson(userJson);`: Converts a JSON map into a `User` instance.
- `user.toJson();`: Converts a `User` object back into JSON.

---

## Advanced Usage: Freezed Unions

So far, we have used Freezed for immutable data models. Another powerful feature of Freezed is **unions** (also known as sealed classes).

Unions allow you to represent multiple possible states of an object in a type-safe way. This is especially useful in Flutter when working with asynchronous tasks such as API calls, where you often have states like `loading`, `success`, and `error`.

### Defining a Union

Create a new file called <FontIcon icon="fa-brands fa-dart-lang"/>`result.dart`:

```dart title="result.dart"
import 'package:freezed_annotation/freezed_annotation.dart';

part 'result.freezed.dart';

@freezed
class Result<T> with _$Result<T> {
  const factory Result.loading() = Loading<T>;
  const factory Result.success(T data) = Success<T>;
  const factory Result.error(String message) = Error<T>;
}
```

Line-by-line code explanation:

- `import 'package:freezed_annotation/freezed_annotation.dart';`: Imports the annotation library needed for Freezed.
- `part 'result.freezed.dart';`: Tells Freezed to generate boilerplate into this file.
- `@freezed`: Instructs Freezed to generate code for the annotated class.
- `class Result<T> with _$Result<T>`: Declares a generic class `Result` that can hold data of type `T`.
- `const factory Result.loading() = Loading<T>;`: Defines the `loading` state. `Loading<T>` is the generated class.
- `const factory Result.success(T data) = Success<T>;`: Defines the `success` state with associated data.
- `const factory Result.error(String message) = Error<T>;`: Defines the `error` state with a message.

After saving, generate the code:

```sh
flutter pub run build_runner build --delete-conflicting-outputs
```

### Using the Union

Let’s simulate an API call and return results using our `Result` union:

```dart
Future<Result<String>> fetchUserData() async {
  await Future.delayed(const Duration(seconds: 2)); // simulate network delay

  final success = true; // change to false to simulate error

  if (success) {
    return const Result.success("User data fetched successfully");
  } else {
    return const Result.error("Failed to fetch user data");
  }
}
```

Here’s what’s going on:

- `Future<Result<String>> fetchUserData()`: Returns a `Result` object that contains `String` data.
- `await Future.delayed(...)`: Simulates a 2-second delay, mimicking a real network call.
- `if (success) { ... } else { ... }`: Randomly returns either a `success` or `error` result.

### Pattern Matching with Freezed

One of the best parts of Freezed is **pattern matching**. You can handle all states without writing long `if` checks.

```dart
void main() async {
  final result = await fetchUserData();

  result.when(
    loading: () => print("Loading..."),
    success: (data) => print("Success: $data"),
    error: (message) => print("Error: $message"),
  );
}
```

Here’s what’s going on in this code:

- `result.when(...)`: Calls the appropriate callback depending on the state.
  - If it’s `loading`, it executes the `loading` function.
  - If it’s `success`, it executes the `success` function with the data.
  - If it’s `error`, it executes the `error` function with the message.

This ensures all states are handled. If you forget one, the compiler will show an error.

### MaybeWhen: Handling Partial States

`maybeWhen` is a safer and more flexible version of `when`. While `when` requires you to handle **all possible states**, `maybeWhen` lets you handle only the ones you care about and provide a fallback with `orElse`.

This makes it useful when you’re not interested in every state, but just a subset.

Sometimes you only care about certain states. Here’s how you can use `maybeWhen`:

```dart
result.maybeWhen(
  success: (data) => print("Data received: $data"),
  orElse: () => print("No data"),
);
```

Here’s what’s happening:

- `success: (data)` runs only if the current state is `success`.
- `orElse` acts as a fallback for all other states (`loading`, `error`, etc.).

So in this snippet, the code is showing how you can react only to the success state while safely ignoring everything else.

### Map: Working with State Objects Directly

Another approach is `map`, which provides the full class instance:

```dart
result.map(
  loading: (value) => print("Currently loading"),
  success: (value) => print("Got success: ${value.data}"),
  error: (value) => print("Got error: ${value.message}"),
);
```

Here, each branch receives the generated class (`Loading`, `Success`, `Error`), giving you access to all fields.

### Why Use Unions?

Unions shine when building Flutter apps with asynchronous logic. For example:

- **Network requests**: `loading`, `success`, `error`
- **Form validation**: `valid`, `invalid`, `submitting`
- **Authentication**: `authenticated`, `unauthenticated`, `loading`

Instead of writing `bool isLoading` and `String? error` flags scattered across your app, unions give you a structured, type-safe way to model state.

---

## Conclusion

Freezed is an essential tool for Flutter developers who want to reduce boilerplate while maintaining safe, immutable, and easily serializable models.

By handling repetitive code such as `copyWith`, equality checks, and JSON serialization, Freezed lets you focus on building applications instead of writing boilerplate.

Whether you are a beginner or an experienced Flutter developer, Freezed can improve the readability, safety, and maintainability of your codebase.

For advanced features and best practices, visit the official Freezed documentation on [<FontIcon icon="fas fa-globe"/>pub.dev](https://pub.dev/packages/freezed).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Freezed in Flutter",
  "desc": "Flutter is a UI toolkit developed by Google. It’s gained immense popularity for its ability to create beautiful and natively compiled applications for mobile, web, and desktop from a single codebase. While Dart, the language behind Flutter, is powerf...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-freezed-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
