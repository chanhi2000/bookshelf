---
lang: en-US
title: "How to Push Silent Updates in Flutter Using Shorebird"
description: "Article(s) > How to Push Silent Updates in Flutter Using Shorebird"
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
      content: "Article(s) > How to Push Silent Updates in Flutter Using Shorebird"
    - property: og:description
      content: "How to Push Silent Updates in Flutter Using Shorebird"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-push-silent-updates-in-flutter-using-shorebird.html
prev: /programming/dart/articles/README.md
date: 2025-08-02
isOriginal: false
author:
  - name: Atuoha Anthony
    url : https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754063853545/725d429a-1bc1-40af-b089-3f742879a9bb.png
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
  name="How to Push Silent Updates in Flutter Using Shorebird"
  desc="Imagine you've just launched a major feature. Your app is climbing the charts, but then the first bug report arrives. It's a critical payment validation error. The fix is a single line of Dart code, but now you face the dreaded app store review queue..."
  url="https://freecodecamp.org/news/how-to-push-silent-updates-in-flutter-using-shorebird"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754063853545/725d429a-1bc1-40af-b089-3f742879a9bb.png"/>

Imagine you've just launched a major feature. Your app is climbing the charts, but then the first bug report arrives. It's a critical payment validation error. The fix is a single line of Dart code, but now you face the dreaded app store review queue, hours, maybe days of delay, all while your users and revenue are impacted.

What if you could bypass the store and deliver that fix directly to your users in minutes?

This is the power Shorebird brings to your Flutter workflow. It's not just about speed, it's about control, reliability, and delivering a superior user experience.

This guide will take you from a novice to a pro, covering everything from setting up Shorebird to implementing robust, production-grade update strategies with the `upgrader` package.

::: note Prerequisites

Before you dive in, make sure you have the following knowledge and tools set up. This will help you follow the guide smoothly and avoid common setup issues.

:::: tabs

@tab:active Knowledge and Skills

- **Fundamental Flutter knowledge:** You should be comfortable creating Flutter projects, managing packages with <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, and understanding the basic widget lifecycle. This guide assumes you have an existing Flutter application to work with.
- **Command-line proficiency:** You need to be comfortable using a terminal (like Terminal on macOS/Linux or PowerShell on Windows), as Shorebird is primarily a Command-Line Interface (CLI) tool. This includes navigating directories and executing commands.
- **Basic Git and version control:** Understanding concepts like commits, branches (`main`, `hotfix`), and checking out code is crucial for managing releases, creating patches from specific code states, and implementing rollback strategies.

@tab Tools and Environment

- **A working Flutter development environment:**
  - The latest stable version of the **Flutter SDK**.
  - An IDE configured for Flutter, such as **VS Code** or **Android Studio**.
- **A Shorebird account:**
  - You’ll need to sign up for a free account on the [Shorebird website](https://shorebird.dev). The `shorebird login` command requires this.
- **Platform-Specific Build Tools:**
  - **For Android:**
    - An installation of **Android Studio** and the corresponding **Android SDK**.
    - A configured **signing keystore** (`key.jks`) and `key.properties` file for your project. Shorebird needs this to create signed, production-ready release builds (AABs).
  - **For iOS:**
    - A macOS computer with **Xcode** installed. Building for iOS is not possible on Windows or Linux.
    - An active **Apple Developer Program membership** is required to code sign and release iOS apps.

@tab Optional (but Recommended for the Full Strategy)

- **A Firebase project:** To implement the complete, real-world strategy involving forced updates and remote feature flags, you will need:
  - A Firebase project linked to your Flutter app.
  - The **Firebase Remote Config** service enabled.
  - The `firebase_core` and `firebase_remote_config` packages added to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`.

::::

---

## What is Shorebird?

Shorebird is a code push service specifically designed for Flutter applications. It allows developers to deliver small, critical bug fixes and even new features directly to users' devices, bypassing the traditional app store review process. In essence, it enables "over-the-air" (OTA) updates for Flutter apps.

This means that instead of waiting hours or days for app store approval for a simple fix, you can deploy the change almost instantly, ensuring a much faster response to issues, reduced downtime for users, and minimal impact on revenue. It gives you greater control over your app's deployment lifecycle and helps maintain a smoother, more reliable user experience.

---

## 1. The "Why": When to Patch vs. When to Release

Before diving into the "how," it's crucial to understand the "when/why." Not all updates are created equal. Using the right tool for the job is key to a stable and efficient development cycle.

::: tabs

@tab:active Use <code>shorebird patch</code> for:

- **Critical bug fixes:** Logic errors in your Dart code (for example, calculation mistakes, null pointer exceptions, incorrect state management).
- **Minor UI tweaks:** Changing colors, text, or layout logic without adding new assets.
- **Feature flag toggles:** Pushing a code change that enables or disables a feature you've already built and deployed.
- **Performance improvements:** Optimizing algorithms or Dart-level rendering logic.

@tab Use a full store release for:

- **Native code changes:** Any modifications to the `android` or `ios` directories.
- **Plugin/dependency updates:** Adding a new package or upgrading an existing one in <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, as this often changes native code or includes pre-compiled binaries.
- **Asset changes:** Adding new images, fonts, JSON files, or any other assets.
- **Major feature releases:** When the app's functionality or UI changes significantly, it's best practice (and often required by store policies) to go through a full review.

:::

Think of it this way: if the change is **only in your** `.dart` files and doesn't touch <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`, it's likely patchable.

---

## 2. Getting Started: Installation & Project Setup

Let's get your environment and project ready for Shorebird.

### Step 1: Install the Shorebird CLI

Open your terminal and run the official installation script:

```sh
curl https://raw.githubusercontent.com/shorebirdtech/shorebird/main/install.sh -sSf | bash
```

### Step 2: Add Shorebird to your PATH

To use the `shorebird` command from anywhere, add it to your shell's configuration file (<VPIcon icon="fas fa-file-lines"/>`.zshrc`, <VPIcon icon="fas fa-file-lines"/>`.bashrc`, <VPIcon icon="fas fa-file-lines"/>`.bash_profile`, and so on).

```sh
export PATH="$HOME/.shorebird/bin:$PATH"
```

Restart your terminal or run `source ~/.zshrc` (or your respective file) for the change to take effect.

### Step 3: Verify and Log In

Confirm the installation was successful and log in to your Shorebird account.

```sh
shorebird --version
shorebird login
```

This will open a browser window to authenticate your CLI with the Shorebird service.

### Step 4: Initialize Shorebird in Your Flutter Project

Navigate to the root directory of your Flutter project and run:

```sh
shorebird init
```

This command is your project's entry point into the Shorebird ecosystem. Here’s what it does under the hood:

1. Creates <VPIcon icon="iconfont icon-yaml"/>`shorebird.yaml`: This file stores your unique app ID. Commit this to version control.
2. Modifies <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`: It automatically adds the `shorebird_code_push` package, which is necessary for the app to communicate with Shorebird's servers.
3. Updates <VPIcon icon="iconfont icon-git"/>`.gitignore`: Adds the `.shorebird/` directory to prevent temporary build artifacts from being committed.

---

## 3. The Core Workflow: Releasing and Patching

Shorebird's workflow is built on a simple concept: you create a **base release**, and then you apply **patches** to it.

### Step 1: Create a Full Release

Before you can patch anything, you need a full version of your app built with Shorebird. This release will be submitted to the App Store and Play Store.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-android"/>

```sh
shorebird release android
```

@tab <VPIcon icon="iconfont icon-ios"/>

```sh
shorebird release ios
```

:::

This command compiles your app, uploads the necessary symbols to Shorebird's servers so it can build patches later, and generates the release artifact (AAB/IPA) for you to upload to the stores.

### Step 2: Create and Publish a Patch

After fixing a bug or making a tweak in your Dart code, you can create a patch. Shorebird will compare your changes against the original release and create a small, efficient binary diff.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-android"/>

```sh
shorebird patch android
```

@tab <VPIcon icon="iconfont icon-ios"/>

```sh
shorebird release ios
```

:::

This patch is immediately available to users who have the corresponding base release installed.

### Step 3: The User Experience

When you push a patch, the process is designed to be seamless:

1. **Silent download:** On the next app launch, the `shorebird_code_push` SDK checks for a new patch. If one is found, it downloads silently in the background.
2. **Applied on next relaunch:** The downloaded patch is staged and automatically applied the *next time* the user closes and re-opens the app. This ensures their current session is not interrupted.

---

## 4. Taking Control: In-App Update Logic in Flutter

For a more controlled experience, you can use the `shorebird_code_push` package to manage the update process within your app.

```dart
import 'package:shorebird_code_push/shorebird_code_push.dart';

final _shorebirdCodePush = ShorebirdCodePush();

// Check for a new patch on app start.
void checkForUpdate() async {
  // Check if a new patch is available.
  final isUpdateAvailable = await _shorebirdCodePush.isNewPatchAvailableForDownload();

  if (isUpdateAvailable) {
    // Optionally, you can show a dialog to the user here.
    // e.g., "A quick update is available. It will be applied on next restart."

    // Download the new patch.
    await _shorebirdCodePush.downloadUpdateIfAvailable();
  }
}

// For critical updates, you can force an immediate restart.
void forceRestart() async {
  // Make sure a patch is downloaded and ready to be installed.
  if (await _shorebirdCodePush.isNewPatchReadyToInstall()) {
    // This will force the app to close and restart with the new patch.
    // Use with caution, as it's a disruptive user experience.
    await _shorebirdCodePush.installUpdateAndRestart();
  }
}
```

Call `checkForUpdate()` in your `main()` function or the `initState` of your primary screen.

---

## 5. The Nuclear Option: Forcing Updates with `upgrader`

Sometimes, a Shorebird patch isn't enough. For critical updates that involve native code, new assets, or if you need to ensure every single user is on the latest version right now, you need a blocking update screen. The `upgrader` package is perfect for this.

### Step 1: Add the Dependency

```yaml title="pubspec.yaml"
dependencies:
  upgrader: ^7.0.0
```

### Step 2: Implement the Blocking UI

Wrap your `MaterialApp` with the `UpgradeAlert` widget to create a blocking dialog that cannot be dismissed.

```dart
import 'package:flutter/material.dart';
import 'package:upgrader/upgrader.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // This configuration creates a blocking "must-update" screen.
    final upgrader = Upgrader(
      showIgnore: false,
      showLater: false,
      canDismissDialog: false,
      dialogStyle: UpgradeDialogStyle.material,
      shouldPopScope: () => false, // Prevents back navigation
    );

    return MaterialApp(
      home: UpgradeAlert(
        upgrader: upgrader,
        child: HomeScreen(), // Your app's main screen
      ),
    );
  }
}
```

---

## 6. Real-World Playbook: Combining Shorebird, Upgrader, and Remote Config

Here’s how to tie everything together for a bulletproof update strategy. Let's use Firebase Remote Config to act as our remote "kill switch."

::: note Scenario

Version `1.2.0` of your app has a critical payment bug.

### The Playbook

#### 1. Fix the bug

Correct the error in your Dart code.

#### 2. Push a Shorebird patch

```sh
shorebird patch android --release-version 1.2.0+10 
# Use --release-version to target a specific build
```

This delivers the fix to active users quickly and silently.

#### 3. Set a remote flag

In your Firebase Remote Config console, create a parameter like `force_update_for_version` and set its value to `"1.2.0"`.

#### 4. Implement logic in your app

On app start, check this flag *before* showing your main UI.

```dart
import 'package:firebase_remote_config/firebase_remote_config.dart';
import 'package:package_info_plus/package_info_plus.dart';
    
Future<void> main() async {
  // ... initialization code ...

  // Get current app version
  final packageInfo = await PackageInfo.fromPlatform();
  final currentVersion = packageInfo.version;

  // Fetch remote config
  final remoteConfig = FirebaseRemoteConfig.instance;
  await remoteConfig.fetchAndActivate();
  final forceUpdateVersion = remoteConfig.getString('force_update_for_version');

  // Check if this version is flagged for a forced update
  if (currentVersion == forceUpdateVersion) {
    // This is a "bad" version. Show the blocking update screen.
    runApp(ForcedUpdateApp());
  } else {
    // This version is fine. Run the normal app and check for a Shorebird patch.
    checkForUpdate(); // Your Shorebird check function
    runApp(MyApp());
  }
}
    
// A simple app that only shows the upgrader screen.
class ForcedUpdateApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: UpgradeAlert(
        child: Scaffold(body: Center(child: Text('Checking for updates...'))),
      ),
    );
  }
}
```

This dual strategy ensures that users who haven't received the Shorebird patch yet are still blocked from using the buggy version and are directed to the store.

---

## 7. Production-Grade Best Practices

Before you hit “patch” in production, you should treat Shorebird like any other release pipeline: test the build, roll it out in waves, keep an eye on crash metrics, and automate the boring parts. Here are some best practices to follow:

First, always test patches. Use `shorebird preview` to test your patch on a local device or emulator before deploying it to users.

```sh
shorebird preview
```

Use staged rollouts with channels. Don't push a critical patch to 100% of users at once. Shorebird's "channels" feature lets you deploy to a `staging` audience first.

```sh
# Push patch to internal testers
shorebird patch android --channel=staging

# After verification, promote it to all users
shorebird promote --channel=staging --release-version 1.2.0+10
```

You should also have a rollback plan if a patch makes things worse. In this case, the fastest way to fix it is to **patch forward**. Check out the last known-good commit from Git and run `shorebird patch` again. This new patch will overwrite the bad one.

And make sure you monitor everything. To do this, you can use tools like Firebase Crashlytics or Sentry to monitor crash rates and app stability after a patch is released.

Finally, it’s helpful to automate with CI/CD, and you can integrate Shorebird right into your CI/CD pipeline (for example, GitHub Actions). Store your `SHOREBIRD_TOKEN` as a secret and use commands like `shorebird patch android --release-version <version> --force` to automate deployments.

---

## 8. Security, Cost, and Limitations

There are some other things you should keep in mind when using Shorebird.

First, all communication with Shorebird's servers is over TLS. Patches are cryptographically signed, and the `shorebird_code_push` SDK verifies this signature before applying an update, ensuring it hasn't been tampered with.

Second, Shorebird operates on a freemium model with a generous free tier. Paid plans are based on Monthly Active Users (MAU) and unlock team features. You can check the official pricing page for current details.

Also, keep in mind that there are some limitations that we’ve already touched on a bit: for example, Shorebird **only patches Dart code**. You can’t update native plugins, add/change assets, or modify native code (`android`/`ios` folders) with a patch. These changes always require a full store release.

---

## Wrapping Up

Shorebird is a transformative tool for any serious Flutter developer. It moves the release process from a monolithic, slow cycle to a dynamic, responsive one.

By combining Shorebird's rapid patching with a robust forced-update strategy using `upgrader` and Remote Config, you gain unprecedented control over your production application. You can fix bugs in minutes, mitigate risks, and keep your users happy - all without waiting for the app store.

::: info References

**1. Shorebird**

<SiteInfo
  name="Shorebird"
  desc="Over the air updates for Flutter. Confidently update Flutter apps instantly."
  url="https://shorebird.dev"
  logo="https://shorebird.dev/favicon.svg"
  preview="https://shorebird.dev/open-graph.png"/>

<SiteInfo
  name="shorebird_code_push | Dart package"
  desc="Check for and download Shorebird code push updates from your app."
  url="https://pub.dev/packages/shorebird_code_push"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-jc0slbjj/img/pub-dev-icon-cover-image.png"/>

**2. Upgrader Package**

<SiteInfo
  name="upgrader | Flutter package"
  desc="Flutter package for prompting users to upgrade when there is a newer version of the app in the store."
  url="https://pub.dev/packages/upgrader"
  logo="https://pub.dev/static/hash-jc0slbjj/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-jc0slbjj/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="larryaasen/upgrader"
  desc="A Flutter package for prompting users to upgrade when there is a newer version of the app in the store."
  url="https://github.com/larryaasen/upgrader/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d4611edcfb5b80793eecbdc2010fb35163851147bfabad3370bf52efe83e52d2/larryaasen/upgrader"/>

**3. Supporting Tools & Concepts**

```component VPCard
{
  "title": "Firebase Remote Config",
  "desc": "Change the behavior and appearance of your web client or server without publishing an app update, at no cost, for unlimited daily active users.",
  "link": "https://firebase.google.com/docs/remote-config",
  "logo": "https://gstatic.com/devrel-devsite/prod/v7f9e36f6d186549b8ffe909dedf2851d752c55d39aba6c518bdd33de03ff1b45/firebase/images/favicon.png",
  "background": "rgba(232,128,0,0.2)"
}
```

```component VPCard
{
  "title": "Semantic Versioning 2.0.0",
  "desc": "Semantic Versioning spec and website",
  "link": "https://semver.org/",
  "logo": "https://semver.org/assets/500x500(light).jpg",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Push Silent Updates in Flutter Using Shorebird",
  "desc": "Imagine you've just launched a major feature. Your app is climbing the charts, but then the first bug report arrives. It's a critical payment validation error. The fix is a single line of Dart code, but now you face the dreaded app store review queue...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-push-silent-updates-in-flutter-using-shorebird.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
