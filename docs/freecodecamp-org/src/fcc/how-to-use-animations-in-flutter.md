---
lang: en-US
title: "How to Use Animations in Flutter"
description: "Article(s) > How to Use Animations in Flutter"
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
      content: "Article(s) > How to Use Animations in Flutter"
    - property: og:description
      content: "How to Use Animations in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-animations-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-10-04
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759507962194/9f1bff80-2205-4e63-a6b7-8fee605bc5fa.png
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
  name="How to Use Animations in Flutter"
  desc="Animations are a fundamental aspect of mobile app development. They go beyond just adding visual appeal, and have become essential for enhancing the overall user experience. Flutter, Google's open-source UI development toolkit, lets you create seamle..."
  url="https://freecodecamp.org/news/how-to-use-animations-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759507962194/9f1bff80-2205-4e63-a6b7-8fee605bc5fa.png"/>

Animations are a fundamental aspect of mobile app development. They go beyond just adding visual appeal, and have become essential for enhancing the overall user experience.

Flutter, Google's open-source UI development toolkit, lets you create seamless and engaging animations effortlessly. Let's delve deeper into why animations are crucial and how Flutter makes animation development an exciting and creative endeavor.

::: note Prerequisites

Before diving into Flutter animations, make sure your development environment is ready. You should have:

- **Flutter SDK installed and added to PATH**. You can confirm this by running `flutter doctor`, which checks your setup for common issues and ensures everything needed for Flutter development is properly installed.
- **Basic knowledge of Dart and Flutter widgets**, including `StatelessWidget`, `StatefulWidget`, and understanding the `build()` method.
- **An IDE** like VS Code or Android Studio, with Flutter plugins installed.
- **A device or emulator** available to run your projects using `flutter run`.
- **Familiarity with async/await** and Dart null-safety (`late`, non-nullable types).

:::

---

## Quick Setup Commands

For this guide, we’ll use a simple demo project called `animation_demo` to explore various animations. Here’s how to get started:

```sh
flutter doctor
flutter create animation_demo
cd animation_demo
flutter run
```

- `flutter doctor`: checks your environment and tells you if anything is missing.
- `flutter create animation_demo`: scaffolds a new Flutter project called `animation_demo`.
- `flutter run`: launches the app on a connected device or emulator.

With this setup, we can start experimenting with animations.

---

## Why Animations Matter

Animations are not just about making an app look fancy. They also play a crucial role in improving user experience. Thoughtful animations help users understand your interface, provide feedback, and make your app feel smoother and more engaging.

For example, visual feedback is essential when a user interacts with your app. A button press might slightly scale down or produce a ripple effect to indicate that the action has been recognized. Smooth transitions also help users understand navigation or changes in the interface. Moving from a list view to a detail view using a hero animation feels intuitive rather than abrupt or jarring.

Finally, well-designed animations can increase engagement and perceived performance. Subtle movements, transitions, or loading indicators can make an app feel faster and more responsive. When animations are thoughtfully implemented, they elevate the overall quality of the application, making it feel polished and professional.

---

## High-Level Types of Flutter Animations

Flutter offers a variety of animation types to handle different scenarios. Understanding these types conceptually is important before jumping into the code:

### Implicit Animations

These are simple, property-based animations that require minimal setup. For example, animating a container’s width, height, or color can be done with widgets like `AnimatedContainer`, `AnimatedOpacity`, or `AnimatedPositioned`. Implicit animations are ideal for straightforward changes without needing fine-grained control.

### Explicit Animations

Explicit animations give you full control over timing, easing, and the animation lifecycle. You use `AnimationController`, `Tween`, and widgets like `AnimatedBuilder` or `AnimatedWidget` to create custom, complex animations. Explicit animations are best when you need precise control over multiple properties or custom behavior.

### Physics-based Animations

Physics-based animations simulate natural motion using Flutter’s `flutter/physics` library. Examples include `SpringSimulation` and `FlingSimulation`. These are perfect when you want realistic, natural-feeling motion, such as draggable widgets or bouncy UI elements.

### Hero Animations

Hero animations enable shared element transitions between screens. Using the `Hero` widget, you can animate a widget from one route to another, making transitions feel fluid and connected.

### Staggered & Sequence Animations

Staggered animations let you time multiple animations to start at different moments. `TweenSequence` allows multi-stage, chained animations within a single controller. These techniques are useful for orchestrating complex UI movements.

Let’s now go through each of these types of animations so you can see how they work in practice.

---

## Implicit Animations

Implicit animations let you animate widget property changes automatically. Let’s see an example with `AnimatedContainer`:

```dart
AnimatedContainer(
  duration: Duration(milliseconds: 300),
  width: _isExpanded ? 200 : 100,
  height: _isExpanded ? 200 : 100,
  color: _isExpanded ? Colors.blue : Colors.grey,
  curve: Curves.easeInOut,
  child: Center(child: Text('Tap')),
)
```

Here’s what’s going on in this code:

- `AnimatedContainer`: automatically animates changes to its properties.
- `duration`: sets how long the animation takes.
- `width` / `height`: animates between 100 and 200 depending on `_isExpanded`.
- `color`: animates from grey to blue.
- `curve`: controls acceleration/deceleration, making movement feel natural.
- `child`: optional child widget, which is not animated unless its own properties change.

Implicit animations are perfect for quick, property-based effects with minimal code.

---

## Explicit Animations

Explicit animations require more setup but give full control. Here’s a complete, modern, null-safe example that scales a button:

```dart :collapsed-lines
import 'package:flutter/material.dart';

class ScaleDemo extends StatefulWidget {
  @override
  _ScaleDemoState createState() => _ScaleDemoState();
}

class _ScaleDemoState extends State<ScaleDemo> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(seconds: 1),
      vsync: this,
    );
    _animation = Tween<double>(begin: 0.5, end: 1.5).animate(_controller);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scale Animation')),
      body: Center(
        child: AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.scale(
              scale: _animation.value,
              child: child,
            );
          },
          child: ElevatedButton(
            onPressed: () {
              if (_controller.status == AnimationStatus.completed) {
                _controller.reverse();
              } else {
                _controller.forward();
              }
            },
            child: const Text('Animate'),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
```

Let’s look at the key concepts from this code:

- **AnimationController**: controls the animation timeline from 0.0 to 1.0.
- **Tween**: maps the controller values to a range (here, 0.5 → 1.5 for scaling). A tween defines the start and end values of an animation.
- **AnimatedBuilder**: rebuilds only the widgets inside its builder during animation ticks, optimizing performance.
- **Child parameter in AnimatedBuilder**: avoids rebuilding expensive widgets each frame. In this example, the button is passed as `child` to prevent unnecessary rebuilds.

You can also use a simpler `TextButton` with the same animation logic:

```dart
TextButton(
  onPressed: () {
    if (_controller.status == AnimationStatus.completed) {
      _controller.reverse();
    } else {
      _controller.forward();
    }
  },
  child: Text('Animate'),
)
```

---

## Curved Animations

Animations often feel unnatural if they move linearly. **CurvedAnimation** modifies the progression of the animation to make it more natural:

```dart
_controller = AnimationController(
  duration: Duration(seconds: 2),
  vsync: this,
);
_animation = CurvedAnimation(
  parent: _controller,
  curve: Curves.easeInOut,
);
```

**CurvedAnimation** wraps a controller and applies a curve to remap 0→1 linearly into eased values.

Often, you combine a CurvedAnimation with a Tween like this:

```dart
_animation = Tween<double>(begin: 0, end: 1).animate(
  CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
);
```

**Tween** here defines the start and end value of an animation, providing the numeric range that the controller drives.

---

## Chaining Animations (Translation + Rotation)

Sometimes, you want a widget to move and rotate simultaneously. Here’s how to set up such animations:

```dart
import 'dart:math' as math;

_translation = Tween<double>(begin: 0, end: 100).animate(_controller);
_rotation = Tween<double>(begin: 0, end: 2 * math.pi).animate(_controller);
```

This is what’s going on here:

- `math.pi` is used for rotation calculations.
- `_translation` moves the widget 100 pixels horizontally.
- `_rotation` rotates the widget 360 degrees (2π radians).

You can wrap both in a nested `Transform` inside `AnimatedBuilder` like this:

```dart
Transform.translate(
  offset: Offset(_translation.value, 0),
  child: Transform.rotate(angle: _rotation.value, child: YourWidget()),
);
```

---

## Staggered Animations

Staggering allows multiple animations to run at different intervals on the same controller:

```dart
_controller = AnimationController(duration: Duration(seconds: 2), vsync: this);

_animation1 = Tween<double>(begin: 0, end: 1).animate(
  CurvedAnimation(
    parent: _controller,
    curve: Interval(0.0, 0.5, curve: Curves.easeInOut),
  ),
);

_animation2 = Tween<double>(begin: 0, end: 1).animate(
  CurvedAnimation(
    parent: _controller,
    curve: Interval(0.5, 1.0, curve: Curves.easeInOut),
  ),
);
```

- **Interval** defines when each animation starts and ends relative to the controller’s timeline.
- Both animations share the same controller but run in sequence.

---

## Hero Animations

Hero animations create smooth transitions between routes:

**First Screen:**

```dart
class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(context, MaterialPageRoute(builder: (context) => SecondScreen()));
      },
      child: Hero(
        tag: 'hero-tag',
        child: Image.asset('assets/avatar.png', width: 100, height: 100),
      ),
    );
  }
}
```

**Second Screen:**

```dart
class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Hero(
          tag: 'hero-tag',
          child: Image.asset('assets/avatar.png', width: 300, height: 300),
        ),
      ),
    );
  }
}
```

- **Hero widget** animates the shared element between routes.
- **Tag** must be unique for each shared animation.
- Automatically interpolates size, position, and shape.

---

## AnimatedBuilder with Multiple Properties

You can animate several properties simultaneously:

```dart
_controller = AnimationController(duration: Duration(seconds: 2), vsync: this);

_width = Tween<double>(begin: 100, end: 200).animate(_controller);
_height = Tween<double>(begin: 100, end: 200).animate(_controller);

AnimatedBuilder(
  animation: _controller,
  builder: (context, child) {
    return Container(
      width: _width.value,
      height: _height.value,
      child: child,
    );
  },
  child: YourWidget(),
)
```

- Multiple `Tween<double>` objects progress together with one controller.
- Using `child` prevents unnecessary rebuilds of the widget subtree.

---

## Gesture-based Animations

Gesture-based animations respond to direct user interactions like taps, drags, swipes, or long presses. These are especially useful when building interactive UIs such as draggable cards, swipe-to-dismiss lists, or custom sliders.

In the example below, the animation listens for horizontal drag gestures (`onPanUpdate` and `onPanEnd`). As the user drags, the widget smoothly follows the finger. When the gesture ends, the animation decides whether to snap forward or reverse depending on how far the user has dragged.

```dart
_controller = AnimationController(duration: Duration(milliseconds: 300), vsync: this);
_position = Tween<double>(begin: 0, end: 200).animate(_controller);

GestureDetector(
  onPanUpdate: (details) {
    _controller.value -= (details.primaryDelta ?? 0) / 200;
  },
  onPanEnd: (_) {
    if (_controller.value > 0.5) {
      _controller.forward();
    } else {
      _controller.reverse();
    }
  },
  child: AnimatedBuilder(
    animation: _controller,
    builder: (context, child) {
      return Transform.translate(offset: Offset(_position.value, 0), child: YourWidget());
    },
  ),
)
```

- `onPanUpdate` maps gesture movement to controller progress.
- `onPanEnd` determines the final animation state.

---

## AnimatedSwitcher

`AnimatedSwitcher` is ideal when you want to swap between two widgets with a smooth transition, such as toggling between login and signup forms, or replacing a loading spinner with actual content. It automatically handles fading, scaling, or custom transitions when the child widget changes.

For example, you can switch between widgets with a crossfade animation:

```dart
AnimatedSwitcher(
  duration: Duration(seconds: 1),
  child: _showFirstWidget ? YourFirstWidget() : YourSecondWidget(),
)
```

**Keys** ensure AnimatedSwitcher recognizes different widgets:

```dart
AnimatedSwitcher(
  duration: Duration(milliseconds: 500),
  child: _showFirstWidget
      ? Container(key: ValueKey('first'), child: YourFirstWidget())
      : Container(key: ValueKey('second'), child: YourSecondWidget()),
)
```

---

## TweenSequence

Use `TweenSequence` when you want an animation that passes through multiple stages in a single timeline, like pulsing a button (grow -> shrink -> reset) or animating a progress bar with different speeds at different phase

You can create multi-stage animations like this:

```dart
_controller = AnimationController(duration: Duration(seconds: 4), vsync: this);

_animation = TweenSequence<double>([
  TweenSequenceItem(tween: Tween(begin: 0.0, end: 1.0), weight: 1),
  TweenSequenceItem(tween: Tween(begin: 1.0, end: 0.0), weight: 1),
]).animate(_controller);
```

- Each stage is defined by a `TweenSequenceItem`.
- Weight determines relative duration.

---

## Physics-based Animations

Physics-based animations are best for interactions that should feel “natural”, like bouncing, springing, flinging, or decelerating motion. For example, you can use them for draggable sheets, swipe-to-dismiss cards, or elastic overscroll effects. Unlike fixed-duration animations, they rely on parameters like mass, stiffness, and damping to simulate real-world physics.

If you want to simulate realistic motion, this is how you can do it:

```dart
import 'package:flutter/physics.dart';

final SpringDescription spring = SpringDescription(mass: 1, stiffness: 100, damping: 10);
final SpringSimulation sim = SpringSimulation(spring, 0.0, 1.0, 0.0);
_controller.animateWith(sim);
```

SpringSimulation drives the animation according to physics parameters.

---

## Tips, Best Practices & Cheat Sheet

- Use vsync with TickerProvider mixins to reduce CPU and battery usage. For example, `SingleTickerProviderStateMixin` ensures the animation only ticks when the screen is visible, reducing wasted CPU cycles and saving battery.
- Always dispose controllers in `dispose()`. Failing to dispose `AnimationController` can cause memory leaks. Always call `_controller.dispose()` in your `State` class.
- Prefer const constructors where possible for better rebuild performance. Using `const` for static widgets like icons or text prevents them from rebuilding unnecessarily.
- Wrap only the portion that needs animation and minimize rebuild areas. Don’t wrap your entire screen in `AnimatedBuilder`. Instead, isolate just the widget that changes (for example, a single button scaling).
- Profile using Flutter DevTools if frames drop below 60fps: If you notice dropped frames, open the Performance tab in DevTools to identify expensive rebuilds or heavy animations.
- Keep animations subtle, as overuse can harm UX. For example, a button scaling from 1.0 to 1.05 feels natural. Scaling to 1.5 might feel jarring unless it’s intentional.
- Test animations on real devices. Simulators often run animations smoothly. Test on mid-range Android phones to ensure performance is acceptable.

**Common helpers and widgets:**

- **Implicit**: `AnimatedContainer`, `AnimatedOpacity`, `AnimatedPositioned`, `AnimatedCrossFade`, `AnimatedSwitcher`. This is best for quick, one-line property changes.
- **Explicit utilities**: `AnimationController`, `Tween`, `CurvedAnimation`, `AnimatedBuilder`, `AnimatedWidget`. Use these when you need precision and lifecycle control.
- **Physics**: `SpringSimulation`, `FlingSimulation`, `ClampingScrollSimulation`. This is great for natural drag and bounce effects.
- **Transitions**: `Hero`, `PageRouteBuilder`. This is best for cross-screen navigation and shared elements.
- **Gesture-driven**: `GestureDetector`, `Draggable`, `Dismissible`. Use these when you want direct interaction like dragging or swiping.

---

## Conclusion

Animations in Flutter are more than just eye candy. They’re tools for guiding users, providing feedback, and making apps feel alive. From simple implicit animations to advanced physics-based interactions, Flutter gives you the flexibility to craft experiences that feel natural and engaging.

As you experiment, start small with implicit animations, then move into explicit and gesture-driven techniques for more control. Always keep performance and user experience in mind: subtle, purposeful animations go a long way toward making your app feel polished.

With these building blocks and best practices, you’re ready to bring your Flutter UIs to life.

::: info References

<SiteInfo
  name="Animation"
  desc="A catalog of recipes for adding animations to your Flutter app."
  url="https://docs.flutter.dev/cookbook/animation/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<SiteInfo
  name="Use the Performance view"
  desc="Learn how to use the DevTools performance view."
  url="https://docs.flutter.dev/tools/devtools/performance/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

- Books: *Flutter in Action* (Eric Windmill), *Practical Flutter* (Frank Zammetti)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Animations in Flutter",
  "desc": "Animations are a fundamental aspect of mobile app development. They go beyond just adding visual appeal, and have become essential for enhancing the overall user experience. Flutter, Google's open-source UI development toolkit, lets you create seamle...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-animations-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
