---
lang: en-US
title: "Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt"
description: "Article(s) > Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt"
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
      content: "Article(s) > Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt"
    - property: og:description
      content: "Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/decoupling-material-and-cupertino-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2026-01-17
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768589028324/ec74c3ba-9d2d-4daf-a292-bbd9f8ef6f12.png
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
  name="Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt"
  desc="As Flutter developers, we know that Flutter’s “batteries included” philosophy has long been its superpower. Built on the simple premise to ”paint every pixel,” the framework shipped with everything needed to build a real app out of the box: a renderi..."
  url="https://freecodecamp.org/news/decoupling-material-and-cupertino-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768589028324/ec74c3ba-9d2d-4daf-a292-bbd9f8ef6f12.png"/>

As Flutter developers, we know that Flutter’s “batteries included” philosophy has long been its superpower.

Built on the simple premise to "paint every pixel," the framework shipped with everything needed to build a real app out of the box: a rendering engine, a complete widget system, and, crucially, the Material and Cupertino design systems bundled directly into the core SDK. This tight integration made Flutter easy to adopt and incredibly productive, allowing you to run `flutter create` and immediately have a functional, platform-aware UI.

But as Flutter has grown from a mobile UI toolkit into a multi-platform application framework supporting Web, Windows, macOS, Linux, and embedded devices, this coupling has become a bottleneck. Core widgets are now inextricably tied to specific design systems, making it challenging to build fully custom or non-Material UIs and slowing down the independent evolution of those design libraries.

To address this, the framework is undergoing its most significant architectural shift yet: a multi-year refactor known as **“Decoupling Design”** (often discussed in conjunction with the **“Blank Canvas”** initiative). This isn’t just a cleanup, but a fundamental restructuring of the framework’s dependency graph to physically separate Material and Cupertino from the core SDK.

In this article, we’ll take a technical dive into the engineering reasons behind this shift, explore the circular dependency challenges in the current architecture, and outline strategies for writing Flutter code today that will be resilient when this migration is completed this year.

::: note Prerequisites

To understand why this decoupling is necessary, we first need to correct a common misconception about how Flutter is built. Many developers view Flutter as a monolithic block, but in reality, it’s a Layered Architecture designed to be strictly hierarchical. Each layer should only depend on the layer below it.

At the bottom lies the **Embedder**, the platform-specific entry point that negotiates with the operating system (Android, iOS, or Windows). Sitting on top of that is the **Engine**, written in C++, which handles the Dart Runtime, graphics (Skia/Impeller), and text layout.

The layer we interact with daily is the **Framework (Dart)**. Ideally, this should flow upwards in complexity:

1. **Foundation:** Basic utility classes like `Key` and meta-programming tools.
2. **Animation/Painting/Gestures:** The primitives of visual output and input.
3. **Rendering:** The abstraction of the layout tree (RenderObjects).
4. **Widgets:** The composition abstraction (Element Tree).
5. **Material / Cupertino:** The top-level design libraries.

![Flutter Architectural Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1768437192760/5ff7bd98-14b5-4001-b120-4310fe3306d0.png)

:::

---

## The Architectural Violation

Theoretically, the widgets layer should be completely design-agnostic, serving as a pure abstraction for composing UI.

In reality, the current Flutter SDK contains circular dependencies and violations of dependency inversion: the widgets library implicitly relies on logic inside Material or Cupertino to handle platform-specific behavior, which effectively tangles the core framework with the UI design system and makes it harder to build truly modular, custom, or platform-independent widgets.

### The Problem: The “AppBar” Paradox

Why does this coupling matter? It prevents true modularity. To illustrate this, let’s look at a specific technical bottleneck: the App Bar.

In Flutter, the `AppBar` widget provides a convenient way to display a top navigation bar with a title, actions, and optional leading/back buttons.

```dart
Scaffold(
  appBar: AppBar(
    title: Text('My App'),
    actions: [
      IconButton(icon: Icon(Icons.search), onPressed: () {}),
    ],
  ),
  body: Center(child: Text('Hi freeCodeCampers!')),
)
```

On the surface, `AppBar` looks like a generic layout widget. It lives in the widgets library, so you might assume it’s design-agnostic.

But under the hood, `AppBar` is tightly coupled to **Material Design**. It uses `Material` widgets, theming, shadows, and ripple effects. If you want a similar top bar on iOS, you must use `CupertinoNavigationBar`, which is completely separate.

![`AppBar` widget diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1768435605823/6d4795d0-ecd5-4685-954c-14d2a6ed83b3.jpeg)

#### The Paradox

Today, `AppBar` exists in the widgets ecosystem but is inherently opinionated: it assumes Material Design. This implicit coupling creates two problems:

1. **Bloat:** Even if you are building a fully custom or branded UI, using `AppBar` pulls in Material dependencies you may not need.
2. **Versioning lockstep:** Updates to Material (for example, new Material 3 features) can’t ship independently as a package. Instead, they have to wait for a full Flutter SDK release because the design logic is baked into core widgets.

This isn’t an isolated case. A clear example of a newer widget facing the same challenge is SelectionArea, introduced in Flutter 3.3. This widget allows users to select text across a subtree, which seems simple and unopinionated:

```dart
SelectionArea(
  child: Column(
    children: [
      Text('Hi freeCodeCampers!'),
      Text('Select me!'),
    ],
  ),
)
```

At first glance, `SelectionArea` lives in the widgets library, so it should be design-agnostic. But when a user selects text on Android, Flutter must render Material Design handles (the little teardrops) and a Material toolbar with Copy/Paste/Select All. On iOS, it must render Cupertino handles instead.

![Diagram of selection area](https://cdn.hashnode.com/res/hashnode/image/upload/v1768437419047/4f96740f-9d90-4f8d-9cd9-f528b4d30a69.png)

The Flutter team has highlighted this type of implicit dependency as a technical bottleneck. Even though `SelectionArea` is part of the core widgets layer, it relies on Material and Cupertino components through hardcoded logic.

By looking at both `AppBar` and `SelectionArea`, it becomes clear why the Flutter team is decoupling Material and Cupertino from the core SDK to reduce unnecessary dependencies, enable true modularity, and allow design systems to evolve independently of framework releases.

### The Scroll Physics Dilemma

To prove this isn't isolated to text, consider scrolling. When you use a generic `ListView` (which relies on `Scrollable`), you expect it to just work. But `Scrollable` needs to know *how* to react when you hit the edge of the list. On Android, it paints a "Stretching Overscroll Indicator" (Material). On iOS, it performs "Bouncing Scroll Physics" (Cupertino).

Currently, the generic `Scrollable` widget has to reach *up* into the design layers to ask, "Hey, what physics should I use?" This prevents the core framework from ever being truly lightweight.

---

## The Solution: The "Blank Canvas" Strategy

The "Decoupling Design" project aims to physically remove `package:flutter/material` and `package:flutter/cupertino` from the SDK and republish them as standard packages on `pub.dev`.

This transforms Flutter from an "Opinionated UI Toolkit" into a "UI Platform" where Material is just a plugin, identical in status to third-party design systems like `fluent_ui` or `shadcn_flutter`.

![Flutter Design Decoupling](https://cdn.hashnode.com/res/hashnode/image/upload/v1768435796988/5e55bddf-00d1-47c4-a448-abdf4bfc518b.jpeg)

### Extracting Logic to "Raw" Widgets

To make this possible, the Flutter team is stripping the *behavior* out of the design widgets and moving it down into the `widgets` layer. These are often called **"Raw"** or **"Blank Canvas"** widgets.

#### The Old Way (ElevatedButton):

Currently, ElevatedButton bundles three things together:

1. **State Management:** Hover, Focus, Press states.
2. **Accessibility:** Semantics and screen reader announcements.
3. **Painting:** Shadows, ripples, rounded corners, colors.

#### The New Way (RawButton + Builder):

The framework will introduce a generic button primitive (for example, Button or RawButton) that handles State and Accessibility but paints nothing.

```dart
// Conceptual example of the new "Blank Canvas" architecture
RawButton(
  onPressed: _submit,
  // The 'states' set contains: hovered, focused, pressed, disabled
  builder: (BuildContext context, Set<WidgetState> states) {
    // YOU define the painting entirely.
    // No default shadows. No default ripples. No Material logic.
    return Container(
      decoration: BoxDecoration(
        color: states.contains(WidgetState.pressed) ? Colors.blue[900] : Colors.blue,
      ),
      padding: EdgeInsets.all(16),
      child: Text("Submit"),
    );
  },
);
```

This allows the Material package to simply be a *consumer* of the `RawButton`, applying Material styling to it. Simultaneously, you can build your custom "Brand Design System" directly on top of `RawButton` without fighting Material's default padding or overlay colors.

![Raw Button Widget Composition Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1768435715052/af1b0684-2972-4b69-a451-1e4342f3b412.jpeg)

### Standardizing Theme Infrastructure

Currently, `ThemeData` is a massive, monolithic class specifically designed for Material. The decoupling effort involves creating a shared, design-agnostic theming infrastructure in the `widgets` layer, allowing different design systems to share a common way to propagate design tokens (colors, typography) down the tree.

---

## Flutter’s Architecture After Design System Decoupling

After decoupling, Flutter’s architecture becomes aligned with what its layering has *always promised*, but never fully delivered in practice.

The core `widgets` layer becomes truly design-agnostic. Widgets are responsible only for structure, interaction, and behavior, without making assumptions about how things should look. Concepts like text selection, focus, scrolling, and gestures exist as neutral capabilities, not as visual implementations tied to any design language.

Visual decisions, such as selection handles, context menus, padding conventions, and affordances, are no longer hardcoded inside core widgets. Instead, they are provided by an explicit **platform adaptation layer**. This layer acts as a bridge between neutral widget behavior and the chosen design system.

Material and Cupertino move into their intended roles as **pure design systems**. They supply visuals, theming, and platform-specific conventions, but they do not leak into widget internals. A widget like `SelectionArea` no longer needs to “know” about Material or Cupertino – it simply asks for a selection UI, and the active design system provides it.

This shift reverses an important dependency mistake. Today, core widgets implicitly depend on design systems. After decoupling, design systems depend on widgets instead. That inversion is what makes the architecture scalable.

The result is a framework where:

- Core widgets are stable, reusable, and platform-neutral
- Design systems are optional, swappable, and extensible
- New platforms and custom design systems can integrate without modifying Flutter’s internals

In short, decoupling doesn’t change Flutter’s architecture. It finally makes it real.

![Flutter’s Architecture After Design System Decoupling](https://cdn.hashnode.com/res/hashnode/image/upload/v1768438023809/0682e095-1f48-4c9b-a1bd-4e2d18dbdee3.png)

---

## The Roadmap: What to Expect

Based on the "Flutter Flight Plans" and open GitHub issues, here is the projected timeline:

### Phase 1: Logic Migration (Late 2025)

The team has been actively refactoring the widgets library, introducing more Platform Interface classes and Raw widgets to ensure the widgets layer contains 100% of the logic required to build components like buttons, sliders, and switches without importing Material.

### Phase 2: The Physical Move (2026)

Material and Cupertino code will be moved to the flutter/packages repository, the SDK versions of these libraries will be deprecated, and developers will need to migrate by explicitly adding the new packages to their <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`.

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  # The new reality:
  material: ^1.0.0
  cupertino: ^1.0.0
```

### Phase 3: The Independent Era (2026+)

Material 4 (or whatever comes next) can be released as `material: ^2.0.0`, without requiring a Flutter SDK upgrade.

---

## What Happens to Old Projects?

If you have a massive production app today, you might be panicked. Don't be. The transition is designed to be "semantically breaking but mechanically automated."

### The "Add to Pubspec" Era

When the decoupling is finalized (Phase 2/3), the Material and Cupertino libraries will disappear from the global SDK namespace.

::: tip The Fix

You will simply add them as dependencies, just like you add `provider` or `bloc`.

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  # You now explicitly control your design system version
  material: ^1.0.0
  cupertino: ^1.0.0
```

:::

### Legacy Support

Existing projects won't suddenly fail to compile *if* you run the migration tools. The `dart fix` command will likely handle the addition of dependencies and import adjustments. The existing classes (`Scaffold`, `AppBar`) aren't going away, they’re just moving house.

---

## Adopting the Mindset

You don’t need to wait until this fully happens to begin writing Flutter code that will survive the ongoing decoupling of Material and Cupertino. What Flutter is moving toward aligns closely with principles that already define clean architecture, especially the idea that frameworks and design systems should sit at the edges of your application rather than at its core.

We’re currently in a transition phase, which makes this the best time to adjust how you structure your apps so future changes feel incremental instead of disruptive.

A practical place to start is by being intentional about what you import and where. Many Flutter developers import `package:flutter/material.dart` by default, even in files that contain only business logic, state management, or data models. This habit silently couples your core code to a specific design system, even when no UI is being rendered.

In files that define models, BLoCs, repositories, or services, you should instead rely on `package:flutter/foundation.dart`, which provides essential utilities without pulling in any UI assumptions.

```dart
import 'package:flutter/foundation.dart';

class AuthState {
  final bool isLoading;

  const AuthState({required this.isLoading});
}
```

When you need to build layout or reusable UI that is not tied to Material or Cupertino styling, you can depend on `package:flutter/widgets.dart`. This allows you to compose interfaces using Flutter’s core primitives while keeping design decisions separate from structure.

```dart
import 'package:flutter/widgets.dart';

class CenteredText extends StatelessWidget {
  final String text;

  const CenteredText(this.text);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(text),
    );
  }
}
```

Material or Cupertino should only be imported in leaf widgets that actually render components from those libraries. By doing this consistently, your business logic and most of your UI remain unaffected if Flutter introduces new design-agnostic primitives or changes how existing systems work.

Another important mindset shift is avoiding reliance on adaptive constructors such as `Switch.adaptive`. While these APIs are convenient, they delegate design decisions to Flutter in a way that makes your app dependent on platform heuristics. If you are building a custom design system or planning for long-term flexibility, it’s better to define your own abstraction and decide how each platform should behave explicitly.

```dart
abstract class AppDesignSystem {
  Widget buildSwitch({
    required bool value,
    required ValueChanged<bool> onChanged,
  });
}
```

A Material-based implementation can live entirely at the UI layer without leaking into the rest of the app.

```dart
import 'package:flutter/material.dart';

class MaterialDesignSystem implements AppDesignSystem {
  @override
  Widget buildSwitch({
    required bool value,
    required ValueChanged<bool> onChanged,
  }) {
    return Switch(
      value: value,
      onChanged: onChanged,
    );
  }
}
```

With this approach, your application code depends on your own interface rather than on Flutter’s adaptive behavior, making future changes deliberate instead of accidental.

When creating shared widgets or internal libraries, you should also move away from inheriting from Material widgets like `ElevatedButton`. Extending these widgets ties your components to internal styling and behavior that Flutter is actively evolving.

A more future-proof approach is to compose your own components using lower-level primitives such as `GestureDetector`, `FocusableActionDetector`, and `AnimatedContainer`.

```dart :collapsed-lines
import 'package:flutter/widgets.dart';

class AppButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget child;

  const AppButton({
    required this.onPressed,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return FocusableActionDetector(
      child: GestureDetector(
        onTap: onPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: const Color(0xFF0066FF),
          ),
          child: DefaultTextStyle(
            style: const TextStyle(color: Color(0xFFFFFFFF)),
            child: child,
          ),
        ),
      ),
    );
  }
}
```

This pattern aligns naturally with Flutter’s direction toward raw and modular primitives, and it ensures that your design system remains under your control rather than being inherited from a framework layer.

Keeping your Flutter SDK up to date also plays an important role in this transition. New stable releases increasingly introduce modular APIs and improvements that make decoupling smoother over time. Following the Flutter roadmap and understanding where the framework is headed allows you to adopt changes gradually instead of reacting to them under pressure.

Ultimately, future-proofing your Flutter code is less about predicting what replaces Material and more about treating design systems as replaceable details. When UI, logic, and structure are cleanly separated, migrations become mechanical work rather than risky rewrites. That is the mindset Flutter’s evolution is encouraging, and it is one you can start adopting today.

---

## The Advantages: Why is this better?

This refactor is a lot of work. Why is the Flutter team doing it?

### 1. Independent versioning

This is the big one. In the future, **Material 4** can launch as `material: ^2.0.0`. You can upgrade to it immediately without waiting for Flutter 4.0. On the other hand, you can stick to Material 3 while still upgrading the Flutter Engine for performance boosts.

### 2. Smaller app size

If you are building a dedicated iOS app, why should you be forced to bundle the code for Android's Material Date Picker? Decoupling allows for true tree-shaking of unused design systems.

### 3. Third-party equality

Currently, packages like `fluent_ui` (Windows design) or `shadcn_flutter` feel like second-class citizens compared to Material. Once Material is just a package, all design systems are architecturally equal.

### 4. Faster "core" innovation

The core framework team can focus on performance, layout, and text rendering without getting bogged down in discussions about the corner radius of a floating action button.

---

## Conclusion

The decoupling of design from the Flutter framework is a sign of maturity. It signals that Flutter is graduating from a "Mobile UI Kit" to a true "Universal Rendering Engine.”

For the casual developer, this will manifest as a simple change in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`. But for the software engineer, it represents an opportunity to build cleaner, more modular, and more performant applications that are truly independent of Google's design opinions.

::: info References

<SiteInfo
  name="Flutter architectural overview"
  desc="A high-level overview of the architecture of Flutter, including the core principles and concepts that form its design."
  url="https://docs.flutter.dev/resources/architectural-overview"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<VidStack src="youtube/W4olXg91iX8" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Decoupling Material and Cupertino in Flutter: Why It Matters and How to Adapt",
  "desc": "As Flutter developers, we know that Flutter’s “batteries included” philosophy has long been its superpower. Built on the simple premise to ”paint every pixel,” the framework shipped with everything needed to build a real app out of the box: a renderi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/decoupling-material-and-cupertino-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
