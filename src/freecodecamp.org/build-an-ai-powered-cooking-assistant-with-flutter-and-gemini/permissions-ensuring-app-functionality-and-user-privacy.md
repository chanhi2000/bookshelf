---
lang: en-US
title: "Permissions: Ensuring App Functionality and User Privacy"
description: "Article(s) > (4/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
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
      content: "Article(s) > (4/7) How to Build an AI-Powered Cooking Assistant with Flutter and Gemini"
    - property: og:description
      content: "Permissions: Ensuring App Functionality and User Privacy"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini/permissions-ensuring-app-functionality-and-user-privacy.html
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
  url="https://freecodecamp.org/news/build-an-ai-powered-cooking-assistant-with-flutter-and-gemini#heading-permissions-ensuring-app-functionality-and-user-privacy"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1748533427117/1c8c2384-c6a3-4ad8-ab40-1eee65b2c914.png"/>

For a Flutter application to interact with system features like the camera, microphone, or file storage, it must declare specific permissions in both its Android and iOS manifests. These declarations inform the operating system about the app's requirements and, for sensitive permissions, prompt the user for consent at runtime.

---

## Android Permissions (in <FontIcon icon="fas fa-folder-open"/>`android/app/src/main/`<FontIcon icon="fa-brands fa-android"/>`AndroidManifest.xml`)

```xml title="AndroidManifest.xml"
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.RECORD_AUDIO"/>
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
</manifest>
```

Here’s what’s going on:

- `<uses-permission android:name="android.permission.RECORD_AUDIO"/>`: This permission is necessary for the application to access the device's microphone and record audio. It's crucial for any speech recognition or voice input features, like the `GlowingMicButton` implies.
- `<uses-permission android:name="android.permission.CAMERA" />`: Grants the application access to the device's camera. This is essential for features that allow users to take photos, such as those enabled by `ImagePickerTile` or `ImagePreviewer`.
- `<uses-permission android:name="android.permission.INTERNET" />`: This is a fundamental permission required for almost any modern application that connects to the internet. It allows the app to send and receive data from web services, like interacting with the Gemini API, Firebase, or Vertex AI.
- `<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />`: Allows the application to read files from the device's shared external storage (for example, photos saved in the gallery). This is necessary when picking existing images from the gallery. For newer Android versions (Android 10+), scoped storage might change how this works, but for reading user-selected media, this declaration is still relevant. For writing to external storage, `WRITE_EXTERNAL_STORAGE` would also be needed.

---

## iOS Permissions (in <FontIcon icon="fas fa-folderopen"/>`ios/Runner/`<FontIcon icon="fa-brands fa-apple"/>`Info.plist`)

```xml title="ios/Runner/Info.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>io.flutter.embedded_views_preview</key>
        <true/>
    <key>NSSpeechRecognitionUsageDescription</key>
        <string>We need access to recognize your speech.</string>
    <key>NSCameraUsageDescription</key>
        <string>This app needs access to the camera to capture photos and videos.</string>
    <key>NSMicrophoneUsageDescription</key>
        <string>This app needs access to the microphone for audio recording.</string>
    <key>NSPhotoLibraryUsageDescription</key>
        <string>This app needs access to your photo library.</string>
    <key>NSPhotoLibraryAddUsageDescription</key>
        <string>This app needs permission to save photos to your photo library.</string>
    <key>NSAppTransportSecurity</key>
        <dict>
            <key>NSAllowsArbitraryLoads</key>
            <true/>
        </dict>
</dict>
</plist>
```

::: info Here’s what’s going on:

iOS permissions are declared in the <FontIcon icon="fa-brands fa-apple"/>`Info.plist` file using specific keys (`NS...UsageDescription`) and require a user-facing string explaining why the permission is needed. This string is displayed to the user when the app requests the permission.

- `<key>io.flutter.embedded_views_preview</key><true/>`: This key is often added when using Flutter plugins that integrate native UI components (for example, camera previews, webviews). It enables a preview of embedded native views during development.
- `<key>NSSpeechRecognitionUsageDescription</key><string>We need access to recognize your speech.</string>`: This is the privacy description for speech recognition services (for example, Apple's built-in speech recognizer). It's crucial for features like voice input to work.
- `<key>NSCameraUsageDescription</key><string>This app needs access to the camera to capture photos and videos.</string>`: The privacy description for camera access. This is required for capturing images via the camera, as used in the image picking functionality.
- `<key>NSMicrophoneUsageDescription</key><string>This app needs access to the microphone for audio recording.</string>`: The privacy description for microphone access. Necessary for recording audio for speech input.
- `<key>NSPhotoLibraryUsageDescription</key><string>This app needs access to your photo library.</string>`: The privacy description for reading from the user's photo library. This is required when picking existing images or videos from the gallery.
- `<key>NSPhotoLibraryAddUsageDescription</key><string>This app needs permission to save photos to your photo library.</string>`: The privacy description for writing to the user's photo library. This would be needed if the app captures photos/videos and saves them directly to the device's gallery.
- `<key>NSAppTransportSecurity</key><dict><key>NSAllowsArbitraryLoads</key><true/></dict>`: This section relates to Apple's App Transport Security (ATS). By default, ATS enforces secure connections (HTTPS). Setting `NSAllowsArbitraryLoads` to `true` (as shown here) *disables* this enforcement, allowing the app to make insecure HTTP connections. While useful during development or for interacting with specific legacy APIs, it's generally **not recommended for production apps** due to security implications. For production, you should ideally configure specific exceptions or ensure all network requests use HTTPS.

:::
