---
lang: en-US
title: "How to Get Started With Navigation in Flutter Using AutoRoute"
description: "Article(s) > How to Get Started With Navigation in Flutter Using AutoRoute"
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
      content: "Article(s) > How to Get Started With Navigation in Flutter Using AutoRoute"
    - property: og:description
      content: "How to Get Started With Navigation in Flutter Using AutoRoute"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-started-with-navigation-in-flutter-using-autoroute.html
prev: /programming/dart/articles/README.md
date: 2025-09-08
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757340174515/e1614c20-e403-44a7-8509-514c6839bc4c.png
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
  name="How to Get Started With Navigation in Flutter Using AutoRoute"
  desc="Navigation is one of the most important parts of any mobile application. Users expect to move seamlessly between screens such as home, settings, profile, and more. While Flutter provides built-in navigation using Navigator, managing routes can quickl..."
  url="https://freecodecamp.org/news/how-to-get-started-with-navigation-in-flutter-using-autoroute"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757340174515/e1614c20-e403-44a7-8509-514c6839bc4c.png"/>

Navigation is one of the most important parts of any mobile application. Users expect to move seamlessly between screens such as home, settings, profile, and more.

While Flutter provides built-in navigation using `Navigator`, managing routes can quickly become complex in large apps. That’s where routing packages like **AutoRoute** come in. AutoRoute streamlines navigation by generating strongly typed routes, reducing boilerplate, and making your codebase easier to maintain.

This article will guide you through setting up and using AutoRoute in a Flutter project. By the end, you will have a working project with multiple screens and a structured routing system.

::: note Prerequisites

Before starting, you should have:

- Flutter SDK installed and configured ([<VPIcon icon="iconfont icon-flutter"/>Flutter installation guide](https://docs.flutter.dev/get-started/install)).
- A basic understanding of Flutter widgets, stateless vs. stateful widgets, and the `Navigator` API.
- Familiarity with running commands in the terminal.
- An IDE like Android Studio, VS Code, or IntelliJ.

:::

If you already know how to build simple Flutter apps, you are ready.

---

## What We Will Build

We will create a Flutter app with four screens:

- **Control Screen**: the main screen with buttons to navigate to other screens.
- **Screen 1, Screen 2, Screen 3**: simple pages that demonstrate navigation.

Our navigation will be managed entirely by AutoRoute, ensuring a clean and scalable project structure.

---

## Step 1: Setting Up the Project

Start by creating a new Flutter project:

```sh
flutter create auto_route_example
```

Navigate into the project folder and open the <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file. Add the following dependencies:

```yaml title="pubspec.yaml"
dependencies:
  auto_route: ^7.8.4

dev_dependencies:
  auto_route_generator: 7.3.2
  build_runner:
```

Run the command below to install packages:

```sh
flutter pub get
```

---

## Step 2: Organizing the Project Structure

For scalability, keep your project organized. Create the following folder structure inside <VPIcon icon="fas fa-folder-open"/>`lib`:

```plaintext title="file structure"
/lib
  /screens
    /sub_screens
      screen1.dart
      screen2.dart
      screen3.dart
    control_screen.dart
  /route_config
    app_route.dart
main.dart
```

This structure separates screens from routing logic, making the app more maintainable.

---

## Step 3: Defining Routes with AutoRoute

Before we start annotating the actual screens, let’s first set up the route configuration. This file will act as the map of our app’s navigation: it tells AutoRoute **which paths exist** and **which screens** they should point to.

Create `lib/route_config/app_route.dart` and add the following:

```dart title="lib/route_config/app_route.dart"
import 'package:auto_route/annotations.dart';
import 'package:auto_route/auto_route.dart';
import 'app_route.gr.dart'; // generated file

@AutoRouterConfig()
class AppRouter extends $AppRouter {
  @override
  List<AutoRoute> get routes => [
        AutoRoute(path: '/', page: Controlscreen.page),
        AutoRoute(path: '/screen1', page: Screen1.page),
        AutoRoute(path: '/screen2', page: Screen2.page),
        AutoRoute(path: '/screen3', page: Screen3.page),
      ];
}
```

Breaking the code down:

1. `@AutoRouterConfig()` tells AutoRoute: “Here is the central routing configuration. Please use this to generate the navigation system.”
2. `class AppRouter extends $AppRouter`:
    - `AppRouter` is our router definition.
    - `$AppRouter` will be generated by AutoRoute once we run code generation. It contains the heavy lifting (like route classes and helpers).
3. `List<AutoRoute> get routes => [...]`
    - This is where we declare our app’s navigation map.
    - Each `AutoRoute` has a **path** (`/screen1`) and a **page** (`Screen1.page`).

::: tip Example:

- `/` → `Controlscreen` (our starting page).
- `/screen1` → `Screen1`.
- `/screen2` → `Screen2`.
- `/screen3` → `Screen3`.

:::

Right now, these pages (`Screen1.page`, and so on) don’t exist yet. We’ll create and annotate them in **Step 6**.

- `page: Screen1.page`
  - This `.page` getter will only become available after we annotate the screens with `@RoutePage`.
  - AutoRoute relies on that annotation to generate the correct page factories.

### Why do this before screens?

By defining routes early, you set a clear navigation blueprint for your app. Later, when we create the screens, we’ll simply “hook them into” this structure with `@RoutePage`. This helps keep the tutorial logical: define the map first, then build the destinations.

---

## Step 4: Generating Route Files

To generate route files, run:

```sh
flutter pub run build_runner build
```

Or, to watch for changes automatically:

```sh
flutter pub run build_runner watch
```

This creates <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.gr.dart` in the `route_config` folder. The file includes strongly typed classes for each screen, such as `Controlscreen`, `Screen1`, `Screen2`, and `Screen3`.

This means instead of relying on raw strings for navigation, you’ll use these generated classes, reducing bugs from typos and providing better IDE autocompletion.

---

## Step 5: Setting Up AutoRoute in <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

In <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`, configure the app to use AutoRoute:

```dart title="main.dart"
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'route_config/app_route.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final appRouter = AppRouter();

    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: Brightness.dark,
      ),
    );

    return MaterialApp.router(
      title: 'Flutter AutoRoute Example',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.brown),
        useMaterial3: true,
      ),
      routerConfig: appRouter.config(),
    );
  }
}
```

Key points in this code:

- `MaterialApp.router` replaces the traditional `MaterialApp` when using AutoRoute.
- `appRouter.config()` provides AutoRoute’s configuration.

---

## Step 6: Creating Screens

In Flutter, each page or section of your app is typically represented by a **screen**. Screens are just widgets (usually wrapped in a `Scaffold`) that contain the UI and logic for that page. Since we are using AutoRoute, each screen that we want to navigate to must be annotated with `@RoutePage`.

The `@RoutePage` annotation tells AutoRoute, “This widget is a route. Please include it in the generated route system.”

Without this annotation, AutoRoute will not know about the screen, and you won’t be able to navigate to it using the router.

### <VPIcon icon="fa-brands fa-dart-lang"/>`screen1.dart`

```dart
import 'package:auto_route/annotations.dart';
import 'package:flutter/material.dart';

@RoutePage(name: 'Screen1')
class Screen1 extends StatelessWidget {
  const Screen1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Screen 1')),
      body: const Center(child: Text('Welcome to Screen 1')),
    );
  }
}
```

Breaking the code here down:

1. `@RoutePage(name: 'Screen1')`
    - This annotation registers the widget as a routable page.
    - The `name` parameter gives AutoRoute a clear identifier for the screen, which will also be reflected in the generated <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.gr.dart` file.
2. `class Screen1 extends StatelessWidget`
    - Defines the screen as a stateless widget because it has no dynamic state in this example.
    - For more complex pages (like forms or dashboards), you could use `StatefulWidget`.
3. `Scaffold`
    - Provides the basic layout structure for Material Design apps.
    - Contains the `AppBar` (top bar with the title) and the `body` (main content area).
4. `AppBar(title: const Text('Screen 1'))`
    - Displays a top app bar with the title "Screen 1".
5. `body: Center(child: Text('Welcome to Screen 1'))`
    - Centers the text in the middle of the screen.
    - In real applications, this is where you’d add your widgets (lists, forms, dashboards, and so on).

### Repeating for Other Screens

Follow the exact same structure for **Screen2** and **Screen3**:

- Create <VPIcon icon="fa-brands fa-dart-lang"/>`screen2.dart` and <VPIcon icon="fa-brands fa-dart-lnag"/>`screen3.dart` inside `sub_screens`.
- Annotate each class with `@RoutePage` and give it a unique name (`Screen2`, `Screen3`).
- Update the UI inside the `body` to reflect which screen it is.

::: tip For example:

```dart
@RoutePage(name: 'Screen2')
class Screen2 extends StatelessWidget {
  const Screen2({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Screen 2')),
      body: const Center(child: Text('Welcome to Screen 2')),
    );
  }
}
```

:::

### Why is this important?

AutoRoute scans your project and looks for `@RoutePage` annotations. It then generates strongly typed navigation classes so you can write `context.router.push(const Screen2())` instead of manually typing route strings like `'/screen2'`. This eliminates human error (like typos in route strings) and makes navigation easier to maintain as your app grows.

---

## Step 7: Control Screen

The **ControlScreen** acts as the entry point of our app. It’s the first screen that loads when the app starts (because in <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.dart`, we set `/` > `Controlscreen`).

This screen doesn’t show any complex content, instead, it provides buttons to navigate to other screens. Think of it like a **menu** or **dashboard** that directs you to the other routes.

```dart title="app_route.dart"
import 'package:auto_route/annotations.dart';
import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';

enum Screen { screen1, screen2, screen3 }

@RoutePage(name: 'Controlscreen')
class ControlScreen extends StatelessWidget {
  const ControlScreen({super.key});

  void navigateToScreen(BuildContext context, Screen screen) {
    switch (screen) {
      case Screen.screen1:
        context.router.pushNamed('/screen1');
        break;
      case Screen.screen2:
        context.router.pushNamed('/screen2');
        break;
      case Screen.screen3:
        context.router.pushNamed('/screen3');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Control Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () => navigateToScreen(context, Screen.screen1),
              child: const Text('Navigate to Screen 1'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () => navigateToScreen(context, Screen.screen2),
              child: const Text('Navigate to Screen 2'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () => navigateToScreen(context, Screen.screen3),
              child: const Text('Navigate to Screen 3'),
            ),
          ],
        ),
      ),
    );
  }
}
```

::: info Step-by-step breakdown of the code:

**1. `@RoutePage(name: 'Controlscreen')`**

- Marks `ControlScreen` as a routable page.
- AutoRoute will generate a `Controlscreen.page` entry for use in <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.dart`.

**2. `enum Screen { screen1, screen2, screen3 }`**

- We define an enum for our target screens.
- This makes the navigation method cleaner and less error-prone than typing raw strings in multiple places.

**3. `navigateToScreen(BuildContext context, Screen screen)`**

- A helper method that checks **which screen we want** (based on the enum) and then calls `context.router.pushNamed('/screenX')`.
- `context.router` comes from AutoRoute, it gives you access to the app’s navigation stack.
- `pushNamed('/screen1')` matches the path we defined earlier in <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.dart`:

```dart
AutoRoute(path: '/screen1', page: Screen1.page),
```

- That’s how the button → path → route connection works.

**4. UI Layout (`Scaffold`)**

- `AppBar(title: Text('Control Screen'))` adds a title bar at the top.
- `Column` with 3 buttons: each button calls `navigateToScreen()` with a different enum value.

:::

::: tip Example:

- Button 1 `navigateToScreen(context, Screen.screen1)`: navigates to `/screen1`.
- Button 2: navigates to `/screen2`.
- Button 3: navigates to `/screen3`.

:::

### How It Works Together

1. **App start**: The router loads `/`, which points to `Controlscreen`.
2. **User taps a button**: `navigateToScreen()` runs and calls `context.router.pushNamed('/screenX')`.
3. **AutoRoute matches path**: It looks up `/screenX` in the route list we defined in <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.dart`.
4. **Generated code takes over**: <VPIcon icon="fa-brands fa-dart-lang"/>`app_route.gr.dart` (generated by AutoRoute) creates and pushes the correct screen widget onto the stack.

The result: navigation works without manually writing `Navigator.push` boilerplate. AutoRoute handles everything for you.

::: info Screenshots

![control screen - main menu](https://cdn.hashnode.com/res/hashnode/image/upload/v1704182865496/ce5a0a5c-f5d8-4491-9f41-2d443631e3bd.png)

![screen one](https://cdn.hashnode.com/res/hashnode/image/upload/v1704182887768/cc4156c9-afe3-4fc3-b4a3-75db71968c4a.png)

![screen two](https://cdn.hashnode.com/res/hashnode/image/upload/v1704182902830/5f131796-cf76-41ed-940a-4486de90a966.png)

![screen three](https://cdn.hashnode.com/res/hashnode/image/upload/v1704182916234/950633e3-1bf7-4a91-9b47-e61a1df00a0e.png)

:::

---

## Best Practices When Using AutoRoute

1. Always organize routes in a dedicated folder (`route_config`) to separate concerns.
2. Use strongly typed routes (generated classes) instead of raw strings. For example, use `Screen1()` instead of `'/screen1'`.
3. Leverage nested routes for complex apps (e.g., tabs, authentication flows).
4. Use guards in AutoRoute to protect routes that require authentication.
5. Keep screens independent, avoid placing navigation logic inside screen widgets unless necessary.

---

## Conclusion

AutoRoute simplifies navigation in Flutter applications by generating boilerplate code, ensuring type safety, and offering advanced features like nested navigation and guards. With a clean project structure and best practices, you can scale your Flutter app with confidence.

::: info

For deeper learning and advanced features, refer to the official documentation:  

<SiteInfo
  name="auto_route | Flutter package"
  desc="AutoRoute is a declarative routing solution, where everything needed for navigation is automatically generated for you."
  url="https://pub.dev/packages/auto_route/"
  logo="https://pub.dev/static/hash-e4t06sub/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-e4t06sub/img/pub-dev-icon-cover-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Started With Navigation in Flutter Using AutoRoute",
  "desc": "Navigation is one of the most important parts of any mobile application. Users expect to move seamlessly between screens such as home, settings, profile, and more. While Flutter provides built-in navigation using Navigator, managing routes can quickl...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-get-started-with-navigation-in-flutter-using-autoroute.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
