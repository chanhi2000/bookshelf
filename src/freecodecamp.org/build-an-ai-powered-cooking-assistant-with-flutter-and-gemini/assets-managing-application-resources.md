---
lang: en-US
title: "Assets: Managing Application Resources"
description: "Article(s) > (5/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
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
      content: "Article(s) > (5/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "Assets: Managing Application Resources"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/assets-managing-application-resources.html
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
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-assets-managing-application-resources"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

Assets are files bundled with your application and are accessible at runtime. This typically includes images, fonts, audio files, and more.

In this application, we have an <FontIcon icon="fas fa-folder-open"/>`assets` folder, and inside it, an <FontIcon icon="fas fa-folder-open"/>`images` subfolder.

```plaintext title="file structure"
assets/
└── images/
    ├── placeholder.png
    └── app_logo.png
```

- <FontIcon icon="fas fa-file-image"/>`placeholder.png`: This image is typically used as a temporary visual cue when actual content (like an image being loaded or picked) is not yet available. It provides a better user experience than a blank space.
- <FontIcon icon="fas fa-file-image"/>`app_logo.png`: This is the primary logo of the application. It's used for various purposes, including the app icon and the splash screen.

To ensure Flutter knows about these assets and bundles them with the application, you need to declare them in your <FontIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file:

```yaml title="pubspec.yaml"
flutter:
  uses-material-design: true
  assets:
    - assets/images/ # This line tells Flutter to include all files in the assets/images/ directory
```
