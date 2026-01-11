---
lang: en-US
title: "Install Packages"
description: "Article(s) > (6/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
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
      content: "Article(s) > (6/16) How to Build a Multilingual Social Recipe Application with Flutter and Strapi"
    - property: og:description
      content: "Install Packages"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/build-a-multilingual-social-recipe-app-with-flutter-and-strapi/install-packages.html
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
  url="https://freecodecamp.org/news/build-a-multilingual-social-recipe-app-with-flutter-and-strapi#heading-install-packages"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1743509325302/fd7d5d6c-9a48-4037-9cc2-3b35a92b6006.png"/>

In this tutorial, we’re using five main packages:

- [<VPIcon icon="fa-brands fa-dart-lang"/>`flutter_dotenv`](https://pub.dev/packages/flutter_dotenv): to manage environment variables
- [<VPIcon icon="fa-brands fa-dart-lang"/>`http`](https://pub.dev/packages/http): to handle HTTP requests and interact with [<VPIcon icon="iconfont icon-strapi"/>Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [<VPIcon icon="fa-brands fa-dart-lang"/>`shared_preferences`](https://pub.dev/packages/shared_preferences): persists key-value data on the device like user login tokens
- [<VPIcon icon="fa-brands fa-dart-lang"/>`provider`](https://pub.dev/packages/provider): for state management and updating your UI reactively when the underlying state changes
- [<VPIcon icon="fa-brands fa-dart-lang"/>`easy_localization`](https://pub.dev/packages/easy_localization): for managing translations and locale data. It supports both JSON and YAML file formats for defining translations.

In your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file, add the following lines:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    ...
  flutter_dotenv: ^5.1.0
  http: ^1.1.0
  shared_preferences: ^2.2.2
  provider: ^6.1.2
  easy_localization: ^3.0.7
```

Then run the command below to install the packages:

```sh
flutter pub get
```

---

## Add Assets

Add the path to your assets in your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` file found at the root of your project:

```yaml title="pubspec.yaml"
flutter:
  uses-material-design: true
  assets:
    - .env
    - assets/translations/
    - assets/images/
```

The translations folder contains the list of your translations while the images folder hosts the photos of your application.

---

## Taking a look at <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart`

In the <VPIcon icon="fa-brands fa-dart-lang"/>`main.dart` file, you need to set up your localization, load environment variables, and a list of providers for dependency injection:

```dart :collapsed-lines title="main.dart"
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_recipe_app/screens/home.dart';
import 'package:flutter_recipe_app/screens/login.dart';
import 'package:flutter_recipe_app/screens/requestRecipe.dart';
import 'package:flutter_recipe_app/screens/signUp.dart';
import 'package:flutter_recipe_app/utils/server.dart';
import 'package:provider/provider.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async{
  // Ensure all bindings are initialized
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();

  // Load environment variables
  await dotenv.load(fileName: ".env");
  runApp(EasyLocalization(
    supportedLocales: const [
      Locale('en'),
      Locale('fr', 'FR'),
      Locale('ja', 'JP')],
    path: 'assets/translations', //
    fallbackLocale: Locale('en'),
    child: MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(create: (_) => ApiService()),
      ],
      child: MaterialApp(
        title: tr('app_description'),
        localizationsDelegates: context.localizationDelegates,
        supportedLocales: context.supportedLocales,
        locale: context.locale,
        initialRoute: '/home',
        routes: {
          '/request': (context) => RecipeRequestScreen(),
          '/login': (context) => LoginScreen(),
          '/register': (context) => RegisterScreen(),
          '/home': (context) => HomeScreen(), // Implement HomeScreen
        },
      ),
    );
  }
}
```

From the code snippet above, the `WidgetsFlutterBinding.ensureInitialized()` ensures that all Flutter bindings are initialized before any other operations and the `EasyLocalization.ensureInitialized()` initializes the EasyLocalization package to handle translations.

Load the environment variables with `dotenv.load(fileName: ".env")` to read variables from the <VPIcon icon="iconfont icon-doitenv" />`.env` file. The `runApp` function wraps the `MyApp` widget with the `EasyLocalization` widget, which is configured to support English (`en`), French (`fr_FR`), and Japanese (`ja_JP`) locales. The path for translation files is set to `'assets/translations'`, and the fallback locale is set to English.

It also creates the main routes of the recipe application and sets `home` as the initial route.
