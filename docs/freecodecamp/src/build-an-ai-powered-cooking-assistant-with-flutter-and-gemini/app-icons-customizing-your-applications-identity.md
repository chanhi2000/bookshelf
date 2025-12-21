---
lang: en-US
title: "App Icons: Customizing Your Application's Identity"
description: "Article(s) > (6/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Google
  - Google Gemini
tag:
  - blog
  - freecodecamp.org
  - dart
  - dartlang
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "App Icons: Customizing Your Application's Identity"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/app-icons-customizing-your-applications-identity.html
date: 2025-05-30
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build an AI-Powered Cooking Assistant with Flutter and Gemini",
  "desc": "After soaking in everything shared at GoogleIO, I can’t lie - I feel supercharged! From What’s New in Flutter to Building Agentic Apps with Flutter and Firebase AI Logic, and the deep dive into How Flutter Makes the Most of Your Platforms, it felt li...",
  "link": "/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
  desc="After soaking in everything shared at GoogleIO, I can’t lie - I feel supercharged! From What’s New in Flutter to Building Agentic Apps with Flutter and Firebase AI Logic, and the deep dive into How Flutter Makes the Most of Your Platforms, it felt li..."
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-app-icons-customizing-your-applications-identity"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

Flutter applications use the `flutter_launcher_icons` package to simplify the process of generating app icons for different platforms and resolutions. This ensures your app has a consistent and professional look on both Android and iOS devices.

---

## <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` Configuration for `flutter_launcher_icons`

```yaml title="pubspec.yaml"
flutter_icons:
  android: "launcher_icon"
  ios: true
  image_path: "assets/images/app_logo.png"
  remove_alpha_ios: true
  adaptive_icon_background: "#FFFFFF"
  adaptive_icon_foreground: "assets/images/app_logo.png"
```

::: info Here’s what’s happening:

- `flutter_icons:`: This is the root key for the `flutter_launcher_icons` package configuration.
- `android: "launcher_icon"`: Specifies that Android launcher icons should be generated. `"launcher_icon"` is the default and usually sufficient.
- `ios: true`: Enables the generation of iOS app icons.
- `image_path: "assets/images/app_logo.png"`: This is the absolute path to your source image file that will be used to generate the icons. It's crucial that this path is correct and points to a high-resolution square image.
- `remove_alpha_ios: true`: For iOS, this option removes the alpha channel from the icon. iOS icons typically do not use an alpha channel for transparency.
- `adaptive_icon_background: "#FFFFFF"`: This is specific to Android Adaptive Icons (introduced in Android 8.0 Oreo). It defines the background layer of the adaptive icon. Here, it's set to white (`#FFFFFF`).
- `adaptive_icon_foreground: "assets/images/app_logo.png"`: This defines the foreground layer of the adaptive icon. It uses the `app_logo.png` again, which will be masked and scaled by the Android system.

:::

---

## Generating App Icons

After configuring <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, you need to run the following commands in your terminal:

First, run `dart run flutter_launcher_icons:generate`. This command generates a configuration file (often named <VPIcon icon="iconfont icon-yaml"/>`flutter_launcher_icons.yaml` or similar, or directly processes the <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`) which `flutter_launcher_icons` uses.

*Correction*: The prompt mentions "generate a config file and setup the image path to the path of the app_logo.png then run dart run flutter_launcher_icons to generate the assets". It seems `flutter_launcher_icons:generate` might be an older or specific command, the typical usage is to run `flutter_launcher_icons` directly after setting `image_path` in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`. For the given configuration, the `image_path` is already set in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`.

Then, run `dart run flutter_launcher_icons`. This command executes the `flutter_launcher_icons` package, which takes the `image_path` specified in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and generates all the necessary icon files at various resolutions for both Android and iOS, placing them in the correct native project directories.
