---
lang: en-US
title: "How to Use Monorepos in Flutter"
description: "Article(s) > How to Use Monorepos in Flutter"
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
      content: "Article(s) > How to Use Monorepos in Flutter"
    - property: og:description
      content: "How to Use Monorepos in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-monorepos-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2026-02-05
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770234857032/469b96ec-07d5-4ca3-9662-d890790a6a75.png
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
  name="How to Use Monorepos in Flutter"
  desc="As Flutter applications grow beyond a single mobile app, teams quickly encounter a new class of problems. Shared business logic begins to be copied across projects. UI components drift out of sync. Fixes in one app don’t propagate cleanly to others. ..."
  url="https://freecodecamp.org/news/how-to-use-monorepos-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770234857032/469b96ec-07d5-4ca3-9662-d890790a6a75.png"/>

As Flutter applications grow beyond a single mobile app, teams quickly encounter a new class of problems. Shared business logic begins to be copied across projects. UI components drift out of sync. Fixes in one app don’t propagate cleanly to others. Versioning shared code becomes painful. Continuous integration pipelines multiply. Developer productivity drops.

Fortunately, this is exactly the problem monorepos were created to solve.

In this guide, we’ll walk through how to structure, build, and maintain a Flutter monorepo using a real-world example: a ride-hailing platform with a Rider mobile app, a Driver mobile app, and a Web Admin dashboard. You’ll learn what monorepos are, how shared packages work in Dart and Flutter, where Melos fits in, what Dart Workspaces actually provide, and how these tools complement each other in real production setups.

By the end of this guide, you’ll have a clear, practical understanding of how to design and operate a production-ready Flutter monorepo with confidence.

::: note Prerequisites

To follow this guide effectively, you should have an intermediate understanding of Flutter and Dart. You should be comfortable creating new applications, editing<VPIcon icon="iconfont icon-yaml"/>"/>`pubspec.yaml` files, and using the terminal.

You’ll also need to have the Dart SDK installed, and while monorepos are supported in earlier versions, I recommend **Dart SDK 3.6.0 or higher** to fully leverage modern Dart Workspaces features.

You should also have Flutter installed and verified using `flutter doctor`, and Git is required for version control.

You don’t need any prior experience with monorepos, though familiarity with local path dependencies in Dart will be helpful.

:::

---

## The Problem with Multiple Repositories

Imagine building a ride-hailing platform. You start with a Rider app. Later, you add a Driver app. Then an Admin dashboard. Each project begins with its own repository. Very quickly, you notice duplication. Fare calculation logic appears in multiple places. Trip models exist in slightly different forms. API clients are copied and modified.

To reduce duplication, you might extract shared logic into a separate repository. Now every app depends on that repository as a versioned package. Each change requires publishing a new version, updating dependency constraints, and ensuring compatibility. Your team hesitates to refactor shared code because the process is tedious. This friction kills innovation.

---

## Understanding the Monorepo Solution

A monorepo, short for monolithic repository, is a software development strategy where code for many projects is stored in a single version control repository. This is distinct from a monolith application, where all code is compiled into a single binary. In a monorepo, you can still deploy distinct applications, but they live together in the source code.

This approach addresses issues like duplicating business logic across apps, inconsistent UI components, and complex versioning when apps evolve separately.

For our ride-hailing example, the Rider app handles passenger requests and payments, the Driver app manages ride acceptance and navigation, and the Admin web dashboard oversees users, trips, and analytics.

These apps share domain concepts like trip models, fare calculations, and user authentication, making a monorepo ideal to avoid copy-pasted code and ensure changes propagate easily.

![Understanding the Monorepo Solution](https://cdn.hashnode.com/res/hashnode/image/upload/v1770102254885/82218f38-ff0a-47ec-ba05-07b9c37b9e9e.png)

---

## Why Big Tech Uses Monorepos

Big tech companies like Google, Facebook, and Microsoft use monorepos for billions of lines of code because they enable atomic changes across services.

If a platform engineer at Google updates a security protocol in a core library, they can immediately see every downstream project that breaks. They can then fix those breakages in the same commit. This prevents dependency hell, where different teams are stuck on old versions of libraries because upgrading is too difficult.

In Flutter contexts, projects like FlutterFire and Flame adopt them for consistent dependency management and unified tooling.

---

## The Ride-Hailing Use Case

Throughout this guide, we’ll assume we’re building three applications:

1. The Rider app is a Flutter mobile app used by passengers to request rides, track drivers, and make payments.
2. The Driver app is a Flutter mobile app used by drivers to accept rides, navigate, and manage earnings.
3. The Admin dashboard is a Flutter web app used by staff to manage users, drivers, trips, pricing, and analytics.

All three applications share core business logic, shared models, and a consistent UI design language. This is the perfect candidate for a monorepo.

---

## High-Level Monorepo Structure

A practical Flutter monorepo typically separates applications from shared packages. At the root of the repository, you’ll have configuration files and tooling. Below that, you group apps and packages into clear directories.

```sh title="file structure"
ride_hailing_monorepo/
├── pubspec.yaml
├── melos.yaml
├── apps/
│   ├── rider_app/
│   ├── driver_app/
│   └── admin_web/
└── packages/
    ├── core/
    ├── shared_models/
    ├── shared_services/
    └── shared_ui/
```

This diagram represents the physical layout of your hard drive. The root directory contains <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, which defines the workspace, and <VPIcon icon="iconfont icon-yaml"/>`melos.yaml`, which defines the scripts.

The `apps` directory contains the actual executable applications. The `rider_app` is for passengers. The `driver_app` is for drivers. The `admin_web` is the internal dashboard. These folders contain standard Flutter projects with their own `lib` and `test` folders.

The <VPIcon icon="fas fa-folder-open"/>`packages` directory is where the magic happens. The `core` package contains pure Dart logic like validators and formatters. The `shared_models` package defines data structures like User and Trip. The `shared_services` package handles API calls. The `shared_ui` package contains your design system, ensuring buttons and colors are identical across all apps. This structure enforces a simple rule which is that applications depend on packages, but packages never depend on applications.

![High-Level Monorepo Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1770101821860/dbaeec9e-388e-4dcb-a0a5-8429ad396a03.png)

---

## Workflow with Melos

Managing a monorepo without specialized tooling is a manual and error-prone process. While you can physically place folders next to each other, performing operations on them is difficult.

If you want to run unit tests, for example, you would manually have to navigate into the Rider app folder, run the test command, navigate out, navigate into the Core package, run the test command again, and repeat this for every package. If you forget one, you might deploy broken code. This is where Melos becomes the critical orchestration layer of your Flutter monorepo.

Melos is a command-line tool developed by the Invertase team, the same group behind FlutterFire. It’s designed specifically to manage Dart and Flutter projects with multiple packages. It automates the execution of scripts, manages the publishing of packages, and provides advanced filtering capabilities to ensure you are only running tasks on the specific parts of your codebase that need them.

### Understanding the Configuration

Melos requires a configuration file at the root of your repository named <VPIcon icon="iconfont icon-yaml"/>`melos.yaml`. This file is the control center for your monorepo. It dictates where Melos should look for packages and defines the custom scripts that your team will use daily.

A standard <VPIcon icon="iconfont icon-yaml"/>`melos.yaml` for our ride-hailing app looks like this:

```yaml title="melos.yaml"
name: ride_hailing_monorepo

packages:
  - apps/**
  - packages/**

scripts:
  analyze:
    run: melos exec -- flutter analyze
    description: Run static analysis across the entire codebase.

  test:
    run: melos exec --dir-exists="test" -- flutter test
    description: Run unit tests in all packages that possess a test directory.
```

### The Power of Filtering

In a large monorepo, running every command on every package can be slow. If you’re only fixing a bug in the Driver app, you don’t want to wait for the Admin dashboard tests to run. Melos provides a powerful filtering system to solve this.

You can filter by directory existence. In the `test` script defined above, we use `--dir-exists="test"`. Melos looks at a package, checks if it has a folder named `test`, and only runs the command if that folder exists. This prevents errors where the command tries to run tests in a package that has none.

You can filter by scope. The `--scope` argument allows you to target specific packages by name. If you run `melos exec --scope="core" -- flutter test`, Melos will ignore every application and package except for the one named `core`. This allows for precise control during development.

### Versioning and Changelogs

One of the most complex aspects of a monorepo is versioning. If you update the `core` package, you technically need to bump its version number. Melos automates this using a command called `melos version`.

Melos adheres to the Conventional Commits specification. If you write your Git commit messages using a standard format, such as `feat: add new fare calculator`, Melos analyzes your git history. It determines that a feature was added, so it automatically bumps the minor version of the package. It then generates a <VPIcon icon="fa-brands fa-markdown"/>`CHANGELOG.md` file, listing exactly what changed, and creates a git tag for the release. This turns a manual, error-prone release process into a single command.

---

## Key Benefits in a Flutter Monorepo

There are three primary benefits specific to the Flutter ecosystem when using this architecture.

The first benefit is the Single Source of Truth. Without a monorepo, the Rider app might use version 1.0 of your API client while the Driver app uses version 2.0. This leads to bugs that are impossible to reproduce. In a monorepo, there is one version of the truth. If you update the API client, you update it for everyone simultaneously.

The second benefit is Unified Tooling. You can run `flutter test` across every single package in your company with one command. You can run static analysis on the whole codebase. This ensures that a junior developer working on the UI library adheres to the same code quality standards as a senior engineer working on the core payment logic.

The third benefit is Atomic Refactoring. If you decide to rename `User.id` to `User.uuid`, you can use your IDE to rename it across the Rider app, Driver app, and Admin panel in a single operation. You don’t have to open three different windows or submit three different pull requests.

---

## Dart Workspaces

Managing dependencies and tooling across multiple packages used to require complex external workarounds. However, with the release of Dart 3.6, the ecosystem introduced native Pub Workspaces.

A Workspace allows multiple packages to share a single dependency resolution context. This means they share a single `pubspec.lock` file at the root, ensuring that all apps and packages use the exact same versions of shared dependencies. If `shared_services` needs `http: ^1.0.0` and `rider_app` needs `http: ^1.0.0`, the workspace ensures they both resolve to the exact same version, for example, 1.2.0. It also allows the Dart analyzer to treat the entire monorepo as a single cohesive unit. Your IDE no longer needs to spin up a separate analysis server instance for every package. This drastically reduces memory usage and makes Go to Definition and Find References instant across the entire repository.

### How Workspaces Fit with Melos

You might wonder if you still need Melos if Dart Workspaces handle dependency linking. The answer is yes, as they’re complementary tools.

Dart Workspaces handle the low-level dependency resolution and file linking. Workspaces ensures that the code creates a valid graph and that packages can find each other on the disk without publishing to pub.dev.

Melos handles the high-level workflow orchestration. It runs scripts, manages versioning, and generates changelogs. It allows you to filter commands. For example, Melos allows you to say "Run tests only in packages that have changed since the last commit." Workspaces don’t do that. Workspaces make the code compile, and Melos makes the development lifecycle efficient.

---

## Implementation Guide

We’ll now walk through the process of creating this architecture from scratch.

### Initializing the Repository

First, we’ll create a directory for our project and initialize it as a Git repository. This establishes the root of our file structure.

```sh
mkdir ride_hailing_monorepo
cd ride_hailing_monorepo
git init
```

### Configuring the Root Workspace

We now need to tell Dart that this directory is the root of a workspace. We can do this by creating a <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file at the top level.

```yaml title="pubspec.yaml"
name: ride_hailing_monorepo
environment:
  sdk: ^3.6.0

workspace:
  - apps/rider_app
  - apps/driver_app
  - apps/admin_web
  - packages/core
  - packages/shared_models
  - packages/shared_services
  - packages/shared_ui
```

This file is critical. The `workspace` key is a list of strings. Each string points to a relative path where a package or app will reside. Note that we define these paths now, even though we haven’t created the folders yet. This pre-configuration helps us visualize the structure. The SDK version must be set to 3.6.0 or higher to support this feature.

### Installing and Configuring Melos

Melos is the tool that will help us execute commands across these packages. We’ll install it globally on our machine using Dart.

```sh
dart pub global activate melos
```

Next, we’ll create a <VPIcon icon="iconfont icon-yaml"/>`melos.yaml` file at the root. This file tells Melos where to find packages and what scripts we want to run.

```yaml title="melos.yaml"
name: ride_hailing_monorepo

packages:
  - apps/**
  - packages/**

scripts:
  analyze:
    run: melos exec -- flutter analyze
    description: Run analysis in all packages.

  test:
    run: melos exec --dir-exists="test" -- flutter test
    description: Run tests in packages that have tests.
```

The `packages` key uses glob patterns. `apps/**` means "look inside the apps folder and include every subdirectory." The `scripts` section allows us to define custom commands. The `analyze` script uses `melos exec`. This command iterates over every package found and runs `flutter analyze` inside it. The `test` script does the same but adds a filter `--dir-exists="test"`. This is smart – it tells Melos to skip packages that don’t have a test folder, saving time and preventing errors.

### Creating a Shared Core Package

Now we’ll begin creating the actual code modules. Let’s start with the `core` package, which holds pure Dart business logic. We’ll create the directory and generate the package files.

```sh
mkdir -p packages/core
cd packages/core
dart create --template=package .
```

After creating the files, we must modify the <VPIcon icon="fas fa-folder-open"/>`packages/core/`<VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file to opt-in to the workspace.

```yaml title="packages/core/pubspec.yaml"
name: core
description: Core logic and utilities.
version: 1.0.0
resolution: workspace

environment:
  sdk: ^3.6.0
```

The key line here is `resolution: workspace`. This tells Dart not to try and resolve dependencies for this package in isolation, but to look up at the root <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and participate in the shared dependency graph.

We can add some simple logic to <VPIcon icon="fas fa-folder-open"/>`packages/core/lib/`<VPIcon icon="fa-brands fa-dart-lang"/>`core.dart`:

```dart title="packages/core/lib/core.dart"
library core;

class FareCalculator {
  static double calculate(double km) {
    return km * 2.5;
  }
}
```

This `FareCalculator` is now a piece of logic that can be reused anywhere in our system.

### Creating a Shared UI Package

Next, we’ll create a UI package. Unlike the core package, this one depends on the Flutter framework because it contains widgets.

```sh
cd ../..
mkdir -p packages/shared_ui
cd packages/shared_ui
flutter create --template=package .
```

We’ll now edit <VPIcon icon="fas fa-folder-open"/>`packages/shared_ui/`<VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` to ensure it’s part of the workspace:

```yaml title="packages/shared_ui/pubspec.yaml"
name: shared_ui
description: Shared UI components.
resolution: workspace

environment:
  sdk: ^3.6.0

dependencies:
  flutter:
    sdk: flutter
```

Inside <VPIcon icon="fas fa-folder-open"/>`packages/shared_ui/lib/`<VPIcon icon="fa-brands fa-dart-lang"/>`shared_ui.dart`, we’ll define a reusable widget.

```dart title="packages/shared_ui/lib/shared_ui.dart"
import 'package:flutter/material.dart';

class PrimaryButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const PrimaryButton({
    super.key, 
    required this.label, 
    required this.onPressed
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text(label),
    );
  }
}
```

This `PrimaryButton` ensures that if we change our branding later, we only have to update this one file, and every app will reflect the change.

### Creating the Rider Application

Now we’ll create the consumer of these packages: the Rider App. Navigate to the apps folder and generate a standard Flutter application.

```sh
cd ../..
mkdir apps
cd apps
flutter create rider_app
```

We must link this app to our shared packages. Open <VPIcon icon="fas fa-folder-open"/>`apps/rider_app/`<VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and configure the dependencies.

```yaml title="apps/rider_app/pubspec.yaml"
name: rider_app
description: The Rider Application
resolution: workspace

environment:
  sdk: ^3.6.0

dependencies:
  flutter:
    sdk: flutter

  core:
    path: ../../packages/core
  shared_ui:
    path: ../../packages/shared_ui
```

There are two important things here. First, we’re adding `resolution: workspace` to opt-in. Second, we’ve defined our dependencies using `path`. The path `../../packages/core` tells Dart to go up two directories (out of `rider_app` and out of `apps`) and then down into `packages/core`. Because we’re using Workspaces, Dart handles this efficiently without needing to copy files.

### Bootstrapping the Monorepo

At this stage, we have created the files, but we haven't installed the dependencies. We’ll return to the root directory of the repository and run one command:

```sh
flutter pub get
```

This command is powerful. Because of the workspace configuration, it analyzes the root <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, finds all the member packages we listed, looks at all their individual <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` files, and resolves a single, conflict-free version of every library. It generates a single <VPIcon icon="fas fa-lock"/>`pubspec.lock` file at the root.

### Consuming Shared Code

Finally, we can use our shared code inside the Rider application. Open <VPIcon icon="fas fa-folder-open"/>`apps/rider_app/lib/`<VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`:

```dart :collapsed-lines title="apps/rider_app/lib/main.dart"
import 'package:flutter/material.dart';
// We import the packages just like they were from pub.dev
import 'package:core/core.dart';
import 'package:shared_ui/shared_ui.dart';

void main() {
  runApp(const MaterialApp(home: HomeScreen()));
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // We use the shared logic
    final double price = FareCalculator.calculate(12.5);

    return Scaffold(
      appBar: AppBar(title: const Text('Rider App')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Estimated Fare: \$$price'),
            const SizedBox(height: 20),
            // We use the shared widget
            PrimaryButton(
              label: 'Request Ride',
              onPressed: () {
                print('Ride requested!');
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

In this code, we’re importing `package:core/core.dart`. Even though this file lives on our local disk, we’re treating it like a third-party library. The `HomeScreen` calculates a fare using the shared logic and displays a button using the shared UI component.

---

## Best Practices

To maintain a healthy monorepo, you should adhere to strict boundaries. A UI package should never import a service package that makes API calls. This separation of concerns ensures that your UI remains "dumb" and purely focused on presentation, making it easier to test and preview.

Another best practice is to leverage Melos filtering. As your repository grows, running every test becomes slow. Melos allows you to run `melos run test --scope="rider_app"`. This command tells Melos to only run the test script inside the `rider_app` package, ignoring the others. This keeps your development loop fast.

You should also enforce code formatting globally. You can add a `format` script to your <VPIcon icon="iconfont icon-yaml"/>`melos.yaml` that runs `dart format .`. By running `melos run format`, you ensure that every file in every package adheres to the exact same style guidelines, reducing friction during code reviews.

---

## Common Mistakes

A frequent mistake is creating circular dependencies. This happens if Package A imports Package B, but Package B also imports Package A. This creates a loop that the compiler cannot resolve.

To avoid this, you can structure your dependency graph like a tree where dependencies flow downwards. The Core package is at the bottom, Services depend on Core, and Apps depend on Services.

Another common mistake is known as the God Package. This occurs when developers get lazy and dump all shared code into a single package named `shared` or `common`. This results in a bloated package that takes forever to compile and makes it hard to track what code is used where.

Instead of doing this, you should strive for granular packages like `analytics`, `auth`, `theme`, and `networking` so that apps only import exactly what they need.

---

## Conclusion

Monorepos are not a trend but a proven architectural pattern for managing complexity in multi-application systems. By structuring your ride-hailing platform around shared packages and explicit boundaries, you gain consistency, faster development, safer refactoring, and better long-term scalability.

The combination of Dart Workspaces for dependency resolution and Melos for workflow orchestration provides a robust foundation for any Flutter team. The key insight is that applications are merely the glue that binds your shared packages together. Once you internalize this model, building complex systems becomes significantly more manageable.

---

## References

I used the following official resources and documentation to construct this guide. I recommend them for further reading and deeper understanding:

### Melos

- [<VPIcon icon="fas fa-globe"/>Melos Documentation (Invertase)](https://melos.invertase.dev) – Official documentation for the Melos CLI tool, maintained by Invertase. Covers installation, scripts, and lifecycle management for Dart and Flutter monorepos.
- [<VPIcon icon="fas fa-globe"/>Melos Package (pub.dev)](https://pub.dev/packages/melos) – Registry entry for the Melos package, including version history, installation commands, and setup instructions.

### Dart Workspaces & Package Management

- [<VPIcon icon="fas fa-globe"/>Dart Workspaces Guide](https://dart.dev/tools/pub/workspaces) – Official Dart documentation on the native workspace feature (introduced in Dart 3.6). Explains resolution contexts and `pubspec` configuration
- [<VPIcon icon="fas fa-globe"/>Dependencies and Path Packages](https://dart.dev/tools/pub/dependencies#path-packages) – Detailed explanation of how Dart handles local path dependencies, which is the underlying mechanism for linking packages within a monorepo.

### Flutter Packages & Plugins

- [<VPIcon icon="fas fa-globe"/>Developing Packages and Plugins (Flutter)](https://docs.flutter.dev/packages-and-plugins/developing-packages) – Comprehensive guide from the Flutter team on creating, structuring, and maintaining reusable Dart and Flutter packages in a monorepo.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Monorepos in Flutter",
  "desc": "As Flutter applications grow beyond a single mobile app, teams quickly encounter a new class of problems. Shared business logic begins to be copied across projects. UI components drift out of sync. Fixes in one app don’t propagate cleanly to others. ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-monorepos-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
