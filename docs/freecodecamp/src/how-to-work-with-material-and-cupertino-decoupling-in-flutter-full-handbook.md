---
lang: en-US
title: "How to Work with Material and Cupertino Decoupling in Flutter [Full Handbook]"
description: "Article(s) > How to Work with Material and Cupertino Decoupling in Flutter [Full Handbook]"
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
      content: "Article(s) > How to Work with Material and Cupertino Decoupling in Flutter [Full Handbook]"
    - property: og:description
      content: "How to Work with Material and Cupertino Decoupling in Flutter [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-material-and-cupertino-decoupling-in-flutter-full-handbook.html
prev: /programming/dart/articles/README.md
date: 2026-08-19
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/341d236f-85ed-43be-871d-bf4b3647fa22.png
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
  name="How to Work with Material and Cupertino Decoupling in Flutter [Full Handbook]"
  desc="Earlier this year, I published Decoupling Material and Cupertino in Flutter, which covered what was then a preview feature: Flutter's plan to separate the Material and Cupertino design libraries from "
  url="https://freecodecamp.org/news/how-to-work-with-material-and-cupertino-decoupling-in-flutter-full-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/341d236f-85ed-43be-871d-bf4b3647fa22.png"/>

Earlier this year, I published [**Decoupling Material and Cupertino in Flutter**](/freecodecamp.org/decoupling-material-and-cupertino-in-flutter.md), which covered what was then a preview feature: Flutter's plan to separate the Material and Cupertino design libraries from the core SDK into standalone packages on pub.dev.

At the time, the feature was in preview, the migration tooling was incomplete, and the ecosystem had not caught up. It was a directional piece, explaining where Flutter was heading and why.

Flutter 3.47, released on August 12, 2026, changes that completely.

The standalone `material_ui` and `cupertino_ui` packages have reached version 1.0. The migration tool is ready. The compatibility bridge is shipped. The deprecation clock on the old imports has officially started.

This is no longer a preview or a direction. It's the present, and it affects every Flutter developer.

This handbook is the complete practical guide to everything that has changed. It covers why the Flutter team made this architectural decision, what the new packages contain and how they differ from the old imports, how to migrate both automatically and manually, how to handle dependencies that haven't yet migrated, how localizations work now, what happens to your project's existing widgets, and the full deprecation timeline so you know exactly when the old way of doing things stops being supported.

If you read the earlier article, this is the follow-up you have been waiting for. If you're coming to this fresh, everything you need is here.

::: note Prerequisites

Before working through this guide, make sure the following are in place.

**Flutter 3.47 or higher:** This guide covers features that exist only in this release. Run `flutter upgrade` in your terminal to get there, then verify with `flutter --version`.

**Dart SDK 3.10 or higher:** Dart 3.10 ships with Flutter 3.47. Verify with `dart --version`.

**An existing Flutter project or a willingness to follow the migration steps in a sandbox:** The migration concepts apply to any Flutter app regardless of its size.

**Basic familiarity with Flutter project structure:** You should know what <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` is, what `flutter pub get` does, and what an import statement in Dart looks like.

**No prior knowledge of the decoupling feature required:** This guide explains everything from the beginning. But reading [**Decoupling Material and Cupertino in Flutter**](/freecodecamp.org/decoupling-material-and-cupertino-in-flutter.md) first gives you useful background context on the motivation for the change.

:::

---

## What Changed and Why It Matters: The Full Picture

Before Flutter 3.47, when you wrote `import 'package:flutter/material.dart'`, you were importing the Material widget library that was baked directly into the Flutter SDK. You couldn't get a newer version of Material widgets without upgrading the entire Flutter SDK. You had no choice in the matter.

After Flutter 3.47, Material and Cupertino are their own packages on pub.dev: `material_ui` and `cupertino_ui`. You can upgrade them independently of the Flutter SDK. They ship bug fixes and new components on their own weekly schedules. And the Flutter SDK no longer owns their development roadmap.

### Why the Flutter Team Did This

The original architecture made sense in 2018 when Flutter launched. Bundling Material and Cupertino directly into the SDK meant developers always had them available without any configuration. It was simple to get started with, and had zero friction.

But as Flutter matured, the bundling became a constraint. The Material Design 3 rollout was slower than it should have been because every Material change had to wait for a quarterly SDK release. Community contributors found it harder to get widget improvements merged because the bar for touching core SDK code is high. Teams using Flutter for entirely custom design systems still pulled in Material and Cupertino as transitive dependencies whether they wanted them or not.

The decoupling fixes all three problems. Teams that use Material widgets can get fixes and new components weekly instead of quarterly. Teams building custom design systems don't have to carry Material as a dependency. And the path is clear toward a genuinely style-neutral Flutter core, where the framework handles layout, rendering, and platform interaction, while design libraries are entirely optional and swappable.

### The Impact on Your Current Code

Your existing code continues to compile in Flutter 3.47. The old `package:flutter/material.dart` and `package:flutter/cupertino.dart` imports still work for now. Nothing breaks the moment you upgrade to Flutter 3.47. The deprecation is scheduled for the Fall 2026 stable release, expected in November. That's when the old bundled imports will be formally deprecated. They won't be removed immediately after deprecation, but the clock has started.

---

## Understanding the Old Architecture

![Old Flutter architecture before version 3.47. The Flutter SDK is shown as one bundled package containing Material widgets, Cupertino widgets, the base widget layer, rendering, painting, platform services, and localization. The diagram highlights five problems: Material fixes require an SDK release, custom design systems still depend on Material, contributing to the core SDK is difficult, components cannot be independently versioned, and Material and Cupertino share the same release cycle.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/f60be998-1d92-462f-85f5-1a5feb2df1b0.png)

Before Flutter 3.47, major Flutter UI components were bundled inside the Flutter SDK and released together. Material Design, Cupertino, widgets, rendering, painting, platform services, and localization all lived within the same SDK release structure.

This created several limitations. A Material bug fix could require waiting for a Flutter SDK release. Teams building their own design systems could still be tied to Material. Contributing changes to the core SDK had a higher barrier, making improvements slower. Material couldn't be versioned independently from the underlying Flutter SDK, and Material and Cupertino followed the same release cadence even when only one of them needed an urgent update.

The old architecture tightly coupled Flutter's UI libraries to the SDK, so individual components couldn't evolve and release as independently as they could in a more modular architecture.

Every Flutter project that used `package:flutter/material.dart` was tightly coupled to the SDK's release schedule. If Material introduced a visual bug, you waited for the next quarterly SDK release to get the fix, even if the Flutter engine itself had no issues. This tight coupling was the fundamental problem the decoupling initiative was designed to solve.

---

## The New Architecture: Standalone Packages

![New Flutter architecture from Flutter 3.47 onward. Material UI and Cupertino UI are separated into independent packages on pub.dev, each with its own versioning and weekly releases. Both packages depend on the Flutter SDK core, which now contains only the base widget, rendering, painting, services, and foundation layers and continues to release quarterly. The architecture enables faster UI fixes, optional Material usage, easier contributions, independent versioning, and a more style-neutral Flutter core.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/27d282b4-7cb3-42a1-9773-dfd99a1fb380.png)

Starting with Flutter 3.47, the architecture separates Flutter's design systems from the core SDK. Material UI and Cupertino UI are independent packages published through [<VPIcon icon="fa-brands fa-dart-lang"/>pub.dev](http://pub.dev). Each package can have its own version and release updates independently.

Both packages depend on the **Flutter SDK core**, which contains the underlying widget, rendering, painting, platform services, and foundation layers. The core SDK remains on its regular quarterly release cycle, while the UI packages can ship updates more frequently.

Flutter's core is becoming more modular. Material and Cupertino can evolve independently without requiring the entire Flutter SDK to be released.

The key architectural insight is the separation of concerns. The Flutter SDK now owns the rendering engine, the base widget layer, and the platform abstractions. The design systems (`material_ui` and `cupertino_ui`) are first-party packages on pub.dev, owned by the Flutter team but versioned and released independently.

---

## Setting Up: Adding the New Packages

### Adding material_ui

```sh
flutter pub add material_ui
```

This single command adds `material_ui` to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` under `dependencies` and runs `flutter pub get` automatically. After running it, your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` will contain:

```yaml
dependencies:
  flutter:
    sdk: flutter
  material_ui: ^1.0.0
```

`flutter pub add material_ui` is the idiomatic way to add a package. It automatically selects the latest compatible version and adds the correct constraint format. The `^1.0.0` constraint means "1.0.0 or any higher version that is compatible with 1.x", following Dart's semver conventions.

This is the constraint you want: it allows patch and minor updates to land automatically when you run `flutter pub upgrade`, but it prevents breaking changes from a hypothetical `2.0.0` from disrupting your project.

### Adding cupertino_ui

```sh
flutter pub add cupertino_ui
```

Add this only if your project uses Cupertino-style widgets. Apps that target only Android or that use purely custom design systems may not need it.

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  material_ui: ^1.0.0
  cupertino_ui: ^1.0.0
```

### Adding Both at Once

```sh
flutter pub add material_ui cupertino_ui
```

Listing both package names in a single `flutter pub add` command adds them together and resolves the full dependency graph once, which is faster than running two separate commands.

---

## Migrating Your Project: The Automated Path

The Flutter team ships a migration tool that handles the most common cases automatically. For most projects, this is the complete migration.

### Step 1: Run the Migration Tool

```sh
dart fix --apply --code=migrate_design_widgets
```

`dart fix` is Dart's built-in automated code repair tool. `--apply` tells it to apply all suggested fixes without asking for confirmation on each one. `--code=migrate_design_widgets` runs specifically the `migrate_design_widgets` fix, which is the new code fix that handles the decoupling migration. It scans your project for `package:flutter/material.dart` and `package:flutter/cupertino.dart` imports and updates them to the correct new import from `package:material_ui/material_ui.dart` and `package:cupertino_ui/cupertino_ui.dart`, respectively.

The tool also attempts to update your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` to add the new package dependencies. There's a known early bug where the <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` update may not apply correctly in some cases.

### Step 2: Handle the Known <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` Bug

If the migration tool didn't successfully update your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, run:

```sh
flutter pub add material_ui
flutter pub add cupertino_ui
dart fix --apply
```

`flutter pub add material_ui` and `flutter pub add cupertino_ui` add the packages manually to <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and run the package resolution. Then `dart fix --apply` (without the `--code` flag this time) applies any remaining fixes that the initial run may have missed now that the packages are available.

Running `dart fix` after the packages are in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` allows it to validate the import paths against the actual installed packages.

### Step 3: Verify the Migration

```sh
flutter analyze
```

`flutter analyze` runs the Dart analyzer across your entire project and reports any remaining issues. After a successful migration, you should see no errors related to missing imports or deprecated APIs. If errors remain, they fall into one of two categories: imports that the migration tool couldn't automatically update (covered in the manual path section below), or dependencies on third-party packages that haven't yet migrated (covered in the compatibility bridge section).

### What the Tool Actually Changes

Here's exactly what the automated migration does to your import statements:

```dart
// BEFORE: What every Flutter app used to write
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
```

```dart
// AFTER: What the migration tool produces
import 'package:material_ui/material_ui.dart';
import 'package:cupertino_ui/cupertino_ui.dart';
```

The `import 'package:flutter/material.dart'` statement imported the Material library from the bundled location inside the Flutter SDK. The `import 'package:material_ui/material_ui.dart'` statement imports from the standalone package you added in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`.

The widget names, class names, and API surface are identical. `Scaffold` is still `Scaffold`. `ThemeData` is still `ThemeData`. `AppBar` is still `AppBar`. No widgets were renamed or restructured. The only change is the import path.

The reason this migration is possible with a simple find-and-replace on import paths is that the Flutter team deliberately designed `material_ui` to be a drop-in replacement for the bundled Material library. The API surface is frozen at the same state the bundled library was in when the freeze happened. This is also why the package README says contributions were frozen in April to ensure a smooth migration.

What you get in `material_ui` 1.0 is exactly what you had in `package:flutter/material.dart` in Flutter 3.44, with the path to receive further improvements on a faster cadence going forward.

---

## Migrating Your Project: The Manual Path

The automated tool handles the vast majority of migrations. But there are specific cases where manual intervention is needed.

### Mixed Import Files

If you have a file that imports from multiple Flutter sub-libraries on the same line or in ways the tool can't parse:

```dart
// A file with multiple flutter imports
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter/gestures.dart';
```

The tool updates only the `material.dart` import. The others remain pointing to `package:flutter/...` because `rendering.dart`, `services.dart`, and `gestures.dart` are core framework libraries that don't move to standalone packages. They stay exactly where they are. Only the design-system imports change.

```dart
// After migration: correct state
import 'package:material_ui/material_ui.dart'; // Updated
import 'package:flutter/rendering.dart';        // Stays the same
import 'package:flutter/services.dart';         // Stays the same
import 'package:flutter/gestures.dart';         // Stays the same
```

`package:flutter/rendering.dart` and similar core framework imports don't move because they're part of the SDK's own domain: layout, rendering, painting, and platform services. The decoupling is specifically about design systems, not the underlying framework primitives. This distinction is important to understand so you don't accidentally try to find a `rendering_ui` package that doesn't exist.

### Conditional Imports and Platform-Specific Files

```dart
// Platform-specific file that used conditional imports
export 'package:flutter/material.dart'
    if (dart.library.html) 'package:flutter/material.dart';
```

Update both sides of conditional imports manually:

```dart
// After migration
export 'package:material_ui/material_ui.dart'
    if (dart.library.html) 'package:material_ui/material_ui.dart';
```

Conditional imports with `if (dart.library...)` select between two import paths based on the platform at compile time. The migration tool may not correctly handle both branches of a conditional import in all cases. Manually verify any file in your project that contains `if (dart.library.html)` or similar platform conditions on import statements.

### Generated Files

Files ending in `.g.dart`, `.freezed.dart`, or other generated suffixes are produced by build_runner and should never be manually edited. They'll regenerate with the correct imports when you run:

```sh
dart run build_runner build --delete-conflicting-outputs
```

`dart run build_runner build` executes all code generators (json_serializable, freezed, riverpod_generator, and so on) against your source files. `--delete-conflicting-outputs` removes previously generated files before regenerating, which prevents stale generated code from causing conflicts.

Because the source `.dart` files now have updated imports from the migration tool, the generators re-read those source files and produce generated files with consistent imports. There's nothing special to do for generated files beyond running the generators again after the migration.

---

## The MaterialUiCompatibilityBridge: Bridging the Gap

The ecosystem doesn't migrate overnight. When you update your app to use `material_ui`, some of your third-party package dependencies may still be using `package:flutter/material.dart` internally. This creates a situation where your app's widget tree has widgets from two different sources of Material: the new standalone package and the old bundled one.

The `MaterialUiCompatibilityBridge` exists to handle exactly this situation. It provides a compatibility layer that allows both sources of Material widgets to coexist in the same widget tree without runtime errors.

```dart
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6750A4),
        ),
      ),
      builder: (BuildContext context, Widget? child) {
        return MaterialUiCompatibilityBridge(child: child!);
      },
      home: const HomeScreen(),
    );
  }
}
```

`import 'package:material_ui/material_ui.dart'` is the new import. All Material widgets including `MaterialApp`, `ThemeData`, `ColorScheme`, and `MaterialUiCompatibilityBridge` are available from this single import.

`MaterialApp(...)` is unchanged in name and behavior from what you used before. The same constructor parameters, the same behavior. The class comes from `material_ui` now instead of the bundled SDK, but your code that uses it doesn't change.

`builder: (BuildContext context, Widget? child) { return MaterialUiCompatibilityBridge(child: child!); }` is the compatibility layer insertion. The `builder` parameter of `MaterialApp` wraps the entire widget tree that `MaterialApp` creates. By inserting `MaterialUiCompatibilityBridge` at this level, it sits above every widget in your app. This means any widget anywhere in the tree, whether it comes from your code (using `material_ui`) or from a dependency (still using `package:flutter/material.dart`), operates under the bridge's compatibility context.

The `child!` with the null assertion is safe here because `MaterialApp` always provides a non-null child to the builder when the app has a `home`, `routes`, or `initialRoute` configured.

### When to Use the Compatibility Bridge

![Compatibility Bridge Decision Tree. The diagram asks whether a project has dependencies that use Material widgets. If the answer is No, the project does not need the compatibility bridge. If the answer is Yes, the next question asks whether all those dependencies have been updated to use material_ui. If all have been updated, the bridge is not needed. If some or none have been updated, the project should use the compatibility bridge.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/9d2d4b70-c9c2-40f0-9b09-5e5f8371c252.png)

Start with one question: **Does your project have dependencies that use Material widgets?**

**No:** You don't need the compatibility bridge. You can proceed without it.

**Yes:** Check whether those dependencies have been updated to use `material_ui`.

- **All of them:** The bridge isn't needed. Proceed without it.
- **Some or none:** Use the compatibility bridge while those dependencies are being updated.

The bridge is only necessary when your project still relies on dependencies that use the old Material widgets. If everything has already moved to `material_ui`, you can remove or avoid the bridge.

It's a transitional tool. As the ecosystem migrates, you can check whether your dependencies have updated by running:

```sh
flutter pub outdated
```

When all your dependencies use `material_ui`, remove the bridge. It's not intended to be a permanent part of your app.

---

## Localizations: What Changed and How to Update

Localizations are one of the most significant practical changes in this migration. The `flutter_localizations` package previously provided translations and localization delegates for both Material and Cupertino widgets as a single bundled package. That's now split across the two standalone packages.

### The Old Localizations Setup

```dart
// BEFORE: The old way with flutter_localizations
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter/material.dart';

MaterialApp(
  localizationsDelegates: const <LocalizationsDelegate<dynamic>>[
    GlobalCupertinoLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ],
  supportedLocales: const [
    Locale('en'),
    Locale('ar'),
    Locale('fr'),
  ],
  // ...
)
```

The old approach required explicitly listing three delegates: `GlobalCupertinoLocalizations.delegate` for Cupertino widget strings, `GlobalMaterialLocalizations.delegate` for Material widget strings, and `GlobalWidgetsLocalizations.delegate` for base widget strings. You also needed the separate `flutter_localizations` import. This was verbose and required developers to know which delegate covered which widgets.

### The New Localizations Setup

```dart
// AFTER: The new way with material_ui
import 'package:material_ui/material_ui.dart';

MaterialApp(
  localizationsDelegates: GlobalMaterialLocalizations.delegates,
  supportedLocales: const [
    Locale('en'),
    Locale('ar'),
    Locale('fr'),
  ],
  // ...
)
```

`GlobalMaterialLocalizations.delegates` is a getter that returns all three delegates together: the Material delegate, the Cupertino delegate, and the Widgets delegate. By assigning this single getter to `localizationsDelegates`, you get the same coverage as the old three-delegate list with less code.

The Cupertino strings are included automatically even if you don't separately import `cupertino_ui`, because `material_ui` depends on `cupertino_ui` internally and bundles those localization delegates in its combined getter.

The separate `flutter_localizations` import is no longer needed. The package still exists (it's not deprecated), but for projects migrating to `material_ui`, you can remove it from both your import statements and your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` dependencies.

### Localizations Architecture Diagram

![Localization Architecture: Before and After. Before, Flutter localization used a separate flutter_localizations package, requiring developers to explicitly register Material, Cupertino, and Widgets localization delegates. After, material_ui provides GlobalMaterialLocalizations.delegates, which includes the required Cupertino and Widgets delegates automatically.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/1373bd32-83f8-4001-bed0-de8968eb6b8f.png)

The diagram compares Flutter's localization setup before and after the architectural change.

**Before:** Localization was provided through the separate `flutter_localizations` package. Developers had to explicitly include the Material, Cupertino, and Widgets localization delegates.

**After:** Localization is simplified through the `material_ui` package. `GlobalMaterialLocalizations.delegates` provides the delegates together, with Cupertino and Widgets localization included automatically.

The new approach reduces the amount of localization configuration developers need to write and makes the setup easier to maintain.

---

## Before and After: Side by Side Code Comparisons

### A Basic App Setup

```dart
// BEFORE: Standard Flutter app entry point
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: const [Locale('en')],
      home: const HomeScreen(),
    );
  }
}
```

```dart
// AFTER: Migrated app entry point
import 'package:material_ui/material_ui.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      localizationsDelegates: GlobalMaterialLocalizations.delegates,
      supportedLocales: const [Locale('en')],
      home: const HomeScreen(),
    );
  }
}
```

The diff here is three changes: the import line changes from `package:flutter/material.dart` to `package:material_ui/material_ui.dart`, the `flutter_localizations` import is removed, and the `localizationsDelegates` list collapses from three explicit delegates to one getter. Everything else (`MaterialApp`, `ThemeData`, `ColorScheme.fromSeed`, `useMaterial3`, and `home`) is identical because the API didn't change.

### A Screen With Material Widgets

```dart
// BEFORE
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              leading: const CircleAvatar(child: Icon(Icons.person)),
              title: const Text('Ade Mensah'),
              subtitle: const Text('Flutter Developer'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () {},
            child: const Text('Edit Profile'),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

```dart
// AFTER: Migrated screen
import 'package:material_ui/material_ui.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              leading: const CircleAvatar(child: Icon(Icons.person)),
              title: const Text('Ade Mensah'),
              subtitle: const Text('Flutter Developer'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () {},
            child: const Text('Edit Profile'),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

The widget tree is completely identical. `Scaffold`, `AppBar`, `Card`, `ListTile`, `CircleAvatar`, `FilledButton`, and `FloatingActionButton`: every widget name, parameter, and behavior is unchanged.

The only line that differs is the import at the top. This is by design. The Flutter team's explicit goal was to make the migration a pure import change with zero widget API changes.

### A Cupertino Screen

```dart
// BEFORE
import 'package:flutter/cupertino.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Settings'),
      ),
      child: SafeArea(
        child: CupertinoListSection.insetGrouped(
          children: [
            CupertinoListTile(
              title: const Text('Notifications'),
              leading: const Icon(CupertinoIcons.bell),
              trailing: CupertinoSwitch(
                value: true,
                onChanged: (value) {},
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

```dart
// AFTER
import 'package:cupertino_ui/cupertino_ui.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Settings'),
      ),
      child: SafeArea(
        child: CupertinoListSection.insetGrouped(
          children: [
            CupertinoListTile(
              title: const Text('Notifications'),
              leading: const Icon(CupertinoIcons.bell),
              trailing: CupertinoSwitch(
                value: true,
                onChanged: (value) {},
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

Same story. `CupertinoPageScaffold`, `CupertinoNavigationBar`, `CupertinoListSection`, `CupertinoListTile`, `CupertinoSwitch`, and `CupertinoIcons` are all available from `package:cupertino_ui/cupertino_ui.dart` exactly as they were from `package:flutter/cupertino.dart`. One import line changes, zero widget code changes.

### An App That Uses Both Material and Cupertino

Some apps mix design systems. A common pattern is using Cupertino dialogs and pickers inside a primarily Material app. Both libraries are available simultaneously with no conflicts:

```dart
// BEFORE
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class DatePickerButton extends StatelessWidget {
  const DatePickerButton({super.key});

  void _showDatePicker(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder: (context) => Container(
        height: 216,
        color: CupertinoColors.systemBackground,
        child: CupertinoDatePicker(
          mode: CupertinoDatePickerMode.date,
          onDateTimeChanged: (DateTime newDate) {},
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => _showDatePicker(context),
      child: const Text('Pick Date'),
    );
  }
}
```

```dart
// AFTER: Both packages imported
import 'package:material_ui/material_ui.dart';
import 'package:cupertino_ui/cupertino_ui.dart';

class DatePickerButton extends StatelessWidget {
  const DatePickerButton({super.key});

  void _showDatePicker(BuildContext context) {
    showCupertinoModalPopup(
      context: context,
      builder: (context) => Container(
        height: 216,
        color: CupertinoColors.systemBackground,
        child: CupertinoDatePicker(
          mode: CupertinoDatePickerMode.date,
          onDateTimeChanged: (DateTime newDate) {},
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => _showDatePicker(context),
      child: const Text('Pick Date'),
    );
  }
}
```

Both `material_ui` and `cupertino_ui` can be imported in the same file without any namespace conflicts. Note that `material_ui` already depends on `cupertino_ui` internally, so in practice you may find you don't need to explicitly import `cupertino_ui` in most files because the Cupertino types are accessible through the Material import. But explicitly importing both is clearer about intent and is the recommended practice for files that meaningfully use widgets from both systems.

---

## Migrating Package Authors

If you maintain a Flutter package (not just a Flutter app), the migration has additional considerations. The Flutter team explicitly states: treat this move to the standalone packages as a major release of your package.

### What to Do as a Package Author

```yaml
# Your package's pubspec.yaml BEFORE migration
name: my_flutter_package
version: 1.5.0
dependencies:
  flutter:
    sdk: flutter
```

```yaml
# Your package's pubspec.yaml AFTER migration
name: my_flutter_package
version: 2.0.0
dependencies:
  flutter:
    sdk: flutter
  material_ui: ^1.0.0
```

The version bump to `2.0.0` is required because this is a breaking change for your package's consumers. Before, importing your package didn't require `material_ui` in the consumer's project (it came bundled). After, your package declares an explicit dependency on `material_ui`, which changes your package's dependency graph. Consumers updating to your `2.0.0` will need to also have `material_ui` available, which they will if they're also migrating. The semver major bump communicates this clearly.

### Maintaining Backward Compatibility During the Transition

If you want to support both old and new Flutter setups during the transition period (before November 2026), you can use Dart's conditional export feature:

```dart title="lib/src/widgets.dart"
// This is the internal file that handles the conditional import
export 'package:material_ui/material_ui.dart'
    if (dart.library.nonexistent) 'package:flutter/material.dart';
```

But this approach is complex and rarely necessary. The Flutter team's recommendation is simpler: migrate your package to `material_ui`, bump the major version, and let your users upgrade at their own pace. The compatibility bridge in `material_ui` handles the consumer-side coexistence for users who are in the middle of migrating their own apps.

### Checking Your pub.dev Score

After migrating your package to `material_ui`, the static analysis that powers pub.dev scores will recognize the migration and reward it appropriately. The tooling now flags packages that haven't migrated with a lower pub points score. This is an intentional incentive structure to drive ecosystem adoption.

---

## What Else Changed in Flutter 3.47

The decoupling is the headline feature, but Flutter 3.47 brings several other significant changes that affect real projects.

### Impeller Is Now the Default on Desktop

Impeller, Flutter's next-generation rendering engine that was already default on iOS and Android, is now the default renderer for macOS, Windows, and Linux. Impeller eliminates shader compilation jank (the brief stutter the first time an animation plays) by compiling shaders at build time rather than at runtime.

For most projects, this is a transparent improvement. Your animations will be smoother from the very first frame. If you encounter rendering issues and need to temporarily disable Impeller:

```xml title="ios/Runner/Info.plist"
<!-- macOS -->
<key>FLTEnableImpeller</key>
<false/>
```

```cpp title="windows/runner/main.cpp"
// Windows
project.set_impeller_switch(flutter::ImpellerSwitch::Disabled);
```

```c title="linux/my_application.cc"
// Linux
fl_dart_project_set_enable_impeller(project, FALSE);
```

These opt-out mechanisms exist for projects that find bugs with the new default. The fallback to Skia will be removed in a future release, so if you must opt out, file a bug report with the Flutter team so the underlying issue can be fixed.

### Minimum iOS and macOS Versions Raised

With Xcode 27 support, the minimum supported OS versions have changed:

| **Platform** | **Previous Minimum** | **New Minimum (Flutter 3.47+)** |
| :---: | :---: | :---: |
| iOS | 13 | 15 |
| macOS | 10.15 (Catalina) | 12 (Monterey) |

If your app's `ios/Runner.xcodeproj` or `macos/Runner.xcodeproj` specifies deployment targets below these new minimums, the build will fail. Update your deployment targets in Xcode, or let the Flutter CLI handle it automatically by running `flutter build ios` which will warn you about the mismatch.

### iOS UIScene Lifecycle Mandate

Apps built with Xcode 27 that use the legacy `UIApplication` delegate lifecycle (rather than the newer `UIScene` lifecycle) will fail to launch on iOS 27. For most Flutter apps, the CLI handles this migration automatically during the build.

If your app has custom native code in `AppDelegate.swift` or `AppDelegate.m`, or uses plugins that rely on the legacy lifecycle, you need to migrate manually by following the UIScene/Delegate Adoption Guide in the Flutter documentation.

### Widget Previews Graduate to Stable

Widget Previews, which let you render individual widgets without building the full app, are now stable. A `.widget_preview/` folder at the project root caches preview state for faster startup. This is worth enabling if your team iterates heavily on widget UI.

### WebAssembly Getting Closer to Default

Wasm isn't yet the default for Flutter Web, but it's getting closer. You can opt in now:

```sh
flutter build web --release --wasm
```

`--wasm` builds your Flutter web app targeting WebAssembly instead of JavaScript. The performance improvement is significant for compute-heavy UIs. The prerequisite is that your code and dependencies must use `package:web` instead of `dart:html`, since the legacy HTML library isn't supported in Wasm. Most popular packages have already migrated.

---

## Deprecation Timeline: When the Old Imports Stop Working

Understanding the timeline is critical for planning your migration.

![Deprecation Timeline. The diagram shows three stages. Flutter 3.47 in August 2026: material_ui and cupertino_ui reach version 1.0, the dart fix migration tool is available, and old imports still work without warnings. Flutter Fall Stable in November 2026: the old Material and Cupertino imports become formally deprecated, analyzer warnings appear, but existing code still runs. A future 2027 release: the old imports are removed and will no longer compile. The recommended action is to migrate before November 2026.](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/3c1c87c4-5b07-4edf-b577-5fe2298ed4c0.png)

The timeline shows the planned transition away from Flutter's old Material and Cupertino imports.

::: note August 2026, Flutter 3.47

The new `material_ui` and `cupertino_ui` packages reach version 1.0. The `dart fix` migration tool is available. Existing imports still work and don't produce deprecation warnings yet. The ecosystem begins moving to the new packages.

:::

::: note November 2026, Flutter Fall Stable

The old `package:flutter/material.dart` and `package:flutter/cupertino.dart` imports become formally deprecated. Developers using them will see deprecation warnings in the analyzer. Existing applications will still compile and run during this stage.

:::

::: note Future release in 2027

The old imports are removed from the bundled Flutter SDK. Projects that have not migrated will no longer compile using those imports.

:::

The safest time to migrate is now, before November 2026, while the old imports still compile cleanly. Migrating in the deprecation warning period (November 2026 to removal) still works but produces analyzer noise. Migrating after removal requires emergency action, which is avoidable by planning ahead.

---

## Best Practices

### Migrate Early, Migrate Once

The automated migration tool is production-ready. Running it now gives you the benefits of faster Material and Cupertino updates immediately, avoids the deprecation warning period entirely, and puts you ahead of the ecosystem curve.

Teams that migrate early also avoid the situation where a dependency upgrade accidentally brings in breaking changes from the new package while they are still using the old one.

### Remove flutter_localizations After Migrating

After migrating to `material_ui`, the `flutter_localizations` package in your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` is redundant. The localization delegates it provided are now included in `material_ui`. Remove it:

```yaml
# REMOVE this from pubspec.yaml after migration
# flutter_localizations:
#   sdk: flutter
```

```sh
# Also remove the import from all dart files
# Remove: import 'package:flutter_localizations/flutter_localizations.dart';
```

Leaving `flutter_localizations` in the project doesn't cause errors, but it's unnecessary weight and a potential source of confusion when reading the project's dependencies.

### Use the Compatibility Bridge Temporarily, Not Permanently

The `MaterialUiCompatibilityBridge` is a transitional tool. Don't design your architecture around its presence. Add it when you migrate, and set a reminder to remove it when all your dependencies have migrated to `material_ui`. Check the migration status of your dependencies periodically with:

```sh
flutter pub outdated
```

### Pin Your Material and Cupertino Package Versions in CI

Because `material_ui` and `cupertino_ui` now ship weekly updates, you may want to pin specific versions in your CI environment to ensure reproducible builds:

```yaml title="pubspec.yaml"
# for production stability
dependencies:
  material_ui: 1.2.0   # Exact version pin for CI stability
  cupertino_ui: 1.1.0
```

For development, using the `^` constraint is fine and keeps you current. For CI and production builds, pinning an exact version and upgrading deliberately gives you more control over what changes between builds.

---

## Common Mistakes

### Mixing Old and New Imports in the Same File

```dart
// WRONG: Both old and new imports in the same file
import 'package:flutter/material.dart';
import 'package:material_ui/material_ui.dart'; // Duplicate
```

Having both imports in the same file is redundant and may cause analyzer warnings about duplicate type definitions. After migration, every file should have exactly one Material import: the new `package:material_ui/material_ui.dart`. Run `flutter analyze` to catch any files with this issue.

### Forgetting the Compatibility Bridge When Needed

If you migrate your app's imports but don't add the `MaterialUiCompatibilityBridge`, and one of your dependencies still uses the old bundled Material, you may encounter runtime errors where widgets can't find their inherited theme data because they are looking in the wrong context. The symptom is a null theme or a "Could not find an ancestor of type MaterialLocalizations" error. The fix is always to add the bridge.

### Running pub get After dart fix Without Adding the Packages First

```sh
# WRONG order
dart fix --apply --code=migrate_design_widgets
# If pubspec.yaml was not updated, analysis errors remain

# CORRECT order if the tool fails to update pubspec.yaml
flutter pub add material_ui
flutter pub add cupertino_ui
dart fix --apply
```

The `dart fix` command needs the packages to be resolvable in your project for the import updates to validate correctly. If you run `dart fix` before the packages are in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, it may update the import strings but leave you with unresolvable imports that the analyzer flags as errors.

### Not Bumping the Major Version When Migrating a Package

If you maintain a package and migrate it to `material_ui` without bumping the major version, consumers of your package who haven't yet added `material_ui` to their <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` will get a dependency resolution failure when they update your package.

Always bump the major version when your package adds a new external dependency, which is what switching from the bundled SDK library to an explicit package dependency represents.

### Expecting Widgets to Behave Differently After Migration

Some developers expect the migration to Material 3 Expressive or other Material Design updates to happen as part of this migration. It does not. `material_ui` 1.0 is a faithful copy of `package:flutter/material.dart` at the point of the freeze. It's the same widgets with the same behavior at the same visual style. The decoupling is an architectural change, not a visual redesign. Future visual improvements from Material 3 Expressive will come in subsequent weekly releases of `material_ui` after 1.0. ---

## Conclusion

The decoupling of Material and Cupertino from the Flutter SDK core is one of the most significant architectural changes Flutter has made since its initial release. What was a vision described in the earlier article [**Decoupling Material and Cupertino in Flutter**](/freecodecamp.org/decoupling-material-and-cupertino-in-flutter.md) is now fully realized and ready for production adoption in Flutter 3.47. The migration path the Flutter team has built is as smooth as a breaking architectural change can be. The automated tool handles the import updates. The compatibility bridge handles the ecosystem gap. The API surface is frozen identically so no widget code changes. The localization setup gets simpler. And the payoff is immediate: weekly updates to your design system, independent of the quarterly SDK release cycle.

The deprecation clock started with this release. November 2026 is when the old imports become formally deprecated. That's a comfortable runway for any team to complete the migration, but it's not a reason to wait. Every week you delay is a week of weekly Material updates you aren't getting.

The three practical steps to take right now: run `flutter upgrade` to get Flutter 3.47, run `dart fix --apply --code=migrate_design_widgets` to migrate your imports, and run `flutter analyze` to verify the result. For most projects, those three commands are the entire migration. Add the compatibility bridge if your dependencies need it, and remove it as they migrate.

Flutter 3.47 is a milestone. The ecosystem the decoupling unlocks, faster iteration, easier contributions, a style-neutral core, and independent design system versioning, is what makes Flutter genuinely modular by design. This is worth migrating to now.

::: info References

<SiteInfo
  name="What’s new in Flutter 3.47"
  desc="Modular by design: Standalone UI Packages and Impeller on Desktop"
  url="https://flutter.dev/blog/whats-new-in-flutter-3-47"
  logo="https://flutter.dev/assets/favicon.26abda3864324ef4ac32dd0d3ce28907.png"
  preview="https://flutter.dev/assets/hero_image_cover.0b5fd054981c6211ca53050b9a75f714.webp"/>

> The official Flutter blog post announcing standalone UI packages, Impeller on desktop, widget previews going stable, and every other change in this release.

<SiteInfo
  name="Breaking changes and migration guides"
  desc="A collection of notices and migration guides for breaking changes in Flutter."
  url="https://docs.flutter.dev/release/breaking-changes"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

> The authoritative list of breaking changes in each Flutter release, including the decoupling migration details.

<SiteInfo
  name="material_ui | Flutter package"
  desc="The official Flutter Material UI Library, implementing Google's Material Design design system."
  url="https://pub.dev/packages/material_ui"
  logo="https://pub.dev/static/hash-5dtc9ad5/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-5dtc9ad5/img/pub-dev-icon-cover-image.png"/>

> The official standalone Material Design widget library for Flutter, published by flutter.dev, the replacement for `package:flutter/material.dart`.

<SiteInfo
  name="cupertino_ui | Flutter package"
  desc="The official Flutter Cupertino Design Library, implementing the iOS design system."
  url="https://pub.dev/packages/cupertino_ui"
  logo="https://pub.devs/static/hash-5dtc9ad5/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-5dtc9ad5/img/pub-dev-icon-cover-image.png"/>

> The official standalone Cupertino widget library for Flutter, the replacement for `package:flutter/cupertino.dart`.

<SiteInfo
  name="packages/packages/material_ui at main · flutter/packages"
  desc="A collection of useful packages maintained by the Flutter team - flutter/packages"
  url="https://github.com/flutter/packages/tree/main/packages/material_ui"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2375bc6905aa6e729d9674523a6d31fea1fe46b4339a27e451d631b0014c026c/flutter/packages"/>

> Source code, issue tracking, and contribution guide for the standalone Material package.

```component VPCard
{
  "title": "Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt",
  "desc": "As Flutter developers, we know that Flutter’s “batteries included” philosophy has long been its superpower. Built on the simple premise to ”paint every pixel,” the framework shipped with everything needed to build a real app out of the box: a renderi...",
  "link": "/freecodecamp.org/decoupling-material-and-cupertino-in-flutter.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

> My earlier freeCodeCamp article explaining the motivation, design decisions, and preview state of the decoupling initiative before Flutter 3.47 completed it.

<SiteInfo
  name="Decoupling Design • flutter"
  desc="Tracking the decoupling of the material and cupertino libraries from the core Flutter framework. Root issue: https://github.com/flutter/flutter/issues/101479"
  url="https://github.com/orgs/flutter/projects/220"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/051348cb799edbe360aa03895cea85d69af4025e6041f24b9c6aa63e1d1e9713/orgs/flutter/projects/220"/>

> The public GitHub project board tracking the decoupling work, showing what has been completed and what's still in progress.

<SiteInfo
  name="Swift Package Manager for plugin authors"
  desc="How to add Swift Package Manager compatibility to iOS and macOS plugins"
  url="https://docs.flutter.dev/packages-and-plugins/swift-package-manager/for-plugin-authors"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

> For plugin authors who also need to migrate to Swift Package Manager as part of the Xcode 27 transition.

<SiteInfo
  name="Impeller rendering engine"
  desc="What is Impeller and how to enable it?"
  url="https://docs.flutter.dev/perf/impeller/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

Complete documentation for Impeller, now the default renderer on all platforms, including how to opt out temporarily and how to file rendering bugs.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Work with Material and Cupertino Decoupling in Flutter [Full Handbook]",
  "desc": "Earlier this year, I published Decoupling Material and Cupertino in Flutter, which covered what was then a preview feature: Flutter's plan to separate the Material and Cupertino design libraries from ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-work-with-material-and-cupertino-decoupling-in-flutter-full-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
