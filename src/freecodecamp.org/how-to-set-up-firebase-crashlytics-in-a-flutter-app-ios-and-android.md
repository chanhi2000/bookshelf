---
lang: en-US
title: "How to Set Up Firebase Crashlytics in a Flutter App (iOS and Android)"
description: "Article(s) > How to Set Up Firebase Crashlytics in a Flutter App (iOS and Android)"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Google
  - Firebase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - google
  - firebase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up Firebase Crashlytics in a Flutter App (iOS and Android)"
    - property: og:description
      content: "How to Set Up Firebase Crashlytics in a Flutter App (iOS and Android)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-firebase-crashlytics-in-a-flutter-app-ios-and-android.html
prev: /programming/dart/articles/README.md
date: 2025-08-21
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755735394033/aa70989a-2653-4f36-a8bf-fbf953d09512.png
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

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supabase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up Firebase Crashlytics in a Flutter App (iOS and Android)"
  desc="When you’re building mobile applications, one of the biggest challenges you might face is ensuring stability in real-world usage. No matter how much testing you do, unexpected crashes are bound to occur. This is where Firebase Crashlytics becomes an ..."
  url="https://freecodecamp.org/news/how-to-set-up-firebase-crashlytics-in-a-flutter-app-ios-and-android"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755735394033/aa70989a-2653-4f36-a8bf-fbf953d09512.png"/>

When you’re building mobile applications, one of the biggest challenges you might face is ensuring stability in real-world usage. No matter how much testing you do, unexpected crashes are bound to occur.

This is where **Firebase Crashlytics** becomes an essential tool. Crashlytics is a lightweight, real-time crash reporter that helps you understand why your app is crashing and how widespread the problem is among users. With this knowledge, you can fix bugs faster and improve your app’s reliability.

In this article, we’ll walk through setting up Firebase Crashlytics in a Flutter app for both iOS and Android platforms. Along the way, you’ll learn not only how to integrate Crashlytics, but also the reasoning behind each step, so you fully understand how it works.

::: note Prerequisites

Before jumping into the setup, make sure you have the following requirements ready. These prerequisites ensure your environment is properly configured and you won’t get stuck midway through the integration.

First, you need a working **Flutter installation** on your system. Flutter must be correctly installed and configured so you can run apps on both iOS and Android. If you haven’t set this up yet, follow the official [<FontIcon icon="fa-brands fa-dart-lang"/>Flutter installation](https://docs.flutter.dev/get-started/install) guide to prepare your development environment.

Next, you need a **Firebase account**. Firebase provides a web-based console where you’ll create a project that links to your Flutter app. You can sign up for free at the [<FontIcon icon="iconfont icon-firebase"/>Firebase Console](https://console.firebase.google.com/)

For a smoother integration process, I also highly recommend installing the [<FontIcon icon="iconfont icon-firebase"/>Firebase CLI](https://firebase.google.com/docs/flutter/setup?platform=ios). The CLI enables the `flutterfire configure` command, which automatically links your [<FontIcon icon="fa-brands fa-dart-lang"/>Flutter](https://docs.flutter.dev/get-started/install) project to Firebase and generates a <FontIcon icon="fa-brands fa-dart-lang"/>`firebase_options.dart` file with all your platform-specific configurations. This step is optional, but it saves you time compared to manually adding configuration files. You can install the CLI by following [<FontIcon icon="iconfont icon-firebase"/>Firebase CLI setup instructions](https://firebase.google.com/docs/cli).

Finally, ensure you have either an **iOS simulator** (via Xcode on macOS) or an **Android emulator** (via Android Studio or the command line) to test the integration. Crashlytics will only log crashes once the app has run on a real or simulated device.

With these prerequisites in place, you’re ready to move on to the actual integration steps.

---

## Set Up the Flutter Project

The journey begins by creating a Flutter project. If you don’t already have one, run the following command from your terminal:

```sh
flutter create my_crashlytics_app
cd my_crashlytics_app
```

This generates the boilerplate structure for your Flutter app, giving us a foundation where we can add Firebase and Crashlytics.

---

## Connect Flutter to Firebase

Before Crashlytics can work, your app must be connected to a Firebase project. Head over to the Firebase Console and create a new project. Think of the Firebase project as the “backend container” that manages all services, including analytics, authentication, and crash reporting.

Once the project is created, you need to register your Flutter apps with Firebase. Flutter supports both iOS and Android, so you’ll add both platforms.

On the iOS side, Firebase will guide you through adding an iOS app, downloading the <FontIcon icon="fa-brands fa-apple"/>`GoogleService-Info.plist` configuration file, and placing it inside the `ios/Runner` directory of your Flutter project. On Android, you’ll do something similar by downloading the <FontIcon icon="iconfont icon-json"/>`google-services.json` file and adding it to the <FontIcon icon="fas fa-folder-open"/>`android/app` directory.

If you prefer a more streamlined approach, the Firebase CLI provides a `flutterfire configure` command. Running this will allow you to select your Firebase project and automatically generate a <FontIcon icon="fa-brands fa-dart-lang"/>`firebase_options.dart` file for your Flutter app. This file centralizes your Firebase configuration and reduces manual setup.

---

## Add the Required Dependencies

With Firebase linked, the next step is to bring in the necessary packages that enable Crashlytics. Flutter integrates with Firebase through plugins, which are small libraries that bridge Flutter and native SDKs. Open your <FontIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file and add the following:

```yaml title="pubspec.yaml"
dependencies:
  firebase_core: ^4.0.0
  firebase_crashlytics: ^5.0.0
```

The `firebase_core` package initializes communication with Firebase, while `firebase_crashlytics` is the library that captures and reports crashes. Run `flutter pub get` to download and install these dependencies.

---

## Initialize Crashlytics in <FontIcon icon="fa-brands fa-dart-lang"/>`main.dart`

Now that the dependencies are installed, we need to initialize Firebase when the app starts and configure Crashlytics to capture both synchronous and asynchronous errors. Replace the contents of your <FontIcon icon="fas fa-folder-open"/>`lib/`<FontIcon icon="fa-brands fa-dart-lang"/>`main.dart` file with the following code:

```dart title="lib/main.dart"
import 'dart:ui';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'firebase_options.dart';
import 'presentation/home_screen.dart';
import 'package:flutter/material.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Capture Flutter framework errors
  FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError;

  // Capture uncaught asynchronous errors
  PlatformDispatcher.instance.onError = (error, stack) {
    FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
    return true;
  };

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Firebase Crashlytics Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}
```

Let’s pause to unpack this. The `FlutterError.onError` line ensures that any error that occurs inside Flutter’s widget tree is reported as a **fatal crash**. The `PlatformDispatcher.instance.onError` captures errors outside of the widget tree, such as asynchronous exceptions, and reports them to Crashlytics as well. Together, these configurations ensure that virtually all unexpected issues are sent to Firebase.

---

## Build a Simple Test Screen

To verify that Crashlytics works, let’s create a test screen where we can deliberately throw errors. Create a new folder called <FontIcon icon="fas fa-folder-open"/>`presentation` in your <FontIcon icon="fas fa-folder-open"/>`lib` directory, then inside it, create a file named <FontIcon icon="fa-brands fa-art-lang"/>`home_screen.dart` with the following content:

```dart :collapsed-lines title="lib/presentation/home_screen.dart"
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Firebase Crashlytics App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 15),
            ElevatedButton(
              onPressed: () => throw Exception('Test Exception'),
              child: const Text('Throw Exception'),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {
                throw const FormatException('Custom format error occurred');
              },
              child: const Text('Throw Exception with Feedback'),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

This screen provides two buttons: one that throws a general exception and another that throws a format exception. When clicked, these crashes are reported to Crashlytics. This makes it easy to test whether your setup is working correctly.

![General and format exception buttons](https://cdn.hashnode.com/res/hashnode/image/upload/v1701668096906/3ccf29af-d94e-479a-aebd-664c390e4ba3.png)

---

## Run and Test the App

At this stage, run the app on an iOS simulator or Android emulator. Interact with the screen and press the buttons that throw exceptions. Even though the app will crash or display an error, Crashlytics will silently log the details and send them to Firebase once the app restarts and regains network connectivity.

Crashes usually take a couple of minutes to appear in the Firebase Console. Navigate to your project in the console, then go to **Release & Monitor > Crashlytics**. There, you will see a dashboard listing all recorded crashes, complete with stack traces, device information, and frequency of occurrence. The screenshots below showcase what you’ll be able to see on Crashlytics.

![Crashlytics Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1701668003651/e43c9e64-7a64-4d7b-a94f-2f908f2c76b9.png)

![Checking Logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1701668011519/354c38af-f263-4de1-9896-f6e2dc16167c.png)

![Viewing Data](https://cdn.hashnode.com/res/hashnode/image/upload/v1701668015513/3448cdaa-22eb-4cdb-8fad-07694ac6a0c9.png)

![Detailed log of error](https://cdn.hashnode.com/res/hashnode/image/upload/v1701668020390/877dee08-c182-4ec8-beca-c3c1dc27692a.png)

![Stack trace of error](https://cdn.hashnode.com/res/hashnode/image/upload/v1701668024117/a2335fcc-4e56-438c-9d88-e37d98ca051c.png)

---

## Understanding the Crashlytics Dashboard

The Crashlytics dashboard is more than just a list of crashes. It groups issues together so you can see how many users are affected by a specific bug. It highlights trends such as whether a particular crash is new, increasing, or decreasing. It also integrates with alerts, allowing you to get notified when a severe issue affects a significant portion of your users.

This means you don’t just learn that your app crashed, you also get actionable insights to prioritize which bugs need immediate attention.

---

## Advanced Firebase Crashlytics in Flutter: Going Beyond the Basics

Once Crashlytics is successfully integrated into your Flutter app, the next step is to take full advantage of its advanced features. While catching crashes is useful, real-world debugging often requires context, deeper insights, and error handling strategies that go beyond simply knowing an app has failed. Let’s explore these advanced concepts.

### How to Log Non-Fatal Errors

Not every problem in an application leads to a crash. Sometimes you’ll encounter recoverable errors, such as a failed API call, a parsing issue, or a user action that leads to unexpected behavior. These issues don’t crash your app but still affect user experience. Crashlytics allows you to record them as **non-fatal errors**.

In Flutter, you can use:

```dart
try {
  // Some code that might fail
  final result = int.parse("invalid_number");
} catch (e, stack) {
  FirebaseCrashlytics.instance.recordError(
    e,
    stack,
    fatal: false,
    reason: 'Number parsing failed in profile setup',
  );
}
```

Here, the `fatal: false` flag ensures the error is logged without being treated as a full app crash. The optional `reason` parameter provides extra human-readable context in the Crashlytics dashboard. This feature is invaluable for tracking silent failures that degrade performance but don’t necessarily kill your app.

### How to Add Custom Keys for Context

One of the challenges with debugging crashes in production is reproducing the problem. A stack trace alone often doesn’t tell you enough about the user’s journey. Custom keys allow you to attach extra metadata to Crashlytics reports, such as the user’s app state, preferences, or which feature they were using when the crash occurred.

For example:

```dart
FirebaseCrashlytics.instance.setCustomKey('screen', 'CheckoutScreen');
FirebaseCrashlytics.instance.setCustomKey('cart_items', 3);
FirebaseCrashlytics.instance.setCustomKey('payment_method', 'Card');
```

With these keys set, any crash or non-fatal error that occurs while the user is on the checkout screen will carry this context. When you open the report in the Firebase Console, you’ll immediately see these values, which makes debugging significantly easier.

### How to Log Custom Events and Breadcrumbs

In addition to custom keys, Crashlytics allows you to log custom messages that act as **breadcrumbs**. These are small logs that tell you what the app was doing leading up to a crash.

```dart
FirebaseCrashlytics.instance.log('User tapped "Place Order" button');
FirebaseCrashlytics.instance.log('API request started: /checkout');
FirebaseCrashlytics.instance.log('Payment process initialized');
```

If a crash happens afterward, you’ll have a trail of events that explain the sequence leading up to the failure. This is often the missing piece in diagnosing complex crashes.

### How to Associate Crashes with Users

Crashlytics supports **user identifiers**, allowing you to link crashes back to specific users. While you should avoid storing sensitive data, you can safely attach unique identifiers such as user IDs, emails, or usernames.

```dart
FirebaseCrashlytics.instance.setUserIdentifier('user_12345');
```

With this, you can investigate whether specific users or groups of users are disproportionately affected by a bug. This also helps customer support teams quickly link bug reports from users to real data in Crashlytics.

### How to Ensure Proper Symbolication

When you run your app in debug mode, stack traces are human-readable. But in release builds, especially on iOS and Android, stack traces can be obfuscated or stripped of symbols. Symbolication is the process of mapping these stripped traces back to meaningful method and class names.

::: tabs

@tab:active On <FontIcon icon="iconfont icon-ios"/>iOS

you’ll need to upload dSYM files (debug symbol files) to Firebase. These files are generated when you build your iOS app for release. You can automate the upload by adding a Run Script in Xcode under your project’s build settings:

```sh
"${PODS_ROOT}/FirebaseCrashlytics/upload-symbols" \
-gsp "${PROJECT_DIR}/Runner/GoogleService-Info.plist" \
-p ios "${DWARF_DSYM_FOLDER_PATH}/${DWARF_DSYM_FILE_NAME}"
```

This ensures that whenever you build a release, symbol files are automatically uploaded to Firebase.

@tab On <FontIcon icon="fa-brands fa-android"/>Android

if you’re using ProGuard or R8 for code shrinking and obfuscation, you’ll need to upload mapping files. In your `app/build.gradle`, enable the Crashlytics Gradle plugin:

```sh
apply plugin: 'com.google.firebase.crashlytics'
```

This plugin takes care of uploading the mapping files automatically when you build a release.

:::

Without symbolication, your crash reports will contain unreadable stack traces, making debugging almost impossible. Ensuring proper symbol upload is critical for production-level monitoring.

### How to Controll Data Collection

In some cases, such as adhering to GDPR or other data privacy laws, you may want to control when Crashlytics starts collecting data. Flutter gives you a way to enable or disable collection dynamically:

```dart
await FirebaseCrashlytics.instance.setCrashlyticsCollectionEnabled(false);
```

You can turn this on once the user has given consent. This flexibility is especially useful in regions with strict user privacy requirements.

---

## Best Practices for Production

1. **Test before release**: Always trigger crashes in debug mode and confirm they appear in the Crashlytics dashboard before deploying your app.
2. **Use non-fatal logs liberally**: Many silent issues can be caught this way before they escalate into widespread crashes.
3. **Automate symbol uploads**: Make sure your CI/CD or build pipeline uploads dSYM (iOS) and mapping files (Android) consistently.
4. **Add context with custom keys and logs**: The more context you attach, the faster you can reproduce and fix bugs.
5. **Respect privacy**: Never log personally identifiable or sensitive information.

---

## Conclusion

Integrating Firebase Crashlytics into a Flutter app is a straightforward process, but its impact is massive. By providing real-time crash reporting and detailed analytics, Crashlytics helps you maintain stability, build user trust, and ultimately deliver a better app experience. From setting up the Firebase project to capturing both synchronous and asynchronous errors, we’ve gone through everything you need to get started.

Crashlytics goes far beyond crash reporting. By leveraging features like non-fatal error logging, custom keys, breadcrumbs, and user identifiers, you can transform raw crash data into meaningful insights that directly improve your debugging process.

With proper symbolication in place, you’ll always have readable stack traces, making it much easier to fix issues in production. With this advanced setup, Crashlytics becomes not just a safety net, but a core part of your development workflow, helping you ship stable apps, respond quickly to issues, and build trust with your users.

The next step is to deploy your app to real devices and monitor crashes as they happen in the wild. Over time, Crashlytics will become one of your most valuable tools in maintaining app quality.

::: info References

<SiteInfo
  name="Choose your development platform to get started"
  desc="Install Flutter and get started developing! Downloads available for Windows, macOS, Linux, and ChromeOS operating systems."
  url="https://docs.flutter.dev/get-started/install/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>


```component VPCard
{
  "title": "Firebase console",
  "desc": "Firebase is a mobile platform that helps you quickly develop high-quality apps, grow your user base, and earn more money.",
  "link": "https://console.firebase.google.com",
  "logo": "https://console.firebase.google.com//gstatic.com/mobilesdk/240501_mobilesdk/firebase_16dp.png",
  "background": "rgba(232,128,0,0.2)"
}
```

```component VPCard
{
  "title": "Add Firebase to your Flutter app",
  "desc": "",
  "link": "https://firebase.google.com/docs/flutter/setup/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v80eb94e0352d656ad1e20abf6117cdec6c1343c7722ef10f52a1a3f77f1e58f7/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

<SiteInfo
  name="firebase_crashlytics | Flutter package"
  desc="Flutter plugin for Firebase Crashlytics. It reports uncaught errors to the Firebase console."
  url="https://pub.dev/packages/firebase_crashlytics/"
  logo="https://pub.dev/static/hash-fepf1d0b/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fepf1d0b/img/pub-dev-icon-cover-image.png"/>


<SiteInfo
  name="firebase_core | Flutter package"
  desc="Flutter plugin for Firebase Core, enabling connecting to multiple Firebase apps."
  url="https://pub.dev/packages/firebase_core/"
  logo="https://pub.dev/static/hash-fepf1d0b/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-fepf1d0b/img/pub-dev-icon-cover-image.png"/>

```component VPCard
{
  "title": "Firebase Crashlytics",
  "desc": "Get clear, actionable insight into app issues with this powerful crash reporting solution for Apple, Android, Flutter, and Unity.",
  "link": "https://firebase.google.com/docs/crashlytics/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v80eb94e0352d656ad1e20abf6117cdec6c1343c7722ef10f52a1a3f77f1e58f7/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

```component VPCard
{
  "title": "Get readable crash reports in the Crashlytics dashboard  |  Firebase Crashlytics",
  "desc": "By default, Firebase Crashlytics automatically processes your debug symbol (dSYM) files to give you deobfuscated and human-readable crash reports. You usually configure this behavior during the initial setup of Crashlytics in your app, specifically by adding a run script that automatically uploads dSYM files during your app's build phase.",
  "link": "https://firebase.google.com/docs/crashlytics/get-deobfuscated-reports/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v80eb94e0352d656ad1e20abf6117cdec6c1343c7722ef10f52a1a3f77f1e58f7/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

```component VPCard
{
  "title": "Get readable crash reports in the Crashlytics dashboard  |  Firebase Crashlytics",
  "desc": "The Crashlytics Gradle plugin can automatically detect when you obfuscate your code. When your build generates a mapping file, the plugin uploads it so the Crashlytics servers can use the file to render your app's stack traces as unobfuscated and human-readable code.",
  "link": "https://firebase.google.com/docs/crashlytics/get-deobfuscated-reports/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v80eb94e0352d656ad1e20abf6117cdec6c1343c7722ef10f52a1a3f77f1e58f7/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

<SiteInfo
  name="Firebase CLI reference  |  Firebase Documentation"
  desc="The Firebase CLI (GitHub) provides a variety of tools for managing, viewing, and deploying to Firebase projects.Before using the Firebase CLI, set up a Firebase project."
  url="https://firebase.google.com/docs/cli/"
  logo="https://gstatic.com/devrel-devsite/prod/v80eb94e0352d656ad1e20abf6117cdec6c1343c7722ef10f52a1a3f77f1e58f7/firebase/images/favicon.png"
  preview="https://firebase.google.com/static/images/social.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up Firebase Crashlytics in a Flutter App (iOS and Android)",
  "desc": "When you’re building mobile applications, one of the biggest challenges you might face is ensuring stability in real-world usage. No matter how much testing you do, unexpected crashes are bound to occur. This is where Firebase Crashlytics becomes an ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-firebase-crashlytics-in-a-flutter-app-ios-and-android.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
