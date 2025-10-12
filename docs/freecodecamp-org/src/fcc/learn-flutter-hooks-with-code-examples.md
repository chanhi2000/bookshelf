---
lang: en-US
title: "Learn Flutter Hooks – Common Hooks Explained with Code Examples"
description: "Article(s) > Learn Flutter Hooks – Common Hooks Explained with Code Examples"
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
      content: "Article(s) > Learn Flutter Hooks – Common Hooks Explained with Code Examples"
    - property: og:description
      content: "Learn Flutter Hooks – Common Hooks Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-flutter-hooks-with-code-examples.html
prev: /programming/dart/articles/README.md
date: 2025-09-26
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1758892716695/6af49b6f-d088-405a-9c48-57d5db3b0a98.png
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
  name="Learn Flutter Hooks – Common Hooks Explained with Code Examples"
  desc="Flutter hooks are powerful functions that streamline state management, side effects handling, and code organization in Flutter applications. Inspired by React hooks, they provide a more concise and modular approach compared to traditional StatefulWid..."
  url="https://freecodecamp.org/news/learn-flutter-hooks-with-code-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1758892716695/6af49b6f-d088-405a-9c48-57d5db3b0a98.png"/>

Flutter hooks are powerful functions that streamline state management, side effects handling, and code organization in Flutter applications. Inspired by React hooks, they provide a more concise and modular approach compared to traditional `StatefulWidget` and `setState` patterns.

By the end of this guide, you’ll understand the core hooks in Flutter, how to use them effectively, how to create your own custom hooks, and best practices for using them in real-world projects.

::: note Prerequisites

Before diving into Flutter hooks, make sure you have the following:

- **Flutter SDK**: Installed and configured (Flutter 3.x or higher recommended). Verify with:

```sh
flutter --version
```

- **Dart SDK**: Comes with Flutter, ensure it’s up to date.
- **IDE**: Visual Studio Code, Android Studio, or IntelliJ with Flutter extensions.
- **Basic Flutter knowledge**: Familiarity with widgets, `StatelessWidget`, `StatefulWidget`, and state management basics.
- **Package dependency**: The `flutter_hooks` package installed by adding the following to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubspec.yaml"
dependencies:
  flutter_hooks: ^0.21.3+1
```

Then run:

```sh
flutter pub get
```

:::

---

## Why Flutter Hooks?

Here are some of the benefits of using Flutter hooks:

### 1. Improved Readability and Maintainability

Hooks reduce boilerplate by embedding state and side effects logic directly in the widget’s build method. This makes the code cleaner and easier to understand.

### 2. Reusability

Hooks can be abstracted into custom hooks. For example, you could extract complex logic (like data fetching) into a reusable function.

### 3. Granular State Management

Instead of managing a single `State` object for an entire widget, hooks let you manage small, independent pieces of state. This is especially useful for complex UIs.

### 4. Simplified Side Effects

Hooks such as `useEffect` provide an elegant way to handle lifecycle-related tasks like data fetching, listeners, or subscriptions.

---

## Common Flutter Hooks

Let’s go through the most common hooks, with explanations line by line.

### How to Use the `useState` Hook in Flutter

The simplest and most used hook. It allows you to declare and manage state inside a `HookWidget`.

```dart
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CounterButton extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final counter = useState<int>(0); // Step 1: create state with initial value 0

    return ElevatedButton(
      onPressed: () => counter.value++, // Step 2: update state using counter.value
      child: Text('Count: ${counter.value}'), // Step 3: read the state
    );
  }
}
```

::: info Explanation

- `useState<int>(0)` initializes state with a value of `0`.
- `counter.value` reads the state.
- Updating `counter.value` triggers a rebuild, just like `setState`.

:::

### How to Use the `useAnimationController` Hook in Flutter

Handles animations while managing the controller’s lifecycle automatically.

```dart
class AnimatedBox extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final controller = useAnimationController(
      duration: const Duration(seconds: 1), // Step 1: define animation duration
    );

    return FadeTransition(
      opacity: controller, // Step 2: bind controller to animation
      child: Container(width: 100, height: 100, color: Colors.blue),
    );
  }
}
```

::: info Explanation

- The hook creates an `AnimationController` that lasts 1 second.
- The controller is automatically disposed of when the widget is removed.
- You can trigger animations with `controller.forward()` or `controller.reverse()`.

:::

### How to Use the `useEffect` Hook in Flutter

Handles side effects such as fetching data or setting up listeners.

```dart
class DataWidget extends HookWidget {
  @override
  Widget build(BuildContext context) {
    useEffect(() {
      fetchData(); // Step 1: perform side effect
      return () => cancelSubscription(); // Step 2: optional cleanup
    }, []); // Step 3: dependency list

    return Text('Data is loading...');
  }
}
```

::: info Explanation

- The callback runs when the widget builds.
- The cleanup function runs when the widget is disposed or dependencies change.
- The empty dependency list `[]` means it only runs once.

:::

### How to Use the `useMemoized` Hook in Flutter

Caches expensive computations and reuses results unless dependencies change.

```dart
final calculatedValue = useMemoized(() => calculateExpensiveValue(), []);
```

::: info Explanation

- `calculateExpensiveValue()` runs once and caches the result.
- With dependencies provided, the function reruns only when they change.

:::

### How to Use the `useRef` Hook in Flutter

Keeps a mutable reference across rebuilds.

```dart
final textController = useRef(TextEditingController());

TextFormField(
  controller: textController.value,
  decoration: InputDecoration(labelText: 'Username'),
);
```

::: info Explanation

- `useRef` stores an object without triggering rebuilds.
- Useful for controllers, focus nodes, or mutable values that shouldn’t reset.

:::

### How to Use the `useCallback` Hook in Flutter

Memoizes a callback to prevent unnecessary widget rebuilds.

```dart
final onPressed = useCallback(() => print('Pressed'), []);
```

::: info Explanation

- Without `useCallback`, functions may be recreated on each rebuild.
- Memoized callbacks improve performance when passed to widgets like `ListView`.

:::

### How to Use the `useContext` Hook in Flutter

Provides direct access to `BuildContext` values like themes or providers.

```dart
final theme = useContext();
```

### How to Use the `useTextEditingController` Hook in Flutter

A shorthand for creating text controllers.

```dart
final usernameController = useTextEditingController();

TextFormField(
  controller: usernameController,
  decoration: InputDecoration(labelText: 'Username'),
);
```

### Explanation

#### 1. What is `useTextEditingController()`?

```dart
final usernameController = useTextEditingController();
```

- Normally in Flutter, if you want to manage text input, you create a `TextEditingController`.
- With a normal `StatefulWidget`, you’d do something like:

```dart
late TextEditingController usernameController;

@override
void initState() {
  super.initState();
  usernameController = TextEditingController();
}

@override
void dispose() {
  usernameController.dispose();
  super.dispose();
}
```

- But with **Flutter Hooks**, you can replace all that boilerplate with:

```dart
final usernameController = useTextEditingController();
```

- This hook automatically:
  - **Creates** the controller.
  - **Keeps it alive** for as long as the widget exists.
  - **Disposes** of it when the widget is destroyed. So you don’t need to manage lifecycle manually anymore.

#### 2. Using the controller in a `TextFormField`

```dart
TextFormField(
  controller: usernameController,
  decoration: InputDecoration(labelText: 'Username'),
);
```

- This `TextFormField` is linked to the `usernameController`.
- Whatever the user types in the input field will be stored in `usernameController.text`.
- You can read or modify it at any time:

```dart
print(usernameController.text);  // get typed text
usernameController.text = "Anthony"; // set default value
```

#### 3. How it works together

- `useTextEditingController()` provides a ready-to-use `TextEditingController` without the hassle of init/dispose.
- The `TextFormField` uses this controller to manage user input.
- This is the **hooks way** of handling text fields.

::: info Summary

- `useTextEditingController()` → Hook to create & dispose a `TextEditingController` automatically.
- `TextFormField(controller: ...)` → Uses that controller to manage and access the text typed in the field.
- Cleaner and safer than manually handling init/dispose in a `StatefulWidget`.

:::

---

## How to Create a Custom Hook in Flutter

You can encapsulate logic in reusable hooks.

```dart
Future<String> useFetchData() {
  final data = useState<String>('Loading...');

  useEffect(() {
    Future.microtask(() async {
      data.value = await fetchDataFromApi();
    });
    return null;
  }, []);

  return data.value;
}
```

### Explanation

#### 1. Function signature

```dart
Future<String> useFetchData()
```

At first glance, it looks like this function should return a `Future<String>`.  
But in reality, the function does not return a `Future`, it returns `data.value`, which is a `String`.

So the correct signature should really be:

```dart
String useFetchData()
```

Because what you’re returning is the current state of the data, not a `Future`.

#### 2. State setup

```dart
final data = useState<String>('Loading...');
```

- This creates a state variable `data` with an initial value of `"Loading..."`.
- `data.value` holds the actual string value.
- Updating `data.value` will cause the widget to rebuild.

#### 3. Effect hook

```dart
useEffect(() {
  Future.microtask(() async {
    data.value = await fetchDataFromApi();
  });
  return null;
}, []);
```

- `useEffect` runs once (because the dependency list `[]` is empty).
- Inside it, a `Future.microtask` schedules an async task to fetch data.
- Once the API call finishes, `data.value` is updated with the response from `fetchDataFromApi()`.
- Updating `data.value` triggers a rebuild, so the UI will now show the new data instead of `"Loading..."`.

#### 4. Return value

```dart
return data.value;
```

- This returns the current state value (`'Loading...'` initially, later replaced by the fetched data).
- On first build, you’ll get `"Loading..."`.
- After the API call finishes, a rebuild happens and now `useFetchData()` will return the fetched string.

#### 5. How it works in practice

Imagine this widget code:

```dart
class MyWidget extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final result = useFetchData();

    return Text(result); 
  }
}
```

- **Step 1**: UI shows `"Loading..."`.  
- **Step 2**: API is called in the background.  
- **Step 3**: When the API response arrives, `data.value` updates.  
- **Step 4**: Widget rebuilds and now `Text(result)` displays the fetched data.

::: info Summary

- `useState` holds the data (`Loading...` → fetched result).
- `useEffect` runs once to trigger the async fetch.
- When the fetch finishes, it updates state → widget rebuilds → UI shows new value.
- The function should return a `String`, not `Future<String>`.

:::

---

## Advanced Hooks

- `useListenable`: Works with `ValueNotifier` or `ChangeNotifier`.
- `useDebounced`: Debounces input, useful for search fields.
- `usePreviousState` (from community libraries): Keeps track of the previous value.

---

## Demonstration: Counter Example with Hooks

```dart
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class Counter extends HookWidget {
  @override
  Widget build(BuildContext context) {
    final count = useState<int>(0); // state variable initialized to 0

    useEffect(() {
      print('Count updated: ${count.value}'); // log whenever count changes
      return null; // no cleanup needed
    }, [count.value]); // dependency: re-run when count changes

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('You clicked ${count.value} times', style: TextStyle(fontSize: 24)),
        ElevatedButton(
          onPressed: () => count.value++, // increment state
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

### Explanation

This code is using the `flutter_hooks` package to manage state and lifecycle in a functional style instead of the usual `StatefulWidget` + `setState`. Let’s break it down step by step:

#### 1. Class definition

```dart
class Counter extends HookWidget {
  @override
  Widget build(BuildContext context) {
    ...
  }
}
```

- `Counter` extends `HookWidget` instead of `StatelessWidget` or `StatefulWidget`.
- `HookWidget` allows you to use hooks (like `useState`, `useEffect`) directly inside the `build` method to manage state and side effects.

#### 2. State with** `useState`

```dart
final count = useState<int>(0);
```

- `useState` is a hook that creates a piece of state.
- Here, it initializes `count` with `0`.
- `count` is not just an `int`, but a `ValueNotifier<int>` (meaning you can read `count.value` and update it by assigning to `count.value`).

So initially:  

```
count.value = 0
```

#### 3. Effect with `useEffect`

```dart
useEffect(() {
  print('Count updated: ${count.value}');
  return null;
}, [count.value]);
```

- `useEffect` is used to perform side effects whenever dependencies change.
- In this case, it runs whenever `count.value` changes.
- It prints the updated value to the console each time the counter changes.
- The second argument `[count.value]` is the dependency list (like React Hooks). If `count.value` changes, this effect runs again.

#### 4. UI

```dart
return Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: [
    Text('You clicked ${count.value} times', style: TextStyle(fontSize: 24)),
    ElevatedButton(
      onPressed: () => count.value++, // increment state
      child: Text('Increment'),
    ),
  ],
);
```

- A `Column` displays two widgets:
    1. A `Text` widget showing the number of times the button has been clicked.
    2. An `ElevatedButton` that increments the counter when pressed (`count.value++`).

Because `count` is a `ValueNotifier`, updating `count.value` automatically triggers a rebuild of the widget.

#### 5. How it works in practice

1. The app shows: "You clicked 0 times" and a button "Increment".
2. When you tap the button:
    - `count.value` increases by 1.        
    - The widget rebuilds, showing the updated count.
    - `useEffect` runs, printing `Count updated: X` to the console.

::: info Summary

This code is a counter app built using Flutter Hooks.

- `useState` manages the counter state.
- `useEffect` listens for changes in the counter and runs a side effect (printing to console).
- The UI displays the count and a button to increment it.

:::

::: tip Best Practices

- **Use dependency lists correctly** with `useEffect` and `useMemoized`.
- **Don’t over-engineer**: Sometimes `StatefulWidget` is simpler.
- **Test thoroughly**, especially when side effects are involved.
- **Extract reusable logic** into custom hooks to keep widgets focused.

:::

---

## Hooks vs Stateful Widgets

### What are Stateful Widgets?

A StatefulWidget is a widget that can change over time because it holds mutable state.

- It’s made up of two classes:
    1. `StatefulWidget` → the immutable configuration.
    2. `State<T>` → the mutable state and logic.

### How they work

- When something in the state changes, you call `setState()`.
- This tells Flutter to rebuild the widget tree with the updated state.

::: tip Example

```dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('You clicked $count times'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: Text('Increment'),
        ),
      ],
    );
  }
}
```

**Key points**

- Good for simple UI state (like counters, toggles, form fields).
- Flutter manages the widget’s lifecycle (init, rebuild, dispose).
- You handle initialization in `initState` and cleanup in `dispose`.

:::

::: info In short

Stateful widgets are the *classic way* to manage state in Flutter. They’re straightforward for beginners and great for simple use cases. For more complex or reusable state logic, hooks (or state management libraries like BLoC, Riverpod) can be cleaner and more scalable.

**Summary:**

- **Hooks**: Cleaner, modular, reusable, great for advanced state handling.
- **Stateful Widgets**: Easier for beginners and fine for simple state.

:::

::: info Additional Resources

<SiteInfo
  name="flutter_hooks | Flutter package"
  desc="A flutter implementation of React hooks. It adds a new kind of widget with enhanced code reuse."
  url="https://pub.dev/packages/flutter_hooks/"
  logo="https://pub.dev/static/hash-056rsjec/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-056rsjec/img/pub-dev-icon-cover-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Flutter Hooks – Common Hooks Explained with Code Examples",
  "desc": "Flutter hooks are powerful functions that streamline state management, side effects handling, and code organization in Flutter applications. Inspired by React hooks, they provide a more concise and modular approach compared to traditional StatefulWid...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/learn-flutter-hooks-with-code-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
