---
lang: en-US
title: "Splash Screen: The First Impression"
description: "Article(s) > (7/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
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
      content: "Article(s) > (7/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "Splash Screen: The First Impression"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/splash-screen-the-first-impression.html
next: /freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/README.md#wrapping-up
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
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-splash-screen-the-first-impression"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

A splash screen (or launch screen) is the first screen users see when they open your app. It provides a branded experience while the app initializes resources. The `flutter_native_splash` package simplifies creating native splash screens for Flutter apps.

---

## <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` Configuration for `flutter_native_splash`

```yaml title="pubspec.yaml"
flutter_native_splash:
  color: "#FFFFFF"
  image: assets/images/app_logo.png
  android: true
  android_gravity: center
  fullscreen: true
  ios: true
```

Here’s what’s happening:

- `flutter_native_splash:`: The root key for the `flutter_native_splash` package configuration.
- `color: "#FFFFFF"`: Sets the background color of the splash screen. Here, it's set to white.
- `image: assets/images/app_logo.png`: Specifies the path to the image that will be displayed on the splash screen. In this case, it's the application's logo.
- `android: true`: Enables splash screen generation for Android.
- `android_gravity: center`: For Android, this centers the splash image on the screen.
- `fullscreen: true`: Makes the splash screen appear in fullscreen mode, without status or navigation bars.
- `ios: true`: Enables splash screen generation for iOS.

---

## Generating the Splash Screen

After configuring <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, run the following command in your terminal: `dart run flutter_native_splash:create`. It processes the configuration and generates the native splash screen files (for example, launch images, drawables) in the respective Android and iOS project folders, ensuring they are properly integrated into the native launch process.

::: info Screenshots from the App

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748068995235/d84ad92d-a686-43ee-a34c-89f2d6bf7e17.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1748069008469/f5fecee8-93dd-46ef-92ae-bd8c5413b3a7.png)

Keep in mind that the output quality can vary depending on the AI model you’re using. The same applies to YouTube links and image URLs - sometimes they work perfectly, and other times they may not. So if something doesn’t work as expected, it’s not necessarily on your end.

Also, remember there are so many ways to achieve this and you don’t necessarily use to use this method. I’ll provide some other resources you can check out below. You can use `systemInstructions` instead of defining constraints in text the way I did it.

<SiteInfo
  name="Atuoha/snap2chef_ai"
  desc="Article: Snap, upload or record and generate a food/snack/drink receipe and preparation process with a possible Image and Youtube Link using Gemini and Flutter https://atuoha.hashnode.dev/building-..."
  url="https://github.com/Atuoha/snap2chef_ai/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/549ccdc86b82325180b45eba6e7aedcdd854da7de43b8ea0f7e8b2efee657ff5/Atuoha/snap2chef_ai"/>

:::
