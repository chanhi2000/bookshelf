---
lang: en-US
title: "How to Add Multi-Language Support in Flutter: Manual and AI-Automated Translations for Flutter Apps"
description: "Article(s) > How to Add Multi-Language Support in Flutter: Manual and AI-Automated Translations for Flutter Apps"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - AI
  - LLM
  - Google
  - Google Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Add Multi-Language Support in Flutter: Manual and AI-Automated Translations for Flutter Apps"
    - property: og:description
      content: "How to Add Multi-Language Support in Flutter: Manual and AI-Automated Translations for Flutter Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-add-multi-language-support-in-flutter-manual-and-ai-automated-translations-for-flutter-apps.html
prev: /programming/dart/articles/README.md
date: 2026-01-31
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1769822678736/98b19125-c06e-4e00-8694-5c2c23abb15f.png
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
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Add Multi-Language Support in Flutter: Manual and AI-Automated Translations for Flutter Apps"
  desc="As Flutter applications scale beyond a single market, language support becomes a critical requirement. A well-designed app should feel natural to users regardless of their locale, automatically adapting to their language preferences while still givin..."
  url="https://freecodecamp.org/news/how-to-add-multi-language-support-in-flutter-manual-and-ai-automated-translations-for-flutter-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1769822678736/98b19125-c06e-4e00-8694-5c2c23abb15f.png"/>

As Flutter applications scale beyond a single market, language support becomes a critical requirement. A well-designed app should feel natural to users regardless of their locale, automatically adapting to their language preferences while still giving them control.

This article provides a comprehensive, production-focused guide to supporting multiple languages in a Flutter application using Flutter’s localization system, the `intl` package, and Bloc for state management. We’ll support English, French, and Spanish, implement automatic language detection, and allow users to manually switch languages from settings, while also exploring the use of AI to automate text translations.

::: note Prerequisites

Before proceeding, you should be comfortable with the following concepts:

- **Dart programming language**: variables, classes, functions, and null safety
- **Flutter fundamentals**: widgets, `BuildContext`, and widget trees
- **State management basics**: familiarity with Bloc or similar patterns
- **Terminal usage**: running Flutter CLI commands

:::

If you have prior experience working with Flutter widgets and basic app architecture, you are well prepared to follow along.

---

## Why Localization Matters in Flutter Applications

Localization (often abbreviated as l10n) is the process of adapting an application for different languages and regions, going beyond simple text translation to influence accessibility, user trust, and overall usability. From a technical perspective, localization introduces several challenges: text must be dynamically resolved at runtime, the UI must update instantly when the language changes, language preferences must persist across sessions, and device locale detection must gracefully fall back when a language is unsupported.

Flutter’s localization framework, when combined with `intl` and Bloc, solves these challenges cleanly and predictably.

---

## Flutter Localization Architecture Overview

Flutter localization is built around three key ideas:

1. **ARB files** as the source of truth for translated strings
2. **Code generation** to provide type-safe access to translations
3. **Locale-driven rebuilds** of the widget tree

At runtime, the active `Locale` determines which translation file is used. When the locale changes, Flutter automatically rebuilds dependent widgets.

---

## How to Set Up Dependencies

Add the required dependencies to your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml`:

```yaml title="pubpsec.yaml"
dependencies:
  flutter:
    sdk: flutter

  flutter_localizations:
    sdk: flutter

  intl: ^0.20.2
  flutter_bloc: ^8.1.3
  arb_translate: ^1.1.0
```

Enable localization code generation:

```yaml
flutter:
  generate: true
```

This instructs Flutter to generate localization classes from ARB files.

---

## How to Define Supported Languages

For this guide, the application will support:

- English (`en`)
- French (`fr`)
- Spanish (`es`)

These locales will be declared centrally and used throughout the app.

---

## How to Add Localized Text with ARB Files

Flutter uses **Application Resource Bundle (ARB)** files to store localized strings. Each supported language has its own ARB file.

::: tabs

@tab English: <VPIcon icon="iconfont icon-json"/><code>app_en.arb</code>

```json title="app_en.arb"
{
  "@@locale": "en",
  "enter_email_address_to_reset": "Enter your email address to reset"
}
```

@tab French: <VPIcon icon="iconfont icon-json"/><code>app_fr.arb</code>

```json title=">app_fr.arb"
{
  "@@locale": "fr",
  "enter_email_address_to_reset": "Entrez votre adresse e-mail pour réinitialiser"
}
```

@tab Spanish: <VPIcon icon="iconfont icon-json"/><code>app_es.arb</code>

```json title="app_es.arb"
{
  "@@locale": "es",
  "enter_email_address_to_reset": "Ingrese su dirección de correo electrónico para restablecer"
}
```

:::

Each key must be identical across files. Only the values change per language.

---

## How to Generate Localization Code

Run the following command in your terminal:

```sh
flutter gen-l10n
```

Flutter generates a strongly typed localization class, typically located at:

```sh title="file structure"
.dart_tool/flutter_gen/gen_l10n/app_localizations.dart
```

This file exposes getters such as:

```dart title=".dart_tool/flutter_gen/gen_l10n/app_localizations.dart"
AppLocalizations.of(context)!.enter_email_address_to_reset
```

---

## How to Configure `MaterialApp` for Localization

The `MaterialApp` widget must be configured with localization delegates and supported locales:

```dart
MaterialApp(
  localizationsDelegates: const [
    AppLocalizations.delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: const [
    Locale('en'),
    Locale('fr'),
    Locale('es'),
  ],
  locale: state.locale,
  home: const MyHomePage(),
)
```

The `locale` property is controlled by Bloc, allowing dynamic updates at runtime.

---

## Auto-Detecting the User’s Device Language

Flutter exposes the device locale via `PlatformDispatcher`. We can use this to automatically select the most appropriate supported language.

```dart
void detectLanguageAndSet() {
  Locale deviceLocale = PlatformDispatcher.instance.locale;

  Locale selectedLocale = AppLocalizations.supportedLocales.firstWhere(
    (supported) => supported.languageCode == deviceLocale.languageCode,
    orElse: () => const Locale('en'),
  );

  print('Using Locale: ${selectedLocale.languageCode}');

  GlobalConfig.storageService.setStringValue(
    AppStrings.DETECTED_LANGUAGE,
    selectedLocale.languageCode,
  );

  context.read<AppLocalizationBloc>().add(
    SetLocale(locale: selectedLocale),
  );
}
```

This approach reads the device language, matches it against supported locales, falls back to English when the language is unsupported, persists the detected language, and updates the UI instantly.

---

## How to Manage Localization with Bloc

Bloc provides a predictable and testable way to manage application-wide locale changes.

### Localization State

```dart
class AppLocalizationState {
  final Locale locale;
  const AppLocalizationState(this.locale);
}
```

### Localization Event

```dart
abstract class AppLocalizationEvent {}

class SetLocale extends AppLocalizationEvent {
  final Locale locale;
  SetLocale({required this.locale});
}
```

### Localization Bloc

```dart
class AppLocalizationBloc
    extends Bloc<AppLocalizationEvent, AppLocalizationState> {
  AppLocalizationBloc()
      : super(const AppLocalizationState(Locale('en'))) {
    on<SetLocale>((event, emit) {
      emit(AppLocalizationState(event.locale));
    });
  }
}
```

The `AppLocalizationBloc` manages the app’s language state. It starts with English (`Locale('en')`) as the default, and when it receives a `SetLocale` event, it updates the state to the new locale provided in the event, causing the app’s UI to switch to that language. Whenever `SetLocale` is dispatched, the entire app rebuilds using the new locale.

---

## How to Display Localized Text in Widgets

Once localization is configured, using translated text is straightforward:

```dart
Text(
  AppLocalizations.of(context)!.enter_email_address_to_reset,
  style: getRegularStyle(
    color: Colors.white,
    fontSize: FontSize.s16,
  ),
)
```

`AppLocalizations.of(context)!.enter_email_address_to_reset` retrieves the localized string `enter_email_address_to_reset` for the current app locale from the generated localization resources. The correct translation is resolved automatically based on the active locale.

---

## Language Switching from Settings

Users should always be able to override automatic language detection.

```dart
ListTile(
  title: const Text('French'),
  onTap: () {
    context.read<AppLocalizationBloc>().add(
      SetLocale(locale: const Locale('fr')),
    );
  },
)
```

This `ListTile` displays the text **"French"**, and when tapped, it triggers the `AppLocalizationBloc` to change the app’s locale to French (`'fr'`) by dispatching a `SetLocale` event and it persists the selected language so it can be restored on the next app launch.

---

## How to Add Parameters to Localized Strings

Real-world applications rarely display static text. Messages often include **dynamic values** such as user names, counts, dates, or prices. Flutter’s localization system, powered by `intl`, supports **parameterized (interpolated) strings** in a type-safe way.

### Where Parameters Are Defined

Parameters are defined inside ARB files alongside the localized string itself, with each parameterized message consisting of the message string containing placeholders and a corresponding metadata entry that describes those placeholders.

### Example: Parameterized Text

Suppose we want to display a greeting message that includes a user’s name.

::: tabs

@tab English: <VPIcon icon="fa-brands fa-js"/><code>app_en.arb</code>

```json title="app_en.arb"
{
  "@@locale": "en",
  "greetingMessage": "Hello {username}!",
  "@greetingMessage": {
    "description": "Greeting message shown on the home screen",
    "placeholders": {
      "username": {
        "type": "String"
      }
    }
  }
}
```

This defines a parameterized localized message for English, indicated by `"@@locale": "en"`. The `"greetingMessage"` key contains the string `"Hello {username}!"`, where `{username}` is a placeholder that will be dynamically replaced with the user’s name at runtime. The `"@greetingMessage"` entry provides metadata for the message, including a description that explains the string is shown on the home screen, and a `"placeholders"` section that specifies `"username"` is of type `String`. When the app runs, this structure allows the message to display dynamically—for example, if the username is `"Alice"`, the message would appear as `"Hello Alice!"`.

@tab French: <VPIcon icon="fa-brands fa-js"/><code>app_fr.arb</code>

```json title="app_fr.arb"
{
  "@@locale": "fr",
  "greetingMessage": "Bonjour {username} !"
}
```

@tab Spanish: <VPIcon icon="fa-brands fa-js"/><code>app_es.arb</code>

```json title="app_es.arb"
{
  "@@locale": "es",
  "greetingMessage": "¡Hola {username}!"
}
```

:::

The placeholder name (`{username}`) **must be identical across all ARB files**.

### Generated Dart API

After running:

```sh
flutter gen-l10n
```

Flutter generates a strongly typed method instead of a simple getter:

```dart
String greetingMessage(String username)
```

This prevents runtime errors and ensures compile-time safety.

### How to Use Parameterized Strings in Widgets

```dart
Text(
  AppLocalizations.of(context)!.greetingMessage('Tony'),
)
```

If the locale is set to French, the output becomes:

```plaintext title="output"
Bonjour Tony !
```

---

## Pluralization and Quantities

Another common localization requirement is **pluralization**. Languages differ significantly in how they express quantities, and hardcoding plural logic in Dart quickly becomes error-prone.

### Defining Plural Messages in ARB

```json
{
  "itemsCount": "{count, plural, =0{No items} =1{1 item} other{{count} items}}",
  "@itemsCount": {
    "description": "Displays the number of items",
    "placeholders": {
      "count": {
        "type": "int"
      }
    }
  }
}
```

This defines a **pluralized message** for `itemsCount`. The string `{count, plural, =0{No items} =1{1 item} other{{count} items}}` dynamically changes based on the value of `count`: it shows **"No items"** when `count` is 0, **"1 item"** when `count` is 1, and **"{count} items"** for all other values. The metadata entry `"@itemsCount"` provides a description and specifies that the placeholder `count` is of type `int`.

Each language can define its own plural rules while sharing the same key.

### Using Pluralized Messages

```dart
Text(
  AppLocalizations.of(context)!.itemsCount(3),
)
```

Flutter automatically applies the correct plural form based on the active locale.

---

## How to Format Dates, Numbers, and Currency

The `intl` package also provides locale-aware formatting utilities. These should be used **in combination with localized strings**, not as replacements.

### Date Formatting Example

```dart
final formattedDate = DateFormat.yMMMMd(
  Localizations.localeOf(context).toString(),
).format(DateTime.now());
```

```dart
Text(
  AppLocalizations.of(context)!.lastLoginDate(formattedDate),
)
```

This ensures that both language and formatting rules align with the user’s locale.

---

## Localization Data Flow

Localization is handled as an explicit data flow, with locale resolution modeled as application state rather than a static configuration passed into `MaterialApp`.

The process starts with the **device locale**, obtained from the platform layer at startup. This value represents the system’s preferred language and region but is not applied directly to the UI.

Instead, it flows through a `detectLanguageAndSet` step responsible for applying application-specific rules. This layer typically handles locale normalization and fallback logic, such as mapping unsupported locales to supported ones, restoring a user-selected language from persistent storage, or enforcing product constraints around available translations.

The resolved locale is then emitted into a **Localization Bloc**, which acts as the single source of truth for localization state. By centralizing locale management, the application can support runtime language changes, ensure predictable rebuilds, and keep localization logic decoupled from both the widget tree and platform APIs.

The Bloc feeds into the `locale` property of `MaterialApp`, which is the integration point with Flutter’s localization system. Updating this value triggers a rebuild of the `Localizations` scope and causes all dependent widgets to resolve strings for the active locale.

At the edge of the system, **localized widgets** consume the generated localization classes produced by `flutter gen-l10n`. These widgets remain agnostic to how the locale was selected or updated. They simply react to the localization context provided by the framework.

This architecture cleanly separates:

- Locale detection
- Business logic and state management
- Framework-level localization
- UI rendering

As a result, localization behavior remains explicit, maintainable, and compatible with automated translation workflows and CI-driven localization updates.

![Localization Data Flow](https://cdn.hashnode.com/res/hashnode/image/upload/v1769595931473/c2b082be-d3f8-4dc5-90cf-a61712cb9f8f.png)

::: warning Common Pitfalls and How to Avoid Them

1. **Avoid manual string concatenation**. For example, do not use `'Hello ' + name`. You should rely on localized templates instead.
2. **Never hardcode plural logic in Dart**. Always use `intl`’s pluralization features to handle different languages correctly.
3. **Avoid locale-specific formatting outside** `intl` utilities. Dates, numbers, and currencies should be formatted using the proper localization tools.
4. **Always regenerate localization files after updating ARB files**. This ensures the app reflects all the latest translations.

:::

---

## How to Automate Translations with AI

In Flutter applications that rely on ARB files for localization, translation maintenance becomes increasingly costly as the application grows. Each new message must be manually propagated across locale files, often resulting in missing keys, inconsistent phrasing, or delayed updates. This problem is amplified in projects that do not use a Translation Management System (TMS) and instead keep ARB files directly in the repository.

While many TMS platforms have begun adding AI-assisted translation features, not all projects use a TMS at all, particularly small teams, internal tools, or personal projects. In these cases, developers frequently resort to copying strings into AI chat tools and pasting results back into ARB files, which is inefficient and difficult to scale.

To address this workflow gap, **Leen Code** published `arb_translate` package, a Dart-based CLI tool that automates missing ARB translations using large language models.

### Design Approach

The model behind `arb_translate` aligns with Flutter’s existing localization pipeline rather than replacing it:

- English ARB files remain the source of truth
- Only missing keys are translated
- Output is written back as standard ARB files
- `flutter gen-l10n` is still responsible for code generation

This design makes the tool suitable for both local development and CI usage, without introducing new runtime dependencies or localization abstractions.

At a high level, the flow is:

1. Parse the base (typically English) ARB file
2. Identify missing keys in target locale ARB files
3. Send key–value pairs to an LLM via API
4. Receive translated strings
5. Update or generate locale-specific ARB files
6. Run `flutter gen-l10n` to regenerate localized resources

::: tabs

@tab:active <VPIcon icon="iconfont icon-gemini"/>Gemini-Based Setup

To use Gemini for ARB translation:

**1. Generate a Gemini API key**

<SiteInfo
  name="Using Gemini API keys  |  Google AI for Developers"
  desc="Get your Gemini API key and start building in less than 5 minutes."
  url="https://ai.google.dev/gemini-api/docs/api-key/"
  logo="https://gstatic.com/devrel-devsite/prod/v6dcfc5a6ab74baade852b535c8a876ff20ade102b870fd5f49da5da2dbf570bd/googledevai/images/favicon-new.png"
  preview="https://ai.google.dev/static/site-assets/images/api-key.png"/>

![Gemini API Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1769596589542/596648f3-11ca-4768-befe-341b38e8c1f1.png)

**Install the CLI + Export the API key + Run the tool from the Flutter project root**

```sh
dart pub global activate arb_translate
export ARB_TRANSLATE_API_KEY=your-api-key
arb_translate
```

The tool scans existing ARB files, generates missing translations, and writes them back to disk.

@tab <VPIcon icon="iconfont icon-openai"/>OpenAI/ChatGPT Support

As of version **1.0.0**, `arb_translate` also supports OpenAI ChatGPT models. This allows teams to standardize on OpenAI infrastructure or switch providers without changing their localization workflow.

**1. Generate an OpenAI API key  **

<SiteInfo
  name="OpenAI Platform"
  desc="Explore developer resources, tutorials, API docs, and dynamic examples to get the most out of OpenAI's platform."
  url="https://platform.openai.com/"
  logo="https://platform.openai.com/favicon-platform-alt.svg"
  preview="https://cdn.openai.com/API/images/platform-opengraph.png"/>

![OpenAI Platform](https://cdn.hashnode.com/res/hashnode/image/upload/v1769596780166/28b6ef5d-3ff2-4c31-b8a4-fa3505459977.png)

**2. Install the tool + Export the API key**:

```sh
dart pub global activate arb_translate
export ARB_TRANSLATE_API_KEY=your-api-key
```

**3. Select OpenAI as the provider:**

Via <VPIcon icon="iconfont icon-yaml"/>`l10n.yaml`:

```yaml title="l10n.yaml"
arb-translate-model-provider: open-ai
```

Or via CLI:

```sh
arb_translate --model-provider open-ai
```

**4. Execute:**

```sh
arb_translate
```

:::

### Practical Use Cases

This approach is not intended to replace professional translation or review workflows. Instead, it serves as a **deterministic automation layer** that:

- Eliminates manual copy-paste workflows
- Keeps ARB files structurally consistent
- Enables translation generation in CI
- Allows downstream review in a TMS if required

For content-heavy Flutter applications or teams without a dedicated localization platform, this provides a pragmatic and maintainable solution.

::: tip Best Practices and Considerations

1. Always define a fallback locale to ensure the app remains usable.
2. Avoid hardcoding user-facing strings; rely on localized resources.
3. Use semantic and stable ARB keys for maintainability.
4. Persist user language preferences to provide a consistent experience.
5. Test your app with long translations and multiple locales to catch layout or UI issues.

:::

---

## Conclusion

Localization is a foundational requirement for modern Flutter applications. By combining Flutter’s built-in localization framework, the `intl` package, and Bloc for state management, you gain a robust and scalable solution.

With automatic device language detection, runtime switching, and clean architecture, your application becomes globally accessible without sacrificing maintainability.

::: info References

Here are official links you can use as references for Flutter localization:

- **Flutter Internationalization Guide** – Official Flutter guide on how to internationalize your app:  

<SiteInfo
  name="Internationalizing Flutter apps"
  desc="How to internationalize your Flutter app."
  url="https://docs.flutter.dev/ui/internationalization"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

- **Dart** `intl` Package Documentation – API reference for the `intl` library used for formatting and localization utilities:  
    [https://api.flutter.dev/flutter/package-intl_intl/index.html](https://api.flutter.dev/flutter/package-intl_intl/index.html)
- **Flutter** `flutter_localizations` API – API docs for the `flutter_localizations` library that provides localized strings and resources for Flutter widgets:  

```component VPCard
{
  "title": "intl library - Dart API",
  "desc": "intl library API docs, for the Dart programming language.",
  "link": "https://api.flutter.dev/flutter/package-intl_intl/index.html/",
  "logo": "https://api.flutter.dev/static-assets/favicon.png?v1",
  "background": "rgba(19,137,253,0.2)"
}
```

- **Flutter App Localization with AI (LeanCode)** – A guide on speeding up Flutter localization using AI and tools like Gemini or ChatGPT, including details on the `arb_translate` package.

<SiteInfo
  name="Flutter App Localization with AI: The Developer’s Guide - LeanCode"
  desc="We created the Flutter arb_translation package, automating the addition of missing translations with Google's Gemini API and OpenAI's ChatGPT. Read how we used AI localization!"
  url="https://leancode.co/blog/flutter-app-localization-with-ai/"
  logo="https://leancode.co/favicon-48x48.png"
  preview="https://images.prismic.io/leancodelanding2/10aae866-ba2c-4e70-ae48-1e5cdaffb053_2168+%281%29.jpg?auto=compress,format&rect=0,7,1200,585&w=1230&h=600"/>

- `arb_translate` package (pub.dev) – A tool for automating ARB file translations in Flutter:  

<SiteInfo
  name="arb_translate | Dart package"
  desc="A command-line tool for automatically generating missing translations to ARB files using Google Gemini or OpenAI ChatGPT by LeanCode."
  url="https://pub.dev/packages/arb_translate/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-jnfujih4/img/pub-dev-icon-cover-image.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Add Multi-Language Support in Flutter: Manual and AI-Automated Translations for Flutter Apps",
  "desc": "As Flutter applications scale beyond a single market, language support becomes a critical requirement. A well-designed app should feel natural to users regardless of their locale, automatically adapting to their language preferences while still givin...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-add-multi-language-support-in-flutter-manual-and-ai-automated-translations-for-flutter-apps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
