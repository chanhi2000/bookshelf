---
lang: en-US
title: "How to Build Responsive UIs in Flutter"
description: "Article(s) > How to Build Responsive UIs in Flutter"
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
      content: "Article(s) > How to Build Responsive UIs in Flutter"
    - property: og:description
      content: "How to Build Responsive UIs in Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-responsive-uis-in-flutter.html
prev: /programming/dart/articles/README.md
date: 2025-10-29
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761675310940/332589a7-55e0-4cb2-935e-aa1011709e2e.png
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
  name="How to Build Responsive UIs in Flutter"
  desc="Building responsive UIs in Flutter can be challenging, especially when you want your app to look great on phones, tablets, and desktops without maintaining multiple layouts. Fortunately, Flutter provides powerful tools like MediaQuery, LayoutBuilder,..."
  url="https://freecodecamp.org/news/how-to-build-responsive-uis-in-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761675310940/332589a7-55e0-4cb2-935e-aa1011709e2e.png"/>

Building responsive UIs in Flutter can be challenging, especially when you want your app to look great on phones, tablets, and desktops without maintaining multiple layouts. Fortunately, Flutter provides powerful tools like `MediaQuery`, `LayoutBuilder`, and the `flutter_screenutil` package to make this process seamless.

In this article, we’ll walk through a complete sample responsive screen, explaining each part of the code step by step. You’ll learn not only how to make your layout adapt to different screen sizes and orientations but also how to use scaling utilities to keep your text and spacing consistent across all devices.

By the end, you’ll understand how to structure a Flutter app that automatically adjusts its layout and typography based on the available screen real estate, a must-know skill for any developer targeting multiple platforms.


::: note Prerequisites

Before diving in, ensure you have:

- A working Flutter environment (SDK, IDE, emulator or device).
- Basic proficiency in Flutter: Knowledge of widgets, stateless/stateful, Row/Column, Scaffold, and so on.
- Familiarity with Dart basics and how layout works in Flutter (constraints, sizing).
- (Optional but helpful) A design/mockup (for example from Figma) with defined design size or target screen.
- Understanding that creating truly adaptive/responsive UIs means accommodating **different screen sizes**, **orientations**, **aspect-ratios**, and **platforms** (mobile/tablet/web/desktop).

:::

---

## Understanding Responsive vs Adaptive Design

It’s helpful to clarify terminology:

- **Responsive design** is about *fitting* the UI into the available space: The layout scales, reflows, rearranges as the screen size or orientation changes.
- **Adaptive design** is about selecting different UI patterns depending on the device/screen. For example, using a side-panel on desktop, bottom navigation on mobile. The UI adapts to the context of use.
- In practice with Flutter, you often do *both*: Responsive (scaling/reflow) and adaptive (choosing variant layouts).

::: info According to the official documentation: (<VPIcon icon="iconfont icon-flutter"/><code>docs.flutter.dev</code>)

> “Responsive design is about fitting the UI into the space. Adaptive design is about the UI being usable in the space.”

<SiteInfo
  name="Adaptive and responsive design in Flutter"
  desc="It's important to create an app, whether for mobile or web, that responds to size and orientation changes and maximizes the use of each platform."
  url="https://docs.flutter.dev/ui/adaptive-responsive/index.md/"
  logo="https://docs.flutter.dev//assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev//assets/images/flutter-logo-sharing.png"/>

:::

- Also, some best practices to follow: don’t assume device type (phone/tablet) based on screen size, don’t lock orientation, and don’t rely solely on `MediaQuery.orientation`. ([<VPIcon icon="iconfont icon-flutter"/>Flutter Docs](https://docs.flutter.dev/ui/adaptive-responsive/best-practices))

---

## Core Flutter Layout Widgets for Responsive UI

Flutter provides many fundamental widgets for layout – when used well, they form the backbone of responsive UIs.

### 1. Container/SizedBox

`Container`, `SizedBox` let you size widgets explicitly or via constraints.

Use cautiously: Overly fixed sizes can hamper responsiveness (for example, a Container(width: 300) may overflow on small screens).

Better to use relative sizing or allow flexibility.

Here are clear, practical Flutter code examples that illustrate **how to use** `Container` and `SizedBox`, including both **bad (fixed)** and **good (responsive/flexible)** sizing approaches:

#### Overly Fixed Sizing (Not Responsive)

```dart
class FixedContainerExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        // This might overflow on small screens!
        child: Container(
          width: 300,
          height: 200,
          color: Colors.blue,
          child: const Center(
            child: Text(
              'Fixed Size Container',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
      ),
    );
  }
}
```

::: caution Problem

If the screen width is less than 300px (like on small mobile devices), this widget may overflow or get cut off.

:::

#### Responsive / Flexible Sizing

```dart
class ResponsiveContainerExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Center(
        // Use relative width and height
        child: Container(
          width: screenWidth * 0.8, // 80% of screen width
          height: 200,
          decoration: BoxDecoration(
            color: Colors.blue,
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Center(
            child: Text(
              'Responsive Container (80% width)',
              style: TextStyle(color: Colors.white),
            ),
          ),
        ),
      ),
    );
  }
}
```

::: important Why better

It adjusts automatically to different screen sizes.

:::

#### SizedBox for Spacing or Constraints

```dart
class SizedBoxExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Above Spacer'),
            const SizedBox(height: 16), // Adds spacing
            Container(
              width: 200,
              height: 100,
              color: Colors.green,
              child: const Center(child: Text('Sized Container')),
            ),
          ],
        ),
      ),
    );
  }
}
```

`SizedBox` is lightweight and great for adding **fixed spacing** or defining **simple dimensions** without needing a full `Container`.

### 2. Row, Column

`Row` and `Column` arrange children horizontally or vertically.

::: note

`Row` gives infinite horizontal space (subject to parent constraints), so children must handle sizing or else overflow.

:::

When you use a **Row** or **Column**, Flutter tries to give them as much space as possible **along their main axis** (horizontal for Row, vertical for Column).  
If the children inside don’t know how much space to take, **they can overflow** or not display as intended.

That’s why we use `Expanded`, `Flexible`, or `SizedBox` to tell Flutter **how each child should use the available space**.

::: tip Example:

```dart
Row(
  children: [
    Expanded(
      child: Container(
        // Your widget content here
      ),
    ),
    // Other widgets...
  ],
)
```

Here `Expanded` says: “take up remaining space proportionally”.

:::

#### Expanded and Flexible

`Expanded` forces its child to fill remaining space in a `Row` or `Column`.

`Flexible` gives its child flexibility: it may shrink or grow but not forcibly fill.

::: tip Example:

```dart
Row(
  children: [
    Flexible(
      child: Container(
        // Widget content
      ),
    ),
    // Other widgets...
  ],
)
```

Using `Flexible`/`Expanded` helps distribute space dynamically and naturally adapt to varying screen sizes.

:::

### 3. LayoutBuilder

`LayoutBuilder` gives you the parent widget’s constraints (`maxWidth`, `maxHeight`) and allows you to re-build UI accordingly.

```dart
LayoutBuilder(
  builder: (BuildContext context, BoxConstraints constraints) {
    if (constraints.maxWidth > 600) {
      // Large screen layout
      return LargeScreenWidget();
    } else {
      // Small screen layout
      return SmallScreenWidget();
    }
  },
)
```

This is often more reliable than just checking `MediaQuery.orientation` or `MediaQuery.size`, especially in multi-window/foldable devices. ([<VPIcon icon="iconfont icon-flutter"/>Flutter Docs](https://docs.flutter.dev/ui/adaptive-responsive/best-practices))

### 4. FractionallySizedBox and AspectRatio

`FractionallySizedBox`: Sizes its child as a fraction of the parent’s size (for example, `widthFactor: 0.5`).

`AspectRatio`: Maintains a fixed aspect ratio (width/height), useful for images or containers.

```dart
AspectRatio(
  aspectRatio: 16 / 9,
  child: YourWidget(),
)
```

These help maintain proportionally consistent layouts across screen sizes.

---

## MediaQuery and Screen Information

Understanding screen size, orientation, padding, device pixel ratio and so on, is essential.

### Using MediaQuery

```dart
double screenWidth  = MediaQuery.of(context).size.width;
double screenHeight = MediaQuery.of(context).size.height;
Orientation orientation = MediaQuery.of(context).orientation;
double devicePixelRatio = MediaQuery.of(context).devicePixelRatio;
EdgeInsets padding = MediaQuery.of(context).padding;
```

`size` gives the logical pixel width/height, `orientation` informs if the device is in portrait or landscape, `devicePixelRatio` shows how many physical pixels per logical pixel, helpful for image scaling, and `padding` gives system UI insets (notches, status bar, navigation bar).

Use these values to tailor your UI: for example, adjust font sizes, container widths, or layout decisions.

::: tip Example: Responsive Typography

```dart
Text(
  'Your text here',
  style: TextStyle(
    fontSize: screenWidth * 0.04, // 4% of screen width
  ),
)
```

Approach: Compute font size relative to screen width or height. But be cautious, text readability and accessibility (for example, system font size changes) should be considered, see best practices below.

:::

### Breakpoints, Orientation and Large-Screen Adaptation

To create UIs that look great on tablets/desktops as well as phones:

#### Orientation

```dart
if (MediaQuery.of(context).orientation == Orientation.portrait) {
  // Portrait layout
} else {
  // Landscape layout
}
```

Works for basic cases, but beware: orientation alone doesn’t capture window size (especially in desktop/multi-window environments), prefer checking constraints or size. ([<VPIcon icon="iconfont icon-flutter"/>Flutter Docs](https://docs.flutter.dev/ui/adaptive-responsive/best-practices))

#### Breakpoints and Adaptive Layouts

Define custom breakpoints based on width (or other metrics) to trigger different layouts.

::: tip Example:

```dart
if (screenWidth > 600) {
  // Tablet/large-screen UI
} else {
  // Phone UI
}
```

Some sources propose standard breakpoints, for example, compact (<600), medium (600-840), large (>840). With `LayoutBuilder` you can detect parent constraint width instead of global screen width, which is more robust.

:::

#### Large Screens and Safe Use of Space

On very wide screens, filling full width may hurt readability. The official Flutter docs recommend limiting content width (for example, using `ConstrainedBox` + `Center`) for large screens so that lines of text aren't excessively long. ([<VPIcon icon="iconfont icon-flutter"/>Flutter Docs](https://docs.flutter.dev/ui/adaptive-responsive/best-practices))

::: tip  Example:

```dart
Center(
  child: ConstrainedBox(
    constraints: BoxConstraints(maxWidth: 800),
    child: YourContent(),
  ),
)
```

:::

### Responsive Typography, Images and Assets

#### Typography

Use scalable units whenever possible (see packages later). Wrap text in `Flexible`/`Expanded` if inside `Row`/`Column` to avoid overflow, and consider system font scale factor: You can use `MediaQuery.of(context).textScaleFactor` to adapt fonts for accessibility.

#### Images and BoxFit

```dart
Image.asset(
  'assets/your_image.png',
  fit: BoxFit.cover,  // or BoxFit.contain, BoxFit.fitWidth etc.
  width: someWidth,   // responsive width
  height: someHeight, // responsive height
)
```

`BoxFit.cover` allows image to fill container while maintaining aspect ratio.

Use `AspectRatio` or `FractionallySizedBox` to keep images proportional.

#### Asset Density and Pixel Ratio

For high resolution devices (high `devicePixelRatio`), provide higher resolution assets (2x/3x) so they appear crisp.

Flutter handles asset variants (`asset@2x.png` and so on) automatically, but in very large screen layouts you may want extra details.

### Flexible Layouts: Expanded, Flexible, FractionallySizedBox

We discussed these partially above, but here are deeper guidelines.

#### Expanded and Flexible

Use inside `Row` or `Column` to distribute space.

Example:

```dart
Row(
  children: [
    Expanded(flex: 2, child: Container(color: Colors.red)),
    SizedBox(width: 8),
    Expanded(flex: 1, child: Container(color: Colors.blue)),
  ],
)
```

The red container takes twice the width of the blue. Using `Flexible` allows its child to expand or shrink, but doesn’t force full space.

#### FractionallySizedBox

Example:

```dart
FractionallySizedBox(
  widthFactor: 0.8,  // 80% of parent width
  child: SomeWidget(),
)
```

Useful when you want a widget to occupy a fraction of available space without using exact pixel values.

#### AspectRatio

```dart
AspectRatio(
  aspectRatio: 16/9,
  child: Container(color: Colors.green),
)
```

Ensures the container maintains 16:9 ratio regardless of parent size.

### Advanced Tools and Packages

Using packages can simplify many repetitive tasks. Here are some highly used ones.

#### flutter_screenutil

Helps scale widths, heights, font sizes based on a design size you specify.

::: tip Example initialization:

```dart
ScreenUtilInit(
  designSize: Size(360, 690), // your base design size
  builder: () => MaterialApp(
    home: MyHomePage(),
  ),
);
```

Usage:

```dart
width: 200.w,         // scaled width
height: 150.h,        // scaled height
fontSize: 16.sp,      // scaled font size
radius: 12.r,         // scaled radius
```

:::

Advantages: Easy scaling of many sizes. But you must use `.w`, `.h`, `.sp`, `.r` consistently.

#### `responsive_builder`

Helps produce layouts for different device screen types (mobile/tablet/desktop).

::: tip Example

```dart
ResponsiveBuilder(
  builder: (context, sizingInformation) {
    if (sizingInformation.deviceScreenType == DeviceScreenType.mobile) {
      return MobileLayout();
    } else if (sizingInformation.deviceScreenType == DeviceScreenType.tablet) {
      return TabletLayout();
    } else {
      return DesktopLayout();
    }
  },
);
```

:::

Useful for switching entire widget trees based on device type. ([Medium (<VPIcon icon="fa-brands fa-medium"/>`@ravipatel84184/`)](https://medium.com/@ravipatel84184/mastering-responsive-ui-in-flutter-a-comprehensive-guide-49c4ba9902af))

#### Others

1. `responsive_framework`, `adaptive_breakpoints`, and so on.
2. When choosing a package, check maintenance, popularity, compatibility with your Flutter version.

### Handling Safe Areas, Notches and Insets

Modern devices have notches, status bars, navigation bars, foldables and so on. Use widgets and APIs to handle these.

1. Wrap main content in `SafeArea` to avoid system UI intrusions.
2. Use `MediaQuery.of(context).padding` to detect safe padding (top, bottom, left, right).

::: tip Example:

```dart
Padding(
  padding: MediaQuery.of(context).padding,
  child: YourContent(),
)
```

:::

On Android you can also set UI mode:

```dart
SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
```

and update styles so status/navigation bar become transparent, helps full-screen UIs.

### Adaptive UI for Tablets/Desktop and Multi-Window

As your app runs on larger screens or in multi-window environments (foldables, desktops, web), consider:

1. Switching from bottom navigation (mobile) to a navigation rail or side‐panel (tablet/desktop).
2. Using `ConstrainedBox` to limit content width on wide screens for readability.
3. Layout changes: Instead of single column scroll, you may display side-by-side panels or grid layouts.
4. Use `LayoutBuilder` or packages to detect width/constraints and choose the appropriate layout.
5. Avoid device type checking (for example, “if tablet”), instead base on window size.

::: tip Example:

```dart
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth > 1024) {
      return DesktopScaffold();
    } else if (constraints.maxWidth > 600) {
      return TabletScaffold();
    } else {
      return MobileScaffold();
    }
  },
);
```

:::

---

## Best Practices and Performance Considerations

Summarizing key best practices:

1. **Break widgets into smaller reusable widgets** improves maintainability and reuse.
2. **Start building from the inside out**. Start with smallest components and move outward, rather than imposing outer container constraints first.
3. **Ensure defined constraints** to avoid infinite bounds and overflow by using `Expanded`, `Flexible`, and so on.
4. **Avoid fixed sizes where unnecessary**. Relative sizing or flex layouts adapt better.
5. **Avoid relying solely on screen size or orientation**, use constraints instead of device type checks.
6. **Performance matters**, avoid over-nesting heavy layouts, avoid rebuilding large subtrees when not needed. Use `const` widgets and keep build method lean.
7. **Accessibility** account for large font scaling (`MediaQuery.textScaleFactor`), screen readers, keyboard/mouse input on larger screens.
8. **Test on multiple screen sizes/orientations** actual devices/emulators/display sizes.
9. **Font/text overflow** wrap text in `Flexible`, set `overflow`, `softWrap`, and test for dynamic content.

---

## Testing and Debugging Responsive Layouts

1. Use device emulators/simulators with different screen sizes (phones, tablets, desktops).
2. For web/desktop, resize browser window to see how layout adapts.
3. Use `device_preview` package or built-in Flutter tools to simulate various devices.
4. Use Flutter DevTools’ **Widget Inspector** and **Layout Explorer** to understand how widgets are sized and laid out.
5. Test orientation changes, multi-window, split view (for example, Android foldables).
6. Check for overflow errors (yellow/black stripes) or unexpected scroll behavior.
7. Check accessibility: Scale fonts up/down, test with screen reader, check keyboard navigation in desktop mode.

---

## Building Reusable Responsive Widgets/Custom Widgets

One of the keys to scalable responsive UI is creating reusable widgets that encapsulate responsive behavior.

::: tip Example: `ResponsiveText` Widget

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class ResponsiveText extends StatelessWidget {
  final String text;
  final FontWeight fontWeight;
  final Color color;

  const ResponsiveText(
    this.text, {
    Key? key,
    this.fontWeight = FontWeight.normal,
    this.color = Colors.black,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 16.sp,         // scaled font size
        fontWeight: fontWeight,
        color: color,
      ),
    );
  }
}
```

Usage: Instead of manually specifying font size every time, you use `ResponsiveText`. Similarly, you can build `ResponsiveContainer`, `ResponsivePadding`, and so on. Encapsulating responsive logic in widgets improves code reuse and consistency.

:::

::: tip Example: `BreakpointAwareLayout` Widget

```dart
import 'package:flutter/material.dart';

class BreakpointAwareLayout extends StatelessWidget {
  final Widget mobile;
  final Widget tablet;
  final Widget desktop;

  const BreakpointAwareLayout({
    Key? key,
    required this.mobile,
    required this.tablet,
    required this.desktop,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1024) {
          return desktop;
        } else if (constraints.maxWidth >= 600) {
          return tablet;
        } else {
          return mobile;
        }
      },
    );
  }
}
```

Usage: You supply three versions of your UI and widget will choose based on width.

:::

---

## Example of A Complete Sample Responsive Screen

We’ll divide the example into these parts:

1. **Project Setup and Imports**
2. **App Entry Point (**`main()` and `MyApp`)
3. **ScreenUtil Initialization**
4. **Main Page Layout (**`MyHomePage`)
5. **Adaptive Layout with** `LayoutBuilder`
6. **Main Content Builder (**`_buildMainContent`)
7. **Responsive Styling with** `flutter_screenutil`

### Project Setup and Imports

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() {
  runApp(MyApp());
}
```

### App Entry Point: The** `MyApp` Cla

```dart
class MyApp extends StatelessWidget {
  // Design size corresponds to the reference design (e.g., iPhone 6/7/8)
  final Size designSize = const Size(360, 690);

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: designSize,
      minTextAdapt: true,       // adapts font size
      splitScreenMode: true,    // supports split-screen
      builder: (context, child) {
        return MaterialApp(
          title: 'Responsive Flutter Example',
          home: MyHomePage(),
        );
      },
    );
  }
}
```

### The Responsive Home Screen (`MyHomePage`)

```dart :collapsed-lines
class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double screenWidth  = MediaQuery.of(context).size.width;
    final double screenHeight = MediaQuery.of(context).size.height;
    final Orientation orientation = MediaQuery.of(context).orientation;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Responsive UI',
          style: TextStyle(fontSize: 20.sp),
        ),
      ),
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            if (constraints.maxWidth > 600) {
              // Tablet/Desktop layout
              return Row(
                children: [
                  Expanded(
                    flex: 2,
                    child: Container(
                      color: Colors.blueGrey[50],
                      child: Center(
                        child: Text(
                          'Sidebar Panel',
                          style: TextStyle(fontSize: 18.sp),
                        ),
                      ),
                    ),
                  ),
                  Expanded(
                    flex: 5,
                    child: Container(
                      padding: EdgeInsets.all(16.w),
                      child: _buildMainContent(context),
                    ),
                  ),
                ],
              );
            } else {
              // Mobile layout
              return SingleChildScrollView(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 24.h),
                  child: _buildMainContent(context),
                ),
              );
            }
          },
        ),
      ),
    );
  }
}
```

### Building the Core Content

```dart
Widget _buildMainContent(BuildContext context) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        'Welcome to the Responsive App',
        style: TextStyle(fontSize: 24.sp, fontWeight: FontWeight.bold),
      ),
      SizedBox(height: 12.h),
      Text(
        'This UI adapts to different screen sizes automatically. Try resizing your window or changing the orientation.',
        style: TextStyle(fontSize: 16.sp),
      ),
      SizedBox(height: 24.h),
      Row(
        children: [
          Expanded(
            child: Image.asset(
              'assets/sample.jpg',
              width: double.infinity,
              height: 200.h,
              fit: BoxFit.cover,
            ),
          ),
        ],
      ),
      SizedBox(height: 24.h),
      Row(
        children: [
          Expanded(
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 14.h),
                textStyle: TextStyle(fontSize: 16.sp),
              ),
              child: Text('Get Started'),
            ),
          ),
        ],
      ),
    ],
  );
}
```

---

## Full Walkthrough: Code Explained in Depth

Let’s now go through a **deep explanation** of the full sample responsive Flutter screen, line by line and block by block.

### Imports and App Entry Point

```dart
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() {
  runApp(MyApp());
}
```

::: info Explanation:

`import 'package:flutter/material.dart';` brings in Flutter’s Material Design library, which contains essential UI widgets such as `Scaffold`, `AppBar`, `Text`, and `Column`. `import 'package:flutter_screenutil/flutter_screenutil.dart';` imports the `flutter_screenutil` package, providing scaling utilities like `.sp`, `.h`, `.w`, and `.r` that automatically adjust UI elements based on the device’s screen size. The `void main()` function serves as the entry point of the Flutter app, calling `runApp(MyApp())` to render the `MyApp` widget as the root of the application.

:::

### App Root: The** `MyApp` Widg

```dart
class MyApp extends StatelessWidget {
  // Design size corresponds to the reference design (e.g., iPhone 6/7/8)
  final Size designSize = const Size(360, 690);

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: designSize,
      minTextAdapt: true,       // adapts font size
      splitScreenMode: true,    // supports split-screen
      builder: (context, child) {
        return MaterialApp(
          title: 'Responsive Flutter Example',
          home: MyHomePage(),
        );
      },
    );
  }
}
```

::: info Explanation:

`MyApp` extends `StatelessWidget`, meaning it doesn’t maintain any internal state and simply builds the widget tree. The `designSize` defines the base design resolution used in your design mockups (in this case, 360x690, typical of an iPhone 8). `ScreenUtilInit` initializes the `flutter_screenutil` package, and its parameters configure how responsiveness works: `designSize: Size(360, 690)` sets the reference design size for all scaling calculations, `minTextAdapt: true` ensures text automatically scales on smaller screens without clipping, and `splitScreenMode: true` maintains proper layout behavior in split-screen mode on devices like Android tablets. Inside its builder, it returns a `MaterialApp`, which defines the app’s title and sets `home: MyHomePage()`, the main screen displayed when the app launches.

:::

So far, this part sets up the environment for responsive scaling.

### The Home Screen Layout** `MyHomePag

```dart
class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);
```

The widget is **stateless**, meaning its layout does not depend on mutable state.

Inside `build(BuildContext context)`:

```dart
final double screenWidth  = MediaQuery.of(context).size.width;
final double screenHeight = MediaQuery.of(context).size.height;
final Orientation orientation = MediaQuery.of(context).orientation;
```

These three lines access `MediaQuery`, a Flutter API that provides information about the screen’s size, orientation, and other layout properties, where `screenWidth` represents the device’s current screen width, `screenHeight` represents its height, and `orientation` indicates whether the device is in portrait or landscape mode.

You’ll use these values to dynamically adjust your layout.

### The Scaffold and AppBar

```dart
return Scaffold(
  appBar: AppBar(
    title: Text(
      'Responsive UI',
      style: TextStyle(fontSize: 20.sp),
    ),
  ),
```

::: info Explanation:

`Scaffold` provides the basic structure of the page, including the app bar, body, and optional elements like a floating action button or drawer. Inside the `AppBar`, the title text uses `20.sp` instead of a fixed pixel value, `.sp` (scaled pixels) from `flutter_screenutil` ensures that the font size automatically adjusts to the screen’s pixel density and resolution, meaning a `20.sp` text appears smaller on compact screens and scales up proportionally on larger devices like tablets.

:::

### SafeArea + LayoutBuilder

```dart
body: SafeArea(
  child: LayoutBuilder(
    builder: (context, constraints) {
```

::: info Explanation:

`SafeArea` ensures that content does not overlap with system UI areas such as the notch, status bar, or navigation gestures, while `LayoutBuilder` provides the constraints (maximum width and height) of the available space inside its parent, enabling the creation of responsive layouts that adapt dynamically to the screen’s actual size at runtime.

:::

### Handling Large and Small Screens

```dart
if (constraints.maxWidth > 600) {
  // Tablet/Desktop layout
  return Row(
    children: [
      Expanded(
        flex: 2,
        child: Container(
          color: Colors.blueGrey[50],
          child: Center(
            child: Text(
              'Sidebar Panel',
              style: TextStyle(fontSize: 18.sp),
            ),
          ),
        ),
      ),
      Expanded(
        flex: 5,
        child: Container(
          padding: EdgeInsets.all(16.w),
          child: _buildMainContent(context),
        ),
      ),
    ],
  );
} else {
  // Mobile layout
  return SingleChildScrollView(
    child: Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 24.h),
      child: _buildMainContent(context),
    ),
  );
}
```

::: info Explanation:

This block handles responsive breakpoints by determining how the UI adapts to different screen widths. If `constraints.maxWidth > 600`, the layout is treated as a tablet or desktop view. In this case, the UI uses a `Row` to divide the screen horizontally, with `Expanded(flex: 2)` creating a sidebar that takes two parts of the available width, and `Expanded(flex: 5)` creating the main content area that takes five parts, maintaining a 2:5 ratio. The sidebar displays “Sidebar Panel,” representing where side navigation or additional panels can appear on larger screens. For smaller screens (phones), the layout switches to a vertical arrangement using `SingleChildScrollView` to enable scrolling, with padding applied through scaled spacing (`16.w` horizontally and `24.h` vertically). The `_buildMainContent()` function is reused to keep content logic consistent across all layouts.

:::

### Building the Core Content

```dart
Widget _buildMainContent(BuildContext context) {
  return Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(
        'Welcome to the Responsive App',
        style: TextStyle(fontSize: 24.sp, fontWeight: FontWeight.bold),
      ),
      SizedBox(height: 12.h),
      Text(
        'This UI adapts to different screen sizes automatically. Try resizing your window or changing the orientation.',
        style: TextStyle(fontSize: 16.sp),
      ),
      SizedBox(height: 24.h),
      Row(
        children: [
          Expanded(
            child: Image.asset(
              'assets/sample.jpg',
              width: double.infinity,
              height: 200.h,
              fit: BoxFit.cover,
            ),
          ),
        ],
      ),
      SizedBox(height: 24.h),
      Row(
        children: [
          Expanded(
            child: ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                padding: EdgeInsets.symmetric(vertical: 14.h),
                textStyle: TextStyle(fontSize: 16.sp),
              ),
              child: Text('Get Started'),
            ),
          ),
        ],
      ),
    ],
  );
}
```

::: info Explanation:

This method builds the actual visible content of the app. It uses a `Column` to stack widgets vertically, with `crossAxisAlignment: CrossAxisAlignment.start` aligning all child widgets to the start of the horizontal axis (left side in LTR layouts). Text widgets use `.sp` for responsive scaling, applying a larger font size (24.sp) for the title and a smaller, comfortable one (16.sp) for the body. `SizedBox` provides vertical spacing (`12.h` or `24.h`), where `.h` scales proportionally to the screen height. A `Row` containing `Image.asset` uses `Expanded` to make the image fill the available width, with `fit: BoxFit.cover` ensuring the image fills its container correctly and `height: 200.h` allowing dynamic height scaling. Another `Row` contains an `ElevatedButton` that spans the available width through `Expanded`, with padding and font size scaling via `EdgeInsets.symmetric(vertical: 14.h)` and `TextStyle(fontSize: 16.sp)`. Overall, the `_buildMainContent()` method produces a clean, scalable, and responsive layout that maintains visual consistency across all devices.

:::

### Why This Works

`LayoutBuilder` gives the parent constraints, letting you conditionally render different layouts for mobile and large screens. `ScreenUtil` ensures that all elements (text, padding, sizes) adapt proportionally. `MediaQuery` can be used if you need real-time adaptation based on device rotation, size, or padding. `SafeArea` prevents clipping under system UI areas.

Together, these techniques combine **Flutter’s native flexibility** with **ScreenUtil’s scaling power**, making the UI dynamic, elegant, and consistent across all platforms.

::: important Key Takeaways

1. Always design with a **reference size** and scale up/down with `flutter_screenutil`.
2. Use `LayoutBuilder` or `MediaQuery` for breakpoints.
3. Test layouts in **portrait/landscape** and across **small/large screens**.
4. Avoid hardcoded pixel values, use `.sp`, `.w`, `.h` instead.
5. Keep your content modular with helper functions like `_buildMainContent()`.

:::

---

## Conclusion

Creating responsive and adaptive UIs in Flutter is not just about making things “look okay” on different devices, it’s about crafting **fluid, consistent**, and **usable** experiences regardless of screen size, orientation or platform. By leveraging Flutter’s built-in layout widgets (`Row`, `Column`, `Flexible`, `Expanded`, `LayoutBuilder`), and coupling them with screen-aware APIs (`MediaQuery`, `SafeArea`, etc) and specialized packages (like `flutter_screenutil`), you can build apps that scale beautifully.

::: important Key takeaways:

- Think **flexibility** first: avoid rigid sizing.
- Use screen size/constraints to decide layout variations (instead of device type).
- Scale typography, images, paddings to maintain usability and aesthetics.
- Always test on multiple devices/sizes/orientations.
- Encapsulate responsive logic in reusable widgets to keep your code clean and maintainable.

:::

With these practices in hand, you’ll be well-equipped to deliver visually stunning, well-performing, and truly responsive Flutter applications for 2024 and beyond.

::: info References

- “Adaptive and responsive design in Flutter”, Flutter Docs. ([Flutter Docs](https://docs.flutter.dev/ui/adaptive-responsive))
- “Building Responsive UIs in Flutter: Tips and Best Practices”. TheOneTechnologies blog. ([TheOneTechnologies](https://theonetechnologies.com/blog/post/building-responsive-ui-in-flutter-tips-and-best-practices))
- “Best strategy to implement responsive design : r/FlutterDev”, Reddit discussion. ([Reddit](https://reddit.com/r/FlutterDev/comments/192sqg5/best_strategy_to_implement_responsive_design))
- “How to Make a Flutter App Responsive for Different Mobile Screen Sizes”, StackOverflow Q&A. ([Stack Overflow](https://stackoverflow.com/questions/79539122/how-to-make-a-flutter-app-responsive-for-different-mobile-screen-sizes))
- “5 Best Practices to Build Robust and Responsive UIs in Flutter”, Somnio Software blog. ([somniosoftware.com](https://somniosoftware.com/blog/5-best-practices-to-build-robust-and-responsive-uis-in-flutter))

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Responsive UIs in Flutter",
  "desc": "Building responsive UIs in Flutter can be challenging, especially when you want your app to look great on phones, tablets, and desktops without maintaining multiple layouts. Fortunately, Flutter provides powerful tools like MediaQuery, LayoutBuilder,...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-responsive-uis-in-flutter.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
