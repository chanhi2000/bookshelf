---
lang: en-US
title: "How is Flutter Platform-Agnostic?"
description: "Article(s) > How is Flutter Platform-Agnostic?"
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
      content: "Article(s) > How is Flutter Platform-Agnostic?"
    - property: og:description
      content: "How is Flutter Platform-Agnostic?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-is-flutter-platform-agnostic.html
prev: /programming/dart/articles/README.md
date: 2024-05-07
isOriginal: false
author:
  - name: Obum
    url : https://freecodecamp.org/news/author/obumnwabude/
cover: https://freecodecamp.org/news/content/images/2024/05/Screenshot-2024-05-02-225922.png
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
  name="How is Flutter Platform-Agnostic?"
  desc="Flutter builds applications for multiple platforms (desktop, mobile, and web) from the same codebase. Flutter does this in a pixel-perfect and platform-agnostic manner.  In this article, we will explore how Flutter is platform-agnostic through how it..."
  url="https://freecodecamp.org/news/how-is-flutter-platform-agnostic"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/05/Screenshot-2024-05-02-225922.png"/>

Flutter builds applications for multiple platforms (desktop, mobile, and web) from the same codebase. Flutter does this in a pixel-perfect and platform-agnostic manner.

In this article, we will explore how Flutter is platform-agnostic through how it renders user interfaces and through platform channels.

---

## What is Platform-Agnosticism?

Platform-agnosticism is a relative measure of how an app works the same way, irrespective of the operating system on which the app is running.

When we say that an app or tool is platform-agnostic, users expect the same experience on that given application across their different devices.

To be platform-agnostic is to be indifferent to the device or the operating system. Users don't know the technical hurdle behind an app's architecture. They want to enjoy your app. That's why you should give them the same experience across various platforms.

Flutter apps run in a platform-agnostic manner. Flutter apps work the same way on different platforms. This gives users (and developers) a seamless experience.

This article explores how Flutter does this. But before diving in, let's look at how native and other cross-platform tools handle their applications.

---

## How Native and other Cross-Platform Apps Work

Operating systems or platforms (Android, iOS, Linux, macOS, Windows, and so on) specify how to build applications on them. They provide developers with the required APIs for apps to work.

When applications run, they constantly communicate with the underlying operating system. These native apps display buttons, icons, text, and other UI elements as platform-provided or OEM widgets. They also have access to device services like audio, Bluetooth, camera, and so on.

To build an application for a specific operating system, you normally use the programming language(s) and SDKs specified by that platform.

![How Native Apps Work](https://freecodecamp.org/news/content/images/2024/05/native_apps.png) *How Native Apps Work*

Initially, if you wanted your app to be available on multiple platforms, you'd have to build the same app for each platform but with separate SDKs as each platform requires. This also implies separate codebases, different developers, and more coding time.

Well, nowadays, we mostly use cross-platform tools to build apps. They use the same codebase to build applications on multiple operating systems. They solve the problem of multiple developer skillset and long development time by using the same codebase.

Cross-platform application frameworks have their rules and languages too. Nevertheless, behind the scenes, they still compile the code you wrote into what each platform needs. Examples of such cross-platform tools include Flutter, React Native, Xamarin, and so on.

Each framework has its underlying mechanisms to compile across multiple operating systems. Other frameworks (outside Flutter) are usually tightly-coupled to the target platform. They use bridges to access platform services. The bridge also renders the app's UI by using the target platform's specific UI components. Furthermore, some cross-platform apps sometimes use webview to render UIs.

![How Cross-Platform Apps Work](https://freecodecamp.org/news/content/images/2024/05/other_cross_platform_apps.png)

The above is not how Flutter works. Flutter uses a different and innovative approach to build cross-platform apps. It does this by ensuring that the app is the same irrespective of the host platform.

Flutter is platform-agnostic. Flutter apps are technically separate from their host app.

---

## How Flutter Apps are Different from their Host Apps

When Flutter builds an app for a target platform, it ships an *inner Flutter app* and the Flutter engine within the built app. For example, when we build a Flutter codebase for Android, we will obtain an APK (an Android "installable"). Within this Flutter-built APK will be the Flutter engine and the Flutter app.

With this, the inner Flutter app performs similarly on each platform. When a user launches the "host" app on their device, the Flutter engine starts up and in turn, launches the inner Flutter app. Given that the engine runs Flutter, it will always run the same thing on whatever platform.

The advantage of separating Flutter apps from their host apps is platform-agnosticism. In other words, having the same app and user experience across every platform.

If the platform was to run the app contents directly or if it was a cross-platform bridge, we would have differences and discrepancies in how the app runs across various operating systems. This is because each operating system has its unique way of running apps.

Because Flutter apps run independently from their host apps, the Flutter framework lifts UI rendering and service access into the Flutter app (through the Flutter engine). That way, the Flutter app is more in charge and has better control over how the app feels.

For rendering UIs, the Flutter app draws Flutter widgets on a "canvas" in the host app. To access services, the Flutter app uses platform channels to interact with the host app when needed.

![How Flutter Apps Work](https://freecodecamp.org/news/content/images/2024/05/flutter_apps.png)

---

## How Does Flutter Render User Interfaces (UIs)?

At the core of Flutter's platform-agnostic UI rendering is a pipeline, orchestrated by multiple UI layers. These layers include the embedder, the Flutter engine (with Skia or Impeller), and your Flutter App's UI.

The embedder serves as the bridge between the Flutter engine and the host platform. It provides an agnostic Application Binary Interface (ABI) for the Flutter Engine. It is written in the host platform's native programming language. It is deployed per platform. In other words, each platform has its embedder. Flutter uses the embedder to interface with the underlying operating system.

The Flutter engine executes Dart code, manages assets, handles events, and most importantly, renders UI. It draws (or rasterizes user interfaces) the same way irrespective of the platform. Hence, achieving platform-agnosticism.

The Flutter engine uses [<VPIcon icon="fas fa-globe"/>Skia](https://skia.org) or [<VPIcon icon="fa-brands fa-dart-lang"/>Impeller](https://docs.flutter.dev/perf/impeller) for low-level rendering tasks. Skia is an open-source graphics library with a robust set of drawing capabilities. Skia makes it possible to create smooth UIs.

Recently, we've got Impeller. Impeller provides a new rendering runtime for Flutter. It is already the default rendering tool in iOS devices and is coming soon to Android. It is an improvement to and should replace Skia.

On the host platform, Flutter accesses a black "canvas" (or the screen) and renders with its tools. On the web, it is the same thing but with a slight difference. There is no embedder (because there is no operating system). However, we convert UI directly from the Flutter framework into CanvasKit rendering.

Whether we are using the embedder and Flutter engine to render an app on any operating system or relying on Dart to JavaScript transpilation to render on browsers, Flutter apps are the same on the painted UI.

![The "Canvas"es used by Flutter for Each Platform ](https://freecodecamp.org/news/content/images/2024/05/image.png)

![The rendering layers of Flutter Apps in Operating Systems and Browsers](https://freecodecamp.org/news/content/images/2024/05/image-4.png)

This entire architecture makes it possible that if a new operating system arises, we will only need to replicate the embedder with the expected Flutter engine ABI for that new OS. Once done, all existing Flutter apps will easily work on the OS.

Aside from UI rendering, Flutter is also platform-agnostic with the help of Platform Channels.

---

## How Do Platform Channels Work in Flutter?

In Flutter, platform channels serve as important communication routes at runtime between the Flutter framework and the host app (or the underlying native platform). Platform channels act as bridges between platform-agnostic Dart code and platform-specific functionalities.

Platform channels enable seamless integration of platform-specific features into Flutter apps. With them, you can leverage the capabilities of each target platform while maintaining a unified codebase.

With platform channels, Flutter achieves platform-agnosticism by abstracting away platform-specific details. As a result, you can write Flutter code that can seamlessly run on multiple platforms without extraneous modification.

There are two types of platform channels: method channels and event channels.

### Method Channels

They are the most used. They facilitate bidirectional communication between Dart code and native platform code.

Through method channels, Flutter apps can invoke platform-specific methods, passing parameters and receiving results asynchronously. The reverse is also obtainable. The host (or native side of the) app can call methods defined inside the Flutter app.

This allows you to access platform-specific APIs, system services, and hardware functionalities, such as accessing device sensors, interacting with native UI components, or integrating with platform-specific SDKs.

![Systematic Diagram of MethodChannels](https://freecodecamp.org/news/content/images/2024/05/platform-channels.png)

### Event Channels

Event channels transmit asynchronous events from the native platform to Dart code. They are useful in cases where the native platform needs to notify the Flutter app of asynchronous events or updates.

Good examples of such scenarios include:

- Receiving sensor data in real time
- Handling push notifications
- Monitoring system-level events, and so on.

Event channels are crucial. With them, you can build reactive, event-driven apps that respond to changes in the underlying platform in a platform-agnostic manner.

Your Dart code needs to listen to event streams. These streams' values are emitted from the underlying platform. But how you handle them within the Dart facing side of the Flutter is usually the same way, hence platform-agnosticism.

### Packages and Plugins

A Flutter package is reusable code that can extend your app. More than 25000 Flutter packages are deployed on [pub.dev](https://pub.dev). There is already a package(s) of platform-specific features that you want to implement in your app.

The Flutter framework itself is relatively small. It is the contribution of the community that builds these packages that makes the entire ecosystem large.

While there are many packages for Flutter-direct features, some provide platform-dependent features (like Camera, Location, Permissions, and so on). These platform-dependent packages use platform channels and plugins behind the scenes.

Plugins in Flutter are packages that encapsulate platform-specific functionality and expose them to Dart code through method and event channels. They act as wrappers around platform channels, providing a unified API surface for accessing platform-specific features. They abstract away the complexities of interacting with platform channels.

However, if there is no plugin for a feature you are building (which is rare), you can use platform channels. They make the Flutter code work the same way, no matter the platform. You will have to write the platform-specific method or event handlers in the programming languages specified by the involved platforms.

![Platform Channels Programming Languages ](https://freecodecamp.org/news/content/images/2024/05/image-5.png)

---

## Summary

Understanding Flutter's platform-agnosticism is important in appreciating the innovative architecture powering Flutter.

From how it renders user interfaces the same way on every device, to how it can run device-specific code at runtime, Flutter gives you a smooth developer experience and highly performant apps.

When next you use Flutter, don't be surprised how it achieves the same application on different devices.

Cheers!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How is Flutter Platform-Agnostic?",
  "desc": "Flutter builds applications for multiple platforms (desktop, mobile, and web) from the same codebase. Flutter does this in a pixel-perfect and platform-agnostic manner.  In this article, we will explore how Flutter is platform-agnostic through how it...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-is-flutter-platform-agnostic.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
