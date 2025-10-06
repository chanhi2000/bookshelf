---
lang: en-US
title: "Set up Flutter"
description: "Article(s) > (5/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (5/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Set up Flutter"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/set-up-flutter.html
date: 2025-04-09
isOriginal: false
author:
  - name: Kevine Nzapdi
    url : https://freecodecamp.org/news/author/gunkev/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Build a Multilingual Social Recipe Application with Flutter and Strapi",
  "desc": "Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf...",
  "link": "/freecodecamp.org/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
  desc="Hey there! In this project, you will build a multilingual social recipe application using Flutter and Strapi. Flutter is an open-source UI software development kit created by Google. It allows you to build beautiful and highly interactive user interf..."
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-set-up-flutter"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

Once you have [<FontIcon icon="iconfont icon-flutter"/>set up Flutte](https://docs.flutter.dev/get-started/install/windows/desktop)[r](https://docs.flutter.dev/get-started/install/windows/desktop) in your environment, run the following command to bootstrap a new application in your favorite directory:

```sh
flutter create flutter_recipe_app
```

To see your app in action, you need to run it on a mobile device. You can either:

- Use an **emulator** (a virtual Android or iOS device that runs on your computer), or
- Connect a **physical device** (like your smartphone) to your computer with a USB cable.

Once your emulator or device is ready, navigate into the newly created project folder:

```sh
flutter run
```

This command builds the app and starts it on your connected device or emulator.

![flutter starter app](https://cdn.hashnode.com/res/hashnode/image/upload/v1743505498936/6e1e461d-9fee-4e19-81e0-65d25ddebd63.png)

---

## Project Structure

Now let's look at the file structure of the project:

```plaintext :collapsed-lines title="folder-structure"
flutter_recipe_app/
|
|-- .dart_tool/
|-- .idea/
|-- android/ [flutter_recipe_app_android]
|   |-- assets/
|   |   |-- images/
|   |   |-- translations/
|
|-- build/
|-- ios/
|-- lib/
|   |-- components/
|   |   |-- appBar.dart
|   |   |-- drawer.dart
|   |
|   |-- models/
|   |   |-- recipe.dart
|   |
|   |-- screens/
|   |   |-- detail.dart
|   |   |-- home.dart
|   |   |-- login.dart
|   |   |-- profile.dart
|   |   |-- requestRecipe.dart
|   |   |-- signUp.dart
|   |
|   |-- utils/
|       |-- server2.dart
|
|-- main.dart
|-- test/
|-- .env
```

The structure is organized as follows:

- <FontIcon icon="fas fa-folder-open"/>`.dart_tool/`: Contains Dart tools and build outputs.
- <FontIcon icon="fas fa-folder-open"/>`.idea/`: IDE-specific settings.
- <FontIcon icon="fas fa-folder-open"/>`android/`: Android-specific project files, including custom assets like images and translations.
- <FontIcon icon="fas fa-folder-open"/>`build/`: Generated files from the build process.
- <FontIcon icon="fas fa-folder-open"/>`ios/`: iOS-specific project files.
- <FontIcon icon="fas fa-folder-open"/>`lib/`: The main source directory for Dart code, which includes:
    - <FontIcon icon="fas fa-folder-open"/>`components/`: Reusable widgets or UI components like `appBar` and `drawer`.
    - <FontIcon icon="fas fa-folder-open"/>`models/`: Data models for your application, like `recipe`.
    - <FontIcon icon="fas fa-folder-open"/>`screens/`: Individual screens of the app, such as the `recipe details`, `home`, `login`, `profile`, `request recipe` and `signUp` screens of the app
    - <FontIcon icon="fas fa-folder-open"/>`utils/`: Utilities and helper functions, like `server2.dart` for the server communication logic.
    - <FontIcon icon="fa-brands fa-dart-lang"/>`main.dart`: The entry point of the Flutter application.
- <FontIcon icon="fas fa-folder-open"/>`test/`: Directory for test files.
- <FontIcon icon="fas fa-file-lines"/>`.env`: Environment-specific variables file.

This setup is typical for a moderately complex Flutter application, segregating functionality into manageable, logical sections for better organization and maintainability.