---
lang: en-US
title: "Set Up Your Flutter Project and Dependencies"
description: "Article(s) > (2/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
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
      content: "Article(s) > (2/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "Set Up Your Flutter Project and Dependencies"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/set-up-your-flutter-project-and-dependencies.html
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
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-set-up-your-flutter-project-and-dependencies"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

To begin, let's create a new Flutter project and set up the necessary dependencies in your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file.

First, create a new Flutter project by running:

```sh
flutter create snap2chef
cd snap2chef
```

Now, open <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and add the following dependencies:

```yaml :collapsed-lines title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  google_generative_ai: ^0.4.7
  permission_handler: ^12.0.0+1
  file_picker: ^10.1.9
  image_cropper: ^9.1.0
  image_picker: ^1.1.2
  path_provider: ^2.1.5
  fluttertoast: ^8.2.12
  gap: ^3.0.1
  iconsax: ^0.0.8
  dotted_border: ^2.1.0
  youtube_player_flutter: ^9.1.1
  flutter_markdown: ^0.7.7+1
  loader_overlay: ^5.0.0
  flutter_spinkit: ^5.2.1
  cached_network_image: ^3.4.1
  flutter_native_splash: ^2.4.4
  flutter_launcher_icons: ^0.14.3
  speech_to_text: ^7.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0
  build_runner: ^2.4.13
```

After adding the dependencies, run `flutter pub get` in your terminal to fetch them:

```sh
flutter pub get
```
